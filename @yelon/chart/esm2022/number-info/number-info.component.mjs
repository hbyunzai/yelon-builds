import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, numberAttribute } from '@angular/core';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
export class NumberInfoComponent {
    constructor() {
        /** 状态样式 */
        this.theme = 'light';
        /** 设置数字和描述直接的间距（像素） */
        this.gap = 8;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NumberInfoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: NumberInfoComponent, isStandalone: true, selector: "number-info", inputs: { title: "title", subTitle: "subTitle", total: "total", subTotal: "subTotal", suffix: "suffix", status: "status", theme: "theme", gap: ["gap", "gap", numberAttribute] }, host: { properties: { "class.number-info": "true", "class.number-info__light": "theme === 'light'", "class.number-info__default": "theme === 'default'" } }, exportAs: ["numberInfo"], ngImport: i0, template: "@if (title) {\n  <div class=\"number-info__title\">\n    <ng-container *nzStringTemplateOutlet=\"title\">{{ title }}</ng-container>\n  </div>\n}\n@if (subTitle) {\n  <div class=\"number-info__title-sub\">\n    <ng-container *nzStringTemplateOutlet=\"subTitle\">{{ subTitle }}</ng-container>\n  </div>\n}\n<div class=\"number-info__value\" [style.margin-top.px]=\"gap\">\n  <span class=\"number-info__value-text\">\n    <ng-container *nzStringTemplateOutlet=\"total\">{{ total }}</ng-container>\n    @if (suffix) {\n      <em class=\"number-info__value-suffix\">{{ suffix }}</em>\n    }\n  </span>\n  @if (status || subTotal) {\n    <span class=\"number-info__value-text number-info__value-sub\">\n      <ng-container *nzStringTemplateOutlet=\"subTotal\">{{ subTotal }}</ng-container>\n      @if (status) {\n        <i nz-icon nzType=\"caret-{{ status }}\"></i>\n      }\n    </span>\n  }\n</div>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NumberInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'number-info', exportAs: 'numberInfo', host: {
                        '[class.number-info]': `true`,
                        '[class.number-info__light]': `theme === 'light'`,
                        '[class.number-info__default]': `theme === 'default'`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [NzStringTemplateOutletDirective, NzIconDirective], template: "@if (title) {\n  <div class=\"number-info__title\">\n    <ng-container *nzStringTemplateOutlet=\"title\">{{ title }}</ng-container>\n  </div>\n}\n@if (subTitle) {\n  <div class=\"number-info__title-sub\">\n    <ng-container *nzStringTemplateOutlet=\"subTitle\">{{ subTitle }}</ng-container>\n  </div>\n}\n<div class=\"number-info__value\" [style.margin-top.px]=\"gap\">\n  <span class=\"number-info__value-text\">\n    <ng-container *nzStringTemplateOutlet=\"total\">{{ total }}</ng-container>\n    @if (suffix) {\n      <em class=\"number-info__value-suffix\">{{ suffix }}</em>\n    }\n  </span>\n  @if (status || subTotal) {\n    <span class=\"number-info__value-text number-info__value-sub\">\n      <ng-container *nzStringTemplateOutlet=\"subTotal\">{{ subTotal }}</ng-container>\n      @if (status) {\n        <i nz-icon nzType=\"caret-{{ status }}\"></i>\n      }\n    </span>\n  }\n</div>\n" }]
        }], propDecorators: { title: [{
                type: Input
            }], subTitle: [{
                type: Input
            }], total: [{
                type: Input
            }], subTotal: [{
                type: Input
            }], suffix: [{
                type: Input
            }], status: [{
                type: Input
            }], theme: [{
                type: Input
            }], gap: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY2hhcnQvbnVtYmVyLWluZm8vbnVtYmVyLWluZm8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY2hhcnQvbnVtYmVyLWluZm8vbnVtYmVyLWluZm8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUVMLGlCQUFpQixFQUNqQixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFpQnJELE1BQU0sT0FBTyxtQkFBbUI7SUFmaEM7UUE0QkUsV0FBVztRQUNGLFVBQUssR0FBd0IsT0FBTyxDQUFDO1FBQzlDLHVCQUF1QjtRQUNnQixRQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ2hEOzhHQWpCWSxtQkFBbUI7a0dBQW5CLG1CQUFtQiw2TUFnQlYsZUFBZSxvTkMzQ3JDLG00QkEwQkEsNENERFksK0JBQStCLGdMQUFFLGVBQWU7OzJGQUUvQyxtQkFBbUI7a0JBZi9CLFNBQVM7K0JBQ0UsYUFBYSxZQUNiLFlBQVksUUFFaEI7d0JBQ0oscUJBQXFCLEVBQUUsTUFBTTt3QkFDN0IsNEJBQTRCLEVBQUUsbUJBQW1CO3dCQUNqRCw4QkFBOEIsRUFBRSxxQkFBcUI7cUJBQ3RELHVCQUNvQixLQUFLLG1CQUNULHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksY0FDekIsSUFBSSxXQUNQLENBQUMsK0JBQStCLEVBQUUsZUFBZSxDQUFDOzhCQUlsRCxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFaUMsR0FBRztzQkFBekMsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBudW1iZXJBdHRyaWJ1dGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56SWNvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ251bWJlci1pbmZvJyxcbiAgZXhwb3J0QXM6ICdudW1iZXJJbmZvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL251bWJlci1pbmZvLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubnVtYmVyLWluZm9dJzogYHRydWVgLFxuICAgICdbY2xhc3MubnVtYmVyLWluZm9fX2xpZ2h0XSc6IGB0aGVtZSA9PT0gJ2xpZ2h0J2AsXG4gICAgJ1tjbGFzcy5udW1iZXItaW5mb19fZGVmYXVsdF0nOiBgdGhlbWUgPT09ICdkZWZhdWx0J2BcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpTdHJpbmdUZW1wbGF0ZU91dGxldERpcmVjdGl2ZSwgTnpJY29uRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJJbmZvQ29tcG9uZW50IHtcbiAgLyoqIOagh+mimCAqL1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbDtcbiAgLyoqIOWtkOagh+mimCAqL1xuICBASW5wdXQoKSBzdWJUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbDtcbiAgLyoqIOaAu+mHjyAqL1xuICBASW5wdXQoKSB0b3RhbD86IHN0cmluZyB8IG51bWJlciB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbDtcbiAgLyoqIOaAu+mHj+WQjue8gCAqL1xuICBASW5wdXQoKSBzdWJUb3RhbD86IHN0cmluZyB8IG51bWJlciB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbDtcbiAgLyoqIOWtkOaAu+mHjyAqL1xuICBASW5wdXQoKSBzdWZmaXg/OiBzdHJpbmcgfCBudWxsO1xuICAvKiog5aKe5Yqg54q25oCBICovXG4gIEBJbnB1dCgpIHN0YXR1cz86ICd1cCcgfCAnZG93bic7XG4gIC8qKiDnirbmgIHmoLflvI8gKi9cbiAgQElucHV0KCkgdGhlbWU6ICdsaWdodCcgfCAnZGVmYXVsdCcgPSAnbGlnaHQnO1xuICAvKiog6K6+572u5pWw5a2X5ZKM5o+P6L+w55u05o6l55qE6Ze06Led77yI5YOP57Sg77yJICovXG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGdhcCA9IDg7XG59XG4iLCJAaWYgKHRpdGxlKSB7XG4gIDxkaXYgY2xhc3M9XCJudW1iZXItaW5mb19fdGl0bGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwidGl0bGVcIj57eyB0aXRsZSB9fTwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbn1cbkBpZiAoc3ViVGl0bGUpIHtcbiAgPGRpdiBjbGFzcz1cIm51bWJlci1pbmZvX190aXRsZS1zdWJcIj5cbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwic3ViVGl0bGVcIj57eyBzdWJUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbn1cbjxkaXYgY2xhc3M9XCJudW1iZXItaW5mb19fdmFsdWVcIiBbc3R5bGUubWFyZ2luLXRvcC5weF09XCJnYXBcIj5cbiAgPHNwYW4gY2xhc3M9XCJudW1iZXItaW5mb19fdmFsdWUtdGV4dFwiPlxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0b3RhbFwiPnt7IHRvdGFsIH19PC9uZy1jb250YWluZXI+XG4gICAgQGlmIChzdWZmaXgpIHtcbiAgICAgIDxlbSBjbGFzcz1cIm51bWJlci1pbmZvX192YWx1ZS1zdWZmaXhcIj57eyBzdWZmaXggfX08L2VtPlxuICAgIH1cbiAgPC9zcGFuPlxuICBAaWYgKHN0YXR1cyB8fCBzdWJUb3RhbCkge1xuICAgIDxzcGFuIGNsYXNzPVwibnVtYmVyLWluZm9fX3ZhbHVlLXRleHQgbnVtYmVyLWluZm9fX3ZhbHVlLXN1YlwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cInN1YlRvdGFsXCI+e3sgc3ViVG90YWwgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIEBpZiAoc3RhdHVzKSB7XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2FyZXQte3sgc3RhdHVzIH19XCI+PC9pPlxuICAgICAgfVxuICAgIDwvc3Bhbj5cbiAgfVxuPC9kaXY+XG4iXX0=