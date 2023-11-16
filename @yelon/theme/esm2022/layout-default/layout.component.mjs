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
    <layout-default-header *ngIf="!opt.hideHeader && displayNav" [items]="headerItems" />
    <ng-container *ngIf="displayAside">
      <div *ngIf="!opt.hideAside" class="yunzai-default__aside" [ngStyle]="asideStyle">
        <div class="yunzai-default__aside-wrap">
          <div class="yunzai-default__aside-inner">
            <ng-container *ngTemplateOutlet="asideUser" />
            <ng-container *ngTemplateOutlet="nav" />
            <layout-default-nav *ngIf="!nav" />
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
      <ng-container *ngTemplateOutlet="content" />
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
    <layout-default-header *ngIf="!opt.hideHeader && displayNav" [items]="headerItems" />
    <ng-container *ngIf="displayAside">
      <div *ngIf="!opt.hideAside" class="yunzai-default__aside" [ngStyle]="asideStyle">
        <div class="yunzai-default__aside-wrap">
          <div class="yunzai-default__aside-inner">
            <ng-container *ngTemplateOutlet="asideUser" />
            <ng-container *ngTemplateOutlet="nav" />
            <layout-default-nav *ngIf="!nav" />
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
      <ng-container *ngTemplateOutlet="content" />
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFFZixNQUFNLEVBQ04sS0FBSyxFQUtOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBR3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc5QixPQUFPLEVBQWdCLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLdEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7O0FBa0NsRixNQUFNLE9BQU8sc0JBQXNCO0lBT2pDLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQ0ksT0FBTyxDQUFDLEtBQThDO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFjRCxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFlBQVk7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Y29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7XG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIE5hdmlnYXRpb25FcnJvcixcbiAgUm91dGVDb25maWdMb2FkRW5kLFxuICBSb3V0ZUNvbmZpZ0xvYWRTdGFydCxcbiAgUm91dGVyLFxuICBFdmVudFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNldHRpbmdzU2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIElucHV0Qm9vbGVhbiB9IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IHVwZGF0ZUhvc3RDbGFzcyB9IGZyb20gJ0B5ZWxvbi91dGlsL2Jyb3dzZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7IExheW91dERpc3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQtZGlzcGxheS5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtaGVhZGVyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IExheW91dERlZmF1bHRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsYXlvdXQtZGVmYXVsdCcsXG4gIGV4cG9ydEFzOiAnbGF5b3V0RGVmYXVsdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19wcm9ncmVzcy1iYXJcIiAqbmdJZj1cInNob3dGZXRjaGluZ1wiPjwvZGl2PlxuICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXIgKm5nSWY9XCIhb3B0LmhpZGVIZWFkZXIgJiYgZGlzcGxheU5hdlwiIFtpdGVtc109XCJoZWFkZXJJdGVtc1wiIC8+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlBc2lkZVwiPlxuICAgICAgPGRpdiAqbmdJZj1cIiFvcHQuaGlkZUFzaWRlXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGVcIiBbbmdTdHlsZV09XCJhc2lkZVN0eWxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtd3JhcFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtaW5uZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJhc2lkZVVzZXJcIiAvPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdlwiIC8+XG4gICAgICAgICAgICA8bGF5b3V0LWRlZmF1bHQtbmF2ICpuZ0lmPVwiIW5hdlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdC5zaG93U2lkZXJDb2xsYXBzZVwiIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLWxpbmtcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhc2lkZUJvdHRvbSA9PT0gbnVsbDsgZWxzZSBhc2lkZUJvdHRvbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLWxpbmstY29sbGFwc2VkXCIgKGNsaWNrKT1cInRvZ2dsZUNvbGxhcHNlZCgpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gbnotaWNvbiBbbnpUeXBlXT1cImNvbGxhcHNlZEljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fY29udGVudFwiIFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIiAvPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXREZWZhdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZldGNoaW5nU3RyaWN0bHk6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZldGNoaW5nOiBCb29sZWFuSW5wdXQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSlcbiAgaGVhZGVySXRlbXMhOiBRdWVyeUxpc3Q8TGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1Db21wb25lbnQ+O1xuXG4gIGdldCBvcHQoKTogTGF5b3V0RGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnNydi5vcHRpb25zO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModmFsdWU6IExheW91dERlZmF1bHRPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuc3J2LnNldE9wdGlvbnModmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgYXNpZGVVc2VyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBhc2lkZUJvdHRvbTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuYXY6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGN1c3RvbUVycm9yPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGZldGNoaW5nU3RyaWN0bHkgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGZldGNoaW5nID0gZmFsc2U7XG4gIGRpc3BsYXlOYXYgPSB0cnVlO1xuICBkaXNwbGF5QXNpZGUgPSB0cnVlO1xuXG4gIHByaXZhdGUgaXNGZXRjaGluZyA9IGZhbHNlO1xuXG4gIGdldCBzaG93RmV0Y2hpbmcoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZmV0Y2hpbmdTdHJpY3RseSkgcmV0dXJuIHRoaXMuZmV0Y2hpbmc7XG4gICAgcmV0dXJuIHRoaXMuaXNGZXRjaGluZztcbiAgfVxuXG4gIGdldCBjb250ZW50U3R5bGUoKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21hcmdpbi10b3AnOiAhdGhpcy5kaXNwbGF5TmF2ID8gJzBweCcgOiAnJyxcbiAgICAgICdtYXJnaW4tbGVmdCc6ICF0aGlzLmRpc3BsYXlBc2lkZSA/ICcwcHgnIDogJydcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGFzaWRlU3R5bGUoKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21hcmdpbi10b3AnOiAhdGhpcy5kaXNwbGF5TmF2ID8gJzBweCcgOiAnJ1xuICAgIH07XG4gIH1cblxuICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmxheW91dC5jb2xsYXBzZWQ7XG4gIH1cblxuICBnZXQgY29sbGFwc2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNydi5jb2xsYXBzZWRJY29uO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2VkKCk6IHZvaWQge1xuICAgIHRoaXMuc3J2LnRvZ2dsZUNvbGxhcHNlZCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBtc2dTcnY6IE56TWVzc2FnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnksXG4gICAgcHJpdmF0ZSBzcnY6IExheW91dERlZmF1bHRTZXJ2aWNlLFxuICAgIHByaXZhdGUgbGF5b3V0RGlzcGxheVNlcnZpY2U6IExheW91dERpc3BsYXlTZXJ2aWNlXG4gICkge1xuICAgIHJvdXRlci5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQoKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmZldGNoaW5nU3RyaWN0bHkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ID0+IHRoaXMucHJvY2Vzc0V2KGV2KSk7XG4gICAgdGhpcy5zcnYub3B0aW9ucyQucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQoKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0Q2xhc3MoKSk7XG4gICAgdGhpcy5zZXR0aW5ncy5ub3RpZnkucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQoKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0Q2xhc3MoKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxheW91dERpc3BsYXlTZXJ2aWNlLmxpc3RlbignbmF2JywgZGlzcGxheSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXlOYXYgPSBkaXNwbGF5O1xuICAgIH0pO1xuICAgIHRoaXMubGF5b3V0RGlzcGxheVNlcnZpY2UubGlzdGVuKCdhc2lkZScsIGRpc3BsYXkgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5QXNpZGUgPSBkaXNwbGF5O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc0V2KGV2OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0ZldGNoaW5nICYmIGV2IGluc3RhbmNlb2YgUm91dGVDb25maWdMb2FkU3RhcnQpIHtcbiAgICAgIHRoaXMuaXNGZXRjaGluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvciB8fCBldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25DYW5jZWwpIHtcbiAgICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgICAgY29uc3QgZXJyID0gdGhpcy5jdXN0b21FcnJvciA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLmN1c3RvbUVycm9yID8/IGBDb3VsZCBub3QgbG9hZCAke2V2LnVybH0gcm91dGVgO1xuICAgICAgaWYgKGVyciAmJiBldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICB0aGlzLm1zZ1Nydi5lcnJvcihlcnIsIHsgbnpEdXJhdGlvbjogMTAwMCAqIDMgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fCBldiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnTG9hZEVuZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGZXRjaGluZykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENsYXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZWwsIGRvYywgcmVuZGVyZXIsIHNldHRpbmdzIH0gPSB0aGlzO1xuICAgIGNvbnN0IGxheW91dCA9IHNldHRpbmdzLmxheW91dDtcbiAgICB1cGRhdGVIb3N0Q2xhc3MoZWwubmF0aXZlRWxlbWVudCwgcmVuZGVyZXIsIHtcbiAgICAgIFsneXVuemFpLWRlZmF1bHQnXTogdHJ1ZSxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2ZpeGVkYF06IGxheW91dC5maXhlZCxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2NvbGxhcHNlZGBdOiBsYXlvdXQuY29sbGFwc2VkLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9faGlkZS1hc2lkZWBdOiB0aGlzLm9wdC5oaWRlQXNpZGUsXG4gICAgICBbYHl1bnphaS1kZWZhdWx0X19oaWRlLWhlYWRlcmBdOiB0aGlzLm9wdC5oaWRlSGVhZGVyXG4gICAgfSk7XG5cbiAgICBkb2MuYm9keS5jbGFzc0xpc3RbbGF5b3V0LmNvbG9yV2VhayA/ICdhZGQnIDogJ3JlbW92ZSddKCdjb2xvci13ZWFrJyk7XG4gIH1cbn1cbiJdfQ==