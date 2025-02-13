import { OnInit } from '@angular/core';
import { LayoutDefaultOptions } from '@yelon/theme/layout-default';
import { LayoutBasicAside, LayoutBasicDisplay, NavType, YunzaiHeaderStyle } from '@yelon/util';
import * as i0 from "@angular/core";
export interface LayoutBasicState {
    options: LayoutDefaultOptions;
    aside: LayoutBasicAside;
    display: LayoutBasicDisplay;
    navType: NavType;
}
export interface ApplicationInfoInterface {
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
export declare class YunzaiLayoutBasicComponent implements OnInit {
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
