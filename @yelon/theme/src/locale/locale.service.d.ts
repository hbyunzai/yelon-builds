import { Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { FullLocaleData, LocaleData } from './locale.types';
export declare class YelonLocaleService {
    private _locale;
    private change$;
    constructor(locale: FullLocaleData | null);
    get change(): Observable<FullLocaleData>;
    setLocale(locale: FullLocaleData): void;
    get locale(): FullLocaleData;
    getData(path: keyof FullLocaleData): LocaleData;
}
export declare function YELON_LOCALE_SERVICE_PROVIDER_FACTORY(exist: YelonLocaleService, locale: FullLocaleData): YelonLocaleService;
export declare const YELON_LOCALE_SERVICE_PROVIDER: Provider;
