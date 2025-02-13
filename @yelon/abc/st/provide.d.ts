import { EnvironmentProviders } from '@angular/core';
export interface STWidgetProvideConfig {
    KEY: string;
    type: any;
}
/**
 * Just only using Standalone widgets
 */
export declare function provideSTWidgets(...widgets: STWidgetProvideConfig[]): EnvironmentProviders;
