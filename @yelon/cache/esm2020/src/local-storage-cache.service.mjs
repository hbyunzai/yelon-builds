import { Platform } from '@angular/cdk/platform';
import { inject, InjectionToken } from '@angular/core';
export const DC_STORE_STORAGE_TOKEN = new InjectionToken('DC_STORE_STORAGE_TOKEN', {
    providedIn: 'root',
    factory: () => new LocalStorageCacheService(inject(Platform))
});
export class LocalStorageCacheService {
    constructor(platform) {
        this.platform = platform;
    }
    get(key) {
        if (!this.platform.isBrowser) {
            return null;
        }
        return JSON.parse(localStorage.getItem(key) || 'null') || null;
    }
    set(key, value) {
        if (!this.platform.isBrowser) {
            return true;
        }
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    remove(key) {
        if (!this.platform.isBrowser) {
            return;
        }
        localStorage.removeItem(key);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS1jYWNoZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY2FjaGUvc3JjL2xvY2FsLXN0b3JhZ2UtY2FjaGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJdkQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxjQUFjLENBQWMsd0JBQXdCLEVBQUU7SUFDOUYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksd0JBQXdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQzlELENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFFMUMsR0FBRyxDQUFDLEdBQVc7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNqRSxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFDRCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IGluamVjdCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUNhY2hlLCBJQ2FjaGVTdG9yZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IERDX1NUT1JFX1NUT1JBR0VfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48SUNhY2hlU3RvcmU+KCdEQ19TVE9SRV9TVE9SQUdFX1RPS0VOJywge1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIGZhY3Rvcnk6ICgpID0+IG5ldyBMb2NhbFN0b3JhZ2VDYWNoZVNlcnZpY2UoaW5qZWN0KFBsYXRmb3JtKSlcbn0pO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlQ2FjaGVTZXJ2aWNlIGltcGxlbWVudHMgSUNhY2hlU3RvcmUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkge31cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBJQ2FjaGUgfCBudWxsIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSB8fCAnbnVsbCcpIHx8IG51bGw7XG4gIH1cblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBJQ2FjaGUpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG59XG4iXX0=