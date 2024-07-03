import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, of, Subject, switchMap, takeUntil, throwError, zip } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { defaultSchema } from './yunzai-role-tree.schema';
import { YunzaiRoleTreeService } from './yunzai-role-tree.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/spin";
import * as i2 from "@yelon/form";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/empty";
import * as i6 from "ng-zorro-antd/tree";
import * as i7 from "@angular/common";
import * as i8 from "ng-zorro-antd/card";
export class YunzaiRoleTreeComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.service = inject(YunzaiRoleTreeService);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiRoleTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.5", type: YunzaiRoleTreeComponent, isStandalone: true, selector: "yunzai-role-tree", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiRoleTreeService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i2.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i5.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i8.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiRoleTreeComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLXJvbGUtdHJlZS95dW56YWktcm9sZS10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV6RyxPQUFPLEVBQThCLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBcUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7OztBQXdFbkUsTUFBTSxPQUFPLHVCQUF1QjtJQXJFcEM7UUF3RUUsK0RBQStEO1FBQzVDLG9CQUFlLEdB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURULDJEQUdDLFlBQVksMk1BQ1osZUFBZSwwWUFDZixjQUFjLGdRQUNkLFlBQVksaU5BQ1osYUFBYSxtTUFDYixZQUFZLGswQkFDWixZQUFZLHFNQUNaLFlBQVk7OzJGQUlILHVCQUF1QjtrQkFyRW5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDbkM7OEJBRW9CLEVBQUU7c0JBQXBCLFNBQVM7dUJBQUMsTUFBTTtnQkFDUixLQUFLO3NCQUFiLEtBQUs7Z0JBRWEsZUFBZTtzQkFBakMsTUFBTTtnQkFFWSxRQUFRO3NCQUExQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBpbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIG1hcCwgb2YsIFN1YmplY3QsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0aHJvd0Vycm9yLCB6aXAgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU0ZDb21wb25lbnQsIFNGVmFsdWVDaGFuZ2UsIFllbG9uRm9ybU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9mb3JtJztcbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcbmltcG9ydCB7IE56Rm9ybWF0RW1pdEV2ZW50LCBOelRyZWVNb2R1bGUsIE56VHJlZU5vZGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBkZWZhdWx0U2NoZW1hIH0gZnJvbSAnLi95dW56YWktcm9sZS10cmVlLnNjaGVtYSc7XG5pbXBvcnQgeyBZdW56YWlSb2xlVHJlZVNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS1yb2xlLXRyZWUuc2VydmljZSc7XG5pbXBvcnQgeyBZdW56YWlSb2xlVHJlZSwgWXVuemFpUm9sZVRyZWVQcm9wcywgWXVuemFpUm9sZVRyZWVTdGF0ZSB9IGZyb20gJy4veXVuemFpLXJvbGUtdHJlZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1yb2xlLXRyZWVgLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuei1zcGluIFtuelNwaW5uaW5nXT1cInN0YXRlLmxvYWRpbmdcIj5cbiAgICAgIEBpZiAoaXNXcmFwcGVkKSB7XG4gICAgICAgIDxuei1jYXJkPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiIC8+XG4gICAgICAgIDwvbnotY2FyZD5cbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgfVxuICAgIDwvbnotc3Bpbj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwicm9sZUZvcm1cIiAvPlxuICAgICAgQGlmIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIDxuei10cmVlXG4gICAgICAgICAgKG56Q2xpY2spPVwiYWN0aXZlTm9kZSgkZXZlbnQpXCJcbiAgICAgICAgICBbbnpFeHBhbmRlZEtleXNdPVwic3RhdGUuZXhwYW5kS2V5c1wiXG4gICAgICAgICAgW256RGF0YV09XCJub2Rlc1wiXG4gICAgICAgICAgW256U2hvd0xpbmVdPVwidHJ1ZVwiXG4gICAgICAgICAgW256TXVsdGlwbGVdPVwiaXNNdWx0aXBsZVwiXG4gICAgICAgICAgW256RXhwYW5kZWRJY29uXT1cImJsYW5rXCJcbiAgICAgICAgICBbbnpCbG9ja05vZGVdPVwidHJ1ZVwiXG4gICAgICAgICAgW256SGlkZVVuTWF0Y2hlZF09XCJ0cnVlXCJcbiAgICAgICAgICBbbnpUcmVlVGVtcGxhdGVdPVwidHJlZVRlbXBsYXRlXCJcbiAgICAgICAgLz5cbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICA8bnotZW1wdHkgLz5cbiAgICAgIH1cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICN0cmVlVGVtcGxhdGUgbGV0LW5vZGUgbGV0LW9yaWdpbj1cIm9yaWdpblwiPlxuICAgICAgQGlmICghbm9kZS5pc0xlYWYpIHtcbiAgICAgICAgPHNwYW4gW3RpdGxlXT1cIm5vZGUudGl0bGVcIj5cbiAgICAgICAgICA8aVxuICAgICAgICAgICAgbnotaWNvblxuICAgICAgICAgICAgbnpUaGVtZT1cInR3b3RvbmVcIlxuICAgICAgICAgICAgW256VHlwZV09XCJub2RlLmlzRXhwYW5kZWQgPyAnbWludXMtc3F1YXJlJyA6ICdwbHVzLXNxdWFyZSdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW4obm9kZSlcIlxuICAgICAgICAgID48L2k+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWFmLW5hbWVcIj57eyBub2RlLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPHNwYW4gW3RpdGxlXT1cIm5vZGUudGl0bGVcIj5cbiAgICAgICAgICA8c3BhbiBuei1pY29uIG56VHlwZT1cImZpbGVcIiBuelRoZW1lPVwidHdvdG9uZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImxlYWYtbmFtZVwiPnt7IG5vZGUudGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIH1cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNyb2xlRm9ybT5cbiAgICAgIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjYmxhbmsgLz5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIE56U3Bpbk1vZHVsZSxcbiAgICBZZWxvbkZvcm1Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpUcmVlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbWXVuemFpUm9sZVRyZWVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlSb2xlVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZm9ybScpIHNmITogU0ZDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpUm9sZVRyZWVQcm9wcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSByZWFkb25seSBvblF1ZXJ5Q29tcGxldGU6IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpUm9sZVRyZWVbXT4oKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSByZWFkb25seSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPFl1bnphaVJvbGVUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2U6IFl1bnphaVJvbGVUcmVlU2VydmljZSA9IGluamVjdChZdW56YWlSb2xlVHJlZVNlcnZpY2UpO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICBzdGF0ZTogWXVuemFpUm9sZVRyZWVTdGF0ZSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzY2hlbWE6IGRlZmF1bHRTY2hlbWEsXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgZXhwYW5kS2V5czogW11cbiAgfTtcblxuICBnZXQgZGF0YSgpOiBZdW56YWlSb2xlVHJlZVtdIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmRhdGE7XG4gIH1cblxuICBzZXQgZGF0YShyb2xlczogWXVuemFpUm9sZVRyZWVbXSkge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhID0gcm9sZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHJvbGVzO1xuICAgIH1cbiAgfVxuXG4gIGdldCBub2RlcygpOiBOelRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmRhdGEgYXMgTnpTYWZlQW55W107XG4gIH1cblxuICBnZXQgaXNNdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5tdWx0aXBsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IHJvbGVHcm91cENvZGUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLnJvbGVHcm91cENvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvbGVHcm91cENvZGU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgaXNXcmFwcGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLndyYXA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByb3BzKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnByb3BzLmV4cGFuZDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzPy5kYXRhKSB7XG4gICAgICB0aGlzLnF1ZXJ5KHRoaXMucm9sZUdyb3VwQ29kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YUJhY2t1cCA9IHRoaXMuZGF0YTtcbiAgICAgIHRoaXMubWFwUm9sZVRyZWUodGhpcy5kYXRhIGFzIE56U2FmZUFueSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaG9va0Zvcm1DaGFuZ2UoKTtcbiAgfVxuXG4gIGhvb2tGb3JtQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2YuZm9ybVZhbHVlQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMCksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKCh2YWx1ZUNoYW5nZTogU0ZWYWx1ZUNoYW5nZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHZhbHVlOiB7IHNlYXJjaCB9XG4gICAgICAgICAgfSA9IHZhbHVlQ2hhbmdlO1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHppcChvZihzZWFyY2gpLCBvZih0aGlzLnN0YXRlLmRhdGFCYWNrdXApKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHppcChvZihzZWFyY2gpLCB0aGlzLnNlcnZpY2UudHJlZSh0aGlzLnJvbGVHcm91cENvZGUpKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoW3NlYXJjaCwgZGVwdHNdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRLZXlzID0gW107XG4gICAgICAgICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgZGVwdHMgPSB0aGlzLnJlY3Vyc2lvblNlYXJjaChzZWFyY2gsIGRlcHRzKTtcbiAgICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQoZGVwdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcFJvbGVUcmVlKGRlcHRzIGFzIE56U2FmZUFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gZGVwdHM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWN1cnNpb25TZWFyY2goc2VhcmNoOiBzdHJpbmcsIHJvbGVzOiBZdW56YWlSb2xlVHJlZVtdKTogWXVuemFpUm9sZVRyZWVbXSB7XG4gICAgY29uc3QgcmVzdWx0czogWXVuemFpUm9sZVRyZWVbXSA9IFtdO1xuICAgIGNvbnN0IHNlYXJjaEluUm9sZSA9IChyb2xlOiBZdW56YWlSb2xlVHJlZSk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHJvbGUudGl0bGUuaW5jbHVkZXMoc2VhcmNoKSkge1xuICAgICAgICByZXN1bHRzLnB1c2gocm9sZSk7XG4gICAgICB9XG4gICAgICBpZiAocm9sZS5jaGlsZHJlbiAmJiByb2xlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiByb2xlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgc2VhcmNoSW5Sb2xlKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZm9yIChjb25zdCBkZXB0IG9mIHJvbGVzKSB7XG4gICAgICBzZWFyY2hJblJvbGUoZGVwdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgcXVlcnkocm9sZUdyb3VwQ29kZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9hZCgpO1xuICAgIHRoaXMuc2VydmljZVxuICAgICAgLnRyZWUocm9sZUdyb3VwQ29kZSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIG1hcCgocm9sZXM6IFl1bnphaVJvbGVUcmVlW10pID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmV4cGFuZEtleXMgPSBbXTtcbiAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KHJvbGVzKTtcbiAgICAgICAgICB0aGlzLm1hcFJvbGVUcmVlKHJvbGVzIGFzIE56U2FmZUFueSk7XG4gICAgICAgICAgdGhpcy5kYXRhID0gcm9sZXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IHRydWU7XG4gIH1cblxuICB1bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBtYXBSb2xlVHJlZSh0cmVlOiBOelRyZWVOb2RlW10pOiB2b2lkIHtcbiAgICBpZiAodHJlZSAmJiB0cmVlLmxlbmd0aCAmJiB0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyZWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRLZXlzLmluY2x1ZGVzKGl0ZW0ua2V5KSkge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kS2V5cy5wdXNoKGl0ZW0ua2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmlzRXhwYW5kZWQgPSB0aGlzLmlzRXhwYW5kZWQ7XG4gICAgICAgIGl0ZW0uaXNMZWFmID0gaXRlbS5jaGlsZHJlbiA9PT0gbnVsbCB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgdGhpcy5tYXBSb2xlVHJlZShpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2ZU5vZGUoZGF0YTogTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YS5ub2RlKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoW2RhdGEubm9kZS5vcmlnaW4gYXMgWXVuemFpUm9sZVRyZWVdKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEubm9kZXMpIHtcbiAgICAgIGNvbnN0IHJvbGVzOiBZdW56YWlSb2xlVHJlZVtdID0gZGF0YS5ub2Rlcy5tYXAobiA9PiBuLm9yaWdpbiBhcyBZdW56YWlSb2xlVHJlZSk7XG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocm9sZXMpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0YTogTnpUcmVlTm9kZSB8IE56Rm9ybWF0RW1pdEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBOelRyZWVOb2RlKSB7XG4gICAgICBkYXRhLmlzRXhwYW5kZWQgPSAhZGF0YS5pc0V4cGFuZGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gZGF0YS5ub2RlO1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5pc0V4cGFuZGVkID0gIW5vZGUuaXNFeHBhbmRlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLiRkZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==