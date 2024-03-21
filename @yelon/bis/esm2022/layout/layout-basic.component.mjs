import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReuseTabModule } from '@yelon/abc/reuse-tab';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';
import { StompService } from '@yelon/socket';
import { I18nPipe } from '@yelon/theme';
import { LayoutDefaultModule, LayoutDisplayService } from '@yelon/theme/layout-default';
import { ThemeBtnModule } from '@yelon/theme/theme-btn';
import { hasFavicon, log, NavType, setFavicon, useLocalStorageCurrent, useLocalStorageDefaultRoute, useLocalStorageHeaderType, useLocalStorageProjectInfo, WINDOW, YUNZAI_CONFIG } from '@yelon/util';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
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
import * as i9 from "ng-zorro-antd/modal";
import * as i10 from "ng-zorro-antd/skeleton";
import * as i11 from "ng-zorro-antd/descriptions";
import * as i12 from "@yelon/theme/theme-btn";
import * as i13 from "@yelon/bis/yunzai-widgets";
export class YunzaiLayoutBasicComponent {
    constructor() {
        this.stomp = inject(StompService);
        this.win = inject(WINDOW);
        this.layoutDisplayService = inject(LayoutDisplayService);
        this.conf = inject(YUNZAI_CONFIG);
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
        this.headerStyleList = [];
        this.applicationModal = {
            isVisible: false,
            loading: false
        };
        this.httpClient = inject(HttpClient);
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
                left: '0px'
            };
        }
        return cascadingStyleSheet;
    }
    ngOnInit() {
        this.config = this.conf.bis;
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
        }
        else {
            this.state.navType = NavType.APPLICATION;
        }
        if (projectInfo.headerStyle && projectInfo.headerStyle.length > 0) {
            this.headerStyleList = projectInfo.headerStyle;
            const hasThis = this.headerStyleList.some(item => item.value === this.state.navType);
            if (!hasThis) {
                this.state.navType = projectInfo.headerStyle[0].value;
                const [setHeaderType] = useLocalStorageHeaderType();
                setHeaderType(this.state.navType);
            }
        }
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
    // 关于本应用
    aboutApplication() {
        const urlArr = window.location.pathname.split(`${this.config.baseUrl}/`);
        if (urlArr.length > 1) {
            // 应用标识，截取路径中 /backstage/后第一个字符串
            // 例: http://222.30.194.61/backstage/auth/page/oafportal/#/base/menu  中 auth
            const name = urlArr[1].split('/')[0];
            this.applicationModal.isVisible = true;
            this.applicationModal.loading = true;
            // eslint-disable-next-line deprecation/deprecation
            this.httpClient.get(`/basic/api/app/aboutApp?name=${name}`).subscribe(
            // @ts-ignore
            (response) => {
                this.applicationModal.loading = false;
                if (response.data) {
                    this.applicationInfo = response.data;
                }
            }, () => {
                this.applicationModal.loading = false;
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: YunzaiLayoutBasicComponent, isStandalone: true, selector: "yunzai-layout-basic", ngImport: i0, template: `
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
          <ng-container *ngSwitchCase="NavType.BLANK" />
          <ng-container *ngSwitchCase="NavType.TABS" />
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

            @if (headerStyleList.length > 1) {
              @for (i of headerStyleList; track $index) {
                <div
                  data-event-id="_nav_mode"
                  nz-menu-item
                  [attr.data-type]="i.value"
                  (click)="onNavTypeChange(i.value)"
                >
                  <ng-container [ngSwitch]="i.value">
                    <ng-container *ngSwitchCase="NavType.APPLICATION">
                      <i nz-icon nzType="appstore" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.GROUP">
                      <i nz-icon nzType="group" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.TILE">
                      <i nz-icon nzType="dash" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.BLANK">
                      <i nz-icon nzType="border" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.TABS">
                      <i nz-icon nzType="insert-row-above" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchDefault>
                      <i nz-icon nzType="appstore" class="mr-sm"></i>
                    </ng-container>
                    {{ 'mode.nav.' + i.value | i18n }}
                  </ng-container>
                </div>
              }
            }

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
      <div data-event-id="_route_user" class="yunzai-default__aside-user">
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon" (click)="aboutApplication()" />
        <div class="yunzai-default__aside-user-info" nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu">
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
    <ng-template #noneTpl>
      <router-outlet />
    </ng-template>

    <nz-modal
      nzTitle="关于本应用"
      [(nzVisible)]="applicationModal.isVisible"
      [nzOkText]="null"
      [nzCancelText]="'关闭'"
      [nzWidth]="700"
      (nzOnCancel)="applicationModal.isVisible = false"
    >
      <ng-container *nzModalContent>
        <nz-skeleton [nzLoading]="applicationModal.loading" [nzActive]="true">
          <nz-descriptions nzBordered [nzSize]="'middle'" [nzColumn]="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
            <nz-descriptions-item nzTitle="应用名称">{{ applicationInfo?.showName }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="应用标识">{{ applicationInfo?.name }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="版本总数">{{ applicationInfo?.versionNum }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="应用首次部署时间">{{
              applicationInfo?.firstDeploymentDate | date: 'yyyy-MM-dd HH:mm:ss'
            }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="当前版本">{{ applicationInfo?.currentVersion }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="当前版本部署时间">{{
              applicationInfo?.currentDeploymentDate | date: 'yyyy-MM-dd HH:mm:ss'
            }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="最新版本">{{ applicationInfo?.lastVersion }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="最新版本发布时间">{{
              applicationInfo?.lastPushDate | date: 'yyyy-MM-dd HH:mm:ss'
            }}</nz-descriptions-item>
          </nz-descriptions>
        </nz-skeleton>
      </ng-container>
    </nz-modal>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: LayoutDefaultModule }, { kind: "component", type: i1.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: ReuseTabModule }, { kind: "component", type: i3.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "pipe", type: i4.DatePipe, name: "date" }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i5.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i6.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i6.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i7.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzModalModule }, { kind: "component", type: i9.NzModalComponent, selector: "nz-modal", inputs: ["nzMask", "nzMaskClosable", "nzCloseOnNavigation", "nzVisible", "nzClosable", "nzOkLoading", "nzOkDisabled", "nzCancelDisabled", "nzCancelLoading", "nzKeyboard", "nzNoAnimation", "nzCentered", "nzDraggable", "nzContent", "nzFooter", "nzZIndex", "nzWidth", "nzWrapClassName", "nzClassName", "nzStyle", "nzTitle", "nzCloseIcon", "nzMaskStyle", "nzBodyStyle", "nzOkText", "nzCancelText", "nzOkType", "nzOkDanger", "nzIconType", "nzModalType", "nzAutofocus", "nzOnOk", "nzOnCancel"], outputs: ["nzOnOk", "nzOnCancel", "nzAfterOpen", "nzAfterClose", "nzVisibleChange"], exportAs: ["nzModal"] }, { kind: "directive", type: i9.NzModalContentDirective, selector: "[nzModalContent]", exportAs: ["nzModalContent"] }, { kind: "ngmodule", type: NzSkeletonModule }, { kind: "component", type: i10.NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }, { kind: "ngmodule", type: NzDescriptionsModule }, { kind: "component", type: i11.NzDescriptionsComponent, selector: "nz-descriptions", inputs: ["nzBordered", "nzLayout", "nzColumn", "nzSize", "nzTitle", "nzExtra", "nzColon"], exportAs: ["nzDescriptions"] }, { kind: "component", type: i11.NzDescriptionsItemComponent, selector: "nz-descriptions-item", inputs: ["nzSpan", "nzTitle"], exportAs: ["nzDescriptionsItem"] }, { kind: "ngmodule", type: ThemeBtnModule }, { kind: "component", type: i12.ThemeBtnComponent, selector: "theme-btn", inputs: ["types", "devTips", "deployUrl"], outputs: ["themeChange"] }, { kind: "ngmodule", type: YunzaiWidgetsModule }, { kind: "component", type: i13.YunzaiHeaderClearStorageComponent, selector: "yunzai-header-clear-storage" }, { kind: "component", type: i13.YunzaiHeaderFullScreenComponent, selector: "yunzai-header-fullscreen" }, { kind: "component", type: i13.YunzaiHeaderNotifyComponent, selector: "yunzai-header-notify" }, { kind: "component", type: i13.YunzaiHeaderI18nComponent, selector: "yunzai-header-i18n", inputs: ["showLangText"] }, { kind: "component", type: i13.YunzaiHeaderUserComponent, selector: "yunzai-header-user" }, { kind: "component", type: YunzaiNavApplicationComponent, selector: "yunzai-layout-nav-application" }, { kind: "component", type: YunzaiLayoutNavGroupComponent, selector: "yunzai-layout-nav-group" }, { kind: "component", type: YunzaiLayoutNavTileComponent, selector: "yunzai-layout-nav-tile" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiLayoutBasicComponent, decorators: [{
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
          <ng-container *ngSwitchCase="NavType.BLANK" />
          <ng-container *ngSwitchCase="NavType.TABS" />
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

            @if (headerStyleList.length > 1) {
              @for (i of headerStyleList; track $index) {
                <div
                  data-event-id="_nav_mode"
                  nz-menu-item
                  [attr.data-type]="i.value"
                  (click)="onNavTypeChange(i.value)"
                >
                  <ng-container [ngSwitch]="i.value">
                    <ng-container *ngSwitchCase="NavType.APPLICATION">
                      <i nz-icon nzType="appstore" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.GROUP">
                      <i nz-icon nzType="group" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.TILE">
                      <i nz-icon nzType="dash" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.BLANK">
                      <i nz-icon nzType="border" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchCase="NavType.TABS">
                      <i nz-icon nzType="insert-row-above" class="mr-sm"></i>
                    </ng-container>
                    <ng-container *ngSwitchDefault>
                      <i nz-icon nzType="appstore" class="mr-sm"></i>
                    </ng-container>
                    {{ 'mode.nav.' + i.value | i18n }}
                  </ng-container>
                </div>
              }
            }

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
      <div data-event-id="_route_user" class="yunzai-default__aside-user">
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSrc]="aside.icon" (click)="aboutApplication()" />
        <div class="yunzai-default__aside-user-info" nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu">
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
    <ng-template #noneTpl>
      <router-outlet />
    </ng-template>

    <nz-modal
      nzTitle="关于本应用"
      [(nzVisible)]="applicationModal.isVisible"
      [nzOkText]="null"
      [nzCancelText]="'关闭'"
      [nzWidth]="700"
      (nzOnCancel)="applicationModal.isVisible = false"
    >
      <ng-container *nzModalContent>
        <nz-skeleton [nzLoading]="applicationModal.loading" [nzActive]="true">
          <nz-descriptions nzBordered [nzSize]="'middle'" [nzColumn]="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
            <nz-descriptions-item nzTitle="应用名称">{{ applicationInfo?.showName }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="应用标识">{{ applicationInfo?.name }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="版本总数">{{ applicationInfo?.versionNum }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="应用首次部署时间">{{
              applicationInfo?.firstDeploymentDate | date: 'yyyy-MM-dd HH:mm:ss'
            }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="当前版本">{{ applicationInfo?.currentVersion }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="当前版本部署时间">{{
              applicationInfo?.currentDeploymentDate | date: 'yyyy-MM-dd HH:mm:ss'
            }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="最新版本">{{ applicationInfo?.lastVersion }}</nz-descriptions-item>
            <nz-descriptions-item nzTitle="最新版本发布时间">{{
              applicationInfo?.lastPushDate | date: 'yyyy-MM-dd HH:mm:ss'
            }}</nz-descriptions-item>
          </nz-descriptions>
        </nz-skeleton>
      </ng-container>
    </nz-modal>
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
                        NzModalModule,
                        NzSkeletonModule,
                        NzDescriptionsModule,
                        ThemeBtnModule,
                        YunzaiWidgetsModule,
                        YunzaiNavApplicationComponent,
                        YunzaiLayoutNavGroupComponent,
                        YunzaiLayoutNavTileComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBd0Isb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFHVixHQUFHLEVBQ0gsT0FBTyxFQUNQLFVBQVUsRUFDVixzQkFBc0IsRUFDdEIsMkJBQTJCLEVBQzNCLHlCQUF5QixFQUN6QiwwQkFBMEIsRUFDMUIsTUFBTSxFQUNOLGFBQWEsRUFLZCxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxF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UUFBUSw0Q0FDUixnQkFBZ0IseTJCQUNoQixjQUFjLGdQQUNkLFlBQVksaU5BQ1osYUFBYSxnekJBQ2IsZ0JBQWdCLDJOQUNoQixvQkFBb0IsK1lBQ3BCLGNBQWMsOEtBQ2QsbUJBQW1CLHNpQkFDbkIsNkJBQTZCLDBFQUM3Qiw2QkFBNkIsb0VBQzdCLDRCQUE0Qjs7MkZBR25CLDBCQUEwQjtrQkF0S3RDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStJVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osUUFBUTt3QkFDUixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsNkJBQTZCO3dCQUM3Qiw2QkFBNkI7d0JBQzdCLDRCQUE0QjtxQkFDN0I7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbXBvbmVudCwgaW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFJldXNlVGFiTW9kdWxlIH0gZnJvbSAnQHllbG9uL2FiYy9yZXVzZS10YWInO1xuaW1wb3J0IHsgWXVuemFpV2lkZ2V0c01vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iaXMveXVuemFpLXdpZGdldHMnO1xuaW1wb3J0IHsgU3RvbXBTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3NvY2tldCc7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0TW9kdWxlLCBMYXlvdXREZWZhdWx0T3B0aW9ucywgTGF5b3V0RGlzcGxheVNlcnZpY2UgfSBmcm9tICdAeWVsb24vdGhlbWUvbGF5b3V0LWRlZmF1bHQnO1xuaW1wb3J0IHsgVGhlbWVCdG5Nb2R1bGUgfSBmcm9tICdAeWVsb24vdGhlbWUvdGhlbWUtYnRuJztcbmltcG9ydCB7XG4gIGhhc0Zhdmljb24sXG4gIExheW91dEJhc2ljQXNpZGUsXG4gIExheW91dEJhc2ljRGlzcGxheSxcbiAgbG9nLFxuICBOYXZUeXBlLFxuICBzZXRGYXZpY29uLFxuICB1c2VMb2NhbFN0b3JhZ2VDdXJyZW50LFxuICB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGUsXG4gIHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUsXG4gIHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvLFxuICBXSU5ET1csXG4gIFlVTlpBSV9DT05GSUcsXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWcsXG4gIFl1bnphaUhlYWRlclN0eWxlLFxuICBZdW56YWlQcm9qZWN0SW5mb1xufSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOekF2YXRhck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYXZhdGFyJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekRlc2NyaXB0aW9uc01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZGVzY3JpcHRpb25zJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOek1vZGFsTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tb2RhbCc7XG5pbXBvcnQgeyBOelNrZWxldG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9za2VsZXRvbic7XG5cbmltcG9ydCB7IFl1bnphaU5hdkFwcGxpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtbmF2LWFwcGxpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZdW56YWlMYXlvdXROYXZHcm91cENvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LW5hdi1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpTGF5b3V0TmF2VGlsZUNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LW5hdi10aWxlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0QmFzaWNTdGF0ZSB7XG4gIG9wdGlvbnM6IExheW91dERlZmF1bHRPcHRpb25zO1xuICBhc2lkZTogTGF5b3V0QmFzaWNBc2lkZTtcbiAgZGlzcGxheTogTGF5b3V0QmFzaWNEaXNwbGF5O1xuICBuYXZUeXBlOiBOYXZUeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uSW5mb0ludGVyZmFjZSB7XG4gIGlkPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBzaG93TmFtZT86IHN0cmluZztcbiAgbGFzdFZlcnNpb24/OiBzdHJpbmc7XG4gIHZlcnNpb25OdW0/OiBzdHJpbmc7XG4gIGN1cnJlbnRWZXJzaW9uPzogc3RyaW5nO1xuICBmaXJzdERlcGxveW1lbnREYXRlPzogc3RyaW5nO1xuICBjdXJyZW50RGVwbG95bWVudERhdGU/OiBzdHJpbmc7XG4gIGxhc3RQdXNoRGF0ZT86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWxheW91dC1iYXNpY2AsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxheW91dC1kZWZhdWx0IFtvcHRpb25zXT1cIm9wdGlvbnNcIiBbYXNpZGVVc2VyXT1cImFzaWRlVXNlclRwbFwiIFtjb250ZW50XT1cImRpc3BsYXlSZXVzZXRhYiA/IGNvbnRlbnRUcGwgOiBub25lVHBsXCI+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwibGVmdFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJuYXZUeXBlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5BUFBMSUNBVElPTlwiPlxuICAgICAgICAgICAgPHl1bnphaS1sYXlvdXQtbmF2LWFwcGxpY2F0aW9uIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5HUk9VUFwiPlxuICAgICAgICAgICAgPHl1bnphaS1sYXlvdXQtbmF2LWdyb3VwIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5USUxFXCI+XG4gICAgICAgICAgICA8eXVuemFpLWxheW91dC1uYXYtdGlsZSAvPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuQkxBTktcIiAvPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuVEFCU1wiIC8+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgPHl1bnphaS1sYXlvdXQtbmF2LWFwcGxpY2F0aW9uIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8eXVuemFpLWhlYWRlci1ub3RpZnkgLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHRoZW1lLWJ0biAvPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfc2V0dGluZ3NcIlxuICAgICAgICAgIGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtLXRyaWdnZXJcbiAgICAgICAgICBuei1kcm9wZG93blxuICAgICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJzZXR0aW5nc01lbnVcIlxuICAgICAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgICBuelBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2V0dGluZ1wiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuei1kcm9wZG93bi1tZW51ICNzZXR0aW5nc01lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICAgIDxkaXYgbnotbWVudSBzdHlsZT1cIndpZHRoOiAyMDBweDtcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAge3sgJ21vZGUubmF2JyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICBAaWYgKGhlYWRlclN0eWxlTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIEBmb3IgKGkgb2YgaGVhZGVyU3R5bGVMaXN0OyB0cmFjayAkaW5kZXgpIHtcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCJcbiAgICAgICAgICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS10eXBlXT1cImkudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uTmF2VHlwZUNoYW5nZShpLnZhbHVlKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaS52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkFQUExJQ0FUSU9OXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJhcHBzdG9yZVwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkdST1VQXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJncm91cFwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLlRJTEVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImRhc2hcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5CTEFOS1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYm9yZGVyXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuVEFCU1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiaW5zZXJ0LXJvdy1hYm92ZVwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJhcHBzdG9yZVwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYuJyArIGkudmFsdWUgfCBpMThuIH19XG4gICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2Z1bGxzY3JlZW5cIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktaGVhZGVyLWZ1bGxzY3JlZW4gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9jbGVhcnN0b3JhZ2VcIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktaGVhZGVyLWNsZWFyLXN0b3JhZ2UgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9pMThuXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWhlYWRlci1pMThuIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiPlxuICAgICAgICA8eXVuemFpLWhlYWRlci11c2VyIC8+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgIDwvbGF5b3V0LWRlZmF1bHQ+XG4gICAgPG5nLXRlbXBsYXRlICNhc2lkZVVzZXJUcGw+XG4gICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfcm91dGVfdXNlclwiIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLXVzZXJcIj5cbiAgICAgICAgPG56LWF2YXRhciBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWF2YXRhclwiIFtuelNyY109XCJhc2lkZS5pY29uXCIgKGNsaWNrKT1cImFib3V0QXBwbGljYXRpb24oKVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlci1pbmZvXCIgbnotZHJvcGRvd24gbnpUcmlnZ2VyPVwiY2xpY2tcIiBbbnpEcm9wZG93bk1lbnVdPVwidXNlck1lbnVcIj5cbiAgICAgICAgICA8c3Ryb25nPnt7IGFzaWRlLm5hbWUgfCBpMThuIH19PC9zdHJvbmc+XG4gICAgICAgICAgPHAgY2xhc3M9XCJtYjBcIj57eyBhc2lkZS5pbnRybyB8IGkxOG4gfX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bnotZHJvcGRvd24tbWVudSAjdXNlck1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8dWwgbnotbWVudT5cbiAgICAgICAgICA8bGkgZGF0YS1ldmVudC1pZD1cIl9yb3V0ZV9iYWNraG9tZVwiIG56LW1lbnUtaXRlbSByb3V0ZXJMaW5rPVwiL1wiPnt7ICdiYWNrLmhvbWUnIHwgaTE4biB9fTwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUcGw+XG4gICAgICA8cmV1c2UtdGFiICNyZXVzZVRhYiBbbmdTdHlsZV09XCJyZXVzZXRhYkNTU1wiIC8+XG4gICAgICA8cm91dGVyLW91dGxldCAoYWN0aXZhdGUpPVwicmV1c2VUYWIuYWN0aXZhdGUoJGV2ZW50KVwiIChhdHRhY2gpPVwicmV1c2VUYWIuYWN0aXZhdGUoJGV2ZW50KVwiIC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI25vbmVUcGw+XG4gICAgICA8cm91dGVyLW91dGxldCAvPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bnotbW9kYWxcbiAgICAgIG56VGl0bGU9XCLlhbPkuo7mnKzlupTnlKhcIlxuICAgICAgWyhuelZpc2libGUpXT1cImFwcGxpY2F0aW9uTW9kYWwuaXNWaXNpYmxlXCJcbiAgICAgIFtuek9rVGV4dF09XCJudWxsXCJcbiAgICAgIFtuekNhbmNlbFRleHRdPVwiJ+WFs+mXrSdcIlxuICAgICAgW256V2lkdGhdPVwiNzAwXCJcbiAgICAgIChuek9uQ2FuY2VsKT1cImFwcGxpY2F0aW9uTW9kYWwuaXNWaXNpYmxlID0gZmFsc2VcIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm56TW9kYWxDb250ZW50PlxuICAgICAgICA8bnotc2tlbGV0b24gW256TG9hZGluZ109XCJhcHBsaWNhdGlvbk1vZGFsLmxvYWRpbmdcIiBbbnpBY3RpdmVdPVwidHJ1ZVwiPlxuICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMgbnpCb3JkZXJlZCBbbnpTaXplXT1cIidtaWRkbGUnXCIgW256Q29sdW1uXT1cInsgeHhsOiAyLCB4bDogMiwgbGc6IDIsIG1kOiAyLCBzbTogMiwgeHM6IDEgfVwiPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLlupTnlKjlkI3np7BcIj57eyBhcHBsaWNhdGlvbkluZm8/LnNob3dOYW1lIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMtaXRlbSBuelRpdGxlPVwi5bqU55So5qCH6K+GXCI+e3sgYXBwbGljYXRpb25JbmZvPy5uYW1lIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMtaXRlbSBuelRpdGxlPVwi54mI5pys5oC75pWwXCI+e3sgYXBwbGljYXRpb25JbmZvPy52ZXJzaW9uTnVtIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMtaXRlbSBuelRpdGxlPVwi5bqU55So6aaW5qyh6YOo572y5pe26Ze0XCI+e3tcbiAgICAgICAgICAgICAgYXBwbGljYXRpb25JbmZvPy5maXJzdERlcGxveW1lbnREYXRlIHwgZGF0ZTogJ3l5eXktTU0tZGQgSEg6bW06c3MnXG4gICAgICAgICAgICB9fTwvbnotZGVzY3JpcHRpb25zLWl0ZW0+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuW9k+WJjeeJiOacrFwiPnt7IGFwcGxpY2F0aW9uSW5mbz8uY3VycmVudFZlcnNpb24gfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLlvZPliY3niYjmnKzpg6jnvbLml7bpl7RcIj57e1xuICAgICAgICAgICAgICBhcHBsaWNhdGlvbkluZm8/LmN1cnJlbnREZXBsb3ltZW50RGF0ZSB8IGRhdGU6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuICAgICAgICAgICAgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLmnIDmlrDniYjmnKxcIj57eyBhcHBsaWNhdGlvbkluZm8/Lmxhc3RWZXJzaW9uIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMtaXRlbSBuelRpdGxlPVwi5pyA5paw54mI5pys5Y+R5biD5pe26Ze0XCI+e3tcbiAgICAgICAgICAgICAgYXBwbGljYXRpb25JbmZvPy5sYXN0UHVzaERhdGUgfCBkYXRlOiAneXl5eS1NTS1kZCBISDptbTpzcydcbiAgICAgICAgICAgIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICA8L256LWRlc2NyaXB0aW9ucz5cbiAgICAgICAgPC9uei1za2VsZXRvbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbnotbW9kYWw+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBMYXlvdXREZWZhdWx0TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBSZXVzZVRhYk1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4blBpcGUsXG4gICAgTnpEcm9wRG93bk1vZHVsZSxcbiAgICBOekF2YXRhck1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpNb2RhbE1vZHVsZSxcbiAgICBOelNrZWxldG9uTW9kdWxlLFxuICAgIE56RGVzY3JpcHRpb25zTW9kdWxlLFxuICAgIFRoZW1lQnRuTW9kdWxlLFxuICAgIFl1bnphaVdpZGdldHNNb2R1bGUsXG4gICAgWXVuemFpTmF2QXBwbGljYXRpb25Db21wb25lbnQsXG4gICAgWXVuemFpTGF5b3V0TmF2R3JvdXBDb21wb25lbnQsXG4gICAgWXVuemFpTGF5b3V0TmF2VGlsZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dEJhc2ljQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdG9tcCA9IGluamVjdChTdG9tcFNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbiA9IGluamVjdChXSU5ET1cpO1xuICBwcml2YXRlIHJlYWRvbmx5IGxheW91dERpc3BsYXlTZXJ2aWNlID0gaW5qZWN0KExheW91dERpc3BsYXlTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25mOiBZdW56YWlDb25maWcgPSBpbmplY3QoWVVOWkFJX0NPTkZJRyk7XG5cbiAgcHVibGljIE5hdlR5cGUgPSBOYXZUeXBlO1xuICBwcml2YXRlIHN0YXRlOiBMYXlvdXRCYXNpY1N0YXRlID0ge1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIGxvZ29FeHBhbmRlZDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgLFxuICAgICAgbG9nb0NvbGxhcHNlZDogYC4vYXNzZXRzL2xvZ28uc3ZnYFxuICAgIH0sXG4gICAgYXNpZGU6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgaW50cm86ICcnLFxuICAgICAgaWNvbjogJydcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgIG5hdjogdHJ1ZSxcbiAgICAgIGFzaWRlOiB0cnVlLFxuICAgICAgcmV1c2V0YWI6IHRydWVcbiAgICB9LFxuICAgIG5hdlR5cGU6IE5hdlR5cGUuQVBQTElDQVRJT05cbiAgfTtcblxuICBoZWFkZXJTdHlsZUxpc3Q6IFl1bnphaUhlYWRlclN0eWxlW10gPSBbXTtcblxuICBhcHBsaWNhdGlvbkluZm8hOiBBcHBsaWNhdGlvbkluZm9JbnRlcmZhY2U7XG5cbiAgYXBwbGljYXRpb25Nb2RhbCA9IHtcbiAgICBpc1Zpc2libGU6IGZhbHNlLFxuICAgIGxvYWRpbmc6IGZhbHNlXG4gIH07XG5cbiAgcHJpdmF0ZSByZWFkb25seSBodHRwQ2xpZW50ID0gaW5qZWN0KEh0dHBDbGllbnQpO1xuICBwcml2YXRlIGNvbmZpZyE6IFl1bnphaUJ1c2luZXNzQ29uZmlnO1xuXG4gIGdldCBvcHRpb25zKCk6IExheW91dERlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5vcHRpb25zO1xuICB9XG5cbiAgZ2V0IG5hdlR5cGUoKTogTmF2VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubmF2VHlwZTtcbiAgfVxuXG4gIGdldCBhc2lkZSgpOiBMYXlvdXRCYXNpY0FzaWRlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5hc2lkZTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5UmV1c2V0YWIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzcGxheS5yZXVzZXRhYjtcbiAgfVxuXG4gIGdldCByZXVzZXRhYkNTUygpOiBOelNhZmVBbnkge1xuICAgIGxldCBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge307XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRpc3BsYXkubmF2KSB7XG4gICAgICBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge1xuICAgICAgICAuLi5jYXNjYWRpbmdTdHlsZVNoZWV0LFxuICAgICAgICB0b3A6ICcwcHgnXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc3RhdGUuZGlzcGxheS5hc2lkZSkge1xuICAgICAgY2FzY2FkaW5nU3R5bGVTaGVldCA9IHtcbiAgICAgICAgLi4uY2FzY2FkaW5nU3R5bGVTaGVldCxcbiAgICAgICAgbGVmdDogJzBweCdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjYXNjYWRpbmdTdHlsZVNoZWV0O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmYuYmlzITtcbiAgICB0aGlzLmluaXRMb2dvKCk7XG4gICAgdGhpcy5pbml0RmF2aWNvbigpO1xuICAgIHRoaXMuaW5pdE5hdlR5cGUoKTtcbiAgICB0aGlzLmluaXRBc2lkZSgpO1xuICAgIHRoaXMuYWRkTGF5b3V0RGlzcGxheUxpc3RlbmVyKCk7XG4gICAgdGhpcy5zdG9tcC5saXN0ZW4oKTtcbiAgICB0aGlzLnRvSW5kZXgoKTtcbiAgfVxuXG4gIGluaXRGYXZpY29uKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgaWYgKHByb2plY3RJbmZvLmZhdmljb25VcmwpIHtcbiAgICAgIGhhc0Zhdmljb24ocHJvamVjdEluZm8uZmF2aWNvblVybCkudGhlbigoaGFzOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChoYXMpIHtcbiAgICAgICAgICBzZXRGYXZpY29uKHByb2plY3RJbmZvLmZhdmljb25VcmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEZhdmljb24oJy4vYXNzZXRzL2Zhdmljb24uaWNvJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRBc2lkZSgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRDdXJyZW50XSA9IHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQoKTtcbiAgICBjb25zdCBhc2lkZTogTGF5b3V0QmFzaWNBc2lkZSA9IGdldEN1cnJlbnQoKSE7XG4gICAgdGhpcy5zdGF0ZS5hc2lkZSA9IHsgLi4uYXNpZGUgfTtcbiAgfVxuXG4gIGluaXRMb2dvKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmxvZ29FeHBhbmRlZCA9IHByb2plY3RJbmZvLm1heExvZ29VcmwgPyBwcm9qZWN0SW5mby5tYXhMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgO1xuICAgIHRoaXMuc3RhdGUub3B0aW9ucy5sb2dvQ29sbGFwc2VkID0gcHJvamVjdEluZm8ubWluaUxvZ29VcmwgPyBwcm9qZWN0SW5mby5taW5pTG9nb1VybCA6IGAuL2Fzc2V0cy9sb2dvLnN2Z2A7XG4gIH1cblxuICBpbml0TmF2VHlwZSgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRIZWFkZXJUeXBlXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUoKTtcbiAgICBjb25zdCBbLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIGNvbnN0IG5hdlR5cGU6IE5hdlR5cGUgfCBudWxsID0gZ2V0SGVhZGVyVHlwZSgpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvOiBZdW56YWlQcm9qZWN0SW5mbyA9IGdldFByb2plY3RJbmZvKCkhO1xuICAgIGlmIChuYXZUeXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSBuYXZUeXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSBOYXZUeXBlLkFQUExJQ0FUSU9OO1xuICAgIH1cbiAgICBpZiAocHJvamVjdEluZm8uaGVhZGVyU3R5bGUgJiYgcHJvamVjdEluZm8uaGVhZGVyU3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5oZWFkZXJTdHlsZUxpc3QgPSBwcm9qZWN0SW5mby5oZWFkZXJTdHlsZTtcbiAgICAgIGNvbnN0IGhhc1RoaXMgPSB0aGlzLmhlYWRlclN0eWxlTGlzdC5zb21lKGl0ZW0gPT4gaXRlbS52YWx1ZSA9PT0gdGhpcy5zdGF0ZS5uYXZUeXBlKTtcbiAgICAgIGlmICghaGFzVGhpcykge1xuICAgICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSA8TmF2VHlwZT5wcm9qZWN0SW5mby5oZWFkZXJTdHlsZVswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgW3NldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgICAgICBzZXRIZWFkZXJUeXBlKHRoaXMuc3RhdGUubmF2VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9JbmRleCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXREZWZhdWx0Um91dGVdID0gdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlKCk7XG4gICAgY29uc3QgZGVmYXVsdFJvdXRlID0gZ2V0RGVmYXVsdFJvdXRlKCkhO1xuICAgIGxvZygnWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnQ6ICcsIGB0b2RvOiB0aGUgZGVmYXVsdCByb3V0ZSB3YXMgJHtkZWZhdWx0Um91dGV9LCDkvYbmmK/ov5jmsqHmg7Plpb3lpoLkvZXlrp7njrAuYCk7XG4gIH1cblxuICBvbk5hdlR5cGVDaGFuZ2UodHlwZTogTmF2VHlwZSB8IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IFtzZXRIZWFkZXJUeXBlXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUoKTtcbiAgICBzZXRIZWFkZXJUeXBlKDxOYXZUeXBlPnR5cGUpO1xuICAgIHRoaXMud2luLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgYWRkTGF5b3V0RGlzcGxheUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdyZXVzZVRhYicsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkucmV1c2V0YWIgPSBkaXNwbGF5O1xuICAgIH0pO1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCduYXYnLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5Lm5hdiA9IGRpc3BsYXk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbignYXNpZGUnLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5LmFzaWRlID0gZGlzcGxheTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIOWFs+S6juacrOW6lOeUqFxuICBhYm91dEFwcGxpY2F0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHVybEFyciA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9gKTtcbiAgICBpZiAodXJsQXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIOW6lOeUqOagh+ivhu+8jOaIquWPlui3r+W+hOS4rSAvYmFja3N0YWdlL+WQjuesrOS4gOS4quWtl+espuS4slxuICAgICAgLy8g5L6LOiBodHRwOi8vMjIyLjMwLjE5NC42MS9iYWNrc3RhZ2UvYXV0aC9wYWdlL29hZnBvcnRhbC8jL2Jhc2UvbWVudSAg5LitIGF1dGhcbiAgICAgIGNvbnN0IG5hbWUgPSB1cmxBcnJbMV0uc3BsaXQoJy8nKVswXTtcbiAgICAgIHRoaXMuYXBwbGljYXRpb25Nb2RhbC5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy5hcHBsaWNhdGlvbk1vZGFsLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGAvYmFzaWMvYXBpL2FwcC9hYm91dEFwcD9uYW1lPSR7bmFtZX1gKS5zdWJzY3JpYmUoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTW9kYWwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSW5mbyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk1vZGFsLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==