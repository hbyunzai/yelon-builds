import { Inject, inject, Injectable } from '@angular/core';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from '@yelon/bis/config';
import { deepCopy, useLocalStorageUser, WINDOW } from '@yelon/util';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: WINDOW }, { token: YA_SERVICE_TOKEN }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFuYWx5c2lzLWFkZG9uLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3NyYy95dW56YWktYW5hbHlzaXMtYWRkb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNELE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTVFLE9BQU8sRUFDTCxRQUFRLEVBRVIsbUJBQW1CLEVBQ25CLE1BQU0sRUFJUCxNQUFNLGFBQWEsQ0FBQzs7O0FBTXJCLE1BQU0sT0FBTywrQkFBK0I7SUFNMUMsWUFDVSxhQUFrQyxFQUNsQyxZQUFpQyxFQUNqQixHQUFjLEVBQ0osWUFBMkI7UUFIckQsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBQ2xDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ0osaUJBQVksR0FBWixZQUFZLENBQWU7UUFUdkQsUUFBRyxHQUF5Qix1QkFBdUIsQ0FBQztRQUNwRCxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQTJDLEVBQUUsQ0FBQztRQUNuRCxVQUFLLEdBQWMsRUFBRSxDQUFDO1FBUTVCLElBQUksQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLE1BQU0sSUFBSSxHQUFlLE9BQU8sRUFBRyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFFLElBQUksQ0FBQyxJQUFrQixJQUFJLEVBQUUsQ0FB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MEJBVUksTUFBTTsyQkFBQyxNQUFNOzswQkFDYixNQUFNOzJCQUFDLGdCQUFnQjs7QUF5RTVCLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFrQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUNoRSxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdELE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUF1QixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUMxRSxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlQ2hpbGRGbiwgQ2FuQWN0aXZhdGVGbiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IElUb2tlblNlcnZpY2UsIFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICdAeWVsb24vYXV0aCc7XG5pbXBvcnQgeyBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRywgbWVyZ2VCaXNDb25maWcgfSBmcm9tICdAeWVsb24vYmlzL2NvbmZpZyc7XG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIGRlZXBDb3B5LFxuICBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBXSU5ET1csXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlLFxuICBZdW56YWlVc2VyXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2Uge1xuICBwcml2YXRlIGJpczogWXVuemFpQnVzaW5lc3NDb25maWcgPSBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRztcbiAgcHJpdmF0ZSBtZW51czogTnpTYWZlQW55W10gPSBbXTtcbiAgcHJpdmF0ZSBsaW5rczogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyBsaW5rOiBzdHJpbmcgfT4gPSBbXTtcbiAgcHJpdmF0ZSB2YWx1ZTogTnpTYWZlQW55ID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF0aFRvUmVnZXhwOiBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbjogTnpTYWZlQW55LFxuICAgIEBJbmplY3QoWUFfU0VSVklDRV9UT0tFTikgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IElUb2tlblNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5iaXMgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICAgIGNvbnN0IFssIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGNvbnN0IHVzZXI6IFl1bnphaVVzZXIgPSBnZXRVc2VyKCkhO1xuICAgIHRoaXMubWVudXMgPSBkZWVwQ29weSgodXNlci5tZW51IGFzIE56U2FmZUFueSkgfHwgW10pLmZpbHRlcihcbiAgICAgIChtOiBNZW51KSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmJpcy5zeXN0ZW1Db2RlXG4gICAgKSBhcyBNZW51W107XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB7XG4gICAgICAgIHN5c3RlbUNvZGU6IHRoaXMuYmlzLnN5c3RlbUNvZGUsXG4gICAgICAgIHVzZXJpZDogdXNlci5pZCxcbiAgICAgICAgcmVhbG5hbWU6IHVzZXIucmVhbG5hbWUsXG4gICAgICAgIHVzZXJ0eXBlOiB1c2VyLnVzZXJUeXBlLFxuICAgICAgICB1c2VyY29kZTogdXNlci51c2VyQ29kZSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGFjY291bnQ6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGRlcHRpZDogdXNlci5kZXB0SWQsXG4gICAgICAgIGRlcHRuYW1lOiB1c2VyLmRlcHROYW1lLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblNlcnZpY2UuZ2V0KCk/LmFjY2Vzc190b2tlblxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWVudXMgJiYgdGhpcy5tZW51cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnZhbHVlWydzeXN0ZW0nXSA9ICh0aGlzLm1lbnVzWzBdIGFzIE1lbnUpLnRleHQ7XG4gICAgfVxuICAgIHRoaXMuZ2V0QWxsTGlua3ModGhpcy5tZW51cywgdGhpcy5saW5rcyk7XG4gIH1cblxuICBwcm9jZXNzKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBpZiAobGluay5saW5rID09PSB1cmwuc3BsaXQoJz8nKVswXSkge1xuICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZVsncm91dGVuYW1lJ10gPSBsaW5rLnRpdGxlO1xuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gbGluay5saW5rO1xuICAgICAgICBpZiAodGhpcy53aW5bJ3l1bnphaSddKSB7XG4gICAgICAgICAgdGhpcy53aW5bJ3l1bnphaSddLnNldEV4dHJhKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZ2V4cDogUmVnRXhwID0gdGhpcy5wYXRoVG9SZWdleHAuc3RyaW5nVG9SZWdleHAobGluaywgbnVsbCwgbnVsbCk7XG4gICAgICBpZiAocmVnZXhwLnRlc3QodXJsLnNwbGl0KCc/JylbMF0pKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZW5hbWUnXSA9IGxpbmsudGl0bGU7XG4gICAgICAgIHRoaXMudmFsdWVbJ3JvdXRldXJsJ10gPSBsaW5rLmxpbms7XG4gICAgICAgIGlmICh0aGlzLndpblsneXVuemFpJ10pIHtcbiAgICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZmxhZykge1xuICAgICAgdGhpcy52YWx1ZVsncm91dGVuYW1lJ10gPSB1cmw7XG4gICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gdXJsO1xuICAgICAgaWYgKHRoaXMud2luWyd5dW56YWknXSkge1xuICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0QWxsTGlua3MobWVudTogTWVudVtdLCBsaW5rczogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyBsaW5rOiBzdHJpbmcgfT4pOiB2b2lkIHtcbiAgICBtZW51LmZvckVhY2goKHNpZGVyOiBNZW51KSA9PiB7XG4gICAgICBpZiAoc2lkZXIubGluaykge1xuICAgICAgICBsaW5rcy5wdXNoKHsgdGl0bGU6IHNpZGVyLnRleHQgPyBzaWRlci50ZXh0IDogc2lkZXIubGluaywgbGluazogc2lkZXIubGluayB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChzaWRlci5jaGlsZHJlbiAmJiBzaWRlci5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0QWxsTGlua3Moc2lkZXIuY2hpbGRyZW4sIGxpbmtzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYW5hbHlzaXNBZGRvbkNhbkFjdGl2ZTogQ2FuQWN0aXZhdGVGbiA9IChfLCBzdGF0ZSkgPT5cbiAgaW5qZWN0KFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcbmV4cG9ydCBjb25zdCBhbmFseXNpc0FkZG9uQ2FuQWN0aXZlQ2hpbGQ6IENhbkFjdGl2YXRlQ2hpbGRGbiA9IChfLCBzdGF0ZSkgPT5cbiAgaW5qZWN0KFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcbiJdfQ==