import * as i0 from '@angular/core';
import { NgModule, importProvidersFrom, makeEnvironmentProviders, inject, APP_INITIALIZER, Injector, Injectable, Inject } from '@angular/core';
import { YunzaiLayoutModule } from '@yelon/bis/layout';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';
import * as i2 from '@angular/router';
import { Router } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { YUNZAI_I18N_TOKEN, IGNORE_BASE_URL, MenuService, TitleService, SettingsService } from '@yelon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { BehaviorSubject, throwError, filter, take, switchMap, catchError, of, mergeMap, EMPTY, combineLatest, map } from 'rxjs';
import { mergeBisConfig, BUSINESS_DEFAULT_CONFIG } from '@yelon/bis/config';
import * as i1 from '@yelon/util';
import { log, YUNZAI_CONFIG, YunzaiConfigService, WINDOW, useLocalStorageTenant, useLocalStorageUser, useLocalStorageHeader, useLocalStorageProjectInfo, useLocalStorageDefaultRoute, useLocalStorageCurrent, deepCopy } from '@yelon/util';
import { ACLService } from '@yelon/acl';

class BisModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: BisModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule], exports: [YunzaiLayoutModule, YunzaiWidgetsModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule, YunzaiLayoutModule, YunzaiWidgetsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: BisModule, decorators: [{
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
    const config = mergeBisConfig(inject(YunzaiConfigService));
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

function provideYunzaiStartup() {
    return [
        YunzaiStartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: (startupService) => () => startupService.load(),
            deps: [YunzaiStartupService],
            multi: true
        }
    ];
}
class YunzaiStartupService {
    constructor() {
        this.config = mergeBisConfig(inject(YunzaiConfigService));
        this.menuService = inject(MenuService);
        this.aclService = inject(ACLService);
        this.titleService = inject(TitleService);
        this.tokenService = inject(YA_SERVICE_TOKEN);
        this.httpClient = inject(HttpClient);
        this.settingService = inject(SettingsService);
        this.i18n = inject(YUNZAI_I18N_TOKEN);
        this.win = inject(WINDOW);
        this.configService = inject(YunzaiConfigService);
    }
    load(param) {
        let defaultLang = this.settingService.layout.lang || this.i18n.defaultLang;
        const [setTenant] = useLocalStorageTenant();
        const [setUser, getUser] = useLocalStorageUser();
        const [setHeader] = useLocalStorageHeader();
        const [setProject] = useLocalStorageProjectInfo();
        const [setDefaultRoute] = useLocalStorageDefaultRoute();
        const [setCurrent] = useLocalStorageCurrent();
        return this.token(param).pipe(mergeMap((token) => {
            if (token === false) {
                return this.i18n.loadLocaleData(defaultLang).pipe(mergeMap(() => EMPTY));
            }
            this.configService.set('auth', {
                token_send_key: 'Authorization',
                token_send_template: `${token.token_type} \${access_token}`,
                token_send_place: 'header'
            });
            this.tokenService.set(token);
            return of(void 0);
        }), mergeMap(() => {
            return combineLatest([
                this.httpClient.get(`/auth/user`),
                this.httpClient.get(`/auth/allheader/v2`),
                this.httpClient.get(`/app-manager/project/info`)
            ]).pipe(map(([user, header, project]) => {
                setUser(user.principal);
                setTenant(user.tenantId);
                setHeader(header.data);
                setProject(project.data);
                return void 0;
            }));
        }), mergeMap(() => {
            return this.i18n.loadLangData(defaultLang).pipe(map((langData) => {
                this.i18n.use(defaultLang, langData);
                return void 0;
            }));
        }), mergeMap(() => {
            const yunzaiUser = getUser();
            const yunzaiMenus = deepCopy(yunzaiUser.menu).filter(m => m.systemCode && m.systemCode === this.config.systemCode);
            const currentMenu = yunzaiMenus.pop();
            if (currentMenu) {
                this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
                this.settingService.setUser({
                    name: yunzaiUser.realname,
                    avatar: `${this.config.baseUrl}/filecenter/file/${yunzaiUser.avatarId}` || '',
                    email: yunzaiUser.email
                });
                this.titleService.default = currentMenu && currentMenu.text ? currentMenu.text : 'default application name';
                this.titleService.setTitle(currentMenu && currentMenu.text ? currentMenu.text : 'no title');
                const abilities = [];
                generateAbility([currentMenu], abilities, '');
                this.aclService.attachRole(yunzaiUser?.roles
                    .map((role) => {
                    return role.roleValue;
                })
                    .filter((a) => !!a) || []);
                this.aclService.attachAbility(abilities);
                this.menuService.add([currentMenu]);
                setCurrent({
                    name: currentMenu.text,
                    intro: currentMenu.intro || '',
                    icon: currentMenu.appIconUrl || './assets/tmp/img/avatar.jpg'
                });
                const attributes = currentMenu.attribute;
                if (attributes) {
                    const attr = JSON.parse(attributes);
                    if (attr && attr.defaultRoute) {
                        setDefaultRoute(attr.defaultRoute);
                    }
                    else {
                        setDefaultRoute('/displayIndex');
                    }
                }
                else {
                    setDefaultRoute('/displayIndex');
                }
            }
            return of(void 0);
        }), catchError((error) => {
            console.error('Error occurred:', error);
            return of(void 0);
        }));
    }
    token(param) {
        const auto = this.configService.get('auth')?.auto;
        const force = param?.force || undefined;
        if (this.config.loginForm) {
            if (this.tokenService.get()?.access_token || force || auto) {
                return this.httpClient.post(`/auth/oauth/token?_allow_anonymous=true`, this.config.loginForm).pipe(map((response) => {
                    return response;
                }));
            }
            return of(false);
        }
        else {
            const uri = encodeURIComponent(this.win.location.href);
            return this.httpClient
                .get(`/cas-proxy/app/validate_full?callback=${uri}&_allow_anonymous=true&timestamp=${new Date().getTime()}`)
                .pipe(map((response) => {
                switch (response.errcode) {
                    case 2000:
                        return response.data;
                    case 2001:
                        if (!force && !auto) {
                            return false;
                        }
                        this.win.location.href = response.msg;
                        throw Error("Cookie Error: Can't find Cas Cookie,So jump to login!");
                    default:
                        if (response.data) {
                            console.error(response.data);
                            throw Error(response.data);
                        }
                        else if (response.msg) {
                            console.error(response.msg);
                            throw Error(response.msg);
                        }
                        else {
                            console.error('cas unknown error');
                            throw Error('Unknown Error: Cas auth exception!');
                        }
                }
            }));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiStartupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiStartupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiStartupService, decorators: [{
            type: Injectable
        }] });
function mapYzSideToYelonMenu(menus) {
    menus.forEach((menu) => {
        if (menu.children && menu.hideChildren) {
            menu.children.forEach((c) => (c.hide = true));
        }
        menu.badgeDot = menu.badge_dot || null;
        menu.badgeStatus = menu.badge_status || null;
        menu.shortcutRoot = menu.shortcut_root || null;
        menu.reuse = true;
        if (menu.children) {
            mapYzSideToYelonMenu(menu.children);
        }
    });
}
function generateAbility(menus, abilities, prefix) {
    menus.forEach(menu => {
        if (menu.link) {
            prefix += menu.link;
        }
        else {
            prefix += '';
        }
        if (menu.menuAuths) {
            menu.menuAuths.forEach((a) => {
                abilities.push(`${prefix}:${a}`);
                abilities.push(a);
            });
        }
        if (menu.children) {
            generateAbility(menu.children, abilities, prefix);
        }
    });
}

class YunzaiAnalysisAddonGuardService {
    constructor(configService, pathToRegexp, win, tokenService) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.win = win;
        this.tokenService = tokenService;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        this.value = {};
        this.bis = mergeBisConfig(this.configService);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        if (user) {
            this.value = {
                systemCode: this.bis.systemCode,
                userid: user.id,
                realname: user.realname,
                usertype: user.userType,
                usercode: user.userCode,
                username: user.username,
                account: user.username,
                deptid: user.deptId,
                deptname: user.deptName,
                token: this.tokenService.get()?.access_token
            };
        }
        if (this.menus && this.menus.length > 0) {
            this.value['system'] = this.menus[0].text;
        }
        this.getAllLinks(this.menus, this.links);
    }
    process(url) {
        let flag = false;
        this.links.forEach(link => {
            if (link.link === url.split('?')[0]) {
                flag = true;
                this.value['routename'] = link.title;
                this.value['routeurl'] = link.link;
                if (this.win['yunzai']) {
                    this.win['yunzai'].setExtra(this.value);
                }
                return;
            }
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(url.split('?')[0])) {
                flag = true;
                this.value['routename'] = link.title;
                this.value['routeurl'] = link.link;
                if (this.win['yunzai']) {
                    this.win['yunzai'].setExtra(this.value);
                }
                return;
            }
        });
        if (!flag) {
            this.value['routename'] = url;
            this.value['routeurl'] = url;
            if (this.win['yunzai']) {
                this.win['yunzai'].setExtra(this.value);
            }
        }
        return true;
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push({ title: sider.text ? sider.text : sider.link, link: sider.link });
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: WINDOW }, { token: YA_SERVICE_TOKEN }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }] });
const analysisAddonCanActive = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
const analysisAddonCanActiveChild = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);

