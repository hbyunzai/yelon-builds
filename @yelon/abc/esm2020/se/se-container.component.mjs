import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InputBoolean, InputNumber, toNumber } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/core/outlet";
export class SEContainerComponent {
    constructor(configSrv) {
        this.errorNotify$ = new BehaviorSubject(null);
        this.noColon = false;
        this.line = false;
        configSrv.attach(this, 'se', {
            size: 'default',
            nzLayout: 'horizontal',
            gutter: 32,
            col: 2,
            labelWidth: 150,
            firstVisual: false,
            ignoreDirty: false
        });
    }
    get gutter() {
        return this.nzLayout === 'horizontal' ? this._gutter : 0;
    }
    set gutter(value) {
        this._gutter = toNumber(value);
    }
    get nzLayout() {
        return this._nzLayout;
    }
    set nzLayout(value) {
        this._nzLayout = value;
        if (value === 'inline') {
            this.size = 'compact';
        }
    }
    set errors(val) {
        this.setErrors(val);
    }
    get margin() {
        return -(this.gutter / 2);
    }
    get errorNotify() {
        return this.errorNotify$.pipe(filter(v => v != null));
    }
    setErrors(errors) {
        for (const error of errors) {
            this.errorNotify$.next(error);
        }
    }
}
SEContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SEContainerComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component });
SEContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: SEContainerComponent, selector: "se-container, [se-container]", inputs: { colInCon: ["se-container", "colInCon"], col: "col", labelWidth: "labelWidth", noColon: "noColon", title: "title", gutter: "gutter", nzLayout: "nzLayout", size: "size", firstVisual: "firstVisual", ingoreDirty: "ingoreDirty", line: "line", errors: "errors" }, host: { properties: { "class.ant-row": "true", "class.se__container": "true", "class.se__horizontal": "nzLayout === 'horizontal'", "class.se__vertical": "nzLayout === 'vertical'", "class.se__inline": "nzLayout === 'inline'", "class.se__compact": "size === 'compact'", "style.margin-left.px": "margin", "style.margin-right.px": "margin" } }, exportAs: ["seContainer"], ngImport: i0, template: `
    <div se-title *ngIf="title">
      <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    </div>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: i0.forwardRef(function () { return SETitleComponent; }), selector: "se-title, [se-title]", exportAs: ["seTitle"] }], directives: [{ type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0.forwardRef(function () { return i3.NzStringTemplateOutletDirective; }), selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputNumber(null)
], SEContainerComponent.prototype, "colInCon", void 0);
__decorate([
    InputNumber(null)
], SEContainerComponent.prototype, "col", void 0);
__decorate([
    InputNumber(null)
], SEContainerComponent.prototype, "labelWidth", void 0);
__decorate([
    InputBoolean()
], SEContainerComponent.prototype, "noColon", void 0);
__decorate([
    InputBoolean()
], SEContainerComponent.prototype, "firstVisual", void 0);
__decorate([
    InputBoolean()
], SEContainerComponent.prototype, "ingoreDirty", void 0);
__decorate([
    InputBoolean()
], SEContainerComponent.prototype, "line", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SEContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'se-container, [se-container]',
                    exportAs: 'seContainer',
                    template: `
    <div se-title *ngIf="title">
      <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    </div>
    <ng-content></ng-content>
  `,
                    host: {
                        '[class.ant-row]': `true`,
                        '[class.se__container]': `true`,
                        '[class.se__horizontal]': `nzLayout === 'horizontal'`,
                        '[class.se__vertical]': `nzLayout === 'vertical'`,
                        '[class.se__inline]': `nzLayout === 'inline'`,
                        '[class.se__compact]': `size === 'compact'`,
                        '[style.margin-left.px]': `margin`,
                        '[style.margin-right.px]': `margin`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; }, propDecorators: { colInCon: [{
                type: Input,
                args: ['se-container']
            }], col: [{
                type: Input
            }], labelWidth: [{
                type: Input
            }], noColon: [{
                type: Input
            }], title: [{
                type: Input
            }], gutter: [{
                type: Input
            }], nzLayout: [{
                type: Input
            }], size: [{
                type: Input
            }], firstVisual: [{
                type: Input
            }], ingoreDirty: [{
                type: Input
            }], line: [{
                type: Input
            }], errors: [{
                type: Input
            }] } });
export class SETitleComponent {
    constructor(parent, el, ren) {
        this.parent = parent;
        this.ren = ren;
        if (parent == null) {
            throw new Error(`[se-title] must include 'se-container' component`);
        }
        this.el = el.nativeElement;
    }
    setClass() {
        const { el } = this;
        const gutter = this.parent.gutter;
        this.ren.setStyle(el, 'padding-left', `${gutter / 2}px`);
        this.ren.setStyle(el, 'padding-right', `${gutter / 2}px`);
    }
    ngOnInit() {
        this.setClass();
    }
}
SETitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SETitleComponent, deps: [{ token: SEContainerComponent, host: true, optional: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
SETitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: SETitleComponent, selector: "se-title, [se-title]", host: { properties: { "class.se__title": "true" } }, exportAs: ["seTitle"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SETitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'se-title, [se-title]',
                    exportAs: 'seTitle',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[class.se__title]': 'true'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: SEContainerComponent, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2UtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9zZS9zZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxJQUFJLEVBQ0osS0FBSyxFQUVMLFFBQVEsRUFHUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEMsT0FBTyxFQUFnQixZQUFZLEVBQUUsV0FBVyxFQUFlLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQTRCdkcsTUFBTSxPQUFPLG9CQUFvQjtJQXVEL0IsWUFBWSxTQUE4QjtRQTdDbEMsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBaUIsSUFBaUIsQ0FBQyxDQUFDO1FBSXJELFlBQU8sR0FBRyxLQUFLLENBQUM7UUEyQmhCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFlcEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQzNCLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsTUFBTSxFQUFFLEVBQUU7WUFDVixHQUFHLEVBQUUsQ0FBQztZQUNOLFVBQVUsRUFBRSxHQUFHO1lBQ2YsV0FBVyxFQUFFLEtBQUs7WUFDbEIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWhERCxJQUNJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNELElBQUksTUFBTSxD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dEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM3QixDQUFDO0lBRU8sUUFBUTtRQUNkLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFnQixDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7NkdBeEJVLGdCQUFnQixrQkFLVCxvQkFBb0I7aUdBTDNCLGdCQUFnQix3SUFSakIsMkJBQTJCOzJGQVExQixnQkFBZ0I7a0JBWDVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixtQkFBbUIsRUFBRSxNQUFNO3FCQUM1QjtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzBEQU1tQixvQkFBb0I7MEJBRm5DLElBQUk7OzBCQUNKLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHR5cGUgeyBSRVBfVFlQRSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgSW5wdXRCb29sZWFuLCBJbnB1dE51bWJlciwgTnVtYmVySW5wdXQsIHRvTnVtYmVyIH0gZnJvbSAnQHllbG9uL3V0aWwvZGVjb3JhdG9yJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgU0VFcnJvclJlZnJlc2gsIFNFTGF5b3V0IH0gZnJvbSAnLi9zZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlLWNvbnRhaW5lciwgW3NlLWNvbnRhaW5lcl0nLFxuICBleHBvcnRBczogJ3NlQ29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IHNlLXRpdGxlICpuZ0lmPVwidGl0bGVcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0aXRsZVwiPnt7IHRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcm93XSc6IGB0cnVlYCxcbiAgICAnW2NsYXNzLnNlX19jb250YWluZXJdJzogYHRydWVgLFxuICAgICdbY2xhc3Muc2VfX2hvcml6b250YWxdJzogYG56TGF5b3V0ID09PSAnaG9yaXpvbnRhbCdgLFxuICAgICdbY2xhc3Muc2VfX3ZlcnRpY2FsXSc6IGBuekxheW91dCA9PT0gJ3ZlcnRpY2FsJ2AsXG4gICAgJ1tjbGFzcy5zZV9faW5saW5lXSc6IGBuekxheW91dCA9PT0gJ2lubGluZSdgLFxuICAgICdbY2xhc3Muc2VfX2NvbXBhY3RdJzogYHNpemUgPT09ICdjb21wYWN0J2AsXG4gICAgJ1tzdHlsZS5tYXJnaW4tbGVmdC5weF0nOiBgbWFyZ2luYCxcbiAgICAnW3N0eWxlLm1hcmdpbi1yaWdodC5weF0nOiBgbWFyZ2luYFxuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU0VDb250YWluZXJDb21wb25lbnQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZ3V0dGVyOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NvbDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jb2xJbkNvbjogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9sYWJlbFdpZHRoOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpcnN0VmlzdWFsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmdvcmVEaXJ0eTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbGluZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbm9Db2xvbjogQm9vbGVhbklucHV0O1xuXG4gIHByaXZhdGUgZXJyb3JOb3RpZnkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTRUVycm9yUmVmcmVzaD4obnVsbCBhcyBOelNhZmVBbnkpO1xuICBASW5wdXQoJ3NlLWNvbnRhaW5lcicpIEBJbnB1dE51bWJlcihudWxsKSBjb2xJbkNvbj86IFJFUF9UWVBFO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIobnVsbCkgY29sITogUkVQX1RZUEU7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcihudWxsKSBsYWJlbFdpZHRoITogbnVtYmVyO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbm9Db2xvbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbDtcblxuICBASW5wdXQoKVxuICBnZXQgZ3V0dGVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubnpMYXlvdXQgPT09ICdob3Jpem9udGFsJyA/IHRoaXMuX2d1dHRlciA6IDA7XG4gIH1cbiAgc2V0IGd1dHRlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZ3V0dGVyID0gdG9OdW1iZXIodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2d1dHRlciE6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBnZXQgbnpMYXlvdXQoKTogU0VMYXlvdXQge1xuICAgIHJldHVybiB0aGlzLl9uekxheW91dDtcbiAgfVxuICBzZXQgbnpMYXlvdXQodmFsdWU6IFNFTGF5b3V0KSB7XG4gICAgdGhpcy5fbnpMYXlvdXQgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICdpbmxpbmUnKSB7XG4gICAgICB0aGlzLnNpemUgPSAnY29tcGFjdCc7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX256TGF5b3V0ITogU0VMYXlvdXQ7XG5cbiAgQElucHV0KCkgc2l6ZSE6ICdkZWZhdWx0JyB8ICdjb21wYWN0JztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGZpcnN0VmlzdWFsITogYm9vbGVhbjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGluZ29yZURpcnR5ITogYm9vbGVhbjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGxpbmUgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc2V0IGVycm9ycyh2YWw6IFNFRXJyb3JSZWZyZXNoW10pIHtcbiAgICB0aGlzLnNldEVycm9ycyh2YWwpO1xuICB9XG5cbiAgZ2V0IG1hcmdpbigpOiBudW1iZXIge1xuICAgIHJldHVybiAtKCh0aGlzLmd1dHRlciBhcyBudW1iZXIpIC8gMik7XG4gIH1cblxuICBnZXQgZXJyb3JOb3RpZnkoKTogT2JzZXJ2YWJsZTxTRUVycm9yUmVmcmVzaD4ge1xuICAgIHJldHVybiB0aGlzLmVycm9yTm90aWZ5JC5waXBlKGZpbHRlcih2ID0+IHYgIT0gbnVsbCkpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgY29uZmlnU3J2LmF0dGFjaCh0aGlzLCAnc2UnLCB7XG4gICAgICBzaXplOiAnZGVmYXVsdCcsXG4gICAgICBuekxheW91dDogJ2hvcml6b250YWwnLFxuICAgICAgZ3V0dGVyOiAzMixcbiAgICAgIGNvbDogMixcbiAgICAgIGxhYmVsV2lkdGg6IDE1MCxcbiAgICAgIGZpcnN0VmlzdWFsOiBmYWxzZSxcbiAgICAgIGlnbm9yZURpcnR5OiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgc2V0RXJyb3JzKGVycm9yczogU0VFcnJvclJlZnJlc2hbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICB0aGlzLmVycm9yTm90aWZ5JC5uZXh0KGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2UtdGl0bGUsIFtzZS10aXRsZV0nLFxuICBleHBvcnRBczogJ3NlVGl0bGUnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5zZV9fdGl0bGVdJzogJ3RydWUnXG4gIH0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTRVRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBIb3N0KClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByaXZhdGUgcGFyZW50OiBTRUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbjogUmVuZGVyZXIyXG4gICkge1xuICAgIGlmIChwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2UtdGl0bGVdIG11c3QgaW5jbHVkZSAnc2UtY29udGFpbmVyJyBjb21wb25lbnRgKTtcbiAgICB9XG4gICAgdGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIHNldENsYXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZWwgfSA9IHRoaXM7XG4gICAgY29uc3QgZ3V0dGVyID0gdGhpcy5wYXJlbnQuZ3V0dGVyIGFzIG51bWJlcjtcbiAgICB0aGlzLnJlbi5zZXRTdHlsZShlbCwgJ3BhZGRpbmctbGVmdCcsIGAke2d1dHRlciAvIDJ9cHhgKTtcbiAgICB0aGlzLnJlbi5zZXRTdHlsZShlbCwgJ3BhZGRpbmctcmlnaHQnLCBgJHtndXR0ZXIgLyAyfXB4YCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzKCk7XG4gIH1cbn1cbiJdfQ==