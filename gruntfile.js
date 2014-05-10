module.exports = function(grunt) {
    var files = ['gruntfile.js',
        'lib/**/*.js'
    ];
    grunt.initConfig({
        watch: {
            files: files,
            tasks: ['default']
        },
        jshint: {
            // define the files to lint
            files: files,
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        nodeunit: {
            all: ['lib/test/*.js']
        },
        jsbeautifier: {
            files: files,
            options: {
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('test', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['jshint', 'nodeunit', 'jsbeautifier']);
};
