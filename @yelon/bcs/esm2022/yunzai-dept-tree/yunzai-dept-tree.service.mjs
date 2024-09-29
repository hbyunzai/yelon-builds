import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import * as i0 from "@angular/core";
export class YunzaiDeptTreeService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    /**
     * @param includeClass include class
     * @param history include history class
     * @param types dept types
     * @param gradeId gradeId
     */
    tree(includeClass, history, types, gradeId) {
        let params = Object.create({});
        if (includeClass) {
            params['includeClass'] = true;
        }
        if (history) {
            params['includeHisClass'] = true;
        }
        if (types) {
            params['deptType'] = types.join(',');
        }
        if (gradeId) {
            params['gradeId'] = gradeId;
        }
        return this.http.get('/auth/baseDepartMent/tree', params).pipe(map((response) => {
            return response.data;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiDeptTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiDeptTreeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiDeptTreeService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1kZXB0LXRyZWUveXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQU0zQyxNQUFNLE9BQU8scUJBQXFCO0lBRGxDO1FBRW1CLFNBQUksR0FBZ0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBOEQxRDtJQWxDQzs7Ozs7T0FLRztJQUNILElBQUksQ0FDRixZQUFxQixFQUNyQixPQUFnQixFQUNoQixLQUEyQixFQUMzQixPQUFnQjtRQUVoQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksWUFBWSxFQUFFLENBQUM7WUFDakIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUM5QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FBQyxDQUFDLFFBQTBDLEVBQUUsRUFBRTtZQUNqRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzhHQTlEVSxxQkFBcUI7a0hBQXJCLHFCQUFxQjs7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFl1bnphaVJlc3BvbnNlIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBZVU5aQUlfREVQVF9UWVBFUywgWXVuemFpRGVwdFRyZWUgfSBmcm9tICcuL3l1bnphaS1kZXB0LXRyZWUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWXVuemFpRGVwdFRyZWVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwOiBfSHR0cENsaWVudCA9IGluamVjdChfSHR0cENsaWVudCk7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBpbmNsdWRlQ2xhc3MgaW5jbHVkZSBjbGFzc1xuICAgKiBAcGFyYW0gaGlzdG9yeSBpbmNsdWRlIGhpc3RvcnkgY2xhc3NcbiAgICovXG4gIHRyZWUoaW5jbHVkZUNsYXNzOiBib29sZWFuLCBoaXN0b3J5OiBib29sZWFuKTogT2JzZXJ2YWJsZTxZdW56YWlEZXB0VHJlZVtdPjtcblxuICAvKipcbiAgICogQHBhcmFtIGluY2x1ZGVDbGFzcyBpbmNsdWRlIGNsYXNzXG4gICAqIEBwYXJhbSBoaXN0b3J5IGluY2x1ZGUgaGlzdG9yeSBjbGFzc1xuICAgKiBAcGFyYW0gdHlwZXMgZGVwdCB0eXBlc1xuICAgKi9cbiAgdHJlZShpbmNsdWRlQ2xhc3M6IGJvb2xlYW4sIGhpc3Rvcnk6IGJvb2xlYW4sIHR5cGVzPzogWVVOWkFJX0RFUFRfVFlQRVNbXSk6IE9ic2VydmFibGU8WXVuemFpRGVwdFRyZWVbXT47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBpbmNsdWRlQ2xhc3MgaW5jbHVkZSBjbGFzc1xuICAgKiBAcGFyYW0gaGlzdG9yeSBpbmNsdWRlIGhpc3RvcnkgY2xhc3NcbiAgICogQHBhcmFtIHR5cGVzIGRlcHQgdHlwZXNcbiAgICogQHBhcmFtIGdyYWRlSWQgZ3JhZGVJZFxuICAgKi9cbiAgdHJlZShcbiAgICBpbmNsdWRlQ2xhc3M6IGJvb2xlYW4sXG4gICAgaGlzdG9yeTogYm9vbGVhbixcbiAgICB0eXBlcz86IFlVTlpBSV9ERVBUX1RZUEVTW10sXG4gICAgZ3JhZGVJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFl1bnphaURlcHRUcmVlW10+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gaW5jbHVkZUNsYXNzIGluY2x1ZGUgY2xhc3NcbiAgICogQHBhcmFtIGhpc3RvcnkgaW5jbHVkZSBoaXN0b3J5IGNsYXNzXG4gICAqIEBwYXJhbSB0eXBlcyBkZXB0IHR5cGVzXG4gICAqIEBwYXJhbSBncmFkZUlkIGdyYWRlSWRcbiAgICovXG4gIHRyZWUoXG4gICAgaW5jbHVkZUNsYXNzOiBib29sZWFuLFxuICAgIGhpc3Rvcnk6IGJvb2xlYW4sXG4gICAgdHlwZXM/OiBZVU5aQUlfREVQVF9UWVBFU1tdLFxuICAgIGdyYWRlSWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxZdW56YWlEZXB0VHJlZVtdPiB7XG4gICAgbGV0IHBhcmFtcyA9IE9iamVjdC5jcmVhdGUoe30pO1xuICAgIGlmIChpbmNsdWRlQ2xhc3MpIHtcbiAgICAgIHBhcmFtc1snaW5jbHVkZUNsYXNzJ10gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgcGFyYW1zWydpbmNsdWRlSGlzQ2xhc3MnXSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlcykge1xuICAgICAgcGFyYW1zWydkZXB0VHlwZSddID0gdHlwZXMuam9pbignLCcpO1xuICAgIH1cbiAgICBpZiAoZ3JhZGVJZCkge1xuICAgICAgcGFyYW1zWydncmFkZUlkJ10gPSBncmFkZUlkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL2F1dGgvYmFzZURlcGFydE1lbnQvdHJlZScsIHBhcmFtcykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaURlcHRUcmVlW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=