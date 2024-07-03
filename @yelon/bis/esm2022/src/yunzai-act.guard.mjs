import { Injectable, inject } from '@angular/core';
import { BUSINESS_DEFAULT_CONFIG, mergeBisConfig } from '@yelon/bis/config';
import { deepCopy, log, useLocalStorageUser } from '@yelon/util';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: ActGuardService, deps: [{ token: i1.YunzaiConfigService }, { token: i1.PathToRegexpService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: ActGuardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: ActGuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }, { type: i1.PathToRegexpService }, { type: i2.Router }] });
export const actGuardCanActive = (_, state) => inject(ActGuardService).process(state.url);
export const actGuardCanActiveChild = (_, state) => inject(ActGuardService).process(state.url);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWFjdC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9zcmMveXVuemFpLWFjdC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUUsT0FBTyxFQUNMLFFBQVEsRUFDUixHQUFHLEVBSUgsbUJBQW1CLEVBRXBCLE1BQU0sYUFBYSxDQUFDOzs7O0FBSXJCLE1BQU0sT0FBTyxlQUFlO0lBSzFCLFlBQ1UsYUFBa0MsRUFDbEMsWUFBaUMsRUFDakMsTUFBYztRQUZkLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVBoQixRQUFHLEdBQXlCLHVCQUF1QixDQUFDO1FBQ3BELFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBQ3hCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFPM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFDMUMsTUFBTSxJQUFJLEdBQWUsT0FBTyxFQUFHLENBQUM7UUFDcEMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQWtCLElBQUksRUFBRSxDQUFDLENBQUMsTUFB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QztZQUNELElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OEdBL0VVLGVBQWU7a0hBQWYsZUFBZSxjQURGLE1BQU07OzJGQUNuQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFtRmxDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pHLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUF1QixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZUNoaWxkRm4sIENhbkFjdGl2YXRlRm4sIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEJVU0lORVNTX0RFRkFVTFRfQ09ORklHLCBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJ0B5ZWxvbi9iaXMvY29uZmlnJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHtcbiAgZGVlcENvcHksXG4gIGxvZyxcbiAgWXVuemFpQnVzaW5lc3NDb25maWcsXG4gIFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gIFBhdGhUb1JlZ2V4cFNlcnZpY2UsXG4gIHVzZUxvY2FsU3RvcmFnZVVzZXIsXG4gIFl1bnphaVVzZXJcbn0gZnJvbSAnQHllbG9uL3V0aWwnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBY3RHdWFyZFNlcnZpY2Uge1xuICBwcml2YXRlIGJpczogWXVuemFpQnVzaW5lc3NDb25maWcgPSBCVVNJTkVTU19ERUZBVUxUX0NPTkZJRztcbiAgcHJpdmF0ZSBtZW51czogTnpTYWZlQW55W10gPSBbXTtcbiAgcHJpdmF0ZSBsaW5rczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IFl1bnphaUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXRoVG9SZWdleHA6IFBhdGhUb1JlZ2V4cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBsb2coJ2FjdDogJyk7XG4gICAgdGhpcy5iaXMgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICAgIGxvZygnYWN0OiBjb25maWcgJywgdGhpcy5iaXMpO1xuICAgIGNvbnN0IFssIGdldFVzZXJdID0gdXNlTG9jYWxTdG9yYWdlVXNlcigpO1xuICAgIGNvbnN0IHVzZXI6IFl1bnphaVVzZXIgPSBnZXRVc2VyKCkhO1xuICAgIGxvZygnYWN0OiB1c2VyICcsIHVzZXIpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLm1lbnVzID0gZGVlcENvcHkoKHVzZXIubWVudSBhcyBOelNhZmVBbnkpIHx8IFtdKS5maWx0ZXIoXG4gICAgICAobTogTWVudSkgPT4gbS5zeXN0ZW1Db2RlICYmIG0uc3lzdGVtQ29kZSA9PT0gdGhpcy5iaXMuc3lzdGVtQ29kZVxuICAgICkgYXMgTWVudVtdO1xuICAgIGxvZygnYWN0OiBtZW51cyAnLCB0aGlzLm1lbnVzKTtcbiAgICB0aGlzLmdldEFsbExpbmtzKHRoaXMubWVudXMsIHRoaXMubGlua3MpO1xuICAgIGxvZygnYWN0OiBsaW5rcyAnLCB0aGlzLmxpbmtzKTtcbiAgfVxuXG4gIHByb2Nlc3ModXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsb2coJ2FjdDogY2FuIGFjdGl2YXRlICcsIHVybCk7XG4gICAgaWYgKHRoaXMucHJlSGFuZGxlKHVybCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2coJ2FjdDogY2FuIGFjdGl2YXRlIGNoaWxkIHByZWhhbmRsZSBzdWNjZXNzJyk7XG4gICAgbGV0IGNhbmFjdGl2YXRlID0gZmFsc2U7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKChsaW5rOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIHBhdGggPSAveHh4XG4gICAgICBpZiAobGluayA9PT0gdXJsLnNwbGl0KCc/JylbMF0pIHtcbiAgICAgICAgY2FuYWN0aXZhdGUgPSB0cnVlO1xuICAgICAgICBsb2coYGFjdDogbGluayB2YWx1ZSAke2xpbmt9IGVxdWFscyB1cmwgdmFsdWUgJHt1cmx9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIHBhaHQgPSAveHh4Lzp4eFxuICAgICAgY29uc3QgcmVnZXhwOiBSZWdFeHAgPSB0aGlzLnBhdGhUb1JlZ2V4cC5zdHJpbmdUb1JlZ2V4cChsaW5rLCBudWxsLCBudWxsKTtcbiAgICAgIGxvZyhgYWN0OiAke2xpbmt9IHRlc3QgJHt1cmwuc3BsaXQoJz8nKVswXX1gKTtcbiAgICAgIGlmIChyZWdleHAudGVzdCh1cmwuc3BsaXQoJz8nKVswXSkpIHtcbiAgICAgICAgY2FuYWN0aXZhdGUgPSB0cnVlO1xuICAgICAgICBsb2coYGFjdDogdGVzdCB2YWx1ZSAke2NhbmFjdGl2YXRlfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNhbmFjdGl2YXRlKSB7XG4gICAgICBsb2coYGFjdDogdGVzdCBzdWNlc3NgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2coYGFjdDogdGVzdCBlcnJvcmApO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydkaXNwbGF5SW5kZXgnXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJlSGFuZGxlKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHVybC5pbmNsdWRlcygnZXJyb3InKSB8fFxuICAgICAgdXJsLmluY2x1ZGVzKCdleGNlcHRpb24nKSB8fFxuICAgICAgdXJsLmluY2x1ZGVzKCdkaXNwbGF5SW5kZXgnKSB8fFxuICAgICAgdXJsID09PSAnJyB8fFxuICAgICAgdXJsID09PSBudWxsIHx8XG4gICAgICB1cmwgPT09ICcvJyB8fFxuICAgICAgdXJsLmluY2x1ZGVzKCdpZnJhbWVQYWdlJylcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsTGlua3MobWVudTogTWVudVtdLCBsaW5rczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBtZW51LmZvckVhY2goKHNpZGVyOiBNZW51KSA9PiB7XG4gICAgICBpZiAoc2lkZXIubGluaykge1xuICAgICAgICBsaW5rcy5wdXNoKHNpZGVyLmxpbmspO1xuICAgICAgfVxuICAgICAgaWYgKHNpZGVyLmNoaWxkcmVuICYmIHNpZGVyLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5nZXRBbGxMaW5rcyhzaWRlci5jaGlsZHJlbiwgbGlua3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhY3RHdWFyZENhbkFjdGl2ZTogQ2FuQWN0aXZhdGVGbiA9IChfLCBzdGF0ZSkgPT4gaW5qZWN0KEFjdEd1YXJkU2VydmljZSkucHJvY2VzcyhzdGF0ZS51cmwpO1xuZXhwb3J0IGNvbnN0IGFjdEd1YXJkQ2FuQWN0aXZlQ2hpbGQ6IENhbkFjdGl2YXRlQ2hpbGRGbiA9IChfLCBzdGF0ZSkgPT4gaW5qZWN0KEFjdEd1YXJkU2VydmljZSkucHJvY2VzcyhzdGF0ZS51cmwpO1xuIl19