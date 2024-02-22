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
                            <i nz-icon [nzType]="item.icon" nzTheme="outline"></i>{{ item.name | i18n }}
                          }
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
                            <i nz-icon [nzType]="item.icon" nzTheme="outline"></i>{{ item.name | i18n }}
                          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQXVCLHFCQUFxQixFQUFFLE1BQU0sRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFDakcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBdURsRCxNQUFNLE9BQU8sNkJBQTZCO0lBckQxQztRQXNEbUIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoQixRQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLFVBQUssR0FBd0I7WUFDM0IsTUFBTSxFQUFFLEVBQUU7U0FDWCxDQUFDO0tBb0NIO0lBbENDLFFBQVE7UUFDTixNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQXFCO1FBQ3hCLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUk7aUJBQ04sSUFBSSxDQUFDLDRCQUE0QixFQUFFO2dCQUNsQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUc7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRTthQUN2QixDQUFDO2lCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQ0QsUUFBUSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLE1BQU07UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OEdBekNVLDZCQUE2QjtrR0FBN0IsNkJBQTZCLG1GQW5EOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0NULDJEQUVTLFlBQVksaU5BQUUsZ0JBQWdCLHU3QkFBRSxRQUFRLDRDQUFFLFlBQVk7OzJGQUVyRCw2QkFBNkI7a0JBckR6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ1Q7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO2lCQUNsRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgaW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50LCBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBMYXlvdXROYXZHcm91cFN0YXRlLCB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsIFdJTkRPVywgWXVuemFpTmF2VG9waWMgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpUYWJzTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90YWJzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWxheW91dC1uYXYtZ3JvdXBgLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1ncm91cFwiPlxuICAgICAgPG56LXRhYnNldD5cbiAgICAgICAgQGZvciAobWVudSBvZiBzdGF0ZS50b3BpY3M7IHRyYWNrIG1lbnUpIHtcbiAgICAgICAgICA8bnotdGFiIFtuelRpdGxlXT1cImdyb3VwVGl0bGVUcGxcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBUaXRsZVRwbD5cbiAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm1lbnUubmFtZSB8IGkxOG5cIlxuICAgICAgICAgICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgICAgICAgICAgW256RHJvcGRvd25NZW51XT1cIm1lbnVUcGxcIlxuICAgICAgICAgICAgICAgIFtuelRyaWdnZXJdPVwiJ2NsaWNrJ1wiXG4gICAgICAgICAgICAgICAgW256T3ZlcmxheUNsYXNzTmFtZV09XCIneXotYXBwbGljYXRpb24tZHJvcGRvd24nXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEBpZiAobWVudS5pY29uKSB7XG4gICAgICAgICAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwibWVudS5pY29uXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt7IG1lbnUubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgICAgICAgICBAaWYgKG1lbnUuY2hpbGRyZW4gJiYgbWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImRvd25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI21lbnVUcGw9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgICAgICAgIEBpZiAobWVudS5jaGlsZHJlbiAmJiBtZW51LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIDx1bCBuei1tZW51IG56U2VsZWN0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgQGZvciAoaXRlbSBvZiBtZW51LmNoaWxkcmVuOyB0cmFjayBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIml0ZW0ubmFtZSB8IGkxOG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW4oaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBAaWYgKGl0ZW0uaWNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpdGVtLmljb25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT57eyBpdGVtLm5hbWUgfCBpMThuIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvbnotdGFiPlxuICAgICAgICB9XG4gICAgICA8L256LXRhYnNldD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW056SWNvbk1vZHVsZSwgTnpEcm9wRG93bk1vZHVsZSwgSTE4blBpcGUsIE56VGFic01vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTGF5b3V0TmF2R3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaHR0cCA9IGluamVjdChfSHR0cENsaWVudCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbiA9IGluamVjdChXSU5ET1cpO1xuICBzdGF0ZTogTGF5b3V0TmF2R3JvdXBTdGF0ZSA9IHtcbiAgICB0b3BpY3M6IFtdXG4gIH07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUudG9waWNzID0gZ2V0VG9waWNzKCkgfHwgW107XG4gIH1cblxuICBvcGVuKHRvcGljOiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIGlmICh0b3BpYy5rZXkpIHtcbiAgICAgIHRoaXMuaHR0cFxuICAgICAgICAucG9zdChgL2FwcC1tYW5hZ2VyL3dlYi1zY2FuL3NhdmVgLCB7XG4gICAgICAgICAgYXBwSWQ6IHRvcGljLmtleSxcbiAgICAgICAgICBjcmVhdGVEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvcGljLnRhcmdldCkge1xuICAgICAgY2FzZSAnaHJlZic6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmxhbmsnOlxuICAgICAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RhcmdldCc6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=