import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import screenfull from 'screenfull';
import { I18nPipe } from '@yelon/theme';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
export class YunzaiHeaderFullScreenComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiHeaderFullScreenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.0", type: YunzaiHeaderFullScreenComponent, isStandalone: true, selector: "yunzai-header-fullscreen", host: { listeners: { "window:resize": "_resize()", "click": "_click()" }, properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiHeaderFullScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-header-fullscreen',
                    template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: true,
                    imports: [NzIconModule, I18nPipe]
                }]
        }], propDecorators: { _resize: [{
                type: HostListener,
                args: ['window:resize']
            }], _click: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZ1bGxzY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL3l1bnphaS13aWRnZXRzL3l1bnphaS1mdWxsc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRixPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFFcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQWVsRCxNQUFNLE9BQU8sK0JBQStCO0lBYjVDO1FBY0UsV0FBTSxHQUFHLEtBQUssQ0FBQztLQWFoQjtJQVZDLE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7SUFDeEMsQ0FBQztJQUdELE1BQU07UUFDSixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7OEdBYlUsK0JBQStCO2tHQUEvQiwrQkFBK0Isd01BWGhDOzs7R0FHVCwyREFNUyxZQUFZLDZNQUFFLFFBQVE7OzJGQUVyQiwrQkFBK0I7a0JBYjNDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7R0FHVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsTUFBTTtxQkFDekI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDO2lCQUNsQzs4QkFLQyxPQUFPO3NCQUROLFlBQVk7dUJBQUMsZUFBZTtnQkFNN0IsTUFBTTtzQkFETCxZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHNjcmVlbmZ1bGwgZnJvbSAnc2NyZWVuZnVsbCc7XG5cbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS1oZWFkZXItZnVsbHNjcmVlbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cInN0YXR1cyA/ICdmdWxsc2NyZWVuLWV4aXQnIDogJ2Z1bGxzY3JlZW4nXCI+PC9pPlxuICAgIHt7IChzdGF0dXMgPyAnbWVudS5mdWxsc2NyZWVuLmV4aXQnIDogJ21lbnUuZnVsbHNjcmVlbicpIHwgaTE4biB9fVxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5mbGV4LTFdJzogJ3RydWUnXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpJY29uTW9kdWxlLCBJMThuUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpSGVhZGVyRnVsbFNjcmVlbkNvbXBvbmVudCB7XG4gIHN0YXR1cyA9IGZhbHNlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBfcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdHVzID0gc2NyZWVuZnVsbC5pc0Z1bGxzY3JlZW47XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIF9jbGljaygpOiB2b2lkIHtcbiAgICBpZiAoc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICAgIHNjcmVlbmZ1bGwudG9nZ2xlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=