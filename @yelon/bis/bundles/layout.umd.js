/**
 * @license ng-yunzai(devcui@outlook.com) v12.0.11
 * (c) 2020 devcui https://github.com/hbyunzai/yelon/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@yelon/cache'), require('@yelon/theme'), require('@yelon/util'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/common/locales/en'), require('@angular/common/locales/zh'), require('@angular/common/locales/zh-Hant'), require('date-fns/locale'), require('ng-zorro-antd/i18n'), require('@yelon/util/config'), require('@yelon/util/decorator'), require('rxjs'), require('rxjs/operators'), require('date-fns'), require('ng-zorro-antd/message'), require('@yelon/util/other'), require('@angular/cdk/bidi'), require('@yelon/theme/theme-btn'), require('@yelon/auth'), require('ng-zorro-antd/modal'), require('screenfull'), require('@angular/common/http'), require('@angular/forms'), require('@angular/router'), require('@yelon/bis/shared'), require('@stomp/rx-stomp'), require('ng-zorro-antd/notification'), require('ng-zorro-antd/icon'), require('@yelon/acl')) :
    typeof define === 'function' && define.amd ? define('@yelon/bis/layout', ['exports', '@angular/core', '@yelon/cache', '@yelon/theme', '@yelon/util', '@angular/cdk/platform', '@angular/common', '@angular/common/locales/en', '@angular/common/locales/zh', '@angular/common/locales/zh-Hant', 'date-fns/locale', 'ng-zorro-antd/i18n', '@yelon/util/config', '@yelon/util/decorator', 'rxjs', 'rxjs/operators', 'date-fns', 'ng-zorro-antd/message', '@yelon/util/other', '@angular/cdk/bidi', '@yelon/theme/theme-btn', '@yelon/auth', 'ng-zorro-antd/modal', 'screenfull', '@angular/common/http', '@angular/forms', '@angular/router', '@yelon/bis/shared', '@stomp/rx-stomp', 'ng-zorro-antd/notification', 'ng-zorro-antd/icon', '@yelon/acl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.yelon = global.yelon || {}, global.yelon.bis = global.yelon.bis || {}, global.yelon.bis.layout = {}), global.ng.core, global.yelon.cache, global.yelon.theme, global.yelon.util, global.ng.cdk.platform, global.ng.common, global.ng.common.locales.en, global.ng.common.locales.zh, global.ng.common.locales.zhHant, global.locale, global["ng-zorro-antd/i18n"], global.yelon.util.config, global.decorator, global.rxjs, global.rxjs.operators, global.DateFns, global.message, global.yelon.util.other, global.ng.cdk.bidi, global.themeBtn, global.yelon.auth, global["ng-zorro-antd/modal"], global.screenfull, global.ng.common.http, global.ng.forms, global.ng.router, global.yelon.bis.shared, global.rxStomp, global.i3$1, global["ng-zorro-antd/icon"], global.yelon.acl));
})(this, (function (exports, i0, i2$1, i1, util, i3, common, ngEn, ngZh, ngZhTw, locale, i2, i4, decorator, rxjs, operators, dateFns, message, other, bidi, themeBtn, auth, modal, screenfull, http, forms, router, shared, rxStomp, i3$1, icon, acl) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var ngEn__default = /*#__PURE__*/_interopDefaultLegacy(ngEn);
    var ngZh__default = /*#__PURE__*/_interopDefaultLegacy(ngZh);
    var ngZhTw__default = /*#__PURE__*/_interopDefaultLegacy(ngZhTw);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var screenfull__namespace = /*#__PURE__*/_interopNamespace(screenfull);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var DEFAULT = 'zh-CN';
    var LANGS = {
        'zh-CN': {
            text: '简体中文',
            ng: ngZh__default["default"],
            zorro: i2.zh_CN,
            date: locale.zhCN,
            yelon: i1.zh_CN,
            abbr: '🇨🇳'
        },
        'zh-TW': {
            text: '繁体中文',
            ng: ngZhTw__default["default"],
            zorro: i2.zh_TW,
            date: locale.zhTW,
            yelon: i1.zh_TW,
            abbr: '🇭🇰'
        },
        'en-US': {
            text: 'English',
            ng: ngEn__default["default"],
            zorro: i2.en_US,
            date: locale.enUS,
            yelon: i1.en_US,
            abbr: '🇬🇧'
        }
    };
    var YzI18NService = /** @class */ (function (_super) {
        __extends(YzI18NService, _super);
        function YzI18NService(http, settings, nzI18nService, yelonLocaleService, platform, cogSrv) {
            var _this = _super.call(this, cogSrv) || this;
            _this.http = http;
            _this.settings = settings;
            _this.nzI18nService = nzI18nService;
            _this.yelonLocaleService = yelonLocaleService;
            _this.platform = platform;
            _this._defaultLang = DEFAULT;
            _this._langs = Object.keys(LANGS).map(function (code) {
                var item = LANGS[code];
                return { code: code, text: item.text, abbr: item.abbr };
            });
            var defaultLang = _this.getDefaultLang();
            if (_this._langs.findIndex(function (w) { return w.code === defaultLang; })) {
                _this._defaultLang = defaultLang;
            }
            return _this;
        }
        YzI18NService.prototype.getDefaultLang = function () {
            if (!this.platform.isBrowser) {
                return DEFAULT;
            }
            if (this.settings.layout.lang) {
                return this.settings.layout.lang;
            }
            var res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
            var arr = res.split('-');
            return arr.length <= 1 ? res : arr[0] + "-" + arr[1].toUpperCase();
        };
        YzI18NService.prototype.loadLangData = function (lang) {
            return this.http.get("assets/tmp/i18n/" + lang + ".json");
        };
        YzI18NService.prototype.use = function (lang, data) {
            if (this._currentLang === lang)
                return;
            this._data = data;
            var item = LANGS[lang];
            common.registerLocaleData(item.ng);
            this.nzI18nService.setLocale(item.zorro);
            this.nzI18nService.setDateLocale(item.date);
            this.yelonLocaleService.setLocale(item.yelon);
            this._currentLang = lang;
            this._change$.next(lang);
        };
        YzI18NService.prototype.getLangs = function () {
            return this._langs;
        };
        return YzI18NService;
    }(i1.YunzaiI18nBaseService));
    YzI18NService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function YzI18NService_Factory() { return new YzI18NService(i0__namespace.ɵɵinject(i1__namespace._HttpClient), i0__namespace.ɵɵinject(i1__namespace.SettingsService), i0__namespace.ɵɵinject(i2__namespace.NzI18nService), i0__namespace.ɵɵinject(i1__namespace.YelonLocaleService), i0__namespace.ɵɵinject(i3__namespace.Platform), i0__namespace.ɵɵinject(i4__namespace.YunzaiConfigService)); }, token: YzI18NService, providedIn: "root" });
    YzI18NService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    YzI18NService.ctorParameters = function () { return [
        { type: i1._HttpClient },
        { type: i1.SettingsService },
        { type: i2.NzI18nService },
        { type: i1.YelonLocaleService },
        { type: i3.Platform },
        { type: i4.YunzaiConfigService }
    ]; };

    exports.TOPIC = void 0;
    (function (TOPIC) {
        TOPIC[TOPIC["FULL"] = 0] = "FULL";
        TOPIC[TOPIC["OWN"] = 1] = "OWN";
        TOPIC[TOPIC["EVERY"] = 2] = "EVERY";
    })(exports.TOPIC || (exports.TOPIC = {}));
    var YzHeaderApplicationComponent = /** @class */ (function () {
        function YzHeaderApplicationComponent(inject, cacheService, i18n, http) {
            this.inject = inject;
            this.cacheService = cacheService;
            this.i18n = i18n;
            this.http = http;
            this.T = exports.TOPIC;
            this.active = false;
            this.topicData = [];
            this.listData = [];
            this.topic = exports.TOPIC.FULL;
            this.searchValue = null;
            this.subs = [];
        }
        YzHeaderApplicationComponent.prototype.ngOnInit = function () {
            this.topicData = this.cacheService.get('_yz_header', { mode: 'none' });
            this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
        };
        YzHeaderApplicationComponent.prototype.ngOnDestroy = function () {
            this.subs.forEach(function (f) { return f.unsubscribe(); });
        };
        YzHeaderApplicationComponent.prototype.diffChange = function (flag) {
            if (flag) {
                this.active = flag;
            }
            else {
                this.active = !this.active;
            }
        };
        YzHeaderApplicationComponent.prototype.initTopic = function (topic) {
            this.searchValue = null;
            this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
            this.topic = topic;
        };
        YzHeaderApplicationComponent.prototype.full = function () {
            this.initTopic(exports.TOPIC.FULL);
        };
        YzHeaderApplicationComponent.prototype.own = function () {
            this.initTopic(exports.TOPIC.OWN);
            var temp = this.cacheService.get('_yz_header', { mode: 'none' });
            this.listData = temp
                .filter(function (topic) {
                topic.children = topic.children.filter(function (child) {
                    return child.auth;
                });
                return topic;
            })
                .filter(function (topic) {
                return topic.children.length > 0;
            });
        };
        YzHeaderApplicationComponent.prototype.every = function (e) {
            this.initTopic(exports.TOPIC.EVERY);
            this.choosed = e;
            var temp = this.cacheService.get('_yz_header', { mode: 'none' });
            this.listData = __spreadArray([], __read(temp.filter(function (t) { return t.key === e.key; })[0].children));
        };
        YzHeaderApplicationComponent.prototype.onSearch = function () {
            var _this = this;
            var temp = this.cacheService.get('_yz_header', { mode: 'none' });
            // 如果搜索输入的有值
            if (this.searchValue) {
                // 过滤菜单过滤出搜索的值
                this.listData = temp
                    .filter(function (topic) {
                    if (_this.i18n.fanyi(topic.name).includes(_this.searchValue)) {
                        return topic;
                    }
                    else {
                        topic.children = topic.children.filter(function (child) {
                            return _this.i18n.fanyi(child.name).includes(_this.searchValue);
                        });
                        return topic;
                    }
                })
                    .filter(function (topic) {
                    return topic.children.length > 0;
                });
            }
            else {
                // 如果没有值,取消搜索
                this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
            }
        };
        YzHeaderApplicationComponent.prototype.open = function (topic) {
            if (topic.key) {
                this.subs.push(this.http
                    .post("/app-manager/web-scan/save", {
                    appId: topic.key,
                    createDate: new Date()
                })
                    .subscribe());
            }
            switch (topic.target) {
                case 'href':
                    this.inject.get(util.WINDOW).location.href = topic.url;
                    break;
                case 'blank':
                    this.inject.get(util.WINDOW).location.href = topic.url;
                    break;
                case 'target':
                    this.inject.get(util.WINDOW).location.href = topic.url;
                    break;
                default:
                    this.inject.get(util.WINDOW).location.href = topic.url;
                    break;
            }
        };
        return YzHeaderApplicationComponent;
    }());
    YzHeaderApplicationComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-application',
                    template: "\n    <!--      template start-->\n    <ng-template #search>\n      <div nz-row class=\"yz-application-list-search\">\n        <nz-input-group [nzPrefix]=\"prefixTemplate\">\n          <input\n            type=\"text\"\n            nz-input\n            placeholder=\"{{ 'application.search' | i18n }}\"\n            [(ngModel)]=\"searchValue\"\n            (ngModelChange)=\"onSearch()\"\n          />\n          <ng-template #prefixTemplate>\n            <i nz-icon nzType=\"search\" nzTheme=\"outline\"></i>\n          </ng-template>\n        </nz-input-group>\n      </div>\n    </ng-template>\n    <ng-template #ld>\n      <div class=\"yz-application-list\">\n        <ul>\n          <li *ngFor=\"let d of listData\">\n            <h5>{{ d.name }}</h5>\n            <a href=\"javascript:;\" *ngFor=\"let cd of d.children\" (click)=\"open(cd)\">{{ cd.name }}</a>\n          </li>\n        </ul>\n      </div>\n    </ng-template>\n    <!--      template end-->\n\n    <!--      button start-->\n    <div class=\"yunzai-default__nav-item\" (click)=\"diffChange()\"> {{ 'application.button' | i18n }}</div>\n    <!--      button end-->\n\n    <!--      header start-->\n    <div class=\"yz-application\" nz-row *ngIf=\"active\">\n      <div nz-col [nzSpan]=\"3\" class=\"yz-application-topic\">\n        <div class=\"yz-application-text\" (click)=\"full()\">{{ 'application.all' | i18n }}</div>\n        <div class=\"yz-application-text\" (click)=\"own()\">{{ 'application.mine' | i18n }}</div>\n        <div class=\"yz-application-text\" *ngFor=\"let d of topicData\" (click)=\"every(d)\">\n          {{ d.name }}\n        </div>\n      </div>\n      <div nz-col [nzSpan]=\"21\" [ngSwitch]=\"topic\" class=\"yz-application-container\">\n        <div *ngSwitchCase=\"T.FULL\">\n          <ng-template [ngTemplateOutlet]=\"search\"></ng-template>\n          <ng-template [ngTemplateOutlet]=\"ld\"></ng-template>\n        </div>\n        <div *ngSwitchCase=\"T.OWN\">\n          <ng-template [ngTemplateOutlet]=\"search\"></ng-template>\n          <ng-template [ngTemplateOutlet]=\"ld\"></ng-template>\n        </div>\n        <div *ngSwitchCase=\"T.EVERY\" class=\"yz-application-list\">\n          <div class=\"yz-application-list-item\">\n            <ul>\n              <li *ngFor=\"let d of listData\" (click)=\"open(d)\">\n                <a href=\"javascript:;\">\n                  <h4>{{ d.name }}</h4>\n                  <p>{{ d.intro }}</p>\n                </a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!--      header end-->\n  ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderApplicationComponent.ctorParameters = function () { return [
        { type: i0.Injector },
        { type: i2$1.CacheService },
        { type: YzI18NService },
        { type: i1._HttpClient }
    ]; };

    var YzHeaderI18NComponent = /** @class */ (function () {
        function YzHeaderI18NComponent(settings, i18n, doc) {
            this.settings = settings;
            this.i18n = i18n;
            this.doc = doc;
            /** Whether to display language text */
            this.showLangText = true;
        }
        Object.defineProperty(YzHeaderI18NComponent.prototype, "langs", {
            get: function () {
                return this.i18n.getLangs();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzHeaderI18NComponent.prototype, "curLangCode", {
            get: function () {
                return this.settings.layout.lang;
            },
            enumerable: false,
            configurable: true
        });
        YzHeaderI18NComponent.prototype.change = function (lang) {
            var _this = this;
            var spinEl = this.doc.createElement('div');
            spinEl.setAttribute('class', "page-loading ant-spin ant-spin-lg ant-spin-spinning");
            spinEl.innerHTML = "<span class=\"ant-spin-dot ant-spin-dot-spin\"><i></i><i></i><i></i><i></i></span>";
            this.doc.body.appendChild(spinEl);
            this.i18n.loadLangData(lang).subscribe(function (res) {
                _this.i18n.use(lang, res);
                _this.settings.setLayout('lang', lang);
                setTimeout(function () { return _this.doc.location.reload(); });
            });
        };
        return YzHeaderI18NComponent;
    }());
    YzHeaderI18NComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-i18n',
                    template: "\n    <div *ngIf=\"showLangText\" nz-dropdown [nzDropdownMenu]=\"langMenu\" nzPlacement=\"bottomRight\">\n      <i nz-icon nzType=\"global\"></i>\n      {{ 'menu.lang' | i18n }}\n      <i nz-icon nzType=\"down\"></i>\n    </div>\n    <i\n      *ngIf=\"!showLangText\"\n      nz-dropdown\n      [nzDropdownMenu]=\"langMenu\"\n      nzPlacement=\"bottomRight\"\n      nz-icon\n      nzType=\"global\"\n    ></i>\n    <nz-dropdown-menu #langMenu=\"nzDropdownMenu\">\n      <ul nz-menu>\n        <li\n          nz-menu-item\n          *ngFor=\"let item of langs\"\n          [nzSelected]=\"item.code === curLangCode\"\n          (click)=\"change(item.code)\"\n        >\n          <span role=\"img\" [attr.aria-label]=\"item.text\" class=\"pr-xs\">{{ item.abbr }}</span>\n          {{ item.text }}\n        </li>\n      </ul>\n    </nz-dropdown-menu>\n  ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderI18NComponent.ctorParameters = function () { return [
        { type: i1.SettingsService },
        { type: YzI18NService, decorators: [{ type: i0.Inject, args: [i1.YUNZAI_I18N_TOKEN,] }] },
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    YzHeaderI18NComponent.propDecorators = {
        showLangText: [{ type: i0.Input }]
    };
    __decorate([
        decorator.InputBoolean()
    ], YzHeaderI18NComponent.prototype, "showLangText", void 0);

    var YzHeaderNotifyComponent = /** @class */ (function () {
        function YzHeaderNotifyComponent(injector, msg, nzI18n, cdr, httpClient) {
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
        YzHeaderNotifyComponent.prototype.ngOnInit = function () {
            this.loadData();
        };
        YzHeaderNotifyComponent.prototype.loadData = function () {
            var _this = this;
            this.count = 0;
            this.loading = true;
            this.subs.push(rxjs.forkJoin(this.loadTodo(), this.loadMessage()).subscribe(function () {
                _this.loading = false;
                _this.cdr.detectChanges();
            }));
        };
        YzHeaderNotifyComponent.prototype.loadMessage = function () {
            var _this = this;
            other.log('notify.component: ', 'fetch message list');
            var formatMessageStatus = function (status) {
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
                .post("/message-center-3/my-msg-and-todo/msg-list", {
                pageNum: 1,
                pageSize: 10,
                status: '0'
            })
                .pipe(operators.map(function (response) {
                var viewMessage = _this.data.filter(function (d) { return d.key === 'msg'; })[0];
                viewMessage.list = response.data.list.map(function (m) {
                    return Object.assign(Object.assign({}, m), { avatar: (m === null || m === void 0 ? void 0 : m.imgUrl) || './assets/tmp/img/message.png', title: m.systemName, description: m.content, extra: formatMessageStatus(m.status).extra, color: formatMessageStatus(m.status).color, datetime: dateFns.formatDistanceToNow(new Date(m.date), { locale: _this.nzI18n.getDateLocale() }) });
                });
                _this.count += viewMessage.list.length;
            }));
        };
        YzHeaderNotifyComponent.prototype.loadTodo = function () {
            var _this = this;
            other.log('notify.component: ', 'fetch todo list');
            var formatTodoStatus = function (status) {
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
                .post("/message-center-3/my-msg-and-todo/todo-list", {
                pageNum: 1,
                pageSize: 10,
                status: '0'
            })
                .pipe(operators.map(function (response) {
                var viewTodo = _this.data.filter(function (d) { return d.key === 'todo'; })[0];
                viewTodo.list = response.data.list.map(function (t) {
                    return Object.assign(Object.assign({}, t), { avatar: (t === null || t === void 0 ? void 0 : t.imgUrl) || './assets/tmp/img/todo.png', title: t.systemName, description: t.content, datetime: dateFns.formatDistanceToNow(new Date(t.date), { locale: _this.nzI18n.getDateLocale() }), extra: formatTodoStatus(t.status).extra, color: formatTodoStatus(t.status).color });
                });
                _this.count += viewTodo.list.length;
            }));
        };
        YzHeaderNotifyComponent.prototype.clear = function (type) {
            var _this = this;
            var t = this.data.filter(function (d) { return d.title === type; })[0];
            if (t.key == 'msg' || t.key == 'notice') {
                this.subs.push(this.httpClient.post("/message-center-3/my-msg-and-todo/msg-clear", {}).subscribe(function (_) {
                    _this.msg.success("\u6E05\u7A7A\u4E86 " + type);
                    _this.loadData();
                }));
            }
            if (t.key == 'todo') {
                this.loadData();
            }
        };
        YzHeaderNotifyComponent.prototype.select = function (res) {
            this.injector.get(util.WINDOW).open(res.item.url);
            this.loadData();
        };
        YzHeaderNotifyComponent.prototype.ngOnDestroy = function () {
            this.subs.forEach(function (a) { return a.unsubscribe(); });
        };
        return YzHeaderNotifyComponent;
    }());
    YzHeaderNotifyComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-notify',
                    template: "\n    <notice-icon\n      [data]=\"data\"\n      [count]=\"count\"\n      [loading]=\"loading\"\n      btnClass=\"yunzai-default__nav-item\"\n      btnIconClass=\"yunzai-default__nav-item-icon\"\n      (select)=\"select($event)\"\n      (clear)=\"clear($event)\"\n    ></notice-icon>\n  ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderNotifyComponent.ctorParameters = function () { return [
        { type: i0.Injector },
        { type: message.NzMessageService },
        { type: i2.NzI18nService },
        { type: i0.ChangeDetectorRef },
        { type: i1._HttpClient }
    ]; };

    var YzHeaderThemBtnComponent = /** @class */ (function () {
        function YzHeaderThemBtnComponent(renderer, configSrv, platform, doc, directionality, KEYS) {
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
            this.devTips = "When the dark.css file can't be found, you need to run it once: npm run theme";
            this.deployUrl = '';
            this.destroy$ = new rxjs.Subject();
            this.dir = 'ltr';
        }
        YzHeaderThemBtnComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.dir = this.directionality.value;
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
            });
            this.initTheme();
        };
        YzHeaderThemBtnComponent.prototype.initTheme = function () {
            if (!this.platform.isBrowser) {
                return;
            }
            this.theme = localStorage.getItem(this.KEYS) || 'default';
            this.updateChartTheme();
            this.onThemeChange(this.theme);
        };
        YzHeaderThemBtnComponent.prototype.updateChartTheme = function () {
            this.configSrv.set('chart', { theme: this.theme === 'dark' ? 'dark' : '' });
        };
        YzHeaderThemBtnComponent.prototype.onThemeChange = function (theme) {
            if (!this.platform.isBrowser) {
                return;
            }
            this.theme = theme;
            this.renderer.setAttribute(this.doc.body, 'data-theme', theme);
            var dom = this.doc.getElementById(this.KEYS);
            if (dom) {
                dom.remove();
            }
            localStorage.removeItem(this.KEYS);
            if (theme !== 'default') {
                var el = this.doc.createElement('link');
                el.type = 'text/css';
                el.rel = 'stylesheet';
                el.id = this.KEYS;
                el.href = this.deployUrl + "assets/style." + theme + ".css";
                localStorage.setItem(this.KEYS, theme);
                this.doc.body.append(el);
            }
            this.updateChartTheme();
        };
        YzHeaderThemBtnComponent.prototype.ngOnDestroy = function () {
            var el = this.doc.getElementById(this.KEYS);
            if (el != null) {
                this.doc.body.removeChild(el);
            }
            this.destroy$.next();
            this.destroy$.complete();
        };
        return YzHeaderThemBtnComponent;
    }());
    YzHeaderThemBtnComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-theme-btn',
                    template: "\n    <div\n      class=\"yunzai-default__nav-item\"\n      nz-dropdown\n      [nzDropdownMenu]=\"iconMenu\"\n      nzTrigger=\"click\"\n      nzPlacement=\"bottomRight\"\n    >\n      <svg nz-tooltip class=\"anticon\" role=\"img\" width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"currentColor\">\n        <g fill-rule=\"evenodd\">\n          <g fill-rule=\"nonzero\">\n            <path\n              d=\"M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z\"\n            ></path>\n          </g>\n        </g>\n      </svg>\n    </div>\n    <nz-dropdown-menu #iconMenu=\"nzDropdownMenu\">\n      <ul nz-menu>\n        <li\n          nz-menu-item\n          *ngFor=\"let theme of types\"\n          (click)=\"onThemeChange(theme.key)\"\n          [style]=\"{ color: theme.color }\"\n        >\n          <i nz-icon nzType=\"bg-colors\"></i>\n          {{ theme.text | i18n }}\n        </li>\n      </ul>\n      <!--      <div nz-menu class=\"wd-xl animated jello\">-->\n      <!--        <div nz-row [nzJustify]=\"'space-between'\" [nzAlign]=\"'middle'\" class=\"app-icons\">-->\n      <!--          <div nz-col [nzSpan]=\"4\" *ngFor=\"let theme of types\" (click)=\"onThemeChange(theme.key)\">-->\n      <!--            <i nz-icon nzType=\"bg-colors\" class=\"text-white\" [style]=\"{ backgroundColor: theme.color }\"></i>-->\n      <!--            <span [ngStyle]=\"{ color: theme.color }\">{{ theme.text | i18n }}</span>-->\n      <!--          </div>-->\n      <!--        </div>-->\n      <!--      </div>-->\n    </nz-dropdown-menu>\n  ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderThemBtnComponent.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i4.YunzaiConfigService },
        { type: i3.Platform },
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] },
        { type: String, decorators: [{ type: i0.Inject, args: [themeBtn.YUNZAI_THEME_BTN_KEYS,] }] }
    ]; };
    YzHeaderThemBtnComponent.propDecorators = {
        types: [{ type: i0.Input }],
        devTips: [{ type: i0.Input }],
        deployUrl: [{ type: i0.Input }]
    };

    var BUSINESS_DEFAULT_CONFIG = {
        baseUrl: '/backstage',
        systemCode: 'portal',
        loginForm: null,
        refreshTokenEnabled: true,
        refreshTokenType: 're-request'
    };
    function mergeBisConfig(srv) {
        return srv.merge('bis', BUSINESS_DEFAULT_CONFIG);
    }

    var YzHeaderUserComponent = /** @class */ (function () {
        function YzHeaderUserComponent(injector, msg, tokenService, 
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
        YzHeaderUserComponent.prototype.ngOnInit = function () {
            var projectInfo = this.cacheService.get('_yz_project_info', { mode: 'none' });
            var user = this.cacheService.get('_yz_user', { mode: 'none' });
            this.username = user.realname ? user.realname : '未命名';
            this.icon = user.avatarId
                ? this.config.baseUrl + "/filecenter/file/" + user.avatarId
                : "./assets/tmp/img/avatar.jpg";
            this.menus = projectInfo.profileList;
        };
        YzHeaderUserComponent.prototype.logout = function () {
            localStorage.clear();
            this.tokenService.clear();
            this.injector.get(util.WINDOW).location.href = this.config.baseUrl + "/cas-proxy/app/logout";
        };
        YzHeaderUserComponent.prototype.to = function (href) {
            if (href) {
                this.injector.get(util.WINDOW).open(href);
            }
            else {
                this.msg.error('该菜单没有配置链接!');
            }
        };
        return YzHeaderUserComponent;
    }());
    YzHeaderUserComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-user',
                    template: "\n    <div\n      class=\"yunzai-default__nav-item d-flex align-items-center px-sm\"\n      nz-dropdown\n      nzPlacement=\"bottomRight\"\n      [nzDropdownMenu]=\"userMenu\"\n    >\n      <nz-avatar [nzSrc]=\"icon\" nzSize=\"small\" class=\"mr-sm\"></nz-avatar>\n      {{ username }}\n    </div>\n    <nz-dropdown-menu #userMenu=\"nzDropdownMenu\">\n      <div nz-menu class=\"width-sm\">\n        <div nz-menu-item *ngFor=\"let m of menus\" (click)=\"to(m.url)\">\n          <i nz-icon [nzType]=\"m.icon\" class=\"mr-sm\"></i>\n          {{ m.name | i18n }}\n        </div>\n        <li nz-menu-divider></li>\n        <div nz-menu-item (click)=\"logout()\">\n          <i nz-icon nzType=\"logout\" class=\"mr-sm\"></i>\n          {{ 'menu.account.logout' | i18n }}\n        </div>\n      </div>\n    </nz-dropdown-menu>\n  ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderUserComponent.ctorParameters = function () { return [
        { type: i0.Injector },
        { type: message.NzMessageService },
        { type: undefined, decorators: [{ type: i0.Inject, args: [auth.YA_SERVICE_TOKEN,] }] },
        { type: util.YunzaiConfigService },
        { type: i2$1.CacheService }
    ]; };

    var YzHeaderClearStorageComponent = /** @class */ (function () {
        function YzHeaderClearStorageComponent(modalSrv, messageSrv) {
            this.modalSrv = modalSrv;
            this.messageSrv = messageSrv;
        }
        YzHeaderClearStorageComponent.prototype._click = function () {
            var _this = this;
            this.modalSrv.confirm({
                nzTitle: 'Make sure clear all local storage?',
                nzOnOk: function () {
                    localStorage.clear();
                    _this.messageSrv.success('Clear Finished!');
                }
            });
        };
        return YzHeaderClearStorageComponent;
    }());
    YzHeaderClearStorageComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-clear-storage',
                    template: "\n    <i nz-icon nzType=\"tool\"></i>\n    {{ 'menu.clear.local.storage' | i18n }}\n  ",
                    host: {
                        '[class.d-block]': 'true'
                    },
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderClearStorageComponent.ctorParameters = function () { return [
        { type: modal.NzModalService },
        { type: message.NzMessageService }
    ]; };
    YzHeaderClearStorageComponent.propDecorators = {
        _click: [{ type: i0.HostListener, args: ['click',] }]
    };

    var YzHeaderFullScreenComponent = /** @class */ (function () {
        function YzHeaderFullScreenComponent() {
            this.status = false;
        }
        Object.defineProperty(YzHeaderFullScreenComponent.prototype, "sf", {
            get: function () {
                return screenfull__namespace;
            },
            enumerable: false,
            configurable: true
        });
        YzHeaderFullScreenComponent.prototype._resize = function () {
            this.status = this.sf.isFullscreen;
        };
        YzHeaderFullScreenComponent.prototype._click = function () {
            if (this.sf.isEnabled) {
                this.sf.toggle();
            }
        };
        return YzHeaderFullScreenComponent;
    }());
    YzHeaderFullScreenComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-header-fullscreen',
                    template: "\n    <i nz-icon [nzType]=\"status ? 'fullscreen-exit' : 'fullscreen'\"></i>\n    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}\n  ",
                    host: {
                        '[class.d-block]': 'true'
                    },
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzHeaderFullScreenComponent.propDecorators = {
        _resize: [{ type: i0.HostListener, args: ['window:resize',] }],
        _click: [{ type: i0.HostListener, args: ['click',] }]
    };

    var ɵ0 = function (msg) {
        util.log(msg);
    };
    var STOMP_DEFAULT_CONFIG = {
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

    var YzStompService = /** @class */ (function () {
        function YzStompService(csr, cache, injector, notification) {
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
                this.rxStomp = new rxStomp.RxStomp();
                if (i0.isDevMode()) {
                    util.log('yz.stomp.service: is dev mode');
                    util.log('yz.stomp.service: ', "config is " + this.config);
                    this.rxStomp.configure(this.config);
                    return;
                }
                var location = this.injector.get(common.DOCUMENT).location;
                var protocol = location.protocol, host = location.host;
                util.log('yz.stomp.service: ', "protocol is " + protocol + ",host is " + host);
                if (protocol.includes('http') && !protocol.includes('https')) {
                    this.config.brokerURL = "ws://" + host + this.config.brokerURL;
                }
                if (protocol.includes('https')) {
                    this.config.brokerURL = "wss://" + host + this.config.brokerURL;
                }
                util.log('yz.stomp.service: ', "config is " + this.config);
                this.rxStomp.configure(this.config);
            }
        }
        YzStompService.prototype.listen = function () {
            var _this = this;
            this.subs.push(this.rxStomp.watch("/topic/layout_" + this.user.username).subscribe(function (message) {
                _this.createNotification(JSON.parse(message.body));
            }));
            this.subs.push(this.rxStomp.watch("/topic/layout_xx_" + this.user.username).subscribe(function (message) {
                _this.logoutNotification(JSON.parse(message.body));
            }));
            this.rxStomp.activate();
        };
        YzStompService.prototype.createNotification = function (message) {
            this.notification.create(message.type, message.title, "<a href=" + message.href + ">" + message.content + "</a>");
        };
        YzStompService.prototype.logoutNotification = function (message) {
            var _this = this;
            this.notification.create(message.type, message.title, message.content + ",\u5269\u4F59\u65F6\u95F45\u79D2");
            setTimeout(function () {
                _this.cache.clear();
                localStorage.clear();
                _this.injector.get(util.WINDOW).location.href = _this.bisConfig.baseUrl + "/cas-proxy/app/logout";
            }, 5000);
        };
        YzStompService.prototype.unListen = function () {
            this.subs.forEach(function (s) { return s.unsubscribe(); });
            this.rxStomp.deactivate().then();
        };
        YzStompService.prototype.publish = function (parameters) {
            this.rxStomp.publish(parameters);
        };
        YzStompService.prototype.watch = function (destination, headers) {
            return this.rxStomp.watch(destination, headers);
        };
        return YzStompService;
    }());
    YzStompService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function YzStompService_Factory() { return new YzStompService(i0__namespace.ɵɵinject(i4__namespace.YunzaiConfigService), i0__namespace.ɵɵinject(i2__namespace$1.CacheService), i0__namespace.ɵɵinject(i0__namespace.INJECTOR), i0__namespace.ɵɵinject(i3__namespace$1.NzNotificationService)); }, token: YzStompService, providedIn: "root" });
    YzStompService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    YzStompService.ctorParameters = function () { return [
        { type: util.YunzaiConfigService },
        { type: i2$1.CacheService },
        { type: i0.Injector },
        { type: i3$1.NzNotificationService }
    ]; };

    var YzLayoutBasicComponent = /** @class */ (function () {
        function YzLayoutBasicComponent(cacheService, yzStompService) {
            this.cacheService = cacheService;
            this.yzStompService = yzStompService;
            this.options = {
                logoExpanded: "./assets/logo-full.svg",
                logoCollapsed: "./assets/logo.svg"
            };
            this.intro = '';
            this.text = '';
            this.icon = '';
        }
        YzLayoutBasicComponent.prototype.ngOnInit = function () {
            var current = this.cacheService.get('_yz_current', { mode: 'none' });
            var project = this.cacheService.get('_yz_project_info', { mode: 'none' });
            this.text = current.text ? current.text : '应用名称';
            this.intro = current.intro ? current.intro : '应用描述';
            this.icon = current.icon ? current.icon : "./assets/tmp/img/avatar.jpg";
            this.options.logoExpanded = project.maxLogoUrl ? project.maxLogoUrl : "./assets/logo-full.svg";
            this.options.logoCollapsed = project.miniLogoUrl ? project.miniLogoUrl : "./assets/logo.svg";
            this.yzStompService.listen();
        };
        YzLayoutBasicComponent.prototype.ngOnDestroy = function () {
            this.yzStompService.unListen();
        };
        return YzLayoutBasicComponent;
    }());
    YzLayoutBasicComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'yz-layout-basic',
                    template: "\n    <layout-default [options]=\"options\" [asideUser]=\"asideUserTpl\" [content]=\"contentTpl\">\n      <layout-default-header-item direction=\"left\">\n        <yz-header-application></yz-header-application>\n      </layout-default-header-item>\n\n      <layout-default-header-item direction=\"right\" hidden=\"mobile\">\n        <yz-header-notify></yz-header-notify>\n      </layout-default-header-item>\n\n      <layout-default-header-item direction=\"right\" hidden=\"mobile\">\n        <yz-header-theme-btn></yz-header-theme-btn>\n      </layout-default-header-item>\n\n      <layout-default-header-item direction=\"right\" hidden=\"mobile\">\n        <div\n          layout-default-header-item-trigger\n          nz-dropdown\n          [nzDropdownMenu]=\"settingsMenu\"\n          nzTrigger=\"click\"\n          nzPlacement=\"bottomRight\"\n        >\n          <i nz-icon nzType=\"setting\"></i>\n        </div>\n        <nz-dropdown-menu #settingsMenu=\"nzDropdownMenu\">\n          <div nz-menu style=\"width: 200px;\">\n            <div nz-menu-item>\n              <yz-header-fullscreen></yz-header-fullscreen>\n            </div>\n            <div nz-menu-item>\n              <yz-header-clear-storage></yz-header-clear-storage>\n            </div>\n            <div nz-menu-item>\n              <yz-header-i18n></yz-header-i18n>\n            </div>\n          </div>\n        </nz-dropdown-menu>\n      </layout-default-header-item>\n      <layout-default-header-item direction=\"right\">\n        <yz-header-user></yz-header-user>\n      </layout-default-header-item>\n      <ng-template #asideUserTpl>\n        <div nz-dropdown nzTrigger=\"click\" [nzDropdownMenu]=\"userMenu\" class=\"yunzai-default__aside-user\">\n          <nz-avatar class=\"yunzai-default__aside-user-avatar\" [nzSrc]=\"icon\"></nz-avatar>\n          <div class=\"yunzai-default__aside-user-info\">\n            <strong>{{ text }}</strong>\n            <p class=\"mb0\">{{ intro }}</p>\n          </div>\n        </div>\n        <nz-dropdown-menu #userMenu=\"nzDropdownMenu\">\n          <ul nz-menu>\n            <li nz-menu-item routerLink=\"/\">{{ 'menu.backtohome' | i18n }}</li>\n          </ul>\n        </nz-dropdown-menu>\n      </ng-template>\n      <ng-template #contentTpl>\n        <reuse-tab #reuseTab></reuse-tab>\n        <router-outlet (activate)=\"reuseTab.activate($event)\"></router-outlet>\n      </ng-template>\n    </layout-default>\n  ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YzLayoutBasicComponent.ctorParameters = function () { return [
        { type: i2$1.CacheService },
        { type: YzStompService }
    ]; };

    var COMPONENTS = [
        YzLayoutBasicComponent,
        YzHeaderApplicationComponent,
        YzHeaderNotifyComponent,
        YzHeaderThemBtnComponent,
        YzHeaderUserComponent,
        YzHeaderFullScreenComponent,
        YzHeaderClearStorageComponent,
        YzHeaderI18NComponent
    ];
    var YunzaiLayoutModule = /** @class */ (function () {
        function YunzaiLayoutModule() {
        }
        return YunzaiLayoutModule;
    }());
    YunzaiLayoutModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [http.HttpClientModule, common.CommonModule, forms.FormsModule, router.RouterModule, forms.ReactiveFormsModule, shared.YzSharedModule],
                    providers: [
                        {
                            provide: themeBtn.YUNZAI_THEME_BTN_KEYS,
                            useValue: 'site-theme'
                        }
                    ],
                    declarations: __spreadArray([], __read(COMPONENTS)),
                    exports: __spreadArray([], __read(COMPONENTS))
                },] }
    ];

    var YzAuthService = /** @class */ (function () {
        function YzAuthService(injector) {
            this.injector = injector;
            this.option = auth.mergeConfig(this.csr);
            this.bis = mergeBisConfig(this.csr);
        }
        Object.defineProperty(YzAuthService.prototype, "csr", {
            get: function () {
                return this.injector.get(i4.YunzaiConfigService);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzAuthService.prototype, "tokenService", {
            get: function () {
                return this.injector.get(auth.YA_SERVICE_TOKEN);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzAuthService.prototype, "httpClient", {
            get: function () {
                return this.injector.get(i1._HttpClient);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzAuthService.prototype, "cacheService", {
            get: function () {
                return this.injector.get(i2$1.CacheService);
            },
            enumerable: false,
            configurable: true
        });
        YzAuthService.prototype.askToken = function () {
            var _a;
            other.log('yz.auth.service: ', 'askToken');
            if ((_a = this.tokenService.get()) === null || _a === void 0 ? void 0 : _a.token) {
                return rxjs.of(this.tokenService.get());
            }
            else {
                if (this.bis.loginForm) {
                    return this.fetchTokenByUP();
                }
                else {
                    return this.fetchTokenByCas();
                }
            }
        };
        YzAuthService.prototype.fetchTokenByUP = function () {
            other.log('yz.auth.service: ', 'fetchTokenByUP');
            return this.httpClient.post("/auth/oauth/token?_allow_anonymous=true", this.bis.loginForm).pipe(operators.map(function (response) {
                var access_token = response.access_token, expires_in = response.expires_in, refresh_token = response.refresh_token, scope = response.scope, token_type = response.token_type;
                return {
                    token: access_token,
                    expired: expires_in,
                    refreshToken: refresh_token,
                    tokenType: token_type,
                    scope: scope
                };
            }));
        };
        YzAuthService.prototype.fetchTokenByCas = function () {
            var _this = this;
            other.log('yz.auth.service: ', 'fetchTokenByCas');
            var uri = encodeURIComponent(this.injector.get(util.WINDOW).location.href);
            return this.httpClient
                .get("/cas-proxy/app/validate_full?callback=" + uri + "&_allow_anonymous=true&timestamp=" + new Date().getTime())
                .pipe(operators.map(function (response) {
                switch (response.errcode) {
                    case 2000:
                        var _b = response.data, access_token = _b.access_token, expires_in = _b.expires_in, refresh_token = _b.refresh_token, scope = _b.scope, token_type = _b.token_type;
                        return {
                            token: access_token,
                            expired: expires_in,
                            refreshToken: refresh_token,
                            tokenType: token_type,
                            scope: scope
                        };
                    case 2001:
                        _this.injector.get(util.WINDOW).location.href = response.msg;
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
        };
        YzAuthService.prototype.login = function () {
            var _this = this;
            other.log('yz.auth.service: ', 'login white login form->', this.bis.loginForm);
            return this.askToken().pipe(operators.mergeMap(function (token) {
                other.log('yz.auth.service: get token->', token);
                _this.csr.set('auth', {
                    token_send_key: 'Authorization',
                    token_send_template: token.tokenType + " ${token}",
                    token_send_place: 'header'
                });
                other.log('yz.auth.service: ', 'set token');
                _this.tokenService.set(token);
                return _this.cacheInit();
            }), operators.mergeAll());
        };
        YzAuthService.prototype.cacheInit = function () {
            var _this = this;
            other.log('yz.auth.service: ', 'cacheInit');
            var user = this.cacheService.get('_yz_user', { mode: 'none' });
            var header = this.cacheService.get('_yz_header', { mode: 'none' });
            var project = this.cacheService.get('_yz_project_info', { mode: 'none' });
            return rxjs.forkJoin(rxjs.of(user), rxjs.of(header), rxjs.of(project)).pipe(operators.mergeMap(function (_b) {
                var _c = __read(_b, 3), u = _c[0], h = _c[1], p = _c[2];
                var list = [];
                // user cache
                if (!u) {
                    other.log('yz.auth.service: ', 'fetch user cache');
                    list.push(_this.httpClient.get("/auth/user").pipe(operators.map(function (user) {
                        _this.cacheService.set('_yz_user', user.principal);
                    })));
                }
                else {
                    other.log('yz.auth.service: ', 'user recache');
                    list.push(rxjs.of(function () { }));
                }
                // header cache
                if (!h) {
                    other.log('yz.auth.service: ', 'fetch header cache');
                    list.push(_this.httpClient.get("/auth/allheader/v2").pipe(operators.map(function (header) {
                        _this.cacheService.set('_yz_header', header.data);
                    })));
                }
                else {
                    other.log('yz.auth.service: ', 'header recache');
                    list.push(rxjs.of(function () { }));
                }
                // project cache
                if (!p) {
                    other.log('yz.auth.service: ', 'fetch project cache');
                    list.push(_this.httpClient.get("/app-manager/project/info").pipe(operators.map(function (info) {
                        _this.cacheService.set('_yz_project_info', info.data);
                    })));
                }
                else {
                    other.log('yz.auth.service: ', 'project recache');
                    list.push(rxjs.of(function () { }));
                }
                return rxjs.forkJoin(list);
            }));
        };
        return YzAuthService;
    }());
    YzAuthService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function YzAuthService_Factory() { return new YzAuthService(i0__namespace.ɵɵinject(i0__namespace.INJECTOR)); }, token: YzAuthService, providedIn: "root" });
    YzAuthService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    YzAuthService.ctorParameters = function () { return [
        { type: i0.Injector }
    ]; };

    var CODEMESSAGE = {
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
    var YzDefaultInterceptor = /** @class */ (function () {
        function YzDefaultInterceptor(injector) {
            this.injector = injector;
            this.refreshToking = false;
            this.refreshToken$ = new rxjs.BehaviorSubject(null);
            if (this.config.refreshTokenType === 'auth-refresh') {
                console.error("can't use auth-refresh, please change yz.default.interceptor to default.interceptor!");
            }
        }
        Object.defineProperty(YzDefaultInterceptor.prototype, "notification", {
            get: function () {
                return this.injector.get(i3$1.NzNotificationService);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzDefaultInterceptor.prototype, "tokenSrv", {
            get: function () {
                return this.injector.get(auth.YA_SERVICE_TOKEN);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzDefaultInterceptor.prototype, "http", {
            get: function () {
                return this.injector.get(i1._HttpClient);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(YzDefaultInterceptor.prototype, "config", {
            get: function () {
                return mergeBisConfig(this.injector.get(i4.YunzaiConfigService));
            },
            enumerable: false,
            configurable: true
        });
        YzDefaultInterceptor.prototype.goTo = function (url) {
            var _this = this;
            setTimeout(function () { return _this.injector.get(router.Router).navigateByUrl(url); });
        };
        YzDefaultInterceptor.prototype.checkStatus = function (ev) {
            if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
                return;
            }
            if (ev instanceof http.HttpResponse && ev.body.errorMessage) {
                this.notification.error("\u53D1\u751F\u4E86\u4E00\u4E9B\u9519\u8BEF ", ev.body.errorMessage);
                return;
            }
            var errortext = CODEMESSAGE[ev.status] || ev.statusText;
            this.notification.error("\u8BF7\u6C42\u9519\u8BEF " + ev.status + ": " + ev.url, errortext);
        };
        YzDefaultInterceptor.prototype.ToLogin = function () {
            var _this = this;
            this.notification.error("\u672A\u767B\u5F55\u6216\u767B\u5F55\u72B6\u6001\u5DF2\u8FC7\u671F\uFF0C5\u79D2\u540E\u5C06\u8DF3\u8F6C\u5230\u767B\u5F55\u9875\u9762\u3002", "");
            setTimeout(function () {
                localStorage.clear();
                _this.injector.get(util.WINDOW).location.href = _this.config.baseUrl + "/cas-proxy/app/logout";
            }, 5000);
        };
        YzDefaultInterceptor.prototype.reAttachToken = function (req) {
            var _a;
            var token = (_a = this.tokenSrv.get()) === null || _a === void 0 ? void 0 : _a.token;
            return req.clone({
                setHeaders: {
                    Authorization: "Bearer " + token
                }
            });
        };
        YzDefaultInterceptor.prototype.refreshTokenRequest = function () {
            var model = this.tokenSrv.get();
            var form = new FormData();
            form.set('refresh_token', model === null || model === void 0 ? void 0 : model.refreshToken);
            other.log('yz.default.interceptor: use the refresh token to request a new token', model === null || model === void 0 ? void 0 : model.refreshToken);
            return this.http.post("/auth/user/token/refresh?_allow_anonymous=true", form);
        };
        YzDefaultInterceptor.prototype.tryRefreshToken = function (ev, req, next) {
            var _this = this;
            // 连刷新Token的请求都错了，那就是真错了
            if (['/auth/oauth/token'].some(function (url) { return req.url.includes(url); })) {
                this.ToLogin();
                return rxjs.throwError(ev);
            }
            // 正在刷新token，所有其他请求排队
            if (this.refreshToking) {
                return this.refreshToken$.pipe(operators.filter(function (v) { return !!v; }), operators.take(1), operators.switchMap(function () { return next.handle(_this.reAttachToken(req)); }));
            }
            //尝试调用刷新 Token
            this.refreshToking = true;
            this.refreshToken$.next(null);
            // 处理Token
            return this.refreshTokenRequest().pipe(operators.switchMap(function (res) {
                other.log('yz.default.interceptor: refresh token accessed -> ', res);
                // 重新保存新 token
                var access_token = res.access_token, expires_in = res.expires_in, refresh_token = res.refresh_token, scope = res.scope, token_type = res.token_type;
                _this.tokenSrv.set({
                    token: access_token,
                    expired: expires_in,
                    refreshToken: refresh_token,
                    tokenType: token_type,
                    scope: scope
                });
                // 通知后续请求继续执行
                _this.refreshToking = false;
                _this.refreshToken$.next(res);
                // 重新发起请求
                return next.handle(_this.reAttachToken(req));
            }), operators.catchError(function (err) {
                _this.refreshToking = false;
                _this.ToLogin();
                return rxjs.throwError(err);
            }));
        };
        YzDefaultInterceptor.prototype.getAdditionalHeaders = function (headers) {
            var res = {};
            var lang = this.injector.get(i1.YUNZAI_I18N_TOKEN).currentLang;
            if (!(headers === null || headers === void 0 ? void 0 : headers.has('Accept-Language')) && lang) {
                res['Accept-Language'] = lang;
            }
            return res;
        };
        YzDefaultInterceptor.prototype.handleData = function (ev, req, next) {
            this.checkStatus(ev);
            switch (ev.status) {
                case 200:
                    return rxjs.of(ev);
                case 401:
                    if (this.config.refreshTokenEnabled && this.config.refreshTokenType === 're-request') {
                        return this.tryRefreshToken(ev, req, next);
                    }
                    this.ToLogin();
                    break;
                case 403:
                case 404:
                case 500:
                    this.goTo("/exception/" + ev.status);
                    break;
                default:
                    if (ev instanceof http.HttpErrorResponse) {
                        console.warn('未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng.yunzainfo.com/docs/server 解决跨域问题', ev);
                    }
                    break;
            }
            if (ev instanceof http.HttpErrorResponse) {
                return rxjs.throwError(ev);
            }
            else {
                return rxjs.of(ev);
            }
        };
        YzDefaultInterceptor.prototype.intercept = function (req, next) {
            var _this = this;
            other.log('yz.default.interceptor.ts: ', 'request ', req);
            // 统一加前缀
            var url = req.url;
            if (!url.startsWith('https://') && !url.startsWith('http://')) {
                url = this.config.baseUrl + url;
            }
            if (url.includes('.json') && url.includes('assets')) {
                url = req.url;
            }
            // 加入语言头
            var newReq = req.clone({ url: url, setHeaders: this.getAdditionalHeaders(req.headers) });
            return next.handle(newReq).pipe(operators.mergeMap(function (ev) {
                // 允许统一对请求错误处理
                if (ev instanceof http.HttpResponseBase) {
                    return _this.handleData(ev, newReq, next);
                }
                // 若一切都正常，则后续操作
                return rxjs.of(ev);
            }), operators.catchError(function (err) { return _this.handleData(err, newReq, next); }));
        };
        return YzDefaultInterceptor;
    }());
    YzDefaultInterceptor.decorators = [
        { type: i0.Injectable }
    ];
    YzDefaultInterceptor.ctorParameters = function () { return [
        { type: i0.Injector }
    ]; };

    function mapYzSideToYelonMenu(menus) {
        menus.forEach(function (menu) {
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
        menus.forEach(function (menu) {
            if (menu.link) {
                prefix += menu.link;
            }
            else {
                prefix += '';
            }
            if (menu.menuAuths) {
                menu.menuAuths.forEach(function (a) {
                    abilities.push(prefix + ":" + a);
                    abilities.push(a);
                });
            }
            if (menu.children) {
                generateAbility(menu.children, abilities, prefix);
            }
        });
    }
    var YzStartupService = /** @class */ (function () {
        function YzStartupService(iconSrv, menuService, i18n, settingService, aclService, titleService, yzAuthService, cacheService, configService) {
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
            iconSrv.addIcon.apply(iconSrv, __spreadArray([], __read(shared.ICONS)));
        }
        YzStartupService.prototype.load = function () {
            var _this = this;
            util.log('startup.service: ', 'load');
            var defaultLang = this.i18n.defaultLang;
            return this.i18n.loadLangData(defaultLang).pipe(operators.mergeMap(function (langData) {
                util.log('startup.service: ', 'set i18n, defaultLang->', defaultLang, ' langData->', langData);
                _this.i18n.use(defaultLang, langData);
                return rxjs.of(null);
            }), operators.mergeMap(function () {
                return _this.yzAuthService.login();
            }), operators.mergeMap(function (v) {
                // preloader finish
                _this.systemInit();
                util.log('startup.service: preloader finish');
                var win = window;
                if (win && win.appBootstrap) {
                    win.appBootstrap();
                }
                return rxjs.of(v);
            }));
        };
        YzStartupService.prototype.systemInit = function () {
            var _this = this;
            util.log('startup.service: system init');
            // user
            var user = this.cacheService.get('_yz_user', { mode: 'none' });
            // menu
            var ms = util.deepCopy(user.menu).filter(function (m) { return m.systemCode && m.systemCode === _this.bis.systemCode; });
            mapYzSideToYelonMenu(ms);
            var currentMenu = ms.pop();
            this.menuService.add([currentMenu]);
            // logo app
            this.settingService.setApp({ name: currentMenu.text, description: currentMenu.intro });
            this.settingService.setUser({
                name: user.realname || 'no name',
                avatar: this.bis.baseUrl + "/filecenter/file/" + user.avatarId || '',
                email: user.email || 'no email'
            });
            // title
            this.titleService.default = currentMenu.text || 'default application name';
            this.titleService.setTitle(currentMenu.text || 'no title');
            // acl
            var abilities = [];
            generateAbility([currentMenu], abilities, '');
            this.aclService.attachRole((user === null || user === void 0 ? void 0 : user.roles.map(function (role) {
                return role.roleValue;
            }).filter(function (a) { return !!a; })) || []);
            this.aclService.attachAbility(abilities);
            // cache current
            this.cacheService.set('_yz_current', {
                text: currentMenu.text,
                intro: currentMenu.intro,
                icon: currentMenu.appIconUrl
            });
        };
        return YzStartupService;
    }());
    YzStartupService.decorators = [
        { type: i0.Injectable }
    ];
    YzStartupService.ctorParameters = function () { return [
        { type: icon.NzIconService },
        { type: i1.MenuService },
        { type: YzI18NService, decorators: [{ type: i0.Inject, args: [i1.YUNZAI_I18N_TOKEN,] }] },
        { type: i1.SettingsService },
        { type: acl.ACLService },
        { type: i1.TitleService },
        { type: YzAuthService },
        { type: i2$1.CacheService },
        { type: util.YunzaiConfigService }
    ]; };
    function YzStartupServiceFactory(startupService) {
        return function () { return startupService.load(); };
    }
    //@ts-ignore
    var YZ_APPINIT_PROVIDES = [
        YzStartupService,
        {
            provide: i0.APP_INITIALIZER,
            useFactory: YzStartupServiceFactory,
            deps: [YzStartupService],
            multi: true
        }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BUSINESS_DEFAULT_CONFIG = BUSINESS_DEFAULT_CONFIG;
    exports.STOMP_DEFAULT_CONFIG = STOMP_DEFAULT_CONFIG;
    exports.YZ_APPINIT_PROVIDES = YZ_APPINIT_PROVIDES;
    exports.YunzaiLayoutModule = YunzaiLayoutModule;
    exports.YzAuthService = YzAuthService;
    exports.YzDefaultInterceptor = YzDefaultInterceptor;
    exports.YzHeaderApplicationComponent = YzHeaderApplicationComponent;
    exports.YzHeaderClearStorageComponent = YzHeaderClearStorageComponent;
    exports.YzHeaderFullScreenComponent = YzHeaderFullScreenComponent;
    exports.YzHeaderI18NComponent = YzHeaderI18NComponent;
    exports.YzHeaderNotifyComponent = YzHeaderNotifyComponent;
    exports.YzHeaderThemBtnComponent = YzHeaderThemBtnComponent;
    exports.YzHeaderUserComponent = YzHeaderUserComponent;
    exports.YzI18NService = YzI18NService;
    exports.YzLayoutBasicComponent = YzLayoutBasicComponent;
    exports.YzStartupService = YzStartupService;
    exports.YzStartupServiceFactory = YzStartupServiceFactory;
    exports.YzStompService = YzStompService;
    exports.generateAbility = generateAbility;
    exports.mapYzSideToYelonMenu = mapYzSideToYelonMenu;
    exports.mergeBisConfig = mergeBisConfig;
    exports.mergeStompConfig = mergeStompConfig;
    exports["ɵ0"] = ɵ0;
    exports["ɵa"] = YzHeaderApplicationComponent;
    exports["ɵb"] = YzHeaderNotifyComponent;
    exports["ɵc"] = YzHeaderThemBtnComponent;
    exports["ɵd"] = YzHeaderUserComponent;
    exports["ɵe"] = YzHeaderFullScreenComponent;
    exports["ɵf"] = YzHeaderClearStorageComponent;
    exports["ɵg"] = YzHeaderI18NComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=layout.umd.js.map
