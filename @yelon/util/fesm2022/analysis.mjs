import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

class GlobalEventSubjectService {
    constructor() {
        this.clickEvents = new Subject();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GlobalEventSubjectService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GlobalEventSubjectService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GlobalEventSubjectService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { GlobalEventSubjectService };
//# sourceMappingURL=analysis.mjs.map
