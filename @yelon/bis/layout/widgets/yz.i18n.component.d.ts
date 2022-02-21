import { SettingsService } from '@yelon/theme';
import { BooleanInput } from '@yelon/util/decorator';
import { YzI18NService } from '../yz.i18n.service';
import * as i0 from "@angular/core";
export declare class YzHeaderI18NComponent {
    private settings;
    private i18n;
    private doc;
    static ngAcceptInputType_showLangText: BooleanInput;
    /** Whether to display language text */
    showLangText: boolean;
    get langs(): Array<{
        code: string;
        text: string;
        abbr: string;
    }>;
    get curLangCode(): string;
    constructor(settings: SettingsService, i18n: YzI18NService, doc: any);
    change(lang: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YzHeaderI18NComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YzHeaderI18NComponent, "yz-header-i18n", never, { "showLangText": "showLangText"; }, {}, never, never>;
}
