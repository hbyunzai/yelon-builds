import { Directive, EventEmitter, Input, Output, ViewContainerRef, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fixEndTimeOfRange, getTimeDistance } from '@yelon/util/date-time';
import { assert, deepMergeKey } from '@yelon/util/other';
import { NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { RangePickerShortcutTplComponent } from './range-shortcut.component';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class RangePickerDirective {
    set shortcut(val) {
        const item = deepMergeKey({ list: [] }, true, this.defaultShortcuts, val == null ? {} : val);
        if (typeof val !== 'object') {
            item.enabled = val !== false;
        }
        (item.list || []).forEach(i => {
            i._text = this.dom.bypassSecurityTrustHtml(i.text);
        });
        this._shortcut = item;
        this.refreshShortcut();
    }
    get shortcut() {
        return this._shortcut;
    }
    get dp() {
        return this.nativeComp.datePicker;
    }
    get srv() {
        return this.dp.datePickerService;
    }
    constructor(configSrv) {
        this.dom = inject(DomSanitizer);
        this.vcr = inject(ViewContainerRef);
        this.nativeComp = inject(NzRangePickerComponent, { host: true, optional: true });
        this._shortcut = null;
        this.shortcutFactory = null;
        this.start = null;
        this.end = null;
        this.ngModelEndChange = new EventEmitter();
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            assert(!!this.nativeComp, `It should be attached to nz-range-picker component, for example: '<nz-range-picker [(ngModel)]="i.start" extend [(ngModelEnd)]="i.end" shortcut></nz-range-picker>'`);
        }
        const cog = configSrv.merge('dataRange', {
            nzFormat: 'yyyy-MM-dd',
            nzAllowClear: true,
            nzAutoFocus: false,
            nzPopupStyle: { position: 'relative' },
            nzShowToday: true,
            shortcuts: {
                enabled: false,
                closed: true,
                list: [
                    {
                        text: '今天',
                        fn: () => getTimeDistance('today')
                    },
                    {
                        text: '昨天',
                        fn: () => getTimeDistance('yesterday')
                    },
                    {
                        text: '近3天',
                        fn: () => getTimeDistance(-2)
                    },
                    {
                        text: '近7天',
                        fn: () => getTimeDistance(-6)
                    },
                    {
                        text: '本周',
                        fn: () => getTimeDistance('week')
                    },
                    {
                        text: '本月',
                        fn: () => getTimeDistance('month')
                    },
                    {
                        text: '全年',
                        fn: () => getTimeDistance('year')
                    }
                ]
            }
        });
        this.defaultShortcuts = { ...cog.shortcuts };
        Object.assign(this, cog);
    }
    cd() {
        this.dp.cdr.markForCheck();
    }
    overrideNative() {
        const dp = this.dp;
        dp.writeValue = (value) => {
            const dates = (value && this.ngModelEnd ? [value, this.ngModelEnd] : []).filter(w => !!w);
            this.srv.setValue(this.srv.makeValue(dates));
            this.start = dates.length > 0 ? dates[0] : null;
            this.end = dates.length > 0 ? dates[1] : null;
            this.cd();
        };
        const oldOnChangeFn = dp.onChangeFn;
        dp.onChangeFn = (list) => {
            let start = null;
            let end = null;
            if (list.length > 0 && list.filter(w => w != null).length === 2) {
                [start, end] = fixEndTimeOfRange([list[0], list[1]]);
            }
            this.start = start;
            this.end = end;
            oldOnChangeFn(start);
            this.ngModelEnd = end;
            this.ngModelEndChange.emit(end);
        };
    }
    refreshShortcut() {
        if (!this._shortcut) {
            return;
        }
        const { enabled, list } = this._shortcut;
        let extraFooter;
        if (!this.nativeComp || !enabled) {
            extraFooter = undefined;
        }
        else {
            if (!this.shortcutFactory) {
                this.shortcutFactory = this.vcr.createComponent(RangePickerShortcutTplComponent);
            }
            const { instance } = this.shortcutFactory;
            instance.list = list;
            instance.click = (item) => {
                const res = item.fn([this.start, this.end]);
                this.srv.setValue(this.srv.makeValue(res));
                this.dp.onChangeFn(res);
                this.dp.close();
            };
            extraFooter = instance.tpl;
        }
        this.nativeComp.datePicker.extraFooter = extraFooter;
        Promise.resolve().then(() => this.cd());
    }
    ngAfterViewInit() {
        this.overrideNative();
        this.refreshShortcut();
    }
    destoryShortcut() {
        if (this.shortcutFactory != null) {
            this.shortcutFactory.destroy();
        }
    }
    ngOnDestroy() {
        this.destoryShortcut();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: RangePickerDirective, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.6", type: RangePickerDirective, isStandalone: true, selector: "nz-range-picker[extend]", inputs: { shortcut: "shortcut", ngModelEnd: "ngModelEnd" }, outputs: { ngModelEndChange: "ngModelEndChange" }, exportAs: ["extendRangePicker"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: RangePickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-range-picker[extend]',
                    exportAs: 'extendRangePicker',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }], propDecorators: { shortcut: [{
                type: Input
            }], ngModelEnd: [{
                type: Input,
                args: [{ required: true }]
            }], ngModelEndChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2RhdGUtcGlja2VyL3JhbmdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLGdCQUFnQixFQUNoQixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXpELE9BQU8sRUFBeUIsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUcxRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBTzdFLE1BQU0sT0FBTyxvQkFBb0I7SUFhL0IsSUFDSSxRQUFRLENBQUMsR0FBeUM7UUFDcEQsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUN2QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFDWixJQUFJLEVBQ0osSUFBSSxDQUFDLGdCQUFnQixFQUNyQixHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDVSxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDO1FBQy9CLENBQUM7UUFDRCxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxD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RSxtQkFBbUI7b0JBQzdCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjt3RkFlSyxRQUFRO3NCQURYLEtBQUs7Z0JBb0JxQixVQUFVO3NCQUFwQyxLQUFLO3VCQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFDTixnQkFBZ0I7c0JBQWxDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBpbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXQsIFl1bnphaURhdGVSYW5nZVBpY2tlclNob3J0Y3V0SXRlbSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBmaXhFbmRUaW1lT2ZSYW5nZSwgZ2V0VGltZURpc3RhbmNlIH0gZnJvbSAnQHllbG9uL3V0aWwvZGF0ZS10aW1lJztcbmltcG9ydCB7IGFzc2VydCwgZGVlcE1lcmdlS2V5IH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpEYXRlUGlja2VyQ29tcG9uZW50LCBOelJhbmdlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBEYXRlUGlja2VyU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFJhbmdlUGlja2VyU2hvcnRjdXRUcGxDb21wb25lbnQgfSBmcm9tICcuL3JhbmdlLXNob3J0Y3V0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ256LXJhbmdlLXBpY2tlcltleHRlbmRdJyxcbiAgZXhwb3J0QXM6ICdleHRlbmRSYW5nZVBpY2tlcicsXG4gIHN0YW5kYWxvbmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VQaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvcnRjdXQ6IFl1bnphaURhdGVSYW5nZVBpY2tlclNob3J0Y3V0IHwgc3RyaW5nIHwgbnVsbDtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRvbSA9IGluamVjdChEb21TYW5pdGl6ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHZjciA9IGluamVjdChWaWV3Q29udGFpbmVyUmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBuYXRpdmVDb21wID0gaW5qZWN0KE56UmFuZ2VQaWNrZXJDb21wb25lbnQsIHsgaG9zdDogdHJ1ZSwgb3B0aW9uYWw6IHRydWUgfSk7XG5cbiAgcHJpdmF0ZSBkZWZhdWx0U2hvcnRjdXRzOiBZdW56YWlEYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dDtcbiAgcHJpdmF0ZSBfc2hvcnRjdXQ6IFl1bnphaURhdGVSYW5nZVBpY2tlclNob3J0Y3V0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2hvcnRjdXRGYWN0b3J5OiBDb21wb25lbnRSZWY8UmFuZ2VQaWNrZXJTaG9ydGN1dFRwbENvbXBvbmVudD4gfCBudWxsID0gbnVsbDtcbiAgc3RhcnQ6IERhdGUgfCBudWxsID0gbnVsbDtcbiAgZW5kOiBEYXRlIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgc2V0IHNob3J0Y3V0KHZhbDogWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXQgfCBudWxsKSB7XG4gICAgY29uc3QgaXRlbSA9IGRlZXBNZXJnZUtleShcbiAgICAgIHsgbGlzdDogW10gfSxcbiAgICAgIHRydWUsXG4gICAgICB0aGlzLmRlZmF1bHRTaG9ydGN1dHMsXG4gICAgICB2YWwgPT0gbnVsbCA/IHt9IDogdmFsXG4gICAgKSBhcyBZdW56YWlEYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dDtcbiAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGl0ZW0uZW5hYmxlZCA9IHZhbCAhPT0gZmFsc2U7XG4gICAgfVxuICAgIChpdGVtLmxpc3QgfHwgW10pLmZvckVhY2goaSA9PiB7XG4gICAgICBpLl90ZXh0ID0gdGhpcy5kb20uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaS50ZXh0KTtcbiAgICB9KTtcbiAgICB0aGlzLl9zaG9ydGN1dCA9IGl0ZW07XG4gICAgdGhpcy5yZWZyZXNoU2hvcnRjdXQoKTtcbiAgfVxuICBnZXQgc2hvcnRjdXQoKTogWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvcnRjdXQ7XG4gIH1cbiAgQElucHV0KHsgcmVxdWlyZWQ6IHRydWUgfSkgbmdNb2RlbEVuZDogTnpTYWZlQW55O1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbmdNb2RlbEVuZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55PigpO1xuXG4gIHByaXZhdGUgZ2V0IGRwKCk6IE56RGF0ZVBpY2tlckNvbXBvbmVudCB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlQ29tcCEuZGF0ZVBpY2tlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHNydigpOiBEYXRlUGlja2VyU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuZHAuZGF0ZVBpY2tlclNlcnZpY2U7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb25maWdTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UpIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgICEhdGhpcy5uYXRpdmVDb21wLFxuICAgICAgICBgSXQgc2hvdWxkIGJlIGF0dGFjaGVkIHRvIG56LXJhbmdlLXBpY2tlciBjb21wb25lbnQsIGZvciBleGFtcGxlOiAnPG56LXJhbmdlLXBpY2tlciBbKG5nTW9kZWwpXT1cImkuc3RhcnRcIiBleHRlbmQgWyhuZ01vZGVsRW5kKV09XCJpLmVuZFwiIHNob3J0Y3V0PjwvbnotcmFuZ2UtcGlja2VyPidgXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2cgPSBjb25maWdTcnYubWVyZ2UoJ2RhdGFSYW5nZScsIHtcbiAgICAgIG56Rm9ybWF0OiAneXl5eS1NTS1kZCcsXG4gICAgICBuekFsbG93Q2xlYXI6IHRydWUsXG4gICAgICBuekF1dG9Gb2N1czogZmFsc2UsXG4gICAgICBuelBvcHVwU3R5bGU6IHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfSxcbiAgICAgIG56U2hvd1RvZGF5OiB0cnVlLFxuICAgICAgc2hvcnRjdXRzOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBjbG9zZWQ6IHRydWUsXG4gICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAn5LuK5aSpJyxcbiAgICAgICAgICAgIGZuOiAoKSA9PiBnZXRUaW1lRGlzdGFuY2UoJ3RvZGF5JylcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICfmmKjlpKknLFxuICAgICAgICAgICAgZm46ICgpID0+IGdldFRpbWVEaXN0YW5jZSgneWVzdGVyZGF5JylcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICfov5Ez5aSpJyxcbiAgICAgICAgICAgIGZuOiAoKSA9PiBnZXRUaW1lRGlzdGFuY2UoLTIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAn6L+RN+WkqScsXG4gICAgICAgICAgICBmbjogKCkgPT4gZ2V0VGltZURpc3RhbmNlKC02KVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ+acrOWRqCcsXG4gICAgICAgICAgICBmbjogKCkgPT4gZ2V0VGltZURpc3RhbmNlKCd3ZWVrJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICfmnKzmnIgnLFxuICAgICAgICAgICAgZm46ICgpID0+IGdldFRpbWVEaXN0YW5jZSgnbW9udGgnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ+WFqOW5tCcsXG4gICAgICAgICAgICBmbjogKCkgPT4gZ2V0VGltZURpc3RhbmNlKCd5ZWFyJylcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KSE7XG4gICAgdGhpcy5kZWZhdWx0U2hvcnRjdXRzID0geyAuLi5jb2cuc2hvcnRjdXRzIH0gYXMgWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXQ7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb2cpO1xuICB9XG5cbiAgcHJpdmF0ZSBjZCgpOiB2b2lkIHtcbiAgICAodGhpcy5kcCBhcyBOelNhZmVBbnkpLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgb3ZlcnJpZGVOYXRpdmUoKTogdm9pZCB7XG4gICAgY29uc3QgZHAgPSB0aGlzLmRwO1xuICAgIGRwLndyaXRlVmFsdWUgPSAodmFsdWU6IERhdGUpID0+IHtcbiAgICAgIGNvbnN0IGRhdGVzID0gKHZhbHVlICYmIHRoaXMubmdNb2RlbEVuZCA/IFt2YWx1ZSwgdGhpcy5uZ01vZGVsRW5kXSA6IFtdKS5maWx0ZXIodyA9PiAhIXcpO1xuICAgICAgdGhpcy5zcnYuc2V0VmFsdWUodGhpcy5zcnYubWFrZVZhbHVlKGRhdGVzKSk7XG4gICAgICB0aGlzLnN0YXJ0ID0gZGF0ZXMubGVuZ3RoID4gMCA/IGRhdGVzWzBdIDogbnVsbDtcbiAgICAgIHRoaXMuZW5kID0gZGF0ZXMubGVuZ3RoID4gMCA/IGRhdGVzWzFdIDogbnVsbDtcbiAgICAgIHRoaXMuY2QoKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb2xkT25DaGFuZ2VGbiA9IGRwLm9uQ2hhbmdlRm47XG4gICAgZHAub25DaGFuZ2VGbiA9IChsaXN0OiBBcnJheTxEYXRlIHwgbnVsbD4pID0+IHtcbiAgICAgIGxldCBzdGFydDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgICAgbGV0IGVuZDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMCAmJiBsaXN0LmZpbHRlcih3ID0+IHcgIT0gbnVsbCkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIFtzdGFydCwgZW5kXSA9IGZpeEVuZFRpbWVPZlJhbmdlKFtsaXN0WzBdISwgbGlzdFsxXSFdKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgb2xkT25DaGFuZ2VGbihzdGFydCk7XG4gICAgICB0aGlzLm5nTW9kZWxFbmQgPSBlbmQ7XG4gICAgICB0aGlzLm5nTW9kZWxFbmRDaGFuZ2UuZW1pdChlbmQpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hTaG9ydGN1dCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3Nob3J0Y3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgZW5hYmxlZCwgbGlzdCB9ID0gdGhpcy5fc2hvcnRjdXQ7XG4gICAgbGV0IGV4dHJhRm9vdGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkO1xuICAgIGlmICghdGhpcy5uYXRpdmVDb21wIHx8ICFlbmFibGVkKSB7XG4gICAgICBleHRyYUZvb3RlciA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnNob3J0Y3V0RmFjdG9yeSkge1xuICAgICAgICB0aGlzLnNob3J0Y3V0RmFjdG9yeSA9IHRoaXMudmNyLmNyZWF0ZUNvbXBvbmVudChSYW5nZVBpY2tlclNob3J0Y3V0VHBsQ29tcG9uZW50KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgaW5zdGFuY2UgfSA9IHRoaXMuc2hvcnRjdXRGYWN0b3J5O1xuICAgICAgaW5zdGFuY2UubGlzdCA9IGxpc3QhO1xuICAgICAgaW5zdGFuY2UuY2xpY2sgPSAoaXRlbTogWXVuemFpRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXRJdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGl0ZW0uZm4oW3RoaXMuc3RhcnQsIHRoaXMuZW5kXSk7XG4gICAgICAgIHRoaXMuc3J2LnNldFZhbHVlKHRoaXMuc3J2Lm1ha2VWYWx1ZShyZXMgYXMgRGF0ZVtdKSk7XG4gICAgICAgIHRoaXMuZHAub25DaGFuZ2VGbihyZXMpO1xuICAgICAgICB0aGlzLmRwLmNsb3NlKCk7XG4gICAgICB9O1xuICAgICAgZXh0cmFGb290ZXIgPSBpbnN0YW5jZS50cGw7XG4gICAgfVxuICAgIHRoaXMubmF0aXZlQ29tcCEuZGF0ZVBpY2tlci5leHRyYUZvb3RlciA9IGV4dHJhRm9vdGVyO1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5jZCgpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJyaWRlTmF0aXZlKCk7XG4gICAgdGhpcy5yZWZyZXNoU2hvcnRjdXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdG9yeVNob3J0Y3V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3J0Y3V0RmFjdG9yeSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnNob3J0Y3V0RmFjdG9yeS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0b3J5U2hvcnRjdXQoKTtcbiAgfVxufVxuIl19