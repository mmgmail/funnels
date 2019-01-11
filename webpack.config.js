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
  {
    entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'question': PATHS.source + '/pages/question/question.js',
      'start': PATHS.source + '/pages/start/start.js',
      'payment-ss': PATHS.source + '/pages/payment-ss/payment-ss.js',
      'payment-retargeted': PATHS.source + '/pages/payment-retargeted/payment-retargeted.js',
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
      new HtmlWebpackPlugin({
        filename: 'start.html',
        chunks: ['start', 'common'],
        template: PATHS.source + '/pages/start/start.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'payment-ss.html',
        chunks: ['payment-ss', 'common'],
        template: PATHS.source + '/pages/payment-ss/payment-ss.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'payment-retargeted.html',
        chunks: ['payment-retargeted', 'common'],
        template: PATHS.source + '/pages/payment-retargeted/payment-retargeted.html',
      }),
      new CopyWebpackPlugin([
  			{from: 'images', to: 'images'},
  			{from: 'fonts', to: 'fonts'},
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
  images(),
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
          }),
          new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'build'),
            src: 'start.html',
            dest: 'start.html',
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
            src: 'payment-ss.html',
            dest: 'payment-ss.html',
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
            src: 'payment-retargeted.html',
            dest: 'payment-retargeted.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
              blockJSRequests: false,
            }
          }),
        ],
      },
      common,
      extractCSS(),
      // favicon(),
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
