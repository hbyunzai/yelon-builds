import { TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOptions } from 'ng-zorro-antd/modal';
import * as i0 from "@angular/core";
export interface ModalHelperOptions {
    /** 大小；例如：lg、600、80%，默认：`lg` */
    size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number | string;
    /** 对话框 [ModalOptions](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/modal/modal-types.ts) 参数 */
    modalOptions?: ModalOptions;
    /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
    exact?: boolean;
    /** 是否包裹标签页，修复模态包含标签间距问题 */
    includeTabs?: boolean;
    /**
     * 是否支持拖动，默认是通过标题来触发
     */
    drag?: ModalHelperDragOptions | boolean;
    /**
     * 是否强制使用 `nzData` 传递参数，若为 `false` 表示参数会直接映射到组件实例中，其他值只能通过 `NZ_MODAL_DATA` 的方式来获取参数，默认：`false`
     */
    useNzData?: boolean;
    /**
     * 设置焦点按钮
     */
    focus?: 'ok' | 'cancel';
}
export interface ModalHelperDragOptions {
    /**
     * 指定拖地区域的类名，若指定为 `null` 时表示整个对话框，默认：`.modal-header, .ant-modal-title`
     */
    handleCls?: string | null;
}
/**
 * 对话框辅助类
 */
export declare class ModalHelper {
    private readonly srv;
    private readonly drag;
    private readonly doc;
    private createDragRef;
    /**
     * 构建一个对话框
     *
     * @param comp 组件
     * @param params 组件参数
     * @param options 额外参数
     *
     * @example
     * this.modalHelper.create(FormEditComponent, { i }).subscribe(res => this.load());
     * // 对于组件的成功&关闭的处理说明
     * // 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
     * this.nzModalRef.close(data);
     * this.nzModalRef.close();
     * // 关闭
     * this.nzModalRef.destroy();
     */
    create(comp?: TemplateRef<any> | Type<any> | 'confirm' | 'info' | 'success' | 'error' | 'warning', params?: any | ModalHelperOptions | null, options?: ModalHelperOptions): Observable<any>;
    /**
     * 构建静态框，点击蒙层不允许关闭
     *
     * @param comp 组件
     * @param params 组件参数
     * @param options 额外参数
     *
     * @example
     * this.modalHelper.open(FormEditComponent, { i }).subscribe(res => this.load());
     * // 对于组件的成功&关闭的处理说明
     * // 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
     * this.nzModalRef.close(data);
     * this.nzModalRef.close();
     * // 关闭
     * this.nzModalRef.destroy();
     */
    createStatic(comp: TemplateRef<any> | Type<any>, params?: any, options?: ModalHelperOptions): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalHelper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalHelper>;
}
