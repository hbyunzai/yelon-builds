import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, inject, Injectable } from '@angular/core';
import { combineLatest, map, mergeMap, of } from 'rxjs';
import { ACLService } from '@yelon/acl';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { mergeBisConfig } from '@yelon/bis/config';
import { MenuService, SettingsService, TitleService, YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { deepCopy, useLocalStorageCurrent, useLocalStorageDefaultRoute, useLocalStorageHeader, useLocalStorageProjectInfo, useLocalStorageTenant, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import * as i0 from "@angular/core";
export function provideYunzaiStartup() {
    return [
        YunzaiStartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: (startupService) => () => startupService.load(),
            deps: [YunzaiStartupService],
            multi: true
        }
    ];
}
export class YunzaiStartupService {
    constructor() {
        this.config = mergeBisConfig(inject(YunzaiConfigService));
        this.menuService = inject(MenuService);
        this.aclService = inject(ACLService);
        this.titleService = inject(TitleService);
        this.tokenService = inject(YA_SERVICE_TOKEN);
        this.httpClient = inject(HttpClient);
        this.settingService = inject(SettingsService);
        this.i18n = inject(YUNZAI_I18N_TOKEN);
        this.win = inject(WINDOW);
        this.configService = inject(YunzaiConfigService);
    }
    load() {
        let defaultLang = this.settingService.layout.lang || this.i18n.defaultLang;
        const [setTenant] = useLocalStorageTenant();
        const [setUser, getUser] = useLocalStorageUser();
        const [setHeader] = useLocalStorageHeader();
        const [setProject] = useLocalStorageProjectInfo();
        const [setDefaultRoute] = useLocalStorageDefaultRoute();
        const [setCurrent] = useLocalStorageCurrent();
        return this.token().pipe(mergeMap((token) => {
            this.configService.set('auth', {
                token_send_key: 'Authorization',
                token_send_template: `${token.token_type} \${access_token}`,
                token_send_place: 'header'
            });
            this.tokenService.set(token);
            return of(void 0);
        }), mergeMap(() => {
            return combineLatest([
                this.httpClient.get(`/auth/user`),
                this.httpClient.get(`/auth/allheader/v2`),
                this.httpClient.get(`/app-manager/project/info`)
            ]).pipe(map(([user, header, project]) => {
                setUser(user.principal);
                setTenant(user.tenantId);
                setHeader(header.data);
                setProject(project.data);
                return void 0;
            }));
        }), mergeMap(() => {
            return this.i18n.loadLangData(defaultLang).pipe(map((langData) => {
                this.i18n.use(defaultLang, langData);
                return void 0;
            }));
        }), mergeMap(() => {
            const yunzaiUser = getUser();
            const yunzaiMenus = deepCopy(yunzaiUser.menu).filter(m => m.systemCode && m.systemCode === this.config.systemCode);
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
            return of(void 0);
        }));
    }
    token() {
        if (this.config.loginForm) {
            return this.httpClient.post(`/auth/oauth/token?_allow_anonymous=true`, this.config.loginForm).pipe(map((response) => {
                return response;
            }));
        }
        else {
            const uri = encodeURIComponent(this.win.location.href);
            return this.httpClient
                .get(`/cas-proxy/app/validate_full?callback=${uri}&_allow_anonymous=true&timestamp=${new Date().getTime()}`)
                .pipe(map((response) => {
                switch (response.errcode) {
                    case 2000:
                        return response.data;
                    case 2001:
                        this.win.location.href = response.msg;
                        throw Error("Cookie Error: Can't find Cas Cookie,So jump to login!");
                    default:
                        if (response.data) {
                            console.error(response.data);
                            throw Error(response.data);
                        }
                        else if (response.msg) {
                            console.error(response.msg);
                            throw Error(response.msg);
                        }
                        else {
                            console.error('cas unknown error');
                            throw Error('Unknown Error: Cas auth exception!');
                        }
                }
            }));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiStartupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiStartupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiStartupService, decorators: [{
            type: Injectable
        }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy9zdGFydHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFlLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBRUwsV0FBVyxFQUNYLGVBQWUsRUFDZixZQUFZLEVBQ1osaUJBQWlCLEVBRWxCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFDTCxRQUFRLEVBQ1Isc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzFCLHFCQUFxQixFQUNyQixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG1CQUFtQixFQUdwQixNQUFNLGFBQWEsQ0FBQzs7QUFHckIsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxPQUFPO1FBQ0wsb0JBQW9CO1FBQ3BCO1lBQ0UsT0FBTyxFQUFFLGVBQWU7WUFDeEIsVUFBVSxFQUFFLENBQUMsY0FBb0MsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTtZQUNqRixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUM1QixLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLE9BQU8sb0JBQW9CO0lBRGpDO1FBRW1CLFdBQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUNyRCxnQkFBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxlQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLGlCQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsZUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxtQkFBYyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxTQUFJLEdBQUcsTUFBTSxDQUF3QixpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hELFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsa0JBQWEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQThIOUQ7SUE1SEMsSUFBSTtRQUNGLElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNuRixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFDakQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDNUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLDBCQUEwQixFQUFFLENBQUM7UUFDbEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLDJCQUEyQixFQUFFLENBQUM7UUFDeEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLHNCQUFzQixFQUFFLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUN0QixRQUFRLENBQUMsQ0FBQyxLQUFrQixFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUM3QixjQUFjLEVBQUUsZUFBZTtnQkFDL0IsbUJBQW1CLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxtQkFBbUI7Z0JBQzNELGdCQUFnQixFQUFFLFFBQVE7YUFDM0IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsRUFDRixRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxhQUFhLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztnQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO2FBQ2pELENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBWSxFQUFFLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDN0MsR0FBRyxDQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDWixNQUFNLFVBQVUsR0FBRyxPQUFPLEVBQUcsQ0FBQztZQUM5QixNQUFNLFdBQVcsR0FBaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQ2hFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUM3RCxDQUFDO1lBQ0YsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RDLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztvQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRO29CQUN6QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sb0JBQW9CLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFO29CQUM3RSxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7aUJBQ3hCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUM7Z0JBQzVHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO2dCQUMvQixlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixVQUFVLEVBQUUsS0FBSztxQkFDZCxHQUFHLENBQUMsQ0FBQyxJQUFlLEVBQUUsRUFBRTtvQkFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN4QixDQUFDLENBQUM7cUJBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUN2QyxDQUFDO2dCQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxVQUFVLENBQUM7b0JBQ1QsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO29CQUN0QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM5QixJQUFJLEVBQUUsV0FBVyxDQUFDLFVBQVUsSUFBSSw2QkFBNkI7aUJBQzlELENBQUMsQ0FBQztnQkFDSCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO2dCQUN6QyxJQUFJLFVBQVUsRUFBRSxDQUFDO29CQUNmLE1BQU0sSUFBSSxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQzlCLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3JDLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ25DLENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNILENBQUM7WUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNoRyxHQUFHLENBQUMsQ0FBQyxRQUFtQixFQUFFLEVBQUU7Z0JBQzFCLE9BQU8sUUFBUSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDLFVBQVU7aUJBQ25CLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRyxvQ0FBb0MsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2lCQUMzRyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFO2dCQUMxQixRQUFRLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDekIsS0FBSyxJQUFJO3dCQUNQLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDdkIsS0FBSyxJQUFJO3dCQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO3dCQUN0QyxNQUFNLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO29CQUN2RTt3QkFDRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzdCLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQzs2QkFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzVCLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDbkMsTUFBTSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzt3QkFDcEQsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNOLENBQUM7SUFDSCxDQUFDOzhHQXZJVSxvQkFBb0I7a0hBQXBCLG9CQUFvQjs7MkZBQXBCLG9CQUFvQjtrQkFEaEMsVUFBVTs7QUEySVgsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEtBQW1CO0lBQ3RELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBbUIsRUFBRSxTQUFtQixFQUFFLE1BQWM7SUFDdEYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO2dCQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBpbmplY3QsIEluamVjdGFibGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBtYXAsIG1lcmdlTWFwLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBQ0xTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2FjbCc7XG5pbXBvcnQgeyBJVG9rZW5Nb2RlbCwgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnQHllbG9uL2Jpcy9jb25maWcnO1xuaW1wb3J0IHtcbiAgTWVudSxcbiAgTWVudVNlcnZpY2UsXG4gIFNldHRpbmdzU2VydmljZSxcbiAgVGl0bGVTZXJ2aWNlLFxuICBZVU5aQUlfSTE4Tl9UT0tFTixcbiAgWXVuemFpSHR0cEkxOE5TZXJ2aWNlXG59IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICBkZWVwQ29weSxcbiAgdXNlTG9jYWxTdG9yYWdlQ3VycmVudCxcbiAgdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsXG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICB1c2VMb2NhbFN0b3JhZ2VUZW5hbnQsXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQ29uZmlnU2VydmljZSxcbiAgWXVuemFpTWVudSxcbiAgWXVuemFpTWVudUF0dHJpYnV0ZVxufSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVl1bnphaVN0YXJ0dXAoKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAgWXVuemFpU3RhcnR1cFNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogKHN0YXJ0dXBTZXJ2aWNlOiBZdW56YWlTdGFydHVwU2VydmljZSkgPT4gKCkgPT4gc3RhcnR1cFNlcnZpY2UubG9hZCgpLFxuICAgICAgZGVwczogW1l1bnphaVN0YXJ0dXBTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdO1xufVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl1bnphaVN0YXJ0dXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWcgPSBtZXJnZUJpc0NvbmZpZyhpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSkpO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lbnVTZXJ2aWNlID0gaW5qZWN0KE1lbnVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBhY2xTZXJ2aWNlID0gaW5qZWN0KEFDTFNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRpdGxlU2VydmljZSA9IGluamVjdChUaXRsZVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRva2VuU2VydmljZSA9IGluamVjdChZQV9TRVJWSUNFX1RPS0VOKTtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwQ2xpZW50ID0gaW5qZWN0KEh0dHBDbGllbnQpO1xuICBwcml2YXRlIHJlYWRvbmx5IHNldHRpbmdTZXJ2aWNlID0gaW5qZWN0KFNldHRpbmdzU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4biA9IGluamVjdDxZdW56YWlIdHRwSTE4TlNlcnZpY2U+KFlVTlpBSV9JMThOX1RPS0VOKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW4gPSBpbmplY3QoV0lORE9XKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWdTZXJ2aWNlID0gaW5qZWN0KFl1bnphaUNvbmZpZ1NlcnZpY2UpO1xuXG4gIGxvYWQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgbGV0IGRlZmF1bHRMYW5nOiBzdHJpbmcgPSB0aGlzLnNldHRpbmdTZXJ2aWNlLmxheW91dC5sYW5nIHx8IHRoaXMuaTE4bi5kZWZhdWx0TGFuZztcbiAgICBjb25zdCBbc2V0VGVuYW50XSA9IHVzZUxvY2FsU3RvcmFnZVRlbmFudCgpO1xuICAgIGNvbnN0IFtzZXRVc2VyLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCBbc2V0SGVhZGVyXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIGNvbnN0IFtzZXRQcm9qZWN0XSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgW3NldERlZmF1bHRSb3V0ZV0gPSB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGUoKTtcbiAgICBjb25zdCBbc2V0Q3VycmVudF0gPSB1c2VMb2NhbFN0b3JhZ2VDdXJyZW50KCk7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4oKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKHRva2VuOiBJVG9rZW5Nb2RlbCkgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2Uuc2V0KCdhdXRoJywge1xuICAgICAgICAgIHRva2VuX3NlbmRfa2V5OiAnQXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgdG9rZW5fc2VuZF90ZW1wbGF0ZTogYCR7dG9rZW4udG9rZW5fdHlwZX0gXFwke2FjY2Vzc190b2tlbn1gLFxuICAgICAgICAgIHRva2VuX3NlbmRfcGxhY2U6ICdoZWFkZXInXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRva2VuU2VydmljZS5zZXQodG9rZW4pO1xuICAgICAgICByZXR1cm4gb2Yodm9pZCAwKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChgL2F1dGgvdXNlcmApLFxuICAgICAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoYC9hdXRoL2FsbGhlYWRlci92MmApLFxuICAgICAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoYC9hcHAtbWFuYWdlci9wcm9qZWN0L2luZm9gKVxuICAgICAgICBdKS5waXBlKFxuICAgICAgICAgIG1hcCgoW3VzZXIsIGhlYWRlciwgcHJvamVjdF06IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgc2V0VXNlcih1c2VyLnByaW5jaXBhbCk7XG4gICAgICAgICAgICBzZXRUZW5hbnQodXNlci50ZW5hbnRJZCk7XG4gICAgICAgICAgICBzZXRIZWFkZXIoaGVhZGVyLmRhdGEpO1xuICAgICAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0LmRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmkxOG4ubG9hZExhbmdEYXRhKGRlZmF1bHRMYW5nKS5waXBlKFxuICAgICAgICAgIG1hcCgobGFuZ0RhdGE6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pMThuLnVzZShkZWZhdWx0TGFuZywgbGFuZ0RhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHl1bnphaVVzZXIgPSBnZXRVc2VyKCkhO1xuICAgICAgICBjb25zdCB5dW56YWlNZW51czogWXVuemFpTWVudVtdID0gZGVlcENvcHkoeXVuemFpVXNlci5tZW51KS5maWx0ZXIoXG4gICAgICAgICAgbSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmNvbmZpZy5zeXN0ZW1Db2RlXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNZW51ID0geXVuemFpTWVudXMucG9wKCk7XG4gICAgICAgIGlmIChjdXJyZW50TWVudSkge1xuICAgICAgICAgIHRoaXMuc2V0dGluZ1NlcnZpY2Uuc2V0QXBwKHsgbmFtZTogY3VycmVudE1lbnUudGV4dCwgZGVzY3JpcHRpb246IGN1cnJlbnRNZW51LmludHJvIH0pO1xuICAgICAgICAgIHRoaXMuc2V0dGluZ1NlcnZpY2Uuc2V0VXNlcih7XG4gICAgICAgICAgICBuYW1lOiB5dW56YWlVc2VyLnJlYWxuYW1lLFxuICAgICAgICAgICAgYXZhdGFyOiBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9maWxlY2VudGVyL2ZpbGUvJHt5dW56YWlVc2VyLmF2YXRhcklkfWAgfHwgJycsXG4gICAgICAgICAgICBlbWFpbDogeXVuemFpVXNlci5lbWFpbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMudGl0bGVTZXJ2aWNlLmRlZmF1bHQgPSBjdXJyZW50TWVudSAmJiBjdXJyZW50TWVudS50ZXh0ID8gY3VycmVudE1lbnUudGV4dCA6ICdkZWZhdWx0IGFwcGxpY2F0aW9uIG5hbWUnO1xuICAgICAgICAgIHRoaXMudGl0bGVTZXJ2aWNlLnNldFRpdGxlKGN1cnJlbnRNZW51ICYmIGN1cnJlbnRNZW51LnRleHQgPyBjdXJyZW50TWVudS50ZXh0IDogJ25vIHRpdGxlJyk7XG4gICAgICAgICAgY29uc3QgYWJpbGl0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGdlbmVyYXRlQWJpbGl0eShbY3VycmVudE1lbnVdLCBhYmlsaXRpZXMsICcnKTtcbiAgICAgICAgICB0aGlzLmFjbFNlcnZpY2UuYXR0YWNoUm9sZShcbiAgICAgICAgICAgIHl1bnphaVVzZXI/LnJvbGVzXG4gICAgICAgICAgICAgIC5tYXAoKHJvbGU6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByb2xlLnJvbGVWYWx1ZTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmZpbHRlcigoYTogTnpTYWZlQW55KSA9PiAhIWEpIHx8IFtdXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmFjbFNlcnZpY2UuYXR0YWNoQWJpbGl0eShhYmlsaXRpZXMpO1xuICAgICAgICAgIHRoaXMubWVudVNlcnZpY2UuYWRkKFtjdXJyZW50TWVudSBhcyBNZW51XSk7XG4gICAgICAgICAgc2V0Q3VycmVudCh7XG4gICAgICAgICAgICBuYW1lOiBjdXJyZW50TWVudS50ZXh0LFxuICAgICAgICAgICAgaW50cm86IGN1cnJlbnRNZW51LmludHJvIHx8ICcnLFxuICAgICAgICAgICAgaWNvbjogY3VycmVudE1lbnUuYXBwSWNvblVybCB8fCAnLi9hc3NldHMvdG1wL2ltZy9hdmF0YXIuanBnJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBjdXJyZW50TWVudS5hdHRyaWJ1dGU7XG4gICAgICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHI6IFl1bnphaU1lbnVBdHRyaWJ1dGUgPSBKU09OLnBhcnNlKGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgaWYgKGF0dHIgJiYgYXR0ci5kZWZhdWx0Um91dGUpIHtcbiAgICAgICAgICAgICAgc2V0RGVmYXVsdFJvdXRlKGF0dHIuZGVmYXVsdFJvdXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldERlZmF1bHRSb3V0ZSgnL2Rpc3BsYXlJbmRleCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXREZWZhdWx0Um91dGUoJy9kaXNwbGF5SW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKHZvaWQgMCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICB0b2tlbigpOiBPYnNlcnZhYmxlPElUb2tlbk1vZGVsPiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmxvZ2luRm9ybSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KGAvYXV0aC9vYXV0aC90b2tlbj9fYWxsb3dfYW5vbnltb3VzPXRydWVgLCB0aGlzLmNvbmZpZy5sb2dpbkZvcm0pLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHVyaSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLndpbi5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgICAgLmdldChgL2Nhcy1wcm94eS9hcHAvdmFsaWRhdGVfZnVsbD9jYWxsYmFjaz0ke3VyaX0mX2FsbG93X2Fub255bW91cz10cnVlJnRpbWVzdGFtcD0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChyZXNwb25zZS5lcnJjb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgMjAwMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgY2FzZSAyMDAxOlxuICAgICAgICAgICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS5tc2c7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJDb29raWUgRXJyb3I6IENhbid0IGZpbmQgQ2FzIENvb2tpZSxTbyBqdW1wIHRvIGxvZ2luIVwiKTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UubXNnKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3BvbnNlLm1zZyk7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5tc2cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYXMgdW5rbm93biBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1Vua25vd24gRXJyb3I6IENhcyBhdXRoIGV4Y2VwdGlvbiEnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFl6U2lkZVRvWWVsb25NZW51KG1lbnVzOiBZdW56YWlNZW51W10pOiB2b2lkIHtcbiAgbWVudXMuZm9yRWFjaChtZW51ID0+IHtcbiAgICBpZiAobWVudS5jaGlsZHJlbiAmJiBtZW51LmhpZGVDaGlsZHJlbikge1xuICAgICAgbWVudS5jaGlsZHJlbi5mb3JFYWNoKGMgPT4gKGMuaGlkZSA9IHRydWUpKTtcbiAgICB9XG4gICAgbWVudS5iYWRnZURvdCA9IG1lbnUuYmFkZ2VfZG90IHx8IG51bGw7XG4gICAgbWVudS5iYWRnZVN0YXR1cyA9IG1lbnUuYmFkZ2Vfc3RhdHVzIHx8IG51bGw7XG4gICAgbWVudS5zaG9ydGN1dFJvb3QgPSBtZW51LnNob3J0Y3V0X3Jvb3QgfHwgbnVsbDtcbiAgICBtZW51LnJldXNlID0gdHJ1ZTtcbiAgICBpZiAobWVudS5jaGlsZHJlbikge1xuICAgICAgbWFwWXpTaWRlVG9ZZWxvbk1lbnUobWVudS5jaGlsZHJlbik7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQWJpbGl0eShtZW51czogWXVuemFpTWVudVtdLCBhYmlsaXRpZXM6IHN0cmluZ1tdLCBwcmVmaXg6IHN0cmluZyk6IHZvaWQge1xuICBtZW51cy5mb3JFYWNoKG1lbnUgPT4ge1xuICAgIGlmIChtZW51LmxpbmspIHtcbiAgICAgIHByZWZpeCArPSBtZW51Lmxpbms7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeCArPSAnJztcbiAgICB9XG4gICAgaWYgKG1lbnUubWVudUF1dGhzKSB7XG4gICAgICBtZW51Lm1lbnVBdXRocy5mb3JFYWNoKChhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgYWJpbGl0aWVzLnB1c2goYCR7cHJlZml4fToke2F9YCk7XG4gICAgICAgIGFiaWxpdGllcy5wdXNoKGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1lbnUuY2hpbGRyZW4pIHtcbiAgICAgIGdlbmVyYXRlQWJpbGl0eShtZW51LmNoaWxkcmVuLCBhYmlsaXRpZXMsIHByZWZpeCk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==