class ActGuardService {
    constructor(configService, pathToRegexp, router) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.router = router;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        log('act: ');
        this.bis = mergeBisConfig(this.configService);
        log('act: config ', this.bis);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        log('act: user ', user);
        // @ts-ignore
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        log('act: menus ', this.menus);
        this.getAllLinks(this.menus, this.links);
        log('act: links ', this.links);
    }
    process(url) {
        log('act: can activate ', url);
        if (this.preHandle(url)) {
            return true;
        }
        log('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            // path = /xxx
            if (link === url.split('?')[0]) {
                canactivate = true;
                log(`act: link value ${link} equals url value ${url}`);
                return;
            }
            // paht = /xxx/:xx
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            log(`act: ${link} test ${url.split('?')[0]}`);
            if (regexp.test(url.split('?')[0])) {
                canactivate = true;
                log(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log(`act: test sucess`);
            return true;
        }
        else {
            log(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    preHandle(url) {
        return (url.includes('error') ||
            url.includes('exception') ||
            url.includes('displayIndex') ||
            url === '' ||
            url === null ||
            url === '/' ||
            url.includes('iframePage'));
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push(sider.link);
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ActGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ActGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ActGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: i2.Router }] });
const actGuardCanActive = (_, state) => inject(ActGuardService).process(state.url);
const actGuardCanActiveChild = (_, state) => inject(ActGuardService).process(state.url);

/**
 * Generated bundle index. Do not edit.
 */

export { ActGuardService, BisModule, CODEMESSAGE, YunzaiAnalysisAddonGuardService, YunzaiStartupService, actGuardCanActive, actGuardCanActiveChild, analysisAddonCanActive, analysisAddonCanActiveChild, checkStatus, generateAbility, getAdditionalHeaders, goTo, mapYzSideToYelonMenu, provideYunzaiBindAuthRefresh, provideYunzaiBis, provideYunzaiStartup, toLogin, tryRefreshToken, yunzaiDefaultInterceptor };
//# sourceMappingURL=bis.mjs.map
