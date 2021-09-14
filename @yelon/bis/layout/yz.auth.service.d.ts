import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenModel } from '@yelon/auth';
import { YunzaiAuthConfig, YunzaiBusinessConfig } from '@yelon/util';
export declare class YzAuthService {
    private injector;
    protected option: YunzaiAuthConfig;
    protected bis: YunzaiBusinessConfig;
    constructor(injector: Injector);
    private get csr();
    private get tokenService();
    private get httpClient();
    private get cacheService();
    askToken(): Observable<ITokenModel>;
    fetchTokenByUP(): Observable<ITokenModel>;
    fetchTokenByCas(): Observable<ITokenModel>;
    login(): Observable<void>;
    cacheInit(): Observable<void[]>;
}
