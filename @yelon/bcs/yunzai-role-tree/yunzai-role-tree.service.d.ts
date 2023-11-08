import { Observable } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { YunzaiRoleTree } from './yunzai-role-tree.types';
import * as i0 from "@angular/core";
export declare class YunzaiRoleTreeService {
    private http;
    constructor(http: _HttpClient);
    tree(roleGroupCode?: string): Observable<YunzaiRoleTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiRoleTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiRoleTreeService>;
}
