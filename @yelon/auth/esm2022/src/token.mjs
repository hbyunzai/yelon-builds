import { HttpContextToken } from '@angular/common/http';
/**
 * Whether to allow anonymous login
 *
 * 是否允许匿名登录
 *
 * @example
 * this.http.post(`login`, {
 *  name: 'yunzai-bot', pwd: '123456'
 * }, {
 *  context: new HttpContext().set(ALLOW_ANONYMOUS, true)
 * })
 */
export const ALLOW_ANONYMOUS = new HttpContextToken(() => false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hdXRoL3NyYy90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENvbnRleHRUb2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLyoqXG4gKiBXaGV0aGVyIHRvIGFsbG93IGFub255bW91cyBsb2dpblxuICpcbiAqIOaYr+WQpuWFgeiuuOWMv+WQjeeZu+W9lVxuICpcbiAqIEBleGFtcGxlXG4gKiB0aGlzLmh0dHAucG9zdChgbG9naW5gLCB7XG4gKiAgbmFtZTogJ3l1bnphaS1ib3QnLCBwd2Q6ICcxMjM0NTYnXG4gKiB9LCB7XG4gKiAgY29udGV4dDogbmV3IEh0dHBDb250ZXh0KCkuc2V0KEFMTE9XX0FOT05ZTU9VUywgdHJ1ZSlcbiAqIH0pXG4gKi9cbmV4cG9ydCBjb25zdCBBTExPV19BTk9OWU1PVVMgPSBuZXcgSHR0cENvbnRleHRUb2tlbigoKSA9PiBmYWxzZSk7XG4iXX0=