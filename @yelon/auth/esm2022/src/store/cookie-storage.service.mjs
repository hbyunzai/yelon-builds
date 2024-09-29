import { inject } from '@angular/core';
import { CookieService } from '@yelon/util/browser';
/**
 * `cookie` storage
 *
 * ```ts
 provideHttpClient(withInterceptors([...(environment.interceptorFns ?? []), authJWTInterceptor, defaultInterceptor])),
 provideAuth(withCookie()),
 * ```
 */
export class CookieStorageStore {
    constructor() {
        this.srv = inject(CookieService);
    }
    get(key) {
        try {
            return JSON.parse(this.srv.get(key) || '{}');
        }
        catch (ex) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.error(`CookieStorageStore: Invalid key-value format ${key}`, ex);
            }
            return {};
        }
    }
    set(key, value) {
        const expires = (value?.expires_in ?? 0) / 1e3;
        this.srv.put(key, JSON.stringify(value ?? {}), { expires });
        return true;
    }
    remove(key) {
        this.srv.remove(key);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLXN0b3JhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2F1dGgvc3JjL3N0b3JlL2Nvb2tpZS1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLcEQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFBL0I7UUFDbUIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQXNCL0MsQ0FBQztJQXBCQyxHQUFHLENBQUMsR0FBVztRQUNiLElBQUksQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUNaLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRSxDQUFDO1lBQ0QsT0FBTyxFQUFpQixDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFxQztRQUNwRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICdAeWVsb24vdXRpbC9icm93c2VyJztcblxuaW1wb3J0IHsgSVRva2VuTW9kZWwgfSBmcm9tICcuLi90b2tlbi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSVN0b3JlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG4vKipcbiAqIGBjb29raWVgIHN0b3JhZ2VcbiAqXG4gKiBgYGB0c1xuIHByb3ZpZGVIdHRwQ2xpZW50KHdpdGhJbnRlcmNlcHRvcnMoWy4uLihlbnZpcm9ubWVudC5pbnRlcmNlcHRvckZucyA/PyBbXSksIGF1dGhKV1RJbnRlcmNlcHRvciwgZGVmYXVsdEludGVyY2VwdG9yXSkpLFxuIHByb3ZpZGVBdXRoKHdpdGhDb29raWUoKSksXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIENvb2tpZVN0b3JhZ2VTdG9yZSBpbXBsZW1lbnRzIElTdG9yZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3J2ID0gaW5qZWN0KENvb2tpZVNlcnZpY2UpO1xuXG4gIGdldChrZXk6IHN0cmluZyk6IElUb2tlbk1vZGVsIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5zcnYuZ2V0KGtleSkgfHwgJ3t9Jyk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ29va2llU3RvcmFnZVN0b3JlOiBJbnZhbGlkIGtleS12YWx1ZSBmb3JtYXQgJHtrZXl9YCwgZXgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt9IGFzIElUb2tlbk1vZGVsO1xuICAgIH1cbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IElUb2tlbk1vZGVsIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGV4cGlyZXMgPSAodmFsdWU/LmV4cGlyZXNfaW4gPz8gMCkgLyAxZTM7XG4gICAgdGhpcy5zcnYucHV0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUgPz8ge30pLCB7IGV4cGlyZXMgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNydi5yZW1vdmUoa2V5KTtcbiAgfVxufVxuIl19