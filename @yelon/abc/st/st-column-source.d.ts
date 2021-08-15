import { DomSanitizer } from '@angular/platform-browser';
import { ACLService } from '@yelon/acl';
import { YunzaiI18NService } from '@yelon/theme';
import { YunzaiSTConfig } from '@yelon/util/config';
import { STRowSource } from './st-row.directive';
import { STWidgetRegistry } from './st-widget';
import { STColumn, STColumnFilter, STColumnSafeType, STResizable, STWidthMode } from './st.interfaces';
import { _STColumn, _STHeader } from './st.types';
export interface STColumnSourceProcessOptions {
    widthMode: STWidthMode;
    resizable: STResizable;
    safeType: STColumnSafeType;
}
export declare class STColumnSource {
    private dom;
    private rowSource;
    private acl;
    private i18nSrv;
    private stWidgetRegistry;
    private cog;
    constructor(dom: DomSanitizer, rowSource: STRowSource, acl: ACLService, i18nSrv: YunzaiI18NService, stWidgetRegistry: STWidgetRegistry);
    setCog(val: YunzaiSTConfig): void;
    private fixPop;
    private btnCoerce;
    private btnCoerceIf;
    private fixedCoerce;
    private sortCoerce;
    private fixSortCoerce;
    private filterCoerce;
    private restoreRender;
    private widgetCoerce;
    private genHeaders;
    private cleanCond;
    process(list: STColumn[], options: STColumnSourceProcessOptions): {
        columns: _STColumn[];
        headers: _STHeader[][];
        headerWidths: string[] | null;
    };
    restoreAllRender(columns: _STColumn[]): void;
    updateDefault(filter: STColumnFilter): this;
    cleanFilter(col: _STColumn): this;
}
