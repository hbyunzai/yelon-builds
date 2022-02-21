import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/theme";
import * as i2 from "@yelon/cache";
export class ContactService {
    constructor(http, cache) {
        this.http = http;
        this.cache = cache;
    }
    /**
     * 部门树查询
     *
     * @param clas 包含班级
     * @param his 包含历史班级
     * @param grade 系部
     * @param gradeID 系部ID
     * @returns 可观察部门树
     */
    dept(clas, his, grade, gradeID) {
        let baseUrl = `/auth/baseDepartMent/tree?debug=false`;
        if (clas) {
            baseUrl += `&includeClass=true`;
        }
        else {
            baseUrl += `&includeClass=false`;
        }
        if (his) {
            baseUrl += `&includeHisClass=true`;
        }
        else {
            baseUrl += `&includeHisClass=false`;
        }
        if (grade) {
            baseUrl += `&deptTypes=2,class`;
        }
        if (gradeID) {
            baseUrl += `&gradeId=${gradeID}`;
        }
        return this.http.get(baseUrl).pipe(map((response) => {
            return response.data || [];
        }));
    }
    page(uri, page) {
        return this.http.post(`${uri}/queryListForPage`, page);
    }
    pageBaseUser(page) {
        return this.page('/auth/baseUser', page);
    }
    getUserByIds(ids) {
        return this.http
            .post('/auth/baseUser/users', {
            userIds: ids
        })
            .pipe((response) => {
            return response.data || [];
        });
    }
    /**
     * 查询人员信息
     *
     * @param userIds[] 用户id数组,["aaa","bbb","ccc"]
     */
    getUserByUserIds(userIds) {
        return this.http
            .post(`/auth/baseUser/users`, {
            userIds: userIds
        })
            .pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 获取角色组角色
     *
     * @param roleGroupCode 角色组code
     */
    getGroupRole(roleGroupCode) {
        return this.http
            .post(`/auth/baseRole/findGroupRole`, {
            roleGroupCode: roleGroupCode
        })
            .pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 查询当前用户好友分组
     */
    getFriendGroup() {
        return this.http.post(`/contact/appcontact/findGroup`, {}).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 查询年级
     */
    getGrade() {
        return this.http.get(`/auth/gradeYear/queryListForPage`).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 查询人员类别列表
     */
    getRylbs() {
        return this.http.post(`/auth/baseTeacher/queryRylbs`, {}).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
    /**
     * 获取学生公寓树
     *
     * @param isPower 是否带有权限，默认false
     * @param treeType 树类型 0:宿舍楼 1:宿舍楼+层 2:宿舍楼+层+房间
     */
    getDormTree(isPower, treeType) {
        const user = this.cache.get('_yz_user', { mode: 'none' });
        let params = {};
        if (isPower) {
            params = {
                isPower: isPower,
                userId: user.userId,
                treeType: treeType
            };
        }
        else {
            params = {
                isPower: isPower,
                treeType: treeType
            };
        }
        return this.http.post(`/auth/dorm/tree`, params).pipe(map((response) => {
            return response.data ? response.data : [];
        }));
    }
}
ContactService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ContactService, deps: [{ token: i1._HttpClient }, { token: i2.CacheService }], target: i0.ɵɵFactoryTarget.Injectable });
ContactService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ContactService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ContactService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1._HttpClient }, { type: i2.CacheService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYmlzL2xheW91dC9jb250YWN0L2NvbnRhY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQW9EckMsTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFBb0IsSUFBaUIsRUFBVSxLQUFtQjtRQUE5QyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYztJQUFJLENBQUM7SUFxQ3ZFOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsS0FBZSxFQUFFLE9BQXVCO1FBQzFFLElBQUksT0FBTyxHQUFHLHVDQUF1QyxDQUFDO1FBRXRELElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxJQUFJLG9CQUFvQixDQUFDO1NBQ2pDO2FBQU07WUFDTCxPQUFPLElBQUkscUJBQXFCLENBQUM7U0FDbEM7UUFFRCxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSx1QkFBdUIsQ0FBQztTQUNwQzthQUFNO1lBQ0wsT0FBTyxJQUFJLHdCQUF3QixDQUFDO1NBQ3JDO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPLElBQUksb0JBQW9CLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sSUFBSSxZQUFZLE9BQU8sRUFBRSxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hDLEdBQUcsQ0FBQyxDQUFDLFFBQW1CLEVBQUUsRUFBRTtZQUMxQixPQUFPLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdC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LE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sR0FBRztnQkFDUCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsUUFBUTthQUNuQixDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sR0FBRztnQkFDUCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsUUFBUSxFQUFFLFFBQVE7YUFDbkIsQ0FBQztTQUNIO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ25ELEdBQUcsQ0FBQyxDQUFDLFFBQW1CLEVBQUUsRUFBRTtZQUMxQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7MkdBN0xVLGNBQWM7K0dBQWQsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelRyZWVOb2RlT3B0aW9ucyB9IGZyb20gJ25nLXpvcnJvLWFudGQvdHJlZSc7XG5cbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJ0B5ZWxvbi9jYWNoZSc7XG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVVzZXJQYXJhbSB7XG4gIHJlYWxOYW1lPzogc3RyaW5nO1xuICB1c2VyQ29kZT86IHN0cmluZztcbiAgZGVwdElkPzogc3RyaW5nO1xuICByb2xlSWQ/OiBzdHJpbmc7XG4gIGZyaWVuZEdyb3VwSWQ/OiBzdHJpbmc7XG4gIHVzZXJUeXBlcz86IHN0cmluZztcbiAgYnVpbGRJZD86IHN0cmluZztcbiAgZmxvb3I/OiBzdHJpbmc7XG4gIHJvb21JZD86IHN0cmluZztcbiAgLy8gRklYTUU6IGZpeCB0aGF0IHVzZSBwZXJzb25UeXBlIG9yIHBlb3BsZVR5cGUgb3IgYW55dGhpbmcgdHlwZVxuICByeWxiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2U8VD4ge1xuICBwYWdlTnVtOiBudW1iZXI7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIHBhZ2VQYXJhbT86IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZVJlczxUPiB7XG4gIGVuZFJvdzogbnVtYmVyO1xuICBoYXNOZXh0UGFnZTogYm9vbGVhbjtcbiAgaGFzUHJldmlvdXNQYWdlOiBib29sZWFuO1xuICBpc0ZpcnN0UGFnZTogYm9vbGVhbjtcbiAgaXNMYXN0UGFnZTogYm9vbGVhbjtcbiAgbGlzdDogVFtdO1xuICBuYXZpZ2F0ZUZpcnN0UGFnZTogbnVtYmVyO1xuICBuYXZpZ2F0ZUxhc3RQYWdlOiBudW1iZXI7XG4gIG5hdmlnYXRlUGFnZXM6IG51bWJlcjtcbiAgbmF2aWdhdGVwYWdlTnVtczogbnVtYmVyW107XG4gIG5leHRQYWdlOiBudW1iZXI7XG4gIHBhZ2VOdW06IG51bWJlcjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgcGFnZXM6IG51bWJlcjtcbiAgcHJlUGFnZTogbnVtYmVyO1xuICBzaXplOiBudW1iZXI7XG4gIHN0YXJ0Um93OiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbnRhY3RTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCwgcHJpdmF0ZSBjYWNoZTogQ2FjaGVTZXJ2aWNlKSB7IH1cblxuICAvLyBUSVBTOiBIb3cgdG8gd3JpdGUgYW4gb3ZlcnJpZGUgZnVuY3Rpb24gaW4gdHlwZXNjcmlwdFxuICAvKipcbiAgICog6YOo6Zeo5qCR5p+l6K+iXG4gICAqXG4gICAqIEBwYXJhbSBjbGFzIOWMheWQq+ePree6p1xuICAgKiBAcmV0dXJucyDlj6/op4Llr5/pg6jpl6jmoJFcbiAgICovXG4gIGRlcHQoY2xhczogYm9vbGVhbik6IE9ic2VydmFibGU8TnpUcmVlTm9kZU9wdGlvbnNbXT47XG4gIC8qKlxuICAgKiDpg6jpl6jmoJHmn6Xor6JcbiAgICpcbiAgICogQHBhcmFtIGNsYXMg5YyF5ZCr54+t57qnXG4gICAqIEBwYXJhbSBoaXMg5YyF5ZCr5Y6G5Y+y54+t57qnXG4gICAqIEByZXR1cm5zIOWPr+inguWvn+mDqOmXqOagkVxuICAgKi9cbiAgZGVwdChjbGFzOiBib29sZWFuLCBoaXM6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPE56VHJlZU5vZGVPcHRpb25zW10+O1xuICAvKipcbiAgICog6YOo6Zeo5qCR5p+l6K+iXG4gICAqXG4gICAqIEBwYXJhbSBjbGFzIOWMheWQq+ePree6p1xuICAgKiBAcGFyYW0gaGlzIOWMheWQq+WOhuWPsuePree6p1xuICAgKiBAcGFyYW0gZ3JhZGUg57O76YOoXG4gICAqIEByZXR1cm5zIOWPr+inguWvn+mDqOmXqOagkVxuICAgKi9cbiAgZGVwdChjbGFzOiBib29sZWFuLCBoaXM6IGJvb2xlYW4sIGdyYWRlOiBib29sZWFuKTogT2JzZXJ2YWJsZTxOelRyZWVOb2RlT3B0aW9uc1tdPjtcbiAgLyoqXG4gICAqIOmDqOmXqOagkeafpeivolxuICAgKlxuICAgKiBAcGFyYW0gY2xhcyDljIXlkKvnj63nuqdcbiAgICogQHBhcmFtIGhpcyDljIXlkKvljoblj7Lnj63nuqdcbiAgICogQHBhcmFtIGdyYWRlIOezu+mDqFxuICAgKiBAcGFyYW0gZ3JhZGVJRCDns7vpg6hJRFxuICAgKiBAcmV0dXJucyDlj6/op4Llr5/pg6jpl6jmoJFcbiAgICovXG4gIGRlcHQoY2xhczogYm9vbGVhbiwgaGlzOiBib29sZWFuLCBncmFkZTogYm9vbGVhbiwgZ3JhZGVJRDogc3RyaW5nIHwgbnVsbCk6IE9ic2VydmFibGU8TnpUcmVlTm9kZU9wdGlvbnNbXT47XG4gIC8qKlxuICAgKiDpg6jpl6jmoJHmn6Xor6JcbiAgICpcbiAgICogQHBhcmFtIGNsYXMg5YyF5ZCr54+t57qnXG4gICAqIEBwYXJhbSBoaXMg5YyF5ZCr5Y6G5Y+y54+t57qnXG4gICAqIEBwYXJhbSBncmFkZSDns7vpg6hcbiAgICogQHBhcmFtIGdyYWRlSUQg57O76YOoSURcbiAgICogQHJldHVybnMg5Y+v6KeC5a+f6YOo6Zeo5qCRXG4gICAqL1xuICBkZXB0KGNsYXM/OiBib29sZWFuLCBoaXM/OiBib29sZWFuLCBncmFkZT86IGJvb2xlYW4sIGdyYWRlSUQ/OiBzdHJpbmcgfCBudWxsKTogT2JzZXJ2YWJsZTxOelRyZWVOb2RlT3B0aW9uc1tdPiB7XG4gICAgbGV0IGJhc2VVcmwgPSBgL2F1dGgvYmFzZURlcGFydE1lbnQvdHJlZT9kZWJ1Zz1mYWxzZWA7XG5cbiAgICBpZiAoY2xhcykge1xuICAgICAgYmFzZVVybCArPSBgJmluY2x1ZGVDbGFzcz10cnVlYDtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzZVVybCArPSBgJmluY2x1ZGVDbGFzcz1mYWxzZWA7XG4gICAgfVxuXG4gICAgaWYgKGhpcykge1xuICAgICAgYmFzZVVybCArPSBgJmluY2x1ZGVIaXNDbGFzcz10cnVlYDtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzZVVybCArPSBgJmluY2x1ZGVIaXNDbGFzcz1mYWxzZWA7XG4gICAgfVxuXG4gICAgaWYgKGdyYWRlKSB7XG4gICAgICBiYXNlVXJsICs9IGAmZGVwdFR5cGVzPTIsY2xhc3NgO1xuICAgIH1cblxuICAgIGlmIChncmFkZUlEKSB7XG4gICAgICBiYXNlVXJsICs9IGAmZ3JhZGVJZD0ke2dyYWRlSUR9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhIHx8IFtdO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcGFnZTxVLCBUPih1cmk6IHN0cmluZywgcGFnZTogUGFnZTxVPik6IE9ic2VydmFibGU8UGFnZVJlczxUPj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt1cml9L3F1ZXJ5TGlzdEZvclBhZ2VgLCBwYWdlKTtcbiAgfVxuXG4gIHBhZ2VCYXNlVXNlcihwYWdlOiBQYWdlPEJhc2VVc2VyUGFyYW0+KTogT2JzZXJ2YWJsZTxQYWdlUmVzPE56U2FmZUFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdlPEJhc2VVc2VyUGFyYW0sIE56U2FmZUFueT4oJy9hdXRoL2Jhc2VVc2VyJywgcGFnZSk7XG4gIH1cblxuICBnZXRVc2VyQnlJZHMoaWRzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCgnL2F1dGgvYmFzZVVzZXIvdXNlcnMnLCB7XG4gICAgICAgIHVzZXJJZHM6IGlkc1xuICAgICAgfSlcbiAgICAgIC5waXBlKChyZXNwb25zZTogTnpTYWZlQW55KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhIHx8IFtdO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5p+l6K+i5Lq65ZGY5L+h5oGvXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWRzW10g55So5oi3aWTmlbDnu4QsW1wiYWFhXCIsXCJiYmJcIixcImNjY1wiXVxuICAgKi9cbiAgZ2V0VXNlckJ5VXNlcklkcyh1c2VySWRzOiBhbnkpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QoYC9hdXRoL2Jhc2VVc2VyL3VzZXJzYCwge1xuICAgICAgICB1c2VySWRzOiB1c2VySWRzXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhID8gcmVzcG9uc2UuZGF0YSA6IFtdO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bop5LoibLnu4Top5LoibJcbiAgICpcbiAgICogQHBhcmFtIHJvbGVHcm91cENvZGUg6KeS6Imy57uEY29kZVxuICAgKi9cbiAgZ2V0R3JvdXBSb2xlKHJvbGVHcm91cENvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8TnpUcmVlTm9kZU9wdGlvbnNbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KGAvYXV0aC9iYXNlUm9sZS9maW5kR3JvdXBSb2xlYCwge1xuICAgICAgICByb2xlR3JvdXBDb2RlOiByb2xlR3JvdXBDb2RlXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhID8gcmVzcG9uc2UuZGF0YSA6IFtdO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmn6Xor6LlvZPliY3nlKjmiLflpb3lj4vliIbnu4RcbiAgICovXG4gIGdldEZyaWVuZEdyb3VwKCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9jb250YWN0L2FwcGNvbnRhY3QvZmluZEdyb3VwYCwge30pLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgPyByZXNwb25zZS5kYXRhIDogW107XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog5p+l6K+i5bm057qnXG4gICAqL1xuICBnZXRHcmFkZSgpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC9hdXRoL2dyYWRlWWVhci9xdWVyeUxpc3RGb3JQYWdlYCkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSA/IHJlc3BvbnNlLmRhdGEgOiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmn6Xor6LkurrlkZjnsbvliKvliJfooahcbiAgICovXG4gIGdldFJ5bGJzKCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9hdXRoL2Jhc2VUZWFjaGVyL3F1ZXJ5UnlsYnNgLCB7fSkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IE56U2FmZUFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSA/IHJlc3BvbnNlLmRhdGEgOiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blrabnlJ/lhazlr5PmoJFcbiAgICpcbiAgICogQHBhcmFtIGlzUG93ZXIg5piv5ZCm5bim5pyJ5p2D6ZmQ77yM6buY6K6kZmFsc2VcbiAgICogQHBhcmFtIHRyZWVUeXBlIOagkeexu+WeiyAwOuWuv+iIjealvCAxOuWuv+iIjealvCvlsYIgMjrlrr/oiI3mpbwr5bGCK+aIv+mXtFxuICAgKi9cbiAgZ2V0RG9ybVRyZWUoaXNQb3dlcjogYm9vbGVhbiwgdHJlZVR5cGU6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBjb25zdCB1c2VyID0gdGhpcy5jYWNoZS5nZXQoJ195el91c2VyJywgeyBtb2RlOiAnbm9uZScgfSk7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgIGlmIChpc1Bvd2VyKSB7XG4gICAgICBwYXJhbXMgPSB7XG4gICAgICAgIGlzUG93ZXI6IGlzUG93ZXIsXG4gICAgICAgIHVzZXJJZDogdXNlci51c2VySWQsXG4gICAgICAgIHRyZWVUeXBlOiB0cmVlVHlwZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zID0ge1xuICAgICAgICBpc1Bvd2VyOiBpc1Bvd2VyLFxuICAgICAgICB0cmVlVHlwZTogdHJlZVR5cGVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAvYXV0aC9kb3JtL3RyZWVgLCBwYXJhbXMpLnBpcGUoXG4gICAgICBtYXAoKHJlc3BvbnNlOiBOelNhZmVBbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgPyByZXNwb25zZS5kYXRhIDogW107XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==