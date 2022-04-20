import { Inject, Injectable, Optional } from '@angular/core';
import { of } from 'rxjs';
import { YUNZAI_I18N_TOKEN } from './i18n';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class YunzaiI18NGuard {
    constructor(i18nSrv, cogSrv) {
        this.i18nSrv = i18nSrv;
        this.cogSrv = cogSrv;
    }
    resolve(route) {
        const lang = route.params && route.params[this.cogSrv.get('themeI18n')?.paramNameOfUrlGuard ?? 'i18n'];
        if (lang != null) {
            this.i18nSrv.use(lang);
        }
        return of(true);
    }
    canActivateChild(childRoute, _) {
        return this.resolve(childRoute);
    }
    canActivate(route, _) {
        return this.resolve(route);
    }
}
YunzaiI18NGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NGuard, deps: [{ token: YUNZAI_I18N_TOKEN, optional: true }, { token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
YunzaiI18NGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NGuard, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i1.YunzaiConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi11cmwuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaTE4bi9pMThuLXVybC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl0QyxPQUFPLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0sUUFBUSxDQUFDOzs7QUFHOUQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFHVSxPQUEwQixFQUMxQixNQUEyQjtRQUQzQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtJQUNsQyxDQUFDO0lBRUksT0FBTyxDQUFDLEtBQTZCO1FBQzNDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxtQkFBbUIsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsZ0JBQWdCLENBQ2QsVUFBa0MsRUFDbEMsQ0FBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQ1QsS0FBNkIsRUFDN0IsQ0FBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7OzRHQTVCVSxlQUFlLGtCQUdoQixpQkFBaUI7Z0hBSGhCLGVBQWUsY0FERixNQUFNOzJGQUNuQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBRzdCLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIFJvdXRlclN0YXRlU25hcHNob3QsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmltcG9ydCB7IFl1bnphaUkxOE5TZXJ2aWNlLCBZVU5aQUlfSTE4Tl9UT0tFTiB9IGZyb20gJy4vaTE4bic7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXVuemFpSTE4Tkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pXG4gICAgcHJpdmF0ZSBpMThuU3J2OiBZdW56YWlJMThOU2VydmljZSxcbiAgICBwcml2YXRlIGNvZ1NydjogWXVuemFpQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgcHJpdmF0ZSByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3QgbGFuZyA9IHJvdXRlLnBhcmFtcyAmJiByb3V0ZS5wYXJhbXNbdGhpcy5jb2dTcnYuZ2V0KCd0aGVtZUkxOG4nKT8ucGFyYW1OYW1lT2ZVcmxHdWFyZCA/PyAnaTE4biddO1xuICAgIGlmIChsYW5nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaTE4blNydi51c2UobGFuZyk7XG4gICAgfVxuICAgIHJldHVybiBvZih0cnVlKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQoXG4gICAgY2hpbGRSb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBfOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IGJvb2xlYW4gfCBVcmxUcmVlIHwgT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4gfCBQcm9taXNlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShjaGlsZFJvdXRlKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlKFxuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIF86IFJvdXRlclN0YXRlU25hcHNob3RcbiAgKTogYm9vbGVhbiB8IFVybFRyZWUgfCBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB8IFByb21pc2U8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlKHJvdXRlKTtcbiAgfVxufVxuIl19