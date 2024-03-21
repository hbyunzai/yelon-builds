import * as i0 from '@angular/core';
import { inject, Component, ChangeDetectionStrategy, HostListener, ChangeDetectorRef, booleanAttribute, Input, NgModule } from '@angular/core';
import { I18nPipe, YUNZAI_I18N_TOKEN, _HttpClient, SettingsService } from '@yelon/theme';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import screenfull from 'screenfull';
import { forkJoin, map, Subject, takeUntil } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import * as i1$1 from '@yelon/abc/notice-icon';
import { NoticeIconModule } from '@yelon/abc/notice-icon';
import { WINDOW, YunzaiConfigService, useLocalStorageProjectInfo, useLocalStorageUser } from '@yelon/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import * as i1$2 from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { mergeBisConfig } from '@yelon/bis/config';
import * as i4 from 'ng-zorro-antd/avatar';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

class YunzaiHeaderClearStorageComponent {
    constructor() {
        this.modalSrv = inject(NzModalService);
        this.messageSrv = inject(NzMessageService);
    }
    _click() {
        this.modalSrv.confirm({
            nzTitle: 'Make sure clear all local storage?',
            nzOnOk: () => {
                localStorage.clear();
                this.messageSrv.success('Clear Finished!');
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderClearStorageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: YunzaiHeaderClearStorageComponent, isStandalone: true, selector: "yunzai-header-clear-storage", host: { listeners: { "click": "_click()" }, properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderClearStorageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-header-clear-storage',
                    template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: true,
                    imports: [NzIconModule, I18nPipe]
                }]
        }], propDecorators: { _click: [{
                type: HostListener,
                args: ['click']
            }] } });

class YunzaiHeaderFullScreenComponent {
    constructor() {
        this.status = false;
    }
    _resize() {
        this.status = screenfull.isFullscreen;
    }
    _click() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderFullScreenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: YunzaiHeaderFullScreenComponent, isStandalone: true, selector: "yunzai-header-fullscreen", host: { listeners: { "window:resize": "_resize()", "click": "_click()" }, properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderFullScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-header-fullscreen',
                    template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: true,
                    imports: [NzIconModule, I18nPipe]
                }]
        }], propDecorators: { _resize: [{
                type: HostListener,
                args: ['window:resize']
            }], _click: [{
                type: HostListener,
                args: ['click']
            }] } });

class YunzaiHeaderNotifyComponent {
    constructor() {
        this.i18n = inject(YUNZAI_I18N_TOKEN);
        this.msg = inject(NzMessageService);
        this.nzI18n = inject(NzI18nService);
        this.cdr = inject(ChangeDetectorRef);
        this.http = inject(_HttpClient);
        this.win = inject(WINDOW);
        this.loading = false;
        this.count = 0;
        this.subs = [];
        this.data = [
            {
                key: 'msg',
                title: this.i18n.fanyi('notify.message'),
                list: [],
                emptyText: this.i18n.fanyi('notify.message.empty'),
                emptyImage: './assets/tmp/img/message.svg',
                clearText: this.i18n.fanyi('notify.message.clear')
            },
            {
                key: 'todo',
                title: this.i18n.fanyi('notify.todo'),
                list: [],
                emptyText: this.i18n.fanyi('notify.todo.empty'),
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: this.i18n.fanyi('notify.todo.clear')
            },
            {
                key: 'notice',
                title: this.i18n.fanyi('notify.notice'),
                list: [],
                emptyText: this.i18n.fanyi('notify.notice.empty'),
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: this.i18n.fanyi('notify.notice.clear')
            }
        ];
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.count = 0;
        this.loading = true;
        this.subs.push(
        // @ts-ignore
        forkJoin(this.loadTodo(), this.loadMessage()).subscribe(() => {
            this.loading = false;
            this.cdr.detectChanges();
        }));
    }
    loadMessage() {
        const formatMessageStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.i18n.fanyi('notify.unread'), color: 'red' };
                case '1':
                    return { extra: this.i18n.fanyi('notify.readed'), color: 'green' };
                default:
                    return { extra: this.i18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.http
            .post(`/message-center-3/my-msg-and-todo/msg-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map((response) => {
            const viewMessage = this.data.filter(d => d.key === 'msg')[0];
            viewMessage.list = response.data.list.map((m) => {
                return {
                    ...m,
                    avatar: m?.imgUrl || './assets/tmp/img/message.png',
                    title: m.systemName,
                    description: m.content,
                    extra: formatMessageStatus(m.status).extra,
                    color: formatMessageStatus(m.status).color,
                    datetime: formatDistanceToNow(new Date(m.date), { locale: this.nzI18n.getDateLocale() })
                };
            });
            this.count += viewMessage.list.length;
        }));
    }
    loadTodo() {
        const formatTodoStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.i18n.fanyi('notify.unstart'), color: 'red' };
                case '1':
                    return { extra: this.i18n.fanyi('notify.started'), color: 'green' };
                default:
                    return { extra: this.i18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.http
            .post(`/message-center-3/my-msg-and-todo/todo-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map((response) => {
            const viewTodo = this.data.filter(d => d.key === 'todo')[0];
            viewTodo.list = response.data.list.map((t) => {
                return {
                    ...t,
                    avatar: t?.imgUrl || './assets/tmp/img/todo.png',
                    title: t.systemName,
                    description: t.content,
                    datetime: formatDistanceToNow(new Date(t.date), { locale: this.nzI18n.getDateLocale() }),
                    extra: formatTodoStatus(t.status).extra,
                    color: formatTodoStatus(t.status).color
                };
            });
            this.count += viewTodo.list.length;
        }));
    }
    clear(type) {
        const t = this.data.filter(d => d.title === type)[0];
        if (t.key == 'msg' || t.key == 'notice') {
            this.subs.push(this.http.post(`/message-center-3/my-msg-and-todo/msg-clear`, {}).subscribe(_ => {
                this.msg.success(`${this.i18n.fanyi('notify.clear')} ${type}`);
                this.loadData();
            }));
        }
        if (t.key == 'todo') {
            this.loadData();
        }
    }
    select(res) {
        this.win.open(res.item.url);
        this.loadData();
    }
    ngOnDestroy() {
        this.subs.forEach(a => a.unsubscribe());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderNotifyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.1", type: YunzaiHeaderNotifyComponent, isStandalone: true, selector: "yunzai-header-notify", ngImport: i0, template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NoticeIconModule }, { kind: "component", type: i1$1.NoticeIconComponent, selector: "notice-icon", inputs: ["data", "count", "loading", "popoverVisible", "btnClass", "btnIconClass", "centered"], outputs: ["select", "clear", "popoverVisibleChange"], exportAs: ["noticeIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderNotifyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-header-notify`,
                    template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    />
  `,
                    standalone: true,
                    imports: [NoticeIconModule],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });

