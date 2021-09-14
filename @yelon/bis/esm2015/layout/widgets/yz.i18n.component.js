import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { YUNZAI_I18N_TOKEN, SettingsService } from '@yelon/theme';
import { InputBoolean } from '@yelon/util/decorator';
import { YzI18NService } from '../yz.i18n.service';
export class YzHeaderI18NComponent {
    constructor(settings, i18n, doc) {
        this.settings = settings;
        this.i18n = i18n;
        this.doc = doc;
        /** Whether to display language text */
        this.showLangText = true;
    }
    get langs() {
        return this.i18n.getLangs();
    }
    get curLangCode() {
        return this.settings.layout.lang;
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
}
YzHeaderI18NComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-i18n',
                template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'menu.lang' | i18n }}
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
    <nz-dropdown-menu #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          *ngFor="let item of langs"
          [nzSelected]="item.code === curLangCode"
          (click)="change(item.code)"
        >
          <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderI18NComponent.ctorParameters = () => [
    { type: SettingsService },
    { type: YzI18NService, decorators: [{ type: Inject, args: [YUNZAI_I18N_TOKEN,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
YzHeaderI18NComponent.propDecorators = {
    showLangText: [{ type: Input }]
};
__decorate([
    InputBoolean()
], YzHeaderI18NComponent.prototype, "showLangText", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouaTE4bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXouaTE4bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRSxPQUFPLEVBQWdCLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWtDbkQsTUFBTSxPQUFPLHFCQUFxQjtJQWFoQyxZQUNVLFFBQXlCLEVBQ0UsSUFBbUIsRUFDNUIsR0FBUTtRQUYxQixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUNFLFNBQUksR0FBSixJQUFJLENBQWU7UUFDNUIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQWRwQyx1Q0FBdUM7UUFDZCxpQkFBWSxHQUFHLElBQUksQ0FBQztJQWMxQyxDQUFDO0lBWkosSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBUUQsTUFBTSxDQUFDLElBQVk7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUscURBQXFELENBQUMsQ0FBQztRQUNwRixNQUFNLENBQUMsU0FBUyxHQUFHLGtGQUFrRixDQUFDO1FBQ3RHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQXBDMkIsZUFBZTtZQUdsQyxhQUFhLHVCQWlEakIsTUFBTSxTQUFDLGlCQUFpQjs0Q0FDeEIsTUFBTSxTQUFDLFFBQVE7OzsyQkFiakIsS0FBSzs7QUFBbUI7SUFBZixZQUFZLEVBQUU7MkRBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZVU5aQUlfSTE4Tl9UT0tFTiwgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgSW5wdXRCb29sZWFuIH0gZnJvbSAnQHllbG9uL3V0aWwvZGVjb3JhdG9yJztcblxuaW1wb3J0IHsgWXpJMThOU2VydmljZSB9IGZyb20gJy4uL3l6LmkxOG4uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l6LWhlYWRlci1pMThuJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd0xhbmdUZXh0XCIgbnotZHJvcGRvd24gW256RHJvcGRvd25NZW51XT1cImxhbmdNZW51XCIgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiPlxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJnbG9iYWxcIj48L2k+XG4gICAgICB7eyAnbWVudS5sYW5nJyB8IGkxOG4gfX1cbiAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZG93blwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8aVxuICAgICAgKm5nSWY9XCIhc2hvd0xhbmdUZXh0XCJcbiAgICAgIG56LWRyb3Bkb3duXG4gICAgICBbbnpEcm9wZG93bk1lbnVdPVwibGFuZ01lbnVcIlxuICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gICAgICBuei1pY29uXG4gICAgICBuelR5cGU9XCJnbG9iYWxcIlxuICAgID48L2k+XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgI2xhbmdNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICA8bGlcbiAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsYW5nc1wiXG4gICAgICAgICAgW256U2VsZWN0ZWRdPVwiaXRlbS5jb2RlID09PSBjdXJMYW5nQ29kZVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNoYW5nZShpdGVtLmNvZGUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIHJvbGU9XCJpbWdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0udGV4dFwiIGNsYXNzPVwicHIteHNcIj57eyBpdGVtLmFiYnIgfX08L3NwYW4+XG4gICAgICAgICAge3sgaXRlbS50ZXh0IH19XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXpIZWFkZXJJMThOQ29tcG9uZW50IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Nob3dMYW5nVGV4dDogQm9vbGVhbklucHV0O1xuICAvKiogV2hldGhlciB0byBkaXNwbGF5IGxhbmd1YWdlIHRleHQgKi9cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHNob3dMYW5nVGV4dCA9IHRydWU7XG5cbiAgZ2V0IGxhbmdzKCk6IEFycmF5PHsgY29kZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGFiYnI6IHN0cmluZyB9PiB7XG4gICAgcmV0dXJuIHRoaXMuaTE4bi5nZXRMYW5ncygpO1xuICB9XG5cbiAgZ2V0IGN1ckxhbmdDb2RlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubGF5b3V0Lmxhbmc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgQEluamVjdChZVU5aQUlfSTE4Tl9UT0tFTikgcHJpdmF0ZSBpMThuOiBZekkxOE5TZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnlcbiAgKSB7fVxuXG4gIGNoYW5nZShsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzcGluRWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcGluRWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBwYWdlLWxvYWRpbmcgYW50LXNwaW4gYW50LXNwaW4tbGcgYW50LXNwaW4tc3Bpbm5pbmdgKTtcbiAgICBzcGluRWwuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiYW50LXNwaW4tZG90IGFudC1zcGluLWRvdC1zcGluXCI+PGk+PC9pPjxpPjwvaT48aT48L2k+PGk+PC9pPjwvc3Bhbj5gO1xuICAgIHRoaXMuZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc3BpbkVsKTtcblxuICAgIHRoaXMuaTE4bi5sb2FkTGFuZ0RhdGEobGFuZykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmkxOG4udXNlKGxhbmcsIHJlcyk7XG4gICAgICB0aGlzLnNldHRpbmdzLnNldExheW91dCgnbGFuZycsIGxhbmcpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRvYy5sb2NhdGlvbi5yZWxvYWQoKSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==