import * as i0 from '@angular/core';
import { NgModule, importProvidersFrom, makeEnvironmentProviders, inject, APP_INITIALIZER, Injector } from '@angular/core';
import { YunzaiLayoutModule } from '@yelon/bis/layout';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';
import { Router } from 'express';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { YUNZAI_I18N_TOKEN, IGNORE_BASE_URL } from '@yelon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { BehaviorSubject, throwError, filter, take, switchMap, catchError, of, mergeMap } from 'rxjs';
import { log, YUNZAI_CONFIG } from '@yelon/util';

class BisModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: BisModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule], exports: [YunzaiLayoutModule, YunzaiWidgetsModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule, YunzaiLayoutModule, YunzaiWidgetsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: BisModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [YunzaiLayoutModule, YunzaiWidgetsModule],
                    exports: [YunzaiLayoutModule, YunzaiWidgetsModule]
                }]
        }] });

function provideYunzaiBis() {
    const provides = [];
    provides.push(importProvidersFrom(BisModule));
    return makeEnvironmentProviders(provides);
}

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
function getAdditionalHeaders(headers) {
    const res = {};
    const lang = inject(YUNZAI_I18N_TOKEN).currentLang;
    if (!headers?.has('Accept-Language') && lang) {
        res['Accept-Language'] = lang;
    }
    return res;
}
function checkStatus(injector, ev) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
        return;
    }
    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    injector.get(NzNotificationService).error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
}
function goTo(injector, url) {
    setTimeout(() => injector.get(Router).navigateByUrl(url));
}
function toLogin(injector) {
    injector.get(NzNotificationService).error(`未登录或登录已过期，请重新登录。`, ``);
    goTo(injector, injector.get(YA_SERVICE_TOKEN).login_url);
}

let refreshToking = false;
let refreshToken$ = new BehaviorSubject(null);
const tryRefreshToken = (injector, ev, req, next) => {
    // 连刷新Token的请求都错了，那就是真错了
    if (['/auth/oauth/getOrCreateToken/webapp'].some(url => req.url.includes(url))) {
        toLogin(injector);
        return throwError(() => ev);
    }
    // 2、如果 `refreshToking` 为 `true` 表示已经在请求刷新 Token 中，后续所有请求转入等待状态，直至结果返回后再重新发起请求
    if (refreshToking) {
        return refreshToken$.pipe(filter(v => !!v), take(1), switchMap(() => next(reAttachToken(injector, req))));
    }
    // 3、尝试调用刷新 Token
    refreshToking = true;
    refreshToken$.next(null);
    return refreshTokenRequest(injector).pipe(switchMap(res => {
        // 通知后续请求继续执行
        refreshToking = false;
        refreshToken$.next(res);
        // 重新保存新 token
        injector.get(YA_SERVICE_TOKEN).set(res);
        // 重新发起请求
        return next(reAttachToken(injector, req));
    }), catchError(err => {
        refreshToking = false;
        toLogin(injector);
        return throwError(() => err);
    }));
};
function reAttachToken(injector, req) {
    const token = injector.get(YA_SERVICE_TOKEN).get()?.access_token;
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}
function refreshTokenRequest(injector) {
    const model = injector.get(YA_SERVICE_TOKEN).get();
    const form = new FormData();
    form.set('refresh_token', model?.refresh_token);
    form.set('grant_type', 'refresh_token');
    form.set('scope', 'webapp');
    return injector.get(HttpClient).post(`/auth/oauth/getOrCreateToken/webapp`, form);
}
function buildAuthRefresh(injector) {
    const tokenSrv = injector.get(YA_SERVICE_TOKEN);
    tokenSrv.refresh
        .pipe(filter(() => !refreshToking), switchMap(res => {
        log(res);
        refreshToking = true;
        return refreshTokenRequest(injector);
    }))
        .subscribe({
        next: res => {
            res.expired = +new Date() + 1000 * 60 * 5;
            refreshToking = false;
            tokenSrv.set(res);
        },
        error: () => toLogin(injector)
    });
}
function provideYunzaiBindAuthRefresh() {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: (injector) => () => buildAuthRefresh(injector),
            deps: [Injector],
            multi: true
        }
    ];
}

function handleData(injector, ev, req, next) {
    checkStatus(injector, ev);
    const config = injector.get(YUNZAI_CONFIG).bis;
    switch (ev.status) {
        case 200:
            return of(ev);
        case 401:
            if (config.refreshTokenEnabled && config.refreshTokenType === 're-request') {
                const unAuthorizationReq = req.clone();
                unAuthorizationReq.headers.delete('Authorization');
                return tryRefreshToken(injector, ev, unAuthorizationReq, next);
            }
            toLogin(injector);
            break;
        case 403:
        case 404:
        case 500:
            goTo(injector, `/exception/${ev.status}?url=${req.urlWithParams}`);
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
    else if (ev._throw) {
        return throwError(() => ev.body);
    }
    else {
        return of(ev);
    }
}
const yunzaiDefaultInterceptor = (req, next) => {
    const config = inject(YUNZAI_CONFIG).bis;
    const { baseUrl } = config;
    let url = req.url;
    if (!req.context.get(IGNORE_BASE_URL) && !url.startsWith('https://') && !url.startsWith('http://')) {
        url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }
    if (url.includes('.json') && url.includes('assets')) {
        url = req.url;
    }
    const newReq = req.clone({ url, setHeaders: getAdditionalHeaders(req.headers) });
    const injector = inject(Injector);
    return next(newReq).pipe(mergeMap(ev => {
        if (ev instanceof HttpResponseBase) {
            return handleData(injector, ev, newReq, next);
        }
        return of(ev);
    }), catchError((err) => handleData(injector, err, newReq, next)));
};

/**
 * Generated bundle index. Do not edit.
 */

export { BisModule, CODEMESSAGE, checkStatus, getAdditionalHeaders, goTo, provideYunzaiBindAuthRefresh, provideYunzaiBis, toLogin, tryRefreshToken, yunzaiDefaultInterceptor };
//# sourceMappingURL=bis.mjs.map
