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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LW5hdi1hcHBsaWNhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2xheW91dC1uYXYtYXBwbGljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1RSxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLE1BQU0sRUFDTixtQkFBbUIsRUFFcEIsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQTZHcEQsTUFBTSxPQUFPLDZCQUE2QjtJQTNHMUM7UUE0R21CLFdBQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUNyRCxTQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JDLGFB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O21CQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxR1Q7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO2lCQUMxRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIGluamVjdCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnQHllbG9uL2Jpcy9jb25maWcnO1xuaW1wb3J0IHsgX0h0dHBDbGllbnQsIEkxOG5QaXBlLCBZdW56YWlIdHRwSTE4TlNlcnZpY2UgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtcbiAgTGF5b3V0TmF2QXBwbGljYXRpb25TdGF0ZSxcbiAgdXNlTG9jYWxTdG9yYWdlSGVhZGVyLFxuICBXSU5ET1csXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIFl1bnphaU5hdlRvcGljXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekZvcm1Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Zvcm0nO1xuaW1wb3J0IHsgTnpHcmlkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9ncmlkJztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgeXVuemFpLWxheW91dC1uYXYtYXBwbGljYXRpb25gLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjc2VhcmNoPlxuICAgICAgPGRpdiBuei1yb3cgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0LXNlYXJjaFwiPlxuICAgICAgICA8bnotaW5wdXQtZ3JvdXAgW256UHJlZml4XT1cInByZWZpeFRlbXBsYXRlXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBkYXRhLWV2ZW50LWlkPVwiX25hdl9zZWFyY2hcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgbnotaW5wdXRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgJ2FwcGxpY2F0aW9uLnNlYXJjaCcgfCBpMThuIH19XCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwic3RhdGUuc2VhcmNoXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uU2VhcmNoKClcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNwcmVmaXhUZW1wbGF0ZT5cbiAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2VhcmNoXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uei1pbnB1dC1ncm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2xkPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3RcIj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIEBmb3IgKHRvcGljIG9mIHN0YXRlLmxpc3Q7IHRyYWNrIHRvcGljKSB7XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxoNT57eyB0b3BpYy5uYW1lIHwgaTE4biB9fTwvaDU+XG4gICAgICAgICAgICAgIEBmb3IgKG5hdiBvZiB0b3BpYy5jaGlsZHJlbjsgdHJhY2sgbmF2KSB7XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGRhdGEtZXZlbnQtaWQ9XCJfbmF2X2l0ZW1cIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm5hdi5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvcGVuKG5hdilcIlxuICAgICAgICAgICAgICAgICAgPnt7IG5hdi5uYW1lIHwgaTE4biB9fTwvYVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICB9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPGRpdiBkYXRhLWV2ZW50LWlkPVwiX25hdl9hcHBcIiBpZD1cIm5hdkJ0blwiIGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCIgKGNsaWNrKT1cImRpZmZDaGFuZ2UoKVwiXG4gICAgICA+e3sgJ21vZGUubmF2JyB8IGkxOG4gfX1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvblwiIGlkPVwibmF2RHJvcGRvd25cIiBuei1yb3cgKm5nSWY9XCJzdGF0ZS5hY3RpdmVcIj5cbiAgICAgIDxkaXYgbnotY29sIFtuelNwYW5dPVwiM1wiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdG9waWNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRvcGljLWxpc3RcIj5cbiAgICAgICAgQGlmIChzaG93QWxsTWVudSkge1xuICAgICAgICAgIDxkaXYgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIiBkYXRhLW5hbWU9XCLlhajpg6jlupTnlKhcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAoY2xpY2spPVwiYXR0YWNoTmF2KCdhbGwnKVwiXG4gICAgICAgICAgICA+e3sgJ21vZGUubmF2LmFsbCcgfCBpMThuIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgQGlmIChzaG93TWluZU1lbnUpIHtcbiAgICAgICAgICA8ZGl2IGRhdGEtZXZlbnQtaWQ9XCJfbmF2X3RvcGljXCIgZGF0YS1uYW1lPVwi5oiR55qE5bqU55SoXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10ZXh0XCIgKGNsaWNrKT1cImF0dGFjaE5hdignbWluZScpXCJcbiAgICAgICAgICAgID57eyAnbW9kZS5uYXYubWluZScgfCBpMThuIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgQGZvciAobmF2IG9mIHN0YXRlLnRvcGljczsgdHJhY2sgbmF2KSB7XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1ldmVudC1pZD1cIl9uYXZfdG9waWNcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm5hdi5uYW1lIHwgaTE4blwiXG4gICAgICAgICAgICBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImF0dGFjaE5hdignb3RoZXInLCBuYXYpXCJcbiAgICAgICAgICAgID57eyBuYXYubmFtZSB8IGkxOG4gfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIyMVwiIGNsYXNzPVwieXotYXBwbGljYXRpb24tY29udGFpbmVyXCI+XG4gICAgICAgIEBzd2l0Y2ggKHN0YXRlLnR5cGUpIHtcbiAgICAgICAgICBAY2FzZSAoJ2FsbCcpIHtcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIEBjYXNlICgnbWluZScpIHtcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIEBjYXNlICgnb3RoZXInKSB7XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdCB5ei1hcHBsaWNhdGlvbi1saXN0LW90aGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICBAZm9yIChuYXYgb2Ygc3RhdGUubGlzdDsgdHJhY2sgbmF2KSB7XG4gICAgICAgICAgICAgICAgICAgIDxsaSBkYXRhLWV2ZW50LWlkPVwiX25hdl9pdGVtXCIgW2F0dHIuZGF0YS1uYW1lXT1cIm5hdi5uYW1lIHwgaTE4blwiIChjbGljayk9XCJvcGVuKG5hdilcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3sgbmF2Lm5hbWUgfCBpMThuIH19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt7IG5hdi5pbnRybyB8IGkxOG4gfX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0kxOG5QaXBlLCBGb3Jtc01vZHVsZSwgTnpGb3JtTW9kdWxlLCBOeklucHV0TW9kdWxlLCBDb21tb25Nb2R1bGUsIE56R3JpZE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTmF2QXBwbGljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnID0gbWVyZ2VCaXNDb25maWcoaW5qZWN0KFl1bnphaUNvbmZpZ1NlcnZpY2UpKTtcbiAgcHJpdmF0ZSByZWFkb25seSBodHRwID0gaW5qZWN0KF9IdHRwQ2xpZW50KTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW4gPSBpbmplY3QoV0lORE9XKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpMThuID0gaW5qZWN0KFl1bnphaUh0dHBJMThOU2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHN0YXRlOiBMYXlvdXROYXZBcHBsaWNhdGlvblN0YXRlID0ge1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgdHlwZTogJ2FsbCcsXG4gICAgdG9waWM6IHVuZGVmaW5lZCxcbiAgICB0b3BpY3M6IFtdLFxuICAgIGxpc3Q6IFtdLFxuICAgIHNlYXJjaDogbnVsbFxuICB9O1xuXG4gIGdldCBzaG93QWxsTWVudSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jb25maWcubmF2KSByZXR1cm4gdGhpcy5jb25maWcubmF2IS5hbGwhO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IHNob3dNaW5lTWVudSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jb25maWcubmF2KSByZXR1cm4gdGhpcy5jb25maWcubmF2IS5taW5lITtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZmV0Y2hBbGxUb3BpYygpO1xuICAgIHRoaXMuYXR0YWNoTmF2KCdhbGwnKTtcbiAgICB0aGlzLndpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTnpTYWZlQW55KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG4gICAgICBjb25zdCBidG4gPSB0aGlzLndpbi5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2QnRuJyk7XG4gICAgICBjb25zdCBkcm9wZG93biA9IHRoaXMud2luLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZEcm9wZG93bicpO1xuICAgICAgaWYgKGJ0biAmJiBkcm9wZG93biAmJiAhZHJvcGRvd24uY29udGFpbnModGFyZ2V0KSAmJiAhYnRuLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoQWxsVG9waWMoKTogdm9pZCB7XG4gICAgY29uc3QgWywgZ2V0VG9waWNzXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIHRoaXMuc3RhdGUudG9waWNzID0gZ2V0VG9waWNzKCkhO1xuICB9XG5cbiAgYXR0YWNoTmF2KHR5cGU6ICdhbGwnIHwgJ21pbmUnIHwgJ290aGVyJywgdG9waWM/OiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgdGhpcy5kaXNwbGF5QWxsTmF2KCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnbWluZScpIHtcbiAgICAgIHRoaXMuZGlzcGxheU1pbmVOYXYoKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdvdGhlcicgJiYgdG9waWMpIHtcbiAgICAgIHRoaXMuZGlzcGxheU90aGVyTmF2KHRvcGljKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnNlYXJjaCA9IG51bGw7XG4gIH1cblxuICBkaXNwbGF5QWxsTmF2KCk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSBnZXRUb3BpY3MoKSE7XG4gIH1cblxuICBkaXNwbGF5TWluZU5hdigpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgdGhpcy5zdGF0ZS5saXN0ID0gZ2V0VG9waWNzKCkhXG4gICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5hdXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvcGljO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHRvcGljOiBZdW56YWlOYXZUb3BpYykgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzcGxheU90aGVyTmF2KHRvcGljOiBZdW56YWlOYXZUb3BpYyk6IHZvaWQge1xuICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICB0aGlzLnN0YXRlLnRvcGljID0gdG9waWM7XG4gICAgY29uc3QgdGVtcDogWXVuemFpTmF2VG9waWNbXSA9IGdldFRvcGljcygpITtcbiAgICB0aGlzLnN0YXRlLmxpc3QgPSB0ZW1wLmZpbHRlcih0ID0+IHQua2V5ID09PSB0b3BpYy5rZXkpWzBdLmNoaWxkcmVuO1xuICB9XG5cbiAgZGlmZkNoYW5nZShmbGFnPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChmbGFnKSB7XG4gICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA9IGZsYWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID0gIXRoaXMuc3RhdGUuYWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4odG9waWM6IFl1bnphaU5hdlRvcGljKTogdm9pZCB7XG4gICAgaWYgKHRvcGljLmtleSkge1xuICAgICAgdGhpcy5odHRwXG4gICAgICAgIC5wb3N0KGAvYXBwLW1hbmFnZXIvd2ViLXNjYW4vc2F2ZWAsIHtcbiAgICAgICAgICBhcHBJZDogdG9waWMua2V5LFxuICAgICAgICAgIGNyZWF0ZURhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgfSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHN3aXRjaCAodG9waWMudGFyZ2V0KSB7XG4gICAgICBjYXNlICdocmVmJzpcbiAgICAgICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdibGFuayc6XG4gICAgICAgIHRoaXMud2luLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFyZ2V0JzpcbiAgICAgICAgdGhpcy53aW4ubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLndpbi5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBvblNlYXJjaCgpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBnZXRUb3BpY3NdID0gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk7XG4gICAgY29uc3QgdGVtcDogWXVuemFpTmF2VG9waWNbXSA9IGdldFRvcGljcygpITtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWFyY2gpIHtcbiAgICAgIHRoaXMuc3RhdGUubGlzdCA9IHRlbXBcbiAgICAgICAgLmZpbHRlcigodG9waWM6IFl1bnphaU5hdlRvcGljKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaTE4bi5mYW55aSh0b3BpYy5uYW1lKS5pbmNsdWRlcyh0aGlzLnN0YXRlLnNlYXJjaCEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGljLmNoaWxkcmVuID0gdG9waWMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bi5mYW55aShjaGlsZC5uYW1lKS5pbmNsdWRlcyh0aGlzLnN0YXRlLnNlYXJjaCEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogWXVuemFpTmF2VG9waWMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFssIGdldFRvcGljc10gPSB1c2VMb2NhbFN0b3JhZ2VIZWFkZXIoKTtcbiAgICAgIHRoaXMuc3RhdGUubGlzdCA9IGdldFRvcGljcygpITtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==