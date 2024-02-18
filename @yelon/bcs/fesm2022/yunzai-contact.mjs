import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, ViewChild, NgModule, Injectable } from '@angular/core';
import * as i11 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i2 from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDeptTreeModule, YUNZAI_DEPT_TYPES } from '@yelon/bcs/yunzai-dept-tree';
import * as i3 from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import * as i4 from '@yelon/bcs/yunzai-friend-group';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import * as i5 from '@yelon/bcs/yunzai-role-tree';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import * as i6 from '@yelon/bcs/yunzai-table-user';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import * as i1 from '@yelon/theme';
import { YunzaiThemeModule } from '@yelon/theme';
import * as i8 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i9 from 'ng-zorro-antd/grid';
import { NzGridModule } from 'ng-zorro-antd/grid';
import * as i10 from 'ng-zorro-antd/radio';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { lastValueFrom } from 'rxjs';
import * as i1$1 from 'ng-zorro-antd/modal';

class YunzaiContactComponent {
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

const COMPONENTS = [YunzaiContactComponent];
class YunzaiContactModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, imports: [YunzaiThemeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiRoleTreeModule,
            YunzaiTableUserModule,
            CommonModule,
            NzCardModule,
            NzGridModule,
            NzRadioModule,
            FormsModule, YunzaiContactComponent], exports: [YunzaiContactComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, imports: [YunzaiThemeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiRoleTreeModule,
            YunzaiTableUserModule,
            CommonModule,
            NzCardModule,
            NzGridModule,
            NzRadioModule,
            FormsModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, decorators: [{
            type: NgModule,
            args: [{
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
                        FormsModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactService, deps: [{ token: i1$1.NzModalService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1$1.NzModalService }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiContactComponent, YunzaiContactModule, YunzaiContactService };
//# sourceMappingURL=yunzai-contact.mjs.map
