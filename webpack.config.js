'use strict';

const SERVER_URL = '';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');

module.exports = {
  context: path.resolve(__dirname, 'source'), // указываем относительно какой папки будет идти сборка (контекст запуска)

  entry: {
    index: './app.js'
  },

  output: {
    path: path.resolve('build'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].chunk.[chunkhash].js',
    publicPath: '/'
  },

  devServer: {
    hot: true,
    colors: true,
    publicPath: '/',
    historyApiFallback: true
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: [
    new CleanWebpackPlugin(['build']),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify('ru'),
      SERVER_URL: JSON.stringify(SERVER_URL)
    }),

    new CopyWebpackPlugin([
      {
        from: './copy-to-root',
        to: './'
      },
      {
        from: NODE_ENV == 'development' ? './copy-to-root-dev' : './copy-to-root-build',
        to: './'
      }
    ]),

    new ExtractTextPlugin('[id].[contenthash].css', {
      allChunks: true
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      Vue: 'vue'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      chunks: [
        'common',
        'index'
      ],
      template: NODE_ENV === 'development' ? path.resolve(__dirname, './source/layouts/index.pug') : path.resolve(__dirname, './source/layouts/index-production.pug')
    }),

    new SvgStore({
      svgoOptions: {
        plugins: [
          {
            removeTitle: true,
            removeViewBox: true,
            sortAttrs: true,
            addClassesToSVGElement: true,
            addAttributesToSVGElement: true,
            removeStyleElement: true,
            convertStyleToAttrs: true
          }
        ]
      },
      prefix: 'icon-'
    })
  ],

  resolve: {
    alias: {
      blocks: path.resolve(__dirname, 'source/stylesheets/blocks'),
      components: path.resolve(__dirname, 'source/components'),
      helpers: path.resolve(__dirname, 'source/helpers'),
      fonts: path.resolve(__dirname, 'source/assets/fonts'),
      images: path.resolve(__dirname, 'source/assets/images'),
      views: path.resolve(__dirname, 'source/views'),
      vue$: 'vue/dist/vue.common.js'
    }
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, './source')
        ],
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|webm|mp4|ogv)$/,
        loader: 'url?limit=10000',
        query: {
          name: '/[hash:6].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },

      {
        test: /\.pug$/,
        loader: 'pug-html',
        query: {
          pretty: NODE_ENV === 'development'
        }
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css!postcss!stylus?resolve url')
      }
    ]
  },

  stylus: {
    use: [function (stylus) {
      stylus.import(path.join(__dirname, 'source/stylesheets/common/global'));
    }]
  },

  vue: {
    loaders: {
      js: 'babel?presets[]=es2015',
      css: ExtractTextPlugin.extract('css!postcss'),
      stylus: ExtractTextPlugin.extract('css!postcss!stylus?resolve url')
    }
  },

  postcss: function () {
    let option = [
      autoprefixer({browsers: ['last 3 versions']})
    ];
    if (NODE_ENV === 'production') {
      option = option.concat([
        mqpacker({sort: sortCSSmq}),
        cssnano({
          zindex: false
        })
      ]);
    }
    return {
      defaults: option
    };
  }
};

if (NODE_ENV !== 'development') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: NODE_ENV === 'production', // eslint-disable-line
        unsafe: true,
        warnings: false
      },
      output: {
        comments: false
      }
    })
  );
}

