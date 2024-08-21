import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YunzaiDeptTreeModule } from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import { I18nPipe } from '@yelon/theme';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { YunzaiContactComponent } from './yunzai-contact.component';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiContactComponent];
export class YunzaiContactModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiContactModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.0", ngImport: i0, type: YunzaiContactModule, imports: [FormsModule,
            CommonModule,
            I18nPipe,
            NzRadioModule,
            NzGridModule,
            NzCardModule,
            YunzaiRoleTreeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiTableUserModule, YunzaiContactComponent], exports: [YunzaiContactComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiContactModule, imports: [FormsModule,
            CommonModule,
            NzRadioModule,
            NzGridModule,
            NzCardModule,
            YunzaiRoleTreeModule,
            YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiTableUserModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiContactModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        I18nPipe,
                        NzRadioModule,
                        NzGridModule,
                        NzCardModule,
                        YunzaiRoleTreeModule,
                        YunzaiDeptTreeModule,
                        YunzaiDormitoryTreeModule,
                        YunzaiFriendGroupModule,
                        YunzaiTableUserModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1jb250YWN0L3l1bnphaS1jb250YWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFcEUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBbUI1QyxNQUFNLE9BQU8sbUJBQW1COzhHQUFuQixtQkFBbUI7K0dBQW5CLG1CQUFtQixZQWY1QixXQUFXO1lBQ1gsWUFBWTtZQUNaLFFBQVE7WUFDUixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsb0JBQW9CO1lBQ3BCLHlCQUF5QjtZQUN6Qix1QkFBdUI7WUFDdkIscUJBQXFCLEVBZEwsc0JBQXNCLGFBQXRCLHNCQUFzQjsrR0FtQjdCLG1CQUFtQixZQWY1QixXQUFXO1lBQ1gsWUFBWTtZQUVaLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLG9CQUFvQjtZQUNwQixvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLHVCQUF1QjtZQUN2QixxQkFBcUIsRUFDbEIsVUFBVTs7MkZBSUosbUJBQW1CO2tCQWpCL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2QixxQkFBcUI7d0JBQ3JCLEdBQUcsVUFBVTtxQkFDZDtvQkFDRCxPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBZdW56YWlEZXB0VHJlZU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLWRlcHQtdHJlZSc7XG5pbXBvcnQgeyBZdW56YWlEb3JtaXRvcnlUcmVlTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUnO1xuaW1wb3J0IHsgWXVuemFpRnJpZW5kR3JvdXBNb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAnO1xuaW1wb3J0IHsgWXVuemFpUm9sZVRyZWVNb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1yb2xlLXRyZWUnO1xuaW1wb3J0IHsgWXVuemFpVGFibGVVc2VyTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktdGFibGUtdXNlcic7XG5pbXBvcnQgeyBJMThuUGlwZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBOekNhcmRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NhcmQnO1xuaW1wb3J0IHsgTnpHcmlkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9ncmlkJztcbmltcG9ydCB7IE56UmFkaW9Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3JhZGlvJztcblxuaW1wb3J0IHsgWXVuemFpQ29udGFjdENvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLWNvbnRhY3QuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtZdW56YWlDb250YWN0Q29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuUGlwZSxcbiAgICBOelJhZGlvTW9kdWxlLFxuICAgIE56R3JpZE1vZHVsZSxcbiAgICBOekNhcmRNb2R1bGUsXG4gICAgWXVuemFpUm9sZVRyZWVNb2R1bGUsXG4gICAgWXVuemFpRGVwdFRyZWVNb2R1bGUsXG4gICAgWXVuemFpRG9ybWl0b3J5VHJlZU1vZHVsZSxcbiAgICBZdW56YWlGcmllbmRHcm91cE1vZHVsZSxcbiAgICBZdW56YWlUYWJsZVVzZXJNb2R1bGUsXG4gICAgLi4uQ09NUE9ORU5UU1xuICBdLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUNvbnRhY3RNb2R1bGUge31cbiJdfQ==