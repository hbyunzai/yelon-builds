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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiConfigService, deps: [{ token: YUNZAI_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiConfigService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91dGlsL2NvbmZpZy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR2pELE9BQU8sRUFBaUMsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzlFLE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFBK0MsYUFBNEI7UUFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELEdBQUcsQ0FBNEIsYUFBZ0IsRUFBRSxHQUFZO1FBQzNELE1BQU0sR0FBRyxHQUFHLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQWdDLElBQUksRUFBRSxDQUFjLENBQUM7UUFDNUYsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQTRCLGFBQWdCLEVBQUUsR0FBRyxhQUFxQztRQUN6RixPQUFPLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsTUFBTSxDQUE0QixhQUFzQixFQUFFLGFBQWdCLEVBQUUsYUFBOEI7UUFDeEcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELFNBQVMsQ0FBNEIsYUFBc0IsRUFBRSxhQUFnQixFQUFFLEdBQVc7UUFDeEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFvQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELEdBQUcsQ0FBNEIsYUFBZ0IsRUFBRSxLQUFzQjtRQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDM0UsQ0FBQzsrR0ExQlUsbUJBQW1CLGtCQUdFLGFBQWE7bUhBSGxDLG1CQUFtQixjQUROLE1BQU07OzRGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFJbkIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBkZWVwTWVyZ2VLZXkgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZywgWXVuemFpQ29uZmlnS2V5LCBZVU5aQUlfQ09ORklHIH0gZnJvbSAnLi9jb25maWcudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaUNvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZzogWXVuemFpQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoWVVOWkFJX0NPTkZJRykgZGVmYXVsdENvbmZpZz86IFl1bnphaUNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0geyAuLi5kZWZhdWx0Q29uZmlnIH07XG4gIH1cblxuICBnZXQ8VCBleHRlbmRzIFl1bnphaUNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwga2V5Pzogc3RyaW5nKTogWXVuemFpQ29uZmlnW1RdIHtcbiAgICBjb25zdCByZXMgPSAoKHRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdIGFzIHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9KSB8fCB7fSkgYXMgTnpTYWZlQW55O1xuICAgIHJldHVybiBrZXkgPyB7IFtrZXldOiByZXNba2V5XSB9IDogcmVzO1xuICB9XG5cbiAgbWVyZ2U8VCBleHRlbmRzIFl1bnphaUNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwgLi4uZGVmYXVsdFZhbHVlczogQXJyYXk8WXVuemFpQ29uZmlnW1RdPik6IFl1bnphaUNvbmZpZ1tUXSB7XG4gICAgcmV0dXJuIGRlZXBNZXJnZUtleSh7fSwgdHJ1ZSwgLi4uZGVmYXVsdFZhbHVlcywgdGhpcy5nZXQoY29tcG9uZW50TmFtZSkpO1xuICB9XG5cbiAgYXR0YWNoPFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudFRoaXM6IHVua25vd24sIGNvbXBvbmVudE5hbWU6IFQsIGRlZmF1bHRWYWx1ZXM6IFl1bnphaUNvbmZpZ1tUXSk6IHZvaWQge1xuICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50VGhpcyBhcyBhbnksIHRoaXMubWVyZ2UoY29tcG9uZW50TmFtZSwgZGVmYXVsdFZhbHVlcykpO1xuICB9XG5cbiAgYXR0YWNoS2V5PFQgZXh0ZW5kcyBZdW56YWlDb25maWdLZXk+KGNvbXBvbmVudFRoaXM6IHVua25vd24sIGNvbXBvbmVudE5hbWU6IFQsIGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnRUaGlzIGFzIGFueSwgdGhpcy5nZXQoY29tcG9uZW50TmFtZSwga2V5KSk7XG4gIH1cblxuICBzZXQ8VCBleHRlbmRzIFl1bnphaUNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwgdmFsdWU6IFl1bnphaUNvbmZpZ1tUXSk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdID0geyAuLi50aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXSwgLi4udmFsdWUgfTtcbiAgfVxufVxuIl19