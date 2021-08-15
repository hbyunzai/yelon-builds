import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '@yelon/theme';
import { LayoutDefaultComponent } from './layout.component';
export class LayoutDefaultHeaderComponent {
    constructor(settings, parent, cdr) {
        this.settings = settings;
        this.parent = parent;
        this.cdr = cdr;
        this.destroy$ = new Subject();
        this.left = [];
        this.middle = [];
        this.right = [];
    }
    get options() {
        return this.parent.options;
    }
    get app() {
        return this.settings.app;
    }
    get collapsed() {
        return this.settings.layout.collapsed;
    }
    get collapsedIcon() {
        let type = this.collapsed ? 'unfold' : 'fold';
        if (this.settings.layout.direction === 'rtl') {
            type = this.collapsed ? 'fold' : 'unfold';
        }
        return `menu-${type}`;
    }
    refresh() {
        const arr = this.parent.headerItems.toArray();
        this.left = arr.filter(i => i.direction === 'left');
        this.middle = arr.filter(i => i.direction === 'middle');
        this.right = arr.filter(i => i.direction === 'right');
        this.cdr.detectChanges();
    }
    ngAfterViewInit() {
        this.parent.headerItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.refresh();
    }
    toggleCollapsed() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
LayoutDefaultHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'layout-default-header',
                template: `
    <ng-template #render let-ls>
      <li *ngFor="let i of ls" [class.hidden-mobile]="i.hidden === 'mobile'" [class.hidden-pc]="i.hidden === 'pc'">
        <ng-container *ngTemplateOutlet="i.host"></ng-container>
      </li>
    </ng-template>
    <div class="yunzai-default__header-logo" [style.width.px]="options.logoFixWidth">
      <a [routerLink]="options.logoLink" class="yunzai-default__header-logo-link">
        <img class="yunzai-default__header-logo-expanded" [attr.src]="options.logoExpanded" [attr.alt]="app.name" />
        <img class="yunzai-default__header-logo-collapsed" [attr.src]="options.logoCollapsed" [attr.alt]="app.name" />
      </a>
    </div>
    <div class="yunzai-default__nav-wrap">
      <ul class="yunzai-default__nav">
        <li *ngIf="!options.hideAside">
          <div class="yunzai-default__nav-item yunzai-default__nav-item--collapse" (click)="toggleCollapsed()">
            <i nz-icon [nzType]="collapsedIcon"></i>
          </div>
        </li>
        <ng-template [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: left }"></ng-template>
      </ul>
      <div *ngIf="middle.length > 0" class="yunzai-default__nav yunzai-default__nav-middle">
        <ng-container *ngTemplateOutlet="middle[0].host"></ng-container>
      </div>
      <ul class="yunzai-default__nav">
        <ng-template [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: right }"></ng-template>
      </ul>
    </div>
  `,
                host: {
                    '[class.yunzai-default__header]': `true`
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
LayoutDefaultHeaderComponent.ctorParameters = () => [
    { type: SettingsService },
    { type: LayoutDefaultComponent },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9sYXlvdXQtZGVmYXVsdC9sYXlvdXQtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBR1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0MsT0FBTyxFQUFPLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQTZDNUQsTUFBTSxPQUFPLDRCQUE0QjtJQTJCdkMsWUFDVSxRQUF5QixFQUN6QixNQUE4QixFQUM5QixHQUFzQjtRQUZ0QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUF3QjtRQUM5QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTdCeEIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFdkMsU0FBSSxHQUE4QixFQUFFLENBQUM7UUFDckMsV0FBTSxHQUE4QixFQUFFLENBQUM7UUFDdkMsVUFBSyxHQUE4QixFQUFFLENBQUM7SUEwQm5DLENBQUM7SUF4QkosSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtZQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDM0M7UUFDRCxPQUFPLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQVFPLE9BQU87UUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXpGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO2dCQUNELElBQUksRUFBRTtvQkFDSixnQ0FBZ0MsRUFBRSxNQUFNO2lCQUN6QztnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBOUNhLGVBQWU7WUFFcEIsc0JBQXNCO1lBWjdCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IEFwcCwgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcblxuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdENvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0SGVhZGVySXRlbURpcmVjdGlvbiwgTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1IaWRkZW4sIExheW91dERlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBMYXlvdXREZWZhdWx0SGVhZGVySXRlbSB7XG4gIGhvc3Q6IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIGhpZGRlbj86IExheW91dERlZmF1bHRIZWFkZXJJdGVtSGlkZGVuO1xuICBkaXJlY3Rpb24/OiBMYXlvdXREZWZhdWx0SGVhZGVySXRlbURpcmVjdGlvbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGF5b3V0LWRlZmF1bHQtaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3JlbmRlciBsZXQtbHM+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGkgb2YgbHNcIiBbY2xhc3MuaGlkZGVuLW1vYmlsZV09XCJpLmhpZGRlbiA9PT0gJ21vYmlsZSdcIiBbY2xhc3MuaGlkZGVuLXBjXT1cImkuaGlkZGVuID09PSAncGMnXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpLmhvc3RcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGk+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2hlYWRlci1sb2dvXCIgW3N0eWxlLndpZHRoLnB4XT1cIm9wdGlvbnMubG9nb0ZpeFdpZHRoXCI+XG4gICAgICA8YSBbcm91dGVyTGlua109XCJvcHRpb25zLmxvZ29MaW5rXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9faGVhZGVyLWxvZ28tbGlua1wiPlxuICAgICAgICA8aW1nIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX2hlYWRlci1sb2dvLWV4cGFuZGVkXCIgW2F0dHIuc3JjXT1cIm9wdGlvbnMubG9nb0V4cGFuZGVkXCIgW2F0dHIuYWx0XT1cImFwcC5uYW1lXCIgLz5cbiAgICAgICAgPGltZyBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19oZWFkZXItbG9nby1jb2xsYXBzZWRcIiBbYXR0ci5zcmNdPVwib3B0aW9ucy5sb2dvQ29sbGFwc2VkXCIgW2F0dHIuYWx0XT1cImFwcC5uYW1lXCIgLz5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi13cmFwXCI+XG4gICAgICA8dWwgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2XCI+XG4gICAgICAgIDxsaSAqbmdJZj1cIiFvcHRpb25zLmhpZGVBc2lkZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW0geXVuemFpLWRlZmF1bHRfX25hdi1pdGVtLS1jb2xsYXBzZVwiIChjbGljayk9XCJ0b2dnbGVDb2xsYXBzZWQoKVwiPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImNvbGxhcHNlZEljb25cIj48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyZW5kZXJcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGxlZnQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L3VsPlxuICAgICAgPGRpdiAqbmdJZj1cIm1pZGRsZS5sZW5ndGggPiAwXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2IHl1bnphaS1kZWZhdWx0X19uYXYtbWlkZGxlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtaWRkbGVbMF0uaG9zdFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8dWwgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyZW5kZXJcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHJpZ2h0IH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MueXVuemFpLWRlZmF1bHRfX2hlYWRlcl0nOiBgdHJ1ZWBcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0RGVmYXVsdEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGxlZnQ6IExheW91dERlZmF1bHRIZWFkZXJJdGVtW10gPSBbXTtcbiAgbWlkZGxlOiBMYXlvdXREZWZhdWx0SGVhZGVySXRlbVtdID0gW107XG4gIHJpZ2h0OiBMYXlvdXREZWZhdWx0SGVhZGVySXRlbVtdID0gW107XG5cbiAgZ2V0IG9wdGlvbnMoKTogTGF5b3V0RGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnBhcmVudC5vcHRpb25zO1xuICB9XG5cbiAgZ2V0IGFwcCgpOiBBcHAge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmFwcDtcbiAgfVxuXG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubGF5b3V0LmNvbGxhcHNlZDtcbiAgfVxuXG4gIGdldCBjb2xsYXBzZWRJY29uKCk6IHN0cmluZyB7XG4gICAgbGV0IHR5cGUgPSB0aGlzLmNvbGxhcHNlZCA/ICd1bmZvbGQnIDogJ2ZvbGQnO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmxheW91dC5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgICB0eXBlID0gdGhpcy5jb2xsYXBzZWQgPyAnZm9sZCcgOiAndW5mb2xkJztcbiAgICB9XG4gICAgcmV0dXJuIGBtZW51LSR7dHlwZX1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogU2V0dGluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFyZW50OiBMYXlvdXREZWZhdWx0Q29tcG9uZW50LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyciA9IHRoaXMucGFyZW50LmhlYWRlckl0ZW1zLnRvQXJyYXkoKTtcbiAgICB0aGlzLmxlZnQgPSBhcnIuZmlsdGVyKGkgPT4gaS5kaXJlY3Rpb24gPT09ICdsZWZ0Jyk7XG4gICAgdGhpcy5taWRkbGUgPSBhcnIuZmlsdGVyKGkgPT4gaS5kaXJlY3Rpb24gPT09ICdtaWRkbGUnKTtcbiAgICB0aGlzLnJpZ2h0ID0gYXJyLmZpbHRlcihpID0+IGkuZGlyZWN0aW9uID09PSAncmlnaHQnKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJlbnQuaGVhZGVySXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHRvZ2dsZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHRpbmdzLnNldExheW91dCgnY29sbGFwc2VkJywgIXRoaXMuc2V0dGluZ3MubGF5b3V0LmNvbGxhcHNlZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==