import * as i0 from '@angular/core';
import { InjectionToken, inject, Injectable, Optional, Inject, Pipe, SkipSelf, NgModule, Injector, Version } from '@angular/core';
import { BehaviorSubject, Subject, of, Observable, throwError } from 'rxjs';
import { filter, share, map, delay, tap, switchMap, finalize, catchError } from 'rxjs/operators';
import * as i1 from '@yelon/util/config';
import { YunzaiConfigService } from '@yelon/util/config';
import * as i1$1 from '@yelon/acl';
import { ACLService } from '@yelon/acl';
import * as i1$2 from '@angular/cdk/platform';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1$3 from '@angular/cdk/bidi';
import * as i3 from 'ng-zorro-antd/core/config';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as i1$4 from '@angular/platform-browser';
import { deepMerge } from '@yelon/util/other';
import * as i1$5 from 'ng-zorro-antd/modal';
import * as i1$6 from 'ng-zorro-antd/drawer';
import * as i1$7 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { formatDistanceToNow, format } from 'date-fns';
import { toDate } from '@yelon/util/date-time';
import * as i1$8 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { OverlayModule } from '@angular/cdk/overlay';
import { BellOutline, DeleteOutline, PlusOutline, InboxOutline } from '@ant-design/icons-angular/icons';
import * as i1$9 from 'ng-zorro-antd/icon';

function preloaderFinished() {
    const body = document.querySelector('body');
    const preloader = document.querySelector('.preloader');
    body.style.overflow = 'hidden';
    function remove() {
        // preloader value null when running --hmr
        if (!preloader)
            return;
        preloader.addEventListener('transitionend', () => {
            preloader.className = 'preloader-hidden';
        });
        preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
    }
    window.appBootstrap = () => {
        setTimeout(() => {
            remove();
            body.style.overflow = '';
        }, 100);
    };
}

const YUNZAI_I18N_TOKEN = new InjectionToken('yunzaiI18nToken', {
    providedIn: 'root',
    factory: () => new YunzaiI18NServiceFake(inject(YunzaiConfigService))
});
class YunzaiI18nBaseService {
    constructor(cogSrv) {
        this._change$ = new BehaviorSubject(null);
        this._currentLang = '';
        this._defaultLang = '';
        this._data = {};
        this.cog = cogSrv.merge('themeI18n', {
            interpolation: ['{{', '}}']
        });
    }
    get change() {
        return this._change$.asObservable().pipe(filter(w => w != null));
    }
    get defaultLang() {
        return this._defaultLang;
    }
    get currentLang() {
        return this._currentLang;
    }
    get data() {
        return this._data;
    }
    /**
     * Flattened data source
     *
     * @example
     * {
     *   "name": "Name",
     *   "sys": {
     *     "": "System",
     *     "title": "Title"
     *   }
     * }
     * =>
     * {
     *   "name": "Name",
     *   "sys": "System",
     *   "sys.title": "Title"
     * }
     */
    flatData(data, parentKey) {
        const res = {};
        for (const key of Object.keys(data)) {
            const value = data[key];
            if (typeof value === 'object') {
                const child = this.flatData(value, parentKey.concat(key));
                Object.keys(child).forEach(childKey => (res[childKey] = child[childKey]));
            }
            else {
                res[(key ? parentKey.concat(key) : parentKey).join('.')] = `${value}`;
            }
        }
        return res;
    }
    fanyi(path, params) {
        let content = this._data[path] || '';
        if (!content)
            return path;
        if (params) {
            const interpolation = this.cog.interpolation;
            Object.keys(params).forEach(key => (content = content.replace(new RegExp(`${interpolation[0]}\s?${key}\s?${interpolation[1]}`, 'g'), `${params[key]}`)));
        }
        return content;
    }
}
YunzaiI18nBaseService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18nBaseService, deps: [{ token: i1.YunzaiConfigService }], target: i0.????FactoryTarget.Injectable });
YunzaiI18nBaseService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18nBaseService });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18nBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; } });
class YunzaiI18NServiceFake extends YunzaiI18nBaseService {
    use(lang, data) {
        this._data = this.flatData(data ?? {}, []);
        this._currentLang = lang;
        this._change$.next(lang);
    }
    getLangs() {
        return [];
    }
}
YunzaiI18NServiceFake.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NServiceFake, deps: null, target: i0.????FactoryTarget.Injectable });
YunzaiI18NServiceFake.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NServiceFake, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NServiceFake, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * ???????????????[????????????](https://ng.yunzainfo.com/theme/menu)
 */
class MenuService {
    constructor(i18nSrv, aclService) {
        this.i18nSrv = i18nSrv;
        this.aclService = aclService;
        this._change$ = new BehaviorSubject([]);
        this.data = [];
        this.i18n$ = this.i18nSrv.change.subscribe(() => this.resume());
    }
    get change() {
        return this._change$.pipe(share());
    }
    visit(data, callback) {
        const inFn = (list, parentMenu, depth) => {
            for (const item of list) {
                callback(item, parentMenu, depth);
                if (item.children && item.children.length > 0) {
                    inFn(item.children, item, depth + 1);
                }
                else {
                    item.children = [];
                }
            }
        };
        inFn(data, null, 0);
    }
    add(items) {
        this.data = items;
        this.resume();
    }
    fixItem(item) {
        item._aclResult = true;
        if (!item.link)
            item.link = '';
        if (!item.externalLink)
            item.externalLink = '';
        // badge
        if (item.badge) {
            if (item.badgeDot !== true) {
                item.badgeDot = false;
            }
            if (!item.badgeStatus) {
                item.badgeStatus = 'error';
            }
        }
        if (!Array.isArray(item.children)) {
            item.children = [];
        }
        // icon
        if (typeof item.icon === 'string') {
            let type = 'class';
            let value = item.icon;
            // compatible `anticon anticon-user`
            if (~item.icon.indexOf(`anticon-`)) {
                type = 'icon';
                value = value.split('-').slice(1).join('-');
            }
            else if (/^https?:\/\//.test(item.icon)) {
                type = 'img';
            }
            item.icon = { type, value };
        }
        if (item.icon != null) {
            item.icon = { theme: 'outline', spin: false, ...item.icon };
        }
        item.text = item.i18n && this.i18nSrv ? this.i18nSrv.fanyi(item.i18n) : item.text;
        // group
        item.group = item.group !== false;
        // hidden
        item._hidden = typeof item.hide === 'undefined' ? false : item.hide;
        // disabled
        item.disabled = typeof item.disabled === 'undefined' ? false : item.disabled;
        // acl
        item._aclResult = item.acl && this.aclService ? this.aclService.can(item.acl) : true;
    }
    resume(callback) {
        let i = 1;
        const shortcuts = [];
        this.visit(this.data, (item, parent, depth) => {
            item._id = i++;
            item._parent = parent;
            item._depth = depth;
            this.fixItem(item);
            // shortcut
            if (parent && item.shortcut === true && parent.shortcutRoot !== true) {
                shortcuts.push(item);
            }
            if (callback)
                callback(item, parent, depth);
        });
        this.loadShortcut(shortcuts);
        this._change$.next(this.data);
    }
    /**
     * ????????????????????????????????????????????????
     * 1??????????????????0????????????????????????????????????????????????
     *      1?????? children ?????? ???shortcutRoot: true???????????????????????????????????????
     *      2????????????????????????dashboard?????????????????????????????????????????????????????????????????????
     *      3???????????????0????????????
     */
    loadShortcut(shortcuts) {
        if (shortcuts.length === 0 || this.data.length === 0) {
            return;
        }
        const ls = this.data[0].children;
        let pos = ls.findIndex(w => w.shortcutRoot === true);
        if (pos === -1) {
            pos = ls.findIndex(w => w.link.includes('dashboard'));
            pos = (pos !== -1 ? pos : -1) + 1;
            const shortcutMenu = {
                text: '????????????',
                i18n: 'shortcut',
                icon: 'icon-rocket',
                children: []
            };
            this.data[0].children.splice(pos, 0, shortcutMenu);
        }
        let _data = this.data[0].children[pos];
        if (_data.i18n && this.i18nSrv)
            _data.text = this.i18nSrv.fanyi(_data.i18n);
        _data = Object.assign(_data, {
            shortcutRoot: true,
            _id: -1,
            _parent: null,
            _depth: 1
        });
        _data.children = shortcuts.map(i => {
            i._depth = 2;
            i._parent = _data;
            return i;
        });
    }
    get menus() {
        return this.data;
    }
    /**
     * ????????????
     */
    clear() {
        this.data = [];
        this._change$.next(this.data);
    }
    getHit(data, url, recursive = false, cb = null) {
        let item = null;
        while (!item && url) {
            this.visit(data, i => {
                if (cb) {
                    cb(i);
                }
                if (i.link != null && i.link === url) {
                    item = i;
                }
            });
            if (!recursive)
                break;
            if (/[?;]/g.test(url)) {
                url = url.split(/[?;]/g)[0];
            }
            else {
                url = url.split('/').slice(0, -1).join('/');
            }
        }
        return item;
    }
    /**
     * ??????URL???????????? `_open` ??????
     * - ??? `recursive: true` ??????????????????????????????
     *  - ????????????????????? `/ware`?????? `/ware/1` ????????? `/ware` ???
     */
    openedByUrl(url, recursive = false) {
        if (!url)
            return;
        let findItem = this.getHit(this.data, url, recursive, (i) => {
            i._selected = false;
            i._open = false;
        });
        if (findItem == null)
            return;
        do {
            findItem._selected = true;
            findItem._open = true;
            findItem = findItem._parent;
        } while (findItem);
    }
    /**
     * ??????url??????????????????
     * - ??? `recursive: true` ??????????????????????????????
     *  - ????????????????????? `/ware`?????? `/ware/1` ????????? `/ware` ???
     */
    getPathByUrl(url, recursive = false) {
        const ret = [];
        let item = this.getHit(this.data, url, recursive);
        if (!item)
            return ret;
        do {
            ret.splice(0, 0, item);
            item = item._parent;
        } while (item);
        return ret;
    }
    /**
     * Get menu based on `key`
     */
    getItem(key) {
        let res = null;
        this.visit(this.data, item => {
            if (res == null && item.key === key) {
                res = item;
            }
        });
        return res;
    }
    /**
     * Set menu based on `key`
     */
    setItem(key, value) {
        const item = this.getItem(key);
        if (item == null)
            return;
        Object.keys(value).forEach(k => {
            item[k] = value[k];
        });
        this.fixItem(item);
        this._change$.next(this.data);
    }
    ngOnDestroy() {
        this._change$.unsubscribe();
        this.i18n$.unsubscribe();
    }
}
MenuService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: MenuService, deps: [{ token: YUNZAI_I18N_TOKEN, optional: true }, { token: i1$1.ACLService, optional: true }], target: i0.????FactoryTarget.Injectable });
MenuService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: MenuService, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: MenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i1$1.ACLService, decorators: [{
                    type: Optional
                }] }]; } });

