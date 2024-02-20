import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { YunzaiDormitoryTreeType } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
export class YunzaiDormitoryTreeService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    tree(param = {
        isPower: false,
        treeType: YunzaiDormitoryTreeType.BUILDING_FLOORS_ROOMS
    }) {
        return this.http.post(`/auth/dorm/tree`, param).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRvcm1pdG9yeS10cmVlL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUczQyxPQUFPLEVBQWlELHVCQUF1QixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBR3ZILE1BQU0sT0FBTywwQkFBMEI7SUFEdkM7UUFFVSxTQUFJLEdBQWdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQWNqRDtJQVpDLElBQUksQ0FDRixRQUFrQztRQUNoQyxPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxxQkFBcUI7S0FDeEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDbEQsR0FBRyxDQUFDLENBQUMsUUFBK0MsRUFBRSxFQUFFO1lBQ3RELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs4R0FkVSwwQkFBMEI7a0hBQTFCLDBCQUEwQjs7MkZBQTFCLDBCQUEwQjtrQkFEdEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFl1bnphaVJlc3BvbnNlIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBZdW56YWlEb3JtaXRvcnlUcmVlLCBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0sIFl1bnphaURvcm1pdG9yeVRyZWVUeXBlIH0gZnJvbSAnLi95dW56YWktZG9ybWl0b3J5LXRyZWUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWXVuemFpRG9ybWl0b3J5VHJlZVNlcnZpY2Uge1xuICBwcml2YXRlIGh0dHA6IF9IdHRwQ2xpZW50ID0gaW5qZWN0KF9IdHRwQ2xpZW50KTtcblxuICB0cmVlKFxuICAgIHBhcmFtOiBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0gPSB7XG4gICAgICBpc1Bvd2VyOiBmYWxzZSxcbiAgICAgIHRyZWVUeXBlOiBZdW56YWlEb3JtaXRvcnlUcmVlVHlwZS5CVUlMRElOR19GTE9PUlNfUk9PTVNcbiAgICB9XG4gICk6IE9ic2VydmFibGU8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAvYXV0aC9kb3JtL3RyZWVgLCBwYXJhbSkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaURvcm1pdG9yeVRyZWVbXT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==