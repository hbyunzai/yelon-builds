import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import isUtf8 from 'isutf8';
import { ZoneOutside } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@yelon/util/other";
import * as i3 from "@yelon/util/config";
export class XlsxService {
    constructor(http, lazy, configSrv, ngZone) {
        this.http = http;
        this.lazy = lazy;
        this.ngZone = ngZone;
        this.cog = configSrv.merge('xlsx', {
            url: 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
            modules: [`https://cdn.jsdelivr.net/npm/xlsx/dist/cpexcel.js`]
        });
    }
    init() {
        return typeof XLSX !== 'undefined'
            ? Promise.resolve([])
            : this.lazy.load([this.cog.url].concat(this.cog.modules));
    }
    read(data) {
        const { read, utils: { sheet_to_json } } = XLSX;
        const ret = {};
        const buf = new Uint8Array(data);
        let type = 'array';
        if (!isUtf8(buf)) {
            try {
                data = cptable.utils.decode(936, buf);
                type = 'string';
            }
            catch { }
        }
        const wb = read(data, { type });
        wb.SheetNames.forEach((name) => {
            const sheet = wb.Sheets[name];
            ret[name] = sheet_to_json(sheet, { header: 1 });
        });
        return ret;
    }
    /**
     * 导入Excel并输出JSON，支持 `<input type="file">`、URL 形式
     */
    import(fileOrUrl) {
        return new Promise((resolve, reject) => {
            const r = (data) => this.ngZone.run(() => resolve(this.read(data)));
            this.init()
                .then(() => {
                // from url
                if (typeof fileOrUrl === 'string') {
                    this.http.request('GET', fileOrUrl, { responseType: 'arraybuffer' }).subscribe({
                        next: (res) => r(new Uint8Array(res)),
                        error: (err) => reject(err)
                    });
                    return;
                }
                // from file
                const reader = new FileReader();
                reader.onload = (e) => r(e.target.result);
                reader.onerror = (e) => reject(e);
                reader.readAsArrayBuffer(fileOrUrl);
            })
                .catch(() => reject(`Unable to load xlsx.js`));
        });
    }
    async export(options) {
        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                options = { format: 'xlsx', ...options };
                const { writeFile, utils: { book_new, aoa_to_sheet, book_append_sheet } } = XLSX;
                const wb = book_new();
                if (Array.isArray(options.sheets)) {
                    options.sheets.forEach((value, index) => {
                        const ws = aoa_to_sheet(value.data);
                        book_append_sheet(wb, ws, value.name || `Sheet${index + 1}`);
                    });
                }
                else {
                    wb.SheetNames = Object.keys(options.sheets);
                    wb.Sheets = options.sheets;
                }
                if (options.callback)
                    options.callback(wb);
                const filename = options.filename || `export.${options.format}`;
                writeFile(wb, filename, {
                    bookType: options.format,
                    bookSST: false,
                    type: 'array',
                    ...options.opts
                });
                resolve({ filename, wb });
            })
                .catch(err => reject(err));
        });
    }
    /**
     * 数据转符号名
     * - `1` => `A`
     * - `27` => `AA`
     * - `703` => `AAA`
     */
    numberToSchema(val) {
        const startCode = 'A'.charCodeAt(0);
        let res = '';
        do {
            --val;
            res = String.fromCharCode(startCode + (val % 26)) + res;
            val = (val / 26) >> 0;
        } while (val > 0);
        return res;
    }
}
XlsxService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: XlsxService, deps: [{ token: i1.HttpClient }, { token: i2.LazyService }, { token: i3.YunzaiConfigService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
XlsxService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: XlsxService, providedIn: 'root' });
__decorate([
    ZoneOutside()
], XlsxService.prototype, "read", null);
__decorate([
    ZoneOutside()
], XlsxService.prototype, "export", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: XlsxService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.LazyService }, { type: i3.YunzaiConfigService }, { type: i0.NgZone }]; }, propDecorators: { read: [], export: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3hsc3gveGxzeC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUc1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBVXBELE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFlBQ1UsSUFBZ0IsRUFDaEIsSUFBaUIsRUFDekIsU0FBOEIsRUFDdEIsTUFBYztRQUhkLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUVqQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakMsR0FBRyxFQUFFLHlEQUF5RDtZQUM5RCxPQUFPLEVBQUUsQ0FBQyxtREFBbUQsQ0FBQztTQUMvRCxDQUFFLENBQUM7SUFDTixDQUFDO0lBR08sSUFBSTtRQUNWLE9BQU8sT0FBTyxJQUFJLEtBQUssV0FBVztZQUNoQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFHTyxJQUFJLENBQUMsSUFBZTtRQUMxQixNQUFNLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUN6QixHQUFHLElBQUksQ0FBQztRQUNULE1BQU0sR0FBRyxHQUFjLEVBQUUsQ0FB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QUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLEdBQVc7UUFDeEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixHQUFHO1lBQ0QsRUFBRSxHQUFHLENBQUM7WUFDTixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDeEQsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QixRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUU7UUFFbEIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzt3R0EzSFUsV0FBVzs0R0FBWCxXQUFXLGNBREUsTUFBTTtBQXNCOUI7SUFEQyxXQUFXLEVBQUU7dUNBcUJiO0FBNkJEO0lBREMsV0FBVyxFQUFFO3lDQW1DYjsyRkF4R1UsV0FBVztrQkFEdkIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7a0xBc0J4QixJQUFJLE1BaUROLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBpc1V0ZjggZnJvbSAnaXN1dGY4JztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpWGxzeENvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBab25lT3V0c2lkZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2RlY29yYXRvcic7XG5pbXBvcnQgeyBMYXp5UmVzdWx0LCBMYXp5U2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgWGxzeEV4cG9ydE9wdGlvbnMsIFhsc3hFeHBvcnRSZXN1bHQsIFhsc3hFeHBvcnRTaGVldCB9IGZyb20gJy4veGxzeC50eXBlcyc7XG5cbmRlY2xhcmUgdmFyIFhMU1g6IE56U2FmZUFueTtcbmRlY2xhcmUgdmFyIGNwdGFibGU6IE56U2FmZUFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBYbHN4U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGxhenk6IExhenlTZXJ2aWNlLFxuICAgIGNvbmZpZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICkge1xuICAgIHRoaXMuY29nID0gY29uZmlnU3J2Lm1lcmdlKCd4bHN4Jywge1xuICAgICAgdXJsOiAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS94bHN4L2Rpc3QveGxzeC5mdWxsLm1pbi5qcycsXG4gICAgICBtb2R1bGVzOiBbYGh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0veGxzeC9kaXN0L2NwZXhjZWwuanNgXVxuICAgIH0pITtcbiAgfVxuICBwcml2YXRlIGNvZzogWXVuemFpWGxzeENvbmZpZztcblxuICBwcml2YXRlIGluaXQoKTogUHJvbWlzZTxMYXp5UmVzdWx0W10+IHtcbiAgICByZXR1cm4gdHlwZW9mIFhMU1ggIT09ICd1bmRlZmluZWQnXG4gICAgICA/IFByb21pc2UucmVzb2x2ZShbXSlcbiAgICAgIDogdGhpcy5sYXp5LmxvYWQoW3RoaXMuY29nLnVybCFdLmNvbmNhdCh0aGlzLmNvZy5tb2R1bGVzISkpO1xuICB9XG5cbiAgQFpvbmVPdXRzaWRlKClcbiAgcHJpdmF0ZSByZWFkKGRhdGE6IE56U2FmZUFueSk6IHsgW2tleTogc3RyaW5nXTogTnpTYWZlQW55W11bXSB9IHtcbiAgICBjb25zdCB7XG4gICAgICByZWFkLFxuICAgICAgdXRpbHM6IHsgc2hlZXRfdG9fanNvbiB9XG4gICAgfSA9IFhMU1g7XG4gICAgY29uc3QgcmV0OiBOelNhZmVBbnkgPSB7fTtcbiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICBsZXQgdHlwZSA9ICdhcnJheSc7XG4gICAgaWYgKCFpc1V0ZjgoYnVmKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGNwdGFibGUudXRpbHMuZGVjb2RlKDkzNiwgYnVmKTtcbiAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgfSBjYXRjaCB7fVxuICAgIH1cbiAgICBjb25zdCB3YiA9IHJlYWQoZGF0YSwgeyB0eXBlIH0pO1xuICAgIHdiLlNoZWV0TmFtZXMuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzaGVldDogTnpTYWZlQW55ID0gd2IuU2hlZXRzW25hbWVdO1xuICAgICAgcmV0W25hbWVdID0gc2hlZXRfdG9fanNvbihzaGVldCwgeyBoZWFkZXI6IDEgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7zlhaVFeGNlbOW5tui+k+WHukpTT07vvIzmlK/mjIEgYDxpbnB1dCB0eXBlPVwiZmlsZVwiPmDjgIFVUkwg5b2i5byPXG4gICAqL1xuICBpbXBvcnQoZmlsZU9yVXJsOiBGaWxlIHwgc3RyaW5nKTogUHJvbWlzZTx7IFtrZXk6IHN0cmluZ106IE56U2FmZUFueVtdW10gfT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IFtrZXk6IHN0cmluZ106IE56U2FmZUFueVtdW10gfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgciA9IChkYXRhOiBOelNhZmVBbnkpOiB2b2lkID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiByZXNvbHZlKHRoaXMucmVhZChkYXRhKSkpO1xuICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIC8vIGZyb20gdXJsXG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWxlT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdCgnR0VUJywgZmlsZU9yVXJsLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICBuZXh0OiAocmVzOiBBcnJheUJ1ZmZlcikgPT4gcihuZXcgVWludDhBcnJheShyZXMpKSxcbiAgICAgICAgICAgICAgZXJyb3I6IChlcnI6IE56U2FmZUFueSkgPT4gcmVqZWN0KGVycilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBmcm9tIGZpbGVcbiAgICAgICAgICBjb25zdCByZWFkZXI6IEZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZTogTnpTYWZlQW55KSA9PiByKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZTogTnpTYWZlQW55KSA9PiByZWplY3QoZSk7XG4gICAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVPclVybCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiByZWplY3QoYFVuYWJsZSB0byBsb2FkIHhsc3guanNgKSk7XG4gICAgfSk7XG4gIH1cblxuICBAWm9uZU91dHNpZGUoKVxuICBhc3luYyBleHBvcnQob3B0aW9uczogWGxzeEV4cG9ydE9wdGlvbnMpOiBQcm9taXNlPFhsc3hFeHBvcnRSZXN1bHQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8WGxzeEV4cG9ydFJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG9wdGlvbnMgPSB7IGZvcm1hdDogJ3hsc3gnLCAuLi5vcHRpb25zIH07XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgd3JpdGVGaWxlLFxuICAgICAgICAgICAgdXRpbHM6IHsgYm9va19uZXcsIGFvYV90b19zaGVldCwgYm9va19hcHBlbmRfc2hlZXQgfVxuICAgICAgICAgIH0gPSBYTFNYO1xuICAgICAgICAgIGNvbnN0IHdiOiBOelNhZmVBbnkgPSBib29rX25ldygpO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuc2hlZXRzKSkge1xuICAgICAgICAgICAgKG9wdGlvbnMuc2hlZXRzIGFzIFhsc3hFeHBvcnRTaGVldFtdKS5mb3JFYWNoKCh2YWx1ZTogWGxzeEV4cG9ydFNoZWV0LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHdzOiBOelNhZmVBbnkgPSBhb2FfdG9fc2hlZXQodmFsdWUuZGF0YSk7XG4gICAgICAgICAgICAgIGJvb2tfYXBwZW5kX3NoZWV0KHdiLCB3cywgdmFsdWUubmFtZSB8fCBgU2hlZXQke2luZGV4ICsgMX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3Yi5TaGVldE5hbWVzID0gT2JqZWN0LmtleXMob3B0aW9ucy5zaGVldHMpO1xuICAgICAgICAgICAgd2IuU2hlZXRzID0gb3B0aW9ucy5zaGVldHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIG9wdGlvbnMuY2FsbGJhY2sod2IpO1xuXG4gICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBvcHRpb25zLmZpbGVuYW1lIHx8IGBleHBvcnQuJHtvcHRpb25zLmZvcm1hdH1gO1xuICAgICAgICAgIHdyaXRlRmlsZSh3YiwgZmlsZW5hbWUsIHtcbiAgICAgICAgICAgIGJvb2tUeXBlOiBvcHRpb25zLmZvcm1hdCxcbiAgICAgICAgICAgIGJvb2tTU1Q6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMub3B0c1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmVzb2x2ZSh7IGZpbGVuYW1lLCB3YiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5pWw5o2u6L2s56ym5Y+35ZCNXG4gICAqIC0gYDFgID0+IGBBYFxuICAgKiAtIGAyN2AgPT4gYEFBYFxuICAgKiAtIGA3MDNgID0+IGBBQUFgXG4gICAqL1xuICBudW1iZXJUb1NjaGVtYSh2YWw6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3Qgc3RhcnRDb2RlID0gJ0EnLmNoYXJDb2RlQXQoMCk7XG4gICAgbGV0IHJlcyA9ICcnO1xuXG4gICAgZG8ge1xuICAgICAgLS12YWw7XG4gICAgICByZXMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHN0YXJ0Q29kZSArICh2YWwgJSAyNikpICsgcmVzO1xuICAgICAgdmFsID0gKHZhbCAvIDI2KSA+PiAwO1xuICAgIH0gd2hpbGUgKHZhbCA+IDApO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIl19