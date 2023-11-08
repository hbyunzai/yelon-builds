import { Observable } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import { YunzaiFriendGroup } from './yunzai-friend-group.types';
import * as i0 from "@angular/core";
export declare class YunzaiFriendGroupService {
    private http;
    constructor(http: _HttpClient);
    groups(): Observable<YunzaiFriendGroup[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiFriendGroupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiFriendGroupService>;
}
