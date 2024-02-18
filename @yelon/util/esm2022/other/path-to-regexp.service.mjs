/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class PathToRegexpService {
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
        // Push NzSafeAny remaining characters.
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: PathToRegexpService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: PathToRegexpService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: PathToRegexpService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC10by1yZWdleHAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3V0aWwvb3RoZXIvcGF0aC10by1yZWdleHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxRUFBcUU7QUFDckUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QjtRQUNBLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUV4QixnQkFBVyxHQUFHLElBQUksTUFBTSxDQUN0QixDQUFDLFNBQVMsRUFBRSxxRkFBcUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDNUcsR0FBRyxDQUNKLENBQUM7SUFOYSxDQUFDO0lBUWhCLEtBQUssQ0FBQyxHQUFjLEVBQUUsT0FBa0I7UUFDdEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRixNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDO1FBQzlELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLEdBQUcsQ0FBQztRQUVSLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxPQUFP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cUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDOzhHQXZSVSxtQkFBbUI7a0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LWZ1bmN0aW9uLXJldHVybi10eXBlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBhdGhUb1JlZ2V4cFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIERFRkFVTFRfREVMSU1JVEVSID0gJy8nO1xuXG4gIFBBVEhfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgICBbJyhcXFxcXFxcXC4pJywgJyg/OlxcXFw6KFxcXFx3KykoPzpcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKT98XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSkoWysqP10pPyddLmpvaW4oJ3wnKSxcbiAgICAnZydcbiAgKTtcblxuICBwYXJzZShzdHI6IE56U2FmZUFueSwgb3B0aW9uczogTnpTYWZlQW55KSB7XG4gICAgY29uc3QgdG9rZW5zID0gW107XG4gICAgbGV0IGtleSA9IDA7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIGNvbnN0IGRlZmF1bHREZWxpbWl0ZXIgPSAob3B0aW9ucyAmJiBvcHRpb25zLmRlbGltaXRlcikgfHwgdGhpcy5ERUZBVUxUX0RFTElNSVRFUjtcbiAgICBjb25zdCB3aGl0ZWxpc3QgPSAob3B0aW9ucyAmJiBvcHRpb25zLndoaXRlbGlzdCkgfHwgdW5kZWZpbmVkO1xuICAgIGxldCBwYXRoRXNjYXBlZCA9IGZhbHNlO1xuICAgIGxldCByZXM7XG5cbiAgICB3aGlsZSAoKHJlcyA9IHRoaXMuUEFUSF9SRUdFWFAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbSA9IHJlc1swXTtcbiAgICAgIGNvbnN0IGVzY2FwZWQgPSByZXNbMV07XG4gICAgICBjb25zdCBvZmZzZXQgPSByZXMuaW5kZXg7XG4gICAgICBwYXRoICs9IHN0ci5zbGljZShpbmRleCwgb2Zmc2V0KTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbS5sZW5ndGg7XG5cbiAgICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgICAgcGF0aCArPSBlc2NhcGVkWzFdO1xuICAgICAgICBwYXRoRXNjYXBlZCA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHJldiA9ICcnO1xuICAgICAgY29uc3QgbmFtZSA9IHJlc1syXTtcbiAgICAgIGNvbnN0IGNhcHR1cmUgPSByZXNbM107XG4gICAgICBjb25zdCBncm91cCA9IHJlc1s0XTtcbiAgICAgIGNvbnN0IG1vZGlmaWVyID0gcmVzWzVdO1xuXG4gICAgICBpZiAoIXBhdGhFc2NhcGVkICYmIHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGsgPSBwYXRoLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IGMgPSBwYXRoW2tdO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gd2hpdGVsaXN0ID8gd2hpdGVsaXN0LmluZGV4T2YoYykgPiAtMSA6IHRydWU7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICBwcmV2ID0gYztcbiAgICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgwLCBrKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQdXNoIHRoZSBjdXJyZW50IHBhdGggb250byB0aGUgdG9rZW5zLlxuICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2gocGF0aCk7XG4gICAgICAgIHBhdGggPSAnJztcbiAgICAgICAgcGF0aEVzY2FwZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVwZWF0ID0gbW9kaWZpZXIgPT09ICcrJyB8fCBtb2RpZmllciA9PT0gJyonO1xuICAgICAgY29uc3Qgb3B0aW9uYWwgPSBtb2RpZmllciA9PT0gJz8nIHx8IG1vZGlmaWVyID09PSAnKic7XG4gICAgICBjb25zdCBwYXR0ZXJuID0gY2FwdHVyZSB8fCBncm91cDtcbiAgICAgIGNvbnN0IGRlbGltaXRlciA9IHByZXYgfHwgZGVmYXVsdERlbGltaXRlcjtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgICBwcmVmaXg6IHByZXYsXG4gICAgICAgIGRlbGltaXRlcjogZGVsaW1pdGVyLFxuICAgICAgICBvcHRpb25hbDogb3B0aW9uYWwsXG4gICAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgICBwYXR0ZXJuOiBwYXR0ZXJuXG4gICAgICAgICAgPyB0aGlzLmVzY2FwZUdyb3VwKHBhdHRlcm4pXG4gICAgICAgICAgOiBgW14ke3RoaXMuZXNjYXBlU3RyaW5nKGRlbGltaXRlciA9PT0gZGVmYXVsdERlbGltaXRlciA/IGRlbGltaXRlciA6IGRlbGltaXRlciArIGRlZmF1bHREZWxpbWl0ZXIpfV0rP2BcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFB1c2ggTnpTYWZlQW55IHJlbWFpbmluZyBjaGFyYWN0ZXJzLlxuICAgIGlmIChwYXRoIHx8IGluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgdG9rZW5zLnB1c2gocGF0aCArIHN0ci5zdWJzdHIoaW5kZXgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIGNvbXBpbGUoc3RyOiBOelNhZmVBbnksIG9wdGlvbnM6IE56U2FmZUFueSkge1xuICAgIHJldHVybiB0aGlzLnRva2Vuc1RvRnVuY3Rpb24odGhpcy5wYXJzZShzdHIsIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgfVxuXG4gIHRva2Vuc1RvRnVuY3Rpb24odG9rZW5zOiBOelNhZmVBbnksIG9wdGlvbnM6IE56U2FmZUFueSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHR5cGVvZiB0b2tlbnNbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKGBeKD86JHt0b2tlbnNbaV0ucGF0dGVybn0pJGAsIHRoaXMuZmxhZ3Mob3B0aW9ucykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YTogTnpTYWZlQW55LCBvcHRpb25zOiBOelNhZmVBbnkpIHtcbiAgICAgIGxldCBwYXRoID0gJyc7XG4gICAgICBjb25zdCBlbmNvZGUgPSAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSkgfHwgZW5jb2RlVVJJQ29tcG9uZW50O1xuICAgICAgY29uc3QgdmFsaWRhdGUgPSBvcHRpb25zID8gb3B0aW9ucy52YWxpZGF0ZSAhPT0gZmFsc2UgOiB0cnVlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHBhdGggKz0gdG9rZW47XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGEgPyBkYXRhW3Rva2VuLm5hbWVdIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgc2VnbWVudDtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAoIXRva2VuLnJlcGVhdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXCIke3Rva2VuLm5hbWV9XCIgdG8gbm90IHJlcGVhdCwgYnV0IGdvdCBhcnJheWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXCIke3Rva2VuLm5hbWV9XCIgdG8gbm90IGJlIGVtcHR5YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSwgdG9rZW4pO1xuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGUgJiYgIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhbGwgXCIke3Rva2VuLm5hbWV9XCIgdG8gbWF0Y2ggXCIke3Rva2VuLnBhdHRlcm59XCJgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIHNlZ21lbnQgPSBlbmNvZGUoU3RyaW5nKHZhbHVlKSwgdG9rZW4pO1xuXG4gICAgICAgICAgaWYgKHZhbGlkYXRlICYmICFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFwiJHt0b2tlbi5uYW1lfVwiIHRvIG1hdGNoIFwiJHt0b2tlbi5wYXR0ZXJufVwiLCBidXQgZ290IFwiJHtzZWdtZW50fVwiYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXggKyBzZWdtZW50O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcIiR7dG9rZW4ubmFtZX1cIiB0byBiZSAke3Rva2VuLnJlcGVhdCA/ICdhbiBhcnJheScgOiAnYSBzdHJpbmcnfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xuICB9XG5cbiAgZXNjYXBlU3RyaW5nKHN0cjogTnpTYWZlQW55KSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgJ1xcXFwkMScpO1xuICB9XG5cbiAgZXNjYXBlR3JvdXAoZ3JvdXA6IE56U2FmZUFueSkge1xuICAgIHJldHVybiBncm91cC5yZXBsYWNlKC8oWz0hOiQvKCldKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICBmbGFncyhvcHRpb25zOiBOelNhZmVBbnkpIHtcbiAgICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLnNlbnNpdGl2ZSA/ICcnIDogJ2knO1xuICB9XG5cbiAgcmVnZXhwVG9SZWdleHAocGF0aDogTnpTYWZlQW55LCBrZXlzOiBOelNhZmVBbnkpIHtcbiAgICBpZiAoIWtleXMpIHtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpO1xuXG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBpLFxuICAgICAgICAgIHByZWZpeDogbnVsbCxcbiAgICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgICAgcGF0dGVybjogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGFycmF5VG9SZWdleHAocGF0aDogTnpTYWZlQW55LCBrZXlzOiBOelNhZmVBbnksIG9wdGlvbnM6IE56U2FmZUFueSk6IFJlZ0V4cCB7XG4gICAgY29uc3QgcGFydHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgcGFydHMucHVzaCh0aGlzLnBhdGhUb1JlZ2V4cChwYXRoW2ldLCBrZXlzLCBvcHRpb25zKS5zb3VyY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVnRXhwKGAoPzoke3BhcnRzLmpvaW4oJ3wnKX0pYCwgdGhpcy5mbGFncyhvcHRpb25zKSk7XG4gIH1cblxuICBzdHJpbmdUb1JlZ2V4cChwYXRoOiBOelNhZmVBbnksIGtleXM6IE56U2FmZUFueSwgb3B0aW9uczogTnpTYWZlQW55KSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zVG9SZWdFeHAodGhpcy5wYXJzZShwYXRoLCBvcHRpb25zKSwga2V5cywgb3B0aW9ucyk7XG4gIH1cblxuICB0b2tlbnNUb1JlZ0V4cCh0b2tlbnM6IE56U2FmZUFueSwga2V5czogTnpTYWZlQW55LCBvcHRpb25zOiBOelNhZmVBbnkpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGNvbnN0IHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0O1xuICAgIGNvbnN0IHN0YXJ0ID0gb3B0aW9ucy5zdGFydCAhPT0gZmFsc2U7XG4gICAgY29uc3QgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlO1xuICAgIGNvbnN0IGRlbGltaXRlciA9IG9wdGlvbnMuZGVsaW1pdGVyIHx8IHRoaXMuREVGQVVMVF9ERUxJTUlURVI7XG4gICAgY29uc3QgZW5kc1dpdGggPSBbXVxuICAgICAgLmNvbmNhdChvcHRpb25zLmVuZHNXaXRoIHx8IFtdKVxuICAgICAgLm1hcCh0aGlzLmVzY2FwZVN0cmluZylcbiAgICAgIC5jb25jYXQoJyQnKVxuICAgICAgLmpvaW4oJ3wnKTtcbiAgICBsZXQgcm91dGUgPSBzdGFydCA/ICdeJyA6ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICByb3V0ZSArPSB0aGlzLmVzY2FwZVN0cmluZyh0b2tlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjYXB0dXJlID0gdG9rZW4ucmVwZWF0XG4gICAgICAgICAgPyBgKD86JHt0b2tlbi5wYXR0ZXJufSkoPzoke3RoaXMuZXNjYXBlU3RyaW5nKHRva2VuLmRlbGltaXRlcil9KD86JHt0b2tlbi5wYXR0ZXJufSkpKmBcbiAgICAgICAgICA6IHRva2VuLnBhdHRlcm47XG5cbiAgICAgICAgaWYgKGtleXMpIHtcbiAgICAgICAgICBrZXlzLnB1c2godG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgaWYgKCF0b2tlbi5wcmVmaXgpIHtcbiAgICAgICAgICAgIHJvdXRlICs9IGAoJHtjYXB0dXJlfSk/YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm91dGUgKz0gYCg/OiR7dGhpcy5lc2NhcGVTdHJpbmcodG9rZW4ucHJlZml4KX0oJHtjYXB0dXJlfSkpP2A7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdXRlICs9IGAke3RoaXMuZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeCl9KCR7Y2FwdHVyZX0pYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbmQpIHtcbiAgICAgIGlmICghc3RyaWN0KSB7XG4gICAgICAgIHJvdXRlICs9IGAoPzoke3RoaXMuZXNjYXBlU3RyaW5nKGRlbGltaXRlcil9KT9gO1xuICAgICAgfVxuXG4gICAgICByb3V0ZSArPSBlbmRzV2l0aCA9PT0gJyQnID8gJyQnIDogYCg/PSR7ZW5kc1dpdGh9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVuZFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGlzRW5kRGVsaW1pdGVkID1cbiAgICAgICAgdHlwZW9mIGVuZFRva2VuID09PSAnc3RyaW5nJyA/IGVuZFRva2VuW2VuZFRva2VuLmxlbmd0aCAtIDFdID09PSBkZWxpbWl0ZXIgOiBlbmRUb2tlbiA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoIXN0cmljdCkge1xuICAgICAgICByb3V0ZSArPSBgKD86JHt0aGlzLmVzY2FwZVN0cmluZyhkZWxpbWl0ZXIpfSg/PSR7ZW5kc1dpdGh9KSk/YDtcbiAgICAgIH1cbiAgICAgIGlmICghaXNFbmREZWxpbWl0ZWQpIHtcbiAgICAgICAgcm91dGUgKz0gYCg/PSR7dGhpcy5lc2NhcGVTdHJpbmcoZGVsaW1pdGVyKX18JHtlbmRzV2l0aH0pYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyb3V0ZSwgdGhpcy5mbGFncyhvcHRpb25zKSk7XG4gIH1cblxuICBwYXRoVG9SZWdleHAocGF0aDogTnpTYWZlQW55LCBrZXlzOiBOelNhZmVBbnksIG9wdGlvbnM6IE56U2FmZUFueSkge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWdleHBUb1JlZ2V4cChwYXRoLCBrZXlzKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXJyYXlUb1JlZ2V4cCgvKiogQHR5cGUgeyFBcnJheX0gKi8gcGF0aCwga2V5cywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIHBhdGgsIGtleXMsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=