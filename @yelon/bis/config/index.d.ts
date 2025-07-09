import { YunzaiBusinessConfig, YunzaiConfigService } from '@yelon/util';

declare const BUSINESS_DEFAULT_CONFIG: YunzaiBusinessConfig;
declare function mergeBisConfig(srv: YunzaiConfigService): YunzaiBusinessConfig;

export { BUSINESS_DEFAULT_CONFIG, mergeBisConfig };
