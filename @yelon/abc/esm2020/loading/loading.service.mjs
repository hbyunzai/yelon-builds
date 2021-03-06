import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Optional } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { LoadingDefaultComponent } from './loading.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@yelon/util/config";
import * as i3 from "@angular/cdk/bidi";
export class LoadingService {
    constructor(overlay, configSrv, directionality) {
        this.overlay = overlay;
        this.configSrv = configSrv;
        this.directionality = directionality;
        this.compRef = null;
        this.opt = null;
        this.n$ = new Subject();
        this.cog = configSrv.merge('loading', {
            type: 'spin',
            text: '加载中...',
            icon: {
                type: 'loading',
                theme: 'outline',
                spin: true
            },
            delay: 0
        });
        this.loading$ = this.n$
            .asObservable()
            .pipe(debounce(() => timer(this.opt.delay)))
            .subscribe(() => this.create());
    }
    get instance() {
        return this.compRef != null ? this.compRef.instance : null;
    }
    create() {
        if (this.opt == null)
            return;
        this._close(false);
        this._overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            scrollStrategy: this.overlay.scrollStrategies.block(),
            hasBackdrop: true,
            backdropClass: 'loading-backdrop'
        });
        this.compRef = this._overlayRef.attach(new ComponentPortal(LoadingDefaultComponent));
        const dir = this.configSrv.get('loading').direction || this.directionality.value;
        Object.assign(this.instance, { options: this.opt, dir });
        this.compRef.changeDetectorRef.markForCheck();
    }
    /**
     * Open a new loading indicator
     *
     * 打开一个新加载指示符
     */
    open(options) {
        this.opt = { ...this.cog, ...options };
        this.n$.next();
    }
    _close(cleanOpt) {
        if (cleanOpt)
            this.opt = null;
        if (!this._overlayRef)
            return;
        this._overlayRef.detach();
        this.compRef = null;
    }
    /**
     * Turn off a loading indicator
     *
     * 关闭一个加载指示符
     */
    close() {
        this._close(true);
    }
    ngOnDestroy() {
        this.loading$.unsubscribe();
    }
}
LoadingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: LoadingService, deps: [{ token: i1.Overlay }, { token: i2.YunzaiConfigService }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
LoadingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: LoadingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: LoadingService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.YunzaiConfigService }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2xvYWRpbmcvbG9hZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQWdCLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkxQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFJOUQsTUFBTSxPQUFPLGNBQWM7SUFZekIsWUFDVSxPQUFnQixFQUNoQixTQUE4QixFQUNsQixjQUE4QjtRQUYxQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQ2xCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWI1QyxZQUFPLEdBQWlELElBQUksQ0FBQztRQUM3RCxRQUFHLEdBQThCLElBQUksQ0FBQztRQUV0QyxPQUFFLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQVkvQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3BDLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxJQUFJO2FBQ1g7WUFDRCxLQUFLLEVBQUUsQ0FBQztTQUNULENBQUUsQ0FBQztRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUU7YUFDcEIsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUksQ0FBQyxLQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBdkJELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0QsQ0FBQztJQXVCTyxNQUFNO1FBQ1osSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUk7WUFBRSxPQUFPO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUYsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO1lBQ3JELFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGFBQWEsRUFBRSxrQkFBa0I7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDckYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFFLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ2xGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksQ0FBQyxPQUE0QjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sTUFBTSxDQUFDLFFBQWlCO1FBQzlCLElBQUksUUFBUTtZQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOzsyR0E5RVUsY0FBYzsrR0FBZCxjQUFjLGNBREQsTUFBTTsyRkFDbkIsY0FBYztrQkFEMUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQWdCN0IsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpTG9hZGluZ0NvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmltcG9ydCB7IExvYWRpbmdEZWZhdWx0Q29tcG9uZW50IH0gZnJvbSAnLi9sb2FkaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkaW5nU2hvd09wdGlvbnMgfSBmcm9tICcuL2xvYWRpbmcudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZj86IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgY29tcFJlZjogQ29tcG9uZW50UmVmPExvYWRpbmdEZWZhdWx0Q29tcG9uZW50PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9wdDogTG9hZGluZ1Nob3dPcHRpb25zIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY29nOiBZdW56YWlMb2FkaW5nQ29uZmlnO1xuICBwcml2YXRlIG4kID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsb2FkaW5nJDogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBpbnN0YW5jZSgpOiBMb2FkaW5nRGVmYXVsdENvbXBvbmVudCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmNvbXBSZWYgIT0gbnVsbCA/IHRoaXMuY29tcFJlZi5pbnN0YW5jZSA6IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBjb25maWdTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7XG4gICAgdGhpcy5jb2cgPSBjb25maWdTcnYubWVyZ2UoJ2xvYWRpbmcnLCB7XG4gICAgICB0eXBlOiAnc3BpbicsXG4gICAgICB0ZXh0OiAn5Yqg6L295LitLi4uJyxcbiAgICAgIGljb246IHtcbiAgICAgICAgdHlwZTogJ2xvYWRpbmcnLFxuICAgICAgICB0aGVtZTogJ291dGxpbmUnLFxuICAgICAgICBzcGluOiB0cnVlXG4gICAgICB9LFxuICAgICAgZGVsYXk6IDBcbiAgICB9KSE7XG4gICAgdGhpcy5sb2FkaW5nJCA9IHRoaXMubiRcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoZGVib3VuY2UoKCkgPT4gdGltZXIodGhpcy5vcHQhLmRlbGF5ISkpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNyZWF0ZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdCA9PSBudWxsKSByZXR1cm47XG5cbiAgICB0aGlzLl9jbG9zZShmYWxzZSk7XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS5jZW50ZXJIb3Jpem9udGFsbHkoKS5jZW50ZXJWZXJ0aWNhbGx5KCksXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgYmFja2Ryb3BDbGFzczogJ2xvYWRpbmctYmFja2Ryb3AnXG4gICAgfSk7XG4gICAgdGhpcy5jb21wUmVmID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2gobmV3IENvbXBvbmVudFBvcnRhbChMb2FkaW5nRGVmYXVsdENvbXBvbmVudCkpO1xuICAgIGNvbnN0IGRpciA9IHRoaXMuY29uZmlnU3J2LmdldCgnbG9hZGluZycpIS5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuaW5zdGFuY2UsIHsgb3B0aW9uczogdGhpcy5vcHQsIGRpciB9KTtcbiAgICB0aGlzLmNvbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbiBhIG5ldyBsb2FkaW5nIGluZGljYXRvclxuICAgKlxuICAgKiDmiZPlvIDkuIDkuKrmlrDliqDovb3mjIfnpLrnrKZcbiAgICovXG4gIG9wZW4ob3B0aW9ucz86IExvYWRpbmdTaG93T3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMub3B0ID0geyAuLi50aGlzLmNvZywgLi4ub3B0aW9ucyB9O1xuICAgIHRoaXMubiQubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2UoY2xlYW5PcHQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoY2xlYW5PcHQpIHRoaXMub3B0ID0gbnVsbDtcbiAgICBpZiAoIXRoaXMuX292ZXJsYXlSZWYpIHJldHVybjtcbiAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIHRoaXMuY29tcFJlZiA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVHVybiBvZmYgYSBsb2FkaW5nIGluZGljYXRvclxuICAgKlxuICAgKiDlhbPpl63kuIDkuKrliqDovb3mjIfnpLrnrKZcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nsb3NlKHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=