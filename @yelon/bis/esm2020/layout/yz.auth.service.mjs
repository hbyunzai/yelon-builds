import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { mergeConfig as mergeAuthConfig, YA_SERVICE_TOKEN } from '@yelon/auth';
import { CacheService } from '@yelon/cache';
import { _HttpClient } from '@yelon/theme';
import { WINDOW } from '@yelon/util';
import { YunzaiConfigService } from '@yelon/util/config';
import { log } from '@yelon/util/other';
import { mergeBisConfig } from './bis.config';
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
        log('yz.auth.service: ', 'askToken');
        if (this.tokenService.get()?.token) {
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
YzAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzAuthService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
YzAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: YzAuthService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXouYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC95ei5hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUl6RCxPQUFPLEVBQThCLFdBQVcsSUFBSSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0csT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQTBDLE1BQU0sYUFBYSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUc5QyxNQUFNLE9BQU8sYUFBYTtJQUl4QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQVksR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNoRCxDQUFD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WUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7MEdBaktVLGFBQWE7OEdBQWIsYUFBYSxjQURBLE1BQU07MkZBQ25CLGFBQWE7a0JBRHpCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZUFsbCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IElUb2tlbk1vZGVsLCBJVG9rZW5TZXJ2aWNlLCBtZXJnZUNvbmZpZyBhcyBtZXJnZUF1dGhDb25maWcsIFlBX1NFUlZJQ0VfVE9LRU4gfSBmcm9tICdAeWVsb24vYXV0aCc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICdAeWVsb24vY2FjaGUnO1xuaW1wb3J0IHsgX0h0dHBDbGllbnQgfSBmcm9tICdAeWVsb24vdGhlbWUnO1xuaW1wb3J0IHsgV0lORE9XLCBZdW56YWlBdXRoQ29uZmlnLCBZdW56YWlCdXNpbmVzc0NvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsJztcbmltcG9ydCB7IFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnQHllbG9uL3V0aWwvb3RoZXInO1xuXG5pbXBvcnQgeyBtZXJnZUJpc0NvbmZpZyB9IGZyb20gJy4vYmlzLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgWXpBdXRoU2VydmljZSB7XG4gIHByb3RlY3RlZCBvcHRpb246IFl1bnphaUF1dGhDb25maWc7XG4gIHByb3RlY3RlZCBiaXM6IFl1bnphaUJ1c2luZXNzQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5vcHRpb24gPSBtZXJnZUF1dGhDb25maWcodGhpcy5jc3IpO1xuICAgIHRoaXMuYmlzID0gbWVyZ2VCaXNDb25maWcodGhpcy5jc3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY3NyKCk6IFl1bnphaUNvbmZpZ1NlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChZdW56YWlDb25maWdTZXJ2aWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHRva2VuU2VydmljZSgpOiBJVG9rZW5TZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoWUFfU0VSVklDRV9UT0tFTik7XG4gIH1cblxuICBwcml2YXRlIGdldCBodHRwQ2xpZW50KCk6IF9IdHRwQ2xpZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoX0h0dHBDbGllbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FjaGVTZXJ2aWNlKCk6IENhY2hlU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KENhY2hlU2VydmljZSk7XG4gIH1cblxuICBhc2tUb2tlbigpOiBPYnNlcnZhYmxlPElUb2tlbk1vZGVsPiB7XG4gICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdhc2tUb2tlbicpO1xuICAgIGlmICh0aGlzLnRva2VuU2VydmljZS5nZXQoKT8udG9rZW4pIHtcbiAgICAgIHJldHVybiBvZih0aGlzLnRva2VuU2VydmljZS5nZXQoKSEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5iaXMubG9naW5Gb3JtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoVG9rZW5CeVVQKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaFRva2VuQnlDYXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmZXRjaFRva2VuQnlVUCgpOiBPYnNlcnZhYmxlPElUb2tlbk1vZGVsPiB7XG4gICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdmZXRjaFRva2VuQnlVUCcpO1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdChgL2F1dGgvb2F1dGgvdG9rZW4/X2FsbG93X2Fub255bW91cz10cnVlYCwgdGhpcy5iaXMubG9naW5Gb3JtKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYWNjZXNzX3Rva2VuLCBleHBpcmVzX2luLCByZWZyZXNoX3Rva2VuLCBzY29wZSwgdG9rZW5fdHlwZSB9ID0gcmVzcG9uc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW46IGFjY2Vzc190b2tlbixcbiAgICAgICAgICBleHBpcmVkOiBleHBpcmVzX2luLFxuICAgICAgICAgIHJlZnJlc2hUb2tlbjogcmVmcmVzaF90b2tlbixcbiAgICAgICAgICB0b2tlblR5cGU6IHRva2VuX3R5cGUsXG4gICAgICAgICAgc2NvcGVcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGZldGNoVG9rZW5CeUNhcygpOiBPYnNlcnZhYmxlPElUb2tlbk1vZGVsPiB7XG4gICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdmZXRjaFRva2VuQnlDYXMnKTtcbiAgICBjb25zdCB1cmkgPSBlbmNvZGVVUklDb21wb25lbnQodGhpcy5pbmplY3Rvci5nZXQoV0lORE9XKS5sb2NhdGlvbi5ocmVmKTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAuZ2V0KGAvY2FzLXByb3h5L2FwcC92YWxpZGF0ZV9mdWxsP2NhbGxiYWNrPSR7dXJpfSZfYWxsb3dfYW5vbnltb3VzPXRydWUmdGltZXN0YW1wPSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlLmVycmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMjAwMDpcbiAgICAgICAgICAgICAgY29uc3QgeyBhY2Nlc3NfdG9rZW4sIGV4cGlyZXNfaW4sIHJlZnJlc2hfdG9rZW4sIHNjb3BlLCB0b2tlbl90eXBlIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRva2VuOiBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgZXhwaXJlZDogZXhwaXJlc19pbixcbiAgICAgICAgICAgICAgICByZWZyZXNoVG9rZW46IHJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlbl90eXBlLFxuICAgICAgICAgICAgICAgIHNjb3BlXG4gICAgICAgICAgICAgIH0gYXMgSVRva2VuTW9kZWw7XG4gICAgICAgICAgICBjYXNlIDIwMDE6XG4gICAgICAgICAgICAgIHRoaXMuaW5qZWN0b3IuZ2V0KFdJTkRPVykubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLm1zZztcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJDb29raWUgRXJyb3I6IENhbid0IGZpbmQgQ2FzIENvb2tpZSxTbyBqdW1wIHRvIGxvZ2luIVwiKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5tc2cpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3BvbnNlLm1zZyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzcG9uc2UubXNnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYXMgdW5rbm93biBlcnJvcicpO1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdVbmtub3duIEVycm9yOiBDYXMgYXV0aCBleGNlcHRpb24hJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgbG9naW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdsb2dpbiB3aGl0ZSBsb2dpbiBmb3JtLT4nLCB0aGlzLmJpcy5sb2dpbkZvcm0pO1xuICAgIHJldHVybiB0aGlzLmFza1Rva2VuKCkucGlwZShcbiAgICAgIG1lcmdlTWFwKHRva2VuID0+IHtcbiAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6IGdldCB0b2tlbi0+JywgdG9rZW4pO1xuICAgICAgICB0aGlzLmNzci5zZXQoJ2F1dGgnLCB7XG4gICAgICAgICAgdG9rZW5fc2VuZF9rZXk6ICdBdXRob3JpemF0aW9uJyxcbiAgICAgICAgICB0b2tlbl9zZW5kX3RlbXBsYXRlOiBgJHt0b2tlbi50b2tlblR5cGV9IFxcJHt0b2tlbn1gLFxuICAgICAgICAgIHRva2VuX3NlbmRfcGxhY2U6ICdoZWFkZXInXG4gICAgICAgIH0pO1xuICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ3NldCB0b2tlbicpO1xuICAgICAgICB0aGlzLnRva2VuU2VydmljZS5zZXQodG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZUluaXQoKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VBbGwoKVxuICAgICk7XG4gIH1cblxuICBjYWNoZUluaXQoKTogT2JzZXJ2YWJsZTx2b2lkW10+IHtcbiAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2NhY2hlSW5pdCcpO1xuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmNhY2hlU2VydmljZS5nZXQoJ195el91c2VyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgY29uc3QgaGVhZGVyID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KCdfeXpfaGVhZGVyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldCgnX3l6X3Byb2plY3RfaW5mbycsIHsgbW9kZTogJ25vbmUnIH0pO1xuICAgIHJldHVybiBmb3JrSm9pbihvZih1c2VyKSwgb2YoaGVhZGVyKSwgb2YocHJvamVjdCkpLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoW3UsIGgsIHBdKSA9PiB7XG4gICAgICAgIGxldCBsaXN0ID0gW107XG4gICAgICAgIC8vIHVzZXIgY2FjaGVcbiAgICAgICAgaWYgKCF1KSB7XG4gICAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdmZXRjaCB1c2VyIGNhY2hlJyk7XG4gICAgICAgICAgbGlzdC5wdXNoKFxuICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChgL2F1dGgvdXNlcmApLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgodXNlcjogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0KCdfeXpfdXNlcicsIHVzZXIucHJpbmNpcGFsKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZygneXouYXV0aC5zZXJ2aWNlOiAnLCAndXNlciByZWNhY2hlJyk7XG4gICAgICAgICAgbGlzdC5wdXNoKG9mPE56U2FmZUFueT4oKCkgPT4ge30pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBoZWFkZXIgY2FjaGVcbiAgICAgICAgaWYgKCFoKSB7XG4gICAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdmZXRjaCBoZWFkZXIgY2FjaGUnKTtcbiAgICAgICAgICBsaXN0LnB1c2goXG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGAvYXV0aC9hbGxoZWFkZXIvdjJgKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKGhlYWRlcjogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0KCdfeXpfaGVhZGVyJywgaGVhZGVyLmRhdGEpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdoZWFkZXIgcmVjYWNoZScpO1xuICAgICAgICAgIGxpc3QucHVzaChvZjxOelNhZmVBbnk+KCgpID0+IHt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJvamVjdCBjYWNoZVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICBsb2coJ3l6LmF1dGguc2VydmljZTogJywgJ2ZldGNoIHByb2plY3QgY2FjaGUnKTtcbiAgICAgICAgICBsaXN0LnB1c2goXG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGAvYXBwLW1hbmFnZXIvcHJvamVjdC9pbmZvYCkucGlwZShcbiAgICAgICAgICAgICAgbWFwKChpbmZvOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXQoJ195el9wcm9qZWN0X2luZm8nLCBpbmZvLmRhdGEpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nKCd5ei5hdXRoLnNlcnZpY2U6ICcsICdwcm9qZWN0IHJlY2FjaGUnKTtcbiAgICAgICAgICBsaXN0LnB1c2gob2Y8TnpTYWZlQW55PigoKSA9PiB7fSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JrSm9pbihsaXN0KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19