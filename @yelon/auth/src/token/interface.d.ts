import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { YunzaiAuthConfig } from '@yelon/util';
export declare const YA_SERVICE_TOKEN: InjectionToken<ITokenService>;
export interface ITokenModel {
    [key: string]: any;
    access_token?: string | null;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
}
export interface AuthReferrer {
    url?: string | null | undefined;
}
export interface ITokenService {
    /**
     * 授权失败后跳转路由路径（支持外部链接地址），通过设置[全局配置](https://ng.yunzainfo.com/docs/global-config)来改变
     */
    readonly login_url: string | undefined;
    /**
     * 当前请求页面的来源页面的地址
     */
    readonly referrer?: AuthReferrer;
    readonly options: YunzaiAuthConfig;
    /**
     * 订阅刷新，订阅时会自动产生一个定时器，每隔一段时间进行一些校验
     * - **注意** 会多次触发，请务必做好业务判断
     */
    readonly refresh: Observable<ITokenModel>;
    /**
     * 设置 Token 信息，当用户 Token 发生变动时都需要调用此方法重新刷新
     * - 如果需要监听过期，需要传递 `expired` 值
     */
    set(data: ITokenModel | null): boolean;
    /**
     * 获取Token，形式包括：
     * - `get()` 获取 Simple Token
     * - `get<JWTTokenModel>(JWTTokenModel)` 获取 JWT Token
     */
    get(type?: any): ITokenModel | null;
    /**
     * 获取Token，形式包括：
     * - `get()` 获取 Simple Token
     * - `get<JWTTokenModel>(JWTTokenModel)` 获取 JWT Token
     */
    get<T extends ITokenModel>(type?: any): T;
    /**
     * 清除 Token 信息，当用户退出登录时调用。
     * ```
     * // 清除所有 Token 信息
     * tokenService.clear();
     * // 只清除 token 字段
     * tokenService.clear({ onlyToken: true });
     * ```
     */
    clear(options?: {
        onlyToken: boolean;
    }): void;
    /**
     * 订阅 Token 对象变更通知
     */
    change(): Observable<ITokenModel | null>;
}
