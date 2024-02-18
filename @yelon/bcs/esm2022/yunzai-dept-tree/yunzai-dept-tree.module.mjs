import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { YunzaiDeptTreeComponent } from './yunzai-dept-tree.component';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiDeptTreeComponent];
export class YunzaiDeptTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, imports: [CommonModule,
            NzIconModule,
            NzEmptyModule,
            NzSpinModule,
            NzTreeModule,
            NzCardModule,
            YelonFormModule, YunzaiDeptTreeComponent], exports: [YunzaiDeptTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, imports: [CommonModule,
            NzIconModule,
            NzEmptyModule,
            NzSpinModule,
            NzTreeModule,
            NzCardModule,
            YelonFormModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDeptTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzSpinModule,
                        NzTreeModule,
                        NzCardModule,
                        YelonFormModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRlcHQtdHJlZS95dW56YWktZGVwdC10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRXZFLE1BQU0sVUFBVSxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQWU3QyxNQUFNLE9BQU8sb0JBQW9COzhHQUFwQixvQkFBb0I7K0dBQXBCLG9CQUFvQixZQVg3QixZQUFZO1lBQ1osWUFBWTtZQUNaLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixlQUFlLEVBVkMsdUJBQXVCLGFBQXZCLHVCQUF1QjsrR0FlOUIsb0JBQW9CLFlBWDdCLFlBQVk7WUFDWixZQUFZO1lBQ1osYUFBYTtZQUNiLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLGVBQWUsRUFDWixVQUFVOzsyRkFJSixvQkFBb0I7a0JBYmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsR0FBRyxVQUFVO3FCQUNkO29CQUNELE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOelRyZWVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBZdW56YWlEZXB0VHJlZUNvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLWRlcHQtdHJlZS5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1l1bnphaURlcHRUcmVlQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpFbXB0eU1vZHVsZSxcbiAgICBOelNwaW5Nb2R1bGUsXG4gICAgTnpUcmVlTW9kdWxlLFxuICAgIE56Q2FyZE1vZHVsZSxcbiAgICBZZWxvbkZvcm1Nb2R1bGUsXG4gICAgLi4uQ09NUE9ORU5UU1xuICBdLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURlcHRUcmVlTW9kdWxlIHt9XG4iXX0=