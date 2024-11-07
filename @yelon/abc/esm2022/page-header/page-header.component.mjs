import { Directionality } from '@angular/cdk/bidi';
import { CdkObserveContent } from '@angular/cdk/observers';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, booleanAttribute, inject, numberAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { merge, filter } from 'rxjs';
import { ReuseTabService } from '@yelon/abc/reuse-tab';
import { YUNZAI_I18N_TOKEN, MenuService, TitleService } from '@yelon/theme';
import { isEmpty } from '@yelon/util/browser';
import { NzAffixComponent } from 'ng-zorro-antd/affix';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@yelon/util/config";
import * as i3 from "@angular/cdk/platform";
export class PageHeaderComponent {
    get menus() {
        return this.menuSrv.getPathByUrl(this.router.url, this.recursiveBreadcrumb);
    }
    set title(value) {
        if (value instanceof TemplateRef) {
            this._title = null;
            this._titleTpl = value;
            this._titleVal = '';
        }
        else {
            this._title = value;
            this._titleVal = this._title;
        }
    }
    // #endregion
    constructor(settings, configSrv, platform) {
        this.renderer = inject(Renderer2);
        this.router = inject(Router);
        this.cdr = inject(ChangeDetectorRef);
        this.menuSrv = inject(MenuService);
        this.i18nSrv = inject(YUNZAI_I18N_TOKEN);
        this.titleSrv = inject(TitleService);
        this.reuseSrv = inject(ReuseTabService, { optional: true });
        this.directionality = inject(Directionality);
        this.destroy$ = inject(DestroyRef);
        this.inited = false;
        this.isBrowser = true;
        this.dir = 'ltr';
        this._titleVal = '';
        this.paths = [];
        // #region fields
        this._title = null;
        this._titleTpl = null;
        this.loading = false;
        this.wide = false;
        this.breadcrumb = null;
        this.logo = null;
        this.action = null;
        this.content = null;
        this.extra = null;
        this.tab = null;
        this.isBrowser = platform.isBrowser;
        configSrv.attach(this, 'pageHeader', {
            home: '首页',
            homeLink: '/',
            autoBreadcrumb: true,
            recursiveBreadcrumb: false,
            autoTitle: true,
            syncTitle: true,
            fixed: false,
            fixedOffsetTop: 64
        });
        settings.notify
            .pipe(takeUntilDestroyed(), filter(w => this.affix && w.type === 'layout' && w.name === 'collapsed'))
            .subscribe(() => this.affix.updatePosition({}));
        const obsList = [this.router.events.pipe(filter(ev => ev instanceof NavigationEnd))];
        if (this.menuSrv != null)
            obsList.push(this.menuSrv.change);
        obsList.push(this.i18nSrv.change);
        merge(...obsList)
            .pipe(takeUntilDestroyed(), filter(() => this.inited))
            .subscribe(() => this.refresh());
    }
    refresh() {
        this.setTitle().genBreadcrumb();
        this.cdr.detectChanges();
    }
    genBreadcrumb() {
        if (this.breadcrumb || !this.autoBreadcrumb || this.menus.length <= 0) {
            this.paths = [];
            return;
        }
        const paths = [];
        this.menus.forEach(item => {
            if (typeof item.hideInBreadcrumb !== 'undefined' && item.hideInBreadcrumb)
                return;
            let title = item.text;
            if (item.i18n)
                title = this.i18nSrv.fanyi(item.i18n);
            paths.push({ title, link: (item.link && [item.link]) });
        });
        // add home
        if (this.home) {
            paths.splice(0, 0, {
                title: (this.homeI18n && this.i18nSrv.fanyi(this.homeI18n)) || this.home,
                link: [this.homeLink]
            });
        }
        this.paths = paths;
    }
    setTitle() {
        if (this._title == null && this._titleTpl == null && this.autoTitle && this.menus.length > 0) {
            const item = this.menus[this.menus.length - 1];
            let title = item.text;
            if (item.i18n) {
                title = this.i18nSrv.fanyi(item.i18n);
            }
            this._titleVal = title;
        }
        if (this._titleVal && this.syncTitle) {
            this.titleSrv.setTitle(this._titleVal);
            if (!this.inited && this.reuseSrv) {
                this.reuseSrv.title = this._titleVal;
            }
        }
        return this;
    }
    checkContent() {
        if (isEmpty(this.conTpl.nativeElement)) {
            this.renderer.setAttribute(this.conTpl.nativeElement, 'hidden', '');
        }
        else {
            this.renderer.removeAttribute(this.conTpl.nativeElement, 'hidden');
        }
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe(direction => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.refresh();
        this.inited = true;
    }
    ngAfterViewInit() {
        this.checkContent();
    }
    ngOnChanges() {
        if (this.inited) {
            this.refresh();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: PageHeaderComponent, deps: [{ token: i1.SettingsService }, { token: i2.YunzaiConfigService }, { token: i3.Platform }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.11", type: PageHeaderComponent, isStandalone: true, selector: "page-header", inputs: { title: "title", titleSub: "titleSub", loading: ["loading", "loading", booleanAttribute], wide: ["wide", "wide", booleanAttribute], home: "home", homeLink: "homeLink", homeI18n: "homeI18n", autoBreadcrumb: ["autoBreadcrumb", "autoBreadcrumb", booleanAttribute], autoTitle: ["autoTitle", "autoTitle", booleanAttribute], syncTitle: ["syncTitle", "syncTitle", booleanAttribute], fixed: ["fixed", "fixed", booleanAttribute], fixedOffsetTop: ["fixedOffsetTop", "fixedOffsetTop", numberAttribute], breadcrumb: "breadcrumb", recursiveBreadcrumb: ["recursiveBreadcrumb", "recursiveBreadcrumb", booleanAttribute], logo: "logo", action: "action", content: "content", extra: "extra", tab: "tab" }, viewQueries: [{ propertyName: "conTpl", first: true, predicate: ["conTpl"], descendants: true }, { propertyName: "affix", first: true, predicate: ["affix"], descendants: true }], exportAs: ["pageHeader"], usesOnChanges: true, ngImport: i0, template: "@if (isBrowser && fixed) {\n  <nz-affix #affix [nzOffsetTop]=\"fixedOffsetTop\">\n    <ng-template [ngTemplateOutlet]=\"phTpl\" />\n  </nz-affix>\n} @else {\n  <ng-template [ngTemplateOutlet]=\"phTpl\" />\n}\n<ng-template #phTpl>\n  <div class=\"page-header\" [class.page-header-rtl]=\"dir === 'rtl'\">\n    <div [class.page-header__wide]=\"wide\">\n      <nz-skeleton\n        [nzLoading]=\"loading\"\n        [nzTitle]=\"false\"\n        [nzActive]=\"true\"\n        [nzParagraph]=\"{ rows: 3 }\"\n        [nzAvatar]=\"{ size: 'large', shape: 'circle' }\"\n        class=\"d-block\"\n      >\n        @if (breadcrumb) {\n          <ng-template [ngTemplateOutlet]=\"breadcrumb\" />\n        } @else {\n          @if (paths && paths.length > 0) {\n            <nz-breadcrumb>\n              @for (i of paths; track $index) {\n                <nz-breadcrumb-item>\n                  @if (i.link) {\n                    <a [routerLink]=\"i.link\">{{ i.title }}</a>\n                  } @else {\n                    {{ i.title }}\n                  }\n                </nz-breadcrumb-item>\n              }\n            </nz-breadcrumb>\n          }\n        }\n        <div class=\"page-header__detail\">\n          @if (logo) {\n            <div class=\"page-header__logo\">\n              <ng-template [ngTemplateOutlet]=\"logo\" />\n            </div>\n          }\n          <div class=\"page-header__main\">\n            <div class=\"page-header__row\">\n              @if (_titleVal || _titleTpl) {\n                <h1 class=\"page-header__title\">\n                  @if (_titleTpl) {\n                    <ng-template [ngTemplateOutlet]=\"_titleTpl\" />\n                  } @else {\n                    {{ _titleVal }}\n                    @if (titleSub) {\n                      <small>\n                        <ng-container *nzStringTemplateOutlet=\"titleSub\">{{ titleSub }}</ng-container>\n                      </small>\n                    }\n                  }\n                </h1>\n              }\n              @if (action) {\n                <div class=\"page-header__action\">\n                  <ng-template [ngTemplateOutlet]=\"action\" />\n                </div>\n              }\n            </div>\n            <div class=\"page-header__row\">\n              <div class=\"page-header__desc\" (cdkObserveContent)=\"checkContent()\" #conTpl>\n                <ng-content />\n                <ng-template [ngTemplateOutlet]=\"content!\" />\n              </div>\n              @if (extra) {\n                <div class=\"page-header__extra\">\n                  <ng-template [ngTemplateOutlet]=\"extra\" />\n                </div>\n              }\n            </div>\n          </div>\n        </div>\n        <ng-template [ngTemplateOutlet]=\"tab!\" />\n      </nz-skeleton>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "component", type: NzAffixComponent, selector: "nz-affix", inputs: ["nzTarget", "nzOffsetTop", "nzOffsetBottom"], outputs: ["nzChange"], exportAs: ["nzAffix"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }, { kind: "component", type: NzBreadCrumbComponent, selector: "nz-breadcrumb", inputs: ["nzAutoGenerate", "nzSeparator", "nzRouteLabel", "nzRouteLabelFn", "nzRouteFn"], exportAs: ["nzBreadcrumb"] }, { kind: "component", type: NzBreadCrumbItemComponent, selector: "nz-breadcrumb-item", inputs: ["nzOverlay"], exportAs: ["nzBreadcrumbItem"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: PageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'page-header', exportAs: 'pageHeader', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [
                        NzAffixComponent,
                        NgTemplateOutlet,
                        NzSkeletonComponent,
                        NzBreadCrumbComponent,
                        NzBreadCrumbItemComponent,
                        RouterLink,
                        NzStringTemplateOutletDirective,
                        CdkObserveContent
                    ], template: "@if (isBrowser && fixed) {\n  <nz-affix #affix [nzOffsetTop]=\"fixedOffsetTop\">\n    <ng-template [ngTemplateOutlet]=\"phTpl\" />\n  </nz-affix>\n} @else {\n  <ng-template [ngTemplateOutlet]=\"phTpl\" />\n}\n<ng-template #phTpl>\n  <div class=\"page-header\" [class.page-header-rtl]=\"dir === 'rtl'\">\n    <div [class.page-header__wide]=\"wide\">\n      <nz-skeleton\n        [nzLoading]=\"loading\"\n        [nzTitle]=\"false\"\n        [nzActive]=\"true\"\n        [nzParagraph]=\"{ rows: 3 }\"\n        [nzAvatar]=\"{ size: 'large', shape: 'circle' }\"\n        class=\"d-block\"\n      >\n        @if (breadcrumb) {\n          <ng-template [ngTemplateOutlet]=\"breadcrumb\" />\n        } @else {\n          @if (paths && paths.length > 0) {\n            <nz-breadcrumb>\n              @for (i of paths; track $index) {\n                <nz-breadcrumb-item>\n                  @if (i.link) {\n                    <a [routerLink]=\"i.link\">{{ i.title }}</a>\n                  } @else {\n                    {{ i.title }}\n                  }\n                </nz-breadcrumb-item>\n              }\n            </nz-breadcrumb>\n          }\n        }\n        <div class=\"page-header__detail\">\n          @if (logo) {\n            <div class=\"page-header__logo\">\n              <ng-template [ngTemplateOutlet]=\"logo\" />\n            </div>\n          }\n          <div class=\"page-header__main\">\n            <div class=\"page-header__row\">\n              @if (_titleVal || _titleTpl) {\n                <h1 class=\"page-header__title\">\n                  @if (_titleTpl) {\n                    <ng-template [ngTemplateOutlet]=\"_titleTpl\" />\n                  } @else {\n                    {{ _titleVal }}\n                    @if (titleSub) {\n                      <small>\n                        <ng-container *nzStringTemplateOutlet=\"titleSub\">{{ titleSub }}</ng-container>\n                      </small>\n                    }\n                  }\n                </h1>\n              }\n              @if (action) {\n                <div class=\"page-header__action\">\n                  <ng-template [ngTemplateOutlet]=\"action\" />\n                </div>\n              }\n            </div>\n            <div class=\"page-header__row\">\n              <div class=\"page-header__desc\" (cdkObserveContent)=\"checkContent()\" #conTpl>\n                <ng-content />\n                <ng-template [ngTemplateOutlet]=\"content!\" />\n              </div>\n              @if (extra) {\n                <div class=\"page-header__extra\">\n                  <ng-template [ngTemplateOutlet]=\"extra\" />\n                </div>\n              }\n            </div>\n          </div>\n        </div>\n        <ng-template [ngTemplateOutlet]=\"tab!\" />\n      </nz-skeleton>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: () => [{ type: i1.SettingsService }, { type: i2.YunzaiConfigService }, { type: i3.Platform }], propDecorators: { conTpl: [{
                type: ViewChild,
                args: ['conTpl', { static: false }]
            }], affix: [{
                type: ViewChild,
                args: ['affix', { static: false }]
            }], title: [{
                type: Input
            }], titleSub: [{
                type: Input
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], wide: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], home: [{
                type: Input
            }], homeLink: [{
                type: Input
            }], homeI18n: [{
                type: Input
            }], autoBreadcrumb: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoTitle: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], syncTitle: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], fixed: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], fixedOffsetTop: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], breadcrumb: [{
                type: Input
            }], recursiveBreadcrumb: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], logo: [{
                type: Input
            }], action: [{
                type: Input
            }], content: [{
                type: Input
            }], extra: [{
                type: Input
            }], tab: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFFVixLQUFLLEVBR0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFRLFdBQVcsRUFBbUIsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUs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QUcsQ0FBQyxFQUFFLENBQUM7WUFDN0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBTSxDQUFDO1FBQzFCLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RSxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FB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WCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENka09ic2VydmVDb250ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIGluamVjdCxcbiAgbnVtYmVyQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyLCBSb3V0ZXJMaW5rIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1lcmdlLCBmaWx0ZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmV1c2VUYWJTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2FiYy9yZXVzZS10YWInO1xuaW1wb3J0IHsgWVVOWkFJX0kxOE5fVE9LRU4sIE1lbnUsIE1lbnVTZXJ2aWNlLCBTZXR0aW5nc1NlcnZpY2UsIFRpdGxlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnQHllbG9uL3V0aWwvYnJvd3Nlcic7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IE56QWZmaXhDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL2FmZml4JztcbmltcG9ydCB7IE56QnJlYWRDcnVtYkNvbXBvbmVudCwgTnpCcmVhZENydW1iSXRlbUNvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnJlYWRjcnVtYic7XG5pbXBvcnQgeyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelNrZWxldG9uQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9za2VsZXRvbic7XG5cbmludGVyZmFjZSBQYWdlSGVhZGVyUGF0aCB7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBsaW5rPzogc3RyaW5nW107XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BhZ2UtaGVhZGVyJyxcbiAgZXhwb3J0QXM6ICdwYWdlSGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgTnpBZmZpeENvbXBvbmVudCxcbiAgICBOZ1RlbXBsYXRlT3V0bGV0LFxuICAgIE56U2tlbGV0b25Db21wb25lbnQsXG4gICAgTnpCcmVhZENydW1iQ29tcG9uZW50LFxuICAgIE56QnJlYWRDcnVtYkl0ZW1Db21wb25lbnQsXG4gICAgUm91dGVyTGluayxcbiAgICBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlLFxuICAgIENka09ic2VydmVDb250ZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlciA9IGluamVjdChSZW5kZXJlcjIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVudVNydiA9IGluamVjdChNZW51U2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4blNydiA9IGluamVjdChZVU5aQUlfSTE4Tl9UT0tFTik7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGl0bGVTcnYgPSBpbmplY3QoVGl0bGVTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSByZXVzZVNydiA9IGluamVjdChSZXVzZVRhYlNlcnZpY2UsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHkgPSBpbmplY3QoRGlyZWN0aW9uYWxpdHkpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kkID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvblRwbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwcml2YXRlIGNvblRwbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2FmZml4JywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgYWZmaXghOiBOekFmZml4Q29tcG9uZW50O1xuICBpbml0ZWQgPSBmYWxzZTtcbiAgaXNCcm93c2VyID0gdHJ1ZTtcbiAgZGlyPzogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcHJpdmF0ZSBnZXQgbWVudXMoKTogTWVudVtdIHtcbiAgICByZXR1cm4gdGhpcy5tZW51U3J2LmdldFBhdGhCeVVybCh0aGlzLnJvdXRlci51cmwsIHRoaXMucmVjdXJzaXZlQnJlYWRjcnVtYik7XG4gIH1cblxuICBfdGl0bGVWYWw6IHN0cmluZyB8IG51bGwgPSAnJztcbiAgcGF0aHM6IFBhZ2VIZWFkZXJQYXRoW10gPSBbXTtcblxuICAvLyAjcmVnaW9uIGZpZWxkc1xuXG4gIF90aXRsZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIF90aXRsZVRwbDogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKVxuICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICB0aGlzLl90aXRsZSA9IG51bGw7XG4gICAgICB0aGlzLl90aXRsZVRwbCA9IHZhbHVlO1xuICAgICAgdGhpcy5fdGl0bGVWYWwgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGl0bGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3RpdGxlVmFsID0gdGhpcy5fdGl0bGU7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpIHRpdGxlU3ViPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsO1xuXG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsb2FkaW5nID0gZmFsc2U7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB3aWRlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhvbWU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvbWVMaW5rPzogc3RyaW5nO1xuICBASW5wdXQoKSBob21lSTE4bj86IHN0cmluZztcbiAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9CcmVhZGNydW1iITogYm9vbGVhbjtcbiAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9UaXRsZSE6IGJvb2xlYW47XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzeW5jVGl0bGUhOiBib29sZWFuO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZml4ZWQhOiBib29sZWFuO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBmaXhlZE9mZnNldFRvcCE6IG51bWJlcjtcbiAgQElucHV0KCkgYnJlYWRjcnVtYj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJlY3Vyc2l2ZUJyZWFkY3J1bWIhOiBib29sZWFuO1xuICBASW5wdXQoKSBsb2dvPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYWN0aW9uPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29udGVudD86IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGV4dHJhPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgdGFiPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFNldHRpbmdzU2VydmljZSwgY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlLCBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICB0aGlzLmlzQnJvd3NlciA9IHBsYXRmb3JtLmlzQnJvd3NlcjtcbiAgICBjb25maWdTcnYuYXR0YWNoKHRoaXMsICdwYWdlSGVhZGVyJywge1xuICAgICAgaG9tZTogJ+mmlumhtScsXG4gICAgICBob21lTGluazogJy8nLFxuICAgICAgYXV0b0JyZWFkY3J1bWI6IHRydWUsXG4gICAgICByZWN1cnNpdmVCcmVhZGNydW1iOiBmYWxzZSxcbiAgICAgIGF1dG9UaXRsZTogdHJ1ZSxcbiAgICAgIHN5bmNUaXRsZTogdHJ1ZSxcbiAgICAgIGZpeGVkOiBmYWxzZSxcbiAgICAgIGZpeGVkT2Zmc2V0VG9wOiA2NFxuICAgIH0pO1xuICAgIHNldHRpbmdzLm5vdGlmeVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCgpLFxuICAgICAgICBmaWx0ZXIodyA9PiB0aGlzLmFmZml4ICYmIHcudHlwZSA9PT0gJ2xheW91dCcgJiYgdy5uYW1lID09PSAnY29sbGFwc2VkJylcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hZmZpeC51cGRhdGVQb3NpdGlvbih7fSBhcyBOelNhZmVBbnkpKTtcblxuICAgIGNvbnN0IG9ic0xpc3Q6IEFycmF5PE9ic2VydmFibGU8TnpTYWZlQW55Pj4gPSBbdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ID0+IGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXTtcbiAgICBpZiAodGhpcy5tZW51U3J2ICE9IG51bGwpIG9ic0xpc3QucHVzaCh0aGlzLm1lbnVTcnYuY2hhbmdlKTtcbiAgICBvYnNMaXN0LnB1c2godGhpcy5pMThuU3J2LmNoYW5nZSk7XG4gICAgbWVyZ2UoLi4ub2JzTGlzdClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQoKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuaW5pdGVkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VGl0bGUoKS5nZW5CcmVhZGNydW1iKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5CcmVhZGNydW1iKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJyZWFkY3J1bWIgfHwgIXRoaXMuYXV0b0JyZWFkY3J1bWIgfHwgdGhpcy5tZW51cy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwYXRoczogUGFnZUhlYWRlclBhdGhbXSA9IFtdO1xuICAgIHRoaXMubWVudXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbS5oaWRlSW5CcmVhZGNydW1iICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtLmhpZGVJbkJyZWFkY3J1bWIpIHJldHVybjtcbiAgICAgIGxldCB0aXRsZSA9IGl0ZW0udGV4dDtcbiAgICAgIGlmIChpdGVtLmkxOG4pIHRpdGxlID0gdGhpcy5pMThuU3J2LmZhbnlpKGl0ZW0uaTE4bik7XG4gICAgICBwYXRocy5wdXNoKHsgdGl0bGUsIGxpbms6IChpdGVtLmxpbmsgJiYgW2l0ZW0ubGlua10pIGFzIHN0cmluZ1tdIH0pO1xuICAgIH0pO1xuICAgIC8vIGFkZCBob21lXG4gICAgaWYgKHRoaXMuaG9tZSkge1xuICAgICAgcGF0aHMuc3BsaWNlKDAsIDAsIHtcbiAgICAgICAgdGl0bGU6ICh0aGlzLmhvbWVJMThuICYmIHRoaXMuaTE4blNydi5mYW55aSh0aGlzLmhvbWVJMThuKSkgfHwgdGhpcy5ob21lLFxuICAgICAgICBsaW5rOiBbdGhpcy5ob21lTGluayFdXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5wYXRocyA9IHBhdGhzO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUaXRsZSgpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5fdGl0bGUgPT0gbnVsbCAmJiB0aGlzLl90aXRsZVRwbCA9PSBudWxsICYmIHRoaXMuYXV0b1RpdGxlICYmIHRoaXMubWVudXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMubWVudXNbdGhpcy5tZW51cy5sZW5ndGggLSAxXTtcbiAgICAgIGxldCB0aXRsZSA9IGl0ZW0udGV4dDtcbiAgICAgIGlmIChpdGVtLmkxOG4pIHtcbiAgICAgICAgdGl0bGUgPSB0aGlzLmkxOG5TcnYuZmFueWkoaXRlbS5pMThuKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3RpdGxlVmFsID0gdGl0bGUhO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl90aXRsZVZhbCAmJiB0aGlzLnN5bmNUaXRsZSkge1xuICAgICAgdGhpcy50aXRsZVNydi5zZXRUaXRsZSh0aGlzLl90aXRsZVZhbCk7XG4gICAgICBpZiAoIXRoaXMuaW5pdGVkICYmIHRoaXMucmV1c2VTcnYpIHtcbiAgICAgICAgdGhpcy5yZXVzZVNydi50aXRsZSA9IHRoaXMuX3RpdGxlVmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2hlY2tDb250ZW50KCk6IHZvaWQge1xuICAgIGlmIChpc0VtcHR5KHRoaXMuY29uVHBsLm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvblRwbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmNvblRwbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZGlyZWN0aW9uID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrQ29udGVudCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gIH1cbn1cbiIsIkBpZiAoaXNCcm93c2VyICYmIGZpeGVkKSB7XG4gIDxuei1hZmZpeCAjYWZmaXggW256T2Zmc2V0VG9wXT1cImZpeGVkT2Zmc2V0VG9wXCI+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBoVHBsXCIgLz5cbiAgPC9uei1hZmZpeD5cbn0gQGVsc2Uge1xuICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGhUcGxcIiAvPlxufVxuPG5nLXRlbXBsYXRlICNwaFRwbD5cbiAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyXCIgW2NsYXNzLnBhZ2UtaGVhZGVyLXJ0bF09XCJkaXIgPT09ICdydGwnXCI+XG4gICAgPGRpdiBbY2xhc3MucGFnZS1oZWFkZXJfX3dpZGVdPVwid2lkZVwiPlxuICAgICAgPG56LXNrZWxldG9uXG4gICAgICAgIFtuekxvYWRpbmddPVwibG9hZGluZ1wiXG4gICAgICAgIFtuelRpdGxlXT1cImZhbHNlXCJcbiAgICAgICAgW256QWN0aXZlXT1cInRydWVcIlxuICAgICAgICBbbnpQYXJhZ3JhcGhdPVwieyByb3dzOiAzIH1cIlxuICAgICAgICBbbnpBdmF0YXJdPVwieyBzaXplOiAnbGFyZ2UnLCBzaGFwZTogJ2NpcmNsZScgfVwiXG4gICAgICAgIGNsYXNzPVwiZC1ibG9ja1wiXG4gICAgICA+XG4gICAgICAgIEBpZiAoYnJlYWRjcnVtYikge1xuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJicmVhZGNydW1iXCIgLz5cbiAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgQGlmIChwYXRocyAmJiBwYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICA8bnotYnJlYWRjcnVtYj5cbiAgICAgICAgICAgICAgQGZvciAoaSBvZiBwYXRoczsgdHJhY2sgJGluZGV4KSB7XG4gICAgICAgICAgICAgICAgPG56LWJyZWFkY3J1bWItaXRlbT5cbiAgICAgICAgICAgICAgICAgIEBpZiAoaS5saW5rKSB7XG4gICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cImkubGlua1wiPnt7IGkudGl0bGUgfX08L2E+XG4gICAgICAgICAgICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAge3sgaS50aXRsZSB9fVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvbnotYnJlYWRjcnVtYi1pdGVtPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L256LWJyZWFkY3J1bWI+XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlcl9fZGV0YWlsXCI+XG4gICAgICAgICAgQGlmIChsb2dvKSB7XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXJfX2xvZ29cIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvZ29cIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlcl9fbWFpblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyX19yb3dcIj5cbiAgICAgICAgICAgICAgQGlmIChfdGl0bGVWYWwgfHwgX3RpdGxlVHBsKSB7XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFnZS1oZWFkZXJfX3RpdGxlXCI+XG4gICAgICAgICAgICAgICAgICBAaWYgKF90aXRsZVRwbCkge1xuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiX3RpdGxlVHBsXCIgLz5cbiAgICAgICAgICAgICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB7eyBfdGl0bGVWYWwgfX1cbiAgICAgICAgICAgICAgICAgICAgQGlmICh0aXRsZVN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0aXRsZVN1YlwiPnt7IHRpdGxlU3ViIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgQGlmIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXJfX2FjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFjdGlvblwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyX19yb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyX19kZXNjXCIgKGNka09ic2VydmVDb250ZW50KT1cImNoZWNrQ29udGVudCgpXCIgI2NvblRwbD5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCAvPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50IVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBAaWYgKGV4dHJhKSB7XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyX19leHRyYVwiPlxuICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImV4dHJhXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiIVwiIC8+XG4gICAgICA8L256LXNrZWxldG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=