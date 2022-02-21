import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import { Injectable } from '@angular/core';
import { enUS as dfEn, zhCN as dfZhCn, zhTW as dfZhTw } from 'date-fns/locale';
import { en_US as yelonEnUS, zh_CN as yelonZhCn, zh_TW as yelonZhTw, YunzaiI18nBaseService } from '@yelon/theme';
import { en_US as zorroEnUS, zh_CN as zorroZhCN, zh_TW as zorroZhTW } from 'ng-zorro-antd/i18n';
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
        this._defaultLang = this._langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
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
        this._data = this.flatData(data, []);
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
YzI18NService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzI18NService, deps: [{ token: i1._HttpClient }, { token: i1.SettingsService }, { token: i2.NzI18nService }, { token: i1.YelonLocaleService }, { token: i3.Platform }, { token: i4.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
YzI18NService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzI18NService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzI18NService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }, { type: i1.SettingsService }, { type: i2.NzI18nService }, { type: i1.YelonLocaleService }, { type: i3.Platform }, { type: i4.YunzaiConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouaTE4bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5pMThuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxJQUFJLE1BQU0sNEJBQTRCLENBQUM7QUFDOUMsT0FBTyxJQUFJLE1BQU0sNEJBQTRCLENBQUM7QUFDOUMsT0FBTyxNQUFNLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLElBQUksSUFBSSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRSxPQUFPLEVBRUwsS0FBSyxJQUFJLFNBQVMsRUFFbEIsS0FBSyxJQUFJLFNBQVMsRUFDbEIsS0FBSyxJQUFJLFNBQVMsRUFFbEIscUJBQXFCLEVBQ3RCLE1BQU0sY0FBYyxDQUFDO0FBR3RCLE9BQU8sRUFBRSxLQUFLLElBQUksU0FBUyxFQUFpQixLQUFLLElBQUksU0FBUyxFQUFFLEtBQUssSUFBSSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBVy9HLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN4QixNQUFNLEtBQUssR0FBc0M7SUFDL0MsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixFQUFFLEVBQUUsSUFBSTtRQUNSLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLFNBQVM7UUFDaEIsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osRUFBRSxFQUFFLE1BQU07UUFDVixLQUFLLEVBQUUsU0FB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QUksQ0FBQyxDQUFDO1FBQ3pCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7OzBHQXJEVSxhQUFhOzhHQUFiLGFBQWEsY0FEQSxNQUFNOzJGQUNuQixhQUFhO2tCQUR6QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIOivt+WPguiAg++8mmh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9kb2NzL2kxOG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgbmdFbiBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9lbic7XG5pbXBvcnQgbmdaaCBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy96aCc7XG5pbXBvcnQgbmdaaFR3IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL3poLUhhbnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBlblVTIGFzIGRmRW4sIHpoQ04gYXMgZGZaaENuLCB6aFRXIGFzIGRmWmhUdyB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5cbmltcG9ydCB7XG4gIFllbG9uTG9jYWxlU2VydmljZSxcbiAgZW5fVVMgYXMgeWVsb25FblVTLFxuICBTZXR0aW5nc1NlcnZpY2UsXG4gIHpoX0NOIGFzIHllbG9uWmhDbixcbiAgemhfVFcgYXMgeWVsb25aaFR3LFxuICBfSHR0cENsaWVudCxcbiAgWXVuemFpSTE4bkJhc2VTZXJ2aWNlXG59IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBlbl9VUyBhcyB6b3Jyb0VuVVMsIE56STE4blNlcnZpY2UsIHpoX0NOIGFzIHpvcnJvWmhDTiwgemhfVFcgYXMgem9ycm9aaFRXIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW50ZXJmYWNlIExhbmdDb25maWdEYXRhIHtcbiAgYWJicjogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIG5nOiBOelNhZmVBbnk7XG4gIHpvcnJvOiBOelNhZmVBbnk7XG4gIGRhdGU6IE56U2FmZUFueTtcbiAgeWVsb246IE56U2FmZUFueTtcbn1cblxuY29uc3QgREVGQVVMVCA9ICd6aC1DTic7XG5jb25zdCBMQU5HUzogeyBba2V5OiBzdHJpbmddOiBMYW5nQ29uZmlnRGF0YSB9ID0ge1xuICAnemgtQ04nOiB7XG4gICAgdGV4dDogJ+eugOS9k+S4reaWhycsXG4gICAgbmc6IG5nWmgsXG4gICAgem9ycm86IHpvcnJvWmhDTixcbiAgICBkYXRlOiBkZlpoQ24sXG4gICAgeWVsb246IHllbG9uWmhDbixcbiAgICBhYmJyOiAn8J+HqPCfh7MnXG4gIH0sXG4gICd6aC1UVyc6IHtcbiAgICB0ZXh0OiAn57mB5L2T5Lit5paHJyxcbiAgICBuZzogbmdaaFR3LFxuICAgIHpvcnJvOiB6b3Jyb1poVFcsXG4gICAgZGF0ZTogZGZaaFR3LFxuICAgIHllbG9uOiB5ZWxvblpoVHcsXG4gICAgYWJicjogJ/Cfh63wn4ewJ1xuICB9LFxuICAnZW4tVVMnOiB7XG4gICAgdGV4dDogJ0VuZ2xpc2gnLFxuICAgIG5nOiBuZ0VuLFxuICAgIHpvcnJvOiB6b3Jyb0VuVVMsXG4gICAgZGF0ZTogZGZFbixcbiAgICB5ZWxvbjogeWVsb25FblVTLFxuICAgIGFiYnI6ICfwn4es8J+HpydcbiAgfVxufTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZekkxOE5TZXJ2aWNlIGV4dGVuZHMgWXVuemFpSTE4bkJhc2VTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9kZWZhdWx0TGFuZyA9IERFRkFVTFQ7XG4gIHByaXZhdGUgX2xhbmdzID0gT2JqZWN0LmtleXMoTEFOR1MpLm1hcChjb2RlID0+IHtcbiAgICBjb25zdCBpdGVtID0gTEFOR1NbY29kZV07XG4gICAgcmV0dXJuIHsgY29kZSwgdGV4dDogaXRlbS50ZXh0LCBhYmJyOiBpdGVtLmFiYnIgfTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuekkxOG5TZXJ2aWNlOiBOekkxOG5TZXJ2aWNlLFxuICAgIHByaXZhdGUgeWVsb25Mb2NhbGVTZXJ2aWNlOiBZZWxvbkxvY2FsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgY29nU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGNvZ1Nydik7XG4gICAgY29uc3QgZGVmYXVsdExhbmcgPSB0aGlzLmdldERlZmF1bHRMYW5nKCk7XG4gICAgdGhpcy5fZGVmYXVsdExhbmcgPSB0aGlzLl9sYW5ncy5maW5kSW5kZXgodyA9PiB3LmNvZGUgPT09IGRlZmF1bHRMYW5nKSA9PT0gLTEgPyBERUZBVUxUIDogZGVmYXVsdExhbmc7XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuIERFRkFVTFQ7XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxheW91dC5sYW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5sYXlvdXQubGFuZztcbiAgICB9XG4gICAgbGV0IHJlcyA9IChuYXZpZ2F0b3IubGFuZ3VhZ2VzID8gbmF2aWdhdG9yLmxhbmd1YWdlc1swXSA6IG51bGwpIHx8IG5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICBjb25zdCBhcnIgPSByZXMuc3BsaXQoJy0nKTtcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA8PSAxID8gcmVzIDogYCR7YXJyWzBdfS0ke2FyclsxXS50b1VwcGVyQ2FzZSgpfWA7XG4gIH1cblxuICBsb2FkTGFuZ0RhdGEobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxOelNhZmVBbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgYXNzZXRzL3RtcC9pMThuLyR7bGFuZ30uanNvbmApO1xuICB9XG5cbiAgdXNlKGxhbmc6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudExhbmcgPT09IGxhbmcpIHJldHVybjtcblxuICAgIHRoaXMuX2RhdGEgPSB0aGlzLmZsYXREYXRhKGRhdGEsIFtdKTtcblxuICAgIGNvbnN0IGl0ZW0gPSBMQU5HU1tsYW5nXTtcbiAgICByZWdpc3RlckxvY2FsZURhdGEoaXRlbS5uZyk7XG4gICAgdGhpcy5uekkxOG5TZXJ2aWNlLnNldExvY2FsZShpdGVtLnpvcnJvKTtcbiAgICB0aGlzLm56STE4blNlcnZpY2Uuc2V0RGF0ZUxvY2FsZShpdGVtLmRhdGUpO1xuICAgIHRoaXMueWVsb25Mb2NhbGVTZXJ2aWNlLnNldExvY2FsZShpdGVtLnllbG9uKTtcbiAgICB0aGlzLl9jdXJyZW50TGFuZyA9IGxhbmc7XG5cbiAgICB0aGlzLl9jaGFuZ2UkLm5leHQobGFuZyk7XG4gIH1cblxuICBnZXRMYW5ncygpOiBBcnJheTx7IGNvZGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBhYmJyOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiB0aGlzLl9sYW5ncztcbiAgfVxufVxuIl19