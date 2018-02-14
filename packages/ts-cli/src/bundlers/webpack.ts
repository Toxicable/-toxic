import * as webpack from 'webpack';
import * as path from 'path';
import { ConfigFile, Options } from '../interfaces';
import * as externals from 'webpack-node-externals';
import { Subject } from 'rxjs/Subject';
import { logging } from '@angular-devkit/core';

export function watchWebpack(logger: logging.Logger, entry: string, outDir: string, tsconfig: string) {

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
      logger.error(err.stack || err.message);
      if (err['details']) {
        logger.error('really bad error', err['details']);
      }
      process.exitCode = 1;
      return;
    }
    if (stats['hash'] !== lastHash) {
      lastHash = stats['hash'];
      const statsString = stats.toString({ colors: true });

      if (statsString) {
        logger.info(statsString + '\n');
      }
    }

    bundled$.next();
  });

  return bundled$;
}
