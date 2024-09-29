import * as i1$1 from '@yelon/util';
import { log, useLocalStorageUser, WINDOW } from '@yelon/util';
import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, isDevMode, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import * as i1 from 'ng-zorro-antd/notification';

const SOCKET_DEFAULT_CONFIG = {
    baseUrl: '/backstage',
    connectHeaders: {
        login: 'guest',
        passcode: 'guest'
    },
    brokerURL: '/websocket/ws/',
    heartbeatIncoming: 1000 * 60,
    heartbeatOutgoing: 1000 * 60,
    reconnectDelay: 30000000,
    debug: (msg) => {
        log(msg);
    }
};
function mergeSocketConfig(srv) {
    return srv.merge('socket', SOCKET_DEFAULT_CONFIG);
}

class NotificationService {
    constructor(notifyService) {
        this.notifyService = notifyService;
    }
    notify(message) {
        this.notifyService.create(message.type, message.title, message.content);
    }
    notifyWithHtml(message) {
        this.notifyService.create(message.type, message.title, `<a href=${message.href}>${message.content}</a>`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: NotificationService, deps: [{ token: i1.NzNotificationService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: NotificationService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: NotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.NzNotificationService }] });

class StompService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: StompService, deps: [{ token: i1$1.YunzaiConfigService }, { token: i0.Injector }, { token: NotificationService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: StompService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: StompService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1$1.YunzaiConfigService }, { type: i0.Injector }, { type: NotificationService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NotificationService, SOCKET_DEFAULT_CONFIG, StompService, mergeSocketConfig };
//# sourceMappingURL=socket.mjs.map
