import { inject } from '@angular/core';
import { map } from 'rxjs';
import { _HttpClient } from '@yelon/theme';
export class YunzaiGradeService {
    constructor() {
        this.http = inject(_HttpClient);
    }
    grades() {
        return this.http.get(`/auth/gradeYear/queryListForPage`).pipe(map((response) => {
            return response.data;
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXVuemFpLWdyYWRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iY3MveXVuemFpLWdyYWRlL3l1bnphaS1ncmFkZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFBL0I7UUFDbUIsU0FBSSxHQUFnQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFTM0QsQ0FBQztJQVBDLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsSUFBSSxDQUMzRCxHQUFHLENBQUMsQ0FBQyxRQUF1QyxFQUFFLEVBQUU7WUFDOUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0B5ZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBZdW56YWlSZXNwb25zZSB9IGZyb20gJ0B5ZWxvbi91dGlsJztcblxuaW1wb3J0IHsgWXVuemFpR3JhZGUgfSBmcm9tICcuL3l1bnphaS1ncmFkZS50eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBZdW56YWlHcmFkZVNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGh0dHA6IF9IdHRwQ2xpZW50ID0gaW5qZWN0KF9IdHRwQ2xpZW50KTtcblxuICBncmFkZXMoKTogT2JzZXJ2YWJsZTxZdW56YWlHcmFkZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYC9hdXRoL2dyYWRlWWVhci9xdWVyeUxpc3RGb3JQYWdlYCkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IFl1bnphaVJlc3BvbnNlPFl1bnphaUdyYWRlW10+KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=