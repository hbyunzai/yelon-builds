import { SFTagWidgetSchema } from './schema';
import { SFValue } from '../../interface';
import { SFSchemaEnum } from '../../schema';
import { ControlUIWidget } from '../../widget';
import * as i0 from "@angular/core";
export declare class TagWidget extends ControlUIWidget<SFTagWidgetSchema> {
    data: SFSchemaEnum[];
    reset(value: SFValue): void;
    onChange(item: SFSchemaEnum): void;
    _close(e: MouseEvent): void;
    private updateValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TagWidget, "sf-tag", never, {}, {}, never, never, false, never>;
}
