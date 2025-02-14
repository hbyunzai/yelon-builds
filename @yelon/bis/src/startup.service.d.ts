import { EnvironmentProviders, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenModel } from '@yelon/auth';
import { YunzaiMenu } from '@yelon/util';
import * as i0 from "@angular/core";
export interface LoadParam {
    force?: boolean;
}
export declare function provideYunzaiStartup(): Array<Provider | EnvironmentProviders>;
export declare class YunzaiStartupService {
    private readonly config;
    private readonly menuService;
    private readonly aclService;
    private readonly titleService;
    private readonly tokenService;
    private readonly httpClient;
    private readonly settingService;
    private readonly i18n;
    private readonly win;
    private readonly configService;
    load(param?: LoadParam): Observable<void>;
    token(param?: LoadParam): Observable<ITokenModel | boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiStartupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiStartupService>;
}
export declare function mapYzSideToYelonMenu(menus: YunzaiMenu[]): void;
export declare function generateAbility(menus: YunzaiMenu[], abilities: string[], prefix: string): void;
