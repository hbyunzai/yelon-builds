import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ThemeBtnType } from '@yelon/theme/theme-btn';
import { YunzaiConfigService } from '@yelon/util/config';
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
}
