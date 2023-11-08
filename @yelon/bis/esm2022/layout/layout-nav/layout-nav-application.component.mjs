import { Component, Inject } from '@angular/core';
import { useLocalStorageHeader, WINDOW } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from "../bis.config";
import { Subject, takeUntil } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "../yunzai-i18n.service";
import * as i2 from "@yelon/theme";
import * as i3 from "@yelon/util";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "ng-zorro-antd/core/transition-patch";
import * as i7 from "ng-zorro-antd/grid";
import * as i8 from "ng-zorro-antd/icon";
import * as i9 from "ng-zorro-antd/input";
export class LayoutNavApplicationComponent {
    get showAllMenu() {
        if (this.bis.nav)
            return this.bis.nav.all;
        return true;
    }
    get showMineMenu() {
        if (this.bis.nav)
            return this.bis.nav.mine;
        return true;
    }
    constructor(i18n, http, inject, 
    // @ts-ignore
    configService, win) {
        this.i18n = i18n;
        this.http = http;
        this.inject = inject;
        this.configService = configService;
        this.win = win;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.$destroy = new Subject();
        this.state = {
            active: false,
            type: 'all',
            topic: undefined,
            topics: [],
            list: [],
            search: null,
        };
        this.bis = mergeBisConfig(configService);
    }
    ngOnInit() {
        this.fetchAllTopic();
        this.attachNav('all');
        this.win.addEventListener("click", (event) => {
            const { target } = event;
            const btn = this.win.document.getElementById("navBtn");
            const dropdown = this.win.document.getElementById("navDropdown");
            if (btn && dropdown && !dropdown.contains(target) && !btn.contains(target)) {
                this.state.active = false;
            }
        });
    }
    fetchAllTopic() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topics = getTopics();
    }
    attachNav(type, topic) {
        this.state.type = type;
        this.clearSearch();
        if (type === 'all') {
            this.displayAllNav();
        }
        if (type === 'mine') {
            this.displayMineNav();
        }
        if (type === 'other' && topic) {
            this.displayOtherNav(topic);
        }
    }
    clearSearch() {
        this.state.search = null;
    }
    displayAllNav() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.list = getTopics();
    }
    displayMineNav() {
        const [, getTopics] = useLocalStorageHeader();
        this.state.list = getTopics()
            .filter((topic) => {
            topic.children = topic.children.filter((child) => {
                return child.auth;
            });
            return topic;
        })
            .filter((topic) => {
            return topic.children.length > 0;
        });
    }
    displayOtherNav(topic) {
        const [, getTopics] = useLocalStorageHeader();
        this.state.topic = topic;
        const temp = getTopics();
        this.state.list = temp.filter(t => t.key === topic.key)[0].children;
    }
    diffChange(flag) {
        if (flag) {
            this.state.active = flag;
        }
        else {
            this.state.active = !this.state.active;
        }
    }
    open(topic) {
        if (topic.key) {
            this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .pipe(takeUntil(this.$destroy))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'blank':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            case 'target':
                this.inject.get(WINDOW).location.href = topic.url;
                break;
            default:
                this.inject.get(WINDOW).location.href = topic.url;
                break;
        }
    }
    onSearch() {
        const [, getTopics] = useLocalStorageHeader();
        const temp = getTopics();
        if (this.state.search) {
            this.state.list = temp
                .filter((topic) => {
                if (this.i18n.fanyi(topic.name).includes(this.state.search)) {
                    return topic;
                }
                else {
                    topic.children = topic.children.filter((child) => {
                        return this.i18n.fanyi(child.name).includes(this.state.search);
                    });
                    return topic;
                }
            })
                .filter((topic) => {
                return topic.children.length > 0;
            });
        }
        else {
            const [, getTopics] = useLocalStorageHeader();
            this.state.list = getTopics();
        }
    }
    ngOnDestroy() {
        this.$destroy.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavApplicationComponent, deps: [{ token: i1.YunzaiI18NService }, { token: i2._HttpClient }, { token: i0.Injector }, { token: i3.YunzaiConfigService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LayoutNavApplicationComponent, selector: "layout-nav-application", ngImport: i0, template: `
    <!--      search start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            data-event-id="_nav_search"
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="state.search"
            (ngModelChange)="onSearch()"
          />
          <ng-template #prefixTemplate>
            <i nz-icon nzType="search" nzTheme="outline"></i>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-template>
    <!-- search end -->

    <!-- right menu start -->
    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          <li *ngFor="let topic of state.list">
            <h5>{{ topic.name | i18n }}</h5>
            <a
              data-event-id="_nav_item"
              [attr.data-name]="nav.name | i18n"
              href="javascript:;"
              *ngFor="let nav of topic.children"
              (click)="open(nav)"
            >{{ nav.name | i18n }}</a
            >
          </li>
        </ul>
      </div>
    </ng-template>
    <!-- right menu end -->

    <!--      button start-->
    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item"
         (click)="diffChange()"> {{ 'mode.nav' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div *ngIf="showAllMenu" data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text"
             (click)="attachNav('all')">{{
          'mode.nav.all' | i18n
          }}</div>
        <div *ngIf="showMineMenu" data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text"
             (click)="attachNav('mine')">{{
          'mode.nav.mine' | i18n
          }}</div>
        <div
          data-event-id="_nav_topic"
          [attr.data-name]="nav.name | i18n"
          class="yz-application-text"
          *ngFor="let nav of state.topics"
          (click)="attachNav('other', nav)"
        >{{ nav.name | i18n }}</div
        >
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="state.topic" class="yz-application-container">
        <div *ngIf="state.type === 'all'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'mine'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'other'" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li
                data-event-id="_nav_item"
                [attr.data-name]="nav.name | i18n"
                *ngFor="let nav of state.list"
                (click)="open(nav)"
              >
                <a href="javascript:;">
                  <h4>{{ nav.name | i18n }}</h4>
                  <p>{{ nav.intro | i18n }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `, isInline: true, dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i7.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i7.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: i9.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i9.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzStatus", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }, { kind: "directive", type: i9.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { kind: "pipe", type: i2.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LayoutNavApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `layout-nav-application`,
                    template: `
    <!--      search start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            data-event-id="_nav_search"
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="state.search"
            (ngModelChange)="onSearch()"
          />
          <ng-template #prefixTemplate>
            <i nz-icon nzType="search" nzTheme="outline"></i>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-template>
    <!-- search end -->

    <!-- right menu start -->
    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          <li *ngFor="let topic of state.list">
            <h5>{{ topic.name | i18n }}</h5>
            <a
              data-event-id="_nav_item"
              [attr.data-name]="nav.name | i18n"
              href="javascript:;"
              *ngFor="let nav of topic.children"
              (click)="open(nav)"
            >{{ nav.name | i18n }}</a
            >
          </li>
        </ul>
      </div>
    </ng-template>
    <!-- right menu end -->

    <!--      button start-->
    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item"
         (click)="diffChange()"> {{ 'mode.nav' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div *ngIf="showAllMenu" data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text"
             (click)="attachNav('all')">{{
          'mode.nav.all' | i18n
          }}</div>
        <div *ngIf="showMineMenu" data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text"
             (click)="attachNav('mine')">{{
          'mode.nav.mine' | i18n
          }}</div>
        <div
          data-event-id="_nav_topic"
          [attr.data-name]="nav.name | i18n"
          class="yz-application-text"
          *ngFor="let nav of state.topics"
          (click)="attachNav('other', nav)"
        >{{ nav.name | i18n }}</div
        >
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="state.topic" class="yz-application-container">
        <div *ngIf="state.type === 'all'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'mine'">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngIf="state.type === 'other'" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li
                data-event-id="_nav_item"
                [attr.data-name]="nav.name | i18n"
                *ngFor="let nav of state.list"
                (click)="open(nav)"
              >
                <a href="javascript:;">
                  <h4>{{ nav.name | i18n }}</h4>
                  <p>{{ nav.intro | i18n }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiI18NService }, { type: i2._HttpClient }, { type: i0.Injector }, { type: i3.YunzaiConfigService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYvbGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQThCLE1BQU0sZUFBZSxDQUFDO0FBRzdFLE9BQU8sRUFFTCxxQkFBcUIsRUFDckIsTUFBTSxFQUlQLE1BQU0sYUFBYSxDQUFDO0FBR3JCLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7O0FBcUd4QyxNQUFNLE9BQU8sNkJBQTZCO0lBWXhDLElBQUksV0FBVztRQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUksQ0FBQyxHQUFJLENBQUE7UUFDM0MsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLElBQUssQ0FBQTtRQUM1QyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxZQUNVLElBQXVCLEVBQ3ZCLElBQWlCLEVBQ2pCLE1BQWdCO0lBQ3hCLGFBQWE7SUFDTCxhQUFrQyxFQUNsQixHQUFRO1FBTHhCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUVoQixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEIsUUFBRyxHQUFILEdB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RUFBRTt3QkFDL0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxDQUFDLENBQUM7b0JBQ2xFLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sS0FBSyxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELE1BQU0sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtnQkFDaEMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0wsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLEVBQUcsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMxQixDQUFDOytHQTNKVSw2QkFBNkIseUlBNEI5QixNQUFNO21HQTVCTCw2QkFBNkIsOERBakc5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErRlQ7OzRGQUVVLDZCQUE2QjtrQkFuR3pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStGVDtpQkFDRjs7MEJBNkJJLE1BQU07MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3QsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7X0h0dHBDbGllbnR9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICBMYXlvdXROYXZBcHBsaWNhdGlvblN0YXRlLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIFl1bnphaU5hdlRvcGljXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHtZdW56YWlJMThOU2VydmljZX0gZnJvbSAnLi4veXVuemFpLWkxOG4uc2VydmljZSc7XG5pbXBvcnQge0JVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZ30gZnJvbSBcIi4uL2Jpcy5jb25maWdcIjtcbmltcG9ydCB7U3ViamVjdCwgdGFrZVVudGlsfSBmcm9tIFwicnhqc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGBsYXlvdXQtbmF2LWFwcGxpY2F0aW9uYCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tICAgICAgc2VhcmNoIHN0YXJ0LS0+XG4gICAgPG5nLXRlbXBsYXRlICNzZWFyY2g+XG4gICAgICA8ZGl2IG56LXJvdyBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3Qtc2VhcmNoXCI+XG4gICAgICAgIDxuei1pbnB1dC1ncm91cCBbbnpQcmVmaXhdPVwicHJlZml4VGVtcGxhdGVcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3NlYXJjaFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBuei1pbnB1dFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyAnYXBwbGljYXRpb24uc2VhcmNoJyB8IGkxOG4gfX1cIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJzdGF0ZS5zZWFyY2hcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWFyY2goKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3ByZWZpeFRlbXBsYXRlPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZWFyY2hcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L256LWlucHV0LWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tIHNlYXJjaCBlbmQgLS0+XG5cbiAgICA8IS0tIHJpZ2h0IG1lbnUgc3RhcnQgLS0+XG4gICAgPG5nLXRlbXBsYXRlICNsZD5cbiAgICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0XCI+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHRvcGljIG9mIHN0YXRlLmxpc3RcIj5cbiAgICAgICAgICAgIDxoNT57eyB0b3BpYy5uYW1lIHwgaTE4biB9fTwvaDU+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9pdGVtXCJcbiAgICAgICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm5hdi5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbmF2IG9mIHRvcGljLmNoaWxkcmVuXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW4obmF2KVwiXG4gICAgICAgICAgICA+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9hXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSByaWdodCBtZW51IGVuZCAtLT5cblxuICAgIDwhLS0gICAgICBidXR0b24gc3RhcnQtLT5cbiAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2FwcFwiIGlkPVwibmF2QnRuXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW1cIlxuICAgICAgICAgKGNsaWNrKT1cImRpZmZDaGFuZ2UoKVwiPiB7eyAnbW9kZS5uYXYnIHwgaTE4biB9fTwvZGl2PlxuICAgIDwhLS0gICAgICBidXR0b24gZW5kLS0+XG5cbiAgICA8IS0tICAgICAgaGVhZGVyIHN0YXJ0LS0+XG4gICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uXCIgaWQ9XCJuYXZEcm9wZG93blwiIG56LXJvdyAqbmdJZj1cInN0YXRlLmFjdGl2ZVwiPlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIzXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10b3BpY1wiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd0FsbE1lbnVcIiBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiIGRhdGEtbmFtZT1cIuWFqOmDqOW6lOeUqFwiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiXG4gICAgICAgICAgICAgKGNsaWNrKT1cImF0dGFjaE5hdignYWxsJylcIj57e1xuICAgICAgICAgICdtb2RlLm5hdi5hbGwnIHwgaTE4blxuICAgICAgICAgIH19PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93TWluZU1lbnVcIiBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiIGRhdGEtbmFtZT1cIuaIkeeahOW6lOeUqFwiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiXG4gICAgICAgICAgICAgKGNsaWNrKT1cImF0dGFjaE5hdignbWluZScpXCI+e3tcbiAgICAgICAgICAnbW9kZS5uYXYubWluZScgfCBpMThuXG4gICAgICAgICAgfX08L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3RvcGljXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibmF2Lm5hbWUgfCBpMThuXCJcbiAgICAgICAgICBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBuYXYgb2Ygc3RhdGUudG9waWNzXCJcbiAgICAgICAgICAoY2xpY2spPVwiYXR0YWNoTmF2KCdvdGhlcicsIG5hdilcIlxuICAgICAgICA+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9kaXZcbiAgICAgICAgPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IG56LWNvbCBbbnpTcGFuXT1cIjIxXCIgW25nU3dpdGNoXT1cInN0YXRlLnRvcGljXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInN0YXRlLnR5cGUgPT09ICdhbGwnXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNlYXJjaFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzdGF0ZS50eXBlID09PSAnbWluZSdcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInN0YXRlLnR5cGUgPT09ICdvdGhlcidcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3RcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2l0ZW1cIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtbmFtZV09XCJuYXYubmFtZSB8IGkxOG5cIlxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBuYXYgb2Ygc3RhdGUubGlzdFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW4obmF2KVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9oND5cbiAgICAgICAgICAgICAgICAgIDxwPnt7IG5hdi5pbnRybyB8IGkxOG4gfX08L3A+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tICAgICAgaGVhZGVyIGVuZC0tPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIExheW91dE5hdkFwcGxpY2F0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGJpczogWXVuemFpQnVzaW5lc3NDb25maWcgPSBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRztcbiAgcHJpdmF0ZSAkZGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG4gIHN0YXRlOiBMYXlvdXROYXZBcHBsaWNhdGlvblN0YXRlID0ge1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgdHlwZTogJ2FsbCcsXG4gICAgdG9waWM6IHVuZGVmaW5lZCxcbiAgICB0b3BpY3M6IFtdLFxuICAgIGxpc3Q6IFtdLFxuICAgIHNlYXJjaDogbnVsbCxcbiAgfTtcblxuICBnZXQgc2hvd0FsbE1lbnUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYmlzLm5hdikgcmV0dXJuIHRoaXMuYmlzLm5hdiEuYWxsIVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBnZXQgc2hvd01pbmVNZW51KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmJpcy5uYXYpIHJldHVybiB0aGlzLmJpcy5uYXYhLm1pbmUhXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaTE4bjogWXVuemFpSTE4TlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogWXVuemFpQ29uZmlnU2VydmljZSxcbiAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW46IGFueVxuICApIHtcbiAgICB0aGlzLmJpcyA9IG1lcmdlQmlzQ29uZmlnKGNvbmZpZ1NlcnZpY2UpXG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZldGNoQWxsVG9waWMoKTtcbiAgICB0aGlzLmF0dGFjaE5hdignYWxsJyk7XG4gICAgdGhpcy53aW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICBjb25zdCB7dGFyZ2V0fSA9IGV2ZW50XG4gICAgICBjb25zdCBidG4gPSB0aGlzLndpbi5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdkJ0blwiKVxuICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLndpbi5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdkRyb3Bkb3duXCIpXG4gICAgICBpZiAoYnRuICYmIGRyb3Bkb3duICYmICFkcm9wZG93bi5jb250YWlucyh0YXJnZXQpICYmICFidG4uY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZldGNoQWxsVG9waWMoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUudG9waWNzID0gZ2V0VG9waWNzKCkhO1xuICB9XG5cbiAgYXR0YWNoTmF2KHR5cGU6ICdhbGwnIHwgJ21pbmUnIHwgJ290aGVyJywgdG9waWM/OiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgdGhpcy5kaXNwbGF5QWxsTmF2KCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnbWluZScpIHtcbiAgICAgIHRoaXMuZGlzcGxheU1pbmVOYXYoKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdvdGhlcicgJiYgdG9waWMpIHtcbiAgICAgIHRoaXMuZGlzcGxheU90aGVyTmF2KHRvcGljKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnNlYXJjaCA9IG51bGw7XG4gIH1cblxuICBkaXNwbGF5QWxsTmF2KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSBnZXRUb3BpY3MoKSE7XG4gIH1cblxuICBkaXNwbGF5TWluZU5hdigpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgdGhpcy5zdGF0ZS5saXN0ID0gZ2V0VG9waWNzKCkhXG4gICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5hdXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvcGljO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHRvcGljOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzcGxheU90aGVyTmF2KHRvcGljOiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLnRvcGljID0gdG9waWM7XG4gICAgY29uc3QgdGVtcDogWXVuemFpTmF2VG9waWNbXSA9IGdldFRvcGljcygpITtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSB0ZW1wLmZpbHRlcih0ID0+IHQua2V5ID09PSB0b3BpYy5rZXkpWzBdLmNoaWxkcmVuO1xuICB9XG5cbiAgZGlmZkNoYW5nZShmbGFnPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChmbGFnKSB7XG4gICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA9IGZsYWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID0gIXRoaXMuc3RhdGUuYWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4odG9waWM6IFl1bnphaU5hdlRvcGljKTogdm9pZCB7XG4gICAgaWYgKHRvcGljLmtleSkge1xuICAgICAgdGhpcy5odHRwXG4gICAgICAgIC5wb3N0KGAvYXBwLW1hbmFnZXIvd2ViLXNjYW4vc2F2ZWAsIHtcbiAgICAgICAgICBhcHBJZDogdG9waWMua2V5LFxuICAgICAgICAgIGNyZWF0ZURhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgfSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHN3aXRjaCAodG9waWMudGFyZ2V0KSB7XG4gICAgICBjYXNlICdocmVmJzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdibGFuayc6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFyZ2V0JzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBvblNlYXJjaCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgY29uc3QgdGVtcDogWXVuemFpTmF2VG9waWNbXSA9IGdldFRvcGljcygpITtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWFyY2gpIHtcbiAgICAgIHRoaXMuc3RhdGUubGlzdCA9IHRlbXBcbiAgICAgICAgLmZpbHRlcigodG9waWM6IFl1bnphaU5hdlRvcGljKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaTE4bi5mYW55aSh0b3BpYy5uYW1lKS5pbmNsdWRlcyh0aGlzLnN0YXRlLnNlYXJjaCEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGljLmNoaWxkcmVuID0gdG9waWMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bi5mYW55aShjaGlsZC5uYW1lKS5pbmNsdWRlcyh0aGlzLnN0YXRlLnNlYXJjaCEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICAgIHRoaXMuc3RhdGUubGlzdCA9IGdldFRvcGljcygpITtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiRkZXN0cm95LmNvbXBsZXRlKClcbiAgfVxuXG59XG4iXX0=