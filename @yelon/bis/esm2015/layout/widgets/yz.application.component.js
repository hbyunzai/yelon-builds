import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { CacheService } from '@yelon/cache';
import { _HttpClient } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { YzI18NService } from '../yz.i18n.service';
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
YzHeaderApplicationComponent.decorators = [
    { type: Component, args: [{
                selector: 'yz-header-application',
                template: `
    <!--      template start-->
    <ng-template #search>
      <div nz-row class="yz-application-list-search">
        <nz-input-group [nzPrefix]="prefixTemplate">
          <input
            type="text"
            nz-input
            [placeholder]="'请输入要搜索的应用名称!'"
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
    <div class="yunzai-default__nav-item" (click)="diffChange()"> 应用与服务</div>
    <!--      button end-->

    <!--      header start-->
    <div class="yz-application" nz-row *ngIf="active">
      <div nz-col [nzSpan]="3" class="yz-application-topic">
        <div class="yz-application-text" (click)="full()">全部应用</div>
        <div class="yz-application-text" (click)="own()">我的应用</div>
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
            },] }
];
YzHeaderApplicationComponent.ctorParameters = () => [
    { type: Injector },
    { type: CacheService },
    { type: YzI18NService },
    { type: _HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYXBwbGljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l6LmFwcGxpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE1BQU0sQ0FBTixJQUFZLEtBSVg7QUFKRCxXQUFZLEtBQUs7SUFDZixpQ0FBSSxDQUFBO0lBQ0osK0JBQUcsQ0FBQTtJQUNILG1DQUFLLENBQUE7QUFDUCxDQUFDLEVBSlcsS0FBSyxLQUFMLEtBQUssUUFJaEI7QUErRkQsTUFBTSxPQUFPLDRCQUE0QjtJQVV2QyxZQUNVLE1BQWdCLEVBQ2hCLFlBQTBCLEVBQzFCLElBQW1CLEVBQ25CLElBQWlCO1FBSGpCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBYjNCLE1BQUMsR0FBRyxLQUFLLENBQUM7UUFDVixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLFVBQUssR0FBVSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRTFCLGdCQUFXLEdBQWtCLElBQUksQ0FBQztRQUNsQyxTQUFJLEdBQW1CLEVB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Q0FBQztpQkFDRCxTQUFTLEVBQUUsQ0FDZixDQUFDO1NBQ0g7UUFDRCxRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDcEIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xELE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7WUE1TEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1FVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBM0c0QyxRQUFRO1lBRzVDLFlBQVk7WUFJWixhQUFhO1lBSGIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9jYWNoZSc7XG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IFl6STE4TlNlcnZpY2UgfSBmcm9tICcuLi95ei5pMThuLnNlcnZpY2UnO1xuXG5leHBvcnQgZW51bSBUT1BJQyB7XG4gIEZVTEwsXG4gIE9XTixcbiAgRVZFUllcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJUb3BpYyB7XG4gIC8vIOW/mOS6hlxuICBhdHRyaWJ1dGU6IGFueTtcbiAgLy8g5a2Q6I+c5Y2VXG4gIGNoaWxkcmVuOiBIZWFkZXJUb3BpY1tdO1xuICAvLyDmj4/ov7BcbiAgaW50cm86IHN0cmluZztcbiAgLy8ga2V5XG4gIGtleTogc3RyaW5nO1xuICAvLyDlkI3np7BcbiAgbmFtZTogc3RyaW5nO1xuICAvLyDmiZPlvIDmlrnlvI9cbiAgdGFyZ2V0OiBzdHJpbmc7XG4gIC8vIOaYr+WQpuacieadg+mZkOaJk+W8gFxuICBhdXRoOiBib29sZWFuO1xuICAvLyDot6/lvoRcbiAgdXJsOiBzdHJpbmc7XG4gIC8vIOeJiOacrFxuICB2ZXJzaW9uOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l6LWhlYWRlci1hcHBsaWNhdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSAgICAgIHRlbXBsYXRlIHN0YXJ0LS0+XG4gICAgPG5nLXRlbXBsYXRlICNzZWFyY2g+XG4gICAgICA8ZGl2IG56LXJvdyBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3Qtc2VhcmNoXCI+XG4gICAgICAgIDxuei1pbnB1dC1ncm91cCBbbnpQcmVmaXhdPVwicHJlZml4VGVtcGxhdGVcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG56LWlucHV0XG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ+ivt+i+k+WFpeimgeaQnOe0oueahOW6lOeUqOWQjeensCEnXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIlxuICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWFyY2goKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3ByZWZpeFRlbXBsYXRlPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZWFyY2hcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L256LWlucHV0LWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2xkPlxuICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3RcIj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZCBvZiBsaXN0RGF0YVwiPlxuICAgICAgICAgICAgPGg1Pnt7IGQubmFtZSB9fTwvaDU+XG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgKm5nRm9yPVwibGV0IGNkIG9mIGQuY2hpbGRyZW5cIiAoY2xpY2spPVwib3BlbihjZClcIj57eyBjZC5uYW1lIH19PC9hPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwhLS0gICAgICB0ZW1wbGF0ZSBlbmQtLT5cblxuICAgIDwhLS0gICAgICBidXR0b24gc3RhcnQtLT5cbiAgICA8ZGl2IGNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCIgKGNsaWNrKT1cImRpZmZDaGFuZ2UoKVwiPiDlupTnlKjkuI7mnI3liqE8L2Rpdj5cbiAgICA8IS0tICAgICAgYnV0dG9uIGVuZC0tPlxuXG4gICAgPCEtLSAgICAgIGhlYWRlciBzdGFydC0tPlxuICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvblwiIG56LXJvdyAqbmdJZj1cImFjdGl2ZVwiPlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIzXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10b3BpY1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiIChjbGljayk9XCJmdWxsKClcIj7lhajpg6jlupTnlKg8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAoY2xpY2spPVwib3duKClcIj7miJHnmoTlupTnlKg8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAqbmdGb3I9XCJsZXQgZCBvZiB0b3BpY0RhdGFcIiAoY2xpY2spPVwiZXZlcnkoZClcIj5cbiAgICAgICAgICB7eyBkLm5hbWUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgbnotY29sIFtuelNwYW5dPVwiMjFcIiBbbmdTd2l0Y2hdPVwidG9waWNcIiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJULkZVTExcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiVC5PV05cIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2VhcmNoXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiVC5FVkVSWVwiIGNsYXNzPVwieXotYXBwbGljYXRpb24tbGlzdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBkIG9mIGxpc3REYXRhXCIgKGNsaWNrKT1cIm9wZW4oZClcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+e3sgZC5uYW1lIH19PC9oND5cbiAgICAgICAgICAgICAgICAgIDxwPnt7IGQuaW50cm8gfX08L3A+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tICAgICAgaGVhZGVyIGVuZC0tPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZekhlYWRlckFwcGxpY2F0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBUID0gVE9QSUM7XG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICB0b3BpY0RhdGE6IEhlYWRlclRvcGljW10gPSBbXTtcbiAgbGlzdERhdGE6IEhlYWRlclRvcGljW10gPSBbXTtcbiAgdG9waWM6IFRPUElDID0gVE9QSUMuRlVMTDtcbiAgY2hvb3NlZDogSGVhZGVyVG9waWMgfCB1bmRlZmluZWQ7XG4gIHNlYXJjaFZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZSxcbiAgICBwcml2YXRlIGkxOG46IFl6STE4TlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50b3BpY0RhdGEgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICB0aGlzLmxpc3REYXRhID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChmID0+IGYudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBkaWZmQ2hhbmdlKGZsYWc/OiBib29sZWFuKSB7XG4gICAgaWYgKGZsYWcpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmxhZztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgaW5pdFRvcGljKHRvcGljOiBUT1BJQykge1xuICAgIHRoaXMuc2VhcmNoVmFsdWUgPSBudWxsO1xuICAgIHRoaXMubGlzdERhdGEgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICB0aGlzLnRvcGljID0gdG9waWM7XG4gIH1cblxuICBmdWxsKCkge1xuICAgIHRoaXMuaW5pdFRvcGljKFRPUElDLkZVTEwpO1xuICB9XG5cbiAgb3duKCkge1xuICAgIHRoaXMuaW5pdFRvcGljKFRPUElDLk9XTik7XG4gICAgY29uc3QgdGVtcDogSGVhZGVyVG9waWNbXSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIHRoaXMubGlzdERhdGEgPSB0ZW1wXG4gICAgICAuZmlsdGVyKCh0b3BpYzogSGVhZGVyVG9waWMpID0+IHtcbiAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBIZWFkZXJUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5hdXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvcGljO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHRvcGljOiBIZWFkZXJUb3BpYykgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgIH0pO1xuICB9XG5cbiAgZXZlcnkoZTogSGVhZGVyVG9waWMpIHtcbiAgICB0aGlzLmluaXRUb3BpYyhUT1BJQy5FVkVSWSk7XG4gICAgdGhpcy5jaG9vc2VkID0gZTtcbiAgICBjb25zdCB0ZW1wOiBIZWFkZXJUb3BpY1tdID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy5saXN0RGF0YSA9IFsuLi50ZW1wLmZpbHRlcih0ID0+IHQua2V5ID09PSBlLmtleSlbMF0uY2hpbGRyZW5dO1xuICB9XG5cbiAgb25TZWFyY2goKSB7XG4gICAgY29uc3QgdGVtcDogSGVhZGVyVG9waWNbXSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIC8vIOWmguaenOaQnOe0oui+k+WFpeeahOacieWAvFxuICAgIGlmICh0aGlzLnNlYXJjaFZhbHVlKSB7XG4gICAgICAvLyDov4fmu6Toj5zljZXov4fmu6Tlh7rmkJzntKLnmoTlgLxcbiAgICAgIHRoaXMubGlzdERhdGEgPSB0ZW1wXG4gICAgICAgIC5maWx0ZXIoKHRvcGljOiBIZWFkZXJUb3BpYykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmkxOG4uZmFueWkodG9waWMubmFtZSkuaW5jbHVkZXModGhpcy5zZWFyY2hWYWx1ZSEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGljLmNoaWxkcmVuID0gdG9waWMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZDogSGVhZGVyVG9waWMpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bi5mYW55aShjaGlsZC5uYW1lKS5pbmNsdWRlcyh0aGlzLnNlYXJjaFZhbHVlISk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKHRvcGljOiBIZWFkZXJUb3BpYykgPT4ge1xuICAgICAgICAgIHJldHVybiB0b3BpYy5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5aaC5p6c5rKh5pyJ5YC8LOWPlua2iOaQnOe0olxuICAgICAgdGhpcy5saXN0RGF0YSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4odG9waWM6IEhlYWRlclRvcGljKSB7XG4gICAgaWYgKHRvcGljLmtleSkge1xuICAgICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICAgIHRoaXMuaHR0cFxuICAgICAgICAgIC5wb3N0KGAvYXBwLW1hbmFnZXIvd2ViLXNjYW4vc2F2ZWAsIHtcbiAgICAgICAgICAgIGFwcElkOiB0b3BpYy5rZXksXG4gICAgICAgICAgICBjcmVhdGVEYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc3Vic2NyaWJlKClcbiAgICAgICk7XG4gICAgfVxuICAgIHN3aXRjaCAodG9waWMudGFyZ2V0KSB7XG4gICAgICBjYXNlICdocmVmJzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdibGFuayc6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFyZ2V0JzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiJdfQ==