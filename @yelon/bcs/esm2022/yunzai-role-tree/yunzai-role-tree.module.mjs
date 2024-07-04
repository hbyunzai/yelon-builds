import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YelonFormModule } from '@yelon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { YunzaiRoleTreeComponent } from './yunzai-role-tree.component';
import { YunzaiRoleTreeService } from './yunzai-role-tree.service';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiRoleTreeComponent];
export class YunzaiRoleTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiRoleTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: YunzaiRoleTreeModule, imports: [NzSpinModule,
            YelonFormModule,
            NzButtonModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            CommonModule,
            NzCardModule, YunzaiRoleTreeComponent], exports: [YunzaiRoleTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiRoleTreeModule, providers: [YunzaiRoleTreeService], imports: [NzSpinModule,
            YelonFormModule,
            NzButtonModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            CommonModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: YunzaiRoleTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzSpinModule,
                        YelonFormModule,
                        NzButtonModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        CommonModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    providers: [YunzaiRoleTreeService],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLXJvbGUtdHJlZS95dW56YWktcm9sZS10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQUVuRSxNQUFNLFVBQVUsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFpQjdDLE1BQU0sT0FBTyxvQkFBb0I7OEdBQXBCLG9CQUFvQjsrR0FBcEIsb0JBQW9CLFlBYjdCLFlBQVk7WUFDWixlQUFlO1lBQ2YsY0FBYztZQUNkLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZLEVBWEksdUJBQXVCLGFBQXZCLHVCQUF1QjsrR0FpQjlCLG9CQUFvQixhQUhwQixDQUFDLHFCQUFxQixDQUFDLFlBVmhDLFlBQVk7WUFDWixlQUFlO1lBQ2YsY0FBYztZQUNkLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZLEVBQ1QsVUFBVTs7MkZBS0osb0JBQW9CO2tCQWZoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osR0FBRyxVQUFVO3FCQUNkO29CQUNELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNsQyxPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWWVsb25Gb3JtTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Zvcm0nO1xuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2J1dHRvbic7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOelRyZWVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBZdW56YWlSb2xlVHJlZUNvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLXJvbGUtdHJlZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgWXVuemFpUm9sZVRyZWVTZXJ2aWNlIH0gZnJvbSAnLi95dW56YWktcm9sZS10cmVlLnNlcnZpY2UnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1l1bnphaVJvbGVUcmVlQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE56U3Bpbk1vZHVsZSxcbiAgICBZZWxvbkZvcm1Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpUcmVlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGUsXG4gICAgLi4uQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtZdW56YWlSb2xlVHJlZVNlcnZpY2VdLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaVJvbGVUcmVlTW9kdWxlIHt9XG4iXX0=