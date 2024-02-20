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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1kZXB0LXRyZWUveXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQU0zQyxNQUFNLE9BQU8scUJBQXFCO0lBRGxDO1FBRVUsU0FBSSxHQUFnQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0E4RGpEO0lBbENDOzs7OztPQUtHO0lBQ0gsSUFBSSxDQUNGLFlBQXFCLEVBQ3JCLE9BQWdCLEVBQ2hCLEtBQTJCLEVBQzNCLE9BQWdCO1FBRWhCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQzlCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDNUQsR0FBRyxDQUFDLENBQUMsUUFBMEMsRUFBRSxFQUFFO1lBQ2pELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OEdBOURVLHFCQUFxQjtrSEFBckIscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpUmVzcG9uc2UgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IFlVTlpBSV9ERVBUX1RZUEVTLCBZdW56YWlEZXB0VHJlZSB9IGZyb20gJy4veXVuemFpLWRlcHQtdHJlZS50eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBZdW56YWlEZXB0VHJlZVNlcnZpY2Uge1xuICBwcml2YXRlIGh0dHA6IF9IdHRwQ2xpZW50ID0gaW5qZWN0KF9IdHRwQ2xpZW50KTtcblxuICAvKipcbiAgICogQHBhcmFtIGluY2x1ZGVDbGFzcyBpbmNsdWRlIGNsYXNzXG4gICAqIEBwYXJhbSBoaXN0b3J5IGluY2x1ZGUgaGlzdG9yeSBjbGFzc1xuICAgKi9cbiAgdHJlZShpbmNsdWRlQ2xhc3M6IGJvb2xlYW4sIGhpc3Rvcnk6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFl1bnphaURlcHRUcmVlW10+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gaW5jbHVkZUNsYXNzIGluY2x1ZGUgY2xhc3NcbiAgICogQHBhcmFtIGhpc3RvcnkgaW5jbHVkZSBoaXN0b3J5IGNsYXNzXG4gICAqIEBwYXJhbSB0eXBlcyBkZXB0IHR5cGVzXG4gICAqL1xuICB0cmVlKGluY2x1ZGVDbGFzczogYm9vbGVhbiwgaGlzdG9yeTogYm9vbGVhbiwgdHlwZXM/OiBZVU5aQUlfREVQVF9UWVBFU1tdKTogT2JzZXJ2YWJsZTxZdW56YWlEZXB0VHJlZVtdPjtcblxuICAvKipcbiAgICogQHBhcmFtIGluY2x1ZGVDbGFzcyBpbmNsdWRlIGNsYXNzXG4gICAqIEBwYXJhbSBoaXN0b3J5IGluY2x1ZGUgaGlzdG9yeSBjbGFzc1xuICAgKiBAcGFyYW0gdHlwZXMgZGVwdCB0eXBlc1xuICAgKiBAcGFyYW0gZ3JhZGVJZCBncmFkZUlkXG4gICAqL1xuICB0cmVlKFxuICAgIGluY2x1ZGVDbGFzczogYm9vbGVhbixcbiAgICBoaXN0b3J5OiBib29sZWFuLFxuICAgIHR5cGVzPzogWVVOWkFJX0RFUFRfVFlQRVNbXSxcbiAgICBncmFkZUlkPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8WXVuemFpRGVwdFRyZWVbXT47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBpbmNsdWRlQ2xhc3MgaW5jbHVkZSBjbGFzc1xuICAgKiBAcGFyYW0gaGlzdG9yeSBpbmNsdWRlIGhpc3RvcnkgY2xhc3NcbiAgICogQHBhcmFtIHR5cGVzIGRlcHQgdHlwZXNcbiAgICogQHBhcmFtIGdyYWRlSWQgZ3JhZGVJZFxuICAgKi9cbiAgdHJlZShcbiAgICBpbmNsdWRlQ2xhc3M6IGJvb2xlYW4sXG4gICAgaGlzdG9yeTogYm9vbGVhbixcbiAgICB0eXBlcz86IFlVTlpBSV9ERVBUX1RZUEVTW10sXG4gICAgZ3JhZGVJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFl1bnphaURlcHRUcmVlW10+IHtcbiAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZSh7fSk7XG4gICAgaWYgKGluY2x1ZGVDbGFzcykge1xuICAgICAgcGFyYW1zWydpbmNsdWRlQ2xhc3MnXSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICBwYXJhbXNbJ2luY2x1ZGVIaXNDbGFzcyddID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICBwYXJhbXNbJ2RlcHRUeXBlJ10gPSB0eXBlcy5qb2luKCcsJyk7XG4gICAgfVxuICAgIGlmIChncmFkZUlkKSB7XG4gICAgICBwYXJhbXNbJ2dyYWRlSWQnXSA9IGdyYWRlSWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvYXV0aC9iYXNlRGVwYXJ0TWVudC90cmVlJywgcGFyYW1zKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogWXVuemFpUmVzcG9uc2U8WXVuemFpRGVwdFRyZWVbXT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==