import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
export declare class LayoutDisplayService implements OnDestroy {
    private activatedRoute;
    private displayNav;
    private displayAside;
    private displayReuseTab;
    private $destroy;
    constructor(activatedRoute: ActivatedRoute);
    display(component: 'nav' | 'aside' | 'reuseTab'): void;
    hide(component: 'nav' | 'aside' | 'reuseTab'): void;
    listen(component: 'nav' | 'aside' | 'reuseTab', callback: (display: boolean) => void): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutDisplayService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LayoutDisplayService>;
}
