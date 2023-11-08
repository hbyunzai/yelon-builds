import { IStore } from './interface';
import { ITokenModel } from '../token/interface';
/**
 * `sessionStorage` storage, **lost after closing the browser**.
 *
 * ```ts
 * // global-config.module.ts
 * { provide: YA_STORE_TOKEN, useClass: SessionStorageStore }
 * ```
 */
export declare class SessionStorageStore implements IStore {
    get(key: string): ITokenModel;
    set(key: string, value: ITokenModel | null): boolean;
    remove(key: string): void;
}
