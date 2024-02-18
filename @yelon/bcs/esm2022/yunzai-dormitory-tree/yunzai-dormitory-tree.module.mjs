import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YelonFormModule } from '@yelon/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { YunzaiDormitoryTreeComponent } from './yunzai-dormitory-tree.component';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiDormitoryTreeComponent];
export class YunzaiDormitoryTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, imports: [CommonModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzSpinModule,
            NzCardModule, YunzaiDormitoryTreeComponent], exports: [YunzaiDormitoryTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, imports: [CommonModule,
            YelonFormModule,
            NzIconModule,
            NzEmptyModule,
            NzTreeModule,
            NzSpinModule,
            NzCardModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiDormitoryTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        YelonFormModule,
                        NzIconModule,
                        NzEmptyModule,
                        NzTreeModule,
                        NzSpinModule,
                        NzCardModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRvcm1pdG9yeS10cmVlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUveXVuemFpLWRvcm1pdG9yeS10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBRWpGLE1BQU0sVUFBVSxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQWVsRCxNQUFNLE9BQU8seUJBQXlCOzhHQUF6Qix5QkFBeUI7K0dBQXpCLHlCQUF5QixZQVhsQyxZQUFZO1lBQ1osZUFBZTtZQUNmLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZLEVBVkksNEJBQTRCLGFBQTVCLDRCQUE0QjsrR0FlbkMseUJBQXlCLFlBWGxDLFlBQVk7WUFDWixlQUFlO1lBQ2YsWUFBWTtZQUNaLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVksRUFDVCxVQUFVOzsyRkFJSix5QkFBeUI7a0JBYnJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osR0FBRyxVQUFVO3FCQUNkO29CQUNELE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZZWxvbkZvcm1Nb2R1bGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOelRyZWVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBZdW56YWlEb3JtaXRvcnlUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi95dW56YWktZG9ybWl0b3J5LXRyZWUuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtZdW56YWlEb3JtaXRvcnlUcmVlQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBZZWxvbkZvcm1Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpUcmVlTW9kdWxlLFxuICAgIE56U3Bpbk1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGUsXG4gICAgLi4uQ09NUE9ORU5UU1xuICBdLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaURvcm1pdG9yeVRyZWVNb2R1bGUge31cbiJdfQ==