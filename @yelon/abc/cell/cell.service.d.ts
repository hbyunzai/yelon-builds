import { Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { CurrencyService } from '@yelon/util/format';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import type { CellOptions, CellTextResult, CellWidget } from './cell.types';
import * as i0 from "@angular/core";
export declare class CellService {
    private nzI18n;
    private currency;
    private dom;
    private globalOptions;
    private widgets;
    constructor(configSrv: YunzaiConfigService, nzI18n: NzI18nService, currency: CurrencyService, dom: DomSanitizer);
    registerWidget(key: string, widget: Type<unknown>): void;
    getWidget(key: string): CellWidget | undefined;
    private genType;
    fixOptions(options?: CellOptions): CellOptions;
    get(value: unknown, options?: CellOptions): Observable<CellTextResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CellService>;
}
