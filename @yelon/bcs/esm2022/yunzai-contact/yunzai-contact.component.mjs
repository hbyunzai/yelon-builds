import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YunzaiDeptTreeModule } from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import { I18nPipe } from '@yelon/theme';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/radio";
import * as i4 from "ng-zorro-antd/grid";
import * as i5 from "ng-zorro-antd/card";
import * as i6 from "@yelon/bcs/yunzai-role-tree";
import * as i7 from "@yelon/bcs/yunzai-dept-tree";
import * as i8 from "@yelon/bcs/yunzai-dormitory-tree";
import * as i9 from "@yelon/bcs/yunzai-friend-group";
import * as i10 from "@yelon/bcs/yunzai-table-user";
export class YunzaiContactComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelectDept = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelectRole = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelectDormitory = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelectGroup = new EventEmitter();
        this.state = {
            cursor: 'deptTree'
        };
    }
    get tableUserProps() {
        if (this.tableUser) {
            return this.tableUser;
        }
        return {
            wrap: false,
            page: {
                pageNum: 1,
                pageSize: 20
            },
            userIds: [],
            list: true,
            check: {
                pageCheck: true,
                disable: false,
                data: []
            }
        };
    }
    get disableDeptTree() {
        return !!this.props?.disableDeptTree;
    }
    get disableRoleTree() {
        return !!this.props?.disableRoleTree;
    }
    get disableDormitoryTree() {
        return !!this.props?.disableDormitoryTree;
    }
    get disableFriendGroup() {
        return !!this.props?.disableFriendGroup;
    }
    get isWarp() {
        return !!this.props?.wrap;
    }
    onDeptSelect(depts) {
        this.table.setTableParam({ deptId: depts[0].key });
        this.onSelectDept.emit(depts);
    }
    onRoleTreeSelect(roles) {
        this.table.setTableParam({ roleId: roles[0].key });
        this.onSelectRole.emit(roles);
    }
    onDormTreeSelect(dorm) {
        if (dorm[0].type === 'building') {
            this.table.setTableParam({ buildId: dorm[0].key });
        }
        else if (dorm[0].type === 'floor') {
            this.table.setTableParam({ buildId: dorm[0].buildPid, floor: dorm[0].key });
        }
        else if (dorm[0].type === 'room') {
            this.table.setTableParam({ buildId: dorm[0].buildPid, floor: dorm[0].floorPid, roomId: dorm[0].key });
        }
        this.onSelectDormitory.emit(dorm);
    }
    onFriendSelect(group) {
        this.table.setTableParam({ friendGroupId: group.id });
        this.onSelectGroup.emit(group);
    }
    onTableUserChecked(users) {
        this.tableUserProps.check.data = users;
        this.onSelect.emit(users);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiContactComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0", type: YunzaiContactComponent, isStandalone: true, selector: "yunzai-contact", inputs: { deptTree: "deptTree", dormitoryTree: "dormitoryTree", friendGroup: "friendGroup", roleTree: "roleTree", tableUser: "tableUser", props: "props" }, outputs: { onSelect: "onSelect", onSelectDept: "onSelectDept", onSelectRole: "onSelectRole", onSelectDormitory: "onSelectDormitory", onSelectGroup: "onSelectGroup" }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }], ngImport: i0, template: `
    @if (isWarp) {
      <nz-card>
        <ng-container [ngTemplateOutlet]="content" />
      </nz-card>
    } @else {
      <ng-container [ngTemplateOutlet]="content" />
    }

    <ng-template #content>
      <nz-row>
        <nz-col [nzSpan]="6">
          <div class="yz-select-contacts-modal-type">
            <nz-radio-group [(ngModel)]="state.cursor">
              @if (!disableDeptTree) {
                <label nz-radio-button nzValue="deptTree">{{ 'deptTree' | i18n }}</label>
              }
              @if (!disableRoleTree) {
                <label nz-radio-button nzValue="roleTree">{{ 'roleTree' | i18n }}</label>
              }
              @if (!disableDormitoryTree) {
                <label nz-radio-button nzValue="dormitoryTree">{{ 'dormitoryTree' | i18n }}</label>
              }
              @if (!disableFriendGroup) {
                <label nz-radio-button nzValue="friendGroup">{{ 'friendGroup' | i18n }}</label>
              }
            </nz-radio-group>
          </div>

          <nz-row class="yz-select-contacts-modal-tree">
            <nz-col [nzSpan]="24">
              @switch (state.cursor) {
                @case ('deptTree') {
                  <yunzai-dept-tree [props]="deptTree" (onSelect)="onDeptSelect($event)" />
                }
                @case ('dormitoryTree') {
                  <yunzai-dormitory-tree [props]="dormitoryTree" (onSelect)="onDormTreeSelect($event)" />
                }
                @case ('roleTree') {
                  <yunzai-role-tree [props]="roleTree" (onSelect)="onRoleTreeSelect($event)" />
                }
                @case ('friendGroup') {
                  <yunzai-friend-group [props]="friendGroup" (onSelect)="onFriendSelect($event)" />
                }
              }
            </nz-col>
          </nz-row>
        </nz-col>
        <nz-col [nzSpan]="18">
          <yunzai-table-user #table [props]="tableUserProps" (onChecked)="onTableUserChecked($event)" />
        </nz-col>
      </nz-row>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzRadioModule }, { kind: "component", type: i3.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus", "nz-radio-button"], exportAs: ["nzRadio"] }, { kind: "component", type: i3.NzRadioGroupComponent, selector: "nz-radio-group", inputs: ["nzDisabled", "nzButtonStyle", "nzSize", "nzName"], exportAs: ["nzRadioGroup"] }, { kind: "ngmodule", type: NzGridModule }, { kind: "directive", type: i4.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i4.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i5.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: YunzaiRoleTreeModule }, { kind: "component", type: i6.YunzaiRoleTreeComponent, selector: "yunzai-role-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiDeptTreeModule }, { kind: "component", type: i7.YunzaiDeptTreeComponent, selector: "yunzai-dept-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiDormitoryTreeModule }, { kind: "component", type: i8.YunzaiDormitoryTreeComponent, selector: "yunzai-dormitory-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiFriendGroupModule }, { kind: "component", type: i9.YunzaiFriendGroupComponent, selector: "yunzai-friend-group", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiTableUserModule }, { kind: "component", type: i10.YunzaiTableUserComponent, selector: "yunzai-table-user", inputs: ["props"], outputs: ["onChecked"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiContactComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-contact`,
                    template: `
    @if (isWarp) {
      <nz-card>
        <ng-container [ngTemplateOutlet]="content" />
      </nz-card>
    } @else {
      <ng-container [ngTemplateOutlet]="content" />
    }

    <ng-template #content>
      <nz-row>
        <nz-col [nzSpan]="6">
          <div class="yz-select-contacts-modal-type">
            <nz-radio-group [(ngModel)]="state.cursor">
              @if (!disableDeptTree) {
                <label nz-radio-button nzValue="deptTree">{{ 'deptTree' | i18n }}</label>
              }
              @if (!disableRoleTree) {
                <label nz-radio-button nzValue="roleTree">{{ 'roleTree' | i18n }}</label>
              }
              @if (!disableDormitoryTree) {
                <label nz-radio-button nzValue="dormitoryTree">{{ 'dormitoryTree' | i18n }}</label>
              }
              @if (!disableFriendGroup) {
                <label nz-radio-button nzValue="friendGroup">{{ 'friendGroup' | i18n }}</label>
              }
            </nz-radio-group>
          </div>

          <nz-row class="yz-select-contacts-modal-tree">
            <nz-col [nzSpan]="24">
              @switch (state.cursor) {
                @case ('deptTree') {
                  <yunzai-dept-tree [props]="deptTree" (onSelect)="onDeptSelect($event)" />
                }
                @case ('dormitoryTree') {
                  <yunzai-dormitory-tree [props]="dormitoryTree" (onSelect)="onDormTreeSelect($event)" />
                }
                @case ('roleTree') {
                  <yunzai-role-tree [props]="roleTree" (onSelect)="onRoleTreeSelect($event)" />
                }
                @case ('friendGroup') {
                  <yunzai-friend-group [props]="friendGroup" (onSelect)="onFriendSelect($event)" />
                }
              }
            </nz-col>
          </nz-row>
        </nz-col>
        <nz-col [nzSpan]="18">
          <yunzai-table-user #table [props]="tableUserProps" (onChecked)="onTableUserChecked($event)" />
        </nz-col>
      </nz-row>
    </ng-template>
  `,
                    standalone: true,
                    imports: [
                        FormsModule,
                        CommonModule,
                        I18nPipe,
                        NzRadioModule,
                        NzGridModule,
                        NzCardModule,
                        YunzaiRoleTreeModule,
                        YunzaiDeptTreeModule,
                        YunzaiDormitoryTreeModule,
                        YunzaiFriendGroupModule,
                        YunzaiTableUserModule
                    ]
                }]
        }], propDecorators: { deptTree: [{
                type: Input
            }], dormitoryTree: [{
                type: Input
            }], friendGroup: [{
                type: Input
            }], roleTree: [{
                type: Input
            }], tableUser: [{
                type: Input
            }], props: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onSelectDept: [{
                type: Output
            }], onSelectRole: [{
                type: Output
            }], onSelectDormitory: [{
                type: Output
            }], onSelectGroup: [{
                type: Output
            }], table: [{
                type: ViewChild,
                args: ['table']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1jb250YWN0L3l1bnphaS1jb250YWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBa0Isb0JBQW9CLEVBQXVCLE1BQU0sNkJBQTZCLENBQUM7QUFDeEcsT0FBTyxFQUVMLHlCQUF5QixFQUUxQixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBcUIsdUJBQXVCLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEgsT0FBTyxFQUFrQixvQkFBb0IsRUFBdUIsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RyxPQUFPLEVBR0wscUJBQXFCLEVBRXRCLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBMkVwRCxNQUFNLE9BQU8sc0JBQXNCO0lBdkVuQztRQStFRSwrREFBK0Q7UUFDNUMsYUFBUSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNyRywrREFBK0Q7UUFDNUMsaUJBQVksR0FBbUMsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDdkcsK0RBQStE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TyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixRQUFRO3dCQUNSLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIscUJBQXFCO3FCQUN0QjtpQkFDRjs4QkFFVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUdhLFFBQVE7c0JBQTFCLE1BQU07Z0JBRVksWUFBWTtzQkFBOUIsTUFBTTtnQkFFWSxZQUFZO3NCQUE5QixNQUFNO2dCQUVZLGlCQUFpQjtzQkFBbkMsTUFBTTtnQkFFWSxhQUFhO3NCQUEvQixNQUFNO2dCQUVhLEtBQUs7c0JBQXhCLFNBQVM7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgWXVuemFpRGVwdFRyZWUsIFl1bnphaURlcHRUcmVlTW9kdWxlLCBZdW56YWlEZXB0VHJlZVByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZGVwdC10cmVlJztcbmltcG9ydCB7XG4gIFl1bnphaURvcm1pdG9yeVRyZWUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVNb2R1bGUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVQcm9wc1xufSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1kb3JtaXRvcnktdHJlZSc7XG5pbXBvcnQgeyBZdW56YWlGcmllbmRHcm91cCwgWXVuemFpRnJpZW5kR3JvdXBNb2R1bGUsIFl1bnphaUZyaWVuZEdyb3VwUHJvcHMgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAnO1xuaW1wb3J0IHsgWXVuemFpUm9sZVRyZWUsIFl1bnphaVJvbGVUcmVlTW9kdWxlLCBZdW56YWlSb2xlVHJlZVByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktcm9sZS10cmVlJztcbmltcG9ydCB7XG4gIFl1bnphaVRhYmxlVXNlcixcbiAgWXVuemFpVGFibGVVc2VyQ29tcG9uZW50LFxuICBZdW56YWlUYWJsZVVzZXJNb2R1bGUsXG4gIFl1bnphaVRhYmxlVXNlclByb3BzXG59IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLXRhYmxlLXVzZXInO1xuaW1wb3J0IHsgSTE4blBpcGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56R3JpZE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZ3JpZCc7XG5pbXBvcnQgeyBOelJhZGlvTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9yYWRpbyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbnRhY3RQcm9wcywgWXVuemFpQ29udGFjdFN0YXRlIH0gZnJvbSAnLi95dW56YWktY29udGFjdC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1jb250YWN0YCxcbiAgdGVtcGxhdGU6IGBcbiAgICBAaWYgKGlzV2FycCkge1xuICAgICAgPG56LWNhcmQ+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiIC8+XG4gICAgICA8L256LWNhcmQ+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgIH1cblxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxuei1yb3c+XG4gICAgICAgIDxuei1jb2wgW256U3Bhbl09XCI2XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC10eXBlXCI+XG4gICAgICAgICAgICA8bnotcmFkaW8tZ3JvdXAgWyhuZ01vZGVsKV09XCJzdGF0ZS5jdXJzb3JcIj5cbiAgICAgICAgICAgICAgQGlmICghZGlzYWJsZURlcHRUcmVlKSB7XG4gICAgICAgICAgICAgICAgPGxhYmVsIG56LXJhZGlvLWJ1dHRvbiBuelZhbHVlPVwiZGVwdFRyZWVcIj57eyAnZGVwdFRyZWUnIHwgaTE4biB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgQGlmICghZGlzYWJsZVJvbGVUcmVlKSB7XG4gICAgICAgICAgICAgICAgPGxhYmVsIG56LXJhZGlvLWJ1dHRvbiBuelZhbHVlPVwicm9sZVRyZWVcIj57eyAncm9sZVRyZWUnIHwgaTE4biB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgQGlmICghZGlzYWJsZURvcm1pdG9yeVRyZWUpIHtcbiAgICAgICAgICAgICAgICA8bGFiZWwgbnotcmFkaW8tYnV0dG9uIG56VmFsdWU9XCJkb3JtaXRvcnlUcmVlXCI+e3sgJ2Rvcm1pdG9yeVRyZWUnIHwgaTE4biB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgQGlmICghZGlzYWJsZUZyaWVuZEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgPGxhYmVsIG56LXJhZGlvLWJ1dHRvbiBuelZhbHVlPVwiZnJpZW5kR3JvdXBcIj57eyAnZnJpZW5kR3JvdXAnIHwgaTE4biB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbnotcmFkaW8tZ3JvdXA+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8bnotcm93IGNsYXNzPVwieXotc2VsZWN0LWNvbnRhY3RzLW1vZGFsLXRyZWVcIj5cbiAgICAgICAgICAgIDxuei1jb2wgW256U3Bhbl09XCIyNFwiPlxuICAgICAgICAgICAgICBAc3dpdGNoIChzdGF0ZS5jdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBAY2FzZSAoJ2RlcHRUcmVlJykge1xuICAgICAgICAgICAgICAgICAgPHl1bnphaS1kZXB0LXRyZWUgW3Byb3BzXT1cImRlcHRUcmVlXCIgKG9uU2VsZWN0KT1cIm9uRGVwdFNlbGVjdCgkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQGNhc2UgKCdkb3JtaXRvcnlUcmVlJykge1xuICAgICAgICAgICAgICAgICAgPHl1bnphaS1kb3JtaXRvcnktdHJlZSBbcHJvcHNdPVwiZG9ybWl0b3J5VHJlZVwiIChvblNlbGVjdCk9XCJvbkRvcm1UcmVlU2VsZWN0KCRldmVudClcIiAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBAY2FzZSAoJ3JvbGVUcmVlJykge1xuICAgICAgICAgICAgICAgICAgPHl1bnphaS1yb2xlLXRyZWUgW3Byb3BzXT1cInJvbGVUcmVlXCIgKG9uU2VsZWN0KT1cIm9uUm9sZVRyZWVTZWxlY3QoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIEBjYXNlICgnZnJpZW5kR3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgICA8eXVuemFpLWZyaWVuZC1ncm91cCBbcHJvcHNdPVwiZnJpZW5kR3JvdXBcIiAob25TZWxlY3QpPVwib25GcmllbmRTZWxlY3QoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L256LWNvbD5cbiAgICAgICAgICA8L256LXJvdz5cbiAgICAgICAgPC9uei1jb2w+XG4gICAgICAgIDxuei1jb2wgW256U3Bhbl09XCIxOFwiPlxuICAgICAgICAgIDx5dW56YWktdGFibGUtdXNlciAjdGFibGUgW3Byb3BzXT1cInRhYmxlVXNlclByb3BzXCIgKG9uQ2hlY2tlZCk9XCJvblRhYmxlVXNlckNoZWNrZWQoJGV2ZW50KVwiIC8+XG4gICAgICAgIDwvbnotY29sPlxuICAgICAgPC9uei1yb3c+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuUGlwZSxcbiAgICBOelJhZGlvTW9kdWxlLFxuICAgIE56R3JpZE1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGUsXG4gICAgWXVuemFpUm9sZVRyZWVNb2R1bGUsXG4gICAgWXVuemFpRGVwdFRyZWVNb2R1bGUsXG4gICAgWXVuemFpRG9ybWl0b3J5VHJlZU1vZHVsZSxcbiAgICBZdW56YWlGcmllbmRHcm91cE1vZHVsZSxcbiAgICBZdW56YWlUYWJsZVVzZXJNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlDb250YWN0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgZGVwdFRyZWU/OiBZdW56YWlEZXB0VHJlZVByb3BzO1xuICBASW5wdXQoKSBkb3JtaXRvcnlUcmVlPzogWXVuemFpRG9ybWl0b3J5VHJlZVByb3BzO1xuICBASW5wdXQoKSBmcmllbmRHcm91cD86IFl1bnphaUZyaWVuZEdyb3VwUHJvcHM7XG4gIEBJbnB1dCgpIHJvbGVUcmVlPzogWXVuemFpUm9sZVRyZWVQcm9wcztcbiAgQElucHV0KCkgdGFibGVVc2VyPzogWXVuemFpVGFibGVVc2VyUHJvcHM7XG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpQ29udGFjdFByb3BzO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxZdW56YWlUYWJsZVVzZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaVRhYmxlVXNlcltdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0RGVwdDogRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlEZXB0VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0Um9sZTogRXZlbnRFbWl0dGVyPFl1bnphaVJvbGVUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0RG9ybWl0b3J5OiBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0R3JvdXA6IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cD4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaUZyaWVuZEdyb3VwPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxlJykgdGFibGUhOiBZdW56YWlUYWJsZVVzZXJDb21wb25lbnQ7XG5cbiAgc3RhdGU6IFl1bnphaUNvbnRhY3RTdGF0ZSA9IHtcbiAgICBjdXJzb3I6ICdkZXB0VHJlZSdcbiAgfTtcblxuICBnZXQgdGFibGVVc2VyUHJvcHMoKTogWXVuemFpVGFibGVVc2VyUHJvcHMge1xuICAgIGlmICh0aGlzLnRhYmxlVXNlcikge1xuICAgICAgcmV0dXJuIHRoaXMudGFibGVVc2VyO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgd3JhcDogZmFsc2UsXG4gICAgICBwYWdlOiB7XG4gICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgIHBhZ2VTaXplOiAyMFxuICAgICAgfSxcbiAgICAgIHVzZXJJZHM6IFtdLFxuICAgICAgbGlzdDogdHJ1ZSxcbiAgICAgIGNoZWNrOiB7XG4gICAgICAgIHBhZ2VDaGVjazogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZTogZmFsc2UsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlRGVwdFRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uZGlzYWJsZURlcHRUcmVlO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVSb2xlVHJlZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy5kaXNhYmxlUm9sZVRyZWU7XG4gIH1cblxuICBnZXQgZGlzYWJsZURvcm1pdG9yeVRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uZGlzYWJsZURvcm1pdG9yeVRyZWU7XG4gIH1cblxuICBnZXQgZGlzYWJsZUZyaWVuZEdyb3VwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LmRpc2FibGVGcmllbmRHcm91cDtcbiAgfVxuXG4gIGdldCBpc1dhcnAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ud3JhcDtcbiAgfVxuXG4gIG9uRGVwdFNlbGVjdChkZXB0czogWXVuemFpRGVwdFRyZWVbXSk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuc2V0VGFibGVQYXJhbSh7IGRlcHRJZDogZGVwdHNbMF0ua2V5IH0pO1xuICAgIHRoaXMub25TZWxlY3REZXB0LmVtaXQoZGVwdHMpO1xuICB9XG5cbiAgb25Sb2xlVHJlZVNlbGVjdChyb2xlczogWXVuemFpUm9sZVRyZWVbXSk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuc2V0VGFibGVQYXJhbSh7IHJvbGVJZDogcm9sZXNbMF0ua2V5IH0pO1xuICAgIHRoaXMub25TZWxlY3RSb2xlLmVtaXQocm9sZXMpO1xuICB9XG5cbiAgb25Eb3JtVHJlZVNlbGVjdChkb3JtOiBZdW56YWlEb3JtaXRvcnlUcmVlW10pOiB2b2lkIHtcbiAgICBpZiAoZG9ybVswXS50eXBlID09PSAnYnVpbGRpbmcnKSB7XG4gICAgICB0aGlzLnRhYmxlLnNldFRhYmxlUGFyYW0oeyBidWlsZElkOiBkb3JtWzBdLmtleSB9KTtcbiAgICB9IGVsc2UgaWYgKGRvcm1bMF0udHlwZSA9PT0gJ2Zsb29yJykge1xuICAgICAgdGhpcy50YWJsZS5zZXRUYWJsZVBhcmFtKHsgYnVpbGRJZDogZG9ybVswXS5idWlsZFBpZCwgZmxvb3I6IGRvcm1bMF0ua2V5IH0pO1xuICAgIH0gZWxzZSBpZiAoZG9ybVswXS50eXBlID09PSAncm9vbScpIHtcbiAgICAgIHRoaXMudGFibGUuc2V0VGFibGVQYXJhbSh7IGJ1aWxkSWQ6IGRvcm1bMF0uYnVpbGRQaWQsIGZsb29yOiBkb3JtWzBdLmZsb29yUGlkLCByb29tSWQ6IGRvcm1bMF0ua2V5IH0pO1xuICAgIH1cbiAgICB0aGlzLm9uU2VsZWN0RG9ybWl0b3J5LmVtaXQoZG9ybSk7XG4gIH1cblxuICBvbkZyaWVuZFNlbGVjdChncm91cDogWXVuemFpRnJpZW5kR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLnNldFRhYmxlUGFyYW0oeyBmcmllbmRHcm91cElkOiBncm91cC5pZCB9KTtcbiAgICB0aGlzLm9uU2VsZWN0R3JvdXAuZW1pdChncm91cCk7XG4gIH1cblxuICBvblRhYmxlVXNlckNoZWNrZWQodXNlcnM6IFl1bnphaVRhYmxlVXNlcltdKTogdm9pZCB7XG4gICAgdGhpcy50YWJsZVVzZXJQcm9wcy5jaGVjayEuZGF0YSA9IHVzZXJzO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh1c2Vycyk7XG4gIH1cbn1cbiJdfQ==