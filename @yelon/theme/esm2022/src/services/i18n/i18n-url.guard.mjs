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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiI18NGuardService, deps: [{ token: YUNZAI_I18N_TOKEN, optional: true }, { token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiI18NGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiI18NGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i1.YunzaiConfigService }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi11cmwuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaTE4bi9pMThuLXVybC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdEMsT0FBTyxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7O0FBRzlELE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFHVSxPQUEwQixFQUMxQixNQUEyQjtRQUQzQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtJQUNsQyxDQUFDO0lBRUosT0FBTyxDQUFDLEtBQTZCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxtQkFBbUIsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs4R0FkVSxzQkFBc0Isa0JBR3ZCLGlCQUFpQjtrSEFIaEIsc0JBQXNCLGNBRFQsTUFBTTs7MkZBQ25CLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQUc3QixRQUFROzswQkFDUixNQUFNOzJCQUFDLGlCQUFpQjs7QUFjN0I7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFckg7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBdUIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlQ2hpbGRGbiwgQ2FuQWN0aXZhdGVGbiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuaW1wb3J0IHsgWXVuemFpSTE4TlNlcnZpY2UsIFlVTlpBSV9JMThOX1RPS0VOIH0gZnJvbSAnLi9pMThuJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZdW56YWlJMThOR3VhcmRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOKVxuICAgIHByaXZhdGUgaTE4blNydjogWXVuemFpSTE4TlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb2dTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIHByb2Nlc3Mocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBsYW5nID0gcm91dGUucGFyYW1zICYmIHJvdXRlLnBhcmFtc1t0aGlzLmNvZ1Nydi5nZXQoJ3RoZW1lSTE4bicpPy5wYXJhbU5hbWVPZlVybEd1YXJkID8/ICdpMThuJ107XG4gICAgaWYgKGxhbmcgIT0gbnVsbCkge1xuICAgICAgdGhpcy5pMThuU3J2LnVzZShsYW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIG9mKHRydWUpO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJuYXRpb25hbGl6YXRpb24gZ3VhcmQsIGF1dG9tYXRpY2FsbHkgcmVjb2duaXplcyB0aGUgbGFuZ3VhZ2UgaW4gVXJsIGFuZCB0cmlnZ2VycyB0aGUgYFlVTlpBSV9JMThOX1RPS0VOLnVzZWAgbWV0aG9kXG4gKlxuICog5Zu96ZmF5YyW5a6I5Y2r77yM6Ieq5Yqo6K+G5YirVXJs5Lit55qE6K+t6KiA77yM5bm26Kem5Y+RIGBZVU5aQUlfSTE4Tl9UT0tFTi51c2VgIOaWueazlVxuICpcbiAqIGBgYHRzXG4gKiBkYXRhOiB7XG4gKiAgcGF0aDogJ2hvbWUnLFxuICogIGNhbkFjdGl2YXRlOiBbIHl1bnphaUkxOG5DYW5BY3RpdmF0ZSBdXG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IHl1bnphaUkxOG5DYW5BY3RpdmF0ZTogQ2FuQWN0aXZhdGVGbiA9IGNoaWxkUm91dGUgPT4gaW5qZWN0KFl1bnphaUkxOE5HdWFyZFNlcnZpY2UpLnByb2Nlc3MoY2hpbGRSb3V0ZSk7XG5cbi8qKlxuICogSW50ZXJuYXRpb25hbGl6YXRpb24gZ3VhcmQsIGF1dG9tYXRpY2FsbHkgcmVjb2duaXplcyB0aGUgbGFuZ3VhZ2UgaW4gVXJsIGFuZCB0cmlnZ2VycyB0aGUgYFlVTlpBSV9JMThOX1RPS0VOLnVzZWAgbWV0aG9kXG4gKlxuICog5Zu96ZmF5YyW5a6I5Y2r77yM6Ieq5Yqo6K+G5YirVXJs5Lit55qE6K+t6KiA77yM5bm26Kem5Y+RIGBZVU5aQUlfSTE4Tl9UT0tFTi51c2VgIOaWueazlVxuICpcbiAqIGBgYHRzXG4gKiBkYXRhOiB7XG4gKiAgcGF0aDogJ2hvbWUnLFxuICogIGNhbkFjdGl2YXRlQ2hpbGQ6IFsgeXVuemFpSTE4bkNhbkFjdGl2YXRlQ2hpbGQgXVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCB5dW56YWlJMThuQ2FuQWN0aXZhdGVDaGlsZDogQ2FuQWN0aXZhdGVDaGlsZEZuID0gcm91dGUgPT4gaW5qZWN0KFl1bnphaUkxOE5HdWFyZFNlcnZpY2UpLnByb2Nlc3Mocm91dGUpO1xuIl19