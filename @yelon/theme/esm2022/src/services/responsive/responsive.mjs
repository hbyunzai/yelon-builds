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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: ResponsiveService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: ResponsiveService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: ResponsiveService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2l2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9yZXNwb25zaXZlL3Jlc3BvbnNpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSTNDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUszQixNQUFNLE9BQU8saUJBQWlCO0lBRTVCLFlBQVksTUFBMkI7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO1lBQ3pDLEtBQUssRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUNiLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDckIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQzVCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQ25DLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDMUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7YUFDbkQ7U0FDRixDQUFFLENBQUM7UUFDSixJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7YUFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDWixJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUM1QyxDQUFDO1lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhLEVBQUUsYUFBcUIsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbkYsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBRTlCLE1BQU0sV0FBVyxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUF5QixFQUFzQixFQUFFO1lBQ3BFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxVQUFVO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxXQUFXLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsR0FBRztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLFFBQVEsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzsrR0F0Q1UsaUJBQWlCO21IQUFqQixpQkFBaUIsY0FESixNQUFNOzs0RkFDbkIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWXVuemFpQ29uZmlnU2VydmljZSwgWXVuemFpVGhlbWVSZXNwb25zaXZlQ29uZmlnIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IFJFUF9NQVggPSA2O1xuZXhwb3J0IGNvbnN0IFNQQU5fTUFYID0gMjQ7XG5cbmV4cG9ydCB0eXBlIFJFUF9UWVBFID0gMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFJlc3BvbnNpdmVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb2c6IFl1bnphaVRoZW1lUmVzcG9uc2l2ZUNvbmZpZztcbiAgY29uc3RydWN0b3IoY29nU3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb2cgPSBjb2dTcnYubWVyZ2UoJ3RoZW1lUmVzcG9uc2l2ZScsIHtcbiAgICAgIHJ1bGVzOiB7XG4gICAgICAgIDE6IHsgeHM6IDI0IH0sXG4gICAgICAgIDI6IHsgeHM6IDI0LCBzbTogMTIgfSxcbiAgICAgICAgMzogeyB4czogMjQsIHNtOiAxMiwgbWQ6IDggfSxcbiAgICAgICAgNDogeyB4czogMjQsIHNtOiAxMiwgbWQ6IDgsIGxnOiA2IH0sXG4gICAgICAgIDU6IHsgeHM6IDI0LCBzbTogMTIsIG1kOiA4LCBsZzogNiwgeGw6IDQgfSxcbiAgICAgICAgNjogeyB4czogMjQsIHNtOiAxMiwgbWQ6IDgsIGxnOiA2LCB4bDogNCwgeHhsOiAyIH1cbiAgICAgIH1cbiAgICB9KSE7XG4gICAgaWYgKFxuICAgICAgT2JqZWN0LmtleXModGhpcy5jb2cucnVsZXMpXG4gICAgICAgIC5tYXAoaSA9PiAraSlcbiAgICAgICAgLnNvbWUoKGk6IG51bWJlcikgPT4gaSA8IDEgfHwgaSA+IFJFUF9NQVgpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFt0aGVtZV0gdGhlIHJlc3BvbnNlaXZlIHJ1bGUgaW5kZXggdmFsdWUgcmFuZ2UgbXVzdCBiZSAxLSR7UkVQX01BWH1gKTtcbiAgICB9XG4gIH1cblxuICBnZW5DbHMoY291bnQ6IG51bWJlciwgZGVmYXVsdENvbDogbnVtYmVyID0gMSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBydWxlID0geyAuLi50aGlzLmNvZy5ydWxlc1tjb3VudCA+IFJFUF9NQVggPyBSRVBfTUFYIDogTWF0aC5tYXgoY291bnQsIDEpXSB9O1xuICAgIGNvbnN0IGFudENvbENsYXNzID0gJ2FudC1jb2wnO1xuXG4gICAgY29uc3QgaXRlbU1heFNwYW4gPSBTUEFOX01BWCAvIGRlZmF1bHRDb2w7XG4gICAgY29uc3QgcGFkZGluZ1NwYW4gPSAodmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBkZWZhdWx0Q29sIDw9IDEgfHwgY291bnQgPj0gZGVmYXVsdENvbCkgcmV0dXJuIHZhbHVlO1xuICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbHVlLCBjb3VudCAqIGl0ZW1NYXhTcGFuKTtcbiAgICB9O1xuICAgIGNvbnN0IGNsc01hcCA9IFtgJHthbnRDb2xDbGFzc30teHMtJHtwYWRkaW5nU3BhbihydWxlLnhzKX1gXTtcbiAgICBpZiAocnVsZS5zbSkgY2xzTWFwLnB1c2goYCR7YW50Q29sQ2xhc3N9LXNtLSR7cGFkZGluZ1NwYW4ocnVsZS5zbSl9YCk7XG4gICAgaWYgKHJ1bGUubWQpIGNsc01hcC5wdXNoKGAke2FudENvbENsYXNzfS1tZC0ke3BhZGRpbmdTcGFuKHJ1bGUubWQpfWApO1xuICAgIGlmIChydWxlLmxnKSBjbHNNYXAucHVzaChgJHthbnRDb2xDbGFzc30tbGctJHtwYWRkaW5nU3BhbihydWxlLmxnKX1gKTtcbiAgICBpZiAocnVsZS54bCkgY2xzTWFwLnB1c2goYCR7YW50Q29sQ2xhc3N9LXhsLSR7cGFkZGluZ1NwYW4ocnVsZS54bCl9YCk7XG4gICAgaWYgKHJ1bGUueHhsKSBjbHNNYXAucHVzaChgJHthbnRDb2xDbGFzc30teHhsLSR7cGFkZGluZ1NwYW4ocnVsZS54eGwpfWApO1xuICAgIHJldHVybiBjbHNNYXA7XG4gIH1cbn1cbiJdfQ==