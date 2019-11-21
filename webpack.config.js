const path = require('path');
// index.jsx is my source
const src_path = path.join(__dirname, '/public/src');
// want bundle to go into public/dist
const dist_path = path.join(__dirname, '/public/dist');

module.exports = {
  entry: `${src_path}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: `${dist_path}`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: src_path,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
