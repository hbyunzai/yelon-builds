import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Menu } from '@yelon/theme';
import { YunzaiConfigService, PathToRegexpService } from '@yelon/util';
import * as i0 from "@angular/core";
export declare class ActGuardService {
    private configService;
    private pathToRegexp;
    private router;
    private bis;
    private menus;
    private links;
    constructor(configService: YunzaiConfigService, pathToRegexp: PathToRegexpService, router: Router);
    process(url: string): boolean;
    preHandle(url: string): boolean;
    getAllLinks(menu: Menu[], links: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActGuardService>;
}
export declare const actGuardCanActive: CanActivateFn;
export declare const actGuardCanActiveChild: CanActivateChildFn;
