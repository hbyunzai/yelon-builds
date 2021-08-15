import { Component, ViewChild } from '@angular/core';
export class RangePickerShortcutTplComponent {
    constructor() {
        this.list = [];
    }
    click(_) { }
}
RangePickerShortcutTplComponent.decorators = [
    { type: Component, args: [{
                selector: '',
                template: `
    <ng-template #tpl>
      <a
        *ngFor="let i of list; let first = first"
        (click)="click(i)"
        [innerHTML]="i._text"
        [ngClass]="{ 'ml-sm': !first }"
      ></a>
    </ng-template>
  `
            },] }
];
RangePickerShortcutTplComponent.propDecorators = {
    tpl: [{ type: ViewChild, args: ['tpl', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2hvcnRjdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2RhdGUtcGlja2VyL3JhbmdlLXNob3J0Y3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFlLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlCbEUsTUFBTSxPQUFPLCtCQUErQjtJQWI1QztRQWlCRSxTQUFJLEdBQXdDLEVBQUUsQ0FBQztJQUdqRCxDQUFDO0lBREMsS0FBSyxDQUFDLENBQW9DLElBQVMsQ0FBQzs7O1lBbkJyRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDthQUNGOzs7a0JBRUUsU0FBUyxTQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXRJdGVtIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3RwbD5cbiAgICAgIDxhXG4gICAgICAgICpuZ0Zvcj1cImxldCBpIG9mIGxpc3Q7IGxldCBmaXJzdCA9IGZpcnN0XCJcbiAgICAgICAgKGNsaWNrKT1cImNsaWNrKGkpXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJpLl90ZXh0XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnbWwtc20nOiAhZmlyc3QgfVwiXG4gICAgICA+PC9hPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VQaWNrZXJTaG9ydGN1dFRwbENvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ3RwbCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHRwbCE6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIGxpc3Q6IFl1bnphaURhdGVSYW5nZVBpY2tlclNob3J0Y3V0SXRlbVtdID0gW107XG5cbiAgY2xpY2soXzogWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXRJdGVtKTogdm9pZCB7fVxufVxuIl19