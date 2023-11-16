import * as i2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, ViewChild, InjectionToken, createComponent, Injectable, NgModule } from '@angular/core';
import { of, switchMap, delay, pipe } from 'rxjs';
import * as i1 from '@angular/cdk/platform';
import * as i3 from 'ng-zorro-antd/popover';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import * as i4 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i5 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i6 from 'ng-zorro-antd/core/transition-patch';
import * as i7 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i1$1 from '@yelon/theme';
import { YelonLocaleModule } from '@yelon/theme';
import * as i2$1 from '@angular/router';
import * as i3$1 from '@yelon/util/config';
import * as i4$1 from '@angular/cdk/bidi';

class OnboardingComponent {
    get first() {
        return this.active === 0;
    }
    get last() {
        return this.active === this.max - 1;
    }
    _getDoc() {
        return this.doc;
    }
    _getWin() {
        return this._getDoc().defaultView || window;
    }
    constructor(el, doc, platform, cdr) {
        this.el = el;
        this.doc = doc;
        this.platform = platform;
        this.cdr = cdr;
        this.active = 0;
        this.max = 0;
        this.op = new EventEmitter();
        this.running = false;
        this.dir = 'ltr';
    }
    getLightData() {
        const doc = this._getDoc();
        const win = this._getWin();
        const el = doc.querySelector(this.item.selectors);
        if (!el) {
            return null;
        }
        const scrollTop = win.scrollY || doc.documentElement.scrollTop || doc.body.scrollTop;
        const scrollLeft = win.scrollX || doc.documentElement.scrollLeft || doc.body.scrollLeft;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollTop;
        const left = rect.left + scrollLeft;
        const padding = 8;
        const needPadding = top > padding && left > padding;
        const offsetPos = needPadding ? padding : 0;
        const offsetWH = needPadding ? padding * 2 : 0;
        return {
            top: top - offsetPos,
            left: left - offsetPos,
            width: rect.width + offsetWH,
            height: rect.height + offsetWH,
            el,
            clientWidth: doc.body.clientWidth,
            clientHeight: doc.body.clientHeight
        };
    }
    ngAfterViewInit() {
        // Waiting https://github.com/NG-ZORRO/ng-zorro-antd/issues/6491
        this.popover.component.onClickOutside = () => { };
    }
    scroll(pos) {
        this.prevSelectorEl = pos.el;
        const scrollY = pos.top - (pos.clientHeight - pos.height) / 2;
        this._getWin().scrollTo({ top: scrollY });
        this.updatePrevElStatus(true);
    }
    updateRunning(status) {
        this.running = status;
        this.cdr.detectChanges();
        if (!status) {
            this.updatePosition();
        }
    }
    updatePosition() {
        if (!this.platform.isBrowser) {
            return;
        }
        const pos = this.getLightData();
        if (pos == null) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.warn(`Did not matches selectors [${this.item.selectors}]`);
            }
            return;
        }
        const lightStyle = this.el.nativeElement.querySelector('.onboarding__light').style;
        lightStyle.top = `${pos.top}px`;
        lightStyle.left = `${pos.left}px`;
        lightStyle.width = `${pos.width}px`;
        lightStyle.height = `${pos.height}px`;
        this.updatePrevElStatus(false);
        this.scroll(pos);
    }
    updatePrevElStatus(status) {
        if (this.prevSelectorEl) {
            this.prevSelectorEl.classList[status ? 'add' : 'remove']('onboarding__light-el');
        }
    }
    to(type) {
        this.op.emit(type);
    }
    handleMask() {
        if (this.config.maskClosable === true) {
            this.popover.component.hide();
            this.to('done');
        }
    }
    ngOnDestroy() {
        clearTimeout(this.time);
        this.updatePrevElStatus(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingComponent, deps: [{ token: i0.ElementRef }, { token: DOCUMENT, optional: true }, { token: i1.Platform }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: OnboardingComponent, selector: "onboarding", host: { properties: { "class.onboarding": "true", "class.onboarding-rtl": "dir === 'rtl'", "attr.data-onboarding-active": "active" } }, viewQueries: [{ propertyName: "popover", first: true, predicate: ["popover"], descendants: true }], ngImport: i0, template: "<div *ngIf=\"!running && config.mask\" class=\"onboarding__mask\" (click)=\"handleMask()\"></div>\n<div\n  *ngIf=\"item\"\n  class=\"onboarding__light\"\n  [class.onboarding__light-hide]=\"running\"\n  [attr.style]=\"item.lightStyle\"\n  nz-popover\n  #popover=\"nzPopover\"\n  [nzPopoverTitle]=\"item.title\"\n  [nzPopoverContent]=\"content\"\n  [nzPopoverVisible]=\"!running\"\n  [nzPopoverTrigger]=\"null\"\n  [nzPopoverPlacement]=\"item.position\"\n  [nzPopoverOverlayClassName]=\"item.className\"\n  [nzPopoverOverlayStyle]=\"{ 'max-width.px': item.width, direction: dir }\"\n  [nzNoAnimation]=\"true\"\n></div>\n<ng-template #content>\n  <ng-container *nzStringTemplateOutlet=\"item.content\">\n    <div [innerHTML]=\"item.content\"></div>\n  </ng-container>\n  <div class=\"flex-center-between onboarding__footer\">\n    <span class=\"onboarding__total\">\n      <ng-container *ngIf=\"config.showTotal\">{{ active + 1 }}/{{ max }}</ng-container>\n    </span>\n    <div class=\"onboarding__btns\">\n      <a\n        *ngIf=\"!last && item.skip !== null && item.skip !== undefined\"\n        nz-button\n        nzType=\"link\"\n        (click)=\"to('skip')\"\n        nzSize=\"small\"\n        data-btnType=\"skip\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.skip\">{{ item.skip }}</ng-container>\n      </a>\n      <a *ngIf=\"!first && item.prev !== null\" nz-button (click)=\"to('prev')\" nzSize=\"small\" data-btnType=\"prev\">\n        <ng-container *nzStringTemplateOutlet=\"item.prev\">{{ item.prev }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"!last && item.next !== null && item.next !== undefined\"\n        nz-button\n        (click)=\"to('next')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"next\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.next\">{{ item.next }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"last && item.done !== null && item.done !== undefined\"\n        nz-button\n        (click)=\"to('done')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"done\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.done\">{{ item.done }}</ng-container>\n      </a>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NzPopoverDirective, selector: "[nz-popover]", inputs: ["nzPopoverArrowPointAtCenter", "nzPopoverTitle", "nzPopoverContent", "nz-popover", "nzPopoverTrigger", "nzPopoverPlacement", "nzPopoverOrigin", "nzPopoverVisible", "nzPopoverMouseEnterDelay", "nzPopoverMouseLeaveDelay", "nzPopoverOverlayClassName", "nzPopoverOverlayStyle", "nzPopoverBackdrop"], outputs: ["nzPopoverVisibleChange"], exportAs: ["nzPopover"] }, { kind: "directive", type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "component", type: i5.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i7.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'onboarding', host: {
                        '[class.onboarding]': `true`,
                        '[class.onboarding-rtl]': `dir === 'rtl'`,
                        '[attr.data-onboarding-active]': `active`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"!running && config.mask\" class=\"onboarding__mask\" (click)=\"handleMask()\"></div>\n<div\n  *ngIf=\"item\"\n  class=\"onboarding__light\"\n  [class.onboarding__light-hide]=\"running\"\n  [attr.style]=\"item.lightStyle\"\n  nz-popover\n  #popover=\"nzPopover\"\n  [nzPopoverTitle]=\"item.title\"\n  [nzPopoverContent]=\"content\"\n  [nzPopoverVisible]=\"!running\"\n  [nzPopoverTrigger]=\"null\"\n  [nzPopoverPlacement]=\"item.position\"\n  [nzPopoverOverlayClassName]=\"item.className\"\n  [nzPopoverOverlayStyle]=\"{ 'max-width.px': item.width, direction: dir }\"\n  [nzNoAnimation]=\"true\"\n></div>\n<ng-template #content>\n  <ng-container *nzStringTemplateOutlet=\"item.content\">\n    <div [innerHTML]=\"item.content\"></div>\n  </ng-container>\n  <div class=\"flex-center-between onboarding__footer\">\n    <span class=\"onboarding__total\">\n      <ng-container *ngIf=\"config.showTotal\">{{ active + 1 }}/{{ max }}</ng-container>\n    </span>\n    <div class=\"onboarding__btns\">\n      <a\n        *ngIf=\"!last && item.skip !== null && item.skip !== undefined\"\n        nz-button\n        nzType=\"link\"\n        (click)=\"to('skip')\"\n        nzSize=\"small\"\n        data-btnType=\"skip\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.skip\">{{ item.skip }}</ng-container>\n      </a>\n      <a *ngIf=\"!first && item.prev !== null\" nz-button (click)=\"to('prev')\" nzSize=\"small\" data-btnType=\"prev\">\n        <ng-container *nzStringTemplateOutlet=\"item.prev\">{{ item.prev }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"!last && item.next !== null && item.next !== undefined\"\n        nz-button\n        (click)=\"to('next')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"next\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.next\">{{ item.next }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"last && item.done !== null && item.done !== undefined\"\n        nz-button\n        (click)=\"to('done')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"done\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.done\">{{ item.done }}</ng-container>\n      </a>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Platform }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { popover: [{
                type: ViewChild,
                args: ['popover', { static: false }]
            }] } });

