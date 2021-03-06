import { EventEmitter } from '@angular/core';
import type { Event } from '@antv/g2';
import { G2BaseComponent } from '@yelon/chart/core';
import { NumberInput } from '@yelon/util/decorator';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export interface G2TagCloudData {
    value?: number;
    name?: string;
    [key: string]: NzSafeAny;
}
export interface G2TagCloudClickItem {
    item: G2TagCloudData;
    ev: Event;
}
export declare class G2TagCloudComponent extends G2BaseComponent {
    static ngAcceptInputType_height: NumberInput;
    static ngAcceptInputType_width: NumberInput;
    width: number;
    height: number;
    padding: number | number[] | 'auto';
    data: G2TagCloudData[];
    readonly clickItem: EventEmitter<G2TagCloudClickItem>;
    private initTagCloud;
    install(): void;
    changeData(): void;
    private installResizeEvent;
    onInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2TagCloudComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2TagCloudComponent, "g2-tag-cloud", ["g2TagCloud"], { "width": "width"; "height": "height"; "padding": "padding"; "data": "data"; }, { "clickItem": "clickItem"; }, never, never>;
}
