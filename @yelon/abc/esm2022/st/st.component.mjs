import { DecimalPipe, DOCUMENT } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, EventEmitter, inject, Input, numberAttribute, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { isObservable, of, filter, catchError, map, finalize, throwError, lastValueFrom } from 'rxjs';
import { YUNZAI_I18N_TOKEN, DatePipe, YelonLocaleService, DrawerHelper, ModalHelper, YNPipe } from '@yelon/theme';
import { deepCopy, deepMergeKey } from '@yelon/util/other';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { STColumnSource } from './st-column-source';
import { STDataSource } from './st-data-source';
import { STExport } from './st-export';
import { STRowSource } from './st-row.directive';
import { ST_DEFAULT_CONFIG } from './st.config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@yelon/abc/let";
import * as i5 from "ng-zorro-antd/table";
import * as i6 from "ng-zorro-antd/icon";
import * as i7 from "ng-zorro-antd/checkbox";
import * as i8 from "ng-zorro-antd/menu";
import * as i9 from "ng-zorro-antd/dropdown";
import * as i10 from "ng-zorro-antd/tooltip";
import * as i11 from "ng-zorro-antd/resizable";
import * as i12 from "./st-filter.component";
import * as i13 from "@yelon/abc/cell";
import * as i14 from "ng-zorro-antd/popconfirm";
import * as i15 from "ng-zorro-antd/badge";
import * as i16 from "ng-zorro-antd/divider";
import * as i17 from "ng-zorro-antd/radio";
import * as i18 from "ng-zorro-antd/tag";
import * as i19 from "./st-widget-host.directive";
export class STComponent {
    get req() {
        return this._req;
    }
    set req(value) {
        this._req = deepMergeKey({}, true, this.cog.req, value);
    }
    /** 返回体配置 */
    get res() {
        return this._res;
    }
    set res(value) {
        const item = (this._res = deepMergeKey({}, true, this.cog.res, value));
        const reName = item.reName;
        if (typeof reName !== 'function') {
            if (!Array.isArray(reName.list))
                reName.list = reName.list.split('.');
            if (!Array.isArray(reName.total))
                reName.total = reName.total.split('.');
        }
        this._res = item;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = { ...this.cog.page, ...value };
        this.updateTotalTpl();
    }
    get multiSort() {
        return this._multiSort;
    }
    set multiSort(value) {
        if ((typeof value === 'boolean' && !booleanAttribute(value)) ||
            (typeof value === 'object' && Object.keys(value).length === 0)) {
            this._multiSort = undefined;
            return;
        }
        this._multiSort = {
            ...(typeof value === 'object' ? value : {})
        };
    }
    set widthMode(value) {
        this._widthMode = { ...this.cog.widthMode, ...value };
    }
    get widthMode() {
        return this._widthMode;
    }
    set widthConfig(val) {
        this._widthConfig = val;
        this.customWidthConfig = val && val.length > 0;
    }
    set resizable(val) {
        this._resizable = typeof val === 'object' ? val : { disabled: !booleanAttribute(val) };
    }
    /**
     * Get the number of the current page
     */
    get count() {
        return this._data.length;
    }
    /**
     * Get the data of the current page
     */
    get list() {
        return this._data;
    }
    get noColumns() {
        return this.columns == null;
    }
    constructor(configSrv) {
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN);
        this.el = inject(ElementRef).nativeElement;
        this.cdr = inject(ChangeDetectorRef);
        this.doc = inject(DOCUMENT);
        this.exportSrv = inject(STExport);
        this.columnSource = inject(STColumnSource);
        this.dataSource = inject(STDataSource);
        this.yelonI18n = inject(YelonLocaleService);
        this.cms = inject(NzContextMenuService, { optional: true });
        this.destroy$ = inject(DestroyRef);
        this.totalTpl = ``;
        this.inied = false;
        this.customWidthConfig = false;
        this._widthConfig = [];
        this.locale = {};
        this._loading = false;
        this._data = [];
        this._statistical = {};
        this._isPagination = true;
        this._allChecked = false;
        this._allCheckedDisabled = false;
        this._indeterminate = false;
        this._headers = [];
        this._columns = [];
        this.contextmenuList = [];
        this.ps = 10;
        this.pi = 1;
        this.total = 0;
        this.loading = null;
        this.loadingDelay = 0;
        this.loadingIndicator = null;
        this.bordered = false;
        this.scroll = { x: null, y: null };
        this.showHeader = true;
        this.expandRowByClick = false;
        this.expandAccordion = false;
        this.expand = null;
        this.expandIcon = null;
        this.responsive = true;
        this.error = new EventEmitter();
        this.change = new EventEmitter();
        this.virtualScroll = false;
        this.virtualItemSize = 54;
        this.virtualMaxBufferPx = 200;
        this.virtualMinBufferPx = 100;
        this.virtualForTrackBy = index => index;
        this.trackBy = (_, item) => item;
        this.yelonI18n.change.pipe(takeUntilDestroyed()).subscribe(() => {
            this.locale = this.yelonI18n.getData('st');
            if (this._columns.length > 0) {
                this.updateTotalTpl();
                this.cd();
            }
        });
        this.i18nSrv.change
            .pipe(takeUntilDestroyed(), filter(() => this._columns.length > 0))
            .subscribe(() => this.refreshColumns());
        this.setCog(configSrv.merge('st', ST_DEFAULT_CONFIG));
    }
    setCog(cog) {
        const copyMultiSort = { ...cog.multiSort };
        // Because multiSort.global will affect the result, it should be removed first, and multiSort will be operated again after processing.
        delete cog.multiSort;
        this.cog = cog;
        Object.assign(this, cog);
        if (copyMultiSort.global !== false) {
            this.multiSort = copyMultiSort;
        }
        this.columnSource.setCog(cog);
        this.dataSource.setCog(cog);
    }
    cd() {
        this.cdr.detectChanges();
        return this;
    }
    refreshData() {
        this._data = [...this._data];
        return this.cd();
    }
    renderTotal(total, range) {
        return this.totalTpl
            ? this.totalTpl.replace('{{total}}', total).replace('{{range[0]}}', range[0]).replace('{{range[1]}}', range[1])
            : '';
    }
    changeEmit(type, data) {
        const res = {
            type,
            pi: this.pi,
            ps: this.ps,
            total: this.total
        };
        if (data != null) {
            res[type] = data;
        }
        this.change.emit(res);
    }
    // #region data
    /**
     * 获取过滤后所有数据
     * - 本地数据：包含排序、过滤后不分页数据
     * - 远程数据：不传递 `pi`、`ps` 两个参数
     */
    get filteredData() {
        return this.loadData({ paginator: false }).pipe(map(res => res.list));
    }
    updateTotalTpl() {
        const { total } = this.page;
        if (typeof total === 'string' && total.length) {
            this.totalTpl = total;
        }
        else if (booleanAttribute(total)) {
            this.totalTpl = this.locale.total;
        }
        else {
            this.totalTpl = '';
        }
    }
    setLoading(val) {
        if (this.loading == null) {
            this._loading = val;
            this.cdr.detectChanges();
        }
    }
    loadData(options) {
        const { pi, ps, data, req, res, page, total, singleSort, multiSort, rowClassName, _columns, _headers } = this;
        return this.dataSource
            .process({
            pi,
            ps,
            total,
            data,
            req,
            res,
            page,
            columns: _columns,
            headers: _headers,
            singleSort,
            multiSort,
            rowClassName,
            paginator: true,
            customRequest: this.customRequest || this.cog.customRequest,
            ...options
        })
            .pipe(takeUntilDestroyed(this.destroy$));
    }
    loadPageData() {
        this.setLoading(true);
        return this.loadData().pipe(finalize(() => this.setLoading(false)), catchError(error => {
            this.error.emit({ type: 'req', error });
            return throwError(() => error);
        }), map(result => {
            const undefinedString = 'undefined';
            if (typeof result.pi !== undefinedString) {
                this.pi = result.pi;
            }
            if (typeof result.ps !== undefinedString) {
                this.ps = result.ps;
            }
            if (typeof result.total !== undefinedString) {
                this.total = result.total;
            }
            if (typeof result.pageShow !== undefinedString) {
                this._isPagination = result.pageShow;
            }
            this._data = result.list ?? [];
            this._statistical = result.statistical;
            // Should be re-render in next tike when using virtual scroll
            if (this.cdkVirtualScrollViewport != null) {
                Promise.resolve().then(() => this.cdkVirtualScrollViewport?.checkViewportSize());
            }
            this._refCheck();
            this.changeEmit('loaded', result.list);
            return this;
        }));
    }
    /** 清空所有数据 */
    clear(cleanStatus = true) {
        if (cleanStatus) {
            this.clearStatus();
        }
        this._data = [];
        return this.cd();
    }
    /** 清空所有状态 */
    clearStatus() {
        return this.clearCheck().clearRadio().clearFilter().clearSort();
    }
    /**
     * 根据页码重新加载数据
     *
     * @param pi 指定当前页码，默认：`1`
     * @param extraParams 重新指定 `extraParams` 值
     * @param options 选项
     */
    load(pi = 1, extraParams, options) {
        if (pi !== -1)
            this.pi = pi;
        if (typeof extraParams !== 'undefined') {
            this.req.params = options && options.merge ? { ...this.req.params, ...extraParams } : extraParams;
        }
        this._change('pi', options);
        return this;
    }
    /**
     * 重新刷新当前页
     *
     * @param extraParams 重新指定 `extraParams` 值
     */
    reload(extraParams, options) {
        return this.load(-1, extraParams, options);
    }
    /**
     * 重置且重新设置 `pi` 为 `1`，包含以下值：
     * - `check` 数据
     * - `radio` 数据
     * - `sort` 数据
     * - `fileter` 数据
     *
     * @param extraParams 重新指定 `extraParams` 值
     */
    reset(extraParams, options) {
        this.clearStatus().load(1, extraParams, options);
        return this;
    }
    _toTop(enforce) {
        if (!(enforce == null ? this.page.toTop : enforce))
            return;
        const el = this.el;
        el.scrollIntoView();
        // fix header height
        this.doc.documentElement.scrollTop -= this.page.toTopOffset;
        if (this.scroll) {
            if (this.cdkVirtualScrollViewport) {
                this.cdkVirtualScrollViewport.scrollTo({
                    top: 0,
                    left: 0
                });
            }
            else {
                el.querySelector('.ant-table-body, .ant-table-content')?.scrollTo(0, 0);
            }
        }
    }
    _change(type, options) {
        if (type === 'pi' || (type === 'ps' && this.pi <= Math.ceil(this.total / this.ps))) {
            this.loadPageData().subscribe(() => this._toTop(options?.toTop));
        }
        this.changeEmit(type);
    }
    closeOtherExpand(item) {
        if (this.expandAccordion === false)
            return;
        this._data.filter(i => i !== item).forEach(i => (i.expand = false));
    }
    _rowClick(e, item, index, dbl) {
        const el = e.target;
        if (el.nodeName === 'INPUT')
            return;
        const { expand, expandRowByClick } = this;
        if (!!expand && item.showExpand !== false && expandRowByClick) {
            item.expand = !item.expand;
            this.closeOtherExpand(item);
            this.changeEmit('expand', item);
            return;
        }
        const data = { e, item, index };
        if (dbl) {
            this.changeEmit('dblClick', data);
        }
        else {
            this._clickRowClassName(el, item, index);
            this.changeEmit('click', data);
        }
    }
    _clickRowClassName(el, item, index) {
        const cr = this.clickRowClassName;
        if (cr == null)
            return;
        const config = {
            exclusive: false,
            ...(typeof cr === 'string' ? { fn: () => cr } : cr)
        };
        const className = config.fn(item, index);
        const trEl = el.closest('tr');
        if (config.exclusive) {
            trEl.parentElement.querySelectorAll('tr').forEach((a) => a.classList.remove(className));
        }
        if (trEl.classList.contains(className)) {
            trEl.classList.remove(className);
        }
        else {
            trEl.classList.add(className);
        }
    }
    _expandChange(item, expand) {
        item.expand = expand;
        this.closeOtherExpand(item);
        this.changeEmit('expand', item);
    }
    _stopPropagation(ev) {
        ev.stopPropagation();
    }
    _refColAndData() {
        this._columns.forEach(c => {
            this._data.forEach((i, idx) => {
                const values = i._values;
                if (c.type === 'no') {
                    const text = `${this.dataSource.getNoIndex(i, c, idx)}`;
                    values[c.__point] = {
                        text,
                        _text: text,
                        org: idx,
                        safeType: 'text'
                    };
                }
                values[c.__point].props = this.dataSource.getCell(c, i, idx);
            });
        });
        return this.refreshData();
    }
    /**
     * Add a rows in the table, like this:
     *
     * ```
     * this.st.addRow(stDataItem)
     * ```
     *
     * **TIPS:** Don't change the `total` value, it is recommended to use the `reload` method if needed
     */
    addRow(data, options) {
        if (!Array.isArray(data))
            data = [data];
        this._data.splice(options?.index ?? 0, 0, ...data);
        return this.optimizeData()._refColAndData();
    }
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
    removeRow(data) {
        if (typeof data === 'number') {
            this._data.splice(data, 1);
        }
        else {
            if (!Array.isArray(data)) {
                data = [data];
            }
            const curData = this._data;
            for (var i = curData.length; i--;) {
                if (data.indexOf(curData[i]) !== -1) {
                    curData.splice(i, 1);
                }
            }
        }
        return this._refCheck()._refColAndData();
    }
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
    setRow(index, item, options) {
        options = { refreshSchema: false, emitReload: false, ...options };
        if (typeof index !== 'number') {
            index = this._data.indexOf(index);
        }
        this._data[index] = deepMergeKey(this._data[index], false, item);
        this.optimizeData();
        if (options.refreshSchema) {
            this.resetColumns({ emitReload: options.emitReload });
            return this;
        }
        return this.refreshData();
    }
    // #endregion
    // #region sort
    sort(col, value) {
        if (this.multiSort) {
            col._sort.default = value;
            col._sort.tick = this.dataSource.nextSortTick;
        }
        else {
            this._headers.forEach(row => {
                row.forEach(item => (item.column._sort.default = item.column === col ? value : null));
            });
        }
        this.cdr.detectChanges();
        this.loadPageData().subscribe(() => {
            const res = {
                value,
                map: this.dataSource.getReqSortMap(this.singleSort, this.multiSort, this._headers),
                column: col
            };
            this.changeEmit('sort', res);
        });
    }
    clearSort() {
        this._headers.forEach(row => {
            row.forEach(item => (item.column._sort.default = null));
        });
        return this;
    }
    // #endregion
    // #region filter
    _handleFilter(col, confirm) {
        if (!confirm) {
            this.columnSource.cleanFilter(col);
        }
        // 过滤表示一种数据的变化应重置页码为 `1`
        this.pi = 1;
        this.columnSource.updateDefault(col.filter);
        this.loadPageData().subscribe(() => this.changeEmit('filter', col));
    }
    handleFilterNotify(value) {
        this.changeEmit('filterChange', value);
    }
    clearFilter() {
        this._columns.filter(w => w.filter && w.filter.default === true).forEach(col => this.columnSource.cleanFilter(col));
        return this;
    }
    // #endregion
    // #region checkbox
    /** 清除所有 `checkbox` */
    clearCheck() {
        return this.checkAll(false);
    }
    _refCheck() {
        const validData = this._data.filter(w => !w.disabled);
        const checkedList = validData.filter(w => w.checked === true);
        this._allChecked = checkedList.length > 0 && checkedList.length === validData.length;
        const allUnChecked = validData.every(value => !value.checked);
        this._indeterminate = !this._allChecked && !allUnChecked;
        this._allCheckedDisabled = this._data.length === this._data.filter(w => w.disabled).length;
        return this.cd();
    }
    checkAll(checked) {
        checked = typeof checked === 'undefined' ? this._allChecked : checked;
        this._data.filter(w => !w.disabled).forEach(i => (i.checked = checked));
        return this._refCheck()._checkNotify().refreshData();
    }
    _rowSelection(row) {
        row.select(this._data);
        return this._refCheck()._checkNotify();
    }
    _checkNotify() {
        const res = this._data.filter(w => !w.disabled && w.checked === true);
        this.changeEmit('checkbox', res);
        return this;
    }
    // #endregion
    // #region radio
    /** 清除所有 `radio` */
    clearRadio() {
        this._data.filter(w => w.checked).forEach(item => (item.checked = false));
        this.changeEmit('radio', null);
        return this.refreshData();
    }
    // #endregion
    _handleTd(ev) {
        switch (ev.type) {
            case 'checkbox':
                this._refCheck()._checkNotify();
                break;
            case 'radio':
                this.changeEmit('radio', ev.item);
                this.refreshData();
                break;
        }
    }
    // #region export
    /**
     * 导出当前页，确保已经注册 `XlsxModule`
     *
     * @param newData 重新指定数据；若为 `true` 表示使用 `filteredData` 数据
     * @param opt 额外参数
     */
    export(newData, opt) {
        const data = Array.isArray(newData)
            ? this.dataSource.optimizeData({ columns: this._columns, result: newData })
            : this._data;
        (newData === true ? this.filteredData : of(data)).subscribe((res) => this.exportSrv.export({
            columens: this._columns,
            ...opt,
            data: res
        }));
    }
    // #endregion
    // #region resizable
    colResize({ width }, column) {
        column.width = `${width}px`;
        this.changeEmit('resize', column);
    }
    // #endregion
    // #region contextmenu
    onContextmenu(event) {
        if (!this.contextmenu) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const colEl = event.target.closest('[data-col-index]');
        if (!colEl) {
            return;
        }
        const colIndex = Number(colEl.dataset.colIndex);
        const rowIndex = Number(colEl.closest('tr').dataset.index);
        const isTitle = isNaN(rowIndex);
        const obs$ = this.contextmenu({
            event,
            type: isTitle ? 'head' : 'body',
            rowIndex: isTitle ? null : rowIndex,
            colIndex,
            data: isTitle ? null : this.list[rowIndex],
            column: this._columns[colIndex]
        });
        (isObservable(obs$) ? obs$ : of(obs$))
            .pipe(takeUntilDestroyed(this.destroy$), filter(res => res.length > 0))
            .subscribe(res => {
            this.contextmenuList = res.map(i => {
                if (!Array.isArray(i.children)) {
                    i.children = [];
                }
                return i;
            });
            this.cdr.detectChanges();
            this.cms?.create(event, this.contextmenuTpl);
        });
    }
    // #endregion
    get cdkVirtualScrollViewport() {
        return this.orgTable?.cdkVirtualScrollViewport;
    }
    _resetColumns(options) {
        options = { emitReload: true, preClearData: false, ...options };
        if (typeof options.columns !== 'undefined') {
            this.columns = options.columns;
        }
        if (typeof options.pi !== 'undefined') {
            this.pi = options.pi;
        }
        if (typeof options.ps !== 'undefined') {
            this.ps = options.ps;
        }
        if (options.emitReload) {
            // Should clean data, Because of changing columns may cause inaccurate data
            options.preClearData = true;
        }
        if (options.preClearData) {
            this._data = [];
        }
        this.refreshColumns();
        if (options.emitReload) {
            return this.loadPageData();
        }
        else {
            this.cd();
            return of(this);
        }
    }
    resetColumns(options) {
        return lastValueFrom(this._resetColumns(options));
    }
    refreshColumns() {
        const res = this.columnSource.process(this.columns, {
            widthMode: this.widthMode,
            resizable: this._resizable,
            safeType: this.cog.safeType
        });
        this._columns = res.columns;
        this._headers = res.headers;
        if (this.customWidthConfig === false && res.headerWidths != null) {
            this._widthConfig = res.headerWidths;
        }
        return this;
    }
    optimizeData() {
        this._data = this.dataSource.optimizeData({
            columns: this._columns,
            result: this._data,
            rowClassName: this.rowClassName
        });
        return this;
    }
    /**
     * Return pure data, `st` internally maintains a set of data for caching, this part of data may affect the backend
     *
     * 返回纯净数据，`st` 内部会维护一组用于缓存的数据，这部分数据可能会影响后端
     */
    pureItem(itemOrIndex) {
        if (typeof itemOrIndex === 'number') {
            itemOrIndex = this._data[itemOrIndex];
        }
        if (!itemOrIndex) {
            return null;
        }
        const copyItem = deepCopy(itemOrIndex);
        ['_values', '_rowClassName'].forEach(key => delete copyItem[key]);
        return copyItem;
    }
    ngAfterViewInit() {
        this.refreshColumns();
        if (!this.req.lazyLoad)
            this.loadPageData().subscribe();
        this.inied = true;
    }
    ngOnChanges(changes) {
        if (changes.loading) {
            this._loading = changes.loading.currentValue;
        }
        if (!this.inied)
            return;
        if (changes.columns) {
            this.refreshColumns().optimizeData();
        }
        if (changes.data) {
            this.loadPageData().subscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: STComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.6", type: STComponent, selector: "st", inputs: { req: "req", res: "res", page: "page", data: "data", columns: "columns", contextmenu: "contextmenu", ps: ["ps", "ps", (v) => numberAttribute(v, 10)], pi: ["pi", "pi", (v) => numberAttribute(v, 1)], total: ["total", "total", (v) => numberAttribute(v, 0)], loading: "loading", loadingDelay: ["loadingDelay", "loadingDelay", numberAttribute], loadingIndicator: "loadingIndicator", bordered: ["bordered", "bordered", booleanAttribute], size: "size", scroll: "scroll", singleSort: "singleSort", multiSort: "multiSort", rowClassName: "rowClassName", clickRowClassName: "clickRowClassName", widthMode: "widthMode", widthConfig: "widthConfig", resizable: "resizable", header: "header", showHeader: ["showHeader", "showHeader", booleanAttribute], footer: "footer", bodyHeader: "bodyHeader", body: "body", expandRowByClick: ["expandRowByClick", "expandRowByClick", booleanAttribute], expandAccordion: ["expandAccordion", "expandAccordion", booleanAttribute], expand: "expand", expandIcon: "expandIcon", noResult: "noResult", responsive: ["responsive", "responsive", booleanAttribute], responsiveHideHeaderFooter: ["responsiveHideHeaderFooter", "responsiveHideHeaderFooter", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualItemSize: ["virtualItemSize", "virtualItemSize", numberAttribute], virtualMaxBufferPx: ["virtualMaxBufferPx", "virtualMaxBufferPx", numberAttribute], virtualMinBufferPx: ["virtualMinBufferPx", "virtualMinBufferPx", numberAttribute], customRequest: "customRequest", virtualForTrackBy: "virtualForTrackBy", trackBy: "trackBy" }, outputs: { error: "error", change: "change" }, host: { properties: { "class.st": "true", "class.st__p-left": "page.placement === 'left'", "class.st__p-center": "page.placement === 'center'", "class.st__width-strict": "widthMode.type === 'strict'", "class.st__row-class": "rowClassName", "class.ant-table-rep": "responsive", "class.ant-table-rep__hide-header-footer": "responsiveHideHeaderFooter" } }, providers: [STDataSource, STRowSource, STColumnSource, STExport, DatePipe, YNPipe, DecimalPipe], viewQueries: [{ propertyName: "orgTable", first: true, predicate: ["table"], descendants: true }, { propertyName: "contextmenuTpl", first: true, predicate: ["contextmenuTpl"], descendants: true }], exportAs: ["st"], usesOnChanges: true, ngImport: i0, template: "<ng-template #titleTpl let-i>\n  <span [innerHTML]=\"i._text\"></span>\n  @if (i.optional) {\n    <small class=\"st__head-optional\" [innerHTML]=\"i.optional\"></small>\n  }\n  @if (i.optionalHelp) {\n    <i class=\"st__head-tip\" nz-tooltip [nzTooltipTitle]=\"i.optionalHelp\" nz-icon nzType=\"question-circle\"></i>\n  }\n</ng-template>\n<ng-template #chkAllTpl let-custom>\n  <label\n    nz-checkbox\n    class=\"st__checkall\"\n    [nzDisabled]=\"_allCheckedDisabled\"\n    [(ngModel)]=\"_allChecked\"\n    [nzIndeterminate]=\"_indeterminate\"\n    (ngModelChange)=\"checkAll()\"\n    [class.ant-table-selection-select-all-custom]=\"custom\"\n  ></label>\n</ng-template>\n<nz-table\n  #table\n  [nzData]=\"_data\"\n  [(nzPageIndex)]=\"pi\"\n  (nzPageIndexChange)=\"_change('pi')\"\n  [(nzPageSize)]=\"ps\"\n  (nzPageSizeChange)=\"_change('ps')\"\n  [nzTotal]=\"total\"\n  [nzShowPagination]=\"_isPagination\"\n  [nzFrontPagination]=\"false\"\n  [nzBordered]=\"bordered\"\n  [nzSize]=\"size\"\n  [nzLoading]=\"noColumns || _loading\"\n  [nzLoadingDelay]=\"loadingDelay\"\n  [nzLoadingIndicator]=\"loadingIndicator\"\n  [nzTitle]=\"header!\"\n  [nzFooter]=\"footer!\"\n  [nzScroll]=\"scroll\"\n  [nzVirtualItemSize]=\"virtualItemSize\"\n  [nzVirtualMaxBufferPx]=\"virtualMaxBufferPx\"\n  [nzVirtualMinBufferPx]=\"virtualMinBufferPx\"\n  [nzVirtualForTrackBy]=\"virtualForTrackBy\"\n  [nzNoResult]=\"noResult!\"\n  [nzPageSizeOptions]=\"page.pageSizes!\"\n  [nzShowQuickJumper]=\"page.showQuickJumper\"\n  [nzShowSizeChanger]=\"page.showSize\"\n  [nzPaginationPosition]=\"page.position!\"\n  [nzPaginationType]=\"page.type!\"\n  [nzItemRender]=\"page.itemRender!\"\n  [nzSimple]=\"page.simple\"\n  [nzShowTotal]=\"totalTpl\"\n  [nzWidthConfig]=\"_widthConfig\"\n  (contextmenu)=\"onContextmenu($event)\"\n  [class.st__no-column]=\"noColumns\"\n>\n  @if (showHeader) {\n    <thead>\n      @for (row of _headers; track row) {\n        <tr>\n          @if ($first && expand) {\n            <th nzWidth=\"50px\" [rowSpan]=\"_headers.length\"></th>\n          }\n          @for (h of row; track h; let index = $index; let last = $last) {\n            <th\n              *let=\"h.column as _c\"\n              [colSpan]=\"h.colSpan\"\n              [rowSpan]=\"h.rowSpan\"\n              [nzWidth]=\"$any(_c).width\"\n              [nzLeft]=\"_c._left!\"\n              [nzRight]=\"_c._right!\"\n              [ngClass]=\"_c._className\"\n              [attr.data-col]=\"_c.indexKey\"\n              [attr.data-col-index]=\"index\"\n              [nzShowSort]=\"_c._sort.enabled\"\n              [nzSortOrder]=\"$any(_c)._sort.default\"\n              (nzSortOrderChange)=\"sort(_c, $event)\"\n              [nzCustomFilter]=\"!!_c.filter\"\n              [class.st__has-filter]=\"_c.filter\"\n              nz-resizable\n              [nzDisabled]=\"last || $any(_c).resizable.disabled\"\n              [nzMaxWidth]=\"$any(_c).resizable.maxWidth\"\n              [nzMinWidth]=\"$any(_c).resizable.minWidth\"\n              [nzBounds]=\"$any(_c).resizable.bounds\"\n              [nzPreview]=\"$any(_c).resizable.preview\"\n              (nzResizeEnd)=\"colResize($event, _c)\"\n            >\n              @if ($any(!last && !$any(_c).resizable.disabled)) {\n                <nz-resize-handle nzDirection=\"right\" (click)=\"_stopPropagation($event)\">\n                  <i></i>\n                </nz-resize-handle>\n              }\n              @if (_c.__renderTitle) {\n                <ng-template\n                  [ngTemplateOutlet]=\"_c.__renderTitle!\"\n                  [ngTemplateOutletContext]=\"{ $implicit: h.column, index: index }\"\n                />\n              } @else {\n                @switch (_c.type) {\n                  @case ('checkbox') {\n                    @if (_c.selections!.length === 0) {\n                      <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: false }\" />\n                    } @else {\n                      <div class=\"ant-table-selection\">\n                        <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: true }\" />\n                        @if (_c.selections!.length) {\n                          <div class=\"ant-table-selection-extra\">\n                            <div\n                              nz-dropdown\n                              nzPlacement=\"bottomLeft\"\n                              [nzDropdownMenu]=\"selectionMenu\"\n                              class=\"ant-table-selection-down st__checkall-selection\"\n                            >\n                              <i nz-icon nzType=\"down\"></i>\n                            </div>\n                          </div>\n                        }\n                        <nz-dropdown-menu #selectionMenu=\"nzDropdownMenu\">\n                          <ul nz-menu class=\"ant-table-selection-menu\">\n                            @for (rw of _c.selections; track $index) {\n                              <li nz-menu-item (click)=\"_rowSelection(rw)\" [innerHTML]=\"rw.text\"></li>\n                            }\n                          </ul>\n                        </nz-dropdown-menu>\n                      </div>\n                    }\n                  }\n                  @default {\n                    <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: _c.title }\" />\n                  }\n                }\n              }\n              @if (_c.filter) {\n                <st-filter\n                  nz-th-extra\n                  [col]=\"h.column\"\n                  [f]=\"_c.filter\"\n                  [locale]=\"locale\"\n                  (n)=\"handleFilterNotify($event)\"\n                  (handle)=\"_handleFilter(_c, $event)\"\n                />\n              }\n            </th>\n          }\n        </tr>\n      }\n    </thead>\n  }\n  <tbody class=\"st__body\">\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"bodyHeader!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n    <ng-template #bodyTpl let-i let-index=\"index\">\n      <tr\n        [attr.data-index]=\"index\"\n        (click)=\"_rowClick($event, i, index, false)\"\n        (dblclick)=\"_rowClick($event, i, index, true)\"\n        [ngClass]=\"i._rowClassName\"\n      >\n        @if (expand) {\n          <td\n            [nzShowExpand]=\"expand && i.showExpand !== false\"\n            [nzExpand]=\"i.expand\"\n            [nzExpandIcon]=\"expandIcon ? wrapExpandIcon : null\"\n            (nzExpandChange)=\"_expandChange(i, $event)\"\n            (click)=\"_stopPropagation($event)\"\n            nzWidth=\"50px\"\n          ></td>\n          <ng-template #wrapExpandIcon>\n            <span (click)=\"_expandChange(i, !i.expand)\">\n              <ng-template [ngTemplateOutlet]=\"expandIcon\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n            </span>\n          </ng-template>\n        }\n        @for (c of _columns; track cIdx; let cIdx = $index) {\n          @if (i._values[cIdx].props?.colSpan > 0 && i._values[cIdx].props?.rowSpan > 0) {\n            <td\n              [nzLeft]=\"!!c._left\"\n              [nzRight]=\"!!c._right\"\n              [attr.data-col-index]=\"cIdx\"\n              [ngClass]=\"c._className\"\n              [attr.colspan]=\"i._values[cIdx].props?.colSpan === 1 ? null : i._values[cIdx].props?.colSpan\"\n              [attr.rowspan]=\"i._values[cIdx].props?.rowSpan === 1 ? null : i._values[cIdx].props?.rowSpan\"\n            >\n              @if (responsive) {\n                <span class=\"ant-table-rep__title\">\n                  <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: c.title }\" />\n                </span>\n              }\n              <st-td [data]=\"_data\" [i]=\"i\" [index]=\"index\" [c]=\"c\" [cIdx]=\"cIdx\" (n)=\"_handleTd($event)\" />\n            </td>\n          }\n        }\n      </tr>\n      <tr [nzExpand]=\"i.expand\">\n        <ng-template [ngTemplateOutlet]=\"expand\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </tr>\n    </ng-template>\n    @if (virtualScroll) {\n      <ng-template nz-virtual-scroll let-i let-index=\"index\">\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </ng-template>\n    } @else {\n      @for (i of _data; track trackBy($index, i)) {\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: $index }\" />\n      }\n    }\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"body!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n  </tbody>\n  <ng-template #totalTpl let-range=\"range\" let-total>{{ renderTotal(total, range) }}</ng-template>\n</nz-table>\n<nz-dropdown-menu #contextmenuTpl=\"nzDropdownMenu\">\n  <ul nz-menu class=\"st__contextmenu\">\n    @for (i of contextmenuList; track $index) {\n      @if (i.children!.length === 0) {\n        <li nz-menu-item (click)=\"i.fn!(i)\" [innerHTML]=\"i.text\"></li>\n      } @else {\n        <li nz-submenu [nzTitle]=\"i.text\">\n          <ul>\n            @for (ci of i.children; track $index) {\n              <li nz-menu-item (click)=\"ci.fn!(ci)\" [innerHTML]=\"ci.text\"></li>\n            }\n          </ul>\n        </li>\n      }\n    }\n  </ul>\n</nz-dropdown-menu>\n", dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i3.NgControlStatus), selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i0.forwardRef(() => i3.NgModel), selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i0.forwardRef(() => i4.LetDirective), selector: "[let]", inputs: ["let"] }, { kind: "component", type: i0.forwardRef(() => i5.NzTableComponent), selector: "nz-table", inputs: ["nzTableLayout", "nzShowTotal", "nzItemRender", "nzTitle", "nzFooter", "nzNoResult", "nzPageSizeOptions", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualForTrackBy", "nzLoadingDelay", "nzPageIndex", "nzPageSize", "nzTotal", "nzWidthConfig", "nzData", "nzCustomColumn", "nzPaginationPosition", "nzScroll", "noDataVirtualHeight", "nzPaginationType", "nzFrontPagination", "nzTemplateMode", "nzShowPagination", "nzLoading", "nzOuterBordered", "nzLoadingIndicator", "nzBordered", "nzSize", "nzShowSizeChanger", "nzHideOnSinglePage", "nzShowQuickJumper", "nzSimple"], outputs: ["nzPageSizeChange", "nzPageIndexChange", "nzQueryParams", "nzCurrentPageDataChange", "nzCustomColumnChange"], exportAs: ["nzTable"] }, { kind: "component", type: i0.forwardRef(() => i5.NzThAddOnComponent), selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", inputs: ["nzColumnKey", "nzFilterMultiple", "nzSortOrder", "nzSortPriority", "nzSortDirections", "nzFilters", "nzSortFn", "nzFilterFn", "nzShowSort", "nzShowFilter", "nzCustomFilter"], outputs: ["nzCheckedChange", "nzSortOrderChange", "nzFilterChange"] }, { kind: "directive", type: i0.forwardRef(() => i5.NzTableCellDirective), selector: "th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])" }, { kind: "directive", type: i0.forwardRef(() => i5.NzThMeasureDirective), selector: "th", inputs: ["nzWidth", "colspan", "colSpan", "rowspan", "rowSpan"] }, { kind: "component", type: i0.forwardRef(() => i5.NzTdAddOnComponent), selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]", inputs: ["nzChecked", "nzDisabled", "nzIndeterminate", "nzLabel", "nzIndentSize", "nzShowExpand", "nzShowCheckbox", "nzExpand", "nzExpandIcon"], outputs: ["nzCheckedChange", "nzExpandChange"] }, { kind: "component", type: i0.forwardRef(() => i5.NzTheadComponent), selector: "thead:not(.ant-table-thead)", outputs: ["nzSortOrderChange"] }, { kind: "component", type: i0.forwardRef(() => i5.NzTbodyComponent), selector: "tbody" }, { kind: "directive", type: i0.forwardRef(() => i5.NzTrDirective), selector: "tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])" }, { kind: "directive", type: i0.forwardRef(() => i5.NzTableVirtualScrollDirective), selector: "[nz-virtual-scroll]", exportAs: ["nzVirtualScroll"] }, { kind: "directive", type: i0.forwardRef(() => i5.NzCellFixedDirective), selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]", inputs: ["nzRight", "nzLeft", "colspan", "colSpan"] }, { kind: "directive", type: i0.forwardRef(() => i5.NzTrExpandDirective), selector: "tr[nzExpand]", inputs: ["nzExpand"] }, { kind: "component", type: i0.forwardRef(() => i5.NzTableFixedRowComponent), selector: "tr[nz-table-fixed-row], tr[nzExpand]" }, { kind: "directive", type: i0.forwardRef(() => i6.NzIconDirective), selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i0.forwardRef(() => i7.NzCheckboxComponent), selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: i0.forwardRef(() => i8.NzMenuDirective), selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i0.forwardRef(() => i8.NzMenuItemComponent), selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "component", type: i0.forwardRef(() => i8.NzSubMenuComponent), selector: "[nz-submenu]", inputs: ["nzMenuClassName", "nzPaddingLeft", "nzTitle", "nzIcon", "nzOpen", "nzDisabled", "nzPlacement"], outputs: ["nzOpenChange"], exportAs: ["nzSubmenu"] }, { kind: "directive", type: i0.forwardRef(() => i9.NzDropDownDirective), selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i0.forwardRef(() => i9.NzDropdownMenuComponent), selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i0.forwardRef(() => i10.NzTooltipDirective), selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i0.forwardRef(() => i11.NzResizableDirective), selector: "[nz-resizable]", inputs: ["nzBounds", "nzMaxHeight", "nzMaxWidth", "nzMinHeight", "nzMinWidth", "nzGridColumnCount", "nzMaxColumn", "nzMinColumn", "nzLockAspectRatio", "nzPreview", "nzDisabled"], outputs: ["nzResize", "nzResizeEnd", "nzResizeStart"], exportAs: ["nzResizable"] }, { kind: "component", type: i0.forwardRef(() => i11.NzResizeHandleComponent), selector: "nz-resize-handle, [nz-resize-handle]", inputs: ["nzDirection", "nzCursorType"], outputs: ["nzMouseDown"], exportAs: ["nzResizeHandle"] }, { kind: "component", type: i0.forwardRef(() => i12.STFilterComponent), selector: "st-filter", inputs: ["col", "locale", "f"], outputs: ["n", "handle"] }, { kind: "component", type: i0.forwardRef(() => STTdComponent), selector: "st-td", inputs: ["c", "cIdx", "data", "i", "index"], outputs: ["n"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: STComponent, decorators: [{
            type: Component,
            args: [{ selector: 'st', exportAs: 'st', providers: [STDataSource, STRowSource, STColumnSource, STExport, DatePipe, YNPipe, DecimalPipe], host: {
                        '[class.st]': `true`,
                        '[class.st__p-left]': `page.placement === 'left'`,
                        '[class.st__p-center]': `page.placement === 'center'`,
                        '[class.st__width-strict]': `widthMode.type === 'strict'`,
                        '[class.st__row-class]': `rowClassName`,
                        '[class.ant-table-rep]': `responsive`,
                        '[class.ant-table-rep__hide-header-footer]': `responsiveHideHeaderFooter`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-template #titleTpl let-i>\n  <span [innerHTML]=\"i._text\"></span>\n  @if (i.optional) {\n    <small class=\"st__head-optional\" [innerHTML]=\"i.optional\"></small>\n  }\n  @if (i.optionalHelp) {\n    <i class=\"st__head-tip\" nz-tooltip [nzTooltipTitle]=\"i.optionalHelp\" nz-icon nzType=\"question-circle\"></i>\n  }\n</ng-template>\n<ng-template #chkAllTpl let-custom>\n  <label\n    nz-checkbox\n    class=\"st__checkall\"\n    [nzDisabled]=\"_allCheckedDisabled\"\n    [(ngModel)]=\"_allChecked\"\n    [nzIndeterminate]=\"_indeterminate\"\n    (ngModelChange)=\"checkAll()\"\n    [class.ant-table-selection-select-all-custom]=\"custom\"\n  ></label>\n</ng-template>\n<nz-table\n  #table\n  [nzData]=\"_data\"\n  [(nzPageIndex)]=\"pi\"\n  (nzPageIndexChange)=\"_change('pi')\"\n  [(nzPageSize)]=\"ps\"\n  (nzPageSizeChange)=\"_change('ps')\"\n  [nzTotal]=\"total\"\n  [nzShowPagination]=\"_isPagination\"\n  [nzFrontPagination]=\"false\"\n  [nzBordered]=\"bordered\"\n  [nzSize]=\"size\"\n  [nzLoading]=\"noColumns || _loading\"\n  [nzLoadingDelay]=\"loadingDelay\"\n  [nzLoadingIndicator]=\"loadingIndicator\"\n  [nzTitle]=\"header!\"\n  [nzFooter]=\"footer!\"\n  [nzScroll]=\"scroll\"\n  [nzVirtualItemSize]=\"virtualItemSize\"\n  [nzVirtualMaxBufferPx]=\"virtualMaxBufferPx\"\n  [nzVirtualMinBufferPx]=\"virtualMinBufferPx\"\n  [nzVirtualForTrackBy]=\"virtualForTrackBy\"\n  [nzNoResult]=\"noResult!\"\n  [nzPageSizeOptions]=\"page.pageSizes!\"\n  [nzShowQuickJumper]=\"page.showQuickJumper\"\n  [nzShowSizeChanger]=\"page.showSize\"\n  [nzPaginationPosition]=\"page.position!\"\n  [nzPaginationType]=\"page.type!\"\n  [nzItemRender]=\"page.itemRender!\"\n  [nzSimple]=\"page.simple\"\n  [nzShowTotal]=\"totalTpl\"\n  [nzWidthConfig]=\"_widthConfig\"\n  (contextmenu)=\"onContextmenu($event)\"\n  [class.st__no-column]=\"noColumns\"\n>\n  @if (showHeader) {\n    <thead>\n      @for (row of _headers; track row) {\n        <tr>\n          @if ($first && expand) {\n            <th nzWidth=\"50px\" [rowSpan]=\"_headers.length\"></th>\n          }\n          @for (h of row; track h; let index = $index; let last = $last) {\n            <th\n              *let=\"h.column as _c\"\n              [colSpan]=\"h.colSpan\"\n              [rowSpan]=\"h.rowSpan\"\n              [nzWidth]=\"$any(_c).width\"\n              [nzLeft]=\"_c._left!\"\n              [nzRight]=\"_c._right!\"\n              [ngClass]=\"_c._className\"\n              [attr.data-col]=\"_c.indexKey\"\n              [attr.data-col-index]=\"index\"\n              [nzShowSort]=\"_c._sort.enabled\"\n              [nzSortOrder]=\"$any(_c)._sort.default\"\n              (nzSortOrderChange)=\"sort(_c, $event)\"\n              [nzCustomFilter]=\"!!_c.filter\"\n              [class.st__has-filter]=\"_c.filter\"\n              nz-resizable\n              [nzDisabled]=\"last || $any(_c).resizable.disabled\"\n              [nzMaxWidth]=\"$any(_c).resizable.maxWidth\"\n              [nzMinWidth]=\"$any(_c).resizable.minWidth\"\n              [nzBounds]=\"$any(_c).resizable.bounds\"\n              [nzPreview]=\"$any(_c).resizable.preview\"\n              (nzResizeEnd)=\"colResize($event, _c)\"\n            >\n              @if ($any(!last && !$any(_c).resizable.disabled)) {\n                <nz-resize-handle nzDirection=\"right\" (click)=\"_stopPropagation($event)\">\n                  <i></i>\n                </nz-resize-handle>\n              }\n              @if (_c.__renderTitle) {\n                <ng-template\n                  [ngTemplateOutlet]=\"_c.__renderTitle!\"\n                  [ngTemplateOutletContext]=\"{ $implicit: h.column, index: index }\"\n                />\n              } @else {\n                @switch (_c.type) {\n                  @case ('checkbox') {\n                    @if (_c.selections!.length === 0) {\n                      <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: false }\" />\n                    } @else {\n                      <div class=\"ant-table-selection\">\n                        <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: true }\" />\n                        @if (_c.selections!.length) {\n                          <div class=\"ant-table-selection-extra\">\n                            <div\n                              nz-dropdown\n                              nzPlacement=\"bottomLeft\"\n                              [nzDropdownMenu]=\"selectionMenu\"\n                              class=\"ant-table-selection-down st__checkall-selection\"\n                            >\n                              <i nz-icon nzType=\"down\"></i>\n                            </div>\n                          </div>\n                        }\n                        <nz-dropdown-menu #selectionMenu=\"nzDropdownMenu\">\n                          <ul nz-menu class=\"ant-table-selection-menu\">\n                            @for (rw of _c.selections; track $index) {\n                              <li nz-menu-item (click)=\"_rowSelection(rw)\" [innerHTML]=\"rw.text\"></li>\n                            }\n                          </ul>\n                        </nz-dropdown-menu>\n                      </div>\n                    }\n                  }\n                  @default {\n                    <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: _c.title }\" />\n                  }\n                }\n              }\n              @if (_c.filter) {\n                <st-filter\n                  nz-th-extra\n                  [col]=\"h.column\"\n                  [f]=\"_c.filter\"\n                  [locale]=\"locale\"\n                  (n)=\"handleFilterNotify($event)\"\n                  (handle)=\"_handleFilter(_c, $event)\"\n                />\n              }\n            </th>\n          }\n        </tr>\n      }\n    </thead>\n  }\n  <tbody class=\"st__body\">\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"bodyHeader!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n    <ng-template #bodyTpl let-i let-index=\"index\">\n      <tr\n        [attr.data-index]=\"index\"\n        (click)=\"_rowClick($event, i, index, false)\"\n        (dblclick)=\"_rowClick($event, i, index, true)\"\n        [ngClass]=\"i._rowClassName\"\n      >\n        @if (expand) {\n          <td\n            [nzShowExpand]=\"expand && i.showExpand !== false\"\n            [nzExpand]=\"i.expand\"\n            [nzExpandIcon]=\"expandIcon ? wrapExpandIcon : null\"\n            (nzExpandChange)=\"_expandChange(i, $event)\"\n            (click)=\"_stopPropagation($event)\"\n            nzWidth=\"50px\"\n          ></td>\n          <ng-template #wrapExpandIcon>\n            <span (click)=\"_expandChange(i, !i.expand)\">\n              <ng-template [ngTemplateOutlet]=\"expandIcon\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n            </span>\n          </ng-template>\n        }\n        @for (c of _columns; track cIdx; let cIdx = $index) {\n          @if (i._values[cIdx].props?.colSpan > 0 && i._values[cIdx].props?.rowSpan > 0) {\n            <td\n              [nzLeft]=\"!!c._left\"\n              [nzRight]=\"!!c._right\"\n              [attr.data-col-index]=\"cIdx\"\n              [ngClass]=\"c._className\"\n              [attr.colspan]=\"i._values[cIdx].props?.colSpan === 1 ? null : i._values[cIdx].props?.colSpan\"\n              [attr.rowspan]=\"i._values[cIdx].props?.rowSpan === 1 ? null : i._values[cIdx].props?.rowSpan\"\n            >\n              @if (responsive) {\n                <span class=\"ant-table-rep__title\">\n                  <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: c.title }\" />\n                </span>\n              }\n              <st-td [data]=\"_data\" [i]=\"i\" [index]=\"index\" [c]=\"c\" [cIdx]=\"cIdx\" (n)=\"_handleTd($event)\" />\n            </td>\n          }\n        }\n      </tr>\n      <tr [nzExpand]=\"i.expand\">\n        <ng-template [ngTemplateOutlet]=\"expand\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </tr>\n    </ng-template>\n    @if (virtualScroll) {\n      <ng-template nz-virtual-scroll let-i let-index=\"index\">\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </ng-template>\n    } @else {\n      @for (i of _data; track trackBy($index, i)) {\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: $index }\" />\n      }\n    }\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"body!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n  </tbody>\n  <ng-template #totalTpl let-range=\"range\" let-total>{{ renderTotal(total, range) }}</ng-template>\n</nz-table>\n<nz-dropdown-menu #contextmenuTpl=\"nzDropdownMenu\">\n  <ul nz-menu class=\"st__contextmenu\">\n    @for (i of contextmenuList; track $index) {\n      @if (i.children!.length === 0) {\n        <li nz-menu-item (click)=\"i.fn!(i)\" [innerHTML]=\"i.text\"></li>\n      } @else {\n        <li nz-submenu [nzTitle]=\"i.text\">\n          <ul>\n            @for (ci of i.children; track $index) {\n              <li nz-menu-item (click)=\"ci.fn!(ci)\" [innerHTML]=\"ci.text\"></li>\n            }\n          </ul>\n        </li>\n      }\n    }\n  </ul>\n</nz-dropdown-menu>\n" }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { orgTable: [{
                type: ViewChild,
                args: ['table']
            }], contextmenuTpl: [{
                type: ViewChild,
                args: ['contextmenuTpl']
            }], req: [{
                type: Input
            }], res: [{
                type: Input
            }], page: [{
                type: Input
            }], data: [{
                type: Input
            }], columns: [{
                type: Input
            }], contextmenu: [{
                type: Input
            }], ps: [{
                type: Input,
                args: [{ transform: (v) => numberAttribute(v, 10) }]
            }], pi: [{
                type: Input,
                args: [{ transform: (v) => numberAttribute(v, 1) }]
            }], total: [{
                type: Input,
                args: [{ transform: (v) => numberAttribute(v, 0) }]
            }], loading: [{
                type: Input
            }], loadingDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], loadingIndicator: [{
                type: Input
            }], bordered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input
            }], scroll: [{
                type: Input
            }], singleSort: [{
                type: Input
            }], multiSort: [{
                type: Input
            }], rowClassName: [{
                type: Input
            }], clickRowClassName: [{
                type: Input
            }], widthMode: [{
                type: Input
            }], widthConfig: [{
                type: Input
            }], resizable: [{
                type: Input
            }], header: [{
                type: Input
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], footer: [{
                type: Input
            }], bodyHeader: [{
                type: Input
            }], body: [{
                type: Input
            }], expandRowByClick: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], expandAccordion: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], expand: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], noResult: [{
                type: Input
            }], responsive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], responsiveHideHeaderFooter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], error: [{
                type: Output
            }], change: [{
                type: Output
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualMaxBufferPx: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualMinBufferPx: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], customRequest: [{
                type: Input
            }], virtualForTrackBy: [{
                type: Input
            }], trackBy: [{
                type: Input
            }] } });
