import { CommonModule, DOCUMENT } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { I18nPipe, SettingsService, YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/menu";
import * as i2 from "ng-zorro-antd/dropdown";
import * as i3 from "ng-zorro-antd/icon";
export class YunzaiHeaderI18nComponent {
    constructor() {
        this.settings = inject(SettingsService);
        this.i18n = inject(YUNZAI_I18N_TOKEN);
        this.doc = inject(DOCUMENT);
        this.langs = [];
        this.destroy$ = new Subject();
        /** Whether to display language text */
        this.showLangText = true;
    }
    get curLangCode() {
        return this.settings.layout.lang;
    }
    ngOnInit() {
        this.i18n
            .getLangs()
            .pipe(takeUntil(this.destroy$))
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
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiHeaderI18nComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.5", type: YunzaiHeaderI18nComponent, isStandalone: true, selector: "yunzai-header-i18n", inputs: { showLangText: ["showLangText", "showLangText", booleanAttribute] }, host: { properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    @if (showLangText) {
      <div nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
        <i nz-icon nzType="global"></i>
        {{ 'lang.nav' | i18n }}
        <i nz-icon nzType="down"></i>
      </div>
    } @else {
      <i nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight" nz-icon nzType="global"></i>
    }
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        @for (item of langs; track item) {
          <li
            data-event-id="_nav_lang"
            [attr.data-text]="item.text"
            nz-menu-item
            [nzSelected]="item.code === curLangCode"
            (click)="change(item.code)"
          >
            @if (!item.icon) {
              <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
            } @else {
              <img
                style="margin-right:4px"
                width="50px"
                height="30px"
                [src]="'data:image/png;base64,' + item.icon"
                [alt]="item.abbr"
                class="pr-xs"
              />
            }
            {{ item.text }}
          </li>
        }
      </ul>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiHeaderI18nComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-header-i18n`,
                    template: `
    @if (showLangText) {
      <div nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
        <i nz-icon nzType="global"></i>
        {{ 'lang.nav' | i18n }}
        <i nz-icon nzType="down"></i>
      </div>
    } @else {
      <i nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight" nz-icon nzType="global"></i>
    }
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        @for (item of langs; track item) {
          <li
            data-event-id="_nav_lang"
            [attr.data-text]="item.text"
            nz-menu-item
            [nzSelected]="item.code === curLangCode"
            (click)="change(item.code)"
          >
            @if (!item.icon) {
              <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
            } @else {
              <img
                style="margin-right:4px"
                width="50px"
                height="30px"
                [src]="'data:image/png;base64,' + item.icon"
                [alt]="item.abbr"
                class="pr-xs"
              />
            }
            {{ item.text }}
          </li>
        }
      </ul>
    </nz-dropdown-menu>
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NzDropDownModule, NzIconModule, I18nPipe, CommonModule]
                }]
        }], propDecorators: { showLangText: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWkxOG4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3l1bnphaS13aWRnZXRzL3l1bnphaS1pMThuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQXlDLE1BQU0sY0FBYyxDQUFDO0FBRW5ILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFpRGxELE1BQU0sT0FBTyx5QkFBeUI7SUEvQ3RDO1FBZ0RtQixhQUFRLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25DLFNBQUksR0FBRyxNQUFNLENBQXdCLGlCQUFpQixDQUFDLENBQUM7UUFDeEQsUUFBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFDaEUsdUNBQXVDO1FBQ0MsaUJBQVksR0FBRyxJQUFJLENBQUM7S0E2QjdEO0lBM0JDLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUk7YUFDTixRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUscURBQXFELENBQUMsQ0FBQztRQUNwRixNQUFNLENBQUMsU0FBUyxHQUFHLGtGQUFrRixDQUFDO1FBQ3RHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzhHQW5DVSx5QkFBeUI7a0dBQXpCLHlCQUF5QiwrR0FPaEIsZ0JBQWdCLCtFQXBEMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ1QsMkRBTVMsZ0JBQWdCLHkyQkFBRSxZQUFZLDZNQUFFLFFBQVEsNENBQUUsWUFBWTs7MkZBRXJELHlCQUF5QjtrQkEvQ3JDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNUO29CQUNELElBQUksRUFBRTt3QkFDSixnQkFBZ0IsRUFBRSxNQUFNO3FCQUN6QjtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO2lCQUNsRTs4QkFReUMsWUFBWTtzQkFBbkQsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgYm9vbGVhbkF0dHJpYnV0ZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgaW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJMThuUGlwZSwgU2V0dGluZ3NTZXJ2aWNlLCBZVU5aQUlfSTE4Tl9UT0tFTiwgWXVuemFpSHR0cEkxOE5TZXJ2aWNlLCBZdW56YWlJMThOVHlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWhlYWRlci1pMThuYCxcbiAgdGVtcGxhdGU6IGBcbiAgICBAaWYgKHNob3dMYW5nVGV4dCkge1xuICAgICAgPGRpdiBuei1kcm9wZG93biBbbnpEcm9wZG93bk1lbnVdPVwibGFuZ01lbnVcIiBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCI+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZ2xvYmFsXCI+PC9pPlxuICAgICAgICB7eyAnbGFuZy5uYXYnIHwgaTE4biB9fVxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImRvd25cIj48L2k+XG4gICAgICA8L2Rpdj5cbiAgICB9IEBlbHNlIHtcbiAgICAgIDxpIG56LWRyb3Bkb3duIFtuekRyb3Bkb3duTWVudV09XCJsYW5nTWVudVwiIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIiBuei1pY29uIG56VHlwZT1cImdsb2JhbFwiPjwvaT5cbiAgICB9XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgZGF0YS1ldmVudC1pZD1cIl9uYXZfbGFuZ1wiICNsYW5nTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICA8dWwgbnotbWVudT5cbiAgICAgICAgQGZvciAoaXRlbSBvZiBsYW5nczsgdHJhY2sgaXRlbSkge1xuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfbGFuZ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXRleHRdPVwiaXRlbS50ZXh0XCJcbiAgICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICAgW256U2VsZWN0ZWRdPVwiaXRlbS5jb2RlID09PSBjdXJMYW5nQ29kZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlKGl0ZW0uY29kZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEBpZiAoIWl0ZW0uaWNvbikge1xuICAgICAgICAgICAgICA8c3BhbiByb2xlPVwiaW1nXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtLnRleHRcIiBjbGFzcz1cInByLXhzXCI+e3sgaXRlbS5hYmJyIH19PC9zcGFuPlxuICAgICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBzdHlsZT1cIm1hcmdpbi1yaWdodDo0cHhcIlxuICAgICAgICAgICAgICAgIHdpZHRoPVwiNTBweFwiXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMzBweFwiXG4gICAgICAgICAgICAgICAgW3NyY109XCInZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBpdGVtLmljb25cIlxuICAgICAgICAgICAgICAgIFthbHRdPVwiaXRlbS5hYmJyXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInByLXhzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHt7IGl0ZW0udGV4dCB9fVxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgPC9uei1kcm9wZG93bi1tZW51PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5mbGV4LTFdJzogJ3RydWUnXG4gIH0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbXBvcnRzOiBbTnpEcm9wRG93bk1vZHVsZSwgTnpJY29uTW9kdWxlLCBJMThuUGlwZSwgQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlIZWFkZXJJMThuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IHNldHRpbmdzID0gaW5qZWN0KFNldHRpbmdzU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4biA9IGluamVjdDxZdW56YWlIdHRwSTE4TlNlcnZpY2U+KFlVTlpBSV9JMThOX1RPS0VOKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2MgPSBpbmplY3QoRE9DVU1FTlQpO1xuICBsYW5nczogWXVuemFpSTE4TlR5cGVbXSA9IFtdO1xuICBwcml2YXRlIGRlc3Ryb3kkOiBTdWJqZWN0PE56U2FmZUFueT4gPSBuZXcgU3ViamVjdDxOelNhZmVBbnk+KCk7XG4gIC8qKiBXaGV0aGVyIHRvIGRpc3BsYXkgbGFuZ3VhZ2UgdGV4dCAqL1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0xhbmdUZXh0ID0gdHJ1ZTtcblxuICBnZXQgY3VyTGFuZ0NvZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5sYXlvdXQubGFuZztcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG5cbiAgICAgIC5nZXRMYW5ncygpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKGxhbmdzID0+IHtcbiAgICAgICAgdGhpcy5sYW5ncyA9IGxhbmdzO1xuICAgICAgfSk7XG4gIH1cblxuICBjaGFuZ2UobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3BpbkVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3BpbkVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgcGFnZS1sb2FkaW5nIGFudC1zcGluIGFudC1zcGluLWxnIGFudC1zcGluLXNwaW5uaW5nYCk7XG4gICAgc3BpbkVsLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImFudC1zcGluLWRvdCBhbnQtc3Bpbi1kb3Qtc3BpblwiPjxpPjwvaT48aT48L2k+PGk+PC9pPjxpPjwvaT48L3NwYW4+YDtcbiAgICB0aGlzLmRvYy5ib2R5LmFwcGVuZENoaWxkKHNwaW5FbCk7XG5cbiAgICB0aGlzLmkxOG4ubG9hZExhbmdEYXRhKGxhbmcpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pMThuLnVzZShsYW5nLCByZXMpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZXRMYXlvdXQoJ2xhbmcnLCBsYW5nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kb2MubG9jYXRpb24ucmVsb2FkKCkpO1xuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19