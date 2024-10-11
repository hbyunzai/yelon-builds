"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePackage = exports.addPackage = exports.writePackage = exports.readPackage = exports.PACCKAGE_PATH = void 0;
const json_1 = require("./json");
exports.PACCKAGE_PATH = 'package.json';
function readPackage(tree, type) {
    return (0, json_1.readJSON)(tree, exports.PACCKAGE_PATH, type);
}
exports.readPackage = readPackage;
function writePackage(tree, json) {
    return (0, json_1.writeJSON)(tree, exports.PACCKAGE_PATH, json);
}
exports.writePackage = writePackage;
/**
 * Adds a package to the package.json
 *
 * ```
 * addPackage(tree, [ '＠yelon/abc＠^1.0.0' ])
 * addPackage(tree, [ '＠yelon/abc＠^1.0.0' ], 'devDependencies')
 * ```
 */
function addPackage(tree, pkg, type = 'dependencies') {
    const json = readPackage(tree, type);
    if (json == null)
        return tree;
    if (!Array.isArray(pkg))
        pkg = [pkg];
    pkg.forEach(p => {
        if (!json[type][p]) {
            const pos = p.lastIndexOf('@');
            json[type][p.substring(0, pos)] = p.substring(pos + 1);
        }
    });
    writePackage(tree, json);
    return tree;
}
exports.addPackage = addPackage;
/**
 * Removes a package to the package.json
 *
 * ```
 * removePackage(tree, [ '＠yelon/abc' ])
 * removePackage(tree, [ '＠yelon/abc' ], 'devDependencies')
 * ```
 */
function removePackage(tree, pkg, type = 'dependencies') {
    const json = readPackage(tree, type);
    if (json == null)
        return tree;
    if (!Array.isArray(pkg))
        pkg = [pkg];
    pkg.forEach(p => delete json[type][p.indexOf('@') !== -1 ? p.substring(0, p.lastIndexOf('@')) : p]);
    writePackage(tree, json);
    return tree;
}
exports.removePackage = removePackage;
//# sourceMappingURL=package.js.map