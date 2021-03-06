import { InjectionToken } from '@angular/core';
import { YunzaiDateRangePickerConfig, YunzaiErrorCollectConfig, YunzaiImageConfig, YunzaiLoadingConfig, YunzaiLodopConfig, YunzaiMediaConfig, YunzaiOnboardingConfig, YunzaiPageHeaderConfig, YunzaiPdfConfig, YunzaiQRConfig, YunzaiSEConfig, YunzaiSGConfig, YunzaiSTConfig, YunzaiSVConfig, YunzaiXlsxConfig, YunzaiZipConfig } from './abc/index';
import { YunzaiACLConfig } from './acl/acl.type';
import { YunzaiAuthConfig } from './auth/auth.type';
import { YunzaiBusinessConfig } from './bis/bis.type';
import { YunzaiCacheConfig } from './cache/cache.type';
import { YunzaiChartConfig } from './chart/chart.type';
import { YunzaiMockConfig } from './mock/mock.type';
import { YunzaiSFConfig } from './sf/sf.type';
import { YunzaiStompConfig } from './stomp/stomp.type';
import { YunzaiThemeHttpClientConfig } from './theme/http.type';
import { YunzaiThemeI18nConfig } from './theme/i18n.type';
import { YunzaiThemeResponsiveConfig } from './theme/responsive.type';
import { YunzaiUtilArrayConfig } from './util/array.type';
import { YunzaiUtilCurrencyConfig } from './util/currency.type';
export interface YunzaiConfig {
    bis?: YunzaiBusinessConfig;
    stomp?: YunzaiStompConfig;
    dataRange?: YunzaiDateRangePickerConfig;
    errorCollect?: YunzaiErrorCollectConfig;
    image?: YunzaiImageConfig;
    loading?: YunzaiLoadingConfig;
    onboarding?: YunzaiOnboardingConfig;
    lodop?: YunzaiLodopConfig;
    pageHeader?: YunzaiPageHeaderConfig;
    qr?: YunzaiQRConfig;
    se?: YunzaiSEConfig;
    sg?: YunzaiSGConfig;
    sv?: YunzaiSVConfig;
    st?: YunzaiSTConfig;
    sf?: YunzaiSFConfig;
    xlsx?: YunzaiXlsxConfig;
    zip?: YunzaiZipConfig;
    pdf?: YunzaiPdfConfig;
    media?: YunzaiMediaConfig;
    acl?: YunzaiACLConfig;
    auth?: YunzaiAuthConfig;
    cache?: YunzaiCacheConfig;
    chart?: YunzaiChartConfig;
    mock?: YunzaiMockConfig;
    utilArray?: YunzaiUtilArrayConfig;
    utilCurrency?: YunzaiUtilCurrencyConfig;
    themeHttp?: YunzaiThemeHttpClientConfig;
    themeResponsive?: YunzaiThemeResponsiveConfig;
    themeI18n?: YunzaiThemeI18nConfig;
}
export declare type YunzaiConfigKey = keyof YunzaiConfig;
export declare const YUNZAI_CONFIG: InjectionToken<YunzaiConfig>;
export declare function YUNZAI_CONFIG_FACTORY(): YunzaiConfig;
