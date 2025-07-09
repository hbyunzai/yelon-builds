import * as i0 from '@angular/core';
import { EnvironmentProviders, Injector, Provider, TemplateRef } from '@angular/core';
import * as i1 from '@yelon/bis/layout';
import * as i2 from '@yelon/bis/yunzai-widgets';
import { HttpHeaders, HttpResponseBase, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITokenModel } from '@yelon/auth';
import { YunzaiMenu, YunzaiProfile } from '@yelon/util';
import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { Menu } from '@yelon/theme';

declare function provideYunzaiBis(): EnvironmentProviders;

declare class BisModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BisModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BisModule, never, [typeof i1.YunzaiLayoutModule, typeof i2.YunzaiWidgetsModule], [typeof i1.YunzaiLayoutModule, typeof i2.YunzaiWidgetsModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BisModule>;
}

declare const CODEMESSAGE: Record<number, string>;
declare function getAdditionalHeaders(headers?: HttpHeaders): Record<string, string>;
declare function checkStatus(injector: Injector, ev: HttpResponseBase): void;
interface ReThrowHttpError {
    body: any;
    _throw: true;
}
declare function goTo(injector: Injector, url: string): void;
declare function toLogin(injector: Injector): void;

declare const yunzaiDefaultInterceptor: HttpInterceptorFn;

declare const tryRefreshToken: (injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn) => Observable<any>;
declare function provideYunzaiBindAuthRefresh(): Provider[];

interface LoadParam {
    force?: boolean;
}
declare function provideYunzaiStartup(): Array<Provider | EnvironmentProviders>;
declare class YunzaiStartupService {
    private readonly config;
    private readonly menuService;
    private readonly aclService;
    private readonly titleService;
    private readonly tokenService;
    private readonly httpClient;
    private readonly settingService;
    private readonly i18n;
    private readonly win;
    private readonly configService;
    load(param?: LoadParam): Observable<void>;
    token(param?: LoadParam): Observable<ITokenModel | boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiStartupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiStartupService>;
}
declare function mapYzSideToYelonMenu(menus: YunzaiMenu[]): void;
declare function generateAbility(menus: YunzaiMenu[], abilities: string[], prefix: string): void;

declare class YunzaiAnalysisAddonGuardService {
    private bis;
    private menus;
    private links;
    private value;
    private configService;
    private pathToRegexp;
    private win;
    private tokenService;
    constructor();
    process(url: string): boolean;
    getAllLinks(menu: Menu[], links: Array<{
        title: string;
        link: string;
    }>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiAnalysisAddonGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiAnalysisAddonGuardService>;
}
declare const analysisAddonCanActive: CanActivateFn;
declare const analysisAddonCanActiveChild: CanActivateChildFn;

declare class ActGuardService {
    private bis;
    private menus;
    private links;
    private configService;
    private pathToRegexp;
    private router;
    constructor();
    process(url: string): boolean;
    preHandle(url: string): boolean;
    getAllLinks(menu: Menu[], links: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActGuardService>;
}
declare const actGuardCanActive: CanActivateFn;
declare const actGuardCanActiveChild: CanActivateChildFn;

declare class YunzaiLayoutWebsite01Component {
    logoSrc?: string | any;
    logoAlt?: string;
    slogan?: string;
    contentTpl?: TemplateRef<void> | any;
    private readonly tokenService;
    private readonly configService;
    private readonly startupSrv;
    private readonly win;
    get _logoSrc(): string | any;
    get _logoAlt(): string;
    get _slogan(): string;
    get _contentTpl(): TemplateRef<void> | any;
    get _username(): string;
    get isLogin(): boolean;
    get _links(): YunzaiProfile[];
    login(): void;
    logout(): void;
    to(url?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutWebsite01Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutWebsite01Component, "yunzai-layout-website-01", never, { "logoSrc": { "alias": "logoSrc"; "required": false; }; "logoAlt": { "alias": "logoAlt"; "required": false; }; "slogan": { "alias": "slogan"; "required": false; }; "contentTpl": { "alias": "contentTpl"; "required": false; }; }, {}, never, never, true, never>;
}

declare class YunzaiLayoutWebsite02Component {
    logoSrc?: string | any;
    logoAlt?: string;
    userMenuShow?: boolean;
    slogan?: TemplateRef<void> | any;
    contentTpl?: TemplateRef<void> | any;
    private readonly tokenService;
    private readonly configService;
    private readonly startupSrv;
    private readonly win;
    get _logoSrc(): string | any;
    get _logoAlt(): string;
    get _userMenuShow(): boolean;
    get _slogan(): TemplateRef<void> | any;
    get _contentTpl(): TemplateRef<void> | any;
    get _username(): string;
    get _avatar(): string | undefined;
    get isLogin(): boolean;
    get _links(): YunzaiProfile[];
    login(): void;
    logout(): void;
    to(url?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutWebsite02Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutWebsite02Component, "yunzai-layout-website-02", never, { "logoSrc": { "alias": "logoSrc"; "required": false; }; "logoAlt": { "alias": "logoAlt"; "required": false; }; "userMenuShow": { "alias": "userMenuShow"; "required": false; }; "slogan": { "alias": "slogan"; "required": false; }; "contentTpl": { "alias": "contentTpl"; "required": false; }; }, {}, never, never, true, never>;
}

export { ActGuardService, BisModule, CODEMESSAGE, YunzaiAnalysisAddonGuardService, YunzaiLayoutWebsite01Component, YunzaiLayoutWebsite02Component, YunzaiStartupService, actGuardCanActive, actGuardCanActiveChild, analysisAddonCanActive, analysisAddonCanActiveChild, checkStatus, generateAbility, getAdditionalHeaders, goTo, mapYzSideToYelonMenu, provideYunzaiBindAuthRefresh, provideYunzaiBis, provideYunzaiStartup, toLogin, tryRefreshToken, yunzaiDefaultInterceptor };
export type { LoadParam, ReThrowHttpError };
