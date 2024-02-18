import { HttpContextToken } from '@angular/common/http';
/**
 * Whether to customize the handling of exception messages
 *
 * 是否自定义处理异常消息
 *
 * @example
 * this.http.post(`login`, {
 *  name: 'yunzai-bot', pwd: '123456'
 * }, {
 *  context: new HttpContext()
 *              .set(ALLOW_ANONYMOUS, true)
 *              .set(CUSTOM_ERROR, true)
 * }).subscribe({
 *  next: console.log,
 *  error: console.log
 * });
 */
export const CUSTOM_ERROR = new HttpContextToken(() => false);
/**
 * Whether to ignore API prefixes
 *
 * 是否忽略API前缀
 *
 * @example
 * // When environment.api.baseUrl set '/api'
 *
 * this.http.get(`/path`) // Request Url: /api/path
 * this.http.get(`/path`, { context: new HttpContext().set(IGNORE_BASE_URL, true) }) // Request Url: /path
 */
export const IGNORE_BASE_URL = new HttpContextToken(() => false);
/**
 * Whether to return raw response body
 *
 * 是否原样返回请求Body
 */
export const RAW_BODY = new HttpContextToken(() => false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC50b2tlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3RoZW1lL3NyYy9zZXJ2aWNlcy9odHRwL2h0dHAudG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUU5RDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFakU7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENvbnRleHRUb2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLyoqXG4gKiBXaGV0aGVyIHRvIGN1c3RvbWl6ZSB0aGUgaGFuZGxpbmcgb2YgZXhjZXB0aW9uIG1lc3NhZ2VzXG4gKlxuICog5piv5ZCm6Ieq5a6a5LmJ5aSE55CG5byC5bi45raI5oGvXG4gKlxuICogQGV4YW1wbGVcbiAqIHRoaXMuaHR0cC5wb3N0KGBsb2dpbmAsIHtcbiAqICBuYW1lOiAneXVuemFpLWJvdCcsIHB3ZDogJzEyMzQ1NidcbiAqIH0sIHtcbiAqICBjb250ZXh0OiBuZXcgSHR0cENvbnRleHQoKVxuICogICAgICAgICAgICAgIC5zZXQoQUxMT1dfQU5PTllNT1VTLCB0cnVlKVxuICogICAgICAgICAgICAgIC5zZXQoQ1VTVE9NX0VSUk9SLCB0cnVlKVxuICogfSkuc3Vic2NyaWJlKHtcbiAqICBuZXh0OiBjb25zb2xlLmxvZyxcbiAqICBlcnJvcjogY29uc29sZS5sb2dcbiAqIH0pO1xuICovXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VSUk9SID0gbmV3IEh0dHBDb250ZXh0VG9rZW4oKCkgPT4gZmFsc2UpO1xuXG4vKipcbiAqIFdoZXRoZXIgdG8gaWdub3JlIEFQSSBwcmVmaXhlc1xuICpcbiAqIOaYr+WQpuW/veeVpUFQSeWJjee8gFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGVuIGVudmlyb25tZW50LmFwaS5iYXNlVXJsIHNldCAnL2FwaSdcbiAqXG4gKiB0aGlzLmh0dHAuZ2V0KGAvcGF0aGApIC8vIFJlcXVlc3QgVXJsOiAvYXBpL3BhdGhcbiAqIHRoaXMuaHR0cC5nZXQoYC9wYXRoYCwgeyBjb250ZXh0OiBuZXcgSHR0cENvbnRleHQoKS5zZXQoSUdOT1JFX0JBU0VfVVJMLCB0cnVlKSB9KSAvLyBSZXF1ZXN0IFVybDogL3BhdGhcbiAqL1xuZXhwb3J0IGNvbnN0IElHTk9SRV9CQVNFX1VSTCA9IG5ldyBIdHRwQ29udGV4dFRva2VuKCgpID0+IGZhbHNlKTtcblxuLyoqXG4gKiBXaGV0aGVyIHRvIHJldHVybiByYXcgcmVzcG9uc2UgYm9keVxuICpcbiAqIOaYr+WQpuWOn+agt+i/lOWbnuivt+axgkJvZHlcbiAqL1xuZXhwb3J0IGNvbnN0IFJBV19CT0RZID0gbmV3IEh0dHBDb250ZXh0VG9rZW4oKCkgPT4gZmFsc2UpO1xuIl19