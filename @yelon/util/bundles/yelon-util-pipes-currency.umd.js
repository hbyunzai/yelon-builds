/**
 * @license ng-yunzai(devcui@outlook.com) v12.0.12
 * (c) 2020 devcui https://github.com/hbyunzai/yelon/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@yelon/util/format')) :
    typeof define === 'function' && define.amd ? define('@yelon/util/pipes/currency', ['exports', '@angular/core', '@yelon/util/format'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.yelon = global.yelon || {}, global.yelon.util = global.yelon.util || {}, global.yelon.util.pipes = global.yelon.util.pipes || {}, global.yelon.util.pipes.currency = {}), global.ng.core, global.yelon.util.format));
})(this, (function (exports, core, format) { 'use strict';

    var CurrencyMegaPipe = /** @class */ (function () {
        function CurrencyMegaPipe(srv, locale) {
            this.srv = srv;
            this.isCN = false;
            this.isCN = locale.startsWith('zh');
        }
        /**
         * Large number format filter
         *
         * 大数据格式化
         */
        CurrencyMegaPipe.prototype.transform = function (value, options) {
            var res = this.srv.mega(value, options);
            return res.value + (this.isCN ? res.unitI18n : res.unit);
        };
        return CurrencyMegaPipe;
    }());
    CurrencyMegaPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'mega' },] }
    ];
    CurrencyMegaPipe.ctorParameters = function () { return [
        { type: format.CurrencyService },
        { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] }
    ]; };

    var CurrencyPricePipe = /** @class */ (function () {
        function CurrencyPricePipe(srv) {
            this.srv = srv;
        }
        /**
         * Format a number with commas as thousands separators
         *
         * 格式化货币，用逗号将数字格式化为千位分隔符
         * ```ts
         * 10000 => `10,000`
         * 10000.567 => `10,000.57`
         * ```
         */
        CurrencyPricePipe.prototype.transform = function (value, options) {
            return this.srv.format(value, options);
        };
        return CurrencyPricePipe;
    }());
    CurrencyPricePipe.decorators = [
        { type: core.Pipe, args: [{ name: 'price' },] }
    ];
    CurrencyPricePipe.ctorParameters = function () { return [
        { type: format.CurrencyService }
    ]; };

    var CurrencyCNYPipe = /** @class */ (function () {
        function CurrencyCNYPipe(srv) {
            this.srv = srv;
        }
        /**
         * Converted into RMB notation.
         *
         * 转化成人民币表示法
         */
        CurrencyCNYPipe.prototype.transform = function (value, options) {
            return this.srv.cny(value, options);
        };
        return CurrencyCNYPipe;
    }());
    CurrencyCNYPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'cny' },] }
    ];
    CurrencyCNYPipe.ctorParameters = function () { return [
        { type: format.CurrencyService }
    ]; };

    var PIPES = [CurrencyMegaPipe, CurrencyPricePipe, CurrencyCNYPipe];
    var CurrencyPipeModule = /** @class */ (function () {
        function CurrencyPipeModule() {
        }
        return CurrencyPipeModule;
    }());
    CurrencyPipeModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: PIPES,
                    exports: PIPES
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CurrencyMegaPipe = CurrencyMegaPipe;
    exports.CurrencyPipeModule = CurrencyPipeModule;
    exports.CurrencyPricePipe = CurrencyPricePipe;
    exports["ɵa"] = CurrencyCNYPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=yelon-util-pipes-currency.umd.js.map
