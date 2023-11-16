import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { useLocalStorageHeader, WINDOW } from '@yelon/util';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/menu";
import * as i5 from "ng-zorro-antd/dropdown";
import * as i6 from "ng-zorro-antd/icon";
import * as i7 from "ng-zorro-antd/tabs";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavGroupComponent, deps: [{ token: i0.Injector }, { token: i1._HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LayoutNavGroupComponent, selector: "layout-nav-group", ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i4.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i5.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i5.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i5.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i7.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { kind: "component", type: i7.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }, { kind: "pipe", type: i1.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavGroupComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYvbGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHMUMsT0FBTyxFQUF1QixxQkFBcUIsRUFBRSxNQUFNLEVBQWtCLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7QUFvQ2pHLE1BQU0sT0FBTyx1QkFBdUI7SUFNbEMsWUFDVSxNQUFnQixFQUNoQixJQUFpQjtRQURqQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQWE7UUFQbkIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMsVUFBSyxHQUF3QjtZQUMzQixNQUFNLEVBQUUsRUFBRTtTQUNYLENBQUM7SUFLQyxDQUFDO0lBRUosUUFBUTtRQUNOLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBcUI7UUFDeEIsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUk7aUJBQ04sSUFBSSxDQUFDLDRCQUE0QixFQUFFO2dCQUNsQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUc7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRTthQUN2QixDQUFDO2lCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTLEVBQUUsQ0FBQztTQUNoQjtRQUNELFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNwQixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xELE1BQU07WUFDUjtnQkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xELE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOytHQTVDVSx1QkFBdUI7bUdBQXZCLHVCQUF1Qix3REFoQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7OzRGQUVVLHVCQUF1QjtrQkFsQ25DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IExheW91dE5hdkdyb3VwU3RhdGUsIHVzZUxvY2FsU3RvcmFnZUhlYWRlciwgV0lORE9XLCBZdW56YWlOYXZUb3BpYyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgbGF5b3V0LW5hdi1ncm91cGAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWdyb3VwXCI+XG4gICAgICA8bnotdGFic2V0PlxuICAgICAgICA8bnotdGFiICpuZ0Zvcj1cImxldCBtZW51IG9mIHN0YXRlLnRvcGljc1wiIFtuelRpdGxlXT1cImdyb3VwVGl0bGVUcGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2dyb3VwVGl0bGVUcGw+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtbmFtZV09XCJtZW51Lm5hbWUgfCBpMThuXCJcbiAgICAgICAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgICAgICAgW256RHJvcGRvd25NZW51XT1cIm1lbnVUcGxcIlxuICAgICAgICAgICAgICBbbnpUcmlnZ2VyXT1cIidjbGljaydcIlxuICAgICAgICAgICAgICBbbnpPdmVybGF5Q2xhc3NOYW1lXT1cIid5ei1hcHBsaWNhdGlvbi1kcm9wZG93bidcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aSBuei1pY29uICpuZ0lmPVwibWVudS5pY29uXCIgW256VHlwZV09XCJtZW51Lmljb25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICAgICAge3sgbWVudS5uYW1lIHwgaTE4biB9fVxuICAgICAgICAgICAgICA8aSAqbmdJZj1cIm1lbnUuY2hpbGRyZW4gJiYgbWVudS5jaGlsZHJlbi5sZW5ndGggPiAwXCIgbnotaWNvbiBuelR5cGU9XCJkb3duXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjbWVudVRwbD1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgICAgIDx1bCBuei1tZW51IG56U2VsZWN0YWJsZSAqbmdJZj1cIm1lbnUuY2hpbGRyZW4gJiYgbWVudS5jaGlsZHJlbi5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtZW51LmNoaWxkcmVuXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgZGF0YS1ldmVudC1pZD1cIl9uYXZfaXRlbVwiIFthdHRyLmRhdGEtbmFtZV09XCJpdGVtLm5hbWUgfCBpMThuXCIgbnotbWVudS1pdGVtIChjbGljayk9XCJvcGVuKGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gKm5nSWY9XCJpdGVtLmljb25cIiBbbnpUeXBlXT1cIml0ZW0uaWNvblwiIG56VGhlbWU9XCJvdXRsaW5lXCI+PC9pPnt7IGl0ZW0ubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uei10YWI+XG4gICAgICA8L256LXRhYnNldD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXROYXZHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG4gIHN0YXRlOiBMYXlvdXROYXZHcm91cFN0YXRlID0ge1xuICAgIHRvcGljczogW11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUudG9waWNzID0gZ2V0VG9waWNzKCkgfHwgW107XG4gIH1cblxuICBvcGVuKHRvcGljOiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIGlmICh0b3BpYy5rZXkpIHtcbiAgICAgIHRoaXMuaHR0cFxuICAgICAgICAucG9zdChgL2FwcC1tYW5hZ2VyL3dlYi1zY2FuL3NhdmVgLCB7XG4gICAgICAgICAgYXBwSWQ6IHRvcGljLmtleSxcbiAgICAgICAgICBjcmVhdGVEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiRkZXN0cm95KSlcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvcGljLnRhcmdldCkge1xuICAgICAgY2FzZSAnaHJlZic6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmxhbmsnOlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RhcmdldCc6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=