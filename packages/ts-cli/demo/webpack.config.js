let externals = require('webpack-node-externals')
let path = require('path')

module.exports = {
  entry: './packages/ts-cli/demo/src/main.ts',
  output: {
    path: path.join(process.cwd(), './packages/ts-cli/demo/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        //loader: `ts-loader?configFile=packages/ts-cli/demo/tsconfig.app.json`
        loader: 'awesome-typescript-loader?configFileName=packages/ts-cli/demo/tsconfig.app.json'
      }
    ]
  },
  target: 'node',
  // devtool: 'cheap-module-eval-source-map',
   devtool: 'eval-source-map', //dev
  // devtool: 'source-map', //prod
  // devtool: 'source-map',
  // devtool: 'inline-source-map',
  resolve: { extensions: ['.ts', '.js'] },
  externals: [
    externals()
  ]
};
