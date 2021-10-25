import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Renderer2, Inject, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { YunzaiConfigService } from '@yelon/util/config';
export class YzHeaderThemBtnComponent {
    constructor(renderer, configSrv, platform, doc, directionality, KEYS) {
        this.renderer = renderer;
        this.configSrv = configSrv;
        this.platform = platform;
        this.doc = doc;
        this.directionality = directionality;
        this.KEYS = KEYS;
        this.theme = 'default';
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
        this.destroy$ = new Subject();
        this.dir = 'ltr';
    }
    ngOnInit() {
        var _a;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
        this.initTheme();
    }
    initTheme() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.theme = localStorage.getItem(this.KEYS) || 'default';
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
        this.renderer.setAttribute(this.doc.body, 'data-theme', theme);
        const dom = this.doc.getElementById(this.KEYS);
        if (dom) {
            dom.remove();
        }
        localStorage.removeItem(this.KEYS);
        if (theme !== 'default') {
            const el = this.doc.createElement('link');
            el.type = 'text/css';
            el.rel = 'stylesheet';
            el.id = this.KEYS;
            el.href = `${this.deployUrl}assets/style.${theme}.css`;
            localStorage.setItem(this.KEYS, theme);
            this.doc.body.append(el);
        }
        this.updateChartTheme();
    }
    ngOnDestroy() {
        const el = this.doc.getElementById(this.KEYS);
        if (el != null) {
            this.doc.body.removeChild(el);
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
}
YzHeaderThemBtnComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-theme-btn',
                template: `
    <div
      class="yunzai-default__nav-item"
      nz-dropdown
      [nzDropdownMenu]="iconMenu"
      nzTrigger="click"
      nzPlacement="bottomRight"
    >
      <svg nz-tooltip class="anticon" role="img" width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
        <g fill-rule="evenodd">
          <g fill-rule="nonzero">
            <path
              d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <nz-dropdown-menu #iconMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          *ngFor="let theme of types"
          (click)="onThemeChange(theme.key)"
          [style]="{ color: theme.color }"
        >
          <i nz-icon nzType="bg-colors"></i>
          {{ theme.text | i18n }}
        </li>
      </ul>
      <!--      <div nz-menu class="wd-xl animated jello">-->
      <!--        <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" class="app-icons">-->
      <!--          <div nz-col [nzSpan]="4" *ngFor="let theme of types" (click)="onThemeChange(theme.key)">-->
      <!--            <i nz-icon nzType="bg-colors" class="text-white" [style]="{ backgroundColor: theme.color }"></i>-->
      <!--            <span [ngStyle]="{ color: theme.color }">{{ theme.text | i18n }}</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </nz-dropdown-menu>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YzHeaderThemBtnComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: YunzaiConfigService },
    { type: Platform },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Inject, args: [YUNZAI_THEME_BTN_KEYS,] }] }
];
YzHeaderThemBtnComponent.propDecorators = {
    types: [{ type: Input }],
    devTips: [{ type: Input }],
    deployUrl: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXoudGhlbS1idG4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l6LnRoZW0tYnRuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0MsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBa0R6RCxNQUFNLE9BQU8sd0JBQXdCO0lBcUJuQyxZQUNVLFFBQW1CLEVBQ25CLFNBQThCLEVBQzlCLFFBQWtCLEVBQ0EsR0FBYyxFQUNwQixjQUE4QixFQUNYLElBQVk7UUFMM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ0EsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBMUI3QyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2pCLFVBQUssR0FBcUI7WUFDakMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElB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QUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7WUE5SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUEzREMsU0FBUztZQVVGLG1CQUFtQjtZQWxCbkIsUUFBUTs0Q0E2RlosTUFBTSxTQUFDLFFBQVE7WUE5RkEsY0FBYyx1QkErRjdCLFFBQVE7eUNBQ1IsTUFBTSxTQUFDLHFCQUFxQjs7O29CQXpCOUIsS0FBSztzQkFjTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIEluamVjdCxcbiAgT3B0aW9uYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFRoZW1lQnRuVHlwZSwgWVVOWkFJX1RIRU1FX0JUTl9LRVlTIH0gZnJvbSAnQHllbG9uL3RoZW1lL3RoZW1lLWJ0bic7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBZelRoZW1lQnRuVHlwZSBleHRlbmRzIFRoZW1lQnRuVHlwZSB7XG4gIGNvbG9yPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5ei1oZWFkZXItdGhlbWUtYnRuJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbVwiXG4gICAgICBuei1kcm9wZG93blxuICAgICAgW256RHJvcGRvd25NZW51XT1cImljb25NZW51XCJcbiAgICAgIG56VHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgIG56UGxhY2VtZW50PVwiYm90dG9tUmlnaHRcIlxuICAgID5cbiAgICAgIDxzdmcgbnotdG9vbHRpcCBjbGFzcz1cImFudGljb25cIiByb2xlPVwiaW1nXCIgd2lkdGg9XCIyMVwiIGhlaWdodD1cIjIxXCIgdmlld0JveD1cIjAgMCAyMSAyMVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgPGcgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPlxuICAgICAgICAgIDxnIGZpbGwtcnVsZT1cIm5vbnplcm9cIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGQ9XCJNNy4wMiAzLjYzNWwxMi41MTggMTIuNTE4YTEuODYzIDEuODYzIDAgMDEwIDIuNjM1bC0xLjMxNyAxLjMxOGExLjg2MyAxLjg2MyAwIDAxLTIuNjM1IDBMMy4wNjggNy41ODhBMi43OTUgMi43OTUgMCAxMTcuMDIgMy42MzV6bTIuMDkgMTQuNDI4YS45MzIuOTMyIDAgMTEwIDEuODY0LjkzMi45MzIgMCAwMTAtMS44NjR6bS0uMDQzLTkuNzQ3TDcuNzUgOS42MzVsOS4xNTQgOS4xNTMgMS4zMTgtMS4zMTctOS4xNTQtOS4xNTV6TTMuNTIgMTIuNDczYy41MTQgMCAuOTMxLjQxNy45MzEuOTMxdi45MzJoLjkzMmEuOTMyLjkzMiAwIDExMCAxLjg2NGgtLjkzMnYuOTMxYS45MzIuOTMyIDAgMDEtMS44NjMgMGwtLjAwMS0uOTMxaC0uOTNhLjkzMi45MzIgMCAwMTAtMS44NjRoLjkzdi0uOTMyYzAtLjUxNC40MTgtLjkzMS45MzMtLjkzMXptMTUuMzc0LTMuNzI3YTEuMzk4IDEuMzk4IDAgMTEwIDIuNzk1IDEuMzk4IDEuMzk4IDAgMDEwLTIuNzk1ek00LjM4NSA0Ljk1M2EuOTMyLjkzMiAwIDAwMCAxLjMxN2wyLjA0NiAyLjA0N0w3Ljc1IDcgNS43MDMgNC45NTNhLjkzMi45MzIgMCAwMC0xLjMxOCAwek0xNC43MDEuMzZhLjkzMi45MzIgMCAwMS45MzEuOTMydi45MzFoLjkzMmEuOTMyLjkzMiAwIDAxMCAxLjg2NGgtLjkzM2wuMDAxLjkzMmEuOTMyLjkzMiAwIDExLTEuODYzIDBsLS4wMDEtLjkzMmgtLjkzYS45MzIuOTMyIDAgMTEwLTEuODY0aC45M3YtLjkzMWEuOTMyLjkzMiAwIDAxLjkzMy0uOTMyelwiXG4gICAgICAgICAgICA+PC9wYXRoPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgPC9kaXY+XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgI2ljb25NZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICA8bGlcbiAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgdGhlbWUgb2YgdHlwZXNcIlxuICAgICAgICAgIChjbGljayk9XCJvblRoZW1lQ2hhbmdlKHRoZW1lLmtleSlcIlxuICAgICAgICAgIFtzdHlsZV09XCJ7IGNvbG9yOiB0aGVtZS5jb2xvciB9XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYmctY29sb3JzXCI+PC9pPlxuICAgICAgICAgIHt7IHRoZW1lLnRleHQgfCBpMThuIH19XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgICAgPCEtLSAgICAgIDxkaXYgbnotbWVudSBjbGFzcz1cIndkLXhsIGFuaW1hdGVkIGplbGxvXCI+LS0+XG4gICAgICA8IS0tICAgICAgICA8ZGl2IG56LXJvdyBbbnpKdXN0aWZ5XT1cIidzcGFjZS1iZXR3ZWVuJ1wiIFtuekFsaWduXT1cIidtaWRkbGUnXCIgY2xhc3M9XCJhcHAtaWNvbnNcIj4tLT5cbiAgICAgIDwhLS0gICAgICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCI0XCIgKm5nRm9yPVwibGV0IHRoZW1lIG9mIHR5cGVzXCIgKGNsaWNrKT1cIm9uVGhlbWVDaGFuZ2UodGhlbWUua2V5KVwiPi0tPlxuICAgICAgPCEtLSAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiYmctY29sb3JzXCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCIgW3N0eWxlXT1cInsgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvciB9XCI+PC9pPi0tPlxuICAgICAgPCEtLSAgICAgICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsgY29sb3I6IHRoZW1lLmNvbG9yIH1cIj57eyB0aGVtZS50ZXh0IHwgaTE4biB9fTwvc3Bhbj4tLT5cbiAgICAgIDwhLS0gICAgICAgICAgPC9kaXY+LS0+XG4gICAgICA8IS0tICAgICAgICA8L2Rpdj4tLT5cbiAgICAgIDwhLS0gICAgICA8L2Rpdj4tLT5cbiAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl6SGVhZGVyVGhlbUJ0bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSB0aGVtZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgdHlwZXM6IFl6VGhlbWVCdG5UeXBlW10gPSBbXG4gICAgeyBrZXk6ICdkZWZhdWx0JywgdGV4dDogJ3RoZW1lLmRlZmF1bHQnLCBjb2xvcjogJyMyMTYzZmYnIH0sXG4gICAgeyBrZXk6ICdjb21wYWN0JywgdGV4dDogJ3RoZW1lLmNvbXBhY3QnLCBjb2xvcjogJyMyMTYzZmYnIH0sXG4gICAgeyBrZXk6ICdkYXJrJywgdGV4dDogJ3RoZW1lLmRhcmsnLCBjb2xvcjogJyMwMjAyMDInIH0sXG4gICAgeyBrZXk6ICd5dWhvbmcnLCB0ZXh0OiAndGhlbWUueXVob25nJywgY29sb3I6ICcjQzA0ODUxJyB9LFxuICAgIHsga2V5OiAnZGFuanVodWFuZycsIHRleHQ6ICd0aGVtZS5kYW5qdWh1YW5nJywgY29sb3I6ICcjRkJBNDE0JyB9LFxuICAgIHsga2V5OiAneGluZ2h1YW5nJywgdGV4dDogJ3RoZW1lLnhpbmdodWFuZycsIGNvbG9yOiAnI0YyOEUxNicgfSxcbiAgICB7IGtleTogJ3NoaWx2JywgdGV4dDogJ3RoZW1lLnNoaWx2JywgY29sb3I6ICcjNTdDM0MyJyB9LFxuICAgIHsga2V5OiAnemh1bHYnLCB0ZXh0OiAndGhlbWUuemh1bHYnLCBjb2xvcjogJyMxQkE3ODQnIH0sXG4gICAgeyBrZXk6ICd5b3VsYW4nLCB0ZXh0OiAndGhlbWUueW91bGFuJywgY29sb3I6ICcjMTc4MUI1JyB9LFxuICAgIHsga2V5OiAnZGlhbnFpbmcnLCB0ZXh0OiAndGhlbWUuZGlhbnFpbmcnLCBjb2xvcjogJyMxNjYxQUInIH0sXG4gICAgeyBrZXk6ICdzaGFuZ2VuZ3ppJywgdGV4dDogJ3RoZW1lLnNoYW5nZW5nemknLCBjb2xvcjogJyM2MTY0OUYnIH0sXG4gICAgeyBrZXk6ICdzaHVpbml1aHVpJywgdGV4dDogJ3RoZW1lLnNodWluaXVodWknLCBjb2xvcjogJyMyRjJGMzUnIH1cbiAgXTtcbiAgQElucHV0KCkgZGV2VGlwcyA9IGBXaGVuIHRoZSBkYXJrLmNzcyBmaWxlIGNhbid0IGJlIGZvdW5kLCB5b3UgbmVlZCB0byBydW4gaXQgb25jZTogbnBtIHJ1biB0aGVtZWA7XG4gIEBJbnB1dCgpIGRlcGxveVVybCA9ICcnO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjb25maWdTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IE56U2FmZUFueSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBASW5qZWN0KFlVTlpBSV9USEVNRV9CVE5fS0VZUykgcHJpdmF0ZSBLRVlTOiBzdHJpbmdcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgIH0pO1xuICAgIHRoaXMuaW5pdFRoZW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRUaGVtZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLktFWVMpIHx8ICdkZWZhdWx0JztcbiAgICB0aGlzLnVwZGF0ZUNoYXJ0VGhlbWUoKTtcbiAgICB0aGlzLm9uVGhlbWVDaGFuZ2UodGhpcy50aGVtZSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNoYXJ0VGhlbWUoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWdTcnYuc2V0KCdjaGFydCcsIHsgdGhlbWU6IHRoaXMudGhlbWUgPT09ICdkYXJrJyA/ICdkYXJrJyA6ICcnIH0pO1xuICB9XG5cbiAgb25UaGVtZUNoYW5nZSh0aGVtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRoZW1lID0gdGhlbWU7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5kb2MuYm9keSwgJ2RhdGEtdGhlbWUnLCB0aGVtZSk7XG4gICAgY29uc3QgZG9tID0gdGhpcy5kb2MuZ2V0RWxlbWVudEJ5SWQodGhpcy5LRVlTKTtcbiAgICBpZiAoZG9tKSB7XG4gICAgICBkb20ucmVtb3ZlKCk7XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuS0VZUyk7XG4gICAgaWYgKHRoZW1lICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgZWwudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBlbC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICBlbC5pZCA9IHRoaXMuS0VZUztcbiAgICAgIGVsLmhyZWYgPSBgJHt0aGlzLmRlcGxveVVybH1hc3NldHMvc3R5bGUuJHt0aGVtZX0uY3NzYDtcblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5LRVlTLCB0aGVtZSk7XG4gICAgICB0aGlzLmRvYy5ib2R5LmFwcGVuZChlbCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ2hhcnRUaGVtZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRvYy5nZXRFbGVtZW50QnlJZCh0aGlzLktFWVMpO1xuICAgIGlmIChlbCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRvYy5ib2R5LnJlbW92ZUNoaWxkKGVsKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=