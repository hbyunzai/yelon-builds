import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YelonLocaleModule } from '@yelon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ExceptionComponent } from './exception.component';
import * as i0 from "@angular/core";
const COMPONENTS = [ExceptionComponent];
export class ExceptionModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: ExceptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.0", ngImport: i0, type: ExceptionModule, imports: [CommonModule, ObserversModule, RouterModule, YelonLocaleModule, NzButtonModule, ExceptionComponent], exports: [ExceptionComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: ExceptionModule, imports: [CommonModule, ObserversModule, RouterModule, YelonLocaleModule, NzButtonModule, COMPONENTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: ExceptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ObserversModule, RouterModule, YelonLocaleModule, NzButtonModule, ...COMPONENTS],
                    exports: COMPONENTS
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9leGNlcHRpb24vZXhjZXB0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTNELE1BQU0sVUFBVSxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQU14QyxNQUFNLE9BQU8sZUFBZTs4R0FBZixlQUFlOytHQUFmLGVBQWUsWUFIaEIsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUh0RSxrQkFBa0IsYUFBbEIsa0JBQWtCOytHQU16QixlQUFlLFlBSGhCLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBSyxVQUFVOzsyRkFHNUYsZUFBZTtrQkFKM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsR0FBRyxVQUFVLENBQUM7b0JBQ3hHLE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmVyc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBZZWxvbkxvY2FsZU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnV0dG9uJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9leGNlcHRpb24uY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtFeGNlcHRpb25Db21wb25lbnRdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPYnNlcnZlcnNNb2R1bGUsIFJvdXRlck1vZHVsZSwgWWVsb25Mb2NhbGVNb2R1bGUsIE56QnV0dG9uTW9kdWxlLCAuLi5DT01QT05FTlRTXSxcbiAgZXhwb3J0czogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBFeGNlcHRpb25Nb2R1bGUge31cbiJdfQ==