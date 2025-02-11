import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { install, uninstall } from '@github/hotkey';
import * as i0 from "@angular/core";
export class HotkeyDirective {
    constructor() {
        this.el = inject(ElementRef).nativeElement;
        this.ngZone = inject(NgZone);
        this.platform = inject(Platform);
    }
    /**
     * Specify [hotkey format](https://github.com/github/hotkey#hotkey-string-format), you can get the code through [Hotkey Code](https://github.github.com/hotkey/hotkey_mapper.html)
     *
     * 指定[热键格式](https://github.com/github/hotkey#hotkey-string-format)，可以通过 [Hotkey Code](https://github.github.com/hotkey/hotkey_mapper.html) 来获取代码。
     */
    set hotkey(key) {
        if (!this.platform.isBrowser)
            return;
        this.ngZone.runOutsideAngular(() => install(this.el, key));
    }
    ngOnDestroy() {
        if (!this.platform.isBrowser)
            return;
        this.ngZone.runOutsideAngular(() => uninstall(this.el));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: HotkeyDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.11", type: HotkeyDirective, isStandalone: true, selector: "[hotkey]", inputs: { hotkey: "hotkey" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: HotkeyDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[hotkey]', standalone: true }]
        }], propDecorators: { hotkey: [{
                type: Input,
                args: ['hotkey']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9ob3RrZXkvaG90a2V5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLGVBQWU7SUFENUI7UUFFbUIsT0FBRSxHQUFnQixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ25ELFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsYUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQW1COUM7SUFqQkM7Ozs7T0FJRztJQUNILElBQ0ksTUFBTSxDQUFDLEdBQVc7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUFFLE9BQU87UUFFckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUFFLE9BQU87UUFFckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQzsrR0FyQlUsZUFBZTttR0FBZixlQUFlOzs0RkFBZixlQUFlO2tCQUQzQixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOzhCQVkvQyxNQUFNO3NCQURULEtBQUs7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaW5zdGFsbCwgdW5pbnN0YWxsIH0gZnJvbSAnQGdpdGh1Yi9ob3RrZXknO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbaG90a2V5XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBIb3RrZXlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGVsOiBIVE1MRWxlbWVudCA9IGluamVjdChFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZSA9IGluamVjdChOZ1pvbmUpO1xuICBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtID0gaW5qZWN0KFBsYXRmb3JtKTtcblxuICAvKipcbiAgICogU3BlY2lmeSBbaG90a2V5IGZvcm1hdF0oaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9ob3RrZXkjaG90a2V5LXN0cmluZy1mb3JtYXQpLCB5b3UgY2FuIGdldCB0aGUgY29kZSB0aHJvdWdoIFtIb3RrZXkgQ29kZV0oaHR0cHM6Ly9naXRodWIuZ2l0aHViLmNvbS9ob3RrZXkvaG90a2V5X21hcHBlci5odG1sKVxuICAgKlxuICAgKiDmjIflrppb54Ot6ZSu5qC85byPXShodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2hvdGtleSNob3RrZXktc3RyaW5nLWZvcm1hdCnvvIzlj6/ku6XpgJrov4cgW0hvdGtleSBDb2RlXShodHRwczovL2dpdGh1Yi5naXRodWIuY29tL2hvdGtleS9ob3RrZXlfbWFwcGVyLmh0bWwpIOadpeiOt+WPluS7o+eggeOAglxuICAgKi9cbiAgQElucHV0KCdob3RrZXknKVxuICBzZXQgaG90a2V5KGtleTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnBsYXRmb3JtLmlzQnJvd3NlcikgcmV0dXJuO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gaW5zdGFsbCh0aGlzLmVsLCBrZXkpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHJldHVybjtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHVuaW5zdGFsbCh0aGlzLmVsKSk7XG4gIH1cbn1cbiJdfQ==