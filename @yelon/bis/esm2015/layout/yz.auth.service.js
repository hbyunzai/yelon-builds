import { Injectable, Injector } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { mergeConfig as mergeAuthConfig, YA_SERVICE_TOKEN } from '@yelon/auth';
import { mergeConfig as mergeBisConfig } from '@yelon/bis/shared';
import { CacheService } from '@yelon/cache';
import { _HttpClient } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { YunzaiConfigService } from '@yelon/util/config';
import { log } from '@yelon/util/other';
import * as i0 from "@angular/core";
export class YzAuthService {
    constructor(injector) {
        this.injector = injector;
        this.option = mergeAuthConfig(this.csr);
        this.bis = mergeBisConfig(this.csr);
    }
    get csr() {
        return this.injector.get(YunzaiConfigService);
    }
    get tokenService() {
        return this.injector.get(YA_SERVICE_TOKEN);
    }
    get httpClient() {
        return this.injector.get(_HttpClient);
    }
    get cacheService() {
        return this.injector.get(CacheService);
    }
    askToken() {
        var _a;
        log('yz.auth.service: ', 'askToken');
        if ((_a = this.tokenService.get()) === null || _a === void 0 ? void 0 : _a.token) {
            return of(this.tokenService.get());
        }
        else {
            if (this.bis.loginForm) {
                return this.fetchTokenByUP();
            }
            else {
                return this.fetchTokenByCas();
            }
        }
    }
    fetchTokenByUP() {
        log('yz.auth.service: ', 'fetchTokenByUP');
        return this.httpClient.post(`/auth/oauth/token?_allow_anonymous=true`, this.bis.loginForm).pipe(map((response) => {
            const { access_token, expires_in, refresh_token, scope, token_type } = response;
            return {
                token: access_token,
                expired: expires_in,
                refreshToken: refresh_token,
                tokenType: token_type,
                scope
            };
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
                    const { access_token, expires_in, refresh_token, scope, token_type } = response.data;
                    return {
                        token: access_token,
                        expired: expires_in,
                        refreshToken: refresh_token,
                        tokenType: token_type,
                        scope
                    };
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
        log('yz.auth.service: ', 'login white login form->', this.bis.loginForm);
        return this.askToken().pipe(mergeMap(token => {
            log('yz.auth.service: get token->', token);
            this.csr.set('auth', {
                token_send_key: 'Authorization',
                token_send_template: `${token.tokenType} \${token}`,
                token_send_place: 'header'
            });
            log('yz.auth.service: ', 'set token');
            this.tokenService.set(token);
            return this.cacheInit();
        }), mergeAll());
    }
    cacheInit() {
        log('yz.auth.service: ', 'cacheInit');
        const user = this.cacheService.get('_yz_user', { mode: 'none' });
        const header = this.cacheService.get('_yz_header', { mode: 'none' });
        const project = this.cacheService.get('_yz_project_info', { mode: 'none' });
        return forkJoin(of(user), of(header), of(project)).pipe(mergeMap(([u, h, p]) => {
            let list = [];
            // user cache
            if (!u) {
                log('yz.auth.service: ', 'fetch user cache');
                list.push(this.httpClient.get(`/auth/user`).pipe(map((user) => {
                    this.cacheService.set('_yz_user', user.principal);
                })));
            }
            else {
                log('yz.auth.service: ', 'user recache');
                list.push(of(() => { }));
            }
            // header cache
            if (!h) {
                log('yz.auth.service: ', 'fetch header cache');
                list.push(this.httpClient.get(`/auth/allheader/v2`).pipe(map((header) => {
                    this.cacheService.set('_yz_header', header.data);
                })));
            }
            else {
                log('yz.auth.service: ', 'header recache');
                list.push(of(() => { }));
            }
            // project cache
            if (!p) {
                log('yz.auth.service: ', 'fetch project cache');
                list.push(this.httpClient.get(`/app-manager/project/info`).pipe(map((info) => {
                    this.cacheService.set('_yz_project_info', info.data);
                })));
            }
            else {
                log('yz.auth.service: ', 'project recache');
                list.push(of(() => { }));
            }
            return forkJoin(list);
        }));
    }
}
YzAuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function YzAuthService_Factory() { return new YzAuthService(i0.ɵɵinject(i0.INJECTOR)); }, token: YzAuthService, providedIn: "root" });
YzAuthService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
YzAuthService.ctorParameters = () => [
    { type: Injector }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekQsT0FBTyxFQUE4QixXQUFXLElBQUksZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxXQUFXLElBQUksY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQTBDLE1BQU0sYUFBYSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFHeEMsTUFBTSxPQUFPLGFBQWE7SUFJeEIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFZLEdBQUc7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFt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QUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O1lBbEtGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQWRiLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlQWxsLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgSVRva2VuTW9kZWwsIElUb2tlblNlcnZpY2UsIG1lcmdlQ29uZmlnIGFzIG1lcmdlQXV0aENvbmZpZywgWUFfU0VSVklDRV9UT0tFTiB9IGZyb20gJ0B5ZWxvbi9hdXRoJztcbmltcG9ydCB7IG1lcmdlQ29uZmlnIGFzIG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnQHllbG9uL2Jpcy9zaGFyZWQnO1xuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL2NhY2hlJztcbmltcG9ydCB7IF9IdHRwQ2xpZW50IH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFdJTkRPVywgWXVuemFpQXV0aENvbmZpZywgWXVuemFpQnVzaW5lc3NDb25maWcgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJ0B5ZWxvbi91dGlsL290aGVyJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBZekF1dGhTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIG9wdGlvbjogWXVuemFpQXV0aENvbmZpZztcbiAgcHJvdGVjdGVkIGJpczogWXVuemFpQnVzaW5lc3NDb25maWc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLm9wdGlvbiA9IG1lcmdlQXV0aENvbmZpZyh0aGlzLmNzcik7XG4gICAgdGhpcy5iaXMgPSBtZXJnZUJpc0NvbmZpZyh0aGlzLmNzcik7XG4gIH1cblxuICBwcml2YXRlIGdldCBjc3IoKTogWXVuemFpQ29uZmlnU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KFl1bnphaUNvbmZpZ1NlcnZpY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdG9rZW5TZXJ2aWNlKCk6IElUb2tlblNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChZQV9TRVJWSUNFX1RPS0VOKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGh0dHBDbGllbnQoKTogX0h0dHBDbGllbnQge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChfSHR0cENsaWVudCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYWNoZVNlcnZpY2UoKTogQ2FjaGVTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoQ2FjaGVTZXJ2aWNlKTtcbiAgfVxuXG4gIGFza1Rva2VuKCk6IE9ic2VydmFibGU8SVRva2VuTW9kZWw+IHtcbiAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2Fza1Rva2VuJyk7XG4gICAgaWYgKHRoaXMudG9rZW5TZXJ2aWNlLmdldCgpPy50b2tlbikge1xuICAgICAgcmV0dXJuIG9mKHRoaXMudG9rZW5TZXJ2aWNlLmdldCgpISk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmJpcy5sb2dpbkZvcm0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hUb2tlbkJ5VVAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoVG9rZW5CeUNhcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZldGNoVG9rZW5CeVVQKCk6IE9ic2VydmFibGU8SVRva2VuTW9kZWw+IHtcbiAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2ZldGNoVG9rZW5CeVVQJyk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KGAvYXV0aC9vYXV0aC90b2tlbj9fYWxsb3dfYW5vbnltb3VzPXRydWVgLCB0aGlzLmJpcy5sb2dpbkZvcm0pLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgY29uc3QgeyBhY2Nlc3NfdG9rZW4sIGV4cGlyZXNfaW4sIHJlZnJlc2hfdG9rZW4sIHNjb3BlLCB0b2tlbl90eXBlIH0gPSByZXNwb25zZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbjogYWNjZXNzX3Rva2VuLFxuICAgICAgICAgIGV4cGlyZWQ6IGV4cGlyZXNfaW4sXG4gICAgICAgICAgcmVmcmVzaFRva2VuOiByZWZyZXNoX3Rva2VuLFxuICAgICAgICAgIHRva2VuVHlwZTogdG9rZW5fdHlwZSxcbiAgICAgICAgICBzY29wZVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZmV0Y2hUb2tlbkJ5Q2FzKCk6IE9ic2VydmFibGU8SVRva2VuTW9kZWw+IHtcbiAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2ZldGNoVG9rZW5CeUNhcycpO1xuICAgIGNvbnN0IHVyaSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmluamVjdG9yLmdldChXSU5ET1cpLmxvY2F0aW9uLmhyZWYpO1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgIC5nZXQoYC9jYXMtcHJveHkvYXBwL3ZhbGlkYXRlX2Z1bGw/Y2FsbGJhY2s9JHt1cml9Jl9hbGxvd19hbm9ueW1vdXM9dHJ1ZSZ0aW1lc3RhbXA9JHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzcG9uc2UuZXJyY29kZSkge1xuICAgICAgICAgICAgY2FzZSAyMDAwOlxuICAgICAgICAgICAgICBjb25zdCB7IGFjY2Vzc190b2tlbiwgZXhwaXJlc19pbiwgcmVmcmVzaF90b2tlbiwgc2NvcGUsIHRva2VuX3R5cGUgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBleHBpcmVkOiBleHBpcmVzX2luLFxuICAgICAgICAgICAgICAgIHJlZnJlc2hUb2tlbjogcmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICB0b2tlblR5cGU6IHRva2VuX3R5cGUsXG4gICAgICAgICAgICAgICAgc2NvcGVcbiAgICAgICAgICAgICAgfSBhcyBJVG9rZW5Nb2RlbDtcbiAgICAgICAgICAgIGNhc2UgMjAwMTpcbiAgICAgICAgICAgICAgdGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UubXNnO1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkNvb2tpZSBFcnJvcjogQ2FuJ3QgZmluZCBDYXMgQ29va2llLFNvIGp1bXAgdG8gbG9naW4hXCIpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm1zZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UubXNnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5tc2cpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NhcyB1bmtub3duIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1Vua25vd24gRXJyb3I6IENhcyBhdXRoIGV4Y2VwdGlvbiEnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBsb2dpbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2xvZ2luIHdoaXRlIGxvZ2luIGZvcm0tPicsIHRoaXMuYmlzLmxvZ2luRm9ybSk7XG4gICAgcmV0dXJuIHRoaXMuYXNrVG9rZW4oKS5waXBlKFxuICAgICAgbWVyZ2VNYXAodG9rZW4gPT4ge1xuICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogZ2V0IHRva2VuLT4nLCB0b2tlbik7XG4gICAgICAgIHRoaXMuY3NyLnNldCgnYXV0aCcsIHtcbiAgICAgICAgICB0b2tlbl9zZW5kX2tleTogJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICAgIHRva2VuX3NlbmRfdGVtcGxhdGU6IGAke3Rva2VuLnRva2VuVHlwZX0gXFwke3Rva2VufWAsXG4gICAgICAgICAgdG9rZW5fc2VuZF9wbGFjZTogJ2hlYWRlcidcbiAgICAgICAgfSk7XG4gICAgICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAnc2V0IHRva2VuJyk7XG4gICAgICAgIHRoaXMudG9rZW5TZXJ2aWNlLnNldCh0b2tlbik7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlSW5pdCgpO1xuICAgICAgfSksXG4gICAgICBtZXJnZUFsbCgpXG4gICAgKTtcbiAgfVxuXG4gIGNhY2hlSW5pdCgpOiBPYnNlcnZhYmxlPHZvaWRbXT4ge1xuICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAnY2FjaGVJbml0Jyk7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X3VzZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el9oZWFkZXInLCB7IG1vZGU6ICdub25lJyB9KTtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfcHJvamVjdF9pbmZvJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKG9mKHVzZXIpLCBvZihoZWFkZXIpLCBvZihwcm9qZWN0KSkucGlwZShcbiAgICAgIG1lcmdlTWFwKChbdSwgaCwgcF0pID0+IHtcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcbiAgICAgICAgLy8gdXNlciBjYWNoZVxuICAgICAgICBpZiAoIXUpIHtcbiAgICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2ZldGNoIHVzZXIgY2FjaGUnKTtcbiAgICAgICAgICBsaXN0LnB1c2goXG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGAvYXV0aC91c2VyYCkucGlwZShcbiAgICAgICAgICAgICAgbWFwKCh1c2VyOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXQoJ195el91c2VyJywgdXNlci5wcmluY2lwYWwpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICd1c2VyIHJlY2FjaGUnKTtcbiAgICAgICAgICBsaXN0LnB1c2gob2Y8TnpTYWZlQW55PigoKSA9PiB7fSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhlYWRlciBjYWNoZVxuICAgICAgICBpZiAoIWgpIHtcbiAgICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2ZldGNoIGhlYWRlciBjYWNoZScpO1xuICAgICAgICAgIGxpc3QucHVzaChcbiAgICAgICAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoYC9hdXRoL2FsbGhlYWRlci92MmApLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgoaGVhZGVyOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXQoJ195el9oZWFkZXInLCBoZWFkZXIuZGF0YSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2hlYWRlciByZWNhY2hlJyk7XG4gICAgICAgICAgbGlzdC5wdXNoKG9mPE56U2FmZUFueT4oKCkgPT4ge30pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwcm9qZWN0IGNhY2hlXG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAnZmV0Y2ggcHJvamVjdCBjYWNoZScpO1xuICAgICAgICAgIGxpc3QucHVzaChcbiAgICAgICAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoYC9hcHAtbWFuYWdlci9wcm9qZWN0L2luZm9gKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKGluZm86IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldCgnX3l6X3Byb2plY3RfaW5mbycsIGluZm8uZGF0YSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ3Byb2plY3QgcmVjYWNoZScpO1xuICAgICAgICAgIGxpc3QucHVzaChvZjxOelNhZmVBbnk+KCgpID0+IHt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKGxpc3QpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=