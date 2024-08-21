import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { defaultSchema } from './yunzai-dormitory-tree.schema';
import { YunzaiDormitoryTreeService } from './yunzai-dormitory-tree.service';
import { YunzaiDormitoryTreeType } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/spin";
import * as i2 from "@yelon/form";
import * as i3 from "ng-zorro-antd/card";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/empty";
import * as i6 from "ng-zorro-antd/tree";
import * as i7 from "@angular/common";
export class YunzaiDormitoryTreeComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.service = inject(YunzaiDormitoryTreeService);
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: defaultSchema,
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiDormitoryTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0", type: YunzaiDormitoryTreeComponent, isStandalone: true, selector: "yunzai-dormitory-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiDormitoryTreeService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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

    <ng-template #dormitoryForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i2.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i3.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i5.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiDormitoryTreeComponent, decorators: [{
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

    <ng-template #dormitoryForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
    <ng-template #blank />
  `,
                    standalone: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUveXVuemFpLWRvcm1pdG9yeS10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV6RyxPQUFPLEVBQThCLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFxQixZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFLTCx1QkFBdUIsRUFDeEIsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7O0FBNkR2QyxNQUFNLE9BQU8sNEJBQTRCO0lBNUR6QztRQWdFRSwrREFB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R0F2TVUsNEJBQTRCO2tHQUE1Qiw0QkFBNEIsdUtBSDVCLENBQUMsMEJBQTBCLENBQUMsc0hBdkQ3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxRFQsMkRBR1MsWUFBWSwyTUFBRSxlQUFlLDBZQUFFLFlBQVksK1FBQUUsWUFBWSxpTkFBRSxhQUFhLG1NQUFFLFlBQVksazBCQUFFLFlBQVk7OzJGQUVuRyw0QkFBNEI7a0JBNUR4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxRFQ7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUN2QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7aUJBQ2hIOzhCQUVvQixFQUFFO3NCQUFwQixTQUFTO3VCQUFDLE1BQU07Z0JBRVIsS0FBSztzQkFBYixLQUFLO2dCQUVhLGVBQWU7c0JBQWpDLE1BQU07Z0JBRVksUUFBUTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgaW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBtYXAsIG9mLCBTdWJqZWN0LCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGhyb3dFcnJvciwgemlwIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNGQ29tcG9uZW50LCBTRlZhbHVlQ2hhbmdlLCBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RW1wdHlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2VtcHR5JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelNwaW5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3NwaW4nO1xuaW1wb3J0IHsgTnpGb3JtYXRFbWl0RXZlbnQsIE56VHJlZU1vZHVsZSwgTnpUcmVlTm9kZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IGRlZmF1bHRTY2hlbWEgfSBmcm9tICcuL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zY2hlbWEnO1xuaW1wb3J0IHsgWXVuemFpRG9ybWl0b3J5VHJlZVNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFl1bnphaURvcm1pdG9yeVRyZWUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVQYXJhbSxcbiAgWXVuemFpRG9ybWl0b3J5VHJlZVByb3BzLFxuICBZdW56YWlEb3JtaXRvcnlUcmVlU3RhdGUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVUeXBlXG59IGZyb20gJy4veXVuemFpLWRvcm1pdG9yeS10cmVlLnR5cGVzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1kb3JtaXRvcnktdHJlZWAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXNwaW4gW256U3Bpbm5pbmddPVwic3RhdGUubG9hZGluZ1wiPlxuICAgICAgQGlmIChpc1dyYXBwZWQpIHtcbiAgICAgICAgPG56LWNhcmQ+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgICAgPC9uei1jYXJkPlxuICAgICAgfSBAZWxzZSB7XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiIC8+XG4gICAgICB9XG4gICAgPC9uei1zcGluPlxuXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJkb3JtaXRvcnlGb3JtXCIgLz5cbiAgICAgIEBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICA8bnotdHJlZVxuICAgICAgICAgIChuekNsaWNrKT1cImFjdGl2ZU5vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgW256RXhwYW5kZWRLZXlzXT1cInN0YXRlLmV4cGFuZEtleXNcIlxuICAgICAgICAgIFtuekRhdGFdPVwibm9kZXNcIlxuICAgICAgICAgIFtuelNob3dMaW5lXT1cInRydWVcIlxuICAgICAgICAgIFtuek11bHRpcGxlXT1cImlzTXVsdGlwbGVcIlxuICAgICAgICAgIFtuekV4cGFuZGVkSWNvbl09XCJibGFua1wiXG4gICAgICAgICAgW256QmxvY2tOb2RlXT1cInRydWVcIlxuICAgICAgICAgIFtuekhpZGVVbk1hdGNoZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgW256VHJlZVRlbXBsYXRlXT1cInRyZWVUZW1wbGF0ZVwiXG4gICAgICAgIC8+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPG56LWVtcHR5IC8+XG4gICAgICB9XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjdHJlZVRlbXBsYXRlIGxldC1ub2RlIGxldC1vcmlnaW49XCJvcmlnaW5cIj5cbiAgICAgIEBpZiAoIW5vZGUuaXNMZWFmKSB7XG4gICAgICAgIDxzcGFuIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgICAgICAgPGlcbiAgICAgICAgICAgIG56LWljb25cbiAgICAgICAgICAgIG56VGhlbWU9XCJ0d290b25lXCJcbiAgICAgICAgICAgIFtuelR5cGVdPVwibm9kZS5pc0V4cGFuZGVkID8gJ21pbnVzLXNxdWFyZScgOiAncGx1cy1zcXVhcmUnXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcGVuKG5vZGUpXCJcbiAgICAgICAgICA+PC9pPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGVhZi1uYW1lXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgfSBAZWxzZSB7XG4gICAgICAgIDxzcGFuIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgICAgICAgPHNwYW4gbnotaWNvbiBuelR5cGU9XCJmaWxlXCIgbnpUaGVtZT1cInR3b3RvbmVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICB9XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZG9ybWl0b3J5Rm9ybT5cbiAgICAgIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjYmxhbmsgLz5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgcHJvdmlkZXJzOiBbWXVuemFpRG9ybWl0b3J5VHJlZVNlcnZpY2VdLFxuICBpbXBvcnRzOiBbTnpTcGluTW9kdWxlLCBZZWxvbkZvcm1Nb2R1bGUsIE56Q2FyZE1vZHVsZSwgTnpJY29uTW9kdWxlLCBOekVtcHR5TW9kdWxlLCBOelRyZWVNb2R1bGUsIENvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpRG9ybWl0b3J5VHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnZm9ybScpIHNmITogU0ZDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgcHJvcHM/OiBZdW56YWlEb3JtaXRvcnlUcmVlUHJvcHM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25RdWVyeUNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2U6IFl1bnphaURvcm1pdG9yeVRyZWVTZXJ2aWNlID0gaW5qZWN0KFl1bnphaURvcm1pdG9yeVRyZWVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc3RhdGU6IFl1bnphaURvcm1pdG9yeVRyZWVTdGF0ZSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzY2hlbWE6IGRlZmF1bHRTY2hlbWEsXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgZXhwYW5kS2V5czogW11cbiAgfTtcblxuICBnZXQgZGF0YSgpOiBZdW56YWlEb3JtaXRvcnlUcmVlW10ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGF0YTtcbiAgfVxuXG4gIHNldCBkYXRhKGRvcm1zOiBZdW56YWlEb3JtaXRvcnlUcmVlW10pIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YSA9IGRvcm1zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGEgPSBkb3JtcztcbiAgICB9XG4gIH1cblxuICBnZXQgbm9kZXMoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhIGFzIE56U2FmZUFueVtdO1xuICB9XG5cbiAgZ2V0IGlzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMubXVsdGlwbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBwYXJhbSgpOiBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMucGFyYW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnBhcmFtO1xuICAgIH1cbiAgICByZXR1cm4geyBpc1Bvd2VyOiBmYWxzZSwgdHJlZVR5cGU6IFl1bnphaURvcm1pdG9yeVRyZWVUeXBlLkJVSUxESU5HX0ZMT09SU19ST09NUyB9O1xuICB9XG5cbiAgZ2V0IGlzV3JhcHBlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy53cmFwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5leHBhbmQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcz8uZGF0YSkge1xuICAgICAgdGhpcy5xdWVyeSh0aGlzLnBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gdGhpcy5kYXRhO1xuICAgICAgdGhpcy5tYXBEb3JtVHJlZSh0aGlzLmRhdGEgYXMgTnpTYWZlQW55KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ob29rRm9ybUNoYW5nZSgpO1xuICB9XG5cbiAgaG9va0Zvcm1DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZi5mb3JtVmFsdWVDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKHZhbHVlQ2hhbmdlOiBTRlZhbHVlQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmFsdWU6IHsgc2VhcmNoIH1cbiAgICAgICAgICB9ID0gdmFsdWVDaGFuZ2U7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIG9mKHRoaXMuc3RhdGUuZGF0YUJhY2t1cCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIHRoaXMuc2VydmljZS50cmVlKHRoaXMucGFyYW0pKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoW3NlYXJjaCwgZG9ybXNdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgZG9ybXMgPSB0aGlzLnJlY3Vyc2lvblNlYXJjaChzZWFyY2gsIGRvcm1zKTtcbiAgICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZG9ybXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcERvcm1UcmVlKGRvcm1zIGFzIE56U2FmZUFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gZG9ybXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWN1cnNpb25TZWFyY2goc2VhcmNoOiBzdHJpbmcsIGRvcm1zOiBZdW56YWlEb3JtaXRvcnlUcmVlW10pOiBZdW56YWlEb3JtaXRvcnlUcmVlW10ge1xuICAgIGNvbnN0IHJlc3VsdHM6IFl1bnphaURvcm1pdG9yeVRyZWVbXSA9IFtdO1xuICAgIGNvbnN0IHNlYXJjaEluRG9ybSA9IChkb3JtOiBZdW56YWlEb3JtaXRvcnlUcmVlKTogdm9pZCA9PiB7XG4gICAgICBpZiAoZG9ybS50aXRsZS5pbmNsdWRlcyhzZWFyY2gpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChkb3JtKTtcbiAgICAgIH1cbiAgICAgIGlmIChkb3JtLmNoaWxkcmVuICYmIGRvcm0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGRvcm0uY2hpbGRyZW4pIHtcbiAgICAgICAgICBzZWFyY2hJbkRvcm0oY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IGRvcm0gb2YgZG9ybXMpIHtcbiAgICAgIHNlYXJjaEluRG9ybShkb3JtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBxdWVyeShwYXJhbTogWXVuemFpRG9ybWl0b3J5VHJlZVBhcmFtKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5zZXJ2aWNlXG4gICAgICAudHJlZShwYXJhbSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIG1hcCgoZG9ybXM6IFl1bnphaURvcm1pdG9yeVRyZWVbXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cyA9IFtdO1xuICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZG9ybXMpO1xuICAgICAgICAgIHRoaXMubWFwRG9ybVRyZWUoZG9ybXMgYXMgTnpTYWZlQW55KTtcbiAgICAgICAgICB0aGlzLmRhdGEgPSBkb3JtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHVubG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG1hcERvcm1UcmVlKHRyZWU6IE56VHJlZU5vZGVbXSk6IHZvaWQge1xuICAgIGlmICh0cmVlICYmIHRyZWUubGVuZ3RoICYmIHRyZWUubGVuZ3RoID4gMCkge1xuICAgICAgdHJlZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLnN0YXRlLmV4cGFuZEtleXMuaW5jbHVkZXMoaXRlbS5rZXkpKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzLnB1c2goaXRlbS5rZXkpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uaXNFeHBhbmRlZCA9IHRoaXMuaXNFeHBhbmRlZDtcbiAgICAgICAgaXRlbS5pc0xlYWYgPSBpdGVtLmNoaWxkcmVuID09PSBudWxsIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwO1xuICAgICAgICB0aGlzLm1hcERvcm1UcmVlKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlTm9kZShkYXRhOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhLm5vZGUpIHtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChbZGF0YS5ub2RlLm9yaWdpbiBhcyBZdW56YWlEb3JtaXRvcnlUcmVlXSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLm5vZGVzKSB7XG4gICAgICBjb25zdCBkb3JtczogWXVuemFpRG9ybWl0b3J5VHJlZVtdID0gZGF0YS5ub2Rlcy5tYXAobiA9PiBuLm9yaWdpbiBhcyBZdW56YWlEb3JtaXRvcnlUcmVlKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkb3Jtcyk7XG4gICAgfVxuICB9XG5cbiAgb3BlbihkYXRhOiBOelRyZWVOb2RlIHwgTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE56VHJlZU5vZGUpIHtcbiAgICAgIGRhdGEuaXNFeHBhbmRlZCA9ICFkYXRhLmlzRXhwYW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBub2RlLmlzRXhwYW5kZWQgPSAhbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19