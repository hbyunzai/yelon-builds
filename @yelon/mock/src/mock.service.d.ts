import { OnDestroy } from '@angular/core';
import { YunzaiConfigService, YunzaiMockConfig } from '@yelon/util/config';
import { MockCachedRule, MockOptions, MockRule } from './interface';
import * as i0 from "@angular/core";
export declare class MockService implements OnDestroy {
    private cached;
    readonly config: YunzaiMockConfig;
    constructor(cogSrv: YunzaiConfigService, options?: MockOptions);
    /**
     * Reset request data
     *
     * 重新设置请求数据
     */
    setData(data: any): void;
    private applyMock;
    private realApplyMock;
    private genRule;
    private outputError;
    getRule(method: string, url: string): MockRule | null;
    clearCache(): void;
    get rules(): MockCachedRule[];
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockService>;
}
