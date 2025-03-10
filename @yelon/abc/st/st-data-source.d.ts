import { DecimalPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DatePipe, YNPipe, _HttpClient } from '@yelon/theme';
import type { YunzaiSTConfig } from '@yelon/util/config';
import { CurrencyService } from '@yelon/util/format';
import type { STColumn, STCustomRequestOptions, STData, STMultiSort, STMultiSortResultType, STOnCellResult, STPage, STReq, STRes, STRowClassName, STSingleSort, STStatisticalResults } from './st.interfaces';
import type { _STColumn, _STHeader } from './st.types';
import * as i0 from "@angular/core";
export interface STDataSourceOptions {
    pi: number;
    ps: number;
    paginator: boolean;
    data?: string | STData[] | Observable<STData[]>;
    total: number;
    req: STReq;
    res: STRes;
    page: STPage;
    columns: _STColumn[];
    headers: _STHeader[][];
    singleSort?: STSingleSort | null;
    multiSort?: STMultiSort;
    rowClassName?: STRowClassName | null;
    customRequest?: (options: STCustomRequestOptions) => Observable<any>;
}
export interface STDataSourceResult {
    /** 是否需要显示分页器 */
    pageShow: boolean;
    /** 新 `pi`，若返回 `undefined` 表示用户受控 */
    pi: number;
    /** 新 `ps`，若返回 `undefined` 表示用户受控 */
    ps: number;
    /** 新 `total`，若返回 `undefined` 表示用户受控 */
    total: number;
    /** 数据 */
    list: STData[];
    /** 统计数据 */
    statistical: STStatisticalResults;
}
export declare class STDataSource {
    private http;
    private datePipe;
    private ynPipe;
    private numberPipe;
    private currencySrv;
    private dom;
    private cog;
    private sortTick;
    constructor(http: _HttpClient, datePipe: DatePipe, ynPipe: YNPipe, numberPipe: DecimalPipe, currencySrv: CurrencyService, dom: DomSanitizer);
    setCog(val: YunzaiSTConfig): void;
    process(options: STDataSourceOptions): Observable<STDataSourceResult>;
    private get;
    private getByRemote;
    getCell(c: STColumn, item: STData, idx: number): STOnCellResult;
    optimizeData(options: {
        columns: _STColumn[];
        result: STData[];
        rowClassName?: STRowClassName | null;
    }): STData[];
    getNoIndex(item: STData, col: _STColumn, idx: number): number;
    private genButtons;
    private fixMaxMultiple;
    private getValidSort;
    private getSorterFn;
    get nextSortTick(): number;
    getReqSortMap(singleSort: STSingleSort | undefined | null, multiSort: STMultiSort | undefined, headers: _STHeader[][]): STMultiSortResultType;
    private getFilteredData;
    private getReqFilterMap;
    private genStatistical;
    private getStatistical;
    private toFixed;
    private getValues;
    private getSum;
    static ɵfac: i0.ɵɵFactoryDeclaration<STDataSource, [null, { host: true; }, { host: true; }, { host: true; }, null, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<STDataSource>;
}
