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
exports.v20Rule = v20Rule;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const utils_1 = require("../../../utils");
const versions_1 = require("../../../utils/versions");
function finished() {
    return (_tree, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        (0, utils_1.logFinished)(context, `Congratulations, Abort more detail please refer to upgrade guide https://github.com/hbyunzai/ng-yunzai/issues`);
    };
}
function v20Rule() {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        (0, versions_1.UpgradeMainVersions)(tree);
        (0, utils_1.logInfo)(context, `Upgrade dependency version number`);
        return (0, schematics_1.chain)([finished()]);
    });
}
//# sourceMappingURL=index.js.map