import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { InputBoolean } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "ng-zorro-antd/dropdown";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/core/transition-patch";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "ng-zorro-antd/menu";
import * as i7 from "../yz.i18n.service";
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
YzHeaderI18NComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderI18NComponent, deps: [{ token: i1.SettingsService }, { token: YUNZAI_I18N_TOKEN }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
YzHeaderI18NComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: YzHeaderI18NComponent, selector: "yz-header-i18n", inputs: { showLangText: "showLangText" }, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i6.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }], pipes: { "i18n": i1.I18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], YzHeaderI18NComponent.prototype, "showLangText", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderI18NComponent, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: i1.SettingsService }, { type: i7.YzI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { showLangText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouaTE4bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXouaTE4bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLGNBQWMsQ0FBQztBQUNsRSxPQUFPLEVBQWdCLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7QUFvQ25FLE1BQU0sT0FBTyxxQkFBcUI7SUFhaEMsWUFDVSxRQUF5QixFQUNFLElBQW1CLEVBQzVCLEdBQVE7UUFGMUIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDRSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQzVCLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFkcEMsdUNBQXVDO1FBQ2QsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFjMUMsQ0FBQztJQVpKLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQVFELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFEQUFxRCxDQUFDLENBQUM7UUFDcEYsTUFBTSxDQUFDLFNBQVMsR0FBRyxrRkFBa0YsQ0FBQztRQUN0RyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztrSEE5QlUscUJBQXFCLGlEQWV0QixpQkFBaUIsYUFDakIsUUFBUTtzR0FoQlAscUJBQXFCLGdHQTlCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDtBQU13QjtJQUFmLFlBQVksRUFBRTsyREFBcUI7MkZBSGxDLHFCQUFxQjtrQkFoQ2pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFnQkksTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFFBQVE7NENBYk8sWUFBWTtzQkFBcEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWVVOWkFJX0kxOE5fVE9LRU4sIFNldHRpbmdzU2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIElucHV0Qm9vbGVhbiB9IGZyb20gJ0B5ZWxvbi91dGlsL2RlY29yYXRvcic7XG5cbmltcG9ydCB7IFl6STE4TlNlcnZpY2UgfSBmcm9tICcuLi95ei5pMThuLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5ei1oZWFkZXItaTE4bicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cInNob3dMYW5nVGV4dFwiIG56LWRyb3Bkb3duIFtuekRyb3Bkb3duTWVudV09XCJsYW5nTWVudVwiIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIj5cbiAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZ2xvYmFsXCI+PC9pPlxuICAgICAge3sgJ21lbnUubGFuZycgfCBpMThuIH19XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImRvd25cIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPGlcbiAgICAgICpuZ0lmPVwiIXNob3dMYW5nVGV4dFwiXG4gICAgICBuei1kcm9wZG93blxuICAgICAgW256RHJvcGRvd25NZW51XT1cImxhbmdNZW51XCJcbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgbnotaWNvblxuICAgICAgbnpUeXBlPVwiZ2xvYmFsXCJcbiAgICA+PC9pPlxuICAgIDxuei1kcm9wZG93bi1tZW51ICNsYW5nTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICA8dWwgbnotbWVudT5cbiAgICAgICAgPGxpXG4gICAgICAgICAgbnotbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbGFuZ3NcIlxuICAgICAgICAgIFtuelNlbGVjdGVkXT1cIml0ZW0uY29kZSA9PT0gY3VyTGFuZ0NvZGVcIlxuICAgICAgICAgIChjbGljayk9XCJjaGFuZ2UoaXRlbS5jb2RlKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiByb2xlPVwiaW1nXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtLnRleHRcIiBjbGFzcz1cInByLXhzXCI+e3sgaXRlbS5hYmJyIH19PC9zcGFuPlxuICAgICAgICAgIHt7IGl0ZW0udGV4dCB9fVxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl6SGVhZGVySTE4TkNvbXBvbmVudCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaG93TGFuZ1RleHQ6IEJvb2xlYW5JbnB1dDtcbiAgLyoqIFdoZXRoZXIgdG8gZGlzcGxheSBsYW5ndWFnZSB0ZXh0ICovXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBzaG93TGFuZ1RleHQgPSB0cnVlO1xuXG4gIGdldCBsYW5ncygpOiBBcnJheTx7IGNvZGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBhYmJyOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiB0aGlzLmkxOG4uZ2V0TGFuZ3MoKTtcbiAgfVxuXG4gIGdldCBjdXJMYW5nQ29kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmxheW91dC5sYW5nO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIEBJbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pIHByaXZhdGUgaTE4bjogWXpJMThOU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55XG4gICkge31cblxuICBjaGFuZ2UobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3BpbkVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3BpbkVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgcGFnZS1sb2FkaW5nIGFudC1zcGluIGFudC1zcGluLWxnIGFudC1zcGluLXNwaW5uaW5nYCk7XG4gICAgc3BpbkVsLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImFudC1zcGluLWRvdCBhbnQtc3Bpbi1kb3Qtc3BpblwiPjxpPjwvaT48aT48L2k+PGk+PC9pPjxpPjwvaT48L3NwYW4+YDtcbiAgICB0aGlzLmRvYy5ib2R5LmFwcGVuZENoaWxkKHNwaW5FbCk7XG5cbiAgICB0aGlzLmkxOG4ubG9hZExhbmdEYXRhKGxhbmcpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pMThuLnVzZShsYW5nLCByZXMpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZXRMYXlvdXQoJ2xhbmcnLCBsYW5nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kb2MubG9jYXRpb24ucmVsb2FkKCkpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=