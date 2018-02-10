import { Rule, apply, url, chain, mergeWith, branchAndMerge, template } from '@angular-devkit/schematics';
import { Schema as appOptions} from './schema';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function(options: appOptions): Rule {

  const templateSource = apply(url('./files'), [
    template({
      ...strings,
      ...options
    })
  ]);

  return chain([
    branchAndMerge(chain([
      mergeWith(templateSource),
    ])),
  ]);
}
