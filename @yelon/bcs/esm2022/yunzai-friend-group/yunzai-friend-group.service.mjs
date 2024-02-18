import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
export class YunzaiFriendGroupService {
    constructor(http) {
        this.http = http;
    }
    groups() {
        return this.http.post('/contact/appcontact/findGroup', {}).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAveXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7O0FBVXZDLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtJQUFHLENBQUM7SUFFekMsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM3RCxHQUFHLENBQUMsQ0FBQyxRQUE2QyxFQUFFLEVBQUU7WUFDcEQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzhHQVRVLHdCQUF3QjtrSEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07OzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpUmVzcG9uc2UgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IFl1bnphaUZyaWVuZEdyb3VwIH0gZnJvbSAnLi95dW56YWktZnJpZW5kLWdyb3VwLnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpRnJpZW5kR3JvdXBTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCkge31cblxuICBncm91cHMoKTogT2JzZXJ2YWJsZTxZdW56YWlGcmllbmRHcm91cFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvY29udGFjdC9hcHBjb250YWN0L2ZpbmRHcm91cCcsIHt9KS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogWXVuemFpUmVzcG9uc2U8WXVuemFpRnJpZW5kR3JvdXBbXT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==