const YUNZAI_SETTING_KEYS = new InjectionToken('YUNZAI_SETTING_KEYS');
class SettingsService {
    constructor(platform, KEYS) {
        this.platform = platform;
        this.KEYS = KEYS;
        this.notify$ = new Subject();
        this._app = null;
        this._user = null;
        this._layout = null;
    }
    getData(key) {
        if (!this.platform.isBrowser) {
            return null;
        }
        return JSON.parse(localStorage.getItem(key) || 'null') || null;
    }
    setData(key, value) {
        if (!this.platform.isBrowser) {
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    }
    get layout() {
        if (!this._layout) {
            this._layout = {
                fixed: true,
                collapsed: false,
                boxed: false,
                lang: null,
                ...this.getData(this.KEYS.layout)
            };
            this.setData(this.KEYS.layout, this._layout);
        }
        return this._layout;
    }
    get app() {
        if (!this._app) {
            this._app = {
                year: new Date().getFullYear(),
                ...this.getData(this.KEYS.app)
            };
            this.setData(this.KEYS.app, this._app);
        }
        return this._app;
    }
    get user() {
        if (!this._user) {
            this._user = { ...this.getData(this.KEYS.user) };
            this.setData(this.KEYS.user, this._user);
        }
        return this._user;
    }
    get notify() {
        return this.notify$.asObservable();
    }
    setLayout(name, value) {
        if (typeof name === 'string') {
            this.layout[name] = value;
        }
        else {
            this._layout = name;
        }
        this.setData(this.KEYS.layout, this._layout);
        this.notify$.next({ type: 'layout', name, value });
        return true;
    }
    getLayout() {
        return this._layout;
    }
    setApp(value) {
        this._app = value;
        this.setData(this.KEYS.app, value);
        this.notify$.next({ type: 'app', value });
    }
    getApp() {
        return this._app;
    }
    setUser(value) {
        this._user = value;
        this.setData(this.KEYS.user, value);
        this.notify$.next({ type: 'user', value });
    }
    getUser() {
        return this._user;
    }
}
SettingsService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: SettingsService, deps: [{ token: i1$2.Platform }, { token: YUNZAI_SETTING_KEYS }], target: i0.????FactoryTarget.Injectable });
SettingsService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: SettingsService, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: SettingsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$2.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [YUNZAI_SETTING_KEYS]
                }] }]; } });

const REP_MAX = 6;
class ResponsiveService {
    constructor(cogSrv) {
        this.cog = cogSrv.merge('themeResponsive', {
            rules: {
                1: { xs: 24 },
                2: { xs: 24, sm: 12 },
                3: { xs: 24, sm: 12, md: 8 },
                4: { xs: 24, sm: 12, md: 8, lg: 6 },
                5: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
                6: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2 }
            }
        });
        if (Object.keys(this.cog.rules)
            .map(i => +i)
            .some((i) => i < 1 || i > REP_MAX)) {
            throw new Error(`[theme] the responseive rule index value range must be 1-${REP_MAX}`);
        }
    }
    genCls(count) {
        const rule = this.cog.rules[count > REP_MAX ? REP_MAX : Math.max(count, 1)];
        const antColClass = 'ant-col';
        const clsMap = [`${antColClass}-xs-${rule.xs}`];
        if (rule.sm)
            clsMap.push(`${antColClass}-sm-${rule.sm}`);
        if (rule.md)
            clsMap.push(`${antColClass}-md-${rule.md}`);
        if (rule.lg)
            clsMap.push(`${antColClass}-lg-${rule.lg}`);
        if (rule.xl)
            clsMap.push(`${antColClass}-xl-${rule.xl}`);
        if (rule.xxl)
            clsMap.push(`${antColClass}-xxl-${rule.xxl}`);
        return clsMap;
    }
}
ResponsiveService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ResponsiveService, deps: [{ token: i1.YunzaiConfigService }], target: i0.????FactoryTarget.Injectable });
ResponsiveService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ResponsiveService, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ResponsiveService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; } });

const HTML_DIR = 'dir';
const RTL_DIRECTION = 'direction';
const RTL_NZ_COMPONENTS = ['modal', 'drawer', 'message', 'notification', 'image'];
const RTL_YELON_COMPONENTS = ['loading', 'onboarding'];
const LTR = 'ltr';
const RTL = 'rtl';
class RTLService {
    constructor(d, srv, nz, yelon, platform, doc) {
        this.d = d;
        this.srv = srv;
        this.nz = nz;
        this.yelon = yelon;
        this.platform = platform;
        this.doc = doc;
        this._dir = LTR;
        this.dir = srv.layout.direction === RTL ? RTL : LTR;
    }
    /**
     * Get or Set the current text direction
     *
     * ?????????????????????????????????
     */
    get dir() {
        return this._dir;
    }
    set dir(value) {
        this._dir = value;
        this.updateLibConfig();
        this.updateHtml();
        // Should be wait inited
        Promise.resolve().then(() => {
            this.d.value = value;
            this.d.change.emit(value);
            this.srv.setLayout(RTL_DIRECTION, value);
        });
    }
    /**
     * Get the next text direction
     *
     * ???????????????????????????
     */
    get nextDir() {
        return this.dir === LTR ? RTL : LTR;
    }
    /**
     * Subscription change notification
     *
     * ??????????????????
     */
    get change() {
        return this.srv.notify.pipe(filter(w => w.name === RTL_DIRECTION), map(v => v.value));
    }
    /**
     * Toggle text direction
     *
     * ??????????????????
     */
    toggle() {
        this.dir = this.nextDir;
    }
    updateHtml() {
        if (!this.platform.isBrowser) {
            return;
        }
        const htmlEl = this.doc.querySelector('html');
        if (htmlEl) {
            const dir = this.dir;
            htmlEl.style.direction = dir;
            htmlEl.classList.remove(RTL, LTR);
            htmlEl.classList.add(dir);
            htmlEl.setAttribute(HTML_DIR, dir);
        }
    }
    updateLibConfig() {
        RTL_NZ_COMPONENTS.forEach(name => {
            this.nz.set(name, { nzDirection: this.dir });
        });
        RTL_YELON_COMPONENTS.forEach(name => {
            this.yelon.set(name, { direction: this.dir });
        });
    }
}
RTLService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: RTLService, deps: [{ token: i1$3.Directionality }, { token: SettingsService }, { token: i3.NzConfigService }, { token: i1.YunzaiConfigService }, { token: i1$2.Platform }, { token: DOCUMENT }], target: i0.????FactoryTarget.Injectable });
RTLService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: RTLService, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: RTLService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$3.Directionality }, { type: SettingsService }, { type: i3.NzConfigService }, { type: i1.YunzaiConfigService }, { type: i1$2.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

class TitleService {
    constructor(injector, title, menuSrv, i18nSrv, doc) {
        this.injector = injector;
        this.title = title;
        this.menuSrv = menuSrv;
        this.i18nSrv = i18nSrv;
        this.doc = doc;
        this._prefix = '';
        this._suffix = '';
        this._separator = ' - ';
        this._reverse = false;
        this.DELAY_TIME = 25;
        /** ????????????????????? */
        this.default = `Not Page Name`;
        this.i18n$ = this.i18nSrv.change.pipe(filter(() => !!this.i18n$)).subscribe(() => this.setTitle());
    }
    /** ??????????????? */
    set separator(value) {
        this._separator = value;
    }
    /** ???????????? */
    set prefix(value) {
        this._prefix = value;
    }
    /** ???????????? */
    set suffix(value) {
        this._suffix = value;
    }
    /** ?????????????????? */
    set reverse(value) {
        this._reverse = value;
    }
    getByElement() {
        const el = (this.doc.querySelector('.yunzai-default__content-title h1') ||
            this.doc.querySelector('.page-header__title'));
        if (el) {
            let text = '';
            el.childNodes.forEach(val => {
                if (!text && val.nodeType === 3) {
                    text = val.textContent.trim();
                }
            });
            return text || el.firstChild.textContent.trim();
        }
        return '';
    }
    getByRoute() {
        let next = this.injector.get(ActivatedRoute);
        while (next.firstChild)
            next = next.firstChild;
        const data = (next.snapshot && next.snapshot.data) || {};
        if (data.titleI18n && this.i18nSrv)
            data.title = this.i18nSrv.fanyi(data.titleI18n);
        return data.title;
    }
    getByMenu() {
        const menus = this.menuSrv.getPathByUrl(this.injector.get(Router).url);
        if (!menus || menus.length <= 0)
            return '';
        const item = menus[menus.length - 1];
        let title;
        if (item.i18n && this.i18nSrv)
            title = this.i18nSrv.fanyi(item.i18n);
        return title || item.text;
    }
    _setTitle(title) {
        if (!title) {
            title = this.getByRoute() || this.getByMenu() || this.getByElement() || this.default;
        }
        if (title && !Array.isArray(title)) {
            title = [title];
        }
        let newTitles = [];
        if (this._prefix) {
            newTitles.push(this._prefix);
        }
        newTitles.push(...title);
        if (this._suffix) {
            newTitles.push(this._suffix);
        }
        if (this._reverse) {
            newTitles = newTitles.reverse();
        }
        this.title.setTitle(newTitles.join(this._separator));
    }
    /**
     * Set the document title, will be delay `25ms`, pls refer to [#1261](https://github.com/hbyunzai/ng-yunzai/issues/1261)
     */
    setTitle(title) {
        setTimeout(() => this._setTitle(title), this.DELAY_TIME);
    }
    /**
     * Set i18n key of the document title
     */
    setTitleByI18n(key, params) {
        this.setTitle(this.i18nSrv.fanyi(key, params));
    }
    ngOnDestroy() {
        this.i18n$.unsubscribe();
    }
}
TitleService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: TitleService, deps: [{ token: i0.Injector }, { token: i1$4.Title }, { token: MenuService }, { token: YUNZAI_I18N_TOKEN, optional: true }, { token: DOCUMENT }], target: i0.????FactoryTarget.Injectable });
TitleService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: TitleService, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: TitleService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$4.Title }, { type: MenuService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

class I18nPipe {
    constructor(i18n) {
        this.i18n = i18n;
    }
    transform(key, params) {
        return this.i18n.fanyi(key, params);
    }
}
I18nPipe.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: I18nPipe, deps: [{ token: YUNZAI_I18N_TOKEN }], target: i0.????FactoryTarget.Pipe });
I18nPipe.??pipe = i0.????ngDeclarePipe({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: I18nPipe, name: "i18n" });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: I18nPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'i18n' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }]; } });

