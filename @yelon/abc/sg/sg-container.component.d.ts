import type { REP_TYPE } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { NumberInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class SGContainerComponent {
    static ngAcceptInputType_gutter: NumberInput;
    static ngAcceptInputType_colInCon: NumberInput;
    static ngAcceptInputType_col: NumberInput;
    gutter: number;
    colInCon?: REP_TYPE;
    col: REP_TYPE;
    get marginValue(): number;
    constructor(configSrv: YunzaiConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SGContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SGContainerComponent, "sg-container, [sg-container]", ["sgContainer"], { "gutter": { "alias": "gutter"; "required": false; }; "colInCon": { "alias": "sg-container"; "required": false; }; "col": { "alias": "col"; "required": false; }; }, {}, never, ["*"], false, never>;
}
