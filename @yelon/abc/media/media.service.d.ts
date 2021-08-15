import { Observable } from 'rxjs';
import { YunzaiConfigService, YunzaiMediaConfig } from '@yelon/util/config';
import { LazyService } from '@yelon/util/other';
export declare class MediaService {
    private cogSrv;
    private lazySrv;
    private _cog;
    private loading;
    private loaded;
    private notify$;
    get cog(): YunzaiMediaConfig;
    set cog(val: YunzaiMediaConfig);
    constructor(cogSrv: YunzaiConfigService, lazySrv: LazyService);
    load(): this;
    notify(): Observable<void>;
}