const ONBOARDING_STORE_TOKEN = new InjectionToken('ONBOARDING_STORE_TOKEN', {
    providedIn: 'root',
    factory: ONBOARDING_STORE_TOKEN_FACTORY
});
function ONBOARDING_STORE_TOKEN_FACTORY() {
    return new LocalStorageStore();
}
class LocalStorageStore {
    get(key) {
        return localStorage.getItem(key);
    }
    set(key, version) {
        localStorage.setItem(key, `${version}`);
    }
}

class OnboardingService {
    _getDoc() {
        return this.doc;
    }
    /**
     * Get whether it is booting
     *
     * 获取是否正在引导中
     */
    get running() {
        return this._running;
    }
    constructor(i18n, appRef, router, doc, configSrv, keyStoreSrv, directionality) {
        this.i18n = i18n;
        this.appRef = appRef;
        this.router = router;
        this.doc = doc;
        this.configSrv = configSrv;
        this.keyStoreSrv = keyStoreSrv;
        this.directionality = directionality;
        this.active = 0;
        this.running$ = null;
        this._running = false;
        this.type = null;
    }
    attach() {
        const compRef = createComponent(OnboardingComponent, {
            environmentInjector: this.appRef.injector
        });
        this.compRef = compRef;
        this.appRef.attachView(compRef.hostView);
        const compNode = compRef.hostView.rootNodes[0];
        const doc = this._getDoc();
        const cdk = doc.querySelector('.cdk-overlay-container');
        if (cdk) {
            doc.body.insertBefore(compNode, cdk);
        }
        else {
            doc.body.appendChild(compNode);
        }
        this.op$ = this.compRef.instance.op.subscribe((type) => {
            switch (type) {
                case 'next':
                    this.next();
                    break;
                case 'prev':
                    this.prev();
                    break;
                default:
                    this.done();
                    break;
            }
        });
    }
    cancelRunning() {
        if (this.running$) {
            this.running$.unsubscribe();
            this.running$ = null;
        }
        return this;
    }
    updateRunning(status) {
        this._running = status;
        this.compRef.instance.updateRunning(status);
        return this;
    }
    destroy() {
        const storeKey = this.config?.key;
        if (storeKey != null) {
            this.keyStoreSrv.set(storeKey, this.config?.keyVersion);
        }
        this.cancelRunning();
        if (this.compRef) {
            this.appRef.detachView(this.compRef.hostView);
            this.compRef.destroy();
            this.op$.unsubscribe();
        }
    }
    showItem(isStart = false) {
        const items = this.config?.items;
        const item = {
            position: 'bottomLeft',
            before: of(true),
            after: of(true),
            ...this.i18n.getData('onboarding'),
            ...items[this.active]
        };
        const dir = this.configSrv.get('onboarding').direction || this.directionality.value;
        Object.assign(this.compRef.instance, { item, config: this.config, active: this.active, max: items.length, dir });
        const pipes = [
            switchMap(() => (item.url ? this.router.navigateByUrl(item.url) : of(true))),
            switchMap(() => {
                const obs = this.type === 'prev' ? item.after : item.before;
                return typeof obs === 'number' ? of(true).pipe(delay(obs)) : obs;
            })
        ];
        if (!isStart) {
            pipes.push(delay(1));
        }
        this.updateRunning(true);
        this.running$ = of(true)
            .pipe(pipe.apply(this, pipes))
            .subscribe({
            next: () => this.cancelRunning().updateRunning(false),
            error: () => this.done()
        });
    }
    /**
     * Start a new user guidance
     *
     * 开启新的用户引导流程
     */
    start(config) {
        const cog = {
            keyVersion: '',
            items: [],
            mask: true,
            maskClosable: true,
            showTotal: false,
            ...config
        };
        const storeKey = cog?.key;
        if (storeKey != null && this.keyStoreSrv.get(storeKey) === cog.keyVersion) {
            return;
        }
        if (this.running) {
            return;
        }
        this.destroy();
        this.config = cog;
        this.active = 0;
        this.type = null;
        this.attach();
        this.showItem(true);
    }
    /**
     * Next
     *
     * 下一步
     */
    next() {
        if (this._running || this.active + 1 >= this.config.items.length) {
            this.done();
            return;
        }
        this.type = 'next';
        ++this.active;
        this.showItem();
    }
    /**
     * Prev
     *
     * 上一步
     */
    prev() {
        if (this._running || this.active - 1 < 0) {
            return;
        }
        this.type = 'prev';
        --this.active;
        this.showItem();
    }
    /**
     * Done
     *
     * 完成
     */
    done() {
        this.type = 'done';
        this.destroy();
    }
    ngOnDestroy() {
        this.destroy();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingService, deps: [{ token: i1$1.YelonLocaleService }, { token: i0.ApplicationRef }, { token: i2$1.Router }, { token: DOCUMENT }, { token: i3$1.YunzaiConfigService }, { token: ONBOARDING_STORE_TOKEN }, { token: i4$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.YelonLocaleService }, { type: i0.ApplicationRef }, { type: i2$1.Router }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3$1.YunzaiConfigService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [ONBOARDING_STORE_TOKEN]
                }] }, { type: i4$1.Directionality, decorators: [{
                    type: Optional
                }] }]; } });

const COMPONENTS = [OnboardingComponent];
class OnboardingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: OnboardingModule, declarations: [OnboardingComponent], imports: [CommonModule, YelonLocaleModule, NzPopoverModule, NzOutletModule, NzButtonModule, NzNoAnimationModule], exports: [OnboardingComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingModule, providers: [OnboardingService], imports: [CommonModule, YelonLocaleModule, NzPopoverModule, NzOutletModule, NzButtonModule, NzNoAnimationModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OnboardingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, YelonLocaleModule, NzPopoverModule, NzOutletModule, NzButtonModule, NzNoAnimationModule],
                    declarations: COMPONENTS,
                    providers: [OnboardingService],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { LocalStorageStore, ONBOARDING_STORE_TOKEN, ONBOARDING_STORE_TOKEN_FACTORY, OnboardingComponent, OnboardingModule, OnboardingService };
//# sourceMappingURL=onboarding.mjs.map
