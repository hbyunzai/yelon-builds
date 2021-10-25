import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, Injector, Inject, Input, ChangeDetectorRef, Renderer2, Optional, HostListener, isDevMode, NgModule, APP_INITIALIZER } from '@angular/core';
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
import * as i2 from 'ng-zorro-antd/i18n';
import { zh_CN, zh_TW, en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import * as i4 from '@yelon/util/config';
import { YunzaiConfigService } from '@yelon/util/config';
import { __decorate } from 'tslib';
import { InputBoolean } from '@yelon/util/decorator';
import { forkJoin, Subject, of, BehaviorSubject, throwError } from 'rxjs';
import { map, takeUntil, mergeMap, mergeAll, filter, take, switchMap, catchError } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { log } from '@yelon/util/other';
import { Directionality } from '@angular/cdk/bidi';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { YA_SERVICE_TOKEN, mergeConfig } from '@yelon/auth';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as screenfull from 'screenfull';
import { HttpClientModule, HttpResponse, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { YzSharedModule, ICONS } from '@yelon/bis/shared';
import { RxStomp } from '@stomp/rx-stomp';
import * as i3$1 from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ACLService } from '@yelon/acl';

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
        if (this._langs.findIndex(w => w.code === defaultLang)) {
            this._defaultLang = defaultLang;
        }
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
        this._data = data;
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
YzI18NService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzI18NService_Factory() { return new YzI18NService(i0.ɵɵinject(i1._HttpClient), i0.ɵɵinject(i1.SettingsService), i0.ɵɵinject(i2.NzI18nService), i0.ɵɵinject(i1.YelonLocaleService), i0.ɵɵinject(i3.Platform), i0.ɵɵinject(i4.YunzaiConfigService)); }, token: YzI18NService, providedIn: "root" });
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
    constructor(injector, msg, nzI18n, cdr, httpClient) {
        this.injector = injector;
        this.msg = msg;
        this.nzI18n = nzI18n;
        this.cdr = cdr;
        this.httpClient = httpClient;
        this.data = [
            {
                key: 'msg',
                title: '消息',
                list: [],
                emptyText: '您已读完所有消息',
                emptyImage: './assets/tmp/img/message.svg',
                clearText: '清空消息'
            },
            {
                key: 'todo',
                title: '待办',
                list: [],
                emptyText: '你已完成所有待办',
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: '重新加载'
            },
            {
                key: 'notice',
                title: '通知',
                list: [],
                emptyText: '你已查看所有通知',
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: '重新加载'
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
                    return { extra: '未读', color: 'red' };
                case '1':
                    return { extra: '已读', color: 'green' };
                default:
                    return { extra: '无状态', color: 'primary' };
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
                    return { extra: '未开始', color: 'red' };
                case '1':
                    return { extra: '已开始', color: 'green' };
                default:
                    return { extra: '无状态', color: 'primary' };
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
                this.msg.success(`清空了 ${type}`);
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
                log$1('yz.stomp.service: ', `config is ${this.config}`);
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
YzStompService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzStompService_Factory() { return new YzStompService(i0.ɵɵinject(i4.YunzaiConfigService), i0.ɵɵinject(i2$1.CacheService), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3$1.NzNotificationService)); }, token: YzStompService, providedIn: "root" });
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
    constructor(cacheService, yzStompService) {
        this.cacheService = cacheService;
        this.yzStompService = yzStompService;
        this.options = {
            logoExpanded: `./assets/logo-full.svg`,
            logoCollapsed: `./assets/logo.svg`
        };
        this.intro = '';
        this.text = '';
        this.icon = '';
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
    }
    ngOnDestroy() {
        this.yzStompService.unListen();
    }
}
YzLayoutBasicComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-layout-basic',
                template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="contentTpl">
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
        <reuse-tab #reuseTab></reuse-tab>
        <router-outlet (activate)="reuseTab.activate($event)"></router-outlet>
      </ng-template>
    </layout-default>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzLayoutBasicComponent.ctorParameters = () => [
    { type: CacheService },
    { type: YzStompService }
];

const COMPONENTS = [
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
                this.goTo(`/exception/${ev.status}`);
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
        const currentMenu = ms.pop();
        this.menuService.add([currentMenu]);
        // logo app
        this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
        this.settingService.setUser({
            name: user.realname || 'no name',
            avatar: `${this.bis.baseUrl}/filecenter/file/${user.avatarId}` || '',
            email: user.email || 'no email'
        });
        // title
        this.titleService.default = currentMenu.text || 'default application name';
        this.titleService.setTitle(currentMenu.text || 'no title');
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

/**
 * Generated bundle index. Do not edit.
 */

export { BUSINESS_DEFAULT_CONFIG, STOMP_DEFAULT_CONFIG, TOPIC, YZ_APPINIT_PROVIDES, YunzaiLayoutModule, YzAuthService, YzDefaultInterceptor, YzHeaderApplicationComponent, YzHeaderClearStorageComponent, YzHeaderFullScreenComponent, YzHeaderI18NComponent, YzHeaderNotifyComponent, YzHeaderThemBtnComponent, YzHeaderUserComponent, YzI18NService, YzLayoutBasicComponent, YzStartupService, YzStartupServiceFactory, YzStompService, generateAbility, mapYzSideToYelonMenu, mergeBisConfig, mergeStompConfig, ɵ0, YzHeaderApplicationComponent as ɵa, YzHeaderNotifyComponent as ɵb, YzHeaderThemBtnComponent as ɵc, YzHeaderUserComponent as ɵd, YzHeaderFullScreenComponent as ɵe, YzHeaderClearStorageComponent as ɵf, YzHeaderI18NComponent as ɵg };
//# sourceMappingURL=layout.js.map
