import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, inject, DestroyRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, share, timer, take } from 'rxjs';
import { InputNumber, ZoneOutside } from '@yelon/util/decorator';
import * as i1 from '@yelon/util/config';
import * as i2 from '@yelon/util/other';
import * as i2$1 from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';

class MediaService {
    get cog() {
        return this._cog;
    }
    set cog(val) {
        this._cog = this.cogSrv.merge('media', {
            urls: ['https://cdn.jsdelivr.net/npm/plyr/dist/plyr.min.js', 'https://cdn.jsdelivr.net/npm/plyr/dist/plyr.css']
        }, val);
    }
    constructor(cogSrv, lazySrv) {
        this.cogSrv = cogSrv;
        this.lazySrv = lazySrv;
        this.loading = false;
        this.loaded = false;
        this.notify$ = new Subject();
    }
    load() {
        if (this.loading) {
            if (this.loaded) {
                this.notify$.next();
            }
            return this;
        }
        this.loading = true;
        this.lazySrv.load(this.cog.urls).then(() => {
            this.loaded = true;
            this.notify$.next();
        });
        return this;
    }
    notify() {
        return this.notify$.asObservable().pipe(share());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaService, deps: [{ token: i1.YunzaiConfigService }, { token: i2.LazyService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }, { type: i2.LazyService }]; } });

class MediaComponent {
    get player() {
        return this._p;
    }
    constructor(el, renderer, srv, ngZone, platform) {
        this.el = el;
        this.renderer = renderer;
        this.srv = srv;
        this.ngZone = ngZone;
        this.platform = platform;
        this.destroy$ = inject(DestroyRef);
        this.type = 'video';
        this.delay = 0;
        this.ready = new EventEmitter();
    }
    initDelay() {
        timer(this.delay)
            .pipe(takeUntilDestroyed(this.destroy$))
            .subscribe(() => this.ngZone.runOutsideAngular(() => this.init()));
    }
    init() {
        const winPlyr = window.Plyr;
        if (!winPlyr) {
            throw new Error(`No window.Plyr found, please make sure that cdn or local path exists, the current referenced path is: ${JSON.stringify(this.srv.cog.urls)}`);
        }
        this.ensureElement();
        const player = (this._p = new winPlyr(this.videoEl, {
            ...this.srv.cog.options
        }));
        player.on('ready', () => this.ngZone.run(() => this.ready.next(player)));
        this.uploadSource();
    }
    ensureElement() {
        const { type } = this;
        let el = this.el.nativeElement.querySelector(type);
        if (!el) {
            el = this.renderer.createElement(type);
            el.controls = true;
            this.el.nativeElement.appendChild(el);
        }
        this.videoEl = el;
    }
    destroy() {
        if (this._p) {
            this._p.destroy();
        }
    }
    uploadSource() {
        if (this._p == null)
            return;
        const { source, type } = this;
        this._p.source = (typeof source === 'string' ? { type, sources: [{ src: source }] } : source);
    }
    ngAfterViewInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.srv
            .notify()
            .pipe(takeUntilDestroyed(this.destroy$), take(1))
            .subscribe(() => this.initDelay());
        this.srv.load();
    }
    ngOnChanges(changes) {
        this.srv.cog = { options: this.options };
        if (changes.source) {
            this.uploadSource();
        }
    }
    ngOnDestroy() {
        this.destroy();
        this._p = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: MediaService }, { token: i0.NgZone }, { token: i2$1.Platform }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: MediaComponent, selector: "media", inputs: { type: "type", source: "source", options: "options", delay: "delay" }, outputs: { ready: "ready" }, host: { properties: { "style.display": "'block'" } }, exportAs: ["mediaComponent"], usesOnChanges: true, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    InputNumber()
], MediaComponent.prototype, "delay", void 0);
__decorate([
    ZoneOutside()
], MediaComponent.prototype, "initDelay", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'media',
                    exportAs: 'mediaComponent',
                    template: `<ng-content></ng-content>`,
                    host: {
                        '[style.display]': `'block'`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: MediaService }, { type: i0.NgZone }, { type: i2$1.Platform }]; }, propDecorators: { type: [{
                type: Input
            }], source: [{
                type: Input
            }], options: [{
                type: Input
            }], delay: [{
                type: Input
            }], ready: [{
                type: Output
            }], initDelay: [] } });

const COMPONENTS = [MediaComponent];
class MediaModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: MediaModule, declarations: [MediaComponent], imports: [CommonModule], exports: [MediaComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MediaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MediaComponent, MediaModule, MediaService };
//# sourceMappingURL=media.mjs.map
