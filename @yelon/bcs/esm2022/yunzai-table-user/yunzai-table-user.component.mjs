import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { STModule } from '@yelon/abc/st';
import { YelonFormModule } from '@yelon/form';
import { I18nPipe } from '@yelon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { YunzaiTableUserService } from './yunzai-table-user.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@yelon/form";
import * as i3 from "@yelon/abc/st";
import * as i4 from "ng-zorro-antd/checkbox";
import * as i5 from "ng-zorro-antd/divider";
import * as i6 from "ng-zorro-antd/button";
import * as i7 from "ng-zorro-antd/core/transition-patch";
import * as i8 from "ng-zorro-antd/core/wave";
import * as i9 from "ng-zorro-antd/empty";
import * as i10 from "ng-zorro-antd/icon";
import * as i11 from "ng-zorro-antd/menu";
import * as i12 from "ng-zorro-antd/card";
export class YunzaiTableUserComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onChecked = new EventEmitter();
        this.service = inject(YunzaiTableUserService);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiTableUserComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: YunzaiTableUserComponent, isStandalone: true, selector: "yunzai-table-user", inputs: { props: "props" }, outputs: { onChecked: "onChecked" }, providers: [YunzaiTableUserService], viewQueries: [{ propertyName: "st", first: true, predicate: ["st"], descendants: true }, { propertyName: "sf", first: true, predicate: ["sf"], descendants: true }], ngImport: i0, template: `
    @if (wrapped) {
      <nz-card>
        <ng-container [ngTemplateOutlet]="tableTpl" />
      </nz-card>
    } @else {
      <ng-container [ngTemplateOutlet]="tableTpl" />
    }

    <ng-template #tableTpl>
      <div class="yz-select-contacts-modal-right" style="width:67%">
        <ng-container [ngTemplateOutlet]="form" />
        <st #st [scroll]="scroll" [size]="'small'" [bordered]="true">
          <ng-template st-row="checkbox_all" let-item type="title">
            @if (!disableCheck) {
              <label nz-checkbox (change)="onCheckedAll($event)" [nzChecked]="isAllChecked()"></label>
            }
          </ng-template>
          <ng-template st-row="checkbox" let-item let-index="index">
            @if (!disableCheck) {
              <label nz-checkbox (change)="onCheckedItem(item)" [nzChecked]="isChecked(item)"></label>
            }
          </ng-template>
          <ng-template st-row="rolesName" let-item let-index="index">{{ renderRoles(item.roles) }}</ng-template>
        </st>
      </div>
      <div class="yz-select-contacts-modal-right" style="width:33%">
        @if (list) {
          <ng-container [ngTemplateOutlet]="listTpl" />
        }
      </div>
    </ng-template>

    <ng-template #listTpl>
      <div class="right-list-title">
        <h3>{{ 'table-user.checked' | i18n }}</h3>
        @if (hasCheck) {
          <div>
            <a style="cursor: default;">{{ checked.length }} </a>
            <nz-divider nzType="vertical" />
            <a style="cursor: pointer" href="javascript:;" (click)="unCheckAll()">{{ 'table-user.clear' | i18n }}</a>
          </div>
        }
      </div>

      <div class="yz-selected-contacts">
        @if (!hasCheck) {
          <nz-empty style="margin: 90px auto;" />
        }
        <ul nz-menu nzMode="inline" class="yz-role-contacts">
          @for (item of checked; track checked) {
            <li nz-menu-item class="people-item">
              <div class="people-item-right">{{ item?.realName || '--' }}</div>
              <span class="del-btn" (click)="unCheck(item)">
                <i nz-icon nzType="close" nzTheme="outline"></i>
              </span>
            </li>
          }
        </ul>
      </div>
    </ng-template>

    <ng-template #form>
      <sf layout="inline" #sf [schema]="schema" button="none" />
      <button nz-button nzType="primary" (click)="onReset()">{{ 'reset' | i18n }}</button>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i2.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: STModule }, { kind: "component", type: i3.STComponent, selector: "st", inputs: ["req", "res", "page", "data", "columns", "contextmenu", "ps", "pi", "total", "loading", "loadingDelay", "loadingIndicator", "bordered", "size", "scroll", "singleSort", "multiSort", "rowClassName", "clickRowClassName", "widthMode", "widthConfig", "resizable", "header", "showHeader", "footer", "bodyHeader", "body", "expandRowByClick", "expandAccordion", "expand", "noResult", "responsive", "responsiveHideHeaderFooter", "virtualScroll", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "customRequest", "virtualForTrackBy", "trackBy"], outputs: ["error", "change"], exportAs: ["st"] }, { kind: "directive", type: i3.STRowDirective, selector: "[st-row]", inputs: ["st-row", "type"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzCheckboxModule }, { kind: "component", type: i4.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "ngmodule", type: NzDividerModule }, { kind: "component", type: i5.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "component", type: i6.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i7.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i8.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i9.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i10.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzMenuModule }, { kind: "directive", type: i11.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i11.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i12.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiTableUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-table-user',
                    template: `
    @if (wrapped) {
      <nz-card>
        <ng-container [ngTemplateOutlet]="tableTpl" />
      </nz-card>
    } @else {
      <ng-container [ngTemplateOutlet]="tableTpl" />
    }

    <ng-template #tableTpl>
      <div class="yz-select-contacts-modal-right" style="width:67%">
        <ng-container [ngTemplateOutlet]="form" />
        <st #st [scroll]="scroll" [size]="'small'" [bordered]="true">
          <ng-template st-row="checkbox_all" let-item type="title">
            @if (!disableCheck) {
              <label nz-checkbox (change)="onCheckedAll($event)" [nzChecked]="isAllChecked()"></label>
            }
          </ng-template>
          <ng-template st-row="checkbox" let-item let-index="index">
            @if (!disableCheck) {
              <label nz-checkbox (change)="onCheckedItem(item)" [nzChecked]="isChecked(item)"></label>
            }
          </ng-template>
          <ng-template st-row="rolesName" let-item let-index="index">{{ renderRoles(item.roles) }}</ng-template>
        </st>
      </div>
      <div class="yz-select-contacts-modal-right" style="width:33%">
        @if (list) {
          <ng-container [ngTemplateOutlet]="listTpl" />
        }
      </div>
    </ng-template>

    <ng-template #listTpl>
      <div class="right-list-title">
        <h3>{{ 'table-user.checked' | i18n }}</h3>
        @if (hasCheck) {
          <div>
            <a style="cursor: default;">{{ checked.length }} </a>
            <nz-divider nzType="vertical" />
            <a style="cursor: pointer" href="javascript:;" (click)="unCheckAll()">{{ 'table-user.clear' | i18n }}</a>
          </div>
        }
      </div>

      <div class="yz-selected-contacts">
        @if (!hasCheck) {
          <nz-empty style="margin: 90px auto;" />
        }
        <ul nz-menu nzMode="inline" class="yz-role-contacts">
          @for (item of checked; track checked) {
            <li nz-menu-item class="people-item">
              <div class="people-item-right">{{ item?.realName || '--' }}</div>
              <span class="del-btn" (click)="unCheck(item)">
                <i nz-icon nzType="close" nzTheme="outline"></i>
              </span>
            </li>
          }
        </ul>
      </div>
    </ng-template>

    <ng-template #form>
      <sf layout="inline" #sf [schema]="schema" button="none" />
      <button nz-button nzType="primary" (click)="onReset()">{{ 'reset' | i18n }}</button>
    </ng-template>
  `,
                    standalone: true,
                    providers: [YunzaiTableUserService],
                    imports: [
                        CommonModule,
                        YelonFormModule,
                        STModule,
                        I18nPipe,
                        NzCheckboxModule,
                        NzDividerModule,
                        NzButtonModule,
                        NzEmptyModule,
                        NzIconModule,
                        NzMenuModule,
                        NzCardModule
                    ]
                }]
        }], propDecorators: { st: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXRhYmxlLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS10YWJsZS11c2VyL3l1bnphaS10YWJsZS11c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFeEQsT0FBTyxFQUFpQyxRQUFRLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBa0MsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBOEZyRSxNQUFNLE9BQU8sd0JBQXdCO0lBckZyQztRQXlG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TSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBNEI7UUFDdEMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQXFCO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUF5QixDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQXlCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzRixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLFFBQWlCLEVB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LEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQzs4R0F4VlUsd0JBQXdCO2tHQUF4Qix3QkFBd0IsaUlBZnhCLENBQUMsc0JBQXNCLENBQUMsK0xBcEV6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0VULDJEQUlDLFlBQVkscU1BQ1osZUFBZSwwWUFDZixRQUFRLHd4QkFDUixRQUFRLDRDQUNSLGdCQUFnQixnUUFDaEIsZUFBZSx5TUFDZixjQUFjLCtxQkFDZCxhQUFhLG1NQUNiLFlBQVksa05BQ1osWUFBWSwrYkFDWixZQUFZOzsyRkFHSCx3QkFBd0I7a0JBckZwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0VUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDbkMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtpQkFDRjs4QkFFa0IsRUFBRTtzQkFBbEIsU0FBUzt1QkFBQyxJQUFJO2dCQUNFLEVBQUU7c0JBQWxCLFNBQVM7dUJBQUMsSUFBSTtnQkFDTixLQUFLO3NCQUFiLEtBQUs7Z0JBRWEsU0FBUztzQkFBM0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgaW5qZWN0LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU1RDb2x1bW4sIFNUQ29tcG9uZW50LCBTVERhdGEsIFNUTW9kdWxlLCBTVFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQHllbG9uL2FiYy9zdCc7XG5pbXBvcnQgeyBTRkNvbXBvbmVudCwgU0ZTY2hlbWEsIFNGVmFsdWUsIFllbG9uRm9ybU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9mb3JtJztcbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56Q2hlY2tib3hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NoZWNrYm94JztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekRpdmlkZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2RpdmlkZXInO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56TWVudU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVudSc7XG5cbmltcG9ydCB7IFl1bnphaVRhYmxlVXNlclNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS10YWJsZS11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgWXVuemFpVGFibGVVc2VyLFxuICBZdW56YWlUYWJsZVVzZXJQYXJhbSxcbiAgWXVuemFpVGFibGVVc2VyUHJvcHMsXG4gIFl1bnphaVRhYmxlVXNlclJvbGUsXG4gIFl1bnphaVRhYmxlVXNlclN0YXRlXG59IGZyb20gJy4veXVuemFpLXRhYmxlLXVzZXIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktdGFibGUtdXNlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgQGlmICh3cmFwcGVkKSB7XG4gICAgICA8bnotY2FyZD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJsZVRwbFwiIC8+XG4gICAgICA8L256LWNhcmQ+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYmxlVHBsXCIgLz5cbiAgICB9XG5cbiAgICA8bmctdGVtcGxhdGUgI3RhYmxlVHBsPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC1yaWdodFwiIHN0eWxlPVwid2lkdGg6NjclXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9ybVwiIC8+XG4gICAgICAgIDxzdCAjc3QgW3Njcm9sbF09XCJzY3JvbGxcIiBbc2l6ZV09XCInc21hbGwnXCIgW2JvcmRlcmVkXT1cInRydWVcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgc3Qtcm93PVwiY2hlY2tib3hfYWxsXCIgbGV0LWl0ZW0gdHlwZT1cInRpdGxlXCI+XG4gICAgICAgICAgICBAaWYgKCFkaXNhYmxlQ2hlY2spIHtcbiAgICAgICAgICAgICAgPGxhYmVsIG56LWNoZWNrYm94IChjaGFuZ2UpPVwib25DaGVja2VkQWxsKCRldmVudClcIiBbbnpDaGVja2VkXT1cImlzQWxsQ2hlY2tlZCgpXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBzdC1yb3c9XCJjaGVja2JveFwiIGxldC1pdGVtIGxldC1pbmRleD1cImluZGV4XCI+XG4gICAgICAgICAgICBAaWYgKCFkaXNhYmxlQ2hlY2spIHtcbiAgICAgICAgICAgICAgPGxhYmVsIG56LWNoZWNrYm94IChjaGFuZ2UpPVwib25DaGVja2VkSXRlbShpdGVtKVwiIFtuekNoZWNrZWRdPVwiaXNDaGVja2VkKGl0ZW0pXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBzdC1yb3c9XCJyb2xlc05hbWVcIiBsZXQtaXRlbSBsZXQtaW5kZXg9XCJpbmRleFwiPnt7IHJlbmRlclJvbGVzKGl0ZW0ucm9sZXMpIH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC1yaWdodFwiIHN0eWxlPVwid2lkdGg6MzMlXCI+XG4gICAgICAgIEBpZiAobGlzdCkge1xuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibGlzdFRwbFwiIC8+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2xpc3RUcGw+XG4gICAgICA8ZGl2IGNsYXNzPVwicmlnaHQtbGlzdC10aXRsZVwiPlxuICAgICAgICA8aDM+e3sgJ3RhYmxlLXVzZXIuY2hlY2tlZCcgfCBpMThuIH19PC9oMz5cbiAgICAgICAgQGlmIChoYXNDaGVjaykge1xuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YSBzdHlsZT1cImN1cnNvcjogZGVmYXVsdDtcIj57eyBjaGVja2VkLmxlbmd0aCB9fSA8L2E+XG4gICAgICAgICAgICA8bnotZGl2aWRlciBuelR5cGU9XCJ2ZXJ0aWNhbFwiIC8+XG4gICAgICAgICAgICA8YSBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiAoY2xpY2spPVwidW5DaGVja0FsbCgpXCI+e3sgJ3RhYmxlLXVzZXIuY2xlYXInIHwgaTE4biB9fTwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJ5ei1zZWxlY3RlZC1jb250YWN0c1wiPlxuICAgICAgICBAaWYgKCFoYXNDaGVjaykge1xuICAgICAgICAgIDxuei1lbXB0eSBzdHlsZT1cIm1hcmdpbjogOTBweCBhdXRvO1wiIC8+XG4gICAgICAgIH1cbiAgICAgICAgPHVsIG56LW1lbnUgbnpNb2RlPVwiaW5saW5lXCIgY2xhc3M9XCJ5ei1yb2xlLWNvbnRhY3RzXCI+XG4gICAgICAgICAgQGZvciAoaXRlbSBvZiBjaGVja2VkOyB0cmFjayBjaGVja2VkKSB7XG4gICAgICAgICAgICA8bGkgbnotbWVudS1pdGVtIGNsYXNzPVwicGVvcGxlLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1pdGVtLXJpZ2h0XCI+e3sgaXRlbT8ucmVhbE5hbWUgfHwgJy0tJyB9fTwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbC1idG5cIiAoY2xpY2spPVwidW5DaGVjayhpdGVtKVwiPlxuICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2xvc2VcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICB9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNmb3JtPlxuICAgICAgPHNmIGxheW91dD1cImlubGluZVwiICNzZiBbc2NoZW1hXT1cInNjaGVtYVwiIGJ1dHRvbj1cIm5vbmVcIiAvPlxuICAgICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwicHJpbWFyeVwiIChjbGljayk9XCJvblJlc2V0KClcIj57eyAncmVzZXQnIHwgaTE4biB9fTwvYnV0dG9uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHByb3ZpZGVyczogW1l1bnphaVRhYmxlVXNlclNlcnZpY2VdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFllbG9uRm9ybU1vZHVsZSxcbiAgICBTVE1vZHVsZSxcbiAgICBJMThuUGlwZSxcbiAgICBOekNoZWNrYm94TW9kdWxlLFxuICAgIE56RGl2aWRlck1vZHVsZSxcbiAgICBOekJ1dHRvbk1vZHVsZSxcbiAgICBOekVtcHR5TW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek1lbnVNb2R1bGUsXG4gICAgTnpDYXJkTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpVGFibGVVc2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnc3QnKSBzdCE6IFNUQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdzZicpIHNmITogU0ZDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHByb3BzPzogWXVuemFpVGFibGVVc2VyUHJvcHM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DaGVja2VkOiBFdmVudEVtaXR0ZXI8WXVuemFpVGFibGVVc2VyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlUYWJsZVVzZXJbXT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzZXJ2aWNlOiBZdW56YWlUYWJsZVVzZXJTZXJ2aWNlID0gaW5qZWN0KFl1bnphaVRhYmxlVXNlclNlcnZpY2UpO1xuICBwcml2YXRlICRkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICBzdGF0ZTogWXVuemFpVGFibGVVc2VyU3RhdGUgPSB7XG4gICAgY29sdW1uczogW1xuICAgICAgeyBpbmRleDogJ2NoZWNrYm94JywgcmVuZGVyOiAnY2hlY2tib3gnLCByZW5kZXJUaXRsZTogJ2NoZWNrYm94X2FsbCcsIHdpZHRoOiAyMCwgZml4ZWQ6ICdsZWZ0JyB9LFxuICAgICAgeyBpbmRleDogJ25vJywgdHlwZTogJ25vJywgdGl0bGU6IHsgaTE4bjogJ3RhYmxlLXVzZXIubm8nIH0sIHdpZHRoOiA1MCB9LFxuICAgICAgeyBpbmRleDogJ3JlYWxOYW1lJywgdGl0bGU6IHsgaTE4bjogJ3RhYmxlLXVzZXIucmVhbE5hbWUnIH0sIHdpZHRoOiAxMDAgfSxcbiAgICAgIHsgaW5kZXg6ICd1c2VyQ29kZScsIHRpdGxlOiB7IGkxOG46ICd0YWJsZS11c2VyLnVzZXJjb2RlJyB9LCB3aWR0aDogMTAwIH0sXG4gICAgICB7IGluZGV4OiAnZGVwdC5kZXB0TmFtZScsIHRpdGxlOiB7IGkxOG46ICd0YWJsZS11c2VyLmRlcHROYW1lJyB9LCB3aWR0aDogMTAwIH0sXG4gICAgICB7IGluZGV4OiAncm9sZXNOYW1lJywgcmVuZGVyOiAncm9sZXNOYW1lJywgdGl0bGU6IHsgaTE4bjogJ3RhYmxlLXVzZXIucm9sZU5hbWUnIH0sIHdpZHRoOiAxMDAgfSxcbiAgICAgIHsgaW5kZXg6ICdpZENhcmQnLCB0aXRsZTogeyBpMThuOiAndGFibGUtdXNlci5pZGNhcmQnIH0sIHdpZHRoOiAxMDAgfVxuICAgIF0sXG4gICAgZGF0YTogW10sXG4gICAgZGF0YUJhY2t1cDogW10sXG4gICAgcGFnZToge1xuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHBhZ2VTaXplOiAzMCxcbiAgICAgIHBhZ2VQYXJhbToge31cbiAgICB9LFxuICAgIHNjaGVtYToge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByZWFsTmFtZToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHVpOiB7XG4gICAgICAgICAgICB3aWRnZXQ6ICdzdHJpbmcnLFxuICAgICAgICAgICAgaTE4bjogJ3JlYWxOYW1lJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXNlckNvZGU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB1aToge1xuICAgICAgICAgICAgaTE4bjogJ3VzZXJDb2RlJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWRDYXJkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgdWk6IHtcbiAgICAgICAgICAgIGkxOG46ICdpZENhcmQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjaGVjazoge1xuICAgICAgZGF0YTogW11cbiAgICB9XG4gIH07XG5cbiAgZ2V0IHdyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ud3JhcDtcbiAgfVxuXG4gIGdldCBzY2hlbWEoKTogU0ZTY2hlbWEge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNjaGVtYTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uY2hlY2s/LmRpc2FibGU7XG4gIH1cblxuICBnZXQgcGFnZUNoZWNrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LmNoZWNrPy5wYWdlQ2hlY2s7XG4gIH1cblxuICBnZXQgaGFzQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY2hlY2suZGF0YS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IGxpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ubGlzdDtcbiAgfVxuXG4gIGdldCBjaGVja2VkKCk6IFl1bnphaVRhYmxlVXNlcltdIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jaGVjay5kYXRhIGFzIFl1bnphaVRhYmxlVXNlcltdO1xuICB9XG5cbiAgZ2V0IHNjcm9sbCgpOiB7XG4gICAgeD86IHN0cmluZyB8IG51bGw7XG4gICAgeT86IHN0cmluZyB8IG51bGw7XG4gIH0ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuc2Nyb2xsKSByZXR1cm4gdGhpcy5wcm9wcy5zY3JvbGw7XG4gICAgcmV0dXJuIHsgeDogJzEyMDBweCcsIHk6ICc2MDBweCcgfTtcbiAgfVxuXG4gIGdldCBpblNlYXJjaCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc2YudmFsdWU7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHVzZXJJZHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnByb3BzPy51c2VySWRzIHx8IFtdO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cFByb3BzVG9TdGF0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBUYWJsZSgpO1xuICAgIHRoaXMuaG9va1NlYXJjaCgpO1xuICB9XG5cbiAgc2V0dXBQcm9wc1RvU3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzKSByZXR1cm47XG4gICAgdGhpcy5zZXR1cFByb3BzRGF0YSgpO1xuICAgIHRoaXMuc2V0dXBQcm9wc1BhZ2UoKTtcbiAgICB0aGlzLnNldHVwUHJvcHNDb2x1bW5zKCk7XG4gICAgdGhpcy5zZXR1cFByb3BzRmlsdGVyZWRDb2x1bW5zKCk7XG4gICAgdGhpcy5zZXR1cFByb3BzQ3VzdG9tQ29sdW1ucygpO1xuICAgIHRoaXMuc2V0dXBQcm9wc0NoZWNrZWQoKTtcbiAgfVxuXG4gIHNldHVwVGFibGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0KSByZXR1cm47XG4gICAgdGhpcy5zZXR1cFRhYmxlRGF0YSgpO1xuICAgIHRoaXMuc2V0dXBUYWJsZVBhZ2UoKTtcbiAgICB0aGlzLnNldHVwVGFibGVDb2x1bW4oKTtcbiAgICB0aGlzLnNldHVwVGFibGVSZXF1ZXN0KCk7XG4gICAgdGhpcy5zZXR1cFRhYmxlUmVzcG9uc2UoKTtcbiAgICB0aGlzLm9uUXVlcnkoKTtcbiAgfVxuXG4gIHNldHVwUHJvcHNEYXRhKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcykgcmV0dXJuO1xuICAgIGlmICh0aGlzLnByb3BzLmRhdGEgJiYgdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YUJhY2t1cCA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gJy9hdXRoL2Jhc2VVc2VyL3F1ZXJ5TGlzdEZvclBhZ2UnO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwUHJvcHNQYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcyB8fCAhdGhpcy5wcm9wcy5wYWdlKSByZXR1cm47XG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLnBhZ2UpKTtcbiAgfVxuXG4gIHNldHVwUHJvcHNDb2x1bW5zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcyB8fCAhdGhpcy5wcm9wcy5hZGRpdGlvbmFsQ29sdW1ucykgcmV0dXJuO1xuICAgIGxldCBjb2x1bW5zOiBTVENvbHVtbltdID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5hZGRpdGlvbmFsQ29sdW1ucykge1xuICAgICAgY29sdW1ucyA9IGNvbHVtbnMuY29uY2F0KHRoaXMucHJvcHMuYWRkaXRpb25hbENvbHVtbnMpO1xuICAgIH1cbiAgICBjb2x1bW5zID0gY29sdW1ucy5jb25jYXQodGhpcy5zdGF0ZS5jb2x1bW5zKTtcbiAgICB0aGlzLnN0YXRlLmNvbHVtbnMgPSBjb2x1bW5zO1xuICB9XG5cbiAgc2V0dXBQcm9wc0ZpbHRlcmVkQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuZmlsdGVyZWRDb2x1bW5zIHx8IHRoaXMucHJvcHMuZmlsdGVyZWRDb2x1bW5zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIHRoaXMuc3RhdGUuY29sdW1ucyA9IHRoaXMuc3RhdGUuY29sdW1ucy5maWx0ZXIoY29sID0+ICF0aGlzLnByb3BzPy5maWx0ZXJlZENvbHVtbnM/LmluY2x1ZGVzKGNvbC5pbmRleCBhcyBzdHJpbmcpKTtcbiAgfVxuXG4gIHNldHVwUHJvcHNDdXN0b21Db2x1bW5zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcyB8fCAhdGhpcy5wcm9wcy5jdXN0b21Db2x1bW5zIHx8IHRoaXMucHJvcHMuY3VzdG9tQ29sdW1ucy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBjb25zdCB0ZW1wOiBTVENvbHVtbltdID0gW107XG4gICAgdGhpcy5zdGF0ZS5jb2x1bW5zLmZvckVhY2goc3RhdGVDb2x1bW4gPT4ge1xuICAgICAgdGhpcy5wcm9wcz8uY3VzdG9tQ29sdW1ucz8uZm9yRWFjaCgoY3VzdG9tQ29sdW1uOiBTVENvbHVtbikgPT4ge1xuICAgICAgICBpZiAoc3RhdGVDb2x1bW4uaW5kZXggPT09IGN1c3RvbUNvbHVtbi5pbmRleCkge1xuICAgICAgICAgIHRlbXAucHVzaChjdXN0b21Db2x1bW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXAucHVzaChzdGF0ZUNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuc3RhdGUuY29sdW1ucyA9IFsuLi50ZW1wXTtcbiAgfVxuXG4gIHNldHVwUHJvcHNDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcyB8fCAhdGhpcy5wcm9wcy5jaGVjayB8fCAhdGhpcy5wcm9wcy5jaGVjay5kYXRhKSByZXR1cm47XG4gICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5wcm9wcy5jaGVjay5kYXRhO1xuICAgIGlmICh0aGlzLnVzZXJJZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXJ2aWNlLnVzZXJzQnlJZHModGhpcy51c2VySWRzKS5zdWJzY3JpYmUodXNlcnMgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnN0YXRlLmNoZWNrLmRhdGEuY29uY2F0KHVzZXJzKTtcbiAgICAgICAgdGhpcy5vbkNoZWNrZWQuZW1pdCh0aGlzLnN0YXRlLmNoZWNrLmRhdGEgYXMgTnpTYWZlQW55KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBOelNhZmVBbnkpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwVGFibGVEYXRhKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc3QuZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcbiAgfVxuXG4gIHNldHVwVGFibGVQYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc3QucGkgPSB0aGlzLnN0YXRlLnBhZ2UucGFnZU51bTtcbiAgICB0aGlzLnN0LnBzID0gdGhpcy5zdGF0ZS5wYWdlLnBhZ2VTaXplO1xuICB9XG5cbiAgc2V0dXBUYWJsZUNvbHVtbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICB0aGlzLnN0LnJlc2V0Q29sdW1ucyh7IGNvbHVtbnM6IHRoaXMuc3RhdGUuY29sdW1ucyB9KTtcbiAgfVxuXG4gIHNldHVwVGFibGVSZXF1ZXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc3QucmVxID0ge1xuICAgICAgYWxsSW5Cb2R5OiB0cnVlLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICByZU5hbWU6IHtcbiAgICAgICAgcGk6ICdwYWdlTnVtJyxcbiAgICAgICAgcHM6ICdwYWdlU2l6ZSdcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzOiAocmVxdWVzdE9wdGlvbnM6IFNUUmVxdWVzdE9wdGlvbnMpID0+IHtcbiAgICAgICAgcmVxdWVzdE9wdGlvbnMuYm9keS5wYWdlUGFyYW0gPSB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtO1xuICAgICAgICByZXR1cm4gcmVxdWVzdE9wdGlvbnM7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHNldHVwVGFibGVSZXNwb25zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICB0aGlzLnN0LnJlcyA9IHtcbiAgICAgIHJlTmFtZToge1xuICAgICAgICBsaXN0OiAnbGlzdCcsXG4gICAgICAgIHRvdGFsOiAndG90YWwnXG4gICAgICB9LFxuICAgICAgcHJvY2VzczogKGRhdGE6IFNURGF0YVtdKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wYWdlQ2hlY2spIHRoaXMucmVzZXRDaGVja2VkKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXNldENoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzIHx8ICF0aGlzLnByb3BzLmNoZWNrIHx8ICF0aGlzLnByb3BzLmNoZWNrLmRhdGEpIHJldHVybjtcbiAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnByb3BzLmNoZWNrLmRhdGEubWFwKGlkID0+IHtcbiAgICAgIHJldHVybiB7IHVzZXJJZDogaWQgfTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2hlY2tlZEl0ZW0oZGF0YTogWXVuemFpVGFibGVVc2VyKTogdm9pZCB7XG4gICAgLy8gcmVtb3ZlXG4gICAgaWYgKHRoaXMuaXNDaGVja2VkKGRhdGEpKSB7XG4gICAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnN0YXRlLmNoZWNrLmRhdGEuZmlsdGVyKHUgPT4gdVsndXNlcklkJ10gIT09IGRhdGEudXNlcklkKTtcbiAgICB9XG4gICAgLy8gYWRkXG4gICAgZWxzZSBpZiAoIXRoaXMuaXNDaGVja2VkKGRhdGEpKSB7XG4gICAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnN0YXRlLmNoZWNrLmRhdGEuY29uY2F0KFtkYXRhXSk7XG4gICAgfVxuICAgIHRoaXMub25DaGVja2VkLmVtaXQodGhpcy5zdGF0ZS5jaGVjay5kYXRhIGFzIFl1bnphaVRhYmxlVXNlcltdKTtcbiAgfVxuXG4gIG9uQ2hlY2tlZEFsbChlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjaGVja2VkQWxsID0gZS50YXJnZXQubGFiZWxzWzBdLmlubmVySFRNTC5pbmNsdWRlcygnY2hlY2tlZCcpO1xuICAgIGlmIChjaGVja2VkQWxsKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5zdC5fZGF0YS5maWx0ZXIoXG4gICAgICAgIHN0ZCA9PlxuICAgICAgICAgICF0aGlzLnN0YXRlLmNoZWNrLmRhdGEuZmluZChzY2QgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZFsndXNlcklkJ10gPT09IHNjZFsndXNlcklkJ107XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnN0YXRlLmNoZWNrLmRhdGEuY29uY2F0KGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnN0YXRlLmNoZWNrLmRhdGEuZmlsdGVyKHMgPT4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3QuX2RhdGEuZmluZChzdGQgPT4gc3RkWyd1c2VySWQnXSA9PT0gc1sndXNlcklkJ10pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMub25DaGVja2VkLmVtaXQodGhpcy5zdGF0ZS5jaGVjay5kYXRhIGFzIFl1bnphaVRhYmxlVXNlcltdKTtcbiAgfVxuXG4gIGlzQ2hlY2tlZChkYXRhOiBTVERhdGEpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnN0YXRlLmNoZWNrLmRhdGEuZmluZCh1ID0+IHVbJ3VzZXJJZCddID09PSBkYXRhWyd1c2VySWQnXSk7XG4gIH1cblxuICBpc0FsbENoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc3QuX2RhdGEubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBcnJheVN1YnNldCh0aGlzLnN0Ll9kYXRhLCB0aGlzLnN0YXRlLmNoZWNrLmRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0FycmF5U3Vic2V0KHN1YnNldDogTnpTYWZlQW55W10sIHN1cGVyc2V0OiBOelNhZmVBbnlbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzdWJzZXQuZXZlcnkoaXRlbSA9PiBzdXBlcnNldC5zb21lKHN1cGVySXRlbSA9PiBzdXBlckl0ZW0udXNlcklkID09PSBpdGVtLnVzZXJJZCkpO1xuICB9XG5cbiAgcmVuZGVyUm9sZXMocm9sZXM6IFl1bnphaVRhYmxlVXNlclJvbGVbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHJvbGVzLm1hcChyID0+IHIucm9sZU5hbWUpLmpvaW4oJywnKTtcbiAgfVxuXG4gIHVuQ2hlY2sodXNlcjogWXVuemFpVGFibGVVc2VyKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbHRlcihkID0+IGRbJ3VzZXJJZCddICE9IHVzZXIudXNlcklkKTtcbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICB1bkNoZWNrQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2hlY2suZGF0YSA9IFtdO1xuICAgIHRoaXMub25DaGVja2VkLmVtaXQodGhpcy5zdGF0ZS5jaGVjay5kYXRhIGFzIFl1bnphaVRhYmxlVXNlcltdKTtcbiAgfVxuXG4gIGhvb2tTZWFyY2goKTogdm9pZCB7XG4gICAgdGhpcy5zZi5mb3JtVmFsdWVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSksIGRlYm91bmNlVGltZSgxMDAwKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2ZW50O1xuICAgICAgdGhpcy5vblNlYXJjaCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBvblNlYXJjaCh2YWx1ZTogU0ZWYWx1ZSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluU2VhcmNoKSByZXR1cm47XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5kYXRhKSAmJiBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUuZGF0YUJhY2t1cCkpIHtcbiAgICAgIGxldCB0ZW1wRGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cDtcbiAgICAgIGlmICh2YWx1ZVsncmVhbE5hbWUnXSkgdGVtcERhdGEgPSB0ZW1wRGF0YS5maWx0ZXIoZCA9PiBkLnJlYWxOYW1lLmluY2x1ZGVzKHZhbHVlWydyZWFsTmFtZSddKSk7XG4gICAgICBpZiAodmFsdWVbJ2lkQ2FyZCddKSB0ZW1wRGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cC5maWx0ZXIoZCA9PiAoZC5pZENhcmQgPSB2YWx1ZVsnaWRDYXJkJ10pKTtcbiAgICAgIGlmICh2YWx1ZVsndXNlckNvZGUnXSkgdGVtcERhdGEgPSB0aGlzLnN0YXRlLmRhdGFCYWNrdXAuZmlsdGVyKGQgPT4gKGQudXNlckNvZGUgPSB2YWx1ZVsndXNlckNvZGUnXSkpO1xuICAgICAgdGhpcy5zdC5kYXRhID0gdGVtcERhdGE7XG4gICAgICB0aGlzLnN0LnJlbG9hZCgpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc3RhdGUuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc3RhdGUucGFnZS5wYWdlUGFyYW0gPSB7IC4uLnRoaXMuc3RhdGUucGFnZS5wYWdlUGFyYW0sIC4uLnZhbHVlIH07XG4gICAgICB0aGlzLm9uUXVlcnkoKTtcbiAgICB9XG4gIH1cblxuICBvblJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2YucmVzZXQoKTtcbiAgICB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtID0ge307XG4gICAgdGhpcy5vblF1ZXJ5KCk7XG4gIH1cblxuICBwdWJsaWMgb25RdWVyeSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLmRhdGEpICYmIEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5kYXRhQmFja3VwKSkge1xuICAgICAgdGhpcy5zdC5kYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwO1xuICAgIH1cbiAgICB0aGlzLnN0LnJlbG9hZCgpO1xuICB9XG5cbiAgcHVibGljIHNldFRhYmxlUGFyYW0ocGFyYW06IFl1bnphaVRhYmxlVXNlclBhcmFtKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5TZWFyY2gpIHtcbiAgICAgIHRoaXMuc3RhdGUucGFnZS5wYWdlUGFyYW0gPSB7IC4uLnBhcmFtLCAuLi50aGlzLnNmLnZhbHVlIH07XG4gICAgICB0aGlzLm9uU2VhcmNoKHRoaXMuc2YudmFsdWUpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaW5TZWFyY2gpIHtcbiAgICAgIHRoaXMuc3RhdGUucGFnZS5wYWdlUGFyYW0gPSBwYXJhbTtcbiAgICAgIHRoaXMuc2V0dXBUYWJsZSgpO1xuICAgIH1cbiAgfVxufVxuIl19