import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import { map, Subject, takeUntil, debounceTime, catchError, throwError } from 'rxjs';
import * as i1 from '@yelon/theme';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/list';
import * as i4 from 'ng-zorro-antd/card';
import * as i5 from 'ng-zorro-antd/spin';
import * as i6 from 'ng-zorro-antd/empty';
import * as i7 from '@yelon/form';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';

const defaultSchema = {
    properties: {
        search: {
            title: 'name',
            type: 'string',
            ui: {
                i18n: 'input.name',
                widget: 'string'
            }
        }
    }
};

class YunzaiFriendGroupService {
    constructor(http) {
        this.http = http;
    }
    groups() {
        return this.http.post('/contact/appcontact/findGroup', {}).pipe(map((response) => {
            return response.data;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }]; } });

class YunzaiFriendGroupComponent {
    get isWrapped() {
        return !!this.props?.wrap;
    }
    get data() {
        if (this.props && this.props.data) {
            return this.props.data;
        }
        return this.state.data;
    }
    constructor(friendsService) {
        this.friendsService = friendsService;
        this.onQueryComplete = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: defaultSchema,
            data: [],
            dataBackup: [],
        };
    }
    ngOnInit() {
        if (this.props?.data) {
            this.state.data = this.props.data;
            this.state.dataBackup = this.props.data;
        }
        else {
            this.query();
        }
    }
    ngAfterViewInit() {
        this.hookFormChange();
    }
    hookFormChange() {
        this.sf.formValueChange.pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe(change => {
            const { value: { search } } = change;
            if (search) {
                this.state.data = this.state.dataBackup.filter(group => group.name.includes(search));
            }
            else {
                this.state.data = this.state.dataBackup;
            }
        });
    }
    onItemClick(item) {
        this.onSelect.emit(item);
    }
    query() {
        this.state.loading = true;
        this.friendsService
            .groups()
            .pipe(takeUntil(this.$destroy), catchError(error => {
            this.state.loading = false;
            return throwError(error);
        }), map((groups) => {
            this.state.data = groups;
            this.state.dataBackup = groups;
            this.onQueryComplete.emit(this.state.data);
            this.state.loading = false;
        }))
            .subscribe();
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupComponent, deps: [{ token: YunzaiFriendGroupService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiFriendGroupComponent, selector: "yunzai-friend-group", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: "<nz-spin [nzSpinning]=\"state.loading\">\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n</nz-spin>\n\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"friendForm\"></ng-container>\n  <nz-list nzSize=\"small\" *ngIf=\"data.length > 0\">\n    <nz-list-item *ngFor=\"let item of data\" (click)=\"onItemClick(item)\">{{ item.name }}</nz-list-item>\n  </nz-list>\n  <nz-empty *ngIf=\"data.length === 0\"></nz-empty>\n</ng-template>\n\n<ng-template #friendForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { kind: "component", type: i3.NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }, { kind: "component", type: i4.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i5.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "component", type: i6.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i7.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-friend-group`, template: "<nz-spin [nzSpinning]=\"state.loading\">\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n</nz-spin>\n\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"friendForm\"></ng-container>\n  <nz-list nzSize=\"small\" *ngIf=\"data.length > 0\">\n    <nz-list-item *ngFor=\"let item of data\" (click)=\"onItemClick(item)\">{{ item.name }}</nz-list-item>\n  </nz-list>\n  <nz-empty *ngIf=\"data.length === 0\"></nz-empty>\n</ng-template>\n\n<ng-template #friendForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: YunzaiFriendGroupService }]; }, propDecorators: { props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], sf: [{
                type: ViewChild,
                args: ['form']
            }] } });

class YunzaiFriendGroupModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupModule, declarations: [YunzaiFriendGroupComponent], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule], exports: [YunzaiFriendGroupComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupModule, imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupModule, decorators: [{
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
                    declarations: [YunzaiFriendGroupComponent],
                    exports: [YunzaiFriendGroupComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiFriendGroupComponent, YunzaiFriendGroupModule, YunzaiFriendGroupService, defaultSchema };
//# sourceMappingURL=yunzai-friend-group.mjs.map
