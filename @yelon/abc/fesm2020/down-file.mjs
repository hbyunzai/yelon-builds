import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import * as i1 from '@yelon/theme';
import { YunzaiThemeModule } from '@yelon/theme';
import { CommonModule } from '@angular/common';

class DownFileDirective {
    constructor(el, _http) {
        this.el = el;
        this._http = _http;
        this.isFileSaverSupported = true;
        this.httpMethod = 'get';
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        let isFileSaverSupported = false;
        try {
            isFileSaverSupported = !!new Blob();
        }
        catch { }
        this.isFileSaverSupported = isFileSaverSupported;
        if (!isFileSaverSupported) {
            el.nativeElement.classList.add(`down-file__not-support`);
        }
    }
    getDisposition(data) {
        const arr = (data || '')
            .split(';')
            .filter(i => i.includes('='))
            .map(v => {
            const strArr = v.split('=');
            const utfId = `UTF-8''`;
            let value = strArr[1];
            if (value.startsWith(utfId))
                value = value.substring(utfId.length);
            return { [strArr[0].trim()]: value };
        });
        return arr.reduce((_o, item) => item, {});
    }
    setDisabled(status) {
        const el = this.el.nativeElement;
        el.disabled = status;
        el.classList[status ? 'add' : 'remove'](`down-file__disabled`);
    }
    async _click(ev) {
        if (!this.isFileSaverSupported || (typeof this.pre === 'function' && !(await this.pre(ev)))) {
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        this.setDisabled(true);
        this._http
            .request(this.httpMethod, this.httpUrl, {
            params: this.httpData || {},
            responseType: 'blob',
            observe: 'response',
            body: this.httpBody
        })
            .pipe(finalize(() => this.setDisabled(false)))
            .subscribe({
            next: (res) => {
                if (res.status !== 200 || res.body.size <= 0) {
                    this.error.emit(res);
                    return;
                }
                const disposition = this.getDisposition(res.headers.get('content-disposition'));
                let fileName = this.fileName;
                if (typeof fileName === 'function')
                    fileName = fileName(res);
                fileName =
                    fileName ||
                        disposition[`filename*`] ||
                        disposition[`filename`] ||
                        res.headers.get('filename') ||
                        res.headers.get('x-filename');
                saveAs(res.body, decodeURI(fileName));
                this.success.emit(res);
            },
            error: err => this.error.emit(err)
        });
    }
}
DownFileDirective.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DownFileDirective, deps: [{ token: i0.ElementRef }, { token: i1._HttpClient }], target: i0.????FactoryTarget.Directive });
DownFileDirective.??dir = i0.????ngDeclareDirective({ minVersion: "12.0.0", version: "13.3.3", type: DownFileDirective, selector: "[down-file]", inputs: { httpData: ["http-data", "httpData"], httpBody: ["http-body", "httpBody"], httpMethod: ["http-method", "httpMethod"], httpUrl: ["http-url", "httpUrl"], fileName: ["file-name", "fileName"], pre: "pre" }, outputs: { success: "success", error: "error" }, host: { listeners: { "click": "_click($event)" } }, exportAs: ["downFile"], ngImport: i0 });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DownFileDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[down-file]',
                    exportAs: 'downFile',
                    host: {
                        '(click)': '_click($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1._HttpClient }]; }, propDecorators: { httpData: [{
                type: Input,
                args: ['http-data']
            }], httpBody: [{
                type: Input,
                args: ['http-body']
            }], httpMethod: [{
                type: Input,
                args: ['http-method']
            }], httpUrl: [{
                type: Input,
                args: ['http-url']
            }], fileName: [{
                type: Input,
                args: ['file-name']
            }], pre: [{
                type: Input
            }], success: [{
                type: Output
            }], error: [{
                type: Output
            }] } });

const DIRECTIVES = [DownFileDirective];
class DownFileModule {
}
DownFileModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DownFileModule, deps: [], target: i0.????FactoryTarget.NgModule });
DownFileModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DownFileModule, declarations: [DownFileDirective], imports: [CommonModule, YunzaiThemeModule], exports: [DownFileDirective] });
DownFileModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DownFileModule, imports: [[CommonModule, YunzaiThemeModule]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DownFileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, YunzaiThemeModule],
                    declarations: [...DIRECTIVES],
                    exports: [...DIRECTIVES]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DownFileDirective, DownFileModule };
//# sourceMappingURL=down-file.mjs.map
