import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '@yelon/theme';
import { LayoutDefaultService } from '@yelon/theme/layout-default';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/spin";
export class YunzaiIframePageComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.menuService = inject(MenuService);
        this.layoutService = inject(LayoutDefaultService);
        this.hasIframe = false;
    }
    ngOnInit() {
        this.iframePageHeight = this.layoutService.options.hideHeader
            ? `${window.innerHeight - 55}px`
            : `${window.innerHeight - 64 - 55}px`;
        this.resizeHandle = () => {
            this.iframePageHeight = this.layoutService.options.hideHeader
                ? `${window.innerHeight - 55}px`
                : `${window.innerHeight - 64 - 55}px`;
        };
        window.addEventListener('resize', this.resizeHandle);
        this.getIframeUrl();
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeHandle);
    }
    getIframeUrl() {
        this.menuService.getRouterLink().subscribe((url) => {
            if (url) {
                this.hasIframe = true;
                this.iframeSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
            else {
                if (localStorage.getItem('iframeSrc')) {
                    this.hasIframe = true;
                    const url = localStorage.getItem('iframeSrc');
                    this.iframeSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                }
                else {
                    this.hasIframe = false;
                }
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiIframePageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.0", type: YunzaiIframePageComponent, isStandalone: true, selector: "yunzai-iframe-page", ngImport: i0, template: `
    @if (hasIframe && iframePageHeight) {
      <div class="yunzai-iframe-page" [style.height]="iframePageHeight">
        <iframe [src]="iframeSafeSrc">
          <p>您的浏览器不支持 iframe 标签。</p>
        </iframe>
      </div>
    } @else {
      <nz-spin nzSpinning="true" />
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiIframePageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-iframe-page`,
                    template: `
    @if (hasIframe && iframePageHeight) {
      <div class="yunzai-iframe-page" [style.height]="iframePageHeight">
        <iframe [src]="iframeSafeSrc">
          <p>您的浏览器不支持 iframe 标签。</p>
        </iframe>
      </div>
    } @else {
      <nz-spin nzSpinning="true" />
    }
  `,
                    standalone: true,
                    imports: [NzSpinModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktaWZyYW1lLXBhZ2UveXVuemFpLWlmcmFtZS1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBa0JsRCxNQUFNLE9BQU8seUJBQXlCO0lBaEJ0QztRQWlCbUIsY0FBUyxHQUFpQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsZ0JBQVcsR0FBZ0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLGtCQUFhLEdBQXlCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBSXBGLGNBQVMsR0FBWSxLQUFLLENBQUM7S0FxQzVCO0lBbENDLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUMzRCxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsSUFBSTtZQUNoQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztRQUV4QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVTtnQkFDM0QsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLElBQUk7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO1FBQzFDLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFjLEVBQUUsRUFBRTtZQUM1RCxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUUsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO29CQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDdEIsTUFBTSxHQUFHLEdBQVcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQVcsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTNDVSx5QkFBeUI7a0dBQXpCLHlCQUF5Qiw4RUFkMUI7Ozs7Ozs7Ozs7R0FVVCwyREFFUyxZQUFZOzsyRkFFWCx5QkFBeUI7a0JBaEJyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBpbmplY3QsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0U2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZS9sYXlvdXQtZGVmYXVsdCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWlmcmFtZS1wYWdlYCxcbiAgdGVtcGxhdGU6IGBcbiAgICBAaWYgKGhhc0lmcmFtZSAmJiBpZnJhbWVQYWdlSGVpZ2h0KSB7XG4gICAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWlmcmFtZS1wYWdlXCIgW3N0eWxlLmhlaWdodF09XCJpZnJhbWVQYWdlSGVpZ2h0XCI+XG4gICAgICAgIDxpZnJhbWUgW3NyY109XCJpZnJhbWVTYWZlU3JjXCI+XG4gICAgICAgICAgPHA+5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyBIGlmcmFtZSDmoIfnrb7jgII8L3A+XG4gICAgICAgIDwvaWZyYW1lPlxuICAgICAgPC9kaXY+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8bnotc3BpbiBuelNwaW5uaW5nPVwidHJ1ZVwiIC8+XG4gICAgfVxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpTcGluTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlJZnJhbWVQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IHNhbml0aXplcjogRG9tU2FuaXRpemVyID0gaW5qZWN0KERvbVNhbml0aXplcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlID0gaW5qZWN0KE1lbnVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBsYXlvdXRTZXJ2aWNlOiBMYXlvdXREZWZhdWx0U2VydmljZSA9IGluamVjdChMYXlvdXREZWZhdWx0U2VydmljZSk7XG5cbiAgaWZyYW1lU2FmZVNyYz86IFNhZmVSZXNvdXJjZVVybDtcbiAgaWZyYW1lUGFnZUhlaWdodD86IHN0cmluZztcbiAgaGFzSWZyYW1lOiBib29sZWFuID0gZmFsc2U7XG4gIHJlc2l6ZUhhbmRsZTogTnpTYWZlQW55O1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaWZyYW1lUGFnZUhlaWdodCA9IHRoaXMubGF5b3V0U2VydmljZS5vcHRpb25zLmhpZGVIZWFkZXJcbiAgICAgID8gYCR7d2luZG93LmlubmVySGVpZ2h0IC0gNTV9cHhgXG4gICAgICA6IGAke3dpbmRvdy5pbm5lckhlaWdodCAtIDY0IC0gNTV9cHhgO1xuXG4gICAgdGhpcy5yZXNpemVIYW5kbGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmlmcmFtZVBhZ2VIZWlnaHQgPSB0aGlzLmxheW91dFNlcnZpY2Uub3B0aW9ucy5oaWRlSGVhZGVyXG4gICAgICAgID8gYCR7d2luZG93LmlubmVySGVpZ2h0IC0gNTV9cHhgXG4gICAgICAgIDogYCR7d2luZG93LmlubmVySGVpZ2h0IC0gNjQgLSA1NX1weGA7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGUpO1xuICAgIHRoaXMuZ2V0SWZyYW1lVXJsKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGUpO1xuICB9XG5cbiAgZ2V0SWZyYW1lVXJsKCk6IHZvaWQge1xuICAgIHRoaXMubWVudVNlcnZpY2UuZ2V0Um91dGVyTGluaygpLnN1YnNjcmliZSgodXJsOiBOelNhZmVBbnkpID0+IHtcbiAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgdGhpcy5oYXNJZnJhbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlmcmFtZVNhZmVTcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWZyYW1lU3JjJykpIHtcbiAgICAgICAgICB0aGlzLmhhc0lmcmFtZSA9IHRydWU7XG4gICAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWZyYW1lU3JjJykgYXMgc3RyaW5nO1xuICAgICAgICAgIHRoaXMuaWZyYW1lU2FmZVNyYyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFzSWZyYW1lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19