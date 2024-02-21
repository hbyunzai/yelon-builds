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
                this.win.location.href = topic.url;
                break;
            case 'target':
                this.win.location.href = topic.url;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiNavApplicationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.1", type: YunzaiNavApplicationComponent, isStandalone: true, selector: "yunzai-layout-nav-application", ngImport: i0, template: `
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
            <div class="yz-application-list">
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiNavApplicationComponent, decorators: [{
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
            <div class="yz-application-list">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYtYXBwbGljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1RSxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLE1BQU0sRUFDTixtQkFBbUIsRUFFcEIsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQTJHcEQsTUFBTSxPQUFPLDZCQUE2QjtJQXpHMUM7UUEwR21CLFdBQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUNyRCxTQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JDLGFB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QkFBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1HVDtvQkFDRCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7aUJBQzFGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgaW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgbWVyZ2VCaXNDb25maWcgfSBmcm9tICdAeWVsb24vYmlzL2NvbmZpZyc7XG5pbXBvcnQgeyBfSHR0cENsaWVudCwgSTE4blBpcGUsIFl1bnphaUh0dHBJMThOU2VydmljZSB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQge1xuICBMYXlvdXROYXZBcHBsaWNhdGlvblN0YXRlLFxuICB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIsXG4gIFdJTkRPVyxcbiAgWXVuemFpQ29uZmlnU2VydmljZSxcbiAgWXVuemFpTmF2VG9waWNcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56Rm9ybU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZm9ybSc7XG5pbXBvcnQgeyBOekdyaWRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2dyaWQnO1xuaW1wb3J0IHsgTnpJbnB1dE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaW5wdXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktbGF5b3V0LW5hdi1hcHBsaWNhdGlvbmAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNzZWFyY2g+XG4gICAgICA8ZGl2IG56LXJvdyBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3Qtc2VhcmNoXCI+XG4gICAgICAgIDxuei1pbnB1dC1ncm91cCBbbnpQcmVmaXhdPVwicHJlZml4VGVtcGxhdGVcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3NlYXJjaFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBuei1pbnB1dFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyAnYXBwbGljYXRpb24uc2VhcmNoJyB8IGkxOG4gfX1cIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJzdGF0ZS5zZWFyY2hcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWFyY2goKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3ByZWZpeFRlbXBsYXRlPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZWFyY2hcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L256LWlucHV0LWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjbGQ+XG4gICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdFwiPlxuICAgICAgICA8dWw+XG4gICAgICAgICAgQGZvciAodG9waWMgb2Ygc3RhdGUubGlzdDsgdHJhY2sgdG9waWMpIHtcbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGg1Pnt7IHRvcGljLm5hbWUgfCBpMThuIH19PC9oNT5cbiAgICAgICAgICAgICAgQGZvciAobmF2IG9mIHRvcGljLmNoaWxkcmVuOyB0cmFjayBuYXYpIHtcbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfaXRlbVwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibmF2Lm5hbWUgfCBpMThuXCJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW4obmF2KVwiXG4gICAgICAgICAgICAgICAgICA+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9hXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIH1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2FwcFwiIGlkPVwibmF2QnRuXCIgY2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW1cIiAoY2xpY2spPVwiZGlmZkNoYW5nZSgpXCJcbiAgICAgID57eyAnbW9kZS5uYXYnIHwgaTE4biB9fVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uXCIgaWQ9XCJuYXZEcm9wZG93blwiIG56LXJvdyAqbmdJZj1cInN0YXRlLmFjdGl2ZVwiPlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIzXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10b3BpY1wiPlxuICAgICAgICBAaWYgKHNob3dBbGxNZW51KSB7XG4gICAgICAgICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiIGRhdGEtbmFtZT1cIuWFqOmDqOW6lOeUqFwiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiIChjbGljayk9XCJhdHRhY2hOYXYoJ2FsbCcpXCJcbiAgICAgICAgICAgID57eyAnbW9kZS5uYXYuYWxsJyB8IGkxOG4gfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICBAaWYgKHNob3dNaW5lTWVudSkge1xuICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIiBkYXRhLW5hbWU9XCLmiJHnmoTlupTnlKhcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAoY2xpY2spPVwiYXR0YWNoTmF2KCdtaW5lJylcIlxuICAgICAgICAgICAgPnt7ICdtb2RlLm5hdi5taW5lJyB8IGkxOG4gfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICBAZm9yIChuYXYgb2Ygc3RhdGUudG9waWNzOyB0cmFjayBuYXYpIHtcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl90b3BpY1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLW5hbWVdPVwibmF2Lm5hbWUgfCBpMThuXCJcbiAgICAgICAgICAgIGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiYXR0YWNoTmF2KCdvdGhlcicsIG5hdilcIlxuICAgICAgICAgICAgPnt7IG5hdi5uYW1lIHwgaTE4biB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgbnotY29sIFtuelNwYW5dPVwiMjFcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICBAc3dpdGNoIChzdGF0ZS50eXBlKSB7XG4gICAgICAgICAgQGNhc2UgKCdhbGwnKSB7XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICBAY2FzZSAoJ21pbmUnKSB7XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICBAY2FzZSAoJ290aGVyJykge1xuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgIEBmb3IgKG5hdiBvZiBzdGF0ZS5saXN0OyB0cmFjayBuYXYpIHtcbiAgICAgICAgICAgICAgICAgICAgPGxpIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2l0ZW1cIiBbYXR0ci5kYXRhLW5hbWVdPVwibmF2Lm5hbWUgfCBpMThuXCIgKGNsaWNrKT1cIm9wZW4obmF2KVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57eyBuYXYubmFtZSB8IGkxOG4gfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3sgbmF2LmludHJvIHwgaTE4biB9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbSTE4blBpcGUsIEZvcm1zTW9kdWxlLCBOekZvcm1Nb2R1bGUsIE56SW5wdXRNb2R1bGUsIENvbW1vbk1vZHVsZSwgTnpHcmlkTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlOYXZBcHBsaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWcgPSBtZXJnZUJpc0NvbmZpZyhpbmplY3QoWXVuemFpQ29uZmlnU2VydmljZSkpO1xuICBwcml2YXRlIHJlYWRvbmx5IGh0dHAgPSBpbmplY3QoX0h0dHBDbGllbnQpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbiA9IGluamVjdChXSU5ET1cpO1xuICBwcml2YXRlIHJlYWRvbmx5IGkxOG4gPSBpbmplY3QoWXVuemFpSHR0cEkxOE5TZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc3RhdGU6IExheW91dE5hdkFwcGxpY2F0aW9uU3RhdGUgPSB7XG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICB0eXBlOiAnYWxsJyxcbiAgICB0b3BpYzogdW5kZWZpbmVkLFxuICAgIHRvcGljczogW10sXG4gICAgbGlzdDogW10sXG4gICAgc2VhcmNoOiBudWxsXG4gIH07XG5cbiAgZ2V0IHNob3dBbGxNZW51KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNvbmZpZy5uYXYpIHJldHVybiB0aGlzLmNvbmZpZy5uYXYhLmFsbCE7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgc2hvd01pbmVNZW51KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNvbmZpZy5uYXYpIHJldHVybiB0aGlzLmNvbmZpZy5uYXYhLm1pbmUhO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5mZXRjaEFsbFRvcGljKCk7XG4gICAgdGhpcy5hdHRhY2hOYXYoJ2FsbCcpO1xuICAgIHRoaXMud2luLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBOelNhZmVBbnkpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcbiAgICAgIGNvbnN0IGJ0biA9IHRoaXMud2luLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZCdG4nKTtcbiAgICAgIGNvbnN0IGRyb3Bkb3duID0gdGhpcy53aW4uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdkRyb3Bkb3duJyk7XG4gICAgICBpZiAoYnRuICYmIGRyb3Bkb3duICYmICFkcm9wZG93bi5jb250YWlucyh0YXJnZXQpICYmICFidG4uY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmV0Y2hBbGxUb3BpYygpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgdGhpcy5zdGF0ZS50b3BpY3MgPSBnZXRUb3BpY3MoKSE7XG4gIH1cblxuICBhdHRhY2hOYXYodHlwZTogJ2FsbCcgfCAnbWluZScgfCAnb3RoZXInLCB0b3BpYz86IFl1bnphaU5hdlRvcGljKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS50eXBlID0gdHlwZTtcbiAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XG4gICAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XG4gICAgICB0aGlzLmRpc3BsYXlBbGxOYXYoKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdtaW5lJykge1xuICAgICAgdGhpcy5kaXNwbGF5TWluZU5hdigpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ290aGVyJyAmJiB0b3BpYykge1xuICAgICAgdGhpcy5kaXNwbGF5T3RoZXJOYXYodG9waWMpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VhcmNoKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuc2VhcmNoID0gbnVsbDtcbiAgfVxuXG4gIGRpc3BsYXlBbGxOYXYoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUubGlzdCA9IGdldFRvcGljcygpITtcbiAgfVxuXG4gIGRpc3BsYXlNaW5lTmF2KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSBnZXRUb3BpY3MoKSFcbiAgICAgIC5maWx0ZXIoKHRvcGljOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICB0b3BpYy5jaGlsZHJlbiA9IHRvcGljLmNoaWxkcmVuLmZpbHRlcigoY2hpbGQ6IFl1bnphaU5hdlRvcGljKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkLmF1dGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigodG9waWM6IFl1bnphaU5hdlRvcGljKSA9PiB7XG4gICAgICAgIHJldHVybiB0b3BpYy5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgICAgfSk7XG4gIH1cblxuICBkaXNwbGF5T3RoZXJOYXYodG9waWM6IFl1bnphaU5hdlRvcGljKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUudG9waWMgPSB0b3BpYztcbiAgICBjb25zdCB0ZW1wOiBZdW56YWlOYXZUb3BpY1tdID0gZ2V0VG9waWNzKCkhO1xuICAgIHRoaXMuc3RhdGUubGlzdCA9IHRlbXAuZmlsdGVyKHQgPT4gdC5rZXkgPT09IHRvcGljLmtleSlbMF0uY2hpbGRyZW47XG4gIH1cblxuICBkaWZmQ2hhbmdlKGZsYWc/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGZsYWcpIHtcbiAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID0gZmxhZztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPSAhdGhpcy5zdGF0ZS5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgb3Blbih0b3BpYzogWXVuemFpTmF2VG9waWMpOiB2b2lkIHtcbiAgICBpZiAodG9waWMua2V5KSB7XG4gICAgICB0aGlzLmh0dHBcbiAgICAgICAgLnBvc3QoYC9hcHAtbWFuYWdlci93ZWItc2Nhbi9zYXZlYCwge1xuICAgICAgICAgIGFwcElkOiB0b3BpYy5rZXksXG4gICAgICAgICAgY3JlYXRlRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgc3dpdGNoICh0b3BpYy50YXJnZXQpIHtcbiAgICAgIGNhc2UgJ2hyZWYnOlxuICAgICAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JsYW5rJzpcbiAgICAgICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YXJnZXQnOlxuICAgICAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VhcmNoKCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICBjb25zdCB0ZW1wOiBZdW56YWlOYXZUb3BpY1tdID0gZ2V0VG9waWNzKCkhO1xuICAgIGlmICh0aGlzLnN0YXRlLnNlYXJjaCkge1xuICAgICAgdGhpcy5zdGF0ZS5saXN0ID0gdGVtcFxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pMThuLmZhbnlpKHRvcGljLm5hbWUpLmluY2x1ZGVzKHRoaXMuc3RhdGUuc2VhcmNoISkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuLmZhbnlpKGNoaWxkLm5hbWUpLmluY2x1ZGVzKHRoaXMuc3RhdGUuc2VhcmNoISk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKHRvcGljOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiB0b3BpYy5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgICAgdGhpcy5zdGF0ZS5saXN0ID0gZ2V0VG9waWNzKCkhO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19