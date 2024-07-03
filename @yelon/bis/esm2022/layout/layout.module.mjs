import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '@yelon/theme';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { YunzaiLayoutBasicComponent } from './layout-basic.component';
import { YunzaiLayoutNavGroupComponent } from './layout-nav-group.component';
import { YunzaiLayoutNavTileComponent } from './layout-nav-tile.component';
import * as i0 from "@angular/core";
const COMPONENTS = [YunzaiLayoutNavTileComponent, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent];
export class YunzaiLayoutModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.5", ngImport: i0, type: YunzaiLayoutModule, imports: [I18nPipe,
            FormsModule,
            NzFormModule,
            NzInputModule,
            CommonModule,
            NzGridModule,
            NzIconModule,
            NzDropDownModule,
            NzTabsModule, YunzaiLayoutNavTileComponent, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent], exports: [YunzaiLayoutNavTileComponent, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiLayoutModule, imports: [FormsModule,
            NzFormModule,
            NzInputModule,
            CommonModule,
            NzGridModule,
            NzIconModule,
            NzDropDownModule,
            NzTabsModule, YunzaiLayoutNavGroupComponent, YunzaiLayoutBasicComponent] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        I18nPipe,
                        FormsModule,
                        NzFormModule,
                        NzInputModule,
                        CommonModule,
                        NzGridModule,
                        NzIconModule,
                        NzDropDownModule,
                        NzTabsModule,
                        ...COMPONENTS
                    ],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvbGF5b3V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUUzRSxNQUFNLFVBQVUsR0FBRyxDQUFDLDRCQUE0QixFQUFFLDZCQUE2QixFQUFFLDBCQUEwQixDQUFDLENBQUM7QUFpQjdHLE1BQU0sT0FBTyxrQkFBa0I7OEdBQWxCLGtCQUFrQjsrR0FBbEIsa0JBQWtCLFlBYjNCLFFBQVE7WUFDUixXQUFXO1lBQ1gsWUFBWTtZQUNaLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsWUFBWSxFQVpJLDRCQUE0QixFQUFFLDZCQUE2QixFQUFFLDBCQUEwQixhQUF2Riw0QkFBNEIsRUFBRSw2QkFBNkIsRUFBRSwwQkFBMEI7K0dBaUI5RixrQkFBa0IsWUFaM0IsV0FBVztZQUNYLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLFlBQVksRUFaa0MsNkJBQTZCLEVBQUUsMEJBQTBCOzsyRkFpQjlGLGtCQUFrQjtrQkFmOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsUUFBUTt3QkFDUixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osR0FBRyxVQUFVO3FCQUNkO29CQUNELE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEkxOG5QaXBlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56Rm9ybU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZm9ybSc7XG5pbXBvcnQgeyBOekdyaWRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2dyaWQnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcbmltcG9ydCB7IE56VGFic01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdGFicyc7XG5cbmltcG9ydCB7IFl1bnphaUxheW91dEJhc2ljQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtYmFzaWMuY29tcG9uZW50JztcbmltcG9ydCB7IFl1bnphaUxheW91dE5hdkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtbmF2LWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZdW56YWlMYXlvdXROYXZUaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQtbmF2LXRpbGUuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtZdW56YWlMYXlvdXROYXZUaWxlQ29tcG9uZW50LCBZdW56YWlMYXlvdXROYXZHcm91cENvbXBvbmVudCwgWXVuemFpTGF5b3V0QmFzaWNDb21wb25lbnRdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSTE4blBpcGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTnpGb3JtTW9kdWxlLFxuICAgIE56SW5wdXRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE56R3JpZE1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpEcm9wRG93bk1vZHVsZSxcbiAgICBOelRhYnNNb2R1bGUsXG4gICAgLi4uQ09NUE9ORU5UU1xuICBdLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaUxheW91dE1vZHVsZSB7fVxuIl19