import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ACL_DEFAULT_CONFIG } from './acl.config';
import * as i0 from "@angular/core";
import * as i1 from "@yelon/util/config";
/**
 * ACL 控制服务，[在线文档](https://ng.yunzainfo.com/acl)
 */
export class ACLService {
    /** ACL变更通知 */
    get change() {
        return this.aclChange.asObservable();
    }
    /** 获取所有数据 */
    get data() {
        return {
            full: this.full,
            roles: this.roles,
            abilities: this.abilities
        };
    }
    get guard_url() {
        return this.options.guard_url;
    }
    constructor(configSrv) {
        this.roles = [];
        this.abilities = [];
        this.full = false;
        this.aclChange = new BehaviorSubject(null);
        this.options = configSrv.merge('acl', ACL_DEFAULT_CONFIG);
    }
    parseACLType(val) {
        let t;
        if (typeof val === 'number') {
            t = { ability: [val] };
        }
        else if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'number') {
            t = { ability: val };
        }
        else if (typeof val === 'object' && !Array.isArray(val)) {
            t = { ...val };
        }
        else if (Array.isArray(val)) {
            t = { role: val };
        }
        else {
            t = { role: val == null ? [] : [val] };
        }
        return { except: false, ...t };
    }
    /**
     * 设置当前用户角色或权限能力（会先清除所有）
     */
    set(value) {
        this.full = false;
        this.abilities = [];
        this.roles = [];
        this.add(value);
        this.aclChange.next(value);
    }
    /**
     * 标识当前用户为全量，即不受限
     */
    setFull(val) {
        this.full = val;
        this.aclChange.next(val);
    }
    /**
     * 设置当前用户权限能力（会先清除所有）
     */
    setAbility(abilities) {
        this.set({ ability: abilities });
    }
    /**
     * 设置当前用户角色（会先清除所有）
     */
    setRole(roles) {
        this.set({ role: roles });
    }
    /**
     * 为当前用户增加角色或权限能力
     */
    add(value) {
        if (value.role && value.role.length > 0) {
            this.roles.push(...value.role);
        }
        if (value.ability && value.ability.length > 0) {
            this.abilities.push(...value.ability);
        }
    }
    /**
     * 为当前用户附加角色
     */
    attachRole(roles) {
        for (const val of roles) {
            if (!this.roles.includes(val)) {
                this.roles.push(val);
            }
        }
        this.aclChange.next(this.data);
    }
    /**
     * 为当前用户附加权限
     */
    attachAbility(abilities) {
        for (const val of abilities) {
            if (!this.abilities.includes(val)) {
                this.abilities.push(val);
            }
        }
        this.aclChange.next(this.data);
    }
    /**
     * 为当前用户移除角色
     */
    removeRole(roles) {
        for (const val of roles) {
            const idx = this.roles.indexOf(val);
            if (idx !== -1) {
                this.roles.splice(idx, 1);
            }
        }
        this.aclChange.next(this.data);
    }
    /**
     * 为当前用户移除权限
     */
    removeAbility(abilities) {
        for (const val of abilities) {
            const idx = this.abilities.indexOf(val);
            if (idx !== -1) {
                this.abilities.splice(idx, 1);
            }
        }
        this.aclChange.next(this.data);
    }
    /**
     * 当前用户是否有对应角色，其实 `number` 表示Ability
     *
     * - 当 `full: true` 或参数 `null` 时返回 `true`
     * - 若使用 `ACLType` 参数，可以指定 `mode` 校验模式
     */
    can(roleOrAbility) {
        const { preCan } = this.options;
        if (preCan) {
            roleOrAbility = preCan(roleOrAbility);
        }
        const t = this.parseACLType(roleOrAbility);
        let result = false;
        if (this.full === true || !roleOrAbility) {
            result = true;
        }
        else {
            if (t.role && t.role.length > 0) {
                if (t.mode === 'allOf') {
                    result = t.role.every(v => this.roles.includes(v));
                }
                else {
                    result = t.role.some(v => this.roles.includes(v));
                }
            }
            if (t.ability && t.ability.length > 0) {
                if (t.mode === 'allOf') {
                    result = t.ability.every(v => this.abilities.includes(v));
                }
                else {
                    result = t.ability.some(v => this.abilities.includes(v));
                }
            }
        }
        return t.except === true ? !result : result;
    }
    /** @inner */
    parseAbility(value) {
        if (typeof value === 'number' || typeof value === 'string' || Array.isArray(value)) {
            value = { ability: Array.isArray(value) ? value : [value] };
        }
        delete value.role;
        return value;
    }
    /**
     * 当前用户是否有对应权限点
     */
    canAbility(value) {
        return this.can(this.parseAbility(value));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: ACLService, deps: [{ token: i1.YunzaiConfigService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: ACLService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: ACLService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.YunzaiConfigService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hY2wvc3JjL2FjbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUdsRDs7R0FFRztBQUVILE1BQU0sT0FBTyxVQUFVO0lBT3JCLGNBQWM7SUFDZCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELGFBQWE7SUFDYixJQUFJLElBQUk7UUFDTixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELFlBQVksU0FBOEI7UUF2QmxDLFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsY0FBUyxHQUEyQixFQUFFLENBQUM7UUFDdkMsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDLENBQUM7UUFxQnRFLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRU8sWUFBWSxDQUFDLEdBQTJEO1FBQzlFLElBQUksQ0FBVSxDQUFDO1FBQ2YsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM1QixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3pCLENBQUM7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7YUFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxRCxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM5QixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBZSxFQUFFLENBQUM7UUFDaEMsQ0FBQzthQUFNLENBQUM7WUFDTixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDekMsQ0FBQztRQUVELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLEtBQWM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsR0FBWTtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVLENBQUMsU0FBaUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQWEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxLQUFlO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFhLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxHQUFHLENBQUMsS0FBYztRQUNoQixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQWU7UUFDeEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYSxDQUFDLFNBQWlDO1FBQzdDLEtBQUssTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVUsQ0FBQyxLQUFlO1FBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYSxDQUFDLFNBQWlDO1FBQzdDLEtBQUssTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLGFBQWdDO1FBQ2xDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoQixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO29CQUN2QixNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztvQkFDdkIsTUFBTSxHQUFJLENBQUMsQ0FBQyxPQUFrQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLEdBQUksQ0FBQyxDQUFDLE9BQWtDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkYsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM5QyxDQUFDO0lBRUQsYUFBYTtJQUNiLFlBQVksQ0FBQyxLQUFpQjtRQUM1QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ25GLEtBQUssR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQWEsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQWlCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs4R0EvTFUsVUFBVTtrSEFBVixVQUFVLGNBREcsTUFBTTs7MkZBQ25CLFVBQVU7a0JBRHRCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFl1bnphaUFDTENvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmltcG9ydCB7IEFDTF9ERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vYWNsLmNvbmZpZyc7XG5pbXBvcnQgeyBBQ0xDYW5UeXBlLCBBQ0xUeXBlIH0gZnJvbSAnLi9hY2wudHlwZSc7XG5cbi8qKlxuICogQUNMIOaOp+WItuacjeWKoe+8jFvlnKjnur/mlofmoaNdKGh0dHBzOi8vbmcueXVuemFpbmZvLmNvbS9hY2wpXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQUNMU2VydmljZSB7XG4gIHByaXZhdGUgb3B0aW9uczogWXVuemFpQUNMQ29uZmlnO1xuICBwcml2YXRlIHJvbGVzOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGFiaWxpdGllczogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPiA9IFtdO1xuICBwcml2YXRlIGZ1bGwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBhY2xDaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFDTFR5cGUgfCBib29sZWFuIHwgbnVsbD4obnVsbCk7XG5cbiAgLyoqIEFDTOWPmOabtOmAmuefpSAqL1xuICBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8QUNMVHlwZSB8IGJvb2xlYW4gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuYWNsQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqIOiOt+WPluaJgOacieaVsOaNriAqL1xuICBnZXQgZGF0YSgpOiB7IGZ1bGw6IGJvb2xlYW47IHJvbGVzOiBzdHJpbmdbXTsgYWJpbGl0aWVzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IH0ge1xuICAgIHJldHVybiB7XG4gICAgICBmdWxsOiB0aGlzLmZ1bGwsXG4gICAgICByb2xlczogdGhpcy5yb2xlcyxcbiAgICAgIGFiaWxpdGllczogdGhpcy5hYmlsaXRpZXNcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGd1YXJkX3VybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ3VhcmRfdXJsITtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZ1NydjogWXVuemFpQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMub3B0aW9ucyA9IGNvbmZpZ1Nydi5tZXJnZSgnYWNsJywgQUNMX0RFRkFVTFRfQ09ORklHKSE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQUNMVHlwZSh2YWw6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVtYmVyIHwgbnVtYmVyW10gfCBBQ0xUeXBlIHwgbnVsbCk6IEFDTFR5cGUge1xuICAgIGxldCB0OiBBQ0xUeXBlO1xuICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgdCA9IHsgYWJpbGl0eTogW3ZhbF0gfTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID4gMCAmJiB0eXBlb2YgdmFsWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgdCA9IHsgYWJpbGl0eTogdmFsIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB0ID0geyAuLi52YWwgfTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdCA9IHsgcm9sZTogdmFsIGFzIHN0cmluZ1tdIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHQgPSB7IHJvbGU6IHZhbCA9PSBudWxsID8gW10gOiBbdmFsXSB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IGV4Y2VwdDogZmFsc2UsIC4uLnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7lvZPliY3nlKjmiLfop5LoibLmiJbmnYPpmZDog73lipvvvIjkvJrlhYjmuIXpmaTmiYDmnInvvIlcbiAgICovXG4gIHNldCh2YWx1ZTogQUNMVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuZnVsbCA9IGZhbHNlO1xuICAgIHRoaXMuYWJpbGl0aWVzID0gW107XG4gICAgdGhpcy5yb2xlcyA9IFtdO1xuICAgIHRoaXMuYWRkKHZhbHVlKTtcbiAgICB0aGlzLmFjbENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmoIfor4blvZPliY3nlKjmiLfkuLrlhajph4/vvIzljbPkuI3lj5fpmZBcbiAgICovXG4gIHNldEZ1bGwodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5mdWxsID0gdmFsO1xuICAgIHRoaXMuYWNsQ2hhbmdlLm5leHQodmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7lvZPliY3nlKjmiLfmnYPpmZDog73lipvvvIjkvJrlhYjmuIXpmaTmiYDmnInvvIlcbiAgICovXG4gIHNldEFiaWxpdHkoYWJpbGl0aWVzOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+KTogdm9pZCB7XG4gICAgdGhpcy5zZXQoeyBhYmlsaXR5OiBhYmlsaXRpZXMgfSBhcyBBQ0xUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7lvZPliY3nlKjmiLfop5LoibLvvIjkvJrlhYjmuIXpmaTmiYDmnInvvIlcbiAgICovXG4gIHNldFJvbGUocm9sZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoeyByb2xlOiByb2xlcyB9IGFzIEFDTFR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIOS4uuW9k+WJjeeUqOaIt+WinuWKoOinkuiJsuaIluadg+mZkOiDveWKm1xuICAgKi9cbiAgYWRkKHZhbHVlOiBBQ0xUeXBlKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlLnJvbGUgJiYgdmFsdWUucm9sZS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJvbGVzLnB1c2goLi4udmFsdWUucm9sZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZS5hYmlsaXR5ICYmIHZhbHVlLmFiaWxpdHkubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hYmlsaXRpZXMucHVzaCguLi52YWx1ZS5hYmlsaXR5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Li65b2T5YmN55So5oi36ZmE5Yqg6KeS6ImyXG4gICAqL1xuICBhdHRhY2hSb2xlKHJvbGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgdmFsIG9mIHJvbGVzKSB7XG4gICAgICBpZiAoIXRoaXMucm9sZXMuaW5jbHVkZXModmFsKSkge1xuICAgICAgICB0aGlzLnJvbGVzLnB1c2godmFsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hY2xDaGFuZ2UubmV4dCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIOS4uuW9k+WJjeeUqOaIt+mZhOWKoOadg+mZkFxuICAgKi9cbiAgYXR0YWNoQWJpbGl0eShhYmlsaXRpZXM6IEFycmF5PG51bWJlciB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHZhbCBvZiBhYmlsaXRpZXMpIHtcbiAgICAgIGlmICghdGhpcy5hYmlsaXRpZXMuaW5jbHVkZXModmFsKSkge1xuICAgICAgICB0aGlzLmFiaWxpdGllcy5wdXNoKHZhbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWNsQ2hhbmdlLm5leHQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDkuLrlvZPliY3nlKjmiLfnp7vpmaTop5LoibJcbiAgICovXG4gIHJlbW92ZVJvbGUocm9sZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCB2YWwgb2Ygcm9sZXMpIHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMucm9sZXMuaW5kZXhPZih2YWwpO1xuICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5yb2xlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hY2xDaGFuZ2UubmV4dCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIOS4uuW9k+WJjeeUqOaIt+enu+mZpOadg+mZkFxuICAgKi9cbiAgcmVtb3ZlQWJpbGl0eShhYmlsaXRpZXM6IEFycmF5PG51bWJlciB8IHN0cmluZz4pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHZhbCBvZiBhYmlsaXRpZXMpIHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuYWJpbGl0aWVzLmluZGV4T2YodmFsKTtcbiAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWJpbGl0aWVzLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFjbENoYW5nZS5uZXh0KHRoaXMuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICog5b2T5YmN55So5oi35piv5ZCm5pyJ5a+55bqU6KeS6Imy77yM5YW25a6eIGBudW1iZXJgIOihqOekukFiaWxpdHlcbiAgICpcbiAgICogLSDlvZMgYGZ1bGw6IHRydWVgIOaIluWPguaVsCBgbnVsbGAg5pe26L+U5ZueIGB0cnVlYFxuICAgKiAtIOiLpeS9v+eUqCBgQUNMVHlwZWAg5Y+C5pWw77yM5Y+v5Lul5oyH5a6aIGBtb2RlYCDmoKHpqozmqKHlvI9cbiAgICovXG4gIGNhbihyb2xlT3JBYmlsaXR5OiBBQ0xDYW5UeXBlIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgcHJlQ2FuIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKHByZUNhbikge1xuICAgICAgcm9sZU9yQWJpbGl0eSA9IHByZUNhbihyb2xlT3JBYmlsaXR5ISk7XG4gICAgfVxuXG4gICAgY29uc3QgdCA9IHRoaXMucGFyc2VBQ0xUeXBlKHJvbGVPckFiaWxpdHkpO1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5mdWxsID09PSB0cnVlIHx8ICFyb2xlT3JBYmlsaXR5KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodC5yb2xlICYmIHQucm9sZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0Lm1vZGUgPT09ICdhbGxPZicpIHtcbiAgICAgICAgICByZXN1bHQgPSB0LnJvbGUuZXZlcnkodiA9PiB0aGlzLnJvbGVzLmluY2x1ZGVzKHYpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgPSB0LnJvbGUuc29tZSh2ID0+IHRoaXMucm9sZXMuaW5jbHVkZXModikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodC5hYmlsaXR5ICYmIHQuYWJpbGl0eS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0Lm1vZGUgPT09ICdhbGxPZicpIHtcbiAgICAgICAgICByZXN1bHQgPSAodC5hYmlsaXR5IGFzIEFycmF5PG51bWJlciB8IHN0cmluZz4pLmV2ZXJ5KHYgPT4gdGhpcy5hYmlsaXRpZXMuaW5jbHVkZXModikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9ICh0LmFiaWxpdHkgYXMgQXJyYXk8bnVtYmVyIHwgc3RyaW5nPikuc29tZSh2ID0+IHRoaXMuYWJpbGl0aWVzLmluY2x1ZGVzKHYpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0LmV4Y2VwdCA9PT0gdHJ1ZSA/ICFyZXN1bHQgOiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGlubmVyICovXG4gIHBhcnNlQWJpbGl0eSh2YWx1ZTogQUNMQ2FuVHlwZSk6IEFDTENhblR5cGUge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0geyBhYmlsaXR5OiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXSB9IGFzIEFDTFR5cGU7XG4gICAgfVxuICAgIGRlbGV0ZSB2YWx1ZS5yb2xlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlvZPliY3nlKjmiLfmmK/lkKbmnInlr7nlupTmnYPpmZDngrlcbiAgICovXG4gIGNhbkFiaWxpdHkodmFsdWU6IEFDTENhblR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jYW4odGhpcy5wYXJzZUFiaWxpdHkodmFsdWUpKTtcbiAgfVxufVxuIl19