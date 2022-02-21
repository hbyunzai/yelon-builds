import { Pipe } from '@angular/core';
import { format, formatDistanceToNow } from 'date-fns';
import { toDate } from '@yelon/util/date-time';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
export class DatePipe {
    constructor(nzI18n) {
        this.nzI18n = nzI18n;
    }
    transform(value, formatString = 'yyyy-MM-dd HH:mm') {
        value = toDate(value);
        if (isNaN(value))
            return '';
        const langOpt = { locale: this.nzI18n.getDateLocale() };
        return formatString === 'fn' ? formatDistanceToNow(value, langOpt) : format(value, formatString, langOpt);
    }
}
DatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: DatePipe, deps: [{ token: i1.NzI18nService }], target: i0.ɵɵFactoryTarget.Pipe });
DatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: DatePipe, name: "_date" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{ name: '_date' }]
        }], ctorParameters: function () { return [{ type: i1.NzI18nService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3BpcGVzL2RhdGUvZGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFLdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFHL0MsTUFBTSxPQUFPLFFBQVE7SUFDbkIsWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFFN0MsU0FBUyxDQUFDLEtBQTZCLEVBQUUsZUFBdUIsa0JBQWtCO1FBQ2hGLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsSUFBSSxLQUFLLENBQUMsS0FBa0IsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXpDLE1BQU0sT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztRQUN4RCxPQUFPLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUcsQ0FBQzs7cUdBVFUsUUFBUTttR0FBUixRQUFROzJGQUFSLFFBQVE7a0JBRHBCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBmb3JtYXQsIGZvcm1hdERpc3RhbmNlVG9Ob3cgfSBmcm9tICdkYXRlLWZucyc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tICdAeWVsb24vdXRpbC9kYXRlLXRpbWUnO1xuXG5AUGlwZSh7IG5hbWU6ICdfZGF0ZScgfSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG56STE4bjogTnpJMThuU2VydmljZSkge31cblxuICB0cmFuc2Zvcm0odmFsdWU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIsIGZvcm1hdFN0cmluZzogc3RyaW5nID0gJ3l5eXktTU0tZGQgSEg6bW0nKTogc3RyaW5nIHtcbiAgICB2YWx1ZSA9IHRvRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKGlzTmFOKHZhbHVlIGFzIE56U2FmZUFueSkpIHJldHVybiAnJztcblxuICAgIGNvbnN0IGxhbmdPcHQgPSB7IGxvY2FsZTogdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpIH07XG4gICAgcmV0dXJuIGZvcm1hdFN0cmluZyA9PT0gJ2ZuJyA/IGZvcm1hdERpc3RhbmNlVG9Ob3codmFsdWUsIGxhbmdPcHQpIDogZm9ybWF0KHZhbHVlLCBmb3JtYXRTdHJpbmcsIGxhbmdPcHQpO1xuICB9XG59XG4iXX0=