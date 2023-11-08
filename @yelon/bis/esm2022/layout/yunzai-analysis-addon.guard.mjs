import { Inject, inject, Injectable } from "@angular/core";
import { deepCopy, useLocalStorageUser } from "@yelon/util";
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from "./bis.config";
import { AnalysisAddon } from "./analysis.addon";
import { YA_SERVICE_TOKEN } from "@yelon/auth";
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util";
export class YunzaiAnalysisAddonGuardService {
    constructor(configService, pathToRegexp, tokenService) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.tokenService = tokenService;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        this.bis = mergeBisConfig(this.configService);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        // @ts-ignore
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        if (user) {
            AnalysisAddon.putValueInAnalysis({
                userid: user.id,
                realname: user.realname,
                usertype: user.userType,
                usercode: user.userCode,
                username: user.username,
                account: user.username,
                deptid: user.deptId,
                deptname: user.deptName,
                token: this.tokenService.get()?.access_token
            });
        }
        if (this.menus && this.menus.length > 0) {
            AnalysisAddon.putValueInAnalysis({ system: this.menus[0].text });
        }
        this.getAllLinks(this.menus, this.links);
    }
    process(url) {
        let flag = false;
        this.links.forEach((link) => {
            if (link.link === url.split('?')[0]) {
                flag = true;
                AnalysisAddon.putValueInAnalysis({
                    routename: link.title,
                    routeurl: link.link
                });
                return;
            }
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(url.split('?')[0])) {
                flag = true;
                AnalysisAddon.putValueInAnalysis({
                    routename: link.title,
                    routeurl: link.link
                });
                return;
            }
        });
        if (!flag) {
            AnalysisAddon.putValueInAnalysis({
                routename: url,
                routeurl: url
            });
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: YA_SERVICE_TOKEN }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }]; } });
export const analysisAddonCanActive = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
export const analysisAddonCanActiveChild = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFuYWx5c2lzLWFkZG9uLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95dW56YWktYW5hbHlzaXMtYWRkb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFDTCxRQUFRLEVBRVIsbUJBQW1CLEVBSXBCLE1BQU0sYUFBYSxDQUFDO0FBRXJCLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFckUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBZ0IsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7OztBQUs1RCxNQUFNLE9BQU8sK0JBQStCO0lBTzFDLFlBQ1UsYUFBa0MsRUFDbEMsWUFBaUMsRUFDUCxZQUEyQjtRQUZyRCxrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ1AsaUJBQVksR0FBWixZQUFZLENBQWU7UUFSdkQsUUFBRyxHQUF5Qix1QkFBdUIsQ0FBQztRQUNwRCxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQTJDLEVBQUUsQ0FBQztRQVF6RCxJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBZSxPQUFPLEVBQUcsQ0FBQztRQUNwQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FB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S0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7YUFDN0U7WUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7K0dBNUVVLCtCQUErQix3RkFVaEMsZ0JBQWdCO21IQVZmLCtCQUErQixjQUY5QixNQUFNOzs0RkFFUCwrQkFBK0I7a0JBSDNDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFXSSxNQUFNOzJCQUFDLGdCQUFnQjs7QUFzRTVCLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFrQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0gsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQXVCLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLCtCQUErQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBpbmplY3QsIEluamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NhbkFjdGl2YXRlQ2hpbGRGbiwgQ2FuQWN0aXZhdGVGbn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgZGVlcENvcHksXG4gIFBhdGhUb1JlZ2V4cFNlcnZpY2UsXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlLFxuICBZdW56YWlVc2VyXG59IGZyb20gXCJAeWVsb24vdXRpbFwiO1xuaW1wb3J0IHtNZW51fSBmcm9tIFwiQHllbG9uL3RoZW1lXCI7XG5pbXBvcnQge0JVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZ30gZnJvbSBcIi4vYmlzLmNvbmZpZ1wiO1xuaW1wb3J0IHtOelNhZmVBbnl9IGZyb20gXCJuZy16b3Jyby1hbnRkL2NvcmUvdHlwZXNcIjtcbmltcG9ydCB7QW5hbHlzaXNBZGRvbn0gZnJvbSBcIi4vYW5hbHlzaXMuYWRkb25cIjtcbmltcG9ydCB7SVRva2VuU2VydmljZSwgWUFfU0VSVklDRV9UT0tFTn0gZnJvbSBcIkB5ZWxvbi9hdXRoXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYmlzOiBZdW56YWlCdXNpbmVzc0NvbmZpZyA9IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHO1xuICBwcml2YXRlIG1lbnVzOiBOelNhZmVBbnlbXSA9IFtdO1xuICBwcml2YXRlIGxpbmtzOiBBcnJheTx7IHRpdGxlOiBzdHJpbmcsIGxpbms6IHN0cmluZyB9PiA9IFtdO1xuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF0aFRvUmVnZXhwOiBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICAgIEBJbmplY3QoWUFfU0VSVklDRV9UT0tFTikgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IElUb2tlblNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuYmlzID0gbWVyZ2VCaXNDb25maWcodGhpcy5jb25maWdTZXJ2aWNlKTtcbiAgICBjb25zdCBbLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCB1c2VyOiBZdW56YWlVc2VyID0gZ2V0VXNlcigpITtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5tZW51cyA9IGRlZXBDb3B5KCh1c2VyLm1lbnUgYXMgYW55KSB8fCBbXSkuZmlsdGVyKChtOiBNZW51KSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmJpcy5zeXN0ZW1Db2RlKSBhcyBNZW51W107XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIEFuYWx5c2lzQWRkb24ucHV0VmFsdWVJbkFuYWx5c2lzKHtcbiAgICAgICAgdXNlcmlkOiB1c2VyLmlkLFxuICAgICAgICByZWFsbmFtZTogdXNlci5yZWFsbmFtZSxcbiAgICAgICAgdXNlcnR5cGU6IHVzZXIudXNlclR5cGUsXG4gICAgICAgIHVzZXJjb2RlOiB1c2VyLnVzZXJDb2RlLFxuICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgYWNjb3VudDogdXNlci51c2VybmFtZSxcbiAgICAgICAgZGVwdGlkOiB1c2VyLmRlcHRJZCxcbiAgICAgICAgZGVwdG5hbWU6IHVzZXIuZGVwdE5hbWUsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuU2VydmljZS5nZXQoKT8uYWNjZXNzX3Rva2VuXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAodGhpcy5tZW51cyAmJiB0aGlzLm1lbnVzLmxlbmd0aCA+IDApIHtcbiAgICAgIEFuYWx5c2lzQWRkb24ucHV0VmFsdWVJbkFuYWx5c2lzKHtzeXN0ZW06ICh0aGlzLm1lbnVzWzBdIGFzIE1lbnUpLnRleHR9KVxuICAgIH1cbiAgICB0aGlzLmdldEFsbExpbmtzKHRoaXMubWVudXMsIHRoaXMubGlua3MpO1xuICB9XG5cblxuICBwcm9jZXNzKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGlmIChsaW5rLmxpbmsgPT09IHVybC5zcGxpdCgnPycpWzBdKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlXG4gICAgICAgIEFuYWx5c2lzQWRkb24ucHV0VmFsdWVJbkFuYWx5c2lzKHtcbiAgICAgICAgICByb3V0ZW5hbWU6IGxpbmsudGl0bGUsXG4gICAgICAgICAgcm91dGV1cmw6IGxpbmsubGlua1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZ2V4cDogUmVnRXhwID0gdGhpcy5wYXRoVG9SZWdleHAuc3RyaW5nVG9SZWdleHAobGluaywgbnVsbCwgbnVsbCk7XG4gICAgICBpZiAocmVnZXhwLnRlc3QodXJsLnNwbGl0KCc/JylbMF0pKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlXG4gICAgICAgIEFuYWx5c2lzQWRkb24ucHV0VmFsdWVJbkFuYWx5c2lzKHtcbiAgICAgICAgICByb3V0ZW5hbWU6IGxpbmsudGl0bGUsXG4gICAgICAgICAgcm91dGV1cmw6IGxpbmsubGlua1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFmbGFnKSB7XG4gICAgICBBbmFseXNpc0FkZG9uLnB1dFZhbHVlSW5BbmFseXNpcyh7XG4gICAgICAgIHJvdXRlbmFtZTogdXJsLFxuICAgICAgICByb3V0ZXVybDogdXJsXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZ2V0QWxsTGlua3MobWVudTogTWVudVtdLCBsaW5rczogQXJyYXk8eyB0aXRsZTogc3RyaW5nLCBsaW5rOiBzdHJpbmcgfT4pOiB2b2lkIHtcbiAgICBtZW51LmZvckVhY2goKHNpZGVyOiBNZW51KSA9PiB7XG4gICAgICBpZiAoc2lkZXIubGluaykge1xuICAgICAgICBsaW5rcy5wdXNoKHt0aXRsZTogc2lkZXIudGV4dCA/IHNpZGVyLnRleHQgOiBzaWRlci5saW5rLCBsaW5rOiBzaWRlci5saW5rfSk7XG4gICAgICB9XG4gICAgICBpZiAoc2lkZXIuY2hpbGRyZW4gJiYgc2lkZXIuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmdldEFsbExpbmtzKHNpZGVyLmNoaWxkcmVuLCBsaW5rcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuXG5leHBvcnQgY29uc3QgYW5hbHlzaXNBZGRvbkNhbkFjdGl2ZTogQ2FuQWN0aXZhdGVGbiA9IChfLCBzdGF0ZSkgPT4gaW5qZWN0KFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKVxuZXhwb3J0IGNvbnN0IGFuYWx5c2lzQWRkb25DYW5BY3RpdmVDaGlsZDogQ2FuQWN0aXZhdGVDaGlsZEZuID0gKF8sIHN0YXRlKSA9PiBpbmplY3QoWXVuemFpQW5hbHlzaXNBZGRvbkd1YXJkU2VydmljZSkucHJvY2VzcyhzdGF0ZS51cmwpXG4iXX0=