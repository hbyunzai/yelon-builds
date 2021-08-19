import { DecimalPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe, YNPipe, _HttpClient } from '@yelon/theme';
import { CurrencyService } from '@yelon/util/format';
import { deepCopy, deepGet } from '@yelon/util/other';
export class STDataSource {
    constructor(http, datePipe, ynPipe, numberPipe, currencySrv, dom) {
        this.http = http;
        this.datePipe = datePipe;
        this.ynPipe = ynPipe;
        this.numberPipe = numberPipe;
        this.currencySrv = currencySrv;
        this.dom = dom;
        this.sortTick = 0;
    }
    process(options) {
        let data$;
        let isRemote = false;
        const { data, res, total, page, pi, ps, paginator, columns } = options;
        let retTotal;
        let retPs;
        let retList;
        let retPi;
        let rawData;
        let showPage = page.show;
        if (typeof data === 'string') {
            isRemote = true;
            data$ = this.getByRemote(data, options).pipe(map(result => {
                rawData = result;
                let ret;
                if (Array.isArray(result)) {
                    ret = result;
                    retTotal = ret.length;
                    retPs = retTotal;
                    showPage = false;
                }
                else {
                    // list
                    ret = deepGet(result, res.reName.list, []);
                    if (ret == null || !Array.isArray(ret)) {
                        ret = [];
                    }
                    // total
                    const resultTotal = res.reName.total && deepGet(result, res.reName.total, null);
                    retTotal = resultTotal == null ? total || 0 : +resultTotal;
                }
                return deepCopy(ret);
            }));
        }
        else if (Array.isArray(data)) {
            data$ = of(data);
        }
        else {
            // a cold observable
            data$ = data;
        }
        if (!isRemote) {
            data$ = data$.pipe(
            // sort
            map((result) => {
                rawData = result;
                let copyResult = deepCopy(result);
                const sorterFn = this.getSorterFn(columns);
                if (sorterFn) {
                    copyResult = copyResult.sort(sorterFn);
                }
                return copyResult;
            }), 
            // filter
            map((result) => {
                columns
                    .filter(w => w.filter)
                    .forEach(c => {
                    const filter = c.filter;
                    const values = this.getFilteredData(filter);
                    if (values.length === 0)
                        return;
                    const onFilter = filter.fn;
                    if (typeof onFilter !== 'function') {
                        console.warn(`[st] Muse provide the fn function in filter`);
                        return;
                    }
                    result = result.filter(record => values.some(v => onFilter(v, record)));
                });
                return result;
            }), 
            // paging
            map((result) => {
                if (paginator && page.front) {
                    const maxPageIndex = Math.ceil(result.length / ps);
                    retPi = Math.max(1, pi > maxPageIndex ? maxPageIndex : pi);
                    retTotal = result.length;
                    if (page.show === true) {
                        return result.slice((retPi - 1) * ps, retPi * ps);
                    }
                }
                return result;
            }));
        }
        // pre-process
        if (typeof res.process === 'function') {
            data$ = data$.pipe(map(result => res.process(result, rawData)));
        }
        data$ = data$.pipe(map(result => this.optimizeData({ result, columns, rowClassName: options.rowClassName })));
        return data$.pipe(map(result => {
            retList = result;
            const realTotal = retTotal || total;
            const realPs = retPs || ps;
            return {
                pi: retPi,
                ps: retPs,
                total: retTotal,
                list: retList,
                statistical: this.genStatistical(columns, retList, rawData),
                pageShow: typeof showPage === 'undefined' ? realTotal > realPs : showPage
            };
        }));
    }
    get(item, col, idx) {
        var _a;
        try {
            const safeHtml = col.safeType === 'safeHtml';
            if (col.format) {
                const formatRes = col.format(item, col, idx) || '';
                return {
                    text: formatRes,
                    _text: safeHtml ? this.dom.bypassSecurityTrustHtml(formatRes) : formatRes,
                    org: formatRes,
                    safeType: col.safeType
                };
            }
            const value = deepGet(item, col.index, col.default);
            let text = value;
            let color;
            switch (col.type) {
                case 'no':
                    text = this.getNoIndex(item, col, idx);
                    break;
                case 'img':
                    text = value ? `<img src="${value}" class="img">` : '';
                    break;
                case 'number':
                    text = this.numberPipe.transform(value, col.numberDigits);
                    break;
                case 'currency':
                    text = this.currencySrv.format(value, (_a = col.currency) === null || _a === void 0 ? void 0 : _a.format);
                    break;
                case 'date':
                    text = value === col.default ? col.default : this.datePipe.transform(value, col.dateFormat);
                    break;
                case 'yn':
                    text = this.ynPipe.transform(value === col.yn.truth, col.yn.yes, col.yn.no, col.yn.mode, false);
                    break;
                case 'enum':
                    text = col.enum[value];
                    break;
                case 'tag':
                case 'badge':
                    const data = col.type === 'tag' ? col.tag : col.badge;
                    if (data && data[text]) {
                        const dataItem = data[text];
                        text = dataItem.text;
                        color = dataItem.color;
                    }
                    else {
                        text = '';
                    }
                    break;
            }
            if (text == null)
                text = '';
            return {
                text,
                _text: safeHtml ? this.dom.bypassSecurityTrustHtml(text) : text,
                org: value,
                color,
                safeType: col.safeType,
                buttons: []
            };
        }
        catch (ex) {
            const text = `INVALID DATA`;
            console.error(`Failed to get data`, item, col, ex);
            return { text, _text: text, org: text, buttons: [], safeType: 'text' };
        }
    }
    getByRemote(url, options) {
        const { req, page, paginator, pi, ps, singleSort, multiSort, columns } = options;
        const method = (req.method || 'GET').toUpperCase();
        let params = {};
        const reName = req.reName;
        if (paginator) {
            if (req.type === 'page') {
                params = {
                    [reName.pi]: page.zeroIndexed ? pi - 1 : pi,
                    [reName.ps]: ps
                };
            }
            else {
                params = {
                    [reName.skip]: (pi - 1) * ps,
                    [reName.limit]: ps
                };
            }
        }
        params = Object.assign(Object.assign(Object.assign(Object.assign({}, params), req.params), this.getReqSortMap(singleSort, multiSort, columns)), this.getReqFilterMap(columns));
        let reqOptions = {
            params,
            body: req.body,
            headers: req.headers
        };
        if (method === 'POST' && req.allInBody === true) {
            reqOptions = {
                body: Object.assign(Object.assign({}, req.body), params),
                headers: req.headers
            };
        }
        if (typeof req.process === 'function') {
            reqOptions = req.process(reqOptions);
        }
        if (!(reqOptions.params instanceof HttpParams)) {
            reqOptions.params = new HttpParams({ fromObject: reqOptions.params });
        }
        if (typeof options.customRequest === 'function') {
            return options.customRequest({ method, url, options: reqOptions });
        }
        return this.http.request(method, url, reqOptions);
    }
    optimizeData(options) {
        const { result, columns, rowClassName } = options;
        for (let i = 0, len = result.length; i < len; i++) {
            result[i]._values = columns.map(c => {
                if (Array.isArray(c.buttons) && c.buttons.length > 0) {
                    return { buttons: this.genButtons(c.buttons, result[i], c), _text: '' };
                }
                return this.get(result[i], c, i);
            });
            if (rowClassName) {
                result[i]._rowClassName = rowClassName(result[i], i);
            }
        }
        return result;
    }
    getNoIndex(item, col, idx) {
        return typeof col.noIndex === 'function' ? col.noIndex(item, col, idx) : col.noIndex + idx;
    }
    genButtons(_btns, item, col) {
        const fn = (btns) => {
            return deepCopy(btns).filter(btn => {
                const result = btn.iif(item, btn, col);
                const isRenderDisabled = btn.iifBehavior === 'disabled';
                btn._result = result;
                btn._disabled = !result && isRenderDisabled;
                if (btn.children.length > 0) {
                    btn.children = fn(btn.children);
                }
                delete btn.iif;
                return result || isRenderDisabled;
            });
        };
        const res = fn(_btns);
        const fnText = (btns) => {
            for (const btn of btns) {
                btn._text = typeof btn.text === 'function' ? btn.text(item, btn) : btn.text || '';
                if (btn.children.length > 0) {
                    btn.children = fnText(btn.children);
                }
            }
            return btns;
        };
        return fnText(res);
    }
    // #region sort
    getValidSort(columns) {
        return columns.filter(item => item._sort && item._sort.enabled && item._sort.default).map(item => item._sort);
    }
    getSorterFn(columns) {
        const sortList = this.getValidSort(columns);
        if (sortList.length === 0) {
            return;
        }
        const sortItem = sortList[0];
        if (sortItem.compare === null) {
            return;
        }
        if (typeof sortItem.compare !== 'function') {
            console.warn(`[st] Muse provide the compare function in sort`);
            return;
        }
        return (a, b) => {
            const result = sortItem.compare(a, b);
            if (result !== 0) {
                return sortItem.default === 'descend' ? -result : result;
            }
            return 0;
        };
    }
    get nextSortTick() {
        return ++this.sortTick;
    }
    getReqSortMap(singleSort, multiSort, columns) {
        let ret = {};
        const sortList = this.getValidSort(columns);
        if (multiSort) {
            const ms = Object.assign({ key: 'sort', separator: '-', nameSeparator: '.', keepEmptyKey: true, arrayParam: false }, multiSort);
            const sortMap = sortList
                .sort((a, b) => a.tick - b.tick)
                .map(item => item.key + ms.nameSeparator + ((item.reName || {})[item.default] || item.default));
            ret = { [ms.key]: ms.arrayParam ? sortMap : sortMap.join(ms.separator) };
            return sortMap.length === 0 && ms.keepEmptyKey === false ? {} : ret;
        }
        if (sortList.length === 0)
            return ret;
        const mapData = sortList[0];
        let sortFiled = mapData.key;
        let sortValue = (sortList[0].reName || {})[mapData.default] || mapData.default;
        if (singleSort) {
            sortValue = sortFiled + (singleSort.nameSeparator || '.') + sortValue;
            sortFiled = singleSort.key || 'sort';
        }
        ret[sortFiled] = sortValue;
        return ret;
    }
    // #endregion
    // #region filter
    getFilteredData(filter) {
        return filter.type === 'default' ? filter.menus.filter(f => f.checked === true) : filter.menus.slice(0, 1);
    }
    getReqFilterMap(columns) {
        let ret = {};
        columns
            .filter(w => w.filter && w.filter.default === true)
            .forEach(col => {
            const filter = col.filter;
            const values = this.getFilteredData(filter);
            let obj = {};
            if (filter.reName) {
                obj = filter.reName(filter.menus, col);
            }
            else {
                obj[filter.key] = values.map(i => i.value).join(',');
            }
            ret = Object.assign(Object.assign({}, ret), obj);
        });
        return ret;
    }
    // #endregion
    // #region statistical
    genStatistical(columns, list, rawData) {
        const res = {};
        columns.forEach((col, index) => {
            res[col.key || col.indexKey || index] =
                col.statistical == null ? {} : this.getStatistical(col, index, list, rawData);
        });
        return res;
    }
    getStatistical(col, index, list, rawData) {
        var _a;
        const val = col.statistical;
        const item = Object.assign({ digits: 2, currency: undefined }, (typeof val === 'string' ? { type: val } : val));
        let res = { value: 0 };
        let currency = false;
        if (typeof item.type === 'function') {
            res = item.type(this.getValues(index, list), col, list, rawData);
            currency = true;
        }
        else {
            switch (item.type) {
                case 'count':
                    res.value = list.length;
                    break;
                case 'distinctCount':
                    res.value = this.getValues(index, list).filter((value, idx, self) => self.indexOf(value) === idx).length;
                    break;
                case 'sum':
                    res.value = this.toFixed(this.getSum(index, list), item.digits);
                    currency = true;
                    break;
                case 'average':
                    res.value = this.toFixed(this.getSum(index, list) / list.length, item.digits);
                    currency = true;
                    break;
                case 'max':
                    res.value = Math.max(...this.getValues(index, list));
                    currency = true;
                    break;
                case 'min':
                    res.value = Math.min(...this.getValues(index, list));
                    currency = true;
                    break;
            }
        }
        if (item.currency === true || (item.currency == null && currency === true)) {
            res.text = this.currencySrv.format(res.value, (_a = col.currency) === null || _a === void 0 ? void 0 : _a.format);
        }
        else {
            res.text = String(res.value);
        }
        return res;
    }
    toFixed(val, digits) {
        if (isNaN(val) || !isFinite(val)) {
            return 0;
        }
        return parseFloat(val.toFixed(digits));
    }
    getValues(index, list) {
        return list.map(i => i._values[index].org).map(i => (i === '' || i == null ? 0 : i));
    }
    getSum(index, list) {
        return this.getValues(index, list).reduce((p, i) => (p += parseFloat(String(i))), 0);
    }
}
STDataSource.decorators = [
    { type: Injectable }
];
STDataSource.ctorParameters = () => [
    { type: _HttpClient },
    { type: DatePipe, decorators: [{ type: Host }] },
    { type: YNPipe, decorators: [{ type: Host }] },
    { type: DecimalPipe, decorators: [{ type: Host }] },
    { type: CurrencyService },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3QtZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hYmMvc3Qvc3QtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBeUR0RCxNQUFNLE9BQU8sWUFBWTtJQUd2QixZQUNVLElBQWlCLEVBQ1QsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLFVBQXVCLEVBQy9CLFdBQTRCLEVBQzVCLEdBQWlCO1FBTGpCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDVCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFhO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixRQUFHLEdBQUgsR0FBRyxDQUFjO1FBUm5CLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFTbEIsQ0FBQztJQUVKLE9BQU8sQ0FBQyxPQUE0QjtRQUNsQyxJQUFJLEtBQTJCLENBQUM7UUFDaEMs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QUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRU8sTUFBTSxDQUFDLEtBQWEsRUFBRSxJQUFjO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQzs7O1lBN2NGLFVBQVU7OztZQTFEZ0IsV0FBVztZQUE3QixRQUFRLHVCQWdFWixJQUFJO1lBaEVVLE1BQU0sdUJBaUVwQixJQUFJO1lBMUVBLFdBQVcsdUJBMkVmLElBQUk7WUFqRUEsZUFBZTtZQVBmLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSG9zdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IERhdGVQaXBlLCBZTlBpcGUsIF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IEN1cnJlbmN5U2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2Zvcm1hdCc7XG5pbXBvcnQgeyBkZWVwQ29weSwgZGVlcEdldCB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcblxuaW1wb3J0IHtcbiAgU1RDb2x1bW4sXG4gIFNUQ29sdW1uRmlsdGVyLFxuICBTVENvbHVtbkZpbHRlck1lbnUsXG4gIFNUQ3VzdG9tUmVxdWVzdE9wdGlvbnMsXG4gIFNURGF0YSxcbiAgU1RNdWx0aVNvcnQsXG4gIFNUTXVsdGlTb3J0UmVzdWx0VHlwZSxcbiAgU1RQYWdlLFxuICBTVFJlcSxcbiAgU1RSZXFSZU5hbWVUeXBlLFxuICBTVFJlcXVlc3RPcHRpb25zLFxuICBTVFJlcyxcbiAgU1RSb3dDbGFzc05hbWUsXG4gIFNUU2luZ2xlU29ydCxcbiAgU1RTb3J0TWFwLFxuICBTVFN0YXRpc3RpY2FsLFxuICBTVFN0YXRpc3RpY2FsUmVzdWx0LFxuICBTVFN0YXRpc3RpY2FsUmVzdWx0cyxcbiAgU1RTdGF0aXN0aWNhbFR5cGVcbn0gZnJvbSAnLi9zdC5pbnRlcmZhY2VzJztcbmltcG9ydCB7IF9TVENvbHVtbiwgX1NUQ29sdW1uQnV0dG9uLCBfU1REYXRhVmFsdWUgfSBmcm9tICcuL3N0LnR5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTVERhdGFTb3VyY2VPcHRpb25zIHtcbiAgcGk6IG51bWJlcjtcbiAgcHM6IG51bWJlcjtcbiAgcGFnaW5hdG9yOiBib29sZWFuO1xuICBkYXRhOiBzdHJpbmcgfCBTVERhdGFbXSB8IE9ic2VydmFibGU8U1REYXRhW10+O1xuICB0b3RhbDogbnVtYmVyO1xuICByZXE6IFNUUmVxO1xuICByZXM6IFNUUmVzO1xuICBwYWdlOiBTVFBhZ2U7XG4gIGNvbHVtbnM6IF9TVENvbHVtbltdO1xuICBzaW5nbGVTb3J0PzogU1RTaW5nbGVTb3J0O1xuICBtdWx0aVNvcnQ/OiBTVE11bHRpU29ydDtcbiAgcm93Q2xhc3NOYW1lPzogU1RSb3dDbGFzc05hbWU7XG4gIGN1c3RvbVJlcXVlc3Q/OiAob3B0aW9uczogU1RDdXN0b21SZXF1ZXN0T3B0aW9ucykgPT4gT2JzZXJ2YWJsZTxOelNhZmVBbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNURGF0YVNvdXJjZVJlc3VsdCB7XG4gIC8qKiDmmK/lkKbpnIDopoHmmL7npLrliIbpobXlmaggKi9cbiAgcGFnZVNob3c6IGJvb2xlYW47XG4gIC8qKiDmlrAgYHBpYO+8jOiLpei/lOWbniBgdW5kZWZpbmVkYCDooajnpLrnlKjmiLflj5fmjqcgKi9cbiAgcGk6IG51bWJlcjtcbiAgLyoqIOaWsCBgcHNg77yM6Iul6L+U5ZueIGB1bmRlZmluZWRgIOihqOekuueUqOaIt+WPl+aOpyAqL1xuICBwczogbnVtYmVyO1xuICAvKiog5pawIGB0b3RhbGDvvIzoi6Xov5Tlm54gYHVuZGVmaW5lZGAg6KGo56S655So5oi35Y+X5o6nICovXG4gIHRvdGFsOiBudW1iZXI7XG4gIC8qKiDmlbDmja4gKi9cbiAgbGlzdDogU1REYXRhW107XG4gIC8qKiDnu5/orqHmlbDmja4gKi9cbiAgc3RhdGlzdGljYWw6IFNUU3RhdGlzdGljYWxSZXN1bHRzO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU1REYXRhU291cmNlIHtcbiAgcHJpdmF0ZSBzb3J0VGljayA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCxcbiAgICBASG9zdCgpIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSB5blBpcGU6IFlOUGlwZSxcbiAgICBASG9zdCgpIHByaXZhdGUgbnVtYmVyUGlwZTogRGVjaW1hbFBpcGUsXG4gICAgcHJpdmF0ZSBjdXJyZW5jeVNydjogQ3VycmVuY3lTZXJ2aWNlLFxuICAgIHByaXZhdGUgZG9tOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIHByb2Nlc3Mob3B0aW9uczogU1REYXRhU291cmNlT3B0aW9ucyk6IE9ic2VydmFibGU8U1REYXRhU291cmNlUmVzdWx0PiB7XG4gICAgbGV0IGRhdGEkOiBPYnNlcnZhYmxlPFNURGF0YVtdPjtcbiAgICBsZXQgaXNSZW1vdGUgPSBmYWxzZTtcbiAgICBjb25zdCB7IGRhdGEsIHJlcywgdG90YWwsIHBhZ2UsIHBpLCBwcywgcGFnaW5hdG9yLCBjb2x1bW5zIH0gPSBvcHRpb25zO1xuICAgIGxldCByZXRUb3RhbDogbnVtYmVyO1xuICAgIGxldCByZXRQczogbnVtYmVyO1xuICAgIGxldCByZXRMaXN0OiBTVERhdGFbXTtcbiAgICBsZXQgcmV0UGk6IG51bWJlcjtcbiAgICBsZXQgcmF3RGF0YTogTnpTYWZlQW55O1xuICAgIGxldCBzaG93UGFnZSA9IHBhZ2Uuc2hvdztcblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlzUmVtb3RlID0gdHJ1ZTtcbiAgICAgIGRhdGEkID0gdGhpcy5nZXRCeVJlbW90ZShkYXRhLCBvcHRpb25zKS5waXBlKFxuICAgICAgICBtYXAocmVzdWx0ID0+IHtcbiAgICAgICAgICByYXdEYXRhID0gcmVzdWx0O1xuICAgICAgICAgIGxldCByZXQ6IFNURGF0YVtdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJldCA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJldFRvdGFsID0gcmV0Lmxlbmd0aDtcbiAgICAgICAgICAgIHJldFBzID0gcmV0VG90YWw7XG4gICAgICAgICAgICBzaG93UGFnZSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBsaXN0XG4gICAgICAgICAgICByZXQgPSBkZWVwR2V0KHJlc3VsdCwgcmVzLnJlTmFtZSEubGlzdCBhcyBzdHJpbmdbXSwgW10pO1xuICAgICAgICAgICAgaWYgKHJldCA9PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHJldCkpIHtcbiAgICAgICAgICAgICAgcmV0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0b3RhbFxuICAgICAgICAgICAgY29uc3QgcmVzdWx0VG90YWwgPSByZXMucmVOYW1lIS50b3RhbCAmJiBkZWVwR2V0KHJlc3VsdCwgcmVzLnJlTmFtZSEudG90YWwgYXMgc3RyaW5nW10sIG51bGwpO1xuICAgICAgICAgICAgcmV0VG90YWwgPSByZXN1bHRUb3RhbCA9PSBudWxsID8gdG90YWwgfHwgMCA6ICtyZXN1bHRUb3RhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlZXBDb3B5KHJldCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgZGF0YSQgPSBvZihkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYSBjb2xkIG9ic2VydmFibGVcbiAgICAgIGRhdGEkID0gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoIWlzUmVtb3RlKSB7XG4gICAgICBkYXRhJCA9IGRhdGEkLnBpcGUoXG4gICAgICAgIC8vIHNvcnRcbiAgICAgICAgbWFwKChyZXN1bHQ6IFNURGF0YVtdKSA9PiB7XG4gICAgICAgICAgcmF3RGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICBsZXQgY29weVJlc3VsdCA9IGRlZXBDb3B5KHJlc3VsdCk7XG4gICAgICAgICAgY29uc3Qgc29ydGVyRm4gPSB0aGlzLmdldFNvcnRlckZuKGNvbHVtbnMgYXMgX1NUQ29sdW1uW10pO1xuICAgICAgICAgIGlmIChzb3J0ZXJGbikge1xuICAgICAgICAgICAgY29weVJlc3VsdCA9IGNvcHlSZXN1bHQuc29ydChzb3J0ZXJGbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb3B5UmVzdWx0O1xuICAgICAgICB9KSxcbiAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIG1hcCgocmVzdWx0OiBTVERhdGFbXSkgPT4ge1xuICAgICAgICAgIGNvbHVtbnNcbiAgICAgICAgICAgIC5maWx0ZXIodyA9PiB3LmZpbHRlcilcbiAgICAgICAgICAgIC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBjLmZpbHRlciE7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0RmlsdGVyZWREYXRhKGZpbHRlcik7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgIGNvbnN0IG9uRmlsdGVyID0gZmlsdGVyLmZuO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uRmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbc3RdIE11c2UgcHJvdmlkZSB0aGUgZm4gZnVuY3Rpb24gaW4gZmlsdGVyYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIocmVjb3JkID0+IHZhbHVlcy5zb21lKHYgPT4gb25GaWx0ZXIodiwgcmVjb3JkKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSksXG4gICAgICAgIC8vIHBhZ2luZ1xuICAgICAgICBtYXAoKHJlc3VsdDogU1REYXRhW10pID0+IHtcbiAgICAgICAgICBpZiAocGFnaW5hdG9yICYmIHBhZ2UuZnJvbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1heFBhZ2VJbmRleCA9IE1hdGguY2VpbChyZXN1bHQubGVuZ3RoIC8gcHMpO1xuICAgICAgICAgICAgcmV0UGkgPSBNYXRoLm1heCgxLCBwaSA+IG1heFBhZ2VJbmRleCA/IG1heFBhZ2VJbmRleCA6IHBpKTtcbiAgICAgICAgICAgIHJldFRvdGFsID0gcmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChwYWdlLnNob3cgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zbGljZSgocmV0UGkgLSAxKSAqIHBzLCByZXRQaSAqIHBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gcHJlLXByb2Nlc3NcbiAgICBpZiAodHlwZW9mIHJlcy5wcm9jZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkYXRhJCA9IGRhdGEkLnBpcGUobWFwKHJlc3VsdCA9PiByZXMucHJvY2VzcyEocmVzdWx0LCByYXdEYXRhKSkpO1xuICAgIH1cblxuICAgIGRhdGEkID0gZGF0YSQucGlwZShtYXAocmVzdWx0ID0+IHRoaXMub3B0aW1pemVEYXRhKHsgcmVzdWx0LCBjb2x1bW5zLCByb3dDbGFzc05hbWU6IG9wdGlvbnMucm93Q2xhc3NOYW1lIH0pKSk7XG5cbiAgICByZXR1cm4gZGF0YSQucGlwZShcbiAgICAgIG1hcChyZXN1bHQgPT4ge1xuICAgICAgICByZXRMaXN0ID0gcmVzdWx0O1xuICAgICAgICBjb25zdCByZWFsVG90YWwgPSByZXRUb3RhbCB8fCB0b3RhbDtcbiAgICAgICAgY29uc3QgcmVhbFBzID0gcmV0UHMgfHwgcHM7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwaTogcmV0UGksXG4gICAgICAgICAgcHM6IHJldFBzLFxuICAgICAgICAgIHRvdGFsOiByZXRUb3RhbCxcbiAgICAgICAgICBsaXN0OiByZXRMaXN0LFxuICAgICAgICAgIHN0YXRpc3RpY2FsOiB0aGlzLmdlblN0YXRpc3RpY2FsKGNvbHVtbnMgYXMgX1NUQ29sdW1uW10sIHJldExpc3QsIHJhd0RhdGEpLFxuICAgICAgICAgIHBhZ2VTaG93OiB0eXBlb2Ygc2hvd1BhZ2UgPT09ICd1bmRlZmluZWQnID8gcmVhbFRvdGFsID4gcmVhbFBzIDogc2hvd1BhZ2VcbiAgICAgICAgfSBhcyBTVERhdGFTb3VyY2VSZXN1bHQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldChpdGVtOiBTVERhdGEsIGNvbDogX1NUQ29sdW1uLCBpZHg6IG51bWJlcik6IF9TVERhdGFWYWx1ZSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhZmVIdG1sID0gY29sLnNhZmVUeXBlID09PSAnc2FmZUh0bWwnO1xuICAgICAgaWYgKGNvbC5mb3JtYXQpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0UmVzID0gY29sLmZvcm1hdChpdGVtLCBjb2wsIGlkeCkgfHwgJyc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dDogZm9ybWF0UmVzLFxuICAgICAgICAgIF90ZXh0OiBzYWZlSHRtbCA/IHRoaXMuZG9tLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGZvcm1hdFJlcykgOiBmb3JtYXRSZXMsXG4gICAgICAgICAgb3JnOiBmb3JtYXRSZXMsXG4gICAgICAgICAgc2FmZVR5cGU6IGNvbC5zYWZlVHlwZSFcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSBkZWVwR2V0KGl0ZW0sIGNvbC5pbmRleCBhcyBzdHJpbmdbXSwgY29sLmRlZmF1bHQpO1xuXG4gICAgICBsZXQgdGV4dCA9IHZhbHVlO1xuICAgICAgbGV0IGNvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICBzd2l0Y2ggKGNvbC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ25vJzpcbiAgICAgICAgICB0ZXh0ID0gdGhpcy5nZXROb0luZGV4KGl0ZW0sIGNvbCwgaWR4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW1nJzpcbiAgICAgICAgICB0ZXh0ID0gdmFsdWUgPyBgPGltZyBzcmM9XCIke3ZhbHVlfVwiIGNsYXNzPVwiaW1nXCI+YCA6ICcnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIHRleHQgPSB0aGlzLm51bWJlclBpcGUudHJhbnNmb3JtKHZhbHVlLCBjb2wubnVtYmVyRGlnaXRzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICAgIHRleHQgPSB0aGlzLmN1cnJlbmN5U3J2LmZvcm1hdCh2YWx1ZSwgY29sLmN1cnJlbmN5Py5mb3JtYXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICB0ZXh0ID0gdmFsdWUgPT09IGNvbC5kZWZhdWx0ID8gY29sLmRlZmF1bHQgOiB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgY29sLmRhdGVGb3JtYXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd5bic6XG4gICAgICAgICAgdGV4dCA9IHRoaXMueW5QaXBlLnRyYW5zZm9ybSh2YWx1ZSA9PT0gY29sLnluIS50cnV0aCwgY29sLnluIS55ZXMhLCBjb2wueW4hLm5vISwgY29sLnluIS5tb2RlISwgZmFsc2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlbnVtJzpcbiAgICAgICAgICB0ZXh0ID0gY29sLmVudW0hW3ZhbHVlXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGFnJzpcbiAgICAgICAgY2FzZSAnYmFkZ2UnOlxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBjb2wudHlwZSA9PT0gJ3RhZycgPyBjb2wudGFnIDogY29sLmJhZGdlO1xuICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbdGV4dF0pIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFJdGVtID0gZGF0YVt0ZXh0XTtcbiAgICAgICAgICAgIHRleHQgPSBkYXRhSXRlbS50ZXh0O1xuICAgICAgICAgICAgY29sb3IgPSBkYXRhSXRlbS5jb2xvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0ZXh0ID09IG51bGwpIHRleHQgPSAnJztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQsXG4gICAgICAgIF90ZXh0OiBzYWZlSHRtbCA/IHRoaXMuZG9tLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRleHQpIDogdGV4dCxcbiAgICAgICAgb3JnOiB2YWx1ZSxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIHNhZmVUeXBlOiBjb2wuc2FmZVR5cGUhLFxuICAgICAgICBidXR0b25zOiBbXVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgY29uc3QgdGV4dCA9IGBJTlZBTElEIERBVEFgO1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGdldCBkYXRhYCwgaXRlbSwgY29sLCBleCk7XG4gICAgICByZXR1cm4geyB0ZXh0LCBfdGV4dDogdGV4dCwgb3JnOiB0ZXh0LCBidXR0b25zOiBbXSwgc2FmZVR5cGU6ICd0ZXh0JyB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnlSZW1vdGUodXJsOiBzdHJpbmcsIG9wdGlvbnM6IFNURGF0YVNvdXJjZU9wdGlvbnMpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICBjb25zdCB7IHJlcSwgcGFnZSwgcGFnaW5hdG9yLCBwaSwgcHMsIHNpbmdsZVNvcnQsIG11bHRpU29ydCwgY29sdW1ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBtZXRob2QgPSAocmVxLm1ldGhvZCB8fCAnR0VUJykudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgY29uc3QgcmVOYW1lID0gcmVxLnJlTmFtZSBhcyBTVFJlcVJlTmFtZVR5cGU7XG4gICAgaWYgKHBhZ2luYXRvcikge1xuICAgICAgaWYgKHJlcS50eXBlID09PSAncGFnZScpIHtcbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgIFtyZU5hbWUucGkgYXMgc3RyaW5nXTogcGFnZS56ZXJvSW5kZXhlZCA/IHBpIC0gMSA6IHBpLFxuICAgICAgICAgIFtyZU5hbWUucHMgYXMgc3RyaW5nXTogcHNcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICBbcmVOYW1lLnNraXAgYXMgc3RyaW5nXTogKHBpIC0gMSkgKiBwcyxcbiAgICAgICAgICBbcmVOYW1lLmxpbWl0IGFzIHN0cmluZ106IHBzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHBhcmFtcyA9IHtcbiAgICAgIC4uLnBhcmFtcyxcbiAgICAgIC4uLnJlcS5wYXJhbXMsXG4gICAgICAuLi50aGlzLmdldFJlcVNvcnRNYXAoc2luZ2xlU29ydCwgbXVsdGlTb3J0LCBjb2x1bW5zKSxcbiAgICAgIC4uLnRoaXMuZ2V0UmVxRmlsdGVyTWFwKGNvbHVtbnMpXG4gICAgfTtcblxuICAgIGxldCByZXFPcHRpb25zOiBTVFJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgcGFyYW1zLFxuICAgICAgYm9keTogcmVxLmJvZHksXG4gICAgICBoZWFkZXJzOiByZXEuaGVhZGVyc1xuICAgIH07XG4gICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnICYmIHJlcS5hbGxJbkJvZHkgPT09IHRydWUpIHtcbiAgICAgIHJlcU9wdGlvbnMgPSB7XG4gICAgICAgIGJvZHk6IHsgLi4ucmVxLmJvZHksIC4uLnBhcmFtcyB9LFxuICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVyc1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXEucHJvY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxT3B0aW9ucyA9IHJlcS5wcm9jZXNzKHJlcU9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIShyZXFPcHRpb25zLnBhcmFtcyBpbnN0YW5jZW9mIEh0dHBQYXJhbXMpKSB7XG4gICAgICByZXFPcHRpb25zLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHsgZnJvbU9iamVjdDogcmVxT3B0aW9ucy5wYXJhbXMgfSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jdXN0b21SZXF1ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5jdXN0b21SZXF1ZXN0KHsgbWV0aG9kLCB1cmwsIG9wdGlvbnM6IHJlcU9wdGlvbnMgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChtZXRob2QsIHVybCwgcmVxT3B0aW9ucyk7XG4gIH1cblxuICBvcHRpbWl6ZURhdGEob3B0aW9uczogeyBjb2x1bW5zOiBfU1RDb2x1bW5bXTsgcmVzdWx0OiBTVERhdGFbXTsgcm93Q2xhc3NOYW1lPzogU1RSb3dDbGFzc05hbWUgfSk6IFNURGF0YVtdIHtcbiAgICBjb25zdCB7IHJlc3VsdCwgY29sdW1ucywgcm93Q2xhc3NOYW1lIH0gPSBvcHRpb25zO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHJlc3VsdFtpXS5fdmFsdWVzID0gY29sdW1ucy5tYXAoYyA9PiB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGMuYnV0dG9ucykgJiYgYy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4geyBidXR0b25zOiB0aGlzLmdlbkJ1dHRvbnMoYy5idXR0b25zLCByZXN1bHRbaV0sIGMpLCBfdGV4dDogJycgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldChyZXN1bHRbaV0sIGMsIGkpO1xuICAgICAgfSk7XG4gICAgICBpZiAocm93Q2xhc3NOYW1lKSB7XG4gICAgICAgIHJlc3VsdFtpXS5fcm93Q2xhc3NOYW1lID0gcm93Q2xhc3NOYW1lKHJlc3VsdFtpXSwgaSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXROb0luZGV4KGl0ZW06IFNURGF0YSwgY29sOiBfU1RDb2x1bW4sIGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvbC5ub0luZGV4ID09PSAnZnVuY3Rpb24nID8gY29sLm5vSW5kZXgoaXRlbSwgY29sLCBpZHgpIDogY29sLm5vSW5kZXghICsgaWR4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5CdXR0b25zKF9idG5zOiBfU1RDb2x1bW5CdXR0b25bXSwgaXRlbTogU1REYXRhLCBjb2w6IFNUQ29sdW1uKTogX1NUQ29sdW1uQnV0dG9uW10ge1xuICAgIGNvbnN0IGZuID0gKGJ0bnM6IF9TVENvbHVtbkJ1dHRvbltdKTogX1NUQ29sdW1uQnV0dG9uW10gPT4ge1xuICAgICAgcmV0dXJuIGRlZXBDb3B5KGJ0bnMpLmZpbHRlcihidG4gPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBidG4uaWlmIShpdGVtLCBidG4sIGNvbCk7XG4gICAgICAgIGNvbnN0IGlzUmVuZGVyRGlzYWJsZWQgPSBidG4uaWlmQmVoYXZpb3IgPT09ICdkaXNhYmxlZCc7XG4gICAgICAgIGJ0bi5fcmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICBidG4uX2Rpc2FibGVkID0gIXJlc3VsdCAmJiBpc1JlbmRlckRpc2FibGVkO1xuICAgICAgICBpZiAoYnRuLmNoaWxkcmVuIS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYnRuLmNoaWxkcmVuID0gZm4oYnRuLmNoaWxkcmVuISk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGJ0bi5paWY7XG4gICAgICAgIHJldHVybiByZXN1bHQgfHwgaXNSZW5kZXJEaXNhYmxlZDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCByZXMgPSBmbihfYnRucyk7XG5cbiAgICBjb25zdCBmblRleHQgPSAoYnRuczogX1NUQ29sdW1uQnV0dG9uW10pOiBfU1RDb2x1bW5CdXR0b25bXSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGJ0biBvZiBidG5zKSB7XG4gICAgICAgIGJ0bi5fdGV4dCA9IHR5cGVvZiBidG4udGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IGJ0bi50ZXh0KGl0ZW0sIGJ0bikgOiBidG4udGV4dCB8fCAnJztcbiAgICAgICAgaWYgKGJ0bi5jaGlsZHJlbiEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGJ0bi5jaGlsZHJlbiA9IGZuVGV4dChidG4uY2hpbGRyZW4hKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGJ0bnM7XG4gICAgfTtcblxuICAgIHJldHVybiBmblRleHQocmVzKTtcbiAgfVxuXG4gIC8vICNyZWdpb24gc29ydFxuXG4gIHByaXZhdGUgZ2V0VmFsaWRTb3J0KGNvbHVtbnM6IF9TVENvbHVtbltdKTogU1RTb3J0TWFwW10ge1xuICAgIHJldHVybiBjb2x1bW5zLmZpbHRlcihpdGVtID0+IGl0ZW0uX3NvcnQgJiYgaXRlbS5fc29ydC5lbmFibGVkICYmIGl0ZW0uX3NvcnQuZGVmYXVsdCkubWFwKGl0ZW0gPT4gaXRlbS5fc29ydCEpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTb3J0ZXJGbihjb2x1bW5zOiBfU1RDb2x1bW5bXSk6ICgoYTogU1REYXRhLCBiOiBTVERhdGEpID0+IG51bWJlcikgfCB2b2lkIHtcbiAgICBjb25zdCBzb3J0TGlzdCA9IHRoaXMuZ2V0VmFsaWRTb3J0KGNvbHVtbnMpO1xuICAgIGlmIChzb3J0TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc29ydEl0ZW0gPSBzb3J0TGlzdFswXTtcbiAgICBpZiAoc29ydEl0ZW0uY29tcGFyZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvcnRJdGVtLmNvbXBhcmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybihgW3N0XSBNdXNlIHByb3ZpZGUgdGhlIGNvbXBhcmUgZnVuY3Rpb24gaW4gc29ydGApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiAoYTogU1REYXRhLCBiOiBTVERhdGEpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHNvcnRJdGVtLmNvbXBhcmUhKGEsIGIpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gc29ydEl0ZW0uZGVmYXVsdCA9PT0gJ2Rlc2NlbmQnID8gLXJlc3VsdCA6IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH07XG4gIH1cblxuICBnZXQgbmV4dFNvcnRUaWNrKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICsrdGhpcy5zb3J0VGljaztcbiAgfVxuXG4gIGdldFJlcVNvcnRNYXAoXG4gICAgc2luZ2xlU29ydDogU1RTaW5nbGVTb3J0IHwgdW5kZWZpbmVkLFxuICAgIG11bHRpU29ydDogU1RNdWx0aVNvcnQgfCB1bmRlZmluZWQsXG4gICAgY29sdW1uczogX1NUQ29sdW1uW11cbiAgKTogU1RNdWx0aVNvcnRSZXN1bHRUeXBlIHtcbiAgICBsZXQgcmV0OiBTVE11bHRpU29ydFJlc3VsdFR5cGUgPSB7fTtcbiAgICBjb25zdCBzb3J0TGlzdCA9IHRoaXMuZ2V0VmFsaWRTb3J0KGNvbHVtbnMpO1xuXG4gICAgaWYgKG11bHRpU29ydCkge1xuICAgICAgY29uc3QgbXM6IFNUTXVsdGlTb3J0ID0ge1xuICAgICAgICBrZXk6ICdzb3J0JyxcbiAgICAgICAgc2VwYXJhdG9yOiAnLScsXG4gICAgICAgIG5hbWVTZXBhcmF0b3I6ICcuJyxcbiAgICAgICAga2VlcEVtcHR5S2V5OiB0cnVlLFxuICAgICAgICBhcnJheVBhcmFtOiBmYWxzZSxcbiAgICAgICAgLi4ubXVsdGlTb3J0XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzb3J0TWFwID0gc29ydExpc3RcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEudGljayAtIGIudGljaylcbiAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0ua2V5ISArIG1zLm5hbWVTZXBhcmF0b3IgKyAoKGl0ZW0ucmVOYW1lIHx8IHt9KVtpdGVtLmRlZmF1bHQhXSB8fCBpdGVtLmRlZmF1bHQpKTtcblxuICAgICAgcmV0ID0geyBbbXMua2V5IV06IG1zLmFycmF5UGFyYW0gPyBzb3J0TWFwIDogc29ydE1hcC5qb2luKG1zLnNlcGFyYXRvcikgfTtcblxuICAgICAgcmV0dXJuIHNvcnRNYXAubGVuZ3RoID09PSAwICYmIG1zLmtlZXBFbXB0eUtleSA9PT0gZmFsc2UgPyB7fSA6IHJldDtcbiAgICB9XG5cbiAgICBpZiAoc29ydExpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gcmV0O1xuXG4gICAgY29uc3QgbWFwRGF0YSA9IHNvcnRMaXN0WzBdO1xuICAgIGxldCBzb3J0RmlsZWQgPSBtYXBEYXRhLmtleTtcbiAgICBsZXQgc29ydFZhbHVlID0gKHNvcnRMaXN0WzBdLnJlTmFtZSB8fCB7fSlbbWFwRGF0YS5kZWZhdWx0IV0gfHwgbWFwRGF0YS5kZWZhdWx0O1xuICAgIGlmIChzaW5nbGVTb3J0KSB7XG4gICAgICBzb3J0VmFsdWUgPSBzb3J0RmlsZWQgKyAoc2luZ2xlU29ydC5uYW1lU2VwYXJhdG9yIHx8ICcuJykgKyBzb3J0VmFsdWU7XG4gICAgICBzb3J0RmlsZWQgPSBzaW5nbGVTb3J0LmtleSB8fCAnc29ydCc7XG4gICAgfVxuICAgIHJldFtzb3J0RmlsZWQgYXMgc3RyaW5nXSA9IHNvcnRWYWx1ZSBhcyBzdHJpbmc7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGZpbHRlclxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyZWREYXRhKGZpbHRlcjogU1RDb2x1bW5GaWx0ZXIpOiBTVENvbHVtbkZpbHRlck1lbnVbXSB7XG4gICAgcmV0dXJuIGZpbHRlci50eXBlID09PSAnZGVmYXVsdCcgPyBmaWx0ZXIubWVudXMhLmZpbHRlcihmID0+IGYuY2hlY2tlZCA9PT0gdHJ1ZSkgOiBmaWx0ZXIubWVudXMhLnNsaWNlKDAsIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXFGaWx0ZXJNYXAoY29sdW1uczogX1NUQ29sdW1uW10pOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgY29sdW1uc1xuICAgICAgLmZpbHRlcih3ID0+IHcuZmlsdGVyICYmIHcuZmlsdGVyLmRlZmF1bHQgPT09IHRydWUpXG4gICAgICAuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSBjb2wuZmlsdGVyITtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5nZXRGaWx0ZXJlZERhdGEoZmlsdGVyKTtcbiAgICAgICAgbGV0IG9iajogeyBba2V5OiBzdHJpbmddOiBOelNhZmVBbnkgfSA9IHt9O1xuICAgICAgICBpZiAoZmlsdGVyLnJlTmFtZSkge1xuICAgICAgICAgIG9iaiA9IGZpbHRlci5yZU5hbWUhKGZpbHRlci5tZW51cyEsIGNvbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqW2ZpbHRlci5rZXkhXSA9IHZhbHVlcy5tYXAoaSA9PiBpLnZhbHVlKS5qb2luKCcsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0ID0geyAuLi5yZXQsIC4uLm9iaiB9O1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHN0YXRpc3RpY2FsXG5cbiAgcHJpdmF0ZSBnZW5TdGF0aXN0aWNhbChjb2x1bW5zOiBfU1RDb2x1bW5bXSwgbGlzdDogU1REYXRhW10sIHJhd0RhdGE6IE56U2FmZUFueSk6IFNUU3RhdGlzdGljYWxSZXN1bHRzIHtcbiAgICBjb25zdCByZXM6IHsgW2tleTogc3RyaW5nXTogTnpTYWZlQW55IH0gPSB7fTtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIHJlc1tjb2wua2V5IHx8IGNvbC5pbmRleEtleSB8fCBpbmRleF0gPVxuICAgICAgICBjb2wuc3RhdGlzdGljYWwgPT0gbnVsbCA/IHt9IDogdGhpcy5nZXRTdGF0aXN0aWNhbChjb2wsIGluZGV4LCBsaXN0LCByYXdEYXRhKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGF0aXN0aWNhbChjb2w6IF9TVENvbHVtbiwgaW5kZXg6IG51bWJlciwgbGlzdDogU1REYXRhW10sIHJhd0RhdGE6IE56U2FmZUFueSk6IFNUU3RhdGlzdGljYWxSZXN1bHQge1xuICAgIGNvbnN0IHZhbCA9IGNvbC5zdGF0aXN0aWNhbDtcbiAgICBjb25zdCBpdGVtOiBTVFN0YXRpc3RpY2FsID0ge1xuICAgICAgZGlnaXRzOiAyLFxuICAgICAgY3VycmVuY3k6IHVuZGVmaW5lZCxcbiAgICAgIC4uLih0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IHsgdHlwZTogdmFsIGFzIFNUU3RhdGlzdGljYWxUeXBlIH0gOiAodmFsIGFzIFNUU3RhdGlzdGljYWwpKVxuICAgIH07XG4gICAgbGV0IHJlczogU1RTdGF0aXN0aWNhbFJlc3VsdCA9IHsgdmFsdWU6IDAgfTtcbiAgICBsZXQgY3VycmVuY3kgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIGl0ZW0udHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVzID0gaXRlbS50eXBlKHRoaXMuZ2V0VmFsdWVzKGluZGV4LCBsaXN0KSwgY29sLCBsaXN0LCByYXdEYXRhKTtcbiAgICAgIGN1cnJlbmN5ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnY291bnQnOlxuICAgICAgICAgIHJlcy52YWx1ZSA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkaXN0aW5jdENvdW50JzpcbiAgICAgICAgICByZXMudmFsdWUgPSB0aGlzLmdldFZhbHVlcyhpbmRleCwgbGlzdCkuZmlsdGVyKCh2YWx1ZSwgaWR4LCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpZHgpLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3VtJzpcbiAgICAgICAgICByZXMudmFsdWUgPSB0aGlzLnRvRml4ZWQodGhpcy5nZXRTdW0oaW5kZXgsIGxpc3QpLCBpdGVtLmRpZ2l0cyEpO1xuICAgICAgICAgIGN1cnJlbmN5ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXZlcmFnZSc6XG4gICAgICAgICAgcmVzLnZhbHVlID0gdGhpcy50b0ZpeGVkKHRoaXMuZ2V0U3VtKGluZGV4LCBsaXN0KSAvIGxpc3QubGVuZ3RoLCBpdGVtLmRpZ2l0cyEpO1xuICAgICAgICAgIGN1cnJlbmN5ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgICByZXMudmFsdWUgPSBNYXRoLm1heCguLi50aGlzLmdldFZhbHVlcyhpbmRleCwgbGlzdCkpO1xuICAgICAgICAgIGN1cnJlbmN5ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgICByZXMudmFsdWUgPSBNYXRoLm1pbiguLi50aGlzLmdldFZhbHVlcyhpbmRleCwgbGlzdCkpO1xuICAgICAgICAgIGN1cnJlbmN5ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGl0ZW0uY3VycmVuY3kgPT09IHRydWUgfHwgKGl0ZW0uY3VycmVuY3kgPT0gbnVsbCAmJiBjdXJyZW5jeSA9PT0gdHJ1ZSkpIHtcbiAgICAgIHJlcy50ZXh0ID0gdGhpcy5jdXJyZW5jeVNydi5mb3JtYXQocmVzLnZhbHVlLCBjb2wuY3VycmVuY3k/LmZvcm1hdCkgYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMudGV4dCA9IFN0cmluZyhyZXMudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSB0b0ZpeGVkKHZhbDogbnVtYmVyLCBkaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGlzTmFOKHZhbCkgfHwgIWlzRmluaXRlKHZhbCkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwudG9GaXhlZChkaWdpdHMpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFsdWVzKGluZGV4OiBudW1iZXIsIGxpc3Q6IFNURGF0YVtdKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBsaXN0Lm1hcChpID0+IGkuX3ZhbHVlc1tpbmRleF0ub3JnKS5tYXAoaSA9PiAoaSA9PT0gJycgfHwgaSA9PSBudWxsID8gMCA6IGkpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3VtKGluZGV4OiBudW1iZXIsIGxpc3Q6IFNURGF0YVtdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZXMoaW5kZXgsIGxpc3QpLnJlZHVjZSgocCwgaSkgPT4gKHAgKz0gcGFyc2VGbG9hdChTdHJpbmcoaSkpKSwgMCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG59XG4iXX0=