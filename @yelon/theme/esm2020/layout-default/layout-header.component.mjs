import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "ng-zorro-antd/icon";
export class LayoutDefaultHeaderComponent {
    constructor(settings, cdr) {
        this.settings = settings;
        this.cdr = cdr;
        this.destroy$ = new Subject();
        this.left = [];
        this.middle = [];
        this.right = [];
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
        const arr = this.items.toArray();
        this.left = arr.filter(i => i.direction === 'left');
        this.middle = arr.filter(i => i.direction === 'middle');
        this.right = arr.filter(i => i.direction === 'right');
        this.cdr.detectChanges();
    }
    ngAfterViewInit() {
        this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh());
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
LayoutDefaultHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: LayoutDefaultHeaderComponent, deps: [{ token: i1.SettingsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
LayoutDefaultHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: LayoutDefaultHeaderComponent, selector: "layout-default-header", inputs: { items: "items", options: "options" }, host: { properties: { "class.yunzai-default__header": "true" } }, ngImport: i0, template: `
    <ng-template #render let-ls>
      <li *ngFor="let i of ls" [class.hidden-mobile]="i.hidden === 'mobile'" [class.hidden-pc]="i.hidden === 'pc'">
        <ng-container *ngTemplateOutlet="i.host"></ng-container>
      </li>
    </ng-template>
    <div class="yunzai-default__header-logo" [style.width.px]="options.logoFixWidth">
      <ng-container *ngIf="!options.logo; else options.logo!">
        <a [routerLink]="options.logoLink" class="yunzai-default__header-logo-link">
          <img class="yunzai-default__header-logo-expanded" [attr.src]="options.logoExpanded" [attr.alt]="app.name" />
          <img class="yunzai-default__header-logo-collapsed" [attr.src]="options.logoCollapsed" [attr.alt]="app.name" />
        </a>
      </ng-container>
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
  `, isInline: true, directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo", "routerLink"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: LayoutDefaultHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'layout-default-header',
                    template: `
    <ng-template #render let-ls>
      <li *ngFor="let i of ls" [class.hidden-mobile]="i.hidden === 'mobile'" [class.hidden-pc]="i.hidden === 'pc'">
        <ng-container *ngTemplateOutlet="i.host"></ng-container>
      </li>
    </ng-template>
    <div class="yunzai-default__header-logo" [style.width.px]="options.logoFixWidth">
      <ng-container *ngIf="!options.logo; else options.logo!">
        <a [routerLink]="options.logoLink" class="yunzai-default__header-logo-link">
          <img class="yunzai-default__header-logo-expanded" [attr.src]="options.logoExpanded" [attr.alt]="app.name" />
          <img class="yunzai-default__header-logo-collapsed" [attr.src]="options.logoCollapsed" [attr.alt]="app.name" />
        </a>
      </ng-container>
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
                }]
        }], ctorParameters: function () { return [{ type: i1.SettingsService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { items: [{
                type: Input
            }], options: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9sYXlvdXQtZGVmYXVsdC9sYXlvdXQtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxLQUFLLEVBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQW9EM0MsTUFBTSxPQUFPLDRCQUE0QjtJQTBCdkMsWUFBb0IsUUFBeUIsRUFBVSxHQUFzQjtRQUF6RCxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBekJyRSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUt2QyxTQUFJLEdBQThCLEVBQUUsQ0FBQztRQUNyQyxXQUFNLEdBQThCLEVBQUUsQ0FBQztRQUN2QyxVQUFLLEdBQThCLEVBQUUsQ0FBQztJQWtCMEMsQ0FBQztJQWhCakYsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtZQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDM0M7UUFDRCxPQUFPLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUlPLE9BQU87UUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzt5SEFoRFUsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsK0tBcEM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUOzJGQU1VLDRCQUE0QjtrQkF0Q3hDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLGdDQUFnQyxFQUFFLE1BQU07cUJBQ3pDO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtzSUFJVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwcCwgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xheW91dC1oZWFkZXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1EaXJlY3Rpb24sIExheW91dERlZmF1bHRIZWFkZXJJdGVtSGlkZGVuLCBMYXlvdXREZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW0ge1xuICBob3N0OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBoaWRkZW4/OiBMYXlvdXREZWZhdWx0SGVhZGVySXRlbUhpZGRlbjtcbiAgZGlyZWN0aW9uPzogTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1EaXJlY3Rpb247XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xheW91dC1kZWZhdWx0LWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNyZW5kZXIgbGV0LWxzPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpIG9mIGxzXCIgW2NsYXNzLmhpZGRlbi1tb2JpbGVdPVwiaS5oaWRkZW4gPT09ICdtb2JpbGUnXCIgW2NsYXNzLmhpZGRlbi1wY109XCJpLmhpZGRlbiA9PT0gJ3BjJ1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaS5ob3N0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2xpPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19oZWFkZXItbG9nb1wiIFtzdHlsZS53aWR0aC5weF09XCJvcHRpb25zLmxvZ29GaXhXaWR0aFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFvcHRpb25zLmxvZ287IGVsc2Ugb3B0aW9ucy5sb2dvIVwiPlxuICAgICAgICA8YSBbcm91dGVyTGlua109XCJvcHRpb25zLmxvZ29MaW5rXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9faGVhZGVyLWxvZ28tbGlua1wiPlxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9faGVhZGVyLWxvZ28tZXhwYW5kZWRcIiBbYXR0ci5zcmNdPVwib3B0aW9ucy5sb2dvRXhwYW5kZWRcIiBbYXR0ci5hbHRdPVwiYXBwLm5hbWVcIiAvPlxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9faGVhZGVyLWxvZ28tY29sbGFwc2VkXCIgW2F0dHIuc3JjXT1cIm9wdGlvbnMubG9nb0NvbGxhcHNlZFwiIFthdHRyLmFsdF09XCJhcHAubmFtZVwiIC8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LXdyYXBcIj5cbiAgICAgIDx1bCBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXZcIj5cbiAgICAgICAgPGxpICpuZ0lmPVwiIW9wdGlvbnMuaGlkZUFzaWRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbSB5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW0tLWNvbGxhcHNlXCIgKGNsaWNrKT1cInRvZ2dsZUNvbGxhcHNlZCgpXCI+XG4gICAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiY29sbGFwc2VkSWNvblwiPjwvaT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJlbmRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogbGVmdCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2ICpuZ0lmPVwibWlkZGxlLmxlbmd0aCA+IDBcIiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYgeXVuemFpLWRlZmF1bHRfX25hdi1taWRkbGVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1pZGRsZVswXS5ob3N0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDx1bCBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXZcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJlbmRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogcmlnaHQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy55dW56YWktZGVmYXVsdF9faGVhZGVyXSc6IGB0cnVlYFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXREZWZhdWx0SGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQElucHV0KCkgaXRlbXMhOiBRdWVyeUxpc3Q8TGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1Db21wb25lbnQ+O1xuICBASW5wdXQoKSBvcHRpb25zITogTGF5b3V0RGVmYXVsdE9wdGlvbnM7XG5cbiAgbGVmdDogTGF5b3V0RGVmYXVsdEhlYWRlckl0ZW1bXSA9IFtdO1xuICBtaWRkbGU6IExheW91dERlZmF1bHRIZWFkZXJJdGVtW10gPSBbXTtcbiAgcmlnaHQ6IExheW91dERlZmF1bHRIZWFkZXJJdGVtW10gPSBbXTtcblxuICBnZXQgYXBwKCk6IEFwcCB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuYXBwO1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5sYXlvdXQuY29sbGFwc2VkO1xuICB9XG5cbiAgZ2V0IGNvbGxhcHNlZEljb24oKTogc3RyaW5nIHtcbiAgICBsZXQgdHlwZSA9IHRoaXMuY29sbGFwc2VkID8gJ3VuZm9sZCcgOiAnZm9sZCc7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubGF5b3V0LmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgIHR5cGUgPSB0aGlzLmNvbGxhcHNlZCA/ICdmb2xkJyA6ICd1bmZvbGQnO1xuICAgIH1cbiAgICByZXR1cm4gYG1lbnUtJHt0eXBlfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNldHRpbmdzOiBTZXR0aW5nc1NlcnZpY2UsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwcml2YXRlIHJlZnJlc2goKTogdm9pZCB7XG4gICAgY29uc3QgYXJyID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG4gICAgdGhpcy5sZWZ0ID0gYXJyLmZpbHRlcihpID0+IGkuZGlyZWN0aW9uID09PSAnbGVmdCcpO1xuICAgIHRoaXMubWlkZGxlID0gYXJyLmZpbHRlcihpID0+IGkuZGlyZWN0aW9uID09PSAnbWlkZGxlJyk7XG4gICAgdGhpcy5yaWdodCA9IGFyci5maWx0ZXIoaSA9PiBpLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jyk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHRvZ2dsZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHRpbmdzLnNldExheW91dCgnY29sbGFwc2VkJywgIXRoaXMuc2V0dGluZ3MubGF5b3V0LmNvbGxhcHNlZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==