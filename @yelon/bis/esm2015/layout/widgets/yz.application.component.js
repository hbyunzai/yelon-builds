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
            },] }
];
YzHeaderApplicationComponent.ctorParameters = () => [
    { type: Injector },
    { type: CacheService },
    { type: YzI18NService },
    { type: _HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYXBwbGljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC93aWRnZXRzL3l6LmFwcGxpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE1BQU0sQ0FBTixJQUFZLEtBSVg7QUFKRCxXQUFZLEtBQUs7SUFDZixpQ0FBSSxDQUFBO0lBQ0osK0JBQUcsQ0FBQTtJQUNILG1DQUFLLENBQUE7QUFDUCxDQUFDLEVBSlcsS0FBSyxLQUFMLEtBQUssUUFJaEI7QUErRkQsTUFBTSxPQUFPLDRCQUE0QjtJQVV2QyxZQUNVLE1BQWdCLEVBQ2hCLFlBQTBCLEVBQzFCLElBQW1CLEVBQ25CLElBQWlCO1FBSGpCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBYjNCLE1BQUMsR0FBRyxLQUFLLENBQUM7UUFDVixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLFVBQUssR0FBVSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRTFCLGdCQUFXLEdBQWtCLElBQUksQ0FBQztRQUNsQyxTQUFJLEdBQW1CLEVB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Q0FBQztpQkFDRCxTQUFTLEVBQUUsQ0FDZixDQUFDO1NBQ0g7UUFDRCxRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDcEIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEQsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xELE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7WUE1TEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1FVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBM0c0QyxRQUFRO1lBRzVDLFlBQVk7WUFJWixhQUFhO1lBSGIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9jYWNoZSc7XG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5cbmltcG9ydCB7IFl6STE4TlNlcnZpY2UgfSBmcm9tICcuLi95ei5pMThuLnNlcnZpY2UnO1xuXG5leHBvcnQgZW51bSBUT1BJQyB7XG4gIEZVTEwsXG4gIE9XTixcbiAgRVZFUllcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJUb3BpYyB7XG4gIC8vIOW/mOS6hlxuICBhdHRyaWJ1dGU6IGFueTtcbiAgLy8g5a2Q6I+c5Y2VXG4gIGNoaWxkcmVuOiBIZWFkZXJUb3BpY1tdO1xuICAvLyDmj4/ov7BcbiAgaW50cm86IHN0cmluZztcbiAgLy8ga2V5XG4gIGtleTogc3RyaW5nO1xuICAvLyDlkI3np7BcbiAgbmFtZTogc3RyaW5nO1xuICAvLyDmiZPlvIDmlrnlvI9cbiAgdGFyZ2V0OiBzdHJpbmc7XG4gIC8vIOaYr+WQpuacieadg+mZkOaJk+W8gFxuICBhdXRoOiBib29sZWFuO1xuICAvLyDot6/lvoRcbiAgdXJsOiBzdHJpbmc7XG4gIC8vIOeJiOacrFxuICB2ZXJzaW9uOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l6LWhlYWRlci1hcHBsaWNhdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSAgICAgIHRlbXBsYXRlIHN0YXJ0LS0+XG4gICAgPG5nLXRlbXBsYXRlICNzZWFyY2g+XG4gICAgICA8ZGl2IG56LXJvdyBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3Qtc2VhcmNoXCI+XG4gICAgICAgIDxuei1pbnB1dC1ncm91cCBbbnpQcmVmaXhdPVwicHJlZml4VGVtcGxhdGVcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG56LWlucHV0XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7ICdhcHBsaWNhdGlvbi5zZWFyY2gnIHwgaTE4biB9fVwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uU2VhcmNoKClcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNwcmVmaXhUZW1wbGF0ZT5cbiAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2VhcmNoXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uei1pbnB1dC1ncm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNsZD5cbiAgICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0XCI+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGQgb2YgbGlzdERhdGFcIj5cbiAgICAgICAgICAgIDxoNT57eyBkLm5hbWUgfX08L2g1PlxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiICpuZ0Zvcj1cImxldCBjZCBvZiBkLmNoaWxkcmVuXCIgKGNsaWNrKT1cIm9wZW4oY2QpXCI+e3sgY2QubmFtZSB9fTwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tICAgICAgdGVtcGxhdGUgZW5kLS0+XG5cbiAgICA8IS0tICAgICAgYnV0dG9uIHN0YXJ0LS0+XG4gICAgPGRpdiBjbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbVwiIChjbGljayk9XCJkaWZmQ2hhbmdlKClcIj4ge3sgJ2FwcGxpY2F0aW9uLmJ1dHRvbicgfCBpMThuIH19PC9kaXY+XG4gICAgPCEtLSAgICAgIGJ1dHRvbiBlbmQtLT5cblxuICAgIDwhLS0gICAgICBoZWFkZXIgc3RhcnQtLT5cbiAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb25cIiBuei1yb3cgKm5nSWY9XCJhY3RpdmVcIj5cbiAgICAgIDxkaXYgbnotY29sIFtuelNwYW5dPVwiM1wiIGNsYXNzPVwieXotYXBwbGljYXRpb24tdG9waWNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLXRleHRcIiAoY2xpY2spPVwiZnVsbCgpXCI+e3sgJ2FwcGxpY2F0aW9uLmFsbCcgfCBpMThuIH19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi10ZXh0XCIgKGNsaWNrKT1cIm93bigpXCI+e3sgJ2FwcGxpY2F0aW9uLm1pbmUnIHwgaTE4biB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwieXotYXBwbGljYXRpb24tdGV4dFwiICpuZ0Zvcj1cImxldCBkIG9mIHRvcGljRGF0YVwiIChjbGljayk9XCJldmVyeShkKVwiPlxuICAgICAgICAgIHt7IGQubmFtZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBuei1jb2wgW256U3Bhbl09XCIyMVwiIFtuZ1N3aXRjaF09XCJ0b3BpY1wiIGNsYXNzPVwieXotYXBwbGljYXRpb24tY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIlQuRlVMTFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzZWFyY2hcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJsZFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJULk9XTlwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzZWFyY2hcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJsZFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJULkVWRVJZXCIgY2xhc3M9XCJ5ei1hcHBsaWNhdGlvbi1saXN0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInl6LWFwcGxpY2F0aW9uLWxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGQgb2YgbGlzdERhdGFcIiAoY2xpY2spPVwib3BlbihkKVwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj5cbiAgICAgICAgICAgICAgICAgIDxoND57eyBkLm5hbWUgfX08L2g0PlxuICAgICAgICAgICAgICAgICAgPHA+e3sgZC5pbnRybyB9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gICAgICBoZWFkZXIgZW5kLS0+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFl6SGVhZGVyQXBwbGljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIFQgPSBUT1BJQztcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHRvcGljRGF0YTogSGVhZGVyVG9waWNbXSA9IFtdO1xuICBsaXN0RGF0YTogSGVhZGVyVG9waWNbXSA9IFtdO1xuICB0b3BpYzogVE9QSUMgPSBUT1BJQy5GVUxMO1xuICBjaG9vc2VkOiBIZWFkZXJUb3BpYyB8IHVuZGVmaW5lZDtcbiAgc2VhcmNoVmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBzdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaW5qZWN0OiBJbmplY3RvcixcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaTE4bjogWXpJMThOU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHA6IF9IdHRwQ2xpZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRvcGljRGF0YSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIHRoaXMubGlzdERhdGEgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vicy5mb3JFYWNoKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIGRpZmZDaGFuZ2UoZmxhZz86IGJvb2xlYW4pIHtcbiAgICBpZiAoZmxhZykge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmbGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICB9XG4gIH1cblxuICBpbml0VG9waWModG9waWM6IFRPUElDKSB7XG4gICAgdGhpcy5zZWFyY2hWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5saXN0RGF0YSA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X2hlYWRlcicsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIHRoaXMudG9waWMgPSB0b3BpYztcbiAgfVxuXG4gIGZ1bGwoKSB7XG4gICAgdGhpcy5pbml0VG9waWMoVE9QSUMuRlVMTCk7XG4gIH1cblxuICBvd24oKSB7XG4gICAgdGhpcy5pbml0VG9waWMoVE9QSUMuT1dOKTtcbiAgICBjb25zdCB0ZW1wOiBIZWFkZXJUb3BpY1tdID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgdGhpcy5saXN0RGF0YSA9IHRlbXBcbiAgICAgIC5maWx0ZXIoKHRvcGljOiBIZWFkZXJUb3BpYykgPT4ge1xuICAgICAgICB0b3BpYy5jaGlsZHJlbiA9IHRvcGljLmNoaWxkcmVuLmZpbHRlcigoY2hpbGQ6IEhlYWRlclRvcGljKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkLmF1dGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdG9waWM7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigodG9waWM6IEhlYWRlclRvcGljKSA9PiB7XG4gICAgICAgIHJldHVybiB0b3BpYy5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgICAgfSk7XG4gIH1cblxuICBldmVyeShlOiBIZWFkZXJUb3BpYykge1xuICAgIHRoaXMuaW5pdFRvcGljKFRPUElDLkVWRVJZKTtcbiAgICB0aGlzLmNob29zZWQgPSBlO1xuICAgIGNvbnN0IHRlbXA6IEhlYWRlclRvcGljW10gPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICB0aGlzLmxpc3REYXRhID0gWy4uLnRlbXAuZmlsdGVyKHQgPT4gdC5rZXkgPT09IGUua2V5KVswXS5jaGlsZHJlbl07XG4gIH1cblxuICBvblNlYXJjaCgpIHtcbiAgICBjb25zdCB0ZW1wOiBIZWFkZXJUb3BpY1tdID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgLy8g5aaC5p6c5pCc57Si6L6T5YWl55qE5pyJ5YC8XG4gICAgaWYgKHRoaXMuc2VhcmNoVmFsdWUpIHtcbiAgICAgIC8vIOi/h+a7pOiPnOWNlei/h+a7pOWHuuaQnOe0oueahOWAvFxuICAgICAgdGhpcy5saXN0RGF0YSA9IHRlbXBcbiAgICAgICAgLmZpbHRlcigodG9waWM6IEhlYWRlclRvcGljKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaTE4bi5mYW55aSh0b3BpYy5uYW1lKS5pbmNsdWRlcyh0aGlzLnNlYXJjaFZhbHVlISkpIHtcbiAgICAgICAgICAgIHJldHVybiB0b3BpYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9waWMuY2hpbGRyZW4gPSB0b3BpYy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBIZWFkZXJUb3BpYykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuLmZhbnlpKGNoaWxkLm5hbWUpLmluY2x1ZGVzKHRoaXMuc2VhcmNoVmFsdWUhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRvcGljO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigodG9waWM6IEhlYWRlclRvcGljKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRvcGljLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlpoLmnpzmsqHmnInlgLws5Y+W5raI5pCc57SiXG4gICAgICB0aGlzLmxpc3REYXRhID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgfVxuICB9XG5cbiAgb3Blbih0b3BpYzogSGVhZGVyVG9waWMpIHtcbiAgICBpZiAodG9waWMua2V5KSB7XG4gICAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgICAgdGhpcy5odHRwXG4gICAgICAgICAgLnBvc3QoYC9hcHAtbWFuYWdlci93ZWItc2Nhbi9zYXZlYCwge1xuICAgICAgICAgICAgYXBwSWQ6IHRvcGljLmtleSxcbiAgICAgICAgICAgIGNyZWF0ZURhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zdWJzY3JpYmUoKVxuICAgICAgKTtcbiAgICB9XG4gICAgc3dpdGNoICh0b3BpYy50YXJnZXQpIHtcbiAgICAgIGNhc2UgJ2hyZWYnOlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JsYW5rJzpcbiAgICAgICAgdGhpcy5pbmplY3QuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHRvcGljLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YXJnZXQnOlxuICAgICAgICB0aGlzLmluamVjdC5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gdG9waWMudXJsO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuaW5qZWN0LmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSB0b3BpYy51cmw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19