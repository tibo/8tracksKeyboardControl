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
        files: [
          'app/background/background.js',
          'app/options/options.js'
        ],
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
          'app/background/background.js',
          'app/options/options.js',
          'app/options/options.html',
          'app/img/{,*/}*.{png,jpg,jpeg,gif}',
          'app/manifest.json'
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
            'app/'
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
        'app/background/{,*/}*.js',
        'app/options/{,*/}*.js'
      ]
    },

    // build
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
          ]
        }]
      }
    },

    chromeManifest: {
      dist: {
        options: {
          buildnumber: true,
          indentSize: 2,
          background: {
            target: 'background/background.js',
            exclude: [
              'background/chromereload.js'
            ]
          }
        },
        src: 'app/',
        dest: 'dist/'
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app/',
          dest: 'dist/',
          src: [
            '*.{ico,png,txt}',
            'img/{,*/}*.{png,jpg,jpeg,gif}',
            '{,*/}*.html',
            'options/options.js',
            'background/background.js'
          ]
        }]
      }
    },

    compress: {
      dist: {
        options: {
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/8tracksKeyboardControl-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: ''
        }]
      }
    }

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

  grunt.registerTask('build', [
    'clean:dist',
    'chromeManifest:dist',
    'copy',
    'compress'
  ]);
};