class YunzaiI18NGuard {
    constructor(i18nSrv, cogSrv) {
        this.i18nSrv = i18nSrv;
        this.cogSrv = cogSrv;
    }
    resolve(route) {
        const lang = route.params && route.params[this.cogSrv.get('themeI18n')?.paramNameOfUrlGuard ?? 'i18n'];
        if (lang != null) {
            this.i18nSrv.use(lang);
        }
        return of(true);
    }
    canActivateChild(childRoute, _) {
        return this.resolve(childRoute);
    }
    canActivate(route, _) {
        return this.resolve(route);
    }
}
YunzaiI18NGuard.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NGuard, deps: [{ token: YUNZAI_I18N_TOKEN, optional: true }, { token: i1.YunzaiConfigService }], target: i0.????FactoryTarget.Injectable });
YunzaiI18NGuard.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NGuard, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiI18NGuard, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i1.YunzaiConfigService }]; } });

const YELON_LOCALE = new InjectionToken('yelon-locale');

var zhCN = {
    abbr: 'zh-CN',
    exception: {
        403: '?????????????????????????????????',
        404: '????????????????????????????????????',
        500: '???????????????????????????',
        backToHome: '????????????'
    },
    noticeIcon: {
        emptyText: '????????????',
        clearText: '??????'
    },
    reuseTab: {
        close: '????????????',
        closeOther: '??????????????????',
        closeRight: '??????????????????',
        refresh: '??????'
    },
    tagSelect: {
        expand: '??????',
        collapse: '??????'
    },
    miniProgress: {
        target: '????????????'
    },
    st: {
        total: '??? {{total}} ???',
        filterConfirm: '??????',
        filterReset: '??????'
    },
    sf: {
        submit: '??????',
        reset: '??????',
        search: '??????',
        edit: '??????',
        addText: '??????',
        removeText: '??????',
        checkAllText: '??????',
        error: {
            'false schema': `??????????????????`,
            $ref: `??????????????????{ref}`,
            additionalItems: `???????????????{limit}?????????`,
            additionalProperties: `???????????????????????????`,
            anyOf: `???????????? anyOf ????????????????????????`,
            dependencies: `??????????????????{property}???????????????{deps}`,
            enum: `????????????????????????????????????`,
            format: `???????????????`,
            type: `??????????????? {type}`,
            required: `?????????`,
            maxLength: `?????? {limit} ?????????`,
            minLength: `?????? {limit} ???????????????`,
            minimum: `?????? {comparison}{limit}`,
            formatMinimum: `?????? {comparison}{limit}`,
            maximum: `?????? {comparison}{limit}`,
            formatMaximum: `?????? {comparison}{limit}`,
            maxItems: `???????????? {limit} ??????`,
            minItems: `???????????? {limit} ??????`,
            maxProperties: `???????????? {limit} ?????????`,
            minProperties: `???????????? {limit} ?????????`,
            multipleOf: `????????? {multipleOf} ????????????`,
            not: `??????????????? "not" schema`,
            oneOf: `?????????????????? "oneOf" ?????? schema`,
            pattern: `?????????????????????`,
            uniqueItems: `???????????????????????? (??? {j} ????????? {i} ???????????????)`,
            custom: `???????????????`,
            propertyNames: `????????? "{propertyName}" ??????`,
            patternRequired: `??????????????????????????? {missingPattern}`,
            switch: `?????? {caseIndex} ?????????????????? "switch" ??????`,
            const: `??????????????????`,
            contains: `???????????????????????????`,
            formatExclusiveMaximum: `formatExclusiveMaximum ??????????????????`,
            formatExclusiveMinimum: `formatExclusiveMinimum ??????????????????`,
            if: `?????????????????? "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `??????`,
        prev: `?????????`,
        next: `?????????`,
        done: `??????`
    }
};

class YelonLocaleService {
    constructor(locale) {
        this._locale = zhCN;
        this.change$ = new BehaviorSubject(this._locale);
        this.setLocale(locale || zhCN);
    }
    get change() {
        return this.change$.asObservable();
    }
    setLocale(locale) {
        if (this._locale && this._locale.abbr === locale.abbr) {
            return;
        }
        this._locale = locale;
        this.change$.next(locale);
    }
    get locale() {
        return this._locale;
    }
    getData(path) {
        return (this._locale[path] || {});
    }
}
YelonLocaleService.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleService, deps: [{ token: YELON_LOCALE }], target: i0.????FactoryTarget.Injectable });
YelonLocaleService.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleService });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [YELON_LOCALE]
                }] }]; } });
function YELON_LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale) {
    return exist || new YelonLocaleService(locale);
}
const YELON_LOCALE_SERVICE_PROVIDER = {
    provide: YelonLocaleService,
    useFactory: YELON_LOCALE_SERVICE_PROVIDER_FACTORY,
    deps: [[new Optional(), new SkipSelf(), YelonLocaleService], YELON_LOCALE]
};

class YelonLocaleModule {
}
YelonLocaleModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleModule, deps: [], target: i0.????FactoryTarget.NgModule });
YelonLocaleModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleModule });
YelonLocaleModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleModule, providers: [{ provide: YELON_LOCALE, useValue: zhCN }, YELON_LOCALE_SERVICE_PROVIDER] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YelonLocaleModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [{ provide: YELON_LOCALE, useValue: zhCN }, YELON_LOCALE_SERVICE_PROVIDER]
                }]
        }] });

var enUS = {
    abbr: 'en-US',
    exception: {
        403: `Sorry, you don't have access to this page`,
        404: `Sorry, the page you visited does not exist`,
        500: `Sorry, the server is reporting an error`,
        backToHome: 'Back To Home'
    },
    noticeIcon: {
        emptyText: 'No data',
        clearText: 'Clear'
    },
    reuseTab: {
        close: 'Close tab',
        closeOther: 'Close other tabs',
        closeRight: 'Close tabs to right',
        refresh: 'Refresh'
    },
    tagSelect: {
        expand: 'Expand',
        collapse: 'Collapse'
    },
    miniProgress: {
        target: 'Target: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} of {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Reset'
    },
    sf: {
        submit: 'Submit',
        reset: 'Reset',
        search: 'Search',
        edit: 'Save',
        addText: 'Add',
        removeText: 'Remove',
        checkAllText: 'Check all',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Skip`,
        prev: `Prev`,
        next: `Next`,
        done: `Done`
    }
};

var zhTW = {
    abbr: 'zh-TW',
    exception: {
        403: '?????????????????????????????????',
        404: '????????????????????????????????????',
        500: '???????????????????????????',
        backToHome: '????????????'
    },
    noticeIcon: {
        emptyText: '????????????',
        clearText: '??????'
    },
    reuseTab: {
        close: '????????????',
        closeOther: '??????????????????',
        closeRight: '??????????????????',
        refresh: '??????'
    },
    tagSelect: {
        expand: '??????',
        collapse: '??????'
    },
    miniProgress: {
        target: '????????????'
    },
    st: {
        total: '??? {{total}} ???',
        filterConfirm: '??????',
        filterReset: '??????'
    },
    sf: {
        submit: '??????',
        reset: '??????',
        search: '??????',
        edit: '??????',
        addText: '??????',
        removeText: '??????',
        checkAllText: '??????',
        error: {
            'false schema': `??????????????????`,
            $ref: `??????????????????{ref}`,
            additionalItems: `???????????????{ref}`,
            additionalProperties: `???????????????????????????`,
            anyOf: `???????????? anyOf ????????????????????????`,
            dependencies: `??????????????????{property}???????????????{deps}`,
            enum: `????????????????????????????????????`,
            format: `???????????????`,
            type: `??????????????? {type}`,
            required: `?????????`,
            maxLength: `?????? {limit} ?????????`,
            minLength: `?????? {limit} ???????????????`,
            minimum: `?????? {comparison}{limit}`,
            formatMinimum: `?????? {comparison}{limit}`,
            maximum: `?????? {comparison}{limit}`,
            formatMaximum: `?????? {comparison}{limit}`,
            maxItems: `???????????? {limit} ??????`,
            minItems: `???????????? {limit} ??????`,
            maxProperties: `???????????? {limit} ?????????`,
            minProperties: `???????????? {limit} ?????????`,
            multipleOf: `????????? {multipleOf} ????????????`,
            not: `??????????????? "not" schema`,
            oneOf: `?????????????????? "oneOf" ?????? schema`,
            pattern: `?????????????????????`,
            uniqueItems: `???????????????????????? (??? {j} ????????? {i} ???????????????)`,
            custom: `???????????????`,
            propertyNames: `????????? "{propertyName}" ??????`,
            patternRequired: `??????????????????????????? {missingPattern}`,
            switch: `?????? {caseIndex} ?????????????????? "switch" ??????`,
            const: `??????????????????`,
            contains: `???????????????????????????`,
            formatExclusiveMaximum: `formatExclusiveMaximum ??????????????????`,
            formatExclusiveMinimum: `formatExclusiveMinimum ??????????????????`,
            if: `?????????????????? "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `??????`,
        prev: `?????????`,
        next: `?????????`,
        done: `??????`
    }
};

var trTR = {
    abbr: 'tr-TR',
    exception: {
        403: `??zg??n??z, bu sayfaya eri??iminiz yok`,
        404: `Maalesef bu sayfa mevcut de??il`,
        500: `??zg??n??z, sunucu hatas??`,
        backToHome: `Ana Sayfa'ya geri d??n`
    },
    noticeIcon: {
        emptyText: 'Veri yok',
        clearText: 'Temiz'
    },
    reuseTab: {
        close: 'Sekmeyi Kapat',
        closeOther: 'Di??er sekmeleri kapat',
        closeRight: 'Sa??daki sekmeleri kapat',
        refresh: 't??zele'
    },
    tagSelect: {
        expand: 'Geni??let',
        collapse: 'Daralt'
    },
    miniProgress: {
        target: 'Hedef: '
    },
    st: {
        total: '{{range[0]}} ile {{range[1]}} aras??nda {{total}}',
        filterConfirm: 'Tamam',
        filterReset: 'S??f??rla'
    },
    sf: {
        submit: 'G??nder',
        reset: 'S??f??rla',
        search: 'Ara',
        edit: 'Kaydet',
        addText: 'Ekle',
        removeText: 'Kald??r',
        checkAllText: 'T??m??n?? kontrol et',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Atla`,
        prev: `??nceki`,
        next: `Sonraki`,
        done: `Bitti`
    }
};

var plPL = {
    abbr: 'pl-PL',
    exception: {
        403: `Niestety, nie masz uprawnie?? do tej strony`,
        404: `Niestety, ta strona nie istnieje`,
        500: `Niestety, b????d serwera`,
        backToHome: 'Powr???? do strony g????wnej'
    },
    noticeIcon: {
        emptyText: 'Brak danych',
        clearText: 'Wyczy????'
    },
    reuseTab: {
        close: 'Zamknij kart??',
        closeOther: 'Zamknij inne karty',
        closeRight: 'Zamknij karty po prawej',
        refresh: 'Refresh'
    },
    tagSelect: {
        expand: 'Rozszerz',
        collapse: 'Zmniejsz'
    },
    miniProgress: {
        target: 'Cel: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} z {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Wyczy????'
    },
    sf: {
        submit: 'Wy??lij',
        reset: 'Resetuj',
        search: 'Szukaj',
        edit: 'Zapisz',
        addText: 'Dodaj',
        removeText: 'Usu??',
        checkAllText: 'Zaznacz wszystkie',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Pomin????`,
        prev: `Poprzedni`,
        next: `Kolejny`,
        done: `Gotowe`
    }
};

var elGR = {
    abbr: 'el-GR',
    exception: {
        403: `????????????????????, ?????? ?????????? ???????????????? ???? ?????????? ???? ????????????`,
        404: `????????????????????, ?? ???????????? ???????? ?????? ??????????????`,
        500: `????????????????????, ???????????? ????????????????????`,
        backToHome: '?????????????????? ???????? ???????????? ????????????'
    },
    noticeIcon: {
        emptyText: '?????? ???????????????? ????????????????',
        clearText: '????????????????????'
    },
    reuseTab: {
        close: '???????????????? ????????????????',
        closeOther: '???????????????? ?????? ?????????? ????????????????',
        closeRight: '???????????????? ?????? ???????????????? ??????????',
        refresh: '????????????????'
    },
    tagSelect: {
        expand: '????????????????',
        collapse: '????????????????'
    },
    miniProgress: {
        target: '????????????: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} ?????? {{total}}',
        filterConfirm: '????',
        filterReset: '??????????????????'
    },
    sf: {
        submit: '??????????????',
        reset: '??????????????????',
        search: '??????????????????',
        edit: '????????????????????',
        addText: '????????????????',
        removeText: '????????????????',
        checkAllText: '?????????????? ????????',
        error: {
            'false schema': `?? ?????????????? ???????? ?????????? ????????????`,
            $ref: `?????? ?????????? ???????????? ?? ?????????????? ?????? ???????????????? {ref}`,
            additionalItems: `?????? ???????????? ???? ???????? ?????????????????????? ?????? {limit} ????????????????`,
            additionalProperties: `?????? ???????????? ???? ???????? ???????????????? ????????????????????????????`,
            anyOf: `???????????? ???? ?????????????????? ???? ???????????? ?????? ?????? ?????????? ?????? "anyOf"`,
            dependencies: `???? ???????????????????????????? {deps} ?????????? ????????????????????, ???????? ?????????????? ???? ???????????????????????????? {property}`,
            enum: `???????????? ???? ?????????? ?????? ???? ?????? ?????? ?????? ?????????????????????????????? ??????????`,
            format: `???????????? ???? ???????? ?????? ?????????? "{format}"`,
            type: `???????????? ???? ?????????? {type}`,
            required: `????????????????????`,
            maxLength: `?????? ???????????? ???? ?????????? ???????????????????? ?????? {limit} ????????????????????`,
            minLength: `?????? ???????????? ???? ?????????? ?????????????????? ?????? {limit} ????????????????????`,
            minimum: `???????????? ???? ?????????? {comparison} {limit}`,
            formatMinimum: `???????????? ???? ?????????? {comparison} {limit}`,
            maximum: `???????????? ???? ?????????? {comparison} {limit}`,
            formatMaximum: `???????????? ???? ?????????? {comparison} {limit}`,
            maxItems: `?????? ???????????? ???? ???????? ?????????????????????? ?????? {limit} ????????????????`,
            minItems: `?????? ???????????? ???? ???????? ???????????????? ?????? {limit} ????????????????`,
            maxProperties: `?????? ???????????? ???? ???????? ?????????????????????? ?????? {limit} ????????????????????????????`,
            minProperties: `?????? ???????????? ???? ???????? ???????????????? ?????? {limit} ????????????????????????????`,
            multipleOf: `???????????? ???? ?????????? ?????????????????????? ?????? {multipleOf}`,
            not: `?????? ???????????? ???? ?????????? ????????????, ?????????????? ???? ?????? ???????? ?????? "not"`,
            oneOf: `???????????? ???? ?????????????????? ???? ?????????????? ?????? ?????? ?????? ?????????? ?????? "oneOf"`,
            pattern: `???????????? ???? ?????????????????? ???? ???? ?????????????? "{pattern}"`,
            uniqueItems: `???? ???????????????? ?????? ???????????? ???? ???????????????????????????????? (???? ???????????????? ## {j} ?????? {i} ?????????? ????????)`,
            custom: `???????????? ???? ???????? ?????? ??????????`,
            propertyNames: `???? ?????????? ?????? ?????????????????????????????? "{propertyName}" ?????? ?????????? ????????????`,
            patternRequired: `???????????? ???? ?????????????? ???? ???????????????????????????? ?????????????????????????? ???????????????? "{missingPattern}"`,
            switch: `???????????? ???? ?????????????? ?? ?????????????? ?????????????????????? ?????? ??????????-???????????????? ???? ?????? ?????????? ?????? "switch", ?? ?????????????????? {caseIndex} ??????????????????????`,
            const: `???????????? ???? ?????????? ?????? ???? ??????????????`,
            contains: `???????????? ???? ???????????????? ???????????? ???????????? ????????????????`,
            formatExclusiveMaximum: `formatExclusiveMaximum ???????????? ???? ?????????? boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum ???????????? ???? ?????????? boolean`,
            if: `???????????? ???? ?????????????????? ???????? ???????? "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `??????????????????`,
        prev: `??????????????????????`,
        next: `??????????????`,
        done: `????????????????????????`
    }
};

var koKR = {
    abbr: 'ko-KR',
    exception: {
        403: `???????????????.??? ???????????? ????????? ??? ??? ????????????.`,
        404: `???????????????. ?????? ???????????? ????????????.`,
        500: `???????????????, ?????? ????????? ????????????.`,
        backToHome: '????????? ???????????????.'
    },
    noticeIcon: {
        emptyText: '????????? ??????',
        clearText: '?????????'
    },
    reuseTab: {
        close: '??? ??????',
        closeOther: '?????? ??? ??????',
        closeRight: '????????? ??? ??????',
        refresh: '????????? ??????'
    },
    tagSelect: {
        expand: '?????????',
        collapse: '??????'
    },
    miniProgress: {
        target: '??????: '
    },
    st: {
        total: '?????? {{total}}???',
        filterConfirm: '??????',
        filterReset: '?????????'
    },
    sf: {
        submit: '??????',
        reset: '?????????',
        search: '??????',
        edit: '??????',
        addText: '??????',
        removeText: '??????',
        checkAllText: '?????? ??????',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `?????? ??????`,
        prev: `??????`,
        next: `??????`,
        done: `??????`
    }
};

var hrHR = {
    abbr: 'hr-HR',
    exception: {
        403: `Na??alost, nemate pristup ovoj lokaciji`,
        404: `Na??alost, lokacija ne postoji`,
        500: `Na??alost, server je javio pogre??ku`,
        backToHome: 'Nazad na po??etnu stranicu'
    },
    noticeIcon: {
        emptyText: 'Nema podataka',
        clearText: 'Obri??i'
    },
    reuseTab: {
        close: 'Zatvori karticu',
        closeOther: 'Zatvori druge kartice',
        closeRight: 'Zatvori kartice desno',
        refresh: 'Refresh'
    },
    tagSelect: {
        expand: 'Pro??iri',
        collapse: 'Skupi'
    },
    miniProgress: {
        target: 'Cilj: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} od {{total}}',
        filterConfirm: 'U redu',
        filterReset: 'Poni??ti'
    },
    sf: {
        submit: 'Po??alji',
        reset: 'Poni??ti',
        search: 'Pretra??i',
        edit: 'Spremi',
        addText: 'Dodaj',
        removeText: 'Ukloni',
        checkAllText: 'Ozna??i sve'
    },
    onboarding: {
        skip: `Presko??iti`,
        prev: `Prethodna`,
        next: `Sljede??i`,
        done: `Sastavljeno`
    }
};

var jaJP = {
    abbr: 'ja-JP',
    exception: {
        403: '???????????????????????????????????????????????????',
        404: '??????????????????????????????',
        500: '??????????????????????????????????????????',
        backToHome: '??????????????????'
    },
    noticeIcon: {
        emptyText: '???????????????????????????',
        clearText: '?????????'
    },
    reuseTab: {
        close: '??????????????????',
        closeOther: '????????????????????????',
        closeRight: '????????????????????????',
        refresh: '??????????????????'
    },
    tagSelect: {
        expand: '????????????',
        collapse: '???????????????'
    },
    miniProgress: {
        target: '?????????: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} / {{total}}',
        filterConfirm: '??????',
        filterReset: '????????????'
    },
    sf: {
        submit: '??????',
        reset: '????????????',
        search: '??????',
        edit: '??????',
        addText: '??????',
        removeText: '??????',
        checkAllText: '?????????',
        error: {
            'false schema': `????????????????????????????????????`,
            $ref: `??????????????????????????????: {ref}`,
            additionalItems: `{limit}???????????????????????????????????????????????????????????????`,
            additionalProperties: `?????????????????????????????????????????????????????????`,
            anyOf: `"anyOf"???????????????????????????????????????????????????`,
            dependencies: `??????????????? {property} ???????????????????????????????????????????????????????????????????????????: {deps}`,
            enum: `????????????????????????????????????????????????????????????????????????`,
            format: `?????????????????????????????????: "{format}"`,
            type: `??????????????????: {type}`,
            required: `??????????????????`,
            maxLength: `???????????????: {limit}`,
            minLength: `???????????????: {limit}`,
            minimum: `??????????????????: {comparison} {limit}`,
            formatMinimum: `??????????????????: {comparison} {limit}`,
            maximum: `??????????????????: {comparison} {limit}`,
            formatMaximum: `??????????????????: {comparison} {limit}`,
            maxItems: `?????????????????? {limit} ????????????????????????????????????`,
            minItems: `?????????????????? {limit} ????????????????????????????????????`,
            maxProperties: `??????{limit}?????????????????????????????????????????????`,
            minProperties: `??????{limit}?????????????????????????????????????????????`,
            multipleOf: `??????????????????????????????????????????????????????: {multipleOf}`,
            not: `??????????????????:`,
            oneOf: `??????????????????:`,
            pattern: `??????????????????????????????????????????????????????: "{pattern}"`,
            uniqueItems: `???????????????????????????: ?????????: {j} ???{i}`,
            custom: `??????????????????????????????????????????`,
            propertyNames: `??????????????????????????????????????????: "{propertyName}"`,
            patternRequired: `???????????????????????????????????????????????????????????????: "{missingPattern}"`,
            switch: `"switch" ????????????????????????????????????: {caseIndex}`,
            const: `?????????????????????????????????`,
            contains: `??????????????????????????????????????????????????????`,
            formatExclusiveMaximum: `formatExclusiveMaximum ??????????????????????????????????????????`,
            formatExclusiveMinimum: `formatExclusiveMaximum ??????????????????????????????????????????`,
            if: `????????????????????????????????????????????????: "{failingKeyword}" `
        }
    },
    onboarding: {
        skip: `????????????`,
        prev: `??????`,
        next: `???`,
        done: `?????????`
    }
};

var slSI = {
    abbr: 'sl-SI',
    exception: {
        403: `??al nimate dostopa do te strani`,
        404: `??al stran, ki ste jo obiskali, ne obstaja`,
        500: `??al stre??nik poro??a o napaki`,
        backToHome: 'Nazaj domov'
    },
    noticeIcon: {
        emptyText: 'Ni podatkov',
        clearText: 'Po??isti'
    },
    reuseTab: {
        close: 'Zapri zavihek',
        closeOther: 'Zaprite druge zavihke',
        closeRight: 'Zaprite zavihke na desni'
    },
    tagSelect: {
        expand: 'Raz??iri',
        collapse: 'Strni'
    },
    miniProgress: {
        target: 'Cilj: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} of {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Reset'
    },
    sf: {
        submit: 'Po??lji',
        reset: 'Reset',
        search: 'I????i',
        edit: 'Shrani',
        addText: 'Dodaj',
        removeText: 'Odstrani',
        checkAllText: 'Preveri vse',
        error: {
            'false schema': `Boolova shema je napa??na`,
            $ref: `Referenc ni mogo??e razre??iti {ref}`,
            additionalItems: `Ne sme imeti ve?? kot {limit} artiklov`,
            additionalProperties: `Ne bi smel imeti dodatnih lastnosti`,
            anyOf: `Se mora ujemati s shemo v "anyOf"`,
            dependencies: `mora imeti lastnosti {deps} ko je artikel {property} prisoten`,
            enum: `Mora biti enaka eni od vnaprej dolo??enih vrednosti`,
            format: `Naj ustreza formatu "{format}"`,
            type: `Naj bo {type}`,
            required: `Zahtevano`,
            maxLength: `Ne sme biti dalj??i od {limit} znakov`,
            minLength: `Ne sme biti kraj??i od {limit} znakov`,
            minimum: `Naj bo {comparison} {limit}`,
            formatMinimum: `Naj bo {comparison} {limit}`,
            maximum: `Naj bo {comparison} {limit}`,
            formatMaximum: `Naj bo {comparison} {limit}`,
            maxItems: `Ne sme imeti ve?? kot {limit} artiklov`,
            minItems: `Ne sme imeti manj kot {limit} artiklov`,
            maxProperties: `Ne sme imeti ve?? kot {limit} lastnosti`,
            minProperties: `Ne sme imeti manj kot {limit} lastnosti`,
            multipleOf: `Mora biti ve??kratnik od {multipleOf}`,
            not: `Ne sme biti veljaven po shemi v "not"`,
            oneOf: `Naj ustreza natan??no eni shemi v "oneOf"`,
            pattern: `Naj se ujema z vzorcem "{pattern}"`,
            uniqueItems: `Ne bi smel imeti dvojnikov (items ## {j} in {i} so identi??ni)`,
            custom: `Naj ustreza formatu`,
            propertyNames: `Ime artikla "{propertyName}" je neveljavno`,
            patternRequired: `Mora imeti vzorec ujemanja lastnosti "{missingPattern}"`,
            switch: `Mora prestati "switch" validacijo klju??ne besede, primer {caseIndex} ne uspe`,
            const: `Naj bo enako konstanti`,
            contains: `Naj vsebuje veljaven artikel`,
            formatExclusiveMaximum: `formatExclusiveMaximum naj bo boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum naj bo boolean`,
            if: `Naj se ujema s shemo "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `Presko??i`,
        prev: `Prej??nje`,
        next: `Naslednji`,
        done: `Kon??ano`
    }
};

var frFR = {
    abbr: 'fr-FR',
    exception: {
        403: `D??sol??, vous n'avez pas acc??s ?? cette page`,
        404: `D??sol??, la page que vous avez visit??e n'existe pas`,
        500: `D??sol??, le serveur signale une erreur`,
        backToHome: "Retour ?? l'accueil"
    },
    noticeIcon: {
        emptyText: 'Pas de donn??es',
        clearText: 'Effacer'
    },
    reuseTab: {
        close: "Fermer l'onglet",
        closeOther: 'Fermer les autres onglets',
        closeRight: 'Fermer les onglets ?? droite',
        refresh: 'Rafra??chir'
    },
    tagSelect: {
        expand: 'Etendre',
        collapse: 'Effondrer'
    },
    miniProgress: {
        target: 'Cible: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} de {{total}}',
        filterConfirm: 'OK',
        filterReset: 'R??initialiser'
    },
    sf: {
        submit: 'Soumettre',
        reset: 'R??initialiser',
        search: 'Rechercher',
        edit: 'Sauvegarder',
        addText: 'Ajouter',
        removeText: 'Supprimer',
        checkAllText: 'Cochez toutes',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Passer`,
        prev: `Pr??c??dent`,
        next: `Suivant`,
        done: `Termin??`
    }
};

var esES = {
    abbr: 'es-ES',
    exception: {
        403: `Lo sentimos, no tiene acceso a esta p??gina`,
        404: `Lo sentimos, la p??gina que ha visitado no existe`,
        500: `Lo siento, error interno del servidor `,
        backToHome: 'Volver a la p??gina de inicio'
    },
    noticeIcon: {
        emptyText: 'No hay datos',
        clearText: 'Limpiar'
    },
    reuseTab: {
        close: 'Cerrar pesta??a',
        closeOther: 'Cerrar otras pesta??as',
        closeRight: 'Cerrar pesta??as a la derecha',
        refresh: 'Actualizar'
    },
    tagSelect: {
        expand: 'Expandir',
        collapse: 'Ocultar'
    },
    miniProgress: {
        target: 'Target: '
    },
    st: {
        total: '{{rango[0]}} - {{rango[1]}} de {{total}}',
        filterConfirm: 'Aceptar',
        filterReset: 'Reiniciar'
    },
    sf: {
        submit: 'Submit',
        reset: 'Reiniciar',
        search: 'Buscar',
        edit: 'Guardar',
        addText: 'A??adir',
        removeText: 'Eliminar',
        checkAllText: 'Comprobar todo',
        error: {
            'false schema': `Boolean schema is false`,
            $ref: `Can't resolve reference {ref}`,
            additionalItems: `Should not have more than {limit} item`,
            additionalProperties: `Should not have additional properties`,
            anyOf: `Should match some schema in "anyOf"`,
            dependencies: `should have property {deps} when property {property} is present`,
            enum: `Should be equal to one of predefined values`,
            format: `Should match format "{format}"`,
            type: `Should be {type}`,
            required: `Required`,
            maxLength: `Should not be longer than {limit} character`,
            minLength: `Should not be shorter than {limit} character`,
            minimum: `Should be {comparison} {limit}`,
            formatMinimum: `Should be {comparison} {limit}`,
            maximum: `Should be {comparison} {limit}`,
            formatMaximum: `Should be {comparison} {limit}`,
            maxItems: `Should not have more than {limit} item`,
            minItems: `Should not have less than {limit} item`,
            maxProperties: `Should not have more than {limit} property`,
            minProperties: `Should not have less than {limit} property`,
            multipleOf: `Should be a multiple of {multipleOf}`,
            not: `Should not be valid according to schema in "not"`,
            oneOf: `Should match exactly one schema in "oneOf"`,
            pattern: `Should match pattern "{pattern}"`,
            uniqueItems: `Should not have duplicate items (items ## {j} and {i} are identical)`,
            custom: `Should match format`,
            propertyNames: `Property name "{propertyName}" is invalid`,
            patternRequired: `Should have property matching pattern "{missingPattern}"`,
            switch: `Should pass "switch" keyword validation, case {caseIndex} fails`,
            const: `Should be equal to constant`,
            contains: `Should contain a valid item`,
            formatExclusiveMaximum: `formatExclusiveMaximum should be boolean`,
            formatExclusiveMinimum: `formatExclusiveMinimum should be boolean`,
            if: `Should match "{failingKeyword}" schema`
        }
    },
    onboarding: {
        skip: `Omitir`,
        prev: `Previo`,
        next: `Siguiente`,
        done: `Terminado`
    }
};

var itIT = {
    abbr: 'it-IT',
    exception: {
        403: `Spiacenti, non hai accesso a questa pagina`,
        404: `Spiacenti, la pagina che hai visitato non esiste`,
        500: `Spiacenti, il server sta riscontrando un errore`,
        backToHome: 'Torna alla Home'
    },
    noticeIcon: {
        emptyText: 'Nessun dato',
        clearText: 'Cancella memoria locale'
    },
    reuseTab: {
        close: 'Chiudi la scheda',
        closeOther: 'Chiudi le altre schede',
        closeRight: 'Chiudi le schede a destra',
        refresh: 'Aggiorna'
    },
    tagSelect: {
        expand: 'Espandi',
        collapse: 'Comprimi'
    },
    miniProgress: {
        target: 'Obiettivo: '
    },
    st: {
        total: '{{range[0]}} - {{range[1]}} di {{total}}',
        filterConfirm: 'OK',
        filterReset: 'Reimposta'
    },
    sf: {
        submit: 'Invia',
        reset: 'Reimposta',
        search: 'Cerca',
        edit: 'Salva',
        addText: 'Aggiungi',
        removeText: 'Rimuovi',
        checkAllText: 'Seleziona tutto',
        error: {
            'false schema': `Lo schema booleano ?? falso`,
            $ref: `Impossibile risolvere il riferimento {ref}`,
            additionalItems: `Non deve avere pi?? di {limit} elementi`,
            additionalProperties: `Non deve avere propriet?? aggiuntive`,
            anyOf: `Deve corrispondere a uno schema in "anyOf"`,
            dependencies: `Deve avere una propriet?? {deps} quando ?? presente la propriet?? {property}`,
            enum: `Deve essere uguale a uno dei valori predefiniti`,
            format: `Deve corrispondere al formato "{format}"`,
            type: `Deve essere {type}`,
            required: `Obbligatorio`,
            maxLength: `Non deve essere superiore a {limit} caratteri`,
            minLength: `Non deve essere superiore a {limit} caratteri`,
            minimum: `Deve essere {comparison} {limit}`,
            formatMinimum: `Deve essere {comparison} {limit}`,
            maximum: `Deve essere {comparison} {limit}`,
            formatMaximum: `Deve essere {comparison} {limit}`,
            maxItems: `Non deve avere pi?? di {limit} elementi`,
            minItems: `Non deve avere meno di {limit} elementi`,
            maxProperties: `Non deve avere pi?? di {limit} propriet??`,
            minProperties: `Non deve avere meno di {limit} propriet??`,
            multipleOf: `Deve essere un multiplo di {multipleOf}`,
            not: `Non deve essere valido secondo lo schema in "not"`,
            oneOf: `Deve corrispondere esattamente a uno schema in "oneOf"`,
            pattern: `Deve corrispondere al modello "{pattern}"`,
            uniqueItems: `Non deve avere elementi duplicati (gli elementi ## {j} e {i} sono identici)`,
            custom: `Deve corrispondere al formato "{format}"`,
            propertyNames: `Il nome della propriet?? "{propertyName}" non ?? valido`,
            patternRequired: `Deve avere una propriet?? corrispondete al modello "{missingPattern}"`,
            switch: `Deve superare la convalida della parola chiave "switch", il caso {caseIndex} non ?? riuscito`,
            const: `Deve essere uguale alla costante`,
            contains: `Deve contenere un elemento valido`,
            formatExclusiveMaximum: `formatExclusiveMaximum deve essere booleano`,
            formatExclusiveMinimum: `formatExclusiveMaximum deve essere booleano`,
            if: `Deve corrispondere allo schema "{failingKeyword}"`
        }
    },
    onboarding: {
        skip: `Salta`,
        prev: `Precedente`,
        next: `Successivo`,
        done: `Fatto`
    }
};

/**
 * ??????????????????
 */
class ModalHelper {
    constructor(srv) {
        this.srv = srv;
    }
    /**
     * ?????????????????????
     *
     * @param comp ??????
     * @param params ????????????
     * @param options ????????????
     *
     * @example
     * this.modalHelper.create(FormEditComponent, { i }).subscribe(res => this.load());
     * // ?????????????????????&?????????????????????
     * // ??????????????? `nzModalRef` ?????????????????????????????? `NzModalRef` ?????????
     * this.nzModalRef.close(data);
     * this.nzModalRef.close();
     * // ??????
     * this.nzModalRef.destroy();
     */
    create(comp, params, options) {
        options = deepMerge({
            size: 'lg',
            exact: true,
            includeTabs: false
        }, options);
        return new Observable((observer) => {
            const { size, includeTabs, modalOptions } = options;
            let cls = '';
            let width = '';
            if (size) {
                if (typeof size === 'number') {
                    width = `${size}px`;
                }
                else {
                    cls = `modal-${size}`;
                }
            }
            if (includeTabs) {
                cls += ' modal-include-tabs';
            }
            if (modalOptions && modalOptions.nzWrapClassName) {
                cls += ` ${modalOptions.nzWrapClassName}`;
                delete modalOptions.nzWrapClassName;
            }
            const defaultOptions = {
                nzWrapClassName: cls,
                nzContent: comp,
                nzWidth: width ? width : undefined,
                nzFooter: null,
                nzComponentParams: params
            };
            const subject = this.srv.create({ ...defaultOptions, ...modalOptions });
            const afterClose$ = subject.afterClose.subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                afterClose$.unsubscribe();
            });
        });
    }
    /**
     * ?????????????????????????????????????????????
     *
     * @param comp ??????
     * @param params ????????????
     * @param options ????????????
     *
     * @example
     * this.modalHelper.open(FormEditComponent, { i }).subscribe(res => this.load());
     * // ?????????????????????&?????????????????????
     * // ??????????????? `nzModalRef` ?????????????????????????????? `NzModalRef` ?????????
     * this.nzModalRef.close(data);
     * this.nzModalRef.close();
     * // ??????
     * this.nzModalRef.destroy();
     */
    createStatic(comp, params, options) {
        const modalOptions = {
            nzMaskClosable: false,
            ...(options && options.modalOptions)
        };
        return this.create(comp, params, { ...options, modalOptions });
    }
}
ModalHelper.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ModalHelper, deps: [{ token: i1$5.NzModalService }], target: i0.????FactoryTarget.Injectable });
ModalHelper.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ModalHelper, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ModalHelper, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$5.NzModalService }]; } });

