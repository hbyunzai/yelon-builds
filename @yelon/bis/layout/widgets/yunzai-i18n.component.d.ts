import { OnDestroy } from '@angular/core';
import { SettingsService, YunzaiI18NType } from '@yelon/theme';
import { YunzaiI18NService } from "../yunzai-i18n.service";
import { BooleanInput } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export declare class YunzaiI18NComponent implements OnDestroy {
    private settings;
    private i18n;
    private doc;
    static ngAcceptInputType_showLangText: BooleanInput;
    /** Whether to display language text */
    showLangText: boolean;
    private $destroy;
    langs: YunzaiI18NType[];
    get curLangCode(): string;
    constructor(settings: SettingsService, i18n: YunzaiI18NService, doc: any);
    change(lang: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiI18NComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiI18NComponent, "yunzai-i18n", never, { "showLangText": { "alias": "showLangText"; "required": false; }; }, {}, never, never, false, never>;
}
