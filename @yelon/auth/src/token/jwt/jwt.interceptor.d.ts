import { HttpRequest } from '@angular/common/http';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { YunzaiAuthConfig } from '@yelon/util/config';
import { BaseInterceptor } from '../base.interceptor';
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
    setReq(req: HttpRequest<NzSafeAny>, _options: YunzaiAuthConfig): HttpRequest<NzSafeAny>;
}
