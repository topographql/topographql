const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: ['./client/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['import', { libraryName: 'antd', style: true }],
            ],
          },
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader', options: { javascriptEnabled: true } },
          // options: {
          //   modifyVars: themeVariables,
          //   root: path.resolve(__dirname, './')
          // }

        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/build/',
    contentBase: path.join(__dirname, './client'), // path from which static file should be served. if not specified, static files will not be served.
    proxy: {
      '/users': 'http://localhost:3000',
      '/gql/getschema': {
        target: 'http://localhost:3000',
      },
    },
  },
};
