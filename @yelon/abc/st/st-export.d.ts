import { XlsxExportResult } from '@yelon/abc/xlsx';
import { STExportOptions } from './st.interfaces';
import * as i0 from "@angular/core";
export declare class STExport {
    private readonly xlsxSrv;
    private _stGet;
    private genSheet;
    export(opt: STExportOptions): Promise<XlsxExportResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<STExport, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<STExport>;
}
