import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import screenfull from 'screenfull';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/transition-patch";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "@yelon/theme";
export class YunzaiFullScreenComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFullScreenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiFullScreenComponent, selector: "yunzai-fullscreen", host: { listeners: { "window:resize": "_resize()", "click": "_click()" }, properties: { "class.d-block": "true" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'exitFullscreen' : 'fullscreen') | i18n }}
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i3.I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFullScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-fullscreen',
                    template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'exitFullscreen' : 'fullscreen') | i18n }}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZ1bGxzY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l1bnphaS1mdWxsc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRixPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7Ozs7O0FBYXBDLE1BQU0sT0FBTyx5QkFBeUI7SUFYdEM7UUFZRSxXQUFNLEdBQUcsS0FBSyxDQUFDO0tBYWhCO0lBVkMsT0FBTztRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDO0lBR0QsTUFBTTtRQUNKLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN4QixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOytHQWJVLHlCQUF5QjttR0FBekIseUJBQXlCLDhLQVQxQjs7O0dBR1Q7OzRGQU1VLHlCQUF5QjtrQkFYckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUU7OztHQUdUO29CQUNELElBQUksRUFBRTt3QkFDSixpQkFBaUIsRUFBRSxNQUFNO3FCQUMxQjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBS0MsT0FBTztzQkFETixZQUFZO3VCQUFDLGVBQWU7Z0JBTTdCLE1BQU07c0JBREwsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBzY3JlZW5mdWxsIGZyb20gJ3NjcmVlbmZ1bGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktZnVsbHNjcmVlbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cInN0YXR1cyA/ICdmdWxsc2NyZWVuLWV4aXQnIDogJ2Z1bGxzY3JlZW4nXCI+PC9pPlxuICAgIHt7IChzdGF0dXMgPyAnZXhpdEZ1bGxzY3JlZW4nIDogJ2Z1bGxzY3JlZW4nKSB8IGkxOG4gfX1cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZC1ibG9ja10nOiAndHJ1ZSdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpRnVsbFNjcmVlbkNvbXBvbmVudCB7XG4gIHN0YXR1cyA9IGZhbHNlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBfcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdHVzID0gc2NyZWVuZnVsbC5pc0Z1bGxzY3JlZW47XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIF9jbGljaygpOiB2b2lkIHtcbiAgICBpZiAoc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICAgIHNjcmVlbmZ1bGwudG9nZ2xlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=