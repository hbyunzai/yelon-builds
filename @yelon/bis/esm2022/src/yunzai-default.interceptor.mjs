import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { of, throwError, mergeMap, catchError } from 'rxjs';
import { mergeBisConfig } from '@yelon/bis/config';
import { IGNORE_BASE_URL } from '@yelon/theme';
import { YUNZAI_CONFIG, YunzaiConfigService } from '@yelon/util';
import { checkStatus, getAdditionalHeaders, goTo, toLogin } from './helper';
import { tryRefreshToken } from './refresh-token';
function handleData(injector, ev, req, next) {
    checkStatus(injector, ev);
    const config = injector.get(YUNZAI_CONFIG).bis;
    switch (ev.status) {
        case 200:
            return of(ev);
        case 401:
            if (config.refreshTokenEnabled && config.refreshTokenType === 're-request') {
                const unAuthorizationReq = req.clone();
                unAuthorizationReq.headers.delete('Authorization');
                return tryRefreshToken(injector, ev, unAuthorizationReq, next);
            }
            toLogin(injector);
            break;
        case 403:
        case 404:
        case 500:
            goTo(injector, `/exception/${ev.status}?url=${req.urlWithParams}`);
            break;
        default:
            if (ev instanceof HttpErrorResponse) {
                console.warn('未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng.yunzainfo.com/docs/server 解决跨域问题', ev);
            }
            break;
    }
    if (ev instanceof HttpErrorResponse) {
        return throwError(() => ev);
    }
    else if (ev._throw) {
        return throwError(() => ev.body);
    }
    else {
        return of(ev);
    }
}
export const yunzaiDefaultInterceptor = (req, next) => {
    const config = mergeBisConfig(inject(YunzaiConfigService));
    const { baseUrl } = config;
    let url = req.url;
    if (!req.context.get(IGNORE_BASE_URL) && !url.startsWith('https://') && !url.startsWith('http://')) {
        url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }
    if (url.includes('.json') && url.includes('assets')) {
        url = req.url;
    }
    const newReq = req.clone({ url, setHeaders: getAdditionalHeaders(req.headers) });
    const injector = inject(Injector);
    return next(newReq).pipe(mergeMap(ev => {
        if (ev instanceof HttpResponseBase) {
            return handleData(injector, ev, newReq, next);
        }
        return of(ev);
    }), catchError((err) => handleData(injector, err, newReq, next)));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWRlZmF1bHQuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvc3JjL3l1bnphaS1kZWZhdWx0LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFJakIsZ0JBQWdCLEVBQ2pCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFvQixPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxELFNBQVMsVUFBVSxDQUNqQixRQUFrQixFQUNsQixFQUFvQixFQUNwQixHQUEyQixFQUMzQixJQUFtQjtJQUVuQixXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBSSxDQUFDO0lBQ2hELFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssR0FBRztZQUNOLElBQUksTUFBTSxDQUFDLG1CQUFt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LElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxHQUFzQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDaEYsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEh0dHBFcnJvclJlc3BvbnNlLFxuICBIdHRwSGFuZGxlckZuLFxuICBIdHRwSW50ZXJjZXB0b3JGbixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBSZXNwb25zZUJhc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0b3IsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IsIG1lcmdlTWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IG1lcmdlQmlzQ29uZmlnIH0gZnJvbSAnQHllbG9uL2Jpcy9jb25maWcnO1xuaW1wb3J0IHsgSUdOT1JFX0JBU0VfVVJMIH0gZnJvbSAnQHllbG9uL3RoZW1lJztcbmltcG9ydCB7IFlVTlpBSV9DT05GSUcsIFl1bnphaUNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbCc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBjaGVja1N0YXR1cywgZ2V0QWRkaXRpb25hbEhlYWRlcnMsIGdvVG8sIFJlVGhyb3dIdHRwRXJyb3IsIHRvTG9naW4gfSBmcm9tICcuL2hlbHBlcic7XG5pbXBvcnQgeyB0cnlSZWZyZXNoVG9rZW4gfSBmcm9tICcuL3JlZnJlc2gtdG9rZW4nO1xuXG5mdW5jdGlvbiBoYW5kbGVEYXRhKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIGV2OiBIdHRwUmVzcG9uc2VCYXNlLFxuICByZXE6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4sXG4gIG5leHQ6IEh0dHBIYW5kbGVyRm5cbik6IE9ic2VydmFibGU8TnpTYWZlQW55PiB7XG4gIGNoZWNrU3RhdHVzKGluamVjdG9yLCBldik7XG4gIGNvbnN0IGNvbmZpZyA9IGluamVjdG9yLmdldChZVU5aQUlfQ09ORklHKS5iaXMhO1xuICBzd2l0Y2ggKGV2LnN0YXR1cykge1xuICAgIGNhc2UgMjAwOlxuICAgICAgcmV0dXJuIG9mKGV2KTtcbiAgICBjYXNlIDQwMTpcbiAgICAgIGlmIChjb25maWcucmVmcmVzaFRva2VuRW5hYmxlZCAmJiBjb25maWcucmVmcmVzaFRva2VuVHlwZSA9PT0gJ3JlLXJlcXVlc3QnKSB7XG4gICAgICAgIGNvbnN0IHVuQXV0aG9yaXphdGlvblJlcSA9IHJlcS5jbG9uZSgpO1xuICAgICAgICB1bkF1dGhvcml6YXRpb25SZXEuaGVhZGVycy5kZWxldGUoJ0F1dGhvcml6YXRpb24nKTtcbiAgICAgICAgcmV0dXJuIHRyeVJlZnJlc2hUb2tlbihpbmplY3RvciwgZXYsIHVuQXV0aG9yaXphdGlvblJlcSwgbmV4dCk7XG4gICAgICB9XG4gICAgICB0b0xvZ2luKGluamVjdG9yKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDAzOlxuICAgIGNhc2UgNDA0OlxuICAgIGNhc2UgNTAwOlxuICAgICAgZ29UbyhpbmplY3RvciwgYC9leGNlcHRpb24vJHtldi5zdGF0dXN9P3VybD0ke3JlcS51cmxXaXRoUGFyYW1zfWApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmIChldiBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAn5pyq5Y+v55+l6ZSZ6K+v77yM5aSn6YOo5YiG5piv55Sx5LqO5ZCO56uv5LiN5pSv5oyB6Leo5Z+fQ09SU+aIluaXoOaViOmFjee9ruW8lei1t++8jOivt+WPguiAgyBodHRwczovL25nLnl1bnphaW5mby5jb20vZG9jcy9zZXJ2ZXIg6Kej5Yaz6Leo5Z+f6Zeu6aKYJyxcbiAgICAgICAgICBldlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGV2IGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBldik7XG4gIH0gZWxzZSBpZiAoKGV2IGFzIHVua25vd24gYXMgUmVUaHJvd0h0dHBFcnJvcikuX3Rocm93KSB7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gKGV2IGFzIHVua25vd24gYXMgUmVUaHJvd0h0dHBFcnJvcikuYm9keSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9mKGV2KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgeXVuemFpRGVmYXVsdEludGVyY2VwdG9yOiBIdHRwSW50ZXJjZXB0b3JGbiA9IChyZXEsIG5leHQpID0+IHtcbiAgY29uc3QgY29uZmlnID0gbWVyZ2VCaXNDb25maWcoaW5qZWN0KFl1bnphaUNvbmZpZ1NlcnZpY2UpKTtcbiAgY29uc3QgeyBiYXNlVXJsIH0gPSBjb25maWc7XG4gIGxldCB1cmwgPSByZXEudXJsO1xuICBpZiAoIXJlcS5jb250ZXh0LmdldChJR05PUkVfQkFTRV9VUkwpICYmICF1cmwuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKSAmJiAhdXJsLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKSkge1xuICAgIHVybCA9IGJhc2VVcmwgKyAoYmFzZVVybCEuZW5kc1dpdGgoJy8nKSAmJiB1cmwuc3RhcnRzV2l0aCgnLycpID8gdXJsLnN1YnN0cmluZygxKSA6IHVybCk7XG4gIH1cbiAgaWYgKHVybC5pbmNsdWRlcygnLmpzb24nKSAmJiB1cmwuaW5jbHVkZXMoJ2Fzc2V0cycpKSB7XG4gICAgdXJsID0gcmVxLnVybDtcbiAgfVxuICBjb25zdCBuZXdSZXEgPSByZXEuY2xvbmUoeyB1cmwsIHNldEhlYWRlcnM6IGdldEFkZGl0aW9uYWxIZWFkZXJzKHJlcS5oZWFkZXJzKSB9KTtcbiAgY29uc3QgaW5qZWN0b3IgPSBpbmplY3QoSW5qZWN0b3IpO1xuICByZXR1cm4gbmV4dChuZXdSZXEpLnBpcGUoXG4gICAgbWVyZ2VNYXAoZXYgPT4ge1xuICAgICAgaWYgKGV2IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlRGF0YShpbmplY3RvciwgZXYsIG5ld1JlcSwgbmV4dCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2YoZXYpO1xuICAgIH0pLFxuICAgIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IGhhbmRsZURhdGEoaW5qZWN0b3IsIGVyciwgbmV3UmVxLCBuZXh0KSlcbiAgKTtcbn07XG4iXX0=