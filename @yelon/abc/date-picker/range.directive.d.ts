import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { YunzaiConfigService, YunzaiDateRangePickerShortcut } from '@yelon/util/config';
import * as i0 from "@angular/core";
export declare class RangePickerDirective implements OnDestroy, AfterViewInit {
    static ngAcceptInputType_shortcut: YunzaiDateRangePickerShortcut | string | null;
    private readonly dom;
    private readonly vcr;
    private readonly nativeComp;
    private defaultShortcuts;
    private _shortcut;
    private shortcutFactory;
    start: Date | null;
    end: Date | null;
    set shortcut(val: YunzaiDateRangePickerShortcut | null);
    get shortcut(): YunzaiDateRangePickerShortcut | null;
    ngModelEnd: any;
    readonly ngModelEndChange: EventEmitter<any>;
    private get dp();
    private get srv();
    constructor(configSrv: YunzaiConfigService);
    private cd;
    private overrideNative;
    private refreshShortcut;
    ngAfterViewInit(): void;
    private destoryShortcut;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RangePickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RangePickerDirective, "nz-range-picker[extend]", ["extendRangePicker"], { "shortcut": { "alias": "shortcut"; "required": false; }; "ngModelEnd": { "alias": "ngModelEnd"; "required": true; }; }, { "ngModelEndChange": "ngModelEndChange"; }, never, never, true, never>;
}
