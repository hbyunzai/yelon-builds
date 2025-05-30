export interface YunzaiMenu {
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
export interface YunzaiMenuAttribute {
    defaultRoute: any;
    dataPlatform: any;
    targetUser: any;
    starConfig: any;
}
