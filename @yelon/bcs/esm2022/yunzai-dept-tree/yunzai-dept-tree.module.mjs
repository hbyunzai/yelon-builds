import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YunzaiGradeService } from '@yelon/bcs/yunzai-grade';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { YunzaiDeptTreeComponent } from './yunzai-dept-tree.component';
import { YunzaiDeptTreeService } from './yunzai-dept-tree.service';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiDeptTreeComponent];
export class YunzaiDeptTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiDeptTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.0", ngImport: i0, type: YunzaiDeptTreeModule, imports: [NzSpinModule,
            NzCardModule,
            CommonModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule, YunzaiDeptTreeComponent], exports: [YunzaiDeptTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiDeptTreeModule, providers: [YunzaiDeptTreeService, YunzaiGradeService], imports: [NzSpinModule,
            NzCardModule,
            CommonModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: YunzaiDeptTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzSpinModule,
                        NzCardModule,
                        CommonModule,
                        YelonFormModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        ...COMPONENTS
                    ],
                    providers: [YunzaiDeptTreeService, YunzaiGradeService],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRlcHQtdHJlZS95dW56YWktZGVwdC10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBRW5FLE1BQU0sVUFBVSxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQWU3QyxNQUFNLE9BQU8sb0JBQW9COzhHQUFwQixvQkFBb0I7K0dBQXBCLG9CQUFvQixZQVo3QixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixlQUFlO1lBQ2YsWUFBWTtZQUNaLGFBQWE7WUFDYixZQUFZLEVBVEksdUJBQXVCLGFBQXZCLHVCQUF1QjsrR0FlOUIsb0JBQW9CLGFBSHBCLENBQUMscUJBQXFCLEVBQUUsa0JBQWtCLENBQUMsWUFUcEQsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osZUFBZTtZQUNmLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWSxFQUNULFVBQVU7OzJGQUtKLG9CQUFvQjtrQkFkaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixHQUFHLFVBQVU7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFLENBQUMscUJBQXFCLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZdW56YWlHcmFkZVNlcnZpY2UgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1ncmFkZSc7XG5pbXBvcnQgeyBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOelRyZWVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBZdW56YWlEZXB0VHJlZUNvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLWRlcHQtdHJlZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpRGVwdFRyZWVTZXJ2aWNlIH0gZnJvbSAnLi95dW56YWktZGVwdC10cmVlLnNlcnZpY2UnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1l1bnphaURlcHRUcmVlQ29tcG9uZW50XTtcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOelNwaW5Nb2R1bGUsXG4gICAgTnpDYXJkTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBZZWxvbkZvcm1Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpUcmVlTW9kdWxlLFxuICAgIC4uLkNPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbWXVuemFpRGVwdFRyZWVTZXJ2aWNlLCBZdW56YWlHcmFkZVNlcnZpY2VdLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURlcHRUcmVlTW9kdWxlIHt9XG4iXX0=