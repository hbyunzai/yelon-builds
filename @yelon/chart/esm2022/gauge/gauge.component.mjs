import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, numberAttribute } from '@angular/core';
import { G2BaseComponent } from '@yelon/chart/core';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import * as i0 from "@angular/core";
export class G2GaugeComponent extends G2BaseComponent {
    constructor() {
        super(...arguments);
        this.color = '#2f9cff';
        this.padding = [10, 10, 30, 10];
    }
    // #endregion
    install() {
        // 自定义Shape 部分
        this.winG2.registerShape('point', 'pointer', {
            draw(cfg, container) {
                const group = container.addGroup({});
                // 获取极坐标系下画布中心点
                const center = this.parsePoint({ x: 0, y: 0 });
                // 绘制指针
                group.addShape('line', {
                    attrs: {
                        x1: center.x,
                        y1: center.y,
                        x2: cfg.x,
                        y2: cfg.y,
                        stroke: cfg.color,
                        lineWidth: 2.5,
                        lineCap: 'round'
                    }
                });
                group.addShape('circle', {
                    attrs: {
                        x: center.x,
                        y: center.y,
                        r: 5.75,
                        stroke: cfg.color,
                        lineWidth: 2,
                        fill: '#fff'
                    }
                });
                return group;
            }
        });
        const { el, height, padding, format, theme } = this;
        const chart = (this._chart = new this.winG2.Chart({
            container: el.nativeElement,
            autoFit: true,
            height,
            padding,
            theme
        }));
        chart.legend(false);
        chart.animate(false);
        chart.tooltip(false);
        chart.coordinate('polar', {
            startAngle: (-9 / 8) * Math.PI,
            endAngle: (1 / 8) * Math.PI,
            radius: 0.75
        });
        chart.scale('value', {
            min: 0,
            max: 100,
            nice: true,
            tickCount: 6
        });
        chart.axis('1', false);
        chart.axis('value', {
            line: null,
            label: {
                offset: -14,
                formatter: format
            },
            tickLine: null,
            grid: null
        });
        chart.point().position('value*1').shape('pointer');
        this.ready.next(chart);
        this.changeData();
        chart.render();
    }
    changeData() {
        const { _chart, percent, color, bgColor, title } = this;
        if (!_chart)
            return;
        const data = [{ name: title, value: percent }];
        const val = data[0].value;
        _chart.annotation().clear(true);
        _chart.geometries[0].color(color);
        // 绘制仪表盘背景
        _chart.annotation().arc({
            top: false,
            start: [0, 0.95],
            end: [100, 0.95],
            style: {
                stroke: bgColor,
                lineWidth: 12,
                lineDash: null
            }
        });
        _chart.annotation().arc({
            start: [0, 0.95],
            end: [data[0].value, 0.95],
            style: {
                stroke: color,
                lineWidth: 12,
                lineDash: null
            }
        });
        _chart.annotation().text({
            position: ['50%', '85%'],
            content: title,
            style: {
                fontSize: 12,
                fill: this.theme === 'dark' ? 'rgba(255, 255, 255, 0.43)' : 'rgba(0, 0, 0, 0.43)',
                textAlign: 'center'
            }
        });
        _chart.annotation().text({
            position: ['50%', '90%'],
            content: `${val} %`,
            style: {
                fontSize: 20,
                fill: this.theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
                textAlign: 'center'
            },
            offsetY: 15
        });
        _chart.changeData(data);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: G2GaugeComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.0", type: G2GaugeComponent, isStandalone: true, selector: "g2-gauge", inputs: { title: "title", height: ["height", "height", numberAttribute], color: "color", bgColor: "bgColor", format: "format", percent: ["percent", "percent", numberAttribute], padding: "padding" }, host: { properties: { "class.g2-gauge": "true" } }, exportAs: ["g2Gauge"], usesInheritance: true, ngImport: i0, template: `@if (!loaded) {
    <nz-skeleton />
  }`, isInline: true, dependencies: [{ kind: "component", type: NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: G2GaugeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g2-gauge',
                    exportAs: 'g2Gauge',
                    template: `@if (!loaded) {
    <nz-skeleton />
  }`,
                    host: {
                        '[class.g2-gauge]': 'true'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    standalone: true,
                    imports: [NzSkeletonComponent]
                }]
        }], propDecorators: { title: [{
                type: Input
            }], height: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], color: [{
                type: Input
            }], bgColor: [{
                type: Input
            }], format: [{
                type: Input
            }], percent: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], padding: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY2hhcnQvZ2F1Z2UvZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUk5RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBaUI3RCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQWZyRDs7UUFvQlcsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUlsQixZQUFPLEdBQStCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FrSWpFO0lBaElDLGFBQWE7SUFFYixPQUFPO1FBQ0wsY0FBYztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEdBQWMsRUFBRSxTQUFvQjtnQkFDdkMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckMsZUFBZTtnQkFDZixNQUFNLE1BQU0sR0FBSSxJQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlELE9BQU87Z0JBQ1AsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ1osRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNaLEVBQUUsRUFBRSxHQUFHLENBQUMs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QyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUU7Z0JBQzVCLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgbnVtYmVyQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQ2hhcnQgfSBmcm9tICdAYW50di9nMic7XG5cbmltcG9ydCB7IEcyQmFzZUNvbXBvbmVudCB9IGZyb20gJ0B5ZWxvbi9jaGFydC9jb3JlJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56U2tlbGV0b25Db21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3NrZWxldG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZzItZ2F1Z2UnLFxuICBleHBvcnRBczogJ2cyR2F1Z2UnLFxuICB0ZW1wbGF0ZTogYEBpZiAoIWxvYWRlZCkge1xuICAgIDxuei1za2VsZXRvbiAvPlxuICB9YCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZzItZ2F1Z2VdJzogJ3RydWUnXG4gIH0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW056U2tlbGV0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEcyR2F1Z2VDb21wb25lbnQgZXh0ZW5kcyBHMkJhc2VDb21wb25lbnQge1xuICAvLyAjcmVnaW9uIGZpZWxkc1xuXG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nO1xuICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBoZWlnaHQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvbG9yID0gJyMyZjljZmYnO1xuICBASW5wdXQoKSBiZ0NvbG9yPzogc3RyaW5nOyAvLyA9ICcjZjBmMmY1JztcbiAgQElucHV0KCkgZm9ybWF0PzogKHRleHQ6IHN0cmluZywgaXRlbTogTnpTYWZlQW55LCBpbmRleDogbnVtYmVyKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHBlcmNlbnQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBhZGRpbmc6IG51bWJlciB8IG51bWJlcltdIHwgJ2F1dG8nID0gWzEwLCAxMCwgMzAsIDEwXTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgaW5zdGFsbCgpOiB2b2lkIHtcbiAgICAvLyDoh6rlrprkuYlTaGFwZSDpg6jliIZcbiAgICB0aGlzLndpbkcyLnJlZ2lzdGVyU2hhcGUoJ3BvaW50JywgJ3BvaW50ZXInLCB7XG4gICAgICBkcmF3KGNmZzogTnpTYWZlQW55LCBjb250YWluZXI6IE56U2FmZUFueSkge1xuICAgICAgICBjb25zdCBncm91cCA9IGNvbnRhaW5lci5hZGRHcm91cCh7fSk7XG4gICAgICAgIC8vIOiOt+WPluaegeWdkOagh+ezu+S4i+eUu+W4g+S4reW/g+eCuVxuICAgICAgICBjb25zdCBjZW50ZXIgPSAodGhpcyBhcyBOelNhZmVBbnkpLnBhcnNlUG9pbnQoeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICAvLyDnu5jliLbmjIfpkohcbiAgICAgICAgZ3JvdXAuYWRkU2hhcGUoJ2xpbmUnLCB7XG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHgxOiBjZW50ZXIueCxcbiAgICAgICAgICAgIHkxOiBjZW50ZXIueSxcbiAgICAgICAgICAgIHgyOiBjZmcueCxcbiAgICAgICAgICAgIHkyOiBjZmcueSxcbiAgICAgICAgICAgIHN0cm9rZTogY2ZnLmNvbG9yLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAyLjUsXG4gICAgICAgICAgICBsaW5lQ2FwOiAncm91bmQnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZ3JvdXAuYWRkU2hhcGUoJ2NpcmNsZScsIHtcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgeDogY2VudGVyLngsXG4gICAgICAgICAgICB5OiBjZW50ZXIueSxcbiAgICAgICAgICAgIHI6IDUuNzUsXG4gICAgICAgICAgICBzdHJva2U6IGNmZy5jb2xvcixcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHsgZWwsIGhlaWdodCwgcGFkZGluZywgZm9ybWF0LCB0aGVtZSB9ID0gdGhpcztcblxuICAgIGNvbnN0IGNoYXJ0OiBDaGFydCA9ICh0aGlzLl9jaGFydCA9IG5ldyB0aGlzLndpbkcyLkNoYXJ0KHtcbiAgICAgIGNvbnRhaW5lcjogZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGF1dG9GaXQ6IHRydWUsXG4gICAgICBoZWlnaHQsXG4gICAgICBwYWRkaW5nLFxuICAgICAgdGhlbWVcbiAgICB9KSk7XG4gICAgY2hhcnQubGVnZW5kKGZhbHNlKTtcbiAgICBjaGFydC5hbmltYXRlKGZhbHNlKTtcbiAgICBjaGFydC50b29sdGlwKGZhbHNlKTtcbiAgICBjaGFydC5jb29yZGluYXRlKCdwb2xhcicsIHtcbiAgICAgIHN0YXJ0QW5nbGU6ICgtOSAvIDgpICogTWF0aC5QSSxcbiAgICAgIGVuZEFuZ2xlOiAoMSAvIDgpICogTWF0aC5QSSxcbiAgICAgIHJhZGl1czogMC43NVxuICAgIH0pO1xuICAgIGNoYXJ0LnNjYWxlKCd2YWx1ZScsIHtcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMTAwLFxuICAgICAgbmljZTogdHJ1ZSxcbiAgICAgIHRpY2tDb3VudDogNlxuICAgIH0pO1xuICAgIGNoYXJ0LmF4aXMoJzEnLCBmYWxzZSk7XG4gICAgY2hhcnQuYXhpcygndmFsdWUnLCB7XG4gICAgICBsaW5lOiBudWxsLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgb2Zmc2V0OiAtMTQsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0XG4gICAgICB9LFxuICAgICAgdGlja0xpbmU6IG51bGwsXG4gICAgICBncmlkOiBudWxsXG4gICAgfSk7XG4gICAgY2hhcnQucG9pbnQoKS5wb3NpdGlvbigndmFsdWUqMScpLnNoYXBlKCdwb2ludGVyJyk7XG5cbiAgICB0aGlzLnJlYWR5Lm5leHQoY2hhcnQpO1xuXG4gICAgdGhpcy5jaGFuZ2VEYXRhKCk7XG5cbiAgICBjaGFydC5yZW5kZXIoKTtcbiAgfVxuXG4gIGNoYW5nZURhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgeyBfY2hhcnQsIHBlcmNlbnQsIGNvbG9yLCBiZ0NvbG9yLCB0aXRsZSB9ID0gdGhpcztcbiAgICBpZiAoIV9jaGFydCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGF0YSA9IFt7IG5hbWU6IHRpdGxlLCB2YWx1ZTogcGVyY2VudCB9XTtcbiAgICBjb25zdCB2YWwgPSBkYXRhWzBdLnZhbHVlO1xuICAgIF9jaGFydC5hbm5vdGF0aW9uKCkuY2xlYXIodHJ1ZSk7XG4gICAgX2NoYXJ0Lmdlb21ldHJpZXNbMF0uY29sb3IoY29sb3IpO1xuICAgIC8vIOe7mOWItuS7quihqOebmOiDjOaZr1xuICAgIF9jaGFydC5hbm5vdGF0aW9uKCkuYXJjKHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBzdGFydDogWzAsIDAuOTVdLFxuICAgICAgZW5kOiBbMTAwLCAwLjk1XSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHN0cm9rZTogYmdDb2xvcixcbiAgICAgICAgbGluZVdpZHRoOiAxMixcbiAgICAgICAgbGluZURhc2g6IG51bGxcbiAgICAgIH1cbiAgICB9KTtcbiAgICBfY2hhcnQuYW5ub3RhdGlvbigpLmFyYyh7XG4gICAgICBzdGFydDogWzAsIDAuOTVdLFxuICAgICAgZW5kOiBbZGF0YVswXS52YWx1ZSEsIDAuOTVdLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgc3Ryb2tlOiBjb2xvcixcbiAgICAgICAgbGluZVdpZHRoOiAxMixcbiAgICAgICAgbGluZURhc2g6IG51bGxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF9jaGFydC5hbm5vdGF0aW9uKCkudGV4dCh7XG4gICAgICBwb3NpdGlvbjogWyc1MCUnLCAnODUlJ10sXG4gICAgICBjb250ZW50OiB0aXRsZSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgZmlsbDogdGhpcy50aGVtZSA9PT0gJ2RhcmsnID8gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC40MyknIDogJ3JnYmEoMCwgMCwgMCwgMC40MyknLFxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICB9XG4gICAgfSk7XG4gICAgX2NoYXJ0LmFubm90YXRpb24oKS50ZXh0KHtcbiAgICAgIHBvc2l0aW9uOiBbJzUwJScsICc5MCUnXSxcbiAgICAgIGNvbnRlbnQ6IGAke3ZhbH0gJWAsXG4gICAgICBzdHlsZToge1xuICAgICAgICBmb250U2l6ZTogMjAsXG4gICAgICAgIGZpbGw6IHRoaXMudGhlbWUgPT09ICdkYXJrJyA/ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJyA6ICdyZ2JhKDAsIDAsIDAsIDAuODUpJyxcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgfSxcbiAgICAgIG9mZnNldFk6IDE1XG4gICAgfSk7XG5cbiAgICBfY2hhcnQuY2hhbmdlRGF0YShkYXRhKTtcbiAgfVxufVxuIl19