import { Direction } from '@angular/cdk/bidi';
import { OnInit } from '@angular/core';
import { SafeHtml, SafeUrl } from '@angular/platform-browser';
import { LocaleData } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export type ExceptionType = 403 | 404 | 500;
export declare class ExceptionComponent implements OnInit {
    static ngAcceptInputType_type: ExceptionType | string;
    private readonly i18n;
    private readonly dom;
    private readonly directionality;
    private readonly cdr;
    private readonly destroy$;
    private conTpl;
    _type: ExceptionType;
    locale: LocaleData;
    hasCon: boolean;
    dir?: Direction;
    _img: SafeUrl;
    _title: SafeHtml;
    _desc: SafeHtml;
    private typeDict;
    set type(value: ExceptionType);
    private fixImg;
    set img(value: string);
    set title(value: string);
    set desc(value: string);
    backRouterLink: string | NzSafeAny[];
    checkContent(): void;
    constructor(configSrv: YunzaiConfigService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExceptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExceptionComponent, "exception", ["exception"], { "type": { "alias": "type"; "required": false; }; "img": { "alias": "img"; "required": false; }; "title": { "alias": "title"; "required": false; }; "desc": { "alias": "desc"; "required": false; }; "backRouterLink": { "alias": "backRouterLink"; "required": false; }; }, {}, never, ["*"], true, never>;
}
