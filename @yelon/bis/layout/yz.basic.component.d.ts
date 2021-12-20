import { OnDestroy, OnInit } from '@angular/core';
import { CacheService } from '@yelon/cache';
import { LayoutDefaultOptions, LayoutService } from '@yelon/theme/layout-default';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { YzStompService } from './yz.stomp.service';
export declare class YzLayoutBasicComponent implements OnInit, OnDestroy {
    private cacheService;
    private yzStompService;
    private layoutService;
    options: LayoutDefaultOptions;
    intro: string;
    text: string;
    icon: string;
    showReuseTab: boolean;
    showHeader: boolean;
    showSider: boolean;
    get reuseStyleSheet(): NzSafeAny;
    constructor(cacheService: CacheService, yzStompService: YzStompService, layoutService: LayoutService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
