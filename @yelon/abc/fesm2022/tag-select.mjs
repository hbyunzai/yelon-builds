import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { inject, DestroyRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Input, Output, NgModule } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputBoolean } from '@yelon/util/decorator';
import * as i1 from '@yelon/theme';
import { YelonLocaleModule } from '@yelon/theme';
import * as i2 from '@angular/cdk/bidi';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

class TagSelectComponent {
    constructor(i18n, directionality, cdr) {
        this.i18n = i18n;
        this.directionality = directionality;
        this.cdr = cdr;
        this.destroy$ = inject(DestroyRef);
        this.locale = {};
        this.expand = false;
        this.dir = 'ltr';
        /** 是否启用 `展开与收进` */
        this.expandable = true;
        this.change = new EventEmitter();
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntilDestroyed(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
        this.i18n.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getData('tagSelect');
            this.cdr.detectChanges();
        });
    }
    trigger() {
        this.expand = !this.expand;
        this.change.emit(this.expand);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TagSelectComponent, deps: [{ token: i1.YelonLocaleService }, { token: i2.Directionality, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TagSelectComponent, selector: "tag-select", inputs: { expandable: "expandable" }, outputs: { change: "change" }, host: { properties: { "class.tag-select": "true", "class.tag-select-rtl": "dir === 'rtl'", "class.tag-select-rtl__has-expand": "dir === 'rtl' && expandable", "class.tag-select__has-expand": "expandable", "class.tag-select__expanded": "expand" } }, exportAs: ["tagSelect"], ngImport: i0, template: "<ng-content></ng-content>\n<a *ngIf=\"expandable\" class=\"ant-tag ant-tag-checkable tag-select__trigger\" (click)=\"trigger()\">\n  {{ expand ? locale.collapse : locale.expand }}\n  <i nz-icon nzType=\"down\" [style.transform]=\"expand ? 'rotate(-180deg)' : null\"></i>\n</a>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    InputBoolean()
], TagSelectComponent.prototype, "expandable", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TagSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tag-select', exportAs: 'tagSelect', host: {
                        '[class.tag-select]': 'true',
                        '[class.tag-select-rtl]': `dir === 'rtl'`,
                        '[class.tag-select-rtl__has-expand]': `dir === 'rtl' && expandable`,
                        '[class.tag-select__has-expand]': 'expandable',
                        '[class.tag-select__expanded]': 'expand'
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-content></ng-content>\n<a *ngIf=\"expandable\" class=\"ant-tag ant-tag-checkable tag-select__trigger\" (click)=\"trigger()\">\n  {{ expand ? locale.collapse : locale.expand }}\n  <i nz-icon nzType=\"down\" [style.transform]=\"expand ? 'rotate(-180deg)' : null\"></i>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.YelonLocaleService }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { expandable: [{
                type: Input
            }], change: [{
                type: Output
            }] } });

const COMPONENTS = [TagSelectComponent];
class TagSelectModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TagSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TagSelectModule, declarations: [TagSelectComponent], imports: [CommonModule, NzIconModule, YelonLocaleModule], exports: [TagSelectComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TagSelectModule, imports: [CommonModule, NzIconModule, YelonLocaleModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TagSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzIconModule, YelonLocaleModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TagSelectComponent, TagSelectModule };
//# sourceMappingURL=tag-select.mjs.map
