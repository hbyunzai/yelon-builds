import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, isDevMode } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import { log, WINDOW, useLocalStorageUser } from '@yelon/util';
import { mergeSocketConfig, SOCKET_DEFAULT_CONFIG } from './socket.config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util";
import * as i2 from "./notification.service";
export class StompService {
    constructor(configService, injector, notifyService, win) {
        this.configService = configService;
        this.injector = injector;
        this.notifyService = notifyService;
        this.win = win;
        this.config = SOCKET_DEFAULT_CONFIG;
        this.destroy$ = new Subject();
        const [, getUser] = useLocalStorageUser();
        if (!this.user) {
            this.user = getUser();
        }
        this.config = mergeSocketConfig(this.configService);
        this.rxStomp = new RxStomp();
        if (isDevMode()) {
            log('stomp.service: is dev mode');
            log('stomp.service: ', `config is ${JSON.stringify(this.config)}`);
            this.rxStomp.configure(this.config);
            return;
        }
        const { location } = this.injector.get(DOCUMENT);
        const { protocol, host } = location;
        log('stomp.service: ', `protocol is ${protocol},host is ${host}`);
        if (protocol.includes('http') && !protocol.includes('https')) {
            this.config.brokerURL = `ws://${host}${this.config.brokerURL}`;
        }
        if (protocol.includes('https')) {
            this.config.brokerURL = `wss://${host}${this.config.brokerURL}`;
        }
        log('stomp.service: ', `config is ${this.config}`);
        this.rxStomp.configure(this.config);
    }
    ngOnDestroy() {
        this.unListen();
    }
    listen() {
        this.userChannel().subscribe((message) => {
            const body = JSON.parse(message.body);
            this.notifyService.notifyWithHtml(body);
        });
        this.logoutChannel().subscribe((message) => {
            const body = JSON.parse(message.body);
            this.notifyService.notify(body);
            setTimeout(() => {
                localStorage.clear();
                this.win.location.href = `${this.config?.baseUrl}/cas-proxy/app/logout`;
            }, 5000);
        });
    }
    logoutChannel() {
        return this.rxStomp.watch(`/topic/layout_xx_${this.user?.username}`).pipe(takeUntil(this.destroy$));
    }
    userChannel() {
        return this.rxStomp.watch(`/topic/layout_${this.user?.username}`).pipe(takeUntil(this.destroy$));
    }
    unListen() {
        this.destroy$.complete();
        this.rxStomp.deactivate().then();
    }
    publish(parameters) {
        this.rxStomp.publish(parameters);
    }
    watch(destination, headers) {
        return this.rxStomp.watch(destination, headers);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: StompService, deps: [{ token: i1.YunzaiConfigService }, { token: i0.Injector }, { token: i2.NotificationService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: StompService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: StompService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }, { type: i0.Injector }, { type: i2.NotificationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvbXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3NvY2tldC9zcmMvc3RvbXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQVksU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkxQyxPQUFPLEVBQTJDLEdBQUcsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQWMsTUFBTSxhQUFhLENBQUM7QUFHcEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHM0UsTUFBTSxPQUFPLFlBQVk7SUFNdkIsWUFDVSxhQUFrQyxFQUNsQyxRQUFrQixFQUNsQixhQUFrQyxFQUNsQixHQUFRO1FBSHhCLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBVGxDLFdBQU0sR0FBdUIscUJBQXFCLENBQUM7UUFHbkQsYUFBUSxHQUFxQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBUXpDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxD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LEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFpQztRQUN2QyxJQUFJLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQW1CLEVBQUUsT0FBc0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsT0FBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQzsrR0E1RVUsWUFBWSxnSEFVYixNQUFNO21IQVZMLFlBQVksY0FEQyxNQUFNOzs0RkFDbkIsWUFBWTtrQkFEeEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQVc3QixNQUFNOzJCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLCBpc0Rldk1vZGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJ4U3RvbXAgfSBmcm9tICdAc3RvbXAvcngtc3RvbXAnO1xuaW1wb3J0IHsgSVJ4U3RvbXBQdWJsaXNoUGFyYW1zIH0gZnJvbSAnQHN0b21wL3J4LXN0b21wL2VzbTYvaS1yeC1zdG9tcC1wdWJsaXNoLXBhcmFtcyc7XG5pbXBvcnQgeyBJTWVzc2FnZSwgU3RvbXBIZWFkZXJzIH0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlLCBZdW56YWlTb2NrZXRDb25maWcsIGxvZywgV0lORE9XLCB1c2VMb2NhbFN0b3JhZ2VVc2VyLCBZdW56YWlVc2VyIH0gZnJvbSAnQHllbG9uL3V0aWwnO1xuXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBtZXJnZVNvY2tldENvbmZpZywgU09DS0VUX0RFRkFVTFRfQ09ORklHIH0gZnJvbSAnLi9zb2NrZXQuY29uZmlnJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTdG9tcFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25maWc6IFl1bnphaVNvY2tldENvbmZpZyA9IFNPQ0tFVF9ERUZBVUxUX0NPTkZJRztcbiAgcnhTdG9tcDogUnhTdG9tcDtcbiAgdXNlcj86IFl1bnphaVVzZXI7XG4gIGRlc3Ryb3kkOiBTdWJqZWN0PHVua25vd24+ID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBub3RpZnlTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbjogYW55XG4gICkge1xuICAgIGNvbnN0IFssIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGlmICghdGhpcy51c2VyKSB7XG4gICAgICB0aGlzLnVzZXIgPSBnZXRVc2VyKCkhO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZyA9IG1lcmdlU29ja2V0Q29uZmlnKHRoaXMuY29uZmlnU2VydmljZSk7XG4gICAgdGhpcy5yeFN0b21wID0gbmV3IFJ4U3RvbXAoKTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGxvZygnc3RvbXAuc2VydmljZTogaXMgZGV2IG1vZGUnKTtcbiAgICAgIGxvZygnc3RvbXAuc2VydmljZTogJywgYGNvbmZpZyBpcyAke0pTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlnKX1gKTtcbiAgICAgIHRoaXMucnhTdG9tcC5jb25maWd1cmUodGhpcy5jb25maWcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxvY2F0aW9uIH0gPSB0aGlzLmluamVjdG9yLmdldChET0NVTUVOVCk7XG4gICAgY29uc3QgeyBwcm90b2NvbCwgaG9zdCB9ID0gbG9jYXRpb247XG4gICAgbG9nKCdzdG9tcC5zZXJ2aWNlOiAnLCBgcHJvdG9jb2wgaXMgJHtwcm90b2NvbH0saG9zdCBpcyAke2hvc3R9YCk7XG4gICAgaWYgKHByb3RvY29sLmluY2x1ZGVzKCdodHRwJykgJiYgIXByb3RvY29sLmluY2x1ZGVzKCdodHRwcycpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5icm9rZXJVUkwgPSBgd3M6Ly8ke2hvc3R9JHt0aGlzLmNvbmZpZy5icm9rZXJVUkx9YDtcbiAgICB9XG4gICAgaWYgKHByb3RvY29sLmluY2x1ZGVzKCdodHRwcycpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5icm9rZXJVUkwgPSBgd3NzOi8vJHtob3N0fSR7dGhpcy5jb25maWcuYnJva2VyVVJMfWA7XG4gICAgfVxuICAgIGxvZygnc3RvbXAuc2VydmljZTogJywgYGNvbmZpZyBpcyAke3RoaXMuY29uZmlnfWApO1xuICAgIHRoaXMucnhTdG9tcC5jb25maWd1cmUodGhpcy5jb25maWcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bkxpc3RlbigpO1xuICB9XG5cbiAgbGlzdGVuKCk6IHZvaWQge1xuICAgIHRoaXMudXNlckNoYW5uZWwoKS5zdWJzY3JpYmUoKG1lc3NhZ2U6IElNZXNzYWdlKSA9PiB7XG4gICAgICBjb25zdCBib2R5ID0gSlNPTi5wYXJzZShtZXNzYWdlLmJvZHkpO1xuICAgICAgdGhpcy5ub3RpZnlTZXJ2aWNlLm5vdGlmeVdpdGhIdG1sKGJvZHkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2dvdXRDaGFubmVsKCkuc3Vic2NyaWJlKChtZXNzYWdlOiBJTWVzc2FnZSkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IEpTT04ucGFyc2UobWVzc2FnZS5ib2R5KTtcbiAgICAgIHRoaXMubm90aWZ5U2VydmljZS5ub3RpZnkoYm9keSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSBgJHt0aGlzLmNvbmZpZz8uYmFzZVVybH0vY2FzLXByb3h5L2FwcC9sb2dvdXRgO1xuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBsb2dvdXRDaGFubmVsKCk6IE9ic2VydmFibGU8SU1lc3NhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5yeFN0b21wIS53YXRjaChgL3RvcGljL2xheW91dF94eF8ke3RoaXMudXNlcj8udXNlcm5hbWV9YCkucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpO1xuICB9XG5cbiAgdXNlckNoYW5uZWwoKTogT2JzZXJ2YWJsZTxJTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLnJ4U3RvbXAhLndhdGNoKGAvdG9waWMvbGF5b3V0XyR7dGhpcy51c2VyPy51c2VybmFtZX1gKS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSk7XG4gIH1cblxuICB1bkxpc3RlbigpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5yeFN0b21wIS5kZWFjdGl2YXRlKCkudGhlbigpO1xuICB9XG5cbiAgcHVibGlzaChwYXJhbWV0ZXJzOiBJUnhTdG9tcFB1Ymxpc2hQYXJhbXMpOiB2b2lkIHtcbiAgICB0aGlzLnJ4U3RvbXAhLnB1Ymxpc2gocGFyYW1ldGVycyk7XG4gIH1cblxuICB3YXRjaChkZXN0aW5hdGlvbjogc3RyaW5nLCBoZWFkZXJzPzogU3RvbXBIZWFkZXJzKTogT2JzZXJ2YWJsZTxJTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLnJ4U3RvbXAhLndhdGNoKGRlc3RpbmF0aW9uLCBoZWFkZXJzKTtcbiAgfVxufVxuIl19