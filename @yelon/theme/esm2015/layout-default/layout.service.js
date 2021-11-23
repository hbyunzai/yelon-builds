import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class LayoutService {
    constructor() {
        this.header = new BehaviorSubject(true);
        this.sidebar = new BehaviorSubject(true);
    }
    hideSidebar() {
        this.sidebar.next(false);
    }
    hideHeader() {
        this.header.next(false);
    }
    showSidebar() {
        this.sidebar.next(true);
    }
    showHeader() {
        this.header.next(true);
    }
}
LayoutService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LayoutService_Factory() { return new LayoutService(); }, token: LayoutService, providedIn: "root" });
LayoutService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
LayoutService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9sYXlvdXQtZGVmYXVsdC9sYXlvdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBS3ZDLE1BQU0sT0FBTyxhQUFhO0lBSXhCO1FBSEEsV0FBTSxHQUErQixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxZQUFPLEdBQStCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFFaEIsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7WUFwQkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIExheW91dFNlcnZpY2Uge1xuICBoZWFkZXI6IEJlaGF2aW9yU3ViamVjdDxOelNhZmVBbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgc2lkZWJhcjogQmVoYXZpb3JTdWJqZWN0PE56U2FmZUFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBoaWRlU2lkZWJhcigpIHtcbiAgICB0aGlzLnNpZGViYXIubmV4dChmYWxzZSk7XG4gIH1cbiAgaGlkZUhlYWRlcigpIHtcbiAgICB0aGlzLmhlYWRlci5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIHNob3dTaWRlYmFyKCkge1xuICAgIHRoaXMuc2lkZWJhci5uZXh0KHRydWUpO1xuICB9XG5cbiAgc2hvd0hlYWRlcigpIHtcbiAgICB0aGlzLmhlYWRlci5uZXh0KHRydWUpO1xuICB9XG59XG4iXX0=