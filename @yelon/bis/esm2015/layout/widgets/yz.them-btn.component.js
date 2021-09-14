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
            { key: 'default', text: 'Default Theme', color: '#2163ff' },
            { key: 'compact', text: 'Compact Theme', color: '#2163ff' },
            { key: 'dark', text: 'Dark Theme', color: '#020202' }
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
      <div nz-menu class="wd-xl animated jello">
        <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" class="app-icons">
          <div nz-col [nzSpan]="6" *ngFor="let theme of types" (click)="onThemeChange(theme.key)">
            <i nz-icon nzType="bg-colors" class="text-white" [style]="{ backgroundColor: theme.color }"></i>
            <span [ngStyle]="{ color: theme.color }">{{ theme.key }}</span>
          </div>
        </div>
      </div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXoudGhlbS1idG4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l6LnRoZW0tYnRuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0MsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBdUN6RCxNQUFNLE9BQU8sd0JBQXdCO0lBWW5DLFlBQ1UsUUFBbUIsRUFDbkIsU0FBOEIsRUFDOUIsUUFBa0IsRUFDQSxHQUFjLEVBQ3BCLGNBQThCLEVBQ1gsSUFBWTtRQUwzQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDQSxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ3BCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFqQjdDLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDakIsVUFBSyxHQUFxQjtZQUNqQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFB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QUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBMUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQWhEQyxTQUFTO1lBVUYsbUJBQW1CO1lBbEJuQixRQUFROzRDQXlFWixNQUFNLFNBQUMsUUFBUTtZQTFFQSxjQUFjLHVCQTJFN0IsUUFBUTt5Q0FDUixNQUFNLFNBQUMscUJBQXFCOzs7b0JBaEI5QixLQUFLO3NCQUtMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgSW5qZWN0LFxuICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgVGhlbWVCdG5UeXBlLCBZVU5aQUlfVEhFTUVfQlROX0tFWVMgfSBmcm9tICdAeWVsb24vdGhlbWUvdGhlbWUtYnRuJztcbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFl6VGhlbWVCdG5UeXBlIGV4dGVuZHMgVGhlbWVCdG5UeXBlIHtcbiAgY29sb3I/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l6LWhlYWRlci10aGVtZS1idG4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCJcbiAgICAgIG56LWRyb3Bkb3duXG4gICAgICBbbnpEcm9wZG93bk1lbnVdPVwiaWNvbk1lbnVcIlxuICAgICAgbnpUcmlnZ2VyPVwiY2xpY2tcIlxuICAgICAgbnpQbGFjZW1lbnQ9XCJib3R0b21SaWdodFwiXG4gICAgPlxuICAgICAgPHN2ZyBuei10b29sdGlwIGNsYXNzPVwiYW50aWNvblwiIHJvbGU9XCJpbWdcIiB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMjFcIiB2aWV3Qm94PVwiMCAwIDIxIDIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICA8ZyBmaWxsLXJ1bGU9XCJldmVub2RkXCI+XG4gICAgICAgICAgPGcgZmlsbC1ydWxlPVwibm9uemVyb1wiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZD1cIk03LjAyIDMuNjM1bDEyLjUxOCAxMi41MThhMS44NjMgMS44NjMgMCAwMTAgMi42MzVsLTEuMzE3IDEuMzE4YTEuODYzIDEuODYzIDAgMDEtMi42MzUgMEwzLjA2OCA3LjU4OEEyLjc5NSAyLjc5NSAwIDExNy4wMiAzLjYzNXptMi4wOSAxNC40MjhhLjkzMi45MzIgMCAxMTAgMS44NjQuOTMyLjkzMiAwIDAxMC0xLjg2NHptLS4wNDMtOS43NDdMNy43NSA5LjYzNWw5LjE1NCA5LjE1MyAxLjMxOC0xLjMxNy05LjE1NC05LjE1NXpNMy41MiAxMi40NzNjLjUxNCAwIC45MzEuNDE3LjkzMS45MzF2LjkzMmguOTMyYS45MzIuOTMyIDAgMTEwIDEuODY0aC0uOTMydi45MzFhLjkzMi45MzIgMCAwMS0xLjg2MyAwbC0uMDAxLS45MzFoLS45M2EuOTMyLjkzMiAwIDAxMC0xLjg2NGguOTN2LS45MzJjMC0uNTE0LjQxOC0uOTMxLjkzMy0uOTMxem0xNS4zNzQtMy43MjdhMS4zOTggMS4zOTggMCAxMTAgMi43OTUgMS4zOTggMS4zOTggMCAwMTAtMi43OTV6TTQuMzg1IDQuOTUzYS45MzIuOTMyIDAgMDAwIDEuMzE3bDIuMDQ2IDIuMDQ3TDcuNzUgNyA1LjcwMyA0Ljk1M2EuOTMyLjkzMiAwIDAwLTEuMzE4IDB6TTE0LjcwMS4zNmEuOTMyLjkzMiAwIDAxLjkzMS45MzJ2LjkzMWguOTMyYS45MzIuOTMyIDAgMDEwIDEuODY0aC0uOTMzbC4wMDEuOTMyYS45MzIuOTMyIDAgMTEtMS44NjMgMGwtLjAwMS0uOTMyaC0uOTNhLjkzMi45MzIgMCAxMTAtMS44NjRoLjkzdi0uOTMxYS45MzIuOTMyIDAgMDEuOTMzLS45MzJ6XCJcbiAgICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICA8L2Rpdj5cbiAgICA8bnotZHJvcGRvd24tbWVudSAjaWNvbk1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgPGRpdiBuei1tZW51IGNsYXNzPVwid2QteGwgYW5pbWF0ZWQgamVsbG9cIj5cbiAgICAgICAgPGRpdiBuei1yb3cgW256SnVzdGlmeV09XCInc3BhY2UtYmV0d2VlbidcIiBbbnpBbGlnbl09XCInbWlkZGxlJ1wiIGNsYXNzPVwiYXBwLWljb25zXCI+XG4gICAgICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCI2XCIgKm5nRm9yPVwibGV0IHRoZW1lIG9mIHR5cGVzXCIgKGNsaWNrKT1cIm9uVGhlbWVDaGFuZ2UodGhlbWUua2V5KVwiPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJiZy1jb2xvcnNcIiBjbGFzcz1cInRleHQtd2hpdGVcIiBbc3R5bGVdPVwieyBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbG9yIH1cIj48L2k+XG4gICAgICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7IGNvbG9yOiB0aGVtZS5jb2xvciB9XCI+e3sgdGhlbWUua2V5IH19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXpIZWFkZXJUaGVtQnRuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHRoZW1lID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSB0eXBlczogWXpUaGVtZUJ0blR5cGVbXSA9IFtcbiAgICB7IGtleTogJ2RlZmF1bHQnLCB0ZXh0OiAnRGVmYXVsdCBUaGVtZScsIGNvbG9yOiAnIzIxNjNmZicgfSxcbiAgICB7IGtleTogJ2NvbXBhY3QnLCB0ZXh0OiAnQ29tcGFjdCBUaGVtZScsIGNvbG9yOiAnIzIxNjNmZicgfSxcbiAgICB7IGtleTogJ2RhcmsnLCB0ZXh0OiAnRGFyayBUaGVtZScsIGNvbG9yOiAnIzAyMDIwMicgfVxuICBdO1xuICBASW5wdXQoKSBkZXZUaXBzID0gYFdoZW4gdGhlIGRhcmsuY3NzIGZpbGUgY2FuJ3QgYmUgZm91bmQsIHlvdSBuZWVkIHRvIHJ1biBpdCBvbmNlOiBucG0gcnVuIHRoZW1lYDtcbiAgQElucHV0KCkgZGVwbG95VXJsID0gJyc7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNvbmZpZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogTnpTYWZlQW55LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBJbmplY3QoWVVOWkFJX1RIRU1FX0JUTl9LRVlTKSBwcml2YXRlIEtFWVM6IHN0cmluZ1xuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgfSk7XG4gICAgdGhpcy5pbml0VGhlbWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFRoZW1lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50aGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuS0VZUykgfHwgJ2RlZmF1bHQnO1xuICAgIHRoaXMudXBkYXRlQ2hhcnRUaGVtZSgpO1xuICAgIHRoaXMub25UaGVtZUNoYW5nZSh0aGlzLnRoZW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2hhcnRUaGVtZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZ1Nydi5zZXQoJ2NoYXJ0JywgeyB0aGVtZTogdGhpcy50aGVtZSA9PT0gJ2RhcmsnID8gJ2RhcmsnIDogJycgfSk7XG4gIH1cblxuICBvblRoZW1lQ2hhbmdlKHRoZW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudGhlbWUgPSB0aGVtZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmRvYy5ib2R5LCAnZGF0YS10aGVtZScsIHRoZW1lKTtcbiAgICBjb25zdCBkb20gPSB0aGlzLmRvYy5nZXRFbGVtZW50QnlJZCh0aGlzLktFWVMpO1xuICAgIGlmIChkb20pIHtcbiAgICAgIGRvbS5yZW1vdmUoKTtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5LRVlTKTtcbiAgICBpZiAodGhlbWUgIT09ICdkZWZhdWx0Jykge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICBlbC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGVsLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgIGVsLmlkID0gdGhpcy5LRVlTO1xuICAgICAgZWwuaHJlZiA9IGAke3RoaXMuZGVwbG95VXJsfWFzc2V0cy9zdHlsZS4ke3RoZW1lfS5jc3NgO1xuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLktFWVMsIHRoZW1lKTtcbiAgICAgIHRoaXMuZG9jLmJvZHkuYXBwZW5kKGVsKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDaGFydFRoZW1lKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeUlkKHRoaXMuS0VZUyk7XG4gICAgaWYgKGVsICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZG9jLmJvZHkucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==