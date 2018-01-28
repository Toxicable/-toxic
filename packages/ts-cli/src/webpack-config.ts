import * as webpack from 'webpack';
import * as path from 'path';
import { CliOptions, ConfigFile, Options } from './interfaces';
const nodeExternals = require('webpack-node-externals');
import * as externals from 'webpack-node-externals';

export function makeWebpackConfig(options: Options, outfilePath: string): webpack.Configuration {

  const entry = path.join(options.absoluteRoot, options.configFile.entryPoint);
  const tsConfigFile = path.join(options.absoluteRoot, options.configFile.tsConfigPath);
  return {
    entry: entry, // path.relative(process.cwd(), entry),
    output: {
      // Puts the output at the root of the dist folder
      path: outfilePath,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: `ts-loader?configFile=${tsConfigFile}`
        }
      ]
    },
    target: 'node',
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    // devtool: 'inline-source-map',
    resolve: { extensions: ['.ts', '.js'] },
    externals: [externals()]
  };
}
