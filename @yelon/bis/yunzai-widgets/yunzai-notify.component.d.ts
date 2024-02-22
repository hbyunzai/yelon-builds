import { OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NoticeIconSelect, NoticeItem } from '@yelon/abc/notice-icon';
import * as i0 from "@angular/core";
export declare class YunzaiHeaderNotifyComponent implements OnInit, OnDestroy {
    private readonly i18n;
    private readonly msg;
    private readonly nzI18n;
    private readonly cdr;
    private readonly http;
    private readonly win;
    loading: boolean;
    count: number;
    subs: Subscription[];
    data: NoticeItem[];
    ngOnInit(): void;
    loadData(): void;
    loadMessage(): Observable<void>;
    loadTodo(): Observable<void>;
    clear(type: string): void;
    select(res: NoticeIconSelect): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHeaderNotifyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiHeaderNotifyComponent, "yunzai-header-notify", never, {}, {}, never, never, true, never>;
}
