import { PipeTransform } from '@angular/core';
import { YunzaiI18NService } from './i18n';
export declare class I18nPipe implements PipeTransform {
    private i18n;
    constructor(i18n: YunzaiI18NService);
    transform(key: string, params?: Record<string, unknown>): string;
}
