import { SimpleChanges } from '@angular/core';
import { G2BaseComponent } from '@yelon/chart/core';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class G2SingleBarComponent extends G2BaseComponent {
    static ngAcceptInputType_height: NumberInput;
    static ngAcceptInputType_barSize: NumberInput;
    static ngAcceptInputType_min: NumberInput;
    static ngAcceptInputType_max: NumberInput;
    static ngAcceptInputType_value: NumberInput;
    static ngAcceptInputType_line: BooleanInput;
    plusColor: string;
    minusColor: string;
    height: number;
    barSize: number;
    min: number;
    max: number;
    value: number;
    line: boolean;
    format?: (value: number, item: NzSafeAny, index: number) => string;
    padding: number | number[] | 'auto';
    textStyle: {
        [key: string]: NzSafeAny;
    };
    install(): void;
    onlyChangeData: (changes: SimpleChanges) => boolean;
    changeData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2SingleBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2SingleBarComponent, "g2-single-bar", ["g2SingleBar"], { "plusColor": "plusColor"; "minusColor": "minusColor"; "height": "height"; "barSize": "barSize"; "min": "min"; "max": "max"; "value": "value"; "line": "line"; "format": "format"; "padding": "padding"; "textStyle": "textStyle"; }, {}, never, never>;
}
