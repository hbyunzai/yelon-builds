import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class ErrorCollectComponent implements OnInit {
    private el;
    private cdr;
    private doc;
    private directionality;
    private platform;
    private formEl;
    private destroy$;
    _hiden: boolean;
    count: number;
    dir: Direction;
    freq: number;
    offsetTop: number;
    constructor(el: ElementRef, cdr: ChangeDetectorRef, doc: NzSafeAny, configSrv: YunzaiConfigService, directionality: Directionality, platform: Platform);
    private get errEls();
    private update;
    _click(): boolean;
    private install;
    private findParent;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorCollectComponent, [null, null, null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ErrorCollectComponent, "error-collect, [error-collect]", ["errorCollect"], { "freq": { "alias": "freq"; "required": false; }; "offsetTop": { "alias": "offsetTop"; "required": false; }; }, {}, never, never, false, never>;
}
