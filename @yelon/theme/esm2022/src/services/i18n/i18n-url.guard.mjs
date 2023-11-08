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
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
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
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ yunzaiI18nCanActivateChild ]
 * }
 * ```
 */
export const yunzaiI18nCanActivateChild = route => inject(YunzaiI18NGuardService).process(route);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi11cmwuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaTE4bi9pMThuLXVybC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdEMsT0FBTyxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7O0FBRzlELE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFHVSxPQUEwQixFQUMxQixNQUEyQjtRQUQzQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtJQUNsQyxDQUFDO0lBRUosT0FBTyxDQUFDLEtBQTZCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxtQkFBbUIsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDOytHQWRVLHNCQUFzQixrQkFHdkIsaUJBQWlCO21IQUhoQixzQkFBc0IsY0FEVCxNQUFNOzs0RkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBRzdCLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsaUJBQWlCOztBQWM3Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFckg7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQXVCLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBDYW5BY3RpdmF0ZUNoaWxkRm4sIENhbkFjdGl2YXRlRm4gfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmltcG9ydCB7IFl1bnphaUkxOE5TZXJ2aWNlLCBZVU5aQUlfSTE4Tl9UT0tFTiB9IGZyb20gJy4vaTE4bic7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXVuemFpSTE4Tkd1YXJkU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChZVU5aQUlfSTE4Tl9UT0tFTilcbiAgICBwcml2YXRlIGkxOG5TcnY6IFl1bnphaUkxOE5TZXJ2aWNlLFxuICAgIHByaXZhdGUgY29nU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlXG4gICkge31cblxuICBwcm9jZXNzKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3QgbGFuZyA9IHJvdXRlLnBhcmFtcyAmJiByb3V0ZS5wYXJhbXNbdGhpcy5jb2dTcnYuZ2V0KCd0aGVtZUkxOG4nKT8ucGFyYW1OYW1lT2ZVcmxHdWFyZCA/PyAnaTE4biddO1xuICAgIGlmIChsYW5nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaTE4blNydi51c2UobGFuZyk7XG4gICAgfVxuICAgIHJldHVybiBvZih0cnVlKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSDot6/nlLHlrojljassIFtBQ0wgRG9jdW1lbnRdKGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9hdXRoL2d1YXJkKS5cbiAqXG4gKiBgYGB0c1xuICogZGF0YToge1xuICogIHBhdGg6ICdob21lJyxcbiAqICBjYW5BY3RpdmF0ZTogWyB5dW56YWlJMThuQ2FuQWN0aXZhdGUgXVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCB5dW56YWlJMThuQ2FuQWN0aXZhdGU6IENhbkFjdGl2YXRlRm4gPSBjaGlsZFJvdXRlID0+IGluamVjdChZdW56YWlJMThOR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKGNoaWxkUm91dGUpO1xuXG4vKipcbiAqIFNpbXBsZSDot6/nlLHlrojljassIFtBQ0wgRG9jdW1lbnRdKGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9hdXRoL2d1YXJkKS5cbiAqXG4gKiBgYGB0c1xuICogZGF0YToge1xuICogIHBhdGg6ICdob21lJyxcbiAqICBjYW5BY3RpdmF0ZUNoaWxkOiBbIHl1bnphaUkxOG5DYW5BY3RpdmF0ZUNoaWxkIF1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgeXVuemFpSTE4bkNhbkFjdGl2YXRlQ2hpbGQ6IENhbkFjdGl2YXRlQ2hpbGRGbiA9IHJvdXRlID0+IGluamVjdChZdW56YWlJMThOR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKHJvdXRlKTtcbiJdfQ==