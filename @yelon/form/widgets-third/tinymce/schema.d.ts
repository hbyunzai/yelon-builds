import type { SFUISchemaItem } from '@yelon/form';
export interface TinymceWidgetSchema extends SFUISchemaItem {
    /** 默认配置项，对全局 Tinymce 有效 */
    config?: Record<string, unknown>;
    inline?: boolean;
    /** 延迟加载（单位：毫秒），默认：`0` */
    delay?: number;
    loading?: string;
    ready?: (instance: any) => void;
}
