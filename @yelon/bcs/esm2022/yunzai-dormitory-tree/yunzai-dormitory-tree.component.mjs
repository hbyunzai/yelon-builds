import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { defaultSchema } from './yunzai-dormitory-tree.schema';
import { YunzaiDormitoryTreeType } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-dormitory-tree.service";
import * as i2 from "@angular/common";
import * as i3 from "@yelon/form";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/empty";
import * as i6 from "ng-zorro-antd/tree";
import * as i7 from "ng-zorro-antd/spin";
import * as i8 from "ng-zorro-antd/card";
export class YunzaiDormitoryTreeComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeComponent, deps: [{ token: i1.YunzaiDormitoryTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
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
        }], ctorParameters: () => [{ type: i1.YunzaiDormitoryTreeService }], propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUveXVuemFpLWRvcm1pdG9yeS10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFekcsT0FBTyxFQUE4QixlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBcUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUvRCxPQUFPLEVBS0wsdUJBQXVCLEVBQ3hCLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7QUFvRXZDLE1BQU0sT0FBTyw0QkFBNEI7SUFrQnZDLElBQUksSUFBSTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERULDJEQUVTLFlBQVkseVNBQUUsZUFBZSwwWUFBRSxZQUFZLGlOQUFFLGFBQWEsbU1BQUUsWUFBWSxrMEJBQUUsWUFBWSwyTUFBRSxZQUFZOzsyRkFFbkcsNEJBQTRCO2tCQWxFeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTREVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO2lCQUNoSDsrRkFFb0IsRUFBRTtzQkFBcEIsU0FBUzt1QkFBQyxNQUFNO2dCQUVSLEtBQUs7c0JBQWIsS0FBSztnQkFFYSxlQUFlO3NCQUFqQyxNQUFNO2dCQUVZLFFBQVE7c0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgbWFwLCBvZiwgU3ViamVjdCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRocm93RXJyb3IsIHppcCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBTRkNvbXBvbmVudCwgU0ZWYWx1ZUNoYW5nZSwgWWVsb25Gb3JtTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Zvcm0nO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcbmltcG9ydCB7IE56Rm9ybWF0RW1pdEV2ZW50LCBOelRyZWVNb2R1bGUsIE56VHJlZU5vZGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBkZWZhdWx0U2NoZW1hIH0gZnJvbSAnLi95dW56YWktZG9ybWl0b3J5LXRyZWUuc2NoZW1hJztcbmltcG9ydCB7IFl1bnphaURvcm1pdG9yeVRyZWVTZXJ2aWNlIH0gZnJvbSAnLi95dW56YWktZG9ybWl0b3J5LXRyZWUuc2VydmljZSc7XG5pbXBvcnQge1xuICBZdW56YWlEb3JtaXRvcnlUcmVlLFxuICBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0sXG4gIFl1bnphaURvcm1pdG9yeVRyZWVQcm9wcyxcbiAgWXVuemFpRG9ybWl0b3J5VHJlZVN0YXRlLFxuICBZdW56YWlEb3JtaXRvcnlUcmVlVHlwZVxufSBmcm9tICcuL3l1bnphaS1kb3JtaXRvcnktdHJlZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1kb3JtaXRvcnktdHJlZWAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBsb2FkaW5nLS0+XG4gICAgPG56LXNwaW4gW256U3Bpbm5pbmddPVwic3RhdGUubG9hZGluZ1wiPlxuICAgICAgPCEtLSAgICAgICAgd3JhcHBlZC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzV3JhcHBlZFwiPlxuICAgICAgICA8bnotY2FyZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgICA8L256LWNhcmQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwhLS0gICAgICAgIGVuZCB3cmFwcGVkLS0+XG5cbiAgICAgIDwhLS0gICAgICAgIHVud3JhcHBlZC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1dyYXBwZWRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPCEtLSAgICAgICAgZW5kIHVud3JhcHBlZC0tPlxuICAgIDwvbnotc3Bpbj5cbiAgICA8IS0tIGVuZCBsb2FkaW5nLS0+XG5cbiAgICA8IS0tICAgICAgY29udGVudC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZG9ybWl0b3J5Rm9ybVwiIC8+XG4gICAgICA8bnotdHJlZVxuICAgICAgICAqbmdJZj1cIm5vZGVzLmxlbmd0aCA+IDBcIlxuICAgICAgICAobnpDbGljayk9XCJhY3RpdmVOb2RlKCRldmVudClcIlxuICAgICAgICBbbnpFeHBhbmRlZEtleXNdPVwic3RhdGUuZXhwYW5kS2V5c1wiXG4gICAgICAgIFtuekRhdGFdPVwibm9kZXNcIlxuICAgICAgICBbbnpTaG93TGluZV09XCJ0cnVlXCJcbiAgICAgICAgW256TXVsdGlwbGVdPVwiaXNNdWx0aXBsZVwiXG4gICAgICAgIFtuekV4cGFuZGVkSWNvbl09XCJibGFua1wiXG4gICAgICAgIFtuekJsb2NrTm9kZV09XCJ0cnVlXCJcbiAgICAgICAgW256SGlkZVVuTWF0Y2hlZF09XCJ0cnVlXCJcbiAgICAgICAgW256VHJlZVRlbXBsYXRlXT1cInRyZWVUZW1wbGF0ZVwiXG4gICAgICAvPlxuICAgICAgPG56LWVtcHR5ICpuZ0lmPVwibm9kZXMubGVuZ3RoID09PSAwXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwhLS0gICAgICBlbmQgY29udGVudC0tPlxuXG4gICAgPCEtLSAgICAgIHRyZWUgLS0+XG4gICAgPG5nLXRlbXBsYXRlICN0cmVlVGVtcGxhdGUgbGV0LW5vZGUgbGV0LW9yaWdpbj1cIm9yaWdpblwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCIhbm9kZS5pc0xlYWZcIiBbdGl0bGVdPVwibm9kZS50aXRsZVwiPlxuICAgICAgICA8aVxuICAgICAgICAgIG56LWljb25cbiAgICAgICAgICBuelRoZW1lPVwidHdvdG9uZVwiXG4gICAgICAgICAgW256VHlwZV09XCJub2RlLmlzRXhwYW5kZWQgPyAnbWludXMtc3F1YXJlJyA6ICdwbHVzLXNxdWFyZSdcIlxuICAgICAgICAgIChjbGljayk9XCJvcGVuKG5vZGUpXCJcbiAgICAgICAgPjwvaT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJub2RlLmlzTGVhZlwiIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwiZmlsZVwiIG56VGhlbWU9XCJ0d290b25lXCI+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlYWYtbmFtZVwiPnt7IG5vZGUudGl0bGUgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tICAgICAgZW5kIHRyZWUtLT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZG9ybWl0b3J5Rm9ybT5cbiAgICAgIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjYmxhbmsgLz5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgWWVsb25Gb3JtTW9kdWxlLCBOekljb25Nb2R1bGUsIE56RW1wdHlNb2R1bGUsIE56VHJlZU1vZHVsZSwgTnpTcGluTW9kdWxlLCBOekNhcmRNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURvcm1pdG9yeVRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm0nKSBzZiE6IFNGQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpRG9ybWl0b3J5VHJlZVByb3BzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uUXVlcnlDb21wbGV0ZTogRXZlbnRFbWl0dGVyPFl1bnphaURvcm1pdG9yeVRyZWVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaURvcm1pdG9yeVRyZWVbXT4oKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSByZWFkb25seSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPFl1bnphaURvcm1pdG9yeVRyZWVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaURvcm1pdG9yeVRyZWVbXT4oKTtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc3RhdGU6IFl1bnphaURvcm1pdG9yeVRyZWVTdGF0ZSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzY2hlbWE6IGRlZmF1bHRTY2hlbWEsXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgZXhwYW5kS2V5czogW11cbiAgfTtcblxuICBnZXQgZGF0YSgpOiBZdW56YWlEb3JtaXRvcnlUcmVlW10ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGF0YTtcbiAgfVxuXG4gIHNldCBkYXRhKGRvcm1zOiBZdW56YWlEb3JtaXRvcnlUcmVlW10pIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YSA9IGRvcm1zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGEgPSBkb3JtcztcbiAgICB9XG4gIH1cblxuICBnZXQgbm9kZXMoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhIGFzIE56U2FmZUFueVtdO1xuICB9XG5cbiAgZ2V0IGlzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMubXVsdGlwbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBwYXJhbSgpOiBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMucGFyYW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnBhcmFtO1xuICAgIH1cbiAgICByZXR1cm4geyBpc1Bvd2VyOiBmYWxzZSwgdHJlZVR5cGU6IFl1bnphaURvcm1pdG9yeVRyZWVUeXBlLkJVSUxESU5HX0ZMT09SU19ST09NUyB9O1xuICB9XG5cbiAgZ2V0IGlzV3JhcHBlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy53cmFwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5leHBhbmQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9ybWl0b3J5U2VydmljZTogWXVuemFpRG9ybWl0b3J5VHJlZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzPy5kYXRhKSB7XG4gICAgICB0aGlzLnF1ZXJ5KHRoaXMucGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGFCYWNrdXAgPSB0aGlzLmRhdGE7XG4gICAgICB0aGlzLm1hcERvcm1UcmVlKHRoaXMuZGF0YSBhcyBOelNhZmVBbnkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvb2tGb3JtQ2hhbmdlKCk7XG4gIH1cblxuICBob29rRm9ybUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNmLmZvcm1WYWx1ZUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgodmFsdWVDaGFuZ2U6IFNGVmFsdWVDaGFuZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2YWx1ZTogeyBzZWFyY2ggfVxuICAgICAgICAgIH0gPSB2YWx1ZUNoYW5nZTtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB6aXAob2Yoc2VhcmNoKSwgb2YodGhpcy5zdGF0ZS5kYXRhQmFja3VwKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB6aXAob2Yoc2VhcmNoKSwgdGhpcy5kb3JtaXRvcnlTZXJ2aWNlLnRyZWUodGhpcy5wYXJhbSkpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKChbc2VhcmNoLCBkb3Jtc10pID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMgPSBbXTtcbiAgICAgICAgICBpZiAoc2VhcmNoICYmIHNlYXJjaC50cmltKCkgIT09ICcnKSB7XG4gICAgICAgICAgICBkb3JtcyA9IHRoaXMucmVjdXJzaW9uU2VhcmNoKHNlYXJjaCwgZG9ybXMpO1xuICAgICAgICAgICAgdGhpcy5vblF1ZXJ5Q29tcGxldGUuZW1pdChkb3Jtcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFwRG9ybVRyZWUoZG9ybXMgYXMgTnpTYWZlQW55KTtcbiAgICAgICAgICB0aGlzLmRhdGEgPSBkb3JtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlY3Vyc2lvblNlYXJjaChzZWFyY2g6IHN0cmluZywgZG9ybXM6IFl1bnphaURvcm1pdG9yeVRyZWVbXSk6IFl1bnphaURvcm1pdG9yeVRyZWVbXSB7XG4gICAgY29uc3QgcmVzdWx0czogWXVuemFpRG9ybWl0b3J5VHJlZVtdID0gW107XG4gICAgY29uc3Qgc2VhcmNoSW5Eb3JtID0gKGRvcm06IFl1bnphaURvcm1pdG9yeVRyZWUpOiB2b2lkID0+IHtcbiAgICAgIGlmIChkb3JtLnRpdGxlLmluY2x1ZGVzKHNlYXJjaCkpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGRvcm0pO1xuICAgICAgfVxuICAgICAgaWYgKGRvcm0uY2hpbGRyZW4gJiYgZG9ybS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgZG9ybS5jaGlsZHJlbikge1xuICAgICAgICAgIHNlYXJjaEluRG9ybShjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoY29uc3QgZG9ybSBvZiBkb3Jtcykge1xuICAgICAgc2VhcmNoSW5Eb3JtKGRvcm0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIHF1ZXJ5KHBhcmFtOiBZdW56YWlEb3JtaXRvcnlUcmVlUGFyYW0pOiB2b2lkIHtcbiAgICB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLmRvcm1pdG9yeVNlcnZpY2VcbiAgICAgIC50cmVlKHBhcmFtKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgICAgbWFwKChkb3JtczogWXVuemFpRG9ybWl0b3J5VHJlZVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgdGhpcy5vblF1ZXJ5Q29tcGxldGUuZW1pdChkb3Jtcyk7XG4gICAgICAgICAgdGhpcy5tYXBEb3JtVHJlZShkb3JtcyBhcyBOelNhZmVBbnkpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRvcm1zO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICB9XG5cbiAgdW5sb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgbWFwRG9ybVRyZWUodHJlZTogTnpUcmVlTm9kZVtdKTogdm9pZCB7XG4gICAgaWYgKHRyZWUgJiYgdHJlZS5sZW5ndGggJiYgdHJlZS5sZW5ndGggPiAwKSB7XG4gICAgICB0cmVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kS2V5cy5pbmNsdWRlcyhpdGVtLmtleSkpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMucHVzaChpdGVtLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5pc0V4cGFuZGVkID0gdGhpcy5pc0V4cGFuZGVkO1xuICAgICAgICBpdGVtLmlzTGVhZiA9IGl0ZW0uY2hpbGRyZW4gPT09IG51bGwgfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDA7XG4gICAgICAgIHRoaXMubWFwRG9ybVRyZWUoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmVOb2RlKGRhdGE6IE56Rm9ybWF0RW1pdEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRhdGEubm9kZSkge1xuICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KFtkYXRhLm5vZGUub3JpZ2luIGFzIFl1bnphaURvcm1pdG9yeVRyZWVdKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEubm9kZXMpIHtcbiAgICAgIGNvbnN0IGRvcm1zOiBZdW56YWlEb3JtaXRvcnlUcmVlW10gPSBkYXRhLm5vZGVzLm1hcChuID0+IG4ub3JpZ2luIGFzIFl1bnphaURvcm1pdG9yeVRyZWUpO1xuICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGRvcm1zKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKGRhdGE6IE56VHJlZU5vZGUgfCBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgTnpUcmVlTm9kZSkge1xuICAgICAgZGF0YS5pc0V4cGFuZGVkID0gIWRhdGEuaXNFeHBhbmRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IGRhdGEubm9kZTtcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIG5vZGUuaXNFeHBhbmRlZCA9ICFub2RlLmlzRXhwYW5kZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=