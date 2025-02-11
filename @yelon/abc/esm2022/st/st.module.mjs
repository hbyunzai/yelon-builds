import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CellModule } from '@yelon/abc/cell';
import { YelonACLModule } from '@yelon/acl';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { STFilterComponent } from './st-filter.component';
import { STRowDirective } from './st-row.directive';
import { STWidgetHostDirective } from './st-widget-host.directive';
import { STComponent, STTdComponent } from './st.component';
import * as i0 from "@angular/core";
const COMPONENTS = [STComponent, STRowDirective, STWidgetHostDirective];
export class STModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: STModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.11", ngImport: i0, type: STModule, declarations: [STComponent, STRowDirective, STWidgetHostDirective, STFilterComponent, STTdComponent], imports: [CommonModule,
            FormsModule,
            YelonACLModule,
            CellModule,
            NzPopconfirmModule,
            NzTableModule,
            NzIconModule,
            NzBadgeModule,
            NzCheckboxModule,
            NzDividerModule,
            NzDropDownModule,
            NzMenuModule,
            NzRadioModule,
            NzTagModule,
            NzInputModule,
            NzToolTipModule,
            NzResizableModule,
            NzInputNumberModule,
            NzDatePickerModule], exports: [STComponent, STRowDirective, STWidgetHostDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: STModule, imports: [CommonModule,
            FormsModule,
            YelonACLModule,
            CellModule,
            NzPopconfirmModule,
            NzTableModule,
            NzIconModule,
            NzBadgeModule,
            NzCheckboxModule,
            NzDividerModule,
            NzDropDownModule,
            NzMenuModule,
            NzRadioModule,
            NzTagModule,
            NzInputModule,
            NzToolTipModule,
            NzResizableModule,
            NzInputNumberModule,
            NzDatePickerModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: STModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        YelonACLModule,
                        CellModule,
                        NzPopconfirmModule,
                        NzTableModule,
                        NzIconModule,
                        NzBadgeModule,
                        NzCheckboxModule,
                        NzDividerModule,
                        NzDropDownModule,
                        NzMenuModule,
                        NzRadioModule,
                        NzTagModule,
                        NzInputModule,
                        NzToolTipModule,
                        NzResizableModule,
                        NzInputNumberModule,
                        NzDatePickerModule
                    ],
                    declarations: [...COMPONENTS, STFilterComponent, STTdComponent],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3N0L3N0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTVELE1BQU0sVUFBVSxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0FBMkJ4RSxNQUFNLE9BQU8sUUFBUTsrR0FBUixRQUFRO2dIQUFSLFFBQVEsaUJBM0JELFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBd0J0QyxpQkFBaUIsRUFBRSxhQUFhLGFBcEI1RCxZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWM7WUFDZCxVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLGFBQWE7WUFDYixZQUFZO1lBQ1osYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixhQUFhO1lBQ2IsV0FBVztZQUNYLGFBQWE7WUFDYixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLG1CQUFtQjtZQUNuQixrQkFBa0IsYUF0QkYsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7Z0hBMkJ6RCxRQUFRLFlBdkJqQixZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWM7WUFDZCxVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLGFBQWE7WUFDYixZQUFZO1lBQ1osYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixhQUFhO1lBQ2IsV0FBVztZQUNYLGFBQWE7WUFDYixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLG1CQUFtQjtZQUNuQixrQkFBa0I7OzRGQUtULFFBQVE7a0JBekJwQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxVQUFVO3dCQUNWLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsbUJBQW1CO3dCQUNuQixrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ2VsbE1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9hYmMvY2VsbCc7XG5pbXBvcnQgeyBZZWxvbkFDTE1vZHVsZSB9IGZyb20gJ0B5ZWxvbi9hY2wnO1xuaW1wb3J0IHsgTnpCYWRnZU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYmFkZ2UnO1xuaW1wb3J0IHsgTnpDaGVja2JveE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY2hlY2tib3gnO1xuaW1wb3J0IHsgTnpEYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBOekRpdmlkZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2RpdmlkZXInO1xuaW1wb3J0IHsgTnpEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcbmltcG9ydCB7IE56SW5wdXROdW1iZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0LW51bWJlcic7XG5pbXBvcnQgeyBOek1lbnVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL21lbnUnO1xuaW1wb3J0IHsgTnpQb3Bjb25maXJtTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9wb3Bjb25maXJtJztcbmltcG9ydCB7IE56UmFkaW9Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3JhZGlvJztcbmltcG9ydCB7IE56UmVzaXphYmxlTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9yZXNpemFibGUnO1xuaW1wb3J0IHsgTnpUYWJsZU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdGFibGUnO1xuaW1wb3J0IHsgTnpUYWdNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RhZyc7XG5pbXBvcnQgeyBOelRvb2xUaXBNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBTVEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTVFJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vc3Qtcm93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTVFdpZGdldEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL3N0LXdpZGdldC1ob3N0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTVENvbXBvbmVudCwgU1RUZENvbXBvbmVudCB9IGZyb20gJy4vc3QuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtTVENvbXBvbmVudCwgU1RSb3dEaXJlY3RpdmUsIFNUV2lkZ2V0SG9zdERpcmVjdGl2ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgWWVsb25BQ0xNb2R1bGUsXG4gICAgQ2VsbE1vZHVsZSxcbiAgICBOelBvcGNvbmZpcm1Nb2R1bGUsXG4gICAgTnpUYWJsZU1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpCYWRnZU1vZHVsZSxcbiAgICBOekNoZWNrYm94TW9kdWxlLFxuICAgIE56RGl2aWRlck1vZHVsZSxcbiAgICBOekRyb3BEb3duTW9kdWxlLFxuICAgIE56TWVudU1vZHVsZSxcbiAgICBOelJhZGlvTW9kdWxlLFxuICAgIE56VGFnTW9kdWxlLFxuICAgIE56SW5wdXRNb2R1bGUsXG4gICAgTnpUb29sVGlwTW9kdWxlLFxuICAgIE56UmVzaXphYmxlTW9kdWxlLFxuICAgIE56SW5wdXROdW1iZXJNb2R1bGUsXG4gICAgTnpEYXRlUGlja2VyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFMsIFNURmlsdGVyQ29tcG9uZW50LCBTVFRkQ29tcG9uZW50XSxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBTVE1vZHVsZSB7fVxuIl19