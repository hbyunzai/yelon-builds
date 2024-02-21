import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { NoticeIconModule } from '@yelon/abc/notice-icon';
import { _HttpClient, YUNZAI_I18N_TOKEN } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/abc/notice-icon";
export class YunzaiHeaderNotifyComponent {
    constructor() {
        this.i18n = inject(YUNZAI_I18N_TOKEN);
        this.msg = inject(NzMessageService);
        this.nzI18n = inject(NzI18nService);
        this.cdr = inject(ChangeDetectorRef);
        this.http = inject(_HttpClient);
        this.loading = false;
        this.count = 0;
        this.subs = [];
        this.data = [
            {
                key: 'msg',
                title: this.i18n.fanyi('notify.message'),
                list: [],
                emptyText: this.i18n.fanyi('notify.message.empty'),
                emptyImage: './assets/tmp/img/message.svg',
                clearText: this.i18n.fanyi('notify.message.clear')
            },
            {
                key: 'todo',
                title: this.i18n.fanyi('notify.todo'),
                list: [],
                emptyText: this.i18n.fanyi('notify.todo.empty'),
                emptyImage: './assets/tmp/img/todo.svg',
                clearText: this.i18n.fanyi('notify.todo.clear')
            },
            {
                key: 'notice',
                title: this.i18n.fanyi('notify.notice'),
                list: [],
                emptyText: this.i18n.fanyi('notify.notice.empty'),
                emptyImage: './assets/tmp/img/notice.svg',
                clearText: this.i18n.fanyi('notify.notice.clear')
            }
        ];
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
        const formatMessageStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.i18n.fanyi('notify.unread'), color: 'red' };
                case '1':
                    return { extra: this.i18n.fanyi('notify.readed'), color: 'green' };
                default:
                    return { extra: this.i18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.http
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
        const formatTodoStatus = (status) => {
            switch (status) {
                case '0':
                    return { extra: this.i18n.fanyi('notify.unstart'), color: 'red' };
                case '1':
                    return { extra: this.i18n.fanyi('notify.started'), color: 'green' };
                default:
                    return { extra: this.i18n.fanyi('notify.nostatus'), color: 'primary' };
            }
        };
        return this.http
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
            this.subs.push(this.http.post(`/message-center-3/my-msg-and-todo/msg-clear`, {}).subscribe(_ => {
                this.msg.success(`${this.i18n.fanyi('notify.clear')} ${type}`);
                this.loadData();
            }));
        }
        if (t.key == 'todo') {
            this.loadData();
        }
    }
    select(res) {
        inject(WINDOW).open(res.item.url);
        this.loadData();
    }
    ngOnDestroy() {
        this.subs.forEach(a => a.unsubscribe());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderNotifyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.1", type: YunzaiHeaderNotifyComponent, isStandalone: true, selector: "yunzai-header-notify", ngImport: i0, template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="yunzai-default__nav-item"
      btnIconClass="yunzai-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NoticeIconModule }, { kind: "component", type: i1.NoticeIconComponent, selector: "notice-icon", inputs: ["data", "count", "loading", "popoverVisible", "btnClass", "btnIconClass", "centered"], outputs: ["select", "clear", "popoverVisibleChange"], exportAs: ["noticeIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: YunzaiHeaderNotifyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `yunzai-header-notify`,
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
                    standalone: true,
                    imports: [NoticeIconModule],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLW5vdGlmeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMveXVuemFpLXdpZGdldHMveXVuemFpLW5vdGlmeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUE0QixNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFnQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQXlCLE1BQU0sY0FBYyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFtQnpELE1BQU0sT0FBTywyQkFBMkI7SUFqQnhDO1FBa0JtQixTQUFJLEdBQUcsTUFBTSxDQUF3QixpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hELFFBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvQixXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9CLFFBQUcsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoQyxTQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBbUIsRUFBRSxDQUFDO1FBQzFC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QUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzhHQWxKVSwyQkFBMkI7a0dBQTNCLDJCQUEyQixnRkFmNUI7Ozs7Ozs7Ozs7R0FVVCwyREFFUyxnQkFBZ0I7OzJGQUdmLDJCQUEyQjtrQkFqQnZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgaW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIG1hcCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGZvcm1hdERpc3RhbmNlVG9Ob3cgfSBmcm9tICdkYXRlLWZucyc7XG5cbmltcG9ydCB7IE5vdGljZUljb25Nb2R1bGUsIE5vdGljZUljb25TZWxlY3QsIE5vdGljZUl0ZW0gfSBmcm9tICdAeWVsb24vYWJjL25vdGljZS1pY29uJztcbmltcG9ydCB7IF9IdHRwQ2xpZW50LCBZVU5aQUlfSTE4Tl9UT0tFTiwgWXVuemFpSHR0cEkxOE5TZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGB5dW56YWktaGVhZGVyLW5vdGlmeWAsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdGljZS1pY29uXG4gICAgICBbZGF0YV09XCJkYXRhXCJcbiAgICAgIFtjb3VudF09XCJjb3VudFwiXG4gICAgICBbbG9hZGluZ109XCJsb2FkaW5nXCJcbiAgICAgIGJ0bkNsYXNzPVwieXVuemFpLWRlZmF1bHRfX25hdi1pdGVtXCJcbiAgICAgIGJ0bkljb25DbGFzcz1cInl1bnphaS1kZWZhdWx0X19uYXYtaXRlbS1pY29uXCJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0KCRldmVudClcIlxuICAgICAgKGNsZWFyKT1cImNsZWFyKCRldmVudClcIlxuICAgIC8+XG4gIGAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOb3RpY2VJY29uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWXVuemFpSGVhZGVyTm90aWZ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGkxOG4gPSBpbmplY3Q8WXVuemFpSHR0cEkxOE5TZXJ2aWNlPihZVU5aQUlfSTE4Tl9UT0tFTik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbXNnID0gaW5qZWN0KE56TWVzc2FnZVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IG56STE4biA9IGluamVjdChOekkxOG5TZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZHIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGh0dHAgPSBpbmplY3QoX0h0dHBDbGllbnQpO1xuICBsb2FkaW5nID0gZmFsc2U7XG4gIGNvdW50ID0gMDtcbiAgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgZGF0YTogTm90aWNlSXRlbVtdID0gW1xuICAgIHtcbiAgICAgIGtleTogJ21zZycsXG4gICAgICB0aXRsZTogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkubWVzc2FnZScpLFxuICAgICAgbGlzdDogW10sXG4gICAgICBlbXB0eVRleHQ6IHRoaXMuaTE4bi5mYW55aSgnbm90aWZ5Lm1lc3NhZ2UuZW1wdHknKSxcbiAgICAgIGVtcHR5SW1hZ2U6ICcuL2Fzc2V0cy90bXAvaW1nL21lc3NhZ2Uuc3ZnJyxcbiAgICAgIGNsZWFyVGV4dDogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkubWVzc2FnZS5jbGVhcicpXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICd0b2RvJyxcbiAgICAgIHRpdGxlOiB0aGlzLmkxOG4uZmFueWkoJ25vdGlmeS50b2RvJyksXG4gICAgICBsaXN0OiBbXSxcbiAgICAgIGVtcHR5VGV4dDogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkudG9kby5lbXB0eScpLFxuICAgICAgZW1wdHlJbWFnZTogJy4vYXNzZXRzL3RtcC9pbWcvdG9kby5zdmcnLFxuICAgICAgY2xlYXJUZXh0OiB0aGlzLmkxOG4uZmFueWkoJ25vdGlmeS50b2RvLmNsZWFyJylcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ25vdGljZScsXG4gICAgICB0aXRsZTogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkubm90aWNlJyksXG4gICAgICBsaXN0OiBbXSxcbiAgICAgIGVtcHR5VGV4dDogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkubm90aWNlLmVtcHR5JyksXG4gICAgICBlbXB0eUltYWdlOiAnLi9hc3NldHMvdG1wL2ltZy9ub3RpY2Uuc3ZnJyxcbiAgICAgIGNsZWFyVGV4dDogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkubm90aWNlLmNsZWFyJylcbiAgICB9XG4gIF07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgbG9hZERhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGZvcmtKb2luKHRoaXMubG9hZFRvZG8oKSwgdGhpcy5sb2FkTWVzc2FnZSgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbG9hZE1lc3NhZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgY29uc3QgZm9ybWF0TWVzc2FnZVN0YXR1cyA9IChzdGF0dXM6IHN0cmluZyk6IE56U2FmZUFueSA9PiB7XG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkudW5yZWFkJyksIGNvbG9yOiAncmVkJyB9O1xuICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkucmVhZGVkJyksIGNvbG9yOiAnZ3JlZW4nIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMuaTE4bi5mYW55aSgnbm90aWZ5Lm5vc3RhdHVzJyksIGNvbG9yOiAncHJpbWFyeScgfTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KGAvbWVzc2FnZS1jZW50ZXItMy9teS1tc2ctYW5kLXRvZG8vbXNnLWxpc3RgLCB7XG4gICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgc3RhdHVzOiAnMCdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgY29uc3Qgdmlld01lc3NhZ2UgPSB0aGlzLmRhdGEuZmlsdGVyKGQgPT4gZC5rZXkgPT09ICdtc2cnKVswXTtcbiAgICAgICAgICB2aWV3TWVzc2FnZS5saXN0ID0gcmVzcG9uc2UuZGF0YS5saXN0Lm1hcCgobTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5tLFxuICAgICAgICAgICAgICBhdmF0YXI6IG0/LmltZ1VybCB8fCAnLi9hc3NldHMvdG1wL2ltZy9tZXNzYWdlLnBuZycsXG4gICAgICAgICAgICAgIHRpdGxlOiBtLnN5c3RlbU5hbWUsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBtLmNvbnRlbnQsXG4gICAgICAgICAgICAgIGV4dHJhOiBmb3JtYXRNZXNzYWdlU3RhdHVzKG0uc3RhdHVzKS5leHRyYSxcbiAgICAgICAgICAgICAgY29sb3I6IGZvcm1hdE1lc3NhZ2VTdGF0dXMobS5zdGF0dXMpLmNvbG9yLFxuICAgICAgICAgICAgICBkYXRldGltZTogZm9ybWF0RGlzdGFuY2VUb05vdyhuZXcgRGF0ZShtLmRhdGUpLCB7IGxvY2FsZTogdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpIH0pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY291bnQgKz0gdmlld01lc3NhZ2UubGlzdC5sZW5ndGg7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgbG9hZFRvZG8oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgY29uc3QgZm9ybWF0VG9kb1N0YXR1cyA9IChzdGF0dXM6IHN0cmluZyk6IE56U2FmZUFueSA9PiB7XG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkudW5zdGFydCcpLCBjb2xvcjogJ3JlZCcgfTtcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgcmV0dXJuIHsgZXh0cmE6IHRoaXMuaTE4bi5mYW55aSgnbm90aWZ5LnN0YXJ0ZWQnKSwgY29sb3I6ICdncmVlbicgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4geyBleHRyYTogdGhpcy5pMThuLmZhbnlpKCdub3RpZnkubm9zdGF0dXMnKSwgY29sb3I6ICdwcmltYXJ5JyB9O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QoYC9tZXNzYWdlLWNlbnRlci0zL215LW1zZy1hbmQtdG9kby90b2RvLWxpc3RgLCB7XG4gICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgc3RhdHVzOiAnMCdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgY29uc3Qgdmlld1RvZG8gPSB0aGlzLmRhdGEuZmlsdGVyKGQgPT4gZC5rZXkgPT09ICd0b2RvJylbMF07XG4gICAgICAgICAgdmlld1RvZG8ubGlzdCA9IHJlc3BvbnNlLmRhdGEubGlzdC5tYXAoKHQ6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4udCxcbiAgICAgICAgICAgICAgYXZhdGFyOiB0Py5pbWdVcmwgfHwgJy4vYXNzZXRzL3RtcC9pbWcvdG9kby5wbmcnLFxuICAgICAgICAgICAgICB0aXRsZTogdC5zeXN0ZW1OYW1lLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdC5jb250ZW50LFxuICAgICAgICAgICAgICBkYXRldGltZTogZm9ybWF0RGlzdGFuY2VUb05vdyhuZXcgRGF0ZSh0LmRhdGUpLCB7IGxvY2FsZTogdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpIH0pLFxuICAgICAgICAgICAgICBleHRyYTogZm9ybWF0VG9kb1N0YXR1cyh0LnN0YXR1cykuZXh0cmEsXG4gICAgICAgICAgICAgIGNvbG9yOiBmb3JtYXRUb2RvU3RhdHVzKHQuc3RhdHVzKS5jb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmNvdW50ICs9IHZpZXdUb2RvLmxpc3QubGVuZ3RoO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGNsZWFyKHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHQgPSB0aGlzLmRhdGEuZmlsdGVyKGQgPT4gZC50aXRsZSA9PT0gdHlwZSlbMF07XG4gICAgaWYgKHQua2V5ID09ICdtc2cnIHx8IHQua2V5ID09ICdub3RpY2UnKSB7XG4gICAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgICAgdGhpcy5odHRwLnBvc3QoYC9tZXNzYWdlLWNlbnRlci0zL215LW1zZy1hbmQtdG9kby9tc2ctY2xlYXJgLCB7fSkuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgICAgIHRoaXMubXNnLnN1Y2Nlc3MoYCR7dGhpcy5pMThuLmZhbnlpKCdub3RpZnkuY2xlYXInKX0gJHt0eXBlfWApO1xuICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0LmtleSA9PSAndG9kbycpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QocmVzOiBOb3RpY2VJY29uU2VsZWN0KTogdm9pZCB7XG4gICAgaW5qZWN0KFdJTkRPVykub3BlbihyZXMuaXRlbS51cmwpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vicy5mb3JFYWNoKGEgPT4gYS51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19