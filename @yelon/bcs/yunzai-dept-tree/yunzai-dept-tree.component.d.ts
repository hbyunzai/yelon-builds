import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SFComponent } from '@yelon/form';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { YUNZAI_DEPT_TYPES, YunzaiDeptTree, YunzaiDeptTreeProps, YunzaiDeptTreeState } from './yunzai-dept-tree.types';
import * as i0 from "@angular/core";
export declare class YunzaiDeptTreeComponent implements OnInit, OnDestroy, AfterViewInit {
    sf: SFComponent;
    props?: YunzaiDeptTreeProps;
    readonly onQueryComplete: EventEmitter<YunzaiDeptTree[]>;
    readonly onSelect: EventEmitter<YunzaiDeptTree[]>;
    private deptTreeService;
    private gradeService;
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
