import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Filter array
 *
 * 过滤数组
 */
export declare class FilterPipe implements PipeTransform {
    transform<T>(array: readonly T[], matcher: (item: T, ...args: any[]) => boolean, ...args: any[]): T[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterPipe, "filter", true>;
}
