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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: WINDOW }, { token: YA_SERVICE_TOKEN }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }]; } });
export const analysisAddonCanActive = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
export const analysisAddonCanActiveChild = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFuYWx5c2lzLWFkZG9uLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95dW56YWktYW5hbHlzaXMtYWRkb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNELE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFOUQsT0FBTyxFQUNMLFFBQVEsRUFFUixtQkFBbUIsRUFDbkIsTUFBTSxFQUlQLE1BQU0sYUFBYSxDQUFDO0FBR3JCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUt2RSxNQUFNLE9BQU8sK0JBQStCO0lBTTFDLFlBQ1UsYUFBa0MsRUFDbEMsWUFBaUMsRUFDakIsR0FBUSxFQUNFLFlBQTJCO1FBSHJELGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUNFLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBVHZELFFBQUcsR0FBeUIsdUJBQXVCLENBQUM7UUFDcEQsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFDeEIsVUFBSyxHQUEyQyxFQUFFLENBQUM7UUFDbkQsVUFBSyxHQUFjLEVBQUUsQ0FBQztRQVE1QixJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBZSxPQUFPLEVBQUcsQ0FBQztRQUNwQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQVksSUFB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QUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUNoRSxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdELE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUF1QixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUMxRSxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlQ2hpbGRGbiwgQ2FuQWN0aXZhdGVGbiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IElUb2tlblNlcnZpY2UsIFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICdAeWVsb24vYXV0aCc7XG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIGRlZXBDb3B5LFxuICBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBXSU5ET1csXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlLFxuICBZdW56YWlVc2VyXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4vYmlzLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2Uge1xuICBwcml2YXRlIGJpczogWXVuemFpQnVzaW5lc3NDb25maWcgPSBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRztcbiAgcHJpdmF0ZSBtZW51czogTnpTYWZlQW55W10gPSBbXTtcbiAgcHJpdmF0ZSBsaW5rczogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyBsaW5rOiBzdHJpbmcgfT4gPSBbXTtcbiAgcHJpdmF0ZSB2YWx1ZTogTnpTYWZlQW55ID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF0aFRvUmVnZXhwOiBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbjogYW55LFxuICAgIEBJbmplY3QoWUFfU0VSVklDRV9UT0tFTikgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IElUb2tlblNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5iaXMgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICAgIGNvbnN0IFssIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGNvbnN0IHVzZXI6IFl1bnphaVVzZXIgPSBnZXRVc2VyKCkhO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLm1lbnVzID0gZGVlcENvcHkoKHVzZXIubWVudSBhcyBhbnkpIHx8IFtdKS5maWx0ZXIoXG4gICAgICAobTogTWVudSkgPT4gbS5zeXN0ZW1Db2RlICYmIG0uc3lzdGVtQ29kZSA9PT0gdGhpcy5iaXMuc3lzdGVtQ29kZVxuICAgICkgYXMgTWVudVtdO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgICBzeXN0ZW1Db2RlOiB0aGlzLmJpcy5zeXN0ZW1Db2RlLFxuICAgICAgICB1c2VyaWQ6IHVzZXIuaWQsXG4gICAgICAgIHJlYWxuYW1lOiB1c2VyLnJlYWxuYW1lLFxuICAgICAgICB1c2VydHlwZTogdXNlci51c2VyVHlwZSxcbiAgICAgICAgdXNlcmNvZGU6IHVzZXIudXNlckNvZGUsXG4gICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICBhY2NvdW50OiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICBkZXB0aWQ6IHVzZXIuZGVwdElkLFxuICAgICAgICBkZXB0bmFtZTogdXNlci5kZXB0TmFtZSxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5TZXJ2aWNlLmdldCgpPy5hY2Nlc3NfdG9rZW5cbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0aGlzLm1lbnVzICYmIHRoaXMubWVudXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy52YWx1ZVsnc3lzdGVtJ10gPSAodGhpcy5tZW51c1swXSBhcyBNZW51KS50ZXh0O1xuICAgIH1cbiAgICB0aGlzLmdldEFsbExpbmtzKHRoaXMubWVudXMsIHRoaXMubGlua3MpO1xuICB9XG5cbiAgcHJvY2Vzcyh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgaWYgKGxpbmsubGluayA9PT0gdXJsLnNwbGl0KCc/JylbMF0pIHtcbiAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgIHRoaXMudmFsdWVbJ3JvdXRlbmFtZSddID0gbGluay50aXRsZTtcbiAgICAgICAgdGhpcy52YWx1ZVsncm91dGV1cmwnXSA9IGxpbmsubGluaztcbiAgICAgICAgaWYgKHRoaXMud2luWyd5dW56YWknXSkge1xuICAgICAgICAgIHRoaXMud2luWyd5dW56YWknXS5zZXRFeHRyYSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByZWdleHA6IFJlZ0V4cCA9IHRoaXMucGF0aFRvUmVnZXhwLnN0cmluZ1RvUmVnZXhwKGxpbmssIG51bGwsIG51bGwpO1xuICAgICAgaWYgKHJlZ2V4cC50ZXN0KHVybC5zcGxpdCgnPycpWzBdKSkge1xuICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZVsncm91dGVuYW1lJ10gPSBsaW5rLnRpdGxlO1xuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gbGluay5saW5rO1xuICAgICAgICBpZiAodGhpcy53aW5bJ3l1bnphaSddKSB7XG4gICAgICAgICAgdGhpcy53aW5bJ3l1bnphaSddLnNldEV4dHJhKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWZsYWcpIHtcbiAgICAgIHRoaXMudmFsdWVbJ3JvdXRlbmFtZSddID0gdXJsO1xuICAgICAgdGhpcy52YWx1ZVsncm91dGV1cmwnXSA9IHVybDtcbiAgICAgIGlmICh0aGlzLndpblsneXVuemFpJ10pIHtcbiAgICAgICAgdGhpcy53aW5bJ3l1bnphaSddLnNldEV4dHJhKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEFsbExpbmtzKG1lbnU6IE1lbnVbXSwgbGlua3M6IEFycmF5PHsgdGl0bGU6IHN0cmluZzsgbGluazogc3RyaW5nIH0+KTogdm9pZCB7XG4gICAgbWVudS5mb3JFYWNoKChzaWRlcjogTWVudSkgPT4ge1xuICAgICAgaWYgKHNpZGVyLmxpbmspIHtcbiAgICAgICAgbGlua3MucHVzaCh7IHRpdGxlOiBzaWRlci50ZXh0ID8gc2lkZXIudGV4dCA6IHNpZGVyLmxpbmssIGxpbms6IHNpZGVyLmxpbmsgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc2lkZXIuY2hpbGRyZW4gJiYgc2lkZXIuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmdldEFsbExpbmtzKHNpZGVyLmNoaWxkcmVuLCBsaW5rcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFuYWx5c2lzQWRkb25DYW5BY3RpdmU6IENhbkFjdGl2YXRlRm4gPSAoXywgc3RhdGUpID0+XG4gIGluamVjdChZdW56YWlBbmFseXNpc0FkZG9uR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKHN0YXRlLnVybCk7XG5leHBvcnQgY29uc3QgYW5hbHlzaXNBZGRvbkNhbkFjdGl2ZUNoaWxkOiBDYW5BY3RpdmF0ZUNoaWxkRm4gPSAoXywgc3RhdGUpID0+XG4gIGluamVjdChZdW56YWlBbmFseXNpc0FkZG9uR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKHN0YXRlLnVybCk7XG4iXX0=