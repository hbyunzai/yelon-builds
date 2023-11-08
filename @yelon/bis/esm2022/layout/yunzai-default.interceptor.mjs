import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError, catchError, filter, mergeMap, switchMap, take } from 'rxjs';
import { YA_SERVICE_TOKEN, ALLOW_ANONYMOUS } from '@yelon/auth';
import { YUNZAI_I18N_TOKEN, _HttpClient } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { YunzaiConfigService } from '@yelon/util/config';
import { log } from '@yelon/util/other';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
class YunzaiDefaultInterceptor {
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
    constructor(injector) {
        this.injector = injector;
        this.jump = false;
        this.refreshToking = false;
        this.refreshToken$ = new BehaviorSubject(null);
        if (this.config.refreshTokenType === 'auth-refresh') {
            console.error("can't use auth-refresh, please change yz.default.interceptor to default.interceptor!");
        }
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
        const token = this.tokenSrv.get()?.access_token;
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    refreshTokenRequest() {
        const model = this.tokenSrv.get();
        const form = new FormData();
        form.set('refresh_token', model?.refresh_token);
        form.set('grant_type', 'refresh_token');
        form.set('scope', 'webapp');
        log('yz.default.interceptor: use the refresh token to request a new token', model?.refresh_token);
        return this.http.post(`/auth/oauth/getOrCreateToken/webapp`, form);
    }
    tryRefreshToken(ev, req, next) {
        // 连刷新Token的请求都错了，那就是真错了
        if (['/auth/oauth/getOrCreateToken/webapp'].some(url => req.url.includes(url))) {
            this.ToLogin();
            return throwError(() => ev);
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
            this.tokenSrv.set(res);
            // 通知后续请求继续执行
            this.refreshToking = false;
            this.refreshToken$.next(res);
            // 重新发起请求
            return next.handle(this.reAttachToken(req));
        }), catchError(err => {
            this.refreshToking = false;
            this.ToLogin();
            return throwError(() => err);
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
                log("http401: ", req.url);
                if (this.config.refreshTokenEnabled && this.config.refreshTokenType === 're-request') {
                    const unAuthorizationReq = req.clone();
                    unAuthorizationReq.headers.delete('Authorization');
                    return this.tryRefreshToken(ev, unAuthorizationReq, next);
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
            return throwError(() => ev);
        }
        else {
            return of(ev);
        }
    }
    intercept(req, next) {
        if (req.context.get(ALLOW_ANONYMOUS))
            return next.handle(req);
        log('yz.default.interceptor.ts: ', 'request ', req);
        // 统一加前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = this.config.baseUrl + url;
        }
        if (url.includes('.json') && url.includes('assets')) {
            url = req.url;
        }
        // if (url.includes('i18n')) return next.handle(req);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDefaultInterceptor, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDefaultInterceptor }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDefaultInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
export { YunzaiDefaultInterceptor as YzDefaultInterceptor, YunzaiDefaultInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlZmF1bHQuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3l1bnphaS1kZWZhdWx0LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFLTCxpQkFBaUIsRUFFakIsWUFBWSxFQUNaLGdCQUFnQixFQUNqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRWxILE9BQU8sRUFBRSxnQkFBZ0IsRUFBaUIsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQXdCLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBRTlDLE1BQU0sV0FBVyxHQUE4QjtJQUM3QyxHQUFHLEVBQUUsZUFBZTtJQUNwQixHQUFHLEVBQUUsWUFBWTtJQUNqQixHQUFHLEVBQUUscUJBQXFCO0lBQzFCLEdBQUcsRUFBRSxTQUFTO0lBQ2QsR0FBRyxFQUFFLDZCQUE2QjtJQUNsQyxHQUFHLEVB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dHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBIZWFkZXJzLFxuICBIdHRwUmVzcG9uc2UsXG4gIEh0dHBSZXNwb25zZUJhc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG9mLCB0aHJvd0Vycm9yLCBjYXRjaEVycm9yLCBmaWx0ZXIsIG1lcmdlTWFwLCBzd2l0Y2hNYXAsIHRha2UsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWUFfU0VSVklDRV9UT0tFTiwgSVRva2VuU2VydmljZSwgQUxMT1dfQU5PTllNT1VTIH0gZnJvbSAnQHllbG9uL2F1dGgnO1xuaW1wb3J0IHsgWVVOWkFJX0kxOE5fVE9LRU4sIF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IFl1bnphaUJ1c2luZXNzQ29uZmlnLCBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB7IE56Tm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbm90aWZpY2F0aW9uJztcblxuaW1wb3J0IHsgbWVyZ2VCaXNDb25maWcgfSBmcm9tICcuL2Jpcy5jb25maWcnO1xuXG5jb25zdCBDT0RFTUVTU0FHRTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcbiAgMjAwOiAn5pyN5Yqh5Zmo5oiQ5Yqf6L+U5Zue6K+35rGC55qE5pWw5o2u44CCJyxcbiAgMjAxOiAn5paw5bu65oiW5L+u5pS55pWw5o2u5oiQ5Yqf44CCJyxcbiAgMjAyOiAn5LiA5Liq6K+35rGC5bey57uP6L+b5YWl5ZCO5Y+w5o6S6Zif77yI5byC5q2l5Lu75Yqh77yJ44CCJyxcbiAgMjA0OiAn5Yig6Zmk5pWw5o2u5oiQ5Yqf44CCJyxcbiAgNDAwOiAn5Y+R5Ye655qE6K+35rGC5pyJ6ZSZ6K+v77yM5pyN5Yqh5Zmo5rKh5pyJ6L+b6KGM5paw5bu65oiW5L+u5pS55pWw5o2u55qE5pON5L2c44CCJyxcbiAgNDAxOiAn55So5oi35rKh5pyJ5p2D6ZmQ77yI5Luk54mM44CB55So5oi35ZCN44CB5a+G56CB6ZSZ6K+v77yJ44CCJyxcbiAgNDAzOiAn55So5oi35b6X5Yiw5o6I5p2D77yM5L2G5piv6K6/6Zeu5piv6KKr56aB5q2i55qE44CCJyxcbiAgNDA0OiAn5Y+R5Ye655qE6K+35rGC6ZKI5a+555qE5piv5LiN5a2Y5Zyo55qE6K6w5b2V77yM5pyN5Yqh5Zmo5rKh5pyJ6L+b6KGM5pON5L2c44CCJyxcbiAgNDA2OiAn6K+35rGC55qE5qC85byP5LiN5Y+v5b6X44CCJyxcbiAgNDEwOiAn6K+35rGC55qE6LWE5rqQ6KKr5rC45LmF5Yig6Zmk77yM5LiU5LiN5Lya5YaN5b6X5Yiw55qE44CCJyxcbiAgNDIyOiAn5b2T5Yib5bu65LiA5Liq5a+56LGh5pe277yM5Y+R55Sf5LiA5Liq6aqM6K+B6ZSZ6K+v44CCJyxcbiAgNTAwOiAn5pyN5Yqh5Zmo5Y+R55Sf6ZSZ6K+v77yM6K+35qOA5p+l5pyN5Yqh5Zmo44CCJyxcbiAgNTAyOiAn572R5YWz6ZSZ6K+v44CCJyxcbiAgNTAzOiAn5pyN5Yqh5LiN5Y+v55So77yM5pyN5Yqh5Zmo5pqC5pe26L+H6L295oiW57u05oqk44CCJyxcbiAgNTA0OiAn572R5YWz6LaF5pe244CCJ1xufTtcblxuQEluamVjdGFibGUoKVxuY2xhc3MgWXVuemFpRGVmYXVsdEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSBqdW1wID0gZmFsc2U7XG4gIHByaXZhdGUgcmVmcmVzaFRva2luZyA9IGZhbHNlO1xuICBwcml2YXRlIHJlZnJlc2hUb2tlbiQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuXG4gIHByaXZhdGUgZ2V0IG5vdGlmaWNhdGlvbigpOiBOek5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChOek5vdGlmaWNhdGlvblNlcnZpY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdG9rZW5TcnYoKTogSVRva2VuU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KFlBX1NFUlZJQ0VfVE9LRU4pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaHR0cCgpOiBfSHR0cENsaWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KF9IdHRwQ2xpZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBZdW56YWlCdXNpbmVzc0NvbmZpZyB7XG4gICAgcmV0dXJuIG1lcmdlQmlzQ29uZmlnKHRoaXMuaW5qZWN0b3IuZ2V0KFl1bnphaUNvbmZpZ1NlcnZpY2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ubyh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbmplY3Rvci5nZXQoUm91dGVyKS5uYXZpZ2F0ZUJ5VXJsKHVybCkpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBpZiAodGhpcy5jb25maWcucmVmcmVzaFRva2VuVHlwZSA9PT0gJ2F1dGgtcmVmcmVzaCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW4ndCB1c2UgYXV0aC1yZWZyZXNoLCBwbGVhc2UgY2hhbmdlIHl6LmRlZmF1bHQuaW50ZXJjZXB0b3IgdG8gZGVmYXVsdC5pbnRlcmNlcHRvciFcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1N0YXR1cyhldjogSHR0cFJlc3BvbnNlQmFzZSk6IHZvaWQge1xuICAgIGlmICgoZXYuc3RhdHVzID49IDIwMCAmJiBldi5zdGF0dXMgPCAzMDApIHx8IGV2LnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2IGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgJiYgKGV2LmVycm9yLm1lc3NhZ2UgfHwgZXYuZXJyb3IuZXJyb3JNZXNzYWdlKSkge1xuICAgICAgaWYgKGV2LmVycm9yLmVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg5Y+R55Sf5LqG5LiA5Lqb6ZSZ6K+vIGAsIGV2LmVycm9yLmVycm9yTWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg5Y+R55Sf5LqG5LiA5Lqb6ZSZ6K+vIGAsIGV2LmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldiBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJiBldi5ib2R5LmVycm9yTWVzc2FnZSkge1xuICAgICAgdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoYOWPkeeUn+S6huS4gOS6m+mUmeivryBgLCBldi5ib2R5LmVycm9yTWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVycm9ydGV4dCA9IENPREVNRVNTQUdFW2V2LnN0YXR1c10gfHwgZXYuc3RhdHVzVGV4dDtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg6K+35rGC6ZSZ6K+vICR7ZXYuc3RhdHVzfTogJHtldi51cmx9YCwgZXJyb3J0ZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgVG9Mb2dpbigpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihg5pyq55m75b2V5oiW55m75b2V54q25oCB5bey6L+H5pyf77yMNeenkuWQjuWwhui3s+i9rOWIsOeZu+W9lemhtemdouOAgmAsIGBgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgdGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5jb25maWcuYmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgcHJpdmF0ZSByZUF0dGFjaFRva2VuKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNydi5nZXQoKT8uYWNjZXNzX3Rva2VuO1xuICAgIHJldHVybiByZXEuY2xvbmUoe1xuICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YFxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoVG9rZW5SZXF1ZXN0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLnRva2VuU3J2LmdldCgpO1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtLnNldCgncmVmcmVzaF90b2tlbicsIG1vZGVsPy5yZWZyZXNoX3Rva2VuISk7XG4gICAgZm9ybS5zZXQoJ2dyYW50X3R5cGUnLCAncmVmcmVzaF90b2tlbicpO1xuICAgIGZvcm0uc2V0KCdzY29wZScsICd3ZWJhcHAnKTtcbiAgICBsb2coJ3l6LmRlZmF1bHQuaW50ZXJjZXB0b3I6IHVzZSB0aGUgcmVmcmVzaCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IHRva2VuJywgbW9kZWw/LnJlZnJlc2hfdG9rZW4pO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgL2F1dGgvb2F1dGgvZ2V0T3JDcmVhdGVUb2tlbi93ZWJhcHBgLCBmb3JtKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJ5UmVmcmVzaFRva2VuKGV2OiBIdHRwUmVzcG9uc2VCYXNlLCByZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyDov57liLfmlrBUb2tlbueahOivt+axgumDvemUmeS6hu+8jOmCo+WwseaYr+ecn+mUmeS6hlxuICAgIGlmIChbJy9hdXRoL29hdXRoL2dldE9yQ3JlYXRlVG9rZW4vd2ViYXBwJ10uc29tZSh1cmwgPT4gcmVxLnVybC5pbmNsdWRlcyh1cmwpKSkge1xuICAgICAgdGhpcy5Ub0xvZ2luKCk7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBldik7XG4gICAgfVxuXG4gICAgLy8g5q2j5Zyo5Yi35pawdG9rZW7vvIzmiYDmnInlhbbku5bor7fmsYLmjpLpmJ9cbiAgICBpZiAodGhpcy5yZWZyZXNoVG9raW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW4kLnBpcGUoXG4gICAgICAgIGZpbHRlcih2ID0+ICEhdiksXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBuZXh0LmhhbmRsZSh0aGlzLnJlQXR0YWNoVG9rZW4ocmVxKSkpXG4gICAgICApO1xuICAgIH1cblxuICAgIC8v5bCd6K+V6LCD55So5Yi35pawIFRva2VuXG4gICAgdGhpcy5yZWZyZXNoVG9raW5nID0gdHJ1ZTtcbiAgICB0aGlzLnJlZnJlc2hUb2tlbiQubmV4dChudWxsKTtcblxuICAgIC8vIOWkhOeQhlRva2VuXG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuUmVxdWVzdCgpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocmVzID0+IHtcbiAgICAgICAgbG9nKCd5ei5kZWZhdWx0LmludGVyY2VwdG9yOiByZWZyZXNoIHRva2VuIGFjY2Vzc2VkIC0+ICcsIHJlcyk7XG4gICAgICAgIC8vIOmHjeaWsOS/neWtmOaWsCB0b2tlblxuICAgICAgICB0aGlzLnRva2VuU3J2LnNldChyZXMpO1xuICAgICAgICAvLyDpgJrnn6XlkI7nu63or7fmsYLnu6fnu63miafooYxcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVmcmVzaFRva2VuJC5uZXh0KHJlcyk7XG4gICAgICAgIC8vIOmHjeaWsOWPkei1t+ivt+axglxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUodGhpcy5yZUF0dGFjaFRva2VuKHJlcSkpO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaFRva2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLlRvTG9naW4oKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gZXJyKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWRkaXRpb25hbEhlYWRlcnMoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGNvbnN0IHJlczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBjb25zdCBsYW5nID0gdGhpcy5pbmplY3Rvci5nZXQoWVVOWkFJX0kxOE5fVE9LRU4pLmN1cnJlbnRMYW5nO1xuICAgIGlmICghaGVhZGVycz8uaGFzKCdBY2NlcHQtTGFuZ3VhZ2UnKSAmJiBsYW5nKSB7XG4gICAgICByZXNbJ0FjY2VwdC1MYW5ndWFnZSddID0gbGFuZztcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRGF0YShldjogSHR0cFJlc3BvbnNlQmFzZSwgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5jaGVja1N0YXR1cyhldik7XG4gICAgc3dpdGNoIChldi5zdGF0dXMpIHtcbiAgICAgIGNhc2UgMjAwOlxuICAgICAgICByZXR1cm4gb2YoZXYpO1xuICAgICAgY2FzZSA0MDE6XG4gICAgICAgIGxvZyhcImh0dHA0MDE6IFwiLHJlcS51cmwpXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yZWZyZXNoVG9rZW5FbmFibGVkICYmIHRoaXMuY29uZmlnLnJlZnJlc2hUb2tlblR5cGUgPT09ICdyZS1yZXF1ZXN0Jykge1xuICAgICAgICAgIGNvbnN0IHVuQXV0aG9yaXphdGlvblJlcSA9IHJlcS5jbG9uZSgpO1xuICAgICAgICAgIHVuQXV0aG9yaXphdGlvblJlcS5oZWFkZXJzLmRlbGV0ZSgnQXV0aG9yaXphdGlvbicpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnRyeVJlZnJlc2hUb2tlbihldiwgdW5BdXRob3JpemF0aW9uUmVxLCBuZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlRvTG9naW4oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwMzpcbiAgICAgIGNhc2UgNDA0OlxuICAgICAgY2FzZSA1MDA6XG4gICAgICAgIGlmICh0aGlzLmp1bXApIHtcbiAgICAgICAgICB0aGlzLmdvVG8oYC9leGNlcHRpb24vJHtldi5zdGF0dXN9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoZXYgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICfmnKrlj6/nn6XplJnor6/vvIzlpKfpg6jliIbmmK/nlLHkuo7lkI7nq6/kuI3mlK/mjIHot6jln59DT1JT5oiW5peg5pWI6YWN572u5byV6LW377yM6K+35Y+C6ICDIGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9kb2NzL3NlcnZlciDop6PlhrPot6jln5/pl67popgnLFxuICAgICAgICAgICAgZXZcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoZXYgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gZXYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YoZXYpO1xuICAgIH1cbiAgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmIChyZXEuY29udGV4dC5nZXQoQUxMT1dfQU5PTllNT1VTKSkgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgbG9nKCd5ei5kZWZhdWx0LmludGVyY2VwdG9yLnRzOiAnLCAncmVxdWVzdCAnLCByZXEpO1xuICAgIC8vIOe7n+S4gOWKoOWJjee8gFxuICAgIGxldCB1cmwgPSByZXEudXJsO1xuICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykgJiYgIXVybC5zdGFydHNXaXRoKCdodHRwOi8vJykpIHtcbiAgICAgIHVybCA9IHRoaXMuY29uZmlnLmJhc2VVcmwgKyB1cmw7XG4gICAgfVxuICAgIGlmICh1cmwuaW5jbHVkZXMoJy5qc29uJykgJiYgdXJsLmluY2x1ZGVzKCdhc3NldHMnKSkge1xuICAgICAgdXJsID0gcmVxLnVybDtcbiAgICB9XG4gICAgLy8gaWYgKHVybC5pbmNsdWRlcygnaTE4bicpKSByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgICAvLyDliqDlhaXor63oqIDlpLRcbiAgICBjb25zdCBuZXdSZXEgPSByZXEuY2xvbmUoeyB1cmwsIHNldEhlYWRlcnM6IHRoaXMuZ2V0QWRkaXRpb25hbEhlYWRlcnMocmVxLmhlYWRlcnMpIH0pO1xuICAgIHJldHVybiBuZXh0LmhhbmRsZShuZXdSZXEpLnBpcGUoXG4gICAgICBtZXJnZU1hcChldiA9PiB7XG4gICAgICAgIC8vIOWFgeiuuOe7n+S4gOWvueivt+axgumUmeivr+WkhOeQhlxuICAgICAgICBpZiAoZXYgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRGF0YShldiwgbmV3UmVxLCBuZXh0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyDoi6XkuIDliIfpg73mraPluLjvvIzliJnlkI7nu63mk43kvZxcbiAgICAgICAgcmV0dXJuIG9mKGV2KTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVEYXRhKGVyciwgbmV3UmVxLCBuZXh0KSlcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7IFl1bnphaURlZmF1bHRJbnRlcmNlcHRvciBhcyBZekRlZmF1bHRJbnRlcmNlcHRvciwgWXVuemFpRGVmYXVsdEludGVyY2VwdG9yIH07XG4iXX0=