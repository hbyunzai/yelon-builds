import { EventEmitter, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import type { SafeValue } from '@angular/platform-browser';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import type { CellOptions, CellTextResult, CellValue } from './cell.types';
import * as i0 from "@angular/core";
export declare class CellComponent implements OnChanges, OnDestroy {
    private readonly srv;
    private readonly router;
    private readonly cdr;
    private readonly renderer;
    private readonly imgSrv;
    private readonly win;
    private readonly el;
    private destroy$?;
    _text: string | SafeValue | string[] | number;
    _unit?: string;
    res?: CellTextResult;
    showDefault: boolean;
    value?: CellValue;
    readonly valueChange: EventEmitter<any>;
    options?: CellOptions;
    loading: boolean;
    disabled: boolean;
    get safeOpt(): CellOptions;
    get isText(): boolean;
    private updateValue;
    private setClass;
    ngOnChanges(changes: {
        [p in keyof CellComponent]?: SimpleChange;
    }): void;
    change(value: NzSafeAny): void;
    _link(e: Event): void;
    _showImg(img: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CellComponent, "cell, [cell]", ["cell"], { "value": { "alias": "value"; "required": false; }; "options": { "alias": "options"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_disabled: unknown;
}
