import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { _HttpClient, I18nPipe } from '@yelon/theme';
import { useLocalStorageHeader, WINDOW } from '@yelon/util';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
import * as i2 from "ng-zorro-antd/menu";
import * as i3 from "ng-zorro-antd/dropdown";
import * as i4 from "ng-zorro-antd/tabs";
export class YunzaiLayoutNavGroupComponent {
    constructor() {
        this.http = inject(_HttpClient);
        this.destroy$ = new Subject();
        this.win = inject(WINDOW);
        this.state = {
            topics: []
        };
    }
    ngOnInit() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topics = getTopics() || [];
    }
    open(topic) {
        if (topic.key) {
            this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.win.location.href = topic.url;
                break;
            case 'blank':
                this.win.location.href = topic.url;
                break;
            case 'target':
                this.win.location.href = topic.url;
                break;
            default:
                this.win.location.href = topic.url;
                break;
        }
    }
    ngOnDestroy() {
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutNavGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiLayoutNavGroupComponent, isStandalone: true, selector: "yunzai-layout-nav-group", ngImport: i0, template: `
    <div class="yz-application-group">
      <nz-tabset>
        @for (menu of state.topics; track menu) {
          <nz-tab [nzTitle]="groupTitleTpl">
            <ng-template #groupTitleTpl>
              <a
                data-event-id="_nav_topic"
                [attr.data-name]="menu.name | i18n"
                nz-dropdown
                [nzDropdownMenu]="menuTpl"
                [nzTrigger]="'click'"
                [nzOverlayClassName]="'yz-application-dropdown'"
              >
                @if (menu.icon) {
                  <i nz-icon [nzType]="menu.icon" nzTheme="outline"></i>
                }
                {{ menu.name | i18n }}
                @if (menu.children && menu.children.length > 0) {
                  <i nz-icon nzType="down" nzTheme="outline"></i>
                }
              </a>
              <nz-dropdown-menu #menuTpl="nzDropdownMenu">
                @if (menu.children && menu.children.length > 0) {
                  <ul nz-menu nzSelectable>
                    @for (item of menu.children; track item) {
                      <ng-container>
                        <li
                          data-event-id="_nav_item"
                          [attr.data-name]="item.name | i18n"
                          nz-menu-item
                          (click)="open(item)"
                        >
                          @if (item.icon) {
                            <i nz-icon [nzType]="item.icon" nzTheme="outline"></i>
                          }
                        {{ item.name | i18n }}
                        </li>
                      </ng-container>
                    }
                  </ul>
                }
              </nz-dropdown-menu>
            </ng-template>
          </nz-tab>
        }
      </nz-tabset>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i2.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i3.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i3.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i3.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzTabsModule }, { kind: "component", type: i4.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { kind: "component", type: i4.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutNavGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-layout-nav-group`,
                    template: `
    <div class="yz-application-group">
      <nz-tabset>
        @for (menu of state.topics; track menu) {
          <nz-tab [nzTitle]="groupTitleTpl">
            <ng-template #groupTitleTpl>
              <a
                data-event-id="_nav_topic"
                [attr.data-name]="menu.name | i18n"
                nz-dropdown
                [nzDropdownMenu]="menuTpl"
                [nzTrigger]="'click'"
                [nzOverlayClassName]="'yz-application-dropdown'"
              >
                @if (menu.icon) {
                  <i nz-icon [nzType]="menu.icon" nzTheme="outline"></i>
                }
                {{ menu.name | i18n }}
                @if (menu.children && menu.children.length > 0) {
                  <i nz-icon nzType="down" nzTheme="outline"></i>
                }
              </a>
              <nz-dropdown-menu #menuTpl="nzDropdownMenu">
                @if (menu.children && menu.children.length > 0) {
                  <ul nz-menu nzSelectable>
                    @for (item of menu.children; track item) {
                      <ng-container>
                        <li
                          data-event-id="_nav_item"
                          [attr.data-name]="item.name | i18n"
                          nz-menu-item
                          (click)="open(item)"
                        >
                          @if (item.icon) {
                            <i nz-icon [nzType]="item.icon" nzTheme="outline"></i>
                          }
                        {{ item.name | i18n }}
                        </li>
                      </ng-container>
                    }
                  </ul>
                }
              </nz-dropdown-menu>
            </ng-template>
          </nz-tab>
        }
      </nz-tabset>
    </div>
  `,
                    standalone: true,
                    imports: [NzIconModule, NzDropDownModule, I18nPipe, NzTabsModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQXVCLHFCQUFxQixFQUFFLE1BQU0sRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFDakcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBd0RsRCxNQUFNLE9BQU8sNkJBQTZCO0lBdEQxQztRQXVEbUIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoQixRQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLFVBQUssR0FBd0I7WUFDM0IsTUFBTSxFQUFFLEVBQUU7U0FDWCxDQUFDO0tBb0NIO0lBbENDLFFBQVE7UUFDTixNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQXFCO1FBQ3hCLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUk7aUJBQ04sSUFBSSxDQUFDLDRCQUE0QixFQUFFO2dCQUNsQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUc7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRTthQUN2QixDQUFDO2lCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQ0QsUUFBUSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLE1BQU07UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OEdBekNVLDZCQUE2QjtrR0FBN0IsNkJBQTZCLG1GQXBEOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdEVCwyREFFUyxZQUFZLGlOQUFFLGdCQUFnQix1N0JBQUUsUUFBUSw0Q0FBRSxZQUFZOzsyRkFFckQsNkJBQTZCO2tCQXREekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdEVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7aUJBQ2xFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBpbmplY3QsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQsIEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IExheW91dE5hdkdyb3VwU3RhdGUsIHVzZUxvY2FsU3RvcmFnZUhlYWRlciwgV0lORE9XLCBZdW56YWlOYXZUb3BpYyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelRhYnNNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RhYnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktbGF5b3V0LW5hdi1ncm91cGAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWdyb3VwXCI+XG4gICAgICA8bnotdGFic2V0PlxuICAgICAgICBAZm9yIChtZW51IG9mIHN0YXRlLnRvcGljczsgdHJhY2sgbWVudSkge1xuICAgICAgICAgIDxuei10YWIgW256VGl0bGVdPVwiZ3JvdXBUaXRsZVRwbFwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNncm91cFRpdGxlVHBsPlxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3RvcGljXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibWVudS5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwibWVudVRwbFwiXG4gICAgICAgICAgICAgICAgW256VHJpZ2dlcl09XCInY2xpY2snXCJcbiAgICAgICAgICAgICAgICBbbnpPdmVybGF5Q2xhc3NOYW1lXT1cIid5ei1hcHBsaWNhdGlvbi1kcm9wZG93bidcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQGlmIChtZW51Lmljb24pIHtcbiAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJtZW51Lmljb25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge3sgbWVudS5uYW1lIHwgaTE4biB9fVxuICAgICAgICAgICAgICAgIEBpZiAobWVudS5jaGlsZHJlbiAmJiBtZW51LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZG93blwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjbWVudVRwbD1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgICAgICAgQGlmIChtZW51LmNoaWxkcmVuICYmIG1lbnUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgPHVsIG56LW1lbnUgbnpTZWxlY3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICBAZm9yIChpdGVtIG9mIG1lbnUuY2hpbGRyZW47IHRyYWNrIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2l0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwiaXRlbS5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbihpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEBpZiAoaXRlbS5pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIml0ZW0uaWNvblwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLm5hbWUgfCBpMThuIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L256LXRhYj5cbiAgICAgICAgfVxuICAgICAgPC9uei10YWJzZXQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOekljb25Nb2R1bGUsIE56RHJvcERvd25Nb2R1bGUsIEkxOG5QaXBlLCBOelRhYnNNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dE5hdkdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGh0dHAgPSBpbmplY3QoX0h0dHBDbGllbnQpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW4gPSBpbmplY3QoV0lORE9XKTtcbiAgc3RhdGU6IExheW91dE5hdkdyb3VwU3RhdGUgPSB7XG4gICAgdG9waWNzOiBbXVxuICB9O1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLnRvcGljcyA9IGdldFRvcGljcygpIHx8IFtdO1xuICB9XG5cbiAgb3Blbih0b3BpYzogWXVuemFpTmF2VG9waWMpOiB2b2lkIHtcbiAgICBpZiAodG9waWMua2V5KSB7XG4gICAgICB0aGlzLmh0dHBcbiAgICAgICAgLnBvc3QoYC9hcHAtbWFuYWdlci93ZWItc2Nhbi9zYXZlYCwge1xuICAgICAgICAgIGFwcElkOiB0b3BpYy5rZXksXG4gICAgICAgICAgY3JlYXRlRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgc3dpdGNoICh0b3BpYy50YXJnZXQpIHtcbiAgICAgIGNhc2UgJ2hyZWYnOlxuICAgICAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JsYW5rJzpcbiAgICAgICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YXJnZXQnOlxuICAgICAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19