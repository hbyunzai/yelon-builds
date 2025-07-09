import * as i0 from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import * as i4 from '@yelon/form';
import { SFSchema, SFComponent, SFSchemaEnumType } from '@yelon/form';
import * as i7 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Observable } from 'rxjs';
import * as i1 from 'ng-zorro-antd/spin';
import * as i2 from 'ng-zorro-antd/card';
import * as i3 from '@angular/common';
import * as i5 from 'ng-zorro-antd/icon';
import * as i6 from 'ng-zorro-antd/empty';

interface YunzaiDeptTree {
    children: YunzaiDeptTree[];
    icon: string;
    key: string;
    title: string;
    value: string;
}
interface YunzaiDeptTreeProps {
    multiple?: boolean;
    wrap?: boolean;
    expand?: boolean;
    types?: YUNZAI_DEPT_TYPES[];
    grade?: boolean;
    gradeId?: string;
    class?: boolean;
    historyClass?: boolean;
    data?: YunzaiDeptTree[];
}
interface YunzaiDeptTreeState {
    loading: boolean;
    schema: SFSchema;
    data: YunzaiDeptTree[];
    dataBackup: YunzaiDeptTree[];
    expandKeys: string[];
}
declare enum YUNZAI_DEPT_TYPES {
    DEPT = 2,
    CLASS = "class"
}

declare class YunzaiDeptTreeComponent implements OnInit, OnDestroy, AfterViewInit {
    sf: SFComponent;
    props?: YunzaiDeptTreeProps;
    readonly onQueryComplete: EventEmitter<YunzaiDeptTree[]>;
    readonly onSelect: EventEmitter<YunzaiDeptTree[]>;
    private readonly deptTreeService;
    private readonly gradeService;
    private $destroy;
    state: YunzaiDeptTreeState;
    get data(): YunzaiDeptTree[];
    set data(depts: YunzaiDeptTree[]);
    get nodes(): NzTreeNode[];
    get isMultiple(): boolean;
    get includeClass(): boolean;
    get includeClassHistory(): boolean;
    get includeGrade(): boolean;
    get deptTypes(): YUNZAI_DEPT_TYPES[];
    get isWrapped(): boolean;
    get isExpanded(): boolean;
    get gradeId(): string | undefined;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    setupSchema(): void;
    hookFormChange(): void;
    mapDeptTree(tree: NzTreeNode[]): void;
    recursionSearch(search: string, depts: YunzaiDeptTree[]): YunzaiDeptTree[];
    activeNode(data: NzFormatEmitEvent): void;
    query(): void;
    load(): void;
    unload(): void;
    open(data: NzTreeNode | NzFormatEmitEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDeptTreeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiDeptTreeComponent, "yunzai-dept-tree", never, { "props": { "alias": "props"; "required": false; }; }, { "onQueryComplete": "onQueryComplete"; "onSelect": "onSelect"; }, never, never, true, never>;
}

declare function generateSchema(ic: boolean, ich: boolean, gra: boolean, data?: Observable<SFSchemaEnumType[]>): SFSchema;

declare class YunzaiDeptTreeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDeptTreeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiDeptTreeModule, never, [typeof i1.NzSpinModule, typeof i2.NzCardModule, typeof i3.CommonModule, typeof i4.YelonFormModule, typeof i5.NzIconModule, typeof i6.NzEmptyModule, typeof i7.NzTreeModule, typeof YunzaiDeptTreeComponent], [typeof YunzaiDeptTreeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiDeptTreeModule>;
}

declare class YunzaiDeptTreeService {
    private readonly http;
    /**
     * @param includeClass include class
     * @param history include history class
     */
    tree(includeClass: boolean, history: boolean): Observable<YunzaiDeptTree[]>;
    /**
     * @param includeClass include class
     * @param history include history class
     * @param types dept types
     */
    tree(includeClass: boolean, history: boolean, types?: YUNZAI_DEPT_TYPES[]): Observable<YunzaiDeptTree[]>;
    /**
     * @param includeClass include class
     * @param history include history class
     * @param types dept types
     * @param gradeId gradeId
     */
    tree(includeClass: boolean, history: boolean, types?: YUNZAI_DEPT_TYPES[], gradeId?: string): Observable<YunzaiDeptTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDeptTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiDeptTreeService>;
}

export { YUNZAI_DEPT_TYPES, YunzaiDeptTreeComponent, YunzaiDeptTreeModule, YunzaiDeptTreeService, generateSchema };
export type { YunzaiDeptTree, YunzaiDeptTreeProps, YunzaiDeptTreeState };
