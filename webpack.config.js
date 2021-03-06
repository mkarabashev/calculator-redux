const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./parts.js');

const PATHS = {
  src: path.join(__dirname, 'app'),
  html: path.join(__dirname, 'app', 'index.html'),
  style: [
    path.join(__dirname, '/app/css', 'style.sass'),
    path.join(__dirname, '/node_modules/normalize.css', 'normalize.css')
  ],
  build: path.join(__dirname, 'dist')
}

const base = {
  entry: {
    app: PATHS.src,
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.html
    })
  ]
};

const common = merge(
  base,
  parts.jsx(),
  parts.eslint(),
  parts.png(PATHS.src),
  parts.mp3(PATHS.src),
  parts.fontAwesome(PATHS.fa)
);

var config;
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        },
        resolve: {
          extensions: [ '', '.js', '.jsx' ],
          alias: {
            react: path.join(__dirname, 'node_modules/react/dist/react.min.js'),
            'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom.min.js')
          }
        }
      },
      parts.clean(PATHS.build),
      parts.extractVendors(),
      parts.extractSASS(),
      parts.extractCSS(),
      parts.purifyCSS([
        'app/index.html',
        'app/index.js'
      ]),
      parts.minify()
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupSASS(),
      parts.setupCSS(),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
