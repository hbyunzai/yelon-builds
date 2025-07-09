import * as i0 from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as i1 from 'ng-zorro-antd/spin';

declare class YunzaiIframePageComponent implements OnInit, OnDestroy {
    private readonly sanitizer;
    private readonly menuService;
    private readonly layoutService;
    iframeSafeSrc?: SafeResourceUrl;
    iframePageHeight?: string;
    hasIframe: boolean;
    resizeHandle: any;
    ngOnInit(): void;
    ngOnDestroy(): void;
    getIframeUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiIframePageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiIframePageComponent, "yunzai-iframe-page", never, {}, {}, never, never, true, never>;
}

declare const COMPONENTS: (typeof YunzaiIframePageComponent)[];
declare class YunzaiIframePageModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiIframePageModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiIframePageModule, never, [typeof i1.NzSpinModule, typeof YunzaiIframePageComponent], [typeof YunzaiIframePageComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiIframePageModule>;
}

export { COMPONENTS, YunzaiIframePageComponent, YunzaiIframePageModule };
