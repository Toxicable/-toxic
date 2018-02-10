"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const collectionPath = path.join(__dirname, '../collection.json');
describe('app', () => {
    it('works', () => {
        const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
        const tree = runner.runSchematic('app', { name: 'application-name' }, schematics_1.Tree.empty());
        expect(tree.files).toContain('/application-name/.ts-cli.json');
        expect(tree.files).toContain('/application-name/package.json');
        expect(tree.files).toContain('/application-name/src/main.ts');
        expect(tree.files).toContain('/application-name/tsconfig.json');
        expect(tree.files).toContain('/application-name/tslint.json');
    });
});
//# sourceMappingURL=index.spec.js.map