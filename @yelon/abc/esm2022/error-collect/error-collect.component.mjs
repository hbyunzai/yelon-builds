import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, Input, ViewEncapsulation, inject, numberAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class ErrorCollectComponent {
    constructor(configSrv) {
        this.el = inject(ElementRef).nativeElement;
        this.cdr = inject(ChangeDetectorRef);
        this.doc = inject(DOCUMENT);
        this.directionality = inject(Directionality, { optional: true });
        this.platform = inject(Platform);
        this.destroy$ = inject(DestroyRef);
        this.formEl = null;
        this._hiden = true;
        this.count = 0;
        this.dir = 'ltr';
        configSrv.attach(this, 'errorCollect', { freq: 500, offsetTop: 65 + 64 + 8 * 2 });
    }
    get errEls() {
        return this.formEl.querySelectorAll('.ant-form-item-has-error');
    }
    update() {
        const count = this.errEls.length;
        if (count === this.count)
            return;
        this.count = count;
        this._hiden = count === 0;
        this.cdr.markForCheck();
    }
    _click() {
        if (this.count === 0)
            return false;
        // nz-form-control
        const els = this.errEls;
        const formItemEl = this.findParent(els[0], '[nz-form-control]') || els[0];
        formItemEl.scrollIntoView(true);
        // fix header height
        this.doc.documentElement.scrollTop -= this.offsetTop;
        return true;
    }
    install() {
        this.dir = this.directionality?.value;
        this.directionality?.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(direction => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        interval(this.freq)
            .pipe(takeUntilDestroyed(this.destroy$))
            .subscribe(() => this.update());
        this.update();
    }
    findParent(el, selector) {
        let retEl = null;
        while (el) {
            if (el.querySelector(selector)) {
                retEl = el;
                break;
            }
            el = el.parentElement;
        }
        return retEl;
    }
    ngOnInit() {
        if (!this.platform.isBrowser)
            return;
        this.formEl = this.findParent(this.el, 'form');
        if (this.formEl === null)
            throw new Error('No found form element');
        this.install();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ErrorCollectComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.2.1", type: ErrorCollectComponent, isStandalone: true, selector: "error-collect, [error-collect]", inputs: { freq: ["freq", "freq", numberAttribute], offsetTop: ["offsetTop", "offsetTop", numberAttribute] }, host: { listeners: { "click": "_click()" }, properties: { "class.error-collect": "true", "class.error-collect-rtl": "dir === 'rtl'", "class.d-none": "_hiden" } }, exportAs: ["errorCollect"], ngImport: i0, template: `
    <i nz-icon nzType="exclamation-circle"></i>
    <span class="error-collect__count">{{ count }}</span>
  `, isInline: true, dependencies: [{ kind: "directive", type: NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ErrorCollectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'error-collect, [error-collect]',
                    exportAs: 'errorCollect',
                    template: `
    <i nz-icon nzType="exclamation-circle"></i>
    <span class="error-collect__count">{{ count }}</span>
  `,
                    host: {
                        '[class.error-collect]': 'true',
                        '[class.error-collect-rtl]': `dir === 'rtl'`,
                        '[class.d-none]': '_hiden',
                        '(click)': '_click()'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true,
                    imports: [NzIconDirective]
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { freq: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], offsetTop: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItY29sbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hYmMvZXJyb3ItY29sbGVjdC9lcnJvci1jb2xsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBRUwsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFxQnJELE1BQU0sT0FBTyxxQkFBcUI7SUFpQmhDLFlBQVksU0FBOEI7UUFoQnpCLE9BQUUsR0FBZ0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUNuRCxRQUFHLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEMsUUFBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1RCxhQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLGFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMs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RSxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs4R0ExRVUscUJBQXFCO2tHQUFyQixxQkFBcUIsbUdBY1osZUFBZSx5Q0FDZixlQUFlLDROQS9CekI7OztHQUdULDREQVdTLGVBQWU7OzJGQUVkLHFCQUFxQjtrQkFuQmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRTs7O0dBR1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLHVCQUF1QixFQUFFLE1BQU07d0JBQy9CLDJCQUEyQixFQUFFLGVBQWU7d0JBQzVDLGdCQUFnQixFQUFFLFFBQVE7d0JBQzFCLFNBQVMsRUFBRSxVQUFVO3FCQUN0QjtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCO3dGQWV3QyxJQUFJO3NCQUExQyxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRTtnQkFDRSxTQUFTO3NCQUEvQyxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGluamVjdCxcbiAgbnVtYmVyQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHsgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBOekljb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlcnJvci1jb2xsZWN0LCBbZXJyb3ItY29sbGVjdF0nLFxuICBleHBvcnRBczogJ2Vycm9yQ29sbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+XG4gICAgPHNwYW4gY2xhc3M9XCJlcnJvci1jb2xsZWN0X19jb3VudFwiPnt7IGNvdW50IH19PC9zcGFuPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5lcnJvci1jb2xsZWN0XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmVycm9yLWNvbGxlY3QtcnRsXSc6IGBkaXIgPT09ICdydGwnYCxcbiAgICAnW2NsYXNzLmQtbm9uZV0nOiAnX2hpZGVuJyxcbiAgICAnKGNsaWNrKSc6ICdfY2xpY2soKSdcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpJY29uRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvckNvbGxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IGVsOiBIVE1MRWxlbWVudCA9IGluamVjdChFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkaXJlY3Rpb25hbGl0eSA9IGluamVjdChEaXJlY3Rpb25hbGl0eSwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybSA9IGluamVjdChQbGF0Zm9ybSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQgPSBpbmplY3QoRGVzdHJveVJlZik7XG5cbiAgcHJpdmF0ZSBmb3JtRWw6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIF9oaWRlbiA9IHRydWU7XG4gIGNvdW50ID0gMDtcbiAgZGlyPzogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgZnJlcSE6IG51bWJlcjtcbiAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgb2Zmc2V0VG9wITogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSkge1xuICAgIGNvbmZpZ1Nydi5hdHRhY2godGhpcywgJ2Vycm9yQ29sbGVjdCcsIHsgZnJlcTogNTAwLCBvZmZzZXRUb3A6IDY1ICsgNjQgKyA4ICogMiB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGVyckVscygpOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUVsIS5xdWVyeVNlbGVjdG9yQWxsKCcuYW50LWZvcm0taXRlbS1oYXMtZXJyb3InKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5lcnJFbHMubGVuZ3RoO1xuICAgIGlmIChjb3VudCA9PT0gdGhpcy5jb3VudCkgcmV0dXJuO1xuICAgIHRoaXMuY291bnQgPSBjb3VudDtcbiAgICB0aGlzLl9oaWRlbiA9IGNvdW50ID09PSAwO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgX2NsaWNrKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNvdW50ID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gbnotZm9ybS1jb250cm9sXG4gICAgY29uc3QgZWxzID0gdGhpcy5lcnJFbHM7XG4gICAgY29uc3QgZm9ybUl0ZW1FbCA9IHRoaXMuZmluZFBhcmVudChlbHNbMF0sICdbbnotZm9ybS1jb250cm9sXScpIHx8IGVsc1swXTtcbiAgICBmb3JtSXRlbUVsLnNjcm9sbEludG9WaWV3KHRydWUpO1xuICAgIC8vIGZpeCBoZWFkZXIgaGVpZ2h0XG4gICAgdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtPSB0aGlzLm9mZnNldFRvcDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdGFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHk/LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHk/LmNoYW5nZS5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGRpcmVjdGlvbiA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCh0aGlzLmZyZXEpXG4gICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlKCkpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRQYXJlbnQoZWw6IEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcbiAgICBsZXQgcmV0RWw6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldEVsID0gZWwgYXMgSFRNTEZvcm1FbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCBhcyBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiByZXRFbDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHJldHVybjtcblxuICAgIHRoaXMuZm9ybUVsID0gdGhpcy5maW5kUGFyZW50KHRoaXMuZWwsICdmb3JtJyk7XG4gICAgaWYgKHRoaXMuZm9ybUVsID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGZvdW5kIGZvcm0gZWxlbWVudCcpO1xuICAgIHRoaXMuaW5zdGFsbCgpO1xuICB9XG59XG4iXX0=