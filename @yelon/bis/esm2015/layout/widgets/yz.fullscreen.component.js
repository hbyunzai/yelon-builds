import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';
export class YzHeaderFullScreenComponent {
    constructor() {
        this.status = false;
    }
    get sf() {
        return screenfull;
    }
    _resize() {
        this.status = this.sf.isFullscreen;
    }
    _click() {
        if (this.sf.isEnabled) {
            this.sf.toggle();
        }
    }
}
YzHeaderFullScreenComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-fullscreen',
                template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
                host: {
                    '[class.d-block]': 'true'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderFullScreenComponent.propDecorators = {
    _resize: [{ type: HostListener, args: ['window:resize',] }],
    _click: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouZnVsbHNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXouZnVsbHNjcmVlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxLQUFLLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFhekMsTUFBTSxPQUFPLDJCQUEyQjtJQVh4QztRQVlFLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFnQmpCLENBQUM7SUFmQyxJQUFZLEVBQUU7UUFDWixPQUFPLFVBQW1DLENBQUM7SUFDN0MsQ0FBQztJQUdELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFHRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQzs7O1lBM0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7OztHQUdUO2dCQUNELElBQUksRUFBRTtvQkFDSixpQkFBaUIsRUFBRSxNQUFNO2lCQUMxQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O3NCQU9FLFlBQVksU0FBQyxlQUFlO3FCQUs1QixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBzY3JlZW5mdWxsIGZyb20gJ3NjcmVlbmZ1bGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5ei1oZWFkZXItZnVsbHNjcmVlbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cInN0YXR1cyA/ICdmdWxsc2NyZWVuLWV4aXQnIDogJ2Z1bGxzY3JlZW4nXCI+PC9pPlxuICAgIHt7IChzdGF0dXMgPyAnbWVudS5mdWxsc2NyZWVuLmV4aXQnIDogJ21lbnUuZnVsbHNjcmVlbicpIHwgaTE4biB9fVxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kLWJsb2NrXSc6ICd0cnVlJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZekhlYWRlckZ1bGxTY3JlZW5Db21wb25lbnQge1xuICBzdGF0dXMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBnZXQgc2YoKTogc2NyZWVuZnVsbC5TY3JlZW5mdWxsIHtcbiAgICByZXR1cm4gc2NyZWVuZnVsbCBhcyBzY3JlZW5mdWxsLlNjcmVlbmZ1bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgX3Jlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc2YuaXNGdWxsc2NyZWVuO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBfY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2YuaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLnNmLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxufVxuIl19