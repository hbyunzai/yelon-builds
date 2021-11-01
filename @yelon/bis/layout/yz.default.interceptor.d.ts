import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
export declare class YzDefaultInterceptor implements HttpInterceptor {
    private injector;
    private jump;
    private refreshToking;
    private refreshToken$;
    private get notification();
    private get tokenSrv();
    private get http();
    private get config();
    private goTo;
    constructor(injector: Injector);
    private checkStatus;
    private ToLogin;
    private reAttachToken;
    private refreshTokenRequest;
    private tryRefreshToken;
    private getAdditionalHeaders;
    private handleData;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
