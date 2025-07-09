import * as i2 from '@yelon/form';
import { SFSchema, SFComponent } from '@yelon/form';
import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import * as i1 from 'ng-zorro-antd/spin';
import * as i3 from 'ng-zorro-antd/button';
import * as i4 from 'ng-zorro-antd/icon';
import * as i5 from 'ng-zorro-antd/empty';
import * as i6 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import * as i7 from '@angular/common';
import * as i8 from 'ng-zorro-antd/card';
import { Observable } from 'rxjs';

interface YunzaiRoleTreeState {
    loading: boolean;
    schema: SFSchema;
    data: YunzaiRoleTree[];
    dataBackup: YunzaiRoleTree[];
    expandKeys: string[];
}
interface YunzaiRoleTreeProps {
    wrap?: boolean;
    expand?: boolean;
    multiple?: boolean;
    roleGroupCode?: string;
    data?: YunzaiRoleTree[];
}
interface YunzaiRoleTree {
    children: YunzaiRoleTree[];
    code: string;
    key: string;
    leaf: boolean;
    title: string;
    type: string;
}

declare class YunzaiRoleTreeComponent implements OnInit, AfterViewInit, OnDestroy {
    sf: SFComponent;
    props?: YunzaiRoleTreeProps;
    readonly onQueryComplete: EventEmitter<YunzaiRoleTree[]>;
    readonly onSelect: EventEmitter<YunzaiRoleTree[]>;
    private readonly service;
    private $destroy;
    state: YunzaiRoleTreeState;
    get data(): YunzaiRoleTree[];
    set data(roles: YunzaiRoleTree[]);
    get nodes(): NzTreeNode[];
    get isMultiple(): boolean;
    get roleGroupCode(): string | undefined;
    get isWrapped(): boolean;
    get isExpanded(): boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    hookFormChange(): void;
    recursionSearch(search: string, roles: YunzaiRoleTree[]): YunzaiRoleTree[];
    query(roleGroupCode?: string): void;
    load(): void;
    unload(): void;
    mapRoleTree(tree: NzTreeNode[]): void;
    activeNode(data: NzFormatEmitEvent): void;
    open(data: NzTreeNode | NzFormatEmitEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiRoleTreeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiRoleTreeComponent, "yunzai-role-tree", never, { "props": { "alias": "props"; "required": false; }; }, { "onQueryComplete": "onQueryComplete"; "onSelect": "onSelect"; }, never, never, true, never>;
}

declare class YunzaiRoleTreeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiRoleTreeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiRoleTreeModule, never, [typeof i1.NzSpinModule, typeof i2.YelonFormModule, typeof i3.NzButtonModule, typeof i4.NzIconModule, typeof i5.NzEmptyModule, typeof i6.NzTreeModule, typeof i7.CommonModule, typeof i8.NzCardModule, typeof YunzaiRoleTreeComponent], [typeof YunzaiRoleTreeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiRoleTreeModule>;
}

declare class YunzaiRoleTreeService {
    private readonly http;
    tree(roleGroupCode?: string): Observable<YunzaiRoleTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiRoleTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiRoleTreeService>;
}

declare const defaultSchema: SFSchema;

export { YunzaiRoleTreeComponent, YunzaiRoleTreeModule, YunzaiRoleTreeService, defaultSchema };
export type { YunzaiRoleTree, YunzaiRoleTreeProps, YunzaiRoleTreeState };
