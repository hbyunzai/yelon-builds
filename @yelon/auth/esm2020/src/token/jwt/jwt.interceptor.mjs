import { Injectable } from '@angular/core';
import { BaseInterceptor } from '../base.interceptor';
import { CheckJwt } from '../helper';
import { YA_SERVICE_TOKEN } from '../interface';
import { JWTTokenModel } from './jwt.model';
import * as i0 from "@angular/core";
/**
 * JWT 拦截器
 *
 * ```
 * // app.module.ts
 * { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
 * ```
 */
export class JWTInterceptor extends BaseInterceptor {
    isAuth(options) {
        this.model = this.injector.get(YA_SERVICE_TOKEN).get(JWTTokenModel);
        return CheckJwt(this.model, options.token_exp_offset);
    }
    setReq(req, _options) {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.model.token}`
            }
        });
    }
}
JWTInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: JWTInterceptor, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
JWTInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: JWTInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: JWTInterceptor, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYXV0aC9zcmMvdG9rZW4vand0L2p3dC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUU1Qzs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLGNBQWUsU0FBUSxlQUFlO0lBQ2pELE1BQU0sQ0FBQyxPQUF5QjtRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFnQixhQUFhLENBQUMsQ0FBQztRQUNuRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBc0IsRUFBRSxPQUFPLENBQUMsZ0JBQWlCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTJCLEVBQUUsUUFBMEI7UUFDNUQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2YsVUFBVSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7MkdBWlUsY0FBYzsrR0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBZdW56YWlBdXRoQ29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuaW1wb3J0IHsgQmFzZUludGVyY2VwdG9yIH0gZnJvbSAnLi4vYmFzZS5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBDaGVja0p3dCB9IGZyb20gJy4uL2hlbHBlcic7XG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOIH0gZnJvbSAnLi4vaW50ZXJmYWNlJztcbmltcG9ydCB7IEpXVFRva2VuTW9kZWwgfSBmcm9tICcuL2p3dC5tb2RlbCc7XG5cbi8qKlxuICogSldUIOaLpuaIquWZqFxuICpcbiAqIGBgYFxuICogLy8gYXBwLm1vZHVsZS50c1xuICogeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEpXVEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZX1cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSldUSW50ZXJjZXB0b3IgZXh0ZW5kcyBCYXNlSW50ZXJjZXB0b3Ige1xuICBpc0F1dGgob3B0aW9uczogWXVuemFpQXV0aENvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMubW9kZWwgPSB0aGlzLmluamVjdG9yLmdldChZQV9TRVJWSUNFX1RPS0VOKS5nZXQ8SldUVG9rZW5Nb2RlbD4oSldUVG9rZW5Nb2RlbCk7XG4gICAgcmV0dXJuIENoZWNrSnd0KHRoaXMubW9kZWwgYXMgSldUVG9rZW5Nb2RlbCwgb3B0aW9ucy50b2tlbl9leHBfb2Zmc2V0ISk7XG4gIH1cblxuICBzZXRSZXEocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+LCBfb3B0aW9uczogWXVuemFpQXV0aENvbmZpZyk6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4ge1xuICAgIHJldHVybiByZXEuY2xvbmUoe1xuICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5tb2RlbC50b2tlbn1gXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==