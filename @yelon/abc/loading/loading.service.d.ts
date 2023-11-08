import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { OnDestroy } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import { LoadingDefaultComponent } from './loading.component';
import { LoadingShowOptions } from './loading.types';
import * as i0 from "@angular/core";
export declare class LoadingService implements OnDestroy {
    private overlay;
    private configSrv;
    private directionality;
    private _overlayRef?;
    private compRef;
    private opt;
    private cog;
    private n$;
    private loading$;
    get instance(): LoadingDefaultComponent | null;
    constructor(overlay: Overlay, configSrv: YunzaiConfigService, directionality: Directionality);
    private create;
    /**
     * Open a new loading indicator
     *
     * 打开一个新加载指示符
     */
    open(options?: LoadingShowOptions): void;
    private _close;
    /**
     * Turn off a loading indicator
     *
     * 关闭一个加载指示符
     */
    close(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoadingService>;
}
