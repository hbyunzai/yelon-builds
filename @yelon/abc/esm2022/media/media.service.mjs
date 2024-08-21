import { Injectable, inject } from '@angular/core';
import { Subject, share } from 'rxjs';
import { YunzaiConfigService } from '@yelon/util/config';
import { LazyService } from '@yelon/util/other';
import * as i0 from "@angular/core";
export class MediaService {
    constructor() {
        this.cogSrv = inject(YunzaiConfigService);
        this.lazySrv = inject(LazyService);
        this.loading = false;
        this.loaded = false;
        this.notify$ = new Subject();
    }
    get cog() {
        return this._cog;
    }
    set cog(val) {
        this._cog = this.cogSrv.merge('media', {
            urls: ['https://cdn.jsdelivr.net/npm/plyr/dist/plyr.min.js', 'https://cdn.jsdelivr.net/npm/plyr/dist/plyr.css']
        }, val);
    }
    load() {
        if (this.loading) {
            if (this.loaded) {
                this.notify$.next();
            }
            return this;
        }
        this.loading = true;
        this.lazySrv.load(this.cog.urls).then(() => {
            this.loaded = true;
            this.notify$.next();
        });
        return this;
    }
    notify() {
        return this.notify$.asObservable().pipe(share());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: MediaService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: MediaService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: MediaService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9tZWRpYS9tZWRpYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBYyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWxELE9BQU8sRUFBRSxtQkFBbUIsRUFBcUIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2hELE1BQU0sT0FBTyxZQUFZO0lBRHpCO1FBRW1CLFdBQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxZQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0tBaUN2QztJQS9CQyxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUNELElBQUksR0FBRyxDQUFDLEdBQXNCO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQzNCLE9BQU8sRUFDUDtZQUNFLElBQUksRUFBRSxDQUFDLG9EQUFvRCxFQUFFLGlEQUFpRCxDQUFDO1NBQ2hILEVBQ0QsR0FBRyxDQUNILENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs4R0F2Q1UsWUFBWTtrSEFBWixZQUFZLGNBREMsTUFBTTs7MkZBQ25CLFlBQVk7a0JBRHhCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBzaGFyZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlLCBZdW56YWlNZWRpYUNvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBMYXp5U2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBNZWRpYVNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGNvZ1NydiA9IGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBsYXp5U3J2ID0gaW5qZWN0KExhenlTZXJ2aWNlKTtcblxuICBwcml2YXRlIF9jb2chOiBZdW56YWlNZWRpYUNvbmZpZztcbiAgcHJpdmF0ZSBsb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgbm90aWZ5JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgZ2V0IGNvZygpOiBZdW56YWlNZWRpYUNvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvZztcbiAgfVxuICBzZXQgY29nKHZhbDogWXVuemFpTWVkaWFDb25maWcpIHtcbiAgICB0aGlzLl9jb2cgPSB0aGlzLmNvZ1Nydi5tZXJnZShcbiAgICAgICdtZWRpYScsXG4gICAgICB7XG4gICAgICAgIHVybHM6IFsnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9wbHlyL2Rpc3QvcGx5ci5taW4uanMnLCAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9wbHlyL2Rpc3QvcGx5ci5jc3MnXVxuICAgICAgfSxcbiAgICAgIHZhbFxuICAgICkhO1xuICB9XG5cbiAgbG9hZCgpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZWQpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkkLm5leHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubGF6eVNydi5sb2FkKHRoaXMuY29nLnVybHMhKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubm90aWZ5JC5uZXh0KCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBub3RpZnkoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMubm90aWZ5JC5hc09ic2VydmFibGUoKS5waXBlKHNoYXJlKCkpO1xuICB9XG59XG4iXX0=