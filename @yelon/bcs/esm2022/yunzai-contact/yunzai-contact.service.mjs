import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { YUNZAI_DEPT_TYPES } from '@yelon/bcs/yunzai-dept-tree';
import { YunzaiContactComponent } from './yunzai-contact.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
export class YunzaiContactService {
    constructor(modal) {
        this.modal = modal;
    }
    create(nzOnOk, param = {
        props: {
            wrap: false,
            disableFriendGroup: false,
            disableDormitoryTree: false,
            disableDeptTree: false,
            disableRoleTree: false
        },
        deptTree: {
            multiple: false,
            wrap: false,
            expand: true,
            class: true,
            historyClass: true,
            grade: true,
            types: [YUNZAI_DEPT_TYPES.DEPT, YUNZAI_DEPT_TYPES.CLASS]
        },
        dormitoryTree: {
            multiple: false,
            wrap: false,
            expand: true
        },
        roleTree: {
            wrap: false,
            expand: true,
            multiple: false
        },
        friendGroup: {
            wrap: false
        },
        tableUser: {
            wrap: false,
            filteredColumns: [],
            page: {
                pageNum: 1,
                pageSize: 20,
                pageParam: {}
            },
            customColumns: [],
            list: true,
            check: {
                pageCheck: true,
                disable: false,
                data: []
            }
        }
    }) {
        let value = [];
        const contactComponent = this.modal
            .create({
            nzTitle: '人员选择',
            nzContent: YunzaiContactComponent,
            nzClassName: 'yz-select-contacts-modal',
            nzWidth: 1200,
            nzData: param,
            nzOnOk: () => lastValueFrom(nzOnOk(value))
        })
            .getContentComponent();
        contactComponent.deptTree = param.deptTree;
        contactComponent.props = param.props;
        contactComponent.roleTree = param.roleTree;
        contactComponent.dormitoryTree = param.dormitoryTree;
        contactComponent.friendGroup = param.friendGroup;
        contactComponent.tableUser = param.tableUser;
        contactComponent.onSelect.subscribe(users => (value = users));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiContactService, deps: [{ token: i1.NzModalService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiContactService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: YunzaiContactService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.NzModalService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWNvbnRhY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jjcy95dW56YWktY29udGFjdC95dW56YWktY29udGFjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUloRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBTXBFLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBb0IsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFBRyxDQUFDO0lBRTdDLE1BQU0sQ0FDSixNQUF5RCxFQUN6RCxRQUE0QjtRQUMxQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsb0JBQW9CLEVBQUUsS0FBSztZQUMzQixlQUFlLEVBQUUsS0FBSztZQUN0QixlQUFlLEVBQUUsS0FBSztTQUN2QjtRQUNELFFBQVEsRUFBRTtZQUNSLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxJQUFJO1lBQ1gsWUFBWSxFQUFFLElBQUk7WUFDbEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1NBQ3pEO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FDaEI7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsS0FBSztTQUNaO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLEtBQUs7WUFDWCxlQUFlLEVBQUUsRUFBRTtZQUNuQixJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLEVBQUU7YUFDZDtZQUNELGFBQWEsRUFBRSxFQUFFO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRjtLQUNGO1FBRUQsSUFBSSxLQUFLLEdBQXNCLEVBQUUsQ0FBQztRQUNsQyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLO2FBQ2hDLE1BQU0sQ0FBeUI7WUFDOUIsT0FBTyxFQUFFLE1BQU07WUFDZixTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDLENBQUM7YUFDRCxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pCLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQzNDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQzNDLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3JELGdCQUFnQixDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ2pELGdCQUFnQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzdDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7OEdBdkVVLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07OzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBsYXN0VmFsdWVGcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFlVTlpBSV9ERVBUX1RZUEVTIH0gZnJvbSAnQHllbG9uL2Jjcy95dW56YWktZGVwdC10cmVlJztcbmltcG9ydCB7IFl1bnphaVRhYmxlVXNlciB9IGZyb20gJ0B5ZWxvbi9iY3MveXVuemFpLXRhYmxlLXVzZXInO1xuaW1wb3J0IHsgTnpNb2RhbFNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21vZGFsJztcblxuaW1wb3J0IHsgWXVuemFpQ29udGFjdENvbXBvbmVudCB9IGZyb20gJy4veXVuemFpLWNvbnRhY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFl1bnphaUNvbnRhY3RQYXJhbSB9IGZyb20gJy4veXVuemFpLWNvbnRhY3QudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBZdW56YWlDb250YWN0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWw6IE56TW9kYWxTZXJ2aWNlKSB7fVxuXG4gIGNyZWF0ZShcbiAgICBuek9uT2s6ICh1c2VyczogWXVuemFpVGFibGVVc2VyW10pID0+IE9ic2VydmFibGU8Ym9vbGVhbj4sXG4gICAgcGFyYW06IFl1bnphaUNvbnRhY3RQYXJhbSA9IHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHdyYXA6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlRnJpZW5kR3JvdXA6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlRG9ybWl0b3J5VHJlZTogZmFsc2UsXG4gICAgICAgIGRpc2FibGVEZXB0VHJlZTogZmFsc2UsXG4gICAgICAgIGRpc2FibGVSb2xlVHJlZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBkZXB0VHJlZToge1xuICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgIHdyYXA6IGZhbHNlLFxuICAgICAgICBleHBhbmQ6IHRydWUsXG4gICAgICAgIGNsYXNzOiB0cnVlLFxuICAgICAgICBoaXN0b3J5Q2xhc3M6IHRydWUsXG4gICAgICAgIGdyYWRlOiB0cnVlLFxuICAgICAgICB0eXBlczogW1lVTlpBSV9ERVBUX1RZUEVTLkRFUFQsIFlVTlpBSV9ERVBUX1RZUEVTLkNMQVNTXVxuICAgICAgfSxcbiAgICAgIGRvcm1pdG9yeVRyZWU6IHtcbiAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICB3cmFwOiBmYWxzZSxcbiAgICAgICAgZXhwYW5kOiB0cnVlXG4gICAgICB9LFxuICAgICAgcm9sZVRyZWU6IHtcbiAgICAgICAgd3JhcDogZmFsc2UsXG4gICAgICAgIGV4cGFuZDogdHJ1ZSxcbiAgICAgICAgbXVsdGlwbGU6IGZhbHNlXG4gICAgICB9LFxuICAgICAgZnJpZW5kR3JvdXA6IHtcbiAgICAgICAgd3JhcDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB0YWJsZVVzZXI6IHtcbiAgICAgICAgd3JhcDogZmFsc2UsXG4gICAgICAgIGZpbHRlcmVkQ29sdW1uczogW10sXG4gICAgICAgIHBhZ2U6IHtcbiAgICAgICAgICBwYWdlTnVtOiAxLFxuICAgICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgICBwYWdlUGFyYW06IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGN1c3RvbUNvbHVtbnM6IFtdLFxuICAgICAgICBsaXN0OiB0cnVlLFxuICAgICAgICBjaGVjazoge1xuICAgICAgICAgIHBhZ2VDaGVjazogdHJ1ZSxcbiAgICAgICAgICBkaXNhYmxlOiBmYWxzZSxcbiAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICApOiB2b2lkIHtcbiAgICBsZXQgdmFsdWU6IFl1bnphaVRhYmxlVXNlcltdID0gW107XG4gICAgY29uc3QgY29udGFjdENvbXBvbmVudCA9IHRoaXMubW9kYWxcbiAgICAgIC5jcmVhdGU8WXVuemFpQ29udGFjdENvbXBvbmVudD4oe1xuICAgICAgICBuelRpdGxlOiAn5Lq65ZGY6YCJ5oupJyxcbiAgICAgICAgbnpDb250ZW50OiBZdW56YWlDb250YWN0Q29tcG9uZW50LFxuICAgICAgICBuekNsYXNzTmFtZTogJ3l6LXNlbGVjdC1jb250YWN0cy1tb2RhbCcsXG4gICAgICAgIG56V2lkdGg6IDEyMDAsXG4gICAgICAgIG56RGF0YTogcGFyYW0sXG4gICAgICAgIG56T25PazogKCkgPT4gbGFzdFZhbHVlRnJvbShuek9uT2sodmFsdWUpKVxuICAgICAgfSlcbiAgICAgIC5nZXRDb250ZW50Q29tcG9uZW50KCk7XG4gICAgY29udGFjdENvbXBvbmVudC5kZXB0VHJlZSA9IHBhcmFtLmRlcHRUcmVlO1xuICAgIGNvbnRhY3RDb21wb25lbnQucHJvcHMgPSBwYXJhbS5wcm9wcztcbiAgICBjb250YWN0Q29tcG9uZW50LnJvbGVUcmVlID0gcGFyYW0ucm9sZVRyZWU7XG4gICAgY29udGFjdENvbXBvbmVudC5kb3JtaXRvcnlUcmVlID0gcGFyYW0uZG9ybWl0b3J5VHJlZTtcbiAgICBjb250YWN0Q29tcG9uZW50LmZyaWVuZEdyb3VwID0gcGFyYW0uZnJpZW5kR3JvdXA7XG4gICAgY29udGFjdENvbXBvbmVudC50YWJsZVVzZXIgPSBwYXJhbS50YWJsZVVzZXI7XG4gICAgY29udGFjdENvbXBvbmVudC5vblNlbGVjdC5zdWJzY3JpYmUodXNlcnMgPT4gKHZhbHVlID0gdXNlcnMpKTtcbiAgfVxufVxuIl19