import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoticeIconModule } from '@yelon/abc/notice-icon';
import { ReuseTabModule } from '@yelon/abc/reuse-tab';
import { YunzaiThemeModule } from '@yelon/theme';
import { LayoutDefaultModule } from '@yelon/theme/layout-default';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { YunzaiLayoutBasicComponent } from './layout-basic';
import { LayoutNavApplicationComponent, LayoutNavGroupComponent, LayoutNavTileComponent } from './layout-nav';
import { YunzaiClearStorageComponent, YunzaiFullScreenComponent, YunzaiI18NComponent, YunzaiNotifyComponent, YunzaiThemeBtnComponent, YunzaiUserComponent } from './widgets';
import * as i0 from "@angular/core";
const COMPONENTS = [
    YunzaiClearStorageComponent,
    YunzaiFullScreenComponent,
    YunzaiI18NComponent,
    YunzaiNotifyComponent,
    YunzaiThemeBtnComponent,
    YunzaiUserComponent,
    YunzaiLayoutBasicComponent,
    LayoutNavApplicationComponent,
    LayoutNavGroupComponent,
    LayoutNavTileComponent
];
export class YunzaiLayoutModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutModule, declarations: [YunzaiClearStorageComponent,
            YunzaiFullScreenComponent,
            YunzaiI18NComponent,
            YunzaiNotifyComponent,
            YunzaiThemeBtnComponent,
            YunzaiUserComponent,
            YunzaiLayoutBasicComponent,
            LayoutNavApplicationComponent,
            LayoutNavGroupComponent,
            LayoutNavTileComponent], imports: [RouterModule,
            ReuseTabModule,
            LayoutDefaultModule,
            CommonModule,
            NzTabsModule,
            NgOptimizedImage,
            NzToolTipModule,
            NzDropDownModule,
            NzAvatarModule,
            NoticeIconModule,
            FormsModule,
            NzGridModule,
            YunzaiThemeModule,
            NzInputModule,
            NzIconModule], exports: [YunzaiClearStorageComponent,
            YunzaiFullScreenComponent,
            YunzaiI18NComponent,
            YunzaiNotifyComponent,
            YunzaiThemeBtnComponent,
            YunzaiUserComponent,
            YunzaiLayoutBasicComponent,
            LayoutNavApplicationComponent,
            LayoutNavGroupComponent,
            LayoutNavTileComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutModule, providers: [
            {
                provide: YUNZAI_THEME_BTN_KEYS,
                useValue: 'site-theme'
            }
        ], imports: [RouterModule,
            ReuseTabModule,
            LayoutDefaultModule,
            CommonModule,
            NzTabsModule,
            NzToolTipModule,
            NzDropDownModule,
            NzAvatarModule,
            NoticeIconModule,
            FormsModule,
            NzGridModule,
            YunzaiThemeModule,
            NzInputModule,
            NzIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        ReuseTabModule,
                        LayoutDefaultModule,
                        CommonModule,
                        NzTabsModule,
                        NgOptimizedImage,
                        NzToolTipModule,
                        NzDropDownModule,
                        NzAvatarModule,
                        NoticeIconModule,
                        FormsModule,
                        NzGridModule,
                        YunzaiThemeModule,
                        NzInputModule,
                        NzIconModule
                    ],
                    declarations: COMPONENTS,
                    providers: [
                        {
                            provide: YUNZAI_THEME_BTN_KEYS,
                            useValue: 'site-theme'
                        }
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWxheW91dC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3l1bnphaS1sYXlvdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDOUcsT0FBTyxFQUNMLDJCQUEyQixFQUMzQix5QkFBeUIsRUFDekIsbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ3BCLE1BQU0sV0FBVyxDQUFDOztBQUVuQixNQUFNLFVBQVUsR0FBRztJQUNqQiwyQkFBMkI7SUFDM0IseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLHVCQUF1QjtJQUN2QixzQkFBc0I7Q0FDdkIsQ0FBQztBQTZCRixNQUFNLE9BQU8sa0JBQWtCOzhHQUFsQixrQkFBa0I7K0dBQWxCLGtCQUFrQixpQkF2QzdCLDJCQUEyQjtZQUMzQix5QkFBeUI7WUFDekIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQix1QkFBdUI7WUFDdkIsbUJBQW1CO1lBQ25CLDBCQUEwQjtZQUMxQiw2QkFBNkI7WUFDN0IsdUJBQXVCO1lBQ3ZCLHNCQUFzQixhQUtwQixZQUFZO1lBQ1osY0FBYztZQUNkLG1CQUFtQjtZQUNuQixZQUFZO1lBQ1osWUFBWTtZQUNaLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsV0FBVztZQUNYLFlBQVk7WUFDWixpQkFBaUI7WUFDakIsYUFBYTtZQUNiLFlBQVksYUE1QmQsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6QixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLHVCQUF1QjtZQUN2QixtQkFBbUI7WUFDbkIsMEJBQTBCO1lBQzFCLDZCQUE2QjtZQUM3Qix1QkFBdUI7WUFDdkIsc0JBQXNCOytHQThCWCxrQkFBa0IsYUFSbEI7WUFDVDtnQkFDRSxPQUFPLEVBQUUscUJBQXFCO2dCQUM5QixRQUFRLEVBQUUsWUFBWTthQUN2QjtTQUNGLFlBdEJDLFlBQVk7WUFDWixjQUFjO1lBQ2QsbUJBQW1CO1lBQ25CLFlBQVk7WUFDWixZQUFZO1lBRVosZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxZQUFZO1lBQ1osaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixZQUFZOzsyRkFXSCxrQkFBa0I7a0JBM0I5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFFBQVEsRUFBRSxZQUFZO3lCQUN2QjtxQkFDRjtvQkFDRCxPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIE5nT3B0aW1pemVkSW1hZ2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgTm90aWNlSWNvbk1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9hYmMvbm90aWNlLWljb24nO1xuaW1wb3J0IHsgUmV1c2VUYWJNb2R1bGUgfSBmcm9tICdAeWVsb24vYWJjL3JldXNlLXRhYic7XG5pbXBvcnQgeyBZdW56YWlUaGVtZU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBMYXlvdXREZWZhdWx0TW9kdWxlIH0gZnJvbSAnQHllbG9uL3RoZW1lL2xheW91dC1kZWZhdWx0JztcbmltcG9ydCB7IFlVTlpBSV9USEVNRV9CVE5fS0VZUyB9IGZyb20gJ0B5ZWxvbi90aGVtZS90aGVtZS1idG4nO1xuaW1wb3J0IHsgTnpBdmF0YXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2F2YXRhcic7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekdyaWRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2dyaWQnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcbmltcG9ydCB7IE56VGFic01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdGFicyc7XG5pbXBvcnQgeyBOelRvb2xUaXBNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBZdW56YWlMYXlvdXRCYXNpY0NvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LWJhc2ljJztcbmltcG9ydCB7IExheW91dE5hdkFwcGxpY2F0aW9uQ29tcG9uZW50LCBMYXlvdXROYXZHcm91cENvbXBvbmVudCwgTGF5b3V0TmF2VGlsZUNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LW5hdic7XG5pbXBvcnQge1xuICBZdW56YWlDbGVhclN0b3JhZ2VDb21wb25lbnQsXG4gIFl1bnphaUZ1bGxTY3JlZW5Db21wb25lbnQsXG4gIFl1bnphaUkxOE5Db21wb25lbnQsXG4gIFl1bnphaU5vdGlmeUNvbXBvbmVudCxcbiAgWXVuemFpVGhlbWVCdG5Db21wb25lbnQsXG4gIFl1bnphaVVzZXJDb21wb25lbnRcbn0gZnJvbSAnLi93aWRnZXRzJztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgWXVuemFpQ2xlYXJTdG9yYWdlQ29tcG9uZW50LFxuICBZdW56YWlGdWxsU2NyZWVuQ29tcG9uZW50LFxuICBZdW56YWlJMThOQ29tcG9uZW50LFxuICBZdW56YWlOb3RpZnlDb21wb25lbnQsXG4gIFl1bnphaVRoZW1lQnRuQ29tcG9uZW50LFxuICBZdW56YWlVc2VyQ29tcG9uZW50LFxuICBZdW56YWlMYXlvdXRCYXNpY0NvbXBvbmVudCxcbiAgTGF5b3V0TmF2QXBwbGljYXRpb25Db21wb25lbnQsXG4gIExheW91dE5hdkdyb3VwQ29tcG9uZW50LFxuICBMYXlvdXROYXZUaWxlQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFJldXNlVGFiTW9kdWxlLFxuICAgIExheW91dERlZmF1bHRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE56VGFic01vZHVsZSxcbiAgICBOZ09wdGltaXplZEltYWdlLFxuICAgIE56VG9vbFRpcE1vZHVsZSxcbiAgICBOekRyb3BEb3duTW9kdWxlLFxuICAgIE56QXZhdGFyTW9kdWxlLFxuICAgIE5vdGljZUljb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTnpHcmlkTW9kdWxlLFxuICAgIFl1bnphaVRoZW1lTW9kdWxlLFxuICAgIE56SW5wdXRNb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogWVVOWkFJX1RIRU1FX0JUTl9LRVlTLFxuICAgICAgdXNlVmFsdWU6ICdzaXRlLXRoZW1lJ1xuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlMYXlvdXRNb2R1bGUge31cbiJdfQ==