/**
 * ???????????????
 *
 * **?????????** ?????????????????????????????????????????????????????? `observer.error`
 *
 * @example
 * this.drawerHelper.create('Edit', FormEditComponent, { i }).subscribe(res => this.load());
 * // ?????????????????????&?????????????????????
 * // ??????
 * this.NzDrawerRef.close(data);
 * this.NzDrawerRef.close(true);
 * // ??????
 * this.NzDrawerRef.close();
 * this.NzDrawerRef.close(false);
 */
class DrawerHelper {
    constructor(srv) {
        this.srv = srv;
    }
    /**
     * ??????????????????
     */
    create(title, comp, params, options) {
        options = deepMerge({
            size: 'md',
            footer: true,
            footerHeight: 50,
            exact: true,
            drawerOptions: {
                nzPlacement: 'right',
                nzWrapClassName: ''
            }
        }, options);
        return new Observable((observer) => {
            const { size, footer, footerHeight, drawerOptions } = options;
            const defaultOptions = {
                nzContent: comp,
                nzContentParams: params,
                nzTitle: title
            };
            if (typeof size === 'number') {
                defaultOptions[drawerOptions.nzPlacement === 'top' || drawerOptions.nzPlacement === 'bottom' ? 'nzHeight' : 'nzWidth'] = options.size;
            }
            else if (!drawerOptions.nzWidth) {
                defaultOptions.nzWrapClassName = `${drawerOptions.nzWrapClassName} drawer-${options.size}`.trim();
                delete drawerOptions.nzWrapClassName;
            }
            if (footer) {
                // The 24 value is @drawer-body-padding
                defaultOptions.nzBodyStyle = {
                    'padding-bottom.px': footerHeight + 24
                };
            }
            const subject = this.srv.create({ ...defaultOptions, ...drawerOptions });
            const afterClose$ = subject.afterClose.subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                afterClose$.unsubscribe();
            });
        });
    }
    /**
     * ????????????????????????????????????????????????
     */
    static(title, comp, params, options) {
        const drawerOptions = {
            nzMaskClosable: false,
            ...(options && options.drawerOptions)
        };
        return this.create(title, comp, params, { ...options, drawerOptions });
    }
}
DrawerHelper.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DrawerHelper, deps: [{ token: i1$6.NzDrawerService }], target: i0.????FactoryTarget.Injectable });
DrawerHelper.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DrawerHelper, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DrawerHelper, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$6.NzDrawerService }]; } });

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ??????HttpClient??????????????????
 * + ??????HttpClient?????????????????????
 * + ???????????? loading
 * + ??????????????????????????????
 */
