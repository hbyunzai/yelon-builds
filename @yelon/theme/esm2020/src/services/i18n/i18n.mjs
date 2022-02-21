import { inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export const YUNZAI_I18N_TOKEN = new InjectionToken('yunzaiI18nToken', {
    providedIn: 'root',
    factory: () => new YunzaiI18NServiceFake(inject(YunzaiConfigService))
});
export class YunzaiI18nBaseService {
    constructor(cogSrv) {
        this._change$ = new BehaviorSubject(null);
        this._currentLang = '';
        this._defaultLang = '';
        this._data = {};
        this.cog = cogSrv.merge('themeI18n', {
            interpolation: ['{{', '}}']
        });
    }
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
}
YunzaiI18nBaseService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiI18nBaseService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
YunzaiI18nBaseService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiI18nBaseService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiI18nBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; } });
export class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang, data) {
        this._data = this.flatData(data, []);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return [];
    }
}
YunzaiI18NServiceFake.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiI18NServiceFake, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
YunzaiI18NServiceFake.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiI18NServiceFake, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiI18NServiceFake, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9pMThuL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXhDLE9BQU8sRUFBRSxtQkFBbUIsRUFBeUIsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBcURoRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsaUJBQWlCLEVBQUU7SUFDeEYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFnQixxQkFBcUI7SUFtQnpDLFlBQVksTUFBMkI7UUFqQjdCLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDcEQsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUEyQixFQUFFLENBQUM7UUFlM0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQzVCLENBQUUsQ0FBQztJQUNOLENBQUM7SUFqQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUs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LEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpVGhlbWVJMThuQ29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICcuLi9odHRwL2h0dHAuY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBZdW56YWlJMThOU2VydmljZSB7XG4gIFtrZXk6IHN0cmluZ106IE56U2FmZUFueTtcblxuICAvKipcbiAgICogQ2FsbCBgdXNlYCB0byB0cmlnZ2VyIGNoYW5nZSBub3RpZmljYXRpb25cbiAgICpcbiAgICog6LCD55SoIGB1c2VgIOinpuWPkeWPmOabtOmAmuefpVxuICAgKi9cbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCBsYW5ndWFnZVxuICAgKlxuICAgKiDojrflj5bpu5jorqTor63oqIBcbiAgICovXG4gIHJlYWRvbmx5IGRlZmF1bHRMYW5nOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGxhbmd1YWdlXG4gICAqXG4gICAqIOiOt+WPluW9k+WJjeivreiogFxuICAgKi9cbiAgcmVhZG9ubHkgY3VycmVudExhbmc6IHN0cmluZztcblxuICAvKipcbiAgICogQ2hhbmdlIGxhbmd1YWdlXG4gICAqXG4gICAqIOWPmOabtOivreiogFxuICAgKlxuICAgKiBAcGFyYW0gZW1pdCDmmK/lkKbop6blj5EgYGNoYW5nZWDvvIzpu5jorqTvvJp0cnVlIDsgU2hvdWxkIGJlIHJlbW92ZWQsIHBsZWFzZSB1c2UgYGNoYW5nZWAgZXZlbnQgaW5zdGVhZC5cbiAgICovXG4gIHVzZShsYW5nOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybiB0byB0aGUgY3VycmVudCBsYW5ndWFnZSBsaXN0XG4gICAqXG4gICAqIOi/lOWbnuW9k+WJjeivreiogOWIl+ihqFxuICAgKi9cbiAgZ2V0TGFuZ3MoKTogTnpTYWZlQW55W107XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSDnv7vor5FcbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyDmqKHmnb/miYDpnIDopoHnmoTlj4LmlbDlr7nosaFcbiAgICogQHBhcmFtIGlzU2FmZSDmmK/lkKbov5Tlm57lronlhajlrZfnrKbvvIzoh6rliqjosIPnlKggYGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sYDsgU2hvdWxkIGJlIHJlbW92ZWQsIElmIHlvdSBuZWVkIFNhZmVIdG1sIHN1cHBvcnQsIHBsZWFzZSB1c2UgYHwgaHRtbGAgcGlwZSBpbnN0ZWFkLlxuICAgKi9cbiAgZmFueWkocGF0aDogc3RyaW5nLCBwYXJhbXM/OiB1bmtub3duKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgWVVOWkFJX0kxOE5fVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48WXVuemFpSTE4TlNlcnZpY2U+KCd5dW56YWlJMThuVG9rZW4nLCB7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZmFjdG9yeTogKCkgPT4gbmV3IFl1bnphaUkxOE5TZXJ2aWNlRmFrZShpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSkpXG59KTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFl1bnphaUkxOG5CYXNlU2VydmljZSBpbXBsZW1lbnRzIFl1bnphaUkxOE5TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb2c6IFl1bnphaVRoZW1lSTE4bkNvbmZpZztcbiAgcHJvdGVjdGVkIF9jaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50TGFuZzogc3RyaW5nID0gJyc7XG4gIHByb3RlY3RlZCBfZGVmYXVsdExhbmc6IHN0cmluZyA9ICcnO1xuICBwcm90ZWN0ZWQgX2RhdGE6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSkgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICB9XG4gIGdldCBkZWZhdWx0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0TGFuZztcbiAgfVxuICBnZXQgY3VycmVudExhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudExhbmc7XG4gIH1cbiAgZ2V0IGRhdGEoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb2dTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmNvZyA9IGNvZ1Nydi5tZXJnZSgndGhlbWVJMThuJywge1xuICAgICAgaW50ZXJwb2xhdGlvbjogWyd7eycsICd9fSddXG4gICAgfSkhO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsYXR0ZW5lZCBkYXRhIHNvdXJjZVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB7XG4gICAqICAgXCJuYW1lXCI6IFwiTmFtZVwiLFxuICAgKiAgIFwic3lzXCI6IHtcbiAgICogICAgIFwiXCI6IFwiU3lzdGVtXCIsXG4gICAqICAgICBcInRpdGxlXCI6IFwiVGl0bGVcIlxuICAgKiAgIH1cbiAgICogfVxuICAgKiA9PlxuICAgKiB7XG4gICAqICAgXCJuYW1lXCI6IFwiTmFtZVwiLFxuICAgKiAgIFwic3lzXCI6IFwiU3lzdGVtXCIsXG4gICAqICAgXCJzeXMudGl0bGVcIjogXCJUaXRsZVwiXG4gICAqIH1cbiAgICovXG4gIGZsYXREYXRhKGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwYXJlbnRLZXk6IHN0cmluZ1tdKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmZsYXREYXRhKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwYXJlbnRLZXkuY29uY2F0KGtleSkpO1xuICAgICAgICBPYmplY3Qua2V5cyhjaGlsZCkuZm9yRWFjaChjaGlsZEtleSA9PiAocmVzW2NoaWxkS2V5XSA9IGNoaWxkW2NoaWxkS2V5XSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzWyhrZXkgPyBwYXJlbnRLZXkuY29uY2F0KGtleSkgOiBwYXJlbnRLZXkpLmpvaW4oJy4nKV0gPSBgJHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWJzdHJhY3QgdXNlKGxhbmc6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogdm9pZDtcblxuICBhYnN0cmFjdCBnZXRMYW5ncygpOiBOelNhZmVBbnlbXTtcblxuICBmYW55aShwYXRoOiBzdHJpbmcsIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcbiAgICBsZXQgY29udGVudCA9IHRoaXMuX2RhdGFbcGF0aF0gfHwgJyc7XG4gICAgaWYgKCFjb250ZW50KSByZXR1cm4gcGF0aDtcblxuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIGNvbnN0IGludGVycG9sYXRpb24gPSB0aGlzLmNvZy5pbnRlcnBvbGF0aW9uISE7XG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goXG4gICAgICAgIGtleSA9PlxuICAgICAgICAgIChjb250ZW50ID0gY29udGVudC5yZXBsYWNlKFxuICAgICAgICAgICAgbmV3IFJlZ0V4cChgJHtpbnRlcnBvbGF0aW9uWzBdfVxccz8ke2tleX1cXHM/JHtpbnRlcnBvbGF0aW9uWzFdfWAsICdnJyksXG4gICAgICAgICAgICBgJHtwYXJhbXNba2V5XX1gXG4gICAgICAgICAgKSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZW50O1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXVuemFpSTE4TlNlcnZpY2VGYWtlIGV4dGVuZHMgWXVuemFpSTE4bkJhc2VTZXJ2aWNlIHtcbiAgdXNlKGxhbmc6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRhID0gdGhpcy5mbGF0RGF0YShkYXRhLCBbXSk7XG4gICAgdGhpcy5fY3VycmVudExhbmcgPSBsYW5nO1xuICAgIHRoaXMuX2NoYW5nZSQubmV4dChsYW5nKTtcbiAgfVxuXG4gIGdldExhbmdzKCk6IE56U2FmZUFueVtdIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cbiJdfQ==