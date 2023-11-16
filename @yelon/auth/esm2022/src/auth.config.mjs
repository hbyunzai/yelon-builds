export const AUTH_DEFAULT_CONFIG = {
    store_key: `_yz_token`,
    token_invalid_redirect: true,
    token_exp_offset: 10,
    token_send_key: `Authorization`,
    token_send_template: 'Bearer ${access_token}',
    token_send_place: 'header',
    login_url: '/login',
    ignores: [/\/login/, /assets\//, /passport\//, /\/auth\/oauth\/getOrCreateToken\/webapp/, /\/auth\/oauth\/token/],
    allow_anonymous_key: `_allow_anonymous`,
    executeOtherInterceptors: true,
    refreshTime: 3000,
    refreshOffset: 6000
};
export function mergeConfig(srv) {
    return srv.merge('auth', AUTH_DEFAULT_CONFIG);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hdXRoL3NyYy9hdXRoLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBcUI7SUFDbkQsU0FBUyxFQUFFLFdBQVc7SUFDdEIsc0JBQXNCLEVBQUUsSUFBSTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGNBQWMsRUFBRSxlQUFlO0lBQy9CLG1CQUFtQixFQUFFLHdCQUF3QjtJQUM3QyxnQkFBZ0IsRUFBRSxRQUFRO0lBQzFCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLHlDQUF5QyxFQUFFLHNCQUFzQixDQUFDO0lBQ2pILG1CQUFtQixFQUFFLGtCQUFrQjtJQUN2Qyx3QkFBd0IsRUFBRSxJQUFJO0lBQzlCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGFBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFFRixNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQXdCO0lBQ2xELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUUsQ0FBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBZdW56YWlBdXRoQ29uZmlnLCBZdW56YWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHllbG9uL3V0aWwvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IEFVVEhfREVGQVVMVF9DT05GSUc6IFl1bnphaUF1dGhDb25maWcgPSB7XG4gIHN0b3JlX2tleTogYF95el90b2tlbmAsXG4gIHRva2VuX2ludmFsaWRfcmVkaXJlY3Q6IHRydWUsXG4gIHRva2VuX2V4cF9vZmZzZXQ6IDEwLFxuICB0b2tlbl9zZW5kX2tleTogYEF1dGhvcml6YXRpb25gLFxuICB0b2tlbl9zZW5kX3RlbXBsYXRlOiAnQmVhcmVyICR7YWNjZXNzX3Rva2VufScsXG4gIHRva2VuX3NlbmRfcGxhY2U6ICdoZWFkZXInLFxuICBsb2dpbl91cmw6ICcvbG9naW4nLFxuICBpZ25vcmVzOiBbL1xcL2xvZ2luLywgL2Fzc2V0c1xcLy8sIC9wYXNzcG9ydFxcLy8sIC9cXC9hdXRoXFwvb2F1dGhcXC9nZXRPckNyZWF0ZVRva2VuXFwvd2ViYXBwLywgL1xcL2F1dGhcXC9vYXV0aFxcL3Rva2VuL10sXG4gIGFsbG93X2Fub255bW91c19rZXk6IGBfYWxsb3dfYW5vbnltb3VzYCxcbiAgZXhlY3V0ZU90aGVySW50ZXJjZXB0b3JzOiB0cnVlLFxuICByZWZyZXNoVGltZTogMzAwMCxcbiAgcmVmcmVzaE9mZnNldDogNjAwMFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKHNydjogWXVuemFpQ29uZmlnU2VydmljZSk6IFl1bnphaUF1dGhDb25maWcge1xuICByZXR1cm4gc3J2Lm1lcmdlKCdhdXRoJywgQVVUSF9ERUZBVUxUX0NPTkZJRykhO1xufVxuIl19