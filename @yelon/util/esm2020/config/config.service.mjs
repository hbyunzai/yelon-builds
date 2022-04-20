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
}
YunzaiConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiConfigService, deps: [{ token: YUNZAI_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
YunzaiConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91dGlsL2NvbmZpZy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBaUMsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzlFLE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFBK0MsYUFBNEI7UUFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELEdBQUcsQ0FBNEIsYUFBZ0IsRUFBRSxHQUFZO1FBQzNELE1BQU0sR0FBRyxHQUFHLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQWdDLElBQUksRUFBRSxDQUFjLENBQUM7UUFDNUYsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQTRCLGFBQWdCLEVBQUUsR0FBRyxhQUFxQztRQUN6RixPQUFPLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsTUFBTSxDQUE0QixhQUFzQixFQUFFLGFBQWdCLEVBQUUsYUFBOEI7UUFDeEcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsU0FBUyxDQUE0QixhQUFzQixFQUFFLGFBQWdCLEVBQUUsR0FBVztRQUN4RixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxHQUFHLENBQTRCLGFBQWdCLEVBQUUsS0FBc0I7UUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQzNFLENBQUM7O2dIQTFCVSxtQkFBbUIsa0JBR0UsYUFBYTtvSEFIbEMsbUJBQW1CLGNBRE4sTUFBTTsyRkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBSW5CLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBkZWVwTWVyZ2VLZXkgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZywgWXVuemFpQ29uZmlnS2V5LCBZVU5aQUlfQ09ORklHIH0gZnJvbSAnLi9jb25maWcudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaUNvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogWXVuemFpQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoWVVOWkFJX0NPTkZJRykgZGVmYXVsdENvbmZpZz86IFl1bnphaUNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0geyAuLi5kZWZhdWx0Q29uZmlnIH07XG4gIH1cblxuICBnZXQ8VCBleHRlbmRzIFl1bnphaUNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwga2V5Pzogc3RyaW5nKTogWXVuemFpQ29uZmlnW1RdIHtcbiAgICBjb25zdCByZXMgPSAoKHRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdIGFzIHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9KSB8fCB7fSkgYXMgTnpTYWZlQW55O1xuICAgIHJldHVybiBrZXkgPyB7IFtrZXldOiByZXNba2V5XSB9IDogcmVzO1xuICB9XG5cbiAgbWVyZ2U8VCBleHRlbmRzIFl1bnphaUNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwgLi4uZGVmYXVsdFZhbHVlczogQXJyYXk8WXVuemFpQ29uZmlnW1RdPik6IFl1bnphaUNvbmZpZ1tUXSB7XG4gICAgcmV0dXJuIGRlZXBNZXJnZUtleSh7fSwgdHJ1ZSwgLi4uZGVmYXVsdFZhbHVlcywgdGhpcy5nZXQoY29tcG9uZW50TmFtZSkpO1xuICB9XG5cbiAgYXR0YWNoPFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudFRoaXM6IHVua25vd24sIGNvbXBvbmVudE5hbWU6IFQsIGRlZmF1bHRWYWx1ZXM6IFl1bnphaUNvbmZpZ1tUXSk6IHZvaWQge1xuICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50VGhpcywgdGhpcy5tZXJnZShjb21wb25lbnROYW1lLCBkZWZhdWx0VmFsdWVzKSk7XG4gIH1cblxuICBhdHRhY2hLZXk8VCBleHRlbmRzIFl1bnphaUNvbmZpZ0tleT4oY29tcG9uZW50VGhpczogdW5rbm93biwgY29tcG9uZW50TmFtZTogVCwga2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFRoaXMsIHRoaXMuZ2V0KGNvbXBvbmVudE5hbWUsIGtleSkpO1xuICB9XG5cbiAgc2V0PFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudE5hbWU6IFQsIHZhbHVlOiBZdW56YWlDb25maWdbVF0pOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXSA9IHsgLi4udGhpcy5jb25maWdbY29tcG9uZW50TmFtZV0sIC4uLnZhbHVlIH07XG4gIH1cbn1cbiJdfQ==