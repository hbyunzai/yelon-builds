import { TemplateRef } from '@angular/core';
import { BooleanInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class GlobalFooterItemComponent {
    static ngAcceptInputType_blankTarget: BooleanInput;
    host: TemplateRef<void>;
    href?: string;
    blankTarget?: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalFooterItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlobalFooterItemComponent, "global-footer-item", ["globalFooterItem"], { "href": { "alias": "href"; "required": false; }; "blankTarget": { "alias": "blankTarget"; "required": false; }; }, {}, never, ["*"], false, never>;
}
