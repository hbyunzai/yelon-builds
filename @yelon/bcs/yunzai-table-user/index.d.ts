import * as i3 from '@yelon/abc/st';
import { STColumn, STData, STComponent } from '@yelon/abc/st';
import * as i2 from '@yelon/form';
import { SFSchema, SFComponent, SFValue } from '@yelon/form';
import { Observable } from 'rxjs';
import { Page, YunzaiPageResponse } from '@yelon/util';
import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import * as i1 from '@angular/common';
import * as i4 from '@yelon/theme';
import * as i5 from 'ng-zorro-antd/checkbox';
import * as i6 from 'ng-zorro-antd/divider';
import * as i7 from 'ng-zorro-antd/button';
import * as i8 from 'ng-zorro-antd/empty';
import * as i9 from 'ng-zorro-antd/icon';
import * as i10 from 'ng-zorro-antd/menu';
import * as i11 from 'ng-zorro-antd/card';

interface YunzaiTableUser {
    userId: string;
    account: string;
    realName: string;
    userType: number;
    userCode: string;
    sex: number;
    email: string | null;
    mobile: string;
    officePhone: string | null;
    readNumber: number | null;
    status: number;
    displayIndex: number;
    idCard: string;
    lastDate: string;
    operUser: string | null;
    lastLoginTime: string;
    remark: string | null;
    errorCount: number;
    question: string | null;
    answer: string | null;
    theme: string | null;
    roles: YunzaiTableUserRole[];
    roleIdList: string[] | null;
    dept: YunzaiTableUserDept;
    deptId: string;
    isDelete: number;
    avatarId: string | null;
    bgimgId: string | null;
    profile: string;
    passwordStrength: string | null;
    lastLoginIp: string;
}
interface YunzaiTableUserRole {
    createdDate: string;
    id: string;
    roleName: string;
    roleValue: string;
    status: number;
    roleDesc: string | null;
    displayIndex: number | null;
    landingPageUrl: string | null;
    roleGroups: any;
    thisDepartment: boolean;
    onlyOne: boolean;
    onlyDeptOne: boolean;
    systemFlag: number | null;
}
interface YunzaiTableUserDept {
    createdDate: string;
    deptId: string;
    deptName: string;
    deptType: string;
    deptComment: string | null;
    leaf: any;
    displayIndex: number;
    deptCode: string;
    status: number;
    deptLevel: any;
    children: YunzaiTableUserDept[];
    pid: string | null;
    expand: boolean;
}
interface YunzaiTableUserParam {
    buildId?: string;
    deptId?: string;
    floor?: string;
    friendGroupId?: string;
    idCard?: string;
    realName?: string;
    roleId?: string;
    roomId?: string;
    userCode?: string;
    userTypes?: number;
}
interface YunzaiTableUserProps {
    wrap?: boolean;
    userIds?: string[];
    data?: YunzaiTableUser[];
    filteredColumns?: string[];
    customColumns?: STColumn[];
    additionalColumns?: STColumn[];
    page?: any;
    list?: boolean;
    scroll?: {
        x?: string | null;
        y?: string | null;
    };
    check?: {
        disable?: boolean;
        data?: YunzaiTableUser[];
        pageCheck?: boolean;
    };
}
interface YunzaiTableUserState {
    data: YunzaiTableUser[] | string;
    dataBackup: YunzaiTableUser[] | string;
    columns: STColumn[];
    page: any;
    schema: SFSchema;
    check: {
        data: STData[];
    };
}

declare class YunzaiTableUserService {
    private readonly http;
    users(page: Page<YunzaiTableUserParam>): Observable<YunzaiPageResponse<YunzaiTableUser>>;
    usersByIds(ids: string[]): Observable<YunzaiTableUser[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiTableUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiTableUserService>;
}

declare class YunzaiTableUserComponent implements OnInit, AfterViewInit {
    st: STComponent;
    sf: SFComponent;
    props?: YunzaiTableUserProps;
    readonly onChecked: EventEmitter<YunzaiTableUser[]>;
    private readonly service;
    private $destroy;
    state: YunzaiTableUserState;
    get wrapped(): boolean;
    get schema(): SFSchema;
    get disableCheck(): boolean;
    get pageCheck(): boolean;
    get hasCheck(): boolean;
    get list(): boolean;
    get checked(): YunzaiTableUser[];
    get scroll(): {
        x?: string | null;
        y?: string | null;
    };
    get inSearch(): boolean;
    get userIds(): string[];
    ngOnInit(): void;
    ngAfterViewInit(): void;
    setupPropsToState(): void;
    setupTable(): void;
    setupPropsData(): void;
    setupPropsPage(): void;
    setupPropsColumns(): void;
    setupPropsFilteredColumns(): void;
    setupPropsCustomColumns(): void;
    setupPropsChecked(): void;
    setupTableData(): void;
    setupTablePage(): void;
    setupTableColumn(): void;
    setupTableRequest(): void;
    setupTableResponse(): void;
    resetChecked(): void;
    onCheckedItem(data: YunzaiTableUser): void;
    onCheckedAll(e: any): void;
    isChecked(data: STData): boolean;
    isAllChecked(): boolean;
    isArraySubset(subset: any[], superset: any[]): boolean;
    renderRoles(roles: YunzaiTableUserRole[]): string;
    unCheck(user: YunzaiTableUser): void;
    unCheckAll(): void;
    hookSearch(): void;
    onSearch(value?: SFValue): void;
    onReset(): void;
    onQuery(): void;
    setTableParam(param: YunzaiTableUserParam): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiTableUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiTableUserComponent, "yunzai-table-user", never, { "props": { "alias": "props"; "required": false; }; }, { "onChecked": "onChecked"; }, never, never, true, never>;
}

declare const COMPONENTS: (typeof YunzaiTableUserComponent)[];
declare class YunzaiTableUserModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiTableUserModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiTableUserModule, never, [typeof i1.CommonModule, typeof i2.YelonFormModule, typeof i3.STModule, typeof i4.I18nPipe, typeof i5.NzCheckboxModule, typeof i6.NzDividerModule, typeof i7.NzButtonModule, typeof i8.NzEmptyModule, typeof i9.NzIconModule, typeof i10.NzMenuModule, typeof i11.NzCardModule, typeof YunzaiTableUserComponent], [typeof YunzaiTableUserComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiTableUserModule>;
}

export { COMPONENTS, YunzaiTableUserComponent, YunzaiTableUserModule, YunzaiTableUserService };
export type { YunzaiTableUser, YunzaiTableUserDept, YunzaiTableUserParam, YunzaiTableUserProps, YunzaiTableUserRole, YunzaiTableUserState };
