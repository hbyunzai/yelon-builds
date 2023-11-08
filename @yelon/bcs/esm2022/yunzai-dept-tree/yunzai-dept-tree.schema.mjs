import { of } from 'rxjs';
export function generateSchema(ic, ich, gra, data) {
    let schema = {
        properties: {
            search: {
                title: 'search',
                type: 'string',
                ui: {
                    i18n: 'input.search',
                    widget: 'string'
                }
            }
        }
    };
    if (ic) {
        schema.properties = Object.defineProperty(schema.properties, 'includeCLass', {
            value: {
                title: 'includeClass',
                type: 'boolean',
                enum: [
                    { label: 'true', value: true },
                    { label: 'false', value: false }
                ],
                default: true,
                ui: {
                    i18n: 'radio.class',
                    widget: 'radio'
                }
            },
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
    if (ich) {
        schema.properties = Object.defineProperty(schema.properties, 'includeClassHistory', {
            value: {
                title: 'includeClassHistory',
                type: 'boolean',
                enum: [
                    { label: 'true', value: true },
                    { label: 'false', value: false }
                ],
                default: true,
                ui: {
                    i18n: 'radio.history',
                    widget: 'radio'
                }
            },
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
    if (gra) {
        schema.properties = Object.defineProperty(schema.properties, 'gradeId', {
            value: {
                title: 'gradeId',
                type: 'string',
                ui: {
                    i18n: 'grade',
                    widget: 'select',
                    asyncData: () => data || of([])
                }
            },
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
    return schema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlcHQtdHJlZS5zY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWRlcHQtdHJlZS95dW56YWktZGVwdC10cmVlLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSXRDLE1BQU0sVUFBVSxjQUFjLENBQzVCLEVBQVcsRUFDWCxHQUFZLEVBQ1osR0FBWSxFQUNaLElBQXFDO0lBRXJDLElBQUksTUFBTSxHQUFhO1FBQ3JCLFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjthQUNGO1NBQ0Y7S0FDRixDQUFDO0lBQ0YsSUFBSSxFQUFFLEVBQUU7UUFDTixNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUU7WUFDM0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxjQUFjO2dCQUNyQixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUU7b0JBQ0osRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzlCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2lCQUNqQztnQkFDRCxPQUFPLEVBQUUsSUFBSTtnQkFDYixFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLE1BQU0sRUFBRSxPQUFPO2lCQUNoQjthQUNGO1lBQ0QsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7S0FDSjtJQUNELElBQUksR0FBRyxFQUFFO1FBQ1AsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUscUJBQXFCLEVBQUU7WUFDbEYsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRTtvQkFDSixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDOUIsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7aUJBQ2pDO2dCQUNELE9BQU8sRUFBRSxJQUFJO2dCQUNiLEVBQUUsRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsTUFBTSxFQUFFLE9BQU87aUJBQ2hCO2FBQ0Y7WUFDRCxZQUFZLEVBQUUsSUFBSTtZQUNsQixVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztLQUNKO0lBQ0QsSUFBSSxHQUFHLEVBQUU7UUFDUCxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDdEUsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLE9BQU87b0JBQ2IsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDaEM7YUFDVTtZQUNiLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU0ZTY2hlbWEsIFNGU2NoZW1hRW51bVR5cGUgfSBmcm9tICdAeWVsb24vZm9ybSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNjaGVtYShcbiAgaWM6IGJvb2xlYW4sXG4gIGljaDogYm9vbGVhbixcbiAgZ3JhOiBib29sZWFuLFxuICBkYXRhPzogT2JzZXJ2YWJsZTxTRlNjaGVtYUVudW1UeXBlW10+XG4pOiBTRlNjaGVtYSB7XG4gIGxldCBzY2hlbWE6IFNGU2NoZW1hID0ge1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICB0aXRsZTogJ3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICB1aToge1xuICAgICAgICAgIGkxOG46ICdpbnB1dC5zZWFyY2gnLFxuICAgICAgICAgIHdpZGdldDogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgaWYgKGljKSB7XG4gICAgc2NoZW1hLnByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NoZW1hLnByb3BlcnRpZXMsICdpbmNsdWRlQ0xhc3MnLCB7XG4gICAgICB2YWx1ZToge1xuICAgICAgICB0aXRsZTogJ2luY2x1ZGVDbGFzcycsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZW51bTogW1xuICAgICAgICAgIHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfVxuICAgICAgICBdLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB1aToge1xuICAgICAgICAgIGkxOG46ICdyYWRpby5jbGFzcycsXG4gICAgICAgICAgd2lkZ2V0OiAncmFkaW8nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpZiAoaWNoKSB7XG4gICAgc2NoZW1hLnByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NoZW1hLnByb3BlcnRpZXMsICdpbmNsdWRlQ2xhc3NIaXN0b3J5Jywge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgdGl0bGU6ICdpbmNsdWRlQ2xhc3NIaXN0b3J5JyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBlbnVtOiBbXG4gICAgICAgICAgeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgIHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9XG4gICAgICAgIF0sXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIHVpOiB7XG4gICAgICAgICAgaTE4bjogJ3JhZGlvLmhpc3RvcnknLFxuICAgICAgICAgIHdpZGdldDogJ3JhZGlvJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaWYgKGdyYSkge1xuICAgIHNjaGVtYS5wcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjaGVtYS5wcm9wZXJ0aWVzLCAnZ3JhZGVJZCcsIHtcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIHRpdGxlOiAnZ3JhZGVJZCcsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICB1aToge1xuICAgICAgICAgIGkxOG46ICdncmFkZScsXG4gICAgICAgICAgd2lkZ2V0OiAnc2VsZWN0JyxcbiAgICAgICAgICBhc3luY0RhdGE6ICgpID0+IGRhdGEgfHwgb2YoW10pXG4gICAgICAgIH1cbiAgICAgIH0gYXMgU0ZTY2hlbWEsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gc2NoZW1hO1xufVxuIl19