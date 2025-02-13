import { YunzaiConfig, YunzaiConfigKey } from './config.types';
import * as i0 from "@angular/core";
export declare class YunzaiConfigService {
    private readonly config;
    get<T extends YunzaiConfigKey>(componentName: T, key?: string): YunzaiConfig[T];
    merge<T extends YunzaiConfigKey>(componentName: T, ...defaultValues: Array<YunzaiConfig[T]>): YunzaiConfig[T];
    /**
     * 将配置附加到当前实例中，支持 Signal 信号
     */
    attach<T extends YunzaiConfigKey>(componentThis: unknown, componentName: T, defaultValues: YunzaiConfig[T]): void;
    set<T extends YunzaiConfigKey>(componentName: T, value: YunzaiConfig[T]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiConfigService>;
}
