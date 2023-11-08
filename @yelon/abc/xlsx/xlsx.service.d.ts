import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import { LazyService } from '@yelon/util/other';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { XlsxExportOptions, XlsxExportResult } from './xlsx.types';
import * as i0 from "@angular/core";
export declare class XlsxService {
    private http;
    private lazy;
    private ngZone;
    constructor(http: HttpClient, lazy: LazyService, configSrv: YunzaiConfigService, ngZone: NgZone);
    private cog;
    private init;
    private read;
    /**
     * 导入Excel并输出JSON，支持 `<input type="file">`、URL 形式
     */
    import(fileOrUrl: File | string): Promise<{
        [key: string]: NzSafeAny[][];
    }>;
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
