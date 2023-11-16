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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3NlcnZpY2VzL21vZGFsL21vZGFsLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUE4QjlDOztHQUVHO0FBRUgsTUFBTSxPQUFPLFdBQVc7SUFJdEIsWUFDVSxHQUFtQixFQUNuQixJQUFjLEVBQ0osR0FBYztRQUZ4QixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFVO1FBSmhCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBT25DLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFTyxhQUFhLENBQUMsT0FBK0IsRUFBRSxPQUFlO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBbUIsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBNEIsQ0FBQztRQUNwRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFpQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRyxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsU0FBUyxD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QUUsTUFBTSxFQUFFOzswQkFRN0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3AsIERyYWdSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWxPcHRpb25zLCBOek1vZGFsU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsSGVscGVyT3B0aW9ucyB7XG4gIC8qKiDlpKflsI/vvJvkvovlpoLvvJpsZ+OAgTYwMOOAgTgwJSwg6buY6K6k77yaYGxnYCAqL1xuICBzaXplPzogJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJyB8ICcnIHwgbnVtYmVyIHwgc3RyaW5nO1xuICAvKiog5a+56K+d5qGGIFtNb2RhbE9wdGlvbnNdKGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtdHlwZXMudHMpIOWPguaVsCAqL1xuICBtb2RhbE9wdGlvbnM/OiBNb2RhbE9wdGlvbnM7XG4gIC8qKiDmmK/lkKbnsr7lh4bvvIjpu5jorqTvvJpgdHJ1ZWDvvInvvIzoi6Xov5Tlm57lgLzpnZ7nqbrlgLzvvIhgbnVsbGDmiJZgdW5kZWZpbmVkYO+8ieinhuS4uuaIkOWKn++8jOWQpuWImeinhuS4uumUmeivryAqL1xuICBleGFjdD86IGJvb2xlYW47XG4gIC8qKiDmmK/lkKbljIXoo7nmoIfnrb7pobXvvIzkv67lpI3mqKHmgIHljIXlkKvmoIfnrb7pl7Tot53pl67popggKi9cbiAgaW5jbHVkZVRhYnM/OiBib29sZWFuO1xuICAvKipcbiAgICog5piv5ZCm5pSv5oyB5ouW5Yqo77yM6buY6K6k5piv6YCa6L+H5qCH6aKY5p2l6Kem5Y+RXG4gICAqL1xuICBkcmFnPzogTW9kYWxIZWxwZXJEcmFnT3B0aW9ucyB8IGJvb2xlYW47XG4gIC8qKlxuICAgKiDmmK/lkKblvLrliLbkvb/nlKggYG56RGF0YWAg5Lyg6YCS5Y+C5pWw77yM6Iul5Li6IGBmYWxzZWAg6KGo56S65Y+C5pWw5Lya55u05o6l5pig5bCE5Yiw57uE5Lu25a6e5L6L5Lit77yM5YW25LuW5YC85Y+q6IO96YCa6L+HIGBOWl9NT0RBTF9EQVRBYCDnmoTmlrnlvI/mnaXojrflj5blj4LmlbDvvIzpu5jorqTvvJpgZmFsc2VgXG4gICAqL1xuICB1c2VOekRhdGE/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsSGVscGVyRHJhZ09wdGlvbnMge1xuICAvKipcbiAgICog5oyH5a6a5ouW5Zyw5Yy65Z+f55qE57G75ZCN77yM6Iul5oyH5a6a5Li6IGBudWxsYCDml7booajnpLrmlbTkuKrlr7nor53moYbvvIzpu5jorqTvvJpgLm1vZGFsLWhlYWRlciwgLmFudC1tb2RhbC10aXRsZWBcbiAgICovXG4gIGhhbmRsZUNscz86IHN0cmluZyB8IG51bGw7XG59XG5cbi8qKlxuICog5a+56K+d5qGG6L6F5Yqp57G7XG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTW9kYWxIZWxwZXIge1xuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgcHJpdmF0ZSBkcmFnQ2xzUHJlZml4ID0gJ01PREFMLURSQUcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3J2OiBOek1vZGFsU2VydmljZSxcbiAgICBwcml2YXRlIGRyYWc6IERyYWdEcm9wLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvYzogTnpTYWZlQW55XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2M7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURyYWdSZWYob3B0aW9uczogTW9kYWxIZWxwZXJEcmFnT3B0aW9ucywgd3JhcENsczogc3RyaW5nKTogRHJhZ1JlZiB7XG4gICAgY29uc3Qgd3JhcEVsID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdyYXBDbHMpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIGNvbnN0IG1vZGFsRWwgPSB3cmFwRWwuZmlyc3RDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBjb25zdCBoYW5kZWxFbCA9IG9wdGlvbnMuaGFuZGxlQ2xzID8gd3JhcEVsLnF1ZXJ5U2VsZWN0b3I8SFRNTERpdkVsZW1lbnQ+KG9wdGlvbnMuaGFuZGxlQ2xzKSA6IG51bGw7XG4gICAgaWYgKGhhbmRlbEVsKSB7XG4gICAgICBoYW5kZWxFbC5jbGFzc0xpc3QuYWRkKGAke3RoaXMuZHJhZ0Nsc1ByZWZpeH0tSEFORExFYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZHJhZ1xuICAgICAgLmNyZWF0ZURyYWcoaGFuZGVsRWwgPz8gbW9kYWxFbClcbiAgICAgIC53aXRoSGFuZGxlcyhbaGFuZGVsRWwgPz8gbW9kYWxFbF0pXG4gICAgICAud2l0aEJvdW5kYXJ5RWxlbWVudCh3cmFwRWwpXG4gICAgICAud2l0aFJvb3RFbGVtZW50KG1vZGFsRWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIOaehOW7uuS4gOS4quWvueivneahhlxuICAgKlxuICAgKiBAcGFyYW0gY29tcCDnu4Tku7ZcbiAgICogQHBhcmFtIHBhcmFtcyDnu4Tku7blj4LmlbBcbiAgICogQHBhcmFtIG9wdGlvbnMg6aKd5aSW5Y+C5pWwXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHRoaXMubW9kYWxIZWxwZXIuY3JlYXRlKEZvcm1FZGl0Q29tcG9uZW50LCB7IGkgfSkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxvYWQoKSk7XG4gICAqIC8vIOWvueS6jue7hOS7tueahOaIkOWKnyblhbPpl63nmoTlpITnkIbor7TmmI5cbiAgICogLy8g5oiQ5Yqf77yM5YW25LitIGBuek1vZGFsUmVmYCDmjIfnm67moIfnu4Tku7blnKjmnoTpgKDlh73mlbAgYE56TW9kYWxSZWZgIOWPmOmHj+WQjVxuICAgKiB0aGlzLm56TW9kYWxSZWYuY2xvc2UoZGF0YSk7XG4gICAqIHRoaXMubnpNb2RhbFJlZi5jbG9zZSgpO1xuICAgKiAvLyDlhbPpl61cbiAgICogdGhpcy5uek1vZGFsUmVmLmRlc3Ryb3koKTtcbiAgICovXG4gIGNyZWF0ZShcbiAgICBjb21wOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgVHlwZTxOelNhZmVBbnk+LFxuICAgIHBhcmFtcz86IE56U2FmZUFueSxcbiAgICBvcHRpb25zPzogTW9kYWxIZWxwZXJPcHRpb25zXG4gICk6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gICAgb3B0aW9ucyA9IGRlZXBNZXJnZShcbiAgICAgIHtcbiAgICAgICAgc2l6ZTogJ2xnJyxcbiAgICAgICAgZXhhY3Q6IHRydWUsXG4gICAgICAgIGluY2x1ZGVUYWJzOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPE56U2FmZUFueT4pID0+IHtcbiAgICAgIGNvbnN0IHsgc2l6ZSwgaW5jbHVkZVRhYnMsIG1vZGFsT3B0aW9ucywgZHJhZywgdXNlTnpEYXRhIH0gPSBvcHRpb25zIGFzIE1vZGFsSGVscGVyT3B0aW9ucztcbiAgICAgIGxldCBjbHMgPSAnJztcbiAgICAgIGxldCB3aWR0aCA9ICcnO1xuICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzaXplID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHdpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgICAgIH0gZWxzZSBpZiAoWydzbScsICdtZCcsICdsZycsICd4bCddLmluY2x1ZGVzKHNpemUpKSB7XG4gICAgICAgICAgY2xzID0gYG1vZGFsLSR7c2l6ZX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZHRoID0gc2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGluY2x1ZGVUYWJzKSB7XG4gICAgICAgIGNscyArPSAnIG1vZGFsLWluY2x1ZGUtdGFicyc7XG4gICAgICB9XG4gICAgICBpZiAobW9kYWxPcHRpb25zICYmIG1vZGFsT3B0aW9ucy5ueldyYXBDbGFzc05hbWUpIHtcbiAgICAgICAgY2xzICs9IGAgJHttb2RhbE9wdGlvbnMubnpXcmFwQ2xhc3NOYW1lfWA7XG4gICAgICAgIGRlbGV0ZSBtb2RhbE9wdGlvbnMubnpXcmFwQ2xhc3NOYW1lO1xuICAgICAgfVxuICAgICAgbGV0IGRyYWdPcHRpb25zOiBNb2RhbEhlbHBlckRyYWdPcHRpb25zIHwgbnVsbDtcbiAgICAgIGxldCBkcmFnV3JhcENscyA9IGAke3RoaXMuZHJhZ0Nsc1ByZWZpeH0tJHsrbmV3IERhdGUoKX1gO1xuICAgICAgbGV0IGRyYWdSZWY6IERyYWdSZWYgfCBudWxsO1xuICAgICAgaWYgKGRyYWcgIT0gbnVsbCAmJiBkcmFnICE9PSBmYWxzZSkge1xuICAgICAgICBkcmFnT3B0aW9ucyA9IHtcbiAgICAgICAgICBoYW5kbGVDbHM6IGAubW9kYWwtaGVhZGVyLCAuYW50LW1vZGFsLXRpdGxlYCxcbiAgICAgICAgICAuLi4odHlwZW9mIGRyYWcgPT09ICdvYmplY3QnID8gZHJhZyA6IHt9KVxuICAgICAgICB9O1xuICAgICAgICBjbHMgKz0gYCAke3RoaXMuZHJhZ0Nsc1ByZWZpeH0gJHtkcmFnV3JhcENsc31gO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3ViamVjdCA9IHRoaXMuc3J2LmNyZWF0ZSh7XG4gICAgICAgIG56V3JhcENsYXNzTmFtZTogY2xzLFxuICAgICAgICBuekNvbnRlbnQ6IGNvbXAsXG4gICAgICAgIG56V2lkdGg6IHdpZHRoID8gd2lkdGggOiB1bmRlZmluZWQsXG4gICAgICAgIG56Rm9vdGVyOiBudWxsLFxuICAgICAgICBuekRhdGE6IHBhcmFtcyxcbiAgICAgICAgLi4ubW9kYWxPcHRpb25zXG4gICAgICB9KTtcbiAgICAgIC8vIOS/neeVmSBuekNvbXBvbmVudFBhcmFtcyDljp/mnInpo47moLzvvIzkvYbkvp3nhLblj6/ku6XpgJrov4cgQEluamVjdChOWl9NT0RBTF9EQVRBKSDojrflj5ZcbiAgICAgIGlmICh1c2VOekRhdGEgIT09IHRydWUpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzdWJqZWN0LmNvbXBvbmVudEluc3RhbmNlLCBwYXJhbXMpO1xuICAgICAgfVxuICAgICAgc3ViamVjdC5hZnRlck9wZW5cbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gZHJhZ09wdGlvbnMgIT0gbnVsbClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBkcmFnUmVmID0gdGhpcy5jcmVhdGVEcmFnUmVmKGRyYWdPcHRpb25zISEsIGAuJHtkcmFnV3JhcENsc31gKTtcbiAgICAgICAgfSk7XG4gICAgICBzdWJqZWN0LmFmdGVyQ2xvc2UucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKHJlczogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zIS5leGFjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChyZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgZHJhZ1JlZj8uZGlzcG9zZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5p6E5bu66Z2Z5oCB5qGG77yM54K55Ye76JKZ5bGC5LiN5YWB6K645YWz6ZetXG4gICAqXG4gICAqIEBwYXJhbSBjb21wIOe7hOS7tlxuICAgKiBAcGFyYW0gcGFyYW1zIOe7hOS7tuWPguaVsFxuICAgKiBAcGFyYW0gb3B0aW9ucyDpop3lpJblj4LmlbBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5tb2RhbEhlbHBlci5vcGVuKEZvcm1FZGl0Q29tcG9uZW50LCB7IGkgfSkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxvYWQoKSk7XG4gICAqIC8vIOWvueS6jue7hOS7tueahOaIkOWKnyblhbPpl63nmoTlpITnkIbor7TmmI5cbiAgICogLy8g5oiQ5Yqf77yM5YW25LitIGBuek1vZGFsUmVmYCDmjIfnm67moIfnu4Tku7blnKjmnoTpgKDlh73mlbAgYE56TW9kYWxSZWZgIOWPmOmHj+WQjVxuICAgKiB0aGlzLm56TW9kYWxSZWYuY2xvc2UoZGF0YSk7XG4gICAqIHRoaXMubnpNb2RhbFJlZi5jbG9zZSgpO1xuICAgKiAvLyDlhbPpl61cbiAgICogdGhpcy5uek1vZGFsUmVmLmRlc3Ryb3koKTtcbiAgICovXG4gIGNyZWF0ZVN0YXRpYyhcbiAgICBjb21wOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgVHlwZTxOelNhZmVBbnk+LFxuICAgIHBhcmFtcz86IE56U2FmZUFueSxcbiAgICBvcHRpb25zPzogTW9kYWxIZWxwZXJPcHRpb25zXG4gICk6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gICAgY29uc3QgbW9kYWxPcHRpb25zID0ge1xuICAgICAgbnpNYXNrQ2xvc2FibGU6IGZhbHNlLFxuICAgICAgLi4uKG9wdGlvbnMgJiYgb3B0aW9ucy5tb2RhbE9wdGlvbnMpXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGUoY29tcCwgcGFyYW1zLCB7IC4uLm9wdGlvbnMsIG1vZGFsT3B0aW9ucyB9KTtcbiAgfVxufVxuIl19