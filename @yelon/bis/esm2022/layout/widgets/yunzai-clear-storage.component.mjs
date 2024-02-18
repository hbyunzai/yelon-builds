import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "ng-zorro-antd/message";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "@yelon/theme";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiClearStorageComponent, deps: [{ token: i1.NzModalService }, { token: i2.NzMessageService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiClearStorageComponent, selector: "yunzai-clearstorage", host: { listeners: { "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'storage.clear' | i18n }}
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i4.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiClearStorageComponent, decorators: [{
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
        }], ctorParameters: () => [{ type: i1.NzModalService }, { type: i2.NzMessageService }], propDecorators: { _click: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNsZWFyLXN0b3JhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS1jbGVhci1zdG9yYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBZ0JqRixNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLFlBQ1UsUUFBd0IsRUFDeEIsVUFBNEI7UUFENUIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFDbkMsQ0FBQztJQUdKLE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzhHQWZVLDJCQUEyQjtrR0FBM0IsMkJBQTJCLGtKQVQ1Qjs7O0dBR1Q7OzJGQU1VLDJCQUEyQjtrQkFYdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7OztHQUdUO29CQUNELElBQUksRUFBRTt3QkFDSixpQkFBaUIsRUFBRSxNQUFNO3FCQUMxQjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7a0hBUUMsTUFBTTtzQkFETCxZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5pbXBvcnQgeyBOek1vZGFsU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktY2xlYXJzdG9yYWdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBuei1pY29uIG56VHlwZT1cInRvb2xcIj48L2k+XG4gICAge3sgJ3N0b3JhZ2UuY2xlYXInIHwgaTE4biB9fVxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kLWJsb2NrXSc6ICd0cnVlJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlDbGVhclN0b3JhZ2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1vZGFsU3J2OiBOek1vZGFsU2VydmljZSxcbiAgICBwcml2YXRlIG1lc3NhZ2VTcnY6IE56TWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgX2NsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMubW9kYWxTcnYuY29uZmlybSh7XG4gICAgICBuelRpdGxlOiAnTWFrZSBzdXJlIGNsZWFyIGFsbCBsb2NhbCBzdG9yYWdlPycsXG4gICAgICBuek9uT2s6ICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVNydi5zdWNjZXNzKCdDbGVhciBGaW5pc2hlZCEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19