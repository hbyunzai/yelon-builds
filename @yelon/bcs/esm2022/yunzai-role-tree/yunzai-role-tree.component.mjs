import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { defaultSchema } from './yunzai-role-tree.schema';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-role-tree.service";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/spin";
import * as i4 from "@yelon/form";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "ng-zorro-antd/empty";
import * as i7 from "ng-zorro-antd/tree";
import * as i8 from "ng-zorro-antd/card";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeComponent, deps: [{ token: i1.YunzaiRoleTreeService }], target: i0.ɵɵFactoryTarget.Component }); }
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
        }], ctorParameters: () => [{ type: i1.YunzaiRoleTreeService }], propDecorators: { sf: [{
                type: ViewChild,
                args: ['form']
            }], props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLXJvbGUtdHJlZS95dW56YWktcm9sZS10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFekcsT0FBTyxFQUE4QixlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBcUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7OztBQXNFMUQsTUFBTSxPQUFPLHVCQUF1QjtJQWtCbEMsSUFBSSxJQUFJO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN6QixD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OzJGQUVuRyx1QkFBdUI7a0JBbEVuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7aUJBQ2hIOzBGQUVvQixFQUFFO3NCQUFwQixTQUFTO3VCQUFDLE1BQU07Z0JBRVIsS0FBSztzQkFBYixLQUFLO2dCQUVhLGVBQWU7c0JBQWpDLE1BQU07Z0JBRVksUUFBUTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBtYXAsIG9mLCBTdWJqZWN0LCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGhyb3dFcnJvciwgemlwIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNGQ29tcG9uZW50LCBTRlZhbHVlQ2hhbmdlLCBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RW1wdHlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2VtcHR5JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelNwaW5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3NwaW4nO1xuaW1wb3J0IHsgTnpGb3JtYXRFbWl0RXZlbnQsIE56VHJlZU1vZHVsZSwgTnpUcmVlTm9kZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IGRlZmF1bHRTY2hlbWEgfSBmcm9tICcuL3l1bnphaS1yb2xlLXRyZWUuc2NoZW1hJztcbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlU2VydmljZSB9IGZyb20gJy4veXVuemFpLXJvbGUtdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlLCBZdW56YWlSb2xlVHJlZVByb3BzLCBZdW56YWlSb2xlVHJlZVN0YXRlIH0gZnJvbSAnLi95dW56YWktcm9sZS10cmVlLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLXJvbGUtdHJlZWAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBsb2FkaW5nLS0+XG4gICAgPG56LXNwaW4gW256U3Bpbm5pbmddPVwic3RhdGUubG9hZGluZ1wiPlxuICAgICAgPCEtLSAgICAgICAgd3JhcHBlZC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzV3JhcHBlZFwiPlxuICAgICAgICA8bnotY2FyZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgICA8L256LWNhcmQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwhLS0gICAgICAgIGVuZCB3cmFwcGVkLS0+XG5cbiAgICAgIDwhLS0gICAgICAgIHVud3JhcHBlZC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1dyYXBwZWRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPCEtLSAgICAgICAgZW5kIHVud3JhcHBlZC0tPlxuICAgIDwvbnotc3Bpbj5cbiAgICA8IS0tIGVuZCBsb2FkaW5nLS0+XG5cbiAgICA8IS0tICAgICAgY29udGVudC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwicm9sZUZvcm1cIiAvPlxuICAgICAgPG56LXRyZWVcbiAgICAgICAgKm5nSWY9XCJub2Rlcy5sZW5ndGggPiAwXCJcbiAgICAgICAgKG56Q2xpY2spPVwiYWN0aXZlTm9kZSgkZXZlbnQpXCJcbiAgICAgICAgW256RXhwYW5kZWRLZXlzXT1cInN0YXRlLmV4cGFuZEtleXNcIlxuICAgICAgICBbbnpEYXRhXT1cIm5vZGVzXCJcbiAgICAgICAgW256U2hvd0xpbmVdPVwidHJ1ZVwiXG4gICAgICAgIFtuek11bHRpcGxlXT1cImlzTXVsdGlwbGVcIlxuICAgICAgICBbbnpFeHBhbmRlZEljb25dPVwiYmxhbmtcIlxuICAgICAgICBbbnpCbG9ja05vZGVdPVwidHJ1ZVwiXG4gICAgICAgIFtuekhpZGVVbk1hdGNoZWRdPVwidHJ1ZVwiXG4gICAgICAgIFtuelRyZWVUZW1wbGF0ZV09XCJ0cmVlVGVtcGxhdGVcIlxuICAgICAgLz5cbiAgICAgIDxuei1lbXB0eSAqbmdJZj1cIm5vZGVzLmxlbmd0aCA9PT0gMFwiIC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tICAgICAgZW5kIGNvbnRlbnQtLT5cblxuICAgIDwhLS0gICAgICB0cmVlIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjdHJlZVRlbXBsYXRlIGxldC1ub2RlIGxldC1vcmlnaW49XCJvcmlnaW5cIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIW5vZGUuaXNMZWFmXCIgW3RpdGxlXT1cIm5vZGUudGl0bGVcIj5cbiAgICAgICAgPGlcbiAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgbnpUaGVtZT1cInR3b3RvbmVcIlxuICAgICAgICAgIFtuelR5cGVdPVwibm9kZS5pc0V4cGFuZGVkID8gJ21pbnVzLXNxdWFyZScgOiAncGx1cy1zcXVhcmUnXCJcbiAgICAgICAgICAoY2xpY2spPVwib3Blbihub2RlKVwiXG4gICAgICAgID48L2k+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVhZi1uYW1lXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwibm9kZS5pc0xlYWZcIiBbdGl0bGVdPVwibm9kZS50aXRsZVwiPlxuICAgICAgICA8c3BhbiBuei1pY29uIG56VHlwZT1cImZpbGVcIiBuelRoZW1lPVwidHdvdG9uZVwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSAgICAgIGVuZCB0cmVlLS0+XG5cbiAgICA8bmctdGVtcGxhdGUgI3JvbGVGb3JtPlxuICAgICAgPHNmICNmb3JtIGxheW91dD1cImlubGluZVwiIFtidXR0b25dPVwiJ25vbmUnXCIgW3NjaGVtYV09XCJzdGF0ZS5zY2hlbWFcIiAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNibGFuayAvPlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOelNwaW5Nb2R1bGUsIFllbG9uRm9ybU1vZHVsZSwgTnpJY29uTW9kdWxlLCBOekVtcHR5TW9kdWxlLCBOelRyZWVNb2R1bGUsIE56Q2FyZE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpUm9sZVRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm0nKSBzZiE6IFNGQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpUm9sZVRyZWVQcm9wcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSByZWFkb25seSBvblF1ZXJ5Q29tcGxldGU6IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpUm9sZVRyZWVbXT4oKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSByZWFkb25seSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPFl1bnphaVJvbGVUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPigpO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICBzdGF0ZTogWXVuemFpUm9sZVRyZWVTdGF0ZSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzY2hlbWE6IGRlZmF1bHRTY2hlbWEsXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgZXhwYW5kS2V5czogW11cbiAgfTtcblxuICBnZXQgZGF0YSgpOiBZdW56YWlSb2xlVHJlZVtdIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmRhdGE7XG4gIH1cblxuICBzZXQgZGF0YShyb2xlczogWXVuemFpUm9sZVRyZWVbXSkge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhID0gcm9sZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHJvbGVzO1xuICAgIH1cbiAgfVxuXG4gIGdldCBub2RlcygpOiBOelRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmRhdGEgYXMgTnpTYWZlQW55W107XG4gIH1cblxuICBnZXQgaXNNdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5tdWx0aXBsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IHJvbGVHcm91cENvZGUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLnJvbGVHcm91cENvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvbGVHcm91cENvZGU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgaXNXcmFwcGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLndyYXA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLmV4cGFuZDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb2xlVHJlZVNlcnZpY2U6IFl1bnphaVJvbGVUcmVlU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHM/LmRhdGEpIHtcbiAgICAgIHRoaXMucXVlcnkodGhpcy5yb2xlR3JvdXBDb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gdGhpcy5kYXRhO1xuICAgICAgdGhpcy5tYXBSb2xlVHJlZSh0aGlzLmRhdGEgYXMgTnpTYWZlQW55KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ob29rRm9ybUNoYW5nZSgpO1xuICB9XG5cbiAgaG9va0Zvcm1DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZi5mb3JtVmFsdWVDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKHZhbHVlQ2hhbmdlOiBTRlZhbHVlQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmFsdWU6IHsgc2VhcmNoIH1cbiAgICAgICAgICB9ID0gdmFsdWVDaGFuZ2U7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIG9mKHRoaXMuc3RhdGUuZGF0YUJhY2t1cCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gemlwKG9mKHNlYXJjaCksIHRoaXMucm9sZVRyZWVTZXJ2aWNlLnRyZWUodGhpcy5yb2xlR3JvdXBDb2RlKSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKFtzZWFyY2gsIGRlcHRzXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cyA9IFtdO1xuICAgICAgICAgIGlmIChzZWFyY2ggJiYgc2VhcmNoLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGRlcHRzID0gdGhpcy5yZWN1cnNpb25TZWFyY2goc2VhcmNoLCBkZXB0cyk7XG4gICAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KGRlcHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXBSb2xlVHJlZShkZXB0cyBhcyBOelNhZmVBbnkpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRlcHRzO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVjdXJzaW9uU2VhcmNoKHNlYXJjaDogc3RyaW5nLCByb2xlczogWXVuemFpUm9sZVRyZWVbXSk6IFl1bnphaVJvbGVUcmVlW10ge1xuICAgIGNvbnN0IHJlc3VsdHM6IFl1bnphaVJvbGVUcmVlW10gPSBbXTtcbiAgICBjb25zdCBzZWFyY2hJblJvbGUgPSAocm9sZTogWXVuemFpUm9sZVRyZWUpOiB2b2lkID0+IHtcbiAgICAgIGlmIChyb2xlLnRpdGxlLmluY2x1ZGVzKHNlYXJjaCkpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHJvbGUpO1xuICAgICAgfVxuICAgICAgaWYgKHJvbGUuY2hpbGRyZW4gJiYgcm9sZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygcm9sZS5jaGlsZHJlbikge1xuICAgICAgICAgIHNlYXJjaEluUm9sZShjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoY29uc3QgZGVwdCBvZiByb2xlcykge1xuICAgICAgc2VhcmNoSW5Sb2xlKGRlcHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIHF1ZXJ5KHJvbGVHcm91cENvZGU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLnJvbGVUcmVlU2VydmljZVxuICAgICAgLnRyZWUocm9sZUdyb3VwQ29kZSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIG1hcCgocm9sZXM6IFl1bnphaVJvbGVUcmVlW10pID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMgPSBbXTtcbiAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KHJvbGVzKTtcbiAgICAgICAgICB0aGlzLm1hcFJvbGVUcmVlKHJvbGVzIGFzIE56U2FmZUFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gcm9sZXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IHRydWU7XG4gIH1cblxuICB1bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBtYXBSb2xlVHJlZSh0cmVlOiBOelRyZWVOb2RlW10pOiB2b2lkIHtcbiAgICBpZiAodHJlZSAmJiB0cmVlLmxlbmd0aCAmJiB0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyZWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRLZXlzLmluY2x1ZGVzKGl0ZW0ua2V5KSkge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cy5wdXNoKGl0ZW0ua2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmlzRXhwYW5kZWQgPSB0aGlzLmlzRXhwYW5kZWQ7XG4gICAgICAgIGl0ZW0uaXNMZWFmID0gaXRlbS5jaGlsZHJlbiA9PT0gbnVsbCB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgdGhpcy5tYXBSb2xlVHJlZShpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2ZU5vZGUoZGF0YTogTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YS5ub2RlKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoW2RhdGEubm9kZS5vcmlnaW4gYXMgWXVuemFpUm9sZVRyZWVdKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEubm9kZXMpIHtcbiAgICAgIGNvbnN0IHJvbGVzOiBZdW56YWlSb2xlVHJlZVtdID0gZGF0YS5ub2Rlcy5tYXAobiA9PiBuLm9yaWdpbiBhcyBZdW56YWlSb2xlVHJlZSk7XG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocm9sZXMpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0YTogTnpUcmVlTm9kZSB8IE56Rm9ybWF0RW1pdEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBOelRyZWVOb2RlKSB7XG4gICAgICBkYXRhLmlzRXhwYW5kZWQgPSAhZGF0YS5pc0V4cGFuZGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gZGF0YS5ub2RlO1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5pc0V4cGFuZGVkID0gIW5vZGUuaXNFeHBhbmRlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLiRkZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==