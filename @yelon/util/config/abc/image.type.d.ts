import type { ModalOptions } from 'ng-zorro-antd/modal';
export interface YunzaiImageConfig {
    /**
     * 默认大小，默认值：`64`，单位：px
     */
    size?: number;
    /**
     * 错误图片，默认：`./assets/img/logo.svg`
     */
    error?: string;
    /**
     * 预览大图对话框参数
     */
    previewModalOptions?: ModalOptions;
}
