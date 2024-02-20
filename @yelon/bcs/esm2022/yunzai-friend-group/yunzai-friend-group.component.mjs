import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { catchError, debounceTime, map, Subject, takeUntil, throwError } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { defaultSchema } from './yunzai-friend-group.schema';
import { YunzaiFriendGroupService } from './yunzai-friend-group.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/spin";
import * as i2 from "ng-zorro-antd/card";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/empty";
import * as i5 from "@yelon/form";
import * as i6 from "ng-zorro-antd/list";
export class YunzaiFriendGroupComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onQueryComplete = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        this.$destroy = new Subject();
        this.service = inject(YunzaiFriendGroupService);
        this.state = {
            loading: false,
            schema: defaultSchema,
            data: [],
            dataBackup: []
        };
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiFriendGroupComponent, isStandalone: true, selector: "yunzai-friend-group", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, providers: [YunzaiFriendGroupService], viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzCardModule }, { kind: "component", type: i2.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i4.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "ngmodule", type: YelonFormModule }, { kind: "component", type: i5.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }, { kind: "ngmodule", type: NzListModule }, { kind: "component", type: i6.NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { kind: "component", type: i6.NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupComponent, decorators: [{
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
                    standalone: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZyaWVuZC1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWZyaWVuZC1ncm91cC95dW56YWktZnJpZW5kLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyRixPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7O0FBcUN6RSxNQUFNLE9BQU8sMEJBQTBCO0lBbEN2QztRQW9DRSwrREFBK0Q7UUFDNUMsb0JBQWUsR0FBc0MsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFDaEgsK0RBQStEO1FBQzVDLGFBQVEsR0FBb0MsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFFN0YsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDekIsWUFB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QUFPLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OEdBaEZVLDBCQUEwQjtrR0FBMUIsMEJBQTBCLHFLQUYxQixDQUFDLHdCQUF3QixDQUFDLHNIQTlCM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVCwyREFFUyxZQUFZLDJNQUFFLFlBQVksK1FBQUUsWUFBWSxxTUFBRSxhQUFhLG1NQUFFLGVBQWUsMFlBQUUsWUFBWTs7MkZBR3JGLDBCQUEwQjtrQkFsQ3RDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUNqRyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDdEM7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUVhLGVBQWU7c0JBQWpDLE1BQU07Z0JBRVksUUFBUTtzQkFBMUIsTUFBTTtnQkFDWSxFQUFFO3NCQUFwQixTQUFTO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBBZnRlclZpZXdJbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIGluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgbWFwLCBTdWJqZWN0LCB0YWtlVW50aWwsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU0ZDb21wb25lbnQsIFllbG9uRm9ybU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9mb3JtJztcbmltcG9ydCB7IE56Q2FyZE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY2FyZCc7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekxpc3RNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2xpc3QnO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcblxuaW1wb3J0IHsgZGVmYXVsdFNjaGVtYSB9IGZyb20gJy4veXVuemFpLWZyaWVuZC1ncm91cC5zY2hlbWEnO1xuaW1wb3J0IHsgWXVuemFpRnJpZW5kR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi95dW56YWktZnJpZW5kLWdyb3VwLnNlcnZpY2UnO1xuaW1wb3J0IHsgWXVuemFpRnJpZW5kR3JvdXAsIFl1bnphaUZyaWVuZEdyb3VwUHJvcHMsIFl1bnphaUZyaWVuZEdyb3VwU3RhdGUgfSBmcm9tICcuL3l1bnphaS1mcmllbmQtZ3JvdXAudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktZnJpZW5kLWdyb3VwYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotc3BpbiBbbnpTcGlubmluZ109XCJzdGF0ZS5sb2FkaW5nXCI+XG4gICAgICBAaWYgKGlzV3JhcHBlZCkge1xuICAgICAgICA8bnotY2FyZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgICA8L256LWNhcmQ+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgIH1cbiAgICA8L256LXNwaW4+XG5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZyaWVuZEZvcm1cIiAvPlxuICAgICAgQGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgPG56LWxpc3QgbnpTaXplPVwic21hbGxcIj5cbiAgICAgICAgICBAZm9yIChpdGVtIG9mIGRhdGE7IHRyYWNrIGl0ZW0pIHtcbiAgICAgICAgICAgIDxuei1saXN0LWl0ZW0gKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGl0ZW0pXCI+e3sgaXRlbS5uYW1lIH19PC9uei1saXN0LWl0ZW0+XG4gICAgICAgICAgfVxuICAgICAgICA8L256LWxpc3Q+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgPG56LWVtcHR5IC8+XG4gICAgICB9XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZnJpZW5kRm9ybT5cbiAgICAgIDxzZiAjZm9ybSBsYXlvdXQ9XCJpbmxpbmVcIiBbYnV0dG9uXT1cIidub25lJ1wiIFtzY2hlbWFdPVwic3RhdGUuc2NoZW1hXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpTcGluTW9kdWxlLCBOekNhcmRNb2R1bGUsIENvbW1vbk1vZHVsZSwgTnpFbXB0eU1vZHVsZSwgWWVsb25Gb3JtTW9kdWxlLCBOekxpc3RNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtZdW56YWlGcmllbmRHcm91cFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUZyaWVuZEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBwcm9wcz86IFl1bnphaUZyaWVuZEdyb3VwUHJvcHM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25RdWVyeUNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8WXVuemFpRnJpZW5kR3JvdXBbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaUZyaWVuZEdyb3VwW10+KCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cD4gPSBuZXcgRXZlbnRFbWl0dGVyPFl1bnphaUZyaWVuZEdyb3VwPigpO1xuICBAVmlld0NoaWxkKCdmb3JtJykgc2YhOiBTRkNvbXBvbmVudDtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgc2VydmljZTogWXVuemFpRnJpZW5kR3JvdXBTZXJ2aWNlID0gaW5qZWN0KFl1bnphaUZyaWVuZEdyb3VwU2VydmljZSk7XG5cbiAgc3RhdGU6IFl1bnphaUZyaWVuZEdyb3VwU3RhdGUgPSB7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgc2NoZW1hOiBkZWZhdWx0U2NoZW1hLFxuICAgIGRhdGE6IFtdLFxuICAgIGRhdGFCYWNrdXA6IFtdXG4gIH07XG5cbiAgZ2V0IGlzV3JhcHBlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzPy53cmFwO1xuICB9XG5cbiAgZ2V0IGRhdGEoKTogWXVuemFpRnJpZW5kR3JvdXBbXSB7XG4gICAgaWYgKHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy5kYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5kYXRhO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHJvcHM/LmRhdGEpIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YUJhY2t1cCA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWVyeSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvb2tGb3JtQ2hhbmdlKCk7XG4gIH1cblxuICBob29rRm9ybUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNmLmZvcm1WYWx1ZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSwgZGVib3VuY2VUaW1lKDEwMDApKS5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmFsdWU6IHsgc2VhcmNoIH1cbiAgICAgIH0gPSBjaGFuZ2U7XG4gICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cC5maWx0ZXIoZ3JvdXAgPT4gZ3JvdXAubmFtZS5pbmNsdWRlcyhzZWFyY2gpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGl0ZW06IFl1bnphaUZyaWVuZEdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgcXVlcnkoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnNlcnZpY2VcbiAgICAgIC5ncm91cHMoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKChncm91cHM6IFl1bnphaUZyaWVuZEdyb3VwW10pID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEgPSBncm91cHM7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gZ3JvdXBzO1xuICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQodGhpcy5zdGF0ZS5kYXRhKTtcbiAgICAgICAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19