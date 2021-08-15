import { EventEmitter } from '@angular/core';
import type { Event } from '@antv/g2';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { G2BaseComponent } from '@yelon/chart/core';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
export interface G2MiniAreaData {
    x: NzSafeAny;
    y: NzSafeAny;
    color?: string | null;
    [key: string]: NzSafeAny;
}
export interface G2MiniAreaClickItem {
    item: G2MiniAreaData;
    ev: Event;
}
export declare class G2MiniAreaComponent extends G2BaseComponent {
    static ngAcceptInputType_borderWidth: NumberInput;
    static ngAcceptInputType_height: NumberInput;
    static ngAcceptInputType_fit: BooleanInput;
    static ngAcceptInputType_line: BooleanInput;
    static ngAcceptInputType_animate: BooleanInput;
    color: string;
    borderColor: string;
    borderWidth: number;
    height: number;
    fit: boolean;
    line: boolean;
    animate: boolean;
    xAxis: NzSafeAny;
    yAxis: NzSafeAny;
    padding: number | number[] | 'auto';
    data: G2MiniAreaData[];
    yTooltipSuffix: string;
    tooltipType: 'mini' | 'default';
    readonly clickItem: EventEmitter<G2MiniAreaClickItem>;
    install(): void;
    changeData(): void;
}
