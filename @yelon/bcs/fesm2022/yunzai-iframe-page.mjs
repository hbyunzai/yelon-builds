import * as i0 from '@angular/core';
import { inject, Component, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '@yelon/theme';
import { LayoutDefaultService } from '@yelon/theme/layout-default';
import * as i1 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';

class YunzaiIframePageComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.menuService = inject(MenuService);
        this.layoutService = inject(LayoutDefaultService);
        this.hasIframe = false;
    }
    ngOnInit() {
        this.iframePageHeight = this.layoutService.options.hideHeader
            ? `${window.innerHeight - 55}px`
            : `${window.innerHeight - 64 - 55}px`;
        this.resizeHandle = () => {
            this.iframePageHeight = this.layoutService.options.hideHeader
                ? `${window.innerHeight - 55}px`
                : `${window.innerHeight - 64 - 55}px`;
        };
        window.addEventListener('resize', this.resizeHandle);
        this.getIframeUrl();
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeHandle);
    }
    getIframeUrl() {
        this.menuService.getRouterLink().subscribe((url) => {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiIframePageComponent, isStandalone: true, selector: "yunzai-iframe-page", ngImport: i0, template: `
    @if (hasIframe && iframePageHeight) {
      <div class="yunzai-iframe-page" [style.height]="iframePageHeight">
        <iframe [src]="iframeSafeSrc">
          <p>您的浏览器不支持 iframe 标签。</p>
        </iframe>
      </div>
    } @else {
      <nz-spin nzSpinning="true" />
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-iframe-page`,
                    template: `
    @if (hasIframe && iframePageHeight) {
      <div class="yunzai-iframe-page" [style.height]="iframePageHeight">
        <iframe [src]="iframeSafeSrc">
          <p>您的浏览器不支持 iframe 标签。</p>
        </iframe>
      </div>
    } @else {
      <nz-spin nzSpinning="true" />
    }
  `,
                    standalone: true,
                    imports: [NzSpinModule]
                }]
        }] });

const COMPONENTS = [YunzaiIframePageComponent];
class YunzaiIframePageModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, imports: [NzSpinModule, YunzaiIframePageComponent], exports: [YunzaiIframePageComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, imports: [NzSpinModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiIframePageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzSpinModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { COMPONENTS, YunzaiIframePageComponent, YunzaiIframePageModule };
//# sourceMappingURL=yunzai-iframe-page.mjs.map
