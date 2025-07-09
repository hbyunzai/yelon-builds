import * as i0 from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import * as i1 from '@yelon/theme';
import * as i2 from '@angular/forms';
import * as i3 from 'ng-zorro-antd/form';
import * as i4 from 'ng-zorro-antd/input';
import * as i5 from '@angular/common';
import * as i6 from 'ng-zorro-antd/grid';
import * as i7 from 'ng-zorro-antd/icon';
import * as i8 from 'ng-zorro-antd/dropdown';
import * as i9 from 'ng-zorro-antd/tabs';
import { LayoutNavGroupState, YunzaiNavTopic, NavType, YunzaiHeaderStyle, LayoutBasicAside, LayoutBasicDisplay, LayoutNavApplicationState } from '@yelon/util';
import { LayoutDefaultOptions } from '@yelon/theme/layout-default';

declare class YunzaiLayoutNavTileComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutNavTileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutNavTileComponent, "yunzai-layout-nav-tile", never, {}, {}, never, never, true, never>;
}

declare class YunzaiLayoutNavGroupComponent implements OnInit, OnDestroy {
    private readonly http;
    private destroy$;
    private readonly win;
    state: LayoutNavGroupState;
    ngOnInit(): void;
    open(topic: YunzaiNavTopic): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutNavGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutNavGroupComponent, "yunzai-layout-nav-group", never, {}, {}, never, never, true, never>;
}

interface LayoutBasicState {
    options: LayoutDefaultOptions;
    aside: LayoutBasicAside;
    display: LayoutBasicDisplay;
    navType: NavType;
}
interface ApplicationInfoInterface {
    id?: string;
    name?: string;
    showName?: string;
    lastVersion?: string;
    versionNum?: string;
    currentVersion?: string;
    firstDeploymentDate?: string;
    currentDeploymentDate?: string;
    lastPushDate?: string;
}
declare class YunzaiLayoutBasicComponent implements OnInit {
    private readonly stomp;
    private readonly win;
    private readonly layoutDisplayService;
    private readonly conf;
    NavType: typeof NavType;
    private state;
    headerStyleList: YunzaiHeaderStyle[];
    applicationInfo: ApplicationInfoInterface;
    applicationModal: {
        isVisible: boolean;
        loading: boolean;
    };
    private readonly httpClient;
    private config;
    get options(): LayoutDefaultOptions;
    get navType(): NavType;
    get aside(): LayoutBasicAside;
    get displayReusetab(): boolean;
    get reusetabCSS(): any;
    ngOnInit(): void;
    initFavicon(): void;
    initAside(): void;
    initLogo(): void;
    initNavType(): void;
    toIndex(): void;
    onNavTypeChange(type: NavType | string): void;
    addLayoutDisplayListener(): void;
    aboutApplication(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutBasicComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutBasicComponent, "yunzai-layout-basic", never, {}, {}, never, never, true, never>;
}

declare class YunzaiLayoutModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiLayoutModule, never, [typeof i1.I18nPipe, typeof i2.FormsModule, typeof i3.NzFormModule, typeof i4.NzInputModule, typeof i5.CommonModule, typeof i6.NzGridModule, typeof i7.NzIconModule, typeof i8.NzDropDownModule, typeof i9.NzTabsModule, typeof YunzaiLayoutNavTileComponent, typeof YunzaiLayoutNavGroupComponent, typeof YunzaiLayoutBasicComponent], [typeof YunzaiLayoutNavTileComponent, typeof YunzaiLayoutNavGroupComponent, typeof YunzaiLayoutBasicComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiLayoutModule>;
}

declare class YunzaiNavApplicationComponent implements OnInit, OnDestroy {
    private readonly config;
    private readonly http;
    private readonly win;
    private readonly i18n;
    private readonly destroy$;
    state: LayoutNavApplicationState;
    get showAllMenu(): boolean;
    get showMineMenu(): boolean;
    ngOnInit(): void;
    fetchAllTopic(): void;
    attachNav(type: 'all' | 'mine' | 'other', topic?: YunzaiNavTopic): void;
    clearSearch(): void;
    displayAllNav(): void;
    displayMineNav(): void;
    displayOtherNav(topic: YunzaiNavTopic): void;
    diffChange(flag?: boolean): void;
    open(topic: YunzaiNavTopic): void;
    onSearch(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiNavApplicationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiNavApplicationComponent, "yunzai-layout-nav-application", never, {}, {}, never, never, true, never>;
}

export { YunzaiLayoutBasicComponent, YunzaiLayoutModule, YunzaiLayoutNavGroupComponent, YunzaiLayoutNavTileComponent, YunzaiNavApplicationComponent };
export type { ApplicationInfoInterface, LayoutBasicState };
