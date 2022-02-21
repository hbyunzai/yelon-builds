import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputNumber } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/core/outlet";
export class SVContainerComponent {
    constructor(configSrv) {
        this.noColon = false;
        configSrv.attach(this, 'sv', {
            size: 'large',
            gutter: 32,
            layout: 'horizontal',
            col: 3,
            default: true
        });
    }
}
SVContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SVContainerComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component });
SVContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: SVContainerComponent, selector: "sv-container, [sv-container]", inputs: { title: "title", size: "size", gutter: "gutter", layout: "layout", labelWidth: "labelWidth", col: "col", default: "default", noColon: "noColon" }, host: { properties: { "class.sv__container": "true", "class.sv__horizontal": "layout === 'horizontal'", "class.sv__vertical": "layout === 'vertical'", "class.sv__small": "size === 'small'", "class.sv__large": "size === 'large'", "class.clearfix": "true" } }, exportAs: ["svContainer"], ngImport: i0, template: `
    <div class="ant-row" [ngStyle]="{ 'margin-left.px': -(gutter / 2), 'margin-right.px': -(gutter / 2) }">
      <sv-title *ngIf="title">
        <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
      </sv-title>
      <ng-content></ng-content>
    </div>
  `, isInline: true, components: [{ type: i0.forwardRef(function () { return SVTitleComponent; }), selector: "sv-title, [sv-title]", exportAs: ["svTitle"] }], directives: [{ type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0.forwardRef(function () { return i3.NzStringTemplateOutletDirective; }), selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputNumber()
], SVContainerComponent.prototype, "gutter", void 0);
__decorate([
    InputNumber()
], SVContainerComponent.prototype, "labelWidth", void 0);
__decorate([
    InputNumber()
], SVContainerComponent.prototype, "col", void 0);
__decorate([
    InputBoolean()
], SVContainerComponent.prototype, "default", void 0);
__decorate([
    InputBoolean()
], SVContainerComponent.prototype, "noColon", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SVContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'sv-container, [sv-container]',
                    exportAs: 'svContainer',
                    template: `
    <div class="ant-row" [ngStyle]="{ 'margin-left.px': -(gutter / 2), 'margin-right.px': -(gutter / 2) }">
      <sv-title *ngIf="title">
        <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
      </sv-title>
      <ng-content></ng-content>
    </div>
  `,
                    host: {
                        '[class.sv__container]': 'true',
                        '[class.sv__horizontal]': `layout === 'horizontal'`,
                        '[class.sv__vertical]': `layout === 'vertical'`,
                        '[class.sv__small]': `size === 'small'`,
                        '[class.sv__large]': `size === 'large'`,
                        '[class.clearfix]': `true`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; }, propDecorators: { title: [{
                type: Input
            }], size: [{
                type: Input
            }], gutter: [{
                type: Input
            }], layout: [{
                type: Input
            }], labelWidth: [{
                type: Input
            }], col: [{
                type: Input
            }], default: [{
                type: Input
            }], noColon: [{
                type: Input
            }] } });
