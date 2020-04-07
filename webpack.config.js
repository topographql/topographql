const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV, 
    entry: {
      index: ['./client/index.tsx'],
    },
    output: { 
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    },
    devServer: {
      historyApiFallback: true,
      publicPath: '/build/',
      contentBase: path.join(__dirname, './client'), // path from which static file should be served. if not specified, static files will not be served.
      proxy: {
        '/users':'http://localhost:3000',
      }
    },
  }