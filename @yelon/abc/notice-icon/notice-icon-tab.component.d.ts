import { EventEmitter } from '@angular/core';
import { LocaleData } from '@yelon/theme';
import { NoticeIconSelect, NoticeItem } from './notice-icon.types';
import * as i0 from "@angular/core";
export declare class NoticeIconTabComponent {
    locale: LocaleData;
    data: NoticeItem;
    readonly select: EventEmitter<NoticeIconSelect>;
    readonly clear: EventEmitter<string>;
    onClick(item: NoticeItem): void;
    onClear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NoticeIconTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NoticeIconTabComponent, "notice-icon-tab", ["noticeIconTab"], { "locale": { "alias": "locale"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "select": "select"; "clear": "clear"; }, never, never, false, never>;
}
