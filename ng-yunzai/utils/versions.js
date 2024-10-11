"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeMainVersions = UpgradeMainVersions;
exports.addESLintRule = addESLintRule;
const workspace_1 = require("@schematics/angular/utility/workspace");
const lib_versions_1 = require("./lib-versions");
const package_1 = require("./package");
const workspace_2 = require("./workspace");
/**
 * 修复主要依赖的版本号
 */
function UpgradeMainVersions(tree, version = lib_versions_1.VERSION) {
    (0, package_1.addPackage)(tree, ['abc', 'acl', 'auth', 'cache', 'form', 'mock', 'theme', 'util', 'chart', 'bcs', 'bis', 'socket'].map(name => `@yelon/${name}@${version}`));
    (0, package_1.addPackage)(tree, [
        `@angular-eslint/builder@^18.3.0`,
        `@angular-eslint/eslint-plugin@^18.3.0`,
        `@angular-eslint/eslint-plugin-template@^18.3.0`,
        `@angular-eslint/schematics@^18.3.0`,
        `@angular-eslint/template-parser@^18.3.0`,
        `@typescript-eslint/eslint-plugin@^8.2.0`,
        `@typescript-eslint/parser@^8.2.0`,
        `eslint@^8.57.0`,
        `eslint-config-prettier@~9.1.0`,
        `eslint-plugin-import@~2.25.3`,
        `eslint-plugin-jsdoc@~50.2.2`,
        `eslint-plugin-prefer-arrow@~1.2.3`,
        `eslint-plugin-prettier@~5.2.1`,
        `eslint-plugin-deprecation@^3.0.0`,
        `prettier@^3.3.3`,
        `husky@^9.1.5`,
        `ng-yunzai@${version}`,
        `ng-yunzai-plugin-theme@latest`,
        `source-map-explorer@^2.5.3`,
        `@angular/language-service@^18.2.0`,
        `ngx-tinymce@^18.0.0`,
        `@stomp/rx-stomp@^2.0.0`,
        `@stomp/stompjs@^7.0.0`,
        `@ng-util/monaco-editor@^18.0.0`,
        `@yelon/testing@${version}`
    ], 'devDependencies');
    (0, package_1.addPackage)(tree, [`rxjs@~7.8.0`, `ng-zorro-antd@^18.1.1`]);
}
function addESLintRule(projectName) {
    return (0, workspace_1.updateWorkspace)((workspace) => __awaiter(this, void 0, void 0, function* () {
        const project = (0, workspace_2.getProjectFromWorkspace)(workspace, projectName);
        if (project == null)
            return;
        if (project.targets.has(workspace_2.BUILD_TARGET_LINT)) {
            project.targets.delete(workspace_2.BUILD_TARGET_LINT);
        }
        project.targets.set(workspace_2.BUILD_TARGET_LINT, {
            builder: '@angular-eslint/builder:lint',
            options: {
                lintFilePatterns: ['src/**/*.ts', 'src/**/*.html']
            }
        });
    }));
}
//# sourceMappingURL=versions.js.map