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

        mocha_istanbul: {
            coverage: {
                src: 'test', // a folder works nicely
                options: {
                    mask: '*.js'
                }
            }
        },
        publish: {
            main: {
                src: '*'
            }
        }
    });

    //Load tasks
    require('load-grunt-tasks')(grunt);

    //Test task
    grunt.registerTask('test', ['jshint', 'clean:coverage', 'mocha_istanbul:coverage']);

    //Documentation
    grunt.registerTask('doc', ['jsdoc']);

    //Coverage
    grunt.registerTask('coverage', ['clean:coverage', 'mocha_istanbul:coverage']);

    //Publish
    grunt.registerTask('publish', ['clean:coverage', 'jshint', 'mocha_istanbul:coverage']);

    // Default task(s).
    grunt.registerTask('default', ['mochaTest']);


};