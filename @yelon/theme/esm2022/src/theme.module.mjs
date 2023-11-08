/* eslint-disable import/order */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// pipes
import { BellOutline, DeleteOutline, InboxOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { YelonLocaleModule } from './locale/locale.module';
import { DatePipe } from './pipes/date/date.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { HTMLPipe } from './pipes/safe/html.pipe';
import { URLPipe } from './pipes/safe/url.pipe';
import { YNPipe } from './pipes/yn/yn.pipe';
import { I18nPipe } from './services/i18n/i18n.pipe';
// #endregion
// #region all yelon used icons
// - zorro: https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/icon/icons.ts
import { DrawerHelper } from './services/drawer/drawer.helper';
import { ModalHelper } from './services/modal/modal.helper';
import { YUNZAI_SETTING_KEYS } from './services/settings/settings.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
// #region import
const HELPERS = [ModalHelper, DrawerHelper];
const PIPES = [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe];
const ICONS = [BellOutline, DeleteOutline, PlusOutline, InboxOutline];
// #endregion
export class YunzaiThemeModule {
    constructor(iconSrv) {
        iconSrv.addIcon(...ICONS);
    }
    static forRoot() {
        return {
            ngModule: YunzaiThemeModule,
            providers: HELPERS
        };
    }
    static forChild() {
        return {
            ngModule: YunzaiThemeModule,
            providers: HELPERS
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiThemeModule, deps: [{ token: i1.NzIconService }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiThemeModule, declarations: [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe], imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule], exports: [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe, YelonLocaleModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiThemeModule, providers: [
            {
                provide: YUNZAI_SETTING_KEYS,
                useValue: {
                    layout: 'layout',
                    user: 'user',
                    app: 'app'
                }
            }
        ], imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, YelonLocaleModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiThemeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule],
                    declarations: PIPES,
                    providers: [
                        {
                            provide: YUNZAI_SETTING_KEYS,
                            useValue: {
                                layout: 'layout',
                                user: 'user',
                                app: 'app'
                            }
                        }
                    ],
                    exports: [...PIPES, YelonLocaleModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.NzIconService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3RoZW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFDakMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFNL0MsUUFBUTtBQUNSLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsYUFBYTtBQUViLCtCQUErQjtBQUUvQiwwRkFBMEY7QUFFMUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7O0FBM0IzRSxpQkFBaUI7QUFFakIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFlNUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBV3hFLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFdEUsYUFBYTtBQWlCYixNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQVksT0FBc0I7UUFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRSxPQUFPO1NBQ25CLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUUsT0FBTztTQUNuQixDQUFDO0lBQ0osQ0FBQzsrR0FqQlUsaUJBQWlCO2dIQUFqQixpQkFBaUIsaUJBOUJmLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxhQWdCMUQsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxhQWhCcEQsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBNEJoRCxpQkFBaUI7Z0hBRTFCLGlCQUFpQixhQVpqQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxtQkFBbUI7Z0JBQzVCLFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUsUUFBUTtvQkFDaEIsSUFBSSxFQUFFLE1BQU07b0JBQ1osR0FBRyxFQUFFLEtBQUs7aUJBQ1g7YUFDRjtTQUNGLFlBWFMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQVk3QyxpQkFBaUI7OzRGQUUxQixpQkFBaUI7a0JBZjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO29CQUNsRSxZQUFZLEVBQUUsS0FBSztvQkFDbkIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFFBQVEsRUFBRTtnQ0FDUixNQUFNLEVBQUUsUUFBUTtnQ0FDaEIsSUFBSSxFQUFFLE1BQU07Z0NBQ1osR0FBRyxFQUFFLEtBQUs7NkJBQ1g7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsaUJBQWlCLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L29yZGVyICovXG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG4vLyAjcmVnaW9uIGltcG9ydFxuXG5jb25zdCBIRUxQRVJTID0gW01vZGFsSGVscGVyLCBEcmF3ZXJIZWxwZXJdO1xuXG4vLyBwaXBlc1xuaW1wb3J0IHsgQmVsbE91dGxpbmUsIERlbGV0ZU91dGxpbmUsIEluYm94T3V0bGluZSwgUGx1c091dGxpbmUgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyL2ljb25zJztcblxuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56SWNvblNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBZZWxvbkxvY2FsZU1vZHVsZSB9IGZyb20gJy4vbG9jYWxlL2xvY2FsZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL2RhdGUvZGF0ZS5waXBlJztcbmltcG9ydCB7IEtleXNQaXBlIH0gZnJvbSAnLi9waXBlcy9rZXlzL2tleXMucGlwZSc7XG5pbXBvcnQgeyBIVE1MUGlwZSB9IGZyb20gJy4vcGlwZXMvc2FmZS9odG1sLnBpcGUnO1xuaW1wb3J0IHsgVVJMUGlwZSB9IGZyb20gJy4vcGlwZXMvc2FmZS91cmwucGlwZSc7XG5pbXBvcnQgeyBZTlBpcGUgfSBmcm9tICcuL3BpcGVzL3luL3luLnBpcGUnO1xuaW1wb3J0IHsgSTE4blBpcGUgfSBmcm9tICcuL3NlcnZpY2VzL2kxOG4vaTE4bi5waXBlJztcbmNvbnN0IFBJUEVTID0gW0RhdGVQaXBlLCBLZXlzUGlwZSwgWU5QaXBlLCBJMThuUGlwZSwgSFRNTFBpcGUsIFVSTFBpcGVdO1xuXG4vLyAjZW5kcmVnaW9uXG5cbi8vICNyZWdpb24gYWxsIHllbG9uIHVzZWQgaWNvbnNcblxuLy8gLSB6b3JybzogaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvY29tcG9uZW50cy9pY29uL2ljb25zLnRzXG5cbmltcG9ydCB7IERyYXdlckhlbHBlciB9IGZyb20gJy4vc2VydmljZXMvZHJhd2VyL2RyYXdlci5oZWxwZXInO1xuaW1wb3J0IHsgTW9kYWxIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL21vZGFsL21vZGFsLmhlbHBlcic7XG5pbXBvcnQgeyBZVU5aQUlfU0VUVElOR19LRVlTIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZXR0aW5ncy9zZXR0aW5ncy5zZXJ2aWNlJztcbmNvbnN0IElDT05TID0gW0JlbGxPdXRsaW5lLCBEZWxldGVPdXRsaW5lLCBQbHVzT3V0bGluZSwgSW5ib3hPdXRsaW5lXTtcblxuLy8gI2VuZHJlZ2lvblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE56STE4bk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogUElQRVMsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFlVTlpBSV9TRVRUSU5HX0tFWVMsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBsYXlvdXQ6ICdsYXlvdXQnLFxuICAgICAgICB1c2VyOiAndXNlcicsXG4gICAgICAgIGFwcDogJ2FwcCdcbiAgICAgIH1cbiAgICB9XG4gIF0sXG4gIGV4cG9ydHM6IFsuLi5QSVBFUywgWWVsb25Mb2NhbGVNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVRoZW1lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoaWNvblNydjogTnpJY29uU2VydmljZSkge1xuICAgIGljb25TcnYuYWRkSWNvbiguLi5JQ09OUyk7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFl1bnphaVRoZW1lTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBZdW56YWlUaGVtZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogSEVMUEVSU1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxZdW56YWlUaGVtZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogWXVuemFpVGhlbWVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IEhFTFBFUlNcbiAgICB9O1xuICB9XG59XG4iXX0=