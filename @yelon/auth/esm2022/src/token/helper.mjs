import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { YA_SERVICE_TOKEN } from './interface';
export function CheckSimple(model) {
    return model != null && typeof model.access_token === 'string' && model.access_token.length > 0;
}
export function CheckJwt(model, offset) {
    try {
        return model != null && !!model.access_token && !model.isExpired(offset);
    }
    catch (err) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            console.warn(`${err.message}, jump to login_url`);
        }
        return false;
    }
}
export function ToLogin(options, url) {
    const router = inject(Router);
    const token = inject(YA_SERVICE_TOKEN);
    const doc = inject(DOCUMENT);
    token.referrer.url = url || router.url;
    if (options.token_invalid_redirect === true) {
        setTimeout(() => {
            if (/^https?:\/\//g.test(options.login_url)) {
                doc.location.href = options.login_url;
            }
            else {
                router.navigate([options.login_url]);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYXV0aC9zcmMvdG9rZW4vaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQWlCLE1BQU0sYUFBYSxDQUFDO0FBSTlELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBOEI7SUFDeEQsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQW9CLEVBQUUsTUFBYztJQUMzRCxJQUFJLENBQUM7UUFDSCxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFBQyxPQUFPLEdBQVksRUFBRSxDQUFDO1FBQ3RCLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBSSxHQUEyQixDQUFDLE9BQU8scUJBQXFCLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBeUIsRUFBRSxHQUFZO0lBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQWtCLENBQUM7SUFDeEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLEtBQUssQ0FBQyxRQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3hDLElBQUksT0FBTyxDQUFDLHNCQUFzQixLQUFLLElBQUksRUFBRSxDQUFDO1FBQzVDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFtQixDQUFDO1lBQ2xELENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFl1bnphaUF1dGhDb25maWcgfSBmcm9tICdAeWVsb24vdXRpbC9jb25maWcnO1xuXG5pbXBvcnQgeyBZQV9TRVJWSUNFX1RPS0VOLCBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSldUVG9rZW5Nb2RlbCB9IGZyb20gJy4vand0L2p3dC5tb2RlbCc7XG5pbXBvcnQgeyBTaW1wbGVUb2tlbk1vZGVsIH0gZnJvbSAnLi9zaW1wbGUvc2ltcGxlLm1vZGVsJztcblxuZXhwb3J0IGZ1bmN0aW9uIENoZWNrU2ltcGxlKG1vZGVsOiBTaW1wbGVUb2tlbk1vZGVsIHwgbnVsbCk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZWwgIT0gbnVsbCAmJiB0eXBlb2YgbW9kZWwuYWNjZXNzX3Rva2VuID09PSAnc3RyaW5nJyAmJiBtb2RlbC5hY2Nlc3NfdG9rZW4ubGVuZ3RoID4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENoZWNrSnd0KG1vZGVsOiBKV1RUb2tlbk1vZGVsLCBvZmZzZXQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIHJldHVybiBtb2RlbCAhPSBudWxsICYmICEhbW9kZWwuYWNjZXNzX3Rva2VuICYmICFtb2RlbC5pc0V4cGlyZWQob2Zmc2V0KTtcbiAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgY29uc29sZS53YXJuKGAkeyhlcnIgYXMgeyBtZXNzYWdlOiBzdHJpbmcgfSkubWVzc2FnZX0sIGp1bXAgdG8gbG9naW5fdXJsYCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVG9Mb2dpbihvcHRpb25zOiBZdW56YWlBdXRoQ29uZmlnLCB1cmw/OiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3Qgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIGNvbnN0IHRva2VuID0gaW5qZWN0KFlBX1NFUlZJQ0VfVE9LRU4pIGFzIElUb2tlblNlcnZpY2U7XG4gIGNvbnN0IGRvYyA9IGluamVjdChET0NVTUVOVCk7XG4gIHRva2VuLnJlZmVycmVyIS51cmwgPSB1cmwgfHwgcm91dGVyLnVybDtcbiAgaWYgKG9wdGlvbnMudG9rZW5faW52YWxpZF9yZWRpcmVjdCA9PT0gdHJ1ZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKC9eaHR0cHM/OlxcL1xcLy9nLnRlc3Qob3B0aW9ucy5sb2dpbl91cmwhKSkge1xuICAgICAgICBkb2MubG9jYXRpb24uaHJlZiA9IG9wdGlvbnMubG9naW5fdXJsIGFzIHN0cmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbb3B0aW9ucy5sb2dpbl91cmxdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19