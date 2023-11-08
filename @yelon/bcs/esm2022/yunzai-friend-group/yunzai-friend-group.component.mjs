import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, debounceTime, map, Subject, takeUntil, throwError } from 'rxjs';
import { defaultSchema } from './yunzai-friend-group.schema';
import * as i0 from "@angular/core";
import * as i1 from "./yunzai-friend-group.service";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/list";
import * as i4 from "ng-zorro-antd/card";
import * as i5 from "ng-zorro-antd/spin";
import * as i6 from "ng-zorro-antd/empty";
import * as i7 from "@yelon/form";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupComponent, deps: [{ token: i1.YunzaiFriendGroupService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiFriendGroupComponent, selector: "yunzai-friend-group", inputs: { props: "props" }, outputs: { onQueryComplete: "onQueryComplete", onSelect: "onSelect" }, viewQueries: [{ propertyName: "sf", first: true, predicate: ["form"], descendants: true }], ngImport: i0, template: "<nz-spin [nzSpinning]=\"state.loading\">\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n</nz-spin>\n\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"friendForm\"></ng-container>\n  <nz-list nzSize=\"small\" *ngIf=\"data.length > 0\">\n    <nz-list-item *ngFor=\"let item of data\" (click)=\"onItemClick(item)\">{{ item.name }}</nz-list-item>\n  </nz-list>\n  <nz-empty *ngIf=\"data.length === 0\"></nz-empty>\n</ng-template>\n\n<ng-template #friendForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { kind: "component", type: i3.NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }, { kind: "component", type: i4.NzCardComponent, selector: "nz-card", inputs: ["nzBordered", "nzBorderless", "nzLoading", "nzHoverable", "nzBodyStyle", "nzCover", "nzActions", "nzType", "nzSize", "nzTitle", "nzExtra"], exportAs: ["nzCard"] }, { kind: "component", type: i5.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "component", type: i6.NzEmptyComponent, selector: "nz-empty", inputs: ["nzNotFoundImage", "nzNotFoundContent", "nzNotFoundFooter"], exportAs: ["nzEmpty"] }, { kind: "component", type: i7.SFComponent, selector: "sf, [sf]", inputs: ["layout", "schema", "ui", "formData", "button", "liveValidate", "autocomplete", "firstVisual", "onlyVisual", "compact", "mode", "loading", "disabled", "noColon", "cleanValue", "delay"], outputs: ["formValueChange", "formChange", "formSubmit", "formReset", "formError"], exportAs: ["sf"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiFriendGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: `yunzai-friend-group`, template: "<nz-spin [nzSpinning]=\"state.loading\">\n  <ng-container *ngIf=\"isWrapped\">\n    <nz-card>\n      <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n    </nz-card>\n  </ng-container>\n\n  <ng-container *ngIf=\"!isWrapped\">\n    <ng-container [ngTemplateOutlet]=\"content\"></ng-container>\n  </ng-container>\n</nz-spin>\n\n<ng-template #content>\n  <ng-container [ngTemplateOutlet]=\"friendForm\"></ng-container>\n  <nz-list nzSize=\"small\" *ngIf=\"data.length > 0\">\n    <nz-list-item *ngFor=\"let item of data\" (click)=\"onItemClick(item)\">{{ item.name }}</nz-list-item>\n  </nz-list>\n  <nz-empty *ngIf=\"data.length === 0\"></nz-empty>\n</ng-template>\n\n<ng-template #friendForm>\n  <sf #form layout=\"inline\" [button]=\"'none'\" [schema]=\"state.schema\"></sf>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiFriendGroupService }]; }, propDecorators: { props: [{
                type: Input
            }], onQueryComplete: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], sf: [{
                type: ViewChild,
                args: ['form']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWZyaWVuZC1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWZyaWVuZC1ncm91cC95dW56YWktZnJpZW5kLWdyb3VwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZnJpZW5kLWdyb3VwL3l1bnphaS1mcmllbmQtZ3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUluRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7OztBQVE3RCxNQUFNLE9BQU8sMEJBQTBCO0lBY3JDLElBQUksU0FBUztRQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELFlBQW9CLGNBQXdDO1FBQXhDLG1CQUFjLEdBQWQsY0FBYyxDQUEwQjtRQXZCekMsb0JBQWUsR0FBc0MsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFDN0YsYUFBUSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUU3RixhQUFRLEdBQUcs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QUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBtYXAsIFN1YmplY3QsIHRha2VVbnRpbCwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNGQ29tcG9uZW50IH0gZnJvbSAnQHllbG9uL2Zvcm0nO1xuXG5pbXBvcnQgeyBkZWZhdWx0U2NoZW1hIH0gZnJvbSAnLi95dW56YWktZnJpZW5kLWdyb3VwLnNjaGVtYSc7XG5pbXBvcnQgeyBZdW56YWlGcmllbmRHcm91cFNlcnZpY2UgfSBmcm9tICcuL3l1bnphaS1mcmllbmQtZ3JvdXAuc2VydmljZSc7XG5pbXBvcnQgeyBZdW56YWlGcmllbmRHcm91cCwgWXVuemFpRnJpZW5kR3JvdXBQcm9wcywgWXVuemFpRnJpZW5kR3JvdXBTdGF0ZSB9IGZyb20gJy4veXVuemFpLWZyaWVuZC1ncm91cC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1mcmllbmQtZ3JvdXBgLFxuICB0ZW1wbGF0ZVVybDogYC4veXVuemFpLWZyaWVuZC1ncm91cC5odG1sYFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlGcmllbmRHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwcm9wcz86IFl1bnphaUZyaWVuZEdyb3VwUHJvcHM7XG4gIEBPdXRwdXQoKSByZWFkb25seSBvblF1ZXJ5Q29tcGxldGU6IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cFtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8WXVuemFpRnJpZW5kR3JvdXBbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8WXVuemFpRnJpZW5kR3JvdXA+ID0gbmV3IEV2ZW50RW1pdHRlcjxZdW56YWlGcmllbmRHcm91cD4oKTtcbiAgQFZpZXdDaGlsZCgnZm9ybScpIHNmITogU0ZDb21wb25lbnQ7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHN0YXRlOiBZdW56YWlGcmllbmRHcm91cFN0YXRlID0ge1xuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHNjaGVtYTogZGVmYXVsdFNjaGVtYSxcbiAgICBkYXRhOiBbXSxcbiAgICBkYXRhQmFja3VwOiBbXSxcbiAgfTtcblxuICBnZXQgaXNXcmFwcGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHM/LndyYXA7XG4gIH1cblxuICBnZXQgZGF0YSgpOiBZdW56YWlGcmllbmRHcm91cFtdIHtcbiAgICBpZiAodGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLmRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmRhdGE7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZHNTZXJ2aWNlOiBZdW56YWlGcmllbmRHcm91cFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHJvcHM/LmRhdGEpIHtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICAgIHRoaXMuc3RhdGUuZGF0YUJhY2t1cCA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWVyeSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvb2tGb3JtQ2hhbmdlKCk7XG4gIH1cblxuICBob29rRm9ybUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNmLmZvcm1WYWx1ZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSwgZGVib3VuY2VUaW1lKDEwMDApKS5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmFsdWU6IHsgc2VhcmNoIH1cbiAgICAgIH0gPSBjaGFuZ2U7XG4gICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cC5maWx0ZXIoZ3JvdXAgPT4gZ3JvdXAubmFtZS5pbmNsdWRlcyhzZWFyY2gpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZGF0YSA9IHRoaXMuc3RhdGUuZGF0YUJhY2t1cDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGl0ZW06IFl1bnphaUZyaWVuZEdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgcXVlcnkoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlXG4gICAgICAuZ3JvdXBzKClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy4kZGVzdHJveSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoZ3JvdXBzOiBZdW56YWlGcmllbmRHcm91cFtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhID0gZ3JvdXBzO1xuICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YUJhY2t1cCA9IGdyb3VwcztcbiAgICAgICAgICB0aGlzLm9uUXVlcnlDb21wbGV0ZS5lbWl0KHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLiRkZXN0cm95LmNvbXBsZXRlKClcbiAgfVxufVxuIiwiPG56LXNwaW4gW256U3Bpbm5pbmddPVwic3RhdGUubG9hZGluZ1wiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNXcmFwcGVkXCI+XG4gICAgPG56LWNhcmQ+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L256LWNhcmQ+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNXcmFwcGVkXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uei1zcGluPlxuXG48bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZnJpZW5kRm9ybVwiPjwvbmctY29udGFpbmVyPlxuICA8bnotbGlzdCBuelNpemU9XCJzbWFsbFwiICpuZ0lmPVwiZGF0YS5sZW5ndGggPiAwXCI+XG4gICAgPG56LWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGl0ZW0pXCI+e3sgaXRlbS5uYW1lIH19PC9uei1saXN0LWl0ZW0+XG4gIDwvbnotbGlzdD5cbiAgPG56LWVtcHR5ICpuZ0lmPVwiZGF0YS5sZW5ndGggPT09IDBcIj48L256LWVtcHR5PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNmcmllbmRGb3JtPlxuICA8c2YgI2Zvcm0gbGF5b3V0PVwiaW5saW5lXCIgW2J1dHRvbl09XCInbm9uZSdcIiBbc2NoZW1hXT1cInN0YXRlLnNjaGVtYVwiPjwvc2Y+XG48L25nLXRlbXBsYXRlPlxuIl19