export class SVTitleComponent {
    constructor(el, parent, ren) {
        this.parent = parent;
        this.ren = ren;
        if (parent == null) {
            throw new Error(`[sv-title] must include 'sv-container' component`);
        }
        this.el = el.nativeElement;
    }
    setClass() {
        const { gutter } = this.parent;
        const { el } = this;
        this.ren.setStyle(el, 'padding-left', `${gutter / 2}px`);
        this.ren.setStyle(el, 'padding-right', `${gutter / 2}px`);
    }
    ngOnInit() {
        this.setClass();
    }
}
SVTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SVTitleComponent, deps: [{ token: i0.ElementRef }, { token: SVContainerComponent, host: true, optional: true }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
SVTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: SVTitleComponent, selector: "sv-title, [sv-title]", host: { properties: { "class.sv__title": "true" } }, exportAs: ["svTitle"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: SVTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'sv-title, [sv-title]',
                    exportAs: 'svTitle',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[class.sv__title]': 'true'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: SVContainerComponent, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3YtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9zdi9zdi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxJQUFJLEVBQ0osS0FBSyxFQUVMLFFBQVEsRUFHUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFnQixZQUFZLEVBQUUsV0FBVyxFQUFlLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBeUI3RixNQUFNLE9BQU8sb0JBQW9CO0lBa0IvQixZQUFZLFNBQThCO1FBRmpCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHdkMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQzNCLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLEVBQUU7WUFDVixNQUFNLEVBQUUsWUFBWTtZQUNwQixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7aUhBMUJVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLDhmQXBCckI7Ozs7Ozs7R0FPVCwwRUFxRFUsZ0JBQWdCO0FBOUJIO0lBQWQsV0FBVyxFQUFFO29EQUFpQjtBQUVoQjtJQUFkLFdBQVcsRUFBRTt3REFBcUI7QUFFcEI7SUFBZCxXQUFXLEVBQUU7aURBQWM7QUFDWjtJQUFmLFlBQVksRUFBRTtxREFBbUI7QUFDbEI7SUFBZixZQUFZLEVBQUU7cURBQWlCOzJGQWhCOUIsb0JBQW9CO2tCQXZCaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLHVCQUF1QixFQUFFLE1BQU07d0JBQy9CLHdCQUF3QixFQUFFLHlCQUF5Qjt3QkFDbkQsc0JBQXNCLEVBQUUsdUJBQXVCO3dCQUMvQyxtQkFBbUIsRUFBRSxrQkFBa0I7d0JBQ3ZDLG1CQUFtQixFQUFFLGtCQUFrQjt3QkFDdkMsa0JBQWtCLEVBQUUsTUFBTTtxQkFDM0I7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0QzswR0FRVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUVrQixNQUFNO3NCQUE3QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDa0IsVUFBVTtzQkFBakMsS0FBSztnQkFFa0IsR0FBRztzQkFBMUIsS0FBSztnQkFDbUIsT0FBTztzQkFBL0IsS0FBSztnQkFDbUIsT0FBTztzQkFBL0IsS0FBSzs7QUF3QlIsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixZQUFZLEVBQWMsRUFBOEIsTUFBNEIsRUFBVSxHQUFjO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUMxRyxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzdCLENBQUM7SUFFTyxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7OzZHQWxCVSxnQkFBZ0IsNENBRXFDLG9CQUFvQjtpR0FGekUsZ0JBQWdCLHdJQVJqQiwyQkFBMkI7MkZBUTFCLGdCQUFnQjtrQkFYNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLG1CQUFtQixFQUFFLE1BQU07cUJBQzVCO29CQUNELG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7bUZBR2lFLG9CQUFvQjswQkFBdkQsSUFBSTs7MEJBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIsIE51bWJlcklucHV0IH0gZnJvbSAnQHllbG9uL3V0aWwvZGVjb3JhdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3YtY29udGFpbmVyLCBbc3YtY29udGFpbmVyXScsXG4gIGV4cG9ydEFzOiAnc3ZDb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtcm93XCIgW25nU3R5bGVdPVwieyAnbWFyZ2luLWxlZnQucHgnOiAtKGd1dHRlciAvIDIpLCAnbWFyZ2luLXJpZ2h0LnB4JzogLShndXR0ZXIgLyAyKSB9XCI+XG4gICAgICA8c3YtdGl0bGUgKm5nSWY9XCJ0aXRsZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwidGl0bGVcIj57eyB0aXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9zdi10aXRsZT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Muc3ZfX2NvbnRhaW5lcl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5zdl9faG9yaXpvbnRhbF0nOiBgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCdgLFxuICAgICdbY2xhc3Muc3ZfX3ZlcnRpY2FsXSc6IGBsYXlvdXQgPT09ICd2ZXJ0aWNhbCdgLFxuICAgICdbY2xhc3Muc3ZfX3NtYWxsXSc6IGBzaXplID09PSAnc21hbGwnYCxcbiAgICAnW2NsYXNzLnN2X19sYXJnZV0nOiBgc2l6ZSA9PT0gJ2xhcmdlJ2AsXG4gICAgJ1tjbGFzcy5jbGVhcmZpeF0nOiBgdHJ1ZWBcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNWQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2d1dHRlcjogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9sYWJlbFdpZHRoOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NvbDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kZWZhdWx0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9ub0NvbG9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgdGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgc2l6ZSE6ICdzbWFsbCcgfCAnbGFyZ2UnO1xuICAvKiog5YiX6KGo6aG56Ze06Led77yM5Y2V5L2N5Li6IGBweGAgKi9cbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgZ3V0dGVyITogbnVtYmVyO1xuICBASW5wdXQoKSBsYXlvdXQhOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBsYWJlbFdpZHRoPzogbnVtYmVyO1xuICAvKiog5oyH5a6a5L+h5oGv5pyA5aSa5YiG5Yeg5YiX5bGV56S677yM5pyA57uI5LiA6KGM5Yeg5YiX55SxIGNvbCDphY3nva7nu5PlkIjlk43lupTlvI/op4TliJnlhrPlrpogKi9cbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgY29sITogbnVtYmVyO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgZGVmYXVsdCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBub0NvbG9uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgY29uZmlnU3J2LmF0dGFjaCh0aGlzLCAnc3YnLCB7XG4gICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgZ3V0dGVyOiAzMixcbiAgICAgIGxheW91dDogJ2hvcml6b250YWwnLFxuICAgICAgY29sOiAzLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N2LXRpdGxlLCBbc3YtdGl0bGVdJyxcbiAgZXhwb3J0QXM6ICdzdlRpdGxlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Muc3ZfX3RpdGxlXSc6ICd0cnVlJ1xuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU1ZUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgQEhvc3QoKSBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudDogU1ZDb250YWluZXJDb21wb25lbnQsIHByaXZhdGUgcmVuOiBSZW5kZXJlcjIpIHtcbiAgICBpZiAocGFyZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3N2LXRpdGxlXSBtdXN0IGluY2x1ZGUgJ3N2LWNvbnRhaW5lcicgY29tcG9uZW50YCk7XG4gICAgfVxuICAgIHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDbGFzcygpOiB2b2lkIHtcbiAgICBjb25zdCB7IGd1dHRlciB9ID0gdGhpcy5wYXJlbnQ7XG4gICAgY29uc3QgeyBlbCB9ID0gdGhpcztcbiAgICB0aGlzLnJlbi5zZXRTdHlsZShlbCwgJ3BhZGRpbmctbGVmdCcsIGAke2d1dHRlciAvIDJ9cHhgKTtcbiAgICB0aGlzLnJlbi5zZXRTdHlsZShlbCwgJ3BhZGRpbmctcmlnaHQnLCBgJHtndXR0ZXIgLyAyfXB4YCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzKCk7XG4gIH1cbn1cbiJdfQ==