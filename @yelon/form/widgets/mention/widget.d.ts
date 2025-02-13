import { OnInit } from '@angular/core';
import { ControlUIWidget, SFSchemaEnum } from '@yelon/form';
import { MentionOnSearchTypes } from 'ng-zorro-antd/mention';
import type { SFMentionWidgetSchema } from './schema';
import * as i0 from "@angular/core";
export declare class MentionWidget extends ControlUIWidget<SFMentionWidgetSchema> implements OnInit {
    static readonly KEY = "mention";
    private mentionChild;
    data: SFSchemaEnum[];
    i: any;
    loading: boolean;
    ngOnInit(): void;
    reset(): void;
    _select(options: any): void;
    _search(option: MentionOnSearchTypes): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MentionWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MentionWidget, "sf-mention", never, {}, {}, never, never, true, never>;
}
