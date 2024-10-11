import { TemplateRef } from '@angular/core';
import { YunzaiProfile } from '@yelon/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class YunzaiLayoutWebsite01Component {
    logoSrc?: string | NzSafeAny;
    logoAlt?: string;
    slogan?: string;
    contentTpl?: TemplateRef<void> | NzSafeAny;
    private readonly tokenService;
    private readonly configService;
    private readonly startupSrv;
    private readonly win;
    get _logoSrc(): string | NzSafeAny;
    get _logoAlt(): string;
    get _slogan(): string;
    get _contentTpl(): TemplateRef<void> | NzSafeAny;
    get _username(): string;
    get isLogin(): boolean;
    get _links(): YunzaiProfile[];
    login(): void;
    logout(): void;
    to(url?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutWebsite01Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutWebsite01Component, "yunzai-layout-website-01", never, { "logoSrc": { "alias": "logoSrc"; "required": false; }; "logoAlt": { "alias": "logoAlt"; "required": false; }; "slogan": { "alias": "slogan"; "required": false; }; "contentTpl": { "alias": "contentTpl"; "required": false; }; }, {}, never, never, true, never>;
}
