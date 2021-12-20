import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, Injector, Inject, Input, ChangeDetectorRef, Renderer2, Optional, HostListener, EventEmitter, ViewChild, Output, isDevMode, NgModule, APP_INITIALIZER } from '@angular/core';
import * as i2$1 from '@yelon/cache';
import { CacheService } from '@yelon/cache';
import * as i1 from '@yelon/theme';
import { zh_CN as zh_CN$1, zh_TW as zh_TW$1, en_US as en_US$1, YunzaiI18nBaseService, _HttpClient, SettingsService, YelonLocaleService, YUNZAI_I18N_TOKEN, MenuService, TitleService } from '@yelon/theme';
import { WINDOW, YunzaiConfigService as YunzaiConfigService$1, log as log$1, deepCopy } from '@yelon/util';
import * as i3 from '@angular/cdk/platform';
import { Platform } from '@angular/cdk/platform';
import { registerLocaleData, DOCUMENT, CommonModule } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import { zhCN, zhTW, enUS } from 'date-fns/locale';
import * as i1$1 from '@yelon/util/config';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i2 from 'ng-zorro-antd/i18n';
import { zh_CN, zh_TW, en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { __decorate } from 'tslib';
import { InputBoolean } from '@yelon/util/decorator';
import { forkJoin, Subject, of, BehaviorSubject, throwError } from 'rxjs';
import { map, takeUntil, mergeMap, mergeAll, filter, take, switchMap, catchError } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';
import { log } from '@yelon/util/other';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Directionality } from '@angular/cdk/bidi';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { YA_SERVICE_TOKEN, mergeConfig } from '@yelon/auth';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as screenfull from 'screenfull';
import { HttpClientModule, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { YzSharedModule, ICONS } from '@yelon/bis/shared';
import { LayoutService } from '@yelon/theme/layout-default';
import { RxStomp } from '@stomp/rx-stomp';
import * as i3$1 from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ACLService } from '@yelon/acl';
import { NzIconService } from 'ng-zorro-antd/icon';

// 请参考：https://ng.yunzainfo.com/docs/i18n
const DEFAULT = 'zh-CN';
const LANGS = {
    'zh-CN': {
        text: '简体中文',
        ng: ngZh,
        zorro: zh_CN,
        date: zhCN,
        yelon: zh_CN$1,
        abbr: '🇨🇳'
    },
    'zh-TW': {
        text: '繁体中文',
        ng: ngZhTw,
        zorro: zh_TW,
        date: zhTW,
        yelon: zh_TW$1,
        abbr: '🇭🇰'
    },
    'en-US': {
        text: 'English',
        ng: ngEn,
        zorro: en_US,
        date: enUS,
        yelon: en_US$1,
        abbr: '🇬🇧'
    }
};
class YzI18NService extends YunzaiI18nBaseService {
    constructor(http, settings, nzI18nService, yelonLocaleService, platform, cogSrv) {
        super(cogSrv);
        this.http = http;
        this.settings = settings;
        this.nzI18nService = nzI18nService;
        this.yelonLocaleService = yelonLocaleService;
        this.platform = platform;
        this._defaultLang = DEFAULT;
        this._langs = Object.keys(LANGS).map(code => {
            const item = LANGS[code];
            return { code, text: item.text, abbr: item.abbr };
        });
        const defaultLang = this.getDefaultLang();
        this._defaultLang = this._langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
    }
    getDefaultLang() {
        if (!this.platform.isBrowser) {
            return DEFAULT;
        }
        if (this.settings.layout.lang) {
            return this.settings.layout.lang;
        }
        let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
        const arr = res.split('-');
        return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
    }
    loadLangData(lang) {
        return this.http.get(`assets/tmp/i18n/${lang}.json`);
    }
    use(lang, data) {
        if (this._currentLang === lang)
            return;
        this._data = this.flatData(data, []);
        const item = LANGS[lang];
        registerLocaleData(item.ng);
        this.nzI18nService.setLocale(item.zorro);
        this.nzI18nService.setDateLocale(item.date);
        this.yelonLocaleService.setLocale(item.yelon);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return this._langs;
    }
}
YzI18NService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzI18NService_Factory() { return new YzI18NService(i0.ɵɵinject(i1._HttpClient), i0.ɵɵinject(i1.SettingsService), i0.ɵɵinject(i2.NzI18nService), i0.ɵɵinject(i1.YelonLocaleService), i0.ɵɵinject(i3.Platform), i0.ɵɵinject(i1$1.YunzaiConfigService)); }, token: YzI18NService, providedIn: "root" });
YzI18NService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
YzI18NService.ctorParameters = () => [
    { type: _HttpClient },
    { type: SettingsService },
    { type: NzI18nService },
    { type: YelonLocaleService },
    { type: Platform },
    { type: YunzaiConfigService }
];

