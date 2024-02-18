import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/menu";
import * as i4 from "ng-zorro-antd/dropdown";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "../yunzai-i18n.service";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NComponent, deps: [{ token: i1.SettingsService }, { token: YUNZAI_I18N_TOKEN }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiI18NComponent, selector: "yunzai-i18n", inputs: { showLangText: "showLangText" }, ngImport: i0, template: `
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
            ngSrc="'data:image/png;base64,' + item.icon"
            [alt]="item.abbr"
            class="pr-xs"
          />
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgOptimizedImage, selector: "img[ngSrc]", inputs: ["ngSrc", "ngSrcset", "sizes", "width", "height", "loading", "priority", "loaderParams", "disableOptimizedSrcset", "fill", "placeholder", "placeholderConfig", "src", "srcset"] }, { kind: "directive", type: i3.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i3.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i4.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i4.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NComponent, decorators: [{
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
            ngSrc="'data:image/png;base64,' + item.icon"
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
        }], ctorParameters: () => [{ type: i1.SettingsService }, { type: i6.YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }], propDecorators: { showLangText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWkxOG4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS1pMThuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBbUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7O0FBaURsRixNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUNVLFFBQXlCLEVBQ0UsSUFBdUIsRUFDaEMsR0FBYztRQUZoQyxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUNFLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2hDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFiMUMsdUNBQXVDO1FBQzlCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzlCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLFVBQUssR0FBcUIsRUFBRSxDQUFDO1FBVzNCLElBQUksQ0FBQyxJQUFJO2FBQ04sUUFBUSxFQUFFO2FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFEQUFxRCxDQUFDLENBQUM7UUFDcEYsTUFBTSxDQUFDLFNBQVMsR0FBRyxrRkFBa0YsQ0FBQztRQUN0RyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs4R0F4Q1UsbUJBQW1CLGlEQWNwQixpQkFBaUIsYUFDakIsUUFBUTtrR0FmUCxtQkFBbUIsNkZBekNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7OzJGQUdVLG1CQUFtQjtrQkEzQy9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFlSSxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTt5Q0FaVCxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWVVOWkFJX0kxOE5fVE9LRU4sIFNldHRpbmdzU2VydmljZSwgWXVuemFpSTE4TlR5cGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQHllbG9uL3V0aWwvZGVjb3JhdG9yJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFl1bnphaUkxOE5TZXJ2aWNlIH0gZnJvbSAnLi4veXVuemFpLWkxOG4uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS1pMThuJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd0xhbmdUZXh0XCIgbnotZHJvcGRvd24gW256RHJvcGRvd25NZW51XT1cImxhbmdNZW51XCIgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiPlxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJnbG9iYWxcIj48L2k+XG4gICAgICB7eyAnbGFuZy5uYXYnIHwgaTE4biB9fVxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9pPlxuICAgIDwvZGl2PlxuICAgIDxpXG4gICAgICAqbmdJZj1cIiFzaG93TGFuZ1RleHRcIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIFtuekRyb3Bkb3duTWVudV09XCJsYW5nTWVudVwiXG4gICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgIG56LWljb25cbiAgICAgIG56VHlwZT1cImdsb2JhbFwiXG4gICAgPjwvaT5cbiAgICA8bnotZHJvcGRvd24tbWVudSBkYXRhLWV2ZW50LWlkPVwiX25hdl9sYW5nXCIgI2xhbmdNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICA8bGlcbiAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9sYW5nXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLXRleHRdPVwiaXRlbS50ZXh0XCJcbiAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsYW5nc1wiXG4gICAgICAgICAgW256U2VsZWN0ZWRdPVwiaXRlbS5jb2RlID09PSBjdXJMYW5nQ29kZVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNoYW5nZShpdGVtLmNvZGUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWl0ZW0uaWNvblwiIHJvbGU9XCJpbWdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0udGV4dFwiIGNsYXNzPVwicHIteHNcIj57eyBpdGVtLmFiYnIgfX08L3NwYW4+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgKm5nSWY9XCJpdGVtLmljb25cIlxuICAgICAgICAgICAgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6NHB4XCJcbiAgICAgICAgICAgIHdpZHRoPVwiNTBweFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIzMHB4XCJcbiAgICAgICAgICAgIG5nU3JjPVwiJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgaXRlbS5pY29uXCJcbiAgICAgICAgICAgIFthbHRdPVwiaXRlbS5hYmJyXCJcbiAgICAgICAgICAgIGNsYXNzPVwicHIteHNcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAge3sgaXRlbS50ZXh0IH19XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpSTE4TkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaG93TGFuZ1RleHQ6IEJvb2xlYW5JbnB1dDtcbiAgLyoqIFdoZXRoZXIgdG8gZGlzcGxheSBsYW5ndWFnZSB0ZXh0ICovXG4gIEBJbnB1dCgpIHNob3dMYW5nVGV4dDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGxhbmdzOiBZdW56YWlJMThOVHlwZVtdID0gW107XG5cbiAgZ2V0IGN1ckxhbmdDb2RlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubGF5b3V0Lmxhbmc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgQEluamVjdChZVU5aQUlfSTE4Tl9UT0tFTikgcHJpdmF0ZSBpMThuOiBZdW56YWlJMThOU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogTnpTYWZlQW55XG4gICkge1xuICAgIHRoaXMuaTE4blxuICAgICAgLmdldExhbmdzKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUobGFuZ3MgPT4ge1xuICAgICAgICB0aGlzLmxhbmdzID0gbGFuZ3M7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZShsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzcGluRWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcGluRWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBwYWdlLWxvYWRpbmcgYW50LXNwaW4gYW50LXNwaW4tbGcgYW50LXNwaW4tc3Bpbm5pbmdgKTtcbiAgICBzcGluRWwuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiYW50LXNwaW4tZG90IGFudC1zcGluLWRvdC1zcGluXCI+PGk+PC9pPjxpPjwvaT48aT48L2k+PGk+PC9pPjwvc3Bhbj5gO1xuICAgIHRoaXMuZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc3BpbkVsKTtcblxuICAgIHRoaXMuaTE4bi5sb2FkTGFuZ0RhdGEobGFuZykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmkxOG4udXNlKGxhbmcsIHJlcyk7XG4gICAgICB0aGlzLnNldHRpbmdzLnNldExheW91dCgnbGFuZycsIGxhbmcpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRvYy5sb2NhdGlvbi5yZWxvYWQoKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLiRkZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==