import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/cache";
import * as i2 from "./yz.stomp.service";
import * as i3 from "@yelon/theme/layout-default";
import * as i4 from "./widgets/yz.application.component";
import * as i5 from "./widgets/yz.notify.component";
import * as i6 from "./widgets/yz.them-btn.component";
import * as i7 from "ng-zorro-antd/dropdown";
import * as i8 from "./widgets/yz.fullscreen.component";
import * as i9 from "./widgets/yz.clear-storage.component";
import * as i10 from "./widgets/yz.i18n.component";
import * as i11 from "./widgets/yz.user.component";
import * as i12 from "ng-zorro-antd/avatar";
import * as i13 from "@yelon/abc/reuse-tab";
import * as i14 from "ng-zorro-antd/core/transition-patch";
import * as i15 from "ng-zorro-antd/icon";
import * as i16 from "ng-zorro-antd/menu";
import * as i17 from "@angular/router";
import * as i18 from "@angular/common";
import * as i19 from "@yelon/theme";
export class YzLayoutBasicComponent {
    constructor(cacheService, yzStompService, layoutService) {
        this.cacheService = cacheService;
        this.yzStompService = yzStompService;
        this.layoutService = layoutService;
        this.options = {
            logoExpanded: `./assets/logo-full.svg`,
            logoCollapsed: `./assets/logo.svg`
        };
        this.intro = '';
        this.text = '';
        this.icon = '';
        this.showReuseTab = true;
        this.showHeader = true;
        this.showSider = true;
    }
    get reuseStyleSheet() {
        let cascadingStyleSheet = {};
        if (!this.showHeader) {
            cascadingStyleSheet = {
                ...cascadingStyleSheet,
                top: 0
            };
        }
        if (!this.showSider) {
            cascadingStyleSheet = {
                ...cascadingStyleSheet,
                left: '24px'
            };
        }
        return cascadingStyleSheet;
    }
    ngOnInit() {
        const current = this.cacheService.get('_yz_current', { mode: 'none' });
        const project = this.cacheService.get('_yz_project_info', { mode: 'none' });
        this.text = current.text ? current.text : '应用名称';
        this.intro = current.intro ? current.intro : '应用描述';
        this.icon = current.icon ? current.icon : `./assets/tmp/img/avatar.jpg`;
        this.options.logoExpanded = project.maxLogoUrl ? project.maxLogoUrl : `./assets/logo-full.svg`;
        this.options.logoCollapsed = project.miniLogoUrl ? project.miniLogoUrl : `./assets/logo.svg`;
        this.yzStompService.listen();
        this.layoutService.reuseTab.asObservable().subscribe(show => (this.showReuseTab = show));
        this.layoutService.header.asObservable().subscribe(show => (this.showHeader = show));
        this.layoutService.sidebar.asObservable().subscribe(show => (this.showSider = show));
    }
    ngOnDestroy() {
        this.yzStompService.unListen();
    }
}
YzLayoutBasicComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzLayoutBasicComponent, deps: [{ token: i1.CacheService }, { token: i2.YzStompService }, { token: i3.LayoutService }], target: i0.ɵɵFactoryTarget.Component });
YzLayoutBasicComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: YzLayoutBasicComponent, selector: "yz-layout-basic", ngImport: i0, template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="showReuseTab ? contentTpl : noneTpl">
      <layout-default-header-item direction="left">
        <yz-header-application></yz-header-application>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <yz-header-notify></yz-header-notify>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <yz-header-theme-btn></yz-header-theme-btn>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <div
          layout-default-header-item-trigger
          nz-dropdown
          [nzDropdownMenu]="settingsMenu"
          nzTrigger="click"
          nzPlacement="bottomRight"
        >
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div nz-menu-item>
              <yz-header-fullscreen></yz-header-fullscreen>
            </div>
            <div nz-menu-item>
              <yz-header-clear-storage></yz-header-clear-storage>
            </div>
            <div nz-menu-item>
              <yz-header-i18n></yz-header-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yz-header-user></yz-header-user>
      </layout-default-header-item>
      <ng-template #asideUserTpl>
        <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="yunzai-default__aside-user">
          <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="icon"></nz-avatar>
          <div class="yunzai-default__aside-user-info">
            <strong>{{ text }}</strong>
            <p class="mb0">{{ intro }}</p>
          </div>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/">{{ 'menu.backtohome' | i18n }}</li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>
      <ng-template #contentTpl>
        <reuse-tab #reuseTab [ngStyle]="reuseStyleSheet"></reuse-tab>
        <router-outlet (activate)="reuseTab.activate($event)"></router-outlet>
      </ng-template>
      <ng-template #noneTpl>
        <router-outlet></router-outlet>
      </ng-template>
    </layout-default>
  `, isInline: true, components: [{ type: i3.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "nav", "content", "customError"], exportAs: ["layoutDefault"] }, { type: i3.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { type: i4.YzHeaderApplicationComponent, selector: "yz-header-application" }, { type: i5.YzHeaderNotifyComponent, selector: "yz-header-notify" }, { type: i6.YzHeaderThemBtnComponent, selector: "yz-header-theme-btn", inputs: ["types", "devTips", "deployUrl"] }, { type: i7.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { type: i8.YzHeaderFullScreenComponent, selector: "yz-header-fullscreen" }, { type: i9.YzHeaderClearStorageComponent, selector: "yz-header-clear-storage" }, { type: i10.YzHeaderI18NComponent, selector: "yz-header-i18n", inputs: ["showLangText"] }, { type: i11.YzHeaderUserComponent, selector: "yz-header-user" }, { type: i12.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { type: i13.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender"], outputs: ["change", "close"], exportAs: ["reuseTab"] }], directives: [{ type: i3.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { type: i7.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { type: i14.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i15.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i16.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i16.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { type: i17.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo", "routerLink"] }, { type: i18.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i17.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }], pipes: { "i18n": i19.I18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzLayoutBasicComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yz-layout-basic',
                    template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="showReuseTab ? contentTpl : noneTpl">
      <layout-default-header-item direction="left">
        <yz-header-application></yz-header-application>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <yz-header-notify></yz-header-notify>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <yz-header-theme-btn></yz-header-theme-btn>
      </layout-default-header-item>

      <layout-default-header-item direction="right" hidden="mobile">
        <div
          layout-default-header-item-trigger
          nz-dropdown
          [nzDropdownMenu]="settingsMenu"
          nzTrigger="click"
          nzPlacement="bottomRight"
        >
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div nz-menu-item>
              <yz-header-fullscreen></yz-header-fullscreen>
            </div>
            <div nz-menu-item>
              <yz-header-clear-storage></yz-header-clear-storage>
            </div>
            <div nz-menu-item>
              <yz-header-i18n></yz-header-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yz-header-user></yz-header-user>
      </layout-default-header-item>
      <ng-template #asideUserTpl>
        <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="yunzai-default__aside-user">
          <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="icon"></nz-avatar>
          <div class="yunzai-default__aside-user-info">
            <strong>{{ text }}</strong>
            <p class="mb0">{{ intro }}</p>
          </div>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/">{{ 'menu.backtohome' | i18n }}</li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>
      <ng-template #contentTpl>
        <reuse-tab #reuseTab [ngStyle]="reuseStyleSheet"></reuse-tab>
        <router-outlet (activate)="reuseTab.activate($event)"></router-outlet>
      </ng-template>
      <ng-template #noneTpl>
        <router-outlet></router-outlet>
      </ng-template>
    </layout-default>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.CacheService }, { type: i2.YzStompService }, { type: i3.LayoutService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYmFzaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5iYXNpYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRFdEYsTUFBTSxPQUFPLHNCQUFzQjtJQStCakMsWUFDVSxZQUEwQixFQUMxQixjQUE4QixFQUM5QixhQUE0QjtRQUY1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFqQ3RDLFlBQU8sR0FBeUI7WUFDOUIsWUFBWSxFQUFFLHdCQUF3QjtZQUN0QyxhQUFhLEVBQUUsbUJBQW1CO1NBQ25DLENBQUM7UUFFRixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7SUF1QnZCLENBQUM7SUFyQkosSUFBSSxlQUFlO1FBQ2pCLElBQUksbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLG1CQUFtQixHQUFHO2dCQUNwQixHQUFHLG1CQUFtQjtnQkFDdEIsR0FBRyxFQUFFLENBQUM7YUFDUCxDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixtQkFBbUIsR0FBRztnQkFDcEIsR0FBRyxtQkFBbUI7Z0JBQ3RCLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQztTQUNIO1FBQ0QsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDO0lBUUQsUUFBUTtRQUNOLE1BQU0sT0FBTyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sT0FBTyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQztRQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztRQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztRQUM3RixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzttSEFyRFUsc0JBQXNCO3VHQUF0QixzQkFBc0IsdURBbEV2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0RUOzJGQUdVLHNCQUFzQjtrQkFwRWxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErRFQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2NhY2hlJztcbmltcG9ydCB7IExheW91dERlZmF1bHRPcHRpb25zLCBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lL2xheW91dC1kZWZhdWx0JztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFl6U3RvbXBTZXJ2aWNlIH0gZnJvbSAnLi95ei5zdG9tcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXotbGF5b3V0LWJhc2ljJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGF5b3V0LWRlZmF1bHQgW29wdGlvbnNdPVwib3B0aW9uc1wiIFthc2lkZVVzZXJdPVwiYXNpZGVVc2VyVHBsXCIgW2NvbnRlbnRdPVwic2hvd1JldXNlVGFiID8gY29udGVudFRwbCA6IG5vbmVUcGxcIj5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJsZWZ0XCI+XG4gICAgICAgIDx5ei1oZWFkZXItYXBwbGljYXRpb24+PC95ei1oZWFkZXItYXBwbGljYXRpb24+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuXG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHl6LWhlYWRlci1ub3RpZnk+PC95ei1oZWFkZXItbm90aWZ5PlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cblxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDx5ei1oZWFkZXItdGhlbWUtYnRuPjwveXotaGVhZGVyLXRoZW1lLWJ0bj5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0tdHJpZ2dlclxuICAgICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgICAgW256RHJvcGRvd25NZW51XT1cInNldHRpbmdzTWVudVwiXG4gICAgICAgICAgbnpUcmlnZ2VyPVwiY2xpY2tcIlxuICAgICAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZXR0aW5nXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI3NldHRpbmdzTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgPGRpdiBuei1tZW51IHN0eWxlPVwid2lkdGg6IDIwMHB4O1wiPlxuICAgICAgICAgICAgPGRpdiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5ei1oZWFkZXItZnVsbHNjcmVlbj48L3l6LWhlYWRlci1mdWxsc2NyZWVuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl6LWhlYWRlci1jbGVhci1zdG9yYWdlPjwveXotaGVhZGVyLWNsZWFyLXN0b3JhZ2U+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXotaGVhZGVyLWkxOG4+PC95ei1oZWFkZXItaTE4bj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgIDx5ei1oZWFkZXItdXNlcj48L3l6LWhlYWRlci11c2VyPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjYXNpZGVVc2VyVHBsPlxuICAgICAgICA8ZGl2IG56LWRyb3Bkb3duIG56VHJpZ2dlcj1cImNsaWNrXCIgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlclwiPlxuICAgICAgICAgIDxuei1hdmF0YXIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1hdmF0YXJcIiBbbnpTcmNdPVwiaWNvblwiPjwvbnotYXZhdGFyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1pbmZvXCI+XG4gICAgICAgICAgICA8c3Ryb25nPnt7IHRleHQgfX08L3N0cm9uZz5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwibWIwXCI+e3sgaW50cm8gfX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjdXNlck1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSByb3V0ZXJMaW5rPVwiL1wiPnt7ICdtZW51LmJhY2t0b2hvbWUnIHwgaTE4biB9fTwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRwbD5cbiAgICAgICAgPHJldXNlLXRhYiAjcmV1c2VUYWIgW25nU3R5bGVdPVwicmV1c2VTdHlsZVNoZWV0XCI+PC9yZXVzZS10YWI+XG4gICAgICAgIDxyb3V0ZXItb3V0bGV0IChhY3RpdmF0ZSk9XCJyZXVzZVRhYi5hY3RpdmF0ZSgkZXZlbnQpXCI+PC9yb3V0ZXItb3V0bGV0PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbm9uZVRwbD5cbiAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2xheW91dC1kZWZhdWx0PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZekxheW91dEJhc2ljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBvcHRpb25zOiBMYXlvdXREZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBsb2dvRXhwYW5kZWQ6IGAuL2Fzc2V0cy9sb2dvLWZ1bGwuc3ZnYCxcbiAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgXG4gIH07XG5cbiAgaW50cm86IHN0cmluZyA9ICcnO1xuICB0ZXh0OiBzdHJpbmcgPSAnJztcbiAgaWNvbjogc3RyaW5nID0gJyc7XG5cbiAgc2hvd1JldXNlVGFiOiBib29sZWFuID0gdHJ1ZTtcbiAgc2hvd0hlYWRlcjogYm9vbGVhbiA9IHRydWU7XG4gIHNob3dTaWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgZ2V0IHJldXNlU3R5bGVTaGVldCgpOiBOelNhZmVBbnkge1xuICAgIGxldCBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge307XG4gICAgaWYgKCF0aGlzLnNob3dIZWFkZXIpIHtcbiAgICAgIGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7XG4gICAgICAgIC4uLmNhc2NhZGluZ1N0eWxlU2hlZXQsXG4gICAgICAgIHRvcDogMFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNob3dTaWRlcikge1xuICAgICAgY2FzY2FkaW5nU3R5bGVTaGVldCA9IHtcbiAgICAgICAgLi4uY2FzY2FkaW5nU3R5bGVTaGVldCxcbiAgICAgICAgbGVmdDogJzI0cHgnXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2FzY2FkaW5nU3R5bGVTaGVldDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB5elN0b21wU2VydmljZTogWXpTdG9tcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYXlvdXRTZXJ2aWNlOiBMYXlvdXRTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50OiBOelNhZmVBbnkgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9jdXJyZW50JywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgY29uc3QgcHJvamVjdDogTnpTYWZlQW55ID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfcHJvamVjdF9pbmZvJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy50ZXh0ID0gY3VycmVudC50ZXh0ID8gY3VycmVudC50ZXh0IDogJ+W6lOeUqOWQjeensCc7XG4gICAgdGhpcy5pbnRybyA9IGN1cnJlbnQuaW50cm8gPyBjdXJyZW50LmludHJvIDogJ+W6lOeUqOaPj+i/sCc7XG4gICAgdGhpcy5pY29uID0gY3VycmVudC5pY29uID8gY3VycmVudC5pY29uIDogYC4vYXNzZXRzL3RtcC9pbWcvYXZhdGFyLmpwZ2A7XG4gICAgdGhpcy5vcHRpb25zLmxvZ29FeHBhbmRlZCA9IHByb2plY3QubWF4TG9nb1VybCA/IHByb2plY3QubWF4TG9nb1VybCA6IGAuL2Fzc2V0cy9sb2dvLWZ1bGwuc3ZnYDtcbiAgICB0aGlzLm9wdGlvbnMubG9nb0NvbGxhcHNlZCA9IHByb2plY3QubWluaUxvZ29VcmwgPyBwcm9qZWN0Lm1pbmlMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28uc3ZnYDtcbiAgICB0aGlzLnl6U3RvbXBTZXJ2aWNlLmxpc3RlbigpO1xuICAgIHRoaXMubGF5b3V0U2VydmljZS5yZXVzZVRhYi5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoc2hvdyA9PiAodGhpcy5zaG93UmV1c2VUYWIgPSBzaG93KSk7XG4gICAgdGhpcy5sYXlvdXRTZXJ2aWNlLmhlYWRlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoc2hvdyA9PiAodGhpcy5zaG93SGVhZGVyID0gc2hvdykpO1xuICAgIHRoaXMubGF5b3V0U2VydmljZS5zaWRlYmFyLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShzaG93ID0+ICh0aGlzLnNob3dTaWRlciA9IHNob3cpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMueXpTdG9tcFNlcnZpY2UudW5MaXN0ZW4oKTtcbiAgfVxufVxuIl19