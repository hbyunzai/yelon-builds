import { Pipe, inject } from '@angular/core';
import { YUNZAI_I18N_TOKEN } from './i18n';
import * as i0 from "@angular/core";
export class I18nPipe {
    constructor() {
        this.i18n = inject(YUNZAI_I18N_TOKEN);
    }
    transform(key, params) {
        return this.i18n.fanyi(key, params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: I18nPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: I18nPipe, isStandalone: true, name: "i18n" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: I18nPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'i18n', standalone: true }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdGhlbWUvc3JjL3NlcnZpY2VzL2kxOG4vaTE4bi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxRQUFRLENBQUM7O0FBRzNDLE1BQU0sT0FBTyxRQUFRO0lBRHJCO1FBRW1CLFNBQUksR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUtuRDtJQUhDLFNBQVMsQ0FBQyxHQUFXLEVBQUUsTUFBNEI7UUFDakQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs4R0FMVSxRQUFROzRHQUFSLFFBQVE7OzJGQUFSLFFBQVE7a0JBRHBCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWVVOWkFJX0kxOE5fVE9LRU4gfSBmcm9tICcuL2kxOG4nO1xuXG5AUGlwZSh7IG5hbWU6ICdpMThuJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIEkxOG5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4biA9IGluamVjdChZVU5aQUlfSTE4Tl9UT0tFTik7XG5cbiAgdHJhbnNmb3JtKGtleTogc3RyaW5nLCBwYXJhbXM/OiB1bmtub3duIHwgdW5rbm93bltdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pMThuLmZhbnlpKGtleSwgcGFyYW1zKTtcbiAgfVxufVxuIl19