import { deepCopy } from '@yelon/util/other';
import { SF_SEQ } from '../const';
import { PropertyGroup } from './form.property';
import { ObjectProperty } from './object.property';
export class ArrayProperty extends PropertyGroup {
    constructor(injector, formPropertyFactory, schemaValidatorFactory, schema, ui, formData, parent, path, options) {
        super(injector, schemaValidatorFactory, schema, ui, formData, parent, path, options);
        this.formPropertyFactory = formPropertyFactory;
        this.properties = [];
    }
    getProperty(path) {
        const subPathIdx = path.indexOf(SF_SEQ);
        const pos = +(subPathIdx !== -1 ? path.substring(0, subPathIdx) : path);
        const list = this.properties;
        if (isNaN(pos) || pos >= list.length) {
            return undefined;
        }
        const subPath = path.substring(subPathIdx + 1);
        return list[pos].getProperty(subPath);
    }
    setValue(value, onlySelf) {
        this.properties = [];
        this.clearErrors();
        this.resetProperties(value);
        this.cd(onlySelf);
        this.updateValueAndValidity({ onlySelf, emitValueEvent: true });
    }
    resetValue(value, onlySelf) {
        this._value = value || this.schema.default || [];
        this.setValue(this._value, onlySelf);
    }
    _hasValue() {
        return true;
    }
    _updateValue() {
        const value = [];
        this.forEachChild((property) => {
            if (property.visible) {
                value.push({ ...(this.widget?.cleanValue ? null : property.formData), ...property.value });
            }
        });
        this._value = value;
    }
    addProperty(formData) {
        const newProperty = this.formPropertyFactory.createProperty(deepCopy(this.schema.items), deepCopy(this.ui.$items), formData, this);
        this.properties.push(newProperty);
        return newProperty;
    }
    resetProperties(formDatas) {
        for (const item of formDatas) {
            const property = this.addProperty(item);
            property.resetValue(item, true);
        }
    }
    clearErrors(property) {
        (property || this)._objErrors = {};
    }
    // #region actions
    add(formData) {
        const newProperty = this.addProperty(formData);
        newProperty.resetValue(formData, false);
        return newProperty;
    }
    remove(index) {
        const list = this.properties;
        this.clearErrors();
        list.splice(index, 1);
        list.forEach((property, idx) => {
            property.path = [property.parent.path, idx].join(SF_SEQ);
            this.clearErrors(property);
            // TODO: 受限于 sf 的设计思路，对于移除数组项需要重新对每个子项进行校验，防止错误被父级合并后引起始终是错误的现象
            if (property instanceof ObjectProperty) {
                property.forEachChild(p => {
                    p.updateValueAndValidity({ emitValueEvent: false });
                });
            }
        });
        if (list.length === 0) {
            this.updateValueAndValidity();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkucHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3JtL3NyYy9tb2RlbC9hcnJheS5wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUtsQyxPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7SUFDOUMsWUFDRSxRQUFrQixFQUNWLG1CQUF3QyxFQUNoRCxzQkFBOEMsRUFDOUMsTUFBZ0IsRUFDaEIsRUFBK0IsRUFDL0IsUUFBaUMsRUFDakMsTUFBNEIsRUFDNUIsSUFBWSxFQUNaLE9BQXVCO1FBRXZCLEtBQUssQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQVQ3RSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBVWhELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBWTtRQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBNkIsQ0FB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Q0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWE7UUFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQTRCLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDN0IsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLCtEQUErRDtZQUMvRCxJQUFJLFFBQVEsWUFBWSxjQUFjLEVBQUUsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDeEIsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0NBR0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZdW56YWlTRkNvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgeyBkZWVwQ29weSB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgU0ZfU0VRIH0gZnJvbSAnLi4vY29uc3QnO1xuaW1wb3J0IHsgU0ZWYWx1ZSB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBTRlNjaGVtYSB9IGZyb20gJy4uL3NjaGVtYS9pbmRleCc7XG5pbXBvcnQgeyBTRlVJU2NoZW1hLCBTRlVJU2NoZW1hSXRlbSB9IGZyb20gJy4uL3NjaGVtYS91aSc7XG5pbXBvcnQgeyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi4vdmFsaWRhdG9yLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybVByb3BlcnR5LCBQcm9wZXJ0eUdyb3VwIH0gZnJvbSAnLi9mb3JtLnByb3BlcnR5JztcbmltcG9ydCB7IEZvcm1Qcm9wZXJ0eUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0ucHJvcGVydHkuZmFjdG9yeSc7XG5pbXBvcnQgeyBPYmplY3RQcm9wZXJ0eSB9IGZyb20gJy4vb2JqZWN0LnByb3BlcnR5JztcblxuZXhwb3J0IGNsYXNzIEFycmF5UHJvcGVydHkgZXh0ZW5kcyBQcm9wZXJ0eUdyb3VwIHtcbiAgY29uc3RydWN0b3IoXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgIHNjaGVtYTogU0ZTY2hlbWEsXG4gICAgdWk6IFNGVUlTY2hlbWEgfCBTRlVJU2NoZW1hSXRlbSxcbiAgICBmb3JtRGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwIHwgbnVsbCxcbiAgICBwYXRoOiBzdHJpbmcsXG4gICAgb3B0aW9uczogWXVuemFpU0ZDb25maWdcbiAgKSB7XG4gICAgc3VwZXIoaW5qZWN0b3IsIHNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHNjaGVtYSwgdWksIGZvcm1EYXRhLCBwYXJlbnQsIHBhdGgsIG9wdGlvbnMpO1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICB9XG5cbiAgZ2V0UHJvcGVydHkocGF0aDogc3RyaW5nKTogRm9ybVByb3BlcnR5IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBzdWJQYXRoSWR4ID0gcGF0aC5pbmRleE9mKFNGX1NFUSk7XG4gICAgY29uc3QgcG9zID0gKyhzdWJQYXRoSWR4ICE9PSAtMSA/IHBhdGguc3Vic3RyaW5nKDAsIHN1YlBhdGhJZHgpIDogcGF0aCk7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMucHJvcGVydGllcyBhcyBQcm9wZXJ0eUdyb3VwW107XG4gICAgaWYgKGlzTmFOKHBvcykgfHwgcG9zID49IGxpc3QubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBzdWJQYXRoID0gcGF0aC5zdWJzdHJpbmcoc3ViUGF0aElkeCArIDEpO1xuICAgIHJldHVybiBsaXN0W3Bvc10uZ2V0UHJvcGVydHkoc3ViUGF0aCk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogU0ZWYWx1ZSwgb25seVNlbGY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgdGhpcy5yZXNldFByb3BlcnRpZXModmFsdWUpO1xuICAgIHRoaXMuY2Qob25seVNlbGYpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IG9ubHlTZWxmLCBlbWl0VmFsdWVFdmVudDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHJlc2V0VmFsdWUodmFsdWU6IFNGVmFsdWUsIG9ubHlTZWxmOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZSB8fCB0aGlzLnNjaGVtYS5kZWZhdWx0IHx8IFtdO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5fdmFsdWUsIG9ubHlTZWxmKTtcbiAgfVxuXG4gIF9oYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIF91cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZTogTnpTYWZlQW55W10gPSBbXTtcbiAgICB0aGlzLmZvckVhY2hDaGlsZCgocHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5LnZpc2libGUpIHtcbiAgICAgICAgdmFsdWUucHVzaCh7IC4uLih0aGlzLndpZGdldD8uY2xlYW5WYWx1ZSA/IG51bGwgOiBwcm9wZXJ0eS5mb3JtRGF0YSksIC4uLnByb3BlcnR5LnZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGFkZFByb3BlcnR5KGZvcm1EYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgY29uc3QgbmV3UHJvcGVydHkgPSB0aGlzLmZvcm1Qcm9wZXJ0eUZhY3RvcnkuY3JlYXRlUHJvcGVydHkoXG4gICAgICBkZWVwQ29weSh0aGlzLnNjaGVtYS5pdGVtcyEpLFxuICAgICAgZGVlcENvcHkodGhpcy51aS4kaXRlbXMpLFxuICAgICAgZm9ybURhdGEsXG4gICAgICB0aGlzIGFzIFByb3BlcnR5R3JvdXBcbiAgICApIGFzIE9iamVjdFByb3BlcnR5O1xuICAgICh0aGlzLnByb3BlcnRpZXMgYXMgRm9ybVByb3BlcnR5W10pLnB1c2gobmV3UHJvcGVydHkpO1xuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRQcm9wZXJ0aWVzKGZvcm1EYXRhczogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGZvcm1EYXRhcykge1xuICAgICAgY29uc3QgcHJvcGVydHkgPSB0aGlzLmFkZFByb3BlcnR5KGl0ZW0pO1xuICAgICAgcHJvcGVydHkucmVzZXRWYWx1ZShpdGVtLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRXJyb3JzKHByb3BlcnR5PzogRm9ybVByb3BlcnR5KTogdm9pZCB7XG4gICAgKHByb3BlcnR5IHx8IHRoaXMpLl9vYmpFcnJvcnMgPSB7fTtcbiAgfVxuXG4gIC8vICNyZWdpb24gYWN0aW9uc1xuXG4gIGFkZChmb3JtRGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBGb3JtUHJvcGVydHkge1xuICAgIGNvbnN0IG5ld1Byb3BlcnR5ID0gdGhpcy5hZGRQcm9wZXJ0eShmb3JtRGF0YSk7XG4gICAgbmV3UHJvcGVydHkucmVzZXRWYWx1ZShmb3JtRGF0YSwgZmFsc2UpO1xuICAgIHJldHVybiBuZXdQcm9wZXJ0eTtcbiAgfVxuXG4gIHJlbW92ZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMucHJvcGVydGllcyBhcyBGb3JtUHJvcGVydHlbXTtcbiAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG4gICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGxpc3QuZm9yRWFjaCgocHJvcGVydHksIGlkeCkgPT4ge1xuICAgICAgcHJvcGVydHkucGF0aCA9IFtwcm9wZXJ0eS5wYXJlbnQhLnBhdGgsIGlkeF0uam9pbihTRl9TRVEpO1xuICAgICAgdGhpcy5jbGVhckVycm9ycyhwcm9wZXJ0eSk7XG4gICAgICAvLyBUT0RPOiDlj5fpmZDkuo4gc2Yg55qE6K6+6K6h5oCd6Lev77yM5a+55LqO56e76Zmk5pWw57uE6aG56ZyA6KaB6YeN5paw5a+55q+P5Liq5a2Q6aG56L+b6KGM5qCh6aqM77yM6Ziy5q2i6ZSZ6K+v6KKr54i257qn5ZCI5bm25ZCO5byV6LW35aeL57uI5piv6ZSZ6K+v55qE546w6LGhXG4gICAgICBpZiAocHJvcGVydHkgaW5zdGFuY2VvZiBPYmplY3RQcm9wZXJ0eSkge1xuICAgICAgICBwcm9wZXJ0eS5mb3JFYWNoQ2hpbGQocCA9PiB7XG4gICAgICAgICAgcC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdFZhbHVlRXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cbn1cbiJdfQ==