import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { YunzaiI18NService } from './i18n';
import * as i0 from "@angular/core";
export declare class YunzaiI18NGuard implements CanActivate, CanActivateChild {
    private i18nSrv;
    private cogSrv;
    constructor(i18nSrv: YunzaiI18NService, cogSrv: YunzaiConfigService);
    private resolve;
    canActivateChild(childRoute: ActivatedRouteSnapshot, _: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
    canActivate(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiI18NGuard, [{ optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiI18NGuard>;
}
