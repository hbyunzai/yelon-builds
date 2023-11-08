import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { log } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/message";
import * as i2 from "ng-zorro-antd/i18n";
import * as i3 from "@yelon/theme";
import * as i4 from "@yelon/abc/notice-icon";
import * as i5 from "../yunzai-i18n.service";
export class YunzaiNotifyComponent {
    constructor(injector, msg, y18n, nzI18n, cdr, httpClient) {
        this.injector = injector;
        this.msg = msg;
        this.y18n = y18n;
        this.nzI18n = nzI18n;
        this.cdr = cdr;
        this.httpClient = httpClient;
        this.data = [
            {
                key: 'msg',
                title: this.y18n.fanyi('notify.message'),
                list: [],
                emptyText: this.y18n.fanyi('notify.message.empty'),
                emptyImage: './assets/tmp/img/message.svg',
                clearText: this.y18n.fanyi('notify.message.clear')
            },
            {
                key: 'todo',
                title: this.y18n.fanyi('notify.todo'),
                list: [],
                emptyText: this.y18n.fanyi('notify.todo.empty'),
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: this.y18n.fanyi('notify.todo.clear')
            },
            {
                key: 'notice',
                title: this.y18n.fanyi('notify.notice'),
                list: [],
                emptyText: this.y18n.fanyi('notify.notice.empty'),
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: this.y18n.fanyi('notify.notice.clear')
            }
        ];
        this.loading = false;
        this.count = 0;
        this.subs = [];
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.count = 0;
        this.loading = true;
        this.subs.push(forkJoin(this.loadTodo(), this.loadMessage()).subscribe(() => {
            this.loading = false;
            this.cdr.detectChanges();
        }));
    }
    loadMessage() {
        log('notify.component: ', 'fetch message list');
        const formatMessageStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.y18n.fanyi('notify.unread'), color: 'red' };
                case '1':
                    return { extra: this.y18n.fanyi('notify.readed'), color: 'green' };
                default:
                    return { extra: this.y18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.httpClient
            .post(`/message-center-3/my-msg-and-todo/msg-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map((response) => {
            const viewMessage = this.data.filter(d => d.key === 'msg')[0];
            viewMessage.list = response.data.list.map((m) => {
                return {
                    ...m,
                    avatar: m?.imgUrl || './assets/tmp/img/message.png',
                    title: m.systemName,
                    description: m.content,
                    extra: formatMessageStatus(m.status).extra,
                    color: formatMessageStatus(m.status).color,
                    datetime: formatDistanceToNow(new Date(m.date), { locale: this.nzI18n.getDateLocale() })
                };
            });
            this.count += viewMessage.list.length;
        }));
    }
    loadTodo() {
        log('notify.component: ', 'fetch todo list');
        const formatTodoStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.y18n.fanyi('notify.unstart'), color: 'red' };
                case '1':
                    return { extra: this.y18n.fanyi('notify.started'), color: 'green' };
                default:
                    return { extra: this.y18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.httpClient
            .post(`/message-center-3/my-msg-and-todo/todo-list`, {
            pageNum: 1,
            pageSize: 10,
            status: '0'
        })
            .pipe(map((response) => {
            const viewTodo = this.data.filter(d => d.key === 'todo')[0];
            viewTodo.list = response.data.list.map((t) => {
                return {
                    ...t,
                    avatar: t?.imgUrl || './assets/tmp/img/todo.png',
                    title: t.systemName,
                    description: t.content,
                    datetime: formatDistanceToNow(new Date(t.date), { locale: this.nzI18n.getDateLocale() }),
                    extra: formatTodoStatus(t.status).extra,
                    color: formatTodoStatus(t.status).color
                };
            });
            this.count += viewTodo.list.length;
        }));
    }
    clear(type) {
        const t = this.data.filter(d => d.title === type)[0];
        if (t.key == 'msg' || t.key == 'notice') {
            this.subs.push(this.httpClient.post(`/message-center-3/my-msg-and-todo/msg-clear`, {}).subscribe(_ => {
                this.msg.success(`${this.y18n.fanyi('notify.clear')} ${type}`);
                this.loadData();
            }));
        }
        if (t.key == 'todo') {
            this.loadData();
        }
    }
    select(res) {
        this.injector.get(WINDOW).open(res.item.url);
        this.loadData();
    }
    ngOnDestroy() {
        this.subs.forEach(a => a.unsubscribe());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiNotifyComponent, deps: [{ token: i0.Injector }, { token: i1.NzMessageService }, { token: YUNZAI_I18N_TOKEN }, { token: i2.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i3._HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: YunzaiNotifyComponent, selector: "yunzai-notify", ngImport: i0, template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `, isInline: true, dependencies: [{ kind: "component", type: i4.NoticeIconComponent, selector: "notice-icon", inputs: ["data", "count", "loading", "popoverVisible", "btnClass", "btnIconClass", "centered"], outputs: ["select", "clear", "popoverVisibleChange"], exportAs: ["noticeIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiNotifyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yunzai-notify',
                    template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NzMessageService }, { type: i5.YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i2.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i3._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLW5vdGlmeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXVuemFpLW5vdGlmeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUlQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQTRCLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sY0FBYyxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0FBc0J4QyxNQUFNLE9BQU8scUJBQXFCO0lBK0JoQyxZQUNVLFFBQWtCLEVBQ2xCLEdBQXFCLEVBQ00sSUFBdUIsRUFDbEQsTUFBcUIsRUFDckIsR0FBc0IsRUFDdEIsVUFBdUI7UUFMdkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNNLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQXBDakMsU0FBSSxHQUFpQjtZQUNuQjtnQkFDRSxHQUFHLEVBQUUsS0FBSztnQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hDLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFB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QUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQzsrR0F2SlUscUJBQXFCLDBFQWtDdEIsaUJBQWlCO21HQWxDaEIscUJBQXFCLHFEQWJ0Qjs7Ozs7Ozs7OztHQVVUOzs0RkFHVSxxQkFBcUI7a0JBZmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBbUNJLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgbWFwIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGZvcm1hdERpc3RhbmNlVG9Ob3cgfSBmcm9tICdkYXRlLWZucyc7XG5cbmltcG9ydCB7IE5vdGljZUljb25TZWxlY3QsIE5vdGljZUl0ZW0gfSBmcm9tICdAeWVsb24vYWJjL25vdGljZS1pY29uJztcbmltcG9ydCB7IFlVTlpBSV9JMThOX1RPS0VOLCBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOek1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcblxuaW1wb3J0IHsgWXVuemFpSTE4TlNlcnZpY2UgfSBmcm9tICcuLi95dW56YWktaTE4bi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAneXVuemFpLW5vdGlmeScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdGljZS1pY29uXG4gICAgICBbZGF0YV09XCJkYXRhXCJcbiAgICAgIFtjb3VudF09XCJjb3VudFwiXG4gICAgICBbbG9hZGluZ109XCJsb2FkaW5nXCJcbiAgICAgIGJ0bkNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCJcbiAgICAgIGJ0bkljb25DbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbS1pY29uXCJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0KCRldmVudClcIlxuICAgICAgKGNsZWFyKT1cImNsZWFyKCRldmVudClcIlxuICAgID48L25vdGljZS1pY29uPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlOb3RpZnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGRhdGE6IE5vdGljZUl0ZW1bXSA9IFtcbiAgICB7XG4gICAgICBrZXk6ICdtc2cnLFxuICAgICAgdGl0bGU6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm1lc3NhZ2UnKSxcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgZW1wdHlUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5tZXNzYWdlLmVtcHR5JyksXG4gICAgICBlbXB0eUltYWdlOiAnLi9hc3NldHMvdG1wL2ltZy9tZXNzYWdlLnN2ZycsXG4gICAgICBjbGVhclRleHQ6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm1lc3NhZ2UuY2xlYXInKVxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndG9kbycsXG4gICAgICB0aXRsZTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkudG9kbycpLFxuICAgICAgbGlzdDogW10sXG4gICAgICBlbXB0eVRleHQ6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnRvZG8uZW1wdHknKSxcbiAgICAgIGVtcHR5SW1hZ2U6ICcuL2Fzc2V0cy90bXAvaW1nL3RvZG8uc3ZnJyxcbiAgICAgIGNsZWFyVGV4dDogdGhpcy55MThuLmZhbnlpKCdub3RpZnkudG9kby5jbGVhcicpXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdub3RpY2UnLFxuICAgICAgdGl0bGU6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm5vdGljZScpLFxuICAgICAgbGlzdDogW10sXG4gICAgICBlbXB0eVRleHQ6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm5vdGljZS5lbXB0eScpLFxuICAgICAgZW1wdHlJbWFnZTogJy4vYXNzZXRzL3RtcC9pbWcvbm90aWNlLnN2ZycsXG4gICAgICBjbGVhclRleHQ6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm5vdGljZS5jbGVhcicpXG4gICAgfVxuICBdO1xuICBsb2FkaW5nID0gZmFsc2U7XG4gIGNvdW50ID0gMDtcbiAgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG1zZzogTnpNZXNzYWdlU2VydmljZSxcbiAgICBASW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOKSBwcml2YXRlIHkxOG46IFl1bnphaUkxOE5TZXJ2aWNlLFxuICAgIHByaXZhdGUgbnpJMThuOiBOekkxOG5TZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IF9IdHRwQ2xpZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH1cblxuICBsb2FkRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgZm9ya0pvaW4odGhpcy5sb2FkVG9kbygpLCB0aGlzLmxvYWRNZXNzYWdlKCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBsb2FkTWVzc2FnZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBsb2coJ25vdGlmeS5jb21wb25lbnQ6ICcsICdmZXRjaCBtZXNzYWdlIGxpc3QnKTtcbiAgICBjb25zdCBmb3JtYXRNZXNzYWdlU3RhdHVzID0gKHN0YXR1czogc3RyaW5nKTogTnpTYWZlQW55ID0+IHtcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgIHJldHVybiB7IGV4dHJhOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS51bnJlYWQnKSwgY29sb3I6ICdyZWQnIH07XG4gICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgIHJldHVybiB7IGV4dHJhOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5yZWFkZWQnKSwgY29sb3I6ICdncmVlbicgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkubm9zdGF0dXMnKSwgY29sb3I6ICdwcmltYXJ5JyB9O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLnBvc3QoYC9tZXNzYWdlLWNlbnRlci0zL215LW1zZy1hbmQtdG9kby9tc2ctbGlzdGAsIHtcbiAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICBzdGF0dXM6ICcwJ1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICBjb25zdCB2aWV3TWVzc2FnZSA9IHRoaXMuZGF0YS5maWx0ZXIoZCA9PiBkLmtleSA9PT0gJ21zZycpWzBdO1xuICAgICAgICAgIHZpZXdNZXNzYWdlLmxpc3QgPSByZXNwb25zZS5kYXRhLmxpc3QubWFwKChtOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLm0sXG4gICAgICAgICAgICAgIGF2YXRhcjogbT8uaW1nVXJsIHx8ICcuL2Fzc2V0cy90bXAvaW1nL21lc3NhZ2UucG5nJyxcbiAgICAgICAgICAgICAgdGl0bGU6IG0uc3lzdGVtTmFtZSxcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IG0uY29udGVudCxcbiAgICAgICAgICAgICAgZXh0cmE6IGZvcm1hdE1lc3NhZ2VTdGF0dXMobS5zdGF0dXMpLmV4dHJhLFxuICAgICAgICAgICAgICBjb2xvcjogZm9ybWF0TWVzc2FnZVN0YXR1cyhtLnN0YXR1cykuY29sb3IsXG4gICAgICAgICAgICAgIGRhdGV0aW1lOiBmb3JtYXREaXN0YW5jZVRvTm93KG5ldyBEYXRlKG0uZGF0ZSksIHsgbG9jYWxlOiB0aGlzLm56STE4bi5nZXREYXRlTG9jYWxlKCkgfSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jb3VudCArPSB2aWV3TWVzc2FnZS5saXN0Lmxlbmd0aDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBsb2FkVG9kbygpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBsb2coJ25vdGlmeS5jb21wb25lbnQ6ICcsICdmZXRjaCB0b2RvIGxpc3QnKTtcbiAgICBjb25zdCBmb3JtYXRUb2RvU3RhdHVzID0gKHN0YXR1czogc3RyaW5nKTogTnpTYWZlQW55ID0+IHtcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgIHJldHVybiB7IGV4dHJhOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS51bnN0YXJ0JyksIGNvbG9yOiAncmVkJyB9O1xuICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkuc3RhcnRlZCcpLCBjb2xvcjogJ2dyZWVuJyB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB7IGV4dHJhOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3N0YXR1cycpLCBjb2xvcjogJ3ByaW1hcnknIH07XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAucG9zdChgL21lc3NhZ2UtY2VudGVyLTMvbXktbXNnLWFuZC10b2RvL3RvZG8tbGlzdGAsIHtcbiAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICBzdGF0dXM6ICcwJ1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICBjb25zdCB2aWV3VG9kbyA9IHRoaXMuZGF0YS5maWx0ZXIoZCA9PiBkLmtleSA9PT0gJ3RvZG8nKVswXTtcbiAgICAgICAgICB2aWV3VG9kby5saXN0ID0gcmVzcG9uc2UuZGF0YS5saXN0Lm1hcCgodDogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi50LFxuICAgICAgICAgICAgICBhdmF0YXI6IHQ/LmltZ1VybCB8fCAnLi9hc3NldHMvdG1wL2ltZy90b2RvLnBuZycsXG4gICAgICAgICAgICAgIHRpdGxlOiB0LnN5c3RlbU5hbWUsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0LmNvbnRlbnQsXG4gICAgICAgICAgICAgIGRhdGV0aW1lOiBmb3JtYXREaXN0YW5jZVRvTm93KG5ldyBEYXRlKHQuZGF0ZSksIHsgbG9jYWxlOiB0aGlzLm56STE4bi5nZXREYXRlTG9jYWxlKCkgfSksXG4gICAgICAgICAgICAgIGV4dHJhOiBmb3JtYXRUb2RvU3RhdHVzKHQuc3RhdHVzKS5leHRyYSxcbiAgICAgICAgICAgICAgY29sb3I6IGZvcm1hdFRvZG9TdGF0dXModC5zdGF0dXMpLmNvbG9yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY291bnQgKz0gdmlld1RvZG8ubGlzdC5sZW5ndGg7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgY2xlYXIodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdCA9IHRoaXMuZGF0YS5maWx0ZXIoZCA9PiBkLnRpdGxlID09PSB0eXBlKVswXTtcbiAgICBpZiAodC5rZXkgPT0gJ21zZycgfHwgdC5rZXkgPT0gJ25vdGljZScpIHtcbiAgICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgICB0aGlzLmh0dHBDbGllbnQucG9zdChgL21lc3NhZ2UtY2VudGVyLTMvbXktbXNnLWFuZC10b2RvL21zZy1jbGVhcmAsIHt9KS5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgICAgdGhpcy5tc2cuc3VjY2VzcyhgJHt0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5jbGVhcicpfSAke3R5cGV9YCk7XG4gICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHQua2V5ID09ICd0b2RvJykge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdChyZXM6IE5vdGljZUljb25TZWxlY3QpOiB2b2lkIHtcbiAgICB0aGlzLmluamVjdG9yLmdldChXSU5ET1cpLm9wZW4ocmVzLml0ZW0udXJsKTtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChhID0+IGEudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==