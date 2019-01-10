// const path = require('path');
// const glob = require('glob-all');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const PurgecssPlugin = require('purgecss-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');
// const PATHS = {
//   src: path.join(__dirname)
// }
//console.log('glob.sync(`${PATHS.src}/**/*`, { nodir: true }) >>>>', glob.sync(`${PATHS.src}/*`))
module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: ['css-loader','sass-loader'],
          }),
        },
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css'),
      // new PurgecssPlugin({
      //   paths: () => glob.sync(`${PATHS.src}/**/*`)
      // }),
      // new PurifyCSSPlugin({
      //   paths: glob.sync(path.join(__dirname, '**/*.html')),
      // })
    ],
  };
};
