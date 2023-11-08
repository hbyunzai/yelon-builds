import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, Inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { filter } from 'rxjs';
import { InputBoolean } from '@yelon/util';
import { updateHostClass } from '@yelon/util/browser';
import { LayoutDefaultHeaderItemComponent } from './layout-header-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "ng-zorro-antd/message";
import * as i3 from "@yelon/theme";
import * as i4 from "./layout.service";
import * as i5 from "./layout-display.service";
import * as i6 from "@angular/common";
import * as i7 from "ng-zorro-antd/icon";
import * as i8 from "./layout-nav.component";
import * as i9 from "./layout-header.component";
export class LayoutDefaultComponent {
    get opt() {
        return this.srv.options;
    }
    set options(value) {
        this.srv.setOptions(value);
    }
    get showFetching() {
        if (this.fetchingStrictly)
            return this.fetching;
        return this.isFetching;
    }
    get contentStyle() {
        return {
            'margin-top': !this.displayNav ? '0px' : '',
            'margin-left': !this.displayAside ? '0px' : ''
        };
    }
    get asideStyle() {
        return {
            'margin-top': !this.displayNav ? '0px' : ''
        };
    }
    get collapsed() {
        return this.settings.layout.collapsed;
    }
    get collapsedIcon() {
        return this.srv.collapsedIcon;
    }
    toggleCollapsed() {
        this.srv.toggleCollapsed();
    }
    constructor(router, msgSrv, settings, el, renderer, doc, srv, layoutDisplayService) {
        this.msgSrv = msgSrv;
        this.settings = settings;
        this.el = el;
        this.renderer = renderer;
        this.doc = doc;
        this.srv = srv;
        this.layoutDisplayService = layoutDisplayService;
        this.asideUser = null;
        this.asideBottom = null;
        this.nav = null;
        this.content = null;
        this.fetchingStrictly = false;
        this.fetching = false;
        this.displayNav = true;
        this.displayAside = true;
        this.isFetching = false;
        router.events
            .pipe(takeUntilDestroyed(), filter(() => !this.fetchingStrictly))
            .subscribe(ev => this.processEv(ev));
        this.srv.options$.pipe(takeUntilDestroyed()).subscribe(() => this.setClass());
        this.settings.notify.pipe(takeUntilDestroyed()).subscribe(() => this.setClass());
    }
    ngOnInit() {
        this.layoutDisplayService.listen('nav', display => {
            this.displayNav = display;
        });
        this.layoutDisplayService.listen('aside', display => {
            this.displayAside = display;
        });
    }
    processEv(ev) {
        if (!this.isFetching && ev instanceof RouteConfigLoadStart) {
            this.isFetching = true;
        }
        if (ev instanceof NavigationError || ev instanceof NavigationCancel) {
            this.isFetching = false;
            const err = this.customError === null ? null : this.customError ?? `Could not load ${ev.url} route`;
            if (err && ev instanceof NavigationError) {
                this.msgSrv.error(err, { nzDuration: 1000 * 3 });
            }
            return;
        }
        if (!(ev instanceof NavigationEnd || ev instanceof RouteConfigLoadEnd)) {
            return;
        }
        if (this.isFetching) {
            setTimeout(() => {
                this.isFetching = false;
            }, 100);
        }
    }
    setClass() {
        const { el, doc, renderer, settings } = this;
        const layout = settings.layout;
        updateHostClass(el.nativeElement, renderer, {
            ['yunzai-default']: true,
            [`yunzai-default__fixed`]: layout.fixed,
            [`yunzai-default__collapsed`]: layout.collapsed,
            [`yunzai-default__hide-aside`]: this.opt.hideAside,
            [`yunzai-default__hide-header`]: this.opt.hideHeader
        });
        doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutDefaultComponent, deps: [{ token: i1.Router }, { token: i2.NzMessageService }, { token: i3.SettingsService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }, { token: i4.LayoutDefaultService }, { token: i5.LayoutDisplayService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LayoutDefaultComponent, selector: "layout-default", inputs: { options: "options", asideUser: "asideUser", asideBottom: "asideBottom", nav: "nav", content: "content", customError: "customError", fetchingStrictly: "fetchingStrictly", fetching: "fetching" }, queries: [{ propertyName: "headerItems", predicate: LayoutDefaultHeaderItemComponent }], exportAs: ["layoutDefault"], ngImport: i0, template: `
    <div class="yunzai-default__progress-bar" *ngIf="showFetching"></div>
    <layout-default-header *ngIf="!opt.hideHeader && displayNav" [items]="headerItems"></layout-default-header>
    <ng-container *ngIf="displayAside">
      <div *ngIf="!opt.hideAside" class="yunzai-default__aside" [ngStyle]="asideStyle">
        <div class="yunzai-default__aside-wrap">
          <div class="yunzai-default__aside-inner">
            <ng-container *ngTemplateOutlet="asideUser"></ng-container>
            <ng-container *ngTemplateOutlet="nav"></ng-container>
            <layout-default-nav *ngIf="!nav"></layout-default-nav>
          </div>
          <div *ngIf="opt.showSiderCollapse" class="yunzai-default__aside-link">
            <ng-container *ngIf="asideBottom === null; else asideBottom">
              <div class="yunzai-default__aside-link-collapsed" (click)="toggleCollapsed()">
                <span nz-icon [nzType]="collapsedIcon"></span>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-container>
    <section class="yunzai-default__content" [ngStyle]="contentStyle">
      <ng-container *ngTemplateOutlet="content"></ng-container>
      <ng-content></ng-content>
    </section>
  `, isInline: true, dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i6.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i8.LayoutDefaultNavComponent, selector: "layout-default-nav", inputs: ["disabledAcl", "autoCloseUnderPad", "recursivePath", "openStrictly", "maxLevelIcon"], outputs: ["select"] }, { kind: "component", type: i9.LayoutDefaultHeaderComponent, selector: "layout-default-header", inputs: ["items"] }] }); }
}
__decorate([
    InputBoolean()
], LayoutDefaultComponent.prototype, "fetchingStrictly", void 0);
__decorate([
    InputBoolean()
], LayoutDefaultComponent.prototype, "fetching", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'layout-default',
                    exportAs: 'layoutDefault',
                    template: `
    <div class="yunzai-default__progress-bar" *ngIf="showFetching"></div>
    <layout-default-header *ngIf="!opt.hideHeader && displayNav" [items]="headerItems"></layout-default-header>
    <ng-container *ngIf="displayAside">
      <div *ngIf="!opt.hideAside" class="yunzai-default__aside" [ngStyle]="asideStyle">
        <div class="yunzai-default__aside-wrap">
          <div class="yunzai-default__aside-inner">
            <ng-container *ngTemplateOutlet="asideUser"></ng-container>
            <ng-container *ngTemplateOutlet="nav"></ng-container>
            <layout-default-nav *ngIf="!nav"></layout-default-nav>
          </div>
          <div *ngIf="opt.showSiderCollapse" class="yunzai-default__aside-link">
            <ng-container *ngIf="asideBottom === null; else asideBottom">
              <div class="yunzai-default__aside-link-collapsed" (click)="toggleCollapsed()">
                <span nz-icon [nzType]="collapsedIcon"></span>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-container>
    <section class="yunzai-default__content" [ngStyle]="contentStyle">
      <ng-container *ngTemplateOutlet="content"></ng-container>
      <ng-content></ng-content>
    </section>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.NzMessageService }, { type: i3.SettingsService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i4.LayoutDefaultService }, { type: i5.LayoutDisplayService }]; }, propDecorators: { headerItems: [{
                type: ContentChildren,
                args: [LayoutDefaultHeaderItemComponent, { descendants: false }]
            }], options: [{
                type: Input
            }], asideUser: [{
                type: Input
            }], asideBottom: [{
                type: Input
            }], nav: [{
                type: Input
            }], content: [{
                type: Input
            }], customError: [{
                type: Input
            }], fetchingStrictly: [{
                type: Input
            }], fetching: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFFZixNQUFNLEVBQ04sS0FBSyxFQUtOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRTlELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBR3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUc1QixPQUFPLEVBQWUsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUtwRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7Ozs7QUFrQ2hGLE1BQU0sT0FBTyxzQkFBc0I7SUFPakMsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFDSSxPQUFPLENBQUMsS0FBOEM7UUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQWNELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLGdCQUFnQjtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksWUFBWTtR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bW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5cbmltcG9ydCB7XG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIE5hdmlnYXRpb25FcnJvcixcbiAgUm91dGVDb25maWdMb2FkRW5kLFxuICBSb3V0ZUNvbmZpZ0xvYWRTdGFydCxcbiAgUm91dGVyLFxuICBFdmVudFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBJbnB1dEJvb2xlYW59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7dXBkYXRlSG9zdENsYXNzfSBmcm9tICdAeWVsb24vdXRpbC9icm93c2VyJztcbmltcG9ydCB0eXBlIHtOelNhZmVBbnl9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQge056TWVzc2FnZVNlcnZpY2V9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7TGF5b3V0RGlzcGxheVNlcnZpY2V9IGZyb20gJy4vbGF5b3V0LWRpc3BsYXkuc2VydmljZSc7XG5pbXBvcnQge0xheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50fSBmcm9tICcuL2xheW91dC1oZWFkZXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHtMYXlvdXREZWZhdWx0U2VydmljZX0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQge0xheW91dERlZmF1bHRPcHRpb25zfSBmcm9tICcuL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGF5b3V0LWRlZmF1bHQnLFxuICBleHBvcnRBczogJ2xheW91dERlZmF1bHQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fcHJvZ3Jlc3MtYmFyXCIgKm5nSWY9XCJzaG93RmV0Y2hpbmdcIj48L2Rpdj5cbiAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyICpuZ0lmPVwiIW9wdC5oaWRlSGVhZGVyICYmIGRpc3BsYXlOYXZcIiBbaXRlbXNdPVwiaGVhZGVySXRlbXNcIj48L2xheW91dC1kZWZhdWx0LWhlYWRlcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheUFzaWRlXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIW9wdC5oaWRlQXNpZGVcIiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZVwiIFtuZ1N0eWxlXT1cImFzaWRlU3R5bGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS13cmFwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19hc2lkZS1pbm5lclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImFzaWRlVXNlclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdlwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPGxheW91dC1kZWZhdWx0LW5hdiAqbmdJZj1cIiFuYXZcIj48L2xheW91dC1kZWZhdWx0LW5hdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0LnNob3dTaWRlckNvbGxhcHNlXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtbGlua1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFzaWRlQm90dG9tID09PSBudWxsOyBlbHNlIGFzaWRlQm90dG9tXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtbGluay1jb2xsYXBzZWRcIiAoY2xpY2spPVwidG9nZ2xlQ29sbGFwc2VkKClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBuei1pY29uIFtuelR5cGVdPVwiY29sbGFwc2VkSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8c2VjdGlvbiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19jb250ZW50XCIgW25nU3R5bGVdPVwiY29udGVudFN0eWxlXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXREZWZhdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZldGNoaW5nU3RyaWN0bHk6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZldGNoaW5nOiBCb29sZWFuSW5wdXQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIGhlYWRlckl0ZW1zITogUXVlcnlMaXN0PExheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50PjtcblxuICBnZXQgb3B0KCk6IExheW91dERlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5zcnYub3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHZhbHVlOiBMYXlvdXREZWZhdWx0T3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnNydi5zZXRPcHRpb25zKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGFzaWRlVXNlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYXNpZGVCb3R0b206IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbmF2OiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50OiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjdXN0b21FcnJvcj86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBmZXRjaGluZ1N0cmljdGx5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBmZXRjaGluZyA9IGZhbHNlO1xuICBkaXNwbGF5TmF2ID0gdHJ1ZTtcbiAgZGlzcGxheUFzaWRlID0gdHJ1ZTtcblxuICBwcml2YXRlIGlzRmV0Y2hpbmcgPSBmYWxzZTtcblxuICBnZXQgc2hvd0ZldGNoaW5nKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmZldGNoaW5nU3RyaWN0bHkpIHJldHVybiB0aGlzLmZldGNoaW5nO1xuICAgIHJldHVybiB0aGlzLmlzRmV0Y2hpbmc7XG4gIH1cblxuICBnZXQgY29udGVudFN0eWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdtYXJnaW4tdG9wJzogIXRoaXMuZGlzcGxheU5hdiA/ICcwcHgnIDogJycsXG4gICAgICAnbWFyZ2luLWxlZnQnOiAhdGhpcy5kaXNwbGF5QXNpZGUgPyAnMHB4JyA6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGdldCBhc2lkZVN0eWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdtYXJnaW4tdG9wJzogIXRoaXMuZGlzcGxheU5hdiA/ICcwcHgnIDogJydcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5sYXlvdXQuY29sbGFwc2VkO1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zcnYuY29sbGFwc2VkSWNvbjtcbiAgfVxuXG4gIHRvZ2dsZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNydi50b2dnbGVDb2xsYXBzZWQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgbXNnU3J2OiBOek1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzU2VydmljZSxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogTnpTYWZlQW55LFxuICAgIHByaXZhdGUgc3J2OiBMYXlvdXREZWZhdWx0U2VydmljZSxcbiAgICBwcml2YXRlIGxheW91dERpc3BsYXlTZXJ2aWNlOiBMYXlvdXREaXNwbGF5U2VydmljZVxuICApIHtcbiAgICByb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKCksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5mZXRjaGluZ1N0cmljdGx5KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShldiA9PiB0aGlzLnByb2Nlc3NFdihldikpO1xuICAgIHRoaXMuc3J2Lm9wdGlvbnMkLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldENsYXNzKCkpO1xuICAgIHRoaXMuc2V0dGluZ3Mubm90aWZ5LnBpcGUodGFrZVVudGlsRGVzdHJveWVkKCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldENsYXNzKCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ25hdicsIGRpc3BsYXkgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5TmF2ID0gZGlzcGxheTtcbiAgICB9KTtcbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbignYXNpZGUnLCBkaXNwbGF5ID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUFzaWRlID0gZGlzcGxheTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2Nlc3NFdihldjogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNGZXRjaGluZyAmJiBldiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnTG9hZFN0YXJ0KSB7XG4gICAgICB0aGlzLmlzRmV0Y2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IgfHwgZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsKSB7XG4gICAgICB0aGlzLmlzRmV0Y2hpbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGVyciA9IHRoaXMuY3VzdG9tRXJyb3IgPT09IG51bGwgPyBudWxsIDogdGhpcy5jdXN0b21FcnJvciA/PyBgQ291bGQgbm90IGxvYWQgJHtldi51cmx9IHJvdXRlYDtcbiAgICAgIGlmIChlcnIgJiYgZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5tc2dTcnYuZXJyb3IoZXJyLCB7bnpEdXJhdGlvbjogMTAwMCAqIDN9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IGV2IGluc3RhbmNlb2YgUm91dGVDb25maWdMb2FkRW5kKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZldGNoaW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3Qge2VsLCBkb2MsIHJlbmRlcmVyLCBzZXR0aW5nc30gPSB0aGlzO1xuICAgIGNvbnN0IGxheW91dCA9IHNldHRpbmdzLmxheW91dDtcbiAgICB1cGRhdGVIb3N0Q2xhc3MoZWwubmF0aXZlRWxlbWVudCwgcmVuZGVyZXIsIHtcbiAgICAgIFsneXVuemFpLWRlZmF1bHQnXTogdHJ1ZSxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2ZpeGVkYF06IGxheW91dC5maXhlZCxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2NvbGxhcHNlZGBdOiBsYXlvdXQuY29sbGFwc2VkLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9faGlkZS1hc2lkZWBdOiB0aGlzLm9wdC5oaWRlQXNpZGUsXG4gICAgICBbYHl1bnphaS1kZWZhdWx0X19oaWRlLWhlYWRlcmBdOiB0aGlzLm9wdC5oaWRlSGVhZGVyXG4gICAgfSk7XG5cbiAgICBkb2MuYm9keS5jbGFzc0xpc3RbbGF5b3V0LmNvbG9yV2VhayA/ICdhZGQnIDogJ3JlbW92ZSddKCdjb2xvci13ZWFrJyk7XG4gIH1cblxufVxuIl19