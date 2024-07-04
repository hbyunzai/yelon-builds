import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Component, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { _HttpClient, YunzaiHttpI18NService, I18nPipe } from '@yelon/theme';
import * as i3$1 from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import * as i2 from 'ng-zorro-antd/grid';
import { NzGridModule } from 'ng-zorro-antd/grid';
import * as i1$1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i3 from 'ng-zorro-antd/input';
import { NzInputModule } from 'ng-zorro-antd/input';
import * as i4$1 from 'ng-zorro-antd/tabs';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { HttpClient } from '@angular/common/http';
import * as i2$2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3$2 from '@yelon/abc/reuse-tab';
import { ReuseTabModule } from '@yelon/abc/reuse-tab';
import * as i13 from '@yelon/bis/yunzai-widgets';
import { YunzaiWidgetsModule } from '@yelon/bis/yunzai-widgets';
import { StompService } from '@yelon/socket';
import * as i1$2 from '@yelon/theme/layout-default';
import { LayoutDisplayService, LayoutDefaultModule } from '@yelon/theme/layout-default';
import * as i12 from '@yelon/theme/theme-btn';
import { ThemeBtnModule } from '@yelon/theme/theme-btn';
import { YunzaiConfigService, WINDOW, useLocalStorageHeader, YUNZAI_CONFIG, NavType, useLocalStorageProjectInfo, hasFavicon, setFavicon, useLocalStorageCurrent, useLocalStorageHeaderType, useLocalStorageDefaultRoute, log } from '@yelon/util';
import * as i7 from 'ng-zorro-antd/avatar';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import * as i11 from 'ng-zorro-antd/descriptions';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import * as i9 from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import * as i10 from 'ng-zorro-antd/skeleton';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { Subject, takeUntil } from 'rxjs';
import { mergeBisConfig } from '@yelon/bis/config';
import * as i2$1 from 'ng-zorro-antd/menu';

