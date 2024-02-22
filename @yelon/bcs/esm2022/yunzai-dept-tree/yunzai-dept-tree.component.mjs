import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { YunzaiGradeService } from '@yelon/bcs/yunzai-grade';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { generateSchema } from './yunzai-dept-tree.schema';
import { YunzaiDeptTreeService } from './yunzai-dept-tree.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/spin";
import * as i2 from "ng-zorro-antd/card";
import * as i3 from "@angular/common";
import * as i4 from "@yelon/form";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "ng-zorro-antd/empty";
import * as i7 from "ng-zorro-antd/tree";
export class YunzaiDeptTreeComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.deptTreeService = inject(YunzaiDeptTreeService);
        this.gradeService = inject(YunzaiGradeService);
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: { properties: {} },
            data: [],
            dataBackup: [],
            expandKeys: []
        };
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiDeptTreeComponent, isStandalone: true, selector: "yunzai-dept-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiDeptTreeService, YunzaiGradeService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
    <nz-spin [nzSpinning]="state.loading">
      @if (isWrapped) {
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      } @else {
        <ng-container [ngTemplateOutlet]="content" />
      }
    </nz-spin>

    <ng-template #content>
      <ng-container [ngTemplateOutlet]="deptForm" />
      @if (nodes.length > 0) {
        <nz-tree
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
      } @else {
        <nz-empty />
      }
    </ng-template>

    <ng-template #treeTemplate let-node let-origin="origin">
      @if (!node.isLeaf) {
        <span [title]="node.title">
          <i
            nz-icon
            nzTheme="twotone"
            [nzType]="node.isExpanded ? 'minus-square' : 'plus-square'"
            (click)="open(node)"
          ></i>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      } @else {
        <span [title]="node.title">
          <span nz-icon nzType="file" nzTheme="twotone"></span>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      }
    </ng-template>

    <ng-template #deptForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i2.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i4.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i6.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i7.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-dept-tree`,
                    template: `
    <nz-spin [nzSpinning]="state.loading">
      @if (isWrapped) {
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      } @else {
        <ng-container [ngTemplateOutlet]="content" />
      }
    </nz-spin>

    <ng-template #content>
      <ng-container [ngTemplateOutlet]="deptForm" />
      @if (nodes.length > 0) {
        <nz-tree
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
      } @else {
        <nz-empty />
      }
    </ng-template>

    <ng-template #treeTemplate let-node let-origin="origin">
      @if (!node.isLeaf) {
        <span [title]="node.title">
          <i
            nz-icon
            nzTheme="twotone"
            [nzType]="node.isExpanded ? 'minus-square' : 'plus-square'"
            (click)="open(node)"
          ></i>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      } @else {
        <span [title]="node.title">
          <span nz-icon nzType="file" nzTheme="twotone"></span>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      }
    </ng-template>

    <ng-template #deptForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    standalone: true,
                    imports: [NzSpinModule, NzCardModule, CommonModule, YelonFormModule, NzIconModule, NzEmptyModule, NzTreeModule],
                    providers: [YunzaiDeptTreeService, YunzaiGradeService]
                }]
        }], propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRlcHQtdHJlZS95dW56YWktZGVwdC10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV6RyxPQUFPLEVBQWUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQThCLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFxQixZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7QUErRG5FLE1BQU0sT0FBTyx1QkFBdUI7SUE1RHBDO1FBK0RFLCtEQUErRDtRQUM1QyxvQkFBZSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUMxRywrREFBK0Q7UUFDNUMsYUFBUSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNsRixvQkFBZSxHQUEwQixNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN2RSxpQkFBWSxHQUF1QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVqQyxVQUFLLEdBQXdCO1lBQzNCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtZQUMxQixJQUFJLEVBQUUsRUFBRTtZQUNSLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO0tBK05IO0lBN05DLElBQUksSUFBSTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQXVCO1FBQzlCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDbkMsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELElBQUksU0FBUztRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQztRQUNELE9BQU8sS0FBSyxD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Q1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs4R0EvT1UsdUJBQXVCO2tHQUF2Qix1QkFBdUIsa0tBRnZCLENBQUMscUJBQXFCLEVBQUUsa0JBQWtCLENBQUMsc0hBeEQ1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxRFQsMkRBRVMsWUFBWSwyTUFBRSxZQUFZLCtRQUFFLFlBQVkscU1BQUUsZUFBZSwwWUFBRSxZQUFZLGlOQUFFLGFBQWEsbU1BQUUsWUFBWTs7MkZBR25HLHVCQUF1QjtrQkE1RG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO29CQUMvRyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQztpQkFDdkQ7OEJBRW9CLEVBQUU7c0JBQXBCLFNBQVM7dUJBQUMsTUFBTTtnQkFDUixLQUFLO3NCQUFiLEtBQUs7Z0JBRWEsZUFBZTtzQkFBakMsTUFBTTtnQkFFWSxRQUFRO3NCQUExQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBpbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIG1hcCwgb2YsIFN1YmplY3QsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0aHJvd0Vycm9yLCB6aXAgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpR3JhZGUsIFl1bnphaUdyYWRlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLWdyYWRlJztcbmltcG9ydCB7IFNGQ29tcG9uZW50LCBTRlZhbHVlQ2hhbmdlLCBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RW1wdHlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2VtcHR5JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelNwaW5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3NwaW4nO1xuaW1wb3J0IHsgTnpGb3JtYXRFbWl0RXZlbnQsIE56VHJlZU1vZHVsZSwgTnpUcmVlTm9kZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IGdlbmVyYXRlU2NoZW1hIH0gZnJvbSAnLi95dW56YWktZGVwdC10cmVlLnNjaGVtYSc7XG5pbXBvcnQgeyBZdW56YWlEZXB0VHJlZVNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS1kZXB0LXRyZWUuc2VydmljZSc7XG5pbXBvcnQgeyBZVU5aQUlfREVQVF9UWVBFUywgWXVuemFpRGVwdFRyZWUsIFl1bnphaURlcHRUcmVlUHJvcHMsIFl1bnphaURlcHRUcmVlU3RhdGUgfSBmcm9tICcuL3l1bnphaS1kZXB0LXRyZWUudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktZGVwdC10cmVlYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotc3BpbiBbbnpTcGlubmluZ109XCJzdGF0ZS5sb2FkaW5nXCI+XG4gICAgICBAaWYgKGlzV3JhcHBlZCkge1xuICAgICAgICA8bnotY2FyZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgICA8L256LWNhcmQ+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgIH1cbiAgICA8L256LXNwaW4+XG5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRlcHRGb3JtXCIgLz5cbiAgICAgIEBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICA8bnotdHJlZVxuICAgICAgICAgIChuekNsaWNrKT1cImFjdGl2ZU5vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgW256RXhwYW5kZWRLZXlzXT1cInN0YXRlLmV4cGFuZEtleXNcIlxuICAgICAgICAgIFtuekRhdGFdPVwibm9kZXNcIlxuICAgICAgICAgIFtuelNob3dMaW5lXT1cInRydWVcIlxuICAgICAgICAgIFtuek11bHRpcGxlXT1cImlzTXVsdGlwbGVcIlxuICAgICAgICAgIFtuekV4cGFuZGVkSWNvbl09XCJibGFua1wiXG4gICAgICAgICAgW256QmxvY2tOb2RlXT1cInRydWVcIlxuICAgICAgICAgIFtuekhpZGVVbk1hdGNoZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgW256VHJlZVRlbXBsYXRlXT1cInRyZWVUZW1wbGF0ZVwiXG4gICAgICAgIC8+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPG56LWVtcHR5IC8+XG4gICAgICB9XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjdHJlZVRlbXBsYXRlIGxldC1ub2RlIGxldC1vcmlnaW49XCJvcmlnaW5cIj5cbiAgICAgIEBpZiAoIW5vZGUuaXNMZWFmKSB7XG4gICAgICAgIDxzcGFuIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgICAgICAgPGlcbiAgICAgICAgICAgIG56LWljb25cbiAgICAgICAgICAgIG56VGhlbWU9XCJ0d290b25lXCJcbiAgICAgICAgICAgIFtuelR5cGVdPVwibm9kZS5pc0V4cGFuZGVkID8gJ21pbnVzLXNxdWFyZScgOiAncGx1cy1zcXVhcmUnXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcGVuKG5vZGUpXCJcbiAgICAgICAgICA+PC9pPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGVhZi1uYW1lXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgfSBAZWxzZSB7XG4gICAgICAgIDxzcGFuIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJmaWxlXCIgbnpUaGVtZT1cInR3b3RvbmVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICB9XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZGVwdEZvcm0+XG4gICAgICA8c2YgI2Zvcm0gbGF5b3V0PVwiaW5saW5lXCIgW2J1dHRvbl09XCInbm9uZSdcIiBbc2NoZW1hXT1cInN0YXRlLnNjaGVtYVwiIC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2JsYW5rIC8+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOelNwaW5Nb2R1bGUsIE56Q2FyZE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBZZWxvbkZvcm1Nb2R1bGUsIE56SWNvbk1vZHVsZSwgTnpFbXB0eU1vZHVsZSwgTnpUcmVlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbWXVuemFpRGVwdFRyZWVTZXJ2aWNlLCBZdW56YWlHcmFkZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURlcHRUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdmb3JtJykgc2YhOiBTRkNvbXBvbmVudDtcbiAgQElucHV0KCkgcHJvcHM/OiBZdW56YWlEZXB0VHJlZVByb3BzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uUXVlcnlDb21wbGV0ZTogRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlEZXB0VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8WXVuemFpRGVwdFRyZWVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVwdFRyZWVTZXJ2aWNlOiBZdW56YWlEZXB0VHJlZVNlcnZpY2UgPSBpbmplY3QoWXVuemFpRGVwdFRyZWVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBncmFkZVNlcnZpY2U6IFl1bnphaUdyYWRlU2VydmljZSA9IGluamVjdChZdW56YWlHcmFkZVNlcnZpY2UpO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICBzdGF0ZTogWXVuemFpRGVwdFRyZWVTdGF0ZSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzY2hlbWE6IHsgcHJvcGVydGllczoge30gfSxcbiAgICBkYXRhOiBbXSxcbiAgICBkYXRhQmFja3VwOiBbXSxcbiAgICBleHBhbmRLZXlzOiBbXVxuICB9O1xuXG4gIGdldCBkYXRhKCk6IFl1bnphaURlcHRUcmVlW10ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGF0YTtcbiAgfVxuXG4gIHNldCBkYXRhKGRlcHRzOiBZdW56YWlEZXB0VHJlZVtdKSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICB0aGlzLnByb3BzLmRhdGEgPSBkZXB0cztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gZGVwdHM7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5vZGVzKCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSBhcyBOelNhZmVBbnlbXTtcbiAgfVxuXG4gIGdldCBpc011bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLm11bHRpcGxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaW5jbHVkZUNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLmNsYXNzO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaW5jbHVkZUNsYXNzSGlzdG9yeSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5oaXN0b3J5Q2xhc3M7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlR3JhZGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuZ3JhZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBkZXB0VHlwZXMoKTogWVVOWkFJX0RFUFRfVFlQRVNbXSB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnR5cGVzIHx8IFtdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQgaXNXcmFwcGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLndyYXA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLmV4cGFuZDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGdyYWRlSWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcz8uZ3JhZGVJZDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcz8uZGF0YSkge1xuICAgICAgdGhpcy5xdWVyeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGFCYWNrdXAgPSB0aGlzLmRhdGE7XG4gICAgICB0aGlzLm1hcERlcHRUcmVlKHRoaXMuZGF0YSBhcyBOelNhZmVBbnkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvb2tGb3JtQ2hhbmdlKCk7XG4gICAgdGhpcy5zZXR1cFNjaGVtYSgpO1xuICB9XG5cbiAgc2V0dXBTY2hlbWEoKTogdm9pZCB7XG4gICAgY29uc3QgZ3JhZGVzID0gdGhpcy5ncmFkZVNlcnZpY2UuZ3JhZGVzKCkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgIG1hcCgoZ3JhZGVzOiBZdW56YWlHcmFkZVtdKSA9PiB7XG4gICAgICAgIHJldHVybiBncmFkZXMubWFwKGdyYWRlID0+IHtcbiAgICAgICAgICByZXR1cm4geyBsYWJlbDogZ3JhZGUubmFtZSwgdmFsdWU6IGdyYWRlLm9wZW5JZCB9O1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnNmLnJlZnJlc2hTY2hlbWEoZ2VuZXJhdGVTY2hlbWEodGhpcy5pbmNsdWRlQ2xhc3MsIHRoaXMuaW5jbHVkZUNsYXNzSGlzdG9yeSwgdGhpcy5pbmNsdWRlR3JhZGUsIGdyYWRlcykpO1xuICB9XG5cbiAgaG9va0Zvcm1DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZi5mb3JtVmFsdWVDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMCksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKCh2YWx1ZUNoYW5nZTogU0ZWYWx1ZUNoYW5nZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHZhbHVlOiB7IHNlYXJjaCwgaW5jbHVkZUNsYXNzLCBpbmNsdWRlQ2xhc3NIaXN0b3J5LCBncmFkZUlkIH1cbiAgICAgICAgICB9ID0gdmFsdWVDaGFuZ2U7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIG9mKHRoaXMuc3RhdGUuZGF0YUJhY2t1cCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgb2Yoc2VhcmNoKSxcbiAgICAgICAgICAgIHRoaXMuZGVwdFRyZWVTZXJ2aWNlLnRyZWUoISFpbmNsdWRlQ2xhc3MsICEhaW5jbHVkZUNsYXNzSGlzdG9yeSwgdGhpcy5kZXB0VHlwZXMsIGdyYWRlSWQpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoW3NlYXJjaCwgZGVwdHNdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgZGVwdHMgPSB0aGlzLnJlY3Vyc2lvblNlYXJjaChzZWFyY2gsIGRlcHRzKTtcbiAgICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZGVwdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcERlcHRUcmVlKGRlcHRzIGFzIE56U2FmZUFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gZGVwdHM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBtYXBEZXB0VHJlZSh0cmVlOiBOelRyZWVOb2RlW10pOiB2b2lkIHtcbiAgICBpZiAodHJlZSAmJiB0cmVlLmxlbmd0aCAmJiB0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyZWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRLZXlzLmluY2x1ZGVzKGl0ZW0ua2V5KSkge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cy5wdXNoKGl0ZW0ua2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmlzRXhwYW5kZWQgPSB0aGlzLmlzRXhwYW5kZWQ7XG4gICAgICAgIGl0ZW0uaXNMZWFmID0gaXRlbS5jaGlsZHJlbiA9PT0gbnVsbCB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgdGhpcy5tYXBEZXB0VHJlZShpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlY3Vyc2lvblNlYXJjaChzZWFyY2g6IHN0cmluZywgZGVwdHM6IFl1bnphaURlcHRUcmVlW10pOiBZdW56YWlEZXB0VHJlZVtdIHtcbiAgICBjb25zdCByZXN1bHRzOiBZdW56YWlEZXB0VHJlZVtdID0gW107XG4gICAgY29uc3Qgc2VhcmNoSW5EZXB0ID0gKGRlcHQ6IFl1bnphaURlcHRUcmVlKTogdm9pZCA9PiB7XG4gICAgICBpZiAoZGVwdC50aXRsZS5pbmNsdWRlcyhzZWFyY2gpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChkZXB0KTtcbiAgICAgIH1cbiAgICAgIGlmIChkZXB0LmNoaWxkcmVuICYmIGRlcHQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGRlcHQuY2hpbGRyZW4pIHtcbiAgICAgICAgICBzZWFyY2hJbkRlcHQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IGRlcHQgb2YgZGVwdHMpIHtcbiAgICAgIHNlYXJjaEluRGVwdChkZXB0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBhY3RpdmVOb2RlKGRhdGE6IE56Rm9ybWF0RW1pdEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRhdGEubm9kZSkge1xuICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KFtkYXRhLm5vZGUub3JpZ2luIGFzIFl1bnphaURlcHRUcmVlXSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLm5vZGVzKSB7XG4gICAgICBjb25zdCBkZXB0czogWXVuemFpRGVwdFRyZWVbXSA9IGRhdGEubm9kZXMubWFwKG4gPT4gbi5vcmlnaW4gYXMgWXVuemFpRGVwdFRyZWUpO1xuICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGRlcHRzKTtcbiAgICB9XG4gIH1cblxuICBxdWVyeSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLmRlcHRUcmVlU2VydmljZVxuICAgICAgLnRyZWUodGhpcy5pbmNsdWRlQ2xhc3MsIHRoaXMuaW5jbHVkZUNsYXNzSGlzdG9yeSwgdGhpcy5kZXB0VHlwZXMsIHRoaXMuZ3JhZGVJZClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIG1hcCgoZGVwdHM6IFl1bnphaURlcHRUcmVlW10pID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMgPSBbXTtcbiAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KGRlcHRzKTtcbiAgICAgICAgICB0aGlzLm1hcERlcHRUcmVlKGRlcHRzIGFzIE56U2FmZUFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gZGVwdHM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IHRydWU7XG4gIH1cblxuICB1bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBvcGVuKGRhdGE6IE56VHJlZU5vZGUgfCBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgTnpUcmVlTm9kZSkge1xuICAgICAgZGF0YS5pc0V4cGFuZGVkID0gIWRhdGEuaXNFeHBhbmRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IGRhdGEubm9kZTtcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIG5vZGUuaXNFeHBhbmRlZCA9ICFub2RlLmlzRXhwYW5kZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=