import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
export class YzHeaderClearStorageComponent {
    constructor(modalSrv, messageSrv) {
        this.modalSrv = modalSrv;
        this.messageSrv = messageSrv;
    }
    _click() {
        this.modalSrv.confirm({
            nzTitle: 'Make sure clear all local storage?',
            nzOnOk: () => {
                localStorage.clear();
                this.messageSrv.success('Clear Finished!');
            }
        });
    }
}
YzHeaderClearStorageComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-clear-storage',
                template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `,
                host: {
                    '[class.d-block]': 'true'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderClearStorageComponent.ctorParameters = () => [
    { type: NzModalService },
    { type: NzMessageService }
];
YzHeaderClearStorageComponent.propDecorators = {
    _click: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouY2xlYXItc3RvcmFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXouY2xlYXItc3RvcmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBYXJELE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsWUFBb0IsUUFBd0IsRUFBVSxVQUE0QjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUcsQ0FBQztJQUd0RixNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7OztHQUdUO2dCQUNELElBQUksRUFBRTtvQkFDSixpQkFBaUIsRUFBRSxNQUFNO2lCQUMxQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBWlEsY0FBYztZQURkLGdCQUFnQjs7O3FCQWlCdEIsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5pbXBvcnQgeyBOek1vZGFsU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5ei1oZWFkZXItY2xlYXItc3RvcmFnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJ0b29sXCI+PC9pPlxuICAgIHt7ICdtZW51LmNsZWFyLmxvY2FsLnN0b3JhZ2UnIHwgaTE4biB9fVxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kLWJsb2NrXSc6ICd0cnVlJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZekhlYWRlckNsZWFyU3RvcmFnZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTcnY6IE56TW9kYWxTZXJ2aWNlLCBwcml2YXRlIG1lc3NhZ2VTcnY6IE56TWVzc2FnZVNlcnZpY2UpIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBfY2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5tb2RhbFNydi5jb25maXJtKHtcbiAgICAgIG56VGl0bGU6ICdNYWtlIHN1cmUgY2xlYXIgYWxsIGxvY2FsIHN0b3JhZ2U/JyxcbiAgICAgIG56T25PazogKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlU3J2LnN1Y2Nlc3MoJ0NsZWFyIEZpbmlzaGVkIScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=