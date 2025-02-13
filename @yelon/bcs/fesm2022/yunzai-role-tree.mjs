import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable, EventEmitter, Output, Input, ViewChild, Component, NgModule } from '@angular/core';
import * as i2 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i8 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i5 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i6 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeModule } from 'ng-zorro-antd/tree';
import { map, Subject, takeUntil, debounceTime, switchMap, zip, of, catchError, throwError } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
import * as i3 from 'ng-zorro-antd/core/transition-patch';

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

class YunzaiRoleTreeService {
    http = inject(_HttpClient);
    tree(roleGroupCode) {
        return this.http.post(`/auth/baseRole/findGroupRole`, { roleGroupCode: roleGroupCode }).pipe(map((response) => {
            return response.data;
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeService, decorators: [{
            type: Injectable
        }] });

class YunzaiRoleTreeComponent {
    sf;
    props;
    onQueryComplete = new EventEmitter();
    onSelect = new EventEmitter();
    service = inject(YunzaiRoleTreeService);
    $destroy = new Subject();
    state = {
        loading: false,
        schema: defaultSchema,
        data: [],
        dataBackup: [],
        expandKeys: []
    };
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
            return zip(of(search), this.service.tree(this.roleGroupCode));
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
        this.service
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.1.5", type: YunzaiRoleTreeComponent, isStandalone: true, selector: "yunzai-role-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiRoleTreeService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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
      <ng-container [ngTemplateOutlet]="roleForm" />
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

    <ng-template #roleForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i2.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i4.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i5.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckboxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i8.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-role-tree`,
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
      <ng-container [ngTemplateOutlet]="roleForm" />
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

    <ng-template #roleForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    standalone: true,
                    imports: [
                        NzSpinModule,
                        YelonFormModule,
                        NzButtonModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        CommonModule,
                        NzCardModule
                    ],
                    providers: [YunzaiRoleTreeService]
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

const COMPONENTS = [YunzaiRoleTreeComponent];
class YunzaiRoleTreeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeModule, imports: [NzSpinModule,
            YelonFormModule,
            NzButtonModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            CommonModule,
            NzCardModule, YunzaiRoleTreeComponent], exports: [YunzaiRoleTreeComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeModule, providers: [YunzaiRoleTreeService], imports: [NzSpinModule,
            YelonFormModule,
            NzButtonModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            CommonModule,
            NzCardModule, COMPONENTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.5", ngImport: i0, type: YunzaiRoleTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzSpinModule,
                        YelonFormModule,
                        NzButtonModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        CommonModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    providers: [YunzaiRoleTreeService],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiRoleTreeComponent, YunzaiRoleTreeModule, YunzaiRoleTreeService, defaultSchema };
//# sourceMappingURL=yunzai-role-tree.mjs.map
