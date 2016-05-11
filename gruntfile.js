module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-babel');

  //require('load-grunt-tasks')(grunt); 

  grunt.initConfig({
    
    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        files: {
          'scripts/libs.js' : [
            '_/libs/**/*.js',
            '_/libs/*.js'
          ],
          '_/compiled/app.js' : [
            '_/js/*.js',
            '_/js/**/*.js'
          ]
        }
      }
    }, // Concat

    'babel': {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: {
          'scripts/script.js':'_/compiled/app.js'
        }
        // src: ['_/js/cpom/*.js', '_/js/src/**/*.js'],
        // dest: 'scripts/app.js'
      }
    }, //babel
    
    uglify: {
      my_target: {
        files: {
          'scripts/script.min.js': 'scripts/script.js'
        } //files
      } //my_target
    }, //uglify

    sass: {
      dist: {
        options: {
          //includePaths: require('node-bourbon').includePaths,
          //outputStyle: 'compressed'
        },
        files: {
          'styles/style.css': '_/sass/styles.scss'
        }
      }//dist
    }, //sass

    watch: {
      //options: { livereload: true },
      scripts: {
        files: ['_/js/*.js', '_/js/**/*.js'],
        //tasks: ['uglify']
        tasks: ['concat:dist','babel:dist','uglify','notify:dweller']
      }, //script
      sass: {
        files: ['_/sass/*.scss','_/sass/**/*.scss'],
        tasks: ['sass','notify:dweller']
      }, //sass
      html: {
        files: ['*.html']
      }
    }, //watch

    notify: {

      babel: {
        options: {
          title: 'Babel Complete',
          message: 'Babel Translation Task is Complete.'
        }
      },

      sass: {
        options: {
          title: 'SASS Compiled',
          message: 'SASS Compilation Complete.'
        }
      },

      dweller: {
        options: {
          title: 'All Tasks Complete',
          message: 'All assigned tasks are complete.'
        }
      },

      watch: {
        options: {
          title: 'Running Watch Task',
          message: 'Waiting...'
        }
      }
    }
  }) //initConfig
  grunt.registerTask('default', ['watch', 'notify:watch']);
} //exports