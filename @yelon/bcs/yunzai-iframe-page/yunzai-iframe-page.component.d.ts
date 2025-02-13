import { OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class YunzaiIframePageComponent implements OnInit, OnDestroy {
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
