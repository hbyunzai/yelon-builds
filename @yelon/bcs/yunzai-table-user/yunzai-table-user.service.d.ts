import { Observable } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { Page, YunzaiPageResponse } from '@yelon/util';
import { YunzaiTableUser, YunzaiTableUserParam } from './yunzai-table-user.types';
import * as i0 from "@angular/core";
export declare class YunzaiTableUserService {
    private http;
    constructor(http: _HttpClient);
    users(page: Page<YunzaiTableUserParam>): Observable<YunzaiPageResponse<YunzaiTableUser>>;
    usersByIds(ids: string[]): Observable<YunzaiTableUser[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiTableUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiTableUserService>;
}
