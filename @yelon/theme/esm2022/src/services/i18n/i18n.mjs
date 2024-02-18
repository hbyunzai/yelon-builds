import { inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, filter, of } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export const YUNZAI_I18N_TOKEN = new InjectionToken('yunzaiI18nToken', {
    providedIn: 'root',
    factory: () => new YunzaiI18NServiceFake(inject(YunzaiConfigService))
});
export class YunzaiI18nBaseService {
    get change() {
        return this._change$.asObservable().pipe(filter(w => w != null));
    }
    get defaultLang() {
        return this._defaultLang;
    }
    get currentLang() {
        return this._currentLang;
    }
    get data() {
        return this._data;
    }
    constructor(cogSrv) {
        this._change$ = new BehaviorSubject(null);
        this._currentLang = '';
        this._defaultLang = '';
        this._data = {};
        this.cog = cogSrv.merge('themeI18n', {
            interpolation: ['{{', '}}']
        });
    }
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
    flatData(data, parentKey) {
        const res = {};
        for (const key of Object.keys(data)) {
            const value = data[key];
            if (typeof value === 'object') {
                const child = this.flatData(value, parentKey.concat(key));
                Object.keys(child).forEach(childKey => (res[childKey] = child[childKey]));
            }
            else {
                res[(key ? parentKey.concat(key) : parentKey).join('.')] = `${value}`;
            }
        }
        return res;
    }
    fanyi(path, params) {
        let content = this._data[path] || '';
        if (!content)
            return path;
        if (params) {
            const interpolation = this.cog.interpolation;
            Object.keys(params).forEach(key => (content = content.replace(new RegExp(`${interpolation[0]}\s?${key}\s?${interpolation[1]}`, 'g'), `${params[key]}`)));
        }
        return content;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18nBaseService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18nBaseService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18nBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
export class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang, data) {
        this._data = this.flatData(data ?? {}, []);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return of([]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NServiceFake, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NServiceFake, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiI18NServiceFake, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9pMThuL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQXlCLE1BQU0sb0JBQW9CLENBQUM7OztBQTJEaEYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQW9CLGlCQUFpQixFQUFFO0lBQ3hGLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3RFLENBQUMsQ0FBQztBQUdILE1BQU0sT0FBZ0IscUJBQXFCO0lBTXpDLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUF1QixDQUFDO0lBQ3pGLENBQUM7SUFDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxZQUFZLE1BQTJCO1FBakI3QixhQUFRLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ3BELGlCQUFZLEdB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MkZBQ25CLHFCQUFxQjtrQkFEakMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIGZpbHRlciwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpVGhlbWVJMThuQ29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBZdW56YWlJMThOVHlwZSB7XG4gIGNvZGU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBhYmJyOiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWXVuemFpSTE4TlNlcnZpY2Uge1xuICBba2V5OiBzdHJpbmddOiBOelNhZmVBbnk7XG5cbiAgLyoqXG4gICAqIENhbGwgYHVzZWAgdG8gdHJpZ2dlciBjaGFuZ2Ugbm90aWZpY2F0aW9uXG4gICAqXG4gICAqIOiwg+eUqCBgdXNlYCDop6blj5Hlj5jmm7TpgJrnn6VcbiAgICovXG4gIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgbGFuZ3VhZ2VcbiAgICpcbiAgICog6I635Y+W6buY6K6k6K+t6KiAXG4gICAqL1xuICByZWFkb25seSBkZWZhdWx0TGFuZzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCBsYW5ndWFnZVxuICAgKlxuICAgKiDojrflj5blvZPliY3or63oqIBcbiAgICovXG4gIHJlYWRvbmx5IGN1cnJlbnRMYW5nOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENoYW5nZSBsYW5ndWFnZVxuICAgKlxuICAgKiDlj5jmm7Tor63oqIBcbiAgICpcbiAgICogQHBhcmFtIGVtaXQg5piv5ZCm6Kem5Y+RIGBjaGFuZ2Vg77yM6buY6K6k77yadHJ1ZSA7IFNob3VsZCBiZSByZW1vdmVkLCBwbGVhc2UgdXNlIGBjaGFuZ2VgIGV2ZW50IGluc3RlYWQuXG4gICAqL1xuICB1c2UobGFuZzogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gdG8gdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgbGlzdFxuICAgKlxuICAgKiDov5Tlm57lvZPliY3or63oqIDliJfooahcbiAgICovXG4gIGdldExhbmdzKCk6IE9ic2VydmFibGU8WXVuemFpSTE4TlR5cGVbXT47XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSDnv7vor5FcbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyDmqKHmnb/miYDpnIDopoHnmoTlj4LmlbDlr7nosaFcbiAgICogQHBhcmFtIGlzU2FmZSDmmK/lkKbov5Tlm57lronlhajlrZfnrKbvvIzoh6rliqjosIPnlKggYGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sYDsgU2hvdWxkIGJlIHJlbW92ZWQsIElmIHlvdSBuZWVkIFNhZmVIdG1sIHN1cHBvcnQsIHBsZWFzZSB1c2UgYHwgaHRtbGAgcGlwZSBpbnN0ZWFkLlxuICAgKi9cbiAgZmFueWkocGF0aDogc3RyaW5nLCBwYXJhbXM/OiB1bmtub3duKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgWVVOWkFJX0kxOE5fVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48WXVuemFpSTE4TlNlcnZpY2U+KCd5dW56YWlJMThuVG9rZW4nLCB7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZmFjdG9yeTogKCkgPT4gbmV3IFl1bnphaUkxOE5TZXJ2aWNlRmFrZShpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSkpXG59KTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFl1bnphaUkxOG5CYXNlU2VydmljZSBpbXBsZW1lbnRzIFl1bnphaUkxOE5TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb2c6IFl1bnphaVRoZW1lSTE4bkNvbmZpZztcbiAgcHJvdGVjdGVkIF9jaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50TGFuZzogc3RyaW5nID0gJyc7XG4gIHByb3RlY3RlZCBfZGVmYXVsdExhbmc6IHN0cmluZyA9ICcnO1xuICBwcm90ZWN0ZWQgX2RhdGE6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSkgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICB9XG4gIGdldCBkZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0TGFuZztcbiAgfVxuICBnZXQgY3VycmVudExhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudExhbmc7XG4gIH1cbiAgZ2V0IGRhdGEoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb2dTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmNvZyA9IGNvZ1Nydi5tZXJnZSgndGhlbWVJMThuJywge1xuICAgICAgaW50ZXJwb2xhdGlvbjogWyd7eycsICd9fSddXG4gICAgfSkhO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsYXR0ZW5lZCBkYXRhIHNvdXJjZVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB7XG4gICAqICAgXCJuYW1lXCI6IFwiTmFtZVwiLFxuICAgKiAgIFwic3lzXCI6IHtcbiAgICogICAgIFwiXCI6IFwiU3lzdGVtXCIsXG4gICAqICAgICBcInRpdGxlXCI6IFwiVGl0bGVcIlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA9PlxuICAgKiB7XG4gICAqICAgXCJuYW1lXCI6IFwiTmFtZVwiLFxuICAgKiAgIFwic3lzXCI6IFwiU3lzdGVtXCIsXG4gICAqICAgXCJzeXMudGl0bGVcIjogXCJUaXRsZVwiXG4gICAqIH1cbiAgICovXG4gIGZsYXREYXRhKGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwYXJlbnRLZXk6IHN0cmluZ1tdKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmZsYXREYXRhKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwYXJlbnRLZXkuY29uY2F0KGtleSkpO1xuICAgICAgICBPYmplY3Qua2V5cyhjaGlsZCkuZm9yRWFjaChjaGlsZEtleSA9PiAocmVzW2NoaWxkS2V5XSA9IGNoaWxkW2NoaWxkS2V5XSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzWyhrZXkgPyBwYXJlbnRLZXkuY29uY2F0KGtleSkgOiBwYXJlbnRLZXkpLmpvaW4oJy4nKV0gPSBgJHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWJzdHJhY3QgdXNlKGxhbmc6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogdm9pZDtcblxuICBhYnN0cmFjdCBnZXRMYW5ncygpOiBPYnNlcnZhYmxlPFl1bnphaUkxOE5UeXBlW10+O1xuXG4gIGZhbnlpKHBhdGg6IHN0cmluZywgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBzdHJpbmcge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5fZGF0YVtwYXRoXSB8fCAnJztcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbiA9IHRoaXMuY29nLmludGVycG9sYXRpb24hITtcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChcbiAgICAgICAga2V5ID0+XG4gICAgICAgICAgKGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoXG4gICAgICAgICAgICBuZXcgUmVnRXhwKGAke2ludGVycG9sYXRpb25bMF19XFxzPyR7a2V5fVxccz8ke2ludGVycG9sYXRpb25bMV19YCwgJ2cnKSxcbiAgICAgICAgICAgIGAke3BhcmFtc1trZXldfWBcbiAgICAgICAgICApKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZdW56YWlJMThOU2VydmljZUZha2UgZXh0ZW5kcyBZdW56YWlJMThuQmFzZVNlcnZpY2Uge1xuICB1c2UobGFuZzogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLmZsYXREYXRhKGRhdGEgPz8ge30sIFtdKTtcbiAgICB0aGlzLl9jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgdGhpcy5fY2hhbmdlJC5uZXh0KGxhbmcpO1xuICB9XG5cbiAgZ2V0TGFuZ3MoKTogT2JzZXJ2YWJsZTxZdW56YWlJMThOVHlwZVtdPiB7XG4gICAgcmV0dXJuIG9mKFtdKTtcbiAgfVxufVxuIl19