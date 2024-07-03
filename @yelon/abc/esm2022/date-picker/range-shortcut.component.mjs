import { Component, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
export class RangePickerShortcutTplComponent {
    constructor() {
        this.list = [];
    }
    click(_) { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: RangePickerShortcutTplComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.5", type: RangePickerShortcutTplComponent, isStandalone: true, selector: "ng-component", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      @for (i of list; track $index) {
        <a (click)="click(i)" [innerHTML]="i._text" [class.ml-sm]="!$first"></a>
      }
    </ng-template>
  `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: RangePickerShortcutTplComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '',
                    template: `
    <ng-template #tpl>
      @for (i of list; track $index) {
        <a (click)="click(i)" [innerHTML]="i._text" [class.ml-sm]="!$first"></a>
      }
    </ng-template>
  `,
                    standalone: true
                }]
        }], propDecorators: { tpl: [{
                type: ViewChild,
                args: ['tpl', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2hvcnRjdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2RhdGUtcGlja2VyL3JhbmdlLXNob3J0Y3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFlLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFlbEUsTUFBTSxPQUFPLCtCQUErQjtJQVg1QztRQWVFLFNBQUksR0FBd0MsRUFBRSxDQUFDO0tBR2hEO0lBREMsS0FBSyxDQUFDLENBQW9DLElBQVMsQ0FBQzs4R0FOekMsK0JBQStCO2tHQUEvQiwrQkFBK0Isa0xBVGhDOzs7Ozs7R0FNVDs7MkZBR1UsK0JBQStCO2tCQVgzQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO29CQUNaLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7b0JBQ0QsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzhCQUdVLEdBQUc7c0JBRFgsU0FBUzt1QkFBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFl1bnphaURhdGVSYW5nZVBpY2tlclNob3J0Y3V0SXRlbSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0cGw+XG4gICAgICBAZm9yIChpIG9mIGxpc3Q7IHRyYWNrICRpbmRleCkge1xuICAgICAgICA8YSAoY2xpY2spPVwiY2xpY2soaSlcIiBbaW5uZXJIVE1MXT1cImkuX3RleHRcIiBbY2xhc3MubWwtc21dPVwiISRmaXJzdFwiPjwvYT5cbiAgICAgIH1cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlUGlja2VyU2hvcnRjdXRUcGxDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCd0cGwnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICByZWFkb25seSB0cGwhOiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBsaXN0OiBZdW56YWlEYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dEl0ZW1bXSA9IFtdO1xuXG4gIGNsaWNrKF86IFl1bnphaURhdGVSYW5nZVBpY2tlclNob3J0Y3V0SXRlbSk6IHZvaWQge31cbn1cbiJdfQ==