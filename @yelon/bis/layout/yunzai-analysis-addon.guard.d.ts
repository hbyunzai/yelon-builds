import { CanActivateChildFn, CanActivateFn } from "@angular/router";
import { PathToRegexpService, YunzaiConfigService } from "@yelon/util";
import { Menu } from "@yelon/theme";
import { ITokenService } from "@yelon/auth";
import * as i0 from "@angular/core";
export declare class YunzaiAnalysisAddonGuardService {
    private configService;
    private pathToRegexp;
    private win;
    private tokenService;
    private bis;
    private menus;
    private links;
    private value;
    constructor(configService: YunzaiConfigService, pathToRegexp: PathToRegexpService, win: any, tokenService: ITokenService);
    process(url: string): boolean;
    getAllLinks(menu: Menu[], links: Array<{
        title: string;
        link: string;
    }>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiAnalysisAddonGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiAnalysisAddonGuardService>;
}
export declare const analysisAddonCanActive: CanActivateFn;
export declare const analysisAddonCanActiveChild: CanActivateChildFn;
