import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, Output, ViewEncapsulation, booleanAttribute, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YelonLocaleService } from '@yelon/theme';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
export class TagSelectComponent {
    constructor() {
        this.i18n = inject(YelonLocaleService);
        this.directionality = inject(Directionality, { optional: true });
        this.cdr = inject(ChangeDetectorRef);
        this.destroy$ = inject(DestroyRef);
        this.locale = {};
        this.expand = false;
        this.dir = 'ltr';
        /** 是否启用 `展开与收进` */
        this.expandable = true;
        this.change = new EventEmitter();
    }
    ngOnInit() {
        this.dir = this.directionality?.value;
        this.directionality?.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(direction => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.i18n.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getData('tagSelect');
            this.cdr.detectChanges();
        });
    }
    trigger() {
        this.expand = !this.expand;
        this.change.emit(this.expand);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: TagSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: TagSelectComponent, isStandalone: true, selector: "tag-select", inputs: { expandable: ["expandable", "expandable", booleanAttribute] }, outputs: { change: "change" }, host: { properties: { "class.tag-select": "true", "class.tag-select-rtl": "dir === 'rtl'", "class.tag-select-rtl__has-expand": "dir === 'rtl' && expandable", "class.tag-select__has-expand": "expandable", "class.tag-select__expanded": "expand" } }, exportAs: ["tagSelect"], ngImport: i0, template: "<ng-content />\n@if (expandable) {\n  <a class=\"ant-tag ant-tag-checkable tag-select__trigger\" (click)=\"trigger()\">\n    {{ expand ? locale.collapse : locale.expand }}\n    <i nz-icon nzType=\"down\" [style.transform]=\"expand ? 'rotate(-180deg)' : null\"></i>\n  </a>\n}\n", dependencies: [{ kind: "directive", type: NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: TagSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tag-select', exportAs: 'tagSelect', host: {
                        '[class.tag-select]': 'true',
                        '[class.tag-select-rtl]': `dir === 'rtl'`,
                        '[class.tag-select-rtl__has-expand]': `dir === 'rtl' && expandable`,
                        '[class.tag-select__has-expand]': 'expandable',
                        '[class.tag-select__expanded]': 'expand'
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [NzIconDirective], template: "<ng-content />\n@if (expandable) {\n  <a class=\"ant-tag ant-tag-checkable tag-select__trigger\" (click)=\"trigger()\">\n    {{ expand ? locale.collapse : locale.expand }}\n    <i nz-icon nzType=\"down\" [style.transform]=\"expand ? 'rotate(-180deg)' : null\"></i>\n  </a>\n}\n" }]
        }], propDecorators: { expandable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], change: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hYmMvdGFnLXNlbGVjdC90YWctc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy90YWctc2VsZWN0L3RhZy1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFhLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFjLE1BQU0sY0FBYyxDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFtQnJELE1BQU0sT0FBTyxrQkFBa0I7SUFqQi9CO1FBa0JtQixTQUFJLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsbUJBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUQsUUFBRyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsUUFBRyxHQUFlLEtBQUssQ0FBQztRQUV4QixtQkFBbUI7UUFDcUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztLQWtCekQ7SUFoQkMsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4RixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs4R0E1QlUsa0JBQWtCO2tHQUFsQixrQkFBa0IsaUdBVVQsZ0JBQWdCLDZVQzlDdEMsdVJBT0EsNENEMkJZLGVBQWU7OzJGQUVkLGtCQUFrQjtrQkFqQjlCLFNBQVM7K0JBQ0UsWUFBWSxZQUNaLFdBQVcsUUFFZjt3QkFDSixvQkFBb0IsRUFBRSxNQUFNO3dCQUM1Qix3QkFBd0IsRUFBRSxlQUFlO3dCQUN6QyxvQ0FBb0MsRUFBRSw2QkFBNkI7d0JBQ25FLGdDQUFnQyxFQUFFLFlBQVk7d0JBQzlDLDhCQUE4QixFQUFFLFFBQVE7cUJBQ3pDLHVCQUNvQixLQUFLLG1CQUNULHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksY0FDekIsSUFBSSxXQUNQLENBQUMsZUFBZSxDQUFDOzhCQVljLFVBQVU7c0JBQWpELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ25CLE1BQU07c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgaW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuXG5pbXBvcnQgeyBZZWxvbkxvY2FsZVNlcnZpY2UsIExvY2FsZURhdGEgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgTnpJY29uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGFnLXNlbGVjdCcsXG4gIGV4cG9ydEFzOiAndGFnU2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhZy1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy50YWctc2VsZWN0XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLnRhZy1zZWxlY3QtcnRsXSc6IGBkaXIgPT09ICdydGwnYCxcbiAgICAnW2NsYXNzLnRhZy1zZWxlY3QtcnRsX19oYXMtZXhwYW5kXSc6IGBkaXIgPT09ICdydGwnICYmIGV4cGFuZGFibGVgLFxuICAgICdbY2xhc3MudGFnLXNlbGVjdF9faGFzLWV4cGFuZF0nOiAnZXhwYW5kYWJsZScsXG4gICAgJ1tjbGFzcy50YWctc2VsZWN0X19leHBhbmRlZF0nOiAnZXhwYW5kJ1xuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOekljb25EaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFRhZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4biA9IGluamVjdChZZWxvbkxvY2FsZVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5ID0gaW5qZWN0KERpcmVjdGlvbmFsaXR5LCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIGxvY2FsZTogTG9jYWxlRGF0YSA9IHt9O1xuICBleHBhbmQgPSBmYWxzZTtcbiAgZGlyPzogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgLyoqIOaYr+WQpuWQr+eUqCBg5bGV5byA5LiO5pS26L+bYCAqL1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZXhwYW5kYWJsZSA9IHRydWU7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5Py52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5Py5jaGFuZ2UucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShkaXJlY3Rpb24gPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5pMThuLmNoYW5nZS5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxlID0gdGhpcy5pMThuLmdldERhdGEoJ3RhZ1NlbGVjdCcpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgdHJpZ2dlcigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZCA9ICF0aGlzLmV4cGFuZDtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuZXhwYW5kKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQgLz5cbkBpZiAoZXhwYW5kYWJsZSkge1xuICA8YSBjbGFzcz1cImFudC10YWcgYW50LXRhZy1jaGVja2FibGUgdGFnLXNlbGVjdF9fdHJpZ2dlclwiIChjbGljayk9XCJ0cmlnZ2VyKClcIj5cbiAgICB7eyBleHBhbmQgPyBsb2NhbGUuY29sbGFwc2UgOiBsb2NhbGUuZXhwYW5kIH19XG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJkb3duXCIgW3N0eWxlLnRyYW5zZm9ybV09XCJleHBhbmQgPyAncm90YXRlKC0xODBkZWcpJyA6IG51bGxcIj48L2k+XG4gIDwvYT5cbn1cbiJdfQ==