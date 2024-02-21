import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { YunzaiLayoutModule } from '@yelon/bis/layout';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';

var provide = void 0;

class BisModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: BisModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule], exports: [YunzaiLayoutModule, YunzaiWidgetsModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: BisModule, imports: [YunzaiLayoutModule, YunzaiWidgetsModule, YunzaiLayoutModule, YunzaiWidgetsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: BisModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [YunzaiLayoutModule, YunzaiWidgetsModule],
                    exports: [YunzaiLayoutModule, YunzaiWidgetsModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BisModule };
//# sourceMappingURL=bis.mjs.map
