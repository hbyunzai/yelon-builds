import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "ng-zorro-antd/drawer";
import * as i3 from "ng-zorro-antd/switch";
import * as i4 from "ng-zorro-antd/input";
import * as i5 from "ng-zorro-antd/input-number";
export class SettingDrawerItemComponent {
    constructor() {
        this.i = {};
        this.pxVal = 0;
        this.format = (value) => `${value} px`;
    }
    set data(val) {
        this.i = val;
        if (val.type === 'px') {
            this.pxVal = +val.value.replace('px', '');
        }
    }
    pxChange(val) {
        this.i.value = `${val}px`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: SettingDrawerItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.6", type: SettingDrawerItemComponent, selector: "setting-drawer-item", inputs: { data: "data" }, host: { properties: { "class.setting-drawer__body-item": "true" } }, ngImport: i0, template: "<span>\n  {{ i.label }}\n  <span class=\"pl-sm text-grey\">{{ i.tip }}</span>\n</span>\n@switch (i.type) {\n  @case ('color') {\n    <input nz-input type=\"color\" style=\"width: 88px\" [(ngModel)]=\"i.value\" [ngModelOptions]=\"{ standalone: true }\" />\n  }\n  @case ('input') {\n    <input nz-input style=\"width: 88px\" [(ngModel)]=\"i.value\" [ngModelOptions]=\"{ standalone: true }\" />\n  }\n  @case ('px') {\n    <nz-input-number\n      [(ngModel)]=\"pxVal\"\n      (ngModelChange)=\"pxChange($event)\"\n      [nzMin]=\"i.min\"\n      [nzMax]=\"i.max\"\n      [nzStep]=\"i.step || 2\"\n      [nzFormatter]=\"format\"\n    />\n  }\n  @case ('switch') {\n    <nz-switch nzSize=\"small\" [(ngModel)]=\"i.value\" [ngModelOptions]=\"{ standalone: true }\" />\n  }\n  @default {\n    <ng-template nzDrawerContent />\n  }\n}\n", dependencies: [{ kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2.NzDrawerContentDirective, selector: "[nzDrawerContent]", exportAs: ["nzDrawerContent"] }, { kind: "component", type: i3.NzSwitchComponent, selector: "nz-switch", inputs: ["nzLoading", "nzDisabled", "nzControl", "nzCheckedChildren", "nzUnCheckedChildren", "nzSize", "nzId"], exportAs: ["nzSwitch"] }, { kind: "directive", type: i4.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i5.NzInputNumberComponent, selector: "nz-input-number", inputs: ["nzSize", "nzMin", "nzMax", "nzParser", "nzPrecision", "nzPrecisionMode", "nzPlaceHolder", "nzStatus", "nzStep", "nzInputMode", "nzId", "nzDisabled", "nzReadOnly", "nzAutoFocus", "nzBorderless", "nzFormatter"], outputs: ["nzBlur", "nzFocus"], exportAs: ["nzInputNumber"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: SettingDrawerItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'setting-drawer-item', host: {
                        '[class.setting-drawer__body-item]': 'true'
                    }, template: "<span>\n  {{ i.label }}\n  <span class=\"pl-sm text-grey\">{{ i.tip }}</span>\n</span>\n@switch (i.type) {\n  @case ('color') {\n    <input nz-input type=\"color\" style=\"width: 88px\" [(ngModel)]=\"i.value\" [ngModelOptions]=\"{ standalone: true }\" />\n  }\n  @case ('input') {\n    <input nz-input style=\"width: 88px\" [(ngModel)]=\"i.value\" [ngModelOptions]=\"{ standalone: true }\" />\n  }\n  @case ('px') {\n    <nz-input-number\n      [(ngModel)]=\"pxVal\"\n      (ngModelChange)=\"pxChange($event)\"\n      [nzMin]=\"i.min\"\n      [nzMax]=\"i.max\"\n      [nzStep]=\"i.step || 2\"\n      [nzFormatter]=\"format\"\n    />\n  }\n  @case ('switch') {\n    <nz-switch nzSize=\"small\" [(ngModel)]=\"i.value\" [ngModelOptions]=\"{ standalone: true }\" />\n  }\n  @default {\n    <ng-template nzDrawerContent />\n  }\n}\n" }]
        }], propDecorators: { data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy1kcmF3ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zZXR0aW5nLWRyYXdlci9zZXR0aW5nLWRyYXdlci1pdGVtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NldHRpbmctZHJhd2VyL3NldHRpbmctZHJhd2VyLWl0ZW0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFXakQsTUFBTSxPQUFPLDBCQUEwQjtJQVB2QztRQVFFLE1BQUMsR0FBYyxFQUFFLENBQUM7UUFVbEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQU1WLFdBQU0sR0FBRyxDQUFDLEtBQWEsRUFBVSxFQUFFLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQztLQUNuRDtJQWZDLElBQ0ksSUFBSSxDQUFDLEdBQWM7UUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUlELFFBQVEsQ0FBQyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQzs4R0FmVSwwQkFBMEI7a0dBQTFCLDBCQUEwQiwwSkNYdkMsNnpCQTRCQTs7MkZEakJhLDBCQUEwQjtrQkFQdEMsU0FBUzsrQkFDRSxxQkFBcUIsUUFFekI7d0JBQ0osbUNBQW1DLEVBQUUsTUFBTTtxQkFDNUM7OEJBTUcsSUFBSTtzQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NldHRpbmctZHJhd2VyLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vc2V0dGluZy1kcmF3ZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnNldHRpbmctZHJhd2VyX19ib2R5LWl0ZW1dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ0RyYXdlckl0ZW1Db21wb25lbnQge1xuICBpOiBOelNhZmVBbnkgPSB7fTtcblxuICBASW5wdXQoKVxuICBzZXQgZGF0YSh2YWw6IE56U2FmZUFueSkge1xuICAgIHRoaXMuaSA9IHZhbDtcbiAgICBpZiAodmFsLnR5cGUgPT09ICdweCcpIHtcbiAgICAgIHRoaXMucHhWYWwgPSArdmFsLnZhbHVlLnJlcGxhY2UoJ3B4JywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHB4VmFsID0gMDtcblxuICBweENoYW5nZSh2YWw6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaS52YWx1ZSA9IGAke3ZhbH1weGA7XG4gIH1cblxuICBmb3JtYXQgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiBgJHt2YWx1ZX0gcHhgO1xufVxuIiwiPHNwYW4+XG4gIHt7IGkubGFiZWwgfX1cbiAgPHNwYW4gY2xhc3M9XCJwbC1zbSB0ZXh0LWdyZXlcIj57eyBpLnRpcCB9fTwvc3Bhbj5cbjwvc3Bhbj5cbkBzd2l0Y2ggKGkudHlwZSkge1xuICBAY2FzZSAoJ2NvbG9yJykge1xuICAgIDxpbnB1dCBuei1pbnB1dCB0eXBlPVwiY29sb3JcIiBzdHlsZT1cIndpZHRoOiA4OHB4XCIgWyhuZ01vZGVsKV09XCJpLnZhbHVlXCIgW25nTW9kZWxPcHRpb25zXT1cInsgc3RhbmRhbG9uZTogdHJ1ZSB9XCIgLz5cbiAgfVxuICBAY2FzZSAoJ2lucHV0Jykge1xuICAgIDxpbnB1dCBuei1pbnB1dCBzdHlsZT1cIndpZHRoOiA4OHB4XCIgWyhuZ01vZGVsKV09XCJpLnZhbHVlXCIgW25nTW9kZWxPcHRpb25zXT1cInsgc3RhbmRhbG9uZTogdHJ1ZSB9XCIgLz5cbiAgfVxuICBAY2FzZSAoJ3B4Jykge1xuICAgIDxuei1pbnB1dC1udW1iZXJcbiAgICAgIFsobmdNb2RlbCldPVwicHhWYWxcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwicHhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICBbbnpNaW5dPVwiaS5taW5cIlxuICAgICAgW256TWF4XT1cImkubWF4XCJcbiAgICAgIFtuelN0ZXBdPVwiaS5zdGVwIHx8IDJcIlxuICAgICAgW256Rm9ybWF0dGVyXT1cImZvcm1hdFwiXG4gICAgLz5cbiAgfVxuICBAY2FzZSAoJ3N3aXRjaCcpIHtcbiAgICA8bnotc3dpdGNoIG56U2l6ZT1cInNtYWxsXCIgWyhuZ01vZGVsKV09XCJpLnZhbHVlXCIgW25nTW9kZWxPcHRpb25zXT1cInsgc3RhbmRhbG9uZTogdHJ1ZSB9XCIgLz5cbiAgfVxuICBAZGVmYXVsdCB7XG4gICAgPG5nLXRlbXBsYXRlIG56RHJhd2VyQ29udGVudCAvPlxuICB9XG59XG4iXX0=