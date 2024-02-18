import { OnInit } from '@angular/core';
import { StompService } from '@yelon/socket';
import { LayoutDefaultOptions, LayoutDisplayService } from '@yelon/theme/layout-default';
import { NavType, LayoutBasicAside } from '@yelon/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class YunzaiLayoutBasicComponent implements OnInit {
    private layoutDisplayService;
    private stompService;
    private win;
    NavType: typeof NavType;
    private state;
    get options(): LayoutDefaultOptions;
    get navType(): NavType;
    get aside(): LayoutBasicAside;
    get displayReusetab(): boolean;
    get reusetabCSS(): NzSafeAny;
    constructor(layoutDisplayService: LayoutDisplayService, stompService: StompService, win: typeof window);
    ngOnInit(): void;
    initFavicon(): void;
    initAside(): void;
    initLogo(): void;
    initNavType(): void;
    toIndex(): void;
    onNavTypeChange(type: NavType): void;
    addLayoutDisplayListener(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutBasicComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutBasicComponent, "yz-layout-basic", never, {}, {}, never, never, false, never>;
}
