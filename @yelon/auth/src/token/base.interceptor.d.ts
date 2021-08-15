import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { YunzaiAuthConfig } from '@yelon/util/config';
import { ITokenModel } from './interface';
export declare abstract class BaseInterceptor implements HttpInterceptor {
    protected injector: Injector;
    constructor(injector: Injector);
    protected model: ITokenModel;
    abstract isAuth(options: YunzaiAuthConfig): boolean;
    abstract setReq(req: HttpRequest<NzSafeAny>, options: YunzaiAuthConfig): HttpRequest<NzSafeAny>;
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
}
