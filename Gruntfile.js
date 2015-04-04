'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['background/background.js', 'options/options.js'],
        tasks: ['jshint'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'background/background.js', 'options/options.js',
          'img/{,*/}*.{png,jpg,jpeg,gif}',
          'manifest.json'
        ]
      }
    },

    // Grunt server and debug server setting
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '127.0.0.1'
      },
      chrome: {
        options: {
          open: false,
          base: [
            '/Users/tibo/Desktop/8tracks/8TracksChrome/'
          ]
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '/background/{,*/}*.js',
        '/options/{,*/}*.js'
      ]
    },
  });

  grunt.registerTask('debug', function () {
    grunt.task.run([
      'jshint',
      'connect:chrome',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'debug'
  ]);
};
