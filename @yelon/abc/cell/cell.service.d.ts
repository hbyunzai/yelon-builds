import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import type { CellOptions, CellTextResult, CellWidget } from './cell.types';
import * as i0 from "@angular/core";
export declare class CellService {
    private readonly nzI18n;
    private readonly currency;
    private readonly dom;
    private globalOptions;
    private widgets;
    constructor(configSrv: YunzaiConfigService);
    registerWidget(key: string, widget: Type<unknown>): void;
    getWidget(key: string): CellWidget | undefined;
    private genType;
    fixOptions(options?: CellOptions): CellOptions;
    get(value: unknown, options?: CellOptions): Observable<CellTextResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CellService>;
}
