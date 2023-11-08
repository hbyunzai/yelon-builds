import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { map, Subject, takeUntil, debounceTime, switchMap, zip, of, catchError, throwError } from 'rxjs';
import * as i1 from '@yelon/theme';
import * as i3 from 'ng-zorro-antd/tree';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/core/transition-patch';
import * as i5 from 'ng-zorro-antd/icon';
import * as i6 from 'ng-zorro-antd/card';
import * as i7 from 'ng-zorro-antd/spin';
import * as i8 from 'ng-zorro-antd/empty';
import * as i9 from '@yelon/form';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';

class YunzaiRoleTreeService {
    constructor(http) {
        this.http = http;
    }
    tree(roleGroupCode) {
        return this.http.post(`/auth/baseRole/findGroupRole`, { roleGroupCode: roleGroupCode }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });

const defaultSchema = {
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

class YunzaiRoleTreeComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeComponent, deps: [{ token: YunzaiRoleTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiRoleTreeComponent, selector: "yunzai-role-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"roleForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #roleForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i6.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i7.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "component", type: i8.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i9.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-role-tree`, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"roleForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #roleForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: YunzaiRoleTreeService }]; }, propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

class YunzaiRoleTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, declarations: [YunzaiRoleTreeComponent], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule], exports: [YunzaiRoleTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        RouterModule,
                        ReactiveFormsModule,
                        YunzaiSharedZorroModule,
                        YunzaiSharedYelonModule
                    ],
                    declarations: [YunzaiRoleTreeComponent],
                    exports: [YunzaiRoleTreeComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiRoleTreeComponent, YunzaiRoleTreeModule, YunzaiRoleTreeService, defaultSchema };
//# sourceMappingURL=yunzai-role-tree.mjs.map
