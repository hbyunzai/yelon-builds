import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, Inject, Input } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { updateHostClass } from '@yelon/util/browser';
import { LayoutDefaultHeaderItemComponent } from './layout-header-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./layout.service";
import * as i3 from "ng-zorro-antd/message";
import * as i4 from "@yelon/theme";
import * as i5 from "./layout-header.component";
import * as i6 from "./layout-nav.component";
import * as i7 from "@angular/common";
export class LayoutDefaultComponent {
    constructor(router, layoutService, msgSrv, settings, el, renderer, doc) {
        this.layoutService = layoutService;
        this.msgSrv = msgSrv;
        this.settings = settings;
        this.el = el;
        this.renderer = renderer;
        this.doc = doc;
        this.showHeader = true;
        this.showSidebar = true;
        this.asideUser = null;
        this.nav = null;
        this.content = null;
        this.destroy$ = new Subject();
        this.isFetching = false;
        router.events.pipe(takeUntil(this.destroy$)).subscribe(ev => this.processEv(ev));
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
            [`yunzai-default__hide-aside`]: this.options.hideAside
        });
        doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
    }
    ngOnInit() {
        this.options = {
            logoExpanded: `./assets/logo-full.svg`,
            logoCollapsed: `./assets/logo.svg`,
            logoLink: `/`,
            hideAside: false,
            ...this.options
        };
        const { settings, destroy$ } = this;
        settings.notify.pipe(takeUntil(destroy$)).subscribe(() => this.setClass());
        this.setClass();
        this.layoutService.header.subscribe(h => (this.showHeader = h));
        this.layoutService.sidebar.subscribe(s => (this.showSidebar = s));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
LayoutDefaultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: LayoutDefaultComponent, deps: [{ token: i1.Router }, { token: i2.LayoutService }, { token: i3.NzMessageService }, { token: i4.SettingsService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
LayoutDefaultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.3", type: LayoutDefaultComponent, selector: "layout-default", inputs: { options: "options", asideUser: "asideUser", nav: "nav", content: "content", customError: "customError" }, queries: [{ propertyName: "headerItems", predicate: LayoutDefaultHeaderItemComponent }], exportAs: ["layoutDefault"], ngImport: i0, template: `
    <div class="yunzai-default__progress-bar" *ngIf="isFetching"></div>
    <layout-default-header *ngIf="showHeader" [options]="options" [items]="headerItems"></layout-default-header>
    <ng-container *ngIf="showSidebar">
      <div
        class="yunzai-default__aside"
        *ngIf="!options.hideAside"
        [ngStyle]="!showHeader ? { 'margin-top': '0px' } : {}"
      >
        <div class="yunzai-default__aside-inner">
          <ng-container *ngTemplateOutlet="asideUser"></ng-container>
          <ng-container *ngTemplateOutlet="nav"></ng-container>
          <layout-default-nav *ngIf="!nav" class="d-block py-lg"></layout-default-nav>
        </div>
      </div>
    </ng-container>
    <section
      class="yunzai-default__content"
      [ngStyle]="{ 'margin-top': !showHeader ? '0px' : '', 'margin-left': !showSidebar ? '0px' : '' }"
    >
      <ng-container *ngTemplateOutlet="content"></ng-container>
      <ng-content></ng-content>
    </section>
  `, isInline: true, components: [{ type: i5.LayoutDefaultHeaderComponent, selector: "layout-default-header", inputs: ["items", "options"] }, { type: i6.LayoutDefaultNavComponent, selector: "layout-default-nav", inputs: ["disabledAcl", "autoCloseUnderPad", "recursivePath", "openStrictly", "maxLevelIcon"], outputs: ["select"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: LayoutDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'layout-default',
                    exportAs: 'layoutDefault',
                    template: `
    <div class="yunzai-default__progress-bar" *ngIf="isFetching"></div>
    <layout-default-header *ngIf="showHeader" [options]="options" [items]="headerItems"></layout-default-header>
    <ng-container *ngIf="showSidebar">
      <div
        class="yunzai-default__aside"
        *ngIf="!options.hideAside"
        [ngStyle]="!showHeader ? { 'margin-top': '0px' } : {}"
      >
        <div class="yunzai-default__aside-inner">
          <ng-container *ngTemplateOutlet="asideUser"></ng-container>
          <ng-container *ngTemplateOutlet="nav"></ng-container>
          <layout-default-nav *ngIf="!nav" class="d-block py-lg"></layout-default-nav>
        </div>
      </div>
    </ng-container>
    <section
      class="yunzai-default__content"
      [ngStyle]="{ 'margin-top': !showHeader ? '0px' : '', 'margin-left': !showSidebar ? '0px' : '' }"
    >
      <ng-container *ngTemplateOutlet="content"></ng-container>
      <ng-content></ng-content>
    </section>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.LayoutService }, { type: i3.NzMessageService }, { type: i4.SettingsService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { headerItems: [{
                type: ContentChildren,
                args: [LayoutDefaultHeaderItemComponent, { descendants: false }]
            }], options: [{
                type: Input
            }], asideUser: [{
                type: Input
            }], nav: [{
                type: Input
            }], content: [{
                type: Input
            }], customError: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLE1BQU0sRUFDTixLQUFLLEVBTU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixvQkFBb0IsRUFHckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJdEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7OztBQWdDbEYsTUFBTSxPQUFPLHNCQUFzQjtJQWdCakMsWUFDRSxNQUFjLEVBQ04sYUFBNEIsRUFDNUIsTUFBd0IsRUFDeEIsUUFBeUIsRUFDekIsRUFBYyxFQUNkLFFBQW1CLEVBQ0QsR0FBYztRQUxoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUN6QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNELFFBQUcsR0FBSCxHQUFHLENBQVc7UUFuQjFDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHbkIsY0FBUyxHQUE2QixJQUFJLENBQUM7UUFDM0MsUUFBRyxHQUE2QixJQUFJLENBQUM7UUFDckMsWUFBTyxHQUE2QixJQUFJLENBQUM7UUFHMUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdkMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVdqQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxTQUFTLENBQUMsRUFBUztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLFlBQVksb0JBQW9CLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUFJLEVBQUUsWUFBWSxlQUFlLElBQUksRUFBRSxZQUFZLGdCQUFnQixFQUFFO1lBQ25FLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUNwRyxJQUFJLEdBQUcsSUFBSSxFQUFFLFlBQVksZUFBZSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksYUFBYSxJQUFJLEVBQUUsWUFBWSxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3RFLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQztJQUVPLFFBQVE7UUFDZCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDL0IsZUFBZSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFO1lBQzFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJO1lBQ3hCLENBQUMsdUJBQXVCLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSztZQUN2QyxDQUFDLDJCQUEyQixDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDL0MsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFRLENBQUMsU0FBUztTQUN4RCxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFlBQVksRUFBRSx3QkFBd0I7WUFDdEMsYUFBYSxFQUFFLG1CQUFtQjtZQUNsQyxRQUFRLEVBQUUsR0FBRztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEdBQUcsSUFBSSxDQUFDLE9BQU87U0FDaEIsQ0FBQztRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7bUhBakZVLHNCQUFzQix1TEF1QnZCLFFBQVE7dUdBdkJQLHNCQUFzQixzTUFDaEIsZ0NBQWdDLDBEQTFCdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUOzJGQUVVLHNCQUFzQjtrQkE1QmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7aUJBQ0Y7OzBCQXdCSSxNQUFNOzJCQUFDLFFBQVE7NENBckJsQixXQUFXO3NCQURWLGVBQWU7dUJBQUMsZ0NBQWdDLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO2dCQU1oRSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIE5hdmlnYXRpb25FcnJvcixcbiAgUm91dGVDb25maWdMb2FkRW5kLFxuICBSb3V0ZUNvbmZpZ0xvYWRTdGFydCxcbiAgUm91dGVyLFxuICBFdmVudFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgdXBkYXRlSG9zdENsYXNzIH0gZnJvbSAnQHllbG9uL3V0aWwvYnJvd3Nlcic7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOek1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcblxuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xheW91dC1oZWFkZXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4vbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGF5b3V0LWRlZmF1bHQnLFxuICBleHBvcnRBczogJ2xheW91dERlZmF1bHQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fcHJvZ3Jlc3MtYmFyXCIgKm5nSWY9XCJpc0ZldGNoaW5nXCI+PC9kaXY+XG4gICAgPGxheW91dC1kZWZhdWx0LWhlYWRlciAqbmdJZj1cInNob3dIZWFkZXJcIiBbb3B0aW9uc109XCJvcHRpb25zXCIgW2l0ZW1zXT1cImhlYWRlckl0ZW1zXCI+PC9sYXlvdXQtZGVmYXVsdC1oZWFkZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dTaWRlYmFyXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlXCJcbiAgICAgICAgKm5nSWY9XCIhb3B0aW9ucy5oaWRlQXNpZGVcIlxuICAgICAgICBbbmdTdHlsZV09XCIhc2hvd0hlYWRlciA/IHsgJ21hcmdpbi10b3AnOiAnMHB4JyB9IDoge31cIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLWlubmVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImFzaWRlVXNlclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuYXZcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bGF5b3V0LWRlZmF1bHQtbmF2ICpuZ0lmPVwiIW5hdlwiIGNsYXNzPVwiZC1ibG9jayBweS1sZ1wiPjwvbGF5b3V0LWRlZmF1bHQtbmF2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzZWN0aW9uXG4gICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19jb250ZW50XCJcbiAgICAgIFtuZ1N0eWxlXT1cInsgJ21hcmdpbi10b3AnOiAhc2hvd0hlYWRlciA/ICcwcHgnIDogJycsICdtYXJnaW4tbGVmdCc6ICFzaG93U2lkZWJhciA/ICcwcHgnIDogJycgfVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NlY3Rpb24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0RGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSlcbiAgaGVhZGVySXRlbXMhOiBRdWVyeUxpc3Q8TGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1Db21wb25lbnQ+O1xuXG4gIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuICBzaG93U2lkZWJhcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgb3B0aW9ucyE6IExheW91dERlZmF1bHRPcHRpb25zO1xuICBASW5wdXQoKSBhc2lkZVVzZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5hdjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29udGVudDogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY3VzdG9tRXJyb3I/OiBzdHJpbmcgfCBudWxsO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBpc0ZldGNoaW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBsYXlvdXRTZXJ2aWNlOiBMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgbXNnU3J2OiBOek1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IFNldHRpbmdzU2VydmljZSxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogTnpTYWZlQW55XG4gICkge1xuICAgIHJvdXRlci5ldmVudHMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShldiA9PiB0aGlzLnByb2Nlc3NFdihldikpO1xuICB9XG5cbiAgcHJvY2Vzc0V2KGV2OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0ZldGNoaW5nICYmIGV2IGluc3RhbmNlb2YgUm91dGVDb25maWdMb2FkU3RhcnQpIHtcbiAgICAgIHRoaXMuaXNGZXRjaGluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvciB8fCBldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25DYW5jZWwpIHtcbiAgICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgICAgY29uc3QgZXJyID0gdGhpcy5jdXN0b21FcnJvciA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLmN1c3RvbUVycm9yID8/IGBDb3VsZCBub3QgbG9hZCAke2V2LnVybH0gcm91dGVgO1xuICAgICAgaWYgKGVyciAmJiBldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICB0aGlzLm1zZ1Nydi5lcnJvcihlcnIsIHsgbnpEdXJhdGlvbjogMTAwMCAqIDMgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fCBldiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnTG9hZEVuZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGZXRjaGluZykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENsYXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZWwsIGRvYywgcmVuZGVyZXIsIHNldHRpbmdzIH0gPSB0aGlzO1xuICAgIGNvbnN0IGxheW91dCA9IHNldHRpbmdzLmxheW91dDtcbiAgICB1cGRhdGVIb3N0Q2xhc3MoZWwubmF0aXZlRWxlbWVudCwgcmVuZGVyZXIsIHtcbiAgICAgIFsneXVuemFpLWRlZmF1bHQnXTogdHJ1ZSxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2ZpeGVkYF06IGxheW91dC5maXhlZCxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2NvbGxhcHNlZGBdOiBsYXlvdXQuY29sbGFwc2VkLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9faGlkZS1hc2lkZWBdOiB0aGlzLm9wdGlvbnMhLmhpZGVBc2lkZVxuICAgIH0pO1xuXG4gICAgZG9jLmJvZHkuY2xhc3NMaXN0W2xheW91dC5jb2xvcldlYWsgPyAnYWRkJyA6ICdyZW1vdmUnXSgnY29sb3Itd2VhaycpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgbG9nb0V4cGFuZGVkOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2AsXG4gICAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgLFxuICAgICAgbG9nb0xpbms6IGAvYCxcbiAgICAgIGhpZGVBc2lkZTogZmFsc2UsXG4gICAgICAuLi50aGlzLm9wdGlvbnNcbiAgICB9O1xuICAgIGNvbnN0IHsgc2V0dGluZ3MsIGRlc3Ryb3kkIH0gPSB0aGlzO1xuICAgIHNldHRpbmdzLm5vdGlmeS5waXBlKHRha2VVbnRpbChkZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldENsYXNzKCkpO1xuICAgIHRoaXMuc2V0Q2xhc3MoKTtcbiAgICB0aGlzLmxheW91dFNlcnZpY2UuaGVhZGVyLnN1YnNjcmliZShoID0+ICh0aGlzLnNob3dIZWFkZXIgPSBoKSk7XG4gICAgdGhpcy5sYXlvdXRTZXJ2aWNlLnNpZGViYXIuc3Vic2NyaWJlKHMgPT4gKHRoaXMuc2hvd1NpZGViYXIgPSBzKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==