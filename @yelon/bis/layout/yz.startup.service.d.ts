import { Observable } from 'rxjs';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ACLService } from '@yelon/acl';
import { CacheService } from '@yelon/cache';
import { Menu, MenuService, SettingsService, TitleService } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util';
import { YzAuthService } from './yz.auth.service';
import { YzI18NService } from './yz.i18n.service';
export declare function mapYzSideToYelonMenu(menus: Menu[]): void;
export declare function generateAbility(menus: Menu[], abilities: string[], prefix: string): void;
export declare class YzStartupService {
    private menuService;
    private i18n;
    private settingService;
    private aclService;
    private titleService;
    private yzAuthService;
    private cacheService;
    private configService;
    private bis;
    constructor(iconSrv: NzIconService, menuService: MenuService, i18n: YzI18NService, settingService: SettingsService, aclService: ACLService, titleService: TitleService, yzAuthService: YzAuthService, cacheService: CacheService, configService: YunzaiConfigService);
    load(): Observable<void>;
    systemInit(): void;
}
export declare function YzStartupServiceFactory(startupService: YzStartupService): () => Observable<void>;
export declare const YZ_APPINIT_PROVIDES: (typeof YzStartupService | {
    provide: import("@angular/core").InjectionToken<readonly (() => void | Observable<unknown> | Promise<unknown>)[]>;
    useFactory: typeof YzStartupServiceFactory;
    deps: (typeof YzStartupService)[];
    multi: boolean;
})[];
