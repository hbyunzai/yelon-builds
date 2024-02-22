import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export interface UserLink {
    icon: string;
    name: string;
    url: string;
}
export declare class YunzaiHeaderUserComponent implements OnInit {
    private readonly msg;
    private readonly tokenService;
    private readonly configService;
    private readonly config;
    private readonly win;
    icon: string;
    username: string;
    menus: UserLink[];
    ngOnInit(): void;
    logout(): void;
    to(href: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiHeaderUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiHeaderUserComponent, "yunzai-header-user", never, {}, {}, never, never, true, never>;
}
