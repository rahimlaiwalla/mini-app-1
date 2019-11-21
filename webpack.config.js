const path = require('path');
// index.jsx is my source
const srcPath = path.join(__dirname, '/public/src');
// want bundle to go into public/dist
const distPath = path.join(__dirname, '/public/dist');

module.exports = {
  entry: `${srcPath}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: `${distPath}`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
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