var TOPIC;
(function (TOPIC) {
    TOPIC[TOPIC["FULL"] = 0] = "FULL";
    TOPIC[TOPIC["OWN"] = 1] = "OWN";
    TOPIC[TOPIC["EVERY"] = 2] = "EVERY";
})(TOPIC || (TOPIC = {}));
class YzHeaderApplicationComponent {
    constructor(inject, cacheService, i18n, http) {
        this.inject = inject;
        this.cacheService = cacheService;
        this.i18n = i18n;
        this.http = http;
        this.T = TOPIC;
        this.active = false;
        this.topicData = [];
        this.listData = [];
        this.topic = TOPIC.FULL;
        this.searchValue = null;
        this.subs = [];
    }
    ngOnInit() {
        this.topicData = this.cacheService.get('_yz_header', { mode: 'none' });
        this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
    }
    ngOnDestroy() {
        this.subs.forEach(f => f.unsubscribe());
    }
    diffChange(flag) {
        if (flag) {
            this.active = flag;
        }
        else {
            this.active = !this.active;
        }
    }
    initTopic(topic) {
        this.searchValue = null;
        this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
        this.topic = topic;
    }
    full() {
        this.initTopic(TOPIC.FULL);
    }
    own() {
        this.initTopic(TOPIC.OWN);
        const temp = this.cacheService.get('_yz_header', { mode: 'none' });
        this.listData = temp
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
    every(e) {
        this.initTopic(TOPIC.EVERY);
        this.choosed = e;
        const temp = this.cacheService.get('_yz_header', { mode: 'none' });
        this.listData = [...temp.filter(t => t.key === e.key)[0].children];
    }
    onSearch() {
        const temp = this.cacheService.get('_yz_header', { mode: 'none' });
        // 如果搜索输入的有值
        if (this.searchValue) {
            // 过滤菜单过滤出搜索的值
            this.listData = temp
                .filter((topic) => {
                if (this.i18n.fanyi(topic.name).includes(this.searchValue)) {
                    return topic;
                }
                else {
                    topic.children = topic.children.filter((child) => {
                        return this.i18n.fanyi(child.name).includes(this.searchValue);
                    });
                    return topic;
                }
            })
                .filter((topic) => {
                return topic.children.length > 0;
            });
        }
        else {
            // 如果没有值,取消搜索
            this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
        }
    }
    open(topic) {
        if (topic.key) {
            this.subs.push(this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .subscribe());
        }
        switch (topic.target) {
            case 'href':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'blank':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'target':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            default:
                this.inject.get(WINDOW).location.href = topic.url;
                break;
        }
    }
}
YzHeaderApplicationComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-application',
                template: `
    <!--      template start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="searchValue"
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
          <li *ngFor="let d of listData">
            <h5>{{ d.name }}</h5>
            <a href="javascript:;" *ngFor="let cd of d.children" (click)="open(cd)">{{ cd.name }}</a>
          </li>
        </ul>
      </div>
    </ng-template>
    <!--      template end-->

    <!--      button start-->
    <div class="yunzai-default__nav-item" (click)="diffChange()"> {{ 'application.button' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" nz-row *ngIf="active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-text" (click)="full()">{{ 'application.all' | i18n }}</div>
        <div class="yz-application-text" (click)="own()">{{ 'application.mine' | i18n }}</div>
        <div class="yz-application-text" *ngFor="let d of topicData" (click)="every(d)">
          {{ d.name }}
        </div>
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="topic" class="yz-application-container">
        <div *ngSwitchCase="T.FULL">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngSwitchCase="T.OWN">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngSwitchCase="T.EVERY" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li *ngFor="let d of listData" (click)="open(d)">
                <a href="javascript:;">
                  <h4>{{ d.name }}</h4>
                  <p>{{ d.intro }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderApplicationComponent.ctorParameters = () => [
    { type: Injector },
    { type: CacheService },
    { type: YzI18NService },
    { type: _HttpClient }
];

class YzHeaderI18NComponent {
    constructor(settings, i18n, doc) {
        this.settings = settings;
        this.i18n = i18n;
        this.doc = doc;
        /** Whether to display language text */
        this.showLangText = true;
    }
    get langs() {
        return this.i18n.getLangs();
    }
    get curLangCode() {
        return this.settings.layout.lang;
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
}
YzHeaderI18NComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-i18n',
                template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'menu.lang' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i
      *ngIf="!showLangText"
      nz-dropdown
      [nzDropdownMenu]="langMenu"
      nzPlacement="bottomRight"
      nz-icon
      nzType="global"
    ></i>
    <nz-dropdown-menu #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          *ngFor="let item of langs"
          [nzSelected]="item.code === curLangCode"
          (click)="change(item.code)"
        >
          <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderI18NComponent.ctorParameters = () => [
    { type: SettingsService },
    { type: YzI18NService, decorators: [{ type: Inject, args: [YUNZAI_I18N_TOKEN,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
YzHeaderI18NComponent.propDecorators = {
    showLangText: [{ type: Input }]
};
__decorate([
    InputBoolean()
], YzHeaderI18NComponent.prototype, "showLangText", void 0);

class YzHeaderNotifyComponent {
    constructor(injector, msg, y18n, nzI18n, cdr, httpClient) {
        this.injector = injector;
        this.msg = msg;
        this.y18n = y18n;
        this.nzI18n = nzI18n;
        this.cdr = cdr;
        this.httpClient = httpClient;
        this.data = [
            {
                key: 'msg',
                title: this.y18n.fanyi('notify.message'),
                list: [],
                emptyText: this.y18n.fanyi('notify.message.emptyText'),
                emptyImage: './assets/tmp/img/message.svg',
                clearText: this.y18n.fanyi('notify.message.clearText')
            },
            {
                key: 'todo',
                title: this.y18n.fanyi('notify.todo'),
                list: [],
                emptyText: this.y18n.fanyi('notify.todo.emptyText'),
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: this.y18n.fanyi('notify.todo.clearText')
            },
            {
                key: 'notice',
                title: this.y18n.fanyi('notify.notice'),
                list: [],
                emptyText: this.y18n.fanyi('notify.notice.emptyText'),
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: this.y18n.fanyi('notify.notice.clearText')
            }
        ];
        this.loading = false;
        this.count = 0;
        this.subs = [];
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.count = 0;
        this.loading = true;
        this.subs.push(forkJoin(this.loadTodo(), this.loadMessage()).subscribe(() => {
            this.loading = false;
            this.cdr.detectChanges();
        }));
    }
    loadMessage() {
        log('notify.component: ', 'fetch message list');
        const formatMessageStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.y18n.fanyi('notify.unread'), color: 'red' };
                case '1':
                    return { extra: this.y18n.fanyi('notify.readed'), color: 'green' };
                default:
                    return { extra: this.y18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.httpClient
            .post(`/message-center-3/my-msg-and-todo/msg-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map((response) => {
            const viewMessage = this.data.filter(d => d.key === 'msg')[0];
            viewMessage.list = response.data.list.map((m) => {
                return Object.assign(Object.assign({}, m), { avatar: (m === null || m === void 0 ? void 0 : m.imgUrl) || './assets/tmp/img/message.png', title: m.systemName, description: m.content, extra: formatMessageStatus(m.status).extra, color: formatMessageStatus(m.status).color, datetime: formatDistanceToNow(new Date(m.date), { locale: this.nzI18n.getDateLocale() }) });
            });
            this.count += viewMessage.list.length;
        }));
    }
    loadTodo() {
        log('notify.component: ', 'fetch todo list');
        const formatTodoStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.y18n.fanyi('notify.unstart'), color: 'red' };
                case '1':
                    return { extra: this.y18n.fanyi('notify.started'), color: 'green' };
                default:
                    return { extra: this.y18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.httpClient
            .post(`/message-center-3/my-msg-and-todo/todo-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map((response) => {
            const viewTodo = this.data.filter(d => d.key === 'todo')[0];
            viewTodo.list = response.data.list.map((t) => {
                return Object.assign(Object.assign({}, t), { avatar: (t === null || t === void 0 ? void 0 : t.imgUrl) || './assets/tmp/img/todo.png', title: t.systemName, description: t.content, datetime: formatDistanceToNow(new Date(t.date), { locale: this.nzI18n.getDateLocale() }), extra: formatTodoStatus(t.status).extra, color: formatTodoStatus(t.status).color });
            });
            this.count += viewTodo.list.length;
        }));
    }
    clear(type) {
        const t = this.data.filter(d => d.title === type)[0];
        if (t.key == 'msg' || t.key == 'notice') {
            this.subs.push(this.httpClient.post(`/message-center-3/my-msg-and-todo/msg-clear`, {}).subscribe(_ => {
                this.msg.success(`${this.y18n.fanyi('notify.clear')} ${type}`);
                this.loadData();
            }));
        }
        if (t.key == 'todo') {
            this.loadData();
        }
    }
    select(res) {
        this.injector.get(WINDOW).open(res.item.url);
        this.loadData();
    }
    ngOnDestroy() {
        this.subs.forEach(a => a.unsubscribe());
    }
}
YzHeaderNotifyComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-notify',
                template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderNotifyComponent.ctorParameters = () => [
    { type: Injector },
    { type: NzMessageService },
    { type: YzI18NService, decorators: [{ type: Inject, args: [YUNZAI_I18N_TOKEN,] }] },
    { type: NzI18nService },
    { type: ChangeDetectorRef },
    { type: _HttpClient }
];

class YzHeaderThemBtnComponent {
    constructor(renderer, configSrv, platform, doc, directionality, KEYS) {
        this.renderer = renderer;
        this.configSrv = configSrv;
        this.platform = platform;
        this.doc = doc;
        this.directionality = directionality;
        this.KEYS = KEYS;
        this.theme = 'default';
        this.types = [
            { key: 'default', text: 'theme.default', color: '#2163ff' },
            { key: 'compact', text: 'theme.compact', color: '#2163ff' },
            { key: 'dark', text: 'theme.dark', color: '#020202' },
            { key: 'yuhong', text: 'theme.yuhong', color: '#C04851' },
            { key: 'danjuhuang', text: 'theme.danjuhuang', color: '#FBA414' },
            { key: 'xinghuang', text: 'theme.xinghuang', color: '#F28E16' },
            { key: 'shilv', text: 'theme.shilv', color: '#57C3C2' },
            { key: 'zhulv', text: 'theme.zhulv', color: '#1BA784' },
            { key: 'youlan', text: 'theme.youlan', color: '#1781B5' },
            { key: 'dianqing', text: 'theme.dianqing', color: '#1661AB' },
            { key: 'shangengzi', text: 'theme.shangengzi', color: '#61649F' },
            { key: 'shuiniuhui', text: 'theme.shuiniuhui', color: '#2F2F35' }
        ];
        this.devTips = `When the dark.css file can't be found, you need to run it once: npm run theme`;
        this.deployUrl = '';
        this.destroy$ = new Subject();
        this.dir = 'ltr';
    }
    ngOnInit() {
        var _a;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
        this.initTheme();
    }
    initTheme() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = localStorage.getItem(this.KEYS) || 'default';
        this.updateChartTheme();
        this.onThemeChange(this.theme);
    }
    updateChartTheme() {
        this.configSrv.set('chart', { theme: this.theme === 'dark' ? 'dark' : '' });
    }
    onThemeChange(theme) {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = theme;
        this.renderer.setAttribute(this.doc.body, 'data-theme', theme);
        const dom = this.doc.getElementById(this.KEYS);
        if (dom) {
            dom.remove();
        }
        localStorage.removeItem(this.KEYS);
        if (theme !== 'default') {
            const el = this.doc.createElement('link');
            el.type = 'text/css';
            el.rel = 'stylesheet';
            el.id = this.KEYS;
            el.href = `${this.deployUrl}assets/style.${theme}.css`;
            localStorage.setItem(this.KEYS, theme);
            this.doc.body.append(el);
        }
        this.updateChartTheme();
    }
    ngOnDestroy() {
        const el = this.doc.getElementById(this.KEYS);
        if (el != null) {
            this.doc.body.removeChild(el);
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
}
YzHeaderThemBtnComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-theme-btn',
                template: `
    <div
      class="yunzai-default__nav-item"
      nz-dropdown
      [nzDropdownMenu]="iconMenu"
      nzTrigger="click"
      nzPlacement="bottomRight"
    >
      <svg nz-tooltip class="anticon" role="img" width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
        <g fill-rule="evenodd">
          <g fill-rule="nonzero">
            <path
              d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <nz-dropdown-menu #iconMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          *ngFor="let theme of types"
          (click)="onThemeChange(theme.key)"
          [style]="{ color: theme.color }"
        >
          <i nz-icon nzType="bg-colors"></i>
          {{ theme.text | i18n }}
        </li>
      </ul>
      <!--      <div nz-menu class="wd-xl animated jello">-->
      <!--        <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" class="app-icons">-->
      <!--          <div nz-col [nzSpan]="4" *ngFor="let theme of types" (click)="onThemeChange(theme.key)">-->
      <!--            <i nz-icon nzType="bg-colors" class="text-white" [style]="{ backgroundColor: theme.color }"></i>-->
      <!--            <span [ngStyle]="{ color: theme.color }">{{ theme.text | i18n }}</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </nz-dropdown-menu>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderThemBtnComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: YunzaiConfigService },
    { type: Platform },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Inject, args: [YUNZAI_THEME_BTN_KEYS,] }] }
];
YzHeaderThemBtnComponent.propDecorators = {
    types: [{ type: Input }],
    devTips: [{ type: Input }],
    deployUrl: [{ type: Input }]
};

const BUSINESS_DEFAULT_CONFIG = {
    baseUrl: '/backstage',
    systemCode: 'portal',
    loginForm: null,
    refreshTokenEnabled: true,
    refreshTokenType: 're-request'
};
function mergeBisConfig(srv) {
    return srv.merge('bis', BUSINESS_DEFAULT_CONFIG);
}

class YzHeaderUserComponent {
    constructor(injector, msg, tokenService, 
    // @ts-ignore
    configService, cacheService) {
        this.injector = injector;
        this.msg = msg;
        this.tokenService = tokenService;
        this.configService = configService;
        this.cacheService = cacheService;
        this.icon = '';
        this.username = '';
        this.menus = [];
        this.config = mergeBisConfig(configService);
    }
    ngOnInit() {
        const projectInfo = this.cacheService.get('_yz_project_info', { mode: 'none' });
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        this.username = user.realname ? user.realname : '未命名';
        this.icon = user.avatarId
            ? `${this.config.baseUrl}/filecenter/file/${user.avatarId}`
            : `./assets/tmp/img/avatar.jpg`;
        this.menus = projectInfo.profileList;
    }
    logout() {
        localStorage.clear();
        this.tokenService.clear();
        this.injector.get(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
    }
    to(href) {
        if (href) {
            this.injector.get(WINDOW).open(href);
        }
        else {
            this.msg.error('该菜单没有配置链接!');
        }
    }
}
YzHeaderUserComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-user',
                template: `
    <div
      class="yunzai-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="icon" nzSize="small" class="mr-sm"></nz-avatar>
      {{ username }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item *ngFor="let m of menus" (click)="to(m.url)">
          <i nz-icon [nzType]="m.icon" class="mr-sm"></i>
          {{ m.name | i18n }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | i18n }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderUserComponent.ctorParameters = () => [
    { type: Injector },
    { type: NzMessageService },
    { type: undefined, decorators: [{ type: Inject, args: [YA_SERVICE_TOKEN,] }] },
    { type: YunzaiConfigService$1 },
    { type: CacheService }
];

class YzHeaderClearStorageComponent {
    constructor(modalSrv, messageSrv) {
        this.modalSrv = modalSrv;
        this.messageSrv = messageSrv;
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
}
YzHeaderClearStorageComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-clear-storage',
                template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `,
                host: {
                    '[class.d-block]': 'true'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderClearStorageComponent.ctorParameters = () => [
    { type: NzModalService },
    { type: NzMessageService }
];
YzHeaderClearStorageComponent.propDecorators = {
    _click: [{ type: HostListener, args: ['click',] }]
};

class YzHeaderFullScreenComponent {
    constructor() {
        this.status = false;
    }
    get sf() {
        return screenfull;
    }
    _resize() {
        this.status = this.sf.isFullscreen;
    }
    _click() {
        if (this.sf.isEnabled) {
            this.sf.toggle();
        }
    }
}
YzHeaderFullScreenComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-fullscreen',
                template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
                host: {
                    '[class.d-block]': 'true'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderFullScreenComponent.propDecorators = {
    _resize: [{ type: HostListener, args: ['window:resize',] }],
    _click: [{ type: HostListener, args: ['click',] }]
};

class ContactService {
    constructor(http, cache) {
        this.http = http;
        this.cache = cache;
    }
    /**
     * 部门树查询
     *
     * @param clas 包含班级
     * @param his 包含历史班级
     * @param grade 系部
     * @param gradeID 系部ID
     * @returns 可观察部门树
     */
    dept(clas, his, grade, gradeID) {
        let baseUrl = `/auth/baseDepartMent/tree?debug=false`;
        if (clas) {
            baseUrl += `&includeClass=true`;
        }
        else {
            baseUrl += `&includeClass=false`;
        }
        if (his) {
            baseUrl += `&includeHisClass=true`;
        }
        else {
            baseUrl += `&includeHisClass=false`;
        }
        if (grade) {
            baseUrl += `&deptTypes=2,class`;
        }
        if (gradeID) {
            baseUrl += `&gradeId=${gradeID}`;
        }
        return this.http.get(baseUrl).pipe(map((response) => {
            return response.data || [];
        }));
    }
    page(uri, page) {
        return this.http.post(`${uri}/queryListForPage`, page);
    }
    pageBaseUser(page) {
        return this.page('/auth/baseUser', page);
    }
    getUserByIds(ids) {
        return this.http
            .post('/auth/baseUser/users', {
            userIds: ids
        })
            .pipe((response) => {
            return response.data || [];
        });
    }
    /**
     * 查询人员信息
     *
     * @param userIds[] 用户id数组,["aaa","bbb","ccc"]
     */
    getUserByUserIds(userIds) {
        return this.http
            .post(`/auth/baseUser/users`, {
            userIds: userIds
        })
            .pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 获取角色组角色
     *
     * @param roleGroupCode 角色组code
     */
    getGroupRole(roleGroupCode) {
        return this.http
            .post(`/auth/baseRole/findGroupRole`, {
            roleGroupCode: roleGroupCode
        })
            .pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 查询当前用户好友分组
     */
    getFriendGroup() {
        return this.http.post(`/contact/appcontact/findGroup`, {}).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 查询年级
     */
    getGrade() {
        return this.http.get(`/auth/gradeYear/queryListForPage`).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 查询人员类别列表
     */
    getRylbs() {
        return this.http.post(`/auth/baseTeacher/queryRylbs`, {}).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 获取学生公寓树
     *
     * @param isPower 是否带有权限，默认false
     * @param treeType 树类型 0:宿舍楼 1:宿舍楼+层 2:宿舍楼+层+房间
     */
    getDormTree(isPower, treeType) {
        const user = this.cache.get('_yz_user', { mode: 'none' });
        let params = {};
        if (isPower) {
            params = {
                isPower: isPower,
                userId: user.userId,
                treeType: treeType
            };
        }
        else {
            params = {
                isPower: isPower,
                treeType: treeType
            };
        }
        return this.http.post(`/auth/dorm/tree`, params).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
}
ContactService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ContactService_Factory() { return new ContactService(i0.ɵɵinject(i1._HttpClient), i0.ɵɵinject(i2$1.CacheService)); }, token: ContactService, providedIn: "root" });
ContactService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ContactService.ctorParameters = () => [
    { type: _HttpClient },
    { type: CacheService }
];

class ContactComponent {
    constructor(contact, changeDetectorRef) {
        this.contact = contact;
        this.changeDetectorRef = changeDetectorRef;
        this.subs = [];
        /**
         * tabset
         */
        this.nzTabsetSearch = null;
        this.nzTabsetLoading = false;
        /**
         * 树展开状态
         */
        this.nzExpandAll = true;
        /**
         * 部门树和部门查询的一些选项/可传可不传
         */
        this.nzDepts = [];
        this._nzDeptsCopy = [];
        this.nzDeptTreeVirtualHeight = null;
        this.nzDeptClass = true;
        this.nzDeptClassHistory = true;
        this.nzDeptGrade = false;
        /**
         * 角色树
         */
        this.nzRoles = [];
        this._nzRolesCopy = [];
        this.nzRoleTreeVirtualHeight = null;
        /**
         * 好友分组
         */
        this.nzFriendGroups = [];
        this._nzFriendGroupsCopy = [];
        /**
         * 联系人
         */
        this.defaultContacts = [];
        this.nzContacts = [];
        this.nzContactLoading = false;
        /**
         * 提交和提交按钮
         */
        this.button = true;
        this.confirmed = new EventEmitter();
    }
    /**
     * 初始化，首先加载部门树和默认选中的人的数据
     */
    ngOnInit() {
        this.onTabsetDept();
        this.onContactsInit();
    }
    /**
     * 视图初始化完毕后进行table初始化
     */
    ngAfterViewInit() {
        this.onTableInit();
    }
    /**
     * 初始化默认选中联系人
     */
    onContactsInit() {
        if (this.defaultContacts && this.defaultContacts.length > 0) {
            this.nzContactLoading = true;
            this.subs.push(this.contact.getUserByUserIds(this.defaultContacts).subscribe(contacts => {
                this.nzContacts = contacts;
                this.nzContactLoading = false;
                this.refresh();
            }));
        }
    }
    /**
     * table初始化
     */
    onTableInit() {
        // 设置表头
        this.st.resetColumns({
            columns: [
                { title: '选择', type: 'checkbox' },
                { title: '序号', type: 'no' },
                { title: '姓名', index: 'realName' },
                { title: '学号/工号', index: 'userCode' },
                { title: '部门', index: 'dept.deptName' }
            ]
        });
        // 订阅table点击checkbox事件变化
        this.subs.push(this.st.change.subscribe(e => {
            if (e.type === 'checkbox') {
                // 点击checkbox新增联系人
                const contactIds = this.nzContacts.map(c => c.userId);
                this.nzContacts = this.nzContacts.concat(e.checkbox.filter(c => !contactIds.includes(c.userId)));
                // 取消checkbox取消联系人
                const cancelIds = this.st.list.filter(d => !d.checked).map(d => d.userId);
                this.nzContacts = this.nzContacts.filter(d => !cancelIds.includes(d.userId));
            }
        }));
    }
    /**
     * tabset进入加载状态
     */
    onTabsetLoadStart() {
        this.nzTabsetLoading = true;
    }
    /**
     * tabset取消加载状态
     */
    onTabsetLoadEnd() {
        this.nzTabsetLoading = false;
    }
    /**
     * tabset搜索框清除
     */
    onTabsetSearchClean() {
        this.nzDepts = this._nzDeptsCopy;
        this.nzRoles = this._nzRolesCopy;
        this.nzFriendGroups = this._nzFriendGroupsCopy;
        this.nzTabsetSearch = null;
    }
    /**
     * tabset搜索框输入
     *
     * @param type 类型
     * @param value 值
     */
    onTabsetSearchChange(type, value) {
        this.onTabsetLoadStart();
        if (!value || value === '') {
            this.nzDepts = this._nzDeptsCopy;
            this.nzRoles = this._nzRolesCopy;
            this.nzFriendGroups = this._nzFriendGroupsCopy;
        }
        else {
            const trees = [];
            if (type === 'dept') {
                this.searchTree(value, this._nzDeptsCopy, trees);
                this.nzDepts = trees;
            }
            if (type === 'role') {
                this.searchTree(value, this._nzRolesCopy, trees);
                this.nzRoles = trees;
            }
            if (type === 'friendGroup') {
                this.nzFriendGroups = this._nzFriendGroupsCopy.filter(f => {
                    return !f.name.indexOf(value);
                });
            }
        }
        this.onTabsetLoadEnd();
        this.refresh();
    }
    /**
     * tabset切换到部门
     */
    onTabsetDept() {
        this.onTabsetSearchClean();
        if (!this.nzDepts || this.nzDepts.length === 0) {
            this.onTabsetDeptFlush();
        }
    }
    /**
     * tabset切换到角色
     */
    onTabsetRole() {
        this.onTabsetSearchClean();
        if (!this.nzRoles || this.nzRoles.length === 0) {
            this.onTabsetRoleFlush(null);
        }
    }
    /**
     * tabset切换到好友分组
     */
    onTabsetFriendGroup() {
        this.onTabsetSearchClean();
        if (!this.nzFriendGroups || this.nzFriendGroups.length === 0) {
            this.onTabsetFriendGroupFlush();
        }
    }
    /**
     * 获取部门树
     */
    onTabsetDeptFlush() {
        this.onTabsetLoadStart();
        this.subs.push(this.contact
            .dept(this.nzDeptClass, this.nzDeptClassHistory, this.nzDeptGrade, this.nzDeptGradeID)
            .subscribe((trees) => {
            this.expandTree(trees);
            this.nzDepts = trees;
            this._nzDeptsCopy = trees;
            this.onTabsetLoadEnd();
            this.refresh();
        }));
    }
    // 获取角色树
    onTabsetRoleFlush(groupRoleCode) {
        this.onTabsetLoadStart();
        this.subs.push(this.contact.getGroupRole(groupRoleCode).subscribe((roles) => {
            this.expandTree(roles);
            this.nzRoles = roles;
            this._nzRolesCopy = roles;
            this.onTabsetLoadEnd();
            this.refresh();
        }));
    }
    // 获取好友分组列表
    onTabsetFriendGroupFlush() {
        this.onTabsetLoadStart();
        this.subs.push(this.contact.getFriendGroup().subscribe((group) => {
            this.nzFriendGroups = group;
            this._nzFriendGroupsCopy = group;
            this.onTabsetLoadEnd();
            this.refresh();
        }));
    }
    /**
     * 部门树点击
     *
     * @param e 节点
     */
    onDeptClick(e) {
        var _a;
        // 构造分页请求，直接传入stTable组件，剩下的所有交给组件自己完成
        this.st.data = '/auth/baseUser/queryListForPage';
        this.st.req = {
            allInBody: true,
            method: 'POST',
            type: 'page',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            body: {
                pageParam: {
                    deptId: (_a = e.keys) === null || _a === void 0 ? void 0 : _a.pop()
                }
            }
        };
        // table数据预处理
        this.st.res = {
            process: data => {
                this.onTableCheck(data);
                return data;
            }
        };
        // 加载第一页
        this.st.load(1);
    }
    /**
     * 角色树点击
     *
     * @param e 节点
     */
    onRoleClick(e) {
        var _a;
        // 构造分页请求，直接传入stTable组件，剩下的所有交给组件自己完成
        this.st.data = '/auth/baseUser/queryListForPage';
        this.st.req = {
            allInBody: true,
            method: 'POST',
            type: 'page',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            body: {
                pageParam: {
                    roleId: (_a = e.keys) === null || _a === void 0 ? void 0 : _a.pop()
                }
            }
        };
        // table数据预处理
        this.st.res = {
            process: data => {
                this.onTableCheck(data);
                return data;
            }
        };
        // 加载第一页
        this.st.load(1);
    }
    /**
     * 好友分组点击
     *
     * @param e 分组
     */
    onFriendGroupClick(e) {
        // 构造分页请求，直接传入stTable组件，剩下的所有交给组件自己完成
        this.st.data = '/auth/baseUser/queryListForPage';
        this.st.req = {
            allInBody: true,
            method: 'POST',
            type: 'page',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            body: {
                pageParam: {
                    friendGroupId: e.id
                }
            }
        };
        // table数据预处理
        this.st.res = {
            process: data => {
                this.onTableCheck(data);
                return data;
            }
        };
        // 加载第一页
        this.st.load(1);
    }
    /**
     * 点击右侧联系人进行删除
     *
     * @param c 点击的联系人
     */
    onContactRemove(c) {
        this.nzContacts = this.nzContacts.filter(contact => {
            return contact.userId != c.userId;
        });
        this.st.reload();
    }
    /**
     * 预处理table当前页数据，和nzContat对比，确定checkbox状态
     *
     * @param data 预处理数据
     */
    onTableCheck(data) {
        const ids = this.nzContacts.map(u => u.userId);
        data.forEach(d => {
            if (ids.includes(d.userId)) {
                d.checked = true;
            }
            else {
                d.checked = false;
            }
        });
    }
    /**
     * 递归树寻找name相同节点
     *
     * @param name 名称
     * @param trees 需要递归的树
     * @param list 搜索结果
     */
    searchTree(name, trees, list) {
        if (trees && trees.length && trees.length > 0) {
            trees.forEach((tree) => {
                if (tree.title.indexOf(name) != -1) {
                    list.push(tree);
                }
                if (tree.children) {
                    this.searchTree(name, tree.children, list);
                }
            });
        }
    }
    /**
     * 递归树展开所有有子节点的节点
     *
     * @param trees 需要展开的树
     */
    expandTree(trees) {
        if (trees && trees.length && trees.length > 0) {
            trees.forEach(tree => {
                if (!tree.children || tree.children.length === 0) {
                    tree.expanded = false;
                    tree.isLeaf = true;
                }
                if (tree.children) {
                    tree.expanded = this.nzExpandAll;
                    tree.isLeaf = false;
                    this.expandTree(tree.children);
                }
            });
        }
    }
    /**
     * 刷新当前页面
     */
    refresh() {
        this.changeDetectorRef.detectChanges();
    }
    /**
     * 确认按钮output数据
     */
    confirm() {
        this.confirmed.next(this.nzContacts);
    }
    /**
     * 销毁函数
     */
    ngOnDestroy() {
        this.nzDepts = [];
        this.nzRoles = [];
        this.nzContacts = [];
        this.subs.forEach(s => s.unsubscribe());
    }
}
ContactComponent.decorators = [
    { type: Component, args: [{
                selector: 'contact',
                template: "<nz-row [nzGutter]=\"16\">\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"8\" [nzXl]=\"6\" [nzXXl]=\"6\">\n    <nz-tabset nzCentered>\n      <nz-tab nzTitle=\"\u90E8\u95E8\" (nzSelect)=\"onTabsetDept()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('dept', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onDeptClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzDeptTreeVirtualHeight\"\n                [nzData]=\"nzDepts\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u89D2\u8272\" (nzSelect)=\"onTabsetRole()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('role', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onRoleClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzRoleTreeVirtualHeight\"\n                [nzData]=\"nzRoles\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u597D\u53CB\" (nzSelect)=\"onTabsetFriendGroup()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('friendGroup', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u597D\u53CB\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-list class=\"nz-tabset-content\" nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n                <nz-list-item\n                  class=\"nz-tabset-content-item\"\n                  *ngFor=\"let group of nzFriendGroups\"\n                  (click)=\"onFriendGroupClick(group)\"\n                >\n                  <nz-list-item-meta>\n                    <nz-list-item-meta-title>\n                      {{ group.name }}\n                    </nz-list-item-meta-title>\n                  </nz-list-item-meta>\n                </nz-list-item>\n              </nz-list>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n    </nz-tabset>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"16\" [nzXl]=\"13\" [nzXXl]=\"13\">\n    <st #st responsiveHideHeaderFooter></st>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"24\" [nzXl]=\"5\" [nzXXl]=\"5\">\n    <nz-spin [nzSpinning]=\"nzContactLoading\">\n      <nz-list nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n        <nz-list-item\n          class=\"nz-tabset-content-item\"\n          *ngFor=\"let contact of nzContacts\"\n          (click)=\"onContactRemove(contact)\"\n        >\n          <nz-list-item-meta>\n            <nz-list-item-meta-title>\n              {{ contact.realName }}\n            </nz-list-item-meta-title>\n          </nz-list-item-meta>\n        </nz-list-item>\n      </nz-list>\n    </nz-spin>\n  </nz-col>\n</nz-row>\n\n<nz-row *ngIf=\"button\">\n  <nz-col [nzSpan]=\"4\" [nzOffset]=\"20\">\n    <button nz-button nzType=\"primary\" (click)=\"confirm()\">\u786E\u5B9A</button>\n  </nz-col>\n</nz-row>\n\n<ng-template #searchInputTpl>\n  <i nz-icon nzType=\"close\" nzTheme=\"outline\" *ngIf=\"nzTabsetSearch\" (click)=\"onTabsetSearchClean()\"></i>\n  <i nz-icon nzType=\"search\" nzTheme=\"outline\" *ngIf=\"!nzTabsetSearch\"></i>\n</ng-template>\n",
                styles: [".nz-tabset-input{width:100%}.nz-tabset-content{padding:20px}.nz-tabset-sg{padding-right:38px!important;padding-left:38px!important}.nz-tabset-content-item:hover{background-color:#f1f1f1;cursor:pointer}\n"]
            },] }
];
ContactComponent.ctorParameters = () => [
    { type: ContactService },
    { type: ChangeDetectorRef }
];
ContactComponent.propDecorators = {
    nzTabsetSearch: [{ type: Optional }, { type: Input }],
    nzTabsetLoading: [{ type: Optional }, { type: Input }],
    nzExpandAll: [{ type: Optional }, { type: Input }],
    nzDepts: [{ type: Optional }, { type: Input }],
    nzDeptTreeVirtualHeight: [{ type: Optional }, { type: Input }],
    nzDeptClass: [{ type: Optional }, { type: Input }],
    nzDeptClassHistory: [{ type: Optional }, { type: Input }],
    nzDeptGrade: [{ type: Optional }, { type: Input }],
    nzDeptGradeID: [{ type: Optional }, { type: Input }],
    nzRoles: [{ type: Optional }, { type: Input }],
    nzRoleTreeVirtualHeight: [{ type: Optional }, { type: Input }],
    nzFriendGroups: [{ type: Optional }, { type: Input }],
    st: [{ type: ViewChild, args: ['st', { static: false },] }],
    defaultContacts: [{ type: Optional }, { type: Input }],
    nzContacts: [{ type: Optional }, { type: Input }],
    nzContactLoading: [{ type: Optional }, { type: Input }],
    button: [{ type: Optional }, { type: Input }],
    confirmed: [{ type: Output }]
};

const ɵ0 = msg => {
    log$1(msg);
};
const STOMP_DEFAULT_CONFIG = {
    connectHeaders: {
        login: 'guest',
        passcode: 'guest'
    },
    brokerURL: '/websocket/ws/',
    heartbeatIncoming: 1000 * 60,
    heartbeatOutgoing: 1000 * 60,
    reconnectDelay: 30000000,
    debug: ɵ0
};
function mergeStompConfig(srv) {
    return srv.merge('stomp', STOMP_DEFAULT_CONFIG);
}

class YzStompService {
    constructor(csr, cache, injector, notification) {
        this.csr = csr;
        this.cache = cache;
        this.injector = injector;
        this.notification = notification;
        this.subs = [];
        if (!this.user) {
            this.user = this.cache.get('_yz_user', { mode: 'none' });
        }
        if (!this.config) {
            this.config = mergeStompConfig(this.csr);
        }
        if (!this.bisConfig) {
            this.bisConfig = mergeBisConfig(csr);
        }
        if (!this.rxStomp) {
            this.rxStomp = new RxStomp();
            if (isDevMode()) {
                log$1('yz.stomp.service: is dev mode');
                log$1('yz.stomp.service: ', `config is ${JSON.stringify(this.config)}`);
                this.rxStomp.configure(this.config);
                return;
            }
            const { location } = this.injector.get(DOCUMENT);
            const { protocol, host } = location;
            log$1('yz.stomp.service: ', `protocol is ${protocol},host is ${host}`);
            if (protocol.includes('http') && !protocol.includes('https')) {
                this.config.brokerURL = `ws://${host}${this.config.brokerURL}`;
            }
            if (protocol.includes('https')) {
                this.config.brokerURL = `wss://${host}${this.config.brokerURL}`;
            }
            log$1('yz.stomp.service: ', `config is ${this.config}`);
            this.rxStomp.configure(this.config);
        }
    }
    listen() {
        this.subs.push(this.rxStomp.watch(`/topic/layout_${this.user.username}`).subscribe(message => {
            this.createNotification(JSON.parse(message.body));
        }));
        this.subs.push(this.rxStomp.watch(`/topic/layout_xx_${this.user.username}`).subscribe((message) => {
            this.logoutNotification(JSON.parse(message.body));
        }));
        this.rxStomp.activate();
    }
    createNotification(message) {
        this.notification.create(message.type, message.title, `<a href=${message.href}>${message.content}</a>`);
    }
    logoutNotification(message) {
        this.notification.create(message.type, message.title, `${message.content},剩余时间5秒`);
        setTimeout(() => {
            this.cache.clear();
            localStorage.clear();
            this.injector.get(WINDOW).location.href = `${this.bisConfig.baseUrl}/cas-proxy/app/logout`;
        }, 5000);
    }
    unListen() {
        this.subs.forEach(s => s.unsubscribe());
        this.rxStomp.deactivate().then();
    }
    publish(parameters) {
        this.rxStomp.publish(parameters);
    }
    watch(destination, headers) {
        return this.rxStomp.watch(destination, headers);
    }
}
YzStompService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzStompService_Factory() { return new YzStompService(i0.ɵɵinject(i1$1.YunzaiConfigService), i0.ɵɵinject(i2$1.CacheService), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3$1.NzNotificationService)); }, token: YzStompService, providedIn: "root" });
YzStompService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
YzStompService.ctorParameters = () => [
    { type: YunzaiConfigService$1 },
    { type: CacheService },
    { type: Injector },
    { type: NzNotificationService }
];

class YzLayoutBasicComponent {
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
            cascadingStyleSheet = Object.assign(Object.assign({}, cascadingStyleSheet), { top: 0 });
        }
        if (!this.showSider) {
            cascadingStyleSheet = Object.assign(Object.assign({}, cascadingStyleSheet), { left: '24px' });
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
YzLayoutBasicComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
YzLayoutBasicComponent.ctorParameters = () => [
    { type: CacheService },
    { type: YzStompService },
    { type: LayoutService }
];

/*
 * @Author: cui <devcui@outlook.com>
 * @Editor: microsoft vscode
 * @Date: 2021-11-27 11:30:50
 * @LastEditTime: 2021-11-27 14:38:46
 * @LastEditors: cui <devcui@outlook.com>
 * @Description: empty description
 * @FilePath: \yelon\packages\bis\layout\layout.module.ts
 * LICENSE HERE
 */
const COMPONENTS = [
    ContactComponent,
    YzLayoutBasicComponent,
    YzHeaderApplicationComponent,
    YzHeaderNotifyComponent,
    YzHeaderThemBtnComponent,
    YzHeaderUserComponent,
    YzHeaderFullScreenComponent,
    YzHeaderClearStorageComponent,
    YzHeaderI18NComponent
];
class YunzaiLayoutModule {
}
YunzaiLayoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, YzSharedModule],
                providers: [
                    {
                        provide: YUNZAI_THEME_BTN_KEYS,
                        useValue: 'site-theme'
                    }
                ],
                declarations: [...COMPONENTS],
                exports: [...COMPONENTS]
            },] }
];

