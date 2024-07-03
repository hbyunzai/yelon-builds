import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { I18nPipe } from '@yelon/theme';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
export class YunzaiHeaderClearStorageComponent {
    constructor() {
        this.modalSrv = inject(NzModalService);
        this.messageSrv = inject(NzMessageService);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiHeaderClearStorageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.5", type: YunzaiHeaderClearStorageComponent, isStandalone: true, selector: "yunzai-header-clear-storage", host: { listeners: { "click": "_click()" }, properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiHeaderClearStorageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-header-clear-storage',
                    template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: true,
                    imports: [NzIconModule, I18nPipe]
                }]
        }], propDecorators: { _click: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNsZWFyLXN0b3JhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3l1bnphaS13aWRnZXRzL3l1bnphaS1jbGVhci1zdG9yYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFlckQsTUFBTSxPQUFPLGlDQUFpQztJQWI5QztRQWNtQixhQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQVl4RDtJQVRDLE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzhHQWJVLGlDQUFpQztrR0FBakMsaUNBQWlDLDZLQVhsQzs7O0dBR1QsMkRBTVMsWUFBWSw2TUFBRSxRQUFROzsyRkFFckIsaUNBQWlDO2tCQWI3QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRTs7O0dBR1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLGdCQUFnQixFQUFFLE1BQU07cUJBQ3pCO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQztpQkFDbEM7OEJBTUMsTUFBTTtzQkFETCxZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5pbXBvcnQgeyBOek1vZGFsU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktaGVhZGVyLWNsZWFyLXN0b3JhZ2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIG56LWljb24gbnpUeXBlPVwidG9vbFwiPjwvaT5cbiAgICB7eyAnbWVudS5jbGVhci5sb2NhbC5zdG9yYWdlJyB8IGkxOG4gfX1cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZmxleC0xXSc6ICd0cnVlJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW056SWNvbk1vZHVsZSwgSTE4blBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUhlYWRlckNsZWFyU3RvcmFnZUNvbXBvbmVudCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kYWxTcnYgPSBpbmplY3QoTnpNb2RhbFNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VTcnYgPSBpbmplY3QoTnpNZXNzYWdlU2VydmljZSk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBfY2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5tb2RhbFNydi5jb25maXJtKHtcbiAgICAgIG56VGl0bGU6ICdNYWtlIHN1cmUgY2xlYXIgYWxsIGxvY2FsIHN0b3JhZ2U/JyxcbiAgICAgIG56T25PazogKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlU3J2LnN1Y2Nlc3MoJ0NsZWFyIEZpbmlzaGVkIScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=