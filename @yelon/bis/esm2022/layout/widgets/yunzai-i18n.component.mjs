import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { InputBoolean } from '@yelon/util/decorator';
import { Subject, takeUntil } from "rxjs";
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i4.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWkxOG4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS1pMThuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsaUJBQWlCLEVBQWtDLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE9BQU8sRUFBZSxZQUFZLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRSxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7O0FBNkN4QyxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUNVLFFBQXlCLEVBQ0UsSUFBdUIsRUFDaEMsR0FBUTtRQUYxQixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUNFLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2hDLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFicEMsdUNBQXVDO1FBQ2QsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDckMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7UUFFaEMsVUFBSyxHQUFxQixFQUFFLENBQUM7UUFXM0IsSUFBSSxDQUFDLElBQUk7YUFDTixRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUscURBQXFELENBQUMsQ0FBQztRQUNwRixNQUFNLENBQUMsU0FBUyxHQUFHLGtGQUFrRixDQUFDO1FBQ3RHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMxQixDQUFDOytHQXhDVSxtQkFBbUIsaURBY3BCLGlCQUFpQixhQUNqQixRQUFRO21HQWZQLG1CQUFtQiw2RkF6Q3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDs7QUFNd0I7SUFBZixZQUFZLEVBQUU7eURBQXFCOzRGQUhsQyxtQkFBbUI7a0JBM0MvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBZUksTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFFBQVE7NENBWk8sWUFBWTtzQkFBcEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7WVVOWkFJX0kxOE5fVE9LRU4sIFNldHRpbmdzU2VydmljZSwgWXVuemFpSTE4TlR5cGV9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1l1bnphaUkxOE5TZXJ2aWNlfSBmcm9tIFwiLi4veXVuemFpLWkxOG4uc2VydmljZVwiXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgSW5wdXRCb29sZWFufSBmcm9tICdAeWVsb24vdXRpbC9kZWNvcmF0b3InO1xuXG5pbXBvcnQge1N1YmplY3QsIHRha2VVbnRpbH0gZnJvbSBcInJ4anNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXVuemFpLWkxOG4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJzaG93TGFuZ1RleHRcIiBuei1kcm9wZG93biBbbnpEcm9wZG93bk1lbnVdPVwibGFuZ01lbnVcIiBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCI+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImdsb2JhbFwiPjwvaT5cbiAgICAgIHt7ICdsYW5nLm5hdicgfCBpMThuIH19XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImRvd25cIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPGlcbiAgICAgICpuZ0lmPVwiIXNob3dMYW5nVGV4dFwiXG4gICAgICBuei1kcm9wZG93blxuICAgICAgW256RHJvcGRvd25NZW51XT1cImxhbmdNZW51XCJcbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgbnotaWNvblxuICAgICAgbnpUeXBlPVwiZ2xvYmFsXCJcbiAgICA+PC9pPlxuICAgIDxuei1kcm9wZG93bi1tZW51IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2xhbmdcIiAjbGFuZ01lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgPHVsIG56LW1lbnU+XG4gICAgICAgIDxsaVxuICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2xhbmdcIlxuICAgICAgICAgIFthdHRyLmRhdGEtdGV4dF09XCJpdGVtLnRleHRcIlxuICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxhbmdzXCJcbiAgICAgICAgICBbbnpTZWxlY3RlZF09XCJpdGVtLmNvZGUgPT09IGN1ckxhbmdDb2RlXCJcbiAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlKGl0ZW0uY29kZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbS5pY29uXCIgcm9sZT1cImltZ1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiaXRlbS50ZXh0XCIgY2xhc3M9XCJwci14c1wiPnt7IGl0ZW0uYWJiciB9fTwvc3Bhbj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAqbmdJZj1cIml0ZW0uaWNvblwiXG4gICAgICAgICAgICBzdHlsZT1cIm1hcmdpbi1yaWdodDo0cHhcIlxuICAgICAgICAgICAgd2lkdGg9XCI1MHB4XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjMwcHhcIlxuICAgICAgICAgICAgW3NyY109XCInZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBpdGVtLmljb25cIlxuICAgICAgICAgICAgW2FsdF09XCJpdGVtLmFiYnJcIlxuICAgICAgICAgICAgY2xhc3M9XCJwci14c1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICB7eyBpdGVtLnRleHQgfX1cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9uei1kcm9wZG93bi1tZW51PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlJMThOQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95e1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd0xhbmdUZXh0OiBCb29sZWFuSW5wdXQ7XG4gIC8qKiBXaGV0aGVyIHRvIGRpc3BsYXkgbGFuZ3VhZ2UgdGV4dCAqL1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgc2hvd0xhbmdUZXh0ID0gdHJ1ZTtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KClcblxuICBsYW5nczogWXVuemFpSTE4TlR5cGVbXSA9IFtdO1xuXG4gIGdldCBjdXJMYW5nQ29kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmxheW91dC5sYW5nO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIEBJbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pIHByaXZhdGUgaTE4bjogWXVuemFpSTE4TlNlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueVxuICApIHtcbiAgICB0aGlzLmkxOG5cbiAgICAgIC5nZXRMYW5ncygpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKGxhbmdzID0+IHtcbiAgICAgICAgdGhpcy5sYW5ncyA9IGxhbmdzO1xuICAgICAgfSk7XG4gIH1cblxuICBjaGFuZ2UobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3BpbkVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3BpbkVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgcGFnZS1sb2FkaW5nIGFudC1zcGluIGFudC1zcGluLWxnIGFudC1zcGluLXNwaW5uaW5nYCk7XG4gICAgc3BpbkVsLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImFudC1zcGluLWRvdCBhbnQtc3Bpbi1kb3Qtc3BpblwiPjxpPjwvaT48aT48L2k+PGk+PC9pPjxpPjwvaT48L3NwYW4+YDtcbiAgICB0aGlzLmRvYy5ib2R5LmFwcGVuZENoaWxkKHNwaW5FbCk7XG5cbiAgICB0aGlzLmkxOG4ubG9hZExhbmdEYXRhKGxhbmcpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pMThuLnVzZShsYW5nLCByZXMpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZXRMYXlvdXQoJ2xhbmcnLCBsYW5nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kb2MubG9jYXRpb24ucmVsb2FkKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpXG4gIH1cblxufVxuIl19