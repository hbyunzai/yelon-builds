import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW } from '@yelon/util';
import { mergeBisConfig } from '../bis.config';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/message";
import * as i2 from "@yelon/util";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/core/transition-patch";
import * as i5 from "ng-zorro-antd/menu";
import * as i6 from "ng-zorro-antd/dropdown";
import * as i7 from "ng-zorro-antd/icon";
import * as i8 from "ng-zorro-antd/avatar";
import * as i9 from "@yelon/theme";
export class YunzaiUserComponent {
    constructor(injector, msg, tokenService, 
    // @ts-ignore
    configService) {
        this.injector = injector;
        this.msg = msg;
        this.tokenService = tokenService;
        this.configService = configService;
        this.icon = '';
        this.username = '';
        this.menus = [];
        this.config = mergeBisConfig(configService);
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
        this.injector.get(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
    }
    to(href) {
        if (href) {
            this.injector.get(WINDOW).open(href);
        }
        else {
            this.msg.error('该菜单没有配置链接!');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiUserComponent, deps: [{ token: i0.Injector }, { token: i1.NzMessageService }, { token: YA_SERVICE_TOKEN }, { token: i2.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiUserComponent, selector: "yunzai-user", ngImport: i0, template: `
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
        <div
          data-event-id="_nav_user"
          [attr.data-name]="m.name | i18n"
          nz-menu-item
          *ngFor="let m of menus"
          (click)="to(m.url)"
        >
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i5.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i6.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i6.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i8.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "pipe", type: i9.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-user',
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
        <div
          data-event-id="_nav_user"
          [attr.data-name]="m.name | i18n"
          nz-menu-item
          *ngFor="let m of menus"
          (click)="to(m.url)"
        >
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NzMessageService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i2.YunzaiConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLGdCQUFnQixFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUNuQixNQUFNLEVBR1AsTUFBTSxhQUFhLENBQUM7QUFHckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUE2Qy9DLE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFDVSxRQUFrQixFQUNsQixHQUFxQixFQUNLLFlBQTJCO0lBQzdELGFBQWE7SUFDTCxhQUFrQztRQUpsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ0ssaUJBQVksR0FBWixZQUFZLENBQWU7UUFFckQsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBSzVDLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBTHJCLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFNRCxRQUFRO1FBQ04sTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFDdkIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLG9CQUFvQixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNELENBQUMsQ0FBQyw2QkFBNkIsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxXQUF5QixDQUFDO0lBQ3JELENBQUM7SUFFRCxNQUFNO1FBQ0osWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx1QkFBdUIsQ0FBQztJQUMxRixDQUFDO0lBRUQsRUFBRSxDQUFDLElBQVk7UUFDYixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOytHQXpDVSxtQkFBbUIsMEVBTXBCLGdCQUFnQjttR0FOZixtQkFBbUIsbURBbkNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7OzRGQUdVLG1CQUFtQjtrQkFyQy9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFPSSxNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgSW5qZWN0b3IsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOLCBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2F1dGgnO1xuaW1wb3J0IHtcbiAgdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8sXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2Vcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnLi4vYmlzLmNvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckxpbmsge1xuICBpY29uOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS11c2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbSBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIHB4LXNtXCJcbiAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3VzZXJcIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotdXNlci1uYW1lXCI+XG4gICAgICAgIDxuei1hdmF0YXIgW256U3JjXT1cImljb25cIiBuelNpemU9XCJzbWFsbFwiIGNsYXNzPVwibXItc21cIiAvPlxuICAgICAgICB7eyB1c2VybmFtZSB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgI3VzZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDxkaXYgbnotbWVudSBjbGFzcz1cIndpZHRoLXNtXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl91c2VyXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibS5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgbnotbWVudS1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG0gb2YgbWVudXNcIlxuICAgICAgICAgIChjbGljayk9XCJ0byhtLnVybClcIlxuICAgICAgICA+XG4gICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIm0uaWNvblwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAge3sgbS5uYW1lIHwgaTE4biB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGxpIG56LW1lbnUtZGl2aWRlcj48L2xpPlxuICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3VzZXJcIiBkYXRhLW5hbWU9XCLms6jplIDnmbvlvZVcIiBuei1tZW51LWl0ZW0gKGNsaWNrKT1cImxvZ291dCgpXCI+XG4gICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJsb2dvdXRcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgIHt7ICdsb2dvdXQnIHwgaTE4biB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgY29uZmlnOiBZdW56YWlCdXNpbmVzc0NvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG1zZzogTnpNZXNzYWdlU2VydmljZSxcbiAgICBASW5qZWN0KFlBX1NFUlZJQ0VfVE9LRU4pIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBJVG9rZW5TZXJ2aWNlLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZUJpc0NvbmZpZyhjb25maWdTZXJ2aWNlKTtcbiAgfVxuXG4gIGljb246IHN0cmluZyA9ICcnO1xuICB1c2VybmFtZTogc3RyaW5nID0gJyc7XG4gIG1lbnVzOiBVc2VyTGlua1tdID0gW107XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBbLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbyA9IGdldFByb2plY3RJbmZvKCkhO1xuICAgIGNvbnN0IHVzZXIgPSBnZXRVc2VyKCkhO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyLnJlYWxuYW1lID8gdXNlci5yZWFsbmFtZSA6ICfmnKrlkb3lkI0nO1xuICAgIHRoaXMuaWNvbiA9IHVzZXIuYXZhdGFySWRcbiAgICAgID8gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vZmlsZWNlbnRlci9maWxlLyR7dXNlci5hdmF0YXJJZH1gXG4gICAgICA6IGAuL2Fzc2V0cy90bXAvaW1nL2F2YXRhci5qcGdgO1xuICAgIHRoaXMubWVudXMgPSBwcm9qZWN0SW5mby5wcm9maWxlTGlzdCBhcyBVc2VyTGlua1tdO1xuICB9XG5cbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHRoaXMudG9rZW5TZXJ2aWNlLmNsZWFyKCk7XG4gICAgdGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICB9XG5cbiAgdG8oaHJlZjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGhyZWYpIHtcbiAgICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykub3BlbihocmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tc2cuZXJyb3IoJ+ivpeiPnOWNleayoeaciemFjee9rumTvuaOpSEnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==