class _HttpClient {
    constructor(http, cogSrv) {
        this.http = http;
        this.lc = 0;
        this.cog = cogSrv.merge('themeHttp', {
            nullValueHandling: 'include',
            dateValueHandling: 'timestamp'
        });
    }
    /**
     * Get whether it's loading
     *
     * ???????????????????????????
     */
    get loading() {
        return this.lc > 0;
    }
    /**
     * Get the currently loading count
     *
     * ??????????????????????????????
     */
    get loadingCount() {
        return this.lc;
    }
    parseParams(params) {
        const newParams = {};
        if (params instanceof HttpParams) {
            return params;
        }
        Object.keys(params).forEach(key => {
            let _data = params[key];
            // ????????????
            if (this.cog.nullValueHandling === 'ignore' && _data == null)
                return;
            // ?????????????????????????????? (???)
            if (this.cog.dateValueHandling === 'timestamp' && _data instanceof Date) {
                _data = _data.valueOf();
            }
            newParams[key] = _data;
        });
        return new HttpParams({ fromObject: newParams });
    }
    appliedUrl(url, params) {
        if (!params)
            return url;
        url += ~url.indexOf('?') ? '' : '?';
        const arr = [];
        Object.keys(params).forEach(key => {
            arr.push(`${key}=${params[key]}`);
        });
        return url + arr.join('&');
    }
    setCount(count) {
        Promise.resolve(null).then(() => (this.lc = count <= 0 ? 0 : count));
    }
    push() {
        this.setCount(++this.lc);
    }
    pop() {
        this.setCount(--this.lc);
    }
    /**
     * Clean loading count
     *
     * ???????????????
     */
    cleanLoading() {
        this.setCount(0);
    }
    get(url, params, options = {}) {
        return this.request('GET', url, {
            params,
            ...options
        });
    }
    post(url, body, params, options = {}) {
        return this.request('POST', url, {
            body,
            params,
            ...options
        });
    }
    delete(url, params, options = {}) {
        return this.request('DELETE', url, {
            params,
            ...options
        });
    }
    // #endregion
    // #region jsonp
    /**
     * **JSONP Request**
     *
     * @param callbackParam CALLBACK???????????????JSONP_CALLBACK
     */
    jsonp(url, params, callbackParam = 'JSONP_CALLBACK') {
        return of(null).pipe(
        // Make sure to always be asynchronous, see issues: https://github.com/hbyunzai/ng-yunzai/issues/1954
        delay(0), tap(() => this.push()), switchMap(() => this.http.jsonp(this.appliedUrl(url, params), callbackParam)), finalize(() => this.pop()));
    }
    patch(url, body, params, options = {}) {
        return this.request('PATCH', url, {
            body,
            params,
            ...options
        });
    }
    put(url, body, params, options = {}) {
        return this.request('PUT', url, {
            body,
            params,
            ...options
        });
    }
    form(url, body, params, options = {}) {
        return this.request('POST', url, {
            body,
            params,
            ...options,
            headers: {
                'content-type': `application/x-www-form-urlencoded`
            }
        });
    }
    request(method, url, options = {}) {
        if (options.params)
            options.params = this.parseParams(options.params);
        return of(null).pipe(
        // Make sure to always be asynchronous, see issues: https://github.com/hbyunzai/ng-yunzai/issues/1954
        delay(0), tap(() => this.push()), switchMap(() => this.http.request(method, url, options)), finalize(() => this.pop()));
    }
}
_HttpClient.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: _HttpClient, deps: [{ token: i1$7.HttpClient }, { token: i1.YunzaiConfigService }], target: i0.????FactoryTarget.Injectable });
_HttpClient.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: _HttpClient, providedIn: 'root' });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: _HttpClient, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$7.HttpClient }, { type: i1.YunzaiConfigService }]; } });

