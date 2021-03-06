import { EventEmitter, TemplateRef } from '@angular/core';
import type { Event } from '@antv/g2';
import { G2BaseComponent } from '@yelon/chart/core';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export interface G2RadarData {
    name: string;
    label: string;
    value: number;
    [key: string]: NzSafeAny;
}
export interface G2RadarClickItem {
    item: G2RadarData;
    ev: Event;
}
export declare class G2RadarComponent extends G2BaseComponent {
    static ngAcceptInputType_height: NumberInput;
    static ngAcceptInputType_hasLegend: BooleanInput;
    static ngAcceptInputType_tickCount: NumberInput;
    legendData: NzSafeAny[];
    title?: string | TemplateRef<void> | null;
    height: number;
    padding: number | number[] | 'auto';
    hasLegend: boolean;
    tickCount: number;
    data: G2RadarData[];
    colors: string[];
    readonly clickItem: EventEmitter<G2RadarClickItem>;
    private getHeight;
    install(): void;
    changeData(): void;
    private genLegend;
    _click(i: number): void;
    onChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2RadarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2RadarComponent, "g2-radar", ["g2Radar"], { "title": "title"; "height": "height"; "padding": "padding"; "hasLegend": "hasLegend"; "tickCount": "tickCount"; "data": "data"; "colors": "colors"; }, { "clickItem": "clickItem"; }, never, never>;
}
