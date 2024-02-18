import { NgZone } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, distinctUntilChanged, map, take } from 'rxjs';
import { NzFormStatusService } from 'ng-zorro-antd/core/form';
import { SF_SEQ } from '../const';
import { isBlank } from '../utils';
export class FormProperty {
    constructor(injector, schemaValidatorFactory, schema, ui, formData, parent, path, _options) {
        this.injector = injector;
        this._options = _options;
        this._errors = null;
        this._valueChanges = new BehaviorSubject({ path: null, pathValue: null, value: null });
        this._errorsChanges = new BehaviorSubject(null);
        this._visible = true;
        this._visibilityChanges = new BehaviorSubject(true);
        this._objErrors = {};
        this._value = null;
        this.schema = schema;
        this.ui = ui;
        this.schemaValidator = schemaValidatorFactory.createValidatorFn(schema, {
            ignoreKeywords: this.ui.ignoreKeywords,
            debug: ui.debug
        });
        this.formData = formData || schema.default;
        this._parent = parent;
        if (parent) {
            this._root = parent.root;
        }
        else {
            this._root = this;
        }
        this.path = path;
    }
    get valueChanges() {
        return this._valueChanges;
    }
    get errorsChanges() {
        return this._errorsChanges;
    }
    get type() {
        return this.schema.type;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        return this._root;
    }
    get value() {
        return this._value;
    }
    get errors() {
        return this._errors;
    }
    get visible() {
        return this._visible;
    }
    get valid() {
        return this._errors === null || this._errors.length === 0;
    }
    get options() {
        return this._options;
    }
    cd(onlySelf = false) {
        this.widget?.detectChanges(onlySelf);
    }
    /**
     * 更新值且校验数据
     */
    updateValueAndValidity(options) {
        options = {
            onlySelf: false,
            emitValidator: true,
            emitValueEvent: true,
            updatePath: '',
            updateValue: null,
            ...options
        };
        this._updateValue();
        if (options.emitValueEvent) {
            options.updatePath = options.updatePath || this.path;
            options.updateValue = options.updateValue == null ? this.value : options.updateValue;
            this.valueChanges.next({ value: this.value, path: options.updatePath, pathValue: options.updateValue });
        }
        // `emitValidator` 每一次数据变更已经包含完整错误链路，后续父节点数据变更无须再触发校验
        if (options.emitValidator && this.ui.liveValidate === true) {
            this._runValidation();
        }
        if (this.parent && !options.onlySelf) {
            this.parent.updateValueAndValidity({ ...options, emitValidator: false });
        }
    }
    /** 根据路径搜索表单属性 */
    searchProperty(path) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let prop = this;
        let base = null;
        let result = null;
        if (path[0] === SF_SEQ) {
            base = this.findRoot();
            result = base.getProperty(path.substring(1));
        }
        else {
            while (result === null && prop.parent !== null) {
                prop = base = prop.parent;
                result = base.getProperty(path);
            }
        }
        return result;
    }
    /** 查找根表单属性 */
    findRoot() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let property = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return property;
    }
    // #region process errors
    isEmptyData(value) {
        if (isBlank(value))
            return true;
        switch (this.type) {
            case 'string':
                return `${value}`.length === 0;
        }
        return false;
    }
    /**
     * @internal
     */
    _runValidation() {
        let errors;
        // The definition of some rules:
        // 1. Should not ajv validator when is empty data and required fields
        // 2. Should not ajv validator when is empty data
        const isEmpty = this.isEmptyData(this._value);
        if (isEmpty && this.ui._required) {
            errors = [{ keyword: 'required' }];
        }
        else if (isEmpty) {
            errors = [];
        }
        else {
            errors = this.schemaValidator(this._value) || [];
        }
        const customValidator = this.ui.validator;
        if (typeof customValidator === 'function') {
            const customErrors = customValidator(this.value, this, this.findRoot());
            if (customErrors instanceof Observable) {
                customErrors.subscribe(res => {
                    this.setCustomErrors(errors, res);
                    this.cd(false);
                });
                return;
            }
            this.setCustomErrors(errors, customErrors);
            return;
        }
        this._errors = errors;
        this.setErrors(this._errors);
    }
    setCustomErrors(errors, list) {
        const hasCustomError = Array.isArray(list) && list.length > 0;
        if (hasCustomError) {
            list.forEach(err => {
                if (!err.message) {
                    throw new Error(`The custom validator must contain a 'message' attribute to viewed error text`);
                }
                err.keyword = null;
            });
        }
        this._errors = hasCustomError ? errors.concat(...list) : errors;
        this.setErrors(this._errors);
    }
    /**
     * Set the current error message
     *
     * 设置当前错误消息
     *
     * @param emitFormat 若提供的消息带有 `{xx}` 会自动根据参数进行转化，包含自定义函数
     *
     * @example
     *
     * this.sf.getProperty('/name')?.setErrors({ keyword: 'required' });
     * this.sf.getProperty('/name')?.setErrors({ message: 'Please input your username!' });
     * this.sf.getProperty('/name')?.setErrors(); // Clean error
     */
    setErrors(errors = [], emitFormat = true) {
        let arrErrs = Array.isArray(errors) ? errors : [errors];
        if (emitFormat && arrErrs && !this.ui.onlyVisual) {
            const l = (this.widget && this.widget.l.error) || {};
            arrErrs = arrErrs.map((err) => {
                let message = err.keyword == null && err.message
                    ? err.message
                    : (this.ui.errors || {})[err.keyword] || this._options.errors[err.keyword] || l[err.keyword] || ``;
                if (message && typeof message === 'function') {
                    message = message(err);
                }
                if (message) {
                    if (~message.indexOf('{') && err.params) {
                        message = message.replace(/{([\.a-zA-Z0-9]+)}/g, (_v, key) => err.params[key] || '');
                    }
                    err.message = message;
                }
                return err;
            });
        }
        this._errors = arrErrs;
        this._errorsChanges.next(arrErrs);
        // Should send errors to parent field
        if (this._parent) {
            this._parent.setParentAndPlatErrors(arrErrs, this.path);
        }
    }
    setParentAndPlatErrors(errors, path) {
        this._objErrors[path] = errors;
        const platErrors = [];
        Object.keys(this._objErrors).forEach(p => {
            const property = this.searchProperty(p);
            if (property && !property.visible)
                return;
            platErrors.push(...this._objErrors[p]);
        });
        this.setErrors(platErrors, false);
    }
    // #endregion
    // #region condition
    /**
     * Set the hide or display of widget
     * 设置小部件的隐藏或显示
     */
    setVisible(visible) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        // 渲染时需要重新触发 reset
        if (visible) {
            this.injector
                .get(NgZone)
                .onStable.pipe(take(1))
                .subscribe(() => {
                this.resetValue(this.value, true);
            });
        }
        return this;
    }
    _bindVisibility() {
        const visibleIf = this.ui.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        }
        else if (visibleIf != null) {
            const propertiesBinding = [];
            for (const dependencyPath in visibleIf) {
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    const property = this.searchProperty(dependencyPath);
                    if (property) {
                        const valueCheck = property.valueChanges.pipe(map(res => {
                            const vi = visibleIf[dependencyPath];
                            if (typeof vi === 'function') {
                                const viFnRes = vi(res.value, property);
                                // 同步更新 required
                                if (typeof viFnRes === 'object') {
                                    const fixViFnRes = { show: false, required: false, ...viFnRes };
                                    const parentRequired = this.parent?.schema.required;
                                    if (parentRequired && this.propertyId) {
                                        const idx = parentRequired.findIndex(w => w === this.propertyId);
                                        if (fixViFnRes.required) {
                                            if (idx === -1)
                                                parentRequired.push(this.propertyId);
                                        }
                                        else {
                                            if (idx !== -1)
                                                parentRequired.splice(idx, 1);
                                        }
                                        this.ui._required = fixViFnRes.required;
                                    }
                                    return fixViFnRes.show;
                                }
                                return viFnRes;
                            }
                            if (vi.indexOf('$ANY$') !== -1) {
                                return res.value && res.value.length > 0;
                            }
                            else {
                                return vi.indexOf(res.value) !== -1;
                            }
                        }));
                        const visibilityCheck = property._visibilityChanges;
                        const and = combineLatest([valueCheck, visibilityCheck]).pipe(map(results => results[0] && results[1]));
                        propertiesBinding.push(and);
                    }
                    else {
                        if (typeof ngDevMode === 'undefined' || ngDevMode) {
                            console.warn(`Can't find property ${dependencyPath} for visibility check of ${this.path}`);
                        }
                    }
                }
            }
            combineLatest(propertiesBinding)
                .pipe(map(values => (this.ui.visibleIfLogical === 'and' ? values.every(v => v) : values.some(v => v))), distinctUntilChanged())
                .subscribe(visible => this.setVisible(visible));
        }
    }
    // #endregion
    updateFeedback(status = '') {
        this.ui.feedback = status;
        this.widget?.injector.get(NzFormStatusService).formStatusChanges.next({ status, hasFeedback: !!status });
        this.cd(true);
    }
}
export class PropertyGroup extends FormProperty {
    constructor() {
        super(...arguments);
        this.properties = null;
    }
    getProperty(path) {
        const subPathIdx = path.indexOf(SF_SEQ);
        const propertyId = subPathIdx !== -1 ? path.substring(0, subPathIdx) : path;
        let property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            const subPath = path.substring(subPathIdx + 1);
            property = property.getProperty(subPath);
        }
        return property;
    }
    forEachChild(fn) {
        for (const propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                const property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    }
    forEachChildRecursive(fn) {
        this.forEachChild(child => {
            fn(child);
            if (child instanceof PropertyGroup) {
                child.forEachChildRecursive(fn);
            }
        });
    }
    _bindVisibility() {
        super._bindVisibility();
        this._bindVisibilityRecursive();
    }
    _bindVisibilityRecursive() {
        this.forEachChildRecursive(property => {
            property._bindVisibility();
        });
    }
    isRoot() {
        return this === this.root;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5wcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm0vc3JjL21vZGVsL2Zvcm0ucHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFZLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUduRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUk5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBS2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJbkMsTUFBTSxPQUFnQixZQUFZO0lBa0JoQyxZQUNVLFFBQWtCLEVBQzFCLHNCQUE4QyxFQUM5QyxNQUFnQixFQUNoQixFQUErQixFQUMvQixRQUFpQyxFQUNqQyxNQUE0QixFQUM1QixJQUFZLEVBQ0osUUFBd0I7UUFQeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQU9sQixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQXpCMUIsWUFBTyxHQUF1QixJQUFJLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckcsbUJBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7UUFDL0QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQix1QkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUdoRSxlQUFVLEdBQW1DLEVBQUUsQ0FBQztRQUtoRCxXQUFNLEdBQVksSUFBSSxDQUFDO1FB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LGVBQWUsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgdGFrZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBZdW56YWlTRkNvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBOekZvcm1TdGF0dXNTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2Zvcm0nO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBOekZvcm1Db250cm9sU3RhdHVzVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZm9ybSc7XG5cbmltcG9ydCB7IFNGX1NFUSB9IGZyb20gJy4uL2NvbnN0JztcbmltcG9ydCB0eXBlIHsgRXJyb3JEYXRhIH0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCB0eXBlIHsgU0ZGb3JtVmFsdWVDaGFuZ2UsIFNGVXBkYXRlVmFsdWVBbmRWYWxpZGl0eSwgU0ZWYWx1ZSB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5pbXBvcnQgdHlwZSB7IFNGU2NoZW1hLCBTRlNjaGVtYVR5cGUgfSBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IHR5cGUgeyBTRlVJU2NoZW1hLCBTRlVJU2NoZW1hSXRlbSwgU0ZVSVNjaGVtYUl0ZW1SdW4sIFNGVmlzaWJsZUlmUmV0dXJuIH0gZnJvbSAnLi4vc2NoZW1hL3VpJztcbmltcG9ydCB7IGlzQmxhbmsgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi4vdmFsaWRhdG9yLmZhY3RvcnknO1xuaW1wb3J0IHR5cGUgeyBXaWRnZXQgfSBmcm9tICcuLi93aWRnZXQnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybVByb3BlcnR5IHtcbiAgcHJpdmF0ZSBfZXJyb3JzOiBFcnJvckRhdGFbXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNGRm9ybVZhbHVlQ2hhbmdlPih7IHBhdGg6IG51bGwsIHBhdGhWYWx1ZTogbnVsbCwgdmFsdWU6IG51bGwgfSk7XG4gIHByaXZhdGUgX2Vycm9yc0NoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVycm9yRGF0YVtdIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX3Zpc2libGUgPSB0cnVlO1xuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByaXZhdGUgX3Jvb3Q6IFByb3BlcnR5R3JvdXA7XG4gIHByaXZhdGUgX3BhcmVudDogUHJvcGVydHlHcm91cCB8IG51bGw7XG4gIF9vYmpFcnJvcnM6IHsgW2tleTogc3RyaW5nXTogRXJyb3JEYXRhW10gfSA9IHt9O1xuICBzY2hlbWFWYWxpZGF0b3I6ICh2YWx1ZTogU0ZWYWx1ZSkgPT4gRXJyb3JEYXRhW107XG4gIHNjaGVtYTogU0ZTY2hlbWE7XG4gIHVpOiBTRlVJU2NoZW1hIHwgU0ZVSVNjaGVtYUl0ZW1SdW47XG4gIGZvcm1EYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgX3ZhbHVlOiBTRlZhbHVlID0gbnVsbDtcbiAgd2lkZ2V0ITogV2lkZ2V0PEZvcm1Qcm9wZXJ0eSwgU0ZVSVNjaGVtYUl0ZW0+O1xuICBwYXRoOiBzdHJpbmc7XG4gIHByb3BlcnR5SWQ/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgc2NoZW1hVmFsaWRhdG9yRmFjdG9yeTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICBzY2hlbWE6IFNGU2NoZW1hLFxuICAgIHVpOiBTRlVJU2NoZW1hIHwgU0ZVSVNjaGVtYUl0ZW0sXG4gICAgZm9ybURhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgIHBhcmVudDogUHJvcGVydHlHcm91cCB8IG51bGwsXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIHByaXZhdGUgX29wdGlvbnM6IFl1bnphaVNGQ29uZmlnXG4gICkge1xuICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuICAgIHRoaXMudWkgPSB1aTtcbiAgICB0aGlzLnNjaGVtYVZhbGlkYXRvciA9IHNjaGVtYVZhbGlkYXRvckZhY3RvcnkuY3JlYXRlVmFsaWRhdG9yRm4oc2NoZW1hLCB7XG4gICAgICBpZ25vcmVLZXl3b3JkczogdGhpcy51aS5pZ25vcmVLZXl3b3JkcyBhcyBzdHJpbmdbXSxcbiAgICAgIGRlYnVnOiAodWkgYXMgU0ZVSVNjaGVtYUl0ZW0pIS5kZWJ1ZyFcbiAgICB9KTtcbiAgICB0aGlzLmZvcm1EYXRhID0gZm9ybURhdGEgfHwgc2NoZW1hLmRlZmF1bHQ7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSBwYXJlbnQucm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcm9vdCA9IHRoaXMgYXMgTnpTYWZlQW55O1xuICAgIH1cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG5cbiAgZ2V0IHZhbHVlQ2hhbmdlcygpOiBCZWhhdmlvclN1YmplY3Q8U0ZGb3JtVmFsdWVDaGFuZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVDaGFuZ2VzO1xuICB9XG5cbiAgZ2V0IGVycm9yc0NoYW5nZXMoKTogQmVoYXZpb3JTdWJqZWN0PEVycm9yRGF0YVtdIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnNDaGFuZ2VzO1xuICB9XG5cbiAgZ2V0IHR5cGUoKTogU0ZTY2hlbWFUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWEudHlwZSE7XG4gIH1cblxuICBnZXQgcGFyZW50KCk6IFByb3BlcnR5R3JvdXAgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgZ2V0IHJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogU0ZWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgZ2V0IGVycm9ycygpOiBFcnJvckRhdGFbXSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cblxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIGdldCB2YWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzID09PSBudWxsIHx8IHRoaXMuX2Vycm9ycy5sZW5ndGggPT09IDA7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpOiBZdW56YWlTRkNvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICog6K6+572u5YC8XG4gICAqXG4gICAqIEBwYXJhbSBvbmx5U2VsZiBgdHJ1ZWAg5Y+q5a+55b2T5YmN5a2X5q615pu05paw5YC85ZKM5qCh6aqM77ybYGZhbHNlYCDljIXlkKvkuIrnuqflrZfmrrVcbiAgICovXG4gIGFic3RyYWN0IHNldFZhbHVlKHZhbHVlOiBTRlZhbHVlLCBvbmx5U2VsZjogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIOmHjee9ruWAvO+8jOm7mOiupOWAvOS4uiBgc2NoZW1hLmRlZmF1bHRgXG4gICAqXG4gICAqIEBwYXJhbSBvbmx5U2VsZiBgdHJ1ZWAg5Y+q5a+55b2T5YmN5a2X5q615pu05paw5YC85ZKM5qCh6aqM77ybYGZhbHNlYCDljIXlkKvkuIrnuqflrZfmrrVcbiAgICovXG4gIGFic3RyYWN0IHJlc2V0VmFsdWUodmFsdWU6IFNGVmFsdWUsIG9ubHlTZWxmOiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBhYnN0cmFjdCBfaGFzVmFsdWUoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogIEBpbnRlcm5hbFxuICAgKi9cbiAgYWJzdHJhY3QgX3VwZGF0ZVZhbHVlKCk6IHZvaWQ7XG5cbiAgY2Qob25seVNlbGY6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMud2lkZ2V0Py5kZXRlY3RDaGFuZ2VzKG9ubHlTZWxmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrDlgLzkuJTmoKHpqozmlbDmja5cbiAgICovXG4gIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob3B0aW9ucz86IFNGVXBkYXRlVmFsdWVBbmRWYWxpZGl0eSk6IHZvaWQge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBvbmx5U2VsZjogZmFsc2UsXG4gICAgICBlbWl0VmFsaWRhdG9yOiB0cnVlLFxuICAgICAgZW1pdFZhbHVlRXZlbnQ6IHRydWUsXG4gICAgICB1cGRhdGVQYXRoOiAnJyxcbiAgICAgIHVwZGF0ZVZhbHVlOiBudWxsLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUoKTtcblxuICAgIGlmIChvcHRpb25zLmVtaXRWYWx1ZUV2ZW50KSB7XG4gICAgICBvcHRpb25zLnVwZGF0ZVBhdGggPSBvcHRpb25zLnVwZGF0ZVBhdGggfHwgdGhpcy5wYXRoO1xuICAgICAgb3B0aW9ucy51cGRhdGVWYWx1ZSA9IG9wdGlvbnMudXBkYXRlVmFsdWUgPT0gbnVsbCA/IHRoaXMudmFsdWUgOiBvcHRpb25zLnVwZGF0ZVZhbHVlO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZXMubmV4dCh7IHZhbHVlOiB0aGlzLnZhbHVlLCBwYXRoOiBvcHRpb25zLnVwZGF0ZVBhdGgsIHBhdGhWYWx1ZTogb3B0aW9ucy51cGRhdGVWYWx1ZSB9KTtcbiAgICB9XG5cbiAgICAvLyBgZW1pdFZhbGlkYXRvcmAg5q+P5LiA5qyh5pWw5o2u5Y+Y5pu05bey57uP5YyF5ZCr5a6M5pW06ZSZ6K+v6ZO+6Lev77yM5ZCO57ut54i26IqC54K55pWw5o2u5Y+Y5pu05peg6aG75YaN6Kem5Y+R5qCh6aqMXG4gICAgaWYgKG9wdGlvbnMuZW1pdFZhbGlkYXRvciAmJiB0aGlzLnVpLmxpdmVWYWxpZGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fcnVuVmFsaWRhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhb3B0aW9ucy5vbmx5U2VsZikge1xuICAgICAgdGhpcy5wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IC4uLm9wdGlvbnMsIGVtaXRWYWxpZGF0b3I6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDmoLnmja7ot6/lvoTmkJzntKLooajljZXlsZ7mgKcgKi9cbiAgc2VhcmNoUHJvcGVydHkocGF0aDogc3RyaW5nKTogRm9ybVByb3BlcnR5IHwgbnVsbCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gICAgbGV0IHByb3A6IEZvcm1Qcm9wZXJ0eSA9IHRoaXM7XG4gICAgbGV0IGJhc2U6IFByb3BlcnR5R3JvdXAgfCBudWxsID0gbnVsbDtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGlmIChwYXRoWzBdID09PSBTRl9TRVEpIHtcbiAgICAgIGJhc2UgPSB0aGlzLmZpbmRSb290KCk7XG4gICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGguc3Vic3RyaW5nKDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHJlc3VsdCA9PT0gbnVsbCAmJiBwcm9wLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwcm9wID0gYmFzZSA9IHByb3AucGFyZW50O1xuICAgICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0ITtcbiAgfVxuXG4gIC8qKiDmn6Xmib7moLnooajljZXlsZ7mgKcgKi9cbiAgZmluZFJvb3QoKTogUHJvcGVydHlHcm91cCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gICAgbGV0IHByb3BlcnR5OiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIHdoaWxlIChwcm9wZXJ0eS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gcHJvcGVydHkgYXMgUHJvcGVydHlHcm91cDtcbiAgfVxuXG4gIC8vICNyZWdpb24gcHJvY2VzcyBlcnJvcnNcblxuICBwcml2YXRlIGlzRW1wdHlEYXRhKHZhbHVlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IGJvb2xlYW4ge1xuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkgcmV0dXJuIHRydWU7XG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBgJHt2YWx1ZX1gLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3J1blZhbGlkYXRpb24oKTogdm9pZCB7XG4gICAgbGV0IGVycm9yczogRXJyb3JEYXRhW107XG4gICAgLy8gVGhlIGRlZmluaXRpb24gb2Ygc29tZSBydWxlczpcbiAgICAvLyAxLiBTaG91bGQgbm90IGFqdiB2YWxpZGF0b3Igd2hlbiBpcyBlbXB0eSBkYXRhIGFuZCByZXF1aXJlZCBmaWVsZHNcbiAgICAvLyAyLiBTaG91bGQgbm90IGFqdiB2YWxpZGF0b3Igd2hlbiBpcyBlbXB0eSBkYXRhXG4gICAgY29uc3QgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eURhdGEodGhpcy5fdmFsdWUpO1xuICAgIGlmIChpc0VtcHR5ICYmIHRoaXMudWkuX3JlcXVpcmVkKSB7XG4gICAgICBlcnJvcnMgPSBbeyBrZXl3b3JkOiAncmVxdWlyZWQnIH1dO1xuICAgIH0gZWxzZSBpZiAoaXNFbXB0eSkge1xuICAgICAgZXJyb3JzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9ycyA9IHRoaXMuc2NoZW1hVmFsaWRhdG9yKHRoaXMuX3ZhbHVlKSB8fCBbXTtcbiAgICB9XG4gICAgY29uc3QgY3VzdG9tVmFsaWRhdG9yID0gKHRoaXMudWkgYXMgU0ZVSVNjaGVtYUl0ZW1SdW4pLnZhbGlkYXRvcjtcbiAgICBpZiAodHlwZW9mIGN1c3RvbVZhbGlkYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgY3VzdG9tRXJyb3JzID0gY3VzdG9tVmFsaWRhdG9yKHRoaXMudmFsdWUsIHRoaXMsIHRoaXMuZmluZFJvb3QoKSk7XG4gICAgICBpZiAoY3VzdG9tRXJyb3JzIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICBjdXN0b21FcnJvcnMuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoZXJyb3JzLCByZXMpO1xuICAgICAgICAgIHRoaXMuY2QoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoZXJyb3JzLCBjdXN0b21FcnJvcnMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLnNldEVycm9ycyh0aGlzLl9lcnJvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXN0b21FcnJvcnMoZXJyb3JzOiBFcnJvckRhdGFbXSwgbGlzdDogRXJyb3JEYXRhW10pOiB2b2lkIHtcbiAgICBjb25zdCBoYXNDdXN0b21FcnJvciA9IEFycmF5LmlzQXJyYXkobGlzdCkgJiYgbGlzdC5sZW5ndGggPiAwO1xuICAgIGlmIChoYXNDdXN0b21FcnJvcikge1xuICAgICAgbGlzdC5mb3JFYWNoKGVyciA9PiB7XG4gICAgICAgIGlmICghZXJyLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBjdXN0b20gdmFsaWRhdG9yIG11c3QgY29udGFpbiBhICdtZXNzYWdlJyBhdHRyaWJ1dGUgdG8gdmlld2VkIGVycm9yIHRleHRgKTtcbiAgICAgICAgfVxuICAgICAgICBlcnIua2V5d29yZCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZXJyb3JzID0gaGFzQ3VzdG9tRXJyb3IgPyBlcnJvcnMuY29uY2F0KC4uLmxpc3QpIDogZXJyb3JzO1xuICAgIHRoaXMuc2V0RXJyb3JzKHRoaXMuX2Vycm9ycyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICog6K6+572u5b2T5YmN6ZSZ6K+v5raI5oGvXG4gICAqXG4gICAqIEBwYXJhbSBlbWl0Rm9ybWF0IOiLpeaPkOS+m+eahOa2iOaBr+W4puaciSBge3h4fWAg5Lya6Ieq5Yqo5qC55o2u5Y+C5pWw6L+b6KGM6L2s5YyW77yM5YyF5ZCr6Ieq5a6a5LmJ5Ye95pWwXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHRoaXMuc2YuZ2V0UHJvcGVydHkoJy9uYW1lJyk/LnNldEVycm9ycyh7IGtleXdvcmQ6ICdyZXF1aXJlZCcgfSk7XG4gICAqIHRoaXMuc2YuZ2V0UHJvcGVydHkoJy9uYW1lJyk/LnNldEVycm9ycyh7IG1lc3NhZ2U6ICdQbGVhc2UgaW5wdXQgeW91ciB1c2VybmFtZSEnIH0pO1xuICAgKiB0aGlzLnNmLmdldFByb3BlcnR5KCcvbmFtZScpPy5zZXRFcnJvcnMoKTsgLy8gQ2xlYW4gZXJyb3JcbiAgICovXG4gIHNldEVycm9ycyhlcnJvcnM6IEVycm9yRGF0YSB8IEVycm9yRGF0YVtdID0gW10sIGVtaXRGb3JtYXQ6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgbGV0IGFyckVycnMgPSBBcnJheS5pc0FycmF5KGVycm9ycykgPyBlcnJvcnMgOiBbZXJyb3JzXTtcblxuICAgIGlmIChlbWl0Rm9ybWF0ICYmIGFyckVycnMgJiYgIXRoaXMudWkub25seVZpc3VhbCkge1xuICAgICAgY29uc3QgbCA9ICh0aGlzLndpZGdldCAmJiB0aGlzLndpZGdldC5sLmVycm9yKSB8fCB7fTtcbiAgICAgIGFyckVycnMgPSBhcnJFcnJzLm1hcCgoZXJyOiBFcnJvckRhdGEpID0+IHtcbiAgICAgICAgbGV0IG1lc3NhZ2U6IHN0cmluZyB8ICgoZXJyOiBFcnJvckRhdGEpID0+IHN0cmluZykgPVxuICAgICAgICAgIGVyci5rZXl3b3JkID09IG51bGwgJiYgZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgID8gZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgIDogKHRoaXMudWkuZXJyb3JzIHx8IHt9KVtlcnIua2V5d29yZCFdIHx8IHRoaXMuX29wdGlvbnMuZXJyb3JzIVtlcnIua2V5d29yZCFdIHx8IGxbZXJyLmtleXdvcmQhXSB8fCBgYDtcblxuICAgICAgICBpZiAobWVzc2FnZSAmJiB0eXBlb2YgbWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgIGlmICh+bWVzc2FnZS5pbmRleE9mKCd7JykgJiYgZXJyLnBhcmFtcykge1xuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgveyhbXFwuYS16QS1aMC05XSspfS9nLCAoX3Y6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IGVyci5wYXJhbXMhW2tleV0gfHwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnIubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9lcnJvcnMgPSBhcnJFcnJzO1xuICAgIHRoaXMuX2Vycm9yc0NoYW5nZXMubmV4dChhcnJFcnJzKTtcbiAgICAvLyBTaG91bGQgc2VuZCBlcnJvcnMgdG8gcGFyZW50IGZpZWxkXG4gICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgdGhpcy5fcGFyZW50LnNldFBhcmVudEFuZFBsYXRFcnJvcnMoYXJyRXJycywgdGhpcy5wYXRoKTtcbiAgICB9XG4gIH1cblxuICBzZXRQYXJlbnRBbmRQbGF0RXJyb3JzKGVycm9yczogRXJyb3JEYXRhW10sIHBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29iakVycm9yc1twYXRoXSA9IGVycm9ycztcbiAgICBjb25zdCBwbGF0RXJyb3JzOiBFcnJvckRhdGFbXSA9IFtdO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX29iakVycm9ycykuZm9yRWFjaChwID0+IHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGhpcy5zZWFyY2hQcm9wZXJ0eShwKTtcbiAgICAgIGlmIChwcm9wZXJ0eSAmJiAhcHJvcGVydHkudmlzaWJsZSkgcmV0dXJuO1xuICAgICAgcGxhdEVycm9ycy5wdXNoKC4uLnRoaXMuX29iakVycm9yc1twXSk7XG4gICAgfSk7XG4gICAgdGhpcy5zZXRFcnJvcnMocGxhdEVycm9ycywgZmFsc2UpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29uZGl0aW9uXG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaGlkZSBvciBkaXNwbGF5IG9mIHdpZGdldFxuICAgKiDorr7nva7lsI/pg6jku7bnmoTpmpDol4/miJbmmL7npLpcbiAgICovXG4gIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHRoaXMge1xuICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2VzLm5leHQodmlzaWJsZSk7XG4gICAgLy8g5riy5p+T5pe26ZyA6KaB6YeN5paw6Kem5Y+RIHJlc2V0XG4gICAgaWYgKHZpc2libGUpIHtcbiAgICAgIHRoaXMuaW5qZWN0b3JcbiAgICAgICAgLmdldChOZ1pvbmUpXG4gICAgICAgIC5vblN0YWJsZS5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzZXRWYWx1ZSh0aGlzLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2JpbmRWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIGNvbnN0IHZpc2libGVJZiA9ICh0aGlzLnVpIGFzIFNGVUlTY2hlbWFJdGVtKS52aXNpYmxlSWY7XG4gICAgaWYgKHR5cGVvZiB2aXNpYmxlSWYgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZpc2libGVJZikubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHByb3BlcnRpZXNCaW5kaW5nOiBBcnJheTxPYnNlcnZhYmxlPGJvb2xlYW4+PiA9IFtdO1xuICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5UGF0aCBpbiB2aXNpYmxlSWYpIHtcbiAgICAgICAgaWYgKHZpc2libGVJZi5oYXNPd25Qcm9wZXJ0eShkZXBlbmRlbmN5UGF0aCkpIHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuc2VhcmNoUHJvcGVydHkoZGVwZW5kZW5jeVBhdGgpO1xuICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aSA9IHZpc2libGVJZltkZXBlbmRlbmN5UGF0aF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmlGblJlcyA9IHZpKHJlcy52YWx1ZSwgcHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgLy8g5ZCM5q2l5pu05pawIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZpRm5SZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpeFZpRm5SZXMgPSB7IHNob3c6IGZhbHNlLCByZXF1aXJlZDogZmFsc2UsIC4uLnZpRm5SZXMgfSBhcyBTRlZpc2libGVJZlJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50UmVxdWlyZWQgPSB0aGlzLnBhcmVudD8uc2NoZW1hLnJlcXVpcmVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50UmVxdWlyZWQgJiYgdGhpcy5wcm9wZXJ0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gcGFyZW50UmVxdWlyZWQuZmluZEluZGV4KHcgPT4gdyA9PT0gdGhpcy5wcm9wZXJ0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZml4VmlGblJlcy5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHBhcmVudFJlcXVpcmVkLnB1c2godGhpcy5wcm9wZXJ0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHBhcmVudFJlcXVpcmVkLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVpLl9yZXF1aXJlZCA9IGZpeFZpRm5SZXMucmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpeFZpRm5SZXMuc2hvdztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB2aUZuUmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmkuaW5kZXhPZignJEFOWSQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXMudmFsdWUgJiYgcmVzLnZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2aS5pbmRleE9mKHJlcy52YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdKS5waXBlKG1hcChyZXN1bHRzID0+IHJlc3VsdHNbMF0gJiYgcmVzdWx0c1sxXSkpO1xuICAgICAgICAgICAgcHJvcGVydGllc0JpbmRpbmcucHVzaChhbmQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FuJ3QgZmluZCBwcm9wZXJ0eSAke2RlcGVuZGVuY3lQYXRofSBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAke3RoaXMucGF0aH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29tYmluZUxhdGVzdChwcm9wZXJ0aWVzQmluZGluZylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKHZhbHVlcyA9PiAodGhpcy51aS52aXNpYmxlSWZMb2dpY2FsID09PSAnYW5kJyA/IHZhbHVlcy5ldmVyeSh2ID0+IHYpIDogdmFsdWVzLnNvbWUodiA9PiB2KSkpLFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKHZpc2libGUgPT4gdGhpcy5zZXRWaXNpYmxlKHZpc2libGUpKTtcbiAgICB9XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgdXBkYXRlRmVlZGJhY2soc3RhdHVzOiBOekZvcm1Db250cm9sU3RhdHVzVHlwZSA9ICcnKTogdm9pZCB7XG4gICAgdGhpcy51aS5mZWVkYmFjayA9IHN0YXR1cztcbiAgICB0aGlzLndpZGdldD8uaW5qZWN0b3IuZ2V0KE56Rm9ybVN0YXR1c1NlcnZpY2UpLmZvcm1TdGF0dXNDaGFuZ2VzLm5leHQoeyBzdGF0dXMsIGhhc0ZlZWRiYWNrOiAhIXN0YXR1cyB9KTtcbiAgICB0aGlzLmNkKHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdyb3VwIGV4dGVuZHMgRm9ybVByb3BlcnR5IHtcbiAgcHJvcGVydGllczogeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSB8IEZvcm1Qcm9wZXJ0eVtdIHwgbnVsbCA9IG51bGw7XG5cbiAgZ2V0UHJvcGVydHkocGF0aDogc3RyaW5nKTogRm9ybVByb3BlcnR5IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBzdWJQYXRoSWR4ID0gcGF0aC5pbmRleE9mKFNGX1NFUSk7XG4gICAgY29uc3QgcHJvcGVydHlJZCA9IHN1YlBhdGhJZHggIT09IC0xID8gcGF0aC5zdWJzdHJpbmcoMCwgc3ViUGF0aElkeCkgOiBwYXRoO1xuXG4gICAgbGV0IHByb3BlcnR5ID0gKHRoaXMucHJvcGVydGllcyBhcyB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9KVtwcm9wZXJ0eUlkXTtcbiAgICBpZiAocHJvcGVydHkgIT09IG51bGwgJiYgc3ViUGF0aElkeCAhPT0gLTEgJiYgcHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICBjb25zdCBzdWJQYXRoID0gcGF0aC5zdWJzdHJpbmcoc3ViUGF0aElkeCArIDEpO1xuICAgICAgcHJvcGVydHkgPSAocHJvcGVydHkgYXMgUHJvcGVydHlHcm91cCkuZ2V0UHJvcGVydHkoc3ViUGF0aCkhO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcGVydHk7XG4gIH1cblxuICBmb3JFYWNoQ2hpbGQoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSwgc3RyOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5SWQgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gKHRoaXMucHJvcGVydGllcyBhcyB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9KVtwcm9wZXJ0eUlkXTtcbiAgICAgICAgZm4ocHJvcGVydHksIHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGQoY2hpbGQgPT4ge1xuICAgICAgZm4oY2hpbGQpO1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICAoY2hpbGQgYXMgUHJvcGVydHlHcm91cCkuZm9yRWFjaENoaWxkUmVjdXJzaXZlKGZuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9iaW5kVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICBzdXBlci5fYmluZFZpc2liaWxpdHkoKTtcbiAgICB0aGlzLl9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmluZFZpc2liaWxpdHlSZWN1cnNpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5mb3JFYWNoQ2hpbGRSZWN1cnNpdmUocHJvcGVydHkgPT4ge1xuICAgICAgcHJvcGVydHkuX2JpbmRWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG4gIH1cblxuICBpc1Jvb3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMgPT09IHRoaXMucm9vdDtcbiAgfVxufVxuIl19