/**
 * Every http decorator must be based on `BaseAPI`, Like this:
 * ```ts
 * \@Injectable()
 * class DataService extends BaseApi {}
 * ```
 */
class BaseApi {
    constructor(injector) {
        this.injector = injector;
    }
}
BaseApi.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: BaseApi, deps: [{ token: Injector }], target: i0.????FactoryTarget.Injectable });
BaseApi.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: BaseApi });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: BaseApi, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector, decorators: [{
                    type: Inject,
                    args: [Injector]
                }] }]; } });
const paramKey = `__api_params`;
function setParam(target, key = paramKey) {
    let params = target[key];
    if (typeof params === 'undefined') {
        params = target[key] = {};
    }
    return params;
}
/**
 * ????????????URL
 * - ??????????????????
 */
function BaseUrl(url) {
    return function (target) {
        const params = setParam(target.prototype);
        params.baseUrl = url;
        return target;
    };
}
/**
 * ?????? `headers`
 * - ??????????????????
 */
function BaseHeaders(headers) {
    return function (target) {
        const params = setParam(target.prototype);
        params.baseHeaders = headers;
        return target;
    };
}
function makeParam(paramName) {
    return function (key) {
        return function (target, propertyKey, index) {
            const params = setParam(setParam(target), propertyKey);
            let tParams = params[paramName];
            if (typeof tParams === 'undefined') {
                tParams = params[paramName] = [];
            }
            tParams.push({
                key,
                index
            });
        };
    };
}
/**
 * URL????????????
 * - ???????????????????????????
 */
