import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { YelonLocaleService, LocaleData } from '@yelon/theme';
import { BooleanInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class TagSelectComponent implements OnInit, OnDestroy {
    private i18n;
    private directionality;
    private cdr;
    static ngAcceptInputType_expandable: BooleanInput;
    private destroy$;
    locale: LocaleData;
    expand: boolean;
    dir: Direction;
    /** 是否启用 `展开与收进` */
    expandable: boolean;
    readonly change: EventEmitter<boolean>;
    constructor(i18n: YelonLocaleService, directionality: Directionality, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    trigger(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagSelectComponent, [null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TagSelectComponent, "tag-select", ["tagSelect"], { "expandable": "expandable"; }, { "change": "change"; }, never, ["*"]>;
}
