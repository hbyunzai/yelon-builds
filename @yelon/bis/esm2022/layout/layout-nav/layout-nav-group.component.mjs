import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { useLocalStorageHeader, WINDOW } from '@yelon/util';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/tabs";
import * as i4 from "ng-zorro-antd/menu";
import * as i5 from "ng-zorro-antd/dropdown";
import * as i6 from "ng-zorro-antd/icon";
export class LayoutNavGroupComponent {
    constructor(inject, http) {
        this.inject = inject;
        this.http = http;
        this.$destroy = new Subject();
        this.state = {
            topics: []
        };
    }
    ngOnInit() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topics = getTopics() || [];
    }
    open(topic) {
        if (topic.key) {
            this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .pipe(takeUntil(this.$destroy))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'blank':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'target':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            default:
                this.inject.get(WINDOW).location.href = topic.url;
                break;
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LayoutNavGroupComponent, deps: [{ token: i0.Injector }, { token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: LayoutNavGroupComponent, selector: "layout-nav-group", ngImport: i0, template: `
    <div class="yz-application-group">
      <nz-tabset>
        <nz-tab *ngFor="let menu of state.topics" [nzTitle]="groupTitleTpl">
          <ng-template #groupTitleTpl>
            <a
              data-event-id="_nav_topic"
              [attr.data-name]="menu.name | i18n"
              nz-dropdown
              [nzDropdownMenu]="menuTpl"
              [nzTrigger]="'click'"
              [nzOverlayClassName]="'yz-application-dropdown'"
            >
              <i nz-icon *ngIf="menu.icon" [nzType]="menu.icon" nzTheme="outline"></i>
              {{ menu.name | i18n }}
              <i *ngIf="menu.children && menu.children.length > 0" nz-icon nzType="down" nzTheme="outline"></i>
            </a>
            <nz-dropdown-menu #menuTpl="nzDropdownMenu">
              <ul nz-menu nzSelectable *ngIf="menu.children && menu.children.length > 0">
                <ng-container *ngFor="let item of menu.children">
                  <li data-event-id="_nav_item" [attr.data-name]="item.name | i18n" nz-menu-item (click)="open(item)">
                    <i nz-icon *ngIf="item.icon" [nzType]="item.icon" nzTheme="outline"></i>{{ item.name | i18n }}
                  </li>
                </ng-container>
              </ul>
            </nz-dropdown-menu>
          </ng-template>
        </nz-tab>
      </nz-tabset>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { kind: "component", type: i3.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }, { kind: "directive", type: i4.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i4.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i5.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LayoutNavGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `layout-nav-group`,
                    template: `
    <div class="yz-application-group">
      <nz-tabset>
        <nz-tab *ngFor="let menu of state.topics" [nzTitle]="groupTitleTpl">
          <ng-template #groupTitleTpl>
            <a
              data-event-id="_nav_topic"
              [attr.data-name]="menu.name | i18n"
              nz-dropdown
              [nzDropdownMenu]="menuTpl"
              [nzTrigger]="'click'"
              [nzOverlayClassName]="'yz-application-dropdown'"
            >
              <i nz-icon *ngIf="menu.icon" [nzType]="menu.icon" nzTheme="outline"></i>
              {{ menu.name | i18n }}
              <i *ngIf="menu.children && menu.children.length > 0" nz-icon nzType="down" nzTheme="outline"></i>
            </a>
            <nz-dropdown-menu #menuTpl="nzDropdownMenu">
              <ul nz-menu nzSelectable *ngIf="menu.children && menu.children.length > 0">
                <ng-container *ngFor="let item of menu.children">
                  <li data-event-id="_nav_item" [attr.data-name]="item.name | i18n" nz-menu-item (click)="open(item)">
                    <i nz-icon *ngIf="item.icon" [nzType]="item.icon" nzTheme="outline"></i>{{ item.name | i18n }}
                  </li>
                </ng-container>
              </ul>
            </nz-dropdown-menu>
          </ng-template>
        </nz-tab>
      </nz-tabset>
    </div>
  `
                }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1._HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYvbGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHMUMsT0FBTyxFQUF1QixxQkFBcUIsRUFBRSxNQUFNLEVBQWtCLE1BQU0sYUFBYSxDQUFDOzs7Ozs7OztBQW9DakcsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQyxZQUNVLE1BQWdCLEVBQ2hCLElBQWlCO1FBRGpCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQVBuQixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxVQUFLLEdBQXdCO1lBQzNCLE1BQU0sRUFBRSxFQUFFO1NBQ1gsQ0FBQztJQUtDLENBQUM7SUFFSixRQUFRO1FBQ04sTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFxQjtRQUN4QixJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxJQUFJO2lCQUNOLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtnQkFDbEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHO2dCQUNoQixVQUFVLEVBQUUsSUFBSSxJQUFJLEVBQUU7YUFDdkIsQ0FBQztpQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDOUIsU0FBUyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JCLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xELE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtRQUNWLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs4R0E1Q1UsdUJBQXVCO2tHQUF2Qix1QkFBdUIsd0RBaEN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUOzsyRkFFVSx1QkFBdUI7a0JBbENuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3RvciwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBMYXlvdXROYXZHcm91cFN0YXRlLCB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsIFdJTkRPVywgWXVuemFpTmF2VG9waWMgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYGxheW91dC1uYXYtZ3JvdXBgLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1ncm91cFwiPlxuICAgICAgPG56LXRhYnNldD5cbiAgICAgICAgPG56LXRhYiAqbmdGb3I9XCJsZXQgbWVudSBvZiBzdGF0ZS50b3BpY3NcIiBbbnpUaXRsZV09XCJncm91cFRpdGxlVHBsXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNncm91cFRpdGxlVHBsPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibWVudS5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJtZW51VHBsXCJcbiAgICAgICAgICAgICAgW256VHJpZ2dlcl09XCInY2xpY2snXCJcbiAgICAgICAgICAgICAgW256T3ZlcmxheUNsYXNzTmFtZV09XCIneXotYXBwbGljYXRpb24tZHJvcGRvd24nXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiAqbmdJZj1cIm1lbnUuaWNvblwiIFtuelR5cGVdPVwibWVudS5pY29uXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgICAgIHt7IG1lbnUubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgICAgICAgPGkgKm5nSWY9XCJtZW51LmNoaWxkcmVuICYmIG1lbnUuY2hpbGRyZW4ubGVuZ3RoID4gMFwiIG56LWljb24gbnpUeXBlPVwiZG93blwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI21lbnVUcGw9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgICAgICA8dWwgbnotbWVudSBuelNlbGVjdGFibGUgKm5nSWY9XCJtZW51LmNoaWxkcmVuICYmIG1lbnUuY2hpbGRyZW4ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbWVudS5jaGlsZHJlblwiPlxuICAgICAgICAgICAgICAgICAgPGxpIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2l0ZW1cIiBbYXR0ci5kYXRhLW5hbWVdPVwiaXRlbS5uYW1lIHwgaTE4blwiIG56LW1lbnUtaXRlbSAoY2xpY2spPVwib3BlbihpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uICpuZ0lmPVwiaXRlbS5pY29uXCIgW256VHlwZV09XCJpdGVtLmljb25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT57eyBpdGVtLm5hbWUgfCBpMThuIH19XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbnotdGFiPlxuICAgICAgPC9uei10YWJzZXQ+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0TmF2R3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuICBzdGF0ZTogTGF5b3V0TmF2R3JvdXBTdGF0ZSA9IHtcbiAgICB0b3BpY3M6IFtdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxuICAgIHByaXZhdGUgaHR0cDogX0h0dHBDbGllbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLnRvcGljcyA9IGdldFRvcGljcygpIHx8IFtdO1xuICB9XG5cbiAgb3Blbih0b3BpYzogWXVuemFpTmF2VG9waWMpOiB2b2lkIHtcbiAgICBpZiAodG9waWMua2V5KSB7XG4gICAgICB0aGlzLmh0dHBcbiAgICAgICAgLnBvc3QoYC9hcHAtbWFuYWdlci93ZWItc2Nhbi9zYXZlYCwge1xuICAgICAgICAgIGFwcElkOiB0b3BpYy5rZXksXG4gICAgICAgICAgY3JlYXRlRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgc3dpdGNoICh0b3BpYy50YXJnZXQpIHtcbiAgICAgIGNhc2UgJ2hyZWYnOlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JsYW5rJzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YXJnZXQnOlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19