class YunzaiNavApplicationComponent {
    constructor() {
        this.config = mergeBisConfig(inject(YunzaiConfigService));
        this.http = inject(_HttpClient);
        this.win = inject(WINDOW);
        this.i18n = inject(YunzaiHttpI18NService);
        this.destroy$ = new Subject();
        this.state = {
            active: false,
            type: 'all',
            topic: undefined,
            topics: [],
            list: [],
            search: null
        };
    }
    get showAllMenu() {
        if (this.config.nav)
            return this.config.nav.all;
        return true;
    }
    get showMineMenu() {
        if (this.config.nav)
            return this.config.nav.mine;
        return true;
    }
    ngOnInit() {
        this.fetchAllTopic();
        this.attachNav('all');
        this.win.addEventListener('click', (event) => {
            const { target } = event;
            const btn = this.win.document.getElementById('navBtn');
            const dropdown = this.win.document.getElementById('navDropdown');
            if (btn && dropdown && !dropdown.contains(target) && !btn.contains(target)) {
                this.state.active = false;
            }
        });
    }
    fetchAllTopic() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topics = getTopics();
    }
    attachNav(type, topic) {
        this.state.type = type;
        this.clearSearch();
        if (type === 'all') {
            this.displayAllNav();
        }
        if (type === 'mine') {
            this.displayMineNav();
        }
        if (type === 'other' && topic) {
            this.displayOtherNav(topic);
        }
    }
    clearSearch() {
        this.state.search = null;
    }
    displayAllNav() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.list = getTopics();
    }
    displayMineNav() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.list = getTopics()
            .filter((topic) => {
            topic.children = topic.children.filter((child) => {
                return child.auth;
            });
            return topic;
        })
            .filter((topic) => {
            return topic.children.length > 0;
        });
    }
    displayOtherNav(topic) {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topic = topic;
        const temp = getTopics();
        this.state.list = temp.filter(t => t.key === topic.key)[0].children;
    }
    diffChange(flag) {
        if (flag) {
            this.state.active = flag;
        }
        else {
            this.state.active = !this.state.active;
        }
    }
    open(topic) {
        if (topic.key) {
            this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.win.location.href = topic.url;
                break;
            case 'blank':
                this.win.open(topic.url);
                break;
            case 'target':
                this.win.open(topic.url);
                break;
            default:
                this.win.location.href = topic.url;
                break;
        }
    }
    onSearch() {
        const [, getTopics] = useLocalStorageHeader();
        const temp = getTopics();
        if (this.state.search) {
            this.state.list = temp
                .filter((topic) => {
                if (this.i18n.fanyi(topic.name).includes(this.state.search)) {
                    return topic;
                }
                else {
                    topic.children = topic.children.filter((child) => {
                        return this.i18n.fanyi(child.name).includes(this.state.search);
                    });
                    return topic;
                }
            })
                .filter((topic) => {
                return topic.children.length > 0;
            });
        }
        else {
            const [, getTopics] = useLocalStorageHeader();
            this.state.list = getTopics();
        }
    }
    ngOnDestroy() {
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiNavApplicationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.6", type: YunzaiNavApplicationComponent, isStandalone: true, selector: "yunzai-layout-nav-application", ngImport: i0, template: `
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            data-event-id="_nav_search"
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="state.search"
            (ngModelChange)="onSearch()"
          />
          <ng-template #prefixTemplate>
            <i nz-icon nzType="search" nzTheme="outline"></i>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-template>

    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          @for (topic of state.list; track topic) {
            <li>
              <h5>{{ topic.name | i18n }}</h5>
              @for (nav of topic.children; track nav) {
                <a
                  data-event-id="_nav_item"
                  [attr.data-name]="nav.name | i18n"
                  href="javascript:;"
                  (click)="open(nav)"
                  >{{ nav.name | i18n }}</a
                >
              }
            </li>
          }
        </ul>
      </div>
    </ng-template>

    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item" (click)="diffChange()"
      >{{ 'mode.nav' | i18n }}
    </div>

    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-topic-list">
          @if (showAllMenu) {
            <div data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text" (click)="attachNav('all')"
              >{{ 'mode.nav.all' | i18n }}
            </div>
          }
          @if (showMineMenu) {
            <div data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text" (click)="attachNav('mine')"
              >{{ 'mode.nav.mine' | i18n }}
            </div>
          }
          @for (nav of state.topics; track nav) {
            <div
              data-event-id="_nav_topic"
              [attr.data-name]="nav.name | i18n"
              class="yz-application-text"
              (click)="attachNav('other', nav)"
              >{{ nav.name | i18n }}
            </div>
          }
        </div>
      </div>
      <div nz-col [nzSpan]="21" class="yz-application-container">
        @switch (state.type) {
          @case ('all') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('mine') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('other') {
            <div class="yz-application-list yz-application-list-other">
              <div class="yz-application-list-item">
                <ul>
                  @for (nav of state.list; track nav) {
                    <li data-event-id="_nav_item" [attr.data-name]="nav.name | i18n" (click)="open(nav)">
                      <a href="javascript:;">
                        <h4>{{ nav.name | i18n }}</h4>
                        <p>{{ nav.intro | i18n }}</p>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzFormModule }, { kind: "directive", type: i2.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i2.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "ngmodule", type: NzInputModule }, { kind: "directive", type: i3.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i3.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzStatus", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }, { kind: "directive", type: i3.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzGridModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiNavApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-layout-nav-application`,
                    template: `
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            data-event-id="_nav_search"
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="state.search"
            (ngModelChange)="onSearch()"
          />
          <ng-template #prefixTemplate>
            <i nz-icon nzType="search" nzTheme="outline"></i>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-template>

    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          @for (topic of state.list; track topic) {
            <li>
              <h5>{{ topic.name | i18n }}</h5>
              @for (nav of topic.children; track nav) {
                <a
                  data-event-id="_nav_item"
                  [attr.data-name]="nav.name | i18n"
                  href="javascript:;"
                  (click)="open(nav)"
                  >{{ nav.name | i18n }}</a
                >
              }
            </li>
          }
        </ul>
      </div>
    </ng-template>

    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item" (click)="diffChange()"
      >{{ 'mode.nav' | i18n }}
    </div>

    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-topic-list">
          @if (showAllMenu) {
            <div data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text" (click)="attachNav('all')"
              >{{ 'mode.nav.all' | i18n }}
            </div>
          }
          @if (showMineMenu) {
            <div data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text" (click)="attachNav('mine')"
              >{{ 'mode.nav.mine' | i18n }}
            </div>
          }
          @for (nav of state.topics; track nav) {
            <div
              data-event-id="_nav_topic"
              [attr.data-name]="nav.name | i18n"
              class="yz-application-text"
              (click)="attachNav('other', nav)"
              >{{ nav.name | i18n }}
            </div>
          }
        </div>
      </div>
      <div nz-col [nzSpan]="21" class="yz-application-container">
        @switch (state.type) {
          @case ('all') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('mine') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('other') {
            <div class="yz-application-list yz-application-list-other">
              <div class="yz-application-list-item">
                <ul>
                  @for (nav of state.list; track nav) {
                    <li data-event-id="_nav_item" [attr.data-name]="nav.name | i18n" (click)="open(nav)">
                      <a href="javascript:;">
                        <h4>{{ nav.name | i18n }}</h4>
                        <p>{{ nav.intro | i18n }}</p>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
                    standalone: true,
                    imports: [I18nPipe, FormsModule, NzFormModule, NzInputModule, CommonModule, NzGridModule]
                }]
        }] });

class YunzaiLayoutNavGroupComponent {
    constructor() {
        this.http = inject(_HttpClient);
        this.destroy$ = new Subject();
        this.win = inject(WINDOW);
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
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.win.location.href = topic.url;
                break;
            case 'blank':
                this.win.open(topic.url);
                break;
            case 'target':
                this.win.open(topic.url);
                break;
            default:
                this.win.location.href = topic.url;
                break;
        }
    }
    ngOnDestroy() {
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutNavGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.6", type: YunzaiLayoutNavGroupComponent, isStandalone: true, selector: "yunzai-layout-nav-group", ngImport: i0, template: `
    <div class="yz-application-group">
      <nz-tabset>
        @for (menu of state.topics; track menu) {
          <nz-tab [nzTitle]="groupTitleTpl">
            <ng-template #groupTitleTpl>
              <a
                data-event-id="_nav_topic"
                [attr.data-name]="menu.name | i18n"
                nz-dropdown
                [nzDropdownMenu]="menuTpl"
                [nzTrigger]="'click'"
                [nzOverlayClassName]="'yz-application-dropdown'"
              >
                @if (menu.icon) {
                  <i nz-icon [nzType]="menu.icon" nzTheme="outline"></i>
                }
                {{ menu.name | i18n }}
                @if (menu.children && menu.children.length > 0) {
                  <i nz-icon nzType="down" nzTheme="outline"></i>
                }
              </a>
              <nz-dropdown-menu #menuTpl="nzDropdownMenu">
                @if (menu.children && menu.children.length > 0) {
                  <ul nz-menu nzSelectable>
                    @for (item of menu.children; track item) {
                      <ng-container>
                        @if (item.auth) {
                            <li
                              data-event-id="_nav_item"
                              [attr.data-name]="item.name | i18n"
                              nz-menu-item
                              (click)="open(item)"
                            >
                              @if (item.icon) {
                                 <i nz-icon [nzType]="item.icon" nzTheme="outline"></i>
                              }
                              {{ item.name | i18n }}
                            </li>
                        }
                      </ng-container>
                    }
                  </ul>
                }
              </nz-dropdown-menu>
            </ng-template>
          </nz-tab>
        }
      </nz-tabset>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i2$1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i2$1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i3$1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i3$1.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i3$1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzTabsModule }, { kind: "component", type: i4$1.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { kind: "component", type: i4$1.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutNavGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-layout-nav-group`,
                    template: `
    <div class="yz-application-group">
      <nz-tabset>
        @for (menu of state.topics; track menu) {
          <nz-tab [nzTitle]="groupTitleTpl">
            <ng-template #groupTitleTpl>
              <a
                data-event-id="_nav_topic"
                [attr.data-name]="menu.name | i18n"
                nz-dropdown
                [nzDropdownMenu]="menuTpl"
                [nzTrigger]="'click'"
                [nzOverlayClassName]="'yz-application-dropdown'"
              >
                @if (menu.icon) {
                  <i nz-icon [nzType]="menu.icon" nzTheme="outline"></i>
                }
                {{ menu.name | i18n }}
                @if (menu.children && menu.children.length > 0) {
                  <i nz-icon nzType="down" nzTheme="outline"></i>
                }
              </a>
              <nz-dropdown-menu #menuTpl="nzDropdownMenu">
                @if (menu.children && menu.children.length > 0) {
                  <ul nz-menu nzSelectable>
                    @for (item of menu.children; track item) {
                      <ng-container>
                        @if (item.auth) {
                            <li
                              data-event-id="_nav_item"
                              [attr.data-name]="item.name | i18n"
                              nz-menu-item
                              (click)="open(item)"
                            >
                              @if (item.icon) {
                                 <i nz-icon [nzType]="item.icon" nzTheme="outline"></i>
                              }
                              {{ item.name | i18n }}
                            </li>
                        }
                      </ng-container>
                    }
                  </ul>
                }
              </nz-dropdown-menu>
            </ng-template>
          </nz-tab>
        }
      </nz-tabset>
    </div>
  `,
                    standalone: true,
                    imports: [NzIconModule, NzDropDownModule, I18nPipe, NzTabsModule]
                }]
        }] });

class YunzaiLayoutNavTileComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutNavTileComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.6", type: YunzaiLayoutNavTileComponent, isStandalone: true, selector: "yunzai-layout-nav-tile", ngImport: i0, template: `<ng-template />`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutNavTileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-layout-nav-tile`,
                    template: `<ng-template />`,
                    standalone: true
                }]
        }] });

