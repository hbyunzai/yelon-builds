import * as i0 from '@angular/core';
import { inject, Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { I18nPipe } from '@yelon/theme';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import screenfull from 'screenfull';

class YunzaiHeaderClearStorageComponent {
    constructor() {
        this.modalSrv = inject(NzModalService);
        this.messageSrv = inject(NzMessageService);
    }
    _click() {
        this.modalSrv.confirm({
            nzTitle: 'Make sure clear all local storage?',
            nzOnOk: () => {
                localStorage.clear();
                this.messageSrv.success('Clear Finished!');
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderClearStorageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiHeaderClearStorageComponent, isStandalone: true, selector: "yunzai-header-clear-storage", host: { listeners: { "click": "_click()" }, properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderClearStorageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-header-clear-storage',
                    template: `
    <i nz-icon nzType="tool"></i>
    {{ 'menu.clear.local.storage' | i18n }}
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: true,
                    imports: [NzIconModule, I18nPipe]
                }]
        }], propDecorators: { _click: [{
                type: HostListener,
                args: ['click']
            }] } });

class YunzaiHeaderFullScreenComponent {
    constructor() {
        this.status = false;
    }
    _resize() {
        this.status = screenfull.isFullscreen;
    }
    _click() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderFullScreenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiHeaderFullScreenComponent, isStandalone: true, selector: "yunzai-header-fullscreen", host: { listeners: { "window:resize": "_resize()", "click": "_click()" }, properties: { "class.flex-1": "true" } }, ngImport: i0, template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: I18nPipe, name: "i18n" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderFullScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-header-fullscreen',
                    template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
                    host: {
                        '[class.flex-1]': 'true'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: true,
                    imports: [NzIconModule, I18nPipe]
                }]
        }], propDecorators: { _resize: [{
                type: HostListener,
                args: ['window:resize']
            }], _click: [{
                type: HostListener,
                args: ['click']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { YunzaiHeaderClearStorageComponent, YunzaiHeaderFullScreenComponent };
//# sourceMappingURL=yunzai-widgets.mjs.map
