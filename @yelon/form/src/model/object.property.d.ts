import { Injector } from '@angular/core';
import { YunzaiSFConfig } from '@yelon/util/config';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { PropertyGroup } from './form.property';
import { FormPropertyFactory } from './form.property.factory';
import { SFValue } from '../interface';
import { SFSchema } from '../schema/index';
import { SFUISchema, SFUISchemaItem } from '../schema/ui';
import { SchemaValidatorFactory } from '../validator.factory';
export declare class ObjectProperty extends PropertyGroup {
    private formPropertyFactory;
    private _propertiesId;
    get propertiesId(): string[];
    constructor(injector: Injector, formPropertyFactory: FormPropertyFactory, schemaValidatorFactory: SchemaValidatorFactory, schema: SFSchema, ui: SFUISchema | SFUISchemaItem, formData: NzSafeAny, parent: PropertyGroup | null, path: string, options: YunzaiSFConfig);
    private createProperties;
    setValue(value: SFValue, onlySelf: boolean): void;
    resetValue(value: SFValue, onlySelf: boolean): void;
    _hasValue(): boolean;
    _updateValue(): void;
}
