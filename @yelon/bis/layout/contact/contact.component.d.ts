import { ChangeDetectorRef, OnDestroy, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { STComponent } from '@yelon/abc/st';
import { ContactService } from './contact.service';
import * as i0 from "@angular/core";
export declare class ContactComponent implements OnInit, OnDestroy, AfterViewInit {
    private contact;
    private changeDetectorRef;
    subs: Subscription[];
    /**
     * tabset
     */
    nzTabsetSearch: string | null;
    nzTabsetLoading: boolean;
    /**
     * 树展开状态
     */
    nzExpandAll: boolean;
    /**
     * 部门树和部门查询的一些选项/可传可不传
     */
    nzDepts: NzTreeNodeOptions[];
    private _nzDeptsCopy;
    nzDeptTreeVirtualHeight: string | null;
    nzDeptClass: boolean;
    nzDeptClassHistory: boolean;
    nzDeptGrade: boolean;
    nzDeptGradeID: string | null;
    /**
     * 角色树
     */
    nzRoles: NzTreeNodeOptions[];
    private _nzRolesCopy;
    nzRoleTreeVirtualHeight: string | null;
    /**
     * 好友分组
     */
    nzFriendGroups: NzSafeAny[];
    _nzFriendGroupsCopy: NzSafeAny[];
    /**
     * table组件，帮助文档: https://ng.yunzainfo.com/components/st/zh?#API
     */
    st: STComponent;
    /**
     * 联系人
     */
    defaultContacts: string[];
    nzContacts: NzSafeAny[];
    nzContactLoading: boolean;
    /**
     * 提交和提交按钮
     */
    button: boolean;
    readonly confirmed: EventEmitter<NzSafeAny[]>;
    constructor(contact: ContactService, changeDetectorRef: ChangeDetectorRef);
    /**
     * 初始化，首先加载部门树和默认选中的人的数据
     */
    ngOnInit(): void;
    /**
     * 视图初始化完毕后进行table初始化
     */
    ngAfterViewInit(): void;
    /**
     * 初始化默认选中联系人
     */
    onContactsInit(): void;
    /**
     * table初始化
     */
    onTableInit(): void;
    /**
     * tabset进入加载状态
     */
    onTabsetLoadStart(): void;
    /**
     * tabset取消加载状态
     */
    onTabsetLoadEnd(): void;
    /**
     * tabset搜索框清除
     */
    onTabsetSearchClean(): void;
    /**
     * tabset搜索框输入
     *
     * @param type 类型
     * @param value 值
     */
    onTabsetSearchChange(type: 'dept' | 'role' | 'friendGroup', value: string): void;
    /**
     * tabset切换到部门
     */
    onTabsetDept(): void;
    /**
     * tabset切换到角色
     */
    onTabsetRole(): void;
    /**
     * tabset切换到好友分组
     */
    onTabsetFriendGroup(): void;
    /**
     * 获取部门树
     */
    onTabsetDeptFlush(): void;
    onTabsetRoleFlush(groupRoleCode: string): void;
    onTabsetFriendGroupFlush(): void;
    /**
     * 部门树点击
     *
     * @param e 节点
     */
    onDeptClick(e: NzFormatEmitEvent): void;
    /**
     * 角色树点击
     *
     * @param e 节点
     */
    onRoleClick(e: NzFormatEmitEvent): void;
    /**
     * 好友分组点击
     *
     * @param e 分组
     */
    onFriendGroupClick(e: NzSafeAny): void;
    /**
     * 点击右侧联系人进行删除
     *
     * @param c 点击的联系人
     */
    onContactRemove(c: NzSafeAny): void;
    /**
     * 预处理table当前页数据，和nzContat对比，确定checkbox状态
     *
     * @param data 预处理数据
     */
    onTableCheck(data: NzSafeAny[]): void;
    /**
     * 递归树寻找name相同节点
     *
     * @param name 名称
     * @param trees 需要递归的树
     * @param list 搜索结果
     */
    searchTree(name: string, trees: NzTreeNodeOptions[], list: NzTreeNodeOptions[]): void;
    /**
     * 递归树展开所有有子节点的节点
     *
     * @param trees 需要展开的树
     */
    expandTree(trees: NzTreeNodeOptions[]): void;
    /**
     * 刷新当前页面
     */
    refresh(): void;
    /**
     * 确认按钮output数据
     */
    confirm(): void;
    /**
     * 销毁函数
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContactComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContactComponent, "contact", never, { "nzTabsetSearch": "nzTabsetSearch"; "nzTabsetLoading": "nzTabsetLoading"; "nzExpandAll": "nzExpandAll"; "nzDepts": "nzDepts"; "nzDeptTreeVirtualHeight": "nzDeptTreeVirtualHeight"; "nzDeptClass": "nzDeptClass"; "nzDeptClassHistory": "nzDeptClassHistory"; "nzDeptGrade": "nzDeptGrade"; "nzDeptGradeID": "nzDeptGradeID"; "nzRoles": "nzRoles"; "nzRoleTreeVirtualHeight": "nzRoleTreeVirtualHeight"; "nzFriendGroups": "nzFriendGroups"; "defaultContacts": "defaultContacts"; "nzContacts": "nzContacts"; "nzContactLoading": "nzContactLoading"; "button": "button"; }, { "confirmed": "confirmed"; }, never, never>;
}
