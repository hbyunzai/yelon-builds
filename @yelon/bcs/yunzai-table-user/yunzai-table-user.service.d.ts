import { Observable } from 'rxjs';
import { Page, YunzaiPageResponse } from '@yelon/util';
import { YunzaiTableUser, YunzaiTableUserParam } from './yunzai-table-user.types';
export declare class YunzaiTableUserService {
    private readonly http;
    users(page: Page<YunzaiTableUserParam>): Observable<YunzaiPageResponse<YunzaiTableUser>>;
    usersByIds(ids: string[]): Observable<YunzaiTableUser[]>;
}
