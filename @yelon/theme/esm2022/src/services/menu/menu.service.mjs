import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';
import { ACLService } from '@yelon/acl';
import { YUNZAI_I18N_TOKEN } from '../i18n/i18n';
import * as i0 from "@angular/core";
/**
 * 菜单服务
 */
export class MenuService {
    constructor() {
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN);
        this.aclService = inject(ACLService);
        this._change$ = new BehaviorSubject([]);
        this.data = [];
        /**
         * 是否完全受控菜单打开状态，默认：`false`
         */
        this.openStrictly = false;
        this.$routerLink = new BehaviorSubject('');
        this.i18n$ = this.i18nSrv.change.subscribe(() => this.resume());
    }
    get change() {
        return this._change$.pipe(share());
    }
    get menus() {
        return this.data;
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
        item.text = item.i18n ? this.i18nSrv.fanyi(item.i18n) : item.text;
        // group
        item.group = item.group !== false;
        // hidden
        item._hidden = typeof item.hide === 'undefined' ? false : item.hide;
        // disabled
        item.disabled = typeof item.disabled === 'undefined' ? false : item.disabled;
        // acl
        item._aclResult = item.acl ? this.aclService.can(item.acl) : true;
        item.open = item.open != null ? item.open : false;
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
     * 加载快捷菜单，加载位置规则如下：
     * 1、统一在下标0的节点下（即【主导航】节点下方）
     *      1、若 children 存在 【shortcutRoot: true】则最优先【推荐】这种方式
     *      2、否则查找带有【dashboard】字样链接，若存在则在此菜单的下方创建快捷入口
     *      3、否则放在0节点位置
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
                text: '快捷菜单',
                i18n: 'shortcut',
                icon: 'icon-rocket',
                children: []
            };
            this.data[0].children.splice(pos, 0, shortcutMenu);
        }
        let _data = this.data[0].children[pos];
        if (_data.i18n)
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
    /**
     * 清空菜单
     */
    clear() {
        this.data = [];
        this._change$.next(this.data);
    }
    /**
     * Use `url` or `key` to find menus
     *
     * 利用 `url` 或 `key` 查找菜单
     */
    find(options) {
        const opt = { recursive: false, ignoreHide: false, ...options };
        if (opt.key != null) {
            return this.getItem(opt.key);
        }
        let url = opt.url;
        let item = null;
        while (!item && url) {
            this.visit(opt.data ?? this.data, i => {
                if (opt.ignoreHide && i.hide) {
                    return;
                }
                if (opt.cb) {
                    const res = opt.cb(i);
                    if (!item && typeof res === 'boolean' && res) {
                        item = i;
                    }
                }
                if (i.link != null && i.link === url) {
                    item = i;
                }
            });
            if (!opt.recursive)
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
     * 根据url获取菜单列表
     * - 若 `recursive: true` 则会自动向上递归查找
     *  - 菜单数据源包含 `/ware`，则 `/ware/1` 也视为 `/ware` 项
     */
    getPathByUrl(url, recursive = false) {
        const ret = [];
        let item = this.find({ url, recursive });
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
    setItem(key, value, options) {
        const item = typeof key === 'string' ? this.getItem(key) : key;
        if (item == null)
            return;
        Object.keys(value).forEach(k => {
            item[k] = value[k];
        });
        this.fixItem(item);
        if (options?.emit !== false)
            this._change$.next(this.data);
    }
    /**
     * Open menu based on `key` or menu object
     */
    open(keyOrItem, options) {
        let item = typeof keyOrItem === 'string' ? this.find({ key: keyOrItem }) : keyOrItem;
        if (item == null)
            return;
        this.visit(this.menus, (i) => {
            i._selected = false;
            if (!this.openStrictly)
                i.open = false;
        });
        do {
            item._selected = true;
            item.open = true;
            item = item._parent;
        } while (item);
        if (options?.emit !== false)
            this._change$.next(this.data);
    }
    openAll(status) {
        this.toggleOpen(null, { allStatus: status });
    }
    toggleOpen(keyOrItem, options) {
        let item = typeof keyOrItem === 'string' ? this.find({ key: keyOrItem }) : keyOrItem;
        if (item == null) {
            this.visit(this.menus, (i) => {
                i._selected = false;
                i.open = options?.allStatus === true;
            });
        }
        else {
            if (!this.openStrictly) {
                this.visit(this.menus, (i) => {
                    if (i !== item)
                        i.open = false;
                });
                let pItem = item._parent;
                while (pItem) {
                    pItem.open = true;
                    pItem = pItem._parent;
                }
            }
            item.open = !item.open;
        }
        if (options?.emit !== false)
            this._change$.next(this.data);
    }
    ngOnDestroy() {
        this._change$.unsubscribe();
        this.i18n$?.unsubscribe();
    }
    setRouterLink(url) {
        this.$routerLink.next(url);
    }
    getRouterLink() {
        return this.$routerLink.asObservable();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: MenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: MenuService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: MenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3NlcnZpY2VzL21lbnUvbWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBR3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFHakQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sV0FBVztJQWF0QjtRQVppQixZQUFPLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEMsZUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxhQUFRLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDMUI7O1dBRUc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUViLGdCQUFXLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRzdFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBSUQsS0FB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bSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgc2hhcmUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQUNMU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9hY2wnO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBZVU5aQUlfSTE4Tl9UT0tFTiB9IGZyb20gJy4uL2kxOG4vaTE4bic7XG5pbXBvcnQgeyBNZW51LCBNZW51SWNvbiwgTWVudUlubmVyIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG4vKipcbiAqIOiPnOWNleacjeWKoVxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBpMThuU3J2ID0gaW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOKTtcbiAgcHJpdmF0ZSByZWFkb25seSBhY2xTZXJ2aWNlID0gaW5qZWN0KEFDTFNlcnZpY2UpO1xuICBwcml2YXRlIF9jaGFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8TWVudVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVudVtdPihbXSk7XG4gIHByaXZhdGUgaTE4biQ/OiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZGF0YTogTWVudVtdID0gW107XG4gIC8qKlxuICAgKiDmmK/lkKblrozlhajlj5fmjqfoj5zljZXmiZPlvIDnirbmgIHvvIzpu5jorqTvvJpgZmFsc2VgXG4gICAqL1xuICBvcGVuU3RyaWN0bHkgPSBmYWxzZTtcblxuICBwcml2YXRlICRyb3V0ZXJMaW5rOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pMThuJCA9IHRoaXMuaTE4blNydi5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVzdW1lKCkpO1xuICB9XG5cbiAgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPE1lbnVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UkLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBnZXQgbWVudXMoKTogTWVudVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbiAgdmlzaXQ8VCBleHRlbmRzIE1lbnUgPSBNZW51PihkYXRhOiBUW10sIGNhbGxiYWNrOiAoaXRlbTogVCwgcGFyZW50TWVudW06IFQgfCBudWxsLCBkZXB0aD86IG51bWJlcikgPT4gdm9pZCk6IHZvaWQ7XG4gIHZpc2l0KGRhdGE6IE1lbnVbXSwgY2FsbGJhY2s6IChpdGVtOiBNZW51LCBwYXJlbnRNZW51bTogTWVudSB8IG51bGwsIGRlcHRoPzogbnVtYmVyKSA9PiB2b2lkKTogdm9pZDtcbiAgdmlzaXQoZGF0YTogTWVudVtdLCBjYWxsYmFjazogKGl0ZW06IE1lbnUsIHBhcmVudE1lbnVtOiBNZW51IHwgbnVsbCwgZGVwdGg/OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBjb25zdCBpbkZuID0gKGxpc3Q6IE1lbnVbXSwgcGFyZW50TWVudTogTWVudSB8IG51bGwsIGRlcHRoOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaXN0KSB7XG4gICAgICAgIGNhbGxiYWNrKGl0ZW0sIHBhcmVudE1lbnUsIGRlcHRoKTtcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaW5GbihpdGVtLmNoaWxkcmVuLCBpdGVtLCBkZXB0aCArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpbkZuKGRhdGEsIG51bGwsIDApO1xuICB9XG5cbiAgYWRkKGl0ZW1zOiBNZW51W10pOiB2b2lkIHtcbiAgICB0aGlzLmRhdGEgPSBpdGVtcztcbiAgICB0aGlzLnJlc3VtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaXhJdGVtKGl0ZW06IE1lbnVJbm5lcik6IHZvaWQge1xuICAgIGl0ZW0uX2FjbFJlc3VsdCA9IHRydWU7XG5cbiAgICBpZiAoIWl0ZW0ubGluaykgaXRlbS5saW5rID0gJyc7XG4gICAgaWYgKCFpdGVtLmV4dGVybmFsTGluaykgaXRlbS5leHRlcm5hbExpbmsgPSAnJztcblxuICAgIC8vIGJhZGdlXG4gICAgaWYgKGl0ZW0uYmFkZ2UpIHtcbiAgICAgIGlmIChpdGVtLmJhZGdlRG90ICE9PSB0cnVlKSB7XG4gICAgICAgIGl0ZW0uYmFkZ2VEb3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbS5iYWRnZVN0YXR1cykge1xuICAgICAgICBpdGVtLmJhZGdlU3RhdHVzID0gJ2Vycm9yJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikpIHtcbiAgICAgIGl0ZW0uY2hpbGRyZW4gPSBbXTtcbiAgICB9XG5cbiAgICAvLyBpY29uXG4gICAgaWYgKHR5cGVvZiBpdGVtLmljb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgdHlwZSA9ICdjbGFzcyc7XG4gICAgICBsZXQgdmFsdWUgPSBpdGVtLmljb247XG4gICAgICAvLyBjb21wYXRpYmxlIGBhbnRpY29uIGFudGljb24tdXNlcmBcbiAgICAgIGlmICh+aXRlbS5pY29uLmluZGV4T2YoYGFudGljb24tYCkpIHtcbiAgICAgICAgdHlwZSA9ICdpY29uJztcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnLScpLnNsaWNlKDEpLmpvaW4oJy0nKTtcbiAgICAgIH0gZWxzZSBpZiAoL15odHRwcz86XFwvXFwvLy50ZXN0KGl0ZW0uaWNvbikpIHtcbiAgICAgICAgdHlwZSA9ICdpbWcnO1xuICAgICAgfVxuICAgICAgaXRlbS5pY29uID0geyB0eXBlLCB2YWx1ZSB9IGFzIE56U2FmZUFueTtcbiAgICB9XG4gICAgaWYgKGl0ZW0uaWNvbiAhPSBudWxsKSB7XG4gICAgICBpdGVtLmljb24gPSB7IHRoZW1lOiAnb3V0bGluZScsIHNwaW46IGZhbHNlLCAuLi4oaXRlbS5pY29uIGFzIE1lbnVJY29uKSB9O1xuICAgIH1cblxuICAgIGl0ZW0udGV4dCA9IGl0ZW0uaTE4biA/IHRoaXMuaTE4blNydi5mYW55aShpdGVtLmkxOG4pIDogaXRlbS50ZXh0O1xuXG4gICAgLy8gZ3JvdXBcbiAgICBpdGVtLmdyb3VwID0gaXRlbS5ncm91cCAhPT0gZmFsc2U7XG5cbiAgICAvLyBoaWRkZW5cbiAgICBpdGVtLl9oaWRkZW4gPSB0eXBlb2YgaXRlbS5oaWRlID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogaXRlbS5oaWRlO1xuXG4gICAgLy8gZGlzYWJsZWRcbiAgICBpdGVtLmRpc2FibGVkID0gdHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICd1bmRlZmluZWQnID8gZmFsc2UgOiBpdGVtLmRpc2FibGVkO1xuXG4gICAgLy8gYWNsXG4gICAgaXRlbS5fYWNsUmVzdWx0ID0gaXRlbS5hY2wgPyB0aGlzLmFjbFNlcnZpY2UuY2FuKGl0ZW0uYWNsKSA6IHRydWU7XG5cbiAgICBpdGVtLm9wZW4gPSBpdGVtLm9wZW4gIT0gbnVsbCA/IGl0ZW0ub3BlbiA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOmHjee9ruiPnOWNle+8jOWPr+iDvUkxOE7jgIHnlKjmiLfmnYPpmZDlj5jliqjml7bpnIDopoHosIPnlKjliLfmlrBcbiAgICovXG4gIHJlc3VtZTxUIGV4dGVuZHMgTWVudSA9IE1lbnU+KGNhbGxiYWNrPzogKGl0ZW06IFQsIHBhcmVudE1lbnVtOiBUIHwgbnVsbCwgZGVwdGg/OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkO1xuICByZXN1bWUoY2FsbGJhY2s/OiAoaXRlbTogTWVudSwgcGFyZW50TWVudW06IE1lbnUgfCBudWxsLCBkZXB0aD86IG51bWJlcikgPT4gdm9pZCk6IHZvaWQ7XG4gIHJlc3VtZShjYWxsYmFjaz86IChpdGVtOiBNZW51LCBwYXJlbnRNZW51bTogTWVudSB8IG51bGwsIGRlcHRoPzogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgbGV0IGkgPSAxO1xuICAgIGNvbnN0IHNob3J0Y3V0czogTWVudVtdID0gW107XG4gICAgdGhpcy52aXNpdCh0aGlzLmRhdGEsIChpdGVtOiBNZW51SW5uZXIsIHBhcmVudCwgZGVwdGgpID0+IHtcbiAgICAgIGl0ZW0uX2lkID0gaSsrO1xuICAgICAgaXRlbS5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgaXRlbS5fZGVwdGggPSBkZXB0aDtcbiAgICAgIHRoaXMuZml4SXRlbShpdGVtKTtcblxuICAgICAgLy8gc2hvcnRjdXRcbiAgICAgIGlmIChwYXJlbnQgJiYgaXRlbS5zaG9ydGN1dCA9PT0gdHJ1ZSAmJiBwYXJlbnQuc2hvcnRjdXRSb290ICE9PSB0cnVlKSB7XG4gICAgICAgIHNob3J0Y3V0cy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGl0ZW0sIHBhcmVudCwgZGVwdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2FkU2hvcnRjdXQoc2hvcnRjdXRzKTtcbiAgICB0aGlzLl9jaGFuZ2UkLm5leHQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDliqDovb3lv6vmjbfoj5zljZXvvIzliqDovb3kvY3nva7op4TliJnlpoLkuIvvvJpcbiAgICogMeOAgee7n+S4gOWcqOS4i+aghzDnmoToioLngrnkuIvvvIjljbPjgJDkuLvlr7zoiKrjgJHoioLngrnkuIvmlrnvvIlcbiAgICogICAgICAx44CB6IulIGNoaWxkcmVuIOWtmOWcqCDjgJBzaG9ydGN1dFJvb3Q6IHRydWXjgJHliJnmnIDkvJjlhYjjgJDmjqjojZDjgJHov5nnp43mlrnlvI9cbiAgICogICAgICAy44CB5ZCm5YiZ5p+l5om+5bim5pyJ44CQZGFzaGJvYXJk44CR5a2X5qC36ZO+5o6l77yM6Iul5a2Y5Zyo5YiZ5Zyo5q2k6I+c5Y2V55qE5LiL5pa55Yib5bu65b+r5o235YWl5Y+jXG4gICAqICAgICAgM+OAgeWQpuWImeaUvuWcqDDoioLngrnkvY3nva5cbiAgICovXG4gIHByaXZhdGUgbG9hZFNob3J0Y3V0KHNob3J0Y3V0czogTWVudUlubmVyW10pOiB2b2lkIHtcbiAgICBpZiAoc2hvcnRjdXRzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbHMgPSB0aGlzLmRhdGFbMF0uY2hpbGRyZW4gYXMgTWVudUlubmVyW107XG4gICAgbGV0IHBvcyA9IGxzLmZpbmRJbmRleCh3ID0+IHcuc2hvcnRjdXRSb290ID09PSB0cnVlKTtcbiAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgcG9zID0gbHMuZmluZEluZGV4KHcgPT4gdy5saW5rIS5pbmNsdWRlcygnZGFzaGJvYXJkJykpO1xuICAgICAgcG9zID0gKHBvcyAhPT0gLTEgPyBwb3MgOiAtMSkgKyAxO1xuICAgICAgY29uc3Qgc2hvcnRjdXRNZW51ID0ge1xuICAgICAgICB0ZXh0OiAn5b+r5o236I+c5Y2VJyxcbiAgICAgICAgaTE4bjogJ3Nob3J0Y3V0JyxcbiAgICAgICAgaWNvbjogJ2ljb24tcm9ja2V0JyxcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9IGFzIE1lbnVJbm5lcjtcbiAgICAgIHRoaXMuZGF0YVswXS5jaGlsZHJlbiEuc3BsaWNlKHBvcywgMCwgc2hvcnRjdXRNZW51KTtcbiAgICB9XG4gICAgbGV0IF9kYXRhID0gdGhpcy5kYXRhWzBdLmNoaWxkcmVuIVtwb3NdO1xuICAgIGlmIChfZGF0YS5pMThuKSBfZGF0YS50ZXh0ID0gdGhpcy5pMThuU3J2LmZhbnlpKF9kYXRhLmkxOG4pO1xuICAgIF9kYXRhID0gT2JqZWN0LmFzc2lnbihfZGF0YSwge1xuICAgICAgc2hvcnRjdXRSb290OiB0cnVlLFxuICAgICAgX2lkOiAtMSxcbiAgICAgIF9wYXJlbnQ6IG51bGwsXG4gICAgICBfZGVwdGg6IDFcbiAgICB9IGFzIE1lbnVJbm5lcik7XG4gICAgX2RhdGEuY2hpbGRyZW4gPSBzaG9ydGN1dHMubWFwKGkgPT4ge1xuICAgICAgaS5fZGVwdGggPSAyO1xuICAgICAgaS5fcGFyZW50ID0gX2RhdGE7XG4gICAgICByZXR1cm4gaTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmuIXnqbroj5zljZVcbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuX2NoYW5nZSQubmV4dCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSBgdXJsYCBvciBga2V5YCB0byBmaW5kIG1lbnVzXG4gICAqXG4gICAqIOWIqeeUqCBgdXJsYCDmiJYgYGtleWAg5p+l5om+6I+c5Y2VXG4gICAqL1xuICBmaW5kKG9wdGlvbnM6IHtcbiAgICBrZXk/OiBzdHJpbmcgfCBudWxsO1xuICAgIHVybD86IHN0cmluZyB8IG51bGw7XG4gICAgcmVjdXJzaXZlPzogYm9vbGVhbiB8IG51bGw7XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY2FsbGJhY2sgcmV0dXJucyBhIEJvb2xlYW4gdHlwZSwgaXQgbWVhbnMgdGhlIGN1c3RvbSB2YWxpZGF0aW9uIHJlc3VsdFxuICAgICAqXG4gICAgICog5b2T5Zue6LCD6L+U5Zue5LiA5Liq5biD5bCU57G75Z6L5pe277yM6KGo56S66Ieq5a6a5LmJ5qCh6aqM57uT5p6cXG4gICAgICovXG4gICAgY2I/OiAoKGk6IE1lbnUpID0+IGJvb2xlYW4gfCBudWxsKSB8IG51bGw7XG4gICAgLyoqXG4gICAgICogVXNlIHRoZSBjdXJyZW50IG1lbnUgZGF0YSBieSBkZWZhdWx0XG4gICAgICpcbiAgICAgKiDpu5jorqTkvb/nlKjlvZPliY3oj5zljZXmlbDmja5cbiAgICAgKi9cbiAgICBkYXRhPzogTWVudVtdIHwgbnVsbDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGlnbm9yZSBoaWRlIGl0ZW1zLCBkZWZhdWx0OiBgZmFsc2VgXG4gICAgICpcbiAgICAgKiDmmK/lkKblv73nlaXpmpDol4/nmoTpobnvvIzpu5jorqTvvJpgZmFsc2VgXG4gICAgICovXG4gICAgaWdub3JlSGlkZT86IGJvb2xlYW47XG4gIH0pOiBNZW51IHwgbnVsbCB7XG4gICAgY29uc3Qgb3B0ID0geyByZWN1cnNpdmU6IGZhbHNlLCBpZ25vcmVIaWRlOiBmYWxzZSwgLi4ub3B0aW9ucyB9O1xuICAgIGlmIChvcHQua2V5ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0ob3B0LmtleSk7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IG9wdC51cmw7XG5cbiAgICBsZXQgaXRlbTogTWVudSB8IG51bGwgPSBudWxsO1xuXG4gICAgd2hpbGUgKCFpdGVtICYmIHVybCkge1xuICAgICAgdGhpcy52aXNpdChvcHQuZGF0YSA/PyB0aGlzLmRhdGEsIGkgPT4ge1xuICAgICAgICBpZiAob3B0Lmlnbm9yZUhpZGUgJiYgaS5oaWRlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHQuY2IpIHtcbiAgICAgICAgICBjb25zdCByZXMgPSBvcHQuY2IoaSk7XG4gICAgICAgICAgaWYgKCFpdGVtICYmIHR5cGVvZiByZXMgPT09ICdib29sZWFuJyAmJiByZXMpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaS5saW5rICE9IG51bGwgJiYgaS5saW5rID09PSB1cmwpIHtcbiAgICAgICAgICBpdGVtID0gaTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghb3B0LnJlY3Vyc2l2ZSkgYnJlYWs7XG5cbiAgICAgIGlmICgvWz87XS9nLnRlc3QodXJsKSkge1xuICAgICAgICB1cmwgPSB1cmwuc3BsaXQoL1s/O10vZylbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIOagueaNrnVybOiOt+WPluiPnOWNleWIl+ihqFxuICAgKiAtIOiLpSBgcmVjdXJzaXZlOiB0cnVlYCDliJnkvJroh6rliqjlkJHkuIrpgJLlvZLmn6Xmib5cbiAgICogIC0g6I+c5Y2V5pWw5o2u5rqQ5YyF5ZCrIGAvd2FyZWDvvIzliJkgYC93YXJlLzFgIOS5n+inhuS4uiBgL3dhcmVgIOmhuVxuICAgKi9cbiAgZ2V0UGF0aEJ5VXJsKHVybDogc3RyaW5nLCByZWN1cnNpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IE1lbnVbXSB7XG4gICAgY29uc3QgcmV0OiBNZW51W10gPSBbXTtcbiAgICBsZXQgaXRlbSA9IHRoaXMuZmluZCh7IHVybCwgcmVjdXJzaXZlIH0pIGFzIE1lbnVJbm5lcjtcblxuICAgIGlmICghaXRlbSkgcmV0dXJuIHJldDtcblxuICAgIGRvIHtcbiAgICAgIHJldC5zcGxpY2UoMCwgMCwgaXRlbSk7XG4gICAgICBpdGVtID0gaXRlbS5fcGFyZW50ITtcbiAgICB9IHdoaWxlIChpdGVtKTtcblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG1lbnUgYmFzZWQgb24gYGtleWBcbiAgICovXG4gIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBNZW51IHwgbnVsbCB7XG4gICAgbGV0IHJlczogTWVudSB8IG51bGwgPSBudWxsO1xuICAgIHRoaXMudmlzaXQodGhpcy5kYXRhLCBpdGVtID0+IHtcbiAgICAgIGlmIChyZXMgPT0gbnVsbCAmJiBpdGVtLmtleSA9PT0ga2V5KSB7XG4gICAgICAgIHJlcyA9IGl0ZW07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbWVudSBiYXNlZCBvbiBga2V5YFxuICAgKi9cbiAgc2V0SXRlbShrZXk6IHN0cmluZyB8IE1lbnUsIHZhbHVlOiBNZW51LCBvcHRpb25zPzogeyBlbWl0PzogYm9vbGVhbiB9KTogdm9pZCB7XG4gICAgY29uc3QgaXRlbSA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnID8gdGhpcy5nZXRJdGVtKGtleSkgOiBrZXk7XG4gICAgaWYgKGl0ZW0gPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goayA9PiB7XG4gICAgICBpdGVtW2tdID0gdmFsdWVba107XG4gICAgfSk7XG4gICAgdGhpcy5maXhJdGVtKGl0ZW0pO1xuXG4gICAgaWYgKG9wdGlvbnM/LmVtaXQgIT09IGZhbHNlKSB0aGlzLl9jaGFuZ2UkLm5leHQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIG1lbnUgYmFzZWQgb24gYGtleWAgb3IgbWVudSBvYmplY3RcbiAgICovXG4gIG9wZW4oa2V5T3JJdGVtOiBzdHJpbmcgfCBNZW51IHwgbnVsbCwgb3B0aW9ucz86IHsgZW1pdD86IGJvb2xlYW4gfSk6IHZvaWQge1xuICAgIGxldCBpdGVtID0gdHlwZW9mIGtleU9ySXRlbSA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmQoeyBrZXk6IGtleU9ySXRlbSB9KSA6IGtleU9ySXRlbTtcbiAgICBpZiAoaXRlbSA9PSBudWxsKSByZXR1cm47XG5cbiAgICB0aGlzLnZpc2l0KHRoaXMubWVudXMsIChpOiBNZW51SW5uZXIpID0+IHtcbiAgICAgIGkuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICBpZiAoIXRoaXMub3BlblN0cmljdGx5KSBpLm9wZW4gPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIGRvIHtcbiAgICAgIGl0ZW0uX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIGl0ZW0ub3BlbiA9IHRydWU7XG4gICAgICBpdGVtID0gaXRlbS5fcGFyZW50O1xuICAgIH0gd2hpbGUgKGl0ZW0pO1xuICAgIGlmIChvcHRpb25zPy5lbWl0ICE9PSBmYWxzZSkgdGhpcy5fY2hhbmdlJC5uZXh0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBvcGVuQWxsKHN0YXR1cz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZU9wZW4obnVsbCwgeyBhbGxTdGF0dXM6IHN0YXR1cyB9KTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oa2V5T3JJdGVtOiBzdHJpbmcgfCBNZW51IHwgbnVsbCwgb3B0aW9ucz86IHsgYWxsU3RhdHVzPzogYm9vbGVhbjsgZW1pdD86IGJvb2xlYW4gfSk6IHZvaWQge1xuICAgIGxldCBpdGVtID0gdHlwZW9mIGtleU9ySXRlbSA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmQoeyBrZXk6IGtleU9ySXRlbSB9KSA6IGtleU9ySXRlbTtcbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnZpc2l0KHRoaXMubWVudXMsIChpOiBNZW51SW5uZXIpID0+IHtcbiAgICAgICAgaS5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaS5vcGVuID0gb3B0aW9ucz8uYWxsU3RhdHVzID09PSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5vcGVuU3RyaWN0bHkpIHtcbiAgICAgICAgdGhpcy52aXNpdCh0aGlzLm1lbnVzLCAoaTogTWVudUlubmVyKSA9PiB7XG4gICAgICAgICAgaWYgKGkgIT09IGl0ZW0pIGkub3BlbiA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHBJdGVtID0gaXRlbS5fcGFyZW50O1xuICAgICAgICB3aGlsZSAocEl0ZW0pIHtcbiAgICAgICAgICBwSXRlbS5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICBwSXRlbSA9IHBJdGVtLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGl0ZW0ub3BlbiA9ICFpdGVtLm9wZW47XG4gICAgfVxuICAgIGlmIChvcHRpb25zPy5lbWl0ICE9PSBmYWxzZSkgdGhpcy5fY2hhbmdlJC5uZXh0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5pMThuJD8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldFJvdXRlckxpbmsodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLiRyb3V0ZXJMaW5rLm5leHQodXJsKTtcbiAgfVxuXG4gIGdldFJvdXRlckxpbmsoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy4kcm91dGVyTGluay5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19