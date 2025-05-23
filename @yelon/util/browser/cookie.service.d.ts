import * as i0 from "@angular/core";
export interface CookieOptions {
    path?: string;
    domain?: string;
    /**
     * Expiration time, `number` is seconds
     *
     * 过期时间，`number` 类型表示秒数
     */
    expires?: number | Date | string;
    secure?: boolean;
    HttpOnly?: boolean;
    SameSite?: boolean | 'lax' | 'strict' | 'none';
}
/**
 * A set of simple Cookie manipulation classes.
 *
 * 一组简单的 Cookie 操作类。
 */
export declare class CookieService {
    private readonly _doc;
    private readonly platform;
    private get doc();
    /**
     * Original cookie value
     *
     * 原始Cookie值
     */
    get cookie(): string;
    /**
     * Get all cookie key-value pairs
     *
     * 获取所有Cookie键值对
     */
    getAll(): Record<string, string>;
    /**
     * Get the value of given cookie `key`
     *
     * 获取指定 `key` 的值
     */
    get(key: string): string | undefined;
    /**
     * Sets a value for given cookie key
     *
     * 设置指定 Cookie 键的值
     */
    put(key: string, value: string, options?: CookieOptions): void;
    /**
     * Remove given cookie
     *
     * 移除指定 Cookie
     */
    remove(key: string, options?: CookieOptions): void;
    /**
     * Remove all cookies
     *
     * 移除所有 Cookies
     */
    removeAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CookieService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CookieService>;
}
