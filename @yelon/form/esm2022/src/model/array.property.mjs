import { deepCopy } from '@yelon/util/other';
import { PropertyGroup } from './form.property';
import { ObjectProperty } from './object.property';
import { SF_SEQ } from '../const';
export class ArrayProperty extends PropertyGroup {
    constructor(formPropertyFactory, schemaValidatorFactory, schema, ui, formData, parent, path, options) {
        super(schemaValidatorFactory, schema, ui, formData, parent, path, options);
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
                    p.updateValueAndValidity();
                });
            }
        });
        if (list.length === 0) {
            this.updateValueAndValidity();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkucHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3JtL3NyYy9tb2RlbC9hcnJheS5wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHN0MsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQU1sQyxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7SUFDOUMsWUFDVSxtQkFBd0MsRUFDaEQsc0JBQThDLEVBQzlDLE1BQWdCLEVBQ2hCLEVBQStCLEVBQy9CLFFBQWlDLEVBQ2pDLE1BQTRCLEVBQzVCLElBQVksRUFDWixPQUF1QjtRQUV2QixLQUFLLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQVRuRSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBVWhELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBWTtRQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBNkIsQ0FBQztRQUNoRCxJQUFJLEtBQUssQ0FB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LEdBQUcsSUFBSSxDQUFDLFVBQTRCLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDN0IsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLCtEQUErRDtZQUMvRCxJQUFJLFFBQVEsWUFBWSxjQUFjLEVBQUU7Z0JBQ3RDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3hCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgWXVuemFpU0ZDb25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgZGVlcENvcHkgfSBmcm9tICdAeWVsb24vdXRpbC9vdGhlcic7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IEZvcm1Qcm9wZXJ0eSwgUHJvcGVydHlHcm91cCB9IGZyb20gJy4vZm9ybS5wcm9wZXJ0eSc7XG5pbXBvcnQgeyBGb3JtUHJvcGVydHlGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLnByb3BlcnR5LmZhY3RvcnknO1xuaW1wb3J0IHsgT2JqZWN0UHJvcGVydHkgfSBmcm9tICcuL29iamVjdC5wcm9wZXJ0eSc7XG5pbXBvcnQgeyBTRl9TRVEgfSBmcm9tICcuLi9jb25zdCc7XG5pbXBvcnQgeyBTRlZhbHVlIH0gZnJvbSAnLi4vaW50ZXJmYWNlJztcbmltcG9ydCB7IFNGU2NoZW1hIH0gZnJvbSAnLi4vc2NoZW1hL2luZGV4JztcbmltcG9ydCB7IFNGVUlTY2hlbWEsIFNGVUlTY2hlbWFJdGVtIH0gZnJvbSAnLi4vc2NoZW1hL3VpJztcbmltcG9ydCB7IFNjaGVtYVZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuLi92YWxpZGF0b3IuZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBBcnJheVByb3BlcnR5IGV4dGVuZHMgUHJvcGVydHlHcm91cCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybVByb3BlcnR5RmFjdG9yeTogRm9ybVByb3BlcnR5RmFjdG9yeSxcbiAgICBzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgIHNjaGVtYTogU0ZTY2hlbWEsXG4gICAgdWk6IFNGVUlTY2hlbWEgfCBTRlVJU2NoZW1hSXRlbSxcbiAgICBmb3JtRGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwIHwgbnVsbCxcbiAgICBwYXRoOiBzdHJpbmcsXG4gICAgb3B0aW9uczogWXVuemFpU0ZDb25maWdcbiAgKSB7XG4gICAgc3VwZXIoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgc2NoZW1hLCB1aSwgZm9ybURhdGEsIHBhcmVudCwgcGF0aCwgb3B0aW9ucyk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gIH1cblxuICBnZXRQcm9wZXJ0eShwYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHN1YlBhdGhJZHggPSBwYXRoLmluZGV4T2YoU0ZfU0VRKTtcbiAgICBjb25zdCBwb3MgPSArKHN1YlBhdGhJZHggIT09IC0xID8gcGF0aC5zdWJzdHJpbmcoMCwgc3ViUGF0aElkeCkgOiBwYXRoKTtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5wcm9wZXJ0aWVzIGFzIFByb3BlcnR5R3JvdXBbXTtcbiAgICBpZiAoaXNOYU4ocG9zKSB8fCBwb3MgPj0gbGlzdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHN1YlBhdGggPSBwYXRoLnN1YnN0cmluZyhzdWJQYXRoSWR4ICsgMSk7XG4gICAgcmV0dXJuIGxpc3RbcG9zXS5nZXRQcm9wZXJ0eShzdWJQYXRoKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBTRlZhbHVlLCBvbmx5U2VsZjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICB0aGlzLnJlc2V0UHJvcGVydGllcyh2YWx1ZSk7XG4gICAgdGhpcy5jZChvbmx5U2VsZik7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgb25seVNlbGYsIGVtaXRWYWx1ZUV2ZW50OiB0cnVlIH0pO1xuICB9XG5cbiAgcmVzZXRWYWx1ZSh2YWx1ZTogU0ZWYWx1ZSwgb25seVNlbGY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlIHx8IHRoaXMuc2NoZW1hLmRlZmF1bHQgfHwgW107XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLl92YWx1ZSwgb25seVNlbGYpO1xuICB9XG5cbiAgX2hhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgX3VwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlOiBOelNhZmVBbnlbXSA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChwcm9wZXJ0eTogRm9ybVByb3BlcnR5KSA9PiB7XG4gICAgICBpZiAocHJvcGVydHkudmlzaWJsZSkge1xuICAgICAgICB2YWx1ZS5wdXNoKHsgLi4uKHRoaXMud2lkZ2V0Py5jbGVhblZhbHVlID8gbnVsbCA6IHByb3BlcnR5LmZvcm1EYXRhKSwgLi4ucHJvcGVydHkudmFsdWUgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUHJvcGVydHkoZm9ybURhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRm9ybVByb3BlcnR5IHtcbiAgICBjb25zdCBuZXdQcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5RmFjdG9yeS5jcmVhdGVQcm9wZXJ0eShcbiAgICAgIGRlZXBDb3B5KHRoaXMuc2NoZW1hLml0ZW1zISksXG4gICAgICBkZWVwQ29weSh0aGlzLnVpLiRpdGVtcyksXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIHRoaXMgYXMgUHJvcGVydHlHcm91cFxuICAgICkgYXMgT2JqZWN0UHJvcGVydHk7XG4gICAgKHRoaXMucHJvcGVydGllcyBhcyBGb3JtUHJvcGVydHlbXSkucHVzaChuZXdQcm9wZXJ0eSk7XG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFByb3BlcnRpZXMoZm9ybURhdGFzOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZm9ybURhdGFzKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuYWRkUHJvcGVydHkoaXRlbSk7XG4gICAgICBwcm9wZXJ0eS5yZXNldFZhbHVlKGl0ZW0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJFcnJvcnMocHJvcGVydHk/OiBGb3JtUHJvcGVydHkpOiB2b2lkIHtcbiAgICAocHJvcGVydHkgfHwgdGhpcykuX29iakVycm9ycyA9IHt9O1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBhY3Rpb25zXG5cbiAgYWRkKGZvcm1EYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEZvcm1Qcm9wZXJ0eSB7XG4gICAgY29uc3QgbmV3UHJvcGVydHkgPSB0aGlzLmFkZFByb3BlcnR5KGZvcm1EYXRhKTtcbiAgICBuZXdQcm9wZXJ0eS5yZXNldFZhbHVlKGZvcm1EYXRhLCBmYWxzZSk7XG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcmVtb3ZlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5wcm9wZXJ0aWVzIGFzIEZvcm1Qcm9wZXJ0eVtdO1xuICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcbiAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgbGlzdC5mb3JFYWNoKChwcm9wZXJ0eSwgaWR4KSA9PiB7XG4gICAgICBwcm9wZXJ0eS5wYXRoID0gW3Byb3BlcnR5LnBhcmVudCEucGF0aCwgaWR4XS5qb2luKFNGX1NFUSk7XG4gICAgICB0aGlzLmNsZWFyRXJyb3JzKHByb3BlcnR5KTtcbiAgICAgIC8vIFRPRE86IOWPl+mZkOS6jiBzZiDnmoTorr7orqHmgJ3ot6/vvIzlr7nkuo7np7vpmaTmlbDnu4TpobnpnIDopoHph43mlrDlr7nmr4/kuKrlrZDpobnov5vooYzmoKHpqozvvIzpmLLmraLplJnor6/ooqvniLbnuqflkIjlubblkI7lvJXotbflp4vnu4jmmK/plJnor6/nmoTnjrDosaFcbiAgICAgIGlmIChwcm9wZXJ0eSBpbnN0YW5jZW9mIE9iamVjdFByb3BlcnR5KSB7XG4gICAgICAgIHByb3BlcnR5LmZvckVhY2hDaGlsZChwID0+IHtcbiAgICAgICAgICBwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG59XG4iXX0=