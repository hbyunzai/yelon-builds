import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CacheService } from '@yelon/cache';
import { _HttpClient } from '@yelon/theme';
export interface BaseUserParam {
    realName?: string;
    userCode?: string;
    deptId?: string;
    roleId?: string;
    friendGroupId?: string;
    userTypes?: string;
    buildId?: string;
    floor?: string;
    roomId?: string;
    rylb?: string;
}
export interface Page<T> {
    pageNum: number;
    pageSize: number;
    pageParam?: T;
}
export interface PageRes<T> {
    endRow: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    list: T[];
    navigateFirstPage: number;
    navigateLastPage: number;
    navigatePages: number;
    navigatepageNums: number[];
    nextPage: number;
    pageNum: number;
    pageSize: number;
    pages: number;
    prePage: number;
    size: number;
    startRow: number;
    total: number;
}
export declare class ContactService {
    private http;
    private cache;
    constructor(http: _HttpClient, cache: CacheService);
    /**
     * 部门树查询
     *
     * @param clas 包含班级
     * @returns 可观察部门树
     */
    dept(clas: boolean): Observable<NzTreeNodeOptions[]>;
    /**
     * 部门树查询
     *
     * @param clas 包含班级
     * @param his 包含历史班级
     * @returns 可观察部门树
     */
    dept(clas: boolean, his: boolean): Observable<NzTreeNodeOptions[]>;
    /**
     * 部门树查询
     *
     * @param clas 包含班级
     * @param his 包含历史班级
     * @param grade 系部
     * @returns 可观察部门树
     */
    dept(clas: boolean, his: boolean, grade: boolean): Observable<NzTreeNodeOptions[]>;
    /**
     * 部门树查询
     *
     * @param clas 包含班级
     * @param his 包含历史班级
     * @param grade 系部
     * @param gradeID 系部ID
     * @returns 可观察部门树
     */
    dept(clas: boolean, his: boolean, grade: boolean, gradeID: string): Observable<NzTreeNodeOptions[]>;
    page<U, T>(uri: string, page: Page<U>): Observable<PageRes<T>>;
    pageBaseUser(page: Page<BaseUserParam>): Observable<PageRes<NzSafeAny>>;
    getUserByIds(ids: string[]): Observable<any[]>;
    /**
     * 查询人员信息
     *
     * @param userIds[] 用户id数组,["aaa","bbb","ccc"]
     */
    getUserByUserIds(userIds: any): Observable<any[]>;
    /**
     * 获取角色组角色
     *
     * @param roleGroupCode 角色组code
     */
    getGroupRole(roleGroupCode: string): Observable<NzTreeNodeOptions[]>;
    /**
     * 查询当前用户好友分组
     */
    getFriendGroup(): Observable<any[]>;
    /**
     * 查询年级
     */
    getGrade(): Observable<any[]>;
    /**
     * 查询人员类别列表
     */
    getRylbs(): Observable<any[]>;
    /**
     * 获取学生公寓树
     *
     * @param isPower 是否带有权限，默认false
     * @param treeType 树类型 0:宿舍楼 1:宿舍楼+层 2:宿舍楼+层+房间
     */
    getDormTree(isPower: boolean, treeType: number): Observable<any[]>;
}
