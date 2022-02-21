import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import screenfull from 'screenfull';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/transition-patch";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "@yelon/theme";
export class YzHeaderFullScreenComponent {
    constructor() {
        this.status = false;
    }
    _resize() {
        this.status = screenfull.isFullscreen;
    }
    _click() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
}
YzHeaderFullScreenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderFullScreenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
YzHeaderFullScreenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: YzHeaderFullScreenComponent, selector: "yz-header-fullscreen", host: { listeners: { "window:resize": "_resize()", "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `, isInline: true, directives: [{ type: i1.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], pipes: { "i18n": i3.I18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YzHeaderFullScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yz-header-fullscreen',
                    template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
                    host: {
                        '[class.d-block]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { _resize: [{
                type: HostListener,
                args: ['window:resize']
            }], _click: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouZnVsbHNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXouZnVsbHNjcmVlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDOzs7OztBQWFwQyxNQUFNLE9BQU8sMkJBQTJCO0lBWHhDO1FBWUUsV0FBTSxHQUFHLEtBQUssQ0FBQztLQWFoQjtJQVZDLE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7SUFDeEMsQ0FBQztJQUdELE1BQU07UUFDSixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDeEIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7d0hBYlUsMkJBQTJCOzRHQUEzQiwyQkFBMkIsaUxBVDVCOzs7R0FHVDsyRkFNVSwyQkFBMkI7a0JBWHZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOzs7R0FHVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osaUJBQWlCLEVBQUUsTUFBTTtxQkFDMUI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUtDLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxlQUFlO2dCQU03QixNQUFNO3NCQURMLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgc2NyZWVuZnVsbCBmcm9tICdzY3JlZW5mdWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXotaGVhZGVyLWZ1bGxzY3JlZW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIG56LWljb24gW256VHlwZV09XCJzdGF0dXMgPyAnZnVsbHNjcmVlbi1leGl0JyA6ICdmdWxsc2NyZWVuJ1wiPjwvaT5cbiAgICB7eyAoc3RhdHVzID8gJ21lbnUuZnVsbHNjcmVlbi5leGl0JyA6ICdtZW51LmZ1bGxzY3JlZW4nKSB8IGkxOG4gfX1cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZC1ibG9ja10nOiAndHJ1ZSdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXpIZWFkZXJGdWxsU2NyZWVuQ29tcG9uZW50IHtcbiAgc3RhdHVzID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIF9yZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0dXMgPSBzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbjtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgX2NsaWNrKCk6IHZvaWQge1xuICAgIGlmIChzY3JlZW5mdWxsLmlzRW5hYmxlZCkge1xuICAgICAgc2NyZWVuZnVsbC50b2dnbGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==