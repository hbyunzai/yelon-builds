import { Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CacheService } from '@yelon/cache';
import { _HttpClient } from '@yelon/theme';
import { YzI18NService } from '../yz.i18n.service';
export declare enum TOPIC {
    FULL = 0,
    OWN = 1,
    EVERY = 2
}
export interface HeaderTopic {
    attribute: any;
    children: HeaderTopic[];
    intro: string;
    key: string;
    name: string;
    target: string;
    auth: boolean;
    url: string;
    version: string;
}
export declare class YzHeaderApplicationComponent implements OnInit, OnDestroy {
    private inject;
    private cacheService;
    private i18n;
    private http;
    T: typeof TOPIC;
    active: boolean;
    topicData: HeaderTopic[];
    listData: HeaderTopic[];
    topic: TOPIC;
    choosed: HeaderTopic | undefined;
    searchValue: string | null;
    subs: Subscription[];
    constructor(inject: Injector, cacheService: CacheService, i18n: YzI18NService, http: _HttpClient);
    ngOnInit(): void;
    ngOnDestroy(): void;
    diffChange(flag?: boolean): void;
    initTopic(topic: TOPIC): void;
    full(): void;
    own(): void;
    every(e: HeaderTopic): void;
    onSearch(): void;
    open(topic: HeaderTopic): void;
}
