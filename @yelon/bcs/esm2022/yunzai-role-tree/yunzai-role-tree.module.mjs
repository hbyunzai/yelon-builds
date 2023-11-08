import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YunzaiSharedYelonModule } from '@yelon/bcs/yunzai-shared-yelon';
import { YunzaiSharedZorroModule } from '@yelon/bcs/yunzai-shared-zorro';
import { YunzaiRoleTreeComponent } from './yunzai-role-tree.component';
import * as i0 from "@angular/core";
export class YunzaiRoleTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, declarations: [YunzaiRoleTreeComponent], imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule], exports: [YunzaiRoleTreeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, imports: [HttpClientModule,
            CommonModule,
            FormsModule,
            RouterModule,
            ReactiveFormsModule,
            YunzaiSharedZorroModule,
            YunzaiSharedYelonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiRoleTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        RouterModule,
                        ReactiveFormsModule,
                        YunzaiSharedZorroModule,
                        YunzaiSharedYelonModule
                    ],
                    declarations: [YunzaiRoleTreeComponent],
                    exports: [YunzaiRoleTreeComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLXJvbGUtdHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLXJvbGUtdHJlZS95dW56YWktcm9sZS10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQWV2RSxNQUFNLE9BQU8sb0JBQW9COytHQUFwQixvQkFBb0I7Z0hBQXBCLG9CQUFvQixpQkFIaEIsdUJBQXVCLGFBUnBDLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLHVCQUF1QixhQUdmLHVCQUF1QjtnSEFFdEIsb0JBQW9CLFlBWDdCLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLHVCQUF1Qjs7NEZBS2Qsb0JBQW9CO2tCQWJoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7cUJBQ3hCO29CQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFl1bnphaVNoYXJlZFllbG9uTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktc2hhcmVkLXllbG9uJztcbmltcG9ydCB7IFl1bnphaVNoYXJlZFpvcnJvTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktc2hhcmVkLXpvcnJvJztcblxuaW1wb3J0IHsgWXVuemFpUm9sZVRyZWVDb21wb25lbnQgfSBmcm9tICcuL3l1bnphaS1yb2xlLXRyZWUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFl1bnphaVNoYXJlZFpvcnJvTW9kdWxlLFxuICAgIFl1bnphaVNoYXJlZFllbG9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1l1bnphaVJvbGVUcmVlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1l1bnphaVJvbGVUcmVlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlSb2xlVHJlZU1vZHVsZSB7fVxuIl19