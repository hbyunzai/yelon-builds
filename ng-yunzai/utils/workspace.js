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
exports.DEFAULT_WORKSPACE_PATH = exports.NG_YUNZAI_JSON = exports.BUILD_TARGET_LINT = exports.BUILD_TARGET_SERVE = exports.BUILD_TARGET_TEST = exports.BUILD_TARGET_BUILD = void 0;
exports.getProjectName = getProjectName;
exports.getNgYunzaiJson = getNgYunzaiJson;
exports.writeNgYunzaiJson = writeNgYunzaiJson;
exports.isMulitProject = isMulitProject;
exports.getProject = getProject;
exports.addAssetsToTarget = addAssetsToTarget;
exports.addAllowedCommonJsDependencies = addAllowedCommonJsDependencies;
exports.removeAllowedCommonJsDependencies = removeAllowedCommonJsDependencies;
exports.addAllowSyntheticDefaultImports = addAllowSyntheticDefaultImports;
exports.getProjectFromWorkspace = getProjectFromWorkspace;
exports.getProjectTarget = getProjectTarget;
exports.addStylePreprocessorOptions = addStylePreprocessorOptions;
exports.addStyleResources = addStyleResources;
exports.addSchematicCollections = addSchematicCollections;
exports.addFileReplacements = addFileReplacements;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const json_1 = require("./json");
exports.BUILD_TARGET_BUILD = 'build';
exports.BUILD_TARGET_TEST = 'test';
exports.BUILD_TARGET_SERVE = 'serve';
exports.BUILD_TARGET_LINT = 'lint';
exports.NG_YUNZAI_JSON = `ng-yunzai.json`;
exports.DEFAULT_WORKSPACE_PATH = `/angular.json`;
function getProjectName(workspace, name) {
    var _a;
    if (name && workspace.projects.has(name)) {
        return name;
    }
    return (_a = Array.from(workspace.projects.keys()).pop()) !== null && _a !== void 0 ? _a : null;
}
function getNgYunzaiJson(tree) {
    if (!tree.exists(exports.NG_YUNZAI_JSON))
        return undefined;
    return (0, json_1.readJSON)(tree, exports.NG_YUNZAI_JSON);
}
function writeNgYunzaiJson(tree, json) {
    return (0, json_1.writeJSON)(tree, exports.NG_YUNZAI_JSON, json);
}
function isMulitProject(tree) {
    return !tree.exists('src/main.ts');
}
function getProject(tree, projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        projectName = getProjectName(workspace, projectName);
        if (!projectName || !workspace.projects.has(projectName)) {
            throw new schematics_1.SchematicsException(`No project named "${projectName}" exists.`);
        }
        const project = getProjectFromWorkspace(workspace, projectName);
        const yunzaiProject = (_c = ((_b = (_a = getNgYunzaiJson(tree)) === null || _a === void 0 ? void 0 : _a.projects) !== null && _b !== void 0 ? _b : {})[projectName]) !== null && _c !== void 0 ? _c : {};
        return { project, name: projectName, yunzaiProject };
    });
}
function addAssetsToTarget(resources, behavior, types = [exports.BUILD_TARGET_BUILD, exports.BUILD_TARGET_TEST], projectName, clean = false) {
    return (0, workspace_1.updateWorkspace)((workspace) => __awaiter(this, void 0, void 0, function* () {
        const project = getProjectFromWorkspace(workspace, projectName);
        types.forEach(buildTarget => {
            const targetOptions = getProjectTarget(project, buildTarget);
            const styles = targetOptions.styles;
            const scripts = targetOptions.scripts;
            for (const item of resources) {
                const list = item.type === 'script' ? scripts : styles;
                if (clean === true) {
                    list.length = 0;
                }
                if (behavior === 'add') {
                    if (!list.includes(item.value)) {
                        list.push(item.value);
                    }
                }
                else {
                    const idx = list.indexOf(item.value);
                    if (idx !== -1) {
                        list.splice(idx, 1);
                    }
                }
            }
        });
    }));
}
function addAllowedCommonJsDependencies(items, projectName) {
    return (0, workspace_1.updateWorkspace)((workspace) => __awaiter(this, void 0, void 0, function* () {
        const project = getProjectFromWorkspace(workspace, projectName);
        const targetOptions = getProjectTarget(project, exports.BUILD_TARGET_BUILD);
        let list = targetOptions.allowedCommonJsDependencies;
        if (!Array.isArray(list)) {
            list = [];
        }
        if (Array.isArray(items)) {
            list = [...list, ...items];
        }
        const result = new Set(list);
        ['ajv', 'ajv-formats', 'mockjs', 'file-saver', 'extend'].forEach(key => result.add(key));
        targetOptions.allowedCommonJsDependencies = Array.from(result).sort();
    }));
}
function removeAllowedCommonJsDependencies(key, projectName) {
    return (0, workspace_1.updateWorkspace)((workspace) => __awaiter(this, void 0, void 0, function* () {
        const project = getProjectFromWorkspace(workspace, projectName);
        const targetOptions = getProjectTarget(project, exports.BUILD_TARGET_BUILD);
        const list = targetOptions.allowedCommonJsDependencies;
        if (!Array.isArray(list)) {
            return;
        }
        const pos = list.indexOf(key);
        if (pos === -1)
            return;
        list.splice(pos, 1);
        targetOptions.allowedCommonJsDependencies = list.sort();
    }));
}
function addAllowSyntheticDefaultImports(value = true) {
    return (tree) => {
        (0, json_1.modifyJSON)(tree, 'tsconfig.json', { path: ['compilerOptions', 'allowSyntheticDefaultImports'], value });
        return tree;
    };
}
function getProjectFromWorkspace(workspace, projectName) {
    var _a;
    if (!projectName) {
        projectName = (_a = Array.from(workspace.projects.keys()).pop()) !== null && _a !== void 0 ? _a : null;
    }
    const project = workspace.projects.get(projectName);
    if (!project) {
        throw new schematics_1.SchematicsException(`Could not find project in workspace: ${projectName}`);
    }
    return project;
}
function getProjectTarget(project, buildTarget, type = 'options') {
    var _a, _b;
    const options = (_b = (_a = project.targets) === null || _a === void 0 ? void 0 : _a.get(buildTarget)) === null || _b === void 0 ? void 0 : _b[type];
    if (!options) {
        throw new schematics_1.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.${type}.`);
    }
    return options;
}
function addStylePreprocessorOptions(workspace, projectName) {
    var _a;
    const project = getProjectFromWorkspace(workspace, projectName);
    if (project == null)
        return;
    const build = project.targets.get(exports.BUILD_TARGET_BUILD);
    if (build == null || build.options == null)
        return;
    if (build.options.stylePreprocessorOptions == null) {
        build.options.stylePreprocessorOptions = {};
    }
    let includePaths = (_a = build.options.stylePreprocessorOptions['includePaths']) !== null && _a !== void 0 ? _a : [];
    if (!Array.isArray(includePaths))
        includePaths = [];
    if (includePaths.includes(`node_modules/`))
        return;
    includePaths.push(`node_modules/`);
    build.options.stylePreprocessorOptions['includePaths'] = includePaths;
}
function addStyleResources(workspace, projectName) {
    const project = getProjectFromWorkspace(workspace, projectName);
    if (project == null)
        return;
    const build = project.targets.get(exports.BUILD_TARGET_BUILD);
    if (build == null || build.options == null)
        return;
    if (!Array.isArray(build.options.assets))
        build.options.assets = [];
    build.options.assets.push(`src/assets`);
}
function addSchematicCollections(workspace) {
    const cli = workspace.extensions.cli;
    if (cli && cli.schematicCollections)
        return;
    if (cli == null)
        workspace.extensions.cli = {};
    let schematicCollections = workspace.extensions.cli['schematicCollections'];
    if (!Array.isArray(schematicCollections))
        schematicCollections = [];
    if (!schematicCollections.includes(`@schematics/angular`))
        schematicCollections.push(`@schematics/angular`);
    if (!schematicCollections.includes(`ng-yunzai`))
        schematicCollections.push(`ng-yunzai`);
    workspace.extensions.cli['schematicCollections'] = schematicCollections;
}
function addFileReplacements(workspace, projectName) {
    const project = getProjectFromWorkspace(workspace, projectName);
    if (project == null)
        return;
    const build = project.targets.get(exports.BUILD_TARGET_BUILD);
    if (build == null || build.options == null)
        return;
    if (build.configurations == null)
        build.configurations = {};
    if (build.configurations.production == null)
        build.configurations.production = {};
    if (!Array.isArray(build.configurations.production.fileReplacements))
        build.configurations.production.fileReplacements = [];
    build.configurations.production.fileReplacements.push({
        replace: 'src/environments/environment.ts',
        with: 'src/environments/environment.prod.ts'
    });
}
//# sourceMappingURL=workspace.js.map