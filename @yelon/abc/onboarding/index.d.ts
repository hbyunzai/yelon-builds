import * as i0 from '@angular/core';
import { TemplateRef, OnDestroy, AfterViewInit, EventEmitter, InjectionToken } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Direction } from '@angular/cdk/bidi';
import * as i1 from '@angular/common';
import * as i2 from '@yelon/theme';
import * as i3 from 'ng-zorro-antd/popover';
import * as i4 from 'ng-zorro-antd/core/outlet';
import * as i5 from 'ng-zorro-antd/button';
import * as i6 from 'ng-zorro-antd/core/no-animation';

type OnboardingOpType = 'next' | 'prev' | 'skip' | 'done';
interface OnboardingConfig {
    /**
     * Storage identification Key, The default is `localStorage` local storage, allowing the use of `ONBOARDING_STORE_TOKEN` to change the storage method
     */
    key?: string;
    /**
     * Current version
     */
    keyVersion?: unknown;
    /**
     * Onboarding items
     */
    items?: OnboardingItem[];
    /**
     * Whether to show mask or not, Default: `true`
     */
    mask?: boolean;
    /**
     * Clicking on the mask (area outside the onboarding) to close the onboarding or not, Default: `true`
     */
    maskClosable?: boolean;
    /**
     * Whether to show total, Default: `true`
     */
    showTotal?: boolean;
}
interface OnboardingItem {
    /**
     * The CSS selector, which identifies the html element you want to describe
     */
    selectors: string;
    /**
     * Positioning of the selector element, relative to the contents of the children, Default: `bottomLeft`
     */
    position?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    /**
     * Class name of the panel
     */
    className?: string;
    /**
     * Light style
     */
    lightStyle?: string;
    /**
     * Width of the panel
     */
    width?: number;
    /**
     * Title text of the panel
     */
    title?: string | TemplateRef<void>;
    /**
     * Content text of the panel
     */
    content?: string | SafeHtml | TemplateRef<void>;
    /**
     * Skip button of the panel
     * - `null` Don't show
     */
    skip?: string | TemplateRef<void> | null;
    /**
     * Prev button of the panel
     * - `null` Don't show
     */
    prev?: string | TemplateRef<void> | null;
    /**
     * Next button of the panel
     * - `null` Don't show
     */
    next?: string | TemplateRef<void> | null;
    /**
     * Done button of the panel
     * - `null` Don't show
     */
    done?: string | TemplateRef<void> | null;
    /**
     * Target router url
     */
    url?: string;
    /**
     * Callback before entering, triggered when call `next` operates
     * - `number` indicate delay
     */
    before?: Observable<any> | number;
    /**
     * Callback after entering, triggered when call `prev` operates
     * - `number` indicate delay
     */
    after?: Observable<any> | number;
}

declare class OnboardingService implements OnDestroy {
    private readonly appRef;
    private readonly router;
    private readonly doc;
    private readonly configSrv;
    private readonly keyStoreSrv;
    private readonly directionality;
    private compRef;
    private op$;
    private config?;
    private active;
    private running$;
    private _running;
    private type;
    private locale;
    private _getDoc;
    /**
     * Get whether it is booting
     *
     * 获取是否正在引导中
     */
    get running(): boolean;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<OnboardingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OnboardingService>;
}

declare class OnboardingComponent implements OnDestroy, AfterViewInit {
    private readonly el;
    private readonly platform;
    private readonly cdr;
    private readonly doc;
    private time;
    private prevSelectorEl?;
    config: OnboardingConfig;
    item: OnboardingItem;
    active: number;
    max: number;
    readonly op: EventEmitter<OnboardingOpType>;
    running: boolean;
    dir: Direction;
    private popover;
    get first(): boolean;
    get last(): boolean;
    private _getDoc;
    private _getWin;
    private getLightData;
    ngAfterViewInit(): void;
    private scroll;
    updateRunning(status: boolean): void;
    private updatePosition;
    private updatePrevElStatus;
    to(type: OnboardingOpType): void;
    handleMask(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OnboardingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OnboardingComponent, "onboarding", never, {}, {}, never, never, true, never>;
}

interface OnBoardingKeyStore {
    get(key: string): unknown;
    set(key: string, version: unknown): void;
}
declare const ONBOARDING_STORE_TOKEN: InjectionToken<OnBoardingKeyStore>;
declare function ONBOARDING_STORE_TOKEN_FACTORY(): OnBoardingKeyStore;
declare class LocalStorageStore implements OnBoardingKeyStore {
    get(key: string): unknown;
    set(key: string, version: unknown): void;
}

declare class OnboardingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OnboardingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OnboardingModule, never, [typeof i1.CommonModule, typeof i2.YelonLocaleModule, typeof i3.NzPopoverModule, typeof i4.NzOutletModule, typeof i5.NzButtonModule, typeof i6.NzNoAnimationModule, typeof OnboardingComponent], [typeof OnboardingComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OnboardingModule>;
}

export { LocalStorageStore, ONBOARDING_STORE_TOKEN, ONBOARDING_STORE_TOKEN_FACTORY, OnboardingComponent, OnboardingModule, OnboardingService };
export type { OnBoardingKeyStore, OnboardingConfig, OnboardingItem, OnboardingOpType };
