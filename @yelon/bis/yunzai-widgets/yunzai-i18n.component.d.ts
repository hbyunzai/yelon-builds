import { OnDestroy, OnInit } from '@angular/core';
import { YunzaiI18NType } from '@yelon/theme';
import * as i0 from "@angular/core";
export declare class YunzaiHeaderI18nComponent implements OnInit, OnDestroy {
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
