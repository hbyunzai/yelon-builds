import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, Injector, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, map, delay, isObservable, switchMap } from 'rxjs';
import { YUNZAI_I18N_TOKEN } from '../i18n/i18n';
import { MenuService } from '../menu/menu.service';
import * as i0 from "@angular/core";
export class TitleService {
    constructor() {
        this.destroy$ = inject(DestroyRef);
        this._prefix = '';
        this._suffix = '';
        this._separator = ' - ';
        this._reverse = false;
        this.DELAY_TIME = 25;
        this.doc = inject(DOCUMENT);
        this.injector = inject(Injector);
        this.title = inject(Title);
        this.menuSrv = inject(MenuService);
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN, { optional: true });
        /**
         * Set default title name
         *
         * 设置默认标题名
         */
        this.default = `Not Page Name`;
        this.i18nSrv?.change.pipe(takeUntilDestroyed()).subscribe(() => this.setTitle());
    }
    /**
     * Set separator
     *
     * 设置分隔符
     */
    set separator(value) {
        this._separator = value;
    }
    /**
     * Set prefix
     *
     * 设置前缀
     */
    set prefix(value) {
        this._prefix = value;
    }
    /**
     * Set suffix
     *
     * 设置后缀
     */
    set suffix(value) {
        this._suffix = value;
    }
    /**
     * Set whether to reverse
     *
     * 设置是否反转
     */
    set reverse(value) {
        this._reverse = value;
    }
    getByElement() {
        return of('').pipe(delay(this.DELAY_TIME), map(() => {
            const el = ((this.selector != null ? this.doc.querySelector(this.selector) : null) ||
                this.doc.querySelector('.yunzai-default__content-title h1') ||
                this.doc.querySelector('.page-header__title'));
            if (el) {
                let text = '';
                el.childNodes.forEach(val => {
                    if (!text && val.nodeType === 3) {
                        text = val.textContent.trim();
                    }
                });
                return text || el.firstChild.textContent.trim();
            }
            return '';
        }));
    }
    getByRoute() {
        let next = this.injector.get(ActivatedRoute);
        while (next.firstChild)
            next = next.firstChild;
        const data = (next.snapshot && next.snapshot.data) || {};
        if (data.titleI18n && this.i18nSrv)
            data.title = this.i18nSrv.fanyi(data.titleI18n);
        return isObservable(data.title) ? data.title : of(data.title);
    }
    getByMenu() {
        const menus = this.menuSrv.getPathByUrl(this.injector.get(Router).url);
        if (!menus || menus.length <= 0)
            return of('');
        const item = menus[menus.length - 1];
        let title;
        if (item.i18n && this.i18nSrv)
            title = this.i18nSrv.fanyi(item.i18n);
        return of(title || item.text);
    }
    /**
     * Set the document title
     */
    setTitle(title) {
        this.tit$?.unsubscribe();
        this.tit$ = of(title)
            .pipe(switchMap(tit => (tit ? of(tit) : this.getByRoute())), switchMap(tit => (tit ? of(tit) : this.getByMenu())), switchMap(tit => (tit ? of(tit) : this.getByElement())), map(tit => tit || this.default), map(title => (!Array.isArray(title) ? [title] : title)), takeUntilDestroyed(this.destroy$))
            .subscribe(titles => {
            let newTitles = [];
            if (this._prefix) {
                newTitles.push(this._prefix);
            }
            newTitles.push(...titles.filter(title => !!title));
            if (this._suffix) {
                newTitles.push(this._suffix);
            }
            if (this._reverse) {
                newTitles = newTitles.reverse();
            }
            this.title.setTitle(newTitles.join(this._separator));
        });
    }
    /**
     * Set i18n key of the document title
     */
    setTitleByI18n(key, params) {
        this.setTitle(this.i18nSrv?.fanyi(key, params));
    }
    ngOnDestroy() {
        this.tit$?.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: TitleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: TitleService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: TitleService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy90aXRsZS90aXRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUV6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQVFuRCxNQUFNLE9BQU8sWUFBWTtJQWdCdkI7UUFmUSxhQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHekIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVSLFFBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsYUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixVQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FB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SSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLEdBQVcsRUFBRSxNQUFnQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDOzhHQXBKVSxZQUFZO2tIQUFaLFlBQVksY0FEQyxNQUFNOzsyRkFDbkIsWUFBWTtrQkFEeEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZXN0cm95UmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciwgT25EZXN0cm95LCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBtYXAsIGRlbGF5LCBpc09ic2VydmFibGUsIHN3aXRjaE1hcCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFlVTlpBSV9JMThOX1RPS0VOIH0gZnJvbSAnLi4vaTE4bi9pMThuJztcbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbWVudS9tZW51LnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlVGl0bGUge1xuICB0aXRsZT86IHN0cmluZyB8IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgdGl0bGVJMThuPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRpdGxlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgX3ByZWZpeDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX3N1ZmZpeDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX3NlcGFyYXRvcjogc3RyaW5nID0gJyAtICc7XG4gIHByaXZhdGUgX3JldmVyc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB0aXQkPzogU3Vic2NyaXB0aW9uO1xuXG4gIHJlYWRvbmx5IERFTEFZX1RJTUUgPSAyNTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRvYyA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3IgPSBpbmplY3QoSW5qZWN0b3IpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRpdGxlID0gaW5qZWN0KFRpdGxlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBtZW51U3J2ID0gaW5qZWN0KE1lbnVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpMThuU3J2ID0gaW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaTE4blNydj8uY2hhbmdlLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFRpdGxlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBzZXBhcmF0b3JcbiAgICpcbiAgICog6K6+572u5YiG6ZqU56ymXG4gICAqL1xuICBzZXQgc2VwYXJhdG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zZXBhcmF0b3IgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcHJlZml4XG4gICAqXG4gICAqIOiuvue9ruWJjee8gFxuICAgKi9cbiAgc2V0IHByZWZpeCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHN1ZmZpeFxuICAgKlxuICAgKiDorr7nva7lkI7nvIBcbiAgICovXG4gIHNldCBzdWZmaXgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB3aGV0aGVyIHRvIHJldmVyc2VcbiAgICpcbiAgICog6K6+572u5piv5ZCm5Y+N6L2sXG4gICAqL1xuICBzZXQgcmV2ZXJzZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JldmVyc2UgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgQ1NTIHNlbGVjdG9yIHN0cmluZ1xuICAgKlxuICAgKiDorr7nva7pu5jorqRDU1PpgInmi6nlmajlrZfnrKbkuLJcbiAgICovXG4gIHNlbGVjdG9yPzogc3RyaW5nIHwgbnVsbDtcblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgdGl0bGUgbmFtZVxuICAgKlxuICAgKiDorr7nva7pu5jorqTmoIfpopjlkI1cbiAgICovXG4gIGRlZmF1bHQgPSBgTm90IFBhZ2UgTmFtZWA7XG5cbiAgcHJpdmF0ZSBnZXRCeUVsZW1lbnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gb2YoJycpLnBpcGUoXG4gICAgICBkZWxheSh0aGlzLkRFTEFZX1RJTUUpLFxuICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSAoKHRoaXMuc2VsZWN0b3IgIT0gbnVsbCA/IHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcikgOiBudWxsKSB8fFxuICAgICAgICAgIHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IoJy55dW56YWktZGVmYXVsdF9fY29udGVudC10aXRsZSBoMScpIHx8XG4gICAgICAgICAgdGhpcy5kb2MucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX190aXRsZScpKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgICBlbC5jaGlsZE5vZGVzLmZvckVhY2godmFsID0+IHtcbiAgICAgICAgICAgIGlmICghdGV4dCAmJiB2YWwubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgdGV4dCA9IHZhbC50ZXh0Q29udGVudCEudHJpbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0ZXh0IHx8IGVsLmZpcnN0Q2hpbGQhLnRleHRDb250ZW50IS50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCeVJvdXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgbGV0IG5leHQgPSB0aGlzLmluamVjdG9yLmdldChBY3RpdmF0ZWRSb3V0ZSk7XG4gICAgd2hpbGUgKG5leHQuZmlyc3RDaGlsZCkgbmV4dCA9IG5leHQuZmlyc3RDaGlsZDtcbiAgICBjb25zdCBkYXRhOiBSb3V0ZVRpdGxlID0gKG5leHQuc25hcHNob3QgJiYgbmV4dC5zbmFwc2hvdC5kYXRhKSB8fCB7fTtcbiAgICBpZiAoZGF0YS50aXRsZUkxOG4gJiYgdGhpcy5pMThuU3J2KSBkYXRhLnRpdGxlID0gdGhpcy5pMThuU3J2LmZhbnlpKGRhdGEudGl0bGVJMThuKTtcbiAgICByZXR1cm4gaXNPYnNlcnZhYmxlKGRhdGEudGl0bGUpID8gZGF0YS50aXRsZSA6IG9mKGRhdGEudGl0bGUhKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnlNZW51KCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVudXMgPSB0aGlzLm1lbnVTcnYuZ2V0UGF0aEJ5VXJsKHRoaXMuaW5qZWN0b3IuZ2V0PFJvdXRlcj4oUm91dGVyKS51cmwpO1xuICAgIGlmICghbWVudXMgfHwgbWVudXMubGVuZ3RoIDw9IDApIHJldHVybiBvZignJyk7XG5cbiAgICBjb25zdCBpdGVtID0gbWVudXNbbWVudXMubGVuZ3RoIC0gMV07XG4gICAgbGV0IHRpdGxlO1xuICAgIGlmIChpdGVtLmkxOG4gJiYgdGhpcy5pMThuU3J2KSB0aXRsZSA9IHRoaXMuaTE4blNydi5mYW55aShpdGVtLmkxOG4pO1xuICAgIHJldHVybiBvZih0aXRsZSB8fCBpdGVtLnRleHQhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRvY3VtZW50IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZT86IHN0cmluZyB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpcy50aXQkPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudGl0JCA9IG9mKHRpdGxlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCh0aXQgPT4gKHRpdCA/IG9mKHRpdCkgOiB0aGlzLmdldEJ5Um91dGUoKSkpLFxuICAgICAgICBzd2l0Y2hNYXAodGl0ID0+ICh0aXQgPyBvZih0aXQpIDogdGhpcy5nZXRCeU1lbnUoKSkpLFxuICAgICAgICBzd2l0Y2hNYXAodGl0ID0+ICh0aXQgPyBvZih0aXQpIDogdGhpcy5nZXRCeUVsZW1lbnQoKSkpLFxuICAgICAgICBtYXAodGl0ID0+IHRpdCB8fCB0aGlzLmRlZmF1bHQpLFxuICAgICAgICBtYXAodGl0bGUgPT4gKCFBcnJheS5pc0FycmF5KHRpdGxlKSA/IFt0aXRsZV0gOiB0aXRsZSkpLFxuICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGl0bGVzID0+IHtcbiAgICAgICAgbGV0IG5ld1RpdGxlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuX3ByZWZpeCkge1xuICAgICAgICAgIG5ld1RpdGxlcy5wdXNoKHRoaXMuX3ByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3VGl0bGVzLnB1c2goLi4udGl0bGVzLmZpbHRlcih0aXRsZSA9PiAhIXRpdGxlKSk7XG4gICAgICAgIGlmICh0aGlzLl9zdWZmaXgpIHtcbiAgICAgICAgICBuZXdUaXRsZXMucHVzaCh0aGlzLl9zdWZmaXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZXZlcnNlKSB7XG4gICAgICAgICAgbmV3VGl0bGVzID0gbmV3VGl0bGVzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpdGxlLnNldFRpdGxlKG5ld1RpdGxlcy5qb2luKHRoaXMuX3NlcGFyYXRvcikpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGkxOG4ga2V5IG9mIHRoZSBkb2N1bWVudCB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGVCeUkxOG4oa2V5OiBzdHJpbmcsIHBhcmFtcz86IHVua25vd24pOiB2b2lkIHtcbiAgICB0aGlzLnNldFRpdGxlKHRoaXMuaTE4blNydj8uZmFueWkoa2V5LCBwYXJhbXMpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudGl0JD8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19