class YzAuthService {
    constructor(injector) {
        this.injector = injector;
        this.option = mergeConfig(this.csr);
        this.bis = mergeBisConfig(this.csr);
    }
    get csr() {
        return this.injector.get(YunzaiConfigService);
    }
    get tokenService() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get httpClient() {
        return this.injector.get(_HttpClient);
    }
    get cacheService() {
        return this.injector.get(CacheService);
    }
    askToken() {
        var _a;
        log('yz.auth.service: ', 'askToken');
        if ((_a = this.tokenService.get()) === null || _a === void 0 ? void 0 : _a.token) {
            return of(this.tokenService.get());
        }
        else {
            if (this.bis.loginForm) {
                return this.fetchTokenByUP();
            }
            else {
                return this.fetchTokenByCas();
            }
        }
    }
    fetchTokenByUP() {
        log('yz.auth.service: ', 'fetchTokenByUP');
        return this.httpClient.post(`/auth/oauth/token?_allow_anonymous=true`, this.bis.loginForm).pipe(map((response) => {
            const { access_token, expires_in, refresh_token, scope, token_type } = response;
            return {
                token: access_token,
                expired: expires_in,
                refreshToken: refresh_token,
                tokenType: token_type,
                scope
            };
        }));
    }
    fetchTokenByCas() {
        log('yz.auth.service: ', 'fetchTokenByCas');
        const uri = encodeURIComponent(this.injector.get(WINDOW).location.href);
        return this.httpClient
            .get(`/cas-proxy/app/validate_full?callback=${uri}&_allow_anonymous=true&timestamp=${new Date().getTime()}`)
            .pipe(map((response) => {
            switch (response.errcode) {
                case 2000:
                    const { access_token, expires_in, refresh_token, scope, token_type } = response.data;
                    return {
                        token: access_token,
                        expired: expires_in,
                        refreshToken: refresh_token,
                        tokenType: token_type,
                        scope
                    };
                case 2001:
                    this.injector.get(WINDOW).location.href = response.msg;
                    throw Error("Cookie Error: Can't find Cas Cookie,So jump to login!");
                default:
                    if (response.data) {
                        console.error(response.data);
                        throw Error(response.data);
                    }
                    else if (response.msg) {
                        console.error(response.msg);
                        throw Error(response.msg);
                    }
                    else {
                        console.error('cas unknown error');
                        throw Error('Unknown Error: Cas auth exception!');
                    }
            }
        }));
    }
    login() {
        log('yz.auth.service: ', 'login white login form->', this.bis.loginForm);
        return this.askToken().pipe(mergeMap(token => {
            log('yz.auth.service: get token->', token);
            this.csr.set('auth', {
                token_send_key: 'Authorization',
                token_send_template: `${token.tokenType} \${token}`,
                token_send_place: 'header'
            });
            log('yz.auth.service: ', 'set token');
            this.tokenService.set(token);
            return this.cacheInit();
        }), mergeAll());
    }
    cacheInit() {
        log('yz.auth.service: ', 'cacheInit');
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        const header = this.cacheService.get('_yz_header', { mode: 'none' });
        const project = this.cacheService.get('_yz_project_info', { mode: 'none' });
        return forkJoin(of(user), of(header), of(project)).pipe(mergeMap(([u, h, p]) => {
            let list = [];
            // user cache
            if (!u) {
                log('yz.auth.service: ', 'fetch user cache');
                list.push(this.httpClient.get(`/auth/user`).pipe(map((user) => {
                    this.cacheService.set('_yz_user', user.principal);
                })));
            }
            else {
                log('yz.auth.service: ', 'user recache');
                list.push(of(() => { }));
            }
            // header cache
            if (!h) {
                log('yz.auth.service: ', 'fetch header cache');
                list.push(this.httpClient.get(`/auth/allheader/v2`).pipe(map((header) => {
                    this.cacheService.set('_yz_header', header.data);
                })));
            }
            else {
                log('yz.auth.service: ', 'header recache');
                list.push(of(() => { }));
            }
            // project cache
            if (!p) {
                log('yz.auth.service: ', 'fetch project cache');
                list.push(this.httpClient.get(`/app-manager/project/info`).pipe(map((info) => {
                    this.cacheService.set('_yz_project_info', info.data);
                })));
            }
            else {
                log('yz.auth.service: ', 'project recache');
                list.push(of(() => { }));
            }
            return forkJoin(list);
        }));
    }
}
YzAuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzAuthService_Factory() { return new YzAuthService(i0.ɵɵinject(i0.INJECTOR)); }, token: YzAuthService, providedIn: "root" });
YzAuthService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
YzAuthService.ctorParameters = () => [
    { type: Injector }
];

const CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};
/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
class YzDefaultInterceptor {
    constructor(injector) {
        this.injector = injector;
        this.jump = false;
        this.refreshToking = false;
        this.refreshToken$ = new BehaviorSubject(null);
        if (this.config.refreshTokenType === 'auth-refresh') {
            console.error("can't use auth-refresh, please change yz.default.interceptor to default.interceptor!");
        }
    }
    get notification() {
        return this.injector.get(NzNotificationService);
    }
    get tokenSrv() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get http() {
        return this.injector.get(_HttpClient);
    }
    get config() {
        return mergeBisConfig(this.injector.get(YunzaiConfigService));
    }
    goTo(url) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }
    checkStatus(ev) {
        if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
            return;
        }
        if (ev instanceof HttpErrorResponse && (ev.error.message || ev.error.errorMessage)) {
            if (ev.error.errorMessage) {
                this.notification.error(`发生了一些错误 `, ev.error.errorMessage);
            }
            else {
                this.notification.error(`发生了一些错误 `, ev.error.message);
            }
            return;
        }
        if (ev instanceof HttpResponse && ev.body.errorMessage) {
            this.notification.error(`发生了一些错误 `, ev.body.errorMessage);
            return;
        }
        const errortext = CODEMESSAGE[ev.status] || ev.statusText;
        this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
    }
    ToLogin() {
        this.notification.error(`未登录或登录状态已过期，5秒后将跳转到登录页面。`, ``);
        setTimeout(() => {
            localStorage.clear();
            this.injector.get(WINDOW).location.href = `${this.config.baseUrl}/cas-proxy/app/logout`;
        }, 5000);
    }
    reAttachToken(req) {
        var _a;
        const token = (_a = this.tokenSrv.get()) === null || _a === void 0 ? void 0 : _a.token;
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    refreshTokenRequest() {
        const model = this.tokenSrv.get();
        const form = new FormData();
        form.set('refresh_token', model === null || model === void 0 ? void 0 : model.refreshToken);
        log('yz.default.interceptor: use the refresh token to request a new token', model === null || model === void 0 ? void 0 : model.refreshToken);
        return this.http.post(`/auth/user/token/refresh?_allow_anonymous=true`, form);
    }
    tryRefreshToken(ev, req, next) {
        // 连刷新Token的请求都错了，那就是真错了
        if (['/auth/oauth/token'].some(url => req.url.includes(url))) {
            this.ToLogin();
            return throwError(ev);
        }
        // 正在刷新token，所有其他请求排队
        if (this.refreshToking) {
            return this.refreshToken$.pipe(filter(v => !!v), take(1), switchMap(() => next.handle(this.reAttachToken(req))));
        }
        //尝试调用刷新 Token
        this.refreshToking = true;
        this.refreshToken$.next(null);
        // 处理Token
        return this.refreshTokenRequest().pipe(switchMap(res => {
            log('yz.default.interceptor: refresh token accessed -> ', res);
            // 重新保存新 token
            const { access_token, expires_in, refresh_token, scope, token_type } = res;
            this.tokenSrv.set({
                token: access_token,
                expired: expires_in,
                refreshToken: refresh_token,
                tokenType: token_type,
                scope
            });
            // 通知后续请求继续执行
            this.refreshToking = false;
            this.refreshToken$.next(res);
            // 重新发起请求
            return next.handle(this.reAttachToken(req));
        }), catchError(err => {
            this.refreshToking = false;
            this.ToLogin();
            return throwError(err);
        }));
    }
    getAdditionalHeaders(headers) {
        const res = {};
        const lang = this.injector.get(YUNZAI_I18N_TOKEN).currentLang;
        if (!(headers === null || headers === void 0 ? void 0 : headers.has('Accept-Language')) && lang) {
            res['Accept-Language'] = lang;
        }
        return res;
    }
    handleData(ev, req, next) {
        this.checkStatus(ev);
        switch (ev.status) {
            case 200:
                return of(ev);
            case 401:
                if (this.config.refreshTokenEnabled && this.config.refreshTokenType === 're-request') {
                    return this.tryRefreshToken(ev, req, next);
                }
                this.ToLogin();
                break;
            case 403:
            case 404:
            case 500:
                if (this.jump) {
                    this.goTo(`/exception/${ev.status}`);
                }
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    console.warn('未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng.yunzainfo.com/docs/server 解决跨域问题', ev);
                }
                break;
        }
        if (ev instanceof HttpErrorResponse) {
            return throwError(ev);
        }
        else {
            return of(ev);
        }
    }
    intercept(req, next) {
        log('yz.default.interceptor.ts: ', 'request ', req);
        // 统一加前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = this.config.baseUrl + url;
        }
        if (url.includes('.json') && url.includes('assets')) {
            url = req.url;
        }
        // 加入语言头
        const newReq = req.clone({ url, setHeaders: this.getAdditionalHeaders(req.headers) });
        return next.handle(newReq).pipe(mergeMap(ev => {
            // 允许统一对请求错误处理
            if (ev instanceof HttpResponseBase) {
                return this.handleData(ev, newReq, next);
            }
            // 若一切都正常，则后续操作
            return of(ev);
        }), catchError((err) => this.handleData(err, newReq, next)));
    }
}
YzDefaultInterceptor.decorators = [
    { type: Injectable }
];
YzDefaultInterceptor.ctorParameters = () => [
    { type: Injector }
];

