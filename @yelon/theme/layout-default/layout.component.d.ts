import { ElementRef, OnDestroy, OnInit, QueryList, Renderer2, TemplateRef } from '@angular/core';
import { Router, Event } from '@angular/router';
import { SettingsService } from '@yelon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LayoutDefaultHeaderItemComponent } from './layout-header-item.component';
import { LayoutService } from './layout.service';
import { LayoutDefaultOptions } from './types';
import * as i0 from "@angular/core";
export declare class LayoutDefaultComponent implements OnInit, OnDestroy {
    private layoutService;
    private msgSrv;
    private settings;
    private el;
    private renderer;
    private doc;
    headerItems: QueryList<LayoutDefaultHeaderItemComponent>;
    showHeader: boolean;
    showSidebar: boolean;
    options: LayoutDefaultOptions;
    asideUser: TemplateRef<void> | null;
    nav: TemplateRef<void> | null;
    content: TemplateRef<void> | null;
    customError?: string | null;
    private destroy$;
    isFetching: boolean;
    constructor(router: Router, layoutService: LayoutService, msgSrv: NzMessageService, settings: SettingsService, el: ElementRef, renderer: Renderer2, doc: NzSafeAny);
    processEv(ev: Event): void;
    private setClass;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutDefaultComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LayoutDefaultComponent, "layout-default", ["layoutDefault"], { "options": "options"; "asideUser": "asideUser"; "nav": "nav"; "content": "content"; "customError": "customError"; }, {}, ["headerItems"], ["*"]>;
}
