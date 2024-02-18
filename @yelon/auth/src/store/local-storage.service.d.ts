import { IStore } from './interface';
import { ITokenModel } from '../token/interface';
export declare function YA_STORE_TOKEN_LOCAL_FACTORY(): IStore;
/**
 * `localStorage` storage, **not lost after closing the browser**.
 *
 * ```ts
 * provideAuth(withJWT(), withLocalStorage())
 * ```
 */
export declare class LocalStorageStore implements IStore {
    get(key: string): ITokenModel;
    set(key: string, value: ITokenModel | null): boolean;
    remove(key: string): void;
}
