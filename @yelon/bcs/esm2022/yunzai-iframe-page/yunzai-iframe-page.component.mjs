import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@yelon/theme";
import * as i3 from "@yelon/theme/layout-default";
import * as i4 from "@angular/common";
export class YunzaiIframePageComponent {
    constructor(sanitizer, menuSrv, layoutDefaultService) {
        this.sanitizer = sanitizer;
        this.menuSrv = menuSrv;
        this.layoutDefaultService = layoutDefaultService;
        // 是否有iframe地址
        this.hasIframe = false;
    }
    ngOnInit() {
        this.iframePageHeight = this.layoutDefaultService.options.hideHeader ? (window.innerHeight - 55 + 'px') : (window.innerHeight - 64 - 55 + 'px');
        this.resizeHandle = () => {
            this.iframePageHeight = this.layoutDefaultService.options.hideHeader ? (window.innerHeight - 55 + 'px') : (window.innerHeight - 64 - 55 + 'px');
        };
        window.addEventListener("resize", this.resizeHandle);
        this.getIframeUrl();
    }
    getIframeUrl() {
        this.menuSrv.getRouterLink().subscribe((url) => {
            if (url) {
                this.hasIframe = true;
                this.iframeSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
            else {
                if (localStorage.getItem('iframeSrc')) {
                    this.hasIframe = true;
                    const url = localStorage.getItem('iframeSrc');
                    this.iframeSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                }
                else {
                    this.hasIframe = false;
                }
            }
        });
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeHandle);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiIframePageComponent, deps: [{ token: i1.DomSanitizer }, { token: i2.MenuService }, { token: i3.LayoutDefaultService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiIframePageComponent, selector: "yunzai-iframe-page", ngImport: i0, template: "<div class=\"yunzai-iframe-page\" *ngIf=\"hasIframe\" [style.height]=\"iframePageHeight\">\n  <iframe [src]=\"iframeSafeSrc\">\n    <p>\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 iframe \u6807\u7B7E\u3002</p>\n  </iframe>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiIframePageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'yunzai-iframe-page', template: "<div class=\"yunzai-iframe-page\" *ngIf=\"hasIframe\" [style.height]=\"iframePageHeight\">\n  <iframe [src]=\"iframeSafeSrc\">\n    <p>\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 iframe \u6807\u7B7E\u3002</p>\n  </iframe>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }, { type: i2.MenuService }, { type: i3.LayoutDefaultService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktaWZyYW1lLXBhZ2UveXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktaWZyYW1lLXBhZ2UveXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFTM0QsTUFBTSxPQUFPLHlCQUF5QjtJQVdwQyxZQUFvQixTQUF1QixFQUN2QixPQUFvQixFQUNwQixvQkFBMEM7UUFGMUMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQ3BCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFSOUQsY0FBYztRQUNkLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFRM0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRWhKLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbEosQ0FBQyxDQUFBO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNsRCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNMLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLE1BQU0sR0FBRyxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFXLENBQUM7b0JBQ2hFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDekU7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3hCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDekQsQ0FBQzsrR0EvQ1UseUJBQXlCO21HQUF6Qix5QkFBeUIsMERDVHRDLDhPQUtBOzs0RkRJYSx5QkFBeUI7a0JBSnJDLFNBQVM7K0JBQ0Usb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge01lbnVTZXJ2aWNlfSBmcm9tIFwiQHllbG9uL3RoZW1lXCI7XG5pbXBvcnQge0xheW91dERlZmF1bHRTZXJ2aWNlfSBmcm9tIFwiQHllbG9uL3RoZW1lL2xheW91dC1kZWZhdWx0XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS1pZnJhbWUtcGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi95dW56YWktaWZyYW1lLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlJZnJhbWVQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8vIGlmcmFtZei9rOaNouWQjueahOWuieWFqOi3r+W+hFxuICBpZnJhbWVTYWZlU3JjITogU2FmZVJlc291cmNlVXJsO1xuXG4gIC8vIOaYr+WQpuaciWlmcmFtZeWcsOWdgFxuICBoYXNJZnJhbWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBpZnJhbWVQYWdlSGVpZ2h0ITogc3RyaW5nO1xuXG4gIHJlc2l6ZUhhbmRsZTogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICAgICAgICBwcml2YXRlIG1lbnVTcnY6IE1lbnVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGxheW91dERlZmF1bHRTZXJ2aWNlOiBMYXlvdXREZWZhdWx0U2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pZnJhbWVQYWdlSGVpZ2h0ID0gdGhpcy5sYXlvdXREZWZhdWx0U2VydmljZS5vcHRpb25zLmhpZGVIZWFkZXIgPyAod2luZG93LmlubmVySGVpZ2h0IC0gNTUgKyAncHgnKSA6ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSA2NCAtIDU1ICsgJ3B4Jyk7XG5cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuaWZyYW1lUGFnZUhlaWdodCA9IHRoaXMubGF5b3V0RGVmYXVsdFNlcnZpY2Uub3B0aW9ucy5oaWRlSGVhZGVyID8gKHdpbmRvdy5pbm5lckhlaWdodCAtIDU1ICsgJ3B4JykgOiAod2luZG93LmlubmVySGVpZ2h0IC0gNjQgLSA1NSArICdweCcpO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZUhhbmRsZSk7XG5cbiAgICB0aGlzLmdldElmcmFtZVVybCgpO1xuICB9XG5cblxuICBnZXRJZnJhbWVVcmwoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51U3J2LmdldFJvdXRlckxpbmsoKS5zdWJzY3JpYmUoKHVybDogYW55KSA9PiB7XG4gICAgICBpZiAodXJsKSB7XG4gICAgICAgIHRoaXMuaGFzSWZyYW1lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pZnJhbWVTYWZlU3JjID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lmcmFtZVNyYycpKSB7XG4gICAgICAgICAgdGhpcy5oYXNJZnJhbWUgPSB0cnVlO1xuICAgICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lmcmFtZVNyYycpIGFzIHN0cmluZztcbiAgICAgICAgICB0aGlzLmlmcmFtZVNhZmVTcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhc0lmcmFtZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGUpXG4gIH1cblxufVxuIiwiPGRpdiBjbGFzcz1cInl1bnphaS1pZnJhbWUtcGFnZVwiICpuZ0lmPVwiaGFzSWZyYW1lXCIgW3N0eWxlLmhlaWdodF09XCJpZnJhbWVQYWdlSGVpZ2h0XCI+XG4gIDxpZnJhbWUgW3NyY109XCJpZnJhbWVTYWZlU3JjXCI+XG4gICAgPHA+5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyBIGlmcmFtZSDmoIfnrb7jgII8L3A+XG4gIDwvaWZyYW1lPlxuPC9kaXY+XG4iXX0=