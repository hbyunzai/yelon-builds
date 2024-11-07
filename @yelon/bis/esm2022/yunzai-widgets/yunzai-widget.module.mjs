import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoticeIconModule } from '@yelon/abc/notice-icon';
import { I18nPipe } from '@yelon/theme';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { YunzaiHeaderClearStorageComponent } from './yunzai-clear-storage.component';
import { YunzaiHeaderFullScreenComponent } from './yunzai-fullscreen.component';
import { YunzaiHeaderI18nComponent } from './yunzai-i18n.component';
import { YunzaiHeaderNotifyComponent } from './yunzai-notify.component';
import { YunzaiHeaderUserComponent } from './yunzai-user.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    YunzaiHeaderClearStorageComponent,
    YunzaiHeaderFullScreenComponent,
    YunzaiHeaderNotifyComponent,
    YunzaiHeaderI18nComponent,
    YunzaiHeaderUserComponent
];
export class YunzaiWidgetsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiWidgetsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.11", ngImport: i0, type: YunzaiWidgetsModule, imports: [NzAvatarModule,
            RouterModule,
            NoticeIconModule,
            NzDropDownModule,
            CommonModule,
            NzIconModule,
            I18nPipe, YunzaiHeaderClearStorageComponent,
            YunzaiHeaderFullScreenComponent,
            YunzaiHeaderNotifyComponent,
            YunzaiHeaderI18nComponent,
            YunzaiHeaderUserComponent], exports: [YunzaiHeaderClearStorageComponent,
            YunzaiHeaderFullScreenComponent,
            YunzaiHeaderNotifyComponent,
            YunzaiHeaderI18nComponent,
            YunzaiHeaderUserComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiWidgetsModule, imports: [NzAvatarModule,
            RouterModule,
            NoticeIconModule,
            NzDropDownModule,
            CommonModule,
            NzIconModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: YunzaiWidgetsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzAvatarModule,
                        RouterModule,
                        NoticeIconModule,
                        NzDropDownModule,
                        CommonModule,
                        NzIconModule,
                        I18nPipe,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXdpZGdldC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMveXVuemFpLXdpZGdldHMveXVuemFpLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFcEUsTUFBTSxVQUFVLEdBQUc7SUFDakIsaUNBQWlDO0lBQ2pDLCtCQUErQjtJQUMvQiwyQkFBMkI7SUFDM0IseUJBQXlCO0lBQ3pCLHlCQUF5QjtDQUMxQixDQUFDO0FBZUYsTUFBTSxPQUFPLG1CQUFtQjsrR0FBbkIsbUJBQW1CO2dIQUFuQixtQkFBbUIsWUFYNUIsY0FBYztZQUNkLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixZQUFZO1lBQ1osUUFBUSxFQWZWLGlDQUFpQztZQUNqQywrQkFBK0I7WUFDL0IsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6Qix5QkFBeUIsYUFKekIsaUNBQWlDO1lBQ2pDLCtCQUErQjtZQUMvQiwyQkFBMkI7WUFDM0IseUJBQXlCO1lBQ3pCLHlCQUF5QjtnSEFnQmQsbUJBQW1CLFlBWDVCLGNBQWM7WUFDZCxZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osWUFBWSxFQUVULFVBQVU7OzRGQUlKLG1CQUFtQjtrQkFiL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osUUFBUTt3QkFDUixHQUFHLFVBQVU7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBOb3RpY2VJY29uTW9kdWxlIH0gZnJvbSAnQHllbG9uL2FiYy9ub3RpY2UtaWNvbic7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBOekF2YXRhck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYXZhdGFyJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IFl1bnphaUhlYWRlckNsZWFyU3RvcmFnZUNvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLWNsZWFyLXN0b3JhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IFl1bnphaUhlYWRlckZ1bGxTY3JlZW5Db21wb25lbnQgfSBmcm9tICcuL3l1bnphaS1mdWxsc2NyZWVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZdW56YWlIZWFkZXJJMThuQ29tcG9uZW50IH0gZnJvbSAnLi95dW56YWktaTE4bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpSGVhZGVyTm90aWZ5Q29tcG9uZW50IH0gZnJvbSAnLi95dW56YWktbm90aWZ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZdW56YWlIZWFkZXJVc2VyQ29tcG9uZW50IH0gZnJvbSAnLi95dW56YWktdXNlci5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBZdW56YWlIZWFkZXJDbGVhclN0b3JhZ2VDb21wb25lbnQsXG4gIFl1bnphaUhlYWRlckZ1bGxTY3JlZW5Db21wb25lbnQsXG4gIFl1bnphaUhlYWRlck5vdGlmeUNvbXBvbmVudCxcbiAgWXVuemFpSGVhZGVySTE4bkNvbXBvbmVudCxcbiAgWXVuemFpSGVhZGVyVXNlckNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE56QXZhdGFyTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBOb3RpY2VJY29uTW9kdWxlLFxuICAgIE56RHJvcERvd25Nb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBJMThuUGlwZSxcbiAgICAuLi5DT01QT05FTlRTXG4gIF0sXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpV2lkZ2V0c01vZHVsZSB7fVxuIl19