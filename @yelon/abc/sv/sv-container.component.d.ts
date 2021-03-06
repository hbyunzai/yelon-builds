import { ElementRef, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class SVContainerComponent {
    static ngAcceptInputType_gutter: NumberInput;
    static ngAcceptInputType_labelWidth: NumberInput;
    static ngAcceptInputType_col: NumberInput;
    static ngAcceptInputType_default: BooleanInput;
    static ngAcceptInputType_noColon: BooleanInput;
    title?: string | TemplateRef<void>;
    size: 'small' | 'large';
    /** 列表项间距，单位为 `px` */
    gutter: number;
    layout: 'horizontal' | 'vertical';
    labelWidth?: number;
    /** 指定信息最多分几列展示，最终一行几列由 col 配置结合响应式规则决定 */
    col: number;
    default: boolean;
    noColon: boolean;
    constructor(configSrv: YunzaiConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SVContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SVContainerComponent, "sv-container, [sv-container]", ["svContainer"], { "title": "title"; "size": "size"; "gutter": "gutter"; "layout": "layout"; "labelWidth": "labelWidth"; "col": "col"; "default": "default"; "noColon": "noColon"; }, {}, never, ["*"]>;
}
export declare class SVTitleComponent implements OnInit {
    private parent;
    private ren;
    private el;
    constructor(el: ElementRef, parent: SVContainerComponent, ren: Renderer2);
    private setClass;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SVTitleComponent, [null, { optional: true; host: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SVTitleComponent, "sv-title, [sv-title]", ["svTitle"], {}, {}, never, ["*"]>;
}
