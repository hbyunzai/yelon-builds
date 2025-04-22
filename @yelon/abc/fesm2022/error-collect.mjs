import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, ElementRef, DestroyRef, signal, input, numberAttribute, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import * as i1 from '@yelon/util/config';

class ErrorCollectComponent {
    el = inject(ElementRef).nativeElement;
    doc = inject(DOCUMENT);
    platform = inject(Platform);
    destroy$ = inject(DestroyRef);
    formEl = null;
    _hiden = signal(true);
    count = signal(0);
    dir = toSignal(inject(Directionality).change);
    freq = input(0, { transform: numberAttribute });
    offsetTop = input(0, { transform: numberAttribute });
    constructor(configSrv) {
        configSrv.attach(this, 'errorCollect', { freq: 250, offsetTop: 65 + 64 + 8 * 2 });
    }
    get errEls() {
        return this.formEl.querySelectorAll('.ant-form-item-has-error');
    }
    update() {
        const count = this.errEls.length;
        if (count === this.count())
            return;
        this.count.set(count);
        this._hiden.set(count === 0);
    }
    _click() {
        if (this.count() === 0)
            return false;
        // nz-form-control
        const els = this.errEls;
        const formItemEl = this.findParent(els[0], '[nz-form-control]') || els[0];
        formItemEl.scrollIntoView(true);
        // fix header height
        this.doc.documentElement.scrollTop -= this.offsetTop();
        return true;
    }
    findParent(el, selector) {
        let retEl = null;
        while (el) {
            if (el.querySelector(selector)) {
                retEl = el;
                break;
            }
            el = el.parentElement;
        }
        return retEl;
    }
    ngOnInit() {
        if (!this.platform.isBrowser)
            return;
        this.formEl = this.findParent(this.el, 'form');
        if (this.formEl === null)
            throw new Error('No found form element');
        interval(this.freq())
            .pipe(takeUntilDestroyed(this.destroy$))
            .subscribe(() => this.update());
        this.update();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ErrorCollectComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.7", type: ErrorCollectComponent, isStandalone: true, selector: "error-collect, [error-collect]", inputs: { freq: { classPropertyName: "freq", publicName: "freq", isSignal: true, isRequired: false, transformFunction: null }, offsetTop: { classPropertyName: "offsetTop", publicName: "offsetTop", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "_click()" }, properties: { "class.error-collect": "true", "class.error-collect-rtl": "dir() === 'rtl'", "class.d-none": "_hiden()" } }, exportAs: ["errorCollect"], ngImport: i0, template: `
    <nz-icon nzType="exclamation-circle" />
    <span class="error-collect__count">{{ count() }}</span>
  `, isInline: true, dependencies: [{ kind: "directive", type: NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ErrorCollectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'error-collect, [error-collect]',
                    exportAs: 'errorCollect',
                    template: `
    <nz-icon nzType="exclamation-circle" />
    <span class="error-collect__count">{{ count() }}</span>
  `,
                    host: {
                        '[class.error-collect]': 'true',
                        '[class.error-collect-rtl]': `dir() === 'rtl'`,
                        '[class.d-none]': '_hiden()',
                        '(click)': '_click()'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    imports: [NzIconDirective]
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });

const COMPONENTS = [ErrorCollectComponent];
class ErrorCollectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ErrorCollectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.7", ngImport: i0, type: ErrorCollectModule, imports: [CommonModule, NzIconModule, ErrorCollectComponent], exports: [ErrorCollectComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ErrorCollectModule, imports: [CommonModule, NzIconModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ErrorCollectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzIconModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ErrorCollectComponent, ErrorCollectModule };
//# sourceMappingURL=error-collect.mjs.map
