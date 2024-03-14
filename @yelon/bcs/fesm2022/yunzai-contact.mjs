import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, ViewChild, Injectable, NgModule } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import * as i7 from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDeptTreeModule, YUNZAI_DEPT_TYPES } from '@yelon/bcs/yunzai-dept-tree';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i8 from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import * as i9 from '@yelon/bcs/yunzai-friend-group';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import * as i6 from '@yelon/bcs/yunzai-role-tree';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import * as i10 from '@yelon/bcs/yunzai-table-user';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import { I18nPipe } from '@yelon/theme';
import * as i5 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i4 from 'ng-zorro-antd/grid';
import { NzGridModule } from 'ng-zorro-antd/grid';
import * as i3 from 'ng-zorro-antd/radio';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import * as i1$1 from 'ng-zorro-antd/modal';

class YunzaiContactComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.0", type: YunzaiContactComponent, isStandalone: true, selector: "yunzai-contact", inputs: { deptTree: "deptTree", dormitoryTree: "dormitoryTree", friendGroup: "friendGroup", roleTree: "roleTree", tableUser: "tableUser", props: "props" }, outputs: { onSelect: "onSelect", onSelectDept: "onSelectDept", onSelectRole: "onSelectRole", onSelectDormitory: "onSelectDormitory", onSelectGroup: "onSelectGroup" }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactComponent, decorators: [{
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

class YunzaiContactService {
    constructor(modal) {
        this.modal = modal;
    }
    create(nzOnOk, param = {
        props: {
            wrap: false,
            disableFriendGroup: false,
            disableDormitoryTree: false,
            disableDeptTree: false,
            disableRoleTree: false
        },
        deptTree: {
            multiple: false,
            wrap: false,
            expand: true,
            class: true,
            historyClass: true,
            grade: true,
            types: [YUNZAI_DEPT_TYPES.DEPT, YUNZAI_DEPT_TYPES.CLASS]
        },
        dormitoryTree: {
            multiple: false,
            wrap: false,
            expand: true
        },
        roleTree: {
            wrap: false,
            expand: true,
            multiple: false
        },
        friendGroup: {
            wrap: false
        },
        tableUser: {
            wrap: false,
            filteredColumns: [],
            page: {
                pageNum: 1,
                pageSize: 20,
                pageParam: {}
            },
            customColumns: [],
            list: true,
            check: {
                pageCheck: true,
                disable: false,
                data: []
            }
        }
    }) {
        let value = [];
        const contactComponent = this.modal
            .create({
            nzTitle: '人员选择',
            nzContent: YunzaiContactComponent,
            nzClassName: 'yz-select-contacts-modal',
            nzWidth: 1200,
            nzData: param,
            nzOnOk: () => lastValueFrom(nzOnOk(value))
        })
            .getContentComponent();
        contactComponent.deptTree = param.deptTree;
        contactComponent.props = param.props;
        contactComponent.roleTree = param.roleTree;
        contactComponent.dormitoryTree = param.dormitoryTree;
        contactComponent.friendGroup = param.friendGroup;
        contactComponent.tableUser = param.tableUser;
        contactComponent.onSelect.subscribe(users => (value = users));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactService, deps: [{ token: i1$1.NzModalService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1$1.NzModalService }] });

const COMPONENTS = [YunzaiContactComponent];
class YunzaiContactModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactModule, imports: [FormsModule,
            CommonModule,
            I18nPipe,
            NzRadioModule,
            NzGridModule,
            NzCardModule,
            YunzaiRoleTreeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiTableUserModule, YunzaiContactComponent], exports: [YunzaiContactComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactModule, imports: [FormsModule,
            CommonModule,
            NzRadioModule,
            NzGridModule,
            NzCardModule,
            YunzaiRoleTreeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiTableUserModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiContactModule, decorators: [{
            type: NgModule,
            args: [{
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
                        YunzaiTableUserModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiContactComponent, YunzaiContactModule, YunzaiContactService };
//# sourceMappingURL=yunzai-contact.mjs.map
