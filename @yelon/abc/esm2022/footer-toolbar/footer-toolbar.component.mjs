import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation, booleanAttribute, inject } from '@angular/core';
import { ErrorCollectComponent } from '@yelon/abc/error-collect';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import * as i0 from "@angular/core";
const CLSBODY = 'footer-toolbar__body';
export class FooterToolbarComponent {
    constructor() {
        this.el = inject(ElementRef).nativeElement;
        this.renderer = inject(Renderer2);
        this.bodyCls = inject(DOCUMENT).querySelector('body')?.classList;
        this.errorCollect = false;
    }
    ngOnInit() {
        this.renderer.addClass(this.el, 'footer-toolbar');
        this.bodyCls?.add(CLSBODY);
    }
    ngOnDestroy() {
        this.bodyCls?.remove(CLSBODY);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: FooterToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.6", type: FooterToolbarComponent, isStandalone: true, selector: "footer-toolbar", inputs: { errorCollect: ["errorCollect", "errorCollect", booleanAttribute], extra: "extra" }, exportAs: ["footerToolbar"], ngImport: i0, template: "<div class=\"footer-toolbar__left\">\n  <ng-container *nzStringTemplateOutlet=\"extra\">{{ extra }}</ng-container>\n</div>\n<div class=\"footer-toolbar__right\">\n  @if (errorCollect) {\n    <error-collect />\n  }\n  <ng-content />\n</div>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "component", type: ErrorCollectComponent, selector: "error-collect, [error-collect]", inputs: ["freq", "offsetTop"], exportAs: ["errorCollect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: FooterToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'footer-toolbar', exportAs: 'footerToolbar', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [NzStringTemplateOutletDirective, ErrorCollectComponent], template: "<div class=\"footer-toolbar__left\">\n  <ng-container *nzStringTemplateOutlet=\"extra\">{{ extra }}</ng-container>\n</div>\n<div class=\"footer-toolbar__right\">\n  @if (errorCollect) {\n    <error-collect />\n  }\n  <ng-content />\n</div>\n" }]
        }], propDecorators: { errorCollect: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], extra: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLXRvb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2Zvb3Rlci10b29sYmFyL2Zvb3Rlci10b29sYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9mb290ZXItdG9vbGJhci9mb290ZXItdG9vbGJhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRTVFLE1BQU0sT0FBTyxHQUFHLHNCQUFzQixDQUFDO0FBWXZDLE1BQU0sT0FBTyxzQkFBc0I7SUFWbkM7UUFXbUIsT0FBRSxHQUFnQixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ25ELGFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBRXJDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0tBVzlEO0lBUkMsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OEdBZlUsc0JBQXNCO2tHQUF0QixzQkFBc0IsMkdBS2IsZ0JBQWdCLDBFQ25DdEMsbVBBU0EsNENEbUJZLCtCQUErQixnTEFBRSxxQkFBcUI7OzJGQUVyRCxzQkFBc0I7a0JBVmxDLFNBQVM7K0JBQ0UsZ0JBQWdCLFlBQ2hCLGVBQWUsdUJBRUosS0FBSyxtQkFDVCx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLGNBQ3pCLElBQUksV0FDUCxDQUFDLCtCQUErQixFQUFFLHFCQUFxQixDQUFDOzhCQU96QixZQUFZO3NCQUFuRCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUM3QixLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBib29sZWFuQXR0cmlidXRlLFxuICBpbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVycm9yQ29sbGVjdENvbXBvbmVudCB9IGZyb20gJ0B5ZWxvbi9hYmMvZXJyb3ItY29sbGVjdCc7XG5pbXBvcnQgeyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5cbmNvbnN0IENMU0JPRFkgPSAnZm9vdGVyLXRvb2xiYXJfX2JvZHknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb290ZXItdG9vbGJhcicsXG4gIGV4cG9ydEFzOiAnZm9vdGVyVG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb290ZXItdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW056U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmUsIEVycm9yQ29sbGVjdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBlbDogSFRNTEVsZW1lbnQgPSBpbmplY3QoRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlciA9IGluamVjdChSZW5kZXJlcjIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGJvZHlDbHMgPSBpbmplY3QoRE9DVU1FTlQpLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKT8uY2xhc3NMaXN0O1xuXG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBlcnJvckNvbGxlY3QgPSBmYWxzZTtcbiAgQElucHV0KCkgZXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwsICdmb290ZXItdG9vbGJhcicpO1xuICAgIHRoaXMuYm9keUNscz8uYWRkKENMU0JPRFkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5ib2R5Q2xzPy5yZW1vdmUoQ0xTQk9EWSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb290ZXItdG9vbGJhcl9fbGVmdFwiPlxuICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiZXh0cmFcIj57eyBleHRyYSB9fTwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZm9vdGVyLXRvb2xiYXJfX3JpZ2h0XCI+XG4gIEBpZiAoZXJyb3JDb2xsZWN0KSB7XG4gICAgPGVycm9yLWNvbGxlY3QgLz5cbiAgfVxuICA8bmctY29udGVudCAvPlxuPC9kaXY+XG4iXX0=