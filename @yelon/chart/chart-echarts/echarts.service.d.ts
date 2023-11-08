import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { YunzaiChartConfig, YunzaiConfigService } from '@yelon/util/config';
import { LazyService } from '@yelon/util/other';
import * as i0 from "@angular/core";
export declare class ChartEChartsService implements OnDestroy {
    private cogSrv;
    private lazySrv;
    private _cog;
    private loading;
    private loaded;
    private notify$;
    get cog(): YunzaiChartConfig;
    set cog(val: YunzaiChartConfig);
    constructor(cogSrv: YunzaiConfigService, lazySrv: LazyService);
    libLoad(): this;
    get notify(): Observable<void>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChartEChartsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ChartEChartsService>;
}
