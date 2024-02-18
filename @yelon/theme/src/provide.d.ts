import { EnvironmentProviders, Type } from '@angular/core';
import type { IconDefinition } from '@ant-design/icons-angular';
import { YunzaiConfig } from '@yelon/util/config';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
export interface YunzaiProvideOptions {
    config?: YunzaiConfig;
    /**
     * Initialize default language
     *
     * 初始化默认语言
     */
    defaultLang?: YunzaiProvideLang;
    i18nClass?: Type<NzSafeAny>;
    icons?: IconDefinition[];
}
export interface YunzaiProvideLang {
    abbr: string;
    ng: NzSafeAny;
    zorro: NzSafeAny;
    date: NzSafeAny;
    yelon: NzSafeAny;
}
export declare function provideYunzai(options: YunzaiProvideOptions): EnvironmentProviders;
