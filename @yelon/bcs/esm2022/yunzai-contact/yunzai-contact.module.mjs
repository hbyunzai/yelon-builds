import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YunzaiDeptTreeModule } from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import { YunzaiThemeModule } from '@yelon/theme';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { YunzaiContactComponent } from './yunzai-contact.component';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiContactComponent];
export class YunzaiContactModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, imports: [YunzaiThemeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiRoleTreeModule,
            YunzaiTableUserModule,
            CommonModule,
            NzCardModule,
            NzGridModule,
            NzRadioModule,
            FormsModule, YunzaiContactComponent], exports: [YunzaiContactComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, imports: [YunzaiThemeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiRoleTreeModule,
            YunzaiTableUserModule,
            CommonModule,
            NzCardModule,
            NzGridModule,
            NzRadioModule,
            FormsModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiContactModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        YunzaiThemeModule,
                        YunzaiDeptTreeModule,
                        YunzaiDormitoryTreeModule,
                        YunzaiFriendGroupModule,
                        YunzaiRoleTreeModule,
                        YunzaiTableUserModule,
                        CommonModule,
                        NzCardModule,
                        NzGridModule,
                        NzRadioModule,
                        FormsModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1jb250YWN0L3l1bnphaS1jb250YWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQUVwRSxNQUFNLFVBQVUsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFtQjVDLE1BQU0sT0FBTyxtQkFBbUI7OEdBQW5CLG1CQUFtQjsrR0FBbkIsbUJBQW1CLFlBZjVCLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLHVCQUF1QjtZQUN2QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLGFBQWE7WUFDYixXQUFXLEVBZEssc0JBQXNCLGFBQXRCLHNCQUFzQjsrR0FtQjdCLG1CQUFtQixZQWY1QixpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLHlCQUF5QjtZQUN6Qix1QkFBdUI7WUFDdkIsb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixhQUFhO1lBQ2IsV0FBVyxFQUNSLFVBQVU7OzJGQUlKLG1CQUFtQjtrQkFqQi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxHQUFHLFVBQVU7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgWXVuemFpRGVwdFRyZWVNb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1kZXB0LXRyZWUnO1xuaW1wb3J0IHsgWXVuemFpRG9ybWl0b3J5VHJlZU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLWRvcm1pdG9yeS10cmVlJztcbmltcG9ydCB7IFl1bnphaUZyaWVuZEdyb3VwTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZnJpZW5kLWdyb3VwJztcbmltcG9ydCB7IFl1bnphaVJvbGVUcmVlTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktcm9sZS10cmVlJztcbmltcG9ydCB7IFl1bnphaVRhYmxlVXNlck1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLXRhYmxlLXVzZXInO1xuaW1wb3J0IHsgWXVuemFpVGhlbWVNb2R1bGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgTnpDYXJkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jYXJkJztcbmltcG9ydCB7IE56R3JpZE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZ3JpZCc7XG5pbXBvcnQgeyBOelJhZGlvTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9yYWRpbyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbnRhY3RDb21wb25lbnQgfSBmcm9tICcuL3l1bnphaS1jb250YWN0LmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbWXVuemFpQ29udGFjdENvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBZdW56YWlUaGVtZU1vZHVsZSxcbiAgICBZdW56YWlEZXB0VHJlZU1vZHVsZSxcbiAgICBZdW56YWlEb3JtaXRvcnlUcmVlTW9kdWxlLFxuICAgIFl1bnphaUZyaWVuZEdyb3VwTW9kdWxlLFxuICAgIFl1bnphaVJvbGVUcmVlTW9kdWxlLFxuICAgIFl1bnphaVRhYmxlVXNlck1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTnpDYXJkTW9kdWxlLFxuICAgIE56R3JpZE1vZHVsZSxcbiAgICBOelJhZGlvTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIC4uLkNPTVBPTkVOVFNcbiAgXSxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlDb250YWN0TW9kdWxlIHt9XG4iXX0=