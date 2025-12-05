const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

// UMD Build
const umdConfig = merge(commonConfig, {
  mode: 'production',
  context: path.resolve(__dirname, '../src'),
  entry: {
    'quill-table-better.js': './quill-table-better.ts',
    'quill-table-better': './assets/css/quill-table-better.scss'
  },
  output:{
    filename: '[name]',
    library: {
      name: 'QuillTableBetter',
      type: 'umd',
      export: 'default'
    },
    path: path.resolve(__dirname, '../dist'),
    clean: false,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    'quill': {
      commonjs: 'quill',
      commonjs2: 'quill',
      amd: 'quill',
      root: 'Quill'
    }
  },
  optimization: {
    minimize: true
  }
});

// ES Module Build
const esmConfig = merge(commonConfig, {
  mode: 'production',
  context: path.resolve(__dirname, '../src'),
  target: 'web',
  entry: {
    'quill-table-better.esm.mjs': './quill-table-better.ts'
  },
  experiments: {
    outputModule: true
  },
  output:{
    filename: '[name]',
    library: {
      type: 'module'
    },
    path: path.resolve(__dirname, '../dist'),
    clean: false,
    module: true,
    environment: {
      dynamicImport: true,
      module: true
    }
  },
  externalsType: 'module',
  externals: {
    'quill': 'quill',
    'quill-delta': 'quill-delta',
    'parchment': 'parchment'
  },
  optimization: {
    minimize: false,
    concatenateModules: false,
    usedExports: true
  }
});

module.exports = [umdConfig, esmConfig];