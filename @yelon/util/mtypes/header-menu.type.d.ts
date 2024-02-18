import { NzSafeAny } from 'ng-zorro-antd/core/types';
export interface YunzaiNavTopic {
    attribute: NzSafeAny;
    icon: NzSafeAny;
    children: YunzaiNavTopic[];
    intro: string;
    key: string;
    name: string;
    target: string;
    auth: boolean;
    url: string;
    version: string;
}
