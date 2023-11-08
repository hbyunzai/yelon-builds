import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SFComponent } from '@yelon/form';
import { YunzaiFriendGroupService } from './yunzai-friend-group.service';
import { YunzaiFriendGroup, YunzaiFriendGroupProps, YunzaiFriendGroupState } from './yunzai-friend-group.types';
import * as i0 from "@angular/core";
export declare class YunzaiFriendGroupComponent implements OnInit, AfterViewInit, OnDestroy {
    private friendsService;
    props?: YunzaiFriendGroupProps;
    readonly onQueryComplete: EventEmitter<YunzaiFriendGroup[]>;
    readonly onSelect: EventEmitter<YunzaiFriendGroup>;
    sf: SFComponent;
    private $destroy;
    state: YunzaiFriendGroupState;
    get isWrapped(): boolean;
    get data(): YunzaiFriendGroup[];
    constructor(friendsService: YunzaiFriendGroupService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    hookFormChange(): void;
    onItemClick(item: YunzaiFriendGroup): void;
    query(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YunzaiFriendGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YunzaiFriendGroupComponent, "yunzai-friend-group", never, { "props": { "alias": "props"; "required": false; }; }, { "onQueryComplete": "onQueryComplete"; "onSelect": "onSelect"; }, never, never, false, never>;
}
