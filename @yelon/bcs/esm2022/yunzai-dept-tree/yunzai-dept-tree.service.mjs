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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1kZXB0LXRyZWUveXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFRL0QsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFvQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQUcsQ0FBQztJQTRCekM7Ozs7O09BS0c7SUFDSCxJQUFJLENBQ0YsWUFBcUIsRUFDckIsT0FBZ0IsRUFDaEIsS0FBMkIsRUFDM0IsT0FBZ0I7UUFFaEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDOUIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUM1RCxHQUFHLENBQUMsQ0FBQyxRQUEwQyxFQUFFLEVBQUU7WUFDakQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs4R0E5RFUscUJBQXFCO2tIQUFyQixxQkFBcUIsY0FEUixNQUFNOzsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlSZXNwb25zZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgWVVOWkFJX0RFUFRfVFlQRVMsIFl1bnphaURlcHRUcmVlIH0gZnJvbSAnLi95dW56YWktZGVwdC10cmVlLnR5cGVzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZdW56YWlEZXB0VHJlZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IF9IdHRwQ2xpZW50KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gaW5jbHVkZUNsYXNzIGluY2x1ZGUgY2xhc3NcbiAgICogQHBhcmFtIGhpc3RvcnkgaW5jbHVkZSBoaXN0b3J5IGNsYXNzXG4gICAqL1xuICB0cmVlKGluY2x1ZGVDbGFzczogYm9vbGVhbiwgaGlzdG9yeTogYm9vbGVhbik6IE9ic2VydmFibGU8WXVuemFpRGVwdFRyZWVbXT47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBpbmNsdWRlQ2xhc3MgaW5jbHVkZSBjbGFzc1xuICAgKiBAcGFyYW0gaGlzdG9yeSBpbmNsdWRlIGhpc3RvcnkgY2xhc3NcbiAgICogQHBhcmFtIHR5cGVzIGRlcHQgdHlwZXNcbiAgICovXG4gIHRyZWUoaW5jbHVkZUNsYXNzOiBib29sZWFuLCBoaXN0b3J5OiBib29sZWFuLCB0eXBlcz86IFlVTlpBSV9ERVBUX1RZUEVTW10pOiBPYnNlcnZhYmxlPFl1bnphaURlcHRUcmVlW10+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gaW5jbHVkZUNsYXNzIGluY2x1ZGUgY2xhc3NcbiAgICogQHBhcmFtIGhpc3RvcnkgaW5jbHVkZSBoaXN0b3J5IGNsYXNzXG4gICAqIEBwYXJhbSB0eXBlcyBkZXB0IHR5cGVzXG4gICAqIEBwYXJhbSBncmFkZUlkIGdyYWRlSWRcbiAgICovXG4gIHRyZWUoXG4gICAgaW5jbHVkZUNsYXNzOiBib29sZWFuLFxuICAgIGhpc3Rvcnk6IGJvb2xlYW4sXG4gICAgdHlwZXM/OiBZVU5aQUlfREVQVF9UWVBFU1tdLFxuICAgIGdyYWRlSWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxZdW56YWlEZXB0VHJlZVtdPjtcblxuICAvKipcbiAgICogQHBhcmFtIGluY2x1ZGVDbGFzcyBpbmNsdWRlIGNsYXNzXG4gICAqIEBwYXJhbSBoaXN0b3J5IGluY2x1ZGUgaGlzdG9yeSBjbGFzc1xuICAgKiBAcGFyYW0gdHlwZXMgZGVwdCB0eXBlc1xuICAgKiBAcGFyYW0gZ3JhZGVJZCBncmFkZUlkXG4gICAqL1xuICB0cmVlKFxuICAgIGluY2x1ZGVDbGFzczogYm9vbGVhbixcbiAgICBoaXN0b3J5OiBib29sZWFuLFxuICAgIHR5cGVzPzogWVVOWkFJX0RFUFRfVFlQRVNbXSxcbiAgICBncmFkZUlkPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8WXVuemFpRGVwdFRyZWVbXT4ge1xuICAgIGxldCBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKHt9KTtcbiAgICBpZiAoaW5jbHVkZUNsYXNzKSB7XG4gICAgICBwYXJhbXNbJ2luY2x1ZGVDbGFzcyddID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgIHBhcmFtc1snaW5jbHVkZUhpc0NsYXNzJ10gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHBhcmFtc1snZGVwdFR5cGUnXSA9IHR5cGVzLmpvaW4oJywnKTtcbiAgICB9XG4gICAgaWYgKGdyYWRlSWQpIHtcbiAgICAgIHBhcmFtc1snZ3JhZGVJZCddID0gZ3JhZGVJZDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy9hdXRoL2Jhc2VEZXBhcnRNZW50L3RyZWUnLCBwYXJhbXMpLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBZdW56YWlSZXNwb25zZTxZdW56YWlEZXB0VHJlZVtdPikgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19