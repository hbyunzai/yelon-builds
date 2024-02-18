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
        this.subs.push(
        // @ts-ignore
        forkJoin(this.loadTodo(), this.loadMessage()).subscribe(() => {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiNotifyComponent, deps: [{ token: i0.Injector }, { token: i1.NzMessageService }, { token: YUNZAI_I18N_TOKEN }, { token: i2.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i3._HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiNotifyComponent, selector: "yunzai-notify", ngImport: i0, template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    />
  `, isInline: true, dependencies: [{ kind: "component", type: i4.NoticeIconComponent, selector: "notice-icon", inputs: ["data", "count", "loading", "popoverVisible", "btnClass", "btnIconClass", "centered"], outputs: ["select", "clear", "popoverVisibleChange"], exportAs: ["noticeIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiNotifyComponent, decorators: [{
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
    />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1.NzMessageService }, { type: i5.YunzaiI18NService, decorators: [{
                    type: Inject,
                    args: [YUNZAI_I18N_TOKEN]
                }] }, { type: i2.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i3._HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLW5vdGlmeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L3dpZGdldHMveXVuemFpLW5vdGlmeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUlQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQTRCLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sY0FBYyxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0FBc0J4QyxNQUFNLE9BQU8scUJBQXFCO0lBK0JoQyxZQUNVLFFBQWtCLEVBQ2xCLEdBQXFCLEVBQ00sSUFBdUIsRUFDbEQsTUFBcUIsRUFDckIsR0FBc0IsRUFDdEIsVUFBdUI7UUFMdkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNNLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQXBDakMsU0FBSSxHQUFpQjtZQUNuQjtnQkFDRSxHQUFHLEVBQUUsS0FBSztnQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hDLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFB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RyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzhHQXhKVSxxQkFBcUIsMEVBa0N0QixpQkFBaUI7a0dBbENoQixxQkFBcUIscURBYnRCOzs7Ozs7Ozs7O0dBVVQ7OzJGQUdVLHFCQUFxQjtrQkFmakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFtQ0ksTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBtYXAgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2VUb05vdyB9IGZyb20gJ2RhdGUtZm5zJztcblxuaW1wb3J0IHsgTm90aWNlSWNvblNlbGVjdCwgTm90aWNlSXRlbSB9IGZyb20gJ0B5ZWxvbi9hYmMvbm90aWNlLWljb24nO1xuaW1wb3J0IHsgWVVOWkFJX0kxOE5fVE9LRU4sIF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5pbXBvcnQgeyBZdW56YWlJMThOU2VydmljZSB9IGZyb20gJy4uL3l1bnphaS1pMThuLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5dW56YWktbm90aWZ5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm90aWNlLWljb25cbiAgICAgIFtkYXRhXT1cImRhdGFcIlxuICAgICAgW2NvdW50XT1cImNvdW50XCJcbiAgICAgIFtsb2FkaW5nXT1cImxvYWRpbmdcIlxuICAgICAgYnRuQ2xhc3M9XCJ5dW56YWktZGVmYXVsdF9fbmF2LWl0ZW1cIlxuICAgICAgYnRuSWNvbkNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtLWljb25cIlxuICAgICAgKHNlbGVjdCk9XCJzZWxlY3QoJGV2ZW50KVwiXG4gICAgICAoY2xlYXIpPVwiY2xlYXIoJGV2ZW50KVwiXG4gICAgLz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpTm90aWZ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBkYXRhOiBOb3RpY2VJdGVtW10gPSBbXG4gICAge1xuICAgICAga2V5OiAnbXNnJyxcbiAgICAgIHRpdGxlOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5tZXNzYWdlJyksXG4gICAgICBsaXN0OiBbXSxcbiAgICAgIGVtcHR5VGV4dDogdGhpcy55MThuLmZhbnlpKCdub3RpZnkubWVzc2FnZS5lbXB0eScpLFxuICAgICAgZW1wdHlJbWFnZTogJy4vYXNzZXRzL3RtcC9pbWcvbWVzc2FnZS5zdmcnLFxuICAgICAgY2xlYXJUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5tZXNzYWdlLmNsZWFyJylcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3RvZG8nLFxuICAgICAgdGl0bGU6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnRvZG8nKSxcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgZW1wdHlUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS50b2RvLmVtcHR5JyksXG4gICAgICBlbXB0eUltYWdlOiAnLi9hc3NldHMvdG1wL2ltZy90b2RvLnN2ZycsXG4gICAgICBjbGVhclRleHQ6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnRvZG8uY2xlYXInKVxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnbm90aWNlJyxcbiAgICAgIHRpdGxlOiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3RpY2UnKSxcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgZW1wdHlUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3RpY2UuZW1wdHknKSxcbiAgICAgIGVtcHR5SW1hZ2U6ICcuL2Fzc2V0cy90bXAvaW1nL25vdGljZS5zdmcnLFxuICAgICAgY2xlYXJUZXh0OiB0aGlzLnkxOG4uZmFueWkoJ25vdGlmeS5ub3RpY2UuY2xlYXInKVxuICAgIH1cbiAgXTtcbiAgbG9hZGluZyA9IGZhbHNlO1xuICBjb3VudCA9IDA7XG4gIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBtc2c6IE56TWVzc2FnZVNlcnZpY2UsXG4gICAgQEluamVjdChZVU5aQUlfSTE4Tl9UT0tFTikgcHJpdmF0ZSB5MThuOiBZdW56YWlJMThOU2VydmljZSxcbiAgICBwcml2YXRlIG56STE4bjogTnpJMThuU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBfSHR0cENsaWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgbG9hZERhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGZvcmtKb2luKHRoaXMubG9hZFRvZG8oKSwgdGhpcy5sb2FkTWVzc2FnZSgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbG9hZE1lc3NhZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgbG9nKCdub3RpZnkuY29tcG9uZW50OiAnLCAnZmV0Y2ggbWVzc2FnZSBsaXN0Jyk7XG4gICAgY29uc3QgZm9ybWF0TWVzc2FnZVN0YXR1cyA9IChzdGF0dXM6IHN0cmluZyk6IE56U2FmZUFueSA9PiB7XG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkudW5yZWFkJyksIGNvbG9yOiAncmVkJyB9O1xuICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkucmVhZGVkJyksIGNvbG9yOiAnZ3JlZW4nIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5Lm5vc3RhdHVzJyksIGNvbG9yOiAncHJpbWFyeScgfTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgIC5wb3N0KGAvbWVzc2FnZS1jZW50ZXItMy9teS1tc2ctYW5kLXRvZG8vbXNnLWxpc3RgLCB7XG4gICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgc3RhdHVzOiAnMCdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgY29uc3Qgdmlld01lc3NhZ2UgPSB0aGlzLmRhdGEuZmlsdGVyKGQgPT4gZC5rZXkgPT09ICdtc2cnKVswXTtcbiAgICAgICAgICB2aWV3TWVzc2FnZS5saXN0ID0gcmVzcG9uc2UuZGF0YS5saXN0Lm1hcCgobTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5tLFxuICAgICAgICAgICAgICBhdmF0YXI6IG0/LmltZ1VybCB8fCAnLi9hc3NldHMvdG1wL2ltZy9tZXNzYWdlLnBuZycsXG4gICAgICAgICAgICAgIHRpdGxlOiBtLnN5c3RlbU5hbWUsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBtLmNvbnRlbnQsXG4gICAgICAgICAgICAgIGV4dHJhOiBmb3JtYXRNZXNzYWdlU3RhdHVzKG0uc3RhdHVzKS5leHRyYSxcbiAgICAgICAgICAgICAgY29sb3I6IGZvcm1hdE1lc3NhZ2VTdGF0dXMobS5zdGF0dXMpLmNvbG9yLFxuICAgICAgICAgICAgICBkYXRldGltZTogZm9ybWF0RGlzdGFuY2VUb05vdyhuZXcgRGF0ZShtLmRhdGUpLCB7IGxvY2FsZTogdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpIH0pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY291bnQgKz0gdmlld01lc3NhZ2UubGlzdC5sZW5ndGg7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgbG9hZFRvZG8oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgbG9nKCdub3RpZnkuY29tcG9uZW50OiAnLCAnZmV0Y2ggdG9kbyBsaXN0Jyk7XG4gICAgY29uc3QgZm9ybWF0VG9kb1N0YXR1cyA9IChzdGF0dXM6IHN0cmluZyk6IE56U2FmZUFueSA9PiB7XG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkudW5zdGFydCcpLCBjb2xvcjogJ3JlZCcgfTtcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMueTE4bi5mYW55aSgnbm90aWZ5LnN0YXJ0ZWQnKSwgY29sb3I6ICdncmVlbicgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy55MThuLmZhbnlpKCdub3RpZnkubm9zdGF0dXMnKSwgY29sb3I6ICdwcmltYXJ5JyB9O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLnBvc3QoYC9tZXNzYWdlLWNlbnRlci0zL215LW1zZy1hbmQtdG9kby90b2RvLWxpc3RgLCB7XG4gICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgc3RhdHVzOiAnMCdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgY29uc3Qgdmlld1RvZG8gPSB0aGlzLmRhdGEuZmlsdGVyKGQgPT4gZC5rZXkgPT09ICd0b2RvJylbMF07XG4gICAgICAgICAgdmlld1RvZG8ubGlzdCA9IHJlc3BvbnNlLmRhdGEubGlzdC5tYXAoKHQ6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4udCxcbiAgICAgICAgICAgICAgYXZhdGFyOiB0Py5pbWdVcmwgfHwgJy4vYXNzZXRzL3RtcC9pbWcvdG9kby5wbmcnLFxuICAgICAgICAgICAgICB0aXRsZTogdC5zeXN0ZW1OYW1lLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdC5jb250ZW50LFxuICAgICAgICAgICAgICBkYXRldGltZTogZm9ybWF0RGlzdGFuY2VUb05vdyhuZXcgRGF0ZSh0LmRhdGUpLCB7IGxvY2FsZTogdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpIH0pLFxuICAgICAgICAgICAgICBleHRyYTogZm9ybWF0VG9kb1N0YXR1cyh0LnN0YXR1cykuZXh0cmEsXG4gICAgICAgICAgICAgIGNvbG9yOiBmb3JtYXRUb2RvU3RhdHVzKHQuc3RhdHVzKS5jb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmNvdW50ICs9IHZpZXdUb2RvLmxpc3QubGVuZ3RoO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGNsZWFyKHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHQgPSB0aGlzLmRhdGEuZmlsdGVyKGQgPT4gZC50aXRsZSA9PT0gdHlwZSlbMF07XG4gICAgaWYgKHQua2V5ID09ICdtc2cnIHx8IHQua2V5ID09ICdub3RpY2UnKSB7XG4gICAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50LnBvc3QoYC9tZXNzYWdlLWNlbnRlci0zL215LW1zZy1hbmQtdG9kby9tc2ctY2xlYXJgLCB7fSkuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgICAgIHRoaXMubXNnLnN1Y2Nlc3MoYCR7dGhpcy55MThuLmZhbnlpKCdub3RpZnkuY2xlYXInKX0gJHt0eXBlfWApO1xuICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0LmtleSA9PSAndG9kbycpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QocmVzOiBOb3RpY2VJY29uU2VsZWN0KTogdm9pZCB7XG4gICAgdGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5vcGVuKHJlcy5pdGVtLnVybCk7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzLmZvckVhY2goYSA9PiBhLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=