import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '@yelon/theme';
import { updateHostClass } from '@yelon/util/browser';
import { NzMessageService } from 'ng-zorro-antd/message';
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
        this.layoutService.header.subscribe(h => (this.showHeader = h));
        this.layoutService.sidebar.subscribe(s => (this.showSidebar = s));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL2xheW91dC1kZWZhdWx0L2xheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUlMLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixNQUFNLEVBRVAsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUErQmpELE1BQU0sT0FBTyxzQkFBc0I7SUFnQmpDLFlBQ0UsTUFBYyxFQUNOLGFBQTRCLEVBQzVCLE1BQXdCLEVBQ3hCLFFBQXlCLEVBQ3pCLEVBQWMsRUFDZCxRQUFtQixFQUNELEdBQWM7UUFMaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsT0FBRSxHQUFG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QyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTdHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7YUFDRjs7O1lBMUNDLE1BQU07WUFZQyxhQUFhO1lBSGIsZ0JBQWdCO1lBSGhCLGVBQWU7WUFyQnRCLFVBQVU7WUFNVixTQUFTOzRDQTJFTixNQUFNLFNBQUMsUUFBUTs7OzBCQXRCakIsZUFBZSxTQUFDLGdDQUFnQyxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtzQkFNeEUsS0FBSzt3QkFDTCxLQUFLO2tCQUNMLEtBQUs7c0JBQ0wsS0FBSzswQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOYXZpZ2F0aW9uQ2FuY2VsLFxuICBOYXZpZ2F0aW9uRW5kLFxuICBOYXZpZ2F0aW9uRXJyb3IsXG4gIFJvdXRlQ29uZmlnTG9hZEVuZCxcbiAgUm91dGVDb25maWdMb2FkU3RhcnQsXG4gIFJvdXRlcixcbiAgRXZlbnRcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IHVwZGF0ZUhvc3RDbGFzcyB9IGZyb20gJ0B5ZWxvbi91dGlsL2Jyb3dzZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5cbmltcG9ydCB7IExheW91dERlZmF1bHRIZWFkZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtaGVhZGVyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dERlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xheW91dC1kZWZhdWx0JyxcbiAgZXhwb3J0QXM6ICdsYXlvdXREZWZhdWx0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX3Byb2dyZXNzLWJhclwiICpuZ0lmPVwiaXNGZXRjaGluZ1wiPjwvZGl2PlxuICAgIDxsYXlvdXQtZGVmYXVsdC1oZWFkZXIgKm5nSWY9XCJzaG93SGVhZGVyXCI+PC9sYXlvdXQtZGVmYXVsdC1oZWFkZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dTaWRlYmFyXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlXCJcbiAgICAgICAgKm5nSWY9XCIhb3B0aW9ucy5oaWRlQXNpZGVcIlxuICAgICAgICBbbmdTdHlsZV09XCIhc2hvd0hlYWRlciA/IHsgJ21hcmdpbi10b3AnOiAnMHB4JyB9IDoge31cIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2FzaWRlLWlubmVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImFzaWRlVXNlclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuYXZcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bGF5b3V0LWRlZmF1bHQtbmF2ICpuZ0lmPVwiIW5hdlwiIGNsYXNzPVwiZC1ibG9jayBweS1sZ1wiPjwvbGF5b3V0LWRlZmF1bHQtbmF2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzZWN0aW9uXG4gICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19jb250ZW50XCJcbiAgICAgIFtuZ1N0eWxlXT1cInsgJ21hcmdpbi10b3AnOiAhc2hvd0hlYWRlciA/ICcwcHgnIDogJycsICdtYXJnaW4tbGVmdCc6ICFzaG93U2lkZWJhciA/ICcwcHgnIDogJycgfVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NlY3Rpb24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0RGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihMYXlvdXREZWZhdWx0SGVhZGVySXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSlcbiAgaGVhZGVySXRlbXMhOiBRdWVyeUxpc3Q8TGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1Db21wb25lbnQ+O1xuXG4gIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuICBzaG93U2lkZWJhcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgb3B0aW9uczogTGF5b3V0RGVmYXVsdE9wdGlvbnM7XG4gIEBJbnB1dCgpIGFzaWRlVXNlcjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG5hdjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBjdXN0b21FcnJvcj86IHN0cmluZyB8IG51bGw7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIGlzRmV0Y2hpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtc2dTcnY6IE56TWVzc2FnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnlcbiAgKSB7XG4gICAgcm91dGVyLmV2ZW50cy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGV2ID0+IHRoaXMucHJvY2Vzc0V2KGV2KSk7XG4gIH1cblxuICBwcm9jZXNzRXYoZXY6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzRmV0Y2hpbmcgJiYgZXYgaW5zdGFuY2VvZiBSb3V0ZUNvbmZpZ0xvYWRTdGFydCkge1xuICAgICAgdGhpcy5pc0ZldGNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8IGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbCkge1xuICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBlcnIgPSB0aGlzLmN1c3RvbUVycm9yID09PSBudWxsID8gbnVsbCA6IHRoaXMuY3VzdG9tRXJyb3IgPz8gYENvdWxkIG5vdCBsb2FkICR7ZXYudXJsfSByb3V0ZWA7XG4gICAgICBpZiAoZXJyICYmIGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIHRoaXMubXNnU3J2LmVycm9yKGVyciwgeyBuekR1cmF0aW9uOiAxMDAwICogMyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IGV2IGluc3RhbmNlb2YgUm91dGVDb25maWdMb2FkRW5kKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZldGNoaW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3QgeyBlbCwgZG9jLCByZW5kZXJlciwgc2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgY29uc3QgbGF5b3V0ID0gc2V0dGluZ3MubGF5b3V0O1xuICAgIHVwZGF0ZUhvc3RDbGFzcyhlbC5uYXRpdmVFbGVtZW50LCByZW5kZXJlciwge1xuICAgICAgWyd5dW56YWktZGVmYXVsdCddOiB0cnVlLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9fZml4ZWRgXTogbGF5b3V0LmZpeGVkLFxuICAgICAgW2B5dW56YWktZGVmYXVsdF9fY29sbGFwc2VkYF06IGxheW91dC5jb2xsYXBzZWQsXG4gICAgICBbYHl1bnphaS1kZWZhdWx0X19oaWRlLWFzaWRlYF06IHRoaXMub3B0aW9ucy5oaWRlQXNpZGVcbiAgICB9KTtcblxuICAgIGRvYy5ib2R5LmNsYXNzTGlzdFtsYXlvdXQuY29sb3JXZWFrID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ2NvbG9yLXdlYWsnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIGxvZ29FeHBhbmRlZDogYC4vYXNzZXRzL2xvZ28tZnVsbC5zdmdgLFxuICAgICAgbG9nb0NvbGxhcHNlZDogYC4vYXNzZXRzL2xvZ28uc3ZnYCxcbiAgICAgIGxvZ29MaW5rOiBgL2AsXG4gICAgICBoaWRlQXNpZGU6IGZhbHNlLFxuICAgICAgLi4udGhpcy5vcHRpb25zXG4gICAgfTtcbiAgICBjb25zdCB7IHNldHRpbmdzLCBkZXN0cm95JCB9ID0gdGhpcztcbiAgICBzZXR0aW5ncy5ub3RpZnkucGlwZSh0YWtlVW50aWwoZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRDbGFzcygpKTtcbiAgICB0aGlzLnNldENsYXNzKCk7XG4gICAgdGhpcy5sYXlvdXRTZXJ2aWNlLmhlYWRlci5zdWJzY3JpYmUoaCA9PiAodGhpcy5zaG93SGVhZGVyID0gaCkpO1xuICAgIHRoaXMubGF5b3V0U2VydmljZS5zaWRlYmFyLnN1YnNjcmliZShzID0+ICh0aGlzLnNob3dTaWRlYmFyID0gcykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=