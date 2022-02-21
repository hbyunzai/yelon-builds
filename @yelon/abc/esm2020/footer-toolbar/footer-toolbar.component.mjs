import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/abc/error-collect";
import * as i2 from "ng-zorro-antd/core/outlet";
import * as i3 from "@angular/common";
const CLSBODY = 'footer-toolbar__body';
export class FooterToolbarComponent {
    constructor(el, renderer, doc) {
        this.el = el;
        this.renderer = renderer;
        this.doc = doc;
        this.errorCollect = false;
    }
    get bodyCls() {
        return this.doc.querySelector('body').classList;
    }
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'footer-toolbar');
        this.bodyCls.add(CLSBODY);
    }
    ngOnDestroy() {
        this.bodyCls.remove(CLSBODY);
    }
}
FooterToolbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: FooterToolbarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
FooterToolbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: FooterToolbarComponent, selector: "footer-toolbar", inputs: { errorCollect: "errorCollect", extra: "extra" }, exportAs: ["footerToolbar"], ngImport: i0, template: "<div class=\"footer-toolbar__left\">\n  <ng-container *nzStringTemplateOutlet=\"extra\">{{ extra }}</ng-container>\n</div>\n<div class=\"footer-toolbar__right\">\n  <error-collect *ngIf=\"errorCollect\"></error-collect>\n  <ng-content></ng-content>\n</div>\n", components: [{ type: i1.ErrorCollectComponent, selector: "error-collect, [error-collect]", inputs: ["freq", "offsetTop"], exportAs: ["errorCollect"] }], directives: [{ type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], FooterToolbarComponent.prototype, "errorCollect", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: FooterToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'footer-toolbar', exportAs: 'footerToolbar', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"footer-toolbar__left\">\n  <ng-container *nzStringTemplateOutlet=\"extra\">{{ extra }}</ng-container>\n</div>\n<div class=\"footer-toolbar__right\">\n  <error-collect *ngIf=\"errorCollect\"></error-collect>\n  <ng-content></ng-content>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { errorCollect: [{
                type: Input
            }], extra: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLXRvb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2Zvb3Rlci10b29sYmFyL2Zvb3Rlci10b29sYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9mb290ZXItdG9vbGJhci9mb290ZXItdG9vbGJhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULE1BQU0sRUFDTixLQUFLLEVBS0wsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBZ0IsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBRW5FLE1BQU0sT0FBTyxHQUFHLHNCQUFzQixDQUFDO0FBVXZDLE1BQU0sT0FBTyxzQkFBc0I7SUFNakMsWUFBb0IsRUFBYyxFQUFVLFFBQW1CLEVBQTRCLEdBQWM7UUFBckYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBNEIsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUhoRixpQkFBWSxHQUFHLEtBQUssQ0FBQztJQUc4RCxDQUFDO0lBRTdHLElBQVksT0FBTztRQUNqQixPQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBaUIsQ0FBQyxTQUFTLENBQUM7SUFDbkUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7bUhBbkJVLHNCQUFzQixxRUFNd0MsUUFBUTt1R0FOdEUsc0JBQXNCLDZJQzVCbkMsb1FBT0E7QUR3QjJCO0lBQWYsWUFBWSxFQUFFOzREQUFzQjsyRkFIbkMsc0JBQXNCO2tCQVJsQyxTQUFTOytCQUNFLGdCQUFnQixZQUNoQixlQUFlLHVCQUVKLEtBQUssbUJBQ1QsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBUTZCLE1BQU07MkJBQUMsUUFBUTs0Q0FIeEQsWUFBWTtzQkFBcEMsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBJbnB1dEJvb2xlYW4gfSBmcm9tICdAeWVsb24vdXRpbC9kZWNvcmF0b3InO1xuXG5jb25zdCBDTFNCT0RZID0gJ2Zvb3Rlci10b29sYmFyX19ib2R5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9vdGVyLXRvb2xiYXInLFxuICBleHBvcnRBczogJ2Zvb3RlclRvb2xiYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9vdGVyLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Vycm9yQ29sbGVjdDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBlcnJvckNvbGxlY3QgPSBmYWxzZTtcbiAgQElucHV0KCkgZXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnkpIHt9XG5cbiAgcHJpdmF0ZSBnZXQgYm9keUNscygpOiBET01Ub2tlbkxpc3Qge1xuICAgIHJldHVybiAodGhpcy5kb2MucXVlcnlTZWxlY3RvcignYm9keScpIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3Q7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Zvb3Rlci10b29sYmFyJyk7XG4gICAgdGhpcy5ib2R5Q2xzLmFkZChDTFNCT0RZKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuYm9keUNscy5yZW1vdmUoQ0xTQk9EWSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb290ZXItdG9vbGJhcl9fbGVmdFwiPlxuICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiZXh0cmFcIj57eyBleHRyYSB9fTwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZm9vdGVyLXRvb2xiYXJfX3JpZ2h0XCI+XG4gIDxlcnJvci1jb2xsZWN0ICpuZ0lmPVwiZXJyb3JDb2xsZWN0XCI+PC9lcnJvci1jb2xsZWN0PlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbiJdfQ==