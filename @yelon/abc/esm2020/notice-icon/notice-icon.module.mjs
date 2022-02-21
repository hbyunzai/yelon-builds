import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { YelonLocaleModule } from '@yelon/theme';
import { NoticeIconTabComponent } from './notice-icon-tab.component';
import { NoticeIconComponent } from './notice-icon.component';
import * as i0 from "@angular/core";
const COMPONENTS = [NoticeIconComponent];
export class NoticeIconModule {
}
NoticeIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: NoticeIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NoticeIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: NoticeIconModule, declarations: [NoticeIconComponent, NoticeIconTabComponent], imports: [CommonModule,
        YelonLocaleModule,
        NzBadgeModule,
        NzDropDownModule,
        NzIconModule,
        NzListModule,
        NzSpinModule,
        NzTabsModule,
        NzTagModule,
        NzOutletModule], exports: [NoticeIconComponent] });
NoticeIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: NoticeIconModule, imports: [[
            CommonModule,
            YelonLocaleModule,
            NzBadgeModule,
            NzDropDownModule,
            NzIconModule,
            NzListModule,
            NzSpinModule,
            NzTabsModule,
            NzTagModule,
            NzOutletModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: NoticeIconModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        YelonLocaleModule,
                        NzBadgeModule,
                        NzDropDownModule,
                        NzIconModule,
                        NzListModule,
                        NzSpinModule,
                        NzTabsModule,
                        NzTagModule,
                        NzOutletModule
                    ],
                    declarations: [...COMPONENTS, NoticeIconTabComponent],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWNlLWljb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL25vdGljZS1pY29uL25vdGljZS1pY29uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUU5RCxNQUFNLFVBQVUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFrQnpDLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFsQlQsbUJBQW1CLEVBZVAsc0JBQXNCLGFBWGxELFlBQVk7UUFDWixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osV0FBVztRQUNYLGNBQWMsYUFiRSxtQkFBbUI7OEdBa0IxQixnQkFBZ0IsWUFmbEI7WUFDUCxZQUFZO1lBQ1osaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1NBQ2Y7MkZBSVUsZ0JBQWdCO2tCQWhCNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQztvQkFDckQsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56QmFkZ2VNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2JhZGdlJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpMaXN0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9saXN0JztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOelRhYnNNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RhYnMnO1xuaW1wb3J0IHsgTnpUYWdNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RhZyc7XG5cbmltcG9ydCB7IFllbG9uTG9jYWxlTW9kdWxlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcblxuaW1wb3J0IHsgTm90aWNlSWNvblRhYkNvbXBvbmVudCB9IGZyb20gJy4vbm90aWNlLWljb24tdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3RpY2VJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpY2UtaWNvbi5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW05vdGljZUljb25Db21wb25lbnRdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFllbG9uTG9jYWxlTW9kdWxlLFxuICAgIE56QmFkZ2VNb2R1bGUsXG4gICAgTnpEcm9wRG93bk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpMaXN0TW9kdWxlLFxuICAgIE56U3Bpbk1vZHVsZSxcbiAgICBOelRhYnNNb2R1bGUsXG4gICAgTnpUYWdNb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UUywgTm90aWNlSWNvblRhYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgTm90aWNlSWNvbk1vZHVsZSB7fVxuIl19