import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '@yelon/cache';
import { deepCopy, log, YunzaiConfigService } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from './bis.config';
import { PathToRegexpService } from './path-to-regexp.service';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
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
ActGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActGuard_Factory() { return new ActGuard(i0.ɵɵinject(i1.YunzaiConfigService), i0.ɵɵinject(i2.CacheService), i0.ɵɵinject(i3.PathToRegexpService), i0.ɵɵinject(i4.Router)); }, token: ActGuard, providedIn: "root" });
ActGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ActGuard.ctorParameters = () => [
    { type: YunzaiConfigService },
    { type: CacheService },
    { type: PathToRegexpService },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0Lmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC9hY3QuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBSUwsTUFBTSxFQUdQLE1BQU0saUJBQWlCLENBQUM7QUFLekIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBd0IsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBSy9ELE1BQU0sT0FBTyxRQUFRO0lBS25CLFlBQ1UsYUFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsWUFBaUMsRUFDakMsTUFBYztRQUhkLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVJoQixRQUFHLEdBQXlCLHVCQUF1QixDQUFDO1FBQ3BELFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBQ3hCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFRM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLElB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LFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7WUEzR0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFQNkMsbUJBQW1CO1lBRnhELFlBQVk7WUFLWixtQkFBbUI7WUFiMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBDYW5BY3RpdmF0ZUNoaWxkLFxuICBSb3V0ZXIsXG4gIFJvdXRlclN0YXRlU25hcHNob3QsXG4gIFVybFRyZWVcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2NhY2hlJztcbmltcG9ydCB7IE1lbnUsIFVzZXIgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgZGVlcENvcHksIGxvZywgWXVuemFpQnVzaW5lc3NDb25maWcsIFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4vYmlzLmNvbmZpZyc7XG5pbXBvcnQgeyBQYXRoVG9SZWdleHBTZXJ2aWNlIH0gZnJvbSAnLi9wYXRoLXRvLXJlZ2V4cC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG4gIHByaXZhdGUgYmlzOiBZdW56YWlCdXNpbmVzc0NvbmZpZyA9IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHO1xuICBwcml2YXRlIG1lbnVzOiBOelNhZmVBbnlbXSA9IFtdO1xuICBwcml2YXRlIGxpbmtzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogWXVuemFpQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF0aFRvUmVnZXhwOiBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgbG9nKCdhY3Q6ICcpO1xuICAgIHRoaXMuYmlzID0gbWVyZ2VCaXNDb25maWcodGhpcy5jb25maWdTZXJ2aWNlKTtcbiAgICBsb2coJ2FjdDogY29uZmlnICcsIHRoaXMuYmlzKTtcbiAgICBjb25zdCB1c2VyOiBVc2VyID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfdXNlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIGxvZygnYWN0OiB1c2VyICcsIHVzZXIpO1xuICAgIHRoaXMubWVudXMgPSBkZWVwQ29weSh1c2VyLm1lbnUpLmZpbHRlcihcbiAgICAgIChtOiBNZW51KSA9PiBtLnN5c3RlbUNvZGUgJiYgbS5zeXN0ZW1Db2RlID09PSB0aGlzLmJpcy5zeXN0ZW1Db2RlXG4gICAgKSBhcyBNZW51W107XG4gICAgbG9nKCdhY3Q6IG1lbnVzICcsIHRoaXMubWVudXMpO1xuICAgIHRoaXMuZ2V0QWxsTGlua3ModGhpcy5tZW51cywgdGhpcy5saW5rcyk7XG4gICAgbG9nKCdhY3Q6IGxpbmtzICcsIHRoaXMubGlua3MpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUoXG4gICAgXzogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB8IFByb21pc2U8Ym9vbGVhbiB8IFVybFRyZWU+IHwgYm9vbGVhbiB8IFVybFRyZWUge1xuICAgIGxvZygnYWN0OiBjYW4gYWN0aXZhdGUgJywgc3RhdGUpO1xuICAgIGlmICh0aGlzLnByZUhhbmRsZShzdGF0ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2coJ2FjdDogY2FuIGFjdGl2YXRlIGNoaWxkIHByZWhhbmRsZSBzdWNjZXNzJyk7XG4gICAgbGV0IGNhbmFjdGl2YXRlID0gZmFsc2U7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKChsaW5rOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHJlZ2V4cDogUmVnRXhwID0gdGhpcy5wYXRoVG9SZWdleHAuc3RyaW5nVG9SZWdleHAobGluaywgbnVsbCwgbnVsbCk7XG4gICAgICBsb2coYGFjdDogJHtsaW5rfSB0ZXN0ICR7c3RhdGUudXJsLnNwbGl0KCc/JylbMF19YCk7XG4gICAgICBpZiAocmVnZXhwLnRlc3Qoc3RhdGUudXJsLnNwbGl0KCc/JylbMF0pKSB7XG4gICAgICAgIGNhbmFjdGl2YXRlID0gdHJ1ZTtcbiAgICAgICAgbG9nKGBhY3Q6IHRlc3QgdmFsdWUgJHtjYW5hY3RpdmF0ZX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjYW5hY3RpdmF0ZSkge1xuICAgICAgbG9nKGBhY3Q6IHRlc3Qgc3VjZXNzYCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGBhY3Q6IHRlc3QgZXJyb3JgKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnZGlzcGxheUluZGV4J10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQoXG4gICAgXzogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB8IFByb21pc2U8Ym9vbGVhbiB8IFVybFRyZWU+IHwgYm9vbGVhbiB8IFVybFRyZWUge1xuICAgIGxvZygnYWN0OiBjYW4gYWN0aXZhdGUgY2hpbGQgJywgc3RhdGUpO1xuICAgIGlmICh0aGlzLnByZUhhbmRsZShzdGF0ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2coJ2FjdDogY2FuIGFjdGl2YXRlIGNoaWxkIHByZWhhbmRsZSBzdWNjZXNzJyk7XG5cbiAgICBsZXQgY2FuYWN0aXZhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbms6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVnZXhwOiBSZWdFeHAgPSB0aGlzLnBhdGhUb1JlZ2V4cC5zdHJpbmdUb1JlZ2V4cChsaW5rLCBudWxsLCBudWxsKTtcbiAgICAgIGlmIChyZWdleHAudGVzdChzdGF0ZS51cmwuc3BsaXQoJz8nKVswXSkpIHtcbiAgICAgICAgbG9nKGBhY3Q6ICR7bGlua30gdGVzdCAke3N0YXRlLnVybC5zcGxpdCgnPycpWzBdfWApO1xuICAgICAgICBjYW5hY3RpdmF0ZSA9IHRydWU7XG4gICAgICAgIGxvZyhgYWN0OiB0ZXN0IHZhbHVlICR7Y2FuYWN0aXZhdGV9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoY2FuYWN0aXZhdGUpIHtcbiAgICAgIGxvZyhgYWN0OiB0ZXN0IHN1Y2Vzc2ApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhgYWN0OiB0ZXN0IGVycm9yYCk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2Rpc3BsYXlJbmRleCddKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcmVIYW5kbGUoc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgc3RhdGUudXJsLmluY2x1ZGVzKCdlcnJvcicpIHx8XG4gICAgICBzdGF0ZS51cmwuaW5jbHVkZXMoJ2V4Y2VwdGlvbicpIHx8XG4gICAgICBzdGF0ZS51cmwuaW5jbHVkZXMoJ2Rpc3BsYXlJbmRleCcpIHx8XG4gICAgICBzdGF0ZS51cmwgPT09ICcnIHx8XG4gICAgICBzdGF0ZS51cmwgPT09IG51bGwgfHxcbiAgICAgIHN0YXRlLnVybCA9PT0gJy8nIHx8XG4gICAgICBzdGF0ZS51cmwuaW5jbHVkZXMoJ2lmcmFtZVBhZ2UnKVxuICAgICk7XG4gIH1cblxuICBnZXRBbGxMaW5rcyhtZW51OiBNZW51W10sIGxpbmtzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIG1lbnUuZm9yRWFjaCgoc2lkZXI6IE1lbnUpID0+IHtcbiAgICAgIGlmIChzaWRlci5saW5rKSB7XG4gICAgICAgIGxpbmtzLnB1c2goc2lkZXIubGluayk7XG4gICAgICB9XG4gICAgICBpZiAoc2lkZXIuY2hpbGRyZW4gJiYgc2lkZXIuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmdldEFsbExpbmtzKHNpZGVyLmNoaWxkcmVuLCBsaW5rcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==