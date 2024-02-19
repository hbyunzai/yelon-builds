import { Observable } from 'rxjs';
import { YunzaiRoleTree } from './yunzai-role-tree.types';
export declare class YunzaiRoleTreeService {
    private readonly http;
    tree(roleGroupCode?: string): Observable<YunzaiRoleTree[]>;
}
