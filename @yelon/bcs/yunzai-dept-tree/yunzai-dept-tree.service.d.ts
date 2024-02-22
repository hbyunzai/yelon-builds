import { Observable } from 'rxjs';
import { YUNZAI_DEPT_TYPES, YunzaiDeptTree } from './yunzai-dept-tree.types';
import * as i0 from "@angular/core";
export declare class YunzaiDeptTreeService {
    private readonly http;
    /**
     * @param includeClass include class
     * @param history include history class
     */
    tree(includeClass: boolean, history: boolean): Observable<YunzaiDeptTree[]>;
    /**
     * @param includeClass include class
     * @param history include history class
     * @param types dept types
     */
    tree(includeClass: boolean, history: boolean, types?: YUNZAI_DEPT_TYPES[]): Observable<YunzaiDeptTree[]>;
    /**
     * @param includeClass include class
     * @param history include history class
     * @param types dept types
     * @param gradeId gradeId
     */
    tree(includeClass: boolean, history: boolean, types?: YUNZAI_DEPT_TYPES[], gradeId?: string): Observable<YunzaiDeptTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDeptTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiDeptTreeService>;
}
