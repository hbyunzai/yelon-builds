import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getUrlParam, resizeWindow } from '@yelon/util/other';
import * as i0 from "@angular/core";
export class LayoutService {
    constructor() {
        this.header = new BehaviorSubject(true);
        this.sidebar = new BehaviorSubject(true);
        this.reuseTab = new BehaviorSubject(true);
        if (getUrlParam(window.location.href, 'showResuseTab') !== null) {
            if (getUrlParam(window.location.href, 'showResuseTab') === 'true') {
                this.showReuseTab();
            }
            else {
                this.hideReuseTab();
            }
        }
        if (getUrlParam(window.location.href, 'showHeader') !== null) {
            if (getUrlParam(window.location.href, 'showHeader') === 'true') {
                this.showHeader();
            }
            else {
                this.hideHeader();
            }
        }
        if (getUrlParam(window.location.href, 'showSider') !== null) {
            if (getUrlParam(window.location.href, 'showSider') === 'true') {
                this.showSidebar();
            }
            else {
                this.hideSidebar();
            }
        }
    }
    hideSidebar() {
        this.sidebar.next(false);
        resizeWindow();
    }
    hideHeader() {
        this.header.next(false);
        resizeWindow();
    }
    showSidebar() {
        this.sidebar.next(true);
        resizeWindow();
    }
    showHeader() {
        this.header.next(true);
        resizeWindow();
    }
    showReuseTab() {
        this.reuseTab.next(true);
        resizeWindow();
    }
    hideReuseTab() {
        this.reuseTab.next(false);
        resizeWindow();
    }
}
LayoutService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LayoutService_Factory() { return new LayoutService(); }, token: LayoutService, providedIn: "root" });
LayoutService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
LayoutService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9sYXlvdXQtZGVmYXVsdC9sYXlvdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFJOUQsTUFBTSxPQUFPLGFBQWE7SUFLeEI7UUFKQSxXQUFNLEdBQStCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELFlBQU8sR0FBK0IsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsYUFBUSxHQUErQixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUcvRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDL0QsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1NBQ0Y7UUFDRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDNUQsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM5RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1NBQ0Y7UUFDRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDM0QsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLFlBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixZQUFZLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLFlBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixZQUFZLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7O1lBekRGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgZ2V0VXJsUGFyYW0sIHJlc2l6ZVdpbmRvdyB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTGF5b3V0U2VydmljZSB7XG4gIGhlYWRlcjogQmVoYXZpb3JTdWJqZWN0PE56U2FmZUFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xuICBzaWRlYmFyOiBCZWhhdmlvclN1YmplY3Q8TnpTYWZlQW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XG4gIHJldXNlVGFiOiBCZWhhdmlvclN1YmplY3Q8TnpTYWZlQW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGdldFVybFBhcmFtKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAnc2hvd1Jlc3VzZVRhYicpICE9PSBudWxsKSB7XG4gICAgICBpZiAoZ2V0VXJsUGFyYW0od2luZG93LmxvY2F0aW9uLmhyZWYsICdzaG93UmVzdXNlVGFiJykgPT09ICd0cnVlJykge1xuICAgICAgICB0aGlzLnNob3dSZXVzZVRhYigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oaWRlUmV1c2VUYWIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdldFVybFBhcmFtKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAnc2hvd0hlYWRlcicpICE9PSBudWxsKSB7XG4gICAgICBpZiAoZ2V0VXJsUGFyYW0od2luZG93LmxvY2F0aW9uLmhyZWYsICdzaG93SGVhZGVyJykgPT09ICd0cnVlJykge1xuICAgICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZ2V0VXJsUGFyYW0od2luZG93LmxvY2F0aW9uLmhyZWYsICdzaG93U2lkZXInKSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGdldFVybFBhcmFtKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAnc2hvd1NpZGVyJykgPT09ICd0cnVlJykge1xuICAgICAgICB0aGlzLnNob3dTaWRlYmFyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhpZGVTaWRlYmFyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGlkZVNpZGViYXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaWRlYmFyLm5leHQoZmFsc2UpO1xuICAgIHJlc2l6ZVdpbmRvdygpO1xuICB9XG4gIGhpZGVIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5oZWFkZXIubmV4dChmYWxzZSk7XG4gICAgcmVzaXplV2luZG93KCk7XG4gIH1cblxuICBzaG93U2lkZWJhcigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZGViYXIubmV4dCh0cnVlKTtcbiAgICByZXNpemVXaW5kb3coKTtcbiAgfVxuXG4gIHNob3dIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5oZWFkZXIubmV4dCh0cnVlKTtcbiAgICByZXNpemVXaW5kb3coKTtcbiAgfVxuXG4gIHNob3dSZXVzZVRhYigpOiB2b2lkIHtcbiAgICB0aGlzLnJldXNlVGFiLm5leHQodHJ1ZSk7XG4gICAgcmVzaXplV2luZG93KCk7XG4gIH1cblxuICBoaWRlUmV1c2VUYWIoKTogdm9pZCB7XG4gICAgdGhpcy5yZXVzZVRhYi5uZXh0KGZhbHNlKTtcbiAgICByZXNpemVXaW5kb3coKTtcbiAgfVxufVxuIl19