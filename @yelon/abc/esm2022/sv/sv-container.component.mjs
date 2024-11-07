import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation, booleanAttribute, inject, numberAttribute } from '@angular/core';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class SVTitleComponent {
    constructor() {
        this.el = inject(ElementRef).nativeElement;
        this.parentComp = inject(SVContainerComponent, { host: true, optional: true });
        this.ren = inject(Renderer2);
        if (this.parentComp == null) {
            throw new Error(`[sv-title] must include 'sv-container' component`);
        }
    }
    setClass() {
        const gutter = this.parentComp.gutter;
        const el = this.el;
        this.ren.setStyle(el, 'padding-left', `${gutter / 2}px`);
        this.ren.setStyle(el, 'padding-right', `${gutter / 2}px`);
    }
    ngOnInit() {
        this.setClass();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SVTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.11", type: SVTitleComponent, isStandalone: true, selector: "sv-title, [sv-title]", host: { properties: { "class.sv__title": "true" } }, exportAs: ["svTitle"], ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SVTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'sv-title, [sv-title]',
                    exportAs: 'svTitle',
                    template: '<ng-content />',
                    host: {
                        '[class.sv__title]': 'true'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true
                }]
        }], ctorParameters: () => [] });
export class SVContainerComponent {
    get margin() {
        return this.bordered ? {} : { 'margin-left.px': -(this.gutter / 2), 'margin-right.px': -(this.gutter / 2) };
    }
    constructor(configSrv) {
        this.noColon = false;
        this.bordered = false;
        configSrv.attach(this, 'sv', {
            size: 'large',
            gutter: 32,
            layout: 'horizontal',
            col: 3,
            default: true
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SVContainerComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.11", type: SVContainerComponent, isStandalone: true, selector: "sv-container, [sv-container]", inputs: { colInCon: ["sv-container", "colInCon", (v) => (v == null ? null : numberAttribute(v))], title: "title", size: "size", gutter: ["gutter", "gutter", numberAttribute], layout: "layout", labelWidth: ["labelWidth", "labelWidth", numberAttribute], col: ["col", "col", numberAttribute], default: ["default", "default", booleanAttribute], noColon: ["noColon", "noColon", booleanAttribute], bordered: ["bordered", "bordered", booleanAttribute] }, host: { properties: { "class.sv__container": "true", "class.sv__horizontal": "layout === 'horizontal'", "class.sv__vertical": "layout === 'vertical'", "class.sv__small": "size === 'small'", "class.sv__large": "size === 'large'", "class.sv__bordered": "bordered", "class.clearfix": "true" } }, exportAs: ["svContainer"], ngImport: i0, template: `
    <div class="ant-row" [ngStyle]="margin">
      @if (title) {
        <sv-title>
          <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
        </sv-title>
      }
      <ng-content />
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: SVTitleComponent, selector: "sv-title, [sv-title]", exportAs: ["svTitle"] }, { kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SVContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'sv-container, [sv-container]',
                    exportAs: 'svContainer',
                    template: `
    <div class="ant-row" [ngStyle]="margin">
      @if (title) {
        <sv-title>
          <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
        </sv-title>
      }
      <ng-content />
    </div>
  `,
                    host: {
                        '[class.sv__container]': 'true',
                        '[class.sv__horizontal]': `layout === 'horizontal'`,
                        '[class.sv__vertical]': `layout === 'vertical'`,
                        '[class.sv__small]': `size === 'small'`,
                        '[class.sv__large]': `size === 'large'`,
                        '[class.sv__bordered]': `bordered`,
                        '[class.clearfix]': `true`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true,
                    imports: [NgStyle, SVTitleComponent, NzStringTemplateOutletDirective]
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { colInCon: [{
                type: Input,
                args: [{ alias: 'sv-container', transform: (v) => (v == null ? null : numberAttribute(v)) }]
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], gutter: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], layout: [{
                type: Input
            }], labelWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], col: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], default: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], noColon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], bordered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3YtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9zdi9zdi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFjNUUsTUFBTSxPQUFPLGdCQUFnQjtJQUszQjtRQUppQixPQUFFLEdBQWdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDbkQsZUFBVSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUUsUUFBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDSCxDQUFDO0lBRU8sUUFBUTtRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDOytHQXBCVSxnQkFBZ0I7bUdBQWhCLGdCQUFnQiw0SkFUakIsZ0JBQWdCOzs0RkFTZixnQkFBZ0I7a0JBWjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDSixtQkFBbUIsRUFBRSxNQUFNO3FCQUM1QjtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs7QUFvREQsTUFBTSxPQUFPLG9CQUFvQjtJQWUvQixJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlHLENBQUM7SUFFRCxZQUFZLFNBQThCO1FBUEYsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBT3ZELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtZQUMzQixJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxFQUFFO1lBQ1YsTUFBTSxFQUFFLFlBQVk7WUFDcEIsR0FBRyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7K0dBM0JVLG9CQUFvQjttR0FBcEIsb0JBQW9CLGlIQUNZLENBQUMsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLDhEQUs5RSxlQUFlLDhEQUVmLGVBQWUsdUJBRWYsZUFBZSxtQ0FDZixnQkFBZ0IsbUNBQ2hCLGdCQUFnQixzQ0FDaEIsZ0JBQWdCLDZWQXRDMUI7Ozs7Ozs7OztHQVNULDREQWNTLE9BQU8sMkVBakROLGdCQUFnQix3RkFpRFUsK0JBQStCOzs0RkFFekQsb0JBQW9CO2tCQTVCaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osdUJBQXVCLEVBQUUsTUFBTTt3QkFDL0Isd0JBQXdCLEVBQUUseUJBQXlCO3dCQUNuRCxzQkFBc0IsRUFBRSx1QkFBdUI7d0JBQy9DLG1CQUFtQixFQUFFLGtCQUFrQjt3QkFDdkMsbUJBQW1CLEVBQUUsa0JBQWtCO3dCQUN2QyxzQkFBc0IsRUFBRSxVQUFVO3dCQUNsQyxrQkFBa0IsRUFBRSxNQUFNO3FCQUMzQjtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsK0JBQStCLENBQUM7aUJBQ3RFO3dGQUdDLFFBQVE7c0JBRFAsS0FBSzt1QkFBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBRTNGLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRWlDLE1BQU07c0JBQTVDLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUM1QixNQUFNO3NCQUFkLEtBQUs7Z0JBQ2lDLFVBQVU7c0JBQWhELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUVFLEdBQUc7c0JBQXpDLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUNHLE9BQU87c0JBQTlDLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ0UsT0FBTztzQkFBOUMsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFDRSxRQUFRO3NCQUEvQyxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgaW5qZWN0LFxuICBudW1iZXJBdHRyaWJ1dGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgUkVQX1RZUEUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N2LXRpdGxlLCBbc3YtdGl0bGVdJyxcbiAgZXhwb3J0QXM6ICdzdlRpdGxlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudCAvPicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnN2X190aXRsZV0nOiAndHJ1ZSdcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIFNWVGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IGVsOiBIVE1MRWxlbWVudCA9IGluamVjdChFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IHBhcmVudENvbXAgPSBpbmplY3QoU1ZDb250YWluZXJDb21wb25lbnQsIHsgaG9zdDogdHJ1ZSwgb3B0aW9uYWw6IHRydWUgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuID0gaW5qZWN0KFJlbmRlcmVyMik7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Q29tcCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtzdi10aXRsZV0gbXVzdCBpbmNsdWRlICdzdi1jb250YWluZXInIGNvbXBvbmVudGApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3QgZ3V0dGVyID0gdGhpcy5wYXJlbnRDb21wIS5ndXR0ZXI7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsO1xuICAgIHRoaXMucmVuLnNldFN0eWxlKGVsLCAncGFkZGluZy1sZWZ0JywgYCR7Z3V0dGVyIC8gMn1weGApO1xuICAgIHRoaXMucmVuLnNldFN0eWxlKGVsLCAncGFkZGluZy1yaWdodCcsIGAke2d1dHRlciAvIDJ9cHhgKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q2xhc3MoKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdi1jb250YWluZXIsIFtzdi1jb250YWluZXJdJyxcbiAgZXhwb3J0QXM6ICdzdkNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1yb3dcIiBbbmdTdHlsZV09XCJtYXJnaW5cIj5cbiAgICAgIEBpZiAodGl0bGUpIHtcbiAgICAgICAgPHN2LXRpdGxlPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0aXRsZVwiPnt7IHRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3YtdGl0bGU+XG4gICAgICB9XG4gICAgICA8bmctY29udGVudCAvPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5zdl9fY29udGFpbmVyXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLnN2X19ob3Jpem9udGFsXSc6IGBsYXlvdXQgPT09ICdob3Jpem9udGFsJ2AsXG4gICAgJ1tjbGFzcy5zdl9fdmVydGljYWxdJzogYGxheW91dCA9PT0gJ3ZlcnRpY2FsJ2AsXG4gICAgJ1tjbGFzcy5zdl9fc21hbGxdJzogYHNpemUgPT09ICdzbWFsbCdgLFxuICAgICdbY2xhc3Muc3ZfX2xhcmdlXSc6IGBzaXplID09PSAnbGFyZ2UnYCxcbiAgICAnW2NsYXNzLnN2X19ib3JkZXJlZF0nOiBgYm9yZGVyZWRgLFxuICAgICdbY2xhc3MuY2xlYXJmaXhdJzogYHRydWVgXG4gIH0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nU3R5bGUsIFNWVGl0bGVDb21wb25lbnQsIE56U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFNWQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgQElucHV0KHsgYWxpYXM6ICdzdi1jb250YWluZXInLCB0cmFuc2Zvcm06ICh2OiB1bmtub3duKSA9PiAodiA9PSBudWxsID8gbnVsbCA6IG51bWJlckF0dHJpYnV0ZSh2KSkgfSlcbiAgY29sSW5Db24/OiBSRVBfVFlQRTtcbiAgQElucHV0KCkgdGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgc2l6ZT86ICdzbWFsbCcgfCAnbGFyZ2UnIHwgJ2RlZmF1bHQnO1xuICAvKiog5YiX6KGo6aG56Ze06Led77yM5Y2V5L2N5Li6IGBweGAgKi9cbiAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgZ3V0dGVyITogbnVtYmVyO1xuICBASW5wdXQoKSBsYXlvdXQhOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBsYWJlbFdpZHRoPzogbnVtYmVyO1xuICAvKiog5oyH5a6a5L+h5oGv5pyA5aSa5YiG5Yeg5YiX5bGV56S677yM5pyA57uI5LiA6KGM5Yeg5YiX55SxIGNvbCDphY3nva7nu5PlkIjlk43lupTlvI/op4TliJnlhrPlrpogKi9cbiAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgY29sITogbnVtYmVyO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGVmYXVsdCE6IGJvb2xlYW47XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBub0NvbG9uID0gZmFsc2U7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBib3JkZXJlZCA9IGZhbHNlO1xuXG4gIGdldCBtYXJnaW4oKTogeyBbazogc3RyaW5nXTogbnVtYmVyIH0ge1xuICAgIHJldHVybiB0aGlzLmJvcmRlcmVkID8ge30gOiB7ICdtYXJnaW4tbGVmdC5weCc6IC0odGhpcy5ndXR0ZXIgLyAyKSwgJ21hcmdpbi1yaWdodC5weCc6IC0odGhpcy5ndXR0ZXIgLyAyKSB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgY29uZmlnU3J2LmF0dGFjaCh0aGlzLCAnc3YnLCB7XG4gICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgZ3V0dGVyOiAzMixcbiAgICAgIGxheW91dDogJ2hvcml6b250YWwnLFxuICAgICAgY29sOiAzLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=