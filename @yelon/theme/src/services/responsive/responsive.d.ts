import { YunzaiConfigService } from '@yelon/util/config';
import * as i0 from "@angular/core";
export declare const REP_MAX = 6;
export declare type REP_TYPE = 1 | 2 | 3 | 4 | 5 | 6;
export declare class ResponsiveService {
    private cog;
    constructor(cogSrv: YunzaiConfigService);
    genCls(count: number): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ResponsiveService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResponsiveService>;
}
