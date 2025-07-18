import { HttpResponse } from '@angular/common/http';
import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@yelon/theme';

declare class DownFileDirective {
    private readonly el;
    private readonly _http;
    httpData: any;
    httpBody: any;
    httpMethod: string;
    httpUrl: string;
    fileName?: string | ((rep: HttpResponse<Blob>) => string);
    pre?: (ev: MouseEvent) => Promise<boolean>;
    readonly success: EventEmitter<HttpResponse<Blob>>;
    readonly error: EventEmitter<any>;
    private getDisposition;
    private isFileSaverSupported;
    constructor();
    private setDisabled;
    _click(ev: MouseEvent): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DownFileDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DownFileDirective, "[down-file]", ["downFile"], { "httpData": { "alias": "http-data"; "required": false; }; "httpBody": { "alias": "http-body"; "required": false; }; "httpMethod": { "alias": "http-method"; "required": false; }; "httpUrl": { "alias": "http-url"; "required": true; }; "fileName": { "alias": "file-name"; "required": false; }; "pre": { "alias": "pre"; "required": false; }; }, { "success": "success"; "error": "error"; }, never, never, true, never>;
}

declare class DownFileModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DownFileModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DownFileModule, never, [typeof i1.CommonModule, typeof i2.YunzaiThemeModule, typeof DownFileDirective], [typeof DownFileDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DownFileModule>;
}

export { DownFileDirective, DownFileModule };
