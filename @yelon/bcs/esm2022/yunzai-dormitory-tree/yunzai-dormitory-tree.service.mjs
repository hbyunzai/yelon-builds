import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { YunzaiDormitoryTreeType } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
export class YunzaiDormitoryTreeService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    tree(param = {
        isPower: false,
        treeType: YunzaiDormitoryTreeType.BUILDING_FLOORS_ROOMS
    }) {
        return this.http.post(`/auth/dorm/tree`, param).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiDormitoryTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiDormitoryTreeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiDormitoryTreeService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRvcm1pdG9yeS10cmVlL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUczQyxPQUFPLEVBQWlELHVCQUF1QixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBR3ZILE1BQU0sT0FBTywwQkFBMEI7SUFEdkM7UUFFbUIsU0FBSSxHQUFnQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0FjMUQ7SUFaQyxJQUFJLENBQ0YsUUFBa0M7UUFDaEMsT0FBTyxFQUFFLEtBQUs7UUFDZCxRQUFRLEVBQUUsdUJBQXVCLENBQUMscUJBQXFCO0tBQ3hEO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ2xELEdBQUcsQ0FBQyxDQUFDLFFBQStDLEVBQUUsRUFBRTtZQUN0RCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OEdBZFUsMEJBQTBCO2tIQUExQiwwQkFBMEI7OzJGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlSZXNwb25zZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgWXVuemFpRG9ybWl0b3J5VHJlZSwgWXVuemFpRG9ybWl0b3J5VHJlZVBhcmFtLCBZdW56YWlEb3JtaXRvcnlUcmVlVHlwZSB9IGZyb20gJy4veXVuemFpLWRvcm1pdG9yeS10cmVlLnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl1bnphaURvcm1pdG9yeVRyZWVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwOiBfSHR0cENsaWVudCA9IGluamVjdChfSHR0cENsaWVudCk7XG5cbiAgdHJlZShcbiAgICBwYXJhbTogWXVuemFpRG9ybWl0b3J5VHJlZVBhcmFtID0ge1xuICAgICAgaXNQb3dlcjogZmFsc2UsXG4gICAgICB0cmVlVHlwZTogWXVuemFpRG9ybWl0b3J5VHJlZVR5cGUuQlVJTERJTkdfRkxPT1JTX1JPT01TXG4gICAgfVxuICApOiBPYnNlcnZhYmxlPFl1bnphaURvcm1pdG9yeVRyZWVbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgL2F1dGgvZG9ybS90cmVlYCwgcGFyYW0pLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBZdW56YWlSZXNwb25zZTxZdW56YWlEb3JtaXRvcnlUcmVlW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=