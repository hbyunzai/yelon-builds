import { Injector, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { YunzaiI18NService } from '../i18n/i18n';
import { MenuService } from '../menu/menu.service';
import * as i0 from "@angular/core";
export declare class TitleService implements OnDestroy {
    private injector;
    private title;
    private menuSrv;
    private i18nSrv;
    private doc;
    private _prefix;
    private _suffix;
    private _separator;
    private _reverse;
    private i18n$;
    readonly DELAY_TIME = 25;
    constructor(injector: Injector, title: Title, menuSrv: MenuService, i18nSrv: YunzaiI18NService, doc: NzSafeAny);
    /** 设置分隔符 */
    set separator(value: string);
    /** 设置前缀 */
    set prefix(value: string);
    /** 设置后缀 */
    set suffix(value: string);
    /** 设置是否反转 */
    set reverse(value: boolean);
    /** 设置默认标题名 */
    default: string;
    private getByElement;
    private getByRoute;
    private getByMenu;
    private _setTitle;
    /**
     * Set the document title, will be delay `25ms`, pls refer to [#1261](https://github.com/hbyunzai/ng-yunzai/issues/1261)
     */
    setTitle(title?: string | string[]): void;
    /**
     * Set i18n key of the document title
     */
    setTitleByI18n(key: string, params?: unknown): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TitleService, [null, null, null, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TitleService>;
}
