import { Observable } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { YunzaiDormitoryTree, YunzaiDormitoryTreeParam } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
export declare class YunzaiDormitoryTreeService {
    private http;
    constructor(http: _HttpClient);
    tree(param?: YunzaiDormitoryTreeParam): Observable<YunzaiDormitoryTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDormitoryTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiDormitoryTreeService>;
}
