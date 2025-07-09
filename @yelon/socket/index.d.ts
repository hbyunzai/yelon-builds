import { YunzaiSocketConfig, YunzaiConfigService, YunzaiUser } from '@yelon/util';
import * as i0 from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import { IRxStompPublishParams } from '@stomp/rx-stomp/esm6/i-rx-stomp-publish-params';
import { IMessage, StompHeaders } from '@stomp/stompjs';

declare const SOCKET_DEFAULT_CONFIG: YunzaiSocketConfig;
declare function mergeSocketConfig(srv: YunzaiConfigService): YunzaiSocketConfig;

interface Message {
    title?: string;
    content?: string;
    href?: string;
    type?: string;
}
interface MessageWithIcon extends Message {
    icon?: string;
}
interface MessageWithUser extends Message {
    useruri?: string;
}

declare class StompService implements OnDestroy {
    config: YunzaiSocketConfig;
    rxStomp: RxStomp;
    user?: YunzaiUser;
    destroy$: Subject<unknown>;
    private configService;
    private notifyService;
    private win;
    private document;
    constructor();
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

declare class NotificationService {
    private notifyService;
    notify(message: Message): void;
    notifyWithHtml(message: Message): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationService>;
}

export { NotificationService, SOCKET_DEFAULT_CONFIG, StompService, mergeSocketConfig };
export type { Message, MessageWithIcon, MessageWithUser };
