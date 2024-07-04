import { Pipe, inject } from '@angular/core';
import { YunzaiConfigService } from '@yelon/util/config';
import { formatDate } from '@yelon/util/date-time';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import * as i0 from "@angular/core";
export class DatePipe {
    constructor() {
        this.nzI18n = inject(NzI18nService);
        this.defFormat = inject(YunzaiConfigService).get('themePipe')?.dateFormat ?? 'yyyy-MM-dd HH:mm';
    }
    transform(value, formatString) {
        return formatDate(value, formatString ?? this.defFormat, this.nzI18n.getDateLocale());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: DatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: DatePipe, isStandalone: true, name: "_date" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{ name: '_date', standalone: true }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3BpcGVzL2RhdGUvZGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUduRCxNQUFNLE9BQU8sUUFBUTtJQURyQjtRQUVVLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsY0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxVQUFVLElBQUksa0JBQWtCLENBQUM7S0FLcEc7SUFIQyxTQUFTLENBQUMsS0FBNkIsRUFBRSxZQUE0QjtRQUNuRSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7OEdBTlUsUUFBUTs0R0FBUixRQUFROzsyRkFBUixRQUFRO2tCQURwQixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2RhdGUtdGltZSc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuQFBpcGUoeyBuYW1lOiAnX2RhdGUnLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHJpdmF0ZSBuekkxOG4gPSBpbmplY3QoTnpJMThuU2VydmljZSk7XG4gIHByaXZhdGUgZGVmRm9ybWF0ID0gaW5qZWN0KFl1bnphaUNvbmZpZ1NlcnZpY2UpLmdldCgndGhlbWVQaXBlJyk/LmRhdGVGb3JtYXQgPz8gJ3l5eXktTU0tZGQgSEg6bW0nO1xuXG4gIHRyYW5zZm9ybSh2YWx1ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciwgZm9ybWF0U3RyaW5nPzogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdERhdGUodmFsdWUsIGZvcm1hdFN0cmluZyA/PyB0aGlzLmRlZkZvcm1hdCwgdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpKTtcbiAgfVxufVxuIl19