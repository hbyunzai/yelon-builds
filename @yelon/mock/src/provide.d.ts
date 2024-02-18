import { EnvironmentProviders, InjectionToken } from '@angular/core';
import { MockOptions } from './interface';
export declare const YELON_MOCK_CONFIG: InjectionToken<MockOptions>;
export declare function provideMockConfig(config?: MockOptions): EnvironmentProviders;
