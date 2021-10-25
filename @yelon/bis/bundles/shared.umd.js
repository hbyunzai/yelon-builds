/**
 * @license ng-yunzai(devcui@outlook.com) v12.0.11
 * (c) 2020 devcui https://github.com/hbyunzai/yelon/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@yelon/abc/auto-focus'), require('@yelon/abc/avatar-list'), require('@yelon/abc/count-down'), require('@yelon/abc/date-picker'), require('@yelon/abc/down-file'), require('@yelon/abc/ellipsis'), require('@yelon/abc/error-collect'), require('@yelon/abc/exception'), require('@yelon/abc/footer-toolbar'), require('@yelon/abc/global-footer'), require('@yelon/abc/image'), require('@yelon/abc/let'), require('@yelon/abc/loading'), require('@yelon/abc/media'), require('@yelon/abc/notice-icon'), require('@yelon/abc/onboarding'), require('@yelon/abc/page-header'), require('@yelon/abc/pdf'), require('@yelon/abc/qr'), require('@yelon/abc/quick-menu'), require('@yelon/abc/result'), require('@yelon/abc/reuse-tab'), require('@yelon/abc/se'), require('@yelon/abc/sg'), require('@yelon/abc/st'), require('@yelon/abc/sv'), require('@yelon/abc/tag-select'), require('@yelon/acl'), require('@yelon/chart/bar'), require('@yelon/chart/card'), require('@yelon/chart/chart-echarts'), require('@yelon/chart/custom'), require('@yelon/chart/gauge'), require('@yelon/chart/mini-area'), require('@yelon/chart/mini-bar'), require('@yelon/chart/mini-progress'), require('@yelon/chart/number-info'), require('@yelon/chart/pie'), require('@yelon/chart/radar'), require('@yelon/chart/single-bar'), require('@yelon/chart/tag-cloud'), require('@yelon/chart/timeline'), require('@yelon/chart/trend'), require('@yelon/chart/water-wave'), require('@yelon/form'), require('@yelon/theme'), require('@yelon/theme/layout-default'), require('@yelon/theme/setting-drawer'), require('@yelon/theme/theme-btn'), require('@yelon/util'), require('ng-zorro-antd/affix'), require('ng-zorro-antd/alert'), require('ng-zorro-antd/anchor'), require('ng-zorro-antd/avatar'), require('ng-zorro-antd/back-top'), require('ng-zorro-antd/badge'), require('ng-zorro-antd/breadcrumb'), require('ng-zorro-antd/button'), require('ng-zorro-antd/card'), require('ng-zorro-antd/carousel'), require('ng-zorro-antd/checkbox'), require('ng-zorro-antd/core/highlight'), require('ng-zorro-antd/date-picker'), require('ng-zorro-antd/divider'), require('ng-zorro-antd/drawer'), require('ng-zorro-antd/dropdown'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/form'), require('ng-zorro-antd/grid'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/input'), require('ng-zorro-antd/input-number'), require('ng-zorro-antd/list'), require('ng-zorro-antd/message'), require('ng-zorro-antd/modal'), require('ng-zorro-antd/pagination'), require('ng-zorro-antd/popover'), require('ng-zorro-antd/radio'), require('ng-zorro-antd/resizable'), require('ng-zorro-antd/select'), require('ng-zorro-antd/spin'), require('ng-zorro-antd/steps'), require('ng-zorro-antd/switch'), require('ng-zorro-antd/table'), require('ng-zorro-antd/tabs'), require('ng-zorro-antd/tag'), require('ng-zorro-antd/tooltip'), require('ng-zorro-antd/upload'), require('@angular/core'), require('@ant-design/icons-angular/icons')) :
    typeof define === 'function' && define.amd ? define('@yelon/bis/shared', ['exports', '@yelon/abc/auto-focus', '@yelon/abc/avatar-list', '@yelon/abc/count-down', '@yelon/abc/date-picker', '@yelon/abc/down-file', '@yelon/abc/ellipsis', '@yelon/abc/error-collect', '@yelon/abc/exception', '@yelon/abc/footer-toolbar', '@yelon/abc/global-footer', '@yelon/abc/image', '@yelon/abc/let', '@yelon/abc/loading', '@yelon/abc/media', '@yelon/abc/notice-icon', '@yelon/abc/onboarding', '@yelon/abc/page-header', '@yelon/abc/pdf', '@yelon/abc/qr', '@yelon/abc/quick-menu', '@yelon/abc/result', '@yelon/abc/reuse-tab', '@yelon/abc/se', '@yelon/abc/sg', '@yelon/abc/st', '@yelon/abc/sv', '@yelon/abc/tag-select', '@yelon/acl', '@yelon/chart/bar', '@yelon/chart/card', '@yelon/chart/chart-echarts', '@yelon/chart/custom', '@yelon/chart/gauge', '@yelon/chart/mini-area', '@yelon/chart/mini-bar', '@yelon/chart/mini-progress', '@yelon/chart/number-info', '@yelon/chart/pie', '@yelon/chart/radar', '@yelon/chart/single-bar', '@yelon/chart/tag-cloud', '@yelon/chart/timeline', '@yelon/chart/trend', '@yelon/chart/water-wave', '@yelon/form', '@yelon/theme', '@yelon/theme/layout-default', '@yelon/theme/setting-drawer', '@yelon/theme/theme-btn', '@yelon/util', 'ng-zorro-antd/affix', 'ng-zorro-antd/alert', 'ng-zorro-antd/anchor', 'ng-zorro-antd/avatar', 'ng-zorro-antd/back-top', 'ng-zorro-antd/badge', 'ng-zorro-antd/breadcrumb', 'ng-zorro-antd/button', 'ng-zorro-antd/card', 'ng-zorro-antd/carousel', 'ng-zorro-antd/checkbox', 'ng-zorro-antd/core/highlight', 'ng-zorro-antd/date-picker', 'ng-zorro-antd/divider', 'ng-zorro-antd/drawer', 'ng-zorro-antd/dropdown', 'ng-zorro-antd/empty', 'ng-zorro-antd/form', 'ng-zorro-antd/grid', 'ng-zorro-antd/icon', 'ng-zorro-antd/input', 'ng-zorro-antd/input-number', 'ng-zorro-antd/list', 'ng-zorro-antd/message', 'ng-zorro-antd/modal', 'ng-zorro-antd/pagination', 'ng-zorro-antd/popover', 'ng-zorro-antd/radio', 'ng-zorro-antd/resizable', 'ng-zorro-antd/select', 'ng-zorro-antd/spin', 'ng-zorro-antd/steps', 'ng-zorro-antd/switch', 'ng-zorro-antd/table', 'ng-zorro-antd/tabs', 'ng-zorro-antd/tag', 'ng-zorro-antd/tooltip', 'ng-zorro-antd/upload', '@angular/core', '@ant-design/icons-angular/icons'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.yelon = global.yelon || {}, global.yelon.bis = global.yelon.bis || {}, global.yelon.bis.shared = {}), global.autoFocus, global.avatarList, global.countDown, global.datePicker, global.downFile, global.ellipsis, global.errorCollect, global.exception, global.footerToolbar, global.globalFooter, global.image, global._let, global.loading, global.media, global.noticeIcon, global.onboarding, global.pageHeader, global.pdf, global.qr, global.quickMenu, global.result, global.reuseTab, global.se, global.sg, global.st, global.sv, global.tagSelect, global.yelon.acl, global.bar, global.card, global.chartEcharts, global.custom, global.gauge, global.miniArea, global.miniBar, global.miniProgress, global.numberInfo, global.pie, global.radar, global.singleBar, global.tagCloud, global.timeline, global.trend, global.waterWave, global.yelon.form, global.yelon.theme, global.layoutDefault, global.settingDrawer, global.themeBtn, global.yelon.util, global.affix, global.alert, global.anchor, global.avatar, global.backTop, global.badge, global.breadcrumb, global.button, global.card$1, global.carousel, global.checkbox, global.highlight, global.datePicker$1, global.divider, global["ng-zorro-antd/drawer"], global.dropdown, global.empty, global.form$1, global.grid, global["ng-zorro-antd/icon"], global.input, global.inputNumber, global.list, global.message, global["ng-zorro-antd/modal"], global.pagination, global.popover, global.radio, global.resizable, global.select, global.spin, global.steps, global._switch, global.table, global.tabs, global.tag, global.tooltip, global.upload, global.ng.core, global.icons));
})(this, (function (exports, autoFocus, avatarList, countDown, datePicker, downFile, ellipsis, errorCollect, exception, footerToolbar, globalFooter, image, _let, loading, media, noticeIcon, onboarding, pageHeader, pdf, qr, quickMenu, result, reuseTab, se, sg, st, sv, tagSelect, acl, bar, card, chartEcharts, custom, gauge, miniArea, miniBar, miniProgress, numberInfo, pie, radar, singleBar, tagCloud, timeline, trend, waterWave, form, theme, layoutDefault, settingDrawer, themeBtn, util, affix, alert, anchor, avatar, backTop, badge, breadcrumb, button, card$1, carousel, checkbox, highlight, datePicker$1, divider, drawer, dropdown, empty, form$1, grid, icon, input, inputNumber, list, message, modal, pagination, popover, radio, resizable, select, spin, steps, _switch, table, tabs, tag, tooltip, upload, core, icons) { 'use strict';

    var YZ_SHARED_YELON_MODULES = [
        theme.YunzaiThemeModule,
        noticeIcon.NoticeIconModule,
        reuseTab.ReuseTabModule,
        layoutDefault.LayoutDefaultModule,
        acl.YelonACLModule,
        form.YelonFormModule,
        avatarList.AvatarListModule,
        countDown.CountDownModule,
        datePicker.DatePickerModule,
        downFile.DownFileModule,
        ellipsis.EllipsisModule,
        st.STModule,
        sv.SVModule,
        se.SEModule,
        sg.SGModule,
        image.ImageModule,
        loading.LoadingModule,
        qr.QRModule,
        onboarding.OnboardingModule,
        errorCollect.ErrorCollectModule,
        exception.ExceptionModule,
        footerToolbar.FooterToolbarModule,
        globalFooter.GlobalFooterModule,
        globalFooter.GlobalFooterModule,
        pageHeader.PageHeaderModule,
        result.ResultModule,
        tagSelect.TagSelectModule,
        noticeIcon.NoticeIconModule,
        quickMenu.QuickMenuModule,
        bar.G2BarModule,
        card.G2CardModule,
        custom.G2CustomModule,
        gauge.G2GaugeModule,
        miniArea.G2MiniAreaModule,
        miniBar.G2MiniBarModule,
        miniProgress.G2MiniProgressModule,
        pie.G2PieModule,
        radar.G2RadarModule,
        singleBar.G2SingleBarModule,
        tagCloud.G2TagCloudModule,
        timeline.G2TimelineModule,
        waterWave.G2WaterWaveModule,
        chartEcharts.ChartEChartsModule,
        numberInfo.NumberInfoModule,
        trend.TrendModule,
        reuseTab.ReuseTabModule,
        media.MediaModule,
        themeBtn.ThemeBtnModule,
        settingDrawer.SettingDrawerModule,
        pdf.PdfModule,
        util.CurrencyPipeModule,
        util.FormatPipeModule,
        util.FilterPipeModule,
        autoFocus.AutoFocusModule,
        _let.LetModule
    ];

    var YZ_SHARED_ZORRO_MODULES = [
        button.NzButtonModule,
        message.NzMessageModule,
        backTop.NzBackTopModule,
        dropdown.NzDropDownModule,
        grid.NzGridModule,
        carousel.NzCarouselModule,
        checkbox.NzCheckboxModule,
        tooltip.NzToolTipModule,
        popover.NzPopoverModule,
        select.NzSelectModule,
        icon.NzIconModule,
        affix.NzAffixModule,
        badge.NzBadgeModule,
        alert.NzAlertModule,
        modal.NzModalModule,
        table.NzTableModule,
        drawer.NzDrawerModule,
        tabs.NzTabsModule,
        input.NzInputModule,
        datePicker$1.NzDatePickerModule,
        tag.NzTagModule,
        inputNumber.NzInputNumberModule,
        breadcrumb.NzBreadCrumbModule,
        steps.NzStepsModule,
        list.NzListModule,
        _switch.NzSwitchModule,
        radio.NzRadioModule,
        form$1.NzFormModule,
        avatar.NzAvatarModule,
        card$1.NzCardModule,
        spin.NzSpinModule,
        divider.NzDividerModule,
        resizable.NzResizableModule,
        anchor.NzAnchorModule,
        upload.NzUploadModule,
        pagination.NzPaginationModule,
        empty.NzEmptyModule,
        highlight.NzHighlightModule
    ];

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

    var THIRDMODULES = [];
    var COMPONENTS = [];
    var DIRECTIVES = [];
    var YzSharedModule = /** @class */ (function () {
        function YzSharedModule() {
        }
        return YzSharedModule;
    }());
    YzSharedModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: __spreadArray(__spreadArray(__spreadArray([], __read(YZ_SHARED_YELON_MODULES)), __read(YZ_SHARED_ZORRO_MODULES)), __read(THIRDMODULES)),
                    declarations: __spreadArray(__spreadArray([], __read(COMPONENTS)), __read(DIRECTIVES)),
                    exports: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(YZ_SHARED_YELON_MODULES)), __read(YZ_SHARED_ZORRO_MODULES)), __read(THIRDMODULES)), __read(COMPONENTS)), __read(DIRECTIVES))
                },] }
    ];

    /*
     * Automatically generated by 'ng g ng-yunzai:plugin icon'
     * @see https://ng.yunzainfo.com/cli/plugin#icon
     */
    var ICONS = [
        icons.AccountBookTwoTone,
        icons.AccountBookFill,
        icons.AccountBookOutline,
        icons.AlertTwoTone,
        icons.AlertFill,
        icons.AlibabaOutline,
        icons.AimOutline,
        icons.AlipayCircleFill,
        icons.AlertOutline,
        icons.AlignCenterOutline,
        icons.AlipayCircleOutline,
        icons.AlipayOutline,
        icons.AlignLeftOutline,
        icons.AlignRightOutline,
        icons.AmazonOutline,
        icons.AliwangwangOutline,
        icons.AliyunOutline,
        icons.AlipaySquareFill,
        icons.AmazonCircleFill,
        icons.AndroidFill,
        icons.AliwangwangFill,
        icons.AntCloudOutline,
        icons.AmazonSquareFill,
        icons.AndroidOutline,
        icons.ApartmentOutline,
        icons.ApiTwoTone,
        icons.ApiFill,
        icons.ApiOutline,
        icons.AntDesignOutline,
        icons.AppstoreAddOutline,
        icons.AppstoreFill,
        icons.AppleOutline,
        icons.AppstoreOutline,
        icons.ArrowDownOutline,
        icons.AppleFill,
        icons.ArrowsAltOutline,
        icons.AppstoreTwoTone,
        icons.ArrowUpOutline,
        icons.AreaChartOutline,
        icons.ArrowLeftOutline,
        icons.AudioFill,
        icons.ArrowRightOutline,
        icons.AudioTwoTone,
        icons.AuditOutline,
        icons.AudioMutedOutline,
        icons.BackwardFill,
        icons.AudioOutline,
        icons.BackwardOutline,
        icons.BankFill,
        icons.BarcodeOutline,
        icons.BellFill,
        icons.BankTwoTone,
        icons.BarsOutline,
        icons.BankOutline,
        icons.BehanceCircleFill,
        icons.BehanceSquareFill,
        icons.BoldOutline,
        icons.BellOutline,
        icons.BehanceOutline,
        icons.BlockOutline,
        icons.BehanceSquareOutline,
        icons.BgColorsOutline,
        icons.BellTwoTone,
        icons.BarChartOutline,
        icons.BookTwoTone,
        icons.BookFill,
        icons.BorderOuterOutline,
        icons.BorderLeftOutline,
        icons.BorderBottomOutline,
        icons.BorderHorizontalOutline,
        icons.BorderTopOutline,
        icons.BorderOutline,
        icons.BorderInnerOutline,
        icons.BorderRightOutline,
        icons.BoxPlotOutline,
        icons.BoxPlotFill,
        icons.BoxPlotTwoTone,
        icons.BookOutline,
        icons.BorderlessTableOutline,
        icons.BorderVerticleOutline,
        icons.BuildTwoTone,
        icons.BuildOutline,
        icons.BugFill,
        icons.BugOutline,
        icons.BugTwoTone,
        icons.BulbFill,
        icons.BulbTwoTone,
        icons.BuildFill,
        icons.BulbOutline,
        icons.CalculatorFill,
        icons.CalculatorTwoTone,
        icons.CalendarFill,
        icons.CalendarOutline,
        icons.CalculatorOutline,
        icons.CalendarTwoTone,
        icons.CameraOutline,
        icons.CameraFill,
        icons.CameraTwoTone,
        icons.CarTwoTone,
        icons.CaretDownOutline,
        icons.CarOutline,
        icons.CaretLeftFill,
        icons.CarFill,
        icons.CaretRightOutline,
        icons.CaretDownFill,
        icons.CaretUpOutline,
        icons.CaretRightFill,
        icons.CarryOutFill,
        icons.CarryOutOutline,
        icons.CaretLeftOutline,
        icons.CaretUpFill,
        icons.BranchesOutline,
        icons.CarryOutTwoTone,
        icons.CheckCircleFill,
        icons.CheckCircleOutline,
        icons.CheckSquareOutline,
        icons.CheckCircleTwoTone,
        icons.CiCircleTwoTone,
        icons.CheckOutline,
        icons.CheckSquareTwoTone,
        icons.CiOutline,
        icons.CheckSquareFill,
        icons.CiTwoTone,
        icons.ChromeOutline,
        icons.ClockCircleOutline,
        icons.CiCircleOutline,
        icons.ChromeFill,
        icons.ClearOutline,
        icons.CloseCircleTwoTone,
        icons.CiCircleFill,
        icons.CloseCircleOutline,
        icons.ClockCircleFill,
        icons.CloseCircleFill,
        icons.ClockCircleTwoTone,
        icons.CloseOutline,
        icons.CloseSquareOutline,
        icons.CloseSquareFill,
        icons.CloudFill,
        icons.CloseSquareTwoTone,
        icons.CloudDownloadOutline,
        icons.CloudTwoTone,
        icons.CloudServerOutline,
        icons.CloudUploadOutline,
        icons.CloudSyncOutline,
        icons.ClusterOutline,
        icons.CodeSandboxCircleFill,
        icons.CodeFill,
        icons.CodepenCircleOutline,
        icons.CloudOutline,
        icons.CodeSandboxOutline,
        icons.CodeOutline,
        icons.CodeSandboxSquareFill,
        icons.CodeTwoTone,
        icons.CodepenSquareFill,
        icons.CodepenOutline,
        icons.CoffeeOutline,
        icons.ColumnWidthOutline,
        icons.CompressOutline,
        icons.ColumnHeightOutline,
        icons.CodepenCircleFill,
        icons.CompassTwoTone,
        icons.CommentOutline,
        icons.ContainerFill,
        icons.CompassOutline,
        icons.ConsoleSqlOutline,
        icons.ContactsOutline,
        icons.ContainerTwoTone,
        icons.ContactsFill,
        icons.ContactsTwoTone,
        icons.ContainerOutline,
        icons.ControlFill,
        icons.CopyFill,
        icons.CopyOutline,
        icons.CompassFill,
        icons.CopyTwoTone,
        icons.CopyrightOutline,
        icons.CopyrightCircleOutline,
        icons.ControlTwoTone,
        icons.ControlOutline,
        icons.CreditCardFill,
        icons.CopyrightTwoTone,
        icons.CrownFill,
        icons.CopyrightCircleFill,
        icons.CrownOutline,
        icons.CustomerServiceTwoTone,
        icons.CreditCardOutline,
        icons.CustomerServiceOutline,
        icons.DashboardTwoTone,
        icons.CrownTwoTone,
        icons.CreditCardTwoTone,
        icons.CustomerServiceFill,
        icons.DashboardFill,
        icons.DashOutline,
        icons.DatabaseOutline,
        icons.DatabaseTwoTone,
        icons.DatabaseFill,
        icons.DashboardOutline,
        icons.DeleteTwoTone,
        icons.DeleteRowOutline,
        icons.DeleteColumnOutline,
        icons.DeliveredProcedureOutline,
        icons.DeleteOutline,
        icons.CopyrightCircleTwoTone,
        icons.DesktopOutline,
        icons.DeleteFill,
        icons.DiffOutline,
        icons.DiffFill,
        icons.DeploymentUnitOutline,
        icons.DiffTwoTone,
        icons.DingtalkOutline,
        icons.DollarCircleFill,
        icons.DislikeFill,
        icons.DingtalkSquareFill,
        icons.DisconnectOutline,
        icons.DollarCircleTwoTone,
        icons.DollarOutline,
        icons.DingtalkCircleFill,
        icons.DislikeTwoTone,
        icons.DollarTwoTone,
        icons.DownCircleFill,
        icons.DislikeOutline,
        icons.DollarCircleOutline,
        icons.DoubleLeftOutline,
        icons.DownSquareFill,
        icons.DownOutline,
        icons.DownSquareOutline,
        icons.DownSquareTwoTone,
        icons.DownCircleTwoTone,
        icons.DoubleRightOutline,
        icons.DownCircleOutline,
        icons.DownloadOutline,
        icons.DotChartOutline,
        icons.DribbbleCircleFill,
        icons.DribbbleOutline,
        icons.DribbbleSquareOutline,
        icons.DropboxCircleFill,
        icons.DingdingOutline,
        icons.EditOutline,
        icons.DribbbleSquareFill,
        icons.DropboxSquareFill,
        icons.EllipsisOutline,
        icons.EnvironmentFill,
        icons.EditFill,
        icons.EnterOutline,
        icons.EuroCircleFill,
        icons.EuroTwoTone,
        icons.EuroCircleOutline,
        icons.EditTwoTone,
        icons.EuroOutline,
        icons.EnvironmentTwoTone,
        icons.ExclamationCircleFill,
        icons.ExpandAltOutline,
        icons.EuroCircleTwoTone,
        icons.ExclamationCircleTwoTone,
        icons.EnvironmentOutline,
        icons.ExperimentOutline,
        icons.ExperimentFill,
        icons.ExpandOutline,
        icons.ExceptionOutline,
        icons.ExportOutline,
        icons.ExperimentTwoTone,
        icons.ExclamationCircleOutline,
        icons.ExclamationOutline,
        icons.EyeFill,
        icons.EyeInvisibleFill,
        icons.EyeInvisibleTwoTone,
        icons.DropboxOutline,
        icons.DragOutline,
        icons.FacebookOutline,
        icons.FacebookFill,
        icons.EyeTwoTone,
        icons.EyeOutline,
        icons.FastForwardFill,
        icons.FieldBinaryOutline,
        icons.FieldNumberOutline,
        icons.FastBackwardOutline,
        icons.FileAddFill,
        icons.FastBackwardFill,
        icons.FileExcelFill,
        icons.FastForwardOutline,
        icons.FieldStringOutline,
        icons.FileDoneOutline,
        icons.FileAddTwoTone,
        icons.FileExcelTwoTone,
        icons.FileExclamationFill,
        icons.FileAddOutline,
        icons.FileExclamationOutline,
        icons.FieldTimeOutline,
        icons.FileImageTwoTone,
        icons.FileExcelOutline,
        icons.FileExclamationTwoTone,
        icons.FileImageFill,
        icons.FileGifOutline,
        icons.FileFill,
        icons.FileMarkdownTwoTone,
        icons.FileMarkdownOutline,
        icons.FallOutline,
        icons.FileImageOutline,
        icons.EyeInvisibleOutline,
        icons.FilePdfOutline,
        icons.FileSearchOutline,
        icons.FilePptTwoTone,
        icons.FilePdfTwoTone,
        icons.FileJpgOutline,
        icons.FileTextFill,
        icons.FilePptOutline,
        icons.FileSyncOutline,
        icons.FilePptFill,
        icons.FileUnknownOutline,
        icons.FileProtectOutline,
        icons.FileTextTwoTone,
        icons.FileWordFill,
        icons.FileUnknownTwoTone,
        icons.FileWordTwoTone,
        icons.FileUnknownFill,
        icons.FileTextOutline,
        icons.FileZipFill,
        icons.FilterTwoTone,
        icons.FilterFill,
        icons.FileWordOutline,
        icons.FireOutline,
        icons.FireTwoTone,
        icons.FileZipOutline,
        icons.FilterOutline,
        icons.FlagTwoTone,
        icons.FileTwoTone,
        icons.FilePdfFill,
        icons.FileOutline,
        icons.FileMarkdownFill,
        icons.FileZipTwoTone,
        icons.FlagOutline,
        icons.FolderAddTwoTone,
        icons.FolderOpenFill,
        icons.FireFill,
        icons.FlagFill,
        icons.FolderOutline,
        icons.FolderViewOutline,
        icons.FolderTwoTone,
        icons.FontColorsOutline,
        icons.FolderOpenTwoTone,
        icons.FolderFill,
        icons.ForwardOutline,
        icons.FolderOpenOutline,
        icons.ForkOutline,
        icons.ForwardFill,
        icons.FormatPainterOutline,
        icons.FormatPainterFill,
        icons.FormOutline,
        icons.FrownFill,
        icons.FrownTwoTone,
        icons.FullscreenOutline,
        icons.FontSizeOutline,
        icons.FundFill,
        icons.FunctionOutline,
        icons.FundViewOutline,
        icons.FullscreenExitOutline,
        icons.GifOutline,
        icons.FundProjectionScreenOutline,
        icons.FundTwoTone,
        icons.FolderAddFill,
        icons.FunnelPlotTwoTone,
        icons.GiftOutline,
        icons.FunnelPlotFill,
        icons.FundOutline,
        icons.FrownOutline,
        icons.GithubOutline,
        icons.GoldFill,
        icons.FolderAddOutline,
        icons.GitlabFill,
        icons.GiftFill,
        icons.GitlabOutline,
        icons.GoldTwoTone,
        icons.GoogleCircleFill,
        icons.GiftTwoTone,
        icons.GooglePlusCircleFill,
        icons.GoldOutline,
        icons.GithubFill,
        icons.GoogleOutline,
        icons.GooglePlusOutline,
        icons.GoogleSquareFill,
        icons.GoldenFill,
        icons.HddTwoTone,
        icons.GooglePlusSquareFill,
        icons.GlobalOutline,
        icons.HeartOutline,
        icons.HeartTwoTone,
        icons.GroupOutline,
        icons.HeartFill,
        icons.HeatMapOutline,
        icons.GatewayOutline,
        icons.FunnelPlotOutline,
        icons.HddFill,
        icons.HomeFill,
        icons.HighlightFill,
        icons.HomeOutline,
        icons.HistoryOutline,
        icons.HighlightOutline,
        icons.HddOutline,
        icons.HourglassFill,
        icons.HomeTwoTone,
        icons.HourglassTwoTone,
        icons.Html5Outline,
        icons.Html5Fill,
        icons.IdcardFill,
        icons.Html5TwoTone,
        icons.HourglassOutline,
        icons.IdcardTwoTone,
        icons.IdcardOutline,
        icons.IeOutline,
        icons.IeCircleFill,
        icons.IeSquareFill,
        icons.InboxOutline,
        icons.ImportOutline,
        icons.InfoCircleOutline,
        icons.InfoCircleTwoTone,
        icons.InsertRowAboveOutline,
        icons.InsertRowRightOutline,
        icons.InfoCircleFill,
        icons.InfoOutline,
        icons.InsertRowBelowOutline,
        icons.HighlightTwoTone,
        icons.InsuranceFill,
        icons.InstagramFill,
        icons.InteractionFill,
        icons.InsertRowLeftOutline,
        icons.InstagramOutline,
        icons.InteractionOutline,
        icons.ItalicOutline,
        icons.InteractionTwoTone,
        icons.LayoutOutline,
        icons.IssuesCloseOutline,
        icons.LayoutFill,
        icons.LaptopOutline,
        icons.LeftCircleFill,
        icons.LayoutTwoTone,
        icons.KeyOutline,
        icons.LeftOutline,
        icons.LeftCircleOutline,
        icons.LeftSquareOutline,
        icons.LeftSquareFill,
        icons.LeftCircleTwoTone,
        icons.LikeFill,
        icons.LeftSquareTwoTone,
        icons.LineOutline,
        icons.LikeTwoTone,
        icons.LinkedinOutline,
        icons.LineChartOutline,
        icons.LineHeightOutline,
        icons.LinkedinFill,
        icons.LinkOutline,
        icons.LikeOutline,
        icons.InsuranceOutline,
        icons.Loading3QuartersOutline,
        icons.LockFill,
        icons.InsuranceTwoTone,
        icons.MacCommandOutline,
        icons.LockTwoTone,
        icons.LoadingOutline,
        icons.MailOutline,
        icons.LoginOutline,
        icons.MedicineBoxOutline,
        icons.MailFill,
        icons.MailTwoTone,
        icons.MacCommandFill,
        icons.ManOutline,
        icons.MedicineBoxFill,
        icons.MedicineBoxTwoTone,
        icons.MediumCircleFill,
        icons.MediumOutline,
        icons.MehFill,
        icons.MediumWorkmarkOutline,
        icons.MenuFoldOutline,
        icons.MehOutline,
        icons.MediumSquareFill,
        icons.MessageTwoTone,
        icons.MehTwoTone,
        icons.MergeCellsOutline,
        icons.MinusCircleFill,
        icons.MenuOutline,
        icons.MenuUnfoldOutline,
        icons.MessageFill,
        icons.MinusCircleTwoTone,
        icons.LockOutline,
        icons.MinusOutline,
        icons.MinusCircleOutline,
        icons.LogoutOutline,
        icons.MessageOutline,
        icons.MoneyCollectFill,
        icons.MinusSquareOutline,
        icons.MinusSquareTwoTone,
        icons.MobileOutline,
        icons.MobileTwoTone,
        icons.MoneyCollectOutline,
        icons.MoreOutline,
        icons.NotificationFill,
        icons.NotificationOutline,
        icons.MoneyCollectTwoTone,
        icons.NodeIndexOutline,
        icons.NodeExpandOutline,
        icons.MonitorOutline,
        icons.OrderedListOutline,
        icons.NodeCollapseOutline,
        icons.NumberOutline,
        icons.PaperClipOutline,
        icons.NotificationTwoTone,
        icons.PauseCircleFill,
        icons.PartitionOutline,
        icons.PauseOutline,
        icons.OneToOneOutline,
        icons.PayCircleOutline,
        icons.PayCircleFill,
        icons.MinusSquareFill,
        icons.PauseCircleOutline,
        icons.PauseCircleTwoTone,
        icons.PicCenterOutline,
        icons.PicRightOutline,
        icons.PercentageOutline,
        icons.MobileFill,
        icons.PictureOutline,
        icons.PictureFill,
        icons.PhoneTwoTone,
        icons.PhoneFill,
        icons.PieChartFill,
        icons.PictureTwoTone,
        icons.PieChartOutline,
        icons.PlaySquareFill,
        icons.PlayCircleTwoTone,
        icons.PlayCircleFill,
        icons.PlusCircleFill,
        icons.PlaySquareTwoTone,
        icons.PlaySquareOutline,
        icons.PlayCircleOutline,
        icons.PieChartTwoTone,
        icons.PlusCircleOutline,
        icons.PlusSquareFill,
        icons.PoundCircleFill,
        icons.PlusSquareOutline,
        icons.PlusOutline,
        icons.PoundOutline,
        icons.PoundCircleOutline,
        icons.PlusSquareTwoTone,
        icons.PlusCircleTwoTone,
        icons.PoweroffOutline,
        icons.PoundCircleTwoTone,
        icons.PhoneOutline,
        icons.PrinterFill,
        icons.PicLeftOutline,
        icons.ProjectTwoTone,
        icons.PrinterOutline,
        icons.ProjectFill,
        icons.ProfileOutline,
        icons.ProfileTwoTone,
        icons.ProjectOutline,
        icons.PropertySafetyFill,
        icons.PullRequestOutline,
        icons.PropertySafetyOutline,
        icons.PushpinOutline,
        icons.PushpinTwoTone,
        icons.PropertySafetyTwoTone,
        icons.PushpinFill,
        icons.QqOutline,
        icons.QqCircleFill,
        icons.QrcodeOutline,
        icons.QqSquareFill,
        icons.QuestionCircleTwoTone,
        icons.QuestionCircleFill,
        icons.RadarChartOutline,
        icons.RadiusUprightOutline,
        icons.QuestionCircleOutline,
        icons.QuestionOutline,
        icons.ReadFill,
        icons.RadiusUpleftOutline,
        icons.RadiusBottomleftOutline,
        icons.RadiusSettingOutline,
        icons.RadiusBottomrightOutline,
        icons.ProfileFill,
        icons.PrinterTwoTone,
        icons.ReadOutline,
        icons.ReconciliationFill,
        icons.ReloadOutline,
        icons.ReconciliationOutline,
        icons.RedEnvelopeTwoTone,
        icons.RedditCircleFill,
        icons.RedoOutline,
        icons.RedEnvelopeFill,
        icons.RedditOutline,
        icons.RestTwoTone,
        icons.RightCircleOutline,
        icons.RestOutline,
        icons.RedditSquareFill,
        icons.RestFill,
        icons.RightCircleTwoTone,
        icons.RightOutline,
        icons.RightSquareFill,
        icons.RightCircleFill,
        icons.RightSquareOutline,
        icons.RetweetOutline,
        icons.RiseOutline,
        icons.RightSquareTwoTone,
        icons.RobotFill,
        icons.RocketOutline,
        icons.RobotOutline,
        icons.RocketTwoTone,
        icons.RocketFill,
        icons.RedEnvelopeOutline,
        icons.RollbackOutline,
        icons.RotateRightOutline,
        icons.RotateLeftOutline,
        icons.ReconciliationTwoTone,
        icons.SafetyCertificateTwoTone,
        icons.SaveOutline,
        icons.SafetyOutline,
        icons.SaveFill,
        icons.SaveTwoTone,
        icons.ScheduleFill,
        icons.SafetyCertificateOutline,
        icons.ScanOutline,
        icons.ScheduleTwoTone,
        icons.SearchOutline,
        icons.ScheduleOutline,
        icons.SecurityScanTwoTone,
        icons.SecurityScanOutline,
        icons.ScissorOutline,
        icons.SelectOutline,
        icons.SecurityScanFill,
        icons.SendOutline,
        icons.SettingOutline,
        icons.SettingTwoTone,
        icons.SettingFill,
        icons.ShareAltOutline,
        icons.ShopOutline,
        icons.ShopFill,
        icons.ShopTwoTone,
        icons.ShrinkOutline,
        icons.ShakeOutline,
        icons.ShoppingOutline,
        icons.ShoppingCartOutline,
        icons.ShoppingFill,
        icons.SisternodeOutline,
        icons.ShoppingTwoTone,
        icons.SafetyCertificateFill,
        icons.SkinOutline,
        icons.SignalFill,
        icons.SketchOutline,
        icons.SkinTwoTone,
        icons.SketchSquareFill,
        icons.SkypeFill,
        icons.SkinFill,
        icons.SlackCircleFill,
        icons.SlackSquareFill,
        icons.SlidersTwoTone,
        icons.SkypeOutline,
        icons.SlidersFill,
        icons.SlackSquareOutline,
        icons.SmallDashOutline,
        icons.SmileTwoTone,
        icons.SlidersOutline,
        icons.SnippetsFill,
        icons.SnippetsOutline,
        icons.SmileOutline,
        icons.SolutionOutline,
        icons.SlackOutline,
        icons.SnippetsTwoTone,
        icons.SoundTwoTone,
        icons.SortAscendingOutline,
        icons.SoundFill,
        icons.SortDescendingOutline,
        icons.SmileFill,
        icons.SoundOutline,
        icons.SplitCellsOutline,
        icons.SketchCircleFill,
        icons.StarOutline,
        icons.StockOutline,
        icons.StarTwoTone,
        icons.StepForwardFill,
        icons.StarFill,
        icons.StepBackwardFill,
        icons.StepForwardOutline,
        icons.StopFill,
        icons.SubnodeOutline,
        icons.SwapLeftOutline,
        icons.StopOutline,
        icons.StopTwoTone,
        icons.SwapRightOutline,
        icons.SwapOutline,
        icons.SwitcherTwoTone,
        icons.SwitcherOutline,
        icons.SyncOutline,
        icons.StrikethroughOutline,
        icons.SwitcherFill,
        icons.TagOutline,
        icons.TabletTwoTone,
        icons.TabletOutline,
        icons.TabletFill,
        icons.TableOutline,
        icons.TagsFill,
        icons.TagFill,
        icons.TagsTwoTone,
        icons.TaobaoCircleOutline,
        icons.StepBackwardOutline,
        icons.TagsOutline,
        icons.TagTwoTone,
        icons.TaobaoOutline,
        icons.ThunderboltOutline,
        icons.TaobaoSquareFill,
        icons.TeamOutline,
        icons.TaobaoCircleFill,
        icons.ThunderboltTwoTone,
        icons.ToolFill,
        icons.ThunderboltFill,
        icons.ToTopOutline,
        icons.ToolOutline,
        icons.ToolTwoTone,
        icons.TrademarkCircleFill,
        icons.TrophyFill,
        icons.TrademarkCircleTwoTone,
        icons.TransactionOutline,
        icons.TrademarkCircleOutline,
        icons.TranslationOutline,
        icons.TwitterCircleFill,
        icons.TrophyOutline,
        icons.TrademarkOutline,
        icons.TrophyTwoTone,
        icons.TwitterSquareFill,
        icons.UnlockFill,
        icons.TwitterOutline,
        icons.UnderlineOutline,
        icons.UndoOutline,
        icons.UpCircleFill,
        icons.UngroupOutline,
        icons.UnlockTwoTone,
        icons.UnlockOutline,
        icons.UpOutline,
        icons.UsbFill,
        icons.UpCircleOutline,
        icons.UnorderedListOutline,
        icons.UpCircleTwoTone,
        icons.UpSquareFill,
        icons.UpSquareOutline,
        icons.UserAddOutline,
        icons.UsbTwoTone,
        icons.UsergroupDeleteOutline,
        icons.UpSquareTwoTone,
        icons.UserOutline,
        icons.UsbOutline,
        icons.UserDeleteOutline,
        icons.UserSwitchOutline,
        icons.VerticalLeftOutline,
        icons.VerticalAlignBottomOutline,
        icons.VerifiedOutline,
        icons.UsergroupAddOutline,
        icons.UploadOutline,
        icons.VerticalAlignMiddleOutline,
        icons.VerticalAlignTopOutline,
        icons.VerticalRightOutline,
        icons.VideoCameraOutline,
        icons.VideoCameraAddOutline,
        icons.VideoCameraTwoTone,
        icons.VideoCameraFill,
        icons.WalletOutline,
        icons.WalletFill,
        icons.WarningFill,
        icons.WarningOutline,
        icons.WechatOutline,
        icons.WalletTwoTone,
        icons.WeiboCircleFill,
        icons.WarningTwoTone,
        icons.WeiboSquareFill,
        icons.WeiboOutline,
        icons.WeiboSquareOutline,
        icons.WeiboCircleOutline,
        icons.WechatFill,
        icons.WhatsAppOutline,
        icons.WifiOutline,
        icons.WomanOutline,
        icons.YoutubeFill,
        icons.YahooOutline,
        icons.WindowsFill,
        icons.WindowsOutline,
        icons.YoutubeOutline,
        icons.YuqueOutline,
        icons.ZhihuCircleFill,
        icons.YuqueFill,
        icons.ZhihuOutline,
        icons.ZhihuSquareFill,
        icons.ZoomInOutline,
        icons.ZoomOutOutline,
        icons.YahooFill
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ICONS = ICONS;
    exports.YZ_SHARED_YELON_MODULES = YZ_SHARED_YELON_MODULES;
    exports.YZ_SHARED_ZORRO_MODULES = YZ_SHARED_ZORRO_MODULES;
    exports.YzSharedModule = YzSharedModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=shared.umd.js.map
