import { OnInit } from '@angular/core';
import { SFRateWidgetSchema } from './schema';
import { ControlUIWidget } from '../../widget';
import * as i0 from "@angular/core";
export declare class RateWidget extends ControlUIWidget<SFRateWidgetSchema> implements OnInit {
    count: number;
    allowHalf: boolean;
    allowClear: boolean;
    autoFocus: boolean;
    hasText: boolean;
    get text(): string;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RateWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RateWidget, "sf-rate", never, {}, {}, never, never, false, never>;
}
