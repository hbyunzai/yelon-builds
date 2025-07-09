import * as i0 from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import * as i1 from 'ng-zorro-antd/spin';
import * as i2 from 'ng-zorro-antd/card';
import * as i3 from '@angular/common';
import * as i4 from 'ng-zorro-antd/empty';
import * as i5 from '@yelon/form';
import { SFSchema, SFComponent } from '@yelon/form';
import * as i6 from 'ng-zorro-antd/list';
import { YunzaiTableUser } from '@yelon/bcs/yunzai-table-user';
import { Observable } from 'rxjs';

interface YunzaiFriendGroup {
    id: string;
    name: string;
    userAccount: string;
    data?: YunzaiTableUser[];
}
interface YunzaiFriendGroupState {
    loading: boolean;
    schema: SFSchema;
    data: YunzaiFriendGroup[];
    dataBackup: YunzaiFriendGroup[];
}
interface YunzaiFriendGroupProps {
    wrap?: boolean;
    data?: YunzaiFriendGroup[];
}

declare class YunzaiFriendGroupComponent implements OnInit, OnDestroy, AfterViewInit {
    props?: YunzaiFriendGroupProps;
    readonly onQueryComplete: EventEmitter<YunzaiFriendGroup[]>;
    readonly onSelect: EventEmitter<YunzaiFriendGroup>;
    sf: SFComponent;
    private readonly $destroy;
    private readonly service;
    state: YunzaiFriendGroupState;
    get isWrapped(): boolean;
    get data(): YunzaiFriendGroup[];
    ngOnInit(): void;
    ngAfterViewInit(): void;
    hookFormChange(): void;
    onItemClick(item: YunzaiFriendGroup): void;
    query(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiFriendGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiFriendGroupComponent, "yunzai-friend-group", never, { "props": { "alias": "props"; "required": false; }; }, { "onQueryComplete": "onQueryComplete"; "onSelect": "onSelect"; }, never, never, true, never>;
}

declare class YunzaiFriendGroupModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiFriendGroupModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiFriendGroupModule, never, [typeof i1.NzSpinModule, typeof i2.NzCardModule, typeof i3.CommonModule, typeof i4.NzEmptyModule, typeof i5.YelonFormModule, typeof i6.NzListModule, typeof YunzaiFriendGroupComponent], [typeof YunzaiFriendGroupComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiFriendGroupModule>;
}

declare const defaultSchema: SFSchema;

declare class YunzaiFriendGroupService {
    private readonly http;
    groups(): Observable<YunzaiFriendGroup[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiFriendGroupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiFriendGroupService>;
}

export { YunzaiFriendGroupComponent, YunzaiFriendGroupModule, YunzaiFriendGroupService, defaultSchema };
export type { YunzaiFriendGroup, YunzaiFriendGroupProps, YunzaiFriendGroupState };
