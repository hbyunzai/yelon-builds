import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { YelonLocaleModule } from '@yelon/theme';
import { G2MiniProgressComponent } from './mini-progress.component';
import * as i0 from "@angular/core";
const COMPONENTS = [G2MiniProgressComponent];
export class G2MiniProgressModule {
}
G2MiniProgressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: G2MiniProgressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
G2MiniProgressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: G2MiniProgressModule, declarations: [G2MiniProgressComponent], imports: [CommonModule, YelonLocaleModule, NzToolTipModule], exports: [G2MiniProgressComponent] });
G2MiniProgressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: G2MiniProgressModule, imports: [[CommonModule, YelonLocaleModule, NzToolTipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: G2MiniProgressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, YelonLocaleModule, NzToolTipModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1wcm9ncmVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jaGFydC9taW5pLXByb2dyZXNzL21pbmktcHJvZ3Jlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRXBFLE1BQU0sVUFBVSxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQU83QyxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsaUJBUGIsdUJBQXVCLGFBRy9CLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLGFBSHhDLHVCQUF1QjtrSEFPOUIsb0JBQW9CLFlBSnRCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQzsyRkFJaEQsb0JBQW9CO2tCQUxoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLENBQUM7b0JBQzNELFlBQVksRUFBRSxVQUFVO29CQUN4QixPQUFPLEVBQUUsVUFBVTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpUb29sVGlwTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuaW1wb3J0IHsgWWVsb25Mb2NhbGVNb2R1bGUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuXG5pbXBvcnQgeyBHMk1pbmlQcm9ncmVzc0NvbXBvbmVudCB9IGZyb20gJy4vbWluaS1wcm9ncmVzcy5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW0cyTWluaVByb2dyZXNzQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgWWVsb25Mb2NhbGVNb2R1bGUsIE56VG9vbFRpcE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UUyxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBHMk1pbmlQcm9ncmVzc01vZHVsZSB7fVxuIl19