import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
export const REP_MAX = 6;
export const SPAN_MAX = 24;
export class ResponsiveService {
    constructor(cogSrv) {
        this.cog = cogSrv.merge('themeResponsive', {
            rules: {
                1: { xs: 24 },
                2: { xs: 24, sm: 12 },
                3: { xs: 24, sm: 12, md: 8 },
                4: { xs: 24, sm: 12, md: 8, lg: 6 },
                5: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
                6: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2 }
            }
        });
        if (Object.keys(this.cog.rules)
            .map(i => +i)
            .some((i) => i < 1 || i > REP_MAX)) {
            throw new Error(`[theme] the responseive rule index value range must be 1-${REP_MAX}`);
        }
    }
    genCls(count, defaultCol = 1) {
        const rule = { ...this.cog.rules[count > REP_MAX ? REP_MAX : Math.max(count, 1)] };
        const antColClass = 'ant-col';
        const itemMaxSpan = SPAN_MAX / defaultCol;
        const paddingSpan = (value) => {
            if (value == null || defaultCol <= 1 || count >= defaultCol)
                return value;
            return Math.max(value, count * itemMaxSpan);
        };
        const clsMap = [`${antColClass}-xs-${paddingSpan(rule.xs)}`];
        if (rule.sm)
            clsMap.push(`${antColClass}-sm-${paddingSpan(rule.sm)}`);
        if (rule.md)
            clsMap.push(`${antColClass}-md-${paddingSpan(rule.md)}`);
        if (rule.lg)
            clsMap.push(`${antColClass}-lg-${paddingSpan(rule.lg)}`);
        if (rule.xl)
            clsMap.push(`${antColClass}-xl-${paddingSpan(rule.xl)}`);
        if (rule.xxl)
            clsMap.push(`${antColClass}-xxl-${paddingSpan(rule.xxl)}`);
        return clsMap;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ResponsiveService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ResponsiveService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ResponsiveService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.YunzaiConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2l2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9yZXNwb25zaXZlL3Jlc3BvbnNpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSTNDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUszQixNQUFNLE9BQU8saUJBQWlCO0lBRTVCLFlBQVksTUFBMkI7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO1lBQ3pDLEtBQUssRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUNiLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDckIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQzVCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQ25DLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDMUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7YUFDbkQ7U0FDRixDQUFFLENBQUM7UUFDSixJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7YUFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDWixJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUM1QztZQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDeEY7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWEsRUFBRSxhQUFxQixDQUFDO1FBQzFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNuRixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFFOUIsTUFBTSxXQUFXLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMxQyxNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQXlCLEVBQXNCLEVBQUU7WUFDcEUsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDMUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLFdBQVcsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxHQUFHO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsUUFBUSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOytHQXRDVSxpQkFBaUI7bUhBQWpCLGlCQUFpQixjQURKLE1BQU07OzRGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlLCBZdW56YWlUaGVtZVJlc3BvbnNpdmVDb25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgUkVQX01BWCA9IDY7XG5leHBvcnQgY29uc3QgU1BBTl9NQVggPSAyNDtcblxuZXhwb3J0IHR5cGUgUkVQX1RZUEUgPSAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUmVzcG9uc2l2ZVNlcnZpY2Uge1xuICBwcml2YXRlIGNvZzogWXVuemFpVGhlbWVSZXNwb25zaXZlQ29uZmlnO1xuICBjb25zdHJ1Y3Rvcihjb2dTcnY6IFl1bnphaUNvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmNvZyA9IGNvZ1Nydi5tZXJnZSgndGhlbWVSZXNwb25zaXZlJywge1xuICAgICAgcnVsZXM6IHtcbiAgICAgICAgMTogeyB4czogMjQgfSxcbiAgICAgICAgMjogeyB4czogMjQsIHNtOiAxMiB9LFxuICAgICAgICAzOiB7IHhzOiAyNCwgc206IDEyLCBtZDogOCB9LFxuICAgICAgICA0OiB7IHhzOiAyNCwgc206IDEyLCBtZDogOCwgbGc6IDYgfSxcbiAgICAgICAgNTogeyB4czogMjQsIHNtOiAxMiwgbWQ6IDgsIGxnOiA2LCB4bDogNCB9LFxuICAgICAgICA2OiB7IHhzOiAyNCwgc206IDEyLCBtZDogOCwgbGc6IDYsIHhsOiA0LCB4eGw6IDIgfVxuICAgICAgfVxuICAgIH0pITtcbiAgICBpZiAoXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNvZy5ydWxlcylcbiAgICAgICAgLm1hcChpID0+ICtpKVxuICAgICAgICAuc29tZSgoaTogbnVtYmVyKSA9PiBpIDwgMSB8fCBpID4gUkVQX01BWClcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3RoZW1lXSB0aGUgcmVzcG9uc2VpdmUgcnVsZSBpbmRleCB2YWx1ZSByYW5nZSBtdXN0IGJlIDEtJHtSRVBfTUFYfWApO1xuICAgIH1cbiAgfVxuXG4gIGdlbkNscyhjb3VudDogbnVtYmVyLCBkZWZhdWx0Q29sOiBudW1iZXIgPSAxKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJ1bGUgPSB7IC4uLnRoaXMuY29nLnJ1bGVzW2NvdW50ID4gUkVQX01BWCA/IFJFUF9NQVggOiBNYXRoLm1heChjb3VudCwgMSldIH07XG4gICAgY29uc3QgYW50Q29sQ2xhc3MgPSAnYW50LWNvbCc7XG5cbiAgICBjb25zdCBpdGVtTWF4U3BhbiA9IFNQQU5fTUFYIC8gZGVmYXVsdENvbDtcbiAgICBjb25zdCBwYWRkaW5nU3BhbiA9ICh2YWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IGRlZmF1bHRDb2wgPD0gMSB8fCBjb3VudCA+PSBkZWZhdWx0Q29sKSByZXR1cm4gdmFsdWU7XG4gICAgICByZXR1cm4gTWF0aC5tYXgodmFsdWUsIGNvdW50ICogaXRlbU1heFNwYW4pO1xuICAgIH07XG4gICAgY29uc3QgY2xzTWFwID0gW2Ake2FudENvbENsYXNzfS14cy0ke3BhZGRpbmdTcGFuKHJ1bGUueHMpfWBdO1xuICAgIGlmIChydWxlLnNtKSBjbHNNYXAucHVzaChgJHthbnRDb2xDbGFzc30tc20tJHtwYWRkaW5nU3BhbihydWxlLnNtKX1gKTtcbiAgICBpZiAocnVsZS5tZCkgY2xzTWFwLnB1c2goYCR7YW50Q29sQ2xhc3N9LW1kLSR7cGFkZGluZ1NwYW4ocnVsZS5tZCl9YCk7XG4gICAgaWYgKHJ1bGUubGcpIGNsc01hcC5wdXNoKGAke2FudENvbENsYXNzfS1sZy0ke3BhZGRpbmdTcGFuKHJ1bGUubGcpfWApO1xuICAgIGlmIChydWxlLnhsKSBjbHNNYXAucHVzaChgJHthbnRDb2xDbGFzc30teGwtJHtwYWRkaW5nU3BhbihydWxlLnhsKX1gKTtcbiAgICBpZiAocnVsZS54eGwpIGNsc01hcC5wdXNoKGAke2FudENvbENsYXNzfS14eGwtJHtwYWRkaW5nU3BhbihydWxlLnh4bCl9YCk7XG4gICAgcmV0dXJuIGNsc01hcDtcbiAgfVxufVxuIl19