const Path = makeParam('path');
/**
 * URL ?????? `QueryString`
 * - ???????????????????????????
 */
const Query = makeParam('query');
/**
 * ?????? `Body`
 * - ???????????????????????????
 */
const Body = makeParam('body')();
/**
 * ?????? `headers`
 * - ???????????????????????????
 * - ?????? `BaseHeaders`
 */
const Headers = makeParam('headers');
/**
 * Request Payload
 * - Supported body (like`POST`, `PUT`) as a body data, equivalent to `@Body`
 * - Not supported body (like `GET`, `DELETE` etc) as a `QueryString`
 */
const Payload = makeParam('payload')();
function getValidArgs(data, key, args) {
    if (!data[key] || !Array.isArray(data[key]) || data[key].length <= 0) {
        return undefined;
    }
    return args[data[key][0].index];
}
function genBody(data, payload) {
    if (Array.isArray(data) || Array.isArray(payload)) {
        return Object.assign([], data, payload);
    }
    return { ...data, ...payload };
}
function makeMethod(method) {
    return function (url = '', options) {
        return (_target, targetKey, descriptor) => {
            descriptor.value = function (...args) {
                options = options || {};
                const injector = this.injector;
                const http = injector.get(_HttpClient, null);
                if (http == null) {
                    throw new TypeError(`Not found '_HttpClient', You can import 'YunzaiThemeModule' && 'HttpClientModule' in your root module.`);
                }
                const baseData = setParam(this);
                const data = setParam(baseData, targetKey);
                let requestUrl = url || '';
                requestUrl = [baseData.baseUrl || '', requestUrl.startsWith('/') ? requestUrl.substring(1) : requestUrl].join('/');
                // fix last split
                if (requestUrl.length > 1 && requestUrl.endsWith('/')) {
                    requestUrl = requestUrl.substring(0, requestUrl.length - 1);
                }
                if (options.acl) {
                    const aclSrv = injector.get(ACLService, null);
                    if (aclSrv && !aclSrv.can(options.acl)) {
                        return throwError(() => ({
                            url: requestUrl,
                            status: 401,
                            statusText: `From Http Decorator`
                        }));
                    }
                    delete options.acl;
                }
                requestUrl = requestUrl.replace(/::/g, '^^');
                (data.path || [])
                    .filter(w => typeof args[w.index] !== 'undefined')
                    .forEach((i) => {
                    requestUrl = requestUrl.replace(new RegExp(`:${i.key}`, 'g'), encodeURIComponent(args[i.index]));
                });
                requestUrl = requestUrl.replace(/\^\^/g, `:`);
                const params = (data.query || []).reduce((p, i) => {
                    p[i.key] = args[i.index];
                    return p;
                }, {});
                const headers = (data.headers || []).reduce((p, i) => {
                    p[i.key] = args[i.index];
                    return p;
                }, {});
                if (method === 'FORM') {
                    headers['content-type'] = 'application/x-www-form-urlencoded';
                }
                const payload = getValidArgs(data, 'payload', args);
                const supportedBody = method === 'POST' || method === 'PUT';
                return http.request(method, requestUrl, {
                    body: supportedBody ? genBody(getValidArgs(data, 'body', args), payload) : null,
                    params: !supportedBody ? { ...params, ...payload } : params,
                    headers: { ...baseData.baseHeaders, ...headers },
                    ...options
                });
            };
            return descriptor;
        };
    };
}
/**
 * `OPTIONS` ??????
 * - ?????????????????????
 */
