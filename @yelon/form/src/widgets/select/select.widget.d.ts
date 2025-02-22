import { OnInit } from '@angular/core';
import { SFSelectWidgetSchema } from './schema';
import { SFValue } from '../../interface';
import { SFSchemaEnum } from '../../schema';
import { ControlUIWidget } from '../../widget';
import * as i0 from "@angular/core";
export declare class SelectWidget extends ControlUIWidget<SFSelectWidgetSchema> implements OnInit {
    private search$;
    i: SFSelectWidgetSchema;
    data: SFSchemaEnum[];
    _value: any;
    hasGroup: boolean;
    loading: boolean;
    private checkGroup;
    ngOnInit(): void;
    reset(value: SFValue): void;
    change(values: SFValue): void;
    private getOrgData;
    openChange(status: boolean): void;
    scrollToBottom(): void;
    onSearch(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectWidget, "sf-select", never, {}, {}, never, never, false, never>;
}
