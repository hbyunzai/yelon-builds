import { YunzaiAuthConfig } from '@yelon/util/config';
import { JWTTokenModel } from './jwt/jwt.model';
import { SimpleTokenModel } from './simple/simple.model';
export declare function CheckSimple(model: SimpleTokenModel | null): boolean;
export declare function CheckJwt(model: JWTTokenModel, offset: number): boolean;
export declare function ToLogin(options: YunzaiAuthConfig, url?: string): void;
