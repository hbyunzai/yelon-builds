import { Observable } from 'rxjs';
import { YunzaiMediaConfig } from '@yelon/util/config';
import * as i0 from "@angular/core";
export declare class MediaService {
    private readonly cogSrv;
    private readonly lazySrv;
    private _cog;
    private loading;
    private loaded;
    private notify$;
    get cog(): YunzaiMediaConfig;
    set cog(val: YunzaiMediaConfig);
    load(): this;
    notify(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MediaService>;
}
