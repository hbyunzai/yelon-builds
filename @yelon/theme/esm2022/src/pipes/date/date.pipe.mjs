import { Pipe, inject } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import { formatDate } from '@yelon/util/date-time';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import * as i0 from "@angular/core";
export class DatePipe {
    constructor() {
        this.nzI18n = inject(NzI18nService);
        this.cog = inject(YunzaiConfigService).get('themePipe');
    }
    transform(value, formatString) {
        const formatStr = formatString ?? this.cog?.dateFormat ?? 'yyyy-MM-dd HH:mm';
        return formatDate(value, formatStr, {
            locale: this.nzI18n.getDateLocale(),
            customFormat: this.cog?.dateFormatCustom
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.11", ngImport: i0, type: DatePipe, isStandalone: true, name: "_date" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{ name: '_date', standalone: true }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3BpcGVzL2RhdGUvZGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUduRCxNQUFNLE9BQU8sUUFBUTtJQURyQjtRQUVVLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsUUFBRyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQVU1RDtJQVJDLFNBQVMsQ0FBQyxLQUE2QixFQUFFLFlBQTRCO1FBQ25FLE1BQU0sU0FBUyxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsSUFBSSxrQkFBa0IsQ0FBQztRQUU3RSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUNuQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0I7U0FDekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0FYVSxRQUFROzZHQUFSLFFBQVE7OzRGQUFSLFFBQVE7a0JBRHBCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnQHllbG9uL3V0aWwvZGF0ZS10aW1lJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5AUGlwZSh7IG5hbWU6ICdfZGF0ZScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIG56STE4biA9IGluamVjdChOekkxOG5TZXJ2aWNlKTtcbiAgcHJpdmF0ZSBjb2cgPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSkuZ2V0KCd0aGVtZVBpcGUnKTtcblxuICB0cmFuc2Zvcm0odmFsdWU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIsIGZvcm1hdFN0cmluZz86IHN0cmluZyB8IG51bGwpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZvcm1hdFN0ciA9IGZvcm1hdFN0cmluZyA/PyB0aGlzLmNvZz8uZGF0ZUZvcm1hdCA/PyAneXl5eS1NTS1kZCBISDptbSc7XG5cbiAgICByZXR1cm4gZm9ybWF0RGF0ZSh2YWx1ZSwgZm9ybWF0U3RyLCB7XG4gICAgICBsb2NhbGU6IHRoaXMubnpJMThuLmdldERhdGVMb2NhbGUoKSxcbiAgICAgIGN1c3RvbUZvcm1hdDogdGhpcy5jb2c/LmRhdGVGb3JtYXRDdXN0b21cbiAgICB9KTtcbiAgfVxufVxuIl19