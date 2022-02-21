import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "ng-zorro-antd/message";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "@yelon/theme";
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
YzHeaderClearStorageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderClearStorageComponent, deps: [{ token: i1.NzModalService }, { token: i2.NzMessageService }], target: i0.ɵɵFactoryTarget.Component });
YzHeaderClearStorageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: YzHeaderClearStorageComponent, selector: "yz-header-clear-storage", host: { listeners: { "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `, isInline: true, directives: [{ type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], pipes: { "i18n": i5.I18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderClearStorageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yz-header-clear-storage',
                    template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `,
                    host: {
                        '[class.d-block]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.NzModalService }, { type: i2.NzMessageService }]; }, propDecorators: { _click: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouY2xlYXItc3RvcmFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXouY2xlYXItc3RvcmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFnQmpGLE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsWUFBb0IsUUFBd0IsRUFBVSxVQUE0QjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUcsQ0FBQztJQUd0RixNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7MEhBWlUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsc0pBVDlCOzs7R0FHVDsyRkFNVSw2QkFBNkI7a0JBWHpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs7R0FHVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osaUJBQWlCLEVBQUUsTUFBTTtxQkFDMUI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO29JQUtDLE1BQU07c0JBREwsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuaW1wb3J0IHsgTnpNb2RhbFNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21vZGFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXotaGVhZGVyLWNsZWFyLXN0b3JhZ2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIG56LWljb24gbnpUeXBlPVwidG9vbFwiPjwvaT5cbiAgICB7eyAnbWVudS5jbGVhci5sb2NhbC5zdG9yYWdlJyB8IGkxOG4gfX1cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZC1ibG9ja10nOiAndHJ1ZSdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXpIZWFkZXJDbGVhclN0b3JhZ2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU3J2OiBOek1vZGFsU2VydmljZSwgcHJpdmF0ZSBtZXNzYWdlU3J2OiBOek1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgX2NsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMubW9kYWxTcnYuY29uZmlybSh7XG4gICAgICBuelRpdGxlOiAnTWFrZSBzdXJlIGNsZWFyIGFsbCBsb2NhbCBzdG9yYWdlPycsXG4gICAgICBuek9uT2s6ICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVNydi5zdWNjZXNzKCdDbGVhciBGaW5pc2hlZCEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19