import { deepGet } from '@yelon/util/other';
/**
 * String formatting
 *
 * 字符串格式化
 * ```
 * format('this is ${name}', { name: 'asdf' })
 * // output: this is asdf
 * format('this is ${user.name}', { user: { name: 'asdf' } }, true)
 * // output: this is asdf
 * ```
 */
export function format(str, obj, needDeepGet = false) {
    return (str || '').replace(/\${([^}]+)}/g, (_work, key) => needDeepGet ? deepGet(obj, key.split('.'), '') : (obj || {})[key] || '');
}
/**
 * Format mask
 *
 * 格式化掩码
 * ```ts
 * formatMask('123', '(###)') => (123)
 * ```
 */
export function formatMask(value, mask) {
    if (!value) {
        return '';
    }
    const splitValue = value.split('');
    return mask
        .split('')
        .reduce((res, cur) => {
        if (cur === '#') {
            if (splitValue.length > 0) {
                res.push(splitValue.shift());
            }
        }
        else {
            res.push(cur);
        }
        return res;
    }, [])
        .join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdXRpbC9mb3JtYXQvc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU1Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FDcEIsR0FBOEIsRUFDOUIsR0FBaUMsRUFDakMsY0FBdUIsS0FBSztJQUU1QixPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFhLEVBQUUsR0FBVyxFQUFFLEVBQUUsQ0FDeEUsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FDeEUsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFhLEVBQUUsSUFBWTtJQUNwRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJO1NBQ1IsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNuQixJQUFJLEdBQUcsS0FBSyxHQUFHLEVBQUU7WUFDZixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUcsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQWMsQ0FBQztTQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBkZWVwR2V0IH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuXG4vKipcbiAqIFN0cmluZyBmb3JtYXR0aW5nXG4gKlxuICog5a2X56ym5Liy5qC85byP5YyWXG4gKiBgYGBcbiAqIGZvcm1hdCgndGhpcyBpcyAke25hbWV9JywgeyBuYW1lOiAnYXNkZicgfSlcbiAqIC8vIG91dHB1dDogdGhpcyBpcyBhc2RmXG4gKiBmb3JtYXQoJ3RoaXMgaXMgJHt1c2VyLm5hbWV9JywgeyB1c2VyOiB7IG5hbWU6ICdhc2RmJyB9IH0sIHRydWUpXG4gKiAvLyBvdXRwdXQ6IHRoaXMgaXMgYXNkZlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoXG4gIHN0cjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgb2JqOiBOelNhZmVBbnkgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBuZWVkRGVlcEdldDogYm9vbGVhbiA9IGZhbHNlXG4pOiBzdHJpbmcge1xuICByZXR1cm4gKHN0ciB8fCAnJykucmVwbGFjZSgvXFwkeyhbXn1dKyl9L2csIChfd29yazogc3RyaW5nLCBrZXk6IHN0cmluZykgPT5cbiAgICBuZWVkRGVlcEdldCA/IGRlZXBHZXQob2JqLCBrZXkuc3BsaXQoJy4nKSwgJycpIDogKG9iaiB8fCB7fSlba2V5XSB8fCAnJ1xuICApO1xufVxuXG4vKipcbiAqIEZvcm1hdCBtYXNrXG4gKlxuICog5qC85byP5YyW5o6p56CBXG4gKiBgYGB0c1xuICogZm9ybWF0TWFzaygnMTIzJywgJygjIyMpJykgPT4gKDEyMylcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TWFzayh2YWx1ZTogc3RyaW5nLCBtYXNrOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3Qgc3BsaXRWYWx1ZSA9IHZhbHVlLnNwbGl0KCcnKTtcbiAgcmV0dXJuIG1hc2tcbiAgICAuc3BsaXQoJycpXG4gICAgLnJlZHVjZSgocmVzLCBjdXIpID0+IHtcbiAgICAgIGlmIChjdXIgPT09ICcjJykge1xuICAgICAgICBpZiAoc3BsaXRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVzLnB1c2goc3BsaXRWYWx1ZS5zaGlmdCgpISk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKGN1cik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sIFtdIGFzIHN0cmluZ1tdKVxuICAgIC5qb2luKCcnKTtcbn1cbiJdfQ==