import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SettingsService } from '@yelon/theme';
import { updateHostClass } from '@yelon/util/browser';
import { LayoutDefaultHeaderItemComponent } from './layout-header-item.component';
import { LayoutService } from './layout.service';
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
        this.destroy$ = new Subject();
        this.isFetching = false;
        router.events.pipe(takeUntil(this.destroy$)).subscribe(ev => this.processEv(ev));
    }
    processEv(ev) {
        var _a;
        if (!this.isFetching && ev instanceof RouteConfigLoadStart) {
            this.isFetching = true;
        }
        if (ev instanceof NavigationError || ev instanceof NavigationCancel) {
            this.isFetching = false;
            const err = this.customError === null ? null : (_a = this.customError) !== null && _a !== void 0 ? _a : `Could not load ${ev.url} route`;
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
        this.options = Object.assign({ logoExpanded: `./assets/logo-full.svg`, logoCollapsed: `./assets/logo.svg`, logoLink: `/`, hideAside: false }, this.options);
        const { settings, destroy$ } = this;
        settings.notify.pipe(takeUntil(destroy$)).subscribe(() => this.setClass());
        this.setClass();
        this.layoutService.header.subscribe(h => {
            this.showHeader = h;
        });
        this.layoutService.sidebar.subscribe(s => {
            this.showSidebar = s;
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
LayoutDefaultComponent.decorators = [
    { type: Component, args: [{
                selector: 'layout-default',
                exportAs: 'layoutDefault',
                template: `
    <div class="yunzai-default__progress-bar" *ngIf="isFetching"></div>
    <layout-default-header *ngIf="showHeader"></layout-default-header>
    <ng-container *ngIf="showSidebar">
      <div *ngIf="!options.hideAside" class="yunzai-default__aside">
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
            },] }
];
LayoutDefaultComponent.ctorParameters = () => [
    { type: Router },
    { type: LayoutService },
    { type: NzMessageService },
    { type: SettingsService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
LayoutDefaultComponent.propDecorators = {
    headerItems: [{ type: ContentChildren, args: [LayoutDefaultHeaderItemComponent, { descendants: false },] }],
    options: [{ type: Input }],
    asideUser: [{ type: Input }],
    nav: [{ type: Input }],
    content: [{ type: Input }],
    customError: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUlMLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixNQUFNLEVBRVAsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUEyQmpELE1BQU0sT0FBTyxzQkFBc0I7SUFnQmpDLFlBQ0UsTUFBYyxFQUNOLGFBQTRCLEVBQzVCLE1BQXdCLEVBQ3hCLFFBQXlCLEVBQ3pCLEVBQWMsRUFDZCxRQUFtQixFQUNELEdBQWM7UUFMaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsT0FBRSxHQUFG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QyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTdHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDthQUNGOzs7WUF2Q0MsTUFBTTtZQWFDLGFBQWE7WUFOYixnQkFBZ0I7WUFFaEIsZUFBZTtZQXhCdEIsVUFBVTtZQU1WLFNBQVM7NENBd0VOLE1BQU0sU0FBQyxRQUFROzs7MEJBdEJqQixlQUFlLFNBQUMsZ0NBQWdDLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO3NCQU14RSxLQUFLO3dCQUNMLEtBQUs7a0JBQ0wsS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIE5hdmlnYXRpb25FcnJvcixcbiAgUm91dGVDb25maWdMb2FkRW5kLFxuICBSb3V0ZUNvbmZpZ0xvYWRTdGFydCxcbiAgUm91dGVyLFxuICBFdmVudFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOek1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcblxuaW1wb3J0IHsgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IHVwZGF0ZUhvc3RDbGFzcyB9IGZyb20gJ0B5ZWxvbi91dGlsL2Jyb3dzZXInO1xuXG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LWhlYWRlci1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsYXlvdXQtZGVmYXVsdCcsXG4gIGV4cG9ydEFzOiAnbGF5b3V0RGVmYXVsdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19wcm9ncmVzcy1iYXJcIiAqbmdJZj1cImlzRmV0Y2hpbmdcIj48L2Rpdj5cbiAgICA8bGF5b3V0LWRlZmF1bHQtaGVhZGVyICpuZ0lmPVwic2hvd0hlYWRlclwiPjwvbGF5b3V0LWRlZmF1bHQtaGVhZGVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93U2lkZWJhclwiPlxuICAgICAgPGRpdiAqbmdJZj1cIiFvcHRpb25zLmhpZGVBc2lkZVwiIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fYXNpZGUtaW5uZXJcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYXNpZGVVc2VyXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdlwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxsYXlvdXQtZGVmYXVsdC1uYXYgKm5nSWY9XCIhbmF2XCIgY2xhc3M9XCJkLWJsb2NrIHB5LWxnXCI+PC9sYXlvdXQtZGVmYXVsdC1uYXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNlY3Rpb25cbiAgICAgIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2NvbnRlbnRcIlxuICAgICAgW25nU3R5bGVdPVwieyAnbWFyZ2luLXRvcCc6ICFzaG93SGVhZGVyID8gJzBweCcgOiAnJywgJ21hcmdpbi1sZWZ0JzogIXNob3dTaWRlYmFyID8gJzBweCcgOiAnJyB9XCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXREZWZhdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKExheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KVxuICBoZWFkZXJJdGVtcyE6IFF1ZXJ5TGlzdDxMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudD47XG5cbiAgc2hvd0hlYWRlcjogYm9vbGVhbiA9IHRydWU7XG4gIHNob3dTaWRlYmFyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBvcHRpb25zOiBMYXlvdXREZWZhdWx0T3B0aW9ucztcbiAgQElucHV0KCkgYXNpZGVVc2VyOiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbmF2OiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgY29udGVudDogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIGN1c3RvbUVycm9yPzogc3RyaW5nIHwgbnVsbDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaXNGZXRjaGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIG1zZ1NydjogTnpNZXNzYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IE56U2FmZUFueVxuICApIHtcbiAgICByb3V0ZXIuZXZlbnRzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZXYgPT4gdGhpcy5wcm9jZXNzRXYoZXYpKTtcbiAgfVxuXG4gIHByb2Nlc3NFdihldjogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNGZXRjaGluZyAmJiBldiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnTG9hZFN0YXJ0KSB7XG4gICAgICB0aGlzLmlzRmV0Y2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IgfHwgZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsKSB7XG4gICAgICB0aGlzLmlzRmV0Y2hpbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGVyciA9IHRoaXMuY3VzdG9tRXJyb3IgPT09IG51bGwgPyBudWxsIDogdGhpcy5jdXN0b21FcnJvciA/PyBgQ291bGQgbm90IGxvYWQgJHtldi51cmx9IHJvdXRlYDtcbiAgICAgIGlmIChlcnIgJiYgZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5tc2dTcnYuZXJyb3IoZXJyLCB7IG56RHVyYXRpb246IDEwMDAgKiAzIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIShldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHwgZXYgaW5zdGFuY2VvZiBSb3V0ZUNvbmZpZ0xvYWRFbmQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRmV0Y2hpbmcpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzRmV0Y2hpbmcgPSBmYWxzZTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDbGFzcygpOiB2b2lkIHtcbiAgICBjb25zdCB7IGVsLCBkb2MsIHJlbmRlcmVyLCBzZXR0aW5ncyB9ID0gdGhpcztcbiAgICBjb25zdCBsYXlvdXQgPSBzZXR0aW5ncy5sYXlvdXQ7XG4gICAgdXBkYXRlSG9zdENsYXNzKGVsLm5hdGl2ZUVsZW1lbnQsIHJlbmRlcmVyLCB7XG4gICAgICBbJ3l1bnphaS1kZWZhdWx0J106IHRydWUsXG4gICAgICBbYHl1bnphaS1kZWZhdWx0X19maXhlZGBdOiBsYXlvdXQuZml4ZWQsXG4gICAgICBbYHl1bnphaS1kZWZhdWx0X19jb2xsYXBzZWRgXTogbGF5b3V0LmNvbGxhcHNlZCxcbiAgICAgIFtgeXVuemFpLWRlZmF1bHRfX2hpZGUtYXNpZGVgXTogdGhpcy5vcHRpb25zLmhpZGVBc2lkZVxuICAgIH0pO1xuXG4gICAgZG9jLmJvZHkuY2xhc3NMaXN0W2xheW91dC5jb2xvcldlYWsgPyAnYWRkJyA6ICdyZW1vdmUnXSgnY29sb3Itd2VhaycpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgbG9nb0V4cGFuZGVkOiBgLi9hc3NldHMvbG9nby1mdWxsLnN2Z2AsXG4gICAgICBsb2dvQ29sbGFwc2VkOiBgLi9hc3NldHMvbG9nby5zdmdgLFxuICAgICAgbG9nb0xpbms6IGAvYCxcbiAgICAgIGhpZGVBc2lkZTogZmFsc2UsXG4gICAgICAuLi50aGlzLm9wdGlvbnNcbiAgICB9O1xuICAgIGNvbnN0IHsgc2V0dGluZ3MsIGRlc3Ryb3kkIH0gPSB0aGlzO1xuICAgIHNldHRpbmdzLm5vdGlmeS5waXBlKHRha2VVbnRpbChkZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldENsYXNzKCkpO1xuICAgIHRoaXMuc2V0Q2xhc3MoKTtcbiAgICB0aGlzLmxheW91dFNlcnZpY2UuaGVhZGVyLnN1YnNjcmliZShoID0+IHtcbiAgICAgIHRoaXMuc2hvd0hlYWRlciA9IGg7XG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXRTZXJ2aWNlLnNpZGViYXIuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgdGhpcy5zaG93U2lkZWJhciA9IHM7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==