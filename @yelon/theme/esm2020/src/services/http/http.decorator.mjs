import { Inject, Injectable, Injector } from '@angular/core';
import { throwError } from 'rxjs';
import { ACLService } from '@yelon/acl';
import { _HttpClient } from './http.client';
import * as i0 from "@angular/core";
/**
 * Every http decorator must be based on `BaseAPI`, Like this:
 * ```ts
 * \@Injectable()
 * class DataService extends BaseApi {}
 * ```
 */
export class BaseApi {
    constructor(injector) {
        this.injector = injector;
    }
}
BaseApi.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: BaseApi, deps: [{ token: Injector }], target: i0.ɵɵFactoryTarget.Injectable });
BaseApi.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: BaseApi });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: BaseApi, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector, decorators: [{
                    type: Inject,
                    args: [Injector]
                }] }]; } });
const paramKey = `__api_params`;
function setParam(target, key = paramKey) {
    let params = target[key];
    if (typeof params === 'undefined') {
        params = target[key] = {};
    }
    return params;
}
/**
 * 默认基准URL
 * - 有效范围：类
 */
export function BaseUrl(url) {
    return function (target) {
        const params = setParam(target.prototype);
        params.baseUrl = url;
        return target;
    };
}
/**
 * 默认 `headers`
 * - 有效范围：类
 */
export function BaseHeaders(headers) {
    return function (target) {
        const params = setParam(target.prototype);
        params.baseHeaders = headers;
        return target;
    };
}
function makeParam(paramName) {
    return function (key) {
        return function (target, propertyKey, index) {
            const params = setParam(setParam(target), propertyKey);
            let tParams = params[paramName];
            if (typeof tParams === 'undefined') {
                tParams = params[paramName] = [];
            }
            tParams.push({
                key,
                index
            });
        };
    };
}
/**
 * URL路由参数
 * - 有效范围：方法参数
 */
export const Path = makeParam('path');
/**
 * URL 参数 `QueryString`
 * - 有效范围：方法参数
 */
export const Query = makeParam('query');
/**
 * 参数 `Body`
 * - 有效范围：方法参数
 */
export const Body = makeParam('body')();
/**
 * 参数 `headers`
 * - 有效范围：方法参数
 * - 合并 `BaseHeaders`
 */
export const Headers = makeParam('headers');
/**
 * Request Payload
 * - Supported body (like`POST`, `PUT`) as a body data, equivalent to `@Body`
 * - Not supported body (like `GET`, `DELETE` etc) as a `QueryString`
 */
export const Payload = makeParam('payload')();
function getValidArgs(data, key, args) {
    if (!data[key] || !Array.isArray(data[key]) || data[key].length <= 0) {
        return undefined;
    }
    return args[data[key][0].index];
}
function genBody(data, payload) {
    if (Array.isArray(data) || Array.isArray(payload)) {
        return Object.assign([], data, payload);
    }
    return { ...data, ...payload };
}
function makeMethod(method) {
    return function (url = '', options) {
        return (_target, targetKey, descriptor) => {
            descriptor.value = function (...args) {
                options = options || {};
                const injector = this.injector;
                const http = injector.get(_HttpClient, null);
                if (http == null) {
                    throw new TypeError(`Not found '_HttpClient', You can import 'YunzaiThemeModule' && 'HttpClientModule' in your root module.`);
                }
                const baseData = setParam(this);
                const data = setParam(baseData, targetKey);
                let requestUrl = url || '';
                requestUrl = [baseData.baseUrl || '', requestUrl.startsWith('/') ? requestUrl.substring(1) : requestUrl].join('/');
                // fix last split
                if (requestUrl.length > 1 && requestUrl.endsWith('/')) {
                    requestUrl = requestUrl.substring(0, requestUrl.length - 1);
                }
                if (options.acl) {
                    const aclSrv = injector.get(ACLService, null);
                    if (aclSrv && !aclSrv.can(options.acl)) {
                        return throwError(() => ({
                            url: requestUrl,
                            status: 401,
                            statusText: `From Http Decorator`
                        }));
                    }
                    delete options.acl;
                }
                requestUrl = requestUrl.replace(/::/g, '^^');
                (data.path || [])
                    .filter(w => typeof args[w.index] !== 'undefined')
                    .forEach((i) => {
                    requestUrl = requestUrl.replace(new RegExp(`:${i.key}`, 'g'), encodeURIComponent(args[i.index]));
                });
                requestUrl = requestUrl.replace(/\^\^/g, `:`);
                const params = (data.query || []).reduce((p, i) => {
                    p[i.key] = args[i.index];
                    return p;
                }, {});
                const headers = (data.headers || []).reduce((p, i) => {
                    p[i.key] = args[i.index];
                    return p;
                }, {});
                if (method === 'FORM') {
                    headers['content-type'] = 'application/x-www-form-urlencoded';
                }
                const payload = getValidArgs(data, 'payload', args);
                const supportedBody = method === 'POST' || method === 'PUT';
                return http.request(method, requestUrl, {
                    body: supportedBody ? genBody(getValidArgs(data, 'body', args), payload) : null,
                    params: !supportedBody ? { ...params, ...payload } : params,
                    headers: { ...baseData.baseHeaders, ...headers },
                    ...options
                });
            };
            return descriptor;
        };
    };
}
/**
 * `OPTIONS` 请求
 * - 有效范围：方法
 */
