'use strict';

module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: ['build'],
    concurrent: {
      dev: ['nodemon:app', 'webpack:dev'],
      options: {
        logConcurrentOutput: true
      }
    },
    eslint: {
      all: [
        '*.{js,jsx}',
        '{actions,configs,components,services,stores}/**/*.{js,jsx}'
      ]
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: [
          '*.{js,jsx}',
          '{actions,configs,components,services,stores}/**/*.{js,jsx}'
      ]
    },
    nodemon: {
      app: {
        script: './server.js',
        options: {
          ignore: ['build/**'],
          ext: 'js,jsx'
        }
      }
    },
    webpack: {
      dev: {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        entry: './client.js',
        output: {
          path: './build/js',
          publicPath: '/public/js/',
          filename: '[name].js'
        },
        module: {
          loaders: [
              {test: /\.css$/, loader: 'style!css'},
              {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve('babel-loader')},
              {test: /\.json$/, loader: 'json-loader'}
          ]
        },
        stats: {
          colors: true
        },
        devtool: 'source-map',
        watch: true,
        keepalive: true
      }
    }
  });

  // tasks
  grunt.registerTask('lint', ['eslint:all', 'jscs:all']);
  grunt.registerTask('default', ['clean', 'lint', 'concurrent:dev']);
};

