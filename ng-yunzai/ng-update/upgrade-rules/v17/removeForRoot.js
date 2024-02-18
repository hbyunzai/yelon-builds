"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeForRoot = void 0;
const utils_1 = require("../../../utils");
function removeForRoot() {
    return (tree, context) => {
        const angularJson = (0, utils_1.readJSON)(tree, utils_1.DEFAULT_WORKSPACE_PATH);
        const projectNames = Object.keys(angularJson.projects);
        for (const name of projectNames) {
            const sourceRoot = angularJson.projects[name].sourceRoot;
            removeYunzaiThemeForRoot(tree, name, sourceRoot, context);
            removeYunzaiThemeForChild(tree, name, sourceRoot, context);
            removeYelonACLModuleForRoot(tree, name, sourceRoot, context);
        }
    };
}
exports.removeForRoot = removeForRoot;
function removeYunzaiThemeForRoot(tree, name, sourceRoot, context) {
    const modulePath = `${sourceRoot}/app/global-config.module.ts`;
    if (!tree.exists(modulePath))
        return;
    const content = tree.readText(modulePath).replace(/YunzaiThemeModule\.forRoot\(\),?/g, '');
    tree.overwrite(modulePath, content);
    (0, utils_1.logInfo)(context, `Remove YunzaiThemeModule.forRoot in ${name} project`);
}
function removeYunzaiThemeForChild(tree, name, sourceRoot, context) {
    const forChild = 'YunzaiThemeModule.forChild()';
    tree.visit((path, entry) => {
        if (!entry || !path.endsWith('.ts') || !path.startsWith(sourceRoot))
            return;
        const content = tree.readText(path);
        if (!content.includes(forChild))
            return;
        tree.overwrite(path, content.replace(forChild, 'YunzaiThemeModule'));
    });
    (0, utils_1.logInfo)(context, `Remove ${forChild} in ${name} project`);
}
function removeYelonACLModuleForRoot(tree, name, sourceRoot, context) {
    const modulePath = `${sourceRoot}/app/global-config.module.ts`;
    if (!tree.exists(modulePath))
        return;
    const forRoot = 'YelonACLModule.forRoot()';
    const content = tree.readText(modulePath);
    tree.overwrite(modulePath, content.replace(/YelonACLModule\.forRoot\(\),?/g, ''));
    (0, utils_1.logInfo)(context, `Remove ${forRoot} in ${name} project`);
}
//# sourceMappingURL=removeForRoot.js.map