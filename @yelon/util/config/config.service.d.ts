import { YunzaiConfig, YunzaiConfigKey } from './config.types';
import * as i0 from "@angular/core";
export declare class YunzaiConfigService {
    private config;
    constructor(defaultConfig?: YunzaiConfig);
    get<T extends YunzaiConfigKey>(componentName: T, key?: string): YunzaiConfig[T];
    merge<T extends YunzaiConfigKey>(componentName: T, ...defaultValues: Array<YunzaiConfig[T]>): YunzaiConfig[T];
    attach<T extends YunzaiConfigKey>(componentThis: unknown, componentName: T, defaultValues: YunzaiConfig[T]): void;
    attachKey<T extends YunzaiConfigKey>(componentThis: unknown, componentName: T, key: string): void;
    set<T extends YunzaiConfigKey>(componentName: T, value: YunzaiConfig[T]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiConfigService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiConfigService>;
}
