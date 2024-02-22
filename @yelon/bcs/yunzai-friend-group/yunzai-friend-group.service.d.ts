import { Observable } from 'rxjs';
import { YunzaiFriendGroup } from './yunzai-friend-group.types';
import * as i0 from "@angular/core";
export declare class YunzaiFriendGroupService {
    private readonly http;
    groups(): Observable<YunzaiFriendGroup[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiFriendGroupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiFriendGroupService>;
}
