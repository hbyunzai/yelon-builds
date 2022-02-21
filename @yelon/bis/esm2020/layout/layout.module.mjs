/*
 * @Author: cui <devcui@outlook.com>
 * @Editor: microsoft vscode
 * @Date: 2021-11-27 11:30:50
 * @LastEditTime: 2021-11-27 14:38:46
 * @LastEditors: cui <devcui@outlook.com>
 * @Description: empty description
 * @FilePath: \yelon\packages\bis\layout\layout.module.ts
 * LICENSE HERE
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YzSharedModule } from '@yelon/bis/shared';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
import { ContactComponent } from './contact/contact.component';
import { YzHeaderApplicationComponent, YzHeaderNotifyComponent, YzHeaderThemBtnComponent, YzHeaderUserComponent, YzHeaderClearStorageComponent, YzHeaderFullScreenComponent, YzHeaderI18NComponent } from './widgets';
import { YzLayoutBasicComponent } from './yz.basic.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    ContactComponent,
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
YunzaiLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
YunzaiLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiLayoutModule, declarations: [ContactComponent,
        YzLayoutBasicComponent,
        YzHeaderApplicationComponent,
        YzHeaderNotifyComponent,
        YzHeaderThemBtnComponent,
        YzHeaderUserComponent,
        YzHeaderFullScreenComponent,
        YzHeaderClearStorageComponent,
        YzHeaderI18NComponent], imports: [HttpClientModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, YzSharedModule], exports: [ContactComponent,
        YzLayoutBasicComponent,
        YzHeaderApplicationComponent,
        YzHeaderNotifyComponent,
        YzHeaderThemBtnComponent,
        YzHeaderUserComponent,
        YzHeaderFullScreenComponent,
        YzHeaderClearStorageComponent,
        YzHeaderI18NComponent] });
YunzaiLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiLayoutModule, providers: [
        {
            provide: YUNZAI_THEME_BTN_KEYS,
            useValue: 'site-theme'
        }
    ], imports: [[HttpClientModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, YzSharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: YunzaiLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [HttpClientModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, YzSharedModule],
                    providers: [
                        {
                            provide: YUNZAI_THEME_BTN_KEYS,
                            useValue: 'site-theme'
                        }
                    ],
                    declarations: [...COMPONENTS],
                    exports: [...COMPONENTS]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0dBU0c7QUFDSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3JCLDZCQUE2QixFQUM3QiwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3RCLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUM5RCxNQUFNLFVBQVUsR0FBRztJQUNqQixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1Qix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLHFCQUFxQjtDQUN0QixDQUFDO0FBYUYsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQXRCN0IsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3QixxQkFBcUIsYUFJWCxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxjQUFjLGFBWnhHLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IscUJBQXFCO2dIQWNWLGtCQUFrQixhQVRsQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixRQUFRLEVBQUUsWUFBWTtTQUN2QjtLQUNGLFlBTlEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUM7MkZBVTlGLGtCQUFrQjtrQkFYOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUM7b0JBQ3pHLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUscUJBQXFCOzRCQUM5QixRQUFRLEVBQUUsWUFBWTt5QkFDdkI7cUJBQ0Y7b0JBQ0QsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBQzdCLE9BQU8sRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBjdWkgPGRldmN1aUBvdXRsb29rLmNvbT5cbiAqIEBFZGl0b3I6IG1pY3Jvc29mdCB2c2NvZGVcbiAqIEBEYXRlOiAyMDIxLTExLTI3IDExOjMwOjUwXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTExLTI3IDE0OjM4OjQ2XG4gKiBATGFzdEVkaXRvcnM6IGN1aSA8ZGV2Y3VpQG91dGxvb2suY29tPlxuICogQERlc2NyaXB0aW9uOiBlbXB0eSBkZXNjcmlwdGlvblxuICogQEZpbGVQYXRoOiBcXHllbG9uXFxwYWNrYWdlc1xcYmlzXFxsYXlvdXRcXGxheW91dC5tb2R1bGUudHNcbiAqIExJQ0VOU0UgSEVSRVxuICovXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFl6U2hhcmVkTW9kdWxlIH0gZnJvbSAnQHllbG9uL2Jpcy9zaGFyZWQnO1xuaW1wb3J0IHsgWVVOWkFJX1RIRU1FX0JUTl9LRVlTIH0gZnJvbSAnQHllbG9uL3RoZW1lL3RoZW1lLWJ0bic7XG5cbmltcG9ydCB7IENvbnRhY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgWXpIZWFkZXJBcHBsaWNhdGlvbkNvbXBvbmVudCxcbiAgWXpIZWFkZXJOb3RpZnlDb21wb25lbnQsXG4gIFl6SGVhZGVyVGhlbUJ0bkNvbXBvbmVudCxcbiAgWXpIZWFkZXJVc2VyQ29tcG9uZW50LFxuICBZekhlYWRlckNsZWFyU3RvcmFnZUNvbXBvbmVudCxcbiAgWXpIZWFkZXJGdWxsU2NyZWVuQ29tcG9uZW50LFxuICBZekhlYWRlckkxOE5Db21wb25lbnRcbn0gZnJvbSAnLi93aWRnZXRzJztcbmltcG9ydCB7IFl6TGF5b3V0QmFzaWNDb21wb25lbnQgfSBmcm9tICcuL3l6LmJhc2ljLmNvbXBvbmVudCc7XG5jb25zdCBDT01QT05FTlRTID0gW1xuICBDb250YWN0Q29tcG9uZW50LFxuICBZekxheW91dEJhc2ljQ29tcG9uZW50LFxuICBZekhlYWRlckFwcGxpY2F0aW9uQ29tcG9uZW50LFxuICBZekhlYWRlck5vdGlmeUNvbXBvbmVudCxcbiAgWXpIZWFkZXJUaGVtQnRuQ29tcG9uZW50LFxuICBZekhlYWRlclVzZXJDb21wb25lbnQsXG4gIFl6SGVhZGVyRnVsbFNjcmVlbkNvbXBvbmVudCxcbiAgWXpIZWFkZXJDbGVhclN0b3JhZ2VDb21wb25lbnQsXG4gIFl6SGVhZGVySTE4TkNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGUsIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJvdXRlck1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgWXpTaGFyZWRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBZVU5aQUlfVEhFTUVfQlROX0tFWVMsXG4gICAgICB1c2VWYWx1ZTogJ3NpdGUtdGhlbWUnXG4gICAgfVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5DT01QT05FTlRTXSxcbiAgZXhwb3J0czogWy4uLkNPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dE1vZHVsZSB7fVxuIl19