import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import { Inject, Injectable } from '@angular/core';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { enUS as dfEn } from 'date-fns/locale';
import { map } from 'rxjs/operators';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { en_US as zorroEnUS } from 'ng-zorro-antd/i18n';
import yelonEnUS from '../../locale/languages/en-US';
import { YunzaiI18nBaseService } from './i18n';
import { YUNZAI_LANGS } from './lang';
import * as i0 from "@angular/core";
import * as i1 from "../http/http.client";
import * as i2 from "../settings/settings.service";
import * as i3 from "ng-zorro-antd/i18n";
import * as i4 from "../../locale/locale.service";
import * as i5 from "@angular/cdk/platform";
import * as i6 from "@yelon/util/config";
const DEFAULT = 'zh-CN';
export class YunzaiHttpI18NService extends YunzaiI18nBaseService {
    constructor(http, settings, nzI18nService, yelonLocaleService, platform, tokenService, cogSrv) {
        super(cogSrv);
        this.http = http;
        this.settings = settings;
        this.nzI18nService = nzI18nService;
        this.yelonLocaleService = yelonLocaleService;
        this.platform = platform;
        this.tokenService = tokenService;
        this._defaultLang = DEFAULT;
        this.$destroy = new Subject();
        if (this.tokenService.get()?.access_token) {
            const defaultLang = this.getDefaultLang();
            this.getLangs()
                .pipe(takeUntil(this.$destroy))
                .subscribe(langs => {
                this._defaultLang = langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
            });
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
        if (ngDevMode) {
            return this.http.get(`./assets/tmp/i18n/${lang}.json`);
        }
        else {
            return this.http
                .get(`/i18n/api/v2/language/${lang}`)
                .pipe(catchError(() => this.http.get(`./assets/tmp/i18n/${lang}.json`)));
        }
    }
    use(lang, data) {
        if (this._currentLang === lang)
            return;
        this._data = this.flatData(data, []);
        const item = YUNZAI_LANGS[lang];
        if (item) {
            registerLocaleData(item.ng);
            this.nzI18nService.setLocale(item.zorro);
            this.nzI18nService.setDateLocale(item.date);
            this.yelonLocaleService.setLocale(item.yelon);
            this._currentLang = lang;
            this._change$.next(lang);
        }
        else {
            registerLocaleData(ngEn);
            this.nzI18nService.setLocale(zorroEnUS);
            this.nzI18nService.setDateLocale(dfEn);
            this.yelonLocaleService.setLocale(yelonEnUS);
            this._currentLang = lang;
            this._change$.next(lang);
        }
    }
    getLangs() {
        const langs = Object.keys(YUNZAI_LANGS).map(code => {
            const item = YUNZAI_LANGS[code];
            return { code, text: item.text, abbr: item.abbr, image: undefined };
        });
        if (ngDevMode) {
            return of(langs);
        }
        else {
            return this.http.get(`/i18n/api/v2/language`).pipe(map((response) => {
                return response.data;
            }), catchError(() => of(langs)));
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiHttpI18NService, deps: [{ token: i1._HttpClient }, { token: i2.SettingsService }, { token: i3.NzI18nService }, { token: i4.YelonLocaleService }, { token: i5.Platform }, { token: YA_SERVICE_TOKEN }, { token: i6.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiHttpI18NService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiHttpI18NService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1._HttpClient }, { type: i2.SettingsService }, { type: i3.NzI18nService }, { type: i4.YelonLocaleService }, { type: i5.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YA_SERVICE_TOKEN]
                }] }, { type: i6.YunzaiConfigService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWkxOG4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaTE4bi95dW56YWktaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQWMsVUFBVSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxJQUFJLElBQUksSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHOUQsT0FBTyxFQUFpQixLQUFLLElBQUksU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkUsT0FBTyxTQUFTLE1BQU0sOEJBQThCLENBQUM7QUFJckQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7O0FBSXRDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQztBQVN4QixNQUFNLE9BQU8scUJBQXNCLFNBQVEscUJBQXFCO0lBSTlELFlBQ1UsSUFBaUIsRUFDakIsUUFBeUIsRUFDekIsYUFBNEIsRUFDNUIsa0JBQXNDLEVBQ3RDLFFBQWtCLEVBQ1EsWUFBMkIsRUFDN0QsTUFBMkI7UUFFM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBUk4sU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixhQUFRLEdB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LENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FDaEQsR0FBRyxDQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFO2dCQUMxQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUM1QixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzhHQXRGVSxxQkFBcUIsbUtBVXRCLGdCQUFnQjtrSEFWZixxQkFBcUIsY0FEUixNQUFNOzsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBVzdCLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgcmVnaXN0ZXJMb2NhbGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCBuZ0VuIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL2VuJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBjYXRjaEVycm9yLCBvZiwgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGVuVVMgYXMgZGZFbiB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElUb2tlblNlcnZpY2UsIFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICdAeWVsb24vYXV0aCc7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlLCBlbl9VUyBhcyB6b3Jyb0VuVVMgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeWVsb25FblVTIGZyb20gJy4uLy4uL2xvY2FsZS9sYW5ndWFnZXMvZW4tVVMnO1xuaW1wb3J0IHsgWWVsb25Mb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbG9jYWxlL2xvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnLi4vaHR0cC9odHRwLmNsaWVudCc7XG5pbXBvcnQgeyBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICcuLi9zZXR0aW5ncy9zZXR0aW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IFl1bnphaUkxOG5CYXNlU2VydmljZSB9IGZyb20gJy4vaTE4bic7XG5pbXBvcnQgeyBZVU5aQUlfTEFOR1MgfSBmcm9tICcuL2xhbmcnO1xuXG5kZWNsYXJlIGNvbnN0IG5nRGV2TW9kZTogYm9vbGVhbjtcblxuY29uc3QgREVGQVVMVCA9ICd6aC1DTic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgWXVuemFpSTE4TlR5cGUge1xuICBjb2RlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgYWJicjogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xufVxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZdW56YWlIdHRwSTE4TlNlcnZpY2UgZXh0ZW5kcyBZdW56YWlJMThuQmFzZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2RlZmF1bHRMYW5nID0gREVGQVVMVDtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuekkxOG5TZXJ2aWNlOiBOekkxOG5TZXJ2aWNlLFxuICAgIHByaXZhdGUgeWVsb25Mb2NhbGVTZXJ2aWNlOiBZZWxvbkxvY2FsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgQEluamVjdChZQV9TRVJWSUNFX1RPS0VOKSBwcml2YXRlIHRva2VuU2VydmljZTogSVRva2VuU2VydmljZSxcbiAgICBjb2dTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoY29nU3J2KTtcbiAgICBpZiAodGhpcy50b2tlblNlcnZpY2UuZ2V0KCk/LmFjY2Vzc190b2tlbikge1xuICAgICAgY29uc3QgZGVmYXVsdExhbmcgPSB0aGlzLmdldERlZmF1bHRMYW5nKCk7XG4gICAgICB0aGlzLmdldExhbmdzKClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpKVxuICAgICAgICAuc3Vic2NyaWJlKGxhbmdzID0+IHtcbiAgICAgICAgICB0aGlzLl9kZWZhdWx0TGFuZyA9IGxhbmdzLmZpbmRJbmRleCh3ID0+IHcuY29kZSA9PT0gZGVmYXVsdExhbmcpID09PSAtMSA/IERFRkFVTFQgOiBkZWZhdWx0TGFuZztcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybiBERUZBVUxUO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5sYXlvdXQubGFuZykge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubGF5b3V0Lmxhbmc7XG4gICAgfVxuICAgIGxldCByZXMgPSAobmF2aWdhdG9yLmxhbmd1YWdlcyA/IG5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBudWxsKSB8fCBuYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gICAgY29uc3QgYXJyID0gcmVzLnNwbGl0KCctJyk7XG4gICAgcmV0dXJuIGFyci5sZW5ndGggPD0gMSA/IHJlcyA6IGAke2FyclswXX0tJHthcnJbMV0udG9VcHBlckNhc2UoKX1gO1xuICB9XG5cbiAgbG9hZExhbmdEYXRhKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC4vYXNzZXRzL3RtcC9pMThuLyR7bGFuZ30uanNvbmApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgIC5nZXQoYC9pMThuL2FwaS92Mi9sYW5ndWFnZS8ke2xhbmd9YClcbiAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoKSA9PiB0aGlzLmh0dHAuZ2V0KGAuL2Fzc2V0cy90bXAvaTE4bi8ke2xhbmd9Lmpzb25gKSkpO1xuICAgIH1cbiAgfVxuXG4gIHVzZShsYW5nOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRMYW5nID09PSBsYW5nKSByZXR1cm47XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuZmxhdERhdGEoZGF0YSwgW10pO1xuICAgIGNvbnN0IGl0ZW0gPSBZVU5aQUlfTEFOR1NbbGFuZ107XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJlZ2lzdGVyTG9jYWxlRGF0YShpdGVtLm5nKTtcbiAgICAgIHRoaXMubnpJMThuU2VydmljZS5zZXRMb2NhbGUoaXRlbS56b3Jybyk7XG4gICAgICB0aGlzLm56STE4blNlcnZpY2Uuc2V0RGF0ZUxvY2FsZShpdGVtLmRhdGUpO1xuICAgICAgdGhpcy55ZWxvbkxvY2FsZVNlcnZpY2Uuc2V0TG9jYWxlKGl0ZW0ueWVsb24pO1xuICAgICAgdGhpcy5fY3VycmVudExhbmcgPSBsYW5nO1xuICAgICAgdGhpcy5fY2hhbmdlJC5uZXh0KGxhbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWdpc3RlckxvY2FsZURhdGEobmdFbik7XG4gICAgICB0aGlzLm56STE4blNlcnZpY2Uuc2V0TG9jYWxlKHpvcnJvRW5VUyk7XG4gICAgICB0aGlzLm56STE4blNlcnZpY2Uuc2V0RGF0ZUxvY2FsZShkZkVuKTtcbiAgICAgIHRoaXMueWVsb25Mb2NhbGVTZXJ2aWNlLnNldExvY2FsZSh5ZWxvbkVuVVMpO1xuICAgICAgdGhpcy5fY3VycmVudExhbmcgPSBsYW5nO1xuICAgICAgdGhpcy5fY2hhbmdlJC5uZXh0KGxhbmcpO1xuICAgIH1cbiAgfVxuXG4gIGdldExhbmdzKCk6IE9ic2VydmFibGU8WXVuemFpSTE4TlR5cGVbXT4ge1xuICAgIGNvbnN0IGxhbmdzID0gT2JqZWN0LmtleXMoWVVOWkFJX0xBTkdTKS5tYXAoY29kZSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gWVVOWkFJX0xBTkdTW2NvZGVdO1xuICAgICAgcmV0dXJuIHsgY29kZSwgdGV4dDogaXRlbS50ZXh0LCBhYmJyOiBpdGVtLmFiYnIsIGltYWdlOiB1bmRlZmluZWQgfTtcbiAgICB9KTtcbiAgICBpZiAobmdEZXZNb2RlKSB7XG4gICAgICByZXR1cm4gb2YobGFuZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgL2kxOG4vYXBpL3YyL2xhbmd1YWdlYCkucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKGxhbmdzKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=