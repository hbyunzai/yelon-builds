import { Directionality } from '@angular/cdk/bidi';
import { ApplicationRef, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { YelonLocaleService } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { OnboardingConfig } from './onboarding.types';
import * as i0 from "@angular/core";
export declare class OnboardingService implements OnDestroy {
    private i18n;
    private appRef;
    private resolver;
    private router;
    private injector;
    private doc;
    private configSrv;
    private directionality;
    private compRef;
    private op$;
    private config;
    private active;
    private running$;
    private _running;
    private type;
    private _getDoc;
    /**
     * Get whether it is booting
     *
     * 获取是否正在引导中
     */
    get running(): boolean;
    constructor(i18n: YelonLocaleService, appRef: ApplicationRef, resolver: ComponentFactoryResolver, router: Router, injector: Injector, doc: NzSafeAny, configSrv: YunzaiConfigService, directionality: Directionality);
    private attach;
    private cancelRunning;
    private updateRunning;
    private destroy;
    private showItem;
    /**
     * Start a new user guidance
     *
     * 开启新的用户引导流程
     */
    start(config: OnboardingConfig): void;
    /**
     * Next
     *
     * 下一步
     */
    next(): void;
    /**
     * Prev
     *
     * 上一步
     */
    prev(): void;
    /**
     * Done
     *
     * 完成
     */
    done(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OnboardingService, [null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OnboardingService>;
}
