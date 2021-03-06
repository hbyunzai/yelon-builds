import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChange, SimpleChanges, TemplateRef, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { YunzaiI18NService, YelonLocaleService, DrawerHelper, LocaleData, ModalHelper } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { BooleanInput, NumberInput } from '@yelon/util/decorator';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { STColumnSource } from './st-column-source';
import { STDataSource } from './st-data-source';
import { STExport } from './st-export';
import { STChange, STClickRowClassName, STColumn, STColumnButton, STColumnSelection, STContextmenuFn, STContextmenuItem, STCustomRequestOptions, STData, STError, STExportOptions, STLoadOptions, STPage, STReq, STRes, STResetColumnsOption, STResizable, STRowClassName, STSingleSort, STStatisticalResults, STWidthMode } from './st.interfaces';
import { _STColumn, _STHeader, _STTdNotify } from './st.types';
import * as i0 from "@angular/core";
export declare class STComponent implements AfterViewInit, OnChanges, OnDestroy {
    private cdr;
    private el;
    private exportSrv;
    private doc;
    private columnSource;
    private dataSource;
    private delonI18n;
    private cms;
    static ngAcceptInputType_ps: NumberInput;
    static ngAcceptInputType_pi: NumberInput;
    static ngAcceptInputType_total: NumberInput;
    static ngAcceptInputType_loadingDelay: NumberInput;
    static ngAcceptInputType_bordered: BooleanInput;
    static ngAcceptInputType_expandRowByClick: BooleanInput;
    static ngAcceptInputType_expandAccordion: BooleanInput;
    static ngAcceptInputType_responsive: BooleanInput;
    static ngAcceptInputType_responsiveHideHeaderFooter: BooleanInput;
    static ngAcceptInputType_virtualScroll: BooleanInput;
    static ngAcceptInputType_virtualItemSize: NumberInput;
    static ngAcceptInputType_virtualMaxBufferPx: NumberInput;
    static ngAcceptInputType_virtualMinBufferPx: NumberInput;
    private destroy$;
    private data$?;
    private totalTpl;
    private cog;
    private _req;
    private _res;
    private _page;
    private _widthMode;
    private customWidthConfig;
    _widthConfig: string[];
    locale: LocaleData;
    _loading: boolean;
    _data: STData[];
    _statistical: STStatisticalResults;
    _isPagination: boolean;
    _allChecked: boolean;
    _allCheckedDisabled: boolean;
    _indeterminate: boolean;
    _headers: _STHeader[][];
    _columns: _STColumn[];
    contextmenuList: STContextmenuItem[];
    readonly orgTable: NzTableComponent<STData>;
    readonly contextmenuTpl: NzDropdownMenuComponent;
    get req(): STReq;
    set req(value: STReq);
    /** ??????????????? */
    get res(): STRes;
    set res(value: STRes);
    get page(): STPage;
    set page(value: STPage);
    data: string | STData[] | Observable<STData[]>;
    columns: STColumn[];
    contextmenu?: STContextmenuFn | null;
    ps: number;
    pi: number;
    total: number;
    loading: boolean | null;
    loadingDelay: number;
    loadingIndicator: TemplateRef<void> | null;
    bordered: boolean;
    size: 'small' | 'middle' | 'default';
    scroll: {
        x?: string | null;
        y?: string | null;
    };
    singleSort?: STSingleSort | null;
    private _multiSort?;
    get multiSort(): NzSafeAny;
    set multiSort(value: NzSafeAny);
    rowClassName?: STRowClassName | null;
    clickRowClassName?: STClickRowClassName | null;
    set widthMode(value: STWidthMode);
    get widthMode(): STWidthMode;
    set widthConfig(val: string[]);
    private _resizable?;
    set resizable(val: STResizable | boolean | string);
    header?: string | TemplateRef<void> | null;
    showHeader: boolean;
    footer?: string | TemplateRef<void> | null;
    bodyHeader?: TemplateRef<STStatisticalResults> | null;
    body?: TemplateRef<STStatisticalResults> | null;
    expandRowByClick: boolean;
    expandAccordion: boolean;
    expand: TemplateRef<{
        $implicit: NzSafeAny;
        column: STColumn;
    }> | null;
    noResult?: string | TemplateRef<void> | null;
    responsive: boolean;
    responsiveHideHeaderFooter?: boolean;
    readonly error: EventEmitter<STError>;
    readonly change: EventEmitter<STChange<any>>;
    virtualScroll: boolean;
    virtualItemSize: number;
    virtualMaxBufferPx: number;
    virtualMinBufferPx: number;
    customRequest?: (options: STCustomRequestOptions) => Observable<NzSafeAny>;
    virtualForTrackBy: TrackByFunction<STData>;
    /**
     * Get the number of the current page
     */
    get count(): number;
    /**
     * Get the data of the current page
     */
    get list(): STData[];
    constructor(i18nSrv: YunzaiI18NService, cdr: ChangeDetectorRef, el: ElementRef, exportSrv: STExport, doc: NzSafeAny, columnSource: STColumnSource, dataSource: STDataSource, delonI18n: YelonLocaleService, configSrv: YunzaiConfigService, cms: NzContextMenuService);
    private setCog;
    cd(): this;
    private refreshData;
    renderTotal(total: string, range: string[]): string;
    private changeEmit;
    /**
     * ???????????????????????????
     * - ??????????????????????????????????????????????????????
     * - ???????????????????????? `pi`???`ps` ????????????
     */
    get filteredData(): Promise<STData[]>;
    private updateTotalTpl;
    private setLoading;
    private loadData;
    private loadPageData;
    /** ?????????????????? */
    clear(cleanStatus?: boolean): this;
    /** ?????????????????? */
    clearStatus(): this;
    /**
     * ??????????????????????????????
     *
     * @param pi ??????????????????????????????`1`
     * @param extraParams ???????????? `extraParams` ???
     * @param options ??????
     */
    load(pi?: number, extraParams?: NzSafeAny, options?: STLoadOptions): this;
    /**
     * ?????????????????????
     *
     * @param extraParams ???????????? `extraParams` ???
     */
    reload(extraParams?: NzSafeAny, options?: STLoadOptions): this;
    /**
     * ????????????????????? `pi` ??? `1`?????????????????????
     * - `check` ??????
     * - `radio` ??????
     * - `sort` ??????
     * - `fileter` ??????
     *
     * @param extraParams ???????????? `extraParams` ???
     */
    reset(extraParams?: NzSafeAny, options?: STLoadOptions): this;
    private _toTop;
    _change(type: 'pi' | 'ps', options?: STLoadOptions): void;
    private closeOtherExpand;
    _rowClick(e: Event, item: STData, index: number, dbl: boolean): void;
    private _clickRowClassName;
    _expandChange(item: STData, expand: boolean): void;
    _stopPropagation(ev: Event): void;
    private _refColAndData;
    /**
     * Add a rows in the table, like this:
     *
     * ```
     * this.st.addRow(stDataItem)
     * ```
     *
     * **TIPS:** Don't change the `total` value, it is recommended to use the `reload` method if needed
     */
    addRow(data: STData | STData[], options?: {
        index?: number;
    }): this;
    /**
     * Remove a row in the table, like this:
     *
     * ```
     * this.st.removeRow(0)
     * this.st.removeRow(stDataItem)
     * ```
     *
     * **TIPS:** Don't change the `total` value, it is recommended to use the `reload` method if needed
     */
    removeRow(data: STData | STData[] | number): this;
    /**
     * Sets the row value for the `index` in the table, like this:
     *
     * - `optinos.refreshSchema` Whether to refresh of st schemas
     * - `optinos.emitReload` Whether to trigger a reload http request when data is url
     *
     * ```
     * this.st.setRow(0, { price: 100 })
     * this.st.setRow(0, { price: 100, name: 'asdf' })
     * this.st.setRow(item, { price: 100 })
     * ```
     */
    setRow(index: number | STData, item: STData, options?: {
        refreshSchema?: boolean;
        emitReload?: boolean;
    }): this;
    sort(col: _STColumn, idx: number, value: NzSafeAny): void;
    clearSort(): this;
    _handleFilter(col: _STColumn, confirm: boolean): void;
    handleFilterNotify(value?: unknown): void;
    clearFilter(): this;
    /** ???????????? `checkbox` */
    clearCheck(): this;
    private _refCheck;
    checkAll(checked?: boolean): this;
    _rowSelection(row: STColumnSelection): this;
    _checkNotify(): this;
    /** ???????????? `radio` */
    clearRadio(): this;
    _handleTd(ev: _STTdNotify): void;
    /**
     * ???????????????????????????????????? `XlsxModule`
     *
     * @param newData ??????????????????????????? `true` ???????????? `filteredData` ??????
     * @param opt ????????????
     */
    export(newData?: STData[] | true, opt?: STExportOptions): void;
    colResize({ width }: NzResizeEvent, column: _STColumn): void;
    onContextmenu(event: MouseEvent): void;
    get cdkVirtualScrollViewport(): CdkVirtualScrollViewport;
    resetColumns(options?: STResetColumnsOption): Promise<this>;
    private refreshColumns;
    private optimizeData;
    /**
     * Return pure data, `st` internally maintains a set of data for caching, this part of data may affect the backend
     *
     * ?????????????????????`st` ?????????????????????????????????????????????????????????????????????????????????
     */
    pureItem(itemOrIndex: STData | number): STData | null;
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [P in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    ngOnDestroy(): void;
    static ??fac: i0.????FactoryDeclaration<STComponent, [{ optional: true; }, null, null, null, null, null, null, null, null, null]>;
    static ??cmp: i0.????ComponentDeclaration<STComponent, "st", ["st"], { "req": "req"; "res": "res"; "page": "page"; "data": "data"; "columns": "columns"; "contextmenu": "contextmenu"; "ps": "ps"; "pi": "pi"; "total": "total"; "loading": "loading"; "loadingDelay": "loadingDelay"; "loadingIndicator": "loadingIndicator"; "bordered": "bordered"; "size": "size"; "scroll": "scroll"; "singleSort": "singleSort"; "multiSort": "multiSort"; "rowClassName": "rowClassName"; "clickRowClassName": "clickRowClassName"; "widthMode": "widthMode"; "widthConfig": "widthConfig"; "resizable": "resizable"; "header": "header"; "showHeader": "showHeader"; "footer": "footer"; "bodyHeader": "bodyHeader"; "body": "body"; "expandRowByClick": "expandRowByClick"; "expandAccordion": "expandAccordion"; "expand": "expand"; "noResult": "noResult"; "responsive": "responsive"; "responsiveHideHeaderFooter": "responsiveHideHeaderFooter"; "virtualScroll": "virtualScroll"; "virtualItemSize": "virtualItemSize"; "virtualMaxBufferPx": "virtualMaxBufferPx"; "virtualMinBufferPx": "virtualMinBufferPx"; "customRequest": "customRequest"; "virtualForTrackBy": "virtualForTrackBy"; }, { "error": "error"; "change": "change"; }, never, never>;
}
export declare class STTdComponent {
    private stComp;
    private router;
    private modalHelper;
    private drawerHelper;
    c: _STColumn;
    cIdx: number;
    data: STData[];
    i: STData;
    index: number;
    readonly n: EventEmitter<_STTdNotify>;
    private get routerState();
    constructor(stComp: STComponent, router: Router, modalHelper: ModalHelper, drawerHelper: DrawerHelper);
    private report;
    _checkbox(value: boolean): void;
    _radio(): void;
    _link(e: Event): boolean;
    _stopPropagation(ev: Event): void;
    _btn(btn: STColumnButton, ev?: Event): void;
    private btnCallback;
    static ??fac: i0.????FactoryDeclaration<STTdComponent, [{ host: true; }, null, null, null]>;
    static ??cmp: i0.????ComponentDeclaration<STTdComponent, "st-td", never, { "c": "c"; "cIdx": "cIdx"; "data": "data"; "i": "i"; "index": "index"; }, { "n": "n"; }, never, never>;
}