function mapYzSideToYelonMenu(menus) {
    menus.forEach(menu => {
        menu.badgeDot = menu.badge_dot || null;
        menu.badgeStatus = menu.badge_status || null;
        menu.shortcutRoot = menu.shortcut_root || null;
        menu.reuse = true;
        if (menu.children) {
            mapYzSideToYelonMenu(menu.children);
        }
    });
}
function generateAbility(menus, abilities, prefix) {
    menus.forEach(menu => {
        if (menu.link) {
            prefix += menu.link;
        }
        else {
            prefix += '';
        }
        if (menu.menuAuths) {
            menu.menuAuths.forEach((a) => {
                abilities.push(`${prefix}:${a}`);
                abilities.push(a);
            });
        }
        if (menu.children) {
            generateAbility(menu.children, abilities, prefix);
        }
    });
}
class YzStartupService {
    constructor(iconSrv, menuService, i18n, settingService, aclService, titleService, yzAuthService, cacheService, configService) {
        this.menuService = menuService;
        this.i18n = i18n;
        this.settingService = settingService;
        this.aclService = aclService;
        this.titleService = titleService;
        this.yzAuthService = yzAuthService;
        this.cacheService = cacheService;
        this.configService = configService;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.bis = mergeBisConfig(this.configService);
        iconSrv.addIcon(...ICONS);
    }
    load() {
        log$1('startup.service: ', 'load');
        const defaultLang = this.i18n.defaultLang;
        return this.i18n.loadLangData(defaultLang).pipe(mergeMap(langData => {
            log$1('startup.service: ', 'set i18n, defaultLang->', defaultLang, ' langData->', langData);
            this.i18n.use(defaultLang, langData);
            return of(null);
        }), mergeMap(() => {
            return this.yzAuthService.login();
        }), mergeMap(v => {
            // preloader finish
            this.systemInit();
            log$1('startup.service: preloader finish');
            const win = window;
            if (win && win.appBootstrap) {
                win.appBootstrap();
            }
            return of(v);
        }));
    }
    systemInit() {
        log$1('startup.service: system init');
        // user
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        // menu
        const ms = deepCopy(user.menu).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        mapYzSideToYelonMenu(ms);
        const currentMenu = ms.pop() || [];
        this.menuService.add([currentMenu]);
        // logo app
        this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
        this.settingService.setUser({
            name: user.realname || 'no name',
            avatar: `${this.bis.baseUrl}/filecenter/file/${user.avatarId}` || '',
            email: user.email || 'no email'
        });
        // title
        this.titleService.default = currentMenu && currentMenu.text ? currentMenu.text : 'default application name';
        this.titleService.setTitle(currentMenu && currentMenu.text ? currentMenu.text : 'no title');
        // acl
        const abilities = [];
        generateAbility([currentMenu], abilities, '');
        this.aclService.attachRole((user === null || user === void 0 ? void 0 : user.roles.map((role) => {
            return role.roleValue;
        }).filter((a) => !!a)) || []);
        this.aclService.attachAbility(abilities);
        // cache current
        this.cacheService.set('_yz_current', {
            text: currentMenu.text,
            intro: currentMenu.intro,
            icon: currentMenu.appIconUrl
        });
    }
}
YzStartupService.decorators = [
    { type: Injectable }
];
YzStartupService.ctorParameters = () => [
    { type: NzIconService },
    { type: MenuService },
    { type: YzI18NService, decorators: [{ type: Inject, args: [YUNZAI_I18N_TOKEN,] }] },
    { type: SettingsService },
    { type: ACLService },
    { type: TitleService },
    { type: YzAuthService },
    { type: CacheService },
    { type: YunzaiConfigService$1 }
];
function YzStartupServiceFactory(startupService) {
    return () => startupService.load();
}
//@ts-ignore
const YZ_APPINIT_PROVIDES = [
    YzStartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: YzStartupServiceFactory,
        deps: [YzStartupService],
        multi: true
    }
];

