import * as i0 from '@angular/core';
import { inject, Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { map, catchError, throwError, Subject, takeUntil, debounceTime } from 'rxjs';
import { _HttpClient, I18nPipe } from '@yelon/theme';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@yelon/abc/st';
import { STModule } from '@yelon/abc/st';
import * as i2 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i6 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i12 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i4 from 'ng-zorro-antd/checkbox';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import * as i5 from 'ng-zorro-antd/divider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import * as i9 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i10 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i11 from 'ng-zorro-antd/menu';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import * as i7 from 'ng-zorro-antd/core/transition-patch';
import * as i8 from 'ng-zorro-antd/core/wave';

class YunzaiTableUserService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    users(page) {
        return this.http.post(`/auth/baseUser/queryListForPage`, page).pipe(map((response) => {
            return response;
        }), catchError(e => {
            return throwError(e);
        }));
    }
    usersByIds(ids) {
        return this.http.post(`/auth/baseUser/users`, { userIds: ids }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserService, decorators: [{
            type: Injectable
        }] });

class YunzaiTableUserComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiTableUserComponent, isStandalone: true, selector: "yunzai-table-user", inputs: { props: "props" }, outputs: { onChecked: "onChecked" }, providers: [YunzaiTableUserService], viewQueries: [{ propertyName: "st", first: true, predicate: ["st"], descendants: true }, { propertyName: "sf", first: true, predicate: ["sf"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserComponent, decorators: [{
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

const COMPONENTS = [YunzaiTableUserComponent];
class YunzaiTableUserModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserModule, imports: [CommonModule,
            YelonFormModule,
            STModule,
            I18nPipe,
            NzCheckboxModule,
            NzDividerModule,
            NzButtonModule,
            NzEmptyModule,
            NzIconModule,
            NzMenuModule,
            NzCardModule, YunzaiTableUserComponent], exports: [YunzaiTableUserComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserModule, providers: [YunzaiTableUserService], imports: [CommonModule,
            YelonFormModule,
            STModule,
            NzCheckboxModule,
            NzDividerModule,
            NzButtonModule,
            NzEmptyModule,
            NzIconModule,
            NzMenuModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiTableUserModule, decorators: [{
            type: NgModule,
            args: [{
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
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    providers: [YunzaiTableUserService],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { COMPONENTS, YunzaiTableUserComponent, YunzaiTableUserModule, YunzaiTableUserService };
//# sourceMappingURL=yunzai-table-user.mjs.map
