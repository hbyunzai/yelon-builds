import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { fromEvent, debounceTime, filter, takeUntil } from 'rxjs';
import { G2BaseComponent } from '@yelon/chart/core';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import * as i0 from "@angular/core";
const TITLE_HEIGHT = 41;
export class G2BarComponent extends G2BaseComponent {
    constructor() {
        super(...arguments);
        this.color = 'rgba(24, 144, 255, 0.85)';
        this.height = 0;
        this.padding = 'auto';
        this.data = [];
        this.autoLabel = true;
        this.interaction = 'none';
        this.clickItem = new EventEmitter();
    }
    // #endregion
    getHeight() {
        return this.title ? this.height - TITLE_HEIGHT : this.height;
    }
    install() {
        const { node, padding, interaction, theme } = this;
        const container = node.nativeElement;
        const chart = (this._chart = new this.winG2.Chart({
            container,
            autoFit: true,
            height: this.getHeight(),
            padding,
            theme
        }));
        this.updatelabel();
        chart.axis('y', {
            title: null,
            line: null,
            tickLine: null
        });
        chart.scale({
            x: {
                type: 'cat'
            },
            y: {
                min: 0
            }
        });
        chart.tooltip({
            showTitle: false
        });
        if (interaction !== 'none') {
            chart.interaction(interaction);
        }
        chart.legend(false);
        chart
            .interval()
            .position('x*y')
            .color('x*y', (x, y) => {
            const colorItem = this.data.find(w => w.x === x && w.y === y);
            return colorItem && colorItem.color ? colorItem.color : this.color;
        })
            .tooltip('x*y', (x, y) => ({ name: x, value: y }));
        chart.on(`interval:click`, (ev) => {
            this.ngZone.run(() => this.clickItem.emit({ item: ev.data?.data, ev }));
        });
        this.ready.next(chart);
        this.changeData();
        chart.render();
        this.installResizeEvent();
    }
    changeData() {
        const { _chart, data } = this;
        if (!_chart || !Array.isArray(data) || data.length <= 0)
            return;
        _chart.changeData(data);
    }
    updatelabel() {
        const { node, data, _chart } = this;
        const canvasWidth = node.nativeElement.clientWidth;
        const minWidth = data.length * 30;
        _chart.axis('x', canvasWidth > minWidth).render();
    }
    installResizeEvent() {
        if (!this.autoLabel || this.resize$)
            return;
        this.resize$ = fromEvent(window, 'resize')
            .pipe(takeUntil(this.destroy$), filter(() => !!this._chart), debounceTime(200))
            .subscribe(() => this.ngZone.runOutsideAngular(() => this.updatelabel()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: G2BarComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.0", type: G2BarComponent, isStandalone: true, selector: "g2-bar", inputs: { title: "title", color: "color", height: ["height", "height", numberAttribute], padding: "padding", data: "data", autoLabel: ["autoLabel", "autoLabel", booleanAttribute], interaction: "interaction" }, outputs: { clickItem: "clickItem" }, host: { properties: { "style.height.px": "height" } }, exportAs: ["g2Bar"], usesInheritance: true, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="title">
      <h4 style="margin-bottom: 20px;">{{ title }}</h4>
    </ng-container>
    @if (!loaded) {
      <nz-skeleton />
    }
    <div #container></div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "component", type: NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: G2BarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g2-bar',
                    exportAs: 'g2Bar',
                    template: `
    <ng-container *nzStringTemplateOutlet="title">
      <h4 style="margin-bottom: 20px;">{{ title }}</h4>
    </ng-container>
    @if (!loaded) {
      <nz-skeleton />
    }
    <div #container></div>
  `,
                    host: {
                        '[style.height.px]': 'height'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true,
                    imports: [NzStringTemplateOutletDirective, NzSkeletonComponent]
                }]
        }], propDecorators: { title: [{
                type: Input
            }], color: [{
                type: Input
            }], height: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], padding: [{
                type: Input
            }], data: [{
                type: Input
            }], autoLabel: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], interaction: [{
                type: Input
            }], clickItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NoYXJ0L2Jhci9iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSWxFLE9BQU8sRUFBRSxlQUFlLEVBQXFCLE1BQU0sbUJBQW1CLENBQUM7QUFDdkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRTdELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQW1DeEIsTUFBTSxPQUFPLGNBQWUsU0FBUSxlQUFlO0lBckJuRDs7UUF5QlcsVUFBSyxHQUFHLDBCQUEwQixDQUFDO1FBQ0wsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUN6QyxZQUFPLEdBQStCLE1BQU0sQ0FBQztRQUM3QyxTQUFJLEdBQWdCLEVBQUUsQ0FBQztRQUNRLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDaEQsZ0JBQVcsR0FBc0IsTUFBTSxDQUFDO1FBQzlCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztLQXFGbkU7SUFuRkMsYUFBYTtJQUVMLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9ELENBQUM7SUFFRCxPQUFPO1FBQ0wsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztRQUVuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBNEIsQ0FBQztRQUNwRCxNQUFNLEtBQUssR0FBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN2RCxTQUFTO1lBQ1QsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QixPQUFPO1lBQ1AsS0FBSztTQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNWLENBQUMsRUFBRTtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNaO1lBQ0QsQ0FBQyxFQUFFO2dCQUNELEdBQUcsRUFBRSxDQUFDO2FBQ1A7U0FDRixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ1osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxXQUFXLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDM0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixLQUFLO2FBQ0YsUUFBUSxFQUFFO2FBQ1YsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNmLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDckUsQ0FBQyxDQUFDO2FBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFckQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQVMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLE9BQU87UUFFaEUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sV0FBVztRQUNqQixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDcEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRTVDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7YUFDdkMsSUFBSSxDQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQ3hCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUMzQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQ2xCO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDOzhHQTlGVSxjQUFjO2tHQUFkLGNBQWMsaUhBS0wsZUFBZSwyRUFHZixnQkFBZ0IsaU1BMUIxQjs7Ozs7Ozs7R0FRVCw0REFRUywrQkFBK0IsZ0xBQUUsbUJBQW1COzsyRkFFbkQsY0FBYztrQkFyQjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRSxPQUFPO29CQUNqQixRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLG1CQUFtQixFQUFFLFFBQVE7cUJBQzlCO29CQUNELG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLCtCQUErQixFQUFFLG1CQUFtQixDQUFDO2lCQUNoRTs4QkFJVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNpQyxNQUFNO3NCQUE1QyxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRTtnQkFDNUIsT0FBTztzQkFBZixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDa0MsU0FBUztzQkFBaEQsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFDN0IsV0FBVztzQkFBbkIsS0FBSztnQkFDYSxTQUFTO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIG51bWJlckF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgdHlwZSB7IENoYXJ0LCBFdmVudCB9IGZyb20gJ0BhbnR2L2cyJztcblxuaW1wb3J0IHsgRzJCYXNlQ29tcG9uZW50LCBHMkludGVyYWN0aW9uVHlwZSB9IGZyb20gJ0B5ZWxvbi9jaGFydC9jb3JlJztcbmltcG9ydCB7IE56U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56U2tlbGV0b25Db21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3NrZWxldG9uJztcblxuY29uc3QgVElUTEVfSEVJR0hUID0gNDE7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRzJCYXJEYXRhIHtcbiAgeDogTnpTYWZlQW55O1xuICB5OiBOelNhZmVBbnk7XG4gIGNvbG9yPzogc3RyaW5nIHwgbnVsbDtcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEcyQmFyQ2xpY2tJdGVtIHtcbiAgaXRlbTogRzJCYXJEYXRhO1xuICBldjogRXZlbnQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2cyLWJhcicsXG4gIGV4cG9ydEFzOiAnZzJCYXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0aXRsZVwiPlxuICAgICAgPGg0IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMjBweDtcIj57eyB0aXRsZSB9fTwvaDQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgQGlmICghbG9hZGVkKSB7XG4gICAgICA8bnotc2tlbGV0b24gLz5cbiAgICB9XG4gICAgPGRpdiAjY29udGFpbmVyPjwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tzdHlsZS5oZWlnaHQucHhdJzogJ2hlaWdodCdcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTnpTdHJpbmdUZW1wbGF0ZU91dGxldERpcmVjdGl2ZSwgTnpTa2VsZXRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRzJCYXJDb21wb25lbnQgZXh0ZW5kcyBHMkJhc2VDb21wb25lbnQge1xuICAvLyAjcmVnaW9uIGZpZWxkc1xuXG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIGNvbG9yID0gJ3JnYmEoMjQsIDE0NCwgMjU1LCAwLjg1KSc7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGhlaWdodCA9IDA7XG4gIEBJbnB1dCgpIHBhZGRpbmc6IG51bWJlciB8IG51bWJlcltdIHwgJ2F1dG8nID0gJ2F1dG8nO1xuICBASW5wdXQoKSBkYXRhOiBHMkJhckRhdGFbXSA9IFtdO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b0xhYmVsID0gdHJ1ZTtcbiAgQElucHV0KCkgaW50ZXJhY3Rpb246IEcySW50ZXJhY3Rpb25UeXBlID0gJ25vbmUnO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xpY2tJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxHMkJhckNsaWNrSXRlbT4oKTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgcHJpdmF0ZSBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZSA/IHRoaXMuaGVpZ2h0IC0gVElUTEVfSEVJR0hUIDogdGhpcy5oZWlnaHQ7XG4gIH1cblxuICBpbnN0YWxsKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgbm9kZSwgcGFkZGluZywgaW50ZXJhY3Rpb24sIHRoZW1lIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gbm9kZS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIGNvbnN0IGNoYXJ0OiBDaGFydCA9ICh0aGlzLl9jaGFydCA9IG5ldyB0aGlzLndpbkcyLkNoYXJ0KHtcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGF1dG9GaXQ6IHRydWUsXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0SGVpZ2h0KCksXG4gICAgICBwYWRkaW5nLFxuICAgICAgdGhlbWVcbiAgICB9KSk7XG4gICAgdGhpcy51cGRhdGVsYWJlbCgpO1xuICAgIGNoYXJ0LmF4aXMoJ3knLCB7XG4gICAgICB0aXRsZTogbnVsbCxcbiAgICAgIGxpbmU6IG51bGwsXG4gICAgICB0aWNrTGluZTogbnVsbFxuICAgIH0pO1xuICAgIGNoYXJ0LnNjYWxlKHtcbiAgICAgIHg6IHtcbiAgICAgICAgdHlwZTogJ2NhdCdcbiAgICAgIH0sXG4gICAgICB5OiB7XG4gICAgICAgIG1pbjogMFxuICAgICAgfVxuICAgIH0pO1xuICAgIGNoYXJ0LnRvb2x0aXAoe1xuICAgICAgc2hvd1RpdGxlOiBmYWxzZVxuICAgIH0pO1xuICAgIGlmIChpbnRlcmFjdGlvbiAhPT0gJ25vbmUnKSB7XG4gICAgICBjaGFydC5pbnRlcmFjdGlvbihpbnRlcmFjdGlvbik7XG4gICAgfVxuICAgIGNoYXJ0LmxlZ2VuZChmYWxzZSk7XG4gICAgY2hhcnRcbiAgICAgIC5pbnRlcnZhbCgpXG4gICAgICAucG9zaXRpb24oJ3gqeScpXG4gICAgICAuY29sb3IoJ3gqeScsICh4LCB5KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbG9ySXRlbSA9IHRoaXMuZGF0YS5maW5kKHcgPT4gdy54ID09PSB4ICYmIHcueSA9PT0geSk7XG4gICAgICAgIHJldHVybiBjb2xvckl0ZW0gJiYgY29sb3JJdGVtLmNvbG9yID8gY29sb3JJdGVtLmNvbG9yIDogdGhpcy5jb2xvcjtcbiAgICAgIH0pXG4gICAgICAudG9vbHRpcCgneCp5JywgKHgsIHkpID0+ICh7IG5hbWU6IHgsIHZhbHVlOiB5IH0pKTtcblxuICAgIGNoYXJ0Lm9uKGBpbnRlcnZhbDpjbGlja2AsIChldjogRXZlbnQpID0+IHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmNsaWNrSXRlbS5lbWl0KHsgaXRlbTogZXYuZGF0YT8uZGF0YSwgZXYgfSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZWFkeS5uZXh0KGNoYXJ0KTtcblxuICAgIHRoaXMuY2hhbmdlRGF0YSgpO1xuICAgIGNoYXJ0LnJlbmRlcigpO1xuICAgIHRoaXMuaW5zdGFsbFJlc2l6ZUV2ZW50KCk7XG4gIH1cblxuICBjaGFuZ2VEYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgX2NoYXJ0LCBkYXRhIH0gPSB0aGlzO1xuICAgIGlmICghX2NoYXJ0IHx8ICFBcnJheS5pc0FycmF5KGRhdGEpIHx8IGRhdGEubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIF9jaGFydC5jaGFuZ2VEYXRhKGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVsYWJlbCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IG5vZGUsIGRhdGEsIF9jaGFydCB9ID0gdGhpcztcbiAgICBjb25zdCBjYW52YXNXaWR0aCA9IG5vZGUubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBtaW5XaWR0aCA9IGRhdGEubGVuZ3RoICogMzA7XG4gICAgX2NoYXJ0LmF4aXMoJ3gnLCBjYW52YXNXaWR0aCA+IG1pbldpZHRoKS5yZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdGFsbFJlc2l6ZUV2ZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hdXRvTGFiZWwgfHwgdGhpcy5yZXNpemUkKSByZXR1cm47XG5cbiAgICB0aGlzLnJlc2l6ZSQgPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhIXRoaXMuX2NoYXJ0KSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDIwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy51cGRhdGVsYWJlbCgpKSk7XG4gIH1cbn1cbiJdfQ==