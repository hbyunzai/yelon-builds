import { Injectable, inject } from '@angular/core';
import { deepCopy, log, useLocalStorageUser } from '@yelon/util';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from './bis.config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util";
import * as i2 from "@angular/router";
export class ActGuardService {
    constructor(configService, pathToRegexp, router) {
        this.configService = configService;
        this.pathToRegexp = pathToRegexp;
        this.router = router;
        this.bis = BUSINESS_DEFAULT_CONFIG;
        this.menus = [];
        this.links = [];
        log('act: ');
        this.bis = mergeBisConfig(this.configService);
        log('act: config ', this.bis);
        const [, getUser] = useLocalStorageUser();
        const user = getUser();
        log('act: user ', user);
        // @ts-ignore
        this.menus = deepCopy(user.menu || []).filter((m) => m.systemCode && m.systemCode === this.bis.systemCode);
        log('act: menus ', this.menus);
        this.getAllLinks(this.menus, this.links);
        log('act: links ', this.links);
    }
    process(url) {
        log('act: can activate ', url);
        if (this.preHandle(url)) {
            return true;
        }
        log('act: can activate child prehandle success');
        let canactivate = false;
        this.links.forEach((link) => {
            // path = /xxx
            if (link === url.split('?')[0]) {
                canactivate = true;
                log(`act: link value ${link} equals url value ${url}`);
                return;
            }
            // paht = /xxx/:xx
            const regexp = this.pathToRegexp.stringToRegexp(link, null, null);
            log(`act: ${link} test ${url.split('?')[0]}`);
            if (regexp.test(url.split('?')[0])) {
                canactivate = true;
                log(`act: test value ${canactivate}`);
                return;
            }
        });
        if (canactivate) {
            log(`act: test sucess`);
            return true;
        }
        else {
            log(`act: test error`);
            this.router.navigate(['displayIndex']);
            return false;
        }
    }
    preHandle(url) {
        return (url.includes('error') ||
            url.includes('exception') ||
            url.includes('displayIndex') ||
            url === '' ||
            url === null ||
            url === '/' ||
            url.includes('iframePage'));
    }
    getAllLinks(menu, links) {
        menu.forEach((sider) => {
            if (sider.link) {
                links.push(sider.link);
            }
            if (sider.children && sider.children.length > 0) {
                this.getAllLinks(sider.children, links);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ActGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ActGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.1", ngImport: i0, type: ActGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: i2.Router }] });
export const actGuardCanActive = (_, state) => inject(ActGuardService).process(state.url);
export const actGuardCanActiveChild = (_, state) => inject(ActGuardService).process(state.url);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFjdC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQveXVuemFpLWFjdC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUluRCxPQUFPLEVBQ0wsUUFBUSxFQUNSLEdBQUcsRUFJSCxtQkFBbUIsRUFFcEIsTUFBTSxhQUFhLENBQUM7QUFHckIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUd2RSxNQUFNLE9BQU8sZUFBZTtJQUsxQixZQUNVLGFBQWtDLEVBQ2xDLFlBQWlDLEVBQ2pDLE1BQWM7UUFGZCxrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFQaEIsUUFBRyxHQUF5Qix1QkFBdUIsQ0FBQztRQUNwRCxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBTzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLE1BQU0sSUFBSSxHQUFlLE9BQU8sRUFBRyxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEIsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFFLElBQUksQ0FBQyxJQUFrQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1B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QUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQS9FVSxlQUFlO2tIQUFmLGVBQWUsY0FERixNQUFNOzsyRkFDbkIsZUFBZTtrQkFEM0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBbUZsQyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RyxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBdUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGVDaGlsZEZuLCBDYW5BY3RpdmF0ZUZuLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIGRlZXBDb3B5LFxuICBsb2csXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlLFxuICBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBZdW56YWlVc2VyXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4vYmlzLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQWN0R3VhcmRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBiaXM6IFl1bnphaUJ1c2luZXNzQ29uZmlnID0gQlVTSU5FU1NfREVGQVVMVF9DT05GSUc7XG4gIHByaXZhdGUgbWVudXM6IE56U2FmZUFueVtdID0gW107XG4gIHByaXZhdGUgbGlua3M6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBZdW56YWlDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGF0aFRvUmVnZXhwOiBQYXRoVG9SZWdleHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgbG9nKCdhY3Q6ICcpO1xuICAgIHRoaXMuYmlzID0gbWVyZ2VCaXNDb25maWcodGhpcy5jb25maWdTZXJ2aWNlKTtcbiAgICBsb2coJ2FjdDogY29uZmlnICcsIHRoaXMuYmlzKTtcbiAgICBjb25zdCBbLCBnZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCB1c2VyOiBZdW56YWlVc2VyID0gZ2V0VXNlcigpITtcbiAgICBsb2coJ2FjdDogdXNlciAnLCB1c2VyKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5tZW51cyA9IGRlZXBDb3B5KCh1c2VyLm1lbnUgYXMgTnpTYWZlQW55KSB8fCBbXSkuZmlsdGVyKFxuICAgICAgKG06IE1lbnUpID0+IG0uc3lzdGVtQ29kZSAmJiBtLnN5c3RlbUNvZGUgPT09IHRoaXMuYmlzLnN5c3RlbUNvZGVcbiAgICApIGFzIE1lbnVbXTtcbiAgICBsb2coJ2FjdDogbWVudXMgJywgdGhpcy5tZW51cyk7XG4gICAgdGhpcy5nZXRBbGxMaW5rcyh0aGlzLm1lbnVzLCB0aGlzLmxpbmtzKTtcbiAgICBsb2coJ2FjdDogbGlua3MgJywgdGhpcy5saW5rcyk7XG4gIH1cblxuICBwcm9jZXNzKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbG9nKCdhY3Q6IGNhbiBhY3RpdmF0ZSAnLCB1cmwpO1xuICAgIGlmICh0aGlzLnByZUhhbmRsZSh1cmwpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nKCdhY3Q6IGNhbiBhY3RpdmF0ZSBjaGlsZCBwcmVoYW5kbGUgc3VjY2VzcycpO1xuICAgIGxldCBjYW5hY3RpdmF0ZSA9IGZhbHNlO1xuICAgIHRoaXMubGlua3MuZm9yRWFjaCgobGluazogc3RyaW5nKSA9PiB7XG4gICAgICAvLyBwYXRoID0gL3h4eFxuICAgICAgaWYgKGxpbmsgPT09IHVybC5zcGxpdCgnPycpWzBdKSB7XG4gICAgICAgIGNhbmFjdGl2YXRlID0gdHJ1ZTtcbiAgICAgICAgbG9nKGBhY3Q6IGxpbmsgdmFsdWUgJHtsaW5rfSBlcXVhbHMgdXJsIHZhbHVlICR7dXJsfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBwYWh0ID0gL3h4eC86eHhcbiAgICAgIGNvbnN0IHJlZ2V4cDogUmVnRXhwID0gdGhpcy5wYXRoVG9SZWdleHAuc3RyaW5nVG9SZWdleHAobGluaywgbnVsbCwgbnVsbCk7XG4gICAgICBsb2coYGFjdDogJHtsaW5rfSB0ZXN0ICR7dXJsLnNwbGl0KCc/JylbMF19YCk7XG4gICAgICBpZiAocmVnZXhwLnRlc3QodXJsLnNwbGl0KCc/JylbMF0pKSB7XG4gICAgICAgIGNhbmFjdGl2YXRlID0gdHJ1ZTtcbiAgICAgICAgbG9nKGBhY3Q6IHRlc3QgdmFsdWUgJHtjYW5hY3RpdmF0ZX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjYW5hY3RpdmF0ZSkge1xuICAgICAgbG9nKGBhY3Q6IHRlc3Qgc3VjZXNzYCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGBhY3Q6IHRlc3QgZXJyb3JgKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnZGlzcGxheUluZGV4J10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByZUhhbmRsZSh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB1cmwuaW5jbHVkZXMoJ2Vycm9yJykgfHxcbiAgICAgIHVybC5pbmNsdWRlcygnZXhjZXB0aW9uJykgfHxcbiAgICAgIHVybC5pbmNsdWRlcygnZGlzcGxheUluZGV4JykgfHxcbiAgICAgIHVybCA9PT0gJycgfHxcbiAgICAgIHVybCA9PT0gbnVsbCB8fFxuICAgICAgdXJsID09PSAnLycgfHxcbiAgICAgIHVybC5pbmNsdWRlcygnaWZyYW1lUGFnZScpXG4gICAgKTtcbiAgfVxuXG4gIGdldEFsbExpbmtzKG1lbnU6IE1lbnVbXSwgbGlua3M6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgbWVudS5mb3JFYWNoKChzaWRlcjogTWVudSkgPT4ge1xuICAgICAgaWYgKHNpZGVyLmxpbmspIHtcbiAgICAgICAgbGlua3MucHVzaChzaWRlci5saW5rKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaWRlci5jaGlsZHJlbiAmJiBzaWRlci5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0QWxsTGlua3Moc2lkZXIuY2hpbGRyZW4sIGxpbmtzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWN0R3VhcmRDYW5BY3RpdmU6IENhbkFjdGl2YXRlRm4gPSAoXywgc3RhdGUpID0+IGluamVjdChBY3RHdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcbmV4cG9ydCBjb25zdCBhY3RHdWFyZENhbkFjdGl2ZUNoaWxkOiBDYW5BY3RpdmF0ZUNoaWxkRm4gPSAoXywgc3RhdGUpID0+IGluamVjdChBY3RHdWFyZFNlcnZpY2UpLnByb2Nlc3Moc3RhdGUudXJsKTtcbiJdfQ==