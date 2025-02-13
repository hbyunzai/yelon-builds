import { ITokenModel } from '../interface';
export declare class SimpleTokenModel implements ITokenModel {
    [key: string]: any;
    access_token?: string | null;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
}
