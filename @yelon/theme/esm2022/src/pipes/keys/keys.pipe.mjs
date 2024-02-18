import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * [Document](https://ng.yunzainfo.com/theme/keys)
 */
export class KeysPipe {
    transform(value, keyIsNumber = false) {
        const ret = [];
        Object.keys(value).forEach(key => {
            ret.push({ key: keyIsNumber ? +key : key, value: value[key] });
        });
        return ret;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: KeysPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "17.2.1", ngImport: i0, type: KeysPipe, isStandalone: true, name: "keys" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: KeysPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'keys', standalone: true }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3BpcGVzL2tleXMva2V5cy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUlwRDs7R0FFRztBQUVILE1BQU0sT0FBTyxRQUFRO0lBQ25CLFNBQVMsQ0FBQyxLQUFnQixFQUFFLGNBQXVCLEtBQUs7UUFDdEQsTUFBTSxHQUFHLEdBQWdCLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs4R0FQVSxRQUFROzRHQUFSLFFBQVE7OzJGQUFSLFFBQVE7a0JBRHBCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuLyoqXG4gKiBbRG9jdW1lbnRdKGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS90aGVtZS9rZXlzKVxuICovXG5AUGlwZSh7IG5hbWU6ICdrZXlzJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIEtleXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogTnpTYWZlQW55LCBrZXlJc051bWJlcjogYm9vbGVhbiA9IGZhbHNlKTogTnpTYWZlQW55W10ge1xuICAgIGNvbnN0IHJldDogTnpTYWZlQW55W10gPSBbXTtcbiAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmV0LnB1c2goeyBrZXk6IGtleUlzTnVtYmVyID8gK2tleSA6IGtleSwgdmFsdWU6IHZhbHVlW2tleV0gfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuIl19