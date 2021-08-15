import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { deepMerge } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/drawer";
/**
 * 抽屉辅助类
 *
 * **注意：** 构建结果都可被订阅，但永远都不会触发 `observer.error`
 *
 * @example
 * this.drawerHelper.create('Edit', FormEditComponent, { i }).subscribe(res => this.load());
 * // 对于组件的成功&关闭的处理说明
 * // 成功
 * this.NzDrawerRef.close(data);
 * this.NzDrawerRef.close(true);
 * // 关闭
 * this.NzDrawerRef.close();
 * this.NzDrawerRef.close(false);
 */
export class DrawerHelper {
    constructor(srv) {
        this.srv = srv;
    }
    /**
     * 构建一个抽屉
     */
    create(title, comp, params, options) {
        options = deepMerge({
            size: 'md',
            footer: true,
            footerHeight: 50,
            exact: true,
            drawerOptions: {
                nzPlacement: 'right',
                nzWrapClassName: ''
            }
        }, options);
        return new Observable((observer) => {
            const { size, footer, footerHeight, drawerOptions } = options;
            const defaultOptions = {
                nzContent: comp,
                nzContentParams: params,
                nzTitle: title
            };
            if (typeof size === 'number') {
                defaultOptions[drawerOptions.nzPlacement === 'top' || drawerOptions.nzPlacement === 'bottom' ? 'nzHeight' : 'nzWidth'] = options.size;
            }
            else if (!drawerOptions.nzWidth) {
                defaultOptions.nzWrapClassName = `${drawerOptions.nzWrapClassName} drawer-${options.size}`.trim();
                delete drawerOptions.nzWrapClassName;
            }
            if (footer) {
                // The 24 value is @drawer-body-padding
                defaultOptions.nzBodyStyle = {
                    'padding-bottom.px': footerHeight + 24
                };
            }
            const subject = this.srv.create(Object.assign(Object.assign({}, defaultOptions), drawerOptions));
            const afterClose$ = subject.afterClose.subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                afterClose$.unsubscribe();
            });
        });
    }
    /**
     * 构建一个抽屉，点击蒙层不允许关闭
     */
    static(title, comp, params, options) {
        const drawerOptions = Object.assign({ nzMaskClosable: false }, (options && options.drawerOptions));
        return this.create(title, comp, params, Object.assign(Object.assign({}, options), { drawerOptions }));
    }
}
DrawerHelper.ɵprov = i0.ɵɵdefineInjectable({ factory: function DrawerHelper_Factory() { return new DrawerHelper(i0.ɵɵinject(i1.NzDrawerService)); }, token: DrawerHelper, providedIn: "root" });
DrawerHelper.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
DrawerHelper.ctorParameters = () => [
    { type: NzDrawerService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9kcmF3ZXIvZHJhd2VyLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBZ0MsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFckYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUE4QjlDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBb0IsR0FBb0I7UUFBcEIsUUFBRyxHQUFILEdBQUcsQ0FBaUI7SUFBRyxDQUFDO0lBRTVDOztPQUVHO0lBQ0gsTUFBTSxDQUNKLEtBQXlELEVBQ3pELElBS21CLEVBQ25CLE1BQWtCLEVBQ2xCLE9BQTZCO1FBRTdCLE9BQU8sR0FBRyxTQUFTLENBQ2pCO1lBQ0UsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFlBQVksRUFBRSxFQUFFO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsYUFBYSxFQUFFO2dCQUNiLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixlQUFlLEVBQUUsRUFBRTthQUNwQjtTQUNGLEVBQ0QsT0FBTyxDQUNSLENBQUM7UUFDRixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsUUFBNkIsRUFBRSxFQUFFO1lBQ3RELE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUE4QixDQUFDO1lBQ3JGLE1BQU0sY0FBYyxHQUFvQjtnQkFDdEMsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLE9BQU8sRUFBRSxLQUFrQjthQUM1QixDQUFDO1lBRUYsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLGNBQWMsQ0FDWixhQUFjLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxhQUFjLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3pHLEdBQUcsT0FBUSxDQUFDLElBQUksQ0FBQzthQUNuQjtpQkFBTSxJQUFJLENBQUMsYUFBYyxDQUFDLE9BQU8sRUFBRTtnQkFDbEMsY0FBYyxDQUFDLGVBQWUsR0FBRyxHQUFHLGFBQWMsQ0FBQyxlQUFlLFdBQVcsT0FBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwRyxPQUFPLGFBQWMsQ0FBQyxlQUFlLENBQUM7YUFDdkM7WUFFRCxJQUFJLE1BQU0sRUFBRTtnQkFDVix1Q0FBdUM7Z0JBQ3ZDLGNBQWMsQ0FBQyxXQUFXLEdBQUc7b0JBQzNCLG1CQUFtQixFQUFFLFlBQWEsR0FBRyxFQUFFO2lCQUN4QyxDQUFDO2FBQ0g7WUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0saUNBQU0sY0FBYyxHQUFLLGFBQWEsRUFBRyxDQUFDO1lBQ3pFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBYyxFQUFFLEVBQUU7Z0JBQ2xFLElBQUksT0FBUSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQzNCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTt3QkFDZixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDRjtxQkFBTTtvQkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQjtnQkFDRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUNKLEtBQXlELEVBQ3pELElBS21CLEVBQ25CLE1BQWtCLEVBQ2xCLE9BQTZCO1FBRTdCLE1BQU0sYUFBYSxtQkFDakIsY0FBYyxFQUFFLEtBQUssSUFDbEIsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUN0QyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxrQ0FBTyxPQUFPLEtBQUUsYUFBYSxJQUFHLENBQUM7SUFDekUsQ0FBQzs7OztZQXpGRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUEvQ0ssZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekRyYXdlck9wdGlvbnMsIE56RHJhd2VyUmVmLCBOekRyYXdlclNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2RyYXdlcic7XG5cbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBEcmF3ZXJIZWxwZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIOWkp+Wwj++8jOiLpeWAvOS4uuaVsOWAvOexu+Wei++8jOWImeagueaNriBgbnpQbGFjZW1lbnRgIOiHquWKqOi9rOWMluS4uiBgbnpIZWlnaHRgIOaIliBgbnpXaWR0aGDvvJvkvovlpoLvvJpsZ+OAgTYwMO+8jOm7mOiupO+8mmBtZGBcbiAgICpcbiAgICogfCDnsbvlnosgfCDpu5jorqTlpKflsI8gfFxuICAgKiB8IC0tLSB8IC0tLS0tLSB8XG4gICAqIHwgYHNtYCB8IGAzMDBgIHxcbiAgICogfCBgbWRgIHwgYDYwMGAgfFxuICAgKiB8IGBsZ2AgfCBgOTAwYCB8XG4gICAqIHwgYHhsYCB8IGAxMjAwYCB8XG4gICAqXG4gICAqID4g5Lul5LiK5YC877yM5Y+v6YCa6L+H6KaG55uW55u45bqU55qETEVTU+WPguaVsOiHquihjOiwg+aVtFxuICAgKi9cbiAgc2l6ZT86ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCcgfCBudW1iZXI7XG4gIC8qKlxuICAgKiDmmK/lkKbljIXlkKvlupXpg6jlt6XlhbfmnaHvvIzpu5jorqTvvJpgdHJ1ZWBcbiAgICovXG4gIGZvb3Rlcj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiDlupXpg6jlt6XlhbfmnaHpq5jluqbvvIzpu5jorqTvvJpgNTVgXG4gICAqL1xuICBmb290ZXJIZWlnaHQ/OiBudW1iZXI7XG4gIC8qKiDmmK/lkKbnsr7lh4bvvIjpu5jorqTvvJpgdHJ1ZWDvvInvvIzoi6Xov5Tlm57lgLzpnZ7nqbrlgLzvvIhgbnVsbGDmiJZgdW5kZWZpbmVkYO+8ieinhuS4uuaIkOWKn++8jOWQpuWImeinhuS4uumUmeivryAqL1xuICBleGFjdD86IGJvb2xlYW47XG4gIC8qKiDmir3lsYkgW056RHJhd2VyT3B0aW9uc10oaHR0cHM6Ly9uZy5hbnQuZGVzaWduL2NvbXBvbmVudHMvZHJhd2VyL3poI256ZHJhd2Vyb3B0aW9ucykg5Y+C5pWwICovXG4gIGRyYXdlck9wdGlvbnM/OiBOekRyYXdlck9wdGlvbnM7XG59XG5cbi8qKlxuICog5oq95bGJ6L6F5Yqp57G7XG4gKlxuICogKirms6jmhI/vvJoqKiDmnoTlu7rnu5Pmnpzpg73lj6/ooqvorqLpmIXvvIzkvYbmsLjov5zpg73kuI3kvJrop6blj5EgYG9ic2VydmVyLmVycm9yYFxuICpcbiAqIEBleGFtcGxlXG4gKiB0aGlzLmRyYXdlckhlbHBlci5jcmVhdGUoJ0VkaXQnLCBGb3JtRWRpdENvbXBvbmVudCwgeyBpIH0pLnN1YnNjcmliZShyZXMgPT4gdGhpcy5sb2FkKCkpO1xuICogLy8g5a+55LqO57uE5Lu255qE5oiQ5YqfJuWFs+mXreeahOWkhOeQhuivtOaYjlxuICogLy8g5oiQ5YqfXG4gKiB0aGlzLk56RHJhd2VyUmVmLmNsb3NlKGRhdGEpO1xuICogdGhpcy5OekRyYXdlclJlZi5jbG9zZSh0cnVlKTtcbiAqIC8vIOWFs+mXrVxuICogdGhpcy5OekRyYXdlclJlZi5jbG9zZSgpO1xuICogdGhpcy5OekRyYXdlclJlZi5jbG9zZShmYWxzZSk7XG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRHJhd2VySGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzcnY6IE56RHJhd2VyU2VydmljZSkge31cblxuICAvKipcbiAgICog5p6E5bu65LiA5Liq5oq95bGJXG4gICAqL1xuICBjcmVhdGUoXG4gICAgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCB1bmRlZmluZWQgfCBudWxsLFxuICAgIGNvbXA6XG4gICAgICB8IFRlbXBsYXRlUmVmPHtcbiAgICAgICAgICAkaW1wbGljaXQ6IE56U2FmZUFueTtcbiAgICAgICAgICBkcmF3ZXJSZWY6IE56RHJhd2VyUmVmO1xuICAgICAgICB9PlxuICAgICAgfCBUeXBlPE56U2FmZUFueT4sXG4gICAgcGFyYW1zPzogTnpTYWZlQW55LFxuICAgIG9wdGlvbnM/OiBEcmF3ZXJIZWxwZXJPcHRpb25zXG4gICk6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gICAgb3B0aW9ucyA9IGRlZXBNZXJnZShcbiAgICAgIHtcbiAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICBmb290ZXJIZWlnaHQ6IDUwLFxuICAgICAgICBleGFjdDogdHJ1ZSxcbiAgICAgICAgZHJhd2VyT3B0aW9uczoge1xuICAgICAgICAgIG56UGxhY2VtZW50OiAncmlnaHQnLFxuICAgICAgICAgIG56V3JhcENsYXNzTmFtZTogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPE56U2FmZUFueT4pID0+IHtcbiAgICAgIGNvbnN0IHsgc2l6ZSwgZm9vdGVyLCBmb290ZXJIZWlnaHQsIGRyYXdlck9wdGlvbnMgfSA9IG9wdGlvbnMgYXMgRHJhd2VySGVscGVyT3B0aW9ucztcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBOekRyYXdlck9wdGlvbnMgPSB7XG4gICAgICAgIG56Q29udGVudDogY29tcCxcbiAgICAgICAgbnpDb250ZW50UGFyYW1zOiBwYXJhbXMsXG4gICAgICAgIG56VGl0bGU6IHRpdGxlIGFzIE56U2FmZUFueVxuICAgICAgfTtcblxuICAgICAgaWYgKHR5cGVvZiBzaXplID09PSAnbnVtYmVyJykge1xuICAgICAgICBkZWZhdWx0T3B0aW9uc1tcbiAgICAgICAgICBkcmF3ZXJPcHRpb25zIS5uelBsYWNlbWVudCA9PT0gJ3RvcCcgfHwgZHJhd2VyT3B0aW9ucyEubnpQbGFjZW1lbnQgPT09ICdib3R0b20nID8gJ256SGVpZ2h0JyA6ICdueldpZHRoJ1xuICAgICAgICBdID0gb3B0aW9ucyEuc2l6ZTtcbiAgICAgIH0gZWxzZSBpZiAoIWRyYXdlck9wdGlvbnMhLm56V2lkdGgpIHtcbiAgICAgICAgZGVmYXVsdE9wdGlvbnMubnpXcmFwQ2xhc3NOYW1lID0gYCR7ZHJhd2VyT3B0aW9ucyEubnpXcmFwQ2xhc3NOYW1lfSBkcmF3ZXItJHtvcHRpb25zIS5zaXplfWAudHJpbSgpO1xuICAgICAgICBkZWxldGUgZHJhd2VyT3B0aW9ucyEubnpXcmFwQ2xhc3NOYW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9vdGVyKSB7XG4gICAgICAgIC8vIFRoZSAyNCB2YWx1ZSBpcyBAZHJhd2VyLWJvZHktcGFkZGluZ1xuICAgICAgICBkZWZhdWx0T3B0aW9ucy5uekJvZHlTdHlsZSA9IHtcbiAgICAgICAgICAncGFkZGluZy1ib3R0b20ucHgnOiBmb290ZXJIZWlnaHQhICsgMjRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3ViamVjdCA9IHRoaXMuc3J2LmNyZWF0ZSh7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5kcmF3ZXJPcHRpb25zIH0pO1xuICAgICAgY29uc3QgYWZ0ZXJDbG9zZSQgPSBzdWJqZWN0LmFmdGVyQ2xvc2Uuc3Vic2NyaWJlKChyZXM6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucyEuZXhhY3QgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAocmVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIGFmdGVyQ2xvc2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmnoTlu7rkuIDkuKrmir3lsYnvvIzngrnlh7vokpnlsYLkuI3lhYHorrjlhbPpl61cbiAgICovXG4gIHN0YXRpYyhcbiAgICB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHVuZGVmaW5lZCB8IG51bGwsXG4gICAgY29tcDpcbiAgICAgIHwgVGVtcGxhdGVSZWY8e1xuICAgICAgICAgICRpbXBsaWNpdDogTnpTYWZlQW55O1xuICAgICAgICAgIGRyYXdlclJlZjogTnpEcmF3ZXJSZWY7XG4gICAgICAgIH0+XG4gICAgICB8IFR5cGU8TnpTYWZlQW55PixcbiAgICBwYXJhbXM/OiBOelNhZmVBbnksXG4gICAgb3B0aW9ucz86IERyYXdlckhlbHBlck9wdGlvbnNcbiAgKTogT2JzZXJ2YWJsZTxOelNhZmVBbnk+IHtcbiAgICBjb25zdCBkcmF3ZXJPcHRpb25zID0ge1xuICAgICAgbnpNYXNrQ2xvc2FibGU6IGZhbHNlLFxuICAgICAgLi4uKG9wdGlvbnMgJiYgb3B0aW9ucy5kcmF3ZXJPcHRpb25zKVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRpdGxlLCBjb21wLCBwYXJhbXMsIHsgLi4ub3B0aW9ucywgZHJhd2VyT3B0aW9ucyB9KTtcbiAgfVxufVxuIl19