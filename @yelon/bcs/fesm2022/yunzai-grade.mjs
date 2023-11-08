import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i1 from '@yelon/theme';

class YunzaiGradeService {
    constructor(http) {
        this.http = http;
    }
    grades() {
        return this.http.get(`/auth/gradeYear/queryListForPage`).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiGradeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiGradeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiGradeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiGradeService };
//# sourceMappingURL=yunzai-grade.mjs.map
