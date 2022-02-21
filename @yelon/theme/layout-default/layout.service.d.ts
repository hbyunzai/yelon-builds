import { BehaviorSubject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class LayoutService {
    header: BehaviorSubject<NzSafeAny>;
    sidebar: BehaviorSubject<NzSafeAny>;
    reuseTab: BehaviorSubject<NzSafeAny>;
    constructor();
    hideSidebar(): void;
    hideHeader(): void;
    showSidebar(): void;
    showHeader(): void;
    showReuseTab(): void;
    hideReuseTab(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LayoutService>;
}
