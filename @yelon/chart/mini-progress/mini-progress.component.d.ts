import { ChangeDetectorRef, OnChanges } from '@angular/core';
import { YelonLocaleService } from '@yelon/theme';
import { NumberInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class G2MiniProgressComponent implements OnChanges {
    i18n: YelonLocaleService;
    private cdr;
    static ngAcceptInputType_target: NumberInput;
    static ngAcceptInputType_percent: NumberInput;
    static ngAcceptInputType_strokeWidth: NumberInput;
    color: string;
    target?: number | null;
    percent?: number | null;
    strokeWidth?: number | null;
    constructor(i18n: YelonLocaleService, cdr: ChangeDetectorRef);
    private fixNum;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2MiniProgressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2MiniProgressComponent, "g2-mini-progress", ["g2MiniProgress"], { "color": "color"; "target": "target"; "percent": "percent"; "strokeWidth": "strokeWidth"; }, {}, never, never>;
}
