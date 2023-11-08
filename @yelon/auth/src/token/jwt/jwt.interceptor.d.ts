import { HttpRequest } from '@angular/common/http';
import { YunzaiAuthConfig } from '@yelon/util/config';
import { BaseInterceptor } from '../base.interceptor';
import * as i0 from "@angular/core";
/**
 * JWT 拦截器
 *
 * ```
 * // app.module.ts
 * { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
 * ```
 */
export declare class JWTInterceptor extends BaseInterceptor {
    isAuth(options: YunzaiAuthConfig): boolean;
    setReq(req: HttpRequest<any>, _options: YunzaiAuthConfig): HttpRequest<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JWTInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JWTInterceptor>;
}
