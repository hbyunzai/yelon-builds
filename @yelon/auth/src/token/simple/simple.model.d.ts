import { ITokenModel } from '../interface';
export declare class SimpleTokenModel implements ITokenModel {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
}
