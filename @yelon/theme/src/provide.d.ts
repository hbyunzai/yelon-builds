import { EnvironmentProviders, Type } from '@angular/core';
import type { IconDefinition } from '@ant-design/icons-angular';
import { YunzaiConfig } from '@yelon/util/config';
export interface YunzaiProvideOptions {
    config?: YunzaiConfig;
    /**
     * Initialize default language
     *
     * 初始化默认语言
     */
    defaultLang?: YunzaiProvideLang;
    i18nClass?: Type<any>;
    icons?: IconDefinition[];
}
export interface YunzaiProvideLang {
    abbr: string;
    ng: any;
    zorro: any;
    date: any;
    yelon: any;
}
export declare function provideYunzai(options: YunzaiProvideOptions): EnvironmentProviders;
