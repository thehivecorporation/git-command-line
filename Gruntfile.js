/**
 * Created by Mario Castro (mcastro@atsistemas.com) on 21/04/15.
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc: {
            dist : {
                src: ['*.js', 'test/*.js'],
                options: {
                    destination: 'doc',
                    template:"node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        },

        codeclimate: {
            options: {
                file: "coverage/lcov.info",
                token: "8a405b00f1c4f57094cdd768148c11a3bd905bf3b03f29edc4236bfec304614d"
            }
        },

        jshint: {
            all: 'index.js',
            options:{
                curly: true,
                eqeqeq: true,
                eqnull: true
            }
        },

        clean: {
            coverage: {
                src: ['coverage']
            }
        },

        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: 'coverage/instrument/'
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
            quick:{
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            },
            cover:{
                options:{
                    reporter: 'spec'
                },
                src: ['coverage/instrument/*.js']
            }
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
                dir: 'coverage/reports',
                print: 'detail'
            }
        }

    });

    //Load tasks
    require('load-grunt-tasks')(grunt);

    //Test task
    grunt.registerTask('test', ['jshint', 'mochaTest:quick']);

    //Coverage
    grunt.registerTask('coverage', ['jshint', 'clean:coverage', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage' ]);

    //Documentation
    grunt.registerTask('doc', ['jsdoc']);

    // Default task(s).
    grunt.registerTask('default', ['mochaTest']);



    //DELETE
    grunt.registerTask('testcoverage', ['clean:coverage', 'env:coverage', 'instrument', 'mochaTest:quick', 'storeCoverage', 'makeReport']);

};