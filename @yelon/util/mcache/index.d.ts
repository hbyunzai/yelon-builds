import { YunzaiUser, YunzaiProjectInfo, LayoutBasicAside, NavType, YunzaiNavTopic } from '@yelon/util/mtypes';

declare const YZ_USER_KEY = "_yz_user";
declare const YZ_PROJECT_INFO_KEY = "_yz_project_info";
declare const YZ_CURRENT_KEY = "_yz_current";
declare const YZ_HEADER_KEY = "_yz_header";
declare const YZ_HEADER_TYPE_KEY = "_yz_header_type";
declare const YZ_DEFAULT_ROUTE_KEY = "_yz_default_route";
declare const YZ_TENANT_KEY = "_yz_tenant";
declare const YZ_NEED_AUTH_KEY = "_yz_need_auth";
type returnSet<T> = (data: T) => void;
type returnGet<T> = () => T | null;
declare function useLocalStorageUser(): [returnSet<YunzaiUser>, returnGet<YunzaiUser>];
declare function useLocalStorageProjectInfo(): [returnSet<YunzaiProjectInfo>, returnGet<YunzaiProjectInfo>];
declare function useLocalStorageCurrent(): [returnSet<LayoutBasicAside>, returnGet<LayoutBasicAside>];
declare function useLocalStorageHeaderType(): [returnSet<NavType>, returnGet<NavType>];
declare function useLocalStorageHeader(): [returnSet<YunzaiNavTopic[]>, returnGet<YunzaiNavTopic[]>];
declare function useLocalStorageDefaultRoute(): [returnSet<string>, returnGet<string>];
declare function useLocalStorageTenant(): [returnSet<string>, returnGet<string>];

export { YZ_CURRENT_KEY, YZ_DEFAULT_ROUTE_KEY, YZ_HEADER_KEY, YZ_HEADER_TYPE_KEY, YZ_NEED_AUTH_KEY, YZ_PROJECT_INFO_KEY, YZ_TENANT_KEY, YZ_USER_KEY, useLocalStorageCurrent, useLocalStorageDefaultRoute, useLocalStorageHeader, useLocalStorageHeaderType, useLocalStorageProjectInfo, useLocalStorageTenant, useLocalStorageUser };
