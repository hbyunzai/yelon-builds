"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToV18 = updateToV18;
exports.postUpdate = postUpdate;
const schematics_1 = require("@angular/cdk/schematics");
const schematics_2 = require("@angular-devkit/schematics");
const upgrade_data_1 = require("./upgrade-data");
const v18_1 = require("./upgrade-rules/v18");
const migrations = [];
function updateToV18() {
    return (0, schematics_2.chain)([(0, v18_1.v18Rule)(), (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V18, migrations, upgrade_data_1.ruleUpgradeData, postUpdate)]);
}
/** Post-update schematic to be called when update is finished. */
function postUpdate(context, targetVersion, hasFailures) {
    context.logger.info('');
    context.logger.info(`✓  Updated NG-ALAIN to ${targetVersion}`);
    context.logger.info('');
    if (hasFailures) {
        context.logger.warn('  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
            'output above and fix these issues manually.');
    }
}
//# sourceMappingURL=index.js.map