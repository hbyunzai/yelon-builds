export const YUNZAIDEFAULTVAR = 'yunzai-default-vars';
export const DEFAULT_COLORS = [
    {
        key: 'dust',
        color: '#F5222D'
    },
    {
        key: 'volcano',
        color: '#FA541C'
    },
    {
        key: 'sunset',
        color: '#FAAD14'
    },
    {
        key: 'cyan',
        color: '#13C2C2'
    },
    {
        key: 'green',
        color: '#52C41A'
    },
    {
        key: 'daybreak',
        color: '#1890ff'
    },
    {
        key: 'geekblue',
        color: '#2F54EB'
    },
    {
        key: 'purple',
        color: '#722ED1'
    },
    {
        key: 'black',
        color: '#001529'
    }
];
export const DEFAULT_VARS = {
    'primary-color': { label: '主颜色', type: 'color', default: '#1890ff' },
    'yunzai-default-header-hg': {
        label: '高',
        type: 'px',
        default: '64px',
        max: 300,
        min: 24
    },
    'yunzai-default-header-bg': {
        label: '背景色',
        type: 'color',
        default: '@primary-color',
        tip: '默认同主色系'
    },
    'yunzai-default-header-padding': {
        label: '顶部左右内边距',
        type: 'px',
        default: '16px'
    },
    // 侧边栏
    'yunzai-default-aside-wd': { label: '宽度', type: 'px', default: '200px' },
    'yunzai-default-aside-bg': {
        label: '背景',
        type: 'color',
        default: '#ffffff'
    },
    'yunzai-default-aside-collapsed-wd': {
        label: '收缩宽度',
        type: 'px',
        default: '64px'
    },
    'yunzai-default-aside-nav-padding-top-bottom': {
        label: '项上下内边距',
        type: 'px',
        default: '8px',
        step: 8
    },
    // 主菜单
    'yunzai-default-aside-nav-fs': {
        label: '菜单字号',
        type: 'px',
        default: '14px',
        min: 14,
        max: 30
    },
    'yunzai-default-aside-collapsed-nav-fs': {
        label: '收缩菜单字号',
        type: 'px',
        default: '24px',
        min: 24,
        max: 32
    },
    'yunzai-default-aside-nav-item-height': {
        label: '菜单项高度',
        type: 'px',
        default: '38px',
        min: 24,
        max: 64
    },
    'yunzai-default-aside-nav-text-color': {
        label: '菜单文本颜色',
        type: 'color',
        default: 'rgba(0, 0, 0, 0.65)',
        rgba: true
    },
    'yunzai-default-aside-nav-text-hover-color': {
        label: '菜单文本悬停颜色',
        type: 'color',
        default: '@primary-color',
        tip: '默认同主色系'
    },
    'yunzai-default-aside-nav-group-text-color': {
        label: '菜单分组文本颜色',
        type: 'color',
        default: 'rgba(0, 0, 0, 0.43)',
        rgba: true
    },
    'yunzai-default-aside-nav-selected-text-color': {
        label: '菜单激活时文本颜色',
        type: 'color',
        default: '@primary-color',
        tip: '默认同主色系'
    },
    'yunzai-default-aside-nav-selected-bg': {
        label: '菜单激活时背景颜色',
        type: 'color',
        default: '#fcfcfc'
    },
    // 内容
    'yunzai-default-content-bg': {
        label: '背景色',
        type: 'color',
        default: '#f5f7fa'
    },
    'yunzai-default-content-heading-bg': {
        label: '标题背景色',
        type: 'color',
        default: '#fafbfc'
    },
    'yunzai-default-content-heading-border': {
        label: '标题底部边框色',
        type: 'color',
        default: '#efe3e5'
    },
    'yunzai-default-content-padding': {
        label: '内边距',
        type: 'px',
        default: '24px',
        min: 0,
        max: 128,
        step: 8
    },
    // zorro组件修正
    'form-state-visual-feedback-enabled': {
        label: '开启表单元素的视觉反馈',
        type: 'switch',
        default: true
    },
    'preserve-white-spaces-enabled': {
        label: '开启 preserveWhitespaces',
        type: 'switch',
        default: true
    },
    'nz-table-img-radius': {
        label: '表格中：图片圆角',
        type: 'px',
        default: '4px',
        min: 0,
        max: 128
    },
    'nz-table-img-margin-right': {
        label: '表格中：图片右外边距',
        type: 'px',
        default: '4px',
        min: 0,
        max: 128
    },
    'nz-table-img-max-width': {
        label: '表格中：图片最大宽度',
        type: 'px',
        default: '32px',
        min: 8,
        max: 128
    },
    'nz-table-img-max-height': {
        label: '表格中：图片最大高度',
        type: 'px',
        default: '32px',
        min: 8,
        max: 128
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy1kcmF3ZXIudHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zZXR0aW5nLWRyYXdlci9zZXR0aW5nLWRyYXdlci50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDNUI7UUFDRSxHQUFHLEVBQUUsTUFBTTtRQUNYLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsU0FBUztRQUNkLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsUUFBUTtRQUNiLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsTUFBTTtRQUNYLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsT0FBTztRQUNaLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsVUFBVTtRQUNmLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsVUFBVTtRQUNmLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsUUFBUTtRQUNiLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsT0FBTztRQUNaLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0NBQ0YsQ0FBQztBQUNGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBaUM7SUFDeEQsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7SUFDcEUsMEJBQTBCLEVBQUU7UUFDMUIsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxNQUFNO1FBQ2YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsRUFBRTtLQUNSO0lBQ0QsMEJBQTBCLEVBQUU7UUFDMUIsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsR0FBRyxFQUFFLFFBQVE7S0FDZDtJQUNELCtCQUErQixFQUFFO1FBQy9CLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLE1BQU07S0FDaEI7SUFDRCxNQUFNO0lBQ04seUJBQXlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtJQUN4RSx5QkFBeUIsRUFBRTtRQUN6QixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxtQ0FBbUMsRUFBRTtRQUNuQyxLQUFLLEVBQUUsTUFBTTtRQUNiLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLE1BQU07S0FDaEI7SUFDRCw2Q0FBNkMsRUFBRTtRQUM3QyxLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUUsQ0FBQztLQUNSO0lBQ0QsTUFBTTtJQUNOLDZCQUE2QixFQUFFO1FBQzdCLEtBQUssRUFBRSxNQUFNO1FBQ2IsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsTUFBTTtRQUNmLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7S0FDUjtJQUNELHVDQUF1QyxFQUFFO1FBQ3ZDLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsTUFBTTtRQUNmLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7S0FDUjtJQUNELHNDQUFzQyxFQUFFO1FBQ3RDLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsTUFBTTtRQUNmLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7S0FDUjtJQUNELHFDQUFxQyxFQUFFO1FBQ3JDLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCwyQ0FBMkMsRUFBRTtRQUMzQyxLQUFLLEVBQUUsVUFBVTtRQUNqQixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsR0FBRyxFQUFFLFFBQVE7S0FDZDtJQUNELDJDQUEyQyxFQUFFO1FBQzNDLEtBQUssRUFBRSxVQUFVO1FBQ2pCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsOENBQThDLEVBQUU7UUFDOUMsS0FBSyxFQUFFLFdBQVc7UUFDbEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLEdBQUcsRUFBRSxRQUFRO0tBQ2Q7SUFDRCxzQ0FBc0MsRUFBRTtRQUN0QyxLQUFLLEVBQUUsV0FBVztRQUNsQixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsS0FBSztJQUNMLDJCQUEyQixFQUFFO1FBQzNCLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELG1DQUFtQyxFQUFFO1FBQ25DLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELHVDQUF1QyxFQUFFO1FBQ3ZDLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxnQ0FBZ0MsRUFBRTtRQUNoQyxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLE1BQU07UUFDZixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLENBQUM7S0FDUjtJQUNELFlBQVk7SUFDWixvQ0FBb0MsRUFBRTtRQUNwQyxLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCwrQkFBK0IsRUFBRTtRQUMvQixLQUFLLEVBQUUsd0JBQXdCO1FBQy9CLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLEtBQUssRUFBRSxVQUFVO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxHQUFHO0tBQ1Q7SUFDRCwyQkFBMkIsRUFBRTtRQUMzQixLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsR0FBRztLQUNUO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDeEIsS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsTUFBTTtRQUNmLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLEdBQUc7S0FDVDtJQUNELHlCQUF5QixFQUFFO1FBQ3pCLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLE1BQU07UUFDZixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxHQUFHO0tBQ1Q7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgWVVOWkFJREVGQVVMVFZBUiA9ICd5dW56YWktZGVmYXVsdC12YXJzJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTE9SUyA9IFtcbiAge1xuICAgIGtleTogJ2R1c3QnLFxuICAgIGNvbG9yOiAnI0Y1MjIyRCdcbiAgfSxcbiAge1xuICAgIGtleTogJ3ZvbGNhbm8nLFxuICAgIGNvbG9yOiAnI0ZBNTQxQydcbiAgfSxcbiAge1xuICAgIGtleTogJ3N1bnNldCcsXG4gICAgY29sb3I6ICcjRkFBRDE0J1xuICB9LFxuICB7XG4gICAga2V5OiAnY3lhbicsXG4gICAgY29sb3I6ICcjMTNDMkMyJ1xuICB9LFxuICB7XG4gICAga2V5OiAnZ3JlZW4nLFxuICAgIGNvbG9yOiAnIzUyQzQxQSdcbiAgfSxcbiAge1xuICAgIGtleTogJ2RheWJyZWFrJyxcbiAgICBjb2xvcjogJyMxODkwZmYnXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdnZWVrYmx1ZScsXG4gICAgY29sb3I6ICcjMkY1NEVCJ1xuICB9LFxuICB7XG4gICAga2V5OiAncHVycGxlJyxcbiAgICBjb2xvcjogJyM3MjJFRDEnXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdibGFjaycsXG4gICAgY29sb3I6ICcjMDAxNTI5J1xuICB9XG5dO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVkFSUzogeyBba2V5OiBzdHJpbmddOiBOelNhZmVBbnkgfSA9IHtcbiAgJ3ByaW1hcnktY29sb3InOiB7IGxhYmVsOiAn5Li76aKc6ImyJywgdHlwZTogJ2NvbG9yJywgZGVmYXVsdDogJyMxODkwZmYnIH0sXG4gICd5dW56YWktZGVmYXVsdC1oZWFkZXItaGcnOiB7XG4gICAgbGFiZWw6ICfpq5gnLFxuICAgIHR5cGU6ICdweCcsXG4gICAgZGVmYXVsdDogJzY0cHgnLFxuICAgIG1heDogMzAwLFxuICAgIG1pbjogMjRcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWhlYWRlci1iZyc6IHtcbiAgICBsYWJlbDogJ+iDjOaZr+iJsicsXG4gICAgdHlwZTogJ2NvbG9yJyxcbiAgICBkZWZhdWx0OiAnQHByaW1hcnktY29sb3InLFxuICAgIHRpcDogJ+m7mOiupOWQjOS4u+iJsuezuydcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWhlYWRlci1wYWRkaW5nJzoge1xuICAgIGxhYmVsOiAn6aG26YOo5bem5Y+z5YaF6L656LedJyxcbiAgICB0eXBlOiAncHgnLFxuICAgIGRlZmF1bHQ6ICcxNnB4J1xuICB9LFxuICAvLyDkvqfovrnmoI9cbiAgJ3l1bnphaS1kZWZhdWx0LWFzaWRlLXdkJzogeyBsYWJlbDogJ+WuveW6picsIHR5cGU6ICdweCcsIGRlZmF1bHQ6ICcyMDBweCcgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWFzaWRlLWJnJzoge1xuICAgIGxhYmVsOiAn6IOM5pmvJyxcbiAgICB0eXBlOiAnY29sb3InLFxuICAgIGRlZmF1bHQ6ICcjZmZmZmZmJ1xuICB9LFxuICAneXVuemFpLWRlZmF1bHQtYXNpZGUtY29sbGFwc2VkLXdkJzoge1xuICAgIGxhYmVsOiAn5pS257yp5a695bqmJyxcbiAgICB0eXBlOiAncHgnLFxuICAgIGRlZmF1bHQ6ICc2NHB4J1xuICB9LFxuICAneXVuemFpLWRlZmF1bHQtYXNpZGUtbmF2LXBhZGRpbmctdG9wLWJvdHRvbSc6IHtcbiAgICBsYWJlbDogJ+mhueS4iuS4i+WGhei+uei3nScsXG4gICAgdHlwZTogJ3B4JyxcbiAgICBkZWZhdWx0OiAnOHB4JyxcbiAgICBzdGVwOiA4XG4gIH0sXG4gIC8vIOS4u+iPnOWNlVxuICAneXVuemFpLWRlZmF1bHQtYXNpZGUtbmF2LWZzJzoge1xuICAgIGxhYmVsOiAn6I+c5Y2V5a2X5Y+3JyxcbiAgICB0eXBlOiAncHgnLFxuICAgIGRlZmF1bHQ6ICcxNHB4JyxcbiAgICBtaW46IDE0LFxuICAgIG1heDogMzBcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWFzaWRlLWNvbGxhcHNlZC1uYXYtZnMnOiB7XG4gICAgbGFiZWw6ICfmlLbnvKnoj5zljZXlrZflj7cnLFxuICAgIHR5cGU6ICdweCcsXG4gICAgZGVmYXVsdDogJzI0cHgnLFxuICAgIG1pbjogMjQsXG4gICAgbWF4OiAzMlxuICB9LFxuICAneXVuemFpLWRlZmF1bHQtYXNpZGUtbmF2LWl0ZW0taGVpZ2h0Jzoge1xuICAgIGxhYmVsOiAn6I+c5Y2V6aG56auY5bqmJyxcbiAgICB0eXBlOiAncHgnLFxuICAgIGRlZmF1bHQ6ICczOHB4JyxcbiAgICBtaW46IDI0LFxuICAgIG1heDogNjRcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWFzaWRlLW5hdi10ZXh0LWNvbG9yJzoge1xuICAgIGxhYmVsOiAn6I+c5Y2V5paH5pys6aKc6ImyJyxcbiAgICB0eXBlOiAnY29sb3InLFxuICAgIGRlZmF1bHQ6ICdyZ2JhKDAsIDAsIDAsIDAuNjUpJyxcbiAgICByZ2JhOiB0cnVlXG4gIH0sXG4gICd5dW56YWktZGVmYXVsdC1hc2lkZS1uYXYtdGV4dC1ob3Zlci1jb2xvcic6IHtcbiAgICBsYWJlbDogJ+iPnOWNleaWh+acrOaCrOWBnOminOiJsicsXG4gICAgdHlwZTogJ2NvbG9yJyxcbiAgICBkZWZhdWx0OiAnQHByaW1hcnktY29sb3InLFxuICAgIHRpcDogJ+m7mOiupOWQjOS4u+iJsuezuydcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWFzaWRlLW5hdi1ncm91cC10ZXh0LWNvbG9yJzoge1xuICAgIGxhYmVsOiAn6I+c5Y2V5YiG57uE5paH5pys6aKc6ImyJyxcbiAgICB0eXBlOiAnY29sb3InLFxuICAgIGRlZmF1bHQ6ICdyZ2JhKDAsIDAsIDAsIDAuNDMpJyxcbiAgICByZ2JhOiB0cnVlXG4gIH0sXG4gICd5dW56YWktZGVmYXVsdC1hc2lkZS1uYXYtc2VsZWN0ZWQtdGV4dC1jb2xvcic6IHtcbiAgICBsYWJlbDogJ+iPnOWNlea/gOa0u+aXtuaWh+acrOminOiJsicsXG4gICAgdHlwZTogJ2NvbG9yJyxcbiAgICBkZWZhdWx0OiAnQHByaW1hcnktY29sb3InLFxuICAgIHRpcDogJ+m7mOiupOWQjOS4u+iJsuezuydcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWFzaWRlLW5hdi1zZWxlY3RlZC1iZyc6IHtcbiAgICBsYWJlbDogJ+iPnOWNlea/gOa0u+aXtuiDjOaZr+minOiJsicsXG4gICAgdHlwZTogJ2NvbG9yJyxcbiAgICBkZWZhdWx0OiAnI2ZjZmNmYydcbiAgfSxcbiAgLy8g5YaF5a65XG4gICd5dW56YWktZGVmYXVsdC1jb250ZW50LWJnJzoge1xuICAgIGxhYmVsOiAn6IOM5pmv6ImyJyxcbiAgICB0eXBlOiAnY29sb3InLFxuICAgIGRlZmF1bHQ6ICcjZjVmN2ZhJ1xuICB9LFxuICAneXVuemFpLWRlZmF1bHQtY29udGVudC1oZWFkaW5nLWJnJzoge1xuICAgIGxhYmVsOiAn5qCH6aKY6IOM5pmv6ImyJyxcbiAgICB0eXBlOiAnY29sb3InLFxuICAgIGRlZmF1bHQ6ICcjZmFmYmZjJ1xuICB9LFxuICAneXVuemFpLWRlZmF1bHQtY29udGVudC1oZWFkaW5nLWJvcmRlcic6IHtcbiAgICBsYWJlbDogJ+agh+mimOW6lemDqOi+ueahhuiJsicsXG4gICAgdHlwZTogJ2NvbG9yJyxcbiAgICBkZWZhdWx0OiAnI2VmZTNlNSdcbiAgfSxcbiAgJ3l1bnphaS1kZWZhdWx0LWNvbnRlbnQtcGFkZGluZyc6IHtcbiAgICBsYWJlbDogJ+WGhei+uei3nScsXG4gICAgdHlwZTogJ3B4JyxcbiAgICBkZWZhdWx0OiAnMjRweCcsXG4gICAgbWluOiAwLFxuICAgIG1heDogMTI4LFxuICAgIHN0ZXA6IDhcbiAgfSxcbiAgLy8gem9ycm/nu4Tku7bkv67mraNcbiAgJ2Zvcm0tc3RhdGUtdmlzdWFsLWZlZWRiYWNrLWVuYWJsZWQnOiB7XG4gICAgbGFiZWw6ICflvIDlkK/ooajljZXlhYPntKDnmoTop4bop4nlj43ppognLFxuICAgIHR5cGU6ICdzd2l0Y2gnLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgJ3ByZXNlcnZlLXdoaXRlLXNwYWNlcy1lbmFibGVkJzoge1xuICAgIGxhYmVsOiAn5byA5ZCvIHByZXNlcnZlV2hpdGVzcGFjZXMnLFxuICAgIHR5cGU6ICdzd2l0Y2gnLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgJ256LXRhYmxlLWltZy1yYWRpdXMnOiB7XG4gICAgbGFiZWw6ICfooajmoLzkuK3vvJrlm77niYflnIbop5InLFxuICAgIHR5cGU6ICdweCcsXG4gICAgZGVmYXVsdDogJzRweCcsXG4gICAgbWluOiAwLFxuICAgIG1heDogMTI4XG4gIH0sXG4gICduei10YWJsZS1pbWctbWFyZ2luLXJpZ2h0Jzoge1xuICAgIGxhYmVsOiAn6KGo5qC85Lit77ya5Zu+54mH5Y+z5aSW6L656LedJyxcbiAgICB0eXBlOiAncHgnLFxuICAgIGRlZmF1bHQ6ICc0cHgnLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDEyOFxuICB9LFxuICAnbnotdGFibGUtaW1nLW1heC13aWR0aCc6IHtcbiAgICBsYWJlbDogJ+ihqOagvOS4re+8muWbvueJh+acgOWkp+WuveW6picsXG4gICAgdHlwZTogJ3B4JyxcbiAgICBkZWZhdWx0OiAnMzJweCcsXG4gICAgbWluOiA4LFxuICAgIG1heDogMTI4XG4gIH0sXG4gICduei10YWJsZS1pbWctbWF4LWhlaWdodCc6IHtcbiAgICBsYWJlbDogJ+ihqOagvOS4re+8muWbvueJh+acgOWkp+mrmOW6picsXG4gICAgdHlwZTogJ3B4JyxcbiAgICBkZWZhdWx0OiAnMzJweCcsXG4gICAgbWluOiA4LFxuICAgIG1heDogMTI4XG4gIH1cbn07XG4iXX0=