const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const webpack = require('webpack');
const sourceMap = require('./webpack/sourceMap');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const favicon = require('./webpack/favicon');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build'),
};
const common = merge([
  images(),
  {
    entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'question': PATHS.source + '/pages/question/question.js',
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      // }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/pages/index/index.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'question.html',
        chunks: ['question', 'common'],
        template: PATHS.source + '/pages/question/question.html',
      }),
      new CopyWebpackPlugin([
  			{from: 'source/pages/**/images/*.*', to: 'images', flatten: true}, // legacy, need for AngularJS 'ng-src' attribute work properly
  			{from: 'source/pages/**/fonts/*.*', to: 'fonts', flatten: true},
  		],{
  			copyUnmodified: true,
  		}),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },

  },
  // lintJS({ paths: PATHS.sources }),
  lintCSS(),
  babel(),
]);


module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      {
        plugins: [
          new CleanPlugin([
            'build',
          ]),
          new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'build'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
              blockJSRequests: false,
            }
          }),
          new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'build'),
            src: 'question.html',
            dest: 'question.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
              blockJSRequests: false,
            }
          })
        ],
      },
      common,
      extractCSS(),
      favicon(),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css(),
      sourceMap(),
    ]);
  }
};
