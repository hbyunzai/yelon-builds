export const ST_DEFAULT_CONFIG = {
    pi: 1,
    ps: 10,
    size: 'default',
    responsive: true,
    responsiveHideHeaderFooter: false,
    req: {
        type: 'page',
        method: 'GET',
        allInBody: false,
        lazyLoad: false,
        ignoreParamNull: false,
        reName: { pi: 'pi', ps: 'ps', skip: 'skip', limit: 'limit' }
    },
    res: {
        reName: { list: ['list'], total: ['total'] }
    },
    page: {
        front: true,
        zeroIndexed: false,
        position: 'bottom',
        placement: 'right',
        show: true,
        showSize: false,
        pageSizes: [10, 20, 30, 40, 50],
        showQuickJumper: false,
        total: true,
        toTop: true,
        toTopOffset: 100,
        itemRender: null,
        simple: false
    },
    modal: {
        paramsName: 'record',
        size: 'lg',
        exact: true
    },
    drawer: {
        paramsName: 'record',
        size: 'md',
        footer: true,
        footerHeight: 55
    },
    pop: {
        title: '确认删除吗？',
        trigger: 'click',
        placement: 'top'
    },
    btnIcon: {
        theme: 'outline',
        spin: false
    },
    noIndex: 1,
    expandRowByClick: false,
    expandAccordion: false,
    widthMode: {
        type: 'default',
        strictBehavior: 'truncate'
    },
    virtualItemSize: 54,
    virtualMaxBufferPx: 200,
    virtualMinBufferPx: 100,
    iifBehavior: 'hide',
    loadingDelay: 0,
    safeType: 'safeHtml',
    date: {
        format: `yyyy-MM-dd HH:mm`
    },
    yn: {
        truth: true,
        yes: '是',
        mode: 'icon'
    },
    maxMultipleButton: {
        text: '更多',
        count: 2
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3QuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3N0L3N0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBbUI7SUFDL0MsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsRUFBRTtJQUNOLElBQUksRUFBRSxTQUFTO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFDaEIsMEJBQTBCLEVBQUUsS0FBSztJQUNqQyxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsU0FBUyxFQUFFLEtBQUs7UUFDaEIsUUFBUSxFQUFFLEtBQUs7UUFDZixlQUFlLEVBQUUsS0FBSztRQUN0QixNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO0tBQzdEO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7S0FDN0M7SUFDRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsSUFBSTtRQUNYLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLEtBQUs7UUFDZixTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQy9CLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxXQUFXLEVBQUUsR0FBRztRQUNoQixVQUFVLEVBQUUsSUFBSTtRQUNoQixNQUFNLEVBQUUsS0FBSztLQUNkO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsVUFBVSxFQUFFLFFBQVE7UUFDcEIsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0QsTUFBTSxFQUFFO1FBQ04sVUFBVSxFQUFFLFFBQVE7UUFDcEIsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsSUFBSTtRQUNaLFlBQVksRUFBRSxFQUFFO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRSxLQUFLO0tBQ1o7SUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNWLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixjQUFjLEVBQUUsVUFBVTtLQUMzQjtJQUNELGVBQWUsRUFBRSxFQUFFO0lBQ25CLGtCQUFrQixFQUFFLEdBQUc7SUFDdkIsa0JBQWtCLEVBQUUsR0FBRztJQUN2QixXQUFXLEVBQUUsTUFBTTtJQUNuQixZQUFZLEVBQUUsQ0FBQztJQUNmLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxrQkFBa0I7S0FDM0I7SUFDRCxFQUFFLEVBQUU7UUFDRixLQUFLLEVBQUUsSUFBSTtRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBZdW56YWlTVENvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBTVF9ERUZBVUxUX0NPTkZJRzogWXVuemFpU1RDb25maWcgPSB7XG4gIHBpOiAxLFxuICBwczogMTAsXG4gIHNpemU6ICdkZWZhdWx0JyxcbiAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgcmVzcG9uc2l2ZUhpZGVIZWFkZXJGb290ZXI6IGZhbHNlLFxuICByZXE6IHtcbiAgICB0eXBlOiAncGFnZScsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBhbGxJbkJvZHk6IGZhbHNlLFxuICAgIGxhenlMb2FkOiBmYWxzZSxcbiAgICBpZ25vcmVQYXJhbU51bGw6IGZhbHNlLFxuICAgIHJlTmFtZTogeyBwaTogJ3BpJywgcHM6ICdwcycsIHNraXA6ICdza2lwJywgbGltaXQ6ICdsaW1pdCcgfVxuICB9LFxuICByZXM6IHtcbiAgICByZU5hbWU6IHsgbGlzdDogWydsaXN0J10sIHRvdGFsOiBbJ3RvdGFsJ10gfVxuICB9LFxuICBwYWdlOiB7XG4gICAgZnJvbnQ6IHRydWUsXG4gICAgemVyb0luZGV4ZWQ6IGZhbHNlLFxuICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICBwbGFjZW1lbnQ6ICdyaWdodCcsXG4gICAgc2hvdzogdHJ1ZSxcbiAgICBzaG93U2l6ZTogZmFsc2UsXG4gICAgcGFnZVNpemVzOiBbMTAsIDIwLCAzMCwgNDAsIDUwXSxcbiAgICBzaG93UXVpY2tKdW1wZXI6IGZhbHNlLFxuICAgIHRvdGFsOiB0cnVlLFxuICAgIHRvVG9wOiB0cnVlLFxuICAgIHRvVG9wT2Zmc2V0OiAxMDAsXG4gICAgaXRlbVJlbmRlcjogbnVsbCxcbiAgICBzaW1wbGU6IGZhbHNlXG4gIH0sXG4gIG1vZGFsOiB7XG4gICAgcGFyYW1zTmFtZTogJ3JlY29yZCcsXG4gICAgc2l6ZTogJ2xnJyxcbiAgICBleGFjdDogdHJ1ZVxuICB9LFxuICBkcmF3ZXI6IHtcbiAgICBwYXJhbXNOYW1lOiAncmVjb3JkJyxcbiAgICBzaXplOiAnbWQnLFxuICAgIGZvb3RlcjogdHJ1ZSxcbiAgICBmb290ZXJIZWlnaHQ6IDU1XG4gIH0sXG4gIHBvcDoge1xuICAgIHRpdGxlOiAn56Gu6K6k5Yig6Zmk5ZCX77yfJyxcbiAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgIHBsYWNlbWVudDogJ3RvcCdcbiAgfSxcbiAgYnRuSWNvbjoge1xuICAgIHRoZW1lOiAnb3V0bGluZScsXG4gICAgc3BpbjogZmFsc2VcbiAgfSxcbiAgbm9JbmRleDogMSxcbiAgZXhwYW5kUm93QnlDbGljazogZmFsc2UsXG4gIGV4cGFuZEFjY29yZGlvbjogZmFsc2UsXG4gIHdpZHRoTW9kZToge1xuICAgIHR5cGU6ICdkZWZhdWx0JyxcbiAgICBzdHJpY3RCZWhhdmlvcjogJ3RydW5jYXRlJ1xuICB9LFxuICB2aXJ0dWFsSXRlbVNpemU6IDU0LFxuICB2aXJ0dWFsTWF4QnVmZmVyUHg6IDIwMCxcbiAgdmlydHVhbE1pbkJ1ZmZlclB4OiAxMDAsXG4gIGlpZkJlaGF2aW9yOiAnaGlkZScsXG4gIGxvYWRpbmdEZWxheTogMCxcbiAgc2FmZVR5cGU6ICdzYWZlSHRtbCcsXG4gIGRhdGU6IHtcbiAgICBmb3JtYXQ6IGB5eXl5LU1NLWRkIEhIOm1tYFxuICB9LFxuICB5bjoge1xuICAgIHRydXRoOiB0cnVlLFxuICAgIHllczogJ+aYrycsXG4gICAgbW9kZTogJ2ljb24nXG4gIH0sXG4gIG1heE11bHRpcGxlQnV0dG9uOiB7XG4gICAgdGV4dDogJ+abtOWkmicsXG4gICAgY291bnQ6IDJcbiAgfVxufTtcbiJdfQ==