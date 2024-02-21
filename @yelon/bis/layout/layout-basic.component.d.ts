import { OnInit } from '@angular/core';
import { LayoutDefaultOptions } from '@yelon/theme/layout-default';
import { LayoutBasicAside, LayoutBasicDisplay, NavType } from '@yelon/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export interface LayoutBasicState {
    options: LayoutDefaultOptions;
    aside: LayoutBasicAside;
    display: LayoutBasicDisplay;
    navType: NavType;
}
export declare class YunzaiLayoutBasicComponent implements OnInit {
    private readonly stomp;
    private readonly win;
    private readonly layoutDisplayService;
    NavType: typeof NavType;
    private state;
    get options(): LayoutDefaultOptions;
    get navType(): NavType;
    get aside(): LayoutBasicAside;
    get displayReusetab(): boolean;
    get reusetabCSS(): NzSafeAny;
    ngOnInit(): void;
    initFavicon(): void;
    initAside(): void;
    initLogo(): void;
    initNavType(): void;
    toIndex(): void;
    onNavTypeChange(type: NavType): void;
    addLayoutDisplayListener(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutBasicComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutBasicComponent, "yunzai-layout-basic", never, {}, {}, never, never, true, never>;
}
