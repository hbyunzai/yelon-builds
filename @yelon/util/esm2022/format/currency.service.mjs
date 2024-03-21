import { CurrencyPipe, formatNumber } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, Injectable, LOCALE_ID, inject } from '@angular/core';
import { CurrencyMega_Powers } from './currency.types';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export class CurrencyService {
    constructor(cog) {
        this.locale = inject(LOCALE_ID);
        this.defCurrencyCode = inject(DEFAULT_CURRENCY_CODE, { optional: true }) ?? 'USD';
        this.currencyPipe = new CurrencyPipe(this.locale, this.defCurrencyCode);
        this.c = cog.merge('utilCurrency', {
            startingUnit: 'yuan',
            megaUnit: { Q: '京', T: '兆', B: '亿', M: '万', K: '千' },
            precision: 2,
            ignoreZeroPrecision: true
        });
    }
    /**
     * Format a number with commas as thousands separators
     *
     * 格式化货币，用逗号将数字格式化为千位分隔符
     * ```ts
     * 10000 => `10,000`
     * 10000.567 => `10,000.57`
     * ```
     */
    format(value, options) {
        options = {
            startingUnit: this.c.startingUnit,
            precision: this.c.precision,
            ignoreZeroPrecision: this.c.ignoreZeroPrecision,
            ngCurrency: this.c.ngCurrency,
            ...options
        };
        let truthValue = Number(value);
        if (value == null || isNaN(truthValue)) {
            return '';
        }
        if (options.startingUnit === 'cent') {
            truthValue = truthValue / 100;
        }
        if (options.ngCurrency != null) {
            const cur = options.ngCurrency;
            return this.currencyPipe.transform(truthValue, cur.currencyCode, cur.display, cur.digitsInfo, cur.locale || this.locale);
        }
        const res = formatNumber(truthValue, this.locale, `.${options.ignoreZeroPrecision ? 1 : options.precision}-${options.precision}`);
        return options.ignoreZeroPrecision ? res.replace(/(?:\.[0]+)$/g, '') : res;
    }
    /**
     * Large number format filter
     *
     * 大数据格式化
     * ```ts
     * 1000 => { value: '1', unit: 'K', unitI18n: '千' }
     * 12456 => { value: '12.46', unit: 'K', unitI18n: '千' }
     * ```
     */
    mega(value, options) {
        options = { precision: this.c.precision, unitI18n: this.c.megaUnit, startingUnit: this.c.startingUnit, ...options };
        let num = Number(value);
        const res = { raw: value, value: '', unit: '', unitI18n: '' };
        if (isNaN(num) || num === 0) {
            res.value = value.toString();
            return res;
        }
        if (options.startingUnit === 'cent') {
            num = num / 100;
        }
        let abs = Math.abs(+num);
        const rounder = Math.pow(10, options.precision);
        const isNegative = num < 0;
        for (const p of CurrencyMega_Powers) {
            let reduced = abs / p.value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                res.unit = p.unit;
                break;
            }
        }
        res.value = (isNegative ? '-' : '') + abs;
        res.unitI18n = options.unitI18n[res.unit];
        return res;
    }
    /**
     * Converted into RMB notation.
     *
     * 转化成人民币表示法
     */
    cny(value, options) {
        options = {
            inWords: true,
            minusSymbol: '负',
            startingUnit: this.c.startingUnit,
            ...options
        };
        value = Number(value);
        if (isNaN(value)) {
            return '';
        }
        if (options.startingUnit === 'cent') {
            value = value / 100;
        }
        value = value.toString();
        let integer;
        let decimal;
        [integer, decimal] = value.split('.');
        let symbol = '';
        if (integer.startsWith('-')) {
            symbol = options.minusSymbol;
            integer = integer.substring(1);
        }
        if (/^-?\d+$/.test(value)) {
            decimal = null;
        }
        integer = (+integer).toString();
        const inWords = options.inWords;
        const unit = {
            num: inWords
                ? ['', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '点']
                : ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '点'],
            radice: inWords
                ? [
                    '',
                    '拾',
                    '佰',
                    '仟',
                    '万',
                    '拾',
                    '佰',
                    '仟',
                    '亿',
                    '拾',
                    '佰',
                    '仟',
                    '万亿',
                    '拾',
                    '佰',
                    '仟',
                    '兆',
                    '拾',
                    '佰',
                    '仟'
                ]
                : [
                    '',
                    '十',
                    '百',
                    '千',
                    '万',
                    '十',
                    '百',
                    '千',
                    '亿',
                    '十',
                    '百',
                    '千',
                    '万亿',
                    '十',
                    '百',
                    '千',
                    '兆',
                    '十',
                    '百',
                    '千'
                ],
            dec: ['角', '分', '厘', '毫']
        };
        if (inWords) {
            value = (+value).toFixed(5).toString();
        }
        let integerRes = '';
        const integerCount = integer.length;
        if (integer === '0' || integerCount === 0) {
            integerRes = '零';
        }
        else {
            let cnDesc = '';
            for (let i = 0; i < integerCount; i++) {
                const n = +integer[i];
                const j = integerCount - i - 1;
                const isZero = i > 1 && n !== 0 && integer[i - 1] === '0';
                const cnZero = isZero ? '零' : '';
                const isEmpptyUnit = (n === 0 && j % 4 !== 0) || integer.substring(i - 3, i - 3 + 4) === '0000';
                const descMark = cnDesc;
                let cnNum = unit.num[n];
                cnDesc = isEmpptyUnit ? '' : unit.radice[j];
                // 第一位是一十
                if (i === 0 && cnNum === '一' && cnDesc === '十')
                    cnNum = '';
                const isChangeEr = n > 1 &&
                    cnNum === '二' && // 去除首位
                    ['', '十', '百'].indexOf(cnDesc) === -1 && // 不读两\两十\两百
                    descMark !== '十'; // 不读十两
                if (isChangeEr)
                    cnNum = '两';
                integerRes += cnZero + cnNum + cnDesc;
            }
        }
        // 小数部分拼接
        let decimalRes = '';
        const decimalCount = decimal ? decimal.toString().length : 0;
        if (decimal === null) {
            decimalRes = inWords ? '整' : '';
        }
        else if (decimal === '0') {
            decimalRes = '零';
        }
        else {
            for (let i = 0; i < decimalCount; i++) {
                if (inWords && i > unit.dec.length - 1)
                    break;
                const n = decimal[i];
                const cnZero = n === '0' ? '零' : '';
                const cnNum = unit.num[+n];
                const cnDesc = inWords ? unit.dec[i] : '';
                decimalRes += cnZero + cnNum + cnDesc;
            }
        }
        const ret = symbol +
            (inWords
                ? integerRes + (decimalRes === '零' ? '元整' : `元${decimalRes}`)
                : integerRes + (decimalRes === '' ? '' : `点${decimalRes}`));
        return ret;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CurrencyService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CurrencyService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: CurrencyService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3V0aWwvZm9ybWF0L2N1cnJlbmN5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckYsT0FBTyxFQUtMLG1CQUFtQixFQUNwQixNQUFNLGtCQUFrQixDQUFDOzs7QUFHMUIsTUFBTSxPQUFPLGVBQWU7SUFPMUIsWUFBWSxHQUF3QjtRQU5uQixXQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLG9CQUFlLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDO1FBTTVGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUNqQyxZQUFZLEVBQUUsTUFBTTtZQUNwQixRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsU0FBUyxFQUFFLENBQUM7WUFDWixtQkFBbUIsRUFBRSxJQUFJO1NBQzFCLENBQUUsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxLQUFzQixFQUFFLE9BQStCO1FBQzVELE9BQU8s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QUFDO1FBQ0QsTUFBTSxHQUFHLEdBQ1AsTUFBTTtZQUNOLENBQUMsT0FBTztnQkFDTixDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUM3RCxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OEdBOU9VLGVBQWU7a0hBQWYsZUFBZSxjQURGLE1BQU07OzJGQUNuQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1cnJlbmN5UGlwZSwgZm9ybWF0TnVtYmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERFRkFVTFRfQ1VSUkVOQ1lfQ09ERSwgSW5qZWN0YWJsZSwgTE9DQUxFX0lELCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpVXRpbEN1cnJlbmN5Q29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHtcbiAgQ3VycmVuY3lDTllPcHRpb25zLFxuICBDdXJyZW5jeUZvcm1hdE9wdGlvbnMsXG4gIEN1cnJlbmN5TWVnYU9wdGlvbnMsXG4gIEN1cnJlbmN5TWVnYVJlc3VsdCxcbiAgQ3VycmVuY3lNZWdhX1Bvd2Vyc1xufSBmcm9tICcuL2N1cnJlbmN5LnR5cGVzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeVNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGxvY2FsZSA9IGluamVjdChMT0NBTEVfSUQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlZkN1cnJlbmN5Q29kZSA9IGluamVjdChERUZBVUxUX0NVUlJFTkNZX0NPREUsIHsgb3B0aW9uYWw6IHRydWUgfSkgPz8gJ1VTRCc7XG5cbiAgcHJpdmF0ZSBjOiBZdW56YWlVdGlsQ3VycmVuY3lDb25maWc7XG4gIHByaXZhdGUgcmVhZG9ubHkgY3VycmVuY3lQaXBlOiBDdXJyZW5jeVBpcGU7XG5cbiAgY29uc3RydWN0b3IoY29nOiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5jdXJyZW5jeVBpcGUgPSBuZXcgQ3VycmVuY3lQaXBlKHRoaXMubG9jYWxlLCB0aGlzLmRlZkN1cnJlbmN5Q29kZSk7XG4gICAgdGhpcy5jID0gY29nLm1lcmdlKCd1dGlsQ3VycmVuY3knLCB7XG4gICAgICBzdGFydGluZ1VuaXQ6ICd5dWFuJyxcbiAgICAgIG1lZ2FVbml0OiB7IFE6ICfkuqwnLCBUOiAn5YWGJywgQjogJ+S6vycsIE06ICfkuIcnLCBLOiAn5Y2DJyB9LFxuICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgaWdub3JlWmVyb1ByZWNpc2lvbjogdHJ1ZVxuICAgIH0pITtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBudW1iZXIgd2l0aCBjb21tYXMgYXMgdGhvdXNhbmRzIHNlcGFyYXRvcnNcbiAgICpcbiAgICog5qC85byP5YyW6LSn5biB77yM55So6YCX5Y+35bCG5pWw5a2X5qC85byP5YyW5Li65Y2D5L2N5YiG6ZqU56ymXG4gICAqIGBgYHRzXG4gICAqIDEwMDAwID0+IGAxMCwwMDBgXG4gICAqIDEwMDAwLjU2NyA9PiBgMTAsMDAwLjU3YFxuICAgKiBgYGBcbiAgICovXG4gIGZvcm1hdCh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBvcHRpb25zPzogQ3VycmVuY3lGb3JtYXRPcHRpb25zKTogc3RyaW5nIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgc3RhcnRpbmdVbml0OiB0aGlzLmMuc3RhcnRpbmdVbml0LFxuICAgICAgcHJlY2lzaW9uOiB0aGlzLmMucHJlY2lzaW9uLFxuICAgICAgaWdub3JlWmVyb1ByZWNpc2lvbjogdGhpcy5jLmlnbm9yZVplcm9QcmVjaXNpb24sXG4gICAgICBuZ0N1cnJlbmN5OiB0aGlzLmMubmdDdXJyZW5jeSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIGxldCB0cnV0aFZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBpc05hTih0cnV0aFZhbHVlKSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zdGFydGluZ1VuaXQgPT09ICdjZW50Jykge1xuICAgICAgdHJ1dGhWYWx1ZSA9IHRydXRoVmFsdWUgLyAxMDA7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm5nQ3VycmVuY3kgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY3VyID0gb3B0aW9ucy5uZ0N1cnJlbmN5ITtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbmN5UGlwZS50cmFuc2Zvcm0oXG4gICAgICAgIHRydXRoVmFsdWUsXG4gICAgICAgIGN1ci5jdXJyZW5jeUNvZGUsXG4gICAgICAgIGN1ci5kaXNwbGF5LFxuICAgICAgICBjdXIuZGlnaXRzSW5mbyxcbiAgICAgICAgY3VyLmxvY2FsZSB8fCB0aGlzLmxvY2FsZVxuICAgICAgKSE7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGZvcm1hdE51bWJlcihcbiAgICAgIHRydXRoVmFsdWUsXG4gICAgICB0aGlzLmxvY2FsZSxcbiAgICAgIGAuJHtvcHRpb25zLmlnbm9yZVplcm9QcmVjaXNpb24gPyAxIDogb3B0aW9ucy5wcmVjaXNpb259LSR7b3B0aW9ucy5wcmVjaXNpb259YFxuICAgICk7XG4gICAgcmV0dXJuIG9wdGlvbnMuaWdub3JlWmVyb1ByZWNpc2lvbiA/IHJlcy5yZXBsYWNlKC8oPzpcXC5bMF0rKSQvZywgJycpIDogcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIExhcmdlIG51bWJlciBmb3JtYXQgZmlsdGVyXG4gICAqXG4gICAqIOWkp+aVsOaNruagvOW8j+WMllxuICAgKiBgYGB0c1xuICAgKiAxMDAwID0+IHsgdmFsdWU6ICcxJywgdW5pdDogJ0snLCB1bml0STE4bjogJ+WNgycgfVxuICAgKiAxMjQ1NiA9PiB7IHZhbHVlOiAnMTIuNDYnLCB1bml0OiAnSycsIHVuaXRJMThuOiAn5Y2DJyB9XG4gICAqIGBgYFxuICAgKi9cbiAgbWVnYSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBvcHRpb25zPzogQ3VycmVuY3lNZWdhT3B0aW9ucyk6IEN1cnJlbmN5TWVnYVJlc3VsdCB7XG4gICAgb3B0aW9ucyA9IHsgcHJlY2lzaW9uOiB0aGlzLmMucHJlY2lzaW9uLCB1bml0STE4bjogdGhpcy5jLm1lZ2FVbml0LCBzdGFydGluZ1VuaXQ6IHRoaXMuYy5zdGFydGluZ1VuaXQsIC4uLm9wdGlvbnMgfTtcbiAgICBsZXQgbnVtID0gTnVtYmVyKHZhbHVlKTtcbiAgICBjb25zdCByZXM6IEN1cnJlbmN5TWVnYVJlc3VsdCA9IHsgcmF3OiB2YWx1ZSwgdmFsdWU6ICcnLCB1bml0OiAnJywgdW5pdEkxOG46ICcnIH07XG4gICAgaWYgKGlzTmFOKG51bSkgfHwgbnVtID09PSAwKSB7XG4gICAgICByZXMudmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc3RhcnRpbmdVbml0ID09PSAnY2VudCcpIHtcbiAgICAgIG51bSA9IG51bSAvIDEwMDtcbiAgICB9XG4gICAgbGV0IGFicyA9IE1hdGguYWJzKCtudW0pO1xuICAgIGNvbnN0IHJvdW5kZXIgPSBNYXRoLnBvdygxMCwgb3B0aW9ucy5wcmVjaXNpb24hKTtcbiAgICBjb25zdCBpc05lZ2F0aXZlID0gbnVtIDwgMDtcbiAgICBmb3IgKGNvbnN0IHAgb2YgQ3VycmVuY3lNZWdhX1Bvd2Vycykge1xuICAgICAgbGV0IHJlZHVjZWQgPSBhYnMgLyBwLnZhbHVlO1xuXG4gICAgICByZWR1Y2VkID0gTWF0aC5yb3VuZChyZWR1Y2VkICogcm91bmRlcikgLyByb3VuZGVyO1xuXG4gICAgICBpZiAocmVkdWNlZCA+PSAxKSB7XG4gICAgICAgIGFicyA9IHJlZHVjZWQ7XG4gICAgICAgIHJlcy51bml0ID0gcC51bml0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXMudmFsdWUgPSAoaXNOZWdhdGl2ZSA/ICctJyA6ICcnKSArIGFicztcbiAgICByZXMudW5pdEkxOG4gPSAob3B0aW9ucy51bml0STE4biBhcyB7IFtrZXk6IHN0cmluZ106IE56U2FmZUFueSB9KVtyZXMudW5pdF07XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0ZWQgaW50byBSTUIgbm90YXRpb24uXG4gICAqXG4gICAqIOi9rOWMluaIkOS6uuawkeW4geihqOekuuazlVxuICAgKi9cbiAgY255KHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsIG9wdGlvbnM/OiBDdXJyZW5jeUNOWU9wdGlvbnMpOiBzdHJpbmcge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBpbldvcmRzOiB0cnVlLFxuICAgICAgbWludXNTeW1ib2w6ICfotJ8nLFxuICAgICAgc3RhcnRpbmdVbml0OiB0aGlzLmMuc3RhcnRpbmdVbml0LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zdGFydGluZ1VuaXQgPT09ICdjZW50Jykge1xuICAgICAgdmFsdWUgPSB2YWx1ZSAvIDEwMDtcbiAgICB9XG4gICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIGxldCBpbnRlZ2VyOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgbGV0IGRlY2ltYWw6IG51bWJlciB8IHN0cmluZyB8IG51bGw7XG4gICAgW2ludGVnZXIsIGRlY2ltYWxdID0gdmFsdWUuc3BsaXQoJy4nKTtcbiAgICBsZXQgc3ltYm9sID0gJyc7XG4gICAgaWYgKGludGVnZXIuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICBzeW1ib2wgPSBvcHRpb25zLm1pbnVzU3ltYm9sITtcbiAgICAgIGludGVnZXIgPSBpbnRlZ2VyLnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgaWYgKC9eLT9cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgIGRlY2ltYWwgPSBudWxsO1xuICAgIH1cbiAgICBpbnRlZ2VyID0gKCtpbnRlZ2VyKS50b1N0cmluZygpO1xuICAgIGNvbnN0IGluV29yZHMgPSBvcHRpb25zLmluV29yZHM7XG4gICAgY29uc3QgdW5pdDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge1xuICAgICAgbnVtOiBpbldvcmRzXG4gICAgICAgID8gWycnLCAn5aO5JywgJ+i0sCcsICflj4EnLCAn6IKGJywgJ+S8jScsICfpmYYnLCAn5p+SJywgJ+aNjCcsICfnjpYnLCAn54K5J11cbiAgICAgICAgOiBbJycsICfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrScsICfkuIMnLCAn5YWrJywgJ+S5nScsICfngrknXSxcbiAgICAgIHJhZGljZTogaW5Xb3Jkc1xuICAgICAgICA/IFtcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJ+aLvicsXG4gICAgICAgICAgICAn5L2wJyxcbiAgICAgICAgICAgICfku58nLFxuICAgICAgICAgICAgJ+S4hycsXG4gICAgICAgICAgICAn5ou+JyxcbiAgICAgICAgICAgICfkvbAnLFxuICAgICAgICAgICAgJ+S7nycsXG4gICAgICAgICAgICAn5Lq/JyxcbiAgICAgICAgICAgICfmi74nLFxuICAgICAgICAgICAgJ+S9sCcsXG4gICAgICAgICAgICAn5LufJyxcbiAgICAgICAgICAgICfkuIfkur8nLFxuICAgICAgICAgICAgJ+aLvicsXG4gICAgICAgICAgICAn5L2wJyxcbiAgICAgICAgICAgICfku58nLFxuICAgICAgICAgICAgJ+WFhicsXG4gICAgICAgICAgICAn5ou+JyxcbiAgICAgICAgICAgICfkvbAnLFxuICAgICAgICAgICAgJ+S7nydcbiAgICAgICAgICBdXG4gICAgICAgIDogW1xuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAn5Y2BJyxcbiAgICAgICAgICAgICfnmb4nLFxuICAgICAgICAgICAgJ+WNgycsXG4gICAgICAgICAgICAn5LiHJyxcbiAgICAgICAgICAgICfljYEnLFxuICAgICAgICAgICAgJ+eZvicsXG4gICAgICAgICAgICAn5Y2DJyxcbiAgICAgICAgICAgICfkur8nLFxuICAgICAgICAgICAgJ+WNgScsXG4gICAgICAgICAgICAn55m+JyxcbiAgICAgICAgICAgICfljYMnLFxuICAgICAgICAgICAgJ+S4h+S6vycsXG4gICAgICAgICAgICAn5Y2BJyxcbiAgICAgICAgICAgICfnmb4nLFxuICAgICAgICAgICAgJ+WNgycsXG4gICAgICAgICAgICAn5YWGJyxcbiAgICAgICAgICAgICfljYEnLFxuICAgICAgICAgICAgJ+eZvicsXG4gICAgICAgICAgICAn5Y2DJ1xuICAgICAgICAgIF0sXG4gICAgICBkZWM6IFsn6KeSJywgJ+WIhicsICfljpgnLCAn5q+rJ11cbiAgICB9O1xuICAgIGlmIChpbldvcmRzKSB7XG4gICAgICB2YWx1ZSA9ICgrdmFsdWUpLnRvRml4ZWQoNSkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgbGV0IGludGVnZXJSZXMgPSAnJztcbiAgICBjb25zdCBpbnRlZ2VyQ291bnQgPSBpbnRlZ2VyLmxlbmd0aDtcbiAgICBpZiAoaW50ZWdlciA9PT0gJzAnIHx8IGludGVnZXJDb3VudCA9PT0gMCkge1xuICAgICAgaW50ZWdlclJlcyA9ICfpm7YnO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY25EZXNjID0gJyc7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGludGVnZXJDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG4gPSAraW50ZWdlcltpXTtcbiAgICAgICAgY29uc3QgaiA9IGludGVnZXJDb3VudCAtIGkgLSAxO1xuICAgICAgICBjb25zdCBpc1plcm8gPSBpID4gMSAmJiBuICE9PSAwICYmIGludGVnZXJbaSAtIDFdID09PSAnMCc7XG4gICAgICAgIGNvbnN0IGNuWmVybyA9IGlzWmVybyA/ICfpm7YnIDogJyc7XG4gICAgICAgIGNvbnN0IGlzRW1wcHR5VW5pdCA9IChuID09PSAwICYmIGogJSA0ICE9PSAwKSB8fCBpbnRlZ2VyLnN1YnN0cmluZyhpIC0gMywgaSAtIDMgKyA0KSA9PT0gJzAwMDAnO1xuICAgICAgICBjb25zdCBkZXNjTWFyayA9IGNuRGVzYztcbiAgICAgICAgbGV0IGNuTnVtID0gdW5pdC5udW1bbl07XG5cbiAgICAgICAgY25EZXNjID0gaXNFbXBwdHlVbml0ID8gJycgOiB1bml0LnJhZGljZVtqXTtcbiAgICAgICAgLy8g56ys5LiA5L2N5piv5LiA5Y2BXG4gICAgICAgIGlmIChpID09PSAwICYmIGNuTnVtID09PSAn5LiAJyAmJiBjbkRlc2MgPT09ICfljYEnKSBjbk51bSA9ICcnO1xuICAgICAgICBjb25zdCBpc0NoYW5nZUVyID1cbiAgICAgICAgICBuID4gMSAmJlxuICAgICAgICAgIGNuTnVtID09PSAn5LqMJyAmJiAvLyDljrvpmaTpppbkvY1cbiAgICAgICAgICBbJycsICfljYEnLCAn55m+J10uaW5kZXhPZihjbkRlc2MpID09PSAtMSAmJiAvLyDkuI3or7vkuKRcXOS4pOWNgVxc5Lik55m+XG4gICAgICAgICAgZGVzY01hcmsgIT09ICfljYEnOyAvLyDkuI3or7vljYHkuKRcbiAgICAgICAgaWYgKGlzQ2hhbmdlRXIpIGNuTnVtID0gJ+S4pCc7XG4gICAgICAgIGludGVnZXJSZXMgKz0gY25aZXJvICsgY25OdW0gKyBjbkRlc2M7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g5bCP5pWw6YOo5YiG5ou85o6lXG4gICAgbGV0IGRlY2ltYWxSZXMgPSAnJztcbiAgICBjb25zdCBkZWNpbWFsQ291bnQgPSBkZWNpbWFsID8gZGVjaW1hbC50b1N0cmluZygpLmxlbmd0aCA6IDA7XG4gICAgaWYgKGRlY2ltYWwgPT09IG51bGwpIHtcbiAgICAgIGRlY2ltYWxSZXMgPSBpbldvcmRzID8gJ+aVtCcgOiAnJztcbiAgICB9IGVsc2UgaWYgKGRlY2ltYWwgPT09ICcwJykge1xuICAgICAgZGVjaW1hbFJlcyA9ICfpm7YnO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlY2ltYWxDb3VudDsgaSsrKSB7XG4gICAgICAgIGlmIChpbldvcmRzICYmIGkgPiB1bml0LmRlYy5sZW5ndGggLSAxKSBicmVhaztcbiAgICAgICAgY29uc3QgbiA9IGRlY2ltYWxbaV07XG4gICAgICAgIGNvbnN0IGNuWmVybyA9IG4gPT09ICcwJyA/ICfpm7YnIDogJyc7XG4gICAgICAgIGNvbnN0IGNuTnVtID0gdW5pdC5udW1bK25dO1xuICAgICAgICBjb25zdCBjbkRlc2MgPSBpbldvcmRzID8gdW5pdC5kZWNbaV0gOiAnJztcbiAgICAgICAgZGVjaW1hbFJlcyArPSBjblplcm8gKyBjbk51bSArIGNuRGVzYztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmV0ID1cbiAgICAgIHN5bWJvbCArXG4gICAgICAoaW5Xb3Jkc1xuICAgICAgICA/IGludGVnZXJSZXMgKyAoZGVjaW1hbFJlcyA9PT0gJ+mbticgPyAn5YWD5pW0JyA6IGDlhYMke2RlY2ltYWxSZXN9YClcbiAgICAgICAgOiBpbnRlZ2VyUmVzICsgKGRlY2ltYWxSZXMgPT09ICcnID8gJycgOiBg54K5JHtkZWNpbWFsUmVzfWApKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG4iXX0=