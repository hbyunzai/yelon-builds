import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { resizeWindow } from '@yelon/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class LayoutDisplayService {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.displayNav = new BehaviorSubject(true);
        this.displayAside = new BehaviorSubject(true);
        this.displayReuseTab = new BehaviorSubject(true);
        this.$destroy = new Subject();
        this.activatedRoute.queryParams.pipe(takeUntil(this.$destroy)).subscribe(params => {
            if (params['displayNav']) {
                try {
                    const displayNav = params['displayNav'];
                    if (/true/i.test(displayNav))
                        this.display('nav');
                    if (/false/i.test(displayNav))
                        this.hide('nav');
                }
                catch {
                    throw Error('Error: displayNav is not a boolean value.');
                }
            }
            if (params['displayReusetab']) {
                try {
                    const displayReusetab = params['displayReusetab'];
                    if (/true/i.test(displayReusetab))
                        this.display('reuseTab');
                    if (/false/i.test(displayReusetab))
                        this.hide('reuseTab');
                }
                catch {
                    throw Error('Error: displayReuseTab is not a boolean value.');
                }
            }
            if (params['displayAside']) {
                try {
                    const displayAside = params['displayAside'];
                    if (/true/i.test(displayAside))
                        this.display('aside');
                    if (/false/i.test(displayAside))
                        this.hide('aside');
                }
                catch {
                    throw Error('Error: displayAside is not a boolean value.');
                }
            }
        });
    }
    display(component) {
        switch (component) {
            case 'nav':
                this.displayNav.next(true);
                break;
            case 'aside':
                this.displayAside.next(true);
                break;
            case 'reuseTab':
                this.displayReuseTab.next(true);
                break;
        }
    }
    hide(component) {
        switch (component) {
            case 'nav':
                this.displayNav.next(false);
                break;
            case 'aside':
                this.displayAside.next(false);
                break;
            case 'reuseTab':
                this.displayReuseTab.next(false);
                break;
        }
    }
    listen(component, callback) {
        this.displayNav.pipe(takeUntil(this.$destroy)).subscribe(display => {
            if (component === 'nav') {
                callback(display);
                resizeWindow();
            }
        });
        this.displayAside.pipe(takeUntil(this.$destroy)).subscribe(display => {
            if (component === 'aside') {
                callback(display);
                resizeWindow();
            }
        });
        this.displayReuseTab.pipe(takeUntil(this.$destroy)).subscribe(display => {
            if (component === 'reuseTab') {
                callback(display);
                resizeWindow();
            }
        });
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: LayoutDisplayService, deps: [{ token: i1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: LayoutDisplayService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: LayoutDisplayService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.ActivatedRoute }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWRpc3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC1kaXNwbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTDFDLGVBQVUsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsb0JBQWUsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEYsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDO29CQUNILE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxD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QUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkUsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN0RSxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQixZQUFZLEVBQUUsQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs4R0F6RlUsb0JBQW9CO2tIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgcmVzaXplV2luZG93IH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXREaXNwbGF5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZGlzcGxheU5hdjogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgcHJpdmF0ZSBkaXNwbGF5QXNpZGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XG4gIHByaXZhdGUgZGlzcGxheVJldXNlVGFiOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgaWYgKHBhcmFtc1snZGlzcGxheU5hdiddKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZGlzcGxheU5hdiA9IHBhcmFtc1snZGlzcGxheU5hdiddO1xuICAgICAgICAgIGlmICgvdHJ1ZS9pLnRlc3QoZGlzcGxheU5hdikpIHRoaXMuZGlzcGxheSgnbmF2Jyk7XG4gICAgICAgICAgaWYgKC9mYWxzZS9pLnRlc3QoZGlzcGxheU5hdikpIHRoaXMuaGlkZSgnbmF2Jyk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRocm93IEVycm9yKCdFcnJvcjogZGlzcGxheU5hdiBpcyBub3QgYSBib29sZWFuIHZhbHVlLicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zWydkaXNwbGF5UmV1c2V0YWInXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRpc3BsYXlSZXVzZXRhYiA9IHBhcmFtc1snZGlzcGxheVJldXNldGFiJ107XG4gICAgICAgICAgaWYgKC90cnVlL2kudGVzdChkaXNwbGF5UmV1c2V0YWIpKSB0aGlzLmRpc3BsYXkoJ3JldXNlVGFiJyk7XG4gICAgICAgICAgaWYgKC9mYWxzZS9pLnRlc3QoZGlzcGxheVJldXNldGFiKSkgdGhpcy5oaWRlKCdyZXVzZVRhYicpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignRXJyb3I6IGRpc3BsYXlSZXVzZVRhYiBpcyBub3QgYSBib29sZWFuIHZhbHVlLicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zWydkaXNwbGF5QXNpZGUnXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRpc3BsYXlBc2lkZSA9IHBhcmFtc1snZGlzcGxheUFzaWRlJ107XG4gICAgICAgICAgaWYgKC90cnVlL2kudGVzdChkaXNwbGF5QXNpZGUpKSB0aGlzLmRpc3BsYXkoJ2FzaWRlJyk7XG4gICAgICAgICAgaWYgKC9mYWxzZS9pLnRlc3QoZGlzcGxheUFzaWRlKSkgdGhpcy5oaWRlKCdhc2lkZScpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignRXJyb3I6IGRpc3BsYXlBc2lkZSBpcyBub3QgYSBib29sZWFuIHZhbHVlLicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkaXNwbGF5KGNvbXBvbmVudDogJ25hdicgfCAnYXNpZGUnIHwgJ3JldXNlVGFiJyk6IHZvaWQge1xuICAgIHN3aXRjaCAoY29tcG9uZW50KSB7XG4gICAgICBjYXNlICduYXYnOlxuICAgICAgICB0aGlzLmRpc3BsYXlOYXYubmV4dCh0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhc2lkZSc6XG4gICAgICAgIHRoaXMuZGlzcGxheUFzaWRlLm5leHQodHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmV1c2VUYWInOlxuICAgICAgICB0aGlzLmRpc3BsYXlSZXVzZVRhYi5uZXh0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBoaWRlKGNvbXBvbmVudDogJ25hdicgfCAnYXNpZGUnIHwgJ3JldXNlVGFiJyk6IHZvaWQge1xuICAgIHN3aXRjaCAoY29tcG9uZW50KSB7XG4gICAgICBjYXNlICduYXYnOlxuICAgICAgICB0aGlzLmRpc3BsYXlOYXYubmV4dChmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYXNpZGUnOlxuICAgICAgICB0aGlzLmRpc3BsYXlBc2lkZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXVzZVRhYic6XG4gICAgICAgIHRoaXMuZGlzcGxheVJldXNlVGFiLm5leHQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4oY29tcG9uZW50OiAnbmF2JyB8ICdhc2lkZScgfCAncmV1c2VUYWInLCBjYWxsYmFjazogKGRpc3BsYXk6IGJvb2xlYW4pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXlOYXYucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpLnN1YnNjcmliZShkaXNwbGF5ID0+IHtcbiAgICAgIGlmIChjb21wb25lbnQgPT09ICduYXYnKSB7XG4gICAgICAgIGNhbGxiYWNrKGRpc3BsYXkpO1xuICAgICAgICByZXNpemVXaW5kb3coKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRpc3BsYXlBc2lkZS5waXBlKHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSkuc3Vic2NyaWJlKGRpc3BsYXkgPT4ge1xuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJ2FzaWRlJykge1xuICAgICAgICBjYWxsYmFjayhkaXNwbGF5KTtcbiAgICAgICAgcmVzaXplV2luZG93KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5kaXNwbGF5UmV1c2VUYWIucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpLnN1YnNjcmliZShkaXNwbGF5ID0+IHtcbiAgICAgIGlmIChjb21wb25lbnQgPT09ICdyZXVzZVRhYicpIHtcbiAgICAgICAgY2FsbGJhY2soZGlzcGxheSk7XG4gICAgICAgIHJlc2l6ZVdpbmRvdygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=