import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@yelon/theme';
import * as i3 from '@yelon/theme/layout-default';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';

class YunzaiIframePageComponent {
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

class YunzaiIframePageModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiIframePageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiIframePageModule, declarations: [YunzaiIframePageComponent], imports: [CommonModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule], exports: [YunzaiIframePageComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiIframePageModule, imports: [CommonModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiIframePageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        YunzaiIframePageComponent
                    ],
                    imports: [
                        CommonModule,
                        YunzaiSharedZorroModule,
                        YunzaiSharedYelonModule
                    ],
                    exports: [
                        YunzaiIframePageComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiIframePageComponent, YunzaiIframePageModule };
//# sourceMappingURL=yunzai-iframe-page.mjs.map
