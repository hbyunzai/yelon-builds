import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YzSharedModule } from '@yelon/bis/shared';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { YzHeaderApplicationComponent, YzHeaderNotifyComponent, YzHeaderThemBtnComponent, YzHeaderUserComponent, YzHeaderClearStorageComponent, YzHeaderFullScreenComponent, YzHeaderI18NComponent } from './widgets';
import { YzLayoutBasicComponent } from './yz.basic.component';
const COMPONENTS = [
    YzLayoutBasicComponent,
    YzHeaderApplicationComponent,
    YzHeaderNotifyComponent,
    YzHeaderThemBtnComponent,
    YzHeaderUserComponent,
    YzHeaderFullScreenComponent,
    YzHeaderClearStorageComponent,
    YzHeaderI18NComponent
];
export class YunzaiLayoutModule {
}
YunzaiLayoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, YzSharedModule],
                providers: [
                    {
                        provide: YUNZAI_THEME_BTN_KEYS,
                        useValue: 'site-theme'
                    }
                ],
                declarations: [...COMPONENTS],
                exports: [...COMPONENTS]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3JCLDZCQUE2QixFQUM3QiwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3RCLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHNCQUFzQjtJQUN0Qiw0QkFBNEI7SUFDNUIsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3QixxQkFBcUI7Q0FDdEIsQ0FBQztBQWFGLE1BQU0sT0FBTyxrQkFBa0I7OztZQVg5QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO2dCQUN6RyxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLHFCQUFxQjt3QkFDOUIsUUFBUSxFQUFFLFlBQVk7cUJBQ3ZCO2lCQUNGO2dCQUNELFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgWXpTaGFyZWRNb2R1bGUgfSBmcm9tICdAeWVsb24vYmlzL3NoYXJlZCc7XG5pbXBvcnQgeyBZVU5aQUlfVEhFTUVfQlROX0tFWVMgfSBmcm9tICdAeWVsb24vdGhlbWUvdGhlbWUtYnRuJztcblxuaW1wb3J0IHtcbiAgWXpIZWFkZXJBcHBsaWNhdGlvbkNvbXBvbmVudCxcbiAgWXpIZWFkZXJOb3RpZnlDb21wb25lbnQsXG4gIFl6SGVhZGVyVGhlbUJ0bkNvbXBvbmVudCxcbiAgWXpIZWFkZXJVc2VyQ29tcG9uZW50LFxuICBZekhlYWRlckNsZWFyU3RvcmFnZUNvbXBvbmVudCxcbiAgWXpIZWFkZXJGdWxsU2NyZWVuQ29tcG9uZW50LFxuICBZekhlYWRlckkxOE5Db21wb25lbnRcbn0gZnJvbSAnLi93aWRnZXRzJztcbmltcG9ydCB7IFl6TGF5b3V0QmFzaWNDb21wb25lbnQgfSBmcm9tICcuL3l6LmJhc2ljLmNvbXBvbmVudCc7XG5jb25zdCBDT01QT05FTlRTID0gW1xuICBZekxheW91dEJhc2ljQ29tcG9uZW50LFxuICBZekhlYWRlckFwcGxpY2F0aW9uQ29tcG9uZW50LFxuICBZekhlYWRlck5vdGlmeUNvbXBvbmVudCxcbiAgWXpIZWFkZXJUaGVtQnRuQ29tcG9uZW50LFxuICBZekhlYWRlclVzZXJDb21wb25lbnQsXG4gIFl6SGVhZGVyRnVsbFNjcmVlbkNvbXBvbmVudCxcbiAgWXpIZWFkZXJDbGVhclN0b3JhZ2VDb21wb25lbnQsXG4gIFl6SGVhZGVySTE4TkNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGUsIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJvdXRlck1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgWXpTaGFyZWRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBZVU5aQUlfVEhFTUVfQlROX0tFWVMsXG4gICAgICB1c2VWYWx1ZTogJ3NpdGUtdGhlbWUnXG4gICAgfVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5DT01QT05FTlRTXSxcbiAgZXhwb3J0czogWy4uLkNPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dE1vZHVsZSB7fVxuIl19