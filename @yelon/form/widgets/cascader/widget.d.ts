import { OnInit } from '@angular/core';
import { ControlUIWidget, SFSchemaEnum, SFValue } from '@yelon/form';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import type { SFCascaderWidgetSchema } from './schema';
import * as i0 from "@angular/core";
export declare class CascaderWidget extends ControlUIWidget<SFCascaderWidgetSchema> implements OnInit {
    static readonly KEY = "cascader";
    clearText: string;
    showArrow: boolean;
    showInput: boolean;
    triggerAction: string[];
    data: SFSchemaEnum[];
    loadData?: (node: NzCascaderOption, index: number) => PromiseLike<any>;
    ngOnInit(): void;
    reset(value: SFValue): void;
    _visibleChange(status: boolean): void;
    _change(value: any[] | null): void;
    _selectionChange(options: NzCascaderOption[]): void;
    _clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CascaderWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CascaderWidget, "sf-cascader", never, {}, {}, never, never, true, never>;
}