class YunzaiHeaderI18nComponent {
    constructor() {
        this.settings = inject(SettingsService);
        this.i18n = inject(YUNZAI_I18N_TOKEN);
        this.doc = inject(DOCUMENT);
        this.langs = [];
        this.destroy$ = new Subject();
        /** Whether to display language text */
        this.showLangText = true;
    }
    get curLangCode() {
        return this.settings.layout.lang;
    }
    ngOnInit() {
        this.i18n
            .getLangs()
            .pipe(takeUntil(this.destroy$))
            .subscribe(langs => {
            this.langs = langs;
        });
    }
    change(lang) {
        const spinEl = this.doc.createElement('div');
        spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
        spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
        this.doc.body.appendChild(spinEl);
        this.i18n.loadLangData(lang).subscribe(res => {
            this.i18n.use(lang, res);
            this.settings.setLayout('lang', lang);
            setTimeout(() => this.doc.location.reload());
        });
    }
    ngOnDestroy() {
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderI18nComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: YunzaiHeaderI18nComponent, isStandalone: true, selector: "yunzai-header-i18n", inputs: { showLangText: ["showLangText", "showLangText", booleanAttribute] }, host: { properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    @if (showLangText) {
      <div nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
        <i nz-icon nzType="global"></i>
        {{ 'lang.nav' | i18n }}
        <i nz-icon nzType="down"></i>
      </div>
    } @else {
      <i nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight" nz-icon nzType="global"></i>
    }
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        @for (item of langs; track item) {
          <li
            data-event-id="_nav_lang"
            [attr.data-text]="item.text"
            nz-menu-item
            [nzSelected]="item.code === curLangCode"
            (click)="change(item.code)"
          >
            @if (!item.icon) {
              <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
            } @else {
              <img
                style="margin-right:4px"
                width="50px"
                height="30px"
                [src]="'data:image/png;base64,' + item.icon"
                [alt]="item.abbr"
                class="pr-xs"
              />
            }
            {{ item.text }}
          </li>
        }
      </ul>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1$2.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderI18nComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-header-i18n`,
                    template: `
    @if (showLangText) {
      <div nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
        <i nz-icon nzType="global"></i>
        {{ 'lang.nav' | i18n }}
        <i nz-icon nzType="down"></i>
      </div>
    } @else {
      <i nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight" nz-icon nzType="global"></i>
    }
    <nz-dropdown-menu data-event-id="_nav_lang" #langMenu="nzDropdownMenu">
      <ul nz-menu>
        @for (item of langs; track item) {
          <li
            data-event-id="_nav_lang"
            [attr.data-text]="item.text"
            nz-menu-item
            [nzSelected]="item.code === curLangCode"
            (click)="change(item.code)"
          >
            @if (!item.icon) {
              <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
            } @else {
              <img
                style="margin-right:4px"
                width="50px"
                height="30px"
                [src]="'data:image/png;base64,' + item.icon"
                [alt]="item.abbr"
                class="pr-xs"
              />
            }
            {{ item.text }}
          </li>
        }
      </ul>
    </nz-dropdown-menu>
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NzDropDownModule, NzIconModule, I18nPipe, CommonModule]
                }]
        }], propDecorators: { showLangText: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

class YunzaiHeaderUserComponent {
    constructor() {
        this.msg = inject(NzMessageService);
        this.tokenService = inject(YA_SERVICE_TOKEN);
        this.configService = inject(YunzaiConfigService);
        this.config = mergeBisConfig(this.configService);
        this.win = inject(WINDOW);
        this.icon = '';
        this.username = '';
        this.menus = [];
    }
    ngOnInit() {
        const [, getProjectInfo] = useLocalStorageProjectInfo();
        const [, getUser] = useLocalStorageUser();
        const projectInfo = getProjectInfo();
        const user = getUser();
        this.username = user.realname ? user.realname : '未命名';
        this.icon = user.avatarId
            ? `${this.config.baseUrl}/filecenter/file/${user.avatarId}`
            : `./assets/tmp/img/avatar.jpg`;
        this.menus = projectInfo.profileList;
    }
    logout() {
        localStorage.clear();
        this.tokenService.clear();
        this.win.location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
    }
    to(href) {
        if (href) {
            this.win.open(href);
        }
        else {
            this.msg.error('该菜单没有配置链接!');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderUserComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.1", type: YunzaiHeaderUserComponent, isStandalone: true, selector: "yunzai-header-user", ngImport: i0, template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      data-event-id="_nav_user"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <div class="yz-user-name">
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm" />
        {{ username }}
      </div>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        @for (m of menus; track m) {
          <div data-event-id="_nav_user" [attr.data-name]="m.name | i18n" nz-menu-item (click)="to(m.url)">
            <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
            {{ m.name | i18n }}
          </div>
        }
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i1$2.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i1$2.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i1$2.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i2.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i2.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i4.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "ngmodule", type: RouterModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiHeaderUserComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-header-user`,
                    template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      data-event-id="_nav_user"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <div class="yz-user-name">
        <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm" />
        {{ username }}
      </div>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        @for (m of menus; track m) {
          <div data-event-id="_nav_user" [attr.data-name]="m.name | i18n" nz-menu-item (click)="to(m.url)">
            <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
            {{ m.name | i18n }}
          </div>
        }
        <li nz-menu-divider></li>
        <div data-event-id="_nav_user" data-name="注销登录" nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                    standalone: true,
                    imports: [NzDropDownModule, I18nPipe, NzIconModule, NzAvatarModule, RouterModule],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });

const COMPONENTS = [
    YunzaiHeaderClearStorageComponent,
    YunzaiHeaderFullScreenComponent,
    YunzaiHeaderNotifyComponent,
    YunzaiHeaderI18nComponent,
    YunzaiHeaderUserComponent
];
class YunzaiWidgetsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiWidgetsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: YunzaiWidgetsModule, imports: [NzAvatarModule,
            RouterModule,
            NoticeIconModule,
            NzDropDownModule,
            CommonModule,
            NzIconModule,
            I18nPipe, YunzaiHeaderClearStorageComponent,
            YunzaiHeaderFullScreenComponent,
            YunzaiHeaderNotifyComponent,
            YunzaiHeaderI18nComponent,
            YunzaiHeaderUserComponent], exports: [YunzaiHeaderClearStorageComponent,
            YunzaiHeaderFullScreenComponent,
            YunzaiHeaderNotifyComponent,
            YunzaiHeaderI18nComponent,
            YunzaiHeaderUserComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiWidgetsModule, imports: [NzAvatarModule,
            RouterModule,
            NoticeIconModule,
            NzDropDownModule,
            CommonModule,
            NzIconModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiWidgetsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzAvatarModule,
                        RouterModule,
                        NoticeIconModule,
                        NzDropDownModule,
                        CommonModule,
                        NzIconModule,
                        I18nPipe,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiHeaderClearStorageComponent, YunzaiHeaderFullScreenComponent, YunzaiHeaderI18nComponent, YunzaiHeaderNotifyComponent, YunzaiHeaderUserComponent, YunzaiWidgetsModule };
//# sourceMappingURL=yunzai-widgets.mjs.map
