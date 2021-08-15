import { NgZone } from '@angular/core';
import Ajv from 'ajv';
import { YunzaiConfigService, YunzaiSFConfig } from '@yelon/util/config';
import { ErrorData } from './errors';
import { SFValue } from './interface';
import { SFSchema } from './schema';
export declare abstract class SchemaValidatorFactory {
    abstract createValidatorFn(schema: SFSchema, extraOptions: {
        ingoreKeywords: string[];
        debug: boolean;
    }): (value: SFValue) => ErrorData[];
}
export declare class AjvSchemaValidatorFactory extends SchemaValidatorFactory {
    private ngZone;
    protected ajv: Ajv;
    protected options: YunzaiSFConfig;
    constructor(cogSrv: YunzaiConfigService, ngZone: NgZone);
    createValidatorFn(schema: SFSchema, extraOptions: {
        ingoreKeywords: string[];
        debug: boolean;
    }): (value: SFValue) => ErrorData[];
}
