import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { WINDOW, deepCopy, log, useLocalStorageCurrent, useLocalStorageUser, useLocalStorageDefaultRoute } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from './bis.config';
import { ICONS } from './icon/style-icons';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
import * as i2 from "@yelon/theme";
import * as i3 from "@yelon/acl";
import * as i4 from "./yunzai-auth.service";
import * as i5 from "@yelon/util";
import * as i6 from "./yunzai-i18n.service";
export class YunzaiStartupService {
    constructor(iconSrv, menuService, i18n, win, settingService, aclService, titleService, yzAuthService, configService) {
        this.menuService = menuService;
        this.i18n = i18n;
        this.win = win;
        this.settingService = settingService;
        this.aclService = aclService;
        this.titleService = titleService;
        this.yzAuthService = yzAuthService;
        this.configService = configService;
        this.config = BUSINESS_DEFAULT_CONFIG;
        this.config = mergeBisConfig(this.configService);
        iconSrv.addIcon(...ICONS);
    }
    load() {
        log('startup.service: ', 'load');
        let defaultLang = this.settingService.layout.lang || this.i18n.defaultLang;
        return this.yzAuthService.login().pipe(mergeMap(() => {
            return this.i18n.loadLangData(defaultLang);
        }), mergeMap((langData) => {
            log('startup.service: ', 'set i18n, defaultLang->', defaultLang, ' langData->', langData);
            this.i18n.use(defaultLang, langData);
            return of(void 0);
        }), mergeMap((v) => {
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
        const [setCurrent] = useLocalStorageCurrent();
        const [, getUser] = useLocalStorageUser();
        const [setDefaultRoute] = useLocalStorageDefaultRoute();
        const yunzaiUser = getUser();
        // @ts-ignore
        const yunzaiMenus = deepCopy(yunzaiUser.menu).filter(m => m.systemCode && m.systemCode === this.config.systemCode);
        mapYzSideToYelonMenu(yunzaiMenus);
        const currentMenu = yunzaiMenus.pop();
        if (currentMenu) {
            this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
            this.settingService.setUser({
                name: yunzaiUser.realname,
                avatar: `${this.config.baseUrl}/filecenter/file/${yunzaiUser.avatarId}` || '',
                email: yunzaiUser.email
            });
            this.titleService.default = currentMenu && currentMenu.text ? currentMenu.text : 'default application name';
            this.titleService.setTitle(currentMenu && currentMenu.text ? currentMenu.text : 'no title');
            const abilities = [];
            generateAbility([currentMenu], abilities, '');
            this.aclService.attachRole(yunzaiUser?.roles
                .map((role) => {
                return role.roleValue;
            })
                .filter((a) => !!a) || []);
            this.aclService.attachAbility(abilities);
            this.menuService.add([currentMenu]);
            setCurrent({
                name: currentMenu.text,
                intro: currentMenu.intro || '',
                icon: currentMenu.appIconUrl || './assets/tmp/img/avatar.jpg'
            });
            const attributes = currentMenu.attribute;
            if (attributes) {
                const attr = JSON.parse(attributes);
                if (attr && attr.defaultRoute) {
                    setDefaultRoute(attr.defaultRoute);
                }
                else {
                    setDefaultRoute('/displayIndex');
                }
            }
            else {
                setDefaultRoute('/displayIndex');
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiStartupService, deps: [{ token: i1.NzIconService }, { token: i2.MenuService }, { token: YUNZAI_I18N_TOKEN }, { token: WINDOW }, { token: i2.SettingsService }, { token: i3.ACLService }, { token: i2.TitleService }, { token: i4.YunzaiAuthService }, { token: i5.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiStartupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiStartupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzIconService }, { type: i2.MenuService }, { type: i6.YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: i2.SettingsService }, { type: i3.ACLService }, { type: i2.TitleService }, { type: i4.YunzaiAuthService }, { type: i5.YunzaiConfigService }]; } });
export function mapYzSideToYelonMenu(menus) {
    menus.forEach(menu => {
        if (menu.children && menu.hideChildren) {
            menu.children.forEach(c => (c.hide = true));
        }
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
export function YunzaiStartupServiceFactory(startupService) {
    return () => startupService.load();
}
//@ts-ignore
export const YUNZAI_APPINIT_PROVIDES = [
    YunzaiStartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: YunzaiStartupServiceFactory,
        deps: [YunzaiStartupService],
        multi: true
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXN0YXJ0dXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQveXVuemFpLXN0YXJ0dXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFhLFFBQVEsRUFBRSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHOUMsT0FBTyxFQUFtRCxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNqRyxPQUFPLEVBRUwsTUFBTSxFQUdOLFFBQVEsRUFDUixHQUFHLEVBRUgsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDNUIsTUFBTSxhQUFhLENBQUM7QUFJckIsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGNBQWMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7O0FBS3pDLE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFDRSxPQUFzQixFQUNkLFdBQXdCLEVBQ0csSUFBdUIsRUFDbEMsR0FBYyxFQUM5QixjQUErQixFQUMvQixVQUFzQixFQUN0QixZQUEwQixFQUMxQixhQUFnQyxFQUNoQyxhQUFrQztRQVBsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNHLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2xDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQVhwQyxXQUFNLEdBQXlCLHVCQUF1QixDQUFDO1FB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LElBQUksQ0FBQyxFQUFFO1FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxNQUFNLElBQUksRUFBRSxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRTtnQkFDbkMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLDJCQUEyQixDQUFDLGNBQW9DO0lBQzlFLE9BQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLENBQUM7QUFFRCxZQUFZO0FBQ1osTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUc7SUFDckMsb0JBQW9CO0lBQ3BCO1FBQ0UsT0FBTyxFQUFFLGVBQWU7UUFDeEIsVUFBVSxFQUFFLDJCQUEyQjtRQUN2QyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztRQUM1QixLQUFLLEVBQUUsSUFBSTtLQUNaO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBtZXJnZU1hcCwgb2Z9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FDTFNlcnZpY2V9IGZyb20gJ0B5ZWxvbi9hY2wnO1xuaW1wb3J0IHtNZW51LCBNZW51U2VydmljZSwgU2V0dGluZ3NTZXJ2aWNlLCBUaXRsZVNlcnZpY2UsIFlVTlpBSV9JMThOX1RPS0VOfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtcbiAgWXVuemFpTWVudSxcbiAgV0lORE9XLFxuICBZdW56YWlCdXNpbmVzc0NvbmZpZyxcbiAgWXVuemFpQ29uZmlnU2VydmljZSxcbiAgZGVlcENvcHksXG4gIGxvZyxcbiAgWXVuemFpTWVudUF0dHJpYnV0ZSxcbiAgdXNlTG9jYWxTdG9yYWdlQ3VycmVudCxcbiAgdXNlTG9jYWxTdG9yYWdlVXNlcixcbiAgdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7TnpTYWZlQW55fSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHtOekljb25TZXJ2aWNlfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQge0JVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZ30gZnJvbSAnLi9iaXMuY29uZmlnJztcbmltcG9ydCB7SUNPTlN9IGZyb20gJy4vaWNvbi9zdHlsZS1pY29ucyc7XG5pbXBvcnQge1l1bnphaUF1dGhTZXJ2aWNlfSBmcm9tICcuL3l1bnphaS1hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHtZdW56YWlJMThOU2VydmljZX0gZnJvbSAnLi95dW56YWktaTE4bi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl1bnphaVN0YXJ0dXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IFl1bnphaUJ1c2luZXNzQ29uZmlnID0gQlVTSU5FU1NfREVGQVVMVF9DT05GSUc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaWNvblNydjogTnpJY29uU2VydmljZSxcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcbiAgICBASW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOKSBwcml2YXRlIGkxOG46IFl1bnphaUkxOE5TZXJ2aWNlLFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbjogTnpTYWZlQW55LFxuICAgIHByaXZhdGUgc2V0dGluZ1NlcnZpY2U6IFNldHRpbmdzU2VydmljZSxcbiAgICBwcml2YXRlIGFjbFNlcnZpY2U6IEFDTFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0aXRsZVNlcnZpY2U6IFRpdGxlU2VydmljZSxcbiAgICBwcml2YXRlIHl6QXV0aFNlcnZpY2U6IFl1bnphaUF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogWXVuemFpQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbmZpZyA9IG1lcmdlQmlzQ29uZmlnKHRoaXMuY29uZmlnU2VydmljZSk7XG4gICAgaWNvblNydi5hZGRJY29uKC4uLklDT05TKTtcbiAgfVxuXG4gIGxvYWQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgbG9nKCdzdGFydHVwLnNlcnZpY2U6ICcsICdsb2FkJyk7XG4gICAgbGV0IGRlZmF1bHRMYW5nOiBzdHJpbmcgPSB0aGlzLnNldHRpbmdTZXJ2aWNlLmxheW91dC5sYW5nIHx8IHRoaXMuaTE4bi5kZWZhdWx0TGFuZztcbiAgICByZXR1cm4gdGhpcy55ekF1dGhTZXJ2aWNlLmxvZ2luKCkucGlwZShcbiAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaTE4bi5sb2FkTGFuZ0RhdGEoZGVmYXVsdExhbmcpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgobGFuZ0RhdGEpID0+IHtcbiAgICAgICAgbG9nKCdzdGFydHVwLnNlcnZpY2U6ICcsICdzZXQgaTE4biwgZGVmYXVsdExhbmctPicsIGRlZmF1bHRMYW5nLCAnIGxhbmdEYXRhLT4nLCBsYW5nRGF0YSk7XG4gICAgICAgIHRoaXMuaTE4bi51c2UoZGVmYXVsdExhbmchLCBsYW5nRGF0YSk7XG4gICAgICAgIHJldHVybiBvZih2b2lkIDApXG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKCh2KSA9PiB7XG4gICAgICAgIHRoaXMuc3lzdGVtSW5pdCgpO1xuICAgICAgICBsb2coJ3N0YXJ0dXAuc2VydmljZTogcHJlbG9hZGVyIGZpbmlzaCcpO1xuICAgICAgICBpZiAodGhpcy53aW4gJiYgdGhpcy53aW4uYXBwQm9vdHN0cmFwKSB7XG4gICAgICAgICAgdGhpcy53aW4uYXBwQm9vdHN0cmFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKHYpO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBzeXN0ZW1Jbml0KCk6IHZvaWQge1xuICAgIGxvZygnc3RhcnR1cC5zZXJ2aWNlOiBzeXN0ZW0gaW5pdCcpO1xuICAgIGNvbnN0IFtzZXRDdXJyZW50XSA9IHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQoKTtcbiAgICBjb25zdCBbLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCBbc2V0RGVmYXVsdFJvdXRlXSA9IHVzZUxvY2FsU3RvcmFnZURlZmF1bHRSb3V0ZSgpO1xuICAgIGNvbnN0IHl1bnphaVVzZXIgPSBnZXRVc2VyKCkhO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB5dW56YWlNZW51czogWXVuemFpTWVudVtdID0gZGVlcENvcHkoeXVuemFpVXNlci5tZW51KS5maWx0ZXIoXG4gICAgICBtID0+IG0uc3lzdGVtQ29kZSAmJiBtLnN5c3RlbUNvZGUgPT09IHRoaXMuY29uZmlnLnN5c3RlbUNvZGVcbiAgICApO1xuICAgIG1hcFl6U2lkZVRvWWVsb25NZW51KHl1bnphaU1lbnVzKTtcbiAgICBjb25zdCBjdXJyZW50TWVudSA9IHl1bnphaU1lbnVzLnBvcCgpO1xuICAgIGlmIChjdXJyZW50TWVudSkge1xuICAgICAgdGhpcy5zZXR0aW5nU2VydmljZS5zZXRBcHAoe25hbWU6IGN1cnJlbnRNZW51LnRleHQsIGRlc2NyaXB0aW9uOiBjdXJyZW50TWVudS5pbnRyb30pO1xuICAgICAgdGhpcy5zZXR0aW5nU2VydmljZS5zZXRVc2VyKHtcbiAgICAgICAgbmFtZTogeXVuemFpVXNlci5yZWFsbmFtZSxcbiAgICAgICAgYXZhdGFyOiBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9maWxlY2VudGVyL2ZpbGUvJHt5dW56YWlVc2VyLmF2YXRhcklkfWAgfHwgJycsXG4gICAgICAgIGVtYWlsOiB5dW56YWlVc2VyLmVtYWlsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudGl0bGVTZXJ2aWNlLmRlZmF1bHQgPSBjdXJyZW50TWVudSAmJiBjdXJyZW50TWVudS50ZXh0ID8gY3VycmVudE1lbnUudGV4dCA6ICdkZWZhdWx0IGFwcGxpY2F0aW9uIG5hbWUnO1xuICAgICAgdGhpcy50aXRsZVNlcnZpY2Uuc2V0VGl0bGUoY3VycmVudE1lbnUgJiYgY3VycmVudE1lbnUudGV4dCA/IGN1cnJlbnRNZW51LnRleHQgOiAnbm8gdGl0bGUnKTtcbiAgICAgIGNvbnN0IGFiaWxpdGllczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGdlbmVyYXRlQWJpbGl0eShbY3VycmVudE1lbnVdLCBhYmlsaXRpZXMsICcnKTtcbiAgICAgIHRoaXMuYWNsU2VydmljZS5hdHRhY2hSb2xlKFxuICAgICAgICB5dW56YWlVc2VyPy5yb2xlc1xuICAgICAgICAgIC5tYXAoKHJvbGU6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJvbGUucm9sZVZhbHVlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcigoYTogTnpTYWZlQW55KSA9PiAhIWEpIHx8IFtdXG4gICAgICApO1xuICAgICAgdGhpcy5hY2xTZXJ2aWNlLmF0dGFjaEFiaWxpdHkoYWJpbGl0aWVzKTtcbiAgICAgIHRoaXMubWVudVNlcnZpY2UuYWRkKFtjdXJyZW50TWVudSBhcyBNZW51XSk7XG4gICAgICBzZXRDdXJyZW50KHtcbiAgICAgICAgbmFtZTogY3VycmVudE1lbnUudGV4dCxcbiAgICAgICAgaW50cm86IGN1cnJlbnRNZW51LmludHJvIHx8ICcnLFxuICAgICAgICBpY29uOiBjdXJyZW50TWVudS5hcHBJY29uVXJsIHx8ICcuL2Fzc2V0cy90bXAvaW1nL2F2YXRhci5qcGcnXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBjdXJyZW50TWVudS5hdHRyaWJ1dGU7XG4gICAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICBjb25zdCBhdHRyOiBZdW56YWlNZW51QXR0cmlidXRlID0gSlNPTi5wYXJzZShhdHRyaWJ1dGVzKTtcbiAgICAgICAgaWYgKGF0dHIgJiYgYXR0ci5kZWZhdWx0Um91dGUpIHtcbiAgICAgICAgICBzZXREZWZhdWx0Um91dGUoYXR0ci5kZWZhdWx0Um91dGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldERlZmF1bHRSb3V0ZSgnL2Rpc3BsYXlJbmRleCcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXREZWZhdWx0Um91dGUoJy9kaXNwbGF5SW5kZXgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFl6U2lkZVRvWWVsb25NZW51KG1lbnVzOiBZdW56YWlNZW51W10pOiB2b2lkIHtcbiAgbWVudXMuZm9yRWFjaChtZW51ID0+IHtcbiAgICBpZiAobWVudS5jaGlsZHJlbiAmJiBtZW51LmhpZGVDaGlsZHJlbikge1xuICAgICAgbWVudS5jaGlsZHJlbi5mb3JFYWNoKGMgPT4gKGMuaGlkZSA9IHRydWUpKTtcbiAgICB9XG4gICAgbWVudS5iYWRnZURvdCA9IG1lbnUuYmFkZ2VfZG90IHx8IG51bGw7XG4gICAgbWVudS5iYWRnZVN0YXR1cyA9IG1lbnUuYmFkZ2Vfc3RhdHVzIHx8IG51bGw7XG4gICAgbWVudS5zaG9ydGN1dFJvb3QgPSBtZW51LnNob3J0Y3V0X3Jvb3QgfHwgbnVsbDtcbiAgICBtZW51LnJldXNlID0gdHJ1ZTtcbiAgICBpZiAobWVudS5jaGlsZHJlbikge1xuICAgICAgbWFwWXpTaWRlVG9ZZWxvbk1lbnUobWVudS5jaGlsZHJlbik7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQWJpbGl0eShtZW51czogWXVuemFpTWVudVtdLCBhYmlsaXRpZXM6IHN0cmluZ1tdLCBwcmVmaXg6IHN0cmluZyk6IHZvaWQge1xuICBtZW51cy5mb3JFYWNoKG1lbnUgPT4ge1xuICAgIGlmIChtZW51LmxpbmspIHtcbiAgICAgIHByZWZpeCArPSBtZW51Lmxpbms7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeCArPSAnJztcbiAgICB9XG4gICAgaWYgKG1lbnUubWVudUF1dGhzKSB7XG4gICAgICBtZW51Lm1lbnVBdXRocy5mb3JFYWNoKChhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgYWJpbGl0aWVzLnB1c2goYCR7cHJlZml4fToke2F9YCk7XG4gICAgICAgIGFiaWxpdGllcy5wdXNoKGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1lbnUuY2hpbGRyZW4pIHtcbiAgICAgIGdlbmVyYXRlQWJpbGl0eShtZW51LmNoaWxkcmVuLCBhYmlsaXRpZXMsIHByZWZpeCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFl1bnphaVN0YXJ0dXBTZXJ2aWNlRmFjdG9yeShzdGFydHVwU2VydmljZTogWXVuemFpU3RhcnR1cFNlcnZpY2UpOiAoKSA9PiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgcmV0dXJuICgpID0+IHN0YXJ0dXBTZXJ2aWNlLmxvYWQoKTtcbn1cblxuLy9AdHMtaWdub3JlXG5leHBvcnQgY29uc3QgWVVOWkFJX0FQUElOSVRfUFJPVklERVMgPSBbXG4gIFl1bnphaVN0YXJ0dXBTZXJ2aWNlLFxuICB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IFl1bnphaVN0YXJ0dXBTZXJ2aWNlRmFjdG9yeSxcbiAgICBkZXBzOiBbWXVuemFpU3RhcnR1cFNlcnZpY2VdLFxuICAgIG11bHRpOiB0cnVlXG4gIH1cbl07XG4iXX0=