class PathToRegexpService {
    constructor() {
        this.DEFAULT_DELIMITER = '/';
        this.PATH_REGEXP = new RegExp(['(\\\\.)', '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');
    }
    parse(str, options) {
        const tokens = [];
        let key = 0;
        let index = 0;
        let path = '';
        const defaultDelimiter = (options && options.delimiter) || this.DEFAULT_DELIMITER;
        const whitelist = (options && options.whitelist) || undefined;
        let pathEscaped = false;
        let res;
        while ((res = this.PATH_REGEXP.exec(str)) !== null) {
            const m = res[0];
            const escaped = res[1];
            const offset = res.index;
            path += str.slice(index, offset);
            index = offset + m.length;
            // Ignore already escaped sequences.
            if (escaped) {
                path += escaped[1];
                pathEscaped = true;
                continue;
            }
            let prev = '';
            const name = res[2];
            const capture = res[3];
            const group = res[4];
            const modifier = res[5];
            if (!pathEscaped && path.length) {
                const k = path.length - 1;
                const c = path[k];
                const matches = whitelist ? whitelist.indexOf(c) > -1 : true;
                if (matches) {
                    prev = c;
                    path = path.slice(0, k);
                }
            }
            // Push the current path onto the tokens.
            if (path) {
                tokens.push(path);
                path = '';
                pathEscaped = false;
            }
            const repeat = modifier === '+' || modifier === '*';
            const optional = modifier === '?' || modifier === '*';
            const pattern = capture || group;
            const delimiter = prev || defaultDelimiter;
            tokens.push({
                name: name || key++,
                prefix: prev,
                delimiter: delimiter,
                optional: optional,
                repeat: repeat,
                pattern: pattern
                    ? this.escapeGroup(pattern)
                    : `[^${this.escapeString(delimiter === defaultDelimiter ? delimiter : delimiter + defaultDelimiter)}]+?`
            });
        }
        // Push any remaining characters.
        if (path || index < str.length) {
            tokens.push(path + str.substr(index));
        }
        return tokens;
    }
    compile(str, options) {
        return this.tokensToFunction(this.parse(str, options), options);
    }
    tokensToFunction(tokens, options) {
        const matches = new Array(tokens.length);
        for (let i = 0; i < tokens.length; i++) {
            if (typeof tokens[i] === 'object') {
                matches[i] = new RegExp(`^(?:${tokens[i].pattern})$`, this.flags(options));
            }
        }
        return function (data, options) {
            let path = '';
            const encode = (options && options.encode) || encodeURIComponent;
            const validate = options ? options.validate !== false : true;
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (typeof token === 'string') {
                    path += token;
                    continue;
                }
                const value = data ? data[token.name] : undefined;
                let segment;
                if (Array.isArray(value)) {
                    if (!token.repeat) {
                        throw new TypeError(`Expected "${token.name}" to not repeat, but got array`);
                    }
                    if (value.length === 0) {
                        if (token.optional) {
                            continue;
                        }
                        throw new TypeError(`Expected "${token.name}" to not be empty`);
                    }
                    for (let j = 0; j < value.length; j++) {
                        segment = encode(value[j], token);
                        if (validate && !matches[i].test(segment)) {
                            throw new TypeError(`Expected all "${token.name}" to match "${token.pattern}"`);
                        }
                        path += (j === 0 ? token.prefix : token.delimiter) + segment;
                    }
                    continue;
                }
                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    segment = encode(String(value), token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError(`Expected "${token.name}" to match "${token.pattern}", but got "${segment}"`);
                    }
                    path += token.prefix + segment;
                    continue;
                }
                if (token.optional) {
                    continue;
                }
                throw new TypeError(`Expected "${token.name}" to be ${token.repeat ? 'an array' : 'a string'}`);
            }
            return path;
        };
    }
    escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
    }
    escapeGroup(group) {
        return group.replace(/([=!:$/()])/g, '\\$1');
    }
    flags(options) {
        return options && options.sensitive ? '' : 'i';
    }
    regexpToRegexp(path, keys) {
        if (!keys) {
            return path;
        }
        const groups = path.source.match(/\((?!\?)/g);
        if (groups) {
            for (let i = 0; i < groups.length; i++) {
                keys.push({
                    name: i,
                    prefix: null,
                    delimiter: null,
                    optional: false,
                    repeat: false,
                    pattern: null
                });
            }
        }
        return path;
    }
    arrayToRegexp(path, keys, options) {
        const parts = [];
        for (let i = 0; i < path.length; i++) {
            parts.push(this.pathToRegexp(path[i], keys, options).source);
        }
        return new RegExp(`(?:${parts.join('|')})`, this.flags(options));
    }
    stringToRegexp(path, keys, options) {
        return this.tokensToRegExp(this.parse(path, options), keys, options);
    }
    tokensToRegExp(tokens, keys, options) {
        options = options || {};
        const strict = options.strict;
        const start = options.start !== false;
        const end = options.end !== false;
        const delimiter = options.delimiter || this.DEFAULT_DELIMITER;
        const endsWith = []
            .concat(options.endsWith || [])
            .map(this.escapeString)
            .concat('$')
            .join('|');
        let route = start ? '^' : '';
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (typeof token === 'string') {
                route += this.escapeString(token);
            }
            else {
                const capture = token.repeat
                    ? `(?:${token.pattern})(?:${this.escapeString(token.delimiter)}(?:${token.pattern}))*`
                    : token.pattern;
                if (keys) {
                    keys.push(token);
                }
                if (token.optional) {
                    if (!token.prefix) {
                        route += `(${capture})?`;
                    }
                    else {
                        route += `(?:${this.escapeString(token.prefix)}(${capture}))?`;
                    }
                }
                else {
                    route += `${this.escapeString(token.prefix)}(${capture})`;
                }
            }
        }
        if (end) {
            if (!strict) {
                route += `(?:${this.escapeString(delimiter)})?`;
            }
            route += endsWith === '$' ? '$' : `(?=${endsWith})`;
        }
        else {
            const endToken = tokens[tokens.length - 1];
            const isEndDelimited = typeof endToken === 'string' ? endToken[endToken.length - 1] === delimiter : endToken === undefined;
            if (!strict) {
                route += `(?:${this.escapeString(delimiter)}(?=${endsWith}))?`;
            }
            if (!isEndDelimited) {
                route += `(?=${this.escapeString(delimiter)}|${endsWith})`;
            }
        }
        return new RegExp(route, this.flags(options));
    }
    pathToRegexp(path, keys, options) {
        if (path instanceof RegExp) {
            return this.regexpToRegexp(path, keys);
        }
        if (Array.isArray(path)) {
            return this.arrayToRegexp(/** @type {!Array} */ path, keys, options);
        }
        return this.stringToRegexp(/** @type {string} */ path, keys, options);
    }
}
PathToRegexpService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PathToRegexpService_Factory() { return new PathToRegexpService(); }, token: PathToRegexpService, providedIn: "root" });
PathToRegexpService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
PathToRegexpService.ctorParameters = () => [];

