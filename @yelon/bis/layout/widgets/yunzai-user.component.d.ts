import { Injector, OnInit } from '@angular/core';
import { ITokenService } from '@yelon/auth';
import { YunzaiConfigService } from '@yelon/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as i0 from "@angular/core";
export interface UserLink {
    icon: string;
    name: string;
    url: string;
}
export declare class YunzaiUserComponent implements OnInit {
    private injector;
    private msg;
    private tokenService;
    private configService;
    private config;
    constructor(injector: Injector, msg: NzMessageService, tokenService: ITokenService, configService: YunzaiConfigService);
    icon: string;
    username: string;
    menus: UserLink[];
    ngOnInit(): void;
    logout(): void;
    to(href: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiUserComponent, "yunzai-user", never, {}, {}, never, never, false, never>;
}
