import { Injectable } from '@angular/core';
import { deepCopy, log } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from './bis.config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util";
import * as i2 from "@yelon/cache";
import * as i3 from "./path-to-regexp.service";
import * as i4 from "@angular/router";
export class ActGuard {
    constructor(configService, cacheService, pathToRegexp, router) {
        this.configService = configService;
        this.cacheService = cacheService;
        this.pathToRegexp = pathToRegexp;
        this.router = router;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        log('act: ');
        this.bis = mergeBisConfig(this.configService);
        log('act: config ', this.bis);
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        log('act: user ', user);
        this.menus = deepCopy(user.menu).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        log('act: menus ', this.menus);
        this.getAllLinks(this.menus, this.links);
        log('act: links ', this.links);
    }
    canActivate(_, state) {
        log('act: can activate ', state);
        if (this.preHandle(state)) {
            return true;
        }
        log('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            log(`act: ${link} test ${state.url.split('?')[0]}`);
            if (regexp.test(state.url.split('?')[0])) {
                canactivate = true;
                log(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log(`act: test sucess`);
            return true;
        }
        else {
            log(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    canActivateChild(_, state) {
        log('act: can activate child ', state);
        if (this.preHandle(state)) {
            return true;
        }
        log('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(state.url.split('?')[0])) {
                log(`act: ${link} test ${state.url.split('?')[0]}`);
                canactivate = true;
                log(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log(`act: test sucess`);
            return true;
        }
        else {
            log(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    preHandle(state) {
        return (state.url.includes('error') ||
            state.url.includes('exception') ||
            state.url.includes('displayIndex') ||
            state.url === '' ||
            state.url === null ||
            state.url === '/' ||
            state.url.includes('iframePage'));
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push(sider.link);
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
}
ActGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ActGuard, deps: [{ token: i1.YunzaiConfigService }, { token: i2.CacheService }, { token: i3.PathToRegexpService }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
ActGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ActGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ActGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }, { type: i2.CacheService }, { type: i3.PathToRegexpService }, { type: i4.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0Lmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC9hY3QuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBNkMsTUFBTSxhQUFhLENBQUM7QUFFdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBTXZFLE1BQU0sT0FBTyxRQUFRO0lBS25CLFlBQ1UsYUFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsWUFBaUMsRUFDakMsTUFBYztRQUhkLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVJoQixRQUFHLEdBQXlCLHVCQUF1QixDQUFDO1FBQ3BELFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBQ3hCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFRM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FDckMs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O3lHQUFSLFFBQVEsY0FGUCxNQUFNOzJGQUVQLFFBQVE7a0JBSHBCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgQ2FuQWN0aXZhdGUsXG4gIENhbkFjdGl2YXRlQ2hpbGQsXG4gIFJvdXRlcixcbiAgUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgVXJsVHJlZVxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICdAeWVsb24vY2FjaGUnO1xuaW1wb3J0IHsgTWVudSwgVXNlciB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBkZWVwQ29weSwgbG9nLCBZdW56YWlCdXNpbmVzc0NvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgQlVTSU5FU1NfREVGQVVMVF9DT05GSUcsIG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnLi9iaXMuY29uZmlnJztcbmltcG9ydCB7IFBhdGhUb1JlZ2V4cFNlcnZpY2UgfSBmcm9tICcuL3BhdGgtdG8tcmVnZXhwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY3RHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcbiAgcHJpdmF0ZSBiaXM6IFl1bnphaUJ1c2luZXNzQ29uZmlnID0gQlVTSU5FU1NfREVGQVVMVF9DT05GSUc7XG4gIHByaXZhdGUgbWVudXM6IE56U2FmZUFueVtdID0gW107XG4gIHByaXZhdGUgbGlua3M6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXRoVG9SZWdleHA6IFBhdGhUb1JlZ2V4cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBsb2coJ2FjdDogJyk7XG4gICAgdGhpcy5iaXMgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICAgIGxvZygnYWN0OiBjb25maWcgJywgdGhpcy5iaXMpO1xuICAgIGNvbnN0IHVzZXI6IFVzZXIgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el91c2VyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgbG9nKCdhY3Q6IHVzZXIgJywgdXNlcik7XG4gICAgdGhpcy5tZW51cyA9IGRlZXBDb3B5KHVzZXIubWVudSkuZmlsdGVyKFxuICAgICAgKG06IE1lbnUpID0+IG0uc3lzdGVtQ29kZSAmJiBtLnN5c3RlbUNvZGUgPT09IHRoaXMuYmlzLnN5c3RlbUNvZGVcbiAgICApIGFzIE1lbnVbXTtcbiAgICBsb2coJ2FjdDogbWVudXMgJywgdGhpcy5tZW51cyk7XG4gICAgdGhpcy5nZXRBbGxMaW5rcyh0aGlzLm1lbnVzLCB0aGlzLmxpbmtzKTtcbiAgICBsb2coJ2FjdDogbGlua3MgJywgdGhpcy5saW5rcyk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShcbiAgICBfOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHwgUHJvbWlzZTxib29sZWFuIHwgVXJsVHJlZT4gfCBib29sZWFuIHwgVXJsVHJlZSB7XG4gICAgbG9nKCdhY3Q6IGNhbiBhY3RpdmF0ZSAnLCBzdGF0ZSk7XG4gICAgaWYgKHRoaXMucHJlSGFuZGxlKHN0YXRlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZygnYWN0OiBjYW4gYWN0aXZhdGUgY2hpbGQgcHJlaGFuZGxlIHN1Y2Nlc3MnKTtcbiAgICBsZXQgY2FuYWN0aXZhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbms6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVnZXhwOiBSZWdFeHAgPSB0aGlzLnBhdGhUb1JlZ2V4cC5zdHJpbmdUb1JlZ2V4cChsaW5rLCBudWxsLCBudWxsKTtcbiAgICAgIGxvZyhgYWN0OiAke2xpbmt9IHRlc3QgJHtzdGF0ZS51cmwuc3BsaXQoJz8nKVswXX1gKTtcbiAgICAgIGlmIChyZWdleHAudGVzdChzdGF0ZS51cmwuc3BsaXQoJz8nKVswXSkpIHtcbiAgICAgICAgY2FuYWN0aXZhdGUgPSB0cnVlO1xuICAgICAgICBsb2coYGFjdDogdGVzdCB2YWx1ZSAke2NhbmFjdGl2YXRlfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNhbmFjdGl2YXRlKSB7XG4gICAgICBsb2coYGFjdDogdGVzdCBzdWNlc3NgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2coYGFjdDogdGVzdCBlcnJvcmApO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydkaXNwbGF5SW5kZXgnXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2FuQWN0aXZhdGVDaGlsZChcbiAgICBfOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHwgUHJvbWlzZTxib29sZWFuIHwgVXJsVHJlZT4gfCBib29sZWFuIHwgVXJsVHJlZSB7XG4gICAgbG9nKCdhY3Q6IGNhbiBhY3RpdmF0ZSBjaGlsZCAnLCBzdGF0ZSk7XG4gICAgaWYgKHRoaXMucHJlSGFuZGxlKHN0YXRlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZygnYWN0OiBjYW4gYWN0aXZhdGUgY2hpbGQgcHJlaGFuZGxlIHN1Y2Nlc3MnKTtcblxuICAgIGxldCBjYW5hY3RpdmF0ZSA9IGZhbHNlO1xuICAgIHRoaXMubGlua3MuZm9yRWFjaCgobGluazogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCByZWdleHA6IFJlZ0V4cCA9IHRoaXMucGF0aFRvUmVnZXhwLnN0cmluZ1RvUmVnZXhwKGxpbmssIG51bGwsIG51bGwpO1xuICAgICAgaWYgKHJlZ2V4cC50ZXN0KHN0YXRlLnVybC5zcGxpdCgnPycpWzBdKSkge1xuICAgICAgICBsb2coYGFjdDogJHtsaW5rfSB0ZXN0ICR7c3RhdGUudXJsLnNwbGl0KCc/JylbMF19YCk7XG4gICAgICAgIGNhbmFjdGl2YXRlID0gdHJ1ZTtcbiAgICAgICAgbG9nKGBhY3Q6IHRlc3QgdmFsdWUgJHtjYW5hY3RpdmF0ZX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjYW5hY3RpdmF0ZSkge1xuICAgICAgbG9nKGBhY3Q6IHRlc3Qgc3VjZXNzYCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGBhY3Q6IHRlc3QgZXJyb3JgKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnZGlzcGxheUluZGV4J10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByZUhhbmRsZShzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzdGF0ZS51cmwuaW5jbHVkZXMoJ2Vycm9yJykgfHxcbiAgICAgIHN0YXRlLnVybC5pbmNsdWRlcygnZXhjZXB0aW9uJykgfHxcbiAgICAgIHN0YXRlLnVybC5pbmNsdWRlcygnZGlzcGxheUluZGV4JykgfHxcbiAgICAgIHN0YXRlLnVybCA9PT0gJycgfHxcbiAgICAgIHN0YXRlLnVybCA9PT0gbnVsbCB8fFxuICAgICAgc3RhdGUudXJsID09PSAnLycgfHxcbiAgICAgIHN0YXRlLnVybC5pbmNsdWRlcygnaWZyYW1lUGFnZScpXG4gICAgKTtcbiAgfVxuXG4gIGdldEFsbExpbmtzKG1lbnU6IE1lbnVbXSwgbGlua3M6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgbWVudS5mb3JFYWNoKChzaWRlcjogTWVudSkgPT4ge1xuICAgICAgaWYgKHNpZGVyLmxpbmspIHtcbiAgICAgICAgbGlua3MucHVzaChzaWRlci5saW5rKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaWRlci5jaGlsZHJlbiAmJiBzaWRlci5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0QWxsTGlua3Moc2lkZXIuY2hpbGRyZW4sIGxpbmtzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19