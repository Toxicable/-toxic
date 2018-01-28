import * as webpack from 'webpack';
import * as path from 'path';
import { CliOptions, ConfigFile, Options } from './interfaces';
import * as externals from 'webpack-node-externals';

export function makeWebpackConfig(options: Options, outfilePath: string): webpack.Configuration {

  const entry = path.join(options.absoluteRoot, options.configFile.entryPoint);
  const tsConfigFile = path.join(options.absoluteRoot, options.configFile.tsConfigPath);

  return {
    entry: entry,
    output: {
      path: outfilePath,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: `awesome-typescript-loader?configFileName=${tsConfigFile}`
        }
      ]
    },
    target: 'node',

    devtool: options.prod ? 'source-map' : 'eval-source-map',

    resolve: { extensions: ['.ts', '.js'] },
    externals: [
      // TODO: bundle on prod mode
      externals()
    ]
  };
}