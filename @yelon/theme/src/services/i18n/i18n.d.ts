import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i0 from "@angular/core";
export interface YunzaiI18NService {
    [key: string]: any;
    /**
     * Call `use` to trigger change notification
     *
     * 调用 `use` 触发变更通知
     */
    readonly change: Observable<string>;
    /**
     * Get the default language
     *
     * 获取默认语言
     */
    readonly defaultLang: string;
    /**
     * Get current language
     *
     * 获取当前语言
     */
    readonly currentLang: string;
    /**
     * Change language
     *
     * 变更语言
     *
     * @param emit 是否触发 `change`，默认：true ; Should be removed, please use `change` event instead.
     */
    use(lang: string, data?: Record<string, unknown>): void;
    /**
     * Return to the current language list
     *
     * 返回当前语言列表
     */
    getLangs(): any[];
    /**
     * Translate 翻译
     *
     * @param params 模板所需要的参数对象
     * @param isSafe 是否返回安全字符，自动调用 `bypassSecurityTrustHtml`; Should be removed, If you need SafeHtml support, please use `| html` pipe instead.
     */
    fanyi(path: string, params?: unknown | unknown[]): string;
}
export declare const YUNZAI_I18N_TOKEN: InjectionToken<YunzaiI18NService>;
export declare abstract class YunzaiI18nBaseService implements YunzaiI18NService {
    private cog;
    protected _change$: BehaviorSubject<string | null>;
    protected _currentLang: string;
    protected _defaultLang: string;
    protected _data: Record<string, string>;
    get change(): Observable<string>;
    get defaultLang(): string;
    get currentLang(): string;
    get data(): Record<string, string>;
    constructor(cogSrv: YunzaiConfigService);
    /**
     * Flattened data source
     *
     * @example
     * {
     *   "name": "Name",
     *   "sys": {
     *     "": "System",
     *     "title": "Title"
     *   }
     * }
     * =>
     * {
     *   "name": "Name",
     *   "sys": "System",
     *   "sys.title": "Title"
     * }
     */
    flatData(data: Record<string, unknown>, parentKey: string[]): Record<string, string>;
    abstract use(lang: string, data?: Record<string, unknown>): void;
    abstract getLangs(): any;
    fanyi(path: string, params?: unknown | unknown[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiI18nBaseService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiI18nBaseService>;
}
export declare class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang: string, data: Record<string, unknown>): void;
    getLangs(): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiI18NServiceFake, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiI18NServiceFake>;
}
