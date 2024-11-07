import * as i0 from '@angular/core';
import { ViewContainerRef, TemplateRef, Directive, Inject, Input, NgModule } from '@angular/core';

class LetContext {
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
/**
 * @deprecated Will be removed in v19, Please use `@let` instead.
 */
class LetDirective {
    constructor(vc, ref) {
        vc.createEmbeddedView(ref, new LetContext(this));
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: LetDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.11", type: LetDirective, isStandalone: true, selector: "[let]", inputs: { let: "let" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: LetDirective, decorators: [{
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

const DIRECTIVES = [LetDirective];
/**
 * @deprecated Will be removed in v19, Please use `@let` instead.
 */
class LetModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: LetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.11", ngImport: i0, type: LetModule, imports: [LetDirective], exports: [LetDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: LetModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: LetModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: DIRECTIVES,
                    exports: DIRECTIVES
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { LetContext, LetDirective, LetModule };
//# sourceMappingURL=let.mjs.map
