// 请参考：https://ng.yunzainfo.com/docs/i18n
import { Platform } from '@angular/cdk/platform';
import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import { Injectable } from '@angular/core';
import { enUS as dfEn, zhCN as dfZhCn, zhTW as dfZhTw } from 'date-fns/locale';
import { en_US as zorroEnUS, NzI18nService, zh_CN as zorroZhCN, zh_TW as zorroZhTW } from 'ng-zorro-antd/i18n';
import { YelonLocaleService, en_US as yelonEnUS, SettingsService, zh_CN as yelonZhCn, zh_TW as yelonZhTw, _HttpClient, YunzaiI18nBaseService } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "ng-zorro-antd/i18n";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@yelon/util/config";
const DEFAULT = 'zh-CN';
const LANGS = {
    'zh-CN': {
        text: '简体中文',
        ng: ngZh,
        zorro: zorroZhCN,
        date: dfZhCn,
        yelon: yelonZhCn,
        abbr: '🇨🇳'
    },
    'zh-TW': {
        text: '繁体中文',
        ng: ngZhTw,
        zorro: zorroZhTW,
        date: dfZhTw,
        yelon: yelonZhTw,
        abbr: '🇭🇰'
    },
    'en-US': {
        text: 'English',
        ng: ngEn,
        zorro: zorroEnUS,
        date: dfEn,
        yelon: yelonEnUS,
        abbr: '🇬🇧'
    }
};
export class YzI18NService extends YunzaiI18nBaseService {
    constructor(http, settings, nzI18nService, yelonLocaleService, platform, cogSrv) {
        super(cogSrv);
        this.http = http;
        this.settings = settings;
        this.nzI18nService = nzI18nService;
        this.yelonLocaleService = yelonLocaleService;
        this.platform = platform;
        this._defaultLang = DEFAULT;
        this._langs = Object.keys(LANGS).map(code => {
            const item = LANGS[code];
            return { code, text: item.text, abbr: item.abbr };
        });
        const defaultLang = this.getDefaultLang();
        if (this._langs.findIndex(w => w.code === defaultLang)) {
            this._defaultLang = defaultLang;
        }
    }
    getDefaultLang() {
        if (!this.platform.isBrowser) {
            return DEFAULT;
        }
        if (this.settings.layout.lang) {
            return this.settings.layout.lang;
        }
        let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
        const arr = res.split('-');
        return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
    }
    loadLangData(lang) {
        return this.http.get(`assets/tmp/i18n/${lang}.json`);
    }
    use(lang, data) {
        if (this._currentLang === lang)
            return;
        this._data = data;
        const item = LANGS[lang];
        registerLocaleData(item.ng);
        this.nzI18nService.setLocale(item.zorro);
        this.nzI18nService.setDateLocale(item.date);
        this.yelonLocaleService.setLocale(item.yelon);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return this._langs;
    }
}
YzI18NService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzI18NService_Factory() { return new YzI18NService(i0.ɵɵinject(i1._HttpClient), i0.ɵɵinject(i1.SettingsService), i0.ɵɵinject(i2.NzI18nService), i0.ɵɵinject(i1.YelonLocaleService), i0.ɵɵinject(i3.Platform), i0.ɵɵinject(i4.YunzaiConfigService)); }, token: YzI18NService, providedIn: "root" });
YzI18NService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
YzI18NService.ctorParameters = () => [
    { type: _HttpClient },
    { type: SettingsService },
    { type: NzI18nService },
    { type: YelonLocaleService },
    { type: Platform },
    { type: YunzaiConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouaTE4bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5pMThuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQztBQUM5QyxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQztBQUM5QyxPQUFPLE1BQU0sTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxJQUFJLElBQUksSUFBSSxFQUFFLElBQUksSUFBSSxNQUFNLEVBQUUsSUFBSSxJQUFJLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9FLE9BQU8sRUFBRSxLQUFLLElBQUksU0FBUyxFQUFFLGFBQWEsRUFBRSxLQUFLLElBQUksU0FBUyxFQUFFLEtBQUssSUFBSSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvRyxPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLEtBQUssSUFBSSxTQUFTLEVBQ2xCLGVBQWUsRUFDZixLQUFLLElBQUksU0FBUyxFQUNsQixLQUFLLElBQUksU0FBUyxFQUNsQixXQUFXLEVBQ1gscUJBQXFCLEVBQ3RCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7QUFXekQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3hCLE1BQU0sS0FBSyxHQUFzQztJQUMvQyxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLEVBQUUsRUFBRSxJQUFJO1FBQ1IsS0FBSyxFQUFFLFNB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WUFBRSxPQUFPO1FBRXZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7O1lBekRGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQTFDaEMsV0FBVztZQUhYLGVBQWU7WUFMWSxhQUFhO1lBR3hDLGtCQUFrQjtZQWRYLFFBQVE7WUFzQlIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6K+35Y+C6ICD77yaaHR0cHM6Ly9uZy55dW56YWluZm8uY29tL2RvY3MvaTE4blxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgcmVnaXN0ZXJMb2NhbGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCBuZ0VuIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL2VuJztcbmltcG9ydCBuZ1poIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL3poJztcbmltcG9ydCBuZ1poVHcgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvemgtSGFudCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGVuVVMgYXMgZGZFbiwgemhDTiBhcyBkZlpoQ24sIHpoVFcgYXMgZGZaaFR3IH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGVuX1VTIGFzIHpvcnJvRW5VUywgTnpJMThuU2VydmljZSwgemhfQ04gYXMgem9ycm9aaENOLCB6aF9UVyBhcyB6b3Jyb1poVFcgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQge1xuICBZZWxvbkxvY2FsZVNlcnZpY2UsXG4gIGVuX1VTIGFzIHllbG9uRW5VUyxcbiAgU2V0dGluZ3NTZXJ2aWNlLFxuICB6aF9DTiBhcyB5ZWxvblpoQ24sXG4gIHpoX1RXIGFzIHllbG9uWmhUdyxcbiAgX0h0dHBDbGllbnQsXG4gIFl1bnphaUkxOG5CYXNlU2VydmljZVxufSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmludGVyZmFjZSBMYW5nQ29uZmlnRGF0YSB7XG4gIGFiYnI6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBuZzogTnpTYWZlQW55O1xuICB6b3JybzogTnpTYWZlQW55O1xuICBkYXRlOiBOelNhZmVBbnk7XG4gIHllbG9uOiBOelNhZmVBbnk7XG59XG5cbmNvbnN0IERFRkFVTFQgPSAnemgtQ04nO1xuY29uc3QgTEFOR1M6IHsgW2tleTogc3RyaW5nXTogTGFuZ0NvbmZpZ0RhdGEgfSA9IHtcbiAgJ3poLUNOJzoge1xuICAgIHRleHQ6ICfnroDkvZPkuK3mlocnLFxuICAgIG5nOiBuZ1poLFxuICAgIHpvcnJvOiB6b3Jyb1poQ04sXG4gICAgZGF0ZTogZGZaaENuLFxuICAgIHllbG9uOiB5ZWxvblpoQ24sXG4gICAgYWJicjogJ/Cfh6jwn4ezJ1xuICB9LFxuICAnemgtVFcnOiB7XG4gICAgdGV4dDogJ+e5geS9k+S4reaWhycsXG4gICAgbmc6IG5nWmhUdyxcbiAgICB6b3Jybzogem9ycm9aaFRXLFxuICAgIGRhdGU6IGRmWmhUdyxcbiAgICB5ZWxvbjogeWVsb25aaFR3LFxuICAgIGFiYnI6ICfwn4et8J+HsCdcbiAgfSxcbiAgJ2VuLVVTJzoge1xuICAgIHRleHQ6ICdFbmdsaXNoJyxcbiAgICBuZzogbmdFbixcbiAgICB6b3Jybzogem9ycm9FblVTLFxuICAgIGRhdGU6IGRmRW4sXG4gICAgeWVsb246IHllbG9uRW5VUyxcbiAgICBhYmJyOiAn8J+HrPCfh6cnXG4gIH1cbn07XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXpJMThOU2VydmljZSBleHRlbmRzIFl1bnphaUkxOG5CYXNlU2VydmljZSB7XG4gIHByb3RlY3RlZCBfZGVmYXVsdExhbmcgPSBERUZBVUxUO1xuICBwcml2YXRlIF9sYW5ncyA9IE9iamVjdC5rZXlzKExBTkdTKS5tYXAoY29kZSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IExBTkdTW2NvZGVdO1xuICAgIHJldHVybiB7IGNvZGUsIHRleHQ6IGl0ZW0udGV4dCwgYWJicjogaXRlbS5hYmJyIH07XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogX0h0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgbnpJMThuU2VydmljZTogTnpJMThuU2VydmljZSxcbiAgICBwcml2YXRlIHllbG9uTG9jYWxlU2VydmljZTogWWVsb25Mb2NhbGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIGNvZ1NydjogWXVuemFpQ29uZmlnU2VydmljZVxuICApIHtcbiAgICBzdXBlcihjb2dTcnYpO1xuXG4gICAgY29uc3QgZGVmYXVsdExhbmcgPSB0aGlzLmdldERlZmF1bHRMYW5nKCk7XG4gICAgaWYgKHRoaXMuX2xhbmdzLmZpbmRJbmRleCh3ID0+IHcuY29kZSA9PT0gZGVmYXVsdExhbmcpKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0TGFuZyA9IGRlZmF1bHRMYW5nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdExhbmcoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm4gREVGQVVMVDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubGF5b3V0LmxhbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmxheW91dC5sYW5nO1xuICAgIH1cbiAgICBsZXQgcmVzID0gKG5hdmlnYXRvci5sYW5ndWFnZXMgPyBuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdIDogbnVsbCkgfHwgbmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgIGNvbnN0IGFyciA9IHJlcy5zcGxpdCgnLScpO1xuICAgIHJldHVybiBhcnIubGVuZ3RoIDw9IDEgPyByZXMgOiBgJHthcnJbMF19LSR7YXJyWzFdLnRvVXBwZXJDYXNlKCl9YDtcbiAgfVxuXG4gIGxvYWRMYW5nRGF0YShsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE56U2FmZUFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBhc3NldHMvdG1wL2kxOG4vJHtsYW5nfS5qc29uYCk7XG4gIH1cblxuICB1c2UobGFuZzogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRMYW5nID09PSBsYW5nKSByZXR1cm47XG5cbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcblxuICAgIGNvbnN0IGl0ZW0gPSBMQU5HU1tsYW5nXTtcbiAgICByZWdpc3RlckxvY2FsZURhdGEoaXRlbS5uZyk7XG4gICAgdGhpcy5uekkxOG5TZXJ2aWNlLnNldExvY2FsZShpdGVtLnpvcnJvKTtcbiAgICB0aGlzLm56STE4blNlcnZpY2Uuc2V0RGF0ZUxvY2FsZShpdGVtLmRhdGUpO1xuICAgIHRoaXMueWVsb25Mb2NhbGVTZXJ2aWNlLnNldExvY2FsZShpdGVtLnllbG9uKTtcbiAgICB0aGlzLl9jdXJyZW50TGFuZyA9IGxhbmc7XG5cbiAgICB0aGlzLl9jaGFuZ2UkLm5leHQobGFuZyk7XG4gIH1cblxuICBnZXRMYW5ncygpOiBBcnJheTx7IGNvZGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBhYmJyOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiB0aGlzLl9sYW5ncztcbiAgfVxufVxuIl19