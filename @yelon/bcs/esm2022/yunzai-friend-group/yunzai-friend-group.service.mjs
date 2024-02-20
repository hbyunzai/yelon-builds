import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import * as i0 from "@angular/core";
export class YunzaiFriendGroupService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    groups() {
        return this.http.post('/contact/appcontact/findGroup', {}).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAveXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLHdCQUF3QjtJQURyQztRQUVVLFNBQUksR0FBZ0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBU2pEO0lBUEMsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM3RCxHQUFHLENBQUMsQ0FBQyxRQUE2QyxFQUFFLEVBQUU7WUFDcEQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzhHQVRVLHdCQUF3QjtrSEFBeEIsd0JBQXdCOzsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpUmVzcG9uc2UgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IFl1bnphaUZyaWVuZEdyb3VwIH0gZnJvbSAnLi95dW56YWktZnJpZW5kLWdyb3VwLnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl1bnphaUZyaWVuZEdyb3VwU2VydmljZSB7XG4gIHByaXZhdGUgaHR0cDogX0h0dHBDbGllbnQgPSBpbmplY3QoX0h0dHBDbGllbnQpO1xuXG4gIGdyb3VwcygpOiBPYnNlcnZhYmxlPFl1bnphaUZyaWVuZEdyb3VwW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9jb250YWN0L2FwcGNvbnRhY3QvZmluZEdyb3VwJywge30pLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBZdW56YWlSZXNwb25zZTxZdW56YWlGcmllbmRHcm91cFtdPikgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19