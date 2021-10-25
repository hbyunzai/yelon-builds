import { Injector } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import { IRxStompPublishParams } from '@stomp/rx-stomp/esm6/i-rx-stomp-publish-params';
import { IMessage, StompHeaders } from '@stomp/stompjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CacheService } from '@yelon/cache';
import { YunzaiBusinessConfig, YunzaiConfigService, YunzaiStompConfig } from '@yelon/util';
export interface StompMessage {
    title?: string;
    content?: string;
    href?: string;
    type?: string;
}
export interface IconStompMessage extends StompMessage {
    icon?: string;
}
export interface UserStompMessage extends StompMessage {
    useruri?: string;
}
export declare class YzStompService {
    private csr;
    private cache;
    private injector;
    private notification;
    config: YunzaiStompConfig;
    bisConfig: YunzaiBusinessConfig;
    rxStomp: RxStomp;
    user: NzSafeAny;
    subs: Subscription[];
    constructor(csr: YunzaiConfigService, cache: CacheService, injector: Injector, notification: NzNotificationService);
    listen(): void;
    createNotification(message: StompMessage): void;
    logoutNotification(message: StompMessage): void;
    unListen(): void;
    publish(parameters: IRxStompPublishParams): void;
    watch(destination: string, headers?: StompHeaders): Observable<IMessage>;
}
