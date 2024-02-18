import { EventEmitter } from '@angular/core';
import type { Event } from '@antv/g2';
import { G2BaseComponent } from '@yelon/chart/core';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export interface G2MiniBarData {
    x: NzSafeAny;
    y: NzSafeAny;
    color?: string | null;
    [key: string]: NzSafeAny;
}
export interface G2MiniBarClickItem {
    item: G2MiniBarData;
    ev: Event;
}
export declare class G2MiniBarComponent extends G2BaseComponent {
    color: string;
    height: number;
    borderWidth: number;
    padding: number | number[] | 'auto';
    data: G2MiniBarData[];
    yTooltipSuffix: string;
    tooltipType: 'mini' | 'default';
    readonly clickItem: EventEmitter<G2MiniBarClickItem>;
    install(): void;
    changeData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2MiniBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2MiniBarComponent, "g2-mini-bar", ["g2MiniBar"], { "color": { "alias": "color"; "required": false; }; "height": { "alias": "height"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; "data": { "alias": "data"; "required": false; }; "yTooltipSuffix": { "alias": "yTooltipSuffix"; "required": false; }; "tooltipType": { "alias": "tooltipType"; "required": false; }; }, { "clickItem": "clickItem"; }, never, never, true, never>;
    static ngAcceptInputType_height: unknown;
    static ngAcceptInputType_borderWidth: unknown;
}
