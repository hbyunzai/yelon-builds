import { Injector, OnDestroy, OnInit } from '@angular/core';
import { _HttpClient } from '@yelon/theme';
import { LayoutNavGroupState, YunzaiNavTopic } from '@yelon/util';
import * as i0 from "@angular/core";
export declare class LayoutNavGroupComponent implements OnInit, OnDestroy {
    private inject;
    private http;
    private $destroy;
    state: LayoutNavGroupState;
    constructor(inject: Injector, http: _HttpClient);
    ngOnInit(): void;
    open(topic: YunzaiNavTopic): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutNavGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LayoutNavGroupComponent, "layout-nav-group", never, {}, {}, never, never, false, never>;
}
