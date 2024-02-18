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
import { YUNZAI_SETTING_DEFAULT } from './services/settings/settings.service';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiThemeModule, deps: [{ token: i1.NzIconService }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiThemeModule, imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe], exports: [DatePipe, KeysPipe, YNPipe, I18nPipe, HTMLPipe, URLPipe, YelonLocaleModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiThemeModule, providers: [YUNZAI_SETTING_DEFAULT], imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, YelonLocaleModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiThemeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, OverlayModule, NzI18nModule, ...PIPES],
                    providers: [YUNZAI_SETTING_DEFAULT],
                    exports: [...PIPES, YelonLocaleModule]
                }]
        }], ctorParameters: () => [{ type: i1.NzIconService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3RoZW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFDakMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFNL0MsUUFBUTtBQUNSLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsYUFBYTtBQUViLCtCQUErQjtBQUUvQiwwRkFBMEY7QUFFMUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7O0FBM0I5RSxpQkFBaUI7QUFFakIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFlNUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBV3hFLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFdEUsYUFBYTtBQU9iLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBWSxPQUFzQjtRQUNoQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFLE9BQU87U0FDbkIsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNiLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRSxPQUFPO1NBQ25CLENBQUM7SUFDSixDQUFDOzhHQWpCVSxpQkFBaUI7K0dBQWpCLGlCQUFpQixZQUpsQixZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBaEJwRCxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sYUFBdkQsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBa0JoRCxpQkFBaUI7K0dBRTFCLGlCQUFpQixhQUhqQixDQUFDLHNCQUFzQixDQUFDLFlBRHpCLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFFN0MsaUJBQWlCOzsyRkFFMUIsaUJBQWlCO2tCQUw3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxHQUFHLEtBQUssQ0FBQztvQkFDNUUsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ25DLE9BQU8sRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLGlCQUFpQixDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9vcmRlciAqL1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuLy8gI3JlZ2lvbiBpbXBvcnRcblxuY29uc3QgSEVMUEVSUyA9IFtNb2RhbEhlbHBlciwgRHJhd2VySGVscGVyXTtcblxuLy8gcGlwZXNcbmltcG9ydCB7IEJlbGxPdXRsaW5lLCBEZWxldGVPdXRsaW5lLCBJbmJveE91dGxpbmUsIFBsdXNPdXRsaW5lIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhci9pY29ucyc7XG5cbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuaW1wb3J0IHsgWWVsb25Mb2NhbGVNb2R1bGUgfSBmcm9tICcuL2xvY2FsZS9sb2NhbGUubW9kdWxlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnLi9waXBlcy9kYXRlL2RhdGUucGlwZSc7XG5pbXBvcnQgeyBLZXlzUGlwZSB9IGZyb20gJy4vcGlwZXMva2V5cy9rZXlzLnBpcGUnO1xuaW1wb3J0IHsgSFRNTFBpcGUgfSBmcm9tICcuL3BpcGVzL3NhZmUvaHRtbC5waXBlJztcbmltcG9ydCB7IFVSTFBpcGUgfSBmcm9tICcuL3BpcGVzL3NhZmUvdXJsLnBpcGUnO1xuaW1wb3J0IHsgWU5QaXBlIH0gZnJvbSAnLi9waXBlcy95bi95bi5waXBlJztcbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pMThuL2kxOG4ucGlwZSc7XG5jb25zdCBQSVBFUyA9IFtEYXRlUGlwZSwgS2V5c1BpcGUsIFlOUGlwZSwgSTE4blBpcGUsIEhUTUxQaXBlLCBVUkxQaXBlXTtcblxuLy8gI2VuZHJlZ2lvblxuXG4vLyAjcmVnaW9uIGFsbCB5ZWxvbiB1c2VkIGljb25zXG5cbi8vIC0gem9ycm86IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL2NvbXBvbmVudHMvaWNvbi9pY29ucy50c1xuXG5pbXBvcnQgeyBEcmF3ZXJIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2RyYXdlci9kcmF3ZXIuaGVscGVyJztcbmltcG9ydCB7IE1vZGFsSGVscGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tb2RhbC9tb2RhbC5oZWxwZXInO1xuaW1wb3J0IHsgWVVOWkFJX1NFVFRJTkdfREVGQVVMVCB9IGZyb20gJy4vc2VydmljZXMvc2V0dGluZ3Mvc2V0dGluZ3Muc2VydmljZSc7XG5jb25zdCBJQ09OUyA9IFtCZWxsT3V0bGluZSwgRGVsZXRlT3V0bGluZSwgUGx1c091dGxpbmUsIEluYm94T3V0bGluZV07XG5cbi8vICNlbmRyZWdpb25cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBOekkxOG5Nb2R1bGUsIC4uLlBJUEVTXSxcbiAgcHJvdmlkZXJzOiBbWVVOWkFJX1NFVFRJTkdfREVGQVVMVF0sXG4gIGV4cG9ydHM6IFsuLi5QSVBFUywgWWVsb25Mb2NhbGVNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVRoZW1lTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoaWNvblNydjogTnpJY29uU2VydmljZSkge1xuICAgIGljb25TcnYuYWRkSWNvbiguLi5JQ09OUyk7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFl1bnphaVRoZW1lTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBZdW56YWlUaGVtZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogSEVMUEVSU1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxZdW56YWlUaGVtZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogWXVuemFpVGhlbWVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IEhFTFBFUlNcbiAgICB9O1xuICB9XG59XG4iXX0=