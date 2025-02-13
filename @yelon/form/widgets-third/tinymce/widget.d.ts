import { ControlUIWidget } from '@yelon/form';
import type { TinymceWidgetSchema } from './schema';
import * as i0 from "@angular/core";
export declare class TinymceWidget extends ControlUIWidget<TinymceWidgetSchema> {
    static readonly KEY = "tinymce";
    change(value: string): void;
    _ready(instance: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TinymceWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TinymceWidget, "sf-widget-tinymce", never, {}, {}, never, never, true, never>;
}
