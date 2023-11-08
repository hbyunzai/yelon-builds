import { Observable } from 'rxjs';
import { ACLService } from '@yelon/acl';
import { MenuService, SettingsService, TitleService } from '@yelon/theme';
import { YunzaiMenu, YunzaiConfigService } from '@yelon/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { YunzaiAuthService } from './yunzai-auth.service';
import { YunzaiI18NService } from './yunzai-i18n.service';
import * as i0 from "@angular/core";
export declare class YunzaiStartupService {
    private menuService;
    private i18n;
    private win;
    private settingService;
    private aclService;
    private titleService;
    private yzAuthService;
    private configService;
    private config;
    constructor(iconSrv: NzIconService, menuService: MenuService, i18n: YunzaiI18NService, win: NzSafeAny, settingService: SettingsService, aclService: ACLService, titleService: TitleService, yzAuthService: YunzaiAuthService, configService: YunzaiConfigService);
    load(): Observable<void>;
    systemInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiStartupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiStartupService>;
}
export declare function mapYzSideToYelonMenu(menus: YunzaiMenu[]): void;
export declare function generateAbility(menus: YunzaiMenu[], abilities: string[], prefix: string): void;
export declare function YunzaiStartupServiceFactory(startupService: YunzaiStartupService): () => Observable<void>;
export declare const YUNZAI_APPINIT_PROVIDES: (typeof YunzaiStartupService | {
    provide: import("@angular/core").InjectionToken<readonly (() => void | Observable<unknown> | Promise<unknown>)[]>;
    useFactory: typeof YunzaiStartupServiceFactory;
    deps: (typeof YunzaiStartupService)[];
    multi: boolean;
})[];
