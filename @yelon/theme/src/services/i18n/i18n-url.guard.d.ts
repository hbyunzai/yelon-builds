import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { YunzaiI18NService } from './i18n';
import * as i0 from "@angular/core";
export declare class YunzaiI18NGuardService {
    private i18nSrv;
    private cogSrv;
    constructor(i18nSrv: YunzaiI18NService, cogSrv: YunzaiConfigService);
    process(route: ActivatedRouteSnapshot): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiI18NGuardService, [{ optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiI18NGuardService>;
}
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ yunzaiI18nCanActivate ]
 * }
 * ```
 */
export declare const yunzaiI18nCanActivate: CanActivateFn;
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ yunzaiI18nCanActivateChild ]
 * }
 * ```
 */
export declare const yunzaiI18nCanActivateChild: CanActivateChildFn;
