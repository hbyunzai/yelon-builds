import { TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { NzDrawerOptions, NzDrawerRef } from 'ng-zorro-antd/drawer';
import * as i0 from "@angular/core";
export interface DrawerHelperOptions {
    /**
     * 大小，若值为数值类型，则根据 `nzPlacement` 自动转化为 `nzHeight` 或 `nzWidth`；例如：lg、600，默认：`md`
     *
     * | 类型 | 默认大小 |
     * | --- | ------ |
     * | `sm` | `300` |
     * | `md` | `600` |
     * | `lg` | `900` |
     * | `xl` | `1200` |
     *
     * > 以上值，可通过覆盖相应的LESS参数自行调整
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    /**
     * 是否包含底部工具条，默认：`true`
     */
    footer?: boolean;
    /**
     * 底部工具条高度，默认：`55`
     */
    footerHeight?: number;
    /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
    exact?: boolean;
    /** 抽屉 [NzDrawerOptions](https://ng.ant.design/components/drawer/zh#nzdraweroptions) 参数 */
    drawerOptions?: NzDrawerOptions;
}
/**
 * 抽屉辅助类
 *
 * **注意：** 构建结果都可被订阅，但永远都不会触发 `observer.error`
 *
 * @example
 * this.drawerHelper.create('Edit', FormEditComponent, { i }).subscribe(res => this.load());
 * // 对于组件的成功&关闭的处理说明
 * // 成功
 * this.NzDrawerRef.close(data);
 * this.NzDrawerRef.close(true);
 * // 关闭
 * this.NzDrawerRef.close();
 * this.NzDrawerRef.close(false);
 */
export declare class DrawerHelper {
    private readonly srv;
    private readonly parentDrawer;
    private openDrawersAtThisLevel;
    get openDrawers(): NzDrawerRef[];
    /**
     * 构建一个抽屉
     */
    create(title: string | TemplateRef<any> | undefined | null, comp: TemplateRef<{
        $implicit: any;
        drawerRef: NzDrawerRef;
    }> | Type<any>, params?: any, options?: DrawerHelperOptions): Observable<any>;
    private close;
    closeAll(): void;
    /**
     * 构建一个抽屉，点击蒙层不允许关闭
     */
    static(title: string | TemplateRef<any> | undefined | null, comp: TemplateRef<{
        $implicit: any;
        drawerRef: NzDrawerRef;
    }> | Type<any>, params?: any, options?: DrawerHelperOptions): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DrawerHelper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DrawerHelper>;
}
