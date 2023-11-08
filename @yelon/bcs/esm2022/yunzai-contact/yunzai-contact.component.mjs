import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/bcs/yunzai-dept-tree";
import * as i2 from "@yelon/bcs/yunzai-dormitory-tree";
import * as i3 from "@yelon/bcs/yunzai-friend-group";
import * as i4 from "@yelon/bcs/yunzai-role-tree";
import * as i5 from "@yelon/bcs/yunzai-table-user";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "ng-zorro-antd/grid";
import * as i9 from "ng-zorro-antd/radio";
import * as i10 from "ng-zorro-antd/card";
import * as i11 from "@yelon/theme";
export class YunzaiContactComponent {
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
    constructor() {
        this.onSelect = new EventEmitter();
        this.onSelectDept = new EventEmitter();
        this.onSelectRole = new EventEmitter();
        this.onSelectDormitory = new EventEmitter();
        this.onSelectGroup = new EventEmitter();
        this.state = {
            cursor: 'deptTree'
        };
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiContactComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiContactComponent, selector: "yunzai-contact", inputs: { deptTree: "deptTree", dormitoryTree: "dormitoryTree", friendGroup: "friendGroup", roleTree: "roleTree", tableUser: "tableUser", props: "props" }, outputs: { onSelect: "onSelect", onSelectDept: "onSelectDept", onSelectRole: "onSelectRole", onSelectDormitory: "onSelectDormitory", onSelectGroup: "onSelectGroup" }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }], ngImport: i0, template: `
    <nz-card *ngIf="isWarp">
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </nz-card>

    <ng-container *ngIf="!isWarp" [ngTemplateOutlet]="content"></ng-container>

    <ng-template #content>
      <nz-row>
        <nz-col [nzSpan]="6">

          <div class="yz-select-contacts-modal-type">
            <nz-radio-group [(ngModel)]="state.cursor">
              <label *ngIf="!disableDeptTree" nz-radio-button
                     nzValue="deptTree">{{'deptTree'|i18n}}</label>
              <label *ngIf="!disableRoleTree" nz-radio-button
                     nzValue="roleTree">{{'roleTree'|i18n}}</label>
              <label *ngIf="!disableDormitoryTree" nz-radio-button
                     nzValue="dormitoryTree">{{'dormitoryTree'|i18n}}</label>
              <label *ngIf="!disableFriendGroup" nz-radio-button
                     nzValue="friendGroup">{{'friendGroup'|i18n}}</label>
            </nz-radio-group>
          </div>

          <nz-row class="yz-select-contacts-modal-tree">
            <nz-col [nzSpan]="24" [ngSwitch]="state.cursor">
              <yunzai-dept-tree *ngSwitchCase="'deptTree'" [props]="deptTree"
                             (onSelect)="onDeptSelect($event)"></yunzai-dept-tree>
              <yunzai-dormitory-tree *ngSwitchCase="'dormitoryTree'" [props]="dormitoryTree"
                                  (onSelect)="onDormTreeSelect($event)"></yunzai-dormitory-tree>
              <yunzai-role-tree *ngSwitchCase="'roleTree'" [props]="roleTree"
                             (onSelect)="onRoleTreeSelect($event)"></yunzai-role-tree>
              <yunzai-friend-group *ngSwitchCase="'friendGroup'" [props]="friendGroup"
                                (onSelect)="onFriendSelect($event)"></yunzai-friend-group>
            </nz-col>
          </nz-row>
        </nz-col>
        <nz-col [nzSpan]="18">
          <yunzai-table-user #table [props]="tableUserProps"
                          (onChecked)="onTableUserChecked($event)"></yunzai-table-user>
        </nz-col>
      </nz-row>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "component", type: i1.YunzaiDeptTreeComponent, selector: "yunzai-dept-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "component", type: i2.YunzaiDormitoryTreeComponent, selector: "yunzai-dormitory-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "component", type: i3.YunzaiFriendGroupComponent, selector: "yunzai-friend-group", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "component", type: i4.YunzaiRoleTreeComponent, selector: "yunzai-role-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "component", type: i5.YunzaiTableUserComponent, selector: "yunzai-table-user", inputs: ["props"], outputs: ["onChecked"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i8.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i8.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "component", type: i9.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus"], exportAs: ["nzRadio"] }, { kind: "directive", type: i9.NzRadioButtonDirective, selector: "[nz-radio-button]" }, { kind: "component", type: i9.NzRadioGroupComponent, selector: "nz-radio-group", inputs: ["nzDisabled", "nzButtonStyle", "nzSize", "nzName"], exportAs: ["nzRadioGroup"] }, { kind: "component", type: i10.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "pipe", type: i11.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiContactComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-contact`,
                    template: `
    <nz-card *ngIf="isWarp">
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </nz-card>

    <ng-container *ngIf="!isWarp" [ngTemplateOutlet]="content"></ng-container>

    <ng-template #content>
      <nz-row>
        <nz-col [nzSpan]="6">

          <div class="yz-select-contacts-modal-type">
            <nz-radio-group [(ngModel)]="state.cursor">
              <label *ngIf="!disableDeptTree" nz-radio-button
                     nzValue="deptTree">{{'deptTree'|i18n}}</label>
              <label *ngIf="!disableRoleTree" nz-radio-button
                     nzValue="roleTree">{{'roleTree'|i18n}}</label>
              <label *ngIf="!disableDormitoryTree" nz-radio-button
                     nzValue="dormitoryTree">{{'dormitoryTree'|i18n}}</label>
              <label *ngIf="!disableFriendGroup" nz-radio-button
                     nzValue="friendGroup">{{'friendGroup'|i18n}}</label>
            </nz-radio-group>
          </div>

          <nz-row class="yz-select-contacts-modal-tree">
            <nz-col [nzSpan]="24" [ngSwitch]="state.cursor">
              <yunzai-dept-tree *ngSwitchCase="'deptTree'" [props]="deptTree"
                             (onSelect)="onDeptSelect($event)"></yunzai-dept-tree>
              <yunzai-dormitory-tree *ngSwitchCase="'dormitoryTree'" [props]="dormitoryTree"
                                  (onSelect)="onDormTreeSelect($event)"></yunzai-dormitory-tree>
              <yunzai-role-tree *ngSwitchCase="'roleTree'" [props]="roleTree"
                             (onSelect)="onRoleTreeSelect($event)"></yunzai-role-tree>
              <yunzai-friend-group *ngSwitchCase="'friendGroup'" [props]="friendGroup"
                                (onSelect)="onFriendSelect($event)"></yunzai-friend-group>
            </nz-col>
          </nz-row>
        </nz-col>
        <nz-col [nzSpan]="18">
          <yunzai-table-user #table [props]="tableUserProps"
                          (onChecked)="onTableUserChecked($event)"></yunzai-table-user>
        </nz-col>
      </nz-row>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { deptTree: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1jb250YWN0L3l1bnphaS1jb250YWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQXlEbEYsTUFBTSxPQUFPLHNCQUFzQjtJQW9CakMsSUFBSSxjQUFjO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7UUFDRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDYjtZQUNELE9BQU8sRUFBQyxFQUFFO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsSUFBSSxFQUFFLEVBQUU7YUFDVDtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksb0JBQW9CO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUM7SUFDNUMsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVB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QTJDVDs7NEZBRVUsc0JBQXNCO2tCQS9DbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ1Q7aUJBQ0Y7MEVBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFFSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFFYSxLQUFLO3NCQUF4QixTQUFTO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFl1bnphaURlcHRUcmVlLCBZdW56YWlEZXB0VHJlZVByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZGVwdC10cmVlJztcbmltcG9ydCB7IFl1bnphaURvcm1pdG9yeVRyZWUsIFl1bnphaURvcm1pdG9yeVRyZWVQcm9wcyB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLWRvcm1pdG9yeS10cmVlJztcbmltcG9ydCB7IFl1bnphaUZyaWVuZEdyb3VwLCBZdW56YWlGcmllbmRHcm91cFByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZnJpZW5kLWdyb3VwJztcbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlLCBZdW56YWlSb2xlVHJlZVByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktcm9sZS10cmVlJztcbmltcG9ydCB7IFl1bnphaVRhYmxlVXNlciwgWXVuemFpVGFibGVVc2VyQ29tcG9uZW50LCBZdW56YWlUYWJsZVVzZXJQcm9wcyB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLXRhYmxlLXVzZXInO1xuXG5pbXBvcnQgeyBZdW56YWlDb250YWN0UHJvcHMsIFl1bnphaUNvbnRhY3RTdGF0ZSB9IGZyb20gJy4veXVuemFpLWNvbnRhY3QudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktY29udGFjdGAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LWNhcmQgKm5nSWY9XCJpc1dhcnBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbnotY2FyZD5cblxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNXYXJwXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICAgICAgPG56LXJvdz5cbiAgICAgICAgPG56LWNvbCBbbnpTcGFuXT1cIjZcIj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1zZWxlY3QtY29udGFjdHMtbW9kYWwtdHlwZVwiPlxuICAgICAgICAgICAgPG56LXJhZGlvLWdyb3VwIFsobmdNb2RlbCldPVwic3RhdGUuY3Vyc29yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIiFkaXNhYmxlRGVwdFRyZWVcIiBuei1yYWRpby1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgIG56VmFsdWU9XCJkZXB0VHJlZVwiPnt7J2RlcHRUcmVlJ3xpMThufX08L2xhYmVsPlxuICAgICAgICAgICAgICA8bGFiZWwgKm5nSWY9XCIhZGlzYWJsZVJvbGVUcmVlXCIgbnotcmFkaW8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICBuelZhbHVlPVwicm9sZVRyZWVcIj57eydyb2xlVHJlZSd8aTE4bn19PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGxhYmVsICpuZ0lmPVwiIWRpc2FibGVEb3JtaXRvcnlUcmVlXCIgbnotcmFkaW8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICBuelZhbHVlPVwiZG9ybWl0b3J5VHJlZVwiPnt7J2Rvcm1pdG9yeVRyZWUnfGkxOG59fTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIiFkaXNhYmxlRnJpZW5kR3JvdXBcIiBuei1yYWRpby1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgIG56VmFsdWU9XCJmcmllbmRHcm91cFwiPnt7J2ZyaWVuZEdyb3VwJ3xpMThufX08L2xhYmVsPlxuICAgICAgICAgICAgPC9uei1yYWRpby1ncm91cD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxuei1yb3cgY2xhc3M9XCJ5ei1zZWxlY3QtY29udGFjdHMtbW9kYWwtdHJlZVwiPlxuICAgICAgICAgICAgPG56LWNvbCBbbnpTcGFuXT1cIjI0XCIgW25nU3dpdGNoXT1cInN0YXRlLmN1cnNvclwiPlxuICAgICAgICAgICAgICA8eXVuemFpLWRlcHQtdHJlZSAqbmdTd2l0Y2hDYXNlPVwiJ2RlcHRUcmVlJ1wiIFtwcm9wc109XCJkZXB0VHJlZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkRlcHRTZWxlY3QoJGV2ZW50KVwiPjwveXVuemFpLWRlcHQtdHJlZT5cbiAgICAgICAgICAgICAgPHl1bnphaS1kb3JtaXRvcnktdHJlZSAqbmdTd2l0Y2hDYXNlPVwiJ2Rvcm1pdG9yeVRyZWUnXCIgW3Byb3BzXT1cImRvcm1pdG9yeVRyZWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkRvcm1UcmVlU2VsZWN0KCRldmVudClcIj48L3l1bnphaS1kb3JtaXRvcnktdHJlZT5cbiAgICAgICAgICAgICAgPHl1bnphaS1yb2xlLXRyZWUgKm5nU3dpdGNoQ2FzZT1cIidyb2xlVHJlZSdcIiBbcHJvcHNdPVwicm9sZVRyZWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25Sb2xlVHJlZVNlbGVjdCgkZXZlbnQpXCI+PC95dW56YWktcm9sZS10cmVlPlxuICAgICAgICAgICAgICA8eXVuemFpLWZyaWVuZC1ncm91cCAqbmdTd2l0Y2hDYXNlPVwiJ2ZyaWVuZEdyb3VwJ1wiIFtwcm9wc109XCJmcmllbmRHcm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkZyaWVuZFNlbGVjdCgkZXZlbnQpXCI+PC95dW56YWktZnJpZW5kLWdyb3VwPlxuICAgICAgICAgICAgPC9uei1jb2w+XG4gICAgICAgICAgPC9uei1yb3c+XG4gICAgICAgIDwvbnotY29sPlxuICAgICAgICA8bnotY29sIFtuelNwYW5dPVwiMThcIj5cbiAgICAgICAgICA8eXVuemFpLXRhYmxlLXVzZXIgI3RhYmxlIFtwcm9wc109XCJ0YWJsZVVzZXJQcm9wc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNoZWNrZWQpPVwib25UYWJsZVVzZXJDaGVja2VkKCRldmVudClcIj48L3l1bnphaS10YWJsZS11c2VyPlxuICAgICAgICA8L256LWNvbD5cbiAgICAgIDwvbnotcm93PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpQ29udGFjdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRlcHRUcmVlPzogWXVuemFpRGVwdFRyZWVQcm9wcztcbiAgQElucHV0KCkgZG9ybWl0b3J5VHJlZT86IFl1bnphaURvcm1pdG9yeVRyZWVQcm9wcztcbiAgQElucHV0KCkgZnJpZW5kR3JvdXA/OiBZdW56YWlGcmllbmRHcm91cFByb3BzO1xuICBASW5wdXQoKSByb2xlVHJlZT86IFl1bnphaVJvbGVUcmVlUHJvcHM7XG4gIEBJbnB1dCgpIHRhYmxlVXNlcj86IFl1bnphaVRhYmxlVXNlclByb3BzO1xuICBASW5wdXQoKSBwcm9wcz86IFl1bnphaUNvbnRhY3RQcm9wcztcblxuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxZdW56YWlUYWJsZVVzZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaVRhYmxlVXNlcltdPigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3REZXB0OiBFdmVudEVtaXR0ZXI8WXVuemFpRGVwdFRyZWVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdFJvbGU6IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpUm9sZVRyZWVbXT4oKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0RG9ybWl0b3J5OiBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3RHcm91cDogRXZlbnRFbWl0dGVyPFl1bnphaUZyaWVuZEdyb3VwPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRnJpZW5kR3JvdXA+KCk7XG5cbiAgQFZpZXdDaGlsZCgndGFibGUnKSB0YWJsZSE6IFl1bnphaVRhYmxlVXNlckNvbXBvbmVudDtcblxuICBzdGF0ZTogWXVuemFpQ29udGFjdFN0YXRlID0ge1xuICAgIGN1cnNvcjogJ2RlcHRUcmVlJ1xuICB9O1xuXG4gIGdldCB0YWJsZVVzZXJQcm9wcygpOiBZdW56YWlUYWJsZVVzZXJQcm9wcyB7XG4gICAgaWYgKHRoaXMudGFibGVVc2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy50YWJsZVVzZXI7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3cmFwOiBmYWxzZSxcbiAgICAgIHBhZ2U6IHtcbiAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgcGFnZVNpemU6IDIwXG4gICAgICB9LFxuICAgICAgdXNlcklkczpbXSxcbiAgICAgIGxpc3Q6IHRydWUsXG4gICAgICBjaGVjazoge1xuICAgICAgICBwYWdlQ2hlY2s6IHRydWUsXG4gICAgICAgIGRpc2FibGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiBbXVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgZGlzYWJsZURlcHRUcmVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LmRpc2FibGVEZXB0VHJlZTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlUm9sZVRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uZGlzYWJsZVJvbGVUcmVlO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVEb3JtaXRvcnlUcmVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LmRpc2FibGVEb3JtaXRvcnlUcmVlO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVGcmllbmRHcm91cCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy5kaXNhYmxlRnJpZW5kR3JvdXA7XG4gIH1cblxuICBnZXQgaXNXYXJwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LndyYXA7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgb25EZXB0U2VsZWN0KGRlcHRzOiBZdW56YWlEZXB0VHJlZVtdKTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5zZXRUYWJsZVBhcmFtKHsgZGVwdElkOiBkZXB0c1swXS5rZXkgfSk7XG4gICAgdGhpcy5vblNlbGVjdERlcHQuZW1pdChkZXB0cyk7XG4gIH1cblxuICBvblJvbGVUcmVlU2VsZWN0KHJvbGVzOiBZdW56YWlSb2xlVHJlZVtdKTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5zZXRUYWJsZVBhcmFtKHsgcm9sZUlkOiByb2xlc1swXS5rZXkgfSk7XG4gICAgdGhpcy5vblNlbGVjdFJvbGUuZW1pdChyb2xlcyk7XG4gIH1cblxuICBvbkRvcm1UcmVlU2VsZWN0KGRvcm06IFl1bnphaURvcm1pdG9yeVRyZWVbXSk6IHZvaWQge1xuICAgIGlmIChkb3JtWzBdLnR5cGUgPT09ICdidWlsZGluZycpIHtcbiAgICAgIHRoaXMudGFibGUuc2V0VGFibGVQYXJhbSh7IGJ1aWxkSWQ6IGRvcm1bMF0ua2V5IH0pO1xuICAgIH0gZWxzZSBpZiAoZG9ybVswXS50eXBlID09PSAnZmxvb3InKSB7XG4gICAgICB0aGlzLnRhYmxlLnNldFRhYmxlUGFyYW0oeyBidWlsZElkOiBkb3JtWzBdLmJ1aWxkUGlkLCBmbG9vcjogZG9ybVswXS5rZXkgfSk7XG4gICAgfSBlbHNlIGlmIChkb3JtWzBdLnR5cGUgPT09ICdyb29tJykge1xuICAgICAgdGhpcy50YWJsZS5zZXRUYWJsZVBhcmFtKHsgYnVpbGRJZDogZG9ybVswXS5idWlsZFBpZCwgZmxvb3I6IGRvcm1bMF0uZmxvb3JQaWQsIHJvb21JZDogZG9ybVswXS5rZXkgfSk7XG4gICAgfVxuICAgIHRoaXMub25TZWxlY3REb3JtaXRvcnkuZW1pdChkb3JtKTtcbiAgfVxuXG4gIG9uRnJpZW5kU2VsZWN0KGdyb3VwOiBZdW56YWlGcmllbmRHcm91cCk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuc2V0VGFibGVQYXJhbSh7IGZyaWVuZEdyb3VwSWQ6IGdyb3VwLmlkIH0pO1xuICAgIHRoaXMub25TZWxlY3RHcm91cC5lbWl0KGdyb3VwKTtcbiAgfVxuXG4gIG9uVGFibGVVc2VyQ2hlY2tlZCh1c2VyczogWXVuemFpVGFibGVVc2VyW10pOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlVXNlclByb3BzLmNoZWNrIS5kYXRhID0gdXNlcnM7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHVzZXJzKTtcbiAgfVxufVxuIl19