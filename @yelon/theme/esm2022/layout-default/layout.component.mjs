import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, Inject, Input, booleanAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { filter } from 'rxjs';
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
    get collapsed() {
        return this.settings.layout.collapsed;
    }
    get collapsedIcon() {
        return this.srv.collapsedIcon;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LayoutDefaultComponent, deps: [{ token: i1.Router }, { token: i2.NzMessageService }, { token: i3.SettingsService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }, { token: i4.LayoutDefaultService }, { token: i5.LayoutDisplayService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: LayoutDefaultComponent, selector: "layout-default", inputs: { options: "options", asideUser: "asideUser", asideBottom: "asideBottom", nav: "nav", content: "content", customError: "customError", fetchingStrictly: ["fetchingStrictly", "fetchingStrictly", booleanAttribute], fetching: ["fetching", "fetching", booleanAttribute] }, queries: [{ propertyName: "headerItems", predicate: LayoutDefaultHeaderItemComponent }], exportAs: ["layoutDefault"], ngImport: i0, template: `
    @if (showFetching) {
      <div class="yunzai-default__progress-bar"></div>
    }
    @if (!opt.hideHeader) {
      <layout-default-header [items]="headerItems" />
    }
    @if (!opt.hideAside) {
      <div class="yunzai-default__aside" [ngStyle]="asideStyle">
        <div class="yunzai-default__aside-wrap">
          <div class="yunzai-default__aside-inner">
            <ng-container *ngTemplateOutlet="asideUser" />
            <ng-container *ngTemplateOutlet="nav" />
            @if (!nav) {
              <layout-default-nav />
            }
          </div>
          @if (opt.showSiderCollapse) {
            <div class="yunzai-default__aside-link">
              @if (asideBottom) {
                <ng-container *ngTemplateOutlet="asideBottom" />
              } @else {
                <div class="yunzai-default__aside-link-collapsed" (click)="toggleCollapsed()">
                  <span nz-icon [nzType]="collapsedIcon"></span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
    <section class="yunzai-default__content" [ngStyle]="contentStyle">
      <ng-container *ngTemplateOutlet="content" />
      <ng-content />
    </section>
  `, isInline: true, dependencies: [{ kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i6.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: i8.LayoutDefaultNavComponent, selector: "layout-default-nav", inputs: ["disabledAcl", "autoCloseUnderPad", "recursivePath", "hideEmptyChildren", "openStrictly", "maxLevelIcon"], outputs: ["select"] }, { kind: "component", type: i9.LayoutDefaultHeaderComponent, selector: "layout-default-header", inputs: ["items"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LayoutDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'layout-default',
                    exportAs: 'layoutDefault',
                    template: `
    @if (showFetching) {
      <div class="yunzai-default__progress-bar"></div>
    }
    @if (!opt.hideHeader) {
      <layout-default-header [items]="headerItems" />
    }
    @if (!opt.hideAside) {
      <div class="yunzai-default__aside" [ngStyle]="asideStyle">
        <div class="yunzai-default__aside-wrap">
          <div class="yunzai-default__aside-inner">
            <ng-container *ngTemplateOutlet="asideUser" />
            <ng-container *ngTemplateOutlet="nav" />
            @if (!nav) {
              <layout-default-nav />
            }
          </div>
          @if (opt.showSiderCollapse) {
            <div class="yunzai-default__aside-link">
              @if (asideBottom) {
                <ng-container *ngTemplateOutlet="asideBottom" />
              } @else {
                <div class="yunzai-default__aside-link-collapsed" (click)="toggleCollapsed()">
                  <span nz-icon [nzType]="collapsedIcon"></span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
    <section class="yunzai-default__content" [ngStyle]="contentStyle">
      <ng-container *ngTemplateOutlet="content" />
      <ng-content />
    </section>
  `
                }]
        }], ctorParameters: () => [{ type: i1.Router }, { type: i2.NzMessageService }, { type: i3.SettingsService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i4.LayoutDefaultService }, { type: i5.LayoutDisplayService }], propDecorators: { headerItems: [{
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
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], fetching: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLE1BQU0sRUFDTixLQUFLLEVBSUwsZ0JBQWdCLEVBRWpCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBR3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLdEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7O0FBNENsRixNQUFNLE9BQU8sc0JBQXNCO0lBSWpDLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQ0ksT0FBTyxDQUFDLEtBQThDO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFjRCxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMs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UyxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtcbiAgTmF2aWdhdGlvbkNhbmNlbCxcbiAgTmF2aWdhdGlvbkVuZCxcbiAgTmF2aWdhdGlvbkVycm9yLFxuICBSb3V0ZUNvbmZpZ0xvYWRFbmQsXG4gIFJvdXRlQ29uZmlnTG9hZFN0YXJ0LFxuICBSb3V0ZXIsXG4gIEV2ZW50XG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IHVwZGF0ZUhvc3RDbGFzcyB9IGZyb20gJ0B5ZWxvbi91dGlsL2Jyb3dzZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7IExheW91dERpc3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQtZGlzcGxheS5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtaGVhZGVyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IExheW91dERlZmF1bHRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsYXlvdXQtZGVmYXVsdCcsXG4gIGV4cG9ydEFzOiAnbGF5b3V0RGVmYXVsdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgQGlmIChzaG93RmV0Y2hpbmcpIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fcHJvZ3Jlc3MtYmFyXCI+PC9kaXY+XG4gICAgfVxuICAgIEBpZiAoIW9wdC5oaWRlSGVhZGVyKSB7XG4gICAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyIFtpdGVtc109XCJoZWFkZXJJdGVtc1wiIC8+XG4gICAgfVxuICAgIEBpZiAoIW9wdC5oaWRlQXNpZGUpIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGVcIiBbbmdTdHlsZV09XCJhc2lkZVN0eWxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtd3JhcFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtaW5uZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJhc2lkZVVzZXJcIiAvPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdlwiIC8+XG4gICAgICAgICAgICBAaWYgKCFuYXYpIHtcbiAgICAgICAgICAgICAgPGxheW91dC1kZWZhdWx0LW5hdiAvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIEBpZiAob3B0LnNob3dTaWRlckNvbGxhcHNlKSB7XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLWxpbmtcIj5cbiAgICAgICAgICAgICAgQGlmIChhc2lkZUJvdHRvbSkge1xuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJhc2lkZUJvdHRvbVwiIC8+XG4gICAgICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtbGluay1jb2xsYXBzZWRcIiAoY2xpY2spPVwidG9nZ2xlQ29sbGFwc2VkKClcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIG56LWljb24gW256VHlwZV09XCJjb2xsYXBzZWRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgfVxuICAgIDxzZWN0aW9uIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2NvbnRlbnRcIiBbbmdTdHlsZV09XCJjb250ZW50U3R5bGVcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50XCIgLz5cbiAgICAgIDxuZy1jb250ZW50IC8+XG4gICAgPC9zZWN0aW9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIExheW91dERlZmF1bHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkcmVuKExheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KVxuICBoZWFkZXJJdGVtcyE6IFF1ZXJ5TGlzdDxMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudD47XG5cbiAgZ2V0IG9wdCgpOiBMYXlvdXREZWZhdWx0T3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuc3J2Lm9wdGlvbnM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyh2YWx1ZTogTGF5b3V0RGVmYXVsdE9wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zcnYuc2V0T3B0aW9ucyh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBhc2lkZVVzZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGFzaWRlQm90dG9tOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5hdjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29udGVudDogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY3VzdG9tRXJyb3I/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZmV0Y2hpbmdTdHJpY3RseSA9IGZhbHNlO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZmV0Y2hpbmcgPSBmYWxzZTtcbiAgZGlzcGxheU5hdiA9IHRydWU7XG4gIGRpc3BsYXlBc2lkZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBpc0ZldGNoaW5nID0gZmFsc2U7XG5cbiAgZ2V0IHNob3dGZXRjaGluZygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5mZXRjaGluZ1N0cmljdGx5KSByZXR1cm4gdGhpcy5mZXRjaGluZztcbiAgICByZXR1cm4gdGhpcy5pc0ZldGNoaW5nO1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5sYXlvdXQuY29sbGFwc2VkO1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zcnYuY29sbGFwc2VkSWNvbjtcbiAgfVxuXG4gIGdldCBjb250ZW50U3R5bGUoKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21hcmdpbi10b3AnOiAhdGhpcy5kaXNwbGF5TmF2ID8gJzBweCcgOiAnJyxcbiAgICAgICdtYXJnaW4tbGVmdCc6ICF0aGlzLmRpc3BsYXlBc2lkZSA/ICcwcHgnIDogJydcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGFzaWRlU3R5bGUoKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21hcmdpbi10b3AnOiAhdGhpcy5kaXNwbGF5TmF2ID8gJzBweCcgOiAnJ1xuICAgIH07XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zcnYudG9nZ2xlQ29sbGFwc2VkKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIG1zZ1NydjogTnpNZXNzYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IE56U2FmZUFueSxcbiAgICBwcml2YXRlIHNydjogTGF5b3V0RGVmYXVsdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYXlvdXREaXNwbGF5U2VydmljZTogTGF5b3V0RGlzcGxheVNlcnZpY2VcbiAgKSB7XG4gICAgcm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCgpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZmV0Y2hpbmdTdHJpY3RseSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXYgPT4gdGhpcy5wcm9jZXNzRXYoZXYpKTtcbiAgICB0aGlzLnNydi5vcHRpb25zJC5waXBlKHRha2VVbnRpbERlc3Ryb3llZCgpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRDbGFzcygpKTtcbiAgICB0aGlzLnNldHRpbmdzLm5vdGlmeS5waXBlKHRha2VVbnRpbERlc3Ryb3llZCgpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRDbGFzcygpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCduYXYnLCBkaXNwbGF5ID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheU5hdiA9IGRpc3BsYXk7XG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXREaXNwbGF5U2VydmljZS5saXN0ZW4oJ2FzaWRlJywgZGlzcGxheSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXlBc2lkZSA9IGRpc3BsYXk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzRXYoZXY6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzRmV0Y2hpbmcgJiYgZXYgaW5zdGFuY2VvZiBSb3V0ZUNvbmZpZ0xvYWRTdGFydCkge1xuICAgICAgdGhpcy5pc0ZldGNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8IGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbCkge1xuICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBlcnIgPSB0aGlzLmN1c3RvbUVycm9yID09PSBudWxsID8gbnVsbCA6IHRoaXMuY3VzdG9tRXJyb3IgPz8gYENvdWxkIG5vdCBsb2FkICR7ZXYudXJsfSByb3V0ZWA7XG4gICAgICBpZiAoZXJyICYmIGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIHRoaXMubXNnU3J2LmVycm9yKGVyciwgeyBuekR1cmF0aW9uOiAxMDAwICogMyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IGV2IGluc3RhbmNlb2YgUm91dGVDb25maWdMb2FkRW5kKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZldGNoaW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3QgeyBlbCwgZG9jLCByZW5kZXJlciwgc2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgY29uc3QgbGF5b3V0ID0gc2V0dGluZ3MubGF5b3V0O1xuICAgIHVwZGF0ZUhvc3RDbGFzcyhlbC5uYXRpdmVFbGVtZW50LCByZW5kZXJlciwge1xuICAgICAgWyd5dW56YWktZGVmYXVsdCddOiB0cnVlLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9fZml4ZWRgXTogbGF5b3V0LmZpeGVkLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9fY29sbGFwc2VkYF06IGxheW91dC5jb2xsYXBzZWQsXG4gICAgICBbYHl1bnphaS1kZWZhdWx0X19oaWRlLWFzaWRlYF06IHRoaXMub3B0LmhpZGVBc2lkZSxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2hpZGUtaGVhZGVyYF06IHRoaXMub3B0LmhpZGVIZWFkZXJcbiAgICB9KTtcblxuICAgIGRvYy5ib2R5LmNsYXNzTGlzdFtsYXlvdXQuY29sb3JXZWFrID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ2NvbG9yLXdlYWsnKTtcbiAgfVxufVxuIl19