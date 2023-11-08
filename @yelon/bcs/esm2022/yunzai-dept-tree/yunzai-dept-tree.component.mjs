import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { generateSchema } from './yunzai-dept-tree.schema';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-dept-tree.service";
import * as i2 from "@yelon/bcs/yunzai-grade";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/tree";
import * as i5 from "ng-zorro-antd/core/transition-patch";
import * as i6 from "ng-zorro-antd/icon";
import * as i7 from "ng-zorro-antd/card";
import * as i8 from "ng-zorro-antd/spin";
import * as i9 from "ng-zorro-antd/empty";
import * as i10 from "@yelon/form";
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
        this.onQueryComplete = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: { properties: {} },
            data: [],
            dataBackup: [],
            expandKeys: [],
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDeptTreeComponent, deps: [{ token: i1.YunzaiDeptTreeService }, { token: i2.YunzaiGradeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiDeptTreeComponent, selector: "yunzai-dept-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"deptForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #deptForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i4.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "directive", type: i5.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i7.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i8.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "component", type: i9.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i10.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDeptTreeComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-dept-tree`, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"deptForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #deptForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiDeptTreeService }, { type: i2.YunzaiGradeService }]; }, propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRlcHQtdHJlZS95dW56YWktZGVwdC10cmVlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZGVwdC10cmVlL3l1bnphaS1kZXB0LXRyZWUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUl2RyxPQUFPLEVBQXFCLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBUTNELE1BQU0sT0FBTyx1QkFBdUI7SUFlbEMsSUFBSSxJQUFJO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUF1QjtRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJ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Q0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFvQztRQUN2QyxJQUFJLElBQUksWUFBWSxVQUFVLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDcEM7YUFBTTtZQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDcEM7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMxQixDQUFDOytHQTdPVSx1QkFBdUI7bUdBQXZCLHVCQUF1Qix1UENmcEMsMnVEQXNEQTs7NEZEdkNhLHVCQUF1QjtrQkFKbkMsU0FBUzsrQkFDRSxrQkFBa0I7NklBSVQsRUFBRTtzQkFBcEIsU0FBUzt1QkFBQyxNQUFNO2dCQUNSLEtBQUs7c0JBQWIsS0FBSztnQkFDSSxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBtYXAsIG9mLCBTdWJqZWN0LCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGhyb3dFcnJvciwgemlwfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpR3JhZGUsIFl1bnphaUdyYWRlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLWdyYWRlJztcbmltcG9ydCB7IFNGQ29tcG9uZW50LCBTRlZhbHVlQ2hhbmdlIH0gZnJvbSAnQHllbG9uL2Zvcm0nO1xuaW1wb3J0IHsgTnpGb3JtYXRFbWl0RXZlbnQsIE56VHJlZU5vZGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBnZW5lcmF0ZVNjaGVtYSB9IGZyb20gJy4veXVuemFpLWRlcHQtdHJlZS5zY2hlbWEnO1xuaW1wb3J0IHsgWXVuemFpRGVwdFRyZWVTZXJ2aWNlIH0gZnJvbSAnLi95dW56YWktZGVwdC10cmVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgWVVOWkFJX0RFUFRfVFlQRVMsIFl1bnphaURlcHRUcmVlLCBZdW56YWlEZXB0VHJlZVByb3BzLCBZdW56YWlEZXB0VHJlZVN0YXRlIH0gZnJvbSAnLi95dW56YWktZGVwdC10cmVlLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWRlcHQtdHJlZWAsXG4gIHRlbXBsYXRlVXJsOiBgLi95dW56YWktZGVwdC10cmVlLmh0bWxgXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURlcHRUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm0nKSBzZiE6IFNGQ29tcG9uZW50O1xuICBASW5wdXQoKSBwcm9wcz86IFl1bnphaURlcHRUcmVlUHJvcHM7XG4gIEBPdXRwdXQoKSBvblF1ZXJ5Q29tcGxldGU6IEV2ZW50RW1pdHRlcjxZdW56YWlEZXB0VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRGVwdFRyZWVbXT4oKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8WXVuemFpRGVwdFRyZWVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+KCk7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpXG5cbiAgc3RhdGU6IFl1bnphaURlcHRUcmVlU3RhdGUgPSB7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgc2NoZW1hOiB7IHByb3BlcnRpZXM6IHt9IH0sXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgZXhwYW5kS2V5czogW10sXG4gIH07XG5cbiAgZ2V0IGRhdGEoKTogWXVuemFpRGVwdFRyZWVbXSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5kYXRhO1xuICB9XG5cbiAgc2V0IGRhdGEoZGVwdHM6IFl1bnphaURlcHRUcmVlW10pIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YSA9IGRlcHRzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGEgPSBkZXB0cztcbiAgICB9XG4gIH1cblxuICBnZXQgbm9kZXMoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhIGFzIGFueVtdO1xuICB9XG5cbiAgZ2V0IGlzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMubXVsdGlwbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuY2xhc3M7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlQ2xhc3NIaXN0b3J5KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLmhpc3RvcnlDbGFzcztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGluY2x1ZGVHcmFkZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5ncmFkZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGRlcHRUeXBlcygpOiBZVU5aQUlfREVQVF9UWVBFU1tdIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudHlwZXMgfHwgW107XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldCBpc1dyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMud3JhcDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGlzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuZXhwYW5kO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgZ3JhZGVJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnByb3BzPy5ncmFkZUlkO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZXB0VHJlZVNlcnZpY2U6IFl1bnphaURlcHRUcmVlU2VydmljZSwgcHJpdmF0ZSBncmFkZVNlcnZpY2U6IFl1bnphaUdyYWRlU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHM/LmRhdGEpIHtcbiAgICAgIHRoaXMucXVlcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gdGhpcy5kYXRhO1xuICAgICAgdGhpcy5tYXBEZXB0VHJlZSh0aGlzLmRhdGEgYXMgYW55KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ob29rRm9ybUNoYW5nZSgpO1xuICAgIHRoaXMuc2V0dXBTY2hlbWEoKTtcbiAgfVxuXG4gIHNldHVwU2NoZW1hKCk6IHZvaWQge1xuICAgIGNvbnN0IGdyYWRlcyA9IHRoaXMuZ3JhZGVTZXJ2aWNlLmdyYWRlcygpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICBtYXAoKGdyYWRlczogWXVuemFpR3JhZGVbXSkgPT4ge1xuICAgICAgICByZXR1cm4gZ3JhZGVzLm1hcChncmFkZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGdyYWRlLm5hbWUsIHZhbHVlOiBncmFkZS5vcGVuSWQgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zZi5yZWZyZXNoU2NoZW1hKGdlbmVyYXRlU2NoZW1hKHRoaXMuaW5jbHVkZUNsYXNzLCB0aGlzLmluY2x1ZGVDbGFzc0hpc3RvcnksIHRoaXMuaW5jbHVkZUdyYWRlLCBncmFkZXMpKTtcbiAgfVxuXG4gIGhvb2tGb3JtQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2YuZm9ybVZhbHVlQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgodmFsdWVDaGFuZ2U6IFNGVmFsdWVDaGFuZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2YWx1ZTogeyBzZWFyY2gsIGluY2x1ZGVDbGFzcywgaW5jbHVkZUNsYXNzSGlzdG9yeSwgZ3JhZGVJZCB9XG4gICAgICAgICAgfSA9IHZhbHVlQ2hhbmdlO1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHppcChvZihzZWFyY2gpLCBvZih0aGlzLnN0YXRlLmRhdGFCYWNrdXApKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgIG9mKHNlYXJjaCksXG4gICAgICAgICAgICB0aGlzLmRlcHRUcmVlU2VydmljZS50cmVlKCEhaW5jbHVkZUNsYXNzLCAhIWluY2x1ZGVDbGFzc0hpc3RvcnksIHRoaXMuZGVwdFR5cGVzLCBncmFkZUlkKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKFtzZWFyY2gsIGRlcHRzXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cyA9IFtdO1xuICAgICAgICAgIGlmIChzZWFyY2ggJiYgc2VhcmNoLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGRlcHRzID0gdGhpcy5yZWN1cnNpb25TZWFyY2goc2VhcmNoLCBkZXB0cyk7XG4gICAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KGRlcHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXBEZXB0VHJlZShkZXB0cyBhcyBhbnkpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRlcHRzO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbWFwRGVwdFRyZWUodHJlZTogTnpUcmVlTm9kZVtdKSB7XG4gICAgaWYgKHRyZWUgJiYgdHJlZS5sZW5ndGggJiYgdHJlZS5sZW5ndGggPiAwKSB7XG4gICAgICB0cmVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kS2V5cy5pbmNsdWRlcyhpdGVtLmtleSkpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMucHVzaChpdGVtLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pc0V4cGFuZGVkID0gdGhpcy5pc0V4cGFuZGVkO1xuICAgICAgICBpdGVtLmlzTGVhZiA9IGl0ZW0uY2hpbGRyZW4gPT09IG51bGwgfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDA7XG4gICAgICAgIHRoaXMubWFwRGVwdFRyZWUoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWN1cnNpb25TZWFyY2goc2VhcmNoOiBzdHJpbmcsIGRlcHRzOiBZdW56YWlEZXB0VHJlZVtdKTogWXVuemFpRGVwdFRyZWVbXSB7XG4gICAgY29uc3QgcmVzdWx0czogWXVuemFpRGVwdFRyZWVbXSA9IFtdO1xuICAgIGNvbnN0IHNlYXJjaEluRGVwdCA9IChkZXB0OiBZdW56YWlEZXB0VHJlZSkgPT4ge1xuICAgICAgaWYgKGRlcHQudGl0bGUuaW5jbHVkZXMoc2VhcmNoKSkge1xuICAgICAgICByZXN1bHRzLnB1c2goZGVwdCk7XG4gICAgICB9XG4gICAgICBpZiAoZGVwdC5jaGlsZHJlbiAmJiBkZXB0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBkZXB0LmNoaWxkcmVuKSB7XG4gICAgICAgICAgc2VhcmNoSW5EZXB0KGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZm9yIChjb25zdCBkZXB0IG9mIGRlcHRzKSB7XG4gICAgICBzZWFyY2hJbkRlcHQoZGVwdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgYWN0aXZlTm9kZShkYXRhOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhLm5vZGUpIHtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChbZGF0YS5ub2RlLm9yaWdpbiBhcyBZdW56YWlEZXB0VHJlZV0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5ub2Rlcykge1xuICAgICAgY29uc3QgZGVwdHM6IFl1bnphaURlcHRUcmVlW10gPSBkYXRhLm5vZGVzLm1hcChuID0+IG4ub3JpZ2luIGFzIFl1bnphaURlcHRUcmVlKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkZXB0cyk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnkoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5kZXB0VHJlZVNlcnZpY2VcbiAgICAgIC50cmVlKHRoaXMuaW5jbHVkZUNsYXNzLCB0aGlzLmluY2x1ZGVDbGFzc0hpc3RvcnksIHRoaXMuZGVwdFR5cGVzLCB0aGlzLmdyYWRlSWQpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpLFxuICAgICAgICBtYXAoKGRlcHRzOiBZdW56YWlEZXB0VHJlZVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgdGhpcy5vblF1ZXJ5Q29tcGxldGUuZW1pdChkZXB0cyk7XG4gICAgICAgICAgdGhpcy5tYXBEZXB0VHJlZShkZXB0cyBhcyBhbnkpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRlcHRzO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICB9XG5cbiAgdW5sb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgb3BlbihkYXRhOiBOelRyZWVOb2RlIHwgTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE56VHJlZU5vZGUpIHtcbiAgICAgIGRhdGEuaXNFeHBhbmRlZCA9ICFkYXRhLmlzRXhwYW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBub2RlLmlzRXhwYW5kZWQgPSAhbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKVxuICB9XG5cbn1cbiIsIjwhLS0gbG9hZGluZy0tPlxuPG56LXNwaW4gW256U3Bpbm5pbmddPVwic3RhdGUubG9hZGluZ1wiPlxuICA8IS0tICAgICAgICB3cmFwcGVkLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1dyYXBwZWRcIj5cbiAgICA8bnotY2FyZD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbnotY2FyZD5cbiAgPC9uZy1jb250YWluZXI+XG4gIDwhLS0gICAgICAgIGVuZCB3cmFwcGVkLS0+XG5cbiAgPCEtLSAgICAgICAgdW53cmFwcGVkLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNXcmFwcGVkXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8IS0tICAgICAgICBlbmQgdW53cmFwcGVkLS0+XG48L256LXNwaW4+XG48IS0tIGVuZCBsb2FkaW5nLS0+XG5cbjwhLS0gICAgICBjb250ZW50LS0+XG48bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGVwdEZvcm1cIj48L25nLWNvbnRhaW5lcj5cbiAgPG56LXRyZWVcbiAgICAqbmdJZj1cIm5vZGVzLmxlbmd0aCA+IDBcIlxuICAgIChuekNsaWNrKT1cImFjdGl2ZU5vZGUoJGV2ZW50KVwiXG4gICAgW256RXhwYW5kZWRLZXlzXT1cInN0YXRlLmV4cGFuZEtleXNcIlxuICAgIFtuekRhdGFdPVwibm9kZXNcIlxuICAgIFtuelNob3dMaW5lXT1cInRydWVcIlxuICAgIFtuek11bHRpcGxlXT1cImlzTXVsdGlwbGVcIlxuICAgIFtuekV4cGFuZGVkSWNvbl09XCJibGFua1wiXG4gICAgW256QmxvY2tOb2RlXT1cInRydWVcIlxuICAgIFtuekhpZGVVbk1hdGNoZWRdPVwidHJ1ZVwiXG4gICAgW256VHJlZVRlbXBsYXRlXT1cInRyZWVUZW1wbGF0ZVwiXG4gID48L256LXRyZWU+XG4gIDxuei1lbXB0eSAqbmdJZj1cIm5vZGVzLmxlbmd0aCA9PT0gMFwiPjwvbnotZW1wdHk+XG48L25nLXRlbXBsYXRlPlxuPCEtLSAgICAgIGVuZCBjb250ZW50LS0+XG5cbjwhLS0gICAgICB0cmVlIC0tPlxuPG5nLXRlbXBsYXRlICN0cmVlVGVtcGxhdGUgbGV0LW5vZGUgbGV0LW9yaWdpbj1cIm9yaWdpblwiPlxuICA8c3BhbiAqbmdJZj1cIiFub2RlLmlzTGVhZlwiIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgPGkgbnotaWNvbiBuelRoZW1lPVwidHdvdG9uZVwiIFtuelR5cGVdPVwibm9kZS5pc0V4cGFuZGVkID8gJ21pbnVzLXNxdWFyZScgOiAncGx1cy1zcXVhcmUnXCIgKGNsaWNrKT1cIm9wZW4obm9kZSlcIj48L2k+XG4gICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICA8L3NwYW4+XG4gIDxzcGFuICpuZ0lmPVwibm9kZS5pc0xlYWZcIiBbdGl0bGVdPVwibm9kZS50aXRsZVwiPlxuICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwiZmlsZVwiIG56VGhlbWU9XCJ0d290b25lXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwibGVhZi1uYW1lXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cbiAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbjwhLS0gICAgICBlbmQgdHJlZS0tPlxuXG48bmctdGVtcGxhdGUgI2RlcHRGb3JtPlxuICA8c2YgI2Zvcm0gbGF5b3V0PVwiaW5saW5lXCIgW2J1dHRvbl09XCInbm9uZSdcIiBbc2NoZW1hXT1cInN0YXRlLnNjaGVtYVwiPjwvc2Y+XG48L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNibGFuaz48L25nLXRlbXBsYXRlPlxuIl19