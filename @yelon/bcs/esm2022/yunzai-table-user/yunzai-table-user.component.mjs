import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, takeUntil, } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-table-user.service";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/button";
import * as i4 from "ng-zorro-antd/core/transition-patch";
import * as i5 from "ng-zorro-antd/core/wave";
import * as i6 from "ng-zorro-antd/menu";
import * as i7 from "ng-zorro-antd/checkbox";
import * as i8 from "ng-zorro-antd/icon";
import * as i9 from "ng-zorro-antd/card";
import * as i10 from "ng-zorro-antd/divider";
import * as i11 from "ng-zorro-antd/empty";
import * as i12 from "@yelon/form";
import * as i13 from "@yelon/abc/st";
import * as i14 from "@yelon/theme";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserComponent, deps: [{ token: i1.YunzaiTableUserService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiTableUserComponent, selector: "yunzai-table-user", inputs: { props: "props" }, outputs: { onChecked: "onChecked" }, viewQueries: [{ propertyName: "st", first: true, predicate: ["st"], descendants: true }, { propertyName: "sf", first: true, predicate: ["sf"], descendants: true }], ngImport: i0, template: "<nz-card *ngIf=\"wrapped\">\n  <ng-container [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n</nz-card>\n\n<ng-container *ngIf=\"!wrapped\" [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n\n<ng-template #tableTpl>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:67%\">\n    <ng-container [ngTemplateOutlet]=\"form\"></ng-container>\n    <st #st [scroll]=\"scroll\" [size]=\"'small'\" [bordered]=\"true\">\n      <ng-template st-row=\"checkbox_all\" let-item type=\"title\">\n        <label\n          *ngIf=\"!disableCheck\"\n          nz-checkbox\n          (change)=\"onCheckedAll($event)\"\n          [nzChecked]=\"isAllChecked()\"\n        ></label>\n      </ng-template>\n      <ng-template st-row=\"checkbox\" let-item let-index=\"index\">\n        <label *ngIf=\"!disableCheck\" nz-checkbox (change)=\"onCheckedItem(item)\"\n               [nzChecked]=\"isChecked(item)\"></label>\n      </ng-template>\n      <ng-template st-row=\"rolesName\" let-item\n                   let-index=\"index\">{{renderRoles(item.roles)}}</ng-template>\n    </st>\n  </div>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:33%\">\n    <ng-container *ngIf=\"list\" [ngTemplateOutlet]=\"listTpl\"></ng-container>\n  </div>\n</ng-template>\n\n<ng-template #listTpl>\n  <div class=\"right-list-title\">\n    <h3>{{\"table-user.checked\"|i18n}}</h3>\n    <div *ngIf=\"hasCheck\">\n      <a style=\"cursor: default;\">{{checked.length}} </a>\n      <nz-divider nzType=\"vertical\"></nz-divider>\n      <a style=\"cursor: pointer\" href=\"javascript:;\" (click)=\"unCheckAll()\">{{\"table-user.clear\"|i18n}}</a>\n    </div>\n  </div>\n\n  <div class=\"yz-selected-contacts\">\n    <nz-empty *ngIf=\"!hasCheck\" style=\"margin: 90px auto;\"></nz-empty>\n    <ul nz-menu nzMode=\"inline\" class=\"yz-role-contacts\">\n      <li nz-menu-item *ngFor=\"let item of checked;let i=index\" class=\"people-item\">\n        <div class=\"people-item-right\">{{item?.realName || '--'}}</div>\n        <span class=\"del-btn\" (click)=\"unCheck(item)\">\n              <i nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n            </span>\n      </li>\n    </ul>\n  </div>\n</ng-template>\n\n<ng-template #form>\n  <sf layout=\"inline\" #sf [schema]=\"schema\" button=\"none\"></sf>\n  <button nz-button nzType=\"primary\" (click)=\"onReset()\">{{'reset'|i18n}}</button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i5.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "directive", type: i6.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i6.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "component", type: i7.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i9.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i10.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "component", type: i11.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i12.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "component", type: i13.STComponent, selector: "st", inputs: ["req", "res", "page", "data", "columns", "contextmenu", "ps", "pi", "total", "loading", "loadingDelay", "loadingIndicator", "bordered", "size", "scroll", "singleSort", "multiSort", "rowClassName", "clickRowClassName", "widthMode", "widthConfig", "resizable", "header", "showHeader", "footer", "bodyHeader", "body", "expandRowByClick", "expandAccordion", "expand", "noResult", "responsive", "responsiveHideHeaderFooter", "virtualScroll", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "customRequest", "virtualForTrackBy"], outputs: ["error", "change"], exportAs: ["st"] }, { kind: "directive", type: i13.STRowDirective, selector: "[st-row]", inputs: ["st-row", "type"] }, { kind: "pipe", type: i14.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiTableUserComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-table-user`, template: "<nz-card *ngIf=\"wrapped\">\n  <ng-container [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n</nz-card>\n\n<ng-container *ngIf=\"!wrapped\" [ngTemplateOutlet]=\"tableTpl\"></ng-container>\n\n<ng-template #tableTpl>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:67%\">\n    <ng-container [ngTemplateOutlet]=\"form\"></ng-container>\n    <st #st [scroll]=\"scroll\" [size]=\"'small'\" [bordered]=\"true\">\n      <ng-template st-row=\"checkbox_all\" let-item type=\"title\">\n        <label\n          *ngIf=\"!disableCheck\"\n          nz-checkbox\n          (change)=\"onCheckedAll($event)\"\n          [nzChecked]=\"isAllChecked()\"\n        ></label>\n      </ng-template>\n      <ng-template st-row=\"checkbox\" let-item let-index=\"index\">\n        <label *ngIf=\"!disableCheck\" nz-checkbox (change)=\"onCheckedItem(item)\"\n               [nzChecked]=\"isChecked(item)\"></label>\n      </ng-template>\n      <ng-template st-row=\"rolesName\" let-item\n                   let-index=\"index\">{{renderRoles(item.roles)}}</ng-template>\n    </st>\n  </div>\n  <div class=\"yz-select-contacts-modal-right\" style=\"width:33%\">\n    <ng-container *ngIf=\"list\" [ngTemplateOutlet]=\"listTpl\"></ng-container>\n  </div>\n</ng-template>\n\n<ng-template #listTpl>\n  <div class=\"right-list-title\">\n    <h3>{{\"table-user.checked\"|i18n}}</h3>\n    <div *ngIf=\"hasCheck\">\n      <a style=\"cursor: default;\">{{checked.length}} </a>\n      <nz-divider nzType=\"vertical\"></nz-divider>\n      <a style=\"cursor: pointer\" href=\"javascript:;\" (click)=\"unCheckAll()\">{{\"table-user.clear\"|i18n}}</a>\n    </div>\n  </div>\n\n  <div class=\"yz-selected-contacts\">\n    <nz-empty *ngIf=\"!hasCheck\" style=\"margin: 90px auto;\"></nz-empty>\n    <ul nz-menu nzMode=\"inline\" class=\"yz-role-contacts\">\n      <li nz-menu-item *ngFor=\"let item of checked;let i=index\" class=\"people-item\">\n        <div class=\"people-item-right\">{{item?.realName || '--'}}</div>\n        <span class=\"del-btn\" (click)=\"unCheck(item)\">\n              <i nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n            </span>\n      </li>\n    </ul>\n  </div>\n</ng-template>\n\n<ng-template #form>\n  <sf layout=\"inline\" #sf [schema]=\"schema\" button=\"none\"></sf>\n  <button nz-button nzType=\"primary\" (click)=\"onReset()\">{{'reset'|i18n}}</button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiTableUserService }]; }, propDecorators: { st: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXRhYmxlLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS10YWJsZS11c2VyL3l1bnphaS10YWJsZS11c2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktdGFibGUtdXNlci95dW56YWktdGFibGUtdXNlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQnZELE1BQU0sT0FBTyx3QkFBd0I7SUFvRG5DLElBQUksT0FBTztRQUNULE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFB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QUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDOytHQTFWVSx3QkFBd0I7bUdBQXhCLHdCQUF3QiwrUkNuQnJDLDAxRUEwREE7OzRGRHZDYSx3QkFBd0I7a0JBSnBDLFNBQVM7K0JBQ0UsbUJBQW1COzZHQUlaLEVBQUU7c0JBQWxCLFNBQVM7dUJBQUMsSUFBSTtnQkFDRSxFQUFFO3NCQUFsQixTQUFTO3VCQUFDLElBQUk7Z0JBQ04sS0FBSztzQkFBYixLQUFLO2dCQUNhLFNBQVM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgU3ViamVjdCwgdGFrZVVudGlsLH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7U1RDb2x1bW4sIFNUQ29tcG9uZW50LCBTVERhdGEsIFNUUmVxdWVzdE9wdGlvbnN9IGZyb20gJ0B5ZWxvbi9hYmMvc3QnO1xuaW1wb3J0IHtTRkNvbXBvbmVudCwgU0ZTY2hlbWEsIFNGVmFsdWV9IGZyb20gJ0B5ZWxvbi9mb3JtJztcblxuaW1wb3J0IHtcbiAgWXVuemFpVGFibGVVc2VyLFxuICBZdW56YWlUYWJsZVVzZXJQYXJhbSxcbiAgWXVuemFpVGFibGVVc2VyUHJvcHMsXG4gIFl1bnphaVRhYmxlVXNlclJvbGUsXG4gIFl1bnphaVRhYmxlVXNlclN0YXRlXG59IGZyb20gJy4veXVuemFpLXRhYmxlLXVzZXIudHlwZXMnO1xuaW1wb3J0IHtZdW56YWlUYWJsZVVzZXJTZXJ2aWNlfSBmcm9tIFwiLi95dW56YWktdGFibGUtdXNlci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS10YWJsZS11c2VyYCxcbiAgdGVtcGxhdGVVcmw6IGAuL3l1bnphaS10YWJsZS11c2VyLmh0bWxgXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVRhYmxlVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3N0Jykgc3QhOiBTVENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnc2YnKSBzZiE6IFNGQ29tcG9uZW50O1xuICBASW5wdXQoKSBwcm9wcz86IFl1bnphaVRhYmxlVXNlclByb3BzO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DaGVja2VkOiBFdmVudEVtaXR0ZXI8WXVuemFpVGFibGVVc2VyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlUYWJsZVVzZXJbXT4oKTtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KClcblxuICBzdGF0ZTogWXVuemFpVGFibGVVc2VyU3RhdGUgPSB7XG4gICAgY29sdW1uczogW1xuICAgICAge2luZGV4OiBcImNoZWNrYm94XCIsIHJlbmRlcjogXCJjaGVja2JveFwiLCByZW5kZXJUaXRsZTogJ2NoZWNrYm94X2FsbCcsIHdpZHRoOiAyMCwgZml4ZWQ6ICdsZWZ0J30sXG4gICAgICB7aW5kZXg6ICdubycsIHR5cGU6ICdubycsIHRpdGxlOiB7aTE4bjogJ3RhYmxlLXVzZXIubm8nfSwgd2lkdGg6IDUwfSxcbiAgICAgIHtpbmRleDogJ3JlYWxOYW1lJywgdGl0bGU6IHtpMThuOiAndGFibGUtdXNlci5yZWFsTmFtZSd9LCB3aWR0aDogMTAwfSxcbiAgICAgIHtpbmRleDogJ3VzZXJDb2RlJywgdGl0bGU6IHtpMThuOiAndGFibGUtdXNlci51c2VyY29kZSd9LCB3aWR0aDogMTAwfSxcbiAgICAgIHtpbmRleDogJ2RlcHQuZGVwdE5hbWUnLCB0aXRsZToge2kxOG46ICd0YWJsZS11c2VyLmRlcHROYW1lJ30sIHdpZHRoOiAxMDB9LFxuICAgICAge2luZGV4OiAncm9sZXNOYW1lJywgcmVuZGVyOiAncm9sZXNOYW1lJywgdGl0bGU6IHtpMThuOiAndGFibGUtdXNlci5yb2xlTmFtZSd9LCB3aWR0aDogMTAwfSxcbiAgICAgIHtpbmRleDogJ2lkQ2FyZCcsIHRpdGxlOiB7aTE4bjogJ3RhYmxlLXVzZXIuaWRjYXJkJ30sIHdpZHRoOiAxMDB9XG4gICAgXSxcbiAgICBkYXRhOiBbXSxcbiAgICBkYXRhQmFja3VwOiBbXSxcbiAgICBwYWdlOiB7XG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgcGFnZVNpemU6IDMwLFxuICAgICAgcGFnZVBhcmFtOiB7fVxuICAgIH0sXG4gICAgc2NoZW1hOiB7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJlYWxOYW1lOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgdWk6IHtcbiAgICAgICAgICAgIHdpZGdldDogJ3N0cmluZycsXG4gICAgICAgICAgICBpMThuOiAncmVhbE5hbWUnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1c2VyQ29kZToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHVpOiB7XG4gICAgICAgICAgICBpMThuOiAndXNlckNvZGUnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpZENhcmQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICB1aToge1xuICAgICAgICAgICAgaTE4bjogJ2lkQ2FyZCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNoZWNrOiB7XG4gICAgICBkYXRhOiBbXVxuICAgIH1cbiAgfTtcblxuICBnZXQgd3JhcHBlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy53cmFwO1xuICB9XG5cbiAgZ2V0IHNjaGVtYSgpOiBTRlNjaGVtYSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuc2NoZW1hO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVDaGVjaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy5jaGVjaz8uZGlzYWJsZTtcbiAgfVxuXG4gIGdldCBwYWdlQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8uY2hlY2s/LnBhZ2VDaGVjaztcbiAgfVxuXG4gIGdldCBoYXNDaGVjaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQgbGlzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy5saXN0O1xuICB9XG5cbiAgZ2V0IGNoZWNrZWQoKTogWXVuemFpVGFibGVVc2VyW10ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgYXMgWXVuemFpVGFibGVVc2VyW107XG4gIH1cblxuICBnZXQgc2Nyb2xsKCk6IHtcbiAgICB4Pzogc3RyaW5nIHwgbnVsbDtcbiAgICB5Pzogc3RyaW5nIHwgbnVsbDtcbiAgfSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5zY3JvbGwpIHJldHVybiB0aGlzLnByb3BzLnNjcm9sbDtcbiAgICByZXR1cm4ge3g6ICcxMjAwcHgnLCB5OiAnNjAwcHgnfTtcbiAgfVxuXG4gIGdldCBpblNlYXJjaCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc2YudmFsdWU7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IHVzZXJJZHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnByb3BzPy51c2VySWRzIHx8IFtdXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IFl1bnphaVRhYmxlVXNlclNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBQcm9wc1RvU3RhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwVGFibGUoKTtcbiAgICB0aGlzLmhvb2tTZWFyY2goKTtcbiAgfVxuXG4gIHNldHVwUHJvcHNUb1N0YXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcm9wcykgcmV0dXJuO1xuICAgIHRoaXMuc2V0dXBQcm9wc0RhdGEoKTtcbiAgICB0aGlzLnNldHVwUHJvcHNQYWdlKCk7XG4gICAgdGhpcy5zZXR1cFByb3BzQ29sdW1ucygpO1xuICAgIHRoaXMuc2V0dXBQcm9wc0ZpbHRlcmVkQ29sdW1ucygpO1xuICAgIHRoaXMuc2V0dXBQcm9wc0N1c3RvbUNvbHVtbnMoKTtcbiAgICB0aGlzLnNldHVwUHJvcHNDaGVja2VkKCk7XG4gIH1cblxuICBzZXR1cFRhYmxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc2V0dXBUYWJsZURhdGEoKTtcbiAgICB0aGlzLnNldHVwVGFibGVQYWdlKCk7XG4gICAgdGhpcy5zZXR1cFRhYmxlQ29sdW1uKCk7XG4gICAgdGhpcy5zZXR1cFRhYmxlUmVxdWVzdCgpO1xuICAgIHRoaXMuc2V0dXBUYWJsZVJlc3BvbnNlKCk7XG4gICAgdGhpcy5vblF1ZXJ5KCk7XG4gIH1cblxuICBzZXR1cFByb3BzRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMpIHJldHVybjtcbiAgICBpZiAodGhpcy5wcm9wcy5kYXRhICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnN0YXRlLmRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgICB0aGlzLnN0YXRlLmRhdGFCYWNrdXAgPSB0aGlzLnByb3BzLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9ICcvYXV0aC9iYXNlVXNlci9xdWVyeUxpc3RGb3JQYWdlJztcbiAgICB9XG4gIH1cblxuICBzZXR1cFByb3BzUGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMucGFnZSkgcmV0dXJuO1xuICAgIHRoaXMuc3RhdGUucGFnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5wYWdlKSk7XG4gIH1cblxuICBzZXR1cFByb3BzQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuYWRkaXRpb25hbENvbHVtbnMpIHJldHVybjtcbiAgICBsZXQgY29sdW1uczogU1RDb2x1bW5bXSA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuYWRkaXRpb25hbENvbHVtbnMpIHtcbiAgICAgIGNvbHVtbnMgPSBjb2x1bW5zLmNvbmNhdCh0aGlzLnByb3BzLmFkZGl0aW9uYWxDb2x1bW5zKTtcbiAgICB9XG4gICAgY29sdW1ucyA9IGNvbHVtbnMuY29uY2F0KHRoaXMuc3RhdGUuY29sdW1ucyk7XG4gICAgdGhpcy5zdGF0ZS5jb2x1bW5zID0gY29sdW1ucztcbiAgfVxuXG4gIHNldHVwUHJvcHNGaWx0ZXJlZENvbHVtbnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzIHx8ICF0aGlzLnByb3BzLmZpbHRlcmVkQ29sdW1ucyB8fCB0aGlzLnByb3BzLmZpbHRlcmVkQ29sdW1ucy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB0aGlzLnN0YXRlLmNvbHVtbnMgPSB0aGlzLnN0YXRlLmNvbHVtbnMuZmlsdGVyKGNvbCA9PiAhdGhpcy5wcm9wcz8uZmlsdGVyZWRDb2x1bW5zPy5pbmNsdWRlcyhjb2wuaW5kZXggYXMgc3RyaW5nKSk7XG4gIH1cblxuICBzZXR1cFByb3BzQ3VzdG9tQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuY3VzdG9tQ29sdW1ucyB8fCB0aGlzLnByb3BzLmN1c3RvbUNvbHVtbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgdGVtcDogU1RDb2x1bW5bXSA9IFtdO1xuICAgIHRoaXMuc3RhdGUuY29sdW1ucy5mb3JFYWNoKHN0YXRlQ29sdW1uID0+IHtcbiAgICAgIHRoaXMucHJvcHM/LmN1c3RvbUNvbHVtbnM/LmZvckVhY2goKGN1c3RvbUNvbHVtbjogU1RDb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKHN0YXRlQ29sdW1uLmluZGV4ID09PSBjdXN0b21Db2x1bW4uaW5kZXgpIHtcbiAgICAgICAgICB0ZW1wLnB1c2goY3VzdG9tQ29sdW1uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wLnB1c2goc3RhdGVDb2x1bW4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlLmNvbHVtbnMgPSBbLi4udGVtcF07XG4gIH1cblxuICBzZXR1cFByb3BzQ2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvcHMgfHwgIXRoaXMucHJvcHMuY2hlY2sgfHwgIXRoaXMucHJvcHMuY2hlY2suZGF0YSkgcmV0dXJuO1xuICAgIHRoaXMuc3RhdGUuY2hlY2suZGF0YSA9IHRoaXMucHJvcHMuY2hlY2suZGF0YVxuICAgIGlmICh0aGlzLnVzZXJJZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXJ2aWNlLnVzZXJzQnlJZHModGhpcy51c2VySWRzKVxuICAgICAgICAuc3Vic2NyaWJlKCh1c2VycykgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUuY2hlY2suZGF0YSA9IHRoaXMuc3RhdGUuY2hlY2suZGF0YS5jb25jYXQodXNlcnMpXG4gICAgICAgICAgdGhpcy5vbkNoZWNrZWQuZW1pdCh0aGlzLnN0YXRlLmNoZWNrLmRhdGEgYXMgYW55KVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBhbnkpXG4gICAgfVxuICB9XG5cbiAgc2V0dXBUYWJsZURhdGEoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0KSByZXR1cm47XG4gICAgdGhpcy5zdC5kYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xuICB9XG5cbiAgc2V0dXBUYWJsZVBhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0KSByZXR1cm47XG4gICAgdGhpcy5zdC5waSA9IHRoaXMuc3RhdGUucGFnZS5wYWdlTnVtO1xuICAgIHRoaXMuc3QucHMgPSB0aGlzLnN0YXRlLnBhZ2UucGFnZVNpemU7XG4gIH1cblxuICBzZXR1cFRhYmxlQ29sdW1uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc3QucmVzZXRDb2x1bW5zKHtjb2x1bW5zOiB0aGlzLnN0YXRlLmNvbHVtbnN9KTtcbiAgfVxuXG4gIHNldHVwVGFibGVSZXF1ZXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdCkgcmV0dXJuO1xuICAgIHRoaXMuc3QucmVxID0ge1xuICAgICAgYWxsSW5Cb2R5OiB0cnVlLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICByZU5hbWU6IHtcbiAgICAgICAgcGk6ICdwYWdlTnVtJyxcbiAgICAgICAgcHM6ICdwYWdlU2l6ZSdcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzOiAocmVxdWVzdE9wdGlvbnM6IFNUUmVxdWVzdE9wdGlvbnMpID0+IHtcbiAgICAgICAgcmVxdWVzdE9wdGlvbnMuYm9keS5wYWdlUGFyYW0gPSB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtO1xuICAgICAgICByZXR1cm4gcmVxdWVzdE9wdGlvbnM7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHNldHVwVGFibGVSZXNwb25zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICB0aGlzLnN0LnJlcyA9IHtcbiAgICAgIHJlTmFtZToge1xuICAgICAgICBsaXN0OiAnbGlzdCcsXG4gICAgICAgIHRvdGFsOiAndG90YWwnXG4gICAgICB9LFxuICAgICAgcHJvY2VzczogKGRhdGE6IFNURGF0YVtdKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wYWdlQ2hlY2spIHRoaXMucmVzZXRDaGVja2VkKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXNldENoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb3BzIHx8ICF0aGlzLnByb3BzLmNoZWNrIHx8ICF0aGlzLnByb3BzLmNoZWNrLmRhdGEpIHJldHVybjtcbiAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSB0aGlzLnByb3BzLmNoZWNrLmRhdGEubWFwKGlkID0+IHtcbiAgICAgIHJldHVybiB7dXNlcklkOiBpZH07XG4gICAgfSk7XG4gIH1cblxuICBvbkNoZWNrZWRJdGVtKGRhdGE6IFl1bnphaVRhYmxlVXNlcik6IHZvaWQge1xuICAgIC8vIHJlbW92ZVxuICAgIGlmICh0aGlzLmlzQ2hlY2tlZChkYXRhKSkge1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbHRlcih1ID0+IHVbJ3VzZXJJZCddICE9PSBkYXRhLnVzZXJJZCk7XG4gICAgfVxuICAgIC8vIGFkZFxuICAgIGVsc2UgaWYgKCF0aGlzLmlzQ2hlY2tlZChkYXRhKSkge1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmNvbmNhdChbZGF0YV0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICBvbkNoZWNrZWRBbGwoZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY2hlY2tlZEFsbCA9IGUudGFyZ2V0LmxhYmVsc1swXS5pbm5lckhUTUwuaW5jbHVkZXMoJ2NoZWNrZWQnKTtcbiAgICBpZiAoY2hlY2tlZEFsbCkge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuc3QuX2RhdGEuZmlsdGVyKFxuICAgICAgICBzdGQgPT5cbiAgICAgICAgICAhdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbmQoc2NkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdGRbJ3VzZXJJZCddID09PSBzY2RbJ3VzZXJJZCddO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmNvbmNhdChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5jaGVjay5kYXRhID0gdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbHRlcihzID0+IHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0Ll9kYXRhLmZpbmQoc3RkID0+IHN0ZFsndXNlcklkJ10gPT09IHNbJ3VzZXJJZCddKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICBpc0NoZWNrZWQoZGF0YTogU1REYXRhKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zdGF0ZS5jaGVjay5kYXRhLmZpbmQodSA9PiB1Wyd1c2VySWQnXSA9PT0gZGF0YVsndXNlcklkJ10pO1xuICB9XG5cbiAgaXNBbGxDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnN0Ll9kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQXJyYXlTdWJzZXQodGhpcy5zdC5fZGF0YSwgdGhpcy5zdGF0ZS5jaGVjay5kYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNBcnJheVN1YnNldChzdWJzZXQ6IGFueVtdLCBzdXBlcnNldDogYW55W10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gc3Vic2V0LmV2ZXJ5KGl0ZW0gPT4gc3VwZXJzZXQuc29tZShzdXBlckl0ZW0gPT4gc3VwZXJJdGVtLnVzZXJJZCA9PT0gaXRlbS51c2VySWQpKTtcbiAgfVxuXG4gIHJlbmRlclJvbGVzKHJvbGVzOiBZdW56YWlUYWJsZVVzZXJSb2xlW10pOiBzdHJpbmcge1xuICAgIHJldHVybiByb2xlcy5tYXAociA9PiByLnJvbGVOYW1lKS5qb2luKCcsJyk7XG4gIH1cblxuICB1bkNoZWNrKHVzZXI6IFl1bnphaVRhYmxlVXNlcik6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2hlY2suZGF0YSA9IHRoaXMuc3RhdGUuY2hlY2suZGF0YS5maWx0ZXIoZCA9PiBkWyd1c2VySWQnXSAhPSB1c2VyLnVzZXJJZCk7XG4gICAgdGhpcy5vbkNoZWNrZWQuZW1pdCh0aGlzLnN0YXRlLmNoZWNrLmRhdGEgYXMgWXVuemFpVGFibGVVc2VyW10pO1xuICB9XG5cbiAgdW5DaGVja0FsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNoZWNrLmRhdGEgPSBbXTtcbiAgICB0aGlzLm9uQ2hlY2tlZC5lbWl0KHRoaXMuc3RhdGUuY2hlY2suZGF0YSBhcyBZdW56YWlUYWJsZVVzZXJbXSk7XG4gIH1cblxuICBob29rU2VhcmNoKCk6IHZvaWQge1xuICAgIHRoaXMuc2YuZm9ybVZhbHVlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpLCBkZWJvdW5jZVRpbWUoMTAwMCkpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICBjb25zdCB7dmFsdWV9ID0gZXZlbnQ7XG4gICAgICB0aGlzLm9uU2VhcmNoKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VhcmNoKHZhbHVlOiBTRlZhbHVlID0ge30pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5TZWFyY2gpIHJldHVybjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLmRhdGEpICYmIEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5kYXRhQmFja3VwKSkge1xuICAgICAgbGV0IHRlbXBEYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwO1xuICAgICAgaWYgKHZhbHVlWydyZWFsTmFtZSddKSB0ZW1wRGF0YSA9IHRlbXBEYXRhLmZpbHRlcihkID0+IGQucmVhbE5hbWUuaW5jbHVkZXModmFsdWVbJ3JlYWxOYW1lJ10pKTtcbiAgICAgIGlmICh2YWx1ZVsnaWRDYXJkJ10pIHRlbXBEYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwLmZpbHRlcihkID0+IChkLmlkQ2FyZCA9IHZhbHVlWydpZENhcmQnXSkpO1xuICAgICAgaWYgKHZhbHVlWyd1c2VyQ29kZSddKSB0ZW1wRGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cC5maWx0ZXIoZCA9PiAoZC51c2VyQ29kZSA9IHZhbHVlWyd1c2VyQ29kZSddKSk7XG4gICAgICB0aGlzLnN0LmRhdGEgPSB0ZW1wRGF0YTtcbiAgICAgIHRoaXMuc3QucmVsb2FkKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zdGF0ZS5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5zdGF0ZS5wYWdlLnBhZ2VQYXJhbSA9IHsuLi50aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtLCAuLi52YWx1ZX07XG4gICAgICB0aGlzLm9uUXVlcnkoKTtcbiAgICB9XG4gIH1cblxuICBvblJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2YucmVzZXQoKTtcbiAgICB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtID0ge307XG4gICAgdGhpcy5vblF1ZXJ5KCk7XG4gIH1cblxuICBwdWJsaWMgb25RdWVyeSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3QpIHJldHVybjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLmRhdGEpICYmIEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5kYXRhQmFja3VwKSkge1xuICAgICAgdGhpcy5zdC5kYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwO1xuICAgIH1cbiAgICB0aGlzLnN0LnJlbG9hZCgpO1xuICB9XG5cbiAgcHVibGljIHNldFRhYmxlUGFyYW0ocGFyYW06IFl1bnphaVRhYmxlVXNlclBhcmFtKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5TZWFyY2gpIHtcbiAgICAgIHRoaXMuc3RhdGUucGFnZS5wYWdlUGFyYW0gPSB7Li4ucGFyYW0sIC4uLnRoaXMuc2YudmFsdWV9O1xuICAgICAgdGhpcy5vblNlYXJjaCh0aGlzLnNmLnZhbHVlKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmluU2VhcmNoKSB7XG4gICAgICB0aGlzLnN0YXRlLnBhZ2UucGFnZVBhcmFtID0gcGFyYW07XG4gICAgICB0aGlzLnNldHVwVGFibGUoKTtcbiAgICB9XG4gIH1cblxufVxuIiwiPG56LWNhcmQgKm5nSWY9XCJ3cmFwcGVkXCI+XG4gIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFibGVUcGxcIj48L25nLWNvbnRhaW5lcj5cbjwvbnotY2FyZD5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF3cmFwcGVkXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFibGVUcGxcIj48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICN0YWJsZVRwbD5cbiAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC1yaWdodFwiIHN0eWxlPVwid2lkdGg6NjclXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJmb3JtXCI+PC9uZy1jb250YWluZXI+XG4gICAgPHN0ICNzdCBbc2Nyb2xsXT1cInNjcm9sbFwiIFtzaXplXT1cIidzbWFsbCdcIiBbYm9yZGVyZWRdPVwidHJ1ZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIHN0LXJvdz1cImNoZWNrYm94X2FsbFwiIGxldC1pdGVtIHR5cGU9XCJ0aXRsZVwiPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICAqbmdJZj1cIiFkaXNhYmxlQ2hlY2tcIlxuICAgICAgICAgIG56LWNoZWNrYm94XG4gICAgICAgICAgKGNoYW5nZSk9XCJvbkNoZWNrZWRBbGwoJGV2ZW50KVwiXG4gICAgICAgICAgW256Q2hlY2tlZF09XCJpc0FsbENoZWNrZWQoKVwiXG4gICAgICAgID48L2xhYmVsPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBzdC1yb3c9XCJjaGVja2JveFwiIGxldC1pdGVtIGxldC1pbmRleD1cImluZGV4XCI+XG4gICAgICAgIDxsYWJlbCAqbmdJZj1cIiFkaXNhYmxlQ2hlY2tcIiBuei1jaGVja2JveCAoY2hhbmdlKT1cIm9uQ2hlY2tlZEl0ZW0oaXRlbSlcIlxuICAgICAgICAgICAgICAgW256Q2hlY2tlZF09XCJpc0NoZWNrZWQoaXRlbSlcIj48L2xhYmVsPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBzdC1yb3c9XCJyb2xlc05hbWVcIiBsZXQtaXRlbVxuICAgICAgICAgICAgICAgICAgIGxldC1pbmRleD1cImluZGV4XCI+e3tyZW5kZXJSb2xlcyhpdGVtLnJvbGVzKX19PC9uZy10ZW1wbGF0ZT5cbiAgICA8L3N0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdC1jb250YWN0cy1tb2RhbC1yaWdodFwiIHN0eWxlPVwid2lkdGg6MzMlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpc3RcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJsaXN0VHBsXCI+PC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNsaXN0VHBsPlxuICA8ZGl2IGNsYXNzPVwicmlnaHQtbGlzdC10aXRsZVwiPlxuICAgIDxoMz57e1widGFibGUtdXNlci5jaGVja2VkXCJ8aTE4bn19PC9oMz5cbiAgICA8ZGl2ICpuZ0lmPVwiaGFzQ2hlY2tcIj5cbiAgICAgIDxhIHN0eWxlPVwiY3Vyc29yOiBkZWZhdWx0O1wiPnt7Y2hlY2tlZC5sZW5ndGh9fSA8L2E+XG4gICAgICA8bnotZGl2aWRlciBuelR5cGU9XCJ2ZXJ0aWNhbFwiPjwvbnotZGl2aWRlcj5cbiAgICAgIDxhIHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiIChjbGljayk9XCJ1bkNoZWNrQWxsKClcIj57e1widGFibGUtdXNlci5jbGVhclwifGkxOG59fTwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInl6LXNlbGVjdGVkLWNvbnRhY3RzXCI+XG4gICAgPG56LWVtcHR5ICpuZ0lmPVwiIWhhc0NoZWNrXCIgc3R5bGU9XCJtYXJnaW46IDkwcHggYXV0bztcIj48L256LWVtcHR5PlxuICAgIDx1bCBuei1tZW51IG56TW9kZT1cImlubGluZVwiIGNsYXNzPVwieXotcm9sZS1jb250YWN0c1wiPlxuICAgICAgPGxpIG56LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjaGVja2VkO2xldCBpPWluZGV4XCIgY2xhc3M9XCJwZW9wbGUtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWl0ZW0tcmlnaHRcIj57e2l0ZW0/LnJlYWxOYW1lIHx8ICctLSd9fTwvZGl2PlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRlbC1idG5cIiAoY2xpY2spPVwidW5DaGVjayhpdGVtKVwiPlxuICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImNsb3NlXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNmb3JtPlxuICA8c2YgbGF5b3V0PVwiaW5saW5lXCIgI3NmIFtzY2hlbWFdPVwic2NoZW1hXCIgYnV0dG9uPVwibm9uZVwiPjwvc2Y+XG4gIDxidXR0b24gbnotYnV0dG9uIG56VHlwZT1cInByaW1hcnlcIiAoY2xpY2spPVwib25SZXNldCgpXCI+e3sncmVzZXQnfGkxOG59fTwvYnV0dG9uPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==