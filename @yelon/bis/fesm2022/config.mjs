const BUSINESS_DEFAULT_CONFIG = {
    baseUrl: '/backstage',
    systemCode: 'portal',
    nav: {
        mine: true,
        all: true
    },
    loginForm: null,
    refreshTokenEnabled: true,
    refreshTokenType: 're-request'
};
function mergeBisConfig(srv) {
    return srv.merge('bis', BUSINESS_DEFAULT_CONFIG);
}

/**
 * Generated bundle index. Do not edit.
 */

export { BUSINESS_DEFAULT_CONFIG, mergeBisConfig };
//# sourceMappingURL=config.mjs.map
