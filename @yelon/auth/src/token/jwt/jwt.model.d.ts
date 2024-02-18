import { ITokenModel } from '../interface';
export interface JWT {
    /**
     * Issuerd
     */
    iss: string;
    /**
     * Issued At
     */
    iat: string;
    /**
     * Subject
     */
    sub: string;
    /**
     * Expiration Time
     */
    exp: number;
    /**
     * Audience
     */
    aud: string;
    /**
     * Not Before
     */
    nbf: string;
    /**
     * JWT ID
     */
    jti: string;
    [key: string]: any;
    [key: number]: any;
}
export declare class JWTTokenModel implements ITokenModel {
    [key: string]: any;
    token: string | null | undefined;
    expired?: number;
    /**
     * 获取载荷信息
     */
    get payload(): JWT;
    /**
     * 获取过期时间戳（单位：ms）
     */
    get exp(): number | null;
    /**
     * 检查Token是否过期，当`payload` 包含 `exp` 字段时有效，若无 `exp` 字段直接返回 `null`
     *
     * @param offsetSeconds 偏移量
     */
    isExpired(offsetSeconds?: number): boolean | null;
}
