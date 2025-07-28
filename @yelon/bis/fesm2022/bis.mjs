import * as i0 from '@angular/core';
import { NgModule, importProvidersFrom, makeEnvironmentProviders, inject, Injector, APP_INITIALIZER, provideAppInitializer, Injectable, Input, Component } from '@angular/core';
import { YunzaiLayoutModule } from '@yelon/bis/layout';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';
import { Router, RouterOutlet } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { YUNZAI_I18N_TOKEN, IGNORE_BASE_URL, MenuService, TitleService, SettingsService, I18nPipe } from '@yelon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { BehaviorSubject, throwError, filter, take, switchMap, catchError, of, mergeMap, map, EMPTY, combineLatest } from 'rxjs';
import { mergeBisConfig, BUSINESS_DEFAULT_CONFIG } from '@yelon/bis/config';
import { log, YUNZAI_CONFIG, YunzaiConfigService, WINDOW, useLocalStorageTenant, useLocalStorageUser, useLocalStorageHeader, useLocalStorageProjectInfo, useLocalStorageDefaultRoute, useLocalStorageCurrent, deepCopy, PathToRegexpService } from '@yelon/util';
import { ACLService } from '@yelon/acl';
import { NgTemplateOutlet, NgFor, NgIf } from '@angular/common';
import * as i2 from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i3 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1 from 'ng-zorro-antd/menu';
import * as i4 from 'ng-zorro-antd/avatar';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

class BisModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: BisModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.3", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule], exports: [YunzaiLayoutModule, YunzaiWidgetsModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule, YunzaiLayoutModule, YunzaiWidgetsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: BisModule, decorators: [{
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
    if (model?.refresh_token) {
        form.set('refresh_token', model.refresh_token);
    }
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

