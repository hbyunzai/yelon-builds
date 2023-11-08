import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
export class YunzaiDeptTreeService {
    constructor(http) {
        this.http = http;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDeptTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDeptTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDeptTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1kZXB0LXRyZWUveXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFRL0QsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFvQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQUcsQ0FBQztJQTRCekM7Ozs7O09BS0c7SUFDSCxJQUFJLENBQ0YsWUFBcUIsRUFDckIsT0FBZ0IsRUFDaEIsS0FBMkIsRUFDM0IsT0FBZ0I7UUFFaEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FBQyxDQUFDLFFBQTBDLEVBQUUsRUFBRTtZQUNqRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOytHQTlEVSxxQkFBcUI7bUhBQXJCLHFCQUFxQixjQURSLE1BQU07OzRGQUNuQixxQkFBcUI7a0JBRGpDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFl1bnphaVJlc3BvbnNlIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBZVU5aQUlfREVQVF9UWVBFUywgWXVuemFpRGVwdFRyZWUgfSBmcm9tICcuL3l1bnphaS1kZXB0LXRyZWUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaURlcHRUcmVlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogX0h0dHBDbGllbnQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBpbmNsdWRlQ2xhc3MgaW5jbHVkZSBjbGFzc1xuICAgKiBAcGFyYW0gaGlzdG9yeSBpbmNsdWRlIGhpc3RvcnkgY2xhc3NcbiAgICovXG4gIHRyZWUoaW5jbHVkZUNsYXNzOiBib29sZWFuLCBoaXN0b3J5OiBib29sZWFuKTogT2JzZXJ2YWJsZTxZdW56YWlEZXB0VHJlZVtdPjtcblxuICAvKipcbiAgICogQHBhcmFtIGluY2x1ZGVDbGFzcyBpbmNsdWRlIGNsYXNzXG4gICAqIEBwYXJhbSBoaXN0b3J5IGluY2x1ZGUgaGlzdG9yeSBjbGFzc1xuICAgKiBAcGFyYW0gdHlwZXMgZGVwdCB0eXBlc1xuICAgKi9cbiAgdHJlZShpbmNsdWRlQ2xhc3M6IGJvb2xlYW4sIGhpc3Rvcnk6IGJvb2xlYW4sIHR5cGVzPzogWVVOWkFJX0RFUFRfVFlQRVNbXSk6IE9ic2VydmFibGU8WXVuemFpRGVwdFRyZWVbXT47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBpbmNsdWRlQ2xhc3MgaW5jbHVkZSBjbGFzc1xuICAgKiBAcGFyYW0gaGlzdG9yeSBpbmNsdWRlIGhpc3RvcnkgY2xhc3NcbiAgICogQHBhcmFtIHR5cGVzIGRlcHQgdHlwZXNcbiAgICogQHBhcmFtIGdyYWRlSWQgZ3JhZGVJZFxuICAgKi9cbiAgdHJlZShcbiAgICBpbmNsdWRlQ2xhc3M6IGJvb2xlYW4sXG4gICAgaGlzdG9yeTogYm9vbGVhbixcbiAgICB0eXBlcz86IFlVTlpBSV9ERVBUX1RZUEVTW10sXG4gICAgZ3JhZGVJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFl1bnphaURlcHRUcmVlW10+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gaW5jbHVkZUNsYXNzIGluY2x1ZGUgY2xhc3NcbiAgICogQHBhcmFtIGhpc3RvcnkgaW5jbHVkZSBoaXN0b3J5IGNsYXNzXG4gICAqIEBwYXJhbSB0eXBlcyBkZXB0IHR5cGVzXG4gICAqIEBwYXJhbSBncmFkZUlkIGdyYWRlSWRcbiAgICovXG4gIHRyZWUoXG4gICAgaW5jbHVkZUNsYXNzOiBib29sZWFuLFxuICAgIGhpc3Rvcnk6IGJvb2xlYW4sXG4gICAgdHlwZXM/OiBZVU5aQUlfREVQVF9UWVBFU1tdLFxuICAgIGdyYWRlSWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxZdW56YWlEZXB0VHJlZVtdPiB7XG4gICAgbGV0IHBhcmFtcyA9IE9iamVjdC5jcmVhdGUoe30pO1xuICAgIGlmIChpbmNsdWRlQ2xhc3MpIHtcbiAgICAgIHBhcmFtc1snaW5jbHVkZUNsYXNzJ10gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgcGFyYW1zWydpbmNsdWRlSGlzQ2xhc3MnXSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlcykge1xuICAgICAgcGFyYW1zWydkZXB0VHlwZSddID0gdHlwZXMuam9pbignLCcpO1xuICAgIH1cbiAgICBpZiAoZ3JhZGVJZCkge1xuICAgICAgcGFyYW1zWydncmFkZUlkJ10gPSBncmFkZUlkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL2F1dGgvYmFzZURlcGFydE1lbnQvdHJlZScsIHBhcmFtcykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaURlcHRUcmVlW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=