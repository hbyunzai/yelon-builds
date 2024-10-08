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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutBasicComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.6", type: YunzaiLayoutBasicComponent, isStandalone: true, selector: "yunzai-layout-basic", ngImport: i0, template: `
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
        <nz-avatar
          class="yunzai-default__aside-user-avatar"
          [nzSize]="40"
          [nzSrc]="aside.icon"
          (click)="aboutApplication()"
        />
        <div class="yunzai-default__aside-user-info" nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu">
          <strong>{{ aside.name | i18n }}</strong>
          <p>{{ aside.intro | i18n }}</p>
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutBasicComponent, decorators: [{
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
        <nz-avatar
          class="yunzai-default__aside-user-avatar"
          [nzSize]="40"
          [nzSrc]="aside.icon"
          (click)="aboutApplication()"
        />
        <div class="yunzai-default__aside-user-info" nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu">
          <strong>{{ aside.name | i18n }}</strong>
          <p>{{ aside.intro | i18n }}</p>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWJhc2ljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0LWJhc2ljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBd0Isb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFHVixHQUFHLEVBQ0gsT0FBTyxFQUNQLFVBQVUsRUFDVixzQkFBc0IsRUFDdEIsMkJBQTJCLEVBQzNCLHlCQUF5QixFQUN6QiwwQkFBMEIsRUFDMUIsTUFBTSxFQUNOLGFBQWEsRUFLZCxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxF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YUFDWixRQUFRLDRDQUNSLGdCQUFnQix5MkJBQ2hCLGNBQWMsZ1BBQ2QsWUFBWSxpTkFDWixhQUFhLGd6QkFDYixnQkFBZ0IsMk5BQ2hCLG9CQUFvQiwrWUFDcEIsY0FBYyw4S0FDZCxtQkFBbUIsc2lCQUNuQiw2QkFBNkIsMEVBQzdCLDZCQUE2QixvRUFDN0IsNEJBQTRCOzsyRkFHbkIsMEJBQTBCO2tCQTNLdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvSlQ7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsY0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0IsNkJBQTZCO3dCQUM3Qiw0QkFBNEI7cUJBQzdCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIGluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBSZXVzZVRhYk1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9hYmMvcmV1c2UtdGFiJztcbmltcG9ydCB7IFl1bnphaVdpZGdldHNNb2R1bGUgfSBmcm9tICdAeWVsb24vYmlzL3l1bnphaS13aWRnZXRzJztcbmltcG9ydCB7IFN0b21wU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9zb2NrZXQnO1xuaW1wb3J0IHsgSTE4blBpcGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdE1vZHVsZSwgTGF5b3V0RGVmYXVsdE9wdGlvbnMsIExheW91dERpc3BsYXlTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lL2xheW91dC1kZWZhdWx0JztcbmltcG9ydCB7IFRoZW1lQnRuTW9kdWxlIH0gZnJvbSAnQHllbG9uL3RoZW1lL3RoZW1lLWJ0bic7XG5pbXBvcnQge1xuICBoYXNGYXZpY29uLFxuICBMYXlvdXRCYXNpY0FzaWRlLFxuICBMYXlvdXRCYXNpY0Rpc3BsYXksXG4gIGxvZyxcbiAgTmF2VHlwZSxcbiAgc2V0RmF2aWNvbixcbiAgdXNlTG9jYWxTdG9yYWdlQ3VycmVudCxcbiAgdXNlTG9jYWxTdG9yYWdlRGVmYXVsdFJvdXRlLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXJUeXBlLFxuICB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbyxcbiAgV0lORE9XLFxuICBZVU5aQUlfQ09ORklHLFxuICBZdW56YWlCdXNpbmVzc0NvbmZpZyxcbiAgWXVuemFpQ29uZmlnLFxuICBZdW56YWlIZWFkZXJTdHlsZSxcbiAgWXVuemFpUHJvamVjdEluZm9cbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpBdmF0YXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2F2YXRhcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpEZXNjcmlwdGlvbnNNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Rlc2NyaXB0aW9ucyc7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpNb2RhbE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xuaW1wb3J0IHsgTnpTa2VsZXRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc2tlbGV0b24nO1xuXG5pbXBvcnQgeyBZdW56YWlOYXZBcHBsaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpTGF5b3V0TmF2R3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2xheW91dC1uYXYtZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IFl1bnphaUxheW91dE5hdlRpbGVDb21wb25lbnQgfSBmcm9tICcuL2xheW91dC1uYXYtdGlsZS5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExheW91dEJhc2ljU3RhdGUge1xuICBvcHRpb25zOiBMYXlvdXREZWZhdWx0T3B0aW9ucztcbiAgYXNpZGU6IExheW91dEJhc2ljQXNpZGU7XG4gIGRpc3BsYXk6IExheW91dEJhc2ljRGlzcGxheTtcbiAgbmF2VHlwZTogTmF2VHlwZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvbkluZm9JbnRlcmZhY2Uge1xuICBpZD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgc2hvd05hbWU/OiBzdHJpbmc7XG4gIGxhc3RWZXJzaW9uPzogc3RyaW5nO1xuICB2ZXJzaW9uTnVtPzogc3RyaW5nO1xuICBjdXJyZW50VmVyc2lvbj86IHN0cmluZztcbiAgZmlyc3REZXBsb3ltZW50RGF0ZT86IHN0cmluZztcbiAgY3VycmVudERlcGxveW1lbnREYXRlPzogc3RyaW5nO1xuICBsYXN0UHVzaERhdGU/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYHl1bnphaS1sYXlvdXQtYmFzaWNgLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYXlvdXQtZGVmYXVsdCBbb3B0aW9uc109XCJvcHRpb25zXCIgW2FzaWRlVXNlcl09XCJhc2lkZVVzZXJUcGxcIiBbY29udGVudF09XCJkaXNwbGF5UmV1c2V0YWIgPyBjb250ZW50VHBsIDogbm9uZVRwbFwiPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cImxlZnRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibmF2VHlwZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuQVBQTElDQVRJT05cIj5cbiAgICAgICAgICAgIDx5dW56YWktbGF5b3V0LW5hdi1hcHBsaWNhdGlvbiAvPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuR1JPVVBcIj5cbiAgICAgICAgICAgIDx5dW56YWktbGF5b3V0LW5hdi1ncm91cCAvPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuVElMRVwiPlxuICAgICAgICAgICAgPHl1bnphaS1sYXlvdXQtbmF2LXRpbGUgLz5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLkJMQU5LXCIgLz5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLlRBQlNcIiAvPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgICAgIDx5dW56YWktbGF5b3V0LW5hdi1hcHBsaWNhdGlvbiAvPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPHl1bnphaS1oZWFkZXItbm90aWZ5IC8+XG4gICAgICA8L2xheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtPlxuICAgICAgPGxheW91dC1kZWZhdWx0LWhlYWRlci1pdGVtIGRpcmVjdGlvbj1cInJpZ2h0XCIgaGlkZGVuPVwibW9iaWxlXCI+XG4gICAgICAgIDx0aGVtZS1idG4gLz5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIiBoaWRkZW49XCJtb2JpbGVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3NldHRpbmdzXCJcbiAgICAgICAgICBsYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbS10cmlnZ2VyXG4gICAgICAgICAgbnotZHJvcGRvd25cbiAgICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwic2V0dGluZ3NNZW51XCJcbiAgICAgICAgICBuelRyaWdnZXI9XCJjbGlja1wiXG4gICAgICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cInNldHRpbmdcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bnotZHJvcGRvd24tbWVudSAjc2V0dGluZ3NNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgICA8ZGl2IG56LW1lbnUgc3R5bGU9XCJ3aWR0aDogMjAwcHg7XCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X21vZGVcIiBuei1tZW51LWl0ZW0+XG4gICAgICAgICAgICAgIHt7ICdtb2RlLm5hdicgfCBpMThuIH19XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgQGlmIChoZWFkZXJTdHlsZUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBAZm9yIChpIG9mIGhlYWRlclN0eWxlTGlzdDsgdHJhY2sgJGluZGV4KSB7XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfbW9kZVwiXG4gICAgICAgICAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtdHlwZV09XCJpLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk5hdlR5cGVDaGFuZ2UoaS52YWx1ZSlcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImkudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5BUFBMSUNBVElPTlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYXBwc3RvcmVcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5HUk9VUFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZ3JvdXBcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiTmF2VHlwZS5USUxFXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJkYXNoXCIgY2xhc3M9XCJtci1zbVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIk5hdlR5cGUuQkxBTktcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImJvcmRlclwiIGNsYXNzPVwibXItc21cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJOYXZUeXBlLlRBQlNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImluc2VydC1yb3ctYWJvdmVcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYXBwc3RvcmVcIiBjbGFzcz1cIm1yLXNtXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAge3sgJ21vZGUubmF2LicgKyBpLnZhbHVlIHwgaTE4biB9fVxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9mdWxsc2NyZWVuXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWhlYWRlci1mdWxsc2NyZWVuIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfY2xlYXJzdG9yYWdlXCIgbnotbWVudS1pdGVtPlxuICAgICAgICAgICAgICA8eXVuemFpLWhlYWRlci1jbGVhci1zdG9yYWdlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfaTE4blwiIG56LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgPHl1bnphaS1oZWFkZXItaTE4biAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICAgIDwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0+XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyLWl0ZW0gZGlyZWN0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgPHl1bnphaS1oZWFkZXItdXNlciAvPlxuICAgICAgPC9sYXlvdXQtZGVmYXVsdC1oZWFkZXItaXRlbT5cbiAgICA8L2xheW91dC1kZWZhdWx0PlxuICAgIDxuZy10ZW1wbGF0ZSAjYXNpZGVVc2VyVHBsPlxuICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX3JvdXRlX3VzZXJcIiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyXCI+XG4gICAgICAgIDxuei1hdmF0YXJcbiAgICAgICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS11c2VyLWF2YXRhclwiXG4gICAgICAgICAgW256U2l6ZV09XCI0MFwiXG4gICAgICAgICAgW256U3JjXT1cImFzaWRlLmljb25cIlxuICAgICAgICAgIChjbGljayk9XCJhYm91dEFwcGxpY2F0aW9uKClcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLXVzZXItaW5mb1wiIG56LWRyb3Bkb3duIG56VHJpZ2dlcj1cImNsaWNrXCIgW256RHJvcGRvd25NZW51XT1cInVzZXJNZW51XCI+XG4gICAgICAgICAgPHN0cm9uZz57eyBhc2lkZS5uYW1lIHwgaTE4biB9fTwvc3Ryb25nPlxuICAgICAgICAgIDxwPnt7IGFzaWRlLmludHJvIHwgaTE4biB9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuei1kcm9wZG93bi1tZW51ICN1c2VyTWVudT1cIm56RHJvcGRvd25NZW51XCI+XG4gICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgIDxsaSBkYXRhLWV2ZW50LWlkPVwiX3JvdXRlX2JhY2tob21lXCIgbnotbWVudS1pdGVtIHJvdXRlckxpbms9XCIvXCI+e3sgJ2JhY2suaG9tZScgfCBpMThuIH19PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRwbD5cbiAgICAgIDxyZXVzZS10YWIgI3JldXNlVGFiIFtuZ1N0eWxlXT1cInJldXNldGFiQ1NTXCIgLz5cbiAgICAgIDxyb3V0ZXItb3V0bGV0IChhY3RpdmF0ZSk9XCJyZXVzZVRhYi5hY3RpdmF0ZSgkZXZlbnQpXCIgKGF0dGFjaCk9XCJyZXVzZVRhYi5hY3RpdmF0ZSgkZXZlbnQpXCIgLz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjbm9uZVRwbD5cbiAgICAgIDxyb3V0ZXItb3V0bGV0IC8+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuei1tb2RhbFxuICAgICAgbnpUaXRsZT1cIuWFs+S6juacrOW6lOeUqFwiXG4gICAgICBbKG56VmlzaWJsZSldPVwiYXBwbGljYXRpb25Nb2RhbC5pc1Zpc2libGVcIlxuICAgICAgW256T2tUZXh0XT1cIm51bGxcIlxuICAgICAgW256Q2FuY2VsVGV4dF09XCIn5YWz6ZetJ1wiXG4gICAgICBbbnpXaWR0aF09XCI3MDBcIlxuICAgICAgKG56T25DYW5jZWwpPVwiYXBwbGljYXRpb25Nb2RhbC5pc1Zpc2libGUgPSBmYWxzZVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpNb2RhbENvbnRlbnQ+XG4gICAgICAgIDxuei1za2VsZXRvbiBbbnpMb2FkaW5nXT1cImFwcGxpY2F0aW9uTW9kYWwubG9hZGluZ1wiIFtuekFjdGl2ZV09XCJ0cnVlXCI+XG4gICAgICAgICAgPG56LWRlc2NyaXB0aW9ucyBuekJvcmRlcmVkIFtuelNpemVdPVwiJ21pZGRsZSdcIiBbbnpDb2x1bW5dPVwieyB4eGw6IDIsIHhsOiAyLCBsZzogMiwgbWQ6IDIsIHNtOiAyLCB4czogMSB9XCI+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuW6lOeUqOWQjeensFwiPnt7IGFwcGxpY2F0aW9uSW5mbz8uc2hvd05hbWUgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLlupTnlKjmoIfor4ZcIj57eyBhcHBsaWNhdGlvbkluZm8/Lm5hbWUgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLniYjmnKzmgLvmlbBcIj57eyBhcHBsaWNhdGlvbkluZm8/LnZlcnNpb25OdW0gfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLlupTnlKjpppbmrKHpg6jnvbLml7bpl7RcIj57e1xuICAgICAgICAgICAgICBhcHBsaWNhdGlvbkluZm8/LmZpcnN0RGVwbG95bWVudERhdGUgfCBkYXRlOiAneXl5eS1NTS1kZCBISDptbTpzcydcbiAgICAgICAgICAgIH19PC9uei1kZXNjcmlwdGlvbnMtaXRlbT5cbiAgICAgICAgICAgIDxuei1kZXNjcmlwdGlvbnMtaXRlbSBuelRpdGxlPVwi5b2T5YmN54mI5pysXCI+e3sgYXBwbGljYXRpb25JbmZvPy5jdXJyZW50VmVyc2lvbiB9fTwvbnotZGVzY3JpcHRpb25zLWl0ZW0+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuW9k+WJjeeJiOacrOmDqOe9suaXtumXtFwiPnt7XG4gICAgICAgICAgICAgIGFwcGxpY2F0aW9uSW5mbz8uY3VycmVudERlcGxveW1lbnREYXRlIHwgZGF0ZTogJ3l5eXktTU0tZGQgSEg6bW06c3MnXG4gICAgICAgICAgICB9fTwvbnotZGVzY3JpcHRpb25zLWl0ZW0+XG4gICAgICAgICAgICA8bnotZGVzY3JpcHRpb25zLWl0ZW0gbnpUaXRsZT1cIuacgOaWsOeJiOacrFwiPnt7IGFwcGxpY2F0aW9uSW5mbz8ubGFzdFZlcnNpb24gfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgICAgPG56LWRlc2NyaXB0aW9ucy1pdGVtIG56VGl0bGU9XCLmnIDmlrDniYjmnKzlj5HluIPml7bpl7RcIj57e1xuICAgICAgICAgICAgICBhcHBsaWNhdGlvbkluZm8/Lmxhc3RQdXNoRGF0ZSB8IGRhdGU6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuICAgICAgICAgICAgfX08L256LWRlc2NyaXB0aW9ucy1pdGVtPlxuICAgICAgICAgIDwvbnotZGVzY3JpcHRpb25zPlxuICAgICAgICA8L256LXNrZWxldG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uei1tb2RhbD5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIExheW91dERlZmF1bHRNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFJldXNlVGFiTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuUGlwZSxcbiAgICBOekRyb3BEb3duTW9kdWxlLFxuICAgIE56QXZhdGFyTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek1vZGFsTW9kdWxlLFxuICAgIE56U2tlbGV0b25Nb2R1bGUsXG4gICAgTnpEZXNjcmlwdGlvbnNNb2R1bGUsXG4gICAgVGhlbWVCdG5Nb2R1bGUsXG4gICAgWXVuemFpV2lkZ2V0c01vZHVsZSxcbiAgICBZdW56YWlOYXZBcHBsaWNhdGlvbkNvbXBvbmVudCxcbiAgICBZdW56YWlMYXlvdXROYXZHcm91cENvbXBvbmVudCxcbiAgICBZdW56YWlMYXlvdXROYXZUaWxlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0b21wID0gaW5qZWN0KFN0b21wU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luID0gaW5qZWN0KFdJTkRPVyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGF5b3V0RGlzcGxheVNlcnZpY2UgPSBpbmplY3QoTGF5b3V0RGlzcGxheVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmY6IFl1bnphaUNvbmZpZyA9IGluamVjdChZVU5aQUlfQ09ORklHKTtcblxuICBwdWJsaWMgTmF2VHlwZSA9IE5hdlR5cGU7XG4gIHByaXZhdGUgc3RhdGU6IExheW91dEJhc2ljU3RhdGUgPSB7XG4gICAgb3B0aW9uczoge1xuICAgICAgbG9nb0V4cGFuZGVkOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2AsXG4gICAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgXG4gICAgfSxcbiAgICBhc2lkZToge1xuICAgICAgbmFtZTogJycsXG4gICAgICBpbnRybzogJycsXG4gICAgICBpY29uOiAnJ1xuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgbmF2OiB0cnVlLFxuICAgICAgYXNpZGU6IHRydWUsXG4gICAgICByZXVzZXRhYjogdHJ1ZVxuICAgIH0sXG4gICAgbmF2VHlwZTogTmF2VHlwZS5BUFBMSUNBVElPTlxuICB9O1xuXG4gIGhlYWRlclN0eWxlTGlzdDogWXVuemFpSGVhZGVyU3R5bGVbXSA9IFtdO1xuXG4gIGFwcGxpY2F0aW9uSW5mbyE6IEFwcGxpY2F0aW9uSW5mb0ludGVyZmFjZTtcblxuICBhcHBsaWNhdGlvbk1vZGFsID0ge1xuICAgIGlzVmlzaWJsZTogZmFsc2UsXG4gICAgbG9hZGluZzogZmFsc2VcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGh0dHBDbGllbnQgPSBpbmplY3QoSHR0cENsaWVudCk7XG4gIHByaXZhdGUgY29uZmlnITogWXVuemFpQnVzaW5lc3NDb25maWc7XG5cbiAgZ2V0IG9wdGlvbnMoKTogTGF5b3V0RGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm9wdGlvbnM7XG4gIH1cblxuICBnZXQgbmF2VHlwZSgpOiBOYXZUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5uYXZUeXBlO1xuICB9XG5cbiAgZ2V0IGFzaWRlKCk6IExheW91dEJhc2ljQXNpZGUge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFzaWRlO1xuICB9XG5cbiAgZ2V0IGRpc3BsYXlSZXVzZXRhYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5kaXNwbGF5LnJldXNldGFiO1xuICB9XG5cbiAgZ2V0IHJldXNldGFiQ1NTKCk6IE56U2FmZUFueSB7XG4gICAgbGV0IGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7fTtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZGlzcGxheS5uYXYpIHtcbiAgICAgIGNhc2NhZGluZ1N0eWxlU2hlZXQgPSB7XG4gICAgICAgIC4uLmNhc2NhZGluZ1N0eWxlU2hlZXQsXG4gICAgICAgIHRvcDogJzBweCdcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghdGhpcy5zdGF0ZS5kaXNwbGF5LmFzaWRlKSB7XG4gICAgICBjYXNjYWRpbmdTdHlsZVNoZWV0ID0ge1xuICAgICAgICAuLi5jYXNjYWRpbmdTdHlsZVNoZWV0LFxuICAgICAgICBsZWZ0OiAnMHB4J1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNhc2NhZGluZ1N0eWxlU2hlZXQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZi5iaXMhO1xuICAgIHRoaXMuaW5pdExvZ28oKTtcbiAgICB0aGlzLmluaXRGYXZpY29uKCk7XG4gICAgdGhpcy5pbml0TmF2VHlwZSgpO1xuICAgIHRoaXMuaW5pdEFzaWRlKCk7XG4gICAgdGhpcy5hZGRMYXlvdXREaXNwbGF5TGlzdGVuZXIoKTtcbiAgICB0aGlzLnN0b21wLmxpc3RlbigpO1xuICAgIHRoaXMudG9JbmRleCgpO1xuICB9XG5cbiAgaW5pdEZhdmljb24oKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICBpZiAocHJvamVjdEluZm8uZmF2aWNvblVybCkge1xuICAgICAgaGFzRmF2aWNvbihwcm9qZWN0SW5mby5mYXZpY29uVXJsKS50aGVuKChoYXM6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGhhcykge1xuICAgICAgICAgIHNldEZhdmljb24ocHJvamVjdEluZm8uZmF2aWNvblVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RmF2aWNvbignLi9hc3NldHMvZmF2aWNvbi5pY28nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEFzaWRlKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldEN1cnJlbnRdID0gdXNlTG9jYWxTdG9yYWdlQ3VycmVudCgpO1xuICAgIGNvbnN0IGFzaWRlOiBMYXlvdXRCYXNpY0FzaWRlID0gZ2V0Q3VycmVudCgpITtcbiAgICB0aGlzLnN0YXRlLmFzaWRlID0geyAuLi5hc2lkZSB9O1xuICB9XG5cbiAgaW5pdExvZ28oKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0UHJvamVjdEluZm9dID0gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mbzogWXVuemFpUHJvamVjdEluZm8gPSBnZXRQcm9qZWN0SW5mbygpITtcbiAgICB0aGlzLnN0YXRlLm9wdGlvbnMubG9nb0V4cGFuZGVkID0gcHJvamVjdEluZm8ubWF4TG9nb1VybCA/IHByb2plY3RJbmZvLm1heExvZ29VcmwgOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2A7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmxvZ29Db2xsYXBzZWQgPSBwcm9qZWN0SW5mby5taW5pTG9nb1VybCA/IHByb2plY3RJbmZvLm1pbmlMb2dvVXJsIDogYC4vYXNzZXRzL2xvZ28uc3ZnYDtcbiAgfVxuXG4gIGluaXROYXZUeXBlKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgIGNvbnN0IFssIGdldFByb2plY3RJbmZvXSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgY29uc3QgbmF2VHlwZTogTmF2VHlwZSB8IG51bGwgPSBnZXRIZWFkZXJUeXBlKCk7XG4gICAgY29uc3QgcHJvamVjdEluZm86IFl1bnphaVByb2plY3RJbmZvID0gZ2V0UHJvamVjdEluZm8oKSE7XG4gICAgaWYgKG5hdlR5cGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc3RhdGUubmF2VHlwZSA9IG5hdlR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUubmF2VHlwZSA9IE5hdlR5cGUuQVBQTElDQVRJT047XG4gICAgfVxuICAgIGlmIChwcm9qZWN0SW5mby5oZWFkZXJTdHlsZSAmJiBwcm9qZWN0SW5mby5oZWFkZXJTdHlsZS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmhlYWRlclN0eWxlTGlzdCA9IHByb2plY3RJbmZvLmhlYWRlclN0eWxlO1xuICAgICAgY29uc3QgaGFzVGhpcyA9IHRoaXMuaGVhZGVyU3R5bGVMaXN0LnNvbWUoaXRlbSA9PiBpdGVtLnZhbHVlID09PSB0aGlzLnN0YXRlLm5hdlR5cGUpO1xuICAgICAgaWYgKCFoYXNUaGlzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUubmF2VHlwZSA9IDxOYXZUeXBlPnByb2plY3RJbmZvLmhlYWRlclN0eWxlWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCBbc2V0SGVhZGVyVHlwZV0gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXJUeXBlKCk7XG4gICAgICAgIHNldEhlYWRlclR5cGUodGhpcy5zdGF0ZS5uYXZUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b0luZGV4KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldERlZmF1bHRSb3V0ZV0gPSB1c2VMb2NhbFN0b3JhZ2VEZWZhdWx0Um91dGUoKTtcbiAgICBjb25zdCBkZWZhdWx0Um91dGUgPSBnZXREZWZhdWx0Um91dGUoKSE7XG4gICAgbG9nKCdZdW56YWlMYXlvdXRCYXNpY0NvbXBvbmVudDogJywgYHRvZG86IHRoZSBkZWZhdWx0IHJvdXRlIHdhcyAke2RlZmF1bHRSb3V0ZX0sIOS9huaYr+i/mOayoeaDs+WlveWmguS9leWunueOsC5gKTtcbiAgfVxuXG4gIG9uTmF2VHlwZUNoYW5nZSh0eXBlOiBOYXZUeXBlIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgW3NldEhlYWRlclR5cGVdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpO1xuICAgIHNldEhlYWRlclR5cGUoPE5hdlR5cGU+dHlwZSk7XG4gICAgdGhpcy53aW4ubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBhZGRMYXlvdXREaXNwbGF5TGlzdGVuZXIoKTogdm9pZCB7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ3JldXNlVGFiJywgKGRpc3BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuc3RhdGUuZGlzcGxheS5yZXVzZXRhYiA9IGRpc3BsYXk7XG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ25hdicsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkubmF2ID0gZGlzcGxheTtcbiAgICB9KTtcblxuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdhc2lkZScsIChkaXNwbGF5OiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLmRpc3BsYXkuYXNpZGUgPSBkaXNwbGF5O1xuICAgIH0pO1xuICB9XG5cbiAgLy8g5YWz5LqO5pys5bqU55SoXG4gIGFib3V0QXBwbGljYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgdXJsQXJyID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KGAke3RoaXMuY29uZmlnLmJhc2VVcmx9L2ApO1xuICAgIGlmICh1cmxBcnIubGVuZ3RoID4gMSkge1xuICAgICAgLy8g5bqU55So5qCH6K+G77yM5oiq5Y+W6Lev5b6E5LitIC9iYWNrc3RhZ2Uv5ZCO56ys5LiA5Liq5a2X56ym5LiyXG4gICAgICAvLyDkvos6IGh0dHA6Ly8yMjIuMzAuMTk0LjYxL2JhY2tzdGFnZS9hdXRoL3BhZ2Uvb2FmcG9ydGFsLyMvYmFzZS9tZW51ICDkuK0gYXV0aFxuICAgICAgY29uc3QgbmFtZSA9IHVybEFyclsxXS5zcGxpdCgnLycpWzBdO1xuICAgICAgdGhpcy5hcHBsaWNhdGlvbk1vZGFsLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmFwcGxpY2F0aW9uTW9kYWwubG9hZGluZyA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb25cbiAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoYC9iYXNpYy9hcGkvYXBwL2Fib3V0QXBwP25hbWU9JHtuYW1lfWApLnN1YnNjcmliZShcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25Nb2RhbC5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JbmZvID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTW9kYWwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19