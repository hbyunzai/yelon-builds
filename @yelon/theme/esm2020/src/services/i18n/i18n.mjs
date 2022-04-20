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
YunzaiI18nBaseService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18nBaseService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
YunzaiI18nBaseService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18nBaseService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18nBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; } });
export class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang, data) {
        this._data = this.flatData(data ?? {}, []);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return [];
    }
}
YunzaiI18NServiceFake.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NServiceFake, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
YunzaiI18NServiceFake.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NServiceFake, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NServiceFake, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9pMThuL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxtQkFBbUIsRUFBeUIsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBc0RoRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsaUJBQWlCLEVBQUU7SUFDeEYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFnQixxQkFBcUI7SUFtQnpDLFlBQVksTUFBMkI7UUFqQjdCLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDcEQsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUEyQixFQUFFLENBQUM7UUFlM0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQzVCLENBQUUsQ0FBQztJQUNOLENBQUM7SUFqQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUs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LEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlLCBZdW56YWlUaGVtZUkxOG5Db25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJy4uL2h0dHAvaHR0cC5jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFl1bnphaUkxOE5TZXJ2aWNlIHtcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xuXG4gIC8qKlxuICAgKiBDYWxsIGB1c2VgIHRvIHRyaWdnZXIgY2hhbmdlIG5vdGlmaWNhdGlvblxuICAgKlxuICAgKiDosIPnlKggYHVzZWAg6Kem5Y+R5Y+Y5pu06YCa55+lXG4gICAqL1xuICByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogR2V0IHRoZSBkZWZhdWx0IGxhbmd1YWdlXG4gICAqXG4gICAqIOiOt+WPlum7mOiupOivreiogFxuICAgKi9cbiAgcmVhZG9ubHkgZGVmYXVsdExhbmc6IHN0cmluZztcblxuICAvKipcbiAgICogR2V0IGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICpcbiAgICog6I635Y+W5b2T5YmN6K+t6KiAXG4gICAqL1xuICByZWFkb25seSBjdXJyZW50TGFuZzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2UgbGFuZ3VhZ2VcbiAgICpcbiAgICog5Y+Y5pu06K+t6KiAXG4gICAqXG4gICAqIEBwYXJhbSBlbWl0IOaYr+WQpuinpuWPkSBgY2hhbmdlYO+8jOm7mOiupO+8mnRydWUgOyBTaG91bGQgYmUgcmVtb3ZlZCwgcGxlYXNlIHVzZSBgY2hhbmdlYCBldmVudCBpbnN0ZWFkLlxuICAgKi9cbiAgdXNlKGxhbmc6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJuIHRvIHRoZSBjdXJyZW50IGxhbmd1YWdlIGxpc3RcbiAgICpcbiAgICog6L+U5Zue5b2T5YmN6K+t6KiA5YiX6KGoXG4gICAqL1xuICBnZXRMYW5ncygpOiBOelNhZmVBbnlbXTtcblxuICAvKipcbiAgICogVHJhbnNsYXRlIOe/u+ivkVxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIOaooeadv+aJgOmcgOimgeeahOWPguaVsOWvueixoVxuICAgKiBAcGFyYW0gaXNTYWZlIOaYr+WQpui/lOWbnuWuieWFqOWtl+espu+8jOiHquWKqOiwg+eUqCBgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWxgOyBTaG91bGQgYmUgcmVtb3ZlZCwgSWYgeW91IG5lZWQgU2FmZUh0bWwgc3VwcG9ydCwgcGxlYXNlIHVzZSBgfCBodG1sYCBwaXBlIGluc3RlYWQuXG4gICAqL1xuICBmYW55aShwYXRoOiBzdHJpbmcsIHBhcmFtcz86IHVua25vd24pOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBZVU5aQUlfSTE4Tl9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxZdW56YWlJMThOU2VydmljZT4oJ3l1bnphaUkxOG5Ub2tlbicsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PiBuZXcgWXVuemFpSTE4TlNlcnZpY2VGYWtlKGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKSlcbn0pO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWXVuemFpSTE4bkJhc2VTZXJ2aWNlIGltcGxlbWVudHMgWXVuemFpSTE4TlNlcnZpY2Uge1xuICBwcml2YXRlIGNvZzogWXVuemFpVGhlbWVJMThuQ29uZmlnO1xuICBwcm90ZWN0ZWQgX2NoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRMYW5nOiBzdHJpbmcgPSAnJztcbiAgcHJvdGVjdGVkIF9kZWZhdWx0TGFuZzogc3RyaW5nID0gJyc7XG4gIHByb3RlY3RlZCBfZGF0YTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZSQuYXNPYnNlcnZhYmxlKCkucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSBhcyBPYnNlcnZhYmxlPHN0cmluZz47XG4gIH1cbiAgZ2V0IGRlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRMYW5nO1xuICB9XG4gIGdldCBjdXJyZW50TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TGFuZztcbiAgfVxuICBnZXQgZGF0YSgpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMuY29nID0gY29nU3J2Lm1lcmdlKCd0aGVtZUkxOG4nLCB7XG4gICAgICBpbnRlcnBvbGF0aW9uOiBbJ3t7JywgJ319J11cbiAgICB9KSE7XG4gIH1cblxuICAvKipcbiAgICogRmxhdHRlbmVkIGRhdGEgc291cmNlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHtcbiAgICogICBcIm5hbWVcIjogXCJOYW1lXCIsXG4gICAqICAgXCJzeXNcIjoge1xuICAgKiAgICAgXCJcIjogXCJTeXN0ZW1cIixcbiAgICogICAgIFwidGl0bGVcIjogXCJUaXRsZVwiXG4gICAqICAgfVxuICAgKiB9XG4gICAqID0+XG4gICAqIHtcbiAgICogICBcIm5hbWVcIjogXCJOYW1lXCIsXG4gICAqICAgXCJzeXNcIjogXCJTeXN0ZW1cIixcbiAgICogICBcInN5cy50aXRsZVwiOiBcIlRpdGxlXCJcbiAgICogfVxuICAgKi9cbiAgZmxhdERhdGEoZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHBhcmVudEtleTogc3RyaW5nW10pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuZmxhdERhdGEodmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHBhcmVudEtleS5jb25jYXQoa2V5KSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGNoaWxkKS5mb3JFYWNoKGNoaWxkS2V5ID0+IChyZXNbY2hpbGRLZXldID0gY2hpbGRbY2hpbGRLZXldKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNbKGtleSA/IHBhcmVudEtleS5jb25jYXQoa2V5KSA6IHBhcmVudEtleSkuam9pbignLicpXSA9IGAke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhYnN0cmFjdCB1c2UobGFuZzogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGdldExhbmdzKCk6IE56U2FmZUFueVtdO1xuXG4gIGZhbnlpKHBhdGg6IHN0cmluZywgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBzdHJpbmcge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5fZGF0YVtwYXRoXSB8fCAnJztcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbiA9IHRoaXMuY29nLmludGVycG9sYXRpb24hITtcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChcbiAgICAgICAga2V5ID0+XG4gICAgICAgICAgKGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoXG4gICAgICAgICAgICBuZXcgUmVnRXhwKGAke2ludGVycG9sYXRpb25bMF19XFxzPyR7a2V5fVxccz8ke2ludGVycG9sYXRpb25bMV19YCwgJ2cnKSxcbiAgICAgICAgICAgIGAke3BhcmFtc1trZXldfWBcbiAgICAgICAgICApKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZdW56YWlJMThOU2VydmljZUZha2UgZXh0ZW5kcyBZdW56YWlJMThuQmFzZVNlcnZpY2Uge1xuICB1c2UobGFuZzogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLmZsYXREYXRhKGRhdGEgPz8ge30sIFtdKTtcbiAgICB0aGlzLl9jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgdGhpcy5fY2hhbmdlJC5uZXh0KGxhbmcpO1xuICB9XG5cbiAgZ2V0TGFuZ3MoKTogTnpTYWZlQW55W10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19