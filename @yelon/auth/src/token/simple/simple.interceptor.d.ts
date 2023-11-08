import { HttpRequest } from '@angular/common/http';
import { YunzaiAuthConfig } from '@yelon/util/config';
import { BaseInterceptor } from '../base.interceptor';
import * as i0 from "@angular/core";
/**
 * Simple 拦截器
 *
 * ```
 * // app.module.ts
 * { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true}
 * ```
 */
export declare class SimpleInterceptor extends BaseInterceptor {
    isAuth(_options: YunzaiAuthConfig): boolean;
    setReq(req: HttpRequest<any>, options: YunzaiAuthConfig): HttpRequest<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SimpleInterceptor>;
}
