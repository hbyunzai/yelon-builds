import { PipeTransform } from '@angular/core';
import { YunzaiI18NService } from './i18n';
import * as i0 from "@angular/core";
export declare class I18nPipe implements PipeTransform {
    private i18n;
    constructor(i18n: YunzaiI18NService);
    transform(key: string, params?: Record<string, unknown>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<I18nPipe, "i18n", false>;
}
