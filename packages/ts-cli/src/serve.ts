import { Options } from './interfaces';
import rollup from 'rollup/dist/typings/rollup';
import { watchRollup } from './bundlers/rollup';
import { watchWebpack } from './bundlers/webpack';
import * as path from 'path';
import * as fs from 'fs';
import { ChildProcess, fork } from 'child_process';

export function serve(options: Options) {
//  const bundled$ = watchRollup(options.configFile.absoluteMain, options.configFile.absoluteOutDir, options.configFile.absoluteTsconfig);
  const bundled$ = watchWebpack(options.configFile.absoluteMain, options.configFile.absoluteOutDir, options.configFile.absoluteTsconfig);

  const outfile = path.join(options.configFile.absoluteOutDir, 'bundle.js');

  let subProcess: ChildProcess;
  bundled$.subscribe(() => {
    if (fs.existsSync(outfile)) {
      if (subProcess) {
        subProcess.kill('SIGINT');
      }
      subProcess = fork(outfile, [], {
        execArgv: ['--inspect']
      });
    }
  });
}
