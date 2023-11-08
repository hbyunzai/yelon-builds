import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { YunzaiAuthConfig, YunzaiConfigService } from '@yelon/util/config';
import { AuthReferrer, ITokenModel, ITokenService } from './interface';
import { IStore } from '../store/interface';
import * as i0 from "@angular/core";
export declare function YA_SERVICE_TOKEN_FACTORY(): ITokenService;
/**
 * 维护Token信息服务，[在线文档](https://ng.yunzainfo.com/auth)
 */
export declare class TokenService implements ITokenService, OnDestroy {
    private store;
    private refresh$;
    private change$;
    private interval$?;
    private _referrer;
    private _options;
    constructor(configSrv: YunzaiConfigService, store: IStore);
    get refresh(): Observable<ITokenModel>;
    get login_url(): string | undefined;
    get referrer(): AuthReferrer;
    get options(): YunzaiAuthConfig;
    set(data: ITokenModel): boolean;
    get(type?: any): any;
    get<T extends ITokenModel>(type?: new () => T): T;
    clear(options?: {
        onlyToken: boolean;
    }): void;
    change(): Observable<ITokenModel | null>;
    private builderRefresh;
    private cleanRefresh;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TokenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TokenService>;
}
