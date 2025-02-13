import { ComponentRef, ViewContainerRef } from '@angular/core';
import { FormProperty } from './model/form.property';
import { SFUISchemaItem } from './schema/ui';
import type { Widget } from './widget';
import * as i0 from "@angular/core";
export declare class WidgetRegistry {
    private _widgets;
    private defaultWidget;
    get widgets(): Record<string, Widget<FormProperty, SFUISchemaItem>>;
    setDefault(widget: any): void;
    register(type: string, widget: any): void;
    has(type: string): boolean;
    getType(type: string): Widget<FormProperty, SFUISchemaItem>;
}
export declare class WidgetFactory {
    private readonly registry;
    createWidget(container: ViewContainerRef, type: string): ComponentRef<Widget<FormProperty, SFUISchemaItem>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WidgetFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WidgetFactory>;
}
