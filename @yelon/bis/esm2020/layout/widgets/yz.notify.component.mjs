import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';
import { YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { log } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/message";
import * as i2 from "ng-zorro-antd/i18n";
import * as i3 from "@yelon/theme";
import * as i4 from "@yelon/abc/notice-icon";
import * as i5 from "../yz.i18n.service";
export class YzHeaderNotifyComponent {
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
                emptyText: this.y18n.fanyi('notify.message.emptyText'),
                emptyImage: './assets/tmp/img/message.svg',
                clearText: this.y18n.fanyi('notify.message.clearText')
            },
            {
                key: 'todo',
                title: this.y18n.fanyi('notify.todo'),
                list: [],
                emptyText: this.y18n.fanyi('notify.todo.emptyText'),
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: this.y18n.fanyi('notify.todo.clearText')
            },
            {
                key: 'notice',
                title: this.y18n.fanyi('notify.notice'),
                list: [],
                emptyText: this.y18n.fanyi('notify.notice.emptyText'),
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: this.y18n.fanyi('notify.notice.clearText')
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
}
YzHeaderNotifyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzHeaderNotifyComponent, deps: [{ token: i0.Injector }, { token: i1.NzMessageService }, { token: YUNZAI_I18N_TOKEN }, { token: i2.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i3._HttpClient }], target: i0.ɵɵFactoryTarget.Component });
YzHeaderNotifyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: YzHeaderNotifyComponent, selector: "yz-header-notify", ngImport: i0, template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `, isInline: true, components: [{ type: i4.NoticeIconComponent, selector: "notice-icon", inputs: ["data", "count", "loading", "popoverVisible", "btnClass", "btnIconClass"], outputs: ["select", "clear", "popoverVisibleChange"], exportAs: ["noticeIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzHeaderNotifyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'yz-header-notify',
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
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NzMessageService }, { type: i5.YzI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i2.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i3._HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXoubm90aWZ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQvd2lkZ2V0cy95ei5ub3RpZnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFJUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUE0QixNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBZSxNQUFNLGNBQWMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7OztBQXNCeEMsTUFBTSxPQUFPLHVCQUF1QjtJQStCbEMsWUFDVSxRQUFrQixFQUNsQixHQUFxQixFQUNNLElBQW1CLEVBQzlDLE1BQXFCLEVBQ3JCLEdBQXNCLEVBQ3RCLFVBQXVCO1FBTHZCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDTSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQzlDLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQXBDakMsU0FBSSxHQUFpQjtZQUNuQjtnQkFDRSxHQUFHLEVBQUUsS0FBSztnQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hDLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMs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QyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7b0hBdkpVLHVCQUF1QiwwRUFrQ3hCLGlCQUFpQjt3R0FsQ2hCLHVCQUF1Qix3REFieEI7Ozs7Ozs7Ozs7R0FVVDsyRkFHVSx1QkFBdUI7a0JBZm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFtQ0ksTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGZvcm1hdERpc3RhbmNlVG9Ob3cgfSBmcm9tICdkYXRlLWZucyc7XG5cbmltcG9ydCB7IE5vdGljZUljb25TZWxlY3QsIE5vdGljZUl0ZW0gfSBmcm9tICdAeWVsb24vYWJjL25vdGljZS1pY29uJztcbmltcG9ydCB7IFlVTlpBSV9JMThOX1RPS0VOLCBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOek1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcblxuaW1wb3J0IHsgWXpJMThOU2VydmljZSB9IGZyb20gJy4uL3l6LmkxOG4uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3l6LWhlYWRlci1ub3RpZnknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3RpY2UtaWNvblxuICAgICAgW2RhdGFdPVwiZGF0YVwiXG4gICAgICBbY291bnRdPVwiY291bnRcIlxuICAgICAgW2xvYWRpbmddPVwibG9hZGluZ1wiXG4gICAgICBidG5DbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbVwiXG4gICAgICBidG5JY29uQ2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW0taWNvblwiXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdCgkZXZlbnQpXCJcbiAgICAgIChjbGVhcik9XCJjbGVhcigkZXZlbnQpXCJcbiAgICA+PC9ub3RpY2UtaWNvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXpIZWFkZXJOb3RpZnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGRhdGE6IE5vdGljZUl0ZW1bXSA9IFtcbiAgICB7XG4gICAgICBrZXk6ICdtc2cnLFxuICAgICAgdGl0bGU6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm1lc3NhZ2UnKSxcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgZW1wdHlUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5tZXNzYWdlLmVtcHR5VGV4dCcpLFxuICAgICAgZW1wdHlJbWFnZTogJy4vYXNzZXRzL3RtcC9pbWcvbWVzc2FnZS5zdmcnLFxuICAgICAgY2xlYXJUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5tZXNzYWdlLmNsZWFyVGV4dCcpXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICd0b2RvJyxcbiAgICAgIHRpdGxlOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS50b2RvJyksXG4gICAgICBsaXN0OiBbXSxcbiAgICAgIGVtcHR5VGV4dDogdGhpcy55MThuLmZhbnlpKCdub3RpZnkudG9kby5lbXB0eVRleHQnKSxcbiAgICAgIGVtcHR5SW1hZ2U6ICcuL2Fzc2V0cy90bXAvaW1nL3RvZG8uc3ZnJyxcbiAgICAgIGNsZWFyVGV4dDogdGhpcy55MThuLmZhbnlpKCdub3RpZnkudG9kby5jbGVhclRleHQnKVxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnbm90aWNlJyxcbiAgICAgIHRpdGxlOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3RpY2UnKSxcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgZW1wdHlUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3RpY2UuZW1wdHlUZXh0JyksXG4gICAgICBlbXB0eUltYWdlOiAnLi9hc3NldHMvdG1wL2ltZy9ub3RpY2Uuc3ZnJyxcbiAgICAgIGNsZWFyVGV4dDogdGhpcy55MThuLmZhbnlpKCdub3RpZnkubm90aWNlLmNsZWFyVGV4dCcpXG4gICAgfVxuICBdO1xuICBsb2FkaW5nID0gZmFsc2U7XG4gIGNvdW50ID0gMDtcbiAgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG1zZzogTnpNZXNzYWdlU2VydmljZSxcbiAgICBASW5qZWN0KFlVTlpBSV9JMThOX1RPS0VOKSBwcml2YXRlIHkxOG46IFl6STE4TlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuekkxOG46IE56STE4blNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogX0h0dHBDbGllbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIGxvYWREYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICBmb3JrSm9pbih0aGlzLmxvYWRUb2RvKCksIHRoaXMubG9hZE1lc3NhZ2UoKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGxvYWRNZXNzYWdlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGxvZygnbm90aWZ5LmNvbXBvbmVudDogJywgJ2ZldGNoIG1lc3NhZ2UgbGlzdCcpO1xuICAgIGNvbnN0IGZvcm1hdE1lc3NhZ2VTdGF0dXMgPSAoc3RhdHVzOiBzdHJpbmcpOiBOelNhZmVBbnkgPT4ge1xuICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnVucmVhZCcpLCBjb2xvcjogJ3JlZCcgfTtcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnJlYWRlZCcpLCBjb2xvcjogJ2dyZWVuJyB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB7IGV4dHJhOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3N0YXR1cycpLCBjb2xvcjogJ3ByaW1hcnknIH07XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAucG9zdChgL21lc3NhZ2UtY2VudGVyLTMvbXktbXNnLWFuZC10b2RvL21zZy1saXN0YCwge1xuICAgICAgICBwYWdlTnVtOiAxLFxuICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgIHN0YXR1czogJzAnXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZpZXdNZXNzYWdlID0gdGhpcy5kYXRhLmZpbHRlcihkID0+IGQua2V5ID09PSAnbXNnJylbMF07XG4gICAgICAgICAgdmlld01lc3NhZ2UubGlzdCA9IHJlc3BvbnNlLmRhdGEubGlzdC5tYXAoKG06IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ubSxcbiAgICAgICAgICAgICAgYXZhdGFyOiBtPy5pbWdVcmwgfHwgJy4vYXNzZXRzL3RtcC9pbWcvbWVzc2FnZS5wbmcnLFxuICAgICAgICAgICAgICB0aXRsZTogbS5zeXN0ZW1OYW1lLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbS5jb250ZW50LFxuICAgICAgICAgICAgICBleHRyYTogZm9ybWF0TWVzc2FnZVN0YXR1cyhtLnN0YXR1cykuZXh0cmEsXG4gICAgICAgICAgICAgIGNvbG9yOiBmb3JtYXRNZXNzYWdlU3RhdHVzKG0uc3RhdHVzKS5jb2xvcixcbiAgICAgICAgICAgICAgZGF0ZXRpbWU6IGZvcm1hdERpc3RhbmNlVG9Ob3cobmV3IERhdGUobS5kYXRlKSwgeyBsb2NhbGU6IHRoaXMubnpJMThuLmdldERhdGVMb2NhbGUoKSB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmNvdW50ICs9IHZpZXdNZXNzYWdlLmxpc3QubGVuZ3RoO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGxvYWRUb2RvKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGxvZygnbm90aWZ5LmNvbXBvbmVudDogJywgJ2ZldGNoIHRvZG8gbGlzdCcpO1xuICAgIGNvbnN0IGZvcm1hdFRvZG9TdGF0dXMgPSAoc3RhdHVzOiBzdHJpbmcpOiBOelNhZmVBbnkgPT4ge1xuICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnVuc3RhcnQnKSwgY29sb3I6ICdyZWQnIH07XG4gICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgIHJldHVybiB7IGV4dHJhOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5zdGFydGVkJyksIGNvbG9yOiAnZ3JlZW4nIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm5vc3RhdHVzJyksIGNvbG9yOiAncHJpbWFyeScgfTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgIC5wb3N0KGAvbWVzc2FnZS1jZW50ZXItMy9teS1tc2ctYW5kLXRvZG8vdG9kby1saXN0YCwge1xuICAgICAgICBwYWdlTnVtOiAxLFxuICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgIHN0YXR1czogJzAnXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZpZXdUb2RvID0gdGhpcy5kYXRhLmZpbHRlcihkID0+IGQua2V5ID09PSAndG9kbycpWzBdO1xuICAgICAgICAgIHZpZXdUb2RvLmxpc3QgPSByZXNwb25zZS5kYXRhLmxpc3QubWFwKCh0OiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnQsXG4gICAgICAgICAgICAgIGF2YXRhcjogdD8uaW1nVXJsIHx8ICcuL2Fzc2V0cy90bXAvaW1nL3RvZG8ucG5nJyxcbiAgICAgICAgICAgICAgdGl0bGU6IHQuc3lzdGVtTmFtZSxcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHQuY29udGVudCxcbiAgICAgICAgICAgICAgZGF0ZXRpbWU6IGZvcm1hdERpc3RhbmNlVG9Ob3cobmV3IERhdGUodC5kYXRlKSwgeyBsb2NhbGU6IHRoaXMubnpJMThuLmdldERhdGVMb2NhbGUoKSB9KSxcbiAgICAgICAgICAgICAgZXh0cmE6IGZvcm1hdFRvZG9TdGF0dXModC5zdGF0dXMpLmV4dHJhLFxuICAgICAgICAgICAgICBjb2xvcjogZm9ybWF0VG9kb1N0YXR1cyh0LnN0YXR1cykuY29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jb3VudCArPSB2aWV3VG9kby5saXN0Lmxlbmd0aDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBjbGVhcih0eXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB0ID0gdGhpcy5kYXRhLmZpbHRlcihkID0+IGQudGl0bGUgPT09IHR5cGUpWzBdO1xuICAgIGlmICh0LmtleSA9PSAnbXNnJyB8fCB0LmtleSA9PSAnbm90aWNlJykge1xuICAgICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICAgIHRoaXMuaHR0cENsaWVudC5wb3N0KGAvbWVzc2FnZS1jZW50ZXItMy9teS1tc2ctYW5kLXRvZG8vbXNnLWNsZWFyYCwge30pLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICB0aGlzLm1zZy5zdWNjZXNzKGAke3RoaXMueTE4bi5mYW55aSgnbm90aWZ5LmNsZWFyJyl9ICR7dHlwZX1gKTtcbiAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodC5rZXkgPT0gJ3RvZG8nKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KHJlczogTm90aWNlSWNvblNlbGVjdCk6IHZvaWQge1xuICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykub3BlbihyZXMuaXRlbS51cmwpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vicy5mb3JFYWNoKGEgPT4gYS51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19