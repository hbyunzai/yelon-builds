import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YelonLocaleModule } from '@yelon/theme';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NoticeIconTabComponent } from './notice-icon-tab.component';
import { NoticeIconComponent } from './notice-icon.component';
import * as i0 from "@angular/core";
const COMPONENTS = [NoticeIconComponent];
export class NoticeIconModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NoticeIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NoticeIconModule, declarations: [NoticeIconComponent, NoticeIconTabComponent], imports: [CommonModule,
            YelonLocaleModule,
            NzBadgeModule,
            NzDropDownModule,
            NzIconModule,
            NzListModule,
            NzSpinModule,
            NzTabsModule,
            NzTagModule,
            NzOutletModule], exports: [NoticeIconComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NoticeIconModule, imports: [CommonModule,
            YelonLocaleModule,
            NzBadgeModule,
            NzDropDownModule,
            NzIconModule,
            NzListModule,
            NzSpinModule,
            NzTabsModule,
            NzTagModule,
            NzOutletModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NoticeIconModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWNlLWljb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL25vdGljZS1pY29uL25vdGljZS1pY29uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUU5RCxNQUFNLFVBQVUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFrQnpDLE1BQU0sT0FBTyxnQkFBZ0I7K0dBQWhCLGdCQUFnQjtnSEFBaEIsZ0JBQWdCLGlCQWxCVCxtQkFBbUIsRUFlUCxzQkFBc0IsYUFYbEQsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixXQUFXO1lBQ1gsY0FBYyxhQWJFLG1CQUFtQjtnSEFrQjFCLGdCQUFnQixZQWR6QixZQUFZO1lBQ1osaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjOzs0RkFLTCxnQkFBZ0I7a0JBaEI1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxjQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLHNCQUFzQixDQUFDO29CQUNyRCxPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWWVsb25Mb2NhbGVNb2R1bGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgTnpCYWRnZU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYmFkZ2UnO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOekxpc3RNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2xpc3QnO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcbmltcG9ydCB7IE56VGFic01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdGFicyc7XG5pbXBvcnQgeyBOelRhZ01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdGFnJztcblxuaW1wb3J0IHsgTm90aWNlSWNvblRhYkNvbXBvbmVudCB9IGZyb20gJy4vbm90aWNlLWljb24tdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3RpY2VJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpY2UtaWNvbi5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW05vdGljZUljb25Db21wb25lbnRdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFllbG9uTG9jYWxlTW9kdWxlLFxuICAgIE56QmFkZ2VNb2R1bGUsXG4gICAgTnpEcm9wRG93bk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpMaXN0TW9kdWxlLFxuICAgIE56U3Bpbk1vZHVsZSxcbiAgICBOelRhYnNNb2R1bGUsXG4gICAgTnpUYWdNb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UUywgTm90aWNlSWNvblRhYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgTm90aWNlSWNvbk1vZHVsZSB7fVxuIl19