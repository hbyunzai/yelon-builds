import { OnDestroy, OnInit } from '@angular/core';
import { LayoutNavGroupState, YunzaiNavTopic } from '@yelon/util';
import * as i0 from "@angular/core";
export declare class YunzaiLayoutNavGroupComponent implements OnInit, OnDestroy {
    private readonly http;
    private destroy$;
    state: LayoutNavGroupState;
    ngOnInit(): void;
    open(topic: YunzaiNavTopic): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutNavGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutNavGroupComponent, "yunzai-layout-nav-group", never, {}, {}, never, never, true, never>;
}
