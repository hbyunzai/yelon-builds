import extend from 'extend';
import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, share, filter, isObservable } from 'rxjs';

/**
 * Gets the value at `path` of `object`, like `_.get` in lodash.
 *
 * 类似 `_.get`，根据 `path` 获取安全值
 */
function deepGet(obj, path, defaultValue) {
    if (!obj || path == null || path.length === 0)
        return defaultValue;
    if (!Array.isArray(path)) {
        path = ~path.indexOf('.') ? path.split('.') : [path];
    }
    if (path.length === 1) {
        const checkObj = obj[path[0]];
        return typeof checkObj === 'undefined' ? defaultValue : checkObj;
    }
    const res = path.reduce((o, k) => (o || {})[k], obj);
    return typeof res === 'undefined' ? defaultValue : res;
}
/**
 * Base on [extend](https://github.com/justmoon/node-extend) deep copy.
 *
 * 基于 [extend](https://github.com/justmoon/node-extend) 的深度拷贝
 *
 * NOTE: Don't a lot of recursion, maybe performance issues
 */
function deepCopy(obj) {
    const result = extend(true, {}, { _: obj });
    return result._;
}
/**
 * Deep merge object.
 *
 * 深度合并对象
 *
 * @param original 原始对象
 * @param arrayProcessMethod 数组处理方式
 *  - `true` 表示替换新值，不管新值为哪种类型
 *  - `false` 表示会合并整个数组（将旧数据与新数据合并成新数组）
 * @param objects 要合并的对象
 */
function deepMergeKey(original, arrayProcessMethod, ...objects) {
    if (Array.isArray(original) || typeof original !== 'object')
        return original;
    const isObject = (v) => typeof v === 'object';
    const merge = (target, obj) => {
        Object.keys(obj)
            .filter(key => key !== '__proto__' && Object.prototype.hasOwnProperty.call(obj, key))
            .forEach(key => {
            const fromValue = obj[key];
            const toValue = target[key];
            if (Array.isArray(toValue)) {
                target[key] = arrayProcessMethod ? fromValue : [...toValue, ...fromValue];
            }
            else if (typeof fromValue === 'function') {
                target[key] = fromValue;
            }
            else if (fromValue != null && isObject(fromValue) && toValue != null && isObject(toValue)) {
                target[key] = merge(toValue, fromValue);
            }
            else {
                target[key] = deepCopy(fromValue);
            }
        });
        return target;
    };
    objects.filter(v => v != null && isObject(v)).forEach(v => merge(original, v));
    return original;
}
/**
 * Deep merge object.
 *
 * 深度合并对象
 */
function deepMerge(original, ...objects) {
    return deepMergeKey(original, false, ...objects);
}

const record = {};
const PREFIX = '[@YELON]:';
function notRecorded(...args) {
    const asRecord = args.reduce((acc, c) => acc + c.toString(), '');
    if (record[asRecord]) {
        return false;
    }
    else {
        record[asRecord] = true;
        return true;
    }
}
function consoleCommonBehavior(consoleFunc, ...args) {
    if ((typeof ngDevMode === 'undefined' || ngDevMode) && notRecorded(...args)) {
        consoleFunc(...args);
    }
}
// Warning should only be printed in dev mode and only once.
const warn = (...args) => consoleCommonBehavior((...arg) => console.warn(PREFIX, ...arg), ...args);
const warnDeprecation = (...args) => {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        return () => { };
    }
    const stack = new Error().stack;
    return consoleCommonBehavior((...arg) => console.warn(PREFIX, 'deprecated:', ...arg, stack), ...args);
};
// Log should only be printed in dev mode.
const log = (...args) => {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.log(PREFIX, ...args);
    }
};

/**
 * `LazyService` delay loading JS or CSS files.
 *
 * 延迟加载资源（js 或 css）服务
 */
