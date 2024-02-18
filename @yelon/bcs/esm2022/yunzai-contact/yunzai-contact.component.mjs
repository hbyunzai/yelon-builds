import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YunzaiDeptTreeModule } from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import { YunzaiThemeModule } from '@yelon/theme';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@yelon/bcs/yunzai-dept-tree";
import * as i3 from "@yelon/bcs/yunzai-dormitory-tree";
import * as i4 from "@yelon/bcs/yunzai-friend-group";
import * as i5 from "@yelon/bcs/yunzai-role-tree";
import * as i6 from "@yelon/bcs/yunzai-table-user";
import * as i7 from "@angular/common";
import * as i8 from "ng-zorro-antd/card";
import * as i9 from "ng-zorro-antd/grid";
import * as i10 from "ng-zorro-antd/radio";
import * as i11 from "@angular/forms";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiContactComponent, isStandalone: true, selector: "yunzai-contact", inputs: { deptTree: "deptTree", dormitoryTree: "dormitoryTree", friendGroup: "friendGroup", roleTree: "roleTree", tableUser: "tableUser", props: "props" }, outputs: { onSelect: "onSelect", onSelectDept: "onSelectDept", onSelectRole: "onSelectRole", onSelectDormitory: "onSelectDormitory", onSelectGroup: "onSelectGroup" }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }], ngImport: i0, template: `
    <nz-card *ngIf="isWarp">
      <ng-container [ngTemplateOutlet]="content" />
    </nz-card>

    <ng-container *ngIf="!isWarp" [ngTemplateOutlet]="content" />

    <ng-template #content>
      <nz-row>
        <nz-col [nzSpan]="6">
          <div class="yz-select-contacts-modal-type">
            <nz-radio-group [(ngModel)]="state.cursor">
              <label *ngIf="!disableDeptTree" nz-radio-button nzValue="deptTree">{{ 'deptTree' | i18n }}</label>
              <label *ngIf="!disableRoleTree" nz-radio-button nzValue="roleTree">{{ 'roleTree' | i18n }}</label>
              <label *ngIf="!disableDormitoryTree" nz-radio-button nzValue="dormitoryTree">{{
                'dormitoryTree' | i18n
              }}</label>
              <label *ngIf="!disableFriendGroup" nz-radio-button nzValue="friendGroup">{{
                'friendGroup' | i18n
              }}</label>
            </nz-radio-group>
          </div>

          <nz-row class="yz-select-contacts-modal-tree">
            <nz-col [nzSpan]="24" [ngSwitch]="state.cursor">
              <yunzai-dept-tree *ngSwitchCase="'deptTree'" [props]="deptTree" (onSelect)="onDeptSelect($event)" />
              <yunzai-dormitory-tree
                *ngSwitchCase="'dormitoryTree'"
                [props]="dormitoryTree"
                (onSelect)="onDormTreeSelect($event)"
              />
              <yunzai-role-tree *ngSwitchCase="'roleTree'" [props]="roleTree" (onSelect)="onRoleTreeSelect($event)" />
              <yunzai-friend-group
                *ngSwitchCase="'friendGroup'"
                [props]="friendGroup"
                (onSelect)="onFriendSelect($event)"
              />
            </nz-col>
          </nz-row>
        </nz-col>
        <nz-col [nzSpan]="18">
          <yunzai-table-user #table [props]="tableUserProps" (onChecked)="onTableUserChecked($event)" />
        </nz-col>
      </nz-row>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: YunzaiThemeModule }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }, { kind: "ngmodule", type: YunzaiDeptTreeModule }, { kind: "component", type: i2.YunzaiDeptTreeComponent, selector: "yunzai-dept-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiDormitoryTreeModule }, { kind: "component", type: i3.YunzaiDormitoryTreeComponent, selector: "yunzai-dormitory-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiFriendGroupModule }, { kind: "component", type: i4.YunzaiFriendGroupComponent, selector: "yunzai-friend-group", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiRoleTreeModule }, { kind: "component", type: i5.YunzaiRoleTreeComponent, selector: "yunzai-role-tree", inputs: ["props"], outputs: ["onQueryComplete", "onSelect"] }, { kind: "ngmodule", type: YunzaiTableUserModule }, { kind: "component", type: i6.YunzaiTableUserComponent, selector: "yunzai-table-user", inputs: ["props"], outputs: ["onChecked"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i8.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: NzGridModule }, { kind: "directive", type: i9.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i9.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "ngmodule", type: NzRadioModule }, { kind: "component", type: i10.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus"], exportAs: ["nzRadio"] }, { kind: "directive", type: i10.NzRadioButtonDirective, selector: "[nz-radio-button]" }, { kind: "component", type: i10.NzRadioGroupComponent, selector: "nz-radio-group", inputs: ["nzDisabled", "nzButtonStyle", "nzSize", "nzName"], exportAs: ["nzRadioGroup"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-contact`,
                    template: `
    <nz-card *ngIf="isWarp">
      <ng-container [ngTemplateOutlet]="content" />
    </nz-card>

    <ng-container *ngIf="!isWarp" [ngTemplateOutlet]="content" />

    <ng-template #content>
      <nz-row>
        <nz-col [nzSpan]="6">
          <div class="yz-select-contacts-modal-type">
            <nz-radio-group [(ngModel)]="state.cursor">
              <label *ngIf="!disableDeptTree" nz-radio-button nzValue="deptTree">{{ 'deptTree' | i18n }}</label>
              <label *ngIf="!disableRoleTree" nz-radio-button nzValue="roleTree">{{ 'roleTree' | i18n }}</label>
              <label *ngIf="!disableDormitoryTree" nz-radio-button nzValue="dormitoryTree">{{
                'dormitoryTree' | i18n
              }}</label>
              <label *ngIf="!disableFriendGroup" nz-radio-button nzValue="friendGroup">{{
                'friendGroup' | i18n
              }}</label>
            </nz-radio-group>
          </div>

          <nz-row class="yz-select-contacts-modal-tree">
            <nz-col [nzSpan]="24" [ngSwitch]="state.cursor">
              <yunzai-dept-tree *ngSwitchCase="'deptTree'" [props]="deptTree" (onSelect)="onDeptSelect($event)" />
              <yunzai-dormitory-tree
                *ngSwitchCase="'dormitoryTree'"
                [props]="dormitoryTree"
                (onSelect)="onDormTreeSelect($event)"
              />
              <yunzai-role-tree *ngSwitchCase="'roleTree'" [props]="roleTree" (onSelect)="onRoleTreeSelect($event)" />
              <yunzai-friend-group
                *ngSwitchCase="'friendGroup'"
                [props]="friendGroup"
                (onSelect)="onFriendSelect($event)"
              />
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
                        YunzaiThemeModule,
                        YunzaiDeptTreeModule,
                        YunzaiDormitoryTreeModule,
                        YunzaiFriendGroupModule,
                        YunzaiRoleTreeModule,
                        YunzaiTableUserModule,
                        CommonModule,
                        NzCardModule,
                        NzGridModule,
                        NzRadioModule,
                        FormsModule
                    ]
                }]
        }], ctorParameters: () => [], propDecorators: { deptTree: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1jb250YWN0L3l1bnphaS1jb250YWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBdUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RyxPQUFPLEVBQ0wseUJBQXlCLEVBRzFCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLHVCQUF1QixFQUE2QyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BILE9BQU8sRUFBa0Isb0JBQW9CLEVBQXVCLE1BQU0sNkJBQTZCLENBQUM7QUFDeEcsT0FBTyxFQUVMLHFCQUFxQixFQUd0QixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQW1FcEQsTUFBTSxPQUFPLHNCQUFzQjtJQXlCakMsSUFBSSxjQUFjO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsT0FBTztZQUNMLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2I7WUFDRCxPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLG9CQUFvQjtRQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQ7UUF6REEsK0RBQStEO1FBQzVDLGFBQVEsR0FBb0MsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDckcsK0RBQStEO1FBQzVDLGlCQUFZLEdBQW1DLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQ3ZHLCtEQUErRDtRQUM1QyxpQkFBWSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUN2RywrREFBK0Q7UUFDNUMsc0JBQWlCLEdBQXdDLElBQUksWUFBWSxFQUF5QixDQUFDO1FBQ3RILCtEQUErRDtRQUM1QyxrQkFBYSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUkxRyxVQUFLLEdBQXVCO1lBQzFCLE1BQU0sRUFBRSxVQUFVO1NBQ25CLENBQUM7SUEwQ2EsQ0FBQztJQUVoQixZQUFZLENBQUMsS0FBdUI7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQXVCO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUEyQjtRQUMxQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5RSxDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hHLENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBd0I7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQXdCO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs4R0FoR1Usc0JBQXNCO2tHQUF0QixzQkFBc0IsNmVBN0R2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNULDJEQUdDLGlCQUFpQixpRkFDakIsb0JBQW9CLGtMQUNwQix5QkFBeUIsNExBQ3pCLHVCQUF1Qix3TEFDdkIsb0JBQW9CLGtMQUNwQixxQkFBcUIsa0tBQ3JCLFlBQVkscWVBQ1osWUFBWSwrUUFDWixZQUFZLHFiQUNaLGFBQWEseWNBQ2IsV0FBVzs7MkZBR0Ysc0JBQXNCO2tCQS9EbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsV0FBVztxQkFDWjtpQkFDRjt3REFFVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUdhLFFBQVE7c0JBQTFCLE1BQU07Z0JBRVksWUFBWTtzQkFBOUIsTUFBTTtnQkFFWSxZQUFZO3NCQUE5QixNQUFNO2dCQUVZLGlCQUFpQjtzQkFBbkMsTUFBTTtnQkFFWSxhQUFhO3NCQUEvQixNQUFNO2dCQUVhLEtBQUs7c0JBQXhCLFNBQVM7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgWXVuemFpRGVwdFRyZWVNb2R1bGUsIFl1bnphaURlcHRUcmVlLCBZdW56YWlEZXB0VHJlZVByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZGVwdC10cmVlJztcbmltcG9ydCB7XG4gIFl1bnphaURvcm1pdG9yeVRyZWVNb2R1bGUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWUsXG4gIFl1bnphaURvcm1pdG9yeVRyZWVQcm9wc1xufSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1kb3JtaXRvcnktdHJlZSc7XG5pbXBvcnQgeyBZdW56YWlGcmllbmRHcm91cE1vZHVsZSwgWXVuemFpRnJpZW5kR3JvdXAsIFl1bnphaUZyaWVuZEdyb3VwUHJvcHMgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAnO1xuaW1wb3J0IHsgWXVuemFpUm9sZVRyZWUsIFl1bnphaVJvbGVUcmVlTW9kdWxlLCBZdW56YWlSb2xlVHJlZVByb3BzIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktcm9sZS10cmVlJztcbmltcG9ydCB7XG4gIFl1bnphaVRhYmxlVXNlckNvbXBvbmVudCxcbiAgWXVuemFpVGFibGVVc2VyTW9kdWxlLFxuICBZdW56YWlUYWJsZVVzZXIsXG4gIFl1bnphaVRhYmxlVXNlclByb3BzXG59IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLXRhYmxlLXVzZXInO1xuaW1wb3J0IHsgWXVuemFpVGhlbWVNb2R1bGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56R3JpZE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZ3JpZCc7XG5pbXBvcnQgeyBOelJhZGlvTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9yYWRpbyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbnRhY3RQcm9wcywgWXVuemFpQ29udGFjdFN0YXRlIH0gZnJvbSAnLi95dW56YWktY29udGFjdC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1jb250YWN0YCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotY2FyZCAqbmdJZj1cImlzV2FycFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICA8L256LWNhcmQ+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzV2FycFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICAgICAgPG56LXJvdz5cbiAgICAgICAgPG56LWNvbCBbbnpTcGFuXT1cIjZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotc2VsZWN0LWNvbnRhY3RzLW1vZGFsLXR5cGVcIj5cbiAgICAgICAgICAgIDxuei1yYWRpby1ncm91cCBbKG5nTW9kZWwpXT1cInN0YXRlLmN1cnNvclwiPlxuICAgICAgICAgICAgICA8bGFiZWwgKm5nSWY9XCIhZGlzYWJsZURlcHRUcmVlXCIgbnotcmFkaW8tYnV0dG9uIG56VmFsdWU9XCJkZXB0VHJlZVwiPnt7ICdkZXB0VHJlZScgfCBpMThuIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGxhYmVsICpuZ0lmPVwiIWRpc2FibGVSb2xlVHJlZVwiIG56LXJhZGlvLWJ1dHRvbiBuelZhbHVlPVwicm9sZVRyZWVcIj57eyAncm9sZVRyZWUnIHwgaTE4biB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIiFkaXNhYmxlRG9ybWl0b3J5VHJlZVwiIG56LXJhZGlvLWJ1dHRvbiBuelZhbHVlPVwiZG9ybWl0b3J5VHJlZVwiPnt7XG4gICAgICAgICAgICAgICAgJ2Rvcm1pdG9yeVRyZWUnIHwgaTE4blxuICAgICAgICAgICAgICB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIiFkaXNhYmxlRnJpZW5kR3JvdXBcIiBuei1yYWRpby1idXR0b24gbnpWYWx1ZT1cImZyaWVuZEdyb3VwXCI+e3tcbiAgICAgICAgICAgICAgICAnZnJpZW5kR3JvdXAnIHwgaTE4blxuICAgICAgICAgICAgICB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8L256LXJhZGlvLWdyb3VwPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPG56LXJvdyBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC10cmVlXCI+XG4gICAgICAgICAgICA8bnotY29sIFtuelNwYW5dPVwiMjRcIiBbbmdTd2l0Y2hdPVwic3RhdGUuY3Vyc29yXCI+XG4gICAgICAgICAgICAgIDx5dW56YWktZGVwdC10cmVlICpuZ1N3aXRjaENhc2U9XCInZGVwdFRyZWUnXCIgW3Byb3BzXT1cImRlcHRUcmVlXCIgKG9uU2VsZWN0KT1cIm9uRGVwdFNlbGVjdCgkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgICAgPHl1bnphaS1kb3JtaXRvcnktdHJlZVxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInZG9ybWl0b3J5VHJlZSdcIlxuICAgICAgICAgICAgICAgIFtwcm9wc109XCJkb3JtaXRvcnlUcmVlXCJcbiAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25Eb3JtVHJlZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHl1bnphaS1yb2xlLXRyZWUgKm5nU3dpdGNoQ2FzZT1cIidyb2xlVHJlZSdcIiBbcHJvcHNdPVwicm9sZVRyZWVcIiAob25TZWxlY3QpPVwib25Sb2xlVHJlZVNlbGVjdCgkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgICAgPHl1bnphaS1mcmllbmQtZ3JvdXBcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2ZyaWVuZEdyb3VwJ1wiXG4gICAgICAgICAgICAgICAgW3Byb3BzXT1cImZyaWVuZEdyb3VwXCJcbiAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25GcmllbmRTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L256LWNvbD5cbiAgICAgICAgICA8L256LXJvdz5cbiAgICAgICAgPC9uei1jb2w+XG4gICAgICAgIDxuei1jb2wgW256U3Bhbl09XCIxOFwiPlxuICAgICAgICAgIDx5dW56YWktdGFibGUtdXNlciAjdGFibGUgW3Byb3BzXT1cInRhYmxlVXNlclByb3BzXCIgKG9uQ2hlY2tlZCk9XCJvblRhYmxlVXNlckNoZWNrZWQoJGV2ZW50KVwiIC8+XG4gICAgICAgIDwvbnotY29sPlxuICAgICAgPC9uei1yb3c+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIFl1bnphaVRoZW1lTW9kdWxlLFxuICAgIFl1bnphaURlcHRUcmVlTW9kdWxlLFxuICAgIFl1bnphaURvcm1pdG9yeVRyZWVNb2R1bGUsXG4gICAgWXVuemFpRnJpZW5kR3JvdXBNb2R1bGUsXG4gICAgWXVuemFpUm9sZVRyZWVNb2R1bGUsXG4gICAgWXVuemFpVGFibGVVc2VyTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGUsXG4gICAgTnpHcmlkTW9kdWxlLFxuICAgIE56UmFkaW9Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlDb250YWN0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgZGVwdFRyZWU/OiBZdW56YWlEZXB0VHJlZVByb3BzO1xuICBASW5wdXQoKSBkb3JtaXRvcnlUcmVlPzogWXVuemFpRG9ybWl0b3J5VHJlZVByb3BzO1xuICBASW5wdXQoKSBmcmllbmRHcm91cD86IFl1bnphaUZyaWVuZEdyb3VwUHJvcHM7XG4gIEBJbnB1dCgpIHJvbGVUcmVlPzogWXVuemFpUm9sZVRyZWVQcm9wcztcbiAgQElucHV0KCkgdGFibGVVc2VyPzogWXVuemFpVGFibGVVc2VyUHJvcHM7XG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpQ29udGFjdFByb3BzO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxZdW56YWlUYWJsZVVzZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaVRhYmxlVXNlcltdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0RGVwdDogRXZlbnRFbWl0dGVyPFl1bnphaURlcHRUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlEZXB0VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0Um9sZTogRXZlbnRFbWl0dGVyPFl1bnphaVJvbGVUcmVlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlSb2xlVHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0RG9ybWl0b3J5OiBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRG9ybWl0b3J5VHJlZVtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0R3JvdXA6IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cD4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaUZyaWVuZEdyb3VwPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxlJykgdGFibGUhOiBZdW56YWlUYWJsZVVzZXJDb21wb25lbnQ7XG5cbiAgc3RhdGU6IFl1bnphaUNvbnRhY3RTdGF0ZSA9IHtcbiAgICBjdXJzb3I6ICdkZXB0VHJlZSdcbiAgfTtcblxuICBnZXQgdGFibGVVc2VyUHJvcHMoKTogWXVuemFpVGFibGVVc2VyUHJvcHMge1xuICAgIGlmICh0aGlzLnRhYmxlVXNlcikge1xuICAgICAgcmV0dXJuIHRoaXMudGFibGVVc2VyO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgd3JhcDogZmFsc2UsXG4gICAgICBwYWdlOiB7XG4gICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgIHBhZ2VTaXplOiAyMFxuICAgICAgfSxcbiAgICAgIHVzZXJJZHM6IFtdLFxuICAgICAgbGlzdDogdHJ1ZSxcbiAgICAgIGNoZWNrOiB7XG4gICAgICAgIHBhZ2VDaGVjazogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZTogZmFsc2UsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlRGVwdFRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uZGlzYWJsZURlcHRUcmVlO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVSb2xlVHJlZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy5kaXNhYmxlUm9sZVRyZWU7XG4gIH1cblxuICBnZXQgZGlzYWJsZURvcm1pdG9yeVRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uZGlzYWJsZURvcm1pdG9yeVRyZWU7XG4gIH1cblxuICBnZXQgZGlzYWJsZUZyaWVuZEdyb3VwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LmRpc2FibGVGcmllbmRHcm91cDtcbiAgfVxuXG4gIGdldCBpc1dhcnAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ud3JhcDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBvbkRlcHRTZWxlY3QoZGVwdHM6IFl1bnphaURlcHRUcmVlW10pOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLnNldFRhYmxlUGFyYW0oeyBkZXB0SWQ6IGRlcHRzWzBdLmtleSB9KTtcbiAgICB0aGlzLm9uU2VsZWN0RGVwdC5lbWl0KGRlcHRzKTtcbiAgfVxuXG4gIG9uUm9sZVRyZWVTZWxlY3Qocm9sZXM6IFl1bnphaVJvbGVUcmVlW10pOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLnNldFRhYmxlUGFyYW0oeyByb2xlSWQ6IHJvbGVzWzBdLmtleSB9KTtcbiAgICB0aGlzLm9uU2VsZWN0Um9sZS5lbWl0KHJvbGVzKTtcbiAgfVxuXG4gIG9uRG9ybVRyZWVTZWxlY3QoZG9ybTogWXVuemFpRG9ybWl0b3J5VHJlZVtdKTogdm9pZCB7XG4gICAgaWYgKGRvcm1bMF0udHlwZSA9PT0gJ2J1aWxkaW5nJykge1xuICAgICAgdGhpcy50YWJsZS5zZXRUYWJsZVBhcmFtKHsgYnVpbGRJZDogZG9ybVswXS5rZXkgfSk7XG4gICAgfSBlbHNlIGlmIChkb3JtWzBdLnR5cGUgPT09ICdmbG9vcicpIHtcbiAgICAgIHRoaXMudGFibGUuc2V0VGFibGVQYXJhbSh7IGJ1aWxkSWQ6IGRvcm1bMF0uYnVpbGRQaWQsIGZsb29yOiBkb3JtWzBdLmtleSB9KTtcbiAgICB9IGVsc2UgaWYgKGRvcm1bMF0udHlwZSA9PT0gJ3Jvb20nKSB7XG4gICAgICB0aGlzLnRhYmxlLnNldFRhYmxlUGFyYW0oeyBidWlsZElkOiBkb3JtWzBdLmJ1aWxkUGlkLCBmbG9vcjogZG9ybVswXS5mbG9vclBpZCwgcm9vbUlkOiBkb3JtWzBdLmtleSB9KTtcbiAgICB9XG4gICAgdGhpcy5vblNlbGVjdERvcm1pdG9yeS5lbWl0KGRvcm0pO1xuICB9XG5cbiAgb25GcmllbmRTZWxlY3QoZ3JvdXA6IFl1bnphaUZyaWVuZEdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5zZXRUYWJsZVBhcmFtKHsgZnJpZW5kR3JvdXBJZDogZ3JvdXAuaWQgfSk7XG4gICAgdGhpcy5vblNlbGVjdEdyb3VwLmVtaXQoZ3JvdXApO1xuICB9XG5cbiAgb25UYWJsZVVzZXJDaGVja2VkKHVzZXJzOiBZdW56YWlUYWJsZVVzZXJbXSk6IHZvaWQge1xuICAgIHRoaXMudGFibGVVc2VyUHJvcHMuY2hlY2shLmRhdGEgPSB1c2VycztcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQodXNlcnMpO1xuICB9XG59XG4iXX0=