import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import * as i0 from "@angular/core";
export class YunzaiRoleTreeService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    tree(roleGroupCode) {
        return this.http.post(`/auth/baseRole/findGroupRole`, { roleGroupCode: roleGroupCode }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiRoleTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiRoleTreeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiRoleTreeService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1yb2xlLXRyZWUveXVuemFpLXJvbGUtdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLHFCQUFxQjtJQURsQztRQUVtQixTQUFJLEdBQWdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQVExRDtJQVBDLElBQUksQ0FBQyxhQUFzQjtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMxRixHQUFHLENBQUMsQ0FBQyxRQUEwQyxFQUFFLEVBQUU7WUFDakQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOytHQVJVLHFCQUFxQjttSEFBckIscUJBQXFCOzs0RkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpUmVzcG9uc2UgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlIH0gZnJvbSAnLi95dW56YWktcm9sZS10cmVlLnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFl1bnphaVJvbGVUcmVlU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaHR0cDogX0h0dHBDbGllbnQgPSBpbmplY3QoX0h0dHBDbGllbnQpO1xuICB0cmVlKHJvbGVHcm91cENvZGU/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFl1bnphaVJvbGVUcmVlW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9hdXRoL2Jhc2VSb2xlL2ZpbmRHcm91cFJvbGVgLCB7IHJvbGVHcm91cENvZGU6IHJvbGVHcm91cENvZGUgfSkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaVJvbGVUcmVlW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=