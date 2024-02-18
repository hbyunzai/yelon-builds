import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ThemeBtnType } from '@yelon/theme/theme-btn';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export interface YunzaiThemeBtnType extends ThemeBtnType {
    color?: string;
}
export declare class YunzaiThemeBtnComponent implements OnInit, OnDestroy {
    private renderer;
    private configSrv;
    private platform;
    private doc;
    private directionality;
    private KEYS;
    private theme;
    types: YunzaiThemeBtnType[];
    devTips: string;
    deployUrl: string;
    dir: Direction;
    private $destroy;
    constructor(renderer: Renderer2, configSrv: YunzaiConfigService, platform: Platform, doc: NzSafeAny, directionality: Directionality, KEYS: string);
    ngOnInit(): void;
    private initTheme;
    private updateChartTheme;
    onThemeChange(theme: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiThemeBtnComponent, [null, null, null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiThemeBtnComponent, "yunzai-theme-btn", never, { "types": { "alias": "types"; "required": false; }; "devTips": { "alias": "devTips"; "required": false; }; "deployUrl": { "alias": "deployUrl"; "required": false; }; }, {}, never, never, false, never>;
}
