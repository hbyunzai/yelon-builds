import { Platform } from '@angular/cdk/platform';
import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenService } from '@yelon/auth';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { YunzaiI18nBaseService } from './i18n';
import { YelonLocaleService } from '../../locale/locale.service';
import { _HttpClient } from '../http/http.client';
import { SettingsService } from '../settings/settings.service';
import * as i0 from "@angular/core";
export interface YunzaiI18NType {
    code: string;
    text: string;
    abbr: string;
    icon?: string;
}
export declare class YunzaiHttpI18NService extends YunzaiI18nBaseService implements OnDestroy {
    private http;
    private settings;
    private nzI18nService;
    private yelonLocaleService;
    private platform;
    private tokenService;
    protected _defaultLang: string;
    private $destroy;
    constructor(http: _HttpClient, settings: SettingsService, nzI18nService: NzI18nService, yelonLocaleService: YelonLocaleService, platform: Platform, tokenService: ITokenService, cogSrv: YunzaiConfigService);
    private getDefaultLang;
    loadLangData(lang: string): Observable<any>;
    loadLocaleData(lang: string): Observable<any>;
    use(lang: string, data: Record<string, unknown>): void;
    getLangs(): Observable<YunzaiI18NType[]>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHttpI18NService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiHttpI18NService>;
}
