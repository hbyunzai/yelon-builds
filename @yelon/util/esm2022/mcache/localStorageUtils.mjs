export const YZ_USER_KEY = '_yz_user';
export const YZ_PROJECT_INFO_KEY = '_yz_project_info';
export const YZ_CURRENT_KEY = '_yz_current';
export const YZ_HEADER_KEY = '_yz_header';
export const YZ_HEADER_TYPE_KEY = '_yz_header_type';
export const YZ_DEFAULT_ROUTE_KEY = '_yz_default_route';
export const YZ_TENANT_KEY = '_yz_tenant';
export const YZ_NEED_AUTH_KEY = '_yz_need_auth';
// export const YZ_LANGS_KEY = '_yz_langs';
// export const YZ_LANG_KEY = '_yz_lang';
function get(key) {
    if (key === YZ_HEADER_TYPE_KEY) {
        return localStorage.getItem(key);
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}
function set(key, data) {
    if (key === YZ_HEADER_TYPE_KEY) {
        localStorage.setItem(YZ_HEADER_TYPE_KEY, data);
        return;
    }
    localStorage.setItem(key, JSON.stringify(data));
}
export function useLocalStorageUser() {
    const setFn = user => set(YZ_USER_KEY, user);
    const getFn = () => get(YZ_USER_KEY);
    return [setFn, getFn];
}
export function useLocalStorageProjectInfo() {
    const setFn = data => set(YZ_PROJECT_INFO_KEY, data);
    const getFn = () => get(YZ_PROJECT_INFO_KEY);
    return [setFn, getFn];
}
export function useLocalStorageCurrent() {
    const setFn = data => set(YZ_CURRENT_KEY, data);
    const getFn = () => get(YZ_CURRENT_KEY);
    return [setFn, getFn];
}
export function useLocalStorageHeaderType() {
    const setFn = data => set(YZ_HEADER_TYPE_KEY, data);
    const getFn = () => get(YZ_HEADER_TYPE_KEY);
    return [setFn, getFn];
}
export function useLocalStorageHeader() {
    const setFn = data => set(YZ_HEADER_KEY, data);
    const getFn = () => get(YZ_HEADER_KEY);
    return [setFn, getFn];
}
export function useLocalStorageDefaultRoute() {
    const setFn = data => set(YZ_DEFAULT_ROUTE_KEY, data);
    const getFn = () => get(YZ_DEFAULT_ROUTE_KEY);
    return [setFn, getFn];
}
export function useLocalStorageTenant() {
    const setFn = data => set(YZ_TENANT_KEY, data);
    const getFn = () => get(YZ_TENANT_KEY);
    return [setFn, getFn];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxTdG9yYWdlVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91dGlsL21jYWNoZS9sb2NhbFN0b3JhZ2VVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO0FBQ3RELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUM7QUFDNUMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQztBQUMxQyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUNwRCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQztBQUN4RCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDO0FBQzFDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztBQUNoRCwyQ0FBMkM7QUFDM0MseUNBQXlDO0FBRXpDLFNBQVMsR0FBRyxDQUFJLEdBQVc7SUFDekIsSUFBSSxHQUFHLEtBQUssa0JBQWtCLEVBQUUsQ0FBQztRQUMvQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFjLENBQUM7SUFDaEQsQ0FBQztJQUNELE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN4QyxDQUFDO0FBRUQsU0FBUyxHQUFHLENBQUksR0FBVyxFQUFFLElBQU87SUFDbEMsSUFBSSxHQUFHLEtBQUssa0JBQWtCLEVBQUUsQ0FBQztRQUMvQixZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLElBQWMsQ0FBQyxDQUFDO1FBQ3pELE9BQU87SUFDVCxDQUFDO0lBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFLRCxNQUFNLFVBQVUsbUJBQW1CO0lBQ2pDLE1BQU0sS0FBSyxHQUEwQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEUsTUFBTSxLQUFLLEdBQTBCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBYSxXQUFXLENBQUMsQ0FBQztJQUN4RSxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxNQUFNLFVBQVUsMEJBQTBCO0lBQ3hDLE1BQU0sS0FBSyxHQUFpQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRixNQUFNLEtBQUssR0FBaUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFvQixtQkFBbUIsQ0FBQyxDQUFDO0lBQzlGLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0I7SUFDcEMsTUFBTSxLQUFLLEdBQWdDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RSxNQUFNLEtBQUssR0FBZ0MsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFtQixjQUFjLENBQUMsQ0FBQztJQUN2RixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCO0lBQ3ZDLE1BQU0sS0FBSyxHQUF1QixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RSxNQUFNLEtBQUssR0FBdUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFVLGtCQUFrQixDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxNQUFNLEtBQUssR0FBZ0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVFLE1BQU0sS0FBSyxHQUFnQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQW1CLGFBQWEsQ0FBQyxDQUFDO0lBQ3RGLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsTUFBTSxLQUFLLEdBQXNCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sS0FBSyxHQUFzQixHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQVMsb0JBQW9CLENBQUMsQ0FBQztJQUN6RSxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLE1BQU0sS0FBSyxHQUFzQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsTUFBTSxLQUFLLEdBQXNCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBUyxhQUFhLENBQUMsQ0FBQztJQUNsRSxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRCYXNpY0FzaWRlLCBOYXZUeXBlLCBZdW56YWlOYXZUb3BpYywgWXVuemFpUHJvamVjdEluZm8sIFl1bnphaVVzZXIgfSBmcm9tICdAeWVsb24vdXRpbC9tdHlwZXMnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IFlaX1VTRVJfS0VZID0gJ195el91c2VyJztcbmV4cG9ydCBjb25zdCBZWl9QUk9KRUNUX0lORk9fS0VZID0gJ195el9wcm9qZWN0X2luZm8nO1xuZXhwb3J0IGNvbnN0IFlaX0NVUlJFTlRfS0VZID0gJ195el9jdXJyZW50JztcbmV4cG9ydCBjb25zdCBZWl9IRUFERVJfS0VZID0gJ195el9oZWFkZXInO1xuZXhwb3J0IGNvbnN0IFlaX0hFQURFUl9UWVBFX0tFWSA9ICdfeXpfaGVhZGVyX3R5cGUnO1xuZXhwb3J0IGNvbnN0IFlaX0RFRkFVTFRfUk9VVEVfS0VZID0gJ195el9kZWZhdWx0X3JvdXRlJztcbmV4cG9ydCBjb25zdCBZWl9URU5BTlRfS0VZID0gJ195el90ZW5hbnQnO1xuZXhwb3J0IGNvbnN0IFlaX05FRURfQVVUSF9LRVkgPSAnX3l6X25lZWRfYXV0aCc7XG4vLyBleHBvcnQgY29uc3QgWVpfTEFOR1NfS0VZID0gJ195el9sYW5ncyc7XG4vLyBleHBvcnQgY29uc3QgWVpfTEFOR19LRVkgPSAnX3l6X2xhbmcnO1xuXG5mdW5jdGlvbiBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBUIHwgbnVsbCB7XG4gIGlmIChrZXkgPT09IFlaX0hFQURFUl9UWVBFX0tFWSkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpIGFzIE56U2FmZUFueTtcbiAgfVxuICBjb25zdCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgcmV0dXJuIGl0ZW0gPyBKU09OLnBhcnNlKGl0ZW0pIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0PFQ+KGtleTogc3RyaW5nLCBkYXRhOiBUKTogdm9pZCB7XG4gIGlmIChrZXkgPT09IFlaX0hFQURFUl9UWVBFX0tFWSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFlaX0hFQURFUl9UWVBFX0tFWSwgZGF0YSBhcyBzdHJpbmcpO1xuICAgIHJldHVybjtcbiAgfVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn1cblxudHlwZSByZXR1cm5TZXQ8VD4gPSAoZGF0YTogVCkgPT4gdm9pZDtcbnR5cGUgcmV0dXJuR2V0PFQ+ID0gKCkgPT4gVCB8IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VMb2NhbFN0b3JhZ2VVc2VyKCk6IFtyZXR1cm5TZXQ8WXVuemFpVXNlcj4sIHJldHVybkdldDxZdW56YWlVc2VyPl0ge1xuICBjb25zdCBzZXRGbjogcmV0dXJuU2V0PFl1bnphaVVzZXI+ID0gdXNlciA9PiBzZXQoWVpfVVNFUl9LRVksIHVzZXIpO1xuICBjb25zdCBnZXRGbjogcmV0dXJuR2V0PFl1bnphaVVzZXI+ID0gKCkgPT4gZ2V0PFl1bnphaVVzZXI+KFlaX1VTRVJfS0VZKTtcbiAgcmV0dXJuIFtzZXRGbiwgZ2V0Rm5dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlTG9jYWxTdG9yYWdlUHJvamVjdEluZm8oKTogW3JldHVyblNldDxZdW56YWlQcm9qZWN0SW5mbz4sIHJldHVybkdldDxZdW56YWlQcm9qZWN0SW5mbz5dIHtcbiAgY29uc3Qgc2V0Rm46IHJldHVyblNldDxZdW56YWlQcm9qZWN0SW5mbz4gPSBkYXRhID0+IHNldChZWl9QUk9KRUNUX0lORk9fS0VZLCBkYXRhKTtcbiAgY29uc3QgZ2V0Rm46IHJldHVybkdldDxZdW56YWlQcm9qZWN0SW5mbz4gPSAoKSA9PiBnZXQ8WXVuemFpUHJvamVjdEluZm8+KFlaX1BST0pFQ1RfSU5GT19LRVkpO1xuICByZXR1cm4gW3NldEZuLCBnZXRGbl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VMb2NhbFN0b3JhZ2VDdXJyZW50KCk6IFtyZXR1cm5TZXQ8TGF5b3V0QmFzaWNBc2lkZT4sIHJldHVybkdldDxMYXlvdXRCYXNpY0FzaWRlPl0ge1xuICBjb25zdCBzZXRGbjogcmV0dXJuU2V0PExheW91dEJhc2ljQXNpZGU+ID0gZGF0YSA9PiBzZXQoWVpfQ1VSUkVOVF9LRVksIGRhdGEpO1xuICBjb25zdCBnZXRGbjogcmV0dXJuR2V0PExheW91dEJhc2ljQXNpZGU+ID0gKCkgPT4gZ2V0PExheW91dEJhc2ljQXNpZGU+KFlaX0NVUlJFTlRfS0VZKTtcbiAgcmV0dXJuIFtzZXRGbiwgZ2V0Rm5dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlTG9jYWxTdG9yYWdlSGVhZGVyVHlwZSgpOiBbcmV0dXJuU2V0PE5hdlR5cGU+LCByZXR1cm5HZXQ8TmF2VHlwZT5dIHtcbiAgY29uc3Qgc2V0Rm46IHJldHVyblNldDxOYXZUeXBlPiA9IGRhdGEgPT4gc2V0KFlaX0hFQURFUl9UWVBFX0tFWSwgZGF0YSk7XG4gIGNvbnN0IGdldEZuOiByZXR1cm5HZXQ8TmF2VHlwZT4gPSAoKSA9PiBnZXQ8TmF2VHlwZT4oWVpfSEVBREVSX1RZUEVfS0VZKTtcbiAgcmV0dXJuIFtzZXRGbiwgZ2V0Rm5dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlTG9jYWxTdG9yYWdlSGVhZGVyKCk6IFtyZXR1cm5TZXQ8WXVuemFpTmF2VG9waWNbXT4sIHJldHVybkdldDxZdW56YWlOYXZUb3BpY1tdPl0ge1xuICBjb25zdCBzZXRGbjogcmV0dXJuU2V0PFl1bnphaU5hdlRvcGljW10+ID0gZGF0YSA9PiBzZXQoWVpfSEVBREVSX0tFWSwgZGF0YSk7XG4gIGNvbnN0IGdldEZuOiByZXR1cm5HZXQ8WXVuemFpTmF2VG9waWNbXT4gPSAoKSA9PiBnZXQ8WXVuemFpTmF2VG9waWNbXT4oWVpfSEVBREVSX0tFWSk7XG4gIHJldHVybiBbc2V0Rm4sIGdldEZuXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUxvY2FsU3RvcmFnZURlZmF1bHRSb3V0ZSgpOiBbcmV0dXJuU2V0PHN0cmluZz4sIHJldHVybkdldDxzdHJpbmc+XSB7XG4gIGNvbnN0IHNldEZuOiByZXR1cm5TZXQ8c3RyaW5nPiA9IGRhdGEgPT4gc2V0KFlaX0RFRkFVTFRfUk9VVEVfS0VZLCBkYXRhKTtcbiAgY29uc3QgZ2V0Rm46IHJldHVybkdldDxzdHJpbmc+ID0gKCkgPT4gZ2V0PHN0cmluZz4oWVpfREVGQVVMVF9ST1VURV9LRVkpO1xuICByZXR1cm4gW3NldEZuLCBnZXRGbl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VMb2NhbFN0b3JhZ2VUZW5hbnQoKTogW3JldHVyblNldDxzdHJpbmc+LCByZXR1cm5HZXQ8c3RyaW5nPl0ge1xuICBjb25zdCBzZXRGbjogcmV0dXJuU2V0PHN0cmluZz4gPSBkYXRhID0+IHNldChZWl9URU5BTlRfS0VZLCBkYXRhKTtcbiAgY29uc3QgZ2V0Rm46IHJldHVybkdldDxzdHJpbmc+ID0gKCkgPT4gZ2V0PHN0cmluZz4oWVpfVEVOQU5UX0tFWSk7XG4gIHJldHVybiBbc2V0Rm4sIGdldEZuXTtcbn1cblxuIl19