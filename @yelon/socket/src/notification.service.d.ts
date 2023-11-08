import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Message } from './interface';
import * as i0 from "@angular/core";
export declare class NotificationService {
    private notifyService;
    constructor(notifyService: NzNotificationService);
    notify(message: Message): void;
    notifyWithHtml(message: Message): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationService>;
}
