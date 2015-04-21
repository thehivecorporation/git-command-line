/**
 * Created by Mario Castro (mcastro@atsistemas.com) on 21/04/15.
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: 'coverage/instrument/app/'
            }
        },
        instrument: {
            files: 'index.js',
            options: {
                lazy: true,
                basePath: 'coverage/instrument/'
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/*.js']
        },
        storeCoverage: {
            options: {
                dir: 'coverage/reports'
            }
        },
        makeReport: {
            src: 'coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
            }
        },
        jsdoc: {
            dist : {
                src: ['*.js', 'test/*.js'],
                options: {
                    destination: 'doc',
                    template:"node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }

    });

    //Load tasks
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-jsdoc');

    //Test task
    grunt.registerTask('test', ['mochaTest']);

    //Coverage
    grunt.registerTask('coverage', ['instrument', 'mochaTest', 'storeCoverage', 'makeReport']);

    //Documentation
    grunt.registerTask('doc', ['jsdoc']);

    // Default task(s).
    grunt.registerTask('default', ['mochaTest']);

};