import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ACLService } from './acl.service';
import * as i0 from "@angular/core";
/**
 * Routing guard prevent unauthorized users visit the page, [ACL Document](https://ng.yunzainfo.com/acl).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ ACLGuard ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
export declare class ACLGuard implements CanActivate, CanActivateChild, CanLoad {
    private srv;
    private router;
    private injector;
    constructor(srv: ACLService, router: Router, injector: Injector);
    private process;
    canLoad(route: Route): Observable<boolean>;
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot | null): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ACLGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ACLGuard>;
}
