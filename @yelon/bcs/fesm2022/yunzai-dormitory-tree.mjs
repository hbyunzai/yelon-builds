import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { map, Subject, takeUntil, debounceTime, switchMap, zip, of, catchError, throwError } from 'rxjs';
import * as i3 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i8 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i5 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i7 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i6 from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeModule } from 'ng-zorro-antd/tree';
import * as i1 from '@yelon/theme';

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
    constructor(http) {
        this.http = http;
    }
    tree(param = {
        isPower: false,
        treeType: YunzaiDormitoryTreeType.BUILDING_FLOORS_ROOMS
    }) {
        return this.http.post(`/auth/dorm/tree`, param).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });

class YunzaiDormitoryTreeComponent {
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
    constructor(dormitoryService) {
        this.dormitoryService = dormitoryService;
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
            return zip(of(search), this.dormitoryService.tree(this.param));
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
        this.dormitoryService
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeComponent, deps: [{ token: YunzaiDormitoryTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiDormitoryTreeComponent, isStandalone: true, selector: "yunzai-dormitory-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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
      <ng-container [ngTemplateOutlet]="dormitoryForm" />
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

    <ng-template #dormitoryForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i3.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i5.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i7.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i8.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-dormitory-tree`,
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
      <ng-container [ngTemplateOutlet]="dormitoryForm" />
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

    <ng-template #dormitoryForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    standalone: true,
                    imports: [CommonModule, YelonFormModule, NzIconModule, NzEmptyModule, NzTreeModule, NzSpinModule, NzCardModule]
                }]
        }], ctorParameters: () => [{ type: YunzaiDormitoryTreeService }], propDecorators: { sf: [{
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, imports: [CommonModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzSpinModule,
            NzCardModule, YunzaiDormitoryTreeComponent], exports: [YunzaiDormitoryTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, imports: [CommonModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzSpinModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        YelonFormModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        NzSpinModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiDormitoryTreeComponent, YunzaiDormitoryTreeModule, YunzaiDormitoryTreeService, YunzaiDormitoryTreeType, defaultSchema };
//# sourceMappingURL=yunzai-dormitory-tree.mjs.map
