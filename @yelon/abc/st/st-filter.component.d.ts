import { EventEmitter } from '@angular/core';
import { LocaleData } from '@yelon/theme';
import { STColumnFilter, STColumnFilterMenu, STIcon } from './st.interfaces';
import { _STColumn } from './st.types';
import * as i0 from "@angular/core";
export declare class STFilterComponent {
    visible: boolean;
    col: _STColumn;
    locale: LocaleData;
    f: STColumnFilter;
    readonly n: EventEmitter<unknown>;
    readonly handle: EventEmitter<boolean>;
    get icon(): STIcon;
    show($event: MouseEvent): void;
    checkboxChange(): void;
    radioChange(item: STColumnFilterMenu): void;
    confirm(): void;
    reset(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<STFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<STFilterComponent, "st-filter", never, { "col": "col"; "locale": "locale"; "f": "f"; }, { "n": "n"; "handle": "handle"; }, never, never>;
}
