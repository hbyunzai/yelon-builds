interface YunzaiAuthority {
    authority: string;
}

interface YunzaiMenu {
    [key: string]: any;
    appCode: string;
    appIconUrl: string;
    appType: string;
    appUrl: string;
    attribute: string;
    badge: number;
    badge_dot: boolean;
    badge_status: string;
    children: YunzaiMenu[];
    createdDate: string;
    displayIndex: number;
    externalLink: string;
    group: boolean;
    helpUrl: string;
    hide: boolean;
    hideChildren: boolean;
    hideInBreadcrumb: boolean;
    i18n: string;
    icon: string;
    id: string;
    intro: string;
    label: string;
    link: string;
    menuAuths: string[];
    reuse: boolean;
    shortcut: boolean;
    shortcut_root: boolean;
    systemCode: string;
    target: string;
    text: string;
    version: number;
}
interface YunzaiMenuAttribute {
    defaultRoute: any;
    dataPlatform: any;
    targetUser: any;
    starConfig: any;
}

interface YunzaiRole {
    id: string;
    onlyDeptOne: boolean;
    onlyOne: boolean;
    roleDesc: string;
    roleName: string;
    roleValue: string;
    status: number;
    thisDepartment: boolean;
}

interface YunzaiUser {
    email: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: YunzaiAuthority[];
    avatarId: string;
    credentialsNonExpired: boolean;
    deptId: string;
    deptName: string;
    enabled: boolean;
    id: string;
    menu: YunzaiMenu[];
    realname: string;
    roles: YunzaiRole[];
    userCode: string;
    userId: string;
    userType: number;
    username: string;
}

interface YunzaiHeaderStyle {
    label: string;
    value: string;
}
interface YunzaiProfile {
    name: string;
    url: string;
}
interface YunzaiProjectInfo {
    colorfulLogoUrl: string;
    copyright: string;
    faviconUrl: string;
    gateway: string;
    headerStyle: YunzaiHeaderStyle[];
    maxLogoUrl: string;
    miniLogoUrl: string;
    profileList: YunzaiProfile[];
    projectName: string;
    showAllMenu: boolean;
    tucaoUrl: string;
    pageTitlePattern: string;
}

interface YunzaiNavTopic {
    attribute: any;
    icon: any;
    children: YunzaiNavTopic[];
    intro: string;
    key: string;
    name: string;
    target: string;
    auth: boolean;
    url: string;
    version: string;
}

declare enum NavType {
    APPLICATION = "application",// 应用与服务
    GROUP = "group",// 分组
    TILE = "tiled",// 平铺
    BLANK = "blank",// 空
    TABS = "tabs"
}
interface LayoutBasicAside {
    name: string;
    intro: string;
    icon: string;
}
interface LayoutBasicDisplay {
    nav: boolean;
    reusetab: boolean;
    aside: boolean;
}
interface LayoutNavApplicationState {
    active: boolean;
    type: 'all' | 'mine' | 'other';
    topic?: YunzaiNavTopic;
    topics: YunzaiNavTopic[];
    list: YunzaiNavTopic[];
    search: string | null;
}
interface LayoutNavGroupState {
    topics: YunzaiNavTopic[];
}

interface YunzaiPageParam<T> {
    pageNum?: number;
    pageSize?: number;
    pageParam?: T;
}
interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: PageableSort;
    unpaged: boolean;
}
interface PageableSort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
interface YunzaiPageResult<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: PageableSort;
    totalElements: number;
    totalPages: number;
}
declare class YunzaiPageBuilder<T extends any | unknown> {
    private page;
    pageNum(pageNum: number): this;
    pageSize(pageSize: number): this;
    pageParam(param: T): this;
    default(): this;
    build(): YunzaiPageParam<T>;
}
declare class Page<T> {
    pageNum: number;
    pageSize: number;
    param?: Partial<T>;
    private constructor();
    static create<T>(): Page<T>;
}

interface YunzaiResponse<T> {
    data: T;
    errorMessage: string;
    message: string;
}
type YunzaiPageResponse<T> = YunzaiResponse<YunzaiPageResult<T>>;

export { NavType, Page, YunzaiPageBuilder };
export type { LayoutBasicAside, LayoutBasicDisplay, LayoutNavApplicationState, LayoutNavGroupState, Pageable, PageableSort, YunzaiAuthority, YunzaiHeaderStyle, YunzaiMenu, YunzaiMenuAttribute, YunzaiNavTopic, YunzaiPageParam, YunzaiPageResponse, YunzaiPageResult, YunzaiProfile, YunzaiProjectInfo, YunzaiResponse, YunzaiRole, YunzaiUser };