// export function provideYunzaiStartup(): Provider[] {
//   return [
//     YunzaiStartupService,
//     {
//       provide: APP_INITIALIZER,
//       useFactory: (startupService: YunzaiStartupService) => () => startupService.load(),
//       deps: [YunzaiStartupService],
//       multi: true
//     }
//   ];
// }
function provideYunzaiStartup() {
    const appInitializer = () => {
        const startupService = inject(YunzaiStartupService);
        return startupService.load();
    };
    return [YunzaiStartupService, provideAppInitializer(appInitializer)];
}
class YunzaiStartupService {
    config = mergeBisConfig(inject(YunzaiConfigService));
    menuService = inject(MenuService);
    aclService = inject(ACLService);
    titleService = inject(TitleService);
    tokenService = inject(YA_SERVICE_TOKEN);
    httpClient = inject(HttpClient);
    settingService = inject(SettingsService);
    i18n = inject(YUNZAI_I18N_TOKEN);
    win = inject(WINDOW);
    configService = inject(YunzaiConfigService);
    load(param) {
        let defaultLang = this.settingService.layout.lang || this.i18n.defaultLang || 'zh-CN';
        const [setTenant] = useLocalStorageTenant();
        const [setUser, getUser] = useLocalStorageUser();
        const [setHeader] = useLocalStorageHeader();
        const [setProject] = useLocalStorageProjectInfo();
        const [setDefaultRoute] = useLocalStorageDefaultRoute();
        const [setCurrent] = useLocalStorageCurrent();
        return this.token(param).pipe(mergeMap((token) => {
            if (token === false) {
                return this.i18n.loadLocaleData(defaultLang).pipe(map((langData) => {
                    this.i18n.use(defaultLang, langData);
                    this.settingService.setLayout('lang', defaultLang);
                }), mergeMap(() => EMPTY));
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
                    avatar: this.config.baseUrl && yunzaiUser.avatarId
                        ? `${this.config.baseUrl}/filecenter/file/${yunzaiUser.avatarId}`
                        : '',
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
                            // 自动认证为false情况下会出现: 后台已经下线,但是用户进入网页存储了上次的cookie,Token，所以网页还是登录状态
                            // 在这里如果2001时自动清理客户端过时的token以保证页面显示登录状态正常
                            localStorage.clear();
                            this.tokenService.clear();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiStartupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiStartupService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiStartupService, decorators: [{
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
    bis = BUSINESS_DEFAULT_CONFIG;
    menus = [];
    links = [];
    value = {};
    configService = inject(YunzaiConfigService);
    pathToRegexp = inject(PathToRegexpService);
    win = inject(WINDOW);
    tokenService = inject(YA_SERVICE_TOKEN);
    constructor() {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiAnalysisAddonGuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiAnalysisAddonGuardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiAnalysisAddonGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });
const analysisAddonCanActive = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);
const analysisAddonCanActiveChild = (_, state) => inject(YunzaiAnalysisAddonGuardService).process(state.url);

class ActGuardService {
    bis = BUSINESS_DEFAULT_CONFIG;
    menus = [];
    links = [];
    configService = inject(YunzaiConfigService);
    pathToRegexp = inject(PathToRegexpService);
    router = inject(Router);
    constructor() {
        log('act: ');
        this.bis = mergeBisConfig(this.configService);
        log('act: config ', this.bis);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        log('act: user ', user);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ActGuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ActGuardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ActGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
const actGuardCanActive = (_, state) => inject(ActGuardService).process(state.url);
const actGuardCanActiveChild = (_, state) => inject(ActGuardService).process(state.url);

class YunzaiLayoutWebsite01Component {
    logoSrc;
    logoAlt = 'logo';
    slogan = '';
    contentTpl;
    tokenService = inject(YA_SERVICE_TOKEN);
    configService = inject(YunzaiConfigService);
    startupSrv = inject(YunzaiStartupService);
    win = inject(WINDOW);
    get _logoSrc() {
        return this.logoSrc;
    }
    get _logoAlt() {
        return this.logoAlt || 'logo';
    }
    get _slogan() {
        return this.slogan || '';
    }
    get _contentTpl() {
        return this.contentTpl;
    }
    get _username() {
        const [, getUser] = useLocalStorageUser();
        return getUser()?.realname || '';
    }
    get isLogin() {
        const [, getUser] = useLocalStorageUser();
        return !!this.tokenService.get()?.access_token && !!getUser();
    }
    get _links() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        return getProjectInfo()?.profileList || [];
    }
    login() {
        this.startupSrv.load({ force: true }).subscribe(() => { });
    }
    logout() {
        const baseUrl = this.configService.get('bis')?.baseUrl || '/backstage';
        this.win.location.href = `${baseUrl}/cas-proxy/app/logout?callback=${encodeURIComponent(this.win.location.href)}`;
    }
    to(url) {
        if (url)
            this.win.location.href = url;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiLayoutWebsite01Component, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.1.3", type: YunzaiLayoutWebsite01Component, isStandalone: true, selector: "yunzai-layout-website-01", inputs: { logoSrc: "logoSrc", logoAlt: "logoAlt", slogan: "slogan", contentTpl: "contentTpl" }, ngImport: i0, template: `
    <div class="yz-layout-website-01">
      <div class="yz-layout-website-01-nav__user">
        @if (isLogin) {
          <a
            class="yz-layout-website-01-link"
            nz-dropdown
            [nzDropdownMenu]="menu"
            [nzOverlayStyle]="{ width: '120px' }"
          >
            <span nz-icon nzType="user" nzTheme="outline"></span>{{ _username }}<span nz-icon nzType="down"></span>
          </a>
          <nz-dropdown-menu #menu="nzDropdownMenu">
            <ul nz-menu [nzSelectable]="true">
              @for (link of _links; track $index) {
                <li nz-menu-item class="yz-layout-website-01-link__li" (click)="to(link.url)">{{ link.name }}</li>
              }
              <li nz-menu-item [nzDanger]="true" class="yz-layout-website-01-link__li" (click)="logout()"
                >{{ 'menu.account.logout' | i18n }}
              </li>
            </ul>
          </nz-dropdown-menu>
        } @else {
          <a class="yz-layout-website-01-link" (click)="login()">
            <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
          >
        }
      </div>

      <header class="yz-layout-website-01-nav">
        @if (_logoSrc) {
          <img [alt]="_logoAlt" class="yz-layout-website-01-nav__logo" [src]="_logoSrc" />
        } @else {
          <div class="yz-layout-website-01-nav__logo__full">LOGO</div>
        }

        <div class="yz-layout-website-01-nav__content">
          <ng-template *ngTemplateOutlet="_contentTpl" />
        </div>
        <div class="yz-layout-website-01-nav__slogan">
          {{ _slogan }}
        </div>
      </header>
      <main class="yz-layout-website-01-container">
        <router-outlet />
      </main>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "ngmodule", type: NzI18nModule }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i2.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiLayoutWebsite01Component, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-layout-website-01',
                    template: `
    <div class="yz-layout-website-01">
      <div class="yz-layout-website-01-nav__user">
        @if (isLogin) {
          <a
            class="yz-layout-website-01-link"
            nz-dropdown
            [nzDropdownMenu]="menu"
            [nzOverlayStyle]="{ width: '120px' }"
          >
            <span nz-icon nzType="user" nzTheme="outline"></span>{{ _username }}<span nz-icon nzType="down"></span>
          </a>
          <nz-dropdown-menu #menu="nzDropdownMenu">
            <ul nz-menu [nzSelectable]="true">
              @for (link of _links; track $index) {
                <li nz-menu-item class="yz-layout-website-01-link__li" (click)="to(link.url)">{{ link.name }}</li>
              }
              <li nz-menu-item [nzDanger]="true" class="yz-layout-website-01-link__li" (click)="logout()"
                >{{ 'menu.account.logout' | i18n }}
              </li>
            </ul>
          </nz-dropdown-menu>
        } @else {
          <a class="yz-layout-website-01-link" (click)="login()">
            <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
          >
        }
      </div>

      <header class="yz-layout-website-01-nav">
        @if (_logoSrc) {
          <img [alt]="_logoAlt" class="yz-layout-website-01-nav__logo" [src]="_logoSrc" />
        } @else {
          <div class="yz-layout-website-01-nav__logo__full">LOGO</div>
        }

        <div class="yz-layout-website-01-nav__content">
          <ng-template *ngTemplateOutlet="_contentTpl" />
        </div>
        <div class="yz-layout-website-01-nav__slogan">
          {{ _slogan }}
        </div>
      </header>
      <main class="yz-layout-website-01-container">
        <router-outlet />
      </main>
    </div>
  `,
                    imports: [RouterOutlet, I18nPipe, NzI18nModule, NgFor, NgIf, NzDropDownModule, NzIconModule, NgTemplateOutlet]
                }]
        }], propDecorators: { logoSrc: [{
                type: Input
            }], logoAlt: [{
                type: Input
            }], slogan: [{
                type: Input
            }], contentTpl: [{
                type: Input
            }] } });

class YunzaiLayoutWebsite02Component {
    logoSrc;
    logoAlt = 'logo';
    userMenuShow = false;
    slogan;
    contentTpl;
    tokenService = inject(YA_SERVICE_TOKEN);
    configService = inject(YunzaiConfigService);
    startupSrv = inject(YunzaiStartupService);
    win = inject(WINDOW);
    get _logoSrc() {
        return this.logoSrc;
    }
    get _logoAlt() {
        return this.logoAlt || 'logo';
    }
    get _userMenuShow() {
        return this.userMenuShow || false;
    }
    get _slogan() {
        return this.slogan;
    }
    get _contentTpl() {
        return this.contentTpl;
    }
    get _username() {
        const [, getUser] = useLocalStorageUser();
        return getUser()?.realname || '';
    }
    get _avatar() {
        const [, getUser] = useLocalStorageUser();
        const baseUrl = this.configService.get('bis')?.baseUrl || '/backstage';
        const avatarUrl = getUser()?.avatarId ? `${baseUrl}/filecenter/file/${getUser()?.avatarId}` : undefined;
        return avatarUrl;
    }
    get isLogin() {
        const [, getUser] = useLocalStorageUser();
        return !!this.tokenService.get()?.access_token && !!getUser();
    }
    get _links() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        return getProjectInfo()?.profileList || [];
    }
    login() {
        this.startupSrv.load({ force: true }).subscribe(() => { });
    }
    logout() {
        const baseUrl = this.configService.get('bis')?.baseUrl || '/backstage';
        this.win.location.href = `${baseUrl}/cas-proxy/app/logout?callback=${encodeURIComponent(this.win.location.href)}`;
    }
    to(url) {
        if (url)
            this.win.location.href = url;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiLayoutWebsite02Component, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.1.3", type: YunzaiLayoutWebsite02Component, isStandalone: true, selector: "yunzai-layout-website-02", inputs: { logoSrc: "logoSrc", logoAlt: "logoAlt", userMenuShow: "userMenuShow", slogan: "slogan", contentTpl: "contentTpl" }, ngImport: i0, template: `
    <div class="yz-layout-website-02">
      <header class="yz-layout-website-02-nav">
        <div class="yz-layout-website-02-inner-content">
          @if (_logoSrc) {
            <img [alt]="_logoAlt" class="yz-layout-website-02-nav__logo" [src]="_logoSrc" />
          } @else {
            <div class="yz-layout-website-02-nav__logo__full">LOGO</div>
          }

          <div class="yz-layout-website-02-nav__content">
            <ng-template *ngTemplateOutlet="_contentTpl" />
          </div>

          <div class="yz-layout-website-02-nav-right">
            <div class="yz-layout-website-02-nav__slogan">
              <ng-template *ngTemplateOutlet="_slogan" />
            </div>
            @if (isLogin) {
              <a
                class="yz-layout-website-02-link"
                nz-dropdown
                [nzDropdownMenu]="menu"
                [nzDisabled]="!_userMenuShow"
                [nzPlacement]="'bottomRight'"
              >
                <nz-avatar nzIcon="user" [nzSrc]="_avatar" /><b>欢迎访问：{{ _username }}</b>
                <span nz-icon nzType="down" *ngIf="_userMenuShow"></span>
              </a>
              <nz-dropdown-menu #menu="nzDropdownMenu">
                <ul nz-menu nzSelectable>
                  @for (link of _links; track $index) {
                    <li nz-menu-item class="yz-layout-website-02-link__li" (click)="to(link.url)">{{ link.name }}</li>
                  }
                  <li nz-menu-item nzDanger class="yz-layout-website-02-link__li" (click)="logout()">{{
                    'menu.account.logout' | i18n
                  }}</li>
                </ul>
              </nz-dropdown-menu>
            } @else {
              <a class="yz-layout-website-02-link" (click)="login()">
                <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
              >
            }
          </div>
        </div>
      </header>
      <main class="yz-layout-website-02-container">
        <router-outlet />
      </main>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "ngmodule", type: NzI18nModule }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i2.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i4.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon", "nzLoading", "nzFetchPriority"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiLayoutWebsite02Component, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-layout-website-02',
                    template: `
    <div class="yz-layout-website-02">
      <header class="yz-layout-website-02-nav">
        <div class="yz-layout-website-02-inner-content">
          @if (_logoSrc) {
            <img [alt]="_logoAlt" class="yz-layout-website-02-nav__logo" [src]="_logoSrc" />
          } @else {
            <div class="yz-layout-website-02-nav__logo__full">LOGO</div>
          }

          <div class="yz-layout-website-02-nav__content">
            <ng-template *ngTemplateOutlet="_contentTpl" />
          </div>

          <div class="yz-layout-website-02-nav-right">
            <div class="yz-layout-website-02-nav__slogan">
              <ng-template *ngTemplateOutlet="_slogan" />
            </div>
            @if (isLogin) {
              <a
                class="yz-layout-website-02-link"
                nz-dropdown
                [nzDropdownMenu]="menu"
                [nzDisabled]="!_userMenuShow"
                [nzPlacement]="'bottomRight'"
              >
                <nz-avatar nzIcon="user" [nzSrc]="_avatar" /><b>欢迎访问：{{ _username }}</b>
                <span nz-icon nzType="down" *ngIf="_userMenuShow"></span>
              </a>
              <nz-dropdown-menu #menu="nzDropdownMenu">
                <ul nz-menu nzSelectable>
                  @for (link of _links; track $index) {
                    <li nz-menu-item class="yz-layout-website-02-link__li" (click)="to(link.url)">{{ link.name }}</li>
                  }
                  <li nz-menu-item nzDanger class="yz-layout-website-02-link__li" (click)="logout()">{{
                    'menu.account.logout' | i18n
                  }}</li>
                </ul>
              </nz-dropdown-menu>
            } @else {
              <a class="yz-layout-website-02-link" (click)="login()">
                <span nz-icon nzType="login" nzTheme="outline"></span>{{ 'app.login.login' | i18n }}</a
              >
            }
          </div>
        </div>
      </header>
      <main class="yz-layout-website-02-container">
        <router-outlet />
      </main>
    </div>
  `,
                    imports: [
                        RouterOutlet,
                        I18nPipe,
                        NzI18nModule,
                        NgFor,
                        NgIf,
                        NzDropDownModule,
                        NzIconModule,
                        NgTemplateOutlet,
                        NzAvatarModule
                    ]
                }]
        }], propDecorators: { logoSrc: [{
                type: Input
            }], logoAlt: [{
                type: Input
            }], userMenuShow: [{
                type: Input
            }], slogan: [{
                type: Input
            }], contentTpl: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ActGuardService, BisModule, CODEMESSAGE, YunzaiAnalysisAddonGuardService, YunzaiLayoutWebsite01Component, YunzaiLayoutWebsite02Component, YunzaiStartupService, actGuardCanActive, actGuardCanActiveChild, analysisAddonCanActive, analysisAddonCanActiveChild, checkStatus, generateAbility, getAdditionalHeaders, goTo, mapYzSideToYelonMenu, provideYunzaiBindAuthRefresh, provideYunzaiBis, provideYunzaiStartup, toLogin, tryRefreshToken, yunzaiDefaultInterceptor };
//# sourceMappingURL=bis.mjs.map
