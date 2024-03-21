import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { STModule } from '@yelon/abc/st';
import { YelonFormModule } from '@yelon/form';
import { I18nPipe } from '@yelon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { YunzaiTableUserComponent } from './yunzai-table-user.component';
import { YunzaiTableUserService } from './yunzai-table-user.service';
import * as i0 from "@angular/core";
export const COMPONENTS = [YunzaiTableUserComponent];
export class YunzaiTableUserModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiTableUserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: YunzaiTableUserModule, imports: [CommonModule,
            YelonFormModule,
            STModule,
            I18nPipe,
            NzCheckboxModule,
            NzDividerModule,
            NzButtonModule,
            NzEmptyModule,
            NzIconModule,
            NzMenuModule,
            NzCardModule, YunzaiTableUserComponent], exports: [YunzaiTableUserComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiTableUserModule, providers: [YunzaiTableUserService], imports: [CommonModule,
            YelonFormModule,
            STModule,
            NzCheckboxModule,
            NzDividerModule,
            NzButtonModule,
            NzEmptyModule,
            NzIconModule,
            NzMenuModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: YunzaiTableUserModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        YelonFormModule,
                        STModule,
                        I18nPipe,
                        NzCheckboxModule,
                        NzDividerModule,
                        NzButtonModule,
                        NzEmptyModule,
                        NzIconModule,
                        NzMenuModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    providers: [YunzaiTableUserService],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXRhYmxlLXVzZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS10YWJsZS11c2VyL3l1bnphaS10YWJsZS11c2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFckUsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQW9CckQsTUFBTSxPQUFPLHFCQUFxQjs4R0FBckIscUJBQXFCOytHQUFyQixxQkFBcUIsWUFoQjlCLFlBQVk7WUFDWixlQUFlO1lBQ2YsUUFBUTtZQUNSLFFBQVE7WUFDUixnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLGNBQWM7WUFDZCxhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZLEVBZFcsd0JBQXdCLGFBQXhCLHdCQUF3QjsrR0FvQnRDLHFCQUFxQixhQUhyQixDQUFDLHNCQUFzQixDQUFDLFlBYmpDLFlBQVk7WUFDWixlQUFlO1lBQ2YsUUFBUTtZQUVSLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsY0FBYztZQUNkLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVksRUFDVCxVQUFVOzsyRkFLSixxQkFBcUI7a0JBbEJqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsUUFBUTt3QkFDUixRQUFRO3dCQUNSLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osR0FBRyxVQUFVO3FCQUNkO29CQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU1RNb2R1bGUgfSBmcm9tICdAeWVsb24vYWJjL3N0JztcbmltcG9ydCB7IFllbG9uRm9ybU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9mb3JtJztcbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56Q2hlY2tib3hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NoZWNrYm94JztcbmltcG9ydCB7IE56RGl2aWRlck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZGl2aWRlcic7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpNZW51TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZW51JztcblxuaW1wb3J0IHsgWXVuemFpVGFibGVVc2VyQ29tcG9uZW50IH0gZnJvbSAnLi95dW56YWktdGFibGUtdXNlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpVGFibGVVc2VyU2VydmljZSB9IGZyb20gJy4veXVuemFpLXRhYmxlLXVzZXIuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gW1l1bnphaVRhYmxlVXNlckNvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgWWVsb25Gb3JtTW9kdWxlLFxuICAgIFNUTW9kdWxlLFxuICAgIEkxOG5QaXBlLFxuICAgIE56Q2hlY2tib3hNb2R1bGUsXG4gICAgTnpEaXZpZGVyTW9kdWxlLFxuICAgIE56QnV0dG9uTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56TWVudU1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGUsXG4gICAgLi4uQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtZdW56YWlUYWJsZVVzZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlUYWJsZVVzZXJNb2R1bGUge31cbiJdfQ==