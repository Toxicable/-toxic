import * as rollup from 'rollup';
import { Options } from '../interfaces';
import * as ts from 'rollup-plugin-typescript2';
import * as path from 'path';
import { Subject } from 'rxjs/Subject';

const tsPlugin: any = ts;


export function watchRollup(entry: string, outDir: string, tsconfig: string) {
  const inputOptions: rollup.InputOptions = {
    // core options
    input: entry, // the only required option
    preserveSymlinks: true,

    plugins: [
      tsPlugin({
        tsconfig: tsconfig
      })
    ],
  };

  const outputOptions: rollup.OutputOptions = {
    sourcemap: 'inline',
    // core options
    file: path.join(outDir,  'bundle.js'),   // required with bundle.write
    format: 'cjs', // required
  };

  const watchOptions: rollup.RollupWatchOptions = {
    ...inputOptions,
    output: outputOptions,
  };

  const watcher = rollup.watch([watchOptions]);
  const bundled$ = new Subject();


  // see below for details on the options
  let startedAt: Date;
  watcher.on('event', (event: any) => {

    if (event.code === 'START') {
      console.log('start bundling');
      startedAt = new Date();
    }

    if (event.code === 'END') {
      const interval = Number(new Date()) - Number(startedAt);
      console.log(`end bundling, took: ${interval}ms`);
      bundled$.next();
    }

    if (event.code === 'ERROR') {
      console.log('err');
      console.log(event.error.message);
    }

    if (event.code === 'FATAL') {
      console.log('whops, something fatal');
      console.log(event.error.message);
    }
  });
  return bundled$;
}
