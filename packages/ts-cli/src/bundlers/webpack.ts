import * as webpack from 'webpack';
import * as path from 'path';
import { CliOptions, ConfigFile, Options } from '../interfaces';
import * as externals from 'webpack-node-externals';
import { log } from '../logger';
import { Subject } from 'rxjs/Subject';

export function watchWebpack(entry: string, outDir: string, tsconfig: string) {

  const webpackConfig = {
    entry: entry,
    output: {
      path: outDir,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: `awesome-typescript-loader?configFileName=${tsconfig}`
        }
      ]
    },
    target: 'node',

    devtool: 'eval-source-map',

    resolve: { extensions: ['.ts', '.js'] },
    externals: [
      // TODO: bundle on prod mode
      externals()
    ]
  };

  const outfile = path.join(outDir, 'bundle.js');


  const compiler = webpack(webpackConfig as any);

  let lastHash: string = null;

  const bundled$ = new Subject();

  compiler.watch({}, (err, stats) => {

    if (err) {
      // Do not keep cache anymore
      // compiler.purgeInputFileSystem();
    }
    if (err) {
      lastHash = null;
      console.error(err.stack || err);
      if (err['details']) {
        console.error('really bad error', err['details']);
      }
      process.exitCode = 1;
      return;
    }
    if (stats['hash'] !== lastHash) {
      lastHash = stats['hash'];
      const statsString = stats.toString({ colors: true });

      if (statsString) {
        log(statsString + '\n', 'webpack');
      }
    }

    bundled$.next();
  });

  return bundled$;
}
