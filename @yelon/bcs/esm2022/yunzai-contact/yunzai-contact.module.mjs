import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YunzaiDeptTreeModule } from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiDormitoryTreeModule } from '@yelon/bcs/yunzai-dormitory-tree';
import { YunzaiFriendGroupModule } from '@yelon/bcs/yunzai-friend-group';
import { YunzaiRoleTreeModule } from '@yelon/bcs/yunzai-role-tree';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';
import { YunzaiTableUserModule } from '@yelon/bcs/yunzai-table-user';
import { YunzaiContactComponent } from './yunzai-contact.component';
import * as i0 from "@angular/core";
export class YunzaiContactModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiContactModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiContactModule, declarations: [YunzaiContactComponent], imports: [YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiRoleTreeModule,
            YunzaiTableUserModule,
            HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule], exports: [YunzaiContactComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiContactModule, imports: [YunzaiDeptTreeModule,
            YunzaiDormitoryTreeModule,
            YunzaiFriendGroupModule,
            YunzaiRoleTreeModule,
            YunzaiTableUserModule,
            HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiContactModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        YunzaiDeptTreeModule,
                        YunzaiDormitoryTreeModule,
                        YunzaiFriendGroupModule,
                        YunzaiRoleTreeModule,
                        YunzaiTableUserModule,
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        RouterModule,
                        ReactiveFormsModule,
                        YunzaiSharedZorroModule,
                        YunzaiSharedYelonModule
                    ],
                    declarations: [YunzaiContactComponent],
                    exports: [YunzaiContactComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmNzL3l1bnphaS1jb250YWN0L3l1bnphaS1jb250YWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25FLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQW9CcEUsTUFBTSxPQUFPLG1CQUFtQjsrR0FBbkIsbUJBQW1CO2dIQUFuQixtQkFBbUIsaUJBSGYsc0JBQXNCLGFBYm5DLG9CQUFvQjtZQUNwQix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLG9CQUFvQjtZQUNwQixxQkFBcUI7WUFDckIsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixXQUFXO1lBQ1gsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQix1QkFBdUI7WUFDdkIsdUJBQXVCLGFBR2Ysc0JBQXNCO2dIQUVyQixtQkFBbUIsWUFoQjVCLG9CQUFvQjtZQUNwQix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLG9CQUFvQjtZQUNwQixxQkFBcUI7WUFDckIsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixXQUFXO1lBQ1gsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQix1QkFBdUI7WUFDdkIsdUJBQXVCOzs0RkFLZCxtQkFBbUI7a0JBbEIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBZdW56YWlEZXB0VHJlZU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLWRlcHQtdHJlZSc7XG5pbXBvcnQgeyBZdW56YWlEb3JtaXRvcnlUcmVlTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZG9ybWl0b3J5LXRyZWUnO1xuaW1wb3J0IHsgWXVuemFpRnJpZW5kR3JvdXBNb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1mcmllbmQtZ3JvdXAnO1xuaW1wb3J0IHsgWXVuemFpUm9sZVRyZWVNb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1yb2xlLXRyZWUnO1xuaW1wb3J0IHsgWXVuemFpU2hhcmVkWWVsb25Nb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1zaGFyZWQteWVsb24nO1xuaW1wb3J0IHsgWXVuemFpU2hhcmVkWm9ycm9Nb2R1bGUgfSBmcm9tICdAeWVsb24vYmNzL3l1bnphaS1zaGFyZWQtem9ycm8nO1xuaW1wb3J0IHsgWXVuemFpVGFibGVVc2VyTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktdGFibGUtdXNlcic7XG5cbmltcG9ydCB7IFl1bnphaUNvbnRhY3RDb21wb25lbnQgfSBmcm9tICcuL3l1bnphaS1jb250YWN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBZdW56YWlEZXB0VHJlZU1vZHVsZSxcbiAgICBZdW56YWlEb3JtaXRvcnlUcmVlTW9kdWxlLFxuICAgIFl1bnphaUZyaWVuZEdyb3VwTW9kdWxlLFxuICAgIFl1bnphaVJvbGVUcmVlTW9kdWxlLFxuICAgIFl1bnphaVRhYmxlVXNlck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBZdW56YWlTaGFyZWRab3Jyb01vZHVsZSxcbiAgICBZdW56YWlTaGFyZWRZZWxvbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtZdW56YWlDb250YWN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1l1bnphaUNvbnRhY3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUNvbnRhY3RNb2R1bGUge31cbiJdfQ==