export const OPTIONS = makeMethod('OPTIONS');
/**
 * `GET` 请求
 * - 有效范围：方法
 */
export const GET = makeMethod('GET');
/**
 * `POST` 请求
 * - 有效范围：方法
 */
export const POST = makeMethod('POST');
/**
 * `DELETE` 请求
 * - 有效范围：方法
 */
export const DELETE = makeMethod('DELETE');
/**
 * `PUT` 请求
 * - 有效范围：方法
 */
export const PUT = makeMethod('PUT');
/**
 * `HEAD` 请求
 * - 有效范围：方法
 */
export const HEAD = makeMethod('HEAD');
/**
 * `PATCH` 请求
 * - 有效范围：方法
 */
export const PATCH = makeMethod('PATCH');
/**
 * `JSONP` 请求
 * - 有效范围：方法
 */
export const JSONP = makeMethod('JSONP');
/**
 * `FORM` 请求
 * - 有效范围：方法
 */
export const FORM = makeMethod('FORM');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90aGVtZS9zcmMvc2VydmljZXMvaHR0cC9odHRwLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUk5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTVDOzs7Ozs7R0FNRztBQUVILE1BQU0sT0FBZ0IsT0FBTztJQUMzQixZQUF3QyxRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQzs7b0dBRDFDLE9BQU8sa0JBQ1AsUUFBUTt3R0FEUixPQUFPOzJGQUFQLE9BQU87a0JBRDVCLFVBQVU7OzBCQUVJLE1BQU07MkJBQUMsUUFBUTs7QUFtQjlCLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztBQUVoQyxTQUFTLFFBQVEsQ0FBQyxNQUFXLEVBQUUsTUFBYyxRQUFRO0lBQ25ELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUMzQjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLEdBQVc7SUFDakMsT0FBTyxVQUEwRCxNQUFjO1FBQzdFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDckIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BSUs7SUFFTCxPQUFPLFVBQTBELE1BQWM7UUFDN0UsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUM3QixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsU0FBaUI7SUFDbEMsT0FBTyxVQUFVLEdBQVk7UUFDM0IsT0FBTyxVQUFVLE1BQWUsRUFBRSxXQUFtQixFQUFFLEtBQWE7WUFDbEUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN2RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUU7Z0JBQ2xDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxHQUFHO2dCQUNILEtBQUs7YUFDTixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV0Qzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXhDOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUV4Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBRTlDLFNBQVMsWUFBWSxDQUFDLElBQVMsRUFBRSxHQUFXLEVBQUUsSUFBVztJQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUNwRSxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQWE7SUFDeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDekM7SUFDRCxPQUFPLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNqQyxDQUFDO0FBSUQsU0FBUyxVQUFVLENBQUMsTUFBbUI7SUFDckMsT0FBTyxVQUFVLE1BQWMsRUFBRSxFQUFFLE9BQXFCO1FBQ3RELE9BQU8sQ0FBQyxPQUFnQixFQUFFLFNBQWtCLEVBQUUsVUFBK0IsRUFBRSxFQUFFO1lBQy9FLFVBQVcsQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQVc7Z0JBQzFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO2dCQUV4QixNQUFNLFFBQVEsR0FBSSxJQUFrQixDQUFDLFFBQW9CLENBQUM7Z0JBQzFELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBZ0IsQ0FBQztnQkFDNUQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO29CQUNoQixNQUFNLElBQUksU0FBUyxDQUNqQix3R0FBd0csQ0FDekcsQ0FBQztpQkFDSDtnQkFFRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBRTNDLElBQUksVUFBVSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7Z0JBQzNCLFVBQVUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDM0csR0FBRyxDQUNKLENBQUM7Z0JBQ0YsaUJBQWlCO2dCQUNqQixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3JELFVBQVUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDtnQkFFRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ2YsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzlDLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3RDLE9BQU8sVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQ3ZCLEdBQUcsRUFBRSxVQUFVOzRCQUNmLE1BQU0sRUFBRSxHQUFHOzRCQUNYLFVBQVUsRUFBRSxxQkFBcUI7eUJBQ2xDLENBQUMsQ0FBQyxDQUFDO3FCQUNMO29CQUNELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7Z0JBRUQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxDQUFFLElBQUksQ0FBQyxJQUFvQixJQUFJLEVBQUUsQ0FBQztxQkFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsQ0FBQztxQkFDakQsT0FBTyxDQUFDLENBQUMsQ0FBWSxFQUFFLEVBQUU7b0JBQ3hCLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRTlDLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFZLEVBQUUsQ0FBWSxFQUFFLEVBQUU7b0JBQ3RFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUVQLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFZLEVBQUUsQ0FBWSxFQUFFLEVBQUU7b0JBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUVQLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLG1DQUFtQyxDQUFDO2lCQUMvRDtnQkFFRCxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxDQUFDO2dCQUU1RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRTtvQkFDdEMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUMvRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTtvQkFDM0QsT0FBTyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxFQUFFO29CQUNoRCxHQUFHLE9BQU87aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFN0M7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVyQzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXZDOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFM0M7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVyQzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXZDOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFekM7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV6Qzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgQUNMU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9hY2wnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJy4vaHR0cC5jbGllbnQnO1xuXG4vKipcbiAqIEV2ZXJ5IGh0dHAgZGVjb3JhdG9yIG11c3QgYmUgYmFzZWQgb24gYEJhc2VBUElgLCBMaWtlIHRoaXM6XG4gKiBgYGB0c1xuICogXFxASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBEYXRhU2VydmljZSBleHRlbmRzIEJhc2VBcGkge31cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUFwaSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSW5qZWN0b3IpIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cE9wdGlvbnMge1xuICAvKiogQUNM6YWN572u77yM6Iul5a+85YWlIGBAeWVsb24vYWNsYCDml7boh6rliqjmnInmlYjvvIznrYnlkIzkuo4gYEFDTFNlcnZpY2UuY2FuKHJvbGVPckFiaWxpdHk6IEFDTENhblR5cGUpYCDlj4LmlbDlgLwgKi9cbiAgYWNsPzogYW55O1xuICBvYnNlcnZlPzogJ2JvZHknIHwgJ2V2ZW50cycgfCAncmVzcG9uc2UnO1xuICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnO1xuICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW47XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBQYXJhbVR5cGUge1xuICBrZXk6IHN0cmluZztcbiAgaW5kZXg6IG51bWJlcjtcbiAgW2tleTogc3RyaW5nXTogYW55O1xuICBba2V5OiBudW1iZXJdOiBhbnk7XG59XG5cbmNvbnN0IHBhcmFtS2V5ID0gYF9fYXBpX3BhcmFtc2A7XG5cbmZ1bmN0aW9uIHNldFBhcmFtKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyA9IHBhcmFtS2V5KTogYW55IHtcbiAgbGV0IHBhcmFtcyA9IHRhcmdldFtrZXldO1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBwYXJhbXMgPSB0YXJnZXRba2V5XSA9IHt9O1xuICB9XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbi8qKlxuICog6buY6K6k5Z+65YeGVVJMXG4gKiAtIOacieaViOiMg+WbtO+8muexu1xuICovXG5leHBvcnQgZnVuY3Rpb24gQmFzZVVybCh1cmw6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gPFRDbGFzcyBleHRlbmRzIG5ldyAoLi4uYXJnczogYW55W10pID0+IEJhc2VBcGk+KHRhcmdldDogVENsYXNzKTogVENsYXNzIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzZXRQYXJhbSh0YXJnZXQucHJvdG90eXBlKTtcbiAgICBwYXJhbXMuYmFzZVVybCA9IHVybDtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xufVxuXG4vKipcbiAqIOm7mOiupCBgaGVhZGVyc2BcbiAqIC0g5pyJ5pWI6IyD5Zu077ya57G7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCYXNlSGVhZGVycyhcbiAgaGVhZGVyczpcbiAgICB8IEh0dHBIZWFkZXJzXG4gICAgfCB7XG4gICAgICAgIFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgICAgfVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiA8VENsYXNzIGV4dGVuZHMgbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gQmFzZUFwaT4odGFyZ2V0OiBUQ2xhc3MpOiBUQ2xhc3Mge1xuICAgIGNvbnN0IHBhcmFtcyA9IHNldFBhcmFtKHRhcmdldC5wcm90b3R5cGUpO1xuICAgIHBhcmFtcy5iYXNlSGVhZGVycyA9IGhlYWRlcnM7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZVBhcmFtKHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoa2V5Pzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IEJhc2VBcGksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHNldFBhcmFtKHNldFBhcmFtKHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgICAgIGxldCB0UGFyYW1zID0gcGFyYW1zW3BhcmFtTmFtZV07XG4gICAgICBpZiAodHlwZW9mIHRQYXJhbXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRQYXJhbXMgPSBwYXJhbXNbcGFyYW1OYW1lXSA9IFtdO1xuICAgICAgfVxuICAgICAgdFBhcmFtcy5wdXNoKHtcbiAgICAgICAga2V5LFxuICAgICAgICBpbmRleFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn1cblxuLyoqXG4gKiBVUkzot6/nlLHlj4LmlbBcbiAqIC0g5pyJ5pWI6IyD5Zu077ya5pa55rOV5Y+C5pWwXG4gKi9cbmV4cG9ydCBjb25zdCBQYXRoID0gbWFrZVBhcmFtKCdwYXRoJyk7XG5cbi8qKlxuICogVVJMIOWPguaVsCBgUXVlcnlTdHJpbmdgXG4gKiAtIOacieaViOiMg+WbtO+8muaWueazleWPguaVsFxuICovXG5leHBvcnQgY29uc3QgUXVlcnkgPSBtYWtlUGFyYW0oJ3F1ZXJ5Jyk7XG5cbi8qKlxuICog5Y+C5pWwIGBCb2R5YFxuICogLSDmnInmlYjojIPlm7TvvJrmlrnms5Xlj4LmlbBcbiAqL1xuZXhwb3J0IGNvbnN0IEJvZHkgPSBtYWtlUGFyYW0oJ2JvZHknKSgpO1xuXG4vKipcbiAqIOWPguaVsCBgaGVhZGVyc2BcbiAqIC0g5pyJ5pWI6IyD5Zu077ya5pa55rOV5Y+C5pWwXG4gKiAtIOWQiOW5tiBgQmFzZUhlYWRlcnNgXG4gKi9cbmV4cG9ydCBjb25zdCBIZWFkZXJzID0gbWFrZVBhcmFtKCdoZWFkZXJzJyk7XG5cbi8qKlxuICogUmVxdWVzdCBQYXlsb2FkXG4gKiAtIFN1cHBvcnRlZCBib2R5IChsaWtlYFBPU1RgLCBgUFVUYCkgYXMgYSBib2R5IGRhdGEsIGVxdWl2YWxlbnQgdG8gYEBCb2R5YFxuICogLSBOb3Qgc3VwcG9ydGVkIGJvZHkgKGxpa2UgYEdFVGAsIGBERUxFVEVgIGV0YykgYXMgYSBgUXVlcnlTdHJpbmdgXG4gKi9cbmV4cG9ydCBjb25zdCBQYXlsb2FkID0gbWFrZVBhcmFtKCdwYXlsb2FkJykoKTtcblxuZnVuY3Rpb24gZ2V0VmFsaWRBcmdzKGRhdGE6IGFueSwga2V5OiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogTnpTYWZlQW55IHtcbiAgaWYgKCFkYXRhW2tleV0gfHwgIUFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSB8fCBkYXRhW2tleV0ubGVuZ3RoIDw9IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBhcmdzW2RhdGFba2V5XVswXS5pbmRleF07XG59XG5cbmZ1bmN0aW9uIGdlbkJvZHkoZGF0YT86IGFueSwgcGF5bG9hZD86IGFueSk6IGFueSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpIHx8IEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihbXSwgZGF0YSwgcGF5bG9hZCk7XG4gIH1cbiAgcmV0dXJuIHsgLi4uZGF0YSwgLi4ucGF5bG9hZCB9O1xufVxuXG5leHBvcnQgdHlwZSBNRVRIT0RfVFlQRSA9ICdPUFRJT05TJyB8ICdHRVQnIHwgJ1BPU1QnIHwgJ0RFTEVURScgfCAnUFVUJyB8ICdIRUFEJyB8ICdQQVRDSCcgfCAnSlNPTlAnIHwgJ0ZPUk0nO1xuXG5mdW5jdGlvbiBtYWtlTWV0aG9kKG1ldGhvZDogTUVUSE9EX1RZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh1cmw6IHN0cmluZyA9ICcnLCBvcHRpb25zPzogSHR0cE9wdGlvbnMpIHtcbiAgICByZXR1cm4gKF90YXJnZXQ6IEJhc2VBcGksIHRhcmdldEtleT86IHN0cmluZywgZGVzY3JpcHRvcj86IFByb3BlcnR5RGVzY3JpcHRvcikgPT4ge1xuICAgICAgZGVzY3JpcHRvciEudmFsdWUgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBjb25zdCBpbmplY3RvciA9ICh0aGlzIGFzIE56U2FmZUFueSkuaW5qZWN0b3IgYXMgSW5qZWN0b3I7XG4gICAgICAgIGNvbnN0IGh0dHAgPSBpbmplY3Rvci5nZXQoX0h0dHBDbGllbnQsIG51bGwpIGFzIF9IdHRwQ2xpZW50O1xuICAgICAgICBpZiAoaHR0cCA9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgIGBOb3QgZm91bmQgJ19IdHRwQ2xpZW50JywgWW91IGNhbiBpbXBvcnQgJ1l1bnphaVRoZW1lTW9kdWxlJyAmJiAnSHR0cENsaWVudE1vZHVsZScgaW4geW91ciByb290IG1vZHVsZS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJhc2VEYXRhID0gc2V0UGFyYW0odGhpcyk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzZXRQYXJhbShiYXNlRGF0YSwgdGFyZ2V0S2V5KTtcblxuICAgICAgICBsZXQgcmVxdWVzdFVybCA9IHVybCB8fCAnJztcbiAgICAgICAgcmVxdWVzdFVybCA9IFtiYXNlRGF0YS5iYXNlVXJsIHx8ICcnLCByZXF1ZXN0VXJsLnN0YXJ0c1dpdGgoJy8nKSA/IHJlcXVlc3RVcmwuc3Vic3RyaW5nKDEpIDogcmVxdWVzdFVybF0uam9pbihcbiAgICAgICAgICAnLydcbiAgICAgICAgKTtcbiAgICAgICAgLy8gZml4IGxhc3Qgc3BsaXRcbiAgICAgICAgaWYgKHJlcXVlc3RVcmwubGVuZ3RoID4gMSAmJiByZXF1ZXN0VXJsLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICByZXF1ZXN0VXJsID0gcmVxdWVzdFVybC5zdWJzdHJpbmcoMCwgcmVxdWVzdFVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmFjbCkge1xuICAgICAgICAgIGNvbnN0IGFjbFNydiA9IGluamVjdG9yLmdldChBQ0xTZXJ2aWNlLCBudWxsKTtcbiAgICAgICAgICBpZiAoYWNsU3J2ICYmICFhY2xTcnYuY2FuKG9wdGlvbnMuYWNsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gKHtcbiAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0VXJsLFxuICAgICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgICAgc3RhdHVzVGV4dDogYEZyb20gSHR0cCBEZWNvcmF0b3JgXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmFjbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RVcmwgPSByZXF1ZXN0VXJsLnJlcGxhY2UoLzo6L2csICdeXicpO1xuICAgICAgICAoKGRhdGEucGF0aCBhcyBQYXJhbVR5cGVbXSkgfHwgW10pXG4gICAgICAgICAgLmZpbHRlcih3ID0+IHR5cGVvZiBhcmdzW3cuaW5kZXhdICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAuZm9yRWFjaCgoaTogUGFyYW1UeXBlKSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0VXJsID0gcmVxdWVzdFVybC5yZXBsYWNlKG5ldyBSZWdFeHAoYDoke2kua2V5fWAsICdnJyksIGVuY29kZVVSSUNvbXBvbmVudChhcmdzW2kuaW5kZXhdKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHJlcXVlc3RVcmwgPSByZXF1ZXN0VXJsLnJlcGxhY2UoL1xcXlxcXi9nLCBgOmApO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IChkYXRhLnF1ZXJ5IHx8IFtdKS5yZWR1Y2UoKHA6IE56U2FmZUFueSwgaTogUGFyYW1UeXBlKSA9PiB7XG4gICAgICAgICAgcFtpLmtleV0gPSBhcmdzW2kuaW5kZXhdO1xuICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IChkYXRhLmhlYWRlcnMgfHwgW10pLnJlZHVjZSgocDogTnpTYWZlQW55LCBpOiBQYXJhbVR5cGUpID0+IHtcbiAgICAgICAgICBwW2kua2V5XSA9IGFyZ3NbaS5pbmRleF07XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICBpZiAobWV0aG9kID09PSAnRk9STScpIHtcbiAgICAgICAgICBoZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGdldFZhbGlkQXJncyhkYXRhLCAncGF5bG9hZCcsIGFyZ3MpO1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRCb2R5ID0gbWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJztcblxuICAgICAgICByZXR1cm4gaHR0cC5yZXF1ZXN0KG1ldGhvZCwgcmVxdWVzdFVybCwge1xuICAgICAgICAgIGJvZHk6IHN1cHBvcnRlZEJvZHkgPyBnZW5Cb2R5KGdldFZhbGlkQXJncyhkYXRhLCAnYm9keScsIGFyZ3MpLCBwYXlsb2FkKSA6IG51bGwsXG4gICAgICAgICAgcGFyYW1zOiAhc3VwcG9ydGVkQm9keSA/IHsgLi4ucGFyYW1zLCAuLi5wYXlsb2FkIH0gOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogeyAuLi5iYXNlRGF0YS5iYXNlSGVhZGVycywgLi4uaGVhZGVycyB9LFxuICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgICB9O1xuICB9O1xufVxuXG4vKipcbiAqIGBPUFRJT05TYCDor7fmsYJcbiAqIC0g5pyJ5pWI6IyD5Zu077ya5pa55rOVXG4gKi9cbmV4cG9ydCBjb25zdCBPUFRJT05TID0gbWFrZU1ldGhvZCgnT1BUSU9OUycpO1xuXG4vKipcbiAqIGBHRVRgIOivt+axglxuICogLSDmnInmlYjojIPlm7TvvJrmlrnms5VcbiAqL1xuZXhwb3J0IGNvbnN0IEdFVCA9IG1ha2VNZXRob2QoJ0dFVCcpO1xuXG4vKipcbiAqIGBQT1NUYCDor7fmsYJcbiAqIC0g5pyJ5pWI6IyD5Zu077ya5pa55rOVXG4gKi9cbmV4cG9ydCBjb25zdCBQT1NUID0gbWFrZU1ldGhvZCgnUE9TVCcpO1xuXG4vKipcbiAqIGBERUxFVEVgIOivt+axglxuICogLSDmnInmlYjojIPlm7TvvJrmlrnms5VcbiAqL1xuZXhwb3J0IGNvbnN0IERFTEVURSA9IG1ha2VNZXRob2QoJ0RFTEVURScpO1xuXG4vKipcbiAqIGBQVVRgIOivt+axglxuICogLSDmnInmlYjojIPlm7TvvJrmlrnms5VcbiAqL1xuZXhwb3J0IGNvbnN0IFBVVCA9IG1ha2VNZXRob2QoJ1BVVCcpO1xuXG4vKipcbiAqIGBIRUFEYCDor7fmsYJcbiAqIC0g5pyJ5pWI6IyD5Zu077ya5pa55rOVXG4gKi9cbmV4cG9ydCBjb25zdCBIRUFEID0gbWFrZU1ldGhvZCgnSEVBRCcpO1xuXG4vKipcbiAqIGBQQVRDSGAg6K+35rGCXG4gKiAtIOacieaViOiMg+WbtO+8muaWueazlVxuICovXG5leHBvcnQgY29uc3QgUEFUQ0ggPSBtYWtlTWV0aG9kKCdQQVRDSCcpO1xuXG4vKipcbiAqIGBKU09OUGAg6K+35rGCXG4gKiAtIOacieaViOiMg+WbtO+8muaWueazlVxuICovXG5leHBvcnQgY29uc3QgSlNPTlAgPSBtYWtlTWV0aG9kKCdKU09OUCcpO1xuXG4vKipcbiAqIGBGT1JNYCDor7fmsYJcbiAqIC0g5pyJ5pWI6IyD5Zu077ya5pa55rOVXG4gKi9cbmV4cG9ydCBjb25zdCBGT1JNID0gbWFrZU1ldGhvZCgnRk9STScpO1xuIl19