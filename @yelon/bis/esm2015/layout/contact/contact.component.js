import { ChangeDetectorRef, Component, Input, Optional, ViewChild, Output, EventEmitter } from '@angular/core';
import { ContactService } from './contact.service';
export class ContactComponent {
    constructor(contact, changeDetectorRef) {
        this.contact = contact;
        this.changeDetectorRef = changeDetectorRef;
        this.subs = [];
        /**
         * tabset
         */
        this.nzTabsetSearch = null;
        this.nzTabsetLoading = false;
        /**
         * 树展开状态
         */
        this.nzExpandAll = true;
        /**
         * 部门树和部门查询的一些选项/可传可不传
         */
        this.nzDepts = [];
        this._nzDeptsCopy = [];
        this.nzDeptTreeVirtualHeight = null;
        this.nzDeptClass = true;
        this.nzDeptClassHistory = true;
        this.nzDeptGrade = false;
        /**
         * 角色树
         */
        this.nzRoles = [];
        this._nzRolesCopy = [];
        this.nzRoleTreeVirtualHeight = null;
        /**
         * 好友分组
         */
        this.nzFriendGroups = [];
        this._nzFriendGroupsCopy = [];
        /**
         * 联系人
         */
        this.defaultContacts = [];
        this.nzContacts = [];
        this.nzContactLoading = false;
        /**
         * 提交和提交按钮
         */
        this.button = true;
        this.confirmed = new EventEmitter();
    }
    /**
     * 初始化，首先加载部门树和默认选中的人的数据
     */
    ngOnInit() {
        this.onTabsetDept();
        this.onContactsInit();
    }
    /**
     * 视图初始化完毕后进行table初始化
     */
    ngAfterViewInit() {
        this.onTableInit();
    }
    /**
     * 初始化默认选中联系人
     */
    onContactsInit() {
        if (this.defaultContacts && this.defaultContacts.length > 0) {
            this.nzContactLoading = true;
            this.subs.push(this.contact.getUserByUserIds(this.defaultContacts).subscribe(contacts => {
                this.nzContacts = contacts;
                this.nzContactLoading = false;
                this.refresh();
            }));
        }
    }
    /**
     * table初始化
     */
    onTableInit() {
        // 设置表头
        this.st.resetColumns({
            columns: [
                { title: '选择', type: 'checkbox' },
                { title: '序号', type: 'no' },
                { title: '姓名', index: 'realName' },
                { title: '学号/工号', index: 'userCode' },
                { title: '部门', index: 'dept.deptName' }
            ]
        });
        // 订阅table点击checkbox事件变化
        this.subs.push(this.st.change.subscribe(e => {
            if (e.type === 'checkbox') {
                // 点击checkbox新增联系人
                const contactIds = this.nzContacts.map(c => c.userId);
                this.nzContacts = this.nzContacts.concat(e.checkbox.filter(c => !contactIds.includes(c.userId)));
                // 取消checkbox取消联系人
                const cancelIds = this.st.list.filter(d => !d.checked).map(d => d.userId);
                this.nzContacts = this.nzContacts.filter(d => !cancelIds.includes(d.userId));
            }
        }));
    }
    /**
     * tabset进入加载状态
     */
    onTabsetLoadStart() {
        this.nzTabsetLoading = true;
    }
    /**
     * tabset取消加载状态
     */
    onTabsetLoadEnd() {
        this.nzTabsetLoading = false;
    }
    /**
     * tabset搜索框清除
     */
    onTabsetSearchClean() {
        this.nzDepts = this._nzDeptsCopy;
        this.nzRoles = this._nzRolesCopy;
        this.nzFriendGroups = this._nzFriendGroupsCopy;
        this.nzTabsetSearch = null;
    }
    /**
     * tabset搜索框输入
     *
     * @param type 类型
     * @param value 值
     */
    onTabsetSearchChange(type, value) {
        this.onTabsetLoadStart();
        if (!value || value === '') {
            this.nzDepts = this._nzDeptsCopy;
            this.nzRoles = this._nzRolesCopy;
            this.nzFriendGroups = this._nzFriendGroupsCopy;
        }
        else {
            const trees = [];
            if (type === 'dept') {
                this.searchTree(value, this._nzDeptsCopy, trees);
                this.nzDepts = trees;
            }
            if (type === 'role') {
                this.searchTree(value, this._nzRolesCopy, trees);
                this.nzRoles = trees;
            }
            if (type === 'friendGroup') {
                this.nzFriendGroups = this._nzFriendGroupsCopy.filter(f => {
                    return !f.name.indexOf(value);
                });
            }
        }
        this.onTabsetLoadEnd();
        this.refresh();
    }
    /**
     * tabset切换到部门
     */
    onTabsetDept() {
        this.onTabsetSearchClean();
        if (!this.nzDepts || this.nzDepts.length === 0) {
            this.onTabsetDeptFlush();
        }
    }
    /**
     * tabset切换到角色
     */
    onTabsetRole() {
        this.onTabsetSearchClean();
        if (!this.nzRoles || this.nzRoles.length === 0) {
            this.onTabsetRoleFlush(null);
        }
    }
    /**
     * tabset切换到好友分组
     */
    onTabsetFriendGroup() {
        this.onTabsetSearchClean();
        if (!this.nzFriendGroups || this.nzFriendGroups.length === 0) {
            this.onTabsetFriendGroupFlush();
        }
    }
    /**
     * 获取部门树
     */
    onTabsetDeptFlush() {
        this.onTabsetLoadStart();
        this.subs.push(this.contact
            .dept(this.nzDeptClass, this.nzDeptClassHistory, this.nzDeptGrade, this.nzDeptGradeID)
            .subscribe((trees) => {
            this.expandTree(trees);
            this.nzDepts = trees;
            this._nzDeptsCopy = trees;
            this.onTabsetLoadEnd();
            this.refresh();
        }));
    }
    // 获取角色树
    onTabsetRoleFlush(groupRoleCode) {
        this.onTabsetLoadStart();
        this.subs.push(this.contact.getGroupRole(groupRoleCode).subscribe((roles) => {
            this.expandTree(roles);
            this.nzRoles = roles;
            this._nzRolesCopy = roles;
            this.onTabsetLoadEnd();
            this.refresh();
        }));
    }
    // 获取好友分组列表
    onTabsetFriendGroupFlush() {
        this.onTabsetLoadStart();
        this.subs.push(this.contact.getFriendGroup().subscribe((group) => {
            this.nzFriendGroups = group;
            this._nzFriendGroupsCopy = group;
            this.onTabsetLoadEnd();
            this.refresh();
        }));
    }
    /**
     * 部门树点击
     *
     * @param e 节点
     */
    onDeptClick(e) {
        var _a;
        // 构造分页请求，直接传入stTable组件，剩下的所有交给组件自己完成
        this.st.data = '/auth/baseUser/queryListForPage';
        this.st.req = {
            allInBody: true,
            method: 'POST',
            type: 'page',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            body: {
                pageParam: {
                    deptId: (_a = e.keys) === null || _a === void 0 ? void 0 : _a.pop()
                }
            }
        };
        // table数据预处理
        this.st.res = {
            process: data => {
                this.onTableCheck(data);
                return data;
            }
        };
        // 加载第一页
        this.st.load(1);
    }
    /**
     * 角色树点击
     *
     * @param e 节点
     */
    onRoleClick(e) {
        var _a;
        // 构造分页请求，直接传入stTable组件，剩下的所有交给组件自己完成
        this.st.data = '/auth/baseUser/queryListForPage';
        this.st.req = {
            allInBody: true,
            method: 'POST',
            type: 'page',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            body: {
                pageParam: {
                    roleId: (_a = e.keys) === null || _a === void 0 ? void 0 : _a.pop()
                }
            }
        };
        // table数据预处理
        this.st.res = {
            process: data => {
                this.onTableCheck(data);
                return data;
            }
        };
        // 加载第一页
        this.st.load(1);
    }
    /**
     * 好友分组点击
     *
     * @param e 分组
     */
    onFriendGroupClick(e) {
        // 构造分页请求，直接传入stTable组件，剩下的所有交给组件自己完成
        this.st.data = '/auth/baseUser/queryListForPage';
        this.st.req = {
            allInBody: true,
            method: 'POST',
            type: 'page',
            reName: {
                pi: 'pageNum',
                ps: 'pageSize'
            },
            body: {
                pageParam: {
                    friendGroupId: e.id
                }
            }
        };
        // table数据预处理
        this.st.res = {
            process: data => {
                this.onTableCheck(data);
                return data;
            }
        };
        // 加载第一页
        this.st.load(1);
    }
    /**
     * 点击右侧联系人进行删除
     *
     * @param c 点击的联系人
     */
    onContactRemove(c) {
        this.nzContacts = this.nzContacts.filter(contact => {
            return contact.userId != c.userId;
        });
        this.st.reload();
    }
    /**
     * 预处理table当前页数据，和nzContat对比，确定checkbox状态
     *
     * @param data 预处理数据
     */
    onTableCheck(data) {
        const ids = this.nzContacts.map(u => u.userId);
        data.forEach(d => {
            if (ids.includes(d.userId)) {
                d.checked = true;
            }
            else {
                d.checked = false;
            }
        });
    }
    /**
     * 递归树寻找name相同节点
     *
     * @param name 名称
     * @param trees 需要递归的树
     * @param list 搜索结果
     */
    searchTree(name, trees, list) {
        if (trees && trees.length && trees.length > 0) {
            trees.forEach((tree) => {
                if (tree.title.indexOf(name) != -1) {
                    list.push(tree);
                }
                if (tree.children) {
                    this.searchTree(name, tree.children, list);
                }
            });
        }
    }
    /**
     * 递归树展开所有有子节点的节点
     *
     * @param trees 需要展开的树
     */
    expandTree(trees) {
        if (trees && trees.length && trees.length > 0) {
            trees.forEach(tree => {
                if (!tree.children || tree.children.length === 0) {
                    tree.expanded = false;
                    tree.isLeaf = true;
                }
                if (tree.children) {
                    tree.expanded = this.nzExpandAll;
                    tree.isLeaf = false;
                    this.expandTree(tree.children);
                }
            });
        }
    }
    /**
     * 刷新当前页面
     */
    refresh() {
        this.changeDetectorRef.detectChanges();
    }
    /**
     * 确认按钮output数据
     */
    confirm() {
        this.confirmed.next(this.nzContacts);
    }
    /**
     * 销毁函数
     */
    ngOnDestroy() {
        this.nzDepts = [];
        this.nzRoles = [];
        this.nzContacts = [];
        this.subs.forEach(s => s.unsubscribe());
    }
}
ContactComponent.decorators = [
    { type: Component, args: [{
                selector: 'contact',
                template: "<nz-row [nzGutter]=\"16\">\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"8\" [nzXl]=\"6\" [nzXXl]=\"6\">\n    <nz-tabset nzCentered>\n      <nz-tab nzTitle=\"\u90E8\u95E8\" (nzSelect)=\"onTabsetDept()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('dept', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onDeptClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzDeptTreeVirtualHeight\"\n                [nzData]=\"nzDepts\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u89D2\u8272\" (nzSelect)=\"onTabsetRole()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('role', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onRoleClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzRoleTreeVirtualHeight\"\n                [nzData]=\"nzRoles\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u597D\u53CB\" (nzSelect)=\"onTabsetFriendGroup()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('friendGroup', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u597D\u53CB\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-list class=\"nz-tabset-content\" nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n                <nz-list-item\n                  class=\"nz-tabset-content-item\"\n                  *ngFor=\"let group of nzFriendGroups\"\n                  (click)=\"onFriendGroupClick(group)\"\n                >\n                  <nz-list-item-meta>\n                    <nz-list-item-meta-title>\n                      {{ group.name }}\n                    </nz-list-item-meta-title>\n                  </nz-list-item-meta>\n                </nz-list-item>\n              </nz-list>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n    </nz-tabset>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"16\" [nzXl]=\"13\" [nzXXl]=\"13\">\n    <st #st responsiveHideHeaderFooter></st>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"24\" [nzXl]=\"5\" [nzXXl]=\"5\">\n    <nz-spin [nzSpinning]=\"nzContactLoading\">\n      <nz-list nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n        <nz-list-item\n          class=\"nz-tabset-content-item\"\n          *ngFor=\"let contact of nzContacts\"\n          (click)=\"onContactRemove(contact)\"\n        >\n          <nz-list-item-meta>\n            <nz-list-item-meta-title>\n              {{ contact.realName }}\n            </nz-list-item-meta-title>\n          </nz-list-item-meta>\n        </nz-list-item>\n      </nz-list>\n    </nz-spin>\n  </nz-col>\n</nz-row>\n\n<nz-row *ngIf=\"button\">\n  <nz-col [nzSpan]=\"4\" [nzOffset]=\"20\">\n    <button nz-button nzType=\"primary\" (click)=\"confirm()\">\u786E\u5B9A</button>\n  </nz-col>\n</nz-row>\n\n<ng-template #searchInputTpl>\n  <i nz-icon nzType=\"close\" nzTheme=\"outline\" *ngIf=\"nzTabsetSearch\" (click)=\"onTabsetSearchClean()\"></i>\n  <i nz-icon nzType=\"search\" nzTheme=\"outline\" *ngIf=\"!nzTabsetSearch\"></i>\n</ng-template>\n",
                styles: [".nz-tabset-input{width:100%}.nz-tabset-content{padding:20px}.nz-tabset-sg{padding-right:38px!important;padding-left:38px!important}.nz-tabset-content-item:hover{background-color:#f1f1f1;cursor:pointer}\n"]
            },] }
];
ContactComponent.ctorParameters = () => [
    { type: ContactService },
    { type: ChangeDetectorRef }
];
ContactComponent.propDecorators = {
    nzTabsetSearch: [{ type: Optional }, { type: Input }],
    nzTabsetLoading: [{ type: Optional }, { type: Input }],
    nzExpandAll: [{ type: Optional }, { type: Input }],
    nzDepts: [{ type: Optional }, { type: Input }],
    nzDeptTreeVirtualHeight: [{ type: Optional }, { type: Input }],
    nzDeptClass: [{ type: Optional }, { type: Input }],
    nzDeptClassHistory: [{ type: Optional }, { type: Input }],
    nzDeptGrade: [{ type: Optional }, { type: Input }],
    nzDeptGradeID: [{ type: Optional }, { type: Input }],
    nzRoles: [{ type: Optional }, { type: Input }],
    nzRoleTreeVirtualHeight: [{ type: Optional }, { type: Input }],
    nzFriendGroups: [{ type: Optional }, { type: Input }],
    st: [{ type: ViewChild, args: ['st', { static: false },] }],
    defaultContacts: [{ type: Optional }, { type: Input }],
    nzContacts: [{ type: Optional }, { type: Input }],
    nzContactLoading: [{ type: Optional }, { type: Input }],
    button: [{ type: Optional }, { type: Input }],
    confirmed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQUlMLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQVF2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPbkQsTUFBTSxPQUFPLGdCQUFnQjtJQXdEM0IsWUFBb0IsT0FBdUIsRUFBVSxpQkFBb0M7UUFBckUsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkR6RixTQUFJLEdBQW1CLEVBQUUsQ0FBQztRQUUxQjs7V0FFRztRQUNrQixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDckMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFdEQ7O1dBRUc7UUFDa0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFakQ7O1dBRUc7UUFDa0IsWUFBTyxHQUF3QixFQUFFLENBQUM7UUFDL0MsaUJBQVksR0FBd0IsRUFBRSxDQUFDO1FBQzFCLDRCQUF1QixHQUFrQixJQUFJLENBQUM7UUFDOUMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBQ25DLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBR2xEOztXQUVHO1FBQ2tCLFlBQU8sR0FBd0IsRUFBRSxDQUFDO1FBQy9DLGlCQUFZLEdBQXdCLEVBQUUsQ0FBQztRQUMxQiw0QkFBdUIsR0FBa0IsSUFBSSxDQUFDO1FBRW5FOztXQUVHO1FBQ2tCLG1CQUFjLEdBQWdCLEVBQUUsQ0FBQztRQUN0RCx3QkFBbUIsR0FBZ0IsRUFBRSxDQUFDO1FB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aGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelRyZWVOb2RlT3B0aW9ucywgTnpGb3JtYXRFbWl0RXZlbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3RyZWUnO1xuXG5pbXBvcnQgeyBTVENvbXBvbmVudCB9IGZyb20gJ0B5ZWxvbi9hYmMvc3QnO1xuXG5pbXBvcnQgeyBDb250YWN0U2VydmljZSB9IGZyb20gJy4vY29udGFjdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29udGFjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250YWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGFjdC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbnRhY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqXG4gICAqIHRhYnNldFxuICAgKi9cbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgbnpUYWJzZXRTZWFyY2g6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuelRhYnNldExvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICog5qCR5bGV5byA54q25oCBXG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekV4cGFuZEFsbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIOmDqOmXqOagkeWSjOmDqOmXqOafpeivoueahOS4gOS6m+mAiemhuS/lj6/kvKDlj6/kuI3kvKBcbiAgICovXG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56RGVwdHM6IE56VHJlZU5vZGVPcHRpb25zW10gPSBbXTtcbiAgcHJpdmF0ZSBfbnpEZXB0c0NvcHk6IE56VHJlZU5vZGVPcHRpb25zW10gPSBbXTtcbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgbnpEZXB0VHJlZVZpcnR1YWxIZWlnaHQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekRlcHRDbGFzczogYm9vbGVhbiA9IHRydWU7XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56RGVwdENsYXNzSGlzdG9yeTogYm9vbGVhbiA9IHRydWU7XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56RGVwdEdyYWRlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56RGVwdEdyYWRlSUQ6IHN0cmluZztcblxuICAvKipcbiAgICog6KeS6Imy5qCRXG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuelJvbGVzOiBOelRyZWVOb2RlT3B0aW9uc1tdID0gW107XG4gIHByaXZhdGUgX256Um9sZXNDb3B5OiBOelRyZWVOb2RlT3B0aW9uc1tdID0gW107XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56Um9sZVRyZWVWaXJ0dWFsSGVpZ2h0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICog5aW95Y+L5YiG57uEXG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekZyaWVuZEdyb3VwczogTnpTYWZlQW55W10gPSBbXTtcbiAgX256RnJpZW5kR3JvdXBzQ29weTogTnpTYWZlQW55W10gPSBbXTtcblxuICAvKipcbiAgICogdGFibGXnu4Tku7bvvIzluK7liqnmlofmoaM6IGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9jb21wb25lbnRzL3N0L3poPyNBUElcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3N0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHN0OiBTVENvbXBvbmVudDtcblxuICAvKipcbiAgICog6IGU57O75Lq6XG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBkZWZhdWx0Q29udGFjdHM6IHN0cmluZ1tdID0gW107XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56Q29udGFjdHM6IE56U2FmZUFueVtdID0gW107XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56Q29udGFjdExvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICog5o+Q5Lqk5ZKM5o+Q5Lqk5oyJ6ZKuXG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBidXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY29uZmlybWVkOiBFdmVudEVtaXR0ZXI8TnpTYWZlQW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFjdDogQ29udGFjdFNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJbvvIzpppblhYjliqDovb3pg6jpl6jmoJHlkozpu5jorqTpgInkuK3nmoTkurrnmoTmlbDmja5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMub25UYWJzZXREZXB0KCk7XG4gICAgdGhpcy5vbkNvbnRhY3RzSW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOinhuWbvuWIneWni+WMluWujOavleWQjui/m+ihjHRhYmxl5Yid5aeL5YyWXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYmxlSW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMlum7mOiupOmAieS4reiBlOezu+S6ulxuICAgKi9cbiAgb25Db250YWN0c0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVmYXVsdENvbnRhY3RzICYmIHRoaXMuZGVmYXVsdENvbnRhY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubnpDb250YWN0TG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgICAgdGhpcy5jb250YWN0LmdldFVzZXJCeVVzZXJJZHModGhpcy5kZWZhdWx0Q29udGFjdHMpLnN1YnNjcmliZShjb250YWN0cyA9PiB7XG4gICAgICAgICAgdGhpcy5uekNvbnRhY3RzID0gY29udGFjdHM7XG4gICAgICAgICAgdGhpcy5uekNvbnRhY3RMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0YWJsZeWIneWni+WMllxuICAgKi9cbiAgb25UYWJsZUluaXQoKTogdm9pZCB7XG4gICAgLy8g6K6+572u6KGo5aS0XG4gICAgdGhpcy5zdC5yZXNldENvbHVtbnMoe1xuICAgICAgY29sdW1uczogW1xuICAgICAgICB7IHRpdGxlOiAn6YCJ5oupJywgdHlwZTogJ2NoZWNrYm94JyB9LFxuICAgICAgICB7IHRpdGxlOiAn5bqP5Y+3JywgdHlwZTogJ25vJyB9LFxuICAgICAgICB7IHRpdGxlOiAn5aeT5ZCNJywgaW5kZXg6ICdyZWFsTmFtZScgfSxcbiAgICAgICAgeyB0aXRsZTogJ+WtpuWPty/lt6Xlj7cnLCBpbmRleDogJ3VzZXJDb2RlJyB9LFxuICAgICAgICB7IHRpdGxlOiAn6YOo6ZeoJywgaW5kZXg6ICdkZXB0LmRlcHROYW1lJyB9XG4gICAgICBdXG4gICAgfSk7XG4gICAgLy8g6K6i6ZiFdGFibGXngrnlh7tjaGVja2JveOS6i+S7tuWPmOWMllxuICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgdGhpcy5zdC5jaGFuZ2Uuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICBpZiAoZS50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgLy8g54K55Ye7Y2hlY2tib3jmlrDlop7ogZTns7vkurpcbiAgICAgICAgICBjb25zdCBjb250YWN0SWRzID0gdGhpcy5uekNvbnRhY3RzLm1hcChjID0+IGMudXNlcklkKTtcbiAgICAgICAgICB0aGlzLm56Q29udGFjdHMgPSB0aGlzLm56Q29udGFjdHMuY29uY2F0KGUuY2hlY2tib3ghLmZpbHRlcihjID0+ICFjb250YWN0SWRzLmluY2x1ZGVzKGMudXNlcklkKSkpO1xuICAgICAgICAgIC8vIOWPlua2iGNoZWNrYm945Y+W5raI6IGU57O75Lq6XG4gICAgICAgICAgY29uc3QgY2FuY2VsSWRzID0gdGhpcy5zdC5saXN0LmZpbHRlcihkID0+ICFkLmNoZWNrZWQpLm1hcChkID0+IGQudXNlcklkKTtcbiAgICAgICAgICB0aGlzLm56Q29udGFjdHMgPSB0aGlzLm56Q29udGFjdHMuZmlsdGVyKGQgPT4gIWNhbmNlbElkcy5pbmNsdWRlcyhkLnVzZXJJZCkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdGFic2V06L+b5YWl5Yqg6L2954q25oCBXG4gICAqL1xuICBvblRhYnNldExvYWRTdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLm56VGFic2V0TG9hZGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogdGFic2V05Y+W5raI5Yqg6L2954q25oCBXG4gICAqL1xuICBvblRhYnNldExvYWRFbmQoKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYnNldExvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0YWJzZXTmkJzntKLmoYbmuIXpmaRcbiAgICovXG4gIG9uVGFic2V0U2VhcmNoQ2xlYW4oKTogdm9pZCB7XG4gICAgdGhpcy5uekRlcHRzID0gdGhpcy5fbnpEZXB0c0NvcHk7XG4gICAgdGhpcy5uelJvbGVzID0gdGhpcy5fbnpSb2xlc0NvcHk7XG4gICAgdGhpcy5uekZyaWVuZEdyb3VwcyA9IHRoaXMuX256RnJpZW5kR3JvdXBzQ29weTtcbiAgICB0aGlzLm56VGFic2V0U2VhcmNoID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiB0YWJzZXTmkJzntKLmoYbovpPlhaVcbiAgICpcbiAgICogQHBhcmFtIHR5cGUg57G75Z6LXG4gICAqIEBwYXJhbSB2YWx1ZSDlgLxcbiAgICovXG4gIG9uVGFic2V0U2VhcmNoQ2hhbmdlKHR5cGU6ICdkZXB0JyB8ICdyb2xlJyB8ICdmcmllbmRHcm91cCcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm9uVGFic2V0TG9hZFN0YXJ0KCk7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMubnpEZXB0cyA9IHRoaXMuX256RGVwdHNDb3B5O1xuICAgICAgdGhpcy5uelJvbGVzID0gdGhpcy5fbnpSb2xlc0NvcHk7XG4gICAgICB0aGlzLm56RnJpZW5kR3JvdXBzID0gdGhpcy5fbnpGcmllbmRHcm91cHNDb3B5O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0cmVlczogTnpUcmVlTm9kZU9wdGlvbnNbXSA9IFtdO1xuICAgICAgaWYgKHR5cGUgPT09ICdkZXB0Jykge1xuICAgICAgICB0aGlzLnNlYXJjaFRyZWUodmFsdWUsIHRoaXMuX256RGVwdHNDb3B5LCB0cmVlcyk7XG4gICAgICAgIHRoaXMubnpEZXB0cyA9IHRyZWVzO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdyb2xlJykge1xuICAgICAgICB0aGlzLnNlYXJjaFRyZWUodmFsdWUsIHRoaXMuX256Um9sZXNDb3B5LCB0cmVlcyk7XG4gICAgICAgIHRoaXMubnpSb2xlcyA9IHRyZWVzO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdmcmllbmRHcm91cCcpIHtcbiAgICAgICAgdGhpcy5uekZyaWVuZEdyb3VwcyA9IHRoaXMuX256RnJpZW5kR3JvdXBzQ29weS5maWx0ZXIoZiA9PiB7XG4gICAgICAgICAgcmV0dXJuICFmLm5hbWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uVGFic2V0TG9hZEVuZCgpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRhYnNldOWIh+aNouWIsOmDqOmXqFxuICAgKi9cbiAgb25UYWJzZXREZXB0KCk6IHZvaWQge1xuICAgIHRoaXMub25UYWJzZXRTZWFyY2hDbGVhbigpO1xuICAgIGlmICghdGhpcy5uekRlcHRzIHx8IHRoaXMubnpEZXB0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMub25UYWJzZXREZXB0Rmx1c2goKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGFic2V05YiH5o2i5Yiw6KeS6ImyXG4gICAqL1xuICBvblRhYnNldFJvbGUoKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYnNldFNlYXJjaENsZWFuKCk7XG4gICAgaWYgKCF0aGlzLm56Um9sZXMgfHwgdGhpcy5uelJvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5vblRhYnNldFJvbGVGbHVzaChudWxsIGFzIE56U2FmZUFueSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRhYnNldOWIh+aNouWIsOWlveWPi+WIhue7hFxuICAgKi9cbiAgb25UYWJzZXRGcmllbmRHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uVGFic2V0U2VhcmNoQ2xlYW4oKTtcbiAgICBpZiAoIXRoaXMubnpGcmllbmRHcm91cHMgfHwgdGhpcy5uekZyaWVuZEdyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMub25UYWJzZXRGcmllbmRHcm91cEZsdXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPlumDqOmXqOagkVxuICAgKi9cbiAgb25UYWJzZXREZXB0Rmx1c2goKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYnNldExvYWRTdGFydCgpO1xuICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgdGhpcy5jb250YWN0XG4gICAgICAgIC5kZXB0KHRoaXMubnpEZXB0Q2xhc3MsIHRoaXMubnpEZXB0Q2xhc3NIaXN0b3J5LCB0aGlzLm56RGVwdEdyYWRlLCB0aGlzLm56RGVwdEdyYWRlSUQpXG4gICAgICAgIC5zdWJzY3JpYmUoKHRyZWVzOiBOelRyZWVOb2RlT3B0aW9uc1tdKSA9PiB7XG4gICAgICAgICAgdGhpcy5leHBhbmRUcmVlKHRyZWVzKTtcbiAgICAgICAgICB0aGlzLm56RGVwdHMgPSB0cmVlcztcbiAgICAgICAgICB0aGlzLl9uekRlcHRzQ29weSA9IHRyZWVzO1xuICAgICAgICAgIHRoaXMub25UYWJzZXRMb2FkRW5kKCk7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIOiOt+WPluinkuiJsuagkVxuICBvblRhYnNldFJvbGVGbHVzaChncm91cFJvbGVDb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm9uVGFic2V0TG9hZFN0YXJ0KCk7XG4gICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICB0aGlzLmNvbnRhY3QuZ2V0R3JvdXBSb2xlKGdyb3VwUm9sZUNvZGUpLnN1YnNjcmliZSgocm9sZXM6IE56VHJlZU5vZGVPcHRpb25zW10pID0+IHtcbiAgICAgICAgdGhpcy5leHBhbmRUcmVlKHJvbGVzKTtcbiAgICAgICAgdGhpcy5uelJvbGVzID0gcm9sZXM7XG4gICAgICAgIHRoaXMuX256Um9sZXNDb3B5ID0gcm9sZXM7XG4gICAgICAgIHRoaXMub25UYWJzZXRMb2FkRW5kKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8g6I635Y+W5aW95Y+L5YiG57uE5YiX6KGoXG4gIG9uVGFic2V0RnJpZW5kR3JvdXBGbHVzaCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uVGFic2V0TG9hZFN0YXJ0KCk7XG4gICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICB0aGlzLmNvbnRhY3QuZ2V0RnJpZW5kR3JvdXAoKS5zdWJzY3JpYmUoKGdyb3VwOiBOelNhZmVBbnlbXSkgPT4ge1xuICAgICAgICB0aGlzLm56RnJpZW5kR3JvdXBzID0gZ3JvdXA7XG4gICAgICAgIHRoaXMuX256RnJpZW5kR3JvdXBzQ29weSA9IGdyb3VwO1xuICAgICAgICB0aGlzLm9uVGFic2V0TG9hZEVuZCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDpg6jpl6jmoJHngrnlh7tcbiAgICpcbiAgICogQHBhcmFtIGUg6IqC54K5XG4gICAqL1xuICBvbkRlcHRDbGljayhlOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIC8vIOaehOmAoOWIhumhteivt+axgu+8jOebtOaOpeS8oOWFpXN0VGFibGXnu4Tku7bvvIzliankuIvnmoTmiYDmnInkuqTnu5nnu4Tku7boh6rlt7HlrozmiJBcbiAgICB0aGlzLnN0LmRhdGEgPSAnL2F1dGgvYmFzZVVzZXIvcXVlcnlMaXN0Rm9yUGFnZSc7XG4gICAgdGhpcy5zdC5yZXEgPSB7XG4gICAgICBhbGxJbkJvZHk6IHRydWUsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHR5cGU6ICdwYWdlJyxcbiAgICAgIHJlTmFtZToge1xuICAgICAgICBwaTogJ3BhZ2VOdW0nLFxuICAgICAgICBwczogJ3BhZ2VTaXplJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFnZVBhcmFtOiB7XG4gICAgICAgICAgZGVwdElkOiBlLmtleXM/LnBvcCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIHRhYmxl5pWw5o2u6aKE5aSE55CGXG4gICAgdGhpcy5zdC5yZXMgPSB7XG4gICAgICBwcm9jZXNzOiBkYXRhID0+IHtcbiAgICAgICAgdGhpcy5vblRhYmxlQ2hlY2soZGF0YSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8g5Yqg6L2956ys5LiA6aG1XG4gICAgdGhpcy5zdC5sb2FkKDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIOinkuiJsuagkeeCueWHu1xuICAgKlxuICAgKiBAcGFyYW0gZSDoioLngrlcbiAgICovXG4gIG9uUm9sZUNsaWNrKGU6IE56Rm9ybWF0RW1pdEV2ZW50KTogdm9pZCB7XG4gICAgLy8g5p6E6YCg5YiG6aG16K+35rGC77yM55u05o6l5Lyg5YWlc3RUYWJsZee7hOS7tu+8jOWJqeS4i+eahOaJgOacieS6pOe7mee7hOS7tuiHquW3seWujOaIkFxuICAgIHRoaXMuc3QuZGF0YSA9ICcvYXV0aC9iYXNlVXNlci9xdWVyeUxpc3RGb3JQYWdlJztcbiAgICB0aGlzLnN0LnJlcSA9IHtcbiAgICAgIGFsbEluQm9keTogdHJ1ZSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdHlwZTogJ3BhZ2UnLFxuICAgICAgcmVOYW1lOiB7XG4gICAgICAgIHBpOiAncGFnZU51bScsXG4gICAgICAgIHBzOiAncGFnZVNpemUnXG4gICAgICB9LFxuICAgICAgYm9keToge1xuICAgICAgICBwYWdlUGFyYW06IHtcbiAgICAgICAgICByb2xlSWQ6IGUua2V5cz8ucG9wKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgLy8gdGFibGXmlbDmja7pooTlpITnkIZcbiAgICB0aGlzLnN0LnJlcyA9IHtcbiAgICAgIHByb2Nlc3M6IGRhdGEgPT4ge1xuICAgICAgICB0aGlzLm9uVGFibGVDaGVjayhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyDliqDovb3nrKzkuIDpobVcbiAgICB0aGlzLnN0LmxvYWQoMSk7XG4gIH1cblxuICAvKipcbiAgICog5aW95Y+L5YiG57uE54K55Ye7XG4gICAqXG4gICAqIEBwYXJhbSBlIOWIhue7hFxuICAgKi9cbiAgb25GcmllbmRHcm91cENsaWNrKGU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIC8vIOaehOmAoOWIhumhteivt+axgu+8jOebtOaOpeS8oOWFpXN0VGFibGXnu4Tku7bvvIzliankuIvnmoTmiYDmnInkuqTnu5nnu4Tku7boh6rlt7HlrozmiJBcbiAgICB0aGlzLnN0LmRhdGEgPSAnL2F1dGgvYmFzZVVzZXIvcXVlcnlMaXN0Rm9yUGFnZSc7XG4gICAgdGhpcy5zdC5yZXEgPSB7XG4gICAgICBhbGxJbkJvZHk6IHRydWUsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHR5cGU6ICdwYWdlJyxcbiAgICAgIHJlTmFtZToge1xuICAgICAgICBwaTogJ3BhZ2VOdW0nLFxuICAgICAgICBwczogJ3BhZ2VTaXplJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFnZVBhcmFtOiB7XG4gICAgICAgICAgZnJpZW5kR3JvdXBJZDogZS5pZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyB0YWJsZeaVsOaNrumihOWkhOeQhlxuICAgIHRoaXMuc3QucmVzID0ge1xuICAgICAgcHJvY2VzczogZGF0YSA9PiB7XG4gICAgICAgIHRoaXMub25UYWJsZUNoZWNrKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIOWKoOi9veesrOS4gOmhtVxuICAgIHRoaXMuc3QubG9hZCgxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDngrnlh7vlj7PkvqfogZTns7vkurrov5vooYzliKDpmaRcbiAgICpcbiAgICogQHBhcmFtIGMg54K55Ye755qE6IGU57O75Lq6XG4gICAqL1xuICBvbkNvbnRhY3RSZW1vdmUoYzogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgdGhpcy5uekNvbnRhY3RzID0gdGhpcy5uekNvbnRhY3RzLmZpbHRlcihjb250YWN0ID0+IHtcbiAgICAgIHJldHVybiBjb250YWN0LnVzZXJJZCAhPSBjLnVzZXJJZDtcbiAgICB9KTtcbiAgICB0aGlzLnN0LnJlbG9hZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOmihOWkhOeQhnRhYmxl5b2T5YmN6aG15pWw5o2u77yM5ZKMbnpDb250YXTlr7nmr5TvvIznoa7lrppjaGVja2JveOeKtuaAgVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSDpooTlpITnkIbmlbDmja5cbiAgICovXG4gIG9uVGFibGVDaGVjayhkYXRhOiBOelNhZmVBbnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IGlkcyA9IHRoaXMubnpDb250YWN0cy5tYXAodSA9PiB1LnVzZXJJZCk7XG4gICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgICAgaWYgKGlkcy5pbmNsdWRlcyhkLnVzZXJJZCkpIHtcbiAgICAgICAgZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOmAkuW9kuagkeWvu+aJvm5hbWXnm7jlkIzoioLngrlcbiAgICpcbiAgICogQHBhcmFtIG5hbWUg5ZCN56ewXG4gICAqIEBwYXJhbSB0cmVlcyDpnIDopoHpgJLlvZLnmoTmoJFcbiAgICogQHBhcmFtIGxpc3Qg5pCc57Si57uT5p6cXG4gICAqL1xuICBzZWFyY2hUcmVlKG5hbWU6IHN0cmluZywgdHJlZXM6IE56VHJlZU5vZGVPcHRpb25zW10sIGxpc3Q6IE56VHJlZU5vZGVPcHRpb25zW10pOiB2b2lkIHtcbiAgICBpZiAodHJlZXMgJiYgdHJlZXMubGVuZ3RoICYmIHRyZWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyZWVzLmZvckVhY2goKHRyZWU6IE56VHJlZU5vZGVPcHRpb25zKSA9PiB7XG4gICAgICAgIGlmICh0cmVlLnRpdGxlLmluZGV4T2YobmFtZSkgIT0gLTEpIHtcbiAgICAgICAgICBsaXN0LnB1c2godHJlZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyZWUuY2hpbGRyZW4pIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFRyZWUobmFtZSwgdHJlZS5jaGlsZHJlbiwgbGlzdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDpgJLlvZLmoJHlsZXlvIDmiYDmnInmnInlrZDoioLngrnnmoToioLngrlcbiAgICpcbiAgICogQHBhcmFtIHRyZWVzIOmcgOimgeWxleW8gOeahOagkVxuICAgKi9cbiAgZXhwYW5kVHJlZSh0cmVlczogTnpUcmVlTm9kZU9wdGlvbnNbXSk6IHZvaWQge1xuICAgIGlmICh0cmVlcyAmJiB0cmVlcy5sZW5ndGggJiYgdHJlZXMubGVuZ3RoID4gMCkge1xuICAgICAgdHJlZXMuZm9yRWFjaCh0cmVlID0+IHtcbiAgICAgICAgaWYgKCF0cmVlLmNoaWxkcmVuIHx8IHRyZWUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdHJlZS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgIHRyZWUuaXNMZWFmID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJlZS5jaGlsZHJlbikge1xuICAgICAgICAgIHRyZWUuZXhwYW5kZWQgPSB0aGlzLm56RXhwYW5kQWxsO1xuICAgICAgICAgIHRyZWUuaXNMZWFmID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leHBhbmRUcmVlKHRyZWUuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Yi35paw5b2T5YmN6aG16Z2iXG4gICAqL1xuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIOehruiupOaMiemSrm91dHB1dOaVsOaNrlxuICAgKi9cbiAgY29uZmlybSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1lZC5uZXh0KHRoaXMubnpDb250YWN0cyk7XG4gIH1cblxuICAvKipcbiAgICog6ZSA5q+B5Ye95pWwXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm56RGVwdHMgPSBbXTtcbiAgICB0aGlzLm56Um9sZXMgPSBbXTtcbiAgICB0aGlzLm56Q29udGFjdHMgPSBbXTtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==