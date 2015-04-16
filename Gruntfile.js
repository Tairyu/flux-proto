'use strict';

module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: ['build'],
    concurrent: {
      dev: ['nodemon:app', 'webpack:dev', 'esteWatch'],
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
        script: './build/server/server.js',
        options: {
          ignore: ['{actions,configs,components,services,stores}/**', 'build/js/**'],
          ext: 'js,jsx'
        }
      }
    },
    babel: {
      iojs: {
        options: {
          blacklist: ['es6.classes', 'es6.constants', 'es6.templateLiterals', 'es6.blockScoping']
        },
        files: [
          {
            expand: true,
            src: [
              'server.js',
              'app.js',
              '{actions,configs,components,services,stores}/**/*.{js,jsx}'
            ],
            dest: 'build/server'
          }
        ]
      }
    },
    esteWatch: {
      options: {
        dirs: ['.', '{actions,configs,components,services,stores}/**/']
      },
      js: function(_) { return ['newer:babel:iojs']},
      jsx: function(_) { return ['newer:babel:iojs']}
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
              {test: /\.(js|jsx)$/, exclude: /node_modules|services/, loader: require.resolve('babel-loader')},
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
  grunt.registerTask('default', ['clean', 'lint', 'babel:iojs', 'concurrent:dev']);
};

