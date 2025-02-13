import { ActivatedRouteSnapshot, RouteReuseStrategy } from '@angular/router';
export declare class ReuseTabStrategy implements RouteReuseStrategy {
    private readonly srv;
    shouldDetach(route: ActivatedRouteSnapshot): boolean;
    store(route: ActivatedRouteSnapshot, handle: unknown): void;
    shouldAttach(route: ActivatedRouteSnapshot): boolean;
    retrieve(route: ActivatedRouteSnapshot): any | null;
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
}
