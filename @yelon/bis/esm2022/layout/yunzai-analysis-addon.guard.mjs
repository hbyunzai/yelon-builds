import { Inject, inject, Injectable } from "@angular/core";
import { deepCopy, useLocalStorageUser, WINDOW } from "@yelon/util";
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from "./bis.config";
import { YA_SERVICE_TOKEN } from "@yelon/auth";
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
        this.links.forEach((link) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFuYWx5c2lzLWFkZG9uLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95dW56YWktYW5hbHlzaXMtYWRkb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFDTCxRQUFRLEVBRVIsbUJBQW1CLEVBQUUsTUFBTSxFQUk1QixNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUMsdUJBQXVCLEVBQUUsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXJFLE9BQU8sRUFBZ0IsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7OztBQUs1RCxNQUFNLE9BQU8sK0JBQStCO0lBUTFDLFlBQ1UsYUFBa0MsRUFDbEMsWUFBaUMsRUFDakIsR0FBUSxFQUNFLFlBQTJCO1FBSHJELGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUNFLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBVnZELFFBQUcsR0FBeUIsdUJBQXVCLENBQUM7UUFDcEQsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFDeEIsVUFBSyxHQUEyQyxFQUFFLENBQUM7UUFDbkQsVUFBSyxHQUFjLEVBQUUsQ0FBQTtRQVMzQixJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBZSxPQUFPLEVBQUcsQ0FBQztRQUNwQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBVyxDQUFDO1FBQ3BJLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZO2FBQzdDLENBQUE7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBVSxDQUFDLElBQUksQ0FBQTtTQUNwRDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUdELE9BQU8sQ0FBQyxHQUFXO1FBQ2pCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDeEM7Z0JBQ0QsT0FBTTthQUNQO1lBQ0QsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDeEM7Z0JBQ0QsT0FBTzthQUNSO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUE7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUE7WUFDNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDeEM7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZLEVBQUUsS0FBNkM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVcsRUFBRSxFQUFFO1lBQzNCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDZCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQzdFO1lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOytHQWpGVSwrQkFBK0Isd0ZBV2hDLE1BQU0sYUFDTixnQkFBZ0I7bUhBWmYsK0JBQStCLGNBRjlCLE1BQU07OzRGQUVQLCtCQUErQjtrQkFIM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVlJLE1BQU07MkJBQUMsTUFBTTs7MEJBQ2IsTUFBTTsyQkFBQyxnQkFBZ0I7O0FBeUU1QixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBa0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzdILE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUF1QixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgaW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDYW5BY3RpdmF0ZUNoaWxkRm4sIENhbkFjdGl2YXRlRm59IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gIGRlZXBDb3B5LFxuICBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLCBXSU5ET1csXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlLFxuICBZdW56YWlVc2VyXG59IGZyb20gXCJAeWVsb24vdXRpbFwiO1xuaW1wb3J0IHtNZW51fSBmcm9tIFwiQHllbG9uL3RoZW1lXCI7XG5pbXBvcnQge0JVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZ30gZnJvbSBcIi4vYmlzLmNvbmZpZ1wiO1xuaW1wb3J0IHtOelNhZmVBbnl9IGZyb20gXCJuZy16b3Jyby1hbnRkL2NvcmUvdHlwZXNcIjtcbmltcG9ydCB7SVRva2VuU2VydmljZSwgWUFfU0VSVklDRV9UT0tFTn0gZnJvbSBcIkB5ZWxvbi9hdXRoXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYmlzOiBZdW56YWlCdXNpbmVzc0NvbmZpZyA9IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHO1xuICBwcml2YXRlIG1lbnVzOiBOelNhZmVBbnlbXSA9IFtdO1xuICBwcml2YXRlIGxpbmtzOiBBcnJheTx7IHRpdGxlOiBzdHJpbmcsIGxpbms6IHN0cmluZyB9PiA9IFtdO1xuICBwcml2YXRlIHZhbHVlOiBOelNhZmVBbnkgPSB7fVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF0aFRvUmVnZXhwOiBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbjogYW55LFxuICAgIEBJbmplY3QoWUFfU0VSVklDRV9UT0tFTikgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IElUb2tlblNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuYmlzID0gbWVyZ2VCaXNDb25maWcodGhpcy5jb25maWdTZXJ2aWNlKTtcbiAgICBjb25zdCBbLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCB1c2VyOiBZdW56YWlVc2VyID0gZ2V0VXNlcigpITtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5tZW51cyA9IGRlZXBDb3B5KCh1c2VyLm1lbnUgYXMgYW55KSB8fCBbXSkuZmlsdGVyKChtOiBNZW51KSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmJpcy5zeXN0ZW1Db2RlKSBhcyBNZW51W107XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB7XG4gICAgICAgIHVzZXJpZDogdXNlci5pZCxcbiAgICAgICAgcmVhbG5hbWU6IHVzZXIucmVhbG5hbWUsXG4gICAgICAgIHVzZXJ0eXBlOiB1c2VyLnVzZXJUeXBlLFxuICAgICAgICB1c2VyY29kZTogdXNlci51c2VyQ29kZSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGFjY291bnQ6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGRlcHRpZDogdXNlci5kZXB0SWQsXG4gICAgICAgIGRlcHRuYW1lOiB1c2VyLmRlcHROYW1lLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblNlcnZpY2UuZ2V0KCk/LmFjY2Vzc190b2tlblxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5tZW51cyAmJiB0aGlzLm1lbnVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMudmFsdWVbJ3N5c3RlbSddID0gKHRoaXMubWVudXNbMF0gYXMgTWVudSkudGV4dFxuICAgIH1cbiAgICB0aGlzLmdldEFsbExpbmtzKHRoaXMubWVudXMsIHRoaXMubGlua3MpO1xuICB9XG5cblxuICBwcm9jZXNzKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGlmIChsaW5rLmxpbmsgPT09IHVybC5zcGxpdCgnPycpWzBdKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlXG4gICAgICAgIHRoaXMudmFsdWVbJ3JvdXRlbmFtZSddID0gbGluay50aXRsZVxuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gbGluay5saW5rXG4gICAgICAgIGlmICh0aGlzLndpblsneXVuemFpJ10pIHtcbiAgICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZ2V4cDogUmVnRXhwID0gdGhpcy5wYXRoVG9SZWdleHAuc3RyaW5nVG9SZWdleHAobGluaywgbnVsbCwgbnVsbCk7XG4gICAgICBpZiAocmVnZXhwLnRlc3QodXJsLnNwbGl0KCc/JylbMF0pKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlXG4gICAgICAgIHRoaXMudmFsdWVbJ3JvdXRlbmFtZSddID0gbGluay50aXRsZVxuICAgICAgICB0aGlzLnZhbHVlWydyb3V0ZXVybCddID0gbGluay5saW5rXG4gICAgICAgIGlmICh0aGlzLndpblsneXVuemFpJ10pIHtcbiAgICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFmbGFnKSB7XG4gICAgICB0aGlzLnZhbHVlWydyb3V0ZW5hbWUnXSA9IHVybFxuICAgICAgdGhpcy52YWx1ZVsncm91dGV1cmwnXSA9IHVybFxuICAgICAgaWYgKHRoaXMud2luWyd5dW56YWknXSkge1xuICAgICAgICB0aGlzLndpblsneXVuemFpJ10uc2V0RXh0cmEodGhpcy52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGdldEFsbExpbmtzKG1lbnU6IE1lbnVbXSwgbGlua3M6IEFycmF5PHsgdGl0bGU6IHN0cmluZywgbGluazogc3RyaW5nIH0+KTogdm9pZCB7XG4gICAgbWVudS5mb3JFYWNoKChzaWRlcjogTWVudSkgPT4ge1xuICAgICAgaWYgKHNpZGVyLmxpbmspIHtcbiAgICAgICAgbGlua3MucHVzaCh7dGl0bGU6IHNpZGVyLnRleHQgPyBzaWRlci50ZXh0IDogc2lkZXIubGluaywgbGluazogc2lkZXIubGlua30pO1xuICAgICAgfVxuICAgICAgaWYgKHNpZGVyLmNoaWxkcmVuICYmIHNpZGVyLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5nZXRBbGxMaW5rcyhzaWRlci5jaGlsZHJlbiwgbGlua3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IGFuYWx5c2lzQWRkb25DYW5BY3RpdmU6IENhbkFjdGl2YXRlRm4gPSAoXywgc3RhdGUpID0+IGluamVjdChZdW56YWlBbmFseXNpc0FkZG9uR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKHN0YXRlLnVybClcbmV4cG9ydCBjb25zdCBhbmFseXNpc0FkZG9uQ2FuQWN0aXZlQ2hpbGQ6IENhbkFjdGl2YXRlQ2hpbGRGbiA9IChfLCBzdGF0ZSkgPT4gaW5qZWN0KFl1bnphaUFuYWx5c2lzQWRkb25HdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKVxuIl19