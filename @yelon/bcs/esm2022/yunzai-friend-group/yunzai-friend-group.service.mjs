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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiFriendGroupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiFriendGroupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YunzaiFriendGroupService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAveXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLHdCQUF3QjtJQURyQztRQUVtQixTQUFJLEdBQWdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQVMxRDtJQVBDLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDN0QsR0FBRyxDQUFDLENBQUMsUUFBNkMsRUFBRSxFQUFFO1lBQ3BELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs4R0FUVSx3QkFBd0I7a0hBQXhCLHdCQUF3Qjs7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFl1bnphaVJlc3BvbnNlIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBZdW56YWlGcmllbmRHcm91cCB9IGZyb20gJy4veXVuemFpLWZyaWVuZC1ncm91cC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBZdW56YWlGcmllbmRHcm91cFNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGh0dHA6IF9IdHRwQ2xpZW50ID0gaW5qZWN0KF9IdHRwQ2xpZW50KTtcblxuICBncm91cHMoKTogT2JzZXJ2YWJsZTxZdW56YWlGcmllbmRHcm91cFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvY29udGFjdC9hcHBjb250YWN0L2ZpbmRHcm91cCcsIHt9KS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogWXVuemFpUmVzcG9uc2U8WXVuemFpRnJpZW5kR3JvdXBbXT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==