import { OnDestroy, OnInit } from '@angular/core';
import { CacheService } from '@yelon/cache';
import { LayoutDefaultOptions } from '@yelon/theme/layout-default';
import { YzStompService } from './yz.stomp.service';
export declare class YzLayoutBasicComponent implements OnInit, OnDestroy {
    private cacheService;
    private yzStompService;
    options: LayoutDefaultOptions;
    intro: string;
    text: string;
    icon: string;
    constructor(cacheService: CacheService, yzStompService: YzStompService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
