import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "ng-zorro-antd/message";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "@yelon/theme";
export class YunzaiClearStorageComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiClearStorageComponent, deps: [{ token: i1.NzModalService }, { token: i2.NzMessageService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiClearStorageComponent, selector: "yunzai-clearstorage", host: { listeners: { "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'storage.clear' | i18n }}
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i5.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiClearStorageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-clearstorage',
                    template: `
    <i nz-icon nzType="tool"></i>
    {{ 'storage.clear' | i18n }}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNsZWFyLXN0b3JhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS1jbGVhci1zdG9yYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQWdCakYsTUFBTSxPQUFPLDJCQUEyQjtJQUN0QyxZQUNVLFFBQXdCLEVBQ3hCLFVBQTRCO1FBRDVCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQ25DLENBQUM7SUFHSixNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0FmVSwyQkFBMkI7bUdBQTNCLDJCQUEyQixrSkFUNUI7OztHQUdUOzs0RkFNVSwyQkFBMkI7a0JBWHZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzs7R0FHVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osaUJBQWlCLEVBQUUsTUFBTTtxQkFDMUI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO29JQVFDLE1BQU07c0JBREwsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuaW1wb3J0IHsgTnpNb2RhbFNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21vZGFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXVuemFpLWNsZWFyc3RvcmFnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJ0b29sXCI+PC9pPlxuICAgIHt7ICdzdG9yYWdlLmNsZWFyJyB8IGkxOG4gfX1cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZC1ibG9ja10nOiAndHJ1ZSdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpQ2xlYXJTdG9yYWdlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtb2RhbFNydjogTnpNb2RhbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtZXNzYWdlU3J2OiBOek1lc3NhZ2VTZXJ2aWNlXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIF9jbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsU3J2LmNvbmZpcm0oe1xuICAgICAgbnpUaXRsZTogJ01ha2Ugc3VyZSBjbGVhciBhbGwgbG9jYWwgc3RvcmFnZT8nLFxuICAgICAgbnpPbk9rOiAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTcnYuc3VjY2VzcygnQ2xlYXIgRmluaXNoZWQhJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==