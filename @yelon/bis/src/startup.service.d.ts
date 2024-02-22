import { Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenModel } from '@yelon/auth';
import { YunzaiMenu } from '@yelon/util';
import * as i0 from "@angular/core";
export declare function provideYunzaiStartup(): Provider[];
export declare class YunzaiStartupService {
    private config;
    private menuService;
    private aclService;
    private titleService;
    private tokenService;
    private httpClient;
    private settingService;
    private i18n;
    load(): Observable<void>;
    token(): Observable<ITokenModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiStartupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiStartupService>;
}
export declare function mapYzSideToYelonMenu(menus: YunzaiMenu[]): void;
export declare function generateAbility(menus: YunzaiMenu[], abilities: string[], prefix: string): void;
