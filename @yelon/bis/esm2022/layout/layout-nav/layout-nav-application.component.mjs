import { Component, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { useLocalStorageHeader, WINDOW } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from '../bis.config';
import * as i0 from "@angular/core";
import * as i1 from "../yunzai-i18n.service";
import * as i2 from "@yelon/theme";
import * as i3 from "@yelon/util";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "ng-zorro-antd/grid";
import * as i7 from "ng-zorro-antd/input";
import * as i8 from "ng-zorro-antd/icon";
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
            search: null
        };
        this.bis = mergeBisConfig(configService);
    }
    ngOnInit() {
        this.fetchAllTopic();
        this.attachNav('all');
        this.win.addEventListener('click', (event) => {
            const { target } = event;
            const btn = this.win.document.getElementById('navBtn');
            const dropdown = this.win.document.getElementById('navDropdown');
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LayoutNavApplicationComponent, deps: [{ token: i1.YunzaiI18NService }, { token: i2._HttpClient }, { token: i0.Injector }, { token: i3.YunzaiConfigService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: LayoutNavApplicationComponent, selector: "layout-nav-application", ngImport: i0, template: `
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
    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item" (click)="diffChange()">{{
      'mode.nav' | i18n
    }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div
          *ngIf="showAllMenu"
          data-event-id="_nav_topic"
          data-name="全部应用"
          class="yz-application-text"
          (click)="attachNav('all')"
          >{{ 'mode.nav.all' | i18n }}</div
        >
        <div
          *ngIf="showMineMenu"
          data-event-id="_nav_topic"
          data-name="我的应用"
          class="yz-application-text"
          (click)="attachNav('mine')"
          >{{ 'mode.nav.mine' | i18n }}</div
        >
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
          <ng-template [ngTemplateOutlet]="search" />
          <ng-template [ngTemplateOutlet]="ld" />
        </div>
        <div *ngIf="state.type === 'mine'">
          <ng-template [ngTemplateOutlet]="search" />
          <ng-template [ngTemplateOutlet]="ld" />
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i6.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i6.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "directive", type: i7.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i7.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzStatus", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }, { kind: "directive", type: i7.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "pipe", type: i2.I18nPipe, name: "i18n" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: LayoutNavApplicationComponent, decorators: [{
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
    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item" (click)="diffChange()">{{
      'mode.nav' | i18n
    }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div
          *ngIf="showAllMenu"
          data-event-id="_nav_topic"
          data-name="全部应用"
          class="yz-application-text"
          (click)="attachNav('all')"
          >{{ 'mode.nav.all' | i18n }}</div
        >
        <div
          *ngIf="showMineMenu"
          data-event-id="_nav_topic"
          data-name="我的应用"
          class="yz-application-text"
          (click)="attachNav('mine')"
          >{{ 'mode.nav.mine' | i18n }}</div
        >
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
          <ng-template [ngTemplateOutlet]="search" />
          <ng-template [ngTemplateOutlet]="ld" />
        </div>
        <div *ngIf="state.type === 'mine'">
          <ng-template [ngTemplateOutlet]="search" />
          <ng-template [ngTemplateOutlet]="ld" />
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
        }], ctorParameters: () => [{ type: i1.YunzaiI18NService }, { type: i2._HttpClient }, { type: i0.Injector }, { type: i3.YunzaiConfigService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYvbGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzFDLE9BQU8sRUFFTCxxQkFBcUIsRUFDckIsTUFBTSxFQUlQLE1BQU0sYUFBYSxDQUFDO0FBR3JCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUErR3hFLE1BQU0sT0FBTyw2QkFBNkI7SUFZeEMsSUFBSSxXQUFXO1FBQ2IsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLEdBQUksQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsSUFBSyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFlBQ1UsSUFBdUIsRUFDdkIsSUFBaUIsRUFDakIsTUFBZ0I7SUFDeEIsYUFBYTtJQUNMLGFBQWtDLEVBQ2xCLEdBQWM7UUFMOUIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBRWhCLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQixRQUFHLEdBQUgsR0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdHVDtpQkFDRjs7MEJBNkJJLE1BQU07MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbmplY3RvciwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICBMYXlvdXROYXZBcHBsaWNhdGlvblN0YXRlLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIFl1bnphaU5hdlRvcGljXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4uL2Jpcy5jb25maWcnO1xuaW1wb3J0IHsgWXVuemFpSTE4TlNlcnZpY2UgfSBmcm9tICcuLi95dW56YWktaTE4bi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgbGF5b3V0LW5hdi1hcHBsaWNhdGlvbmAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSAgICAgIHNlYXJjaCBzdGFydC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjc2VhcmNoPlxuICAgICAgPGRpdiBuei1yb3cgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0LXNlYXJjaFwiPlxuICAgICAgICA8bnotaW5wdXQtZ3JvdXAgW256UHJlZml4XT1cInByZWZpeFRlbXBsYXRlXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9zZWFyY2hcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgbnotaW5wdXRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgJ2FwcGxpY2F0aW9uLnNlYXJjaCcgfCBpMThuIH19XCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwic3RhdGUuc2VhcmNoXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uU2VhcmNoKClcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNwcmVmaXhUZW1wbGF0ZT5cbiAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2VhcmNoXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uei1pbnB1dC1ncm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSBzZWFyY2ggZW5kIC0tPlxuXG4gICAgPCEtLSByaWdodCBtZW51IHN0YXJ0IC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjbGQ+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdFwiPlxuICAgICAgICA8dWw+XG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCB0b3BpYyBvZiBzdGF0ZS5saXN0XCI+XG4gICAgICAgICAgICA8aDU+e3sgdG9waWMubmFtZSB8IGkxOG4gfX08L2g1PlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfaXRlbVwiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtbmFtZV09XCJuYXYubmFtZSB8IGkxOG5cIlxuICAgICAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG5hdiBvZiB0b3BpYy5jaGlsZHJlblwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJvcGVuKG5hdilcIlxuICAgICAgICAgICAgICA+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9hXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSByaWdodCBtZW51IGVuZCAtLT5cblxuICAgIDwhLS0gICAgICBidXR0b24gc3RhcnQtLT5cbiAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2FwcFwiIGlkPVwibmF2QnRuXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW1cIiAoY2xpY2spPVwiZGlmZkNoYW5nZSgpXCI+e3tcbiAgICAgICdtb2RlLm5hdicgfCBpMThuXG4gICAgfX08L2Rpdj5cbiAgICA8IS0tICAgICAgYnV0dG9uIGVuZC0tPlxuXG4gICAgPCEtLSAgICAgIGhlYWRlciBzdGFydC0tPlxuICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvblwiIGlkPVwibmF2RHJvcGRvd25cIiBuei1yb3cgKm5nSWY9XCJzdGF0ZS5hY3RpdmVcIj5cbiAgICAgIDxkaXYgbnotY29sIFtuelNwYW5dPVwiM1wiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdG9waWNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0lmPVwic2hvd0FsbE1lbnVcIlxuICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3RvcGljXCJcbiAgICAgICAgICBkYXRhLW5hbWU9XCLlhajpg6jlupTnlKhcIlxuICAgICAgICAgIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiXG4gICAgICAgICAgKGNsaWNrKT1cImF0dGFjaE5hdignYWxsJylcIlxuICAgICAgICAgID57eyAnbW9kZS5uYXYuYWxsJyB8IGkxOG4gfX08L2RpdlxuICAgICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdJZj1cInNob3dNaW5lTWVudVwiXG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIlxuICAgICAgICAgIGRhdGEtbmFtZT1cIuaIkeeahOW6lOeUqFwiXG4gICAgICAgICAgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10ZXh0XCJcbiAgICAgICAgICAoY2xpY2spPVwiYXR0YWNoTmF2KCdtaW5lJylcIlxuICAgICAgICAgID57eyAnbW9kZS5uYXYubWluZScgfCBpMThuIH19PC9kaXZcbiAgICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIlxuICAgICAgICAgIFthdHRyLmRhdGEtbmFtZV09XCJuYXYubmFtZSB8IGkxOG5cIlxuICAgICAgICAgIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG5hdiBvZiBzdGF0ZS50b3BpY3NcIlxuICAgICAgICAgIChjbGljayk9XCJhdHRhY2hOYXYoJ290aGVyJywgbmF2KVwiXG4gICAgICAgICAgPnt7IG5hdi5uYW1lIHwgaTE4biB9fTwvZGl2XG4gICAgICAgID5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIyMVwiIFtuZ1N3aXRjaF09XCJzdGF0ZS50b3BpY1wiIGNsYXNzPVwieXotYXBwbGljYXRpb24tY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzdGF0ZS50eXBlID09PSAnYWxsJ1wiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzZWFyY2hcIiAvPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJsZFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic3RhdGUudHlwZSA9PT0gJ21pbmUnXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzdGF0ZS50eXBlID09PSAnb3RoZXInXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9pdGVtXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibmF2Lm5hbWUgfCBpMThuXCJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbmF2IG9mIHN0YXRlLmxpc3RcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvcGVuKG5hdilcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiPlxuICAgICAgICAgICAgICAgICAgPGg0Pnt7IG5hdi5uYW1lIHwgaTE4biB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICA8cD57eyBuYXYuaW50cm8gfCBpMThuIH19PC9wPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSAgICAgIGhlYWRlciBlbmQtLT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXROYXZBcHBsaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBiaXM6IFl1bnphaUJ1c2luZXNzQ29uZmlnID0gQlVTSU5FU1NfREVGQVVMVF9DT05GSUc7XG4gIHByaXZhdGUgJGRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuICBzdGF0ZTogTGF5b3V0TmF2QXBwbGljYXRpb25TdGF0ZSA9IHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHR5cGU6ICdhbGwnLFxuICAgIHRvcGljOiB1bmRlZmluZWQsXG4gICAgdG9waWNzOiBbXSxcbiAgICBsaXN0OiBbXSxcbiAgICBzZWFyY2g6IG51bGxcbiAgfTtcblxuICBnZXQgc2hvd0FsbE1lbnUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYmlzLm5hdikgcmV0dXJuIHRoaXMuYmlzLm5hdiEuYWxsITtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCBzaG93TWluZU1lbnUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYmlzLm5hdikgcmV0dXJuIHRoaXMuYmlzLm5hdiEubWluZSE7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGkxOG46IFl1bnphaUkxOE5TZXJ2aWNlLFxuICAgIHByaXZhdGUgaHR0cDogX0h0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgQEluamVjdChXSU5ET1cpIHByaXZhdGUgd2luOiBOelNhZmVBbnlcbiAgKSB7XG4gICAgdGhpcy5iaXMgPSBtZXJnZUJpc0NvbmZpZyhjb25maWdTZXJ2aWNlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZmV0Y2hBbGxUb3BpYygpO1xuICAgIHRoaXMuYXR0YWNoTmF2KCdhbGwnKTtcbiAgICB0aGlzLndpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTnpTYWZlQW55KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG4gICAgICBjb25zdCBidG4gPSB0aGlzLndpbi5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2QnRuJyk7XG4gICAgICBjb25zdCBkcm9wZG93biA9IHRoaXMud2luLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZEcm9wZG93bicpO1xuICAgICAgaWYgKGJ0biAmJiBkcm9wZG93biAmJiAhZHJvcGRvd24uY29udGFpbnModGFyZ2V0KSAmJiAhYnRuLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoQWxsVG9waWMoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUudG9waWNzID0gZ2V0VG9waWNzKCkhO1xuICB9XG5cbiAgYXR0YWNoTmF2KHR5cGU6ICdhbGwnIHwgJ21pbmUnIHwgJ290aGVyJywgdG9waWM/OiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgdGhpcy5kaXNwbGF5QWxsTmF2KCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnbWluZScpIHtcbiAgICAgIHRoaXMuZGlzcGxheU1pbmVOYXYoKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdvdGhlcicgJiYgdG9waWMpIHtcbiAgICAgIHRoaXMuZGlzcGxheU90aGVyTmF2KHRvcGljKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnNlYXJjaCA9IG51bGw7XG4gIH1cblxuICBkaXNwbGF5QWxsTmF2KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSBnZXRUb3BpY3MoKSE7XG4gIH1cblxuICBkaXNwbGF5TWluZU5hdigpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgdGhpcy5zdGF0ZS5saXN0ID0gZ2V0VG9waWNzKCkhXG4gICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5hdXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvcGljO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHRvcGljOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzcGxheU90aGVyTmF2KHRvcGljOiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLnRvcGljID0gdG9waWM7XG4gICAgY29uc3QgdGVtcDogWXVuemFpTmF2VG9waWNbXSA9IGdldFRvcGljcygpITtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSB0ZW1wLmZpbHRlcih0ID0+IHQua2V5ID09PSB0b3BpYy5rZXkpWzBdLmNoaWxkcmVuO1xuICB9XG5cbiAgZGlmZkNoYW5nZShmbGFnPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChmbGFnKSB7XG4gICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA9IGZsYWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID0gIXRoaXMuc3RhdGUuYWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4odG9waWM6IFl1bnphaU5hdlRvcGljKTogdm9pZCB7XG4gICAgaWYgKHRvcGljLmtleSkge1xuICAgICAgdGhpcy5odHRwXG4gICAgICAgIC5wb3N0KGAvYXBwLW1hbmFnZXIvd2ViLXNjYW4vc2F2ZWAsIHtcbiAgICAgICAgICBhcHBJZDogdG9waWMua2V5LFxuICAgICAgICAgIGNyZWF0ZURhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgfSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3kpKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHN3aXRjaCAodG9waWMudGFyZ2V0KSB7XG4gICAgICBjYXNlICdocmVmJzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdibGFuayc6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFyZ2V0JzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBvblNlYXJjaCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgY29uc3QgdGVtcDogWXVuemFpTmF2VG9waWNbXSA9IGdldFRvcGljcygpITtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWFyY2gpIHtcbiAgICAgIHRoaXMuc3RhdGUubGlzdCA9IHRlbXBcbiAgICAgICAgLmZpbHRlcigodG9waWM6IFl1bnphaU5hdlRvcGljKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaTE4bi5mYW55aSh0b3BpYy5uYW1lKS5pbmNsdWRlcyh0aGlzLnN0YXRlLnNlYXJjaCEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGljLmNoaWxkcmVuID0gdG9waWMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bi5mYW55aShjaGlsZC5uYW1lKS5pbmNsdWRlcyh0aGlzLnN0YXRlLnNlYXJjaCEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICAgIHRoaXMuc3RhdGUubGlzdCA9IGdldFRvcGljcygpITtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLiRkZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==