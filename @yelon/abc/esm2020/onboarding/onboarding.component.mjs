import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "ng-zorro-antd/button";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/popover";
import * as i5 from "ng-zorro-antd/core/no-animation";
import * as i6 from "ng-zorro-antd/core/outlet";
import * as i7 from "ng-zorro-antd/core/transition-patch";
export class OnboardingComponent {
    constructor(el, doc, platform, cdr) {
        this.el = el;
        this.doc = doc;
        this.platform = platform;
        this.cdr = cdr;
        this.active = 0;
        this.max = 0;
        this.op = new EventEmitter();
        this.running = false;
        this.dir = 'ltr';
    }
    get first() {
        return this.active === 0;
    }
    get last() {
        return this.active === this.max - 1;
    }
    _getDoc() {
        return this.doc;
    }
    _getWin() {
        return this._getDoc().defaultView || window;
    }
    getLightData() {
        const doc = this._getDoc();
        const win = this._getWin();
        const el = doc.querySelector(this.item.selectors);
        if (!el) {
            return null;
        }
        const scrollTop = win.scrollY || doc.documentElement.scrollTop || doc.body.scrollTop;
        const scrollLeft = win.scrollX || doc.documentElement.scrollLeft || doc.body.scrollLeft;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollTop;
        const left = rect.left + scrollLeft;
        const padding = 8;
        const needPadding = top > padding && left > padding;
        const offsetPos = needPadding ? padding : 0;
        const offsetWH = needPadding ? padding * 2 : 0;
        return {
            top: top - offsetPos,
            left: left - offsetPos,
            width: rect.width + offsetWH,
            height: rect.height + offsetWH,
            el,
            clientWidth: doc.body.clientWidth,
            clientHeight: doc.body.clientHeight
        };
    }
    ngAfterViewInit() {
        // Waiting https://github.com/NG-ZORRO/ng-zorro-antd/issues/6491
        this.popover.component.onClickOutside = () => { };
    }
    scroll(pos) {
        this.prevSelectorEl = pos.el;
        const scrollY = pos.top - (pos.clientHeight - pos.height) / 2;
        this._getWin().scrollTo({ top: scrollY });
        this.updatePrevElStatus(true);
    }
    updateRunning(status) {
        this.running = status;
        this.cdr.detectChanges();
        if (!status) {
            this.updatePosition();
        }
    }
    updatePosition() {
        if (!this.platform.isBrowser) {
            return;
        }
        const pos = this.getLightData();
        if (pos == null) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.warn(`Did not matches selectors [${this.item.selectors}]`);
            }
            return;
        }
        const lightStyle = this.el.nativeElement.querySelector('.onboarding__light').style;
        lightStyle.top = `${pos.top}px`;
        lightStyle.left = `${pos.left}px`;
        lightStyle.width = `${pos.width}px`;
        lightStyle.height = `${pos.height}px`;
        this.updatePrevElStatus(false);
        this.scroll(pos);
    }
    updatePrevElStatus(status) {
        if (this.prevSelectorEl) {
            this.prevSelectorEl.classList[status ? 'add' : 'remove']('onboarding__light-el');
        }
    }
    to(type) {
        this.op.emit(type);
    }
    handleMask() {
        if (this.config.maskClosable === true) {
            this.popover.component.hide();
            this.to('done');
        }
    }
    ngOnDestroy() {
        clearTimeout(this.time);
        this.updatePrevElStatus(false);
    }
}
OnboardingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: OnboardingComponent, deps: [{ token: i0.ElementRef }, { token: DOCUMENT, optional: true }, { token: i1.Platform }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
OnboardingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: OnboardingComponent, selector: "onboarding", host: { properties: { "class.onboarding": "true", "class.onboarding-rtl": "dir === 'rtl'", "attr.data-onboarding-active": "active" } }, viewQueries: [{ propertyName: "popover", first: true, predicate: ["popover"], descendants: true }], ngImport: i0, template: "<div *ngIf=\"!running && config.mask\" class=\"onboarding__mask\" (click)=\"handleMask()\"></div>\n<div\n  *ngIf=\"item\"\n  class=\"onboarding__light\"\n  [class.onboarding__light-hide]=\"running\"\n  [attr.style]=\"item.lightStyle\"\n  nz-popover\n  #popover=\"nzPopover\"\n  [nzPopoverTitle]=\"item.title\"\n  [nzPopoverContent]=\"content\"\n  [nzPopoverVisible]=\"!running\"\n  [nzPopoverTrigger]=\"null\"\n  [nzPopoverPlacement]=\"item.position\"\n  [nzPopoverOverlayClassName]=\"item.className\"\n  [nzPopoverOverlayStyle]=\"{ 'max-width.px': item.width, direction: dir }\"\n  [nzNoAnimation]=\"true\"\n></div>\n<ng-template #content>\n  <ng-container *nzStringTemplateOutlet=\"item.content\">\n    <div [innerHTML]=\"item.content\"></div>\n  </ng-container>\n  <div class=\"flex-center-between onboarding__footer\">\n    <span class=\"onboarding__total\">\n      <ng-container *ngIf=\"config.showTotal\">{{ active + 1 }}/{{ max }}</ng-container>\n    </span>\n    <div class=\"onboarding__btns\">\n      <a\n        *ngIf=\"!last && item.skip !== null && item.skip !== undefined\"\n        nz-button\n        nzType=\"link\"\n        (click)=\"to('skip')\"\n        nzSize=\"small\"\n        data-btnType=\"skip\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.skip\">{{ item.skip }}</ng-container>\n      </a>\n      <a *ngIf=\"!first && item.prev !== null\" nz-button (click)=\"to('prev')\" nzSize=\"small\" data-btnType=\"prev\">\n        <ng-container *nzStringTemplateOutlet=\"item.prev\">{{ item.prev }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"!last && item.next !== null && item.next !== undefined\"\n        nz-button\n        (click)=\"to('next')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"next\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.next\">{{ item.next }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"last && item.done !== null && item.done !== undefined\"\n        nz-button\n        (click)=\"to('done')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"done\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.done\">{{ item.done }}</ng-container>\n      </a>\n    </div>\n  </div>\n</ng-template>\n", components: [{ type: i2.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzPopoverDirective, selector: "[nz-popover]", inputs: ["nzPopoverArrowPointAtCenter", "nzPopoverTitle", "nzPopoverContent", "nz-popover", "nzPopoverTrigger", "nzPopoverPlacement", "nzPopoverOrigin", "nzPopoverVisible", "nzPopoverMouseEnterDelay", "nzPopoverMouseLeaveDelay", "nzPopoverOverlayClassName", "nzPopoverOverlayStyle", "nzPopoverBackdrop"], outputs: ["nzPopoverVisibleChange"], exportAs: ["nzPopover"] }, { type: i5.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i7.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: OnboardingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'onboarding', host: {
                        '[class.onboarding]': `true`,
                        '[class.onboarding-rtl]': `dir === 'rtl'`,
                        '[attr.data-onboarding-active]': `active`
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"!running && config.mask\" class=\"onboarding__mask\" (click)=\"handleMask()\"></div>\n<div\n  *ngIf=\"item\"\n  class=\"onboarding__light\"\n  [class.onboarding__light-hide]=\"running\"\n  [attr.style]=\"item.lightStyle\"\n  nz-popover\n  #popover=\"nzPopover\"\n  [nzPopoverTitle]=\"item.title\"\n  [nzPopoverContent]=\"content\"\n  [nzPopoverVisible]=\"!running\"\n  [nzPopoverTrigger]=\"null\"\n  [nzPopoverPlacement]=\"item.position\"\n  [nzPopoverOverlayClassName]=\"item.className\"\n  [nzPopoverOverlayStyle]=\"{ 'max-width.px': item.width, direction: dir }\"\n  [nzNoAnimation]=\"true\"\n></div>\n<ng-template #content>\n  <ng-container *nzStringTemplateOutlet=\"item.content\">\n    <div [innerHTML]=\"item.content\"></div>\n  </ng-container>\n  <div class=\"flex-center-between onboarding__footer\">\n    <span class=\"onboarding__total\">\n      <ng-container *ngIf=\"config.showTotal\">{{ active + 1 }}/{{ max }}</ng-container>\n    </span>\n    <div class=\"onboarding__btns\">\n      <a\n        *ngIf=\"!last && item.skip !== null && item.skip !== undefined\"\n        nz-button\n        nzType=\"link\"\n        (click)=\"to('skip')\"\n        nzSize=\"small\"\n        data-btnType=\"skip\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.skip\">{{ item.skip }}</ng-container>\n      </a>\n      <a *ngIf=\"!first && item.prev !== null\" nz-button (click)=\"to('prev')\" nzSize=\"small\" data-btnType=\"prev\">\n        <ng-container *nzStringTemplateOutlet=\"item.prev\">{{ item.prev }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"!last && item.next !== null && item.next !== undefined\"\n        nz-button\n        (click)=\"to('next')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"next\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.next\">{{ item.next }}</ng-container>\n      </a>\n      <a\n        *ngIf=\"last && item.done !== null && item.done !== undefined\"\n        nz-button\n        (click)=\"to('done')\"\n        nzType=\"primary\"\n        nzSize=\"small\"\n        data-btnType=\"done\"\n      >\n        <ng-container *nzStringTemplateOutlet=\"item.done\">{{ item.done }}</ng-container>\n      </a>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Platform }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { popover: [{
                type: ViewChild,
                args: ['popover', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hYmMvb25ib2FyZGluZy9vbmJvYXJkaW5nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9vbmJvYXJkaW5nL29uYm9hcmRpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQTZCdkIsTUFBTSxPQUFPLG1CQUFtQjtJQTRCOUIsWUFDVSxFQUEyQixFQUNHLEdBQWMsRUFDNUMsUUFBa0IsRUFDbEIsR0FBc0I7UUFIdEIsT0FBRSxHQUFGLEVBQUUsQ0FBeUI7UUFDRyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQzVDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUEzQmhDLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ0MsT0FBRSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQ25ELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsUUFBRyxHQUFjLEtBQUssQ0FBQztJQXdCcEIsQ0FBQztJQXJCSixJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLE9BQU87UUFDYixPQUFPLElBQUksQ0FB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LENBQUM7SUFDckIsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOztnSEE5SFUsbUJBQW1CLDRDQThCUixRQUFRO29HQTlCbkIsbUJBQW1CLDhSQzVDaEMsMHRFQThEQTsyRkRsQmEsbUJBQW1CO2tCQVovQixTQUFTOytCQUNFLFlBQVksUUFFaEI7d0JBQ0osb0JBQW9CLEVBQUUsTUFBTTt3QkFDNUIsd0JBQXdCLEVBQUUsZUFBZTt3QkFDekMsK0JBQStCLEVBQUUsUUFBUTtxQkFDMUMsdUJBQ29CLEtBQUssbUJBQ1QsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBZ0NsQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFFBQVE7bUdBcEJtQixPQUFPO3NCQUF2RCxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56UG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvcG9wb3Zlcic7XG5cbmltcG9ydCB7IE9uYm9hcmRpbmdDb25maWcsIE9uYm9hcmRpbmdJdGVtLCBPbmJvYXJkaW5nT3BUeXBlIH0gZnJvbSAnLi9vbmJvYXJkaW5nLnR5cGVzJztcblxuaW50ZXJmYWNlIE9uYm9hcmRpbmdMaWdodERhdGEge1xuICBlbDogSFRNTEVsZW1lbnQ7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBjbGllbnRIZWlnaHQ6IG51bWJlcjtcbiAgY2xpZW50V2lkdGg6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb25ib2FyZGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vbmJvYXJkaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mub25ib2FyZGluZ10nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5vbmJvYXJkaW5nLXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJ1thdHRyLmRhdGEtb25ib2FyZGluZy1hY3RpdmVdJzogYGFjdGl2ZWBcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE9uYm9hcmRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIHRpbWU6IE56U2FmZUFueTtcbiAgcHJpdmF0ZSBwcmV2U2VsZWN0b3JFbD86IEhUTUxFbGVtZW50O1xuICBjb25maWchOiBPbmJvYXJkaW5nQ29uZmlnO1xuICBpdGVtITogT25ib2FyZGluZ0l0ZW07XG4gIGFjdGl2ZSA9IDA7XG4gIG1heCA9IDA7XG4gIHJlYWRvbmx5IG9wID0gbmV3IEV2ZW50RW1pdHRlcjxPbmJvYXJkaW5nT3BUeXBlPigpO1xuICBydW5uaW5nID0gZmFsc2U7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIEBWaWV3Q2hpbGQoJ3BvcG92ZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSBwb3BvdmVyITogTnpQb3BvdmVyRGlyZWN0aXZlO1xuXG4gIGdldCBmaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmUgPT09IDA7XG4gIH1cblxuICBnZXQgbGFzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmUgPT09IHRoaXMubWF4IC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERvYygpOiBEb2N1bWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZG9jO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0V2luKCk6IFdpbmRvdyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldERvYygpLmRlZmF1bHRWaWV3IHx8IHdpbmRvdztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnksXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBwcml2YXRlIGdldExpZ2h0RGF0YSgpOiBPbmJvYXJkaW5nTGlnaHREYXRhIHwgbnVsbCB7XG4gICAgY29uc3QgZG9jID0gdGhpcy5fZ2V0RG9jKCk7XG4gICAgY29uc3Qgd2luID0gdGhpcy5fZ2V0V2luKCk7XG4gICAgY29uc3QgZWwgPSBkb2MucXVlcnlTZWxlY3Rvcih0aGlzLml0ZW0uc2VsZWN0b3JzKSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW4uc2Nyb2xsWSB8fCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2MuYm9keS5zY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbi5zY3JvbGxYIHx8IGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2MuYm9keS5zY3JvbGxMZWZ0O1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB0b3AgPSByZWN0LnRvcCArIHNjcm9sbFRvcDtcbiAgICBjb25zdCBsZWZ0ID0gcmVjdC5sZWZ0ICsgc2Nyb2xsTGVmdDtcbiAgICBjb25zdCBwYWRkaW5nID0gODtcbiAgICBjb25zdCBuZWVkUGFkZGluZyA9IHRvcCA+IHBhZGRpbmcgJiYgbGVmdCA+IHBhZGRpbmc7XG4gICAgY29uc3Qgb2Zmc2V0UG9zID0gbmVlZFBhZGRpbmcgPyBwYWRkaW5nIDogMDtcbiAgICBjb25zdCBvZmZzZXRXSCA9IG5lZWRQYWRkaW5nID8gcGFkZGluZyAqIDIgOiAwO1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHRvcCAtIG9mZnNldFBvcyxcbiAgICAgIGxlZnQ6IGxlZnQgLSBvZmZzZXRQb3MsXG4gICAgICB3aWR0aDogcmVjdC53aWR0aCArIG9mZnNldFdILFxuICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCArIG9mZnNldFdILFxuICAgICAgZWwsXG4gICAgICBjbGllbnRXaWR0aDogZG9jLmJvZHkuY2xpZW50V2lkdGgsXG4gICAgICBjbGllbnRIZWlnaHQ6IGRvYy5ib2R5LmNsaWVudEhlaWdodFxuICAgIH07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gV2FpdGluZyBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9pc3N1ZXMvNjQ5MVxuICAgIHRoaXMucG9wb3Zlci5jb21wb25lbnQhLm9uQ2xpY2tPdXRzaWRlID0gKCkgPT4ge307XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbChwb3M6IE9uYm9hcmRpbmdMaWdodERhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZTZWxlY3RvckVsID0gcG9zLmVsO1xuICAgIGNvbnN0IHNjcm9sbFkgPSBwb3MudG9wIC0gKHBvcy5jbGllbnRIZWlnaHQgLSBwb3MuaGVpZ2h0KSAvIDI7XG4gICAgdGhpcy5fZ2V0V2luKCkuc2Nyb2xsVG8oeyB0b3A6IHNjcm9sbFkgfSk7XG4gICAgdGhpcy51cGRhdGVQcmV2RWxTdGF0dXModHJ1ZSk7XG4gIH1cblxuICB1cGRhdGVSdW5uaW5nKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMucnVubmluZyA9IHN0YXR1cztcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldExpZ2h0RGF0YSgpO1xuICAgIGlmIChwb3MgPT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYERpZCBub3QgbWF0Y2hlcyBzZWxlY3RvcnMgWyR7dGhpcy5pdGVtLnNlbGVjdG9yc31dYCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlnaHRTdHlsZSA9ICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmdfX2xpZ2h0JykgYXMgSFRNTEVsZW1lbnQpLnN0eWxlO1xuICAgIGxpZ2h0U3R5bGUudG9wID0gYCR7cG9zLnRvcH1weGA7XG4gICAgbGlnaHRTdHlsZS5sZWZ0ID0gYCR7cG9zLmxlZnR9cHhgO1xuICAgIGxpZ2h0U3R5bGUud2lkdGggPSBgJHtwb3Mud2lkdGh9cHhgO1xuICAgIGxpZ2h0U3R5bGUuaGVpZ2h0ID0gYCR7cG9zLmhlaWdodH1weGA7XG5cbiAgICB0aGlzLnVwZGF0ZVByZXZFbFN0YXR1cyhmYWxzZSk7XG4gICAgdGhpcy5zY3JvbGwocG9zKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJldkVsU3RhdHVzKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLnByZXZTZWxlY3RvckVsKSB7XG4gICAgICB0aGlzLnByZXZTZWxlY3RvckVsLmNsYXNzTGlzdFtzdGF0dXMgPyAnYWRkJyA6ICdyZW1vdmUnXSgnb25ib2FyZGluZ19fbGlnaHQtZWwnKTtcbiAgICB9XG4gIH1cblxuICB0byh0eXBlOiBPbmJvYXJkaW5nT3BUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vcC5lbWl0KHR5cGUpO1xuICB9XG5cbiAgaGFuZGxlTWFzaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWcubWFza0Nsb3NhYmxlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnBvcG92ZXIuY29tcG9uZW50IS5oaWRlKCk7XG4gICAgICB0aGlzLnRvKCdkb25lJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZSk7XG4gICAgdGhpcy51cGRhdGVQcmV2RWxTdGF0dXMoZmFsc2UpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiIXJ1bm5pbmcgJiYgY29uZmlnLm1hc2tcIiBjbGFzcz1cIm9uYm9hcmRpbmdfX21hc2tcIiAoY2xpY2spPVwiaGFuZGxlTWFzaygpXCI+PC9kaXY+XG48ZGl2XG4gICpuZ0lmPVwiaXRlbVwiXG4gIGNsYXNzPVwib25ib2FyZGluZ19fbGlnaHRcIlxuICBbY2xhc3Mub25ib2FyZGluZ19fbGlnaHQtaGlkZV09XCJydW5uaW5nXCJcbiAgW2F0dHIuc3R5bGVdPVwiaXRlbS5saWdodFN0eWxlXCJcbiAgbnotcG9wb3ZlclxuICAjcG9wb3Zlcj1cIm56UG9wb3ZlclwiXG4gIFtuelBvcG92ZXJUaXRsZV09XCJpdGVtLnRpdGxlXCJcbiAgW256UG9wb3ZlckNvbnRlbnRdPVwiY29udGVudFwiXG4gIFtuelBvcG92ZXJWaXNpYmxlXT1cIiFydW5uaW5nXCJcbiAgW256UG9wb3ZlclRyaWdnZXJdPVwibnVsbFwiXG4gIFtuelBvcG92ZXJQbGFjZW1lbnRdPVwiaXRlbS5wb3NpdGlvblwiXG4gIFtuelBvcG92ZXJPdmVybGF5Q2xhc3NOYW1lXT1cIml0ZW0uY2xhc3NOYW1lXCJcbiAgW256UG9wb3Zlck92ZXJsYXlTdHlsZV09XCJ7ICdtYXgtd2lkdGgucHgnOiBpdGVtLndpZHRoLCBkaXJlY3Rpb246IGRpciB9XCJcbiAgW256Tm9BbmltYXRpb25dPVwidHJ1ZVwiXG4+PC9kaXY+XG48bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtLmNvbnRlbnRcIj5cbiAgICA8ZGl2IFtpbm5lckhUTUxdPVwiaXRlbS5jb250ZW50XCI+PC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuICA8ZGl2IGNsYXNzPVwiZmxleC1jZW50ZXItYmV0d2VlbiBvbmJvYXJkaW5nX19mb290ZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cIm9uYm9hcmRpbmdfX3RvdGFsXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29uZmlnLnNob3dUb3RhbFwiPnt7IGFjdGl2ZSArIDEgfX0ve3sgbWF4IH19PC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICAgIDxkaXYgY2xhc3M9XCJvbmJvYXJkaW5nX19idG5zXCI+XG4gICAgICA8YVxuICAgICAgICAqbmdJZj1cIiFsYXN0ICYmIGl0ZW0uc2tpcCAhPT0gbnVsbCAmJiBpdGVtLnNraXAgIT09IHVuZGVmaW5lZFwiXG4gICAgICAgIG56LWJ1dHRvblxuICAgICAgICBuelR5cGU9XCJsaW5rXCJcbiAgICAgICAgKGNsaWNrKT1cInRvKCdza2lwJylcIlxuICAgICAgICBuelNpemU9XCJzbWFsbFwiXG4gICAgICAgIGRhdGEtYnRuVHlwZT1cInNraXBcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbS5za2lwXCI+e3sgaXRlbS5za2lwIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L2E+XG4gICAgICA8YSAqbmdJZj1cIiFmaXJzdCAmJiBpdGVtLnByZXYgIT09IG51bGxcIiBuei1idXR0b24gKGNsaWNrKT1cInRvKCdwcmV2JylcIiBuelNpemU9XCJzbWFsbFwiIGRhdGEtYnRuVHlwZT1cInByZXZcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIml0ZW0ucHJldlwiPnt7IGl0ZW0ucHJldiB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9hPlxuICAgICAgPGFcbiAgICAgICAgKm5nSWY9XCIhbGFzdCAmJiBpdGVtLm5leHQgIT09IG51bGwgJiYgaXRlbS5uZXh0ICE9PSB1bmRlZmluZWRcIlxuICAgICAgICBuei1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cInRvKCduZXh0JylcIlxuICAgICAgICBuelR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgbnpTaXplPVwic21hbGxcIlxuICAgICAgICBkYXRhLWJ0blR5cGU9XCJuZXh0XCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIml0ZW0ubmV4dFwiPnt7IGl0ZW0ubmV4dCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9hPlxuICAgICAgPGFcbiAgICAgICAgKm5nSWY9XCJsYXN0ICYmIGl0ZW0uZG9uZSAhPT0gbnVsbCAmJiBpdGVtLmRvbmUgIT09IHVuZGVmaW5lZFwiXG4gICAgICAgIG56LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwidG8oJ2RvbmUnKVwiXG4gICAgICAgIG56VHlwZT1cInByaW1hcnlcIlxuICAgICAgICBuelNpemU9XCJzbWFsbFwiXG4gICAgICAgIGRhdGEtYnRuVHlwZT1cImRvbmVcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbS5kb25lXCI+e3sgaXRlbS5kb25lIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==