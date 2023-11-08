import { AfterViewInit, ChangeDetectorRef, QueryList, TemplateRef } from '@angular/core';
import { App, SettingsService } from '@yelon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { LayoutDefaultHeaderItemComponent } from './layout-header-item.component';
import { LayoutDefaultService } from './layout.service';
import { LayoutDefaultHeaderItemDirection, LayoutDefaultHeaderItemHidden, LayoutDefaultOptions } from './types';
import * as i0 from "@angular/core";
interface LayoutDefaultHeaderItem {
    host: TemplateRef<NzSafeAny>;
    hidden?: LayoutDefaultHeaderItemHidden;
    direction?: LayoutDefaultHeaderItemDirection;
}
export declare class LayoutDefaultHeaderComponent implements AfterViewInit {
    private srv;
    private settings;
    private cdr;
    private destroy$;
    items: QueryList<LayoutDefaultHeaderItemComponent>;
    left: LayoutDefaultHeaderItem[];
    middle: LayoutDefaultHeaderItem[];
    right: LayoutDefaultHeaderItem[];
    get opt(): LayoutDefaultOptions;
    get app(): App;
    get collapsed(): boolean;
    get collapsedIcon(): string;
    constructor(srv: LayoutDefaultService, settings: SettingsService, cdr: ChangeDetectorRef);
    private refresh;
    ngAfterViewInit(): void;
    toggleCollapsed(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutDefaultHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LayoutDefaultHeaderComponent, "layout-default-header", never, { "items": { "alias": "items"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
