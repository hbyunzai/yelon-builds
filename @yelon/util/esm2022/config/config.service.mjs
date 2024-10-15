/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Optional } from '@angular/core';
import { deepMergeKey } from '@yelon/util/other';
import { YUNZAI_CONFIG } from './config.types';
import * as i0 from "@angular/core";
export class YunzaiConfigService {
    constructor(defaultConfig) {
        this.config = { ...defaultConfig };
    }
    get(componentName, key) {
        const res = (this.config[componentName] || {});
        return key ? { [key]: res[key] } : res;
    }
    merge(componentName, ...defaultValues) {
        return deepMergeKey({}, true, ...defaultValues, this.get(componentName));
    }
    attach(componentThis, componentName, defaultValues) {
        Object.assign(componentThis, this.merge(componentName, defaultValues));
    }
    attachKey(componentThis, componentName, key) {
        Object.assign(componentThis, this.get(componentName, key));
    }
    set(componentName, value) {
        this.config[componentName] = { ...this.config[componentName], ...value };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiConfigService, deps: [{ token: YUNZAI_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiConfigService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_CONFIG]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91dGlsL2NvbmZpZy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUdqRCxPQUFPLEVBQWlDLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc5RSxNQUFNLE9BQU8sbUJBQW1CO0lBRzlCLFlBQStDLGFBQTRCO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxHQUFHLENBQTRCLGFBQWdCLEVBQUUsR0FBWTtRQUMzRCxNQUFNLEdBQUcsR0FBRyxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFnQyxJQUFJLEVBQUUsQ0FBYyxDQUFDO1FBQzVGLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUE0QixhQUFnQixFQUFFLEdBQUcsYUFBcUM7UUFDekYsT0FBTyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELE1BQU0sQ0FBNEIsYUFBc0IsRUFBRSxhQUFnQixFQUFFLGFBQThCO1FBQ3hHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxTQUFTLENBQTRCLGFBQXNCLEVBQUUsYUFBZ0IsRUFBRSxHQUFXO1FBQ3hGLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBb0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxHQUFHLENBQTRCLGFBQWdCLEVBQUUsS0FBc0I7UUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQzNFLENBQUM7OEdBMUJVLG1CQUFtQixrQkFHRSxhQUFhO2tIQUhsQyxtQkFBbUIsY0FETixNQUFNOzsyRkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBSW5CLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZGVlcE1lcmdlS2V5IH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWcsIFl1bnphaUNvbmZpZ0tleSwgWVVOWkFJX0NPTkZJRyB9IGZyb20gJy4vY29uZmlnLnR5cGVzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZdW56YWlDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IFl1bnphaUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KFlVTlpBSV9DT05GSUcpIGRlZmF1bHRDb25maWc/OiBZdW56YWlDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHsgLi4uZGVmYXVsdENvbmZpZyB9O1xuICB9XG5cbiAgZ2V0PFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudE5hbWU6IFQsIGtleT86IHN0cmluZyk6IFl1bnphaUNvbmZpZ1tUXSB7XG4gICAgY29uc3QgcmVzID0gKCh0aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXSBhcyB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfSkgfHwge30pIGFzIE56U2FmZUFueTtcbiAgICByZXR1cm4ga2V5ID8geyBba2V5XTogcmVzW2tleV0gfSA6IHJlcztcbiAgfVxuXG4gIG1lcmdlPFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudE5hbWU6IFQsIC4uLmRlZmF1bHRWYWx1ZXM6IEFycmF5PFl1bnphaUNvbmZpZ1tUXT4pOiBZdW56YWlDb25maWdbVF0ge1xuICAgIHJldHVybiBkZWVwTWVyZ2VLZXkoe30sIHRydWUsIC4uLmRlZmF1bHRWYWx1ZXMsIHRoaXMuZ2V0KGNvbXBvbmVudE5hbWUpKTtcbiAgfVxuXG4gIGF0dGFjaDxUIGV4dGVuZHMgWXVuemFpQ29uZmlnS2V5Pihjb21wb25lbnRUaGlzOiB1bmtub3duLCBjb21wb25lbnROYW1lOiBULCBkZWZhdWx0VmFsdWVzOiBZdW56YWlDb25maWdbVF0pOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFRoaXMgYXMgYW55LCB0aGlzLm1lcmdlKGNvbXBvbmVudE5hbWUsIGRlZmF1bHRWYWx1ZXMpKTtcbiAgfVxuXG4gIGF0dGFjaEtleTxUIGV4dGVuZHMgWXVuemFpQ29uZmlnS2V5Pihjb21wb25lbnRUaGlzOiB1bmtub3duLCBjb21wb25lbnROYW1lOiBULCBrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50VGhpcyBhcyBhbnksIHRoaXMuZ2V0KGNvbXBvbmVudE5hbWUsIGtleSkpO1xuICB9XG5cbiAgc2V0PFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudE5hbWU6IFQsIHZhbHVlOiBZdW56YWlDb25maWdbVF0pOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXSA9IHsgLi4udGhpcy5jb25maWdbY29tcG9uZW50TmFtZV0sIC4uLnZhbHVlIH07XG4gIH1cbn1cbiJdfQ==