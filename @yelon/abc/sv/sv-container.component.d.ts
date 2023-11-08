import { ElementRef, OnInit, Renderer2, TemplateRef } from '@angular/core';
import type { REP_TYPE } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class SVContainerComponent {
    static ngAcceptInputType_gutter: NumberInput;
    static ngAcceptInputType_labelWidth: NumberInput;
    static ngAcceptInputType_col: NumberInput;
    static ngAcceptInputType_colInCon: NumberInput;
    static ngAcceptInputType_default: BooleanInput;
    static ngAcceptInputType_noColon: BooleanInput;
    static ngAcceptInputType_bordered: BooleanInput;
    colInCon?: REP_TYPE;
    title?: string | TemplateRef<void>;
    size?: 'small' | 'large' | 'default';
    /** 列表项间距，单位为 `px` */
    gutter: number;
    layout: 'horizontal' | 'vertical';
    labelWidth?: number;
    /** 指定信息最多分几列展示，最终一行几列由 col 配置结合响应式规则决定 */
    col: number;
    default: boolean;
    noColon: boolean;
    bordered: boolean;
    get margin(): {
        [k: string]: number;
    };
    constructor(configSrv: YunzaiConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SVContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SVContainerComponent, "sv-container, [sv-container]", ["svContainer"], { "colInCon": { "alias": "sv-container"; "required": false; }; "title": { "alias": "title"; "required": false; }; "size": { "alias": "size"; "required": false; }; "gutter": { "alias": "gutter"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "labelWidth": { "alias": "labelWidth"; "required": false; }; "col": { "alias": "col"; "required": false; }; "default": { "alias": "default"; "required": false; }; "noColon": { "alias": "noColon"; "required": false; }; "bordered": { "alias": "bordered"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class SVTitleComponent implements OnInit {
    private el;
    private parent;
    private ren;
    constructor(el: ElementRef<HTMLElement>, parent: SVContainerComponent, ren: Renderer2);
    private setClass;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SVTitleComponent, [null, { optional: true; host: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SVTitleComponent, "sv-title, [sv-title]", ["svTitle"], {}, {}, never, ["*"], false, never>;
}
