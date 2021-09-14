import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { mergeConfig } from '@yelon/bis/shared';
import { CacheService } from '@yelon/cache';
import { WINDOW, YunzaiConfigService } from '@yelon/util';
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
        this.config = mergeConfig(configService);
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
YzHeaderUserComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
YzHeaderUserComponent.ctorParameters = () => [
    { type: Injector },
    { type: NzMessageService },
    { type: undefined, decorators: [{ type: Inject, args: [YA_SERVICE_TOKEN,] }] },
    { type: YunzaiConfigService },
    { type: CacheService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXoudXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXoudXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBaUIsTUFBTSxhQUFhLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBd0IsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFvQ2hGLE1BQU0sT0FBTyxxQkFBcUI7SUFHaEMsWUFDVSxRQUFrQixFQUNsQixHQUFxQixFQUNLLFlBQTJCO0lBQzdELGFBQWE7SUFDTCxhQUFrQyxFQUNsQyxZQUEwQjtRQUwxQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ0ssaUJBQVksR0FBWixZQUFZLENBQWU7UUFFckQsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBQ2xDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBS3BDLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBTHJCLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFNRCxRQUFRO1FBQ04sTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNoRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxvQkFBb0IsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzRCxDQUFDLENBQUMsNkJBQTZCLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNO1FBQ0osWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx1QkFBdUIsQ0FBQztJQUMxRixDQUFDO0lBRUQsRUFBRSxDQUFDLElBQVk7UUFDYixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7WUFwRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQTFDb0QsUUFBUTtZQUVwRCxnQkFBZ0I7NENBK0NwQixNQUFNLFNBQUMsZ0JBQWdCO1lBMUNXLG1CQUFtQjtZQURqRCxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0LCBJbmplY3RvciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOLCBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2F1dGgnO1xuaW1wb3J0IHsgbWVyZ2VDb25maWcgfSBmcm9tICdAeWVsb24vYmlzL3NoYXJlZCc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICdAeWVsb24vY2FjaGUnO1xuaW1wb3J0IHsgV0lORE9XLCBZdW56YWlCdXNpbmVzc0NvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyTGluayB7XG4gIGljb246IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXotaGVhZGVyLXVzZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIgcHgtc21cIlxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICA+XG4gICAgICA8bnotYXZhdGFyIFtuelNyY109XCJpY29uXCIgbnpTaXplPVwic21hbGxcIiBjbGFzcz1cIm1yLXNtXCI+PC9uei1hdmF0YXI+XG4gICAgICB7eyB1c2VybmFtZSB9fVxuICAgIDwvZGl2PlxuICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICA8ZGl2IG56LW1lbnUgY2xhc3M9XCJ3aWR0aC1zbVwiPlxuICAgICAgICA8ZGl2IG56LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgbSBvZiBtZW51c1wiIChjbGljayk9XCJ0byhtLnVybClcIj5cbiAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwibS5pY29uXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICB7eyBtLm5hbWUgfCBpMThuIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bGkgbnotbWVudS1kaXZpZGVyPjwvbGk+XG4gICAgICAgIDxkaXYgbnotbWVudS1pdGVtIChjbGljayk9XCJsb2dvdXQoKVwiPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwibG9nb3V0XCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICB7eyAnbWVudS5hY2NvdW50LmxvZ291dCcgfCBpMThuIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uei1kcm9wZG93bi1tZW51PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZekhlYWRlclVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIGNvbmZpZzogWXVuemFpQnVzaW5lc3NDb25maWc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBtc2c6IE56TWVzc2FnZVNlcnZpY2UsXG4gICAgQEluamVjdChZQV9TRVJWSUNFX1RPS0VOKSBwcml2YXRlIHRva2VuU2VydmljZTogSVRva2VuU2VydmljZSxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZUNvbmZpZyhjb25maWdTZXJ2aWNlKTtcbiAgfVxuXG4gIGljb246IHN0cmluZyA9ICcnO1xuICB1c2VybmFtZTogc3RyaW5nID0gJyc7XG4gIG1lbnVzOiBVc2VyTGlua1tdID0gW107XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgcHJvamVjdEluZm8gPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9wcm9qZWN0X2luZm8nLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICBjb25zdCB1c2VyID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfdXNlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyLnJlYWxuYW1lID8gdXNlci5yZWFsbmFtZSA6ICfmnKrlkb3lkI0nO1xuICAgIHRoaXMuaWNvbiA9IHVzZXIuYXZhdGFySWRcbiAgICAgID8gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vZmlsZWNlbnRlci9maWxlLyR7dXNlci5hdmF0YXJJZH1gXG4gICAgICA6IGAuL2Fzc2V0cy90bXAvaW1nL2F2YXRhci5qcGdgO1xuICAgIHRoaXMubWVudXMgPSBwcm9qZWN0SW5mby5wcm9maWxlTGlzdDtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLnRva2VuU2VydmljZS5jbGVhcigpO1xuICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2Nhcy1wcm94eS9hcHAvbG9nb3V0YDtcbiAgfVxuXG4gIHRvKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChocmVmKSB7XG4gICAgICB0aGlzLmluamVjdG9yLmdldChXSU5ET1cpLm9wZW4oaHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubXNnLmVycm9yKCfor6Xoj5zljZXmsqHmnInphY3nva7pk77mjqUhJyk7XG4gICAgfVxuICB9XG59XG4iXX0=