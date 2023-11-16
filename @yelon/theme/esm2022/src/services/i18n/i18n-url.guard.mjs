import { Inject, Injectable, Optional, inject } from '@angular/core';
import { of } from 'rxjs';
import { YUNZAI_I18N_TOKEN } from './i18n';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class YunzaiI18NGuardService {
    constructor(i18nSrv, cogSrv) {
        this.i18nSrv = i18nSrv;
        this.cogSrv = cogSrv;
    }
    process(route) {
        const lang = route.params && route.params[this.cogSrv.get('themeI18n')?.paramNameOfUrlGuard ?? 'i18n'];
        if (lang != null) {
            this.i18nSrv.use(lang);
        }
        return of(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NGuardService, deps: [{ token: YUNZAI_I18N_TOKEN, optional: true }, { token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiI18NGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i1.YunzaiConfigService }]; } });
/**
 * Internationalization guard, automatically recognizes the language in Url and triggers the `YUNZAI_I18N_TOKEN.use` method
 *
 * 国际化守卫，自动识别Url中的语言，并触发 `YUNZAI_I18N_TOKEN.use` 方法
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ yunzaiI18nCanActivate ]
 * }
 * ```
 */
export const yunzaiI18nCanActivate = childRoute => inject(YunzaiI18NGuardService).process(childRoute);
/**
 * Internationalization guard, automatically recognizes the language in Url and triggers the `YUNZAI_I18N_TOKEN.use` method
 *
 * 国际化守卫，自动识别Url中的语言，并触发 `YUNZAI_I18N_TOKEN.use` 方法
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ yunzaiI18nCanActivateChild ]
 * }
 * ```
 */
export const yunzaiI18nCanActivateChild = route => inject(YunzaiI18NGuardService).process(route);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi11cmwuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaTE4bi9pMThuLXVybC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdEMsT0FBTyxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7O0FBRzlELE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFHVSxPQUEwQixFQUMxQixNQUEyQjtRQUQzQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtJQUNsQyxDQUFDO0lBRUosT0FBTyxDQUFDLEtBQTZCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxtQkFBbUIsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDOytHQWRVLHNCQUFzQixrQkFHdkIsaUJBQWlCO21IQUhoQixzQkFBc0IsY0FEVCxNQUFNOzs0RkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBRzdCLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsaUJBQWlCOztBQWM3Qjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFrQixVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVySDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUF1QixLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGVDaGlsZEZuLCBDYW5BY3RpdmF0ZUZuIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuXG5pbXBvcnQgeyBZdW56YWlJMThOU2VydmljZSwgWVVOWkFJX0kxOE5fVE9LRU4gfSBmcm9tICcuL2kxOG4nO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaUkxOE5HdWFyZFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pXG4gICAgcHJpdmF0ZSBpMThuU3J2OiBZdW56YWlJMThOU2VydmljZSxcbiAgICBwcml2YXRlIGNvZ1NydjogWXVuemFpQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgcHJvY2Vzcyhyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGxhbmcgPSByb3V0ZS5wYXJhbXMgJiYgcm91dGUucGFyYW1zW3RoaXMuY29nU3J2LmdldCgndGhlbWVJMThuJyk/LnBhcmFtTmFtZU9mVXJsR3VhcmQgPz8gJ2kxOG4nXTtcbiAgICBpZiAobGFuZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmkxOG5TcnYudXNlKGxhbmcpO1xuICAgIH1cbiAgICByZXR1cm4gb2YodHJ1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm5hdGlvbmFsaXphdGlvbiBndWFyZCwgYXV0b21hdGljYWxseSByZWNvZ25pemVzIHRoZSBsYW5ndWFnZSBpbiBVcmwgYW5kIHRyaWdnZXJzIHRoZSBgWVVOWkFJX0kxOE5fVE9LRU4udXNlYCBtZXRob2RcbiAqXG4gKiDlm73pmYXljJblrojljavvvIzoh6rliqjor4bliKtVcmzkuK3nmoTor63oqIDvvIzlubbop6blj5EgYFlVTlpBSV9JMThOX1RPS0VOLnVzZWAg5pa55rOVXG4gKlxuICogYGBgdHNcbiAqIGRhdGE6IHtcbiAqICBwYXRoOiAnaG9tZScsXG4gKiAgY2FuQWN0aXZhdGU6IFsgeXVuemFpSTE4bkNhbkFjdGl2YXRlIF1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgeXVuemFpSTE4bkNhbkFjdGl2YXRlOiBDYW5BY3RpdmF0ZUZuID0gY2hpbGRSb3V0ZSA9PiBpbmplY3QoWXVuemFpSTE4Tkd1YXJkU2VydmljZSkucHJvY2VzcyhjaGlsZFJvdXRlKTtcblxuLyoqXG4gKiBJbnRlcm5hdGlvbmFsaXphdGlvbiBndWFyZCwgYXV0b21hdGljYWxseSByZWNvZ25pemVzIHRoZSBsYW5ndWFnZSBpbiBVcmwgYW5kIHRyaWdnZXJzIHRoZSBgWVVOWkFJX0kxOE5fVE9LRU4udXNlYCBtZXRob2RcbiAqXG4gKiDlm73pmYXljJblrojljavvvIzoh6rliqjor4bliKtVcmzkuK3nmoTor63oqIDvvIzlubbop6blj5EgYFlVTlpBSV9JMThOX1RPS0VOLnVzZWAg5pa55rOVXG4gKlxuICogYGBgdHNcbiAqIGRhdGE6IHtcbiAqICBwYXRoOiAnaG9tZScsXG4gKiAgY2FuQWN0aXZhdGVDaGlsZDogWyB5dW56YWlJMThuQ2FuQWN0aXZhdGVDaGlsZCBdXG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IHl1bnphaUkxOG5DYW5BY3RpdmF0ZUNoaWxkOiBDYW5BY3RpdmF0ZUNoaWxkRm4gPSByb3V0ZSA9PiBpbmplY3QoWXVuemFpSTE4Tkd1YXJkU2VydmljZSkucHJvY2Vzcyhyb3V0ZSk7XG4iXX0=