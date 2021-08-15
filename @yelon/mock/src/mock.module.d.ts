import { ModuleWithProviders } from '@angular/core';
import { MockOptions } from './interface';
export declare class YelonMockModule {
    static forRoot(options?: MockOptions): ModuleWithProviders<YelonMockModule>;
    static forChild(): ModuleWithProviders<YelonMockModule>;
}
