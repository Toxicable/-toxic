import { execSync } from 'child_process';
import * as path from 'path';
import {
  FileSystemHost,
  NodeModulesEngineHost,
  validateOptionsWithSchema,
} from '@angular-devkit/schematics/tools';
import { SchematicEngine, FileSystemSink, FileSystemTree, Tree, DryRunSink } from '@angular-devkit/schematics';
import { of } from 'rxjs/observable/of';
import { map, concatMap, ignoreElements } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { logging } from '@angular-devkit/core';


export function makeNewApp(logger: logging.Logger, name: string) {
  const engineHost = new NodeModulesEngineHost();
  const engine = new SchematicEngine(engineHost);

  const collectionName = '@toxicable/schematics';

  const collection = engine.createCollection(collectionName);
  const schematic = collection.createSchematic('app');
  const host = of(new FileSystemTree(new FileSystemHost(process.cwd())));
  const fsSink = new FileSystemSink(process.cwd(), false);

  const loggingQueue: string[] = [];

  schematic.call({name}, host, { debug: false, logger: logger.asApi() })
  .pipe(
    map((tree: Tree) => Tree.optimize(tree)),
    concatMap((tree: Tree) => {
      return fsSink.commit(tree).pipe(
        ignoreElements(),
      );
    }),
    concatMap(() => engine.executePostTasks()))
  .subscribe({
    error(err: Error) {
      if (true) {
        logger.fatal('An error occured:\n' + err.stack);
      }
      logger.info('DONE!');
      process.exit(1);
    },
  });
}
