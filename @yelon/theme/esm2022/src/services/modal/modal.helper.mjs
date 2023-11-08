import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, filter, take } from 'rxjs';
import { deepMerge } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "@angular/cdk/drag-drop";
/**
 * 对话框辅助类
 */
export class ModalHelper {
    constructor(srv, drag, doc) {
        this.srv = srv;
        this.drag = drag;
        this.dragClsPrefix = 'MODAL-DRAG';
        this.document = doc;
    }
    createDragRef(options, wrapCls) {
        const wrapEl = this.document.querySelector(wrapCls);
        const modalEl = wrapEl.firstChild;
        const handelEl = options.handleCls ? wrapEl.querySelector(options.handleCls) : null;
        if (handelEl) {
            handelEl.classList.add(`${this.dragClsPrefix}-HANDLE`);
        }
        return this.drag
            .createDrag(handelEl ?? modalEl)
            .withHandles([handelEl ?? modalEl])
            .withBoundaryElement(wrapEl)
            .withRootElement(modalEl);
    }
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
    create(comp, params, options) {
        options = deepMerge({
            size: 'lg',
            exact: true,
            includeTabs: false
        }, options);
        return new Observable((observer) => {
            const { size, includeTabs, modalOptions, drag, useNzData } = options;
            let cls = '';
            let width = '';
            if (size) {
                if (typeof size === 'number') {
                    width = `${size}px`;
                }
                else if (['sm', 'md', 'lg', 'xl'].includes(size)) {
                    cls = `modal-${size}`;
                }
                else {
                    width = size;
                }
            }
            if (includeTabs) {
                cls += ' modal-include-tabs';
            }
            if (modalOptions && modalOptions.nzWrapClassName) {
                cls += ` ${modalOptions.nzWrapClassName}`;
                delete modalOptions.nzWrapClassName;
            }
            let dragOptions;
            let dragWrapCls = `${this.dragClsPrefix}-${+new Date()}`;
            let dragRef;
            if (drag != null && drag !== false) {
                dragOptions = {
                    handleCls: `.modal-header, .ant-modal-title`,
                    ...(typeof drag === 'object' ? drag : {})
                };
                cls += ` ${this.dragClsPrefix} ${dragWrapCls}`;
            }
            const subject = this.srv.create({
                nzWrapClassName: cls,
                nzContent: comp,
                nzWidth: width ? width : undefined,
                nzFooter: null,
                nzData: params,
                ...modalOptions
            });
            // 保留 nzComponentParams 原有风格，但依然可以通过 @Inject(NZ_MODAL_DATA) 获取
            if (useNzData !== true) {
                Object.assign(subject.componentInstance, params);
            }
            subject.afterOpen
                .pipe(take(1), filter(() => dragOptions != null))
                .subscribe(() => {
                dragRef = this.createDragRef(dragOptions, `.${dragWrapCls}`);
            });
            subject.afterClose.pipe(take(1)).subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                dragRef?.dispose();
            });
        });
    }
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
    createStatic(comp, params, options) {
        const modalOptions = {
            nzMaskClosable: false,
            ...(options && options.modalOptions)
        };
        return this.create(comp, params, { ...options, modalOptions });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalHelper, deps: [{ token: i1.NzModalService }, { token: i2.DragDrop }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalHelper, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalHelper, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NzModalService }, { type: i2.DragDrop }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3NlcnZpY2VzL21vZGFsL21vZGFsLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUErQjlDOztHQUVHO0FBRUgsTUFBTSxPQUFPLFdBQVc7SUFJdEIsWUFDVSxHQUFtQixFQUNuQixJQUFjLEVBQ0osR0FBYztRQUZ4QixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFVO1FBSmhCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBT25DLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFTyxhQUFhLENBQUMsT0FBK0IsRUFBRSxPQUFlO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBbUIsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBNEIsQ0FBQztRQUNwRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFpQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRyxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsU0FBUyxD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QUUsTUFBTSxFQUFFOzswQkFRN0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3AsIERyYWdSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBNb2RhbE9wdGlvbnMsIE56TW9kYWxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tb2RhbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxIZWxwZXJPcHRpb25zIHtcbiAgLyoqIOWkp+Wwj++8m+S+i+Wmgu+8mmxn44CBNjAw44CBODAlLCDpu5jorqTvvJpgbGdgICovXG4gIHNpemU/OiAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJycgfCBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiDlr7nor53moYYgW01vZGFsT3B0aW9uc10oaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvY29tcG9uZW50cy9tb2RhbC9tb2RhbC10eXBlcy50cykg5Y+C5pWwICovXG4gIG1vZGFsT3B0aW9ucz86IE1vZGFsT3B0aW9ucztcbiAgLyoqIOaYr+WQpueyvuWHhu+8iOm7mOiupO+8mmB0cnVlYO+8ie+8jOiLpei/lOWbnuWAvOmdnuepuuWAvO+8iGBudWxsYOaIlmB1bmRlZmluZWRg77yJ6KeG5Li65oiQ5Yqf77yM5ZCm5YiZ6KeG5Li66ZSZ6K+vICovXG4gIGV4YWN0PzogYm9vbGVhbjtcbiAgLyoqIOaYr+WQpuWMheijueagh+etvumhte+8jOS/ruWkjeaooeaAgeWMheWQq+agh+etvumXtOi3nemXrumimCAqL1xuICBpbmNsdWRlVGFicz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiDmmK/lkKbmlK/mjIHmi5bliqjvvIzpu5jorqTmmK/pgJrov4fmoIfpopjmnaXop6blj5FcbiAgICovXG4gIGRyYWc/OiBNb2RhbEhlbHBlckRyYWdPcHRpb25zIHwgYm9vbGVhbjtcbiAgLyoqXG4gICAqIOaYr+WQpuW8uuWItuS9v+eUqCBgbnpEYXRhYCDkvKDpgJLlj4LmlbDvvIzoi6XkuLogYGZhbHNlYCDooajnpLrlj4LmlbDkvJrnm7TmjqXmmKDlsITliLDnu4Tku7blrp7kvovkuK3vvIzlhbbku5blgLzlj6rog73pgJrov4cgYE5aX01PREFMX0RBVEFgIOeahOaWueW8j+adpeiOt+WPluWPguaVsO+8jOm7mOiupO+8mmBmYWxzZWBcbiAgICovXG4gIHVzZU56RGF0YT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxIZWxwZXJEcmFnT3B0aW9ucyB7XG4gIC8qKlxuICAgKiDmjIflrprmi5blnLDljLrln5/nmoTnsbvlkI3vvIzoi6XmjIflrprkuLogYG51bGxgIOaXtuihqOekuuaVtOS4quWvueivneahhu+8jOm7mOiupO+8mmAubW9kYWwtaGVhZGVyLCAuYW50LW1vZGFsLXRpdGxlYFxuICAgKi9cbiAgaGFuZGxlQ2xzPzogc3RyaW5nIHwgbnVsbDtcbn1cblxuLyoqXG4gKiDlr7nor53moYbovoXliqnnsbtcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBNb2RhbEhlbHBlciB7XG4gIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50O1xuICBwcml2YXRlIGRyYWdDbHNQcmVmaXggPSAnTU9EQUwtRFJBRyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzcnY6IE56TW9kYWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZHJhZzogRHJhZ0Ryb3AsXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBOelNhZmVBbnlcbiAgKSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvYztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRHJhZ1JlZihvcHRpb25zOiBNb2RhbEhlbHBlckRyYWdPcHRpb25zLCB3cmFwQ2xzOiBzdHJpbmcpOiBEcmFnUmVmIHtcbiAgICBjb25zdCB3cmFwRWwgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcENscykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgY29uc3QgbW9kYWxFbCA9IHdyYXBFbC5maXJzdENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIGNvbnN0IGhhbmRlbEVsID0gb3B0aW9ucy5oYW5kbGVDbHMgPyB3cmFwRWwucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4ob3B0aW9ucy5oYW5kbGVDbHMpIDogbnVsbDtcbiAgICBpZiAoaGFuZGVsRWwpIHtcbiAgICAgIGhhbmRlbEVsLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy5kcmFnQ2xzUHJlZml4fS1IQU5ETEVgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kcmFnXG4gICAgICAuY3JlYXRlRHJhZyhoYW5kZWxFbCA/PyBtb2RhbEVsKVxuICAgICAgLndpdGhIYW5kbGVzKFtoYW5kZWxFbCA/PyBtb2RhbEVsXSlcbiAgICAgIC53aXRoQm91bmRhcnlFbGVtZW50KHdyYXBFbClcbiAgICAgIC53aXRoUm9vdEVsZW1lbnQobW9kYWxFbCk7XG4gIH1cblxuICAvKipcbiAgICog5p6E5bu65LiA5Liq5a+56K+d5qGGXG4gICAqXG4gICAqIEBwYXJhbSBjb21wIOe7hOS7tlxuICAgKiBAcGFyYW0gcGFyYW1zIOe7hOS7tuWPguaVsFxuICAgKiBAcGFyYW0gb3B0aW9ucyDpop3lpJblj4LmlbBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5tb2RhbEhlbHBlci5jcmVhdGUoRm9ybUVkaXRDb21wb25lbnQsIHsgaSB9KS5zdWJzY3JpYmUocmVzID0+IHRoaXMubG9hZCgpKTtcbiAgICogLy8g5a+55LqO57uE5Lu255qE5oiQ5YqfJuWFs+mXreeahOWkhOeQhuivtOaYjlxuICAgKiAvLyDmiJDlip/vvIzlhbbkuK0gYG56TW9kYWxSZWZgIOaMh+ebruagh+e7hOS7tuWcqOaehOmAoOWHveaVsCBgTnpNb2RhbFJlZmAg5Y+Y6YeP5ZCNXG4gICAqIHRoaXMubnpNb2RhbFJlZi5jbG9zZShkYXRhKTtcbiAgICogdGhpcy5uek1vZGFsUmVmLmNsb3NlKCk7XG4gICAqIC8vIOWFs+mXrVxuICAgKiB0aGlzLm56TW9kYWxSZWYuZGVzdHJveSgpO1xuICAgKi9cbiAgY3JlYXRlKFxuICAgIGNvbXA6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBUeXBlPE56U2FmZUFueT4sXG4gICAgcGFyYW1zPzogTnpTYWZlQW55LFxuICAgIG9wdGlvbnM/OiBNb2RhbEhlbHBlck9wdGlvbnNcbiAgKTogT2JzZXJ2YWJsZTxOelNhZmVBbnk+IHtcbiAgICBvcHRpb25zID0gZGVlcE1lcmdlKFxuICAgICAge1xuICAgICAgICBzaXplOiAnbGcnLFxuICAgICAgICBleGFjdDogdHJ1ZSxcbiAgICAgICAgaW5jbHVkZVRhYnM6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb3B0aW9uc1xuICAgICk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8TnpTYWZlQW55PikgPT4ge1xuICAgICAgY29uc3QgeyBzaXplLCBpbmNsdWRlVGFicywgbW9kYWxPcHRpb25zLCBkcmFnLCB1c2VOekRhdGEgfSA9IG9wdGlvbnMgYXMgTW9kYWxIZWxwZXJPcHRpb25zO1xuICAgICAgbGV0IGNscyA9ICcnO1xuICAgICAgbGV0IHdpZHRoID0gJyc7XG4gICAgICBpZiAoc2l6ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgd2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICAgICAgfSBlbHNlIGlmIChbJ3NtJywgJ21kJywgJ2xnJywgJ3hsJ10uaW5jbHVkZXMoc2l6ZSkpIHtcbiAgICAgICAgICBjbHMgPSBgbW9kYWwtJHtzaXplfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkdGggPSBzaXplO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZVRhYnMpIHtcbiAgICAgICAgY2xzICs9ICcgbW9kYWwtaW5jbHVkZS10YWJzJztcbiAgICAgIH1cbiAgICAgIGlmIChtb2RhbE9wdGlvbnMgJiYgbW9kYWxPcHRpb25zLm56V3JhcENsYXNzTmFtZSkge1xuICAgICAgICBjbHMgKz0gYCAke21vZGFsT3B0aW9ucy5ueldyYXBDbGFzc05hbWV9YDtcbiAgICAgICAgZGVsZXRlIG1vZGFsT3B0aW9ucy5ueldyYXBDbGFzc05hbWU7XG4gICAgICB9XG4gICAgICBsZXQgZHJhZ09wdGlvbnM6IE1vZGFsSGVscGVyRHJhZ09wdGlvbnMgfCBudWxsO1xuICAgICAgbGV0IGRyYWdXcmFwQ2xzID0gYCR7dGhpcy5kcmFnQ2xzUHJlZml4fS0keytuZXcgRGF0ZSgpfWA7XG4gICAgICBsZXQgZHJhZ1JlZjogRHJhZ1JlZiB8IG51bGw7XG4gICAgICBpZiAoZHJhZyAhPSBudWxsICYmIGRyYWcgIT09IGZhbHNlKSB7XG4gICAgICAgIGRyYWdPcHRpb25zID0ge1xuICAgICAgICAgIGhhbmRsZUNsczogYC5tb2RhbC1oZWFkZXIsIC5hbnQtbW9kYWwtdGl0bGVgLFxuICAgICAgICAgIC4uLih0eXBlb2YgZHJhZyA9PT0gJ29iamVjdCcgPyBkcmFnIDoge30pXG4gICAgICAgIH07XG4gICAgICAgIGNscyArPSBgICR7dGhpcy5kcmFnQ2xzUHJlZml4fSAke2RyYWdXcmFwQ2xzfWA7XG4gICAgICB9XG4gICAgICBjb25zdCBzdWJqZWN0ID0gdGhpcy5zcnYuY3JlYXRlKHtcbiAgICAgICAgbnpXcmFwQ2xhc3NOYW1lOiBjbHMsXG4gICAgICAgIG56Q29udGVudDogY29tcCxcbiAgICAgICAgbnpXaWR0aDogd2lkdGggPyB3aWR0aCA6IHVuZGVmaW5lZCxcbiAgICAgICAgbnpGb290ZXI6IG51bGwsXG4gICAgICAgIG56RGF0YTogcGFyYW1zLFxuICAgICAgICAuLi5tb2RhbE9wdGlvbnNcbiAgICAgIH0pO1xuICAgICAgLy8g5L+d55WZIG56Q29tcG9uZW50UGFyYW1zIOWOn+aciemjjuagvO+8jOS9huS+neeEtuWPr+S7pemAmui/hyBASW5qZWN0KE5aX01PREFMX0RBVEEpIOiOt+WPllxuICAgICAgaWYgKHVzZU56RGF0YSAhPT0gdHJ1ZSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHN1YmplY3QuY29tcG9uZW50SW5zdGFuY2UsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgICBzdWJqZWN0LmFmdGVyT3BlblxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIGZpbHRlcigoKSA9PiBkcmFnT3B0aW9ucyAhPSBudWxsKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGRyYWdSZWYgPSB0aGlzLmNyZWF0ZURyYWdSZWYoZHJhZ09wdGlvbnMhISwgYC4ke2RyYWdXcmFwQ2xzfWApO1xuICAgICAgICB9KTtcbiAgICAgIHN1YmplY3QuYWZ0ZXJDbG9zZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgocmVzOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMhLmV4YWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHJlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICBkcmFnUmVmPy5kaXNwb3NlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmnoTlu7rpnZnmgIHmoYbvvIzngrnlh7vokpnlsYLkuI3lhYHorrjlhbPpl61cbiAgICpcbiAgICogQHBhcmFtIGNvbXAg57uE5Lu2XG4gICAqIEBwYXJhbSBwYXJhbXMg57uE5Lu25Y+C5pWwXG4gICAqIEBwYXJhbSBvcHRpb25zIOmineWkluWPguaVsFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB0aGlzLm1vZGFsSGVscGVyLm9wZW4oRm9ybUVkaXRDb21wb25lbnQsIHsgaSB9KS5zdWJzY3JpYmUocmVzID0+IHRoaXMubG9hZCgpKTtcbiAgICogLy8g5a+55LqO57uE5Lu255qE5oiQ5YqfJuWFs+mXreeahOWkhOeQhuivtOaYjlxuICAgKiAvLyDmiJDlip/vvIzlhbbkuK0gYG56TW9kYWxSZWZgIOaMh+ebruagh+e7hOS7tuWcqOaehOmAoOWHveaVsCBgTnpNb2RhbFJlZmAg5Y+Y6YeP5ZCNXG4gICAqIHRoaXMubnpNb2RhbFJlZi5jbG9zZShkYXRhKTtcbiAgICogdGhpcy5uek1vZGFsUmVmLmNsb3NlKCk7XG4gICAqIC8vIOWFs+mXrVxuICAgKiB0aGlzLm56TW9kYWxSZWYuZGVzdHJveSgpO1xuICAgKi9cbiAgY3JlYXRlU3RhdGljKFxuICAgIGNvbXA6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBUeXBlPE56U2FmZUFueT4sXG4gICAgcGFyYW1zPzogTnpTYWZlQW55LFxuICAgIG9wdGlvbnM/OiBNb2RhbEhlbHBlck9wdGlvbnNcbiAgKTogT2JzZXJ2YWJsZTxOelNhZmVBbnk+IHtcbiAgICBjb25zdCBtb2RhbE9wdGlvbnMgPSB7XG4gICAgICBuek1hc2tDbG9zYWJsZTogZmFsc2UsXG4gICAgICAuLi4ob3B0aW9ucyAmJiBvcHRpb25zLm1vZGFsT3B0aW9ucylcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZShjb21wLCBwYXJhbXMsIHsgLi4ub3B0aW9ucywgbW9kYWxPcHRpb25zIH0pO1xuICB9XG59XG4iXX0=