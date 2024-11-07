import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { mergeBisConfig } from '@yelon/bis/config';
import { I18nPipe } from '@yelon/theme';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/menu";
import * as i2 from "ng-zorro-antd/dropdown";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "ng-zorro-antd/avatar";
export class YunzaiHeaderUserComponent {
    constructor() {
        this.msg = inject(NzMessageService);
        this.tokenService = inject(YA_SERVICE_TOKEN);
        this.configService = inject(YunzaiConfigService);
        this.config = mergeBisConfig(this.configService);
        this.win = inject(WINDOW);
        this.icon = '';
        this.username = '';
        this.menus = [];
    }
    ngOnInit() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const [, getUser] = useLocalStorageUser();
        const projectInfo = getProjectInfo();
        const user = getUser();
        this.username = user.realname ? user.realname : '未命名';
        this.icon = user.avatarId
            ? `${this.config.baseUrl}/filecenter/file/${user.avatarId}`
            : `./assets/tmp/img/avatar.jpg`;
        this.menus = projectInfo.profileList;
    }
    logout() {
        localStorage.clear();
        this.tokenService.clear();
        this.win.location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
    }
    to(href) {
        if (href) {
            this.win.open(href);
        }
        else {
            this.msg.error('该菜单没有配置链接!');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiHeaderUserComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.11", type: YunzaiHeaderUserComponent, isStandalone: true, selector: "yunzai-header-user", ngImport: i0, template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      data-event-id="_nav_user"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <div class="yz-user-name">
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm" />
        {{ username }}
      </div>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        @for (m of menus; track m) {
          <div data-event-id="_nav_user" [attr.data-name]="m.name | i18n" nz-menu-item (click)="to(m.url)">
            <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
            {{ m.name | i18n }}
          </div>
        }
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i1.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i4.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "ngmodule", type: RouterModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiHeaderUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-header-user`,
                    template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      data-event-id="_nav_user"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <div class="yz-user-name">
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm" />
        {{ username }}
      </div>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        @for (m of menus; track m) {
          <div data-event-id="_nav_user" [attr.data-name]="m.name | i18n" nz-menu-item (click)="to(m.url)">
            <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
            {{ m.name | i18n }}
          </div>
        }
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                    standalone: true,
                    imports: [NzDropDownModule, I18nPipe, NzIconModule, NzAvatarModule, RouterModule],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3l1bnphaS13aWRnZXRzL3l1bnphaS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLE1BQU0sRUFFTixtQkFBbUIsRUFDcEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBMkN6RCxNQUFNLE9BQU8seUJBQXlCO0lBbkN0QztRQW9DbUIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9CLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1QyxXQUFNLEdBQXlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEUsUUFBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QyxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsVUFBSyxHQUFlLEVBQUUsQ0FBQztLQTJCeEI7SUF6QkMsUUFBUTtRQUNOLE1BQU0sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLDBCQUEwQixFQUFFLENBQUM7UUFDeEQsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLFdBQVcsR0FBRyxjQUFjLEVBQUcsQ0FBQztRQUN0QyxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxvQkFBb0IsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzRCxDQUFDLENBQUMsNkJBQTZCLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsV0FBeUIsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTTtRQUNKLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx1QkFBdUIsQ0FBQztJQUN6RSxDQUFDO0lBRUQsRUFBRSxDQUFDLElBQVk7UUFDYixJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQzsrR0FuQ1UseUJBQXlCO21HQUF6Qix5QkFBeUIsOEVBakMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCVCwyREFFUyxnQkFBZ0IseTlCQUFFLFFBQVEsNENBQUUsWUFBWSxpTkFBRSxjQUFjLGdQQUFFLFlBQVk7OzRGQUdyRSx5QkFBeUI7a0JBbkNyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDO29CQUNqRixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBpbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnQHllbG9uL2Jpcy9jb25maWcnO1xuaW1wb3J0IHsgSTE4blBpcGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtcbiAgdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8sXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2Vcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpBdmF0YXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2F2YXRhcic7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckxpbmsge1xuICBpY29uOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1oZWFkZXItdXNlcmAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW0gZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBweC1zbVwiXG4gICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl91c2VyXCJcbiAgICAgIG56LWRyb3Bkb3duXG4gICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgIFtuekRyb3Bkb3duTWVudV09XCJ1c2VyTWVudVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LXVzZXItbmFtZVwiPlxuICAgICAgICA8bnotYXZhdGFyIFtuelNyY109XCJpY29uXCIgbnpTaXplPVwic21hbGxcIiBjbGFzcz1cIm1yLXNtXCIgLz5cbiAgICAgICAge3sgdXNlcm5hbWUgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICA8ZGl2IG56LW1lbnUgY2xhc3M9XCJ3aWR0aC1zbVwiPlxuICAgICAgICBAZm9yIChtIG9mIG1lbnVzOyB0cmFjayBtKSB7XG4gICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl91c2VyXCIgW2F0dHIuZGF0YS1uYW1lXT1cIm0ubmFtZSB8IGkxOG5cIiBuei1tZW51LWl0ZW0gKGNsaWNrKT1cInRvKG0udXJsKVwiPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIm0uaWNvblwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICB7eyBtLm5hbWUgfCBpMThuIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgPGxpIG56LW1lbnUtZGl2aWRlcj48L2xpPlxuICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3VzZXJcIiBkYXRhLW5hbWU9XCLms6jplIDnmbvlvZVcIiBuei1tZW51LWl0ZW0gKGNsaWNrKT1cImxvZ291dCgpXCI+XG4gICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJsb2dvdXRcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgIHt7ICdsb2dvdXQnIHwgaTE4biB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW056RHJvcERvd25Nb2R1bGUsIEkxOG5QaXBlLCBOekljb25Nb2R1bGUsIE56QXZhdGFyTW9kdWxlLCBSb3V0ZXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlIZWFkZXJVc2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtc2cgPSBpbmplY3QoTnpNZXNzYWdlU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdG9rZW5TZXJ2aWNlID0gaW5qZWN0KFlBX1NFUlZJQ0VfVE9LRU4pO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1NlcnZpY2UgPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBZdW56YWlCdXNpbmVzc0NvbmZpZyA9IG1lcmdlQmlzQ29uZmlnKHRoaXMuY29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgaWNvbjogc3RyaW5nID0gJyc7XG4gIHVzZXJuYW1lOiBzdHJpbmcgPSAnJztcbiAgbWVudXM6IFVzZXJMaW5rW10gPSBbXTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIGNvbnN0IFssIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgY29uc3QgdXNlciA9IGdldFVzZXIoKSE7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXIucmVhbG5hbWUgPyB1c2VyLnJlYWxuYW1lIDogJ+acquWRveWQjSc7XG4gICAgdGhpcy5pY29uID0gdXNlci5hdmF0YXJJZFxuICAgICAgPyBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9maWxlY2VudGVyL2ZpbGUvJHt1c2VyLmF2YXRhcklkfWBcbiAgICAgIDogYC4vYXNzZXRzL3RtcC9pbWcvYXZhdGFyLmpwZ2A7XG4gICAgdGhpcy5tZW51cyA9IHByb2plY3RJbmZvLnByb2ZpbGVMaXN0IGFzIFVzZXJMaW5rW107XG4gIH1cblxuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy50b2tlblNlcnZpY2UuY2xlYXIoKTtcbiAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICB9XG5cbiAgdG8oaHJlZjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGhyZWYpIHtcbiAgICAgIHRoaXMud2luLm9wZW4oaHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubXNnLmVycm9yKCfor6Xoj5zljZXmsqHmnInphY3nva7pk77mjqUhJyk7XG4gICAgfVxuICB9XG59XG4iXX0=