import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { LazyService } from '@yelon/util/other';
import * as i0 from "@angular/core";
export class ChartEChartsService {
    get cog() {
        return this._cog;
    }
    set cog(val) {
        this._cog = this.cogSrv.merge('chart', {
            theme: '',
            echartsLib: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.1.0/echarts.min.js'
        }, val);
    }
    constructor() {
        this.cogSrv = inject(YunzaiConfigService);
        this.lazySrv = inject(LazyService);
        this.loading = false;
        this.loaded = false;
        this.notify$ = new Subject();
        this.cog = { theme: '' };
    }
    libLoad() {
        if (this.loading) {
            if (this.loaded) {
                this.notify$.next();
            }
            return this;
        }
        this.loading = true;
        this.lazySrv
            .load(this.cog.echartsLib)
            .then(() => {
            const extensions = this.cog.echartsExtensions;
            if (Array.isArray(extensions) && extensions.length > 0) {
                return this.lazySrv.load(extensions).then(() => true);
            }
            return Promise.resolve(true);
        })
            .then(() => {
            this.loaded = true;
            this.notify$.next();
        });
        return this;
    }
    get notify() {
        return this.notify$.asObservable();
    }
    ngOnDestroy() {
        this.notify$.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ChartEChartsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ChartEChartsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ChartEChartsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoYXJ0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY2hhcnQvY2hhcnQtZWNoYXJ0cy9lY2hhcnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQXFCLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUdoRCxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0QsSUFBSSxHQUFHLENBQUMsR0FBc0I7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDM0IsT0FBTyxFQUNQO1lBQ0UsS0FBSyxFQUFFLEVBQUU7WUFDVCxVQUFVLEVBQUUscUVBQXFFO1NBQzdELEVBQ3RCLEdBQUcsQ0FDSCxDQUFDO0lBQ0wsQ0FBQztJQUVEO1FBckJpQixXQUFNLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWlCcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTzthQUNULElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVcsQ0FBQzthQUMxQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztZQUM5QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDdkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNMLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs4R0F4RFUsbUJBQW1CO2tIQUFuQixtQkFBbUIsY0FETixNQUFNOzsyRkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFl1bnphaUNoYXJ0Q29uZmlnLCBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IExhenlTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENoYXJ0RUNoYXJ0c1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGNvZ1NydiA9IGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBsYXp5U3J2ID0gaW5qZWN0KExhenlTZXJ2aWNlKTtcbiAgcHJpdmF0ZSBfY29nITogWXVuemFpQ2hhcnRDb25maWc7XG4gIHByaXZhdGUgbG9hZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIGxvYWRlZCA9IGZhbHNlO1xuICBwcml2YXRlIG5vdGlmeSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGdldCBjb2coKTogWXVuemFpQ2hhcnRDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb2c7XG4gIH1cbiAgc2V0IGNvZyh2YWw6IFl1bnphaUNoYXJ0Q29uZmlnKSB7XG4gICAgdGhpcy5fY29nID0gdGhpcy5jb2dTcnYubWVyZ2UoXG4gICAgICAnY2hhcnQnLFxuICAgICAge1xuICAgICAgICB0aGVtZTogJycsXG4gICAgICAgIGVjaGFydHNMaWI6ICdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9lY2hhcnRzLzUuMS4wL2VjaGFydHMubWluLmpzJ1xuICAgICAgfSBhcyBZdW56YWlDaGFydENvbmZpZyxcbiAgICAgIHZhbFxuICAgICkhO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb2cgPSB7IHRoZW1lOiAnJyB9O1xuICB9XG5cbiAgbGliTG9hZCgpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZWQpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkkLm5leHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubGF6eVNydlxuICAgICAgLmxvYWQodGhpcy5jb2cuZWNoYXJ0c0xpYiEpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSB0aGlzLmNvZy5lY2hhcnRzRXh0ZW5zaW9ucztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXh0ZW5zaW9ucykgJiYgZXh0ZW5zaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF6eVNydi5sb2FkKGV4dGVuc2lvbnMpLnRoZW4oKCkgPT4gdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub3RpZnkkLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IG5vdGlmeSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5ub3RpZnkkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZnkkLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==