"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceProvideConfig = void 0;
const utils_1 = require("../../../utils");
function replaceProvideConfig() {
    return (tree, context) => {
        const angularJson = (0, utils_1.readJSON)(tree, utils_1.DEFAULT_WORKSPACE_PATH);
        const projectNames = Object.keys(angularJson.projects);
        (0, utils_1.logInfo)(context, `Use provider style (TIPS: References need to be fixed manually)`);
        for (const name of projectNames) {
            runYunzai(tree, name, angularJson.projects[name].sourceRoot, context);
            runZorro(tree, name, angularJson.projects[name].sourceRoot, context);
            yelonMock(tree, name, angularJson.projects[name].sourceRoot, context);
        }
    };
}
exports.replaceProvideConfig = replaceProvideConfig;
function runYunzai(tree, name, sourceRoot, context) {
    const filePath = `${sourceRoot}/app/global-config.module.ts`;
    if (!tree.exists(filePath))
        return;
    const text = '{ provide: YUNZAI_CONFIG, useValue: yunzaiConfig }';
    const content = tree
        .readText(filePath)
        .replace(text, 'provideYunzai({ config: yunzaiConfig })')
        .replace('YunzaiThemeModule', 'provideYunzai');
    tree.overwrite(filePath, content);
    (0, utils_1.logInfo)(context, `  Use provideYunzai instead of YUNZAI_CONFIG in ${name} project`);
}
function runZorro(tree, name, sourceRoot, context) {
    const filePath = `${sourceRoot}/app/global-config.module.ts`;
    if (!tree.exists(filePath))
        return;
    const text = '{ provide: provideNzConfig, useValue: ngZorroConfig }';
    const content = tree.readText(filePath).replace(text, 'provideNzConfig(ngZorroConfig)');
    tree.overwrite(filePath, content);
    (0, utils_1.logInfo)(context, `  Use provideNzConfig instead of NzConfig in ${name} project`);
}
function yelonMock(tree, name, sourceRoot, context) {
    const filePath = `${sourceRoot}/environments/environment.ts`;
    if (!tree.exists(filePath))
        return;
    const text = 'YelonMockModule.forRoot({ data: MOCKDATA })';
    let content = tree.readText(filePath);
    if (content.includes(text))
        content = content.replace(text, '');
    content = content
        .replace('modules: [', 'providers: [provideMockConfig({ data: MOCKDATA })], \ninterceptorFns: [mockInterceptor],\nmodules: [')
        .replace('YelonMockModule', 'provideMockConfig, mockInterceptor');
    tree.overwrite(filePath, content);
    // remove HttpClientModule
    let useAuthType = '';
    const appModuleFile = `${sourceRoot}/app/app.module.ts`;
    if (tree.exists(appModuleFile)) {
        let appModuleContent = tree.readText(appModuleFile);
        if (appModuleContent.includes('JWTInterceptor')) {
            useAuthType = 'jwt';
            appModuleContent = appModuleContent
                .replace(`{ provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }`, `// { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }`)
                .replace(`import { JWTInterceptor } from '@yelon/auth';`, `// import { JWTInterceptor } from '@yelon/auth';`);
        }
        else if (appModuleContent.includes('SimpleInterceptor')) {
            useAuthType = 'simple';
            appModuleContent = appModuleContent
                .replace(`{ provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true }`, `// { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true }`)
                .replace(`import { SimpleInterceptor } from '@yelon/auth';`, `// import { SimpleInterceptor } from '@yelon/auth';`);
        }
        appModuleContent = appModuleContent
            .replace(`import { HttpClientModule } from '@angular/common/http';`, '')
            .replace(/HttpClientModule,?/g, '');
        tree.overwrite(appModuleFile, appModuleContent);
    }
    const globalFile = `${sourceRoot}/app/global-config.module.ts`;
    if (tree.exists(globalFile)) {
        // SimpleInterceptor -> authSimpleInterceptor
        // JWTInterceptor -> authJWTInterceptor
        let globalContent = tree.readText(globalFile);
        let authInterceptor = '';
        if (useAuthType === 'jwt') {
            authInterceptor = ', authJWTInterceptor';
        }
        else if (useAuthType === 'simple') {
            authInterceptor = ', authSimpleInterceptor';
        }
        tree.overwrite(globalFile, globalContent.replace(', ...zorroProvides', `, ...zorroProvides, ...(environment.providers || []), \nprovideHttpClient(withInterceptors([...(environment.interceptorFns || [])${authInterceptor}]), withInterceptorsFromDi())`));
    }
    (0, utils_1.logInfo)(context, `  Use provideMockConfig instead of YelonMockModule in ${name} project`);
}
//# sourceMappingURL=replaceProvideConfig.js.map