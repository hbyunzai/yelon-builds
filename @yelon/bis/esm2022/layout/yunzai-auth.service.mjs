import { Injectable } from '@angular/core';
import { combineLatest, map, mergeMap, of } from 'rxjs';
import { YA_SERVICE_TOKEN } from '@yelon/auth';
import { _HttpClient } from '@yelon/theme';
import { log, useLocalStorageHeader, useLocalStorageProjectInfo, useLocalStorageTenant, useLocalStorageUser, WINDOW, YunzaiConfigService } from '@yelon/util';
import { mergeBisConfig } from './bis.config';
import * as i0 from "@angular/core";
export class YunzaiAuthService {
    constructor(injector) {
        this.injector = injector;
        this.config = mergeBisConfig(this.configService);
    }
    get configService() {
        return this.injector.get(YunzaiConfigService);
    }
    get tokenService() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get httpClient() {
        return this.injector.get(_HttpClient);
    }
    askToken() {
        log('yz.auth.service: ', 'askToken');
        if (this.config.loginForm) {
            return this.fetchTokenByUP();
        }
        else {
            return this.fetchTokenByCas();
        }
    }
    fetchTokenByUP() {
        log('yz.auth.service: ', 'fetchTokenByUP');
        return this.httpClient.post(`/auth/oauth/token?_allow_anonymous=true`, this.config.loginForm).pipe(map((response) => {
            return response;
        }));
    }
    fetchTokenByCas() {
        log('yz.auth.service: ', 'fetchTokenByCas');
        const uri = encodeURIComponent(this.injector.get(WINDOW).location.href);
        return this.httpClient
            .get(`/cas-proxy/app/validate_full?callback=${uri}&_allow_anonymous=true&timestamp=${new Date().getTime()}`)
            .pipe(map((response) => {
            switch (response.errcode) {
                case 2000:
                    return response.data;
                case 2001:
                    this.injector.get(WINDOW).location.href = response.msg;
                    throw Error("Cookie Error: Can't find Cas Cookie,So jump to login!");
                default:
                    if (response.data) {
                        console.error(response.data);
                        throw Error(response.data);
                    }
                    else if (response.msg) {
                        console.error(response.msg);
                        throw Error(response.msg);
                    }
                    else {
                        console.error('cas unknown error');
                        throw Error('Unknown Error: Cas auth exception!');
                    }
            }
        }));
    }
    login() {
        log('yz.auth.service: ', 'login white login form->', this.config.loginForm);
        return this.askToken().pipe(mergeMap(token => {
            log('yz.auth.service: get token->', token);
            this.configService.set('auth', {
                token_send_key: 'Authorization',
                token_send_template: `${token.token_type} \${access_token}`,
                token_send_place: 'header'
            });
            log('yz.auth.service: ', 'set token');
            this.tokenService.set(token);
            return of(null);
        }), mergeMap(() => this.cacheInit()));
    }
    cacheInit() {
        log('yz.auth.service: ', 'cacheInit');
        const [setTenant] = useLocalStorageTenant();
        const [setUser] = useLocalStorageUser();
        const [setHeader] = useLocalStorageHeader();
        const [setProject] = useLocalStorageProjectInfo();
        return combineLatest([
            this.httpClient.get(`/auth/user`),
            this.httpClient.get(`/auth/allheader/v2`),
            this.httpClient.get(`/app-manager/project/info`)
        ]).pipe(map(([user, header, project]) => {
            log('yz.auth.service: ', 'set user');
            setUser(user.principal);
            log('yz.auth.service: ', 'set tenant');
            setTenant(user.tenantId);
            log('yz.auth.service: ', 'set header');
            setHeader(header.data);
            log('yz.auth.service: ', 'set project');
            setProject(project.data);
            return void 0;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAuthService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: YunzaiAuthService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Jpcy9sYXlvdXQveXVuemFpLWF1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEUsT0FBTyxFQUE4QixnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFDTCxHQUFHLEVBQ0gscUJBQXFCLEVBQ3JCLDBCQUEwQixFQUMxQixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLE1BQU0sRUFFTixtQkFBbUIsRUFDcEIsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFHOUMsTUFBTSxPQUFPLGlCQUFpQjtJQUc1QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBWSxhQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBWSxVQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVE7UUFDTixHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUM5QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMseUNBQXlDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ2hHLEdBQUcsQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZTtRQUNiLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ25CLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRyxvQ0FBb0MsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2FBQzNHLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtZQUNwQixRQUFRLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hCLEtBQUssSUFBSTtvQkFDUCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLEtBQUssSUFBSTtvQkFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7b0JBQ3ZELE1BQU0sS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7Z0JBQ3ZFO29CQUNFLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzdCLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDNUI7eUJBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO3dCQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMzQjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBQ25DLE1BQU0sS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7cUJBQ25EO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVELEtBQUs7UUFDSCxHQUFHLENBQUMsbUJBQW1CLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQ3pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNmLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLGNBQWMsRUFBRSxlQUFlO2dCQUMvQixtQkFBbUIsRUFBRSxHQUFHLEtBQUssQ0FBQyxVQUFVLG1CQUFtQjtnQkFDM0QsZ0JBQWdCLEVBQUUsUUFBUTthQUMzQixDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQ0YsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVM7UUFDUCxHQUFHLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDNUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFDeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDNUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLDBCQUEwQixFQUFFLENBQUM7UUFDbEQsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1NBQ2pELENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDOUIsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEIsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3hDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzsrR0EzR1UsaUJBQWlCO21IQUFqQixpQkFBaUIsY0FESixNQUFNOzs0RkFDbkIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBtYXAsIG1lcmdlTWFwLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJVG9rZW5Nb2RlbCwgSVRva2VuU2VydmljZSwgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7XG4gIGxvZyxcbiAgdXNlTG9jYWxTdG9yYWdlSGVhZGVyLFxuICB1c2VMb2NhbFN0b3JhZ2VQcm9qZWN0SW5mbyxcbiAgdXNlTG9jYWxTdG9yYWdlVGVuYW50LFxuICB1c2VMb2NhbFN0b3JhZ2VVc2VyLFxuICBXSU5ET1csXG4gIFl1bnphaUJ1c2luZXNzQ29uZmlnLFxuICBZdW56YWlDb25maWdTZXJ2aWNlXG59IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgbWVyZ2VCaXNDb25maWcgfSBmcm9tICcuL2Jpcy5jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFl1bnphaUF1dGhTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWc6IFl1bnphaUJ1c2luZXNzQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY29uZmlnU2VydmljZSgpOiBZdW56YWlDb25maWdTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoWXVuemFpQ29uZmlnU2VydmljZSk7XG4gIH1cblxuICBwcml2YXRlIGdldCB0b2tlblNlcnZpY2UoKTogSVRva2VuU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KFlBX1NFUlZJQ0VfVE9LRU4pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaHR0cENsaWVudCgpOiBfSHR0cENsaWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KF9IdHRwQ2xpZW50KTtcbiAgfVxuXG4gIGFza1Rva2VuKCk6IE9ic2VydmFibGU8SVRva2VuTW9kZWw+IHtcbiAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2Fza1Rva2VuJyk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmxvZ2luRm9ybSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hUb2tlbkJ5VVAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hUb2tlbkJ5Q2FzKCk7XG4gICAgfVxuICB9XG5cbiAgZmV0Y2hUb2tlbkJ5VVAoKTogT2JzZXJ2YWJsZTxJVG9rZW5Nb2RlbD4ge1xuICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAnZmV0Y2hUb2tlbkJ5VVAnKTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QoYC9hdXRoL29hdXRoL3Rva2VuP19hbGxvd19hbm9ueW1vdXM9dHJ1ZWAsIHRoaXMuY29uZmlnLmxvZ2luRm9ybSkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmZXRjaFRva2VuQnlDYXMoKTogT2JzZXJ2YWJsZTxJVG9rZW5Nb2RlbD4ge1xuICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAnZmV0Y2hUb2tlbkJ5Q2FzJyk7XG4gICAgY29uc3QgdXJpID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmdldChgL2Nhcy1wcm94eS9hcHAvdmFsaWRhdGVfZnVsbD9jYWxsYmFjaz0ke3VyaX0mX2FsbG93X2Fub255bW91cz10cnVlJnRpbWVzdGFtcD0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXNwb25zZS5lcnJjb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDIwMDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgY2FzZSAyMDAxOlxuICAgICAgICAgICAgICB0aGlzLmluamVjdG9yLmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS5tc2c7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKFwiQ29va2llIEVycm9yOiBDYW4ndCBmaW5kIENhcyBDb29raWUsU28ganVtcCB0byBsb2dpbiFcIik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UubXNnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXNwb25zZS5tc2cpO1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKHJlc3BvbnNlLm1zZyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignY2FzIHVua25vd24gZXJyb3InKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignVW5rbm93biBFcnJvcjogQ2FzIGF1dGggZXhjZXB0aW9uIScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGxvZ2luKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAnbG9naW4gd2hpdGUgbG9naW4gZm9ybS0+JywgdGhpcy5jb25maWcubG9naW5Gb3JtKTtcbiAgICByZXR1cm4gdGhpcy5hc2tUb2tlbigpLnBpcGUoXG4gICAgICBtZXJnZU1hcCh0b2tlbiA9PiB7XG4gICAgICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiBnZXQgdG9rZW4tPicsIHRva2VuKTtcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLnNldCgnYXV0aCcsIHtcbiAgICAgICAgICB0b2tlbl9zZW5kX2tleTogJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICAgIHRva2VuX3NlbmRfdGVtcGxhdGU6IGAke3Rva2VuLnRva2VuX3R5cGV9IFxcJHthY2Nlc3NfdG9rZW59YCxcbiAgICAgICAgICB0b2tlbl9zZW5kX3BsYWNlOiAnaGVhZGVyJ1xuICAgICAgICB9KTtcbiAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdzZXQgdG9rZW4nKTtcbiAgICAgICAgdGhpcy50b2tlblNlcnZpY2Uuc2V0KHRva2VuKTtcbiAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLmNhY2hlSW5pdCgpKVxuICAgICk7XG4gIH1cblxuICBjYWNoZUluaXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdjYWNoZUluaXQnKTtcbiAgICBjb25zdCBbc2V0VGVuYW50XSA9IHVzZUxvY2FsU3RvcmFnZVRlbmFudCgpO1xuICAgIGNvbnN0IFtzZXRVc2VyXSA9IHVzZUxvY2FsU3RvcmFnZVVzZXIoKTtcbiAgICBjb25zdCBbc2V0SGVhZGVyXSA9IHVzZUxvY2FsU3RvcmFnZUhlYWRlcigpO1xuICAgIGNvbnN0IFtzZXRQcm9qZWN0XSA9IHVzZUxvY2FsU3RvcmFnZVByb2plY3RJbmZvKCk7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChgL2F1dGgvdXNlcmApLFxuICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChgL2F1dGgvYWxsaGVhZGVyL3YyYCksXG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGAvYXBwLW1hbmFnZXIvcHJvamVjdC9pbmZvYClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbdXNlciwgaGVhZGVyLCBwcm9qZWN0XSkgPT4ge1xuICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ3NldCB1c2VyJyk7XG4gICAgICAgIHNldFVzZXIodXNlci5wcmluY2lwYWwpO1xuICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ3NldCB0ZW5hbnQnKTtcbiAgICAgICAgc2V0VGVuYW50KHVzZXIudGVuYW50SWQpO1xuICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ3NldCBoZWFkZXInKTtcbiAgICAgICAgc2V0SGVhZGVyKGhlYWRlci5kYXRhKTtcbiAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdzZXQgcHJvamVjdCcpO1xuICAgICAgICBzZXRQcm9qZWN0KHByb2plY3QuZGF0YSk7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==