import { Injectable, Optional } from '@angular/core';
import { deepGet } from '@yelon/util/other';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/abc/xlsx";
export class STExport {
    constructor(xlsxSrv) {
        this.xlsxSrv = xlsxSrv;
    }
    _stGet(item, col, index, colIndex) {
        const ret = { t: 's', v: '' };
        if (col.format) {
            ret.v = col.format(item, col, index);
        }
        else {
            const val = item._values ? item._values[colIndex].text : deepGet(item, col.index, '');
            ret.v = val;
            if (val != null) {
                switch (col.type) {
                    case 'currency':
                        ret.t = 'n';
                        break;
                    case 'date':
                        // Can't be a empty value, it will cause `#NULL!`
                        // See https://github.com/SheetJS/sheetjs/blob/master/docbits/52_datatype.md
                        if (`${val}`.length > 0) {
                            ret.t = 'd';
                            // Number Formats: https://github.com/SheetJS/sheetjs/blob/master/docbits/63_numfmt.md
                            ret.z = col.dateFormat;
                        }
                        break;
                    case 'yn':
                        const yn = col.yn;
                        ret.v = val === yn.truth ? yn.yes : yn.no;
                        break;
                }
            }
        }
        ret.v = ret.v || '';
        return ret;
    }
    genSheet(opt) {
        const sheets = {};
        const sheet = (sheets[opt.sheetname || 'Sheet1'] = {});
        const dataLen = opt.data.length;
        let validColCount = 0;
        let loseCount = 0;
        const columns = opt.columens;
        if (columns.findIndex(w => w._width != null) !== -1) {
            // wpx: width in screen pixels https://github.com/SheetJS/sheetjs#column-properties
            sheet['!cols'] = columns.map(col => ({ wpx: col._width }));
        }
        for (let colIdx = 0; colIdx < columns.length; colIdx++) {
            const col = columns[colIdx];
            if (col.exported === false || !col.index || !(!col.buttons || col.buttons.length === 0)) {
                ++loseCount;
                continue;
            }
            ++validColCount;
            const columnName = this.xlsxSrv.numberToSchema(colIdx + 1 - loseCount);
            sheet[`${columnName}1`] = {
                t: 's',
                v: typeof col.title === 'object' ? col.title.text : col.title
            };
            for (let dataIdx = 0; dataIdx < dataLen; dataIdx++) {
                sheet[`${columnName}${dataIdx + 2}`] = this._stGet(opt.data[dataIdx], col, dataIdx, colIdx);
            }
        }
        if (validColCount > 0 && dataLen > 0) {
            sheet['!ref'] = `A1:${this.xlsxSrv.numberToSchema(validColCount)}${dataLen + 1}`;
        }
        return sheets;
    }
    async export(opt) {
        const sheets = this.genSheet(opt);
        return this.xlsxSrv.export({
            sheets,
            filename: opt.filename,
            callback: opt.callback
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: STExport, deps: [{ token: i1.XlsxService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: STExport }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: STExport, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.XlsxService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3QtZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3N0L3N0LWV4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQU81QyxNQUFNLE9BQU8sUUFBUTtJQUNuQixZQUFnQyxPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO0lBQUcsQ0FBQztJQUVoRCxNQUFNLENBQUMsSUFBZSxFQUFFLEdBQWEsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDNUUsTUFBTSxHQUFHLEdBQWlDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFNUQsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2QsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ1osSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUNmLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDaEIsS0FBSyxVQUFVO3dCQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUNaLE1BQU07b0JBQ1IsS0FBSyxNQUFNO3dCQUNULGlEQUFpRDt3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RSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzlGO1NBQ0Y7UUFFRCxJQUFJLGFBQWEsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNwQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDbEY7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFvQjtRQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekIsTUFBTTtZQUNOLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtZQUN0QixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0FoRlUsUUFBUTttSEFBUixRQUFROzs0RkFBUixRQUFRO2tCQURwQixVQUFVOzswQkFFSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWGxzeEV4cG9ydFJlc3VsdCwgWGxzeFNlcnZpY2UgfSBmcm9tICdAeWVsb24vYWJjL3hsc3gnO1xuaW1wb3J0IHsgZGVlcEdldCB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgU1RDb2x1bW4sIFNURXhwb3J0T3B0aW9ucyB9IGZyb20gJy4vc3QuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBfU1RDb2x1bW4gfSBmcm9tICcuL3N0LnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNURXhwb3J0IHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSB4bHN4U3J2OiBYbHN4U2VydmljZSkge31cblxuICBwcml2YXRlIF9zdEdldChpdGVtOiBOelNhZmVBbnksIGNvbDogU1RDb2x1bW4sIGluZGV4OiBudW1iZXIsIGNvbEluZGV4OiBudW1iZXIpOiBOelNhZmVBbnkge1xuICAgIGNvbnN0IHJldDogeyBba2V5OiBzdHJpbmddOiBOelNhZmVBbnkgfSA9IHsgdDogJ3MnLCB2OiAnJyB9O1xuXG4gICAgaWYgKGNvbC5mb3JtYXQpIHtcbiAgICAgIHJldC52ID0gY29sLmZvcm1hdChpdGVtLCBjb2wsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdmFsID0gaXRlbS5fdmFsdWVzID8gaXRlbS5fdmFsdWVzW2NvbEluZGV4XS50ZXh0IDogZGVlcEdldChpdGVtLCBjb2wuaW5kZXggYXMgc3RyaW5nW10sICcnKTtcbiAgICAgIHJldC52ID0gdmFsO1xuICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgIHN3aXRjaCAoY29sLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgICAgICByZXQudCA9ICduJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgLy8gQ2FuJ3QgYmUgYSBlbXB0eSB2YWx1ZSwgaXQgd2lsbCBjYXVzZSBgI05VTEwhYFxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9TaGVldEpTL3NoZWV0anMvYmxvYi9tYXN0ZXIvZG9jYml0cy81Ml9kYXRhdHlwZS5tZFxuICAgICAgICAgICAgaWYgKGAke3ZhbH1gLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcmV0LnQgPSAnZCc7XG4gICAgICAgICAgICAgIC8vIE51bWJlciBGb3JtYXRzOiBodHRwczovL2dpdGh1Yi5jb20vU2hlZXRKUy9zaGVldGpzL2Jsb2IvbWFzdGVyL2RvY2JpdHMvNjNfbnVtZm10Lm1kXG4gICAgICAgICAgICAgIHJldC56ID0gY29sLmRhdGVGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd5bic6XG4gICAgICAgICAgICBjb25zdCB5biA9IGNvbC55biE7XG4gICAgICAgICAgICByZXQudiA9IHZhbCA9PT0geW4udHJ1dGggPyB5bi55ZXMgOiB5bi5ubztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0LnYgPSByZXQudiB8fCAnJztcblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwcml2YXRlIGdlblNoZWV0KG9wdDogU1RFeHBvcnRPcHRpb25zKTogeyBbc2hlZXQ6IHN0cmluZ106IHVua25vd24gfSB7XG4gICAgY29uc3Qgc2hlZXRzOiB7IFtzaGVldDogc3RyaW5nXTogeyBba2V5OiBzdHJpbmddOiBOelNhZmVBbnkgfSB9ID0ge307XG4gICAgY29uc3Qgc2hlZXQ6IHsgW2tleTogc3RyaW5nXTogTnpTYWZlQW55IH0gPSAoc2hlZXRzW29wdC5zaGVldG5hbWUgfHwgJ1NoZWV0MSddID0ge30pO1xuICAgIGNvbnN0IGRhdGFMZW4gPSBvcHQuZGF0YSEubGVuZ3RoO1xuICAgIGxldCB2YWxpZENvbENvdW50ID0gMDtcbiAgICBsZXQgbG9zZUNvdW50ID0gMDtcbiAgICBjb25zdCBjb2x1bW5zID0gb3B0LmNvbHVtZW5zISBhcyBfU1RDb2x1bW5bXTtcbiAgICBpZiAoY29sdW1ucy5maW5kSW5kZXgodyA9PiB3Ll93aWR0aCAhPSBudWxsKSAhPT0gLTEpIHtcbiAgICAgIC8vIHdweDogd2lkdGggaW4gc2NyZWVuIHBpeGVscyBodHRwczovL2dpdGh1Yi5jb20vU2hlZXRKUy9zaGVldGpzI2NvbHVtbi1wcm9wZXJ0aWVzXG4gICAgICBzaGVldFsnIWNvbHMnXSA9IGNvbHVtbnMubWFwKGNvbCA9PiAoeyB3cHg6IGNvbC5fd2lkdGggfSkpO1xuICAgIH1cbiAgICBmb3IgKGxldCBjb2xJZHggPSAwOyBjb2xJZHggPCBjb2x1bW5zLmxlbmd0aDsgY29sSWR4KyspIHtcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHVtbnNbY29sSWR4XTtcbiAgICAgIGlmIChjb2wuZXhwb3J0ZWQgPT09IGZhbHNlIHx8ICFjb2wuaW5kZXggfHwgISghY29sLmJ1dHRvbnMgfHwgY29sLmJ1dHRvbnMubGVuZ3RoID09PSAwKSkge1xuICAgICAgICArK2xvc2VDb3VudDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICArK3ZhbGlkQ29sQ291bnQ7XG4gICAgICBjb25zdCBjb2x1bW5OYW1lID0gdGhpcy54bHN4U3J2Lm51bWJlclRvU2NoZW1hKGNvbElkeCArIDEgLSBsb3NlQ291bnQpO1xuICAgICAgc2hlZXRbYCR7Y29sdW1uTmFtZX0xYF0gPSB7XG4gICAgICAgIHQ6ICdzJyxcbiAgICAgICAgdjogdHlwZW9mIGNvbC50aXRsZSA9PT0gJ29iamVjdCcgPyBjb2wudGl0bGUudGV4dCA6IGNvbC50aXRsZVxuICAgICAgfTtcbiAgICAgIGZvciAobGV0IGRhdGFJZHggPSAwOyBkYXRhSWR4IDwgZGF0YUxlbjsgZGF0YUlkeCsrKSB7XG4gICAgICAgIHNoZWV0W2Ake2NvbHVtbk5hbWV9JHtkYXRhSWR4ICsgMn1gXSA9IHRoaXMuX3N0R2V0KG9wdC5kYXRhIVtkYXRhSWR4XSwgY29sLCBkYXRhSWR4LCBjb2xJZHgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWxpZENvbENvdW50ID4gMCAmJiBkYXRhTGVuID4gMCkge1xuICAgICAgc2hlZXRbJyFyZWYnXSA9IGBBMToke3RoaXMueGxzeFNydi5udW1iZXJUb1NjaGVtYSh2YWxpZENvbENvdW50KX0ke2RhdGFMZW4gKyAxfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoZWV0cztcbiAgfVxuXG4gIGFzeW5jIGV4cG9ydChvcHQ6IFNURXhwb3J0T3B0aW9ucyk6IFByb21pc2U8WGxzeEV4cG9ydFJlc3VsdD4ge1xuICAgIGNvbnN0IHNoZWV0cyA9IHRoaXMuZ2VuU2hlZXQob3B0KTtcbiAgICByZXR1cm4gdGhpcy54bHN4U3J2LmV4cG9ydCh7XG4gICAgICBzaGVldHMsXG4gICAgICBmaWxlbmFtZTogb3B0LmZpbGVuYW1lLFxuICAgICAgY2FsbGJhY2s6IG9wdC5jYWxsYmFja1xuICAgIH0pO1xuICB9XG59XG4iXX0=