import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { generateSchema } from './yunzai-dept-tree.schema';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-dept-tree.service";
import * as i2 from "@yelon/bcs/yunzai-grade";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/empty";
import * as i6 from "ng-zorro-antd/spin";
import * as i7 from "ng-zorro-antd/tree";
import * as i8 from "ng-zorro-antd/card";
import * as i9 from "@yelon/form";
export class YunzaiDeptTreeComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeComponent, deps: [{ token: i1.YunzaiDeptTreeService }, { token: i2.YunzaiGradeService }], target: i0.ɵɵFactoryTarget.Component }); }
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
        }], ctorParameters: () => [{ type: i1.YunzaiDeptTreeService }, { type: i2.YunzaiGradeService }], propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRlcHQtdHJlZS95dW56YWktZGVwdC10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHekcsT0FBTyxFQUE4QixlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBcUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7QUFzRTNELE1BQU0sT0FBTyx1QkFBdUI7SUFpQmxDLElBQUksSUFBSTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQXVCO1FBQzlCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDbkMsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELElBQUksU0FBUztRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVELFlBQ1UsZUFBc0MsRUFDdEMsWUFBZ0M7UUFEaEMsb0JBQWUsR0FBZixlQUFlLENBQXVCO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQXhGMUMsK0RBQStEO1FBQzVDLG9CQUFlLEdBQW1DLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQzFHLCtEQUErRDtRQUM1QyxhQUFRLEdBQW1DLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQzNGLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLFVBQUssR0FBd0I7WUFDM0IsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBQzFCLElBQUksRUFBRSxFQUFFO1lBQ1IsVUFBVSxFQUFFLEVBQUU7WUFDZCxVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUM7SUE2RUMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBaUIsQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FDNUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDeEIsR0FBRyxDQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFO1lBQzVCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZTthQUNwQixJQUFJLENBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxDQUFDLFdBQTBCLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEVBQ0osS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsRUFDOUQsR0FBRyxXQUFXLENBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFDRCxPQUFPLEdBQUcsQ0FDUixFQUFFLENBQUMsTUFBTSxDQUFDLEVBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FDMUYsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQzNCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFrQixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBa0I7UUFDNUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLE1BQWMsRUFBRSxLQUF1QjtRQUNyRCxNQUFNLE9BQU8sR0FBcUIsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBb0IsRUFBUSxFQUFFO1lBQ2xELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5QyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDbEMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7WUFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQXVCO1FBQ2hDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQXdCLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixNQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBd0IsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxlQUFlO2FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDL0UsSUFBSSxDQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQ3hCLEdBQUcsQ0FBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFrQixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBb0M7UUFDdkMsSUFBSSxJQUFJLFlBQVksVUFBVSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckMsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs4R0FsUFUsdUJBQXVCO2tHQUF2Qix1QkFBdUIsMlFBaEV4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERULDJEQUVTLFlBQVkseVNBQUUsWUFBWSxpTkFBRSxhQUFhLG1NQUFFLFlBQVksMk1BQUUsWUFBWSxrMEJBQUUsWUFBWSwrUUFBRSxlQUFlOzsyRkFFbkcsdUJBQXVCO2tCQWxFbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTREVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO2lCQUNoSDsySEFFb0IsRUFBRTtzQkFBcEIsU0FBUzt1QkFBQyxNQUFNO2dCQUNSLEtBQUs7c0JBQWIsS0FBSztnQkFFYSxlQUFlO3NCQUFqQyxNQUFNO2dCQUVZLFFBQVE7c0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgbWFwLCBvZiwgU3ViamVjdCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRocm93RXJyb3IsIHppcCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBZdW56YWlHcmFkZSwgWXVuemFpR3JhZGVTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZ3JhZGUnO1xuaW1wb3J0IHsgU0ZDb21wb25lbnQsIFNGVmFsdWVDaGFuZ2UsIFllbG9uRm9ybU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9mb3JtJztcbmltcG9ydCB7IE56Q2FyZE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY2FyZCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOekZvcm1hdEVtaXRFdmVudCwgTnpUcmVlTW9kdWxlLCBOelRyZWVOb2RlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90cmVlJztcblxuaW1wb3J0IHsgZ2VuZXJhdGVTY2hlbWEgfSBmcm9tICcuL3l1bnphaS1kZXB0LXRyZWUuc2NoZW1hJztcbmltcG9ydCB7IFl1bnphaURlcHRUcmVlU2VydmljZSB9IGZyb20gJy4veXVuemFpLWRlcHQtdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7IFlVTlpBSV9ERVBUX1RZUEVTLCBZdW56YWlEZXB0VHJlZSwgWXVuemFpRGVwdFRyZWVQcm9wcywgWXVuemFpRGVwdFRyZWVTdGF0ZSB9IGZyb20gJy4veXVuemFpLWRlcHQtdHJlZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1kZXB0LXRyZWVgLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gbG9hZGluZy0tPlxuICAgIDxuei1zcGluIFtuelNwaW5uaW5nXT1cInN0YXRlLmxvYWRpbmdcIj5cbiAgICAgIDwhLS0gICAgICAgIHdyYXBwZWQtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1dyYXBwZWRcIj5cbiAgICAgICAgPG56LWNhcmQ+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgICAgPC9uei1jYXJkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8IS0tICAgICAgICBlbmQgd3JhcHBlZC0tPlxuXG4gICAgICA8IS0tICAgICAgICB1bndyYXBwZWQtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNXcmFwcGVkXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiIC8+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwhLS0gICAgICAgIGVuZCB1bndyYXBwZWQtLT5cbiAgICA8L256LXNwaW4+XG4gICAgPCEtLSBlbmQgbG9hZGluZy0tPlxuXG4gICAgPCEtLSAgICAgIGNvbnRlbnQtLT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRlcHRGb3JtXCIgLz5cbiAgICAgIDxuei10cmVlXG4gICAgICAgICpuZ0lmPVwibm9kZXMubGVuZ3RoID4gMFwiXG4gICAgICAgIChuekNsaWNrKT1cImFjdGl2ZU5vZGUoJGV2ZW50KVwiXG4gICAgICAgIFtuekV4cGFuZGVkS2V5c109XCJzdGF0ZS5leHBhbmRLZXlzXCJcbiAgICAgICAgW256RGF0YV09XCJub2Rlc1wiXG4gICAgICAgIFtuelNob3dMaW5lXT1cInRydWVcIlxuICAgICAgICBbbnpNdWx0aXBsZV09XCJpc011bHRpcGxlXCJcbiAgICAgICAgW256RXhwYW5kZWRJY29uXT1cImJsYW5rXCJcbiAgICAgICAgW256QmxvY2tOb2RlXT1cInRydWVcIlxuICAgICAgICBbbnpIaWRlVW5NYXRjaGVkXT1cInRydWVcIlxuICAgICAgICBbbnpUcmVlVGVtcGxhdGVdPVwidHJlZVRlbXBsYXRlXCJcbiAgICAgIC8+XG4gICAgICA8bnotZW1wdHkgKm5nSWY9XCJub2Rlcy5sZW5ndGggPT09IDBcIiAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSAgICAgIGVuZCBjb250ZW50LS0+XG5cbiAgICA8IS0tICAgICAgdHJlZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3RyZWVUZW1wbGF0ZSBsZXQtbm9kZSBsZXQtb3JpZ2luPVwib3JpZ2luXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cIiFub2RlLmlzTGVhZlwiIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgICAgIDxpXG4gICAgICAgICAgbnotaWNvblxuICAgICAgICAgIG56VGhlbWU9XCJ0d290b25lXCJcbiAgICAgICAgICBbbnpUeXBlXT1cIm5vZGUuaXNFeHBhbmRlZCA/ICdtaW51cy1zcXVhcmUnIDogJ3BsdXMtc3F1YXJlJ1wiXG4gICAgICAgICAgKGNsaWNrKT1cIm9wZW4obm9kZSlcIlxuICAgICAgICA+PC9pPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlYWYtbmFtZVwiPnt7IG5vZGUudGl0bGUgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cIm5vZGUuaXNMZWFmXCIgW3RpdGxlXT1cIm5vZGUudGl0bGVcIj5cbiAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJmaWxlXCIgbnpUaGVtZT1cInR3b3RvbmVcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVhZi1uYW1lXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwhLS0gICAgICBlbmQgdHJlZS0tPlxuXG4gICAgPG5nLXRlbXBsYXRlICNkZXB0Rm9ybT5cbiAgICAgIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjYmxhbmsgLz5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTnpJY29uTW9kdWxlLCBOekVtcHR5TW9kdWxlLCBOelNwaW5Nb2R1bGUsIE56VHJlZU1vZHVsZSwgTnpDYXJkTW9kdWxlLCBZZWxvbkZvcm1Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURlcHRUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdmb3JtJykgc2YhOiBTRkNvbXBvbmVudDtcbiAgQElucHV0KCkgcHJvcHM/OiBZdW56YWlEZXB0VHJlZVByb3BzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uUXVlcnlDb21wbGV0ZTogRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlEZXB0VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8WXVuemFpRGVwdFRyZWVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+KCk7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHN0YXRlOiBZdW56YWlEZXB0VHJlZVN0YXRlID0ge1xuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHNjaGVtYTogeyBwcm9wZXJ0aWVzOiB7fSB9LFxuICAgIGRhdGE6IFtdLFxuICAgIGRhdGFCYWNrdXA6IFtdLFxuICAgIGV4cGFuZEtleXM6IFtdXG4gIH07XG5cbiAgZ2V0IGRhdGEoKTogWXVuemFpRGVwdFRyZWVbXSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5kYXRhO1xuICB9XG5cbiAgc2V0IGRhdGEoZGVwdHM6IFl1bnphaURlcHRUcmVlW10pIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YSA9IGRlcHRzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGEgPSBkZXB0cztcbiAgICB9XG4gIH1cblxuICBnZXQgbm9kZXMoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhIGFzIE56U2FmZUFueVtdO1xuICB9XG5cbiAgZ2V0IGlzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMubXVsdGlwbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuY2xhc3M7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlQ2xhc3NIaXN0b3J5KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLmhpc3RvcnlDbGFzcztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGluY2x1ZGVHcmFkZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5ncmFkZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGRlcHRUeXBlcygpOiBZVU5aQUlfREVQVF9UWVBFU1tdIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudHlwZXMgfHwgW107XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldCBpc1dyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMud3JhcDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGlzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuZXhwYW5kO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgZ3JhZGVJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnByb3BzPy5ncmFkZUlkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZXB0VHJlZVNlcnZpY2U6IFl1bnphaURlcHRUcmVlU2VydmljZSxcbiAgICBwcml2YXRlIGdyYWRlU2VydmljZTogWXVuemFpR3JhZGVTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHM/LmRhdGEpIHtcbiAgICAgIHRoaXMucXVlcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gdGhpcy5kYXRhO1xuICAgICAgdGhpcy5tYXBEZXB0VHJlZSh0aGlzLmRhdGEgYXMgTnpTYWZlQW55KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ob29rRm9ybUNoYW5nZSgpO1xuICAgIHRoaXMuc2V0dXBTY2hlbWEoKTtcbiAgfVxuXG4gIHNldHVwU2NoZW1hKCk6IHZvaWQge1xuICAgIGNvbnN0IGdyYWRlcyA9IHRoaXMuZ3JhZGVTZXJ2aWNlLmdyYWRlcygpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICBtYXAoKGdyYWRlczogWXVuemFpR3JhZGVbXSkgPT4ge1xuICAgICAgICByZXR1cm4gZ3JhZGVzLm1hcChncmFkZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGdyYWRlLm5hbWUsIHZhbHVlOiBncmFkZS5vcGVuSWQgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zZi5yZWZyZXNoU2NoZW1hKGdlbmVyYXRlU2NoZW1hKHRoaXMuaW5jbHVkZUNsYXNzLCB0aGlzLmluY2x1ZGVDbGFzc0hpc3RvcnksIHRoaXMuaW5jbHVkZUdyYWRlLCBncmFkZXMpKTtcbiAgfVxuXG4gIGhvb2tGb3JtQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2YuZm9ybVZhbHVlQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgodmFsdWVDaGFuZ2U6IFNGVmFsdWVDaGFuZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2YWx1ZTogeyBzZWFyY2gsIGluY2x1ZGVDbGFzcywgaW5jbHVkZUNsYXNzSGlzdG9yeSwgZ3JhZGVJZCB9XG4gICAgICAgICAgfSA9IHZhbHVlQ2hhbmdlO1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHppcChvZihzZWFyY2gpLCBvZih0aGlzLnN0YXRlLmRhdGFCYWNrdXApKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgIG9mKHNlYXJjaCksXG4gICAgICAgICAgICB0aGlzLmRlcHRUcmVlU2VydmljZS50cmVlKCEhaW5jbHVkZUNsYXNzLCAhIWluY2x1ZGVDbGFzc0hpc3RvcnksIHRoaXMuZGVwdFR5cGVzLCBncmFkZUlkKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKFtzZWFyY2gsIGRlcHRzXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cyA9IFtdO1xuICAgICAgICAgIGlmIChzZWFyY2ggJiYgc2VhcmNoLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGRlcHRzID0gdGhpcy5yZWN1cnNpb25TZWFyY2goc2VhcmNoLCBkZXB0cyk7XG4gICAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KGRlcHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXBEZXB0VHJlZShkZXB0cyBhcyBOelNhZmVBbnkpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRlcHRzO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbWFwRGVwdFRyZWUodHJlZTogTnpUcmVlTm9kZVtdKTogdm9pZCB7XG4gICAgaWYgKHRyZWUgJiYgdHJlZS5sZW5ndGggJiYgdHJlZS5sZW5ndGggPiAwKSB7XG4gICAgICB0cmVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kS2V5cy5pbmNsdWRlcyhpdGVtLmtleSkpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMucHVzaChpdGVtLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pc0V4cGFuZGVkID0gdGhpcy5pc0V4cGFuZGVkO1xuICAgICAgICBpdGVtLmlzTGVhZiA9IGl0ZW0uY2hpbGRyZW4gPT09IG51bGwgfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDA7XG4gICAgICAgIHRoaXMubWFwRGVwdFRyZWUoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWN1cnNpb25TZWFyY2goc2VhcmNoOiBzdHJpbmcsIGRlcHRzOiBZdW56YWlEZXB0VHJlZVtdKTogWXVuemFpRGVwdFRyZWVbXSB7XG4gICAgY29uc3QgcmVzdWx0czogWXVuemFpRGVwdFRyZWVbXSA9IFtdO1xuICAgIGNvbnN0IHNlYXJjaEluRGVwdCA9IChkZXB0OiBZdW56YWlEZXB0VHJlZSk6IHZvaWQgPT4ge1xuICAgICAgaWYgKGRlcHQudGl0bGUuaW5jbHVkZXMoc2VhcmNoKSkge1xuICAgICAgICByZXN1bHRzLnB1c2goZGVwdCk7XG4gICAgICB9XG4gICAgICBpZiAoZGVwdC5jaGlsZHJlbiAmJiBkZXB0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBkZXB0LmNoaWxkcmVuKSB7XG4gICAgICAgICAgc2VhcmNoSW5EZXB0KGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZm9yIChjb25zdCBkZXB0IG9mIGRlcHRzKSB7XG4gICAgICBzZWFyY2hJbkRlcHQoZGVwdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgYWN0aXZlTm9kZShkYXRhOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhLm5vZGUpIHtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChbZGF0YS5ub2RlLm9yaWdpbiBhcyBZdW56YWlEZXB0VHJlZV0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5ub2Rlcykge1xuICAgICAgY29uc3QgZGVwdHM6IFl1bnphaURlcHRUcmVlW10gPSBkYXRhLm5vZGVzLm1hcChuID0+IG4ub3JpZ2luIGFzIFl1bnphaURlcHRUcmVlKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkZXB0cyk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnkoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5kZXB0VHJlZVNlcnZpY2VcbiAgICAgIC50cmVlKHRoaXMuaW5jbHVkZUNsYXNzLCB0aGlzLmluY2x1ZGVDbGFzc0hpc3RvcnksIHRoaXMuZGVwdFR5cGVzLCB0aGlzLmdyYWRlSWQpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpLFxuICAgICAgICBtYXAoKGRlcHRzOiBZdW56YWlEZXB0VHJlZVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgdGhpcy5vblF1ZXJ5Q29tcGxldGUuZW1pdChkZXB0cyk7XG4gICAgICAgICAgdGhpcy5tYXBEZXB0VHJlZShkZXB0cyBhcyBOelNhZmVBbnkpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRlcHRzO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICB9XG5cbiAgdW5sb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgb3BlbihkYXRhOiBOelRyZWVOb2RlIHwgTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE56VHJlZU5vZGUpIHtcbiAgICAgIGRhdGEuaXNFeHBhbmRlZCA9ICFkYXRhLmlzRXhwYW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBub2RlLmlzRXhwYW5kZWQgPSAhbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19