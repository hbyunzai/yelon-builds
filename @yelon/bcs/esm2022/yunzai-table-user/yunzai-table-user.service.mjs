import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
export class YunzaiTableUserService {
    constructor(http) {
        this.http = http;
    }
    users(page) {
        return this.http.post(`/auth/baseUser/queryListForPage`, page).pipe(map((response) => {
            return response;
        }), catchError(e => {
            return throwError(e);
        }));
    }
    usersByIds(ids) {
        return this.http.post(`/auth/baseUser/users`, { "userIds": ids }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXRhYmxlLXVzZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktdGFibGUtdXNlci95dW56YWktdGFibGUtdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQWMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFRN0QsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFvQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQ3JDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBZ0M7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2pFLEdBQUcsQ0FBQyxDQUFDLFFBQTZDLEVBQUUsRUFBRTtZQUNwRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2xFLEdBQUcsQ0FBQyxDQUFDLFFBQTJDLEVBQUUsRUFBRTtZQUNsRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7K0dBckJVLHNCQUFzQjttSEFBdEIsc0JBQXNCLGNBRFYsTUFBTTs7NEZBQ2xCLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIE9ic2VydmFibGUsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge19IdHRwQ2xpZW50fSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtQYWdlLCBZdW56YWlQYWdlUmVzcG9uc2UsIFl1bnphaVJlc3BvbnNlfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7WXVuemFpVGFibGVVc2VyLCBZdW56YWlUYWJsZVVzZXJQYXJhbX0gZnJvbSAnLi95dW56YWktdGFibGUtdXNlci50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFl1bnphaVRhYmxlVXNlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IF9IdHRwQ2xpZW50KSB7XG4gIH1cblxuICB1c2VycyhwYWdlOiBQYWdlPFl1bnphaVRhYmxlVXNlclBhcmFtPik6IE9ic2VydmFibGU8WXVuemFpUGFnZVJlc3BvbnNlPFl1bnphaVRhYmxlVXNlcj4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9hdXRoL2Jhc2VVc2VyL3F1ZXJ5TGlzdEZvclBhZ2VgLCBwYWdlKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogWXVuemFpUGFnZVJlc3BvbnNlPFl1bnphaVRhYmxlVXNlcj4pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHVzZXJzQnlJZHMoaWRzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8WXVuemFpVGFibGVVc2VyW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9hdXRoL2Jhc2VVc2VyL3VzZXJzYCwge1widXNlcklkc1wiOiBpZHN9KS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogWXVuemFpUmVzcG9uc2U8WXVuemFpVGFibGVVc2VyW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG59XG4iXX0=