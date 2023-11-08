import { ChangeDetectorRef, OnChanges, TemplateRef } from '@angular/core';
import { BooleanInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class G2CardComponent implements OnChanges {
    private cdr;
    static ngAcceptInputType_bordered: BooleanInput;
    static ngAcceptInputType_loading: BooleanInput;
    /** 是否显示边框 */
    bordered: boolean;
    avatar?: string | TemplateRef<void> | null;
    title?: string | TemplateRef<void> | null;
    action?: string | TemplateRef<void> | null;
    total: string;
    _height: string;
    _orgHeight: number | string;
    set contentHeight(value: number | string);
    footer?: string | TemplateRef<void> | null;
    /** 是否显示Loading */
    loading: boolean;
    constructor(cdr: ChangeDetectorRef);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<G2CardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<G2CardComponent, "g2-card", ["g2Card"], { "bordered": { "alias": "bordered"; "required": false; }; "avatar": { "alias": "avatar"; "required": false; }; "title": { "alias": "title"; "required": false; }; "action": { "alias": "action"; "required": false; }; "total": { "alias": "total"; "required": false; }; "contentHeight": { "alias": "contentHeight"; "required": false; }; "footer": { "alias": "footer"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; }, {}, never, ["*"], false, never>;
}
