import * as i0 from '@angular/core';
import { OnDestroy, AfterViewInit, EventEmitter, TemplateRef } from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/forms';
import * as i3 from 'ng-zorro-antd/date-picker';
import { YunzaiDateRangePickerShortcut, YunzaiDateRangePickerShortcutItem } from '@yelon/util/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

declare class RangePickerDirective implements OnDestroy, AfterViewInit {
    static ngAcceptInputType_shortcut: YunzaiDateRangePickerShortcut | string | null;
    private readonly dom;
    private readonly vcr;
    private readonly nativeComp;
    private readonly cogSrv;
    private defaultShortcuts;
    private _shortcut;
    private shortcutFactory;
    start: Date | null;
    end: Date | null;
    set shortcut(val: YunzaiDateRangePickerShortcut | null);
    get shortcut(): YunzaiDateRangePickerShortcut | null;
    ngModelEnd: NzSafeAny;
    readonly ngModelEndChange: EventEmitter<any>;
    private get dp();
    private get srv();
    constructor();
    private cd;
    private overrideNative;
    private refreshShortcut;
    ngAfterViewInit(): void;
    private destoryShortcut;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RangePickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RangePickerDirective, "nz-range-picker[extend]", ["extendRangePicker"], { "shortcut": { "alias": "shortcut"; "required": false; }; "ngModelEnd": { "alias": "ngModelEnd"; "required": true; }; }, { "ngModelEndChange": "ngModelEndChange"; }, never, never, true, never>;
}

declare class RangePickerShortcutTplComponent {
    readonly tpl: TemplateRef<void>;
    list: YunzaiDateRangePickerShortcutItem[];
    click(_: YunzaiDateRangePickerShortcutItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RangePickerShortcutTplComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RangePickerShortcutTplComponent, "ng-component", never, {}, {}, never, never, true, never>;
}

declare class DatePickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DatePickerModule, never, [typeof i1.CommonModule, typeof i2.FormsModule, typeof i3.NzDatePickerModule, typeof RangePickerDirective, typeof RangePickerShortcutTplComponent], [typeof RangePickerDirective, typeof RangePickerShortcutTplComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DatePickerModule>;
}

export { DatePickerModule, RangePickerDirective, RangePickerShortcutTplComponent };
