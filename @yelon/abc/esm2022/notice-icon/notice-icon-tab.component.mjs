import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzListComponent, NzListItemComponent, NzListItemMetaComponent } from 'ng-zorro-antd/list';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import * as i0 from "@angular/core";
export class NoticeIconTabComponent {
    constructor() {
        this.locale = {};
        this.select = new EventEmitter();
        this.clear = new EventEmitter();
    }
    onClick(item) {
        this.select.emit({ title: this.data.title, item });
    }
    onClear() {
        this.clear.emit(this.data.title);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: NoticeIconTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0", type: NoticeIconTabComponent, isStandalone: true, selector: "notice-icon-tab", inputs: { locale: "locale", data: "data" }, outputs: { select: "select", clear: "clear" }, exportAs: ["noticeIconTab"], ngImport: i0, template: "@if (data.list && data.list.length > 0) {\n  <ng-template [ngTemplateOutlet]=\"listTpl\" />\n} @else {\n  <div class=\"notice-icon__notfound\">\n    @if (data.emptyImage) {\n      <img class=\"notice-icon__notfound-img\" [attr.src]=\"data.emptyImage\" alt=\"not found\" />\n    }\n    <p>\n      <ng-container *nzStringTemplateOutlet=\"data.emptyText\">\n        {{ data.emptyText || locale.emptyText }}\n      </ng-container>\n    </p>\n  </div>\n}\n<ng-template #listTpl>\n  <nz-list [nzDataSource]=\"data.list\" [nzRenderItem]=\"item\">\n    <ng-template #item let-item>\n      <nz-list-item (click)=\"onClick(item)\" [class.notice-icon__item-read]=\"item.read\">\n        <nz-list-item-meta [nzTitle]=\"nzTitle\" [nzDescription]=\"nzDescription\" [nzAvatar]=\"item.avatar\">\n          <ng-template #nzTitle>\n            <ng-container *nzStringTemplateOutlet=\"item.title; context: { $implicit: item }\">\n              {{ item.title }}\n            </ng-container>\n            @if (item.extra) {\n              <div class=\"notice-icon__item-extra\">\n                <nz-tag [nzColor]=\"item.color\">{{ item.extra }}</nz-tag>\n              </div>\n            }\n          </ng-template>\n          <ng-template #nzDescription>\n            @if (item.description) {\n              <div class=\"notice-icon__item-desc\">\n                <ng-container *nzStringTemplateOutlet=\"item.description; context: { $implicit: item }\">\n                  {{ item.description }}\n                </ng-container>\n              </div>\n            }\n            @if (item.datetime) {\n              <div class=\"notice-icon__item-time\">{{ item.datetime }}</div>\n            }\n          </ng-template>\n        </nz-list-item-meta>\n      </nz-list-item>\n    </ng-template>\n  </nz-list>\n  <div class=\"notice-icon__clear\" (click)=\"onClear()\">{{ data.clearText || locale.clearText }}</div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "component", type: NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { kind: "component", type: NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }, { kind: "component", type: NzListItemMetaComponent, selector: "nz-list-item-meta, [nz-list-item-meta]", inputs: ["nzAvatar", "nzTitle", "nzDescription"], exportAs: ["nzListItemMeta"] }, { kind: "component", type: NzTagComponent, selector: "nz-tag", inputs: ["nzMode", "nzColor", "nzChecked", "nzBordered"], outputs: ["nzOnClose", "nzCheckedChange"], exportAs: ["nzTag"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: NoticeIconTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'notice-icon-tab', exportAs: 'noticeIconTab', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, standalone: true, imports: [
                        NgTemplateOutlet,
                        NzStringTemplateOutletDirective,
                        NzListComponent,
                        NzListItemComponent,
                        NzListItemMetaComponent,
                        NzTagComponent
                    ], template: "@if (data.list && data.list.length > 0) {\n  <ng-template [ngTemplateOutlet]=\"listTpl\" />\n} @else {\n  <div class=\"notice-icon__notfound\">\n    @if (data.emptyImage) {\n      <img class=\"notice-icon__notfound-img\" [attr.src]=\"data.emptyImage\" alt=\"not found\" />\n    }\n    <p>\n      <ng-container *nzStringTemplateOutlet=\"data.emptyText\">\n        {{ data.emptyText || locale.emptyText }}\n      </ng-container>\n    </p>\n  </div>\n}\n<ng-template #listTpl>\n  <nz-list [nzDataSource]=\"data.list\" [nzRenderItem]=\"item\">\n    <ng-template #item let-item>\n      <nz-list-item (click)=\"onClick(item)\" [class.notice-icon__item-read]=\"item.read\">\n        <nz-list-item-meta [nzTitle]=\"nzTitle\" [nzDescription]=\"nzDescription\" [nzAvatar]=\"item.avatar\">\n          <ng-template #nzTitle>\n            <ng-container *nzStringTemplateOutlet=\"item.title; context: { $implicit: item }\">\n              {{ item.title }}\n            </ng-container>\n            @if (item.extra) {\n              <div class=\"notice-icon__item-extra\">\n                <nz-tag [nzColor]=\"item.color\">{{ item.extra }}</nz-tag>\n              </div>\n            }\n          </ng-template>\n          <ng-template #nzDescription>\n            @if (item.description) {\n              <div class=\"notice-icon__item-desc\">\n                <ng-container *nzStringTemplateOutlet=\"item.description; context: { $implicit: item }\">\n                  {{ item.description }}\n                </ng-container>\n              </div>\n            }\n            @if (item.datetime) {\n              <div class=\"notice-icon__item-time\">{{ item.datetime }}</div>\n            }\n          </ng-template>\n        </nz-list-item-meta>\n      </nz-list-item>\n    </ng-template>\n  </nz-list>\n  <div class=\"notice-icon__clear\" (click)=\"onClear()\">{{ data.clearText || locale.clearText }}</div>\n</ng-template>\n" }]
        }], propDecorators: { locale: [{
                type: Input
            }], data: [{
                type: Input
            }], select: [{
                type: Output
            }], clear: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWNlLWljb24tdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9ub3RpY2UtaWNvbi9ub3RpY2UtaWNvbi10YWIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL25vdGljZS1pY29uL25vdGljZS1pY29uLXRhYi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBb0JuRCxNQUFNLE9BQU8sc0JBQXNCO0lBaEJuQztRQWlCVyxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBRWQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQzlDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0tBU3ZEO0lBUEMsT0FBTyxDQUFDLElBQWdCO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7OEdBWlUsc0JBQXNCO2tHQUF0QixzQkFBc0IsbU1DMUJuQywyM0RBK0NBLDRDRDdCSSxnQkFBZ0Isb0pBQ2hCLCtCQUErQixnTEFDL0IsZUFBZSw2UUFDZixtQkFBbUIsOEpBQ25CLHVCQUF1QixtS0FDdkIsY0FBYzs7MkZBR0wsc0JBQXNCO2tCQWhCbEMsU0FBUzsrQkFDRSxpQkFBaUIsWUFDakIsZUFBZSx1QkFFSixLQUFLLGlCQUNYLGlCQUFpQixDQUFDLElBQUksY0FDekIsSUFBSSxXQUNQO3dCQUNQLGdCQUFnQjt3QkFDaEIsK0JBQStCO3dCQUMvQixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixjQUFjO3FCQUNmOzhCQUdRLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ2EsTUFBTTtzQkFBeEIsTUFBTTtnQkFDWSxLQUFLO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekxpc3RDb21wb25lbnQsIE56TGlzdEl0ZW1Db21wb25lbnQsIE56TGlzdEl0ZW1NZXRhQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9saXN0JztcbmltcG9ydCB7IE56VGFnQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC90YWcnO1xuXG5pbXBvcnQgeyBOb3RpY2VJY29uU2VsZWN0LCBOb3RpY2VJdGVtIH0gZnJvbSAnLi9ub3RpY2UtaWNvbi50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdGljZS1pY29uLXRhYicsXG4gIGV4cG9ydEFzOiAnbm90aWNlSWNvblRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RpY2UtaWNvbi10YWIuY29tcG9uZW50Lmh0bWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIE5nVGVtcGxhdGVPdXRsZXQsXG4gICAgTnpTdHJpbmdUZW1wbGF0ZU91dGxldERpcmVjdGl2ZSxcbiAgICBOekxpc3RDb21wb25lbnQsXG4gICAgTnpMaXN0SXRlbUNvbXBvbmVudCxcbiAgICBOekxpc3RJdGVtTWV0YUNvbXBvbmVudCxcbiAgICBOelRhZ0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5vdGljZUljb25UYWJDb21wb25lbnQge1xuICBASW5wdXQoKSBsb2NhbGU6IExvY2FsZURhdGEgPSB7fTtcbiAgQElucHV0KCkgZGF0YSE6IE5vdGljZUl0ZW07XG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5vdGljZUljb25TZWxlY3Q+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIG9uQ2xpY2soaXRlbTogTm90aWNlSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0aXRsZTogdGhpcy5kYXRhLnRpdGxlLCBpdGVtIH0pO1xuICB9XG5cbiAgb25DbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyLmVtaXQodGhpcy5kYXRhLnRpdGxlKTtcbiAgfVxufVxuIiwiQGlmIChkYXRhLmxpc3QgJiYgZGF0YS5saXN0Lmxlbmd0aCA+IDApIHtcbiAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpc3RUcGxcIiAvPlxufSBAZWxzZSB7XG4gIDxkaXYgY2xhc3M9XCJub3RpY2UtaWNvbl9fbm90Zm91bmRcIj5cbiAgICBAaWYgKGRhdGEuZW1wdHlJbWFnZSkge1xuICAgICAgPGltZyBjbGFzcz1cIm5vdGljZS1pY29uX19ub3Rmb3VuZC1pbWdcIiBbYXR0ci5zcmNdPVwiZGF0YS5lbXB0eUltYWdlXCIgYWx0PVwibm90IGZvdW5kXCIgLz5cbiAgICB9XG4gICAgPHA+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiZGF0YS5lbXB0eVRleHRcIj5cbiAgICAgICAge3sgZGF0YS5lbXB0eVRleHQgfHwgbG9jYWxlLmVtcHR5VGV4dCB9fVxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9wPlxuICA8L2Rpdj5cbn1cbjxuZy10ZW1wbGF0ZSAjbGlzdFRwbD5cbiAgPG56LWxpc3QgW256RGF0YVNvdXJjZV09XCJkYXRhLmxpc3RcIiBbbnpSZW5kZXJJdGVtXT1cIml0ZW1cIj5cbiAgICA8bmctdGVtcGxhdGUgI2l0ZW0gbGV0LWl0ZW0+XG4gICAgICA8bnotbGlzdC1pdGVtIChjbGljayk9XCJvbkNsaWNrKGl0ZW0pXCIgW2NsYXNzLm5vdGljZS1pY29uX19pdGVtLXJlYWRdPVwiaXRlbS5yZWFkXCI+XG4gICAgICAgIDxuei1saXN0LWl0ZW0tbWV0YSBbbnpUaXRsZV09XCJuelRpdGxlXCIgW256RGVzY3JpcHRpb25dPVwibnpEZXNjcmlwdGlvblwiIFtuekF2YXRhcl09XCJpdGVtLmF2YXRhclwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbnpUaXRsZT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtLnRpdGxlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+XG4gICAgICAgICAgICAgIHt7IGl0ZW0udGl0bGUgfX1cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgQGlmIChpdGVtLmV4dHJhKSB7XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpY2UtaWNvbl9faXRlbS1leHRyYVwiPlxuICAgICAgICAgICAgICAgIDxuei10YWcgW256Q29sb3JdPVwiaXRlbS5jb2xvclwiPnt7IGl0ZW0uZXh0cmEgfX08L256LXRhZz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI256RGVzY3JpcHRpb24+XG4gICAgICAgICAgICBAaWYgKGl0ZW0uZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGljZS1pY29uX19pdGVtLWRlc2NcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbS5kZXNjcmlwdGlvbjsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPlxuICAgICAgICAgICAgICAgICAge3sgaXRlbS5kZXNjcmlwdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBpZiAoaXRlbS5kYXRldGltZSkge1xuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWNlLWljb25fX2l0ZW0tdGltZVwiPnt7IGl0ZW0uZGF0ZXRpbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L256LWxpc3QtaXRlbS1tZXRhPlxuICAgICAgPC9uei1saXN0LWl0ZW0+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgPC9uei1saXN0PlxuICA8ZGl2IGNsYXNzPVwibm90aWNlLWljb25fX2NsZWFyXCIgKGNsaWNrKT1cIm9uQ2xlYXIoKVwiPnt7IGRhdGEuY2xlYXJUZXh0IHx8IGxvY2FsZS5jbGVhclRleHQgfX08L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=