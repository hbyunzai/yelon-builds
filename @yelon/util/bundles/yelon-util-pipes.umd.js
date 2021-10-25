/**
 * @license ng-yunzai(devcui@outlook.com) v12.0.11
 * (c) 2020 devcui https://github.com/hbyunzai/yelon/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@yelon/util/pipes/currency'), require('@yelon/util/pipes/format'), require('@yelon/util/pipes/filter')) :
	typeof define === 'function' && define.amd ? define('@yelon/util/pipes', ['exports', '@yelon/util/pipes/currency', '@yelon/util/pipes/format', '@yelon/util/pipes/filter'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.yelon = global.yelon || {}, global.yelon.util = global.yelon.util || {}, global.yelon.util.pipes = {}), global.yelon.util.pipes.currency, global.yelon.util.pipes.format, global.yelon.util.pipes.filter));
})(this, (function (exports, currency, format, filter) { 'use strict';

	/**
	 * Generated bundle index. Do not edit.
	 */

	Object.keys(currency).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return currency[k]; }
		});
	});
	Object.keys(format).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return format[k]; }
		});
	});
	Object.keys(filter).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return filter[k]; }
		});
	});

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=yelon-util-pipes.umd.js.map
