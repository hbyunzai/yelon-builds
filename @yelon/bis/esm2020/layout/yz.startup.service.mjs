import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ICONS } from '@yelon/bis/shared';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { deepCopy, log, WINDOW } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from './bis.config';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
import * as i2 from "@yelon/theme";
import * as i3 from "@yelon/acl";
import * as i4 from "./yz.auth.service";
import * as i5 from "@yelon/cache";
import * as i6 from "@yelon/util";
import * as i7 from "./yz.i18n.service";
export function mapYzSideToYelonMenu(menus) {
    menus.forEach(menu => {
        menu.badgeDot = menu.badge_dot || null;
        menu.badgeStatus = menu.badge_status || null;
        menu.shortcutRoot = menu.shortcut_root || null;
        menu.reuse = true;
        if (menu.children) {
            mapYzSideToYelonMenu(menu.children);
        }
    });
}
export function generateAbility(menus, abilities, prefix) {
    menus.forEach(menu => {
        if (menu.link) {
            prefix += menu.link;
        }
        else {
            prefix += '';
        }
        if (menu.menuAuths) {
            menu.menuAuths.forEach((a) => {
                abilities.push(`${prefix}:${a}`);
                abilities.push(a);
            });
        }
        if (menu.children) {
            generateAbility(menu.children, abilities, prefix);
        }
    });
}
export class YzStartupService {
    constructor(iconSrv, menuService, i18n, win, settingService, aclService, titleService, yzAuthService, cacheService, configService) {
        this.menuService = menuService;
        this.i18n = i18n;
        this.win = win;
        this.settingService = settingService;
        this.aclService = aclService;
        this.titleService = titleService;
        this.yzAuthService = yzAuthService;
        this.cacheService = cacheService;
        this.configService = configService;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.bis = mergeBisConfig(this.configService);
        iconSrv.addIcon(...ICONS);
    }
    load() {
        log('startup.service: ', 'load');
        const defaultLang = this.i18n.defaultLang;
        return this.i18n.loadLangData(defaultLang).pipe(mergeMap(langData => {
            log('startup.service: ', 'set i18n, defaultLang->', defaultLang, ' langData->', langData);
            this.i18n.use(defaultLang, langData);
            return of(null);
        }), mergeMap(() => {
            return this.yzAuthService.login();
        }), mergeMap(v => {
            // preloader finish
            this.systemInit();
            log('startup.service: preloader finish');
            if (this.win && this.win.appBootstrap) {
                this.win.appBootstrap();
            }
            return of(v);
        }));
    }
    systemInit() {
        log('startup.service: system init');
        // user
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        // menu
        const ms = deepCopy(user.menu).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        mapYzSideToYelonMenu(ms);
        const currentMenu = ms.pop() || [];
        this.menuService.add([currentMenu]);
        // logo app
        this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
        this.settingService.setUser({
            name: user.realname || 'no name',
            avatar: `${this.bis.baseUrl}/filecenter/file/${user.avatarId}` || '',
            email: user.email || 'no email'
        });
        // title
        this.titleService.default = currentMenu && currentMenu.text ? currentMenu.text : 'default application name';
        this.titleService.setTitle(currentMenu && currentMenu.text ? currentMenu.text : 'no title');
        // acl
        const abilities = [];
        generateAbility([currentMenu], abilities, '');
        this.aclService.attachRole(user?.roles
            .map((role) => {
            return role.roleValue;
        })
            .filter((a) => !!a) || []);
        this.aclService.attachAbility(abilities);
        // cache current
        this.cacheService.set('_yz_current', {
            text: currentMenu.text,
            intro: currentMenu.intro,
            icon: currentMenu.appIconUrl
        });
    }
}
YzStartupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzStartupService, deps: [{ token: i1.NzIconService }, { token: i2.MenuService }, { token: YUNZAI_I18N_TOKEN }, { token: WINDOW }, { token: i2.SettingsService }, { token: i3.ACLService }, { token: i2.TitleService }, { token: i4.YzAuthService }, { token: i5.CacheService }, { token: i6.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
YzStartupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzStartupService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzStartupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzIconService }, { type: i2.MenuService }, { type: i7.YzI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: i2.SettingsService }, { type: i3.ACLService }, { type: i2.TitleService }, { type: i4.YzAuthService }, { type: i5.CacheService }, { type: i6.YunzaiConfigService }]; } });
export function YzStartupServiceFactory(startupService) {
    return () => startupService.load();
}
//@ts-ignore
export const YZ_APPINIT_PROVIDES = [
    YzStartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: YzStartupServiceFactory,
        deps: [YzStartupService],
        multi: true
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouc3RhcnR1cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5zdGFydHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLEVBQTBELGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBNEMsTUFBTSxhQUFhLENBQUM7QUFJN0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBSXZFLE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxLQUFhO0lBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVE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QUFPLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxDQUFDO0FBRUQsWUFBWTtBQUNaLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2pDLGdCQUFnQjtJQUNoQjtRQUNFLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSx1QkFBdUI7UUFDbkMsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7UUFDeEIsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBQ0xTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2FjbCc7XG5pbXBvcnQgeyBJQ09OUyB9IGZyb20gJ0B5ZWxvbi9iaXMvc2hhcmVkJztcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9jYWNoZSc7XG5pbXBvcnQgeyBNZW51LCBNZW51U2VydmljZSwgU2V0dGluZ3NTZXJ2aWNlLCBUaXRsZVNlcnZpY2UsIFVzZXIsIFlVTlpBSV9JMThOX1RPS0VOIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7ZGVlcENvcHksIGxvZywgV0lORE9XLCBZdW56YWlCdXNpbmVzc0NvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZX0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56SWNvblNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRywgbWVyZ2VCaXNDb25maWcgfSBmcm9tICcuL2Jpcy5jb25maWcnO1xuaW1wb3J0IHsgWXpBdXRoU2VydmljZSB9IGZyb20gJy4veXouYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFl6STE4TlNlcnZpY2UgfSBmcm9tICcuL3l6LmkxOG4uc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBZelNpZGVUb1llbG9uTWVudShtZW51czogTWVudVtdKTogdm9pZCB7XG4gIG1lbnVzLmZvckVhY2gobWVudSA9PiB7XG4gICAgbWVudS5iYWRnZURvdCA9IG1lbnUuYmFkZ2VfZG90IHx8IG51bGw7XG4gICAgbWVudS5iYWRnZVN0YXR1cyA9IG1lbnUuYmFkZ2Vfc3RhdHVzIHx8IG51bGw7XG4gICAgbWVudS5zaG9ydGN1dFJvb3QgPSBtZW51LnNob3J0Y3V0X3Jvb3QgfHwgbnVsbDtcbiAgICBtZW51LnJldXNlID0gdHJ1ZTtcbiAgICBpZiAobWVudS5jaGlsZHJlbikge1xuICAgICAgbWFwWXpTaWRlVG9ZZWxvbk1lbnUobWVudS5jaGlsZHJlbik7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQWJpbGl0eShtZW51czogTWVudVtdLCBhYmlsaXRpZXM6IHN0cmluZ1tdLCBwcmVmaXg6IHN0cmluZyk6IHZvaWQge1xuICBtZW51cy5mb3JFYWNoKG1lbnUgPT4ge1xuICAgIGlmIChtZW51LmxpbmspIHtcbiAgICAgIHByZWZpeCArPSBtZW51Lmxpbms7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeCArPSAnJztcbiAgICB9XG4gICAgaWYgKG1lbnUubWVudUF1dGhzKSB7XG4gICAgICBtZW51Lm1lbnVBdXRocy5mb3JFYWNoKChhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgYWJpbGl0aWVzLnB1c2goYCR7cHJlZml4fToke2F9YCk7XG4gICAgICAgIGFiaWxpdGllcy5wdXNoKGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1lbnUuY2hpbGRyZW4pIHtcbiAgICAgIGdlbmVyYXRlQWJpbGl0eShtZW51LmNoaWxkcmVuLCBhYmlsaXRpZXMsIHByZWZpeCk7XG4gICAgfVxuICB9KTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl6U3RhcnR1cFNlcnZpY2Uge1xuICBwcml2YXRlIGJpczogWXVuemFpQnVzaW5lc3NDb25maWcgPSBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpY29uU3J2OiBOekljb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxuICAgIEBJbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pIHByaXZhdGUgaTE4bjogWXpJMThOU2VydmljZSxcbiAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW46IE56U2FmZUFueSxcbiAgICBwcml2YXRlIHNldHRpbmdTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2xTZXJ2aWNlOiBBQ0xTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGl0bGVTZXJ2aWNlOiBUaXRsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB5ekF1dGhTZXJ2aWNlOiBZekF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYmlzID0gbWVyZ2VCaXNDb25maWcodGhpcy5jb25maWdTZXJ2aWNlKTtcbiAgICBpY29uU3J2LmFkZEljb24oLi4uSUNPTlMpO1xuICB9XG5cbiAgbG9hZCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBsb2coJ3N0YXJ0dXAuc2VydmljZTogJywgJ2xvYWQnKTtcbiAgICBjb25zdCBkZWZhdWx0TGFuZyA9IHRoaXMuaTE4bi5kZWZhdWx0TGFuZztcbiAgICByZXR1cm4gdGhpcy5pMThuLmxvYWRMYW5nRGF0YShkZWZhdWx0TGFuZykucGlwZShcbiAgICAgIG1lcmdlTWFwKGxhbmdEYXRhID0+IHtcbiAgICAgICAgbG9nKCdzdGFydHVwLnNlcnZpY2U6ICcsICdzZXQgaTE4biwgZGVmYXVsdExhbmctPicsIGRlZmF1bHRMYW5nLCAnIGxhbmdEYXRhLT4nLCBsYW5nRGF0YSk7XG4gICAgICAgIHRoaXMuaTE4bi51c2UoZGVmYXVsdExhbmcsIGxhbmdEYXRhKTtcbiAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnl6QXV0aFNlcnZpY2UubG9naW4oKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAodiA9PiB7XG4gICAgICAgIC8vIHByZWxvYWRlciBmaW5pc2hcbiAgICAgICAgdGhpcy5zeXN0ZW1Jbml0KCk7XG4gICAgICAgIGxvZygnc3RhcnR1cC5zZXJ2aWNlOiBwcmVsb2FkZXIgZmluaXNoJyk7XG4gICAgICAgIGlmICh0aGlzLndpbiAmJiB0aGlzLndpbi5hcHBCb290c3RyYXApIHtcbiAgICAgICAgICB0aGlzLndpbi5hcHBCb290c3RyYXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2Yodik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBzeXN0ZW1Jbml0KCk6IHZvaWQge1xuICAgIGxvZygnc3RhcnR1cC5zZXJ2aWNlOiBzeXN0ZW0gaW5pdCcpO1xuICAgIC8vIHVzZXJcbiAgICBjb25zdCB1c2VyOiBVc2VyID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfdXNlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIC8vIG1lbnVcbiAgICBjb25zdCBtcyA9IGRlZXBDb3B5KHVzZXIubWVudSkuZmlsdGVyKChtOiBNZW51KSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmJpcy5zeXN0ZW1Db2RlKSBhcyBNZW51W107XG4gICAgbWFwWXpTaWRlVG9ZZWxvbk1lbnUobXMpO1xuICAgIGNvbnN0IGN1cnJlbnRNZW51ID0gbXMucG9wKCkgfHwgW107XG4gICAgdGhpcy5tZW51U2VydmljZS5hZGQoW2N1cnJlbnRNZW51XSk7XG5cbiAgICAvLyBsb2dvIGFwcFxuICAgIHRoaXMuc2V0dGluZ1NlcnZpY2Uuc2V0QXBwKHsgbmFtZTogY3VycmVudE1lbnUudGV4dCwgZGVzY3JpcHRpb246IGN1cnJlbnRNZW51LmludHJvIH0pO1xuICAgIHRoaXMuc2V0dGluZ1NlcnZpY2Uuc2V0VXNlcih7XG4gICAgICBuYW1lOiB1c2VyLnJlYWxuYW1lIHx8ICdubyBuYW1lJyxcbiAgICAgIGF2YXRhcjogYCR7dGhpcy5iaXMuYmFzZVVybH0vZmlsZWNlbnRlci9maWxlLyR7dXNlci5hdmF0YXJJZH1gIHx8ICcnLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwgfHwgJ25vIGVtYWlsJ1xuICAgIH0pO1xuXG4gICAgLy8gdGl0bGVcbiAgICB0aGlzLnRpdGxlU2VydmljZS5kZWZhdWx0ID0gY3VycmVudE1lbnUgJiYgY3VycmVudE1lbnUudGV4dCA/IGN1cnJlbnRNZW51LnRleHQgOiAnZGVmYXVsdCBhcHBsaWNhdGlvbiBuYW1lJztcbiAgICB0aGlzLnRpdGxlU2VydmljZS5zZXRUaXRsZShjdXJyZW50TWVudSAmJiBjdXJyZW50TWVudS50ZXh0ID8gY3VycmVudE1lbnUudGV4dCA6ICdubyB0aXRsZScpO1xuXG4gICAgLy8gYWNsXG4gICAgY29uc3QgYWJpbGl0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGdlbmVyYXRlQWJpbGl0eShbY3VycmVudE1lbnVdLCBhYmlsaXRpZXMsICcnKTtcbiAgICB0aGlzLmFjbFNlcnZpY2UuYXR0YWNoUm9sZShcbiAgICAgIHVzZXI/LnJvbGVzXG4gICAgICAgIC5tYXAoKHJvbGU6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByb2xlLnJvbGVWYWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoYTogTnpTYWZlQW55KSA9PiAhIWEpIHx8IFtdXG4gICAgKTtcbiAgICB0aGlzLmFjbFNlcnZpY2UuYXR0YWNoQWJpbGl0eShhYmlsaXRpZXMpO1xuXG4gICAgLy8gY2FjaGUgY3VycmVudFxuICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldCgnX3l6X2N1cnJlbnQnLCB7XG4gICAgICB0ZXh0OiBjdXJyZW50TWVudS50ZXh0LFxuICAgICAgaW50cm86IGN1cnJlbnRNZW51LmludHJvLFxuICAgICAgaWNvbjogY3VycmVudE1lbnUuYXBwSWNvblVybFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBZelN0YXJ0dXBTZXJ2aWNlRmFjdG9yeShzdGFydHVwU2VydmljZTogWXpTdGFydHVwU2VydmljZSk6ICgpID0+IE9ic2VydmFibGU8dm9pZD4ge1xuICByZXR1cm4gKCkgPT4gc3RhcnR1cFNlcnZpY2UubG9hZCgpO1xufVxuXG4vL0B0cy1pZ25vcmVcbmV4cG9ydCBjb25zdCBZWl9BUFBJTklUX1BST1ZJREVTID0gW1xuICBZelN0YXJ0dXBTZXJ2aWNlLFxuICB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IFl6U3RhcnR1cFNlcnZpY2VGYWN0b3J5LFxuICAgIGRlcHM6IFtZelN0YXJ0dXBTZXJ2aWNlXSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XG5dO1xuIl19