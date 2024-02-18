import { Observable } from 'rxjs';
import { ControlUIWidget, SFSchemaEnum, SFValue } from '@yelon/form';
import { NzAutocompleteOptionComponent } from 'ng-zorro-antd/auto-complete';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import type { SFAutoCompleteWidgetSchema } from './schema';
import * as i0 from "@angular/core";
export declare class AutoCompleteWidget extends ControlUIWidget<SFAutoCompleteWidgetSchema> {
    static readonly KEY = "autocomplete";
    i: NzSafeAny;
    list: Observable<SFSchemaEnum[]>;
    typing: string;
    private ngModel;
    private filterOption;
    private isAsync;
    private fixData;
    updateValue(item: NzAutocompleteOptionComponent): void;
    _setValue(item: SFSchemaEnum): void;
    afterViewInit(): void;
    reset(value: SFValue): void;
    private filterData;
    private addEmailSuffix;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoCompleteWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutoCompleteWidget, "sf-autocomplete", never, {}, {}, never, never, true, never>;
}
