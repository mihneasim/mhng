module.exports = function(grunt) {

    var karmaShared =  {
        files: [
            'bower_components/lodash/lodash.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'tmp/templates.js',
            'src/mhng.js',
            'src/directives/**/*.js',
            'src/directives/**/*.spec.js'
        ],
        frameworks: [ 'jasmine' ],
        plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher' ]
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            src: [
                'src/**/*.js'
            ],
        },

        karma: {
            unit: {
                options: karmaShared,
                singleRun: true,
                port: 9877,
                browsers: [
                    'PhantomJS'
                ]
            },
            debug: {
                options: karmaShared,
                singleRun: false,
                debug: true,
                port: 9877,
                browsers: [
                    'Chrome'
                ]
            }
        },

        watch: {
            jssrc: {
                files: [
                    'src/**/*.js'
                ],
                tasks: [ 'default' ]
            }
        },

        html2js: {
            //options: {
            //},
            main: {
              src: ['src/**/*.tpl.html'],
              dest: 'tmp/templates.js'
            }
          }

    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'html2js', 'karma:unit']);
    grunt.registerTask('debug', ['jshint', 'html2js', 'karma:debug']);

};
