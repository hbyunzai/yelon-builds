import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { map, catchError, throwError, Subject, takeUntil, debounceTime } from 'rxjs';
import * as i1 from '@yelon/theme';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/button';
import * as i4 from 'ng-zorro-antd/core/transition-patch';
import * as i5 from 'ng-zorro-antd/core/wave';
import * as i6 from 'ng-zorro-antd/menu';
import * as i7 from 'ng-zorro-antd/checkbox';
import * as i8 from 'ng-zorro-antd/icon';
import * as i9 from 'ng-zorro-antd/card';
import * as i10 from 'ng-zorro-antd/divider';
import * as i11 from 'ng-zorro-antd/empty';
import * as i12 from '@yelon/form';
import * as i13 from '@yelon/abc/st';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';

class YunzaiTableUserService {
    constructor(http) {
        this.http = http;
    }
    users(page) {
        return this.http.post(`/auth/baseUser/queryListForPage`, page).pipe(map((response) => {
            return response;
        }), catchError(e => {
            return throwError(e);
        }));
    }
    usersByIds(ids) {
        return this.http.post(`/auth/baseUser/users`, { "userIds": ids }).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });

class YunzaiTableUserComponent {
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
        this.onChecked = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            columns: [
                { index: "checkbox", render: "checkbox", renderTitle: 'checkbox_all', width: 20, fixed: 'left' },
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
            this.service.usersByIds(this.userIds)
                .subscribe((users) => {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserComponent, deps: [{ token: YunzaiTableUserService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiTableUserComponent, selector: "yunzai-table-user", inputs: { props: "props" }, outputs: { onChecked: "onChecked" }, viewQueries: [{ propertyName: "st", first: true, predicate: ["st"], descendants: true }, { propertyName: "sf", first: true, predicate: ["sf"], descendants: true }], ngImport: i0, template: "<nz-card *ngIf=\"wrapped\">\n  <ng-container [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n</nz-card>\n\n<ng-container *ngIf=\"!wrapped\" [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n\n<ng-template #tableTpl>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:67%\">\n    <ng-container [ngTemplateOutlet]=\"form\"></ng-container>\n    <st #st [scroll]=\"scroll\" [size]=\"'small'\" [bordered]=\"true\">\n      <ng-template st-row=\"checkbox_all\" let-item type=\"title\">\n        <label\n          *ngIf=\"!disableCheck\"\n          nz-checkbox\n          (change)=\"onCheckedAll($event)\"\n          [nzChecked]=\"isAllChecked()\"\n        ></label>\n      </ng-template>\n      <ng-template st-row=\"checkbox\" let-item let-index=\"index\">\n        <label *ngIf=\"!disableCheck\" nz-checkbox (change)=\"onCheckedItem(item)\"\n               [nzChecked]=\"isChecked(item)\"></label>\n      </ng-template>\n      <ng-template st-row=\"rolesName\" let-item\n                   let-index=\"index\">{{renderRoles(item.roles)}}</ng-template>\n    </st>\n  </div>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:33%\">\n    <ng-container *ngIf=\"list\" [ngTemplateOutlet]=\"listTpl\"></ng-container>\n  </div>\n</ng-template>\n\n<ng-template #listTpl>\n  <div class=\"right-list-title\">\n    <h3>{{\"table-user.checked\"|i18n}}</h3>\n    <div *ngIf=\"hasCheck\">\n      <a style=\"cursor: default;\">{{checked.length}} </a>\n      <nz-divider nzType=\"vertical\"></nz-divider>\n      <a style=\"cursor: pointer\" href=\"javascript:;\" (click)=\"unCheckAll()\">{{\"table-user.clear\"|i18n}}</a>\n    </div>\n  </div>\n\n  <div class=\"yz-selected-contacts\">\n    <nz-empty *ngIf=\"!hasCheck\" style=\"margin: 90px auto;\"></nz-empty>\n    <ul nz-menu nzMode=\"inline\" class=\"yz-role-contacts\">\n      <li nz-menu-item *ngFor=\"let item of checked;let i=index\" class=\"people-item\">\n        <div class=\"people-item-right\">{{item?.realName || '--'}}</div>\n        <span class=\"del-btn\" (click)=\"unCheck(item)\">\n              <i nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n            </span>\n      </li>\n    </ul>\n  </div>\n</ng-template>\n\n<ng-template #form>\n  <sf layout=\"inline\" #sf [schema]=\"schema\" button=\"none\"></sf>\n  <button nz-button nzType=\"primary\" (click)=\"onReset()\">{{'reset'|i18n}}</button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "directive", type: i6.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i6.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "component", type: i7.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i9.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i10.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "component", type: i11.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i12.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "component", type: i13.STComponent, selector: "st", inputs: ["req", "res", "page", "data", "columns", "contextmenu", "ps", "pi", "total", "loading", "loadingDelay", "loadingIndicator", "bordered", "size", "scroll", "singleSort", "multiSort", "rowClassName", "clickRowClassName", "widthMode", "widthConfig", "resizable", "header", "showHeader", "footer", "bodyHeader", "body", "expandRowByClick", "expandAccordion", "expand", "noResult", "responsive", "responsiveHideHeaderFooter", "virtualScroll", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "customRequest", "virtualForTrackBy"], outputs: ["error", "change"], exportAs: ["st"] }, { kind: "directive", type: i13.STRowDirective, selector: "[st-row]", inputs: ["st-row", "type"] }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-table-user`, template: "<nz-card *ngIf=\"wrapped\">\n  <ng-container [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n</nz-card>\n\n<ng-container *ngIf=\"!wrapped\" [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n\n<ng-template #tableTpl>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:67%\">\n    <ng-container [ngTemplateOutlet]=\"form\"></ng-container>\n    <st #st [scroll]=\"scroll\" [size]=\"'small'\" [bordered]=\"true\">\n      <ng-template st-row=\"checkbox_all\" let-item type=\"title\">\n        <label\n          *ngIf=\"!disableCheck\"\n          nz-checkbox\n          (change)=\"onCheckedAll($event)\"\n          [nzChecked]=\"isAllChecked()\"\n        ></label>\n      </ng-template>\n      <ng-template st-row=\"checkbox\" let-item let-index=\"index\">\n        <label *ngIf=\"!disableCheck\" nz-checkbox (change)=\"onCheckedItem(item)\"\n               [nzChecked]=\"isChecked(item)\"></label>\n      </ng-template>\n      <ng-template st-row=\"rolesName\" let-item\n                   let-index=\"index\">{{renderRoles(item.roles)}}</ng-template>\n    </st>\n  </div>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:33%\">\n    <ng-container *ngIf=\"list\" [ngTemplateOutlet]=\"listTpl\"></ng-container>\n  </div>\n</ng-template>\n\n<ng-template #listTpl>\n  <div class=\"right-list-title\">\n    <h3>{{\"table-user.checked\"|i18n}}</h3>\n    <div *ngIf=\"hasCheck\">\n      <a style=\"cursor: default;\">{{checked.length}} </a>\n      <nz-divider nzType=\"vertical\"></nz-divider>\n      <a style=\"cursor: pointer\" href=\"javascript:;\" (click)=\"unCheckAll()\">{{\"table-user.clear\"|i18n}}</a>\n    </div>\n  </div>\n\n  <div class=\"yz-selected-contacts\">\n    <nz-empty *ngIf=\"!hasCheck\" style=\"margin: 90px auto;\"></nz-empty>\n    <ul nz-menu nzMode=\"inline\" class=\"yz-role-contacts\">\n      <li nz-menu-item *ngFor=\"let item of checked;let i=index\" class=\"people-item\">\n        <div class=\"people-item-right\">{{item?.realName || '--'}}</div>\n        <span class=\"del-btn\" (click)=\"unCheck(item)\">\n              <i nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n            </span>\n      </li>\n    </ul>\n  </div>\n</ng-template>\n\n<ng-template #form>\n  <sf layout=\"inline\" #sf [schema]=\"schema\" button=\"none\"></sf>\n  <button nz-button nzType=\"primary\" (click)=\"onReset()\">{{'reset'|i18n}}</button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: YunzaiTableUserService }]; }, propDecorators: { st: [{
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

class YunzaiTableUserModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserModule, declarations: [YunzaiTableUserComponent], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule], exports: [YunzaiTableUserComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserModule, imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        RouterModule,
                        ReactiveFormsModule,
                        YunzaiSharedZorroModule,
                        YunzaiSharedYelonModule
                    ],
                    declarations: [YunzaiTableUserComponent],
                    exports: [YunzaiTableUserComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiTableUserComponent, YunzaiTableUserModule, YunzaiTableUserService };
//# sourceMappingURL=yunzai-table-user.mjs.map
