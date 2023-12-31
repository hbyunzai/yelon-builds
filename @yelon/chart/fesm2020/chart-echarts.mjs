import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Input, Output, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import * as i1 from '@yelon/util/config';
import * as i2 from '@yelon/util/other';
import { __decorate } from 'tslib';
import { takeUntil, filter, debounceTime } from 'rxjs/operators';
import { ZoneOutside } from '@yelon/util/decorator';
import * as i2$1 from '@angular/cdk/platform';
import * as i3 from 'ng-zorro-antd/skeleton';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

class ChartEChartsService {
    constructor(cogSrv, lazySrv) {
        this.cogSrv = cogSrv;
        this.lazySrv = lazySrv;
        this.loading = false;
        this.loaded = false;
        this.notify$ = new Subject();
        this.cog = { theme: '' };
    }
    get cog() {
        return this._cog;
    }
    set cog(val) {
        this._cog = this.cogSrv.merge('chart', {
            theme: '',
            echartsLib: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.1.0/echarts.min.js'
        }, val);
    }
    libLoad() {
        if (this.loading) {
            if (this.loaded) {
                this.notify$.next();
            }
            return this;
        }
        this.loading = true;
        this.lazySrv
            .load(this.cog.echartsLib)
            .then(() => {
            const extensions = this.cog.echartsExtensions;
            if (Array.isArray(extensions) && extensions.length > 0) {
                return this.lazySrv.load(extensions).then(() => true);
            }
            return Promise.resolve(true);
        })
            .then(() => {
            this.loaded = true;
            this.notify$.next();
        });
        return this;
    }
    get notify() {
        return this.notify$.asObservable();
    }
    ngOnDestroy() {
        this.notify$.unsubscribe();
    }
}
ChartEChartsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsService, deps: [{ token: i1.YunzaiConfigService }, { token: i2.LazyService }], target: i0.ɵɵFactoryTarget.Injectable });
ChartEChartsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }, { type: i2.LazyService }]; } });

class ChartEChartsComponent {
    constructor(srv, cdr, ngZone, platform) {
        this.srv = srv;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.platform = platform;
        this.destroy$ = new Subject();
        this._chart = null;
        this._width = '100%';
        this._height = '400px';
        this.on = [];
        this.events = new EventEmitter();
        this.loaded = false;
        this.srv.notify
            .pipe(takeUntil(this.destroy$), filter(() => !this.loaded))
            .subscribe(() => this.load());
        this.theme = srv.cog.echartsTheme;
    }
    set width(val) {
        this._width = typeof val === 'number' ? `${val}px` : `${val}`;
    }
    set height(val) {
        this._height = typeof val === 'number' ? `${val}px` : `${val}`;
    }
    set theme(value) {
        this._theme = value;
        if (this._chart) {
            this.install();
        }
    }
    set initOpt(value) {
        this._initOpt = value;
        if (this._chart) {
            this.install();
        }
    }
    set option(value) {
        this._option = value;
        if (this._chart) {
            this.setOption(value, true);
        }
    }
    get chart() {
        return this._chart;
    }
    emit(type, other) {
        this.events.emit({ type, chart: this.chart, ...other });
    }
    load() {
        this.ngZone.run(() => {
            this.loaded = true;
            this.cdr.detectChanges();
        });
        this.emit('ready');
        this.install();
    }
    install() {
        this.destroy();
        const chart = (this._chart = window.echarts.init(this.node.nativeElement, this._theme, this._initOpt));
        this.emit('init');
        this.setOption(this._option);
        // on
        this.on.forEach(item => {
            if (item.query != null) {
                chart.on(item.eventName, item.query, event => item.handler({ event, chart }));
            }
            else {
                chart.on(item.eventName, event => item.handler({ event, chart }));
            }
        });
        return this;
    }
    destroy() {
        if (this._chart) {
            this._chart.dispose();
            this.emit('destroy');
        }
        return this;
    }
    setOption(option, notMerge = false, lazyUpdate = false) {
        if (this._chart) {
            this._chart.setOption(option, notMerge, lazyUpdate);
            this.emit('set-option', { option });
        }
        return this;
    }
    ngOnInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        if (window.echarts) {
            this.load();
        }
        else {
            this.srv.libLoad();
        }
        fromEvent(window, 'resize')
            .pipe(takeUntil(this.destroy$), filter(() => !!this._chart), debounceTime(200))
            .subscribe(() => this._chart.resize());
    }
    ngOnDestroy() {
        this.on.forEach(item => this._chart?.off(item.eventName));
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy();
    }
}
ChartEChartsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsComponent, deps: [{ token: ChartEChartsService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i2$1.Platform }], target: i0.ɵɵFactoryTarget.Component });
ChartEChartsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: ChartEChartsComponent, selector: "chart-echarts, [chart-echarts]", inputs: { width: "width", height: "height", theme: "theme", initOpt: "initOpt", option: "option", on: "on" }, outputs: { events: "events" }, host: { properties: { "style.display": "'inline-block'", "style.width": "_width", "style.height": "_height" } }, viewQueries: [{ propertyName: "node", first: true, predicate: ["container"], descendants: true, static: true }], exportAs: ["chartECharts"], ngImport: i0, template: `
    <nz-skeleton *ngIf="!loaded"></nz-skeleton>
    <div #container [style.width]="_width" [style.height]="_height"></div>
  `, isInline: true, components: [{ type: i3.NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    ZoneOutside()
], ChartEChartsComponent.prototype, "load", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'chart-echarts, [chart-echarts]',
                    exportAs: 'chartECharts',
                    template: `
    <nz-skeleton *ngIf="!loaded"></nz-skeleton>
    <div #container [style.width]="_width" [style.height]="_height"></div>
  `,
                    host: {
                        '[style.display]': `'inline-block'`,
                        '[style.width]': `_width`,
                        '[style.height]': `_height`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: ChartEChartsService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i2$1.Platform }]; }, propDecorators: { node: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], theme: [{
                type: Input
            }], initOpt: [{
                type: Input
            }], option: [{
                type: Input
            }], on: [{
                type: Input
            }], events: [{
                type: Output
            }], load: [] } });

const COMPONENTS = [ChartEChartsComponent];
class ChartEChartsModule {
}
ChartEChartsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChartEChartsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsModule, declarations: [ChartEChartsComponent], imports: [CommonModule, NzSkeletonModule], exports: [ChartEChartsComponent] });
ChartEChartsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsModule, imports: [[CommonModule, NzSkeletonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ChartEChartsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzSkeletonModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ChartEChartsComponent, ChartEChartsModule, ChartEChartsService };
//# sourceMappingURL=chart-echarts.mjs.map
