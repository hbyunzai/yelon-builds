import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
import { InputNumber } from '@yelon/util/decorator';
import * as i0 from "@angular/core";
export class SFFixedDirective {
    constructor(er, render) {
        this.render = render;
        this._inited = false;
        this.el = er.nativeElement;
    }
    init() {
        if (!this._inited || this.num == null || this.num <= 0)
            return;
        const widgetEl = this.el.querySelector('.ant-row') || this.el;
        this.render.addClass(widgetEl, 'sf__fixed');
        const labelEl = widgetEl.querySelector('.ant-form-item-label');
        const controlEl = widgetEl.querySelector('.ant-form-item-control');
        const unit = `${this.num}px`;
        if (labelEl) {
            this.render.setStyle(labelEl, 'flex', `0 0 ${unit}`);
            this.render.setStyle(controlEl, 'max-width', `calc(100% - ${unit})`);
        }
        else {
            this.render.setStyle(controlEl, 'margin-left', unit);
        }
    }
    ngAfterViewInit() {
        this._inited = true;
        this.init();
    }
    ngOnChanges() {
        if (this._inited)
            this.init();
    }
}
SFFixedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: SFFixedDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
SFFixedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.3", type: SFFixedDirective, selector: "[fixed-label]", inputs: { num: ["fixed-label", "num"] }, usesOnChanges: true, ngImport: i0 });
__decorate([
    InputNumber()
], SFFixedDirective.prototype, "num", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: SFFixedDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[fixed-label]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { num: [{
                type: Input,
                args: ['fixed-label']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2YtZml4ZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybS9zcmMvc2YtZml4ZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxLQUFLLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBRWxHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLGdCQUFnQjtJQXFCM0IsWUFBWSxFQUFjLEVBQVUsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQW5CN0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQW9CdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBK0IsQ0FBQztJQUMvQyxDQUFDO0lBakJPLElBQUk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQy9ELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMvRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbkUsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFNRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7OzZHQWhDVSxnQkFBZ0I7aUdBQWhCLGdCQUFnQjtBQUlVO0lBQWQsV0FBVyxFQUFFOzZDQUFxQjsyRkFKOUMsZ0JBQWdCO2tCQUQ1QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTt5SEFLRCxHQUFHO3NCQUF2QyxLQUFLO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbnB1dE51bWJlciB9IGZyb20gJ0B5ZWxvbi91dGlsL2RlY29yYXRvcic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tmaXhlZC1sYWJlbF0nIH0pXG5leHBvcnQgY2xhc3MgU0ZGaXhlZERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgZWw6IEhUTUxEaXZFbGVtZW50O1xuICBwcml2YXRlIF9pbml0ZWQgPSBmYWxzZTtcblxuICBASW5wdXQoJ2ZpeGVkLWxhYmVsJykgQElucHV0TnVtYmVyKCkgbnVtPzogbnVtYmVyIHwgbnVsbDtcblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0ZWQgfHwgdGhpcy5udW0gPT0gbnVsbCB8fCB0aGlzLm51bSA8PSAwKSByZXR1cm47XG4gICAgY29uc3Qgd2lkZ2V0RWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5hbnQtcm93JykgfHwgdGhpcy5lbDtcbiAgICB0aGlzLnJlbmRlci5hZGRDbGFzcyh3aWRnZXRFbCwgJ3NmX19maXhlZCcpO1xuICAgIGNvbnN0IGxhYmVsRWwgPSB3aWRnZXRFbC5xdWVyeVNlbGVjdG9yKCcuYW50LWZvcm0taXRlbS1sYWJlbCcpO1xuICAgIGNvbnN0IGNvbnRyb2xFbCA9IHdpZGdldEVsLnF1ZXJ5U2VsZWN0b3IoJy5hbnQtZm9ybS1pdGVtLWNvbnRyb2wnKTtcbiAgICBjb25zdCB1bml0ID0gYCR7dGhpcy5udW19cHhgO1xuICAgIGlmIChsYWJlbEVsKSB7XG4gICAgICB0aGlzLnJlbmRlci5zZXRTdHlsZShsYWJlbEVsLCAnZmxleCcsIGAwIDAgJHt1bml0fWApO1xuICAgICAgdGhpcy5yZW5kZXIuc2V0U3R5bGUoY29udHJvbEVsLCAnbWF4LXdpZHRoJywgYGNhbGMoMTAwJSAtICR7dW5pdH0pYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyLnNldFN0eWxlKGNvbnRyb2xFbCwgJ21hcmdpbi1sZWZ0JywgdW5pdCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZXI6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmVsID0gZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRlZCkgdGhpcy5pbml0KCk7XG4gIH1cbn1cbiJdfQ==