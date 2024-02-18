import { Component, Inject } from '@angular/core';
import { WINDOW, hasFavicon, log, setFavicon, NavType, useLocalStorageCurrent, useLocalStorageProjectInfo, useLocalStorageHeaderType, useLocalStorageDefaultRoute } from '@yelon/util';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme/layout-default";
import * as i2 from "@yelon/socket";
import * as i3 from "@angular/router";
import * as i4 from "@yelon/abc/reuse-tab";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/menu";
import * as i7 from "ng-zorro-antd/dropdown";
import * as i8 from "ng-zorro-antd/avatar";
import * as i9 from "ng-zorro-antd/icon";
import * as i10 from "../widgets/yunzai-clear-storage.component";
import * as i11 from "../widgets/yunzai-fullscreen.component";
import * as i12 from "../widgets/yunzai-i18n.component";
import * as i13 from "../widgets/yunzai-notify.component";
import * as i14 from "../widgets/yunzai-theme-btn.component";
import * as i15 from "../widgets/yunzai-user.component";
import * as i16 from "../layout-nav/layout-nav-application.component";
import * as i17 from "../layout-nav/layout-nav-group.component";
import * as i18 from "../layout-nav/layout-nav-tile.component";
import * as i19 from "@yelon/theme";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [{ token: i1.LayoutDisplayService }, { token: i2.StompService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiLayoutBasicComponent, selector: "yz-layout-basic", ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "component", type: i1.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "directive", type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i5.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i6.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i6.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i7.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i7.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "component", type: i8.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "directive", type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i10.YunzaiClearStorageComponent, selector: "yunzai-clearstorage" }, { kind: "component", type: i11.YunzaiFullScreenComponent, selector: "yunzai-fullscreen" }, { kind: "component", type: i12.YunzaiI18NComponent, selector: "yunzai-i18n", inputs: ["showLangText"] }, { kind: "component", type: i13.YunzaiNotifyComponent, selector: "yunzai-notify" }, { kind: "component", type: i14.YunzaiThemeBtnComponent, selector: "yunzai-theme-btn", inputs: ["types", "devTips", "deployUrl"] }, { kind: "component", type: i15.YunzaiUserComponent, selector: "yunzai-user" }, { kind: "component", type: i16.LayoutNavApplicationComponent, selector: "layout-nav-application" }, { kind: "component", type: i17.LayoutNavGroupComponent, selector: "layout-nav-group" }, { kind: "component", type: i18.LayoutNavTileComponent, selector: "layout-nav-tile" }, { kind: "pipe", type: i19.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutBasicComponent, decorators: [{
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
        }], ctorParameters: () => [{ type: i1.LayoutDisplayService }, { type: i2.StompService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljL2xheW91dC1iYXNpYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFJMUQsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsR0FBRyxFQUNILFVBQVUsRUFDVixPQUFPLEVBR1Asc0JBQXNCLEVBQ3RCLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzVCLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnSHJCLE1BQU0sT0FBTywwQkFBMEI7SUFvQnJDLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsSUFBSSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVCLG1CQUFtQixHQUFHO2dCQUNwQixHQUFHLG1CQUFtQjtnQkFDdEIsR0FBRyxFQUFFLEtBQUs7YUFDWCxDQUFDO1FBQ0osQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxD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QUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7WUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0EzSVUsMEJBQTBCLGtGQXdEM0IsTUFBTTtrR0F4REwsMEJBQTBCLHVEQXpHM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1R1Q7OzJGQUVVLDBCQUEwQjtrQkEzR3RDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUdUO2lCQUNGOzswQkF5REksTUFBTTsyQkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdG9tcFNlcnZpY2UgfSBmcm9tICdAeWVsb24vc29ja2V0JztcbmltcG9ydCB7IExheW91dERlZmF1bHRPcHRpb25zLCBMYXlvdXREaXNwbGF5U2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZS9sYXlvdXQtZGVmYXVsdCc7XG5pbXBvcnQge1xuICBXSU5ET1csXG4gIGhhc0Zhdmljb24sXG4gIGxvZyxcbiAgc2V0RmF2aWNvbixcbiAgTmF2VHlwZSxcbiAgTGF5b3V0QmFzaWNBc2lkZSxcbiAgWXVuemFpUHJvamVjdEluZm8sXG4gIHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQsXG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXJUeXBlLFxuICB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGVcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTGF5b3V0QmFzaWNTdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXotbGF5b3V0LWJhc2ljYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGF5b3V0LWRlZmF1bHQgW29wdGlvbnNdPVwib3B0aW9uc1wiIFthc2lkZVVzZXJdPVwiYXNpZGVVc2VyVHBsXCIgW2NvbnRlbnRdPVwiZGlzcGxheVJldXNldGFiID8gY29udGVudFRwbCA6IG5vbmVUcGxcIj5cbiAgICAgIDwhLS0gbmF2IC0tPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cImxlZnRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibmF2VHlwZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuQVBQTElDQVRJT05cIj5cbiAgICAgICAgICAgIDxsYXlvdXQtbmF2LWFwcGxpY2F0aW9uIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5HUk9VUFwiPlxuICAgICAgICAgICAgPGxheW91dC1uYXYtZ3JvdXAgLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLlRJTEVcIj5cbiAgICAgICAgICAgIDxsYXlvdXQtbmF2LXRpbGUgLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgICA8bGF5b3V0LW5hdi1hcHBsaWNhdGlvbiAvPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8IS0tIG5hdiBlbmQgLS0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHl1bnphaS1ub3RpZnkgLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHl1bnphaS10aGVtZS1idG4gLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8IS0tIHNldHRpbmcgLS0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3NldHRpbmdzXCJcbiAgICAgICAgICBsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbS10cmlnZ2VyXG4gICAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwic2V0dGluZ3NNZW51XCJcbiAgICAgICAgICBuelRyaWdnZXI9XCJjbGlja1wiXG4gICAgICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cInNldHRpbmdcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjc2V0dGluZ3NNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgICA8ZGl2IG56LW1lbnUgc3R5bGU9XCJ3aWR0aDogMjAwcHg7XCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIHt7ICdtb2RlLm5hdicgfCBpMThuIH19XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCJcbiAgICAgICAgICAgICAgZGF0YS10eXBlPVwiYXBwbGljYXRpb25cIlxuICAgICAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uTmF2VHlwZUNoYW5nZShOYXZUeXBlLkFQUExJQ0FUSU9OKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYXBwc3RvcmVcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYuYXBwbGljYXRpb24nIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIiBkYXRhLXR5cGU9XCJncm91cFwiIG56LW1lbnUtaXRlbSAoY2xpY2spPVwib25OYXZUeXBlQ2hhbmdlKE5hdlR5cGUuR1JPVVApXCI+XG4gICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZ3JvdXBcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYuZ3JvdXAnIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIiBkYXRhLXR5cGU9XCJ0aWxlXCIgbnotbWVudS1pdGVtIChjbGljayk9XCJvbk5hdlR5cGVDaGFuZ2UoTmF2VHlwZS5USUxFKVwiPlxuICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImFwcHN0b3JlXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2LnRpbGUnIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2Z1bGxzY3JlZW5cIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktZnVsbHNjcmVlbiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2NsZWFyc3RvcmFnZVwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1jbGVhcnN0b3JhZ2UgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9pMThuXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWkxOG4gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgIDx5dW56YWktdXNlciAvPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDwhLS0gc2V0dGluZyBlbmQgLS0+XG4gICAgPC9sYXlvdXQtZGVmYXVsdD5cbiAgICA8bmctdGVtcGxhdGUgI2FzaWRlVXNlclRwbD5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9yb3V0ZV91c2VyXCJcbiAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgbnpUcmlnZ2VyPVwiY2xpY2tcIlxuICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwidXNlck1lbnVcIlxuICAgICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyXCJcbiAgICAgID5cbiAgICAgICAgPG56LWF2YXRhciBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWF2YXRhclwiIFtuelNyY109XCJhc2lkZS5pY29uXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWluZm9cIj5cbiAgICAgICAgICA8c3Ryb25nPnt7IGFzaWRlLm5hbWUgfCBpMThuIH19PC9zdHJvbmc+XG4gICAgICAgICAgPHAgY2xhc3M9XCJtYjBcIj57eyBhc2lkZS5pbnRybyB8IGkxOG4gfX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bnotZHJvcGRvd24tbWVudSAjdXNlck1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8dWwgbnotbWVudT5cbiAgICAgICAgICA8bGkgZGF0YS1ldmVudC1pZD1cIl9yb3V0ZV9iYWNraG9tZVwiIG56LW1lbnUtaXRlbSByb3V0ZXJMaW5rPVwiL1wiPnt7ICdiYWNrLmhvbWUnIHwgaTE4biB9fTwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUcGw+XG4gICAgICA8cmV1c2UtdGFiICNyZXVzZVRhYiBbbmdTdHlsZV09XCJyZXVzZXRhYkNTU1wiIC8+XG4gICAgICA8cm91dGVyLW91dGxldCAoYWN0aXZhdGUpPVwicmV1c2VUYWIuYWN0aXZhdGUoJGV2ZW50KVwiIChhdHRhY2gpPVwicmV1c2VUYWIuYWN0aXZhdGUoJGV2ZW50KVwiIC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI25vbmVUcGw+IDxyb3V0ZXItb3V0bGV0IC8+IDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgTmF2VHlwZSA9IE5hdlR5cGU7XG4gIHByaXZhdGUgc3RhdGU6IExheW91dEJhc2ljU3RhdGUgPSB7XG4gICAgb3B0aW9uczoge1xuICAgICAgbG9nb0V4cGFuZGVkOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2AsXG4gICAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgXG4gICAgfSxcbiAgICBhc2lkZToge1xuICAgICAgbmFtZTogJycsXG4gICAgICBpbnRybzogJycsXG4gICAgICBpY29uOiAnJ1xuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgbmF2OiB0cnVlLFxuICAgICAgYXNpZGU6IHRydWUsXG4gICAgICByZXVzZXRhYjogdHJ1ZVxuICAgIH0sXG4gICAgbmF2VHlwZTogTmF2VHlwZS5BUFBMSUNBVElPTlxuICB9O1xuXG4gIGdldCBvcHRpb25zKCk6IExheW91dERlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5vcHRpb25zO1xuICB9XG5cbiAgZ2V0IG5hdlR5cGUoKTogTmF2VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubmF2VHlwZTtcbiAgfVxuXG4gIGdldCBhc2lkZSgpOiBMYXlvdXRCYXNpY0FzaWRlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5hc2lkZTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5UmV1c2V0YWIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzcGxheS5yZXVzZXRhYjtcbiAgfVxuXG4gIGdldCByZXVzZXRhYkNTUygpOiBOelNhZmVBbnkge1xuICAgIGxldCBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge307XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRpc3BsYXkubmF2KSB7XG4gICAgICBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge1xuICAgICAgICAuLi5jYXNjYWRpbmdTdHlsZVNoZWV0LFxuICAgICAgICB0b3A6ICcwcHgnXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc3RhdGUuZGlzcGxheS5hc2lkZSkge1xuICAgICAgY2FzY2FkaW5nU3R5bGVTaGVldCA9IHtcbiAgICAgICAgLi4uY2FzY2FkaW5nU3R5bGVTaGVldCxcbiAgICAgICAgbGVmdDogJzI0cHgnXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2FzY2FkaW5nU3R5bGVTaGVldDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbGF5b3V0RGlzcGxheVNlcnZpY2U6IExheW91dERpc3BsYXlTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RvbXBTZXJ2aWNlOiBTdG9tcFNlcnZpY2UsXG4gICAgQEluamVjdChXSU5ET1cpIHByaXZhdGUgd2luOiB0eXBlb2Ygd2luZG93XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRMb2dvKCk7XG4gICAgdGhpcy5pbml0RmF2aWNvbigpO1xuICAgIHRoaXMuaW5pdE5hdlR5cGUoKTtcbiAgICB0aGlzLmluaXRBc2lkZSgpO1xuICAgIHRoaXMuYWRkTGF5b3V0RGlzcGxheUxpc3RlbmVyKCk7XG4gICAgdGhpcy5zdG9tcFNlcnZpY2UubGlzdGVuKCk7XG4gICAgdGhpcy50b0luZGV4KCk7XG4gIH1cblxuICBpbml0RmF2aWNvbigpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvOiBZdW56YWlQcm9qZWN0SW5mbyA9IGdldFByb2plY3RJbmZvKCkhO1xuICAgIGlmIChwcm9qZWN0SW5mby5mYXZpY29uVXJsKSB7XG4gICAgICBoYXNGYXZpY29uKHByb2plY3RJbmZvLmZhdmljb25VcmwpLnRoZW4oKGhhczogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoaGFzKSB7XG4gICAgICAgICAgc2V0RmF2aWNvbihwcm9qZWN0SW5mby5mYXZpY29uVXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRGYXZpY29uKCcuL2Fzc2V0cy9mYXZpY29uLmljbycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0QXNpZGUoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0Q3VycmVudF0gPSB1c2VMb2NhbFN0b3JhZ2VDdXJyZW50KCk7XG4gICAgY29uc3QgYXNpZGU6IExheW91dEJhc2ljQXNpZGUgPSBnZXRDdXJyZW50KCkhO1xuICAgIHRoaXMuc3RhdGUuYXNpZGUgPSB7IC4uLmFzaWRlIH07XG4gIH1cblxuICBpbml0TG9nbygpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvOiBZdW56YWlQcm9qZWN0SW5mbyA9IGdldFByb2plY3RJbmZvKCkhO1xuICAgIHRoaXMuc3RhdGUub3B0aW9ucy5sb2dvRXhwYW5kZWQgPSBwcm9qZWN0SW5mby5tYXhMb2dvVXJsID8gcHJvamVjdEluZm8ubWF4TG9nb1VybCA6IGAuL2Fzc2V0cy9sb2dvLWZ1bGwuc3ZnYDtcbiAgICB0aGlzLnN0YXRlLm9wdGlvbnMubG9nb0NvbGxhcHNlZCA9IHByb2plY3RJbmZvLm1pbmlMb2dvVXJsID8gcHJvamVjdEluZm8ubWluaUxvZ29VcmwgOiBgLi9hc3NldHMvbG9nby5zdmdgO1xuICB9XG5cbiAgaW5pdE5hdlR5cGUoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0SGVhZGVyVHlwZV0gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXJUeXBlKCk7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBuYXZUeXBlOiBOYXZUeXBlIHwgbnVsbCA9IGdldEhlYWRlclR5cGUoKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBpZiAobmF2VHlwZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdGF0ZS5uYXZUeXBlID0gbmF2VHlwZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGZldGNoZWROYXZUeXBlOiBOelNhZmVBbnk7XG4gICAgaWYgKHByb2plY3RJbmZvLmhlYWRlclN0eWxlICYmIHByb2plY3RJbmZvLmhlYWRlclN0eWxlLmxlbmd0aCA+IDApIHtcbiAgICAgIGZldGNoZWROYXZUeXBlID0gcHJvamVjdEluZm8uaGVhZGVyU3R5bGUucG9wKCk/LnZhbHVlO1xuICAgIH1cbiAgICAvLyBkZWZhdWx0IHZhbHVlXG4gICAgaWYgKCFmZXRjaGVkTmF2VHlwZSkge1xuICAgICAgZmV0Y2hlZE5hdlR5cGUgPSBOYXZUeXBlLkFQUExJQ0FUSU9OO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSBmZXRjaGVkTmF2VHlwZTtcbiAgfVxuXG4gIHRvSW5kZXgoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0RGVmYXVsdFJvdXRlXSA9IHVzZUxvY2FsU3RvcmFnZURlZmF1bHRSb3V0ZSgpO1xuICAgIGNvbnN0IGRlZmF1bHRSb3V0ZSA9IGdldERlZmF1bHRSb3V0ZSgpITtcbiAgICBsb2coJ1l1bnphaUxheW91dEJhc2ljQ29tcG9uZW50OiAnLCBgdG9kbzogdGhlIGRlZmF1bHQgcm91dGUgd2FzICR7ZGVmYXVsdFJvdXRlfSwg5L2G5piv6L+Y5rKh5oOz5aW95aaC5L2V5a6e546wLmApO1xuICB9XG5cbiAgb25OYXZUeXBlQ2hhbmdlKHR5cGU6IE5hdlR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBbc2V0SGVhZGVyVHlwZV0gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXJUeXBlKCk7XG4gICAgc2V0SGVhZGVyVHlwZSh0eXBlKTtcbiAgICB0aGlzLndpbi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIGFkZExheW91dERpc3BsYXlMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbigncmV1c2VUYWInLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5LnJldXNldGFiID0gZGlzcGxheTtcbiAgICB9KTtcbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbignbmF2JywgKGRpc3BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuc3RhdGUuZGlzcGxheS5uYXYgPSBkaXNwbGF5O1xuICAgIH0pO1xuXG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ2FzaWRlJywgKGRpc3BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuc3RhdGUuZGlzcGxheS5hc2lkZSA9IGRpc3BsYXk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==