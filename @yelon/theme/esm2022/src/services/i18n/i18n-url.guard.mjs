import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { YUNZAI_I18N_TOKEN } from './i18n';
import * as i0 from "@angular/core";
export class YunzaiI18NGuardService {
    constructor() {
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN, { optional: true });
        this.cogSrv = inject(YunzaiConfigService);
    }
    process(route) {
        const lang = route.params && route.params[this.cogSrv.get('themeI18n')?.paramNameOfUrlGuard ?? 'i18n'];
        if (lang != null) {
            this.i18nSrv?.use(lang);
        }
        return of(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NGuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi11cmwuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaTE4bi9pMThuLXVybC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7QUFHM0MsTUFBTSxPQUFPLHNCQUFzQjtJQURuQztRQUVtQixZQUFPLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEQsV0FBTSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBU3ZEO0lBUEMsT0FBTyxDQUFDLEtBQTZCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxtQkFBbUIsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs4R0FWVSxzQkFBc0I7a0hBQXRCLHNCQUFzQixjQURULE1BQU07OzJGQUNuQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztBQWNsQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFrQixVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVySDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUF1QixLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGVDaGlsZEZuLCBDYW5BY3RpdmF0ZUZuIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuXG5pbXBvcnQgeyBZVU5aQUlfSTE4Tl9UT0tFTiB9IGZyb20gJy4vaTE4bic7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXVuemFpSTE4Tkd1YXJkU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4blNydiA9IGluamVjdChZVU5aQUlfSTE4Tl9UT0tFTiwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb2dTcnYgPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSk7XG5cbiAgcHJvY2Vzcyhyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGxhbmcgPSByb3V0ZS5wYXJhbXMgJiYgcm91dGUucGFyYW1zW3RoaXMuY29nU3J2LmdldCgndGhlbWVJMThuJyk/LnBhcmFtTmFtZU9mVXJsR3VhcmQgPz8gJ2kxOG4nXTtcbiAgICBpZiAobGFuZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmkxOG5TcnY/LnVzZShsYW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIG9mKHRydWUpO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJuYXRpb25hbGl6YXRpb24gZ3VhcmQsIGF1dG9tYXRpY2FsbHkgcmVjb2duaXplcyB0aGUgbGFuZ3VhZ2UgaW4gVXJsIGFuZCB0cmlnZ2VycyB0aGUgYFlVTlpBSV9JMThOX1RPS0VOLnVzZWAgbWV0aG9kXG4gKlxuICog5Zu96ZmF5YyW5a6I5Y2r77yM6Ieq5Yqo6K+G5YirVXJs5Lit55qE6K+t6KiA77yM5bm26Kem5Y+RIGBZVU5aQUlfSTE4Tl9UT0tFTi51c2VgIOaWueazlVxuICpcbiAqIGBgYHRzXG4gKiBkYXRhOiB7XG4gKiAgcGF0aDogJ2hvbWUnLFxuICogIGNhbkFjdGl2YXRlOiBbIHl1bnphaUkxOG5DYW5BY3RpdmF0ZSBdXG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IHl1bnphaUkxOG5DYW5BY3RpdmF0ZTogQ2FuQWN0aXZhdGVGbiA9IGNoaWxkUm91dGUgPT4gaW5qZWN0KFl1bnphaUkxOE5HdWFyZFNlcnZpY2UpLnByb2Nlc3MoY2hpbGRSb3V0ZSk7XG5cbi8qKlxuICogSW50ZXJuYXRpb25hbGl6YXRpb24gZ3VhcmQsIGF1dG9tYXRpY2FsbHkgcmVjb2duaXplcyB0aGUgbGFuZ3VhZ2UgaW4gVXJsIGFuZCB0cmlnZ2VycyB0aGUgYFlVTlpBSV9JMThOX1RPS0VOLnVzZWAgbWV0aG9kXG4gKlxuICog5Zu96ZmF5YyW5a6I5Y2r77yM6Ieq5Yqo6K+G5YirVXJs5Lit55qE6K+t6KiA77yM5bm26Kem5Y+RIGBZVU5aQUlfSTE4Tl9UT0tFTi51c2VgIOaWueazlVxuICpcbiAqIGBgYHRzXG4gKiBkYXRhOiB7XG4gKiAgcGF0aDogJ2hvbWUnLFxuICogIGNhbkFjdGl2YXRlQ2hpbGQ6IFsgeXVuemFpSTE4bkNhbkFjdGl2YXRlQ2hpbGQgXVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCB5dW56YWlJMThuQ2FuQWN0aXZhdGVDaGlsZDogQ2FuQWN0aXZhdGVDaGlsZEZuID0gcm91dGUgPT4gaW5qZWN0KFl1bnphaUkxOE5HdWFyZFNlcnZpY2UpLnByb2Nlc3Mocm91dGUpO1xuIl19