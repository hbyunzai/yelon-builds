import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { Observable } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { SettingsService } from '../settings/settings.service';
import * as i0 from "@angular/core";
export declare const HTML_DIR = "dir";
export declare const RTL_DIRECTION = "direction";
export declare const RTL_NZ_COMPONENTS: string[];
export declare const RTL_YELON_COMPONENTS: string[];
export declare const LTR = "ltr";
export declare const RTL = "rtl";
export declare class RTLService {
    private d;
    private srv;
    private nz;
    private yelon;
    private platform;
    private doc;
    private _dir;
    /**
     * Get or Set the current text direction
     *
     * 获取或设置当前文字方向
     */
    get dir(): Direction;
    set dir(value: Direction);
    /**
     * Get the next text direction
     *
     * 获取下一次文字方向
     */
    get nextDir(): Direction;
    /**
     * Subscription change notification
     *
     * 订阅变更通知
     */
    get change(): Observable<Direction>;
    constructor(d: Directionality, srv: SettingsService, nz: NzConfigService, yelon: YunzaiConfigService, platform: Platform, doc: NzSafeAny);
    /**
     * Toggle text direction
     *
     * 切换文字方向
     */
    toggle(): void;
    private updateHtml;
    private updateLibConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RTLService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RTLService>;
}
