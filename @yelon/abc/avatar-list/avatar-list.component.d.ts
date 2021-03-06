import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterViewInit, ChangeDetectorRef, OnChanges, OnDestroy } from '@angular/core';
import type { NgStyleInterface, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NumberInput } from '@yelon/util/decorator';
import { AvatarListItemComponent } from './avatar-list-item.component';
import * as i0 from "@angular/core";
export declare class AvatarListComponent implements AfterViewInit, OnChanges, OnDestroy {
    private cdr;
    private directionality;
    static ngAcceptInputType_maxLength: NumberInput;
    private inited;
    private _items;
    private destroy$;
    items: AvatarListItemComponent[];
    exceedCount: number;
    dir: Direction;
    cls: string;
    avatarSize: NzSizeLDSType;
    set size(value: 'large' | 'small' | 'mini' | 'default');
    maxLength: number;
    excessItemsStyle: NgStyleInterface | null;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality);
    private gen;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarListComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarListComponent, "avatar-list", ["avatarList"], { "size": "size"; "maxLength": "maxLength"; "excessItemsStyle": "excessItemsStyle"; }, {}, ["_items"], never>;
}
