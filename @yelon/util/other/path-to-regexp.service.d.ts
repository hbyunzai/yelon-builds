import * as i0 from "@angular/core";
export declare class PathToRegexpService {
    constructor();
    DEFAULT_DELIMITER: string;
    PATH_REGEXP: RegExp;
    parse(str: any, options: any): (string | {
        name: string | number;
        prefix: string;
        delimiter: any;
        optional: boolean;
        repeat: boolean;
        pattern: any;
    })[];
    compile(str: any, options: any): (data: any, options: any) => string;
    tokensToFunction(tokens: any, options: any): (data: any, options: any) => string;
    escapeString(str: any): any;
    escapeGroup(group: any): any;
    flags(options: any): "" | "i";
    regexpToRegexp(path: any, keys: any): any;
    arrayToRegexp(path: any, keys: any, options: any): RegExp;
    stringToRegexp(path: any, keys: any, options: any): RegExp;
    tokensToRegExp(tokens: any, keys: any, options: any): RegExp;
    pathToRegexp(path: any, keys: any, options: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PathToRegexpService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PathToRegexpService>;
}
