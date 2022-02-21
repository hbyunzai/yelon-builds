import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { YunzaiAuthConfig } from '@yelon/util/config';
import { ITokenModel } from './interface';
import * as i0 from "@angular/core";
export declare abstract class BaseInterceptor implements HttpInterceptor {
    protected injector: Injector;
    constructor(injector: Injector);
    protected model: ITokenModel;
    abstract isAuth(options: YunzaiAuthConfig): boolean;
    abstract setReq(req: HttpRequest<NzSafeAny>, options: YunzaiAuthConfig): HttpRequest<NzSafeAny>;
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseInterceptor, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseInterceptor>;
}
