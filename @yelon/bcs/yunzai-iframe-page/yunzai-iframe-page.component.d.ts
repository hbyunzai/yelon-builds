import { OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuService } from '@yelon/theme';
import { LayoutDefaultService } from '@yelon/theme/layout-default';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class YunzaiIframePageComponent implements OnInit, OnDestroy {
    private sanitizer;
    private menuSrv;
    private layoutDefaultService;
    iframeSafeSrc: SafeResourceUrl;
    hasIframe: boolean;
    iframePageHeight: string;
    resizeHandle: NzSafeAny;
    constructor(sanitizer: DomSanitizer, menuSrv: MenuService, layoutDefaultService: LayoutDefaultService);
    ngOnInit(): void;
    getIframeUrl(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiIframePageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiIframePageComponent, "yunzai-iframe-page", never, {}, {}, never, never, true, never>;
}
