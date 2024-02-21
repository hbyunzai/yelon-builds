import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReuseTabModule } from '@yelon/abc/reuse-tab';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';
import { StompService } from '@yelon/socket';
import { I18nPipe } from '@yelon/theme';
import { LayoutDefaultModule, LayoutDisplayService } from '@yelon/theme/layout-default';
import { ThemeBtnModule } from '@yelon/theme/theme-btn';
import { hasFavicon, log, NavType, setFavicon, useLocalStorageCurrent, useLocalStorageDefaultRoute, useLocalStorageHeaderType, useLocalStorageProjectInfo, WINDOW } from '@yelon/util';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { YunzaiNavApplicationComponent } from './layout-nav-application.component';
import { YunzaiLayoutNavGroupComponent } from './layout-nav-group.component';
import { YunzaiLayoutNavTileComponent } from './layout-nav-tile.component';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme/layout-default";
import * as i2 from "@angular/router";
import * as i3 from "@yelon/abc/reuse-tab";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/menu";
import * as i6 from "ng-zorro-antd/dropdown";
import * as i7 from "ng-zorro-antd/avatar";
import * as i8 from "ng-zorro-antd/icon";
import * as i9 from "@yelon/theme/theme-btn";
import * as i10 from "@yelon/bis/yunzai-widgets";
export class YunzaiLayoutBasicComponent {
    constructor() {
        this.stomp = inject(StompService);
        this.win = inject(WINDOW);
        this.layoutDisplayService = inject(LayoutDisplayService);
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
    ngOnInit() {
        this.initLogo();
        this.initFavicon();
        this.initNavType();
        this.initAside();
        this.addLayoutDisplayListener();
        this.stomp.listen();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiLayoutBasicComponent, isStandalone: true, selector: "yunzai-layout-basic", ngImport: i0, template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="displayReusetab ? contentTpl : noneTpl">
      <layout-default-header-item direction="left">
        <ng-container [ngSwitch]="navType">
          <ng-container *ngSwitchCase="NavType.APPLICATION">
            <yunzai-layout-nav-application />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <yunzai-layout-nav-group />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <yunzai-layout-nav-tile />
          </ng-container>
          <ng-container *ngSwitchDefault>
            <yunzai-layout-nav-application />
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-header-notify />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <theme-btn />
      </layout-default-header-item>
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
              <yunzai-header-fullscreen />
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-header-clear-storage />
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-header-i18n />
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-header-user />
      </layout-default-header-item>
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: LayoutDefaultModule }, { kind: "component", type: i1.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: ReuseTabModule }, { kind: "component", type: i3.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i5.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i6.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i6.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i7.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: ThemeBtnModule }, { kind: "component", type: i9.ThemeBtnComponent, selector: "theme-btn", inputs: ["types", "devTips", "deployUrl"], outputs: ["themeChange"] }, { kind: "ngmodule", type: YunzaiWidgetsModule }, { kind: "component", type: i10.YunzaiHeaderClearStorageComponent, selector: "yunzai-header-clear-storage" }, { kind: "component", type: i10.YunzaiHeaderFullScreenComponent, selector: "yunzai-header-fullscreen" }, { kind: "component", type: i10.YunzaiHeaderNotifyComponent, selector: "yunzai-header-notify" }, { kind: "component", type: i10.YunzaiHeaderI18nComponent, selector: "yunzai-header-i18n", inputs: ["showLangText"] }, { kind: "component", type: i10.YunzaiHeaderUserComponent, selector: "yunzai-header-user" }, { kind: "component", type: YunzaiNavApplicationComponent, selector: "yunzai-layout-nav-application" }, { kind: "component", type: YunzaiLayoutNavGroupComponent, selector: "yunzai-layout-nav-group" }, { kind: "component", type: YunzaiLayoutNavTileComponent, selector: "yunzai-layout-nav-tile" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutBasicComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-layout-basic`,
                    template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="displayReusetab ? contentTpl : noneTpl">
      <layout-default-header-item direction="left">
        <ng-container [ngSwitch]="navType">
          <ng-container *ngSwitchCase="NavType.APPLICATION">
            <yunzai-layout-nav-application />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.GROUP">
            <yunzai-layout-nav-group />
          </ng-container>
          <ng-container *ngSwitchCase="NavType.TILE">
            <yunzai-layout-nav-tile />
          </ng-container>
          <ng-container *ngSwitchDefault>
            <yunzai-layout-nav-application />
          </ng-container>
        </ng-container>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <yunzai-header-notify />
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <theme-btn />
      </layout-default-header-item>
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
              <yunzai-header-fullscreen />
            </div>
            <div data-event-id="_nav_clearstorage" nz-menu-item>
              <yunzai-header-clear-storage />
            </div>
            <div data-event-id="_nav_i18n" nz-menu-item>
              <yunzai-header-i18n />
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <yunzai-header-user />
      </layout-default-header-item>
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
  `,
                    standalone: true,
                    imports: [
                        LayoutDefaultModule,
                        RouterModule,
                        ReuseTabModule,
                        CommonModule,
                        I18nPipe,
                        NzDropDownModule,
                        NzAvatarModule,
                        NzIconModule,
                        ThemeBtnModule,
                        YunzaiWidgetsModule,
                        YunzaiNavApplicationComponent,
                        YunzaiLayoutNavGroupComponent,
                        YunzaiLayoutNavTileComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLG1CQUFtQixFQUF3QixvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQ0wsVUFBVSxFQUdWLEdBQUcsRUFDSCxPQUFPLEVBQ1AsVUFBVSxFQUNWLHNCQUFzQixFQUN0QiwyQkFBMkIsRUFDM0IseUJBQXlCLEVBQ3pCLDBCQUEwQixFQUMxQixNQUFNLEVBRVAsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsNkJBQTZC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b0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQXpJVSwwQkFBMEI7a0dBQTFCLDBCQUEwQiwrRUFwSDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtHVCwyREFHQyxtQkFBbUIsdWdCQUNuQixZQUFZLHliQUNaLGNBQWMsNGNBQ2QsWUFBWSwyWEFDWixRQUFRLDRDQUNSLGdCQUFnQix5MkJBQ2hCLGNBQWMsZ1BBQ2QsWUFBWSxpTkFDWixjQUFjLDZLQUNkLG1CQUFtQixzaUJBQ25CLDZCQUE2QiwwRUFDN0IsNkJBQTZCLG9FQUM3Qiw0QkFBNEI7OzJGQUduQiwwQkFBMEI7a0JBdEh0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrR1Q7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0IsNkJBQTZCO3dCQUM3Qiw0QkFBNEI7cUJBQzdCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgaW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFJldXNlVGFiTW9kdWxlIH0gZnJvbSAnQHllbG9uL2FiYy9yZXVzZS10YWInO1xuaW1wb3J0IHsgWXVuemFpV2lkZ2V0c01vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iaXMveXVuemFpLXdpZGdldHMnO1xuaW1wb3J0IHsgU3RvbXBTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3NvY2tldCc7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0TW9kdWxlLCBMYXlvdXREZWZhdWx0T3B0aW9ucywgTGF5b3V0RGlzcGxheVNlcnZpY2UgfSBmcm9tICdAeWVsb24vdGhlbWUvbGF5b3V0LWRlZmF1bHQnO1xuaW1wb3J0IHsgVGhlbWVCdG5Nb2R1bGUgfSBmcm9tICdAeWVsb24vdGhlbWUvdGhlbWUtYnRuJztcbmltcG9ydCB7XG4gIGhhc0Zhdmljb24sXG4gIExheW91dEJhc2ljQXNpZGUsXG4gIExheW91dEJhc2ljRGlzcGxheSxcbiAgbG9nLFxuICBOYXZUeXBlLFxuICBzZXRGYXZpY29uLFxuICB1c2VMb2NhbFN0b3JhZ2VDdXJyZW50LFxuICB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGUsXG4gIHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUsXG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICBXSU5ET1csXG4gIFl1bnphaVByb2plY3RJbmZvXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56QXZhdGFyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9hdmF0YXInO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IFl1bnphaU5hdkFwcGxpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtbmF2LWFwcGxpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZdW56YWlMYXlvdXROYXZHcm91cENvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpTGF5b3V0TmF2VGlsZUNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LW5hdi10aWxlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0QmFzaWNTdGF0ZSB7XG4gIG9wdGlvbnM6IExheW91dERlZmF1bHRPcHRpb25zO1xuICBhc2lkZTogTGF5b3V0QmFzaWNBc2lkZTtcbiAgZGlzcGxheTogTGF5b3V0QmFzaWNEaXNwbGF5O1xuICBuYXZUeXBlOiBOYXZUeXBlO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktbGF5b3V0LWJhc2ljYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGF5b3V0LWRlZmF1bHQgW29wdGlvbnNdPVwib3B0aW9uc1wiIFthc2lkZVVzZXJdPVwiYXNpZGVVc2VyVHBsXCIgW2NvbnRlbnRdPVwiZGlzcGxheVJldXNldGFiID8gY29udGVudFRwbCA6IG5vbmVUcGxcIj5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJsZWZ0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm5hdlR5cGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkFQUExJQ0FUSU9OXCI+XG4gICAgICAgICAgICA8eXVuemFpLWxheW91dC1uYXYtYXBwbGljYXRpb24gLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkdST1VQXCI+XG4gICAgICAgICAgICA8eXVuemFpLWxheW91dC1uYXYtZ3JvdXAgLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLlRJTEVcIj5cbiAgICAgICAgICAgIDx5dW56YWktbGF5b3V0LW5hdi10aWxlIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgPHl1bnphaS1sYXlvdXQtbmF2LWFwcGxpY2F0aW9uIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8eXVuemFpLWhlYWRlci1ub3RpZnkgLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHRoZW1lLWJ0biAvPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfc2V0dGluZ3NcIlxuICAgICAgICAgIGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtLXRyaWdnZXJcbiAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJzZXR0aW5nc01lbnVcIlxuICAgICAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2V0dGluZ1wiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuei1kcm9wZG93bi1tZW51ICNzZXR0aW5nc01lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgIDxkaXYgbnotbWVudSBzdHlsZT1cIndpZHRoOiAyMDBweDtcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2JyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCJcbiAgICAgICAgICAgICAgZGF0YS10eXBlPVwiYXBwbGljYXRpb25cIlxuICAgICAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uTmF2VHlwZUNoYW5nZShOYXZUeXBlLkFQUExJQ0FUSU9OKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYXBwc3RvcmVcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYuYXBwbGljYXRpb24nIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIiBkYXRhLXR5cGU9XCJncm91cFwiIG56LW1lbnUtaXRlbSAoY2xpY2spPVwib25OYXZUeXBlQ2hhbmdlKE5hdlR5cGUuR1JPVVApXCI+XG4gICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZ3JvdXBcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYuZ3JvdXAnIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIiBkYXRhLXR5cGU9XCJ0aWxlXCIgbnotbWVudS1pdGVtIChjbGljayk9XCJvbk5hdlR5cGVDaGFuZ2UoTmF2VHlwZS5USUxFKVwiPlxuICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImFwcHN0b3JlXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2LnRpbGUnIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2Z1bGxzY3JlZW5cIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktaGVhZGVyLWZ1bGxzY3JlZW4gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9jbGVhcnN0b3JhZ2VcIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktaGVhZGVyLWNsZWFyLXN0b3JhZ2UgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9pMThuXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWhlYWRlci1pMThuIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiPlxuICAgICAgICA8eXVuemFpLWhlYWRlci11c2VyIC8+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgIDwvbGF5b3V0LWRlZmF1bHQ+XG4gICAgPG5nLXRlbXBsYXRlICNhc2lkZVVzZXJUcGw+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfcm91dGVfdXNlclwiXG4gICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCJcbiAgICAgICAgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlclwiXG4gICAgICA+XG4gICAgICAgIDxuei1hdmF0YXIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1hdmF0YXJcIiBbbnpTcmNdPVwiYXNpZGUuaWNvblwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1pbmZvXCI+XG4gICAgICAgICAgPHN0cm9uZz57eyBhc2lkZS5uYW1lIHwgaTE4biB9fTwvc3Ryb25nPlxuICAgICAgICAgIDxwIGNsYXNzPVwibWIwXCI+e3sgYXNpZGUuaW50cm8gfCBpMThuIH19PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI3VzZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgPHVsIG56LW1lbnU+XG4gICAgICAgICAgPGxpIGRhdGEtZXZlbnQtaWQ9XCJfcm91dGVfYmFja2hvbWVcIiBuei1tZW51LWl0ZW0gcm91dGVyTGluaz1cIi9cIj57eyAnYmFjay5ob21lJyB8IGkxOG4gfX08L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50VHBsPlxuICAgICAgPHJldXNlLXRhYiAjcmV1c2VUYWIgW25nU3R5bGVdPVwicmV1c2V0YWJDU1NcIiAvPlxuICAgICAgPHJvdXRlci1vdXRsZXQgKGFjdGl2YXRlKT1cInJldXNlVGFiLmFjdGl2YXRlKCRldmVudClcIiAoYXR0YWNoKT1cInJldXNlVGFiLmFjdGl2YXRlKCRldmVudClcIiAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNub25lVHBsPiA8cm91dGVyLW91dGxldCAvPiA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgTGF5b3V0RGVmYXVsdE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUmV1c2VUYWJNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5QaXBlLFxuICAgIE56RHJvcERvd25Nb2R1bGUsXG4gICAgTnpBdmF0YXJNb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIFRoZW1lQnRuTW9kdWxlLFxuICAgIFl1bnphaVdpZGdldHNNb2R1bGUsXG4gICAgWXVuemFpTmF2QXBwbGljYXRpb25Db21wb25lbnQsXG4gICAgWXVuemFpTGF5b3V0TmF2R3JvdXBDb21wb25lbnQsXG4gICAgWXVuemFpTGF5b3V0TmF2VGlsZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dEJhc2ljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdG9tcCA9IGluamVjdChTdG9tcFNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbiA9IGluamVjdChXSU5ET1cpO1xuICBwcml2YXRlIHJlYWRvbmx5IGxheW91dERpc3BsYXlTZXJ2aWNlID0gaW5qZWN0KExheW91dERpc3BsYXlTZXJ2aWNlKTtcblxuICBwdWJsaWMgTmF2VHlwZSA9IE5hdlR5cGU7XG4gIHByaXZhdGUgc3RhdGU6IExheW91dEJhc2ljU3RhdGUgPSB7XG4gICAgb3B0aW9uczoge1xuICAgICAgbG9nb0V4cGFuZGVkOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2AsXG4gICAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgXG4gICAgfSxcbiAgICBhc2lkZToge1xuICAgICAgbmFtZTogJycsXG4gICAgICBpbnRybzogJycsXG4gICAgICBpY29uOiAnJ1xuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgbmF2OiB0cnVlLFxuICAgICAgYXNpZGU6IHRydWUsXG4gICAgICByZXVzZXRhYjogdHJ1ZVxuICAgIH0sXG4gICAgbmF2VHlwZTogTmF2VHlwZS5BUFBMSUNBVElPTlxuICB9O1xuXG4gIGdldCBvcHRpb25zKCk6IExheW91dERlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5vcHRpb25zO1xuICB9XG5cbiAgZ2V0IG5hdlR5cGUoKTogTmF2VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubmF2VHlwZTtcbiAgfVxuXG4gIGdldCBhc2lkZSgpOiBMYXlvdXRCYXNpY0FzaWRlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5hc2lkZTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5UmV1c2V0YWIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzcGxheS5yZXVzZXRhYjtcbiAgfVxuXG4gIGdldCByZXVzZXRhYkNTUygpOiBOelNhZmVBbnkge1xuICAgIGxldCBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge307XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRpc3BsYXkubmF2KSB7XG4gICAgICBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge1xuICAgICAgICAuLi5jYXNjYWRpbmdTdHlsZVNoZWV0LFxuICAgICAgICB0b3A6ICcwcHgnXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc3RhdGUuZGlzcGxheS5hc2lkZSkge1xuICAgICAgY2FzY2FkaW5nU3R5bGVTaGVldCA9IHtcbiAgICAgICAgLi4uY2FzY2FkaW5nU3R5bGVTaGVldCxcbiAgICAgICAgbGVmdDogJzI0cHgnXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2FzY2FkaW5nU3R5bGVTaGVldDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdExvZ28oKTtcbiAgICB0aGlzLmluaXRGYXZpY29uKCk7XG4gICAgdGhpcy5pbml0TmF2VHlwZSgpO1xuICAgIHRoaXMuaW5pdEFzaWRlKCk7XG4gICAgdGhpcy5hZGRMYXlvdXREaXNwbGF5TGlzdGVuZXIoKTtcbiAgICB0aGlzLnN0b21wLmxpc3RlbigpO1xuICAgIHRoaXMudG9JbmRleCgpO1xuICB9XG5cbiAgaW5pdEZhdmljb24oKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBpZiAocHJvamVjdEluZm8uZmF2aWNvblVybCkge1xuICAgICAgaGFzRmF2aWNvbihwcm9qZWN0SW5mby5mYXZpY29uVXJsKS50aGVuKChoYXM6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGhhcykge1xuICAgICAgICAgIHNldEZhdmljb24ocHJvamVjdEluZm8uZmF2aWNvblVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RmF2aWNvbignLi9hc3NldHMvZmF2aWNvbi5pY28nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEFzaWRlKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldEN1cnJlbnRdID0gdXNlTG9jYWxTdG9yYWdlQ3VycmVudCgpO1xuICAgIGNvbnN0IGFzaWRlOiBMYXlvdXRCYXNpY0FzaWRlID0gZ2V0Q3VycmVudCgpITtcbiAgICB0aGlzLnN0YXRlLmFzaWRlID0geyAuLi5hc2lkZSB9O1xuICB9XG5cbiAgaW5pdExvZ28oKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICB0aGlzLnN0YXRlLm9wdGlvbnMubG9nb0V4cGFuZGVkID0gcHJvamVjdEluZm8ubWF4TG9nb1VybCA/IHByb2plY3RJbmZvLm1heExvZ29VcmwgOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2A7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmxvZ29Db2xsYXBzZWQgPSBwcm9qZWN0SW5mby5taW5pTG9nb1VybCA/IHByb2plY3RJbmZvLm1pbmlMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28uc3ZnYDtcbiAgfVxuXG4gIGluaXROYXZUeXBlKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgbmF2VHlwZTogTmF2VHlwZSB8IG51bGwgPSBnZXRIZWFkZXJUeXBlKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgaWYgKG5hdlR5cGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc3RhdGUubmF2VHlwZSA9IG5hdlR5cGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBmZXRjaGVkTmF2VHlwZTogTnpTYWZlQW55O1xuICAgIGlmIChwcm9qZWN0SW5mby5oZWFkZXJTdHlsZSAmJiBwcm9qZWN0SW5mby5oZWFkZXJTdHlsZS5sZW5ndGggPiAwKSB7XG4gICAgICBmZXRjaGVkTmF2VHlwZSA9IHByb2plY3RJbmZvLmhlYWRlclN0eWxlLnBvcCgpPy52YWx1ZTtcbiAgICB9XG4gICAgLy8gZGVmYXVsdCB2YWx1ZVxuICAgIGlmICghZmV0Y2hlZE5hdlR5cGUpIHtcbiAgICAgIGZldGNoZWROYXZUeXBlID0gTmF2VHlwZS5BUFBMSUNBVElPTjtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5uYXZUeXBlID0gZmV0Y2hlZE5hdlR5cGU7XG4gIH1cblxuICB0b0luZGV4KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldERlZmF1bHRSb3V0ZV0gPSB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGUoKTtcbiAgICBjb25zdCBkZWZhdWx0Um91dGUgPSBnZXREZWZhdWx0Um91dGUoKSE7XG4gICAgbG9nKCdZdW56YWlMYXlvdXRCYXNpY0NvbXBvbmVudDogJywgYHRvZG86IHRoZSBkZWZhdWx0IHJvdXRlIHdhcyAke2RlZmF1bHRSb3V0ZX0sIOS9huaYr+i/mOayoeaDs+WlveWmguS9leWunueOsC5gKTtcbiAgfVxuXG4gIG9uTmF2VHlwZUNoYW5nZSh0eXBlOiBOYXZUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgW3NldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgIHNldEhlYWRlclR5cGUodHlwZSk7XG4gICAgdGhpcy53aW4ubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBhZGRMYXlvdXREaXNwbGF5TGlzdGVuZXIoKTogdm9pZCB7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ3JldXNlVGFiJywgKGRpc3BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuc3RhdGUuZGlzcGxheS5yZXVzZXRhYiA9IGRpc3BsYXk7XG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ25hdicsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkubmF2ID0gZGlzcGxheTtcbiAgICB9KTtcblxuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdhc2lkZScsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkuYXNpZGUgPSBkaXNwbGF5O1xuICAgIH0pO1xuICB9XG59XG4iXX0=