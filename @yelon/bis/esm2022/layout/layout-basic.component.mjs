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
                left: '24px'
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiLayoutBasicComponent, isStandalone: true, selector: "yunzai-layout-basic", ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: LayoutDefaultModule }, { kind: "component", type: i1.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: ReuseTabModule }, { kind: "component", type: i3.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "pipe", type: i4.DatePipe, name: "date" }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i5.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i6.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i6.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i7.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzModalModule }, { kind: "component", type: i9.NzModalComponent, selector: "nz-modal", inputs: ["nzMask", "nzMaskClosable", "nzCloseOnNavigation", "nzVisible", "nzClosable", "nzOkLoading", "nzOkDisabled", "nzCancelDisabled", "nzCancelLoading", "nzKeyboard", "nzNoAnimation", "nzCentered", "nzContent", "nzFooter", "nzZIndex", "nzWidth", "nzWrapClassName", "nzClassName", "nzStyle", "nzTitle", "nzCloseIcon", "nzMaskStyle", "nzBodyStyle", "nzOkText", "nzCancelText", "nzOkType", "nzOkDanger", "nzIconType", "nzModalType", "nzAutofocus", "nzOnOk", "nzOnCancel"], outputs: ["nzOnOk", "nzOnCancel", "nzAfterOpen", "nzAfterClose", "nzVisibleChange"], exportAs: ["nzModal"] }, { kind: "directive", type: i9.NzModalContentDirective, selector: "[nzModalContent]", exportAs: ["nzModalContent"] }, { kind: "ngmodule", type: NzSkeletonModule }, { kind: "component", type: i10.NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }, { kind: "ngmodule", type: NzDescriptionsModule }, { kind: "component", type: i11.NzDescriptionsComponent, selector: "nz-descriptions", inputs: ["nzBordered", "nzLayout", "nzColumn", "nzSize", "nzTitle", "nzExtra", "nzColon"], exportAs: ["nzDescriptions"] }, { kind: "component", type: i11.NzDescriptionsItemComponent, selector: "nz-descriptions-item", inputs: ["nzSpan", "nzTitle"], exportAs: ["nzDescriptionsItem"] }, { kind: "ngmodule", type: ThemeBtnModule }, { kind: "component", type: i12.ThemeBtnComponent, selector: "theme-btn", inputs: ["types", "devTips", "deployUrl"], outputs: ["themeChange"] }, { kind: "ngmodule", type: YunzaiWidgetsModule }, { kind: "component", type: i13.YunzaiHeaderClearStorageComponent, selector: "yunzai-header-clear-storage" }, { kind: "component", type: i13.YunzaiHeaderFullScreenComponent, selector: "yunzai-header-fullscreen" }, { kind: "component", type: i13.YunzaiHeaderNotifyComponent, selector: "yunzai-header-notify" }, { kind: "component", type: i13.YunzaiHeaderI18nComponent, selector: "yunzai-header-i18n", inputs: ["showLangText"] }, { kind: "component", type: i13.YunzaiHeaderUserComponent, selector: "yunzai-header-user" }, { kind: "component", type: YunzaiNavApplicationComponent, selector: "yunzai-layout-nav-application" }, { kind: "component", type: YunzaiLayoutNavGroupComponent, selector: "yunzai-layout-nav-group" }, { kind: "component", type: YunzaiLayoutNavTileComponent, selector: "yunzai-layout-nav-tile" }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBd0Isb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFHVixHQUFHLEVBQ0gsT0FBTyxFQUNQLFVBQVUsRUFDVixzQkFBc0IsRUFDdEIsMkJBQTJCLEVBQzNCLHlCQUF5QixFQUN6QiwwQkFBMEIsRUFDMUIsTUFBTSxFQUNOLGFBQWEsRUFLZCxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxF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QUFRLDRDQUNSLGdCQUFnQix5MkJBQ2hCLGNBQWMsZ1BBQ2QsWUFBWSxpTkFDWixhQUFhLGl5QkFDYixnQkFBZ0IsMk5BQ2hCLG9CQUFvQiwrWUFDcEIsY0FBYyw4S0FDZCxtQkFBbUIsc2lCQUNuQiw2QkFBNkIsMEVBQzdCLDZCQUE2QixvRUFDN0IsNEJBQTRCOzsyRkFHbkIsMEJBQTBCO2tCQXRLdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0lUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixRQUFRO3dCQUNSLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3FCQUM3QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBpbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgUmV1c2VUYWJNb2R1bGUgfSBmcm9tICdAeWVsb24vYWJjL3JldXNlLXRhYic7XG5pbXBvcnQgeyBZdW56YWlXaWRnZXRzTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jpcy95dW56YWktd2lkZ2V0cyc7XG5pbXBvcnQgeyBTdG9tcFNlcnZpY2UgfSBmcm9tICdAeWVsb24vc29ja2V0JztcbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IExheW91dERlZmF1bHRNb2R1bGUsIExheW91dERlZmF1bHRPcHRpb25zLCBMYXlvdXREaXNwbGF5U2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZS9sYXlvdXQtZGVmYXVsdCc7XG5pbXBvcnQgeyBUaGVtZUJ0bk1vZHVsZSB9IGZyb20gJ0B5ZWxvbi90aGVtZS90aGVtZS1idG4nO1xuaW1wb3J0IHtcbiAgaGFzRmF2aWNvbixcbiAgTGF5b3V0QmFzaWNBc2lkZSxcbiAgTGF5b3V0QmFzaWNEaXNwbGF5LFxuICBsb2csXG4gIE5hdlR5cGUsXG4gIHNldEZhdmljb24sXG4gIHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQsXG4gIHVzZUxvY2FsU3RvcmFnZURlZmF1bHRSb3V0ZSxcbiAgdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSxcbiAgdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8sXG4gIFdJTkRPVyxcbiAgWVVOWkFJX0NPTkZJRyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZyxcbiAgWXVuemFpSGVhZGVyU3R5bGUsXG4gIFl1bnphaVByb2plY3RJbmZvXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56QXZhdGFyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9hdmF0YXInO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56RGVzY3JpcHRpb25zTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kZXNjcmlwdGlvbnMnO1xuaW1wb3J0IHsgTnpEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56TW9kYWxNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL21vZGFsJztcbmltcG9ydCB7IE56U2tlbGV0b25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3NrZWxldG9uJztcblxuaW1wb3J0IHsgWXVuemFpTmF2QXBwbGljYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2xheW91dC1uYXYtYXBwbGljYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFl1bnphaUxheW91dE5hdkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtbmF2LWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZdW56YWlMYXlvdXROYXZUaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtbmF2LXRpbGUuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBMYXlvdXRCYXNpY1N0YXRlIHtcbiAgb3B0aW9uczogTGF5b3V0RGVmYXVsdE9wdGlvbnM7XG4gIGFzaWRlOiBMYXlvdXRCYXNpY0FzaWRlO1xuICBkaXNwbGF5OiBMYXlvdXRCYXNpY0Rpc3BsYXk7XG4gIG5hdlR5cGU6IE5hdlR5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb25JbmZvSW50ZXJmYWNlIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHNob3dOYW1lPzogc3RyaW5nO1xuICBsYXN0VmVyc2lvbj86IHN0cmluZztcbiAgdmVyc2lvbk51bT86IHN0cmluZztcbiAgY3VycmVudFZlcnNpb24/OiBzdHJpbmc7XG4gIGZpcnN0RGVwbG95bWVudERhdGU/OiBzdHJpbmc7XG4gIGN1cnJlbnREZXBsb3ltZW50RGF0ZT86IHN0cmluZztcbiAgbGFzdFB1c2hEYXRlPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktbGF5b3V0LWJhc2ljYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGF5b3V0LWRlZmF1bHQgW29wdGlvbnNdPVwib3B0aW9uc1wiIFthc2lkZVVzZXJdPVwiYXNpZGVVc2VyVHBsXCIgW2NvbnRlbnRdPVwiZGlzcGxheVJldXNldGFiID8gY29udGVudFRwbCA6IG5vbmVUcGxcIj5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJsZWZ0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm5hdlR5cGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkFQUExJQ0FUSU9OXCI+XG4gICAgICAgICAgICA8eXVuemFpLWxheW91dC1uYXYtYXBwbGljYXRpb24gLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkdST1VQXCI+XG4gICAgICAgICAgICA8eXVuemFpLWxheW91dC1uYXYtZ3JvdXAgLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLlRJTEVcIj5cbiAgICAgICAgICAgIDx5dW56YWktbGF5b3V0LW5hdi10aWxlIC8+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5CTEFOS1wiIC8+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5UQUJTXCIgLz5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgICA8eXVuemFpLWxheW91dC1uYXYtYXBwbGljYXRpb24gLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDx5dW56YWktaGVhZGVyLW5vdGlmeSAvPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbSBkaXJlY3Rpb249XCJyaWdodFwiIGhpZGRlbj1cIm1vYmlsZVwiPlxuICAgICAgICA8dGhlbWUtYnRuIC8+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9zZXR0aW5nc1wiXG4gICAgICAgICAgbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0tdHJpZ2dlclxuICAgICAgICAgIG56LWRyb3Bkb3duXG4gICAgICAgICAgW256RHJvcGRvd25NZW51XT1cInNldHRpbmdzTWVudVwiXG4gICAgICAgICAgbnpUcmlnZ2VyPVwiY2xpY2tcIlxuICAgICAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZXR0aW5nXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI3NldHRpbmdzTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgICAgPGRpdiBuei1tZW51IHN0eWxlPVwid2lkdGg6IDIwMHB4O1wiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9tb2RlXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICB7eyAnbW9kZS5uYXYnIHwgaTE4biB9fVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIEBpZiAoaGVhZGVyU3R5bGVMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgQGZvciAoaSBvZiBoZWFkZXJTdHlsZUxpc3Q7IHRyYWNrICRpbmRleCkge1xuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIlxuICAgICAgICAgICAgICAgICAgbnotbWVudS1pdGVtXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXR5cGVdPVwiaS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25OYXZUeXBlQ2hhbmdlKGkudmFsdWUpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJpLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuQVBQTElDQVRJT05cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImFwcHN0b3JlXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuR1JPVVBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImdyb3VwXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuVElMRVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZGFzaFwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkJMQU5LXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJib3JkZXJcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5UQUJTXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJpbnNlcnQtcm93LWFib3ZlXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImFwcHN0b3JlXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIHt7ICdtb2RlLm5hdi4nICsgaS52YWx1ZSB8IGkxOG4gfX1cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfZnVsbHNjcmVlblwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1oZWFkZXItZnVsbHNjcmVlbiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2NsZWFyc3RvcmFnZVwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1oZWFkZXItY2xlYXItc3RvcmFnZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2kxOG5cIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIDx5dW56YWktaGVhZGVyLWkxOG4gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgIDx5dW56YWktaGVhZGVyLXVzZXIgLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgPC9sYXlvdXQtZGVmYXVsdD5cbiAgICA8bmctdGVtcGxhdGUgI2FzaWRlVXNlclRwbD5cbiAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9yb3V0ZV91c2VyXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtdXNlclwiPlxuICAgICAgICA8bnotYXZhdGFyIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLXVzZXItYXZhdGFyXCIgW256U3JjXT1cImFzaWRlLmljb25cIiAoY2xpY2spPVwiYWJvdXRBcHBsaWNhdGlvbigpXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWluZm9cIiBuei1kcm9wZG93biBuelRyaWdnZXI9XCJjbGlja1wiIFtuekRyb3Bkb3duTWVudV09XCJ1c2VyTWVudVwiPlxuICAgICAgICAgIDxzdHJvbmc+e3sgYXNpZGUubmFtZSB8IGkxOG4gfX08L3N0cm9uZz5cbiAgICAgICAgICA8cCBjbGFzcz1cIm1iMFwiPnt7IGFzaWRlLmludHJvIHwgaTE4biB9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgIDxsaSBkYXRhLWV2ZW50LWlkPVwiX3JvdXRlX2JhY2tob21lXCIgbnotbWVudS1pdGVtIHJvdXRlckxpbms9XCIvXCI+e3sgJ2JhY2suaG9tZScgfCBpMThuIH19PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRwbD5cbiAgICAgIDxyZXVzZS10YWIgI3JldXNlVGFiIFtuZ1N0eWxlXT1cInJldXNldGFiQ1NTXCIgLz5cbiAgICAgIDxyb3V0ZXItb3V0bGV0IChhY3RpdmF0ZSk9XCJyZXVzZVRhYi5hY3RpdmF0ZSgkZXZlbnQpXCIgKGF0dGFjaCk9XCJyZXVzZVRhYi5hY3RpdmF0ZSgkZXZlbnQpXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjbm9uZVRwbD5cbiAgICAgIDxyb3V0ZXItb3V0bGV0IC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuei1tb2RhbFxuICAgICAgbnpUaXRsZT1cIuWFs+S6juacrOW6lOeUqFwiXG4gICAgICBbKG56VmlzaWJsZSldPVwiYXBwbGljYXRpb25Nb2RhbC5pc1Zpc2libGVcIlxuICAgICAgW256T2tUZXh0XT1cIm51bGxcIlxuICAgICAgW256Q2FuY2VsVGV4dF09XCIn5YWz6ZetJ1wiXG4gICAgICBbbnpXaWR0aF09XCI3MDBcIlxuICAgICAgKG56T25DYW5jZWwpPVwiYXBwbGljYXRpb25Nb2RhbC5pc1Zpc2libGUgPSBmYWxzZVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpNb2RhbENvbnRlbnQ+XG4gICAgICAgIDxuei1za2VsZXRvbiBbbnpMb2FkaW5nXT1cImFwcGxpY2F0aW9uTW9kYWwubG9hZGluZ1wiIFtuekFjdGl2ZV09XCJ0cnVlXCI+XG4gICAgICAgICAgPG56LWRlc2NyaXB0aW9ucyBuekJvcmRlcmVkIFtuelNpemVdPVwiJ21pZGRsZSdcIiBbbnpDb2x1bW5dPVwieyB4eGw6IDIsIHhsOiAyLCBsZzogMiwgbWQ6IDIsIHNtOiAyLCB4czogMSB9XCI+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuW6lOeUqOWQjeensFwiPnt7IGFwcGxpY2F0aW9uSW5mbz8uc2hvd05hbWUgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLlupTnlKjmoIfor4ZcIj57eyBhcHBsaWNhdGlvbkluZm8/Lm5hbWUgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLniYjmnKzmgLvmlbBcIj57eyBhcHBsaWNhdGlvbkluZm8/LnZlcnNpb25OdW0gfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLlupTnlKjpppbmrKHpg6jnvbLml7bpl7RcIj57e1xuICAgICAgICAgICAgICBhcHBsaWNhdGlvbkluZm8/LmZpcnN0RGVwbG95bWVudERhdGUgfCBkYXRlOiAneXl5eS1NTS1kZCBISDptbTpzcydcbiAgICAgICAgICAgIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMtaXRlbSBuelRpdGxlPVwi5b2T5YmN54mI5pysXCI+e3sgYXBwbGljYXRpb25JbmZvPy5jdXJyZW50VmVyc2lvbiB9fTwvbnotZGVzY3JpcHRpb25zLWl0ZW0+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuW9k+WJjeeJiOacrOmDqOe9suaXtumXtFwiPnt7XG4gICAgICAgICAgICAgIGFwcGxpY2F0aW9uSW5mbz8uY3VycmVudERlcGxveW1lbnREYXRlIHwgZGF0ZTogJ3l5eXktTU0tZGQgSEg6bW06c3MnXG4gICAgICAgICAgICB9fTwvbnotZGVzY3JpcHRpb25zLWl0ZW0+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuacgOaWsOeJiOacrFwiPnt7IGFwcGxpY2F0aW9uSW5mbz8ubGFzdFZlcnNpb24gfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLmnIDmlrDniYjmnKzlj5HluIPml7bpl7RcIj57e1xuICAgICAgICAgICAgICBhcHBsaWNhdGlvbkluZm8/Lmxhc3RQdXNoRGF0ZSB8IGRhdGU6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuICAgICAgICAgICAgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgIDwvbnotZGVzY3JpcHRpb25zPlxuICAgICAgICA8L256LXNrZWxldG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uei1tb2RhbD5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIExheW91dERlZmF1bHRNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFJldXNlVGFiTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuUGlwZSxcbiAgICBOekRyb3BEb3duTW9kdWxlLFxuICAgIE56QXZhdGFyTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek1vZGFsTW9kdWxlLFxuICAgIE56U2tlbGV0b25Nb2R1bGUsXG4gICAgTnpEZXNjcmlwdGlvbnNNb2R1bGUsXG4gICAgVGhlbWVCdG5Nb2R1bGUsXG4gICAgWXVuemFpV2lkZ2V0c01vZHVsZSxcbiAgICBZdW56YWlOYXZBcHBsaWNhdGlvbkNvbXBvbmVudCxcbiAgICBZdW56YWlMYXlvdXROYXZHcm91cENvbXBvbmVudCxcbiAgICBZdW56YWlMYXlvdXROYXZUaWxlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0b21wID0gaW5qZWN0KFN0b21wU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luID0gaW5qZWN0KFdJTkRPVyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGF5b3V0RGlzcGxheVNlcnZpY2UgPSBpbmplY3QoTGF5b3V0RGlzcGxheVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmY6IFl1bnphaUNvbmZpZyA9IGluamVjdChZVU5aQUlfQ09ORklHKTtcblxuICBwdWJsaWMgTmF2VHlwZSA9IE5hdlR5cGU7XG4gIHByaXZhdGUgc3RhdGU6IExheW91dEJhc2ljU3RhdGUgPSB7XG4gICAgb3B0aW9uczoge1xuICAgICAgbG9nb0V4cGFuZGVkOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2AsXG4gICAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgXG4gICAgfSxcbiAgICBhc2lkZToge1xuICAgICAgbmFtZTogJycsXG4gICAgICBpbnRybzogJycsXG4gICAgICBpY29uOiAnJ1xuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgbmF2OiB0cnVlLFxuICAgICAgYXNpZGU6IHRydWUsXG4gICAgICByZXVzZXRhYjogdHJ1ZVxuICAgIH0sXG4gICAgbmF2VHlwZTogTmF2VHlwZS5BUFBMSUNBVElPTlxuICB9O1xuXG4gIGhlYWRlclN0eWxlTGlzdDogWXVuemFpSGVhZGVyU3R5bGVbXSA9IFtdO1xuXG4gIGFwcGxpY2F0aW9uSW5mbyE6IEFwcGxpY2F0aW9uSW5mb0ludGVyZmFjZTtcblxuICBhcHBsaWNhdGlvbk1vZGFsID0ge1xuICAgIGlzVmlzaWJsZTogZmFsc2UsXG4gICAgbG9hZGluZzogZmFsc2VcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGh0dHBDbGllbnQgPSBpbmplY3QoSHR0cENsaWVudCk7XG4gIHByaXZhdGUgY29uZmlnITogWXVuemFpQnVzaW5lc3NDb25maWc7XG5cbiAgZ2V0IG9wdGlvbnMoKTogTGF5b3V0RGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm9wdGlvbnM7XG4gIH1cblxuICBnZXQgbmF2VHlwZSgpOiBOYXZUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5uYXZUeXBlO1xuICB9XG5cbiAgZ2V0IGFzaWRlKCk6IExheW91dEJhc2ljQXNpZGUge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFzaWRlO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlSZXVzZXRhYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5kaXNwbGF5LnJldXNldGFiO1xuICB9XG5cbiAgZ2V0IHJldXNldGFiQ1NTKCk6IE56U2FmZUFueSB7XG4gICAgbGV0IGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7fTtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZGlzcGxheS5uYXYpIHtcbiAgICAgIGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7XG4gICAgICAgIC4uLmNhc2NhZGluZ1N0eWxlU2hlZXQsXG4gICAgICAgIHRvcDogJzBweCdcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghdGhpcy5zdGF0ZS5kaXNwbGF5LmFzaWRlKSB7XG4gICAgICBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge1xuICAgICAgICAuLi5jYXNjYWRpbmdTdHlsZVNoZWV0LFxuICAgICAgICBsZWZ0OiAnMjRweCdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjYXNjYWRpbmdTdHlsZVNoZWV0O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmYuYmlzITtcbiAgICB0aGlzLmluaXRMb2dvKCk7XG4gICAgdGhpcy5pbml0RmF2aWNvbigpO1xuICAgIHRoaXMuaW5pdE5hdlR5cGUoKTtcbiAgICB0aGlzLmluaXRBc2lkZSgpO1xuICAgIHRoaXMuYWRkTGF5b3V0RGlzcGxheUxpc3RlbmVyKCk7XG4gICAgdGhpcy5zdG9tcC5saXN0ZW4oKTtcbiAgICB0aGlzLnRvSW5kZXgoKTtcbiAgfVxuXG4gIGluaXRGYXZpY29uKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgaWYgKHByb2plY3RJbmZvLmZhdmljb25VcmwpIHtcbiAgICAgIGhhc0Zhdmljb24ocHJvamVjdEluZm8uZmF2aWNvblVybCkudGhlbigoaGFzOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChoYXMpIHtcbiAgICAgICAgICBzZXRGYXZpY29uKHByb2plY3RJbmZvLmZhdmljb25VcmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEZhdmljb24oJy4vYXNzZXRzL2Zhdmljb24uaWNvJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRBc2lkZSgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRDdXJyZW50XSA9IHVzZUxvY2FsU3RvcmFnZUN1cnJlbnQoKTtcbiAgICBjb25zdCBhc2lkZTogTGF5b3V0QmFzaWNBc2lkZSA9IGdldEN1cnJlbnQoKSE7XG4gICAgdGhpcy5zdGF0ZS5hc2lkZSA9IHsgLi4uYXNpZGUgfTtcbiAgfVxuXG4gIGluaXRMb2dvKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmxvZ29FeHBhbmRlZCA9IHByb2plY3RJbmZvLm1heExvZ29VcmwgPyBwcm9qZWN0SW5mby5tYXhMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgO1xuICAgIHRoaXMuc3RhdGUub3B0aW9ucy5sb2dvQ29sbGFwc2VkID0gcHJvamVjdEluZm8ubWluaUxvZ29VcmwgPyBwcm9qZWN0SW5mby5taW5pTG9nb1VybCA6IGAuL2Fzc2V0cy9sb2dvLnN2Z2A7XG4gIH1cblxuICBpbml0TmF2VHlwZSgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRIZWFkZXJUeXBlXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUoKTtcbiAgICBjb25zdCBbLCBnZXRQcm9qZWN0SW5mb10gPSB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbygpO1xuICAgIGNvbnN0IG5hdlR5cGU6IE5hdlR5cGUgfCBudWxsID0gZ2V0SGVhZGVyVHlwZSgpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvOiBZdW56YWlQcm9qZWN0SW5mbyA9IGdldFByb2plY3RJbmZvKCkhO1xuICAgIGlmIChuYXZUeXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSBuYXZUeXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSBOYXZUeXBlLkFQUExJQ0FUSU9OO1xuICAgIH1cbiAgICBpZiAocHJvamVjdEluZm8uaGVhZGVyU3R5bGUgJiYgcHJvamVjdEluZm8uaGVhZGVyU3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5oZWFkZXJTdHlsZUxpc3QgPSBwcm9qZWN0SW5mby5oZWFkZXJTdHlsZTtcbiAgICAgIGNvbnN0IGhhc1RoaXMgPSB0aGlzLmhlYWRlclN0eWxlTGlzdC5zb21lKGl0ZW0gPT4gaXRlbS52YWx1ZSA9PT0gdGhpcy5zdGF0ZS5uYXZUeXBlKTtcbiAgICAgIGlmICghaGFzVGhpcykge1xuICAgICAgICB0aGlzLnN0YXRlLm5hdlR5cGUgPSA8TmF2VHlwZT5wcm9qZWN0SW5mby5oZWFkZXJTdHlsZVswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgW3NldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgICAgICBzZXRIZWFkZXJUeXBlKHRoaXMuc3RhdGUubmF2VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9JbmRleCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXREZWZhdWx0Um91dGVdID0gdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlKCk7XG4gICAgY29uc3QgZGVmYXVsdFJvdXRlID0gZ2V0RGVmYXVsdFJvdXRlKCkhO1xuICAgIGxvZygnWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnQ6ICcsIGB0b2RvOiB0aGUgZGVmYXVsdCByb3V0ZSB3YXMgJHtkZWZhdWx0Um91dGV9LCDkvYbmmK/ov5jmsqHmg7Plpb3lpoLkvZXlrp7njrAuYCk7XG4gIH1cblxuICBvbk5hdlR5cGVDaGFuZ2UodHlwZTogTmF2VHlwZSB8IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IFtzZXRIZWFkZXJUeXBlXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlclR5cGUoKTtcbiAgICBzZXRIZWFkZXJUeXBlKDxOYXZUeXBlPnR5cGUpO1xuICAgIHRoaXMud2luLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgYWRkTGF5b3V0RGlzcGxheUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdyZXVzZVRhYicsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkucmV1c2V0YWIgPSBkaXNwbGF5O1xuICAgIH0pO1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCduYXYnLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5Lm5hdiA9IGRpc3BsYXk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbignYXNpZGUnLCAoZGlzcGxheTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5kaXNwbGF5LmFzaWRlID0gZGlzcGxheTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIOWFs+S6juacrOW6lOeUqFxuICBhYm91dEFwcGxpY2F0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHVybEFyciA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9gKTtcbiAgICBpZiAodXJsQXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIOW6lOeUqOagh+ivhu+8jOaIquWPlui3r+W+hOS4rSAvYmFja3N0YWdlL+WQjuesrOS4gOS4quWtl+espuS4slxuICAgICAgLy8g5L6LOiBodHRwOi8vMjIyLjMwLjE5NC42MS9iYWNrc3RhZ2UvYXV0aC9wYWdlL29hZnBvcnRhbC8jL2Jhc2UvbWVudSAg5LitIGF1dGhcbiAgICAgIGNvbnN0IG5hbWUgPSB1cmxBcnJbMV0uc3BsaXQoJy8nKVswXTtcbiAgICAgIHRoaXMuYXBwbGljYXRpb25Nb2RhbC5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy5hcHBsaWNhdGlvbk1vZGFsLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGAvYmFzaWMvYXBpL2FwcC9hYm91dEFwcD9uYW1lPSR7bmFtZX1gKS5zdWJzY3JpYmUoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTW9kYWwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSW5mbyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk1vZGFsLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==