class LazyService {
    doc = inject(DOCUMENT);
    list = {};
    cached = {};
    _notify = new BehaviorSubject([]);
    get change() {
        return this._notify.asObservable().pipe(share(), filter(ls => ls.length !== 0));
    }
    clear() {
        this.list = {};
        this.cached = {};
    }
    attachAttributes(el, attributes) {
        if (attributes == null)
            return;
        Object.entries(attributes).forEach(([key, value]) => {
            el.setAttribute(key, value);
        });
    }
    /**
     * Load script or style files
     */
    load(paths) {
        if (!Array.isArray(paths)) {
            paths = [paths];
        }
        const promises = [];
        paths
            .map(v => (typeof v !== 'object' ? { path: v } : v))
            .forEach(item => {
            if (item.path.endsWith('.js')) {
                promises.push(this.loadScript(item.path, item.options));
            }
            else {
                promises.push(this.loadStyle(item.path, item.options));
            }
        });
        return Promise.all(promises).then(res => {
            this._notify.next(res);
            return Promise.resolve(res);
        });
    }
    loadScript(path, innerContent, attributes) {
        const options = typeof innerContent === 'object'
            ? innerContent
            : {
                innerContent,
                attributes
            };
        return new Promise(resolve => {
            if (this.list[path] === true) {
                resolve({ ...this.cached[path], status: 'loading' });
                return;
            }
            this.list[path] = true;
            const onSuccess = (item) => {
                this.cached[path] = item;
                resolve(item);
                this._notify.next([item]);
            };
            const node = this.doc.createElement('script');
            node.type = 'text/javascript';
            node.src = path;
            this.attachAttributes(node, options.attributes);
            if (options.innerContent) {
                node.innerHTML = options.innerContent;
            }
            node.onload = () => onSuccess({
                path,
                status: 'ok'
            });
            node.onerror = error => onSuccess({
                path,
                status: 'error',
                error
            });
            this.doc.getElementsByTagName('head')[0].appendChild(node);
        });
    }
    loadStyle(path, rel, innerContent, attributes) {
        const options = typeof rel === 'object'
            ? rel
            : {
                rel,
                innerContent,
                attributes
            };
        return new Promise(resolve => {
            if (this.list[path] === true) {
                resolve(this.cached[path]);
                return;
            }
            this.list[path] = true;
            const node = this.doc.createElement('link');
            node.rel = options.rel ?? 'stylesheet';
            node.type = 'text/css';
            node.href = path;
            this.attachAttributes(node, options.attributes);
            if (options.innerContent) {
                node.innerHTML = options.innerContent;
            }
            this.doc.getElementsByTagName('head')[0].appendChild(node);
            const item = {
                path,
                status: 'ok'
            };
            this.cached[path] = item;
            resolve(item);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: LazyService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: LazyService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: LazyService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

function throwError(msg, actual, expected, comparison) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        throw new Error(`ASSERTION ERROR: ${msg}${comparison == null ? '' : ` [Expected=> ${expected} ${comparison} ${actual} <=Actual]`}`);
    }
}
/**
 * Assert whether the expression and throw an error into console in dev mode
 *
 * 断言表达式是否符合预期，并在开发模式下会在控制台抛出一个错误
 */
function assert(expression, msg) {
    if (!expression) {
        throwError(msg);
    }
}
/**
 * Assert whether empty (`null` or `undefined`)
 *
 * 断言是否空值（`null` 或 `undefined`）
 */
function assertEmpty(actual, msg) {
    if (actual == null) {
        throwError(msg, typeof actual, 'NULL', '==');
    }
}
/**
 * Assert whether `number` type
 *
 * 断言是否 `number` 类型
 */
function assertNumber(actual, msg) {
    if (!(typeof actual === 'number')) {
        throwError(msg, typeof actual, 'number', '===');
    }
}
/**
 * Assert whether `string` type
 *
 * 断言是否 `string` 类型
 */
function assertString(actual, msg) {
    if (!(typeof actual === 'string')) {
        throwError(msg, actual === null ? 'null' : typeof actual, 'string', '===');
    }
}
/**
 * Assert whether `array` type
 *
 * 断言是否 `array` 类型
 */
function assertArray(actual, msg) {
    if (!Array.isArray(actual)) {
        throwError(msg, actual === null ? 'null' : typeof actual, 'array', '===');
    }
}
/**
 * Assert whether `Observable` type
 *
 * 断言是否 `Observable` 类型
 */
function assertObservable(obj, msg) {
    if (!isObservable(obj)) {
        throwError(msg, obj === null ? 'null' : typeof obj, 'Observable', '===');
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
class PathToRegexpService {
    constructor() { }
    DEFAULT_DELIMITER = '/';
    PATH_REGEXP = new RegExp(['(\\\\.)', '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');
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
        for (const item of path) {
            parts.push(this.pathToRegexp(item, keys, options).source);
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
        for (let token of tokens) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: PathToRegexpService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: PathToRegexpService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.6", ngImport: i0, type: PathToRegexpService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

const resizeWindow = () => {
    window.dispatchEvent(new Event('resize'));
};

function setFavicon(path) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = path;
    document.getElementsByTagName('head')[0].appendChild(link);
}
function hasFavicon(url) {
    return new Promise(resolve => {
        let xmlHttp;
        if (window['XMLHttpRequest']) {
            xmlHttp = new XMLHttpRequest();
        }
        if (xmlHttp) {
            xmlHttp.open('Get', url, false);
            xmlHttp.send();
            if (xmlHttp.status == 404) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        }
        else {
            resolve(false);
        }
    });
}

/**
 * Generated bundle index. Do not edit.
 */

export { LazyService, PREFIX, PathToRegexpService, assert, assertArray, assertEmpty, assertNumber, assertObservable, assertString, deepCopy, deepGet, deepMerge, deepMergeKey, hasFavicon, log, resizeWindow, setFavicon, warn, warnDeprecation };
//# sourceMappingURL=other.mjs.map
