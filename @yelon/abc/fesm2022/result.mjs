import { Directionality } from '@angular/cdk/bidi';
import * as i0 from '@angular/core';
import { inject, ChangeDetectorRef, DestroyRef, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzStringTemplateOutletDirective, NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

/**
 * @deprecated Will be removed in v20, Please use `nz-result` instead.
 */
class ResultComponent {
    cdr = inject(ChangeDetectorRef);
    directionality = inject(Directionality);
    destroy$ = inject(DestroyRef);
    _type = '';
    _icon = '';
    set type(value) {
        this._type = value;
        switch (value) {
            case 'success':
                this._icon = 'check-circle';
                break;
            case 'error':
                this._icon = 'close-circle';
                break;
            default:
                this._icon = value;
                break;
        }
    }
    title;
    description;
    extra;
    dir = 'ltr';
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(direction => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ResultComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.7", type: ResultComponent, isStandalone: true, selector: "result", inputs: { type: "type", title: "title", description: "description", extra: "extra" }, host: { properties: { "class.result": "true", "class.result-rtl": "dir === 'rtl'" } }, exportAs: ["result"], ngImport: i0, template: "<div class=\"result__icon\">\n  <nz-icon [nzType]=\"_icon\" class=\"result__icon-{{ _type }}\" />\n</div>\n<div class=\"result__title\">\n  <ng-container *nzStringTemplateOutlet=\"title\">{{ title }}</ng-container>\n</div>\n@if (description) {\n  <div class=\"result__desc\">\n    <ng-container *nzStringTemplateOutlet=\"description\">{{ description }}</ng-container>\n  </div>\n}\n@if (extra) {\n  <div class=\"result__extra\">\n    <ng-container *nzStringTemplateOutlet=\"extra\">{{ extra }}</ng-container>\n  </div>\n}\n<div class=\"result__actions\">\n  <ng-content />\n</div>\n", dependencies: [{ kind: "directive", type: NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ResultComponent, decorators: [{
            type: Component,
            args: [{ selector: 'result', exportAs: 'result', host: {
                        '[class.result]': 'true',
                        '[class.result-rtl]': `dir === 'rtl'`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [NzIconDirective, NzStringTemplateOutletDirective], template: "<div class=\"result__icon\">\n  <nz-icon [nzType]=\"_icon\" class=\"result__icon-{{ _type }}\" />\n</div>\n<div class=\"result__title\">\n  <ng-container *nzStringTemplateOutlet=\"title\">{{ title }}</ng-container>\n</div>\n@if (description) {\n  <div class=\"result__desc\">\n    <ng-container *nzStringTemplateOutlet=\"description\">{{ description }}</ng-container>\n  </div>\n}\n@if (extra) {\n  <div class=\"result__extra\">\n    <ng-container *nzStringTemplateOutlet=\"extra\">{{ extra }}</ng-container>\n  </div>\n}\n<div class=\"result__actions\">\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { type: [{
                type: Input
            }], title: [{
                type: Input
            }], description: [{
                type: Input
            }], extra: [{
                type: Input
            }] } });

const COMPONENTS = [ResultComponent];
/**
 * @deprecated Will be removed in v20, Please use `nz-result` instead.
 */
class ResultModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ResultModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.7", ngImport: i0, type: ResultModule, imports: [CommonModule, NzIconModule, NzOutletModule, ResultComponent], exports: [ResultComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ResultModule, imports: [CommonModule, NzIconModule, NzOutletModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ResultModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzIconModule, NzOutletModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ResultComponent, ResultModule };
//# sourceMappingURL=result.mjs.map
