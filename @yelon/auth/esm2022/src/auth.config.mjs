export const AUTH_DEFAULT_CONFIG = {
    store_key: `_token`,
    token_invalid_redirect: true,
    token_exp_offset: 10,
    token_send_key: `token`,
    token_send_template: '${token}',
    token_send_place: 'header',
    login_url: '/login',
    refreshTime: 3000,
    refreshOffset: 6000
};
export function mergeConfig(srv) {
    return srv.merge('auth', AUTH_DEFAULT_CONFIG);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hdXRoL3NyYy9hdXRoLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBcUI7SUFDbkQsU0FBUyxFQUFFLFFBQVE7SUFDbkIsc0JBQXNCLEVBQUUsSUFBSTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLG1CQUFtQixFQUFFLFVBQVU7SUFDL0IsZ0JBQWdCLEVBQUUsUUFBUTtJQUMxQixTQUFTLEVBQUUsUUFBUTtJQUNuQixXQUFXLEVBQUUsSUFBSTtJQUNqQixhQUFhLEVBQUUsSUFBSTtDQUNwQixDQUFDO0FBRUYsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUF3QjtJQUNsRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFFLENBQUM7QUFDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgWXVuemFpQXV0aENvbmZpZywgWXVuemFpQ29uZmlnU2VydmljZSB9IGZyb20gJ0B5ZWxvbi91dGlsL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBBVVRIX0RFRkFVTFRfQ09ORklHOiBZdW56YWlBdXRoQ29uZmlnID0ge1xuICBzdG9yZV9rZXk6IGBfdG9rZW5gLFxuICB0b2tlbl9pbnZhbGlkX3JlZGlyZWN0OiB0cnVlLFxuICB0b2tlbl9leHBfb2Zmc2V0OiAxMCxcbiAgdG9rZW5fc2VuZF9rZXk6IGB0b2tlbmAsXG4gIHRva2VuX3NlbmRfdGVtcGxhdGU6ICcke3Rva2VufScsXG4gIHRva2VuX3NlbmRfcGxhY2U6ICdoZWFkZXInLFxuICBsb2dpbl91cmw6ICcvbG9naW4nLFxuICByZWZyZXNoVGltZTogMzAwMCxcbiAgcmVmcmVzaE9mZnNldDogNjAwMFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKHNydjogWXVuemFpQ29uZmlnU2VydmljZSk6IFl1bnphaUF1dGhDb25maWcge1xuICByZXR1cm4gc3J2Lm1lcmdlKCdhdXRoJywgQVVUSF9ERUZBVUxUX0NPTkZJRykhO1xufVxuIl19