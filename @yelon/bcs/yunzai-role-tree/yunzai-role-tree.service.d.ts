import { Observable } from 'rxjs';
import { YunzaiRoleTree } from './yunzai-role-tree.types';
import * as i0 from "@angular/core";
export declare class YunzaiRoleTreeService {
    private readonly http;
    tree(roleGroupCode?: string): Observable<YunzaiRoleTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiRoleTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiRoleTreeService>;
}
