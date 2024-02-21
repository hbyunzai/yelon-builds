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
        inject(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
    }
    to(href) {
        if (href) {
            inject(WINDOW).open(href);
        }
        else {
            this.msg.error('该菜单没有配置链接!');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderUserComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiHeaderUserComponent, isStandalone: true, selector: "yunzai-header-user", ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderUserComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3l1bnphaS13aWRnZXRzL3l1bnphaS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLE1BQU0sRUFFTixtQkFBbUIsRUFDcEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBMkN6RCxNQUFNLE9BQU8seUJBQXlCO0lBbkN0QztRQW9DbUIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9CLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1QyxXQUFNLEdBQXlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbkYsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBZSxFQUFFLENBQUM7S0EyQnhCO0lBekJDLFFBQVE7UUFDTixNQUFNLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsY0FBYyxFQUFHLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxFQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTtZQUN2QixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sb0JBQW9CLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0QsQ0FBQyxDQUFDLDZCQUE2QixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQXlCLENBQUM7SUFDckQsQ0FBQztJQUVELE1BQU07UUFDSixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx1QkFBdUIsQ0FBQztJQUMvRSxDQUFDO0lBRUQsRUFBRSxDQUFDLElBQVk7UUFDYixJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDOzhHQWxDVSx5QkFBeUI7a0dBQXpCLHlCQUF5Qiw4RUFqQzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJULDJEQUVTLGdCQUFnQix5OUJBQUUsUUFBUSw0Q0FBRSxZQUFZLGlOQUFFLGNBQWMsZ1BBQUUsWUFBWTs7MkZBR3JFLHlCQUF5QjtrQkFuQ3JDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUM7b0JBQ2pGLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIGluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOIH0gZnJvbSAnQHllbG9uL2F1dGgnO1xuaW1wb3J0IHsgbWVyZ2VCaXNDb25maWcgfSBmcm9tICdAeWVsb24vYmlzL2NvbmZpZyc7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbyxcbiAgdXNlTG9jYWxTdG9yYWdlVXNlcixcbiAgV0lORE9XLFxuICBZdW56YWlCdXNpbmVzc0NvbmZpZyxcbiAgWXVuemFpQ29uZmlnU2VydmljZVxufSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOekF2YXRhck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYXZhdGFyJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOek1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyTGluayB7XG4gIGljb246IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWhlYWRlci11c2VyYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbSBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIHB4LXNtXCJcbiAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3VzZXJcIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotdXNlci1uYW1lXCI+XG4gICAgICAgIDxuei1hdmF0YXIgW256U3JjXT1cImljb25cIiBuelNpemU9XCJzbWFsbFwiIGNsYXNzPVwibXItc21cIiAvPlxuICAgICAgICB7eyB1c2VybmFtZSB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgI3VzZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDxkaXYgbnotbWVudSBjbGFzcz1cIndpZHRoLXNtXCI+XG4gICAgICAgIEBmb3IgKG0gb2YgbWVudXM7IHRyYWNrIG0pIHtcbiAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3VzZXJcIiBbYXR0ci5kYXRhLW5hbWVdPVwibS5uYW1lIHwgaTE4blwiIG56LW1lbnUtaXRlbSAoY2xpY2spPVwidG8obS51cmwpXCI+XG4gICAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwibS5pY29uXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgIHt7IG0ubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICA8bGkgbnotbWVudS1kaXZpZGVyPjwvbGk+XG4gICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfdXNlclwiIGRhdGEtbmFtZT1cIuazqOmUgOeZu+W9lVwiIG56LW1lbnUtaXRlbSAoY2xpY2spPVwibG9nb3V0KClcIj5cbiAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImxvZ291dFwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAge3sgJ2xvZ291dCcgfCBpMThuIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uei1kcm9wZG93bi1tZW51PlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpEcm9wRG93bk1vZHVsZSwgSTE4blBpcGUsIE56SWNvbk1vZHVsZSwgTnpBdmF0YXJNb2R1bGUsIFJvdXRlck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUhlYWRlclVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IG1zZyA9IGluamVjdChOek1lc3NhZ2VTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0b2tlblNlcnZpY2UgPSBpbmplY3QoWUFfU0VSVklDRV9UT0tFTik7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnU2VydmljZSA9IGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWc6IFl1bnphaUJ1c2luZXNzQ29uZmlnID0gbWVyZ2VCaXNDb25maWcodGhpcy5jb25maWdTZXJ2aWNlKTtcblxuICBpY29uOiBzdHJpbmcgPSAnJztcbiAgdXNlcm5hbWU6IHN0cmluZyA9ICcnO1xuICBtZW51czogVXNlckxpbmtbXSA9IFtdO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgWywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcigpITtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlci5yZWFsbmFtZSA/IHVzZXIucmVhbG5hbWUgOiAn5pyq5ZG95ZCNJztcbiAgICB0aGlzLmljb24gPSB1c2VyLmF2YXRhcklkXG4gICAgICA/IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2ZpbGVjZW50ZXIvZmlsZS8ke3VzZXIuYXZhdGFySWR9YFxuICAgICAgOiBgLi9hc3NldHMvdG1wL2ltZy9hdmF0YXIuanBnYDtcbiAgICB0aGlzLm1lbnVzID0gcHJvamVjdEluZm8ucHJvZmlsZUxpc3QgYXMgVXNlckxpbmtbXTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLnRva2VuU2VydmljZS5jbGVhcigpO1xuICAgIGluamVjdChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9jYXMtcHJveHkvYXBwL2xvZ291dGA7XG4gIH1cblxuICB0byhocmVmOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaHJlZikge1xuICAgICAgaW5qZWN0KFdJTkRPVykub3BlbihocmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tc2cuZXJyb3IoJ+ivpeiPnOWNleayoeaciemFjee9rumTvuaOpSEnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==