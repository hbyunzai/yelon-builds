import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { YunzaiRoleTreeComponent } from './yunzai-role-tree.component';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiRoleTreeComponent];
export class YunzaiRoleTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, imports: [CommonModule,
            NzSpinModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzCardModule, YunzaiRoleTreeComponent], exports: [YunzaiRoleTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, imports: [CommonModule,
            NzSpinModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiRoleTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NzSpinModule,
                        YelonFormModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLXJvbGUtdHJlZS95dW56YWktcm9sZS10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRXZFLE1BQU0sVUFBVSxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQWM3QyxNQUFNLE9BQU8sb0JBQW9COzhHQUFwQixvQkFBb0I7K0dBQXBCLG9CQUFvQixZQVg3QixZQUFZO1lBQ1osWUFBWTtZQUNaLGVBQWU7WUFDZixZQUFZO1lBQ1osYUFBYTtZQUNiLFlBQVk7WUFDWixZQUFZLEVBVEksdUJBQXVCLGFBQXZCLHVCQUF1QjsrR0FjOUIsb0JBQW9CLFlBWDdCLFlBQVk7WUFDWixZQUFZO1lBQ1osZUFBZTtZQUNmLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVksRUFDVCxVQUFVOzsyRkFJSixvQkFBb0I7a0JBYmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osR0FBRyxVQUFVO3FCQUNkO29CQUNELE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOelRyZWVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBZdW56YWlSb2xlVHJlZUNvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLXJvbGUtdHJlZS5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1l1bnphaVJvbGVUcmVlQ29tcG9uZW50XTtcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTnpTcGluTW9kdWxlLFxuICAgIFllbG9uRm9ybU1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpFbXB0eU1vZHVsZSxcbiAgICBOelRyZWVNb2R1bGUsXG4gICAgTnpDYXJkTW9kdWxlLFxuICAgIC4uLkNPTVBPTkVOVFNcbiAgXSxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlSb2xlVHJlZU1vZHVsZSB7fVxuIl19