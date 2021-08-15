/**
 * @license ng-yunzai(devcui@outlook.com) v12.0.2
 * (c) 2020 devcui https://github.com/hbyunzai/yelon/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@yelon/util/format')) :
    typeof define === 'function' && define.amd ? define('@yelon/util/pipes/format', ['exports', '@angular/core', '@yelon/util/format'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.yelon = global.yelon || {}, global.yelon.util = global.yelon.util || {}, global.yelon.util.pipes = global.yelon.util.pipes || {}, global.yelon.util.pipes.format = {}), global.ng.core, global.yelon.util.format));
}(this, (function (exports, core, format) { 'use strict';

    var FormatMaskPipe = /** @class */ (function () {
        function FormatMaskPipe() {
        }
        /**
         * Format mask
         *
         * 格式化掩码
         * ```ts
         * formatMask('123', '(###)') => (123)
         * ```
         */
        FormatMaskPipe.prototype.transform = function (value, mask) {
            return format.formatMask(value, mask);
        };
        return FormatMaskPipe;
    }());
    FormatMaskPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'mask' },] }
    ];

    var PIPES = [FormatMaskPipe];
    var FormatPipeModule = /** @class */ (function () {
        function FormatPipeModule() {
        }
        return FormatPipeModule;
    }());
    FormatPipeModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: PIPES,
                    exports: PIPES
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FormatMaskPipe = FormatMaskPipe;
    exports.FormatPipeModule = FormatPipeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yelon-util-pipes-format.umd.js.map