const OPTIONS = makeMethod('OPTIONS');
/**
 * `GET` ??????
 * - ?????????????????????
 */
const GET = makeMethod('GET');
/**
 * `POST` ??????
 * - ?????????????????????
 */
const POST = makeMethod('POST');
/**
 * `DELETE` ??????
 * - ?????????????????????
 */
const DELETE = makeMethod('DELETE');
/**
 * `PUT` ??????
 * - ?????????????????????
 */
const PUT = makeMethod('PUT');
/**
 * `HEAD` ??????
 * - ?????????????????????
 */
const HEAD = makeMethod('HEAD');
/**
 * `PATCH` ??????
 * - ?????????????????????
 */
const PATCH = makeMethod('PATCH');
/**
 * `JSONP` ??????
 * - ?????????????????????
 */
const JSONP = makeMethod('JSONP');
/**
 * `FORM` ??????
 * - ?????????????????????
 */
const FORM = makeMethod('FORM');

class DatePipe {
    constructor(nzI18n) {
        this.nzI18n = nzI18n;
    }
    transform(value, formatString = 'yyyy-MM-dd HH:mm') {
        value = toDate(value);
        if (isNaN(value))
            return '';
        const langOpt = { locale: this.nzI18n.getDateLocale() };
        return formatString === 'fn' ? formatDistanceToNow(value, langOpt) : format(value, formatString, langOpt);
    }
}
DatePipe.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DatePipe, deps: [{ token: i1$8.NzI18nService }], target: i0.????FactoryTarget.Pipe });
DatePipe.??pipe = i0.????ngDeclarePipe({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DatePipe, name: "_date" });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{ name: '_date' }]
        }], ctorParameters: function () { return [{ type: i1$8.NzI18nService }]; } });

/**
 * [Document](https://ng.yunzainfo.com/theme/keys)
 */
class KeysPipe {
    transform(value, keyIsNumber = false) {
        const ret = [];
        Object.keys(value).forEach(key => {
            ret.push({ key: keyIsNumber ? +key : key, value: value[key] });
        });
        return ret;
    }
}
KeysPipe.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: KeysPipe, deps: [], target: i0.????FactoryTarget.Pipe });
KeysPipe.??pipe = i0.????ngDeclarePipe({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: KeysPipe, name: "keys" });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: KeysPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'keys' }]
        }] });

const ICON_YES = `<svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>`;
const ICON_NO = `<svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>`;
const CLS_YES = `class="yn__yes"`;
const CLS_NO = `class="yn__no"`;
class YNPipe {
    constructor(dom) {
        this.dom = dom;
    }
    transform(value, yes, no, mode, isSafeHtml = true) {
        let html = '';
        yes = yes || '???';
        no = no || '???';
        switch (mode) {
            case 'full':
                html = value
                    ? `<i ${CLS_YES}>${ICON_YES}<span>${yes}</span></i>`
                    : `<i ${CLS_NO}>${ICON_NO}<span>${no}</span></i>`;
                break;
            case 'text':
                html = value ? `<i ${CLS_YES}>${yes}</i>` : `<i ${CLS_NO}>${no}</i>`;
                break;
            default:
                html = value ? `<i ${CLS_YES} title="${yes}">${ICON_YES}</i>` : `<i ${CLS_NO} title="${no}">${ICON_NO}</i>`;
                break;
        }
        return isSafeHtml ? this.dom.bypassSecurityTrustHtml(html) : html;
    }
}
YNPipe.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YNPipe, deps: [{ token: i1$4.DomSanitizer }], target: i0.????FactoryTarget.Pipe });
YNPipe.??pipe = i0.????ngDeclarePipe({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YNPipe, name: "yn" });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YNPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'yn' }]
        }], ctorParameters: function () { return [{ type: i1$4.DomSanitizer }]; } });

class HTMLPipe {
    constructor(dom) {
        this.dom = dom;
    }
    transform(html) {
        return html ? this.dom.bypassSecurityTrustHtml(html) : '';
    }
}
HTMLPipe.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: HTMLPipe, deps: [{ token: i1$4.DomSanitizer }], target: i0.????FactoryTarget.Pipe });
HTMLPipe.??pipe = i0.????ngDeclarePipe({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: HTMLPipe, name: "html" });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: HTMLPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'html' }]
        }], ctorParameters: function () { return [{ type: i1$4.DomSanitizer }]; } });

class URLPipe {
    constructor(dom) {
        this.dom = dom;
    }
    transform(url) {
        return url ? this.dom.bypassSecurityTrustUrl(url) : '';
    }
}
URLPipe.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: URLPipe, deps: [{ token: i1$4.DomSanitizer }], target: i0.????FactoryTarget.Pipe });
URLPipe.??pipe = i0.????ngDeclarePipe({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: URLPipe, name: "url" });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: URLPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'url' }]
        }], ctorParameters: function () { return [{ type: i1$4.DomSanitizer }]; } });

/* eslint-disable import/order */
// #region import
const HELPERS = [ModalHelper, DrawerHelper];
const PIPES = [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe];
const ICONS = [BellOutline, DeleteOutline, PlusOutline, InboxOutline];
// #endregion
class YunzaiThemeModule {
    constructor(iconSrv) {
        iconSrv.addIcon(...ICONS);
    }
    static forRoot() {
        return {
            ngModule: YunzaiThemeModule,
            providers: HELPERS
        };
    }
    static forChild() {
        return {
            ngModule: YunzaiThemeModule,
            providers: HELPERS
        };
    }
}
YunzaiThemeModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiThemeModule, deps: [{ token: i1$9.NzIconService }], target: i0.????FactoryTarget.NgModule });
YunzaiThemeModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiThemeModule, declarations: [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe], imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule], exports: [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe, YelonLocaleModule] });
YunzaiThemeModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiThemeModule, providers: [
        {
            provide: YUNZAI_SETTING_KEYS,
            useValue: {
                layout: 'layout',
                user: 'user',
                app: 'app'
            }
        }
    ], imports: [[CommonModule, RouterModule, OverlayModule, NzI18nModule], YelonLocaleModule] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YunzaiThemeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule],
                    declarations: PIPES,
                    providers: [
                        {
                            provide: YUNZAI_SETTING_KEYS,
                            useValue: {
                                layout: 'layout',
                                user: 'user',
                                app: 'app'
                            }
                        }
                    ],
                    exports: [...PIPES, YelonLocaleModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$9.NzIconService }]; } });

const VERSION = new Version('13.4.2');

/**
 * Optional pre-loading module, when it's necessary to load the resource at the first page load for some lazy routes, [example](https://github.com/hbyunzai/ng-yunzai/blob/master/src/app/routes/routes-routing.module.ts).
 *
 * ????????????????????????????????????????????????????????????????????????????????????????????????????????????[??????](https://github.com/hbyunzai/ng-yunzai/blob/master/src/app/routes/routes-routing.module.ts)???
 *
 * @example
 * {AT}NgModule({
 *  providers: [PreloadOptionalModules],
 *  imports: [
 *    RouterModule.forRoot([
 *      { path: '', loadChildren: null, data: { preload: true } }
 *    ], { preloadingStrategy: PreloadOptionalModules})]
 * })
 */
class PreloadOptionalModules {
    preload(route, fn) {
        return route.data?.preload === true ? fn().pipe(catchError(() => of(null))) : of(null);
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { BaseApi, BaseHeaders, BaseUrl, Body, DELETE, DatePipe, DrawerHelper, FORM, GET, HEAD, HTMLPipe, HTML_DIR, Headers, I18nPipe, JSONP, KeysPipe, LTR, MenuService, ModalHelper, OPTIONS, PATCH, POST, PUT, Path, Payload, PreloadOptionalModules, Query, REP_MAX, RTL, RTLService, RTL_DIRECTION, RTL_NZ_COMPONENTS, RTL_YELON_COMPONENTS, ResponsiveService, SettingsService, TitleService, URLPipe, VERSION, YELON_LOCALE, YELON_LOCALE_SERVICE_PROVIDER, YELON_LOCALE_SERVICE_PROVIDER_FACTORY, YNPipe, YUNZAI_I18N_TOKEN, YUNZAI_SETTING_KEYS, YelonLocaleModule, YelonLocaleService, YunzaiI18NGuard, YunzaiI18NServiceFake, YunzaiI18nBaseService, YunzaiThemeModule, _HttpClient, elGR as el_GR, enUS as en_US, esES as es_ES, frFR as fr_FR, hrHR as hr_HR, itIT as it_IT, jaJP as ja_JP, koKR as ko_KR, plPL as pl_PL, preloaderFinished, slSI as sl_SI, trTR as tr_TR, zhCN as zh_CN, zhTW as zh_TW };
//# sourceMappingURL=theme.mjs.map
