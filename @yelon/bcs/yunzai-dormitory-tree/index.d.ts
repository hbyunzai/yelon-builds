import * as i0 from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import { SFSchema, SFComponent } from '@yelon/form';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Observable } from 'rxjs';

declare enum YunzaiDormitoryTreeType {
    BUILDING = 0,
    BUILDING_FLOOR = 1,
    BUILDING_FLOORS_ROOMS = 2
}
interface YunzaiDormitoryTreeParam {
    isPower?: boolean;
    userId?: string;
    treeType: YunzaiDormitoryTreeType;
}
interface YunzaiDormitoryTree {
    buildPid: string;
    children: YunzaiDormitoryTree[];
    expanded: boolean;
    floorPid: string;
    isExpanded: boolean;
    isLeaf: boolean;
    key: string;
    selected: boolean;
    title: string;
    type: string;
}
interface YunzaiDormitoryTreeState {
    loading: boolean;
    schema: SFSchema;
    data: YunzaiDormitoryTree[];
    dataBackup: YunzaiDormitoryTree[];
    expandKeys: string[];
}
interface YunzaiDormitoryTreeProps {
    wrap?: boolean;
    expand?: boolean;
    multiple?: boolean;
    param?: YunzaiDormitoryTreeParam;
    data?: YunzaiDormitoryTree[];
}

declare class YunzaiDormitoryTreeComponent implements OnInit, OnDestroy, AfterViewInit {
    sf: SFComponent;
    props?: YunzaiDormitoryTreeProps;
    readonly onQueryComplete: EventEmitter<YunzaiDormitoryTree[]>;
    readonly onSelect: EventEmitter<YunzaiDormitoryTree[]>;
    private readonly service;
    private $destroy;
    state: YunzaiDormitoryTreeState;
    get data(): YunzaiDormitoryTree[];
    set data(dorms: YunzaiDormitoryTree[]);
    get nodes(): NzTreeNode[];
    get isMultiple(): boolean;
    get param(): YunzaiDormitoryTreeParam;
    get isWrapped(): boolean;
    get isExpanded(): boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    hookFormChange(): void;
    recursionSearch(search: string, dorms: YunzaiDormitoryTree[]): YunzaiDormitoryTree[];
    query(param: YunzaiDormitoryTreeParam): void;
    load(): void;
    unload(): void;
    mapDormTree(tree: NzTreeNode[]): void;
    activeNode(data: NzFormatEmitEvent): void;
    open(data: NzTreeNode | NzFormatEmitEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDormitoryTreeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiDormitoryTreeComponent, "yunzai-dormitory-tree", never, { "props": { "alias": "props"; "required": false; }; }, { "onQueryComplete": "onQueryComplete"; "onSelect": "onSelect"; }, never, never, true, never>;
}

declare class YunzaiDormitoryTreeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDormitoryTreeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<YunzaiDormitoryTreeModule, never, [typeof YunzaiDormitoryTreeComponent], [typeof YunzaiDormitoryTreeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<YunzaiDormitoryTreeModule>;
}

declare const defaultSchema: SFSchema;

declare class YunzaiDormitoryTreeService {
    private readonly http;
    tree(param?: YunzaiDormitoryTreeParam): Observable<YunzaiDormitoryTree[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiDormitoryTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<YunzaiDormitoryTreeService>;
}

export { YunzaiDormitoryTreeComponent, YunzaiDormitoryTreeModule, YunzaiDormitoryTreeService, YunzaiDormitoryTreeType, defaultSchema };
export type { YunzaiDormitoryTree, YunzaiDormitoryTreeParam, YunzaiDormitoryTreeProps, YunzaiDormitoryTreeState };
