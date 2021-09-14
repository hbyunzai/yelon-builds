/**
 * @license ng-yunzai(devcui@outlook.com) v12.0.8
 * (c) 2020 devcui https://github.com/hbyunzai/yelon/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@yelon/util/array'), require('@yelon/util/browser'), require('@yelon/util/config'), require('@yelon/util/date-time'), require('@yelon/util/form'), require('@yelon/util/format'), require('@yelon/util/math'), require('@yelon/util/decorator'), require('@yelon/util/other'), require('@yelon/util/pipes'), require('@yelon/util/token')) :
	typeof define === 'function' && define.amd ? define('@yelon/util', ['exports', '@yelon/util/array', '@yelon/util/browser', '@yelon/util/config', '@yelon/util/date-time', '@yelon/util/form', '@yelon/util/format', '@yelon/util/math', '@yelon/util/decorator', '@yelon/util/other', '@yelon/util/pipes', '@yelon/util/token'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.yelon = global.yelon || {}, global.yelon.util = {}), global.yelon.util.array, global.yelon.util.browser, global.yelon.util.config, global.yelon.util['date-time'], global.yelon.util.form, global.yelon.util.format, global.yelon.util.math, global.yelon.util.decorator, global.yelon.util.other, global.yelon.util.pipes, global.yelon.util.token));
}(this, (function (exports, array, browser, config, dateTime, form, format, math, decorator, other, pipes, token) { 'use strict';

	/**
	 * Generated bundle index. Do not edit.
	 */

	Object.keys(array).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return array[k];
			}
		});
	});
	Object.keys(browser).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return browser[k];
			}
		});
	});
	Object.keys(config).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return config[k];
			}
		});
	});
	Object.keys(dateTime).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return dateTime[k];
			}
		});
	});
	Object.keys(form).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return form[k];
			}
		});
	});
	Object.keys(format).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return format[k];
			}
		});
	});
	Object.keys(math).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return math[k];
			}
		});
	});
	Object.keys(decorator).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return decorator[k];
			}
		});
	});
	Object.keys(other).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return other[k];
			}
		});
	});
	Object.keys(pipes).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return pipes[k];
			}
		});
	});
	Object.keys(token).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return token[k];
			}
		});
	});

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yelon-util.umd.js.map
