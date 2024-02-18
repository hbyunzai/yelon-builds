import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { of, map, catchError, throwError, Subject, takeUntil, debounceTime, switchMap, zip } from 'rxjs';
import * as i9 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i8 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i5 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i6 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i7 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeModule } from 'ng-zorro-antd/tree';
import * as i1 from '@yelon/theme';
import * as i2 from '@yelon/bcs/yunzai-grade';

function generateSchema(ic, ich, gra, data) {
    let schema = {
        properties: {
            search: {
                title: 'search',
                type: 'string',
                ui: {
                    i18n: 'input.search',
                    widget: 'string'
                }
            }
        }
    };
    if (ic) {
        schema.properties = Object.defineProperty(schema.properties, 'includeCLass', {
            value: {
                title: 'includeClass',
                type: 'boolean',
                enum: [
                    { label: 'true', value: true },
                    { label: 'false', value: false }
                ],
                default: true,
                ui: {
                    i18n: 'radio.class',
                    widget: 'radio'
                }
            },
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
    if (ich) {
        schema.properties = Object.defineProperty(schema.properties, 'includeClassHistory', {
            value: {
                title: 'includeClassHistory',
                type: 'boolean',
                enum: [
                    { label: 'true', value: true },
                    { label: 'false', value: false }
                ],
                default: true,
                ui: {
                    i18n: 'radio.history',
                    widget: 'radio'
                }
            },
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
    if (gra) {
        schema.properties = Object.defineProperty(schema.properties, 'gradeId', {
            value: {
                title: 'gradeId',
                type: 'string',
                ui: {
                    i18n: 'grade',
                    widget: 'select',
                    asyncData: () => data || of([])
                }
            },
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
    return schema;
}

class YunzaiDeptTreeService {
    constructor(http) {
        this.http = http;
    }
    /**
     * @param includeClass include class
     * @param history include history class
     * @param types dept types
     * @param gradeId gradeId
     */
    tree(includeClass, history, types, gradeId) {
        let params = Object.create({});
        if (includeClass) {
            params['includeClass'] = true;
        }
        if (history) {
            params['includeHisClass'] = true;
        }
        if (types) {
            params['deptType'] = types.join(',');
        }
        if (gradeId) {
            params['gradeId'] = gradeId;
        }
        return this.http.get('/auth/baseDepartMent/tree', params).pipe(map((response) => {
            return response.data;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });

class YunzaiDeptTreeComponent {
    get data() {
        if (this.props && this.props.data) {
            return this.props.data;
        }
        return this.state.data;
    }
    set data(depts) {
        if (this.props && this.props.data) {
            this.props.data = depts;
        }
        else {
            this.state.data = depts;
        }
    }
    get nodes() {
        return this.data;
    }
    get isMultiple() {
        if (this.props) {
            return !!this.props.multiple;
        }
        return false;
    }
    get includeClass() {
        if (this.props) {
            return !!this.props.class;
        }
        return false;
    }
    get includeClassHistory() {
        if (this.props) {
            return !!this.props.historyClass;
        }
        return false;
    }
    get includeGrade() {
        if (this.props) {
            return !!this.props.grade;
        }
        return false;
    }
    get deptTypes() {
        if (this.props) {
            return this.props.types || [];
        }
        return [];
    }
    get isWrapped() {
        if (this.props) {
            return !!this.props.wrap;
        }
        return false;
    }
    get isExpanded() {
        if (this.props) {
            return !!this.props.expand;
        }
        return false;
    }
    get gradeId() {
        return this.props?.gradeId;
    }
    constructor(deptTreeService, gradeService) {
        this.deptTreeService = deptTreeService;
        this.gradeService = gradeService;
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: { properties: {} },
            data: [],
            dataBackup: [],
            expandKeys: []
        };
    }
    ngOnInit() {
        if (!this.props?.data) {
            this.query();
        }
        else {
            this.state.dataBackup = this.data;
            this.mapDeptTree(this.data);
        }
    }
    ngAfterViewInit() {
        this.hookFormChange();
        this.setupSchema();
    }
    setupSchema() {
        const grades = this.gradeService.grades().pipe(takeUntil(this.$destroy), map((grades) => {
            return grades.map(grade => {
                return { label: grade.name, value: grade.openId };
            });
        }));
        this.sf.refreshSchema(generateSchema(this.includeClass, this.includeClassHistory, this.includeGrade, grades));
    }
    hookFormChange() {
        this.sf.formValueChange
            .pipe(debounceTime(1000), map(value => {
            this.load();
            return value;
        }), switchMap((valueChange) => {
            const { value: { search, includeClass, includeClassHistory, gradeId } } = valueChange;
            if (this.props && this.props.data) {
                return zip(of(search), of(this.state.dataBackup));
            }
            return zip(of(search), this.deptTreeService.tree(!!includeClass, !!includeClassHistory, this.deptTypes, gradeId));
        }), map(([search, depts]) => {
            this.state.expandKeys = [];
            if (search && search.trim() !== '') {
                depts = this.recursionSearch(search, depts);
                this.onQueryComplete.emit(depts);
            }
            this.mapDeptTree(depts);
            this.data = depts;
        }), catchError(error => {
            this.unload();
            return throwError(error);
        }))
            .subscribe(() => {
            this.unload();
        });
    }
    mapDeptTree(tree) {
        if (tree && tree.length && tree.length > 0) {
            tree.forEach(item => {
                if (this.isExpanded && !this.state.expandKeys.includes(item.key)) {
                    this.state.expandKeys.push(item.key);
                }
                item.isExpanded = this.isExpanded;
                item.isLeaf = item.children === null || item.children.length === 0;
                this.mapDeptTree(item.children);
            });
        }
    }
    recursionSearch(search, depts) {
        const results = [];
        const searchInDept = (dept) => {
            if (dept.title.includes(search)) {
                results.push(dept);
            }
            if (dept.children && dept.children.length > 0) {
                for (const child of dept.children) {
                    searchInDept(child);
                }
            }
        };
        for (const dept of depts) {
            searchInDept(dept);
        }
        return results;
    }
    activeNode(data) {
        if (data.node) {
            this.onSelect.emit([data.node.origin]);
        }
        else if (data.nodes) {
            const depts = data.nodes.map(n => n.origin);
            this.onSelect.emit(depts);
        }
    }
    query() {
        this.load();
        this.deptTreeService
            .tree(this.includeClass, this.includeClassHistory, this.deptTypes, this.gradeId)
            .pipe(takeUntil(this.$destroy), map((depts) => {
            this.state.expandKeys = [];
            this.onQueryComplete.emit(depts);
            this.mapDeptTree(depts);
            this.data = depts;
        }), catchError(error => {
            this.unload();
            return throwError(error);
        }))
            .subscribe(() => {
            this.unload();
        });
    }
    load() {
        this.state.loading = true;
    }
    unload() {
        this.state.loading = false;
    }
    open(data) {
        if (data instanceof NzTreeNode) {
            data.isExpanded = !data.isExpanded;
        }
        else {
            const node = data.node;
            if (node) {
                node.isExpanded = !node.isExpanded;
            }
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeComponent, deps: [{ token: YunzaiDeptTreeService }, { token: i2.YunzaiGradeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiDeptTreeComponent, isStandalone: true, selector: "yunzai-dept-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
    <!-- loading-->
    <nz-spin [nzSpinning]="state.loading">
      <!--        wrapped-->
      <ng-container *ngIf="isWrapped">
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      </ng-container>
      <!--        end wrapped-->

      <!--        unwrapped-->
      <ng-container *ngIf="!isWrapped">
        <ng-container [ngTemplateOutlet]="content" />
      </ng-container>
      <!--        end unwrapped-->
    </nz-spin>
    <!-- end loading-->

    <!--      content-->
    <ng-template #content>
      <ng-container [ngTemplateOutlet]="deptForm" />
      <nz-tree
        *ngIf="nodes.length > 0"
        (nzClick)="activeNode($event)"
        [nzExpandedKeys]="state.expandKeys"
        [nzData]="nodes"
        [nzShowLine]="true"
        [nzMultiple]="isMultiple"
        [nzExpandedIcon]="blank"
        [nzBlockNode]="true"
        [nzHideUnMatched]="true"
        [nzTreeTemplate]="treeTemplate"
      />
      <nz-empty *ngIf="nodes.length === 0" />
    </ng-template>
    <!--      end content-->

    <!--      tree -->
    <ng-template #treeTemplate let-node let-origin="origin">
      <span *ngIf="!node.isLeaf" [title]="node.title">
        <i
          nz-icon
          nzTheme="twotone"
          [nzType]="node.isExpanded ? 'minus-square' : 'plus-square'"
          (click)="open(node)"
        ></i>
        <span class="leaf-name">{{ node.title }}</span>
      </span>
      <span *ngIf="node.isLeaf" [title]="node.title">
        <span nz-icon nzType="file" nzTheme="twotone"></span>
        <span class="leaf-name">{{ node.title }}</span>
      </span>
    </ng-template>
    <!--      end tree-->

    <ng-template #deptForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i5.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i6.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i7.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i8.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i9.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-dept-tree`,
                    template: `
    <!-- loading-->
    <nz-spin [nzSpinning]="state.loading">
      <!--        wrapped-->
      <ng-container *ngIf="isWrapped">
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      </ng-container>
      <!--        end wrapped-->

      <!--        unwrapped-->
      <ng-container *ngIf="!isWrapped">
        <ng-container [ngTemplateOutlet]="content" />
      </ng-container>
      <!--        end unwrapped-->
    </nz-spin>
    <!-- end loading-->

    <!--      content-->
    <ng-template #content>
      <ng-container [ngTemplateOutlet]="deptForm" />
      <nz-tree
        *ngIf="nodes.length > 0"
        (nzClick)="activeNode($event)"
        [nzExpandedKeys]="state.expandKeys"
        [nzData]="nodes"
        [nzShowLine]="true"
        [nzMultiple]="isMultiple"
        [nzExpandedIcon]="blank"
        [nzBlockNode]="true"
        [nzHideUnMatched]="true"
        [nzTreeTemplate]="treeTemplate"
      />
      <nz-empty *ngIf="nodes.length === 0" />
    </ng-template>
    <!--      end content-->

    <!--      tree -->
    <ng-template #treeTemplate let-node let-origin="origin">
      <span *ngIf="!node.isLeaf" [title]="node.title">
        <i
          nz-icon
          nzTheme="twotone"
          [nzType]="node.isExpanded ? 'minus-square' : 'plus-square'"
          (click)="open(node)"
        ></i>
        <span class="leaf-name">{{ node.title }}</span>
      </span>
      <span *ngIf="node.isLeaf" [title]="node.title">
        <span nz-icon nzType="file" nzTheme="twotone"></span>
        <span class="leaf-name">{{ node.title }}</span>
      </span>
    </ng-template>
    <!--      end tree-->

    <ng-template #deptForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    standalone: true,
                    imports: [CommonModule, NzIconModule, NzEmptyModule, NzSpinModule, NzTreeModule, NzCardModule, YelonFormModule]
                }]
        }], ctorParameters: () => [{ type: YunzaiDeptTreeService }, { type: i2.YunzaiGradeService }], propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

var YUNZAI_DEPT_TYPES;
(function (YUNZAI_DEPT_TYPES) {
    YUNZAI_DEPT_TYPES[YUNZAI_DEPT_TYPES["DEPT"] = 2] = "DEPT";
    YUNZAI_DEPT_TYPES["CLASS"] = "class";
})(YUNZAI_DEPT_TYPES || (YUNZAI_DEPT_TYPES = {}));

const COMPONENTS = [YunzaiDeptTreeComponent];
class YunzaiDeptTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, imports: [CommonModule,
            NzIconModule,
            NzEmptyModule,
            NzSpinModule,
            NzTreeModule,
            NzCardModule,
            YelonFormModule, YunzaiDeptTreeComponent], exports: [YunzaiDeptTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, imports: [CommonModule,
            NzIconModule,
            NzEmptyModule,
            NzSpinModule,
            NzTreeModule,
            NzCardModule,
            YelonFormModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzSpinModule,
                        NzTreeModule,
                        NzCardModule,
                        YelonFormModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YUNZAI_DEPT_TYPES, YunzaiDeptTreeComponent, YunzaiDeptTreeModule, YunzaiDeptTreeService, generateSchema };
//# sourceMappingURL=yunzai-dept-tree.mjs.map
