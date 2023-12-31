import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { ResponsiveService } from '@yelon/theme';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import { SEContainerComponent } from './se-container.component';
import { SEErrorType } from './se.types';
import * as i0 from "@angular/core";
export declare class SEComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
    private parent;
    private rep;
    private ren;
    private cdr;
    static ngAcceptInputType_col: NumberInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_line: BooleanInput;
    static ngAcceptInputType_labelWidth: NumberInput;
    static ngAcceptInputType_noColon: BooleanInput;
    static ngAcceptInputType_hideLabel: BooleanInput;
    private el;
    private destroy$;
    private readonly ngModel?;
    private readonly formControlName?;
    private readonly contentElement;
    private clsMap;
    private inited;
    private onceFlag;
    private errorData;
    private isBindModel;
    invalid: boolean;
    _labelWidth: number | null;
    _noColon: boolean | null;
    _error?: string | TemplateRef<void>;
    optional?: string | TemplateRef<void> | null;
    optionalHelp?: string | TemplateRef<void> | null;
    optionalHelpColor?: string;
    set error(val: SEErrorType);
    extra?: string | TemplateRef<void> | null;
    label?: string | TemplateRef<void> | null;
    col?: number | null;
    required: boolean;
    controlClass?: string | null;
    line?: boolean | null;
    labelWidth?: number | null;
    noColon?: boolean | null;
    hideLabel: boolean;
    set id(value: string);
    _id: string;
    _autoId: boolean;
    get paddingValue(): number;
    get showErr(): boolean;
    get compact(): boolean;
    private get ngControl();
    constructor(el: ElementRef, parent: SEContainerComponent, rep: ResponsiveService, ren: Renderer2, cdr: ChangeDetectorRef);
    private setClass;
    private bindModel;
    private updateStatus;
    checkContent(): void;
    ngAfterContentInit(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SEComponent, [null, { optional: true; host: true; }, null, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SEComponent, "se", ["se"], { "optional": "optional"; "optionalHelp": "optionalHelp"; "optionalHelpColor": "optionalHelpColor"; "error": "error"; "extra": "extra"; "label": "label"; "col": "col"; "required": "required"; "controlClass": "controlClass"; "line": "line"; "labelWidth": "labelWidth"; "noColon": "noColon"; "hideLabel": "hideLabel"; "id": "id"; }, {}, ["ngModel", "formControlName"], ["*"]>;
}
