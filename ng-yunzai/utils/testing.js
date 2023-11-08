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
exports.createTestApp = exports.createYunzaiAndModuleApp = exports.createYunzaiApp = exports.createYunzaiRunner = exports.createNgRunner = exports.FILE_PREFIX = exports.APPNAME = exports.migrationCollection = exports.collectionPath = void 0;
const testing_1 = require("@angular-devkit/schematics/testing");
const path_1 = require("path");
/** Path to the collection file for the Material schematics */
exports.collectionPath = (0, path_1.join)(__dirname, '..', 'collection.json');
/** Path to the migration file for the Material update schematics */
exports.migrationCollection = (0, path_1.join)(__dirname, '..', 'migration.json');
exports.APPNAME = 'foo';
exports.FILE_PREFIX = `/projects/${exports.APPNAME}`;
function createNgRunner() {
    return new testing_1.SchematicTestRunner('schematics', (0, path_1.join)('./node_modules/@schematics/angular/collection.json'));
}
exports.createNgRunner = createNgRunner;
function createYunzaiRunner() {
    return new testing_1.SchematicTestRunner('schematics', exports.collectionPath);
}
exports.createYunzaiRunner = createYunzaiRunner;
function createYunzaiApp(ngAddOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseRunner = createNgRunner();
        const workspaceTree = yield baseRunner.runSchematic('workspace', {
            name: 'workspace',
            newProjectRoot: 'projects',
            version: '8.0.0'
        });
        const appTree = yield baseRunner.runSchematic('application', {
            name: exports.APPNAME,
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
            skipTests: false,
            skipPackageJson: false
        }, workspaceTree);
        const yunzaiRunner = createYunzaiRunner();
        const tree = yield yunzaiRunner.runSchematic('ng-add', Object.assign({ skipPackageJson: false }, ngAddOptions), appTree);
        return { runner: yunzaiRunner, tree };
    });
}
exports.createYunzaiApp = createYunzaiApp;
function createYunzaiAndModuleApp(name = 'trade', ngAddOptions, yunzaiData) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield createYunzaiApp(ngAddOptions);
        if (yunzaiData != null) {
            res.tree.create('ng-yunzai.json', JSON.stringify(yunzaiData));
        }
        res.tree = yield res.runner.runSchematic('module', { name, project: exports.APPNAME, routing: true }, res.tree);
        return res;
    });
}
exports.createYunzaiAndModuleApp = createYunzaiAndModuleApp;
function createTestApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const runner = yield createNgRunner();
        const workspaceTree = yield runner.runSchematic('workspace', {
            name: 'workspace',
            newProjectRoot: 'projects',
            version: '8.0.0'
        });
        const appTree = yield runner.runSchematic('application', {
            name: exports.APPNAME,
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
            skipTests: false,
            skipPackageJson: false
        }, workspaceTree);
        return { runner, tree: appTree };
    });
}
exports.createTestApp = createTestApp;
//# sourceMappingURL=testing.js.map