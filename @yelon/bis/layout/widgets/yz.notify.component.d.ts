import { ChangeDetectorRef, Injector, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NoticeIconSelect, NoticeItem } from '@yelon/abc/notice-icon';
import { _HttpClient } from '@yelon/theme';
export declare class YzHeaderNotifyComponent implements OnInit, OnDestroy {
    private injector;
    private msg;
    private nzI18n;
    private cdr;
    private httpClient;
    data: NoticeItem[];
    loading: boolean;
    count: number;
    subs: Subscription[];
    constructor(injector: Injector, msg: NzMessageService, nzI18n: NzI18nService, cdr: ChangeDetectorRef, httpClient: _HttpClient);
    ngOnInit(): void;
    loadData(): void;
    loadMessage(): Observable<void>;
    loadTodo(): Observable<void>;
    clear(type: string): void;
    select(res: NoticeIconSelect): void;
    ngOnDestroy(): void;
}
