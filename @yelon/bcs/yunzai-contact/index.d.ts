import { Observable } from 'rxjs';
import * as i11 from '@yelon/bcs/yunzai-table-user';
import { YunzaiTableUserProps, YunzaiTableUser, YunzaiTableUserComponent } from '@yelon/bcs/yunzai-table-user';
import * as i8 from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDeptTreeProps, YunzaiDeptTree } from '@yelon/bcs/yunzai-dept-tree';
import * as i9 from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiDormitoryTreeProps, YunzaiDormitoryTree } from '@yelon/bcs/yunzai-dormitory-tree';
import * as i10 from '@yelon/bcs/yunzai-friend-group';
import { YunzaiFriendGroupProps, YunzaiFriendGroup } from '@yelon/bcs/yunzai-friend-group';
import * as i7 from '@yelon/bcs/yunzai-role-tree';
import { YunzaiRoleTreeProps, YunzaiRoleTree } from '@yelon/bcs/yunzai-role-tree';
import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as i1 from '@angular/forms';
import * as i2 from '@angular/common';
import * as i3 from '@yelon/theme';
import * as i4 from 'ng-zorro-antd/radio';
import * as i5 from 'ng-zorro-antd/grid';
import * as i6 from 'ng-zorro-antd/card';

interface YunzaiContactProps {
    disableDeptTree?: boolean;
    disableRoleTree?: boolean;
    disableDormitoryTree?: boolean;
    disableFriendGroup?: boolean;
    wrap?: boolean;
}
interface YunzaiContactState {
    cursor: 'deptTree' | 'dormitoryTree' | 'roleTree' | 'friendGroup';
}
interface YunzaiContactParam {
    props?: YunzaiContactProps;
    friendGroup?: YunzaiFriendGroupProps;
    tableUser?: YunzaiTableUserProps;
    roleTree?: YunzaiRoleTreeProps;
    dormitoryTree?: YunzaiDormitoryTreeProps;
    deptTree?: YunzaiDeptTreeProps;
}

declare class YunzaiContactService {
    private modal;
    create(nzOnOk: (users: YunzaiTableUser[]) => Observable<boolean>, param?: YunzaiContactParam): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiContactService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiContactService>;
}

declare class YunzaiContactComponent {
    deptTree?: YunzaiDeptTreeProps;
    dormitoryTree?: YunzaiDormitoryTreeProps;
    friendGroup?: YunzaiFriendGroupProps;
    roleTree?: YunzaiRoleTreeProps;
    tableUser?: YunzaiTableUserProps;
    props?: YunzaiContactProps;
    readonly onSelect: EventEmitter<YunzaiTableUser[]>;
    readonly onSelectDept: EventEmitter<YunzaiDeptTree[]>;
    readonly onSelectRole: EventEmitter<YunzaiRoleTree[]>;
    readonly onSelectDormitory: EventEmitter<YunzaiDormitoryTree[]>;
    readonly onSelectGroup: EventEmitter<YunzaiFriendGroup>;
    table: YunzaiTableUserComponent;
    state: YunzaiContactState;
    get tableUserProps(): YunzaiTableUserProps;
    get disableDeptTree(): boolean;
    get disableRoleTree(): boolean;
    get disableDormitoryTree(): boolean;
    get disableFriendGroup(): boolean;
    get isWarp(): boolean;
    onDeptSelect(depts: YunzaiDeptTree[]): void;
    onRoleTreeSelect(roles: YunzaiRoleTree[]): void;
    onDormTreeSelect(dorm: YunzaiDormitoryTree[]): void;
    onFriendSelect(group: YunzaiFriendGroup): void;
    onTableUserChecked(users: YunzaiTableUser[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiContactComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiContactComponent, "yunzai-contact", never, { "deptTree": { "alias": "deptTree"; "required": false; }; "dormitoryTree": { "alias": "dormitoryTree"; "required": false; }; "friendGroup": { "alias": "friendGroup"; "required": false; }; "roleTree": { "alias": "roleTree"; "required": false; }; "tableUser": { "alias": "tableUser"; "required": false; }; "props": { "alias": "props"; "required": false; }; }, { "onSelect": "onSelect"; "onSelectDept": "onSelectDept"; "onSelectRole": "onSelectRole"; "onSelectDormitory": "onSelectDormitory"; "onSelectGroup": "onSelectGroup"; }, never, never, true, never>;
}

declare class YunzaiContactModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiContactModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiContactModule, never, [typeof i1.FormsModule, typeof i2.CommonModule, typeof i3.I18nPipe, typeof i4.NzRadioModule, typeof i5.NzGridModule, typeof i6.NzCardModule, typeof i7.YunzaiRoleTreeModule, typeof i8.YunzaiDeptTreeModule, typeof i9.YunzaiDormitoryTreeModule, typeof i10.YunzaiFriendGroupModule, typeof i11.YunzaiTableUserModule, typeof YunzaiContactComponent], [typeof YunzaiContactComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiContactModule>;
}

export { YunzaiContactComponent, YunzaiContactModule, YunzaiContactService };
export type { YunzaiContactParam, YunzaiContactProps, YunzaiContactState };
