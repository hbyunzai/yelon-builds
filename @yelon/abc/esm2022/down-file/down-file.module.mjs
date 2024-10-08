import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YunzaiThemeModule } from '@yelon/theme';
import { DownFileDirective } from './down-file.directive';
import * as i0 from "@angular/core";
const DIRECTIVES = [DownFileDirective];
export class DownFileModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: DownFileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: DownFileModule, imports: [CommonModule, YunzaiThemeModule, DownFileDirective], exports: [DownFileDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: DownFileModule, imports: [CommonModule, YunzaiThemeModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: DownFileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, YunzaiThemeModule, ...DIRECTIVES],
                    exports: DIRECTIVES
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bi1maWxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9kb3duLWZpbGUvZG93bi1maWxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTFELE1BQU0sVUFBVSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQU12QyxNQUFNLE9BQU8sY0FBYzs4R0FBZCxjQUFjOytHQUFkLGNBQWMsWUFIZixZQUFZLEVBQUUsaUJBQWlCLEVBSHZCLGlCQUFpQixhQUFqQixpQkFBaUI7K0dBTXhCLGNBQWMsWUFIZixZQUFZLEVBQUUsaUJBQWlCOzsyRkFHOUIsY0FBYztrQkFKMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxVQUFVLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxVQUFVO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZdW56YWlUaGVtZU1vZHVsZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5cbmltcG9ydCB7IERvd25GaWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kb3duLWZpbGUuZGlyZWN0aXZlJztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtEb3duRmlsZURpcmVjdGl2ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFl1bnphaVRoZW1lTW9kdWxlLCAuLi5ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogRElSRUNUSVZFU1xufSlcbmV4cG9ydCBjbGFzcyBEb3duRmlsZU1vZHVsZSB7fVxuIl19