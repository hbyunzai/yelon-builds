import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { filter, map } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { SettingsService } from '../settings/settings.service';
import * as i0 from "@angular/core";
export const HTML_DIR = 'dir';
export const RTL_DIRECTION = 'direction';
export const RTL_NZ_COMPONENTS = ['modal', 'drawer', 'message', 'notification', 'image'];
export const RTL_YELON_COMPONENTS = ['loading', 'onboarding'];
export const LTR = 'ltr';
export const RTL = 'rtl';
export class RTLService {
    /**
     * Get or Set the current text direction
     *
     * 获取或设置当前文字方向
     */
    get dir() {
        return this._dir;
    }
    set dir(value) {
        this._dir = value;
        this.updateLibConfig();
        this.updateHtml();
        // Should be wait inited
        Promise.resolve().then(() => {
            this.d.value = value;
            this.d.change.emit(value);
            this.srv.setLayout(RTL_DIRECTION, value);
        });
    }
    /**
     * Get the next text direction
     *
     * 获取下一次文字方向
     */
    get nextDir() {
        return this.dir === LTR ? RTL : LTR;
    }
    /**
     * Subscription change notification
     *
     * 订阅变更通知
     */
    get change() {
        return this.srv.notify.pipe(filter(w => w.name === RTL_DIRECTION), map(v => v.value));
    }
    constructor() {
        this.d = inject(Directionality);
        this.nz = inject(NzConfigService);
        this.yelon = inject(YunzaiConfigService);
        this.platform = inject(Platform);
        this.doc = inject(DOCUMENT);
        this.srv = inject(SettingsService);
        this._dir = LTR;
        this.dir = this.srv.layout.direction === RTL ? RTL : LTR;
    }
    /**
     * Toggle text direction
     *
     * 切换文字方向
     */
    toggle() {
        this.dir = this.nextDir;
    }
    updateHtml() {
        if (!this.platform.isBrowser) {
            return;
        }
        const htmlEl = this.doc.querySelector('html');
        if (htmlEl) {
            const dir = this.dir;
            htmlEl.style.direction = dir;
            htmlEl.classList.remove(RTL, LTR);
            htmlEl.classList.add(dir);
            htmlEl.setAttribute(HTML_DIR, dir);
        }
    }
    updateLibConfig() {
        RTL_NZ_COMPONENTS.forEach(name => {
            this.nz.set(name, { nzDirection: this.dir });
        });
        RTL_YELON_COMPONENTS.forEach(name => {
            this.yelon.set(name, { direction: this.dir });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: RTLService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: RTLService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: RTLService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvcnRsL3J0bC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBYyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRS9ELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDOUIsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQztBQUN6QyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6RixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM5RCxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFHekIsTUFBTSxPQUFPLFVBQVU7SUFTckI7Ozs7T0FJRztJQUNILElBQUksR0FBRztRQUNMLE9BQU8s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QUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNILG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFpQixFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0FwRlUsVUFBVTtrSEFBVixVQUFVLGNBREcsTUFBTTs7MkZBQ25CLFVBQVU7a0JBRHRCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vc2V0dGluZ3Mvc2V0dGluZ3Muc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBIVE1MX0RJUiA9ICdkaXInO1xuZXhwb3J0IGNvbnN0IFJUTF9ESVJFQ1RJT04gPSAnZGlyZWN0aW9uJztcbmV4cG9ydCBjb25zdCBSVExfTlpfQ09NUE9ORU5UUyA9IFsnbW9kYWwnLCAnZHJhd2VyJywgJ21lc3NhZ2UnLCAnbm90aWZpY2F0aW9uJywgJ2ltYWdlJ107XG5leHBvcnQgY29uc3QgUlRMX1lFTE9OX0NPTVBPTkVOVFMgPSBbJ2xvYWRpbmcnLCAnb25ib2FyZGluZyddO1xuZXhwb3J0IGNvbnN0IExUUiA9ICdsdHInO1xuZXhwb3J0IGNvbnN0IFJUTCA9ICdydGwnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFJUTFNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGQgPSBpbmplY3QoRGlyZWN0aW9uYWxpdHkpO1xuICBwcml2YXRlIHJlYWRvbmx5IG56ID0gaW5qZWN0KE56Q29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgeWVsb24gPSBpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm0gPSBpbmplY3QoUGxhdGZvcm0pO1xuICBwcml2YXRlIHJlYWRvbmx5IGRvYyA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3J2ID0gaW5qZWN0KFNldHRpbmdzU2VydmljZSk7XG5cbiAgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb24gPSBMVFI7XG4gIC8qKlxuICAgKiBHZXQgb3IgU2V0IHRoZSBjdXJyZW50IHRleHQgZGlyZWN0aW9uXG4gICAqXG4gICAqIOiOt+WPluaIluiuvue9ruW9k+WJjeaWh+Wtl+aWueWQkVxuICAgKi9cbiAgZ2V0IGRpcigpOiBEaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kaXI7XG4gIH1cbiAgc2V0IGRpcih2YWx1ZTogRGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fZGlyID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVMaWJDb25maWcoKTtcbiAgICB0aGlzLnVwZGF0ZUh0bWwoKTtcbiAgICAvLyBTaG91bGQgYmUgd2FpdCBpbml0ZWRcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICh0aGlzLmQgYXMgTnpTYWZlQW55KS52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5kLmNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIHRoaXMuc3J2LnNldExheW91dChSVExfRElSRUNUSU9OLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuZXh0IHRleHQgZGlyZWN0aW9uXG4gICAqXG4gICAqIOiOt+WPluS4i+S4gOasoeaWh+Wtl+aWueWQkVxuICAgKi9cbiAgZ2V0IG5leHREaXIoKTogRGlyZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kaXIgPT09IExUUiA/IFJUTCA6IExUUjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gY2hhbmdlIG5vdGlmaWNhdGlvblxuICAgKlxuICAgKiDorqLpmIXlj5jmm7TpgJrnn6VcbiAgICovXG4gIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxEaXJlY3Rpb24+IHtcbiAgICByZXR1cm4gdGhpcy5zcnYubm90aWZ5LnBpcGUoXG4gICAgICBmaWx0ZXIodyA9PiB3Lm5hbWUgPT09IFJUTF9ESVJFQ1RJT04pLFxuICAgICAgbWFwKHYgPT4gdi52YWx1ZSlcbiAgICApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLnNydi5sYXlvdXQuZGlyZWN0aW9uID09PSBSVEwgPyBSVEwgOiBMVFI7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRleHQgZGlyZWN0aW9uXG4gICAqXG4gICAqIOWIh+aNouaWh+Wtl+aWueWQkVxuICAgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5uZXh0RGlyO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVIdG1sKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaHRtbEVsID0gdGhpcy5kb2MucXVlcnlTZWxlY3RvcignaHRtbCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChodG1sRWwpIHtcbiAgICAgIGNvbnN0IGRpciA9IHRoaXMuZGlyO1xuICAgICAgaHRtbEVsLnN0eWxlLmRpcmVjdGlvbiA9IGRpcjtcbiAgICAgIGh0bWxFbC5jbGFzc0xpc3QucmVtb3ZlKFJUTCwgTFRSKTtcbiAgICAgIGh0bWxFbC5jbGFzc0xpc3QuYWRkKGRpcik7XG4gICAgICBodG1sRWwuc2V0QXR0cmlidXRlKEhUTUxfRElSLCBkaXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTGliQ29uZmlnKCk6IHZvaWQge1xuICAgIFJUTF9OWl9DT01QT05FTlRTLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICB0aGlzLm56LnNldChuYW1lIGFzIE56U2FmZUFueSwgeyBuekRpcmVjdGlvbjogdGhpcy5kaXIgfSk7XG4gICAgfSk7XG4gICAgUlRMX1lFTE9OX0NPTVBPTkVOVFMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIHRoaXMueWVsb24uc2V0KG5hbWUgYXMgTnpTYWZlQW55LCB7IGRpcmVjdGlvbjogdGhpcy5kaXIgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==