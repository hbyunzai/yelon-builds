import { CanActivateChildFn, CanActivateFn, CanMatchFn } from '@angular/router';
import * as i0 from "@angular/core";
export declare class AuthJWTGuardService {
    private readonly srv;
    process(url?: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthJWTGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthJWTGuardService>;
}
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
export declare const authJWTCanActivate: CanActivateFn;
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
export declare const authJWTCanActivateChild: CanActivateChildFn;
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
export declare const authJWTCanMatch: CanMatchFn;
