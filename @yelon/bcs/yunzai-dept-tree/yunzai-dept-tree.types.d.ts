import { SFSchema } from '@yelon/form';
export interface YunzaiDeptTree {
    children: YunzaiDeptTree[];
    icon: string;
    key: string;
    title: string;
    value: string;
}
export interface YunzaiDeptTreeProps {
    multiple?: boolean;
    wrap?: boolean;
    expand?: boolean;
    types?: YUNZAI_DEPT_TYPES[];
    grade?: boolean;
    gradeId?: string;
    class?: boolean;
    historyClass?: boolean;
    data?: YunzaiDeptTree[];
}
export interface YunzaiDeptTreeState {
    loading: boolean;
    schema: SFSchema;
    data: YunzaiDeptTree[];
    dataBackup: YunzaiDeptTree[];
    expandKeys: string[];
}
export declare enum YUNZAI_DEPT_TYPES {
    DEPT = 2,
    CLASS = "class"
}
