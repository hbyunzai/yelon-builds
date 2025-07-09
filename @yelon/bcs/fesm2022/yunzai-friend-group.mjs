import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable, EventEmitter, ViewChild, Output, Input, Component, NgModule } from '@angular/core';
import * as i5 from '@yelon/form';
import { YelonFormModule } from '@yelon/form';
import * as i2 from 'ng-zorro-antd/card';
import { NzCardModule } from 'ng-zorro-antd/card';
import * as i4 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i6 from 'ng-zorro-antd/list';
import { NzListModule } from 'ng-zorro-antd/list';
import * as i1 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { map, Subject, takeUntil, debounceTime, catchError, throwError } from 'rxjs';
import { _HttpClient } from '@yelon/theme';

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
    http = inject(_HttpClient);
    groups() {
        return this.http.post('/contact/appcontact/findGroup', {}).pipe(map((response) => {
            return response.data;
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupService, decorators: [{
            type: Injectable
        }] });

class YunzaiFriendGroupComponent {
    props;
    onQueryComplete = new EventEmitter();
    onSelect = new EventEmitter();
    sf;
    $destroy = new Subject();
    service = inject(YunzaiFriendGroupService);
    state = {
        loading: false,
        schema: defaultSchema,
        data: [],
        dataBackup: []
    };
    get isWrapped() {
        return !!this.props?.wrap;
    }
    get data() {
        if (this.props && this.props.data) {
            return this.props.data;
        }
        return this.state.data;
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
        this.service
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.0.6", type: YunzaiFriendGroupComponent, isStandalone: true, selector: "yunzai-friend-group", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiFriendGroupService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
    <nz-spin [nzSpinning]="state.loading">
      @if (isWrapped) {
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      } @else {
        <ng-container [ngTemplateOutlet]="content" />
      }
    </nz-spin>

    <ng-template #content>
      <ng-container [ngTemplateOutlet]="friendForm" />
      @if (data.length > 0) {
        <nz-list nzSize="small">
          @for (item of data; track item) {
            <nz-list-item (click)="onItemClick(item)">{{ item.name }}</nz-list-item>
          }
        </nz-list>
      } @else {
        <nz-empty />
      }
    </ng-template>

    <ng-template #friendForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i2.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i4.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i5.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzListModule }, { kind: "component", type: i6.NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { kind: "component", type: i6.NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-friend-group`,
                    template: `
    <nz-spin [nzSpinning]="state.loading">
      @if (isWrapped) {
        <nz-card>
          <ng-container [ngTemplateOutlet]="content" />
        </nz-card>
      } @else {
        <ng-container [ngTemplateOutlet]="content" />
      }
    </nz-spin>

    <ng-template #content>
      <ng-container [ngTemplateOutlet]="friendForm" />
      @if (data.length > 0) {
        <nz-list nzSize="small">
          @for (item of data; track item) {
            <nz-list-item (click)="onItemClick(item)">{{ item.name }}</nz-list-item>
          }
        </nz-list>
      } @else {
        <nz-empty />
      }
    </ng-template>

    <ng-template #friendForm>
      <sf #form layout="inline" [button]="'none'" [schema]="state.schema" />
    </ng-template>
  `,
                    imports: [NzSpinModule, NzCardModule, CommonModule, NzEmptyModule, YelonFormModule, NzListModule],
                    providers: [YunzaiFriendGroupService]
                }]
        }], propDecorators: { props: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupModule, imports: [NzSpinModule, NzCardModule, CommonModule, NzEmptyModule, YelonFormModule, NzListModule, YunzaiFriendGroupComponent], exports: [YunzaiFriendGroupComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupModule, imports: [NzSpinModule, NzCardModule, CommonModule, NzEmptyModule, YelonFormModule, NzListModule, COMPONENTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: YunzaiFriendGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzSpinModule, NzCardModule, CommonModule, NzEmptyModule, YelonFormModule, NzListModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiFriendGroupComponent, YunzaiFriendGroupModule, YunzaiFriendGroupService, defaultSchema };
//# sourceMappingURL=yunzai-friend-group.mjs.map
