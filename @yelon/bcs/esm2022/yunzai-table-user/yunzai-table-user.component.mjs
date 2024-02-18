import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { STModule } from '@yelon/abc/st';
import { YelonFormModule } from '@yelon/form';
import { YunzaiThemeModule } from '@yelon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-table-user.service";
import * as i2 from "@angular/common";
import * as i3 from "@yelon/form";
import * as i4 from "ng-zorro-antd/empty";
import * as i5 from "ng-zorro-antd/divider";
import * as i6 from "ng-zorro-antd/menu";
import * as i7 from "ng-zorro-antd/icon";
import * as i8 from "ng-zorro-antd/button";
import * as i9 from "ng-zorro-antd/core/transition-patch";
import * as i10 from "ng-zorro-antd/core/wave";
import * as i11 from "ng-zorro-antd/checkbox";
import * as i12 from "@yelon/abc/st";
import * as i13 from "@yelon/theme";
import * as i14 from "ng-zorro-antd/card";
export class YunzaiTableUserComponent {
    get wrapped() {
        return !!this.props?.wrap;
    }
    get schema() {
        return this.state.schema;
    }
    get disableCheck() {
        return !!this.props?.check?.disable;
    }
    get pageCheck() {
        return !!this.props?.check?.pageCheck;
    }
    get hasCheck() {
        return this.state.check.data.length > 0;
    }
    get list() {
        return !!this.props?.list;
    }
    get checked() {
        return this.state.check.data;
    }
    get scroll() {
        if (this.props && this.props.scroll)
            return this.props.scroll;
        return { x: '1200px', y: '600px' };
    }
    get inSearch() {
        const value = this.sf.value;
        return Object.keys(value).length > 0;
    }
    get userIds() {
        return this.props?.userIds || [];
    }
    constructor(service) {
        this.service = service;
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onChecked = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            columns: [
                { index: 'checkbox', render: 'checkbox', renderTitle: 'checkbox_all', width: 20, fixed: 'left' },
                { index: 'no', type: 'no', title: { i18n: 'table-user.no' }, width: 50 },
                { index: 'realName', title: { i18n: 'table-user.realName' }, width: 100 },
                { index: 'userCode', title: { i18n: 'table-user.usercode' }, width: 100 },
                { index: 'dept.deptName', title: { i18n: 'table-user.deptName' }, width: 100 },
                { index: 'rolesName', render: 'rolesName', title: { i18n: 'table-user.roleName' }, width: 100 },
                { index: 'idCard', title: { i18n: 'table-user.idcard' }, width: 100 }
            ],
            data: [],
            dataBackup: [],
            page: {
                pageNum: 1,
                pageSize: 30,
                pageParam: {}
            },
            schema: {
                properties: {
                    realName: {
                        type: 'string',
                        ui: {
                            widget: 'string',
                            i18n: 'realName'
                        }
                    },
                    userCode: {
                        type: 'string',
                        ui: {
                            i18n: 'userCode'
                        }
                    },
                    idCard: {
                        type: 'string',
                        ui: {
                            i18n: 'idCard'
                        }
                    }
                }
            },
            check: {
                data: []
            }
        };
    }
    ngOnInit() {
        this.setupPropsToState();
    }
    ngAfterViewInit() {
        this.setupTable();
        this.hookSearch();
    }
    setupPropsToState() {
        if (!this.props)
            return;
        this.setupPropsData();
        this.setupPropsPage();
        this.setupPropsColumns();
        this.setupPropsFilteredColumns();
        this.setupPropsCustomColumns();
        this.setupPropsChecked();
    }
    setupTable() {
        if (!this.st)
            return;
        this.setupTableData();
        this.setupTablePage();
        this.setupTableColumn();
        this.setupTableRequest();
        this.setupTableResponse();
        this.onQuery();
    }
    setupPropsData() {
        if (!this.props)
            return;
        if (this.props.data && this.props.data.length > 0) {
            this.state.data = this.props.data;
            this.state.dataBackup = this.props.data;
        }
        else {
            this.state.data = '/auth/baseUser/queryListForPage';
        }
    }
    setupPropsPage() {
        if (!this.props || !this.props.page)
            return;
        this.state.page = JSON.parse(JSON.stringify(this.props.page));
    }
    setupPropsColumns() {
        if (!this.props || !this.props.additionalColumns)
            return;
        let columns = [];
        if (this.props && this.props.additionalColumns) {
            columns = columns.concat(this.props.additionalColumns);
        }
        columns = columns.concat(this.state.columns);
        this.state.columns = columns;
    }
    setupPropsFilteredColumns() {
        if (!this.props || !this.props.filteredColumns || this.props.filteredColumns.length === 0)
            return;
        this.state.columns = this.state.columns.filter(col => !this.props?.filteredColumns?.includes(col.index));
    }
    setupPropsCustomColumns() {
        if (!this.props || !this.props.customColumns || this.props.customColumns.length === 0)
            return;
        const temp = [];
        this.state.columns.forEach(stateColumn => {
            this.props?.customColumns?.forEach((customColumn) => {
                if (stateColumn.index === customColumn.index) {
                    temp.push(customColumn);
                }
                else {
                    temp.push(stateColumn);
                }
            });
        });
        this.state.columns = [...temp];
    }
    setupPropsChecked() {
        if (!this.props || !this.props.check || !this.props.check.data)
            return;
        this.state.check.data = this.props.check.data;
        if (this.userIds.length > 0) {
            this.service.usersByIds(this.userIds).subscribe(users => {
                this.state.check.data = this.state.check.data.concat(users);
                this.onChecked.emit(this.state.check.data);
            });
        }
        else {
            this.onChecked.emit(this.state.check.data);
        }
    }
    setupTableData() {
        if (!this.st)
            return;
        this.st.data = this.state.data;
    }
    setupTablePage() {
        if (!this.st)
            return;
        this.st.pi = this.state.page.pageNum;
        this.st.ps = this.state.page.pageSize;
    }
    setupTableColumn() {
        if (!this.st)
            return;
        this.st.resetColumns({ columns: this.state.columns });
    }
    setupTableRequest() {
        if (!this.st)
            return;
        this.st.req = {
            allInBody: true,
            method: 'POST',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            process: (requestOptions) => {
                requestOptions.body.pageParam = this.state.page.pageParam;
                return requestOptions;
            }
        };
    }
    setupTableResponse() {
        if (!this.st)
            return;
        this.st.res = {
            reName: {
                list: 'list',
                total: 'total'
            },
            process: (data) => {
                if (!this.pageCheck)
                    this.resetChecked();
                return data;
            }
        };
    }
    resetChecked() {
        if (!this.props || !this.props.check || !this.props.check.data)
            return;
        this.state.check.data = this.props.check.data.map(id => {
            return { userId: id };
        });
    }
    onCheckedItem(data) {
        // remove
        if (this.isChecked(data)) {
            this.state.check.data = this.state.check.data.filter(u => u['userId'] !== data.userId);
        }
        // add
        else if (!this.isChecked(data)) {
            this.state.check.data = this.state.check.data.concat([data]);
        }
        this.onChecked.emit(this.state.check.data);
    }
    onCheckedAll(e) {
        const checkedAll = e.target.labels[0].innerHTML.includes('checked');
        if (checkedAll) {
            const data = this.st._data.filter(std => !this.state.check.data.find(scd => {
                return std['userId'] === scd['userId'];
            }));
            this.state.check.data = this.state.check.data.concat(data);
        }
        else {
            this.state.check.data = this.state.check.data.filter(s => {
                return !this.st._data.find(std => std['userId'] === s['userId']);
            });
        }
        this.onChecked.emit(this.state.check.data);
    }
    isChecked(data) {
        return !!this.state.check.data.find(u => u['userId'] === data['userId']);
    }
    isAllChecked() {
        if (this.st._data.length > 0) {
            return this.isArraySubset(this.st._data, this.state.check.data);
        }
        return false;
    }
    isArraySubset(subset, superset) {
        return subset.every(item => superset.some(superItem => superItem.userId === item.userId));
    }
    renderRoles(roles) {
        return roles.map(r => r.roleName).join(',');
    }
    unCheck(user) {
        this.state.check.data = this.state.check.data.filter(d => d['userId'] != user.userId);
        this.onChecked.emit(this.state.check.data);
    }
    unCheckAll() {
        this.state.check.data = [];
        this.onChecked.emit(this.state.check.data);
    }
    hookSearch() {
        this.sf.formValueChange.pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe(event => {
            const { value } = event;
            this.onSearch(value);
        });
    }
    onSearch(value = {}) {
        if (!this.inSearch)
            return;
        if (Array.isArray(this.state.data) && Array.isArray(this.state.dataBackup)) {
            let tempData = this.state.dataBackup;
            if (value['realName'])
                tempData = tempData.filter(d => d.realName.includes(value['realName']));
            if (value['idCard'])
                tempData = this.state.dataBackup.filter(d => (d.idCard = value['idCard']));
            if (value['userCode'])
                tempData = this.state.dataBackup.filter(d => (d.userCode = value['userCode']));
            this.st.data = tempData;
            this.st.reload();
        }
        if (typeof this.state.data === 'string') {
            this.state.page.pageParam = { ...this.state.page.pageParam, ...value };
            this.onQuery();
        }
    }
    onReset() {
        this.sf.reset();
        this.state.page.pageParam = {};
        this.onQuery();
    }
    onQuery() {
        if (!this.st)
            return;
        if (Array.isArray(this.state.data) && Array.isArray(this.state.dataBackup)) {
            this.st.data = this.state.dataBackup;
        }
        this.st.reload();
    }
    setTableParam(param) {
        if (this.inSearch) {
            this.state.page.pageParam = { ...param, ...this.sf.value };
            this.onSearch(this.sf.value);
        }
        if (!this.inSearch) {
            this.state.page.pageParam = param;
            this.setupTable();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserComponent, deps: [{ token: i1.YunzaiTableUserService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiTableUserComponent, isStandalone: true, selector: "yunzai-table-user", inputs: { props: "props" }, outputs: { onChecked: "onChecked" }, viewQueries: [{ propertyName: "st", first: true, predicate: ["st"], descendants: true }, { propertyName: "sf", first: true, predicate: ["sf"], descendants: true }], ngImport: i0, template: `
    <nz-card *ngIf="wrapped">
      <ng-container [ngTemplateOutlet]="tableTpl" />
    </nz-card>

    <ng-container *ngIf="!wrapped" [ngTemplateOutlet]="tableTpl" />

    <ng-template #tableTpl>
      <div class="yz-select-contacts-modal-right" style="width:67%">
        <ng-container [ngTemplateOutlet]="form" />
        <st #st [scroll]="scroll" [size]="'small'" [bordered]="true">
          <ng-template st-row="checkbox_all" let-item type="title">
            <label
              *ngIf="!disableCheck"
              nz-checkbox
              (change)="onCheckedAll($event)"
              [nzChecked]="isAllChecked()"
            ></label>
          </ng-template>
          <ng-template st-row="checkbox" let-item let-index="index">
            <label
              *ngIf="!disableCheck"
              nz-checkbox
              (change)="onCheckedItem(item)"
              [nzChecked]="isChecked(item)"
            ></label>
          </ng-template>
          <ng-template st-row="rolesName" let-item let-index="index">{{ renderRoles(item.roles) }}</ng-template>
        </st>
      </div>
      <div class="yz-select-contacts-modal-right" style="width:33%">
        <ng-container *ngIf="list" [ngTemplateOutlet]="listTpl" />
      </div>
    </ng-template>

    <ng-template #listTpl>
      <div class="right-list-title">
        <h3>{{ 'table-user.checked' | i18n }}</h3>
        <div *ngIf="hasCheck">
          <a style="cursor: default;">{{ checked.length }} </a>
          <nz-divider nzType="vertical" />
          <a style="cursor: pointer" href="javascript:;" (click)="unCheckAll()">{{ 'table-user.clear' | i18n }}</a>
        </div>
      </div>

      <div class="yz-selected-contacts">
        <nz-empty *ngIf="!hasCheck" style="margin: 90px auto;" />
        <ul nz-menu nzMode="inline" class="yz-role-contacts">
          <li nz-menu-item *ngFor="let item of checked; let i = index" class="people-item">
            <div class="people-item-right">{{ item?.realName || '--' }}</div>
            <span class="del-btn" (click)="unCheck(item)">
              <i nz-icon nzType="close" nzTheme="outline"></i>
            </span>
          </li>
        </ul>
      </div>
    </ng-template>

    <ng-template #form>
      <sf layout="inline" #sf [schema]="schema" button="none" />
      <button nz-button nzType="primary" (click)="onReset()">{{ 'reset' | i18n }}</button>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i3.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i4.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzDividerModule }, { kind: "component", type: i5.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "ngmodule", type: NzMenuModule }, { kind: "directive", type: i6.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i6.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "component", type: i8.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i9.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i10.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "ngmodule", type: NzCheckboxModule }, { kind: "component", type: i11.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "ngmodule", type: STModule }, { kind: "component", type: i12.STComponent, selector: "st", inputs: ["req", "res", "page", "data", "columns", "contextmenu", "ps", "pi", "total", "loading", "loadingDelay", "loadingIndicator", "bordered", "size", "scroll", "singleSort", "multiSort", "rowClassName", "clickRowClassName", "widthMode", "widthConfig", "resizable", "header", "showHeader", "footer", "bodyHeader", "body", "expandRowByClick", "expandAccordion", "expand", "noResult", "responsive", "responsiveHideHeaderFooter", "virtualScroll", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "customRequest", "virtualForTrackBy", "trackBy"], outputs: ["error", "change"], exportAs: ["st"] }, { kind: "directive", type: i12.STRowDirective, selector: "[st-row]", inputs: ["st-row", "type"] }, { kind: "ngmodule", type: YunzaiThemeModule }, { kind: "pipe", type: i13.I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i14.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-table-user`,
                    template: `
    <nz-card *ngIf="wrapped">
      <ng-container [ngTemplateOutlet]="tableTpl" />
    </nz-card>

    <ng-container *ngIf="!wrapped" [ngTemplateOutlet]="tableTpl" />

    <ng-template #tableTpl>
      <div class="yz-select-contacts-modal-right" style="width:67%">
        <ng-container [ngTemplateOutlet]="form" />
        <st #st [scroll]="scroll" [size]="'small'" [bordered]="true">
          <ng-template st-row="checkbox_all" let-item type="title">
            <label
              *ngIf="!disableCheck"
              nz-checkbox
              (change)="onCheckedAll($event)"
              [nzChecked]="isAllChecked()"
            ></label>
          </ng-template>
          <ng-template st-row="checkbox" let-item let-index="index">
            <label
              *ngIf="!disableCheck"
              nz-checkbox
              (change)="onCheckedItem(item)"
              [nzChecked]="isChecked(item)"
            ></label>
          </ng-template>
          <ng-template st-row="rolesName" let-item let-index="index">{{ renderRoles(item.roles) }}</ng-template>
        </st>
      </div>
      <div class="yz-select-contacts-modal-right" style="width:33%">
        <ng-container *ngIf="list" [ngTemplateOutlet]="listTpl" />
      </div>
    </ng-template>

    <ng-template #listTpl>
      <div class="right-list-title">
        <h3>{{ 'table-user.checked' | i18n }}</h3>
        <div *ngIf="hasCheck">
          <a style="cursor: default;">{{ checked.length }} </a>
          <nz-divider nzType="vertical" />
          <a style="cursor: pointer" href="javascript:;" (click)="unCheckAll()">{{ 'table-user.clear' | i18n }}</a>
        </div>
      </div>

      <div class="yz-selected-contacts">
        <nz-empty *ngIf="!hasCheck" style="margin: 90px auto;" />
        <ul nz-menu nzMode="inline" class="yz-role-contacts">
          <li nz-menu-item *ngFor="let item of checked; let i = index" class="people-item">
            <div class="people-item-right">{{ item?.realName || '--' }}</div>
            <span class="del-btn" (click)="unCheck(item)">
              <i nz-icon nzType="close" nzTheme="outline"></i>
            </span>
          </li>
        </ul>
      </div>
    </ng-template>

    <ng-template #form>
      <sf layout="inline" #sf [schema]="schema" button="none" />
      <button nz-button nzType="primary" (click)="onReset()">{{ 'reset' | i18n }}</button>
    </ng-template>
  `,
                    standalone: true,
                    imports: [
                        CommonModule,
                        YelonFormModule,
                        NzEmptyModule,
                        NzDividerModule,
                        NzMenuModule,
                        NzIconModule,
                        NzButtonModule,
                        NzCheckboxModule,
                        STModule,
                        YunzaiThemeModule,
                        NzCardModule
                    ]
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiTableUserService }], propDecorators: { st: [{
                type: ViewChild,
                args: ['st']
            }], sf: [{
                type: ViewChild,
                args: ['sf']
            }], props: [{
                type: Input
            }], onChecked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXRhYmxlLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS10YWJsZS11c2VyL3l1bnphaS10YWJsZS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV4RCxPQUFPLEVBQWlDLFFBQVEsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFrQyxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBMkZsRCxNQUFNLE9BQU8sd0JBQXdCO0lBcURuQyxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUks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Q3BCLENBQUM7SUFDSCxDQUFDOzhHQXpWVSx3QkFBd0I7a0dBQXhCLHdCQUF3QixtVEE5RXpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThEVCwyREFHQyxZQUFZLHNhQUNaLGVBQWUsMFlBQ2YsYUFBYSxtTUFDYixlQUFlLHlNQUNmLFlBQVksNmJBQ1osWUFBWSxpTkFDWixjQUFjLGdyQkFDZCxnQkFBZ0IsaVFBQ2hCLFFBQVEsOHhCQUNSLGlCQUFpQixrRkFDakIsWUFBWTs7MkZBR0gsd0JBQXdCO2tCQWhGcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOERUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLFFBQVE7d0JBQ1IsaUJBQWlCO3dCQUNqQixZQUFZO3FCQUNiO2lCQUNGOzJGQUVrQixFQUFFO3NCQUFsQixTQUFTO3VCQUFDLElBQUk7Z0JBQ0UsRUFBRTtzQkFBbEIsU0FBUzt1QkFBQyxJQUFJO2dCQUNOLEtBQUs7c0JBQWIsS0FBSztnQkFFYSxTQUFTO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU1RDb2x1bW4sIFNUQ29tcG9uZW50LCBTVERhdGEsIFNUTW9kdWxlLCBTVFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQHllbG9uL2FiYy9zdCc7XG5pbXBvcnQgeyBTRkNvbXBvbmVudCwgU0ZTY2hlbWEsIFNGVmFsdWUsIFllbG9uRm9ybU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9mb3JtJztcbmltcG9ydCB7IFl1bnphaVRoZW1lTW9kdWxlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56Q2hlY2tib3hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NoZWNrYm94JztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekRpdmlkZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2RpdmlkZXInO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56TWVudU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVudSc7XG5cbmltcG9ydCB7IFl1bnphaVRhYmxlVXNlclNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS10YWJsZS11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgWXVuemFpVGFibGVVc2VyLFxuICBZdW56YWlUYWJsZVVzZXJQYXJhbSxcbiAgWXVuemFpVGFibGVVc2VyUHJvcHMsXG4gIFl1bnphaVRhYmxlVXNlclJvbGUsXG4gIFl1bnphaVRhYmxlVXNlclN0YXRlXG59IGZyb20gJy4veXVuemFpLXRhYmxlLXVzZXIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktdGFibGUtdXNlcmAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LWNhcmQgKm5nSWY9XCJ3cmFwcGVkXCI+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYmxlVHBsXCIgLz5cbiAgICA8L256LWNhcmQ+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXdyYXBwZWRcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJsZVRwbFwiIC8+XG5cbiAgICA8bmctdGVtcGxhdGUgI3RhYmxlVHBsPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC1yaWdodFwiIHN0eWxlPVwid2lkdGg6NjclXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9ybVwiIC8+XG4gICAgICAgIDxzdCAjc3QgW3Njcm9sbF09XCJzY3JvbGxcIiBbc2l6ZV09XCInc21hbGwnXCIgW2JvcmRlcmVkXT1cInRydWVcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgc3Qtcm93PVwiY2hlY2tib3hfYWxsXCIgbGV0LWl0ZW0gdHlwZT1cInRpdGxlXCI+XG4gICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgKm5nSWY9XCIhZGlzYWJsZUNoZWNrXCJcbiAgICAgICAgICAgICAgbnotY2hlY2tib3hcbiAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkNoZWNrZWRBbGwoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIFtuekNoZWNrZWRdPVwiaXNBbGxDaGVja2VkKClcIlxuICAgICAgICAgICAgPjwvbGFiZWw+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgc3Qtcm93PVwiY2hlY2tib3hcIiBsZXQtaXRlbSBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICpuZ0lmPVwiIWRpc2FibGVDaGVja1wiXG4gICAgICAgICAgICAgIG56LWNoZWNrYm94XG4gICAgICAgICAgICAgIChjaGFuZ2UpPVwib25DaGVja2VkSXRlbShpdGVtKVwiXG4gICAgICAgICAgICAgIFtuekNoZWNrZWRdPVwiaXNDaGVja2VkKGl0ZW0pXCJcbiAgICAgICAgICAgID48L2xhYmVsPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIHN0LXJvdz1cInJvbGVzTmFtZVwiIGxldC1pdGVtIGxldC1pbmRleD1cImluZGV4XCI+e3sgcmVuZGVyUm9sZXMoaXRlbS5yb2xlcykgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3N0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotc2VsZWN0LWNvbnRhY3RzLW1vZGFsLXJpZ2h0XCIgc3R5bGU9XCJ3aWR0aDozMyVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpc3RcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJsaXN0VHBsXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2xpc3RUcGw+XG4gICAgICA8ZGl2IGNsYXNzPVwicmlnaHQtbGlzdC10aXRsZVwiPlxuICAgICAgICA8aDM+e3sgJ3RhYmxlLXVzZXIuY2hlY2tlZCcgfCBpMThuIH19PC9oMz5cbiAgICAgICAgPGRpdiAqbmdJZj1cImhhc0NoZWNrXCI+XG4gICAgICAgICAgPGEgc3R5bGU9XCJjdXJzb3I6IGRlZmF1bHQ7XCI+e3sgY2hlY2tlZC5sZW5ndGggfX0gPC9hPlxuICAgICAgICAgIDxuei1kaXZpZGVyIG56VHlwZT1cInZlcnRpY2FsXCIgLz5cbiAgICAgICAgICA8YSBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiAoY2xpY2spPVwidW5DaGVja0FsbCgpXCI+e3sgJ3RhYmxlLXVzZXIuY2xlYXInIHwgaTE4biB9fTwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdGVkLWNvbnRhY3RzXCI+XG4gICAgICAgIDxuei1lbXB0eSAqbmdJZj1cIiFoYXNDaGVja1wiIHN0eWxlPVwibWFyZ2luOiA5MHB4IGF1dG87XCIgLz5cbiAgICAgICAgPHVsIG56LW1lbnUgbnpNb2RlPVwiaW5saW5lXCIgY2xhc3M9XCJ5ei1yb2xlLWNvbnRhY3RzXCI+XG4gICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjaGVja2VkOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJwZW9wbGUtaXRlbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1pdGVtLXJpZ2h0XCI+e3sgaXRlbT8ucmVhbE5hbWUgfHwgJy0tJyB9fTwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWwtYnRuXCIgKGNsaWNrKT1cInVuQ2hlY2soaXRlbSlcIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJjbG9zZVwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNmb3JtPlxuICAgICAgPHNmIGxheW91dD1cImlubGluZVwiICNzZiBbc2NoZW1hXT1cInNjaGVtYVwiIGJ1dHRvbj1cIm5vbmVcIiAvPlxuICAgICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwicHJpbWFyeVwiIChjbGljayk9XCJvblJlc2V0KClcIj57eyAncmVzZXQnIHwgaTE4biB9fTwvYnV0dG9uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgWWVsb25Gb3JtTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpEaXZpZGVyTW9kdWxlLFxuICAgIE56TWVudU1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgTnpDaGVja2JveE1vZHVsZSxcbiAgICBTVE1vZHVsZSxcbiAgICBZdW56YWlUaGVtZU1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlUYWJsZVVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdzdCcpIHN0ITogU1RDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ3NmJykgc2YhOiBTRkNvbXBvbmVudDtcbiAgQElucHV0KCkgcHJvcHM/OiBZdW56YWlUYWJsZVVzZXJQcm9wcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSByZWFkb25seSBvbkNoZWNrZWQ6IEV2ZW50RW1pdHRlcjxZdW56YWlUYWJsZVVzZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaVRhYmxlVXNlcltdPigpO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICBzdGF0ZTogWXVuemFpVGFibGVVc2VyU3RhdGUgPSB7XG4gICAgY29sdW1uczogW1xuICAgICAgeyBpbmRleDogJ2NoZWNrYm94JywgcmVuZGVyOiAnY2hlY2tib3gnLCByZW5kZXJUaXRsZTogJ2NoZWNrYm94X2FsbCcsIHdpZHRoOiAyMCwgZml4ZWQ6ICdsZWZ0JyB9LFxuICAgICAgeyBpbmRleDogJ25vJywgdHlwZTogJ25vJywgdGl0bGU6IHsgaTE4bjogJ3RhYmxlLXVzZXIubm8nIH0sIHdpZHRoOiA1MCB9LFxuICAgICAgeyBpbmRleDogJ3JlYWxOYW1lJywgdGl0bGU6IHsgaTE4bjogJ3RhYmxlLXVzZXIucmVhbE5hbWUnIH0sIHdpZHRoOiAxMDAgfSxcbiAgICAgIHsgaW5kZXg6ICd1c2VyQ29kZScsIHRpdGxlOiB7IGkxOG46ICd0YWJsZS11c2VyLnVzZXJjb2RlJyB9LCB3aWR0aDogMTAwIH0sXG4gICAgICB7IGluZGV4OiAnZGVwdC5kZXB0TmFtZScsIHRpdGxlOiB7IGkxOG46ICd0YWJsZS11c2VyLmRlcHROYW1lJyB9LCB3aWR0aDogMTAwIH0sXG4gICAgICB7IGluZGV4OiAncm9sZXNOYW1lJywgcmVuZGVyOiAncm9sZXNOYW1lJywgdGl0bGU6IHsgaTE4bjogJ3RhYmxlLXVzZXIucm9sZU5hbWUnIH0sIHdpZHRoOiAxMDAgfSxcbiAgICAgIHsgaW5kZXg6ICdpZENhcmQnLCB0aXRsZTogeyBpMThuOiAndGFibGUtdXNlci5pZGNhcmQnIH0sIHdpZHRoOiAxMDAgfVxuICAgIF0sXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgcGFnZToge1xuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHBhZ2VTaXplOiAzMCxcbiAgICAgIHBhZ2VQYXJhbToge31cbiAgICB9LFxuICAgIHNjaGVtYToge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByZWFsTmFtZToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHVpOiB7XG4gICAgICAgICAgICB3aWRnZXQ6ICdzdHJpbmcnLFxuICAgICAgICAgICAgaTE4bjogJ3JlYWxOYW1lJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXNlckNvZGU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB1aToge1xuICAgICAgICAgICAgaTE4bjogJ3VzZXJDb2RlJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWRDYXJkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgdWk6IHtcbiAgICAgICAgICAgIGkxOG46ICdpZENhcmQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjaGVjazoge1xuICAgICAgZGF0YTogW11cbiAgICB9XG4gIH07XG5cbiAgZ2V0IHdyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ud3JhcDtcbiAgfVxuXG4gIGdldCBzY2hlbWEoKTogU0ZTY2hlbWEge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNjaGVtYTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uY2hlY2s/LmRpc2FibGU7XG4gIH1cblxuICBnZXQgcGFnZUNoZWNrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LmNoZWNrPy5wYWdlQ2hlY2s7XG4gIH1cblxuICBnZXQgaGFzQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY2hlY2suZGF0YS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IGxpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ubGlzdDtcbiAgfVxuXG4gIGdldCBjaGVja2VkKCk6IFl1bnphaVRhYmxlVXNlcltdIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jaGVjay5kYXRhIGFzIFl1bnphaVRhYmxlVXNlcltdO1xuICB9XG5cbiAgZ2V0IHNjcm9sbCgpOiB7XG4gICAgeD86IHN0cmluZyB8IG51bGw7XG4gICAgeT86IHN0cmluZyB8IG51bGw7XG4gIH0ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuc2Nyb2xsKSByZXR1cm4gdGhpcy5wcm9wcy5zY3JvbGw7XG4gICAgcmV0dXJuIHsgeDogJzEyMDBweCcsIHk6ICc2MDBweCcgfTtcbiAgfVxuXG4gIGdldCBpblNlYXJjaCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc2YudmFsdWU7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHVzZXJJZHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnByb3BzPy51c2VySWRzIHx8IFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBZdW56YWlUYWJsZVVzZXJTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBQcm9wc1RvU3RhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwVGFibGUoKTtcbiAgICB0aGlzLmhvb2tTZWFyY2goKTtcbiAgfVxuXG4gIHNldHVwUHJvcHNUb1N0YXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcykgcmV0dXJuO1xuICAgIHRoaXMuc2V0dXBQcm9wc0RhdGEoKTtcbiAgICB0aGlzLnNldHVwUHJvcHNQYWdlKCk7XG4gICAgdGhpcy5zZXR1cFByb3BzQ29sdW1ucygpO1xuICAgIHRoaXMuc2V0dXBQcm9wc0ZpbHRlcmVkQ29sdW1ucygpO1xuICAgIHRoaXMuc2V0dXBQcm9wc0N1c3RvbUNvbHVtbnMoKTtcbiAgICB0aGlzLnNldHVwUHJvcHNDaGVja2VkKCk7XG4gIH1cblxuICBzZXR1cFRhYmxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc2V0dXBUYWJsZURhdGEoKTtcbiAgICB0aGlzLnNldHVwVGFibGVQYWdlKCk7XG4gICAgdGhpcy5zZXR1cFRhYmxlQ29sdW1uKCk7XG4gICAgdGhpcy5zZXR1cFRhYmxlUmVxdWVzdCgpO1xuICAgIHRoaXMuc2V0dXBUYWJsZVJlc3BvbnNlKCk7XG4gICAgdGhpcy5vblF1ZXJ5KCk7XG4gIH1cblxuICBzZXR1cFByb3BzRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMpIHJldHVybjtcbiAgICBpZiAodGhpcy5wcm9wcy5kYXRhICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgICB0aGlzLnN0YXRlLmRhdGFCYWNrdXAgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9ICcvYXV0aC9iYXNlVXNlci9xdWVyeUxpc3RGb3JQYWdlJztcbiAgICB9XG4gIH1cblxuICBzZXR1cFByb3BzUGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMucGFnZSkgcmV0dXJuO1xuICAgIHRoaXMuc3RhdGUucGFnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5wYWdlKSk7XG4gIH1cblxuICBzZXR1cFByb3BzQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuYWRkaXRpb25hbENvbHVtbnMpIHJldHVybjtcbiAgICBsZXQgY29sdW1uczogU1RDb2x1bW5bXSA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuYWRkaXRpb25hbENvbHVtbnMpIHtcbiAgICAgIGNvbHVtbnMgPSBjb2x1bW5zLmNvbmNhdCh0aGlzLnByb3BzLmFkZGl0aW9uYWxDb2x1bW5zKTtcbiAgICB9XG4gICAgY29sdW1ucyA9IGNvbHVtbnMuY29uY2F0KHRoaXMuc3RhdGUuY29sdW1ucyk7XG4gICAgdGhpcy5zdGF0ZS5jb2x1bW5zID0gY29sdW1ucztcbiAgfVxuXG4gIHNldHVwUHJvcHNGaWx0ZXJlZENvbHVtbnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzIHx8ICF0aGlzLnByb3BzLmZpbHRlcmVkQ29sdW1ucyB8fCB0aGlzLnByb3BzLmZpbHRlcmVkQ29sdW1ucy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB0aGlzLnN0YXRlLmNvbHVtbnMgPSB0aGlzLnN0YXRlLmNvbHVtbnMuZmlsdGVyKGNvbCA9PiAhdGhpcy5wcm9wcz8uZmlsdGVyZWRDb2x1bW5zPy5pbmNsdWRlcyhjb2wuaW5kZXggYXMgc3RyaW5nKSk7XG4gIH1cblxuICBzZXR1cFByb3BzQ3VzdG9tQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuY3VzdG9tQ29sdW1ucyB8fCB0aGlzLnByb3BzLmN1c3RvbUNvbHVtbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgdGVtcDogU1RDb2x1bW5bXSA9IFtdO1xuICAgIHRoaXMuc3RhdGUuY29sdW1ucy5mb3JFYWNoKHN0YXRlQ29sdW1uID0+IHtcbiAgICAgIHRoaXMucHJvcHM/LmN1c3RvbUNvbHVtbnM/LmZvckVhY2goKGN1c3RvbUNvbHVtbjogU1RDb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKHN0YXRlQ29sdW1uLmluZGV4ID09PSBjdXN0b21Db2x1bW4uaW5kZXgpIHtcbiAgICAgICAgICB0ZW1wLnB1c2goY3VzdG9tQ29sdW1uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wLnB1c2goc3RhdGVDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlLmNvbHVtbnMgPSBbLi4udGVtcF07XG4gIH1cblxuICBzZXR1cFByb3BzQ2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuY2hlY2sgfHwgIXRoaXMucHJvcHMuY2hlY2suZGF0YSkgcmV0dXJuO1xuICAgIHRoaXMuc3RhdGUuY2hlY2suZGF0YSA9IHRoaXMucHJvcHMuY2hlY2suZGF0YTtcbiAgICBpZiAodGhpcy51c2VySWRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2VydmljZS51c2Vyc0J5SWRzKHRoaXMudXNlcklkcykuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmNvbmNhdCh1c2Vycyk7XG4gICAgICAgIHRoaXMub25DaGVja2VkLmVtaXQodGhpcy5zdGF0ZS5jaGVjay5kYXRhIGFzIE56U2FmZUFueSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkNoZWNrZWQuZW1pdCh0aGlzLnN0YXRlLmNoZWNrLmRhdGEgYXMgTnpTYWZlQW55KTtcbiAgICB9XG4gIH1cblxuICBzZXR1cFRhYmxlRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICB0aGlzLnN0LmRhdGEgPSB0aGlzLnN0YXRlLmRhdGE7XG4gIH1cblxuICBzZXR1cFRhYmxlUGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICB0aGlzLnN0LnBpID0gdGhpcy5zdGF0ZS5wYWdlLnBhZ2VOdW07XG4gICAgdGhpcy5zdC5wcyA9IHRoaXMuc3RhdGUucGFnZS5wYWdlU2l6ZTtcbiAgfVxuXG4gIHNldHVwVGFibGVDb2x1bW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0KSByZXR1cm47XG4gICAgdGhpcy5zdC5yZXNldENvbHVtbnMoeyBjb2x1bW5zOiB0aGlzLnN0YXRlLmNvbHVtbnMgfSk7XG4gIH1cblxuICBzZXR1cFRhYmxlUmVxdWVzdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICB0aGlzLnN0LnJlcSA9IHtcbiAgICAgIGFsbEluQm9keTogdHJ1ZSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgcmVOYW1lOiB7XG4gICAgICAgIHBpOiAncGFnZU51bScsXG4gICAgICAgIHBzOiAncGFnZVNpemUnXG4gICAgICB9LFxuICAgICAgcHJvY2VzczogKHJlcXVlc3RPcHRpb25zOiBTVFJlcXVlc3RPcHRpb25zKSA9PiB7XG4gICAgICAgIHJlcXVlc3RPcHRpb25zLmJvZHkucGFnZVBhcmFtID0gdGhpcy5zdGF0ZS5wYWdlLnBhZ2VQYXJhbTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RPcHRpb25zO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzZXR1cFRhYmxlUmVzcG9uc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0KSByZXR1cm47XG4gICAgdGhpcy5zdC5yZXMgPSB7XG4gICAgICByZU5hbWU6IHtcbiAgICAgICAgbGlzdDogJ2xpc3QnLFxuICAgICAgICB0b3RhbDogJ3RvdGFsJ1xuICAgICAgfSxcbiAgICAgIHByb2Nlc3M6IChkYXRhOiBTVERhdGFbXSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucGFnZUNoZWNrKSB0aGlzLnJlc2V0Q2hlY2tlZCgpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmVzZXRDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcyB8fCAhdGhpcy5wcm9wcy5jaGVjayB8fCAhdGhpcy5wcm9wcy5jaGVjay5kYXRhKSByZXR1cm47XG4gICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5wcm9wcy5jaGVjay5kYXRhLm1hcChpZCA9PiB7XG4gICAgICByZXR1cm4geyB1c2VySWQ6IGlkIH07XG4gICAgfSk7XG4gIH1cblxuICBvbkNoZWNrZWRJdGVtKGRhdGE6IFl1bnphaVRhYmxlVXNlcik6IHZvaWQge1xuICAgIC8vIHJlbW92ZVxuICAgIGlmICh0aGlzLmlzQ2hlY2tlZChkYXRhKSkge1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbHRlcih1ID0+IHVbJ3VzZXJJZCddICE9PSBkYXRhLnVzZXJJZCk7XG4gICAgfVxuICAgIC8vIGFkZFxuICAgIGVsc2UgaWYgKCF0aGlzLmlzQ2hlY2tlZChkYXRhKSkge1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmNvbmNhdChbZGF0YV0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICBvbkNoZWNrZWRBbGwoZTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgY29uc3QgY2hlY2tlZEFsbCA9IGUudGFyZ2V0LmxhYmVsc1swXS5pbm5lckhUTUwuaW5jbHVkZXMoJ2NoZWNrZWQnKTtcbiAgICBpZiAoY2hlY2tlZEFsbCkge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuc3QuX2RhdGEuZmlsdGVyKFxuICAgICAgICBzdGQgPT5cbiAgICAgICAgICAhdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbmQoc2NkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdGRbJ3VzZXJJZCddID09PSBzY2RbJ3VzZXJJZCddO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmNvbmNhdChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbHRlcihzID0+IHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0Ll9kYXRhLmZpbmQoc3RkID0+IHN0ZFsndXNlcklkJ10gPT09IHNbJ3VzZXJJZCddKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICBpc0NoZWNrZWQoZGF0YTogU1REYXRhKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbmQodSA9PiB1Wyd1c2VySWQnXSA9PT0gZGF0YVsndXNlcklkJ10pO1xuICB9XG5cbiAgaXNBbGxDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnN0Ll9kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQXJyYXlTdWJzZXQodGhpcy5zdC5fZGF0YSwgdGhpcy5zdGF0ZS5jaGVjay5kYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNBcnJheVN1YnNldChzdWJzZXQ6IE56U2FmZUFueVtdLCBzdXBlcnNldDogTnpTYWZlQW55W10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gc3Vic2V0LmV2ZXJ5KGl0ZW0gPT4gc3VwZXJzZXQuc29tZShzdXBlckl0ZW0gPT4gc3VwZXJJdGVtLnVzZXJJZCA9PT0gaXRlbS51c2VySWQpKTtcbiAgfVxuXG4gIHJlbmRlclJvbGVzKHJvbGVzOiBZdW56YWlUYWJsZVVzZXJSb2xlW10pOiBzdHJpbmcge1xuICAgIHJldHVybiByb2xlcy5tYXAociA9PiByLnJvbGVOYW1lKS5qb2luKCcsJyk7XG4gIH1cblxuICB1bkNoZWNrKHVzZXI6IFl1bnphaVRhYmxlVXNlcik6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2hlY2suZGF0YSA9IHRoaXMuc3RhdGUuY2hlY2suZGF0YS5maWx0ZXIoZCA9PiBkWyd1c2VySWQnXSAhPSB1c2VyLnVzZXJJZCk7XG4gICAgdGhpcy5vbkNoZWNrZWQuZW1pdCh0aGlzLnN0YXRlLmNoZWNrLmRhdGEgYXMgWXVuemFpVGFibGVVc2VyW10pO1xuICB9XG5cbiAgdW5DaGVja0FsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSBbXTtcbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICBob29rU2VhcmNoKCk6IHZvaWQge1xuICAgIHRoaXMuc2YuZm9ybVZhbHVlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpLCBkZWJvdW5jZVRpbWUoMTAwMCkpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudDtcbiAgICAgIHRoaXMub25TZWFyY2godmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgb25TZWFyY2godmFsdWU6IFNGVmFsdWUgPSB7fSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pblNlYXJjaCkgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUuZGF0YSkgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLmRhdGFCYWNrdXApKSB7XG4gICAgICBsZXQgdGVtcERhdGEgPSB0aGlzLnN0YXRlLmRhdGFCYWNrdXA7XG4gICAgICBpZiAodmFsdWVbJ3JlYWxOYW1lJ10pIHRlbXBEYXRhID0gdGVtcERhdGEuZmlsdGVyKGQgPT4gZC5yZWFsTmFtZS5pbmNsdWRlcyh2YWx1ZVsncmVhbE5hbWUnXSkpO1xuICAgICAgaWYgKHZhbHVlWydpZENhcmQnXSkgdGVtcERhdGEgPSB0aGlzLnN0YXRlLmRhdGFCYWNrdXAuZmlsdGVyKGQgPT4gKGQuaWRDYXJkID0gdmFsdWVbJ2lkQ2FyZCddKSk7XG4gICAgICBpZiAodmFsdWVbJ3VzZXJDb2RlJ10pIHRlbXBEYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwLmZpbHRlcihkID0+IChkLnVzZXJDb2RlID0gdmFsdWVbJ3VzZXJDb2RlJ10pKTtcbiAgICAgIHRoaXMuc3QuZGF0YSA9IHRlbXBEYXRhO1xuICAgICAgdGhpcy5zdC5yZWxvYWQoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0YXRlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtID0geyAuLi50aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtLCAuLi52YWx1ZSB9O1xuICAgICAgdGhpcy5vblF1ZXJ5KCk7XG4gICAgfVxuICB9XG5cbiAgb25SZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNmLnJlc2V0KCk7XG4gICAgdGhpcy5zdGF0ZS5wYWdlLnBhZ2VQYXJhbSA9IHt9O1xuICAgIHRoaXMub25RdWVyeSgpO1xuICB9XG5cbiAgcHVibGljIG9uUXVlcnkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0KSByZXR1cm47XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5kYXRhKSAmJiBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUuZGF0YUJhY2t1cCkpIHtcbiAgICAgIHRoaXMuc3QuZGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cDtcbiAgICB9XG4gICAgdGhpcy5zdC5yZWxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUYWJsZVBhcmFtKHBhcmFtOiBZdW56YWlUYWJsZVVzZXJQYXJhbSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluU2VhcmNoKSB7XG4gICAgICB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtID0geyAuLi5wYXJhbSwgLi4udGhpcy5zZi52YWx1ZSB9O1xuICAgICAgdGhpcy5vblNlYXJjaCh0aGlzLnNmLnZhbHVlKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmluU2VhcmNoKSB7XG4gICAgICB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtID0gcGFyYW07XG4gICAgICB0aGlzLnNldHVwVGFibGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==