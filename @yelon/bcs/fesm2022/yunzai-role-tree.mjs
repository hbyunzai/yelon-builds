import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { map, Subject, takeUntil, debounceTime, switchMap, zip, of, catchError, throwError } from 'rxjs';
import * as i1 from '@yelon/theme';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i8 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i6 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i5 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i3 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i7 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeModule } from 'ng-zorro-antd/tree';

class YunzaiRoleTreeService {
    constructor(http) {
        this.http = http;
    }
    tree(roleGroupCode) {
        return this.http.post(`/auth/baseRole/findGroupRole`, { roleGroupCode: roleGroupCode }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });

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
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: defaultSchema,
            data: [],
            dataBackup: [],
            expandKeys: []
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeComponent, deps: [{ token: YunzaiRoleTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiRoleTreeComponent, isStandalone: true, selector: "yunzai-role-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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
      <ng-container [ngTemplateOutlet]="roleForm" />
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

    <ng-template #roleForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i3.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i4.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i6.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i7.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i8.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-role-tree`,
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
      <ng-container [ngTemplateOutlet]="roleForm" />
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

    <ng-template #roleForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    standalone: true,
                    imports: [CommonModule, NzSpinModule, YelonFormModule, NzIconModule, NzEmptyModule, NzTreeModule, NzCardModule]
                }]
        }], ctorParameters: () => [{ type: YunzaiRoleTreeService }], propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });

const COMPONENTS = [YunzaiRoleTreeComponent];
class YunzaiRoleTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, imports: [CommonModule,
            NzSpinModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzCardModule, YunzaiRoleTreeComponent], exports: [YunzaiRoleTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, imports: [CommonModule,
            NzSpinModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NzSpinModule,
                        YelonFormModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiRoleTreeComponent, YunzaiRoleTreeModule, YunzaiRoleTreeService, defaultSchema };
//# sourceMappingURL=yunzai-role-tree.mjs.map
