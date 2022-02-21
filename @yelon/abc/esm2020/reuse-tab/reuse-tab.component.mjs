import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { InputBoolean, InputNumber } from '@yelon/util/decorator';
import { ReuseTabContextService } from './reuse-tab-context.service';
import { ReuseTabMatchMode } from './reuse-tab.interfaces';
import * as i0 from "@angular/core";
import * as i1 from "./reuse-tab.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "ng-zorro-antd/tabs";
import * as i5 from "./reuse-tab-context.component";
import * as i6 from "@angular/common";
import * as i7 from "./reuse-tab-context.directive";
import * as i8 from "ng-zorro-antd/icon";
export class ReuseTabComponent {
    // #endregion
    constructor(srv, cdr, router, route, i18nSrv, doc, platform) {
        this.srv = srv;
        this.cdr = cdr;
        this.router = router;
        this.route = route;
        this.i18nSrv = i18nSrv;
        this.doc = doc;
        this.platform = platform;
        this.destroy$ = new Subject();
        this.list = [];
        this.pos = 0;
        // #region fields
        this.mode = ReuseTabMatchMode.Menu;
        this.debug = false;
        this.allowClose = true;
        this.keepingScroll = false;
        this.customContextMenu = [];
        this.tabBarStyle = null;
        this.tabType = 'line';
        this.routeParamMatchMode = 'strict';
        this.disabled = false;
        this.change = new EventEmitter();
        this.close = new EventEmitter();
    }
    set keepingScrollContainer(value) {
        this._keepingScrollContainer = typeof value === 'string' ? this.doc.querySelector(value) : value;
    }
    genTit(title) {
        return title.i18n && this.i18nSrv ? this.i18nSrv.fanyi(title.i18n) : title.text;
    }
    get curUrl() {
        return this.srv.getUrl(this.route.snapshot);
    }
    genCurItem() {
        const url = this.curUrl;
        const snapshotTrue = this.srv.getTruthRoute(this.route.snapshot);
        return {
            url,
            title: this.genTit(this.srv.getTitle(url, snapshotTrue)),
            closable: this.allowClose && this.srv.count > 0 && this.srv.getClosable(url, snapshotTrue),
            active: false,
            last: false,
            index: 0
        };
    }
    genList(notify) {
        const ls = this.srv.items.map((item, index) => ({
            url: item.url,
            title: this.genTit(item.title),
            closable: this.allowClose && item.closable && this.srv.count > 0,
            index,
            active: false,
            last: false
        }));
        // debugger;
        const url = this.curUrl;
        let addCurrent = ls.findIndex(w => w.url === url) === -1;
        if (notify && notify.active === 'close' && notify.url === url) {
            addCurrent = false;
            let toPos = 0;
            const curItem = this.list.find(w => w.url === url);
            if (curItem.index === ls.length) {
                // When closed is last
                toPos = ls.length - 1;
            }
            else if (curItem.index < ls.length) {
                // Should be actived next tab when closed is middle
                toPos = Math.max(0, curItem.index);
            }
            this.router.navigateByUrl(ls[toPos].url);
        }
        if (addCurrent) {
            ls.splice(this.pos + 1, 0, this.genCurItem());
        }
        ls.forEach((item, index) => (item.index = index));
        if (ls.length === 1) {
            ls[0].closable = false;
        }
        this.list = ls;
        this.cdr.detectChanges();
        this.updatePos();
    }
    updateTitle(res) {
        const item = this.list.find(w => w.url === res.url);
        if (!item)
            return;
        item.title = this.genTit(res.title);
        this.cdr.detectChanges();
    }
    refresh(item) {
        this.srv.runHook('_onReuseInit', this.pos === item.index ? this.srv.componentRef : item.index, 'refresh');
    }
    // #region UI
    contextMenuChange(res) {
        let fn = null;
        switch (res.type) {
            case 'refresh':
                this.refresh(res.item);
                break;
            case 'close':
                this._close(null, res.item.index, res.includeNonCloseable);
                break;
            case 'closeRight':
                fn = () => {
                    this.srv.closeRight(res.item.url, res.includeNonCloseable);
                    this.close.emit(null);
                };
                break;
            case 'closeOther':
                fn = () => {
                    this.srv.clear(res.includeNonCloseable);
                    this.close.emit(null);
                };
                break;
        }
        if (!fn) {
            return;
        }
        if (!res.item.active && res.item.index <= this.list.find(w => w.active).index) {
            this._to(res.item.index, fn);
        }
        else {
            fn();
        }
    }
    _to(index, cb) {
        index = Math.max(0, Math.min(index, this.list.length - 1));
        const item = this.list[index];
        this.router.navigateByUrl(item.url).then(res => {
            if (!res)
                return;
            this.item = item;
            this.change.emit(item);
            if (cb) {
                cb();
            }
        });
    }
    _close(e, idx, includeNonCloseable) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }
        const item = this.list[idx];
        this.srv.close(item.url, includeNonCloseable);
        this.close.emit(item);
        this.cdr.detectChanges();
        return false;
    }
    activate(instance) {
        this.srv.componentRef = { instance };
    }
    updatePos() {
        const url = this.srv.getUrl(this.route.snapshot);
        const ls = this.list.filter(w => w.url === url || !this.srv.isExclude(w.url));
        if (ls.length === 0) {
            return;
        }
        const last = ls[ls.length - 1];
        const item = ls.find(w => w.url === url);
        last.last = true;
        const pos = item == null ? last.index : item.index;
        ls.forEach((i, idx) => (i.active = pos === idx));
        this.pos = pos;
        // TODO: 目前无法知道为什么 `pos` 无法通过 `nzSelectedIndex` 生效，因此强制使用组件实例的方式来修改，这种方式是安全的
        // https://github.com/hbyunzai/ng-yunzai/issues/1736
        this.tabset.nzSelectedIndex = pos;
        this.list = ls;
        this.cdr.detectChanges();
    }
    // #endregion
    ngOnInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.srv.change.pipe(takeUntil(this.destroy$)).subscribe(res => {
            switch (res?.active) {
                case 'title':
                    this.updateTitle(res);
                    return;
                case 'override':
                    if (res?.list?.length === this.list.length) {
                        this.updatePos();
                        return;
                    }
                    break;
            }
            this.genList(res);
        });
        this.i18nSrv.change
            .pipe(filter(() => this.srv.inited), takeUntil(this.destroy$), debounceTime(100))
            .subscribe(() => this.genList({ active: 'title' }));
        this.srv.init();
    }
    ngOnChanges(changes) {
        if (!this.platform.isBrowser) {
            return;
        }
        if (changes.max)
            this.srv.max = this.max;
        if (changes.excludes)
            this.srv.excludes = this.excludes;
        if (changes.mode)
            this.srv.mode = this.mode;
        if (changes.routeParamMatchMode)
            this.srv.routeParamMatchMode = this.routeParamMatchMode;
        if (changes.keepingScroll) {
            this.srv.keepingScroll = this.keepingScroll;
            this.srv.keepingScrollContainer = this._keepingScrollContainer;
        }
        this.srv.debug = this.debug;
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        const { destroy$ } = this;
        destroy$.next();
        destroy$.complete();
    }
}
ReuseTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ReuseTabComponent, deps: [{ token: i1.ReuseTabService }, { token: i0.ChangeDetectorRef }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: YUNZAI_I18N_TOKEN, optional: true }, { token: DOCUMENT }, { token: i3.Platform }], target: i0.ɵɵFactoryTarget.Component });
ReuseTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: ReuseTabComponent, selector: "reuse-tab, [reuse-tab]", inputs: { mode: "mode", i18n: "i18n", debug: "debug", max: "max", tabMaxWidth: "tabMaxWidth", excludes: "excludes", allowClose: "allowClose", keepingScroll: "keepingScroll", keepingScrollContainer: "keepingScrollContainer", customContextMenu: "customContextMenu", tabBarExtraContent: "tabBarExtraContent", tabBarGutter: "tabBarGutter", tabBarStyle: "tabBarStyle", tabType: "tabType", routeParamMatchMode: "routeParamMatchMode", disabled: "disabled", titleRender: "titleRender" }, outputs: { change: "change", close: "close" }, host: { properties: { "class.reuse-tab": "true", "class.reuse-tab__line": "tabType === 'line'", "class.reuse-tab__card": "tabType === 'card'", "class.reuse-tab__disabled": "disabled" } }, providers: [ReuseTabContextService], viewQueries: [{ propertyName: "tabset", first: true, predicate: ["tabset"], descendants: true }], exportAs: ["reuseTab"], usesOnChanges: true, ngImport: i0, template: "<nz-tabset\n  #tabset\n  [nzSelectedIndex]=\"pos\"\n  [nzAnimated]=\"false\"\n  [nzType]=\"tabType\"\n  [nzTabBarExtraContent]=\"tabBarExtraContent\"\n  [nzTabBarGutter]=\"tabBarGutter\"\n  [nzTabBarStyle]=\"tabBarStyle\"\n>\n  <nz-tab *ngFor=\"let i of list; let index = index\" [nzTitle]=\"titleTemplate\" (nzClick)=\"_to(index)\">\n    <ng-template #titleTemplate>\n      <div\n        [reuse-tab-context-menu]=\"i\"\n        [customContextMenu]=\"customContextMenu\"\n        class=\"reuse-tab__name\"\n        [attr.title]=\"i.title\"\n      >\n        <span [class.reuse-tab__name-width]=\"tabMaxWidth\" [style.max-width.px]=\"tabMaxWidth\">\n          <ng-container\n            *ngIf=\"titleRender; else defaultTitle\"\n            [ngTemplateOutlet]=\"titleRender\"\n            [ngTemplateOutletContext]=\"{ $implicit: i }\"\n          ></ng-container>\n          <ng-template #defaultTitle>{{ i.title }}</ng-template>\n        </span>\n      </div>\n      <i *ngIf=\"i.closable\" nz-icon nzType=\"close\" class=\"reuse-tab__op\" (click)=\"_close($event, index, false)\"></i>\n    </ng-template>\n  </nz-tab>\n</nz-tabset>\n<reuse-tab-context [i18n]=\"i18n\" (change)=\"contextMenuChange($event)\"></reuse-tab-context>\n", components: [{ type: i4.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { type: i4.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }, { type: i5.ReuseTabContextComponent, selector: "reuse-tab-context", inputs: ["i18n"], outputs: ["change"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.ReuseTabContextDirective, selector: "[reuse-tab-context-menu]", inputs: ["reuse-tab-context-menu", "customContextMenu"], exportAs: ["reuseTabContextMenu"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], ReuseTabComponent.prototype, "debug", void 0);
__decorate([
    InputNumber()
], ReuseTabComponent.prototype, "max", void 0);
__decorate([
    InputNumber()
], ReuseTabComponent.prototype, "tabMaxWidth", void 0);
__decorate([
    InputBoolean()
], ReuseTabComponent.prototype, "allowClose", void 0);
__decorate([
    InputBoolean()
], ReuseTabComponent.prototype, "keepingScroll", void 0);
__decorate([
    InputBoolean()
], ReuseTabComponent.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ReuseTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reuse-tab, [reuse-tab]', exportAs: 'reuseTab', host: {
                        '[class.reuse-tab]': 'true',
                        '[class.reuse-tab__line]': `tabType === 'line'`,
                        '[class.reuse-tab__card]': `tabType === 'card'`,
                        '[class.reuse-tab__disabled]': `disabled`
                    }, providers: [ReuseTabContextService], preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<nz-tabset\n  #tabset\n  [nzSelectedIndex]=\"pos\"\n  [nzAnimated]=\"false\"\n  [nzType]=\"tabType\"\n  [nzTabBarExtraContent]=\"tabBarExtraContent\"\n  [nzTabBarGutter]=\"tabBarGutter\"\n  [nzTabBarStyle]=\"tabBarStyle\"\n>\n  <nz-tab *ngFor=\"let i of list; let index = index\" [nzTitle]=\"titleTemplate\" (nzClick)=\"_to(index)\">\n    <ng-template #titleTemplate>\n      <div\n        [reuse-tab-context-menu]=\"i\"\n        [customContextMenu]=\"customContextMenu\"\n        class=\"reuse-tab__name\"\n        [attr.title]=\"i.title\"\n      >\n        <span [class.reuse-tab__name-width]=\"tabMaxWidth\" [style.max-width.px]=\"tabMaxWidth\">\n          <ng-container\n            *ngIf=\"titleRender; else defaultTitle\"\n            [ngTemplateOutlet]=\"titleRender\"\n            [ngTemplateOutletContext]=\"{ $implicit: i }\"\n          ></ng-container>\n          <ng-template #defaultTitle>{{ i.title }}</ng-template>\n        </span>\n      </div>\n      <i *ngIf=\"i.closable\" nz-icon nzType=\"close\" class=\"reuse-tab__op\" (click)=\"_close($event, index, false)\"></i>\n    </ng-template>\n  </nz-tab>\n</nz-tabset>\n<reuse-tab-context [i18n]=\"i18n\" (change)=\"contextMenuChange($event)\"></reuse-tab-context>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ReuseTabService }, { type: i0.ChangeDetectorRef }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3.Platform }]; }, propDecorators: { tabset: [{
                type: ViewChild,
                args: ['tabset']
            }], mode: [{
                type: Input
            }], i18n: [{
                type: Input
            }], debug: [{
                type: Input
            }], max: [{
                type: Input
            }], tabMaxWidth: [{
                type: Input
            }], excludes: [{
                type: Input
            }], allowClose: [{
                type: Input
            }], keepingScroll: [{
                type: Input
            }], keepingScrollContainer: [{
                type: Input
            }], customContextMenu: [{
                type: Input
            }], tabBarExtraContent: [{
                type: Input
            }], tabBarGutter: [{
                type: Input
            }], tabBarStyle: [{
                type: Input
            }], tabType: [{
                type: Input
            }], routeParamMatchMode: [{
                type: Input
            }], disabled: [{
                type: Input
            }], titleRender: [{
                type: Input
            }], change: [{
                type: Output
            }], close: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV1c2UtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9yZXVzZS10YWIvcmV1c2UtdGFiLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9yZXVzZS10YWIvcmV1c2UtdGFiLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakUsT0FBTyxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRSxPQUFPLEVBQWdCLFlBQVksRUFBRSxXQUFXLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUk3RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBTUwsaUJBQWlCLEVBSWxCLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7QUFrQmhDLE1BQU0sT0FBTyxpQkFBaUI7SUF3QzVCLGFBQWE7SUFFYixZQUNVLEdBQW9CLEVBQ3BCLEdBQXNCLEVBQ3RCLE1BQWMsRUFDZCxLQUFxQixFQUNrQixPQUEwQixFQUMvQyxHQUFjLEVBQ2hDLFFBQWtCO1FBTmxCLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFD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LEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDYSxNQUFNO3NCQUF4QixNQUFNO2dCQUNZLEtBQUs7c0JBQXZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBZdW56YWlJMThOU2VydmljZSwgWVVOWkFJX0kxOE5fVE9LRU4gfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCBOdW1iZXJJbnB1dCB9IGZyb20gJ0B5ZWxvbi91dGlsL2RlY29yYXRvcic7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelRhYlNldENvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvdGFicyc7XG5cbmltcG9ydCB7IFJldXNlVGFiQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL3JldXNlLXRhYi1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgUmV1c2VDb250ZXh0Q2xvc2VFdmVudCxcbiAgUmV1c2VDb250ZXh0STE4bixcbiAgUmV1c2VDdXN0b21Db250ZXh0TWVudSxcbiAgUmV1c2VJdGVtLFxuICBSZXVzZVRhYkNhY2hlZCxcbiAgUmV1c2VUYWJNYXRjaE1vZGUsXG4gIFJldXNlVGFiTm90aWZ5LFxuICBSZXVzZVRhYlJvdXRlUGFyYW1NYXRjaE1vZGUsXG4gIFJldXNlVGl0bGVcbn0gZnJvbSAnLi9yZXVzZS10YWIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBSZXVzZVRhYlNlcnZpY2UgfSBmcm9tICcuL3JldXNlLXRhYi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncmV1c2UtdGFiLCBbcmV1c2UtdGFiXScsXG4gIGV4cG9ydEFzOiAncmV1c2VUYWInLFxuICB0ZW1wbGF0ZVVybDogJy4vcmV1c2UtdGFiLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MucmV1c2UtdGFiXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLnJldXNlLXRhYl9fbGluZV0nOiBgdGFiVHlwZSA9PT0gJ2xpbmUnYCxcbiAgICAnW2NsYXNzLnJldXNlLXRhYl9fY2FyZF0nOiBgdGFiVHlwZSA9PT0gJ2NhcmQnYCxcbiAgICAnW2NsYXNzLnJldXNlLXRhYl9fZGlzYWJsZWRdJzogYGRpc2FibGVkYFxuICB9LFxuICBwcm92aWRlcnM6IFtSZXVzZVRhYkNvbnRleHRTZXJ2aWNlXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFJldXNlVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kZWJ1ZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWF4OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RhYk1heFdpZHRoOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FsbG93Q2xvc2U6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2tlZXBpbmdTY3JvbGw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgndGFic2V0JykgcHJpdmF0ZSB0YWJzZXQhOiBOelRhYlNldENvbXBvbmVudDtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2tlZXBpbmdTY3JvbGxDb250YWluZXI/OiBFbGVtZW50O1xuICBsaXN0OiBSZXVzZUl0ZW1bXSA9IFtdO1xuICBpdGVtPzogUmV1c2VJdGVtO1xuICBwb3MgPSAwO1xuXG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgQElucHV0KCkgbW9kZTogUmV1c2VUYWJNYXRjaE1vZGUgPSBSZXVzZVRhYk1hdGNoTW9kZS5NZW51O1xuICBASW5wdXQoKSBpMThuPzogUmV1c2VDb250ZXh0STE4bjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGRlYnVnID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG1heD86IG51bWJlcjtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgdGFiTWF4V2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGV4Y2x1ZGVzPzogUmVnRXhwW107XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBhbGxvd0Nsb3NlID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGtlZXBpbmdTY3JvbGwgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc2V0IGtlZXBpbmdTY3JvbGxDb250YWluZXIodmFsdWU6IHN0cmluZyB8IEVsZW1lbnQpIHtcbiAgICB0aGlzLl9rZWVwaW5nU2Nyb2xsQ29udGFpbmVyID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IodmFsdWUpIDogdmFsdWU7XG4gIH1cbiAgQElucHV0KCkgY3VzdG9tQ29udGV4dE1lbnU6IFJldXNlQ3VzdG9tQ29udGV4dE1lbnVbXSA9IFtdO1xuICBASW5wdXQoKSB0YWJCYXJFeHRyYUNvbnRlbnQ/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgdGFiQmFyR3V0dGVyPzogbnVtYmVyO1xuICBASW5wdXQoKSB0YWJCYXJTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB0YWJUeXBlOiAnbGluZScgfCAnY2FyZCcgPSAnbGluZSc7XG4gIEBJbnB1dCgpIHJvdXRlUGFyYW1NYXRjaE1vZGU6IFJldXNlVGFiUm91dGVQYXJhbU1hdGNoTW9kZSA9ICdzdHJpY3QnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdGl0bGVSZW5kZXI/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUmV1c2VJdGVtIH0+O1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZXVzZUl0ZW0+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmV1c2VJdGVtIHwgbnVsbD4oKTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzcnY6IFJldXNlVGFiU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOKSBwcml2YXRlIGkxOG5TcnY6IFl1bnphaUkxOE5TZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnksXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm1cbiAgKSB7fVxuXG4gIHByaXZhdGUgZ2VuVGl0KHRpdGxlOiBSZXVzZVRpdGxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGl0bGUuaTE4biAmJiB0aGlzLmkxOG5TcnYgPyB0aGlzLmkxOG5TcnYuZmFueWkodGl0bGUuaTE4bikgOiB0aXRsZS50ZXh0ITtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGN1clVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNydi5nZXRVcmwodGhpcy5yb3V0ZS5zbmFwc2hvdCk7XG4gIH1cblxuICBwcml2YXRlIGdlbkN1ckl0ZW0oKTogUmV1c2VJdGVtIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmN1clVybDtcbiAgICBjb25zdCBzbmFwc2hvdFRydWUgPSB0aGlzLnNydi5nZXRUcnV0aFJvdXRlKHRoaXMucm91dGUuc25hcHNob3QpO1xuICAgIHJldHVybiB7XG4gICAgICB1cmwsXG4gICAgICB0aXRsZTogdGhpcy5nZW5UaXQodGhpcy5zcnYuZ2V0VGl0bGUodXJsLCBzbmFwc2hvdFRydWUpKSxcbiAgICAgIGNsb3NhYmxlOiB0aGlzLmFsbG93Q2xvc2UgJiYgdGhpcy5zcnYuY291bnQgPiAwICYmIHRoaXMuc3J2LmdldENsb3NhYmxlKHVybCwgc25hcHNob3RUcnVlKSxcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBsYXN0OiBmYWxzZSxcbiAgICAgIGluZGV4OiAwXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuTGlzdChub3RpZnk6IFJldXNlVGFiTm90aWZ5IHwgbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IGxzID0gdGhpcy5zcnYuaXRlbXMubWFwKFxuICAgICAgKGl0ZW06IFJldXNlVGFiQ2FjaGVkLCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAoe1xuICAgICAgICAgIHVybDogaXRlbS51cmwsXG4gICAgICAgICAgdGl0bGU6IHRoaXMuZ2VuVGl0KGl0ZW0udGl0bGUpLFxuICAgICAgICAgIGNsb3NhYmxlOiB0aGlzLmFsbG93Q2xvc2UgJiYgaXRlbS5jbG9zYWJsZSAmJiB0aGlzLnNydi5jb3VudCA+IDAsXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICBsYXN0OiBmYWxzZVxuICAgICAgICB9IGFzIFJldXNlSXRlbSlcbiAgICApO1xuICAgIC8vIGRlYnVnZ2VyO1xuXG4gICAgY29uc3QgdXJsID0gdGhpcy5jdXJVcmw7XG4gICAgbGV0IGFkZEN1cnJlbnQgPSBscy5maW5kSW5kZXgodyA9PiB3LnVybCA9PT0gdXJsKSA9PT0gLTE7XG4gICAgaWYgKG5vdGlmeSAmJiBub3RpZnkuYWN0aXZlID09PSAnY2xvc2UnICYmIG5vdGlmeS51cmwgPT09IHVybCkge1xuICAgICAgYWRkQ3VycmVudCA9IGZhbHNlO1xuICAgICAgbGV0IHRvUG9zID0gMDtcbiAgICAgIGNvbnN0IGN1ckl0ZW0gPSB0aGlzLmxpc3QuZmluZCh3ID0+IHcudXJsID09PSB1cmwpITtcbiAgICAgIGlmIChjdXJJdGVtLmluZGV4ID09PSBscy5sZW5ndGgpIHtcbiAgICAgICAgLy8gV2hlbiBjbG9zZWQgaXMgbGFzdFxuICAgICAgICB0b1BvcyA9IGxzLmxlbmd0aCAtIDE7XG4gICAgICB9IGVsc2UgaWYgKGN1ckl0ZW0uaW5kZXggPCBscy5sZW5ndGgpIHtcbiAgICAgICAgLy8gU2hvdWxkIGJlIGFjdGl2ZWQgbmV4dCB0YWIgd2hlbiBjbG9zZWQgaXMgbWlkZGxlXG4gICAgICAgIHRvUG9zID0gTWF0aC5tYXgoMCwgY3VySXRlbS5pbmRleCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGxzW3RvUG9zXS51cmwpO1xuICAgIH1cblxuICAgIGlmIChhZGRDdXJyZW50KSB7XG4gICAgICBscy5zcGxpY2UodGhpcy5wb3MgKyAxLCAwLCB0aGlzLmdlbkN1ckl0ZW0oKSk7XG4gICAgfVxuXG4gICAgbHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IChpdGVtLmluZGV4ID0gaW5kZXgpKTtcbiAgICBpZiAobHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBsc1swXS5jbG9zYWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmxpc3QgPSBscztcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy51cGRhdGVQb3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVGl0bGUocmVzOiBSZXVzZVRhYk5vdGlmeSk6IHZvaWQge1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmxpc3QuZmluZCh3ID0+IHcudXJsID09PSByZXMhLnVybCk7XG4gICAgaWYgKCFpdGVtKSByZXR1cm47XG4gICAgaXRlbS50aXRsZSA9IHRoaXMuZ2VuVGl0KHJlcyEudGl0bGUhKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goaXRlbTogUmV1c2VJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5zcnYucnVuSG9vaygnX29uUmV1c2VJbml0JywgdGhpcy5wb3MgPT09IGl0ZW0uaW5kZXggPyB0aGlzLnNydi5jb21wb25lbnRSZWYgOiBpdGVtLmluZGV4LCAncmVmcmVzaCcpO1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBVSVxuXG4gIGNvbnRleHRNZW51Q2hhbmdlKHJlczogUmV1c2VDb250ZXh0Q2xvc2VFdmVudCk6IHZvaWQge1xuICAgIGxldCBmbjogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gICAgc3dpdGNoIChyZXMudHlwZSkge1xuICAgICAgY2FzZSAncmVmcmVzaCc6XG4gICAgICAgIHRoaXMucmVmcmVzaChyZXMuaXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICB0aGlzLl9jbG9zZShudWxsLCByZXMuaXRlbS5pbmRleCwgcmVzLmluY2x1ZGVOb25DbG9zZWFibGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Nsb3NlUmlnaHQnOlxuICAgICAgICBmbiA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNydi5jbG9zZVJpZ2h0KHJlcy5pdGVtLnVybCwgcmVzLmluY2x1ZGVOb25DbG9zZWFibGUpO1xuICAgICAgICAgIHRoaXMuY2xvc2UuZW1pdChudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbG9zZU90aGVyJzpcbiAgICAgICAgZm4gPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zcnYuY2xlYXIocmVzLmluY2x1ZGVOb25DbG9zZWFibGUpO1xuICAgICAgICAgIHRoaXMuY2xvc2UuZW1pdChudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICghZm4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFyZXMuaXRlbS5hY3RpdmUgJiYgcmVzLml0ZW0uaW5kZXggPD0gdGhpcy5saXN0LmZpbmQodyA9PiB3LmFjdGl2ZSkhLmluZGV4KSB7XG4gICAgICB0aGlzLl90byhyZXMuaXRlbS5pbmRleCwgZm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbigpO1xuICAgIH1cbiAgfVxuXG4gIF90byhpbmRleDogbnVtYmVyLCBjYj86ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBpbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCB0aGlzLmxpc3QubGVuZ3RoIC0gMSkpO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmxpc3RbaW5kZXhdO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoaXRlbS51cmwpLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmICghcmVzKSByZXR1cm47XG4gICAgICB0aGlzLml0ZW0gPSBpdGVtO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChpdGVtKTtcbiAgICAgIGlmIChjYikge1xuICAgICAgICBjYigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgX2Nsb3NlKGU6IEV2ZW50IHwgbnVsbCwgaWR4OiBudW1iZXIsIGluY2x1ZGVOb25DbG9zZWFibGU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoZSAhPSBudWxsKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICBjb25zdCBpdGVtID0gdGhpcy5saXN0W2lkeF07XG4gICAgdGhpcy5zcnYuY2xvc2UoaXRlbS51cmwsIGluY2x1ZGVOb25DbG9zZWFibGUpO1xuICAgIHRoaXMuY2xvc2UuZW1pdChpdGVtKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWN0aXZhdGUoaW5zdGFuY2U6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMuc3J2LmNvbXBvbmVudFJlZiA9IHsgaW5zdGFuY2UgfTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUG9zKCk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuc3J2LmdldFVybCh0aGlzLnJvdXRlLnNuYXBzaG90KTtcbiAgICBjb25zdCBscyA9IHRoaXMubGlzdC5maWx0ZXIodyA9PiB3LnVybCA9PT0gdXJsIHx8ICF0aGlzLnNydi5pc0V4Y2x1ZGUody51cmwpKTtcbiAgICBpZiAobHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IGxzW2xzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGl0ZW0gPSBscy5maW5kKHcgPT4gdy51cmwgPT09IHVybCk7XG4gICAgbGFzdC5sYXN0ID0gdHJ1ZTtcbiAgICBjb25zdCBwb3MgPSBpdGVtID09IG51bGwgPyBsYXN0LmluZGV4IDogaXRlbS5pbmRleDtcbiAgICBscy5mb3JFYWNoKChpLCBpZHgpID0+IChpLmFjdGl2ZSA9IHBvcyA9PT0gaWR4KSk7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgLy8gVE9ETzog55uu5YmN5peg5rOV55+l6YGT5Li65LuA5LmIIGBwb3NgIOaXoOazlemAmui/hyBgbnpTZWxlY3RlZEluZGV4YCDnlJ/mlYjvvIzlm6DmraTlvLrliLbkvb/nlKjnu4Tku7blrp7kvovnmoTmlrnlvI/mnaXkv67mlLnvvIzov5nnp43mlrnlvI/mmK/lronlhajnmoRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGJ5dW56YWkvbmcteXVuemFpL2lzc3Vlcy8xNzM2XG4gICAgdGhpcy50YWJzZXQubnpTZWxlY3RlZEluZGV4ID0gcG9zO1xuICAgIHRoaXMubGlzdCA9IGxzO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zcnYuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHN3aXRjaCAocmVzPy5hY3RpdmUpIHtcbiAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgIHRoaXMudXBkYXRlVGl0bGUocmVzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgJ292ZXJyaWRlJzpcbiAgICAgICAgICBpZiAocmVzPy5saXN0Py5sZW5ndGggPT09IHRoaXMubGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5nZW5MaXN0KHJlcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmkxOG5TcnYuY2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuc3J2LmluaXRlZCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZW5MaXN0KHsgYWN0aXZlOiAndGl0bGUnIH0pKTtcblxuICAgIHRoaXMuc3J2LmluaXQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW1AgaW4ga2V5b2YgdGhpc10/OiBTaW1wbGVDaGFuZ2UgfSAmIFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubWF4KSB0aGlzLnNydi5tYXggPSB0aGlzLm1heCE7XG4gICAgaWYgKGNoYW5nZXMuZXhjbHVkZXMpIHRoaXMuc3J2LmV4Y2x1ZGVzID0gdGhpcy5leGNsdWRlcyE7XG4gICAgaWYgKGNoYW5nZXMubW9kZSkgdGhpcy5zcnYubW9kZSA9IHRoaXMubW9kZTtcbiAgICBpZiAoY2hhbmdlcy5yb3V0ZVBhcmFtTWF0Y2hNb2RlKSB0aGlzLnNydi5yb3V0ZVBhcmFtTWF0Y2hNb2RlID0gdGhpcy5yb3V0ZVBhcmFtTWF0Y2hNb2RlO1xuICAgIGlmIChjaGFuZ2VzLmtlZXBpbmdTY3JvbGwpIHtcbiAgICAgIHRoaXMuc3J2LmtlZXBpbmdTY3JvbGwgPSB0aGlzLmtlZXBpbmdTY3JvbGw7XG4gICAgICB0aGlzLnNydi5rZWVwaW5nU2Nyb2xsQ29udGFpbmVyID0gdGhpcy5fa2VlcGluZ1Njcm9sbENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICB0aGlzLnNydi5kZWJ1ZyA9IHRoaXMuZGVidWc7XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGRlc3Ryb3kkIH0gPSB0aGlzO1xuICAgIGRlc3Ryb3kkLm5leHQoKTtcbiAgICBkZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iLCI8bnotdGFic2V0XG4gICN0YWJzZXRcbiAgW256U2VsZWN0ZWRJbmRleF09XCJwb3NcIlxuICBbbnpBbmltYXRlZF09XCJmYWxzZVwiXG4gIFtuelR5cGVdPVwidGFiVHlwZVwiXG4gIFtuelRhYkJhckV4dHJhQ29udGVudF09XCJ0YWJCYXJFeHRyYUNvbnRlbnRcIlxuICBbbnpUYWJCYXJHdXR0ZXJdPVwidGFiQmFyR3V0dGVyXCJcbiAgW256VGFiQmFyU3R5bGVdPVwidGFiQmFyU3R5bGVcIlxuPlxuICA8bnotdGFiICpuZ0Zvcj1cImxldCBpIG9mIGxpc3Q7IGxldCBpbmRleCA9IGluZGV4XCIgW256VGl0bGVdPVwidGl0bGVUZW1wbGF0ZVwiIChuekNsaWNrKT1cIl90byhpbmRleClcIj5cbiAgICA8bmctdGVtcGxhdGUgI3RpdGxlVGVtcGxhdGU+XG4gICAgICA8ZGl2XG4gICAgICAgIFtyZXVzZS10YWItY29udGV4dC1tZW51XT1cImlcIlxuICAgICAgICBbY3VzdG9tQ29udGV4dE1lbnVdPVwiY3VzdG9tQ29udGV4dE1lbnVcIlxuICAgICAgICBjbGFzcz1cInJldXNlLXRhYl9fbmFtZVwiXG4gICAgICAgIFthdHRyLnRpdGxlXT1cImkudGl0bGVcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBbY2xhc3MucmV1c2UtdGFiX19uYW1lLXdpZHRoXT1cInRhYk1heFdpZHRoXCIgW3N0eWxlLm1heC13aWR0aC5weF09XCJ0YWJNYXhXaWR0aFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0lmPVwidGl0bGVSZW5kZXI7IGVsc2UgZGVmYXVsdFRpdGxlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRpdGxlUmVuZGVyXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogaSB9XCJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGl0bGU+e3sgaS50aXRsZSB9fTwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGkgKm5nSWY9XCJpLmNsb3NhYmxlXCIgbnotaWNvbiBuelR5cGU9XCJjbG9zZVwiIGNsYXNzPVwicmV1c2UtdGFiX19vcFwiIChjbGljayk9XCJfY2xvc2UoJGV2ZW50LCBpbmRleCwgZmFsc2UpXCI+PC9pPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbnotdGFiPlxuPC9uei10YWJzZXQ+XG48cmV1c2UtdGFiLWNvbnRleHQgW2kxOG5dPVwiaTE4blwiIChjaGFuZ2UpPVwiY29udGV4dE1lbnVDaGFuZ2UoJGV2ZW50KVwiPjwvcmV1c2UtdGFiLWNvbnRleHQ+XG4iXX0=