import { Injectable, inject } from '@angular/core';
import { CheckSimple, ToLogin } from '../helper';
import { YA_SERVICE_TOKEN } from '../interface';
import * as i0 from "@angular/core";
export class AuthSimpleGuardService {
    constructor() {
        this.srv = inject(YA_SERVICE_TOKEN);
    }
    process(url) {
        const res = CheckSimple(this.srv.get());
        if (!res) {
            ToLogin(this.srv.options, url);
        }
        return res;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: AuthSimpleGuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: AuthSimpleGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: AuthSimpleGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ authSimpleCanActivate ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
export const authSimpleCanActivate = (_, state) => inject(AuthSimpleGuardService).process(state.url);
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ authSimpleCanActivateChild ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
export const authSimpleCanActivateChild = (_, state) => inject(AuthSimpleGuardService).process(state.url);
/**
 * Simple 路由守卫, [ACL Document](https://ng.yunzainfo.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canMatch: [ authSimpleCanMatch ],
 *  data: { guard: 'user1' }
 * }
 * ```
 */
export const authSimpleCanMatch = route => inject(AuthSimpleGuardService).process(route.path);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYXV0aC9zcmMvdG9rZW4vc2ltcGxlL3NpbXBsZS5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBSWhELE1BQU0sT0FBTyxzQkFBc0I7SUFEbkM7UUFFbUIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBU2pEO0lBUEMsT0FBTyxDQUFDLEdBQVk7UUFDbEIsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFzQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OEdBVFUsc0JBQXNCO2tIQUF0QixzQkFBc0IsY0FEVCxNQUFNOzsyRkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFhbEM7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFrQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFcEg7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUF1QixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUN6RSxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXBEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBZSxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlQ2hpbGRGbiwgQ2FuQWN0aXZhdGVGbiwgQ2FuTWF0Y2hGbiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IENoZWNrU2ltcGxlLCBUb0xvZ2luIH0gZnJvbSAnLi4vaGVscGVyJztcbmltcG9ydCB7IFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2ltcGxlVG9rZW5Nb2RlbCB9IGZyb20gJy4vc2ltcGxlLm1vZGVsJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBdXRoU2ltcGxlR3VhcmRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzcnYgPSBpbmplY3QoWUFfU0VSVklDRV9UT0tFTik7XG5cbiAgcHJvY2Vzcyh1cmw/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCByZXMgPSBDaGVja1NpbXBsZSh0aGlzLnNydi5nZXQoKSBhcyBTaW1wbGVUb2tlbk1vZGVsKTtcbiAgICBpZiAoIXJlcykge1xuICAgICAgVG9Mb2dpbih0aGlzLnNydi5vcHRpb25zLCB1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbi8qKlxuICogU2ltcGxlIOi3r+eUseWuiOWNqywgW0FDTCBEb2N1bWVudF0oaHR0cHM6Ly9uZy55dW56YWluZm8uY29tL2F1dGgvZ3VhcmQpLlxuICpcbiAqIGBgYHRzXG4gKiBkYXRhOiB7XG4gKiAgcGF0aDogJ2hvbWUnLFxuICogIGNhbkFjdGl2YXRlOiBbIGF1dGhTaW1wbGVDYW5BY3RpdmF0ZSBdLFxuICogIGRhdGE6IHsgZ3VhcmQ6ICd1c2VyMScgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBhdXRoU2ltcGxlQ2FuQWN0aXZhdGU6IENhbkFjdGl2YXRlRm4gPSAoXywgc3RhdGUpID0+IGluamVjdChBdXRoU2ltcGxlR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKHN0YXRlLnVybCk7XG5cbi8qKlxuICogU2ltcGxlIOi3r+eUseWuiOWNqywgW0FDTCBEb2N1bWVudF0oaHR0cHM6Ly9uZy55dW56YWluZm8uY29tL2F1dGgvZ3VhcmQpLlxuICpcbiAqIGBgYHRzXG4gKiBkYXRhOiB7XG4gKiAgcGF0aDogJ2hvbWUnLFxuICogIGNhbkFjdGl2YXRlQ2hpbGQ6IFsgYXV0aFNpbXBsZUNhbkFjdGl2YXRlQ2hpbGQgXSxcbiAqICBkYXRhOiB7IGd1YXJkOiAndXNlcjEnIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgYXV0aFNpbXBsZUNhbkFjdGl2YXRlQ2hpbGQ6IENhbkFjdGl2YXRlQ2hpbGRGbiA9IChfLCBzdGF0ZSkgPT5cbiAgaW5qZWN0KEF1dGhTaW1wbGVHdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcblxuLyoqXG4gKiBTaW1wbGUg6Lev55Sx5a6I5Y2rLCBbQUNMIERvY3VtZW50XShodHRwczovL25nLnl1bnphaW5mby5jb20vYXV0aC9ndWFyZCkuXG4gKlxuICogYGBgdHNcbiAqIGRhdGE6IHtcbiAqICBwYXRoOiAnaG9tZScsXG4gKiAgY2FuTWF0Y2g6IFsgYXV0aFNpbXBsZUNhbk1hdGNoIF0sXG4gKiAgZGF0YTogeyBndWFyZDogJ3VzZXIxJyB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IGF1dGhTaW1wbGVDYW5NYXRjaDogQ2FuTWF0Y2hGbiA9IHJvdXRlID0+IGluamVjdChBdXRoU2ltcGxlR3VhcmRTZXJ2aWNlKS5wcm9jZXNzKHJvdXRlLnBhdGgpO1xuIl19