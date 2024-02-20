import { Observable } from 'rxjs';
import { YunzaiTableUser } from '@yelon/bcs/yunzai-table-user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { YunzaiContactParam } from './yunzai-contact.types';
import * as i0 from "@angular/core";
export declare class YunzaiContactService {
    private modal;
    constructor(modal: NzModalService);
    create(nzOnOk: (users: YunzaiTableUser[]) => Observable<boolean>, param?: YunzaiContactParam): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiContactService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiContactService>;
}
