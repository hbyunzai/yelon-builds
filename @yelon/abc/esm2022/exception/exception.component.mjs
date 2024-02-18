import { Directionality } from '@angular/cdk/bidi';
import { CdkObserveContent } from '@angular/cdk/observers';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { YelonLocaleService } from '@yelon/theme';
import { isEmpty } from '@yelon/util/browser';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class ExceptionComponent {
    set type(value) {
        const item = this.typeDict[value];
        if (!item)
            return;
        this.fixImg(item.img);
        this._type = value;
        this._title = item.title;
        this._desc = '';
    }
    fixImg(src) {
        this._img = this.dom.bypassSecurityTrustStyle(`url('${src}')`);
    }
    set img(value) {
        this.fixImg(value);
    }
    set title(value) {
        this._title = this.dom.bypassSecurityTrustHtml(value);
    }
    set desc(value) {
        this._desc = this.dom.bypassSecurityTrustHtml(value);
    }
    checkContent() {
        this.hasCon = !isEmpty(this.conTpl.nativeElement);
        this.cdr.detectChanges();
    }
    constructor(configSrv) {
        this.i18n = inject(YelonLocaleService);
        this.dom = inject(DomSanitizer);
        this.directionality = inject(Directionality, { optional: true });
        this.cdr = inject(ChangeDetectorRef);
        this.destroy$ = inject(DestroyRef);
        this.locale = {};
        this.hasCon = false;
        this.dir = 'ltr';
        this._img = '';
        this._title = '';
        this._desc = '';
        this.backRouterLink = '/';
        configSrv.attach(this, 'exception', {
            typeDict: {
                403: {
                    img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
                    title: '403'
                },
                404: {
                    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
                    title: '404'
                },
                500: {
                    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
                    title: '500'
                }
            }
        });
    }
    ngOnInit() {
        this.dir = this.directionality?.value;
        this.directionality?.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(direction => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.i18n.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getData('exception');
            this.cdr.detectChanges();
        });
        this.checkContent();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ExceptionComponent, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: ExceptionComponent, isStandalone: true, selector: "exception", inputs: { type: "type", img: "img", title: "title", desc: "desc", backRouterLink: "backRouterLink" }, host: { properties: { "class.exception": "true", "class.exception-rtl": "dir === 'rtl'" } }, viewQueries: [{ propertyName: "conTpl", first: true, predicate: ["conTpl"], descendants: true, static: true }], exportAs: ["exception"], ngImport: i0, template: "<div class=\"exception__img-block\">\n  <div class=\"exception__img\" [style.backgroundImage]=\"_img\"></div>\n</div>\n<div class=\"exception__cont\">\n  <h1 class=\"exception__cont-title\" [innerHTML]=\"_title\"></h1>\n  <div class=\"exception__cont-desc\" [innerHTML]=\"_desc || locale[_type]\"></div>\n  <div class=\"exception__cont-actions\">\n    <div (cdkObserveContent)=\"checkContent()\" #conTpl>\n      <ng-content />\n    </div>\n    @if (!hasCon) {\n      <button nz-button [routerLink]=\"backRouterLink\" [nzType]=\"'primary'\">\n        {{ locale.backToHome }}\n      </button>\n    }\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }, { kind: "component", type: NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ExceptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'exception', exportAs: 'exception', host: {
                        '[class.exception]': 'true',
                        '[class.exception-rtl]': `dir === 'rtl'`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [CdkObserveContent, NzButtonComponent, RouterLink], template: "<div class=\"exception__img-block\">\n  <div class=\"exception__img\" [style.backgroundImage]=\"_img\"></div>\n</div>\n<div class=\"exception__cont\">\n  <h1 class=\"exception__cont-title\" [innerHTML]=\"_title\"></h1>\n  <div class=\"exception__cont-desc\" [innerHTML]=\"_desc || locale[_type]\"></div>\n  <div class=\"exception__cont-actions\">\n    <div (cdkObserveContent)=\"checkContent()\" #conTpl>\n      <ng-content />\n    </div>\n    @if (!hasCon) {\n      <button nz-button [routerLink]=\"backRouterLink\" [nzType]=\"'primary'\">\n        {{ locale.backToHome }}\n      </button>\n    }\n  </div>\n</div>\n" }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { conTpl: [{
                type: ViewChild,
                args: ['conTpl', { static: true }]
            }], type: [{
                type: Input
            }], img: [{
                type: Input
            }], title: [{
                type: Input
            }], desc: [{
                type: Input
            }], backRouterLink: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9leGNlcHRpb24vZXhjZXB0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9leGNlcHRpb24vZXhjZXB0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLEtBQUssRUFFTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQWMsTUFBTSxjQUFjLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFtQnpELE1BQU0sT0FBTyxrQkFBa0I7SUFxQjdCLElBQ0ksSUFBSSxDQUFDLEtBQW9CO1FBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FB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QUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzhHQXhGVSxrQkFBa0I7a0dBQWxCLGtCQUFrQixpWkN4Qy9CLDJtQkFpQkEsNENEcUJZLGlCQUFpQixvTEFBRSxpQkFBaUIsZ09BQUUsVUFBVTs7MkZBRS9DLGtCQUFrQjtrQkFkOUIsU0FBUzsrQkFDRSxXQUFXLFlBQ1gsV0FBVyxRQUVmO3dCQUNKLG1CQUFtQixFQUFFLE1BQU07d0JBQzNCLHVCQUF1QixFQUFFLGVBQWU7cUJBQ3pDLHVCQUNvQixLQUFLLG1CQUNULHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksY0FDekIsSUFBSSxXQUNQLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxDQUFDO3dGQVdaLE1BQU07c0JBQXBELFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFhakMsSUFBSTtzQkFEUCxLQUFLO2dCQWdCRixHQUFHO3NCQUROLEtBQUs7Z0JBTUYsS0FBSztzQkFEUixLQUFLO2dCQU1GLElBQUk7c0JBRFAsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENka09ic2VydmVDb250ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgaW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCwgU2FmZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgUm91dGVyTGluayB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFllbG9uTG9jYWxlU2VydmljZSwgTG9jYWxlRGF0YSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnQHllbG9uL3V0aWwvYnJvd3Nlcic7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IE56QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgRXhjZXB0aW9uVHlwZSA9IDQwMyB8IDQwNCB8IDUwMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhjZXB0aW9uJyxcbiAgZXhwb3J0QXM6ICdleGNlcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZXhjZXB0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZXhjZXB0aW9uXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmV4Y2VwdGlvbi1ydGxdJzogYGRpciA9PT0gJ3J0bCdgXG4gIH0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0Nka09ic2VydmVDb250ZW50LCBOekJ1dHRvbkNvbXBvbmVudCwgUm91dGVyTGlua11cbn0pXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3R5cGU6IEV4Y2VwdGlvblR5cGUgfCBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBpMThuID0gaW5qZWN0KFllbG9uTG9jYWxlU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9tID0gaW5qZWN0KERvbVNhbml0aXplcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHkgPSBpbmplY3QoRGlyZWN0aW9uYWxpdHksIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RyID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JCA9IGluamVjdChEZXN0cm95UmVmKTtcblxuICBAVmlld0NoaWxkKCdjb25UcGwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIGNvblRwbCE6IEVsZW1lbnRSZWY7XG5cbiAgX3R5cGUhOiBFeGNlcHRpb25UeXBlO1xuICBsb2NhbGU6IExvY2FsZURhdGEgPSB7fTtcbiAgaGFzQ29uID0gZmFsc2U7XG4gIGRpcj86IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIF9pbWc6IFNhZmVVcmwgPSAnJztcbiAgX3RpdGxlOiBTYWZlSHRtbCA9ICcnO1xuICBfZGVzYzogU2FmZUh0bWwgPSAnJztcbiAgcHJpdmF0ZSB0eXBlRGljdCE6IHsgW2tleTogbnVtYmVyIHwgc3RyaW5nXTogeyBpbWc6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgZGVzYz86IHN0cmluZyB9IH07XG5cbiAgQElucHV0KClcbiAgc2V0IHR5cGUodmFsdWU6IEV4Y2VwdGlvblR5cGUpIHtcbiAgICBjb25zdCBpdGVtID0gdGhpcy50eXBlRGljdFt2YWx1ZV07XG4gICAgaWYgKCFpdGVtKSByZXR1cm47XG5cbiAgICB0aGlzLmZpeEltZyhpdGVtLmltZyk7XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xuICAgIHRoaXMuX3RpdGxlID0gaXRlbS50aXRsZTtcbiAgICB0aGlzLl9kZXNjID0gJyc7XG4gIH1cblxuICBwcml2YXRlIGZpeEltZyhzcmM6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2ltZyA9IHRoaXMuZG9tLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgdXJsKCcke3NyY30nKWApO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGltZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5maXhJbWcodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aXRsZSA9IHRoaXMuZG9tLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkZXNjKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZXNjID0gdGhpcy5kb20uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgYmFja1JvdXRlckxpbms6IHN0cmluZyB8IE56U2FmZUFueVtdID0gJy8nO1xuXG4gIGNoZWNrQ29udGVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmhhc0NvbiA9ICFpc0VtcHR5KHRoaXMuY29uVHBsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSkge1xuICAgIGNvbmZpZ1Nydi5hdHRhY2godGhpcywgJ2V4Y2VwdGlvbicsIHtcbiAgICAgIHR5cGVEaWN0OiB7XG4gICAgICAgIDQwMzoge1xuICAgICAgICAgIGltZzogJ2h0dHBzOi8vZ3cuYWxpcGF5b2JqZWN0cy5jb20vem9zL3Jtc3BvcnRhbC93WmNuR3FSRHloUE9FWUZjWkRuYi5zdmcnLFxuICAgICAgICAgIHRpdGxlOiAnNDAzJ1xuICAgICAgICB9LFxuICAgICAgICA0MDQ6IHtcbiAgICAgICAgICBpbWc6ICdodHRwczovL2d3LmFsaXBheW9iamVjdHMuY29tL3pvcy9ybXNwb3J0YWwvS3BucGNoWHNvYlJnTEVsRW96ekkuc3ZnJyxcbiAgICAgICAgICB0aXRsZTogJzQwNCdcbiAgICAgICAgfSxcbiAgICAgICAgNTAwOiB7XG4gICAgICAgICAgaW1nOiAnaHR0cHM6Ly9ndy5hbGlwYXlvYmplY3RzLmNvbS96b3Mvcm1zcG9ydGFsL1JWUlVBWWRDR2VZTkJXb0tpSXdCLnN2ZycsXG4gICAgICAgICAgdGl0bGU6ICc1MDAnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eT8udmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eT8uY2hhbmdlLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZGlyZWN0aW9uID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICAgIHRoaXMuaTE4bi5jaGFuZ2UucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXREYXRhKCdleGNlcHRpb24nKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNoZWNrQ29udGVudCgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZXhjZXB0aW9uX19pbWctYmxvY2tcIj5cbiAgPGRpdiBjbGFzcz1cImV4Y2VwdGlvbl9faW1nXCIgW3N0eWxlLmJhY2tncm91bmRJbWFnZV09XCJfaW1nXCI+PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJleGNlcHRpb25fX2NvbnRcIj5cbiAgPGgxIGNsYXNzPVwiZXhjZXB0aW9uX19jb250LXRpdGxlXCIgW2lubmVySFRNTF09XCJfdGl0bGVcIj48L2gxPlxuICA8ZGl2IGNsYXNzPVwiZXhjZXB0aW9uX19jb250LWRlc2NcIiBbaW5uZXJIVE1MXT1cIl9kZXNjIHx8IGxvY2FsZVtfdHlwZV1cIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImV4Y2VwdGlvbl9fY29udC1hY3Rpb25zXCI+XG4gICAgPGRpdiAoY2RrT2JzZXJ2ZUNvbnRlbnQpPVwiY2hlY2tDb250ZW50KClcIiAjY29uVHBsPlxuICAgICAgPG5nLWNvbnRlbnQgLz5cbiAgICA8L2Rpdj5cbiAgICBAaWYgKCFoYXNDb24pIHtcbiAgICAgIDxidXR0b24gbnotYnV0dG9uIFtyb3V0ZXJMaW5rXT1cImJhY2tSb3V0ZXJMaW5rXCIgW256VHlwZV09XCIncHJpbWFyeSdcIj5cbiAgICAgICAge3sgbG9jYWxlLmJhY2tUb0hvbWUgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIH1cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==