export class STTdComponent {
    constructor() {
        this.stComp = inject(STComponent, { host: true });
        this.router = inject(Router);
        this.modalHelper = inject(ModalHelper);
        this.drawerHelper = inject(DrawerHelper);
        this.n = new EventEmitter();
    }
    get routerState() {
        const { pi, ps, total } = this.stComp;
        return { pi, ps, total };
    }
    report(type) {
        this.n.emit({ type, item: this.i, col: this.c });
    }
    _checkbox(value) {
        this.i.checked = value;
        this.report('checkbox');
    }
    _radio() {
        this.data.filter(w => !w.disabled).forEach(i => (i.checked = false));
        this.i.checked = true;
        this.report('radio');
    }
    _link(e) {
        this._stopPropagation(e);
        const res = this.c.click(this.i, this.stComp);
        if (typeof res === 'string') {
            this.router.navigateByUrl(res, { state: this.routerState });
        }
        return false;
    }
    _stopPropagation(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }
    _btn(btn, ev) {
        ev?.stopPropagation();
        const cog = this.stComp.cog;
        let record = this.i;
        if (btn.type === 'modal' || btn.type === 'static') {
            if (cog.modal.pureRecoard === true) {
                record = this.stComp.pureItem(record);
            }
            const modal = btn.modal;
            const obj = { [modal.paramsName]: record };
            this.modalHelper[btn.type === 'modal' ? 'create' : 'createStatic'](modal.component, { ...obj, ...(modal.params && modal.params(record)) }, deepMergeKey({}, true, cog.modal, modal))
                .pipe(filter(w => typeof w !== 'undefined'))
                .subscribe((res) => this.btnCallback(record, btn, res));
            return;
        }
        else if (btn.type === 'drawer') {
            if (cog.drawer.pureRecoard === true) {
                record = this.stComp.pureItem(record);
            }
            const drawer = btn.drawer;
            const obj = { [drawer.paramsName]: record };
            this.drawerHelper
                .create(drawer.title, drawer.component, { ...obj, ...(drawer.params && drawer.params(record)) }, deepMergeKey({}, true, cog.drawer, drawer))
                .pipe(filter(w => typeof w !== 'undefined'))
                .subscribe(res => this.btnCallback(record, btn, res));
            return;
        }
        else if (btn.type === 'link') {
            const clickRes = this.btnCallback(record, btn);
            if (typeof clickRes === 'string') {
                this.router.navigateByUrl(clickRes, { state: this.routerState });
            }
            return;
        }
        this.btnCallback(record, btn);
    }
    btnCallback(record, btn, modal) {
        if (!btn.click)
            return;
        if (typeof btn.click === 'string') {
            switch (btn.click) {
                case 'load':
                    this.stComp.load();
                    break;
                case 'reload':
                    this.stComp.reload();
                    break;
            }
        }
        else {
            return btn.click(record, modal, this.stComp);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: STTdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.6", type: STTdComponent, selector: "st-td", inputs: { c: "c", cIdx: "cIdx", data: "data", i: "i", index: "index" }, outputs: { n: "n" }, ngImport: i0, template: "<ng-template #btnTpl let-i let-child=\"child\">\n  @if (i.tooltip) {\n    <span nz-tooltip [nzTooltipTitle]=\"i.tooltip\" [class.d-block]=\"child\" [class.width-100]=\"child\">\n      <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </span>\n  } @else {\n    <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n  }\n</ng-template>\n<ng-template #btnItemTpl let-i>\n  @if (i.pop) {\n    <a\n      nz-popconfirm\n      [nzPopconfirmTitle]=\"i.pop.title\"\n      [nzIcon]=\"i.pop.icon\"\n      [nzCondition]=\"i.pop.condition(i)\"\n      [nzCancelText]=\"i.pop.cancelText\"\n      [nzOkText]=\"i.pop.okText\"\n      [nzOkType]=\"i.pop.okType\"\n      (nzOnConfirm)=\"_btn(i)\"\n      class=\"st__btn-text\"\n      [ngClass]=\"i._className\"\n      (click)=\"_stopPropagation($event)\"\n    >\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  } @else {\n    <a (click)=\"_btn(i, $event)\" class=\"st__btn-text\" [ngClass]=\"i._className\">\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  }\n</ng-template>\n<ng-template #btnTextTpl let-i>\n  @if (i._icon) {\n    @if (i._icon.iconfont) {\n      <i nz-icon [nzIconfont]=\"i._icon.iconfont\"></i>\n    } @else {\n      <i\n        nz-icon\n        [nzType]=\"i._icon.type\"\n        [nzTheme]=\"i._icon.theme\"\n        [nzSpin]=\"i._icon.spin\"\n        [nzTwotoneColor]=\"i._icon.twoToneColor\"\n      ></i>\n    }\n  }\n  <span [innerHTML]=\"i._text\" [ngClass]=\"{ 'pl-xs': i._icon }\"></span>\n</ng-template>\n@if (c.__render) {\n  <ng-template [ngTemplateOutlet]=\"c.__render!\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index, column: c }\" />\n} @else {\n  @switch (c.type) {\n    @case ('checkbox') {\n      <label nz-checkbox [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_checkbox($event)\"></label>\n    }\n    @case ('radio') {\n      <label nz-radio [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_radio()\"></label>\n    }\n    @case ('link') {\n      <a (click)=\"_link($event)\" [innerHTML]=\"i._values[cIdx]._text\" [attr.title]=\"i._values[cIdx].text\"></a>\n    }\n    @case ('tag') {\n      <nz-tag [nzColor]=\"i._values[cIdx].color\" [nz-tooltip]=\"i._values[cIdx].tooltip\">\n        <span [innerHTML]=\"i._values[cIdx]._text\"></span>\n      </nz-tag>\n    }\n    @case ('badge') {\n      <nz-badge\n        [nzStatus]=\"i._values[cIdx].color\"\n        [nzText]=\"i._values[cIdx].text\"\n        [nz-tooltip]=\"i._values[cIdx].tooltip\"\n      />\n    }\n    @case ('cell') {\n      <cell [value]=\"i._values[cIdx].text\" [options]=\"i._values[cIdx].cell ?? c.cell\" />\n    }\n    @case ('widget') {\n      <ng-template st-widget-host [record]=\"i\" [column]=\"c\" />\n    }\n    @default {\n      @if (c.safeType === 'text') {\n        <span [innerText]=\"i._values[cIdx]._text\" [attr.title]=\"c._isTruncate ? i._values[cIdx].text : null\"></span>\n      } @else {\n        <span [innerHTML]=\"i._values[cIdx]._text\" [attr.title]=\"c._isTruncate ? i._values[cIdx].text : null\"></span>\n      }\n    }\n  }\n  @for (btn of i._values[cIdx].buttons; track $index) {\n    @if (btn.children!.length > 0) {\n      <a nz-dropdown [nzDropdownMenu]=\"btnMenu\" nzOverlayClassName=\"st__btn-sub\">\n        <span [innerHTML]=\"btn._text\"></span>\n        <i nz-icon nzType=\"down\"></i>\n      </a>\n      <nz-dropdown-menu #btnMenu=\"nzDropdownMenu\">\n        <ul nz-menu>\n          @for (subBtn of btn.children; track $index) {\n            @if (subBtn.type === 'divider') {\n              <li nz-menu-divider></li>\n            } @else {\n              <li nz-menu-item [class.st__btn-disabled]=\"subBtn._disabled\">\n                <ng-template\n                  [ngTemplateOutlet]=\"btnTpl\"\n                  [ngTemplateOutletContext]=\"{ $implicit: subBtn, child: true }\"\n                />\n              </li>\n            }\n          }\n        </ul>\n      </nz-dropdown-menu>\n    } @else {\n      <span [class.st__btn-disabled]=\"btn._disabled\">\n        <ng-template [ngTemplateOutlet]=\"btnTpl\" [ngTemplateOutletContext]=\"{ $implicit: btn, child: false }\" />\n      </span>\n    }\n    @if (!$last) {\n      <nz-divider nzType=\"vertical\" />\n    }\n  }\n}\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i13.CellComponent, selector: "cell, [cell]", inputs: ["value", "options", "loading", "disabled"], outputs: ["valueChange"], exportAs: ["cell"] }, { kind: "directive", type: i14.NzPopconfirmDirective, selector: "[nz-popconfirm]", inputs: ["nzPopconfirmArrowPointAtCenter", "nzPopconfirmTitle", "nzPopconfirmTitleContext", "nz-popconfirm", "nzPopconfirmTrigger", "nzPopconfirmPlacement", "nzPopconfirmOrigin", "nzPopconfirmMouseEnterDelay", "nzPopconfirmMouseLeaveDelay", "nzPopconfirmOverlayClassName", "nzPopconfirmOverlayStyle", "nzPopconfirmVisible", "nzOkText", "nzOkType", "nzOkDisabled", "nzOkDanger", "nzCancelText", "nzBeforeConfirm", "nzIcon", "nzCondition", "nzPopconfirmShowArrow", "nzPopconfirmBackdrop", "nzAutofocus"], outputs: ["nzPopconfirmVisibleChange", "nzOnCancel", "nzOnConfirm"], exportAs: ["nzPopconfirm"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i15.NzBadgeComponent, selector: "nz-badge", inputs: ["nzShowZero", "nzShowDot", "nzStandalone", "nzDot", "nzOverflowCount", "nzColor", "nzStyle", "nzText", "nzTitle", "nzStatus", "nzCount", "nzOffset", "nzSize"], exportAs: ["nzBadge"] }, { kind: "component", type: i7.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "component", type: i16.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "directive", type: i8.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i8.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i8.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i9.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i9.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i9.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "component", type: i17.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus", "nz-radio-button"], exportAs: ["nzRadio"] }, { kind: "component", type: i18.NzTagComponent, selector: "nz-tag", inputs: ["nzMode", "nzColor", "nzChecked", "nzBordered"], outputs: ["nzOnClose", "nzCheckedChange"], exportAs: ["nzTag"] }, { kind: "directive", type: i10.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i19.STWidgetHostDirective, selector: "[st-widget-host]", inputs: ["record", "column"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: STTdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'st-td', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-template #btnTpl let-i let-child=\"child\">\n  @if (i.tooltip) {\n    <span nz-tooltip [nzTooltipTitle]=\"i.tooltip\" [class.d-block]=\"child\" [class.width-100]=\"child\">\n      <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </span>\n  } @else {\n    <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n  }\n</ng-template>\n<ng-template #btnItemTpl let-i>\n  @if (i.pop) {\n    <a\n      nz-popconfirm\n      [nzPopconfirmTitle]=\"i.pop.title\"\n      [nzIcon]=\"i.pop.icon\"\n      [nzCondition]=\"i.pop.condition(i)\"\n      [nzCancelText]=\"i.pop.cancelText\"\n      [nzOkText]=\"i.pop.okText\"\n      [nzOkType]=\"i.pop.okType\"\n      (nzOnConfirm)=\"_btn(i)\"\n      class=\"st__btn-text\"\n      [ngClass]=\"i._className\"\n      (click)=\"_stopPropagation($event)\"\n    >\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  } @else {\n    <a (click)=\"_btn(i, $event)\" class=\"st__btn-text\" [ngClass]=\"i._className\">\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  }\n</ng-template>\n<ng-template #btnTextTpl let-i>\n  @if (i._icon) {\n    @if (i._icon.iconfont) {\n      <i nz-icon [nzIconfont]=\"i._icon.iconfont\"></i>\n    } @else {\n      <i\n        nz-icon\n        [nzType]=\"i._icon.type\"\n        [nzTheme]=\"i._icon.theme\"\n        [nzSpin]=\"i._icon.spin\"\n        [nzTwotoneColor]=\"i._icon.twoToneColor\"\n      ></i>\n    }\n  }\n  <span [innerHTML]=\"i._text\" [ngClass]=\"{ 'pl-xs': i._icon }\"></span>\n</ng-template>\n@if (c.__render) {\n  <ng-template [ngTemplateOutlet]=\"c.__render!\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index, column: c }\" />\n} @else {\n  @switch (c.type) {\n    @case ('checkbox') {\n      <label nz-checkbox [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_checkbox($event)\"></label>\n    }\n    @case ('radio') {\n      <label nz-radio [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_radio()\"></label>\n    }\n    @case ('link') {\n      <a (click)=\"_link($event)\" [innerHTML]=\"i._values[cIdx]._text\" [attr.title]=\"i._values[cIdx].text\"></a>\n    }\n    @case ('tag') {\n      <nz-tag [nzColor]=\"i._values[cIdx].color\" [nz-tooltip]=\"i._values[cIdx].tooltip\">\n        <span [innerHTML]=\"i._values[cIdx]._text\"></span>\n      </nz-tag>\n    }\n    @case ('badge') {\n      <nz-badge\n        [nzStatus]=\"i._values[cIdx].color\"\n        [nzText]=\"i._values[cIdx].text\"\n        [nz-tooltip]=\"i._values[cIdx].tooltip\"\n      />\n    }\n    @case ('cell') {\n      <cell [value]=\"i._values[cIdx].text\" [options]=\"i._values[cIdx].cell ?? c.cell\" />\n    }\n    @case ('widget') {\n      <ng-template st-widget-host [record]=\"i\" [column]=\"c\" />\n    }\n    @default {\n      @if (c.safeType === 'text') {\n        <span [innerText]=\"i._values[cIdx]._text\" [attr.title]=\"c._isTruncate ? i._values[cIdx].text : null\"></span>\n      } @else {\n        <span [innerHTML]=\"i._values[cIdx]._text\" [attr.title]=\"c._isTruncate ? i._values[cIdx].text : null\"></span>\n      }\n    }\n  }\n  @for (btn of i._values[cIdx].buttons; track $index) {\n    @if (btn.children!.length > 0) {\n      <a nz-dropdown [nzDropdownMenu]=\"btnMenu\" nzOverlayClassName=\"st__btn-sub\">\n        <span [innerHTML]=\"btn._text\"></span>\n        <i nz-icon nzType=\"down\"></i>\n      </a>\n      <nz-dropdown-menu #btnMenu=\"nzDropdownMenu\">\n        <ul nz-menu>\n          @for (subBtn of btn.children; track $index) {\n            @if (subBtn.type === 'divider') {\n              <li nz-menu-divider></li>\n            } @else {\n              <li nz-menu-item [class.st__btn-disabled]=\"subBtn._disabled\">\n                <ng-template\n                  [ngTemplateOutlet]=\"btnTpl\"\n                  [ngTemplateOutletContext]=\"{ $implicit: subBtn, child: true }\"\n                />\n              </li>\n            }\n          }\n        </ul>\n      </nz-dropdown-menu>\n    } @else {\n      <span [class.st__btn-disabled]=\"btn._disabled\">\n        <ng-template [ngTemplateOutlet]=\"btnTpl\" [ngTemplateOutletContext]=\"{ $implicit: btn, child: false }\" />\n      </span>\n    }\n    @if (!$last) {\n      <nz-divider nzType=\"vertical\" />\n    }\n  }\n}\n" }]
        }], propDecorators: { c: [{
                type: Input
            }], cIdx: [{
                type: Input
            }], data: [{
                type: Input
            }], i: [{
                type: Input
            }], index: [{
                type: Input
            }], n: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3N0L3N0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9zdC9zdC5jb21wb25lbnQuaHRtbCIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9zdC9zdC10ZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFFTCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxlQUFlLEVBRWYsTUFBTSxFQUtOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWxILE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixZQUFZLEVBRVosV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNELE9BQU8sRUFBRSxvQkFBb0IsRUFBMkIsTUFBTSx3QkFBd0IsQ0FBQztBQUl2RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9C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VCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNuQixNQUFNO2dCQUNSLEtBQUssUUFBUTtvQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNyQixNQUFNO1lBQ1YsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDSCxDQUFDOzhHQXpHVSxhQUFhO2tHQUFiLGFBQWEsMElFNTRCMUIsNDFJQXVIQTs7MkZGcXhCYSxhQUFhO2tCQVB6QixTQUFTOytCQUNFLE9BQU8sdUJBRUksS0FBSyxtQkFDVCx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzhCQVE1QixDQUFDO3NCQUFULEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxDQUFDO3NCQUFULEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNhLENBQUM7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgRGVjaW1hbFBpcGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGluamVjdCxcbiAgSW5wdXQsXG4gIG51bWJlckF0dHJpYnV0ZSxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFRyYWNrQnlGdW5jdGlvbixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIE9ic2VydmFibGUsIG9mLCBmaWx0ZXIsIGNhdGNoRXJyb3IsIG1hcCwgZmluYWxpemUsIHRocm93RXJyb3IsIGxhc3RWYWx1ZUZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgWVVOWkFJX0kxOE5fVE9LRU4sXG4gIERhdGVQaXBlLFxuICBZZWxvbkxvY2FsZVNlcnZpY2UsXG4gIERyYXdlckhlbHBlcixcbiAgTG9jYWxlRGF0YSxcbiAgTW9kYWxIZWxwZXIsXG4gIFlOUGlwZVxufSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpU1RDb25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgZGVlcENvcHksIGRlZXBNZXJnZUtleSB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56Q29udGV4dE1lbnVTZXJ2aWNlLCBOekRyb3Bkb3duTWVudUNvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpSZXNpemVFdmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvcmVzaXphYmxlJztcbmltcG9ydCB7IE56VGFibGVDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3RhYmxlJztcblxuaW1wb3J0IHsgU1RDb2x1bW5Tb3VyY2UgfSBmcm9tICcuL3N0LWNvbHVtbi1zb3VyY2UnO1xuaW1wb3J0IHsgU1REYXRhU291cmNlLCBTVERhdGFTb3VyY2VPcHRpb25zLCBTVERhdGFTb3VyY2VSZXN1bHQgfSBmcm9tICcuL3N0LWRhdGEtc291cmNlJztcbmltcG9ydCB7IFNURXhwb3J0IH0gZnJvbSAnLi9zdC1leHBvcnQnO1xuaW1wb3J0IHsgU1RSb3dTb3VyY2UgfSBmcm9tICcuL3N0LXJvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU1RfREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL3N0LmNvbmZpZyc7XG5pbXBvcnQgdHlwZSB7XG4gIFNUQ2hhbmdlLFxuICBTVENoYW5nZVR5cGUsXG4gIFNUQ2xpY2tSb3dDbGFzc05hbWUsXG4gIFNUQ2xpY2tSb3dDbGFzc05hbWVUeXBlLFxuICBTVENvbHVtbixcbiAgU1RDb2x1bW5CdXR0b24sXG4gIFNUQ29sdW1uU2FmZVR5cGUsXG4gIFNUQ29sdW1uU2VsZWN0aW9uLFxuICBTVENvbnRleHRtZW51Rm4sXG4gIFNUQ29udGV4dG1lbnVJdGVtLFxuICBTVEN1c3RvbVJlcXVlc3RPcHRpb25zLFxuICBTVERhdGEsXG4gIFNURXJyb3IsXG4gIFNURXhwb3J0T3B0aW9ucyxcbiAgU1RMb2FkT3B0aW9ucyxcbiAgU1RNdWx0aVNvcnQsXG4gIFNUUGFnZSxcbiAgU1RSZXEsXG4gIFNUUmVzLFxuICBTVFJlc2V0Q29sdW1uc09wdGlvbixcbiAgU1RSZXNpemFibGUsXG4gIFNUUm93Q2xhc3NOYW1lLFxuICBTVFNpbmdsZVNvcnQsXG4gIFNUU3RhdGlzdGljYWxSZXN1bHRzLFxuICBTVFdpZHRoTW9kZVxufSBmcm9tICcuL3N0LmludGVyZmFjZXMnO1xuaW1wb3J0IHR5cGUgeyBfU1RDb2x1bW4sIF9TVERhdGFWYWx1ZSwgX1NUSGVhZGVyLCBfU1RUZE5vdGlmeSwgX1NUVGROb3RpZnlUeXBlIH0gZnJvbSAnLi9zdC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0JyxcbiAgZXhwb3J0QXM6ICdzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zdC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1NURGF0YVNvdXJjZSwgU1RSb3dTb3VyY2UsIFNUQ29sdW1uU291cmNlLCBTVEV4cG9ydCwgRGF0ZVBpcGUsIFlOUGlwZSwgRGVjaW1hbFBpcGVdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5zdF0nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5zdF9fcC1sZWZ0XSc6IGBwYWdlLnBsYWNlbWVudCA9PT0gJ2xlZnQnYCxcbiAgICAnW2NsYXNzLnN0X19wLWNlbnRlcl0nOiBgcGFnZS5wbGFjZW1lbnQgPT09ICdjZW50ZXInYCxcbiAgICAnW2NsYXNzLnN0X193aWR0aC1zdHJpY3RdJzogYHdpZHRoTW9kZS50eXBlID09PSAnc3RyaWN0J2AsXG4gICAgJ1tjbGFzcy5zdF9fcm93LWNsYXNzXSc6IGByb3dDbGFzc05hbWVgLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLXJlcF0nOiBgcmVzcG9uc2l2ZWAsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtcmVwX19oaWRlLWhlYWRlci1mb290ZXJdJzogYHJlc3BvbnNpdmVIaWRlSGVhZGVyRm9vdGVyYFxuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU1RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBwcml2YXRlIHJlYWRvbmx5IGkxOG5TcnYgPSBpbmplY3QoWVVOWkFJX0kxOE5fVE9LRU4pO1xuICBwcml2YXRlIHJlYWRvbmx5IGVsOiBIVE1MRWxlbWVudCA9IGluamVjdChFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRTcnYgPSBpbmplY3QoU1RFeHBvcnQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbHVtblNvdXJjZSA9IGluamVjdChTVENvbHVtblNvdXJjZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGF0YVNvdXJjZSA9IGluamVjdChTVERhdGFTb3VyY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHllbG9uSTE4biA9IGluamVjdChZZWxvbkxvY2FsZVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNtcyA9IGluamVjdChOekNvbnRleHRNZW51U2VydmljZSwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JCA9IGluamVjdChEZXN0cm95UmVmKTtcblxuICBwcml2YXRlIHRvdGFsVHBsID0gYGA7XG4gIHByaXZhdGUgaW5pZWQgPSBmYWxzZTtcbiAgY29nITogWXVuemFpU1RDb25maWc7XG4gIHByaXZhdGUgX3JlcSE6IFNUUmVxO1xuICBwcml2YXRlIF9yZXMhOiBTVFJlcztcbiAgcHJpdmF0ZSBfcGFnZSE6IFNUUGFnZTtcbiAgcHJpdmF0ZSBfd2lkdGhNb2RlITogU1RXaWR0aE1vZGU7XG4gIHByaXZhdGUgY3VzdG9tV2lkdGhDb25maWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX3dpZHRoQ29uZmlnOiBzdHJpbmdbXSA9IFtdO1xuICBsb2NhbGU6IExvY2FsZURhdGEgPSB7fTtcbiAgX2xvYWRpbmcgPSBmYWxzZTtcbiAgX2RhdGE6IFNURGF0YVtdID0gW107XG4gIF9zdGF0aXN0aWNhbDogU1RTdGF0aXN0aWNhbFJlc3VsdHMgPSB7fTtcbiAgX2lzUGFnaW5hdGlvbiA9IHRydWU7XG4gIF9hbGxDaGVja2VkID0gZmFsc2U7XG4gIF9hbGxDaGVja2VkRGlzYWJsZWQgPSBmYWxzZTtcbiAgX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgX2hlYWRlcnM6IF9TVEhlYWRlcltdW10gPSBbXTtcbiAgX2NvbHVtbnM6IF9TVENvbHVtbltdID0gW107XG4gIGNvbnRleHRtZW51TGlzdDogU1RDb250ZXh0bWVudUl0ZW1bXSA9IFtdO1xuICBAVmlld0NoaWxkKCd0YWJsZScpIHJlYWRvbmx5IG9yZ1RhYmxlITogTnpUYWJsZUNvbXBvbmVudDxTVERhdGE+O1xuICBAVmlld0NoaWxkKCdjb250ZXh0bWVudVRwbCcpIHJlYWRvbmx5IGNvbnRleHRtZW51VHBsITogTnpEcm9wZG93bk1lbnVDb21wb25lbnQ7XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlcSgpOiBTVFJlcSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcTtcbiAgfVxuICBzZXQgcmVxKHZhbHVlOiBTVFJlcSkge1xuICAgIHRoaXMuX3JlcSA9IGRlZXBNZXJnZUtleSh7fSwgdHJ1ZSwgdGhpcy5jb2cucmVxLCB2YWx1ZSk7XG4gIH1cbiAgLyoqIOi/lOWbnuS9k+mFjee9riAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVzKCk6IFNUUmVzIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzO1xuICB9XG4gIHNldCByZXModmFsdWU6IFNUUmVzKSB7XG4gICAgY29uc3QgaXRlbSA9ICh0aGlzLl9yZXMgPSBkZWVwTWVyZ2VLZXkoe30sIHRydWUsIHRoaXMuY29nLnJlcywgdmFsdWUpKTtcbiAgICBjb25zdCByZU5hbWUgPSBpdGVtLnJlTmFtZSE7XG4gICAgaWYgKHR5cGVvZiByZU5hbWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZU5hbWUubGlzdCkpIHJlTmFtZS5saXN0ID0gcmVOYW1lLmxpc3QhLnNwbGl0KCcuJyk7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVOYW1lLnRvdGFsKSkgcmVOYW1lLnRvdGFsID0gcmVOYW1lLnRvdGFsIS5zcGxpdCgnLicpO1xuICAgIH1cbiAgICB0aGlzLl9yZXMgPSBpdGVtO1xuICB9XG4gIEBJbnB1dCgpXG4gIGdldCBwYWdlKCk6IFNUUGFnZSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gIH1cbiAgc2V0IHBhZ2UodmFsdWU6IFNUUGFnZSkge1xuICAgIHRoaXMuX3BhZ2UgPSB7IC4uLnRoaXMuY29nLnBhZ2UsIC4uLnZhbHVlIH07XG4gICAgdGhpcy51cGRhdGVUb3RhbFRwbCgpO1xuICB9XG4gIEBJbnB1dCgpIGRhdGE/OiBzdHJpbmcgfCBTVERhdGFbXSB8IE9ic2VydmFibGU8U1REYXRhW10+O1xuICBASW5wdXQoKSBjb2x1bW5zPzogU1RDb2x1bW5bXSB8IG51bGw7XG4gIEBJbnB1dCgpIGNvbnRleHRtZW51PzogU1RDb250ZXh0bWVudUZuIHwgbnVsbDtcbiAgQElucHV0KHsgdHJhbnNmb3JtOiAodjogdW5rbm93bikgPT4gbnVtYmVyQXR0cmlidXRlKHYsIDEwKSB9KSBwcyA9IDEwO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06ICh2OiB1bmtub3duKSA9PiBudW1iZXJBdHRyaWJ1dGUodiwgMSkgfSkgcGkgPSAxO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06ICh2OiB1bmtub3duKSA9PiBudW1iZXJBdHRyaWJ1dGUodiwgMCkgfSkgdG90YWwgPSAwO1xuICBASW5wdXQoKSBsb2FkaW5nOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGxvYWRpbmdEZWxheSA9IDA7XG4gIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBib3JkZXJlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBzaXplITogJ3NtYWxsJyB8ICdtaWRkbGUnIHwgJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBzY3JvbGw6IHsgeD86IHN0cmluZyB8IG51bGw7IHk/OiBzdHJpbmcgfCBudWxsIH0gPSB7IHg6IG51bGwsIHk6IG51bGwgfTtcbiAgQElucHV0KCkgc2luZ2xlU29ydD86IFNUU2luZ2xlU29ydCB8IG51bGw7XG4gIHByaXZhdGUgX211bHRpU29ydD86IFNUTXVsdGlTb3J0O1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlTb3J0KCk6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpU29ydDtcbiAgfVxuICBzZXQgbXVsdGlTb3J0KHZhbHVlOiBOelNhZmVBbnkpIHtcbiAgICBpZiAoXG4gICAgICAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgIWJvb2xlYW5BdHRyaWJ1dGUodmFsdWUpKSB8fFxuICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMClcbiAgICApIHtcbiAgICAgIHRoaXMuX211bHRpU29ydCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbXVsdGlTb3J0ID0ge1xuICAgICAgLi4uKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZSA6IHt9KVxuICAgIH07XG4gIH1cbiAgQElucHV0KCkgcm93Q2xhc3NOYW1lPzogU1RSb3dDbGFzc05hbWUgfCBudWxsO1xuICBASW5wdXQoKSBjbGlja1Jvd0NsYXNzTmFtZT86IFNUQ2xpY2tSb3dDbGFzc05hbWUgfCBudWxsO1xuICBASW5wdXQoKVxuICBzZXQgd2lkdGhNb2RlKHZhbHVlOiBTVFdpZHRoTW9kZSkge1xuICAgIHRoaXMuX3dpZHRoTW9kZSA9IHsgLi4udGhpcy5jb2cud2lkdGhNb2RlLCAuLi52YWx1ZSB9O1xuICB9XG4gIGdldCB3aWR0aE1vZGUoKTogU1RXaWR0aE1vZGUge1xuICAgIHJldHVybiB0aGlzLl93aWR0aE1vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHdpZHRoQ29uZmlnKHZhbDogc3RyaW5nW10pIHtcbiAgICB0aGlzLl93aWR0aENvbmZpZyA9IHZhbDtcbiAgICB0aGlzLmN1c3RvbVdpZHRoQ29uZmlnID0gdmFsICYmIHZhbC5sZW5ndGggPiAwO1xuICB9XG4gIHByaXZhdGUgX3Jlc2l6YWJsZT86IFNUUmVzaXphYmxlO1xuICBASW5wdXQoKVxuICBzZXQgcmVzaXphYmxlKHZhbDogU1RSZXNpemFibGUgfCBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fcmVzaXphYmxlID0gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgPyB2YWwgOiB7IGRpc2FibGVkOiAhYm9vbGVhbkF0dHJpYnV0ZSh2YWwpIH07XG4gIH1cbiAgQElucHV0KCkgaGVhZGVyPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0hlYWRlciA9IHRydWU7XG4gIEBJbnB1dCgpIGZvb3Rlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbDtcbiAgQElucHV0KCkgYm9keUhlYWRlcj86IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBTVFN0YXRpc3RpY2FsUmVzdWx0cyB9PiB8IG51bGw7XG4gIEBJbnB1dCgpIGJvZHk/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogU1RTdGF0aXN0aWNhbFJlc3VsdHMgfT4gfCBudWxsO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZXhwYW5kUm93QnlDbGljayA9IGZhbHNlO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZXhwYW5kQWNjb3JkaW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIGV4cGFuZDogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFNURGF0YTsgaW5kZXg6IG51bWJlciB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBleHBhbmRJY29uOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogU1REYXRhOyBpbmRleDogbnVtYmVyIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5vUmVzdWx0Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVzcG9uc2l2ZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZXNwb25zaXZlSGlkZUhlYWRlckZvb3Rlcj86IGJvb2xlYW47XG4gIEBPdXRwdXQoKSByZWFkb25seSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8U1RFcnJvcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U1RDaGFuZ2U+KCk7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB2aXJ0dWFsU2Nyb2xsID0gZmFsc2U7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHZpcnR1YWxJdGVtU2l6ZSA9IDU0O1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSB2aXJ0dWFsTWF4QnVmZmVyUHggPSAyMDA7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHZpcnR1YWxNaW5CdWZmZXJQeCA9IDEwMDtcbiAgQElucHV0KCkgY3VzdG9tUmVxdWVzdD86IChvcHRpb25zOiBTVEN1c3RvbVJlcXVlc3RPcHRpb25zKSA9PiBPYnNlcnZhYmxlPE56U2FmZUFueT47XG4gIEBJbnB1dCgpIHZpcnR1YWxGb3JUcmFja0J5OiBUcmFja0J5RnVuY3Rpb248U1REYXRhPiA9IGluZGV4ID0+IGluZGV4O1xuICBASW5wdXQoKSB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248U1REYXRhPiA9IChfLCBpdGVtKSA9PiBpdGVtO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG51bWJlciBvZiB0aGUgY3VycmVudCBwYWdlXG4gICAqL1xuICBnZXQgY291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRhIG9mIHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIGdldCBsaXN0KCk6IFNURGF0YVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIGdldCBub0NvbHVtbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucyA9PSBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy55ZWxvbkkxOG4uY2hhbmdlLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMueWVsb25JMThuLmdldERhdGEoJ3N0Jyk7XG4gICAgICBpZiAodGhpcy5fY29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVG90YWxUcGwoKTtcbiAgICAgICAgdGhpcy5jZCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pMThuU3J2LmNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCgpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5fY29sdW1ucy5sZW5ndGggPiAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2hDb2x1bW5zKCkpO1xuXG4gICAgdGhpcy5zZXRDb2coY29uZmlnU3J2Lm1lcmdlKCdzdCcsIFNUX0RFRkFVTFRfQ09ORklHKSEpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb2coY29nOiBZdW56YWlTVENvbmZpZyk6IHZvaWQge1xuICAgIGNvbnN0IGNvcHlNdWx0aVNvcnQgPSB7IC4uLmNvZy5tdWx0aVNvcnQgfTtcbiAgICAvLyBCZWNhdXNlIG11bHRpU29ydC5nbG9iYWwgd2lsbCBhZmZlY3QgdGhlIHJlc3VsdCwgaXQgc2hvdWxkIGJlIHJlbW92ZWQgZmlyc3QsIGFuZCBtdWx0aVNvcnQgd2lsbCBiZSBvcGVyYXRlZCBhZ2FpbiBhZnRlciBwcm9jZXNzaW5nLlxuICAgIGRlbGV0ZSBjb2cubXVsdGlTb3J0O1xuICAgIHRoaXMuY29nID0gY29nO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29nKTtcblxuICAgIGlmIChjb3B5TXVsdGlTb3J0Lmdsb2JhbCAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMubXVsdGlTb3J0ID0gY29weU11bHRpU29ydDtcbiAgICB9XG4gICAgdGhpcy5jb2x1bW5Tb3VyY2Uuc2V0Q29nKGNvZyk7XG4gICAgdGhpcy5kYXRhU291cmNlLnNldENvZyhjb2cpO1xuICB9XG5cbiAgY2QoKTogdGhpcyB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoRGF0YSgpOiB0aGlzIHtcbiAgICB0aGlzLl9kYXRhID0gWy4uLnRoaXMuX2RhdGFdO1xuICAgIHJldHVybiB0aGlzLmNkKCk7XG4gIH1cblxuICByZW5kZXJUb3RhbCh0b3RhbDogc3RyaW5nLCByYW5nZTogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvdGFsVHBsXG4gICAgICA/IHRoaXMudG90YWxUcGwucmVwbGFjZSgne3t0b3RhbH19JywgdG90YWwpLnJlcGxhY2UoJ3t7cmFuZ2VbMF19fScsIHJhbmdlWzBdKS5yZXBsYWNlKCd7e3JhbmdlWzFdfX0nLCByYW5nZVsxXSlcbiAgICAgIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUVtaXQodHlwZTogU1RDaGFuZ2VUeXBlLCBkYXRhPzogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgY29uc3QgcmVzOiBTVENoYW5nZSA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBwaTogdGhpcy5waSxcbiAgICAgIHBzOiB0aGlzLnBzLFxuICAgICAgdG90YWw6IHRoaXMudG90YWxcbiAgICB9O1xuICAgIGlmIChkYXRhICE9IG51bGwpIHtcbiAgICAgIHJlc1t0eXBlXSA9IGRhdGE7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlLmVtaXQocmVzKTtcbiAgfVxuXG4gIC8vICNyZWdpb24gZGF0YVxuXG4gIC8qKlxuICAgKiDojrflj5bov4fmu6TlkI7miYDmnInmlbDmja5cbiAgICogLSDmnKzlnLDmlbDmja7vvJrljIXlkKvmjpLluo/jgIHov4fmu6TlkI7kuI3liIbpobXmlbDmja5cbiAgICogLSDov5znqIvmlbDmja7vvJrkuI3kvKDpgJIgYHBpYOOAgWBwc2Ag5Lik5Liq5Y+C5pWwXG4gICAqL1xuICBnZXQgZmlsdGVyZWREYXRhKCk6IE9ic2VydmFibGU8U1REYXRhW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2FkRGF0YSh7IHBhZ2luYXRvcjogZmFsc2UgfSBhcyB1bmtub3duIGFzIFNURGF0YVNvdXJjZU9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMubGlzdCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUb3RhbFRwbCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHRvdGFsIH0gPSB0aGlzLnBhZ2U7XG4gICAgaWYgKHR5cGVvZiB0b3RhbCA9PT0gJ3N0cmluZycgJiYgdG90YWwubGVuZ3RoKSB7XG4gICAgICB0aGlzLnRvdGFsVHBsID0gdG90YWw7XG4gICAgfSBlbHNlIGlmIChib29sZWFuQXR0cmlidXRlKHRvdGFsKSkge1xuICAgICAgdGhpcy50b3RhbFRwbCA9IHRoaXMubG9jYWxlLnRvdGFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvdGFsVHBsID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRMb2FkaW5nKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbG9hZGluZyA9IHZhbDtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWREYXRhKG9wdGlvbnM/OiBTVERhdGFTb3VyY2VPcHRpb25zKTogT2JzZXJ2YWJsZTxTVERhdGFTb3VyY2VSZXN1bHQ+IHtcbiAgICBjb25zdCB7IHBpLCBwcywgZGF0YSwgcmVxLCByZXMsIHBhZ2UsIHRvdGFsLCBzaW5nbGVTb3J0LCBtdWx0aVNvcnQsIHJvd0NsYXNzTmFtZSwgX2NvbHVtbnMsIF9oZWFkZXJzIH0gPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2VcbiAgICAgIC5wcm9jZXNzKHtcbiAgICAgICAgcGksXG4gICAgICAgIHBzLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgcmVxLFxuICAgICAgICByZXMsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGNvbHVtbnM6IF9jb2x1bW5zLFxuICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcbiAgICAgICAgc2luZ2xlU29ydCxcbiAgICAgICAgbXVsdGlTb3J0LFxuICAgICAgICByb3dDbGFzc05hbWUsXG4gICAgICAgIHBhZ2luYXRvcjogdHJ1ZSxcbiAgICAgICAgY3VzdG9tUmVxdWVzdDogdGhpcy5jdXN0b21SZXF1ZXN0IHx8IHRoaXMuY29nLmN1c3RvbVJlcXVlc3QsXG4gICAgICAgIC4uLm9wdGlvbnNcbiAgICAgIH0pXG4gICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUGFnZURhdGEoKTogT2JzZXJ2YWJsZTx0aGlzPiB7XG4gICAgdGhpcy5zZXRMb2FkaW5nKHRydWUpO1xuICAgIHJldHVybiB0aGlzLmxvYWREYXRhKCkucGlwZShcbiAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuc2V0TG9hZGluZyhmYWxzZSkpLFxuICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3IuZW1pdCh7IHR5cGU6ICdyZXEnLCBlcnJvciB9KTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gZXJyb3IpO1xuICAgICAgfSksXG4gICAgICBtYXAocmVzdWx0ID0+IHtcbiAgICAgICAgY29uc3QgdW5kZWZpbmVkU3RyaW5nID0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnBpICE9PSB1bmRlZmluZWRTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnBpID0gcmVzdWx0LnBpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnBzICE9PSB1bmRlZmluZWRTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnBzID0gcmVzdWx0LnBzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnRvdGFsICE9PSB1bmRlZmluZWRTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnRvdGFsID0gcmVzdWx0LnRvdGFsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnBhZ2VTaG93ICE9PSB1bmRlZmluZWRTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLl9pc1BhZ2luYXRpb24gPSByZXN1bHQucGFnZVNob3c7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGF0YSA9IHJlc3VsdC5saXN0ID8/IFtdO1xuICAgICAgICB0aGlzLl9zdGF0aXN0aWNhbCA9IHJlc3VsdC5zdGF0aXN0aWNhbCBhcyBTVFN0YXRpc3RpY2FsUmVzdWx0cztcbiAgICAgICAgLy8gU2hvdWxkIGJlIHJlLXJlbmRlciBpbiBuZXh0IHRpa2Ugd2hlbiB1c2luZyB2aXJ0dWFsIHNjcm9sbFxuICAgICAgICBpZiAodGhpcy5jZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgIT0gbnVsbCkge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5jZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ/LmNoZWNrVmlld3BvcnRTaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlZkNoZWNrKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRW1pdCgnbG9hZGVkJywgcmVzdWx0Lmxpc3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKiDmuIXnqbrmiYDmnInmlbDmja4gKi9cbiAgY2xlYXIoY2xlYW5TdGF0dXM6IGJvb2xlYW4gPSB0cnVlKTogdGhpcyB7XG4gICAgaWYgKGNsZWFuU3RhdHVzKSB7XG4gICAgICB0aGlzLmNsZWFyU3RhdHVzKCk7XG4gICAgfVxuICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICByZXR1cm4gdGhpcy5jZCgpO1xuICB9XG5cbiAgLyoqIOa4heepuuaJgOacieeKtuaAgSAqL1xuICBjbGVhclN0YXR1cygpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcy5jbGVhckNoZWNrKCkuY2xlYXJSYWRpbygpLmNsZWFyRmlsdGVyKCkuY2xlYXJTb3J0KCk7XG4gIH1cblxuICAvKipcbiAgICog5qC55o2u6aG156CB6YeN5paw5Yqg6L295pWw5o2uXG4gICAqXG4gICAqIEBwYXJhbSBwaSDmjIflrprlvZPliY3pobXnoIHvvIzpu5jorqTvvJpgMWBcbiAgICogQHBhcmFtIGV4dHJhUGFyYW1zIOmHjeaWsOaMh+WumiBgZXh0cmFQYXJhbXNgIOWAvFxuICAgKiBAcGFyYW0gb3B0aW9ucyDpgInpoblcbiAgICovXG4gIGxvYWQocGk6IG51bWJlciA9IDEsIGV4dHJhUGFyYW1zPzogTnpTYWZlQW55LCBvcHRpb25zPzogU1RMb2FkT3B0aW9ucyk6IHRoaXMge1xuICAgIGlmIChwaSAhPT0gLTEpIHRoaXMucGkgPSBwaTtcbiAgICBpZiAodHlwZW9mIGV4dHJhUGFyYW1zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5yZXEucGFyYW1zID0gb3B0aW9ucyAmJiBvcHRpb25zLm1lcmdlID8geyAuLi50aGlzLnJlcS5wYXJhbXMsIC4uLmV4dHJhUGFyYW1zIH0gOiBleHRyYVBhcmFtcztcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlKCdwaScsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIOmHjeaWsOWIt+aWsOW9k+WJjemhtVxuICAgKlxuICAgKiBAcGFyYW0gZXh0cmFQYXJhbXMg6YeN5paw5oyH5a6aIGBleHRyYVBhcmFtc2Ag5YC8XG4gICAqL1xuICByZWxvYWQoZXh0cmFQYXJhbXM/OiBOelNhZmVBbnksIG9wdGlvbnM/OiBTVExvYWRPcHRpb25zKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXMubG9hZCgtMSwgZXh0cmFQYXJhbXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOmHjee9ruS4lOmHjeaWsOiuvue9riBgcGlgIOS4uiBgMWDvvIzljIXlkKvku6XkuIvlgLzvvJpcbiAgICogLSBgY2hlY2tgIOaVsOaNrlxuICAgKiAtIGByYWRpb2Ag5pWw5o2uXG4gICAqIC0gYHNvcnRgIOaVsOaNrlxuICAgKiAtIGBmaWxldGVyYCDmlbDmja5cbiAgICpcbiAgICogQHBhcmFtIGV4dHJhUGFyYW1zIOmHjeaWsOaMh+WumiBgZXh0cmFQYXJhbXNgIOWAvFxuICAgKi9cbiAgcmVzZXQoZXh0cmFQYXJhbXM/OiBOelNhZmVBbnksIG9wdGlvbnM/OiBTVExvYWRPcHRpb25zKTogdGhpcyB7XG4gICAgdGhpcy5jbGVhclN0YXR1cygpLmxvYWQoMSwgZXh0cmFQYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG9Ub3AoZW5mb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIShlbmZvcmNlID09IG51bGwgPyB0aGlzLnBhZ2UudG9Ub3AgOiBlbmZvcmNlKSkgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbDtcbiAgICBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgIC8vIGZpeCBoZWFkZXIgaGVpZ2h0XG4gICAgdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtPSB0aGlzLnBhZ2UudG9Ub3BPZmZzZXQhO1xuICAgIGlmICh0aGlzLnNjcm9sbCkge1xuICAgICAgaWYgKHRoaXMuY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgbGVmdDogMFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5hbnQtdGFibGUtYm9keSwgLmFudC10YWJsZS1jb250ZW50Jyk/LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jaGFuZ2UodHlwZTogJ3BpJyB8ICdwcycsIG9wdGlvbnM/OiBTVExvYWRPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHR5cGUgPT09ICdwaScgfHwgKHR5cGUgPT09ICdwcycgJiYgdGhpcy5waSA8PSBNYXRoLmNlaWwodGhpcy50b3RhbCAvIHRoaXMucHMpKSkge1xuICAgICAgdGhpcy5sb2FkUGFnZURhdGEoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdG9Ub3Aob3B0aW9ucz8udG9Ub3ApKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZUVtaXQodHlwZSk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlT3RoZXJFeHBhbmQoaXRlbTogU1REYXRhKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwYW5kQWNjb3JkaW9uID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIHRoaXMuX2RhdGEuZmlsdGVyKGkgPT4gaSAhPT0gaXRlbSkuZm9yRWFjaChpID0+IChpLmV4cGFuZCA9IGZhbHNlKSk7XG4gIH1cblxuICBfcm93Q2xpY2soZTogRXZlbnQsIGl0ZW06IFNURGF0YSwgaW5kZXg6IG51bWJlciwgZGJsOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoZWwubm9kZU5hbWUgPT09ICdJTlBVVCcpIHJldHVybjtcbiAgICBjb25zdCB7IGV4cGFuZCwgZXhwYW5kUm93QnlDbGljayB9ID0gdGhpcztcbiAgICBpZiAoISFleHBhbmQgJiYgaXRlbS5zaG93RXhwYW5kICE9PSBmYWxzZSAmJiBleHBhbmRSb3dCeUNsaWNrKSB7XG4gICAgICBpdGVtLmV4cGFuZCA9ICFpdGVtLmV4cGFuZDtcbiAgICAgIHRoaXMuY2xvc2VPdGhlckV4cGFuZChpdGVtKTtcbiAgICAgIHRoaXMuY2hhbmdlRW1pdCgnZXhwYW5kJywgaXRlbSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHsgZSwgaXRlbSwgaW5kZXggfTtcbiAgICBpZiAoZGJsKSB7XG4gICAgICB0aGlzLmNoYW5nZUVtaXQoJ2RibENsaWNrJywgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NsaWNrUm93Q2xhc3NOYW1lKGVsLCBpdGVtLCBpbmRleCk7XG4gICAgICB0aGlzLmNoYW5nZUVtaXQoJ2NsaWNrJywgZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xpY2tSb3dDbGFzc05hbWUoZWw6IEhUTUxFbGVtZW50LCBpdGVtOiBTVERhdGEsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjciA9IHRoaXMuY2xpY2tSb3dDbGFzc05hbWU7XG4gICAgaWYgKGNyID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBleGNsdXNpdmU6IGZhbHNlLFxuICAgICAgLi4uKHR5cGVvZiBjciA9PT0gJ3N0cmluZycgPyB7IGZuOiAoKSA9PiBjciB9IDogY3IpXG4gICAgfSBhcyBTVENsaWNrUm93Q2xhc3NOYW1lVHlwZTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjb25maWcuZm4oaXRlbSwgaW5kZXgpO1xuICAgIGNvbnN0IHRyRWwgPSBlbC5jbG9zZXN0KCd0cicpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChjb25maWcuZXhjbHVzaXZlKSB7XG4gICAgICB0ckVsLnBhcmVudEVsZW1lbnQhIS5xdWVyeVNlbGVjdG9yQWxsKCd0cicpLmZvckVhY2goKGE6IEhUTUxFbGVtZW50KSA9PiBhLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG4gICAgfVxuICAgIGlmICh0ckVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICB0ckVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJFbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgX2V4cGFuZENoYW5nZShpdGVtOiBTVERhdGEsIGV4cGFuZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGl0ZW0uZXhwYW5kID0gZXhwYW5kO1xuICAgIHRoaXMuY2xvc2VPdGhlckV4cGFuZChpdGVtKTtcbiAgICB0aGlzLmNoYW5nZUVtaXQoJ2V4cGFuZCcsIGl0ZW0pO1xuICB9XG5cbiAgX3N0b3BQcm9wYWdhdGlvbihldjogRXZlbnQpOiB2b2lkIHtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZkNvbEFuZERhdGEoKTogdGhpcyB7XG4gICAgdGhpcy5fY29sdW1ucy5mb3JFYWNoKGMgPT4ge1xuICAgICAgdGhpcy5fZGF0YS5mb3JFYWNoKChpLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gaS5fdmFsdWVzIGFzIF9TVERhdGFWYWx1ZVtdO1xuICAgICAgICBpZiAoYy50eXBlID09PSAnbm8nKSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGAke3RoaXMuZGF0YVNvdXJjZS5nZXROb0luZGV4KGksIGMsIGlkeCl9YDtcbiAgICAgICAgICB2YWx1ZXNbYy5fX3BvaW50IV0gPSB7XG4gICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgX3RleHQ6IHRleHQsXG4gICAgICAgICAgICBvcmc6IGlkeCxcbiAgICAgICAgICAgIHNhZmVUeXBlOiAndGV4dCdcbiAgICAgICAgICB9IGFzIF9TVERhdGFWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbYy5fX3BvaW50IV0ucHJvcHMgPSB0aGlzLmRhdGFTb3VyY2UuZ2V0Q2VsbChjLCBpLCBpZHgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHJvd3MgaW4gdGhlIHRhYmxlLCBsaWtlIHRoaXM6XG4gICAqXG4gICAqIGBgYFxuICAgKiB0aGlzLnN0LmFkZFJvdyhzdERhdGFJdGVtKVxuICAgKiBgYGBcbiAgICpcbiAgICogKipUSVBTOioqIERvbid0IGNoYW5nZSB0aGUgYHRvdGFsYCB2YWx1ZSwgaXQgaXMgcmVjb21tZW5kZWQgdG8gdXNlIHRoZSBgcmVsb2FkYCBtZXRob2QgaWYgbmVlZGVkXG4gICAqL1xuICBhZGRSb3coZGF0YTogU1REYXRhIHwgU1REYXRhW10sIG9wdGlvbnM/OiB7IGluZGV4PzogbnVtYmVyIH0pOiB0aGlzIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIGRhdGEgPSBbZGF0YV07XG4gICAgdGhpcy5fZGF0YS5zcGxpY2Uob3B0aW9ucz8uaW5kZXggPz8gMCwgMCwgLi4uKGRhdGEgYXMgU1REYXRhW10pKTtcbiAgICByZXR1cm4gdGhpcy5vcHRpbWl6ZURhdGEoKS5fcmVmQ29sQW5kRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHJvdyBpbiB0aGUgdGFibGUsIGxpa2UgdGhpczpcbiAgICpcbiAgICogYGBgXG4gICAqIHRoaXMuc3QucmVtb3ZlUm93KDApXG4gICAqIHRoaXMuc3QucmVtb3ZlUm93KHN0RGF0YUl0ZW0pXG4gICAqIGBgYFxuICAgKlxuICAgKiAqKlRJUFM6KiogRG9uJ3QgY2hhbmdlIHRoZSBgdG90YWxgIHZhbHVlLCBpdCBpcyByZWNvbW1lbmRlZCB0byB1c2UgdGhlIGByZWxvYWRgIG1ldGhvZCBpZiBuZWVkZWRcbiAgICovXG4gIHJlbW92ZVJvdyhkYXRhOiBTVERhdGEgfCBTVERhdGFbXSB8IG51bWJlcik6IHRoaXMge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2RhdGEuc3BsaWNlKGRhdGEsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VyRGF0YSA9IHRoaXMuX2RhdGE7XG4gICAgICBmb3IgKHZhciBpID0gY3VyRGF0YS5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgIGlmIChkYXRhLmluZGV4T2YoY3VyRGF0YVtpXSkgIT09IC0xKSB7XG4gICAgICAgICAgY3VyRGF0YS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlZkNoZWNrKCkuX3JlZkNvbEFuZERhdGEoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSByb3cgdmFsdWUgZm9yIHRoZSBgaW5kZXhgIGluIHRoZSB0YWJsZSwgbGlrZSB0aGlzOlxuICAgKlxuICAgKiAtIGBvcHRpbm9zLnJlZnJlc2hTY2hlbWFgIFdoZXRoZXIgdG8gcmVmcmVzaCBvZiBzdCBzY2hlbWFzXG4gICAqIC0gYG9wdGlub3MuZW1pdFJlbG9hZGAgV2hldGhlciB0byB0cmlnZ2VyIGEgcmVsb2FkIGh0dHAgcmVxdWVzdCB3aGVuIGRhdGEgaXMgdXJsXG4gICAqXG4gICAqIGBgYFxuICAgKiB0aGlzLnN0LnNldFJvdygwLCB7IHByaWNlOiAxMDAgfSlcbiAgICogdGhpcy5zdC5zZXRSb3coMCwgeyBwcmljZTogMTAwLCBuYW1lOiAnYXNkZicgfSlcbiAgICogdGhpcy5zdC5zZXRSb3coaXRlbSwgeyBwcmljZTogMTAwIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgc2V0Um93KGluZGV4OiBudW1iZXIgfCBTVERhdGEsIGl0ZW06IFNURGF0YSwgb3B0aW9ucz86IHsgcmVmcmVzaFNjaGVtYT86IGJvb2xlYW47IGVtaXRSZWxvYWQ/OiBib29sZWFuIH0pOiB0aGlzIHtcbiAgICBvcHRpb25zID0geyByZWZyZXNoU2NoZW1hOiBmYWxzZSwgZW1pdFJlbG9hZDogZmFsc2UsIC4uLm9wdGlvbnMgfTtcbiAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgICAgaW5kZXggPSB0aGlzLl9kYXRhLmluZGV4T2YoaW5kZXgpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRhW2luZGV4XSA9IGRlZXBNZXJnZUtleSh0aGlzLl9kYXRhW2luZGV4XSwgZmFsc2UsIGl0ZW0pO1xuICAgIHRoaXMub3B0aW1pemVEYXRhKCk7XG4gICAgaWYgKG9wdGlvbnMucmVmcmVzaFNjaGVtYSkge1xuICAgICAgdGhpcy5yZXNldENvbHVtbnMoeyBlbWl0UmVsb2FkOiBvcHRpb25zLmVtaXRSZWxvYWQgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaERhdGEoKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHNvcnRcblxuICBzb3J0KGNvbDogX1NUQ29sdW1uLCB2YWx1ZTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubXVsdGlTb3J0KSB7XG4gICAgICBjb2wuX3NvcnQuZGVmYXVsdCA9IHZhbHVlO1xuICAgICAgY29sLl9zb3J0LnRpY2sgPSB0aGlzLmRhdGFTb3VyY2UubmV4dFNvcnRUaWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkZXJzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgcm93LmZvckVhY2goaXRlbSA9PiAoaXRlbS5jb2x1bW4uX3NvcnQuZGVmYXVsdCA9IGl0ZW0uY29sdW1uID09PSBjb2wgPyB2YWx1ZSA6IG51bGwpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5sb2FkUGFnZURhdGEoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0ge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgbWFwOiB0aGlzLmRhdGFTb3VyY2UuZ2V0UmVxU29ydE1hcCh0aGlzLnNpbmdsZVNvcnQsIHRoaXMubXVsdGlTb3J0LCB0aGlzLl9oZWFkZXJzKSxcbiAgICAgICAgY29sdW1uOiBjb2xcbiAgICAgIH07XG4gICAgICB0aGlzLmNoYW5nZUVtaXQoJ3NvcnQnLCByZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJTb3J0KCk6IHRoaXMge1xuICAgIHRoaXMuX2hlYWRlcnMuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgcm93LmZvckVhY2goaXRlbSA9PiAoaXRlbS5jb2x1bW4uX3NvcnQuZGVmYXVsdCA9IG51bGwpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGZpbHRlclxuXG4gIF9oYW5kbGVGaWx0ZXIoY29sOiBfU1RDb2x1bW4sIGNvbmZpcm06IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWNvbmZpcm0pIHtcbiAgICAgIHRoaXMuY29sdW1uU291cmNlLmNsZWFuRmlsdGVyKGNvbCk7XG4gICAgfVxuICAgIC8vIOi/h+a7pOihqOekuuS4gOenjeaVsOaNrueahOWPmOWMluW6lOmHjee9rumhteeggeS4uiBgMWBcbiAgICB0aGlzLnBpID0gMTtcbiAgICB0aGlzLmNvbHVtblNvdXJjZS51cGRhdGVEZWZhdWx0KGNvbC5maWx0ZXIhKTtcbiAgICB0aGlzLmxvYWRQYWdlRGF0YSgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoYW5nZUVtaXQoJ2ZpbHRlcicsIGNvbCkpO1xuICB9XG5cbiAgaGFuZGxlRmlsdGVyTm90aWZ5KHZhbHVlPzogdW5rbm93bik6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlRW1pdCgnZmlsdGVyQ2hhbmdlJywgdmFsdWUpO1xuICB9XG5cbiAgY2xlYXJGaWx0ZXIoKTogdGhpcyB7XG4gICAgdGhpcy5fY29sdW1ucy5maWx0ZXIodyA9PiB3LmZpbHRlciAmJiB3LmZpbHRlci5kZWZhdWx0ID09PSB0cnVlKS5mb3JFYWNoKGNvbCA9PiB0aGlzLmNvbHVtblNvdXJjZS5jbGVhbkZpbHRlcihjb2wpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBjaGVja2JveFxuXG4gIC8qKiDmuIXpmaTmiYDmnIkgYGNoZWNrYm94YCAqL1xuICBjbGVhckNoZWNrKCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzLmNoZWNrQWxsKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZkNoZWNrKCk6IHRoaXMge1xuICAgIGNvbnN0IHZhbGlkRGF0YSA9IHRoaXMuX2RhdGEuZmlsdGVyKHcgPT4gIXcuZGlzYWJsZWQpO1xuICAgIGNvbnN0IGNoZWNrZWRMaXN0ID0gdmFsaWREYXRhLmZpbHRlcih3ID0+IHcuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgdGhpcy5fYWxsQ2hlY2tlZCA9IGNoZWNrZWRMaXN0Lmxlbmd0aCA+IDAgJiYgY2hlY2tlZExpc3QubGVuZ3RoID09PSB2YWxpZERhdGEubGVuZ3RoO1xuICAgIGNvbnN0IGFsbFVuQ2hlY2tlZCA9IHZhbGlkRGF0YS5ldmVyeSh2YWx1ZSA9PiAhdmFsdWUuY2hlY2tlZCk7XG4gICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9ICF0aGlzLl9hbGxDaGVja2VkICYmICFhbGxVbkNoZWNrZWQ7XG4gICAgdGhpcy5fYWxsQ2hlY2tlZERpc2FibGVkID0gdGhpcy5fZGF0YS5sZW5ndGggPT09IHRoaXMuX2RhdGEuZmlsdGVyKHcgPT4gdy5kaXNhYmxlZCkubGVuZ3RoO1xuICAgIHJldHVybiB0aGlzLmNkKCk7XG4gIH1cblxuICBjaGVja0FsbChjaGVja2VkPzogYm9vbGVhbik6IHRoaXMge1xuICAgIGNoZWNrZWQgPSB0eXBlb2YgY2hlY2tlZCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLl9hbGxDaGVja2VkIDogY2hlY2tlZDtcbiAgICB0aGlzLl9kYXRhLmZpbHRlcih3ID0+ICF3LmRpc2FibGVkKS5mb3JFYWNoKGkgPT4gKGkuY2hlY2tlZCA9IGNoZWNrZWQpKTtcbiAgICByZXR1cm4gdGhpcy5fcmVmQ2hlY2soKS5fY2hlY2tOb3RpZnkoKS5yZWZyZXNoRGF0YSgpO1xuICB9XG5cbiAgX3Jvd1NlbGVjdGlvbihyb3c6IFNUQ29sdW1uU2VsZWN0aW9uKTogdGhpcyB7XG4gICAgcm93LnNlbGVjdCh0aGlzLl9kYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fcmVmQ2hlY2soKS5fY2hlY2tOb3RpZnkoKTtcbiAgfVxuXG4gIF9jaGVja05vdGlmeSgpOiB0aGlzIHtcbiAgICBjb25zdCByZXMgPSB0aGlzLl9kYXRhLmZpbHRlcih3ID0+ICF3LmRpc2FibGVkICYmIHcuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgdGhpcy5jaGFuZ2VFbWl0KCdjaGVja2JveCcsIHJlcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByYWRpb1xuXG4gIC8qKiDmuIXpmaTmiYDmnIkgYHJhZGlvYCAqL1xuICBjbGVhclJhZGlvKCk6IHRoaXMge1xuICAgIHRoaXMuX2RhdGEuZmlsdGVyKHcgPT4gdy5jaGVja2VkKS5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW0uY2hlY2tlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5jaGFuZ2VFbWl0KCdyYWRpbycsIG51bGwpO1xuICAgIHJldHVybiB0aGlzLnJlZnJlc2hEYXRhKCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgX2hhbmRsZVRkKGV2OiBfU1RUZE5vdGlmeSk6IHZvaWQge1xuICAgIHN3aXRjaCAoZXYudHlwZSkge1xuICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICB0aGlzLl9yZWZDaGVjaygpLl9jaGVja05vdGlmeSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgdGhpcy5jaGFuZ2VFbWl0KCdyYWRpbycsIGV2Lml0ZW0pO1xuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vICNyZWdpb24gZXhwb3J0XG5cbiAgLyoqXG4gICAqIOWvvOWHuuW9k+WJjemhte+8jOehruS/neW3sue7j+azqOWGjCBgWGxzeE1vZHVsZWBcbiAgICpcbiAgICogQHBhcmFtIG5ld0RhdGEg6YeN5paw5oyH5a6a5pWw5o2u77yb6Iul5Li6IGB0cnVlYCDooajnpLrkvb/nlKggYGZpbHRlcmVkRGF0YWAg5pWw5o2uXG4gICAqIEBwYXJhbSBvcHQg6aKd5aSW5Y+C5pWwXG4gICAqL1xuICBleHBvcnQobmV3RGF0YT86IFNURGF0YVtdIHwgdHJ1ZSwgb3B0PzogU1RFeHBvcnRPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgZGF0YSA9IEFycmF5LmlzQXJyYXkobmV3RGF0YSlcbiAgICAgID8gdGhpcy5kYXRhU291cmNlLm9wdGltaXplRGF0YSh7IGNvbHVtbnM6IHRoaXMuX2NvbHVtbnMsIHJlc3VsdDogbmV3RGF0YSB9KVxuICAgICAgOiB0aGlzLl9kYXRhO1xuICAgIChuZXdEYXRhID09PSB0cnVlID8gdGhpcy5maWx0ZXJlZERhdGEgOiBvZihkYXRhKSkuc3Vic2NyaWJlKChyZXM6IFNURGF0YVtdKSA9PlxuICAgICAgdGhpcy5leHBvcnRTcnYuZXhwb3J0KHtcbiAgICAgICAgY29sdW1lbnM6IHRoaXMuX2NvbHVtbnMsXG4gICAgICAgIC4uLm9wdCxcbiAgICAgICAgZGF0YTogcmVzXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZXNpemFibGVcblxuICBjb2xSZXNpemUoeyB3aWR0aCB9OiBOelJlc2l6ZUV2ZW50LCBjb2x1bW46IF9TVENvbHVtbik6IHZvaWQge1xuICAgIGNvbHVtbi53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICB0aGlzLmNoYW5nZUVtaXQoJ3Jlc2l6ZScsIGNvbHVtbik7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBjb250ZXh0bWVudVxuICBvbkNvbnRleHRtZW51KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRleHRtZW51KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgY29sRWwgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0KCdbZGF0YS1jb2wtaW5kZXhdJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKCFjb2xFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb2xJbmRleCA9IE51bWJlcihjb2xFbC5kYXRhc2V0LmNvbEluZGV4KTtcbiAgICBjb25zdCByb3dJbmRleCA9IE51bWJlcigoY29sRWwuY2xvc2VzdCgndHInKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC5pbmRleCk7XG4gICAgY29uc3QgaXNUaXRsZSA9IGlzTmFOKHJvd0luZGV4KTtcbiAgICBjb25zdCBvYnMkID0gdGhpcy5jb250ZXh0bWVudSh7XG4gICAgICBldmVudCxcbiAgICAgIHR5cGU6IGlzVGl0bGUgPyAnaGVhZCcgOiAnYm9keScsXG4gICAgICByb3dJbmRleDogaXNUaXRsZSA/IG51bGwgOiByb3dJbmRleCxcbiAgICAgIGNvbEluZGV4LFxuICAgICAgZGF0YTogaXNUaXRsZSA/IG51bGwgOiB0aGlzLmxpc3Rbcm93SW5kZXhdLFxuICAgICAgY29sdW1uOiB0aGlzLl9jb2x1bW5zW2NvbEluZGV4XVxuICAgIH0pO1xuICAgIChpc09ic2VydmFibGUob2JzJCkgPyBvYnMkIDogb2Yob2JzJCkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIocmVzID0+IHJlcy5sZW5ndGggPiAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLmNvbnRleHRtZW51TGlzdCA9IHJlcy5tYXAoaSA9PiB7XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGkuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBpLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB0aGlzLmNtcz8uY3JlYXRlKGV2ZW50LCB0aGlzLmNvbnRleHRtZW51VHBsKTtcbiAgICAgIH0pO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICBnZXQgY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KCk6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMub3JnVGFibGU/LmNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCBhcyBOelNhZmVBbnk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENvbHVtbnMob3B0aW9ucz86IFNUUmVzZXRDb2x1bW5zT3B0aW9uKTogT2JzZXJ2YWJsZTx0aGlzPiB7XG4gICAgb3B0aW9ucyA9IHsgZW1pdFJlbG9hZDogdHJ1ZSwgcHJlQ2xlYXJEYXRhOiBmYWxzZSwgLi4ub3B0aW9ucyB9O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jb2x1bW5zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5jb2x1bW5zID0gb3B0aW9ucy5jb2x1bW5zO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucGkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBpID0gb3B0aW9ucy5waTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5wcyA9IG9wdGlvbnMucHM7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmVtaXRSZWxvYWQpIHtcbiAgICAgIC8vIFNob3VsZCBjbGVhbiBkYXRhLCBCZWNhdXNlIG9mIGNoYW5naW5nIGNvbHVtbnMgbWF5IGNhdXNlIGluYWNjdXJhdGUgZGF0YVxuICAgICAgb3B0aW9ucy5wcmVDbGVhckRhdGEgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wcmVDbGVhckRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5yZWZyZXNoQ29sdW1ucygpO1xuICAgIGlmIChvcHRpb25zLmVtaXRSZWxvYWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRQYWdlRGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNkKCk7XG4gICAgICByZXR1cm4gb2YodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRDb2x1bW5zKG9wdGlvbnM/OiBTVFJlc2V0Q29sdW1uc09wdGlvbik6IFByb21pc2U8dGhpcz4ge1xuICAgIHJldHVybiBsYXN0VmFsdWVGcm9tKHRoaXMuX3Jlc2V0Q29sdW1ucyhvcHRpb25zKSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDb2x1bW5zKCk6IHRoaXMge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMuY29sdW1uU291cmNlLnByb2Nlc3ModGhpcy5jb2x1bW5zIGFzIF9TVENvbHVtbltdLCB7XG4gICAgICB3aWR0aE1vZGU6IHRoaXMud2lkdGhNb2RlLFxuICAgICAgcmVzaXphYmxlOiB0aGlzLl9yZXNpemFibGUsXG4gICAgICBzYWZlVHlwZTogdGhpcy5jb2cuc2FmZVR5cGUgYXMgU1RDb2x1bW5TYWZlVHlwZVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbHVtbnMgPSByZXMuY29sdW1ucztcbiAgICB0aGlzLl9oZWFkZXJzID0gcmVzLmhlYWRlcnM7XG4gICAgaWYgKHRoaXMuY3VzdG9tV2lkdGhDb25maWcgPT09IGZhbHNlICYmIHJlcy5oZWFkZXJXaWR0aHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fd2lkdGhDb25maWcgPSByZXMuaGVhZGVyV2lkdGhzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgb3B0aW1pemVEYXRhKCk6IHRoaXMge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLmRhdGFTb3VyY2Uub3B0aW1pemVEYXRhKHtcbiAgICAgIGNvbHVtbnM6IHRoaXMuX2NvbHVtbnMsXG4gICAgICByZXN1bHQ6IHRoaXMuX2RhdGEsXG4gICAgICByb3dDbGFzc05hbWU6IHRoaXMucm93Q2xhc3NOYW1lXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHB1cmUgZGF0YSwgYHN0YCBpbnRlcm5hbGx5IG1haW50YWlucyBhIHNldCBvZiBkYXRhIGZvciBjYWNoaW5nLCB0aGlzIHBhcnQgb2YgZGF0YSBtYXkgYWZmZWN0IHRoZSBiYWNrZW5kXG4gICAqXG4gICAqIOi/lOWbnue6r+WHgOaVsOaNru+8jGBzdGAg5YaF6YOo5Lya57u05oqk5LiA57uE55So5LqO57yT5a2Y55qE5pWw5o2u77yM6L+Z6YOo5YiG5pWw5o2u5Y+v6IO95Lya5b2x5ZON5ZCO56uvXG4gICAqL1xuICBwdXJlSXRlbShpdGVtT3JJbmRleDogU1REYXRhIHwgbnVtYmVyKTogU1REYXRhIHwgbnVsbCB7XG4gICAgaWYgKHR5cGVvZiBpdGVtT3JJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGl0ZW1PckluZGV4ID0gdGhpcy5fZGF0YVtpdGVtT3JJbmRleF07XG4gICAgfVxuICAgIGlmICghaXRlbU9ySW5kZXgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb3B5SXRlbSA9IGRlZXBDb3B5KGl0ZW1PckluZGV4KTtcbiAgICBbJ192YWx1ZXMnLCAnX3Jvd0NsYXNzTmFtZSddLmZvckVhY2goa2V5ID0+IGRlbGV0ZSBjb3B5SXRlbVtrZXldKTtcbiAgICByZXR1cm4gY29weUl0ZW07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoQ29sdW1ucygpO1xuICAgIGlmICghdGhpcy5yZXEubGF6eUxvYWQpIHRoaXMubG9hZFBhZ2VEYXRhKCkuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5pbmllZCA9IHRydWU7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtQIGluIGtleW9mIHRoaXNdPzogU2ltcGxlQ2hhbmdlIH0gJiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubG9hZGluZykge1xuICAgICAgdGhpcy5fbG9hZGluZyA9IGNoYW5nZXMubG9hZGluZy5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5pbmllZCkgcmV0dXJuO1xuXG4gICAgaWYgKGNoYW5nZXMuY29sdW1ucykge1xuICAgICAgdGhpcy5yZWZyZXNoQ29sdW1ucygpLm9wdGltaXplRGF0YSgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kYXRhKSB7XG4gICAgICB0aGlzLmxvYWRQYWdlRGF0YSgpLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdC10ZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zdC10ZC5jb21wb25lbnQuaHRtbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTVFRkQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdENvbXAgPSBpbmplY3QoU1RDb21wb25lbnQsIHsgaG9zdDogdHJ1ZSB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXIgPSBpbmplY3QoUm91dGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBtb2RhbEhlbHBlciA9IGluamVjdChNb2RhbEhlbHBlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhd2VySGVscGVyID0gaW5qZWN0KERyYXdlckhlbHBlcik7XG5cbiAgQElucHV0KCkgYyE6IF9TVENvbHVtbjtcbiAgQElucHV0KCkgY0lkeCE6IG51bWJlcjtcbiAgQElucHV0KCkgZGF0YSE6IFNURGF0YVtdO1xuICBASW5wdXQoKSBpITogU1REYXRhO1xuICBASW5wdXQoKSBpbmRleCE6IG51bWJlcjtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG4gPSBuZXcgRXZlbnRFbWl0dGVyPF9TVFRkTm90aWZ5PigpO1xuXG4gIHByaXZhdGUgZ2V0IHJvdXRlclN0YXRlKCk6IHsgcGk6IG51bWJlcjsgcHM6IG51bWJlcjsgdG90YWw6IG51bWJlciB9IHtcbiAgICBjb25zdCB7IHBpLCBwcywgdG90YWwgfSA9IHRoaXMuc3RDb21wO1xuICAgIHJldHVybiB7IHBpLCBwcywgdG90YWwgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVwb3J0KHR5cGU6IF9TVFRkTm90aWZ5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMubi5lbWl0KHsgdHlwZSwgaXRlbTogdGhpcy5pLCBjb2w6IHRoaXMuYyB9KTtcbiAgfVxuXG4gIF9jaGVja2JveCh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaS5jaGVja2VkID0gdmFsdWU7XG4gICAgdGhpcy5yZXBvcnQoJ2NoZWNrYm94Jyk7XG4gIH1cblxuICBfcmFkaW8oKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhLmZpbHRlcih3ID0+ICF3LmRpc2FibGVkKS5mb3JFYWNoKGkgPT4gKGkuY2hlY2tlZCA9IGZhbHNlKSk7XG4gICAgdGhpcy5pLmNoZWNrZWQgPSB0cnVlO1xuICAgIHRoaXMucmVwb3J0KCdyYWRpbycpO1xuICB9XG5cbiAgX2xpbmsoZTogRXZlbnQpOiBib29sZWFuIHtcbiAgICB0aGlzLl9zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgY29uc3QgcmVzID0gdGhpcy5jLmNsaWNrISh0aGlzLmksIHRoaXMuc3RDb21wKTtcbiAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwocmVzLCB7IHN0YXRlOiB0aGlzLnJvdXRlclN0YXRlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfc3RvcFByb3BhZ2F0aW9uKGV2OiBFdmVudCk6IHZvaWQge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBfYnRuKGJ0bjogU1RDb2x1bW5CdXR0b24sIGV2PzogRXZlbnQpOiB2b2lkIHtcbiAgICBldj8uc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgY29nID0gdGhpcy5zdENvbXAuY29nO1xuICAgIGxldCByZWNvcmQgPSB0aGlzLmk7XG4gICAgaWYgKGJ0bi50eXBlID09PSAnbW9kYWwnIHx8IGJ0bi50eXBlID09PSAnc3RhdGljJykge1xuICAgICAgaWYgKGNvZy5tb2RhbCEucHVyZVJlY29hcmQgPT09IHRydWUpIHtcbiAgICAgICAgcmVjb3JkID0gdGhpcy5zdENvbXAucHVyZUl0ZW0ocmVjb3JkKSE7XG4gICAgICB9XG4gICAgICBjb25zdCBtb2RhbCA9IGJ0bi5tb2RhbCE7XG4gICAgICBjb25zdCBvYmogPSB7IFttb2RhbC5wYXJhbXNOYW1lIV06IHJlY29yZCB9O1xuICAgICAgKHRoaXMubW9kYWxIZWxwZXJbYnRuLnR5cGUgPT09ICdtb2RhbCcgPyAnY3JlYXRlJyA6ICdjcmVhdGVTdGF0aWMnXSBhcyBOelNhZmVBbnkpKFxuICAgICAgICBtb2RhbC5jb21wb25lbnQsXG4gICAgICAgIHsgLi4ub2JqLCAuLi4obW9kYWwucGFyYW1zICYmIG1vZGFsLnBhcmFtcyhyZWNvcmQpKSB9LFxuICAgICAgICBkZWVwTWVyZ2VLZXkoe30sIHRydWUsIGNvZy5tb2RhbCwgbW9kYWwpXG4gICAgICApXG4gICAgICAgIC5waXBlKGZpbHRlcih3ID0+IHR5cGVvZiB3ICE9PSAndW5kZWZpbmVkJykpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlczogTnpTYWZlQW55KSA9PiB0aGlzLmJ0bkNhbGxiYWNrKHJlY29yZCwgYnRuLCByZXMpKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGJ0bi50eXBlID09PSAnZHJhd2VyJykge1xuICAgICAgaWYgKGNvZy5kcmF3ZXIhLnB1cmVSZWNvYXJkID09PSB0cnVlKSB7XG4gICAgICAgIHJlY29yZCA9IHRoaXMuc3RDb21wLnB1cmVJdGVtKHJlY29yZCkhO1xuICAgICAgfVxuICAgICAgY29uc3QgZHJhd2VyID0gYnRuLmRyYXdlciE7XG4gICAgICBjb25zdCBvYmogPSB7IFtkcmF3ZXIucGFyYW1zTmFtZSFdOiByZWNvcmQgfTtcbiAgICAgIHRoaXMuZHJhd2VySGVscGVyXG4gICAgICAgIC5jcmVhdGUoXG4gICAgICAgICAgZHJhd2VyLnRpdGxlISxcbiAgICAgICAgICBkcmF3ZXIuY29tcG9uZW50LFxuICAgICAgICAgIHsgLi4ub2JqLCAuLi4oZHJhd2VyLnBhcmFtcyAmJiBkcmF3ZXIucGFyYW1zKHJlY29yZCkpIH0sXG4gICAgICAgICAgZGVlcE1lcmdlS2V5KHt9LCB0cnVlLCBjb2cuZHJhd2VyLCBkcmF3ZXIpXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoZmlsdGVyKHcgPT4gdHlwZW9mIHcgIT09ICd1bmRlZmluZWQnKSlcbiAgICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5idG5DYWxsYmFjayhyZWNvcmQsIGJ0biwgcmVzKSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChidG4udHlwZSA9PT0gJ2xpbmsnKSB7XG4gICAgICBjb25zdCBjbGlja1JlcyA9IHRoaXMuYnRuQ2FsbGJhY2socmVjb3JkLCBidG4pO1xuICAgICAgaWYgKHR5cGVvZiBjbGlja1JlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChjbGlja1JlcywgeyBzdGF0ZTogdGhpcy5yb3V0ZXJTdGF0ZSB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5idG5DYWxsYmFjayhyZWNvcmQsIGJ0bik7XG4gIH1cblxuICBwcml2YXRlIGJ0bkNhbGxiYWNrKHJlY29yZDogU1REYXRhLCBidG46IFNUQ29sdW1uQnV0dG9uLCBtb2RhbD86IE56U2FmZUFueSk6IE56U2FmZUFueSB7XG4gICAgaWYgKCFidG4uY2xpY2spIHJldHVybjtcbiAgICBpZiAodHlwZW9mIGJ0bi5jbGljayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHN3aXRjaCAoYnRuLmNsaWNrKSB7XG4gICAgICAgIGNhc2UgJ2xvYWQnOlxuICAgICAgICAgIHRoaXMuc3RDb21wLmxvYWQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVsb2FkJzpcbiAgICAgICAgICB0aGlzLnN0Q29tcC5yZWxvYWQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ0bi5jbGljayhyZWNvcmQsIG1vZGFsLCB0aGlzLnN0Q29tcCk7XG4gICAgfVxuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgI3RpdGxlVHBsIGxldC1pPlxuICA8c3BhbiBbaW5uZXJIVE1MXT1cImkuX3RleHRcIj48L3NwYW4+XG4gIEBpZiAoaS5vcHRpb25hbCkge1xuICAgIDxzbWFsbCBjbGFzcz1cInN0X19oZWFkLW9wdGlvbmFsXCIgW2lubmVySFRNTF09XCJpLm9wdGlvbmFsXCI+PC9zbWFsbD5cbiAgfVxuICBAaWYgKGkub3B0aW9uYWxIZWxwKSB7XG4gICAgPGkgY2xhc3M9XCJzdF9faGVhZC10aXBcIiBuei10b29sdGlwIFtuelRvb2x0aXBUaXRsZV09XCJpLm9wdGlvbmFsSGVscFwiIG56LWljb24gbnpUeXBlPVwicXVlc3Rpb24tY2lyY2xlXCI+PC9pPlxuICB9XG48L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNjaGtBbGxUcGwgbGV0LWN1c3RvbT5cbiAgPGxhYmVsXG4gICAgbnotY2hlY2tib3hcbiAgICBjbGFzcz1cInN0X19jaGVja2FsbFwiXG4gICAgW256RGlzYWJsZWRdPVwiX2FsbENoZWNrZWREaXNhYmxlZFwiXG4gICAgWyhuZ01vZGVsKV09XCJfYWxsQ2hlY2tlZFwiXG4gICAgW256SW5kZXRlcm1pbmF0ZV09XCJfaW5kZXRlcm1pbmF0ZVwiXG4gICAgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2tBbGwoKVwiXG4gICAgW2NsYXNzLmFudC10YWJsZS1zZWxlY3Rpb24tc2VsZWN0LWFsbC1jdXN0b21dPVwiY3VzdG9tXCJcbiAgPjwvbGFiZWw+XG48L25nLXRlbXBsYXRlPlxuPG56LXRhYmxlXG4gICN0YWJsZVxuICBbbnpEYXRhXT1cIl9kYXRhXCJcbiAgWyhuelBhZ2VJbmRleCldPVwicGlcIlxuICAobnpQYWdlSW5kZXhDaGFuZ2UpPVwiX2NoYW5nZSgncGknKVwiXG4gIFsobnpQYWdlU2l6ZSldPVwicHNcIlxuICAobnpQYWdlU2l6ZUNoYW5nZSk9XCJfY2hhbmdlKCdwcycpXCJcbiAgW256VG90YWxdPVwidG90YWxcIlxuICBbbnpTaG93UGFnaW5hdGlvbl09XCJfaXNQYWdpbmF0aW9uXCJcbiAgW256RnJvbnRQYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgW256Qm9yZGVyZWRdPVwiYm9yZGVyZWRcIlxuICBbbnpTaXplXT1cInNpemVcIlxuICBbbnpMb2FkaW5nXT1cIm5vQ29sdW1ucyB8fCBfbG9hZGluZ1wiXG4gIFtuekxvYWRpbmdEZWxheV09XCJsb2FkaW5nRGVsYXlcIlxuICBbbnpMb2FkaW5nSW5kaWNhdG9yXT1cImxvYWRpbmdJbmRpY2F0b3JcIlxuICBbbnpUaXRsZV09XCJoZWFkZXIhXCJcbiAgW256Rm9vdGVyXT1cImZvb3RlciFcIlxuICBbbnpTY3JvbGxdPVwic2Nyb2xsXCJcbiAgW256VmlydHVhbEl0ZW1TaXplXT1cInZpcnR1YWxJdGVtU2l6ZVwiXG4gIFtuelZpcnR1YWxNYXhCdWZmZXJQeF09XCJ2aXJ0dWFsTWF4QnVmZmVyUHhcIlxuICBbbnpWaXJ0dWFsTWluQnVmZmVyUHhdPVwidmlydHVhbE1pbkJ1ZmZlclB4XCJcbiAgW256VmlydHVhbEZvclRyYWNrQnldPVwidmlydHVhbEZvclRyYWNrQnlcIlxuICBbbnpOb1Jlc3VsdF09XCJub1Jlc3VsdCFcIlxuICBbbnpQYWdlU2l6ZU9wdGlvbnNdPVwicGFnZS5wYWdlU2l6ZXMhXCJcbiAgW256U2hvd1F1aWNrSnVtcGVyXT1cInBhZ2Uuc2hvd1F1aWNrSnVtcGVyXCJcbiAgW256U2hvd1NpemVDaGFuZ2VyXT1cInBhZ2Uuc2hvd1NpemVcIlxuICBbbnpQYWdpbmF0aW9uUG9zaXRpb25dPVwicGFnZS5wb3NpdGlvbiFcIlxuICBbbnpQYWdpbmF0aW9uVHlwZV09XCJwYWdlLnR5cGUhXCJcbiAgW256SXRlbVJlbmRlcl09XCJwYWdlLml0ZW1SZW5kZXIhXCJcbiAgW256U2ltcGxlXT1cInBhZ2Uuc2ltcGxlXCJcbiAgW256U2hvd1RvdGFsXT1cInRvdGFsVHBsXCJcbiAgW256V2lkdGhDb25maWddPVwiX3dpZHRoQ29uZmlnXCJcbiAgKGNvbnRleHRtZW51KT1cIm9uQ29udGV4dG1lbnUoJGV2ZW50KVwiXG4gIFtjbGFzcy5zdF9fbm8tY29sdW1uXT1cIm5vQ29sdW1uc1wiXG4+XG4gIEBpZiAoc2hvd0hlYWRlcikge1xuICAgIDx0aGVhZD5cbiAgICAgIEBmb3IgKHJvdyBvZiBfaGVhZGVyczsgdHJhY2sgcm93KSB7XG4gICAgICAgIDx0cj5cbiAgICAgICAgICBAaWYgKCRmaXJzdCAmJiBleHBhbmQpIHtcbiAgICAgICAgICAgIDx0aCBueldpZHRoPVwiNTBweFwiIFtyb3dTcGFuXT1cIl9oZWFkZXJzLmxlbmd0aFwiPjwvdGg+XG4gICAgICAgICAgfVxuICAgICAgICAgIEBmb3IgKGggb2Ygcm93OyB0cmFjayBoOyBsZXQgaW5kZXggPSAkaW5kZXg7IGxldCBsYXN0ID0gJGxhc3QpIHtcbiAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAqbGV0PVwiaC5jb2x1bW4gYXMgX2NcIlxuICAgICAgICAgICAgICBbY29sU3Bhbl09XCJoLmNvbFNwYW5cIlxuICAgICAgICAgICAgICBbcm93U3Bhbl09XCJoLnJvd1NwYW5cIlxuICAgICAgICAgICAgICBbbnpXaWR0aF09XCIkYW55KF9jKS53aWR0aFwiXG4gICAgICAgICAgICAgIFtuekxlZnRdPVwiX2MuX2xlZnQhXCJcbiAgICAgICAgICAgICAgW256UmlnaHRdPVwiX2MuX3JpZ2h0IVwiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIl9jLl9jbGFzc05hbWVcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWNvbF09XCJfYy5pbmRleEtleVwiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtY29sLWluZGV4XT1cImluZGV4XCJcbiAgICAgICAgICAgICAgW256U2hvd1NvcnRdPVwiX2MuX3NvcnQuZW5hYmxlZFwiXG4gICAgICAgICAgICAgIFtuelNvcnRPcmRlcl09XCIkYW55KF9jKS5fc29ydC5kZWZhdWx0XCJcbiAgICAgICAgICAgICAgKG56U29ydE9yZGVyQ2hhbmdlKT1cInNvcnQoX2MsICRldmVudClcIlxuICAgICAgICAgICAgICBbbnpDdXN0b21GaWx0ZXJdPVwiISFfYy5maWx0ZXJcIlxuICAgICAgICAgICAgICBbY2xhc3Muc3RfX2hhcy1maWx0ZXJdPVwiX2MuZmlsdGVyXCJcbiAgICAgICAgICAgICAgbnotcmVzaXphYmxlXG4gICAgICAgICAgICAgIFtuekRpc2FibGVkXT1cImxhc3QgfHwgJGFueShfYykucmVzaXphYmxlLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgW256TWF4V2lkdGhdPVwiJGFueShfYykucmVzaXphYmxlLm1heFdpZHRoXCJcbiAgICAgICAgICAgICAgW256TWluV2lkdGhdPVwiJGFueShfYykucmVzaXphYmxlLm1pbldpZHRoXCJcbiAgICAgICAgICAgICAgW256Qm91bmRzXT1cIiRhbnkoX2MpLnJlc2l6YWJsZS5ib3VuZHNcIlxuICAgICAgICAgICAgICBbbnpQcmV2aWV3XT1cIiRhbnkoX2MpLnJlc2l6YWJsZS5wcmV2aWV3XCJcbiAgICAgICAgICAgICAgKG56UmVzaXplRW5kKT1cImNvbFJlc2l6ZSgkZXZlbnQsIF9jKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEBpZiAoJGFueSghbGFzdCAmJiAhJGFueShfYykucmVzaXphYmxlLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgICAgIDxuei1yZXNpemUtaGFuZGxlIG56RGlyZWN0aW9uPVwicmlnaHRcIiAoY2xpY2spPVwiX3N0b3BQcm9wYWdhdGlvbigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8aT48L2k+XG4gICAgICAgICAgICAgICAgPC9uei1yZXNpemUtaGFuZGxlPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIEBpZiAoX2MuX19yZW5kZXJUaXRsZSkge1xuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiX2MuX19yZW5kZXJUaXRsZSFcIlxuICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBoLmNvbHVtbiwgaW5kZXg6IGluZGV4IH1cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgICAgIEBzd2l0Y2ggKF9jLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgIEBjYXNlICgnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIEBpZiAoX2Muc2VsZWN0aW9ucyEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNoa0FsbFRwbFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogZmFsc2UgfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdGFibGUtc2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY2hrQWxsVHBsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0cnVlIH1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgQGlmIChfYy5zZWxlY3Rpb25zIS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC10YWJsZS1zZWxlY3Rpb24tZXh0cmFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21MZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJzZWxlY3Rpb25NZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYW50LXRhYmxlLXNlbGVjdGlvbi1kb3duIHN0X19jaGVja2FsbC1zZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZG93blwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjc2VsZWN0aW9uTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBuei1tZW51IGNsYXNzPVwiYW50LXRhYmxlLXNlbGVjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQGZvciAocncgb2YgX2Muc2VsZWN0aW9uczsgdHJhY2sgJGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIChjbGljayk9XCJfcm93U2VsZWN0aW9uKHJ3KVwiIFtpbm5lckhUTUxdPVwicncudGV4dFwiPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBAZGVmYXVsdCB7XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0aXRsZVRwbFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogX2MudGl0bGUgfVwiIC8+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIEBpZiAoX2MuZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgPHN0LWZpbHRlclxuICAgICAgICAgICAgICAgICAgbnotdGgtZXh0cmFcbiAgICAgICAgICAgICAgICAgIFtjb2xdPVwiaC5jb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgW2ZdPVwiX2MuZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICAgIChuKT1cImhhbmRsZUZpbHRlck5vdGlmeSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChoYW5kbGUpPVwiX2hhbmRsZUZpbHRlcihfYywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICB9XG4gICAgICAgIDwvdHI+XG4gICAgICB9XG4gICAgPC90aGVhZD5cbiAgfVxuICA8dGJvZHkgY2xhc3M9XCJzdF9fYm9keVwiPlxuICAgIEBpZiAoIV9sb2FkaW5nKSB7XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYm9keUhlYWRlciFcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IF9zdGF0aXN0aWNhbCB9XCIgLz5cbiAgICB9XG4gICAgPG5nLXRlbXBsYXRlICNib2R5VHBsIGxldC1pIGxldC1pbmRleD1cImluZGV4XCI+XG4gICAgICA8dHJcbiAgICAgICAgW2F0dHIuZGF0YS1pbmRleF09XCJpbmRleFwiXG4gICAgICAgIChjbGljayk9XCJfcm93Q2xpY2soJGV2ZW50LCBpLCBpbmRleCwgZmFsc2UpXCJcbiAgICAgICAgKGRibGNsaWNrKT1cIl9yb3dDbGljaygkZXZlbnQsIGksIGluZGV4LCB0cnVlKVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImkuX3Jvd0NsYXNzTmFtZVwiXG4gICAgICA+XG4gICAgICAgIEBpZiAoZXhwYW5kKSB7XG4gICAgICAgICAgPHRkXG4gICAgICAgICAgICBbbnpTaG93RXhwYW5kXT1cImV4cGFuZCAmJiBpLnNob3dFeHBhbmQgIT09IGZhbHNlXCJcbiAgICAgICAgICAgIFtuekV4cGFuZF09XCJpLmV4cGFuZFwiXG4gICAgICAgICAgICBbbnpFeHBhbmRJY29uXT1cImV4cGFuZEljb24gPyB3cmFwRXhwYW5kSWNvbiA6IG51bGxcIlxuICAgICAgICAgICAgKG56RXhwYW5kQ2hhbmdlKT1cIl9leHBhbmRDaGFuZ2UoaSwgJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiX3N0b3BQcm9wYWdhdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgIG56V2lkdGg9XCI1MHB4XCJcbiAgICAgICAgICA+PC90ZD5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3dyYXBFeHBhbmRJY29uPlxuICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cIl9leHBhbmRDaGFuZ2UoaSwgIWkuZXhwYW5kKVwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZXhwYW5kSWNvblwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogaSwgaW5kZXg6IGluZGV4IH1cIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIH1cbiAgICAgICAgQGZvciAoYyBvZiBfY29sdW1uczsgdHJhY2sgY0lkeDsgbGV0IGNJZHggPSAkaW5kZXgpIHtcbiAgICAgICAgICBAaWYgKGkuX3ZhbHVlc1tjSWR4XS5wcm9wcz8uY29sU3BhbiA+IDAgJiYgaS5fdmFsdWVzW2NJZHhdLnByb3BzPy5yb3dTcGFuID4gMCkge1xuICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgIFtuekxlZnRdPVwiISFjLl9sZWZ0XCJcbiAgICAgICAgICAgICAgW256UmlnaHRdPVwiISFjLl9yaWdodFwiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtY29sLWluZGV4XT1cImNJZHhcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJjLl9jbGFzc05hbWVcIlxuICAgICAgICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImkuX3ZhbHVlc1tjSWR4XS5wcm9wcz8uY29sU3BhbiA9PT0gMSA/IG51bGwgOiBpLl92YWx1ZXNbY0lkeF0ucHJvcHM/LmNvbFNwYW5cIlxuICAgICAgICAgICAgICBbYXR0ci5yb3dzcGFuXT1cImkuX3ZhbHVlc1tjSWR4XS5wcm9wcz8ucm93U3BhbiA9PT0gMSA/IG51bGwgOiBpLl92YWx1ZXNbY0lkeF0ucHJvcHM/LnJvd1NwYW5cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBAaWYgKHJlc3BvbnNpdmUpIHtcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC10YWJsZS1yZXBfX3RpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGl0bGVUcGxcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGMudGl0bGUgfVwiIC8+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDxzdC10ZCBbZGF0YV09XCJfZGF0YVwiIFtpXT1cImlcIiBbaW5kZXhdPVwiaW5kZXhcIiBbY109XCJjXCIgW2NJZHhdPVwiY0lkeFwiIChuKT1cIl9oYW5kbGVUZCgkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA8L3RyPlxuICAgICAgPHRyIFtuekV4cGFuZF09XCJpLmV4cGFuZFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZXhwYW5kXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpLCBpbmRleDogaW5kZXggfVwiIC8+XG4gICAgICA8L3RyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgQGlmICh2aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICA8bmctdGVtcGxhdGUgbnotdmlydHVhbC1zY3JvbGwgbGV0LWkgbGV0LWluZGV4PVwiaW5kZXhcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJvZHlUcGxcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGksIGluZGV4OiBpbmRleCB9XCIgLz5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgfSBAZWxzZSB7XG4gICAgICBAZm9yIChpIG9mIF9kYXRhOyB0cmFjayB0cmFja0J5KCRpbmRleCwgaSkpIHtcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJvZHlUcGxcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGksIGluZGV4OiAkaW5kZXggfVwiIC8+XG4gICAgICB9XG4gICAgfVxuICAgIEBpZiAoIV9sb2FkaW5nKSB7XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYm9keSFcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IF9zdGF0aXN0aWNhbCB9XCIgLz5cbiAgICB9XG4gIDwvdGJvZHk+XG4gIDxuZy10ZW1wbGF0ZSAjdG90YWxUcGwgbGV0LXJhbmdlPVwicmFuZ2VcIiBsZXQtdG90YWw+e3sgcmVuZGVyVG90YWwodG90YWwsIHJhbmdlKSB9fTwvbmctdGVtcGxhdGU+XG48L256LXRhYmxlPlxuPG56LWRyb3Bkb3duLW1lbnUgI2NvbnRleHRtZW51VHBsPVwibnpEcm9wZG93bk1lbnVcIj5cbiAgPHVsIG56LW1lbnUgY2xhc3M9XCJzdF9fY29udGV4dG1lbnVcIj5cbiAgICBAZm9yIChpIG9mIGNvbnRleHRtZW51TGlzdDsgdHJhY2sgJGluZGV4KSB7XG4gICAgICBAaWYgKGkuY2hpbGRyZW4hLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICA8bGkgbnotbWVudS1pdGVtIChjbGljayk9XCJpLmZuIShpKVwiIFtpbm5lckhUTUxdPVwiaS50ZXh0XCI+PC9saT5cbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICA8bGkgbnotc3VibWVudSBbbnpUaXRsZV09XCJpLnRleHRcIj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICBAZm9yIChjaSBvZiBpLmNoaWxkcmVuOyB0cmFjayAkaW5kZXgpIHtcbiAgICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSAoY2xpY2spPVwiY2kuZm4hKGNpKVwiIFtpbm5lckhUTUxdPVwiY2kudGV4dFwiPjwvbGk+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9saT5cbiAgICAgIH1cbiAgICB9XG4gIDwvdWw+XG48L256LWRyb3Bkb3duLW1lbnU+XG4iLCI8bmctdGVtcGxhdGUgI2J0blRwbCBsZXQtaSBsZXQtY2hpbGQ9XCJjaGlsZFwiPlxuICBAaWYgKGkudG9vbHRpcCkge1xuICAgIDxzcGFuIG56LXRvb2x0aXAgW256VG9vbHRpcFRpdGxlXT1cImkudG9vbHRpcFwiIFtjbGFzcy5kLWJsb2NrXT1cImNoaWxkXCIgW2NsYXNzLndpZHRoLTEwMF09XCJjaGlsZFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJ0bkl0ZW1UcGxcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGkgfVwiIC8+XG4gICAgPC9zcGFuPlxuICB9IEBlbHNlIHtcbiAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYnRuSXRlbVRwbFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogaSB9XCIgLz5cbiAgfVxuPC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjYnRuSXRlbVRwbCBsZXQtaT5cbiAgQGlmIChpLnBvcCkge1xuICAgIDxhXG4gICAgICBuei1wb3Bjb25maXJtXG4gICAgICBbbnpQb3Bjb25maXJtVGl0bGVdPVwiaS5wb3AudGl0bGVcIlxuICAgICAgW256SWNvbl09XCJpLnBvcC5pY29uXCJcbiAgICAgIFtuekNvbmRpdGlvbl09XCJpLnBvcC5jb25kaXRpb24oaSlcIlxuICAgICAgW256Q2FuY2VsVGV4dF09XCJpLnBvcC5jYW5jZWxUZXh0XCJcbiAgICAgIFtuek9rVGV4dF09XCJpLnBvcC5va1RleHRcIlxuICAgICAgW256T2tUeXBlXT1cImkucG9wLm9rVHlwZVwiXG4gICAgICAobnpPbkNvbmZpcm0pPVwiX2J0bihpKVwiXG4gICAgICBjbGFzcz1cInN0X19idG4tdGV4dFwiXG4gICAgICBbbmdDbGFzc109XCJpLl9jbGFzc05hbWVcIlxuICAgICAgKGNsaWNrKT1cIl9zdG9wUHJvcGFnYXRpb24oJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJ0blRleHRUcGxcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGkgfVwiIC8+XG4gICAgPC9hPlxuICB9IEBlbHNlIHtcbiAgICA8YSAoY2xpY2spPVwiX2J0bihpLCAkZXZlbnQpXCIgY2xhc3M9XCJzdF9fYnRuLXRleHRcIiBbbmdDbGFzc109XCJpLl9jbGFzc05hbWVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJidG5UZXh0VHBsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpIH1cIiAvPlxuICAgIDwvYT5cbiAgfVxuPC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjYnRuVGV4dFRwbCBsZXQtaT5cbiAgQGlmIChpLl9pY29uKSB7XG4gICAgQGlmIChpLl9pY29uLmljb25mb250KSB7XG4gICAgICA8aSBuei1pY29uIFtuekljb25mb250XT1cImkuX2ljb24uaWNvbmZvbnRcIj48L2k+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8aVxuICAgICAgICBuei1pY29uXG4gICAgICAgIFtuelR5cGVdPVwiaS5faWNvbi50eXBlXCJcbiAgICAgICAgW256VGhlbWVdPVwiaS5faWNvbi50aGVtZVwiXG4gICAgICAgIFtuelNwaW5dPVwiaS5faWNvbi5zcGluXCJcbiAgICAgICAgW256VHdvdG9uZUNvbG9yXT1cImkuX2ljb24udHdvVG9uZUNvbG9yXCJcbiAgICAgID48L2k+XG4gICAgfVxuICB9XG4gIDxzcGFuIFtpbm5lckhUTUxdPVwiaS5fdGV4dFwiIFtuZ0NsYXNzXT1cInsgJ3BsLXhzJzogaS5faWNvbiB9XCI+PC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbkBpZiAoYy5fX3JlbmRlcikge1xuICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYy5fX3JlbmRlciFcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGksIGluZGV4OiBpbmRleCwgY29sdW1uOiBjIH1cIiAvPlxufSBAZWxzZSB7XG4gIEBzd2l0Y2ggKGMudHlwZSkge1xuICAgIEBjYXNlICgnY2hlY2tib3gnKSB7XG4gICAgICA8bGFiZWwgbnotY2hlY2tib3ggW256RGlzYWJsZWRdPVwiaS5kaXNhYmxlZFwiIFtuZ01vZGVsXT1cImkuY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cIl9jaGVja2JveCgkZXZlbnQpXCI+PC9sYWJlbD5cbiAgICB9XG4gICAgQGNhc2UgKCdyYWRpbycpIHtcbiAgICAgIDxsYWJlbCBuei1yYWRpbyBbbnpEaXNhYmxlZF09XCJpLmRpc2FibGVkXCIgW25nTW9kZWxdPVwiaS5jaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiX3JhZGlvKClcIj48L2xhYmVsPlxuICAgIH1cbiAgICBAY2FzZSAoJ2xpbmsnKSB7XG4gICAgICA8YSAoY2xpY2spPVwiX2xpbmsoJGV2ZW50KVwiIFtpbm5lckhUTUxdPVwiaS5fdmFsdWVzW2NJZHhdLl90ZXh0XCIgW2F0dHIudGl0bGVdPVwiaS5fdmFsdWVzW2NJZHhdLnRleHRcIj48L2E+XG4gICAgfVxuICAgIEBjYXNlICgndGFnJykge1xuICAgICAgPG56LXRhZyBbbnpDb2xvcl09XCJpLl92YWx1ZXNbY0lkeF0uY29sb3JcIiBbbnotdG9vbHRpcF09XCJpLl92YWx1ZXNbY0lkeF0udG9vbHRpcFwiPlxuICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImkuX3ZhbHVlc1tjSWR4XS5fdGV4dFwiPjwvc3Bhbj5cbiAgICAgIDwvbnotdGFnPlxuICAgIH1cbiAgICBAY2FzZSAoJ2JhZGdlJykge1xuICAgICAgPG56LWJhZGdlXG4gICAgICAgIFtuelN0YXR1c109XCJpLl92YWx1ZXNbY0lkeF0uY29sb3JcIlxuICAgICAgICBbbnpUZXh0XT1cImkuX3ZhbHVlc1tjSWR4XS50ZXh0XCJcbiAgICAgICAgW256LXRvb2x0aXBdPVwiaS5fdmFsdWVzW2NJZHhdLnRvb2x0aXBcIlxuICAgICAgLz5cbiAgICB9XG4gICAgQGNhc2UgKCdjZWxsJykge1xuICAgICAgPGNlbGwgW3ZhbHVlXT1cImkuX3ZhbHVlc1tjSWR4XS50ZXh0XCIgW29wdGlvbnNdPVwiaS5fdmFsdWVzW2NJZHhdLmNlbGwgPz8gYy5jZWxsXCIgLz5cbiAgICB9XG4gICAgQGNhc2UgKCd3aWRnZXQnKSB7XG4gICAgICA8bmctdGVtcGxhdGUgc3Qtd2lkZ2V0LWhvc3QgW3JlY29yZF09XCJpXCIgW2NvbHVtbl09XCJjXCIgLz5cbiAgICB9XG4gICAgQGRlZmF1bHQge1xuICAgICAgQGlmIChjLnNhZmVUeXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgPHNwYW4gW2lubmVyVGV4dF09XCJpLl92YWx1ZXNbY0lkeF0uX3RleHRcIiBbYXR0ci50aXRsZV09XCJjLl9pc1RydW5jYXRlID8gaS5fdmFsdWVzW2NJZHhdLnRleHQgOiBudWxsXCI+PC9zcGFuPlxuICAgICAgfSBAZWxzZSB7XG4gICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiaS5fdmFsdWVzW2NJZHhdLl90ZXh0XCIgW2F0dHIudGl0bGVdPVwiYy5faXNUcnVuY2F0ZSA/IGkuX3ZhbHVlc1tjSWR4XS50ZXh0IDogbnVsbFwiPjwvc3Bhbj5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQGZvciAoYnRuIG9mIGkuX3ZhbHVlc1tjSWR4XS5idXR0b25zOyB0cmFjayAkaW5kZXgpIHtcbiAgICBAaWYgKGJ0bi5jaGlsZHJlbiEubGVuZ3RoID4gMCkge1xuICAgICAgPGEgbnotZHJvcGRvd24gW256RHJvcGRvd25NZW51XT1cImJ0bk1lbnVcIiBuek92ZXJsYXlDbGFzc05hbWU9XCJzdF9fYnRuLXN1YlwiPlxuICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImJ0bi5fdGV4dFwiPjwvc3Bhbj5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9pPlxuICAgICAgPC9hPlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI2J0bk1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8dWwgbnotbWVudT5cbiAgICAgICAgICBAZm9yIChzdWJCdG4gb2YgYnRuLmNoaWxkcmVuOyB0cmFjayAkaW5kZXgpIHtcbiAgICAgICAgICAgIEBpZiAoc3ViQnRuLnR5cGUgPT09ICdkaXZpZGVyJykge1xuICAgICAgICAgICAgICA8bGkgbnotbWVudS1kaXZpZGVyPjwvbGk+XG4gICAgICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSBbY2xhc3Muc3RfX2J0bi1kaXNhYmxlZF09XCJzdWJCdG4uX2Rpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJidG5UcGxcIlxuICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBzdWJCdG4sIGNoaWxkOiB0cnVlIH1cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIH0gQGVsc2Uge1xuICAgICAgPHNwYW4gW2NsYXNzLnN0X19idG4tZGlzYWJsZWRdPVwiYnRuLl9kaXNhYmxlZFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiYnRuVHBsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBidG4sIGNoaWxkOiBmYWxzZSB9XCIgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICB9XG4gICAgQGlmICghJGxhc3QpIHtcbiAgICAgIDxuei1kaXZpZGVyIG56VHlwZT1cInZlcnRpY2FsXCIgLz5cbiAgICB9XG4gIH1cbn1cbiJdfQ==