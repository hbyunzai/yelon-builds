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
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i5.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i6.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i6.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i8.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "pipe", type: i9.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
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
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLGdCQUFnQixFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUNuQixNQUFNLEVBR1AsTUFBTSxhQUFhLENBQUM7QUFHckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUE2Qy9DLE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFDVSxRQUFrQixFQUNsQixHQUFxQixFQUNLLFlBQTJCO0lBQzdELGFBQWE7SUFDTCxhQUFrQztRQUpsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ0ssaUJBQVksR0FBWixZQUFZLENBQWU7UUFFckQsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBSzVDLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBTHJCLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFNRCxRQUFRO1FBQ04sTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFDdkIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLG9CQUFvQixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNELENBQUMsQ0FBQyw2QkFBNkIsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxXQUF5QixDQUFDO0lBQ3JELENBQUM7SUFFRCxNQUFNO1FBQ0osWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx1QkFBdUIsQ0FBQztJQUMxRixDQUFDO0lBRUQsRUFBRSxDQUFDLElBQVk7UUFDYixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOytHQXpDVSxtQkFBbUIsMEVBTXBCLGdCQUFnQjttR0FOZixtQkFBbUIsbURBbkNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7OzRGQUdVLG1CQUFtQjtrQkFyQy9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFPSSxNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgSW5qZWN0b3IsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOLCBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2F1dGgnO1xuaW1wb3J0IHtcbiAgdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8sXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2Vcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnLi4vYmlzLmNvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckxpbmsge1xuICBpY29uOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS11c2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbSBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIHB4LXNtXCJcbiAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3VzZXJcIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotdXNlci1uYW1lXCI+XG4gICAgICAgIDxuei1hdmF0YXIgW256U3JjXT1cImljb25cIiBuelNpemU9XCJzbWFsbFwiIGNsYXNzPVwibXItc21cIj48L256LWF2YXRhcj5cbiAgICAgICAge3sgdXNlcm5hbWUgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICA8ZGl2IG56LW1lbnUgY2xhc3M9XCJ3aWR0aC1zbVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfdXNlclwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm0ubmFtZSB8IGkxOG5cIlxuICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBtIG9mIG1lbnVzXCJcbiAgICAgICAgICAoY2xpY2spPVwidG8obS51cmwpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJtLmljb25cIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgIHt7IG0ubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsaSBuei1tZW51LWRpdmlkZXI+PC9saT5cbiAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl91c2VyXCIgZGF0YS1uYW1lPVwi5rOo6ZSA55m75b2VXCIgbnotbWVudS1pdGVtIChjbGljayk9XCJsb2dvdXQoKVwiPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwibG9nb3V0XCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICB7eyAnbG9nb3V0JyB8IGkxOG4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIGNvbmZpZzogWXVuemFpQnVzaW5lc3NDb25maWc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBtc2c6IE56TWVzc2FnZVNlcnZpY2UsXG4gICAgQEluamVjdChZQV9TRVJWSUNFX1RPS0VOKSBwcml2YXRlIHRva2VuU2VydmljZTogSVRva2VuU2VydmljZSxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY29uZmlnID0gbWVyZ2VCaXNDb25maWcoY29uZmlnU2VydmljZSk7XG4gIH1cblxuICBpY29uOiBzdHJpbmcgPSAnJztcbiAgdXNlcm5hbWU6IHN0cmluZyA9ICcnO1xuICBtZW51czogVXNlckxpbmtbXSA9IFtdO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgWywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcigpITtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlci5yZWFsbmFtZSA/IHVzZXIucmVhbG5hbWUgOiAn5pyq5ZG95ZCNJztcbiAgICB0aGlzLmljb24gPSB1c2VyLmF2YXRhcklkXG4gICAgICA/IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2ZpbGVjZW50ZXIvZmlsZS8ke3VzZXIuYXZhdGFySWR9YFxuICAgICAgOiBgLi9hc3NldHMvdG1wL2ltZy9hdmF0YXIuanBnYDtcbiAgICB0aGlzLm1lbnVzID0gcHJvamVjdEluZm8ucHJvZmlsZUxpc3QgYXMgVXNlckxpbmtbXTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLnRva2VuU2VydmljZS5jbGVhcigpO1xuICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2Nhcy1wcm94eS9hcHAvbG9nb3V0YDtcbiAgfVxuXG4gIHRvKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChocmVmKSB7XG4gICAgICB0aGlzLmluamVjdG9yLmdldChXSU5ET1cpLm9wZW4oaHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubXNnLmVycm9yKCfor6Xoj5zljZXmsqHmnInphY3nva7pk77mjqUhJyk7XG4gICAgfVxuICB9XG59XG4iXX0=