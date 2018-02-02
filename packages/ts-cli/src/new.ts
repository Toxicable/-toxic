import {Tree} from '@angular-devkit/schematics';

export default function MySchematic(options: any) {
  return (tree: Tree) => {
    tree.create(options.path + '/hi', 'Hello world!');
    return tree;
  };
}
