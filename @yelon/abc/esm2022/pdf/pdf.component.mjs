import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, timer, debounceTime, filter } from 'rxjs';
import { InputBoolean, InputNumber, ZoneOutside } from '@yelon/util/decorator';
import { PDF_DEFULAT_CONFIG } from './pdf.config';
import { PdfExternalLinkTarget, PdfTextLayerMode } from './pdf.types';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
import * as i2 from "@yelon/util/other";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/skeleton";
const CSS_UNITS = 96.0 / 72.0;
const BORDER_WIDTH = 9;
export class PdfComponent {
    set src(dataOrBuffer) {
        this._src = dataOrBuffer;
        this.load();
    }
    set pi(val) {
        this._pi = this.getValidPi(val);
        if (this.pageViewer) {
            this.pageViewer.scrollPageIntoView({ pageNumber: this._pi });
        }
    }
    set showAll(val) {
        this._showAll = val;
        this.resetDoc();
    }
    set renderText(val) {
        this._renderText = val;
        if (this.pageViewer) {
            this.resetDoc();
        }
    }
    set zoom(val) {
        if (val <= 0)
            return;
        this._zoom = val;
    }
    set rotation(val) {
        if (val % 90 !== 0) {
            console.warn(`Invalid rotation angle, shoule be divisible by 90.`);
            return;
        }
        this._rotation = val;
    }
    get loading() {
        return this._loading;
    }
    get pdf() {
        return this._pdf;
    }
    get findController() {
        return this._showAll ? this.multiPageFindController : this.singlePageFindController;
    }
    get pageViewer() {
        return this._showAll ? this.multiPageViewer : this.singlePageViewer;
    }
    get linkService() {
        return this._showAll ? this.multiPageLinkService : this.singlePageLinkService;
    }
    get eventBus() {
        return this._eventBus;
    }
    get _textLayerMode() {
        return this._renderText ? this.textLayerMode : PdfTextLayerMode.DISABLE;
    }
    get win() {
        return this.doc.defaultView || window;
    }
    get el() {
        return this._el.nativeElement.querySelector('.pdf-container');
    }
    constructor(ngZone, configSrv, lazySrv, platform, _el, doc, cdr) {
        this.ngZone = ngZone;
        this.lazySrv = lazySrv;
        this.platform = platform;
        this._el = _el;
        this.doc = doc;
        this.cdr = cdr;
        this.inited = false;
        this.destroy$ = inject(DestroyRef);
        this.lib = '';
        this._pi = 1;
        this._total = 0;
        this._showAll = true;
        this._rotation = 0;
        this._zoom = 1;
        this._renderText = true;
        this._loading = false;
        this.textLayerMode = PdfTextLayerMode.ENABLE;
        this.showBorders = false;
        this.stickToPage = false;
        this.originalSize = true;
        this.fitToPage = false;
        this.zoomScale = 'page-width';
        this.autoReSize = true;
        this.externalLinkTarget = PdfExternalLinkTarget.BLANK;
        this.change = new EventEmitter();
        const cog = configSrv.merge('pdf', PDF_DEFULAT_CONFIG);
        Object.assign(this, cog);
        const lib = cog.lib;
        this.lib = lib.endsWith('/') ? lib : `${lib}/`;
    }
    getValidPi(pi) {
        if (pi < 1)
            return 1;
        const pdf = this._pdf;
        return pdf && pi > pdf.numPages ? pdf.numPages : pi;
    }
    emit(type, opt) {
        this.ngZone.run(() => this.change.emit({
            type,
            pdf: this._pdf,
            pi: this._pi,
            total: this._total,
            ...opt
        }));
    }
    initDelay() {
        if (!this.win.pdfjsLib) {
            throw new Error(`No window.pdfjsLib found, please make sure that cdn or local path exists, the current referenced path is: ${JSON.stringify(this.lib)}`);
        }
        this.inited = true;
        this.cdr.detectChanges();
        this.win.pdfjsLib.GlobalWorkerOptions.workerSrc = `${this.lib}build/pdf.worker.min.js`;
        timer(this.delay ?? 0)
            .pipe(takeUntilDestroyed(this.destroy$))
            .subscribe(() => this.load());
    }
    setLoading(status) {
        this.ngZone.run(() => {
            this._loading = status;
            this.cdr.detectChanges();
        });
    }
    load() {
        const { _src } = this;
        if (!this.inited || !_src) {
            return;
        }
        if (this.lastSrc === _src) {
            this.render();
            return;
        }
        this.destroy();
        this.ngZone.run(() => {
            this._loading = true;
            this.cdr.detectChanges();
        });
        this.setLoading(true);
        const loadingTask = (this.loadingTask = this.win.pdfjsLib.getDocument(_src));
        loadingTask.onProgress = (progress) => this.emit('load-progress', { progress });
        loadingTask.promise
            .then(pdf => {
            this._pdf = pdf;
            this.lastSrc = _src;
            this._total = pdf.numPages;
            this.emit('loaded');
            if (!this.pageViewer) {
                this.setupPageViewer();
            }
            this.resetDoc();
            this.render();
        }, error => this.emit('error', { error }))
            .then(() => this.setLoading(false));
    }
    resetDoc() {
        const pdf = this._pdf;
        if (!pdf) {
            return;
        }
        this.cleanDoc();
        this.findController.setDocument(pdf);
        this.pageViewer.setDocument(pdf);
        this.linkService.setDocument(pdf, null);
    }
    cleanDoc() {
        this.multiPageViewer.setDocument(null);
        this.singlePageViewer.setDocument(null);
        this.multiPageLinkService.setDocument(null, null);
        this.singlePageLinkService.setDocument(null, null);
        this.multiPageFindController.setDocument(null);
        this.singlePageFindController.setDocument(null);
    }
    render() {
        const currentViewer = this.pageViewer;
        if (!currentViewer) {
            return;
        }
        if (this._rotation !== 0 || currentViewer.pagesRotation !== this._rotation) {
            this.timeExec(() => {
                currentViewer.pagesRotation = this._rotation;
            });
        }
        if (this.stickToPage) {
            this.timeExec(() => {
                currentViewer.currentPageNumber = this._pi;
            });
        }
        this.updateSize();
    }
    timeExec(fn) {
        this.ngZone.runOutsideAngular(() => {
            timer(0)
                .pipe(takeUntilDestroyed(this.destroy$))
                .subscribe(() => this.ngZone.runOutsideAngular(() => fn()));
        });
    }
    updateSize() {
        const currentViewer = this.pageViewer;
        if (!currentViewer)
            return;
        this._pdf.getPage(currentViewer.currentPageNumber).then((page) => {
            const { _rotation, _zoom } = this;
            const rotation = _rotation || page.rotate;
            const viewportWidth = page.getViewport({
                scale: _zoom,
                rotation
            }).width * CSS_UNITS;
            let scale = _zoom;
            // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
            if (!this.originalSize || (this.fitToPage && viewportWidth > this.el.clientWidth)) {
                const viewPort = page.getViewport({ scale: 1, rotation });
                scale = this.getScale(viewPort.width, viewPort.height);
            }
            currentViewer.currentScale = scale;
        });
    }
    getScale(viewportWidth, viewportHeight) {
        const borderSize = this.showBorders ? 2 * BORDER_WIDTH : 0;
        const el = this.el;
        const containerWidth = el.clientWidth - borderSize;
        const containerHeight = el.clientHeight - borderSize;
        if (containerHeight === 0 || viewportHeight === 0 || containerWidth === 0 || viewportWidth === 0) {
            return 1;
        }
        let ratio = 1;
        switch (this.zoomScale) {
            case 'page-fit':
                ratio = Math.min(containerHeight / viewportHeight, containerWidth / viewportWidth);
                break;
            case 'page-height':
                ratio = containerHeight / viewportHeight;
                break;
            case 'page-width':
            default:
                ratio = containerWidth / viewportWidth;
                break;
        }
        return (this._zoom * ratio) / CSS_UNITS;
    }
    destroy() {
        const { loadingTask } = this;
        if (loadingTask && !loadingTask.destroyed) {
            loadingTask.destroy();
        }
        if (this._pdf) {
            this._pdf.destroy();
            this._pdf = null;
            this.cleanDoc();
        }
    }
    setupPageViewer() {
        this.win.pdfjsLib.disableTextLayer = !this._renderText;
        this.win.pdfjsLib.externalLinkTarget = this.externalLinkTarget;
        this.setupMultiPageViewer();
        this.setupSinglePageViewer();
    }
    createEventBus() {
        const eventBus = new this.win.pdfjsViewer.EventBus();
        eventBus.on(`pagesinit`, (ev) => {
            this.emit('pages-init', { ev });
        });
        eventBus.on(`pagerendered`, (ev) => {
            this.emit('page-rendered', { ev });
        });
        eventBus.on(`pagechanging`, (ev) => {
            const nowPi = ev.pageNumber;
            if (nowPi !== this._pi) {
                this._pi = nowPi;
                this.emit('pi', { ev });
            }
        });
        eventBus.on(`textlayerrendered`, (ev) => {
            this.emit('text-layer-rendered', { ev });
        });
        return eventBus;
    }
    setupMultiPageViewer() {
        const VIEWER = this.win.pdfjsViewer;
        const eventBus = (this._eventBus = this.createEventBus());
        const linkService = (this.multiPageLinkService = new VIEWER.PDFLinkService({
            eventBus
        }));
        const findController = (this.multiPageFindController = new VIEWER.PDFFindController({
            eventBus,
            linkService
        }));
        const viewer = (this.multiPageViewer = new VIEWER.PDFViewer({
            eventBus,
            container: this.el,
            removePageBorders: !this.showBorders,
            textLayerMode: this._textLayerMode,
            linkService,
            findController
        }));
        linkService.setViewer(viewer);
    }
    setupSinglePageViewer() {
        const VIEWER = this.win.pdfjsViewer;
        const eventBus = this.createEventBus();
        const linkService = (this.singlePageLinkService = new VIEWER.PDFLinkService({
            eventBus
        }));
        const findController = (this.singlePageFindController = new VIEWER.PDFFindController({
            eventBus,
            linkService
        }));
        const pageViewer = (this.singlePageViewer = new VIEWER.PDFSinglePageViewer({
            eventBus,
            container: this.el,
            removePageBorders: !this.showBorders,
            textLayerMode: this._textLayerMode,
            linkService,
            findController
        }));
        linkService.setViewer(pageViewer);
        pageViewer._currentPageNumber = this._pi;
    }
    ngAfterViewInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        if (this.win.pdfjsLib) {
            this.initDelay();
            return;
        }
        const { lib } = this;
        this.lazySrv
            .load(`${lib}build/pdf.min.js`)
            .then(() => this.lazySrv.load([`${lib}web/pdf_viewer.js`, `${lib}web/pdf_viewer.css`]))
            .then(() => this.initDelay());
        this.ngZone.runOutsideAngular(() => this.initResize());
    }
    initResize() {
        fromEvent(this.win, 'resize')
            .pipe(debounceTime(100), filter(() => this.autoReSize && this._pdf != null), takeUntilDestroyed(this.destroy$))
            .subscribe(() => this.updateSize());
    }
    ngOnChanges(changes) {
        if (this.inited && !changes.src) {
            this.render();
        }
    }
    ngOnDestroy() {
        this.destroy();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PdfComponent, deps: [{ token: i0.NgZone }, { token: i1.YunzaiConfigService }, { token: i2.LazyService }, { token: i3.Platform }, { token: i0.ElementRef }, { token: DOCUMENT, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PdfComponent, selector: "pdf", inputs: { src: "src", pi: "pi", showAll: "showAll", renderText: "renderText", textLayerMode: "textLayerMode", showBorders: "showBorders", stickToPage: "stickToPage", originalSize: "originalSize", fitToPage: "fitToPage", zoom: "zoom", zoomScale: "zoomScale", rotation: "rotation", autoReSize: "autoReSize", externalLinkTarget: "externalLinkTarget", delay: "delay" }, outputs: { change: "change" }, host: { properties: { "class.d-block": "true" } }, exportAs: ["pdf"], usesOnChanges: true, ngImport: i0, template: `
    <nz-skeleton *ngIf="!inited || loading" />
    <div class="pdf-container">
      <div class="pdfViewer"></div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    InputNumber()
], PdfComponent.prototype, "pi", null);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "showAll", null);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "renderText", null);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "showBorders", void 0);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "stickToPage", void 0);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "originalSize", void 0);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "fitToPage", void 0);
__decorate([
    InputNumber()
], PdfComponent.prototype, "zoom", null);
__decorate([
    InputNumber()
], PdfComponent.prototype, "rotation", null);
__decorate([
    InputBoolean()
], PdfComponent.prototype, "autoReSize", void 0);
__decorate([
    InputNumber()
], PdfComponent.prototype, "delay", void 0);
__decorate([
    ZoneOutside()
], PdfComponent.prototype, "load", null);
__decorate([
    ZoneOutside()
], PdfComponent.prototype, "resetDoc", null);
__decorate([
    ZoneOutside()
], PdfComponent.prototype, "updateSize", null);
__decorate([
    ZoneOutside()
], PdfComponent.prototype, "destroy", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PdfComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pdf',
                    exportAs: 'pdf',
                    template: `
    <nz-skeleton *ngIf="!inited || loading" />
    <div class="pdf-container">
      <div class="pdfViewer"></div>
    </div>
  `,
                    host: {
                        '[class.d-block]': `true`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.YunzaiConfigService }, { type: i2.LazyService }, { type: i3.Platform }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { src: [{
                type: Input
            }], pi: [{
                type: Input
            }], showAll: [{
                type: Input
            }], renderText: [{
                type: Input
            }], textLayerMode: [{
                type: Input
            }], showBorders: [{
                type: Input
            }], stickToPage: [{
                type: Input
            }], originalSize: [{
                type: Input
            }], fitToPage: [{
                type: Input
            }], zoom: [{
                type: Input
            }], zoomScale: [{
                type: Input
            }], rotation: [{
                type: Input
            }], autoReSize: [{
                type: Input
            }], externalLinkTarget: [{
                type: Input
            }], delay: [{
                type: Input
            }], change: [{
                type: Output
            }], load: [], resetDoc: [], updateSize: [], destroy: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9wZGYvcGRmLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLGlCQUFpQixFQUNqQixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVM5RCxPQUFPLEVBQWdCLFlBQVksRUFBRSxXQUFXLEVBQWUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJMUcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBc0MscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQWdCLE1BQU0sYUFBYSxDQUFDOzs7Ozs7O0FBWXhILE1BQU0sU0FBUyxHQUFXLElBQUksR0FBRyxJQUFJLENBQUM7QUFDdEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBa0J2QixNQUFNLE9BQU8sWUFBWTtJQWlDdkIsSUFBYSxHQUFHLENBQUMsWUFBdUI7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdELElBQUksRUFBRSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElB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VyxFQUFFOzJDQUFnQjtBQWtHL0I7SUFEUCxXQUFXLEVBQUU7d0NBdUNiO0FBR087SUFEUCxXQUFXLEVBQUU7NENBV2I7QUEyQ087SUFEUCxXQUFXLEVBQUU7OENBdUJiO0FBOEJPO0lBRFAsV0FBVyxFQUFFOzJDQVdiOzRGQXhVVSxZQUFZO2tCQWhCeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUU7Ozs7O0dBS1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLGlCQUFpQixFQUFFLE1BQU07cUJBQzFCO29CQUNELG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7OzBCQXdISSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFFBQVE7NEVBdEZqQixHQUFHO3NCQUFmLEtBQUs7Z0JBTUYsRUFBRTtzQkFGTCxLQUFLO2dCQVF1QixPQUFPO3NCQUFuQyxLQUFLO2dCQUl1QixVQUFVO3NCQUF0QyxLQUFLO2dCQU1HLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ21CLFdBQVc7c0JBQW5DLEtBQUs7Z0JBQ21CLFdBQVc7c0JBQW5DLEtBQUs7Z0JBQ21CLFlBQVk7c0JBQXBDLEtBQUs7Z0JBQ21CLFNBQVM7c0JBQWpDLEtBQUs7Z0JBQ3NCLElBQUk7c0JBQS9CLEtBQUs7Z0JBSUcsU0FBUztzQkFBakIsS0FBSztnQkFDc0IsUUFBUTtzQkFBbkMsS0FBSztnQkFPbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ2tCLEtBQUs7c0JBQTVCLEtBQUs7Z0JBQ2EsTUFBTTtzQkFBeEIsTUFBTTtnQkFpR0MsSUFBSSxNQXlDSixRQUFRLE1BcURSLFVBQVUsTUFvRFYsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IGZyb21FdmVudCwgdGltZXIsIGRlYm91bmNlVGltZSwgZmlsdGVyIH0gZnJvbSAncnhqcyc7XG5cbi8vIGltcG9ydCB0eXBlIHsgUERGRG9jdW1lbnRMb2FkaW5nVGFzaywgUERGRG9jdW1lbnRQcm94eSB9IGZyb20gJ3BkZmpzLWRpc3QnO1xuLy8gaW1wb3J0IHR5cGUgeyBFdmVudEJ1cyB9IGZyb20gJ3BkZmpzLWRpc3QvdHlwZXMvd2ViL2V2ZW50X3V0aWxzJztcbi8vIGltcG9ydCB0eXBlIHsgUERGRmluZENvbnRyb2xsZXIgfSBmcm9tICdwZGZqcy1kaXN0L3R5cGVzL3dlYi9wZGZfZmluZF9jb250cm9sbGVyJztcbi8vIGltcG9ydCB0eXBlIHsgUERGTGlua1NlcnZpY2UgfSBmcm9tICdwZGZqcy1kaXN0L3R5cGVzL3dlYi9wZGZfbGlua19zZXJ2aWNlJztcbi8vIGltcG9ydCB0eXBlIHsgUERGVmlld2VyIH0gZnJvbSAncGRmanMtZGlzdC90eXBlcy93ZWIvcGRmX3ZpZXdlcic7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCBOdW1iZXJJbnB1dCwgWm9uZU91dHNpZGUgfSBmcm9tICdAeWVsb24vdXRpbC9kZWNvcmF0b3InO1xuaW1wb3J0IHsgTGF6eVNlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFBERl9ERUZVTEFUX0NPTkZJRyB9IGZyb20gJy4vcGRmLmNvbmZpZyc7XG5pbXBvcnQgeyBQZGZDaGFuZ2VFdmVudCwgUGRmQ2hhbmdlRXZlbnRUeXBlLCBQZGZFeHRlcm5hbExpbmtUYXJnZXQsIFBkZlRleHRMYXllck1vZGUsIFBkZlpvb21TY2FsZSB9IGZyb20gJy4vcGRmLnR5cGVzJztcblxuLy8gVE9ETzogQWx0aG91Z2ggcGRmanMtZGlzdCBpcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5IG9uIGNhbnZhc1xuLy8gd2lsbCBiZSBpbnN0YWxsZWQgYXV0b21hdGljYWxseSB3aGVuIHRoZSBkZXBlbmRlbmN5IGlzIGluc3RhbGxlZCBieSBkZWZhdWx0O1xuLy8gVGhpcyByZXF1aXJlcyBhIGhpZ2hlciBlbnZpcm9ubWVudCBhbmQgb2Z0ZW4gZmFpbHMgdG8gaW5zdGFsbFxudHlwZSBQREZEb2N1bWVudExvYWRpbmdUYXNrID0gTnpTYWZlQW55O1xudHlwZSBQREZEb2N1bWVudFByb3h5ID0gTnpTYWZlQW55O1xudHlwZSBFdmVudEJ1cyA9IE56U2FmZUFueTtcbnR5cGUgUERGRmluZENvbnRyb2xsZXIgPSBOelNhZmVBbnk7XG50eXBlIFBERkxpbmtTZXJ2aWNlID0gTnpTYWZlQW55O1xudHlwZSBQREZWaWV3ZXIgPSBOelNhZmVBbnk7XG5cbmNvbnN0IENTU19VTklUUzogbnVtYmVyID0gOTYuMCAvIDcyLjA7XG5jb25zdCBCT1JERVJfV0lEVEggPSA5O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwZGYnLFxuICBleHBvcnRBczogJ3BkZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXNrZWxldG9uICpuZ0lmPVwiIWluaXRlZCB8fCBsb2FkaW5nXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwicGRmLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBkZlZpZXdlclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kLWJsb2NrXSc6IGB0cnVlYFxuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUGRmQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcGk6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGVsYXk6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd0FsbFBhZ2VzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGlja1RvUGFnZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3JpZ2luYWxTaXplOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXRUb1BhZ2U6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVUZXh0TGF5ZXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlbW92ZVBhZ2VCb3JkZXJzOiBCb29sZWFuSW5wdXQ7XG5cbiAgaW5pdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgbGliOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfcGRmPzogUERGRG9jdW1lbnRQcm94eSB8IG51bGw7XG4gIHByaXZhdGUgbG9hZGluZ1Rhc2s/OiBQREZEb2N1bWVudExvYWRpbmdUYXNrO1xuICBwcml2YXRlIF9zcmM6IE56U2FmZUFueTtcbiAgcHJpdmF0ZSBsYXN0U3JjPzogTnpTYWZlQW55O1xuICBwcml2YXRlIF9waSA9IDE7XG4gIHByaXZhdGUgX3RvdGFsID0gMDtcbiAgcHJpdmF0ZSBfc2hvd0FsbCA9IHRydWU7XG4gIHByaXZhdGUgX3JvdGF0aW9uID0gMDtcbiAgcHJpdmF0ZSBfem9vbSA9IDE7XG4gIHByaXZhdGUgX3JlbmRlclRleHQgPSB0cnVlO1xuICBwcml2YXRlIF9sb2FkaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBtdWx0aVBhZ2VWaWV3ZXI/OiBQREZWaWV3ZXI7XG4gIHByaXZhdGUgbXVsdGlQYWdlTGlua1NlcnZpY2U/OiBQREZMaW5rU2VydmljZTtcbiAgcHJpdmF0ZSBtdWx0aVBhZ2VGaW5kQ29udHJvbGxlcj86IFBERkZpbmRDb250cm9sbGVyO1xuICBwcml2YXRlIHNpbmdsZVBhZ2VWaWV3ZXI/OiBQREZWaWV3ZXI7XG4gIHByaXZhdGUgc2luZ2xlUGFnZUxpbmtTZXJ2aWNlPzogUERGTGlua1NlcnZpY2U7XG4gIHByaXZhdGUgc2luZ2xlUGFnZUZpbmRDb250cm9sbGVyPzogUERGRmluZENvbnRyb2xsZXI7XG4gIHByaXZhdGUgX2V2ZW50QnVzPzogRXZlbnRCdXM7XG5cbiAgQElucHV0KCkgc2V0IHNyYyhkYXRhT3JCdWZmZXI6IE56U2FmZUFueSkge1xuICAgIHRoaXMuX3NyYyA9IGRhdGFPckJ1ZmZlcjtcbiAgICB0aGlzLmxvYWQoKTtcbiAgfVxuICBASW5wdXQoKVxuICBASW5wdXROdW1iZXIoKVxuICBzZXQgcGkodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9waSA9IHRoaXMuZ2V0VmFsaWRQaSh2YWwpO1xuICAgIGlmICh0aGlzLnBhZ2VWaWV3ZXIpIHtcbiAgICAgIHRoaXMucGFnZVZpZXdlci5zY3JvbGxQYWdlSW50b1ZpZXcoeyBwYWdlTnVtYmVyOiB0aGlzLl9waSB9KTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHNldCBzaG93QWxsKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dBbGwgPSB2YWw7XG4gICAgdGhpcy5yZXNldERvYygpO1xuICB9XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBzZXQgcmVuZGVyVGV4dCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW5kZXJUZXh0ID0gdmFsO1xuICAgIGlmICh0aGlzLnBhZ2VWaWV3ZXIpIHtcbiAgICAgIHRoaXMucmVzZXREb2MoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgdGV4dExheWVyTW9kZSA9IFBkZlRleHRMYXllck1vZGUuRU5BQkxFO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgc2hvd0JvcmRlcnMgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHN0aWNrVG9QYWdlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBvcmlnaW5hbFNpemUgPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgZml0VG9QYWdlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIHNldCB6b29tKHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHZhbCA8PSAwKSByZXR1cm47XG4gICAgdGhpcy5fem9vbSA9IHZhbDtcbiAgfVxuICBASW5wdXQoKSB6b29tU2NhbGU6IFBkZlpvb21TY2FsZSA9ICdwYWdlLXdpZHRoJztcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgc2V0IHJvdGF0aW9uKHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHZhbCAlIDkwICE9PSAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oYEludmFsaWQgcm90YXRpb24gYW5nbGUsIHNob3VsZSBiZSBkaXZpc2libGUgYnkgOTAuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsO1xuICB9XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBhdXRvUmVTaXplID0gdHJ1ZTtcbiAgQElucHV0KCkgZXh0ZXJuYWxMaW5rVGFyZ2V0ID0gUGRmRXh0ZXJuYWxMaW5rVGFyZ2V0LkJMQU5LO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBkZWxheT86IG51bWJlcjtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGRmQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgZ2V0IGxvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICBnZXQgcGRmKCk6IFBERkRvY3VtZW50UHJveHkgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcGRmO1xuICB9XG5cbiAgZ2V0IGZpbmRDb250cm9sbGVyKCk6IFBERkZpbmRDb250cm9sbGVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FsbCA/IHRoaXMubXVsdGlQYWdlRmluZENvbnRyb2xsZXIgOiB0aGlzLnNpbmdsZVBhZ2VGaW5kQ29udHJvbGxlcjtcbiAgfVxuXG4gIGdldCBwYWdlVmlld2VyKCk6IFBERlZpZXdlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dBbGwgPyB0aGlzLm11bHRpUGFnZVZpZXdlciA6IHRoaXMuc2luZ2xlUGFnZVZpZXdlcjtcbiAgfVxuXG4gIGdldCBsaW5rU2VydmljZSgpOiBQREZMaW5rU2VydmljZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dBbGwgPyB0aGlzLm11bHRpUGFnZUxpbmtTZXJ2aWNlIDogdGhpcy5zaW5nbGVQYWdlTGlua1NlcnZpY2U7XG4gIH1cblxuICBnZXQgZXZlbnRCdXMoKTogRXZlbnRCdXMgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9ldmVudEJ1cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IF90ZXh0TGF5ZXJNb2RlKCk6IFBkZlRleHRMYXllck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJUZXh0ID8gdGhpcy50ZXh0TGF5ZXJNb2RlIDogUGRmVGV4dExheWVyTW9kZS5ESVNBQkxFO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgd2luKCk6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmRlZmF1bHRWaWV3IHx8IHdpbmRvdztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGVsKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGRmLWNvbnRhaW5lcicpIGFzIEhUTUxFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBjb25maWdTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYXp5U3J2OiBMYXp5U2VydmljZSxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IE56U2FmZUFueSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgY29uc3QgY29nID0gY29uZmlnU3J2Lm1lcmdlKCdwZGYnLCBQREZfREVGVUxBVF9DT05GSUcpITtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvZyk7XG5cbiAgICBjb25zdCBsaWIgPSBjb2cubGliITtcbiAgICB0aGlzLmxpYiA9IGxpYi5lbmRzV2l0aCgnLycpID8gbGliIDogYCR7bGlifS9gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWxpZFBpKHBpOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChwaSA8IDEpIHJldHVybiAxO1xuICAgIGNvbnN0IHBkZiA9IHRoaXMuX3BkZjtcbiAgICByZXR1cm4gcGRmICYmIHBpID4gcGRmLm51bVBhZ2VzID8gcGRmLm51bVBhZ2VzIDogcGk7XG4gIH1cblxuICBwcml2YXRlIGVtaXQodHlwZTogUGRmQ2hhbmdlRXZlbnRUeXBlLCBvcHQ/OiBQZGZDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PlxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHBkZjogdGhpcy5fcGRmLFxuICAgICAgICBwaTogdGhpcy5fcGksXG4gICAgICAgIHRvdGFsOiB0aGlzLl90b3RhbCxcbiAgICAgICAgLi4ub3B0XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGluaXREZWxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2luLnBkZmpzTGliKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyB3aW5kb3cucGRmanNMaWIgZm91bmQsIHBsZWFzZSBtYWtlIHN1cmUgdGhhdCBjZG4gb3IgbG9jYWwgcGF0aCBleGlzdHMsIHRoZSBjdXJyZW50IHJlZmVyZW5jZWQgcGF0aCBpczogJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICB0aGlzLmxpYlxuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy53aW4ucGRmanNMaWIuR2xvYmFsV29ya2VyT3B0aW9ucy53b3JrZXJTcmMgPSBgJHt0aGlzLmxpYn1idWlsZC9wZGYud29ya2VyLm1pbi5qc2A7XG5cbiAgICB0aW1lcih0aGlzLmRlbGF5ID8/IDApXG4gICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubG9hZCgpKTtcbiAgfVxuXG4gIHNldExvYWRpbmcoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2xvYWRpbmcgPSBzdGF0dXM7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBAWm9uZU91dHNpZGUoKVxuICBwcml2YXRlIGxvYWQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBfc3JjIH0gPSB0aGlzO1xuICAgIGlmICghdGhpcy5pbml0ZWQgfHwgIV9zcmMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0U3JjID09PSBfc3JjKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLl9sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNldExvYWRpbmcodHJ1ZSk7XG4gICAgY29uc3QgbG9hZGluZ1Rhc2s6IFBERkRvY3VtZW50TG9hZGluZ1Rhc2sgPSAodGhpcy5sb2FkaW5nVGFzayA9IHRoaXMud2luLnBkZmpzTGliLmdldERvY3VtZW50KF9zcmMpKTtcbiAgICBsb2FkaW5nVGFzay5vblByb2dyZXNzID0gKHByb2dyZXNzOiB7IGxvYWRlZDogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH0pID0+IHRoaXMuZW1pdCgnbG9hZC1wcm9ncmVzcycsIHsgcHJvZ3Jlc3MgfSk7XG4gICAgKGxvYWRpbmdUYXNrLnByb21pc2UgYXMgUHJvbWlzZUxpa2U8UERGRG9jdW1lbnRQcm94eT4pXG4gICAgICAudGhlbihcbiAgICAgICAgcGRmID0+IHtcbiAgICAgICAgICB0aGlzLl9wZGYgPSBwZGY7XG4gICAgICAgICAgdGhpcy5sYXN0U3JjID0gX3NyYztcbiAgICAgICAgICB0aGlzLl90b3RhbCA9IHBkZi5udW1QYWdlcztcblxuICAgICAgICAgIHRoaXMuZW1pdCgnbG9hZGVkJyk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucGFnZVZpZXdlcikge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFBhZ2VWaWV3ZXIoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnJlc2V0RG9jKCk7XG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lbWl0KCdlcnJvcicsIHsgZXJyb3IgfSlcbiAgICAgIClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuc2V0TG9hZGluZyhmYWxzZSkpO1xuICB9XG5cbiAgQFpvbmVPdXRzaWRlKClcbiAgcHJpdmF0ZSByZXNldERvYygpOiB2b2lkIHtcbiAgICBjb25zdCBwZGYgPSB0aGlzLl9wZGY7XG4gICAgaWYgKCFwZGYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhbkRvYygpO1xuXG4gICAgdGhpcy5maW5kQ29udHJvbGxlciEuc2V0RG9jdW1lbnQocGRmKTtcbiAgICB0aGlzLnBhZ2VWaWV3ZXIhLnNldERvY3VtZW50KHBkZik7XG4gICAgdGhpcy5saW5rU2VydmljZSEuc2V0RG9jdW1lbnQocGRmLCBudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5Eb2MoKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aVBhZ2VWaWV3ZXIhLnNldERvY3VtZW50KG51bGwgYXMgTnpTYWZlQW55KTtcbiAgICB0aGlzLnNpbmdsZVBhZ2VWaWV3ZXIhLnNldERvY3VtZW50KG51bGwgYXMgTnpTYWZlQW55KTtcblxuICAgIHRoaXMubXVsdGlQYWdlTGlua1NlcnZpY2UhLnNldERvY3VtZW50KG51bGwsIG51bGwpO1xuICAgIHRoaXMuc2luZ2xlUGFnZUxpbmtTZXJ2aWNlIS5zZXREb2N1bWVudChudWxsLCBudWxsKTtcblxuICAgIHRoaXMubXVsdGlQYWdlRmluZENvbnRyb2xsZXIhLnNldERvY3VtZW50KG51bGwgYXMgTnpTYWZlQW55KTtcbiAgICB0aGlzLnNpbmdsZVBhZ2VGaW5kQ29udHJvbGxlciEuc2V0RG9jdW1lbnQobnVsbCBhcyBOelNhZmVBbnkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFZpZXdlciA9IHRoaXMucGFnZVZpZXdlcjtcbiAgICBpZiAoIWN1cnJlbnRWaWV3ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcm90YXRpb24gIT09IDAgfHwgY3VycmVudFZpZXdlci5wYWdlc1JvdGF0aW9uICE9PSB0aGlzLl9yb3RhdGlvbikge1xuICAgICAgdGhpcy50aW1lRXhlYygoKSA9PiB7XG4gICAgICAgIGN1cnJlbnRWaWV3ZXIucGFnZXNSb3RhdGlvbiA9IHRoaXMuX3JvdGF0aW9uO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RpY2tUb1BhZ2UpIHtcbiAgICAgIHRoaXMudGltZUV4ZWMoKCkgPT4ge1xuICAgICAgICBjdXJyZW50Vmlld2VyLmN1cnJlbnRQYWdlTnVtYmVyID0gdGhpcy5fcGk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdGltZUV4ZWMoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aW1lcigwKVxuICAgICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZm4oKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgQFpvbmVPdXRzaWRlKClcbiAgcHJpdmF0ZSB1cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRWaWV3ZXIgPSB0aGlzLnBhZ2VWaWV3ZXI7XG4gICAgaWYgKCFjdXJyZW50Vmlld2VyKSByZXR1cm47XG5cbiAgICB0aGlzLl9wZGYhLmdldFBhZ2UoY3VycmVudFZpZXdlci5jdXJyZW50UGFnZU51bWJlcikudGhlbigocGFnZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICBjb25zdCB7IF9yb3RhdGlvbiwgX3pvb20gfSA9IHRoaXM7XG4gICAgICBjb25zdCByb3RhdGlvbiA9IF9yb3RhdGlvbiB8fCBwYWdlLnJvdGF0ZTtcbiAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPVxuICAgICAgICBwYWdlLmdldFZpZXdwb3J0KHtcbiAgICAgICAgICBzY2FsZTogX3pvb20sXG4gICAgICAgICAgcm90YXRpb25cbiAgICAgICAgfSkud2lkdGggKiBDU1NfVU5JVFM7XG4gICAgICBsZXQgc2NhbGUgPSBfem9vbTtcblxuICAgICAgLy8gU2NhbGUgdGhlIGRvY3VtZW50IHdoZW4gaXQgc2hvdWxkbid0IGJlIGluIG9yaWdpbmFsIHNpemUgb3IgZG9lc24ndCBmaXQgaW50byB0aGUgdmlld3BvcnRcbiAgICAgIGlmICghdGhpcy5vcmlnaW5hbFNpemUgfHwgKHRoaXMuZml0VG9QYWdlICYmIHZpZXdwb3J0V2lkdGggPiB0aGlzLmVsLmNsaWVudFdpZHRoKSkge1xuICAgICAgICBjb25zdCB2aWV3UG9ydCA9IHBhZ2UuZ2V0Vmlld3BvcnQoeyBzY2FsZTogMSwgcm90YXRpb24gfSk7XG4gICAgICAgIHNjYWxlID0gdGhpcy5nZXRTY2FsZSh2aWV3UG9ydC53aWR0aCwgdmlld1BvcnQuaGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFZpZXdlci5jdXJyZW50U2NhbGUgPSBzY2FsZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2NhbGUodmlld3BvcnRXaWR0aDogbnVtYmVyLCB2aWV3cG9ydEhlaWdodDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBib3JkZXJTaXplID0gdGhpcy5zaG93Qm9yZGVycyA/IDIgKiBCT1JERVJfV0lEVEggOiAwO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbDtcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IGVsLmNsaWVudFdpZHRoIC0gYm9yZGVyU2l6ZTtcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQgLSBib3JkZXJTaXplO1xuXG4gICAgaWYgKGNvbnRhaW5lckhlaWdodCA9PT0gMCB8fCB2aWV3cG9ydEhlaWdodCA9PT0gMCB8fCBjb250YWluZXJXaWR0aCA9PT0gMCB8fCB2aWV3cG9ydFdpZHRoID09PSAwKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBsZXQgcmF0aW8gPSAxO1xuICAgIHN3aXRjaCAodGhpcy56b29tU2NhbGUpIHtcbiAgICAgIGNhc2UgJ3BhZ2UtZml0JzpcbiAgICAgICAgcmF0aW8gPSBNYXRoLm1pbihjb250YWluZXJIZWlnaHQgLyB2aWV3cG9ydEhlaWdodCwgY29udGFpbmVyV2lkdGggLyB2aWV3cG9ydFdpZHRoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwYWdlLWhlaWdodCc6XG4gICAgICAgIHJhdGlvID0gY29udGFpbmVySGVpZ2h0IC8gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGFnZS13aWR0aCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByYXRpbyA9IGNvbnRhaW5lcldpZHRoIC8gdmlld3BvcnRXaWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuICh0aGlzLl96b29tICogcmF0aW8pIC8gQ1NTX1VOSVRTO1xuICB9XG5cbiAgQFpvbmVPdXRzaWRlKClcbiAgcHJpdmF0ZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgbG9hZGluZ1Rhc2sgfSA9IHRoaXM7XG4gICAgaWYgKGxvYWRpbmdUYXNrICYmICFsb2FkaW5nVGFzay5kZXN0cm95ZWQpIHtcbiAgICAgIGxvYWRpbmdUYXNrLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3BkZikge1xuICAgICAgdGhpcy5fcGRmLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3BkZiA9IG51bGw7XG4gICAgICB0aGlzLmNsZWFuRG9jKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFBhZ2VWaWV3ZXIoKTogdm9pZCB7XG4gICAgdGhpcy53aW4ucGRmanNMaWIuZGlzYWJsZVRleHRMYXllciA9ICF0aGlzLl9yZW5kZXJUZXh0O1xuICAgIHRoaXMud2luLnBkZmpzTGliLmV4dGVybmFsTGlua1RhcmdldCA9IHRoaXMuZXh0ZXJuYWxMaW5rVGFyZ2V0O1xuXG4gICAgdGhpcy5zZXR1cE11bHRpUGFnZVZpZXdlcigpO1xuICAgIHRoaXMuc2V0dXBTaW5nbGVQYWdlVmlld2VyKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV2ZW50QnVzKCk6IEV2ZW50QnVzIHtcbiAgICBjb25zdCBldmVudEJ1czogRXZlbnRCdXMgPSBuZXcgdGhpcy53aW4ucGRmanNWaWV3ZXIuRXZlbnRCdXMoKTtcbiAgICBldmVudEJ1cy5vbihgcGFnZXNpbml0YCwgKGV2OiBOelNhZmVBbnkpID0+IHtcbiAgICAgIHRoaXMuZW1pdCgncGFnZXMtaW5pdCcsIHsgZXYgfSk7XG4gICAgfSk7XG4gICAgZXZlbnRCdXMub24oYHBhZ2VyZW5kZXJlZGAsIChldjogTnpTYWZlQW55KSA9PiB7XG4gICAgICB0aGlzLmVtaXQoJ3BhZ2UtcmVuZGVyZWQnLCB7IGV2IH0pO1xuICAgIH0pO1xuICAgIGV2ZW50QnVzLm9uKGBwYWdlY2hhbmdpbmdgLCAoZXY6IE56U2FmZUFueSkgPT4ge1xuICAgICAgY29uc3Qgbm93UGkgPSBldi5wYWdlTnVtYmVyO1xuICAgICAgaWYgKG5vd1BpICE9PSB0aGlzLl9waSkge1xuICAgICAgICB0aGlzLl9waSA9IG5vd1BpO1xuICAgICAgICB0aGlzLmVtaXQoJ3BpJywgeyBldiB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBldmVudEJ1cy5vbihgdGV4dGxheWVycmVuZGVyZWRgLCAoZXY6IE56U2FmZUFueSkgPT4ge1xuICAgICAgdGhpcy5lbWl0KCd0ZXh0LWxheWVyLXJlbmRlcmVkJywgeyBldiB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZXZlbnRCdXM7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTXVsdGlQYWdlVmlld2VyKCk6IHZvaWQge1xuICAgIGNvbnN0IFZJRVdFUiA9IHRoaXMud2luLnBkZmpzVmlld2VyO1xuXG4gICAgY29uc3QgZXZlbnRCdXMgPSAodGhpcy5fZXZlbnRCdXMgPSB0aGlzLmNyZWF0ZUV2ZW50QnVzKCkpO1xuICAgIGNvbnN0IGxpbmtTZXJ2aWNlOiBQREZMaW5rU2VydmljZSA9ICh0aGlzLm11bHRpUGFnZUxpbmtTZXJ2aWNlID0gbmV3IFZJRVdFUi5QREZMaW5rU2VydmljZSh7XG4gICAgICBldmVudEJ1c1xuICAgIH0pKTtcbiAgICBjb25zdCBmaW5kQ29udHJvbGxlcjogUERGRmluZENvbnRyb2xsZXIgPSAodGhpcy5tdWx0aVBhZ2VGaW5kQ29udHJvbGxlciA9IG5ldyBWSUVXRVIuUERGRmluZENvbnRyb2xsZXIoe1xuICAgICAgZXZlbnRCdXMsXG4gICAgICBsaW5rU2VydmljZVxuICAgIH0pKTtcblxuICAgIGNvbnN0IHZpZXdlcjogUERGVmlld2VyID0gKHRoaXMubXVsdGlQYWdlVmlld2VyID0gbmV3IFZJRVdFUi5QREZWaWV3ZXIoe1xuICAgICAgZXZlbnRCdXMsXG4gICAgICBjb250YWluZXI6IHRoaXMuZWwsXG4gICAgICByZW1vdmVQYWdlQm9yZGVyczogIXRoaXMuc2hvd0JvcmRlcnMsXG4gICAgICB0ZXh0TGF5ZXJNb2RlOiB0aGlzLl90ZXh0TGF5ZXJNb2RlLFxuICAgICAgbGlua1NlcnZpY2UsXG4gICAgICBmaW5kQ29udHJvbGxlclxuICAgIH0pKTtcbiAgICBsaW5rU2VydmljZS5zZXRWaWV3ZXIodmlld2VyKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTaW5nbGVQYWdlVmlld2VyKCk6IHZvaWQge1xuICAgIGNvbnN0IFZJRVdFUiA9IHRoaXMud2luLnBkZmpzVmlld2VyO1xuXG4gICAgY29uc3QgZXZlbnRCdXMgPSB0aGlzLmNyZWF0ZUV2ZW50QnVzKCk7XG4gICAgY29uc3QgbGlua1NlcnZpY2U6IFBERkxpbmtTZXJ2aWNlID0gKHRoaXMuc2luZ2xlUGFnZUxpbmtTZXJ2aWNlID0gbmV3IFZJRVdFUi5QREZMaW5rU2VydmljZSh7XG4gICAgICBldmVudEJ1c1xuICAgIH0pKTtcbiAgICBjb25zdCBmaW5kQ29udHJvbGxlcjogUERGRmluZENvbnRyb2xsZXIgPSAodGhpcy5zaW5nbGVQYWdlRmluZENvbnRyb2xsZXIgPSBuZXcgVklFV0VSLlBERkZpbmRDb250cm9sbGVyKHtcbiAgICAgIGV2ZW50QnVzLFxuICAgICAgbGlua1NlcnZpY2VcbiAgICB9KSk7XG5cbiAgICBjb25zdCBwYWdlVmlld2VyID0gKHRoaXMuc2luZ2xlUGFnZVZpZXdlciA9IG5ldyBWSUVXRVIuUERGU2luZ2xlUGFnZVZpZXdlcih7XG4gICAgICBldmVudEJ1cyxcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5lbCxcbiAgICAgIHJlbW92ZVBhZ2VCb3JkZXJzOiAhdGhpcy5zaG93Qm9yZGVycyxcbiAgICAgIHRleHRMYXllck1vZGU6IHRoaXMuX3RleHRMYXllck1vZGUsXG4gICAgICBsaW5rU2VydmljZSxcbiAgICAgIGZpbmRDb250cm9sbGVyXG4gICAgfSkpO1xuICAgIGxpbmtTZXJ2aWNlLnNldFZpZXdlcihwYWdlVmlld2VyKTtcbiAgICBwYWdlVmlld2VyLl9jdXJyZW50UGFnZU51bWJlciA9IHRoaXMuX3BpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMud2luLnBkZmpzTGliKSB7XG4gICAgICB0aGlzLmluaXREZWxheSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxpYiB9ID0gdGhpcztcbiAgICB0aGlzLmxhenlTcnZcbiAgICAgIC5sb2FkKGAke2xpYn1idWlsZC9wZGYubWluLmpzYClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubGF6eVNydi5sb2FkKFtgJHtsaWJ9d2ViL3BkZl92aWV3ZXIuanNgLCBgJHtsaWJ9d2ViL3BkZl92aWV3ZXIuY3NzYF0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5pbml0RGVsYXkoKSk7XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLmluaXRSZXNpemUoKSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRSZXNpemUoKTogdm9pZCB7XG4gICAgZnJvbUV2ZW50KHRoaXMud2luLCAncmVzaXplJylcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuYXV0b1JlU2l6ZSAmJiB0aGlzLl9wZGYgIT0gbnVsbCksXG4gICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVNpemUoKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwIGluIGtleW9mIFBkZkNvbXBvbmVudF0/OiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluaXRlZCAmJiAhY2hhbmdlcy5zcmMpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==