import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { mergeBisConfig } from '@yelon/bis/config';
import { _HttpClient, I18nPipe, YunzaiHttpI18NService } from '@yelon/theme';
import { useLocalStorageHeader, WINDOW, YunzaiConfigService } from '@yelon/util';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "ng-zorro-antd/grid";
import * as i3 from "ng-zorro-antd/input";
import * as i4 from "@angular/common";
export class YunzaiNavApplicationComponent {
    constructor() {
        this.config = mergeBisConfig(inject(YunzaiConfigService));
        this.http = inject(_HttpClient);
        this.win = inject(WINDOW);
        this.i18n = inject(YunzaiHttpI18NService);
        this.destroy$ = new Subject();
        this.state = {
            active: false,
            type: 'all',
            topic: undefined,
            topics: [],
            list: [],
            search: null
        };
    }
    get showAllMenu() {
        if (this.config.nav)
            return this.config.nav.all;
        return true;
    }
    get showMineMenu() {
        if (this.config.nav)
            return this.config.nav.mine;
        return true;
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
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }
        switch (topic.target) {
            case 'href':
                this.win.location.href = topic.url;
                break;
            case 'blank':
                this.win.open(topic.url);
                break;
            case 'target':
                this.win.open(topic.url);
                break;
            default:
                this.win.location.href = topic.url;
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
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiNavApplicationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0", type: YunzaiNavApplicationComponent, isStandalone: true, selector: "yunzai-layout-nav-application", ngImport: i0, template: `
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

    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          @for (topic of state.list; track topic) {
            <li>
              <h5>{{ topic.name | i18n }}</h5>
              @for (nav of topic.children; track nav) {
                <a
                  data-event-id="_nav_item"
                  [attr.data-name]="nav.name | i18n"
                  href="javascript:;"
                  (click)="open(nav)"
                  >{{ nav.name | i18n }}</a
                >
              }
            </li>
          }
        </ul>
      </div>
    </ng-template>

    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item" (click)="diffChange()"
      >{{ 'mode.nav' | i18n }}
    </div>

    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-topic-list">
          @if (showAllMenu) {
            <div data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text" (click)="attachNav('all')"
              >{{ 'mode.nav.all' | i18n }}
            </div>
          }
          @if (showMineMenu) {
            <div data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text" (click)="attachNav('mine')"
              >{{ 'mode.nav.mine' | i18n }}
            </div>
          }
          @for (nav of state.topics; track nav) {
            <div
              data-event-id="_nav_topic"
              [attr.data-name]="nav.name | i18n"
              class="yz-application-text"
              (click)="attachNav('other', nav)"
              >{{ nav.name | i18n }}
            </div>
          }
        </div>
      </div>
      <div nz-col [nzSpan]="21" class="yz-application-container">
        @switch (state.type) {
          @case ('all') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('mine') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('other') {
            <div class="yz-application-list yz-application-list-other">
              <div class="yz-application-list-item">
                <ul>
                  @for (nav of state.list; track nav) {
                    <li data-event-id="_nav_item" [attr.data-name]="nav.name | i18n" (click)="open(nav)">
                      <a href="javascript:;">
                        <h4>{{ nav.name | i18n }}</h4>
                        <p>{{ nav.intro | i18n }}</p>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "pipe", type: I18nPipe, name: "i18n" }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzFormModule }, { kind: "directive", type: i2.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i2.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "ngmodule", type: NzInputModule }, { kind: "directive", type: i3.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i3.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzStatus", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }, { kind: "directive", type: i3.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzGridModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: YunzaiNavApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-layout-nav-application`,
                    template: `
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

    <ng-template #ld>
      <div class="yz-application-list">
        <ul>
          @for (topic of state.list; track topic) {
            <li>
              <h5>{{ topic.name | i18n }}</h5>
              @for (nav of topic.children; track nav) {
                <a
                  data-event-id="_nav_item"
                  [attr.data-name]="nav.name | i18n"
                  href="javascript:;"
                  (click)="open(nav)"
                  >{{ nav.name | i18n }}</a
                >
              }
            </li>
          }
        </ul>
      </div>
    </ng-template>

    <div data-event-id="_nav_app" id="navBtn" class="yunzai-default__nav-item" (click)="diffChange()"
      >{{ 'mode.nav' | i18n }}
    </div>

    <div class="yz-application" id="navDropdown" nz-row *ngIf="state.active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-topic-list">
          @if (showAllMenu) {
            <div data-event-id="_nav_topic" data-name="全部应用" class="yz-application-text" (click)="attachNav('all')"
              >{{ 'mode.nav.all' | i18n }}
            </div>
          }
          @if (showMineMenu) {
            <div data-event-id="_nav_topic" data-name="我的应用" class="yz-application-text" (click)="attachNav('mine')"
              >{{ 'mode.nav.mine' | i18n }}
            </div>
          }
          @for (nav of state.topics; track nav) {
            <div
              data-event-id="_nav_topic"
              [attr.data-name]="nav.name | i18n"
              class="yz-application-text"
              (click)="attachNav('other', nav)"
              >{{ nav.name | i18n }}
            </div>
          }
        </div>
      </div>
      <div nz-col [nzSpan]="21" class="yz-application-container">
        @switch (state.type) {
          @case ('all') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('mine') {
            <div>
              <ng-template [ngTemplateOutlet]="search" />
              <ng-template [ngTemplateOutlet]="ld" />
            </div>
          }
          @case ('other') {
            <div class="yz-application-list yz-application-list-other">
              <div class="yz-application-list-item">
                <ul>
                  @for (nav of state.list; track nav) {
                    <li data-event-id="_nav_item" [attr.data-name]="nav.name | i18n" (click)="open(nav)">
                      <a href="javascript:;">
                        <h4>{{ nav.name | i18n }}</h4>
                        <p>{{ nav.intro | i18n }}</p>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
                    standalone: true,
                    imports: [I18nPipe, FormsModule, NzFormModule, NzInputModule, CommonModule, NzGridModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYtYXBwbGljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1RSxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLE1BQU0sRUFDTixtQkFBbUIsRUFFcEIsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQTZHcEQsTUFBTSxPQUFPLDZCQUE2QjtJQTNHMUM7UUE0R21CLFdBQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUNyRCxTQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JDLGFB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Q1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFHVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7aUJBQzFGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgaW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgbWVyZ2VCaXNDb25maWcgfSBmcm9tICdAeWVsb24vYmlzL2NvbmZpZyc7XG5pbXBvcnQgeyBfSHR0cENsaWVudCwgSTE4blBpcGUsIFl1bnphaUh0dHBJMThOU2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICBMYXlvdXROYXZBcHBsaWNhdGlvblN0YXRlLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQ29uZmlnU2VydmljZSxcbiAgWXVuemFpTmF2VG9waWNcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56Rm9ybU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZm9ybSc7XG5pbXBvcnQgeyBOekdyaWRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2dyaWQnO1xuaW1wb3J0IHsgTnpJbnB1dE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaW5wdXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktbGF5b3V0LW5hdi1hcHBsaWNhdGlvbmAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNzZWFyY2g+XG4gICAgICA8ZGl2IG56LXJvdyBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3Qtc2VhcmNoXCI+XG4gICAgICAgIDxuei1pbnB1dC1ncm91cCBbbnpQcmVmaXhdPVwicHJlZml4VGVtcGxhdGVcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3NlYXJjaFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBuei1pbnB1dFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyAnYXBwbGljYXRpb24uc2VhcmNoJyB8IGkxOG4gfX1cIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJzdGF0ZS5zZWFyY2hcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWFyY2goKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3ByZWZpeFRlbXBsYXRlPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZWFyY2hcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L256LWlucHV0LWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjbGQ+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdFwiPlxuICAgICAgICA8dWw+XG4gICAgICAgICAgQGZvciAodG9waWMgb2Ygc3RhdGUubGlzdDsgdHJhY2sgdG9waWMpIHtcbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGg1Pnt7IHRvcGljLm5hbWUgfCBpMThuIH19PC9oNT5cbiAgICAgICAgICAgICAgQGZvciAobmF2IG9mIHRvcGljLmNoaWxkcmVuOyB0cmFjayBuYXYpIHtcbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfaXRlbVwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibmF2Lm5hbWUgfCBpMThuXCJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW4obmF2KVwiXG4gICAgICAgICAgICAgICAgICA+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9hXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIH1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2FwcFwiIGlkPVwibmF2QnRuXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW1cIiAoY2xpY2spPVwiZGlmZkNoYW5nZSgpXCJcbiAgICAgID57eyAnbW9kZS5uYXYnIHwgaTE4biB9fVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uXCIgaWQ9XCJuYXZEcm9wZG93blwiIG56LXJvdyAqbmdJZj1cInN0YXRlLmFjdGl2ZVwiPlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIzXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10b3BpY1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tdG9waWMtbGlzdFwiPlxuICAgICAgICAgIEBpZiAoc2hvd0FsbE1lbnUpIHtcbiAgICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIiBkYXRhLW5hbWU9XCLlhajpg6jlupTnlKhcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAoY2xpY2spPVwiYXR0YWNoTmF2KCdhbGwnKVwiXG4gICAgICAgICAgICAgID57eyAnbW9kZS5uYXYuYWxsJyB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICBAaWYgKHNob3dNaW5lTWVudSkge1xuICAgICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiIGRhdGEtbmFtZT1cIuaIkeeahOW6lOeUqFwiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiIChjbGljayk9XCJhdHRhY2hOYXYoJ21pbmUnKVwiXG4gICAgICAgICAgICAgID57eyAnbW9kZS5uYXYubWluZScgfCBpMThuIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgQGZvciAobmF2IG9mIHN0YXRlLnRvcGljczsgdHJhY2sgbmF2KSB7XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3RvcGljXCJcbiAgICAgICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm5hdi5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICAgIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJhdHRhY2hOYXYoJ290aGVyJywgbmF2KVwiXG4gICAgICAgICAgICAgID57eyBuYXYubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgbnotY29sIFtuelNwYW5dPVwiMjFcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICBAc3dpdGNoIChzdGF0ZS50eXBlKSB7XG4gICAgICAgICAgQGNhc2UgKCdhbGwnKSB7XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICBAY2FzZSAoJ21pbmUnKSB7XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICBAY2FzZSAoJ290aGVyJykge1xuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3QgeXotYXBwbGljYXRpb24tbGlzdC1vdGhlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgQGZvciAobmF2IG9mIHN0YXRlLmxpc3Q7IHRyYWNrIG5hdikge1xuICAgICAgICAgICAgICAgICAgICA8bGkgZGF0YS1ldmVudC1pZD1cIl9uYXZfaXRlbVwiIFthdHRyLmRhdGEtbmFtZV09XCJuYXYubmFtZSB8IGkxOG5cIiAoY2xpY2spPVwib3BlbihuYXYpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pnt7IG5hdi5uYW1lIHwgaTE4biB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57eyBuYXYuaW50cm8gfCBpMThuIH19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtJMThuUGlwZSwgRm9ybXNNb2R1bGUsIE56Rm9ybU1vZHVsZSwgTnpJbnB1dE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOekdyaWRNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFl1bnphaU5hdkFwcGxpY2F0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZyA9IG1lcmdlQmlzQ29uZmlnKGluamVjdChZdW56YWlDb25maWdTZXJ2aWNlKSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaHR0cCA9IGluamVjdChfSHR0cENsaWVudCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luID0gaW5qZWN0KFdJTkRPVyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4biA9IGluamVjdChZdW56YWlIdHRwSTE4TlNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBzdGF0ZTogTGF5b3V0TmF2QXBwbGljYXRpb25TdGF0ZSA9IHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHR5cGU6ICdhbGwnLFxuICAgIHRvcGljOiB1bmRlZmluZWQsXG4gICAgdG9waWNzOiBbXSxcbiAgICBsaXN0OiBbXSxcbiAgICBzZWFyY2g6IG51bGxcbiAgfTtcblxuICBnZXQgc2hvd0FsbE1lbnUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm5hdikgcmV0dXJuIHRoaXMuY29uZmlnLm5hdiEuYWxsITtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCBzaG93TWluZU1lbnUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm5hdikgcmV0dXJuIHRoaXMuY29uZmlnLm5hdiEubWluZSE7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZldGNoQWxsVG9waWMoKTtcbiAgICB0aGlzLmF0dGFjaE5hdignYWxsJyk7XG4gICAgdGhpcy53aW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IE56U2FmZUFueSkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgY29uc3QgYnRuID0gdGhpcy53aW4uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdkJ0bicpO1xuICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLndpbi5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2RHJvcGRvd24nKTtcbiAgICAgIGlmIChidG4gJiYgZHJvcGRvd24gJiYgIWRyb3Bkb3duLmNvbnRhaW5zKHRhcmdldCkgJiYgIWJ0bi5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaEFsbFRvcGljKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLnRvcGljcyA9IGdldFRvcGljcygpITtcbiAgfVxuXG4gIGF0dGFjaE5hdih0eXBlOiAnYWxsJyB8ICdtaW5lJyB8ICdvdGhlcicsIHRvcGljPzogWXVuemFpTmF2VG9waWMpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgIHRoaXMuZGlzcGxheUFsbE5hdigpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ21pbmUnKSB7XG4gICAgICB0aGlzLmRpc3BsYXlNaW5lTmF2KCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnb3RoZXInICYmIHRvcGljKSB7XG4gICAgICB0aGlzLmRpc3BsYXlPdGhlck5hdih0b3BpYyk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJTZWFyY2goKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5zZWFyY2ggPSBudWxsO1xuICB9XG5cbiAgZGlzcGxheUFsbE5hdigpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgdGhpcy5zdGF0ZS5saXN0ID0gZ2V0VG9waWNzKCkhO1xuICB9XG5cbiAgZGlzcGxheU1pbmVOYXYoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUubGlzdCA9IGdldFRvcGljcygpIVxuICAgICAgLmZpbHRlcigodG9waWM6IFl1bnphaU5hdlRvcGljKSA9PiB7XG4gICAgICAgIHRvcGljLmNoaWxkcmVuID0gdG9waWMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQuYXV0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgcmV0dXJuIHRvcGljLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgICB9KTtcbiAgfVxuXG4gIGRpc3BsYXlPdGhlck5hdih0b3BpYzogWXVuemFpTmF2VG9waWMpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgdGhpcy5zdGF0ZS50b3BpYyA9IHRvcGljO1xuICAgIGNvbnN0IHRlbXA6IFl1bnphaU5hdlRvcGljW10gPSBnZXRUb3BpY3MoKSE7XG4gICAgdGhpcy5zdGF0ZS5saXN0ID0gdGVtcC5maWx0ZXIodCA9PiB0LmtleSA9PT0gdG9waWMua2V5KVswXS5jaGlsZHJlbjtcbiAgfVxuXG4gIGRpZmZDaGFuZ2UoZmxhZz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZmxhZykge1xuICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPSBmbGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA9ICF0aGlzLnN0YXRlLmFjdGl2ZTtcbiAgICB9XG4gIH1cblxuICBvcGVuKHRvcGljOiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIGlmICh0b3BpYy5rZXkpIHtcbiAgICAgIHRoaXMuaHR0cFxuICAgICAgICAucG9zdChgL2FwcC1tYW5hZ2VyL3dlYi1zY2FuL3NhdmVgLCB7XG4gICAgICAgICAgYXBwSWQ6IHRvcGljLmtleSxcbiAgICAgICAgICBjcmVhdGVEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvcGljLnRhcmdldCkge1xuICAgICAgY2FzZSAnaHJlZic6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmxhbmsnOlxuICAgICAgICB0aGlzLndpbi5vcGVuKHRvcGljLnVybCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFyZ2V0JzpcbiAgICAgICAgdGhpcy53aW4ub3Blbih0b3BpYy51cmwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VhcmNoKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICBjb25zdCB0ZW1wOiBZdW56YWlOYXZUb3BpY1tdID0gZ2V0VG9waWNzKCkhO1xuICAgIGlmICh0aGlzLnN0YXRlLnNlYXJjaCkge1xuICAgICAgdGhpcy5zdGF0ZS5saXN0ID0gdGVtcFxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pMThuLmZhbnlpKHRvcGljLm5hbWUpLmluY2x1ZGVzKHRoaXMuc3RhdGUuc2VhcmNoISkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuLmZhbnlpKGNoaWxkLm5hbWUpLmluY2x1ZGVzKHRoaXMuc3RhdGUuc2VhcmNoISk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKHRvcGljOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiB0b3BpYy5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgICAgdGhpcy5zdGF0ZS5saXN0ID0gZ2V0VG9waWNzKCkhO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19