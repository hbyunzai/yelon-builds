import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, InjectionToken, Input, isDevMode, Output, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nPipe } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
export const YUNZAI_THEME_BTN_KEYS = new InjectionToken('YUNZAI_THEME_BTN_KEYS');
export class ThemeBtnComponent {
    constructor() {
        this.doc = inject(DOCUMENT);
        this.platform = inject(Platform);
        this.renderer = inject(Renderer2);
        this.configSrv = inject(YunzaiConfigService);
        this.directionality = inject(Directionality, { optional: true });
        this.cdr = inject(ChangeDetectorRef);
        this.destroy$ = inject(DestroyRef);
        this.theme = 'default';
        this.isDev = isDevMode();
        this.types = [
            { key: 'default', text: 'theme.default', color: '#2163ff' },
            { key: 'compact', text: 'theme.compact', color: '#2163ff' },
            { key: 'dark', text: 'theme.dark', color: '#020202' },
            { key: 'yuhong', text: 'theme.yuhong', color: '#C04851' },
            { key: 'danjuhuang', text: 'theme.danjuhuang', color: '#FBA414' },
            { key: 'xinghuang', text: 'theme.xinghuang', color: '#F28E16' },
            { key: 'shilv', text: 'theme.shilv', color: '#57C3C2' },
            { key: 'zhulv', text: 'theme.zhulv', color: '#1BA784' },
            { key: 'youlan', text: 'theme.youlan', color: '#1781B5' },
            { key: 'dianqing', text: 'theme.dianqing', color: '#1661AB' },
            { key: 'shangengzi', text: 'theme.shangengzi', color: '#61649F' },
            { key: 'shuiniuhui', text: 'theme.shuiniuhui', color: '#2F2F35' }
        ];
        this.devTips = `When the dark.css file can't be found, you need to run it once: npm run theme`;
        this.deployUrl = '';
        this.themeChange = new EventEmitter();
        this.dir = 'ltr';
        this.key = inject(YUNZAI_THEME_BTN_KEYS, { optional: true }) ?? 'site-theme';
    }
    ngOnInit() {
        this.dir = this.directionality?.value;
        this.directionality?.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.initTheme();
    }
    initTheme() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = localStorage.getItem(this.key) || 'default';
        this.updateChartTheme();
        this.onThemeChange(this.theme);
    }
    updateChartTheme() {
        this.configSrv.set('chart', { theme: this.theme === 'dark' ? 'dark' : '' });
    }
    onThemeChange(theme) {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = theme;
        this.themeChange.emit(theme);
        this.renderer.setAttribute(this.doc.body, 'data-theme', theme);
        const dom = this.doc.getElementById(this.key);
        if (dom) {
            dom.remove();
        }
        localStorage.removeItem(this.key);
        if (theme !== 'default') {
            const el = this.doc.createElement('link');
            el.type = 'text/css';
            el.rel = 'stylesheet';
            el.id = this.key;
            el.href = `${this.deployUrl}assets/style.${theme}.css`;
            localStorage.setItem(this.key, theme);
            this.doc.body.append(el);
        }
        this.updateChartTheme();
    }
    ngOnDestroy() {
        const el = this.doc.getElementById(this.key);
        if (el != null) {
            this.doc.body.removeChild(el);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: ThemeBtnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.0", type: ThemeBtnComponent, isStandalone: true, selector: "theme-btn", inputs: { types: "types", devTips: "devTips", deployUrl: "deployUrl" }, outputs: { themeChange: "themeChange" }, host: { properties: { "class.theme-btn": "true", "class.theme-btn-rtl": "dir === 'rtl'" } }, ngImport: i0, template: "<div\n  class=\"ant-avatar ant-avatar-circle ant-avatar-icon yunzai-default__nav-item\"\n  nz-dropdown\n  nzPlacement=\"bottomRight\"\n  nzTrigger=\"click\"\n  [nzDropdownMenu]=\"types.length > 0 ? menu : null\"\n>\n  <svg\n    nz-tooltip\n    [nzTooltipTitle]=\"isDev ? devTips : null\"\n    class=\"anticon\"\n    role=\"img\"\n    width=\"21\"\n    height=\"21\"\n    viewBox=\"0 0 21 21\"\n    fill=\"currentColor\"\n  >\n    <g fill-rule=\"evenodd\">\n      <g fill-rule=\"nonzero\">\n        <path\n          d=\"M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z\"\n        />\n      </g>\n    </g>\n  </svg>\n  <nz-dropdown-menu #menu=\"nzDropdownMenu\">\n    <ul nz-menu nzSelectable class=\"theme-list\">\n      @for (i of types; track $index) {\n        <li nz-menu-item [attr.data-text]=\"i.text | i18n\" (click)=\"onThemeChange(i.key)\" [style]=\"{ color: i.color }\">\n          <i nz-icon nzType=\"bg-colors\"></i> {{ i.text | i18n }}\n        </li>\n      }\n    </ul>\n  </nz-dropdown-menu>\n</div>\n", dependencies: [{ kind: "directive", type: NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: ThemeBtnComponent, decorators: [{
            type: Component,
            args: [{ selector: 'theme-btn', host: {
                        '[class.theme-btn]': `true`,
                        '[class.theme-btn-rtl]': `dir === 'rtl'`
                    }, changeDetection: ChangeDetectionStrategy.OnPush, standalone: true, imports: [
                        NzDropDownDirective,
                        NzDropdownMenuComponent,
                        NzMenuDirective,
                        NzMenuItemComponent,
                        NzTooltipDirective,
                        NzIconModule,
                        I18nPipe
                    ], template: "<div\n  class=\"ant-avatar ant-avatar-circle ant-avatar-icon yunzai-default__nav-item\"\n  nz-dropdown\n  nzPlacement=\"bottomRight\"\n  nzTrigger=\"click\"\n  [nzDropdownMenu]=\"types.length > 0 ? menu : null\"\n>\n  <svg\n    nz-tooltip\n    [nzTooltipTitle]=\"isDev ? devTips : null\"\n    class=\"anticon\"\n    role=\"img\"\n    width=\"21\"\n    height=\"21\"\n    viewBox=\"0 0 21 21\"\n    fill=\"currentColor\"\n  >\n    <g fill-rule=\"evenodd\">\n      <g fill-rule=\"nonzero\">\n        <path\n          d=\"M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z\"\n        />\n      </g>\n    </g>\n  </svg>\n  <nz-dropdown-menu #menu=\"nzDropdownMenu\">\n    <ul nz-menu nzSelectable class=\"theme-list\">\n      @for (i of types; track $index) {\n        <li nz-menu-item [attr.data-text]=\"i.text | i18n\" (click)=\"onThemeChange(i.key)\" [style]=\"{ color: i.color }\">\n          <i nz-icon nzType=\"bg-colors\"></i> {{ i.text | i18n }}\n        </li>\n      }\n    </ul>\n  </nz-dropdown-menu>\n</div>\n" }]
        }], propDecorators: { types: [{
                type: Input
            }], devTips: [{
                type: Input
            }], deployUrl: [{
                type: Input
            }], themeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnRuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3RoZW1lLWJ0bi90aGVtZS1idG4uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvdGhlbWUtYnRuL3RoZW1lLWJ0bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxTQUFTLEVBR1QsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQVEzRCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGNBQWMsQ0FBUyx1QkFBdUIsQ0FBQyxDQUFD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cUJBQ3pDLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGNBQ25DLElBQUksV0FDUDt3QkFDUCxtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsWUFBWTt3QkFDWixRQUFRO3FCQUNUOzhCQWFRLEtBQUs7c0JBQWIsS0FBSztnQkFjRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDYSxXQUFXO3NCQUE3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBpc0Rldk1vZGUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcblxuaW1wb3J0IHsgSTE4blBpcGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBOekRyb3BEb3duRGlyZWN0aXZlLCBOekRyb3Bkb3duTWVudUNvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56TWVudURpcmVjdGl2ZSwgTnpNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVudSc7XG5pbXBvcnQgeyBOelRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRoZW1lQnRuVHlwZSB7XG4gIGtleTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgWVVOWkFJX1RIRU1FX0JUTl9LRVlTID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1lVTlpBSV9USEVNRV9CVE5fS0VZUycpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aGVtZS1idG4nLFxuICB0ZW1wbGF0ZVVybDogJy4vdGhlbWUtYnRuLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudGhlbWUtYnRuXSc6IGB0cnVlYCxcbiAgICAnW2NsYXNzLnRoZW1lLWJ0bi1ydGxdJzogYGRpciA9PT0gJ3J0bCdgXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgTnpEcm9wRG93bkRpcmVjdGl2ZSxcbiAgICBOekRyb3Bkb3duTWVudUNvbXBvbmVudCxcbiAgICBOek1lbnVEaXJlY3RpdmUsXG4gICAgTnpNZW51SXRlbUNvbXBvbmVudCxcbiAgICBOelRvb2x0aXBEaXJlY3RpdmUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIEkxOG5QaXBlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGhlbWVCdG5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybSA9IGluamVjdChQbGF0Zm9ybSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXIgPSBpbmplY3QoUmVuZGVyZXIyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWdTcnYgPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHkgPSBpbmplY3QoRGlyZWN0aW9uYWxpdHksIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RyID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JCA9IGluamVjdChEZXN0cm95UmVmKTtcblxuICBwcml2YXRlIHRoZW1lID0gJ2RlZmF1bHQnO1xuICBpc0RldiA9IGlzRGV2TW9kZSgpO1xuICBASW5wdXQoKSB0eXBlczogVGhlbWVCdG5UeXBlW10gPSBbXG4gICAgeyBrZXk6ICdkZWZhdWx0JywgdGV4dDogJ3RoZW1lLmRlZmF1bHQnLCBjb2xvcjogJyMyMTYzZmYnIH0sXG4gICAgeyBrZXk6ICdjb21wYWN0JywgdGV4dDogJ3RoZW1lLmNvbXBhY3QnLCBjb2xvcjogJyMyMTYzZmYnIH0sXG4gICAgeyBrZXk6ICdkYXJrJywgdGV4dDogJ3RoZW1lLmRhcmsnLCBjb2xvcjogJyMwMjAyMDInIH0sXG4gICAgeyBrZXk6ICd5dWhvbmcnLCB0ZXh0OiAndGhlbWUueXVob25nJywgY29sb3I6ICcjQzA0ODUxJyB9LFxuICAgIHsga2V5OiAnZGFuanVodWFuZycsIHRleHQ6ICd0aGVtZS5kYW5qdWh1YW5nJywgY29sb3I6ICcjRkJBNDE0JyB9LFxuICAgIHsga2V5OiAneGluZ2h1YW5nJywgdGV4dDogJ3RoZW1lLnhpbmdodWFuZycsIGNvbG9yOiAnI0YyOEUxNicgfSxcbiAgICB7IGtleTogJ3NoaWx2JywgdGV4dDogJ3RoZW1lLnNoaWx2JywgY29sb3I6ICcjNTdDM0MyJyB9LFxuICAgIHsga2V5OiAnemh1bHYnLCB0ZXh0OiAndGhlbWUuemh1bHYnLCBjb2xvcjogJyMxQkE3ODQnIH0sXG4gICAgeyBrZXk6ICd5b3VsYW4nLCB0ZXh0OiAndGhlbWUueW91bGFuJywgY29sb3I6ICcjMTc4MUI1JyB9LFxuICAgIHsga2V5OiAnZGlhbnFpbmcnLCB0ZXh0OiAndGhlbWUuZGlhbnFpbmcnLCBjb2xvcjogJyMxNjYxQUInIH0sXG4gICAgeyBrZXk6ICdzaGFuZ2VuZ3ppJywgdGV4dDogJ3RoZW1lLnNoYW5nZW5nemknLCBjb2xvcjogJyM2MTY0OUYnIH0sXG4gICAgeyBrZXk6ICdzaHVpbml1aHVpJywgdGV4dDogJ3RoZW1lLnNodWluaXVodWknLCBjb2xvcjogJyMyRjJGMzUnIH1cbiAgXTtcbiAgQElucHV0KCkgZGV2VGlwcyA9IGBXaGVuIHRoZSBkYXJrLmNzcyBmaWxlIGNhbid0IGJlIGZvdW5kLCB5b3UgbmVlZCB0byBydW4gaXQgb25jZTogbnBtIHJ1biB0aGVtZWA7XG4gIEBJbnB1dCgpIGRlcGxveVVybCA9ICcnO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdGhlbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgZGlyPzogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcHJpdmF0ZSBrZXkgPSBpbmplY3QoWVVOWkFJX1RIRU1FX0JUTl9LRVlTLCB7IG9wdGlvbmFsOiB0cnVlIH0pID8/ICdzaXRlLXRoZW1lJztcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHk/LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHk/LmNoYW5nZS5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbml0VGhlbWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFRoZW1lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50aGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KSB8fCAnZGVmYXVsdCc7XG4gICAgdGhpcy51cGRhdGVDaGFydFRoZW1lKCk7XG4gICAgdGhpcy5vblRoZW1lQ2hhbmdlKHRoaXMudGhlbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDaGFydFRoZW1lKCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnU3J2LnNldCgnY2hhcnQnLCB7IHRoZW1lOiB0aGlzLnRoZW1lID09PSAnZGFyaycgPyAnZGFyaycgOiAnJyB9KTtcbiAgfVxuXG4gIG9uVGhlbWVDaGFuZ2UodGhlbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50aGVtZSA9IHRoZW1lO1xuICAgIHRoaXMudGhlbWVDaGFuZ2UuZW1pdCh0aGVtZSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5kb2MuYm9keSwgJ2RhdGEtdGhlbWUnLCB0aGVtZSk7XG4gICAgY29uc3QgZG9tID0gdGhpcy5kb2MuZ2V0RWxlbWVudEJ5SWQodGhpcy5rZXkpO1xuICAgIGlmIChkb20pIHtcbiAgICAgIGRvbS5yZW1vdmUoKTtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xuICAgIGlmICh0aGVtZSAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGVsLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgZWwucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgZWwuaWQgPSB0aGlzLmtleTtcbiAgICAgIGVsLmhyZWYgPSBgJHt0aGlzLmRlcGxveVVybH1hc3NldHMvc3R5bGUuJHt0aGVtZX0uY3NzYDtcblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIHRoZW1lKTtcbiAgICAgIHRoaXMuZG9jLmJvZHkuYXBwZW5kKGVsKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDaGFydFRoZW1lKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeUlkKHRoaXMua2V5KTtcbiAgICBpZiAoZWwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kb2MuYm9keS5yZW1vdmVDaGlsZChlbCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2XG4gIGNsYXNzPVwiYW50LWF2YXRhciBhbnQtYXZhdGFyLWNpcmNsZSBhbnQtYXZhdGFyLWljb24geXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCJcbiAgbnotZHJvcGRvd25cbiAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgW256RHJvcGRvd25NZW51XT1cInR5cGVzLmxlbmd0aCA+IDAgPyBtZW51IDogbnVsbFwiXG4+XG4gIDxzdmdcbiAgICBuei10b29sdGlwXG4gICAgW256VG9vbHRpcFRpdGxlXT1cImlzRGV2ID8gZGV2VGlwcyA6IG51bGxcIlxuICAgIGNsYXNzPVwiYW50aWNvblwiXG4gICAgcm9sZT1cImltZ1wiXG4gICAgd2lkdGg9XCIyMVwiXG4gICAgaGVpZ2h0PVwiMjFcIlxuICAgIHZpZXdCb3g9XCIwIDAgMjEgMjFcIlxuICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICA+XG4gICAgPGcgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPlxuICAgICAgPGcgZmlsbC1ydWxlPVwibm9uemVyb1wiPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNNy4wMiAzLjYzNWwxMi41MTggMTIuNTE4YTEuODYzIDEuODYzIDAgMDEwIDIuNjM1bC0xLjMxNyAxLjMxOGExLjg2MyAxLjg2MyAwIDAxLTIuNjM1IDBMMy4wNjggNy41ODhBMi43OTUgMi43OTUgMCAxMTcuMDIgMy42MzV6bTIuMDkgMTQuNDI4YS45MzIuOTMyIDAgMTEwIDEuODY0LjkzMi45MzIgMCAwMTAtMS44NjR6bS0uMDQzLTkuNzQ3TDcuNzUgOS42MzVsOS4xNTQgOS4xNTMgMS4zMTgtMS4zMTctOS4xNTQtOS4xNTV6TTMuNTIgMTIuNDczYy41MTQgMCAuOTMxLjQxNy45MzEuOTMxdi45MzJoLjkzMmEuOTMyLjkzMiAwIDExMCAxLjg2NGgtLjkzMnYuOTMxYS45MzIuOTMyIDAgMDEtMS44NjMgMGwtLjAwMS0uOTMxaC0uOTNhLjkzMi45MzIgMCAwMTAtMS44NjRoLjkzdi0uOTMyYzAtLjUxNC40MTgtLjkzMS45MzMtLjkzMXptMTUuMzc0LTMuNzI3YTEuMzk4IDEuMzk4IDAgMTEwIDIuNzk1IDEuMzk4IDEuMzk4IDAgMDEwLTIuNzk1ek00LjM4NSA0Ljk1M2EuOTMyLjkzMiAwIDAwMCAxLjMxN2wyLjA0NiAyLjA0N0w3Ljc1IDcgNS43MDMgNC45NTNhLjkzMi45MzIgMCAwMC0xLjMxOCAwek0xNC43MDEuMzZhLjkzMi45MzIgMCAwMS45MzEuOTMydi45MzFoLjkzMmEuOTMyLjkzMiAwIDAxMCAxLjg2NGgtLjkzM2wuMDAxLjkzMmEuOTMyLjkzMiAwIDExLTEuODYzIDBsLS4wMDEtLjkzMmgtLjkzYS45MzIuOTMyIDAgMTEwLTEuODY0aC45M3YtLjkzMWEuOTMyLjkzMiAwIDAxLjkzMy0uOTMyelwiXG4gICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgPC9nPlxuICA8L3N2Zz5cbiAgPG56LWRyb3Bkb3duLW1lbnUgI21lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgIDx1bCBuei1tZW51IG56U2VsZWN0YWJsZSBjbGFzcz1cInRoZW1lLWxpc3RcIj5cbiAgICAgIEBmb3IgKGkgb2YgdHlwZXM7IHRyYWNrICRpbmRleCkge1xuICAgICAgICA8bGkgbnotbWVudS1pdGVtIFthdHRyLmRhdGEtdGV4dF09XCJpLnRleHQgfCBpMThuXCIgKGNsaWNrKT1cIm9uVGhlbWVDaGFuZ2UoaS5rZXkpXCIgW3N0eWxlXT1cInsgY29sb3I6IGkuY29sb3IgfVwiPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYmctY29sb3JzXCI+PC9pPiB7eyBpLnRleHQgfCBpMThuIH19XG4gICAgICAgIDwvbGk+XG4gICAgICB9XG4gICAgPC91bD5cbiAgPC9uei1kcm9wZG93bi1tZW51PlxuPC9kaXY+XG4iXX0=