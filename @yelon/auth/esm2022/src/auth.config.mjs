export const AUTH_DEFAULT_CONFIG = {
    store_key: `_yz_token`,
    token_invalid_redirect: true,
    token_exp_offset: 10,
    token_send_key: `Authorization`,
    token_send_template: 'Bearer ${access_token}',
    token_send_place: 'header',
    login_url: '/login',
    ignores: [/\/login/, /\/assets\//, /passport\//, /\/auth\/oauth\/getOrCreateToken\/webapp/, /\/auth\/oauth\/token/],
    allow_anonymous_key: `_allow_anonymous`,
    refreshTime: 3000,
    refreshOffset: 6000
};
export function mergeConfig(srv) {
    return srv.merge('auth', AUTH_DEFAULT_CONFIG);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hdXRoL3NyYy9hdXRoLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBcUI7SUFDbkQsU0FBUyxFQUFFLFdBQVc7SUFDdEIsc0JBQXNCLEVBQUUsSUFBSTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxlQUFlO0lBQy9CLG1CQUFtQixFQUFFLHdCQUF3QjtJQUM3QyxnQkFBZ0IsRUFBRSxRQUFRO0lBQzFCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLHlDQUF5QyxFQUFFLHNCQUFzQixDQUFDO0lBQ25ILG1CQUFtQixFQUFFLGtCQUFrQjtJQUN2QyxXQUFXLEVBQUUsSUFBSTtJQUNqQixhQUFhLEVBQUUsSUFBSTtDQUNwQixDQUFDO0FBRUYsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUF3QjtJQUNsRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFFLENBQUM7QUFDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgWXVuemFpQXV0aENvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBBVVRIX0RFRkFVTFRfQ09ORklHOiBZdW56YWlBdXRoQ29uZmlnID0ge1xuICBzdG9yZV9rZXk6IGBfeXpfdG9rZW5gLFxuICB0b2tlbl9pbnZhbGlkX3JlZGlyZWN0OiB0cnVlLFxuICB0b2tlbl9leHBfb2Zmc2V0OiAxMCxcbiAgdG9rZW5fc2VuZF9rZXk6IGBBdXRob3JpemF0aW9uYCxcbiAgdG9rZW5fc2VuZF90ZW1wbGF0ZTogJ0JlYXJlciAke2FjY2Vzc190b2tlbn0nLFxuICB0b2tlbl9zZW5kX3BsYWNlOiAnaGVhZGVyJyxcbiAgbG9naW5fdXJsOiAnL2xvZ2luJyxcbiAgaWdub3JlczogWy9cXC9sb2dpbi8sIC9cXC9hc3NldHNcXC8vLCAvcGFzc3BvcnRcXC8vLCAvXFwvYXV0aFxcL29hdXRoXFwvZ2V0T3JDcmVhdGVUb2tlblxcL3dlYmFwcC8sIC9cXC9hdXRoXFwvb2F1dGhcXC90b2tlbi9dLFxuICBhbGxvd19hbm9ueW1vdXNfa2V5OiBgX2FsbG93X2Fub255bW91c2AsXG4gIHJlZnJlc2hUaW1lOiAzMDAwLFxuICByZWZyZXNoT2Zmc2V0OiA2MDAwXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25maWcoc3J2OiBZdW56YWlDb25maWdTZXJ2aWNlKTogWXVuemFpQXV0aENvbmZpZyB7XG4gIHJldHVybiBzcnYubWVyZ2UoJ2F1dGgnLCBBVVRIX0RFRkFVTFRfQ09ORklHKSE7XG59XG4iXX0=