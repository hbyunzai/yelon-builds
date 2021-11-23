import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YzSharedModule } from '@yelon/bis/shared';
import { YUNZAI_THEME_BTN_KEYS } from '@yelon/theme/theme-btn';
// import { ContactComponent } from './contact/contact.component';
import { YzHeaderApplicationComponent, YzHeaderNotifyComponent, YzHeaderThemBtnComponent, YzHeaderUserComponent, YzHeaderClearStorageComponent, YzHeaderFullScreenComponent, YzHeaderI18NComponent } from './widgets';
import { YzLayoutBasicComponent } from './yz.basic.component';
const COMPONENTS = [
    // ContactComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRCxrRUFBa0U7QUFDbEUsT0FBTyxFQUNMLDRCQUE0QixFQUM1Qix1QkFBdUIsRUFDdkIsd0JBQXdCLEVBQ3hCLHFCQUFxQixFQUNyQiw2QkFBNkIsRUFDN0IsMkJBQTJCLEVBQzNCLHFCQUFxQixFQUN0QixNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RCxNQUFNLFVBQVUsR0FBRztJQUNqQixvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1Qix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLHFCQUFxQjtDQUN0QixDQUFDO0FBYUYsTUFBTSxPQUFPLGtCQUFrQjs7O1lBWDlCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUM7Z0JBQ3pHLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUscUJBQXFCO3dCQUM5QixRQUFRLEVBQUUsWUFBWTtxQkFDdkI7aUJBQ0Y7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBZelNoYXJlZE1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9iaXMvc2hhcmVkJztcbmltcG9ydCB7IFlVTlpBSV9USEVNRV9CVE5fS0VZUyB9IGZyb20gJ0B5ZWxvbi90aGVtZS90aGVtZS1idG4nO1xuXG4vLyBpbXBvcnQgeyBDb250YWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFl6SGVhZGVyQXBwbGljYXRpb25Db21wb25lbnQsXG4gIFl6SGVhZGVyTm90aWZ5Q29tcG9uZW50LFxuICBZekhlYWRlclRoZW1CdG5Db21wb25lbnQsXG4gIFl6SGVhZGVyVXNlckNvbXBvbmVudCxcbiAgWXpIZWFkZXJDbGVhclN0b3JhZ2VDb21wb25lbnQsXG4gIFl6SGVhZGVyRnVsbFNjcmVlbkNvbXBvbmVudCxcbiAgWXpIZWFkZXJJMThOQ29tcG9uZW50XG59IGZyb20gJy4vd2lkZ2V0cyc7XG5pbXBvcnQgeyBZekxheW91dEJhc2ljQ29tcG9uZW50IH0gZnJvbSAnLi95ei5iYXNpYy5jb21wb25lbnQnO1xuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgLy8gQ29udGFjdENvbXBvbmVudCxcbiAgWXpMYXlvdXRCYXNpY0NvbXBvbmVudCxcbiAgWXpIZWFkZXJBcHBsaWNhdGlvbkNvbXBvbmVudCxcbiAgWXpIZWFkZXJOb3RpZnlDb21wb25lbnQsXG4gIFl6SGVhZGVyVGhlbUJ0bkNvbXBvbmVudCxcbiAgWXpIZWFkZXJVc2VyQ29tcG9uZW50LFxuICBZekhlYWRlckZ1bGxTY3JlZW5Db21wb25lbnQsXG4gIFl6SGVhZGVyQ2xlYXJTdG9yYWdlQ29tcG9uZW50LFxuICBZekhlYWRlckkxOE5Db21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlLCBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIFl6U2hhcmVkTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogWVVOWkFJX1RIRU1FX0JUTl9LRVlTLFxuICAgICAgdXNlVmFsdWU6ICdzaXRlLXRoZW1lJ1xuICAgIH1cbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFsuLi5DT01QT05FTlRTXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlMYXlvdXRNb2R1bGUge31cbiJdfQ==