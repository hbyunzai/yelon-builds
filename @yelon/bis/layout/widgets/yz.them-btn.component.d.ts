import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ThemeBtnType } from '@yelon/theme/theme-btn';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i0 from "@angular/core";
export interface YzThemeBtnType extends ThemeBtnType {
    color?: string;
}
export declare class YzHeaderThemBtnComponent implements OnInit, OnDestroy {
    private renderer;
    private configSrv;
    private platform;
    private doc;
    private directionality;
    private KEYS;
    private theme;
    types: YzThemeBtnType[];
    devTips: string;
    deployUrl: string;
    private destroy$;
    dir: Direction;
    constructor(renderer: Renderer2, configSrv: YunzaiConfigService, platform: Platform, doc: NzSafeAny, directionality: Directionality, KEYS: string);
    ngOnInit(): void;
    private initTheme;
    private updateChartTheme;
    onThemeChange(theme: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YzHeaderThemBtnComponent, [null, null, null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YzHeaderThemBtnComponent, "yz-header-theme-btn", never, { "types": "types"; "devTips": "devTips"; "deployUrl": "deployUrl"; }, {}, never, never>;
}
