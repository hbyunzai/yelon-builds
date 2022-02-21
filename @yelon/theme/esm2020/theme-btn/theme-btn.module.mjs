import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { YUNZAI_THEME_BTN_KEYS, ThemeBtnComponent } from './theme-btn.component';
import * as i0 from "@angular/core";
const COMPONENTS = [ThemeBtnComponent];
export class ThemeBtnModule {
}
ThemeBtnModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ThemeBtnModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ThemeBtnModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ThemeBtnModule, declarations: [ThemeBtnComponent], imports: [CommonModule, NzDropDownModule, NzToolTipModule], exports: [ThemeBtnComponent] });
ThemeBtnModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ThemeBtnModule, providers: [
        {
            provide: YUNZAI_THEME_BTN_KEYS,
            useValue: 'site-theme'
        }
    ], imports: [[CommonModule, NzDropDownModule, NzToolTipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ThemeBtnModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzDropDownModule, NzToolTipModule],
                    providers: [
                        {
                            provide: YUNZAI_THEME_BTN_KEYS,
                            useValue: 'site-theme'
                        }
                    ],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnRuLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3RoZW1lLWJ0bi90aGVtZS1idG4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFakYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBYXZDLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBYlAsaUJBQWlCLGFBR3pCLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLGFBSHZDLGlCQUFpQjs0R0FheEIsY0FBYyxhQVRkO1FBQ1Q7WUFDRSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFFBQVEsRUFBRSxZQUFZO1NBQ3ZCO0tBQ0YsWUFOUSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7MkZBVS9DLGNBQWM7a0JBWDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQztvQkFDMUQsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFFBQVEsRUFBRSxZQUFZO3lCQUN2QjtxQkFDRjtvQkFDRCxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsT0FBTyxFQUFFLFVBQVU7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcbmltcG9ydCB7IE56VG9vbFRpcE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5cbmltcG9ydCB7IFlVTlpBSV9USEVNRV9CVE5fS0VZUywgVGhlbWVCdG5Db21wb25lbnQgfSBmcm9tICcuL3RoZW1lLWJ0bi5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1RoZW1lQnRuQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTnpEcm9wRG93bk1vZHVsZSwgTnpUb29sVGlwTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogWVVOWkFJX1RIRU1FX0JUTl9LRVlTLFxuICAgICAgdXNlVmFsdWU6ICdzaXRlLXRoZW1lJ1xuICAgIH1cbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIFRoZW1lQnRuTW9kdWxlIHt9XG4iXX0=