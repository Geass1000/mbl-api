const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDevEnv = env === 'development';

// mode
const mode = isDevEnv ? 'development' : 'production';

// Environment file
let envFilePath;
switch (env) {
  case 'production':
      envFilePath = './environment.prod.ts';
  case 'staging':
      envFilePath = './environment.stg.ts';
  default:
      envFilePath = './environment.dev.ts';
}

// plugins
const devPlugins = [
  new NodemonPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NormalModuleReplacementPlugin(
    /server\/environments\/environment\.ts/,
    envFilePath,
  ),
];

const prodPlugins = [];

const commonPlugins = [];

const plugins = isDevEnv
  ? devPlugins.concat(commonPlugins)
  : prodPlugins.concat(commonPlugins);

const entry = isDevEnv ? [
  'webpack/hot/poll?1000',
  `./server/main.ts`
]: `./server/main.ts`;

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './dist/server'),
    filename: '[name]-server.bundle.js'
  },
  plugins: plugins,
  target: 'node',
  mode,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: {
          configFile: './server/tslint.json'
        },
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
