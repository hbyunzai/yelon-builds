import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WINDOW } from '@yelon/util';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/cache";
import * as i2 from "../yz.i18n.service";
import * as i3 from "@yelon/theme";
import * as i4 from "ng-zorro-antd/input";
import * as i5 from "ng-zorro-antd/grid";
import * as i6 from "ng-zorro-antd/core/transition-patch";
import * as i7 from "@angular/forms";
import * as i8 from "ng-zorro-antd/icon";
import * as i9 from "@angular/common";
export var TOPIC;
(function (TOPIC) {
    TOPIC[TOPIC["FULL"] = 0] = "FULL";
    TOPIC[TOPIC["OWN"] = 1] = "OWN";
    TOPIC[TOPIC["EVERY"] = 2] = "EVERY";
})(TOPIC || (TOPIC = {}));
export class YzHeaderApplicationComponent {
    constructor(inject, cacheService, i18n, http) {
        this.inject = inject;
        this.cacheService = cacheService;
        this.i18n = i18n;
        this.http = http;
        this.T = TOPIC;
        this.active = false;
        this.topicData = [];
        this.listData = [];
        this.topic = TOPIC.FULL;
        this.searchValue = null;
        this.subs = [];
    }
    ngOnInit() {
        this.topicData = this.cacheService.get('_yz_header', { mode: 'none' });
        this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
    }
    ngOnDestroy() {
        this.subs.forEach(f => f.unsubscribe());
    }
    diffChange(flag) {
        if (flag) {
            this.active = flag;
        }
        else {
            this.active = !this.active;
        }
    }
    initTopic(topic) {
        this.searchValue = null;
        this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
        this.topic = topic;
    }
    full() {
        this.initTopic(TOPIC.FULL);
    }
    own() {
        this.initTopic(TOPIC.OWN);
        const temp = this.cacheService.get('_yz_header', { mode: 'none' });
        this.listData = temp
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
    every(e) {
        this.initTopic(TOPIC.EVERY);
        this.choosed = e;
        const temp = this.cacheService.get('_yz_header', { mode: 'none' });
        this.listData = [...temp.filter(t => t.key === e.key)[0].children];
    }
    onSearch() {
        const temp = this.cacheService.get('_yz_header', { mode: 'none' });
        // 如果搜索输入的有值
        if (this.searchValue) {
            // 过滤菜单过滤出搜索的值
            this.listData = temp
                .filter((topic) => {
                if (this.i18n.fanyi(topic.name).includes(this.searchValue)) {
                    return topic;
                }
                else {
                    topic.children = topic.children.filter((child) => {
                        return this.i18n.fanyi(child.name).includes(this.searchValue);
                    });
                    return topic;
                }
            })
                .filter((topic) => {
                return topic.children.length > 0;
            });
        }
        else {
            // 如果没有值,取消搜索
            this.listData = this.cacheService.get('_yz_header', { mode: 'none' });
        }
    }
    open(topic) {
        if (topic.key) {
            this.subs.push(this.http
                .post(`/app-manager/web-scan/save`, {
                appId: topic.key,
                createDate: new Date()
            })
                .subscribe());
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
}
YzHeaderApplicationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzHeaderApplicationComponent, deps: [{ token: i0.Injector }, { token: i1.CacheService }, { token: i2.YzI18NService }, { token: i3._HttpClient }], target: i0.ɵɵFactoryTarget.Component });
YzHeaderApplicationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: YzHeaderApplicationComponent, selector: "yz-header-application", ngImport: i0, template: `
    <!--      template start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="searchValue"
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
          <li *ngFor="let d of listData">
            <h5>{{ d.name }}</h5>
            <a href="javascript:;" *ngFor="let cd of d.children" (click)="open(cd)">{{ cd.name }}</a>
          </li>
        </ul>
      </div>
    </ng-template>
    <!--      template end-->

    <!--      button start-->
    <div class="yunzai-default__nav-item" (click)="diffChange()"> {{ 'application.button' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" nz-row *ngIf="active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-text" (click)="full()">{{ 'application.all' | i18n }}</div>
        <div class="yz-application-text" (click)="own()">{{ 'application.mine' | i18n }}</div>
        <div class="yz-application-text" *ngFor="let d of topicData" (click)="every(d)">
          {{ d.name }}
        </div>
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="topic" class="yz-application-container">
        <div *ngSwitchCase="T.FULL">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngSwitchCase="T.OWN">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngSwitchCase="T.EVERY" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li *ngFor="let d of listData" (click)="open(d)">
                <a href="javascript:;">
                  <h4>{{ d.name }}</h4>
                  <p>{{ d.intro }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `, isInline: true, components: [{ type: i4.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }], directives: [{ type: i5.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i4.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { type: i4.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "disabled"], exportAs: ["nzInput"] }, { type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { type: i9.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i9.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "i18n": i3.I18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzHeaderApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yz-header-application',
                    template: `
    <!--      template start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            type="text"
            nz-input
            placeholder="{{ 'application.search' | i18n }}"
            [(ngModel)]="searchValue"
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
          <li *ngFor="let d of listData">
            <h5>{{ d.name }}</h5>
            <a href="javascript:;" *ngFor="let cd of d.children" (click)="open(cd)">{{ cd.name }}</a>
          </li>
        </ul>
      </div>
    </ng-template>
    <!--      template end-->

    <!--      button start-->
    <div class="yunzai-default__nav-item" (click)="diffChange()"> {{ 'application.button' | i18n }}</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" nz-row *ngIf="active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-text" (click)="full()">{{ 'application.all' | i18n }}</div>
        <div class="yz-application-text" (click)="own()">{{ 'application.mine' | i18n }}</div>
        <div class="yz-application-text" *ngFor="let d of topicData" (click)="every(d)">
          {{ d.name }}
        </div>
      </div>
      <div nz-col [nzSpan]="21" [ngSwitch]="topic" class="yz-application-container">
        <div *ngSwitchCase="T.FULL">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngSwitchCase="T.OWN">
          <ng-template [ngTemplateOutlet]="search"></ng-template>
          <ng-template [ngTemplateOutlet]="ld"></ng-template>
        </div>
        <div *ngSwitchCase="T.EVERY" class="yz-application-list">
          <div class="yz-application-list-item">
            <ul>
              <li *ngFor="let d of listData" (click)="open(d)">
                <a href="javascript:;">
                  <h4>{{ d.name }}</h4>
                  <p>{{ d.intro }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--      header end-->
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.CacheService }, { type: i2.YzI18NService }, { type: i3._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYXBwbGljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l6LmFwcGxpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUErQixNQUFNLGVBQWUsQ0FBQztBQUtoRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7OztBQUlyQyxNQUFNLENBQU4sSUFBWSxLQUlYO0FBSkQsV0FBWSxLQUFLO0lBQ2YsaUNBQUksQ0FBQTtJQUNKLCtCQUFHLENBQUE7SUFDSCxtQ0FBSyxDQUFBO0FBQ1AsQ0FBQyxFQUpXLEtBQUssS0FBTCxLQUFLLFFBSWhCO0FBK0ZELE1BQU0sT0FBTyw0QkFBNEI7SUFVdkMsWUFDVSxNQUFnQixFQUNoQixZQUEwQixFQUMxQixJQUFtQixFQUNuQixJQUFpQjtRQUhqQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQWU7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQWIzQixNQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ1YsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUM3QixVQUFLLEdBQVUsS0FBSyxDQUFDLElBQUksQ0FBQztRQUUxQixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsU0FBSSxHQUFtQixFQUFFLENBQUM7SUFPdkIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxD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QUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xELE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtTQUNUO0lBQ0gsQ0FBQzs7eUhBcEhVLDRCQUE0Qjs2R0FBNUIsNEJBQTRCLDZEQXRFN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRVQ7MkZBR1UsNEJBQTRCO2tCQXhFeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2NhY2hlJztcbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgWXpJMThOU2VydmljZSB9IGZyb20gJy4uL3l6LmkxOG4uc2VydmljZSc7XG5cbmV4cG9ydCBlbnVtIFRPUElDIHtcbiAgRlVMTCxcbiAgT1dOLFxuICBFVkVSWVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlclRvcGljIHtcbiAgLy8g5b+Y5LqGXG4gIGF0dHJpYnV0ZTogYW55O1xuICAvLyDlrZDoj5zljZVcbiAgY2hpbGRyZW46IEhlYWRlclRvcGljW107XG4gIC8vIOaPj+i/sFxuICBpbnRybzogc3RyaW5nO1xuICAvLyBrZXlcbiAga2V5OiBzdHJpbmc7XG4gIC8vIOWQjeensFxuICBuYW1lOiBzdHJpbmc7XG4gIC8vIOaJk+W8gOaWueW8j1xuICB0YXJnZXQ6IHN0cmluZztcbiAgLy8g5piv5ZCm5pyJ5p2D6ZmQ5omT5byAXG4gIGF1dGg6IGJvb2xlYW47XG4gIC8vIOi3r+W+hFxuICB1cmw6IHN0cmluZztcbiAgLy8g54mI5pysXG4gIHZlcnNpb246IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXotaGVhZGVyLWFwcGxpY2F0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tICAgICAgdGVtcGxhdGUgc3RhcnQtLT5cbiAgICA8bmctdGVtcGxhdGUgI3NlYXJjaD5cbiAgICAgIDxkaXYgbnotcm93IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdC1zZWFyY2hcIj5cbiAgICAgICAgPG56LWlucHV0LWdyb3VwIFtuelByZWZpeF09XCJwcmVmaXhUZW1wbGF0ZVwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgbnotaW5wdXRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgJ2FwcGxpY2F0aW9uLnNlYXJjaCcgfCBpMThuIH19XCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWFyY2goKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3ByZWZpeFRlbXBsYXRlPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZWFyY2hcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L256LWlucHV0LWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2xkPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3RcIj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZCBvZiBsaXN0RGF0YVwiPlxuICAgICAgICAgICAgPGg1Pnt7IGQubmFtZSB9fTwvaDU+XG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgKm5nRm9yPVwibGV0IGNkIG9mIGQuY2hpbGRyZW5cIiAoY2xpY2spPVwib3BlbihjZClcIj57eyBjZC5uYW1lIH19PC9hPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwhLS0gICAgICB0ZW1wbGF0ZSBlbmQtLT5cblxuICAgIDwhLS0gICAgICBidXR0b24gc3RhcnQtLT5cbiAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCIgKGNsaWNrKT1cImRpZmZDaGFuZ2UoKVwiPiB7eyAnYXBwbGljYXRpb24uYnV0dG9uJyB8IGkxOG4gfX08L2Rpdj5cbiAgICA8IS0tICAgICAgYnV0dG9uIGVuZC0tPlxuXG4gICAgPCEtLSAgICAgIGhlYWRlciBzdGFydC0tPlxuICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvblwiIG56LXJvdyAqbmdJZj1cImFjdGl2ZVwiPlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIzXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10b3BpY1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiIChjbGljayk9XCJmdWxsKClcIj57eyAnYXBwbGljYXRpb24uYWxsJyB8IGkxOG4gfX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAoY2xpY2spPVwib3duKClcIj57eyAnYXBwbGljYXRpb24ubWluZScgfCBpMThuIH19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10ZXh0XCIgKm5nRm9yPVwibGV0IGQgb2YgdG9waWNEYXRhXCIgKGNsaWNrKT1cImV2ZXJ5KGQpXCI+XG4gICAgICAgICAge3sgZC5uYW1lIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IG56LWNvbCBbbnpTcGFuXT1cIjIxXCIgW25nU3dpdGNoXT1cInRvcGljXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiVC5GVUxMXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNlYXJjaFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIlQuT1dOXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNlYXJjaFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxkXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIlQuRVZFUllcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3RcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZCBvZiBsaXN0RGF0YVwiIChjbGljayk9XCJvcGVuKGQpXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiPlxuICAgICAgICAgICAgICAgICAgPGg0Pnt7IGQubmFtZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICA8cD57eyBkLmludHJvIH19PC9wPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSAgICAgIGhlYWRlciBlbmQtLT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXpIZWFkZXJBcHBsaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgVCA9IFRPUElDO1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdG9waWNEYXRhOiBIZWFkZXJUb3BpY1tdID0gW107XG4gIGxpc3REYXRhOiBIZWFkZXJUb3BpY1tdID0gW107XG4gIHRvcGljOiBUT1BJQyA9IFRPUElDLkZVTEw7XG4gIGNob29zZWQ6IEhlYWRlclRvcGljIHwgdW5kZWZpbmVkO1xuICBzZWFyY2hWYWx1ZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpMThuOiBZekkxOE5TZXJ2aWNlLFxuICAgIHByaXZhdGUgaHR0cDogX0h0dHBDbGllbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudG9waWNEYXRhID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy5saXN0RGF0YSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzLmZvckVhY2goZiA9PiBmLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgZGlmZkNoYW5nZShmbGFnPzogYm9vbGVhbikge1xuICAgIGlmIChmbGFnKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZsYWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIGluaXRUb3BpYyh0b3BpYzogVE9QSUMpIHtcbiAgICB0aGlzLnNlYXJjaFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLmxpc3REYXRhID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy50b3BpYyA9IHRvcGljO1xuICB9XG5cbiAgZnVsbCgpIHtcbiAgICB0aGlzLmluaXRUb3BpYyhUT1BJQy5GVUxMKTtcbiAgfVxuXG4gIG93bigpIHtcbiAgICB0aGlzLmluaXRUb3BpYyhUT1BJQy5PV04pO1xuICAgIGNvbnN0IHRlbXA6IEhlYWRlclRvcGljW10gPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICB0aGlzLmxpc3REYXRhID0gdGVtcFxuICAgICAgLmZpbHRlcigodG9waWM6IEhlYWRlclRvcGljKSA9PiB7XG4gICAgICAgIHRvcGljLmNoaWxkcmVuID0gdG9waWMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogSGVhZGVyVG9waWMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQuYXV0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKCh0b3BpYzogSGVhZGVyVG9waWMpID0+IHtcbiAgICAgICAgcmV0dXJuIHRvcGljLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgICB9KTtcbiAgfVxuXG4gIGV2ZXJ5KGU6IEhlYWRlclRvcGljKSB7XG4gICAgdGhpcy5pbml0VG9waWMoVE9QSUMuRVZFUlkpO1xuICAgIHRoaXMuY2hvb3NlZCA9IGU7XG4gICAgY29uc3QgdGVtcDogSGVhZGVyVG9waWNbXSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIHRoaXMubGlzdERhdGEgPSBbLi4udGVtcC5maWx0ZXIodCA9PiB0LmtleSA9PT0gZS5rZXkpWzBdLmNoaWxkcmVuXTtcbiAgfVxuXG4gIG9uU2VhcmNoKCkge1xuICAgIGNvbnN0IHRlbXA6IEhlYWRlclRvcGljW10gPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICAvLyDlpoLmnpzmkJzntKLovpPlhaXnmoTmnInlgLxcbiAgICBpZiAodGhpcy5zZWFyY2hWYWx1ZSkge1xuICAgICAgLy8g6L+H5ruk6I+c5Y2V6L+H5ruk5Ye65pCc57Si55qE5YC8XG4gICAgICB0aGlzLmxpc3REYXRhID0gdGVtcFxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogSGVhZGVyVG9waWMpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pMThuLmZhbnlpKHRvcGljLm5hbWUpLmluY2x1ZGVzKHRoaXMuc2VhcmNoVmFsdWUhKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvcGljO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BpYy5jaGlsZHJlbiA9IHRvcGljLmNoaWxkcmVuLmZpbHRlcigoY2hpbGQ6IEhlYWRlclRvcGljKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmkxOG4uZmFueWkoY2hpbGQubmFtZSkuaW5jbHVkZXModGhpcy5zZWFyY2hWYWx1ZSEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKCh0b3BpYzogSGVhZGVyVG9waWMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWmguaenOayoeacieWAvCzlj5bmtojmkJzntKJcbiAgICAgIHRoaXMubGlzdERhdGEgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICB9XG4gIH1cblxuICBvcGVuKHRvcGljOiBIZWFkZXJUb3BpYykge1xuICAgIGlmICh0b3BpYy5rZXkpIHtcbiAgICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAucG9zdChgL2FwcC1tYW5hZ2VyL3dlYi1zY2FuL3NhdmVgLCB7XG4gICAgICAgICAgICBhcHBJZDogdG9waWMua2V5LFxuICAgICAgICAgICAgY3JlYXRlRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN1YnNjcmliZSgpXG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvcGljLnRhcmdldCkge1xuICAgICAgY2FzZSAnaHJlZic6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmxhbmsnOlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RhcmdldCc6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iXX0=