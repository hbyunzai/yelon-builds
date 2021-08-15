import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { of, pipe } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { YelonLocaleService } from '@yelon/theme';
import { YunzaiConfigService } from '@yelon/util/config';
import { OnboardingComponent } from './onboarding.component';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@yelon/util/config";
import * as i5 from "@angular/cdk/bidi";
export class OnboardingService {
    constructor(i18n, appRef, resolver, router, injector, doc, configSrv, directionality) {
        this.i18n = i18n;
        this.appRef = appRef;
        this.resolver = resolver;
        this.router = router;
        this.injector = injector;
        this.doc = doc;
        this.configSrv = configSrv;
        this.directionality = directionality;
        this.active = 0;
        this.running$ = null;
        this._running = false;
        this.type = null;
    }
    _getDoc() {
        return this.doc;
    }
    /**
     * Get whether it is booting
     *
     * 获取是否正在引导中
     */
    get running() {
        return this._running;
    }
    attach() {
        const compRef = (this.compRef = this.resolver.resolveComponentFactory(OnboardingComponent).create(this.injector));
        this.appRef.attachView(compRef.hostView);
        const compNode = compRef.hostView.rootNodes[0];
        const doc = this._getDoc();
        const cdk = doc.querySelector('.cdk-overlay-container');
        if (cdk) {
            doc.body.insertBefore(compNode, cdk);
        }
        else {
            doc.body.appendChild(compNode);
        }
        this.op$ = this.compRef.instance.op.subscribe((type) => {
            switch (type) {
                case 'next':
                    this.next();
                    break;
                case 'prev':
                    this.prev();
                    break;
                default:
                    this.done();
                    break;
            }
        });
    }
    cancelRunning() {
        if (this.running$) {
            this.running$.unsubscribe();
            this.running$ = null;
        }
        return this;
    }
    updateRunning(status) {
        this._running = status;
        this.compRef.instance.updateRunning(status);
        return this;
    }
    destroy() {
        this.cancelRunning();
        if (this.compRef) {
            this.appRef.detachView(this.compRef.hostView);
            this.compRef.destroy();
            this.op$.unsubscribe();
        }
    }
    showItem(isStart = false) {
        const items = this.config.items;
        const item = Object.assign(Object.assign({ position: 'bottomLeft', before: of(true), after: of(true) }, this.i18n.getData('onboarding')), items[this.active]);
        const dir = this.configSrv.get('onboarding').direction || this.directionality.value;
        Object.assign(this.compRef.instance, { item, config: this.config, active: this.active, max: items.length, dir });
        const pipes = [
            switchMap(() => (item.url ? this.router.navigateByUrl(item.url) : of(true))),
            switchMap(() => {
                const obs = this.type === 'prev' ? item.after : item.before;
                return typeof obs === 'number' ? of(true).pipe(delay(obs)) : obs;
            })
        ];
        if (!isStart) {
            pipes.push(delay(1));
        }
        this.updateRunning(true);
        this.running$ = of(true)
            .pipe(pipe.apply(this, pipes))
            .subscribe(() => this.cancelRunning().updateRunning(false), () => this.done());
    }
    /**
     * Start a new user guidance
     *
     * 开启新的用户引导流程
     */
    start(config) {
        if (this.running) {
            return;
        }
        this.destroy();
        this.config = Object.assign({ items: [], mask: true, maskClosable: true, showTotal: false }, config);
        this.active = 0;
        this.type = null;
        this.attach();
        this.showItem(true);
    }
    /**
     * Next
     *
     * 下一步
     */
    next() {
        if (this._running || this.active + 1 >= this.config.items.length) {
            this.done();
            return;
        }
        this.type = 'next';
        ++this.active;
        this.showItem();
    }
    /**
     * Prev
     *
     * 上一步
     */
    prev() {
        if (this._running || this.active - 1 < 0) {
            return;
        }
        this.type = 'prev';
        --this.active;
        this.showItem();
    }
    /**
     * Done
     *
     * 完成
     */
    done() {
        this.type = 'done';
        this.destroy();
    }
    ngOnDestroy() {
        this.destroy();
    }
}
OnboardingService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OnboardingService_Factory() { return new OnboardingService(i0.ɵɵinject(i1.YelonLocaleService), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3.DOCUMENT), i0.ɵɵinject(i4.YunzaiConfigService), i0.ɵɵinject(i5.Directionality, 8)); }, token: OnboardingService, providedIn: "root" });
OnboardingService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
OnboardingService.ctorParameters = () => [
    { type: YelonLocaleService },
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Router },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: YunzaiConfigService },
    { type: Directionality, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL29uYm9hcmRpbmcvb25ib2FyZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFHeEIsTUFBTSxFQUNOLFVBQVUsRUFDVixRQUFRLEVBRVIsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7QUFJN0QsTUFBTSxPQUFPLGlCQUFpQjtJQXNCNUIsWUFDVSxJQUF3QixFQUN4QixNQUFzQixFQUN0QixRQUFrQyxFQUNsQyxNQUFjLEVBQ2QsUUFBa0IsRUFDQSxHQUFjLEVBQ2hDLFNBQThCLEVBQ2xCLGNBQThCO1FBUDFDLFNBQUksR0FBSixJQUFJLENBQW9CO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ0EsUUFBRyxHQUFILEdBQUcsQ0FB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QUFFO1lBQ2pFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7OztZQW5MRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFOekIsa0JBQWtCO1lBaEJ6QixjQUFjO1lBQ2Qsd0JBQXdCO1lBU2pCLE1BQU07WUFKYixRQUFROzRDQTZDTCxNQUFNLFNBQUMsUUFBUTtZQWxDWCxtQkFBbUI7WUFwQm5CLGNBQWMsdUJBd0RsQixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBvZiwgcGlwZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFllbG9uTG9jYWxlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuaW1wb3J0IHsgT25ib2FyZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vb25ib2FyZGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT25ib2FyZGluZ0NvbmZpZywgT25ib2FyZGluZ0l0ZW0sIE9uYm9hcmRpbmdPcFR5cGUgfSBmcm9tICcuL29uYm9hcmRpbmcudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9uYm9hcmRpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBjb21wUmVmOiBDb21wb25lbnRSZWY8T25ib2FyZGluZ0NvbXBvbmVudD47XG4gIHByaXZhdGUgb3AkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY29uZmlnOiBPbmJvYXJkaW5nQ29uZmlnO1xuICBwcml2YXRlIGFjdGl2ZSA9IDA7XG4gIHByaXZhdGUgcnVubmluZyQ6IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9ydW5uaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgdHlwZTogT25ib2FyZGluZ09wVHlwZSB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX2dldERvYygpOiBEb2N1bWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZG9jO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGV0aGVyIGl0IGlzIGJvb3RpbmdcbiAgICpcbiAgICog6I635Y+W5piv5ZCm5q2j5Zyo5byV5a+85LitXG4gICAqL1xuICBnZXQgcnVubmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaTE4bjogWWVsb25Mb2NhbGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogTnpTYWZlQW55LFxuICAgIHByaXZhdGUgY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge31cblxuICBwcml2YXRlIGF0dGFjaCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wUmVmID0gKHRoaXMuY29tcFJlZiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoT25ib2FyZGluZ0NvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpKTtcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnN0IGNvbXBOb2RlID0gKGNvbXBSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPE56U2FmZUFueT4pLnJvb3ROb2Rlc1swXTtcbiAgICBjb25zdCBkb2MgPSB0aGlzLl9nZXREb2MoKTtcbiAgICBjb25zdCBjZGsgPSBkb2MucXVlcnlTZWxlY3RvcignLmNkay1vdmVybGF5LWNvbnRhaW5lcicpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChjZGspIHtcbiAgICAgIGRvYy5ib2R5Lmluc2VydEJlZm9yZShjb21wTm9kZSwgY2RrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoY29tcE5vZGUpO1xuICAgIH1cbiAgICB0aGlzLm9wJCA9IHRoaXMuY29tcFJlZi5pbnN0YW5jZS5vcC5zdWJzY3JpYmUoKHR5cGU6IE9uYm9hcmRpbmdPcFR5cGUpID0+IHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJldic6XG4gICAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5kb25lKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNhbmNlbFJ1bm5pbmcoKTogdGhpcyB7XG4gICAgaWYgKHRoaXMucnVubmluZyQpIHtcbiAgICAgIHRoaXMucnVubmluZyQudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucnVubmluZyQgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUnVubmluZyhzdGF0dXM6IGJvb2xlYW4pOiB0aGlzIHtcbiAgICB0aGlzLl9ydW5uaW5nID0gc3RhdHVzO1xuICAgIHRoaXMuY29tcFJlZiEuaW5zdGFuY2UudXBkYXRlUnVubmluZyhzdGF0dXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsUnVubmluZygpO1xuICAgIGlmICh0aGlzLmNvbXBSZWYpIHtcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb21wUmVmLmhvc3RWaWV3KTtcbiAgICAgIHRoaXMuY29tcFJlZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLm9wJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd0l0ZW0oaXNTdGFydDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmNvbmZpZy5pdGVtcyE7XG4gICAgY29uc3QgaXRlbSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tTGVmdCcsXG4gICAgICBiZWZvcmU6IG9mKHRydWUpLFxuICAgICAgYWZ0ZXI6IG9mKHRydWUpLFxuICAgICAgLi4udGhpcy5pMThuLmdldERhdGEoJ29uYm9hcmRpbmcnKSxcbiAgICAgIC4uLml0ZW1zW3RoaXMuYWN0aXZlXVxuICAgIH0gYXMgT25ib2FyZGluZ0l0ZW07XG4gICAgY29uc3QgZGlyID0gdGhpcy5jb25maWdTcnYuZ2V0KCdvbmJvYXJkaW5nJykhLmRpcmVjdGlvbiB8fCB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb21wUmVmLmluc3RhbmNlLCB7IGl0ZW0sIGNvbmZpZzogdGhpcy5jb25maWcsIGFjdGl2ZTogdGhpcy5hY3RpdmUsIG1heDogaXRlbXMubGVuZ3RoLCBkaXIgfSk7XG4gICAgY29uc3QgcGlwZXMgPSBbXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gKGl0ZW0udXJsID8gdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChpdGVtLnVybCkgOiBvZih0cnVlKSkpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzID0gdGhpcy50eXBlID09PSAncHJldicgPyBpdGVtLmFmdGVyISA6IGl0ZW0uYmVmb3JlITtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYnMgPT09ICdudW1iZXInID8gb2YodHJ1ZSkucGlwZShkZWxheShvYnMpKSA6IG9icztcbiAgICAgIH0pXG4gICAgXTtcbiAgICBpZiAoIWlzU3RhcnQpIHtcbiAgICAgIHBpcGVzLnB1c2goZGVsYXkoMSkpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlUnVubmluZyh0cnVlKTtcblxuICAgIHRoaXMucnVubmluZyQgPSBvZih0cnVlKVxuICAgICAgLnBpcGUocGlwZS5hcHBseSh0aGlzLCBwaXBlcykpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLmNhbmNlbFJ1bm5pbmcoKS51cGRhdGVSdW5uaW5nKGZhbHNlKSxcbiAgICAgICAgKCkgPT4gdGhpcy5kb25lKClcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgYSBuZXcgdXNlciBndWlkYW5jZVxuICAgKlxuICAgKiDlvIDlkK/mlrDnmoTnlKjmiLflvJXlr7zmtYHnqItcbiAgICovXG4gIHN0YXJ0KGNvbmZpZzogT25ib2FyZGluZ0NvbmZpZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBpdGVtczogW10sXG4gICAgICBtYXNrOiB0cnVlLFxuICAgICAgbWFza0Nsb3NhYmxlOiB0cnVlLFxuICAgICAgc2hvd1RvdGFsOiBmYWxzZSxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH07XG4gICAgdGhpcy5hY3RpdmUgPSAwO1xuICAgIHRoaXMudHlwZSA9IG51bGw7XG4gICAgdGhpcy5hdHRhY2goKTtcbiAgICB0aGlzLnNob3dJdGVtKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5leHRcbiAgICpcbiAgICog5LiL5LiA5q2lXG4gICAqL1xuICBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9ydW5uaW5nIHx8IHRoaXMuYWN0aXZlICsgMSA+PSB0aGlzLmNvbmZpZy5pdGVtcyEubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRvbmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50eXBlID0gJ25leHQnO1xuICAgICsrdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5zaG93SXRlbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZcbiAgICpcbiAgICog5LiK5LiA5q2lXG4gICAqL1xuICBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9ydW5uaW5nIHx8IHRoaXMuYWN0aXZlIC0gMSA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50eXBlID0gJ3ByZXYnO1xuICAgIC0tdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5zaG93SXRlbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvbmVcbiAgICpcbiAgICog5a6M5oiQXG4gICAqL1xuICBkb25lKCk6IHZvaWQge1xuICAgIHRoaXMudHlwZSA9ICdkb25lJztcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=