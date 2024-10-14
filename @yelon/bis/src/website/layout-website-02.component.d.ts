import { TemplateRef } from '@angular/core';
import { YunzaiProfile } from '@yelon/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class YunzaiLayoutWebsite02Component {
    logoSrc?: string | NzSafeAny;
    logoAlt?: string;
    userMenuShow?: boolean;
    slogan?: TemplateRef<void> | NzSafeAny;
    contentTpl?: TemplateRef<void> | NzSafeAny;
    private readonly tokenService;
    private readonly configService;
    private readonly startupSrv;
    private readonly win;
    get _logoSrc(): string | NzSafeAny;
    get _logoAlt(): string;
    get _userMenuShow(): boolean;
    get _slogan(): TemplateRef<void> | NzSafeAny;
    get _contentTpl(): TemplateRef<void> | NzSafeAny;
    get _username(): string;
    get _avatar(): string | undefined;
    get isLogin(): boolean;
    get _links(): YunzaiProfile[];
    login(): void;
    logout(): void;
    to(url?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutWebsite02Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutWebsite02Component, "yunzai-layout-website-02", never, { "logoSrc": { "alias": "logoSrc"; "required": false; }; "logoAlt": { "alias": "logoAlt"; "required": false; }; "userMenuShow": { "alias": "userMenuShow"; "required": false; }; "slogan": { "alias": "slogan"; "required": false; }; "contentTpl": { "alias": "contentTpl"; "required": false; }; }, {}, never, never, true, never>;
}
