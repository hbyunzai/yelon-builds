import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, of } from 'rxjs';
import { yn } from '@yelon/theme';
import { formatDate } from '@yelon/util/date-time';
import { CurrencyService, formatMask } from '@yelon/util/format';
import { deepMerge } from '@yelon/util/other';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class CellService {
    constructor(configSrv) {
        this.nzI18n = inject(NzI18nService);
        this.currency = inject(CurrencyService);
        this.dom = inject(DomSanitizer);
        this.widgets = {
            date: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: formatDate(value, opt.date.format, this.nzI18n.getDateLocale()) };
                }
            },
            mega: {
                type: 'fn',
                ref: (value, opt) => {
                    const res = this.currency.mega(value, opt.mega);
                    return { text: res.value, unit: res.unitI18n };
                }
            },
            currency: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: this.currency.format(value, opt.currency) };
                }
            },
            cny: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: this.currency.cny(value, opt.cny) };
                }
            },
            boolean: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: this.dom.bypassSecurityTrustHtml(yn(value, opt.boolean)) };
                }
            },
            img: {
                type: 'fn',
                ref: value => {
                    return { text: Array.isArray(value) ? value : [value] };
                }
            }
        };
        this.globalOptions = configSrv.merge('cell', {
            date: { format: 'yyyy-MM-dd HH:mm:ss' },
            img: { size: 32 },
            default: { text: '-' }
        });
    }
    registerWidget(key, widget) {
        this.widgets[key] = { type: 'widget', ref: widget };
    }
    getWidget(key) {
        return this.widgets[key];
    }
    genType(value, options) {
        if (options.type != null)
            return options.type;
        const typeOf = typeof value;
        // When is timestamp
        if (typeOf === 'number' && /^[0-9]{13}$/g.test(value))
            return 'date';
        if (value instanceof Date || options.date != null)
            return 'date';
        // Auto detection
        if (options.widget != null)
            return 'widget';
        else if (options.mega != null)
            return 'mega';
        else if (options.currency != null)
            return 'currency';
        else if (options.cny != null)
            return 'cny';
        else if (options.img != null)
            return 'img';
        else if (options.link != null)
            return 'link';
        else if (options.html != null)
            return 'html';
        else if (options.badge != null)
            return 'badge';
        else if (options.tag != null)
            return 'tag';
        else if (options.checkbox != null)
            return 'checkbox';
        else if (options.radio != null)
            return 'radio';
        else if (options.enum != null)
            return 'enum';
        else if (typeOf === 'number')
            return 'number';
        else if (typeOf === 'boolean' || options.boolean != null)
            return 'boolean';
        else
            return 'string';
    }
    fixOptions(options) {
        return deepMerge({}, this.globalOptions, options);
    }
    get(value, options) {
        const type = this.genType(value, { ...options });
        const opt = this.fixOptions(options);
        opt.type = type;
        const isSafeHtml = typeof value === 'object' &&
            typeof value?.getTypeName === 'function' &&
            value?.getTypeName() != null;
        let res = {
            result: typeof value === 'object' && !isSafeHtml
                ? value
                : { text: value == null ? '' : isSafeHtml ? value : `${value}` },
            options: opt
        };
        const widget = this.widgets[type];
        if (widget?.type === 'fn') {
            res.result = widget.ref(value, opt);
        }
        return (typeof value === 'function' ? value(value, opt) : of(res.result)).pipe(map(text => {
            res.result = text;
            let dictData;
            switch (type) {
                case 'badge':
                    dictData = (opt.badge?.data ?? {})[value];
                    res.result = { color: 'default', ...dictData };
                    break;
                case 'tag':
                    dictData = (opt.tag?.data ?? {})[value];
                    res.result = dictData;
                    break;
                case 'enum':
                    res.result = { text: (opt.enum ?? {})[value] };
                    break;
                case 'html':
                    res.safeHtml = opt.html?.safe;
                    break;
                case 'string':
                    if (isSafeHtml)
                        res.safeHtml = 'safeHtml';
                    break;
            }
            if ((type === 'badge' || type === 'tag') && dictData?.tooltip != null) {
                res.options.tooltip = dictData.tooltip;
            }
            if (opt.mask != null) {
                res.result.text = formatMask(res.result.text, opt.mask);
            }
            return res;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: CellService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: CellService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: CellService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2NlbGwvY2VsbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWxDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQWFuRCxNQUFNLE9BQU8sV0FBVztJQTZDdEIsWUFBWSxTQUE4QjtRQTVDekIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQixhQUFRLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25DLFFBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFcEMsWUFBTyxHQUFrQztZQUMvQyxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNsQixPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFlLEVBQUUsR0FBRyxDQUFDLElBQUssQ0FBQyxNQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQy9G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RUFBRSxDQUFDO2dCQUN0RSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQWMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OEdBakpVLFdBQVc7a0hBQVgsV0FBVyxjQURFLE1BQU07OzJGQUNuQixXQUFXO2tCQUR2QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFR5cGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBtYXAsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IHluIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFl1bnphaUNlbGxDb25maWcsIFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2RhdGUtdGltZSc7XG5pbXBvcnQgeyBDdXJyZW5jeVNlcnZpY2UsIGZvcm1hdE1hc2sgfSBmcm9tICdAeWVsb24vdXRpbC9mb3JtYXQnO1xuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuaW1wb3J0IHR5cGUgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5cbmltcG9ydCB0eXBlIHtcbiAgQ2VsbEZ1VmFsdWUsXG4gIENlbGxPcHRpb25zLFxuICBDZWxsVGV4dFJlc3VsdCxcbiAgQ2VsbFRleHRVbml0LFxuICBDZWxsVHlwZSxcbiAgQ2VsbFdpZGdldCxcbiAgQ2VsbFdpZGdldEZuXG59IGZyb20gJy4vY2VsbC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ2VsbFNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IG56STE4biA9IGluamVjdChOekkxOG5TZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeSA9IGluamVjdChDdXJyZW5jeVNlcnZpY2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRvbSA9IGluamVjdChEb21TYW5pdGl6ZXIpO1xuICBwcml2YXRlIGdsb2JhbE9wdGlvbnMhOiBZdW56YWlDZWxsQ29uZmlnO1xuICBwcml2YXRlIHdpZGdldHM6IHsgW2tleTogc3RyaW5nXTogQ2VsbFdpZGdldCB9ID0ge1xuICAgIGRhdGU6IHtcbiAgICAgIHR5cGU6ICdmbicsXG4gICAgICByZWY6ICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgICAgIHJldHVybiB7IHRleHQ6IGZvcm1hdERhdGUodmFsdWUgYXMgc3RyaW5nLCBvcHQuZGF0ZSEuZm9ybWF0ISwgdGhpcy5uekkxOG4uZ2V0RGF0ZUxvY2FsZSgpKSB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgbWVnYToge1xuICAgICAgdHlwZTogJ2ZuJyxcbiAgICAgIHJlZjogKHZhbHVlLCBvcHQpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jdXJyZW5jeS5tZWdhKHZhbHVlIGFzIG51bWJlciwgb3B0Lm1lZ2EpO1xuICAgICAgICByZXR1cm4geyB0ZXh0OiByZXMudmFsdWUsIHVuaXQ6IHJlcy51bml0STE4biB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgY3VycmVuY3k6IHtcbiAgICAgIHR5cGU6ICdmbicsXG4gICAgICByZWY6ICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgICAgIHJldHVybiB7IHRleHQ6IHRoaXMuY3VycmVuY3kuZm9ybWF0KHZhbHVlIGFzIG51bWJlciwgb3B0LmN1cnJlbmN5KSB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgY255OiB7XG4gICAgICB0eXBlOiAnZm4nLFxuICAgICAgcmVmOiAodmFsdWUsIG9wdCkgPT4ge1xuICAgICAgICByZXR1cm4geyB0ZXh0OiB0aGlzLmN1cnJlbmN5LmNueSh2YWx1ZSBhcyBudW1iZXIsIG9wdC5jbnkpIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBib29sZWFuOiB7XG4gICAgICB0eXBlOiAnZm4nLFxuICAgICAgcmVmOiAodmFsdWUsIG9wdCkgPT4ge1xuICAgICAgICByZXR1cm4geyB0ZXh0OiB0aGlzLmRvbS5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh5bih2YWx1ZSBhcyBib29sZWFuLCBvcHQuYm9vbGVhbikpIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBpbWc6IHtcbiAgICAgIHR5cGU6ICdmbicsXG4gICAgICByZWY6IHZhbHVlID0+IHtcbiAgICAgICAgcmV0dXJuIHsgdGV4dDogQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0gfTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5nbG9iYWxPcHRpb25zID0gY29uZmlnU3J2Lm1lcmdlKCdjZWxsJywge1xuICAgICAgZGF0ZTogeyBmb3JtYXQ6ICd5eXl5LU1NLWRkIEhIOm1tOnNzJyB9LFxuICAgICAgaW1nOiB7IHNpemU6IDMyIH0sXG4gICAgICBkZWZhdWx0OiB7IHRleHQ6ICctJyB9XG4gICAgfSkhO1xuICB9XG5cbiAgcmVnaXN0ZXJXaWRnZXQoa2V5OiBzdHJpbmcsIHdpZGdldDogVHlwZTx1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMud2lkZ2V0c1trZXldID0geyB0eXBlOiAnd2lkZ2V0JywgcmVmOiB3aWRnZXQgfTtcbiAgfVxuXG4gIGdldFdpZGdldChrZXk6IHN0cmluZyk6IENlbGxXaWRnZXQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLndpZGdldHNba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuVHlwZSh2YWx1ZTogdW5rbm93biwgb3B0aW9uczogQ2VsbE9wdGlvbnMpOiBDZWxsVHlwZSB7XG4gICAgaWYgKG9wdGlvbnMudHlwZSAhPSBudWxsKSByZXR1cm4gb3B0aW9ucy50eXBlO1xuXG4gICAgY29uc3QgdHlwZU9mID0gdHlwZW9mIHZhbHVlO1xuICAgIC8vIFdoZW4gaXMgdGltZXN0YW1wXG4gICAgaWYgKHR5cGVPZiA9PT0gJ251bWJlcicgJiYgL15bMC05XXsxM30kL2cudGVzdCh2YWx1ZSBhcyBzdHJpbmcpKSByZXR1cm4gJ2RhdGUnO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgb3B0aW9ucy5kYXRlICE9IG51bGwpIHJldHVybiAnZGF0ZSc7XG5cbiAgICAvLyBBdXRvIGRldGVjdGlvblxuICAgIGlmIChvcHRpb25zLndpZGdldCAhPSBudWxsKSByZXR1cm4gJ3dpZGdldCc7XG4gICAgZWxzZSBpZiAob3B0aW9ucy5tZWdhICE9IG51bGwpIHJldHVybiAnbWVnYSc7XG4gICAgZWxzZSBpZiAob3B0aW9ucy5jdXJyZW5jeSAhPSBudWxsKSByZXR1cm4gJ2N1cnJlbmN5JztcbiAgICBlbHNlIGlmIChvcHRpb25zLmNueSAhPSBudWxsKSByZXR1cm4gJ2NueSc7XG4gICAgZWxzZSBpZiAob3B0aW9ucy5pbWcgIT0gbnVsbCkgcmV0dXJuICdpbWcnO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMubGluayAhPSBudWxsKSByZXR1cm4gJ2xpbmsnO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMuaHRtbCAhPSBudWxsKSByZXR1cm4gJ2h0bWwnO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMuYmFkZ2UgIT0gbnVsbCkgcmV0dXJuICdiYWRnZSc7XG4gICAgZWxzZSBpZiAob3B0aW9ucy50YWcgIT0gbnVsbCkgcmV0dXJuICd0YWcnO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMuY2hlY2tib3ggIT0gbnVsbCkgcmV0dXJuICdjaGVja2JveCc7XG4gICAgZWxzZSBpZiAob3B0aW9ucy5yYWRpbyAhPSBudWxsKSByZXR1cm4gJ3JhZGlvJztcbiAgICBlbHNlIGlmIChvcHRpb25zLmVudW0gIT0gbnVsbCkgcmV0dXJuICdlbnVtJztcbiAgICBlbHNlIGlmICh0eXBlT2YgPT09ICdudW1iZXInKSByZXR1cm4gJ251bWJlcic7XG4gICAgZWxzZSBpZiAodHlwZU9mID09PSAnYm9vbGVhbicgfHwgb3B0aW9ucy5ib29sZWFuICE9IG51bGwpIHJldHVybiAnYm9vbGVhbic7XG4gICAgZWxzZSByZXR1cm4gJ3N0cmluZyc7XG4gIH1cblxuICBmaXhPcHRpb25zKG9wdGlvbnM/OiBDZWxsT3B0aW9ucyk6IENlbGxPcHRpb25zIHtcbiAgICByZXR1cm4gZGVlcE1lcmdlKHt9LCB0aGlzLmdsb2JhbE9wdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0KHZhbHVlOiB1bmtub3duLCBvcHRpb25zPzogQ2VsbE9wdGlvbnMpOiBPYnNlcnZhYmxlPENlbGxUZXh0UmVzdWx0PiB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZ2VuVHlwZSh2YWx1ZSwgeyAuLi5vcHRpb25zIH0pO1xuICAgIGNvbnN0IG9wdCA9IHRoaXMuZml4T3B0aW9ucyhvcHRpb25zKTtcbiAgICBvcHQudHlwZSA9IHR5cGU7XG4gICAgY29uc3QgaXNTYWZlSHRtbCA9XG4gICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2YgKHZhbHVlIGFzIE56U2FmZUFueSk/LmdldFR5cGVOYW1lID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAodmFsdWUgYXMgTnpTYWZlQW55KT8uZ2V0VHlwZU5hbWUoKSAhPSBudWxsO1xuXG4gICAgbGV0IHJlczogQ2VsbFRleHRSZXN1bHQgPSB7XG4gICAgICByZXN1bHQ6XG4gICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIWlzU2FmZUh0bWxcbiAgICAgICAgICA/ICh2YWx1ZSBhcyBDZWxsVGV4dFVuaXQpXG4gICAgICAgICAgOiB7IHRleHQ6IHZhbHVlID09IG51bGwgPyAnJyA6IGlzU2FmZUh0bWwgPyB2YWx1ZSA6IGAke3ZhbHVlfWAgfSxcbiAgICAgIG9wdGlvbnM6IG9wdFxuICAgIH07XG5cbiAgICBjb25zdCB3aWRnZXQgPSB0aGlzLndpZGdldHNbdHlwZV07XG4gICAgaWYgKHdpZGdldD8udHlwZSA9PT0gJ2ZuJykge1xuICAgICAgcmVzLnJlc3VsdCA9ICh3aWRnZXQucmVmIGFzIENlbGxXaWRnZXRGbikodmFsdWUsIG9wdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyAodmFsdWUgYXMgQ2VsbEZ1VmFsdWUpKHZhbHVlLCBvcHQpIDogb2YocmVzLnJlc3VsdCkpLnBpcGUoXG4gICAgICBtYXAodGV4dCA9PiB7XG4gICAgICAgIHJlcy5yZXN1bHQgPSB0ZXh0O1xuICAgICAgICBsZXQgZGljdERhdGE6IHsgdG9vbHRpcD86IHN0cmluZyB9IHwgdW5kZWZpbmVkO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdiYWRnZSc6XG4gICAgICAgICAgICBkaWN0RGF0YSA9IChvcHQuYmFkZ2U/LmRhdGEgPz8ge30pW3ZhbHVlIGFzIHN0cmluZ107XG4gICAgICAgICAgICByZXMucmVzdWx0ID0geyBjb2xvcjogJ2RlZmF1bHQnLCAuLi5kaWN0RGF0YSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAndGFnJzpcbiAgICAgICAgICAgIGRpY3REYXRhID0gKG9wdC50YWc/LmRhdGEgPz8ge30pW3ZhbHVlIGFzIHN0cmluZ107XG4gICAgICAgICAgICByZXMucmVzdWx0ID0gZGljdERhdGEgYXMgQ2VsbFRleHRVbml0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZW51bSc6XG4gICAgICAgICAgICByZXMucmVzdWx0ID0geyB0ZXh0OiAob3B0LmVudW0gPz8ge30pW3ZhbHVlIGFzIHN0cmluZ10gfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgICAgcmVzLnNhZmVIdG1sID0gb3B0Lmh0bWw/LnNhZmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgaWYgKGlzU2FmZUh0bWwpIHJlcy5zYWZlSHRtbCA9ICdzYWZlSHRtbCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHR5cGUgPT09ICdiYWRnZScgfHwgdHlwZSA9PT0gJ3RhZycpICYmIGRpY3REYXRhPy50b29sdGlwICE9IG51bGwpIHtcbiAgICAgICAgICByZXMub3B0aW9ucy50b29sdGlwID0gZGljdERhdGEudG9vbHRpcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0Lm1hc2sgIT0gbnVsbCkge1xuICAgICAgICAgIHJlcy5yZXN1bHQudGV4dCA9IGZvcm1hdE1hc2socmVzLnJlc3VsdC50ZXh0IGFzIHN0cmluZywgb3B0Lm1hc2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==