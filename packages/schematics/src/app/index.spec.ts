import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('app', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('app', {name: 'application-name'}, Tree.empty());

    expect(tree.files).toContain('/application-name/.ts-cli.json');
    expect(tree.files).toContain('/application-name/package.json');
    expect(tree.files).toContain('/application-name/src/main.ts');
    expect(tree.files).toContain('/application-name/tsconfig.json');
    expect(tree.files).toContain('/application-name/tslint.json');
  });
});
