import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { YUNZAI_I18N_TOKEN, _HttpClient } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { YunzaiConfigService } from '@yelon/util/config';
import { log } from '@yelon/util/other';
import { mergeBisConfig } from './bis.config';
import * as i0 from "@angular/core";
const CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};
/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
export class YzDefaultInterceptor {
    constructor(injector) {
        this.injector = injector;
        this.jump = false;
        this.refreshToking = false;
        this.refreshToken$ = new BehaviorSubject(null);
        if (this.config.refreshTokenType === 'auth-refresh') {
            console.error("can't use auth-refresh, please change yz.default.interceptor to default.interceptor!");
        }
    }
    get notification() {
        return this.injector.get(NzNotificationService);
    }
    get tokenSrv() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get http() {
        return this.injector.get(_HttpClient);
    }
    get config() {
        return mergeBisConfig(this.injector.get(YunzaiConfigService));
    }
    goTo(url) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }
    checkStatus(ev) {
        if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
            return;
        }
        if (ev instanceof HttpErrorResponse && (ev.error.message || ev.error.errorMessage)) {
            if (ev.error.errorMessage) {
                this.notification.error(`发生了一些错误 `, ev.error.errorMessage);
            }
            else {
                this.notification.error(`发生了一些错误 `, ev.error.message);
            }
            return;
        }
        if (ev instanceof HttpResponse && ev.body.errorMessage) {
            this.notification.error(`发生了一些错误 `, ev.body.errorMessage);
            return;
        }
        const errortext = CODEMESSAGE[ev.status] || ev.statusText;
        this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
    }
    ToLogin() {
        this.notification.error(`未登录或登录状态已过期，5秒后将跳转到登录页面。`, ``);
        setTimeout(() => {
            localStorage.clear();
            this.injector.get(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
        }, 5000);
    }
    reAttachToken(req) {
        const token = this.tokenSrv.get()?.token;
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    refreshTokenRequest() {
        const model = this.tokenSrv.get();
        const form = new FormData();
        form.set('refresh_token', model?.refreshToken);
        log('yz.default.interceptor: use the refresh token to request a new token', model?.refreshToken);
        return this.http.post(`/auth/user/token/refresh?_allow_anonymous=true`, form);
    }
    tryRefreshToken(ev, req, next) {
        // 连刷新Token的请求都错了，那就是真错了
        if (['/auth/oauth/token'].some(url => req.url.includes(url))) {
            this.ToLogin();
            return throwError(ev);
        }
        // 正在刷新token，所有其他请求排队
        if (this.refreshToking) {
            return this.refreshToken$.pipe(filter(v => !!v), take(1), switchMap(() => next.handle(this.reAttachToken(req))));
        }
        //尝试调用刷新 Token
        this.refreshToking = true;
        this.refreshToken$.next(null);
        // 处理Token
        return this.refreshTokenRequest().pipe(switchMap(res => {
            log('yz.default.interceptor: refresh token accessed -> ', res);
            // 重新保存新 token
            const { access_token, expires_in, refresh_token, scope, token_type } = res;
            this.tokenSrv.set({
                token: access_token,
                expired: expires_in,
                refreshToken: refresh_token,
                tokenType: token_type,
                scope
            });
            // 通知后续请求继续执行
            this.refreshToking = false;
            this.refreshToken$.next(res);
            // 重新发起请求
            return next.handle(this.reAttachToken(req));
        }), catchError(err => {
            this.refreshToking = false;
            this.ToLogin();
            return throwError(err);
        }));
    }
    getAdditionalHeaders(headers) {
        const res = {};
        const lang = this.injector.get(YUNZAI_I18N_TOKEN).currentLang;
        if (!headers?.has('Accept-Language') && lang) {
            res['Accept-Language'] = lang;
        }
        return res;
    }
    handleData(ev, req, next) {
        this.checkStatus(ev);
        switch (ev.status) {
            case 200:
                return of(ev);
            case 401:
                if (this.config.refreshTokenEnabled && this.config.refreshTokenType === 're-request') {
                    return this.tryRefreshToken(ev, req, next);
                }
                this.ToLogin();
                break;
            case 403:
            case 404:
            case 500:
                if (this.jump) {
                    this.goTo(`/exception/${ev.status}`);
                }
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    console.warn('未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng.yunzainfo.com/docs/server 解决跨域问题', ev);
                }
                break;
        }
        if (ev instanceof HttpErrorResponse) {
            return throwError(ev);
        }
        else {
            return of(ev);
        }
    }
    intercept(req, next) {
        log('yz.default.interceptor.ts: ', 'request ', req);
        // 统一加前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = this.config.baseUrl + url;
        }
        if (url.includes('.json') && url.includes('assets')) {
            url = req.url;
        }
        // 加入语言头
        const newReq = req.clone({ url, setHeaders: this.getAdditionalHeaders(req.headers) });
        return next.handle(newReq).pipe(mergeMap(ev => {
            // 允许统一对请求错误处理
            if (ev instanceof HttpResponseBase) {
                return this.handleData(ev, newReq, next);
            }
            // 若一切都正常，则后续操作
            return of(ev);
        }), catchError((err) => this.handleData(err, newReq, next)));
    }
}
YzDefaultInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzDefaultInterceptor, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
YzDefaultInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzDefaultInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzDefaultInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouZGVmYXVsdC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQveXouZGVmYXVsdC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBTWpCLFlBQVksRUFDWixnQkFBZ0IsRUFDakIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQWlCLE1BQU0sYUFBYSxDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQXdCLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBRTlDLE1BQU0sV0FBVyxHQUE4QjtJQUM3QyxHQUFHLEVBQUUsZUFBZTtJQUNwQixHQUFHLEVBQUUsWUFBWTtJQUNqQixHQUFHLEVBQUUscUJBQXFCO0lBQzFCLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLDZCQUE2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QUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ2Y7UUFDRCxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDN0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1osY0FBYztZQUNkLElBQUksRUFBRSxZQUFZLGdCQUFnQixFQUFFO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxQztZQUNELGVBQWU7WUFDZixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxHQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDM0UsQ0FBQztJQUNKLENBQUM7O2lIQS9MVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBIZWFkZXJzLFxuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwUmVzcG9uc2UsXG4gIEh0dHBSZXNwb25zZUJhc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaWx0ZXIsIG1lcmdlTWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Tm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbm90aWZpY2F0aW9uJztcblxuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiwgSVRva2VuU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IFlVTlpBSV9JMThOX1RPS0VOLCBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBZdW56YWlCdXNpbmVzc0NvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5cbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnLi9iaXMuY29uZmlnJztcblxuY29uc3QgQ09ERU1FU1NBR0U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XG4gIDIwMDogJ+acjeWKoeWZqOaIkOWKn+i/lOWbnuivt+axgueahOaVsOaNruOAgicsXG4gIDIwMTogJ+aWsOW7uuaIluS/ruaUueaVsOaNruaIkOWKn+OAgicsXG4gIDIwMjogJ+S4gOS4quivt+axguW3sue7j+i/m+WFpeWQjuWPsOaOkumYn++8iOW8guatpeS7u+WKoe+8ieOAgicsXG4gIDIwNDogJ+WIoOmZpOaVsOaNruaIkOWKn+OAgicsXG4gIDQwMDogJ+WPkeWHuueahOivt+axguaciemUmeivr++8jOacjeWKoeWZqOayoeaciei/m+ihjOaWsOW7uuaIluS/ruaUueaVsOaNrueahOaTjeS9nOOAgicsXG4gIDQwMTogJ+eUqOaIt+ayoeacieadg+mZkO+8iOS7pOeJjOOAgeeUqOaIt+WQjeOAgeWvhueggemUmeivr++8ieOAgicsXG4gIDQwMzogJ+eUqOaIt+W+l+WIsOaOiOadg++8jOS9huaYr+iuv+mXruaYr+iiq+emgeatoueahOOAgicsXG4gIDQwNDogJ+WPkeWHuueahOivt+axgumSiOWvueeahOaYr+S4jeWtmOWcqOeahOiusOW9le+8jOacjeWKoeWZqOayoeaciei/m+ihjOaTjeS9nOOAgicsXG4gIDQwNjogJ+ivt+axgueahOagvOW8j+S4jeWPr+W+l+OAgicsXG4gIDQxMDogJ+ivt+axgueahOi1hOa6kOiiq+awuOS5heWIoOmZpO+8jOS4lOS4jeS8muWGjeW+l+WIsOeahOOAgicsXG4gIDQyMjogJ+W9k+WIm+W7uuS4gOS4quWvueixoeaXtu+8jOWPkeeUn+S4gOS4qumqjOivgemUmeivr+OAgicsXG4gIDUwMDogJ+acjeWKoeWZqOWPkeeUn+mUmeivr++8jOivt+ajgOafpeacjeWKoeWZqOOAgicsXG4gIDUwMjogJ+e9keWFs+mUmeivr+OAgicsXG4gIDUwMzogJ+acjeWKoeS4jeWPr+eUqO+8jOacjeWKoeWZqOaaguaXtui/h+i9veaIlue7tOaKpOOAgicsXG4gIDUwNDogJ+e9keWFs+i2heaXtuOAgidcbn07XG5cbi8qKlxuICog6buY6K6kSFRUUOaLpuaIquWZqO+8jOWFtuazqOWGjOe7huiKguingSBgYXBwLm1vZHVsZS50c2BcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl6RGVmYXVsdEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSBqdW1wID0gZmFsc2U7XG4gIHByaXZhdGUgcmVmcmVzaFRva2luZyA9IGZhbHNlO1xuICBwcml2YXRlIHJlZnJlc2hUb2tlbiQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuXG4gIHByaXZhdGUgZ2V0IG5vdGlmaWNhdGlvbigpOiBOek5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChOek5vdGlmaWNhdGlvblNlcnZpY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdG9rZW5TcnYoKTogSVRva2VuU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KFlBX1NFUlZJQ0VfVE9LRU4pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaHR0cCgpOiBfSHR0cENsaWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KF9IdHRwQ2xpZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBZdW56YWlCdXNpbmVzc0NvbmZpZyB7XG4gICAgcmV0dXJuIG1lcmdlQmlzQ29uZmlnKHRoaXMuaW5qZWN0b3IuZ2V0KFl1bnphaUNvbmZpZ1NlcnZpY2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ubyh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbmplY3Rvci5nZXQoUm91dGVyKS5uYXZpZ2F0ZUJ5VXJsKHVybCkpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBpZiAodGhpcy5jb25maWcucmVmcmVzaFRva2VuVHlwZSA9PT0gJ2F1dGgtcmVmcmVzaCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW4ndCB1c2UgYXV0aC1yZWZyZXNoLCBwbGVhc2UgY2hhbmdlIHl6LmRlZmF1bHQuaW50ZXJjZXB0b3IgdG8gZGVmYXVsdC5pbnRlcmNlcHRvciFcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1N0YXR1cyhldjogSHR0cFJlc3BvbnNlQmFzZSk6IHZvaWQge1xuICAgIGlmICgoZXYuc3RhdHVzID49IDIwMCAmJiBldi5zdGF0dXMgPCAzMDApIHx8IGV2LnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2IGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgJiYgKGV2LmVycm9yLm1lc3NhZ2UgfHwgZXYuZXJyb3IuZXJyb3JNZXNzYWdlKSkge1xuICAgICAgaWYgKGV2LmVycm9yLmVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg5Y+R55Sf5LqG5LiA5Lqb6ZSZ6K+vIGAsIGV2LmVycm9yLmVycm9yTWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg5Y+R55Sf5LqG5LiA5Lqb6ZSZ6K+vIGAsIGV2LmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldiBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJiBldi5ib2R5LmVycm9yTWVzc2FnZSkge1xuICAgICAgdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoYOWPkeeUn+S6huS4gOS6m+mUmeivryBgLCBldi5ib2R5LmVycm9yTWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVycm9ydGV4dCA9IENPREVNRVNTQUdFW2V2LnN0YXR1c10gfHwgZXYuc3RhdHVzVGV4dDtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg6K+35rGC6ZSZ6K+vICR7ZXYuc3RhdHVzfTogJHtldi51cmx9YCwgZXJyb3J0ZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgVG9Mb2dpbigpIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg5pyq55m75b2V5oiW55m75b2V54q25oCB5bey6L+H5pyf77yMNeenkuWQjuWwhui3s+i9rOWIsOeZu+W9lemhtemdouOAgmAsIGBgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgdGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgcHJpdmF0ZSByZUF0dGFjaFRva2VuKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNydi5nZXQoKT8udG9rZW47XG4gICAgcmV0dXJuIHJlcS5jbG9uZSh7XG4gICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hUb2tlblJlcXVlc3QoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMudG9rZW5TcnYuZ2V0KCk7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm0uc2V0KCdyZWZyZXNoX3Rva2VuJywgbW9kZWw/LnJlZnJlc2hUb2tlbik7XG4gICAgbG9nKCd5ei5kZWZhdWx0LmludGVyY2VwdG9yOiB1c2UgdGhlIHJlZnJlc2ggdG9rZW4gdG8gcmVxdWVzdCBhIG5ldyB0b2tlbicsIG1vZGVsPy5yZWZyZXNoVG9rZW4pO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgL2F1dGgvdXNlci90b2tlbi9yZWZyZXNoP19hbGxvd19hbm9ueW1vdXM9dHJ1ZWAsIGZvcm0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlSZWZyZXNoVG9rZW4oZXY6IEh0dHBSZXNwb25zZUJhc2UsIHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIOi/nuWIt+aWsFRva2Vu55qE6K+35rGC6YO96ZSZ5LqG77yM6YKj5bCx5piv55yf6ZSZ5LqGXG4gICAgaWYgKFsnL2F1dGgvb2F1dGgvdG9rZW4nXS5zb21lKHVybCA9PiByZXEudXJsLmluY2x1ZGVzKHVybCkpKSB7XG4gICAgICB0aGlzLlRvTG9naW4oKTtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKGV2KTtcbiAgICB9XG5cbiAgICAvLyDmraPlnKjliLfmlrB0b2tlbu+8jOaJgOacieWFtuS7luivt+axguaOkumYn1xuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnJlc2hUb2tlbiQucGlwZShcbiAgICAgICAgZmlsdGVyKHYgPT4gISF2KSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG5leHQuaGFuZGxlKHRoaXMucmVBdHRhY2hUb2tlbihyZXEpKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy/lsJ3or5XosIPnlKjliLfmlrAgVG9rZW5cbiAgICB0aGlzLnJlZnJlc2hUb2tpbmcgPSB0cnVlO1xuICAgIHRoaXMucmVmcmVzaFRva2VuJC5uZXh0KG51bGwpO1xuXG4gICAgLy8g5aSE55CGVG9rZW5cbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW5SZXF1ZXN0KCkucGlwZShcbiAgICAgIHN3aXRjaE1hcChyZXMgPT4ge1xuICAgICAgICBsb2coJ3l6LmRlZmF1bHQuaW50ZXJjZXB0b3I6IHJlZnJlc2ggdG9rZW4gYWNjZXNzZWQgLT4gJywgcmVzKTtcbiAgICAgICAgLy8g6YeN5paw5L+d5a2Y5pawIHRva2VuXG4gICAgICAgIGNvbnN0IHsgYWNjZXNzX3Rva2VuLCBleHBpcmVzX2luLCByZWZyZXNoX3Rva2VuLCBzY29wZSwgdG9rZW5fdHlwZSB9ID0gcmVzO1xuICAgICAgICB0aGlzLnRva2VuU3J2LnNldCh7XG4gICAgICAgICAgdG9rZW46IGFjY2Vzc190b2tlbixcbiAgICAgICAgICBleHBpcmVkOiBleHBpcmVzX2luLFxuICAgICAgICAgIHJlZnJlc2hUb2tlbjogcmVmcmVzaF90b2tlbixcbiAgICAgICAgICB0b2tlblR5cGU6IHRva2VuX3R5cGUsXG4gICAgICAgICAgc2NvcGVcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOmAmuefpeWQjue7reivt+axgue7p+e7reaJp+ihjFxuICAgICAgICB0aGlzLnJlZnJlc2hUb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW4kLm5leHQocmVzKTtcbiAgICAgICAgLy8g6YeN5paw5Y+R6LW36K+35rGCXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLnJlQXR0YWNoVG9rZW4ocmVxKSk7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuVG9Mb2dpbigpO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBZGRpdGlvbmFsSGVhZGVycyhoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gICAgY29uc3QgcmVzOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIGNvbnN0IGxhbmcgPSB0aGlzLmluamVjdG9yLmdldChZVU5aQUlfSTE4Tl9UT0tFTikuY3VycmVudExhbmc7XG4gICAgaWYgKCFoZWFkZXJzPy5oYXMoJ0FjY2VwdC1MYW5ndWFnZScpICYmIGxhbmcpIHtcbiAgICAgIHJlc1snQWNjZXB0LUxhbmd1YWdlJ10gPSBsYW5nO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEYXRhKGV2OiBIdHRwUmVzcG9uc2VCYXNlLCByZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmNoZWNrU3RhdHVzKGV2KTtcbiAgICBzd2l0Y2ggKGV2LnN0YXR1cykge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIHJldHVybiBvZihldik7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJlZnJlc2hUb2tlbkVuYWJsZWQgJiYgdGhpcy5jb25maWcucmVmcmVzaFRva2VuVHlwZSA9PT0gJ3JlLXJlcXVlc3QnKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJ5UmVmcmVzaFRva2VuKGV2LCByZXEsIG5leHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuVG9Mb2dpbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAzOlxuICAgICAgY2FzZSA0MDQ6XG4gICAgICBjYXNlIDUwMDpcbiAgICAgICAgaWYgKHRoaXMuanVtcCkge1xuICAgICAgICAgIHRoaXMuZ29UbyhgL2V4Y2VwdGlvbi8ke2V2LnN0YXR1c31gKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChldiBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ+acquWPr+efpemUmeivr++8jOWkp+mDqOWIhuaYr+eUseS6juWQjuerr+S4jeaUr+aMgei3qOWfn0NPUlPmiJbml6DmlYjphY3nva7lvJXotbfvvIzor7flj4LogIMgaHR0cHM6Ly9uZy55dW56YWluZm8uY29tL2RvY3Mvc2VydmVyIOino+WGs+i3qOWfn+mXrumimCcsXG4gICAgICAgICAgICBldlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChldiBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihldik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihldik7XG4gICAgfVxuICB9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgbG9nKCd5ei5kZWZhdWx0LmludGVyY2VwdG9yLnRzOiAnLCAncmVxdWVzdCAnLCByZXEpO1xuICAgIC8vIOe7n+S4gOWKoOWJjee8gFxuICAgIGxldCB1cmwgPSByZXEudXJsO1xuICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykgJiYgIXVybC5zdGFydHNXaXRoKCdodHRwOi8vJykpIHtcbiAgICAgIHVybCA9IHRoaXMuY29uZmlnLmJhc2VVcmwgKyB1cmw7XG4gICAgfVxuICAgIGlmICh1cmwuaW5jbHVkZXMoJy5qc29uJykgJiYgdXJsLmluY2x1ZGVzKCdhc3NldHMnKSkge1xuICAgICAgdXJsID0gcmVxLnVybDtcbiAgICB9XG4gICAgLy8g5Yqg5YWl6K+t6KiA5aS0XG4gICAgY29uc3QgbmV3UmVxID0gcmVxLmNsb25lKHsgdXJsLCBzZXRIZWFkZXJzOiB0aGlzLmdldEFkZGl0aW9uYWxIZWFkZXJzKHJlcS5oZWFkZXJzKSB9KTtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoZXYgPT4ge1xuICAgICAgICAvLyDlhYHorrjnu5/kuIDlr7nor7fmsYLplJnor6/lpITnkIZcbiAgICAgICAgaWYgKGV2IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZURhdGEoZXYsIG5ld1JlcSwgbmV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6Iul5LiA5YiH6YO95q2j5bi477yM5YiZ5ZCO57ut5pON5L2cXG4gICAgICAgIHJldHVybiBvZihldik7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRGF0YShlcnIsIG5ld1JlcSwgbmV4dCkpXG4gICAgKTtcbiAgfVxufVxuIl19