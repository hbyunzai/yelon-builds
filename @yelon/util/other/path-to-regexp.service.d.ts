import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class PathToRegexpService {
    constructor();
    DEFAULT_DELIMITER: string;
    PATH_REGEXP: RegExp;
    parse(str: NzSafeAny, options: NzSafeAny): (string | {
        name: string | number;
        prefix: string;
        delimiter: any;
        optional: boolean;
        repeat: boolean;
        pattern: any;
    })[];
    compile(str: NzSafeAny, options: NzSafeAny): (data: NzSafeAny, options: NzSafeAny) => string;
    tokensToFunction(tokens: NzSafeAny, options: NzSafeAny): (data: NzSafeAny, options: NzSafeAny) => string;
    escapeString(str: NzSafeAny): any;
    escapeGroup(group: NzSafeAny): any;
    flags(options: NzSafeAny): "" | "i";
    regexpToRegexp(path: NzSafeAny, keys: NzSafeAny): any;
    arrayToRegexp(path: NzSafeAny, keys: NzSafeAny, options: NzSafeAny): RegExp;
    stringToRegexp(path: NzSafeAny, keys: NzSafeAny, options: NzSafeAny): RegExp;
    tokensToRegExp(tokens: NzSafeAny, keys: NzSafeAny, options: NzSafeAny): RegExp;
    pathToRegexp(path: NzSafeAny, keys: NzSafeAny, options: NzSafeAny): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PathToRegexpService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PathToRegexpService>;
}
