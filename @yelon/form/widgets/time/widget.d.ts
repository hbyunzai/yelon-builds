import { OnInit } from '@angular/core';
import { ControlUIWidget, SFValue } from '@yelon/form';
import type { SFTimeWidgetSchema } from './schema';
import * as i0 from "@angular/core";
export declare class TimeWidget extends ControlUIWidget<SFTimeWidgetSchema> implements OnInit {
    static readonly KEY = "time";
    private valueFormat;
    displayValue: Date | null;
    i: any;
    ngOnInit(): void;
    reset(value: SFValue): void;
    _change(value: Date | null): void;
    _openChange(status: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeWidget, "sf-time", never, {}, {}, never, never, true, never>;
}
