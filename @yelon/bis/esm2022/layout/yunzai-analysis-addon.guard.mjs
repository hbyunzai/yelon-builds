import { Inject, inject, Injectable } from '@angular/core';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { deepCopy, useLocalStorageUser, WINDOW } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from './bis.config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util";
export class YunzaiAnalysisAddonGuardService {
    constructor(configService, pathToRegexp, win, tokenService) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.win = win;
        this.tokenService = tokenService;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        this.value = {};
        this.bis = mergeBisConfig(this.configService);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        // @ts-ignore
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        if (user) {
            this.value = {
                systemCode: this.bis.systemCode,
                userid: user.id,
                realname: user.realname,
                usertype: user.userType,
                usercode: user.userCode,
                username: user.username,
                account: user.username,
                deptid: user.deptId,
                deptname: user.deptName,
                token: this.tokenService.get()?.access_token
            };
        }
        if (this.menus && this.menus.length > 0) {
            this.value['system'] = this.menus[0].text;
        }
        this.getAllLinks(this.menus, this.links);
    }
    process(url) {
        let flag = false;
        this.links.forEach(link => {
            if (link.link === url.split('?')[0]) {
                flag = true;
                this.value['routename'] = link.title;
                this.value['routeurl'] = link.link;
                if (this.win['yunzai']) {
                    this.win['yunzai'].setExtra(this.value);
                }
                return;
            }
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(url.split('?')[0])) {
                flag = true;
                this.value['routename'] = link.title;
                this.value['routeurl'] = link.link;
                if (this.win['yunzai']) {
                    this.win['yunzai'].setExtra(this.value);
                }
                return;
            }
        });
        if (!flag) {
            this.value['routename'] = url;
            this.value['routeurl'] = url;
            if (this.win['yunzai']) {
                this.win['yunzai'].setExtra(this.value);
            }
        }
        return true;
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push({ title: sider.text ? sider.text : sider.link, link: sider.link });
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: WINDOW }, { token: YA_SERVICE_TOKEN }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }] });
export const analysisAddonCanActive = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
export const analysisAddonCanActiveChild = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFuYWx5c2lzLWFkZG9uLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95dW56YWktYW5hbHlzaXMtYWRkb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNELE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFOUQsT0FBTyxFQUNMLFFBQVEsRUFFUixtQkFBbUIsRUFDbkIsTUFBTSxFQUlQLE1BQU0sYUFBYSxDQUFDO0FBR3JCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUt2RSxNQUFNLE9BQU8sK0JBQStCO0lBTTFDLFlBQ1UsYUFBa0MsRUFDbEMsWUFBaUMsRUFDakIsR0FBYyxFQUNKLFlBQTJCO1FBSHJELGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNKLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBVHZELFFBQUcsR0FBeUIsdUJBQXVCLENBQUM7UUFDcEQsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFDeEIsVUFBSyxHQUEyQyxFQUFFLENBQUM7UUFDbkQsVUFBSyxHQUFjLEVBQUUsQ0FBQztRQVE1QixJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBZSxPQUFPLEVBQUcsQ0FBQztRQUNwQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQWtCLElB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QU07aUJBQ25COzswQkFVSSxNQUFNOzJCQUFDLE1BQU07OzBCQUNiLE1BQU07MkJBQUMsZ0JBQWdCOztBQTBFNUIsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQWtCLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ2hFLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0QsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQXVCLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQzFFLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGVDaGlsZEZuLCBDYW5BY3RpdmF0ZUZuIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgSVRva2VuU2VydmljZSwgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtcbiAgZGVlcENvcHksXG4gIFBhdGhUb1JlZ2V4cFNlcnZpY2UsXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIFl1bnphaVVzZXJcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgQlVTSU5FU1NfREVGQVVMVF9DT05GSUcsIG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnLi9iaXMuY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpQW5hbHlzaXNBZGRvbkd1YXJkU2VydmljZSB7XG4gIHByaXZhdGUgYmlzOiBZdW56YWlCdXNpbmVzc0NvbmZpZyA9IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHO1xuICBwcml2YXRlIG1lbnVzOiBOelNhZmVBbnlbXSA9IFtdO1xuICBwcml2YXRlIGxpbmtzOiBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IGxpbms6IHN0cmluZyB9PiA9IFtdO1xuICBwcml2YXRlIHZhbHVlOiBOelNhZmVBbnkgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXRoVG9SZWdleHA6IFBhdGhUb1JlZ2V4cFNlcnZpY2UsXG4gICAgQEluamVjdChXSU5ET1cpIHByaXZhdGUgd2luOiBOelNhZmVBbnksXG4gICAgQEluamVjdChZQV9TRVJWSUNFX1RPS0VOKSBwcml2YXRlIHRva2VuU2VydmljZTogSVRva2VuU2VydmljZVxuICApIHtcbiAgICB0aGlzLmJpcyA9IG1lcmdlQmlzQ29uZmlnKHRoaXMuY29uZmlnU2VydmljZSk7XG4gICAgY29uc3QgWywgZ2V0VXNlcl0gPSB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk7XG4gICAgY29uc3QgdXNlcjogWXVuemFpVXNlciA9IGdldFVzZXIoKSE7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMubWVudXMgPSBkZWVwQ29weSgodXNlci5tZW51IGFzIE56U2FmZUFueSkgfHwgW10pLmZpbHRlcihcbiAgICAgIChtOiBNZW51KSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmJpcy5zeXN0ZW1Db2RlXG4gICAgKSBhcyBNZW51W107XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB7XG4gICAgICAgIHN5c3RlbUNvZGU6IHRoaXMuYmlzLnN5c3RlbUNvZGUsXG4gICAgICAgIHVzZXJpZDogdXNlci5pZCxcbiAgICAgICAgcmVhbG5hbWU6IHVzZXIucmVhbG5hbWUsXG4gICAgICAgIHVzZXJ0eXBlOiB1c2VyLnVzZXJUeXBlLFxuICAgICAgICB1c2VyY29kZTogdXNlci51c2VyQ29kZSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGFjY291bnQ6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGRlcHRpZDogdXNlci5kZXB0SWQsXG4gICAgICAgIGRlcHRuYW1lOiB1c2VyLmRlcHROYW1lLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblNlcnZpY2UuZ2V0KCk/LmFjY2Vzc190b2tlblxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWVudXMgJiYgdGhpcy5tZW51cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnZhbHVlWydzeXN0ZW0nXSA9ICh0aGlzLm1lbnVzWzBdIGFzIE1lbnUpLnRleHQ7XG4gICAgfVxuICAgIHRoaXMuZ2V0QWxsTGlua3ModGhpcy5tZW51cywgdGhpcy5saW5rcyk7XG4gIH1cblxuICBwcm9jZXNzKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBpZiAobGluay5saW5rID09PSB1cmwuc3BsaXQoJz8nKVswXSkge1xuICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZVsncm91dGVuYW1lJ10gPSBsaW5rLnRpdGxlO1xuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gbGluay5saW5rO1xuICAgICAgICBpZiAodGhpcy53aW5bJ3l1bnphaSddKSB7XG4gICAgICAgICAgdGhpcy53aW5bJ3l1bnphaSddLnNldEV4dHJhKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZ2V4cDogUmVnRXhwID0gdGhpcy5wYXRoVG9SZWdleHAuc3RyaW5nVG9SZWdleHAobGluaywgbnVsbCwgbnVsbCk7XG4gICAgICBpZiAocmVnZXhwLnRlc3QodXJsLnNwbGl0KCc/JylbMF0pKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZW5hbWUnXSA9IGxpbmsudGl0bGU7XG4gICAgICAgIHRoaXMudmFsdWVbJ3JvdXRldXJsJ10gPSBsaW5rLmxpbms7XG4gICAgICAgIGlmICh0aGlzLndpblsneXVuemFpJ10pIHtcbiAgICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZmxhZykge1xuICAgICAgdGhpcy52YWx1ZVsncm91dGVuYW1lJ10gPSB1cmw7XG4gICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gdXJsO1xuICAgICAgaWYgKHRoaXMud2luWyd5dW56YWknXSkge1xuICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0QWxsTGlua3MobWVudTogTWVudVtdLCBsaW5rczogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyBsaW5rOiBzdHJpbmcgfT4pOiB2b2lkIHtcbiAgICBtZW51LmZvckVhY2goKHNpZGVyOiBNZW51KSA9PiB7XG4gICAgICBpZiAoc2lkZXIubGluaykge1xuICAgICAgICBsaW5rcy5wdXNoKHsgdGl0bGU6IHNpZGVyLnRleHQgPyBzaWRlci50ZXh0IDogc2lkZXIubGluaywgbGluazogc2lkZXIubGluayB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChzaWRlci5jaGlsZHJlbiAmJiBzaWRlci5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0QWxsTGlua3Moc2lkZXIuY2hpbGRyZW4sIGxpbmtzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYW5hbHlzaXNBZGRvbkNhbkFjdGl2ZTogQ2FuQWN0aXZhdGVGbiA9IChfLCBzdGF0ZSkgPT5cbiAgaW5qZWN0KFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcbmV4cG9ydCBjb25zdCBhbmFseXNpc0FkZG9uQ2FuQWN0aXZlQ2hpbGQ6IENhbkFjdGl2YXRlQ2hpbGRGbiA9IChfLCBzdGF0ZSkgPT5cbiAgaW5qZWN0KFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcbiJdfQ==