import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { useLocalStorageProjectInfo, useLocalStorageUser, WINDOW } from '@yelon/util';
import { mergeBisConfig } from '../bis.config';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/message";
import * as i2 from "@yelon/util";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/menu";
import * as i5 from "ng-zorro-antd/dropdown";
import * as i6 from "ng-zorro-antd/avatar";
import * as i7 from "ng-zorro-antd/icon";
import * as i8 from "@yelon/theme";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiUserComponent, deps: [{ token: i0.Injector }, { token: i1.NzMessageService }, { token: YA_SERVICE_TOKEN }, { token: i2.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiUserComponent, selector: "yunzai-user", ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i4.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i4.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "component", type: i6.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "directive", type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i8.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiUserComponent, decorators: [{
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
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1.NzMessageService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i2.YunzaiConfigService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLGdCQUFnQixFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUNuQixNQUFNLEVBR1AsTUFBTSxhQUFhLENBQUM7QUFHckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQTZDL0MsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUNVLFFBQWtCLEVBQ2xCLEdBQXFCLEVBQ0ssWUFBMkI7SUFDN0QsYUFBYTtJQUNMLGFBQWtDO1FBSmxDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDSyxpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUVyRCxrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFLNUMsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFMckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQU1ELFFBQVE7UUFDTixNQUFNLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsY0FBYyxFQUFHLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxFQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTtZQUN2QixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sb0JBQW9CLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0QsQ0FBQyxDQUFDLDZCQUE2QixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQXlCLENBQUM7SUFDckQsQ0FBQztJQUVELE1BQU07UUFDSixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLHVCQUF1QixDQUFDO0lBQzFGLENBQUM7SUFFRCxFQUFFLENBQUMsSUFBWTtRQUNiLElBQUksSUFBSSxFQUFFLENBQUM7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQzs4R0F6Q1UsbUJBQW1CLDBFQU1wQixnQkFBZ0I7a0dBTmYsbUJBQW1CLG1EQW5DcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NUOzsyRkFHVSxtQkFBbUI7a0JBckMvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBT0ksTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbmplY3QsIEluamVjdG9yLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiwgSVRva2VuU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7XG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBXSU5ET1csXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5pbXBvcnQgeyBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4uL2Jpcy5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJMaW5rIHtcbiAgaWNvbjogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktdXNlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW0gZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBweC1zbVwiXG4gICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl91c2VyXCJcbiAgICAgIG56LWRyb3Bkb3duXG4gICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgIFtuekRyb3Bkb3duTWVudV09XCJ1c2VyTWVudVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LXVzZXItbmFtZVwiPlxuICAgICAgICA8bnotYXZhdGFyIFtuelNyY109XCJpY29uXCIgbnpTaXplPVwic21hbGxcIiBjbGFzcz1cIm1yLXNtXCIgLz5cbiAgICAgICAge3sgdXNlcm5hbWUgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICA8ZGl2IG56LW1lbnUgY2xhc3M9XCJ3aWR0aC1zbVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfdXNlclwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm0ubmFtZSB8IGkxOG5cIlxuICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBtIG9mIG1lbnVzXCJcbiAgICAgICAgICAoY2xpY2spPVwidG8obS51cmwpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJtLmljb25cIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgIHt7IG0ubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsaSBuei1tZW51LWRpdmlkZXI+PC9saT5cbiAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl91c2VyXCIgZGF0YS1uYW1lPVwi5rOo6ZSA55m75b2VXCIgbnotbWVudS1pdGVtIChjbGljayk9XCJsb2dvdXQoKVwiPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwibG9nb3V0XCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICB7eyAnbG9nb3V0JyB8IGkxOG4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIGNvbmZpZzogWXVuemFpQnVzaW5lc3NDb25maWc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBtc2c6IE56TWVzc2FnZVNlcnZpY2UsXG4gICAgQEluamVjdChZQV9TRVJWSUNFX1RPS0VOKSBwcml2YXRlIHRva2VuU2VydmljZTogSVRva2VuU2VydmljZSxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY29uZmlnID0gbWVyZ2VCaXNDb25maWcoY29uZmlnU2VydmljZSk7XG4gIH1cblxuICBpY29uOiBzdHJpbmcgPSAnJztcbiAgdXNlcm5hbWU6IHN0cmluZyA9ICcnO1xuICBtZW51czogVXNlckxpbmtbXSA9IFtdO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgWywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcigpITtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlci5yZWFsbmFtZSA/IHVzZXIucmVhbG5hbWUgOiAn5pyq5ZG95ZCNJztcbiAgICB0aGlzLmljb24gPSB1c2VyLmF2YXRhcklkXG4gICAgICA/IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2ZpbGVjZW50ZXIvZmlsZS8ke3VzZXIuYXZhdGFySWR9YFxuICAgICAgOiBgLi9hc3NldHMvdG1wL2ltZy9hdmF0YXIuanBnYDtcbiAgICB0aGlzLm1lbnVzID0gcHJvamVjdEluZm8ucHJvZmlsZUxpc3QgYXMgVXNlckxpbmtbXTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLnRva2VuU2VydmljZS5jbGVhcigpO1xuICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2Nhcy1wcm94eS9hcHAvbG9nb3V0YDtcbiAgfVxuXG4gIHRvKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChocmVmKSB7XG4gICAgICB0aGlzLmluamVjdG9yLmdldChXSU5ET1cpLm9wZW4oaHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubXNnLmVycm9yKCfor6Xoj5zljZXmsqHmnInphY3nva7pk77mjqUhJyk7XG4gICAgfVxuICB9XG59XG4iXX0=