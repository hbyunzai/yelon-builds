import { OnDestroy, OnInit } from '@angular/core';
import { LayoutNavApplicationState, YunzaiNavTopic } from '@yelon/util';
import * as i0 from "@angular/core";
export declare class YunzaiNavApplicationComponent implements OnInit, OnDestroy {
    private readonly config;
    private readonly http;
    private readonly win;
    private readonly i18n;
    private readonly destroy$;
    state: LayoutNavApplicationState;
    get showAllMenu(): boolean;
    get showMineMenu(): boolean;
    ngOnInit(): void;
    fetchAllTopic(): void;
    attachNav(type: 'all' | 'mine' | 'other', topic?: YunzaiNavTopic): void;
    clearSearch(): void;
    displayAllNav(): void;
    displayMineNav(): void;
    displayOtherNav(topic: YunzaiNavTopic): void;
    diffChange(flag?: boolean): void;
    open(topic: YunzaiNavTopic): void;
    onSearch(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiNavApplicationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiNavApplicationComponent, "yunzai-layout-nav-application", never, {}, {}, never, never, true, never>;
}
