import { BehaviorSubject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare class LayoutService {
    header: BehaviorSubject<NzSafeAny>;
    sidebar: BehaviorSubject<NzSafeAny>;
    constructor();
    hideSidebar(): void;
    hideHeader(): void;
    showSidebar(): void;
    showHeader(): void;
}
