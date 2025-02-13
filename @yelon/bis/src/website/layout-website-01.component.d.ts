import { TemplateRef } from '@angular/core';
import { YunzaiProfile } from '@yelon/util';
import * as i0 from "@angular/core";
export declare class YunzaiLayoutWebsite01Component {
    logoSrc?: string | any;
    logoAlt?: string;
    slogan?: string;
    contentTpl?: TemplateRef<void> | any;
    private readonly tokenService;
    private readonly configService;
    private readonly startupSrv;
    private readonly win;
    get _logoSrc(): string | any;
    get _logoAlt(): string;
    get _slogan(): string;
    get _contentTpl(): TemplateRef<void> | any;
    get _username(): string;
    get isLogin(): boolean;
    get _links(): YunzaiProfile[];
    login(): void;
    logout(): void;
    to(url?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiLayoutWebsite01Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiLayoutWebsite01Component, "yunzai-layout-website-01", never, { "logoSrc": { "alias": "logoSrc"; "required": false; }; "logoAlt": { "alias": "logoAlt"; "required": false; }; "slogan": { "alias": "slogan"; "required": false; }; "contentTpl": { "alias": "contentTpl"; "required": false; }; }, {}, never, never, true, never>;
}
