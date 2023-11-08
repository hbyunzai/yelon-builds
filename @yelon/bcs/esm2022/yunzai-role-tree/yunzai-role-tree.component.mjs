import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { defaultSchema } from './yunzai-role-tree.schema';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-role-tree.service";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/tree";
import * as i4 from "ng-zorro-antd/core/transition-patch";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "ng-zorro-antd/card";
import * as i7 from "ng-zorro-antd/spin";
import * as i8 from "ng-zorro-antd/empty";
import * as i9 from "@yelon/form";
export class YunzaiRoleTreeComponent {
    get data() {
        if (this.props && this.props.data) {
            return this.props.data;
        }
        return this.state.data;
    }
    set data(roles) {
        if (this.props && this.props.data) {
            this.props.data = roles;
        }
        else {
            this.state.data = roles;
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
    get roleGroupCode() {
        if (this.props && this.props.roleGroupCode) {
            return this.props.roleGroupCode;
        }
        return undefined;
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
    constructor(roleTreeService) {
        this.roleTreeService = roleTreeService;
        this.onQueryComplete = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: defaultSchema,
            data: [],
            dataBackup: [],
            expandKeys: [],
        };
    }
    ngOnInit() {
        if (!this.props?.data) {
            this.query(this.roleGroupCode);
        }
        else {
            this.state.dataBackup = this.data;
            this.mapRoleTree(this.data);
        }
    }
    ngAfterViewInit() {
        this.hookFormChange();
    }
    hookFormChange() {
        this.sf.formValueChange
            .pipe(takeUntil(this.$destroy), debounceTime(1000), map(value => {
            this.load();
            return value;
        }), switchMap((valueChange) => {
            const { value: { search } } = valueChange;
            if (this.props && this.props.data) {
                return zip(of(search), of(this.state.dataBackup));
            }
            return zip(of(search), this.roleTreeService.tree(this.roleGroupCode));
        }), map(([search, depts]) => {
            this.state.expandKeys = [];
            if (search && search.trim() !== '') {
                depts = this.recursionSearch(search, depts);
                this.onQueryComplete.emit(depts);
            }
            this.mapRoleTree(depts);
            this.data = depts;
        }), catchError(error => {
            this.unload();
            return error;
        }))
            .subscribe(() => {
            this.unload();
        });
    }
    recursionSearch(search, roles) {
        const results = [];
        const searchInRole = (role) => {
            if (role.title.includes(search)) {
                results.push(role);
            }
            if (role.children && role.children.length > 0) {
                for (const child of role.children) {
                    searchInRole(child);
                }
            }
        };
        for (const dept of roles) {
            searchInRole(dept);
        }
        return results;
    }
    query(roleGroupCode) {
        this.load();
        this.roleTreeService
            .tree(roleGroupCode)
            .pipe(takeUntil(this.$destroy), map((roles) => {
            this.state.expandKeys = [];
            this.onQueryComplete.emit(roles);
            this.mapRoleTree(roles);
            this.data = roles;
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
    mapRoleTree(tree) {
        if (tree && tree.length && tree.length > 0) {
            tree.forEach(item => {
                if (this.isExpanded && !this.state.expandKeys.includes(item.key)) {
                    this.state.expandKeys.push(item.key);
                }
                item.isExpanded = this.isExpanded;
                item.isLeaf = item.children === null || item.children.length === 0;
                this.mapRoleTree(item.children);
            });
        }
    }
    activeNode(data) {
        if (data.node) {
            this.onSelect.emit([data.node.origin]);
        }
        else if (data.nodes) {
            const roles = data.nodes.map(n => n.origin);
            this.onSelect.emit(roles);
        }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeComponent, deps: [{ token: i1.YunzaiRoleTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiRoleTreeComponent, selector: "yunzai-role-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"roleForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #roleForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i6.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i7.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "component", type: i8.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i9.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-role-tree`, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"roleForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #roleForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiRoleTreeService }]; }, propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLXJvbGUtdHJlZS95dW56YWktcm9sZS10cmVlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktcm9sZS10cmVlL3l1bnphaS1yb2xlLXRyZWUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd2RyxPQUFPLEVBQXFCLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7QUFRMUQsTUFBTSxPQUFPLHVCQUF1QjtJQWdCbEMsSUFBSSxJQUFJO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUF1QjtRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJ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SSxZQUFZLFVBQVUsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7K0dBdE1VLHVCQUF1QjttR0FBdkIsdUJBQXVCLHVQQ2RwQywydURBc0RBOzs0RkR4Q2EsdUJBQXVCO2tCQUpuQyxTQUFTOytCQUNFLGtCQUFrQjs0R0FJVCxFQUFFO3NCQUFwQixTQUFTO3VCQUFDLE1BQU07Z0JBRVIsS0FBSztzQkFBYixLQUFLO2dCQUNhLGVBQWU7c0JBQWpDLE1BQU07Z0JBQ1ksUUFBUTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIG1hcCwgb2YsIFN1YmplY3QsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0aHJvd0Vycm9yLCB6aXB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1NGQ29tcG9uZW50LCBTRlZhbHVlQ2hhbmdlfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekZvcm1hdEVtaXRFdmVudCwgTnpUcmVlTm9kZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IGRlZmF1bHRTY2hlbWEgfSBmcm9tICcuL3l1bnphaS1yb2xlLXRyZWUuc2NoZW1hJztcbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlU2VydmljZSB9IGZyb20gJy4veXVuemFpLXJvbGUtdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlLCBZdW56YWlSb2xlVHJlZVByb3BzLCBZdW56YWlSb2xlVHJlZVN0YXRlIH0gZnJvbSAnLi95dW56YWktcm9sZS10cmVlLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLXJvbGUtdHJlZWAsXG4gIHRlbXBsYXRlVXJsOiBgLi95dW56YWktcm9sZS10cmVlLmh0bWxgXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVJvbGVUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm0nKSBzZiE6IFNGQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpUm9sZVRyZWVQcm9wcztcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uUXVlcnlDb21wbGV0ZTogRXZlbnRFbWl0dGVyPFl1bnphaVJvbGVUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpUm9sZVRyZWVbXT4oKTtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc3RhdGU6IFl1bnphaVJvbGVUcmVlU3RhdGUgPSB7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgc2NoZW1hOiBkZWZhdWx0U2NoZW1hLFxuICAgIGRhdGE6IFtdLFxuICAgIGRhdGFCYWNrdXA6IFtdLFxuICAgIGV4cGFuZEtleXM6IFtdLFxuICB9O1xuXG4gIGdldCBkYXRhKCk6IFl1bnphaVJvbGVUcmVlW10ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGF0YTtcbiAgfVxuXG4gIHNldCBkYXRhKHJvbGVzOiBZdW56YWlSb2xlVHJlZVtdKSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICB0aGlzLnByb3BzLmRhdGEgPSByb2xlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gcm9sZXM7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5vZGVzKCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSBhcyBhbnlbXTtcbiAgfVxuXG4gIGdldCBpc011bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLm11bHRpcGxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgcm9sZUdyb3VwQ29kZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMucm9sZUdyb3VwQ29kZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm9sZUdyb3VwQ29kZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBpc1dyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMud3JhcDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGlzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuZXhwYW5kO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvbGVUcmVlU2VydmljZTogWXVuemFpUm9sZVRyZWVTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcz8uZGF0YSkge1xuICAgICAgdGhpcy5xdWVyeSh0aGlzLnJvbGVHcm91cENvZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGFCYWNrdXAgPSB0aGlzLmRhdGE7XG4gICAgICB0aGlzLm1hcFJvbGVUcmVlKHRoaXMuZGF0YSBhcyBhbnkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvb2tGb3JtQ2hhbmdlKCk7XG4gIH1cblxuICBob29rRm9ybUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNmLmZvcm1WYWx1ZUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgodmFsdWVDaGFuZ2U6IFNGVmFsdWVDaGFuZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2YWx1ZTogeyBzZWFyY2ggfVxuICAgICAgICAgIH0gPSB2YWx1ZUNoYW5nZTtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB6aXAob2Yoc2VhcmNoKSwgb2YodGhpcy5zdGF0ZS5kYXRhQmFja3VwKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB6aXAob2Yoc2VhcmNoKSwgdGhpcy5yb2xlVHJlZVNlcnZpY2UudHJlZSh0aGlzLnJvbGVHcm91cENvZGUpKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoW3NlYXJjaCwgZGVwdHNdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgZGVwdHMgPSB0aGlzLnJlY3Vyc2lvblNlYXJjaChzZWFyY2gsIGRlcHRzKTtcbiAgICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZGVwdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcFJvbGVUcmVlKGRlcHRzIGFzIGFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gZGVwdHM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWN1cnNpb25TZWFyY2goc2VhcmNoOiBzdHJpbmcsIHJvbGVzOiBZdW56YWlSb2xlVHJlZVtdKTogWXVuemFpUm9sZVRyZWVbXSB7XG4gICAgY29uc3QgcmVzdWx0czogWXVuemFpUm9sZVRyZWVbXSA9IFtdO1xuICAgIGNvbnN0IHNlYXJjaEluUm9sZSA9IChyb2xlOiBZdW56YWlSb2xlVHJlZSkgPT4ge1xuICAgICAgaWYgKHJvbGUudGl0bGUuaW5jbHVkZXMoc2VhcmNoKSkge1xuICAgICAgICByZXN1bHRzLnB1c2gocm9sZSk7XG4gICAgICB9XG4gICAgICBpZiAocm9sZS5jaGlsZHJlbiAmJiByb2xlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiByb2xlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgc2VhcmNoSW5Sb2xlKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZm9yIChjb25zdCBkZXB0IG9mIHJvbGVzKSB7XG4gICAgICBzZWFyY2hJblJvbGUoZGVwdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgcXVlcnkocm9sZUdyb3VwQ29kZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9hZCgpO1xuICAgIHRoaXMucm9sZVRyZWVTZXJ2aWNlXG4gICAgICAudHJlZShyb2xlR3JvdXBDb2RlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgICAgbWFwKChyb2xlczogWXVuemFpUm9sZVRyZWVbXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cyA9IFtdO1xuICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQocm9sZXMpO1xuICAgICAgICAgIHRoaXMubWFwUm9sZVRyZWUocm9sZXMgYXMgYW55KTtcbiAgICAgICAgICB0aGlzLmRhdGEgPSByb2xlcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHVubG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG1hcFJvbGVUcmVlKHRyZWU6IE56VHJlZU5vZGVbXSkge1xuICAgIGlmICh0cmVlICYmIHRyZWUubGVuZ3RoICYmIHRyZWUubGVuZ3RoID4gMCkge1xuICAgICAgdHJlZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLnN0YXRlLmV4cGFuZEtleXMuaW5jbHVkZXMoaXRlbS5rZXkpKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzLnB1c2goaXRlbS5rZXkpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uaXNFeHBhbmRlZCA9IHRoaXMuaXNFeHBhbmRlZDtcbiAgICAgICAgaXRlbS5pc0xlYWYgPSBpdGVtLmNoaWxkcmVuID09PSBudWxsIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwO1xuICAgICAgICB0aGlzLm1hcFJvbGVUcmVlKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlTm9kZShkYXRhOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhLm5vZGUpIHtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChbZGF0YS5ub2RlLm9yaWdpbiBhcyBZdW56YWlSb2xlVHJlZV0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5ub2Rlcykge1xuICAgICAgY29uc3Qgcm9sZXM6IFl1bnphaVJvbGVUcmVlW10gPSBkYXRhLm5vZGVzLm1hcChuID0+IG4ub3JpZ2luIGFzIFl1bnphaVJvbGVUcmVlKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChyb2xlcyk7XG4gICAgfVxuICB9XG5cbiAgb3BlbihkYXRhOiBOelRyZWVOb2RlIHwgTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE56VHJlZU5vZGUpIHtcbiAgICAgIGRhdGEuaXNFeHBhbmRlZCA9ICFkYXRhLmlzRXhwYW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBub2RlLmlzRXhwYW5kZWQgPSAhbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIiwiPCEtLSBsb2FkaW5nLS0+XG48bnotc3BpbiBbbnpTcGlubmluZ109XCJzdGF0ZS5sb2FkaW5nXCI+XG4gIDwhLS0gICAgICAgIHdyYXBwZWQtLT5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzV3JhcHBlZFwiPlxuICAgIDxuei1jYXJkPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uei1jYXJkPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPCEtLSAgICAgICAgZW5kIHdyYXBwZWQtLT5cblxuICA8IS0tICAgICAgICB1bndyYXBwZWQtLT5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1dyYXBwZWRcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDwhLS0gICAgICAgIGVuZCB1bndyYXBwZWQtLT5cbjwvbnotc3Bpbj5cbjwhLS0gZW5kIGxvYWRpbmctLT5cblxuPCEtLSAgICAgIGNvbnRlbnQtLT5cbjxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJyb2xlRm9ybVwiPjwvbmctY29udGFpbmVyPlxuICA8bnotdHJlZVxuICAgICpuZ0lmPVwibm9kZXMubGVuZ3RoID4gMFwiXG4gICAgKG56Q2xpY2spPVwiYWN0aXZlTm9kZSgkZXZlbnQpXCJcbiAgICBbbnpFeHBhbmRlZEtleXNdPVwic3RhdGUuZXhwYW5kS2V5c1wiXG4gICAgW256RGF0YV09XCJub2Rlc1wiXG4gICAgW256U2hvd0xpbmVdPVwidHJ1ZVwiXG4gICAgW256TXVsdGlwbGVdPVwiaXNNdWx0aXBsZVwiXG4gICAgW256RXhwYW5kZWRJY29uXT1cImJsYW5rXCJcbiAgICBbbnpCbG9ja05vZGVdPVwidHJ1ZVwiXG4gICAgW256SGlkZVVuTWF0Y2hlZF09XCJ0cnVlXCJcbiAgICBbbnpUcmVlVGVtcGxhdGVdPVwidHJlZVRlbXBsYXRlXCJcbiAgPjwvbnotdHJlZT5cbiAgPG56LWVtcHR5ICpuZ0lmPVwibm9kZXMubGVuZ3RoID09PSAwXCI+PC9uei1lbXB0eT5cbjwvbmctdGVtcGxhdGU+XG48IS0tICAgICAgZW5kIGNvbnRlbnQtLT5cblxuPCEtLSAgICAgIHRyZWUgLS0+XG48bmctdGVtcGxhdGUgI3RyZWVUZW1wbGF0ZSBsZXQtbm9kZSBsZXQtb3JpZ2luPVwib3JpZ2luXCI+XG4gIDxzcGFuICpuZ0lmPVwiIW5vZGUuaXNMZWFmXCIgW3RpdGxlXT1cIm5vZGUudGl0bGVcIj5cbiAgICA8aSBuei1pY29uIG56VGhlbWU9XCJ0d290b25lXCIgW256VHlwZV09XCJub2RlLmlzRXhwYW5kZWQgPyAnbWludXMtc3F1YXJlJyA6ICdwbHVzLXNxdWFyZSdcIiAoY2xpY2spPVwib3Blbihub2RlKVwiPjwvaT5cbiAgICA8c3BhbiBjbGFzcz1cImxlYWYtbmFtZVwiPnt7IG5vZGUudGl0bGUgfX08L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gKm5nSWY9XCJub2RlLmlzTGVhZlwiIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJmaWxlXCIgbnpUaGVtZT1cInR3b3RvbmVcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICA8L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuPCEtLSAgICAgIGVuZCB0cmVlLS0+XG5cbjxuZy10ZW1wbGF0ZSAjcm9sZUZvcm0+XG4gIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCI+PC9zZj5cbjwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2JsYW5rPjwvbmctdGVtcGxhdGU+XG4iXX0=