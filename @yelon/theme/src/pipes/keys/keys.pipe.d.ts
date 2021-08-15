import { PipeTransform } from '@angular/core';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
/**
 * [Document](https://ng.yunzainfo.com/theme/keys)
 */
export declare class KeysPipe implements PipeTransform {
    transform(value: NzSafeAny, keyIsNumber?: boolean): NzSafeAny[];
}
