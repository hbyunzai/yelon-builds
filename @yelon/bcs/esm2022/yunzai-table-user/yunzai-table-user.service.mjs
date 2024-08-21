import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import * as i0 from "@angular/core";
export class YunzaiTableUserService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    users(page) {
        return this.http.post(`/auth/baseUser/queryListForPage`, page).pipe(map((response) => {
            return response;
        }), catchError(e => {
            return throwError(e);
        }));
    }
    usersByIds(ids) {
        return this.http.post(`/auth/baseUser/users`, { userIds: ids }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiTableUserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiTableUserService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiTableUserService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXRhYmxlLXVzZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktdGFibGUtdXNlci95dW56YWktdGFibGUtdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQU0zQyxNQUFNLE9BQU8sc0JBQXNCO0lBRG5DO1FBRW1CLFNBQUksR0FBZ0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBb0IxRDtJQWxCQyxLQUFLLENBQUMsSUFBZ0M7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2pFLEdBQUcsQ0FBQyxDQUFDLFFBQTZDLEVBQUUsRUFBRTtZQUNwRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2xFLEdBQUcsQ0FBQyxDQUFDLFFBQTJDLEVBQUUsRUFBRTtZQUNsRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OEdBcEJVLHNCQUFzQjtrSEFBdEIsc0JBQXNCOzsyRkFBdEIsc0JBQXNCO2tCQURsQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgUGFnZSwgWXVuemFpUGFnZVJlc3BvbnNlLCBZdW56YWlSZXNwb25zZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgWXVuemFpVGFibGVVc2VyLCBZdW56YWlUYWJsZVVzZXJQYXJhbSB9IGZyb20gJy4veXVuemFpLXRhYmxlLXVzZXIudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWXVuemFpVGFibGVVc2VyU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaHR0cDogX0h0dHBDbGllbnQgPSBpbmplY3QoX0h0dHBDbGllbnQpO1xuXG4gIHVzZXJzKHBhZ2U6IFBhZ2U8WXVuemFpVGFibGVVc2VyUGFyYW0+KTogT2JzZXJ2YWJsZTxZdW56YWlQYWdlUmVzcG9uc2U8WXVuemFpVGFibGVVc2VyPj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgL2F1dGgvYmFzZVVzZXIvcXVlcnlMaXN0Rm9yUGFnZWAsIHBhZ2UpLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBZdW56YWlQYWdlUmVzcG9uc2U8WXVuemFpVGFibGVVc2VyPikgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdXNlcnNCeUlkcyhpZHM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxZdW56YWlUYWJsZVVzZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgL2F1dGgvYmFzZVVzZXIvdXNlcnNgLCB7IHVzZXJJZHM6IGlkcyB9KS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogWXVuemFpUmVzcG9uc2U8WXVuemFpVGFibGVVc2VyW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=