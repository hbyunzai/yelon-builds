import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class LetContext {
    constructor(dir) {
        this.dir = dir;
    }
    get $implicit() {
        return this.dir.let;
    }
    get let() {
        return this.dir.let;
    }
}
export class LetDirective {
    constructor(vc, ref) {
        vc.createEmbeddedView(ref, new LetContext(this));
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: LetDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.5", type: LetDirective, isStandalone: true, selector: "[let]", inputs: { let: "let" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: LetDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[let]', standalone: true }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }], propDecorators: { let: [{
                type: Input,
                args: [{ required: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUl4RixNQUFNLE9BQU8sVUFBVTtJQUNyQixZQUE2QixHQUFvQjtRQUFwQixRQUFHLEdBQUgsR0FBRyxDQUFpQjtJQUFHLENBQUM7SUFFckQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFHRCxNQUFNLE9BQU8sWUFBWTtJQUd2QixZQUFzQyxFQUFvQixFQUF1QixHQUErQjtRQUM5RyxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksVUFBVSxDQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBSSxJQUFxQixFQUFFLElBQWU7UUFDckUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzhHQVRVLFlBQVksa0JBR0gsZ0JBQWdCLGFBQWdDLFdBQVc7a0dBSHBFLFlBQVk7OzJGQUFaLFlBQVk7a0JBRHhCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7OzBCQUluQyxNQUFNOzJCQUFDLGdCQUFnQjs7MEJBQXlCLE1BQU07MkJBQUMsV0FBVzt5Q0FGcEQsR0FBRztzQkFBN0IsS0FBSzt1QkFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIExldENvbnRleHQ8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRpcjogTGV0RGlyZWN0aXZlPFQ+KSB7fVxuXG4gIGdldCAkaW1wbGljaXQoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuZGlyLmxldDtcbiAgfVxuXG4gIGdldCBsZXQoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuZGlyLmxldDtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbGV0XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8VD4ge1xuICBASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSB9KSBsZXQhOiBUO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgdmM6IFZpZXdDb250YWluZXJSZWYsIEBJbmplY3QoVGVtcGxhdGVSZWYpIHJlZjogVGVtcGxhdGVSZWY8TGV0Q29udGV4dDxUPj4pIHtcbiAgICB2Yy5jcmVhdGVFbWJlZGRlZFZpZXcocmVmLCBuZXcgTGV0Q29udGV4dDxUPih0aGlzKSk7XG4gIH1cblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxUPihfZGlyOiBMZXREaXJlY3RpdmU8VD4sIF9jdHg6IE56U2FmZUFueSk6IF9jdHggaXMgTGV0RGlyZWN0aXZlPFQ+IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19