import * as i0 from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as i3 from '@yelon/abc/notice-icon';
import { NoticeItem, NoticeIconSelect } from '@yelon/abc/notice-icon';
import * as i7 from '@yelon/theme';
import { YunzaiI18NType } from '@yelon/theme';
import * as i1 from 'ng-zorro-antd/avatar';
import * as i2 from '@angular/router';
import * as i4 from 'ng-zorro-antd/dropdown';
import * as i5 from '@angular/common';
import * as i6 from 'ng-zorro-antd/icon';

declare class YunzaiHeaderClearStorageComponent {
    private readonly modalSrv;
    private readonly messageSrv;
    _click(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHeaderClearStorageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiHeaderClearStorageComponent, "yunzai-header-clear-storage", never, {}, {}, never, never, true, never>;
}

declare class YunzaiHeaderFullScreenComponent {
    status: boolean;
    _resize(): void;
    _click(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHeaderFullScreenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiHeaderFullScreenComponent, "yunzai-header-fullscreen", never, {}, {}, never, never, true, never>;
}

declare class YunzaiHeaderNotifyComponent implements OnInit, OnDestroy {
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

declare class YunzaiHeaderI18nComponent implements OnInit, OnDestroy {
    private readonly settings;
    private readonly i18n;
    private readonly doc;
    langs: YunzaiI18NType[];
    private destroy$;
    /** Whether to display language text */
    showLangText: boolean;
    get curLangCode(): string;
    ngOnInit(): void;
    change(lang: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHeaderI18nComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiHeaderI18nComponent, "yunzai-header-i18n", never, { "showLangText": { "alias": "showLangText"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_showLangText: unknown;
}

interface UserLink {
    icon: string;
    name: string;
    url: string;
}
declare class YunzaiHeaderUserComponent implements OnInit {
    private readonly msg;
    private readonly tokenService;
    private readonly configService;
    private readonly config;
    private readonly win;
    icon: string;
    username: string;
    menus: UserLink[];
    ngOnInit(): void;
    logout(): void;
    to(href: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHeaderUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiHeaderUserComponent, "yunzai-header-user", never, {}, {}, never, never, true, never>;
}

declare class YunzaiWidgetsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiWidgetsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiWidgetsModule, never, [typeof i1.NzAvatarModule, typeof i2.RouterModule, typeof i3.NoticeIconModule, typeof i4.NzDropDownModule, typeof i5.CommonModule, typeof i6.NzIconModule, typeof i7.I18nPipe, typeof YunzaiHeaderClearStorageComponent, typeof YunzaiHeaderFullScreenComponent, typeof YunzaiHeaderNotifyComponent, typeof YunzaiHeaderI18nComponent, typeof YunzaiHeaderUserComponent], [typeof YunzaiHeaderClearStorageComponent, typeof YunzaiHeaderFullScreenComponent, typeof YunzaiHeaderNotifyComponent, typeof YunzaiHeaderI18nComponent, typeof YunzaiHeaderUserComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiWidgetsModule>;
}

export { YunzaiHeaderClearStorageComponent, YunzaiHeaderFullScreenComponent, YunzaiHeaderI18nComponent, YunzaiHeaderNotifyComponent, YunzaiHeaderUserComponent, YunzaiWidgetsModule };
export type { UserLink };
