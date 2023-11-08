import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { YunzaiLayoutBasicComponent } from './layout-basic/layout-basic.component';
import { LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent } from './layout-nav';
import { YunzaiClearStorageComponent, YunzaiFullScreenComponent, YunzaiI18NComponent, YunzaiNotifyComponent, YunzaiThemBtnComponent, YunzaiUserComponent } from './widgets';
import * as i0 from "@angular/core";
const WIDGETS = [
    YunzaiClearStorageComponent,
    YunzaiFullScreenComponent,
    YunzaiI18NComponent,
    YunzaiNotifyComponent,
    YunzaiThemBtnComponent,
    YunzaiUserComponent
];
const LAYOUT_NAV_COMPONENTS = [LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent];
const COMPONENTS = [YunzaiLayoutBasicComponent];
export class YunzaiLayoutModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, declarations: [YunzaiLayoutBasicComponent, YunzaiClearStorageComponent,
            YunzaiFullScreenComponent,
            YunzaiI18NComponent,
            YunzaiNotifyComponent,
            YunzaiThemBtnComponent,
            YunzaiUserComponent, LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedYelonModule,
            YunzaiSharedZorroModule], exports: [YunzaiLayoutBasicComponent, YunzaiClearStorageComponent,
            YunzaiFullScreenComponent,
            YunzaiI18NComponent,
            YunzaiNotifyComponent,
            YunzaiThemBtnComponent,
            YunzaiUserComponent, LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, providers: [
            {
                provide: YUNZAI_THEME_BTN_KEYS,
                useValue: 'site-theme'
            }
        ], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedYelonModule,
            YunzaiSharedZorroModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        RouterModule,
                        ReactiveFormsModule,
                        YunzaiSharedYelonModule,
                        YunzaiSharedZorroModule
                    ],
                    providers: [
                        {
                            provide: YUNZAI_THEME_BTN_KEYS,
                            useValue: 'site-theme'
                        }
                    ],
                    declarations: [...COMPONENTS, ...WIDGETS, ...LAYOUT_NAV_COMPONENTS],
                    exports: [...COMPONENTS, ...WIDGETS, ...LAYOUT_NAV_COMPONENTS]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWxheW91dC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3l1bnphaS1sYXlvdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbkYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlHLE9BQU8sRUFDTCwyQkFBMkIsRUFDM0IseUJBQXlCLEVBQ3pCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNwQixNQUFNLFdBQVcsQ0FBQzs7QUFFbkIsTUFBTSxPQUFPLEdBQUc7SUFDZCwyQkFBMkI7SUFDM0IseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLG1CQUFtQjtDQUNwQixDQUFDO0FBRUYsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLDZCQUE2QixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFFL0csTUFBTSxVQUFVLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBcUJoRCxNQUFNLE9BQU8sa0JBQWtCOytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFyQlgsMEJBQTBCLEVBVjVDLDJCQUEyQjtZQUMzQix5QkFBeUI7WUFDekIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixzQkFBc0I7WUFDdEIsbUJBQW1CLEVBR1UsNkJBQTZCLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLGFBTXpHLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLHVCQUF1QixhQVZQLDBCQUEwQixFQVY1QywyQkFBMkI7WUFDM0IseUJBQXlCO1lBQ3pCLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsc0JBQXNCO1lBQ3RCLG1CQUFtQixFQUdVLDZCQUE2QixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQjtnSEF1QmhHLGtCQUFrQixhQVRsQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLFFBQVEsRUFBRSxZQUFZO2FBQ3ZCO1NBQ0YsWUFiQyxnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLFdBQVc7WUFDWCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLHVCQUF1QjtZQUN2Qix1QkFBdUI7OzRGQVdkLGtCQUFrQjtrQkFuQjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFFBQVEsRUFBRSxZQUFZO3lCQUN2QjtxQkFDRjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLHFCQUFxQixDQUFDO29CQUNuRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLHFCQUFxQixDQUFDO2lCQUMvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgWXVuemFpU2hhcmVkWWVsb25Nb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1zaGFyZWQteWVsb24nO1xuaW1wb3J0IHsgWXVuemFpU2hhcmVkWm9ycm9Nb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1zaGFyZWQtem9ycm8nO1xuaW1wb3J0IHsgWVVOWkFJX1RIRU1FX0JUTl9LRVlTIH0gZnJvbSAnQHllbG9uL3RoZW1lL3RoZW1lLWJ0bic7XG5cbmltcG9ydCB7IFl1bnphaUxheW91dEJhc2ljQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtYmFzaWMvbGF5b3V0LWJhc2ljLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXlvdXROYXZBcHBsaWNhdGlvbkNvbXBvbmVudCwgTGF5b3V0TmF2R3JvdXBDb21wb25lbnQsIExheW91dE5hdlRpbGVDb21wb25lbnQgfSBmcm9tICcuL2xheW91dC1uYXYnO1xuaW1wb3J0IHtcbiAgWXVuemFpQ2xlYXJTdG9yYWdlQ29tcG9uZW50LFxuICBZdW56YWlGdWxsU2NyZWVuQ29tcG9uZW50LFxuICBZdW56YWlJMThOQ29tcG9uZW50LFxuICBZdW56YWlOb3RpZnlDb21wb25lbnQsXG4gIFl1bnphaVRoZW1CdG5Db21wb25lbnQsXG4gIFl1bnphaVVzZXJDb21wb25lbnRcbn0gZnJvbSAnLi93aWRnZXRzJztcblxuY29uc3QgV0lER0VUUyA9IFtcbiAgWXVuemFpQ2xlYXJTdG9yYWdlQ29tcG9uZW50LFxuICBZdW56YWlGdWxsU2NyZWVuQ29tcG9uZW50LFxuICBZdW56YWlJMThOQ29tcG9uZW50LFxuICBZdW56YWlOb3RpZnlDb21wb25lbnQsXG4gIFl1bnphaVRoZW1CdG5Db21wb25lbnQsXG4gIFl1bnphaVVzZXJDb21wb25lbnRcbl07XG5cbmNvbnN0IExBWU9VVF9OQVZfQ09NUE9ORU5UUyA9IFtMYXlvdXROYXZBcHBsaWNhdGlvbkNvbXBvbmVudCwgTGF5b3V0TmF2R3JvdXBDb21wb25lbnQsIExheW91dE5hdlRpbGVDb21wb25lbnRdO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1l1bnphaUxheW91dEJhc2ljQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFl1bnphaVNoYXJlZFllbG9uTW9kdWxlLFxuICAgIFl1bnphaVNoYXJlZFpvcnJvTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFlVTlpBSV9USEVNRV9CVE5fS0VZUyxcbiAgICAgIHVzZVZhbHVlOiAnc2l0ZS10aGVtZSdcbiAgICB9XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFMsIC4uLldJREdFVFMsIC4uLkxBWU9VVF9OQVZfQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFsuLi5DT01QT05FTlRTLCAuLi5XSURHRVRTLCAuLi5MQVlPVVRfTkFWX0NPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dE1vZHVsZSB7fVxuIl19