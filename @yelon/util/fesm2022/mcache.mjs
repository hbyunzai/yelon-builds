const YZ_USER_KEY = '_yz_user';
const YZ_PROJECT_INFO_KEY = '_yz_project_info';
const YZ_CURRENT_KEY = '_yz_current';
const YZ_HEADER_KEY = '_yz_header';
const YZ_HEADER_TYPE_KEY = '_yz_header_type';
const YZ_DEFAULT_ROUTE_KEY = '_yz_default_route';
const YZ_TENANT_KEY = '_yz_tenant';
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
function useLocalStorageUser() {
    const setFn = user => set(YZ_USER_KEY, user);
    const getFn = () => get(YZ_USER_KEY);
    return [setFn, getFn];
}
function useLocalStorageProjectInfo() {
    const setFn = data => set(YZ_PROJECT_INFO_KEY, data);
    const getFn = () => get(YZ_PROJECT_INFO_KEY);
    return [setFn, getFn];
}
function useLocalStorageCurrent() {
    const setFn = data => set(YZ_CURRENT_KEY, data);
    const getFn = () => get(YZ_CURRENT_KEY);
    return [setFn, getFn];
}
function useLocalStorageHeaderType() {
    const setFn = data => set(YZ_HEADER_TYPE_KEY, data);
    const getFn = () => get(YZ_HEADER_TYPE_KEY);
    return [setFn, getFn];
}
function useLocalStorageHeader() {
    const setFn = data => set(YZ_HEADER_KEY, data);
    const getFn = () => get(YZ_HEADER_KEY);
    return [setFn, getFn];
}
function useLocalStorageDefaultRoute() {
    const setFn = data => set(YZ_DEFAULT_ROUTE_KEY, data);
    const getFn = () => get(YZ_DEFAULT_ROUTE_KEY);
    return [setFn, getFn];
}
function useLocalStorageTenant() {
    const setFn = data => set(YZ_TENANT_KEY, data);
    const getFn = () => get(YZ_TENANT_KEY);
    return [setFn, getFn];
}

/**
 * Generated bundle index. Do not edit.
 */

export { YZ_CURRENT_KEY, YZ_DEFAULT_ROUTE_KEY, YZ_HEADER_KEY, YZ_HEADER_TYPE_KEY, YZ_PROJECT_INFO_KEY, YZ_TENANT_KEY, YZ_USER_KEY, useLocalStorageCurrent, useLocalStorageDefaultRoute, useLocalStorageHeader, useLocalStorageHeaderType, useLocalStorageProjectInfo, useLocalStorageTenant, useLocalStorageUser };
//# sourceMappingURL=mcache.mjs.map
