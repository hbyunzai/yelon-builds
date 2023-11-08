import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
declare class YunzaiDefaultInterceptor implements HttpInterceptor {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDefaultInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiDefaultInterceptor>;
}
export { YunzaiDefaultInterceptor as YzDefaultInterceptor, YunzaiDefaultInterceptor };
