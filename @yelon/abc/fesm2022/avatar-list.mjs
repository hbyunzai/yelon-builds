import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Optional, ContentChildren, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputNumber } from '@yelon/util/decorator';
import * as i1 from '@angular/cdk/bidi';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/avatar';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import * as i4 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

class AvatarListItemComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: AvatarListItemComponent, selector: "avatar-list-item, [avatar-list-item]", inputs: { src: "src", text: "text", icon: "icon", tips: "tips" }, exportAs: ["avatarListItem"], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'avatar-list-item, [avatar-list-item]',
                    exportAs: 'avatarListItem',
                    template: `<ng-content></ng-content>`,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { src: [{
                type: Input
            }], text: [{
                type: Input
            }], icon: [{
                type: Input
            }], tips: [{
                type: Input
            }] } });

class AvatarListComponent {
    set size(value) {
        this.cls = `avatar-list__item${value === 'default' ? '' : ` avatar-list__${value}`}`;
        switch (value) {
            case 'large':
            case 'small':
            case 'default':
                this.avatarSize = value;
                break;
            default:
                this.avatarSize = 'small';
                break;
        }
    }
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.inited = false;
        this.dir$ = this.directionality.change?.pipe(takeUntilDestroyed());
        this.items = [];
        this.exceedCount = 0;
        this.dir = 'ltr';
        this.cls = '';
        this.avatarSize = 'default';
        this.maxLength = 0;
        this.excessItemsStyle = null;
    }
    gen() {
        const { _items } = this;
        const maxLength = this.maxLength > 0 ? this.maxLength : _items.length;
        const numOfChildren = _items.length;
        const numToShow = maxLength > 0 && maxLength >= numOfChildren ? numOfChildren : maxLength;
        this.items = _items.toArray().slice(0, numToShow);
        this.exceedCount = numToShow < numOfChildren ? numOfChildren - maxLength : 0;
        this.cdr.detectChanges();
    }
    ngAfterViewInit() {
        this.dir = this.directionality.value;
        this.dir$.subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.gen();
        this.inited = true;
    }
    ngOnChanges() {
        if (this.inited) {
            this.gen();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: AvatarListComponent, selector: "avatar-list", inputs: { size: "size", maxLength: "maxLength", excessItemsStyle: "excessItemsStyle" }, host: { properties: { "class.avatar-list": "true", "class.avatar-list-rtl": "dir === 'rtl'" } }, queries: [{ propertyName: "_items", predicate: AvatarListItemComponent }], exportAs: ["avatarList"], usesOnChanges: true, ngImport: i0, template: "<ul class=\"avatar-list__wrap\">\n  <li *ngFor=\"let i of items\" [ngClass]=\"cls\">\n    <nz-avatar\n      *ngIf=\"i.tips\"\n      nz-tooltip\n      [nzTooltipTitle]=\"i.tips\"\n      [nzSrc]=\"i.src\"\n      [nzText]=\"i.text\"\n      [nzIcon]=\"i.icon\"\n      [nzSize]=\"avatarSize\"\n    />\n    <nz-avatar *ngIf=\"!i.tips\" [nzSrc]=\"i.src\" [nzText]=\"i.text\" [nzIcon]=\"i.icon\" [nzSize]=\"avatarSize\" />\n  </li>\n  <li *ngIf=\"exceedCount > 0\" [ngClass]=\"cls\">\n    <nz-avatar [nzSize]=\"avatarSize\" style=\"cursor: auto\" [ngStyle]=\"excessItemsStyle\" [nzText]=\"'+' + exceedCount\" />\n  </li>\n</ul>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i3.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }, { kind: "directive", type: i4.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    InputNumber()
], AvatarListComponent.prototype, "maxLength", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'avatar-list', exportAs: 'avatarList', host: {
                        '[class.avatar-list]': 'true',
                        '[class.avatar-list-rtl]': `dir === 'rtl'`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ul class=\"avatar-list__wrap\">\n  <li *ngFor=\"let i of items\" [ngClass]=\"cls\">\n    <nz-avatar\n      *ngIf=\"i.tips\"\n      nz-tooltip\n      [nzTooltipTitle]=\"i.tips\"\n      [nzSrc]=\"i.src\"\n      [nzText]=\"i.text\"\n      [nzIcon]=\"i.icon\"\n      [nzSize]=\"avatarSize\"\n    />\n    <nz-avatar *ngIf=\"!i.tips\" [nzSrc]=\"i.src\" [nzText]=\"i.text\" [nzIcon]=\"i.icon\" [nzSize]=\"avatarSize\" />\n  </li>\n  <li *ngIf=\"exceedCount > 0\" [ngClass]=\"cls\">\n    <nz-avatar [nzSize]=\"avatarSize\" style=\"cursor: auto\" [ngStyle]=\"excessItemsStyle\" [nzText]=\"'+' + exceedCount\" />\n  </li>\n</ul>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [AvatarListItemComponent, { descendants: false }]
            }], size: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], excessItemsStyle: [{
                type: Input
            }] } });

const COMPONENTS = [AvatarListComponent, AvatarListItemComponent];
class AvatarListModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: AvatarListModule, declarations: [AvatarListComponent, AvatarListItemComponent], imports: [CommonModule, NzAvatarModule, NzToolTipModule], exports: [AvatarListComponent, AvatarListItemComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListModule, imports: [CommonModule, NzAvatarModule, NzToolTipModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AvatarListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzAvatarModule, NzToolTipModule],
                    declarations: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarListComponent, AvatarListItemComponent, AvatarListModule };
//# sourceMappingURL=avatar-list.mjs.map
