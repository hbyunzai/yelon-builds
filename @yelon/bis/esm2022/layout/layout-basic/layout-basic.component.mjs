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
            navType: NavType.APPLICATION,
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
            <layout-nav-application></layout-nav-application>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <layout-nav-group></layout-nav-group>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <layout-nav-tile></layout-nav-tile>
          </ng-container>
          <ng-container *ngSwitchDefault>
            <layout-nav-application></layout-nav-application>
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <!-- nav end -->
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-notify></yunzai-notify>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-theme-btn></yunzai-theme-btn>
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
              <yunzai-fullscreen></yunzai-fullscreen>
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-clearstorage></yunzai-clearstorage>
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-i18n></yunzai-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-user></yunzai-user>
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
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon"></nz-avatar>
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
      <reuse-tab #reuseTab [ngStyle]="reusetabCSS"></reuse-tab>
      <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)"></router-outlet>
    </ng-template>
    <ng-template #noneTpl>
      <router-outlet></router-outlet>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i4.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "component", type: i1.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "directive", type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i7.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "directive", type: i7.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i8.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i8.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i10.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "component", type: i11.YunzaiClearStorageComponent, selector: "yunzai-clearstorage" }, { kind: "component", type: i12.YunzaiFullScreenComponent, selector: "yunzai-fullscreen" }, { kind: "component", type: i13.YunzaiI18NComponent, selector: "yunzai-i18n", inputs: ["showLangText"] }, { kind: "component", type: i14.YunzaiNotifyComponent, selector: "yunzai-notify" }, { kind: "component", type: i15.YunzaiThemBtnComponent, selector: "yunzai-theme-btn", inputs: ["types", "devTips", "deployUrl"] }, { kind: "component", type: i16.YunzaiUserComponent, selector: "yunzai-user" }, { kind: "component", type: i17.LayoutNavApplicationComponent, selector: "layout-nav-application" }, { kind: "component", type: i18.LayoutNavGroupComponent, selector: "layout-nav-group" }, { kind: "component", type: i19.LayoutNavTileComponent, selector: "layout-nav-tile" }, { kind: "pipe", type: i20.I18nPipe, name: "i18n" }] }); }
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
            <layout-nav-application></layout-nav-application>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <layout-nav-group></layout-nav-group>
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <layout-nav-tile></layout-nav-tile>
          </ng-container>
          <ng-container *ngSwitchDefault>
            <layout-nav-application></layout-nav-application>
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <!-- nav end -->
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-notify></yunzai-notify>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-theme-btn></yunzai-theme-btn>
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
              <yunzai-fullscreen></yunzai-fullscreen>
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-clearstorage></yunzai-clearstorage>
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-i18n></yunzai-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-user></yunzai-user>
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
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon"></nz-avatar>
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
      <reuse-tab #reuseTab [ngStyle]="reusetabCSS"></reuse-tab>
      <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)"></router-outlet>
    </ng-template>
    <ng-template #noneTpl>
      <router-outlet></router-outlet>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.LayoutDisplayService }, { type: i2.StompService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljL2xheW91dC1iYXNpYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFJM0QsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsR0FBRyxFQUNILFVBQVUsRUFDVixPQUFPLEVBR1Asc0JBQXNCLEVBQ3RCLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzVCLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUhyQixNQUFNLE9BQU8sMEJBQTBCO0lBb0JyQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLElBQUksbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDM0IsbUJBQW1CLEdBQUc7Z0JBQ3BCLEdBQUcsbUJBQW1CO2dCQUN0QixHQUFHLEVBQUUsS0FBSzthQUNYLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDN0IsbUJBQW1CLEdBQUc7Z0JBQ3BCLEdBQUcsbUJBQW1CO2dCQUN0QixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUM7U0FDSDtRQUNELE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVELFlBQ1Usb0JBQTBDLEVBQzFDLFlBQTBCLEVBQ1YsR0FBa0I7UUFGbEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNWLFFBQUcsR0FBSCxHQUFHLENBQWU7UUF2RHJDLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFDakIsVUFBSyxHQUFxQjtZQUNoQyxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLHdCQUF3QjtnQkFDdEMsYUFBYSxFQUFFLG1CQUFtQjthQUNuQztZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsRUFBRTtnQkFDUixLQUFLLEVBQUUsRUFBRTtnQkFDVCxJQUFJLEVBQUUsRUFBRTthQUNUO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxJQUFJO2dCQUNULEtBQUssRUFBRSxJQUFJO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2FBQ2Y7WUFDRCxPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVc7U0FDN0IsQ0FBQztJQXVDQyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLDBCQUEwQixFQUFFLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQXNCLGNBQWMsRUFBRyxDQUFDO1FBQ3pELElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUMxQixVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO2dCQUN2RCxJQUFJLEdBQUcsRUFBRTtvQkFDUCxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNwQztxQkFBTTtvQkFDTCxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztpQkFDcEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCxNQUFNLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hELE1BQU0sS0FBSyxHQUFxQixVQUFVLEVBQUcsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFzQixjQUFjLEVBQUcsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUM7UUFDN0csSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0lBQzdHLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDLEdBQUcseUJBQXlCLEVBQUUsQ0FBQztRQUN0RCxNQUFNLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO1FBQ3hELE1BQU0sT0FBTyxHQUFtQixhQUFhLEVBQUUsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBc0IsY0FBYyxFQUFHLENBQUM7UUFDekQsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM3QixPQUFPO1NBQ1I7UUFDRCxJQUFJLGNBQW1CLENBQUM7UUFDeEIsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRSxjQUFjLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUM7U0FDdkQ7UUFDRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQixjQUFjLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sQ0FBQyxFQUFFLGVBQWUsQ0FBQyxHQUFHLDJCQUEyQixFQUFFLENBQUM7UUFDMUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxFQUFHLENBQUM7UUFDeEMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLCtCQUErQixZQUFZLGVBQWUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBYTtRQUMzQixNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcseUJBQXlCLEVBQUUsQ0FBQztRQUNwRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHdCQUF3QjtRQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRTtZQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOytHQTNJVSwwQkFBMEIsa0ZBd0QzQixNQUFNO21HQXhETCwwQkFBMEIsdURBM0czQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUdUOzs0RkFFVSwwQkFBMEI7a0JBN0d0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUdUO2lCQUNGOzswQkF5REksTUFBTTsyQkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsICBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3RvbXBTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3NvY2tldCc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0T3B0aW9ucywgTGF5b3V0RGlzcGxheVNlcnZpY2UgfSBmcm9tICdAeWVsb24vdGhlbWUvbGF5b3V0LWRlZmF1bHQnO1xuaW1wb3J0IHtcbiAgV0lORE9XLFxuICBoYXNGYXZpY29uLFxuICBsb2csXG4gIHNldEZhdmljb24sXG4gIE5hdlR5cGUsXG4gIExheW91dEJhc2ljQXNpZGUsXG4gIFl1bnphaVByb2plY3RJbmZvLFxuICB1c2VMb2NhbFN0b3JhZ2VDdXJyZW50LFxuICB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbyxcbiAgdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSxcbiAgdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgTGF5b3V0QmFzaWNTdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXotbGF5b3V0LWJhc2ljYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGF5b3V0LWRlZmF1bHQgW29wdGlvbnNdPVwib3B0aW9uc1wiIFthc2lkZVVzZXJdPVwiYXNpZGVVc2VyVHBsXCIgW2NvbnRlbnRdPVwiZGlzcGxheVJldXNldGFiID8gY29udGVudFRwbCA6IG5vbmVUcGxcIj5cbiAgICAgIDwhLS0gbmF2IC0tPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cImxlZnRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibmF2VHlwZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuQVBQTElDQVRJT05cIj5cbiAgICAgICAgICAgIDxsYXlvdXQtbmF2LWFwcGxpY2F0aW9uPjwvbGF5b3V0LW5hdi1hcHBsaWNhdGlvbj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkdST1VQXCI+XG4gICAgICAgICAgICA8bGF5b3V0LW5hdi1ncm91cD48L2xheW91dC1uYXYtZ3JvdXA+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5USUxFXCI+XG4gICAgICAgICAgICA8bGF5b3V0LW5hdi10aWxlPjwvbGF5b3V0LW5hdi10aWxlPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgICAgIDxsYXlvdXQtbmF2LWFwcGxpY2F0aW9uPjwvbGF5b3V0LW5hdi1hcHBsaWNhdGlvbj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPCEtLSBuYXYgZW5kIC0tPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDx5dW56YWktbm90aWZ5PjwveXVuemFpLW5vdGlmeT5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHl1bnphaS10aGVtZS1idG4+PC95dW56YWktdGhlbWUtYnRuPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDwhLS0gc2V0dGluZyAtLT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfc2V0dGluZ3NcIlxuICAgICAgICAgIGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtLXRyaWdnZXJcbiAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJzZXR0aW5nc01lbnVcIlxuICAgICAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2V0dGluZ1wiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuei1kcm9wZG93bi1tZW51ICNzZXR0aW5nc01lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgIDxkaXYgbnotbWVudSBzdHlsZT1cIndpZHRoOiAyMDBweDtcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2JyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIlxuICAgICAgICAgICAgICBkYXRhLXR5cGU9XCJhcHBsaWNhdGlvblwiXG4gICAgICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICAgICAoY2xpY2spPVwib25OYXZUeXBlQ2hhbmdlKE5hdlR5cGUuQVBQTElDQVRJT04pXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJhcHBzdG9yZVwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgIHt7ICdtb2RlLm5hdi5hcHBsaWNhdGlvbicgfCBpMThuIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiIGRhdGEtdHlwZT1cImdyb3VwXCIgbnotbWVudS1pdGVtIChjbGljayk9XCJvbk5hdlR5cGVDaGFuZ2UoTmF2VHlwZS5HUk9VUClcIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJncm91cFwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgIHt7ICdtb2RlLm5hdi5ncm91cCcgfCBpMThuIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiIGRhdGEtdHlwZT1cInRpbGVcIiBuei1tZW51LWl0ZW0gKGNsaWNrKT1cIm9uTmF2VHlwZUNoYW5nZShOYXZUeXBlLlRJTEUpXCI+XG4gICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYXBwc3RvcmVcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYudGlsZScgfCBpMThuIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfZnVsbHNjcmVlblwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1mdWxsc2NyZWVuPjwveXVuemFpLWZ1bGxzY3JlZW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfY2xlYXJzdG9yYWdlXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWNsZWFyc3RvcmFnZT48L3l1bnphaS1jbGVhcnN0b3JhZ2U+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfaTE4blwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1pMThuPjwveXVuemFpLWkxOG4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiPlxuICAgICAgICA8eXVuemFpLXVzZXI+PC95dW56YWktdXNlcj5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8IS0tIHNldHRpbmcgZW5kIC0tPlxuICAgIDwvbGF5b3V0LWRlZmF1bHQ+XG4gICAgPG5nLXRlbXBsYXRlICNhc2lkZVVzZXJUcGw+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfcm91dGVfdXNlclwiXG4gICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICAgICAgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlclwiXG4gICAgICA+XG4gICAgICAgIDxuei1hdmF0YXIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1hdmF0YXJcIiBbbnpTcmNdPVwiYXNpZGUuaWNvblwiPjwvbnotYXZhdGFyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLXVzZXItaW5mb1wiPlxuICAgICAgICAgIDxzdHJvbmc+e3sgYXNpZGUubmFtZSB8IGkxOG4gfX08L3N0cm9uZz5cbiAgICAgICAgICA8cCBjbGFzcz1cIm1iMFwiPnt7IGFzaWRlLmludHJvIHwgaTE4biB9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgIDxsaSBkYXRhLWV2ZW50LWlkPVwiX3JvdXRlX2JhY2tob21lXCIgbnotbWVudS1pdGVtIHJvdXRlckxpbms9XCIvXCI+e3sgJ2JhY2suaG9tZScgfCBpMThuIH19PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRwbD5cbiAgICAgIDxyZXVzZS10YWIgI3JldXNlVGFiIFtuZ1N0eWxlXT1cInJldXNldGFiQ1NTXCI+PC9yZXVzZS10YWI+XG4gICAgICA8cm91dGVyLW91dGxldCAoYWN0aXZhdGUpPVwicmV1c2VUYWIuYWN0aXZhdGUoJGV2ZW50KVwiIChhdHRhY2gpPVwicmV1c2VUYWIuYWN0aXZhdGUoJGV2ZW50KVwiPjwvcm91dGVyLW91dGxldD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjbm9uZVRwbD5cbiAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dEJhc2ljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIE5hdlR5cGUgPSBOYXZUeXBlO1xuICBwcml2YXRlIHN0YXRlOiBMYXlvdXRCYXNpY1N0YXRlID0ge1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIGxvZ29FeHBhbmRlZDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgLFxuICAgICAgbG9nb0NvbGxhcHNlZDogYC4vYXNzZXRzL2xvZ28uc3ZnYFxuICAgIH0sXG4gICAgYXNpZGU6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgaW50cm86ICcnLFxuICAgICAgaWNvbjogJydcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgIG5hdjogdHJ1ZSxcbiAgICAgIGFzaWRlOiB0cnVlLFxuICAgICAgcmV1c2V0YWI6IHRydWVcbiAgICB9LFxuICAgIG5hdlR5cGU6IE5hdlR5cGUuQVBQTElDQVRJT04sXG4gIH07XG5cbiAgZ2V0IG9wdGlvbnMoKTogTGF5b3V0RGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm9wdGlvbnM7XG4gIH1cblxuICBnZXQgbmF2VHlwZSgpOiBOYXZUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5uYXZUeXBlO1xuICB9XG5cbiAgZ2V0IGFzaWRlKCk6IExheW91dEJhc2ljQXNpZGUge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFzaWRlO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlSZXVzZXRhYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5kaXNwbGF5LnJldXNldGFiO1xuICB9XG5cbiAgZ2V0IHJldXNldGFiQ1NTKCk6IGFueSB7XG4gICAgbGV0IGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7fTtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZGlzcGxheS5uYXYpIHtcbiAgICAgIGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7XG4gICAgICAgIC4uLmNhc2NhZGluZ1N0eWxlU2hlZXQsXG4gICAgICAgIHRvcDogJzBweCdcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghdGhpcy5zdGF0ZS5kaXNwbGF5LmFzaWRlKSB7XG4gICAgICBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge1xuICAgICAgICAuLi5jYXNjYWRpbmdTdHlsZVNoZWV0LFxuICAgICAgICBsZWZ0OiAnMjRweCdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjYXNjYWRpbmdTdHlsZVNoZWV0O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsYXlvdXREaXNwbGF5U2VydmljZTogTGF5b3V0RGlzcGxheVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFN0b21wU2VydmljZSxcbiAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW46IHR5cGVvZiB3aW5kb3dcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdExvZ28oKTtcbiAgICB0aGlzLmluaXRGYXZpY29uKCk7XG4gICAgdGhpcy5pbml0TmF2VHlwZSgpO1xuICAgIHRoaXMuaW5pdEFzaWRlKCk7XG4gICAgdGhpcy5hZGRMYXlvdXREaXNwbGF5TGlzdGVuZXIoKTtcbiAgICB0aGlzLnN0b21wU2VydmljZS5saXN0ZW4oKTtcbiAgICB0aGlzLnRvSW5kZXgoKTtcbiAgfVxuXG4gIGluaXRGYXZpY29uKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgaWYgKHByb2plY3RJbmZvLmZhdmljb25VcmwpIHtcbiAgICAgIGhhc0Zhdmljb24ocHJvamVjdEluZm8uZmF2aWNvblVybCkudGhlbigoaGFzOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChoYXMpIHtcbiAgICAgICAgICBzZXRGYXZpY29uKHByb2plY3RJbmZvLmZhdmljb25VcmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEZhdmljb24oJy4vYXNzZXRzL2Zhdmljb24uaWNvJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRBc2lkZSgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRDdXJyZW50XSA9IHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQoKTtcbiAgICBjb25zdCBhc2lkZTogTGF5b3V0QmFzaWNBc2lkZSA9IGdldEN1cnJlbnQoKSE7XG4gICAgdGhpcy5zdGF0ZS5hc2lkZSA9IHsgLi4uYXNpZGUgfTtcbiAgfVxuXG4gIGluaXRMb2dvKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmxvZ29FeHBhbmRlZCA9IHByb2plY3RJbmZvLm1heExvZ29VcmwgPyBwcm9qZWN0SW5mby5tYXhMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgO1xuICAgIHRoaXMuc3RhdGUub3B0aW9ucy5sb2dvQ29sbGFwc2VkID0gcHJvamVjdEluZm8ubWluaUxvZ29VcmwgPyBwcm9qZWN0SW5mby5taW5pTG9nb1VybCA6IGAuL2Fzc2V0cy9sb2dvLnN2Z2A7XG4gIH1cblxuICBpbml0TmF2VHlwZSgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRIZWFkZXJUeXBlXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUoKTtcbiAgICBjb25zdCBbLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIGNvbnN0IG5hdlR5cGU6IE5hdlR5cGUgfCBudWxsID0gZ2V0SGVhZGVyVHlwZSgpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvOiBZdW56YWlQcm9qZWN0SW5mbyA9IGdldFByb2plY3RJbmZvKCkhO1xuICAgIGlmIChuYXZUeXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSBuYXZUeXBlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZmV0Y2hlZE5hdlR5cGU6IGFueTtcbiAgICBpZiAocHJvamVjdEluZm8uaGVhZGVyU3R5bGUgJiYgcHJvamVjdEluZm8uaGVhZGVyU3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgZmV0Y2hlZE5hdlR5cGUgPSBwcm9qZWN0SW5mby5oZWFkZXJTdHlsZS5wb3AoKT8udmFsdWU7XG4gICAgfVxuICAgIC8vIGRlZmF1bHQgdmFsdWVcbiAgICBpZiAoIWZldGNoZWROYXZUeXBlKSB7XG4gICAgICBmZXRjaGVkTmF2VHlwZSA9IE5hdlR5cGUuQVBQTElDQVRJT047XG4gICAgfVxuICAgIHRoaXMuc3RhdGUubmF2VHlwZSA9IGZldGNoZWROYXZUeXBlO1xuICB9XG5cbiAgdG9JbmRleCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXREZWZhdWx0Um91dGVdID0gdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlKCk7XG4gICAgY29uc3QgZGVmYXVsdFJvdXRlID0gZ2V0RGVmYXVsdFJvdXRlKCkhO1xuICAgIGxvZygnWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnQ6ICcsIGB0b2RvOiB0aGUgZGVmYXVsdCByb3V0ZSB3YXMgJHtkZWZhdWx0Um91dGV9LCDkvYbmmK/ov5jmsqHmg7Plpb3lpoLkvZXlrp7njrAuYCk7XG4gIH1cblxuICBvbk5hdlR5cGVDaGFuZ2UodHlwZTogTmF2VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IFtzZXRIZWFkZXJUeXBlXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUoKTtcbiAgICBzZXRIZWFkZXJUeXBlKHR5cGUpO1xuICAgIHRoaXMud2luLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgYWRkTGF5b3V0RGlzcGxheUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdyZXVzZVRhYicsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkucmV1c2V0YWIgPSBkaXNwbGF5O1xuICAgIH0pO1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCduYXYnLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5Lm5hdiA9IGRpc3BsYXk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbignYXNpZGUnLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5LmFzaWRlID0gZGlzcGxheTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=