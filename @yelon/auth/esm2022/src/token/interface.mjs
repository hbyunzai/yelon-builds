/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken } from '@angular/core';
import { YA_SERVICE_TOKEN_FACTORY } from './token.service';
export const YA_SERVICE_TOKEN = new InjectionToken('YA_SERVICE_TOKEN', {
    providedIn: 'root',
    factory: YA_SERVICE_TOKEN_FACTORY
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYXV0aC9zcmMvdG9rZW4vaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVEQUF1RDtBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFnQixrQkFBa0IsRUFBRTtJQUNwRixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsd0JBQXdCO0NBQ2xDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFl1bnphaUF1dGhDb25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOX0ZBQ1RPUlkgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgWUFfU0VSVklDRV9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJVG9rZW5TZXJ2aWNlPignWUFfU0VSVklDRV9UT0tFTicsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiBZQV9TRVJWSUNFX1RPS0VOX0ZBQ1RPUllcbn0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUb2tlbk1vZGVsIHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xuXG4gIHRva2VuOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiDov4fmnJ/ml7bpl7TvvIzljZXkvY3vvJptc1xuICAgKiAtIOS4jeeuoVNpbXBsZeOAgUpXVOaooeW8j+mDveW/hemhu+aMh+WumlxuICAgKi9cbiAgZXhwaXJlZD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdXRoUmVmZXJyZXIge1xuICB1cmw/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2tlblNlcnZpY2Uge1xuICAvKipcbiAgICog5o6I5p2D5aSx6LSl5ZCO6Lez6L2s6Lev55Sx6Lev5b6E77yI5pSv5oyB5aSW6YOo6ZO+5o6l5Zyw5Z2A77yJ77yM6YCa6L+H6K6+572uW+WFqOWxgOmFjee9rl0oaHR0cHM6Ly9uZy55dW56YWluZm8uY29tL2RvY3MvZ2xvYmFsLWNvbmZpZynmnaXmlLnlj5hcbiAgICovXG4gIHJlYWRvbmx5IGxvZ2luX3VybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiDlvZPliY3or7fmsYLpobXpnaLnmoTmnaXmupDpobXpnaLnmoTlnLDlnYBcbiAgICovXG4gIHJlYWRvbmx5IHJlZmVycmVyPzogQXV0aFJlZmVycmVyO1xuXG4gIHJlYWRvbmx5IG9wdGlvbnM6IFl1bnphaUF1dGhDb25maWc7XG5cbiAgLyoqXG4gICAqIOiuoumYheWIt+aWsO+8jOiuoumYheaXtuS8muiHquWKqOS6p+eUn+S4gOS4quWumuaXtuWZqO+8jOavj+malOS4gOauteaXtumXtOi/m+ihjOS4gOS6m+agoemqjFxuICAgKiAtICoq5rOo5oSPKiog5Lya5aSa5qyh6Kem5Y+R77yM6K+35Yqh5b+F5YGa5aW95Lia5Yqh5Yik5patXG4gICAqL1xuICByZWFkb25seSByZWZyZXNoOiBPYnNlcnZhYmxlPElUb2tlbk1vZGVsPjtcblxuICAvKipcbiAgICog6K6+572uIFRva2VuIOS/oeaBr++8jOW9k+eUqOaItyBUb2tlbiDlj5HnlJ/lj5jliqjml7bpg73pnIDopoHosIPnlKjmraTmlrnms5Xph43mlrDliLfmlrBcbiAgICogLSDlpoLmnpzpnIDopoHnm5HlkKzov4fmnJ/vvIzpnIDopoHkvKDpgJIgYGV4cGlyZWRgIOWAvFxuICAgKi9cbiAgc2V0KGRhdGE6IElUb2tlbk1vZGVsIHwgbnVsbCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIOiOt+WPllRva2Vu77yM5b2i5byP5YyF5ous77yaXG4gICAqIC0gYGdldCgpYCDojrflj5YgU2ltcGxlIFRva2VuXG4gICAqIC0gYGdldDxKV1RUb2tlbk1vZGVsPihKV1RUb2tlbk1vZGVsKWAg6I635Y+WIEpXVCBUb2tlblxuICAgKi9cbiAgZ2V0KHR5cGU/OiBhbnkpOiBJVG9rZW5Nb2RlbCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIOiOt+WPllRva2Vu77yM5b2i5byP5YyF5ous77yaXG4gICAqIC0gYGdldCgpYCDojrflj5YgU2ltcGxlIFRva2VuXG4gICAqIC0gYGdldDxKV1RUb2tlbk1vZGVsPihKV1RUb2tlbk1vZGVsKWAg6I635Y+WIEpXVCBUb2tlblxuICAgKi9cbiAgZ2V0PFQgZXh0ZW5kcyBJVG9rZW5Nb2RlbD4odHlwZT86IGFueSk6IFQ7XG5cbiAgLyoqXG4gICAqIOa4hemZpCBUb2tlbiDkv6Hmga/vvIzlvZPnlKjmiLfpgIDlh7rnmbvlvZXml7bosIPnlKjjgIJcbiAgICogYGBgXG4gICAqIC8vIOa4hemZpOaJgOaciSBUb2tlbiDkv6Hmga9cbiAgICogdG9rZW5TZXJ2aWNlLmNsZWFyKCk7XG4gICAqIC8vIOWPqua4hemZpCB0b2tlbiDlrZfmrrVcbiAgICogdG9rZW5TZXJ2aWNlLmNsZWFyKHsgb25seVRva2VuOiB0cnVlIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGNsZWFyKG9wdGlvbnM/OiB7IG9ubHlUb2tlbjogYm9vbGVhbiB9KTogdm9pZDtcblxuICAvKipcbiAgICog6K6i6ZiFIFRva2VuIOWvueixoeWPmOabtOmAmuefpVxuICAgKi9cbiAgY2hhbmdlKCk6IE9ic2VydmFibGU8SVRva2VuTW9kZWwgfCBudWxsPjtcbn1cbiJdfQ==