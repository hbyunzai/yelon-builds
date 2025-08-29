import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable, EventEmitter, Output, Input, ViewChild, Component, NgModule } from '@angular/core';
import { map, Subject, takeUntil, debounceTime, switchMap, zip, of, catchError, throwError } from 'rxjs';
import * as i2 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i3 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i5 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i6 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeModule } from 'ng-zorro-antd/tree';
import { _HttpClient } from '@yelon/theme';

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

var YunzaiDormitoryTreeType;
(function (YunzaiDormitoryTreeType) {
    YunzaiDormitoryTreeType[YunzaiDormitoryTreeType["BUILDING"] = 0] = "BUILDING";
    YunzaiDormitoryTreeType[YunzaiDormitoryTreeType["BUILDING_FLOOR"] = 1] = "BUILDING_FLOOR";
    YunzaiDormitoryTreeType[YunzaiDormitoryTreeType["BUILDING_FLOORS_ROOMS"] = 2] = "BUILDING_FLOORS_ROOMS";
})(YunzaiDormitoryTreeType || (YunzaiDormitoryTreeType = {}));

class YunzaiDormitoryTreeService {
    http = inject(_HttpClient);
    tree(param = {
        isPower: false,
        treeType: YunzaiDormitoryTreeType.BUILDING_FLOORS_ROOMS
    }) {
        return this.http.post(`/auth/dorm/tree`, param).pipe(map((response) => {
            return response.data;
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeService, decorators: [{
            type: Injectable
        }] });

class YunzaiDormitoryTreeComponent {
    sf;
    props;
    onQueryComplete = new EventEmitter();
    onSelect = new EventEmitter();
    service = inject(YunzaiDormitoryTreeService);
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
    set data(dorms) {
        if (this.props && this.props.data) {
            this.props.data = dorms;
        }
        else {
            this.state.data = dorms;
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
    get param() {
        if (this.props && this.props.param) {
            return this.props.param;
        }
        return { isPower: false, treeType: YunzaiDormitoryTreeType.BUILDING_FLOORS_ROOMS };
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
            this.query(this.param);
        }
        else {
            this.state.dataBackup = this.data;
            this.mapDormTree(this.data);
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
            return zip(of(search), this.service.tree(this.param));
        }), map(([search, dorms]) => {
            this.state.expandKeys = [];
            if (search && search.trim() !== '') {
                dorms = this.recursionSearch(search, dorms);
                this.onQueryComplete.emit(dorms);
            }
            this.mapDormTree(dorms);
            this.data = dorms;
        }), catchError(error => {
            this.unload();
            return throwError(error);
        }))
            .subscribe(() => {
            this.unload();
        });
    }
    recursionSearch(search, dorms) {
        const results = [];
        const searchInDorm = (dorm) => {
            if (dorm.title.includes(search)) {
                results.push(dorm);
            }
            if (dorm.children && dorm.children.length > 0) {
                for (const child of dorm.children) {
                    searchInDorm(child);
                }
            }
        };
        for (const dorm of dorms) {
            searchInDorm(dorm);
        }
        return results;
    }
    query(param) {
        this.load();
        this.service
            .tree(param)
            .pipe(takeUntil(this.$destroy), map((dorms) => {
            this.state.expandKeys = [];
            this.onQueryComplete.emit(dorms);
            this.mapDormTree(dorms);
            this.data = dorms;
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
    mapDormTree(tree) {
        if (tree && tree.length && tree.length > 0) {
            tree.forEach(item => {
                if (this.isExpanded && !this.state.expandKeys.includes(item.key)) {
                    this.state.expandKeys.push(item.key);
                }
                item.isExpanded = this.isExpanded;
                item.isLeaf = item.children === null || item.children.length === 0;
                this.mapDormTree(item.children);
            });
        }
    }
    activeNode(data) {
        if (data.node) {
            this.onSelect.emit([data.node.origin]);
        }
        else if (data.nodes) {
            const dorms = data.nodes.map(n => n.origin);
            this.onSelect.emit(dorms);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.1.3", type: YunzaiDormitoryTreeComponent, isStandalone: true, selector: "yunzai-dormitory-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiDormitoryTreeService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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
      <ng-container [ngTemplateOutlet]="dormitoryForm" />
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
          [nzTreeTemplate]="treeTemplate" />
      } @else {
        <nz-empty />
      }
    </ng-template>

    <ng-template #treeTemplate let-node let-origin="origin">
      @if (!node.isLeaf) {
        <span [title]="node.title">
          <i nz-icon nzTheme="twotone" [nzType]="node.isExpanded ? 'minus-square' : 'plus-square'" (click)="open(node)"></i>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      } @else {
        <span [title]="node.title">
          <span nz-icon nzType="file" nzTheme="twotone"></span>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      }
    </ng-template>

    <ng-template #dormitoryForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i2.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i3.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i4.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i5.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckboxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-dormitory-tree`,
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
      <ng-container [ngTemplateOutlet]="dormitoryForm" />
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
          [nzTreeTemplate]="treeTemplate" />
      } @else {
        <nz-empty />
      }
    </ng-template>

    <ng-template #treeTemplate let-node let-origin="origin">
      @if (!node.isLeaf) {
        <span [title]="node.title">
          <i nz-icon nzTheme="twotone" [nzType]="node.isExpanded ? 'minus-square' : 'plus-square'" (click)="open(node)"></i>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      } @else {
        <span [title]="node.title">
          <span nz-icon nzType="file" nzTheme="twotone"></span>
          <span class="leaf-name">{{ node.title }}</span>
        </span>
      }
    </ng-template>

    <ng-template #dormitoryForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    providers: [YunzaiDormitoryTreeService],
                    imports: [NzSpinModule, YelonFormModule, NzCardModule, NzIconModule, NzEmptyModule, NzTreeModule, CommonModule]
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

const COMPONENTS = [YunzaiDormitoryTreeComponent];
class YunzaiDormitoryTreeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeModule, imports: [YunzaiDormitoryTreeComponent], exports: [YunzaiDormitoryTreeComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeModule, providers: [YunzaiDormitoryTreeService], imports: [COMPONENTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: YunzaiDormitoryTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...COMPONENTS],
                    providers: [YunzaiDormitoryTreeService],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiDormitoryTreeComponent, YunzaiDormitoryTreeModule, YunzaiDormitoryTreeService, YunzaiDormitoryTreeType, defaultSchema };
//# sourceMappingURL=yunzai-dormitory-tree.mjs.map
