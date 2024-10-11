import { Injectable, NgZone, inject } from '@angular/core';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { YunzaiConfigService } from '@yelon/util/config';
import { REGEX } from '@yelon/util/format';
import { mergeConfig } from './config';
import * as i0 from "@angular/core";
export class SchemaValidatorFactory {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: SchemaValidatorFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: SchemaValidatorFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: SchemaValidatorFactory, decorators: [{
            type: Injectable
        }] });
export class AjvSchemaValidatorFactory extends SchemaValidatorFactory {
    constructor() {
        super();
        this.ngZone = inject(NgZone);
        this.cogSrv = inject(YunzaiConfigService);
        if (!(typeof document === 'object' && !!document)) {
            return;
        }
        this.options = mergeConfig(this.cogSrv);
        const customOptions = this.options.ajv || {};
        this.ngZone.runOutsideAngular(() => {
            this.ajv = new Ajv({
                allErrors: true,
                loopEnum: 50,
                ...customOptions,
                formats: {
                    'data-url': /^data:([a-z]+\/[a-z0-9-+.]+)?;name=(.*);base64,(.*)$/,
                    color: REGEX.color,
                    mobile: REGEX.mobile,
                    'id-card': REGEX.idCard,
                    ...customOptions.formats
                }
            });
            addFormats(this.ajv);
        });
    }
    createValidatorFn(schema, extraOptions) {
        const ignoreKeywords = [
            ...this.options.ignoreKeywords,
            ...(extraOptions.ignoreKeywords || [])
        ];
        return (value) => {
            try {
                this.ngZone.runOutsideAngular(() => this.ajv.validate(schema, value));
            }
            catch (e) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    // swallow errors thrown in ajv due to invalid schemas, these
                    // still get displayed
                    if (extraOptions.debug) {
                        console.warn(e);
                    }
                }
            }
            let errors = this.ajv.errors;
            if (this.options && ignoreKeywords && errors) {
                errors = errors.filter(w => ignoreKeywords.indexOf(w.keyword) === -1);
            }
            return errors;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: AjvSchemaValidatorFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: AjvSchemaValidatorFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: AjvSchemaValidatorFactory, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3JtL3NyYy92YWxpZGF0b3IuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0QsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQ3RCLE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUVyQyxPQUFPLEVBQUUsbUJBQW1CLEVBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBTXZDLE1BQU0sT0FBZ0Isc0JBQXNCOzhHQUF0QixzQkFBc0I7a0hBQXRCLHNCQUFzQjs7MkZBQXRCLHNCQUFzQjtrQkFEM0MsVUFBVTs7QUFTWCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsc0JBQXNCO0lBT25FO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFQTyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLFdBQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQU9wRCxJQUFJLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDbEQsT0FBTztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7Z0JBQ2pCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2dCQUNaLEdBQUcsYUFBYTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLFVBQVUsRUFBRSxzREFBc0Q7b0JBQ2xFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztvQkFDbEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO29CQUNwQixTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU07b0JBQ3ZCLEdBQUcsYUFBYSxDQUFDLE9BQU87aUJBQ3pCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFnQixDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQ2YsTUFBZ0IsRUFDaEIsWUFBMEQ7UUFFMUQsTUFBTSxjQUFjLEdBQWE7WUFDL0IsR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQTJCO1lBQzVDLEdBQUcsQ0FBRSxZQUFZLENBQUMsY0FBMkIsSUFBSSxFQUFFLENBQUM7U0FDckQsQ0FBQztRQUVGLE9BQU8sQ0FBQyxLQUFjLEVBQWUsRUFBRTtZQUNyQyxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDO1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDWCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDbEQsNkRBQTZEO29CQUM3RCxzQkFBc0I7b0JBQ3RCLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLGNBQWMsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDN0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUM7WUFDRCxPQUFPLE1BQXFCLENBQUM7UUFDL0IsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs4R0ExRFUseUJBQXlCO2tIQUF6Qix5QkFBeUI7OzJGQUF6Qix5QkFBeUI7a0JBRHJDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgQWp2IGZyb20gJ2Fqdic7XG5pbXBvcnQgYWRkRm9ybWF0cyBmcm9tICdhanYtZm9ybWF0cyc7XG5cbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UsIFl1bnphaVNGQ29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IFJFR0VYIH0gZnJvbSAnQHllbG9uL3V0aWwvZm9ybWF0JztcbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgbWVyZ2VDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBFcnJvckRhdGEgfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgeyBTRlZhbHVlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU0ZTY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IHtcbiAgYWJzdHJhY3QgY3JlYXRlVmFsaWRhdG9yRm4oXG4gICAgc2NoZW1hOiBTRlNjaGVtYSxcbiAgICBleHRyYU9wdGlvbnM6IHsgaWdub3JlS2V5d29yZHM6IHN0cmluZ1tdOyBkZWJ1ZzogYm9vbGVhbiB9XG4gICk6ICh2YWx1ZTogU0ZWYWx1ZSkgPT4gRXJyb3JEYXRhW107XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBanZTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IGV4dGVuZHMgU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbmdab25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29nU3J2ID0gaW5qZWN0KFl1bnphaUNvbmZpZ1NlcnZpY2UpO1xuXG4gIHByb3RlY3RlZCBhanYhOiBBanY7XG4gIHByb3RlY3RlZCBvcHRpb25zITogWXVuemFpU0ZDb25maWc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoISh0eXBlb2YgZG9jdW1lbnQgPT09ICdvYmplY3QnICYmICEhZG9jdW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlQ29uZmlnKHRoaXMuY29nU3J2KTtcbiAgICBjb25zdCBjdXN0b21PcHRpb25zID0gdGhpcy5vcHRpb25zLmFqdiB8fCB7fTtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmFqdiA9IG5ldyBBanYoe1xuICAgICAgICBhbGxFcnJvcnM6IHRydWUsXG4gICAgICAgIGxvb3BFbnVtOiA1MCxcbiAgICAgICAgLi4uY3VzdG9tT3B0aW9ucyxcbiAgICAgICAgZm9ybWF0czoge1xuICAgICAgICAgICdkYXRhLXVybCc6IC9eZGF0YTooW2Etel0rXFwvW2EtejAtOS0rLl0rKT87bmFtZT0oLiopO2Jhc2U2NCwoLiopJC8sXG4gICAgICAgICAgY29sb3I6IFJFR0VYLmNvbG9yLFxuICAgICAgICAgIG1vYmlsZTogUkVHRVgubW9iaWxlLFxuICAgICAgICAgICdpZC1jYXJkJzogUkVHRVguaWRDYXJkLFxuICAgICAgICAgIC4uLmN1c3RvbU9wdGlvbnMuZm9ybWF0c1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGFkZEZvcm1hdHModGhpcy5hanYgYXMgTnpTYWZlQW55KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVZhbGlkYXRvckZuKFxuICAgIHNjaGVtYTogU0ZTY2hlbWEsXG4gICAgZXh0cmFPcHRpb25zOiB7IGlnbm9yZUtleXdvcmRzOiBzdHJpbmdbXTsgZGVidWc6IGJvb2xlYW4gfVxuICApOiAodmFsdWU6IFNGVmFsdWUpID0+IEVycm9yRGF0YVtdIHtcbiAgICBjb25zdCBpZ25vcmVLZXl3b3Jkczogc3RyaW5nW10gPSBbXG4gICAgICAuLi4odGhpcy5vcHRpb25zLmlnbm9yZUtleXdvcmRzIGFzIHN0cmluZ1tdKSxcbiAgICAgIC4uLigoZXh0cmFPcHRpb25zLmlnbm9yZUtleXdvcmRzIGFzIHN0cmluZ1tdKSB8fCBbXSlcbiAgICBdO1xuXG4gICAgcmV0dXJuICh2YWx1ZTogU0ZWYWx1ZSk6IEVycm9yRGF0YVtdID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuYWp2LnZhbGlkYXRlKHNjaGVtYSwgdmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICAgIC8vIHN3YWxsb3cgZXJyb3JzIHRocm93biBpbiBhanYgZHVlIHRvIGludmFsaWQgc2NoZW1hcywgdGhlc2VcbiAgICAgICAgICAvLyBzdGlsbCBnZXQgZGlzcGxheWVkXG4gICAgICAgICAgaWYgKGV4dHJhT3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGVycm9ycyA9IHRoaXMuYWp2LmVycm9ycztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgaWdub3JlS2V5d29yZHMgJiYgZXJyb3JzKSB7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5maWx0ZXIodyA9PiBpZ25vcmVLZXl3b3Jkcy5pbmRleE9mKHcua2V5d29yZCkgPT09IC0xKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvcnMgYXMgRXJyb3JEYXRhW107XG4gICAgfTtcbiAgfVxufVxuIl19