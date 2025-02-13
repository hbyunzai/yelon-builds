import { EnvironmentProviders } from '@angular/core';
export interface SFWidgetProvideConfig {
    KEY: string;
    type: any;
}
/**
 * Just only using Standalone widgets
 */
export declare function provideSFConfig(options?: {
    widgets?: SFWidgetProvideConfig[];
}): EnvironmentProviders;
