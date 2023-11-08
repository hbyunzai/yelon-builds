import { AfterViewInit, ElementRef, OnChanges, Renderer2, TemplateRef } from '@angular/core';
import { ResponsiveService } from '@yelon/theme';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import { SVContainerComponent } from './sv-container.component';
import * as i0 from "@angular/core";
export declare class SVComponent implements AfterViewInit, OnChanges {
    private el;
    parent: SVContainerComponent;
    private rep;
    private ren;
    static ngAcceptInputType_col: NumberInput;
    static ngAcceptInputType_default: BooleanInput;
    static ngAcceptInputType_noColon: BooleanInput;
    static ngAcceptInputType_hideLabel: BooleanInput;
    private conEl;
    private clsMap;
    _noColon: boolean;
    optional?: string | TemplateRef<void> | null;
    optionalHelp?: string | TemplateRef<void> | null;
    optionalHelpColor?: string;
    label?: string | TemplateRef<void> | null;
    unit?: string | TemplateRef<void> | null;
    col?: number | null;
    default?: boolean | null;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    noColon?: boolean | null;
    hideLabel: boolean;
    get paddingValue(): number | null;
    get labelWidth(): number | null | undefined;
    constructor(el: ElementRef<HTMLElement>, parent: SVContainerComponent, rep: ResponsiveService, ren: Renderer2);
    private setClass;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    checkContent(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SVComponent, [null, { optional: true; host: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SVComponent, "sv, [sv]", ["sv"], { "optional": { "alias": "optional"; "required": false; }; "optionalHelp": { "alias": "optionalHelp"; "required": false; }; "optionalHelpColor": { "alias": "optionalHelpColor"; "required": false; }; "label": { "alias": "label"; "required": false; }; "unit": { "alias": "unit"; "required": false; }; "col": { "alias": "col"; "required": false; }; "default": { "alias": "default"; "required": false; }; "type": { "alias": "type"; "required": false; }; "noColon": { "alias": "noColon"; "required": false; }; "hideLabel": { "alias": "hideLabel"; "required": false; }; }, {}, never, ["*"], false, never>;
}
