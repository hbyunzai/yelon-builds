import type * as _echarts from 'echarts';
export type ChartECharts = _echarts.ECharts;
export type ChartEChartsOption = _echarts.EChartsCoreOption;
export type ChartEChartsEventType = 'ready' | 'init' | 'destroy' | 'set-option';
export interface ChartEChartsEvent {
    type: ChartEChartsEventType;
    chart?: ChartECharts;
    option?: ChartEChartsOption;
}
export interface ChartEChartsOn {
    eventName: string;
    query?: string | object;
    handler: (options: {
        event: any;
        chart: ChartECharts;
    }) => void;
}
