"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
// import {
//   NodePackageInstallTask,
// } from '@angular-devkit/schematics/tasks';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function default_1(options) {
    options.packageManager = 'yarn';
    const templateSource = schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.template(Object.assign({}, core_1.strings, options))
    ]);
    return schematics_1.chain([
        schematics_1.mergeWith(templateSource),
        (tree, _context) => {
            // context.addTask(new NodePackageInstallTask());
            // task.
            return tree;
        }
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map