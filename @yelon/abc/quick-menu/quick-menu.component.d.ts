import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class QuickMenuComponent implements OnInit, OnChanges {
    private cdr;
    private el;
    private render;
    static ngAcceptInputType_top: NumberInput;
    static ngAcceptInputType_width: NumberInput;
    static ngAcceptInputType_expand: BooleanInput;
    constructor(cdr: ChangeDetectorRef, el: ElementRef, render: Renderer2);
    ctrlStyle: {
        [key: string]: string | undefined;
    };
    icon: string | TemplateRef<void>;
    top: number;
    width: number;
    bgColor?: string;
    borderColor?: string;
    expand: boolean;
    readonly expandChange: EventEmitter<boolean>;
    private show;
    private initFlag;
    _click(): void;
    private setStyle;
    ngOnInit(): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QuickMenuComponent, "quick-menu", ["quickMenu"], { "icon": { "alias": "icon"; "required": false; }; "top": { "alias": "top"; "required": false; }; "width": { "alias": "width"; "required": false; }; "bgColor": { "alias": "bgColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "expand": { "alias": "expand"; "required": false; }; }, { "expandChange": "expandChange"; }, never, ["*"], false, never>;
}
