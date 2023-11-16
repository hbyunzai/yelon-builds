import { Component, Inject } from '@angular/core';
import { WINDOW, hasFavicon, log, setFavicon, NavType, useLocalStorageCurrent, useLocalStorageProjectInfo, useLocalStorageHeaderType, useLocalStorageDefaultRoute } from '@yelon/util';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme/layout-default";
import * as i2 from "@yelon/socket";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@yelon/abc/reuse-tab";
import * as i6 from "ng-zorro-antd/core/transition-patch";
import * as i7 from "ng-zorro-antd/menu";
import * as i8 from "ng-zorro-antd/dropdown";
import * as i9 from "ng-zorro-antd/icon";
import * as i10 from "ng-zorro-antd/avatar";
import * as i11 from "../widgets/yunzai-clear-storage.component";
import * as i12 from "../widgets/yunzai-fullscreen.component";
import * as i13 from "../widgets/yunzai-i18n.component";
import * as i14 from "../widgets/yunzai-notify.component";
import * as i15 from "../widgets/yunzai-theme-btn.component";
import * as i16 from "../widgets/yunzai-user.component";
import * as i17 from "../layout-nav/layout-nav-application.component";
import * as i18 from "../layout-nav/layout-nav-group.component";
import * as i19 from "../layout-nav/layout-nav-tile.component";
import * as i20 from "@yelon/theme";
export class YunzaiLayoutBasicComponent {
    get options() {
        return this.state.options;
    }
    get navType() {
        return this.state.navType;
    }
    get aside() {
        return this.state.aside;
    }
    get displayReusetab() {
        return this.state.display.reusetab;
    }
    get reusetabCSS() {
        let cascadingStyleSheet = {};
        if (!this.state.display.nav) {
            cascadingStyleSheet = {
                ...cascadingStyleSheet,
                top: '0px'
            };
        }
        if (!this.state.display.aside) {
            cascadingStyleSheet = {
                ...cascadingStyleSheet,
                left: '24px'
            };
        }
        return cascadingStyleSheet;
    }
    constructor(layoutDisplayService, stompService, win) {
        this.layoutDisplayService = layoutDisplayService;
        this.stompService = stompService;
        this.win = win;
        this.NavType = NavType;
        this.state = {
            options: {
                logoExpanded: `./assets/logo-full.svg`,
                logoCollapsed: `./assets/logo.svg`
            },
            aside: {
                name: '',
                intro: '',
                icon: ''
            },
            display: {
                nav: true,
                aside: true,
                reusetab: true
            },
            navType: NavType.APPLICATION
        };
    }
    ngOnInit() {
        this.initLogo();
        this.initFavicon();
        this.initNavType();
        this.initAside();
        this.addLayoutDisplayListener();
        this.stompService.listen();
        this.toIndex();
    }
    initFavicon() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const projectInfo = getProjectInfo();
        if (projectInfo.faviconUrl) {
            hasFavicon(projectInfo.faviconUrl).then((has) => {
                if (has) {
                    setFavicon(projectInfo.faviconUrl);
                }
                else {
                    setFavicon('./assets/favicon.ico');
                }
            });
        }
    }
    initAside() {
        const [, getCurrent] = useLocalStorageCurrent();
        const aside = getCurrent();
        this.state.aside = { ...aside };
    }
    initLogo() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const projectInfo = getProjectInfo();
        this.state.options.logoExpanded = projectInfo.maxLogoUrl ? projectInfo.maxLogoUrl : `./assets/logo-full.svg`;
        this.state.options.logoCollapsed = projectInfo.miniLogoUrl ? projectInfo.miniLogoUrl : `./assets/logo.svg`;
    }
    initNavType() {
        const [, getHeaderType] = useLocalStorageHeaderType();
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const navType = getHeaderType();
        const projectInfo = getProjectInfo();
        if (navType !== null) {
            this.state.navType = navType;
            return;
        }
        let fetchedNavType;
        if (projectInfo.headerStyle && projectInfo.headerStyle.length > 0) {
            fetchedNavType = projectInfo.headerStyle.pop()?.value;
        }
        // default value
        if (!fetchedNavType) {
            fetchedNavType = NavType.APPLICATION;
        }
        this.state.navType = fetchedNavType;
    }
    toIndex() {
        const [, getDefaultRoute] = useLocalStorageDefaultRoute();
        const defaultRoute = getDefaultRoute();
        log('YunzaiLayoutBasicComponent: ', `todo: the default route was ${defaultRoute}, 但是还没想好如何实现.`);
    }
    onNavTypeChange(type) {
        const [setHeaderType] = useLocalStorageHeaderType();
        setHeaderType(type);
        this.win.location.reload();
    }
    addLayoutDisplayListener() {
        this.layoutDisplayService.listen('reuseTab', (display) => {
            this.state.display.reusetab = display;
        });
        this.layoutDisplayService.listen('nav', (display) => {
            this.state.display.nav = display;
        });
        this.layoutDisplayService.listen('aside', (display) => {
            this.state.display.aside = display;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [{ token: i1.LayoutDisplayService }, { token: i2.StompService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiLayoutBasicComponent, selector: "yz-layout-basic", ngImport: i0, template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="displayReusetab ? contentTpl : noneTpl">
      <!-- nav -->
      <layout-default-header-item direction="left">
        <ng-container [ngSwitch]="navType">
          <ng-container *ngSwitchCase="NavType.APPLICATION">
            <layout-nav-application />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <layout-nav-group />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <layout-nav-tile />
          </ng-container>
          <ng-container *ngSwitchDefault>
            <layout-nav-application />
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <!-- nav end -->
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-notify />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-theme-btn />
      </layout-default-header-item>
      <!-- setting -->
      <layout-default-header-item direction="right" hidden="mobile">
        <div
          data-event-id="_nav_settings"
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
            <div data-event-id="_nav_mode" nz-menu-item>
              {{ 'mode.nav' | i18n }}
            </div>

            <div
              data-event-id="_nav_mode"
              data-type="application"
              nz-menu-item
              (click)="onNavTypeChange(NavType.APPLICATION)"
            >
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.application' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="group" nz-menu-item (click)="onNavTypeChange(NavType.GROUP)">
              <i nz-icon nzType="group" class="mr-sm"></i>
              {{ 'mode.nav.group' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="tile" nz-menu-item (click)="onNavTypeChange(NavType.TILE)">
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.tile' | i18n }}
            </div>
            <div data-event-id="_nav_fullscreen" nz-menu-item>
              <yunzai-fullscreen />
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-clearstorage />
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-i18n />
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-user />
      </layout-default-header-item>
      <!-- setting end -->
    </layout-default>
    <ng-template #asideUserTpl>
      <div
        data-event-id="_route_user"
        nz-dropdown
        nzTrigger="click"
        [nzDropdownMenu]="userMenu"
        class="yunzai-default__aside-user"
      >
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon" />
        <div class="yunzai-default__aside-user-info">
          <strong>{{ aside.name | i18n }}</strong>
          <p class="mb0">{{ aside.intro | i18n }}</p>
        </div>
      </div>
      <nz-dropdown-menu #userMenu="nzDropdownMenu">
        <ul nz-menu>
          <li data-event-id="_route_backhome" nz-menu-item routerLink="/">{{ 'back.home' | i18n }}</li>
        </ul>
      </nz-dropdown-menu>
    </ng-template>
    <ng-template #contentTpl>
      <reuse-tab #reuseTab [ngStyle]="reusetabCSS" />
      <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)" />
    </ng-template>
    <ng-template #noneTpl> <router-outlet /> </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i4.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "component", type: i1.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "directive", type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i7.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i7.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i8.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i8.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i10.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "component", type: i11.YunzaiClearStorageComponent, selector: "yunzai-clearstorage" }, { kind: "component", type: i12.YunzaiFullScreenComponent, selector: "yunzai-fullscreen" }, { kind: "component", type: i13.YunzaiI18NComponent, selector: "yunzai-i18n", inputs: ["showLangText"] }, { kind: "component", type: i14.YunzaiNotifyComponent, selector: "yunzai-notify" }, { kind: "component", type: i15.YunzaiThemBtnComponent, selector: "yunzai-theme-btn", inputs: ["types", "devTips", "deployUrl"] }, { kind: "component", type: i16.YunzaiUserComponent, selector: "yunzai-user" }, { kind: "component", type: i17.LayoutNavApplicationComponent, selector: "layout-nav-application" }, { kind: "component", type: i18.LayoutNavGroupComponent, selector: "layout-nav-group" }, { kind: "component", type: i19.LayoutNavTileComponent, selector: "layout-nav-tile" }, { kind: "pipe", type: i20.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutBasicComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yz-layout-basic`,
                    template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="displayReusetab ? contentTpl : noneTpl">
      <!-- nav -->
      <layout-default-header-item direction="left">
        <ng-container [ngSwitch]="navType">
          <ng-container *ngSwitchCase="NavType.APPLICATION">
            <layout-nav-application />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <layout-nav-group />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <layout-nav-tile />
          </ng-container>
          <ng-container *ngSwitchDefault>
            <layout-nav-application />
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <!-- nav end -->
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-notify />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-theme-btn />
      </layout-default-header-item>
      <!-- setting -->
      <layout-default-header-item direction="right" hidden="mobile">
        <div
          data-event-id="_nav_settings"
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
            <div data-event-id="_nav_mode" nz-menu-item>
              {{ 'mode.nav' | i18n }}
            </div>

            <div
              data-event-id="_nav_mode"
              data-type="application"
              nz-menu-item
              (click)="onNavTypeChange(NavType.APPLICATION)"
            >
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.application' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="group" nz-menu-item (click)="onNavTypeChange(NavType.GROUP)">
              <i nz-icon nzType="group" class="mr-sm"></i>
              {{ 'mode.nav.group' | i18n }}
            </div>
            <div data-event-id="_nav_mode" data-type="tile" nz-menu-item (click)="onNavTypeChange(NavType.TILE)">
              <i nz-icon nzType="appstore" class="mr-sm"></i>
              {{ 'mode.nav.tile' | i18n }}
            </div>
            <div data-event-id="_nav_fullscreen" nz-menu-item>
              <yunzai-fullscreen />
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-clearstorage />
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-i18n />
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-user />
      </layout-default-header-item>
      <!-- setting end -->
    </layout-default>
    <ng-template #asideUserTpl>
      <div
        data-event-id="_route_user"
        nz-dropdown
        nzTrigger="click"
        [nzDropdownMenu]="userMenu"
        class="yunzai-default__aside-user"
      >
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon" />
        <div class="yunzai-default__aside-user-info">
          <strong>{{ aside.name | i18n }}</strong>
          <p class="mb0">{{ aside.intro | i18n }}</p>
        </div>
      </div>
      <nz-dropdown-menu #userMenu="nzDropdownMenu">
        <ul nz-menu>
          <li data-event-id="_route_backhome" nz-menu-item routerLink="/">{{ 'back.home' | i18n }}</li>
        </ul>
      </nz-dropdown-menu>
    </ng-template>
    <ng-template #contentTpl>
      <reuse-tab #reuseTab [ngStyle]="reusetabCSS" />
      <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)" />
    </ng-template>
    <ng-template #noneTpl> <router-outlet /> </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.LayoutDisplayService }, { type: i2.StompService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljL2xheW91dC1iYXNpYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFJMUQsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsR0FBRyxFQUNILFVBQVUsRUFDVixPQUFPLEVBR1Asc0JBQXNCLEVBQ3RCLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzVCLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0dyQixNQUFNLE9BQU8sMEJBQTBCO0lBb0JyQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLElBQUksbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDM0IsbUJBQW1CLEdBQUc7Z0JBQ3BCLEdBQUcsbUJBQW1CO2dCQUN0QixHQUFHLEVBQUUsS0FBSzthQUNYLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8s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QUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOytHQTNJVSwwQkFBMEIsa0ZBd0QzQixNQUFNO21HQXhETCwwQkFBMEIsdURBekczQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVHVDs7NEZBRVUsMEJBQTBCO2tCQTNHdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1R1Q7aUJBQ0Y7OzBCQXlESSxNQUFNOzJCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0b21wU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9zb2NrZXQnO1xuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdE9wdGlvbnMsIExheW91dERpc3BsYXlTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lL2xheW91dC1kZWZhdWx0JztcbmltcG9ydCB7XG4gIFdJTkRPVyxcbiAgaGFzRmF2aWNvbixcbiAgbG9nLFxuICBzZXRGYXZpY29uLFxuICBOYXZUeXBlLFxuICBMYXlvdXRCYXNpY0FzaWRlLFxuICBZdW56YWlQcm9qZWN0SW5mbyxcbiAgdXNlTG9jYWxTdG9yYWdlQ3VycmVudCxcbiAgdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8sXG4gIHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUsXG4gIHVzZUxvY2FsU3RvcmFnZURlZmF1bHRSb3V0ZVxufSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IExheW91dEJhc2ljU3RhdGUgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl6LWxheW91dC1iYXNpY2AsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxheW91dC1kZWZhdWx0IFtvcHRpb25zXT1cIm9wdGlvbnNcIiBbYXNpZGVVc2VyXT1cImFzaWRlVXNlclRwbFwiIFtjb250ZW50XT1cImRpc3BsYXlSZXVzZXRhYiA/IGNvbnRlbnRUcGwgOiBub25lVHBsXCI+XG4gICAgICA8IS0tIG5hdiAtLT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJsZWZ0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm5hdlR5cGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkFQUExJQ0FUSU9OXCI+XG4gICAgICAgICAgICA8bGF5b3V0LW5hdi1hcHBsaWNhdGlvbiAvPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuR1JPVVBcIj5cbiAgICAgICAgICAgIDxsYXlvdXQtbmF2LWdyb3VwIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5USUxFXCI+XG4gICAgICAgICAgICA8bGF5b3V0LW5hdi10aWxlIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgPGxheW91dC1uYXYtYXBwbGljYXRpb24gLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPCEtLSBuYXYgZW5kIC0tPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDx5dW56YWktbm90aWZ5IC8+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDx5dW56YWktdGhlbWUtYnRuIC8+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPCEtLSBzZXR0aW5nIC0tPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9zZXR0aW5nc1wiXG4gICAgICAgICAgbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0tdHJpZ2dlclxuICAgICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgICAgW256RHJvcGRvd25NZW51XT1cInNldHRpbmdzTWVudVwiXG4gICAgICAgICAgbnpUcmlnZ2VyPVwiY2xpY2tcIlxuICAgICAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZXR0aW5nXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI3NldHRpbmdzTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgPGRpdiBuei1tZW51IHN0eWxlPVwid2lkdGg6IDIwMHB4O1wiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYnIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiXG4gICAgICAgICAgICAgIGRhdGEtdHlwZT1cImFwcGxpY2F0aW9uXCJcbiAgICAgICAgICAgICAgbnotbWVudS1pdGVtXG4gICAgICAgICAgICAgIChjbGljayk9XCJvbk5hdlR5cGVDaGFuZ2UoTmF2VHlwZS5BUFBMSUNBVElPTilcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImFwcHN0b3JlXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2LmFwcGxpY2F0aW9uJyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCIgZGF0YS10eXBlPVwiZ3JvdXBcIiBuei1tZW51LWl0ZW0gKGNsaWNrKT1cIm9uTmF2VHlwZUNoYW5nZShOYXZUeXBlLkdST1VQKVwiPlxuICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImdyb3VwXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2Lmdyb3VwJyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCIgZGF0YS10eXBlPVwidGlsZVwiIG56LW1lbnUtaXRlbSAoY2xpY2spPVwib25OYXZUeXBlQ2hhbmdlKE5hdlR5cGUuVElMRSlcIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJhcHBzdG9yZVwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgIHt7ICdtb2RlLm5hdi50aWxlJyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9mdWxsc2NyZWVuXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWZ1bGxzY3JlZW4gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9jbGVhcnN0b3JhZ2VcIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktY2xlYXJzdG9yYWdlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfaTE4blwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1pMThuIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiPlxuICAgICAgICA8eXVuemFpLXVzZXIgLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8IS0tIHNldHRpbmcgZW5kIC0tPlxuICAgIDwvbGF5b3V0LWRlZmF1bHQ+XG4gICAgPG5nLXRlbXBsYXRlICNhc2lkZVVzZXJUcGw+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfcm91dGVfdXNlclwiXG4gICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICAgICAgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlclwiXG4gICAgICA+XG4gICAgICAgIDxuei1hdmF0YXIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1hdmF0YXJcIiBbbnpTcmNdPVwiYXNpZGUuaWNvblwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1pbmZvXCI+XG4gICAgICAgICAgPHN0cm9uZz57eyBhc2lkZS5uYW1lIHwgaTE4biB9fTwvc3Ryb25nPlxuICAgICAgICAgIDxwIGNsYXNzPVwibWIwXCI+e3sgYXNpZGUuaW50cm8gfCBpMThuIH19PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI3VzZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgPHVsIG56LW1lbnU+XG4gICAgICAgICAgPGxpIGRhdGEtZXZlbnQtaWQ9XCJfcm91dGVfYmFja2hvbWVcIiBuei1tZW51LWl0ZW0gcm91dGVyTGluaz1cIi9cIj57eyAnYmFjay5ob21lJyB8IGkxOG4gfX08L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50VHBsPlxuICAgICAgPHJldXNlLXRhYiAjcmV1c2VUYWIgW25nU3R5bGVdPVwicmV1c2V0YWJDU1NcIiAvPlxuICAgICAgPHJvdXRlci1vdXRsZXQgKGFjdGl2YXRlKT1cInJldXNlVGFiLmFjdGl2YXRlKCRldmVudClcIiAoYXR0YWNoKT1cInJldXNlVGFiLmFjdGl2YXRlKCRldmVudClcIiAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNub25lVHBsPiA8cm91dGVyLW91dGxldCAvPiA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dEJhc2ljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIE5hdlR5cGUgPSBOYXZUeXBlO1xuICBwcml2YXRlIHN0YXRlOiBMYXlvdXRCYXNpY1N0YXRlID0ge1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIGxvZ29FeHBhbmRlZDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgLFxuICAgICAgbG9nb0NvbGxhcHNlZDogYC4vYXNzZXRzL2xvZ28uc3ZnYFxuICAgIH0sXG4gICAgYXNpZGU6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgaW50cm86ICcnLFxuICAgICAgaWNvbjogJydcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgIG5hdjogdHJ1ZSxcbiAgICAgIGFzaWRlOiB0cnVlLFxuICAgICAgcmV1c2V0YWI6IHRydWVcbiAgICB9LFxuICAgIG5hdlR5cGU6IE5hdlR5cGUuQVBQTElDQVRJT05cbiAgfTtcblxuICBnZXQgb3B0aW9ucygpOiBMYXlvdXREZWZhdWx0T3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUub3B0aW9ucztcbiAgfVxuXG4gIGdldCBuYXZUeXBlKCk6IE5hdlR5cGUge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm5hdlR5cGU7XG4gIH1cblxuICBnZXQgYXNpZGUoKTogTGF5b3V0QmFzaWNBc2lkZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuYXNpZGU7XG4gIH1cblxuICBnZXQgZGlzcGxheVJldXNldGFiKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmRpc3BsYXkucmV1c2V0YWI7XG4gIH1cblxuICBnZXQgcmV1c2V0YWJDU1MoKTogYW55IHtcbiAgICBsZXQgY2FzY2FkaW5nU3R5bGVTaGVldCA9IHt9O1xuICAgIGlmICghdGhpcy5zdGF0ZS5kaXNwbGF5Lm5hdikge1xuICAgICAgY2FzY2FkaW5nU3R5bGVTaGVldCA9IHtcbiAgICAgICAgLi4uY2FzY2FkaW5nU3R5bGVTaGVldCxcbiAgICAgICAgdG9wOiAnMHB4J1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRpc3BsYXkuYXNpZGUpIHtcbiAgICAgIGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7XG4gICAgICAgIC4uLmNhc2NhZGluZ1N0eWxlU2hlZXQsXG4gICAgICAgIGxlZnQ6ICcyNHB4J1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNhc2NhZGluZ1N0eWxlU2hlZXQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxheW91dERpc3BsYXlTZXJ2aWNlOiBMYXlvdXREaXNwbGF5U2VydmljZSxcbiAgICBwcml2YXRlIHN0b21wU2VydmljZTogU3RvbXBTZXJ2aWNlLFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbjogdHlwZW9mIHdpbmRvd1xuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0TG9nbygpO1xuICAgIHRoaXMuaW5pdEZhdmljb24oKTtcbiAgICB0aGlzLmluaXROYXZUeXBlKCk7XG4gICAgdGhpcy5pbml0QXNpZGUoKTtcbiAgICB0aGlzLmFkZExheW91dERpc3BsYXlMaXN0ZW5lcigpO1xuICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmxpc3RlbigpO1xuICAgIHRoaXMudG9JbmRleCgpO1xuICB9XG5cbiAgaW5pdEZhdmljb24oKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBpZiAocHJvamVjdEluZm8uZmF2aWNvblVybCkge1xuICAgICAgaGFzRmF2aWNvbihwcm9qZWN0SW5mby5mYXZpY29uVXJsKS50aGVuKChoYXM6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGhhcykge1xuICAgICAgICAgIHNldEZhdmljb24ocHJvamVjdEluZm8uZmF2aWNvblVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RmF2aWNvbignLi9hc3NldHMvZmF2aWNvbi5pY28nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEFzaWRlKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldEN1cnJlbnRdID0gdXNlTG9jYWxTdG9yYWdlQ3VycmVudCgpO1xuICAgIGNvbnN0IGFzaWRlOiBMYXlvdXRCYXNpY0FzaWRlID0gZ2V0Q3VycmVudCgpITtcbiAgICB0aGlzLnN0YXRlLmFzaWRlID0geyAuLi5hc2lkZSB9O1xuICB9XG5cbiAgaW5pdExvZ28oKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICB0aGlzLnN0YXRlLm9wdGlvbnMubG9nb0V4cGFuZGVkID0gcHJvamVjdEluZm8ubWF4TG9nb1VybCA/IHByb2plY3RJbmZvLm1heExvZ29VcmwgOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2A7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmxvZ29Db2xsYXBzZWQgPSBwcm9qZWN0SW5mby5taW5pTG9nb1VybCA/IHByb2plY3RJbmZvLm1pbmlMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28uc3ZnYDtcbiAgfVxuXG4gIGluaXROYXZUeXBlKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgbmF2VHlwZTogTmF2VHlwZSB8IG51bGwgPSBnZXRIZWFkZXJUeXBlKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgaWYgKG5hdlR5cGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc3RhdGUubmF2VHlwZSA9IG5hdlR5cGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBmZXRjaGVkTmF2VHlwZTogYW55O1xuICAgIGlmIChwcm9qZWN0SW5mby5oZWFkZXJTdHlsZSAmJiBwcm9qZWN0SW5mby5oZWFkZXJTdHlsZS5sZW5ndGggPiAwKSB7XG4gICAgICBmZXRjaGVkTmF2VHlwZSA9IHByb2plY3RJbmZvLmhlYWRlclN0eWxlLnBvcCgpPy52YWx1ZTtcbiAgICB9XG4gICAgLy8gZGVmYXVsdCB2YWx1ZVxuICAgIGlmICghZmV0Y2hlZE5hdlR5cGUpIHtcbiAgICAgIGZldGNoZWROYXZUeXBlID0gTmF2VHlwZS5BUFBMSUNBVElPTjtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5uYXZUeXBlID0gZmV0Y2hlZE5hdlR5cGU7XG4gIH1cblxuICB0b0luZGV4KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldERlZmF1bHRSb3V0ZV0gPSB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGUoKTtcbiAgICBjb25zdCBkZWZhdWx0Um91dGUgPSBnZXREZWZhdWx0Um91dGUoKSE7XG4gICAgbG9nKCdZdW56YWlMYXlvdXRCYXNpY0NvbXBvbmVudDogJywgYHRvZG86IHRoZSBkZWZhdWx0IHJvdXRlIHdhcyAke2RlZmF1bHRSb3V0ZX0sIOS9huaYr+i/mOayoeaDs+WlveWmguS9leWunueOsC5gKTtcbiAgfVxuXG4gIG9uTmF2VHlwZUNoYW5nZSh0eXBlOiBOYXZUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgW3NldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgIHNldEhlYWRlclR5cGUodHlwZSk7XG4gICAgdGhpcy53aW4ubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBhZGRMYXlvdXREaXNwbGF5TGlzdGVuZXIoKTogdm9pZCB7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ3JldXNlVGFiJywgKGRpc3BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuc3RhdGUuZGlzcGxheS5yZXVzZXRhYiA9IGRpc3BsYXk7XG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ25hdicsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkubmF2ID0gZGlzcGxheTtcbiAgICB9KTtcblxuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdhc2lkZScsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkuYXNpZGUgPSBkaXNwbGF5O1xuICAgIH0pO1xuICB9XG59XG4iXX0=