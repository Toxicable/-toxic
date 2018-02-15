import { Rule, apply, url, chain, mergeWith, template, Tree, SchematicContext } from '@angular-devkit/schematics';
import { Schema as appOptions} from './schema';
import { strings } from '@angular-devkit/core';
// import {
//   NodePackageInstallTask,
// } from '@angular-devkit/schematics/tasks';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function(options: appOptions): Rule {
  options.packageManager = 'yarn';

  const templateSource = apply(url('./files'), [
    template({
      ...strings,
      ...options
    })
  ]);

  return chain([
    mergeWith(templateSource),
    (tree: Tree, _context: SchematicContext) => {

      // context.addTask(new NodePackageInstallTask());
      // task.
      return tree;
    }
  ]);


}
