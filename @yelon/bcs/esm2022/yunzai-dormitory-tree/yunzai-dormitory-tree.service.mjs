import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { YunzaiDormitoryTreeType } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
export class YunzaiDormitoryTreeService {
    constructor(http) {
        this.http = http;
    }
    tree(param = {
        isPower: false,
        treeType: YunzaiDormitoryTreeType.BUILDING_FLOORS_ROOMS
    }) {
        return this.http.post(`/auth/dorm/tree`, param).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDormitoryTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDormitoryTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDormitoryTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRvcm1pdG9yeS10cmVlL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUt2QyxPQUFPLEVBQWlELHVCQUF1QixFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQUd2SCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQW9CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7SUFBRyxDQUFDO0lBRXpDLElBQUksQ0FDRixRQUFrQztRQUNoQyxPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxxQkFBcUI7S0FDeEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDbEQsR0FBRyxDQUFDLENBQUMsUUFBK0MsRUFBRSxFQUFFO1lBQ3RELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzsrR0FkVSwwQkFBMEI7bUhBQTFCLDBCQUEwQixjQURiLE1BQU07OzRGQUNuQiwwQkFBMEI7a0JBRHRDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFl1bnphaVJlc3BvbnNlIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBZdW56YWlEb3JtaXRvcnlUcmVlLCBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0sIFl1bnphaURvcm1pdG9yeVRyZWVUeXBlIH0gZnJvbSAnLi95dW56YWktZG9ybWl0b3J5LXRyZWUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaURvcm1pdG9yeVRyZWVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCkge31cblxuICB0cmVlKFxuICAgIHBhcmFtOiBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0gPSB7XG4gICAgICBpc1Bvd2VyOiBmYWxzZSxcbiAgICAgIHRyZWVUeXBlOiBZdW56YWlEb3JtaXRvcnlUcmVlVHlwZS5CVUlMRElOR19GTE9PUlNfUk9PTVNcbiAgICB9XG4gICk6IE9ic2VydmFibGU8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAvYXV0aC9kb3JtL3RyZWVgLCBwYXJhbSkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaURvcm1pdG9yeVRyZWVbXT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==