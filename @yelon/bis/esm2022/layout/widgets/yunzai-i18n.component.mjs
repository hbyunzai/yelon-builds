import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { InputBoolean } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/menu";
import * as i5 from "ng-zorro-antd/dropdown";
import * as i6 from "ng-zorro-antd/icon";
import * as i7 from "../yunzai-i18n.service";
export class YunzaiI18NComponent {
    get curLangCode() {
        return this.settings.layout.lang;
    }
    constructor(settings, i18n, doc) {
        this.settings = settings;
        this.i18n = i18n;
        this.doc = doc;
        /** Whether to display language text */
        this.showLangText = true;
        this.$destroy = new Subject();
        this.langs = [];
        this.i18n
            .getLangs()
            .pipe(takeUntil(this.$destroy))
            .subscribe(langs => {
            this.langs = langs;
        });
    }
    change(lang) {
        const spinEl = this.doc.createElement('div');
        spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
        spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
        this.doc.body.appendChild(spinEl);
        this.i18n.loadLangData(lang).subscribe(res => {
            this.i18n.use(lang, res);
            this.settings.setLayout('lang', lang);
            setTimeout(() => this.doc.location.reload());
        });
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NComponent, deps: [{ token: i1.SettingsService }, { token: YUNZAI_I18N_TOKEN }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiI18NComponent, selector: "yunzai-i18n", inputs: { showLangText: "showLangText" }, ngImport: i0, template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'lang.nav' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i
      *ngIf="!showLangText"
      nz-dropdown
      [nzDropdownMenu]="langMenu"
      nzPlacement="bottomRight"
      nz-icon
      nzType="global"
    ></i>
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          data-event-id="_nav_lang"
          [attr.data-text]="item.text"
          nz-menu-item
          *ngFor="let item of langs"
          [nzSelected]="item.code === curLangCode"
          (click)="change(item.code)"
        >
          <span *ngIf="!item.icon" role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          <img
            *ngIf="item.icon"
            style="margin-right:4px"
            width="50px"
            height="30px"
            [src]="'data:image/png;base64,' + item.icon"
            [alt]="item.abbr"
            class="pr-xs"
          />
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i4.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    InputBoolean()
], YunzaiI18NComponent.prototype, "showLangText", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-i18n',
                    template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'lang.nav' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i
      *ngIf="!showLangText"
      nz-dropdown
      [nzDropdownMenu]="langMenu"
      nzPlacement="bottomRight"
      nz-icon
      nzType="global"
    ></i>
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          data-event-id="_nav_lang"
          [attr.data-text]="item.text"
          nz-menu-item
          *ngFor="let item of langs"
          [nzSelected]="item.code === curLangCode"
          (click)="change(item.code)"
        >
          <span *ngIf="!item.icon" role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          <img
            *ngIf="item.icon"
            style="margin-right:4px"
            width="50px"
            height="30px"
            [src]="'data:image/png;base64,' + item.icon"
            [alt]="item.abbr"
            class="pr-xs"
          />
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.SettingsService }, { type: i7.YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { showLangText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWkxOG4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS1pMThuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQW1DLE1BQU0sY0FBYyxDQUFDO0FBQ2xGLE9BQU8sRUFBZ0IsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7OztBQStDbkUsTUFBTSxPQUFPLG1CQUFtQjtJQVE5QixJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFDVSxRQUF5QixFQUNFLElBQXVCLEVBQ2hDLEdBQVE7UUFGMUIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDRSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUNoQyxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBYnBDLHVDQUF1QztRQUNkLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLFVBQUssR0FBcUIsRUFBRSxDQUFDO1FBVzNCLElBQUksQ0FBQyxJQUFJO2FBQ04sUUFBUSxFQUFFO2FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFEQUFxRCxDQUFDLENBQUM7UUFDcEYsTUFBTSxDQUFDLFNBQVMsR0FBRyxrRkFBa0YsQ0FBQztRQUN0RyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzsrR0F4Q1UsbUJBQW1CLGlEQWNwQixpQkFBaUIsYUFDakIsUUFBUTttR0FmUCxtQkFBbUIsNkZBekNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7O0FBTXdCO0lBQWYsWUFBWSxFQUFFO3lEQUFxQjs0RkFIbEMsbUJBQW1CO2tCQTNDL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQWVJLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxRQUFROzRDQVpPLFlBQVk7c0JBQXBDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBZVU5aQUlfSTE4Tl9UT0tFTiwgU2V0dGluZ3NTZXJ2aWNlLCBZdW56YWlJMThOVHlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIElucHV0Qm9vbGVhbiB9IGZyb20gJ0B5ZWxvbi91dGlsL2RlY29yYXRvcic7XG5cbmltcG9ydCB7IFl1bnphaUkxOE5TZXJ2aWNlIH0gZnJvbSAnLi4veXVuemFpLWkxOG4uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS1pMThuJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd0xhbmdUZXh0XCIgbnotZHJvcGRvd24gW256RHJvcGRvd25NZW51XT1cImxhbmdNZW51XCIgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiPlxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJnbG9iYWxcIj48L2k+XG4gICAgICB7eyAnbGFuZy5uYXYnIHwgaTE4biB9fVxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9pPlxuICAgIDwvZGl2PlxuICAgIDxpXG4gICAgICAqbmdJZj1cIiFzaG93TGFuZ1RleHRcIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIFtuekRyb3Bkb3duTWVudV09XCJsYW5nTWVudVwiXG4gICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgIG56LWljb25cbiAgICAgIG56VHlwZT1cImdsb2JhbFwiXG4gICAgPjwvaT5cbiAgICA8bnotZHJvcGRvd24tbWVudSBkYXRhLWV2ZW50LWlkPVwiX25hdl9sYW5nXCIgI2xhbmdNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICA8bGlcbiAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9sYW5nXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLXRleHRdPVwiaXRlbS50ZXh0XCJcbiAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsYW5nc1wiXG4gICAgICAgICAgW256U2VsZWN0ZWRdPVwiaXRlbS5jb2RlID09PSBjdXJMYW5nQ29kZVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNoYW5nZShpdGVtLmNvZGUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWl0ZW0uaWNvblwiIHJvbGU9XCJpbWdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0udGV4dFwiIGNsYXNzPVwicHIteHNcIj57eyBpdGVtLmFiYnIgfX08L3NwYW4+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgKm5nSWY9XCJpdGVtLmljb25cIlxuICAgICAgICAgICAgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6NHB4XCJcbiAgICAgICAgICAgIHdpZHRoPVwiNTBweFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIzMHB4XCJcbiAgICAgICAgICAgIFtzcmNdPVwiJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgaXRlbS5pY29uXCJcbiAgICAgICAgICAgIFthbHRdPVwiaXRlbS5hYmJyXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHIteHNcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAge3sgaXRlbS50ZXh0IH19XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpSTE4TkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaG93TGFuZ1RleHQ6IEJvb2xlYW5JbnB1dDtcbiAgLyoqIFdoZXRoZXIgdG8gZGlzcGxheSBsYW5ndWFnZSB0ZXh0ICovXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBzaG93TGFuZ1RleHQgPSB0cnVlO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICBsYW5nczogWXVuemFpSTE4TlR5cGVbXSA9IFtdO1xuXG4gIGdldCBjdXJMYW5nQ29kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmxheW91dC5sYW5nO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIEBJbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pIHByaXZhdGUgaTE4bjogWXVuemFpSTE4TlNlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueVxuICApIHtcbiAgICB0aGlzLmkxOG5cbiAgICAgIC5nZXRMYW5ncygpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKGxhbmdzID0+IHtcbiAgICAgICAgdGhpcy5sYW5ncyA9IGxhbmdzO1xuICAgICAgfSk7XG4gIH1cblxuICBjaGFuZ2UobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3BpbkVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3BpbkVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgcGFnZS1sb2FkaW5nIGFudC1zcGluIGFudC1zcGluLWxnIGFudC1zcGluLXNwaW5uaW5nYCk7XG4gICAgc3BpbkVsLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImFudC1zcGluLWRvdCBhbnQtc3Bpbi1kb3Qtc3BpblwiPjxpPjwvaT48aT48L2k+PGk+PC9pPjxpPjwvaT48L3NwYW4+YDtcbiAgICB0aGlzLmRvYy5ib2R5LmFwcGVuZENoaWxkKHNwaW5FbCk7XG5cbiAgICB0aGlzLmkxOG4ubG9hZExhbmdEYXRhKGxhbmcpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pMThuLnVzZShsYW5nLCByZXMpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZXRMYXlvdXQoJ2xhbmcnLCBsYW5nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kb2MubG9jYXRpb24ucmVsb2FkKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=