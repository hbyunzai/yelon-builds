import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, inject, Injectable, makeEnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, share, interval, map, filter, Observable } from 'rxjs';
import * as i1 from '@yelon/util/config';
import { YunzaiConfigService } from '@yelon/util/config';
import { CookieService } from '@yelon/util/browser';
import { HttpContextToken, HttpParams, HttpErrorResponse } from '@angular/common/http';

const AUTH_DEFAULT_CONFIG = {
    auto: true,
    store_key: `_yz_token`,
    token_invalid_redirect: true,
    token_exp_offset: 10,
    token_send_key: `Authorization`,
    token_send_template: 'Bearer ${access_token}',
    token_send_place: 'header',
    login_url: '/login',
    ignores: [/\/login/, /\/assets\//, /passport\//, /\/auth\/oauth\/getOrCreateToken\/webapp/, /\/auth\/oauth\/token/],
    allow_anonymous_key: `_allow_anonymous`,
    refreshTime: 3000,
    refreshOffset: 6000
};
function mergeConfig(srv) {
    return srv.merge('auth', AUTH_DEFAULT_CONFIG);
}

function YA_STORE_TOKEN_LOCAL_FACTORY() {
    return new LocalStorageStore();
}
/**
 * `localStorage` storage, **not lost after closing the browser**.
 *
 * ```ts
 provideHttpClient(withInterceptors([...(environment.interceptorFns ?? []), authJWTInterceptor, defaultInterceptor])),
 provideAuth(withLocalStorage()),
 * ```
 */
class LocalStorageStore {
    get(key) {
        return JSON.parse(localStorage.getItem(key) || '{}') || {};
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}

const YA_STORE_TOKEN = new InjectionToken('AUTH_STORE_TOKEN', {
    providedIn: 'root',
    factory: YA_STORE_TOKEN_LOCAL_FACTORY
});

function YA_SERVICE_TOKEN_FACTORY() {
    return new TokenService(inject(YunzaiConfigService));
}
class TokenService {
    constructor(configSrv) {
        this.store = inject(YA_STORE_TOKEN);
        this.refresh$ = new Subject();
        this.change$ = new BehaviorSubject(null);
        this._referrer = {};
        this._options = mergeConfig(configSrv);
    }
    get refresh() {
        this.builderRefresh();
        return this.refresh$.pipe(share());
    }
    get login_url() {
        return this._options.login_url;
    }
    get referrer() {
        return this._referrer;
    }
    get options() {
        return this._options;
    }
    set(data) {
        const res = this.store.set(this._options.store_key, data);
        this.change$.next(data);
        return res;
    }
    get(type) {
        const data = this.store.get(this._options.store_key);
        return type ? Object.assign(new type(), data) : data;
    }
    clear(options = { onlyToken: false }) {
        let data = null;
        if (options.onlyToken === true) {
            data = this.get();
            data.access_token = ``;
            this.set(data);
        }
        else {
            this.store.remove(this._options.store_key);
        }
        this.change$.next(data);
    }
    change() {
        return this.change$.pipe(share());
    }
    builderRefresh() {
        const { refreshTime, refreshOffset } = this._options;
        this.cleanRefresh();
        this.interval$ = interval(refreshTime)
            .pipe(map(() => {
            const item = this.get();
            const expired = item.expires_in || item.exp || 0;
            if (expired <= 0) {
                return null;
            }
            const curTime = new Date().valueOf() + refreshOffset;
            return expired <= curTime ? item : null;
        }), filter(v => v != null))
            .subscribe(res => this.refresh$.next(res));
    }
    cleanRefresh() {
        if (this.interval$ && !this.interval$.closed) {
            this.interval$.unsubscribe();
        }
    }
    ngOnDestroy() {
        this.cleanRefresh();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: TokenService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: TokenService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: TokenService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });

const YA_SERVICE_TOKEN = new InjectionToken('YA_SERVICE_TOKEN', {
    providedIn: 'root',
    factory: YA_SERVICE_TOKEN_FACTORY
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const OPENTYPE = '_yelonAuthSocialType';
const HREFCALLBACK = '_yelonAuthSocialCallbackByHref';
class SocialService {
    constructor() {
        this.tokenService = inject(YA_SERVICE_TOKEN);
        this.doc = inject(DOCUMENT);
        this.router = inject(Router);
        this._win = null;
    }
    /**
     * 跳转至登录页，若为 `type=window` 时，返回值是 `Observable<ITokenModel>`
     *
     * @param url 获取授权地址
     * @param callback 当 `type=href` 成功时的回调路由地址
     * @param options.type 打开方式，默认 `window`
     * @param options.windowFeatures 等同 `window.open` 的 `features` 参数值
     */
    login(url, callback = '/', options = {}) {
        options = {
            type: 'window',
            windowFeatures: 'location=yes,height=570,width=520,scrollbars=yes,status=yes',
            ...options
        };
        localStorage.setItem(OPENTYPE, options.type);
        localStorage.setItem(HREFCALLBACK, callback);
        if (options.type === 'href') {
            this.doc.location.href = url;
            return;
        }
        this._win = window.open(url, '_blank', options.windowFeatures);
        this._winTime = setInterval(() => {
            if (this._win && this._win.closed) {
                this.ngOnDestroy();
                let model = this.tokenService.get();
                if (model && !model.access_token)
                    model = null;
                // 触发变更通知
                if (model) {
                    this.tokenService.set(model);
                }
                this.observer.next(model);
                this.observer.complete();
            }
        }, 100);
        return new Observable((observer) => {
            this.observer = observer;
        });
    }
    /**
     * 授权成功后的回调处理
     *
     * @param rawData 指定回调认证信息，为空时从根据当前URL解析
     */
    callback(rawData) {
        // from uri
        if (!rawData && this.router.url.indexOf('?') === -1) {
            throw new Error(`url muse contain a ?`);
        }
        // parse
        let data = { access_token: `` };
        if (typeof rawData === 'string') {
            const rightUrl = rawData.split('?')[1].split('#')[0];
            data = this.router.parseUrl(`./?${rightUrl}`).queryParams;
        }
        else {
            data = rawData;
        }
        if (!data || !data.access_token)
            throw new Error(`invalide token data`);
        this.tokenService.set(data);
        const url = localStorage.getItem(HREFCALLBACK) || '/';
        localStorage.removeItem(HREFCALLBACK);
        const type = localStorage.getItem(OPENTYPE);
        localStorage.removeItem(OPENTYPE);
        if (type === 'window') {
            window.close();
        }
        else {
            this.router.navigateByUrl(url);
        }
        return data;
    }
    ngOnDestroy() {
        clearInterval(this._winTime);
        this._winTime = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SocialService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SocialService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: SocialService, decorators: [{
            type: Injectable
        }] });

/**
 * 内存存储，关掉浏览器标签后**丢失**。
 */
class MemoryStore {
    constructor() {
        this.cache = {};
    }
    get(key) {
        return this.cache[key] || {};
    }
    set(key, value) {
        this.cache[key] = value;
        return true;
    }
    remove(key) {
        this.cache[key] = null;
    }
}

/**
 * `sessionStorage` storage, **lost after closing the browser**.
 *
 * ```ts
 provideHttpClient(withInterceptors([...(environment.interceptorFns ?? []), authJWTInterceptor, defaultInterceptor])),
 provideAuth(withSessionStorage()),
 * ```
 */
class SessionStorageStore {
    get(key) {
        return JSON.parse(sessionStorage.getItem(key) || '{}') || {};
    }
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    remove(key) {
        sessionStorage.removeItem(key);
    }
}

/**
 * `cookie` storage
 *
 * ```ts
 provideHttpClient(withInterceptors([...(environment.interceptorFns ?? []), authJWTInterceptor, defaultInterceptor])),
 provideAuth(withCookie()),
 * ```
 */
class CookieStorageStore {
    constructor() {
        this.srv = inject(CookieService);
    }
    get(key) {
        try {
            return JSON.parse(this.srv.get(key) || '{}');
        }
        catch (ex) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.error(`CookieStorageStore: Invalid key-value format ${key}`, ex);
            }
            return {};
        }
    }
    set(key, value) {
        const expires = (value?.expires_in ?? 0) / 1e3;
        this.srv.put(key, JSON.stringify(value ?? {}), { expires });
        return true;
    }
    remove(key) {
        this.srv.remove(key);
    }
}

function CheckSimple(model) {
    return model != null && typeof model.access_token === 'string' && model.access_token.length > 0;
}
function CheckJwt(model, offset) {
    try {
        return model != null && !!model.access_token && !model.isExpired(offset);
    }
    catch (err) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            console.warn(`${err.message}, jump to login_url`);
        }
        return false;
    }
}
function ToLogin(options, url) {
    const router = inject(Router);
    const token = inject(YA_SERVICE_TOKEN);
    const doc = inject(DOCUMENT);
    token.referrer.url = url || router.url;
    if (options.token_invalid_redirect === true) {
        setTimeout(() => {
            if (/^https?:\/\//g.test(options.login_url)) {
                doc.location.href = options.login_url;
            }
            else {
                router.navigate([options.login_url]);
            }
        });
    }
}

function urlBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0: {
            break;
        }
        case 2: {
            output += '==';
            break;
        }
        case 3: {
            output += '=';
            break;
        }
        default: {
            throw new Error(`'atob' failed: The string to be decoded is not correctly encoded.`);
        }
    }
    return b64DecodeUnicode(output);
}
function b64decode(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    str = String(str).replace(/=+$/, '');
    for (
    // initialize result and counters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bc = 0, bs, buffer, idx = 0; 
    // get next character
    (buffer = str.charAt(idx++)); 
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer &&
        ((bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
}
// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map
        .call(b64decode(str), (c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
    })
        .join(''));
}

class JWTTokenModel {
    /**
     * 获取载荷信息
     */
    get payload() {
        const parts = (this.access_token || '').split('.');
        if (parts.length !== 3)
            throw new Error('JWT must have 3 parts');
        const decoded = urlBase64Decode(parts[1]);
        return JSON.parse(decoded);
    }
    /**
     * 获取过期时间戳（单位：ms）
     */
    get exp() {
        const decoded = this.payload;
        if (!decoded.hasOwnProperty('exp'))
            return null;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date.valueOf();
    }
    /**
     * 检查Token是否过期，当`payload` 包含 `exp` 字段时有效，若无 `exp` 字段直接返回 `null`
     *
     * @param offsetSeconds 偏移量
     */
    isExpired(offsetSeconds = 0) {
        const exp = this.exp;
        if (exp == null)
            return null;
        return !(exp > new Date().valueOf() + offsetSeconds * 1000);
    }
}

class AuthJWTGuardService {
    constructor() {
        this.srv = inject(YA_SERVICE_TOKEN);
    }
    process(url) {
        const cog = this.srv.options;
        const res = CheckJwt(this.srv.get(JWTTokenModel), cog.token_exp_offset);
        if (!res) {
            ToLogin(cog, url);
        }
        return res;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: AuthJWTGuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: AuthJWTGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: AuthJWTGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * JWT 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ authJWTCanActivate ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
const authJWTCanActivate = (_, state) => inject(AuthJWTGuardService).process(state.url);
/**
 * JWT 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ authJWTCanActivateChild ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
const authJWTCanActivateChild = (_, state) => inject(AuthJWTGuardService).process(state.url);
/**
 * JWT 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canMatch: [ authJWTCanMatch ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
const authJWTCanMatch = route => inject(AuthJWTGuardService).process(route.path);

/**
 * Whether to allow anonymous login
 *
 * 是否允许匿名登录
 *
 * @example
 * this.http.post(`login`, {
 *  name: 'cipchk', pwd: '123456'
 * }, {
 *  context: new HttpContext().set(ALLOW_ANONYMOUS, true)
 * })
 */
const ALLOW_ANONYMOUS = new HttpContextToken(() => false);

function isAnonymous(req, options) {
    if (req.context.get(ALLOW_ANONYMOUS))
        return true;
    if (Array.isArray(options.ignores)) {
        for (const item of options.ignores) {
            if (item.test(req.url))
                return true;
        }
    }
    const ignoreKey = options.allow_anonymous_key;
    let ignored = false;
    if (req.params.has(ignoreKey)) {
        ignored = true;
    }
    const urlArr = req.url.split('?');
    if (urlArr.length > 1) {
        const queryStringParams = new HttpParams({ fromString: urlArr[1] });
        if (queryStringParams.has(ignoreKey)) {
            ignored = true;
        }
    }
    return ignored;
}
function throwErr(req, options) {
    ToLogin(options);
    // Interrupt Http request, so need to generate a new Observable
    return new Observable((observer) => {
        let statusText = '';
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            statusText = `来自 @yelon/auth 的拦截，所请求URL未授权，若是登录API可加入 new HttpContext().set(ALLOW_ANONYMOUS, true) 来表示忽略校验，更多方法请参考： https://ng.yunzainfo.com/auth/getting-started#YunzaiAuthConfig\nThe interception from @yelon/auth, the requested URL is not authorized. If the login API can add new HttpContext().set(ALLOW_ANONYMOUS, true) to ignore the check, please refer to: https://ng.yunzainfo.com/auth/getting-started#YunzaiAuthConfig`;
        }
        const res = new HttpErrorResponse({
            url: req.url,
            headers: req.headers,
            status: 401,
            statusText
        });
        observer.error(res);
    });
}

function newReq$1(req, model) {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${model.access_token}`
        }
    });
}
const authJWTInterceptor = (req, next) => {
    const options = mergeConfig(inject(YunzaiConfigService));
    if (isAnonymous(req, options))
        return next(req);
    const model = inject(YA_SERVICE_TOKEN).get(JWTTokenModel);
    if (CheckJwt(model, options.token_exp_offset))
        return next(newReq$1(req, model));
    return throwErr(req, options);
};

class AuthSimpleGuardService {
    constructor() {
        this.srv = inject(YA_SERVICE_TOKEN);
    }
    process(url) {
        const res = CheckSimple(this.srv.get());
        if (!res) {
            ToLogin(this.srv.options, url);
        }
        return res;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: AuthSimpleGuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: AuthSimpleGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: AuthSimpleGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ authSimpleCanActivate ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
const authSimpleCanActivate = (_, state) => inject(AuthSimpleGuardService).process(state.url);
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ authSimpleCanActivateChild ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
const authSimpleCanActivateChild = (_, state) => inject(AuthSimpleGuardService).process(state.url);
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canMatch: [ authSimpleCanMatch ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
const authSimpleCanMatch = route => inject(AuthSimpleGuardService).process(route.path);

function newReq(req, model, options) {
    const { token_send_template, token_send_key } = options;
    const token = token_send_template.replace(/\$\{([\w]+)\}/g, (_, g) => model[g]);
    switch (options.token_send_place) {
        case 'header':
            const obj = {};
            obj[token_send_key] = token;
            req = req.clone({
                setHeaders: obj
            });
            break;
        case 'body':
            const body = req.body || {};
            body[token_send_key] = token;
            req = req.clone({
                body
            });
            break;
        case 'url':
            req = req.clone({
                params: req.params.append(token_send_key, token)
            });
            break;
    }
    return req;
}
const authSimpleInterceptor = (req, next) => {
    const options = mergeConfig(inject(YunzaiConfigService));
    if (isAnonymous(req, options))
        return next(req);
    const model = inject(YA_SERVICE_TOKEN).get();
    if (CheckSimple(model))
        return next(newReq(req, model, options));
    return throwErr(req, options);
};

class SimpleTokenModel {
}

var AuthFeatureKind;
(function (AuthFeatureKind) {
    AuthFeatureKind[AuthFeatureKind["Store"] = 0] = "Store";
})(AuthFeatureKind || (AuthFeatureKind = {}));
function makeAuthFeature(kind, providers) {
    return {
        ɵkind: kind,
        ɵproviders: providers
    };
}
/**
 * Configures authentication process service to be available for injection.
 *
 * @see {@link withCookie}
 * @see {@link withLocalStorage}
 * @see {@link withSessionStorage}
 */
function provideAuth(store) {
    return makeEnvironmentProviders([(store ?? withLocalStorage()).ɵproviders]);
}
/** `cookie` storage */
function withCookie() {
    return makeAuthFeature(AuthFeatureKind.Store, [
        { provide: YA_STORE_TOKEN, useClass: CookieStorageStore, deps: [CookieService] }
    ]);
}
/** `localStorage` storage, **not lost after closing the browser**. */
function withLocalStorage() {
    return makeAuthFeature(AuthFeatureKind.Store, [{ provide: YA_STORE_TOKEN, useClass: LocalStorageStore }]);
}
/** `sessionStorage` storage, **lost after closing the browser**. */
function withSessionStorage() {
    return makeAuthFeature(AuthFeatureKind.Store, [{ provide: YA_STORE_TOKEN, useClass: SessionStorageStore }]);
}
/** Memory storage, **lost after closing the browser tab**. */
function withMemoryStorage() {
    return makeAuthFeature(AuthFeatureKind.Store, [{ provide: YA_STORE_TOKEN, useClass: MemoryStore }]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { ALLOW_ANONYMOUS, AUTH_DEFAULT_CONFIG, AuthFeatureKind, AuthJWTGuardService, AuthSimpleGuardService, CookieStorageStore, JWTTokenModel, LocalStorageStore, MemoryStore, SessionStorageStore, SimpleTokenModel, SocialService, TokenService, YA_SERVICE_TOKEN, YA_SERVICE_TOKEN_FACTORY, YA_STORE_TOKEN, YA_STORE_TOKEN_LOCAL_FACTORY, authJWTCanActivate, authJWTCanActivateChild, authJWTCanMatch, authJWTInterceptor, authSimpleCanActivate, authSimpleCanActivateChild, authSimpleCanMatch, authSimpleInterceptor, isAnonymous, mergeConfig, provideAuth, throwErr, urlBase64Decode, withCookie, withLocalStorage, withMemoryStorage, withSessionStorage };
//# sourceMappingURL=auth.mjs.map
