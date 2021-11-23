import { Platform } from '@angular/cdk/platform';
import { Observable } from 'rxjs';
import { YelonLocaleService, SettingsService, _HttpClient, YunzaiI18nBaseService } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
export declare class YzI18NService extends YunzaiI18nBaseService {
    private http;
    private settings;
    private nzI18nService;
    private yelonLocaleService;
    private platform;
    protected _defaultLang: string;
    private _langs;
    constructor(http: _HttpClient, settings: SettingsService, nzI18nService: NzI18nService, yelonLocaleService: YelonLocaleService, platform: Platform, cogSrv: YunzaiConfigService);
    private getDefaultLang;
    loadLangData(lang: string): Observable<NzSafeAny>;
    use(lang: string, data: Record<string, unknown>): void;
    getLangs(): Array<{
        code: string;
        text: string;
        abbr: string;
    }>;
}
