'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    meta: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'karma:unit']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    concat: {
      src: {
        src: ['src/**/*.js'],
        dest: 'dist/lazymage.js'
      }
    },
    uglify: {
      src: {
        files: {
          'dist/lazymage.min.js': '<%= concat.src.dest %>'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('build', ['jshint', 'karma:unit', 'concat', 'ngmin', 'uglify']);
  grunt.registerTask('travis', ['jshint', 'karma:unit']);
};