import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import zhCN from './languages/zh-CN';
import { YELON_LOCALE } from './locale.tokens';
import * as i0 from "@angular/core";
export class YelonLocaleService {
    constructor(locale) {
        this._locale = zhCN;
        this.change$ = new BehaviorSubject(this._locale);
        this.setLocale(locale || zhCN);
    }
    get change() {
        return this.change$.asObservable();
    }
    setLocale(locale) {
        if (this._locale && this._locale.abbr === locale.abbr) {
            return;
        }
        this._locale = locale;
        this.change$.next(locale);
    }
    get locale() {
        return this._locale;
    }
    getData(path) {
        return (this._locale[path] || {});
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleService, deps: [{ token: YELON_LOCALE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: YelonLocaleService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [YELON_LOCALE]
                }] }] });
export function YELON_LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale) {
    return exist || new YelonLocaleService(locale);
}
export const YELON_LOCALE_SERVICE_PROVIDER = {
    provide: YelonLocaleService,
    useFactory: YELON_LOCALE_SERVICE_PROVIDER_FACTORY,
    deps: [[new Optional(), new SkipSelf(), YelonLocaleService], YELON_LOCALE]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvbG9jYWxlL2xvY2FsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBWSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSS9DLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsWUFBa0MsTUFBNkI7UUFIdkQsWUFBTyxHQUFtQixJQUFJLENBQUM7UUFDL0IsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFHbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQXNCO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEQsT0FBTztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBMEI7UUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFlLENBQUM7SUFDbEQsQ0FBQzs4R0ExQlUsa0JBQWtCLGtCQUlULFlBQVk7a0hBSnJCLGtCQUFrQjs7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVTs7MEJBS0ksTUFBTTsyQkFBQyxZQUFZOztBQXlCbEMsTUFBTSxVQUFVLHFDQUFxQyxDQUNuRCxLQUF5QixFQUN6QixNQUFzQjtJQUV0QixPQUFPLEtBQUssSUFBSSxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBYTtJQUNyRCxPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLFVBQVUsRUFBRSxxQ0FBcUM7SUFDakQsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxZQUFZLENBQUM7Q0FDM0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFByb3ZpZGVyLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB6aENOIGZyb20gJy4vbGFuZ3VhZ2VzL3poLUNOJztcbmltcG9ydCB7IFlFTE9OX0xPQ0FMRSB9IGZyb20gJy4vbG9jYWxlLnRva2Vucyc7XG5pbXBvcnQgeyBGdWxsTG9jYWxlRGF0YSwgTG9jYWxlRGF0YSB9IGZyb20gJy4vbG9jYWxlLnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFllbG9uTG9jYWxlU2VydmljZSB7XG4gIHByaXZhdGUgX2xvY2FsZTogRnVsbExvY2FsZURhdGEgPSB6aENOO1xuICBwcml2YXRlIGNoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZ1bGxMb2NhbGVEYXRhPih0aGlzLl9sb2NhbGUpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoWUVMT05fTE9DQUxFKSBsb2NhbGU6IEZ1bGxMb2NhbGVEYXRhIHwgbnVsbCkge1xuICAgIHRoaXMuc2V0TG9jYWxlKGxvY2FsZSB8fCB6aENOKTtcbiAgfVxuXG4gIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxGdWxsTG9jYWxlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRMb2NhbGUobG9jYWxlOiBGdWxsTG9jYWxlRGF0YSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9sb2NhbGUgJiYgdGhpcy5fbG9jYWxlLmFiYnIgPT09IGxvY2FsZS5hYmJyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZTtcbiAgICB0aGlzLmNoYW5nZSQubmV4dChsb2NhbGUpO1xuICB9XG5cbiAgZ2V0IGxvY2FsZSgpOiBGdWxsTG9jYWxlRGF0YSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgfVxuXG4gIGdldERhdGEocGF0aDoga2V5b2YgRnVsbExvY2FsZURhdGEpOiBMb2NhbGVEYXRhIHtcbiAgICByZXR1cm4gKHRoaXMuX2xvY2FsZVtwYXRoXSB8fCB7fSkgYXMgTG9jYWxlRGF0YTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gWUVMT05fTE9DQUxFX1NFUlZJQ0VfUFJPVklERVJfRkFDVE9SWShcbiAgZXhpc3Q6IFllbG9uTG9jYWxlU2VydmljZSxcbiAgbG9jYWxlOiBGdWxsTG9jYWxlRGF0YVxuKTogWWVsb25Mb2NhbGVTZXJ2aWNlIHtcbiAgcmV0dXJuIGV4aXN0IHx8IG5ldyBZZWxvbkxvY2FsZVNlcnZpY2UobG9jYWxlKTtcbn1cblxuZXhwb3J0IGNvbnN0IFlFTE9OX0xPQ0FMRV9TRVJWSUNFX1BST1ZJREVSOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogWWVsb25Mb2NhbGVTZXJ2aWNlLFxuICB1c2VGYWN0b3J5OiBZRUxPTl9MT0NBTEVfU0VSVklDRV9QUk9WSURFUl9GQUNUT1JZLFxuICBkZXBzOiBbW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgWWVsb25Mb2NhbGVTZXJ2aWNlXSwgWUVMT05fTE9DQUxFXVxufTtcbiJdfQ==