import { Component, Input, Optional, ViewChild, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./contact.service";
import * as i2 from "ng-zorro-antd/tabs";
import * as i3 from "@yelon/abc/sg";
import * as i4 from "ng-zorro-antd/input";
import * as i5 from "ng-zorro-antd/spin";
import * as i6 from "ng-zorro-antd/tree";
import * as i7 from "ng-zorro-antd/list";
import * as i8 from "@yelon/abc/st";
import * as i9 from "ng-zorro-antd/button";
import * as i10 from "ng-zorro-antd/grid";
import * as i11 from "ng-zorro-antd/core/transition-patch";
import * as i12 from "@angular/forms";
import * as i13 from "@angular/common";
import * as i14 from "ng-zorro-antd/core/wave";
import * as i15 from "ng-zorro-antd/icon";
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
        this.nzDeptGradeID = null;
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
                    deptId: e.keys?.pop()
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
                    roleId: e.keys?.pop()
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
ContactComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ContactComponent, deps: [{ token: i1.ContactService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ContactComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: ContactComponent, selector: "contact", inputs: { nzTabsetSearch: "nzTabsetSearch", nzTabsetLoading: "nzTabsetLoading", nzExpandAll: "nzExpandAll", nzDepts: "nzDepts", nzDeptTreeVirtualHeight: "nzDeptTreeVirtualHeight", nzDeptClass: "nzDeptClass", nzDeptClassHistory: "nzDeptClassHistory", nzDeptGrade: "nzDeptGrade", nzDeptGradeID: "nzDeptGradeID", nzRoles: "nzRoles", nzRoleTreeVirtualHeight: "nzRoleTreeVirtualHeight", nzFriendGroups: "nzFriendGroups", defaultContacts: "defaultContacts", nzContacts: "nzContacts", nzContactLoading: "nzContactLoading", button: "button" }, outputs: { confirmed: "confirmed" }, viewQueries: [{ propertyName: "st", first: true, predicate: ["st"], descendants: true }], ngImport: i0, template: "<nz-row [nzGutter]=\"16\">\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"8\" [nzXl]=\"6\" [nzXXl]=\"6\">\n    <nz-tabset nzCentered>\n      <nz-tab nzTitle=\"\u90E8\u95E8\" (nzSelect)=\"onTabsetDept()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('dept', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onDeptClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzDeptTreeVirtualHeight\"\n                [nzData]=\"nzDepts\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u89D2\u8272\" (nzSelect)=\"onTabsetRole()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('role', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onRoleClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzRoleTreeVirtualHeight\"\n                [nzData]=\"nzRoles\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u597D\u53CB\" (nzSelect)=\"onTabsetFriendGroup()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('friendGroup', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u597D\u53CB\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-list class=\"nz-tabset-content\" nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n                <nz-list-item\n                  class=\"nz-tabset-content-item\"\n                  *ngFor=\"let group of nzFriendGroups\"\n                  (click)=\"onFriendGroupClick(group)\"\n                >\n                  <nz-list-item-meta>\n                    <nz-list-item-meta-title>\n                      {{ group.name }}\n                    </nz-list-item-meta-title>\n                  </nz-list-item-meta>\n                </nz-list-item>\n              </nz-list>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n    </nz-tabset>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"16\" [nzXl]=\"13\" [nzXXl]=\"13\">\n    <st #st responsiveHideHeaderFooter></st>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"24\" [nzXl]=\"5\" [nzXXl]=\"5\">\n    <nz-spin [nzSpinning]=\"nzContactLoading\">\n      <nz-list nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n        <nz-list-item\n          class=\"nz-tabset-content-item\"\n          *ngFor=\"let contact of nzContacts\"\n          (click)=\"onContactRemove(contact)\"\n        >\n          <nz-list-item-meta>\n            <nz-list-item-meta-title>\n              {{ contact.realName }}\n            </nz-list-item-meta-title>\n          </nz-list-item-meta>\n        </nz-list-item>\n      </nz-list>\n    </nz-spin>\n  </nz-col>\n</nz-row>\n\n<nz-row *ngIf=\"button\">\n  <nz-col [nzSpan]=\"4\" [nzOffset]=\"20\">\n    <button nz-button nzType=\"primary\" (click)=\"confirm()\">\u786E\u5B9A</button>\n  </nz-col>\n</nz-row>\n\n<ng-template #searchInputTpl>\n  <i nz-icon nzType=\"close\" nzTheme=\"outline\" *ngIf=\"nzTabsetSearch\" (click)=\"onTabsetSearchClean()\"></i>\n  <i nz-icon nzType=\"search\" nzTheme=\"outline\" *ngIf=\"!nzTabsetSearch\"></i>\n</ng-template>\n", styles: [".nz-tabset-input{width:100%}.nz-tabset-content{padding:20px}.nz-tabset-sg{padding-right:38px!important;padding-left:38px!important}.nz-tabset-content-item:hover{background-color:#f1f1f1;cursor:pointer}\n"], components: [{ type: i2.NzTabSetComponent, selector: "nz-tabset", inputs: ["nzSelectedIndex", "nzTabPosition", "nzTabBarExtraContent", "nzCanDeactivate", "nzAddIcon", "nzTabBarStyle", "nzType", "nzSize", "nzAnimated", "nzTabBarGutter", "nzHideAdd", "nzCentered", "nzHideAll", "nzLinkRouter", "nzLinkExact"], outputs: ["nzSelectChange", "nzSelectedIndexChange", "nzTabListScroll", "nzClose", "nzAdd"], exportAs: ["nzTabset"] }, { type: i2.NzTabComponent, selector: "nz-tab", inputs: ["nzTitle", "nzClosable", "nzCloseIcon", "nzDisabled", "nzForceRender"], outputs: ["nzSelect", "nzDeselect", "nzClick", "nzContextmenu"], exportAs: ["nzTab"] }, { type: i3.SGContainerComponent, selector: "sg-container, [sg-container]", inputs: ["gutter", "sg-container", "col"], exportAs: ["sgContainer"] }, { type: i3.SGComponent, selector: "sg", inputs: ["col"], exportAs: ["sg"] }, { type: i4.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }, { type: i5.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { type: i6.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckBoxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { type: i7.NzListComponent, selector: "nz-list, [nz-list]", inputs: ["nzDataSource", "nzBordered", "nzGrid", "nzHeader", "nzFooter", "nzItemLayout", "nzRenderItem", "nzLoading", "nzLoadMore", "nzPagination", "nzSize", "nzSplit", "nzNoResult"], exportAs: ["nzList"] }, { type: i7.NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: ["nzActions", "nzContent", "nzExtra", "nzNoFlex"], exportAs: ["nzListItem"] }, { type: i7.NzListItemMetaComponent, selector: "nz-list-item-meta, [nz-list-item-meta]", inputs: ["nzAvatar", "nzTitle", "nzDescription"], exportAs: ["nzListItemMeta"] }, { type: i7.NzListItemMetaTitleComponent, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"] }, { type: i8.STComponent, selector: "st", inputs: ["req", "res", "page", "data", "columns", "contextmenu", "ps", "pi", "total", "loading", "loadingDelay", "loadingIndicator", "bordered", "size", "scroll", "singleSort", "multiSort", "rowClassName", "clickRowClassName", "widthMode", "widthConfig", "resizable", "header", "showHeader", "footer", "bodyHeader", "body", "expandRowByClick", "expandAccordion", "expand", "noResult", "responsive", "responsiveHideHeaderFooter", "virtualScroll", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "customRequest", "virtualForTrackBy"], outputs: ["error", "change"], exportAs: ["st"] }, { type: i9.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i10.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { type: i10.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { type: i11.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i4.NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]" }, { type: i4.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "disabled"], exportAs: ["nzInput"] }, { type: i12.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i12.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i12.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i13.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i14.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i15.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: ContactComponent, decorators: [{
            type: Component,
            args: [{ selector: 'contact', template: "<nz-row [nzGutter]=\"16\">\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"8\" [nzXl]=\"6\" [nzXXl]=\"6\">\n    <nz-tabset nzCentered>\n      <nz-tab nzTitle=\"\u90E8\u95E8\" (nzSelect)=\"onTabsetDept()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('dept', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onDeptClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzDeptTreeVirtualHeight\"\n                [nzData]=\"nzDepts\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u89D2\u8272\" (nzSelect)=\"onTabsetRole()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('role', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-tree\n                class=\"nz-tabset-content\"\n                (nzClick)=\"onRoleClick($event)\"\n                [nzBlockNode]=\"true\"\n                [nzShowLine]=\"true\"\n                [nzHideUnMatched]=\"true\"\n                [nzVirtualHeight]=\"nzRoleTreeVirtualHeight\"\n                [nzData]=\"nzRoles\"\n              ></nz-tree>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n      <nz-tab nzTitle=\"\u597D\u53CB\" (nzSelect)=\"onTabsetFriendGroup()\">\n        <div sg-container=\"2\">\n          <sg col=\"1\" class=\"nz-tabset-sg\">\n            <nz-input-group class=\"nz-tabset-input\" [nzSuffix]=\"searchInputTpl\">\n              <input\n                nz-input\n                [(ngModel)]=\"nzTabsetSearch\"\n                (ngModelChange)=\"onTabsetSearchChange('friendGroup', $event)\"\n                type=\"text\"\n                placeholder=\"\u8BF7\u8F93\u5165\u597D\u53CB\u540D\u79F0\"\n              />\n            </nz-input-group>\n          </sg>\n          <sg col=\"1\">\n            <nz-spin [nzSpinning]=\"nzTabsetLoading\">\n              <nz-list class=\"nz-tabset-content\" nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n                <nz-list-item\n                  class=\"nz-tabset-content-item\"\n                  *ngFor=\"let group of nzFriendGroups\"\n                  (click)=\"onFriendGroupClick(group)\"\n                >\n                  <nz-list-item-meta>\n                    <nz-list-item-meta-title>\n                      {{ group.name }}\n                    </nz-list-item-meta-title>\n                  </nz-list-item-meta>\n                </nz-list-item>\n              </nz-list>\n            </nz-spin>\n          </sg>\n        </div>\n      </nz-tab>\n    </nz-tabset>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"16\" [nzXl]=\"13\" [nzXXl]=\"13\">\n    <st #st responsiveHideHeaderFooter></st>\n  </nz-col>\n\n  <nz-col [nzXs]=\"24\" [nzSm]=\"24\" [nzMd]=\"24\" [nzLg]=\"24\" [nzXl]=\"5\" [nzXXl]=\"5\">\n    <nz-spin [nzSpinning]=\"nzContactLoading\">\n      <nz-list nzItemLayout=\"horizontal\" [nzSplit]=\"false\" nzSize=\"small\">\n        <nz-list-item\n          class=\"nz-tabset-content-item\"\n          *ngFor=\"let contact of nzContacts\"\n          (click)=\"onContactRemove(contact)\"\n        >\n          <nz-list-item-meta>\n            <nz-list-item-meta-title>\n              {{ contact.realName }}\n            </nz-list-item-meta-title>\n          </nz-list-item-meta>\n        </nz-list-item>\n      </nz-list>\n    </nz-spin>\n  </nz-col>\n</nz-row>\n\n<nz-row *ngIf=\"button\">\n  <nz-col [nzSpan]=\"4\" [nzOffset]=\"20\">\n    <button nz-button nzType=\"primary\" (click)=\"confirm()\">\u786E\u5B9A</button>\n  </nz-col>\n</nz-row>\n\n<ng-template #searchInputTpl>\n  <i nz-icon nzType=\"close\" nzTheme=\"outline\" *ngIf=\"nzTabsetSearch\" (click)=\"onTabsetSearchClean()\"></i>\n  <i nz-icon nzType=\"search\" nzTheme=\"outline\" *ngIf=\"!nzTabsetSearch\"></i>\n</ng-template>\n", styles: [".nz-tabset-input{width:100%}.nz-tabset-content{padding:20px}.nz-tabset-sg{padding-right:38px!important;padding-left:38px!important}.nz-tabset-content-item:hover{background-color:#f1f1f1;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ContactService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { nzTabsetSearch: [{
                type: Optional
            }, {
                type: Input
            }], nzTabsetLoading: [{
                type: Optional
            }, {
                type: Input
            }], nzExpandAll: [{
                type: Optional
            }, {
                type: Input
            }], nzDepts: [{
                type: Optional
            }, {
                type: Input
            }], nzDeptTreeVirtualHeight: [{
                type: Optional
            }, {
                type: Input
            }], nzDeptClass: [{
                type: Optional
            }, {
                type: Input
            }], nzDeptClassHistory: [{
                type: Optional
            }, {
                type: Input
            }], nzDeptGrade: [{
                type: Optional
            }, {
                type: Input
            }], nzDeptGradeID: [{
                type: Optional
            }, {
                type: Input
            }], nzRoles: [{
                type: Optional
            }, {
                type: Input
            }], nzRoleTreeVirtualHeight: [{
                type: Optional
            }, {
                type: Input
            }], nzFriendGroups: [{
                type: Optional
            }, {
                type: Input
            }], st: [{
                type: ViewChild,
                args: ['st', { static: false }]
            }], defaultContacts: [{
                type: Optional
            }, {
                type: Input
            }], nzContacts: [{
                type: Optional
            }, {
                type: Input
            }], nzContactLoading: [{
                type: Optional
            }, {
                type: Input
            }], button: [{
                type: Optional
            }, {
                type: Input
            }], confirmed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULEtBQUssRUFJTCxRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZXZCLE1BQU0sT0FBTyxnQkFBZ0I7SUF3RDNCLFlBQW9CLE9BQXVCLEVBQVUsaUJBQW9DO1FBQXJFLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXZEekYsU0FBSSxHQUFtQixFQUFFLENBQUM7UUFFMUI7O1dBRUc7UUFDa0IsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRXREOztXQUVHO1FBQ2tCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRWpEOztXQUVHO1FBQ2tCLFlBQU8sR0FBd0IsRUFBRSxDQUFDO1FBQy9DLGlCQUFZLEdBQXdCLEVBQUUsQ0FBQztRQUMxQiw0QkFBdUIsR0FBa0IsSUFBSSxDQUFDO1FBQzlDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUNuQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFFeEQ7O1dBRUc7UUFDa0IsWUFBTyxHQUF3QixFQUFFLENBQUM7UUFDL0MsaUJBQVksR0FBd0IsRUFBRSxDQUFDO1FBQzFCLDRCQUF1QixHQUFrQixJQUFJLENBQUM7UUFFbkU7O1dBRUc7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QVE7O3NCQUFJLEtBQUs7Z0JBTWtCLEVBQUU7c0JBQXJDLFNBQVM7dUJBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFLYixlQUFlO3NCQUFuQyxRQUFROztzQkFBSSxLQUFLO2dCQUNHLFVBQVU7c0JBQTlCLFFBQVE7O3NCQUFJLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUFwQyxRQUFROztzQkFBSSxLQUFLO2dCQUtHLE1BQU07c0JBQTFCLFFBQVE7O3NCQUFJLEtBQUs7Z0JBQ0MsU0FBUztzQkFBM0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56VHJlZU5vZGVPcHRpb25zLCBOekZvcm1hdEVtaXRFdmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IFNUQ29tcG9uZW50IH0gZnJvbSAnQHllbG9uL2FiYy9zdCc7XG5cbmltcG9ydCB7IENvbnRhY3RTZXJ2aWNlIH0gZnJvbSAnLi9jb250YWN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb250YWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRhY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb250YWN0LmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29udGFjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogdGFic2V0XG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuelRhYnNldFNlYXJjaDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56VGFic2V0TG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiDmoJHlsZXlvIDnirbmgIFcbiAgICovXG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56RXhwYW5kQWxsOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICog6YOo6Zeo5qCR5ZKM6YOo6Zeo5p+l6K+i55qE5LiA5Lqb6YCJ6aG5L+WPr+S8oOWPr+S4jeS8oFxuICAgKi9cbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgbnpEZXB0czogTnpUcmVlTm9kZU9wdGlvbnNbXSA9IFtdO1xuICBwcml2YXRlIF9uekRlcHRzQ29weTogTnpUcmVlTm9kZU9wdGlvbnNbXSA9IFtdO1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekRlcHRUcmVlVmlydHVhbEhlaWdodDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56RGVwdENsYXNzOiBib29sZWFuID0gdHJ1ZTtcbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgbnpEZXB0Q2xhc3NIaXN0b3J5OiBib29sZWFuID0gdHJ1ZTtcbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgbnpEZXB0R3JhZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgbnpEZXB0R3JhZGVJRDogc3RyaW5nIHwgbnVsbCA9bnVsbDtcblxuICAvKipcbiAgICog6KeS6Imy5qCRXG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuelJvbGVzOiBOelRyZWVOb2RlT3B0aW9uc1tdID0gW107XG4gIHByaXZhdGUgX256Um9sZXNDb3B5OiBOelRyZWVOb2RlT3B0aW9uc1tdID0gW107XG4gIEBPcHRpb25hbCgpIEBJbnB1dCgpIG56Um9sZVRyZWVWaXJ0dWFsSGVpZ2h0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICog5aW95Y+L5YiG57uEXG4gICAqL1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekZyaWVuZEdyb3VwczogTnpTYWZlQW55W10gPSBbXTtcbiAgX256RnJpZW5kR3JvdXBzQ29weTogTnpTYWZlQW55W10gPSBbXTtcblxuICAvKipcbiAgICogdGFibGXnu4Tku7bvvIzluK7liqnmlofmoaM6IGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9jb21wb25lbnRzL3N0L3poPyNBUElcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3N0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHN0ITogU1RDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIOiBlOezu+S6ulxuICAgKi9cbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgZGVmYXVsdENvbnRhY3RzOiBzdHJpbmdbXSA9IFtdO1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekNvbnRhY3RzOiBOelNhZmVBbnlbXSA9IFtdO1xuICBAT3B0aW9uYWwoKSBASW5wdXQoKSBuekNvbnRhY3RMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIOaPkOS6pOWSjOaPkOS6pOaMiemSrlxuICAgKi9cbiAgQE9wdGlvbmFsKCkgQElucHV0KCkgYnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNvbmZpcm1lZDogRXZlbnRFbWl0dGVyPE56U2FmZUFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhY3Q6IENvbnRhY3RTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAvKipcbiAgICog5Yid5aeL5YyW77yM6aaW5YWI5Yqg6L296YOo6Zeo5qCR5ZKM6buY6K6k6YCJ5Lit55qE5Lq655qE5pWw5o2uXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uVGFic2V0RGVwdCgpO1xuICAgIHRoaXMub25Db250YWN0c0luaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop4blm77liJ3lp4vljJblrozmr5XlkI7ov5vooYx0YWJsZeWIneWni+WMllxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMub25UYWJsZUluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJbpu5jorqTpgInkuK3ogZTns7vkurpcbiAgICovXG4gIG9uQ29udGFjdHNJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlZmF1bHRDb250YWN0cyAmJiB0aGlzLmRlZmF1bHRDb250YWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm56Q29udGFjdExvYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICAgIHRoaXMuY29udGFjdC5nZXRVc2VyQnlVc2VySWRzKHRoaXMuZGVmYXVsdENvbnRhY3RzKS5zdWJzY3JpYmUoY29udGFjdHMgPT4ge1xuICAgICAgICAgIHRoaXMubnpDb250YWN0cyA9IGNvbnRhY3RzO1xuICAgICAgICAgIHRoaXMubnpDb250YWN0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGFibGXliJ3lp4vljJZcbiAgICovXG4gIG9uVGFibGVJbml0KCk6IHZvaWQge1xuICAgIC8vIOiuvue9ruihqOWktFxuICAgIHRoaXMuc3QucmVzZXRDb2x1bW5zKHtcbiAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgeyB0aXRsZTogJ+mAieaLqScsIHR5cGU6ICdjaGVja2JveCcgfSxcbiAgICAgICAgeyB0aXRsZTogJ+W6j+WPtycsIHR5cGU6ICdubycgfSxcbiAgICAgICAgeyB0aXRsZTogJ+Wnk+WQjScsIGluZGV4OiAncmVhbE5hbWUnIH0sXG4gICAgICAgIHsgdGl0bGU6ICflrablj7cv5bel5Y+3JywgaW5kZXg6ICd1c2VyQ29kZScgfSxcbiAgICAgICAgeyB0aXRsZTogJ+mDqOmXqCcsIGluZGV4OiAnZGVwdC5kZXB0TmFtZScgfVxuICAgICAgXVxuICAgIH0pO1xuICAgIC8vIOiuoumYhXRhYmxl54K55Ye7Y2hlY2tib3jkuovku7blj5jljJZcbiAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgIHRoaXMuc3QuY2hhbmdlLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgIC8vIOeCueWHu2NoZWNrYm945paw5aKe6IGU57O75Lq6XG4gICAgICAgICAgY29uc3QgY29udGFjdElkcyA9IHRoaXMubnpDb250YWN0cy5tYXAoYyA9PiBjLnVzZXJJZCk7XG4gICAgICAgICAgdGhpcy5uekNvbnRhY3RzID0gdGhpcy5uekNvbnRhY3RzLmNvbmNhdChlLmNoZWNrYm94IS5maWx0ZXIoYyA9PiAhY29udGFjdElkcy5pbmNsdWRlcyhjLnVzZXJJZCkpKTtcbiAgICAgICAgICAvLyDlj5bmtohjaGVja2JveOWPlua2iOiBlOezu+S6ulxuICAgICAgICAgIGNvbnN0IGNhbmNlbElkcyA9IHRoaXMuc3QubGlzdC5maWx0ZXIoZCA9PiAhZC5jaGVja2VkKS5tYXAoZCA9PiBkLnVzZXJJZCk7XG4gICAgICAgICAgdGhpcy5uekNvbnRhY3RzID0gdGhpcy5uekNvbnRhY3RzLmZpbHRlcihkID0+ICFjYW5jZWxJZHMuaW5jbHVkZXMoZC51c2VySWQpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHRhYnNldOi/m+WFpeWKoOi9veeKtuaAgVxuICAgKi9cbiAgb25UYWJzZXRMb2FkU3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYnNldExvYWRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHRhYnNldOWPlua2iOWKoOi9veeKtuaAgVxuICAgKi9cbiAgb25UYWJzZXRMb2FkRW5kKCk6IHZvaWQge1xuICAgIHRoaXMubnpUYWJzZXRMb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogdGFic2V05pCc57Si5qGG5riF6ZmkXG4gICAqL1xuICBvblRhYnNldFNlYXJjaENsZWFuKCk6IHZvaWQge1xuICAgIHRoaXMubnpEZXB0cyA9IHRoaXMuX256RGVwdHNDb3B5O1xuICAgIHRoaXMubnpSb2xlcyA9IHRoaXMuX256Um9sZXNDb3B5O1xuICAgIHRoaXMubnpGcmllbmRHcm91cHMgPSB0aGlzLl9uekZyaWVuZEdyb3Vwc0NvcHk7XG4gICAgdGhpcy5uelRhYnNldFNlYXJjaCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogdGFic2V05pCc57Si5qGG6L6T5YWlXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIOexu+Wei1xuICAgKiBAcGFyYW0gdmFsdWUg5YC8XG4gICAqL1xuICBvblRhYnNldFNlYXJjaENoYW5nZSh0eXBlOiAnZGVwdCcgfCAncm9sZScgfCAnZnJpZW5kR3JvdXAnLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYnNldExvYWRTdGFydCgpO1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICB0aGlzLm56RGVwdHMgPSB0aGlzLl9uekRlcHRzQ29weTtcbiAgICAgIHRoaXMubnpSb2xlcyA9IHRoaXMuX256Um9sZXNDb3B5O1xuICAgICAgdGhpcy5uekZyaWVuZEdyb3VwcyA9IHRoaXMuX256RnJpZW5kR3JvdXBzQ29weTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdHJlZXM6IE56VHJlZU5vZGVPcHRpb25zW10gPSBbXTtcbiAgICAgIGlmICh0eXBlID09PSAnZGVwdCcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUcmVlKHZhbHVlLCB0aGlzLl9uekRlcHRzQ29weSwgdHJlZXMpO1xuICAgICAgICB0aGlzLm56RGVwdHMgPSB0cmVlcztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAncm9sZScpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUcmVlKHZhbHVlLCB0aGlzLl9uelJvbGVzQ29weSwgdHJlZXMpO1xuICAgICAgICB0aGlzLm56Um9sZXMgPSB0cmVlcztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAnZnJpZW5kR3JvdXAnKSB7XG4gICAgICAgIHRoaXMubnpGcmllbmRHcm91cHMgPSB0aGlzLl9uekZyaWVuZEdyb3Vwc0NvcHkuZmlsdGVyKGYgPT4ge1xuICAgICAgICAgIHJldHVybiAhZi5uYW1lLmluZGV4T2YodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5vblRhYnNldExvYWRFbmQoKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0YWJzZXTliIfmjaLliLDpg6jpl6hcbiAgICovXG4gIG9uVGFic2V0RGVwdCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uVGFic2V0U2VhcmNoQ2xlYW4oKTtcbiAgICBpZiAoIXRoaXMubnpEZXB0cyB8fCB0aGlzLm56RGVwdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm9uVGFic2V0RGVwdEZsdXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRhYnNldOWIh+aNouWIsOinkuiJslxuICAgKi9cbiAgb25UYWJzZXRSb2xlKCk6IHZvaWQge1xuICAgIHRoaXMub25UYWJzZXRTZWFyY2hDbGVhbigpO1xuICAgIGlmICghdGhpcy5uelJvbGVzIHx8IHRoaXMubnpSb2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMub25UYWJzZXRSb2xlRmx1c2gobnVsbCBhcyBOelNhZmVBbnkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0YWJzZXTliIfmjaLliLDlpb3lj4vliIbnu4RcbiAgICovXG4gIG9uVGFic2V0RnJpZW5kR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYnNldFNlYXJjaENsZWFuKCk7XG4gICAgaWYgKCF0aGlzLm56RnJpZW5kR3JvdXBzIHx8IHRoaXMubnpGcmllbmRHcm91cHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm9uVGFic2V0RnJpZW5kR3JvdXBGbHVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bpg6jpl6jmoJFcbiAgICovXG4gIG9uVGFic2V0RGVwdEZsdXNoKCk6IHZvaWQge1xuICAgIHRoaXMub25UYWJzZXRMb2FkU3RhcnQoKTtcbiAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgIHRoaXMuY29udGFjdFxuICAgICAgICAuZGVwdCh0aGlzLm56RGVwdENsYXNzLCB0aGlzLm56RGVwdENsYXNzSGlzdG9yeSwgdGhpcy5uekRlcHRHcmFkZSwgdGhpcy5uekRlcHRHcmFkZUlEKVxuICAgICAgICAuc3Vic2NyaWJlKCh0cmVlczogTnpUcmVlTm9kZU9wdGlvbnNbXSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXhwYW5kVHJlZSh0cmVlcyk7XG4gICAgICAgICAgdGhpcy5uekRlcHRzID0gdHJlZXM7XG4gICAgICAgICAgdGhpcy5fbnpEZXB0c0NvcHkgPSB0cmVlcztcbiAgICAgICAgICB0aGlzLm9uVGFic2V0TG9hZEVuZCgpO1xuICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyDojrflj5bop5LoibLmoJFcbiAgb25UYWJzZXRSb2xlRmx1c2goZ3JvdXBSb2xlQ29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYnNldExvYWRTdGFydCgpO1xuICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgdGhpcy5jb250YWN0LmdldEdyb3VwUm9sZShncm91cFJvbGVDb2RlKS5zdWJzY3JpYmUoKHJvbGVzOiBOelRyZWVOb2RlT3B0aW9uc1tdKSA9PiB7XG4gICAgICAgIHRoaXMuZXhwYW5kVHJlZShyb2xlcyk7XG4gICAgICAgIHRoaXMubnpSb2xlcyA9IHJvbGVzO1xuICAgICAgICB0aGlzLl9uelJvbGVzQ29weSA9IHJvbGVzO1xuICAgICAgICB0aGlzLm9uVGFic2V0TG9hZEVuZCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIOiOt+WPluWlveWPi+WIhue7hOWIl+ihqFxuICBvblRhYnNldEZyaWVuZEdyb3VwRmx1c2goKTogdm9pZCB7XG4gICAgdGhpcy5vblRhYnNldExvYWRTdGFydCgpO1xuICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgdGhpcy5jb250YWN0LmdldEZyaWVuZEdyb3VwKCkuc3Vic2NyaWJlKChncm91cDogTnpTYWZlQW55W10pID0+IHtcbiAgICAgICAgdGhpcy5uekZyaWVuZEdyb3VwcyA9IGdyb3VwO1xuICAgICAgICB0aGlzLl9uekZyaWVuZEdyb3Vwc0NvcHkgPSBncm91cDtcbiAgICAgICAgdGhpcy5vblRhYnNldExvYWRFbmQoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog6YOo6Zeo5qCR54K55Ye7XG4gICAqXG4gICAqIEBwYXJhbSBlIOiKgueCuVxuICAgKi9cbiAgb25EZXB0Q2xpY2soZTogTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICAvLyDmnoTpgKDliIbpobXor7fmsYLvvIznm7TmjqXkvKDlhaVzdFRhYmxl57uE5Lu277yM5Ymp5LiL55qE5omA5pyJ5Lqk57uZ57uE5Lu26Ieq5bex5a6M5oiQXG4gICAgdGhpcy5zdC5kYXRhID0gJy9hdXRoL2Jhc2VVc2VyL3F1ZXJ5TGlzdEZvclBhZ2UnO1xuICAgIHRoaXMuc3QucmVxID0ge1xuICAgICAgYWxsSW5Cb2R5OiB0cnVlLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB0eXBlOiAncGFnZScsXG4gICAgICByZU5hbWU6IHtcbiAgICAgICAgcGk6ICdwYWdlTnVtJyxcbiAgICAgICAgcHM6ICdwYWdlU2l6ZSdcbiAgICAgIH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHBhZ2VQYXJhbToge1xuICAgICAgICAgIGRlcHRJZDogZS5rZXlzPy5wb3AoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyB0YWJsZeaVsOaNrumihOWkhOeQhlxuICAgIHRoaXMuc3QucmVzID0ge1xuICAgICAgcHJvY2VzczogZGF0YSA9PiB7XG4gICAgICAgIHRoaXMub25UYWJsZUNoZWNrKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIOWKoOi9veesrOS4gOmhtVxuICAgIHRoaXMuc3QubG9hZCgxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop5LoibLmoJHngrnlh7tcbiAgICpcbiAgICogQHBhcmFtIGUg6IqC54K5XG4gICAqL1xuICBvblJvbGVDbGljayhlOiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIC8vIOaehOmAoOWIhumhteivt+axgu+8jOebtOaOpeS8oOWFpXN0VGFibGXnu4Tku7bvvIzliankuIvnmoTmiYDmnInkuqTnu5nnu4Tku7boh6rlt7HlrozmiJBcbiAgICB0aGlzLnN0LmRhdGEgPSAnL2F1dGgvYmFzZVVzZXIvcXVlcnlMaXN0Rm9yUGFnZSc7XG4gICAgdGhpcy5zdC5yZXEgPSB7XG4gICAgICBhbGxJbkJvZHk6IHRydWUsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHR5cGU6ICdwYWdlJyxcbiAgICAgIHJlTmFtZToge1xuICAgICAgICBwaTogJ3BhZ2VOdW0nLFxuICAgICAgICBwczogJ3BhZ2VTaXplJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFnZVBhcmFtOiB7XG4gICAgICAgICAgcm9sZUlkOiBlLmtleXM/LnBvcCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIHRhYmxl5pWw5o2u6aKE5aSE55CGXG4gICAgdGhpcy5zdC5yZXMgPSB7XG4gICAgICBwcm9jZXNzOiBkYXRhID0+IHtcbiAgICAgICAgdGhpcy5vblRhYmxlQ2hlY2soZGF0YSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8g5Yqg6L2956ys5LiA6aG1XG4gICAgdGhpcy5zdC5sb2FkKDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWlveWPi+WIhue7hOeCueWHu1xuICAgKlxuICAgKiBAcGFyYW0gZSDliIbnu4RcbiAgICovXG4gIG9uRnJpZW5kR3JvdXBDbGljayhlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICAvLyDmnoTpgKDliIbpobXor7fmsYLvvIznm7TmjqXkvKDlhaVzdFRhYmxl57uE5Lu277yM5Ymp5LiL55qE5omA5pyJ5Lqk57uZ57uE5Lu26Ieq5bex5a6M5oiQXG4gICAgdGhpcy5zdC5kYXRhID0gJy9hdXRoL2Jhc2VVc2VyL3F1ZXJ5TGlzdEZvclBhZ2UnO1xuICAgIHRoaXMuc3QucmVxID0ge1xuICAgICAgYWxsSW5Cb2R5OiB0cnVlLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB0eXBlOiAncGFnZScsXG4gICAgICByZU5hbWU6IHtcbiAgICAgICAgcGk6ICdwYWdlTnVtJyxcbiAgICAgICAgcHM6ICdwYWdlU2l6ZSdcbiAgICAgIH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHBhZ2VQYXJhbToge1xuICAgICAgICAgIGZyaWVuZEdyb3VwSWQ6IGUuaWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgLy8gdGFibGXmlbDmja7pooTlpITnkIZcbiAgICB0aGlzLnN0LnJlcyA9IHtcbiAgICAgIHByb2Nlc3M6IGRhdGEgPT4ge1xuICAgICAgICB0aGlzLm9uVGFibGVDaGVjayhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyDliqDovb3nrKzkuIDpobVcbiAgICB0aGlzLnN0LmxvYWQoMSk7XG4gIH1cblxuICAvKipcbiAgICog54K55Ye75Y+z5L6n6IGU57O75Lq66L+b6KGM5Yig6ZmkXG4gICAqXG4gICAqIEBwYXJhbSBjIOeCueWHu+eahOiBlOezu+S6ulxuICAgKi9cbiAgb25Db250YWN0UmVtb3ZlKGM6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMubnpDb250YWN0cyA9IHRoaXMubnpDb250YWN0cy5maWx0ZXIoY29udGFjdCA9PiB7XG4gICAgICByZXR1cm4gY29udGFjdC51c2VySWQgIT0gYy51c2VySWQ7XG4gICAgfSk7XG4gICAgdGhpcy5zdC5yZWxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDpooTlpITnkIZ0YWJsZeW9k+WJjemhteaVsOaNru+8jOWSjG56Q29udGF05a+55q+U77yM56Gu5a6aY2hlY2tib3jnirbmgIFcbiAgICpcbiAgICogQHBhcmFtIGRhdGEg6aKE5aSE55CG5pWw5o2uXG4gICAqL1xuICBvblRhYmxlQ2hlY2soZGF0YTogTnpTYWZlQW55W10pOiB2b2lkIHtcbiAgICBjb25zdCBpZHMgPSB0aGlzLm56Q29udGFjdHMubWFwKHUgPT4gdS51c2VySWQpO1xuICAgIGRhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGlmIChpZHMuaW5jbHVkZXMoZC51c2VySWQpKSB7XG4gICAgICAgIGQuY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDpgJLlvZLmoJHlr7vmib5uYW1l55u45ZCM6IqC54K5XG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIOWQjeensFxuICAgKiBAcGFyYW0gdHJlZXMg6ZyA6KaB6YCS5b2S55qE5qCRXG4gICAqIEBwYXJhbSBsaXN0IOaQnOe0oue7k+aenFxuICAgKi9cbiAgc2VhcmNoVHJlZShuYW1lOiBzdHJpbmcsIHRyZWVzOiBOelRyZWVOb2RlT3B0aW9uc1tdLCBsaXN0OiBOelRyZWVOb2RlT3B0aW9uc1tdKTogdm9pZCB7XG4gICAgaWYgKHRyZWVzICYmIHRyZWVzLmxlbmd0aCAmJiB0cmVlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0cmVlcy5mb3JFYWNoKCh0cmVlOiBOelRyZWVOb2RlT3B0aW9ucykgPT4ge1xuICAgICAgICBpZiAodHJlZS50aXRsZS5pbmRleE9mKG5hbWUpICE9IC0xKSB7XG4gICAgICAgICAgbGlzdC5wdXNoKHRyZWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmVlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hUcmVlKG5hbWUsIHRyZWUuY2hpbGRyZW4sIGxpc3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6YCS5b2S5qCR5bGV5byA5omA5pyJ5pyJ5a2Q6IqC54K555qE6IqC54K5XG4gICAqXG4gICAqIEBwYXJhbSB0cmVlcyDpnIDopoHlsZXlvIDnmoTmoJFcbiAgICovXG4gIGV4cGFuZFRyZWUodHJlZXM6IE56VHJlZU5vZGVPcHRpb25zW10pOiB2b2lkIHtcbiAgICBpZiAodHJlZXMgJiYgdHJlZXMubGVuZ3RoICYmIHRyZWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyZWVzLmZvckVhY2godHJlZSA9PiB7XG4gICAgICAgIGlmICghdHJlZS5jaGlsZHJlbiB8fCB0cmVlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRyZWUuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICB0cmVlLmlzTGVhZiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyZWUuY2hpbGRyZW4pIHtcbiAgICAgICAgICB0cmVlLmV4cGFuZGVkID0gdGhpcy5uekV4cGFuZEFsbDtcbiAgICAgICAgICB0cmVlLmlzTGVhZiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhwYW5kVHJlZSh0cmVlLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWIt+aWsOW9k+WJjemhtemdolxuICAgKi9cbiAgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDnoa7orqTmjInpkq5vdXRwdXTmlbDmja5cbiAgICovXG4gIGNvbmZpcm0oKTogdm9pZCB7XG4gICAgdGhpcy5jb25maXJtZWQubmV4dCh0aGlzLm56Q29udGFjdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOmUgOavgeWHveaVsFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5uekRlcHRzID0gW107XG4gICAgdGhpcy5uelJvbGVzID0gW107XG4gICAgdGhpcy5uekNvbnRhY3RzID0gW107XG4gICAgdGhpcy5zdWJzLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iLCI8bnotcm93IFtuekd1dHRlcl09XCIxNlwiPlxuICA8bnotY29sIFtuelhzXT1cIjI0XCIgW256U21dPVwiMjRcIiBbbnpNZF09XCIyNFwiIFtuekxnXT1cIjhcIiBbbnpYbF09XCI2XCIgW256WFhsXT1cIjZcIj5cbiAgICA8bnotdGFic2V0IG56Q2VudGVyZWQ+XG4gICAgICA8bnotdGFiIG56VGl0bGU9XCLpg6jpl6hcIiAobnpTZWxlY3QpPVwib25UYWJzZXREZXB0KClcIj5cbiAgICAgICAgPGRpdiBzZy1jb250YWluZXI9XCIyXCI+XG4gICAgICAgICAgPHNnIGNvbD1cIjFcIiBjbGFzcz1cIm56LXRhYnNldC1zZ1wiPlxuICAgICAgICAgICAgPG56LWlucHV0LWdyb3VwIGNsYXNzPVwibnotdGFic2V0LWlucHV0XCIgW256U3VmZml4XT1cInNlYXJjaElucHV0VHBsXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG56LWlucHV0XG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJuelRhYnNldFNlYXJjaFwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25UYWJzZXRTZWFyY2hDaGFuZ2UoJ2RlcHQnLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXpg6jpl6jlkI3np7BcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9uei1pbnB1dC1ncm91cD5cbiAgICAgICAgICA8L3NnPlxuICAgICAgICAgIDxzZyBjb2w9XCIxXCI+XG4gICAgICAgICAgICA8bnotc3BpbiBbbnpTcGlubmluZ109XCJuelRhYnNldExvYWRpbmdcIj5cbiAgICAgICAgICAgICAgPG56LXRyZWVcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm56LXRhYnNldC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAobnpDbGljayk9XCJvbkRlcHRDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbnpCbG9ja05vZGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW256U2hvd0xpbmVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW256SGlkZVVuTWF0Y2hlZF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBbbnpWaXJ0dWFsSGVpZ2h0XT1cIm56RGVwdFRyZWVWaXJ0dWFsSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbbnpEYXRhXT1cIm56RGVwdHNcIlxuICAgICAgICAgICAgICA+PC9uei10cmVlPlxuICAgICAgICAgICAgPC9uei1zcGluPlxuICAgICAgICAgIDwvc2c+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uei10YWI+XG4gICAgICA8bnotdGFiIG56VGl0bGU9XCLop5LoibJcIiAobnpTZWxlY3QpPVwib25UYWJzZXRSb2xlKClcIj5cbiAgICAgICAgPGRpdiBzZy1jb250YWluZXI9XCIyXCI+XG4gICAgICAgICAgPHNnIGNvbD1cIjFcIiBjbGFzcz1cIm56LXRhYnNldC1zZ1wiPlxuICAgICAgICAgICAgPG56LWlucHV0LWdyb3VwIGNsYXNzPVwibnotdGFic2V0LWlucHV0XCIgW256U3VmZml4XT1cInNlYXJjaElucHV0VHBsXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG56LWlucHV0XG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJuelRhYnNldFNlYXJjaFwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25UYWJzZXRTZWFyY2hDaGFuZ2UoJ3JvbGUnLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXop5LoibLlkI3np7BcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9uei1pbnB1dC1ncm91cD5cbiAgICAgICAgICA8L3NnPlxuICAgICAgICAgIDxzZyBjb2w9XCIxXCI+XG4gICAgICAgICAgICA8bnotc3BpbiBbbnpTcGlubmluZ109XCJuelRhYnNldExvYWRpbmdcIj5cbiAgICAgICAgICAgICAgPG56LXRyZWVcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm56LXRhYnNldC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAobnpDbGljayk9XCJvblJvbGVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbnpCbG9ja05vZGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW256U2hvd0xpbmVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW256SGlkZVVuTWF0Y2hlZF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBbbnpWaXJ0dWFsSGVpZ2h0XT1cIm56Um9sZVRyZWVWaXJ0dWFsSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbbnpEYXRhXT1cIm56Um9sZXNcIlxuICAgICAgICAgICAgICA+PC9uei10cmVlPlxuICAgICAgICAgICAgPC9uei1zcGluPlxuICAgICAgICAgIDwvc2c+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uei10YWI+XG4gICAgICA8bnotdGFiIG56VGl0bGU9XCLlpb3lj4tcIiAobnpTZWxlY3QpPVwib25UYWJzZXRGcmllbmRHcm91cCgpXCI+XG4gICAgICAgIDxkaXYgc2ctY29udGFpbmVyPVwiMlwiPlxuICAgICAgICAgIDxzZyBjb2w9XCIxXCIgY2xhc3M9XCJuei10YWJzZXQtc2dcIj5cbiAgICAgICAgICAgIDxuei1pbnB1dC1ncm91cCBjbGFzcz1cIm56LXRhYnNldC1pbnB1dFwiIFtuelN1ZmZpeF09XCJzZWFyY2hJbnB1dFRwbFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBuei1pbnB1dFxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibnpUYWJzZXRTZWFyY2hcIlxuICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uVGFic2V0U2VhcmNoQ2hhbmdlKCdmcmllbmRHcm91cCcsICRldmVudClcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeWlveWPi+WQjeensFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L256LWlucHV0LWdyb3VwPlxuICAgICAgICAgIDwvc2c+XG4gICAgICAgICAgPHNnIGNvbD1cIjFcIj5cbiAgICAgICAgICAgIDxuei1zcGluIFtuelNwaW5uaW5nXT1cIm56VGFic2V0TG9hZGluZ1wiPlxuICAgICAgICAgICAgICA8bnotbGlzdCBjbGFzcz1cIm56LXRhYnNldC1jb250ZW50XCIgbnpJdGVtTGF5b3V0PVwiaG9yaXpvbnRhbFwiIFtuelNwbGl0XT1cImZhbHNlXCIgbnpTaXplPVwic21hbGxcIj5cbiAgICAgICAgICAgICAgICA8bnotbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cIm56LXRhYnNldC1jb250ZW50LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGdyb3VwIG9mIG56RnJpZW5kR3JvdXBzXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZyaWVuZEdyb3VwQ2xpY2soZ3JvdXApXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8bnotbGlzdC1pdGVtLW1ldGE+XG4gICAgICAgICAgICAgICAgICAgIDxuei1saXN0LWl0ZW0tbWV0YS10aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBncm91cC5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbnotbGlzdC1pdGVtLW1ldGEtdGl0bGU+XG4gICAgICAgICAgICAgICAgICA8L256LWxpc3QtaXRlbS1tZXRhPlxuICAgICAgICAgICAgICAgIDwvbnotbGlzdC1pdGVtPlxuICAgICAgICAgICAgICA8L256LWxpc3Q+XG4gICAgICAgICAgICA8L256LXNwaW4+XG4gICAgICAgICAgPC9zZz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L256LXRhYj5cbiAgICA8L256LXRhYnNldD5cbiAgPC9uei1jb2w+XG5cbiAgPG56LWNvbCBbbnpYc109XCIyNFwiIFtuelNtXT1cIjI0XCIgW256TWRdPVwiMjRcIiBbbnpMZ109XCIxNlwiIFtuelhsXT1cIjEzXCIgW256WFhsXT1cIjEzXCI+XG4gICAgPHN0ICNzdCByZXNwb25zaXZlSGlkZUhlYWRlckZvb3Rlcj48L3N0PlxuICA8L256LWNvbD5cblxuICA8bnotY29sIFtuelhzXT1cIjI0XCIgW256U21dPVwiMjRcIiBbbnpNZF09XCIyNFwiIFtuekxnXT1cIjI0XCIgW256WGxdPVwiNVwiIFtuelhYbF09XCI1XCI+XG4gICAgPG56LXNwaW4gW256U3Bpbm5pbmddPVwibnpDb250YWN0TG9hZGluZ1wiPlxuICAgICAgPG56LWxpc3QgbnpJdGVtTGF5b3V0PVwiaG9yaXpvbnRhbFwiIFtuelNwbGl0XT1cImZhbHNlXCIgbnpTaXplPVwic21hbGxcIj5cbiAgICAgICAgPG56LWxpc3QtaXRlbVxuICAgICAgICAgIGNsYXNzPVwibnotdGFic2V0LWNvbnRlbnQtaXRlbVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbnRhY3Qgb2YgbnpDb250YWN0c1wiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ29udGFjdFJlbW92ZShjb250YWN0KVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bnotbGlzdC1pdGVtLW1ldGE+XG4gICAgICAgICAgICA8bnotbGlzdC1pdGVtLW1ldGEtdGl0bGU+XG4gICAgICAgICAgICAgIHt7IGNvbnRhY3QucmVhbE5hbWUgfX1cbiAgICAgICAgICAgIDwvbnotbGlzdC1pdGVtLW1ldGEtdGl0bGU+XG4gICAgICAgICAgPC9uei1saXN0LWl0ZW0tbWV0YT5cbiAgICAgICAgPC9uei1saXN0LWl0ZW0+XG4gICAgICA8L256LWxpc3Q+XG4gICAgPC9uei1zcGluPlxuICA8L256LWNvbD5cbjwvbnotcm93PlxuXG48bnotcm93ICpuZ0lmPVwiYnV0dG9uXCI+XG4gIDxuei1jb2wgW256U3Bhbl09XCI0XCIgW256T2Zmc2V0XT1cIjIwXCI+XG4gICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwicHJpbWFyeVwiIChjbGljayk9XCJjb25maXJtKClcIj7noa7lrpo8L2J1dHRvbj5cbiAgPC9uei1jb2w+XG48L256LXJvdz5cblxuPG5nLXRlbXBsYXRlICNzZWFyY2hJbnB1dFRwbD5cbiAgPGkgbnotaWNvbiBuelR5cGU9XCJjbG9zZVwiIG56VGhlbWU9XCJvdXRsaW5lXCIgKm5nSWY9XCJuelRhYnNldFNlYXJjaFwiIChjbGljayk9XCJvblRhYnNldFNlYXJjaENsZWFuKClcIj48L2k+XG4gIDxpIG56LWljb24gbnpUeXBlPVwic2VhcmNoXCIgbnpUaGVtZT1cIm91dGxpbmVcIiAqbmdJZj1cIiFuelRhYnNldFNlYXJjaFwiPjwvaT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=