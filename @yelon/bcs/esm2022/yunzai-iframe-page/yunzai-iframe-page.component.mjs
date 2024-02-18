import { CommonModule } from '@angular/common';
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
        this.iframePageHeight = this.layoutDefaultService.options.hideHeader
            ? `${window.innerHeight - 55}px`
            : `${window.innerHeight - 64 - 55}px`;
        this.resizeHandle = () => {
            this.iframePageHeight = this.layoutDefaultService.options.hideHeader
                ? `${window.innerHeight - 55}px`
                : `${window.innerHeight - 64 - 55}px`;
        };
        window.addEventListener('resize', this.resizeHandle);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageComponent, deps: [{ token: i1.DomSanitizer }, { token: i2.MenuService }, { token: i3.LayoutDefaultService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiIframePageComponent, isStandalone: true, selector: "yunzai-iframe-page", ngImport: i0, template: `
    <div class="yunzai-iframe-page" *ngIf="hasIframe" [style.height]="iframePageHeight">
      <iframe [src]="iframeSafeSrc">
        <p>您的浏览器不支持 iframe 标签。</p>
      </iframe> </div
    >,
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-iframe-page',
                    template: `
    <div class="yunzai-iframe-page" *ngIf="hasIframe" [style.height]="iframePageHeight">
      <iframe [src]="iframeSafeSrc">
        <p>您的浏览器不支持 iframe 标签。</p>
      </iframe> </div
    >,
  `,
                    imports: [CommonModule],
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }, { type: i2.MenuService }, { type: i3.LayoutDefaultService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktaWZyYW1lLXBhZ2UveXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7Ozs7OztBQW1CN0QsTUFBTSxPQUFPLHlCQUF5QjtJQVVwQyxZQUNVLFNBQXVCLEVBQ3ZCLE9BQW9CLEVBQ3BCLG9CQUEwQztRQUYxQyxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDcEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVRwRCxjQUFjO1FBQ2QsY0FBUyxHQUFZLEtBQUssQ0FBQztJQVN4QixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDbEUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLElBQUk7WUFDaEMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFFeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsVUFBVTtnQkFDbEUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLElBQUk7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO1FBQzFDLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBYyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDUixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFFLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLE1BQU0sR0FBRyxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFXLENBQUM7b0JBQ2hFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxRCxDQUFDOzhHQWpEVSx5QkFBeUI7a0dBQXpCLHlCQUF5Qiw4RUFWMUI7Ozs7OztHQU1ULDJEQUNTLFlBQVk7OzJGQUdYLHlCQUF5QjtrQkFackMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUU7Ozs7OztHQU1UO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IExheW91dERlZmF1bHRTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lL2xheW91dC1kZWZhdWx0JztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l1bnphaS1pZnJhbWUtcGFnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInl1bnphaS1pZnJhbWUtcGFnZVwiICpuZ0lmPVwiaGFzSWZyYW1lXCIgW3N0eWxlLmhlaWdodF09XCJpZnJhbWVQYWdlSGVpZ2h0XCI+XG4gICAgICA8aWZyYW1lIFtzcmNdPVwiaWZyYW1lU2FmZVNyY1wiPlxuICAgICAgICA8cD7mgqjnmoTmtY/op4jlmajkuI3mlK/mjIEgaWZyYW1lIOagh+etvuOAgjwvcD5cbiAgICAgIDwvaWZyYW1lPiA8L2RpdlxuICAgID4sXG4gIGAsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBzdGFuZGFsb25lOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUlmcmFtZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIGlmcmFtZei9rOaNouWQjueahOWuieWFqOi3r+W+hFxuICBpZnJhbWVTYWZlU3JjITogU2FmZVJlc291cmNlVXJsO1xuXG4gIC8vIOaYr+WQpuaciWlmcmFtZeWcsOWdgFxuICBoYXNJZnJhbWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBpZnJhbWVQYWdlSGVpZ2h0ITogc3RyaW5nO1xuXG4gIHJlc2l6ZUhhbmRsZTogTnpTYWZlQW55O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgbWVudVNydjogTWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYXlvdXREZWZhdWx0U2VydmljZTogTGF5b3V0RGVmYXVsdFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaWZyYW1lUGFnZUhlaWdodCA9IHRoaXMubGF5b3V0RGVmYXVsdFNlcnZpY2Uub3B0aW9ucy5oaWRlSGVhZGVyXG4gICAgICA/IGAke3dpbmRvdy5pbm5lckhlaWdodCAtIDU1fXB4YFxuICAgICAgOiBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLSA2NCAtIDU1fXB4YDtcblxuICAgIHRoaXMucmVzaXplSGFuZGxlID0gKCkgPT4ge1xuICAgICAgdGhpcy5pZnJhbWVQYWdlSGVpZ2h0ID0gdGhpcy5sYXlvdXREZWZhdWx0U2VydmljZS5vcHRpb25zLmhpZGVIZWFkZXJcbiAgICAgICAgPyBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NX1weGBcbiAgICAgICAgOiBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLSA2NCAtIDU1fXB4YDtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZSk7XG4gICAgdGhpcy5nZXRJZnJhbWVVcmwoKTtcbiAgfVxuXG4gIGdldElmcmFtZVVybCgpOiB2b2lkIHtcbiAgICB0aGlzLm1lbnVTcnYuZ2V0Um91dGVyTGluaygpLnN1YnNjcmliZSgodXJsOiBOelNhZmVBbnkpID0+IHtcbiAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgdGhpcy5oYXNJZnJhbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlmcmFtZVNhZmVTcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWZyYW1lU3JjJykpIHtcbiAgICAgICAgICB0aGlzLmhhc0lmcmFtZSA9IHRydWU7XG4gICAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWZyYW1lU3JjJykgYXMgc3RyaW5nO1xuICAgICAgICAgIHRoaXMuaWZyYW1lU2FmZVNyYyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFzSWZyYW1lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZSk7XG4gIH1cbn1cbiJdfQ==