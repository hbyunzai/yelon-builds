"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRegisterFormWidgets = void 0;
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_1 = require("../../../utils");
function autoRegisterFormWidgets() {
    return (tree, context) => {
        const angularJson = (0, utils_1.readJSON)(tree, utils_1.DEFAULT_WORKSPACE_PATH);
        const projectNames = Object.keys(angularJson.projects);
        for (const name of projectNames) {
            autoRegisterFormWidgetsRun(tree, name, angularJson.projects[name].sourceRoot, context);
        }
    };
}
exports.autoRegisterFormWidgets = autoRegisterFormWidgets;
function autoRegisterFormWidgetsRun(tree, name, sourceRoot, context) {
    const modulePath = `${sourceRoot}/app/shared/json-schema/json-schema.module.ts`;
    if (!tree.exists(modulePath))
        return;
    const list = [
        { symbolName: 'AutoCompleteWidgetModule', fileName: '@yelon/form/widgets/autocomplete' },
        { symbolName: 'CascaderWidgetModule', fileName: '@yelon/form/widgets/cascader' },
        { symbolName: 'MentionWidgetModule', fileName: '@yelon/form/widgets/mention' },
        { symbolName: 'RateWidgetModule', fileName: '@yelon/form/widgets/rate' },
        { symbolName: 'SliderWidgetModule', fileName: '@yelon/form/widgets/slider' },
        { symbolName: 'TagWidgetModule', fileName: '@yelon/form/widgets/tag' },
        { symbolName: 'TimeWidgetModule', fileName: '@yelon/form/widgets/time' },
        { symbolName: 'TransferWidgetModule', fileName: '@yelon/form/widgets/transfer' },
        { symbolName: 'TreeSelectWidgetModule', fileName: '@yelon/form/widgets/tree-select' },
        { symbolName: 'UploadWidgetModule', fileName: '@yelon/form/widgets/upload' }
    ];
    try {
        const source = (0, utils_1.getSourceFile)(tree, modulePath);
        const changes = [];
        for (const item of list) {
            changes.push((0, ast_utils_1.insertImport)(source, modulePath, item.symbolName, item.fileName));
            changes.push(...(0, ast_utils_1.addSymbolToNgModuleMetadata)(source, modulePath, 'imports', item.symbolName));
        }
        (0, utils_1.applyChanges)(tree, modulePath, changes);
        (0, utils_1.logWarn)(context, `[@yelon/form] Register all widgets in ${name} project, you can reduce package size by removing unnecessary parts in ${modulePath}`);
    }
    catch (ex) {
        (0, utils_1.logEx)(context, `Import all @yelon/form/widgets/* errors, need to manually import the required modules. ERROR: ${ex.message}`);
    }
}
//# sourceMappingURL=autoRegisterFormWidgets.js.map