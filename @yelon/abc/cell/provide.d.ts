import { EnvironmentProviders } from '@angular/core';
export interface CellWidgetProvideConfig {
    KEY: string;
    type: any;
}
/**
 * Just only using Standalone widgets
 */
export declare function provideCellWidgets(...widgets: CellWidgetProvideConfig[]): EnvironmentProviders;
