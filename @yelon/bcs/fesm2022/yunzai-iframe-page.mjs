import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@yelon/theme';
import * as i3 from '@yelon/theme/layout-default';

class YunzaiIframePageComponent {
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

const COMPONENTS = [YunzaiIframePageComponent];
class YunzaiIframePageModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, imports: [CommonModule, YunzaiIframePageComponent], exports: [YunzaiIframePageComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, imports: [CommonModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiIframePageComponent, YunzaiIframePageModule };
//# sourceMappingURL=yunzai-iframe-page.mjs.map
