import * as i0 from '@angular/core';
import { TemplateRef, EventEmitter, SimpleChanges } from '@angular/core';
import { Event } from '@antv/g2';
import { G2Time, G2BaseComponent } from '@yelon/chart/core';
import * as i1 from '@angular/common';
import * as i2 from 'ng-zorro-antd/core/outlet';
import * as i3 from 'ng-zorro-antd/skeleton';

/**
 * 数据
 *
 * 注：根据 `maxAxis` 值传递指标数据
 */
interface G2TimelineData {
    /**
     * 时间值
     */
    time?: G2Time;
    /** 指标1数据 */
    y1: number;
    /** 指标2数据 */
    y2?: number;
    /** 指标3数据 */
    y3?: number;
    /** 指标4数据 */
    y4?: number;
    /** 指标5数据 */
    y5?: number;
    [key: string]: any;
}
interface G2TimelineMap {
    /** 指标1 */
    y1: string;
    /** 指标 */
    y2?: string;
    /** 指标3 */
    y3?: string;
    /** 指标4 */
    y4?: string;
    /** 指标5 */
    y5?: string;
    [key: string]: string | undefined;
}
interface G2TimelineClickItem {
    item: G2TimelineData;
    ev: Event;
}
declare class G2TimelineComponent extends G2BaseComponent {
    title?: string | TemplateRef<void> | null;
    maxAxis: number;
    data: G2TimelineData[];
    titleMap?: G2TimelineMap | null;
    colorMap: G2TimelineMap;
    mask: string;
    maskSlider: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    height: number;
    padding: number[];
    borderWidth: number;
    slider: boolean;
    readonly clickItem: EventEmitter<G2TimelineClickItem>;
    onlyChangeData: (changes: SimpleChanges) => boolean;
    install(): void;
    changeData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2TimelineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2TimelineComponent, "g2-timeline", ["g2Timeline"], { "title": { "alias": "title"; "required": false; }; "maxAxis": { "alias": "maxAxis"; "required": false; }; "data": { "alias": "data"; "required": false; }; "titleMap": { "alias": "titleMap"; "required": false; }; "colorMap": { "alias": "colorMap"; "required": false; }; "mask": { "alias": "mask"; "required": false; }; "maskSlider": { "alias": "maskSlider"; "required": false; }; "position": { "alias": "position"; "required": false; }; "height": { "alias": "height"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "slider": { "alias": "slider"; "required": false; }; }, { "clickItem": "clickItem"; }, never, never, true, never>;
    static ngAcceptInputType_maxAxis: unknown;
    static ngAcceptInputType_height: unknown;
    static ngAcceptInputType_borderWidth: unknown;
    static ngAcceptInputType_slider: unknown;
}

declare class G2TimelineModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<G2TimelineModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<G2TimelineModule, never, [typeof i1.CommonModule, typeof i2.NzOutletModule, typeof i3.NzSkeletonModule, typeof G2TimelineComponent], [typeof G2TimelineComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<G2TimelineModule>;
}

export { G2TimelineComponent, G2TimelineModule };
export type { G2TimelineClickItem, G2TimelineData, G2TimelineMap };
