import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { WINDOW } from '@yelon/util';
import { mergeBisConfig } from '../bis.config';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/message";
import * as i2 from "@yelon/util";
import * as i3 from "@yelon/cache";
import * as i4 from "ng-zorro-antd/avatar";
import * as i5 from "ng-zorro-antd/dropdown";
import * as i6 from "ng-zorro-antd/menu";
import * as i7 from "@angular/common";
import * as i8 from "ng-zorro-antd/core/transition-patch";
import * as i9 from "ng-zorro-antd/icon";
import * as i10 from "@yelon/theme";
export class YzHeaderUserComponent {
    constructor(injector, msg, tokenService, 
    // @ts-ignore
    configService, cacheService) {
        this.injector = injector;
        this.msg = msg;
        this.tokenService = tokenService;
        this.configService = configService;
        this.cacheService = cacheService;
        this.icon = '';
        this.username = '';
        this.menus = [];
        this.config = mergeBisConfig(configService);
    }
    ngOnInit() {
        const projectInfo = this.cacheService.get('_yz_project_info', { mode: 'none' });
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
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
}
YzHeaderUserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderUserComponent, deps: [{ token: i0.Injector }, { token: i1.NzMessageService }, { token: YA_SERVICE_TOKEN }, { token: i2.YunzaiConfigService }, { token: i3.CacheService }], target: i0.ɵɵFactoryTarget.Component });
YzHeaderUserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: YzHeaderUserComponent, selector: "yz-header-user", ngImport: i0, template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
      {{ username }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item *ngFor="let m of menus" (click)="to(m.url)">
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `, isInline: true, components: [{ type: i4.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }], directives: [{ type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { type: i6.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i6.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i6.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }], pipes: { "i18n": i10.I18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yz-header-user',
                    template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
      {{ username }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item *ngFor="let m of menus" (click)="to(m.url)">
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NzMessageService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i2.YunzaiConfigService }, { type: i3.CacheService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXoudXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXoudXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBSTdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBaUIsTUFBTSxhQUFhLENBQUM7QUFFOUQsT0FBTyxFQUFFLE1BQU0sRUFBNkMsTUFBTSxhQUFhLENBQUM7QUFFaEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0FBb0MvQyxNQUFNLE9BQU8scUJBQXFCO0lBR2hDLFlBQ1UsUUFBa0IsRUFDbEIsR0FBcUIsRUFDSyxZQUEyQjtJQUM3RCxhQUFhO0lBQ0wsYUFBa0MsRUFDbEMsWUFBMEI7UUFMMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNLLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBRXJELGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUtwQyxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsVUFBSyxHQUFlLEVBQUUsQ0FBQztRQUxyQixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBTUQsUUFBUTtRQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTtZQUN2QixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sb0JBQW9CLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0QsQ0FBQyxDQUFDLDZCQUE2QixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTTtRQUNKLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sdUJBQXVCLENBQUM7SUFDMUYsQ0FBQztJQUVELEVBQUUsQ0FBQyxJQUFZO1FBQ2IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7a0hBeENVLHFCQUFxQiwwRUFNdEIsZ0JBQWdCO3NHQU5mLHFCQUFxQixzREExQnRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDsyRkFHVSxxQkFBcUI7a0JBNUJqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFPSSxNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgSW5qZWN0b3IsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcblxuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiwgSVRva2VuU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9jYWNoZSc7XG5pbXBvcnQgeyBXSU5ET1csIFl1bnphaUJ1c2luZXNzQ29uZmlnLCBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4uL2Jpcy5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJMaW5rIHtcbiAgaWNvbjogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5ei1oZWFkZXItdXNlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW0gZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBweC1zbVwiXG4gICAgICBuei1kcm9wZG93blxuICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gICAgICBbbnpEcm9wZG93bk1lbnVdPVwidXNlck1lbnVcIlxuICAgID5cbiAgICAgIDxuei1hdmF0YXIgW256U3JjXT1cImljb25cIiBuelNpemU9XCJzbWFsbFwiIGNsYXNzPVwibXItc21cIj48L256LWF2YXRhcj5cbiAgICAgIHt7IHVzZXJuYW1lIH19XG4gICAgPC9kaXY+XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgI3VzZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDxkaXYgbnotbWVudSBjbGFzcz1cIndpZHRoLXNtXCI+XG4gICAgICAgIDxkaXYgbnotbWVudS1pdGVtICpuZ0Zvcj1cImxldCBtIG9mIG1lbnVzXCIgKGNsaWNrKT1cInRvKG0udXJsKVwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJtLmljb25cIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgIHt7IG0ubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsaSBuei1tZW51LWRpdmlkZXI+PC9saT5cbiAgICAgICAgPGRpdiBuei1tZW51LWl0ZW0gKGNsaWNrKT1cImxvZ291dCgpXCI+XG4gICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJsb2dvdXRcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgIHt7ICdtZW51LmFjY291bnQubG9nb3V0JyB8IGkxOG4gfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl6SGVhZGVyVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgY29uZmlnOiBZdW56YWlCdXNpbmVzc0NvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG1zZzogTnpNZXNzYWdlU2VydmljZSxcbiAgICBASW5qZWN0KFlBX1NFUlZJQ0VfVE9LRU4pIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBJVG9rZW5TZXJ2aWNlLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbmZpZyA9IG1lcmdlQmlzQ29uZmlnKGNvbmZpZ1NlcnZpY2UpO1xuICB9XG5cbiAgaWNvbjogc3RyaW5nID0gJyc7XG4gIHVzZXJuYW1lOiBzdHJpbmcgPSAnJztcbiAgbWVudXM6IFVzZXJMaW5rW10gPSBbXTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9qZWN0SW5mbyA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X3Byb2plY3RfaW5mbycsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el91c2VyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXIucmVhbG5hbWUgPyB1c2VyLnJlYWxuYW1lIDogJ+acquWRveWQjSc7XG4gICAgdGhpcy5pY29uID0gdXNlci5hdmF0YXJJZFxuICAgICAgPyBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9maWxlY2VudGVyL2ZpbGUvJHt1c2VyLmF2YXRhcklkfWBcbiAgICAgIDogYC4vYXNzZXRzL3RtcC9pbWcvYXZhdGFyLmpwZ2A7XG4gICAgdGhpcy5tZW51cyA9IHByb2plY3RJbmZvLnByb2ZpbGVMaXN0O1xuICB9XG5cbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHRoaXMudG9rZW5TZXJ2aWNlLmNsZWFyKCk7XG4gICAgdGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICB9XG5cbiAgdG8oaHJlZjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGhyZWYpIHtcbiAgICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykub3BlbihocmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tc2cuZXJyb3IoJ+ivpeiPnOWNleayoeaciemFjee9rumTvuaOpSEnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==