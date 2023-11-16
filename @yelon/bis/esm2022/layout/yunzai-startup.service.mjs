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
        }), mergeMap(langData => {
            log('startup.service: ', 'set i18n, defaultLang->', defaultLang, ' langData->', langData);
            this.i18n.use(defaultLang, langData);
            return of(void 0);
        }), mergeMap(v => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXN0YXJ0dXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQveXVuemFpLXN0YXJ0dXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFjLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHaEQsT0FBTyxFQUFvRCxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuRyxPQUFPLEVBRUwsTUFBTSxFQUdOLFFBQVEsRUFDUixHQUFHLEVBRUgsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDNUIsTUFBTSxhQUFhLENBQUM7QUFJckIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7O0FBSzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFDRSxPQUFzQixFQUNkLFdBQXdCLEVBQ0csSUFBdUIsRUFDbEMsR0FBYyxFQUM5QixjQUErQixFQUMvQixVQUFzQixFQUN0QixZQUEwQixFQUMxQixhQUFnQyxFQUNoQyxhQUFrQztRQVBsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNHLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2xDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQVhwQyxXQUFNLEdBQXlCLHVCQUF1QixDQUFDO1FB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LEVBQUU7UUFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDckI7YUFBTTtZQUNMLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO2dCQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsY0FBb0M7SUFDOUUsT0FBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckMsQ0FBQztBQUVELFlBQVk7QUFDWixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRztJQUNyQyxvQkFBb0I7SUFDcEI7UUFDRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1FBQzVCLEtBQUssRUFBRSxJQUFJO0tBQ1o7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlTWFwLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBQ0xTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2FjbCc7XG5pbXBvcnQgeyBNZW51LCBNZW51U2VydmljZSwgU2V0dGluZ3NTZXJ2aWNlLCBUaXRsZVNlcnZpY2UsIFlVTlpBSV9JMThOX1RPS0VOIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIFl1bnphaU1lbnUsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIGRlZXBDb3B5LFxuICBsb2csXG4gIFl1bnphaU1lbnVBdHRyaWJ1dGUsXG4gIHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQsXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIHVzZUxvY2FsU3RvcmFnZURlZmF1bHRSb3V0ZVxufSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpJY29uU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4vYmlzLmNvbmZpZyc7XG5pbXBvcnQgeyBJQ09OUyB9IGZyb20gJy4vaWNvbi9zdHlsZS1pY29ucyc7XG5pbXBvcnQgeyBZdW56YWlBdXRoU2VydmljZSB9IGZyb20gJy4veXVuemFpLWF1dGguc2VydmljZSc7XG5pbXBvcnQgeyBZdW56YWlJMThOU2VydmljZSB9IGZyb20gJy4veXVuemFpLWkxOG4uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBZdW56YWlTdGFydHVwU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnOiBZdW56YWlCdXNpbmVzc0NvbmZpZyA9IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGljb25TcnY6IE56SWNvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtZW51U2VydmljZTogTWVudVNlcnZpY2UsXG4gICAgQEluamVjdChZVU5aQUlfSTE4Tl9UT0tFTikgcHJpdmF0ZSBpMThuOiBZdW56YWlJMThOU2VydmljZSxcbiAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW46IE56U2FmZUFueSxcbiAgICBwcml2YXRlIHNldHRpbmdTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2xTZXJ2aWNlOiBBQ0xTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGl0bGVTZXJ2aWNlOiBUaXRsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB5ekF1dGhTZXJ2aWNlOiBZdW56YWlBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICAgIGljb25TcnYuYWRkSWNvbiguLi5JQ09OUyk7XG4gIH1cblxuICBsb2FkKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGxvZygnc3RhcnR1cC5zZXJ2aWNlOiAnLCAnbG9hZCcpO1xuICAgIGxldCBkZWZhdWx0TGFuZzogc3RyaW5nID0gdGhpcy5zZXR0aW5nU2VydmljZS5sYXlvdXQubGFuZyB8fCB0aGlzLmkxOG4uZGVmYXVsdExhbmc7XG4gICAgcmV0dXJuIHRoaXMueXpBdXRoU2VydmljZS5sb2dpbigpLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmkxOG4ubG9hZExhbmdEYXRhKGRlZmF1bHRMYW5nKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAobGFuZ0RhdGEgPT4ge1xuICAgICAgICBsb2coJ3N0YXJ0dXAuc2VydmljZTogJywgJ3NldCBpMThuLCBkZWZhdWx0TGFuZy0+JywgZGVmYXVsdExhbmcsICcgbGFuZ0RhdGEtPicsIGxhbmdEYXRhKTtcbiAgICAgICAgdGhpcy5pMThuLnVzZShkZWZhdWx0TGFuZyEsIGxhbmdEYXRhKTtcbiAgICAgICAgcmV0dXJuIG9mKHZvaWQgMCk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKHYgPT4ge1xuICAgICAgICB0aGlzLnN5c3RlbUluaXQoKTtcbiAgICAgICAgbG9nKCdzdGFydHVwLnNlcnZpY2U6IHByZWxvYWRlciBmaW5pc2gnKTtcbiAgICAgICAgaWYgKHRoaXMud2luICYmIHRoaXMud2luLmFwcEJvb3RzdHJhcCkge1xuICAgICAgICAgIHRoaXMud2luLmFwcEJvb3RzdHJhcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZih2KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHN5c3RlbUluaXQoKTogdm9pZCB7XG4gICAgbG9nKCdzdGFydHVwLnNlcnZpY2U6IHN5c3RlbSBpbml0Jyk7XG4gICAgY29uc3QgW3NldEN1cnJlbnRdID0gdXNlTG9jYWxTdG9yYWdlQ3VycmVudCgpO1xuICAgIGNvbnN0IFssIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGNvbnN0IFtzZXREZWZhdWx0Um91dGVdID0gdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlKCk7XG4gICAgY29uc3QgeXVuemFpVXNlciA9IGdldFVzZXIoKSE7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHl1bnphaU1lbnVzOiBZdW56YWlNZW51W10gPSBkZWVwQ29weSh5dW56YWlVc2VyLm1lbnUpLmZpbHRlcihcbiAgICAgIG0gPT4gbS5zeXN0ZW1Db2RlICYmIG0uc3lzdGVtQ29kZSA9PT0gdGhpcy5jb25maWcuc3lzdGVtQ29kZVxuICAgICk7XG4gICAgbWFwWXpTaWRlVG9ZZWxvbk1lbnUoeXVuemFpTWVudXMpO1xuICAgIGNvbnN0IGN1cnJlbnRNZW51ID0geXVuemFpTWVudXMucG9wKCk7XG4gICAgaWYgKGN1cnJlbnRNZW51KSB7XG4gICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLnNldEFwcCh7IG5hbWU6IGN1cnJlbnRNZW51LnRleHQsIGRlc2NyaXB0aW9uOiBjdXJyZW50TWVudS5pbnRybyB9KTtcbiAgICAgIHRoaXMuc2V0dGluZ1NlcnZpY2Uuc2V0VXNlcih7XG4gICAgICAgIG5hbWU6IHl1bnphaVVzZXIucmVhbG5hbWUsXG4gICAgICAgIGF2YXRhcjogYCR7dGhpcy5jb25maWcuYmFzZVVybH0vZmlsZWNlbnRlci9maWxlLyR7eXVuemFpVXNlci5hdmF0YXJJZH1gIHx8ICcnLFxuICAgICAgICBlbWFpbDogeXVuemFpVXNlci5lbWFpbFxuICAgICAgfSk7XG4gICAgICB0aGlzLnRpdGxlU2VydmljZS5kZWZhdWx0ID0gY3VycmVudE1lbnUgJiYgY3VycmVudE1lbnUudGV4dCA/IGN1cnJlbnRNZW51LnRleHQgOiAnZGVmYXVsdCBhcHBsaWNhdGlvbiBuYW1lJztcbiAgICAgIHRoaXMudGl0bGVTZXJ2aWNlLnNldFRpdGxlKGN1cnJlbnRNZW51ICYmIGN1cnJlbnRNZW51LnRleHQgPyBjdXJyZW50TWVudS50ZXh0IDogJ25vIHRpdGxlJyk7XG4gICAgICBjb25zdCBhYmlsaXRpZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBnZW5lcmF0ZUFiaWxpdHkoW2N1cnJlbnRNZW51XSwgYWJpbGl0aWVzLCAnJyk7XG4gICAgICB0aGlzLmFjbFNlcnZpY2UuYXR0YWNoUm9sZShcbiAgICAgICAgeXVuemFpVXNlcj8ucm9sZXNcbiAgICAgICAgICAubWFwKChyb2xlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb2xlLnJvbGVWYWx1ZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoKGE6IE56U2FmZUFueSkgPT4gISFhKSB8fCBbXVxuICAgICAgKTtcbiAgICAgIHRoaXMuYWNsU2VydmljZS5hdHRhY2hBYmlsaXR5KGFiaWxpdGllcyk7XG4gICAgICB0aGlzLm1lbnVTZXJ2aWNlLmFkZChbY3VycmVudE1lbnUgYXMgTWVudV0pO1xuICAgICAgc2V0Q3VycmVudCh7XG4gICAgICAgIG5hbWU6IGN1cnJlbnRNZW51LnRleHQsXG4gICAgICAgIGludHJvOiBjdXJyZW50TWVudS5pbnRybyB8fCAnJyxcbiAgICAgICAgaWNvbjogY3VycmVudE1lbnUuYXBwSWNvblVybCB8fCAnLi9hc3NldHMvdG1wL2ltZy9hdmF0YXIuanBnJ1xuICAgICAgfSk7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gY3VycmVudE1lbnUuYXR0cmlidXRlO1xuICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgY29uc3QgYXR0cjogWXVuemFpTWVudUF0dHJpYnV0ZSA9IEpTT04ucGFyc2UoYXR0cmlidXRlcyk7XG4gICAgICAgIGlmIChhdHRyICYmIGF0dHIuZGVmYXVsdFJvdXRlKSB7XG4gICAgICAgICAgc2V0RGVmYXVsdFJvdXRlKGF0dHIuZGVmYXVsdFJvdXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXREZWZhdWx0Um91dGUoJy9kaXNwbGF5SW5kZXgnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RGVmYXVsdFJvdXRlKCcvZGlzcGxheUluZGV4Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBZelNpZGVUb1llbG9uTWVudShtZW51czogWXVuemFpTWVudVtdKTogdm9pZCB7XG4gIG1lbnVzLmZvckVhY2gobWVudSA9PiB7XG4gICAgaWYgKG1lbnUuY2hpbGRyZW4gJiYgbWVudS5oaWRlQ2hpbGRyZW4pIHtcbiAgICAgIG1lbnUuY2hpbGRyZW4uZm9yRWFjaChjID0+IChjLmhpZGUgPSB0cnVlKSk7XG4gICAgfVxuICAgIG1lbnUuYmFkZ2VEb3QgPSBtZW51LmJhZGdlX2RvdCB8fCBudWxsO1xuICAgIG1lbnUuYmFkZ2VTdGF0dXMgPSBtZW51LmJhZGdlX3N0YXR1cyB8fCBudWxsO1xuICAgIG1lbnUuc2hvcnRjdXRSb290ID0gbWVudS5zaG9ydGN1dF9yb290IHx8IG51bGw7XG4gICAgbWVudS5yZXVzZSA9IHRydWU7XG4gICAgaWYgKG1lbnUuY2hpbGRyZW4pIHtcbiAgICAgIG1hcFl6U2lkZVRvWWVsb25NZW51KG1lbnUuY2hpbGRyZW4pO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFiaWxpdHkobWVudXM6IFl1bnphaU1lbnVbXSwgYWJpbGl0aWVzOiBzdHJpbmdbXSwgcHJlZml4OiBzdHJpbmcpOiB2b2lkIHtcbiAgbWVudXMuZm9yRWFjaChtZW51ID0+IHtcbiAgICBpZiAobWVudS5saW5rKSB7XG4gICAgICBwcmVmaXggKz0gbWVudS5saW5rO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXggKz0gJyc7XG4gICAgfVxuICAgIGlmIChtZW51Lm1lbnVBdXRocykge1xuICAgICAgbWVudS5tZW51QXV0aHMuZm9yRWFjaCgoYTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGFiaWxpdGllcy5wdXNoKGAke3ByZWZpeH06JHthfWApO1xuICAgICAgICBhYmlsaXRpZXMucHVzaChhKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChtZW51LmNoaWxkcmVuKSB7XG4gICAgICBnZW5lcmF0ZUFiaWxpdHkobWVudS5jaGlsZHJlbiwgYWJpbGl0aWVzLCBwcmVmaXgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBZdW56YWlTdGFydHVwU2VydmljZUZhY3Rvcnkoc3RhcnR1cFNlcnZpY2U6IFl1bnphaVN0YXJ0dXBTZXJ2aWNlKTogKCkgPT4gT2JzZXJ2YWJsZTx2b2lkPiB7XG4gIHJldHVybiAoKSA9PiBzdGFydHVwU2VydmljZS5sb2FkKCk7XG59XG5cbi8vQHRzLWlnbm9yZVxuZXhwb3J0IGNvbnN0IFlVTlpBSV9BUFBJTklUX1BST1ZJREVTID0gW1xuICBZdW56YWlTdGFydHVwU2VydmljZSxcbiAge1xuICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICB1c2VGYWN0b3J5OiBZdW56YWlTdGFydHVwU2VydmljZUZhY3RvcnksXG4gICAgZGVwczogW1l1bnphaVN0YXJ0dXBTZXJ2aWNlXSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XG5dO1xuIl19