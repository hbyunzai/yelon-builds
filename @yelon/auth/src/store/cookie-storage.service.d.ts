import { CookieService } from '@yelon/util/browser';
import { IStore } from './interface';
import { ITokenModel } from '../token/interface';
/**
 * `cookie` storage
 *
 * ```ts
 * // global-config.module.ts
 * { provide: YA_STORE_TOKEN, useClass: CookieStorageStore, deps: [CookieService] }
 * ```
 */
export declare class CookieStorageStore implements IStore {
    private srv;
    constructor(srv: CookieService);
    get(key: string): ITokenModel;
    set(key: string, value: ITokenModel | null | undefined): boolean;
    remove(key: string): void;
}