class YunzaiLayoutBasicComponent {
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
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSize]="40" [nzSrc]="aside.icon" (click)="aboutApplication()" />
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: LayoutDefaultModule }, { kind: "component", type: i1$2.LayoutDefaultComponent, selector: "layout-default", inputs: ["options", "asideUser", "asideBottom", "nav", "content", "customError", "fetchingStrictly", "fetching"], exportAs: ["layoutDefault"] }, { kind: "component", type: i1$2.LayoutDefaultHeaderItemComponent, selector: "layout-default-header-item", inputs: ["hidden", "direction"] }, { kind: "directive", type: i1$2.LayoutDefaultHeaderItemTriggerDirective, selector: "[layout-default-header-item-trigger]" }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i2$2.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: ReuseTabModule }, { kind: "component", type: i3$2.ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: ["mode", "i18n", "debug", "max", "tabMaxWidth", "excludes", "allowClose", "keepingScroll", "storageState", "keepingScrollContainer", "customContextMenu", "tabBarExtraContent", "tabBarGutter", "tabBarStyle", "tabType", "routeParamMatchMode", "disabled", "titleRender", "canClose"], outputs: ["change", "close"], exportAs: ["reuseTab"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "pipe", type: i4.DatePipe, name: "date" }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i2$1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i2$1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i3$1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i3$1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i7.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzModalModule }, { kind: "component", type: i9.NzModalComponent, selector: "nz-modal", inputs: ["nzMask", "nzMaskClosable", "nzCloseOnNavigation", "nzVisible", "nzClosable", "nzOkLoading", "nzOkDisabled", "nzCancelDisabled", "nzCancelLoading", "nzKeyboard", "nzNoAnimation", "nzCentered", "nzDraggable", "nzContent", "nzFooter", "nzZIndex", "nzWidth", "nzWrapClassName", "nzClassName", "nzStyle", "nzTitle", "nzCloseIcon", "nzMaskStyle", "nzBodyStyle", "nzOkText", "nzCancelText", "nzOkType", "nzOkDanger", "nzIconType", "nzModalType", "nzAutofocus", "nzOnOk", "nzOnCancel"], outputs: ["nzOnOk", "nzOnCancel", "nzAfterOpen", "nzAfterClose", "nzVisibleChange"], exportAs: ["nzModal"] }, { kind: "directive", type: i9.NzModalContentDirective, selector: "[nzModalContent]", exportAs: ["nzModalContent"] }, { kind: "ngmodule", type: NzSkeletonModule }, { kind: "component", type: i10.NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }, { kind: "ngmodule", type: NzDescriptionsModule }, { kind: "component", type: i11.NzDescriptionsComponent, selector: "nz-descriptions", inputs: ["nzBordered", "nzLayout", "nzColumn", "nzSize", "nzTitle", "nzExtra", "nzColon"], exportAs: ["nzDescriptions"] }, { kind: "component", type: i11.NzDescriptionsItemComponent, selector: "nz-descriptions-item", inputs: ["nzSpan", "nzTitle"], exportAs: ["nzDescriptionsItem"] }, { kind: "ngmodule", type: ThemeBtnModule }, { kind: "component", type: i12.ThemeBtnComponent, selector: "theme-btn", inputs: ["types", "devTips", "deployUrl"], outputs: ["themeChange"] }, { kind: "ngmodule", type: YunzaiWidgetsModule }, { kind: "component", type: i13.YunzaiHeaderClearStorageComponent, selector: "yunzai-header-clear-storage" }, { kind: "component", type: i13.YunzaiHeaderFullScreenComponent, selector: "yunzai-header-fullscreen" }, { kind: "component", type: i13.YunzaiHeaderNotifyComponent, selector: "yunzai-header-notify" }, { kind: "component", type: i13.YunzaiHeaderI18nComponent, selector: "yunzai-header-i18n", inputs: ["showLangText"] }, { kind: "component", type: i13.YunzaiHeaderUserComponent, selector: "yunzai-header-user" }, { kind: "component", type: YunzaiNavApplicationComponent, selector: "yunzai-layout-nav-application" }, { kind: "component", type: YunzaiLayoutNavGroupComponent, selector: "yunzai-layout-nav-group" }, { kind: "component", type: YunzaiLayoutNavTileComponent, selector: "yunzai-layout-nav-tile" }] }); }
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
        <nz-avatar class="yunzai-default__aside-user-avatar" [nzSize]="40" [nzSrc]="aside.icon" (click)="aboutApplication()" />
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

const COMPONENTS = [YunzaiLayoutNavTileComponent, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent];
class YunzaiLayoutModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutModule, imports: [I18nPipe,
            FormsModule,
            NzFormModule,
            NzInputModule,
            CommonModule,
            NzGridModule,
            NzIconModule,
            NzDropDownModule,
            NzTabsModule, YunzaiLayoutNavTileComponent, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent], exports: [YunzaiLayoutNavTileComponent, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutModule, imports: [FormsModule,
            NzFormModule,
            NzInputModule,
            CommonModule,
            NzGridModule,
            NzIconModule,
            NzDropDownModule,
            NzTabsModule, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        I18nPipe,
                        FormsModule,
                        NzFormModule,
                        NzInputModule,
                        CommonModule,
                        NzGridModule,
                        NzIconModule,
                        NzDropDownModule,
                        NzTabsModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiLayoutBasicComponent, YunzaiLayoutModule, YunzaiLayoutNavGroupComponent, YunzaiLayoutNavTileComponent, YunzaiNavApplicationComponent };
//# sourceMappingURL=layout.mjs.map
