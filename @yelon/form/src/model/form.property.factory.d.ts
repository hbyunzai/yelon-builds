import { Injector } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import { SFSchema } from '../schema/index';
import { SFUISchema, SFUISchemaItem } from '../schema/ui';
import { SchemaValidatorFactory } from '../validator.factory';
import { FormProperty, PropertyGroup } from './form.property';
export declare class FormPropertyFactory {
    private injector;
    private schemaValidatorFactory;
    private options;
    constructor(injector: Injector, schemaValidatorFactory: SchemaValidatorFactory, cogSrv: YunzaiConfigService);
    createProperty(schema: SFSchema, ui: SFUISchema | SFUISchemaItem, formData: Record<string, unknown>, parent?: PropertyGroup | null, propertyId?: string): FormProperty;
    private initializeRoot;
}
