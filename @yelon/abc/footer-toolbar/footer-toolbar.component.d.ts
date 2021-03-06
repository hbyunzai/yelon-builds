import { ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BooleanInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class FooterToolbarComponent implements OnInit, OnDestroy {
    private el;
    private renderer;
    private doc;
    static ngAcceptInputType_errorCollect: BooleanInput;
    errorCollect: boolean;
    extra?: string | TemplateRef<void>;
    constructor(el: ElementRef, renderer: Renderer2, doc: NzSafeAny);
    private get bodyCls();
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FooterToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FooterToolbarComponent, "footer-toolbar", ["footerToolbar"], { "errorCollect": "errorCollect"; "extra": "extra"; }, {}, never, ["*"]>;
}
