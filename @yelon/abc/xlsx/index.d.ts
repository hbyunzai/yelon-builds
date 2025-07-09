import * as i0 from '@angular/core';

interface XlsxExportOptions {
    /**
     * worksheets in the workbook, e.g:
     * - `{ Sheet1: { A1: { t:"n", v:10000 } } }`
     * - `[['1'], [1]]`
     */
    sheets: Record<string, any> | XlsxExportSheet[];
    /** File format, default: `xlsx` */
    format?: 'csv' | 'xlsx';
    /** save file name, default: `export.xlsx` */
    filename?: string;
    /** See [Writing Options](https://github.com/SheetJS/sheetjs/blob/master/docbits/81_writeopts.md) */
    opts?: any;
    /** triggers when saveas */
    callback?: (wb: any) => void;
}
interface XlsxExportSheet {
    /** arrays to a worksheet */
    data: any[][];
    /** sheet name */
    name?: string;
}
interface XlsxExportResult {
    filename: string;
    wb: any;
}

declare class XlsxService {
    private readonly http;
    private readonly lazy;
    private readonly ngZone;
    private readonly cogSrv;
    private cog;
    constructor();
    private init;
    private read;
    /**
     * 导入Excel并输出JSON，支持 `<input type="file">`、URL 形式
     */
    import(fileOrUrl: File | string): Promise<Record<string, any[][]>>;
    export(options: XlsxExportOptions): Promise<XlsxExportResult>;
    /**
     * 数据转符号名
     * - `1` => `A`
     * - `27` => `AA`
     * - `703` => `AAA`
     */
    numberToSchema(val: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<XlsxService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<XlsxService>;
}

declare class XlsxDirective {
    private readonly srv;
    data: XlsxExportOptions;
    _click(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<XlsxDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<XlsxDirective, "[xlsx]", ["xlsx"], { "data": { "alias": "xlsx"; "required": false; }; }, {}, never, never, true, never>;
}

declare class XlsxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<XlsxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<XlsxModule, never, [typeof XlsxDirective], [typeof XlsxDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<XlsxModule>;
}

export { XlsxDirective, XlsxModule, XlsxService };
export type { XlsxExportOptions, XlsxExportResult, XlsxExportSheet };
