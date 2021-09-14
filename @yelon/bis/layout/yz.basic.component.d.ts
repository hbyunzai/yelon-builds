import { OnInit } from '@angular/core';
import { CacheService } from '@yelon/cache';
import { LayoutDefaultOptions } from '@yelon/theme/layout-default';
export declare class YzLayoutBasicComponent implements OnInit {
    private cacheService;
    options: LayoutDefaultOptions;
    intro: string;
    text: string;
    icon: string;
    constructor(cacheService: CacheService);
    ngOnInit(): void;
}