class ActGuard {
    constructor(configService, cacheService, pathToRegexp, router) {
        this.configService = configService;
        this.cacheService = cacheService;
        this.pathToRegexp = pathToRegexp;
        this.router = router;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        log$1('act: ');
        this.bis = mergeBisConfig(this.configService);
        log$1('act: config ', this.bis);
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        log$1('act: user ', user);
        this.menus = deepCopy(user.menu).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        log$1('act: menus ', this.menus);
        this.getAllLinks(this.menus, this.links);
        log$1('act: links ', this.links);
    }
    canActivate(_, state) {
        log$1('act: can activate ', state);
        if (this.preHandle(state)) {
            return true;
        }
        log$1('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            log$1(`act: ${link} test ${state.url.split('?')[0]}`);
            if (regexp.test(state.url.split('?')[0])) {
                canactivate = true;
                log$1(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log$1(`act: test sucess`);
            return true;
        }
        else {
            log$1(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    canActivateChild(_, state) {
        log$1('act: can activate child ', state);
        if (this.preHandle(state)) {
            return true;
        }
        log$1('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            if (regexp.test(state.url.split('?')[0])) {
                log$1(`act: ${link} test ${state.url.split('?')[0]}`);
                canactivate = true;
                log$1(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log$1(`act: test sucess`);
            return true;
        }
        else {
            log$1(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    preHandle(state) {
        return (state.url.includes('error') ||
            state.url.includes('exception') ||
            state.url.includes('displayIndex') ||
            state.url === '' ||
            state.url === null ||
            state.url === '/' ||
            state.url.includes('iframePage'));
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push(sider.link);
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
}
ActGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function ActGuard_Factory() { return new ActGuard(i0.ɵɵinject(i1$1.YunzaiConfigService), i0.ɵɵinject(i2$1.CacheService), i0.ɵɵinject(PathToRegexpService), i0.ɵɵinject(i4.Router)); }, token: ActGuard, providedIn: "root" });
ActGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ActGuard.ctorParameters = () => [
    { type: YunzaiConfigService$1 },
    { type: CacheService },
    { type: PathToRegexpService },
    { type: Router }
];

// export * from './contact/contact.component';
// export * from './contact/contact.service';

/**
 * Generated bundle index. Do not edit.
 */

export { ActGuard, BUSINESS_DEFAULT_CONFIG, PathToRegexpService, STOMP_DEFAULT_CONFIG, TOPIC, YZ_APPINIT_PROVIDES, YunzaiLayoutModule, YzAuthService, YzDefaultInterceptor, YzHeaderApplicationComponent, YzHeaderClearStorageComponent, YzHeaderFullScreenComponent, YzHeaderI18NComponent, YzHeaderNotifyComponent, YzHeaderThemBtnComponent, YzHeaderUserComponent, YzI18NService, YzLayoutBasicComponent, YzStartupService, YzStartupServiceFactory, YzStompService, generateAbility, mapYzSideToYelonMenu, mergeBisConfig, mergeStompConfig, ɵ0, ContactComponent as ɵa, ContactService as ɵb, YzHeaderApplicationComponent as ɵc, YzHeaderNotifyComponent as ɵd, YzHeaderThemBtnComponent as ɵe, YzHeaderUserComponent as ɵf, YzHeaderFullScreenComponent as ɵg, YzHeaderClearStorageComponent as ɵh, YzHeaderI18NComponent as ɵi };
//# sourceMappingURL=layout.js.map
