var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './app/index.js',
  output: {
    path :__dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
