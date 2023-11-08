import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/notification";
export class NotificationService {
    constructor(notifyService) {
        this.notifyService = notifyService;
    }
    notify(message) {
        this.notifyService.create(message.type, message.title, message.content);
    }
    notifyWithHtml(message) {
        this.notifyService.create(message.type, message.title, `<a href=${message.href}>${message.content}</a>`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NotificationService, deps: [{ token: i1.NzNotificationService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NotificationService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NzNotificationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9zb2NrZXQvc3JjL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU8zQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW9CLGFBQW9DO1FBQXBDLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtJQUFHLENBQUM7SUFFNUQsTUFBTSxDQUFDLE9BQWdCO1FBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFLLEVBQUUsT0FBTyxDQUFDLEtBQU0sRUFBRSxPQUFPLENBQUMsT0FBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFnQjtRQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSyxFQUFFLE9BQU8sQ0FBQyxLQUFNLEVBQUUsV0FBVyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFDO0lBQzdHLENBQUM7K0dBVFUsbUJBQW1CO21IQUFuQixtQkFBbUIsY0FETixNQUFNOzs0RkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9ub3RpZmljYXRpb24nO1xuXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmeVNlcnZpY2U6IE56Tm90aWZpY2F0aW9uU2VydmljZSkge31cblxuICBub3RpZnkobWVzc2FnZTogTWVzc2FnZSk6IHZvaWQge1xuICAgIHRoaXMubm90aWZ5U2VydmljZS5jcmVhdGUobWVzc2FnZS50eXBlISwgbWVzc2FnZS50aXRsZSEsIG1lc3NhZ2UuY29udGVudCEpO1xuICB9XG5cbiAgbm90aWZ5V2l0aEh0bWwobWVzc2FnZTogTWVzc2FnZSk6IHZvaWQge1xuICAgIHRoaXMubm90aWZ5U2VydmljZS5jcmVhdGUobWVzc2FnZS50eXBlISwgbWVzc2FnZS50aXRsZSEsIGA8YSBocmVmPSR7bWVzc2FnZS5ocmVmfT4ke21lc3NhZ2UuY29udGVudH08L2E+YCk7XG4gIH1cbn1cbiJdfQ==