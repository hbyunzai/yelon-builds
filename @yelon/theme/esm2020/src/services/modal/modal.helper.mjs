import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deepMerge } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
/**
 * 对话框辅助类
 */
export class ModalHelper {
    constructor(srv) {
        this.srv = srv;
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
            const { size, includeTabs, modalOptions } = options;
            let cls = '';
            let width = '';
            if (size) {
                if (typeof size === 'number') {
                    width = `${size}px`;
                }
                else {
                    cls = `modal-${size}`;
                }
            }
            if (includeTabs) {
                cls += ' modal-include-tabs';
            }
            if (modalOptions && modalOptions.nzWrapClassName) {
                cls += ` ${modalOptions.nzWrapClassName}`;
                delete modalOptions.nzWrapClassName;
            }
            const defaultOptions = {
                nzWrapClassName: cls,
                nzContent: comp,
                nzWidth: width ? width : undefined,
                nzFooter: null,
                nzComponentParams: params
            };
            const subject = this.srv.create({ ...defaultOptions, ...modalOptions });
            const afterClose$ = subject.afterClose.subscribe((res) => {
                if (options.exact === true) {
                    if (res != null) {
                        observer.next(res);
                    }
                }
                else {
                    observer.next(res);
                }
                observer.complete();
                afterClose$.unsubscribe();
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
}
ModalHelper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ModalHelper, deps: [{ token: i1.NzModalService }], target: i0.ɵɵFactoryTarget.Injectable });
ModalHelper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ModalHelper, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ModalHelper, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NzModalService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3NlcnZpY2VzL21vZGFsL21vZGFsLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBYTlDOztHQUVHO0FBRUgsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFBb0IsR0FBbUI7UUFBbkIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7SUFBRyxDQUFDO0lBRTNDOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FDSixJQUE4QyxFQUM5QyxNQUFrQixFQUNsQixPQUE0QjtRQUU1QixPQUFPLEdBQUcsU0FBUyxDQUNqQjtZQUNFLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsS0FBSztTQUNuQixFQUNELE9BQU8sQ0FDUixDQUFDO1FBQ0YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQTZCLEVBQUUsRUFBRTtZQUN0RCxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUE2QixDQUFDO1lBQzFFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUM1QixLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQztpQkFDckI7cUJBQU07b0JBQ0wsR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFLENBQUM7aUJBQ3ZCO2FBQ0Y7WUFDRCxJQUFJLFdBQVcsRUFBRTtnQkFDZixHQUFHLElBQUkscUJBQXFCLENBQUM7YUFDOUI7WUFDRCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsZUFBZSxFQUFFO2dCQUNoRCxHQUFHLElBQUksSUFBSSxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sWUFBWSxDQUFDLGVBQWUsQ0FBQzthQUNyQztZQUNELE1BQU0sY0FBYyxHQUFpQjtnQkFDbkMsZUFBZSxFQUFFLEdBQUc7Z0JBQ3BCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDbEMsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsaUJBQWlCLEVBQUUsTUFBTTthQUMxQixDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLGNBQWMsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDeEUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFjLEVBQUUsRUFBRTtnQkFDbEUsSUFBSSxPQUFRLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDM0IsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO3dCQUNmLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3BCO2lCQUNGO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3BCO2dCQUNELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEIsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsWUFBWSxDQUNWLElBQThDLEVBQzlDLE1BQWtCLEVBQ2xCLE9BQTRCO1FBRTVCLE1BQU0sWUFBWSxHQUFHO1lBQ25CLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQztTQUNyQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O3dHQWxHVSxXQUFXOzRHQUFYLFdBQVcsY0FERSxNQUFNOzJGQUNuQixXQUFXO2tCQUR2QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBNb2RhbE9wdGlvbnMsIE56TW9kYWxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tb2RhbCc7XG5cbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbEhlbHBlck9wdGlvbnMge1xuICAvKiog5aSn5bCP77yb5L6L5aaC77yabGfjgIE2MDDvvIzpu5jorqTvvJpgbGdgICovXG4gIHNpemU/OiAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJycgfCBudW1iZXI7XG4gIC8qKiDlr7nor53moYYgW01vZGFsT3B0aW9uc10oaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvY29tcG9uZW50cy9tb2RhbC9tb2RhbC10eXBlcy50cykg5Y+C5pWwICovXG4gIG1vZGFsT3B0aW9ucz86IE1vZGFsT3B0aW9ucztcbiAgLyoqIOaYr+WQpueyvuWHhu+8iOm7mOiupO+8mmB0cnVlYO+8ie+8jOiLpei/lOWbnuWAvOmdnuepuuWAvO+8iGBudWxsYOaIlmB1bmRlZmluZWRg77yJ6KeG5Li65oiQ5Yqf77yM5ZCm5YiZ6KeG5Li66ZSZ6K+vICovXG4gIGV4YWN0PzogYm9vbGVhbjtcbiAgLyoqIOaYr+WQpuWMheijueagh+etvumhte+8jOS/ruWkjeaooeaAgeWMheWQq+agh+etvumXtOi3nemXrumimCAqL1xuICBpbmNsdWRlVGFicz86IGJvb2xlYW47XG59XG5cbi8qKlxuICog5a+56K+d5qGG6L6F5Yqp57G7XG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTW9kYWxIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNydjogTnpNb2RhbFNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIOaehOW7uuS4gOS4quWvueivneahhlxuICAgKlxuICAgKiBAcGFyYW0gY29tcCDnu4Tku7ZcbiAgICogQHBhcmFtIHBhcmFtcyDnu4Tku7blj4LmlbBcbiAgICogQHBhcmFtIG9wdGlvbnMg6aKd5aSW5Y+C5pWwXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHRoaXMubW9kYWxIZWxwZXIuY3JlYXRlKEZvcm1FZGl0Q29tcG9uZW50LCB7IGkgfSkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxvYWQoKSk7XG4gICAqIC8vIOWvueS6jue7hOS7tueahOaIkOWKnyblhbPpl63nmoTlpITnkIbor7TmmI5cbiAgICogLy8g5oiQ5Yqf77yM5YW25LitIGBuek1vZGFsUmVmYCDmjIfnm67moIfnu4Tku7blnKjmnoTpgKDlh73mlbAgYE56TW9kYWxSZWZgIOWPmOmHj+WQjVxuICAgKiB0aGlzLm56TW9kYWxSZWYuY2xvc2UoZGF0YSk7XG4gICAqIHRoaXMubnpNb2RhbFJlZi5jbG9zZSgpO1xuICAgKiAvLyDlhbPpl61cbiAgICogdGhpcy5uek1vZGFsUmVmLmRlc3Ryb3koKTtcbiAgICovXG4gIGNyZWF0ZShcbiAgICBjb21wOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgVHlwZTxOelNhZmVBbnk+LFxuICAgIHBhcmFtcz86IE56U2FmZUFueSxcbiAgICBvcHRpb25zPzogTW9kYWxIZWxwZXJPcHRpb25zXG4gICk6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gICAgb3B0aW9ucyA9IGRlZXBNZXJnZShcbiAgICAgIHtcbiAgICAgICAgc2l6ZTogJ2xnJyxcbiAgICAgICAgZXhhY3Q6IHRydWUsXG4gICAgICAgIGluY2x1ZGVUYWJzOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPE56U2FmZUFueT4pID0+IHtcbiAgICAgIGNvbnN0IHsgc2l6ZSwgaW5jbHVkZVRhYnMsIG1vZGFsT3B0aW9ucyB9ID0gb3B0aW9ucyBhcyBNb2RhbEhlbHBlck9wdGlvbnM7XG4gICAgICBsZXQgY2xzID0gJyc7XG4gICAgICBsZXQgd2lkdGggPSAnJztcbiAgICAgIGlmIChzaXplKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB3aWR0aCA9IGAke3NpemV9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNscyA9IGBtb2RhbC0ke3NpemV9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGluY2x1ZGVUYWJzKSB7XG4gICAgICAgIGNscyArPSAnIG1vZGFsLWluY2x1ZGUtdGFicyc7XG4gICAgICB9XG4gICAgICBpZiAobW9kYWxPcHRpb25zICYmIG1vZGFsT3B0aW9ucy5ueldyYXBDbGFzc05hbWUpIHtcbiAgICAgICAgY2xzICs9IGAgJHttb2RhbE9wdGlvbnMubnpXcmFwQ2xhc3NOYW1lfWA7XG4gICAgICAgIGRlbGV0ZSBtb2RhbE9wdGlvbnMubnpXcmFwQ2xhc3NOYW1lO1xuICAgICAgfVxuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgICAgICAgbnpXcmFwQ2xhc3NOYW1lOiBjbHMsXG4gICAgICAgIG56Q29udGVudDogY29tcCxcbiAgICAgICAgbnpXaWR0aDogd2lkdGggPyB3aWR0aCA6IHVuZGVmaW5lZCxcbiAgICAgICAgbnpGb290ZXI6IG51bGwsXG4gICAgICAgIG56Q29tcG9uZW50UGFyYW1zOiBwYXJhbXNcbiAgICAgIH07XG4gICAgICBjb25zdCBzdWJqZWN0ID0gdGhpcy5zcnYuY3JlYXRlKHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm1vZGFsT3B0aW9ucyB9KTtcbiAgICAgIGNvbnN0IGFmdGVyQ2xvc2UkID0gc3ViamVjdC5hZnRlckNsb3NlLnN1YnNjcmliZSgocmVzOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMhLmV4YWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHJlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICBhZnRlckNsb3NlJC51bnN1YnNjcmliZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5p6E5bu66Z2Z5oCB5qGG77yM54K55Ye76JKZ5bGC5LiN5YWB6K645YWz6ZetXG4gICAqXG4gICAqIEBwYXJhbSBjb21wIOe7hOS7tlxuICAgKiBAcGFyYW0gcGFyYW1zIOe7hOS7tuWPguaVsFxuICAgKiBAcGFyYW0gb3B0aW9ucyDpop3lpJblj4LmlbBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5tb2RhbEhlbHBlci5vcGVuKEZvcm1FZGl0Q29tcG9uZW50LCB7IGkgfSkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxvYWQoKSk7XG4gICAqIC8vIOWvueS6jue7hOS7tueahOaIkOWKnyblhbPpl63nmoTlpITnkIbor7TmmI5cbiAgICogLy8g5oiQ5Yqf77yM5YW25LitIGBuek1vZGFsUmVmYCDmjIfnm67moIfnu4Tku7blnKjmnoTpgKDlh73mlbAgYE56TW9kYWxSZWZgIOWPmOmHj+WQjVxuICAgKiB0aGlzLm56TW9kYWxSZWYuY2xvc2UoZGF0YSk7XG4gICAqIHRoaXMubnpNb2RhbFJlZi5jbG9zZSgpO1xuICAgKiAvLyDlhbPpl61cbiAgICogdGhpcy5uek1vZGFsUmVmLmRlc3Ryb3koKTtcbiAgICovXG4gIGNyZWF0ZVN0YXRpYyhcbiAgICBjb21wOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgVHlwZTxOelNhZmVBbnk+LFxuICAgIHBhcmFtcz86IE56U2FmZUFueSxcbiAgICBvcHRpb25zPzogTW9kYWxIZWxwZXJPcHRpb25zXG4gICk6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gICAgY29uc3QgbW9kYWxPcHRpb25zID0ge1xuICAgICAgbnpNYXNrQ2xvc2FibGU6IGZhbHNlLFxuICAgICAgLi4uKG9wdGlvbnMgJiYgb3B0aW9ucy5tb2RhbE9wdGlvbnMpXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGUoY29tcCwgcGFyYW1zLCB7IC4uLm9wdGlvbnMsIG1vZGFsT3B0aW9ucyB9KTtcbiAgfVxufVxuIl19