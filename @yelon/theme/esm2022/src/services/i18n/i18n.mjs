import { inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
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
        if (!params)
            return content;
        if (typeof params === 'object') {
            const interpolation = this.cog.interpolation;
            const objParams = params;
            Object.keys(objParams).forEach(key => (content = content.replace(new RegExp(`${interpolation[0]}\\s?${key}\\s?${interpolation[1]}`, 'g'), `${objParams[key]}`)));
        }
        (Array.isArray(params) ? params : [params]).forEach((item, index) => (content = content.replace(new RegExp(`\\{\\s?${index}\\s?\\}`, 'g'), `${item}`)));
        return content;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiI18nBaseService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiI18nBaseService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiI18nBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
export class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang, data) {
        this._data = this.flatData(data ?? {}, []);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return [];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiI18NServiceFake, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiI18NServiceFake, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiI18NServiceFake, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9pMThuL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNELE9BQU8sRUFBRSxtQkFBbUIsRUFBeUIsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBb0RoRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsaUJBQWlCLEVBQUU7SUFDeEYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFnQixxQkFBcUI7SUFNekMsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQXVCLENBQUM7SUFDekYsQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELFlBQVksTUFBMkI7UUFqQjdCLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDcEQsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUEyQixFQUFFLENBQUM7UUFlM0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQzVCLENBQUUsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxRQUFRLENBQUMsSUFBNkIsRUFBRSxTQUFtQjtRQUN6RCxNQUFNLEdBQUcsR0FBMkIsRUFBRSxDQUFDO1FBQ3ZDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQWdDLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztZQUN4RSxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQU1ELEtBQUssQ0FBQyxJQUFZLEVBQUUsTUFBNEI7UUFDOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sT0FBTyxDQUFDO1FBRTVCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFlLENBQUM7WUFDL0MsTUFBTSxTQUFTLEdBQUcsTUFBaUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FDNUIsR0FBRyxDQUFDLEVBQUUsQ0FDSixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUN4QixJQUFJLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQ3ZFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3BCLENBQUMsQ0FDTCxDQUFDO1FBQ0osQ0FBQztRQUVELENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUNqRCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDbkcsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7OEdBbkZtQixxQkFBcUI7a0hBQXJCLHFCQUFxQjs7MkZBQXJCLHFCQUFxQjtrQkFEMUMsVUFBVTs7QUF3RlgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLHFCQUFxQjtJQUM5RCxHQUFHLENBQUMsSUFBWSxFQUFFLElBQTZCO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzhHQVRVLHFCQUFxQjtrSEFBckIscUJBQXFCLGNBRFIsTUFBTTs7MkZBQ25CLHFCQUFxQjtrQkFEakMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIGZpbHRlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlLCBZdW56YWlUaGVtZUkxOG5Db25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFl1bnphaUkxOE5TZXJ2aWNlIHtcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xuXG4gIC8qKlxuICAgKiBDYWxsIGB1c2VgIHRvIHRyaWdnZXIgY2hhbmdlIG5vdGlmaWNhdGlvblxuICAgKlxuICAgKiDosIPnlKggYHVzZWAg6Kem5Y+R5Y+Y5pu06YCa55+lXG4gICAqL1xuICByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogR2V0IHRoZSBkZWZhdWx0IGxhbmd1YWdlXG4gICAqXG4gICAqIOiOt+WPlum7mOiupOivreiogFxuICAgKi9cbiAgcmVhZG9ubHkgZGVmYXVsdExhbmc6IHN0cmluZztcblxuICAvKipcbiAgICogR2V0IGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICpcbiAgICog6I635Y+W5b2T5YmN6K+t6KiAXG4gICAqL1xuICByZWFkb25seSBjdXJyZW50TGFuZzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2UgbGFuZ3VhZ2VcbiAgICpcbiAgICog5Y+Y5pu06K+t6KiAXG4gICAqXG4gICAqIEBwYXJhbSBlbWl0IOaYr+WQpuinpuWPkSBgY2hhbmdlYO+8jOm7mOiupO+8mnRydWUgOyBTaG91bGQgYmUgcmVtb3ZlZCwgcGxlYXNlIHVzZSBgY2hhbmdlYCBldmVudCBpbnN0ZWFkLlxuICAgKi9cbiAgdXNlKGxhbmc6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJuIHRvIHRoZSBjdXJyZW50IGxhbmd1YWdlIGxpc3RcbiAgICpcbiAgICog6L+U5Zue5b2T5YmN6K+t6KiA5YiX6KGoXG4gICAqL1xuICBnZXRMYW5ncygpOiBOelNhZmVBbnlbXTtcblxuICAvKipcbiAgICogVHJhbnNsYXRlIOe/u+ivkVxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIOaooeadv+aJgOmcgOimgeeahOWPguaVsOWvueixoVxuICAgKiBAcGFyYW0gaXNTYWZlIOaYr+WQpui/lOWbnuWuieWFqOWtl+espu+8jOiHquWKqOiwg+eUqCBgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWxgOyBTaG91bGQgYmUgcmVtb3ZlZCwgSWYgeW91IG5lZWQgU2FmZUh0bWwgc3VwcG9ydCwgcGxlYXNlIHVzZSBgfCBodG1sYCBwaXBlIGluc3RlYWQuXG4gICAqL1xuICBmYW55aShwYXRoOiBzdHJpbmcsIHBhcmFtcz86IHVua25vd24gfCB1bmtub3duW10pOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBZVU5aQUlfSTE4Tl9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxZdW56YWlJMThOU2VydmljZT4oJ3l1bnphaUkxOG5Ub2tlbicsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PiBuZXcgWXVuemFpSTE4TlNlcnZpY2VGYWtlKGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKSlcbn0pO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWXVuemFpSTE4bkJhc2VTZXJ2aWNlIGltcGxlbWVudHMgWXVuemFpSTE4TlNlcnZpY2Uge1xuICBwcml2YXRlIGNvZzogWXVuemFpVGhlbWVJMThuQ29uZmlnO1xuICBwcm90ZWN0ZWQgX2NoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRMYW5nOiBzdHJpbmcgPSAnJztcbiAgcHJvdGVjdGVkIF9kZWZhdWx0TGFuZzogc3RyaW5nID0gJyc7XG4gIHByb3RlY3RlZCBfZGF0YTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZSQuYXNPYnNlcnZhYmxlKCkucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSBhcyBPYnNlcnZhYmxlPHN0cmluZz47XG4gIH1cbiAgZ2V0IGRlZmF1bHRMYW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRMYW5nO1xuICB9XG4gIGdldCBjdXJyZW50TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TGFuZztcbiAgfVxuICBnZXQgZGF0YSgpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMuY29nID0gY29nU3J2Lm1lcmdlKCd0aGVtZUkxOG4nLCB7XG4gICAgICBpbnRlcnBvbGF0aW9uOiBbJ3t7JywgJ319J11cbiAgICB9KSE7XG4gIH1cblxuICAvKipcbiAgICogRmxhdHRlbmVkIGRhdGEgc291cmNlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHtcbiAgICogICBcIm5hbWVcIjogXCJOYW1lXCIsXG4gICAqICAgXCJzeXNcIjoge1xuICAgKiAgICAgXCJcIjogXCJTeXN0ZW1cIixcbiAgICogICAgIFwidGl0bGVcIjogXCJUaXRsZVwiXG4gICAqICAgfVxuICAgKiB9XG4gICAqID0+XG4gICAqIHtcbiAgICogICBcIm5hbWVcIjogXCJOYW1lXCIsXG4gICAqICAgXCJzeXNcIjogXCJTeXN0ZW1cIixcbiAgICogICBcInN5cy50aXRsZVwiOiBcIlRpdGxlXCJcbiAgICogfVxuICAgKi9cbiAgZmxhdERhdGEoZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHBhcmVudEtleTogc3RyaW5nW10pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuZmxhdERhdGEodmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHBhcmVudEtleS5jb25jYXQoa2V5KSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGNoaWxkKS5mb3JFYWNoKGNoaWxkS2V5ID0+IChyZXNbY2hpbGRLZXldID0gY2hpbGRbY2hpbGRLZXldKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNbKGtleSA/IHBhcmVudEtleS5jb25jYXQoa2V5KSA6IHBhcmVudEtleSkuam9pbignLicpXSA9IGAke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhYnN0cmFjdCB1c2UobGFuZzogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGdldExhbmdzKCk6IE56U2FmZUFueTtcblxuICBmYW55aShwYXRoOiBzdHJpbmcsIHBhcmFtcz86IHVua25vd24gfCB1bmtub3duW10pOiBzdHJpbmcge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5fZGF0YVtwYXRoXSB8fCAnJztcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiBwYXRoO1xuXG4gICAgaWYgKCFwYXJhbXMpIHJldHVybiBjb250ZW50O1xuXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBpbnRlcnBvbGF0aW9uID0gdGhpcy5jb2cuaW50ZXJwb2xhdGlvbiEhO1xuICAgICAgY29uc3Qgb2JqUGFyYW1zID0gcGFyYW1zIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgT2JqZWN0LmtleXMob2JqUGFyYW1zKS5mb3JFYWNoKFxuICAgICAgICBrZXkgPT5cbiAgICAgICAgICAoY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoYCR7aW50ZXJwb2xhdGlvblswXX1cXFxccz8ke2tleX1cXFxccz8ke2ludGVycG9sYXRpb25bMV19YCwgJ2cnKSxcbiAgICAgICAgICAgIGAke29ialBhcmFtc1trZXldfWBcbiAgICAgICAgICApKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAoQXJyYXkuaXNBcnJheShwYXJhbXMpID8gcGFyYW1zIDogW3BhcmFtc10pLmZvckVhY2goXG4gICAgICAoaXRlbSwgaW5kZXgpID0+IChjb250ZW50ID0gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcXFx7XFxcXHM/JHtpbmRleH1cXFxccz9cXFxcfWAsICdnJyksIGAke2l0ZW19YCkpXG4gICAgKTtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaUkxOE5TZXJ2aWNlRmFrZSBleHRlbmRzIFl1bnphaUkxOG5CYXNlU2VydmljZSB7XG4gIHVzZShsYW5nOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogdm9pZCB7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuZmxhdERhdGEoZGF0YSA/PyB7fSwgW10pO1xuICAgIHRoaXMuX2N1cnJlbnRMYW5nID0gbGFuZztcbiAgICB0aGlzLl9jaGFuZ2UkLm5leHQobGFuZyk7XG4gIH1cblxuICBnZXRMYW5ncygpOiBOelNhZmVBbnlbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=