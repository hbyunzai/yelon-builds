import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
export class YunzaiGradeService {
    constructor(http) {
        this.http = http;
    }
    grades() {
        return this.http.get(`/auth/gradeYear/queryListForPage`).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiGradeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiGradeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiGradeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWdyYWRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWdyYWRlL3l1bnphaS1ncmFkZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7O0FBUXZDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtJQUFHLENBQUM7SUFFekMsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxJQUFJLENBQzNELEdBQUcsQ0FBQyxDQUFDLFFBQXVDLEVBQUUsRUFBRTtZQUM5QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OEdBVFUsa0JBQWtCO2tIQUFsQixrQkFBa0IsY0FETCxNQUFNOzsyRkFDbkIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlSZXNwb25zZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgWXVuemFpR3JhZGUgfSBmcm9tICcuL3l1bnphaS1ncmFkZS50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXVuemFpR3JhZGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCkge31cblxuICBncmFkZXMoKTogT2JzZXJ2YWJsZTxZdW56YWlHcmFkZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC9hdXRoL2dyYWRlWWVhci9xdWVyeUxpc3RGb3JQYWdlYCkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaUdyYWRlW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=