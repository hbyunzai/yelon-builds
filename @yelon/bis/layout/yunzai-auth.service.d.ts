import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenModel } from '@yelon/auth';
import * as i0 from "@angular/core";
export declare class YunzaiAuthService {
    private injector;
    private config;
    constructor(injector: Injector);
    private get configService();
    private get tokenService();
    private get httpClient();
    askToken(): Observable<ITokenModel>;
    fetchTokenByUP(): Observable<ITokenModel>;
    fetchTokenByCas(): Observable<ITokenModel>;
    login(): Observable<void>;
    cacheInit(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiAuthService>;
}
