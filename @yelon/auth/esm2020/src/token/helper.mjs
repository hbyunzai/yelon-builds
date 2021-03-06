import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { YA_SERVICE_TOKEN } from './interface';
export function CheckSimple(model) {
    return model != null && typeof model.token === 'string' && model.token.length > 0;
}
export function CheckJwt(model, offset) {
    try {
        return model != null && !!model.token && !model.isExpired(offset);
    }
    catch (err) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            console.warn(`${err.message}, jump to login_url`);
        }
        return false;
    }
}
export function ToLogin(options, injector, url) {
    const router = injector.get(Router);
    injector.get(YA_SERVICE_TOKEN).referrer.url = url || router.url;
    if (options.token_invalid_redirect === true) {
        setTimeout(() => {
            if (/^https?:\/\//g.test(options.login_url)) {
                injector.get(DOCUMENT).location.href = options.login_url;
            }
            else {
                router.navigate([options.login_url]);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYXV0aC9zcmMvdG9rZW4vaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLekMsT0FBTyxFQUFFLGdCQUFnQixFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUk5RCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQThCO0lBQ3hELE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNwRixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFvQixFQUFFLE1BQWM7SUFDM0QsSUFBSTtRQUNGLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkU7SUFBQyxPQUFPLEdBQWMsRUFBRTtRQUN2QixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLHFCQUFxQixDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBeUIsRUFBRSxRQUFrQixFQUFFLEdBQVk7SUFDakYsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBUyxNQUFNLENBQUMsQ0FBQztJQUMzQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFtQixDQUFDLFFBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDcEYsSUFBSSxPQUFPLENBQUMsc0JBQXNCLEtBQUssSUFBSSxFQUFFO1FBQzNDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxFQUFFO2dCQUM1QyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQW1CLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgWXVuemFpQXV0aENvbmZpZyB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IFlBX1NFUlZJQ0VfVE9LRU4sIElUb2tlblNlcnZpY2UgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBKV1RUb2tlbk1vZGVsIH0gZnJvbSAnLi9qd3Qvand0Lm1vZGVsJztcbmltcG9ydCB7IFNpbXBsZVRva2VuTW9kZWwgfSBmcm9tICcuL3NpbXBsZS9zaW1wbGUubW9kZWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ2hlY2tTaW1wbGUobW9kZWw6IFNpbXBsZVRva2VuTW9kZWwgfCBudWxsKTogYm9vbGVhbiB7XG4gIHJldHVybiBtb2RlbCAhPSBudWxsICYmIHR5cGVvZiBtb2RlbC50b2tlbiA9PT0gJ3N0cmluZycgJiYgbW9kZWwudG9rZW4ubGVuZ3RoID4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENoZWNrSnd0KG1vZGVsOiBKV1RUb2tlbk1vZGVsLCBvZmZzZXQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIHJldHVybiBtb2RlbCAhPSBudWxsICYmICEhbW9kZWwudG9rZW4gJiYgIW1vZGVsLmlzRXhwaXJlZChvZmZzZXQpO1xuICB9IGNhdGNoIChlcnI6IE56U2FmZUFueSkge1xuICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgJHtlcnIubWVzc2FnZX0sIGp1bXAgdG8gbG9naW5fdXJsYCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVG9Mb2dpbihvcHRpb25zOiBZdW56YWlBdXRoQ29uZmlnLCBpbmplY3RvcjogSW5qZWN0b3IsIHVybD86IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCByb3V0ZXIgPSBpbmplY3Rvci5nZXQ8Um91dGVyPihSb3V0ZXIpO1xuICAoaW5qZWN0b3IuZ2V0KFlBX1NFUlZJQ0VfVE9LRU4pIGFzIElUb2tlblNlcnZpY2UpLnJlZmVycmVyIS51cmwgPSB1cmwgfHwgcm91dGVyLnVybDtcbiAgaWYgKG9wdGlvbnMudG9rZW5faW52YWxpZF9yZWRpcmVjdCA9PT0gdHJ1ZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKC9eaHR0cHM/OlxcL1xcLy9nLnRlc3Qob3B0aW9ucy5sb2dpbl91cmwhKSkge1xuICAgICAgICBpbmplY3Rvci5nZXQoRE9DVU1FTlQpLmxvY2F0aW9uLmhyZWYgPSBvcHRpb25zLmxvZ2luX3VybCBhcyBzdHJpbmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3V0ZXIubmF2aWdhdGUoW29wdGlvbnMubG9naW5fdXJsXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==