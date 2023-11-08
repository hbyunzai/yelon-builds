import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '@yelon/theme';
import { YunzaiConfigService, PathToRegexpService } from '@yelon/util';
import * as i0 from "@angular/core";
export declare class ActGuard implements CanActivate, CanActivateChild {
    private configService;
    private pathToRegexp;
    private router;
    private bis;
    private menus;
    private links;
    constructor(configService: YunzaiConfigService, pathToRegexp: PathToRegexpService, router: Router);
    canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    canActivateChild(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    preHandle(state: RouterStateSnapshot): boolean;
    getAllLinks(menu: Menu[], links: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActGuard>;
}
