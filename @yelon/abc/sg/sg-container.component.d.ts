import { REP_TYPE } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { NumberInput } from '@yelon/util/decorator';
export declare class SGContainerComponent {
    static ngAcceptInputType_gutter: NumberInput;
    static ngAcceptInputType_colInCon: NumberInput;
    static ngAcceptInputType_col: NumberInput;
    gutter: number;
    colInCon: REP_TYPE;
    col: REP_TYPE;
    get marginValue(): number;
    constructor(configSrv: YunzaiConfigService);
}
