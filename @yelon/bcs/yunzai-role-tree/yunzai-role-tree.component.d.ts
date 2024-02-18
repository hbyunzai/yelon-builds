import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SFComponent } from '@yelon/form';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { YunzaiRoleTreeService } from './yunzai-role-tree.service';
import { YunzaiRoleTree, YunzaiRoleTreeProps, YunzaiRoleTreeState } from './yunzai-role-tree.types';
import * as i0 from "@angular/core";
export declare class YunzaiRoleTreeComponent implements OnInit, AfterViewInit, OnDestroy {
    private roleTreeService;
    sf: SFComponent;
    props?: YunzaiRoleTreeProps;
    readonly onQueryComplete: EventEmitter<YunzaiRoleTree[]>;
    readonly onSelect: EventEmitter<YunzaiRoleTree[]>;
    private $destroy;
    state: YunzaiRoleTreeState;
    get data(): YunzaiRoleTree[];
    set data(roles: YunzaiRoleTree[]);
    get nodes(): NzTreeNode[];
    get isMultiple(): boolean;
    get roleGroupCode(): string | undefined;
    get isWrapped(): boolean;
    get isExpanded(): boolean;
    constructor(roleTreeService: YunzaiRoleTreeService);
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
