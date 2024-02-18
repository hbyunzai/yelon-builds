import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, Subject, takeUntil, throwError } from 'rxjs';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { defaultSchema } from './yunzai-friend-group.schema';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-friend-group.service";
import * as i2 from "@yelon/form";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/list";
import * as i5 from "ng-zorro-antd/card";
import * as i6 from "ng-zorro-antd/spin";
import * as i7 from "ng-zorro-antd/empty";
export class YunzaiFriendGroupComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiFriendGroupComponent, deps: [{ token: i1.YunzaiFriendGroupService }], target: i0.ɵɵFactoryTarget.Component }); }
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
        }], ctorParameters: () => [{ type: i1.YunzaiFriendGroupService }], propDecorators: { props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], sf: [{
                type: ViewChild,
                args: ['form']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZyaWVuZC1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWZyaWVuZC1ncm91cC95dW56YWktZnJpZW5kLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckYsT0FBTyxFQUFlLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7QUFrQzdELE1BQU0sT0FBTywwQkFBMEI7SUFnQnJDLElBQUksU0FBUztRQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENB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LEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs4R0FqRlUsMEJBQTBCO2tHQUExQiwwQkFBMEIsOFFBNUIzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JULDJEQUVTLGVBQWUsMFlBQUUsWUFBWSxzYUFBRSxZQUFZLGlmQUFFLFlBQVksK1FBQUUsWUFBWSwyTUFBRSxhQUFhOzsyRkFFckYsMEJBQTBCO2tCQTlCdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7aUJBQ2xHOzZGQUVVLEtBQUs7c0JBQWIsS0FBSztnQkFFYSxlQUFlO3NCQUFqQyxNQUFNO2dCQUVZLFFBQVE7c0JBQTFCLE1BQU07Z0JBQ1ksRUFBRTtzQkFBcEIsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIG1hcCwgU3ViamVjdCwgdGFrZVVudGlsLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNGQ29tcG9uZW50LCBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpMaXN0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9saXN0JztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5cbmltcG9ydCB7IGRlZmF1bHRTY2hlbWEgfSBmcm9tICcuL3l1bnphaS1mcmllbmQtZ3JvdXAuc2NoZW1hJztcbmltcG9ydCB7IFl1bnphaUZyaWVuZEdyb3VwU2VydmljZSB9IGZyb20gJy4veXVuemFpLWZyaWVuZC1ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IFl1bnphaUZyaWVuZEdyb3VwLCBZdW56YWlGcmllbmRHcm91cFByb3BzLCBZdW56YWlGcmllbmRHcm91cFN0YXRlIH0gZnJvbSAnLi95dW56YWktZnJpZW5kLWdyb3VwLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWZyaWVuZC1ncm91cGAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXNwaW4gW256U3Bpbm5pbmddPVwic3RhdGUubG9hZGluZ1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzV3JhcHBlZFwiPlxuICAgICAgICA8bnotY2FyZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgICA8L256LWNhcmQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1dyYXBwZWRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbnotc3Bpbj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZnJpZW5kRm9ybVwiIC8+XG4gICAgICA8bnotbGlzdCBuelNpemU9XCJzbWFsbFwiICpuZ0lmPVwiZGF0YS5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxuei1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YVwiIChjbGljayk9XCJvbkl0ZW1DbGljayhpdGVtKVwiPnt7IGl0ZW0ubmFtZSB9fTwvbnotbGlzdC1pdGVtPlxuICAgICAgPC9uei1saXN0PlxuICAgICAgPG56LWVtcHR5ICpuZ0lmPVwiZGF0YS5sZW5ndGggPT09IDBcIiAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2ZyaWVuZEZvcm0+XG4gICAgICA8c2YgI2Zvcm0gbGF5b3V0PVwiaW5saW5lXCIgW2J1dHRvbl09XCInbm9uZSdcIiBbc2NoZW1hXT1cInN0YXRlLnNjaGVtYVwiIC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1llbG9uRm9ybU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOekxpc3RNb2R1bGUsIE56Q2FyZE1vZHVsZSwgTnpTcGluTW9kdWxlLCBOekVtcHR5TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlGcmllbmRHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJvcHM/OiBZdW56YWlGcmllbmRHcm91cFByb3BzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uUXVlcnlDb21wbGV0ZTogRXZlbnRFbWl0dGVyPFl1bnphaUZyaWVuZEdyb3VwW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cFtdPigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8WXVuemFpRnJpZW5kR3JvdXA+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cD4oKTtcbiAgQFZpZXdDaGlsZCgnZm9ybScpIHNmITogU0ZDb21wb25lbnQ7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHN0YXRlOiBZdW56YWlGcmllbmRHcm91cFN0YXRlID0ge1xuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHNjaGVtYTogZGVmYXVsdFNjaGVtYSxcbiAgICBkYXRhOiBbXSxcbiAgICBkYXRhQmFja3VwOiBbXVxuICB9O1xuXG4gIGdldCBpc1dyYXBwZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcz8ud3JhcDtcbiAgfVxuXG4gIGdldCBkYXRhKCk6IFl1bnphaUZyaWVuZEdyb3VwW10ge1xuICAgIGlmICh0aGlzLnByb3BzICYmIHRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGF0YTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kc1NlcnZpY2U6IFl1bnphaUZyaWVuZEdyb3VwU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcm9wcz8uZGF0YSkge1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXJ5KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaG9va0Zvcm1DaGFuZ2UoKTtcbiAgfVxuXG4gIGhvb2tGb3JtQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2YuZm9ybVZhbHVlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpLCBkZWJvdW5jZVRpbWUoMTAwMCkpLnN1YnNjcmliZShjaGFuZ2UgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICB2YWx1ZTogeyBzZWFyY2ggfVxuICAgICAgfSA9IGNoYW5nZTtcbiAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwLmZpbHRlcihncm91cCA9PiBncm91cC5uYW1lLmluY2x1ZGVzKHNlYXJjaCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gdGhpcy5zdGF0ZS5kYXRhQmFja3VwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25JdGVtQ2xpY2soaXRlbTogWXVuemFpRnJpZW5kR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XG4gIH1cblxuICBxdWVyeSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2VcbiAgICAgIC5ncm91cHMoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKChncm91cHM6IFl1bnphaUZyaWVuZEdyb3VwW10pID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEgPSBncm91cHM7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhQmFja3VwID0gZ3JvdXBzO1xuICAgICAgICAgIHRoaXMub25RdWVyeUNvbXBsZXRlLmVtaXQodGhpcy5zdGF0ZS5kYXRhKTtcbiAgICAgICAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19