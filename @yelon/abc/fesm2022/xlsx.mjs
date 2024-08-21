import { __decorate } from 'tslib';
import { HttpClient } from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, NgZone, Injectable, Directive, Input, NgModule } from '@angular/core';
import isUtf8 from 'isutf8';
import { ZoneOutside } from '@yelon/util/decorator';
import { LazyService } from '@yelon/util/other';
import * as i1 from '@yelon/util/config';

class XlsxService {
    constructor(configSrv) {
        this.http = inject(HttpClient);
        this.lazy = inject(LazyService);
        this.ngZone = inject(NgZone);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxService, providedIn: 'root' }); }
}
__decorate([
    ZoneOutside()
], XlsxService.prototype, "read", null);
__decorate([
    ZoneOutside()
], XlsxService.prototype, "export", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { read: [], export: [] } });

class XlsxDirective {
    constructor() {
        this.srv = inject(XlsxService);
    }
    _click() {
        this.srv.export(this.data);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.0", type: XlsxDirective, isStandalone: true, selector: "[xlsx]", inputs: { data: ["xlsx", "data"] }, host: { listeners: { "click": "_click()" } }, exportAs: ["xlsx"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[xlsx]',
                    exportAs: 'xlsx',
                    host: {
                        '(click)': '_click()'
                    },
                    standalone: true
                }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['xlsx']
            }] } });

const COMPONENTS = [XlsxDirective];
class XlsxModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.0", ngImport: i0, type: XlsxModule, imports: [XlsxDirective], exports: [XlsxDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: XlsxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { XlsxDirective, XlsxModule, XlsxService };
//# sourceMappingURL=xlsx.mjs.map
