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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutDisplayService, deps: [{ token: i1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutDisplayService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutDisplayService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWRpc3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC1kaXNwbGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTDFDLGVBQVUsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsb0JBQWUsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEYsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUk7b0JBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xELElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakQ7Z0JBQUMsTUFBTTtvQkFDTixNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO2lCQUMxRDthQUNGO1lBQ0QsSUFBSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDN0IsSUFBSTtvQkFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQzt3QkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO3dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzNEO2dCQUFDLE1BQU07b0JBQ04sTUFBTSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztpQkFDL0Q7YUFDRjtZQUNELElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUMxQixJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0RCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO3dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JEO2dCQUFDLE1BQU07b0JBQ04sTUFBTSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztpQkFDNUQ7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxTQUF1QztRQUM3QyxRQUFRLFNBQVMsRUFBRTtZQUNqQixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsU0FBdUM7UUFDMUMsUUFBUSxTQUFTLEVBQUU7WUFDakIsS0FBSyxLQUFLO2dCQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1lBQ1IsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQXVDLEVBQUUsUUFBb0M7UUFDbEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRSxJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEIsWUFBWSxFQUFFLENBQUM7YUFDaEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkUsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO2dCQUN6QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLFlBQVksRUFBRSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RFLElBQUksU0FBUyxLQUFLLFVBQVUsRUFBRTtnQkFDNUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQixZQUFZLEVBQUUsQ0FBQzthQUNoQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7K0dBekZVLG9CQUFvQjttSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07OzRGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IHJlc2l6ZVdpbmRvdyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0RGlzcGxheVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGRpc3BsYXlOYXY6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XG4gIHByaXZhdGUgZGlzcGxheUFzaWRlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xuICBwcml2YXRlIGRpc3BsYXlSZXVzZVRhYjogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpKS5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIGlmIChwYXJhbXNbJ2Rpc3BsYXlOYXYnXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRpc3BsYXlOYXYgPSBwYXJhbXNbJ2Rpc3BsYXlOYXYnXTtcbiAgICAgICAgICBpZiAoL3RydWUvaS50ZXN0KGRpc3BsYXlOYXYpKSB0aGlzLmRpc3BsYXkoJ25hdicpO1xuICAgICAgICAgIGlmICgvZmFsc2UvaS50ZXN0KGRpc3BsYXlOYXYpKSB0aGlzLmhpZGUoJ25hdicpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignRXJyb3I6IGRpc3BsYXlOYXYgaXMgbm90IGEgYm9vbGVhbiB2YWx1ZS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhcmFtc1snZGlzcGxheVJldXNldGFiJ10pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkaXNwbGF5UmV1c2V0YWIgPSBwYXJhbXNbJ2Rpc3BsYXlSZXVzZXRhYiddO1xuICAgICAgICAgIGlmICgvdHJ1ZS9pLnRlc3QoZGlzcGxheVJldXNldGFiKSkgdGhpcy5kaXNwbGF5KCdyZXVzZVRhYicpO1xuICAgICAgICAgIGlmICgvZmFsc2UvaS50ZXN0KGRpc3BsYXlSZXVzZXRhYikpIHRoaXMuaGlkZSgncmV1c2VUYWInKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0Vycm9yOiBkaXNwbGF5UmV1c2VUYWIgaXMgbm90IGEgYm9vbGVhbiB2YWx1ZS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhcmFtc1snZGlzcGxheUFzaWRlJ10pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkaXNwbGF5QXNpZGUgPSBwYXJhbXNbJ2Rpc3BsYXlBc2lkZSddO1xuICAgICAgICAgIGlmICgvdHJ1ZS9pLnRlc3QoZGlzcGxheUFzaWRlKSkgdGhpcy5kaXNwbGF5KCdhc2lkZScpO1xuICAgICAgICAgIGlmICgvZmFsc2UvaS50ZXN0KGRpc3BsYXlBc2lkZSkpIHRoaXMuaGlkZSgnYXNpZGUnKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0Vycm9yOiBkaXNwbGF5QXNpZGUgaXMgbm90IGEgYm9vbGVhbiB2YWx1ZS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGlzcGxheShjb21wb25lbnQ6ICduYXYnIHwgJ2FzaWRlJyB8ICdyZXVzZVRhYicpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudCkge1xuICAgICAgY2FzZSAnbmF2JzpcbiAgICAgICAgdGhpcy5kaXNwbGF5TmF2Lm5leHQodHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYXNpZGUnOlxuICAgICAgICB0aGlzLmRpc3BsYXlBc2lkZS5uZXh0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JldXNlVGFiJzpcbiAgICAgICAgdGhpcy5kaXNwbGF5UmV1c2VUYWIubmV4dCh0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaGlkZShjb21wb25lbnQ6ICduYXYnIHwgJ2FzaWRlJyB8ICdyZXVzZVRhYicpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudCkge1xuICAgICAgY2FzZSAnbmF2JzpcbiAgICAgICAgdGhpcy5kaXNwbGF5TmF2Lm5leHQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FzaWRlJzpcbiAgICAgICAgdGhpcy5kaXNwbGF5QXNpZGUubmV4dChmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmV1c2VUYWInOlxuICAgICAgICB0aGlzLmRpc3BsYXlSZXVzZVRhYi5uZXh0KGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbGlzdGVuKGNvbXBvbmVudDogJ25hdicgfCAnYXNpZGUnIHwgJ3JldXNlVGFiJywgY2FsbGJhY2s6IChkaXNwbGF5OiBib29sZWFuKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5TmF2LnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpKS5zdWJzY3JpYmUoZGlzcGxheSA9PiB7XG4gICAgICBpZiAoY29tcG9uZW50ID09PSAnbmF2Jykge1xuICAgICAgICBjYWxsYmFjayhkaXNwbGF5KTtcbiAgICAgICAgcmVzaXplV2luZG93KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5kaXNwbGF5QXNpZGUucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpLnN1YnNjcmliZShkaXNwbGF5ID0+IHtcbiAgICAgIGlmIChjb21wb25lbnQgPT09ICdhc2lkZScpIHtcbiAgICAgICAgY2FsbGJhY2soZGlzcGxheSk7XG4gICAgICAgIHJlc2l6ZVdpbmRvdygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZGlzcGxheVJldXNlVGFiLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpKS5zdWJzY3JpYmUoZGlzcGxheSA9PiB7XG4gICAgICBpZiAoY29tcG9uZW50ID09PSAncmV1c2VUYWInKSB7XG4gICAgICAgIGNhbGxiYWNrKGRpc3BsYXkpO1xuICAgICAgICByZXNpemVXaW5kb3coKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19