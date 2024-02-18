import { Injector, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import { IRxStompPublishParams } from '@stomp/rx-stomp/esm6/i-rx-stomp-publish-params';
import { IMessage, StompHeaders } from '@stomp/stompjs';
import { YunzaiConfigService, YunzaiSocketConfig, YunzaiUser } from '@yelon/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NotificationService } from './notification.service';
import * as i0 from "@angular/core";
export declare class StompService implements OnDestroy {
    private configService;
    private injector;
    private notifyService;
    private win;
    config: YunzaiSocketConfig;
    rxStomp: RxStomp;
    user?: YunzaiUser;
    destroy$: Subject<unknown>;
    constructor(configService: YunzaiConfigService, injector: Injector, notifyService: NotificationService, win: NzSafeAny);
    ngOnDestroy(): void;
    listen(): void;
    logoutChannel(): Observable<IMessage>;
    userChannel(): Observable<IMessage>;
    unListen(): void;
    publish(parameters: IRxStompPublishParams): void;
    watch(destination: string, headers?: StompHeaders): Observable<IMessage>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StompService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StompService>;
}
