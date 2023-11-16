import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "ng-zorro-antd/checkbox";
import * as i5 from "ng-zorro-antd/menu";
import * as i6 from "ng-zorro-antd/dropdown";
import * as i7 from "ng-zorro-antd/radio";
import * as i8 from "ng-zorro-antd/input";
import * as i9 from "ng-zorro-antd/input-number";
import * as i10 from "ng-zorro-antd/date-picker";
export class STFilterComponent {
    get icon() {
        return this.f.icon;
    }
    constructor(cdr) {
        this.cdr = cdr;
        this.visible = false;
        this.locale = {};
        this.n = new EventEmitter();
        this.handle = new EventEmitter();
    }
    stopPropagation($event) {
        $event.stopPropagation();
    }
    checkboxChange() {
        this.n.emit(this.f.menus?.filter(w => w.checked));
    }
    radioChange(item) {
        this.f.menus.forEach(i => (i.checked = false));
        item.checked = !item.checked;
        this.n.emit(item);
    }
    close(result) {
        if (result != null)
            this.handle.emit(result);
        this.visible = false;
        this.cdr.detectChanges();
    }
    confirm() {
        this.handle.emit(true);
        return this;
    }
    reset() {
        this.handle.emit(false);
        return this;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: STFilterComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: STFilterComponent, selector: "st-filter", inputs: { col: "col", locale: "locale", f: "f" }, outputs: { n: "n", handle: "handle" }, host: { properties: { "class.ant-table-filter-trigger-container": "true", "class.st__filter": "true", "class.ant-table-filter-trigger-container-open": "visible" } }, ngImport: i0, template: `
    <span
      class="ant-table-filter-trigger"
      [class.active]="visible || f.default"
      nz-dropdown
      [nzDropdownMenu]="filterMenu"
      nzTrigger="click"
      [nzClickHide]="false"
      [(nzVisible)]="visible"
      nzOverlayClassName="st__filter-wrap"
      (click)="stopPropagation($event)"
    >
      <i nz-icon [nzType]="icon.type" [nzTheme]="icon.theme!"></i>
    </span>
    <nz-dropdown-menu #filterMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <ng-container [ngSwitch]="f.type">
          <div *ngSwitchCase="'keyword'" class="st__filter-keyword">
            <input
              type="text"
              nz-input
              [attr.placeholder]="f.placeholder"
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              (keyup.enter)="confirm()"
            />
          </div>
          <div *ngSwitchCase="'number'" class="p-sm st__filter-number">
            <nz-input-number
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              [nzMin]="f.number!.min!"
              [nzMax]="f.number!.max!"
              [nzStep]="f.number!.step!"
              [nzPrecision]="f.number!.precision"
              [nzPlaceHolder]="f.placeholder!"
              class="width-100"
            />
          </div>
          <div *ngSwitchCase="'date'" class="p-sm st__filter-date">
            <nz-date-picker
              *ngIf="!f.date!.range"
              nzInline
              [nzMode]="f.date!.mode"
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              [nzShowNow]="f.date!.showNow"
              [nzShowToday]="f.date!.showToday"
              [nzDisabledDate]="f.date!.disabledDate"
              [nzDisabledTime]="f.date!.disabledTime"
            />
            <nz-range-picker
              *ngIf="f.date!.range"
              nzInline
              [nzMode]="f.date!.mode"
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              [nzShowNow]="f.date!.showNow"
              [nzShowToday]="f.date!.showToday"
              [nzDisabledDate]="f.date!.disabledDate"
              [nzDisabledTime]="f.date!.disabledTime"
            />
          </div>
          <div *ngSwitchCase="'time'" class="p-sm st__filter-time"> </div>
          <div *ngSwitchCase="'custom'" class="st__filter-custom">
            <ng-template
              [ngTemplateOutlet]="f.custom!"
              [ngTemplateOutletContext]="{ $implicit: f, col: col, handle: this }"
            ></ng-template>
          </div>
          <ul *ngSwitchDefault nz-menu>
            <ng-container *ngIf="f.multiple">
              <li nz-menu-item *ngFor="let filter of f.menus">
                <label nz-checkbox [(ngModel)]="filter.checked" (ngModelChange)="checkboxChange()">
                  {{ filter.text }}
                </label>
              </li>
            </ng-container>
            <ng-container *ngIf="!f.multiple">
              <li nz-menu-item *ngFor="let filter of f.menus">
                <label nz-radio [ngModel]="filter.checked" (ngModelChange)="radioChange(filter)">
                  {{ filter.text }}
                </label>
              </li>
            </ng-container>
          </ul>
        </ng-container>
        <div *ngIf="f.showOPArea" class="ant-table-filter-dropdown-btns">
          <a class="ant-table-filter-dropdown-link confirm" (click)="confirm()">
            <span>{{ f.confirmText || locale.filterConfirm }}</span>
          </a>
          <a class="ant-table-filter-dropdown-link clear" (click)="reset()">
            <span>{{ f.clearText || locale.filterReset }}</span>
          </a>
        </div>
      </div>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i4.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i5.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i6.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i6.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "component", type: i7.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus"], exportAs: ["nzRadio"] }, { kind: "directive", type: i8.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i9.NzInputNumberComponent, selector: "nz-input-number", inputs: ["nzSize", "nzMin", "nzMax", "nzParser", "nzPrecision", "nzPrecisionMode", "nzPlaceHolder", "nzStatus", "nzStep", "nzInputMode", "nzId", "nzDisabled", "nzReadOnly", "nzAutoFocus", "nzBorderless", "nzFormatter"], outputs: ["nzBlur", "nzFocus"], exportAs: ["nzInputNumber"] }, { kind: "component", type: i10.NzDatePickerComponent, selector: "nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker", inputs: ["nzAllowClear", "nzAutoFocus", "nzDisabled", "nzBorderless", "nzInputReadOnly", "nzInline", "nzOpen", "nzDisabledDate", "nzLocale", "nzPlaceHolder", "nzPopupStyle", "nzDropdownClassName", "nzSize", "nzStatus", "nzFormat", "nzDateRender", "nzDisabledTime", "nzRenderExtraFooter", "nzShowToday", "nzMode", "nzShowNow", "nzRanges", "nzDefaultPickerValue", "nzSeparator", "nzSuffixIcon", "nzBackdrop", "nzId", "nzPlacement", "nzShowWeekNumber", "nzShowTime"], outputs: ["nzOnPanelChange", "nzOnCalendarChange", "nzOnOk", "nzOnOpenChange"], exportAs: ["nzDatePicker"] }, { kind: "directive", type: i10.NzRangePickerComponent, selector: "nz-range-picker", exportAs: ["nzRangePicker"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: STFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'st-filter',
                    template: `
    <span
      class="ant-table-filter-trigger"
      [class.active]="visible || f.default"
      nz-dropdown
      [nzDropdownMenu]="filterMenu"
      nzTrigger="click"
      [nzClickHide]="false"
      [(nzVisible)]="visible"
      nzOverlayClassName="st__filter-wrap"
      (click)="stopPropagation($event)"
    >
      <i nz-icon [nzType]="icon.type" [nzTheme]="icon.theme!"></i>
    </span>
    <nz-dropdown-menu #filterMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <ng-container [ngSwitch]="f.type">
          <div *ngSwitchCase="'keyword'" class="st__filter-keyword">
            <input
              type="text"
              nz-input
              [attr.placeholder]="f.placeholder"
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              (keyup.enter)="confirm()"
            />
          </div>
          <div *ngSwitchCase="'number'" class="p-sm st__filter-number">
            <nz-input-number
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              [nzMin]="f.number!.min!"
              [nzMax]="f.number!.max!"
              [nzStep]="f.number!.step!"
              [nzPrecision]="f.number!.precision"
              [nzPlaceHolder]="f.placeholder!"
              class="width-100"
            />
          </div>
          <div *ngSwitchCase="'date'" class="p-sm st__filter-date">
            <nz-date-picker
              *ngIf="!f.date!.range"
              nzInline
              [nzMode]="f.date!.mode"
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              [nzShowNow]="f.date!.showNow"
              [nzShowToday]="f.date!.showToday"
              [nzDisabledDate]="f.date!.disabledDate"
              [nzDisabledTime]="f.date!.disabledTime"
            />
            <nz-range-picker
              *ngIf="f.date!.range"
              nzInline
              [nzMode]="f.date!.mode"
              [(ngModel)]="f.menus![0]!.value"
              (ngModelChange)="n.emit($event)"
              [nzShowNow]="f.date!.showNow"
              [nzShowToday]="f.date!.showToday"
              [nzDisabledDate]="f.date!.disabledDate"
              [nzDisabledTime]="f.date!.disabledTime"
            />
          </div>
          <div *ngSwitchCase="'time'" class="p-sm st__filter-time"> </div>
          <div *ngSwitchCase="'custom'" class="st__filter-custom">
            <ng-template
              [ngTemplateOutlet]="f.custom!"
              [ngTemplateOutletContext]="{ $implicit: f, col: col, handle: this }"
            ></ng-template>
          </div>
          <ul *ngSwitchDefault nz-menu>
            <ng-container *ngIf="f.multiple">
              <li nz-menu-item *ngFor="let filter of f.menus">
                <label nz-checkbox [(ngModel)]="filter.checked" (ngModelChange)="checkboxChange()">
                  {{ filter.text }}
                </label>
              </li>
            </ng-container>
            <ng-container *ngIf="!f.multiple">
              <li nz-menu-item *ngFor="let filter of f.menus">
                <label nz-radio [ngModel]="filter.checked" (ngModelChange)="radioChange(filter)">
                  {{ filter.text }}
                </label>
              </li>
            </ng-container>
          </ul>
        </ng-container>
        <div *ngIf="f.showOPArea" class="ant-table-filter-dropdown-btns">
          <a class="ant-table-filter-dropdown-link confirm" (click)="confirm()">
            <span>{{ f.confirmText || locale.filterConfirm }}</span>
          </a>
          <a class="ant-table-filter-dropdown-link clear" (click)="reset()">
            <span>{{ f.clearText || locale.filterReset }}</span>
          </a>
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                    host: {
                        '[class.ant-table-filter-trigger-container]': `true`,
                        '[class.st__filter]': `true`,
                        '[class.ant-table-filter-trigger-container-open]': `visible`
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { col: [{
                type: Input
            }], locale: [{
                type: Input
            }], f: [{
                type: Input
            }], n: [{
                type: Output
            }], handle: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3QtZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9zdC9zdC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0FBb0h2QixNQUFNLE9BQU8saUJBQWlCO0lBTzVCLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBVjFDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFUCxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBRWQsTUFBQyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDaEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFLWCxDQUFDO0lBRTlDLGVBQWUsQ0FBQyxNQUFrQjtRQUNoQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQXdCO1FBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBZ0I7UUFDcEIsSUFBSSxNQUFNLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOytHQTFDVSxpQkFBaUI7bUdBQWpCLGlCQUFpQixnVEEzR2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUdUOzs0RkFVVSxpQkFBaUI7a0JBN0c3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpR1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLDRDQUE0QyxFQUFFLE1BQU07d0JBQ3BELG9CQUFvQixFQUFFLE1BQU07d0JBQzVCLGlEQUFpRCxFQUFFLFNBQVM7cUJBQzdEO29CQUNELG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7d0dBR1UsR0FBRztzQkFBWCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxDQUFDO3NCQUFULEtBQUs7Z0JBQ2EsQ0FBQztzQkFBbkIsTUFBTTtnQkFDWSxNQUFNO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuXG5pbXBvcnQgeyBTVENvbHVtbkZpbHRlciwgU1RDb2x1bW5GaWx0ZXJNZW51LCBTVEljb24gfSBmcm9tICcuL3N0LmludGVyZmFjZXMnO1xuaW1wb3J0IHsgX1NUQ29sdW1uIH0gZnJvbSAnLi9zdC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0LWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci10cmlnZ2VyXCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwidmlzaWJsZSB8fCBmLmRlZmF1bHRcIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIFtuekRyb3Bkb3duTWVudV09XCJmaWx0ZXJNZW51XCJcbiAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgIFtuekNsaWNrSGlkZV09XCJmYWxzZVwiXG4gICAgICBbKG56VmlzaWJsZSldPVwidmlzaWJsZVwiXG4gICAgICBuek92ZXJsYXlDbGFzc05hbWU9XCJzdF9fZmlsdGVyLXdyYXBcIlxuICAgICAgKGNsaWNrKT1cInN0b3BQcm9wYWdhdGlvbigkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiaWNvbi50eXBlXCIgW256VGhlbWVdPVwiaWNvbi50aGVtZSFcIj48L2k+XG4gICAgPC9zcGFuPlxuICAgIDxuei1kcm9wZG93bi1tZW51ICNmaWx0ZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdGFibGUtZmlsdGVyLWRyb3Bkb3duXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImYudHlwZVwiPlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidrZXl3b3JkJ1wiIGNsYXNzPVwic3RfX2ZpbHRlci1rZXl3b3JkXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBuei1pbnB1dFxuICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJmLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmLm1lbnVzIVswXSEudmFsdWVcIlxuICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJuLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChrZXl1cC5lbnRlcik9XCJjb25maXJtKClcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiIGNsYXNzPVwicC1zbSBzdF9fZmlsdGVyLW51bWJlclwiPlxuICAgICAgICAgICAgPG56LWlucHV0LW51bWJlclxuICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImYubWVudXMhWzBdIS52YWx1ZVwiXG4gICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm4uZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgW256TWluXT1cImYubnVtYmVyIS5taW4hXCJcbiAgICAgICAgICAgICAgW256TWF4XT1cImYubnVtYmVyIS5tYXghXCJcbiAgICAgICAgICAgICAgW256U3RlcF09XCJmLm51bWJlciEuc3RlcCFcIlxuICAgICAgICAgICAgICBbbnpQcmVjaXNpb25dPVwiZi5udW1iZXIhLnByZWNpc2lvblwiXG4gICAgICAgICAgICAgIFtuelBsYWNlSG9sZGVyXT1cImYucGxhY2Vob2xkZXIhXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ3aWR0aC0xMDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBjbGFzcz1cInAtc20gc3RfX2ZpbHRlci1kYXRlXCI+XG4gICAgICAgICAgICA8bnotZGF0ZS1waWNrZXJcbiAgICAgICAgICAgICAgKm5nSWY9XCIhZi5kYXRlIS5yYW5nZVwiXG4gICAgICAgICAgICAgIG56SW5saW5lXG4gICAgICAgICAgICAgIFtuek1vZGVdPVwiZi5kYXRlIS5tb2RlXCJcbiAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmLm1lbnVzIVswXSEudmFsdWVcIlxuICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJuLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIFtuelNob3dOb3ddPVwiZi5kYXRlIS5zaG93Tm93XCJcbiAgICAgICAgICAgICAgW256U2hvd1RvZGF5XT1cImYuZGF0ZSEuc2hvd1RvZGF5XCJcbiAgICAgICAgICAgICAgW256RGlzYWJsZWREYXRlXT1cImYuZGF0ZSEuZGlzYWJsZWREYXRlXCJcbiAgICAgICAgICAgICAgW256RGlzYWJsZWRUaW1lXT1cImYuZGF0ZSEuZGlzYWJsZWRUaW1lXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bnotcmFuZ2UtcGlja2VyXG4gICAgICAgICAgICAgICpuZ0lmPVwiZi5kYXRlIS5yYW5nZVwiXG4gICAgICAgICAgICAgIG56SW5saW5lXG4gICAgICAgICAgICAgIFtuek1vZGVdPVwiZi5kYXRlIS5tb2RlXCJcbiAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmLm1lbnVzIVswXSEudmFsdWVcIlxuICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJuLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIFtuelNob3dOb3ddPVwiZi5kYXRlIS5zaG93Tm93XCJcbiAgICAgICAgICAgICAgW256U2hvd1RvZGF5XT1cImYuZGF0ZSEuc2hvd1RvZGF5XCJcbiAgICAgICAgICAgICAgW256RGlzYWJsZWREYXRlXT1cImYuZGF0ZSEuZGlzYWJsZWREYXRlXCJcbiAgICAgICAgICAgICAgW256RGlzYWJsZWRUaW1lXT1cImYuZGF0ZSEuZGlzYWJsZWRUaW1lXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RpbWUnXCIgY2xhc3M9XCJwLXNtIHN0X19maWx0ZXItdGltZVwiPiA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInY3VzdG9tJ1wiIGNsYXNzPVwic3RfX2ZpbHRlci1jdXN0b21cIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJmLmN1c3RvbSFcIlxuICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGYsIGNvbDogY29sLCBoYW5kbGU6IHRoaXMgfVwiXG4gICAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgKm5nU3dpdGNoRGVmYXVsdCBuei1tZW51PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImYubXVsdGlwbGVcIj5cbiAgICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGYubWVudXNcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgbnotY2hlY2tib3ggWyhuZ01vZGVsKV09XCJmaWx0ZXIuY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrYm94Q2hhbmdlKClcIj5cbiAgICAgICAgICAgICAgICAgIHt7IGZpbHRlci50ZXh0IH19XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFmLm11bHRpcGxlXCI+XG4gICAgICAgICAgICAgIDxsaSBuei1tZW51LWl0ZW0gKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmLm1lbnVzXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIG56LXJhZGlvIFtuZ01vZGVsXT1cImZpbHRlci5jaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwicmFkaW9DaGFuZ2UoZmlsdGVyKVwiPlxuICAgICAgICAgICAgICAgICAge3sgZmlsdGVyLnRleHQgfX1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJmLnNob3dPUEFyZWFcIiBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItZHJvcGRvd24tYnRuc1wiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1kcm9wZG93bi1saW5rIGNvbmZpcm1cIiAoY2xpY2spPVwiY29uZmlybSgpXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyBmLmNvbmZpcm1UZXh0IHx8IGxvY2FsZS5maWx0ZXJDb25maXJtIH19PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YSBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItZHJvcGRvd24tbGluayBjbGVhclwiIChjbGljayk9XCJyZXNldCgpXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyBmLmNsZWFyVGV4dCB8fCBsb2NhbGUuZmlsdGVyUmVzZXQgfX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWZpbHRlci10cmlnZ2VyLWNvbnRhaW5lcl0nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5zdF9fZmlsdGVyXSc6IGB0cnVlYCxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1maWx0ZXItdHJpZ2dlci1jb250YWluZXItb3Blbl0nOiBgdmlzaWJsZWBcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNURmlsdGVyQ29tcG9uZW50IHtcbiAgdmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjb2whOiBfU1RDb2x1bW47XG4gIEBJbnB1dCgpIGxvY2FsZTogTG9jYWxlRGF0YSA9IHt9O1xuICBASW5wdXQoKSBmITogU1RDb2x1bW5GaWx0ZXI7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuID0gbmV3IEV2ZW50RW1pdHRlcjx1bmtub3duPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaGFuZGxlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBnZXQgaWNvbigpOiBTVEljb24ge1xuICAgIHJldHVybiB0aGlzLmYuaWNvbiBhcyBTVEljb247XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgc3RvcFByb3BhZ2F0aW9uKCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGNoZWNrYm94Q2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMubi5lbWl0KHRoaXMuZi5tZW51cz8uZmlsdGVyKHcgPT4gdy5jaGVja2VkKSk7XG4gIH1cblxuICByYWRpb0NoYW5nZShpdGVtOiBTVENvbHVtbkZpbHRlck1lbnUpOiB2b2lkIHtcbiAgICB0aGlzLmYubWVudXMhLmZvckVhY2goaSA9PiAoaS5jaGVja2VkID0gZmFsc2UpKTtcbiAgICBpdGVtLmNoZWNrZWQgPSAhaXRlbS5jaGVja2VkO1xuICAgIHRoaXMubi5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgY2xvc2UocmVzdWx0PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkgdGhpcy5oYW5kbGUuZW1pdChyZXN1bHQpO1xuXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgY29uZmlybSgpOiB0aGlzIHtcbiAgICB0aGlzLmhhbmRsZS5lbWl0KHRydWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVzZXQoKTogdGhpcyB7XG4gICAgdGhpcy5oYW5kbGUuZW1pdChmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==