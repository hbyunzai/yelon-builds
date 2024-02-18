import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import { map, Subject, takeUntil, debounceTime, catchError, throwError } from 'rxjs';
import * as i2 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i5 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i7 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i4 from 'ng-zorro-antd/list';
import { NzListModule } from 'ng-zorro-antd/list';
import * as i6 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i1 from '@yelon/theme';

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, deps: [{ token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1._HttpClient }] });

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
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.state = {
            loading: false,
            schema: defaultSchema,
            data: [],
            dataBackup: []
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupComponent, deps: [{ token: YunzaiFriendGroupService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiFriendGroupComponent, isStandalone: true, selector: "yunzai-friend-group", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
    <nz-spin [nzSpinning]="state.loading">
      <ng-container *ngIf="isWrapped">
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      </ng-container>

      <ng-container *ngIf="!isWrapped">
        <ng-container [ngTemplateOutlet]="content" />
      </ng-container>
    </nz-spin>

    <ng-template #content>
      <ng-container [ngTemplateOutlet]="friendForm" />
      <nz-list nzSize="small" *ngIf="data.length > 0">
        <nz-list-item *ngFor="let item of data" (click)="onItemClick(item)">{{ item.name }}</nz-list-item>
      </nz-list>
      <nz-empty *ngIf="data.length === 0" />
    </ng-template>

    <ng-template #friendForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i2.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzListModule }, { kind: "component", type: i4.NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { kind: "component", type: i4.NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i5.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i6.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i7.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-friend-group`,
                    template: `
    <nz-spin [nzSpinning]="state.loading">
      <ng-container *ngIf="isWrapped">
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      </ng-container>

      <ng-container *ngIf="!isWrapped">
        <ng-container [ngTemplateOutlet]="content" />
      </ng-container>
    </nz-spin>

    <ng-template #content>
      <ng-container [ngTemplateOutlet]="friendForm" />
      <nz-list nzSize="small" *ngIf="data.length > 0">
        <nz-list-item *ngFor="let item of data" (click)="onItemClick(item)">{{ item.name }}</nz-list-item>
      </nz-list>
      <nz-empty *ngIf="data.length === 0" />
    </ng-template>

    <ng-template #friendForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
  `,
                    standalone: true,
                    imports: [YelonFormModule, CommonModule, NzListModule, NzCardModule, NzSpinModule, NzEmptyModule]
                }]
        }], ctorParameters: () => [{ type: YunzaiFriendGroupService }], propDecorators: { props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], sf: [{
                type: ViewChild,
                args: ['form']
            }] } });

const COMPONENTS = [YunzaiFriendGroupComponent];
class YunzaiFriendGroupModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupModule, imports: [YelonFormModule, CommonModule, NzListModule, NzCardModule, NzSpinModule, NzEmptyModule, YunzaiFriendGroupComponent], exports: [YunzaiFriendGroupComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupModule, imports: [YelonFormModule, CommonModule, NzListModule, NzCardModule, NzSpinModule, NzEmptyModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [YelonFormModule, CommonModule, NzListModule, NzCardModule, NzSpinModule, NzEmptyModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiFriendGroupComponent, YunzaiFriendGroupModule, YunzaiFriendGroupService, defaultSchema };
//# sourceMappingURL=yunzai-friend-group.mjs.map
