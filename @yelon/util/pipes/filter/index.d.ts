import * as i0 from '@angular/core';
import { PipeTransform } from '@angular/core';

/**
 * Filter array
 *
 * 过滤数组
 */
declare class FilterPipe implements PipeTransform {
    transform<T>(array: readonly T[], matcher: (item: T, ...args: any[]) => boolean, ...args: any[]): T[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterPipe, "filter", true>;
}

declare class FilterPipeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FilterPipeModule, never, [typeof FilterPipe], [typeof FilterPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FilterPipeModule>;
}

export { FilterPipe, FilterPipeModule };
