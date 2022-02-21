import { Injector, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ITokenService } from '@yelon/auth';
import { CacheService } from '@yelon/cache';
import { YunzaiConfigService } from '@yelon/util';
import * as i0 from "@angular/core";
export interface UserLink {
    icon: string;
    name: string;
    url: string;
}
export declare class YzHeaderUserComponent implements OnInit {
    private injector;
    private msg;
    private tokenService;
    private configService;
    private cacheService;
    private config;
    constructor(injector: Injector, msg: NzMessageService, tokenService: ITokenService, configService: YunzaiConfigService, cacheService: CacheService);
    icon: string;
    username: string;
    menus: UserLink[];
    ngOnInit(): void;
    logout(): void;
    to(href: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YzHeaderUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YzHeaderUserComponent, "yz-header-user", never, {}, {}, never, never>;
}
