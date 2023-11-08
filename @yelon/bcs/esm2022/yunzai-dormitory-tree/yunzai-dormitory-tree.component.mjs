import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { defaultSchema } from './yunzai-dormitory-tree.schema';
import { YunzaiDormitoryTreeType } from './yunzai-dormitory-tree.types';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-dormitory-tree.service";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/tree";
import * as i4 from "ng-zorro-antd/core/transition-patch";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "ng-zorro-antd/card";
import * as i7 from "ng-zorro-antd/spin";
import * as i8 from "ng-zorro-antd/empty";
import * as i9 from "@yelon/form";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDormitoryTreeComponent, deps: [{ token: i1.YunzaiDormitoryTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiDormitoryTreeComponent, selector: "yunzai-dormitory-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"dormitoryForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #dormitoryForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i6.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i7.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "component", type: i8.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i9.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiDormitoryTreeComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-dormitory-tree`, template: "<!-- loading-->\n<nz-spin [nzSpinning]=\"state.loading\">\n  <!--        wrapped-->\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n  <!--        end wrapped-->\n\n  <!--        unwrapped-->\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n  <!--        end unwrapped-->\n</nz-spin>\n<!-- end loading-->\n\n<!--      content-->\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"dormitoryForm\"></ng-container>\n  <nz-tree\n    *ngIf=\"nodes.length > 0\"\n    (nzClick)=\"activeNode($event)\"\n    [nzExpandedKeys]=\"state.expandKeys\"\n    [nzData]=\"nodes\"\n    [nzShowLine]=\"true\"\n    [nzMultiple]=\"isMultiple\"\n    [nzExpandedIcon]=\"blank\"\n    [nzBlockNode]=\"true\"\n    [nzHideUnMatched]=\"true\"\n    [nzTreeTemplate]=\"treeTemplate\"\n  ></nz-tree>\n  <nz-empty *ngIf=\"nodes.length === 0\"></nz-empty>\n</ng-template>\n<!--      end content-->\n\n<!--      tree -->\n<ng-template #treeTemplate let-node let-origin=\"origin\">\n  <span *ngIf=\"!node.isLeaf\" [title]=\"node.title\">\n    <i nz-icon nzTheme=\"twotone\" [nzType]=\"node.isExpanded ? 'minus-square' : 'plus-square'\" (click)=\"open(node)\"></i>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n  <span *ngIf=\"node.isLeaf\" [title]=\"node.title\">\n    <span nz-icon nzType=\"file\" nzTheme=\"twotone\"></span>\n    <span class=\"leaf-name\">{{ node.title }}</span>\n  </span>\n</ng-template>\n<!--      end tree-->\n\n<ng-template #dormitoryForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n<ng-template #blank></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiDormitoryTreeService }]; }, propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUveXVuemFpLWRvcm1pdG9yeS10cmVlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUveXVuemFpLWRvcm1pdG9yeS10cmVlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHdkcsT0FBTyxFQUFxQixVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUtMLHVCQUF1QixFQUN4QixNQUFNLCtCQUErQixDQUFDOzs7Ozs7Ozs7OztBQU12QyxNQUFNLE9BQU8sNEJBQTRCO0lBZ0J2QyxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQTRCO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUks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LENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQTZCLENBQUMsQ0FBQztZQUMxRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsSUFBb0M7UUFDdkMsSUFBSSxJQUFJLFlBQVksVUFBVSxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3BDO2FBQU07WUFDTCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDMUIsQ0FBQzsrR0F0TVUsNEJBQTRCO21HQUE1Qiw0QkFBNEIsNFBDcEJ6QyxxdkRBc0RBOzs0RkRsQ2EsNEJBQTRCO2tCQUp4QyxTQUFTOytCQUNFLHVCQUF1QjtpSEFJZCxFQUFFO3NCQUFwQixTQUFTO3VCQUFDLE1BQU07Z0JBRVIsS0FBSztzQkFBYixLQUFLO2dCQUNJLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIG1hcCwgb2YsIFN1YmplY3QsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0aHJvd0Vycm9yLCB6aXB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1NGQ29tcG9uZW50LCBTRlZhbHVlQ2hhbmdlfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekZvcm1hdEVtaXRFdmVudCwgTnpUcmVlTm9kZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IGRlZmF1bHRTY2hlbWEgfSBmcm9tICcuL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zY2hlbWEnO1xuaW1wb3J0IHsgWXVuemFpRG9ybWl0b3J5VHJlZVNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS1kb3JtaXRvcnktdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFl1bnphaURvcm1pdG9yeVRyZWUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVQYXJhbSxcbiAgWXVuemFpRG9ybWl0b3J5VHJlZVByb3BzLFxuICBZdW56YWlEb3JtaXRvcnlUcmVlU3RhdGUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVUeXBlXG59IGZyb20gJy4veXVuemFpLWRvcm1pdG9yeS10cmVlLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWRvcm1pdG9yeS10cmVlYCxcbiAgdGVtcGxhdGVVcmw6IGAuL3l1bnphaS1kb3JtaXRvcnktdHJlZS5odG1sYFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlEb3JtaXRvcnlUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0ICxPbkRlc3Ryb3l7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm0nKSBzZiE6IFNGQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpRG9ybWl0b3J5VHJlZVByb3BzO1xuICBAT3V0cHV0KCkgb25RdWVyeUNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxZdW56YWlEb3JtaXRvcnlUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlEb3JtaXRvcnlUcmVlW10+KCk7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpXG5cbiAgc3RhdGU6IFl1bnphaURvcm1pdG9yeVRyZWVTdGF0ZSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzY2hlbWE6IGRlZmF1bHRTY2hlbWEsXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgZXhwYW5kS2V5czogW10sXG4gIH07XG5cbiAgZ2V0IGRhdGEoKTogWXVuemFpRG9ybWl0b3J5VHJlZVtdIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmRhdGE7XG4gIH1cblxuICBzZXQgZGF0YShkb3JtczogWXVuemFpRG9ybWl0b3J5VHJlZVtdKSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICB0aGlzLnByb3BzLmRhdGEgPSBkb3JtcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gZG9ybXM7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5vZGVzKCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSBhcyBhbnlbXTtcbiAgfVxuXG4gIGdldCBpc011bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLm11bHRpcGxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgcGFyYW0oKTogWXVuemFpRG9ybWl0b3J5VHJlZVBhcmFtIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLnBhcmFtKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5wYXJhbTtcbiAgICB9XG4gICAgcmV0dXJuIHsgaXNQb3dlcjogZmFsc2UsIHRyZWVUeXBlOiBZdW56YWlEb3JtaXRvcnlUcmVlVHlwZS5CVUlMRElOR19GTE9PUlNfUk9PTVMgfTtcbiAgfVxuXG4gIGdldCBpc1dyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMud3JhcDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGlzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucHJvcHMpIHtcbiAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuZXhwYW5kO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRvcm1pdG9yeVNlcnZpY2U6IFl1bnphaURvcm1pdG9yeVRyZWVTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcz8uZGF0YSkge1xuICAgICAgdGhpcy5xdWVyeSh0aGlzLnBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gdGhpcy5kYXRhO1xuICAgICAgdGhpcy5tYXBEb3JtVHJlZSh0aGlzLmRhdGEgYXMgYW55KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ob29rRm9ybUNoYW5nZSgpO1xuICB9XG5cbiAgaG9va0Zvcm1DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZi5mb3JtVmFsdWVDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKHZhbHVlQ2hhbmdlOiBTRlZhbHVlQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmFsdWU6IHsgc2VhcmNoIH1cbiAgICAgICAgICB9ID0gdmFsdWVDaGFuZ2U7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIG9mKHRoaXMuc3RhdGUuZGF0YUJhY2t1cCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIHRoaXMuZG9ybWl0b3J5U2VydmljZS50cmVlKHRoaXMucGFyYW0pKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoW3NlYXJjaCwgZG9ybXNdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgZG9ybXMgPSB0aGlzLnJlY3Vyc2lvblNlYXJjaChzZWFyY2gsIGRvcm1zKTtcbiAgICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZG9ybXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcERvcm1UcmVlKGRvcm1zIGFzIGFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gZG9ybXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWN1cnNpb25TZWFyY2goc2VhcmNoOiBzdHJpbmcsIGRvcm1zOiBZdW56YWlEb3JtaXRvcnlUcmVlW10pOiBZdW56YWlEb3JtaXRvcnlUcmVlW10ge1xuICAgIGNvbnN0IHJlc3VsdHM6IFl1bnphaURvcm1pdG9yeVRyZWVbXSA9IFtdO1xuICAgIGNvbnN0IHNlYXJjaEluRG9ybSA9IChkb3JtOiBZdW56YWlEb3JtaXRvcnlUcmVlKSA9PiB7XG4gICAgICBpZiAoZG9ybS50aXRsZS5pbmNsdWRlcyhzZWFyY2gpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChkb3JtKTtcbiAgICAgIH1cbiAgICAgIGlmIChkb3JtLmNoaWxkcmVuICYmIGRvcm0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGRvcm0uY2hpbGRyZW4pIHtcbiAgICAgICAgICBzZWFyY2hJbkRvcm0oY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IGRvcm0gb2YgZG9ybXMpIHtcbiAgICAgIHNlYXJjaEluRG9ybShkb3JtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBxdWVyeShwYXJhbTogWXVuemFpRG9ybWl0b3J5VHJlZVBhcmFtKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5kb3JtaXRvcnlTZXJ2aWNlXG4gICAgICAudHJlZShwYXJhbSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIG1hcCgoZG9ybXM6IFl1bnphaURvcm1pdG9yeVRyZWVbXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cyA9IFtdO1xuICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZG9ybXMpO1xuICAgICAgICAgIHRoaXMubWFwRG9ybVRyZWUoZG9ybXMgYXMgYW55KTtcbiAgICAgICAgICB0aGlzLmRhdGEgPSBkb3JtcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHVubG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG1hcERvcm1UcmVlKHRyZWU6IE56VHJlZU5vZGVbXSkge1xuICAgIGlmICh0cmVlICYmIHRyZWUubGVuZ3RoICYmIHRyZWUubGVuZ3RoID4gMCkge1xuICAgICAgdHJlZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLnN0YXRlLmV4cGFuZEtleXMuaW5jbHVkZXMoaXRlbS5rZXkpKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzLnB1c2goaXRlbS5rZXkpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uaXNFeHBhbmRlZCA9IHRoaXMuaXNFeHBhbmRlZDtcbiAgICAgICAgaXRlbS5pc0xlYWYgPSBpdGVtLmNoaWxkcmVuID09PSBudWxsIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwO1xuICAgICAgICB0aGlzLm1hcERvcm1UcmVlKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlTm9kZShkYXRhOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkYXRhLm5vZGUpIHtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChbZGF0YS5ub2RlLm9yaWdpbiBhcyBZdW56YWlEb3JtaXRvcnlUcmVlXSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLm5vZGVzKSB7XG4gICAgICBjb25zdCBkb3JtczogWXVuemFpRG9ybWl0b3J5VHJlZVtdID0gZGF0YS5ub2Rlcy5tYXAobiA9PiBuLm9yaWdpbiBhcyBZdW56YWlEb3JtaXRvcnlUcmVlKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkb3Jtcyk7XG4gICAgfVxuICB9XG5cbiAgb3BlbihkYXRhOiBOelRyZWVOb2RlIHwgTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE56VHJlZU5vZGUpIHtcbiAgICAgIGRhdGEuaXNFeHBhbmRlZCA9ICFkYXRhLmlzRXhwYW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkYXRhLm5vZGU7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBub2RlLmlzRXhwYW5kZWQgPSAhbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKVxuICB9XG59XG4iLCI8IS0tIGxvYWRpbmctLT5cbjxuei1zcGluIFtuelNwaW5uaW5nXT1cInN0YXRlLmxvYWRpbmdcIj5cbiAgPCEtLSAgICAgICAgd3JhcHBlZC0tPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNXcmFwcGVkXCI+XG4gICAgPG56LWNhcmQ+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L256LWNhcmQ+XG4gIDwvbmctY29udGFpbmVyPlxuICA8IS0tICAgICAgICBlbmQgd3JhcHBlZC0tPlxuXG4gIDwhLS0gICAgICAgIHVud3JhcHBlZC0tPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzV3JhcHBlZFwiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPCEtLSAgICAgICAgZW5kIHVud3JhcHBlZC0tPlxuPC9uei1zcGluPlxuPCEtLSBlbmQgbG9hZGluZy0tPlxuXG48IS0tICAgICAgY29udGVudC0tPlxuPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRvcm1pdG9yeUZvcm1cIj48L25nLWNvbnRhaW5lcj5cbiAgPG56LXRyZWVcbiAgICAqbmdJZj1cIm5vZGVzLmxlbmd0aCA+IDBcIlxuICAgIChuekNsaWNrKT1cImFjdGl2ZU5vZGUoJGV2ZW50KVwiXG4gICAgW256RXhwYW5kZWRLZXlzXT1cInN0YXRlLmV4cGFuZEtleXNcIlxuICAgIFtuekRhdGFdPVwibm9kZXNcIlxuICAgIFtuelNob3dMaW5lXT1cInRydWVcIlxuICAgIFtuek11bHRpcGxlXT1cImlzTXVsdGlwbGVcIlxuICAgIFtuekV4cGFuZGVkSWNvbl09XCJibGFua1wiXG4gICAgW256QmxvY2tOb2RlXT1cInRydWVcIlxuICAgIFtuekhpZGVVbk1hdGNoZWRdPVwidHJ1ZVwiXG4gICAgW256VHJlZVRlbXBsYXRlXT1cInRyZWVUZW1wbGF0ZVwiXG4gID48L256LXRyZWU+XG4gIDxuei1lbXB0eSAqbmdJZj1cIm5vZGVzLmxlbmd0aCA9PT0gMFwiPjwvbnotZW1wdHk+XG48L25nLXRlbXBsYXRlPlxuPCEtLSAgICAgIGVuZCBjb250ZW50LS0+XG5cbjwhLS0gICAgICB0cmVlIC0tPlxuPG5nLXRlbXBsYXRlICN0cmVlVGVtcGxhdGUgbGV0LW5vZGUgbGV0LW9yaWdpbj1cIm9yaWdpblwiPlxuICA8c3BhbiAqbmdJZj1cIiFub2RlLmlzTGVhZlwiIFt0aXRsZV09XCJub2RlLnRpdGxlXCI+XG4gICAgPGkgbnotaWNvbiBuelRoZW1lPVwidHdvdG9uZVwiIFtuelR5cGVdPVwibm9kZS5pc0V4cGFuZGVkID8gJ21pbnVzLXNxdWFyZScgOiAncGx1cy1zcXVhcmUnXCIgKGNsaWNrKT1cIm9wZW4obm9kZSlcIj48L2k+XG4gICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICA8L3NwYW4+XG4gIDxzcGFuICpuZ0lmPVwibm9kZS5pc0xlYWZcIiBbdGl0bGVdPVwibm9kZS50aXRsZVwiPlxuICAgIDxzcGFuIG56LWljb24gbnpUeXBlPVwiZmlsZVwiIG56VGhlbWU9XCJ0d290b25lXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwibGVhZi1uYW1lXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cbiAgPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbjwhLS0gICAgICBlbmQgdHJlZS0tPlxuXG48bmctdGVtcGxhdGUgI2Rvcm1pdG9yeUZvcm0+XG4gIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCI+PC9zZj5cbjwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2JsYW5rPjwvbmctdGVtcGxhdGU+XG4iXX0=