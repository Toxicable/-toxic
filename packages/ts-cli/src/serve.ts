import { Options } from './interfaces';
import { watchRollup } from './bundlers/rollup';
import { watchWebpack } from './bundlers/webpack';
import * as path from 'path';
import * as fs from 'fs';
import { ChildProcess, fork } from 'child_process';
import { logging } from '@angular-devkit/core';

export function serve(logger: logging.Logger, options: Options) {
  const bundled$ = watchWebpack(logger, options.configFile.absoluteMain,
    options.configFile.absoluteOutDir, options.configFile.absoluteTsconfig);

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
